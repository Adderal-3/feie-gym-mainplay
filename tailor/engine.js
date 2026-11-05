import {
  INITIAL_BOARD,
  RESCUE_BOARD,
  ITEM_RULES,
  ORDER_RULES,
  BUILD_RULES,
  LEVEL_RULES,
  PROP_RULES,
} from "./data.js";
import {
  STORY,
  getItemContent,
  getOrderContent,
  getBuildContent,
} from "./content.js";

export const SAVE_KEY = "jianghu-bufang-offline-v1";
export const SAVE_VERSION = 1;
export const ENERGY_MAX = 100;
export const ENERGY_INTERVAL = 120_000;
export const RESCUE_TARGETS = [11013, 11014, 11018];
const RESOURCE_KEYS = {
  Energy: "energy",
  Coin: "coin",
  Diamond: "diamond",
  Star: "star",
};
const DIALOGUES = {
  ...STORY,
  ...Object.fromEntries(
    ORDER_RULES.map((rule) => [
      `order_${rule.id}`,
      getOrderContent(rule.id).dialogue || [],
    ]),
  ),
  ...Object.fromEntries(
    BUILD_RULES.map((rule) => [
      `build_${rule.id}`,
      getBuildContent(rule.id).dialogue || [],
    ]),
  ),
};
const SHOP = [
  {
    id: "energy",
    title: "清茶提神",
    description: "恢复100点精力，每日限购1份。",
    cost: { diamond: 5 },
    reward: { Energy: 100 },
    limit: 1,
  },
  {
    id: "tool",
    title: "针匣榫木片",
    description: "一阶制具零件，可与棋盘上的同阶榫木片合成。每日限购2份。",
    cost: { coin: 80 },
    reward: { 1001: 1 },
    limit: 2,
  },
  {
    id: "supply",
    title: "行商备料箱",
    description: "开启后可取出5件布料，每日限购1箱。",
    cost: { coin: 120 },
    reward: { 91101: 1 },
    limit: 1,
  },
];
const clone = (value) => JSON.parse(JSON.stringify(value));
const ok = (message = "", events = []) => ({ ok: true, message, events });
const fail = (message) => ({ ok: false, message, events: [] });
const safeInt = (value, min = 0, max = 1e9) =>
  Number.isSafeInteger(value) && value >= min && value <= max;
const blank = (id) => ({
  id,
  itemId: 0,
  lock: "free",
  cover: 0,
  stock: 0,
  recoverAt: 0,
  cooling: false,
  produced: 0,
  uses: 0,
  autoStock: 0,
  autoAt: 0,
  autoUses: 0,
});

function makeCell(itemId, id, lock = "free", cover = 0) {
  if (!itemId) return blank(id);
  const rule = ITEM_RULES[itemId];
  if (!rule) throw new Error(`未收录的物品规则 ${itemId}`);
  return {
    id,
    itemId,
    lock,
    cover,
    stock: rule.initialStock,
    recoverAt: 0,
    cooling: false,
    produced: 0,
    uses: rule.uses,
    autoStock: rule.autoInitial,
    autoAt: 0,
    autoUses: rule.autoUses,
  };
}

function normaliseState(value) {
  if (!value || typeof value !== "object") return value;
  for (const cells of [value.board, value.rescueBoard, value.bag]) {
    if (!Array.isArray(cells)) continue;
    for (const cell of cells) {
      if (!cell || typeof cell !== "object") continue;
      const rule = ITEM_RULES[cell.itemId];
      if (cell.autoStock === undefined) cell.autoStock = rule?.autoInitial || 0;
      if (cell.autoAt === undefined) cell.autoAt = 0;
      if (cell.autoUses === undefined) cell.autoUses = rule?.autoUses || 0;
    }
  }
  return value;
}

function parseBoard(matrix) {
  return matrix.flat().map((text, id) => {
    const [itemId, state, cover] = text.split(":").map(Number);
    return makeCell(
      itemId,
      id,
      state === 3 ? "box" : state === 1 ? "web" : "free",
      cover || 0,
    );
  });
}

export function createInitialState(time = Date.now()) {
  return {
    version: SAVE_VERSION,
    board: parseBoard(INITIAL_BOARD),
    rescueBoard: parseBoard(RESCUE_BOARD),
    resources: { energy: 100, coin: 0, diamond: 20, star: 0 },
    energyAt: 0,
    level: 1,
    exp: 0,
    bag: [],
    bagCapacity: 5,
    channel: [],
    completedOrders: [],
    completedBuilds: [],
    decorations: [],
    discovered: [1001, 11001, 11011],
    story: {
      phase: "intro",
      dialogue: "intro",
      line: 0,
      rescueStage: 0,
      seen: [],
      queue: [],
      chapterComplete: false,
    },
    shop: { day: "", bought: {} },
    stats: { merges: 0, produced: 0, delivered: 0, repaired: 0 },
    createdAt: time,
    updatedAt: time,
    lastTick: time,
  };
}

