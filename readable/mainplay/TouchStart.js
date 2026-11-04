// Original shared-closure declaration B9: TouchStart
// Source UTF-16 offsets 4554087..4554826; complete context in game.formatted.js:220713.
// Analysis fragment; not independently executable.

var B9 = (function () {
  function e() {}
  return (
    (e.prototype.touchCallback = function (e, t) {
      var i = G$.GetCellByWorldPos(e.getLocation(), null, t.mergeBoard);
      if ((i && i.cellState == Q2.SNOW && nq.handleAreaLockClick(i), !i || !i.isLock)) {
        if (
          !i ||
          !i.data ||
          G$.IsCellInState(i, mr.box) ||
          (i.data && i.data.freeze) ||
          (G2.FocusCellIdx > 0 && i.serverIdx != G2.FocusCellIdx) ||
          (o8.curGuideId && (!Xz.IsShow || !hT.CurCondition))
        )
          return ((t.curElement = null), void (t.isBlank = !0));
        ((t.isBlank = !1),
          (t.touching = !0),
          G2.PauseTip(),
          t.resetMergeCheck(),
          (t.focusElement = i),
          (t.curElement = i),
          t.focusElement.mergeCellRender.node.stopAllActions(),
          t.focusElement.anims.forEach(function (e, t) {
            e.stopAllActions();
          }),
          (t.focusElement.cellState != Q2.RESET && t.focusElement.cellState != Q2.MOVING) ||
            (t.focusElement.cellState = Q2.STAND));
      }
    }),
    e
  );
})();
