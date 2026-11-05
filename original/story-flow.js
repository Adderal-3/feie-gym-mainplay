/* Native story entry for the explicitly selected standard PlayableBoard route.
 * This module supplies the local host's loading boundary and delegates the story,
 * rescue board, transitions and formal guide to the recovered Main/Z7 methods.
 * It never changes the role, guide steps, board contents or tutorial conditions.
 */
(function (global) {
  'use strict';
  var current = null;
  var requiredSymbols = ['E8', 'G2', 'Z7', 'Q7', 'q6', 'kK', 'o8', 'j_', 'o9', 'J8', 'F3', 'Ne', 'Be', 'config'];
  var originalInitializers = [
    'AppEngine.engineStart',
    'j_.initialize(new z7("Prefab/Common/Loading"))',
    'o9.initialize(new n9())',
    'Wi(W3).registerWindowByConf() after configuration decode',
    'Wi(i9)',
    'Wi(r_); F7.initialize(canvas); KI.init()',
    'setupOriginalHome(api, {canvas})',
    'kK.registGuideAction',
    'Main.loadHomeScreen',
    'Z7.setDirectMode(false); Z7.prepareIfNeeded',
    'Main.startInitialGuide(homeReady, "miniboard", Q7.None)',
    'Main.startFormalGuide -> HomeScreen.startGuide -> c9/d9',
  ];
  var requiredAssets = [
    'Prefab/Merge/MergePlayableWindow',
    'Common/Guide/GuideTalk',
    'Common/Guide/GuideMask',
    'Common/Guide/GuideHand',
    'Common/Guide/GuideTip',
    'Prefab/UI/Merge/MergeGuideHand',
  ];

  function originalClass(api, alias, registeredName) {
    return api[alias] || (global.cc && global.cc.js && global.cc.js.getClassByName(registeredName));
  }
  function loadingBoundary(options, state) {
    if (options.loading) {
      if (typeof options.loading.waitLoadingDisable !== 'function') throw new Error('原加载界面缺少 waitLoadingDisable');
      return options.loading;
    }
    // The desktop host has a loading overlay instead of the WeChat Loading scene.
    // Only that presentation boundary is adapted; original Main still decides
    // when the story is visible and when its formal guide may begin.
    var ready = false, released = null;
    return {
      get ready() { return ready; },
      set ready(value) {
        ready = !!value;
        if (ready && !released) {
          state.loadingReady = true;
          released = Promise.resolve().then(function () {
            return options.onLoadingReady ? options.onLoadingReady() : undefined;
          });
        }
      },
      waitLoadingDisable: function () { return released || Promise.resolve(); },
    };
  }

  global.prepareOriginalStory = async function (api, options) {
    options = options || {};
    api = api || global.OriginalGameBridge || global.__ORIGINAL__;
    requiredSymbols.forEach(function (name) { if (!api || !api[name]) throw new Error('原剧情路由桥接缺少：' + name); });
    var role = api.E8.role;
    if (!role || !role.id || !role.guide || !api.G2.Data) throw new Error('原剧情路由需要先建立本地角色与主棋盘');
    if (current && current.role === role) return current.controller;
    if (!api.j_.isInitialzed || !api.o9.isInitialzed) throw new Error('原窗口与页面导航器尚未初始化');
    if (!api.Ne.getLayer(api.Be.GUIDE) || !api.Ne.getLayer(api.Be.WINDOW)) throw new Error('原剧情需要 GUIDE 与 WINDOW 图层');
    var rescueBoard = api.config.Board && api.config.Board.getById(9000);
    if (!rescueBoard || rescueBoard.type !== 'PlayableBoard' || !Array.isArray(rescueBoard.element) || !rescueBoard.element.length) throw new Error('原救火棋盘 9000 配置尚未加载');
    if (api.q6.instance.getGuideVersion(role.createVersion) !== 2) throw new Error('当前角色未使用原 AB 第二版主引导');
    var story = api.q6.instance.getGuideStep(role.createVersion, 'PlayableBoard');
    var steps = story && story.allSteps;
    if (!Array.isArray(steps) || !steps.some(function (step) { return step.id === 9914001 && step.talk.includes('991'); }) ||
      !steps.some(function (step) { return step.id === 9914002 && step.talk.includes('992'); })) {
      throw new Error('当前配置缺少已选择的原纵火与营救开场剧情');
    }
    if (api.o8.isRunning()) throw new Error('已有原生引导正在运行，不能并行启动另一条剧情入口');
    if (api.kK.mainGuide && api.kK.mainGuide.createVersion !== Number(role.createVersion)) throw new Error('原主引导实例属于另一个角色版本，需要先完成正确的会话初始化');
    var Main = originalClass(api, 'oee', 'Main');
    if (!Main) Main = api.Main;
    if (!Main || !Main.prototype || typeof Main.prototype.loadHomeScreen !== 'function' ||
      typeof Main.prototype.startInitialGuide !== 'function' || typeof Main.prototype.startFormalGuide !== 'function') {
      throw new Error('原 Main 的剧情入口方法尚未加载');
    }
    var Home = originalClass(api, 'GZ', 'HomeScreen');
    if (!Home || typeof Home.loginHome !== 'function') throw new Error('原 HomeScreen 尚未加载');
    var state = {
      mode: 'standard', guideId: 'PlayableBoard', createVersion: role.createVersion,
      phase: 'preparing', visible: false, loadingReady: false, storyFinished: false,
      formalGuideStarted: false, lastError: null,
      originalStepIds: steps.map(function (step) { return step.id; }),
      requiredSymbols: requiredSymbols.slice().concat(['oee or registered Main', 'GZ or registered HomeScreen']),
      originalInitializers: originalInitializers.slice(), requiredAssets: requiredAssets.slice(),
    };
    // Use only original Main methods. Do not attach Main to Canvas: its onLoad
    // would initialize the platform SDK and perform another network login.
    var route = Object.create(Main.prototype);
    route.loading = loadingBoundary(options, state);
    api.kK.registGuideAction();
    api.Z7.setDirectMode(false);
    var previouslyCompleted = api.Z7.hasCompletedGuide();
    var prepared = await api.Z7.prepareIfNeeded();
    if (!previouslyCompleted && !prepared) throw new Error('原标准剧情预加载失败或当前角色不满足原解锁条件');
    state.phase = previouslyCompleted ? 'ready-to-resume' : 'ready';
    var completion = null;
    var controller = {
      status: state,
      start: function () {
        if (completion) return completion;
        if (api.E8.role !== role) return Promise.reject(new Error('角色已更换，原剧情入口需要重新准备'));
        completion = (async function () {
          try {
            state.phase = 'loading-home';
            var homeReady = Main.prototype.loadHomeScreen.call(route);
            await homeReady;
            state.phase = previouslyCompleted ? 'resuming-formal-guide' : 'playing-story';
            // Q7.None deliberately selects the original standard story path.
            // $7.navigate("miniboard") would select D and omit dialogues 991/992.
            await Main.prototype.startInitialGuide.call(route, homeReady, 'miniboard', api.Q7.None);
            var finalStoryStep = Math.max.apply(Math, steps.map(function (step) { return step.id; }));
            state.storyFinished = role.guide.has('PlayableBoard') && Number(role.guide.get('PlayableBoard')) >= finalStoryStep;
            // Z7 intentionally catches resource failures in the original client.
            // Report that failure instead of calling a fallback a completed story.
            if (!previouslyCompleted && !state.storyFinished) throw new Error('原纵火与营救剧情未完整结束，请检查原资源或引导运行错误');
            state.formalGuideStarted = !!api.kK.mainGuide;
            state.phase = 'formal-guide';
            return state;
          } catch (error) {
            state.lastError = String(error.message || error);state.phase = 'error';throw error;
          }
        })();
        return completion;
      },
      waitUntilVisible: function () {
        var running = controller.start();
        return Promise.race([api.Z7.waitUntilGuideVisible(), running]).then(function () {
          state.visible = true;return state;
        });
      },
      get completion() { return completion; },
    };
    current = { role: role, controller: controller };
    global.__ORIGINAL_STORY_FLOW__ = controller;
    return controller;
  };
  global.setupOriginalStory = global.prepareOriginalStory;
})(window);
