/* Restore the original home entry trigger when booting directly into the original merge screen.
 * Geometry, maps, actors, construction views and their lifecycle remain owned by recovered classes.
 */
(function (global) {
  'use strict';
  var requiredAssets = [
    'Prefab/UI/Home/HomeScreen',
    'Prefab/Map/mainMap',
    'Prefab/Map/streetMap',
    'Prefab/UI/Build/BuildEditEnter',
    'Prefab/LoadingMini/BuildLoad',
    'Prefab/UI/Home/SwitchWindow',
  ];
  var pendingHome = null;

  global.setupOriginalHome = async function (api, options) {
    options = options || {};
    api = api || global.OriginalGameBridge || global.__ORIGINAL__;
    if (global.__ORIGINAL_HOME_SETUP__) return global.__ORIGINAL_HOME_SETUP__;
    if (!api || !api.E8 || !api.E8.role || !api.v4 || !api.o9 || !api.J8) throw new Error('原主页需要已初始化的角色与页面导航器');
    var canvas = options.canvas || global.__ORIGINAL_CANVAS__;
    if (!canvas || !canvas.activeInHierarchy) throw new Error('原主页需要运行中的持久 Canvas');
    var GameWorld = api.s5 || cc.js.getClassByName('GameWorld');
    var HomeScreen = api.GZ || cc.js.getClassByName('HomeScreen');
    if (!GameWorld || !HomeScreen || typeof HomeScreen.loginHome !== 'function') throw new Error('原 GameWorld/HomeScreen 类尚未加载');
    var world = GameWorld.instance || canvas.getComponent(GameWorld);
    if (!world) world = canvas.addComponent(GameWorld);
    if (!world) throw new Error('原 GameWorld 组件未能创建');
    world.enabled = true;
    // The original component's onLoad owns its singleton and original ECS initialization.
    if (!GameWorld.instance) throw new Error('原 GameWorld.onLoad 尚未建立实例');
    var houseData = api.v4.instance.houseData;
    if (!houseData || houseData.getHouseId() !== 0) throw new Error('此本地入口目前只接入原主健身房，不切换未初始化的扩展房间');
    if (!world.curWorld) HomeScreen.needLoginHome = true;

    var originalLoginHome = HomeScreen.loginHome;
    HomeScreen.loginHome = function () {
      if (pendingHome) return pendingHome;
      var self = this, args = arguments;
      pendingHome = Promise.resolve().then(function () {
        // Calls the original implementation: HomeView.enter -> original MapLoader/BuildMap
        // -> GameWorld.changeHouse -> original goose/movement/behavior/pathfinding systems.
        return originalLoginHome.apply(self, args);
      }).then(function (result) {
        state.entered = !!world.curWorld;
        state.houseId = world.curWorld ? world.curWorld.houseId : null;
        state.lastError = null;
        return result;
      }, function (error) {
        state.lastError = String(error.message || error);
        throw error;
      }).finally(function () { pendingHome = null; });
      return pendingHome;
    };

    var originalShowScreen = api.o9.showScreen;
    api.o9.showScreen = async function (screenId) {
      var result = await originalShowScreen.apply(this, arguments);
      if (screenId === api.J8.HOME_SCREEN && HomeScreen.needLoginHome) {
        // SwitchWindow normally invokes loginHome after its original exit animation.
        // For a direct navigator entry, supply that same missing bootstrap trigger.
        if (!api.C4 || !api.C4.isEntering) await HomeScreen.loginHome();
      }
      return result;
    };

    var state = {
      prepared: true,
      entered: !!world.curWorld,
      houseId: world.curWorld ? world.curWorld.houseId : null,
      lastError: null,
      waitReady: function () {
        return pendingHome || (world.curWorld ? Promise.resolve() : HomeScreen.loginHome());
      },
      requiredAssets: requiredAssets.slice(),
      originalLifecycle: 'HomeScreen.loginHome -> HomeView.enter -> MapLoader.loadMap -> BuildMap.init -> GameWorld.changeHouse',
    };
    global.__ORIGINAL_HOME_SETUP__ = state;
    return state;
  };
})(window);
