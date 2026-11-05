import test from "node:test";
import assert from "node:assert/strict";
import {
  createGame,
  createInitialState,
  validateState,
  SAVE_KEY,
  ENERGY_INTERVAL,
  RESCUE_TARGETS,
} from "../tailor/engine.js";
import {
  ITEM_RULES,
  ORDER_RULES,
  BUILD_RULES,
  LEVEL_RULES,
} from "../tailor/data.js";

const epoch = 1_799_999_000_000;
function memoryStorage() {
  const values = new Map();
  return {
    getItem: (key) => values.get(key) || null,
    setItem: (key, value) => values.set(key, value),
    values,
  };
}
function gameForTest({
  main = true,
  random = () => 0,
  storage = memoryStorage(),
} = {}) {
  let clock = epoch;
  const game = createGame({ storage, now: () => clock, random });
  if (main) {
    game.state.story.phase = "main";
    game.state.story.dialogue = null;
    game.state.story.rescueStage = 3;
  }
  return {
    game,
    storage,
    advance: (ms) => {
      clock += ms;
      game.tick();
    },
  };
}
function finishDialogue(game) {
  for (let guard = 0; guard < 100 && game.getDialogue(); guard++)
    assert.equal(game.nextDialogue().ok, true);
  assert.equal(game.getDialogue(), null);
}
function action(result) {
  assert.equal(result.ok, true, result.message);
  return result;
}
function free(game, id) {
  return game
    .getBoard()
    .filter((cell) => cell.itemId === id && cell.lock === "free");
}
function generate(game, index) {
  const result = action(game.produce(index));
  return result.events.find((event) => event.type === "produce").spawned[0];
}
function startMainProducer(game) {
  action(game.move(30, 31));
  action(game.move(31, 32));
  action(game.move(32, 39));
  assert.equal(game.state.board[39].itemId, 1004);
}
function firstTwoOrders(game) {
  startMainProducer(game);
  action(game.move(generate(game, 39), 38));
  action(game.submitOrder(1001));
  finishDialogue(game);
  const a = generate(game, 39),
    b = generate(game, 39);
  action(game.move(a, b));
  action(game.move(b, 24));
  action(game.move(24, 17));
  action(game.submitOrder(1002));
  finishDialogue(game);
}

test("real Board100 opening requires three merges and reveals adjacent crates as sealed items", () => {
  const { game } = gameForTest();
  assert.deepEqual(game.getBoardSize(), { rows: 9, cols: 7 });
  assert.equal(game.state.board.length, 63);
  assert.equal(
    game.state.board.filter((cell) => cell.lock === "free").length,
    2,
  );
  assert.equal(game.move(0, 30).ok, false);
  assert.equal(game.move(30, 0).ok, false);
  action(game.move(30, 31));
  assert.equal(game.state.board[24].lock, "web");
  assert.equal(game.state.board[24].itemId, 1102);
  assert.equal(game.move(31, 24).ok, false);
  action(game.move(31, 32));
  action(game.move(32, 39));
  assert.equal(game.state.board[39].itemId, 1004);
  assert.equal(game.state.board[38].lock, "web");
  assert.equal(game.state.resources.energy, 100);
  assert.equal(game.state.stats.merges, 3);
});

test("orders consume actual unlocked materials; first repair awards correct XP, coins and a queued tool", () => {
  const { game } = gameForTest();
  assert.equal(game.submitOrder(1001).ok, false);
  firstTwoOrders(game);
  assert.deepEqual(game.state.completedOrders, [1001, 1002]);
  assert.equal(game.state.resources.star, 2);
  assert.equal(game.state.resources.energy, 97);
  assert.equal(game.submitOrder(1002).ok, false);
  action(game.build(10001));
  assert.equal(game.state.resources.star, 0);
  assert.equal(game.state.resources.coin, 50);
  assert.equal(game.state.level, 2);
  assert.equal(game.state.exp, 5);
  assert.deepEqual(game.state.channel, [1004]);
  finishDialogue(game);
  assert.equal(game.build(10001).ok, false);
  action(game.claimChannel());
  assert.equal(game.state.channel.length, 0);
  assert.equal(game.claimChannel().ok, false);
  const second = free(game, 1004).find((cell) => cell.id !== 39).id;
  action(game.move(second, 39));
  finishDialogue(game);
  assert.equal(game.state.board[39].itemId, 1005);
  assert.equal(
    game.state.board[39].stock,
    61,
    "the upgraded tool retains 29 + 32 unused taps",
  );
  const cloth = generate(game, 39);
  assert.equal(game.state.board[cloth].itemId, 1201);
  action(game.move(cloth, 25));
  action(game.move(25, 18));
  action(game.submitOrder(1003));
  finishDialogue(game);
  action(game.build(10002));
  assert.equal(game.state.level, 2);
  assert.equal(game.state.exp, 10);
  assert.deepEqual(game.state.channel, [1005]);
  assert.equal(game.state.resources.star, 0);
  assert.equal(validateState(game.state), true);
});

