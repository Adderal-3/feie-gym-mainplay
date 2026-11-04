// Extracted cached Cocos registration: PropRiskUpElement
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 8438423..8443767.
// Shared closure variables remain in readable/game.formatted.js:409263.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "59a5coQpnZIso3Z5GhtmOMP", "PropRiskUpElement");
var bqe = cc._decorator,
  wqe = bqe.ccclass;
bqe.property;
var Cqe = bqe.menu;
(!(function (e) {
  function i() {
    var t = (null !== e && e.apply(this, arguments)) || this;
    return ((t._hoverCell = null), t);
  }
  var n;
  (t(i, e),
    (n = i),
    (i.prototype.onInitElement = function (e) {
      return r(this, void 0, void 0, function () {
        var e;
        return a(this, function (t) {
          switch (t.label) {
            case 0:
              return cc.isValid(n.LoadingView)
                ? [3, 2]
                : ((e = n), [4, Mi("Prefab/Common/Loading")]);
            case 1:
              ((e.LoadingView = t.sent()), (t.label = 2));
            case 2:
              return [2];
          }
        });
      });
    }),
    (i.prototype.onPutInto = function (e, t) {
      return r(this, void 0, void 0, function () {
        var i,
          o,
          s,
          c,
          l,
          d,
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
          M = this;
        return a(this, function (G) {
          switch (G.label) {
            case 0:
              return t[0].data
                ? e.data.elementType.includes(Z2.BUBBLE)
                  ? [2]
                  : (i = config.RiskUpgradeCard.getById(e.data.config.id))
                    ? ((o = e.data.config.id),
                      (s = t[0].data),
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
                          (d = e.data.remoteData.endTime + 1),
                          (h = s.remoteData.endTime + 1),
                          (p = d + h),
                          (f = config.PropEffect.getById(s.config.propEffect).maxStack),
                          p <= f
                            ? (K3.logEvent("merge_riskup", { cardId: o, canUseCount: d + h }),
                              [3, 6])
                            : (A8.Toast({ title: v.getLabel("prop_enough") }),
                              (this._hoverCell = null),
                              (e.cellState = Q2.STAND),
                              e.moveElementTo(e.worldPos),
                              (G2.instance.selectedElement = e),
                              u.dispatch("showElementInfo", e),
                              [2])))
                    : [2]
                : [2];
            case 1:
              if (!s.config.mergeElementId) return [2];
              if (e.data.remoteData.endTime < 0) return [2];
              ((g = t[0].data.config.id),
                (m =
                  G2.UnlockingManuElement && G2.UnlockingManuElement.serverIdx == t[0].serverIdx),
                (y = G2.UnlockingNewElement && G2.UnlockingNewElement.serverIdx == t[0].serverIdx),
                (_ = 0),
                (b = function (e) {
                  _ = e ? 1 : 2;
                }),
                j_.showWindow(F3.MergeConfirmWindow, {
                  cb: b.bind(this),
                  id: s.config.id,
                  type: "riskup",
                }),
                (G.label = 2));
            case 2:
              return 0 != _ ? [3, 4] : [4, S(33)];
            case 3:
              return (G.sent(), [3, 2]);
            case 4:
              return 2 == _
                ? (e.moveElementTo(e.worldPos), [2])
                : ((w = []),
                  i.levelWeight.forEach(function (e, t) {
                    w.push({ item: t, weight: e });
                  }),
                  (C = TJ.BoardRandomElement(e, w)),
                  (I = G$.getElementByLv(t[0].data.config.id, C)),
                  (T = function () {
                    return r(M, void 0, void 0, function () {
                      return a(this, function (i) {
                        switch (i.label) {
                          case 0:
                            return [
                              4,
                              TJ.BoardRequestSend(
                                hm.propUse,
                                {
                                  boardId: G2.Data.id,
                                  index: e.serverIdx,
                                  toIndex: t[0].serverIdx,
                                  product: [],
                                  timestamp: E8.serverTime,
                                },
                                "propuse",
                              ),
                            ];
                          case 1:
                            return (i.sent(), [2]);
                        }
                      });
                    });
                  }),
                  Ne.lockStage("riskUp"),
                  (this.loadTimeout = setTimeout(function () {
                    n.LoadingView &&
                      !n.LoadingView.parent &&
                      Ne.getLayer(Be.SCREEN).addChild(n.LoadingView);
                  }, 800)),
                  [4, T()]);
            case 5:
              (G.sent(),
                Ne.unlockStage("riskUp"),
                this.loadTimeout && clearTimeout(this.loadTimeout),
                n.LoadingView && n.LoadingView.removeFromParent(),
                m ? b2.ManuUnlockFinish() : y && b2.ManuNewUnlockFinish(),
                (E = t[0].data.remoteData),
                (A = r3.ButterflyScoreByGDCell(E)).score > 0 &&
                  ((k = Ct.getUI("ThemePassBtn")),
                  (function () {
                    return r(M, void 0, void 0, function () {
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
                  id: I,
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
                K3.logEvent("use_prop", { type: "levelup", id: o, toelement: g }),
                (G.label = 6));
            case 6:
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
                [2]
              );
          }
        });
      });
    }),
    (i.prototype.onStartMove = function (e) {
      e.data.elementType.includes(Z2.BUBBLE) || G2.instance.showCanUseProp(e);
    }),
    (i.prototype.onEndMove = function (e) {
      e.data.elementType.includes(Z2.BUBBLE) || G2.instance.hideCanUseProp();
    }),
    (i.prototype.onHover = function (e, t) {
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
    (i.prototype.onHoverEnd = function (e, t) {
      e.data &&
        !e.data.elementType.includes(Z2.BUBBLE) &&
        (this._hoverCell && e3.AddCellAnim(this._hoverCell, TC.PROP_SHOW_LEVELUP),
        e3.RemoveCellAnim(e, TC.CAN_MERGE),
        (this._hoverCell = null));
    }),
    (i.LoadingView = null),
    (i = n = o([wqe, Cqe("MergeCell/Logic/PropRiskUpElement"), BM("PropRiskUpElement")], i)));
})(xM),
  cc._RF.pop());
