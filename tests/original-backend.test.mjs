import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(import.meta.dirname, '..');
const source = fs.readFileSync(path.join(root, 'original/local-backend.js'), 'utf8');
const json = name => JSON.parse(fs.readFileSync(path.join(root, 'recovered/config/Config', name + '.json'), 'utf8'));
const elementGroups = json('element');
const elements = new Map(Object.values(elementGroups).flatMap(group => Object.values(group)).map(row => [row.id, row]));
const orderGroups = json('Order');
const orders = Object.values(orderGroups).flatMap(group => Object.values(group));
const orderMap = new Map(orders.map(row => [row.id, row]));
const config = json('Config');
const buildGroups = json('Build');
const builds = new Map(Object.values(buildGroups).flatMap(group => Object.values(group)).map(row => [row.id, row]));
const mainBuilds = new Map(Object.values(buildGroups.Main).map(row => [row.id, row]));
const areas = new Map(Object.values(json('Area')).flatMap(group => Object.values(group)).map(row => [row.id, row]));
const adorns = new Map(Object.values(json('Adron')).flatMap(group => Object.values(group)).map(row => [row.id, row]));
const skins = new Map(Object.values(json('AdronSkin')).flatMap(group => Object.values(group)).map(row => [row.id, row]));
const levels = new Map(Object.values(json('PlayerLevel')).map(row => [row.id, row]));
const boardConfigs = new Map(Object.values(json('Board')).map(row => [row.id, row]));
const clone = value => JSON.parse(JSON.stringify(value));
const TIME = 1793808000000;

// Minimal typed bridge for the newly authored transport adapter. The game scripts are not evaluated.
class Recovery {
  constructor() {
    Object.assign(this, { value: 0, valueMax: 0, interval: 0, intervalValue: 1, startTime: TIME,
      pauseTime: 0, state: 0, id: '', skills: new Map(), speedUpStartTime: 0 });
  }
}
class Cell {
  constructor() {
    Object.assign(this, { index: 0, elementId: 0, state: 0, seed: 0, uUID: 0, productType: 0,
      bubbleEnd: 0, deteriorateEnd: 0, openEnd: 0, pauseTime: 0, endTime: 0,
      processTime: 0, skills: new Map(), hp: new Map(), recovery: new Map(), extra: new Map(),
      productCount: 0, autoProductCount: 0, storeBagCell: [] });
  }
}
class Board {
  constructor() {
    Object.assign(this, { id: 1, boardId: 1, type: 'Main', rows: 9, cols: 7, cellSize: 100,
      incrementId: 63, seed: { seed: 1 }, cells: new Map(), channel: new Map(),
      orders: new Map(), ordered: new Map(), tutorialOrder: new Map(),
      bag: { size: 5, items: new Map(), mpItems: new Map(), producerItems: new Map(),
        passNewItems: new Map(), wasteBasket: new Map(), mpV2Items: new Map() } });
  }
}
class Reward { constructor() { Object.assign(this, { id: 0, itemType: 0, itemId: 0, value: 0 }); } }
class Order {
  constructor() { Object.assign(this, { id: 0, orderId: 0, demand: new Map(), elements: new Map(), extra: new Map(), rewarded: false, state: 0 }); }
}
class CellResponse { constructor() { this.cells = []; } }
class RoleResponse { constructor() { this.globalActivity = []; } }
class RewardResponse { constructor() { this.rewards = []; } }
class HandbookResponse { constructor() { this.handbook = new Map(); } }
class AdornResponse { constructor() { this.adornId = 0;this.rewards = []; } }
class Adorn {
  constructor() { Object.assign(this, { id: 0, level: 0, cellX: 0, cellY: 0, dir: 0, usingId: 0, buyed: new Map() }); }
}
class BuildRecord { constructor() { Object.assign(this, { id: 0, state: 0, level: 0 }); } }
class OnceData { constructor() { this.data = new Uint8Array(0); } }

function newRole(board = new Board()) {
  const energy = Object.assign(new Recovery(), { value: config.initEnergy, valueMax: config.energyMax,
    interval: config.energyRecoverRate, intervalValue: 1, id: 'energy' });
  return { id: 1, level: 1, expLevel: 0, coin: config.initCoin, diamond: config.initDiamond,
    star: config.initStar, starCost: 0, energy, boards: new Map([[1, board]]),
    guide: new Map([['Board', 2003]]), guideOnce: new Uint8Array(0), onceData: new Map(), ext: new Uint8Array(0), createAt: new Date(TIME),
    build: { areas: [1], builds: new Map(), adorns: new Map(), builded: new Map(), adornCoupon: 0, adornPoint: 0 } };
}

function harness(setupRole, setupBridge) {
  const board = new Board();
  for (let index = 1; index <= 63; index++) {
    const cell = new Cell();cell.index = index;cell.uUID = index;
    board.cells.set(index, cell);
  }
  const first = new Order();first.id = 10001;first.orderId = 10001;
  first.demand = new Map(Object.entries(orderMap.get(10001).demand).map(([id, count]) => [Number(id), count]));
  board.orders.set(first.id, first);
  const role = newRole(board);
  if (setupRole) setupRole(role, board);
  const storage = new Map();
  const window = {
    localStorage: { getItem: key => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, value), removeItem: key => storage.delete(key) },
    addEventListener() {},
  };
  const bridge = {
    Xo: sender => { window.sender = sender; }, E8: { role, serverTime: TIME },
    G2: { Data: board, BoardCells: board.cells },
    classes: { ll: Cell, pl: Board, el: Recovery, Za: Reward, Zc: Order,
      Lp: CellResponse, Mp: RoleResponse, Np: RewardResponse, Mc: Adorn, Hc: BuildRecord, gl: OnceData },
    config: {
      Element: { getById: id => elements.get(id) },
      Board: { getById: id => boardConfigs.get(id) },
      Order: { getById: id => orderMap.get(id), list: orders },
      Build: { getById: id => builds.get(id), sheetMap: new Map([['Main', mainBuilds]]) },
      Area: { getById: id => areas.get(id) },
      Adron: { getById: id => adorns.get(id) },
      AdronSkin: { getById: id => skins.get(id) },
      PlayerLevel: { getById: id => levels.get(id) },
    },
    v$: { Data: new Map() },
    K6: {
      CheckUnlock: conditions => conditions.every(condition => String(condition).split('/').some(branch => branch.split('+').every(part => {
        const area = /^UnlockArea(\d+)$/.exec(part);
        if (area) return role.build.areas.includes(Number(area[1]));
        const build = /^FinishBuild(\d+)$/.exec(part);
        if (build) return role.build.builded.get(Number(build[1])) === true;
        const order = /^FinishOrder(\d+)$/.exec(part);
        if (order) return board.ordered.get(Number(order[1])) === true;
        if (part === 'UnlockDrawer1') return true;
        const level = /^PlayerLevel(\d+)$/.exec(part);
        return level ? role.level >= Number(level[1]) : false;
      }))),
    },
  };
  if (setupBridge) setupBridge(bridge);
  vm.runInNewContext(source, { window, Map, Set, WeakSet, Promise, Date, Number, Object, Array, String, Error, JSON, Uint8Array });
  const backend = window.LocalBackend.init({ bridge });
  return {
    window, bridge, role, board, storage, backend,
    send: (cmd, params, respType = RoleResponse) => window.sender.sendAsync({ cmd, params, respType }),
    put(index, id, state = 0) {
      const cell = new Cell();Object.assign(cell, { index, elementId: id, state, uUID: index });
      board.cells.set(index, cell);return cell;
    },
    state: () => JSON.stringify(backend.snapshot()),
  };
}

