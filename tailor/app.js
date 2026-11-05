import { createGame, RESCUE_TARGETS } from "./engine.js";
import { ITEM_RULES } from "./data.js";
import { META, UI, CHARACTERS, STORY, SERIES } from "./content.js";

const root = document.querySelector("#game");
const overlay = document.querySelector("#overlay");
const toastElement = document.querySelector("#toast");
const escape = (value) =>
  String(value ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const roman = (value) =>
  [
    "",
    "Ⅰ",
    "Ⅱ",
    "Ⅲ",
    "Ⅳ",
    "Ⅴ",
    "Ⅵ",
    "Ⅶ",
    "Ⅷ",
    "Ⅸ",
    "Ⅹ",
    "Ⅺ",
    "Ⅻ",
    "ⅩⅢ",
    "ⅩⅣ",
    "ⅩⅤ",
    "ⅩⅥ",
  ][value] || String(value);
const label = (key) => UI.resources[key === "diamond" ? "gem" : key] || key;
const seconds = (ms) => {
  const s = Math.ceil(ms / 1000);
  return s >= 60 ? `${Math.floor(s / 60)}分${s % 60}秒` : `${s}秒`;
};
const count = (value) =>
  value >= 10000 ? `${(value / 10000).toFixed(1)}万` : String(value);
let art, game;
let selected = -1,
  tab = "board",
  bookMode = "items",
  showHint = false,
  pointer = null,
  suppressClick = false;
let toastTimer,
  modalType = null,
  wardrobeIndex = 0;
try {
  wardrobeIndex = Number(localStorage.getItem("jianghu-bufang-costume") || 0);
} catch {}

function notify(message) {
  if (!message) return;
  toastElement.textContent = message;
  toastElement.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastElement.classList.remove("show"), 3200);
}

function icon(id) {
  const item =
    typeof id === "string" && !/^\d+$/.test(id)
      ? { iconKey: id, rank: 1, id }
      : game.getItem(Number(id));
  const exact = art.itemIcons?.[item.id];
  const entries = art.icons?.[item.iconKey] || art.icons?.fabric || [];
  return (
    exact ||
    (typeof entries === "string"
      ? entries
      : entries[Math.min(Math.max(0, item.rank - 1), entries.length - 1)]) ||
    art.fallbackIcon
  );
}
const img = (id, attrs = "") => {
  if (!art.itemAtlas)
    return `<img src="${escape(icon(id))}" alt="" draggable="false" ${attrs}>`;
  const item =
    typeof id === "string" && !/^\d+$/.test(id)
      ? { iconKey: id, rank: 1, id }
      : game.getItem(Number(id));
  const choices = art.itemSprites[item.iconKey] || [35];
  const index =
    art.itemOverrides?.[id] ??
    choices[Math.min(item.rank - 1, choices.length - 1)];
  return `<span class="item-sprite" aria-hidden="true" style="background-image:url('${escape(art.itemAtlas.src)}');background-size:600% 600%;background-position:${(index % 6) * 20}% ${Math.floor(index / 6) * 20}%" ${attrs}></span>`;
};
function characterImage(id = "keeper") {
  const list = art.characters || [];
  if (id === "keeper") return list[wardrobeIndex]?.src || list[0]?.src || "";
  return (
    art.portraits?.[id] ||
    list[Object.keys(CHARACTERS).indexOf(id) % Math.max(1, list.length)]?.src ||
    list[0]?.src ||
    ""
  );
}
function characterStyle(id = "keeper", costume = null) {
  if (!art.characterAtlas)
    return `background-image:url('${escape(characterImage(id))}')`;
  const index =
    costume !== null
      ? costume
      : id === "keeper"
        ? art.characters[wardrobeIndex]?.sprite || 0
        : (art.characterSprites[id] ?? 0);
  return `background-image:url('${escape(art.characterAtlas.src)}');background-size:300% 200%;background-position:${(index % 3) * 50}% ${Math.floor(index / 3) * 100}%`;
}
const nameOf = (id) => CHARACTERS[id]?.name || id || "";
function rewardText(reward = {}) {
  return Object.entries(reward)
    .filter(([key]) => !/^Adorn/.test(key))
    .map(([key, value]) =>
      /^\d+$/.test(key)
        ? `${game.getItem(Number(key)).name}×${value}`
        : `${label(key.toLowerCase())} +${value}`,
    )
    .join("　");
}

function act(action) {
  const result = action();
  if (!result.ok) notify(result.message);
  return result;
}

