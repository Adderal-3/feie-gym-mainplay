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

function harness(setupRole) {
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