function recoveredRecoveryRuntime(bridge) {
  // Evaluate only the recovered original el, RecoverTimer and G2 conversion
  // methods. Clock/config/scene collaborators are bounded stubs; timer behavior
  // and conversion themselves are the actual client code, not replacement methods.
  const original = fs.readFileSync(path.join(root, 'readable/game.formatted.js'), 'utf8');
  function fragment(start, end) {
    const from = original.indexOf(start), to = original.indexOf(end, from + start.length);
    assert(from >= 0 && to > from, 'recovered source markers must still identify the exact original methods');
    return original.slice(from, to).trim().replace(/,$/, ';');
  }
  const clock = new Map();
  const context = {
    Map, Math, Date, Uint8Array, Object, Number, String, parseInt,
    Fr: function () {},
    t: (Ctor, Base) => { Object.setPrototypeOf(Ctor, Base);Ctor.prototype = Object.create(Base.prototype, { constructor: { value: Ctor, writable: true, configurable: true } }); },
    o: (_decorators, target) => target, Wr: () => () => {}, jr: () => null, Ur: null,
    Xr: () => new Map(), W$: value => value,
    E8: bridge.E8, G2: bridge.G2,
    yr: { autoProduct: 0, manualProduct: 1 }, mr: { none: 0, web: 1, box: 2, opened: 4 },
    kA: { changeElementData: () => null }, MW: { isStoreElementById: () => false },
    G$: {
      GetCellByIndex: index => {
        const cell = bridge.G2.Data.cells.get(index);
        return cell?.elementId ? { data: { config: elements.get(cell.elementId), remoteData: cell } } : null;
      },
    },
    h: { log() {}, warn() {} },
    b: {
      getClock: id => clock.get(id),
      addClock: id => {
        const entry = { registCallBack(target, callback) { this.target = target;this.callback = callback; }, dispose() { clock.delete(id); } };
        clock.set(id, entry);return entry;
      },
      removeClock: id => clock.delete(id),
    },
  };
  const el = 'var ' + fragment('el = (function (e) {', 'tl = (function (e) {');
  const timer = fragment('var U$ = (function () {', '(cc._RF.pop(), cc._RF.push({ exports: {} }, "a5bb9rtfZhMnaWdSNOUI0aK", "TimeRecover"));');
  const conversion = fragment('(e.convertRecovery = function (e) {', '(e.convertCellRecovery = function (e, t, i) {');
  const cellConversion = fragment('(e.convertCellRecovery = function (e, t, i) {', '(e.convertRecoveryFix = function (e, t, i, n) {');
  vm.runInNewContext(el + '\n' + timer + '\nvar e=G2;\n' + conversion + '\n' + cellConversion + '\nthis.NativeEl=el;this.NativeTimer=U$;', context);
  return { NativeEl: context.NativeEl, NativeTimer: context.NativeTimer, clock };
}

function recoveredQueryModels() {
  // Real 6.2.3 protocol reflection/Map decoder, response constructors and count
  // models. No Cocos, SDK, game login or transport initialization is evaluated.
  const text = fs.readFileSync(path.join(root, 'recovered/reference623/readable/game.formatted.js'), 'utf8');
  const extract = (start, end) => {
    const from = text.indexOf(start), to = text.indexOf(end, from + start.length);
    assert(from >= 0 && to > from);return text.slice(from, to).trim().replace(/,$/, ';');
  };
  const context = { Map, Set, Uint8Array,
    t: (Ctor, Base) => { Object.setPrototypeOf(Ctor, Base);Ctor.prototype = Object.create(Base.prototype, { constructor: { value: Ctor, writable: true, configurable: true } }); },
    o: (decorators, target, key) => { for (let i = decorators.length - 1; i >= 0; i--) decorators[i](target, key); },
    oa: { coin: 1, uniform: 1, frame: 2, frameRebate: 3, photo: 4, pet: 5, jobBadge: 6 },
    Pa: { shop: 1 }, _a: { none: 1 },
  };
  const scripts = [
    extract('function zn(e) {', 'var _o,'),
    'var Fr=fo,Wr=no,Ur=Number,Hr=String,Vr=lo,jr=uo,zr=Boolean,qr=co,Xr=function(){return new Map()};function yu(){}',
    'var ' + extract('Za = (function (e) {', '$a = (function (e) {'),
    'var ' + extract('_s = (function (e) {', 'ws = (function (e) {'),
    'var ' + extract('ku = (function (e) {', 'Du = (function (e) {'),
    'var ' + extract('Bu = (function (e) {', 'Ou = (function (e) {'),
    'var ' + extract('Zu = (function (e) {', '$u = (function (e) {'),
    'var ' + extract('If = (function (e) {', 'Sf = (function (e) {'),
    'var ' + extract('Mh = (function (e) {', 'Gh = (function (e) {'),
    'var ' + extract('ql = (function (e) {', 'Yl = (function (e) {'),
    'var ' + extract('Mp = (function (e) {', 'Gp = (function (e) {'),
    'var ' + extract('rl = (function (e) {', 'al = (function (e) {'),
    'var ' + extract('wl = (function (e) {', 'Cl = (function (e) {'),
    'var ' + extract('uf = (function (e) {', 'pf = (function (e) {'),
    'so([Fr,Za,_s,bs,ku,Ru,Pu,Bu,Lu,Nu,Zu,If,Mh,ql,Mp,rl,wl,uf,hf]);',
    extract('function r(e, t, i, n) {', '\n    function s(e) {'),
    'var upgradeQuery={};var e=upgradeQuery;' + extract('(e.checkNoviceAct = function () {', '(e.oldLevel = 0)'),
    'var pb={};var e=pb;' + extract('(e.IsItemGotAntiAsync = function (t) {', '(e.UpdateAvatar = function (t) {'),
  ];
  vm.runInNewContext(scripts.join('\n'), context);
  return context;
}

function cosmeticHarness() {
  const h = ab14Harness();
  for (const name of ['ManagerPhoto', 'ManagerFrame', 'ManagerUniform', 'Pet', 'ManagerJobBadge', 'GooseCard', 'GooseCardSeries']) {
    const data = h.config623(name), list = Object.values(data), map = new Map(list.map(row => [row.id, row]));
    h.bridge.config[name] = { list, getById: id => map.get(id) };
  }
  h.role.userInfo = { uniform: 2001, imgBox: 3001, img: '4002' };
  return Object.assign(h, { nativeQuery: recoveredQueryModels() });
}

function shopHarness(level = 3) {
  const h = ab14Harness(), native = recoveredQueryModels();
  for (const name of ['Shop', 'ShopColumn', 'ShopAB', 'Unlock']) {
    const data = h.config623(name);
    const rows = value => !value || typeof value !== 'object' ? [] : value.id !== undefined ? [value] : Object.values(value).flatMap(rows);
    const list = rows(data), map = new Map(list.map(row => [row.id, row]));
    h.bridge.config[name] = { list, getById: id => map.get(id) };
  }
  h.bridge.config.Config = { config: h.config623('Config') };
  h.bridge.wl = native.wl;h.bridge.rl = native.rl;
  h.role.level = level;h.role.coin = 1000;h.role.diamond = 100;h.role.shop = new Map();
  h.backend.init({ bridge: h.bridge });
  return Object.assign(h, { nativeShop: native });
}

function ab14Harness() {
  const client = fs.readFileSync(path.join(root, 'recovered/reference623/client/subpackages/main/game.js'), 'utf8');
  const config623 = name => JSON.parse(fs.readFileSync(path.join(root, 'recovered/reference623/config/Config', name + '.json'), 'utf8'));
  const rows = value => !value || typeof value !== 'object' ? [] : value.id !== undefined ? [value] : Object.values(value).flatMap(rows);
  const table = name => {
    const data = config623(name), list = rows(data), map = new Map(list.map(row => [row.id, row]));
    return { list, getById: id => map.get(id), sheetMap: new Map(Object.entries(data).map(([key, value]) => [key, new Map(rows(value).map(row => [row.id, row]))])) };
  };
  const extract = (start, end) => {
    const from = client.indexOf(start), to = client.indexOf(end, from + start.length);
    assert(from >= 0 && to > from, '6.2.3 original source boundaries must remain exact');
    return client.slice(from, to);
  };
  const calls = [];
  let native;
  const h = harness((role, board) => {
    Object.assign(role, { createVersion: 14, coin: 0, diamond: 20, returnCenter: { version: 0 } });
    role.guide.clear();board.boardId = 100;board.type = 1;board.energyEnd = 0;
    board.orders.clear();board.ordered.clear();board.orderDrawerEnd = new Map();
    const first = new Order();first.id = first.orderId = 1001;first.demand.set(1102, 1);board.orders.set(1001, first);
  }, bridge => {
    for (const name of ['Board', 'Order', 'Build', 'Area', 'Adron', 'AdronSkin', 'PlayerLevel', 'PlayerLevelReward', 'NewbieCreateData', 'BuildReward', 'ElementAB']) bridge.config[name] = table(name);
    bridge.config.GuideStep = { sheetList: new Map(Object.entries(config623('GuideStep')).map(([name, group]) => [name, Object.values(group)])) };
    bridge.config.GuideRelation = table('GuideRelation');
    const drawers = table('OrderSeries');
    // Limit this bounded transport test to the two competing initial drawers.
    // The actual 6.2.3 UT/eF/q6 implementations below evaluate their real rows;
    // activity, return-player and monetization subsystems are not mounted here.
    bridge.config.OrderSeries = { ...drawers, list: drawers.list.filter(row => row.id === 1 || row.id === 996) };
    bridge.config.ReturnConfig = { config: config623('ReturnConfig') };
    const vaEnd = client.indexOf('}(Va||(Va={}))');
    const vaStart = client.lastIndexOf('function(e){', vaEnd);
    const context = {
      config: bridge.config, E8: bridge.E8, G2: bridge.G2, K6: {},
      Map, Set, Object, Array, Number, String, Math, parseInt, Error,
      ar: { main: 1, 1: 'main' }, Yr: 0, pe: () => false,
      h: { error() {} },
      AT: { initGenerateOrderConf() {} },
      b2: { GetBoardByType: () => bridge.E8.role.boards.get(1) },
      o9: { currentScreen: 'merge' }, J8: { HOME_SCREEN: 'home' },
      v4: { instance: { houseData: {
        getHouseIdByBuildId: id => bridge.config.Area.getById(bridge.config.Build.getById(id).area).roomId,
        getHouseIdByAreaId: id => bridge.config.Area.getById(id).roomId,
        getAreaData: () => bridge.E8.role.build.areas,
      } } },
      gT: { isUserBuilt: (_main, id) => bridge.E8.role.build.builded.get(id) === true },
    };
    const scripts = [
      'var Va;(' + client.slice(vaStart, vaEnd + '}(Va||(Va={}))'.length) + ');',
      extract('function Qr(e,t){', 'function Zr(e){'),
      'function Zr(e){return Qr(ar,e)};',
      extract('e.ParseUnlockConf=function(e){', ',e.ParseItemsConf=function').replace(/^e\./, 'K6.') + ';',
      'var UT=' + extract('UT=function(){', ';cc._RF.push({exports:{}},"e9148/a6dJLjLbssX3BhRIu"').replace(/^UT=/, '') + ';',
      'var eF=' + extract('eF=function(){', ',tF=function').replace(/^eF=/, '') + ';',
      'K6.CheckUnlock=function(e){return eF.checkUnlock(e)};',
      extract('var q6=function(){', 'cc._RF.push({exports:{}},"a2cfbwyYQBL04qzLQF32/YR"'),
    ];
    vm.runInNewContext(scripts.join('\n'), context);
    bridge.K6 = context.K6;bridge.q6 = context.q6;
    for (const method of ['getBuildInfo', 'getPlayerUpgradeExp', 'findABConfig', 'getElementAB']) {
      const original = bridge.q6.instance[method];
      bridge.q6.instance[method] = function (...args) { calls.push([method, args[0]]);return original.apply(this, args); };
    }
    native = context;
  });
  return Object.assign(h, { native, calls, config623 });
}

