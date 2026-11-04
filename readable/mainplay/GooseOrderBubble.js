// Extracted cached Cocos registration: GooseOrderBubble
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 3126583..3138701.
// Shared closure variables remain in readable/game.formatted.js:152517.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "20496PrkqFBUbEqo2U7MIkA", "GooseOrderBubble");
var PJ = cc._decorator,
  DJ = PJ.ccclass,
  BJ = PJ.property,
  LJ = (function (e) {
    function n() {
      var t = (null !== e && e.apply(this, arguments)) || this;
      return (
        (t.anim = null),
        (t.greenSign = null),
        (t.ques = null),
        (t.elementIcon = null),
        (t.numLable = null),
        (t.contentNode = null),
        (t._orderId = 0),
        (t.isStartOrder = !1),
        (t.netting = !1),
        t
      );
    }
    var s;
    return (
      t(n, e),
      (s = n),
      (n.prototype.onLoad = function () {
        (this.node.addComponent(cc.BlockInputEvents),
          u.add("refuseGooseOrder", this.onRefuse, this),
          u.add("submiteGooseOrder", this.onSubmit, this),
          u.add("removeBoardElement", this.onRemoveBoardElement, this),
          e.prototype.onLoad.call(this));
      }),
      (n.prototype.onDestroy = function () {
        (u.remove("refuseGooseOrder", this.onRefuse, this),
          u.remove("submiteGooseOrder", this.onSubmit, this),
          u.remove("removeBoardElement", this.onRemoveBoardElement, this),
          e.prototype.onDestroy.call(this));
      }),
      Object.defineProperty(n, "active", {
        set: function (e) {
          this.bubbleMap.forEach(function (t, i) {
            null != t &&
              ((t.node.active = e),
              (t.node.group = e ? yy.Default : yy.NoRender),
              e && t.orderShow());
          });
        },
        enumerable: !1,
        configurable: !0,
      }),
      (n.showBubble = function (e, t) {
        return r(this, void 0, void 0, function () {
          var i, n, o;
          return a(this, function (r) {
            switch (r.label) {
              case 0:
                return s.bubbleMap.has(e)
                  ? [2]
                  : (s.bubbleMap.set(e, null),
                    s.order2adorn.set(e, t.posId),
                    cc.isValid(s.prefab)
                      ? [3, 2]
                      : ((i = s), [4, Mi(e9.getPrefabPath("UI/GooseOrder/OrderBubble"))]));
              case 1:
                ((i.prefab = r.sent()), (r.label = 2));
              case 2:
                return (
                  (n = ot.GetPrefab(s.prefab)),
                  ((o = n.getComponent(s))._bindTarget = t.node),
                  o.show(e, t),
                  [2, o]
                );
            }
          });
        });
      }),
      (n.prototype.show = function (e, t) {
        return r(this, void 0, void 0, function () {
          return a(this, function (i) {
            return (
              (this._orderId = e),
              (this.adorn = t),
              t && t.node.isValid
                ? OQ.visitMode ||
                  GZ.instance.getHouseId() != v4.instance.houseData.getHouseIdByAdornId(t.posId)
                  ? (this.hide(null, 0, 1, !1), [2])
                  : (t.bubbleOrder != this &&
                      null != t.bubbleOrder &&
                      (t.bubbleOrder.hide(null, 0, 1, !1), (t.bubbleOrder = null)),
                    t.addGooseUi(this.node),
                    (t.bubbleOrder = this),
                    this.node.parent &&
                      this.node.setSiblingIndex(this.node.parent.childrenCount - 1),
                    this.orderShow(),
                    s.bubbleMap.set(e, this),
                    [2])
                : [2]
            );
          });
        });
      }),
      (n.jumpToOrder = function (e) {
        return r(this, void 0, void 0, function () {
          var t, i, n;
          return a(this, function (o) {
            switch (o.label) {
              case 0:
                return (t = s.bubbleMap.get(e))
                  ? (n = o9.currentScreen != J8.HOME_SCREEN)
                    ? [4, C4.show({ goScreen: J8.HOME_SCREEN })]
                    : [3, 3]
                  : [3, 4];
              case 1:
                return [4, o.sent().waitClose()];
              case 2:
                (o.sent(), (o.label = 3));
              case 3:
                return (n && u.dispatch("fadeInTarget", t.adorn.node), [3, 10]);
              case 4:
                return (i = E8.role.goose.orders.get(e)) && i.adornId
                  ? ((n = o9.currentScreen != J8.HOME_SCREEN),
                    GZ.instance.getHouseId() > 0
                      ? [4, v4.instance.houseData.gotoHouseByPlayAnim(0, !0, !0, !1, !0)]
                      : [3, 6])
                  : [3, 10];
              case 5:
                return (o.sent(), [3, 9]);
              case 6:
                return n ? [4, C4.show({ goScreen: J8.HOME_SCREEN })] : [3, 9];
              case 7:
                return [4, o.sent().waitClose()];
              case 8:
                (o.sent(), (o.label = 9));
              case 9:
                (n && u.dispatch("fadeInAdorn", i.adornId), (o.label = 10));
              case 10:
                return [2];
            }
          });
        });
      }),
      (n.prototype.submitOrder = function () {
        return r(this, void 0, void 0, function () {
          var e, t, n, o, r, s, c, l, h, p, f, g, m, y, _, b, w, C, I, T;
          return a(this, function (a) {
            switch (a.label) {
              case 0:
                if (this.netting) return [2];
                if (
                  ((this.netting = !0),
                  (e = E8.role.goose.orders.get(this._orderId)),
                  (t = e.data.orderId),
                  !e.gooseId)
                )
                  return (
                    this.hide(null),
                    (this.netting = !1),
                    A8.Toast({ title: v.getLabel("gooseOrder_orderOverTips") }),
                    [2, !1]
                  );
                if (
                  ((n = config.GooseOrder.getById(e.data.orderId)),
                  (o = []),
                  (r = []),
                  (s = 0),
                  (c = !1),
                  (l = !1),
                  n.demand.forEach(function (e, t) {
                    var i = b2.GetBoardHaveElement([parseInt(t)], e);
                    (i.forEach(function (e) {
                      o.push(e);
                      var t = G$.GetCellByIndex(e),
                        i = r3.ButterflyScoreByCell(t);
                      ((s += i.score), 1 == i.type ? (l = !0) : 2 == i.type && (c = !0));
                    }),
                    i.length < e) &&
                      b2.GetBagHaveElement([parseInt(t)], e - i.length).forEach(function (e) {
                        r.push(e);
                        var t = G2.MainBoardRemote.bag.items.get(e);
                        (t || (t = G2.MainBoardRemote.bag.mpItems.get(e)),
                          t || (t = G2.MainBoardRemote.bag.passNewItems.get(e)));
                        var i = r3.ButterflyScoreByGDCell(t);
                        ((s += i.score), 1 == i.type ? (l = !0) : 2 == i.type && (c = !0));
                      });
                  }),
                  (h = r3.CalButterflyType(l, c)),
                  !(r.length > 0))
                )
                  return [3, 4];
                ((p = 0),
                  (f = function (e) {
                    p = e ? 1 : 2;
                  }),
                  (g = b2.GetElementFromBagId(r)),
                  j_.showWindow(F3.FinishOrderTipWindow, { cb: f.bind(this), ele: g }),
                  (a.label = 1));
              case 1:
                return 0 != p ? [3, 3] : [4, S(66)];
              case 2:
                return (a.sent(), [3, 1]);
              case 3:
                if (2 == p) return ((this.netting = !1), [2]);
                a.label = 4;
              case 4:
                return (
                  EJ.SendRequestNow(),
                  [4, hm.orderSubmit({ id: e.id, indexes: o, bagItemIds: r })]
                );
              case 5:
                return (
                  (m = a.sent()),
                  (this.netting = !1),
                  m.code
                    ? (A8.Toast({ title: m.error }), [2, !1])
                    : ((y = V8.getVibrateCount(oa.diamond, o.length)) > 0 &&
                        d.emit(i.MultipleVibate, {
                          type: by.Light,
                          count: y,
                          source: "GooseOrderBubble.flyReward",
                        }),
                      b2.RemoveBoardElement(o, ar.main),
                      (_ = m.getData().rewards),
                      (b = m.getData().extraRewards),
                      (w = !1),
                      b && b.size > 0
                        ? ((this.adorn.isWaitingAD = !0),
                          [4, aT.openWindow({ reward: _, extraReward: b, way: "gooseOrder" })])
                        : [3, 10])
                );
              case 6:
                ((w = a.sent()), (a.label = 7));
              case 7:
                return aT.isShowingReward ? [4, S(66)] : [3, 9];
              case 8:
                return (a.sent(), [3, 7]);
              case 9:
                ((this.adorn.isWaitingAD = !1), (a.label = 10));
              case 10:
                return (
                  u.dispatch("checkGoose"),
                  u.dispatch("updateActPlusEnergyProgress"),
                  u.dispatch("updateActMaxEnergyProgress"),
                  u.dispatch(aI.UPDATE_ENERGY),
                  u.dispatch(f2.UPDATE_ENERGY),
                  u.dispatch(iL.REFRESH_ST_PROP),
                  d.emit(i.ActEnergyUpdate, { type: fy.CHESS_9 }),
                  K3.logEvent("submit_goose_order", { orderId: t }),
                  K3.afReport("submit_goose_order", { orderId: t }, !0),
                  E8.updateGooseOrders(),
                  (C = []),
                  (I = !1),
                  (T = ""),
                  n.reward.forEach(function (e, t) {
                    var i = new Za(),
                      n = K6.ParseItemConf(t);
                    ((i.itemId = parseInt(t)),
                      (i.itemType = n.itemType),
                      (i.value = e),
                      w && n.itemType == oa.favor
                        ? C.push(i)
                        : w ||
                          (i.itemType == oa.cardBag
                            ? (I = !0)
                            : i.itemType == oa.cardPack
                              ? (T = t)
                              : C.push(i)));
                  }),
                  I ? [4, S(500)] : [3, 15]
                );
              case 11:
                (a.sent(), (a.label = 12));
              case 12:
                return j_.isOpen(F3.CardShowWindow) ? [4, S(333)] : [3, 14];
              case 13:
                return (a.sent(), [3, 12]);
              case 14:
                return (ZS.SteppingBagRewards(_), [3, 19]);
              case 15:
                if (!T) return [3, 19];
                a.label = 16;
              case 16:
                return j_.isOpen(F3.CardShowWindow) ? [4, S(333)] : [3, 18];
              case 17:
                return (a.sent(), [3, 16]);
              case 18:
                (j_.showWindow(F3.CardShowWindow, { rewards: _, from: T }), (a.label = 19));
              case 19:
                return (this.hide(C, s, h), u.dispatch("updateHomeCarBubble"), [2, !0]);
            }
          });
        });
      }),
      (n.prototype.acceptOrder = function () {
        return r(this, void 0, void 0, function () {
          var e, t;
          return a(this, function (i) {
            switch (i.label) {
              case 0:
                return this.netting
                  ? [2]
                  : ((this.netting = !0),
                    (e = E8.role.goose.orders.get(this._orderId)),
                    [4, hm.orderSelect({ id: this._orderId, isAgree: !0 })]);
              case 1:
                return (t = i.sent()).code
                  ? (A8.Toast({ title: t.error }), (this.netting = !1), [2, !1])
                  : (K3.logEvent("accept_goose_order", { orderId: e.data.orderId }),
                    E8.updateGooseOrders(),
                    this.orderStart(),
                    (this.netting = !1),
                    [2, !0]);
            }
          });
        });
      }),
      (n.prototype.refuseOrder = function () {
        return r(this, void 0, void 0, function () {
          var e;
          return a(this, function (t) {
            switch (t.label) {
              case 0:
                return [4, hm.orderSelect({ id: this._orderId, isAgree: !1 })];
              case 1:
                return (e = t.sent()).code
                  ? (A8.Toast({ title: e.error }), [2])
                  : (this.hide(null), E8.updateGooseOrders(), [2]);
            }
          });
        });
      }),
      (n.updateState = function (e, t) {
        var i = this.bubbleMap.get(e);
        i && i.showElementIcon();
      }),
      (n.prototype.getIncomplete = function () {
        var e = E8.role.goose.orders.get(this._orderId);
        if (!e || !e.gooseId) return null;
        var t = config.GooseOrder.getById(e.data.orderId);
        if (!t) return null;
        for (var i, n, o = t.demand.entries(), r = o.next(); !r.done; r = o.next())
          if (
            ((i = r.value),
            (n = b2.GetBoardHaveElement([parseInt(i[0])], i[1]).length) != i[1] &&
              (n += b2.GetBagHaveElement([parseInt(i[0])], i[1] - n).length) < i[1])
          )
            return { id: parseInt(i[0]), num: n, demand: i[1] };
        return { id: parseInt(i[0]), num: n, demand: i[1] };
      }),
      (n.prototype.onClick = function () {
        return r(this, void 0, void 0, function () {
          var e,
            t,
            i,
            n = this;
          return a(this, function (o) {
            switch (o.label) {
              case 0:
                return OQ.editMode
                  ? (A8.Toast({ title: v.getLabel("tip_editMode") }), [2])
                  : E8.role.goose.notFirst
                    ? [3, 2]
                    : ((e = config.Config.config.gooseOrderUnlockDialog), [4, bw.talk(e)]);
              case 1:
                (o.sent(), hm.gooseOrderFirst({}), (E8.role.goose.notFirst = !0), (o.label = 2));
              case 2:
                return (
                  (t = E8.role.goose.orders.get(this._orderId)) &&
                    t.gooseId &&
                    (K3.logEvent("open_goose_order", { orderId: t.data.orderId }),
                    t.endTime > 0
                      ? j_.showWindow(F3.GooseOrderWindow, this._orderId)
                      : 0 == t.endTime &&
                        ((i = config.Goose.getById(t.gooseId)),
                        XS.talk(t.gooseId, i.gooseOrderTalk, function (e) {
                          return r(n, void 0, void 0, function () {
                            return a(this, function (t) {
                              switch (t.label) {
                                case 0:
                                  return e ? [4, this.acceptOrder()] : [3, 2];
                                case 1:
                                  return (
                                    t.sent() &&
                                      (j_.hideWindow(F3.GooseTalkWindow),
                                      j_.showWindow(F3.GooseOrderWindow, this._orderId)),
                                    [3, 3]
                                  );
                                case 2:
                                  (this.refuseOrder(),
                                    j_.hideWindow(F3.GooseTalkWindow),
                                    (t.label = 3));
                                case 3:
                                  return [2];
                              }
                            });
                          });
                        }))),
                  [2]
                );
            }
          });
        });
      }),
      (n.showOrderWindow = function (e) {
        j_.showWindow(F3.GooseOrderWindow, e);
      }),
      (n.prototype.orderShow = function () {
        return r(this, void 0, void 0, function () {
          var e,
            t = this;
          return a(this, function (i) {
            switch (i.label) {
              case 0:
                return (
                  (this.isStartOrder = !1),
                  (e = E8.role.goose.orders.get(this._orderId)) &&
                  e.endTime > 0 &&
                  e.endTime <= E8.serverTime
                    ? (this.refuseOrder(), [2])
                    : e && 0 != e.endTime
                      ? [4, this.orderStart()]
                      : [3, 2]
                );
              case 1:
                return (i.sent(), [3, 3]);
              case 2:
                ((this.ques.node.active = !0),
                  (this.elementIcon.node.active = !1),
                  this.setOrderState(!1),
                  (i.label = 3));
              case 3:
                return (
                  (function () {
                    return r(t, void 0, void 0, function () {
                      return a(this, function (e) {
                        switch (e.label) {
                          case 0:
                            return [4, rb.playAnimation(this.anim, "orderbubble_show")];
                          case 1:
                            return (
                              e.sent(),
                              rb.playAnimation(this.anim, "orderbubble_idle", cc.WrapMode.Loop),
                              [2]
                            );
                        }
                      });
                    });
                  })(),
                  [2]
                );
            }
          });
        });
      }),
      (n.prototype.orderStart = function () {
        return r(this, void 0, void 0, function () {
          return a(this, function (e) {
            switch (e.label) {
              case 0:
                return ((this.isStartOrder = !0), [4, this.showElementIcon()]);
              case 1:
                return (
                  e.sent(),
                  (this.node.active = !0),
                  (this.ques.node.active = !1),
                  (this.elementIcon.node.active = !0),
                  null != this.adorn &&
                    GZ.instance.getHouseId() !=
                      v4.instance.houseData.getHouseIdByAdornId(this.adorn.posId) &&
                    (this.node.active = !1),
                  [2]
                );
            }
          });
        });
      }),
      (n.prototype.setOrderState = function (e) {
        this.isStartOrder ? (this.greenSign.active = e) : (this.greenSign.active = !1);
      }),
      (n.prototype.hide = function (e, t, i, n) {
        return (
          void 0 === t && (t = 0),
          void 0 === i && (i = 1),
          void 0 === n && (n = !1),
          r(this, void 0, void 0, function () {
            var o;
            return a(this, function (r) {
              switch (r.label) {
                case 0:
                  return 0 == this._orderId
                    ? [2]
                    : (this.setOrderState(!1),
                      s.bubbleMap.delete(this._orderId),
                      (this._orderId = 0),
                      e
                        ? n
                          ? [3, 2]
                          : [4, rb.playAnimation(this.anim, "orderbubble_finish")]
                        : [3, 3]);
                case 1:
                  (r.sent(), (r.label = 2));
                case 2:
                  return [3, 5];
                case 3:
                  return (
                    (this.elementIcon.node.active = !1),
                    (this.ques.node.active = !1),
                    !this.node.active || n
                      ? [3, 5]
                      : [4, rb.playAnimation(this.anim, "orderbubble_hide")]
                  );
                case 4:
                  (r.sent(), (r.label = 5));
                case 5:
                  return (
                    ot.PutPrefab(this.node),
                    (o = this.adorn.usingGoose)
                      ? ((o.isOrderQuiting = !0),
                        o.forceStopUseAdorn()
                          ? (o.setPause(!0), n ? [3, 8] : [4, RJ.create()])
                          : [3, 9])
                      : [3, 10]
                  );
                case 6:
                  return [4, r.sent().orderFinish(o, e, t, i)];
                case 7:
                  (r.sent(), (r.label = 8));
                case 8:
                  (o.setPause(!1), (r.label = 9));
                case 9:
                  ((o.isOrderQuiting = !1), (r.label = 10));
                case 10:
                  return (n || this.adorn.updateBubble(), [2]);
              }
            });
          })
        );
      }),
      (n.prototype.showElementIcon = function () {
        return r(this, void 0, void 0, function () {
          var e, t;
          return a(this, function (i) {
            switch (i.label) {
              case 0:
                return (e = this.getIncomplete())
                  ? [4, Ai(this.elementIcon, e9.getElementTexturePath(e.id))]
                  : [2];
              case 1:
                return (
                  i.sent(),
                  (t = e.demand == e.num),
                  this.setOrderState(t),
                  (this.numLable.string = e.num.toString() + "/" + e.demand),
                  [2]
                );
            }
          });
        });
      }),
      (n.prototype.onRemoveBoardElement = function () {
        o9.currentScreen == J8.HOME_SCREEN && this.showElementIcon();
      }),
      (n.prototype.onRefuse = function (e) {
        e == this._orderId && this.refuseOrder();
      }),
      (n.prototype.onSubmit = function (e) {
        e == this._orderId && this.submitOrder();
      }),
      (n.getOrder = function (e) {
        return r(this, void 0, void 0, function () {
          var t, i;
          return a(this, function (n) {
            switch (n.label) {
              case 0:
                return (OQ.instance && OQ.instance.visitId) || !e.usingGoose
                  ? [2, !1]
                  : (t = this.checkOrderIdle())
                    ? ((i = e.usingGoose.gooseId),
                      [4, hm.orderRequest({ id: t.id, gooseId: i, adornId: e.posId })])
                    : [3, 2];
              case 1:
                return n.sent().code ? [2, !1] : (E8.updateGooseOrders(), [3, 3]);
              case 2:
                return [2, !1];
              case 3:
                return (e.updateBubble(), [2, !0]);
            }
          });
        });
      }),
      (n.checkOrderIdle = function () {
        if (E8.role.level < config.Config.config.gooseOrderUnlockPlayerLevel) return null;
        E8.gooseRecover.check();
        var e = 0,
          t = null;
        return (
          E8.role.goose.orders.forEach(function (i) {
            i.gooseId ? (e += 1) : t || (t = i);
          }),
          E8.gooseRecover.value <= e || null == t ? null : t
        );
      }),
      (n.bubbleMap = new Map()),
      (n.order2adorn = new Map()),
      o([BJ(cc.Animation)], n.prototype, "anim", void 0),
      o([BJ(cc.Node)], n.prototype, "greenSign", void 0),
      o([BJ(cc.Sprite)], n.prototype, "ques", void 0),
      o([BJ(cc.Sprite)], n.prototype, "elementIcon", void 0),
      o([BJ(cc.Label)], n.prototype, "numLable", void 0),
      o([BJ(cc.Node)], n.prototype, "contentNode", void 0),
      (n = s = o([DJ], n))
    );
  })(CT);
cc._RF.pop();
