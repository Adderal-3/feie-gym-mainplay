/* Wire the recovered Guider and its original prefab components into an already mounted board.
 * This file does not replace guide art, rewrite steps, auto-complete steps, or change the board.
 */
(function (global) {
  'use strict';

  function enableOriginalFindItems(node) {
    var count = 0;
    if (!node) return count;
    node.getComponents(cc.Component).forEach(function (component) {
      if (cc.js.getClassName(component) !== 'UIFindItem') return;
      component.enabled = true;
      // This is the component's own registration/state method, used by its original onEnable.
      if (typeof component.updateUIState === 'function') component.updateUIState();
      count++;
    });
    node.children.forEach(function (child) { count += enableOriginalFindItems(child); });
    return count;
  }

  global.setupOriginalGuide = async function (api, options) {
    options = options || {};
    api = api || global.OriginalGameBridge || global.__ORIGINAL__;
    var needed = ['E8', 'G2', 'Tq', 'o8', 'kK', 'q6', 'Ct', 'Ne', 'o9', 'J8'];
    needed.forEach(function (name) { if (!api || !api[name]) throw new Error('原引导桥接缺少：' + name); });
    var role = api.E8.role;
    if (!role || !role.guide || !api.G2.Data) throw new Error('原引导需要已初始化的玩家与棋盘');
    var inMerge = api.o9.currentScreen === api.J8.MERGE_SCREEN;
    if (!inMerge && api.o9.currentScreen !== api.J8.HOME_SCREEN) throw new Error('原引导需要已登记的主页或棋盘');
    if (inMerge && !api.Tq.isFinishInit) throw new Error('原棋盘尚未完成初始化，暂不能启动引导');
    if (inMerge && (!api.G2.BoardCells || api.G2.BoardCells.size !== 63)) throw new Error('原引导需要完整的 63 格棋盘');
    var guideLayer = api.Be && api.Ne.getLayer(api.Be.GUIDE);
    if (!guideLayer) throw new Error('原 GUIDE 图层尚未初始化');
    var guide = api.q6.instance.getGuideStep(role.createVersion, 'Board');
    if (!guide || !Array.isArray(guide.allSteps) || !guide.allSteps.length) throw new Error('原 Board 引导配置未载入');
    var view = options.view || global.__ORIGINAL_VIEW__;
    if (!view) throw new Error('原 MergeScreen 节点尚未挂载');
    var enabled = enableOriginalFindItems(view);
    if (!api.Ct.getUI('boardbg')) throw new Error('原引导遮罩目标 boardbg 尚未注册');
    if (api.o8.isRunning('Board')) return { started: false, alreadyRunning: true, enabledFindItems: enabled, step: api.o8.curStepId };

    api.kK.registGuideAction();
    if (api.j8 && typeof api.j8.registerConfMusic === 'function') {
      new Set(guide.allSteps.map(function (step) { return step.audio; }).filter(Boolean)).forEach(function (name) {
        api.j8.registerConfMusic(name, false, false);
      });
    }
    // The original initializer stores the last completed step, not the next step.
    // Preserve it exactly: e.g. 2003 resumes original first-merge step 2004.
    var savedStep = role.guide.has('Board') ? role.guide.get('Board') : -1;
    // The original home entry focuses area 1 before the first dialogue; a board
    // resume already has its exact camera position and only skips that home focus.
    var result = api.E8.startGuide('Board', null, false, !inMerge);
    var status = {
      started: api.o8.isRunning('Board'), result: result, savedStep: savedStep,
      step: api.o8.currentStep ? api.o8.currentStep.id : null,
      enabledFindItems: enabled,
      originalStepIds: guide.allSteps.map(function (step) { return step.id; }),
    };
    global.__ORIGINAL_GUIDE_SETUP__ = status;
    return status;
  };
})(window);