test('actual order 10001 consumes exactly one 1203, rewards one star and unlocks original 10002', async () => {
  assert.deepEqual(orderMap.get(10001).demand, { 1203: 1 });
  assert.deepEqual(orderMap.get(10001).reward, { Star: 1 });
  const h = harness();h.put(5, 1203);
  const result = await h.send('game_completeorder', { boardId: 1, orderId: 10001, indexes: [5], bagItemIds: [], timestamp: TIME });
  assert.equal(result.code, 0);
  assert(result.getData() instanceof RoleResponse);
  assert.equal(result.getData().role, h.role);
  assert.equal(h.role.star, 1);
  assert.equal(h.board.cells.get(5).elementId, 0);
  assert.equal(h.board.orders.has(10001), false);
  assert.equal(h.board.ordered.get(10001), true);
  assert.equal(h.board.orders.get(10002).orderId, 10002);
  assert.deepEqual(Object.fromEntries(h.board.orders.get(10002).demand), orderMap.get(10002).demand);
});

test('a completed original order cannot pay twice', async () => {
  const h = harness();h.put(5, 1203);
  await h.send('game_completeorder', { boardId: 1, orderId: 10001, indexes: [5], bagItemIds: [] });
  const before = h.state();
  const again = await h.send('game_completeorder', { boardId: 1, orderId: 10001, indexes: [5], bagItemIds: [] });
  assert.equal(again.code, 501);
  assert.equal(h.state(), before);
});

test('duplicate, wrong, excess and locked submitted cells are rejected atomically', async () => {
  for (const example of [
    { ids: [[5, 1203]], indexes: [5, 5] },
    { ids: [[5, 1202]], indexes: [5] },
    { ids: [[5, 1203], [6, 1101]], indexes: [5, 6] },
    { ids: [[5, 1203, 1]], indexes: [5] },
    { ids: [[5, 1203, 3]], indexes: [5] },
  ]) {
    const h = harness();for (const args of example.ids) h.put(...args);
    const before = h.state();
    const result = await h.send('game_completeorder', { boardId: 1, orderId: 10001, indexes: example.indexes, bagItemIds: [] });
    assert.equal(result.code, 501);
    assert.equal(h.state(), before);
  }
});

test('original bag item can satisfy the actual order without consuming any extra board item', async () => {
  const h = harness();const cell = new Cell();Object.assign(cell, { index: -1, elementId: 1203 });
  h.board.bag.items.set(64, cell);h.put(4, 1101);
  const result = await h.send('game_completeorder', { boardId: 1, orderId: 10001, indexes: [], bagItemIds: [64] });
  assert.equal(result.code, 0);
  assert.equal(h.board.bag.items.size, 0);
  assert.equal(h.board.cells.get(4).elementId, 1101);
  assert.equal(h.role.star, 1);
});

test('prediction acknowledgement preserves original live map, cell and recovery timer identities', async () => {
  const h = harness();const producer = h.put(1, 1004);h.put(2, 1101);
  const timer = { value: 31, valueMax: 32, interval: 112, intervalValue: 1, startTime: TIME,
    toData() { return Object.assign(new Recovery(), { value: this.value, valueMax: this.valueMax, interval: this.interval, startTime: this.startTime }); },
    decrease() { this.value--; },
  };
  producer.recovery.set(1, timer);h.role.energy.value = 99;
  const map = h.board.cells;
  const result = await h.send('game_cellproduct', { boardId: 1, index: 1, count: 1,
    cells: [{ index: 2, elementId: 1101, productType: 1 }], timestamp: TIME, seqId: 1, launcherIndex: null }, CellResponse);
  assert.equal(result.code, 0);
  assert(result.getData() instanceof CellResponse);
  assert.equal(h.board.cells, map);
  assert.equal(h.board.cells.get(1), producer);
  assert.equal(producer.recovery.get(1), timer);
  assert.equal(typeof producer.recovery.get(1).decrease, 'function');
  assert.equal(h.role.energy.value, 99, 'the original client already deducted energy');
  assert.equal(h.backend.persist(), true);
  assert.equal(producer.recovery.get(1), timer, 'serialization must not replace the running timer');
});

test('single and batched original request shapes acknowledge the predicted board', async () => {
  const h = harness();h.put(1, 1004);h.put(2, 1101);
  for (const [cmd, params] of [
    ['game_cellmove', { boardId: 1, index: 2, toIndex: 3, moveType: 1, cells: [] }],
    ['game_multiplecellmove', { boardId: 1, moveInformation: [{ index: 2, toIndex: 3, moveType: 1, cells: [], timestamp: TIME }] }],
    ['game_multiplecellproduct', { boardId: 1, index: 1, productInformation: [{ cells: [{ index: 2, elementId: 1101, productType: 1 }], timestamp: TIME, seqId: 1 }] }],
  ]) assert.equal((await h.send(cmd, params, CellResponse)).code, 0, cmd);
});

test('tagged persistent Maps, original cell classes and dates round-trip into an existing role', () => {
  const h = harness();h.put(5, 1203);h.board.cells.get(5).extra.set('original-key', 'value');
  assert.equal(h.backend.persist(), true);
  const save = h.backend.readSave();assert(save);
  const target = newRole();
  assert.equal(h.backend.restore(save, target), true);
  assert(target.boards instanceof Map);
  assert(target.boards.get(1) instanceof Board);
  assert(target.boards.get(1).cells.get(5) instanceof Cell);
  assert.equal(target.boards.get(1).cells.get(5).extra.get('original-key'), 'value');
  assert(target.createAt instanceof Date);
  assert.equal(target.createAt.getTime(), TIME);
  assert.equal(target.boards.get(1).cells.size, 63);
});