function onChange(state, result) {
  const appearance = art.characters[wardrobeIndex];
  if (
    !appearance ||
    state.completedBuilds.length < (appearance.unlockBuilds || 0)
  )
    wardrobeIndex = 0;
  if (
    result.events?.some(
      (event) => event.type === "reset" || event.type === "import",
    )
  ) {
    selected = -1;
    tab = "board";
    closeModal();
  }
  const merge = result.events?.find((event) => event.type === "merge");
  if (result.events?.some((event) => event.type === "rescue")) selected = -1;
  if (merge) selected = merge.to;
  if (selected >= 0 && !game.getBoard()[selected]?.itemId) selected = -1;
  if (!pointer?.dragging) render();
  const meaningful = result.events?.some(
    (event) =>
      !["dialogue", "recover", "produce", "move", "merge"].includes(event.type),
  );
  if (meaningful && result.message) notify(result.message);
  const level = result.events?.find((event) => event.type === "level");
  if (level) levelModal(level.level);
  if (merge)
    requestAnimationFrame(() =>
      root.querySelector(`[data-cell="${merge.to}"]`)?.classList.add("flash"),
    );
}

function header() {
  const state = game.state,
    progress = game.getLevelProgress();
  return `<header class="topbar"><div class="brand"><div class="seal"><span>衣</span></div><div><h1>江湖布坊</h1><div class="subtitle">百业 · 制衣</div></div></div>
  <div class="level"><strong>${state.level}</strong><div>衣坊等级<div class="exp-track"><i style="width:${progress.needed ? Math.min(100, (progress.exp / progress.needed) * 100) : 100}%"></i></div><small>${progress.exp}/${progress.needed || "圆满"}</small></div></div>
  <div class="resources">${["energy", "coin", "diamond", "star"].map((key) => `<div class="resource" title="${escape(label(key))}">${img(key)}<label>${escape(label(key))}</label><b>${count(state.resources[key])}${key === "energy" ? "<small>/100</small>" : ""}</b></div>`).join("")}</div>
  <button class="utility" data-action="settings" aria-label="设置与存档" title="设置与存档">☰</button></header>`;
}

function scene() {
  const state = game.state,
    rescue = state.story.phase !== "main";
  const done = state.completedBuilds.length;
  return `<section class="scene" style="background-image:url('${escape(rescue || done < 3 ? art.nightScene : art.scene)}')" aria-label="衣坊人物与场景"><div class="scene-title"><div class="chapter">${rescue ? "序章 · 雨夜护坊" : "百业江湖 · 制衣"}</div><h2>${rescue ? "檐雨留灯" : "见微衣坊"}</h2><p>${rescue ? "隔湿 · 固梁 · 遮雨" : done ? `修缮 ${done}/18　客笺 ${state.completedOrders.length}/43` : "一针一线，缝起人间江湖"}</p></div>
  <div class="character" style="${characterStyle()}"></div><div class="scene-friend" style="${characterStyle("aheng")}"></div>
  <div class="scene-bottom"><div class="location">青溪埠</div><p>${rescue ? "雨涨青溪，先护客料。" : state.story.chapterComplete ? "灯已亮，候归人。" : "先还衣，再寻人。"}</p>${!rescue ? '<button class="scene-link" data-tab="wardrobe">外观 · 换装</button>' : ""}</div></section>`;
}

function orders() {
  const entries = game.getOrders().slice(0, 3);
  if (!entries.length)
    return `<div class="orders"><div class="empty-state">${game.state.story.chapterComplete ? "本章客衣已全部交还，衣坊仍可继续经营。" : "新的客笺，待修整衣坊后送达。"}</div></div>`;
  return `<div class="orders" aria-label="今日客笺">${entries.map((order) => `<article class="order-card ${order.ready ? "ready" : ""}"><span class="order-avatar" style="${characterStyle(order.customer || "weizhou")}" aria-label="${escape(nameOf(order.customer || "weizhou"))}"></span><div class="order-info"><button class="order-name" data-order-info="${order.id}">${escape(order.title)}</button><div class="order-needs">${order.missing.map((need) => `<span class="order-need ${need.have >= need.need ? "met" : ""}" title="${escape(game.getItem(need.itemId).name)}">${img(need.itemId)}${need.have}/${need.need}</span>`).join("")}<span class="order-reward">＋${order.reward.Star || 0}券</span></div><button class="order-action" data-order="${order.id}" ${order.ready ? "" : "disabled"}>${order.ready ? "交还客衣" : "尚待备料"}</button></div></article>`).join("")}</div>`;
}

