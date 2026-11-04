// Extracted cached Cocos registration: FrozenBubbleElement
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 7528517..7529688.
// Shared closure variables remain in readable/game.formatted.js:366741.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "6146dyIs7dDJ4EMd0LQNp3y", "FrozenBubbleElement");
var yOe = cc._decorator,
  _Oe = yOe.ccclass,
  bOe = yOe.menu;
(!(function (e) {
  function i() {
    var t = (null !== e && e.apply(this, arguments)) || this;
    return ((t._curAnimIdx = 0), t);
  }
  (t(i, e),
    (i.prototype.onInitElement = function (e) {
      ((e.mergeCellRender.node_icon.scale = 1),
        e.data.elementType.includes(Z2.BUBBLE) &&
          ((e.scaleCache = 0.8), (e.mergeCellRender.node_icon.scale = e.scaleCache)));
      var t = e3.AddCellAnim(e, TC.FROZEN_BUBBLE).getComponent(mOe);
      ((t.data = e.data), e.registComponent("FrozenBubbleRecover", t));
    }),
    (i.prototype.onSelectElement = function (e) {
      var t = this,
        i = e.data.clientId,
        n = e.dynamicComponents.get("FrozenBubbleRecover");
      if (n) {
        r(t, void 0, void 0, function () {
          var t, o;
          return a(this, function (r) {
            switch (r.label) {
              case 0:
                return e.data
                  ? (j8.play(o_.MERGE_SELECT_BUBBLE),
                    (t = n.node.getComponentInChildren(sp.Skeleton)),
                    this._curAnimIdx++,
                    (o = this._curAnimIdx),
                    [4, ib.playAnimation(t, "icewait", !1)])
                  : [2];
              case 1:
                return (
                  r.sent(),
                  e.data && e.data.clientId == i
                    ? (o != this._curAnimIdx || ib.playAnimation(t, "iceidle", !0), [2])
                    : [2]
                );
            }
          });
        });
      }
    }),
    (i.prototype.onSelectSound = function (e) {}),
    (i = o([_Oe, bOe("MergeCell/Logic/FrozenBubbleElement"), BM("FrozenBubbleElement")], i)));
})(xM),
  cc._RF.pop());
