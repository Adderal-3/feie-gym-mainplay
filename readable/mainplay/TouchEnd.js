// Original shared-closure declaration P9: TouchEnd
// Source UTF-16 offsets 4548993..4552682; complete context in game.formatted.js:220521.
// Analysis fragment; not independently executable.

var P9 = (function () {
  function e() {}
  return (
    (e.prototype.touchCallback = function (e, t) {
      if (
        (G2.ResumeTip(),
        nq.clearKeyDropFeedback(),
        !t.isBlank &&
          t.focusElement &&
          t.focusElement.data &&
          t.focusElement.cellState != Q2.COVER &&
          t.focusElement.cellState != Q2.SNOW)
      ) {
        if (t.focusElement.isLock) return ((t.curElement = null), void (t.touching = !1));
        var n = e.getLocation(),
          o = G$.GetCellByWorldPos(n, null, t.mergeBoard);
        if (
          t.focusElement.cellState == Q2.MOVING &&
          G2.FocusEndCellIdx <= 0 &&
          nq.canDropKeyToAreaLock(t.focusElement, n)
        ) {
          var r = t.focusElement;
          return (
            t.curElement &&
              (r.mergeCellRender.callLogic(RA.HOVER_END, !1, t.curElement), t.clearCurElement()),
            r.mergeCellRender.callLogic(RA.END_MOVE, !1, r),
            (r.cellState = Q2.STAND),
            r.callLogic(RA.USE_AREA_LOCK, n),
            r.data &&
              (r.moveElementTo(r.worldPos, null, !1, null, !1),
              (r.cellState = Q2.RESET),
              (t.selectedElement = r)),
            (r.canDoCheck = !1),
            void (t.touching = !1)
          );
        }
        if (
          (t.touching &&
            G2.FocusEndCellIdx > 0 &&
            o &&
            o.serverIdx != G2.FocusEndCellIdx &&
            o.serverIdx != t.focusElement.serverIdx) ||
          (!o && t.focusElement.cellState != Q2.LOCK)
        )
          return (
            t.focusElement.moveElementTo(t.focusElement.worldPos, null, !1, null, !1),
            t.curElement &&
              t.focusElement.mergeCellRender.callLogic(RA.HOVER_END, !1, t.curElement),
            t.focusElement.mergeCellRender.callLogic(RA.END_MOVE, !1, t.focusElement),
            (t.selectedElement = t.focusElement),
            t.curElement && t.clearCurElement(),
            void (t.touching = !1)
          );
        if (o == t.focusElement) {
          if (o.cellState != Q2.MOVING && o.isElementAtCenter()) {
            (o.recoverAnim(), o.clickElement());
            var a = t.mergeBoardRender.elementInfo;
            rb.playAnimation(a.anim_show, "elementinfotips_02");
          } else
            (t.focusElement.moveElementTo(t.focusElement.worldPos, null, !1, null, !1),
              (o.cellState = Q2.RESET));
          ((t.selectedElement = t.focusElement),
            (t.detailInfoElement = t.focusElement),
            (t.focusElement.canDoCheck = !1),
            t.curElement &&
              t.focusElement.mergeCellRender.callLogic(RA.HOVER_END, !1, t.curElement),
            t.focusElement.mergeCellRender.callLogic(RA.END_MOVE, !1, t.focusElement),
            (t.curElement = null));
        } else if (t.focusElement.cellState != Q2.LOCK && t.touching) {
          (t.curElement && t.focusElement.mergeCellRender.callLogic(RA.HOVER_END, !1, t.curElement),
            t.focusElement.mergeCellRender.callLogic(RA.END_MOVE, !1, t.focusElement));
          var s =
            o &&
            G$.IsElementPropUse(t.focusElement.data.config.id) &&
            !t.focusElement.data.cannotMove &&
            G$.IsElementPropEffect(t.focusElement.data.config.id, o).isEffect &&
            !t.focusElement.data.elementType.includes(Z2.BUBBLE);
          ((MW.isStoreCell(o) && !s) ||
          (o.data &&
            !o.data.elementType.includes(Z2.BUBBLE) &&
            9 != ~~(t.focusElement.data.config.propEffect / 100) &&
            (99901 == o.data.config.id ||
              (o.data.elementType.includes(Z2.ORDER) &&
                o.cellState != Q2.SNOW &&
                o.data.remoteData.state != mr.box &&
                o.data.remoteData.state != mr.web &&
                b2.IsNeedOrderElement(t.focusElement.data.config.id, o.data.remoteData))))
            ? o.mergeCellRender.callLogic(RA.PUT_INTO, !1, o, t.focusElement)
            : G$.IsElementCanMerge(t.focusElement, o) && !t.focusElement.data.cannotMove
              ? ((t.focusElement.cellState = Q2.STAND),
                o.mergeElement(t.focusElement),
                (o.data.soundProtect = !0),
                (t.focusElement = o),
                (t.selectedElement = o),
                (t.detailInfoElement = o))
              : s
                ? (t.focusElement.mergeCellRender.callLogic(RA.PUT_INTO, !1, t.focusElement, o),
                  d.emit(i.OnBoardUseProp, { cell: t.focusElement, target: o }))
                : o.cellState == Q2.LOCK ||
                    o.cellState == Q2.COVER ||
                    o.cellState == Q2.SNOW ||
                    t.focusElement.data.cannotMove ||
                    G$.IsCellInState(o, mr.web) ||
                    G$.IsCellInState(o, mr.box) ||
                    G$.IsCellInState(t.focusElement, mr.web) ||
                    G$.IsCellInState(t.focusElement, mr.box) ||
                    (o.data && (o.data.freeze || o.data.cannotMove))
                  ? (t.focusElement.moveElementTo(t.focusElement.worldPos, null, !1, null, !1),
                    (t.focusElement.cellState = Q2.RESET),
                    (t.selectedElement = t.focusElement))
                  : (G2.SwitchElement(t.focusElement, o, e.getLocation()),
                    o.data &&
                      ((o.data.soundProtect = !0),
                      (t.focusElement = o),
                      (t.selectedElement = o),
                      (t.detailInfoElement = o))),
            (o.canDoCheck = !1),
            (t.curElement = null));
        }
        t.touching = !1;
      } else t.touching = !1;
    }),
    e
  );
})();
