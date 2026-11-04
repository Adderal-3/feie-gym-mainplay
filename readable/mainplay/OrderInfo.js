// Extracted cached Cocos registration: OrderInfo
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 2663088..2685951.
// Shared closure variables remain in readable/game.formatted.js:129470.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "cad14mVh+pP/4vrnxhb/mhK", "OrderInfo");
var Lz = cc._decorator,
  Nz = Lz.ccclass,
  Oz = Lz.property,
  xz = (function (e) {
    function n() {
      var t = (null !== e && e.apply(this, arguments)) || this;
      return (
        (t.orderList = null),
        (t.orderGooseList = null),
        (t.orderContent = null),
        (t.orderCustom = null),
        (t.btn_task = null),
        (t.node_eventTip = null),
        (t.scroll = null),
        (t.oiiRegister = null),
        (t.node_block = null),
        (t.node_scrollEnable = null),
        (t._orderInfoItems = []),
        (t._eventTimer = null),
        (t._eventTimerLabel = null),
        (t._binderData = []),
        (t._scrollLocate = null),
        (t._orderCustomRefreshers = new Map()),
        (t.refreshWaitTask = null),
        (t.showingDrawerReward = !1),
        (t._data = null),
        (t.hideOrderNum = 0),
        (t._curLevel = 0),
        (t._lastProgress = 0),
        (t._curEventTween = null),
        t
      );
    }
    var s;
    return (
      t(n, e),
      (s = n),
      (n.prototype.onLoad = function () {
        var e = this;
        (this.btn_task.on("click", this.onClickTask, this),
          this.btn_task.getChildByName("GoBtn").on("click", this.onClickTask, this),
          (this.btn_task.getChildByName("starLabel").getComponent(cc.Label).string =
            "" + E8.role.star),
          this.node_eventTip.on("click", this.onClickEvent, this),
          u.add(
            "updateOrderInfo",
            function () {
              e.data && e.setDisplay(!0);
            },
            this,
          ),
          u.add("updateOrderStar", this.updateBuildStar, this),
          u.add("addOrderStar", this.addBuildStar, this),
          u.add("updatePreOrder", this.updatePreOrder, this),
          u.add("onPaySuc", this.onPayRefresh, this),
          u.add("onUpdate", this.reset, this),
          u.add("guideScroll", this.guideScroll, this),
          u.add("initGuideScroll", this.setScrollHorizontal, this),
          u.add("ScrollOrderInfoToLeft", this.scrollToLeft, this),
          u.add("boardGiftUpdate", this.mastCanScroll, this),
          this.oiiRegister.init(),
          (this._scrollLocate = new Bz(this)));
      }),
      (n.prototype.onFinishEnterBoard = function (e) {
        var t;
        e.boardType == ar.main &&
          (null === (t = G2.Data.orderDrawerNeedAutoReward) || void 0 === t ? void 0 : t.size) &&
          (G2.Data.orderDrawerNeedAutoReward.forEach(function (e, t) {
            fj.needAutoRewardDrawerArr.push({ id: t, immediate: !0 });
          }),
          G2.Data.orderDrawerNeedAutoReward.clear(),
          this.tryTriggerDrawerAutoReward(-fj.needAutoRewardDrawerArr[0].id));
      }),
      (n.prototype.tryTriggerDrawerAutoReward = function (e) {
        return r(this, void 0, void 0, function () {
          var t,
            i,
            n = this;
          return a(this, function (o) {
            switch (o.label) {
              case 0:
                return e >= 0 ||
                  this.showingDrawerReward ||
                  uJ.praseOrderType(e, 0) != sJ.DRAWER_REWARD
                  ? [2]
                  : ((this.showingDrawerReward = !0),
                    (t = config.OrderSeries.getById(-e)),
                    (i = function () {
                      return r(n, void 0, void 0, function () {
                        return a(this, function (t) {
                          switch (t.label) {
                            case 0:
                              return [4, S(500)];
                            case 1:
                              return (
                                t.sent(),
                                !fj.needAutoRewardDrawerArr.find(function (t) {
                                  return t.id == -e;
                                }) && fj.needAutoRewardDrawerArr.push({ id: -e, immediate: !0 }),
                                o8.isRunning() || j_.currentWindow > 0
                                  ? ((this.showingDrawerReward = !1), [2])
                                  : ((kz.refreshScroll = !0),
                                    j_.showWindow(F3.OrderDrawerWindow),
                                    [2])
                              );
                          }
                        });
                      });
                    }),
                    t ? (j_.pausePopup("OrderInfoDrawerReward"), [4, i()]) : [3, 2]);
              case 1:
                (o.sent(), j_.resumePopup("OrderInfoDrawerReward"), (o.label = 2));
              case 2:
                return ((this.showingDrawerReward = !1), [2]);
            }
          });
        });
      }),
      (n.prototype.addOrderInfoItem = function (e) {
        (this._orderInfoItems.push(e), e.onInit());
      }),
      (n.prototype.addOrderList = function (e) {
        e.parent = this.orderContent.node;
      }),
      (n.prototype.addOrderCustom = function (e, t) {
        ((e.parent = this.orderCustom.node),
          t ? this._orderCustomRefreshers.set(e, t) : this._orderCustomRefreshers.delete(e));
      }),
      (n.prototype.clearOrderCustom = function () {
        var e,
          t = Array.from(this.orderCustom.node.children);
        t.forEach(function (e) {
          return (e.active = !1);
        });
        for (var i = 0, n = t.length; i < n; i++)
          null === (e = this._orderCustomRefreshers.get(t[i])) || void 0 === e || e();
      }),
      (n.prototype.onDisable = function () {
        (this._eventTimer && this._eventTimer.dispose(),
          this._orderInfoItems.forEach(function (e) {
            return e.onHide();
          }),
          this.clearBinder());
      }),
      (n.prototype.onPayRefresh = function () {
        (this._orderInfoItems.forEach(function (e) {
          return e.onPaySucc();
        }),
          this.updateBuildStar());
      }),
      (n.prototype.addBinder = function (e, t, i) {
        for (var n = 0; n < this._binderData.length; n++) {
          var o = this._binderData[n];
          if (o.source == e && o.prop == t) return;
        }
        (this._binderData.push({ source: e, prop: t, cb: i }), zC.create(e, t, this, i, !1));
      }),
      (n.prototype.reset = function () {
        var e = this,
          t = this._binderData;
        (this.clearBinder(),
          t.forEach(function (t) {
            e.addBinder(t.source, t.prop, t.cb);
          }),
          this.setDisplay());
      }),
      (n.prototype.clearBinder = function () {
        (this._binderData.length &&
          this._binderData.forEach(function (e, t) {
            zC.remove(e.source, e.prop);
          }),
          (this._binderData = []));
      }),
      Object.defineProperty(n.prototype, "data", {
        get: function () {
          return this._data;
        },
        set: function (e) {
          ((this._data = e), this.setDisplay());
        },
        enumerable: !1,
        configurable: !0,
      }),
      (n.prototype.setDisplay = function (e) {
        return (
          void 0 === e && (e = !1),
          r(this, void 0, void 0, function () {
            return a(this, function (t) {
              switch (t.label) {
                case 0:
                  return o9.currentScreen == J8.MERGE_SCREEN && this.data
                    ? ((this.scroll.horizontal = !0),
                      (this.orderList.node.active = !1),
                      (this.orderGooseList.node.active = !1),
                      (this.node_eventTip.active = !1),
                      this._eventTimer && this._eventTimer.dispose(),
                      (s.inited = !1),
                      [4, this.oiiRegister.check()])
                    : ((Tq.firstShowOrder = !0), [2]);
                case 1:
                  return (
                    t.sent(),
                    (Tq.firstShowOrder = !0),
                    (s.inited = !0),
                    this.clearOrderCustom(),
                    this._showMainInfo(),
                    this._showEventInfo(),
                    e && this.show(),
                    u.dispatch("refreshTimeLimitGift"),
                    e ? [3, 3] : [4, O_.Frames(10)]
                  );
                case 2:
                  (t.sent(), this._scrollLocate.onEnterBoardLocate(), (t.label = 3));
                case 3:
                  return [2];
              }
            });
          })
        );
      }),
      (n.prototype.captureOrderDemandSnapshot = function () {
        for (var e = this.collectOrderDemandViews(), t = [], i = 0, n = e.length; i < n; i++) {
          var o = e[i],
            r = o.demandItems;
          if (r.length) {
            for (var a = [], s = 0, c = r.length; s < c; s++) a.push(r[s].data.id);
            t.push({ orderKey: o.orderKey, elementIds: a });
          }
        }
        return t;
      }),
      (n.prototype.refreshWithDemandChangeEffect = function (e, t, i) {
        var n;
        return (
          void 0 === i && (i = "idle"),
          r(this, void 0, void 0, function () {
            var o, r, s, c, l, d, u;
            return a(this, function (a) {
              switch (a.label) {
                case 0:
                  return ((o = t ? mi(cc.Prefab, t) : null), [4, this.setDisplay(!0)]);
                case 1:
                  return (a.sent(), [4, O_.Frames(1)]);
                case 2:
                  if (
                    (a.sent(),
                    !(null == e ? void 0 : e.length) ||
                      o9.currentScreen != J8.MERGE_SCREEN ||
                      G2.MergeBoardType != ar.main ||
                      !(null === (n = this.node) || void 0 === n ? void 0 : n.activeInHierarchy))
                  )
                    return [2];
                  if (!(r = this.getDemandChangeTargets(e)).length || !o) return [2];
                  ((s = null), (a.label = 3));
                case 3:
                  return (a.trys.push([3, 5, , 6]), [4, o]);
                case 4:
                  return ((s = a.sent()), [3, 6]);
                case 5:
                  return (
                    (c = a.sent()),
                    h.warn("[OrderInfo] Load demand change effect failed", t, c),
                    [3, 6]
                  );
                case 6:
                  if (!s) return [2];
                  for (l = [], d = 0, u = r.length; d < u; d++)
                    l.push(r[d].demandItem.waitIconLoaded());
                  return [4, Promise.all(l)];
                case 7:
                  for (a.sent(), d = 0, u = r.length; d < u; d++)
                    this.playDemandChangeEffect(r[d], s, i);
                  return [2];
              }
            });
          })
        );
      }),
      (n.prototype.collectOrderDemandViews = function () {
        var e,
          t,
          i,
          n = [],
          o =
            null === (t = null === (e = this.orderList) || void 0 === e ? void 0 : e.node) ||
            void 0 === t
              ? void 0
              : t.children;
        if (!o) return n;
        for (var r = 0, a = o.length; r < a; r++) {
          var s = o[r].getComponent(HF),
            c = this.getOrderDemandKey(s);
          if (
            c &&
            (null === (i = s.layout_demandParent) || void 0 === i ? void 0 : i.activeInHierarchy)
          ) {
            for (var l = [], d = s.layout_demandParent.children, u = 0, h = d.length; u < h; u++) {
              var p = d[u].getComponent(BF);
              (null == p ? void 0 : p.data) && p.node.activeInHierarchy && l.push(p);
            }
            n.push({ orderKey: c, demandItems: l });
          }
        }
        return n;
      }),
      (n.prototype.getOrderDemandKey = function (e) {
        var t = null == e ? void 0 : e.data;
        return t && null != t.id && null != t.orderId ? t.id + "_" + t.orderId : "";
      }),
      (n.prototype.getDemandChangeTargets = function (e) {
        for (var t = new Map(), i = 0, n = e.length; i < n; i++) {
          var o = e[i];
          t.set(o.orderKey, o.elementIds);
        }
        var r = [],
          a = this.collectOrderDemandViews();
        for (i = 0, n = a.length; i < n; i++) {
          var s = a[i],
            c = t.get(s.orderKey);
          if (c) {
            for (var l = new Map(), d = 0, u = c.length; d < u; d++) {
              var h = c[d];
              l.set(h, (l.get(h) || 0) + 1);
            }
            var p = s.demandItems;
            for (d = 0, u = p.length; d < u; d++) {
              var f = p[d],
                g = ((h = f.data.id), l.get(h) || 0);
              g > 0
                ? l.set(h, g - 1)
                : r.push({ orderKey: s.orderKey, elementId: h, demandItem: f });
            }
          }
        }
        return r;
      }),
      (n.prototype.playDemandChangeEffect = function (e, t, i) {
        var n, o, s;
        return r(this, void 0, void 0, function () {
          var r, c, l, d, u, p, f, g;
          return a(this, function (a) {
            switch (a.label) {
              case 0:
                if (
                  ((r = e.demandItem),
                  (c =
                    null === (n = null == r ? void 0 : r.data) || void 0 === n ? void 0 : n.order),
                  (l =
                    null === (o = null == r ? void 0 : r.sprite_icon) || void 0 === o
                      ? void 0
                      : o.node),
                  (d = Ne.getLayer(Be.FACEUI)),
                  !(
                    (null === (s = null == r ? void 0 : r.node) || void 0 === s
                      ? void 0
                      : s.isValid) &&
                    r.node.activeInHierarchy &&
                    r.data.id == e.elementId &&
                    this.getOrderDemandKey(c) == e.orderKey &&
                    (null == l ? void 0 : l.isValid) &&
                    (null == d ? void 0 : d.isValid)
                  ))
                )
                  return [2];
                if (
                  ((u = l.convertToWorldSpaceAR(cc.Vec2.ZERO)),
                  ((p = cc.instantiate(t)).parent = d),
                  p.setPosition(d.convertToNodeSpaceAR(u)),
                  (p.active = !0),
                  p.setSiblingIndex(d.children.length - 1),
                  !(f = p.getComponent(sp.Skeleton) || p.getComponentInChildren(sp.Skeleton)) ||
                    !f.findAnimation(i))
                )
                  return (
                    h.warn("[OrderInfo] Invalid demand change Spine effect", i),
                    p.destroy(),
                    [2]
                  );
                a.label = 1;
              case 1:
                return (a.trys.push([1, 3, 4, 5]), [4, ib.playAnimationNew(f, i, !1, !0)]);
              case 2:
                return (a.sent(), [3, 5]);
              case 3:
                return (
                  (g = a.sent()),
                  h.warn("[OrderInfo] Play demand change Spine effect failed", i, g),
                  [3, 5]
                );
              case 4:
                return ((null == p ? void 0 : p.isValid) && p.destroy(), [7]);
              case 5:
                return [2];
            }
          });
        });
      }),
      (n.prototype.mastCanScroll = function () {
        return r(this, void 0, void 0, function () {
          var e, t, i, n;
          return a(this, function (o) {
            switch (o.label) {
              case 0:
                return (
                  (e = this.scroll.node.children[0]),
                  (t = this.scroll.content),
                  (i = e.width - t.width),
                  (n = 112 * TI.instance.GetShowGiftNum()) > 0 &&
                    G2.MergeBoardType === ar.main &&
                    (n -= 88),
                  (this.node_scrollEnable.width = i > 0 ? Math.max(i + 50, n) : n),
                  this.scroll.content.getComponent(cc.Layout).updateLayout(),
                  [4, O_.Frames(1)]
                );
              case 1:
                return (o.sent(), [2]);
            }
          });
        });
      }),
      (n.prototype.show = function () {
        return r(this, void 0, void 0, function () {
          return a(this, function (e) {
            switch (e.label) {
              case 0:
                return s.inited ? [3, 2] : [4, S(60)];
              case 1:
                return (e.sent(), [3, 0]);
              case 2:
                return (
                  h.log("OII nums: " + this._orderInfoItems.length),
                  this._orderInfoItems.forEach(function (e) {
                    return e.setDisplay();
                  }),
                  this.oiiRegister.node.getComponent(cc.Layout).updateLayout(),
                  [4, S(100)]
                );
              case 3:
                return (e.sent(), [4, this.mastCanScroll()]);
              case 4:
                return (e.sent(), u.dispatch("onMergeTopEnd"), [2]);
            }
          });
        });
      }),
      (n.prototype._showMainInfo = function (e) {
        if ((void 0 === e && (e = null), G2.MergeBoardType == ar.main)) {
          ((s.touchPause = !0),
            e && e.resetSelectAnim && e3.RemoveAnims([TC.SELECTED_ORDER, TC.SELECTED_TIME_ORDER]),
            (s.needElements = new Map()));
          var t = this.getCurGDOrders();
          this.orderList.node.active = !0;
          var n = this.orderList.getComponent(cc.Layout);
          (n && (n.enabled = !0),
            this.orderList.node.children.forEach(function (e) {
              var t = e.getComponent(HF);
              t && t.clear();
            }),
            (this.orderList.data = t),
            (this.btn_task.active = !0),
            j_.hideWindow(F3.FinishOrderTipWindow, !0),
            j_.hideWindow(F3.OrderExtraRewardSecondCheckWindow, !0),
            u.dispatch("updateOrderStar"),
            this._showGooseOrderInfo(),
            z3.checkNeedFormatChannel(),
            z3.checkNeedFormatBoard(),
            d.emit(i.RefreshBagOrder),
            (s.touchPause = !1));
        }
      }),
      (n.prototype._showEventInfo = function () {
        return r(this, void 0, void 0, function () {
          var e,
            t,
            i,
            n,
            o,
            s,
            c,
            l = this;
          return a(this, function (d) {
            switch (d.label) {
              case 0:
                return G2.MergeBoardType != ar.number &&
                  G2.MergeBoardType != ar.beach &&
                  G2.MergeBoardType != ar.ornament
                  ? [2]
                  : ((this.node_eventTip.active = !0),
                    (e = this.node_eventTip.getChildByName("orderbg")),
                    (t = 0),
                    E8.role.activity.boards.forEach(function (e, i) {
                      0 == t && e.boardId == G2.Data.id && (t = i);
                    }),
                    t
                      ? ((i = config.Activity.getById(t)),
                        Ai(e.getComponent(cc.Sprite), "Texture/UI/MainBoard/" + i.progressBar),
                        (n = b2.GetEventData()),
                        u.add("updateEventStar", this.updateEventStar, this),
                        this.updateEventStar(),
                        (o = E8.role.activity.boards.get(n.eventData.activityType)),
                        (s = cc.find("time/label_time", e).getComponent(cc.Label)),
                        (c = (o.endTime - E8.serverTime) / 1e3) > 0.2
                          ? ((s.string = j(c, !1, !0, 2)),
                            (this._eventTimerLabel = s),
                            (this._eventTimer = b.addClock("eventTip", c, 1e3, 1)),
                            this._eventTimer.registCallBack(
                              this,
                              function (e) {
                                return r(l, void 0, void 0, function () {
                                  return a(this, function (e) {
                                    switch (e.label) {
                                      case 0:
                                        return (EJ.SendRequestNow(), [4, C4.view.waitClose()]);
                                      case 1:
                                        return (
                                          e.sent(),
                                          tw.isShowReload ||
                                            C4.isShow ||
                                            C4.show({ goScreen: J8.HOME_SCREEN }),
                                          [2]
                                        );
                                    }
                                  });
                                });
                              },
                              function (e) {
                                l._eventTimerLabel.string = j(e.leftSecond, !1, !0, 2);
                              },
                            ),
                            [3, 3])
                          : [3, 1])
                      : [2]);
              case 1:
                return ((s.string = v.getLabel("common_end")), [4, C4.view.waitClose()]);
              case 2:
                return (d.sent(), C4.show({ goScreen: J8.HOME_SCREEN }), [2]);
              case 3:
                return (u.dispatch("updateOrderStar"), [2]);
            }
          });
        });
      }),
      (n.prototype._showGooseOrderInfo = function () {
        var e = [];
        (E8.role.goose.orders.forEach(function (t) {
          if (
            !(t.id <= 0 || t.endTime <= E8.serverTime) &&
            config.GooseOrder.getById(t.data.orderId)
          ) {
            var i = new Zc();
            ((i.id = sJ.GOOSE),
              (i.orderId = t.id),
              (i.endTime = t.endTime),
              (i.gooseId = t.gooseId),
              e.push(i));
          }
        }),
          (this.orderGooseList.node.active = e.length > 0),
          (this.orderGooseList.data = e));
      }),
      (n.prototype._getPreOrder = function () {
        var e = this,
          t = new Zc(),
          i = !1,
          n = 99999,
          o = 0;
        if (
          (UT.getOrderConfList().forEach(function (e, t) {
            if (e.level > 0 && e.level < n) {
              for (var r = 0, a = 0; a < e.unlock.length; a++) {
                var s = e.unlock[a],
                  c = s.match(/[A-Za-z]*/)[0],
                  l = s.match(/[0-9]\d*/)[0];
                if ("Timestamp" == c) {
                  r = parseInt(l);
                  break;
                }
              }
              if (E8.role.level >= e.level && (!r || E8.serverTime >= 1e3 * r)) return;
              if (r > 0 && E8.serverTime < 1e3 * r) return void (o = r);
              ((n = e.level), (i = !0));
            }
          }),
          o > 0)
        ) {
          var s = o - E8.serverTime / 1e3;
          if (s > 0.2)
            (h.warn("添加预告订单倒计时", s),
              b.addClock("preorderTimer", s).registCallBack(
                this,
                function () {
                  return r(e, void 0, void 0, function () {
                    return a(this, function (e) {
                      switch (e.label) {
                        case 0:
                          return [4, S(1e4)];
                        case 1:
                          return (e.sent(), [4, hm.refreshOrder({})]);
                        case 2:
                          return (
                            e.sent(),
                            G2.RefreshBoardCache(),
                            u.dispatch("updateOrderInfo"),
                            [2]
                          );
                      }
                    });
                  });
                },
                null,
              ));
        }
        return i ? ((t.id = 0), (t.orderId = n), t) : null;
      }),
      (n.prototype.refresh = function (e, t, i, n, o, c) {
        var l;
        return (
          void 0 === e && (e = !1),
          void 0 === t && (t = !1),
          void 0 === i && (i = "order"),
          void 0 === n && (n = 0),
          void 0 === o && (o = ""),
          void 0 === c && (c = !1),
          r(this, void 0, void 0, function () {
            var d,
              u,
              h,
              p,
              f,
              g,
              v,
              m,
              y,
              _ = this;
            return a(this, function (b) {
              switch (b.label) {
                case 0:
                  if (!this.refreshWaitTask) return [3, 4];
                  b.label = 1;
                case 1:
                  return this.refreshWaitTask
                    ? [4, this.refreshWaitTask.catch(function () {})]
                    : [3, 3];
                case 2:
                  return (b.sent(), [3, 1]);
                case 3:
                  if (!cc.isValid(this.node)) return [2];
                  b.label = 4;
                case 4:
                  return s.touchPause
                    ? [2]
                    : ((d = this.orderList).node.active ||
                        ((u = !1),
                        this._orderInfoItems.forEach(function (e) {
                          e.orderList &&
                            e.orderList.node.active &&
                            !u &&
                            (e.orderList.node.name == o && (u = !0),
                            (d = e.orderList),
                            e.orderItem);
                        })),
                      (h = Array.from(d.node.children)),
                      s.finishing ||
                        (uJ.sortOrderList(h),
                        h.forEach(function (e, t) {
                          e.zIndex = t;
                        })),
                      e ? [4, S(100)] : [3, 12]);
                case 5:
                  return (b.sent(), C4.view.isOpen ? [4, C4.view.waitClose()] : [3, 7]);
                case 6:
                  (b.sent(), (b.label = 7));
                case 7:
                  if (!this.refreshWaitTask) return [3, 11];
                  b.label = 8;
                case 8:
                  return this.refreshWaitTask
                    ? [4, this.refreshWaitTask.catch(function () {})]
                    : [3, 10];
                case 9:
                  return (b.sent(), [3, 8]);
                case 10:
                  if (!cc.isValid(this.node)) return [2];
                  b.label = 11;
                case 11:
                  if (!o8.isRunning())
                    if ("goose" == i)
                      for (
                        p = Array.from(this.orderGooseList.node.children), g = 0, v = p.length;
                        g < v;
                        g++
                      )
                        (null == (m = p[g].getComponent(HF)) ? void 0 : m.orderType) == sJ.GOOSE &&
                          m.data.orderId == n &&
                          p[g].activeInHierarchy &&
                          this._scrollLocate.onLocateToOrder(p[g].x, this.orderGooseList.node.x);
                    else
                      for (f = this.orderList.node.x, g = 0, v = h.length; g < v; g++)
                        (null == (m = null) && (m = h[g].getComponent(HF)),
                          null == m && d.node && d.node.parent && (f = d.node.parent.x),
                          null == m && (m = h[g].getComponent(Iz)),
                          null == m && (m = h[g].getComponent(uz)),
                          null == m && (m = h[g].getComponent(Qj)),
                          null == m && (m = h[g].getComponent(gz)),
                          m &&
                            n &&
                            (m.data.orderId == n ||
                              (null === (l = m.data.order) || void 0 === l ? void 0 : l.orderId) ==
                                n ||
                              m.data.id == n) &&
                            (this._scrollLocate.onLocateToOrder(h[g].x, f),
                            c &&
                              ((y = function (e) {
                                return r(_, void 0, void 0, function () {
                                  var t, i;
                                  return a(this, function (n) {
                                    switch (n.label) {
                                      case 0:
                                        return ((t = e), [4, S(700)]);
                                      case 1:
                                        return (
                                          n.sent(),
                                          (i = t.getComponentInChildren(cc.Button)) &&
                                            (i.interactable = !0),
                                          [2]
                                        );
                                    }
                                  });
                                });
                              }),
                              (function (e) {
                                return r(_, void 0, void 0, function () {
                                  var t, i;
                                  return a(this, function (n) {
                                    return (
                                      (i = (t = e).getComponentInChildren(cc.Button)) &&
                                        (i.interactable = !1),
                                      (t.scale = 0.1),
                                      cc
                                        .tween(t)
                                        .to(0.33, { scale: 1.2 }, { easing: "quadOut" })
                                        .to(0.166, { scale: 1 }, { easing: "quadIn" })
                                        .start(),
                                      [2]
                                    );
                                  });
                                });
                              })(m.node),
                              y(m.node))));
                  b.label = 12;
                case 12:
                  return (
                    t &&
                      d.node.children.forEach(function (e) {
                        var t = e.getComponent(HF).data;
                        e.getComponent(HF).data = t;
                      }),
                    [2]
                  );
              }
            });
          })
        );
      }),
      (n.prototype.guideScroll = function (e) {
        return r(this, void 0, void 0, function () {
          return a(this, function (t) {
            return (
              G2.MergeBoardType != ar.main ||
                (e > 0 && (this.scroll.scrollToOffset(cc.v2(e, 0)), (this.scroll.horizontal = !1))),
              [2]
            );
          });
        });
      }),
      (n.prototype.scrollToLeft = function () {
        this.scroll.scrollToOffset(cc.v2(0, 0), 0.3);
      }),
      (n.prototype.setScrollHorizontal = function (e) {
        (void 0 === e && (e = !0), (this.scroll.horizontal = e));
      }),
      (n.prototype.getCurGDOrders = function () {
        return uJ.getAllOrders();
      }),
      (n.prototype.finish = function (e, t) {
        var i, n;
        return (
          void 0 === t && (t = !1),
          r(this, void 0, void 0, function () {
            var o, r, s, c, l, d, h, p;
            return a(this, function (a) {
              switch (a.label) {
                case 0:
                  return (
                    (o =
                      e &&
                      WT.checkOrderHideOrderGroup(
                        null === (i = e.data) || void 0 === i ? void 0 : i.orderId,
                      )),
                    (r = null == e ? void 0 : e.consumeSystemOrderExtraRefresh()),
                    (s = this.orderList.getComponent(cc.Layout)),
                    (c = G2.channelSize),
                    t &&
                      1 == c &&
                      (((l = this.orderList.node.parent.getComponent(cc.Layout)).enabled = !1),
                      cc
                        .tween(this.orderList.node)
                        .by(0.3, { x: 130 }, { easing: "quadOut" })
                        .call(function () {
                          l.enabled = !0;
                        })
                        .start()),
                    (s.enabled = !1),
                    e ? (this.hideOrderNum++, [4, this.orderList.animHideOrders(e)]) : [3, 2]
                  );
                case 1:
                  (a.sent(), this.hideOrderNum--, (a.label = 2));
                case 2:
                  return [4, this.addNewOrder()];
                case 3:
                  if ((a.sent(), r))
                    for (d = this.orderList.node.children, h = 0, p = d.length; h < p; h++)
                      null === (n = d[h].getComponent(HF)) ||
                        void 0 === n ||
                        n.renderOrderExtraBubble();
                  return (o && u.dispatch("updateOrderInfo"), (s.enabled = !0), [2]);
              }
            });
          })
        );
      }),
      (n.prototype.addNewOrder = function () {
        return r(this, void 0, void 0, function () {
          var e, t, i, n, o, r, c;
          return a(this, function (a) {
            switch (a.label) {
              case 0:
                return this.hideOrderNum > 0 ? [4, S(100)] : [3, 2];
              case 1:
                return (a.sent(), [3, 0]);
              case 2:
                for (
                  e = new Map(),
                    this.orderList.node.children.forEach(function (t) {
                      var i = t.getComponent(HF),
                        n = i.orderType + "_" + i.data.id + "_" + i.data.orderId;
                      e.set(n, !0);
                    }),
                    UT.refreshDrawerData(),
                    t = [],
                    i = this.getCurGDOrders(),
                    n = 0;
                  n < i.length;
                  n++
                )
                  ((o = i[n]),
                    (r = uJ.praseOrderType(o.id, o.orderId)),
                    (c = r + "_" + o.id + "_" + o.orderId),
                    e.has(c) || (t.push(o), this.tryTriggerDrawerAutoReward(o.id)));
                return (
                  h.log("[OrderInfo] 新订单: ", t),
                  [
                    4,
                    this.orderList.animAddOrders(t, function (e) {
                      uJ.sortOrderList(e);
                    }),
                  ]
                );
              case 3:
                return (
                  a.sent(),
                  (s.finishing = !1),
                  u.dispatch("newElementCreate"),
                  this._scrollLocate.onFinishOrderLocate(),
                  [2]
                );
            }
          });
        });
      }),
      (n.prototype.onClickTask = function () {
        s.touchPause || j_.showWindow(F3.BuildWindow);
      }),
      (n.prototype.onClickEvent = function () {
        s.touchPause || j_.showWindow(F3.EventTaskWindow);
      }),
      (n.prototype.onClickElementInfo = function (e) {
        var t = parseInt(e.node.name.split("_")[1]);
        b2.ShowElementDetail(t, e.node, !0);
      }),
      (n.prototype.updatePreOrder = function () {
        return r(this, void 0, void 0, function () {
          var e = this;
          return a(this, function (t) {
            switch (t.label) {
              case 0:
                return o9.currentScreen != J8.MERGE_SCREEN
                  ? [2]
                  : (this.orderList.data.forEach(function (t, i) {
                      if (t.id <= 0 && t.orderId > 0 && E8.role.level >= t.orderId) {
                        ee(e.orderList.data, t);
                        var n = e._getPreOrder();
                        (n && e.orderList.data.push(n), (e.orderList.data = e.orderList.data));
                      }
                    }),
                    [4, S(33)]);
              case 1:
                return (t.sent(), this.finish(null), [2]);
            }
          });
        });
      }),
      (n.prototype.updateBuildStar = function () {
        this.btn_task.getChildByName("starLabel").getComponent(cc.Label).string = "" + E8.role.star;
        var e = this.btn_task.getChildByName("spine").getComponent(sp.Skeleton),
          t = this.btn_task.getChildByName("GoBtn");
        this.isAnyBuildAvailable()
          ? (ib.playAnimation(e, "build", !0), (t.active = !0))
          : (ib.playAnimation(e, "idle", !0), (t.active = !1));
      }),
      (n.prototype.addBuildStar = function () {
        return r(this, void 0, void 0, function () {
          var e, t;
          return a(this, function (i) {
            switch (i.label) {
              case 0:
                return (
                  (e = this.btn_task.getChildByName("spine").getComponent(sp.Skeleton)),
                  (t = this.btn_task.getChildByName("GoBtn")),
                  this.isAnyBuildAvailable()
                    ? (t.active ||
                        (j8.play(o_.TIP_ORDER),
                        (t.active = !0),
                        rb.playAnimation(t.getComponent(cc.Animation))),
                      [4, ib.playAnimation(e, "task2", !1)])
                    : [3, 2]
                );
              case 1:
                return (i.sent(), [3, 4]);
              case 2:
                return ((t.active = !1), [4, ib.playAnimation(e, "task", !1)]);
              case 3:
                (i.sent(), (i.label = 4));
              case 4:
                return (u.dispatch("updateOrderStar"), [2]);
            }
          });
        });
      }),
      (n.prototype.isAnyBuildAvailable = function () {
        return this.isBuildAvailable(!0) || this.isBuildAvailable(!1);
      }),
      (n.prototype.isBuildAvailable = function (e) {
        var t = v4.instance.houseData;
        if (!t.isCanBuild(e)) return !1;
        var i = E8.role.star,
          n = !1;
        return (
          t.getBuildData(e).builds.forEach(function (e) {
            var t;
            if (!n && 1 != e.state) {
              var o = q6.instance.getBuildInfo(e.id),
                r =
                  null === (t = null == o ? void 0 : o.demand) || void 0 === t
                    ? void 0
                    : t.get("Star");
              null == r || i < r || ET.isBuildUnlockLocked(e.id) || (n = !0);
            }
          }),
          n
        );
      }),
      (n.prototype.updateEventStar = function () {
        var e = this,
          t = b2.GetEventData();
        if (t.eventData) {
          var i = this.node_eventTip.getChildByName("orderbg"),
            n = E8.role.activity.boards.get(t.eventData.activityType);
          cc.find("progress/updateEventStar/levelnum", i).getComponent(cc.Label).string =
            "" + n.level;
          var o = cc.find("progress/levelexp", i).getComponent(cc.Label),
            r = cc.find("progress/progressbg/bar", i),
            a = n.level - this._curLevel,
            s = this._curLevel;
          this._curLevel = n.level;
          var c = cc.tween(r),
            l = "",
            d = 0,
            u = 0,
            h = b2.GetEventConfig(t.eventData.activityType, t.eventData.level + 1);
          if (h) {
            var p =
                h.activityExp -
                (m = b2.GetEventConfig(t.eventData.activityType, t.eventData.level).activityExp),
              f = Math.min(t.eventData.levelExp, p);
            ((l = f + "/" + p), (d = (f / p) * 230), (u = p));
          } else {
            var g = b2.GetEventConfig(t.eventData.activityType, t.eventData.level),
              v = b2.GetEventConfig(t.eventData.activityType, t.eventData.level - 1),
              m = g.activityExp,
              _ = v.activityExp;
            ((l = (p = m - _) + "/" + p), (d = 230), (u = p));
          }
          if (
            (this._lastProgress && (r.width = this._lastProgress),
            (this._lastProgress = d),
            this._curEventTween && this._curEventTween.stop(),
            s)
          ) {
            for (var b = 0; b < a; b++)
              c.then(
                cc
                  .tween(r)
                  .to(
                    0.3,
                    { width: 230 },
                    {
                      easing: "linear",
                      onUpdate: function () {
                        var e = r.width / 230,
                          t = Math.floor(e * u);
                        o.string = t + "/" + u;
                      },
                    },
                  )
                  .set({ width: 0 }),
              );
            (c.then(
              cc
                .tween(r)
                .to(
                  0.4,
                  { width: d },
                  {
                    easing: "linear",
                    onUpdate: function () {
                      var e = r.width / 230,
                        t = Math.floor(e * u);
                      o.string = t + "/" + u;
                    },
                  },
                )
                .call(function () {
                  ((r.width = d), (o.string = l));
                }),
            ),
              (this._curEventTween = c),
              c.start());
          } else ((r.width = d), (o.string = l));
          var w = cc.find("nextreward/list", i),
            C = cc.find("nextreward/item", i),
            I = cc.find("nextreward/label_max", i);
          (Array.from(w.children).forEach(function (e) {
            return ot.PutPrefab(e);
          }),
            (I.active = !h));
          var S = t.type;
          if (h) {
            var T = h[S],
              E = [];
            (T.forEach(function (e, t) {
              E.push({ id: parseInt(t), num: e });
            }),
              E.sort(function (e, t) {
                return e.id - t.id;
              }),
              E.forEach(function (t, i) {
                var n = ot.GetPrefab(C, 4, 3),
                  o = n.getChildByName("icon").getComponent(cc.Sprite),
                  r = n.getChildByName("num").getComponent(cc.Label),
                  a = t.id;
                (Ai(o, e9.getElementTexturePath(a), y.BorderScale),
                  (r.string = "x" + t.num),
                  n.off("click", e.onClickElementInfo, e),
                  n.on("click", e.onClickElementInfo, e),
                  (n.name = "item_" + a),
                  (n.parent = w),
                  (n.active = !0));
              }));
          }
        }
      }),
      (n.prototype.locateToOffset = function (e, t) {
        (void 0 === t && (t = 0.3), this._scrollLocate.scrollToOffset(e, t));
      }),
      Object.defineProperty(n.prototype, "locate", {
        get: function () {
          return this._scrollLocate;
        },
        enumerable: !1,
        configurable: !0,
      }),
      (n.touchPause = !1),
      (n.finishing = !1),
      (n.needElements = new Map()),
      (n.inited = !1),
      o([Oz(Aj)], n.prototype, "orderList", void 0),
      o([Oz(Aj)], n.prototype, "orderGooseList", void 0),
      o([Oz(cc.Layout)], n.prototype, "orderContent", void 0),
      o([Oz(cc.Layout)], n.prototype, "orderCustom", void 0),
      o([Oz(cc.Node)], n.prototype, "btn_task", void 0),
      o([Oz(cc.Node)], n.prototype, "node_eventTip", void 0),
      o([Oz(cc.ScrollView)], n.prototype, "scroll", void 0),
      o([Oz(Dz)], n.prototype, "oiiRegister", void 0),
      o([Oz(cc.Node)], n.prototype, "node_block", void 0),
      o([Oz(cc.Node)], n.prototype, "node_scrollEnable", void 0),
      o([Jb(i.FinishEnterBoard)], n.prototype, "onFinishEnterBoard", null),
      o([Jb(i.BoardGiftUpdate)], n.prototype, "mastCanScroll", null),
      o([Jb(i.UpdateMainOrderInfo)], n.prototype, "_showMainInfo", null),
      o([Jb(i.AddNewMainOrder)], n.prototype, "addNewOrder", null),
      (n = s = o([Nz], n))
    );
  })(cc.Component);
cc._RF.pop();
