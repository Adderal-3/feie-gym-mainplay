import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(import.meta.dirname, '..');
const source = fs.readFileSync(path.join(root, 'original/story-profile.js'), 'utf8');
const json = name => JSON.parse(fs.readFileSync(path.join(root, 'recovered/reference623/config/Config', name + '.json')));
const rows = value => Object.values(value).flatMap(row => row && typeof row === 'object' && (row.id !== undefined || row.series !== undefined) ? [row] : rows(row));
const table = (name, key = 'id') => {
  const list = rows(json(name));
  const map = new Map(list.map(row => [row[key], row]));
  return { list, getById: id => map.get(id), getBySeries: series => map.get(series) };
};
const TIME = 1793862000000;

function harness() {
  let constructed = 0;
  class Role {
    constructor() {
      constructed++;
      Object.assign(this, { createVersion: 0, level: 0, star: 0, coin: 0, diamond: 0,
        energy: {}, userInfo: {}, guide: new Map(), boards: new Map(),
        build: { areas: [], builded: new Map() } });
    }
  }
  class Board {
    constructor() {
      Object.assign(this, { seed: { seed: 0 }, cells: new Map(), orders: new Map(), ordered: new Map(),
        tutorialOrder: new Map(), bag: { size: 0 }, channel: new Map() });
    }
  }
  class Cell { constructor() { this.seed = 0;this.extra = new Map(); } }
  class Order { constructor() { this.demand = new Map(); } }
  const config = {
    Config: { config: json('Config') }, Board: table('Board'), Order: table('Order'),
    OrderSeries: table('OrderSeries'), NewbieCreateData: table('NewbieCreateData'),
    ElementSeries: table('ElementSeries', 'series'), ElementSeriesAB: table('ElementSeriesAB', 'series'),
    ManagerUniform: table('ManagerUniform'), ManagerFrame: table('ManagerFrame'), ManagerPhoto: table('ManagerPhoto'),
    Bag: { sheetList: new Map(Object.entries(json('Bag')).map(([name, group]) => [name, Object.values(group)])) },
  };
  const guideSheets = json('GuideStep');
  const resolver = {
    findCreateVersionConfig(version, find) {
      const first = config.NewbieCreateData.list[0].id;
      for (let v = version; v >= first; v--) { const value = find(v);if (value) return value; }
    },
    getGuideStep(version, guide) {
      const resolved = this.findCreateVersionConfig(version, v => guideSheets[guide + '_' + v]);
      return { allSteps: Object.values(resolved || guideSheets[guide] || {}) };
    },
  };
  const sentinel = { unchanged: true };
  const api = { config, q6: { instance: resolver }, F8: { version: '6.2.3' },
    ar: { main: 1 }, yu: Role, pl: Board, ll: Cell, Zc: Order,
    E8: { role: sentinel }, G2: { cacheBoard: sentinel } };
  const window = {};
  vm.runInNewContext(source, { window, Map, Date, Number });
  return { api, config, window, constructed: () => constructed, sentinel };
}

test('AB14 profile refuses unspecified or invalid balances instead of using old Config defaults', () => {
  const h = harness();
  const result = h.window.createOriginalStoryProfile(h.api);
  assert.equal(result.ready, false);
  assert.deepEqual(Array.from(result.missing), ['initialResources.coin', 'initialResources.diamond', 'initialResources.energy']);
  assert.equal(h.constructed(), 0);
  assert.equal(result.role, undefined);
  const invalid = h.window.createOriginalStoryProfile(h.api, { initialResources: { coin: -1, diamond: 20, energy: 100 } });
  assert.equal(invalid.ready, false);
  assert.equal(h.constructed(), 0);
});

test('actual 6.2.3 tables build the selected local AB14 route without binding an account or completing guides', () => {
  const h = harness();
  const result = h.window.createOriginalStoryProfile(h.api, { initialResources: { coin: 0, diamond: 20, energy: 100 }, now: TIME });
  assert.equal(result.ready, true);
  const { role, board, evidence } = result;
  assert.deepEqual([role.createVersion, role.level, role.expLevel, role.star, role.coin, role.diamond], [14, 1, 0, 0, 0, 20]);
  assert.equal(role.energy.value, 100);
  assert.equal(role.guide.size, 0);
  assert.equal(role.boards.get(1), board);
  assert.equal(board.boardId, 100);
  assert.equal(board.cells.size, 63);
  assert.equal(board.cells.get(31).elementId, 1001);
  assert.equal(board.cells.get(33).elementId, 1002);
  assert.equal(board.cells.get(33).state, 1);
  assert.equal(board.orders.size, 1);
  assert.equal(board.orders.has(10001), false);
  assert.equal(board.ordered.has(1001), true, 'the first order is acquired for original UT.checkOrderGot');
  assert.equal(board.ordered.get(1001), false, 'acquired does not mean completed');
  assert.equal(board.ordered.has(10001), false, 'the legacy drawer is never acquired');
  assert.deepEqual(Array.from(board.orders.get(1001).demand), [[1102, 1]]);
  assert.equal(board.bag.size, 5);
  assert.equal(board.freeSpeedUpTimes, 1);
  assert.equal(evidence.initialResources.evidence, 'INFERRED_FROM_REFERENCE_MILESTONE');
  assert.deepEqual([evidence.originalGuides.openingFirstStep, evidence.originalGuides.formalFirstStep], [9914001, 9914103]);
  assert.equal(h.api.E8.role, h.sentinel);
  assert.equal(h.api.G2.cacheBoard, h.sentinel);
});

test('explicit empty AB tutorial sequences suppress the legacy 1101/1201 sequence and never mutate source tables', () => {
  const h = harness();
  const base = h.config.ElementSeries.getBySeries('A_0');
  assert.deepEqual(base.tutorialElementOrder.slice(0, 2), [1101, 1201]);
  const result = h.window.createOriginalStoryProfile(h.api, { initialResources: { coin: 0, diamond: 20, energy: 100 }, now: TIME });
  for (const series of ['A_0', 'B_0', 'C_0', 'E_0', 'Chest_1', 'Chest_2']) {
    assert.equal(result.board.tutorialOrder.has(series), true);
    assert.equal(result.board.tutorialOrder.get(series).length, 0);
  }
  const energy = h.config.ElementSeries.getBySeries('Chest_Energy').tutorialElementOrder;
  result.board.tutorialOrder.get('Chest_Energy').shift();
  result.board.orders.get(1001).demand.set(1102, 8);
  assert.equal(energy.length, 10);
  assert.equal(h.config.Order.getById(1001).demand['1102'], 1);
  assert.deepEqual(base.tutorialElementOrder.slice(0, 2), [1101, 1201]);
});
