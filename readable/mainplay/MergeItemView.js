// Extracted cached Cocos registration: MergeItemView
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 8466422..8469882.
// Shared closure variables remain in readable/game.formatted.js:410601.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "9372c+AGWNM5bwEmiKPPSQH", "MergeItemView");
var Wqe,
  Uqe = cc._decorator,
  Hqe = Uqe.ccclass,
  Vqe = Uqe.property;
!(function (e) {
  ((e.CLICK_TIPS = "CLICK_TIPS"),
    (e.MANU_CREATOR_ENERGY = "MANU_CREATOR_ENERGY"),
    (e.LOCK = "LOCK"),
    (e.BOX_1 = "BOX_1"),
    (e.BOX_2 = "BOX_2"),
    (e.BOX_3 = "BOX_3"),
    (e.BOX_4 = "BOX_4"),
    (e.BOX_END_1 = "BOX_END_1"),
    (e.BOX_END_2 = "BOX_END_2"),
    (e.BOX_END_3 = "BOX_END_3"),
    (e.BOX_END_4 = "BOX_END_4"),
    (e.SELECTED = "SELECTED"),
    (e.CAN_MERGE = "CAN_MERGE"),
    (e.BG_GREEN = "BG_GREEN"),
    (e.MERGE_1 = "MERGE_1"),
    (e.MERGE_END_1 = "MERGE_END_1"),
    (e.MAX_LEVEL = "MAX_LEVEL"),
    (e.SELECTED_ORDER = "SELECTED_ORDER"));
})(Wqe || (Wqe = {}));
var jqe = [
    TC.COVER_1,
    TC.COVER_2,
    TC.COVER_3,
    TC.COVER_4,
    TC.COVER_END_1,
    TC.COVER_END_2,
    TC.COVER_END_3,
    TC.COVER_END_4,
    TC.LOCK,
    TC.SELECTED,
    TC.CAN_MERGE,
    TC.MERGE_1,
    TC.MERGE_END,
    TC.CLICK_TIPS,
    TC.MANU_CREATOR_ENERGY,
    TC.SELECTED_ORDER,
  ],
  zqe = (function (e) {
    function i() {
      var t = (null !== e && e.apply(this, arguments)) || this;
      return ((t.content = null), (t.view = null), (t.anims = new Map()), (t.renderVersion = 0), t);
    }
    return (
      t(i, e),
      (i.prototype.renderAsync = function (e) {
        return r(this, void 0, void 0, function () {
          var t, i;
          return a(this, function (n) {
            switch (n.label) {
              case 0:
                return (
                  (t = ++this.renderVersion),
                  this.resetItemView(),
                  [4, TJ.GetLoadedElement(e)]
                );
              case 1:
                return (i = n.sent())
                  ? t == this.renderVersion && cc.isValid(this.node)
                    ? ((i.name = "" + e),
                      (i.parent = this.content),
                      (i.position = cc.Vec3.ZERO),
                      (i.active = !0),
                      (this.view = i),
                      [2])
                    : (ot.PutPrefab(i), [2])
                  : [2];
            }
          });
        });
      }),
      (i.prototype.reset = function () {
        (this.renderVersion++, this.resetItemView(), this.removeAnims());
      }),
      (i.prototype.resetItemView = function () {
        (this.view && cc.isValid(this.view) && ot.PutPrefab(this.view), (this.view = null));
      }),
      (i.prototype.addAnimAsync = function (e) {
        return r(this, void 0, void 0, function () {
          var t,
            i,
            n,
            o,
            r,
            s,
            c = this;
          return a(this, function (a) {
            switch (a.label) {
              case 0:
                return (
                  (t = String(e)),
                  (i = this.anims.get(t)) && cc.isValid(i)
                    ? [2, i]
                    : (n = (function (e) {
                          switch (String(e)) {
                            case Wqe.BOX_1:
                              return TC.COVER_1;
                            case Wqe.BOX_2:
                              return TC.COVER_2;
                            case Wqe.BOX_3:
                              return TC.COVER_3;
                            case Wqe.BOX_4:
                              return TC.COVER_4;
                            case Wqe.BOX_END_1:
                              return TC.COVER_END_1;
                            case Wqe.BOX_END_2:
                              return TC.COVER_END_2;
                            case Wqe.BOX_END_3:
                              return TC.COVER_END_3;
                            case Wqe.BOX_END_4:
                              return TC.COVER_END_4;
                            case Wqe.LOCK:
                              return TC.LOCK;
                            case Wqe.SELECTED:
                              return TC.SELECTED;
                            case Wqe.CAN_MERGE:
                              return TC.CAN_MERGE;
                            case Wqe.MERGE_1:
                              return TC.MERGE_1;
                            case Wqe.MERGE_END_1:
                              return TC.MERGE_END;
                            case Wqe.CLICK_TIPS:
                              return TC.CLICK_TIPS;
                            case Wqe.MANU_CREATOR_ENERGY:
                              return TC.MANU_CREATOR_ENERGY;
                            case Wqe.SELECTED_ORDER:
                              return TC.SELECTED_ORDER;
                            default:
                              return null;
                          }
                        })(e))
                      ? [4, TJ.LoadAnimation(n)]
                      : [2, null]
                );
              case 1:
                return (o = a.sent()) && cc.isValid(this.node)
                  ? (((r = ot.GetPrefab(o, 100, 1)).name = t),
                    r.setParent(this.node),
                    r.setPosition(cc.Vec2.ZERO),
                    (r.opacity = 255),
                    (r.zIndex = n == TC.SELECTED ? -1 : 20),
                    this.anims.set(t, r),
                    (s = r.getComponent(cq)) &&
                      ((s.cell = null),
                      (s.type = n),
                      s.setAutoRemoveCallback(function () {
                        c.anims.get(t) == r && c.anims.delete(t);
                      }),
                      (r.active = !1),
                      (r.active = !0)),
                    [2, r])
                  : [2, null];
            }
          });
        });
      }),
      (i.prototype.removeAnim = function (e) {
        var t = String(e),
          i = this.anims.get(t);
        if ((this.anims.delete(t), !i || !cc.isValid(i))) return !1;
        cc.Tween.stopAllByTarget(i);
        var n = i.getComponent(cq);
        return (n && ((n.cell = null), (n.autoRemoveCallback = null)), ot.PutPrefab(i), !0);
      }),
      (i.prototype.removeAnims = function () {
        var e = this;
        Array.from(this.anims.keys()).forEach(function (t) {
          return e.removeAnim(t);
        });
      }),
      (i.prototype.setColor = function (e) {
        var t,
          i =
            null === (t = this.view) || void 0 === t ? void 0 : t.getComponentInChildren(cc.Sprite);
        i && (i.node.color = e);
      }),
      o([Vqe(cc.Node)], i.prototype, "content", void 0),
      (i = o([Hqe], i))
    );
  })(cc.Component);
cc._RF.pop();
