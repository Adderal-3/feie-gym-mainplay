// Extracted cached Cocos registration: CommonElement
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 8321722..8353599.
// Shared closure variables remain in readable/game.formatted.js:404067.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "03473FCJKNLv45wvcAzyt89", "CommonElement");
var uKe = cc._decorator,
  hKe = uKe.ccclass;
uKe.property;
var pKe = uKe.menu;
(!(function (e) {
  function n() {
    var t = (null !== e && e.apply(this, arguments)) || this;
    return ((t._hoverCell = null), (t._hoverRemoveAimAnim = !1), (t._showCanHitMonster = []), t);
  }
  (t(n, e),
    (n.prototype.onInitElement = function (e) {
      var t,
        i,
        n,
        o,
        s = this,
        c = e.data;
      if (c) {
        var l = !1;
        (c.remoteData.extra && c.remoteData.extra.get(fr.areaLock)
          ? ((e.cellState = Q2.SNOW), (l = !0))
          : G$.IsCellInState(e, mr.box)
            ? ((e.cellState = Q2.COVER), (l = !0))
            : G$.IsCellInState(e, mr.web)
              ? ((e.cellState = Q2.LOCK), (l = !0))
              : G$.IsBoardLockedElement(e)
                ? ((e.cellState = Q2.STAND), G$.MoveLockCell(e))
                : (e.cellState = Q2.STAND),
          EM.instance.updateCoverRewardAnim(e),
          Nge.isElementTower(e.data.config.id) && e.mergeCellRender.showMonsterHp(),
          e.cellState == Q2.STAND &&
            e.data &&
            !e.data.elementType.includes(Z2.BUBBLE) &&
            (G$.SetElementKnow(e.data.config.id),
            Fj.unlockElement(e.data.config.id),
            null === (t = NE.instance) || void 0 === t || t.unlockHandBook(e.data.config.id),
            null === (i = m2.instance) || void 0 === i || i.unlockHandBook(e.data.config.id)));
        var d = config.DailyTradeConfig.config.unlockLevel;
        if (e.data && E8.role.level >= d && !e.data.elementType.includes(Z2.BUBBLE))
          !yL.checkIsDemandEle(e.data.config.id) ||
            G$.IsCellInState(e, mr.web) ||
            G$.IsCellInState(e, mr.box) ||
            e3.AddCellAnim(e, TC.DAILY_TASK_FINISH);
        var u = r3.getState(),
          h = r3.getButterflyPassActivity();
        if (h && u == t3.START) {
          var p = c.remoteData.extra && parseInt(c.remoteData.extra.get(fr.butterflyPass));
          if (
            (r(s, void 0, void 0, function () {
              var t, i;
              return a(this, function (n) {
                switch (n.label) {
                  case 0:
                    return ((t = e.data.clientUuid), [4, S(200)]);
                  case 1:
                    return (
                      n.sent(),
                      e.data &&
                      e.data.remoteData &&
                      G$.GetCellByIndex(e.data.remoteData.index).data.clientUuid == t
                        ? (!r3.getButterflyPassOnceData(i3.ELEMENT, 0) &&
                            p > 0 &&
                            !o8.isRunning() &&
                            ((i = config.ButterflyPassDialog.getById(h.content)),
                            r3.showTalk(i.firstGetButterfly)),
                          [2])
                        : [2]
                    );
                }
              });
            }),
            1 == p)
          )
            if (r3.ShowButterflyAnim)
              ((r3.ShowButterflyAnim = !1),
                (function () {
                  return r(s, void 0, void 0, function () {
                    var t, i, n;
                    return a(this, function (o) {
                      switch (o.label) {
                        case 0:
                          return (
                            (t = e.data.clientUuid),
                            (i = r3.getButterflyShowAnim("2Show")),
                            e3.AddCellAnim(e, i),
                            [4, S(1e3)]
                          );
                        case 1:
                          return (
                            o.sent(),
                            e3.RemoveCellAnim(e, i),
                            e.data &&
                            e.data.remoteData &&
                            G$.GetCellByIndex(e.data.remoteData.index).data.clientUuid == t
                              ? (1 == (n = M(1, 4))
                                  ? e3.AddCellAnim(e, r3.getButterflyShowAnim("2_1"))
                                  : 2 == n
                                    ? e3.AddCellAnim(e, r3.getButterflyShowAnim("2_2"))
                                    : e3.AddCellAnim(e, r3.getButterflyShowAnim("2_3")),
                                [2])
                              : [2]
                          );
                      }
                    });
                  });
                })());
            else if (e.data.elementType.includes(Z2.BUBBLE))
              e3.AddCellAnim(e, r3.getButterflyShowAnim("2Pause"));
            else
              1 == (f = M(1, 4))
                ? e3.AddCellAnim(e, r3.getButterflyShowAnim("2_1"))
                : 2 == f
                  ? e3.AddCellAnim(e, r3.getButterflyShowAnim("2_2"))
                  : e3.AddCellAnim(e, r3.getButterflyShowAnim("2_3"));
          else if (2 == p) {
            var f;
            if (r3.ShowButterflyAnim)
              ((r3.ShowButterflyAnim = !1),
                (function () {
                  return r(s, void 0, void 0, function () {
                    var t, i, n;
                    return a(this, function (o) {
                      switch (o.label) {
                        case 0:
                          return (
                            (t = e.data.clientUuid),
                            (i = r3.getButterflyShowAnim("Show")),
                            e3.AddCellAnim(e, i),
                            [4, S(1e3)]
                          );
                        case 1:
                          return (
                            o.sent(),
                            e3.RemoveCellAnim(e, i),
                            e.data &&
                            e.data.remoteData &&
                            G$.GetCellByIndex(e.data.remoteData.index).data.clientUuid == t
                              ? (1 == (n = M(1, 4))
                                  ? e3.AddCellAnim(e, r3.getButterflyShowAnim("1_1"))
                                  : 2 == n
                                    ? e3.AddCellAnim(e, r3.getButterflyShowAnim("1_2"))
                                    : e3.AddCellAnim(e, r3.getButterflyShowAnim("1_3")),
                                [2])
                              : [2]
                          );
                      }
                    });
                  });
                })());
            else if (e.data.elementType.includes(Z2.BUBBLE))
              e3.AddCellAnim(e, r3.getButterflyShowAnim("Pause"));
            else
              1 == (f = M(1, 4))
                ? e3.AddCellAnim(e, r3.getButterflyShowAnim("1_1"))
                : 2 == f
                  ? e3.AddCellAnim(e, r3.getButterflyShowAnim("1_2"))
                  : e3.AddCellAnim(e, r3.getButterflyShowAnim("1_3"));
          }
        }
        var g = !1,
          v = c.remoteData.extra && c.remoteData.extra.get(fr.energy),
          m = DC.getActivityStage();
        if (DC.getActivity() && m == F2.START)
          if (c.remoteData.extra && c.remoteData.extra.get(fr.eventEnergyI))
            if (((g = !0), e.data.elementType.includes(Z2.BUBBLE)))
              e3.AddCellAnim(e, TC.ACTPLUS_ENERGY2);
            else e3.AddCellAnim(e, TC.ACTPLUS_ENERGY).children[0].y = v ? -16 : -36;
        if (K6.checkElementSpecialMerge(e.data.config.id))
          if (c.remoteData.extra && c.remoteData.extra.get(fr.specialLight)) {
            (_ = e3.AddCellAnim(e, TC.SPECIAL_MERGE).getComponent(ype)) &&
              _.updateView(e.data.config.id);
            r(s, void 0, void 0, function () {
              var t, i;
              return a(this, function (n) {
                switch (n.label) {
                  case 0:
                    return ((t = e.data.clientUuid), [4, S(5e3)]);
                  case 1:
                    return (
                      n.sent(),
                      (i = K6.getMergeCellByClientId(t)) &&
                      i.data &&
                      i.data.remoteData &&
                      G$.GetCellByIndex(i.data.remoteData.index).data.clientUuid == t
                        ? (e3.RemoveCellAnim(i, TC.SPECIAL_MERGE),
                          i.data.remoteData.extra.delete(fr.specialLight),
                          [2])
                        : [2]
                    );
                }
              });
            });
          }
        if (X8.getActivityStage() == F2.START)
          if (c.remoteData.extra && c.remoteData.extra.get(fr.eventEnergyII))
            if (((g = !0), e.data.elementType.includes(Z2.BUBBLE)))
              e3.AddCellAnim(e, TC.ACTMAX_ENERGY2);
            else e3.AddCellAnim(e, TC.ACTMAX_ENERGY).children[0].y = v ? -16 : -36;
        if (v)
          if (e.data.elementType.includes(Z2.BUBBLE))
            e3.AddCellAnim(e, TC.MAIN_ENERGY2).children[0].y = g ? 10 : 36;
          else e3.AddCellAnim(e, TC.MAIN_ENERGY);
        if ((null === (n = m2.instance) || void 0 === n ? void 0 : n.stage) == ew.START)
          if (c.remoteData.extra && c.remoteData.extra.get(fr.eventEnergyIII))
            if (((g = !0), e.data.elementType.includes(Z2.BUBBLE)))
              e3.AddCellAnim(e, TC.ACT7_ENERGY2);
            else e3.AddCellAnim(e, TC.ACT7_ENERGY).children[0].y = v ? -16 : -36;
        if (null === (o = dI.instance) || void 0 === o ? void 0 : o.canGetEnergy)
          if (c.remoteData.extra && c.remoteData.extra.get(fr.eventEnergyIV))
            if (((g = !0), e.data.elementType.includes(Z2.BUBBLE)))
              e3.AddCellAnim(e, TC.ACT8_ENERGY2);
            else e3.AddCellAnim(e, TC.ACT8_ENERGY).children[0].y = v ? -16 : -36;
        if (v)
          if (e.data.elementType.includes(Z2.BUBBLE))
            e3.AddCellAnim(e, TC.MAIN_ENERGY2).children[0].y = g ? 10 : 36;
          else e3.AddCellAnim(e, TC.MAIN_ENERGY);
        c.remoteData.extra &&
          c.remoteData.extra.get(fr.extraCell) &&
          ((G$.forceCloseExtraProduct = !1), G$.startCheckExtraProduct());
        var y = c.remoteData.extra && c.remoteData.extra.get(fr.chess5Weight);
        if (y && !l)
          (_ = e3.AddCellAnim(e, TC.CORAL).getComponent($fe)) && _.updateView(y, c.config.id);
        (DG.addCellSpeedUpAnim(e), dKe.addCellSpeedUpAnim(e), hx.instance.createExtraResAnim(e));
        var _,
          b = b2.checkElementBelongPart3Group(e.data.config.id);
        if (b) (_ = e3.AddCellAnim(e, TC.PART3_GROUP).getComponent(iKe)) && _.updateView(b);
        e.data.isOld && UK.showOrderElementAnimation(e);
        var w = e.data.config.id,
          C = -1 != config.Config.config.lightUpElement.indexOf(w),
          I = b2.checkSpecialUnlockLight(w);
        ((C || I) && e3.AddCellAnim(e, TC.MANU_OPENED),
          b3.checkActivity() &&
            b3.checkHasExtra(e) &&
            (e.data.elementType.includes(Z2.BUBBLE) || e.data.elementType.includes(Z2.AD_BUBBLE)) &&
            e3.AddCellAnim(e, TC.GYMSPRINT_POINT));
      }
    }),
    (n.prototype.onInitFinish = function (e) {
      e.data && (e.data.isOld = !0);
    }),
    (n.prototype.onSelectElement = function (e) {
      var t,
        n,
        o,
        s,
        c = this;
      if (e.cellState != Q2.MOVING) {
        if (
          ((e.data && 0 == e.data.config.mergeElementId) || e.data.elementType.includes(Z2.BUBBLE)
            ? (e3.RemoveCellAnim(e, TC.SELECTED_NOT), e3.AddCellAnim(e, TC.SELECTED_NOT))
            : (e3.RemoveCellAnim(e, TC.SELECTED), e3.AddCellAnim(e, TC.SELECTED)),
          e.tweenLock ||
            e.data.elementType.includes(Z2.BUBBLE) ||
            (10 == (!e.data.config.propEffect || e.data.config.propEffect / 100) && e.isSelect) ||
            (e.mergeCellRender.node_icon.stopAllActions(),
            (e.mergeCellRender.node_icon.scale = e.scaleCache),
            cc
              .tween(e.mergeCellRender.node_icon)
              .by(0.166, { scale: -0.2 })
              .by(0.166, { scale: 0.3 })
              .by(0.166, { scale: -0.15 })
              .by(0.166, { scale: 0.1 })
              .by(0.166, { scale: -0.05 })
              .call(function () {
                return e.showElementTween();
              })
              .start()),
          UK.showOrderElementAnimation(e),
          null ===
            (o =
              null === (n = null === (t = e.data) || void 0 === t ? void 0 : t.remoteData) ||
              void 0 === n
                ? void 0
                : n.extra) || void 0 === o
            ? void 0
            : o.has(fr.goGReqOrderId))
        )
          (function () {
            return r(c, void 0, void 0, function () {
              return a(this, function (e) {
                switch (e.label) {
                  case 0:
                    return [4, S(300)];
                  case 1:
                    return (e.sent(), G2.WaitComplete("GogBubbleComplete"), [2]);
                }
              });
            });
          })();
        d.emit(i.OnBoardSelectElement, { cell: e });
      }
      var l = UK.checkOrderElementFill(e);
      if (l && l.length > 0) {
        for (
          var u = b2.GetBoardElementByCondition(0, function (e) {
              return l.includes(e.elementId);
            }),
            h = [],
            p = 0;
          p < u.length;
          ++p
        ) {
          var f = u[p],
            g = G$.GetCellByIndex(f);
          if (g)
            b2.IsNeedOrderElement(g.data.config.id, e.data.remoteData) &&
              g.data &&
              (g.data.elementLockStage & mr.web) != mr.web &&
              (g.data.elementLockStage & mr.box) != mr.box &&
              0 == (null === (s = g.data.remoteData) || void 0 === s ? void 0 : s.bubbleEnd) &&
              h.push(g);
        }
        h && h.length && G$.moevElementToOrderElement(h, e);
      }
      if (
        G2.MergeBoardType == U2.getBoardType() &&
        (e.data.elementLockStage & mr.web) != mr.web &&
        (e.data.elementLockStage & mr.box) != mr.box
      ) {
        var v = U2.getActivityGlobalActivity(),
          m = U2.getActivity();
        if (v && m) {
          var y = config.ChessBoardDialog.getById(v.content);
          for (p = 0; p < y.clickElement.length; p++) {
            var _ = y.clickElement[p].split(":"),
              b = parseInt(_[0]),
              w = parseInt(_[1]);
            if (b == e.data.config.id && !U2.getActivityOnceData(O2.SelectElement, 0 + p)) {
              U2.showTalk(w, O2.SelectElement, 0 + p);
              break;
            }
          }
        }
      }
      if (
        G2.MergeBoardType == ar.main &&
        (e.data.elementLockStage & mr.web) != mr.web &&
        (e.data.elementLockStage & mr.box) != mr.box
      ) {
        var C = VW.getWorldTaskActivity();
        if (C) {
          var I = config.WorldTaskDialog.getById(C.content);
          for (p = 0; p < I.clickElement.length; p++) {
            _ = I.clickElement[p].split(":");
            if (
              (b = parseInt(_[1])) == e.data.config.id &&
              !VW.getWorldTaskOnceData(WW.SELECT, p)
            ) {
              VW.showTalk(parseInt(_[0]));
              break;
            }
          }
        }
        var T = config.ElementDialog.getById(e.data.config.id);
        if (T && T.clickElement && !E8.checkOnceData(ga.elementDialog, T.num[0]))
          (function () {
            return r(c, void 0, void 0, function () {
              return a(this, function (e) {
                switch (e.label) {
                  case 0:
                    return [4, C4.view.waitClose()];
                  case 1:
                    return (
                      e.sent(),
                      E8.offOnceData(ga.elementDialog, T.num[0]),
                      bw.talk(T.clickElement),
                      [2]
                    );
                }
              });
            });
          })();
      }
      if (
        G2.MergeBoardType == _A.getBoardType() &&
        (e.data.elementLockStage & mr.web) != mr.web &&
        (e.data.elementLockStage & mr.box) != mr.box &&
        (m = _A.getGlobalHealthFood())
      )
        for (
          I = config.FoodBoardDialog.getByEventId(m.content), p = 0;
          p < I.ClickElement.length;
          p++
        ) {
          _ = I.ClickElement[p].split(":");
          if (
            (b = parseInt(_[0])) == e.data.config.id &&
            !_A.getHealthFoodOnceData(hA.SelectElement, p)
          ) {
            _A.showTalk(parseInt(_[1]), hA.SelectElement, p);
            break;
          }
        }
      if (
        G2.MergeBoardType == H2.getBoardType() &&
        (e.data.elementLockStage & mr.web) != mr.web &&
        (e.data.elementLockStage & mr.box) != mr.box
      ) {
        v = H2.getActivityGlobalActivity();
        var m = H2.getActivity();
        if (v && m)
          for (
            y = config.Chess2BoardDialog.getById(v.content), p = 0;
            p < y.clickElement.length;
            p++
          ) {
            ((_ = y.clickElement[p].split(":")), (b = parseInt(_[0])), (w = parseInt(_[1])));
            if (b == e.data.config.id && !H2.getActivityOnceData(O2.SelectElement, 0 + p)) {
              H2.showTalk(w, O2.SelectElement, 0 + p);
              break;
            }
          }
      }
      if (
        G2.MergeBoardType == DC.getBoardType() &&
        (e.data.elementLockStage & mr.web) != mr.web &&
        (e.data.elementLockStage & mr.box) != mr.box
      ) {
        var E = DC.getActivityGlobalActivity();
        m = DC.getActivity();
        if (E && m) {
          y = config.ChessBoard3Dialog.getById(E.content);
          var A = function (t) {
            var i = y.clickElement[t].split(":"),
              n = parseInt(i[0]),
              o = parseInt(i[1]);
            if (n == e.data.config.id && !DC.getActivityOnceData(O2.SelectElement, 0 + t)) {
              return (
                (function (e) {
                  r(c, void 0, void 0, function () {
                    return a(this, function (t) {
                      switch (t.label) {
                        case 0:
                          return [4, C4.view.waitClose()];
                        case 1:
                          return (t.sent(), [4, bw.talk(o)]);
                        case 2:
                          return (
                            t.sent(),
                            hm.setOnce({ aid: E.id, num: O2.SelectElement, onceBit: 0 + e }),
                            [2]
                          );
                      }
                    });
                  });
                })(t),
                "break"
              );
            }
          };
          for (p = 0; p < y.clickElement.length; p++) {
            if ("break" === A(p)) break;
          }
        }
      }
      if (
        G2.MergeBoardType == X8.getBoardType() &&
        (e.data.elementLockStage & mr.web) != mr.web &&
        (e.data.elementLockStage & mr.box) != mr.box
      ) {
        var k = X8.getActivityGlobalActivity();
        m = X8.getActivity();
        if (k && m) {
          y = X8.getConf();
          var R = function (t) {
            var i = y.ClickElement[t].split(":"),
              n = parseInt(i[0]),
              o = parseInt(i[1]);
            if (n == e.data.config.id && !X8.getActivityOnceData(z8.SelectElement, 0 + t)) {
              return (
                (function (e) {
                  r(c, void 0, void 0, function () {
                    return a(this, function (t) {
                      switch (t.label) {
                        case 0:
                          return [4, C4.view.waitClose()];
                        case 1:
                          return (t.sent(), [4, bw.talk(o)]);
                        case 2:
                          return (
                            t.sent(),
                            hm.setOnce({ aid: k.id, num: z8.SelectElement, onceBit: 0 + e }),
                            [2]
                          );
                      }
                    });
                  });
                })(t),
                "break"
              );
            }
          };
          for (p = 0; p < y.ClickElement.length; p++) {
            if ("break" === R(p)) break;
          }
        }
      }
      if (
        G2.MergeBoardType == EA.getBoardType() &&
        (e.data.elementLockStage & mr.web) != mr.web &&
        (e.data.elementLockStage & mr.box) != mr.box
      ) {
        var P = EA.getGlobalActivity();
        m = EA.getActivity();
        if (P && m) {
          y = config.WarehouseDialog.getById(P.content);
          var D = function (t) {
            var i = y.ClickElement[t].split(":"),
              n = parseInt(i[0]),
              o = parseInt(i[1]);
            if (n == e.data.config.id && !EA.getActivityOnceData(wA.selectEle, t)) {
              return (
                (function (e) {
                  r(c, void 0, void 0, function () {
                    return a(this, function (t) {
                      switch (t.label) {
                        case 0:
                          return [4, C4.view.waitClose()];
                        case 1:
                          return (t.sent(), [4, bw.talk(o)]);
                        case 2:
                          return (
                            t.sent(),
                            hm.setOnce({ aid: P.id, num: wA.selectEle, onceBit: e }),
                            [2]
                          );
                      }
                    });
                  });
                })(t),
                "break"
              );
            }
          };
          for (p = 0; p < y.ClickElement.length; p++) {
            if ("break" === D(p)) break;
          }
        }
      }
      (Fj.instance &&
        Fj.instance.boardType == G2.MergeBoardType &&
        (e.data.elementLockStage & mr.web) != mr.web &&
        (e.data.elementLockStage & mr.box) != mr.box &&
        Fj.instance.triggerTalk(Lj.firstClickElement, e.data.config.id),
      NE.instance &&
        NE.instance.boardType == G2.MergeBoardType &&
        (e.data.elementLockStage & mr.web) != mr.web &&
        (e.data.elementLockStage & mr.box) != mr.box &&
        NE.instance.triggerTalk(RE.firstClickElement, e.data.config.id),
      m2.instance &&
        m2.instance.boardType == G2.MergeBoardType &&
        (e.data.elementLockStage & mr.web) != mr.web &&
        (e.data.elementLockStage & mr.box) != mr.box &&
        m2.instance.triggerTalk(p2.firstClickElement, e.data.config.id),
      dI.instance &&
        dI.instance.boardType == G2.MergeBoardType &&
        (e.data.elementLockStage & mr.web) != mr.web &&
        (e.data.elementLockStage & mr.box) != mr.box) &&
        ((m = dI.instance).triggerTalk(sI.firstClickElement, e.data.config.id),
        e.data.config.id == m.boardInfo.unlockShop &&
          ((m.actData.unlockBoardShop = !0), d.emit(i.UpdateActShopOpen)));
    }),
    (n.prototype.onMergeStart = function (e) {}),
    (n.prototype.onMerge = function (e, t) {
      var n,
        o,
        s,
        c,
        l,
        h,
        p,
        f,
        g,
        v,
        m = this,
        y = Math.min(e.data.seed.seed, t[0].data.seed.seed),
        _ = t[0].serverIdx,
        b = KM.instance.isFrozenBubbleCell(e),
        w = KM.instance.isFrozenBubbleCell(t[0]),
        C = b || w;
      (C &&
        (e3.AddCellAnim(e, TC.FROZEN_BUBBLE_END),
        j8.play(o_.FROZEN_BUBBLE_BREAK),
        b && KM.instance._logFrozenBubbleDisappear(e, "merge"),
        w && KM.instance._logFrozenBubbleDisappear(t[0], "merge")),
        !G2.UnlockingManuElement ||
        (G2.UnlockingManuElement.serverIdx != e.serverIdx &&
          G2.UnlockingManuElement.serverIdx != t[0].serverIdx)
          ? !G2.UnlockingNewElement ||
            (G2.UnlockingNewElement.serverIdx != e.serverIdx &&
              G2.UnlockingNewElement.serverIdx != t[0].serverIdx) ||
            b2.ManuNewUnlockFinish()
          : b2.ManuUnlockFinish());
      var I = e.data,
        T = e.data.config.id,
        E = G$.IsCellInState(e, mr.web);
      E && ((e.data.elementLockStage = mr.none), (e.cellState = Q2.STAND));
      var A = this._checkButterflyPass(e, t[0]),
        k = N2.CreatButterfly(e.data.config.mergeElementId);
      if (k > 0) {
        if (!N2.getPassOnceData(D2.ELEMENT, 0)) {
          var R = N2.getPassActivity(),
            P = config.CarrotPassDialog.getById(null == R ? void 0 : R.content);
          r(m, void 0, void 0, function () {
            return a(this, function (e) {
              switch (e.label) {
                case 0:
                  return [4, S(200)];
                case 1:
                  return (
                    e.sent(),
                    o8.isRunning() || N2.showTalk(null == P ? void 0 : P.firstGetButterfly),
                    [2]
                  );
              }
            });
          });
        }
        N2.flyAnim(e.worldPos, k);
      }
      var D = 0,
        B = 0,
        L = qG.CheckHasExtra(e) + qG.CheckHasExtra(t[0]),
        N =
          (null === (n = m2.instance) || void 0 === n ? void 0 : n.CheckHasExtra(e)) +
          (null === (o = m2.instance) || void 0 === o ? void 0 : o.CheckHasExtra(t[0])),
        O =
          (null === (s = dI.instance) || void 0 === s ? void 0 : s.CheckHasExtra(e)) +
          (null === (c = dI.instance) || void 0 === c ? void 0 : c.CheckHasExtra(t[0]));
      (DC.CheckHasExtra(e) && D++,
        DC.CheckHasExtra(t[0]) && D++,
        X8.CheckHasExtra(e) && B++,
        X8.CheckHasExtra(t[0]) && B++,
        D > 0 && DC.checkActPlusEnergyForce(e.worldPos, D),
        B > 0 && X8.checkActPlusEnergyForce(e.worldPos, B),
        N > 0 &&
          (null === (l = m2.instance) || void 0 === l || l.checkActPlusEnergyForce(e.worldPos, N)),
        O > 0 &&
          (null === (h = dI.instance) || void 0 === h || h.checkAct8EnergyForce(e.worldPos, O)),
        L && qG.checkEnergyForce(e.worldPos, L, !0));
      var x = t[0].data.remoteData.extra.get(fr.extraCell)
          ? t[0].data.remoteData.extra.get(fr.extraCell)
          : "",
        M = e.data.remoteData.extra.get(fr.extraCell)
          ? e.data.remoteData.extra.get(fr.extraCell)
          : "",
        G = "";
      ("" != M && "" != x ? (G = M + "|" + x) : "" != M ? (G = M) : "" != x && (G = x),
        hx.instance.collectCellArrayExtraRes([e, t[0]], !1, e.worldPos));
      var F = {
          id: I.config.mergeElementId,
          state: mr.none,
          seed: y,
          productType: vr.merge,
          sourceData: t[0].data.remoteData,
          targetData: I.remoteData,
          mergeFromWeb: E,
        },
        W = new Map(),
        U = wM.getCreatorLampCount(t[0]),
        H = wM.getCreatorLampCount(e),
        V = wM.getCreatorBatteryCount(t[0]),
        j = wM.getCreatorBatteryCount(e),
        z = IJ.getFishCount(t[0]),
        K = IJ.getFishCount(e);
      (X8.isFarm(I.config.mergeElementId) &&
        K3.logEvent("chessBoard4_get_generator", { eleId: I.config.mergeElementId, way: "merge" }),
        A > 0 &&
          (K3.logEvent("butterflyPass_butterflyGet", {
            elementId: I.config.mergeElementId,
            isBubble: 0,
            isGold: A,
          }),
          (r3.ShowButterflyAnim = !0),
          W.set(fr.butterflyPass, A.toString())),
        (U || H) && W.set(fr.magicLamp, (U + H).toString()),
        (V || j) && W.set(fr.battery, (U + H).toString()),
        (z || K) && W.set(fr.chess5Weight, (z + K).toString()));
      var q = TJ.addSpecialSeq(I.config.mergeElementId);
      (q && W.set(fr.specialLauncherSeq, q),
        W.set(fr.extraCell, G),
        (F.extra = W),
        config.Element.getById(I.config.mergeElementId).level < 5
          ? d.emit(i.OnceVibrate, { type: by.Light, source: "合成元素等级<5" })
          : d.emit(i.OnceVibrate, { type: by.Medium, source: "合成元素等级>=5" }));
      var Y = GW.ParseCellConfig(F, e.serverIdx);
      (G$.UnlockAroundCells(e),
        (t[0].data = null),
        e.recoverAnim(),
        AF.checkShowMergeFirst(Y.config.id, e.data.config.id),
        G$.SetElementKnow(Y.config.id),
        (e.data = Y),
        EW.recordMergeElementId(
          null !==
            (f = null === (p = null == Y ? void 0 : Y.config) || void 0 === p ? void 0 : p.id) &&
            void 0 !== f
            ? f
            : 0,
        ));
      var X = K6.checkElementGetResources(e);
      X && (ie = e3.AddCellAnim(e, TC.SCORE).getComponent(K2)) && ie.updateView(X);
      var J = UK.checkOrderElementFill(e);
      if (J && J.length > 0)
        if (J.length > 2) {
          for (
            var Q = b2.GetBoardElementByCondition(0, function (e) {
                return J.includes(e.elementId);
              }),
              Z = [],
              $ = 0;
            $ < Q.length;
            ++$
          ) {
            var ee = Q[$],
              te = G$.GetCellByIndex(ee);
            te &&
              te.data &&
              (te.data.elementLockStage & mr.web) != mr.web &&
              (te.data.elementLockStage & mr.box) != mr.box &&
              Z.push(te);
          }
          Z && Z.length && G$.moevElementToOrderElement(Z, e);
        } else {
          var ie;
          (ie = e3.AddCellAnim(e, TC.ORDER_ELEMENT).getComponent(WK)) && ie.updateView(J);
        }
      if (
        (UK.showOrderElementAnimation(e),
        EA.FinalOrder(e),
        d.emit(i.OnBoardMergeComplete, { cell: e }),
        E && GW.RemoveShortCd(e.data.remoteData, yr.manualProduct),
        U2.ActivityWorldCollectCheck([Y.remoteData]),
        G2.WaitComplete("MergeComplete"),
        Y.config.mergeSound)
      )
        j8.playByConf("mergeSound_" + Y.config.mergeSound);
      else {
        var ne = Y.config.level > 15 ? 15 : Y.config.level;
        (1 == ne && (ne = 5), j8.playByConf("mergeElement" + ne));
      }
      e.isElementAtCenter() || e.setElementTo(e.worldPos);
      var oe = 63 - G2.FillCellCount,
        re = null,
        ae = "_" + y,
        se = [],
        ce = 0;
      if (oe > 0) {
        var le = KM.instance.checkTrigger(e, C);
        if (
          null != le &&
          (oe--,
          j8.play(o_.MERGE_CREATE_BUBBLE),
          se.push({ elementId: le.elementId, index: le.index, productType: vr.frozenBubble }),
          (ce = le.elementId),
          !E8.checkOnceData(ga.customMark, UA.FROZEN_BUBBLE_GUIDE))
        ) {
          E8.offOnceData(ga.customMark, UA.FROZEN_BUBBLE_GUIDE);
          var de = G2.Board.cellSize;
          (G2.BoardRender.setElementGuide(!0, le.index, "frozenBubble", cc.v2(de, de)),
            kK.showGuideNew("FrozenBubble"));
        }
      }
      var ue = 0 != ce ? 0 : TJ.CellGogBubbleCheck(e),
        he = null;
      if (ue > 0 && oe > 0 && 0 == ce) {
        var pe = { id: ue, state: mr.none };
        (((Ee = new w2()).data = pe),
          (Ee.seed = e.data.randomElementInt()),
          (Ee.fromCell = e),
          (Ee.elementType = [Z2.BUBBLE, Z2.GOG_BUBBLE]),
          (Ee.productType = vr.challengeBubble),
          (he = TJ.CreateNewElement(Ee)) &&
            ((ce = he.elementId),
            oe--,
            j8.play(o_.MERGE_CREATE_BUBBLE),
            K3.logEvent("bubbleFrom", { id: -4, fromEleId: T, eleId: he.elementId })));
      }
      e && e.data && e.data.seed && (ae += "_" + e.data.seed.seed);
      var fe = 0 != ce ? 0 : TJ.CellAdBubbleCheck(e),
        ge = null;
      if (oe > 0 && fe > 0) {
        pe = { id: fe, state: mr.none };
        (((Ee = new w2()).data = pe),
          (Ee.seed = e.data.randomElementInt()),
          (Ee.fromCell = e),
          (Ee.elementType = [Z2.BUBBLE, Z2.AD_BUBBLE]),
          (Ee.productType = vr.adBubble),
          (ge = TJ.CreateNewElement(Ee)) &&
            ((ce = ge.elementId),
            oe--,
            j8.play(o_.MERGE_CREATE_BUBBLE),
            K3.logEvent("bubbleFrom", { id: -3, fromEleId: T, eleId: ge.elementId })));
      }
      e && e.data && e.data.seed && (ae += "_" + e.data.seed.seed);
      var ve = 0 != ce ? 0 : TJ.CellGoldBubbleCheck(e),
        me = null;
      if (oe > 0 && ve > 0) {
        pe = { id: ve, state: mr.none };
        (((Ee = new w2()).data = pe),
          (Ee.seed = e.data.randomElementInt()),
          (Ee.fromCell = e),
          (Ee.elementType = [Z2.BUBBLE]),
          (Ee.productType = vr.goldenBubble),
          (me = TJ.CreateNewElement(Ee)) &&
            ((ce = me.elementId),
            oe--,
            j8.play(o_.MERGE_CREATE_BUBBLE),
            K3.logEvent("bubbleFrom", { id: -2, fromEleId: T, eleId: me.elementId })));
      }
      e && e.data && e.data.seed && (ae += "_" + e.data.seed.seed);
      var ye = 0 != ce ? 0 : TJ.CellBubbleCheck(e),
        _e = null;
      if (oe > 0 && ye > 0) {
        pe = { id: ye, state: mr.none };
        (((Ee = new w2()).data = pe),
          (Ee.seed = e.data.randomElementInt()),
          (Ee.fromCell = e),
          (Ee.elementType = [Z2.BUBBLE]),
          (Ee.productType = vr.bubble),
          (_e = TJ.CreateNewElement(Ee)) &&
            ((ce = _e.elementId),
            oe--,
            j8.play(o_.MERGE_CREATE_BUBBLE),
            K3.logEvent("bubbleFrom", { id: -1, fromEleId: T, eleId: _e.elementId })));
      }
      e && e.data && e.data.seed && (ae += "_" + e.data.seed.seed);
      var be = null,
        we = !1;
      if (oe > 0) {
        var Ce = config.MergeExtraElement.getById(e.data.config.id);
        if (Ce && Ce.extraRate > 0)
          if (e.data.randomInt(0, 100) < Ce.extraRate) {
            var Ie = e.data.seed.randomByWeight(Ce.extraWeight);
            pe = { id: Ce.mergeExtra[Ie], state: mr.none };
            (((Ee = new w2()).data = pe),
              (Ee.seed = e.data.randomElementInt()),
              (Ee.fromCell = e),
              (Ee.productType = vr.mergeExtra),
              (be = TJ.CreateNewElement(Ee)) && (oe--, j8.play(o_.MERGE_CREATE_EXP), (we = !0)));
          }
      }
      e && e.data && e.data.seed && (ae += "_" + e.data.seed.seed);
      var Se;
      (Se = this._checkPassProduct(e, oe, Y.config.id)) && oe--;
      var Te = YE.createBoardElement(e, oe, Y.config.id);
      if (
        (Te && oe--,
        e && e.data && e.data.seed && (ae += "_" + e.data.seed.seed),
        oe > 0 && e.data.config.mergeExtra)
      ) {
        var Ee;
        pe = { id: e.data.config.mergeExtra, state: mr.none };
        (((Ee = new w2()).data = pe),
          (Ee.seed = e.data.randomElementInt()),
          (Ee.fromCell = e),
          (Ee.productType = vr.mergeExtra),
          (Ee.isCreator = !0),
          (re = TJ.CreateNewElement(Ee)) && (oe--, we || j8.play(o_.MERGE_CREATE_EXP)));
      }
      e && e.data && e.data.seed && (ae += "_" + e.data.seed.seed);
      var Ae = config.ElementSpecialStorage.getById(e.data.config.id);
      if (Ae) {
        var ke = Ae.low2HighStorage;
        if (ke > 0) {
          var Re = e.data.remoteData;
          Re.recovery.forEach(function (e, t) {
            (Re.hp.get(t) > 0 && Re.hp.set(t, ke), (e.value = ke), (e.valueMax = ke));
          });
        }
      }
      (u.dispatch(
        zb.ON_ELEMENT_MERGE,
        null ===
          (v = null === (g = null == e ? void 0 : e.data) || void 0 === g ? void 0 : g.config) ||
          void 0 === v
          ? void 0
          : v.id,
      ),
        he && se.push({ elementId: he.elementId, index: he.index, productType: he.productType }),
        ge && se.push({ elementId: ge.elementId, index: ge.index, productType: ge.productType }),
        me && se.push({ elementId: me.elementId, index: me.index, productType: me.productType }),
        _e && se.push({ elementId: _e.elementId, index: _e.index, productType: _e.productType }),
        be && se.push({ elementId: be.elementId, index: be.index, productType: be.productType }),
        re && se.push({ elementId: re.elementId, index: re.index, productType: re.productType }),
        Se && se.push({ elementId: Se.elementId, index: Se.index, productType: Se.productType }),
        Te && se.push({ elementId: Te.elementId, index: Te.index, productType: Te.productType }));
      var Pe = M$.onMergeExtraProduct(e);
      (EJ.BoardRequestSendDebounce(
        {
          boardId: G2.Data.id,
          index: _,
          toIndex: e.serverIdx,
          posIndex: 0,
          cells: se,
          moveType: 2,
          timestamp: E8.serverTime,
          emitCells: null == Pe ? void 0 : Pe.emitCells,
          emitIndex: null == Pe ? void 0 : Pe.emitIndex,
        },
        "cellmove",
        function (e, t) {
          (TJ.seedLog &&
            !t &&
            e
              .getData()
              .role.boards.get(G2.Data.id)
              .cells.forEach(function (e, t) {
                e.seed > 0 &&
                  console.warn(
                    ">>>>>>>>>> remote merge index:" +
                      e.index.toString() +
                      " seed:" +
                      e.seed.toString(),
                  );
              }),
            EM.instance.claimPendingRewards());
        }.bind(this),
        "movefrom" + _ + "to" + e.serverIdx + ae,
      ),
        EM.instance.hasReward() && EJ.SendRequestNow(),
        F8.switches.boardDebugInfo &&
          K3.logEvent("board_operate_info", {
            type: "cellmove_merge",
            detail: "from:" + _ + "_" + T + "to:" + e.serverIdx + "_" + e.data.config.id,
          }));
    }),
    (n.prototype.onMergeEnd = function (e) {
      var t;
      if (
        (e.resetTween(),
        (e.tweenLock = !0),
        cc
          .tween(e.mergeCellRender.node_icon)
          .to(0.1, { scale: 0.5 })
          .to(0.166, { scale: 1.15 })
          .to(0.1, { scale: 1 })
          .call(function () {
            ((e.tweenLock = !1), e.showElementTween());
          })
          .start(),
        G2.consumeAutoMergeEndIndex(e.serverIdx))
      )
        t = TC.AUTO_MERGE_END;
      else {
        t = "Merge" + G2.instance.mergeAnimCount;
        var i = b2.CheckMergeAnim(e);
        i > 0 && (t = "Merge" + i);
      }
      e3.AddCellAnim(e, t);
    }),
    (n.prototype.onSwitchElement = function (e, t) {
      var i = t[1] ? t[1].serverIdx : 0,
        n = t[0];
      if (
        (EJ.BoardRequestSendDebounce(
          {
            boardId: G2.Data.id,
            index: n.serverIdx,
            toIndex: e.serverIdx,
            posIndex: i,
            cells: [],
            moveType: 1,
            timestamp: E8.serverTime,
          },
          "cellmove",
          function (e, t) {
            TJ.seedLog &&
              !t &&
              e
                .getData()
                .role.boards.get(G2.Data.id)
                .cells.forEach(function (e, t) {
                  e.seed > 0 &&
                    console.warn(
                      ">>>>>>>>>> remote move index:" +
                        e.index.toString() +
                        " seed:" +
                        e.seed.toString(),
                    );
                });
          }.bind(this),
          "movefrom" + n.serverIdx + "to" + e.serverIdx,
        ),
        F8.switches.boardDebugInfo)
      ) {
        var o = n.data ? n.data.config.id : 0,
          r = e.data ? e.data.config.id : 0;
        K3.logEvent("board_operate_info", {
          type: "cellmove_move",
          detail: "from:" + n.serverIdx + "_" + o + "to:" + e.serverIdx + "_" + r,
        });
      }
    }),
    (n.prototype.onHover = function (e, t) {
      var i,
        n = this;
      if (
        (G$.IsElementCanMerge(e, t[0]) && e3.AddCellAnim(e, TC.CAN_MERGE),
        !e.data ||
          99901 != e.data.config.id ||
          t[0].data.elementType.includes(Z2.BUBBLE) ||
          (0 != t[0].data.remoteData.endTime &&
            8 != ~~(t[0].data.config.propEffect / 100) &&
            7 != ~~(t[0].data.config.propEffect / 100) &&
            3 != ~~(t[0].data.config.propEffect / 100)) ||
          9 == ~~(t[0].data.config.propEffect / 100) ||
          (G2.UnlockingManuElement && G2.UnlockingManuElement.serverIdx == t[0].serverIdx) ||
          (G2.UnlockingNewElement && G2.UnlockingNewElement.serverIdx == t[0].serverIdx))
      ) {
        if (
          MW.isStoreCell(e) &&
          (null === (i = t[0]) || void 0 === i ? void 0 : i.data) &&
          MW.canReceiveLauncher(e, t[0]).ok
        ) {
          c = e3.AddCellAnim(e, TC.PUT_IN);
          e.mergeCellRender.node.opacity = 0;
          var o = c && c.getChildByName("icon_bag");
          o && Ai(o.getComponent(cc.Sprite), e9.getElementTexturePath(e.data.config.id));
          var s = c && c.getChildByName("spine");
          s && (s.active = !1);
        }
      } else {
        var c = e3.AddCellAnim(e, TC.PUT_IN);
        e.mergeCellRender.node.opacity = 0;
        var l = 5001;
        (E8.role.bagSkin.forEach(function (e, t) {
          e && (l = t);
        }),
          Ai(c.getChildByName("icon_bag").getComponent(cc.Sprite), e9.getBagSkinIconPath(l)));
        var d = c.getChildByName("spine");
        if (d) {
          var u = config.ManagerBagSkin.getById(l);
          if (u && u.bagSkinAnim) {
            r(n, void 0, void 0, function () {
              var e, t;
              return a(this, function (i) {
                switch (i.label) {
                  case 0:
                    return [4, Si(e9.getSpinePath("BagSp/" + u.bagSkinAnim))];
                  case 1:
                    return (
                      (e = i.sent()),
                      ((t = d.getComponent(sp.Skeleton)).skeletonData = e),
                      (d.active = !0),
                      ib.playAnimation(t, "idle", !0),
                      [2]
                    );
                }
              });
            });
          } else d.active = !1;
        }
      }
      (e.data &&
        e.data.elementType.includes(Z2.ORDER) &&
        (!b2.IsNeedOrderElement(t[0].data.config.id, e.data.remoteData) ||
          e.data.elementType.includes(Z2.BUBBLE) ||
          e.data.remoteData.state == mr.box ||
          e.data.remoteData.state == mr.web ||
          e.cellState == Q2.SNOW ||
          t[0].data.elementType.includes(Z2.BUBBLE) ||
          e3.AddCellAnim(e, TC.CAN_MERGE)),
      t[0].data &&
        e.data &&
        !t[0].data.elementType.includes(Z2.BUBBLE) &&
        !e.data.elementType.includes(Z2.BUBBLE)) &&
        this._showCanHitMonster.length &&
        this._showCanHitMonster.includes(e.serverIdx) &&
        (e3.RemoveCellAnim(e, TC.AIM), (this._hoverRemoveAimAnim = !0));
      this._hoverCell = e;
    }),
    (n.prototype.onHoverEnd = function (e, t) {
      e &&
        (e3.RemoveCellAnim(e, TC.CAN_MERGE),
        ((e.data && 99901 == e.data.config.id) || MW.isStoreCell(e)) &&
          (e3.RemoveCellAnim(e, TC.PUT_IN), (e.mergeCellRender.node.opacity = 255)),
        this._hoverRemoveAimAnim && this._hoverCell && e3.AddCellAnim(this._hoverCell, TC.AIM),
        (this._hoverRemoveAimAnim = !1),
        (this._hoverCell = null));
    }),
    (n.prototype.onStartMove = function (e) {
      var t = this;
      if (
        (G$.GetAroundCells(e).forEach(function (t) {
          t && t.data && t.data.remoteData.endTime && DG.hideSpeedUpAnimByCell(e, t);
        }),
        !e.data.elementType.includes(Z2.BUBBLE) || e.data.remoteData.order.endTime)
      ) {
        var i = this._checkCanHitMonster(e);
        if (i.length) {
          this._showCanHitMonster = i;
          b.addClock("needShowHitMonster", 1, 500, 1).registCallBack(
            this,
            function () {
              t._showCanHitMonster.forEach(function (e) {
                var i = G$.GetCellByIndex(e);
                (i && t._hoverCell && i.serverIdx == t._hoverCell.serverIdx) ||
                  (i && e3.AddCellAnim(i, TC.AIM));
              });
            }.bind(this),
          );
        }
      }
    }),
    (n.prototype.onEndMove = function (e) {
      e.data.elementType.includes(Z2.BUBBLE) ||
        (this._showCanHitMonster &&
          (b.removeClock("needShowHitMonster"),
          this._showCanHitMonster.forEach(function (e) {
            var t = G$.GetCellByIndex(e);
            t && e3.RemoveCellAnim(t, TC.AIM);
          })));
    }),
    (n.prototype.onRemove = function (e) {
      (u.dispatch("removeBoardElement"),
        e.data &&
          e.data.remoteData._speedUpStartTime &&
          (e.data.remoteData._speedUpStartTime = E8.serverTime),
        G$.GetAroundCells(e).forEach(function (t) {
          t && t.data && t.data.remoteData.endTime && DG.hideSpeedUpAnimByCell(e, t);
        }));
    }),
    (n.prototype.onSelectSound = function (e) {
      if (e.data && !e.data.elementType.includes(Z2.BUBBLE) && !G$.IsCellInState(e, mr.web)) {
        var t = e.data.config.id,
          i = e.data.remoteData.recovery.get(yr.manualProduct);
        if (e.data.serverData && e.data.serverData.uUID) {
          var n = b.getClock("selectSoundLock_" + e.data.serverData.uUID);
          if (n && n.running && i && i.value > 0) return;
          var o = VW.getWorldTaskActivity();
          if (o && e.data.remoteData.order.orderId && e.data.remoteData.recovery)
            if (
              config.WorldTaskConfig.getById(o.content).orderElementID.includes(e.data.config.id) &&
              i &&
              i.value > 0
            )
              return;
          if ((G$.PlayElementSelectSound(t), q6.instance.isAB(E8.role.createVersion))) return;
          var r = config.MergeGuideTip.getByEleId(t),
            a = !r || !E8.role.guideOnce || E8.checkBit(E8.role.guideOnce, r.number);
          r &&
            !a &&
            (oK.show(r.mergeTips, "Texture/UI/MergeGuideTip/" + r.mergeTipsPic),
            hm.setGuideOnce({ index: r.number }));
        }
      }
    }),
    (n.prototype._checkButterflyPass = function (e, t) {
      var i = this,
        n = r3.getButterflyPassActivity(),
        o = r3.getButterflyPassData();
      if (!(n && o && e.data && t.data)) return -1;
      if (r3.getState() != t3.START) return -1;
      if (!config.ButterflyPassConfig.getById(n.content)) return -1;
      var s =
          e.data.remoteData.extra && e.data.remoteData.extra.get(fr.butterflyPass)
            ? parseInt(e.data.remoteData.extra.get(fr.butterflyPass))
            : 0,
        c =
          t.data.remoteData.extra && t.data.remoteData.extra.get(fr.butterflyPass)
            ? parseInt(t.data.remoteData.extra.get(fr.butterflyPass))
            : 0,
        l = 0;
      if (
        (s && c
          ? (l =
              2 == s && 2 == c
                ? config.ButterflyPassScore.config.gold2ButterflyScore
                : 2 == s || 2 == c
                  ? config.ButterflyPassScore.config.normal1gold1ButterflyScore
                  : config.ButterflyPassScore.config.normal2ButterflyScore)
          : s
            ? (l =
                2 == s
                  ? config.ButterflyPassScore.config.goldButterflyScore
                  : config.ButterflyPassScore.config.normalButterflyScore)
            : c &&
              (l =
                2 == c
                  ? config.ButterflyPassScore.config.goldButterflyScore
                  : config.ButterflyPassScore.config.normalButterflyScore),
        l > 0)
      ) {
        var d = Ct.getUI("ThemePassBtn");
        r(i, void 0, void 0, function () {
          var t;
          return a(this, function (i) {
            switch (i.label) {
              case 0:
                return (
                  (t = r3.CalButterflyType(1 == s || 1 == c, 2 == s || 2 == c)),
                  [4, h3.ComplexButterFlyAnim(d, e.worldPos, l, t)]
                );
              case 1:
                return (
                  i.sent(),
                  j8.play(o_.PICKONE_CARD_YEAH),
                  (IL._addCount += l),
                  (IL._addCoinAnim = !0),
                  u.dispatch("updateButterflyPassProgress"),
                  [2]
                );
            }
          });
        });
      }
      var h = e.data.config.mergeElementId;
      return r3.CreatButterfly(h);
    }),
    (n.prototype._checkPassProduct = function (e, t, i) {
      if (e.data) {
        var n = e.data.config;
        if (!n.series.startsWith("Pass"))
          if (FE.getState() == ME.START) {
            var o = Zr(n.type);
            if (FE.isPassShowInBoard(o)) {
              var r = FE.getEventPassActivity(),
                a = G2.ExtraData.get("PassMergeCount");
              (a++, G2.ExtraData.set("PassMergeCount", a));
              var s = FE.isAutoElement(i) ? "autoMergeProbabilityCount" : "PassWeightCount",
                c = G2.ExtraData.get(s);
              if ((c++, G2.ExtraData.set(s, c), !(t <= 0))) {
                var l = config.PassConfig.getById(r.content),
                  d = 0,
                  u = !1;
                l.passInitTimes.forEach(function (e) {
                  u || (a >= e ? ((a -= e), d++) : (u = !0));
                });
                var h = FE.GetCurrentPassElementConf(n.type),
                  p = function (t) {
                    var i = { id: t, state: mr.none },
                      n = new w2();
                    return (
                      (n.data = i),
                      (n.seed = e.data.randomElementInt()),
                      (n.fromCell = e),
                      (n.productType = vr.none),
                      (n.isCreator = !0),
                      TJ.CreateNewElement(n)
                    );
                  },
                  f = function () {
                    FE.isAutoElement(i)
                      ? G2.ExtraData.set("autoMergeProbabilityCount", 0)
                      : G2.ExtraData.set("PassWeightCount", 0);
                  };
                if (
                  l.passInitTimes.length > 0 &&
                  (d < l.passInitTimes.length || (d == l.passInitTimes.length && 0 == a))
                ) {
                  if (d > 0 && 0 == a) {
                    var g = 0;
                    if (d > h.passInitOrder.length) {
                      var v = [];
                      (h.passIDWeight.forEach(function (e, t) {
                        v.push({ item: parseInt(t), weight: e });
                      }),
                        (g = TJ.BoardRandomElement(e, v)));
                    } else g = h.passInitOrder[d - 1];
                    if (g) return (f(), p(g));
                  }
                } else {
                  var m = null,
                    y = null;
                  FE.isAutoElement(i)
                    ? ((m = l.autoPassWeight), (y = l.autoMergeTimes))
                    : ((m = l.passWeight), (y = l.mergeTimes));
                  for (var _ = m.length - 1, b = 0; b < y.length; b++)
                    if (c < y[b]) {
                      _ = b;
                      break;
                    }
                  var w = 0,
                    C = m[_];
                  if ((C > 0 && (w = e.data.randomInt(0, 1e3)), C > 0 && w < C)) {
                    var I = [];
                    if (
                      (h.passIDWeight.forEach(function (e, t) {
                        I.push({ item: parseInt(t), weight: e });
                      }),
                      (g = TJ.BoardRandomElement(e, I)))
                    )
                      return (f(), p(g));
                  }
                }
                return null;
              }
            }
          }
      }
    }),
    (n.prototype._checkCanHitMonster = function (e) {
      var t = [];
      if (Nge.isElementShengjian(e.data.config.id))
        return (
          G2.Data.cells.forEach(function (e) {
            Nge.isElementTower(e.elementId) && t.push(e.index);
          }),
          t
        );
      if (VW.getState() != FW.START) return [];
      var i = VW.getWorldTaskActivity();
      if (!i) return [];
      var n = config.WorldTaskConfig.getById(i.content);
      if (!n) return [];
      var o = n.fillElementID;
      return (
        G2.Data.cells.forEach(function (i) {
          var n = i.recovery.get(yr.manualProduct);
          if (
            i.elementId &&
            i.index != e.serverIdx &&
            i.order &&
            i.order.orderId &&
            !i.order.endTime &&
            !(n && n.value > 0)
          ) {
            var r = i.order.elements,
              a = config.ElementOrderPool.getById(i.order.orderId);
            a.demand.forEach(function (n, s) {
              var c = parseInt(s),
                l = a.demand.get(s),
                d = r.get(c) ? r.get(c) : 0;
              e.data.config.id == c && o.includes(i.elementId) && l - d > 0 && t.push(i.index);
            });
          }
        }),
        t
      );
    }),
    (n = o([hKe, pKe("MergeCell/Logic/CommonElement"), BM("CommonElement")], n)));
})(xM),
  cc._RF.pop());
