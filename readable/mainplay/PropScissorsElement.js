// Extracted cached Cocos registration: PropScissorsElement
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 8443768..8450277.
// Shared closure variables remain in readable/game.formatted.js:409549.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "bc0cfcYoBRNFLXD1CVQK32O", "PropScissorsElement");
var Iqe = cc._decorator,
  Sqe = Iqe.ccclass;
Iqe.property;
var Tqe = Iqe.menu;
(!(function (e) {
  function n() {
    var t = (null !== e && e.apply(this, arguments)) || this;
    return ((t._hoverCell = null), t);
  }
  (t(n, e),
    (n.prototype.onPutInto = function (e, t) {
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
        y = this;
      if (t[0].data && !e.data.elementType.includes(Z2.BUBBLE)) {
        d.emit(i.OnceVibrate, { type: by.Medium, source: "使用剪刀" });
        var _ = t[0].data,
          b = t[0].data.config.id,
          w = t[0].data.serverData.uUID.toString();
        if ((IC.removePushItem(bC.Element, w), _.config.id == e.data.config.id)) {
          var C = {
              id: _.config.id,
              state: _.elementLockStage,
              productType: vr.none,
              seed: _.seed.seed,
              sourceData: e.data.remoteData,
              targetData: _.remoteData,
            },
            I = e.data.remoteData.endTime + 1,
            S = _.remoteData.endTime + 1,
            T = I + S;
          if (
            (K3.logEvent("merge_scissors", { cardId: _.config.id, canUseCount: I + S }),
            !(T <= config.PropEffect.getById(_.config.propEffect).maxStack))
          )
            return (
              A8.Toast({ title: v.getLabel("prop_enough") }),
              (this._hoverCell = null),
              (e.cellState = Q2.STAND),
              e.moveElementTo(e.worldPos),
              (G2.instance.selectedElement = e),
              void u.dispatch("showElementInfo", e)
            );
          ((e.data = null), j8.play("mergeElement5"));
          var E = GW.ParseCellConfig(C, t[0].serverIdx);
          ((t[0].data = E),
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
            (G2.instance.selectedElement = t[0]),
            u.dispatch("showElementInfo", t[0]),
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
            ));
        } else {
          for (
            var A = r3.ButterflyScoreByCell(t[0]),
              k = DC.CheckHasExtra(t[0]),
              R = qG.CheckHasExtra(t[0]),
              P = X8.CheckHasExtra(t[0]),
              D = null === (n = m2.instance) || void 0 === n ? void 0 : n.CheckHasExtra(t[0]),
              B = null === (o = dI.instance) || void 0 === o ? void 0 : o.CheckHasExtra(t[0]),
              L = wM.getCreatorLampCount(t[0]),
              N = hx.instance.getHasExtraRes(t[0]),
              O = wM.getCreatorBatteryCount(t[0]),
              x = t[0].data.config.series.split("_")[0],
              M = 0,
              G = config.Element.sheetList.get(x),
              F = 0;
            F < G.length;
            F++
          ) {
            if (
              (j = G[F]).series == t[0].data.config.series &&
              j.mergeElementId == t[0].data.config.id
            ) {
              M = j.id;
              break;
            }
          }
          var W = G$.GetClosestBlankCell(t[0].pos, 2),
            U = !1,
            H = !1;
          if (0 == W.length) {
            if (e.data.remoteData.endTime > 0)
              return (
                (this._hoverCell = null),
                A8.Toast({ title: v.getLabel("tip_boardFull") }),
                (e.cellState = Q2.STAND),
                e.moveElementTo(e.worldPos),
                (G2.instance.selectedElement = e),
                void u.dispatch("showElementInfo", e)
              );
            (W.push(e), W.push(t[0]), (U = !0), (H = !0));
          } else
            1 == W.length
              ? ((U = !0), (H = e.data.remoteData.endTime > 0), W.push(t[0]))
              : (H = e.data.remoteData.endTime > 0);
          for (var V = [], j = 0; j < W.length; j++) {
            ((C = { id: M, seed: 0, state: mr.none, productType: vr.split }),
              (E = GW.ParseCellConfig(C, W[j].serverIdx, 0, !0)));
            V.push(E.sendData);
          }
          var z = [];
          for (j = 0; j < W.length; j++) {
            var K = t[0].data.seed.seed + 100 * j,
              q = new Map();
            if (L > 0) {
              var Y = L % 2 != 0,
                X = 1 == j && Y ? Math.floor(L / 2) + 1 : Math.floor(L / 2);
              q.set(fr.magicLamp, X + "");
            }
            if (O > 0) {
              ((Y = O % 2 != 0), (X = 1 == j && Y ? Math.floor(O / 2) + 1 : Math.floor(O / 2)));
              q.set(fr.battery, X + "");
            }
            C = { id: M, state: mr.none, seed: K, productType: vr.split, extra: q };
            var J = GW.ParseCellConfig(C, W[j].serverIdx);
            ((W[j].data = J), W[j].setElementTo(t[0].worldPos));
            var Q = K6.checkElementGetResources(W[j]);
            (W[j].moveElementTo(W[j].worldPos, null, !1, null, !0, Q),
              e3.AddCellAnim(W[j], TC.GET_BAG_END),
              z.push(J.remoteData));
          }
          var Z =
            null === (c = null === (s = e.data) || void 0 === s ? void 0 : s.config) || void 0 === c
              ? void 0
              : c.id;
          if (Z) {
            var $ = W.map(function (e) {
              var t, i, n, o, r;
              return null !==
                (n =
                  null === (i = null === (t = e.data) || void 0 === t ? void 0 : t.remoteData) ||
                  void 0 === i
                    ? void 0
                    : i.seed) && void 0 !== n
                ? n
                : null === (r = null === (o = e.data) || void 0 === o ? void 0 : o.seed) ||
                    void 0 === r
                  ? void 0
                  : r.seed;
            }).filter(function (e) {
              return null != e && void 0 !== e;
            });
            $.length && v4.instance.autoMergeBuffData.addSplitCells(Z, $);
          }
          e.data.remoteData.endTime > 0 &&
            ((this._hoverCell = null),
            e.data.remoteData.endTime--,
            (e.cellState = Q2.STAND),
            e.moveElementTo(e.worldPos),
            (G2.instance.selectedElement = e),
            u.dispatch("showElementInfo", e));
          var ee = DC.CheckHasExtra(e),
            te = X8.CheckHasExtra(e),
            ie = null === (l = m2.instance) || void 0 === l ? void 0 : l.CheckHasExtra(e),
            ne = null === (h = dI.instance) || void 0 === h ? void 0 : h.CheckHasExtra(e),
            oe = qG.CheckHasExtra(e);
          (ee && DC.checkActPlusEnergyForce(e.worldPos),
            te && X8.checkActPlusEnergyForce(e.worldPos),
            ie &&
              (null === (p = m2.instance) || void 0 === p || p.checkActPlusEnergyForce(e.worldPos)),
            ne &&
              (null === (f = dI.instance) || void 0 === f || f.checkAct8EnergyForce(e.worldPos)),
            oe && qG.checkEnergyForce(e.worldPos, oe),
            hx.instance.collectCellAllExtraRes(e));
          var re = e.data.config.id;
          if (
            (!H && (e.data = null),
            !U && (t[0].data = null),
            j8.play(o_.PROP_USE_SCISSORS),
            A.score > 0)
          ) {
            var ae = Ct.getUI("ThemePassBtn");
            r(y, void 0, void 0, function () {
              var e;
              return a(this, function (i) {
                switch (i.label) {
                  case 0:
                    return (
                      (e = A.type),
                      [4, h3.ComplexButterFlyAnim(ae, t[0].worldPos, A.score, e)]
                    );
                  case 1:
                    return (
                      i.sent(),
                      j8.play(o_.PICKONE_CARD_YEAH),
                      (IL._addCount = +A.score),
                      (IL._addCoinAnim = !0),
                      u.dispatch("updateButterflyPassProgress"),
                      [2]
                    );
                }
              });
            });
          }
          (k && DC.checkActPlusEnergyForce(t[0].worldPos),
            P && X8.checkActPlusEnergyForce(t[0].worldPos),
            D &&
              (null === (g = m2.instance) ||
                void 0 === g ||
                g.checkActPlusEnergyForce(t[0].worldPos)),
            B &&
              (null === (m = dI.instance) || void 0 === m || m.checkAct8EnergyForce(t[0].worldPos)),
            R && qG.checkEnergyForce(e.worldPos, R),
            N &&
              N.length > 0 &&
              N.forEach(function (e) {
                hx.instance.collectExtraRes(e, 1, t[0].worldPos, !1);
              }),
            u.dispatch("hideElementInfo"),
            K3.logEvent("use_prop", { type: "scissors", id: re, toelement: b }));
          var se = [];
          for (j = 0; j < V.length; j++) {
            var ce = V[j];
            se.push({ elementId: ce.elementId, index: ce.index, productType: ce.productType });
          }
          TJ.BoardRequestSend(
            hm.propUse,
            {
              boardId: G2.Data.id,
              index: e.serverIdx,
              toIndex: t[0].serverIdx,
              product: se,
              timestamp: E8.serverTime,
            },
            "propuse",
          );
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
          (e3.HideCellLayerAnim(e, TC.PROP_SHOW_SCISSORS),
          e.data && e.data.remoteData.elementId == t[0].data.remoteData.elementId
            ? ((this._hoverCell = null), e3.AddCellAnim(e, TC.CAN_MERGE))
            : (e3.AddCellAnim(e, TC.PROP_USE_SCISSORS), (this._hoverCell = e))));
    }),
    (n.prototype.onHoverEnd = function (e, t) {
      e.data &&
        !e.data.elementType.includes(Z2.BUBBLE) &&
        (this._hoverCell && e3.AddCellAnim(this._hoverCell, TC.PROP_SHOW_SCISSORS),
        e3.RemoveCellAnim(e, TC.PROP_USE_SCISSORS));
    }),
    (n = o([Sqe, Tqe("MergeCell/Logic/PropScissorsElement"), BM("PropScissorsElement")], n)));
})(xM),
  cc._RF.pop());