test('restored protocol el becomes the real native RecoverTimer at the original cached-board mount boundary', () => {
  const h = harness();const native = recoveredRecoveryRuntime(h.bridge);
  h.bridge.classes.el = native.NativeEl;
  h.role.energy = Object.assign(new native.NativeEl(), h.role.energy);
  for (const [index, id, state, value, interval, maximum] of [[25, 91101, 4, 5, 0, 5], [40, 1004, 0, 30, 112, 32], [1, 1004, 1, 32, 112, 32]]) {
    const cell = h.put(index, id, state);
    cell.recovery.set(1, Object.assign(new native.NativeEl(), { id: index + '_' + id + '_1', value, valueMax: maximum,
      interval, intervalValue: 1, startTime: TIME - 56000 }));
  }
  assert.equal(h.backend.persist(), true);
  assert.equal(h.backend.restore(h.backend.readSave(), h.role), true);
  h.bridge.G2.Data = h.role.boards.get(1);h.bridge.G2.BoardCells = h.bridge.G2.Data.cells;
  const restored = h.bridge.G2.Data;
  assert(restored.cells.get(25).recovery.get(1) instanceof native.NativeEl);
  assert.equal(typeof restored.cells.get(25).recovery.get(1).getLeftTime, 'undefined');
  assert.equal(native.clock.size, 0, 'restore alone does not start clocks before native services mount');
  // Same original call used by G2.LoadBoardData case8 and the direct cache bootstrap.
  restored.cells.forEach(cell => h.bridge.G2.convertRecovery(cell));
  const box = restored.cells.get(25).recovery.get(1), generator = restored.cells.get(40).recovery.get(1);
  assert(box instanceof native.NativeTimer);assert(generator instanceof native.NativeTimer);
  assert.equal(typeof box.getLeftTime, 'function');assert.equal(typeof generator.decrease, 'function');
  assert.equal(box.getLeftTime(5), 0);assert.equal(generator.getLeftTime(32), 168000);
  assert.equal(native.clock.has('recovery_25_91101_1'), true);
  assert.equal(native.clock.has('recovery_40_1004_1'), true);
  assert(restored.cells.get(1).recovery.get(1) instanceof native.NativeEl, 'web producer stays a paused protocol record');
  assert(h.role.energy instanceof native.NativeEl, 'role energy remains protocol data for original TimeRecover.onData');
  assert.equal(typeof h.role.energy.getLeftTime, 'undefined');
  h.bridge.E8.serverTime += 112000;
  native.clock.get('recovery_40_1004_1').callback();
  assert.equal(generator.value, 31, 'the real original timer replenishes one charge per112 seconds');
  assert.equal(generator.getLeftTime(32), 56000);
  assert.equal(box.decrease(1), true);assert.equal(box.value, 4);
  assert.equal(h.backend.persist(), true);
  assert.equal(restored.cells.get(25).recovery.get(1), box, 'serialization does not replace live native timers');
  const serialized = h.backend.readSave().role.boards.$map[0][1].cells.$map.find(([index]) => index === 25)[1].recovery.$map[0][1];
  assert.equal(serialized.$type, 'el');assert.equal(serialized.value, 4, 'wire persistence uses original timer.toData');
});

test('corrupt versions, unknown IDs, missing/duplicate cells and negative resources never restore', () => {
  const h = harness();h.put(5, 1203);const good = h.backend.snapshot();
  const mutations = [
    s => { s.version = 2; },
    s => { s.role.boards.$map[0][1].cells.$map[0][1].elementId = 999999999; },
    s => { s.role.boards.$map[0][1].cells.$map.pop(); },
    s => { s.role.boards.$map[0][1].cells.$map[1][0] = 1; },
    s => { s.role.boards.$map[0][1].cells.$map[1][1].index = 999; },
    s => { s.role.coin = -1; },
    s => { s.role.energy.interval = 0; },
  ];
  for (const mutate of mutations) {
    const bad = clone(good);mutate(bad);
    const target = newRole();const before = target.coin;
    assert.equal(h.backend.restore(bad, target), false);
    assert.equal(target.coin, before);
    assert.equal(target.boards.get(1).cells.size, 0, 'invalid saves are validated before touching the target');
    h.storage.set('feie-original-local-state-v1', JSON.stringify(bad));
    assert.equal(h.backend.readSave(), null);
  }
  h.storage.set('feie-original-local-state-v1', '{broken JSON');
  assert.equal(h.backend.readSave(), null);
});

test('unknown service commands fail explicitly without granting resources or changing state', async () => {
  const h = harness();const before = h.state();
  const result = await h.send('game_unimplementedaction', { reward: { Star: 999 } });
  assert.equal(result.code, 501);
  assert.match(result.error, /game_unimplementedaction/);
  assert.equal(h.state(), before);
});

test('original guide save records the exact completed step and one-time flag', async () => {
  const h = harness();
  assert.equal((await h.send('game_guidesave', { id: 'Board', step: 2004 })).code, 0);
  assert.equal(h.role.guide.get('Board'), 2004);
  assert.equal((await h.send('game_setguideonce', { index: 17 })).code, 0);
  assert(h.role.guideOnce instanceof Uint8Array);
  assert.equal(h.role.guideOnce[2], 2, 'index17 is bit1 of byte2, not byte17');
  assert.equal(h.backend.persist(), true);
  const target = newRole();
  assert.equal(h.backend.restore(h.backend.readSave(), target), true);
  assert.equal(target.guide.get('Board'), 2004);
  assert(target.guideOnce instanceof Uint8Array);
  assert.equal(target.guideOnce[2], 2);
});

test('standard AB14 story cannot persist early or foreign markers through guide save/start', async () => {
  const h = ab14Harness();
  const before = h.state();
  for (const command of ['game_guidesave', 'game_guidestart']) {
    for (const step of [0, 9914001, 9914002, 9914013, 9914414, '9914014']) {
      const result = await h.send(command, { id: 'PlayableBoard', step });
      assert.equal(result.code, 501);
      assert.equal(h.role.guide.has('PlayableBoard'), false);
      assert.equal(h.state(), before, 'an invalid marker must not change progress or resources');
    }
  }
  const complete = await h.send('game_guidesave', { id: 'PlayableBoard', step: 9914014 });
  assert.equal(complete.code, 0, complete.error);
  assert.equal(h.role.guide.get('PlayableBoard'), 9914014);
  assert.equal(h.backend.persist(), true);
  const target = newRole();assert.equal(h.backend.restore(h.backend.readSave(), target), true);
  assert.equal(target.guide.get('PlayableBoard'), 9914014);
});

test('legacy nonkey standard-story marker is removed on restore while other progress remains exact', () => {
  const h = ab14Harness();h.put(8, 1102);h.role.coin = 7;
  h.role.guide.set('PlayableBoard', 9914001);
  h.role.guide.set('Build1', 9913207);
  const legacy = h.backend.snapshot();
  const target = newRole();assert.equal(h.backend.restore(legacy, target), true);
  assert.equal(target.guide.has('PlayableBoard'), false);
  assert.equal(target.guide.get('Build1'), 9913207);
  assert.equal(target.createVersion, 14);
  assert.equal(target.coin, 7);
  assert.equal(target.diamond, 20);
  assert.equal(target.boards.get(1).boardId, 100);
  assert.equal(target.boards.get(1).cells.get(8).elementId, 1102);
  assert.equal(legacy.role.guide.$map.find(([id]) => id === 'PlayableBoard')[1], 9914001, 'migration does not rewrite the input snapshot');
  assert.equal(h.backend.persist(), true, 'manual invalid live markers cannot re-enter persistence');
  assert.equal(h.backend.readSave().role.guide.$map.some(([id]) => id === 'PlayableBoard'), false);
  assert.equal(h.role.guide.get('Build1'), 9913207);
});

test('imgbox_show returns original typed default/equipped ownership consumed by the real avatar utility', async () => {
  const h = cosmeticHarness(), native = h.nativeQuery;
  const balances = [h.role.coin, h.role.diamond, h.role.star, h.role.expLevel];
  const result = await h.send('imgbox_show', {}, native.If);
  assert.equal(result.code, 0, result.error);
  assert(result.getData() instanceof native.If);
  const boxes = result.getData().boxes;
  assert(boxes instanceof native.Nu);
  assert(boxes.img.get(4002) instanceof native.ku);
  assert(boxes.boxes.get(3001) instanceof native.Ru);
  assert(boxes.uniform.get(2001) instanceof native.Pu);
  assert.equal(boxes.uniform.get(2001).count, 1);
  assert.equal(boxes.boxes.has(3002), false, 'a configured paid frame is not automatically owned');
  assert.equal(boxes.uniform.has(1001), false);
  assert.equal(boxes.pet.size, 0);
  native.pb.ImgBoxesData = boxes;
  assert.equal(native.pb.IsItemGotAntiAsync({ itemType: native.oa.uniform, itemId: 2001 }), true);
  assert.equal(native.pb.IsItemGotAntiAsync({ itemType: native.oa.frame, itemId: 3002 }), false);
  boxes.boxes.set(3002, { count: 1 }); // A UI-cache mutation is not a local purchase.
  const again = await h.send('imgbox_show', {}, native.If);
  assert.equal(again.getData().boxes.boxes.has(3002), false);
  assert.deepEqual([h.role.coin, h.role.diamond, h.role.star, h.role.expLevel], balances);
  assert.equal((await h.send('imgbox_unlock', { type: 1, id: 3002 }, native.If)).code, 501);
});

test('card_show returns the original empty local collection model without granting cards or currency', async () => {
  const h = cosmeticHarness(), native = h.nativeQuery;
  const balances = [h.role.coin, h.role.diamond, h.role.star, h.role.expLevel];
  const result = await h.send('card_show', {}, native.Mh);
  assert.equal(result.code, 0, result.error);
  assert(result.getData() instanceof native.Mh);
  const card = result.getData().card;
  assert(card instanceof native.bs);
  assert.equal(card.id, h.role.id);
  assert.equal(card.cards.size, 0);
  assert.equal(card.news.size, 0);
  assert.equal(card.rewarded.size, 0);
  assert.equal(card.gambleCounts.size, 0);
  assert.deepEqual([card.cardPoint, card.jokerCard], [0, 0]);
  assert.deepEqual([h.role.coin, h.role.diamond, h.role.star, h.role.expLevel], balances);
  assert.equal((await h.send('card_gamble', {}, native.Mh)).code, 501);
});

