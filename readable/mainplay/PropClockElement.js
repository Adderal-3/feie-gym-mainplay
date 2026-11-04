// Extracted cached Cocos registration: PropClockElement
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 8417304..8424874.
// Shared closure variables remain in readable/game.formatted.js:408322.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "9864dAQIw9G5I03XwjNs88h", "PropClockElement");
var iqe = cc._decorator,
  nqe = iqe.ccclass;
iqe.property;
var oqe = iqe.menu;
(!(function (e) {
  function n() {
    var t = (null !== e && e.apply(this, arguments)) || this;
    return ((t._hoverCell = null), t);
  }
  (t(n, e),
    (n.prototype.onPutInto = function (e, t) {
      return r(this, void 0, void 0, function () {
        var n,
          o,
          r,
          s,
          c,
          l,
          h,
          p,
          f,
          g,
          m,
          y,
          _,
          b,
          w,
          C,
          I,
          T,
          E,
          A,
          k,
          R,
          P,
          D,
          B,
          L,
          N,
          O,
          x,
          M,
          G;
        return a(this, function (a) {
          switch (a.label) {
            case 0:
              return t[0].data
                ? e.data.elementType.includes(Z2.BUBBLE)
                  ? [2]
                  : (d.emit(i.OnceVibrate, { type: by.Medium, source: "使用沙漏" }),
                    (n = 8 == ~~(t[0].data.config.propEffect / 100)),
                    (o = !n && MW.isStoreCell(t[0]) ? MW.getSortedLaunchers(t[0])[0] : null),
                    (r = e.data.config.id),
                    (s = 0),
                    n
                      ? [3, 6]
                      : ((c = function (e) {
                          s = e ? 1 : 2;
                        }),
                        rk.isSettingOpen(tk.SkipTime)
                          ? [
                              4,
                              j_.showWindow(F3.MergeConfirmWindow, {
                                cb: c.bind(this),
                                id: o ? o.conf.id : t[0].data.config.id,
                                type: "useClock",
                              }),
                            ]
                          : [3, 3]))
                : [2];
            case 1:
              return [4, a.sent().waitClose()];
            case 2:
              return (
                a.sent(),
                d.emit(i.OnceVibrate, { type: by.Medium, source: "二次确认关闭" }),
                [3, 4]
              );
            case 3:
              ((s = 1), (a.label = 4));
            case 4:
              return 0 != s ? [3, 6] : [4, S(33)];
            case 5:
              return (a.sent(), [3, 4]);
            case 6:
              if (2 == s) return (e.moveElementTo(e.worldPos), [2]);
              if (
                !(o ? this.isStoreLauncherNeedSpeedUp(t[0], o) : G$.IsElementNeedSpeedUp(t[0])) &&
                !n
              )
                return (
                  A8.Toast({ title: v.getLabel("tip_CannotUse") }),
                  e.moveElementTo(e.worldPos),
                  (G2.instance.selectedElement = e),
                  [2]
                );
              if (((l = e.data.remoteData.endTime), n))
                return (
                  (h = t[0].data.remoteData.endTime),
                  (p = this.getMaxTime()),
                  h >= p || l >= p
                    ? (A8.Toast({ title: v.getLabel("prop_enough") }),
                      e.moveElementTo(e.worldPos),
                      (G2.instance.selectedElement = e),
                      [2])
                    : (TJ.BoardRequestSend(
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
                      (f = l + h) > p
                        ? ((g = f - p),
                          (m = p),
                          (e.data.remoteData.endTime = g),
                          (t[0].data.remoteData.endTime = m),
                          e.moveElementTo(e.worldPos),
                          (G2.instance.detailInfoElement = t[0]),
                          (G2.instance.selectedElement = t[0]))
                        : ((t[0].data.remoteData.endTime = f), (e.data = null)),
                      t[0].resetTween(),
                      (t[0].tweenLock = !0),
                      cc
                        .tween(t[0].mergeCellRender.node_icon)
                        .to(0.1, { scale: 0.5 })
                        .to(0.166, { scale: 1.15 })
                        .to(0.1, { scale: 1 })
                        .call(function () {
                          ((t[0].tweenLock = !1), t[0].showElementTween());
                        })
                        .start(),
                      (y = "Merge" + G2.instance.mergeAnimCount),
                      e3.AddCellAnim(t[0], y),
                      j8.play("mergeElement5"),
                      u.dispatch("showElementInfo", t[0]),
                      K3.logEvent("merge_prop_clock"),
                      [2])
                );
              if (
                (TJ.BoardRequestSend(
                  hm.propUse,
                  {
                    boardId: G2.Data.id,
                    index: e.serverIdx,
                    toIndex: t[0].serverIdx,
                    launcherIndex: o ? o.id : void 0,
                    product: null,
                    timestamp: E8.serverTime,
                  },
                  "propuse",
                ),
                (_ = 0),
                (b = 0),
                (w = null),
                (C = pr.chestOpen),
                t[0].data.config.unlockDuration > 0 && !G$.IsCellInState(t[0], mr.opened))
              )
                ((C = pr.chestOpen), (b = t[0].data.remoteData.openEnd - E8.serverTime));
              else if (
                t[0].data.elementType.includes(Z2.ORDER) &&
                t[0].data.remoteData.order.endTime &&
                t[0].data.remoteData.order.state == kr.running
              )
                ((C = pr.elementOrder), (b = t[0].data.remoteData.order.endTime - E8.serverTime));
              else if (o && this._checkNeedShowCreator(t[0], o)) {
                if (!(w = MW.ensureLauncherRecoverTimer(t[0], o.id, o.cell, yr.manualProduct)))
                  return [2];
                ((C = pr.manualProduct),
                  (E = w.value < o.conf.elementCDStorage),
                  (k = Math.min(o.conf.elementStorage, w.value + o.conf.elementCDStorage)),
                  (b = o.cell._superSpeedUpStartTime
                    ? E
                      ? w.getLeftTime3(o.conf.elementCDStorage, o.conf.elementCDStorage)
                      : w.getLeftTime3(k, o.conf.elementCDStorage)
                    : E
                      ? w.getLeftTime(o.conf.elementCDStorage)
                      : w.getLeftTime(k)),
                  (_ = E ? w.getLeftTime(o.conf.elementCDStorage) : w.getLeftTime(k)));
              } else
                t[0].data.elementType.includes(Z2.MANU_CREATOR) &&
                t[0].data.elementType.includes(Z2.AUTO_CREATOR)
                  ? ((w = t[0].data.remoteData.recovery.get(yr.manualProduct)),
                    (I = t[0].data.remoteData.recovery.get(yr.autoProduct)),
                    (E = w.value < t[0].data.config.elementCDStorage),
                    (A = G$.GetAutoCDStorage(t[0])),
                    (T = I.value <= 0 || I.state > 0),
                    (C = pr.manualProduct),
                    E
                      ? (b = w.getLeftTime(t[0].data.config.elementCDStorage))
                      : T
                        ? ((w = t[0].data.remoteData.recovery.get(yr.autoProduct)),
                          (C = pr.autoProduct),
                          (k = Math.min(t[0].data.config.AutoStorage, Math.max(A, w.value + A))),
                          (b = w.getLeftTime(k)))
                        : ((k = Math.min(
                            t[0].data.config.elementStorage,
                            w.value + t[0].data.config.elementCDStorage,
                          )),
                          (b = w.getLeftTime(k))))
                  : t[0].data.elementType.includes(Z2.MANU_CREATOR) &&
                      this._checkNeedShowCreator(t[0])
                    ? ((w = t[0].data.remoteData.recovery.get(yr.manualProduct)),
                      (C = pr.manualProduct),
                      (E = w.value < t[0].data.config.elementCDStorage),
                      (k = Math.min(
                        t[0].data.config.elementStorage,
                        w.value + t[0].data.config.elementCDStorage,
                      )),
                      (b = t[0].data.remoteData._superSpeedUpStartTime
                        ? E
                          ? w.getLeftTime3(
                              t[0].data.config.elementCDStorage,
                              t[0].data.config.elementCDStorage,
                            )
                          : w.getLeftTime3(k, t[0].data.config.elementCDStorage)
                        : E
                          ? w.getLeftTime(t[0].data.config.elementCDStorage)
                          : w.getLeftTime(k)),
                      (_ = E ? w.getLeftTime(t[0].data.config.elementCDStorage) : w.getLeftTime(k)))
                    : t[0].data.elementType.includes(Z2.AUTO_CREATOR) &&
                      ((w = t[0].data.remoteData.recovery.get(yr.autoProduct)),
                      (C = pr.autoProduct),
                      (A = G$.GetAutoCDStorage(t[0])),
                      (k = Math.min(t[0].data.config.AutoStorage, Math.max(A, w.value + A))),
                      (b = w.getLeftTime(k)));
              return (
                (R = 0),
                b > 0 &&
                  l > 0 &&
                  ((P = l >= b),
                  (R = b > l ? l : b),
                  (l -= b) < 0 && (l = 0),
                  0 == l
                    ? (e.data = null)
                    : ((e.data.remoteData.endTime = l),
                      e.moveElementTo(e.worldPos),
                      (G2.instance.selectedElement = e)),
                  C == pr.chestOpen
                    ? ((t[0].data.remoteData.openEnd -= R), (t[0].data = t[0].data))
                    : C == pr.elementOrder
                      ? (t[0].data.remoteData.order.endTime -= R)
                      : C == pr.manualProduct && w
                        ? ((D = w.state),
                          (B = o ? o.cell : t[0].data.remoteData),
                          (L = o ? o.conf : t[0].data.config),
                          w.startTime > 0 &&
                            (B._superSpeedUpStartTime
                              ? ((B._superSpeedUpStartTime = E8.serverTime),
                                3e5,
                                (N = L.elementCDStorage),
                                (O = w.interval / w.intervalValue),
                                (x = N * O * 1e3),
                                P ? (w.startTime -= _) : ((M = (R / 3e5) * x), (w.startTime -= M)))
                              : (w.startTime -= R)),
                          GW.RemoveShortCd(B),
                          w.check(!0, { isBuyCd: !0 }),
                          o && D != w.state && MW.refreshCurrentLauncherSelection(t[0], !0))
                        : C == pr.autoProduct &&
                          w &&
                          (w.startTime > 0 && (w.startTime -= R),
                          GW.RemoveShortCd(t[0].data.remoteData),
                          w.check(!0, { isBuyCd: !0 })),
                  d.emit(i.OnBoardUseHourglass, { cell: e, target: t[0] })),
                o && (MW.manualCheckState(o.cell), MW.refreshCurrentLauncherSelection(t[0], !0)),
                (G = "Merge" + G2.instance.mergeAnimCount),
                e3.AddCellAnim(t[0], G),
                j8.play(o_.PROP_USE_CLOCK),
                u.dispatch("showElementInfo", e),
                K3.logEvent("use_prop_clock", {
                  time: R,
                  timenow: l,
                  id: r,
                  toelement: o ? o.conf.id : t[0].data.config.id,
                }),
                [2]
              );
          }
        });
      });
    }),
    (n.prototype.onStartMove = function (e) {
      e.data.elementType.includes(Z2.BUBBLE) || G2.instance.showCanUseProp(e);
    }),
    (n.prototype.onEndMove = function (e) {
      e.data.elementType.includes(Z2.BUBBLE) || G2.instance.hideCanUseProp();
    }),
    (n.prototype.onHover = function (e, t) {
      t[0].data.elementType.includes(Z2.BUBBLE) ||
        (G$.IsElementPropEffect(t[0].data.config.id, e).isEffect &&
          (e3.RemoveCellAnim(e, TC.PROP_SHOW_CLOCK),
          t[0].data.config.id == e.data.config.id
            ? e3.AddCellAnim(e, TC.CAN_MERGE)
            : e3.AddCellAnim(e, TC.PROP_USE_CLOCK),
          (this._hoverCell = e)));
    }),
    (n.prototype.onHoverEnd = function (e, t) {
      e.data &&
        !e.data.elementType.includes(Z2.BUBBLE) &&
        (this._hoverCell &&
          this._hoverCell.data &&
          8 != ~~(this._hoverCell.data.config.propEffect / 100) &&
          e3.AddCellAnim(this._hoverCell, TC.PROP_SHOW_CLOCK),
        e3.RemoveCellAnim(e, TC.PROP_USE_CLOCK),
        (this._hoverCell = null));
    }),
    (n.prototype._checkNeedShowCreator = function (e, t) {
      if (t) {
        var i = MW.ensureLauncherRecoverTimer(e, t.id, t.cell, yr.manualProduct);
        if (!i || i.isFull) return !1;
        var n = config.OneTimeStorage.getById(t.conf.id);
        return !(n && t.cell.productCount >= n.clickOneTimeStorage);
      }
      var o = e.data.getRecovery(yr.manualProduct),
        r = e.dynamicComponents.get("ManuCreatorRecover");
      return (
        !(!e.data.elementType.includes(Z2.AUTO_UNLOCK) || G$.IsCellInState(e, mr.opened)) ||
        !(!o || !r || o.isFull)
      );
    }),
    (n.prototype.isStoreLauncherNeedSpeedUp = function (e, t) {
      return !!this._checkNeedShowCreator(e, t) && MW.isStoreLauncherNeedSpeedUp(e, t);
    }),
    (n.prototype.getMaxTime = function () {
      for (var e = config.PropEffect.list, t = 0; t < e.length; t++)
        if (8 == e[t].effectType && e[t].maxStack > 0) return 1e3 * e[t].maxStack;
      return -1;
    }),
    (n = o([nqe, oqe("MergeCell/Logic/PropClockElement"), BM("PropClockElement")], n)));
})(xM),
  cc._RF.pop());
