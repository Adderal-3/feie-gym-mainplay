// Extracted cached Cocos registration: DeterioratedElement
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 3377605..3378515.
// Shared closure variables remain in readable/game.formatted.js:164833.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "86b3c8QRV9Pqr6RrZS2+72j", "DeterioratedElement");
var L$ = cc._decorator,
  N$ = L$.ccclass;
L$.property;
var O$ = L$.menu,
  x$ = (function (e) {
    function i() {
      return (null !== e && e.apply(this, arguments)) || this;
    }
    return (
      t(i, e),
      (i.prototype.onInitRender = function (e) {
        if (
          e.data.config.deterioratedDuration > 0 &&
          !e.data.elementType.includes(Z2.BUBBLE) &&
          !G$.IsCellInState(e, mr.web) &&
          !G$.IsCellInState(e, mr.box)
        ) {
          var t = e3.AddCellAnim(e, TC.DETERIORATED).getComponent(B$);
          (e.registComponent("DeterioratedRecover", t), t && (t.data = e));
          var i = config.Board.getById(G2.Data.boardId);
          i && i.elementId && i.elementId == e.data.config.id && A$.playMusic(G2.MergeBoardType);
        }
      }),
      (i.prototype.onTimeChange = function (e) {
        this.updateRecover(e);
      }),
      (i.prototype.updateRecover = function (e) {
        var t = e.dynamicComponents.get("DeterioratedRecover");
        t && t.onUpdate(null);
      }),
      (i = o([N$, O$("MergeCell/Logic/DeterioratedElement"), BM("DeterioratedElement")], i))
    );
  })(xM);
cc._RF.pop();