test("the rescue episode is playable through all three material objectives without skips or extra resources", () => {
  const { game } = gameForTest({ main: false, random: () => 0 });
  assert.equal(game.produce(15).ok, false);
  finishDialogue(game);
  assert.equal(game.state.story.phase, "rescue");
  assert.deepEqual(game.getBoardSize(), { rows: 4, cols: 7 });
  let guard = 0;
  while (game.state.story.phase === "rescue" && guard++ < 500) {
    finishDialogue(game);
    const cells = game.getBoard();
    const target = cells.find(
      (cell) =>
        cell.lock === "free" &&
        cell.itemId === RESCUE_TARGETS[game.state.story.rescueStage],
    );
    if (target) {
      action(game.useRescue(target.id));
      continue;
    }
    const pairs = [];
    for (const source of cells.filter(
      (cell) => cell.lock === "free" && ITEM_RULES[cell.itemId]?.next,
    )) {
      for (const target of cells.filter(
        (cell) =>
          cell.id !== source.id &&
          cell.lock !== "box" &&
          cell.itemId === source.itemId,
      )) {
        pairs.push([source, target]);
      }
    }
    pairs.sort(
      (a, b) =>
        Number(b[1].lock === "web") - Number(a[1].lock === "web") ||
        b[1].itemId - a[1].itemId,
    );
    if (pairs.length) {
      action(game.move(pairs[0][0].id, pairs[0][1].id));
      continue;
    }
    const producer = cells.find(
      (cell) =>
        cell.lock === "free" &&
        ITEM_RULES[cell.itemId]?.drops.length &&
        cell.stock > 0,
    );
    assert.ok(
      producer,
      `rescue stalled at stage ${game.state.story.rescueStage}`,
    );
    action(game.produce(producer.id));
  }
  assert.ok(guard < 500, "rescue must reach its conclusion");
  finishDialogue(game);
  assert.equal(game.state.story.rescueStage, 3);
  assert.equal(game.state.story.phase, "main");
  assert.equal(
    game.state.board.filter((cell) => cell.lock === "free").length,
    2,
  );
  assert.ok(
    game.state.resources.energy > 0 && game.state.resources.energy < 100,
  );
  assert.equal(validateState(game.state), true);
});

test("rescue goals cannot be merged away before the current repair is applied", () => {
  const { game } = gameForTest({ main: false });
  finishDialogue(game);
  action(game.move(8, 9));
  action(game.move(9, 10));
  assert.equal(game.state.rescueBoard[10].itemId, 11013);
  Object.assign(game.state.rescueBoard[0], { itemId: 11013 });
  assert.equal(game.move(10, 0).ok, false);
  assert.equal(game.state.rescueBoard[10].itemId, 11013);
  action(game.useRescue(10));
  finishDialogue(game);
  Object.assign(game.state.rescueBoard[1], { itemId: 11013 });
  action(game.move(0, 1));
  assert.equal(game.state.rescueBoard[1].itemId, 11014);
});

test("producer stock and energy recover from elapsed wall time and persist while offline", () => {
  const { game, storage, advance } = gameForTest();
  startMainProducer(game);
  const first = generate(game, 39);
  assert.equal(game.state.board[first].itemId, 1101);
  assert.equal(game.state.board[39].stock, 31);
  assert.equal(game.state.resources.energy, 99);
  assert.ok(game.detail(39).cooldownMs > 0);
  advance(112_000);
  assert.equal(game.state.board[39].stock, 32);
  assert.equal(game.state.resources.energy, 99);
  advance(8_000);
  assert.equal(game.state.resources.energy, 100);
  assert.equal(game.state.energyAt, 0);
  game.save();
  const reloaded = createGame({ storage, now: () => epoch + 86400_000 });
  assert.equal(reloaded.state.board[39].stock, 32);
  assert.equal(reloaded.state.resources.energy, 100);
  assert.equal(reloaded.state.stats.produced, 1);
  assert.equal(reloaded.loadWarning, "");
  assert.ok(storage.values.has(SAVE_KEY));
  assert.equal(storage.values.size, 1);
});

