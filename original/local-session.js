(function () {
  'use strict';
  const query = new URLSearchParams(location.search);
  const profile = query.has('debug') && /^[a-z0-9-]{1,32}$/.test(query.get('profile') || '') ? query.get('profile') : '';
  // Keep development QA profiles separate from the first stable local release.
  const SAVE_KEY = 'feie-gym-original-story623-v1' + (profile ? ':' + profile : '');
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
    Object.defineProperty(F8, 'resRoot', { value: location.origin, configurable: true });
    F8.switches = { audit: false, gm: false, boardDebugInfo: false, mergeService: false, closepay: true, closeshare: true, closegroup: true, openMemoryOpt: false };
    if (api.K3) api.K3.logEvent = function () {};
    E8.serverTime = Date.now();
    const initialProfile = window.createOriginalStoryProfile(api, {
      initialResources: { coin: 0, diamond: 20, energy: 100 }, now: Date.now(),
    });
    if (!initialProfile.ready) throw new Error('原剧情角色初始化缺少：' + initialProfile.missing.join(', '));
    const role = initialProfile.role;
    let board = initialProfile.board;
    window.__ORIGINAL_PROFILE_EVIDENCE__ = initialProfile.evidence;
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
    GW.gdCellId = 63;
    G2.MergeBoardType = ar.main;
    G2.cacheBoard = board;
    G2.cacheExtraData = new Map();
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
    report('原 6.2.3 AB14 剧情角色与主棋盘100就绪');
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
        if (point && G2.Board && G2.BoardRender) {
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
        const cell32 = G2.BoardCells?.size ? api.G$.GetCellByIndex(32) : null;
        const entry = api.Ct.getUI('element');
        const entryPos = entry?.convertToWorldSpaceAR(cc.v2());
        const entryInfo = entry ? '入口 '+entry.activeInHierarchy+' '+Math.round(entryPos.x)+','+Math.round(entryPos.y) : '入口 未登记';
        const recoveryInfo = [25,40].map(index => {
          const cell = b?.cells.get(index);
          return index+':'+cell?.state+' '+Array.from(cell?.recovery || []).map(([key,value]) => [key,value?.constructor?.name,value instanceof api.el,typeof value?.onData,typeof value?.getLeftTime].join('/')).join(',');
        }).join('\n');
        status.textContent = ['引导 '+step, '等级 '+role.level+' 经验 '+role.expLevel+' 星 '+role.star,'页面 '+(api.o9.isInitialzed ? api.o9.currentScreen : -1)+' 窗口 '+(api.j_.isInitialzed ? api.j_.currentWindow : -1),'锁 '+G2.instance.toucherLock, '焦点 '+G2.FocusCellIdx+'→'+G2.FocusEndCellIdx, '遮罩 '+api.Xz.IsShow+' 条件 '+api.hT.CurCondition,'格31–33 '+[31,32,33].map(i=>b?.cells.get(i)?.elementId).join(','), '32世界 '+(cell32 ? Math.round(cell32.worldPos.x)+','+Math.round(cell32.worldPos.y):''),'选中 '+(G2.instance.selectedElement?.serverIdx||''),hitInfo,touch+' move '+moves,'请求 '+(window.LocalBackend?.getLog().at(-1)?.command||'')].join('\n');
        status.textContent = '分支 '+role.createVersion+' 棋盘 '+b?.boardId+'\n剧情 '+api.o8.curGuideId+'\n'+entryInfo + '\n原棋盘同一引用 '+(b === role.boards.get(1))+'\n'+recoveryInfo+'\n' + status.textContent;
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
        api.kK.registGuideAction();
      },
      async afterMount(view, canvas) {
        const screen = view.getComponent(api.Tq);
        screen.enabled = true;
        const story = await window.prepareOriginalStory(api, {
          onLoadingReady() { document.getElementById('diagnostic').classList.add('ready'); },
        });
        story.start().then(() => report('原救火剧情已结束，正式AB引导已接入'), error => report('原剧情流程失败', error));
        await story.waitUntilVisible();
        report('原标准纵火／营救剧情已显示');
      },
    };
  };
})();
