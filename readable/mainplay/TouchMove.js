// Original shared-closure declaration D9: TouchMove
// Source UTF-16 offsets 4552683..4554086; complete context in game.formatted.js:220659.
// Analysis fragment; not independently executable.

var D9 = (function () {
  function e() {
    this._moveOffset = 10;
  }
  return (
    (e.prototype.touchCallback = function (e, t) {
      if (
        !t.isBlank &&
        t.touching &&
        t.focusElement &&
        t.focusElement.data &&
        !t.focusElement.isLock &&
        !t.focusElement.data.cannotMove &&
        (t.focusElement.cellState == Q2.MOVING || this.canStartMove(e))
      ) {
        G$.IsCellInState(t.focusElement, mr.web) ||
          t.focusElement.cellState == Q2.SNOW ||
          (t.detailInfoElement = t.focusElement);
        var i = e.getLocation();
        nq.refreshKeyDropFeedback(t.focusElement, i);
        var n = G$.GetCellByWorldPos(i, null, t.mergeBoard);
        (n && n.isLock && (n = null),
          n
            ? (t.curElement &&
                n != t.curElement &&
                t.focusElement.mergeCellRender.callLogic(RA.HOVER_END, !1, t.curElement),
              (t.curElement = n))
            : t.curElement &&
              (t.focusElement.mergeCellRender.callLogic(RA.HOVER_END, !1, t.curElement),
              t.clearCurElement()),
          G$.IsCellInState(t.focusElement, mr.web) ||
            t.focusElement.cellState == Q2.COVER ||
            t.focusElement.cellState == Q2.LOCK ||
            t.focusElement.cellState == Q2.SNOW ||
            (t.focusElement.cellState != Q2.MOVING &&
              t.focusElement.mergeCellRender.callLogic(RA.START_MOVE, !1, t.focusElement, n),
            (t.focusElement.cellState = Q2.MOVING),
            (t.selectedElement = null),
            t.focusElement.setElementTo(i, !1, !0),
            n &&
              !n.canDoCheck &&
              (n != t.focusElement &&
                t.focusElement.mergeCellRender.callLogic(RA.HOVER, !1, n, t.focusElement),
              (n.canDoCheck = !0))));
      }
    }),
    (e.prototype.canStartMove = function (e) {
      var t = e.getStartLocation(),
        i = e.getLocation();
      return Math.abs(i.x - t.x) > this._moveOffset || Math.abs(i.y - t.y) > this._moveOffset;
    }),
    e
  );
})();