function cells() {
  const rescue = game.state.story.phase === "rescue";
  const hint = game.getHint();
  const source = game.getBoard()[selected];
  return `<div class="board ${rescue ? "rescue" : ""}" role="group" aria-label="${rescue ? "护坊备料案，4行7列" : "裁衣案，9行7列"}">${game
    .getBoard()
    .map((cell) => {
      const item = game.getItem(cell.itemId);
      const canTarget =
        source &&
        source.id !== cell.id &&
        cell.itemId === source.itemId &&
        cell.lock !== "box" &&
        source.lock === "free" &&
        ITEM_RULES[source.itemId]?.next;
      return `<button class="cell ${!cell.itemId ? "empty" : ""} ${cell.lock === "box" ? "locked" : cell.lock === "web" ? "web" : ""} ${selected === cell.id ? "selected" : ""} ${canTarget ? "target" : ""} ${showHint && hint.indices.includes(cell.id) ? "hinted" : ""}" data-cell="${cell.id}" aria-label="第${Math.floor(cell.id / 7) + 1}行${(cell.id % 7) + 1}列，${cell.itemId ? escape(item.name) : "空位"}${cell.lock === "box" ? "，封存，需先在相邻格合成" : cell.lock === "web" ? "，布封，需用相同物品合成" : ""}" aria-pressed="${selected === cell.id}" title="${escape(item.name)}${cell.itemId ? ` · ${item.rank}阶` : ""}">${cell.itemId ? img(cell.itemId) + `<span class="rank">${roman(item.rank)}</span>${item.isProducer && cell.lock === "free" ? `<span class="production">${cell.cooling ? "◷" : "+"}</span>` : ""}${cell.lock !== "free" ? `<span class="lock">${cell.lock === "box" ? "封存" : "布封"}</span>` : ""}` : ""}</button>`;
    })
    .join("")}</div>`;
}

function detailBar() {
  const detail = game.detail(selected);
  const channel = game.state.channel;
  if (!detail)
    return `<div class="detailbar"><div class="detail-copy"><h3>${game.state.story.phase === "rescue" ? "雨夜护坊" : "裁衣案"}</h3><p>拖动相同物品合成；也可先选一件，再点另一件。</p></div>${channel.length ? `<div class="detail-actions"><button data-action="claim" class="primary">领取待领物品 · ${channel.length}</button></div>` : ""}</div>`;
  const locked = detail.cell.lock !== "free";
  const description = locked
    ? detail.cell.lock === "box"
      ? "在相邻格合成，先拆开旧料包，再以同阶物品合成解封。"
      : "拖来相同物品合成，即可解开布封。"
    : detail.isAutoProducer
      ? `自动备料 · 余料${detail.cell.autoStock} · ${detail.autoCooldownMs ? seconds(detail.autoCooldownMs) : "待邻格空出"}`
      : detail.canProduce
        ? detail.cell.cooling
          ? `备料中 · ${seconds(detail.cooldownMs)}`
          : `余料 ${detail.cell.stock}/${detail.maxStock} · 每次备料消耗${detail.energy || 0}精力`
        : detail.description;
  return `<div class="detailbar">${img(detail.id)}<div class="detail-copy"><h3>${escape(detail.name)} <small>${roman(detail.rank)}阶</small></h3><p>${escape(description)}</p></div><div class="detail-actions">
  ${detail.canRescue ? '<button data-action="rescue" class="primary">护坊</button>' : ""}
  ${detail.canProduce ? `<button data-action="produce" class="primary" ${detail.cell.cooling || !detail.cell.stock ? "disabled" : ""}>备料</button>` : ""}
  ${detail.canCollect ? '<button data-action="collect" class="primary">收取</button>' : ""}
  ${detail.prop && !locked ? '<button data-action="prop">使用</button>' : ""}
  ${detail.canStore ? '<button data-action="store">入柜</button>' : ""}
  <button data-action="detail" aria-label="物品详情">详情</button></div></div>`;
}

function boardView() {
  const rescue = game.state.story.phase === "rescue";
  const target = RESCUE_TARGETS[game.state.story.rescueStage];
  return `<div class="work-head"><h2>${rescue ? "雨夜护坊" : "裁衣案"}</h2><span class="state-tag">${rescue ? `${game.state.story.rescueStage + 1} / 3　抢修` : "身份 · 制衣"}</span><button data-action="hint">${showHint ? "收起指引" : "操作指引"}</button></div>
  ${rescue ? `<div class="rescue-objective">${img(target)}<div><strong>${escape(game.getItem(target).name)}</strong><small>合成目标物品，选中后点“护坊”。</small></div><button data-action="story">前情</button></div>` : orders()}
  <div class="board-section">${cells()}</div><div class="hint">${escape(game.getHint().text)}</div>${detailBar()}`;
}