/** Validate imported saves before replacing the current game. Old game save keys are never read. */
export function validateState(value) {
  const error = (message) => {
    throw new Error(message);
  };
  if (!value || value.version !== SAVE_VERSION) error("存档版本不兼容");
  const validateCell = (cell, index, bag = false) => {
    if (!cell || !safeInt(cell.id) || (!bag && cell.id !== index))
      error("棋盘格索引无效");
    if (!safeInt(cell.itemId) || (cell.itemId && !ITEM_RULES[cell.itemId]))
      error("存档含有未知物品");
    if (
      !["free", "web", "box"].includes(cell.lock) ||
      (bag && cell.lock !== "free")
    )
      error("物品遮挡状态无效");
    if (
      ![cell.stock, cell.produced, cell.uses, cell.cover].every((n) =>
        safeInt(n),
      ) ||
      !safeInt(cell.recoverAt, 0, Number.MAX_SAFE_INTEGER)
    )
      error("物品数值无效");
    if (typeof cell.cooling !== "boolean") error("物品冷却状态无效");
    if (
      !safeInt(cell.autoStock) ||
      !safeInt(cell.autoUses) ||
      !safeInt(cell.autoAt, 0, Number.MAX_SAFE_INTEGER)
    )
      error("自动备料数值无效");
    const rule = ITEM_RULES[cell.itemId];
    if (
      rule &&
      (cell.stock > Math.max(rule.maxStock, rule.mergeMax || 0) ||
        cell.uses > rule.uses)
    )
      error("物品库存超过上限");
    if (
      rule &&
      (cell.autoStock > rule.autoMax || cell.autoUses > rule.autoUses)
    )
      error("自动备料库存超过上限");
    if (
      !cell.itemId &&
      (cell.lock !== "free" ||
        cell.stock ||
        cell.uses ||
        cell.autoStock ||
        cell.autoAt ||
        cell.autoUses)
    )
      error("空格状态无效");
  };
  if (!Array.isArray(value.board) || value.board.length !== 63)
    error("主棋盘应为9×7格");
  if (!Array.isArray(value.rescueBoard) || value.rescueBoard.length !== 28)
    error("救援棋盘应为4×7格");
  value.board.forEach((cell, index) => validateCell(cell, index));
  value.rescueBoard.forEach((cell, index) => validateCell(cell, index));
  if (
    !value.resources ||
    !["energy", "coin", "diamond", "star"].every((key) =>
      safeInt(value.resources[key]),
    )
  )
    error("资源数值无效");
  if (
    !safeInt(value.energyAt, 0, Number.MAX_SAFE_INTEGER) ||
    !safeInt(value.level, 1, LEVEL_RULES.length) ||
    !safeInt(value.exp)
  )
    error("等级或恢复时间无效");
  if (
    !safeInt(value.bagCapacity, 5, 30) ||
    !Array.isArray(value.bag) ||
    value.bag.length > value.bagCapacity
  )
    error("仓库容量无效");
  value.bag.forEach((cell, index) => {
    validateCell(cell, index, true);
    if (!cell.itemId) error("仓库存在空物品");
  });
  if (
    !Array.isArray(value.channel) ||
    value.channel.length > 5000 ||
    !value.channel.every((id) => safeInt(id, 1) && ITEM_RULES[id])
  )
    error("领取队列无效");
  for (const [key, rules] of [
    ["completedOrders", ORDER_RULES],
    ["completedBuilds", BUILD_RULES],
  ]) {
    if (
      !Array.isArray(value[key]) ||
      new Set(value[key]).size !== value[key].length ||
      !value[key].every((id) => rules.some((rule) => rule.id === id))
    )
      error("任务完成记录无效");
  }
  if (
    !Array.isArray(value.decorations) ||
    !value.decorations.every((id) => /^Adorn\d+$/.test(id))
  )
    error("修缮外观记录无效");
  if (
    !Array.isArray(value.discovered) ||
    !value.discovered.every((id) => ITEM_RULES[id])
  )
    error("图鉴记录无效");
  const story = value.story;
  if (
    !story ||
    !["intro", "rescue", "main"].includes(story.phase) ||
    !safeInt(story.rescueStage, 0, 3) ||
    !safeInt(story.line)
  )
    error("剧情进度无效");
  if (story.dialogue !== null && !Array.isArray(DIALOGUES[story.dialogue]))
    error("剧情片段无效");
  if (story.dialogue && story.line >= DIALOGUES[story.dialogue].length)
    error("剧情台词进度无效");
  if (
    !Array.isArray(story.seen) ||
    !story.seen.every((id) => Array.isArray(DIALOGUES[id])) ||
    !Array.isArray(story.queue) ||
    !story.queue.every((id) => DIALOGUES[id]?.length)
  )
    error("剧情队列无效");
  if (
    typeof story.chapterComplete !== "boolean" ||
    (story.phase === "main" && story.rescueStage !== 3) ||
    (story.phase === "rescue" && story.rescueStage === 3) ||
    (story.phase === "intro" && story.rescueStage !== 0)
  )
    error("章节进度无效");
  if (
    !value.shop ||
    typeof value.shop.day !== "string" ||
    !value.shop.bought ||
    !Object.values(value.shop.bought).every((n) => safeInt(n, 0, 100))
  )
    error("行商购买记录无效");
  if (
    !value.stats ||
    !["merges", "produced", "delivered", "repaired"].every((key) =>
      safeInt(value.stats[key]),
    )
  )
    error("经营统计无效");
  if (
    ![value.createdAt, value.updatedAt, value.lastTick].every((n) =>
      safeInt(n, 0, Number.MAX_SAFE_INTEGER),
    )
  )
    error("存档时间无效");
  return true;
}

