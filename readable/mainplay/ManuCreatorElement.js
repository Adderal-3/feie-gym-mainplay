// Extracted cached Cocos registration: ManuCreatorElement
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 2134762..2148003.
// Shared closure variables remain in readable/game.formatted.js:104275.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "f0d56NSNtZMOridYJj6G5XI", "ManuCreatorElement");
var kW = cc._decorator,
  RW = kW.ccclass;
kW.property;
var PW = kW.menu,
  DW = (function (e) {
    function n() {
      return (null !== e && e.apply(this, arguments)) || this;
    }
    var s;
    return (
      t(n, e),
      (s = n),
      (n.prototype.onInitRender = function (e) {
        if (!G$.IsCellInState(e, mr.web) && !G$.IsCellInState(e, mr.box)) {
          var t = e3.AddCellAnim(e, TC.MANU_CREATOR);
          if (t) {
            var i = e.data.config.elementIdWeightB && e.data.config.elementIdWeightB.size > 0,
              n = t.getComponent(hM);
            e.registComponent("ManuCreatorRecover", n);
            var o = this.getManualRecover(e);
            if ((n && (n.data = { recover: o, cell: e }), i)) {
              var r = e3.AddCellAnim(e, TC.METRONOME);
              if (e.resetMetronomeAnim && r) {
                var a = r.getComponent(TW);
                (null == a || a.reset(), (e.resetMetronomeAnim = !1));
              }
            }
            TJ.PreloadLauncherProductsByConfig(e.data.config);
          }
        }
      }),
      (n.prototype.onTimeChange = function (e) {
        this.updateRecover(e);
      }),
      (n.prototype.updateRecover = function (e) {
        if (e.data) {
          var t = e.dynamicComponents.get("ManuCreatorRecover");
          t && e.data.remoteData.openEnd && t.onUnlockUpdate(null);
        }
      }),
      (n.prototype.onRemove = function (e) {
        var t = this.getManualRecover(e);
        t && t.superSpeedUpStartTime && t.check && t.check();
      }),
      (n.prototype.onSelectElement = function (e) {
        var t;
        null === (t = this.getMetronomeComponent(e)) || void 0 === t || t.select();
      }),
      (n.prototype.onUnselectElement = function (e) {
        var t;
        null === (t = this.getMetronomeComponent(e)) || void 0 === t || t.deselect();
      }),
      (n.prototype.showBoardFullFeedback = function (e) {
        (e3.AddExclusiveCellAnim(e, TC.BOARD_FULL),
          j8.play(o_.MERGE_ITEM_GENERATE_FAIL),
          d.emit(i.OnceVibrate, { type: by.Medium, source: "棋盘已满" }),
          s.playBoardFullBagTween());
      }),
      (n.playBoardFullBagTween = function () {
        var e, t;
        if (
          (e3.StopBoardFullBagTween(), G2.MergeBoardType == ar.main && b2.GetAvailableBagType(!0))
        ) {
          var i =
            null === (t = null === (e = G2.BagCell) || void 0 === e ? void 0 : e.mergeCellRender) ||
            void 0 === t
              ? void 0
              : t.node_icon;
          e3.PlayBoardFullBagTween(i);
        }
      }),
      (n.prototype.onClickElement = function (e) {
        var t;
        if (
          !oN.IsGuideMultiplierPending &&
          !oN.IsUnlimitedEnergyMultiplierSyncing &&
          0 != G$.GetCellHp(e, yr.manualProduct) &&
          !e.data.freeze &&
          (!o8.curGuideId || !("CreateComplete" != hT.CurCondition || G2.FocusCreatorNum <= 0)) &&
          e.cellState != Q2.LOCK &&
          e.cellState != Q2.COVER &&
          e.cellState != Q2.SNOW &&
          !G$.CheckProductMax(e, !1) &&
          GW.IsManuCreator(e.data.config) &&
          !e.mergeCellRender.data.elementType.includes(Z2.BUBBLE)
        ) {
          var n = this.getManualRecover(e),
            o = 0,
            r = e.data.remoteData.extra.get(fr.magicLamp);
          if ((r && (o = parseInt(r)), n && (n.value <= 0 || n.state) && 0 == o))
            return (
              d.emit(i.MultipleVibate, {
                type: by.Medium,
                count: 3,
                restartOnRetriiger: !0,
                intervals: [0, 10, 10],
                source: "发射器没次数",
              }),
              void (G2.MergeBoardType == ar.main && wW.tryForcePopup(2))
            );
          (h.log("energy check", G2.Data.energyEnd, E8.role.energy.value),
            G2.Data.energyEnd > 0 && E8.serverTime >= G2.Data.energyEnd && (G2.Data.energyEnd = 0));
          var a = e.data.remoteData.extra.get(fr.specialLauncherSeq),
            s = TJ.checkNextSpecialLauncher(a);
          if (
            0 == G2.Data.energyEnd &&
            e.data.config.costEnergy > 0 &&
            !this._checkEnergyEnough(e, s)
          ) {
            var c = this._calcCellCost(e, s);
            g2.NeedShowActEnergy(fy.CHESS_3)
              ? j_.showWindow(F3.ActPlusEnergyWindow, { inNeed: c })
              : g2.NeedShowActEnergy(fy.CHESS_4)
                ? j_.showWindow(F3.ActMaxEnergyWindow, { inNeed: c })
                : g2.NeedShowActEnergy(fy.CHESS_7)
                  ? j_.showWindow(F3.Act7GiftWindow, { inNeed: c })
                  : g2.NeedShowActEnergy(fy.CHESS_8)
                    ? j_.showWindow(F3.Act8EnergyWindow, { inNeed: c })
                    : g2.NeedShowActEnergy(fy.CHESS_9)
                      ? j_.showWindow(F3.Act9EnergyWindow, { inNeed: c })
                      : (E8.getOnceData(Dr.extTypeFirstEnergyNeed) ||
                          hm.setExt({ extTypes: [Dr.extTypeFirstEnergyNeed] }),
                        j_.showWindow(F3.EnergyWindow, { inNeed: c }));
          } else if (!(e.data.config.unlockDuration > 0) || G$.IsCellInState(e, mr.opened)) {
            var l = e.data.remoteData.deteriorateEnd;
            if (!(
              (l > 0 && E8.serverTime >= l - 200) ||
              e.data.remoteData._shortCdManuRoundEndTime
            )) {
              if (
                (e.resetTween(),
                cc
                  .tween(e.mergeCellRender.node_icon)
                  .to(0.1, { scale: 1.3 })
                  .to(0.1, { scale: 1 })
                  .call(function () {
                    return e.showElementTween();
                  })
                  .start(),
                e.isElementAtCenter() || (e.moveElementTo(e.worldPos), (e.cellState = Q2.RESET)),
                G$.GetClosestBlankCell(e.pos, 1).length <= 0)
              )
                return (this.showBoardFullFeedback(e), void EW.checkChess7BoardFull());
              if ((n && n.value > 0 && !n.state) || o > 0 || GW.IsManuCreator(e.data.config)) {
                var p = !1,
                  f = this.getMetronomeComponent(e);
                if (f) {
                  if (!f.isSelected) return void f.select();
                  p = f.isInHighlight();
                }
                var g = TJ.CellProductCheck(
                  e,
                  yr.manualProduct,
                  e.data.remoteData.productCount,
                  p,
                  s,
                );
                if (!g) return [];
                var v = g.actualTimes || 1,
                  m = g.productEffectTimes || v,
                  y = [];
                y.push({
                  id: g.id,
                  state: g.state,
                  isList: g.isList,
                  seed: e.data.randomElementInt(),
                  luckyType: g.luckyType,
                });
                var _ = new C2();
                ((_.datas = y),
                  (_.fromCell = e),
                  (_.count = 1),
                  (_.actualProductTimes = m),
                  (_.productType = vr.manualProduct),
                  (_.isCreator = !0),
                  (_.luckyType = g.luckyType),
                  G$.WillCellHpDispose(e, yr.manualProduct, v) &&
                    (G2.instance.orderCheckLock = !0));
                var w = TJ.CreateNewElements(_, s);
                if (w && w.length) {
                  e.data.config.costEnergy > 0 && 0 == G2.Data.energyEnd && wM.CreatLampCount();
                  var C = this.playProduceSound(e.data.config);
                  ("Magic" == e.data.config.series &&
                    K3.logEvent("magic_product", { id: w[0].elementId }),
                    b.addClock("selectSoundLock_" + e.data.remoteData.uUID, 10, 1e3, 1),
                    this._isDuanwuFirst(w),
                    U2.ActivityWorldCollectCheck(w),
                    o8.curGuideId && (G2.FocusCreatorNum -= 1),
                    (46601 != e.data.config.id && 46602 != e.data.config.id) ||
                      e3.AddCellAnim(e, TC.CLICKTREE));
                  (["coral1_3", "coral1_4", "coral1_3_1", "coral1_3_2", "coral1_3_3"].includes(
                    e.data.config.series,
                  ) && e3.AddCellAnim(e, TC.CLICK_CORAL),
                    this._decreaseUserEnergy(e, s));
                  var I = Math.max(0, this._calcCellCost(e, s) - (g.refundEnergy || 0));
                  (g.specialLauncher2Triggered || TJ.addSpecialLauncher2Energy(e, I),
                    this._refundMultiEnergy(
                      e,
                      w[0],
                      g.refundEnergy || 0,
                      g.refundReason,
                      g.refundDebug,
                    ),
                    C ||
                      setTimeout(function () {
                        j8.play(o_.MERGE_CREATE);
                      }, 0),
                    DG.addCellSpeedUpAnim(e));
                  var S = e.data.remoteData;
                  if (S._shortCdManuEndTime)
                    if ((S._shortCdCount++, S._shortCdCurNum > 0)) S._shortCdCurNum--;
                    else if (
                      (S._shortCdCurNum--, S._shortCdCount >= e.data.config.elementShortCDNum)
                    ) {
                      var T = E8.serverTime - S._shortCdStartTime,
                        E = Math.ceil(T / (1e3 * e.data.config.elementShortCD));
                      (E ==
                        Math.ceil(Math.abs(S._shortCdCurNum) / e.data.config.elementShortCDNum) &&
                        n.value - w.length > 0 &&
                        (S._shortCdManuRoundEndTime =
                          S._shortCdStartTime + E * e.data.config.elementShortCD * 1e3),
                        (S._shortCdCount = 0));
                    }
                  (o > 0
                    ? (o--,
                      e.data.remoteData.extra.set(fr.magicLamp, "" + o),
                      n.onUpdate && n.onUpdate())
                    : (n.decrease(w.length),
                      n.onUpdate && n.onUpdate(),
                      0 == n.state && 0 == n.value && (n.state = 1)),
                    this._checkOrderTip(e));
                  var A = e.data.config,
                    k = G$.WillCellHpDispose(e, yr.manualProduct, v);
                  k &&
                    (X8.shovelLog(A.id),
                    this.checkButterfly(e),
                    qG.checkEnergy(e, 0, !0),
                    hx.checkActEnergy(e, 1, !0),
                    hx.instance.collectCellAllExtraRes(e, !0));
                  var R = !1,
                    P = e.data.seed.seed;
                  if (
                    (0 == n.value && e.callLogic(RA.PRODUCT_OUT),
                    !G$.DecreaseCellHp(e, yr.manualProduct, v))
                  ) {
                    this._ataiQuestionCheck(A);
                    var D = G2.instance.orderCheckLock;
                    G2.instance.orderCheckLock = !1;
                    var B = A.vanishChange;
                    if (B && B.size > 0) {
                      var L = b2.ParseElementsConf(B);
                      if (L.length) {
                        R = !0;
                        var N = -1,
                          O = AW.createStableRandom(A.id, "vanishChange");
                        if (
                          (O && (N = O.stableRes),
                          -1 == N && (N = TJ.BoardRandomElement(e, L, P)),
                          -1 == N)
                        )
                          e3.AddCellAnim(e, TC.DISAPPEAR);
                        else {
                          (X8.isFarm(N) &&
                            K3.logEvent("chessBoard4_get_generator", { eleId: N, way: "vanish" }),
                            (e.data = GW.ParseCellConfig(
                              { id: N, seed: P, state: mr.none, productType: vr.vanish },
                              e.serverIdx,
                            )));
                          var x = G$.GetCellByIndex(e.serverIdx);
                          x.mergeCellRender.node_icon.scale = 0.2;
                          var M = cc
                            .tween(x.mergeCellRender.node_icon)
                            .to(0.166, { scale: 1.2 })
                            .to(0.1, { scale: 0.95 })
                            .to(0.033, { scale: 1 });
                          x.showOnceTween(M);
                          var G = K6.checkElementGetResources(x);
                          if (G) {
                            var F = e3.AddCellAnim(x, TC.SCORE).getComponent(K2);
                            F && F.updateView(G);
                          }
                          var W =
                            null === (t = e.data.config) || void 0 === t ? void 0 : t.getSound;
                          W && j8.playByConf("mergeGet_" + W);
                          var U = config.ElementSpecialStorage.getById(e.data.config.id);
                          if (U) {
                            var H = U.vanishedStorage;
                            if (H > 0) {
                              var V = e.data.remoteData;
                              V.recovery.forEach(function (e, t) {
                                (V.hp.get(t) > 0 && V.hp.set(t, H),
                                  (e.value = H),
                                  (e.valueMax = H));
                              });
                            }
                          }
                        }
                      }
                    } else e3.AddCellAnim(e, TC.DISAPPEAR);
                    D &&
                      w.forEach(function (e, t) {
                        var i = G$.GetCellByIndex(e.index);
                        i && i.data && i.orderCheck();
                      });
                  }
                  var j = e,
                    z = j.storeSourceCell || e;
                  (R || k || 1 !== n.state || d.emit(i.OnBoardLauncherEnterCd, { cell: z }),
                    u.dispatch(zb.ON_MANUAL_CREATE, w),
                    d.emit(i.OnceVibrate, { type: by.Light, source: "手动发射" }),
                    TJ.CellProductRequest(
                      w,
                      e,
                      1,
                      !1,
                      p ? ba.bSeq : ba.normal,
                      j.storeLauncherIndex,
                    ),
                    G2.WaitComplete("CreateComplete"),
                    setTimeout(function () {
                      u.dispatch("showElementInfo", z);
                    }, 0));
                }
              }
            }
          }
        }
      }),
      (n.prototype.getManualRecover = function (e) {
        return G2.GetCellRecovery(e.serverIdx, yr.manualProduct);
      }),
      (n.prototype.checkButterfly = function (e) {
        var t = this,
          i = r3.ButterflyScoreByCell(e);
        if (i.score > 0) {
          var n = Ct.getUI("ThemePassBtn");
          r(t, void 0, void 0, function () {
            var t;
            return a(this, function (o) {
              switch (o.label) {
                case 0:
                  return ((t = i.type), [4, h3.ComplexButterFlyAnim(n, e.worldPos, i.score, t)]);
                case 1:
                  return (
                    o.sent(),
                    j8.play(o_.PICKONE_CARD_YEAH),
                    (IL._addCount += i.score),
                    (IL._addCoinAnim = !0),
                    u.dispatch("updateButterflyPassProgress"),
                    [2]
                  );
              }
            });
          });
        }
      }),
      (n.prototype._checkEnergyEnough = function (e, t) {
        void 0 === t && (t = !1);
        var i = E8.role.energy.value,
          n = 0,
          o = e.data.remoteData.extra.get(fr.battery);
        if ((o && (n = parseInt(o)), G2.MergeBoardType == g2.GetBoardtype(fy.CHESS_3))) {
          if (!(r = g2.GetEnergyRecover(fy.CHESS_3))) return !1;
          i = r.value;
        } else if (G2.MergeBoardType == g2.GetBoardtype(fy.CHESS_4)) {
          if (!(r = g2.GetEnergyRecover(fy.CHESS_4))) return !1;
          i = r.value;
        } else if (G2.MergeBoardType == g2.GetBoardtype(fy.CHESS_7)) {
          if (!(r = g2.GetEnergyRecover(fy.CHESS_7))) return !1;
          i = r.value;
        } else if (G2.MergeBoardType == g2.GetBoardtype(fy.CHESS_8)) {
          if (!(r = g2.GetEnergyRecover(fy.CHESS_8))) return !1;
          i = r.value;
        } else if (G2.MergeBoardType == g2.GetBoardtype(fy.CHESS_9)) {
          var r;
          if (!(r = g2.GetEnergyRecover(fy.CHESS_9))) return !1;
          i = r.value;
        }
        var a = e.data.config.costEnergy,
          s = this._getMultiEnergyTimes(e, t);
        return (s > 1 && (a *= s), i + n >= a);
      }),
      (n.prototype._calcCellCost = function (e, t) {
        void 0 === t && (t = !1);
        var i = e.data.config.costEnergy,
          n = this._getMultiEnergyTimes(e, t);
        return (n > 1 && (i *= n), i);
      }),
      (n.prototype._decreaseUserEnergy = function (e, t) {
        var n;
        if ((void 0 === t && (t = !1), e && e.data)) {
          var o = e.data.config.costEnergy,
            r = this._getMultiEnergyTimes(e, t);
          if ((r > 1 && (o *= r), 0 == G2.Data.energyEnd)) {
            var a = 0,
              s = e.data.remoteData.extra.get(fr.battery);
            if (
              (s && (a = parseInt(s)),
              a > 0 && (a >= o ? ((a -= o), (o = 0)) : ((o -= a), (a = 0))),
              e.data.remoteData.extra.set(fr.battery, "" + a),
              o <= 0)
            )
              return;
            var c = 0;
            if (G2.MergeBoardType == g2.GetBoardtype(fy.CHESS_3))
              (((l = g2.GetEnergyRecover(fy.CHESS_3)).value -= o), g2.UpdateView(), (c = l.value));
            else if (G2.MergeBoardType == g2.GetBoardtype(fy.CHESS_4)) {
              (((l = g2.GetEnergyRecover(fy.CHESS_4)).value -= o), (c = l.value), g2.UpdateView());
            } else if (G2.MergeBoardType == g2.GetBoardtype(fy.CHESS_7)) {
              (((l = g2.GetEnergyRecover(fy.CHESS_7)).value -= o), (c = l.value), g2.UpdateView());
            } else if (G2.MergeBoardType == g2.GetBoardtype(fy.CHESS_8)) {
              (((l = g2.GetEnergyRecover(fy.CHESS_8)).value -= o), (c = l.value), g2.UpdateView());
            } else if (G2.MergeBoardType == g2.GetBoardtype(fy.CHESS_9)) {
              var l;
              (((l = g2.GetEnergyRecover(fy.CHESS_9)).value -= o), (c = l.value), g2.UpdateView());
            } else
              ((E8.role.energy.value -= o), (c = E8.role.energy.value), fG.AddAdBubbleDayCost(o));
            (null === (n = $F.instance) || void 0 === n || n.updateCondition(o, e.data.config.id),
              SL.addBehavior(
                _L.energy_board,
                {
                  board: ar[G2.MergeBoardType],
                  remain: c,
                  eleName: e.data.config.name,
                  eleId: e.data.config.id,
                },
                !0,
              ),
              d.emit(i.UseEnergy, {
                type: jF.Merge,
                mergeCell: e,
                remain: c,
                boardType: G2.MergeBoardType,
              }));
          }
        }
      }),
      (n.prototype._refundMultiEnergy = function (e, t, i, n, o) {
        var r;
        if (
          (void 0 === n && (n = ""),
          void 0 === o && (o = null),
          i && !(i <= 0) && 0 == G2.Data.energyEnd)
        )
          if (this._isMainBoardNormalEnergy()) {
            ((E8.role.energy.value += i),
              h.warn(
                "[MultiEnergyRefund][apply]",
                "reason:",
                n,
                "debug:",
                o,
                "refundEnergy:",
                i,
                "afterEnergy:",
                E8.role.energy.value,
                "productEle:",
                null == t ? void 0 : t.elementId,
                "launcher:",
                e.data.config.id,
                "boardType:",
                G2.MergeBoardType,
              ));
            var a = t ? G$.GetCellByIndex(t.index) : null,
              s = new Za();
            ((s.itemType = oa.energy), (s.value = i));
            var c = (null == a ? void 0 : a.worldPos) || e.worldPos,
              l = cc.v2(c.x, c.y);
            setTimeout(function () {
              (h3.complexFly(s, null, l, null, 50), j8.play(o_.HARVEST_ELEMENT));
            }, 500);
          } else
            h.warn(
              "[MultiEnergyRefund][skip]",
              "reason:",
              n,
              "debug:",
              o,
              "refundEnergy:",
              i,
              "boardType:",
              G2.MergeBoardType,
              "gActId:",
              null === (r = G2.Data) || void 0 === r ? void 0 : r.gActId,
            );
      }),
      (n.prototype._getMultiEnergyTimes = function (e, t) {
        var i;
        return (
          void 0 === t && (t = !1),
          t || !(null === (i = null == e ? void 0 : e.data) || void 0 === i ? void 0 : i.config)
            ? 1
            : Math.max(1, oN.getProductBuffTimes(e.data.config.id, yr.manualProduct))
        );
      }),
      (n.prototype._isMainBoardNormalEnergy = function () {
        var e = G2.Data;
        return G2.MergeBoardType == ar.main && !!e && !e.gActId && !b2.IsSpecialEnergyBoard();
      }),
      (n.prototype._checkOrderTip = function (e) {
        if (e.data && e.data.remoteData.order.orderId && e.data.remoteData.recovery) {
          var t = e.data.remoteData.recovery.get(yr.manualProduct);
          t && 0 == t.value && e3.AddCellAnim(e, TC.BAG_TIPS);
        }
      }),
      (n.prototype._isDuanwuFirst = function (e) {
        if (!e.length) return !1;
        if (U2.getDuanwuStage() != F2.NONE) {
          var t = !1,
            i = U2.getDuanwu();
          if (i.gotZongzi) return !1;
          for (var n = 0; n < e.length; n++) {
            var o = e[n],
              r = config.Element.getById(o.elementId);
            if (
              "Duanwu" == r.type &&
              (t = 1 == i.group ? "Duanwu_14" == r.series : "Duanwu_15" == r.series)
            )
              break;
          }
          t &&
            bw.talk(
              1 == i.group
                ? config.DuanwuConfig.config.FirstSweetDialog
                : config.DuanwuConfig.config.FirstSaltDialog,
            );
        }
      }),
      (n.prototype._ataiQuestionCheck = function (e) {
        VW.upgradeElementCheck(e);
      }),
      (n.prototype.getMetronomeComponent = function (e) {
        var t = e.anims.get(TC.METRONOME);
        return t ? t.getComponent(TW) : null;
      }),
      (n.prototype.playProduceSound = function (e) {
        if (!e.produceSound) return !1;
        var t = e.produceSound.split("|");
        if (t.length <= 0) return !1;
        var i = 0;
        t.length > 1 && (i = Math.floor(Math.random() * t.length));
        var n = t[i];
        return (j8.playByConf("mergeCreator_" + n), t.length > 1);
      }),
      (n = s = o([RW, PW("MergeCell/Logic/ManuCreatorElement"), BM("ManuCreatorElement")], n))
    );
  })(xM);
cc._RF.pop();