function buildsView() {
  const builds = game.getBuilds();
  const available = builds.filter(
    (build) => build.available && !build.completed,
  );
  return `<div class="work-head"><h2>修坊手记</h2><span class="state-tag">已修缮 ${game.state.completedBuilds.length}/18</span></div><div class="panel-scroll"><p class="list-heading">交还客衣取得修缮券，修整此间衣坊。</p>${available.map((build) => `<article class="quest-card"><h3>${escape(build.title)}</h3><p>${escape(build.description || build.text)}</p><div class="quest-meta"><span>修缮券 ${game.state.resources.star}/${build.demand.Star || 0}<br><small>${escape(rewardText(build.reward))}</small></span><button class="primary" data-build="${build.id}" ${build.ready ? "" : "disabled"}>动手修缮</button></div></article>`).join("") || '<p class="empty-state">先完成手中的客笺，再来修坊。</p>'}
  ${builds
    .filter((build) => build.completed)
    .reverse()
    .map(
      (build) =>
        `<article class="quest-card done"><h3>${escape(build.title)} <small>已修缮</small></h3><p>${escape(build.completion || build.description)}</p></article>`,
    )
    .join("")}
  ${builds
    .filter((build) => !build.completed && !build.available)
    .slice(0, 2)
    .map(
      (build) =>
        `<article class="quest-card done"><h3>${escape(build.title)}</h3><p>随前序修缮与客笺逐步开启。</p></article>`,
    )
    .join("")}</div>`;
}

function bagView() {
  const s = game.state;
  return `<div class="work-head"><h2>布柜</h2><span class="state-tag">${s.bag.length}/${s.bagCapacity}</span></div><div class="panel-scroll">${s.channel.length ? `<button class="channel-button" data-action="claim">领取前柜寄存 · ${s.channel.length} 件<br><small>${escape(game.getItem(s.channel[0]).name)} · 领取到裁衣案</small></button>` : ""}<p class="list-heading">${s.level < 5 ? "衣坊5级开启入柜。当前仍可领取客笺与升级奖励。" : "在裁衣案选中物品后点“入柜”；点柜内物品可取回。"}</p><div class="bag-grid">${Array.from({ length: s.bagCapacity }, (_, n) => `<button class="bag-slot" data-withdraw="${n}" ${!s.bag[n] ? "disabled" : ""}>${s.bag[n] ? img(s.bag[n].itemId) + `<b class="rank">${roman(game.getItem(s.bag[n].itemId).rank)}</b><span>${escape(game.getItem(s.bag[n].itemId).name)}</span>` : "空位"}</button>`).join("")}</div><div class="quest-meta"><span><small>扩一格需 ${100 + 75 * (s.bagCapacity - 5)} 工钱</small></span><button data-action="expand" ${s.level < 5 || s.bagCapacity >= 30 ? "disabled" : ""}>扩充布柜</button></div></div>`;
}

function marketView() {
  const icons = { energy: "energy", tool: 1001, supply: 91101 };
  return `<div class="work-head"><h2>行商</h2><span class="state-tag">每日子时换货</span></div><div class="panel-scroll"><p class="list-heading">${game.state.level < 3 ? "衣坊达到3级，行商来访。" : "货品每日限量，购得的实物从前柜领取。"}</p><div class="shop-grid">${game
    .getShop()
    .map(
      (item) =>
        `<article class="shop-card">${img(icons[item.id])}<h3>${escape(item.title)}</h3><p>${escape(item.description)}</p><div class="quest-meta"><span>${Object.entries(
          item.cost,
        )
          .map(([k, v]) => `${label(k)} ${v}`)
          .join(
            " · ",
          )}</span><small>${item.bought}/${item.limit}</small></div><button class="primary" data-buy="${item.id}" ${!item.unlocked || item.bought >= item.limit ? "disabled" : ""}>${!item.unlocked ? "3级开启" : item.bought >= item.limit ? "今日售罄" : "购入"}</button></article>`,
    )
    .join("")}</div></div>`;
}

