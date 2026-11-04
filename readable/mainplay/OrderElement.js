// Extracted cached Cocos registration: OrderElement
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 8405763..8415400.
// Shared closure variables remain in readable/game.formatted.js:407853.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "dd415lauyZIBIZU88QngP58", "OrderElement");
var JKe = cc._decorator,
  QKe = JKe.ccclass;
JKe.property;
var ZKe = JKe.menu;
(!(function (e) {
  function n() {
    return (null !== e && e.apply(this, arguments)) || this;
  }
  var s;
  (t(n, e),
    (s = n),
    (n.prototype.onInitElement = function (e) {
      if (
        (this._getNewOrder(e),
        this._refreshDisplay(e),
        e &&
          e.data &&
          e.data.config &&
          G$.isOrderElementCorrect(e.data.config.elementOrderId, y2.monster))
      ) {
        var t = b2.getOrderPoolProduct(e.data.config.elementOrderId);
        TJ.PreloadLauncherProducts(t);
      }
    }),
    (n.prototype.onProductOut = function (e) {
      (e.data && e.data.config.elementOrderId < 0 && (e.data.remoteData.order = new Zc()),
        this._refreshDisplay(e));
    }),
    (n.prototype.onTimeChange = function (e) {
      this.updateRecover(e);
    }),
    (n.prototype.updateRecover = function (e) {
      var t = e.dynamicComponents.get("OrderRecover");
      t && t.onUpdate(null);
    }),
    (n.prototype.onPutInto = function (e, t) {
      return r(this, void 0, void 0, function () {
        var n,
          o,
          c,
          l,
          h,
          p,
          f,
          g,
          v,
          m,
          y,
          _,
          b,
          w,
          C,
          I = this;
        return a(this, function (T) {
          switch (T.label) {
            case 0:
              if (!t[0] || !t[0].data) return [2];
              if (!(n = e.data.remoteData.order)) return [2];
              ((o =
                b2.IsNeedOrderElement(t[0].data.config.id, e.data.remoteData) &&
                !t[0].data.elementType.includes(Z2.BUBBLE) &&
                !e.data.elementType.includes(Z2.BUBBLE)),
                (c = t[0].data.config.id),
                d.emit(i.OnceVibrate, { type: by.Medium, source: "元素填充" }),
                (l = 0),
                (h = function (e) {
                  l = e ? 1 : 2;
                }),
                rk.isSettingOpen(tk.OrderConfirm) && s.checkNeedConfirm(n.orderId)
                  ? j_.showWindow(F3.MergeConfirmWindow, {
                      cb: h.bind(this),
                      id: t[0].data.config.id,
                      type: KKe.orderInConfirm,
                    })
                  : (l = 1),
                (T.label = 1));
            case 1:
              return 0 != l ? [3, 3] : [4, S(33)];
            case 2:
              return (T.sent(), [3, 1]);
            case 3:
              return (
                rk.isSettingOpen(tk.OrderConfirm) &&
                  s.checkNeedConfirm(n.orderId) &&
                  d.emit(i.OnceVibrate, { type: by.Medium, source: "元素填充二次确认关闭" }),
                2 == l
                  ? (t[0].moveElementTo(t[0].worldPos), [2])
                  : ((p = this._ataiQuestionCheck(c)),
                    (f = !0),
                    p &&
                      ((g = t[0].data.remoteData.recovery) &&
                        g.get(yr.manualProduct).value > 0 &&
                        (f = !1),
                      t[0].data.remoteData.order.state == kr.running && (f = !1)),
                    o && !t[0].data.remoteData.bubbleEnd && f
                      ? ((v = r3.ButterflyScoreByCell(t[0])).score > 0 &&
                          ((m = Ct.getUI("ThemePassBtn")),
                          (function () {
                            return r(I, void 0, void 0, function () {
                              var t;
                              return a(this, function (i) {
                                switch (i.label) {
                                  case 0:
                                    return (
                                      (t = v.type),
                                      [4, h3.ComplexButterFlyAnim(m, e.worldPos, v.score, t)]
                                    );
                                  case 1:
                                    return (
                                      i.sent(),
                                      j8.play(o_.PICKONE_CARD_YEAH),
                                      (IL._addCount += v.score),
                                      (IL._addCoinAnim = !0),
                                      u.dispatch("updateButterflyPassProgress"),
                                      [2]
                                    );
                                }
                              });
                            });
                          })()),
                        hx.checkActEnergy(t[0]),
                        hx.instance.collectCellAllExtraRes(t[0]),
                        b2.IsNeedOrderElement(
                          t[0].data.config.id,
                          e.data.remoteData,
                          t[0].data.config.id,
                        ),
                        (y = b2.IsNeedOrderFinish(e.data.remoteData)),
                        TJ.BoardRequestSend(
                          hm.completeElementOrder,
                          {
                            boardId: G2.Data.id,
                            index: e.serverIdx,
                            indexes: [t[0].serverIdx],
                            timestamp: E8.serverTime,
                          },
                          "completeElementOrder",
                        ),
                        Nge.isElementTower(e.data.config.id) &&
                          ((_ = NE.instance.chess6Data),
                          (b = {
                            victoryPoint: _.victoryPoint,
                            monsterRemainingHp: _.monsterRemainingHp,
                            monsterId: _.monsterId,
                          }),
                          j_.showWindow(F3.MonsterWindow, b)),
                        (w = e.data.config.id),
                        this._ataiQuestionNeedKill(t[0].data.config.id) &&
                          this._ataiQusetionUpgrade(t[0].data.config),
                        (C = this._ataiQuestionCheck(w))
                          ? (71001 == w ? j8.play(o_.WORLD_JINBI) : j8.play(o_.WORLD_BEATMONSTER),
                            e3.AddCellAnim(e, TC.WORLD_BEAT))
                          : e.data.config.fillSound
                            ? j8.playByConf("mergeFill_" + e.data.config.fillSound)
                            : j8.play(o_.GET_REWARD),
                        (t[0].data = null),
                        -1 == y && (b2.UpdateOrderState(e), this._getNewOrder(e, !0)),
                        C
                          ? ((e.mergeCellRender.node_icon.scale = 1),
                            cc
                              .tween(e.mergeCellRender.node_icon)
                              .to(0.1, { scaleX: 1.1, scaleY: 0.8 })
                              .to(0.166, { scaleX: 0.9, scaleY: 1.2 })
                              .to(0.166, { scaleX: 1.05, scaleY: 0.95 })
                              .to(0.166, { scaleX: 1, scaleY: 1 })
                              .start())
                          : ((e.mergeCellRender.node_icon.scale = 0.2),
                            cc
                              .tween(e.mergeCellRender.node_icon)
                              .to(0.166, { scale: 1.2 })
                              .to(0.1, { scale: 0.95 })
                              .to(0.033, { scale: 1 })
                              .start()),
                        this._refreshDisplay(e),
                        u.dispatch(
                          "showElementInfo",
                          e.data.config.elementOrderId < 0 ? e : t[0].data,
                        ),
                        [2])
                      : (f || A8.Toast({ title: "您已经打败了该怪物哦！" }),
                        t[0].moveElementTo(t[0].worldPos),
                        (G2.instance.selectedElement = t[0]),
                        [2]))
              );
          }
        });
      });
    }),
    (n.prototype.onIconLoadFinish = function (e) {
      var t = e.data.remoteData.order;
      if (e.data && e.data.remoteData.recovery) {
        var i = e.data.remoteData.recovery.get(yr.manualProduct);
        if (i && i.value > 0)
          (
            e.mergeCellRender.sprite_icon
              ? e.mergeCellRender.sprite_icon.node.parent.getChildByName("texture_finish")
              : null
          )
            ? e.mergeCellRender.showReadyIcon(!0, "texture_finish")
            : e.mergeCellRender.showReadyIcon(!0);
        else if (t.state == kr.complete) {
          (
            e.mergeCellRender.sprite_icon
              ? e.mergeCellRender.sprite_icon.node.parent.getChildByName("texture_finish")
              : null
          )
            ? e.mergeCellRender.showReadyIcon(!0, "texture_finish")
            : e.mergeCellRender.showReadyIcon(!0);
        }
      }
    }),
    (n.prototype._refreshDisplay = function (e) {
      e3.RemoveCellAnim(e, TC.BAG_TIPS);
      var t = e.data.remoteData.order;
      DG.addCellSpeedUpAnim(e);
      var i = e.data.config.id,
        n = this._ataiQuestionCheck(i),
        o = config.Config.config.specialOrderElement,
        r = e.data.remoteData && e.data.remoteData.recovery,
        a = r && r.get(yr.manualProduct);
      if (
        (G$.isOrderElementCreator(e.data.config.elementOrderId) || o.indexOf(i) >= 0) &&
        (e.mergeCellRender.showReadyIcon(!1),
        t.state != kr.prepare ||
          (a && !(a.value <= 0)) ||
          G$.IsCellInState(e, mr.box) ||
          G$.IsCellInState(e, mr.web) ||
          e.data.elementType.includes(Z2.BUBBLE) ||
          e3.AddCellAnim(e, TC.BAG_TIPS),
        t &&
          1 == t.elements.size &&
          G$.isOrderElementCorrect(e.data.config.elementOrderId, y2.health))
      ) {
        var s = e.mergeCellRender.showPrepareIcon(!0),
          c = e.mergeCellRender.sprite_icon;
        if (c && s)
          Ai(
            c.node.getChildByName("filler").getComponent(cc.Sprite),
            e9.getElementTexturePath(t.elements.keys().next().value),
            y.BorderScale,
            !1,
          );
      }
      var l = G$.isOrderElementOneToN(e.data.config.elementOrderId);
      if (
        e.data &&
        (e.data.remoteData.order.orderId ||
          l ||
          G$.isOrderElementCorrect(e.data.remoteData.order.orderId, y2.monster) ||
          G$.isOrderElementCorrect(e.data.config.elementOrderId, y2.group)) &&
        e.data.remoteData.recovery
      )
        if ((a = (r = e.data.remoteData.recovery).get(yr.manualProduct)) && a.value > 0) {
          (e.mergeCellRender.showProgress(-1, -1, n ? 2 : 1, n),
            (
              e.mergeCellRender.sprite_icon
                ? e.mergeCellRender.sprite_icon.node.parent.getChildByName("texture_finish")
                : null
            )
              ? e.mergeCellRender.showReadyIcon(!0, "texture_finish")
              : e.mergeCellRender.showReadyIcon(!0));
          var d = e.dynamicComponents.get("ManuCreatorRecover");
          d && (d.data = d.data);
        } else if (t.state == kr.prepare) {
          var u = b2.isMultiOrder(e.data.config.elementOrderId),
            h = b2.GetOrderProgress(e.data.config.elementOrderId, e.data.remoteData.order);
          if (
            !G$.IsCellInState(e, mr.box) &&
            !G$.IsCellInState(e, mr.web) &&
            !e.data.elementType.includes(Z2.BUBBLE)
          ) {
            var p =
              Nge.isElementTower(e.data.config.id) ||
              G$.isOrderElementCorrect(e.data.config.elementOrderId, y2.monster);
            if ((e3.AddCellAnim(e, TC.BAG_TIPS), u)) {
              var f = b2.getMultiOrderProgress(e.data.config.elementOrderId);
              e.mergeCellRender.showMultiProgress(h.all, h.cur, f.all, f.cur);
            } else e.mergeCellRender.showProgress(p ? -1 : h.all, h.cur, n ? 2 : 1, n);
          }
          o.indexOf(i) < 0 && e.mergeCellRender.showReadyIcon(!1);
        } else if (t.state == kr.running) {
          var g = e.dynamicComponents.get("OrderRecover");
          if (!g)
            ((g = e3.AddCellAnim(e, TC.ORDER).getComponent(zKe)),
              e.registComponent("OrderRecover", g));
          (g && (g.data = e),
            e.mergeCellRender.showReadyIcon(!0),
            e.mergeCellRender.showProgress(-1, -1, n ? 2 : 1, n));
        } else if (t.state == kr.complete) {
          (
            e.mergeCellRender.sprite_icon
              ? e.mergeCellRender.sprite_icon.node.parent.getChildByName("texture_finish")
              : null
          )
            ? e.mergeCellRender.showReadyIcon(!0, "texture_finish")
            : e.mergeCellRender.showReadyIcon(!0);
        }
    }),
    (n.prototype._tryOrderBegin = function (e, t) {
      var i = config.ElementOrder.getById(e);
      if (!i) return -1;
      if (!i.OrderBegin.length || i.OrderBegin[0] <= 0) return ((t.orderBegin = [-1]), -1);
      t.orderBegin.length || (t.orderBegin = Array.from(i.OrderBegin));
      var n = t.orderBegin[0];
      return (t.orderBegin.length > 1 ? t.orderBegin.shift() : (t.orderBegin = [-1]), n);
    }),
    (n.prototype._tryStableRandom = function (e) {
      return AW.orderStableRandom(e);
    }),
    (n.prototype._tryRandom = function (e, t) {
      var i = [],
        n = [];
      config.ElementOrderPool.list.forEach(function (t, n) {
        t.elementOrderId == e && t.weight > 0 && i.push(t);
      });
      for (var o = 0; o < i.length; o++) n.push({ weight: i[o].weight, item: i[o].id });
      return TJ.BoardRandomElement(t, n);
    }),
    (n.prototype._trySeriesInitOrder = function (e, t) {
      var i = config.ElementSeries.getBySeries(t);
      if (!i) return -1;
      if (!i.elementSeriesOrder.length) return -1;
      if (G2.Data.seriesInitOrder.get(t) >= i.elementSeriesOrder.length) return -1;
      if (!e || !e.data) return -1;
      var n = G2.Data.seriesInitOrder.get(t);
      return (n || (n = 0), G2.Data.seriesInitOrder.set(t, n + 1), i.elementSeriesOrder[n]);
    }),
    (n.prototype._getNewOrder = function (e, t) {
      if (
        (void 0 === t && (t = !1),
        e &&
          e.data &&
          e.data.remoteData.order &&
          !e.data.remoteData.order.endTime &&
          (!e.data.remoteData.order.orderId || t) &&
          !e.data.elementType.includes(Z2.BUBBLE))
      ) {
        var i = e.data.config.elementOrderId;
        if (i) {
          if (i < 0 && !t)
            return ((e.data.remoteData.order.orderId = 0), void (e.data.remoteData.order.id = 0));
          var n = e.data.remoteData.recovery.get(yr.manualProduct),
            o = e.data.remoteData.hp.get(yr.manualProduct);
          if (!(n && o > 0 && n.value >= o)) {
            var r = this._trySeriesInitOrder(e, e.data.config.series);
            return (
              r < 0 &&
                (r = this._tryOrderBegin(i, e.data.remoteData)) < 0 &&
                (r = this._tryStableRandom(i)) < 0 &&
                (r = this._tryRandom(i, e)),
              (e.data.remoteData.order.orderId = r),
              (e.data.remoteData.order.id = r),
              r
            );
          }
        }
      }
    }),
    (n.prototype._ataiQuestionCheck = function (e) {
      var t = VW.getWorldTaskActivity();
      if (t) return !!config.WorldTaskConfig.getById(t.content).displayElementID.includes(e);
    }),
    (n.prototype._ataiQusetionUpgrade = function (e) {
      VW.upgradeElementCheck(e);
    }),
    (n.prototype._ataiQuestionNeedKill = function (e) {
      var t = VW.getWorldTaskActivity();
      if (t) return !!config.WorldTaskConfig.getById(t.content).orderElementID.includes(e);
    }),
    (n.checkNeedConfirm = function (e) {
      var t = config.ElementOrderPool.getById(e),
        i = !1;
      if (t) i = 1 == t.fillDoubleCheck;
      else {
        var n = config.ElementMultiOrderPool.getById(e);
        n && (i = 1 == n.fillDoubleCheck);
      }
      return i;
    }),
    (n.prototype.onClickElement = function (e) {
      Nge.isElementTower(e.data.config.id) && A8.Toast({ title: v.getLabel("monster_fight") });
    }),
    (n = s = o([QKe, ZKe("MergeCell/Logic/OrderElement"), BM("OrderElement")], n)));
})(xM),
  cc._RF.pop());
