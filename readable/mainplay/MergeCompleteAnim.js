// Extracted cached Cocos registration: MergeCompleteAnim
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 8581146..8582492.
// Shared closure variables remain in readable/game.formatted.js:415651.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "d8480SUkdlMq7v8ltbjoKFb", "MergeCompleteAnim");
var bXe = cc._decorator,
  wXe = bXe.ccclass,
  CXe = bXe.property;
(!(function (e) {
  function i() {
    var t = (null !== e && e.apply(this, arguments)) || this;
    return (
      (t.sprite_current = null),
      (t.sprite_move = null),
      (t.node_current = null),
      (t.node_move = null),
      t
    );
  }
  (t(i, e),
    (i.prototype.showAnim = function (e, t, i, n) {
      return r(this, void 0, void 0, function () {
        var o,
          r = this;
        return a(this, function (a) {
          switch (a.label) {
            case 0:
              return (
                (o = this.node_current.parent.convertToNodeSpaceAR(n)),
                (this.node_move.position = this.node_move.parent.convertToNodeSpaceAR(i)),
                (this.node_current.position = o),
                Ai(this.sprite_move, e9.getElementTexturePath(e), y.BorderScale, !0),
                Ai(this.sprite_current, e9.getElementTexturePath(e), y.BorderScale, !0),
                (this.node_current.scale = 1),
                (this.node_move.scale = 1),
                cc
                  .tween(this.node_current)
                  .to(0.1, { scale: 0.5 })
                  .to(0.166, { scale: 1.15 })
                  .call(function () {
                    return Ai(r.sprite_current, e9.getElementTexturePath(t), y.BorderScale, !0);
                  })
                  .to(0.1, { scale: 1 })
                  .start(),
                cc.tween(this.node_move).to(0.366, { scale: 0.2, position: o }).start(),
                [4, S(370)]
              );
            case 1:
              return (a.sent(), ot.PutPrefab(this.node), [2]);
          }
        });
      });
    }),
    o([CXe(cc.Sprite)], i.prototype, "sprite_current", void 0),
    o([CXe(cc.Sprite)], i.prototype, "sprite_move", void 0),
    o([CXe(cc.Node)], i.prototype, "node_current", void 0),
    o([CXe(cc.Node)], i.prototype, "node_move", void 0),
    (i = o([wXe], i)));
})(cc.Component),
  cc._RF.pop());