function wardrobeView() {
  const all = art.characters || [];
  return `<div class="work-head"><h2>外观</h2><span class="state-tag">衣坊代掌 · 衣装展示</span></div><div class="panel-scroll"><p class="list-heading">选中衣装，查看人物展示。</p><div class="wardrobe">${all
    .map((entry, index) => {
      const unlocked =
        game.state.completedBuilds.length >= (entry.unlockBuilds || 0);
      return `<button class="costume-card ${index === wardrobeIndex ? "equipped" : ""}" data-costume="${index}" ${unlocked ? "" : "disabled"}><span class="costume-portrait" style="${characterStyle("keeper", entry.sprite)}" aria-label="${escape(entry.label)}"></span><span>${escape(entry.label)}</span><small>${!unlocked ? `修缮 ${entry.unlockBuilds} 处后开启` : index === wardrobeIndex ? "当前展示" : "试穿"}</small></button>`;
    })
    .join(
      "",
    )}</div><p class="wardrobe-note">此处展示衣装，不改变劳作数值。<br>衣料的取得、合成与交付，仍在裁衣案进行。</p></div>`;
}

function bookView() {
  const groups = new Map();
  for (const rule of Object.values(ITEM_RULES)) {
    if (!groups.has(rule.series)) groups.set(rule.series, []);
    groups.get(rule.series).push(rule);
  }
  const seen = game.state.discovered;
  const itemPanels = [...groups.entries()]
    .filter(([, entries]) => entries.some((rule) => seen.includes(rule.id)))
    .map(
      ([series, entries]) =>
        '<article class="book-series"><h3>' +
        escape(SERIES[series]?.name || game.getItem(entries[0].id).name) +
        '</h3><div class="book-items">' +
        entries
          .sort((a, b) => a.rank - b.rank)
          .map(
            (rule) =>
              '<div class="book-item ' +
              (seen.includes(rule.id) ? "" : "unseen") +
              '">' +
              img(rule.id) +
              "<small>" +
              roman(rule.rank) +
              "</small><div>" +
              (seen.includes(rule.id)
                ? escape(game.getItem(rule.id).name)
                : "未识") +
              "</div></div>",
          )
          .join("") +
        "</div></article>",
    )
    .join("");
  const log = game.getStoryLog();
  const storyPanels =
    log
      .map(
        (scene) =>
          '<article class="quest-card story-log"><h3>' +
          escape(scene.title) +
          "</h3>" +
          scene.lines
            .map(
              (line) =>
                "<p><span>" +
                escape(nameOf(line.speaker)) +
                "</span>　" +
                escape(line.text) +
                "</p>",
            )
            .join("") +
          "</article>",
      )
      .join("") || '<p class="empty-state">读过的故事会留在此处。</p>';
  return (
    '<div class="work-head"><h2>' +
    (bookMode === "story" ? "檐下人间" : "衣谱") +
    '</h2><span class="state-tag">' +
    seen.length +
    ' 件已识</span></div><div class="panel-scroll"><div class="tab-row"><button data-book="items" class="' +
    (bookMode === "items" ? "active" : "") +
    '">制衣图谱</button><button data-book="story" class="' +
    (bookMode === "story" ? "active" : "") +
    '">往事回看</button></div>' +
    (bookMode === "items" ? itemPanels : storyPanels) +
    "</div>"
  );
}

function render() {
  const s = game.state,
    dialogue = game.getDialogue();
  const rescue = s.story.phase !== "main";
  if (rescue) tab = "board";
  const content =
    {
      board: boardView,
      builds: buildsView,
      bag: bagView,
      market: marketView,
      wardrobe: wardrobeView,
      book: bookView,
    }[tab] || boardView;
  const background = rescue && art.nightScene ? art.nightScene : art.scene;
  root.innerHTML = `<div class="world-bg" style="background-image:url('${escape(background)}');${rescue ? "filter:brightness(.62) saturate(.65)" : ""}"></div><div class="world-shade"></div>${header()}<div class="play-layout">${scene()}<section class="workspace" aria-label="衣坊玩法">${content()}</section></div><nav class="navbar" aria-label="衣坊导航">${[
    ["board", "制衣"],
    ["builds", "修坊"],
    ["wardrobe", "外观"],
    ["bag", "布柜"],
    ["market", "行商"],
    ["book", "衣谱"],
  ]
    .map(
      ([key, title]) =>
        `<button class="nav-item ${tab === key ? "active" : ""}" data-tab="${key}" ${rescue && key !== "board" ? "disabled" : ""}>${title}${key === "bag" && s.channel.length ? `<span class="notice">${s.channel.length}</span>` : key === "builds" && game.getBuilds().some((build) => build.ready) ? '<span class="notice">!</span>' : ""}</button>`,
    )
    .join("")}</nav>${dialogue ? dialogueView(dialogue) : ""}`;
}

