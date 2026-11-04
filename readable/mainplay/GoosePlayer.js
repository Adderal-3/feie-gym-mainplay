// Extracted cached Cocos registration: GoosePlayer
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 796713..798910.
// Shared closure variables remain in readable/game.formatted.js:38431.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "a8828i0lO9DOp0+ziPQ8+8i", "GoosePlayer");
var VS = cc._decorator,
  jS = VS.ccclass;
VS.property;
var zS = (function (e) {
  function i() {
    return (null !== e && e.apply(this, arguments)) || this;
  }
  var n;
  return (
    t(i, e),
    (n = i),
    (i.prototype.init = function () {
      null == this.spine &&
        ((this.spine = this.node.getComponent(sp.Skeleton)),
        this.spine.setAnimationCacheMode(sp.Skeleton.AnimationCacheMode.SHARED_CACHE));
    }),
    (i.prototype.remove = function () {
      this.node.removeFromParent(!1);
      var e = n.poolMap.get(this.spineName) || [];
      (e.push(this.node), n.poolMap.set(this.spineName, e));
    }),
    (i.prototype.play = function (e, t, i) {
      return (
        void 0 === t && (t = !1),
        void 0 === i && (i = !0),
        r(this, void 0, void 0, function () {
          return a(this, function (n) {
            return (this.init(), ib.playAnimation(this.spine, e, t, i), [2]);
          });
        })
      );
    }),
    (i.getSpineName = function (e, t) {
      void 0 === t && (t = !1);
      var i = config.Goose.getById(e),
        n = i.icon;
      return (
        t &&
          i.houseIcon &&
          i.houseIcon.length > 0 &&
          xQ.homeScreen.isInHouse() &&
          (n = i.houseIcon),
        n.split("_").join("")
      );
    }),
    (i.newPlayer = function (e, t) {
      return (
        void 0 === t && (t = !1),
        r(this, void 0, void 0, function () {
          var i, o, r, s, c, l;
          return a(this, function (a) {
            switch (a.label) {
              case 0:
                return (
                  (i = this.getSpineName(e, t)),
                  (o = n.poolMap.get(i)) && o.length
                    ? [2, o.shift().getComponent(n)]
                    : null != this.playerNode
                      ? [3, 2]
                      : ((r = this), [4, Mi(e9.getPrefabPath("Goose/gooseplayer"))])
                );
              case 1:
                ((r.playerNode = a.sent()), (a.label = 2));
              case 2:
                return (
                  (s = cc.instantiate(this.playerNode)),
                  [4, Si(e9.getSpinePath("Goose/" + i))]
                );
              case 3:
                return (
                  (c = a.sent()),
                  (s.getComponent(sp.Skeleton).skeletonData = c),
                  (s.name = i),
                  ((l = s.getComponent(n)).spineName = i),
                  [2, l]
                );
            }
          });
        })
      );
    }),
    (i.newPlayerNpc = function (e) {
      return r(this, void 0, void 0, function () {
        var t, i, o, r, s, c, l;
        return a(this, function (a) {
          switch (a.label) {
            case 0:
              return (
                (t = ne(config.Config.config.orderGooseAnime)),
                (i = t.get(e.toString())),
                (o = n.poolMap.get(i)) && o.length
                  ? [2, o.shift().getComponent(n)]
                  : null != this.playerNode
                    ? [3, 2]
                    : ((r = this), [4, Mi(e9.getPrefabPath("Goose/gooseplayer"))])
              );
            case 1:
              ((r.playerNode = a.sent()), (a.label = 2));
            case 2:
              return (
                (s = cc.instantiate(this.playerNode)),
                [4, Si(e9.getSpinePath("GooseNpc/" + i))]
              );
            case 3:
              return (
                (c = a.sent()),
                (s.getComponent(sp.Skeleton).skeletonData = c),
                (s.name = i),
                ((l = s.getComponent(n)).spineName = i),
                [2, l]
              );
          }
        });
      });
    }),
    (i.poolMap = new Map()),
    (i.playerNode = null),
    (i = n = o([jS], i))
  );
})(cc.Component);
cc._RF.pop();
