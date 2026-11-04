// Extracted cached Cocos registration: MergeGuideTip
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 2700869..2702814.
// Shared closure variables remain in readable/game.formatted.js:131411.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "a1d0aUonOJCPrjVkZESO2nQ", "MergeGuideTip");
var Qz,
  Zz,
  $z,
  eK,
  tK = cc._decorator,
  iK = tK.ccclass,
  nK = tK.property,
  oK = (function (e) {
    function i() {
      var t = (null !== e && e.apply(this, arguments)) || this;
      return (
        (t.btn_hide = null),
        (t.label_content = null),
        (t.sprite_tip = null),
        (t.callBacks = []),
        t
      );
    }
    var n;
    return (
      t(i, e),
      (n = i),
      (i.prototype.onLoad = function () {
        this.btn_hide.on("click", this.onClickHide, this);
      }),
      (i.prototype.hide = function () {
        return r(this, void 0, void 0, function () {
          return a(this, function (e) {
            return this.node.activeInHierarchy
              ? ((this.node.active = !1), this.node.removeFromParent(), [2])
              : [2];
          });
        });
      }),
      (i.prototype.show = function (e, t, i) {
        (void 0 === i && (i = null),
          i && -1 == this.callBacks.indexOf(i) && this.callBacks.push(i),
          Ai(this.sprite_tip, t),
          (this.node.parent = Ne.getLayer(Be.TIP)));
        var n = Ne.statusNotchHeight > 0 ? Ne.statusNotchHeight - 17 : 0;
        ((this.node.y = (this.node.parent.height / 2) * 0.6 - n),
          (this.label_content.string = e),
          (this.node.active = !0),
          rb.playAnimation(this.node.getComponent(cc.Animation)));
      }),
      (i.prototype.onClickHide = function () {
        var e = this;
        this.node.activeInHierarchy &&
          (this.hide(),
          this.callBacks.length &&
            setTimeout(function () {
              (e.callBacks.forEach(function (e) {
                e();
              }),
                (e.callBacks = []));
            }, 0));
      }),
      (i.show = function (e, t, i) {
        return (
          void 0 === i && (i = null),
          r(this, void 0, void 0, function () {
            var o, r;
            return a(this, function (a) {
              switch (a.label) {
                case 0:
                  return cc.isValid(this.view)
                    ? [3, 2]
                    : ((o = this), [4, Mi("Prefab/UI/Merge/MergeGuideTip")]);
                case 1:
                  ((o.view = a.sent()), (a.label = 2));
                case 2:
                  return ((r = this.view.getComponent(n)).show(e, t, i), [2, r]);
              }
            });
          })
        );
      }),
      (i.isRunning = function () {
        return this.view && this.view.activeInHierarchy;
      }),
      (i.hide = function () {
        return r(this, void 0, void 0, function () {
          return a(this, function (e) {
            return (
              this.view &&
                this.view.activeInHierarchy &&
                ((this.view.active = !1), this.view.getComponent(n).onClickHide()),
              [2]
            );
          });
        });
      }),
      o([nK(cc.Node)], i.prototype, "btn_hide", void 0),
      o([nK(cc.Label)], i.prototype, "label_content", void 0),
      o([nK(cc.Sprite)], i.prototype, "sprite_tip", void 0),
      (i = n = o([iK], i))
    );
  })(cc.Component);
cc._RF.pop();
