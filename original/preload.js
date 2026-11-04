(function () {
  'use strict';
  window.preloadOriginalMainplay = async function (api) {
    if (!api?.t9?.loadAnimations || !api.TC) throw new Error('Original animation preloader is unavailable');
    // Use the recovered queue/cache over the complete original TC enumeration.
    await api.t9.loadAnimations(true);
    const animations = [...new Set(Object.values(api.TC))];
    const loaded = animations.map(name => api.e9.getElementAnimPrefabPath(name + 'Anim'));
    for (const path of loaded) if (!api.t9.prefabAnim.has(path)) throw new Error('Original animation did not load: ' + path);
    window.__ORIGINAL_MAINPLAY_ANIMATIONS__ = animations;
    if (api.SJ?.planPrefabs) {
      const plans=[[0,'Prefab/NewElement/element'],[2,'Prefab/NewElement/element_ready'],[3,'Prefab/NewElement/element_finish']];
      await Promise.all(plans.map(async ([type,asset]) => {
        if (!api.SJ.planPrefabs.has(type)) {
          const bundle = cc.assetManager.getBundle('remoteAsset');
          const prefab = await new Promise((resolve,reject) => bundle.load(asset,cc.Prefab,(error,prefab)=>error?reject(error):resolve(prefab)));
          api.SJ.planPrefabs.set(type,prefab);
        }
      }));
    }
    window.__ORIGINAL_PRELOAD__={animations:loaded,elementPlans:api.SJ?.planPrefabs?.size||0};
    window.__reportOriginal?.('原棋盘动画已加载：'+loaded.length+' 项');
    return window.__ORIGINAL_PRELOAD__;
  };
})();
