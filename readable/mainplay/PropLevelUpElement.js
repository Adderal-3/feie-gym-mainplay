// Extracted cached Cocos registration: PropLevelUpElement
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 8430957..8436323.
// Shared closure variables remain in readable/game.formatted.js:408904.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "8abe10za9tOt5JfbfhbcckJ", "PropLevelUpElement");
var fqe = cc._decorator,
  gqe = fqe.ccclass;
fqe.property;
var vqe = fqe.menu;
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
          G,
          F,
          W,
          U,
          H,
          V,
          j,
          z = this;
        return a(this, function (K) {
          switch (K.label) {
            case 0:
              return t[0].data
                ? e.data.elementType.includes(Z2.BUBBLE)
                  ? [2]
                  : (d.emit(i.OnceVibrate, { type: by.Medium, source: "使用升级" }),
                    (n = e.data.config.id),
                    (o = t[0]),
                    (s = o.data),
                    (c = null),
                    (l = !1),
                    s.config.id != e.data.config.id
                      ? [3, 1]
                      : ((l = !0),
                        (c = {
                          id: s.config.id,
                          state: s.elementLockStage,
                          productType: vr.none,
                          seed: s.seed.seed,
                          sourceData: e.data.remoteData,
                          targetData: s.remoteData,
                        }),
                        (h = e.data.remoteData.endTime + 1),
                        (p = s.remoteData.endTime + 1),
                        (f = h + p),
                        (g = config.PropEffect.getById(s.config.propEffect).maxStack),
                        f <= g
                          ? (K3.logEvent("merge_uplevel_card", { cardId: n, canUseCount: h + p }),
                            [3, 8])
                          : ((m = 0 == g ? "prop_levelup_noMaxStack" : "prop_enough"),
                            A8.Toast({ title: v.getLabel(m) }),
                            (this._hoverCell = null),
                            (e.cellState = Q2.STAND),
                            e.moveElementTo(e.worldPos),
                            (G2.instance.selectedElement = e),
                            u.dispatch("showElementInfo", e),
                            [2])))
                : [2];
            case 1:
              return s.config.mergeElementId
                ? e.data.remoteData.endTime < 0
                  ? [2]
                  : ((y = t[0].data.config.id),
                    (_ =
                      G2.UnlockingManuElement &&
                      G2.UnlockingManuElement.serverIdx == t[0].serverIdx),
                    (b =
                      G2.UnlockingNewElement && G2.UnlockingNewElement.serverIdx == t[0].serverIdx),
                    (w = config.Element.getById(e.data.config.id)),
                    706 == w.propEffect
                      ? [3, 7]
                      : ((o.isAutoMergeLock = !0),
                        (C = 0),
                        (I = function (e) {
                          C = e ? 1 : 2;
                        }),
                        (T = { id: s.config.id, cb: I.bind(this), type: "levelup" }),
                        [4, j_.showWindow(F3.MergeConfirmWindow, T)]))
                : [2];
            case 2:
              return [4, K.sent().waitClose()];
            case 3:
              (K.sent(),
                d.emit(i.OnceVibrate, { type: by.Medium, source: "升级二次确认关闭" }),
                (K.label = 4));
            case 4:
              return 0 != C ? [3, 6] : [4, S(33)];
            case 5:
              return (K.sent(), [3, 4]);
            case 6:
              if (((o.isAutoMergeLock = !1), 2 == C)) return (e.moveElementTo(e.worldPos), [2]);
              K.label = 7;
            case 7:
              (_ ? b2.ManuUnlockFinish() : b && b2.ManuNewUnlockFinish(),
                (E = t[0].data.remoteData),
                (A = r3.ButterflyScoreByGDCell(E)).score > 0 &&
                  ((k = Ct.getUI("ThemePassBtn")),
                  (function () {
                    return r(z, void 0, void 0, function () {
                      var e;
                      return a(this, function (i) {
                        switch (i.label) {
                          case 0:
                            return (
                              (e = A.type),
                              [4, h3.ComplexButterFlyAnim(k, t[0].worldPos, A.score, e)]
                            );
                          case 1:
                            return (
                              i.sent(),
                              j8.play(o_.PICKONE_CARD_YEAH),
                              (IL._addCount += A.score),
                              (IL._addCoinAnim = !0),
                              u.dispatch("updateButterflyPassProgress"),
                              [2]
                            );
                        }
                      });
                    });
                  })()),
                hx.checkActEnergy(t[0]),
                qG.checkEnergy(t[0]),
                hx.instance.collectCellAllExtraRes(t[0]),
                (R = GW.ParseCellConfig(
                  { id: E.elementId, state: E.state, seed: E.seed, productType: E.productType },
                  E.index,
                  0,
                  !0,
                )),
                (c = {
                  id: s.config.mergeElementId,
                  state: mr.none,
                  productType: vr.none,
                  seed: s.seed.seed,
                  sourceData: E,
                  targetData: R.sendData,
                }),
                (P = wM.getCreatorLampCount(t[0])),
                (D = new Map()),
                P > 0 && (D.set(fr.magicLamp, P + ""), (c.extra = D)),
                (B = wM.getCreatorBatteryCount(t[0])) > 0 &&
                  (D.set(fr.battery, B + ""), (c.extra = D)),
                K3.logEvent("use_prop", { type: "levelup", id: n, toelement: y }),
                (K.label = 8));
            case 8:
              return (
                j8.play("mergeElement5"),
                (L = GW.ParseCellConfig(c, t[0].serverIdx)),
                !l && e.data.remoteData.endTime--,
                e.data.remoteData.endTime < 0 || l
                  ? (e.data = null)
                  : ((e.cellState = Q2.STAND),
                    e.moveElementTo(e.worldPos),
                    (G2.instance.selectedElement = e),
                    u.dispatch("showElementInfo", e)),
                AF.checkShowMergeFirst(L.config.id, s.config.id),
                G$.SetElementKnow(L.config.id),
                (t[0].data = L),
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
                e3.AddCellAnim(t[0], TC.MERGE_3),
                (N = K6.checkElementGetResources(t[0])) &&
                  ((O = e3.AddCellAnim(t[0], TC.SCORE)),
                  (x = O.getComponent(K2)) && x.updateView(N)),
                l && ((G2.instance.selectedElement = t[0]), u.dispatch("showElementInfo", t[0])),
                (M = null),
                l ||
                  ((G = config.Element.getById(n)),
                  (F = config.PropEffect.getById(G.propEffect || 0)) &&
                    1 === F.getBubble &&
                    G$.GetBlankCell().length > 0 &&
                    (console.error("产生气泡后种子1:", L.seed.seed),
                    (W = L.config.bubbleRate || 0),
                    L.randomInt(0, 100) < W &&
                      ((U = { id: L.config.id, state: mr.none }),
                      ((H = new w2()).data = U),
                      console.error("产生气泡后种子2:", L.seed.seed),
                      (H.seed = L.randomInt(1, 1e5)),
                      (H.fromCell = t[0]),
                      (H.elementType = [Z2.BUBBLE]),
                      (H.productType = vr.bubble),
                      (V = TJ.CreateNewElement(H)) &&
                        (j8.play(o_.MERGE_CREATE_BUBBLE),
                        K3.logEvent("bubbleFrom", {
                          id: -3,
                          fromEleId: L.config.id,
                          eleId: V.elementId,
                        }),
                        (M = V)),
                      console.error("产生气泡后种子3:", L.seed.seed)))),
                (j = []),
                M && j.push(M),
                TJ.BoardRequestSend(
                  hm.propUse,
                  {
                    boardId: G2.Data.id,
                    index: e.serverIdx,
                    toIndex: t[0].serverIdx,
                    product: j,
                    timestamp: E8.serverTime,
                  },
                  "propuse",
                ),
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
      if (!t[0].data.elementType.includes(Z2.BUBBLE)) {
        var i = G$.IsElementPropEffect(t[0].data.config.id, e);
        i.isEffect
          ? (e3.HideCellLayerAnim(e, TC.PROP_SHOW_LEVELUP),
            e3.AddCellAnim(e, TC.CAN_MERGE),
            e.data && e.data.remoteData.elementId == t[0].data.remoteData.elementId
              ? (this._hoverCell = null)
              : (this._hoverCell = e))
          : i.isShow && (this._hoverCell = null);
      }
    }),
    (n.prototype.onHoverEnd = function (e, t) {
      e.data &&
        !e.data.elementType.includes(Z2.BUBBLE) &&
        (this._hoverCell && e3.AddCellAnim(this._hoverCell, TC.PROP_SHOW_LEVELUP),
        e3.RemoveCellAnim(e, TC.CAN_MERGE),
        (this._hoverCell = null));
    }),
    (n = o([gqe, vqe("MergeCell/Logic/PropLevelUpElement"), BM("PropLevelUpElement")], n)));
})(xM),
  cc._RF.pop());
