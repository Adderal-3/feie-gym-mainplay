(function () {
  'use strict';
  const query = new URLSearchParams(location.search);
  const profile = query.has('debug') && /^[a-z0-9-]{1,32}$/.test(query.get('profile') || '') ? query.get('profile') : '';
  // Keep development QA profiles separate from the first stable local release.
  const SAVE_KEY = profile ? 'feie-gym-original-local-v1:' + profile : 'feie-gym-original-local-v2';
  const report = (s, e) => window.__reportOriginal?.(s, e);
  async function binary(url) {
    const r = await fetch(url);
    if (!r.ok) throw new Error('Local configuration missing: ' + url);
    return new Uint8Array(await r.arrayBuffer());
  }
  window.initializeOriginalSession = async function (api) {
    const { config, E8, F8, pl, ll, yu, ar, G2, GW } = api;
    F8.curConf = { env: 'Prod', platform: 'weixin', httpRoot: location.origin, resRoot: location.origin, gameId: 'local' };
    report('读取原始玩法与中文配置');
    const [main, lang] = await Promise.all([
      binary('/remoteRes/config/Config.bin'), binary('/remoteRes/config/Lang_zh.bin'),
    ]);
    config.decodeConfig(api.vn(main));
    config.decodeConfig(api.vn(lang), true);
    if (api.v) await api.v.setLanguage('zh');
    if (api.j8?.syncSoundConfig) api.j8.syncSoundConfig();
    const initialSettings = config.Config.config;
    Object.defineProperty(F8, 'resRoot', { value: location.origin, configurable: true });
    F8.switches = { audit: false, gm: false, boardDebugInfo: false, mergeService: false, closepay: true, closeshare: true, closegroup: true, openMemoryOpt: false };
    if (api.K3) api.K3.logEvent = function () {};
    E8.serverTime = Date.now();
    const role = new yu();
    role.id = 1;
    role.level = 1;
    role.expLevel = 0;
    role.version = F8.version;
    role.language = 'zh';
    role.createAt = new Date();
    role.energy.value = initialSettings.initEnergy;
    role.energy.valueMax = initialSettings.energyMax;
    role.energy.interval = initialSettings.energyRecoverRate;
    role.energy.intervalValue = 1;
    role.energy.startTime = Date.now();
    role.energy.id = 'energy';
    role.coin = initialSettings.initCoin;
    role.diamond = initialSettings.initDiamond;
    role.star = initialSettings.initStar;
    role.build.areas.push(1);
    role.build.builded.set(10001, false);
    E8.role = role;
    E8.user = role.userInfo;
    role.globalActivity = new Map();
    function initializeOriginalAppearance() {
      const info = role.userInfo;
      const uniform = config.ManagerUniform.list.find(item => item.isDefault === 1);
      const frame = config.ManagerFrame.list.find(item => item.isDefault === 1);
      const photo = config.ManagerPhoto.list.find(item => item.isDefault === 1);
      if (!info.uniform && uniform) info.uniform = uniform.id;
      if (!info.imgBox && frame) info.imgBox = frame.id;
      if (!info.img && photo) info.img = String(photo.id);
    }
    initializeOriginalAppearance();
    const initial = config.Board.getById(1);
    if (!initial) throw new Error('Original board configuration 1 is absent');
    let board = new pl();
    board.id = 1;
    board.boardId = 1;
    board.rId = role.id;
    board.type = ar.main;
    board.rows = initial.element.length;
    board.cols = initial.element[0].length;
    board.cellSize = initial.cellSize;
    board.seed.seed = 1;
    board.bag.size = 5;
    for (const series of config.ElementSeries.list) {
      if (series.type.includes('Main') && series.tutorialElementOrder.length) {
        board.tutorialOrder.set(series.series, series.tutorialElementOrder.slice());
      }
    }
    const firstOrderConfig = config.Order.getById(10001);
    if (firstOrderConfig) {
      const firstOrder = new api.Zc();
      firstOrder.id = 10001;
      firstOrder.orderId = 10001;
      firstOrder.demand = new Map(firstOrderConfig.demand);
      board.orders.set(10001, firstOrder);
    }
    let idx = 1;
    for (const row of initial.element) for (const encoded of row) {
      const [elementId, state, cover] = String(encoded).split(':').map(Number);
      const cell = new ll();
      cell.index = idx;
      cell.elementId = elementId;
      cell.state = state;
      cell.seed = idx + 1;
      cell.uUID = idx;
      cell.client_id = idx;
      cell.client_uuid = idx;
      if (cover) cell.extra.set('coverVariant', String(cover));
      board.cells.set(idx++, cell);
    }
    role.boards.set(1, board);
    board.incrementId = 63;
    GW.gdCellId = 63;
    G2.MergeBoardType = ar.main;
    G2.cacheBoard = board;
    G2.cacheExtraData = {};
    if (window.LocalBackend) {
      const backend = window.__LOCAL_BACKEND__ = window.LocalBackend.init({ bridge: api, storageKey: SAVE_KEY, role });
      const saved = backend.readSave();
      if (saved && backend.restore(saved, role)) {
        board = role.boards.get(1);
        G2.cacheBoard = board;
        GW.gdCellId = Math.max(63, board.incrementId || 0);
        report('已恢复本地存档');
      }
    }
    initializeOriginalAppearance();
    report('原配置已解码，原始 9×7 棋盘就绪');
    if (query.has('debug') && !query.has('clean')) {
      const status = document.createElement('pre');
      status.id = 'original-live-state';
      status.style.cssText = 'position:fixed;top:70px;left:8px;z-index:10000;color:white;background:#000a;font:10px/1.4 monospace;pointer-events:none;padding:5px;max-width:110px;white-space:pre-wrap';
      document.body.appendChild(status);
      let touch = '';
      let moves = 0;
      let hitInfo = '';
      for (const name of ['board_touch_start','board_touch_move','board_touch_end']) api.u.add(name, function (event) {
        if (Array.isArray(event)) event = event[0];
        if (name === 'board_touch_move') moves++;
        const point = event?.getLocation ? event.getLocation() : null;
        touch = name.replace('board_touch_', '') + (point ? ' ' + Math.round(point.x) + ',' + Math.round(point.y) : '');
        if (point) {
          const hit = api.G$.GetCellByWorldPos(point, null, G2.Board);
          hitInfo = '命中 '+(hit?.serverIdx||'')+'/'+(hit?.data?.config?.id||'');
          const local = G2.BoardRender.node.convertToNodeSpaceAR(point);
          hitInfo += ' 局部 '+Math.round(local.x)+','+Math.round(local.y);
        }
      }, status);
      setInterval(() => {
        const b = G2.Data;
        let step = '';
        try { step = api.o8.currentStep?.id ?? api.o8.curStepId ?? ''; } catch {}
        const cell32 = api.G$.GetCellByIndex(32);
        const entry = api.Ct.getUI('element');
        const entryPos = entry?.convertToWorldSpaceAR(cc.v2());
        const entryInfo = entry ? '入口 '+entry.activeInHierarchy+' '+Math.round(entryPos.x)+','+Math.round(entryPos.y) : '入口 未登记';
        const recoveryInfo = [25,40].map(index => {
          const cell = b?.cells.get(index);
          return index+':'+cell?.state+' '+Array.from(cell?.recovery || []).map(([key,value]) => [key,value?.constructor?.name,value instanceof api.el,typeof value?.onData,typeof value?.getLeftTime].join('/')).join(',');
        }).join('\n');
        status.textContent = ['引导 '+step, '等级 '+role.level+' 经验 '+role.expLevel+' 星 '+role.star,'页面 '+(api.o9.isInitialzed ? api.o9.currentScreen : -1)+' 窗口 '+(api.j_.isInitialzed ? api.j_.currentWindow : -1),'锁 '+G2.instance.toucherLock, '焦点 '+G2.FocusCellIdx+'→'+G2.FocusEndCellIdx, '遮罩 '+api.Xz.IsShow+' 条件 '+api.hT.CurCondition,'格31–33 '+[31,32,33].map(i=>b?.cells.get(i)?.elementId).join(','), '32世界 '+(cell32 ? Math.round(cell32.worldPos.x)+','+Math.round(cell32.worldPos.y):''),'选中 '+(G2.instance.selectedElement?.serverIdx||''),hitInfo,touch+' move '+moves,'请求 '+(window.LocalBackend?.getLog().at(-1)?.command||'')].join('\n');
        status.textContent = entryInfo + '\n原棋盘同一引用 '+(b === role.boards.get(1))+'\n'+recoveryInfo+'\n' + status.textContent;
      }, 200);
    }
    return {
      role, board,
      async beforeMount(view, canvas) {
        if (!api.j_.isInitialzed) {
          await Promise.all([
            api.A8.Initialize('Common/UI/alertDefault', 'Common/UI/toastDefault', 'Common/UI/weakNetDefault', 'Common/UI/ItemTipsDefault'),
            api.L7.Initialize('Common/UI/PopDefault'),
          ]);
          api.j_.initialize(new api.z7('Prefab/Common/Loading'));
          const windows = api.Wi(api.W3);
          // Config was decoded before this direct local entry created the
          // registry. Replay its original ConfigParseEnd registration method.
          windows.registerWindowByConf();
        }
        if (!api.o9.isInitialzed) {
          api.o9.initialize(new api.n9());
          api.Wi(api.i9);
        }
        const classes = new Set();
        const walk = node => {
          for (const component of node.getComponents(cc.Component)) {
            const name = cc.js.getClassName(component);
            classes.add(name);
          }
          node.children.forEach(walk);
        };
        walk(view);
        report('原界面组件: ' + [...classes].join(', '));
        const screen = view.getComponent(api.Tq);
        if (!screen) throw new Error('Original MergeScreen component was not deserialized');
        // Defer only the root lifecycle until the original navigator is ready.
        // All child components retain their recovered prefab enabled flags.
        screen.enabled = false;
        window.__ORIGINAL_MERGE_SCREEN__ = screen;
        const screenData = api.o9.getScreenData(api.J8.MERGE_SCREEN);
        screenData.View = screen;
        screen.navigator = api.o9.navigator;
        screen.id = api.J8.MERGE_SCREEN;
        // Direct local cache entry skips LoadBoardData's response path. Run its
        // exact timer conversion before original cell/render objects read them.
        board.cells.forEach(cell => api.G2.convertRecovery(cell));
        if (api.Ne) {
          try { api.Ne.stageHeight = 1334; api.Ne.stageWidth = 750; } catch {}
        }
        screen.resizeBoard();
        if (!api.kK.mainGuide) api.kK.mainGuide = new api.c9();
        api.kK.registGuideAction();
      },
      async afterMount(view, canvas) {
        const screen = view.getComponent(api.Tq);
        screen.enabled = true;
        await api.C4.show({ justShow: true, goScreen: api.J8.MERGE_SCREEN, boardType: api.ar.main });
        await api.o9.showScreen(api.J8.MERGE_SCREEN);
        report('已通过原版页面导航器打开合成棋盘');
        const start = Date.now();
        while (screen.mergeBoardRender.readyCount < 63 && Date.now() - start < 15000) {
          await new Promise(resolve => setTimeout(resolve, 66));
        }
        report('原棋盘加载进度：' + screen.mergeBoardRender.readyCount + '/63');
        if (screen.mergeBoardRender.readyCount !== 63) throw new Error('Original board did not finish initializing all 63 cells');
        api.C4.close = true;
        const guideReadyAt = Date.now();
        while (!api.Tq.isFinishInit && Date.now() - guideReadyAt < 8000) await new Promise(resolve => setTimeout(resolve, 33));
        screen.mergeBoardRender.orderInfo.scrollToLeft();
        if (api.u2?.show) await api.u2.show();
        {
          // HomeScreen.onInit owns shared build/goose/config registries used by
          // the merge-page task drawer too. Complete the original home entry on
          // every boot before restoring a board, as well as for the first dialogue.
          const transition = await api.C4.show({ goScreen: api.J8.HOME_SCREEN });
          await transition.waitClose();
          await window.__ORIGINAL_HOME_SETUP__.waitReady();
          await api.u2.view.updateHud();
          if (role.guide.has('Board')) {
            const resume = await api.C4.show({ goScreen: api.J8.MERGE_SCREEN });
            await resume.waitClose();
            await api.Tq.waitFinishInit();
            screen.mergeBoardRender.orderInfo.scrollToLeft();
          }
        }
        if (window.setupOriginalGuide) {
          const guide = await window.setupOriginalGuide(api, { view });
          report('原版新手引导已接入：' + (guide.step || guide.savedStep || '恢复'));
        }
      },
    };
  };
})();