/** Offline gameplay. All indices are zero based. Every successful action persists automatically. */
export function createGame(options = {}) {
  const now = options.now || Date.now;
  const random = options.random || Math.random;
  const storageKey = options.storageKey || SAVE_KEY;
  let storage = options.storage;
  if (storage === undefined) {
    try {
      storage = globalThis.localStorage;
    } catch {
      storage = null;
    }
  }
  let state = createInitialState(Math.max(0, Math.floor(now())));
  let loadWarning = "";
  let saveWarning = "";
  try {
    const raw = storage?.getItem(storageKey);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.format !== "jianghu-bufang" || parsed.version !== SAVE_VERSION)
        throw new Error("这不是江湖布坊的独立存档");
      normaliseState(parsed.state);
      validateState(parsed.state);
      state = clone(parsed.state);
    }
  } catch (error) {
    loadWarning = `存档未载入：${error.message}`;
  }

  const time = () => Math.max(state.lastTick, Math.max(0, Math.floor(now())));
  const board = () =>
    state.story.phase === "rescue" ? state.rescueBoard : state.board;
  const discover = (id) => {
    if (id && !state.discovered.includes(id)) state.discovered.push(id);
  };
  const persist = () => {
    const text = JSON.stringify({
      format: "jianghu-bufang",
      version: SAVE_VERSION,
      state,
    });
    try {
      storage?.setItem(storageKey, text);
      saveWarning = "";
    } catch {
      saveWarning = "浏览器未能保存进度，请导出存档备份。";
    }
    return text;
  };
  const notify = (result) => {
    state.updatedAt = time();
    persist();
    options.onChange?.(state, result);
    return result;
  };
  const queueDialogue = (key) => {
    if (
      !DIALOGUES[key]?.length ||
      state.story.seen.includes(key) ||
      state.story.dialogue === key ||
      state.story.queue.includes(key)
    )
      return;
    if (state.story.dialogue) state.story.queue.push(key);
    else {
      state.story.dialogue = key;
      state.story.line = 0;
    }
  };
  const neighbours = (index, length = board().length) => {
    const result = [];
    const row = Math.floor(index / 7),
      col = index % 7;
    for (const [dr, dc] of [
      [-1, 0],
      [0, -1],
      [0, 1],
      [1, 0],
    ]) {
      const r = row + dr,
        c = col + dc;
      if (r >= 0 && r < length / 7 && c >= 0 && c < 7) result.push(r * 7 + c);
    }
    return result;
  };
  const emptyIndices = (cells = board(), origin = 31) =>
    cells
      .filter((cell) => !cell.itemId && cell.lock === "free")
      .map((cell) => cell.id)
      .sort((a, b) => {
        const distance = (i) =>
          Math.abs(Math.floor(i / 7) - Math.floor(origin / 7)) +
          Math.abs((i % 7) - (origin % 7));
        return distance(a) - distance(b) || a - b;
      });

  function refreshTimers() {
    const current = time();
    let changed = false;
    if (state.resources.energy < ENERGY_MAX) {
      if (!state.energyAt) {
        state.energyAt = current + ENERGY_INTERVAL;
        changed = true;
      }
      if (current >= state.energyAt) {
        const recovered =
          Math.floor((current - state.energyAt) / ENERGY_INTERVAL) + 1;
        state.resources.energy = Math.min(
          ENERGY_MAX,
          state.resources.energy + recovered,
        );
        state.energyAt =
          state.resources.energy >= ENERGY_MAX
            ? 0
            : state.energyAt + recovered * ENERGY_INTERVAL;
        changed = true;
      }
    } else if (state.energyAt) {
      state.energyAt = 0;
      changed = true;
    }
    for (const cell of [...state.board, ...state.rescueBoard, ...state.bag]) {
      const rule = ITEM_RULES[cell.itemId];
      if (!rule?.interval || !cell.recoverAt) continue;
      if (cell.stock >= rule.maxStock) {
        cell.recoverAt = 0;
        changed = true;
        continue;
      }
      if (current >= cell.recoverAt) {
        const recovered =
          Math.floor((current - cell.recoverAt) / (rule.interval * 1000)) + 1;
        cell.stock = Math.min(rule.maxStock, cell.stock + recovered);
        cell.recoverAt =
          cell.stock >= rule.maxStock
            ? 0
            : cell.recoverAt + recovered * rule.interval * 1000;
        if (cell.stock >= rule.initialStock) cell.cooling = false;
        changed = true;
      }
    }
    const activeBoard = board();
    for (const cell of [...activeBoard, ...state.bag]) {
      const rule = ITEM_RULES[cell.itemId];
      if (
        !rule?.autoDrops.length ||
        cell.lock !== "free" ||
        state.story.phase === "intro"
      )
        continue;
      const onBoard = activeBoard[cell.id] === cell;
      const spaces = onBoard
        ? neighbours(cell.id, activeBoard.length).filter(
            (index) => !activeBoard[index].itemId,
          )
        : [];
      if (cell.autoStock < rule.autoMax && !cell.autoAt)
        cell.autoAt = current + rule.autoInterval * 1000;
      if (cell.autoAt && current >= cell.autoAt) {
        const recovered =
          Math.floor((current - cell.autoAt) / (rule.autoInterval * 1000)) + 1;
        cell.autoStock = Math.min(
          rule.autoMax + spaces.length,
          cell.autoStock + recovered,
        );
        cell.autoAt += recovered * rule.autoInterval * 1000;
        changed = true;
      }
      for (const index of spaces) {
        if (!cell.autoStock) break;
        const total = rule.autoDrops.reduce(
          (sum, drop) => sum + drop.weight,
          0,
        );
        let point =
          Math.max(0, Math.min(0.999999999, Number(random()) || 0)) * total;
        const drop =
          rule.autoDrops.find((drop) => {
            point -= drop.weight;
            return point < 0;
          }) || rule.autoDrops.at(-1);
        activeBoard[index] = makeCell(drop.id, index);
        discover(drop.id);
        cell.autoStock--;
        state.stats.produced++;
        changed = true;
        if (rule.autoUses) {
          cell.autoUses--;
          if (!cell.autoUses) {
            activeBoard[cell.id] = rule.autoVanishTo
              ? makeCell(rule.autoVanishTo, cell.id)
              : blank(cell.id);
            break;
          }
        }
      }
      cell.autoStock = Math.min(rule.autoMax, cell.autoStock);
      if (cell.autoStock >= rule.autoMax) cell.autoAt = 0;
      else if (!cell.autoAt) cell.autoAt = current + rule.autoInterval * 1000;
    }
    state.lastTick = current;
    return changed;
  }

  function addReward(reward, events) {
    for (const [key, value] of Object.entries(reward || {})) {
      const count = Number(value);
      if (!Number.isFinite(count) || count <= 0) continue;
      if (RESOURCE_KEYS[key]) state.resources[RESOURCE_KEYS[key]] += count;
      else if (key === "Exp") state.exp += count;
      else if (/^Adorn\d+$/.test(key)) {
        if (!state.decorations.includes(key)) state.decorations.push(key);
      } else if (ITEM_RULES[key]) {
        for (let n = 0; n < count; n++) state.channel.push(Number(key));
      }
    }
    while (state.level < LEVEL_RULES.length) {
      const previous = LEVEL_RULES[state.level - 1],
        next = LEVEL_RULES[state.level];
      const needed = next.totalExp - previous.totalExp;
      if (state.exp < needed) break;
      state.exp -= needed;
      state.level++;
      events.push({ type: "level", level: state.level });
      addReward(next.reward, events);
    }
    if (state.resources.energy >= ENERGY_MAX) state.energyAt = 0;
  }

  const allowed = (mainOnly = false) => {
    if (state.story.dialogue) return fail("请先读完当前对话。");
    if (state.story.phase === "intro") return fail("请先进入布坊。");
    if (mainOnly && state.story.phase !== "main")
      return fail("先与阿蘅一起护住雨中的布料。");
    return null;
  };
  function run(action, mainOnly = false) {
    const recovered = refreshTimers();
    const blocked = allowed(mainOnly);
    if (blocked) {
      if (recovered) notify(blocked);
      return blocked;
    }
    const result = action();
    if (result.ok || recovered) return notify(result);
    return result;
  }
  const condition = (text) => {
    if (text === "UnlockDrawer996" || text === "UnlockArea1") return true;
    if (text.startsWith("FinishOrder"))
      return state.completedOrders.includes(Number(text.slice(11)));
    if (text.startsWith("FinishBuild"))
      return state.completedBuilds.includes(Number(text.slice(11)));
    return false;
  };
  const available = (rule) => rule.conditions.every(condition);
  const inventoryCount = (id) =>
    [...state.board, ...state.bag].filter(
      (cell) => cell.itemId === id && cell.lock === "free",
    ).length;
  const requirements = (demand) =>
    Object.entries(demand).map(([id, need]) => ({
      itemId: Number(id),
      need,
      have: inventoryCount(Number(id)),
    }));
  function consumeItems(demand) {
    for (const [id, quantity] of Object.entries(demand)) {
      let remaining = quantity;
      for (let index = 0; index < state.board.length && remaining; index++) {
        const cell = state.board[index];
        if (cell.itemId === Number(id) && cell.lock === "free") {
          state.board[index] = blank(index);
          remaining--;
        }
      }
      for (let index = state.bag.length - 1; index >= 0 && remaining; index--) {
        if (state.bag[index].itemId === Number(id)) {
          state.bag.splice(index, 1);
          remaining--;
        }
      }
    }
  }
  function checkChapter(events) {
    if (
      !state.story.chapterComplete &&
      state.completedOrders.length === ORDER_RULES.length &&
      state.completedBuilds.length === BUILD_RULES.length
    ) {
      state.story.chapterComplete = true;
      queueDialogue("chapterComplete");
      events.push({ type: "chapterComplete" });
    }
  }
  function getItem(id) {
    const rule = ITEM_RULES[id];
    if (!rule)
      return {
        id: 0,
        name: "空格",
        description: "",
        rank: 0,
        iconKey: "empty",
      };
    return {
      ...rule,
      ...getItemContent(Number(id)),
      id: Number(id),
      ruleSeries: rule.series,
      // The recovered bag upgrade uses canLevelUp:[901], rather than propEffect.
      prop: Number(id) === 99901 ? 901 : rule.prop,
      isProducer: rule.drops.length > 0,
      isCollectible: Object.keys(rule.collect).length > 0,
      isAutoProducer: rule.autoDrops.length > 0,
    };
  }
  function getOrders({ all = false } = {}) {
    return ORDER_RULES.map((rule) => {
      const missing = requirements(rule.demand);
      const completed = state.completedOrders.includes(rule.id);
      const unlocked = available(rule);
      return {
        ...rule,
        ...getOrderContent(rule.id),
        completed,
        available: unlocked,
        ready:
          !completed &&
          unlocked &&
          missing.every((item) => item.have >= item.need),
        missing,
      };
    }).filter((order) => all || (!order.completed && order.available));
  }
  function getBuilds() {
    return BUILD_RULES.map((rule) => {
      const completed = state.completedBuilds.includes(rule.id);
      const unlocked = available(rule);
      return {
        ...rule,
        ...getBuildContent(rule.id),
        completed,
        available: unlocked,
        ready:
          !completed &&
          unlocked &&
          state.resources.star >= (rule.demand.Star || 0),
      };
    });
  }
  function cooldownMs(cell) {
    const rule = ITEM_RULES[cell?.itemId];
    if (!rule || !cell.recoverAt) return 0;
    return Math.max(
      0,
      cell.recoverAt -
        time() +
        (cell.cooling
          ? Math.max(0, rule.initialStock - cell.stock - 1) *
            rule.interval *
            1000
          : 0),
    );
  }

  const game = {
    get state() {
      return state;
    },
    get loadWarning() {
      return loadWarning;
    },
    get saveWarning() {
      return saveWarning;
    },
    get storageKey() {
      return storageKey;
    },
    getBoard: board,
    getBoardSize: () => ({
      rows: state.story.phase === "rescue" ? 4 : 9,
      cols: 7,
    }),
    getItem,
    getOrders,
    getBuilds,
    getBagExpansionCost: () => 100 + (state.bagCapacity - 5) * 75,
    getStoryLog() {
      return state.story.seen.map((key) => ({
        key,
        title: key.startsWith("order_")
          ? getOrderContent(Number(key.slice(6))).title
          : key.startsWith("build_")
            ? getBuildContent(Number(key.slice(6))).title
            : {
                intro: "雨夜归坊",
                rescue1: "护住客料",
                rescue2: "稳住棚梁",
                rescue3: "雨篷留灯",
                afterRescue: "旧匣残页",
                firstOrder: "第一张客笺",
                firstBuild: "修整前柜",
                toolUpgrade: "理好旧匣",
                chapterComplete: "灯下归人",
              }[key] || "坊中旧事",
        lines: clone(DIALOGUES[key] || []),
      }));
    },
    getLevelProgress() {
      const next = LEVEL_RULES[state.level];
      return {
        level: state.level,
        exp: state.exp,
        needed: next
          ? next.totalExp - LEVEL_RULES[state.level - 1].totalExp
          : 0,
        nextReward: next?.reward || {},
      };
    },
    getDialogue() {
      const key = state.story.dialogue;
      const lines = DIALOGUES[key];
      return lines
        ? {
            ...lines[state.story.line],
            scene: key,
            line: state.story.line,
            total: lines.length,
          }
        : null;
    },
    nextDialogue() {
      const key = state.story.dialogue;
      if (!key || !DIALOGUES[key]) return fail("当前没有对话。");
      if (state.story.line + 1 < DIALOGUES[key].length) state.story.line++;
      else {
        state.story.seen.push(key);
        state.story.dialogue = null;
        state.story.line = 0;
        if (key === "intro") {
          state.story.phase = "rescue";
          queueDialogue("rescue1");
        }
        if (!state.story.dialogue && state.story.queue.length)
          state.story.dialogue = state.story.queue.shift();
      }
      return notify(ok("", [{ type: "dialogue" }]));
    },
    move(from, to) {
      return run(() => {
        const cells = board();
        if (
          !safeInt(from, 0, cells.length - 1) ||
          !safeInt(to, 0, cells.length - 1) ||
          from === to
        )
          return fail("请选择不同的棋盘格。");
        const source = cells[from],
          target = cells[to];
        if (!source.itemId || source.lock !== "free")
          return fail("先解开布封，才能移动这件物品。");
        if (target.lock === "box")
          return fail("先在相邻位置合成，拆开木箱，再用同阶物品解开布封。");
        const next = ITEM_RULES[source.itemId].next;
        if (target.itemId === source.itemId && next) {
          if (
            state.story.phase === "rescue" &&
            ITEM_RULES[source.itemId].series === "Scene_2" &&
            source.itemId >= RESCUE_TARGETS[state.story.rescueStage]
          ) {
            return fail(
              `先用${getItem(RESCUE_TARGETS[state.story.rescueStage]).name}完成眼前的护坊事项。`,
            );
          }
          cells[from] = blank(from);
          cells[to] = makeCell(next, to);
          const nextRule = ITEM_RULES[next];
          if (ITEM_RULES[source.itemId].drops.length && nextRule.drops.length) {
            if (nextRule.uses) {
              // Upgrading a partly opened chest keeps the taps already spent.
              const used =
                ITEM_RULES[source.itemId].maxStock -
                source.stock +
                ITEM_RULES[target.itemId].maxStock -
                target.stock;
              cells[to].stock = Math.max(0, nextRule.initialStock - used);
              cells[to].uses = Math.min(nextRule.uses, cells[to].stock);
            } else {
              // q6 carries surplus stock into the upgraded producer, up to elementMaxStorage.
              const sum = source.stock + target.stock;
              if (sum > nextRule.initialStock)
                cells[to].stock = Math.min(
                  sum,
                  nextRule.mergeMax || nextRule.maxStock,
                );
            }
          }
          if (
            nextRule.autoDrops.length &&
            ITEM_RULES[source.itemId].autoDrops.length
          )
            cells[to].autoStock = Math.min(
              nextRule.autoMax,
              source.autoStock + target.autoStock,
            );
          discover(next);
          const revealed = [];
          for (const index of neighbours(to, cells.length)) {
            if (cells[index].lock === "box") {
              cells[index].lock = "web";
              revealed.push(index);
            }
          }
          const events = [{ type: "merge", from, to, itemId: next, revealed }];
          const extra = ITEM_RULES[next].extra;
          if (extra && ITEM_RULES[extra]) {
            const index = emptyIndices(cells, to)[0];
            if (index !== undefined) cells[index] = makeCell(extra, index);
          }
          state.stats.merges++;
          if (state.story.phase === "main" && next === 1005)
            queueDialogue("toolUpgrade");
          return ok(`合成了${getItem(next).name}。`, events);
        }
        if (target.lock === "web")
          return fail("布封物品只能与相同阶的物品合成解锁。");
        cells[to] = { ...source, id: to };
        cells[from] = { ...target, id: from };
        return ok("", [{ type: target.itemId ? "swap" : "move", from, to }]);
      });
    },
    produce(index) {
      return run(() => {
        const cells = board(),
          cell = cells[index],
          rule = ITEM_RULES[cell?.itemId];
        if (!cell || cell.lock !== "free" || !rule?.drops.length)
          return fail("这件物品不能产出材料。");
        if (cell.cooling || cell.stock <= 0)
          return fail(
            rule.interval
              ? "工具正在备料，库存恢复后可继续使用。"
              : "这份备料已经用尽。",
          );
        if (state.resources.energy < rule.energy)
          return fail("精力不足，稍作歇息或到行商处买一盏清茶。");
        let itemId,
          count = 1;
        if (cell.produced < rule.sequence.length)
          itemId = rule.sequence[cell.produced];
        else {
          const total = rule.drops.reduce((sum, drop) => sum + drop.weight, 0);
          let point =
            Math.max(0, Math.min(0.999999999, Number(random()) || 0)) * total;
          const drop =
            rule.drops.find((drop) => {
              point -= drop.weight;
              return point < 0;
            }) || rule.drops.at(-1);
          itemId = drop.id;
          count = drop.count;
        }
        const spaces = emptyIndices(cells, index);
        if (spaces.length < count)
          return fail("棋盘已满，请先合成、交单或将物品收入仓库。");
        state.resources.energy -= rule.energy;
        if (state.resources.energy < ENERGY_MAX && !state.energyAt)
          state.energyAt = time() + ENERGY_INTERVAL;
        cell.stock--;
        cell.produced++;
        state.stats.produced += count;
        if (rule.interval && cell.stock < rule.maxStock && !cell.recoverAt)
          cell.recoverAt = time() + rule.interval * 1000;
        if (rule.interval && cell.stock >= rule.maxStock) cell.recoverAt = 0;
        if (cell.stock <= 0 && rule.interval) cell.cooling = true;
        const spawned = spaces.slice(0, count);
        for (const space of spawned) cells[space] = makeCell(itemId, space);
        discover(itemId);
        if (rule.uses) {
          cell.uses--;
          if (!cell.uses)
            cells[index] = rule.vanishTo
              ? makeCell(rule.vanishTo, index)
              : blank(index);
        }
        return ok(`取得${getItem(itemId).name}。`, [
          { type: "produce", index, spawned, itemId },
        ]);
      });
    },
    useRescue(index) {
      return run(() => {
        if (state.story.phase !== "rescue") return fail("当前不在护坊场景。");
        const target = RESCUE_TARGETS[state.story.rescueStage],
          cell = state.rescueBoard[index];
        if (!cell || cell.lock !== "free" || cell.itemId !== target)
          return fail(`请合成并选中${getItem(target).name}。`);
        state.rescueBoard[index] = blank(index);
        state.story.rescueStage++;
        if (state.story.rescueStage === 3) {
          state.story.phase = "main";
          queueDialogue("afterRescue");
        } else queueDialogue(`rescue${state.story.rescueStage + 1}`);
        return ok(
          ["已护住布料。", "已加固梁柱。", "雨篷已经架好，布坊保住了。"][
            state.story.rescueStage - 1
          ],
          [{ type: "rescue", stage: state.story.rescueStage }],
        );
      });
    },
    submitOrder(id) {
      return run(() => {
        const rule = ORDER_RULES.find((order) => order.id === Number(id));
        if (
          !rule ||
          state.completedOrders.includes(rule.id) ||
          !available(rule)
        )
          return fail("这份委托尚未开启或已经交付。");
        if (requirements(rule.demand).some((item) => item.have < item.need))
          return fail("所需物品还未备齐，布封中的材料需要先解锁。");
        consumeItems(rule.demand);
        state.completedOrders.push(rule.id);
        state.stats.delivered++;
        const events = [{ type: "order", id: rule.id }];
        addReward(rule.reward, events);
        queueDialogue(rule.id === 1001 ? "firstOrder" : `order_${rule.id}`);
        checkChapter(events);
        return ok(
          getOrderContent(rule.id).completion || "委托已交付，获得了修缮券。",
          events,
        );
      }, true);
    },
    build(id) {
      return run(() => {
        const rule = BUILD_RULES.find((build) => build.id === Number(id));
        if (
          !rule ||
          state.completedBuilds.includes(rule.id) ||
          !available(rule)
        )
          return fail("这项修缮尚未开启或已经完成。");
        if (state.resources.star < (rule.demand.Star || 0))
          return fail("修缮券不足，请先完成客人的委托。");
        state.resources.star -= rule.demand.Star || 0;
        state.completedBuilds.push(rule.id);
        state.stats.repaired++;
        const events = [{ type: "build", id: rule.id }];
        addReward(rule.reward, events);
        queueDialogue(rule.id === 10001 ? "firstBuild" : `build_${rule.id}`);
        checkChapter(events);
        return ok(
          getBuildContent(rule.id).completion ||
            "修缮完成，奖励已放入待领物品。",
          events,
        );
      }, true);
    },
    claimChannel(slot = 0) {
      return run(() => {
        if (!safeInt(slot, 0, state.channel.length - 1))
          return fail("暂无待领物品。");
        const index = emptyIndices(state.board)[0];
        if (index === undefined) return fail("棋盘已满，请先腾出一格。");
        const [id] = state.channel.splice(slot, 1);
        state.board[index] = makeCell(id, index);
        discover(id);
        return ok(`已领取${getItem(id).name}。`, [
          { type: "claim", index, itemId: id },
        ]);
      }, true);
    },
    collect(index) {
      return run(() => {
        const cells = board(),
          cell = cells[index],
          rule = ITEM_RULES[cell?.itemId];
        if (
          !cell ||
          cell.lock !== "free" ||
          !rule ||
          !Object.keys(rule.collect).length
        )
          return fail("这件物品不能直接领取资源。");
        const events = [{ type: "collect", index, itemId: cell.itemId }];
        addReward(rule.collect, events);
        cells[index] = blank(index);
        return ok("资源已收好。", events);
      });
    },
    store(index) {
      return run(() => {
        if (state.level < 5) return fail("布坊达到5级后可使用仓库。");
        const cell = state.board[index],
          rule = ITEM_RULES[cell?.itemId];
        if (!cell?.itemId || cell.lock !== "free" || rule.noBag)
          return fail("这件物品暂时不能收入仓库。");
        if (state.bag.length >= state.bagCapacity) return fail("仓库已满。");
        state.bag.push(clone(cell));
        state.board[index] = blank(index);
        return ok("已收入仓库。", [{ type: "store", index }]);
      }, true);
    },
    withdraw(slot, targetIndex) {
      return run(() => {
        if (!safeInt(slot, 0, state.bag.length - 1))
          return fail("请选择仓库中的物品。");
        const index =
          targetIndex === undefined
            ? emptyIndices(state.board)[0]
            : targetIndex;
        if (!safeInt(index, 0, 62) || state.board[index].itemId)
          return fail("棋盘上需要一个空格。");
        const [cell] = state.bag.splice(slot, 1);
        state.board[index] = { ...cell, id: index };
        return ok("已取出物品。", [{ type: "withdraw", index }]);
      }, true);
    },
    sell(index) {
      return run(() => {
        if (state.level < 2) return fail("布坊达到2级后可出售物品。");
        const cell = state.board[index],
          rule = ITEM_RULES[cell?.itemId];
        if (!cell?.itemId || cell.lock !== "free" || !rule.sell)
          return fail("这件物品不能出售。");
        const producers = [...state.board, ...state.bag].filter(
          (item) =>
            item.lock === "free" &&
            ITEM_RULES[item.itemId]?.series === rule.series &&
            ITEM_RULES[item.itemId]?.drops.length &&
            !ITEM_RULES[item.itemId].uses,
        );
        if (rule.drops.length && !rule.uses && producers.length <= 1)
          return fail("请留下至少一件此类制具，后续客笺仍需它备料。");
        if (
          /^[A-I]_0$/.test(rule.series) &&
          !rule.drops.length &&
          !producers.length
        )
          return fail("请保留这份制具零件，先拼成能备料的工具。");
        state.resources.coin += rule.sell;
        state.board[index] = blank(index);
        return ok(`出售获得${rule.sell}铜钱。`, [{ type: "sell", index }]);
      }, true);
    },
    expandBag() {
      return run(() => {
        if (state.level < 5) return fail("布坊达到5级后可扩建仓库。");
        if (state.bagCapacity >= 30) return fail("仓库已经扩建至上限。");
        const cost = 100 + (state.bagCapacity - 5) * 75;
        if (state.resources.coin < cost)
          return fail(`扩建一格仓库需要${cost}铜钱。`);
        state.resources.coin -= cost;
        state.bagCapacity++;
        return ok("仓库增加了一格。", [
          { type: "bagCapacity", capacity: state.bagCapacity },
        ]);
      }, true);
    },
    getShop() {
      const day = String(Math.floor((time() + 8 * 3600_000) / 86400_000));
      return SHOP.map((item) => ({
        ...clone(item),
        bought: state.shop.day === day ? state.shop.bought[item.id] || 0 : 0,
        unlocked: state.level >= 3,
      }));
    },
    buyShop(id) {
      return run(() => {
        if (state.level < 3) return fail("布坊达到3级后行商才会前来。");
        const item = SHOP.find((item) => item.id === id);
        if (!item) return fail("没有这件货品。");
        const day = String(Math.floor((time() + 8 * 3600_000) / 86400_000));
        const bought = state.shop.day === day ? state.shop.bought[id] || 0 : 0;
        if (bought >= item.limit)
          return fail("今日这件货品已经售罄，明日再来。");
        if (
          Object.entries(item.cost).some(
            ([key, cost]) => state.resources[key] < cost,
          )
        )
          return fail("铜钱或玉钱不足。");
        if (id === "energy" && state.resources.energy >= ENERGY_MAX)
          return fail("精力已经充足，先忙一会儿再喝茶。");
        for (const [key, cost] of Object.entries(item.cost))
          state.resources[key] -= cost;
        if (state.shop.day !== day) state.shop = { day, bought: {} };
        state.shop.bought[id] = bought + 1;
        const events = [{ type: "shop", id }];
        addReward(item.reward, events);
        return ok(`${item.title}已购得。`, events);
      }, true);
    },
    useProp(index, targetIndex) {
      return run(() => {
        const cell = state.board[index],
          effect =
            PROP_RULES[
              cell?.itemId === 99901 ? 901 : ITEM_RULES[cell?.itemId]?.prop
            ];
        if (!cell?.itemId || cell.lock !== "free" || !effect)
          return fail("这件物品没有可使用的功效。");
        if (effect.effectType === 9) {
          if (state.bagCapacity >= 30) return fail("仓库已达到上限。");
          state.bagCapacity = Math.min(
            30,
            state.bagCapacity + effect.effectValue,
          );
        } else if ([4, 8].includes(effect.effectType)) {
          const targets = [...state.board, ...state.bag].filter(
            (item) => item.recoverAt > 0 || item.autoAt > 0,
          );
          if (!targets.length) return fail("当前没有正在备料的工具。");
          for (const target of targets) {
            if (target.recoverAt > 0)
              target.recoverAt = Math.max(
                1,
                target.recoverAt - effect.effectValue * 1000,
              );
            if (target.autoAt > 0)
              target.autoAt = Math.max(
                1,
                target.autoAt - effect.effectValue * 1000,
              );
          }
          refreshTimers();
        } else if (effect.effectType === 2) {
          const target = state.board[targetIndex],
            rule = ITEM_RULES[target?.itemId];
          if (
            !target ||
            targetIndex === index ||
            target.lock !== "free" ||
            !rule?.drops.length ||
            !rule.interval
          )
            return fail("请选择一件正在备料的工具作为目标。");
          if (target.stock >= rule.maxStock)
            return fail("这件工具的库存已经充足。");
          target.stock = Math.min(
            rule.maxStock,
            target.stock + effect.effectValue,
          );
          if (target.stock >= rule.initialStock) target.cooling = false;
          if (target.stock >= rule.maxStock) target.recoverAt = 0;
        } else return fail("这件道具暂时不能在当前场景使用。");
        state.board[index] = blank(index);
        return ok("道具已生效。", [{ type: "prop", index, targetIndex }]);
      }, true);
    },
    detail(index) {
      const cell = board()[index];
      if (!cell?.itemId) return null;
      const item = getItem(cell.itemId);
      return {
        ...item,
        cell: clone(cell),
        cooldownMs: cooldownMs(cell),
        autoCooldownMs: Math.max(0, cell.autoAt - time()),
        chain: Object.values(ITEM_RULES)
          .filter((rule) => rule.series === ITEM_RULES[item.id].series)
          .sort((a, b) => a.rank - b.rank)
          .map((rule) => ({
            ...getItem(rule.id),
            discovered: state.discovered.includes(rule.id),
          })),
        sources: Object.values(ITEM_RULES)
          .filter((rule) =>
            [...rule.drops, ...rule.autoDrops].some(
              (drop) => drop.id === item.id,
            ),
          )
          .map((rule) => ({ id: rule.id, name: getItem(rule.id).name })),
        canProduce: cell.lock === "free" && item.isProducer,
        canCollect: cell.lock === "free" && item.isCollectible,
        canSell:
          state.story.phase === "main" &&
          state.level >= 2 &&
          cell.lock === "free" &&
          item.sell > 0,
        canStore:
          state.story.phase === "main" &&
          state.level >= 5 &&
          cell.lock === "free" &&
          !item.noBag,
        canRescue:
          state.story.phase === "rescue" &&
          cell.lock === "free" &&
          cell.itemId === RESCUE_TARGETS[state.story.rescueStage],
      };
    },
    getHint() {
      if (state.story.dialogue)
        return {
          text: "点按对话，听完这段江湖旧事。",
          action: "dialogue",
          indices: [],
        };
      const cells = board();
      if (state.story.phase === "rescue") {
        const target = RESCUE_TARGETS[state.story.rescueStage];
        const ready = cells.find(
          (cell) => cell.lock === "free" && cell.itemId === target,
        );
        if (ready)
          return {
            text: `选中${getItem(target).name}，点“护坊”完成这一处抢修。`,
            action: "rescue",
            indices: [ready.id],
          };
      } else {
        const order = getOrders().find((order) => order.ready);
        if (order)
          return {
            text: `客人的${order.title}已经备齐，可以交付委托。`,
            action: "order",
            orderId: order.id,
            indices: [],
          };
        const build = getBuilds().find((build) => build.ready);
        if (build)
          return {
            text: `修缮券已足够，去修缮“${build.title}”。`,
            action: "build",
            buildId: build.id,
            indices: [],
          };
        if (state.channel.length && emptyIndices(cells).length)
          return {
            text: "下方有待领的工具或奖励，取到棋盘上继续合成。",
            action: "claim",
            indices: [],
          };
      }
      for (const source of cells) {
        if (
          !source.itemId ||
          source.lock !== "free" ||
          !ITEM_RULES[source.itemId].next
        )
          continue;
        const target = cells.find(
          (target) =>
            target.id !== source.id &&
            target.itemId === source.itemId &&
            target.lock !== "box",
        );
        if (target)
          return {
            text: `将${getItem(source.itemId).name}拖到另一件同阶物品上，合成后可拆开相邻木箱。`,
            action: "merge",
            indices: [source.id, target.id],
          };
      }
      const producer = cells.find(
        (cell) =>
          cell.lock === "free" &&
          ITEM_RULES[cell.itemId]?.drops.length &&
          cell.stock > 0 &&
          !cell.cooling,
      );
      if (producer)
        return {
          text: `点按${getItem(producer.itemId).name}取得材料，再将同阶材料合成。每次备料消耗精力。`,
          action: "produce",
          indices: [producer.id],
        };
      const cooling = cells.find(
        (cell) => cell.lock === "free" && cell.cooling,
      );
      if (cooling)
        return {
          text: "工具正在备料，稍作歇息后可继续；可在物品详情中查看剩余时间。",
          action: "wait",
          indices: [cooling.id],
        };
      return {
        text: state.story.chapterComplete
          ? "布坊首章已经完成，仍可继续整理材料、升级工具与经营仓库。"
          : "整理棋盘上的材料，完成委托后用修缮券重整布坊。",
        action: "play",
        indices: [],
      };
    },
    tick() {
      const changed = refreshTimers();
      if (changed) return notify(ok("", [{ type: "recover" }]));
      const result = ok("", [{ type: "clock" }]);
      if (
        state.energyAt ||
        [...state.board, ...state.bag].some(
          (cell) => cell.recoverAt || cell.autoAt,
        )
      )
        options.onChange?.(state, result);
      return result;
    },
    save: persist,
    exportSave: persist,
    importSave(text) {
      try {
        const parsed = JSON.parse(text);
        if (
          parsed.format !== "jianghu-bufang" ||
          parsed.version !== SAVE_VERSION
        )
          return fail("请选择江湖布坊导出的独立存档。");
        normaliseState(parsed.state);
        validateState(parsed.state);
        state = clone(parsed.state);
        loadWarning = "";
        refreshTimers();
        return notify(ok("存档已导入。", [{ type: "import" }]));
      } catch (error) {
        return fail(`存档未导入：${error.message}`);
      }
    },
    reset() {
      state = createInitialState(Math.max(0, Math.floor(now())));
      loadWarning = "";
      return notify(ok("已开始新的布坊故事。", [{ type: "reset" }]));
    },
  };
  refreshTimers();
  persist();
  return game;
}

export default createGame;
