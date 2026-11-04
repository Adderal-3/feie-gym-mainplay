// Extracted cached Cocos registration: PropInsideBagElement
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 8425866..8427976.
// Shared closure variables remain in readable/game.formatted.js:408707.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "de323J17L9DGY1+COJUaQwY", "PropInsideBagElement");
var cqe = cc._decorator,
  lqe = cqe.ccclass;
cqe.property;
var dqe = cqe.menu;
(!(function (e) {
  function n() {
    var t = (null !== e && e.apply(this, arguments)) || this;
    return ((t._hoverCell = null), t);
  }
  (t(n, e),
    (n.prototype.onPutInto = function (e, t) {
      return r(this, void 0, void 0, function () {
        var n, o, r, s;
        return a(this, function (a) {
          switch (a.label) {
            case 0:
              if (!t[0].data) return [2];
              if (e.data.elementType.includes(Z2.BUBBLE)) return [2];
              (d.emit(i.OnceVibrate, { type: by.Medium, source: "使用背包内兜" }),
                (n = e.data.config.id),
                (o = t[0].data.config.id),
                (r = 0),
                (s = function (e) {
                  r = e ? 1 : 2;
                }),
                j_.showWindow(F3.MergeConfirmWindow, {
                  cb: s.bind(this),
                  id: e.data.config.id,
                  type: "insideBag",
                }),
                (a.label = 1));
            case 1:
              return 0 != r ? [3, 3] : [4, S(33)];
            case 2:
              return (a.sent(), [3, 1]);
            case 3:
              return (
                d.emit(i.OnceVibrate, { type: by.Medium, source: "使用背包内兜二次确认关闭" }),
                2 == r
                  ? (e.moveElementTo(e.worldPos), [2])
                  : ((e.data = null),
                    G2.Data.bag.extSize++,
                    t[0].resetTween(),
                    (t[0].tweenLock = !0),
                    cc
                      .tween(t[0].mergeCellRender.node_icon)
                      .to(0.1, { scale: 0.5 })
                      .to(0.166, { scale: 1.15 })
                      .to(0.1, { scale: 1 })
                      .call(function () {
                        ((t[0].tweenLock = !1), t[0].showElementTween());
                      })
                      .start(),
                    e3.AddCellAnim(t[0], TC.MERGE_3),
                    j8.play(o_.PROP_USE_ENERGY),
                    K3.logEvent("use_prop", { type: "levelup", id: n, toelement: o }),
                    TJ.BoardRequestSend(
                      hm.propUse,
                      {
                        boardId: G2.Data.id,
                        index: e.serverIdx,
                        toIndex: t[0].serverIdx,
                        product: [],
                        timestamp: E8.serverTime,
                      },
                      "propuse",
                    ),
                    [2])
              );
          }
        });
      });
    }),
    (n.prototype.onStartMove = function (e) {
      e.data.elementType.includes(Z2.BUBBLE) || G2.instance.showCanUseProp(e);
    }),
    (n.prototype.onEndMove = function (e) {
      e.data.elementType.includes(Z2.BUBBLE) || G2.instance.hideCanUseProp();
    }),
    (n.prototype.onHover = function (e, t) {
      t[0].data.elementType.includes(Z2.BUBBLE) ||
        (G$.IsElementPropEffect(t[0].data.config.id, e).isEffect &&
          (e3.HideCellLayerAnim(e, TC.PROP_SHOW_LEVELUP),
          e3.AddCellAnim(e, TC.CAN_MERGE),
          (this._hoverCell = e)));
    }),
    (n.prototype.onHoverEnd = function (e, t) {
      e.data &&
        !e.data.elementType.includes(Z2.BUBBLE) &&
        (this._hoverCell && e3.AddCellAnim(this._hoverCell, TC.PROP_SHOW_LEVELUP),
        e3.RemoveCellAnim(e, TC.CAN_MERGE));
    }),
    (n = o([lqe, dqe("MergeCell/Logic/PropInsideBagElement"), BM("PropInsideBagElement")], n)));
})(xM),
  cc._RF.pop());