test('6.2.3 original upgrade activity query consumes a typed empty snapshot without creating campaigns or rewards', async () => {
  const h = ab14Harness(), native = recoveredQueryModels(), events = [], toasts = [];
  h.role.globalActivity = new Map();
  const before = h.state();
  const result = await h.send('game_refreshglobalactivity', {}, native.Mp);
  assert.equal(result.code, 0, result.error);
  assert(result.getData() instanceof native.Mp);
  assert.equal(result.getData().role, h.role);
  assert.equal(result.getData().globalActivity.length, 0);
  assert.equal(h.state(), before, 'querying does not create Config campaigns, change progress or grant currency');
  native.E8 = h.bridge.E8;
  native.hm = { refreshGlobalActivity: () => h.send('game_refreshglobalactivity', {}, native.Mp) };
  native.u = { dispatch: event => events.push(event) };
  native.A8 = { Toast: message => toasts.push(message) };
  await native.upgradeQuery.checkNoviceAct();
  assert.deepEqual(events, ['RefreshLoginGiftEntrances'], 'the actual original caller emits its own refresh event once');
  assert.deepEqual(toasts, []);
  assert(h.role.globalActivity instanceof Map);
  assert.equal(h.role.globalActivity.size, 0);
  assert.equal(h.state(), before);
  assert.equal((await h.send('game_refreshglobalactivity', {}, RoleResponse)).code, 501, 'missing native protocol decoder is an explicit failure');
  assert.equal(h.state(), before);
});

test('activity query retains existing saved ql fields through original decoding and remains read-only', async () => {
  const h = ab14Harness(), native = recoveredQueryModels();
  const activity = new native.ql();
  Object.assign(activity, { id: 123, typeId: 'saved-query-fixture', content: 'existing-local-state', beginAt: 100,
    prepareEndAt: 90, endAt: 200, priceStartAt: 200, priceDeadAt: 210, step: 2, status: 1, unlock: ['PlayerLevel3'] });
  h.role.globalActivity = new Map([[activity.id, activity]]);
  assert.equal(h.backend.persist(), true);
  assert.equal(h.backend.restore(h.backend.readSave(), h.role), true);
  const before = h.state(), stored = h.role.globalActivity.get(123);
  const result = await h.send('game_refreshglobalactivity', {}, native.Mp);
  assert.equal(result.code, 0, result.error);
  const rows = result.getData().globalActivity;
  assert.equal(rows.length, 1);
  assert(rows[0] instanceof native.ql, 'persisted plain records use the actual Mp/ql decoder');
  assert.equal(JSON.stringify(rows[0]), JSON.stringify(activity));
  rows[0].step = 99;rows[0].unlock.push('mutated-ui-copy');
  assert.equal(stored.step, 2);
  assert.deepEqual(stored.unlock, ['PlayerLevel3']);
  assert.equal(h.state(), before, 'UI response changes cannot mutate the saved activity snapshot');
});

test('local appearance/card ownership survives persistence and unknown owned IDs are rejected before restore', async () => {
  const h = cosmeticHarness(), native = h.nativeQuery;
  await h.send('imgbox_show', {}, native.If);await h.send('card_show', {}, native.Mh);
  const saved = h.backend.snapshot();
  saved.localServices.appearance.boxes.$map.push([3002, { count: 1 }]);
  saved.localServices.card.cards.$map.push([10001, { count: 2 }]);
  saved.localServices.card.cardPoint = 7;
  assert.equal(h.backend.restore(saved, h.role), true);
  const avatar = await h.send('imgbox_show', {}, native.If);
  assert.equal(avatar.getData().boxes.boxes.get(3002).count, 1);
  const card = await h.send('card_show', {}, native.Mh);
  assert(card.getData().card.cards.get(10001) instanceof native._s);
  assert.equal(card.getData().card.cards.get(10001).count, 2);
  assert.equal(card.getData().card.cardPoint, 7);
  assert.equal(h.backend.persist(), true);
  const roundTrip = h.backend.readSave();
  assert.equal(roundTrip.localServices.card.cardPoint, 7);
  const invalid = clone(roundTrip);invalid.localServices.appearance.boxes.$map.push([999999999, { count: 1 }]);
  const target = newRole();assert.equal(h.backend.restore(invalid, target), false);
  assert.equal(target.coin, config.initCoin);
  const invalidCard = clone(roundTrip);invalidCard.localServices.card.cards.$map.push([999999999, { count: 1 }]);
  assert.equal(h.backend.restore(invalidCard, target), false);
  assert.equal(target.boards.get(1).cells.size, 0);
});

test('original shop models receive a level3 local virtual catalog without legacy AB tutorial goods or fake deadlines', async () => {
  const locked = shopHarness(2);
  assert.equal(locked.role.shop.size, 0);
  assert.equal((await locked.send('game_shopcheck', { boardType: 1 }, locked.nativeShop.hf)).code, 501);
  const h = shopHarness(), native = h.nativeShop;
  const result = await h.send('game_shopcheck', { boardType: 1 }, native.hf);
  assert.equal(result.code, 0, result.error);
  assert(result.getData() instanceof native.hf);
  assert.equal(result.getData().actShopBanner.size, 0);
  const group = h.role.shop.get(2);
  assert(group instanceof native.wl);
  assert(group.goods.every(item => item instanceof native.rl));
  assert.deepEqual(group.goods.map(item => item.id), [2001, 2002, 2003, 2005, 2006, 2008]);
  assert.equal(group.refreshTime, 0);
  assert.equal(group.goods.some(item => item.id >= 2098 && item.id <= 2103), false);
  assert.deepEqual(h.config623('ShopColumnAB')['13']['13_2'].tutorialShopOrder, []);
  assert.equal(h.backend.getShopEvidence().mode, 'LOCAL_CONFIG_CATALOG_RECONSTRUCTION');
});

test('virtual shop purchase charges original cost, stocks original channel rewards and enforces inventory atomically', async () => {
  const h = shopHarness(), native = h.nativeShop;
  for (let count = 0; count < 5; count++) {
    const result = await h.send('game_shopbuy', { itemId: 2001 }, native.uf);
    assert.equal(result.code, 0, result.error);
    assert.equal(result.getData().rewards[0].itemId, 1101);
    assert.equal(result.getData().rewards[0].value, 1);
  }
  assert.equal(h.role.coin, 985);
  assert.equal(h.board.channel.size, 5);
  assert.equal(h.role.shop.get(2).goods.find(item => item.id === 2001).buyedCount, 5);
  const before = h.state();
  for (const itemId of [2001, 1001, 1000, 2004, 999999]) {
    assert.equal((await h.send('game_shopbuy', { itemId }, native.uf)).code, 501);
    assert.equal(h.state(), before);
  }
  assert.equal((await h.send('game_shoprefresh', { groupId: 2 }, RoleResponse)).code, 0);
  assert.equal(h.role.diamond, 80);
  assert.equal(h.role.shop.get(2).goods[0].buyedCount, 0);
  assert.equal(h.role.daily00Event.get('shop#r#c#2'), 1);
  assert.equal((await h.send('game_shopbuy', { itemId: 4002 }, native.uf)).code, 0);
  assert.equal((await h.send('game_shopbuy', { itemId: 4002 }, native.uf)).code, 0);
  assert.equal(h.role.diamond, 65, 'original recharge pricing doubles 5 to10');
  assert.equal(h.role.energy.value, 300);
});

test('typed shop stock and purchase counters restore while tampered prices fail validation', async () => {
  const h = shopHarness(), native = h.nativeShop;
  await h.send('game_shopbuy', { itemId: 2002 }, native.uf);
  assert.equal(h.backend.persist(), true);
  const save = h.backend.readSave(), target = newRole();
  assert.equal(h.backend.restore(save, target), true);
  assert(target.shop.get(2) instanceof native.wl);
  assert(target.shop.get(2).goods[1] instanceof native.rl);
  assert.equal(target.shop.get(2).goods[1].buyedCount, 1);
  assert.equal(target.coin, 993);
  const bad = clone(save);bad.role.shop.$map.find(([id]) => id === 2)[1].goods[0].priceValue = 0;
  assert.equal(h.backend.restore(bad, newRole()), false);
  h.role.diamond = 0;
  const before = h.state();
  assert.equal((await h.send('game_shoprefresh', { groupId: 2 }, RoleResponse)).code, 501);
  assert.equal(h.state(), before);
});

