// Extracted cached Cocos registration: DoorElement
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 8353600..8354650.
// Shared closure variables remain in readable/game.formatted.js:405429.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "da8b3YYSHBDma27Mn4FNnGX", "DoorElement");
var fKe = cc._decorator,
  gKe = fKe.ccclass;
fKe.property;
var vKe = fKe.menu;
(!(function (e) {
  function i() {
    return (null !== e && e.apply(this, arguments)) || this;
  }
  (t(i, e),
    (i.prototype.onInitRender = function (e) {
      e3.AddCellAnim(e, TC.BAG_TIPS);
    }),
    (i.prototype.onClickElement = function (e) {
      var t = this,
        i = e.data.config.propEffect,
        n = config.PropEffect.getById(i);
      A8.Alert({
        title: v.getLabel("elementDoor_title"),
        content: n.describe,
        confirmText: n.txt,
        showCancel: !0,
        callback: function (i) {
          return r(t, void 0, void 0, function () {
            return a(this, function (t) {
              return (
                i &&
                  (function () {
                    var t = e.data.config.propEffect;
                    if (t && 12 == ~~(t / 100)) {
                      var i = e.serverIdx,
                        n = config.PropEffect.getById(t);
                      if (n && n.effectParams) {
                        TJ.BoardRequestSend(
                          hm.propUse,
                          {
                            boardId: G2.Data.id,
                            index: i,
                            toIndex: 0,
                            product: null,
                            timestamp: E8.serverTime,
                          },
                          "propuse",
                        );
                        var o = n.effectParams,
                          r = config.Board.getById(o),
                          a = ar[r.actTheme];
                        C4.show({ goScreen: J8.MERGE_SCREEN, boardType: a });
                      }
                    }
                  })(),
                [2]
              );
            });
          });
        },
      });
    }),
    (i = o([gKe, vKe("MergeCell/Logic/DoorElement"), BM("DoorElement")], i)));
})(xM),
  cc._RF.pop());
