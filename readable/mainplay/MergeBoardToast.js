// Extracted cached Cocos registration: MergeBoardToast
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 8301250..8301641.
// Shared closure variables remain in readable/game.formatted.js:403181.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "9577cfPfmJOzLZ6H8zVOLkK", "MergeBoardToast");
var Dze = cc._decorator,
  Bze = Dze.ccclass,
  Lze = Dze.property;
(!(function (e) {
  function i() {
    var t = (null !== e && e.apply(this, arguments)) || this;
    return ((t.numberFont = null), t);
  }
  (t(i, e),
    (i.prototype.onLoad = function () {
      this.node.active = !1;
    }),
    o([Lze(cc.Font)], i.prototype, "numberFont", void 0),
    (i = o([Bze("MergeBoardToast")], i)));
})(cc.Component),
  cc._RF.pop());