test('game_setoncedata acknowledges the original gl/Uint8Array bit prediction without rewards or toggling', async () => {
  const h = harness();const record = new OnceData();record.data = new Uint8Array(100);
  record.data[2] = 2;h.role.onceData.set(9, record); // Native E8.offOnceData(ga.customMark,17).
  const balance = [h.role.coin, h.role.star, h.role.energy.value, h.role.expLevel];
  const result = await h.send('game_setoncedata', { key: 9, index: 17 }, RoleResponse);
  assert.equal(result.code, 0);assert(result.getData() instanceof RoleResponse);
  assert.equal(h.role.onceData.get(9), record);
  assert.equal(record.data[2], 2, 'a predicted set bit must not be toggled back');
  assert.equal((await h.send('game_setoncedata', { key: 9, index: 18 })).code, 0);
  assert.equal(record.data[2], 6);
  assert.deepEqual([h.role.coin, h.role.star, h.role.energy.value, h.role.expLevel], balance);
  assert.equal((await h.send('game_setoncedata', { key: 1, index: 7 })).code, 0);
  assert(h.role.onceData.get(1) instanceof OnceData);
  assert.equal(h.role.onceData.get(1).data.length, 100, 'original offOnceData allocates 100 bytes');
  assert.equal(h.role.onceData.get(1).data[0], 128);
  assert.equal(h.backend.persist(), true);
  const target = newRole();assert.equal(h.backend.restore(h.backend.readSave(), target), true);
  assert(target.onceData.get(9) instanceof OnceData);
  assert(target.onceData.get(9).data instanceof Uint8Array);
  assert.equal(target.onceData.get(9).data[2], 6);
  const legacy = clone(h.backend.snapshot());
  legacy.role.onceData.$map.forEach(([, value]) => {
    delete value.$type;
    value.data = Object.fromEntries(value.data.$bytes.map((byte, index) => [String(index), byte]));
  });
  legacy.role.guideOnce = {};
  legacy.role.ext = {};
  const oldTarget = newRole();assert.equal(h.backend.restore(legacy, oldTarget), true);
  assert(oldTarget.onceData.get(9) instanceof OnceData);
  assert(oldTarget.onceData.get(9).data instanceof Uint8Array);
  assert.equal(oldTarget.onceData.get(9).data[2], 6, 'legacy numeric-key byte records migrate without losing bits');
  for (const params of [{ key: -1, index: 0 }, { key: 99, index: 0 }, { key: 1, index: -1 }, { key: 1, index: 800 }, { key: 1, index: 1.5 }]) {
    const before = h.state();assert.equal((await h.send('game_setoncedata', params)).code, 501);assert.equal(h.state(), before);
  }
  const corrupt = h.backend.snapshot();corrupt.role.onceData.$map[0][1].data.$bytes[0] = 256;
  assert.equal(h.backend.restore(corrupt, newRole()), false);
});

test('original ef handbook query returns a nonempty typed Map with only actually exposed items', async () => {
  const h = harness();h.put(2, 1201);h.put(3, 5002, 3);h.put(4, 5202, 1);
  const result = await h.send('game_getelementhandbook', { timestamp: TIME }, HandbookResponse);
  assert.equal(result.code, 0);
  const data = result.getData();
  assert(data instanceof HandbookResponse);
  assert(data.handbook instanceof Map);
  assert.equal(Object.hasOwn(data, 'role'), false, 'original ef has only the handbook payload');
  assert.equal(data.handbook.get(1001), 0, 'original initial unlocked handles remain discovered');
  assert.equal(data.handbook.get(1002), 0, 'original initial unlocked wheel remains discovered');
  assert.equal(data.handbook.get(1201), 0);
  assert.equal(data.handbook.has(5002), false, 'a covered item is not discovered');
  assert.equal(data.handbook.has(5202), false, 'a web item is not discovered');
});

test('handbook records a real predicted merge before first home entry and persists consumed discoveries', async () => {
  const h = harness();h.put(5, 1203);
  assert.equal((await h.send('game_cellmove', { boardId: 1, index: 4, toIndex: 5, moveType: 2, cells: [] })).code, 0);
  assert.equal((await h.send('game_completeorder', { boardId: 1, orderId: 10001, indexes: [5], bagItemIds: [] })).code, 0);
  assert.equal(h.board.cells.get(5).elementId, 0);
  assert.equal(h.backend.persist(), true);
  const save = h.backend.readSave();
  assert(save.localServices.elementHandbook.$map.some(([id, state]) => id === 1203 && state === 0));
  assert.equal(h.backend.restore(save, h.role), true);
  const response = await h.send('game_getelementhandbook', { timestamp: TIME }, HandbookResponse);
  assert.equal(response.getData().handbook.get(1203), 0, 'submitted item remains a historical discovery');
});

test('native handbook discovery flags stay live and original unlockReward pays exactly once', async () => {
  const h = harness();
  const response = await h.send('game_getelementhandbook', { timestamp: TIME }, HandbookResponse);
  h.bridge.v$.Data = response.getData().handbook; // Original HandbookWindow.Init performs this assignment.
  h.bridge.v$.Data.set(1203, 0); // Original G$.SetElementKnow records the actual successful merge.
  assert.deepEqual(elements.get(1203).unlockReward, { Coin: 25 });
  const beforeCoin = h.role.coin;
  const claim = await h.send('game_elementhandbookreward', { elementId: 1203, timestamp: TIME }, RewardResponse);
  assert.equal(claim.code, 0);
  assert.equal(h.role.coin, beforeCoin + 25);
  assert.equal(h.bridge.v$.Data.get(1203), 1);
  assert.deepEqual(claim.getData().rewards.map(item => [item.itemType, item.value]), [[1, 25]]);
  const before = h.state();
  assert.equal((await h.send('game_elementhandbookreward', { elementId: 1203 })).code, 501);
  assert.equal((await h.send('game_elementhandbookreward', { elementId: 999999 })).code, 501);
  assert.equal(h.state(), before, 'repeat or unknown claims cannot change the save or pay');
  assert.equal(h.backend.persist(), true);
  const saved = h.backend.readSave();
  const invalid = clone(saved);invalid.localServices.elementHandbook.$map.push([999999, 0]);
  assert.equal(h.backend.restore(invalid, newRole()), false);
  const invalidFlag = clone(saved);invalidFlag.localServices.elementHandbook.$map[0][1] = 2;
  assert.equal(h.backend.restore(invalidFlag, newRole()), false);
});

test('original build 10001 costs Star 1 and applies only Exp 5 and Adorn1001', async () => {
  assert.deepEqual(builds.get(10001).demand, { Star: 1 });
  assert.deepEqual(builds.get(10001).reward, { Exp: 5, Adorn1001: 1 });
  const h = harness();h.role.star = 1;
  const result = await h.send('game_build', { buildId: 10001, skinId: 100101, cellX: 12, cellY: -5, dir: 1, houseId: 0 }, RewardResponse);
  assert.equal(result.code, 0);
  assert.equal(h.role.star, 0);
  assert.equal(h.role.expLevel, 5);
  assert.equal(h.role.level, 1, 'the original client separately requests game_levelup');
  assert.equal(h.role.energy.value, 100, 'do not invent the separate skin unlock reward');
  assert.equal(h.role.build.builded.get(10001), true);
  const adorn = h.role.build.adorns.get(1001);
  assert(adorn instanceof Adorn);
  assert.deepEqual([adorn.usingId, adorn.cellX, adorn.cellY, adorn.dir, adorn.level], [100101, 12, -5, 1, 0]);
  assert.deepEqual(result.getData().rewards.map(item => [item.itemType, item.itemId, item.value]), [[3, 0, 5], [8, 1001, 1]]);
  assert.equal(h.backend.persist(), true);
  const target = newRole();assert.equal(h.backend.restore(h.backend.readSave(), target), true);
  assert(target.build.adorns.get(1001) instanceof Adorn);
});

test('backend supplies only the original first Hc for an empty uncompleted fresh build state', () => {
  const fresh = harness(role => { role.guide.clear(); });
  assert.equal(fresh.role.guide.size, 0, 'fresh original Home guide remains untouched');
  const first = fresh.role.build.builds.get(10001);
  assert(first instanceof BuildRecord);
  assert.deepEqual([first.id, first.state, first.level], [10001, 0, 0]);
  assert.equal(fresh.role.build.adorns.size, 0, 'unbuilt counter is not fabricated');
  const completed = harness(role => { role.build.builded.set(10001, true); });
  assert.equal(completed.role.build.builds.has(10001), false);
  assert(completed.role.build.builds.get(10002) instanceof BuildRecord, 'restored completed first build exposes the exact successor');
  const existing = harness(role => {
    const record = new BuildRecord();record.id = 10002;record.state = 1;
    role.build.builds.set(10002, record);
  });
  assert.equal(existing.role.build.builds.get(10002).state, 1, 'existing server-shaped records are preserved');
  const oldSave = fresh.backend.snapshot();oldSave.role.build.builds.$map = [];
  const target = newRole();assert.equal(fresh.backend.restore(oldSave, target), true);
  assert(target.build.builds.get(10001) instanceof BuildRecord, 'early empty local saves receive the same original first record');
});

