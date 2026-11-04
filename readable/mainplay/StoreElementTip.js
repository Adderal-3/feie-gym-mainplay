// Extracted cached Cocos registration: StoreElementTip
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 8457173..8458671.
// Shared closure variables remain in readable/game.formatted.js:410153.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "85387ZIvQFDuoR0WYFtSz49", "StoreElementTip");
var Pqe = cc._decorator,
  Dqe = Pqe.ccclass,
  Bqe = Pqe.property,
  Lqe = (function (e) {
    function i() {
      var t = (null !== e && e.apply(this, arguments)) || this;
      return ((t.labelDesc = null), (t.icon = null), t);
    }
    var n;
    return (
      t(i, e),
      (n = i),
      (i.play = function (e) {
        return r(this, void 0, void 0, function () {
          var t, i, o, r, s, c;
          return a(this, function (a) {
            switch (a.label) {
              case 0:
                return e ? [4, Mi(this.PREFAB_URL)] : [2];
              case 1:
                if (!(t = a.sent())) return [2];
                a.label = 2;
              case 2:
                return (
                  a.trys.push([2, , 5, 6]),
                  (t.active = !1),
                  (i = t.getComponent(n))
                    ? [4, i.render(e)]
                    : (cc.error("StoreElementTip is missing StoreElementTip component"), [2])
                );
              case 3:
                if (
                  (a.sent(),
                  (t.parent = Ne.getLayer(Be.FACEUI)),
                  t.setPosition(cc.Vec2.ZERO),
                  (t.active = !0),
                  j8.play(o_.STORE_ELEMENT_LUCKY),
                  0 == (o = t.getComponentsInChildren(dE)).length)
                )
                  return (cc.error("StoreElementTip is missing AnimationPlayer"), [2]);
                for (r = [], s = 0, c = o.length; s < c; s++) r.push(o[s].play());
                return [4, Promise.all(r)];
              case 4:
                return (a.sent(), [3, 6]);
              case 5:
                return (t.destroy(), [7]);
              case 6:
                return [2];
            }
          });
        });
      }),
      (i.prototype.render = function (e) {
        return r(this, void 0, void 0, function () {
          return a(this, function (t) {
            switch (t.label) {
              case 0:
                return (
                  (this.labelDesc.string = v.getLabel("storeElement_luckyDropActivated")),
                  [4, Ai(this.icon, e9.getElementTexturePath(e), y.BorderScale, !0)]
                );
              case 1:
                return (t.sent(), [2]);
            }
          });
        });
      }),
      (i.PREFAB_URL = "Prefab/UI/Merge/StoreElementTip"),
      o([Bqe(cc.Label)], i.prototype, "labelDesc", void 0),
      o([Bqe(cc.Sprite)], i.prototype, "icon", void 0),
      (i = n = o([Dqe], i))
    );
  })(cc.Component);
cc._RF.pop();
