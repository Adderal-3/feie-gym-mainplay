// Extracted cached Cocos registration: PropRechargeElement
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 8436324..8438422.
// Shared closure variables remain in readable/game.formatted.js:409186.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "b148c+hKVdOTYIFrGH/fnlp", "PropRechargeElement");
var mqe = cc._decorator,
  yqe = mqe.ccclass;
mqe.property;
var _qe = mqe.menu;
(!(function (e) {
  function n() {
    var t = (null !== e && e.apply(this, arguments)) || this;
    return ((t._hoverCell = null), t);
  }
  (t(n, e),
    (n.prototype.onPutInto = function (e, t) {
      if (t[0].data && !e.data.elementType.includes(Z2.BUBBLE)) {
        d.emit(i.OnceVibrate, { type: by.Medium, source: "使用充能" });
        var n = MW.isStoreCell(t[0]) ? MW.getSortedLaunchers(t[0])[0] : null,
          o = n ? n.conf.id : t[0].data.config.id;
        TJ.BoardRequestSend(
          hm.propUse,
          {
            boardId: G2.Data.id,
            index: e.serverIdx,
            toIndex: t[0].serverIdx,
            launcherIndex: n ? n.id : void 0,
            product: null,
            timestamp: E8.serverTime,
          },
          "propuse",
        );
        var r = n
          ? MW.ensureLauncherRecoverTimer(t[0], n.id, n.cell, yr.manualProduct)
          : t[0].data.getRecovery(yr.manualProduct);
        if ((n || !Wt.rechargeAutoCreator || r || (r = t[0].data.getRecovery(yr.autoProduct)), r)) {
          var a = config.PropEffect.getById(e.data.config.propEffect);
          (GW.AddShortCd(
            n ? n.cell : t[0].data.remoteData,
            yr.manualProduct,
            a.effectValue,
            r.value,
          ),
            r.state && (r.state = 0),
            r.increase(a.effectValue));
          var s = e.data.config.id;
          ((e.data = null),
            n && (MW.manualCheckState(n.cell), MW.refreshCurrentLauncherSelection(t[0], !0)),
            e3.AddCellAnim(t[0], TC.PROP_USE_ENERGY_TIP),
            j8.play(o_.PROP_USE_ENERGY),
            u.dispatch("hideElementInfo"),
            K3.logEvent("use_prop", { type: "recharge", id: s, toelement: o }),
            t[0].subPush(!0, !0));
        }
      }
    }),
    (n.prototype.onStartMove = function (e) {
      e.data.elementType.includes(Z2.BUBBLE) || G2.instance.showCanUseProp(e);
    }),
    (n.prototype.onEndMove = function (e) {
      e.data.elementType.includes(Z2.BUBBLE) ||
        (G2.instance.hideCanUseProp(), (this._hoverCell = null));
    }),
    (n.prototype.onHover = function (e, t) {
      t[0].data.elementType.includes(Z2.BUBBLE) ||
        (G$.IsElementPropEffect(t[0].data.config.id, e).isEffect &&
          (e3.RemoveCellAnim(e, TC.PROP_SHOW_ENERGY),
          e3.AddCellAnim(e, TC.PROP_USE_ENERGY),
          (this._hoverCell = e)));
    }),
    (n.prototype.onHoverEnd = function (e, t) {
      e.data &&
        !e.data.elementType.includes(Z2.BUBBLE) &&
        (this._hoverCell && e3.AddCellAnim(this._hoverCell, TC.PROP_SHOW_ENERGY),
        e3.RemoveCellAnim(e, TC.PROP_USE_ENERGY));
    }),
    (n = o([yqe, _qe("MergeCell/Logic/PropRechargeElement"), BM("PropRechargeElement")], n)));
})(xM),
  cc._RF.pop());
