/* Initialize original shared main-UI services before mounting original screens.
 * Every pool/template is created by the recovered service itself.
 */
(function (global) {
  'use strict';
  const sceneNames = [
    'OrderItemBottom', 'OrderItemBottomRight', 'OrderItemLeftTop', 'OrderItemLeftBottom',
    'OrderGroupTop', 'OrderGroupLeft', 'OrderDrawerRight', 'OrderItemBubble', 'OrderStackRight',
  ];
  let pending;
  let sharedInitialized = false;
  global.initializeOriginalRuntimeServices = function (api, options) {
    if (pending) return pending;
    pending = (async function () {
      api = api || global.__ORIGINAL__;
      const canvas = options?.canvas || global.__ORIGINAL_CANVAS__;
      if (!sharedInitialized) {
        if (!canvas || !canvas.activeInHierarchy) throw new Error('Original runtime services require the running Canvas');
        if (!api?.Wi || !api.r_ || !api.F7?.initialize || !api.KI?.init) throw new Error('Original startup service bindings are missing');
        // Ui.initialize in the original Main delegates to this cached constructor.
        api.Wi(api.r_);
        api.F7.initialize(canvas);
        api.KI.init();
        sharedInitialized = true;
      }
      if (!api?.nO?.initExtraConfigs || !api.ZN) throw new Error('Original order reward service bindings are missing');
      const tool = api.nO;
      const requiredTypes = sceneNames.map(name => {
        const type = api.ZN[name];
        if (!type) throw new Error('Original order reward scene type is absent: ' + name);
        return type;
      });
      const complete = () => requiredTypes.every(type => tool.sceneModelPools?.has(type) && tool.sceneModelTemplates?.has(type));
      if (!complete()) await tool.initExtraConfigs();
      const missing = requiredTypes.filter(type => !tool.sceneModelPools?.has(type) || !tool.sceneModelTemplates?.has(type));
      if (missing.length) throw new Error('Original order reward prefabs did not initialize: ' + missing.join(', '));
      const result = { initialized: true, originalMethod: 'OrderExtraRewardTool.initExtraConfigs', scenes: requiredTypes, sharedServices: ['SoundRegistry', 'PerFrameExecutor', 'DayNight'] };
      global.__ORIGINAL_RUNTIME_SERVICES__ = result;
      global.__reportOriginal?.('原订单奖励池已初始化：' + requiredTypes.length + ' 个场景');
      return result;
    })().catch(error => { pending = null; throw error; });
    return pending;
  };
})(window);