function dialogueView(dialogue) {
  const person = CHARACTERS[dialogue.speaker];
  return `<section class="story-screen" style="background-image:url('${escape(game.state.completedBuilds.length >= 3 ? art.scene : art.nightScene)}')" aria-label="剧情对话"><div class="story-location">${dialogue.scene === "intro" ? "檐雨留灯" : dialogue.scene.startsWith("rescue") ? "雨夜护坊" : "见微衣坊"}<small>${escape(META.location)}</small></div>${person?.portrait ? `<div class="story-person" style="${characterStyle(dialogue.speaker)}"></div>` : ""}<div class="dialogue"><div class="speaker">${escape(person?.name || "")}</div><p class="story-text">${escape(dialogue.text)}</p><div class="dialogue-footer"><small>${dialogue.line + 1} / ${dialogue.total}</small><button class="dialogue-next" data-action="next">${dialogue.line + 1 === dialogue.total ? "继续　›" : "下一句　›"}</button></div></div></section>`;
}

function modal(title, html, type = "generic") {
  modalType = type;
  overlay.innerHTML = `<div class="modal-backdrop"><section class="modal" role="dialog" aria-modal="true" aria-label="${escape(title)}"><button class="close" data-action="close" aria-label="关闭">×</button><h2>${escape(title)}</h2>${html}</section></div>`;
  overlay.querySelector("button:not(.close),textarea")?.focus();
}
function closeModal() {
  overlay.innerHTML = "";
  modalType = null;
}

function detailModal() {
  const detail = game.detail(selected);
  if (!detail) return;
  modal(
    detail.name,
    `<div class="reward-box"><div class="reward-item">${img(detail.id)}${roman(detail.rank)}阶</div></div><p>${escape(detail.description)}</p>${detail.sources.length ? `<p>备料来源：${detail.sources.map((source) => escape(source.name)).join("、")}</p>` : ""}${detail.cooldownMs ? `<p>距备料完成：${seconds(detail.cooldownMs)}</p>` : ""}<div class="book-items">${detail.chain.map((item) => `<div class="book-item ${item.discovered ? "" : "unseen"}">${img(item.id)}<div>${roman(item.rank)}</div></div>`).join("")}</div><div class="modal-actions">${detail.canSell ? `<button class="danger" data-action="sell-confirm">出售 · ${detail.sell}工钱</button>` : ""}<button data-action="close">返回</button></div>`,
    "detail",
  );
}

function levelModal(level) {
  modal(
    "坊誉渐起",
    `<div class="reward-level">${level}</div><p style="text-align:center">衣坊升至${level}级，新的客笺与技艺正在开启。</p><p style="text-align:center">升级获得的物品已寄存前柜，可在布柜领取。</p><div class="modal-actions"><button class="primary" data-action="rewards">查看待领物品</button><button data-action="close">继续经营</button></div>`,
    "level",
  );
}

function settingsModal() {
  modal(
    "坊中账册",
    `<p>进度自动保存在当前浏览器。每次合成、备料、交付与修缮都会记账。</p><button class="wide" data-action="export">导出存档</button><button class="wide" data-action="import">导入存档</button><button class="wide" data-action="help">玩法说明</button><button class="wide danger" data-action="reset-confirm">重新开坊</button><div class="save-status">${escape(game.saveWarning || `最近记账：${new Date(game.state.updatedAt).toLocaleString("zh-CN")}`)}</div>`,
    "settings",
  );
}

function exportModal() {
  const text = game.exportSave();
  modal(
    "导出账册",
    '<p>可下载存档，或复制下方全文留存。</p><textarea id="save-text" aria-label="存档全文" readonly></textarea><div class="modal-actions"><button class="primary" data-action="download">下载存档</button><button data-action="select-save">全选账册</button></div>',
    "export",
  );
  overlay.querySelector("textarea").value = text;
}

function clickCell(index) {
  const cell = game.getBoard()[index];
  if (game.getDialogue()) return;
  if (selected === index) {
    const detail = game.detail(index);
    if (detail?.canProduce) return act(() => game.produce(index));
    if (detail?.canCollect) return act(() => game.collect(index));
    return detail && detailModal();
  }
  const previous = game.getBoard()[selected];
  if (
    previous?.itemId &&
    previous.lock === "free" &&
    (!cell.itemId || (cell.itemId === previous.itemId && cell.lock !== "box"))
  ) {
    const result = act(() => game.move(selected, index));
    if (result.ok) {
      selected = index;
      render();
      return;
    }
  }
  selected = cell.itemId ? index : -1;
  render();
}