test('first completed build exposes original 10002 only, preserves typed successor and never adds duplicates', async () => {
  const h = harness();
  assert.deepEqual([...h.role.build.builds.keys()], [10001]);
  assert.equal(h.role.build.builds.has(10002), false, 'FinishBuild10001 starts unmet');
  h.role.star = 1;
  const request = { buildId: 10001, skinId: 100101, cellX: 12, cellY: -5, dir: 1, houseId: 0 };
  assert.equal((await h.send('game_build', request, RewardResponse)).code, 0);
  assert.deepEqual(builds.get(10002).unlock, ['FinishBuild10001']);
  assert.deepEqual([...h.role.build.builds.keys()], [10002]);
  const successor = h.role.build.builds.get(10002);
  assert(successor instanceof BuildRecord);
  assert.deepEqual([successor.id, successor.state, successor.level], [10002, 0, 0]);
  assert.equal(h.role.build.builds.has(10003), false, 'FinishBuild10002 remains unmet');
  assert.equal(h.role.build.builds.has(100101001), false, 'extended room builds never enter main records');
  const before = h.state();
  assert.equal((await h.send('game_build', request)).code, 501);
  assert.equal(h.state(), before, 'duplicate build cannot create another successor or pay');
  assert.equal((await h.send('game_levelup', { upgradeAll: true }, RewardResponse)).code, 0);
  assert.equal(h.role.build.builds.get(10002), successor, 'later unlock checks preserve the same live original Hc');
  assert.deepEqual([...h.role.build.builds.keys()], [10002]);
  assert.equal(h.backend.persist(), true);
  assert.equal(h.backend.restore(h.backend.readSave(), h.role), true);
  assert(h.role.build.builds.get(10002) instanceof BuildRecord);
  assert.deepEqual([...h.role.build.builds.keys()], [10002]);
});

test('first original order → build → native adornEdit → levelUp → channelPut pays and consumes once', async () => {
  const h = harness();h.put(5, 1203);
  assert.equal((await h.send('game_completeorder', { boardId: 1, orderId: 10001, indexes: [5], bagItemIds: [] })).code, 0);
  const request = { buildId: 10001, skinId: 100101, cellX: 12, cellY: -5, dir: 1, houseId: 0 };
  assert.equal((await h.send('game_build', request, RewardResponse)).code, 0);
  const balance = [h.role.star, h.role.coin, h.role.energy.value, h.role.expLevel];
  const edit = await h.send('game_adornedit', { adornId: 1001, skinId: 100101, cellX: 13, cellY: -6, dir: 0, houseId: 0 }, AdornResponse);
  assert.equal(edit.code, 0);assert(edit.getData() instanceof AdornResponse);
  assert.equal(edit.getData().adornId, 1001);
  assert.equal(edit.getData().rewards.length, 0, 'confirmation does not repeat build rewards');
  assert.deepEqual([h.role.star, h.role.coin, h.role.energy.value, h.role.expLevel], balance);
  assert.deepEqual([h.role.build.adorns.get(1001).cellX, h.role.build.adorns.get(1001).cellY, h.role.build.adorns.get(1001).dir], [13, -6, 0]);
  assert.equal((await h.send('game_levelup', { upgradeAll: true }, RewardResponse)).code, 0);
  assert.deepEqual([h.role.level, h.role.expLevel], [2, 0]);
  const gift = [...h.board.channel.values()].find(item => item.itemId === 91101);
  assert(gift);assert.equal(gift.value, 1);
  // The actual Channel.sendElementToBoard writes the cell and removes the channel
  // item in the same native stack before the async transport acknowledgement.
  const cell = h.put(6, 91101);h.board.channel.delete(gift.id);
  const params = { boardId: 1, toIndex: 6, id: gift.id, timestamp: TIME };
  assert.equal((await h.send('game_channelput', params, CellResponse)).code, 0);
  assert.equal((await h.send('game_channelput', params, CellResponse)).code, 0);
  assert.equal(h.board.cells.get(6), cell, 'keep native generated cell and recovery identity');
  assert.equal([...h.board.cells.values()].filter(item => item.elementId === 91101).length, 1);
  assert.equal(h.board.channel.size, 0, 'acknowledgement never re-adds or re-consumes the gift');
  assert.deepEqual([h.role.star, h.role.coin, h.role.energy.value], balance.slice(0, 3));
  assert.equal(h.backend.persist(), true);
});

test('adornEdit rejects unknown, unowned, invalid or unverified skin transitions atomically', async () => {
  const h = harness();h.role.star = 1;
  assert.equal((await h.send('game_build', { buildId: 10001, skinId: 100101, cellX: 12, cellY: -5, dir: 1, houseId: 0 })).code, 0);
  h.role.build.adorns.get(1001).buyed.set(100102, 1);
  const request = { adornId: 1001, skinId: 100101, cellX: 13, cellY: -6, dir: 0, houseId: 0 };
  for (const patch of [
    { adornId: 999999 }, { skinId: 100201 }, { skinId: 100102 },
    { skinId: 100103 }, { dir: 4 }, { cellX: Number.NaN }, { houseId: 1 },
  ]) {
    const before = h.state();
    assert.equal((await h.send('game_adornedit', { ...request, ...patch }, AdornResponse)).code, 501);
    assert.equal(h.state(), before);
  }
});

test('game_levelup uses original threshold 5, carries XP remainder and gives original 91101 reward', async () => {
  const h = harness();h.role.expLevel = 5;
  const response = await h.send('game_levelup', { upgradeAll: true }, RewardResponse);
  assert.equal(response.code, 0);
  assert.equal(h.role.level, 2);
  assert.equal(h.role.expLevel, 0);
  assert.deepEqual(levels.get(2).reward, { 91101: 1 });
  assert.equal([...h.board.channel.values()][0].itemId, 91101);
  assert.equal([...h.board.channel.values()][0].value, 1);
  const before = h.state();
  assert.equal((await h.send('game_levelup', { upgradeAll: true })).code, 501);
  assert.equal(h.state(), before, 'insufficient XP cannot pay again');
  const multi = harness();multi.role.expLevel = 22;
  assert.equal((await multi.send('game_levelup', { upgradeAll: true })).code, 0);
  assert.equal(multi.role.level, 3);
  assert.equal(multi.role.expLevel, 2, 'level 1→2 consumes 5 and level 2→3 consumes 15');
  assert.deepEqual([...multi.board.channel.values()].map(item => item.itemId), [91101, 90301]);
});

test('build rejects locked, duplicate, insufficient, invalid-skin or unsupported reward cases atomically', async () => {
  const request = { buildId: 10001, skinId: 100101, cellX: 12, cellY: -5, dir: 1, houseId: 0 };
  for (const change of [
    h => { h.role.star = 0; },
    h => { h.role.build.areas = []; },
    h => { h.role.build.builded.set(10001, true); },
    h => { h.bridge.config.Build.getById = id => id === 10001 ? { ...builds.get(id), reward: { ...builds.get(id).reward, UnknownOriginalReward: 1 } } : builds.get(id); },
  ]) {
    const h = harness();h.role.star = 1;change(h);const before = h.state();
    assert.equal((await h.send('game_build', request)).code, 501);
    assert.equal(h.state(), before);
  }
  const h = harness();h.role.star = 1;const before = h.state();
  assert.equal((await h.send('game_build', { ...request, skinId: 100201 })).code, 501);
  assert.equal(h.state(), before);
});

test('6.2.3 AB14 original UT recognizes acquired unfinished 1001, rejects legacy drawer, and restores missing got flags', () => {
  const h = ab14Harness();
  assert.equal(h.board.ordered.get(1001), false);
  assert.equal(h.native.UT.checkOrderGot(1001, h.board), true);
  assert.equal(h.native.UT.checkOrderFinished(1001, h.board), false);
  assert.equal(h.native.UT.getDrawerData(996).lock, false);
  assert.equal(h.native.UT.getDrawerData(996).needManuUnlock, false);
  assert.equal(h.native.UT.getDrawerData(1).lock, true);
  assert.equal(h.native.K6.CheckUnlock(['CreateVersionGte13+PlayerLevel1']), true);
  assert.equal(h.native.K6.CheckUnlock(['CreateVersionDefault+PlayerLevel1']), false);
  const history = h.backend.snapshot().localServices.elementHandbook.$map;
  assert(history.some(([id]) => id === 1001));
  assert.equal(history.some(([id]) => id === 1002), false, 'Board100 has webbed 1002; do not seed exposed legacy Board1 1002');
  const old = h.backend.snapshot();old.role.boards.$map[0][1].ordered.$map = [];
  assert.equal(h.backend.restore(old, h.role), true);
  assert.equal(h.role.boards.get(1).ordered.get(1001), false);
});

