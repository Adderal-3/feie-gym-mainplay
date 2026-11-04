// Extracted cached Cocos registration: BatteryElement
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 8306136..8308765.
// Shared closure variables remain in readable/game.formatted.js:403389.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "37eb5hmHGFMnYyKhqUUnUJv", "BatteryElement");
var Wze = cc._decorator,
  Uze = Wze.ccclass;
Wze.property;
var Hze = Wze.menu;
(!(function (e) {
  function i() {
    var t = (null !== e && e.apply(this, arguments)) || this;
    return ((t._hoverCell = null), t);
  }
  (t(i, e),
    (i.prototype.onInitRender = function (e) {
      (e &&
        (e.data.elementType.includes(Z2.BUBBLE) ||
          G$.IsCellInState(e, mr.web) ||
          G$.IsCellInState(e, mr.box))) ||
        e3.AddCellAnim(e, TC.BATTERY);
    }),
    (i.prototype.onPutInto = function (e, t) {
      return r(this, void 0, void 0, function () {
        var i, n, o, r, s, c, l, d, h;
        return a(this, function (a) {
          switch (a.label) {
            case 0:
              if (!t[0].data) return [2];
              if (e.data.elementType.includes(Z2.BUBBLE)) return [2];
              ((i = t[0].data.config.id),
                (n = 0),
                (o = function (e) {
                  n = e ? 1 : 2;
                }),
                rk.isSettingOpen(tk.Battery)
                  ? j_.showWindow(F3.MergeConfirmWindow, {
                      cb: o.bind(this),
                      id: t[0].data.config.id,
                      type: "useBattery",
                    })
                  : (n = 1),
                (a.label = 1));
            case 1:
              return 0 != n ? [3, 3] : [4, S(33)];
            case 2:
              return (a.sent(), [3, 1]);
            case 3:
              return 2 == n
                ? (e.moveElementTo(e.worldPos), [2])
                : G$.IsElementPropEffect(e.data.config.id, t[0]).isEffect
                  ? (TJ.BoardRequestSend(
                      hm.propUse,
                      {
                        boardId: G2.Data.id,
                        index: e.serverIdx,
                        toIndex: t[0].serverIdx,
                        product: null,
                        timestamp: E8.serverTime,
                      },
                      "propuse",
                    ),
                    t[0].data.getRecovery(yr.manualProduct)
                      ? ((r = 0),
                        t[0].data.remoteData.extra.has(fr.battery) &&
                          t[0].data.remoteData.extra.get(fr.battery).length > 0 &&
                          (r = parseInt(t[0].data.remoteData.extra.get(fr.battery))),
                        (s = config.PropEffect.getById(e.data.config.propEffect).effectValue),
                        (c = r + s),
                        t[0].data.remoteData.extra.set(fr.battery, "" + c),
                        (l = e.data.config.id),
                        (d = e3.GetCellAnim(t[0], TC.MANU_CREATOR)) &&
                          (h = d.getComponent(hM)) &&
                          (h.data = h.data),
                        (e.data = null),
                        e3.AddCellAnim(t[0], TC.PROP_USE_ENERGY_TIP),
                        j8.play(o_.BATTERY_SOUND),
                        u.dispatch("hideElementInfo"),
                        K3.logEvent("use_prop", { type: "recharge", id: l, toelement: i }),
                        t[0].subPush(!0, !0),
                        [2])
                      : [2])
                  : (A8.Toast({ title: v.getLabel("tip_CannotUse") }),
                    e.moveElementTo(e.worldPos),
                    (G2.instance.selectedElement = e),
                    [2]);
          }
        });
      });
    }),
    (i.prototype.onStartMove = function (e) {
      e.data.elementType.includes(Z2.BUBBLE) || G2.instance.showCanUseProp(e);
    }),
    (i.prototype.onEndMove = function (e) {
      e.data.elementType.includes(Z2.BUBBLE) ||
        (G2.instance.hideCanUseProp(), (this._hoverCell = null));
    }),
    (i.prototype.onHover = function (e, t) {
      t[0].data.elementType.includes(Z2.BUBBLE) ||
        (G$.IsElementPropEffect(t[0].data.config.id, e).isEffect &&
          (e3.RemoveCellAnim(e, TC.PROP_SHOW_ENERGY),
          e3.AddCellAnim(e, TC.PROP_USE_ENERGY),
          (this._hoverCell = e)));
    }),
    (i.prototype.onHoverEnd = function (e, t) {
      e.data &&
        !e.data.elementType.includes(Z2.BUBBLE) &&
        (this._hoverCell && e3.AddCellAnim(this._hoverCell, TC.PROP_SHOW_ENERGY),
        e3.RemoveCellAnim(e, TC.PROP_USE_ENERGY));
    }),
    (i = o([Uze, Hze("MergeCell/Logic/BatteryElement"), BM("BatteryElement")], i)));
})(xM),
  cc._RF.pop());