function helpModal() {
  modal(
    "制衣经营",
    '<ol class="help-lines"><li>拖动两件相同物品合成，也可以先点一件，再点目标格。</li><li>相邻合成可拆开旧料包；露出的布封需用同阶物品合成解开。</li><li>选中工具后点“备料”，或再点一次工具，消耗精力取得材料。工具库存用尽后需要等待。</li><li>客笺材料齐备后交还客衣，获得修缮券；在修坊手记中修缮，积累坊誉升级。</li><li>升级与购买的物品会寄存前柜。在布柜领取后才进入棋盘。</li><li>精力与工具备料均按现实时间恢复，关闭页面后也会结算。</li></ol>',
  );
}

function handleClick(event) {
  const button = event.target.closest("button");
  if (!button || button.disabled || suppressClick) return;
  if (button.dataset.cell !== undefined)
    return clickCell(Number(button.dataset.cell));
  if (button.dataset.tab) {
    tab = button.dataset.tab;
    selected = -1;
    render();
    return;
  }
  if (button.dataset.orderInfo) {
    const order = game
      .getOrders({ all: true })
      .find((order) => order.id === Number(button.dataset.orderInfo));
    if (order)
      modal(
        order.title,
        "<p>" +
          escape(nameOf(order.customer)) +
          "：" +
          escape(order.reason) +
          "</p><p>" +
          order.missing
            .map(
              (need) =>
                escape(game.getItem(need.itemId).name) +
                " " +
                need.have +
                "/" +
                need.need,
            )
            .join("　") +
          "</p>",
      );
    return;
  }
  if (button.dataset.order)
    return act(() => game.submitOrder(Number(button.dataset.order)));
  if (button.dataset.build)
    return act(() => game.build(Number(button.dataset.build)));
  if (button.dataset.buy) return act(() => game.buyShop(button.dataset.buy));
  if (button.dataset.withdraw !== undefined)
    return act(() => game.withdraw(Number(button.dataset.withdraw)));
  if (button.dataset.book) {
    bookMode = button.dataset.book;
    render();
    return;
  }
  if (button.dataset.costume !== undefined) {
    wardrobeIndex = Number(button.dataset.costume);
    try {
      localStorage.setItem("jianghu-bufang-costume", String(wardrobeIndex));
    } catch {}
    render();
    return;
  }
  switch (button.dataset.action) {
    case "next":
      return act(() => game.nextDialogue());
    case "hint":
      showHint = !showHint;
      render();
      return;
    case "produce":
      return act(() => game.produce(selected));
    case "rescue":
      return act(() => game.useRescue(selected));
    case "collect":
      return act(() => game.collect(selected));
    case "store":
      return act(() => game.store(selected));
    case "claim":
      return act(() => game.claimChannel());
    case "expand":
      return act(() => game.expandBag());
    case "detail":
      return detailModal();
    case "close":
      return closeModal();
    case "settings":
      return settingsModal();
    case "help":
      return helpModal();
    case "story":
      return modal(
        "雨夜护坊",
        `<div class="story-log">${(STORY[["rescue1", "rescue2", "rescue3"][game.state.story.rescueStage]] || []).map((line) => `<p>${escape(nameOf(line.speaker))}　${escape(line.text)}</p>`).join("")}</div>`,
      );
    case "rewards":
      closeModal();
      tab = "bag";
      render();
      return;
    case "export":
      return exportModal();
    case "select-save":
      overlay.querySelector("textarea")?.select();
      return;
    case "download": {
      const url = URL.createObjectURL(
        new Blob([game.exportSave()], { type: "application/json" }),
      );
      const link = document.createElement("a");
      link.href = url;
      link.download = `江湖布坊-${new Date().toISOString().slice(0, 10)}.json`;
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      return;
    }
    case "import":
      return modal(
        "导入账册",
        '<p>粘贴此前导出的江湖布坊存档，导入成功后会替换当前进度。</p><textarea id="save-text" aria-label="粘贴存档全文"></textarea><div class="modal-actions"><button class="primary" data-action="apply-import">核验并导入</button><button data-action="close">取消</button></div>',
        "import",
      );
    case "apply-import": {
      const result = act(() =>
        game.importSave(overlay.querySelector("textarea").value),
      );
      if (result.ok) {
        selected = -1;
        closeModal();
        render();
      }
      return;
    }
    case "reset-confirm":
      return modal(
        "重新开坊",
        '<p>当前江湖布坊进度将清除，并从雨夜初入衣坊开始。建议先导出账册留存。</p><div class="modal-actions"><button class="danger" data-action="reset">确认重新开始</button><button data-action="close">保留进度</button></div>',
        "reset",
      );
    case "reset":
      closeModal();
      selected = -1;
      tab = "board";
      return act(() => game.reset());
    case "sell-confirm": {
      const d = game.detail(selected);
      if (!d) return;
      return modal(
        "出售衣料",
        `<p>将${escape(d.name)}售予行商，获得${d.sell}工钱？</p><div class="modal-actions"><button class="danger" data-action="sell">确认出售</button><button data-action="close">留下</button></div>`,
      );
    }
    case "sell": {
      const result = act(() => game.sell(selected));
      if (result.ok) closeModal();
      return;
    }
    case "prop": {
      const d = game.detail(selected);
      if (!d) return;
      if (d.prop && game.getBoard().some((cell) => cell.recoverAt > 0)) {
        const target = game.getBoard().find((cell) => cell.recoverAt > 0);
        return act(() => game.useProp(selected, target.id));
      }
      return act(() => game.useProp(selected));
    }
  }
}

