// Extracted cached Cocos registration: GooseUI
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 3121734..3126582.
// Shared closure variables remain in readable/game.formatted.js:152251.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "e0384HbKDZPSqovXaOoikKX", "GooseUI");
var AJ = cc._decorator,
  kJ = AJ.ccclass;
AJ.property;
var RJ = (function (e) {
  function i() {
    var t = (null !== e && e.apply(this, arguments)) || this;
    return (
      (t.happyBubble = null),
      (t.failBubble = null),
      (t.favorUp = null),
      (t.progressBar = null),
      (t.lastBar = null),
      (t.valueNum = null),
      (t.levelLable = null),
      (t.goose = null),
      t
    );
  }
  var n;
  return (
    t(i, e),
    (n = i),
    (i.create = function () {
      return r(this, void 0, void 0, function () {
        return a(this, function (e) {
          switch (e.label) {
            case 0:
              return i$.isEditing ? [4, S(66)] : [3, 2];
            case 1:
              return (e.sent(), [3, 0]);
            case 2:
              return [2, this.createNode()];
          }
        });
      });
    }),
    (i.createNode = function () {
      return r(this, void 0, void 0, function () {
        var e, t, i;
        return a(this, function (o) {
          switch (o.label) {
            case 0:
              return this.prefab
                ? [3, 2]
                : ((e = this), [4, Mi(e9.getPrefabPath("Goose/gooseUi"))]);
            case 1:
              ((e.prefab = o.sent()), (o.label = 2));
            case 2:
              return (
                ((t = ot.GetPrefab(this.prefab)).name = "gooseUI"),
                (i = t.getComponent(n)).init(),
                [2, i]
              );
          }
        });
      });
    }),
    (i.prototype.show = function (e) {
      this.node.parent = this.uiRoot;
      var t = e.node.parent.convertToWorldSpaceAR(e.node.position),
        i = this.uiRoot.convertToNodeSpaceAR(t);
      this.node.setPosition(i);
    }),
    (i.prototype.init = function () {
      null == this.uiRoot &&
        GZ.instance &&
        ((this.uiRoot = GZ.instance.uiNode),
        (this.happyBubble = this.node.getChildByName("finishBubble").getComponent(sp.Skeleton)),
        (this.failBubble = this.node.getChildByName("failBubble").getComponent(sp.Skeleton)),
        (this.favorUp = this.node.getComponentInChildren(cc.Animation)),
        (this.progressBar = this.node.getComponentInChildren(cc.ProgressBar)),
        (this.lastBar = this.progressBar.node.getChildByName("lastBar")),
        (this.valueNum = this.progressBar.node.getChildByName("valueNum").getComponent(cc.Label)),
        (this.levelLable = this.favorUp.node.find("icon_favor/levelnum").getComponent(cc.Label)),
        (this.favorUp.node.active = !1),
        (this.happyBubble.node.active = !1));
    }),
    (i.prototype.orderFinish = function (e, t, i, n) {
      return (
        void 0 === i && (i = 0),
        void 0 === n && (n = 1),
        r(this, void 0, void 0, function () {
          var o,
            s,
            c,
            l,
            d,
            u,
            h,
            p = this;
          return a(this, function (f) {
            switch (f.label) {
              case 0:
                return (
                  this.show(e),
                  t
                    ? (LT.shouldShowCollectEfx
                        ? LT.show(this.favorUp.node, !1)
                        : LT.mayPopupWindow(),
                      (o = 0),
                      t.forEach(function (e) {
                        if (e.itemType == oa.favor) o = e.value;
                        else if (e.itemType == oa.cardPoint) {
                          var t = [];
                          (t.push(e), K6.showReward({ rewards: t, flyNode: p.favorUp.node }));
                        }
                      }),
                      (function () {
                        return r(p, void 0, void 0, function () {
                          var e;
                          return a(this, function (i) {
                            switch (i.label) {
                              case 0:
                                ((e = 0), (i.label = 1));
                              case 1:
                                return e < t.length ? [4, S(333)] : [3, 4];
                              case 2:
                                (i.sent(),
                                  CS.flyTipItem(t[e], this.favorUp.node, 60, 1.2, this.node),
                                  (i.label = 3));
                              case 3:
                                return (e++, [3, 1]);
                              case 4:
                                return [2];
                            }
                          });
                        });
                      })(),
                      i > 0 &&
                        ((s = i),
                        (c = Ct.getUI("element")),
                        (function () {
                          return r(p, void 0, void 0, function () {
                            return a(this, function (e) {
                              switch (e.label) {
                                case 0:
                                  return [4, h3.ComplexButterFlyAnim(c, this.favorUp.node, s, n)];
                                case 1:
                                  return (
                                    e.sent(),
                                    (c.scale = 1),
                                    cc
                                      .tween(c)
                                      .to(0.25, { scale: 1.35 }, { easing: "quadInOut" })
                                      .to(0.25, { scale: 1 }, { easing: "quadInOut" })
                                      .start(),
                                    [2]
                                  );
                              }
                            });
                          });
                        })()),
                      (l = void 0),
                      (l = E8.getGooseFavorData(e.gooseId)),
                      (d = l.needFavor),
                      ((u = (l.curFavor - o) / d) > 1 ||
                        (l.curFavor == l.needFavor && l.level == l.maxLevel)) &&
                        (u = 1),
                      (h = (h = l.curFavor / d) > 1 ? 1 : h),
                      (this.levelLable.string = l.level.toString()),
                      (e.node.opacity = 255),
                      e.onDirection(yA.Right, "happy", !0),
                      (this.happyBubble.node.active = !0),
                      (this.favorUp.node.active = !0),
                      ib.playAnimation(this.happyBubble, "finish", !1, !0),
                      (this.lastBar.width = 137 * u),
                      (this.progressBar.progress = 0),
                      (this.lastBar.opacity = 255),
                      (this.valueNum.string = ~~(100 * u).toString() + "%"),
                      [4, rb.playAnimation(this.favorUp, "FavorUpAnim_appear")])
                    : [3, 5]
                );
              case 1:
                return (
                  f.sent(),
                  cc
                    .tween(this.progressBar)
                    .to(
                      0.9,
                      { progress: h },
                      {
                        easing: "linear",
                        onUpdate: function () {
                          p.valueNum.string = ~~(100 * p.progressBar.progress).toString() + "%";
                        },
                      },
                    )
                    .start(),
                  cc.tween(this.lastBar).to(0.6, { opacity: 100 }).start(),
                  rb.playAnimation(this.favorUp, "FavorUpAnim_finish", cc.WrapMode.Loop),
                  [4, S(900)]
                );
              case 2:
                return (f.sent(), this.favorUp.stop(), [4, S(1100)]);
              case 3:
                return (f.sent(), [4, rb.playAnimation(this.favorUp, "FavorUpAnim_dis")]);
              case 4:
                return (
                  f.sent(),
                  (this.happyBubble.node.active = !1),
                  (this.favorUp.node.active = !1),
                  [3, 8]
                );
              case 5:
                return (
                  (this.failBubble.node.active = !0),
                  (e.node.opacity = 255),
                  e.onDirection(yA.Right, "idle", !0),
                  [4, S(66)]
                );
              case 6:
                return (
                  f.sent(),
                  [4, ib.playAnimation(this.failBubble, "hide_" + M(1, 5), !1, !0)]
                );
              case 7:
                (f.sent(), (this.failBubble.node.active = !1), (f.label = 8));
              case 8:
                return (ot.PutPrefab(this.node), [2]);
            }
          });
        })
      );
    }),
    (i.prototype.showFailedAnim = function (e) {
      return r(this, void 0, void 0, function () {
        return a(this, function (t) {
          switch (t.label) {
            case 0:
              return (
                this.show(e),
                (this.goose = e),
                (this.failBubble.node.active = !0),
                (e.node.opacity = 255),
                [4, ib.playAnimation(this.failBubble, "hide_" + M(1, 5), !1, !0)]
              );
            case 1:
              return (
                t.sent(),
                (this.failBubble.node.active = !1),
                ot.PutPrefab(this.node),
                (this.goose = null),
                [2]
              );
          }
        });
      });
    }),
    (i.prototype.update = function (e) {
      if (null != this.goose) {
        var t = this.goose.node.parent.convertToWorldSpaceAR(this.goose.node.position),
          i = this.uiRoot.convertToNodeSpaceAR(t);
        this.node.setPosition(i);
      }
    }),
    (i = n = o([kJ], i))
  );
})(cc.Component);
cc._RF.pop();
