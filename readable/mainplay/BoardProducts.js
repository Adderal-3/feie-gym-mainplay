// Original shared-closure declaration TJ: BoardProducts
// Source UTF-16 offsets 3074114..3117279; complete context in game.formatted.js:149946.
// Analysis fragment; not independently executable.

var TJ = (function () {
  function e() {}
  return (
    (e.RefreshDailyTaskFinishAnim = function (e) {
      var t = config.DailyTradeConfig.config.unlockLevel;
      e.data &&
        E8.role.level >= t &&
        !e.data.elementType.includes(Z2.BUBBLE) &&
        (!yL.checkIsDemandEle(e.data.config.id) ||
          G$.IsCellInState(e, mr.web) ||
          G$.IsCellInState(e, mr.box) ||
          e3.AddCellAnim(e, TC.DAILY_TASK_FINISH));
    }),
    (e.CreateNewElement = function (t) {
      var n,
        o = null;
      if (t.data.pos) {
        o = G$.GetCellByPos(t.data.pos);
        var r = !!t.fromCell,
          a = GW.ParseCellConfig(
            {
              id: t.data.id,
              state: t.data.state,
              seed: t.seed,
              productType: t.productType,
              inBubble: r,
            },
            o.serverIdx,
          );
        if (
          (t.elementType.forEach(function (e) {
            GW.AddCellType(a, e);
          }),
          t.productType == vr.bubble || t.productType == vr.goldenBubble)
        ) {
          if (r3.CheckElementCanFly(t.data.id)) {
            var s = r3.CreatButterfly(t.data.id, !0);
            (a.remoteData.extra.set(fr.butterflyPass, s.toString()),
              K3.logEvent("butterflyPass_butterflyGet", {
                elementId: t.data.id,
                isBubble: 1,
                isGold: s,
              }));
          }
          a.remoteData.bubbleEnd = E8.serverTime + 1e3 * a.config.bubbleWait;
        }
        (KM.instance.initFrozenBubbleData(a),
          o &&
            ((o.suppressSelectedOrderAnim = 0 == t.luckyType || 1 == t.luckyType),
            (o.data = a),
            G$.IsCellInState(o, mr.web) && G$.FreezeCell(o)));
      } else {
        var c = [];
        if (
          (c = t.fromCell ? G$.GetClosestBlankCell(t.fromCell.pos, 1) : G$.GetBlankCell()).length >
          0
        ) {
          o = c[0];
          r = !!t.fromCell;
          var l = GW.ParseCellConfig(
            {
              id: t.data.id,
              state: t.data.state,
              seed: t.seed,
              productType: t.productType,
              inBubble: r,
            },
            o.serverIdx,
          );
          if (
            (t.elementType.forEach(function (e) {
              GW.AddCellType(l, e);
            }),
            t.productType == vr.bubble || t.productType == vr.goldenBubble)
          ) {
            if (
              ((l.remoteData.bubbleEnd = E8.serverTime + 1e3 * l.config.bubbleWait),
              r3.CheckElementCanFly(t.data.id))
            ) {
              s = r3.CreatButterfly(t.data.id, !0);
              (l.remoteData.extra.set(fr.butterflyPass, s.toString()),
                K3.logEvent("butterflyPass_butterflyGet", {
                  elementId: t.data.id,
                  isBubble: 1,
                  isGold: s,
                }));
            }
            (DC.CheckElementCanFly(t.data.id) && l.remoteData.extra.set(fr.eventEnergyI, "1"),
              (null === (n = dI.instance) || void 0 === n
                ? void 0
                : n.CheckElementCanFly(t.data.id)) &&
                l.remoteData.extra.set(fr.eventEnergyIV, "1"));
            var u = qG.creatEnergy(t.data.id, !0, 1);
            if (
              (u && l.remoteData.extra.set(fr.energy, u.toString()),
              K6.checkElementSpecialMerge(t.data.id) &&
                l.remoteData.extra.set(fr.specialLight, "1"),
              b3.checkActivity())
            ) {
              var h = 0;
              t.productType == vr.bubble
                ? (h = l.config.bubbleCost)
                : t.productType == vr.goldenBubble && (h = l.config.bubble2Cost);
              var p = b3.instance.createBubblePoint(h);
              p > 0 && l.remoteData.extra.set(fr.gymPoint, p.toString());
            }
            hx.instance.createBubbleExtraRes(t, l, 1);
          }
          (KM.instance.initFrozenBubbleData(l),
            (o.suppressSelectedOrderAnim = 0 == t.luckyType || 1 == t.luckyType),
            (o.data = l),
            G$.IsCellInState(o, mr.web) && G$.FreezeCell(o));
        }
      }
      if (o && o.data && !o.data.remoteData.extra.has(fr.adCount) && t.productType == vr.adBubble) {
        var f = config.AdBubblePrice.getById(o.data.config.id),
          g = f ? f.adTimes : 1;
        o.data.remoteData.extra.set(fr.adCount, g.toString());
      }
      if (
        o &&
        o.data &&
        !o.data.remoteData.extra.has(fr.goGReqOrderId) &&
        t.productType == vr.challengeBubble
      ) {
        var v = e.GetMergeIncreaseId(),
          m = Pq.GogBubbleCount;
        (o.data.remoteData.extra.set(fr.goGReqOrderId, v + ""),
          (Pq.GogBubbleCount = m + 1),
          G2.Data.buff.set(
            config.BoardBuffType.bubble3CD,
            E8.serverTime + 1e3 * config.Config.config.bubble3CD,
          ),
          E8.role.guide.has("GogBubble") || kK.showGuideNew("GogBubble"));
      }
      if (t.fromCell && o) {
        o.setElementTo(t.fromCell.worldPos);
        var y = K6.checkElementGetResources(o, t.productType);
        o.moveElementTo(o.worldPos, TC.MERGE_END, t.isCreator, null, !0, y);
      }
      return (
        d.emit(i.CreateNewElement, { cell: o, params: t }),
        o && o.data ? o.data.remoteData : null
      );
    }),
    (e.CreateNewElements = function (t, i) {
      for (
        var n,
          o,
          r,
          a,
          s,
          c,
          l,
          d = [],
          u = Math.max(1, t.actualProductTimes || t.count || 1),
          p = function (i) {
            var p = t.datas[i],
              f = null;
            if (p.pos) {
              f = G$.GetCellByPos(p.pos);
              var g = GW.ParseCellConfig(
                { id: p.id, state: p.state, seed: p.seed, productType: t.productType },
                f.serverIdx,
              );
              if (
                ((t.productType != vr.bubble && t.productType != vr.goldenBubble) ||
                  (g.remoteData.bubbleEnd = E8.serverTime + 1e3 * g.config.bubbleWait),
                f)
              ) {
                var m = g.elementLockStage == mr.web;
                if (
                  (t.productType == vr.manualProduct &&
                    t.fromCell.data.config.costEnergy > 0 &&
                    (DC.CreatButterfly(p.id, !1, u) && g.remoteData.extra.set(fr.eventEnergyI, "1"),
                    X8.CreatButterfly(p.id, !1, u) && g.remoteData.extra.set(fr.eventEnergyII, "1"),
                    (null === (n = m2.instance) || void 0 === n
                      ? void 0
                      : n.CreatButterfly(p.id, !1, u)) &&
                      g.remoteData.extra.set(fr.eventEnergyIII, "1"),
                    (null === (o = dI.instance) || void 0 === o
                      ? void 0
                      : o.CreatButterfly(p.id, !1, u)) &&
                      g.remoteData.extra.set(fr.eventEnergyIV, "1"),
                    qG.creatEnergy(p.id, !1, u) && g.remoteData.extra.set(fr.energy, "1"),
                    b3.onCreateElement(u)),
                  K6.checkElementSpecialMerge(p.id) && g.remoteData.extra.set(fr.specialLight, "1"),
                  t.productType == vr.bubble || t.productType == vr.goldenBubble)
                )
                  if (b3.checkActivity()) {
                    var y = 0;
                    (t.productType == vr.bubble
                      ? (y = g.config.bubbleCost)
                      : t.productType == vr.goldenBubble && (y = g.config.bubble2Cost),
                      (C = b3.instance.createBubblePoint(y)) > 0 &&
                        (h.warn("气泡point: " + C),
                        g.remoteData.extra.set(fr.gymPoint, C.toString())));
                  } else hx.instance.createBubbleExtraRes(t, g, u);
                (!m &&
                  t.productType == vr.manualProduct &&
                  t.fromCell.data.config.costEnergy > 0 &&
                  hx.instance.createExtraRes(t, g, u),
                  (f.suppressSelectedOrderAnim = 0 == t.luckyType || 1 == t.luckyType),
                  (f.data = g),
                  (b = X8.CreatVegetable(p.id, f)) > 0 &&
                    (g.remoteData.extra.set(fr.chess4VegetableWeight, "" + b), (f.data = g)),
                  (w = IJ.creatWeight(p.id, f)) &&
                    (g.remoteData.extra.set(fr.chess5Weight, w), (f.data = g)),
                  G$.IsCellInState(f, mr.web) && G$.FreezeCell(f));
              }
            } else {
              var _ = [];
              if (
                (_ = t.fromCell.pos ? G$.GetClosestBlankCell(t.fromCell.pos, 1) : G$.GetBlankCell())
                  .length > 0
              ) {
                f = _[0];
                g = GW.ParseCellConfig(
                  { id: p.id, state: p.state, seed: p.seed, productType: t.productType },
                  f.serverIdx,
                );
                if (
                  ((t.productType != vr.bubble && t.productType != vr.goldenBubble) ||
                    (g.remoteData.bubbleEnd = E8.serverTime + 1e3 * g.config.bubbleWait),
                  f)
                ) {
                  var b, w;
                  m = g.elementLockStage == mr.web;
                  if (
                    (t.productType == vr.manualProduct &&
                      t.fromCell.data.config.costEnergy > 0 &&
                      (DC.CreatButterfly(p.id, !1, u) &&
                        g.remoteData.extra.set(fr.eventEnergyI, "1"),
                      X8.CreatButterfly(p.id, !1, u) &&
                        g.remoteData.extra.set(fr.eventEnergyII, "1"),
                      (null === (r = m2.instance) || void 0 === r
                        ? void 0
                        : r.CreatButterfly(p.id, !1, u)) &&
                        g.remoteData.extra.set(fr.eventEnergyIII, "1"),
                      (null === (a = dI.instance) || void 0 === a
                        ? void 0
                        : a.CreatButterfly(p.id, !1, u)) &&
                        g.remoteData.extra.set(fr.eventEnergyIV, "1"),
                      qG.creatEnergy(p.id, !1, u) && g.remoteData.extra.set(fr.energy, "1"),
                      b3.onCreateElement(u)),
                    K6.checkElementSpecialMerge(p.id) &&
                      g.remoteData.extra.set(fr.specialLight, "1"),
                    (t.productType == vr.bubble || t.productType == vr.goldenBubble) &&
                      b3.checkActivity())
                  )
                    if (b3.checkActivity()) {
                      var C;
                      y = 0;
                      (t.productType == vr.bubble
                        ? (y = g.config.bubbleCost)
                        : t.productType == vr.goldenBubble && (y = g.config.bubble2Cost),
                        (C = b3.instance.createBubblePoint(y)) > 0 &&
                          (h.warn("气泡point: " + C),
                          g.remoteData.extra.set(fr.gymPoint, C.toString())));
                    } else hx.instance.createBubbleExtraRes(t, g, u);
                  if (
                    (!m &&
                      t.productType == vr.manualProduct &&
                      t.fromCell.data.config.costEnergy > 0 &&
                      hx.instance.createExtraRes(t, g, u),
                    (f.suppressSelectedOrderAnim = 0 == t.luckyType || 1 == t.luckyType),
                    (f.data = g),
                    (b = X8.CreatVegetable(p.id, f)) > 0 &&
                      (g.remoteData.extra.set(fr.chess4VegetableWeight, "" + b), (f.data = g)),
                    (w = IJ.creatWeight(p.id, f)) &&
                      (g.remoteData.extra.set(fr.chess5Weight, w), (f.data = g)),
                    t.productType == vr.manualProduct &&
                      (null ===
                        (l =
                          null ===
                            (c =
                              null === (s = t.fromCell.data) || void 0 === s
                                ? void 0
                                : s.remoteData) || void 0 === c
                            ? void 0
                            : c.extra) || void 0 === l
                        ? void 0
                        : l.has(fr.chess5Weight)))
                  ) {
                    var I = IJ.creatWeightByParent(p.id, f, t.fromCell);
                    (g.remoteData.extra.set(fr.chess5Weight, "" + I), (f.data = g));
                  }
                  G$.IsCellInState(f, mr.web) && G$.FreezeCell(f);
                }
              }
            }
            if (f)
              if (
                (d.push(f.data.remoteData),
                t.productType == vr.manualProduct
                  ? t.fromCell.data.remoteData.productCount++
                  : t.productType == vr.autoProduct &&
                    t.fromCell.data.remoteData.autoProductCount++,
                t.fromCell)
              ) {
                f.setElementTo(t.fromCell.worldPos);
                var S = TC.MERGE_END;
                (0 != t.luckyType && 1 != t.luckyType) ||
                  (f.mergeCellRender.showLucyBox(!0),
                  (S = null),
                  0 == t.luckyType
                    ? j8.playEffect(o_.LUCKYELEMENT_SOUND1)
                    : j8.playEffect(o_.LUCKYELEMENT_SOUND2));
                var T = K6.checkElementGetResources(f, t.productType),
                  E = null;
                ((0 != t.luckyType && 1 != t.luckyType) ||
                  (E = function () {
                    f.mergeCellRender.showLucyBox(!1);
                    var e = "zh" == v.language,
                      i =
                        0 == t.luckyType
                          ? e
                            ? TC.LUCKYZh
                            : TC.LUCKYEn
                          : e
                            ? TC.LUCKYSUPERZh
                            : TC.LUCKYSUPEREn;
                    (e3.AddCellAnim(f, i), e3.MoveAnimToCell(f, i), e3.DetachCellAnim(f, i));
                  }),
                  f.moveElementTo(
                    f.worldPos,
                    S,
                    t.isCreator,
                    function () {
                      (0 != t.luckyType && 1 != t.luckyType) ||
                        ((f.suppressSelectedOrderAnim = !1),
                        f.orderCheck(),
                        e.RefreshDailyTaskFinishAnim(f));
                    },
                    !0,
                    T,
                    0.3,
                    "circOut",
                    !1,
                    E,
                  ));
              } else f.suppressSelectedOrderAnim = !1;
          },
          f = 0;
        f < t.datas.length;
        f++
      )
        p(f);
      return d;
    }),
    (e.canUseMainBoardEnergyAdjustment = function () {
      var e = G2.Data;
      return G2.MergeBoardType == ar.main && !!e && !e.gActId && !b2.IsSpecialEnergyBoard();
    }),
    (e.isElementInMultiEnergyBuff = function (e, t) {
      var i,
        n,
        o = t >= 4 ? config.BoardBuffType.fourTimesEnergy : config.BoardBuffType.doubleEnergy,
        r = config.BoardBuff.getByBuffId(o);
      return (
        !!r &&
        ((null === (i = r.elementExcept) || void 0 === i ? void 0 : i.length) > 0
          ? !r.elementExcept.includes(e)
          : !((null === (n = r.elementFilter) || void 0 === n ? void 0 : n.length) > 0) ||
            r.elementFilter.includes(e))
      );
    }),
    (e.getMultiEnergyTimes = function (e, t, i) {
      var n, o, r;
      if (
        (void 0 === i && (i = !1),
        i ||
          t != yr.manualProduct ||
          !(null ===
            (o = null === (n = null == e ? void 0 : e.data) || void 0 === n ? void 0 : n.config) ||
          void 0 === o
            ? void 0
            : o.costEnergy))
      )
        return 1;
      if (!this.canUseMainBoardEnergyAdjustment()) return 1;
      if (
        (null === (r = G2.Data) || void 0 === r ? void 0 : r.energyEnd) > 0 &&
        E8.serverTime < G2.Data.energyEnd
      )
        return 1;
      var a = oN.ClientLevel;
      return a <= 1 ? 1 : this.isElementInMultiEnergyBuff(e.data.config.id, a) ? a : 1;
    }),
    (e.getElementUpChain = function (e, t) {
      for (var i = [{ id: e, times: 1 }], n = e, o = 2; o <= t; o *= 2) {
        var r = config.Element.getById(n);
        if (!r || !r.mergeElementId || !b2.CheckElementValid(r.mergeElementId)) break;
        ((n = r.mergeElementId), i.push({ id: n, times: o }));
      }
      return i;
    }),
    (e.isValidBoardElementForMultiEnergyCount = function (e) {
      if (!e || !e.data) return !1;
      if (G$.IsCellInState(e, mr.web) || G$.IsCellInState(e, mr.box)) return !1;
      var t = e.data.elementType;
      return !(
        t.includes(Z2.BUBBLE) ||
        t.includes(Z2.AD_BUBBLE) ||
        t.includes(Z2.GOG_BUBBLE) ||
        t.includes(Z2.FROZEN_BUBBLE)
      );
    }),
    (e.getBoardElementCount = function (e) {
      var t,
        i = this,
        n = 0,
        o = null === (t = G2.Board) || void 0 === t ? void 0 : t.cells;
      return o
        ? (o.forEach(function (t) {
            t.forEach(function (t) {
              i.isValidBoardElementForMultiEnergyCount(t) && t.data.config.id == e && n++;
            });
          }),
          n)
        : n;
    }),
    (e.getOrderRemainDemandCount = function (e) {
      var t,
        i,
        n,
        o,
        r,
        a = 0,
        s = config.Element.getById(e),
        c =
          null === (t = config.SystemOrderLevelEnergy.config) || void 0 === t
            ? void 0
            : t.multiEnergyReturnMainOrderExcludeSeries;
      if (!s || !(null == c ? void 0 : c.includes(s.series))) {
        var l = null === (i = G2.Data) || void 0 === i ? void 0 : i.orders;
        null == l ||
          l.forEach(function (t) {
            if (t && !(t.orderId <= 0)) {
              var i = UT.getOrderConf(t.orderId);
              if (i)
                K6.ParseItemsConf(i.demand).forEach(function (t) {
                  !t || t.itemType != oa.element || t.itemId != e || t.value <= 0 || (a += t.value);
                });
            }
          });
      }
      var d =
        null ===
          (r =
            null === (o = null === (n = E8.role) || void 0 === n ? void 0 : n.systemAutoOrder) ||
            void 0 === o
              ? void 0
              : o.orderQueues) || void 0 === r
          ? void 0
          : r.get(wr.using);
      return (
        null == d ||
          d.forEach(function (t) {
            var i;
            null === (i = t.demand) ||
              void 0 === i ||
              i.forEach(function (t) {
                !t || t.itemType != oa.element || t.itemId != e || t.value <= 0 || (a += t.value);
              });
          }),
        a
      );
    }),
    (e.getLowerLevelElementId = function (e) {
      var t = config.Element.getById(e);
      if (!t) return 0;
      for (var i = 0; i < config.Element.list.length; i++) {
        var n = config.Element.list[i];
        if (n && n.series == t.series && n.mergeElementId == e) return n.id;
      }
      return 0;
    }),
    (e.getProtectedLowLevelResult = function (e, t) {
      if (!(null == t ? void 0 : t.length)) return null;
      for (var i = 0; i < t.length; i++) {
        var o = t[i],
          r = config.Element.getById(o.id);
        if (r) {
          var a = this.getBoardElementCount(o.id);
          if (1 == r.level && 1 == a)
            return n(n({}, o), { reason: "protect_level_1", detail: { baseId: e, baseCount: a } });
          if (2 == r.level) {
            var s = this.getLowerLevelElementId(o.id),
              c = s > 0 ? this.getBoardElementCount(s) : 0,
              l = a,
              d = Math.floor(c / 2) + l;
            if (1 == d)
              return n(n({}, o), {
                reason: "protect_level_2",
                detail: { baseId: e, lowerId: s, lowerCount: c, baseCount: l, convertedCount: d },
              });
          }
        }
      }
      return null;
    }),
    (e.adjustMultiEnergyProduct = function (e, t, i, n) {
      var o = this;
      void 0 === n && (n = !1);
      var r = this.getMultiEnergyTimes(e, i, n),
        a = {
          id: t,
          requestedTimes: r,
          actualTimes: 1,
          refundEnergy: 0,
          refundReason: "",
          refundDebug: null,
        };
      if (r <= 1 || t <= 0) return a;
      for (
        var s = this.getElementUpChain(t, r),
          c = s.map(function (e) {
            return {
              id: e.id,
              times: e.times,
              orderRemain: o.getOrderRemainDemandCount(e.id),
              boardCount: o.getBoardElementCount(e.id),
            };
          }),
          l = s[s.length - 1],
          d = l.times < r ? "series_upper_limit" : "",
          u = l.times < r ? { maxReachableTimes: l.times } : null,
          p = c.length - 1;
        p >= 0;
        p--
      ) {
        var f = c[p];
        if (f.orderRemain > 0 && f.boardCount < f.orderRemain) {
          ((l = { id: f.id, times: f.times }),
            (d = "order_need_lower_element"),
            (u = { demandElementId: f.id, demandCount: f.orderRemain, boardCount: f.boardCount }));
          break;
        }
      }
      var g = this.getProtectedLowLevelResult(t, s);
      g && g.times < l.times && ((l = g), (d = g.reason), (u = g.detail));
      var v = G$.GetCellHp(e, i);
      if (v > 0 && l.times > v) {
        var m = s[0];
        for (p = s.length - 1; p >= 0; p--)
          if (s[p].times <= v) {
            ((m.id = s[p].id), (m.times = s[p].times));
            break;
          }
        ((l = m), (d = "hp_limit"), (u = { hp: v, limitedTimes: m.times }));
      }
      return (
        (a.id = l.id),
        (a.actualTimes = l.times),
        (a.refundEnergy = Math.max(0, e.data.config.costEnergy * (r - l.times))),
        (a.refundReason = a.refundEnergy > 0 ? d : ""),
        (a.refundDebug = a.refundEnergy > 0 ? u : null),
        a.refundEnergy > 0 &&
          h.warn(
            "[MultiEnergyRefund][calc]",
            "reason:",
            a.refundReason,
            "debug:",
            a.refundDebug,
            "fromEle:",
            t,
            "toEle:",
            a.id,
            "launcher:",
            e.data.config.id,
            "requestedTimes:",
            r,
            "actualTimes:",
            a.actualTimes,
            "costEnergy:",
            e.data.config.costEnergy,
            "refundEnergy:",
            a.refundEnergy,
            "chain:",
            s
              .map(function (e) {
                return e.id + "x" + e.times;
              })
              .join("->"),
            "chainStats:",
            c,
          ),
        a
      );
    }),
    (e.adjustActivityMultiEnergyProduct = function (e, t, i, n) {
      var o, r;
      void 0 === n && (n = !1);
      for (
        var a = n
            ? 0
            : oN.getProductBuffTimes(
                null ===
                  (r =
                    null === (o = null == e ? void 0 : e.data) || void 0 === o
                      ? void 0
                      : o.config) || void 0 === r
                  ? void 0
                  : r.id,
                i,
              ),
          s = Math.max(1, a),
          c = t,
          l = a;
        l > 1;
        l /= 2
      ) {
        var d = config.Element.getById(c);
        if (
          !(null == d ? void 0 : d.mergeElementId) ||
          !b2.CheckElementValid(d.mergeElementId) ||
          !YF.isUnlockHeightLevelCell(d.mergeElementId)
        )
          break;
        c = d.mergeElementId;
      }
      return {
        id: c,
        requestedTimes: s,
        actualTimes: 1,
        productEffectTimes: s,
        refundEnergy: 0,
        refundReason: "",
        refundDebug: null,
      };
    }),
    (e.CellProductCheck = function (e, t, i, n, o) {
      (void 0 === n && (n = !1), void 0 === o && (o = !1));
      var r = !1,
        a = -1;
      if (!e || !e.data) return { id: -1, state: 0, isList: !1, isAutoList: !1, luckyType: a };
      var s = G2.GetCellRecovery(e.serverIdx, t);
      if (G$.CheckProductMax(e, t == yr.autoProduct, i))
        return { id: -1, state: 0, isList: !1, isAutoList: !1, luckyType: a };
      if (null != s) {
        var c = config.Element.getById(e.data.remoteData.elementId),
          l = G2.Data.tutorialOrder.get(c.series),
          d = -1,
          u = !1,
          p = !1;
        if ("Magic" == e.data.config.series) {
          var f = sM.unFinishItem(!0);
          if (!f || !f.length) {
            var g = sM.getBingoActivity();
            return (
              Cv.recycle({ aid: g.id, content: g.content }),
              this.ShowReloadTip(v.getLabel("mergeReq_elementNoexist")),
              null
            );
          }
          var m = new Map();
          f.forEach(function (e) {
            var t = m.get(e);
            (t || (t = 0), t++, m.set(e, t));
          });
          var y = [];
          (m.forEach(function (e, t) {
            y.push({ item: t, weight: e });
          }),
            (d = this.BoardRandomElement(e, y)));
        } else if (X8.isShovel(e.data.config.id)) {
          if (s.value > 1) d = X8.getConf().rubbishElementId;
          else d = parseInt(e.data.remoteData.extra.get(fr.chess4VegetableID));
        } else if (e.data.config.elementOrderId < 0) {
          var _ = e.data.remoteData.order,
            b = config.ElementMultiOrderPool.getById(_.orderId),
            w = [];
          (b.elementIdWeight.forEach(function (e, t) {
            var i = t.split("_"),
              n = parseInt(i[0]);
            w.push({ item: n, weight: e });
          }),
            (d = this.BoardRandomElement(e, w)));
        } else if (null != l && l.length > 0)
          ((d = l.shift()),
            h.warn("boardRandomElement tutorial", d, G2.BoardRender.data.seed.seed));
        else {
          var C = config.DuanwuElement.getById(c.id);
          if (C) {
            g = U2.getDuanwu();
            if (c.elementIdList.length > 0 && C.elementIdList2.length > 0) {
              switch (g.group) {
                case 1:
                  d = c.elementIdList[i % c.elementIdList.length];
                  break;
                case 2:
                  d = C.elementIdList2[i % C.elementIdList2.length];
              }
              u = !0;
            } else {
              var I = [],
                S = null;
              switch (g.group) {
                case 1:
                  S = c.elementIdWeight;
                  break;
                case 2:
                  S = C.elementIdWeight2;
              }
              (S.forEach(function (e, t) {
                var i = t.split("_"),
                  n = parseInt(i[0]);
                I.push({ item: n, weight: e });
              }),
                (d = this.BoardRandomElement(e, I)));
            }
          } else {
            var T = [];
            S = null;
            if (t == yr.autoProduct)
              c.AutoIdList.length > 0 && i < c.AutoIdList.length
                ? ((d = c.AutoIdList[i]), (p = !0))
                : c.AutoIdList.length > 0
                  ? c.AutoId.size > 0
                    ? (S = c.AutoId)
                    : ((d = c.AutoIdList[i % c.AutoIdList.length]), (p = !0))
                  : (S = c.AutoId);
            else if (t == yr.manualProduct) {
              var E = q6.instance.getElementAB(c.id);
              E.elementIdList.length > 0 && i < E.elementIdList.length
                ? ((d = E.elementIdList[i]), (u = !0))
                : E.elementIdList.length > 0
                  ? c.elementIdWeight.size > 0
                    ? (S = c.elementIdWeight)
                    : ((d = E.elementIdList[i % E.elementIdList.length]), (u = !0))
                  : (S = c.elementIdWeight);
            }
            if (-1 == d && S) {
              if (t == yr.manualProduct) {
                var A = e.data.remoteData.extra.get(fr.specialLauncherSeq),
                  k = this.parseSpecialLauncher(A, c.id);
                if (
                  (e.data.remoteData.extra.set(fr.specialLauncherSeq, k.newExt),
                  k && k.targetId && (d = k.targetId),
                  -1 == d)
                ) {
                  var R = this.parseSpecialLauncher2(e);
                  R.targetId && ((d = R.targetId), (r = !0));
                }
              }
              if (-1 == d) {
                var P = e.data.seed,
                  D = oN.getProductBuffTimes(e.data.remoteData.elementId, t),
                  B = D > 0 ? D : 1,
                  L = XF.getLuckyPool(e.data.remoteData.elementId, B),
                  N = e,
                  O = N.storeSourceCell
                    ? MW.getStoreLuckyMax(
                        N.storeSourceCell,
                        e.data.remoteData.elementId,
                        e.data.remoteData,
                      )
                    : 0;
                if (XF.hasAvailableLuckyWeight(L))
                  (!!N.storeSourceCell
                    ? O > 0 && XF.isBingo(e.data.remoteData, P, O)
                    : XF.isBingo(e.data.remoteData, P)) &&
                    ((d = this.BoardRandomElementByMapAndSeed(L, P)),
                    (a = XF.isSupperLucky(d) ? 1 : 0));
              }
              var x;
              if ((-1 == d && (d = LA.createElement(e)), -1 == d))
                if (n) (x = AW.createStableRandom(c.id, "manualB")) && (d = x.stableRes);
                else
                  (x = AW.createStableRandom(c.id, t == yr.autoProduct ? "auto" : "manual")) &&
                    (d = x.stableRes);
              if (-1 == d)
                if (n) {
                  c.elementIdWeightB.forEach(function (e, t) {
                    var i = t.split("_"),
                      n = parseInt(i[0]);
                    T.push({ item: n, weight: e });
                  });
                  var M = new oC(e.data.seedB);
                  ((d = this.BoardRandomElementBySeed(T, M)), (e.data.remoteData.seedB = M.seed));
                } else
                  (S.forEach(function (e, t) {
                    var i = t.split("_"),
                      n = parseInt(i[0]);
                    T.push({ item: n, weight: e });
                  }),
                    (d = this.BoardRandomElement(e, T)));
            }
          }
        }
        var G = this.canUseMainBoardEnergyAdjustment()
          ? this.adjustMultiEnergyProduct(e, d, t, o)
          : this.adjustActivityMultiEnergyProduct(e, d, t, o);
        if (((d = G.id), null == NE ? void 0 : NE.instance))
          if (NE.instance.checkElementShowed(d)) {
            var F = NE.instance.chess6Conf;
            F && (d = F.exchangeEleId);
          }
        var W = 0;
        t == yr.manualProduct ? (W = c.dustRate) : t == yr.autoProduct && (W = c.autoDustRate);
        var U = W > 0 ? mr.web : mr.none,
          H = "productEffectTimes" in G ? G.productEffectTimes : G.actualTimes;
        return {
          id: d,
          state: U,
          isList: u,
          isAutoList: p,
          requestedTimes: G.requestedTimes,
          actualTimes: G.actualTimes,
          productEffectTimes: H,
          refundEnergy: G.refundEnergy,
          refundReason: G.refundReason,
          refundDebug: G.refundDebug,
          luckyType: a,
          specialLauncher2Triggered: r,
        };
      }
      return null;
    }),
    (e.parseSpecialLauncher = function (e, t) {
      if (!e || !e.length) return { newExt: "", targetId: 0 };
      G2.instance.handbookUpdate = !0;
      var i = e.split(","),
        n = i[0].split("_"),
        o = n[0],
        r = parseInt(n[1]),
        a = parseInt(n[2]);
      if (K6.isUnLocked(o)) {
        var s = r <= 0,
          c = s ? a : 0,
          l = 1,
          d = oN.ClientLevel;
        (d > 1 &&
          config.BoardBuff.getByBuffId(config.BoardBuffType.doubleEnergy).elementFilter.includes(
            t,
          ) &&
          (l = d),
          (r -= l) < 0 && (r = 0));
        var u = "";
        if (s) for (var h = 1; h < i.length; ++h) ((u += i[h]), h < i.length - 1 && (u += ","));
        else {
          u += o + "_" + r + "_" + a;
          for (h = 1; h < i.length; ++h) ((u += ","), (u += i[h]));
        }
        return { newExt: u, targetId: c };
      }
      return { newExt: e, targetId: 0 };
    }),
    (e.checkNextSpecialLauncher = function (e) {
      if (!e || !e.length) return !1;
      var t = e.split(",")[0];
      if (!t) return !1;
      var i = t.split("_"),
        n = i[0],
        o = parseInt(i[1]);
      return K6.isUnLocked(n) && o <= 0;
    }),
    (e.getSpecialLauncher2Config = function (e) {
      var t = config.Config.config.specialLaunchSeq2;
      if (!t) return null;
      var i = "";
      if (!(i = t.keys ? t.get(e) : t[e] || t[e.toString()])) return null;
      var n = i.split("_");
      if (2 != n.length) return null;
      var o = parseInt(n[0]),
        r = parseInt(n[1]);
      return o <= 0 || r <= 0 ? null : { targetEnergy: o, targetId: r };
    }),
    (e.parseSpecialLauncher2 = function (e) {
      var t = this.getSpecialLauncher2Config(e.data.config.id);
      if (!t) return { targetId: 0 };
      var i = e.data.remoteData.extra;
      return parseInt(i.get(fr.specialLauncherSeq2Energy) || "0") < t.targetEnergy
        ? { targetId: 0 }
        : (i.set(fr.specialLauncherSeq2Energy, "0"), { targetId: t.targetId });
    }),
    (e.checkNextSpecialLauncher2 = function (e) {
      if (!(null == e ? void 0 : e.data)) return !1;
      var t = this.getSpecialLauncher2Config(e.data.config.id);
      return (
        !!t &&
        parseInt(e.data.remoteData.extra.get(fr.specialLauncherSeq2Energy) || "0") >= t.targetEnergy
      );
    }),
    (e.addSpecialLauncher2Energy = function (e, t) {
      if (
        (null == e ? void 0 : e.data) &&
        !(t <= 0) &&
        this.getSpecialLauncher2Config(e.data.config.id)
      ) {
        var i = e.data.remoteData.extra,
          n = parseInt(i.get(fr.specialLauncherSeq2Energy) || "0");
        i.set(fr.specialLauncherSeq2Energy, (n + t).toString());
      }
    }),
    (e.addSpecialSeq = function (e) {
      var t = config.Config.config.specialLaunchSeq;
      if (!t) return "";
      var i = new Map();
      if (t.keys)
        t.forEach(function (e, t) {
          i.set(t.toString(), e);
        });
      else for (var n in t) i.set(n, t[n]);
      var o = i.get(e.toString());
      if (!o) return "";
      for (var r = "", a = 0; a < o.length; ++a) ((r += o[a]), a < o.length - 1 && (r += ","));
      return r;
    }),
    (e.findAdBubbleConfig = function (e, t) {
      var i = config.AdBubble.sheetList.get(t),
        n = E8.adScore;
      if (!i) return { adConf: null, adConfIndex: -1 };
      for (var o = 0; o < i.length; o++)
        if (!(
          n < i[o].scoreRange[0] ||
          n > i[o].scoreRange[1] ||
          e.level < i[o].levelLimit[0] ||
          e.level > i[o].levelLimit[1]
        ))
          return { adConf: i[o], adConfIndex: o };
      return { adConf: null, adConfIndex: -1 };
    }),
    (e.CellAdBubbleCheck = function (e) {
      if (!e || !e.data || !e.data.remoteData) return -1;
      var t = config.Element.getById(e.data.remoteData.elementId),
        i = Ie(G2.MergeBoardType, ar);
      if (!t || !i) return -1;
      var n = this.findAdBubbleConfig(E8.role, i),
        o = n.adConf,
        r = n.adConfIndex;
      if (!o || -1 == r) return -1;
      var a = fG.GetBoardAdBubbleNum(),
        s = fG.GetAdBubbleCount(),
        c = o.adBubbleMax - s;
      if (a >= c)
        return (
          fG.debugLog &&
            pe() &&
            console.error("当前棋盘广告气泡数超过最大获取次数:当前气泡数", a, "最多还能获取数", c),
          -1
        );
      if (a >= o.adBubbleMaxInBoard)
        return (
          fG.debugLog &&
            pe() &&
            console.error(
              "当前广告气泡数量已达到棋盘上限:当前数量",
              a,
              "上限",
              o.adBubbleMaxInBoard,
            ),
          -1
        );
      if (o.adBubbleProb <= 0 || c <= 0)
        return (fG.debugLog && pe() && console.error("不可继续获得广告气泡"), -1);
      var l = fG.GetAdbubbleGear(),
        d = fG.GetAdbubbleEnergConf(o);
      l >= d.length && (l = d.length - 1);
      var u = fG.GetAdBubbleDayCost();
      if (u < d[l])
        return (
          fG.debugLog &&
            pe() &&
            console.error("广告气泡体力消耗不足 当前体力", u, "所需体力", d[l]),
          -1
        );
      var h = e.data.randomInt(0, 1e3);
      if (h >= o.adBubbleProb)
        return (
          fG.debugLog &&
            pe() &&
            console.error("当前气泡概率不满足:当前概率", h, "概率", o.adBubbleProb),
          -1
        );
      var p = [];
      o.adBubbleContent[l].forEach(function (e, t) {
        p.push({ item: t, weight: e });
      });
      var f = this.BoardRandomElement(e, p);
      if ("" == f) return -1;
      if ("Element" != f) return parseInt(f);
      var g = [];
      if (
        (config.AdBubblePrice.sheetList.get(i).forEach(function (e) {
          e.elementSeries == t.series && g.push(e);
        }),
        !g || g.length < 0)
      )
        return (pe() && fG.debugLog && console.error("当前气泡系列未找到:当前系列", t.series), -1);
      g.sort(function (e, t) {
        return t.id - e.id;
      });
      var v = [];
      if (
        (g.forEach(function (e) {
          "Element" == f && (t.id < e.id || v.push({ item: e.id, weight: e.weight[r] }));
        }),
        !v || v.length <= 0)
      )
        return (
          pe() && fG.debugLog && console.error("当前气泡等级未找到:当前等级", t.id, "等级", r),
          -1
        );
      var m = this.BoardRandomElement(e, v);
      return m && -1 != m ? m : -1;
    }),
    (e.CellGogBubbleCheck = function (e) {
      if (!e || !e.data || !e.data.remoteData) return -1;
      var t =
          E8.role.level >= config.Config.config.Bubble3Level[0] &&
          E8.role.level <= config.Config.config.Bubble3Level[1],
        i = G2.MergeBoardType == ar.main,
        n = config.GogBubble.getById(e.data.remoteData.elementId);
      if (!t || !i || !n) return -1;
      if (Pq.GogBubbleCount >= config.Config.config.MainGogBubbleMax) return -1;
      if (E8.serverTime < G2.Data.buff.get(config.BoardBuffType.bubble3CD)) return -1;
      if (e.data.randomInt(0, 100) >= n.bubble3Rate) return -1;
      var o = new Map();
      (G2.Data.orders.forEach(function (e) {
        if (e && !(e.orderId < 0)) {
          var t,
            i = UT.getOrderConf(e.orderId);
          ((t = i.demand),
            K6.ParseItemsConf(t).forEach(function (e) {
              var t = config.GogBubble.getById(e.itemId);
              if (t && t.canBubble3) {
                var i = o.get(e.itemId);
                (i || (i = 0), (i += e.value), o.set(e.itemId, i));
              }
            }));
        }
      }),
        G2.BoardCells.forEach(function (e) {
          if (0 == e.bubbleEnd) {
            var t = o.get(e.elementId);
            t && (--t <= 0 ? o.delete(e.elementId) : o.set(e.elementId, t));
          }
        }));
      var r = [];
      return (
        o.forEach(function (e, t) {
          r.push({ item: t, weight: e });
        }),
        0 == r.length ? -1 : this.BoardRandomElement(e, r)
      );
    }),
    (e.CellGoldBubbleCheck = function (e) {
      if (!e || !e.data || !e.data.remoteData) return -1;
      var t = config.Element.getById(e.data.remoteData.elementId);
      if (
        G2.MergeBoardType != U2.getBoardType() &&
        G2.MergeBoardType != H2.getBoardType() &&
        G2.MergeBoardType != ar.main
      )
        return -1;
      if (
        E8.role.level >= config.Config.config.forbidBubble2PlayerLevel &&
        e.data.randomInt(0, 100) < t.bubble2Rate
      ) {
        var i = new Map(),
          n = function (e) {
            K6.ParseItemsConf(e).forEach(function (e) {
              if (config.Element.getById(e.itemId).canBubble2) {
                var t = i.get(e.itemId);
                (t || (t = 0), (t += e.value), i.set(e.itemId, t));
              }
            });
          };
        if (G2.MergeBoardType == ar.main)
          G2.Data.orders.forEach(function (e) {
            if (e && !(e.orderId < 0)) {
              var t = UT.getOrderConf(e.orderId);
              n(t.demand);
            }
          });
        else {
          var o = U2.getActivity(),
            r = H2.getActivity();
          if (o)
            o.curTask.forEach(function (e) {
              var t = config.ChessBoardOrder.getById(e);
              n(t.demand);
            });
          else {
            if (!r) return -1;
            r.curTask.forEach(function (e) {
              var t = config.Chess2BoardOrder.getById(e);
              n(t.demand);
            });
          }
        }
        G2.BoardCells.forEach(function (e) {
          if (0 == e.bubbleEnd) {
            var t = i.get(e.elementId);
            t && (--t <= 0 ? i.delete(e.elementId) : i.set(e.elementId, t));
          }
        });
        var a = [];
        return (
          i.forEach(function (e, t) {
            a.push({ item: t, weight: e });
          }),
          0 == a.length ? -1 : this.BoardRandomElement(e, a)
        );
      }
      return -1;
    }),
    (e.CellBubbleCheck = function (e) {
      if (!e || !e.data || !e.data.remoteData) return -1;
      var t = config.Element.getById(e.data.remoteData.elementId);
      if (E8.role.level < config.Config.config.forbidBubblePlayerLevel) return -1;
      var i = e.data.randomInt(0, 100);
      if (i < this.GetBubbleRate(e.data.remoteData.elementId)) return e.data.remoteData.elementId;
      if (G2.MergeBoardType == ar.duanwu) return -1;
      if (E8.role.level < config.Config.config.forbidPropBubblePlayerLevel) return -1;
      if ((i = e.data.randomInt(0, 1e3)) < t.propBubbleRate) {
        var n = [];
        return (
          t.propBubbleTypeAndWeight.forEach(function (e, t) {
            var i = t.split("_"),
              o = parseInt(i[0]);
            n.push({ item: o, weight: e });
          }),
          this.BoardRandomElement(e, n)
        );
      }
      return -1;
    }),
    (e.GetBubbleRate = function (e) {
      var t = config.Element.getById(e),
        i = G2.MergeBoardType,
        n = b2.GetBoardByType(i),
        o = t.bubbleRate;
      if (!n || !t.bubbleRate2) return o;
      var r = !1,
        a = function (e) {
          if (!r) {
            var i = config.Element.getById(e);
            i && i.series == t.series && t.level < i.level && ((o = t.bubbleRate2), (r = !0));
          }
        };
      if (i == ar.main) {
        if (
          (n.orders.forEach(function (e) {
            if (!(e.orderId < 0)) {
              var t = UT.getOrderConf(e.orderId);
              if (t)
                K6.ParseItemsConf(t.demand).forEach(function (e) {
                  e.itemType == oa.element && a(e.itemId);
                });
            }
          }),
          r)
        )
          return o;
        var s = E8.role.branchTask;
        if (
          (s &&
            s.curTaskId &&
            E8.role.branchTask.curTaskId.forEach(function (e, t) {
              var i = config.OrderBranch.getById(e).demand;
              K6.ParseItemsConf(i).forEach(function (e) {
                e.itemType == oa.element && a(e.itemId);
              });
            }),
          r)
        )
          return o;
        if (xT.getState() == NT.START) {
          var c = xT.getAct();
          c &&
            c.curTaskId.forEach(function (e) {
              var t = config.OrderRoutineCheck.getById(e);
              t &&
                K6.ParseItemsConf(t.demand).forEach(function (e) {
                  e.itemType == oa.element && a(e.itemId);
                });
            });
        }
        if (r) return o;
        if ((LF.foreachBubbleRateDemandElement(a), r)) return o;
        if (
          (hJ.getState() == lJ.START &&
            E8.role.butterfly.curTaskId.forEach(function (e, t) {
              var i = config.OrderSpecial.getById(e).demand;
              K6.ParseItemsConf(i).forEach(function (e) {
                e.itemType == oa.element && a(e.itemId);
              });
            }),
          r)
        )
          return o;
        var l = aV.getAllOrders();
        if (
          (l &&
            l.forEach(function (e) {
              var t = config.DrawerLimited.getById(e.orderId).demand;
              K6.ParseItemsConf(t).forEach(function (e) {
                e.itemType == oa.element && a(e.itemId);
              });
            }),
          r)
        )
          return o;
        if (sM.getStage() == Nx.Start) {
          var d = sM.unFinishItem();
          d &&
            d.forEach(function (e) {
              return a(e);
            });
        }
        if (r) return o;
      }
      return o;
    }),
    (e.BoardRandomElement = function (e, t, i) {
      if ((void 0 === i && (i = 0), t.length <= 0)) return -1;
      t.sort(function (e, t) {
        return e.item - t.item;
      });
      var n = null;
      if (t.length > 1) {
        var o = 0;
        t.forEach(function (e, t) {
          o += e.weight;
        });
        for (
          var r = i ? new oC(i).randomInt(0, o) : e.data.randomInt(0, o), a = 0;
          a < t.length;
          a++
        ) {
          var s = t[a];
          if ((r -= s.weight) < 0) {
            n = s;
            break;
          }
        }
      } else n = t[0];
      if (!n) throw Error("random element error");
      var c = n.item;
      return (h.warn("boardRandomElement result", c, e && e.data && e.data.seed), c);
    }),
    (e.BoardRandomElementCount = function (e, t, i, n, o) {
      if (
        (void 0 === i && (i = 0), void 0 === n && (n = 1), void 0 === o && (o = !1), t.length <= 0)
      )
        return { seed: 0, res: [] };
      if (
        (t.sort(function (e, t) {
          return e.item - t.item;
        }),
        1 == t.length)
      )
        return { seed: 0, res: [t[0].item] };
      var r = [];
      if (!o && n >= t.length) {
        for (var a = 0; a < t.length; ++a) {
          var s = t[a].item;
          r.push(s);
        }
        return { seed: 0, res: r };
      }
      var c = 0;
      t.forEach(function (e, t) {
        c += e.weight;
      });
      var l = new oC(i);
      for (a = 0; a < n; ++a)
        for (var d = i ? l.randomInt(0, c) : e.data.randomInt(0, c), u = 0; u < t.length; ++u) {
          var h = t[u];
          (d -= h.weight) < 0 && (o || ((c -= h.weight), (h.weight = 0)), r.push(h.item));
        }
      return { seed: l.seed, res: r };
    }),
    (e.BoardRandomElementByMapAndSeed = function (e, t) {
      var i = [];
      return (
        e.forEach(function (e, t) {
          i.push({ item: t, weight: e });
        }),
        this.BoardRandomElementBySeed(i, t)
      );
    }),
    (e.BoardRandomElementBySeed = function (e, t) {
      if (e.length <= 0) return -1;
      e.sort(function (e, t) {
        return e.item - t.item;
      });
      var i = null;
      if (e.length > 1) {
        var n = 0;
        e.forEach(function (e, t) {
          n += e.weight;
        });
        for (var o = t.randomInt(0, n), r = 0; r < e.length; r++) {
          var a = e[r];
          if ((o -= a.weight) < 0) {
            i = a;
            break;
          }
        }
      } else i = e[0];
      if (!i) throw Error("random element error");
      return i.item;
    }),
    (e.ButterflyPassRandom = function (e, t) {
      if (e.length <= 0) return -1;
      e.sort(function (e, t) {
        return e.item - t.item;
      });
      var i = null;
      if (e.length > 1) {
        var n = 0;
        e.forEach(function (e, t) {
          n += e.weight;
        });
        for (var o = new oC(t).randomInt(0, n), r = 0; r < e.length; r++) {
          var a = e[r];
          if ((o -= a.weight) < 0) {
            i = a;
            break;
          }
        }
      } else i = e[0];
      return i ? i.item : -1;
    }),
    (e.BoardRandomElementDebug = function (e) {
      void 0 === e && (e = 8);
      for (var t = G$.GetCellByIndex(e), i = new Map(), n = 0; n < 1e6; n++) {
        var o = this.CellProductCheck(t, yr.manualProduct, 1),
          r = i.get(o.id);
        (r || (r = 0), r++, i.set(o.id, r));
      }
      var a = [];
      (i.forEach(function (e, t) {
        var n = i.get(t) / 1e6;
        a.push(t + ":" + n);
      }),
        console.error(i, a));
    }),
    (e.PutIntoChannel = function (t, i, n) {
      void 0 === n && (n = !1);
      var o = G$.GetCellByIndex(i).data,
        r = new Za();
      ((r.id = e.GetMergeIncreaseId()),
        (r.itemId = t),
        (r.itemType = oa.element),
        (r.value = 1),
        (r.state = o ? o.elementLockStage : 0),
        (r.from = "channelBag"),
        (r.bagId = 0),
        G2.ChannelAdd(r),
        this.BoardRequestSend(
          hm.channelBag,
          { boardId: G2.Data.id, index: n ? 0 : i, elementId: t, timestamp: E8.serverTime },
          "channelbag",
        ),
        u.dispatch("updateChannelInfo"));
    }),
    (e.CellProductRequest = function (e, t, i, n, o, s) {
      var c = this;
      (void 0 === n && (n = !1),
        e.forEach(function (e) {
          e.state != mr.box && e.state != mr.web && G$.SetElementKnow(e.elementId);
        }));
      return (
        r(c, void 0, void 0, function () {
          var i,
            r,
            c,
            l,
            d,
            u,
            h,
            p,
            f,
            g = this;
          return a(this, function (a) {
            return (
              (i = []),
              e.forEach(function (e) {
                i.push({ elementId: e.elementId, index: e.index, productType: e.productType });
              }),
              (r = function (e, i) {
                (t.data && b.addClock("selectSoundLock_" + t.data.serverData.uUID, 10, 1e3, 1),
                  g.seedLog &&
                    e
                      .getData()
                      .role.boards.get(G2.Data.id)
                      .cells.forEach(function (e, t) {
                        e.seed > 0 &&
                          console.warn(
                            ">>>>>>>>>> remote product index:" +
                              e.index.toString() +
                              " seed:" +
                              e.seed.toString(),
                          );
                      }));
                var n = E8.role.energy.timer;
                if ((n.resume(), !n.isFull)) {
                  var o = n.getLeftTimeMax() / 1e3;
                  IC.addPush(bC.Energy, o);
                }
              }),
              (c = {
                boardId: G2.Data.id,
                index: t.serverIdx,
                count: i.length,
                cells: i,
                timestamp: E8.serverTime,
                seqId: o,
                launcherIndex: s,
              }),
              (l = null != s ? "launcher:" + s : ""),
              EJ.BoardRequestSendDebounce(
                c,
                "cellproduct",
                r.bind(this),
                "from" + t.serverIdx + l + "create:" + i[0].index + "_" + i[0].elementId,
              ),
              F8.switches.boardDebugInfo &&
                ((d = "from:" + t.serverIdx + "create:" + i[0].index + "_" + i[0].elementId),
                n &&
                  (u = G$.GetCellByIndex(t.serverIdx)) &&
                  u.data &&
                  (h = u.data.remoteData.recovery.get(yr.autoProduct)) &&
                  ((p = h.value), (f = h.startTime), (d += "value:" + p + "starttime:" + f)),
                K3.logEvent("board_operate_info", { type: "cellproduct", detail: d })),
              [2]
            );
          });
        }),
        e
      );
    }),
    (e.BreakBubble = function (e) {
      this.BoardRequestSend(
        hm.breakBubble,
        { boardType: G2.MergeBoardType, index: e.serverIdx, timestamp: E8.serverTime },
        "cellbreakbubble",
      );
    }),
    (e.UnlockAdBubble = function (e) {
      this.BoardRequestSend(
        hm.cellBuyCd,
        {
          boardId: G2.Data.id,
          index: e.serverIdx,
          cdType: pr.bubble,
          cost: 0,
          timestamp: E8.serverTime,
        },
        "cellbuyAdBubble",
      );
    }),
    (e.AdSkipCreator = function (e, t) {
      this.BoardRequestSend(
        hm.cellBuyCd,
        {
          boardId: G2.Data.id,
          index: e.serverIdx,
          cdType: t,
          cost: 0,
          timestamp: E8.serverTime,
          adSkipCd: !0,
        },
        "cellbuyAdSkip",
      );
    }),
    (e.UnlockGogBubble = function (e) {
      if (
        e &&
        e.data &&
        e.data.elementType.includes(Z2.BUBBLE) &&
        e.data.remoteData.productType == vr.challengeBubble
      ) {
        var t = E8.serverTime;
        (this.BoardRequestSend(
          hm.cellBuyCd,
          { boardId: G2.Data.id, index: e.serverIdx, cdType: pr.bubble, cost: 0, timestamp: t },
          "cellbuyGogBubble",
        ),
          K3.logEvent("gogBubble", { type: 8 }));
        var i = G2.BoardCells.get(e.serverIdx);
        ((i.bubbleEnd = 0),
          (i.productType = vr.none),
          i.openEnd > 0 &&
            e.data.config.unlockDuration &&
            (i.openEnd =
              E8.serverTime +
              1e3 * G$.getELementUnlockDuration(e.data.config.id, e.data.config.unlockDuration)),
          i.deteriorateEnd > 0 &&
            e.data.config.deterioratedDuration &&
            (i.deteriorateEnd = E8.serverTime + 1e3 * e.data.config.deterioratedDuration),
          (i.recovery = null));
        var n = GW.ParseCellCofigByData(i);
        (GW.RemoveShortCd(n.remoteData, yr.manualProduct),
          (n.isOld = !1),
          (e.data = n),
          (e.mergeCellRender.node_icon.scale = 0.8));
        var o = cc
          .tween(e.mergeCellRender.node_icon)
          .to(0.166, { scale: 1.2 })
          .to(0.1, { scale: 0.95 })
          .to(0.033, { scale: 1 });
        (e.showOnceTween(o),
          e3.AddCellAnim(e, TC.BUBBLE_END2),
          e3.RemoveCellAnim(e, TC.DISCOUNT_TIPS),
          e3.RemoveCellAnim(e, TC.GOG_BUBBLE_TIP),
          j8.play(o_.MERGE_END_BUBBLE),
          u.dispatch("showElementInfo", e));
      }
    }),
    (e.CellBuyCd = function (e, t, n, o) {
      (void 0 === n && (n = 0), void 0 === o && (o = !1));
      var r = MW.isStoreCell(e) ? MW.getCurrentLauncher(e) : null,
        a = !!r && (t == pr.manualProduct || t == pr.autoProduct || t == pr.shortRecovery),
        s = a ? r.index : void 0,
        c = a ? r.cell : null,
        l = a ? r.conf : null,
        u = {
          boardId: G2.Data.id,
          index: e.serverIdx,
          launcherIndex: s,
          cdType: t,
          cost: n,
          timestamp: E8.serverTime,
        };
      (this.BoardRequestSend(hm.cellBuyCd, u, "cellbuycd", function (e, t) {
        t || EM.instance.claimPendingRewards();
      }),
        F8.switches.boardDebugInfo &&
          K3.logEvent("board_operate_info", {
            type: "cellbuycd",
            detail: "from:" + e.serverIdx + "cdType:" + t + "cost:" + n,
          }));
      var h = E8.role.diamond;
      if (t == pr.webUnlock)
        if (h >= (n = e.data.config.dustingCostDiamond)) {
          if (
            ((G2.BoardCells.get(e.serverIdx).state = 0),
            (e.data = GW.ParseCellConfig(
              {
                id: e.data.config.id,
                seed: e.data.seed.seed,
                state: mr.none,
                productType: vr.none,
                extra: e.data.remoteData.extra,
              },
              e.serverIdx,
            )),
            G$.UnlockAroundCells(e),
            (_ = K6.checkElementGetResources(e, vr.none, !0)))
          )
            (b = e3.AddCellAnim(e, TC.SCORE).getComponent(K2)) && b.updateView(_);
          var p = dI.instance;
          p &&
            p.isInActBoard &&
            e.data.config.id == p.boardInfo.unlockShop &&
            ((p.actData.unlockBoardShop = !0), d.emit(i.UpdateActShopOpen));
        } else n = 0;
      else if (t == pr.chestOpen)
        if (h >= n || G2.Data.freeSpeedUpTimes) {
          if (
            ((G2.BoardCells.get(e.serverIdx).openEnd = 0),
            G$.AddCellState(e, mr.opened),
            (I = e.data.remoteData).skills.get(Da.speedUp) &&
              I.recovery.forEach(function (e) {
                var t = e;
                t.speedUpStartTime && (t.speedUpStartTime = E8.serverTime);
              }),
            (e.data = e.data),
            DG.addCellSpeedUpAnim(e),
            e.data.elementType.includes(Z2.CHEST))
          )
            (e3.RemoveCellAnim(e, TC.MANU_OPEN),
              e3.AddCellAnim(e, TC.CLOCK_DISAPPEAR),
              b2.isElementNewUnlock(e.data.config.id)
                ? b2.ManuNewUnlockFinish()
                : b2.ManuUnlockFinish());
          G2.Data.freeSpeedUpTimes > 0 && (G2.Data.freeSpeedUpTimes -= 1);
        } else n = 0;
      else if (t == pr.bubble) {
        var f = e.data.remoteData.productType,
          g = e.dynamicComponents.get("BubbleRecover");
        if (
          (f == vr.bubble
            ? ((n = g && g.costGem ? g.costGem : e.data.config.bubbleCost),
              b2.IsBubbleFree(f) && (n = 0))
            : b2.CanUseGoldBubbleDiscount() ||
              (n = g && g.costGem ? g.costGem : e.data.config.bubble2Cost),
          o && (n = 0),
          h >= n)
        ) {
          (qG.checkEnergy(e, 0, !0, !0),
            e.data.remoteData.extra.set(fr.energy, ""),
            ((I = G2.BoardCells.get(e.serverIdx)).bubbleEnd = 0),
            I.openEnd > 0 &&
              e.data.config.unlockDuration &&
              (I.openEnd =
                E8.serverTime +
                1e3 * G$.getELementUnlockDuration(e.data.config.id, e.data.config.unlockDuration)),
            I.deteriorateEnd > 0 &&
              e.data.config.deterioratedDuration &&
              (I.deteriorateEnd = E8.serverTime + 1e3 * e.data.config.deterioratedDuration),
            (I.recovery = null));
          var v = GW.ParseCellCofigByData(I);
          if (!v.config.elementOrderId) {
            var m = v.getRecovery(yr.manualProduct),
              y = v.getRecovery(yr.autoProduct);
            (m && v.config.elementStorage && (m.value = v.config.elementStorage),
              y && v.config.AutoStorage && (y.value = v.config.AutoStorage));
          }
          (GW.RemoveShortCd(v.remoteData, yr.manualProduct),
            (v.isOld = !1),
            (e.data = v),
            (e.mergeCellRender.node_icon.scale = 0.8));
          var _,
            b,
            w = cc
              .tween(e.mergeCellRender.node_icon)
              .to(0.166, { scale: 1.2 })
              .to(0.1, { scale: 0.95 })
              .to(0.033, { scale: 1 });
          if ((e.showOnceTween(w), (_ = K6.checkElementGetResources(e))))
            (b = e3.AddCellAnim(e, TC.SCORE).getComponent(K2)) && b.updateView(_);
          EA.FinalOrder(e);
          e3.AddCellAnim(e, TC.BUBBLE_UNLOCK);
          (f == vr.bubble
            ? e3.AddCellAnim(e, TC.BUBBLE_END)
            : (f != vr.goldenBubble && f != vr.challengeBubble) ||
              e3.AddCellAnim(e, TC.BUBBLE_END2),
            e3.RemoveCellAnim(e, TC.DISCOUNT_TIPS),
            j8.play(o_.MERGE_END_BUBBLE));
        } else n = 0;
      } else if (t == pr.manualProduct)
        if (h >= n || G2.Data.freeRechargeTimes > 0) {
          var C = l || e.data.config,
            I = c || e.data.remoteData;
          (S = c
            ? MW.ensureLauncherRecoverTimer(e, s, c, yr.manualProduct)
            : G2.GetCellRecovery(e.serverIdx, yr.manualProduct))
            ? (GW.AddShortCd(I, yr.manualProduct, C.elementCDStorage, S.value),
              S.resetTime(),
              (S.state = 0),
              S.changeValue(C.elementCDStorage),
              S.onUpdate && S.onUpdate(!0),
              G2.Data.freeRechargeTimes > 0 && (G2.Data.freeRechargeTimes -= 1),
              "Magic" == C.series && K3.logEvent("magic_speed_up", { id: C.id, cost: n }))
            : (n = 0);
        } else n = 0;
      else if (t == pr.autoProduct)
        if (h >= n || G2.Data.freeRechargeTimes) {
          var S = G2.GetCellRecovery(e.serverIdx, yr.autoProduct),
            T = G$.GetAutoCDStorage(e);
          (S.resetTime(),
            (S.state = 0),
            S.changeValue(Math.max(S.value, T)),
            S.onUpdate && S.onUpdate(!0, !1, !0),
            G2.Data.freeRechargeTimes > 0 && (G2.Data.freeRechargeTimes -= 1));
        } else n = 0;
      else if (t == pr.elementOrder) {
        if (h >= n)
          ((e.data.remoteData.order.endTime = E8.serverTime),
            b2.UpdateOrderState(e),
            (e.data = e.data),
            this.BoardRequestSend(
              hm.completeElementOrder,
              { boardId: G2.Data.id, index: e.serverIdx, indexes: [], timestamp: E8.serverTime },
              "completeElementOrder",
            ));
        else n = 0;
      } else if (t == pr.shortRecovery)
        if (h >= n) {
          var E = yr.manualProduct;
          if ((I = c || e.data.remoteData)._shortCdAutoRoundEndTime) {
            var A = I._shortCdAutoRoundEndTime - E8.serverTime;
            ((I._shortCdAutoRoundEndTime = null),
              (I._shortCdAutoEndTime -= A),
              (E = yr.autoProduct),
              r || e.callLogic(RA.AROUND_EMPTY));
          } else if (I._shortCdManuRoundEndTime) {
            A = I._shortCdManuRoundEndTime - E8.serverTime;
            ((I._shortCdManuRoundEndTime = null),
              (I._shortCdStartTime -= A),
              (E = yr.manualProduct));
          }
          S = c ? MW.ensureLauncherRecoverTimer(e, s, c, E) : G2.GetCellRecovery(e.serverIdx, E);
          E == yr.manualProduct && S && S.onUpdate && S.onUpdate();
        } else n = 0;
      else if (t == pr.doubleEButtonCd) {
        if (h >= n) e.data.remoteData.endTime = E8.serverTime;
        else n = 0;
      }
      if (n > 0) {
        ((E8.role.diamond -= n), ZC.valueLabel("diamond"));
        var k = c || e.data.remoteData;
        t != pr.shortRecovery &&
          k.recovery &&
          k.recovery.size &&
          k.recovery.forEach(function (e, i) {
            (t == pr.manualProduct && i == yr.autoProduct) ||
              (t == pr.autoProduct && i == yr.manualProduct) ||
              e.resetTime();
          });
      }
      e.subPush(!0, !0);
    }),
    (e.BoardRequestSend = function (e, t, i, n, o, s) {
      return (
        void 0 === n && (n = function (e, t) {}),
        void 0 === o && (o = ""),
        void 0 === s && (s = !0),
        r(this, void 0, void 0, function () {
          var r;
          return a(this, function (a) {
            switch (a.label) {
              case 0:
                return o9.isInitialzed ? (s && EJ.SendRequestNow(), [4, e(t)]) : [3, 2];
              case 1:
                ((r = a.sent()).error || r.code
                  ? (r.error && this.ShowReloadTip(r.error),
                    r.error &&
                      "offline" != r.error &&
                      "canceled" != r.error &&
                      K3.logEvent("board_error", { error: r.error, type: i, info: o }),
                    n && n(r, !0))
                  : (n && n(r, !1), u.dispatch("onBoardResponse")),
                  (a.label = 2));
              case 2:
                return [2];
            }
          });
        })
      );
    }),
    (e.SetBoardElementWaitDispose = function (e, t) {
      e.forEach(function (e, i) {
        var n = G$.GetCellByIndex(e);
        n && n.data && (n.data.waitDispose = t);
      });
    }),
    (e.GetMergeIncreaseId = function () {
      var e = G2.Data;
      return (e.incrementId++, e.incrementId);
    }),
    (e.BoardData2String = function () {
      var e = G2.BoardCells;
      if (!e) return "";
      var t = "";
      return (
        e.forEach(function (e, i) {
          0 != e.elementId && (t += e.index + "_" + e.elementId + ",");
        }),
        t
      );
    }),
    (e.ShowReloadTip = function (e) {
      return r(this, void 0, void 0, function () {
        var t,
          i = this;
        return a(this, function (n) {
          switch (n.label) {
            case 0:
              return o9.currentScreen != J8.MERGE_SCREEN || this.isShowReloadTip || tw.isShowReload
                ? [2]
                : (K3.logEvent("show_reload_tip", {
                    boardType: G2.MergeBoardType,
                    boardData: this.BoardData2String(),
                  }),
                  [4, j_.hideAllWindow()]);
            case 1:
              return (
                n.sent(),
                (t = !F8.isProd),
                (this.isShowReloadTip = !0),
                (E8.reconnecting = !0),
                A8.Alert({
                  title: t ? v.getLabel("tip_dataError") : v.getLabel("tip_netErrorTitle"),
                  content: v.getLabel("tip_connectError"),
                  confirmText: v.getLabel("common_confirm"),
                  desc: t ? e : null,
                  showCancel: !!t,
                  callback: function (e) {
                    return r(i, void 0, void 0, function () {
                      return a(this, function (i) {
                        switch (i.label) {
                          case 0:
                            return (
                              (E8.reconnecting = !1),
                              (this.isShowReloadTip = !1),
                              t && !e
                                ? [2]
                                : M_.wsDelegate.connectionState == Ro.Idle ||
                                    M_.wsDelegate.connectionState == Ro.Error
                                  ? (u.dispatch("checkLogin", !0), [2])
                                  : (F8.checkUpdate(!0), [4, C4.show({ justShow: !0 })])
                            );
                          case 1:
                            return (i.sent(), [4, G2.LoadBoardData(G2.MergeBoardType, !0)]);
                          case 2:
                            (i.sent(),
                              G2.instance.handbookUpdate &&
                                ((G2.instance.handbookUpdate = !1), v$.Init()),
                              o9.getScreenData(J8.MERGE_SCREEN).View.onOpen(),
                              (i.label = 3));
                          case 3:
                            return Tq.isInit ? [3, 5] : [4, S(33)];
                          case 4:
                            return (i.sent(), [3, 3]);
                          case 5:
                            return ((C4.close = !0), [2]);
                        }
                      });
                    });
                  },
                }),
                [2]
              );
          }
        });
      });
    }),
    Object.defineProperty(e, "prefabAnim", {
      get: function () {
        return t9.prefabAnim;
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(e, "isLoadedAnim", {
      get: function () {
        return t9.isLoadedAnim;
      },
      enumerable: !1,
      configurable: !0,
    }),
    (e.LoadAnim = function () {
      return t9.loadAnimations();
    }),
    (e.LoadAnimation = function (e) {
      return r(this, void 0, void 0, function () {
        var t;
        return a(this, function (i) {
          switch (i.label) {
            case 0:
              return this.prefabAnim.get(e)
                ? [3, 2]
                : [4, Mi(e9.getElementAnimPrefabPath(e + "Anim"))];
            case 1:
              ((t = i.sent()) && this.prefabAnim.set(e, t), (i.label = 2));
            case 2:
              return [2, this.prefabAnim.get(e)];
          }
        });
      });
    }),
    (e.GetLoadedElement = function (e) {
      var t, i;
      return r(this, void 0, void 0, function () {
        var n, o;
        return a(this, function (r) {
          switch (r.label) {
            case 0:
              return (n = this.elementCache.get(e)) &&
                (null ===
                  (i =
                    null === (t = n.children[0]) || void 0 === t
                      ? void 0
                      : t.getComponent(cc.Sprite)) || void 0 === i
                  ? void 0
                  : i.spriteFrame)
                ? [3, 2]
                : [4, this.LoadElement(e)];
            case 1:
              (r.sent(), (n = this.elementCache.get(e)), (r.label = 2));
            case 2:
              return null == n
                ? [2, null]
                : ((o = ot.GetPrefab(n, 65, 1)), this.PreloadNextElement(e), [2, o]);
          }
        });
      });
    }),
    (e.LoadElement = function (e) {
      return r(this, void 0, void 0, function () {
        var t;
        return a(this, function (i) {
          switch (i.label) {
            case 0:
              return !this.elementCacheLoading.get(e) || this.elementCache.get(e)
                ? [3, 2]
                : [4, S(30)];
            case 1:
              return (i.sent(), [3, 0]);
            case 2:
              return this.elementCache.has(e)
                ? [2]
                : (this.elementCacheLoading.set(e, !0), [4, SJ.getElementPrefab(e)]);
            case 3:
              return (
                (t = i.sent()) &&
                  (t.getComponentsInChildren(cc.Sprite).forEach(function (e, t) {
                    if (e.spriteFrame) {
                      e.spriteFrame.cleanMode = Ue.CLEAN_NONE;
                      var i = e.spriteFrame._original,
                        n = i ? i._texture : e.spriteFrame._texture;
                      n && (n.cleanMode = Ue.CLEAN_NONE);
                    }
                  }),
                  this.elementCache.set(e, t)),
                this.elementCacheLoading.set(e, !1),
                [2]
              );
          }
        });
      });
    }),
    (e.PreloadNextElement = function (t, i) {
      void 0 === i && (i = !0);
      var n = config.Element.getById(t);
      (n.vanishChange.forEach(function (t, i) {
        e.PreloadElement(parseInt(i));
      }),
        n.autoVanishChange.forEach(function (t, i) {
          e.PreloadElement(parseInt(i));
        }),
        n.deterioratedChange.forEach(function (t, i) {
          e.PreloadElement(parseInt(i));
        }));
      var o = G$.HasMergeElement(t);
      (i && !o) || (n.mergeElementId && e.PreloadElement(n.mergeElementId));
    }),
    (e.PreloadElement = function (e) {
      return r(this, void 0, void 0, function () {
        var t;
        return a(this, function (i) {
          switch (i.label) {
            case 0:
              if (e <= 0 || this.elementCachePreload.has(e)) return [2];
              (h.log("preloadElement", e), this.elementCachePreload.set(e, !0), (i.label = 1));
            case 1:
              return (i.trys.push([1, 3, , 4]), [4, SJ.preloadElement(e)]);
            case 2:
              return (i.sent(), [3, 4]);
            case 3:
              return (
                (t = i.sent()),
                this.elementCachePreload.delete(e),
                h.warn("preloadElement failed", e, t),
                [3, 4]
              );
            case 4:
              return [2];
          }
        });
      });
    }),
    (e.PreloadLauncherProducts = function (e) {
      var t = this,
        i = new Set();
      (e.forEach(function (e) {
        for (var t = e, n = 0; n < 3 && !(isNaN(t) || t <= 0); n++) {
          var o = config.Element.getById(t);
          if (!o) break;
          (i.add(t), (t = o.mergeElementId));
        }
      }),
        i.forEach(function (e) {
          return t.PreloadElement(e);
        }));
    }),
    (e.PreloadLauncherProductsByConfig = function (e) {
      var t;
      if (e) {
        var i = new Set(),
          n = function (e) {
            null == e ||
              e.forEach(function (e, t) {
                var n = parseInt(t.split("_")[0]);
                !isNaN(n) && n > 0 && i.add(n);
              });
          };
        (n(e.elementIdWeight),
          n(e.elementIdWeightB),
          n(e.AutoId),
          null === (t = e.AutoIdList) ||
            void 0 === t ||
            t.forEach(function (e) {
              return i.add(e);
            }));
        var o = q6.instance.getElementAB(e.id);
        null == o ||
          o.elementIdList.forEach(function (e) {
            return i.add(e);
          });
        var r = XF.getLauncherLuckyConfig(e.id);
        (null == r ||
          r.lucky.forEach(function (e, t) {
            return i.add(t);
          }),
          this.PreloadLauncherProducts(Array.from(i)));
      }
    }),
    (e.clean = function () {
      nt.available &&
        (this.elementCache.forEach(function (e) {
          var t,
            i = ot.GetPoolPrefab(e);
          (i && nt.clean(i.PoolData),
            null === (t = ot.GetPoolPrefab(e)) || void 0 === t || t.Clear());
        }),
        this.elementCache.clear(),
        this.elementCacheLoading.clear());
    }),
    (e.PreloadBoardRes = function (e) {
      return t9.preloadBoard(e);
    }),
    (e.seedLog = !1),
    (e.isShowReloadTip = !1),
    (e.elementCache = new Map()),
    (e.elementCacheLoading = new Map()),
    (e.elementCachePreload = new Map()),
    e
  );
})();
