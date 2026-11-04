// Extracted cached Cocos registration: ManuUnlockElement
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 8388324..8391151.
// Shared closure variables remain in readable/game.formatted.js:407159.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "d96636QmDFGU7nOxkv/kj/t", "ManuUnlockElement");
var OKe = cc._decorator,
  xKe = OKe.ccclass;
OKe.property;
var MKe = OKe.menu;
(!(function (e) {
  function i() {
    return (null !== e && e.apply(this, arguments)) || this;
  }
  (t(i, e),
    (i.prototype.onInitRender = function (e) {
      if (b2.isElementNewUnlock(e.data.config.id))
        if (G$.IsCellInState(e, mr.opened))
          (this.addClickTips(e),
            e3.AddCellAnim(e, TC.MANU_OPENED),
            e.mergeCellRender.showManuUnlockFinishIcon());
        else {
          ((i = G2.BoardCells.get(e.serverIdx)).openEnd && (G2.UnlockingNewElement = e),
            !G2.UnlockingNewElement && !i.openEnd && e3.AddCellAnim(e, TC.CHEST_LOCK_TIP));
          var t = e3.AddCellAnim(e, TC.MANU_OPEN).getComponent(NKe);
          (e.registComponent("ManuUnlockRecover", t), t && (t.data = e));
        }
      else if (
        e.data.config.unlockDuration > 0 &&
        1 == e.data.config.unlockWay &&
        !G$.IsCellInState(e, mr.opened)
      ) {
        var i;
        ((i = G2.BoardCells.get(e.serverIdx)).openEnd && (G2.UnlockingManuElement = e),
          !G2.UnlockingManuElement &&
            !i.openEnd &&
            e3.AddCellAnim(e, TC.CHEST_LOCK_TIP) &&
            this.addClickTips(e));
        t = e3.AddCellAnim(e, TC.MANU_OPEN).getComponent(NKe);
        (e.registComponent("ManuUnlockRecover", t), t && (t.data = e));
      } else
        (0 == e.data.config.unlockDuration || G$.IsCellInState(e, mr.opened)) &&
          (this.addClickTips(e),
          e3.AddCellAnim(e, TC.MANU_OPENED),
          e.mergeCellRender.showManuUnlockFinishIcon());
    }),
    (i.prototype.addClickTips = function (e) {
      E8.role.level <= config.Config.config.tapGuideLevel && e3.AddCellAnim(e, TC.CLICK_TIPS);
    }),
    (i.prototype.onTimeChange = function (e) {
      this.updateRecover(e);
    }),
    (i.prototype.onDoubleClickElement = function (e) {
      if (e && e.data && !G$.IsCellInState(e, mr.opened) && e.data.config.unlockDuration) {
        var t = b2.isElementNewUnlock(e.data.config.id);
        if (t) {
          if (G2.UnlockingNewElement)
            return void (G2.UnlockingNewElement.serverIdx == e.serverIdx
              ? A8.Toast({ title: v.getLabel("manuElement_unlocking") })
              : A8.Toast({ title: v.getLabel("manuElement_unlockingOne") }));
        } else if (G2.UnlockingManuElement)
          return (
            console.log(G2.UnlockingManuElement.data.config.id),
            void (G2.UnlockingManuElement.serverIdx == e.serverIdx
              ? A8.Toast({ title: v.getLabel("manuElement_unlocking") })
              : A8.Toast({ title: v.getLabel("manuElement_unlockingOne") }))
          );
        var i = e.data.config,
          n = G2.BoardCells.get(e.serverIdx);
        ((n.openEnd = E8.serverTime + 1e3 * G$.getELementUnlockDuration(i.id, i.unlockDuration)),
          (e.data.isOld = !1),
          n._speedUpStartTime && (n._speedUpStartTime = E8.serverTime),
          t ? b2.ManuNewUnlock(e) : b2.ManuUnlock(e),
          DG.addCellSpeedUpAnim(e));
        var o = e.dynamicComponents.get("ManuUnlockRecover");
        (o && (o.data = e),
          i.unlockSound && j8.playByConf("mergeUnlock_" + i.unlockSound),
          TJ.BoardRequestSend(
            hm.cellOpen,
            { boardId: G2.Data.id, index: e.serverIdx, timestamp: E8.serverTime },
            "cellopen",
          ),
          K3.logEvent("element_unlock", { id: i.id }),
          u.dispatch("showElementInfo", e));
      }
    }),
    (i.prototype.updateRecover = function (e) {
      var t = e.dynamicComponents.get("ManuUnlockRecover");
      t && t.onUpdate(null);
    }),
    (i = o([xKe, MKe("MergeCell/Logic/ManuUnlockElement"), BM("ManuUnlockElement")], i)));
})(xM),
  cc._RF.pop());