test("full board production is rejected without spending energy, inventory or scripted drops", () => {
  const { game } = gameForTest();
  startMainProducer(game);
  for (const cell of game.state.board)
    if (!cell.itemId) Object.assign(cell, { itemId: 1101 });
  const before = clone(game.state);
  assert.equal(game.produce(39).ok, false);
  assert.deepEqual(game.state.resources, before.resources);
  assert.equal(game.state.board[39].stock, before.board[39].stock);
  assert.equal(game.state.board[39].produced, 0);
});

test("empty producers wait for a complete batch, while upgraded surplus does not accumulate recovery time", () => {
  const { game, advance } = gameForTest();
  startMainProducer(game);
  const producer = clone(game.state.board[39]);
  game.state.board = game.state.board.map((cell) => ({
    ...cell,
    itemId: 0,
    lock: "free",
    stock: 0,
    uses: 0,
    recoverAt: 0,
    cooling: false,
    autoStock: 0,
    autoAt: 0,
    autoUses: 0,
  }));
  game.state.board[39] = producer;
  for (let n = 0; n < 32; n++) generate(game, 39);
  assert.equal(game.state.board[39].stock, 0);
  assert.equal(game.state.board[39].cooling, true);
  advance(112_000);
  assert.equal(game.state.board[39].stock, 1);
  assert.equal(game.produce(39).ok, false);
  advance(31 * 112_000);
  assert.equal(game.state.board[39].stock, 32);
  assert.equal(game.state.board[39].cooling, false);
  assert.equal(game.state.board[39].recoverAt, 0);

  game.state.board[39].stock = 64;
  advance(86400_000);
  generate(game, 39);
  assert.equal(game.state.board[39].stock, 63);
  assert.equal(game.state.board[39].recoverAt, 0);
  assert.equal(validateState(game.state), true);
});

test("storage preserves producer identity and stock and orders can consume stored materials", () => {
  const { game } = gameForTest();
  startMainProducer(game);
  const item = generate(game, 39);
  action(game.move(item, 38));
  game.state.level = 5;
  action(game.store(38));
  assert.equal(game.state.bag[0].itemId, 1102);
  assert.equal(game.getOrders()[0].ready, true);
  action(game.submitOrder(1001));
  finishDialogue(game);
  assert.equal(game.state.bag.length, 0);
  const stock = game.state.board[39].stock;
  action(game.store(39));
  action(game.withdraw(0, 31));
  assert.equal(game.state.board[31].itemId, 1004);
  assert.equal(game.state.board[31].stock, stock);
  assert.equal(game.state.board[31].produced, 1);
  assert.equal(
    game.sell(31).ok,
    false,
    "the final renewable production tool is protected",
  );
  assert.equal(validateState(game.state), true);
});

test("selling cannot remove the final tool of a required material family", () => {
  const { game } = gameForTest();
  startMainProducer(game);
  game.state.level = 5;
  game.state.channel.push(2004, 3001);
  action(game.claimChannel());
  const otherTool = free(game, 2004)[0];
  assert.equal(
    game.sell(39).ok,
    false,
    "a different producer does not replace the fabric source",
  );
  assert.equal(
    game.sell(otherTool.id).ok,
    false,
    "the thread source must also remain available",
  );
  action(game.claimChannel());
  assert.equal(
    game.sell(free(game, 3001)[0].id).ok,
    false,
    "parts must be retained before the first tool in that family is assembled",
  );
});

test("shop uses real currency and daily finite limits", () => {
  const { game } = gameForTest();
  assert.equal(game.buyShop("energy").ok, false);
  game.state.level = 3;
  game.state.resources.energy = 20;
  action(game.buyShop("energy"));
  assert.equal(game.state.resources.diamond, 15);
  assert.equal(game.state.resources.energy, 120);
  assert.equal(game.buyShop("energy").ok, false);
  assert.equal(game.buyShop("tool").ok, false);
  assert.equal(game.state.channel.length, 0);
  assert.equal(game.state.resources.coin, 0);
});

test("independent saves round-trip and invalid import leaves the active game intact", () => {
  const { game } = gameForTest();
  firstTwoOrders(game);
  const text = game.exportSave();
  const other = gameForTest({ main: false }).game;
  action(other.importSave(text));
  assert.deepEqual(other.state, game.state);
  const broken = JSON.parse(text);
  broken.state.resources.star = -1;
  const before = other.exportSave();
  assert.equal(other.importSave(JSON.stringify(broken)).ok, false);
  assert.equal(other.exportSave(), before);
  const wrong = JSON.parse(text);
  wrong.state.board[0].itemId = 99999999;
  assert.equal(other.importSave(JSON.stringify(wrong)).ok, false);
  assert.equal(other.exportSave(), before);
});

