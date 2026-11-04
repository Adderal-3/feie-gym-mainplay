// Extracted cached Cocos registration: MergeToucher
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 8480003..8481367.
// Shared closure variables remain in readable/game.formatted.js:411324.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "0a55bmpm81K77qhAf4zh/Xv", "MergeToucher");
var Yqe = cc._decorator,
  Xqe = Yqe.ccclass,
  Jqe = Yqe.property;
(!(function (e) {
  function i() {
    var t = (null !== e && e.apply(this, arguments)) || this;
    return (
      (t.toucher = null),
      (t._startLogic = new B9()),
      (t._moveLogic = new D9()),
      (t._endLogic = new P9()),
      (t._cancleLogic = new qqe()),
      t
    );
  }
  (t(i, e),
    (i.prototype.onLoad = function () {
      (this.toucher || (this.toucher = this.node),
        this.toucher.targetOff(this.toucher),
        this.toucher.on(cc.Node.EventType.TOUCH_START, this._start, this),
        this.toucher.on(cc.Node.EventType.TOUCH_MOVE, this._move, this),
        this.toucher.on(cc.Node.EventType.TOUCH_END, this._end, this),
        this.toucher.on(cc.Node.EventType.TOUCH_CANCEL, this._cancle, this));
    }),
    (i.prototype._start = function (e) {
      (G2.instance && G2.instance.toucherLock) ||
        (u.dispatch("board_touch_start", [e]), this._startLogic.touchCallback(e, G2.instance));
    }),
    (i.prototype._move = function (e) {
      (G2.instance && G2.instance.toucherLock) ||
        (u.dispatch("board_touch_move", [e]), this._moveLogic.touchCallback(e, G2.instance));
    }),
    (i.prototype._end = function (e) {
      (G2.instance && G2.instance.toucherLock) ||
        (u.dispatch("board_touch_end", [e]), this._endLogic.touchCallback(e, G2.instance));
    }),
    (i.prototype._cancle = function (e) {
      (G2.instance && G2.instance.toucherLock) ||
        (u.dispatch("board_touch_cancel", [e]), this._cancleLogic.touchCallback(e, G2.instance));
    }),
    o([Jqe(cc.Node)], i.prototype, "toucher", void 0),
    (i = o([Xqe], i)));
})(cc.Component),
  cc._RF.pop());