test('6.2.3 AB14 settles 1001→1002→AB build→level2 using actual q6, without legacy order or 91101 reward', async () => {
  const h = ab14Harness();
  assert.deepEqual(h.bridge.config.Order.getById(1001).demand, { 1102: 1 });
  assert.deepEqual(h.bridge.config.Order.getById(1002).demand, { 1104: 1 });
  assert.deepEqual(h.bridge.q6.instance.getBuildInfo(10001).demand, { Star: 2 });
  assert.deepEqual(h.bridge.q6.instance.getBuildInfo(10001).reward, { Exp: 10, Adorn1001: 1, Coin: 50 });
  const build = { buildId: 10001, skinId: 100101, cellX: 12, cellY: -5, dir: 1, houseId: 0 };
  h.put(5, 1102);
  assert.equal((await h.send('game_completeorder', { boardId: 1, orderId: 1001, indexes: [5], bagItemIds: [] })).code, 0);
  assert.equal(h.role.star, 1);
  assert.equal(h.board.ordered.get(1001), true);
  assert.equal(h.board.ordered.get(1002), false);
  assert.deepEqual([...h.board.orders.keys()], [1002]);
  assert.equal(h.native.UT.checkOrderGot(1002, h.board), true);
  assert.equal(h.native.UT.checkOrderFinished(1002, h.board), false);
  const insufficient = h.state();
  assert.equal((await h.send('game_build', build)).code, 501, 'legacy Star1 cost must not leak into AB14');
  assert.equal(h.state(), insufficient);
  h.put(6, 1104);
  assert.equal((await h.send('game_completeorder', { boardId: 1, orderId: 1002, indexes: [6], bagItemIds: [] })).code, 0);
  assert.equal(h.role.star, 2);
  assert.equal(h.native.UT.checkOrderFinished(1002, h.board), true);
  assert.deepEqual([...h.board.orders.keys()], [1003]);
  assert.equal(h.board.orders.has(10001), false);
  assert.equal(h.board.ordered.has(10001), false);
  const built = await h.send('game_build', build, RewardResponse);
  assert.equal(built.code, 0);
  assert.deepEqual([h.role.star, h.role.coin, h.role.expLevel, h.role.level, h.role.energy.value], [0, 50, 10, 1, 100]);
  assert.deepEqual(built.getData().rewards.map(item => [item.itemType, item.itemId, item.value]), [[3, 0, 10], [8, 1001, 1], [1, 0, 50]]);
  assert(h.role.build.adorns.get(1001) instanceof Adorn);
  assert.deepEqual([...h.role.build.builds.keys()], [10002]);
  const level = await h.send('game_levelup', { upgradeAll: true }, RewardResponse);
  assert.equal(level.code, 0);
  assert.deepEqual([h.role.level, h.role.expLevel], [2, 5], 'AB Exp10 consumes exactly the original five-XP threshold');
  assert.deepEqual(Array.from(level.getData().rewards, item => [item.itemId, item.value]), [[1004, 1]]);
  assert.deepEqual([...h.board.channel.values()].map(item => item.itemId), [1004]);
  assert.equal([...h.board.channel.values()].some(item => item.itemId === 91101), false);
  assert(h.calls.some(([name, id]) => name === 'getBuildInfo' && id === 10001));
  assert(h.calls.some(([name, id]) => name === 'getPlayerUpgradeExp' && id === 1));
  assert(h.calls.some(([name, id]) => name === 'findABConfig' && id === 2));
  assert.deepEqual(h.bridge.q6.instance.getElementAB(1004).elementIdList, new Array(8).fill(1101));
  assert.deepEqual(h.bridge.q6.instance.getElementAB(1005).elementIdList, [1201]);
  assert.equal(h.config623('GuideRelation').Build1_13.trigger, 'orderId:1002');
  assert(h.config623('GuideStep').Build1_13['9913210'].action.includes('openScreen_3,tap_1005'));
  const after = h.state();
  assert.equal((await h.send('game_levelup', { upgradeAll: true })).code, 501);
  assert.equal((await h.send('game_completeorder', { boardId: 1, orderId: 1002, indexes: [6], bagItemIds: [] })).code, 501);
  assert.equal(h.state(), after, 'retries cannot duplicate AB rewards or advance an original guide');
  assert.equal(h.role.guide.size, 0, 'the transport never advances story or emits native completion events');
  assert.equal(h.backend.persist(), true);
});

test('AB14 original producer prediction spends configured energy once; energyFree is not per-tap free energy', async () => {
  const h = ab14Harness();
  const client = fs.readFileSync(path.join(root, 'recovered/reference623/client/subpackages/main/game.js'), 'utf8');
  const from = client.indexOf('n.prototype._decreaseUserEnergy=function(e,t){');
  const to = client.indexOf(',n.prototype._refundMultiEnergy=', from);
  assert(from >= 0 && to > from);
  const events = [];
  Object.assign(h.native, {
    fy: { CHESS_3: 3, CHESS_4: 4, CHESS_7: 7, CHESS_8: 8, CHESS_9: 9 },
    g2: { GetBoardtype: value => value }, fr: { battery: 'battery' },
    fG: { AddAdBubbleDayCost() {} }, $F: { instance: null },
    SL: { addBehavior() {} }, _L: { energy_board: 'energy_board' },
    d: { emit: (...args) => events.push(args) }, i: { UseEnergy: 'UseEnergy' }, jF: { Merge: 'Merge' },
  });
  h.bridge.G2.MergeBoardType = 1;
  vm.runInNewContext(client.slice(from, to).replace(/^n\.prototype\._decreaseUserEnergy=/, 'this.decreaseUserEnergy=') + ';', h.native);
  const cell = h.put(1, 1004);
  const producer = { data: { config: elements.get(1004), remoteData: cell } };
  assert.equal(h.bridge.config.NewbieCreateData.getById(14).energyFree, 1);
  h.native.decreaseUserEnergy.call({ _getMultiEnergyTimes: () => 1 }, producer, false);
  assert.equal(h.role.energy.value, 99);
  h.put(2, 1101);
  const params = { boardId: 1, index: 1, count: 1, cells: [{ index: 2, elementId: 1101, productType: 1 }], timestamp: TIME };
  assert.equal((await h.send('game_cellproduct', params, CellResponse)).code, 0);
  assert.equal((await h.send('game_cellproduct', params, CellResponse)).code, 0);
  assert.equal(h.role.energy.value, 99, 'native prediction owns the charge; acknowledgement never charges again');
  assert.equal(events.length, 1, 'only the actual original prediction emits UseEnergy');
});

test('6.2.3 native CellProductCheck calls q6 for AB toolbox sequences instead of legacy tutorial drops', () => {
  const h = ab14Harness();
  const client = fs.readFileSync(path.join(root, 'recovered/reference623/client/subpackages/main/game.js'), 'utf8');
  const method = (name, next) => {
    const from = client.indexOf('e.' + name + '=function'), to = client.indexOf(',e.' + next + '=', from);
    assert(from >= 0 && to > from);
    return client.slice(from, to).replace(/^e\./, 'Product.') + ';';
  };
  const Product = {};
  Object.assign(h.native, {
    Product, yr: { autoProduct: 0, manualProduct: 1 }, mr: { none: 0, web: 1 },
    G$: { CheckProductMax: () => false }, X8: { isShovel: () => false }, NE: null,
    oN: { ClientLevel: 1 },
  });
  h.bridge.G2.MergeBoardType = 1;
  h.native.b2.IsSpecialEnergyBoard = () => false;
  h.bridge.G2.GetCellRecovery = (index, type) => h.board.cells.get(index)?.recovery.get(type);
  h.bridge.config.DuanwuElement = { getById: () => undefined };
  // Only the unboosted initial main board is mounted. The product selector,
  // AB resolver and normal one-energy adjustment are all the actual client code.
  vm.runInNewContext([
    method('canUseMainBoardEnergyAdjustment', 'isElementInMultiEnergyBuff'),
    method('getMultiEnergyTimes', 'getElementUpChain'),
    method('adjustMultiEnergyProduct', 'adjustActivityMultiEnergyProduct'),
    method('CellProductCheck', 'parseSpecialLauncher'),
  ].join('\n'), h.native);
  h.board.tutorialOrder.set('A_0', []);
  for (const [id, expected] of [[1004, new Array(8).fill(1101)], [1005, [1201]]]) {
    const cell = h.put(1, id);cell.recovery.set(1, Object.assign(new Recovery(), { value: 32, valueMax: 32 }));
    const producer = { serverIdx: 1, data: { config: elements.get(id), remoteData: cell } };
    const actual = expected.map((_value, index) => Product.CellProductCheck(producer, 1, index));
    assert.deepEqual(actual.map(row => row.id), expected);
    assert(actual.every(row => row.isList === true && row.actualTimes === 1 && row.refundEnergy === 0));
    assert(h.calls.some(([name, value]) => name === 'getElementAB' && value === id));
  }
  assert.equal(h.board.tutorialOrder.get('A_0').length, 0);
});
