// Extracted cached Cocos registration: StoreElement
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 8458672..8461288.
// Shared closure variables remain in readable/game.formatted.js:410227.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "4c44boaiaVPRYM/bdy1ug0F", "StoreElement");
var Nqe = cc._decorator,
  Oqe = Nqe.ccclass,
  xqe = Nqe.menu;
(!(function (e) {
  function i() {
    var t = (null !== e && e.apply(this, arguments)) || this;
    return ((t._selectedLauncher = new Rqe()), t);
  }
  (t(i, e),
    (i.prototype.onInitRender = function (e) {
      (MW.refreshLauncherOrder(e),
        MW.getSortedLaunchers(e).forEach(function (e) {
          (TJ.PreloadLauncherProductsByConfig(e.conf), TJ.PreloadElement(e.conf.id));
        }),
        this._selectedLauncher.refreshSelection(e),
        this.refreshLauncherRecover(e),
        e.registComponent("StoreElementSelectedLauncher", this._selectedLauncher));
    }),
    (i.prototype.onClickElement = function (e) {
      MW.isSwitchRecovering(e) ||
        (this._selectedLauncher.click(e) && this.refreshCurrentLauncher(e));
    }),
    (i.prototype.onSelectElement = function (e) {
      if (!(MW.getStoreBagCell(e).length > 0 || o8.isRunning())) {
        var t = MW.findReceivableLaunchers(e);
        t.length > 0 && G$.moevElementToOrderElement(t, e);
      }
    }),
    (i.prototype.onPutInto = function (e, t) {
      var i = t && t[0];
      if (i && i.data) {
        var n = MW.canReceiveLauncher(e, i);
        if (!n.ok)
          return (
            n.reason && A8.Toast({ title: n.reason }),
            i.moveElementTo(i.worldPos),
            void (G2.instance.selectedElement = i)
          );
        var o = 0 == MW.getStoreBagCell(e).length,
          r = e.data.config.id,
          a = i.serverIdx;
        G$.stopMoveElementToOrderElement(e);
        var s = MW.putLauncher(e, i);
        (G2.WaitComplete("PutStoreLauncherComplete"),
          TJ.BoardRequestSend(
            hm.boardShopPutLauncher,
            {
              boardId: G2.Data.id,
              shopIndex: e.serverIdx,
              launcherIndex: a,
              timestamp: E8.serverTime,
            },
            "boardShopPutLauncher",
            function (t, i) {
              i
                ? MW.onPutLauncherFail(s.launcherData)
                : (MW.onPutLauncherAck(e, s.launcherData), o && Lqe.play(r));
            },
            "shop:" + e.serverIdx + ",launcher:" + a,
          ),
          this.playPutIntoStoreAnim(e),
          this.refreshCurrentLauncher(e, !1, !1),
          u.dispatch("showElementInfo", e),
          u.dispatch("refreshDrawerItem"),
          (G2.instance.selectedElement = e),
          (G2.instance.focusElement = null));
      }
    }),
    (i.prototype.playPutIntoStoreAnim = function (e) {
      e3.AddCellAnim(e, TC.PUT_BAG_END);
    }),
    (i.prototype.refreshCurrentLauncher = function (e, t, i) {
      (void 0 === t && (t = !1), void 0 === i && (i = !0));
      var n = this._selectedLauncher.refreshSelection(e);
      (t || n) &&
        ((n && this._selectedLauncher.needSwitchRecover && MW.startSwitchRecover(e)) ||
          this.refreshLauncherRecover(e),
        i && e.isSelect && u.dispatch("showElementInfo", e));
    }),
    (i.prototype.refreshLauncherRecover = function (e) {
      this._selectedLauncher.refreshRecover(e) || this.clearLauncherRecover(e);
    }),
    (i.prototype.clearLauncherRecover = function (e) {
      this._selectedLauncher.clearRecover(e);
      var t = e.dynamicComponents.get("ManuCreatorRecover");
      (t && (t.data = null),
        e.removeComponet("ManuCreatorRecover"),
        e3.RemoveCellAnim(e, TC.MANU_CREATOR, !0),
        e3.RemoveCellAnim(e, TC.MANU_CREATOR_ENERGY, !0));
    }),
    (i = o([Oqe, xqe("MergeCell/Logic/StoreElement"), BM("StoreElement")], i)));
})(xM),
  cc._RF.pop());
