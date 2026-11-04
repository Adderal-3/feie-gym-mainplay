// Extracted cached Cocos registration: OrderGroupList
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 8665720..8666373.
// Shared closure variables remain in readable/game.formatted.js:419709.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "9beebV9QbhLkKb25ZSZsd2S", "OrderGroupList");
var QXe = cc._decorator,
  ZXe = QXe.ccclass,
  $Xe = QXe.property;
(!(function (e) {
  function i() {
    var t = (null !== e && e.apply(this, arguments)) || this;
    return ((t.prefab_item = null), t);
  }
  (t(i, e),
    (i.prototype.onData = function () {
      return r(this, void 0, void 0, function () {
        var e, t, i, n;
        return a(this, function (o) {
          for (
            e = this.data,
              t = config.OrderGroupBasic.getById(e),
              this.node.destroyAllChildren(),
              i = 0;
            i < t.includeGroup.length;
            i++
          )
            ((n = ot.GetPrefab(this.prefab_item)),
              (n.getComponent(JXe).data = t.includeGroup[i]),
              this.node.addChild(n));
          return [2];
        });
      });
    }),
    o([$Xe(cc.Prefab)], i.prototype, "prefab_item", void 0),
    (i = o([ZXe], i)));
})($_),
  cc._RF.pop());
