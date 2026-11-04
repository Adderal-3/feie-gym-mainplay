// Extracted cached Cocos registration: TaskManager
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 469646..471206.
// Shared closure variables remain in readable/game.formatted.js:22373.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "bf714PcUfhFjZ0NQ6n4ztk7", "TaskManager");
var W_ = cc._decorator.ccclass,
  U_ = (function (e) {
    function i() {
      var t = (null !== e && e.apply(this, arguments)) || this;
      return ((t.schedulers = new Map()), (t.updateElapsedSeconds = 0), t);
    }
    var n;
    return (
      t(i, e),
      (n = i),
      Object.defineProperty(i, "instance", {
        get: function () {
          return (
            (this._instance && cc.isValid(this._instance.node)) || this.createInstance(),
            this._instance
          );
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(i.prototype, "mainScheduler", {
        get: function () {
          return this.getScheduler("main");
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(i.prototype, "subScheduler", {
        get: function () {
          return this.getScheduler("sub");
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(i.prototype, "guideScheduler", {
        get: function () {
          return this.getScheduler("guide");
        },
        enumerable: !1,
        configurable: !0,
      }),
      (i.prototype.onLoad = function () {
        n._instance = this;
      }),
      (i.prototype.lateUpdate = function (e) {
        ((this.updateElapsedSeconds += e),
          this.updateElapsedSeconds < n.UPDATE_INTERVAL_SECONDS ||
            ((this.updateElapsedSeconds %= n.UPDATE_INTERVAL_SECONDS),
            this.schedulers.forEach(function (e) {
              (e.execute(), e.update());
            })));
      }),
      (i.prototype.onDestroy = function () {
        n._instance == this && (n._instance = null);
      }),
      (i.prototype.getScheduler = function (e) {
        return (this.schedulers.has(e) || this.schedulers.set(e, new F_()), this.schedulers.get(e));
      }),
      (i.createInstance = function () {
        var e = new cc.Node("TaskManager");
        ((e.parent = cc.director.getScene()),
          (this._instance = e.addComponent(n)),
          cc.game.addPersistRootNode(e));
      }),
      (i.UPDATE_INTERVAL_SECONDS = 0.066),
      (i._instance = null),
      (i = n = o([W_("TaskManager")], i))
    );
  })(cc.Component);
cc._RF.pop();