test("first chapter order/build dependencies have sufficient earned stars and a finite conclusion", () => {
  const { game } = gameForTest();
  let guard = 0;
  // This fixture supplies the requested crafts to audit economy and dependency reachability,
  // separately from the real opening and rescue interaction tests above.
  while (!game.state.story.chapterComplete && guard++ < 100) {
    let progress = false;
    for (const order of game.getOrders()) {
      for (const [id, count] of Object.entries(order.demand)) {
        for (let n = 0; n < count; n++)
          game.state.bag.push({
            id: 0,
            itemId: Number(id),
            lock: "free",
            cover: 0,
            stock: 0,
            recoverAt: 0,
            cooling: false,
            produced: 0,
            uses: 0,
          });
      }
      action(game.submitOrder(order.id));
      finishDialogue(game);
      progress = true;
    }
    for (const build of game.getBuilds().filter((build) => build.ready)) {
      action(game.build(build.id));
      finishDialogue(game);
      progress = true;
    }
    assert.ok(
      progress || game.state.story.chapterComplete,
      "the chapter must not deadlock on unavailable stars",
    );
  }
  assert.equal(game.state.completedOrders.length, ORDER_RULES.length);
  assert.equal(game.state.completedBuilds.length, BUILD_RULES.length);
  assert.equal(game.state.story.chapterComplete, true);
  assert.equal(game.getOrders().length, 0);
  assert.ok(game.state.resources.star >= 0);
});

test("every order material has a sustainable producer unlocked before its first gated order", () => {
  const sources = [
    { producer: 1004, build: 0, order: 1001 },
    { producer: 2004, build: 10004, order: 1008 },
    { producer: 3005, build: 10009, order: 1019 },
    { producer: 8005, build: 10011, order: 1023 },
    { producer: 4004, build: 10016, order: 1034 },
    { producer: 9005, build: 10018, order: 1043 },
  ];
  const craftable = new Set();
  for (const source of sources) {
    const producer = ITEM_RULES[source.producer];
    assert.ok(
      producer.interval > 0 && producer.drops.length > 0 && producer.uses === 0,
    );
    if (source.build) {
      const firstOrder = ORDER_RULES.find((rule) => rule.id === source.order);
      assert.ok(firstOrder.conditions.includes(`FinishBuild${source.build}`));
      if (source.producer === 2004) {
        assert.equal(
          BUILD_RULES.find((rule) => rule.id === 10004).reward[2001],
          1,
        );
        assert.deepEqual(
          [2001, 2002, 2003].map((id) => ITEM_RULES[id].next),
          [2002, 2003, 2004],
        );
      } else {
        const earnedExp = BUILD_RULES.filter(
          (rule) => rule.id <= source.build,
        ).reduce((sum, rule) => sum + (rule.reward.Exp || 0), 0);
        const levelReward = LEVEL_RULES.find(
          (rule) => rule.reward[source.producer],
        );
        assert.ok(
          levelReward && levelReward.totalExp <= earnedExp,
          `${source.producer} must be awarded before order ${source.order}`,
        );
      }
    }
    for (const drop of producer.drops) {
      assert.ok(drop.weight > 0);
      for (let id = drop.id; id; id = ITEM_RULES[id].next) craftable.add(id);
    }
  }
  // Finished garments are themselves one-use producers for accessory pieces;
  // e.g. 4104 yields 4201 and becomes 4103, which can be crafted upward again.
  let changed = true;
  while (changed) {
    changed = false;
    for (const id of [...craftable]) {
      const rule = ITEM_RULES[id];
      for (const next of [
        rule.next,
        ...rule.drops.map((drop) => drop.id),
        rule.vanishTo,
      ]) {
        if (next && !craftable.has(next)) {
          craftable.add(next);
          changed = true;
        }
      }
    }
  }
  for (const order of ORDER_RULES)
    for (const id of Object.keys(order.demand))
      assert.ok(
        craftable.has(Number(id)),
        `order ${order.id} has no sustainable source for ${id}`,
      );
});

test("finished garments yield accessory pieces and retain their reusable lower garment", () => {
  const { game } = gameForTest();
  startMainProducer(game);
  const index = 31;
  Object.assign(game.state.board[index], { itemId: 4104, stock: 1, uses: 1 });
  const energy = game.state.resources.energy;
  const spawned = generate(game, index);
  assert.equal(game.state.board[spawned].itemId, 4201);
  assert.equal(game.state.board[index].itemId, 4103);
  assert.equal(game.state.resources.energy, energy - 1);
  assert.equal(validateState(game.state), true);
});

