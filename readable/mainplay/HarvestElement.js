// Extracted cached Cocos registration: HarvestElement
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 8368302..8381414.
// Shared closure variables remain in readable/game.formatted.js:406177.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "b1215ga8O5J55QM2zpTtc8X", "HarvestElement");
var SKe = cc._decorator,
  TKe = SKe.ccclass;
SKe.property;
var EKe = SKe.menu;
(!(function (e) {
  function n() {
    return (null !== e && e.apply(this, arguments)) || this;
  }
  (t(n, e),
    (n.prototype.onInitRender = function (e) {
      nq.isKeyElement(e) && nq.hasPendingAreaLock() && e3.AddCellAnim(e, TC.MANU_OPENED);
    }),
    (n.prototype.onClickElement = function (e) {
      (null == e ? void 0 : e.data) &&
        ((nq.isKeyElement(e) && !nq.canCollectKeyElement()) || this.collectElement(e));
    }),
    (n.prototype.onUseAreaLock = function (e, t) {
      (null == e ? void 0 : e.data) &&
        nq.isKeyElement(e) &&
        nq.canCollectKeyElement() &&
        this.collectElement(e, null == t ? void 0 : t[0], !0);
    }),
    (n.prototype.collectElement = function (e, t, n) {
      var o = this;
      if (
        (void 0 === n && (n = !1),
        (null == e ? void 0 : e.data) &&
          !e.data.elementType.includes(Z2.BUBBLE) &&
          e.cellState != Q2.LOCK &&
          e.cellState != Q2.COVER &&
          e.cellState != Q2.SNOW &&
          !e.isLock &&
          (e.data.config.id, e.data.config.getResource && e.data.config.getResource.size > 0))
      ) {
        var s = G$.parseGetResConf(e),
          c = s.items.concat(s.randomItem);
        if (c && c.length) {
          for (var l = 0; l < c.length; ++l) {
            var h = c[l];
            if (h.itemType == oa.eventEnergyII) {
              var p = X8.getActivityStage(),
                f = X8.getActivity();
              if (p != F2.START || !f)
                return void A8.Toast({ title: v.getLabel("chess4_tap_energyII_toast") });
            } else if (h.itemType == oa.passPoint) {
              if ((p = FE.getState()) != ME.START) return;
            } else if (h.itemType == oa.worldPoint) {
              if ((p = VW.getState()) != FW.START) return;
            } else if (h.itemType == oa.rankPoint) {
              if ((p = hJ.getState()) != lJ.START) return;
            } else if (h.itemType == oa.lampPoint) {
              if ((p = wM.getState()) != mM.START) return;
              var g = wM.LampCell;
              if (!g) return;
              if (wM.getLampCount(g) >= wM.getLampMax())
                return (
                  wM.showMaxAnim(),
                  j8.play(o_.LAMP_FULL),
                  void A8.Toast({ title: v.getLabel("lampPass_filled_tips") })
                );
            } else if (h.itemType == oa.passNewPoint) {
              var m = YE.getStateActivity(ew.START);
              if (!m || !m.EventPassNewData) return;
            } else if (h.itemType == oa.film) {
              if (!!!AK.CurrentBackendData)
                return void A8.Toast({ title: v.getLabel("chess7_film_collect") });
            }
          }
          var y = c.some(function (e) {
              return e.itemType == oa.film;
            }),
            _ = c.some(function (e) {
              return e.itemType == oa.blockKey;
            });
          if (_ && !nq.tryStartKeyCollect()) return;
          if (y || _) {
            e.isLock = !0;
            var b = G2.Data.viewStartRow;
            (this.collectSyncReward(e, y, _, b, t, n),
              F8.switches.boardDebugInfo &&
                K3.logEvent("board_operate_info", {
                  type: "cellcollect_seasonCard",
                  detail: "from:" + e.serverIdx + "_" + e.data.config.id,
                }));
            var w = e.data.config.id;
            if (((e.data = null), !n))
              Ai(
                e3.AddCellAnim(e, TC.ELEMENT_DISAPPEAR).children[0].getComponent(cc.Sprite),
                e9.getElementTexturePath(w),
              );
            return void u.dispatch("showElementInfo", e);
          }
          (EJ.BoardRequestSendDebounce(
            { boardId: G2.Data.id, index: e.serverIdx, timestamp: E8.serverTime },
            "cellcollect",
            null,
            "from" + e.serverIdx,
          ),
            F8.switches.boardDebugInfo &&
              K3.logEvent("board_operate_info", {
                type: "cellcollect",
                detail: "from:" + e.serverIdx + "_" + e.data.config.id,
              }));
        }
        var C = !1,
          I = e.data.config.id;
        (c.forEach(function (t, n) {
          var s;
          if (t.itemType == oa.coin)
            ((E8.role.coin += t.value),
              (C = !0),
              ((l = new Za()).itemType = oa.coin),
              (l.value = t.value),
              h3.complexFly(l, null, e.worldPos, null, 50),
              j8.play(o_.HARVEST_COIN));
          else if (t.itemType == oa.energy) {
            ((E8.role.energy.value += t.value),
              (C = !0),
              ((l = new Za()).itemType = oa.energy),
              (l.value = t.value),
              h3.complexFly(l, null, e.worldPos, null, 50),
              j8.play(o_.HARVEST_ELEMENT));
          } else if (t.itemType == oa.exp) {
            E8.role.expLevel += t.value;
            var c = Ct.getUI("exp");
            (o.flyAnim(e.data.mergeCellIconUrl, c, e.worldPos, "exp"), j8.play(o_.HARVEST_ELEMENT));
          } else if (t.itemType == oa.diamond) {
            ((E8.role.diamond += t.value),
              (C = !0),
              ((l = new Za()).itemType = oa.diamond),
              (l.value = t.value),
              h3.complexFly(l, null, e.worldPos, null, 50),
              j8.play(o_.HARVEST_ELEMENT));
          } else if (t.itemType == oa.activityExp) {
            c = Ct.getUI("updateEventStar");
            (o.flyAnim(e.data.mergeCellIconUrl, c, e.worldPos, null), j8.play(o_.HARVEST_ELEMENT));
          } else if (t.itemType == oa.star) {
            var l;
            ((E8.role.star += t.value),
              ((l = new Za()).itemType = oa.star),
              (l.value = t.value),
              ((c = Ct.getUI("MergeBoardTaskBtn")) && c.activeInHierarchy) ||
                (c = G2.getBoardExitNode()),
              h3.complexFly(l, c, e.worldPos, null, 50),
              j8.play(o_.HARVEST_ELEMENT));
          } else if (t.itemType == oa.worldPoint) {
            K3.logEvent("atai_harvest_element", { id: I });
            var h = Ct.getUI("WorldTaskBtn");
            (j8.play(o_.HARVEST_ELEMENT), j8.play(o_.WORLD_HARVEST));
            r(o, void 0, void 0, function () {
              return a(this, function (i) {
                switch (i.label) {
                  case 0:
                    return [4, this.flyAnim(e.data.mergeCellIconUrl, h, e.worldPos, null, !1)];
                  case 1:
                    return (
                      i.sent(),
                      (LP._addCount = t.value),
                      (LP._addCoinAnim = !0),
                      u.dispatch("updateWorldTask"),
                      [2]
                    );
                }
              });
            });
          } else if (t.itemType == oa.passPoint) {
            K3.logEvent("pass_harvest_element", { id: I });
            var p = Ct.getUI("EventPassBtn");
            j8.play(o_.HARVEST_ELEMENT);
            var f = t,
              g = FE.getEventPassData(),
              v = g.collectCount,
              m = FE.getEventPassActivity(),
              y = FE.checkEjectOnceData();
            if (g && !g.isVip && 2 == v && -1 != y) {
              var _ = config.PassConfig.getById(m.content);
              (j_.showWindow(F3.TipDetailWindow, {
                title: _.doubleTipsTitle,
                desc: _.doubleTipsDesc,
                image: "Texture/UI/EventPass/" + _.id + "/EventPass_pic_doubletips",
                showPass: !0,
              }),
                FE.offEjectOnceData(y));
            }
            r(o, void 0, void 0, function () {
              var i;
              return a(this, function (n) {
                switch (n.label) {
                  case 0:
                    return g && g.isVip
                      ? (this.flyDouble(e.data.mergeCellIconUrl, p, e.worldPos, null, !1),
                        [4, S(850)])
                      : [3, 6];
                  case 1:
                    (n.sent(), (i = 0), (n.label = 2));
                  case 2:
                    return i < 2
                      ? (j8.play(o_.PICKONE_CARD_YEAH),
                        (IKe._addCount = f.value),
                        (IKe._addCoinAnim = !0),
                        u.dispatch("updateEventPass"),
                        u.dispatch("updateEventPassProgress"),
                        [4, S(300)])
                      : [3, 5];
                  case 3:
                    (n.sent(), (n.label = 4));
                  case 4:
                    return (i++, [3, 2]);
                  case 5:
                    return [3, 8];
                  case 6:
                    return [4, this.flyAnim(e.data.mergeCellIconUrl, p, e.worldPos, null, !1)];
                  case 7:
                    (n.sent(),
                      j8.play(o_.PICKONE_CARD_YEAH),
                      (IKe._addCount = t.value),
                      (IKe._addCoinAnim = !0),
                      u.dispatch("updateEventPass"),
                      u.dispatch("updateEventPassProgress"),
                      (n.label = 8));
                  case 8:
                    return [2];
                }
              });
            });
          } else if (t.itemType == oa.foodPoint) {
            K3.logEvent("healthy_foodpoint_get", { from: "cellCollect", value: t.value });
            var b = Ct.getUI("HealthFoodPassBtn");
            j8.play(o_.HARVEST_ELEMENT);
            r(o, void 0, void 0, function () {
              var i;
              return a(this, function (n) {
                switch (n.label) {
                  case 0:
                    return (
                      ((i = new Za()).itemType = oa.foodPoint),
                      (i.value = t.value),
                      [4, h3.complexFly(i, b, e.worldPos, null, 50)]
                    );
                  case 1:
                    return (
                      n.sent(),
                      j8.play(o_.PICKONE_CARD_YEAH),
                      (G6._addCount = t.value),
                      (G6._addCoinAnim = !0),
                      u.dispatch("updateHealthFoodPassInfo"),
                      [2]
                    );
                }
              });
            });
          } else if (t.itemType == oa.chessIIPoint) {
            K3.logEvent("actPro_point_get", { from: "cellCollect", value: t.value });
            var w = Ct.getUI("ActProBtn");
            j8.play(o_.HARVEST_ELEMENT);
            r(o, void 0, void 0, function () {
              var i;
              return a(this, function (n) {
                switch (n.label) {
                  case 0:
                    return (
                      ((i = new Za()).itemType = oa.chessIIPoint),
                      (i.value = t.value),
                      [4, h3.complexFly(i, w, e.worldPos, null, 50)]
                    );
                  case 1:
                    return (
                      n.sent(),
                      j8.play(o_.PICKONE_CARD_YEAH),
                      (vx._addCount = t.value),
                      (vx._addCoinAnim = !0),
                      u.dispatch("updateActProgress"),
                      [2]
                    );
                }
              });
            });
          } else if (t.itemType == oa.chessIXPoint) {
            K3.logEvent("act9_point_get", { from: "cellCollect", value: t.value });
            var T = Ct.getUI("act9PassEntrance");
            j8.play(o_.HARVEST_ELEMENT);
            r(o, void 0, void 0, function () {
              var n;
              return a(this, function (o) {
                switch (o.label) {
                  case 0:
                    return (
                      ((n = new Za()).itemType = oa.chessIXPoint),
                      (n.value = t.value),
                      [4, h3.complexFly(n, T, e.worldPos, null, 50)]
                    );
                  case 1:
                    return (
                      o.sent(),
                      j8.play(o_.PICKONE_CARD_YEAH),
                      d.emit(i.Act9AddPoint, { value: t.value }),
                      [2]
                    );
                }
              });
            });
          } else if (t.itemType == oa.clearPoint) {
            var E = Ct.getUI("WarehouseBtn");
            j8.play(o_.CLEARPOINT);
            r(o, void 0, void 0, function () {
              var i;
              return a(this, function (n) {
                switch (n.label) {
                  case 0:
                    return (
                      ((i = new Za()).itemType = oa.clearPoint),
                      (i.value = t.value),
                      [4, h3.complexFly(i, E, e.worldPos, null, 50)]
                    );
                  case 1:
                    return (
                      n.sent(),
                      j8.play(o_.PICKONE_CARD_YEAH),
                      (qj._addCount = t.value),
                      (qj._addCoinAnim = !0),
                      u.dispatch("updateWarehouse"),
                      [2]
                    );
                }
              });
            });
          } else if (t.itemType == oa.rankPoint) {
            K3.logEvent("rank_point_get", { from: "cellCollect", value: t.value });
            var A = Ct.getUI("TimeOrderTaskBtn");
            j8.play(o_.HARVEST_ELEMENT);
            r(o, void 0, void 0, function () {
              var i;
              return a(this, function (n) {
                switch (n.label) {
                  case 0:
                    return (
                      ((i = new Za()).itemType = oa.rankPoint),
                      (i.value = t.value),
                      [4, this.flyAnim(e.data.mergeCellIconUrl, A, e.worldPos, null, !1)]
                    );
                  case 1:
                    return (
                      n.sent(),
                      j8.play(o_.PICKONE_CARD_YEAH),
                      (RP._addCount = t.value),
                      (RP._addCoinAnim = !0),
                      u.dispatch("updateTimeOrderProgress"),
                      [2]
                    );
                }
              });
            });
          } else if (t.itemType == oa.eventEnergyII) {
            var k = G2.MergeBoardType == X8.getBoardType(),
              R = k ? Ct.getUI("eventEnergyII") : Ct.getUI("actMaxEnergyEntrance");
            j8.play(o_.HARVEST_ELEMENT);
            r(o, void 0, void 0, function () {
              var i;
              return a(this, function (n) {
                switch (n.label) {
                  case 0:
                    return (
                      ((i = new Za()).itemType = oa.eventEnergyII),
                      (i.value = t.value),
                      [4, h3.complexFly(i, R, e.worldPos, null, 50)]
                    );
                  case 1:
                    return (
                      n.sent(),
                      j8.play(o_.PICKONE_CARD_YEAH),
                      k
                        ? u.dispatch("updateActMaxEnergy")
                        : u.dispatch("updateActMaxEnergyProgress"),
                      [2]
                    );
                }
              });
            });
          } else if (t.itemType == oa.eventEnergyIV) {
            var P = dI.instance,
              D = G2.MergeBoardType == P.boardType,
              B = D ? Ct.getUI("eventEnergyIV") : Ct.getUI("act8EnergyEntrance");
            j8.play(o_.HARVEST_ELEMENT);
            r(o, void 0, void 0, function () {
              var i;
              return a(this, function (n) {
                switch (n.label) {
                  case 0:
                    return (
                      ((i = new Za()).itemType = oa.eventEnergyIV),
                      (i.value = t.value),
                      [4, h3.complexFly(i, B, e.worldPos, null, 50)]
                    );
                  case 1:
                    return (
                      n.sent(),
                      j8.play(o_.PICKONE_CARD_YEAH),
                      D ? u.dispatch("updateAct8Energy") : u.dispatch("updateAct8EnergyProgress"),
                      [2]
                    );
                }
              });
            });
          } else if (t.itemType == oa.lampPoint) {
            if (!wM.LampCell) return;
            wM.lampAddCount(t.value, TC.LAMP_ADD);
          } else if (t.itemType == oa.passNewPoint) {
            var L = Ct.getUI("EventPassNewBtn");
            if (
              (j8.play(o_.HARVEST_ELEMENT),
              !(P = YE.getStateActivity(ew.START)) || !P.EventPassNewData)
            )
              return;
            r(o, void 0, void 0, function () {
              return a(this, function (n) {
                switch (n.label) {
                  case 0:
                    return [4, this.flyAnim(e.data.mergeCellIconUrl, L, e.worldPos, null, !1)];
                  case 1:
                    return (
                      n.sent(),
                      d.emit(i.OnceVibrate, {
                        type: by.Light,
                        source: "HarvestElement.passNewPointFlyEnd",
                      }),
                      j8.play(o_.PICKONE_CARD_YEAH),
                      u.dispatch(ZE.EVENT_PASS_NEW_ADD_POINT, t.value),
                      [2]
                    );
                }
              });
            });
            ((v = P.EventPassNewData.dailyCollectCount), (y = P.checkEjectOnceData()));
            P.EventPassNewData.status != ma.sVIP &&
              2 == v &&
              -1 != y &&
              (j_.showWindow(F3.EventPassNewTipWindow, "merge"), E8.offActOnceData(P.data.id, y));
          } else if (t.itemType == oa.seasonCard) j8.play(o_.HARVEST_ELEMENT);
          else if (t.itemType == oa.none) {
            var N = Ct.getUI("act6handbook");
            j8.play(o_.HARVEST_ELEMENT);
            (r(o, void 0, void 0, function () {
              return a(this, function (t) {
                switch (t.label) {
                  case 0:
                    return [4, this.flyAnim(e.data.mergeCellIconUrl, N, e.worldPos, null, !1)];
                  case 1:
                    return (t.sent(), j8.play(o_.PICKONE_CARD_YEAH), [2]);
                }
              });
            }),
              null === (s = NE.instance) || void 0 === s || s.harvestStory(e.data.config.id),
              u.dispatch(PE.UPDATE_OII_ACT6_RED_DOT));
          }
        }),
          s.randomItem.forEach(function (t) {
            (t.itemType != oa.coin && t.itemType != oa.energy && t.itemType != oa.diamond) ||
              CS.flyTipItem(t, e.worldPos, 60, 0.9, Ne.getLayer(Be.TIP), !1);
          }));
        var T = r3.ButterflyScoreByCell(e);
        if (T.score > 0) {
          var E = Ct.getUI("ThemePassBtn");
          r(o, void 0, void 0, function () {
            var t;
            return a(this, function (i) {
              switch (i.label) {
                case 0:
                  return ((t = T.type), [4, h3.ComplexButterFlyAnim(E, e.worldPos, T.score, t)]);
                case 1:
                  return (
                    i.sent(),
                    j8.play(o_.PICKONE_CARD_YEAH),
                    (IL._addCount += T.score),
                    (IL._addCoinAnim = !0),
                    u.dispatch("updateButterflyPassProgress"),
                    [2]
                  );
              }
            });
          });
        }
        (qG.checkEnergy(e),
          hx.checkActEnergy(e),
          hx.instance.collectCellAllExtraRes(e),
          (e.data = null),
          Ai(
            e3.AddCellAnim(e, TC.ELEMENT_DISAPPEAR).children[0].getComponent(cc.Sprite),
            e9.getElementTexturePath(I),
          ),
          C && e3.AddCellAnim(e, TC.GET_ENERGY),
          u.dispatch("showElementInfo", e));
      }
    }),
    (n.prototype.collectSyncReward = function (e, t, i, n, o, s) {
      var c, l;
      return (
        void 0 === s && (s = !1),
        r(this, void 0, void 0, function () {
          var r, d, u, p, f, g;
          return a(this, function (a) {
            switch (a.label) {
              case 0:
                ((r = G2.Data.id),
                  (d = e.serverIdx),
                  (u = o || e.worldPos),
                  (p =
                    null === (l = null === (c = e.data) || void 0 === c ? void 0 : c.config) ||
                    void 0 === l
                      ? void 0
                      : l.id),
                  (f = null),
                  (a.label = 1));
              case 1:
                return (
                  a.trys.push([1, 5, 6, 7]),
                  EJ.SendRequestNow(),
                  [
                    4,
                    TJ.BoardRequestSend(
                      hm.cellCollect,
                      { boardId: r, index: d, timestamp: E8.serverTime },
                      "cellcollect",
                      function (o, a) {
                        if (!a && o && o.getData) {
                          var c = o.getData();
                          if (
                            (c.rewards &&
                              c.rewards.length > 0 &&
                              t &&
                              K6.checkRewardCard(c.rewards),
                            i)
                          ) {
                            var l = E8.role.boards.get(r);
                            f = nq.unlockWithKey(
                              u,
                              function () {
                                if (l && l.viewStartRow != n)
                                  return G2.SlideBoard(l, Math.abs(l.viewStartRow - n));
                              },
                              p,
                              e,
                              s,
                            );
                          }
                        }
                      },
                      "seasonCard_from" + d,
                      !1,
                    ),
                  ]
                );
              case 2:
                return (a.sent(), f ? [4, f] : [3, 4]);
              case 3:
                (a.sent(), (a.label = 4));
              case 4:
                return [3, 7];
              case 5:
                return ((g = a.sent()), h.error("collect sync reward failed", g), [3, 7]);
              case 6:
                return ((e.isLock = !1), i && nq.finishKeyCollect(), [7]);
              case 7:
                return [2];
            }
          });
        })
      );
    }),
    (n.prototype.flyAnim = function (e, t, i, n, o) {
      return (
        void 0 === o && (o = !0),
        r(this, void 0, void 0, function () {
          var r;
          return a(this, function (a) {
            switch (a.label) {
              case 0:
                return [4, CS.flyInit(t, i)];
              case 1:
                return (r = a.sent())
                  ? [4, CS.flyIconSpecial(e, r.start, r.end, null, !1, cc.v2(100, 100))]
                  : [2];
              case 2:
                return (
                  a.sent(),
                  o
                    ? ((t.scale = 1),
                      cc
                        .tween(t)
                        .to(0.066, { scale: 0.5 })
                        .to(0.166, { scale: 1.2 })
                        .to(0.1, { scale: 1 })
                        .start(),
                      [4, S(200)])
                    : [3, 4]
                );
              case 3:
                (a.sent(), (a.label = 4));
              case 4:
                return (
                  n && ZC.valueLabel(n),
                  n || u.dispatch("updateOrderStar"),
                  n || u.dispatch("updateEventStar"),
                  [2]
                );
            }
          });
        })
      );
    }),
    (n.prototype.flyDouble = function (e, t, i, n, o, s) {
      return (
        void 0 === o && (o = !0),
        r(this, void 0, void 0, function () {
          var r;
          return a(this, function (a) {
            switch (a.label) {
              case 0:
                return [4, CS.flyInit(t, i)];
              case 1:
                return (r = a.sent())
                  ? [4, CS.flyIconDouble(e, r.start, r.end, null, !1, cc.v2(100, 100))]
                  : [2];
              case 2:
                return (
                  a.sent(),
                  o
                    ? ((t.scale = 1),
                      cc
                        .tween(t)
                        .to(0.066, { scale: 0.5 })
                        .to(0.166, { scale: 1.2 })
                        .to(0.1, { scale: 1 })
                        .start(),
                      [4, S(200)])
                    : [3, 4]
                );
              case 3:
                (a.sent(), (a.label = 4));
              case 4:
                return (
                  n && ZC.valueLabel(n),
                  n || u.dispatch("updateOrderStar"),
                  n || u.dispatch("updateEventStar"),
                  [2]
                );
            }
          });
        })
      );
    }),
    (n = o([TKe, EKe("MergeCell/Logic/HarvestElement"), BM("HarvestElement")], n)));
})(xM),
  cc._RF.pop());