document.addEventListener("click", handleClick);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (modalType) closeModal();
    else {
      selected = -1;
      render();
    }
  }
  if (
    (event.key === " " || event.key === "Enter") &&
    game?.getDialogue() &&
    !modalType &&
    !event.target.closest("button")
  ) {
    event.preventDefault();
    act(() => game.nextDialogue());
  }
});

root.addEventListener("pointerdown", (event) => {
  const element = event.target.closest("[data-cell]");
  if (!element || event.button !== 0 || game.getDialogue()) return;
  const index = Number(element.dataset.cell),
    cell = game.getBoard()[index];
  if (!cell.itemId || cell.lock !== "free") return;
  pointer = {
    index,
    startX: event.clientX,
    startY: event.clientY,
    x: event.clientX,
    y: event.clientY,
    dragging: false,
    element,
  };
});
document.addEventListener(
  "pointermove",
  (event) => {
    if (!pointer) return;
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    if (
      !pointer.dragging &&
      Math.hypot(pointer.x - pointer.startX, pointer.y - pointer.startY) > 9
    ) {
      pointer.dragging = true;
      suppressClick = true;
      pointer.ghost = document.createElement("div");
      pointer.ghost.className = "ghost";
      pointer.ghost.innerHTML = img(game.getBoard()[pointer.index].itemId);
      document.body.append(pointer.ghost);
      pointer.element.classList.add("dragging");
    }
    if (pointer.dragging) {
      event.preventDefault();
      pointer.ghost.style.left = `${pointer.x - 35}px`;
      pointer.ghost.style.top = `${pointer.y - 35}px`;
    }
  },
  { passive: false },
);
document.addEventListener("pointerup", (event) => {
  if (!pointer) return;
  const drag = pointer;
  pointer = null;
  if (!drag.dragging) return;
  drag.ghost.remove();
  drag.element.classList.remove("dragging");
  const target = document
    .elementFromPoint(event.clientX, event.clientY)
    ?.closest("[data-cell]");
  if (target && Number(target.dataset.cell) !== drag.index) {
    selected = Number(target.dataset.cell);
    act(() => game.move(drag.index, selected));
  }
  render();
  setTimeout(() => {
    suppressClick = false;
  }, 120);
});
document.addEventListener("pointercancel", () => {
  if (pointer?.ghost) pointer.ghost.remove();
  pointer = null;
  suppressClick = false;
  render();
});

async function start() {
  const response = await fetch("/tailor/assets/visuals.json");
  if (!response.ok) throw new Error("美术素材配置未能载入，请检查本地文件。");
  art = await response.json();
  if (!art.characters?.[wardrobeIndex]) wardrobeIndex = 0;
  const profile = new URLSearchParams(location.search).get("profile");
  game = createGame({
    onChange,
    ...(/^qa-[a-z0-9-]{1,40}$/.test(profile || "")
      ? { storageKey: "jianghu-bufang-offline-v1-" + profile }
      : {}),
  });
  if (
    game.state.completedBuilds.length <
    (art.characters[wardrobeIndex]?.unlockBuilds || 0)
  )
    wardrobeIndex = 0;
  render();
  if (game.loadWarning) notify(game.loadWarning);
  setInterval(() => game.tick(), 1000);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) game.tick();
  });
}
start().catch((error) => {
  root.innerHTML =
    '<div class="boot"><span>江湖布坊</span><p id="boot-error"></p></div>';
  document.querySelector("#boot-error").textContent = error.message;
});
