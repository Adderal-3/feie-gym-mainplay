// Extracted cached Cocos registration: ElementCloset
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 8557317..8557790.
// Shared closure variables remain in readable/game.formatted.js:414676.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "75a0aXGg2hDkIXwoZmnhBPv", "ElementCloset");
var XYe = cc._decorator,
  JYe = XYe.ccclass;
(XYe.property,
  (function (e) {
    function i() {
      var t = (null !== e && e.apply(this, arguments)) || this;
      return ((t.pos = cc.v2()), (t.dis = 0), t);
    }
    (t(i, e),
      (i.prototype.onLoad = function () {
        u.add("putElementIntoCloset", this.onPutElementIntoCloset, this);
      }),
      (i.prototype.onPutElementIntoCloset = function () {
        cc.tween(this.node).to(0.1, { scale: 1.3 }).to(0.1, { scale: 1 }).start();
      }),
      (i = o([JYe], i)));
  })(cc.Component),
  cc._RF.pop());
