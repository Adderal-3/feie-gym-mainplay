// Extracted cached Cocos registration: OrderInfoItem
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 1051322..1051867.
// Shared closure variables remain in readable/game.formatted.js:51215.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "81567Tzc9JDTa5GXiaC9l/O", "OrderInfoItem");
var pk = cc._decorator,
  fk = pk.ccclass;
pk.property;
var gk = (function (e) {
  function i() {
    return (null !== e && e.apply(this, arguments)) || this;
  }
  return (
    t(i, e),
    (i.prototype.onInit = function () {}),
    (i.prototype.setDisplay = function () {
      return r(this, void 0, void 0, function () {
        return a(this, function (e) {
          return [2];
        });
      });
    }),
    (i.prototype.onPaySucc = function () {}),
    (i.prototype.onHide = function () {}),
    (i.prototype.addBinder = function (e, t, i) {
      G2.BoardRender.orderInfo.addBinder(e, t, i);
    }),
    (i = o([fk], i))
  );
})(cc.Component);
cc._RF.pop();
