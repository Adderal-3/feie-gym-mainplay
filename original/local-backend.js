/* Local transport adapter for the recovered original client.
 * Uses original predicted board actions and original response/model constructors.
 * Unknown service commands are explicit errors, never fabricated success responses.
 */
(function (global) {
  'use strict';
  var VERSION = 1;
  var DEFAULT_KEY = 'feie-original-local-state-v1';
  var contexts = null;
  var pendingPersist = false;
  var log = [];
  var knownTypes = ['ll', 'pl', 'el', 'Za', 'Zc', 'Mc', 'Hc', 'gl', 'wl', 'rl'];
  var predicted = new Set([
    'game_cellmove', 'game_multiplecellmove', 'game_cellproduct', 'game_multiplecellproduct',
    'game_cellcollect', 'game_multiplecellcollect', 'game_cellsell', 'game_cellundo',
    'game_celltobag', 'game_cellbagput', 'game_channelput', 'game_channelbag',
  ]);
  var query = new Set(['game_enterboard', 'game_getbag', 'game_currenttimestamp']);

  function bridge() { return contexts && contexts.bridge; }
  function role() { return contexts.role || bridge().E8.role; }
  function now() { return bridge().E8.serverTime || Date.now(); }
  function entries(value) {
    if (!value) return [];
    if (value instanceof Map || typeof value.entries === 'function') return Array.from(value.entries());
    return Object.entries(value);
  }
  function get(value, key) { return value && typeof value.get === 'function' ? value.get(key) : value && value[key]; }
  function set(value, key, content) { if (value && typeof value.set === 'function') value.set(key, content); else if (value) value[key] = content; }
  function remove(value, key) { if (value && typeof value.delete === 'function') value.delete(key); else if (value) delete value[key]; }
  function values(value) { return entries(value).map(function (entry) { return entry[1]; }); }
  var appearanceFields = [
    ['img', 'ManagerPhoto', 'img'], ['boxes', 'ManagerFrame', 'imgBox'],
    ['uniform', 'ManagerUniform', 'uniform'], ['pet', 'Pet', 'pet'], ['jobBadge', 'ManagerJobBadge', 'jobBadge'],
  ];
  function appearanceOwnership() {
    var state = contexts.appearance;
    if (!state) {
      state = { id: role().id };
      appearanceFields.forEach(function (field) { state[field[0]] = new Map(); });
      contexts.appearance = state;
    }
    var info = role().userInfo || {};
    appearanceFields.forEach(function (field) {
      var owned = state[field[0]], equipped = Number(info[field[2]]);
      allConfigs(field[1]).forEach(function (row) {
        if (row.isDefault === 1 && !get(owned, row.id)) set(owned, row.id, { count: 1 });
      });
      if (validInteger(equipped, 1) && lookup(field[1], equipped) && !get(owned, equipped)) set(owned, equipped, { count: 1 });
    });
    return state;
  }
  function cardCollection() {
    // A new local role owns no collectible cards. Their original bs wire state
    // is retained independently from the UI cache; this query grants nothing.
    return contexts.card || (contexts.card = { id: role().id, cardPoint: 0, jokerCard: 0,
      gambleCounts: new Map(), rewarded: new Map(), news: new Map(), cards: new Map() });
  }
  function queryWireValue(value) {
    if (Array.isArray(value)) return value.map(queryWireValue);
    if (value instanceof Map || value && typeof value.entries === 'function') {
      var mapped = {};entries(value).forEach(function (entry) { mapped[entry[0]] = queryWireValue(entry[1]); });return mapped;
    }
    if (value && typeof value === 'object') {
      var result = {};Object.keys(value).forEach(function (key) { result[key] = queryWireValue(value[key]); });return result;
    }
    return value;
  }
  function queryOriginalModel(request, field, state) {
    var response = typeof request.respType === 'function' && new request.respType();
    var model = response && response[field];
    if (!model || typeof model.setValue !== 'function') throw new Error('原只读查询响应模型尚未加载：' + field);
    // Use the original If.Nu / Mh.bs setValue decoder, retaining original typed
    // Map/count records instead of returning a success-shaped empty object.
    model.setValue(queryWireValue(state));
    return model;
  }
  function globalActivitySnapshot(request) {
    var current = role().globalActivity;
    if (!current || typeof current.entries !== 'function') throw new Error('本地活动状态尚未初始化');
    var response = typeof request.respType === 'function' && new request.respType();
    if (!response || !Array.isArray(response.globalActivity) || typeof response.setValue !== 'function') throw new Error('原活动查询响应模型尚未加载');
    // Mp.globalActivity is the original ql[] protocol field. An empty local Map
    // means no active campaigns; never create campaigns or rewards from Config.
    // Decode existing saved rows through Mp so restored plain records become ql.
    response.setValue({ globalActivity: values(current).map(queryWireValue) });
    return response.globalActivity;
  }
  function originalHandbookData() {
    var api = bridge(), Ctor = api.HandbookWindow || api.v$;
    if (!Ctor && global.cc && global.cc.js) Ctor = global.cc.js.getClassByName('HandbookWindow');
    return Ctor && Ctor.Data && typeof Ctor.Data.get === 'function' ? Ctor.Data : null;
  }
  function syncElementHandbook() {
    var history = contexts.elementHandbook;
    if (!history) {
      history = contexts.elementHandbook = new Map();
      // CommonElement.onInitElement only discovers STAND, non-bubble cells.
      // Seed the exact initially exposed cells so a direct merge-screen boot retains
      // discoveries which the usual original home-login request would have supplied.
      values(role().boards).forEach(function (board) {
        var initial = lookup('Board', board.boardId);
        if (initial && Array.isArray(initial.element)) initial.element.forEach(function (row) {
          row.forEach(function (encoded) {
            var parts = String(encoded).split(':'), id = Number(parts[0]);
            if (Number(parts[1]) === 0 && lookup('Element', id)) history.set(id, 0);
          });
        });
      });
    }
    // Once the original ef response is installed by HandbookWindow.Init, its Data
    // is this same live Map. Do not merge a different static Map left by an earlier
    // session into a restored save; that would undo exact rollback/claim state.
    values(role().boards).forEach(function (board) {
      values(board.cells).concat(values(board.bag && board.bag.items)).forEach(function (cell) {
        if (cell && cell.elementId > 0 && cell.state === 0 && !cell.bubbleEnd && lookup('Element', cell.elementId) && !history.has(cell.elementId)) history.set(cell.elementId, 0);
      });
    });
    return history;
  }
  function checkIndex(index) { return Number.isSafeInteger(index) && index >= 1 && index <= 63; }
  function lookup(table, id) {
    var cfg = bridge().config && bridge().config[table];
    if (!cfg) return null;
    return typeof cfg.getById === 'function' ? cfg.getById(id) : get(cfg, id);
  }
  function allConfigs(table) {
    var cfg = bridge().config && bridge().config[table];
    if (!cfg) return [];
    if (typeof cfg.getAll === 'function') return values(cfg.getAll());
    if (typeof cfg.getList === 'function') return cfg.getList();
    if (cfg.data) return values(cfg.data);
    if (cfg.list) return values(cfg.list);
    return values(cfg).filter(function (value) { return value && typeof value === 'object' && value.id != null; });
  }
  function boardById(id) {
    var current = bridge().G2.Data;
    var boards = role().boards;
    return get(boards, id) || (current && (!id || current.id === id) ? current : null);
  }
  function syncOrderGotFlags(target) {
    values(target && target.boards).forEach(function (board) {
      values(board.orders).forEach(function (order) {
        // Original UT.checkOrderGot/getDrawerAlreadyHave use ordered.has(id),
        // while checkOrderFinished tests the stored boolean. An active order is
        // acquired but unfinished; omitting false wrongly exposes manual unlock.
        if (order.orderId > 0 && !board.ordered.has(order.orderId)) set(board.ordered, order.orderId, false);
      });
    });
  }
  function ensureInitialBuildRecord(target) {
    var data = target && target.build, Ctor = bridge().classes.Hc;
    if (!data || !data.builds || entries(data.builds).length || get(data.builded, 10001) || !Ctor || !lookup('Build', 10001)) return;
    var record = new Ctor();
    record.id = 10001;record.state = 0;record.level = 0;
    set(data.builds, 10001, record);
  }
  function refreshMainBuildRecords() {
    var b = bridge(), data = role().build, table = b.config && b.config.Build, Ctor = b.classes.Hc;
    if (!data || !table || !Ctor || !b.K6 || typeof b.K6.CheckUnlock !== 'function') return;
    // Recovered Build rows do not carry a type field. The original vT records main
    // membership from Build.sheetMap['Main']; extended rooms must never enter this map.
    var main = get(table.sheetMap, 'Main');
    var candidates = main ? values(main) : get(table.sheetList, 'Main');
    if (!Array.isArray(candidates)) return;
    candidates.forEach(function (cfg) {
      var area = lookup('Area', cfg.area);
      if (!area || area.roomId !== 0 || get(data.builded, cfg.id) || get(data.builds, cfg.id)) return;
      var unlocked;
      try { unlocked = b.K6.CheckUnlock(cfg.unlock || []); }
      catch (error) {
        contexts.buildUnlockErrors = contexts.buildUnlockErrors || [];
        if (!contexts.buildUnlockErrors.some(function (item) { return item.buildId === cfg.id; })) contexts.buildUnlockErrors.push({ buildId: cfg.id, error: String(error.message || error) });
        return;
      }
      if (!unlocked) return;
      var record = new Ctor();record.id = cfg.id;record.state = 0;record.level = 0;
      set(data.builds, cfg.id, record);
    });
  }
  function typeName(value) {
    for (var i = 0; i < knownTypes.length; i++) {
      var Ctor = bridge().classes && bridge().classes[knownTypes[i]] || bridge()[knownTypes[i]];
      if (Ctor && value instanceof Ctor) return knownTypes[i];
    }
    return null;
  }
  function encode(value, seen, depth) {
    if (value === null || typeof value !== 'object') return typeof value === 'function' ? undefined : value;
    if (depth > 40) throw new Error('Local state nesting limit');
    if (value instanceof Date) return { $date: value.getTime() };
    if (value instanceof Uint8Array) return { $bytes: Array.from(value) };
    if (seen.has(value)) return undefined;
    seen.add(value);
    var result;
    if (value instanceof Map || (typeof value.get === 'function' && typeof value.set === 'function' && typeof value.entries === 'function')) {
      result = { $map: entries(value).map(function (entry) { return [entry[0], encode(entry[1], seen, depth + 1)]; }) };
    } else if (Array.isArray(value)) result = value.map(function (part) { return encode(part, seen, depth + 1); });
    else {
      // Running recovery timers expose the original model through toData().
      if (typeof value.toData === 'function') {
        var timerData = value.toData();
        if (timerData && timerData !== value) { seen.delete(value); return encode(timerData, seen, depth + 1); }
      }
      result = {};
      var name = typeName(value);
      if (name) result.$type = name;
      Object.keys(value).forEach(function (key) {
        if (key === 'timer' || key === 'node' || key === 'target' || key === 'listeners' || (key.charAt(0) === '_' && !/^_shortCd/.test(key))) return;
        var encoded = encode(value[key], seen, depth + 1);
        if (encoded !== undefined) result[key] = encoded;
      });
    }
    seen.delete(value);
    return result;
  }
  function decode(value, target, depth) {
    if (value === null || typeof value !== 'object') return value;
    if (depth > 40) throw new Error('Local state nesting limit');
    if (value.$date != null) return new Date(value.$date);
    if (value.$bytes) return new Uint8Array(value.$bytes);
    // Earlier local saves emitted native byte arrays as numeric-key objects.
    if (target instanceof Uint8Array && !Array.isArray(value)) return new Uint8Array(encodedBytes(value, 'legacy bytes'));
    if (value.$map) {
      var map = target && typeof target.set === 'function' ? target : new Map();
      if (typeof map.clear === 'function') map.clear();
      value.$map.forEach(function (entry) { map.set(entry[0], decode(entry[1], null, depth + 1)); });
      return map;
    }
    if (Array.isArray(value)) return value.map(function (part) { return decode(part, null, depth + 1); });
    var Ctor = value.$type && (bridge().classes && bridge().classes[value.$type] || bridge()[value.$type]);
    var result = target || (Ctor ? new Ctor() : {});
    Object.keys(value).forEach(function (key) {
      if (key === '$type' || key === '__proto__' || key === 'constructor' || key === 'prototype') return;
      result[key] = decode(value[key], result[key], depth + 1);
    });
    return result;
  }
  function snapshot() {
    var services = { elementHandbook: encode(syncElementHandbook(), new WeakSet(), 0) };
    if (contexts.appearance) services.appearance = encode(contexts.appearance, new WeakSet(), 0);
    if (contexts.card) services.card = encode(contexts.card, new WeakSet(), 0);
    return { version: VERSION, savedAt: now(), role: encode(role(), new WeakSet(), 0), localServices: services };
  }
  function persist() {
    if (!contexts || !role()) return false;
    try {
      migrateStandardPlayableGuide(role());
      var state = snapshot();
      validateSavedState(state);
      global.localStorage.setItem(contexts.storageKey, JSON.stringify(state));
      return true;
    }
    catch (error) { contexts.lastStorageError = String(error.message || error); return false; }
  }
  function schedulePersist() {
    if (pendingPersist) return;
    pendingPersist = true;
    Promise.resolve().then(function () { pendingPersist = false; persist(); });
  }
  function validInteger(value, minimum, maximum) {
    return Number.isSafeInteger(value) && value >= minimum && value <= (maximum == null ? Number.MAX_SAFE_INTEGER : maximum);
  }
  function isStandardPlayableKeyStep(target, step) {
    if (!validInteger(step, 1)) return false;
    var api = bridge(), resolver = api.q6 && api.q6.instance;
    if (!resolver || typeof resolver.getGuideStep !== 'function') return false;
    try {
      var guide = resolver.getGuideStep(target.createVersion, 'PlayableBoard');
      return !!guide && Array.isArray(guide.allSteps) && guide.allSteps.some(function (row) {
        return row.id === step && row.keyStep === 1;
      });
    } catch (_) { return false; }
  }
  function migrateStandardPlayableGuide(target) {
    var record = entries(target.guide).find(function (entry) { return entry[0] === 'PlayableBoard'; });
    // Native Z7 tests only Map.has(), so even an early hand-authored step would
    // suppress the entire opening. Native Guider persists keyStep rows only.
    if (record && !isStandardPlayableKeyStep(target, record[1])) {
      remove(target.guide, 'PlayableBoard');
      return true;
    }
    return false;
  }
  function encodedMap(value, label) {
    if (!value || !Array.isArray(value.$map) || Object.keys(value).length !== 1 || value.$map.length > 100000) throw new Error('存档 Map 无效：' + label);
    var keys = new Set();
    value.$map.forEach(function (entry) {
      if (!Array.isArray(entry) || entry.length !== 2 || !['number', 'string'].includes(typeof entry[0])) throw new Error('存档 Map 项无效：' + label);
      if (typeof entry[0] === 'number' && !Number.isSafeInteger(entry[0])) throw new Error('存档 Map 键无效：' + label);
      var key = typeof entry[0] + ':' + entry[0];
      if (keys.has(key)) throw new Error('存档 Map 键重复：' + label);
      keys.add(key);
    });
    return value.$map;
  }
  function encodedBytes(value, label) {
    var bytes;
    if (value && Array.isArray(value.$bytes) && Object.keys(value).length === 1) bytes = value.$bytes;
    else if (value && typeof value === 'object' && !Array.isArray(value) && Object.keys(value).every(function (key, index) { return key === String(index); })) bytes = Object.values(value);
    else throw new Error('存档原版字节数组无效：' + label);
    if (bytes.length > 100000 || bytes.some(function (byte) { return !validInteger(byte, 0, 255); })) throw new Error('存档原版字节值无效：' + label);
    return bytes;
  }
  function validateSavedState(state) {
    if (!state || state.version !== VERSION || !state.role || !validInteger(state.savedAt, 0)) throw new Error('存档版本或结构不兼容');
    var nodes = 0;
    function walk(value, depth) {
      if (++nodes > 200000 || depth > 40) throw new Error('存档数据过大');
      if (value === null || typeof value === 'boolean' || typeof value === 'string') return;
      if (typeof value === 'number') { if (!Number.isFinite(value)) throw new Error('存档数值无效'); return; }
      if (!value || typeof value !== 'object') throw new Error('存档包含无效数据');
      if (Array.isArray(value)) { value.forEach(function (child) { walk(child, depth + 1); }); return; }
      Object.keys(value).forEach(function (key) {
        if (key === '__proto__' || key === 'constructor' || key === 'prototype') throw new Error('存档对象属性无效');
      });
      if (Object.prototype.hasOwnProperty.call(value, '$map')) encodedMap(value, 'nested');
      if (Object.prototype.hasOwnProperty.call(value, '$bytes')) encodedBytes(value, 'nested');
      if (Object.prototype.hasOwnProperty.call(value, '$date') && (Object.keys(value).length !== 1 || !validInteger(value.$date, 0, 8640000000000000))) throw new Error('存档日期无效');
      if (Object.prototype.hasOwnProperty.call(value, '$type') && !knownTypes.includes(value.$type)) throw new Error('存档模型类型无效');
      Object.keys(value).forEach(function (key) { walk(value[key], depth + 1); });
    }
    walk(state.role, 0);
    if (state.role.guideOnce != null) encodedBytes(state.role.guideOnce, 'role.guideOnce');
    if (state.role.onceData != null) encodedMap(state.role.onceData, 'role.onceData').forEach(function (entry) {
      var record = entry[1];
      if (!validInteger(entry[0], 0, 16) || !record || (record.$type != null && record.$type !== 'gl') || Object.keys(record).some(function (key) { return key !== '$type' && key !== 'data'; })) throw new Error('存档原版一次性记录无效');
      encodedBytes(record.data, 'onceData.data');
    });
    if (state.localServices != null) {
      if (!state.localServices || typeof state.localServices !== 'object' || Object.keys(state.localServices).some(function (key) { return !['elementHandbook', 'appearance', 'card'].includes(key); })) throw new Error('存档本地服务数据无效');
      encodedMap(state.localServices.elementHandbook, 'localServices.elementHandbook').forEach(function (entry) {
        if (!validInteger(entry[0], 1) || !lookup('Element', entry[0]) || (entry[1] !== 0 && entry[1] !== 1)) throw new Error('存档原版图鉴记录无效');
      });
      var appearance = state.localServices.appearance;
      if (appearance != null) {
        if (appearance.id !== state.role.id || Object.keys(appearance).some(function (key) { return !['id', 'img', 'boxes', 'uniform', 'pet', 'jobBadge'].includes(key); })) throw new Error('存档外观所有权结构无效');
        appearanceFields.forEach(function (field) {
          encodedMap(appearance[field[0]], 'appearance.' + field[0]).forEach(function (entry) {
            if (!validInteger(entry[0], 1) || !lookup(field[1], entry[0]) || !entry[1] || !validInteger(entry[1].count, 1) || Object.keys(entry[1]).some(function (key) { return key !== 'count'; })) throw new Error('存档外观所有权无效');
          });
        });
      }
      var card = state.localServices.card;
      if (card != null) {
        if (card.id !== state.role.id || !validInteger(card.cardPoint, 0) || !validInteger(card.jokerCard, 0) || Object.keys(card).some(function (key) { return !['id', 'cardPoint', 'jokerCard', 'gambleCounts', 'rewarded', 'news', 'cards'].includes(key); })) throw new Error('存档收藏卡数据无效');
        encodedMap(card.cards, 'card.cards').forEach(function (entry) {
          if (!validInteger(entry[0], 1) || !lookup('GooseCard', entry[0]) || !entry[1] || !validInteger(entry[1].count, 1) || Object.keys(entry[1]).some(function (key) { return key !== 'count'; })) throw new Error('存档收藏卡所有权无效');
        });
        encodedMap(card.news, 'card.news').forEach(function (entry) {
          if (!validInteger(entry[0], 1) || !lookup('GooseCard', entry[0]) || typeof entry[1] !== 'boolean') throw new Error('存档收藏卡新标记无效');
        });
        encodedMap(card.rewarded, 'card.rewarded').forEach(function (entry) {
          if (!lookup('GooseCardSeries', entry[0]) || typeof entry[1] !== 'boolean') throw new Error('存档收藏卡系列奖励标记无效');
        });
        encodedMap(card.gambleCounts, 'card.gambleCounts').forEach(function (entry) {
          if (!validInteger(entry[0], 0, 100) || !validInteger(entry[1], 0)) throw new Error('存档收藏卡抽取计数无效');
        });
      }
    }
    if (state.role.shop != null) encodedMap(state.role.shop, 'role.shop').forEach(function (entry) {
      var group = entry[1];
      if (!lookup('ShopColumn', entry[0]) || !group || group.$type !== 'wl' || group.groupId !== entry[0] || group.aid !== 0 || !validInteger(group.refreshTime, 0) || !Array.isArray(group.goods)) throw new Error('存档本地商店货架无效');
      var seen = new Set();
      group.goods.forEach(function (item) {
        var cfg = lookup('Shop', item.id), fixed = fixedShopPrice(cfg);
        if (item.$type !== 'rl' || !cfg || cfg.columnId !== group.groupId || !fixed || seen.has(item.id) || item.priceType !== fixed.type || item.priceValue !== fixed.value || !validInteger(item.buyedCount, 0) || cfg.refreshInventory > 0 && item.buyedCount > cfg.refreshInventory) throw new Error('存档本地商店商品无效');
        seen.add(item.id);
      });
    });
    ['coin', 'diamond', 'star', 'starCost', 'expLevel'].forEach(function (key) {
      if (!validInteger(state.role[key], 0)) throw new Error('存档资源无效：' + key);
    });
    if (!validInteger(state.role.level, 1)) throw new Error('存档等级无效');
    var energy = state.role.energy;
    if (!energy || !validInteger(energy.value, 0) || !validInteger(energy.valueMax, 1, 100000) ||
      !validInteger(energy.interval, 1, 86400) || !validInteger(energy.intervalValue, 1, 100000) || !validInteger(energy.startTime, 0)) throw new Error('存档体力无效');
    var boards = encodedMap(state.role.boards, 'role.boards');
    var mainEntry = boards.find(function (entry) { return entry[0] === 1; });
    if (!mainEntry) throw new Error('存档缺少原始主棋盘');
    var board = mainEntry[1];
    if (!board || board.$type !== 'pl' || board.id !== 1 || board.rows !== 9 || board.cols !== 7 || !validInteger(board.incrementId, 0)) throw new Error('存档主棋盘结构无效');
    var cells = encodedMap(board.cells, 'board.cells');
    if (cells.length !== 63) throw new Error('存档主棋盘必须包含 63 个格子');
    function cell(value, index, bag) {
      if (!value || value.$type !== 'll' || !validInteger(value.elementId, bag ? 1 : 0) ||
        (value.elementId > 0 && !lookup('Element', value.elementId))) throw new Error('存档包含未知原版道具');
      if (!validInteger(value.state, 0, 65535) || (index != null && value.index !== index)) throw new Error('存档格子状态无效');
      if (bag && value.state !== 0) throw new Error('存档背包道具未解锁');
      encodedMap(value.recovery, 'cell.recovery').forEach(function (entry) {
        var timer = entry[1];
        if (!timer || timer.$type !== 'el' || !validInteger(timer.value, 0) || !validInteger(timer.valueMax, 0) ||
          !Number.isFinite(timer.interval) || timer.interval < 0 || !validInteger(timer.startTime, 0)) throw new Error('存档恢复计时器无效');
      });
    }
    cells.forEach(function (entry) {
      if (!checkIndex(entry[0])) throw new Error('存档格子下标无效');
      cell(entry[1], entry[0], false);
    });
    if (!board.bag || !validInteger(board.bag.size, 0, 1000)) throw new Error('存档背包容量无效');
    ['items', 'mpItems', 'producerItems', 'passNewItems', 'wasteBasket', 'mpV2Items'].forEach(function (name) {
      if (board.bag[name] == null) return;
      var items = encodedMap(board.bag[name], 'bag.' + name);
      if (name === 'items' && items.length > board.bag.size) throw new Error('存档背包超过容量');
      items.forEach(function (entry) { cell(entry[1], null, true); });
    });
    encodedMap(board.orders, 'board.orders').forEach(function (entry) {
      var order = entry[1];
      if (!order || order.$type !== 'Zc' || !validInteger(order.id, 1) || !validInteger(order.orderId, 1) || !lookup('Order', order.orderId)) throw new Error('存档订单无效');
    });
    encodedMap(board.channel, 'board.channel').forEach(function (entry) {
      var item = entry[1];
      if (!item || item.$type !== 'Za' || !validInteger(item.itemType, 1) || !validInteger(item.value, 1) ||
        (item.itemType === 7 && !lookup('Element', item.itemId))) throw new Error('存档奖励通道无效');
    });
    if (state.role.build) {
      var build = state.role.build;
      if (!Array.isArray(build.areas) || build.areas.some(function (id) { return !validInteger(id, 1); }) ||
        !validInteger(build.adornCoupon, 0) || !validInteger(build.adornPoint, 0)) throw new Error('存档装修资源无效');
      encodedMap(build.adorns, 'build.adorns').forEach(function (entry) {
        var adorn = entry[1];
        if (!adorn || adorn.$type !== 'Mc' || adorn.id !== entry[0] || !lookup('Adron', adorn.id) ||
          !validInteger(adorn.level, 0) || !Number.isFinite(adorn.cellX) || !Number.isFinite(adorn.cellY) ||
          !validInteger(adorn.dir, 0) || !validInteger(adorn.usingId, 0)) throw new Error('存档装修道具无效');
        if (adorn.usingId) {
          var skin = lookup('AdronSkin', adorn.usingId);
          if (!skin || skin.adornId !== adorn.id) throw new Error('存档装修外观无效');
        }
        encodedMap(adorn.buyed, 'adorn.buyed');
      });
      encodedMap(build.builds, 'build.builds').forEach(function (entry) {
        var record = entry[1];
        if (!record || record.$type !== 'Hc' || record.id !== entry[0] || !lookup('Build', record.id) ||
          !validInteger(record.state, 0) || !validInteger(record.level, 0)) throw new Error('存档装修记录无效');
      });
      encodedMap(build.builded, 'build.builded').forEach(function (entry) {
        if (!lookup('Build', entry[0]) || typeof entry[1] !== 'boolean') throw new Error('存档装修完成标记无效');
      });
    }
    return state;
  }
  function readSave() {
    try {
      var raw = global.localStorage.getItem(contexts ? contexts.storageKey : DEFAULT_KEY);
      if (!raw) return null;
      return validateSavedState(JSON.parse(raw));
    } catch (error) { if (contexts) contexts.lastStorageError = String(error.message || error); return null; }
  }
  function restore(saved, target) {
    try {
      validateSavedState(saved);
      var restoredRole = target || role();
      decode(saved.role, restoredRole, 0);
      // el is the original wire model. The original cache-board mount must call
      // G2.convertRecovery only after the Cocos clock/board services are bound;
      // that method constructs and starts the original U$ (RecoverTimer).
      normalizeOnceData(restoredRole);
      migrateStandardPlayableGuide(restoredRole);
      syncOrderGotFlags(restoredRole);
      ensureInitialBuildRecord(restoredRole);
      ensureLocalShop(restoredRole);
      contexts.elementHandbook = saved.localServices ? decode(saved.localServices.elementHandbook, null, 0) : null;
      contexts.appearance = saved.localServices && saved.localServices.appearance ? decode(saved.localServices.appearance, null, 0) : null;
      contexts.card = saved.localServices && saved.localServices.card ? decode(saved.localServices.card, null, 0) : null;
      if (restoredRole === role()) refreshMainBuildRecords();
      return true;
    } catch (error) { if (contexts) contexts.lastStorageError = String(error.message || error); return false; }
  }
  function makeResponse(request, data, error) {
    var response = typeof request.respType === 'function' ? new request.respType() : {};
    if (!error) {
      // ef carries only handbook: Map<int,int>; it has no role field.
      if (String(request.cmd).toLowerCase() !== 'game_getelementhandbook') response.role = role();
      Object.keys(data || {}).forEach(function (key) { response[key] = data[key]; });
    }
    return {
      code: error ? 501 : 0,
      error: error || null,
      cmd: request.cmd,
      getData: function () { return response; },
    };
  }
  function cloneCell(cell) {
    if (!cell) return cell;
    return decode(encode(cell, new WeakSet(), 0), null, 0);
  }
  function commitPredictions(id) {
    var b = bridge(), originalBoard = b.G2.Data;
    var board = boardById(id || (originalBoard && originalBoard.id));
    if (!board) throw new Error('本地棋盘尚未初始化');
    if (b.G2.BoardCells && originalBoard && originalBoard.id === board.id) {
      if (originalBoard === board) {
        // The local session's board is authoritative and already owns live RecoverTimer instances.
        // Never replace those cells with serialization clones during an ordinary prediction ack.
        board.cells = b.G2.BoardCells;
      } else {
        var cells = new Map();
        b.G2.BoardCells.forEach(function (cell, key) { cells.set(key, cloneCell(cell)); });
        board.cells = cells;
      }
      board.incrementId = originalBoard.incrementId;
      if (originalBoard.seed) board.seed = originalBoard.seed;
      if (originalBoard.channel) board.channel = originalBoard.channel;
      if (originalBoard.bag) board.bag = originalBoard.bag;
      if (originalBoard.tutorialOrder) board.tutorialOrder = originalBoard.tutorialOrder;
    }
    return board;
  }
  function validatePrediction(command, p) {
    if (!boardById(p.boardId)) throw new Error('未知棋盘');
    if (/multiplecellmove$/.test(command)) {
      if (!Array.isArray(p.moveInformation)) throw new Error('缺少移动序列');
      p.moveInformation.forEach(function (entry) { validatePrediction('game_cellmove', Object.assign({ boardId: p.boardId }, entry)); });
    } else if (/cellmove$/.test(command)) {
      if (!checkIndex(p.index) || !checkIndex(p.toIndex) || (p.moveType !== 1 && p.moveType !== 2)) throw new Error('无效的原客户端移动参数');
    } else if (/multiplecellproduct$/.test(command)) {
      if (!Array.isArray(p.productInformation) || !checkIndex(p.index)) throw new Error('缺少产出序列');
      p.productInformation.forEach(function (entry) { validatePrediction('game_cellproduct', Object.assign({ boardId: p.boardId, index: p.index }, entry)); });
    } else if (/cellproduct$/.test(command)) {
      if (!checkIndex(p.index) || !Array.isArray(p.cells)) throw new Error('无效的原客户端产出参数');
      p.cells.forEach(function (cell) { if (!checkIndex(cell.index) || !lookup('Element', cell.elementId)) throw new Error('产物不在原配置中'); });
    } else if (/multiplecellcollect$/.test(command)) {
      if (!Array.isArray(p.collectInformation)) throw new Error('缺少领取序列');
    } else if (/cellcollect$|cellsell$|celltobag$/.test(command)) {
      if (!checkIndex(p.index)) throw new Error('无效的原客户端格子参数');
    } else if (/cellundo$|cellbagput$|channelput$/.test(command)) {
      if (!checkIndex(p.toIndex)) throw new Error('无效的原客户端目标格子');
    }
  }
  function resourceProperty(name) {
    return { Coin: 'coin', Diamond: 'diamond', Exp: 'expLevel', Star: 'star', Energy: 'energy', AdornCoupon: 'build.adornCoupon' }[name];
  }
  function fixedShopPrice(cfg) {
    if (!cfg || cfg.cash || cfg.ad || cfg.extraFirst || (cfg.Energy && cfg.Energy.length)) return null;
    var coin = cfg.coinRange || [], diamond = cfg.diamondRange || [];
    if (coin.length === 1 && !diamond.length && validInteger(coin[0], 1)) return { type: 3, value: coin[0], resource: 'Coin' };
    if (diamond.length === 1 && !coin.length && validInteger(diamond[0], 1)) return { type: 4, value: diamond[0], resource: 'Diamond' };
    return null; // Random ranges / mixed-currency rolls belong to the unknown server selection.
  }
  function localShopUnlocked(target, groupId) {
    var gate = lookup('Unlock', groupId === 1 ? 'shopShowPig' : groupId === 2 ? 'shopShowItem' : '');
    var cfg = bridge().config.Config && bridge().config.Config.config;
    return target.level >= (gate ? gate.level : cfg ? cfg.shopUnlockPlayerLevel : 3);
  }
  function localShopCandidates(target, groupId) {
    return allConfigs('Shop').filter(function (cfg) {
      if (cfg.columnId !== groupId || cfg.isOnline !== 1 || !fixedShopPrice(cfg)) return false;
      if ((cfg.unlock || []).length) {
        try { if (!bridge().K6 || !bridge().K6.CheckUnlock(cfg.unlock)) return false; }
        catch (_) { return false; }
      }
      try { validateBasicRewards(cfg.goods); } catch (_) { return false; }
      return entries(cfg.goods).length > 0;
    }).sort(function (a, b) { return a.id - b.id; }).slice(0, groupId === 2 ? 6 : 20);
  }
  function createLocalShopGroup(target, groupId) {
    var api = bridge(), Group = api.wl || api.classes.wl, Item = api.rl || api.classes.rl;
    if (!Group || !Item) throw new Error('原商店 wl/rl 模型尚未加载');
    var group = new Group();group.groupId = groupId;group.aid = 0;group.refreshTime = 0;
    group.goods = localShopCandidates(target, groupId).map(function (cfg) {
      var price = fixedShopPrice(cfg), item = new Item();
      item.id = cfg.id;item.priceType = price.type;item.priceValue = price.value;
      return item;
    });
    return group;
  }
  function ensureLocalShop(target) {
    if (!bridge().config.Shop || !bridge().config.ShopColumn) return;
    if (!target.shop) target.shop = new Map();
    [1, 2, 4].forEach(function (id) {
      if (localShopUnlocked(target, id) && !get(target.shop, id)) {
        var group = createLocalShopGroup(target, id);
        if (group.goods.length) set(target.shop, id, group);
      }
    });
  }
  function checkMainShop(p) {
    if (p.actType || p.boardType != null && p.boardType !== bridge().ar?.main && p.boardType !== 1) throw new Error('本地商店仅接入主棋盘虚拟货币货架');
    ensureLocalShop(role());
    if (!localShopUnlocked(role(), 2)) throw new Error('原商店尚未达到解锁等级');
    return { actShopBanner: new Map() };
  }
  function buyLocalShop(p) {
    if (!validInteger(p.itemId, 1)) throw new Error('原商品 ID 无效');
    var cfg = lookup('Shop', p.itemId), fixed = fixedShopPrice(cfg);
    if (!fixed || ![1, 2, 4].includes(cfg.columnId)) throw new Error('本地商店不结算现金、广告或未知随机商品');
    var group = get(role().shop, cfg.columnId), item = group && group.goods.find(function (row) { return row.id === p.itemId; });
    if (!localShopUnlocked(role(), cfg.columnId) || !item || !localShopCandidates(role(), cfg.columnId).some(function (row) { return row.id === p.itemId; })) throw new Error('原商品尚未解锁或未在本地货架');
    if (item.priceType !== fixed.type || item.priceValue !== fixed.value || !validInteger(item.buyedCount, 0)) throw new Error('本地商品价格或库存状态无效');
    if (cfg.refreshInventory > 0 && item.buyedCount >= cfg.refreshInventory) throw new Error('原商品本轮库存已售完');
    var cost = fixed.value;
    if (cfg.plusNum > 0) cost += cfg.plusNum * item.buyedCount;
    else if (cfg.multiplyNum > 0) cost *= Math.pow(cfg.multiplyNum, item.buyedCount);
    var ab = bridge().q6?.instance?.getShopAB ? bridge().q6.instance.getShopAB(cfg.id) : cfg;
    if (ab.maxPrice > 0) cost = Math.min(cost, ab.maxPrice);
    var board = boardById(1);
    if (!validInteger(cost, 1) || !board || resourceValue(fixed.resource) < cost) throw new Error('原商品购买资源不足或价格无效');
    validateBasicRewards(cfg.goods);
    adjustResource(fixed.resource, -cost);
    var rewards = entries(cfg.goods).map(function (entry) { return rewardItem(entry[0], Number(entry[1]), board); });
    item.buyedCount += 1;
    return { rewards: rewards };
  }
  function refreshLocalShop(p) {
    var id = p.groupId, cfg = lookup('ShopColumn', id), group = get(role().shop, id);
    if (![1, 2, 4].includes(id) || !cfg || !group || !localShopUnlocked(role(), id) || !entries(cfg.refreshCost).length) throw new Error('此本地货架没有已验证的手动刷新');
    var daily = role().daily00Event || new Map(), key = 'shop#r#c#' + id, count = get(daily, key) || 0;
    if (cfg.refreshNummax > 0 && count >= cfg.refreshNummax) throw new Error('原货架本日刷新次数已达上限');
    var costs = entries(cfg.refreshCost).map(function (entry) { return [entry[0], Number(entry[1]) + count * (cfg.CostNum || 0)]; });
    costs.forEach(function (entry) {
      if (!['Coin', 'Diamond'].includes(entry[0]) || !validInteger(entry[1], 1) || resourceValue(entry[0]) < entry[1]) throw new Error('原货架刷新资源不足或类型未接入');
    });
    var replacement = createLocalShopGroup(role(), id);
    costs.forEach(function (entry) { adjustResource(entry[0], -entry[1]); });
    group.goods = replacement.goods;
    role().daily00Event = daily;set(daily, key, count + 1);
    return {};
  }
  function resourceValue(name) {
    var property = resourceProperty(name);
    if (property === 'energy') return role().energy.value;
    if (property === 'build.adornCoupon') return role().build.adornCoupon;
    return property ? role()[property] : null;
  }
  function adjustResource(name, amount) {
    var property = resourceProperty(name);
    if (property === 'energy') role().energy.value += amount;
    else if (property === 'build.adornCoupon') role().build.adornCoupon += amount;
    else role()[property] += amount;
  }
  function validateBasicRewards(reward) {
    entries(reward).forEach(function (entry) {
      if (!validInteger(Number(entry[1]), 1)) throw new Error('原版奖励数量无效');
      if (!resourceProperty(entry[0]) && !(/^\d+$/.test(entry[0]) && lookup('Element', Number(entry[0])))) throw new Error('尚未实现此原版奖励类型：' + entry[0]);
      if (entry[0] === 'AdornCoupon' && !role().build) throw new Error('原装修模型尚未初始化');
    });
  }
  function rewardItem(name, count, board) {
    var b = bridge(), resource = resourceProperty(name), item = new b.classes.Za();
    var kinds = { Coin: 1, Diamond: 2, Exp: 3, Energy: 4, Star: 9, AdornCoupon: 18 };
    item.value = count;
    if (resource) {
      item.itemType = kinds[name];
      adjustResource(name, count);
    } else if (/^\d+$/.test(name) && lookup('Element', Number(name))) {
      item.id = ++board.incrementId;
      item.itemId = Number(name);item.itemType = 7;item.from = 'order';
      set(board.channel, item.id, item);
    } else throw new Error('尚未实现此原版奖励类型：' + name);
    return item;
  }
  function completed(board, id) { return !!get(board.ordered, Number(id)); }
  function nextOrders(board, finished) {
    var candidates = contexts.orderConfigs || allConfigs('Order');
    candidates.forEach(function (cfg) {
      var conditions = cfg.unlock || [];
      if (cfg.type !== 'Main' || get(board.orders, cfg.id) || completed(board, cfg.id)) return;
      var satisfied = false;
      if (bridge().K6 && typeof bridge().K6.CheckUnlock === 'function') {
        // Reuse the recovered client's full condition grammar and its current role/build state.
        try { satisfied = !!bridge().K6.CheckUnlock(conditions); }
        catch (error) {
          // A peripheral unlock may require an unmounted subsystem. Preserve the already valid
          // settlement, record that unresolved original condition and never guess its result.
          contexts.unlockErrors = contexts.unlockErrors || [];
          if (!contexts.unlockErrors.some(function (entry) { return entry.orderId === cfg.id; })) contexts.unlockErrors.push({ orderId: cfg.id, error: String(error.message || error) });
          return;
        }
      } else {
        // Limited diagnostic bridges do not load the original condition subsystem.
        satisfied = conditions.some(function (condition) {
          return String(condition).split('/').some(function (branch) {
            return branch.split('+').every(function (part) {
              var match = /^FinishOrder(\d+)$/.exec(part);
              return !!match && completed(board, Number(match[1]));
            });
          });
        });
      }
      if (!satisfied) return;
      var OrderModel = bridge().classes.Zc;
      var order = new OrderModel();
      order.id = cfg.id;order.orderId = cfg.id;
      entries(cfg.demand).forEach(function (entry) { set(order.demand, Number(entry[0]), Number(entry[1])); });
      set(board.orders, order.id, order);
      if (!board.ordered.has(order.orderId)) set(board.ordered, order.orderId, false);
    });
    if (bridge().G2.Data && bridge().G2.Data.id === board.id) {
      bridge().G2.Data.orders = board.orders;
      bridge().G2.Data.ordered = board.ordered;
    }
  }
  function completeOrder(p) {
    var b = bridge(), board = boardById(p.boardId);
    if (!board) throw new Error('未知棋盘');
    var order = get(board.orders, p.orderId);
    if (!order || order.rewarded || completed(board, order.orderId)) throw new Error('订单已经完成或不存在');
    var cfg = lookup('Order', order.orderId);
    if (!cfg) throw new Error('原订单配置不存在');
    var indexes = Array.isArray(p.indexes) ? p.indexes : [], bagIds = Array.isArray(p.bagItemIds) ? p.bagItemIds : [];
    if (new Set(indexes).size !== indexes.length || new Set(bagIds).size !== bagIds.length) throw new Error('订单道具重复');
    var supplied = new Map();
    indexes.forEach(function (index) {
      var cell = get(board.cells, index);
      if (!checkIndex(index) || !cell || !cell.elementId || (cell.state & 3) || cell.bubbleEnd) throw new Error('订单格子无效');
      supplied.set(cell.elementId, (supplied.get(cell.elementId) || 0) + 1);
    });
    bagIds.forEach(function (id) {
      var cell = get(board.bag.items, id);
      if (!cell || !cell.elementId || (cell.state & 3)) throw new Error('订单背包道具无效');
      supplied.set(cell.elementId, (supplied.get(cell.elementId) || 0) + 1);
    });
    var demand = entries(cfg.demand);
    if (supplied.size !== demand.length || demand.some(function (entry) { return supplied.get(Number(entry[0])) !== Number(entry[1]); })) throw new Error('订单需求不匹配');
    // Validate all reward types before making any settlement mutation.
    validateBasicRewards(cfg.reward);
    indexes.forEach(function (index) {
      var cell = new b.classes.ll();cell.index = index;
      set(board.cells, index, cell);
      if (b.G2.BoardCells && b.G2.Data && b.G2.Data.id === board.id) set(b.G2.BoardCells, index, cloneCell(cell));
    });
    bagIds.forEach(function (id) { remove(board.bag.items, id); });
    order.rewarded = true;
    set(board.ordered, order.orderId, true);
    remove(board.orders, p.orderId);
    var rewards = entries(cfg.reward).map(function (entry) { return rewardItem(entry[0], Number(entry[1]), board); });
    nextOrders(board, order.orderId);
    refreshMainBuildRecords();
    if (b.G2.Data && b.G2.Data.id === board.id) {
      b.G2.Data.orders = board.orders;b.G2.Data.ordered = board.ordered;b.G2.Data.channel = board.channel;
    }
    return { rewards: rewards };
  }
  function buildOriginal(p) {
    var b = bridge(), data = role().build, cfg = lookup('Build', p.buildId);
    if (!cfg || !data || !validInteger(p.buildId, 1)) throw new Error('原装修配置或玩家装修模型不存在');
    if (p.houseId != null && p.houseId !== 0) throw new Error('本地适配器尚未实现原版房间装修');
    if (get(data.builded, p.buildId)) throw new Error('此原版装修任务已完成');
    if (!b.K6 || typeof b.K6.CheckUnlock !== 'function') throw new Error('原装修解锁判定尚未初始化');
    if (!b.K6.CheckUnlock(cfg.unlock)) throw new Error('原版装修解锁条件尚未满足');
    var buildInfo = b.q6 && b.q6.instance && b.q6.instance.getBuildInfo ? b.q6.instance.getBuildInfo(p.buildId) : cfg;
    if (!buildInfo) throw new Error('原装修版本配置不存在');
    var costs = entries(buildInfo.demand), reward = entries(buildInfo.reward), board = boardById(1);
    if (!board) throw new Error('原主棋盘尚未初始化');
    costs.forEach(function (entry) {
      if (!resourceProperty(entry[0]) || !validInteger(Number(entry[1]), 1)) throw new Error('尚未实现此原版装修消耗：' + entry[0]);
      if (resourceValue(entry[0]) < Number(entry[1])) throw new Error('原装修任务资源不足：' + entry[0]);
    });
    // Prepare all new original models and validate every reward before changing a balance.
    var prepared = reward.map(function (entry) {
      var name = entry[0], amount = Number(entry[1]), match = /^Adorn(\d+)$/.exec(name);
      if (!match) { validateBasicRewards(new Map([entry])); return { name: name, count: amount }; }
      var id = Number(match[1]), adornCfg = lookup('Adron', id), skin = lookup('AdronSkin', p.skinId);
      if (!b.classes.Mc || !adornCfg || amount !== 1 || !skin || skin.adornId !== id) throw new Error('原装修道具或外观参数无效');
      if (!Number.isFinite(p.cellX) || !Number.isFinite(p.cellY) || !validInteger(p.dir, 0)) throw new Error('原装修位置或朝向无效');
      var before = get(data.adorns, id), model = new b.classes.Mc();
      if (before) decode(encode(before, new WeakSet(), 0), model, 0);
      model.id = id;model.level = before ? before.level + 1 : 0;
      model.cellX = p.cellX;model.cellY = p.cellY;model.dir = p.dir;model.usingId = p.skinId;
      set(model.buyed, p.skinId, 1);
      return { name: name, count: amount, adorn: model };
    });
    costs.forEach(function (entry) { adjustResource(entry[0], -Number(entry[1])); });
    var rewards = prepared.map(function (entry) {
      if (!entry.adorn) return rewardItem(entry.name, entry.count, board);
      set(data.adorns, entry.adorn.id, entry.adorn);
      var item = new b.classes.Za();item.itemType = 8;item.itemId = entry.adorn.id;item.value = entry.count;
      return item;
    });
    set(data.builded, p.buildId, true);
    // Completed flags are the original source of truth; do not invent an unknown server-side Hc state value.
    remove(data.builds, p.buildId);
    nextOrders(board);
    refreshMainBuildRecords();
    return { rewards: rewards };
  }
  function levelUpOriginal(p) {
    var b = bridge(), cursor = role().level, xp = role().expLevel, board = boardById(1), plan = [];
    if (!board) throw new Error('原主棋盘尚未初始化');
    for (var count = 0; count < 1000; count++) {
      var current = lookup('PlayerLevel', cursor), next = lookup('PlayerLevel', cursor + 1), threshold;
      if (b.q6 && b.q6.instance && b.q6.instance.getPlayerUpgradeExp) threshold = b.q6.instance.getPlayerUpgradeExp(cursor);
      else threshold = next && current ? { hasNextLevel: true, expMax: next.exp - current.exp, reachLevel: next.id } : { hasNextLevel: false };
      if (!threshold.hasNextLevel || !validInteger(threshold.expMax, 1) || xp < threshold.expMax) break;
      var rewardCfg = null;
      if (b.q6 && b.q6.instance && b.q6.instance.findABConfig && b.config.PlayerLevelReward) rewardCfg = b.q6.instance.findABConfig(threshold.reachLevel, b.config.PlayerLevelReward.getById);
      if (!rewardCfg) rewardCfg = lookup('PlayerLevel', threshold.reachLevel);
      if (!rewardCfg) throw new Error('原版升级奖励配置不存在');
      validateBasicRewards(rewardCfg.reward);
      plan.push({ level: threshold.reachLevel, reward: rewardCfg.reward });
      xp -= threshold.expMax;cursor = threshold.reachLevel;
      if (!p.upgradeAll) break;
    }
    if (!plan.length) throw new Error('原版升级所需经验不足或已达最高等级');
    role().level = cursor;role().expLevel = xp;
    var rewards = [];
    plan.forEach(function (entry) { entries(entry.reward).forEach(function (item) { rewards.push(rewardItem(item[0], Number(item[1]), board)); }); });
    nextOrders(board);
    refreshMainBuildRecords();
    ensureLocalShop(role());
    return { rewards: rewards };
  }
  function claimElementHandbook(p) {
    var id = p.elementId, cfg = lookup('Element', id), history = syncElementHandbook();
    if (!validInteger(id, 1) || !cfg || history.get(id) !== 0) throw new Error('原版图鉴道具未知或奖励已经领取');
    var board = boardById(1);
    if (!board) throw new Error('原主棋盘尚未初始化');
    validateBasicRewards(cfg.unlockReward);
    var rewards = entries(cfg.unlockReward).map(function (entry) { return rewardItem(entry[0], Number(entry[1]), board); });
    history.set(id, 1);
    var live = originalHandbookData();
    if (live) live.set(id, 1);
    return { rewards: rewards };
  }
  function editOriginalAdorn(p) {
    var data = role().build, id = p.adornId, skin = lookup('AdronSkin', p.skinId);
    if (p.houseId != null && p.houseId !== 0) throw new Error('本地适配器尚未实现原版扩展房间编辑');
    var adorn = data && get(data.adorns, id);
    if (!validInteger(id, 1) || !adorn || !lookup('Adron', id) || !skin || skin.adornId !== id || !get(adorn.buyed, p.skinId) && get(adorn.buyed, p.skinId) !== 0) throw new Error('原版装修道具或已拥有外观不存在');
    if (!Number.isFinite(p.cellX) || !Number.isFinite(p.cellY) || !validInteger(p.dir, 0, 3)) throw new Error('原版装修编辑位置或朝向无效');
    // The original BuildEdit only sends this after isBuyed(usingSkin). The first
    // confirmation saves the already paid default counter, never pays build rewards again.
    // Alternative owned skins may alter adorn-point rules not present in this first flow.
    if (adorn.usingId !== p.skinId) throw new Error('本地适配器尚未验证原版外观切换结算');
    adorn.cellX = p.cellX;adorn.cellY = p.cellY;adorn.dir = p.dir;adorn.usingId = p.skinId;
    return { adornId: id, rewards: [] };
  }
  function onceModel() { return bridge().classes.gl || bridge().gl; }
  function normalizeOnceData(target) {
    var Ctor = onceModel();
    if (!target.onceData || !Ctor) return;
    entries(target.onceData).forEach(function (entry) {
      var record = entry[1];
      if (!(record instanceof Ctor)) {
        var original = new Ctor();original.data = record.data instanceof Uint8Array ? record.data : new Uint8Array(encodedBytes(record.data, 'onceData.data'));
        set(target.onceData, entry[0], original);
      }
    });
  }
  function setOriginalOnceData(p) {
    if (!validInteger(p.key, 0, 16) || !validInteger(p.index, 0, 799)) throw new Error('原版一次性标记参数无效');
    var Ctor = onceModel();
    if (!Ctor) throw new Error('原版 gl 一次性记录模型尚未加载');
    var records = role().onceData;
    if (!records || typeof records.get !== 'function') throw new Error('原版 onceData Map 尚未初始化');
    var record = get(records, p.key);
    if (record && (!(record instanceof Ctor) || !(record.data instanceof Uint8Array))) throw new Error('原版一次性标记字节模型无效');
    if (!record) { record = new Ctor();record.data = new Uint8Array(100); }
    if (p.index >= record.data.length * 8) throw new Error('原版一次性标记超出原字节数组');
    // Native E8.offOnceData already predicts this bit. OR is idempotent and
    // acknowledges that exact preference without toggling or granting anything.
    record.data[Math.floor(p.index / 8)] |= 1 << (p.index % 8);
    set(records, p.key, record);
  }
  function setOriginalGuideOnce(p) {
    if (!validInteger(p.index, 0, 799)) throw new Error('缺少原版一次性引导参数');
    var bytes = role().guideOnce;
    if (!(bytes instanceof Uint8Array)) throw new Error('原版 guideOnce 字节数组尚未初始化');
    var length = Math.max(bytes.length, Math.floor(p.index / 8) + 1);
    if (length !== bytes.length) { var grown = new Uint8Array(length);grown.set(bytes);bytes = grown; }
    bytes[Math.floor(p.index / 8)] |= 1 << (p.index % 8);
    role().guideOnce = bytes;
  }
  function handle(request) {
    var command = String(request.cmd || '').toLowerCase(), p = request.params || {};
    var data = {}, b = bridge();
    if (contexts.handlers && typeof contexts.handlers[command] === 'function') return contexts.handlers[command](p, request);
    if (predicted.has(command)) {
      validatePrediction(command, p);
      var predictedBoard = commitPredictions(p.boardId);
      data.cells = values(predictedBoard.cells);
      if (/cellcollect$/.test(command)) data.rewards = [];
    } else if (query.has(command)) {
      if (command === 'game_enterboard') {
        if (!values(role().boards).some(function (board) { return board.type === p.boardType; })) throw new Error('本地会话没有此棋盘类型');
      } else if (command === 'game_currenttimestamp') {
        data.ts = now();
        data.dayEnd = Math.floor((data.ts + 8 * 3600000) / 86400000 + 1) * 86400000 - 8 * 3600000;
      }
    } else if (command === 'game_getboard') {
      var board = boardById(p.boardId || (b.G2.Data && b.G2.Data.id));
      if (!board) throw new Error('本地棋盘尚未初始化');
      data = { cells: board.cells, tutorialOrder: board.tutorialOrder, incrementId: board.incrementId, seed: board.seed };
    } else if (command === 'game_shopcheck') data = checkMainShop(p);
    else if (command === 'game_shopbuy') data = buyLocalShop(p);
    else if (command === 'game_shoprefresh') data = refreshLocalShop(p);
    else if (command === 'game_shoplook') {
      values(role().shop).forEach(function (group) { group.goods.forEach(function (item) { item.redDot = false; }); });
    } else if (command === 'imgbox_show') data = { boxes: queryOriginalModel(request, 'boxes', appearanceOwnership()) };
    else if (command === 'card_show') data = { card: queryOriginalModel(request, 'card', cardCollection()) };
    else if (command === 'game_refreshglobalactivity') data = { globalActivity: globalActivitySnapshot(request) };
    else if (command === 'game_getelementhandbook') data = { handbook: syncElementHandbook() };
    else if (command === 'game_elementhandbookreward') data = claimElementHandbook(p);
    else if (command === 'game_completeorder') data = completeOrder(p);
    else if (command === 'game_build') data = buildOriginal(p);
    else if (command === 'game_adornedit') data = editOriginalAdorn(p);
    else if (command === 'game_levelup') data = levelUpOriginal(p);
    else if (command === 'game_guidesave' || command === 'game_guidestart') {
      if (p.id == null || p.step == null) throw new Error('缺少原版引导参数');
      if (p.id === 'PlayableBoard' && !isStandardPlayableKeyStep(role(), p.step)) throw new Error('原标准剧情仅可保存配置中的关键步骤');
      set(role().guide, p.id, p.step);
    } else if (command === 'game_setguideonce') setOriginalGuideOnce(p);
    else if (command === 'game_setoncedata') setOriginalOnceData(p);
    else throw new Error('本地适配器尚未实现原版指令：' + command);
    syncElementHandbook();
    schedulePersist();
    return data;
  }
  async function sendAsync(request) {
    // The original UI performs prediction after invoking its async request; let that call stack finish.
    await Promise.resolve();
    try {
      var data = await handle(request);
      log.push({ command: request.cmd, ok: true, at: now() });
      if (log.length > 100) log.shift();
      return makeResponse(request, data, null);
    } catch (error) {
      var message = String(error.message || error);
      log.push({ command: request.cmd, ok: false, at: now(), error: message });
      if (log.length > 100) log.shift();
      if (contexts.onUnsupported) contexts.onUnsupported(message, request);
      return makeResponse(request, null, message);
    }
  }
  function init(options) {
    options = options || {};
    var api = options.bridge || global.OriginalGameBridge || global.__ORIGINAL__;
    if (!api || !api.Xo || !api.E8 || !api.G2 || !api.classes) throw new Error('原客户端桥接尚未就绪');
    contexts = Object.assign({ bridge: api, storageKey: DEFAULT_KEY }, options, { bridge: api });
    syncOrderGotFlags(role());
    ensureInitialBuildRecord(role());
    refreshMainBuildRecords();
    ensureLocalShop(role());
    var sender = {
      sendAsync: sendAsync,
      sendHttpAsync: sendAsync,
      send: function (request) { return sendAsync(request); },
    };
    api.Xo(sender);
    global.addEventListener('pagehide', persist);
    return LocalBackend;
  }
  var LocalBackend = {
    init: init, send: sendAsync, persist: persist, snapshot: snapshot, readSave: readSave,
    restore: restore, getLog: function () { return log.slice(); },
    getUnlockErrors: function () { return contexts && contexts.unlockErrors ? contexts.unlockErrors.slice() : []; },
    getBuildUnlockErrors: function () { return contexts && contexts.buildUnlockErrors ? contexts.buildUnlockErrors.slice() : []; },
    getShopEvidence: function () { return { mode: 'LOCAL_CONFIG_CATALOG_RECONSTRUCTION', selection: 'Lowest-ID fixed single-currency eligible rows; up to six goods in column2. No legacy tutorial stock is copied.', automaticRefresh: 'Unknown server refresh deadlines are not reconstructed; refreshTime remains zero.', manualRefresh: 'Original ShopColumn virtual currency costs and counters.', catalogs: values(role().shop).filter(function (group) { return [1, 2, 4].includes(group.groupId); }).map(function (group) { return { groupId: group.groupId, goods: group.goods.map(function (item) { return item.id; }) }; }) }; },
    clearSave: function () { global.localStorage.removeItem(contexts ? contexts.storageKey : DEFAULT_KEY); },
    getSupportedCommands: function () { return Array.from(predicted).concat(Array.from(query), ['game_shopcheck', 'game_shopbuy', 'game_shoprefresh', 'game_shoplook', 'imgbox_show', 'card_show', 'game_refreshglobalactivity', 'game_getboard', 'game_getelementhandbook', 'game_elementhandbookreward', 'game_completeorder', 'game_build', 'game_adornedit', 'game_levelup', 'game_guidesave', 'game_guidestart', 'game_setguideonce', 'game_setoncedata']); },
  };
  global.LocalBackend = LocalBackend;
})(window);
