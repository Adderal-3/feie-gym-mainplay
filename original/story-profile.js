/* Reconstruct a NEW local AB14 session from original tables. This is not an
 * imported account, a recovered roleLogin response, or a server new-role algorithm.
 * The caller owns binding the returned models and running original startup events.
 */
(function (global) {
  'use strict';
  const CREATE_VERSION = 14;
  const BOARD_CONFIG_ID = 100;
  const ORDER_SERIES_ID = 996;
  const FIRST_ORDER_ID = 1001;
  const RESOURCE_EVIDENCE = 'INFERRED_FROM_REFERENCE_MILESTONE';

  const pairs = value => value instanceof Map ? Array.from(value) : Object.entries(value || {});
  const ctor = (api, name) => api[name] || api.classes?.[name];

  global.createOriginalStoryProfile = function (api, options) {
    api = api || global.OriginalGameBridge || global.__ORIGINAL__;
    options = options || {};
    const missing = [];
    const input = options.initialResources || {};
    const evidence = {
      kind: 'RECONSTRUCTED_LOCAL_SESSION',
      selection: { createVersion: CREATE_VERSION, boardConfigId: BOARD_CONFIG_ID,
        orderSeriesId: ORDER_SERIES_ID, firstOrderId: FIRST_ORDER_ID,
        source: 'REFERENCE_FLOW_AND_ORIGINAL_TABLES',
        limitation: 'Original server allocation and account state were not recovered.' },
      initialResources: { evidence: RESOURCE_EVIDENCE,
        basis: 'Reference Build1_13/9913210 shows coin 50 and diamond 20; original 13_10001 grants Coin 50; preceding 1001/1002 orders grant only Star. No diamond spending was observed.',
        limitation: 'These are explicit local starting values inferred from that milestone, not proven server initial balances.' },
      initialProgress: { level: 1, expLevel: 0, star: 0,
        evidence: 'MINIMAL_LOCAL_START_BEFORE_SELECTED_ORIGINAL_GUIDE' },
      runtimeIdentity: 'Local role/board/cell IDs and clock; original model seed defaults, not recovered server seeds.',
      startup: 'No events, navigation, role binding, guide completion, or persistence are performed here.',
    };
    for (const key of ['coin', 'diamond', 'energy']) {
      if (!Number.isSafeInteger(input[key]) || input[key] < 0) missing.push('initialResources.' + key);
    }
    if (!api?.config || !api.q6?.instance?.findCreateVersionConfig || !api.q6.instance.getGuideStep) missing.push('originalConfigAndABResolver');
    for (const name of ['yu', 'pl', 'll', 'Zc']) if (!api || !ctor(api, name)) missing.push('bindings.' + name);
    if (missing.length) return { ready: false, missing, evidence };

    const cfg = api.config;
    const settings = cfg.Config.config;
    const initial = cfg.Board.getById(BOARD_CONFIG_ID);
    const firstOrder = cfg.Order.getById(FIRST_ORDER_ID);
    const drawer = cfg.OrderSeries.getById(ORDER_SERIES_ID);
    const newbie = cfg.NewbieCreateData.getById(CREATE_VERSION);
    const opening = api.q6.instance.getGuideStep(CREATE_VERSION, 'PlayableBoard');
    const formal = api.q6.instance.getGuideStep(CREATE_VERSION, 'Board');
    if (!initial || initial.type !== 'Main') missing.push('config.Board.100');
    if (!firstOrder || firstOrder.orderSeries !== ORDER_SERIES_ID) missing.push('config.Order.1001');
    if (!drawer) missing.push('config.OrderSeries.996');
    if (newbie?.guideVersion !== 2) missing.push('config.NewbieCreateData.14');
    if (opening?.allSteps?.[0]?.id !== 9914001) missing.push('config.GuideStep.PlayableBoard_14');
    if (formal?.allSteps?.[0]?.id !== 9914103) missing.push('config.GuideStep.Board_14');
    if (!cfg.ElementSeriesAB?.getBySeries || !cfg.ElementSeries?.list) missing.push('config.ElementSeriesAB');
    if (!settings || input.energy > settings.energyMax) missing.push('initialResources.energyWithinOriginalMax');
    if (missing.length) return { ready: false, missing, evidence };

    const now = options.now === undefined ? Date.now() : options.now;
    if (!Number.isSafeInteger(now) || now < 0) return { ready: false, missing: ['localClock'], evidence };
    const role = new (ctor(api, 'yu'))();
    role.id = 1;
    role.createVersion = CREATE_VERSION;
    role.level = 1;
    role.expLevel = 0;
    role.star = 0;
    role.coin = input.coin;
    role.diamond = input.diamond;
    role.version = api.F8?.version || '';
    role.language = 'zh';
    role.createAt = new Date(now);
    role.globalActivity = new Map();
    role.energy.value = input.energy;
    role.energy.valueMax = settings.energyMax;
    role.energy.interval = settings.energyRecoverRate;
    role.energy.intervalValue = 1;
    role.energy.startTime = now;
    role.energy.id = 'energy';
    role.build.areas.push(1);
    role.build.builded.set(10001, false);
    // Keep ownership reconstruction confined to original default appearance rows.
    for (const [table, field, stringify] of [
      ['ManagerUniform', 'uniform', false], ['ManagerFrame', 'imgBox', false], ['ManagerPhoto', 'img', true],
    ]) {
      const row = cfg[table]?.list?.find(item => item.isDefault === 1);
      if (row && !role.userInfo[field]) role.userInfo[field] = stringify ? String(row.id) : row.id;
    }

    const board = new (ctor(api, 'pl'))();
    board.id = 1;
    board.boardId = BOARD_CONFIG_ID;
    board.rId = role.id;
    board.type = api.ar.main;
    board.rows = initial.element.length;
    board.cols = initial.element[0].length;
    board.cellSize = initial.cellSize;
    board.freeSpeedUpTimes = newbie.FreeSpeedUpTimes;
    board.freeRechargeTimes = settings.FreeRechargeTimes;
    // The original Bag table declares five contiguous free normal slots.
    const normalBag = cfg.Bag?.sheetList?.get('normal') || [];
    for (const slot of normalBag.slice().sort((a, b) => a.id - b.id)) {
      if (slot.id !== board.bag.size + 1 || pairs(slot.unlock).length || slot.unlockLevel?.length) break;
      board.bag.size = slot.id;
    }
    const seriesOverrides = [];
    for (const series of cfg.ElementSeries.list) {
      if (!series.type.includes('Main')) continue;
      const ab = api.q6.instance.findCreateVersionConfig(CREATE_VERSION,
        version => cfg.ElementSeriesAB.getBySeries(version + '_' + series.series));
      const sequence = ab ? ab.tutorialElementOrder : series.tutorialElementOrder;
      // An explicit empty AB list clears the old tutorial; it must not fall back.
      if (sequence?.length || ab) board.tutorialOrder.set(series.series, sequence.slice());
      if (ab) seriesOverrides.push({ series: series.series, source: ab.series, length: sequence.length });
    }
    let index = 1;
    for (const row of initial.element) for (const encoded of row) {
      const [elementId, state, cover] = String(encoded).split(':').map(Number);
      const cell = new (ctor(api, 'll'))();
      cell.index = index;
      cell.elementId = elementId;
      cell.state = state;
      cell.uUID = cell.client_id = cell.client_uuid = index;
      if (cover) cell.extra.set('coverVariant', String(cover));
      board.cells.set(index++, cell);
    }
    board.incrementId = index - 1;
    const order = new (ctor(api, 'Zc'))();
    order.id = FIRST_ORDER_ID;
    order.orderId = FIRST_ORDER_ID;
    order.demand = new Map(pairs(firstOrder.demand).map(([id, count]) => [Number(id), count]));
    board.orders.set(FIRST_ORDER_ID, order);
    // UT.checkOrderGot and getDrawerAlreadyHave use presence in ordered;
    // false is an acquired, unfinished order, not a completed guide or order.
    board.ordered.set(FIRST_ORDER_ID, false);
    role.boards.set(board.id, board);
    evidence.initialResources.values = { coin: input.coin, diamond: input.diamond, energy: input.energy };
    evidence.seriesOverrides = seriesOverrides;
    evidence.originalGuides = { openingFirstStep: opening.allSteps[0].id, formalFirstStep: formal.allSteps[0].id };
    return { ready: true, missing: [], role, board, evidence };
  };
})(window);
