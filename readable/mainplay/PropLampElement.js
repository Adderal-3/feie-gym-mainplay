// Extracted cached Cocos registration: PropLampElement
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 8427977..8430956.
// Shared closure variables remain in readable/game.formatted.js:408803.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "64058CWgMpDr61i8G54T4wN", "PropLampElement");
var uqe = cc._decorator,
  hqe = uqe.ccclass;
uqe.property;
var pqe = uqe.menu;
(!(function (e) {
  function n() {
    var t = (null !== e && e.apply(this, arguments)) || this;
    return ((t._hoverCell = null), t);
  }
  (t(n, e),
    (n.prototype.onInitRender = function (e) {
      ((wM.LampCell = e), this._refreshDisplay(e), wM.showGuide(e), (wM.AnimLock = !1));
    }),
    (n.prototype._refreshDisplay = function (e) {
      var t = 0;
      e.data.remoteData.extra.has(fr.magicLampProp) &&
        e.data.remoteData.extra.get(fr.magicLampProp).length > 0 &&
        (t = parseInt(e.data.remoteData.extra.get(fr.magicLampProp)));
      var i = wM.getLampMax();
      (e.mergeCellRender.showLamp(t),
        t >= i
          ? (e3.AddCellAnim(e, TC.PROP_LAMP_MAX), e.mergeCellRender.showReadyIcon(!0))
          : t > 0
            ? (e3.RemoveCellAnim(e, TC.PROP_LAMP_MAX), e.mergeCellRender.showMidIcon(!0))
            : (e3.RemoveCellAnim(e, TC.PROP_LAMP_MAX), e.mergeCellRender.showReadyIcon(!1)));
    }),
    (n.prototype.onPutInto = function (e, t) {
      if (t[0].data && !e.data.elementType.includes(Z2.BUBBLE)) {
        d.emit(i.OnceVibrate, { type: by.Medium, source: "PropLampElement.use" });
        var n = t[0].data.config.id;
        TJ.BoardRequestSend(
          hm.propUse,
          {
            boardId: G2.Data.id,
            index: e.serverIdx,
            toIndex: t[0].serverIdx,
            product: null,
            timestamp: E8.serverTime,
          },
          "propuse",
        );
        var o = t[0].data.getRecovery(yr.manualProduct);
        if (o) {
          var r = 0;
          (e.data.remoteData.extra.has(fr.magicLampProp) &&
            e.data.remoteData.extra.get(fr.magicLampProp).length > 0 &&
            (r = parseInt(e.data.remoteData.extra.get(fr.magicLampProp))),
            e.data.remoteData.extra.set(fr.magicLampProp, ""),
            (wM.LampCount = 0));
          var a = 0;
          t[0].data.remoteData.extra.has(fr.magicLamp) &&
            t[0].data.remoteData.extra.get(fr.magicLamp).length > 0 &&
            (a = parseInt(t[0].data.remoteData.extra.get(fr.magicLamp)));
          var s = a + r;
          (t[0].data.remoteData.extra.set(fr.magicLamp, "" + s),
            GW.RemoveShortCd(t[0].data.remoteData),
            o.check(),
            this._refreshDisplay(e),
            wM.flyAnim(t[0], r),
            e.data.config.id,
            e.moveElementTo(e.worldPos),
            e3.AddCellAnim(t[0], TC.PROP_USE_LAMP_TIP),
            j8.play(o_.LAMP_USE),
            u.dispatch("showElementInfo", e),
            (G2.instance.selectedElement = e),
            K3.logEvent("use_lamp", { cnt: r, toelement: n }),
            t[0].subPush(!0, !0));
        }
      }
    }),
    (n.prototype.onStartMove = function (e) {
      if (!e.data.elementType.includes(Z2.BUBBLE)) {
        var t = 0;
        (e.data.remoteData.extra.has(fr.magicLampProp) &&
          e.data.remoteData.extra.get(fr.magicLampProp).length > 0 &&
          (t = parseInt(e.data.remoteData.extra.get(fr.magicLampProp))),
          (wM.LampCount = t),
          G2.instance.showCanUseProp(e));
      }
    }),
    (n.prototype.onEndMove = function (e) {
      e.data.elementType.includes(Z2.BUBBLE) ||
        (G2.instance.hideCanUseProp(), (this._hoverCell = null), this._refreshDisplay(e));
    }),
    (n.prototype.onHover = function (e, t) {
      t[0].data.elementType.includes(Z2.BUBBLE) ||
        (G$.IsElementPropEffect(t[0].data.config.id, e).isEffect &&
          (e3.RemoveCellAnim(e, TC.PROP_SHOW_LAMP),
          e3.AddCellAnim(e, TC.PROP_USE_LAMP),
          (this._hoverCell = e)));
    }),
    (n.prototype.onHoverEnd = function (e, t) {
      e.data &&
        !e.data.elementType.includes(Z2.BUBBLE) &&
        (this._hoverCell && e3.AddCellAnim(this._hoverCell, TC.PROP_SHOW_LAMP),
        e3.RemoveCellAnim(e, TC.PROP_USE_LAMP));
    }),
    (n = o([hqe, pqe("MergeCell/Logic/PropLampElement"), BM("PropLampElement")], n)));
})(xM),
  cc._RF.pop());
