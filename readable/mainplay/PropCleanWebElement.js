// Extracted cached Cocos registration: PropCleanWebElement
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 8415401..8417303.
// Shared closure variables remain in readable/game.formatted.js:408244.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "d51dcYaRltHk6Zx8l07uQTE", "PropCleanWebElement");
var $Ke = cc._decorator,
  eqe = $Ke.ccclass;
$Ke.property;
var tqe = $Ke.menu;
(!(function (e) {
  function i() {
    var t = (null !== e && e.apply(this, arguments)) || this;
    return ((t._hoverCell = null), t);
  }
  (t(i, e),
    (i.prototype.onPutInto = function (e, t) {
      if (t[0].data && G$.IsCellInState(t[0], mr.web) && !e.data.elementType.includes(Z2.BUBBLE)) {
        var i = t[0].data.config.id;
        TJ.BoardRequestSend(
          hm.propUse,
          {
            boardId: G2.Data.id,
            index: e.serverIdx,
            toIndex: t[0].serverIdx,
            product: null,
            timestamp: E8.serverTime,
          },
          "propuse",
          function (e, t) {
            t || EM.instance.claimPendingRewards();
          },
        );
        var n = e.data.config.id;
        (G$.IsCellInState(t[0], mr.web) &&
          ((t[0].data.elementLockStage = mr.none), (t[0].cellState = Q2.STAND)),
          (e.data = null),
          G$.UnlockAroundCells(t[0]),
          (t[0].data = GW.ParseCellConfig(
            {
              id: t[0].data.config.id,
              seed: t[0].data.seed.seed,
              state: t[0].data.elementLockStage,
              productType: vr.none,
            },
            t[0].serverIdx,
          )),
          e3.AddCellAnim(t[0], TC.PROP_USE_CLEAN_WEB),
          cc
            .tween(t[0].mergeCellRender.node)
            .to(0.166, { scaleX: 0.5, scaleY: 0.5 })
            .to(0.166, { scaleX: 1.2, scaleY: 1 })
            .to(0.166, { scaleX: 0.9, scaleY: 1.1 })
            .to(0.166, { scaleX: 1.1, scaleY: 0.95 })
            .to(0.166, { scaleX: 0.95, scaleY: 1 })
            .to(0.166, { scaleX: 1, scaleY: 1 })
            .start(),
          j8.play(o_.PROP_USE_ENERGY),
          u.dispatch("hideElementInfo"),
          K3.logEvent("use_prop", { type: "cleanweb", id: n, toelement: i }));
      }
    }),
    (i.prototype.onStartMove = function (e) {
      e.data.elementType.includes(Z2.BUBBLE) || G2.instance.showCanUseProp(e);
    }),
    (i.prototype.onEndMove = function (e) {
      e.data.elementType.includes(Z2.BUBBLE) || G2.instance.hideCanUseProp();
    }),
    (i.prototype.onHover = function (e, t) {
      t[0].data.elementType.includes(Z2.BUBBLE) ||
        (G$.IsElementPropEffect(t[0].data.config.id, e).isEffect &&
          (e3.AddCellAnim(e, TC.CAN_MERGE), (this._hoverCell = e)));
    }),
    (i.prototype.onHoverEnd = function (e, t) {
      e.data && !e.data.elementType.includes(Z2.BUBBLE) && e3.RemoveCellAnim(e, TC.CAN_MERGE);
    }),
    (i = o([eqe, tqe("MergeCell/Logic/PropCleanWebElement"), BM("PropCleanWebElement")], i)));
})(xM),
  cc._RF.pop());
