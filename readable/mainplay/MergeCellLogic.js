// Extracted cached Cocos registration: MergeCellLogic
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 1782107..1782633.
// Shared closure variables remain in readable/game.formatted.js:87178.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "f4e85rHnVBNe6kQE0xSQ5Uv", "MergeCellLogic");
var LM = cc._decorator,
  NM = LM.ccclass;
LM.property;
var OM = LM.menu,
  xM = (function (e) {
    function i() {
      var t = (null !== e && e.apply(this, arguments)) || this;
      return ((t.funcMap = new Map()), (t.render = null), t);
    }
    return (
      t(i, e),
      (i.prototype.initLogic = function () {
        for (var e in RA) {
          var t = RA[e];
          this[t] && this.funcMap.set(RA[e], this[t]);
        }
        ((this.render = this.node.getComponent(DM)), this.render.regist(this.funcMap, this));
      }),
      (i = o([NM, OM("MergeCell/MergeCellLogic")], i))
    );
  })(cc.Component);
var MM = new Map();
cc._RF.pop();
