// Extracted cached Cocos registration: MergeAnim
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 2810100..2812481.
// Shared closure variables remain in readable/game.formatted.js:136731.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "104ffld2DRHQZRD3eYRYVSQ", "MergeAnim");
var oq = cc._decorator,
  rq = oq.ccclass,
  aq = oq.property,
  sq = oq.menu,
  cq = (function (e) {
    function i() {
      var t = (null !== e && e.apply(this, arguments)) || this;
      return (
        (t.spine = null),
        (t.spine_anim_name = ""),
        (t.anim = null),
        (t.anim_name = ""),
        (t.auto_remove = !0),
        (t.is_loop = !1),
        (t.delayTime = 0),
        (t.cell = null),
        (t.type = TC.BUBBLE),
        (t._showIdx = 0),
        (t.autoRemoveCallback = null),
        (t._playCompletePromise = Promise.resolve()),
        (t._playCompleteResolve = null),
        t
      );
    }
    return (
      t(i, e),
      (i.prototype.setAutoRemoveCallback = function (e) {
        this.autoRemoveCallback = e;
      }),
      (i.prototype.waitForCurrentPlayComplete = function () {
        return this._playCompletePromise;
      }),
      (i.prototype.beginPlay = function () {
        var e = this;
        this.finishPlay();
        var t = !1,
          i = null,
          n = function () {
            t ||
              ((t = !0), e._playCompleteResolve == n && (e._playCompleteResolve = null), i && i());
          };
        return (
          (this._playCompletePromise = new Promise(function (e) {
            i = e;
          })),
          (this._playCompleteResolve = n),
          n
        );
      }),
      (i.prototype.finishPlay = function () {
        var e = this._playCompleteResolve;
        ((this._playCompleteResolve = null), e && e());
      }),
      (i.prototype.onEnable = function () {
        return r(this, void 0, void 0, function () {
          var e, t, i;
          return a(this, function (n) {
            switch (n.label) {
              case 0:
                ((e = this._showIdx), (t = this.beginPlay()), (n.label = 1));
              case 1:
                return (
                  n.trys.push([1, , 8, 9]),
                  this.spine
                    ? [4, ib.playAnimation(this.spine, this.spine_anim_name, this.is_loop)]
                    : [3, 3]
                );
              case 2:
                return (n.sent(), [3, 5]);
              case 3:
                return this.anim
                  ? ((i = this.anim_name ? this.anim_name : null),
                    [
                      4,
                      rb.playAnimation(
                        this.anim,
                        i,
                        this.is_loop ? cc.WrapMode.Loop : cc.WrapMode.Normal,
                      ),
                    ])
                  : [3, 5];
              case 4:
                (n.sent(), (n.label = 5));
              case 5:
                return this.delayTime ? [4, S(this.delayTime)] : [3, 7];
              case 6:
                (n.sent(), (n.label = 7));
              case 7:
                return e != this._showIdx
                  ? [2]
                  : (this.auto_remove &&
                      (this.auto_remove && ot.PutPrefab(this.node),
                      this.cell && this.cell.anims && this.cell.anims.delete(this.type),
                      this.autoRemoveCallback && this.autoRemoveCallback(this.type)),
                    (this.autoRemoveCallback = null),
                    (this.cell = null),
                    [3, 9]);
              case 8:
                return (t(), [7]);
              case 9:
                return [2];
            }
          });
        });
      }),
      (i.prototype.onDisable = function () {
        (this._showIdx++, this.finishPlay());
      }),
      o([aq(sp.Skeleton)], i.prototype, "spine", void 0),
      o([aq(cc.String)], i.prototype, "spine_anim_name", void 0),
      o([aq(cc.Animation)], i.prototype, "anim", void 0),
      o([aq(cc.String)], i.prototype, "anim_name", void 0),
      o([aq([cc.Boolean])], i.prototype, "auto_remove", void 0),
      o([aq([cc.Boolean])], i.prototype, "is_loop", void 0),
      o([aq(Number)], i.prototype, "delayTime", void 0),
      (i = o([rq, sq("MergeCell/MergeAnim")], i))
    );
  })(cc.Component);
cc._RF.pop();