test("automatic tools spawn beside themselves, retain capped offline stock and stay packed inside storage", () => {
  const { game, advance } = gameForTest();
  startMainProducer(game);
  game.state.board = game.state.board.map((cell) => ({
    ...cell,
    itemId: 0,
    lock: "free",
    stock: 0,
    uses: 0,
    recoverAt: 0,
    cooling: false,
    autoStock: 0,
    autoAt: 0,
    autoUses: 0,
  }));
  Object.assign(game.state.board[31], { itemId: 5106, autoStock: 1 });
  advance(1);
  assert.equal(game.state.board[24].itemId, 6001);
  assert.equal(
    game.state.resources.energy,
    100,
    "automatic work does not spend energy",
  );
  advance(8000_000 * 20);
  assert.deepEqual(
    [24, 30, 32, 38].map((index) => game.state.board[index].itemId),
    [6001, 6001, 6001, 6001],
  );
  assert.equal(game.state.board[31].autoStock, 4);
  assert.equal(game.state.board[31].autoAt, 0);
  game.state.level = 5;
  action(game.store(31));
  const before = game.state.board.filter((cell) => cell.itemId).length;
  advance(86400_000);
  assert.equal(
    game.state.board.filter((cell) => cell.itemId).length,
    before,
    "a packed tool must not spawn from an unrelated board position",
  );
  assert.equal(game.state.bag[0].autoStock, 4);
  action(game.withdraw(0, 31));
  action(game.move(24, 0));
  advance(1);
  assert.equal(game.state.board[24].itemId, 6001);
  assert.equal(game.state.board[31].autoStock, 3);
  assert.equal(validateState(game.state), true);
});

test("finite automatic tools stop at their configured uses and transform into the remaining item", () => {
  const { game, advance } = gameForTest();
  game.state.board = game.state.board.map((cell) => ({
    ...cell,
    itemId: 0,
    lock: "free",
    stock: 0,
    uses: 0,
    recoverAt: 0,
    cooling: false,
    autoStock: 0,
    autoAt: 0,
    autoUses: 0,
  }));
  Object.assign(game.state.board[31], {
    itemId: 6407,
    autoStock: 1,
    autoUses: 7,
  });
  for (let n = 0; n < 7; n++) {
    advance(n === 0 ? 1 : 60_000);
    const spawned = [24, 30, 32, 38].find(
      (index) => game.state.board[index].itemId === 6501,
    );
    assert.notEqual(spawned, undefined);
    action(game.move(spawned, n));
  }
  assert.equal(game.state.board[31].itemId, 6501);
  assert.equal(game.state.stats.produced, 7);
  advance(86400_000);
  assert.equal(game.state.stats.produced, 7);
  assert.equal(validateState(game.state), true);
});

test("time vouchers also advance automatic production and item details identify its source", () => {
  const { game, advance } = gameForTest();
  game.state.board = game.state.board.map((cell) => ({
    ...cell,
    itemId: 0,
    lock: "free",
    stock: 0,
    uses: 0,
    recoverAt: 0,
    cooling: false,
    autoStock: 0,
    autoAt: 0,
    autoUses: 0,
  }));
  Object.assign(game.state.board[31], { itemId: 5106, autoStock: 1 });
  advance(1);
  assert.ok(game.detail(24).sources.some((source) => source.id === 5106));
  action(game.move(24, 2));
  Object.assign(game.state.board[0], { itemId: 98401 });
  action(game.useProp(0));
  assert.equal(game.detail(31).autoCooldownMs, 4_400_000);
  assert.equal(game.state.board[0].itemId, 0);
  advance(4_400_000);
  assert.equal(game.state.board[24].itemId, 6001);
  assert.equal(game.state.resources.energy, 100);
});

test("the reward needle part physically unlocks the original sealed thread-tool chain", () => {
  const { game } = gameForTest();
  firstTwoOrders(game);
  action(game.build(10001));
  finishDialogue(game);
  action(game.claimChannel());
  action(game.move(free(game, 1004).find((cell) => cell.id !== 39).id, 39));
  finishDialogue(game);
  const cloth = generate(game, 39);
  action(game.move(cloth, 25));
  action(game.move(25, 18));
  assert.equal(game.state.board[26].lock, "web");
  // Build10004's one 2001 reward is checked in the provenance test above.
  game.state.channel.push(2001);
  action(game.claimChannel());
  const part = free(game, 2001)[0];
  action(game.move(part.id, 26));
  action(game.move(26, 27));
  action(game.move(27, 34));
  assert.equal(game.state.board[34].itemId, 2004);
  const material = generate(game, 34);
  assert.equal(game.state.board[material].itemId, 2101);
});

const clone = (value) => JSON.parse(JSON.stringify(value));
