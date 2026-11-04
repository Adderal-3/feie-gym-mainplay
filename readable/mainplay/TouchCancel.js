// Original shared-closure declaration qqe: TouchCancel
// Source UTF-16 offsets 8479486..8480002; complete context in game.formatted.js:411302.
// Analysis fragment; not independently executable.

var qqe = (function () {
  function e() {}
  return (
    (e.prototype.touchCallback = function (e, t) {
      (G2.ResumeTip(),
        nq.clearKeyDropFeedback(),
        !t.isBlank &&
          t.touching &&
          ((t.touching = !1),
          t.focusElement &&
            t.focusElement.data &&
            (t.focusElement.cellState != Q2.LOCK &&
              t.focusElement.cellState != Q2.SNOW &&
              (t.focusElement.mergeCellRender.callLogic(RA.END_MOVE, !1, t.focusElement),
              t.focusElement.moveElementTo(t.focusElement.worldPos, null, !1, null, !1),
              (t.selectedElement = t.focusElement),
              (t.focusElement.cellState = Q2.STAND)),
            t.curElement && t.clearCurElement())));
    }),
    e
  );
})();
