// Extracted cached Cocos registration: OrderDrawerUtil
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 2487581..2495741.
// Shared closure variables remain in readable/game.formatted.js:120767.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "f00caLcGfpFRIQ+D0xQNdc4", "OrderDrawerUtil");
var hj = cc._decorator,
  pj = hj.ccclass;
hj.property;
var fj = (function () {
  function e() {}
  var t;
  return (
    (t = e),
    (e.claimDrawerReward = function (e) {
      var t;
      return r(this, void 0, void 0, function () {
        var i, n, o, r, c, l, d, h, p;
        return a(this, function (a) {
          switch (a.label) {
            case 0:
              return e != config.ReturnConfig.config.orderSeries
                ? [3, 2]
                : [4, ry.orderDrawerReward({ drawerId: e })];
            case 1:
              return ((n = a.sent()), [3, 4]);
            case 2:
              return [4, hm.orderDrawerReward({ drawerId: e })];
            case 3:
              ((n = a.sent()), (a.label = 4));
            case 4:
              if ((i = n).code) return [2, i];
              ((o = this.getDrawerDisplayRewards(
                e,
                null !== (t = i.getData().rewards) && void 0 !== t ? t : [],
              )),
                (a.label = 5));
            case 5:
              (a.trys.push([5, 10, 11, 12]), (r = s(o)), (c = r.next()), (a.label = 6));
            case 6:
              return c.done
                ? [3, 9]
                : (l = c.value).itemType != oa.adorn
                  ? [3, 8]
                  : [4, this.initAdornPosition(l.itemId)];
            case 7:
              (a.sent(), (a.label = 8));
            case 8:
              return ((c = r.next()), [3, 6]);
            case 9:
              return [3, 12];
            case 10:
              return ((d = a.sent()), (h = { error: d }), [3, 12]);
            case 11:
              try {
                c && !c.done && (p = r.return) && p.call(r);
              } finally {
                if (h) throw h.error;
              }
              return [7];
            case 12:
              return (
                G2.RefreshBoardCache(),
                UT.refreshDrawerData(),
                u.dispatch("updateChannelInfo", !0),
                [2, i]
              );
          }
        });
      });
    }),
    (e.getDrawerDisplayRewards = function (e, t) {
      void 0 === t && (t = []);
      var i = config.OrderSeries.getById(e),
        n = i ? K6.ParseItemsConf(i.reward) : t;
      return (null != n ? n : []).filter(function (e) {
        return e.itemType != oa.adornPoint;
      });
    }),
    (e.showDrawerRewards = function (e) {
      return r(this, void 0, void 0, function () {
        var t, i, n, o, r;
        return a(this, function (a) {
          switch (a.label) {
            case 0:
              return (
                (t = (null != e ? e : []).filter(function (e) {
                  return (
                    e.itemType == oa.adorn ||
                    e.itemType == oa.adornSkin ||
                    e.itemType == oa.adornSkinRebate
                  );
                })),
                (i = (null != e ? e : []).filter(function (e) {
                  return !t.includes(e);
                })).length > 0
                  ? [4, K6.showReward({ rewards: i }, !0)]
                  : [3, 2]
              );
            case 1:
              (a.sent(), (a.label = 2));
            case 2:
              ((n = 0), (a.label = 3));
            case 3:
              return n < t.length
                ? ((o = t[n]),
                  (r =
                    o.itemType == oa.adornSkinRebate
                      ? Object.assign(new Za(), o, { itemType: oa.adornSkin })
                      : o),
                  [
                    4,
                    j_.showWindow(F3.ActivityRewardGetWindow, {
                      item: r,
                      jumpOnClose: n == t.length - 1,
                    }),
                  ])
                : [3, 7];
            case 4:
              return [4, a.sent().waitClose()];
            case 5:
              (a.sent(), (a.label = 6));
            case 6:
              return (n++, [3, 3]);
            case 7:
              return [2];
          }
        });
      });
    }),
    (e.initAdornPosition = function (e) {
      var t;
      return r(this, void 0, void 0, function () {
        var i, n, o, r, s, c, l;
        return a(this, function (a) {
          switch (a.label) {
            case 0:
              ((i = null), (a.label = 1));
            case 1:
              return (a.trys.push([1, 4, 5, 6]), [4, Mi(e9.getPrefabPath("Adorns/" + e))]);
            case 2:
              return (
                (i = a.sent()),
                (n = null == i ? void 0 : i.getComponent(oj))
                  ? ((o = n.direction == eS.Right ? yA.Right : yA.Left),
                    (r = v4.instance.houseData.getHouseIdByAdornId(e)),
                    (s = v4.instance.houseData.getAdornDataById(0 == r, e)),
                    [
                      4,
                      hm.adornEdit({
                        adornId: e,
                        cellX: n.cellX,
                        cellY: n.cellY,
                        dir: o,
                        skinId:
                          null !== (t = null == s ? void 0 : s.usingId) && void 0 !== t
                            ? t
                            : K6.SearchDefaultAdornSkin(e, n.isDefaultOpen),
                        houseId: r,
                      }),
                    ])
                  : (h.warn("OrderDrawerUtil.initAdornPosition: 装饰物预制件加载失败,adornId:" + e),
                    [2])
              );
            case 3:
              return (
                (c = a.sent()).code &&
                  h.warn(
                    "OrderDrawerUtil.initAdornPosition: 初始化位置失败,adornId:" +
                      e +
                      ",error:" +
                      c.error,
                  ),
                [3, 6]
              );
            case 4:
              return (
                (l = a.sent()),
                h.warn(
                  "OrderDrawerUtil.initAdornPosition: 初始化位置异常,adornId:" + e + ",error:" + l,
                ),
                [3, 6]
              );
            case 5:
              return ((null == i ? void 0 : i.isValid) && i.destroy(), [7]);
            case 6:
              return [2];
          }
        });
      });
    }),
    (e.tryAutoReward = function () {
      var e = this;
      if (0 != this.drawerAutoRewardQueue.length && !o8.isRunning()) {
        var t = Array.from(this.drawerAutoRewardQueue);
        this.drawerAutoRewardQueue.length = 0;
        r(e, void 0, void 0, function () {
          var e, i;
          return a(this, function (n) {
            switch (n.label) {
              case 0:
                ((e = 0), (n.label = 1));
              case 1:
                return e < t.length
                  ? ((i = t[e]), console.error("que auto reward"), [4, i.func.bind(i.thisObj)()])
                  : [3, 4];
              case 2:
                (n.sent(), (n.label = 3));
              case 3:
                return (e++, [3, 1]);
              case 4:
                return [2];
            }
          });
        });
      }
    }),
    (e.GetOrderInfo = function (e) {
      var t = e;
      if (e < 0) {
        var i = aV.getTimeOrderDrawerActData(Math.abs(e));
        i && i.content
          ? (t = parseInt(i.content))
          : E8.role.branchTask && E8.role.branchTask.id
            ? ((t = E8.role.branchTask.id), (this.BranchTaskId = t))
            : (t = this.BranchTaskId);
      }
      var n = e >= 0 ? config.OrderSeries.getById(e) : config.DrawerList.getById(t + "");
      return (n || (n = config.OrderBranchList.getById(t)), n);
    }),
    (e.GetOrderListConf = function (e, t) {
      return 0 == e
        ? UT.getOrderConf(t)
        : 1 == e
          ? config.DrawerLimited.getById(t)
          : 2 == e
            ? config.OrderBranch.getById(t)
            : void 0;
    }),
    (e.GetOrderType = function (e) {
      if (e >= 0) return 0;
      var t = aV.getTimeOrderDrawerActData(Math.abs(e));
      return t && t.content ? 1 : 2;
    }),
    (e.GetOldOrders = function (e, t) {
      return 0 == e
        ? []
        : 1 == e
          ? aV.getTimeOrderDrawerData(Math.abs(t)).curTaskId
          : 2 == e
            ? E8.role.branchTask.curTaskId
            : void 0;
    }),
    (e.NeedShowBranchInDrawer = function () {
      return (
        !(
          !E8.role.branchTask ||
          !E8.role.branchTask.id ||
          0 == E8.role.branchTask.curTaskId.length
        ) && !(!bA.getOnceData(0, 0) && !bA.ReadStartDialig)
      );
    }),
    (e.GetActivityOrderNeed = function () {
      for (var e = uJ.GetActivityOrderNeed(), t = new Map(), i = 0; i < e.length; i++) {
        e[i].demand.forEach(function (e, i) {
          if (t.has(i)) {
            var n = t.get(i) + e;
            t.set(i, n);
          } else t.set(i, e);
        });
      }
      return (
        uj.getOrderDemand().forEach(function (e) {
          if (t.has(e)) {
            var i = t.get(e) + 1;
            t.set(e, i);
          } else t.set(e, 1);
        }),
        (this.ActivityOrderTask = t),
        t
      );
    }),
    (e.GetMainTaskNeed = function () {
      for (
        var e = b2.GetBoardByType(ar.main),
          t = UT.getDrawerNeedShowAllOrders(e),
          i = new Map(),
          n = 0;
        n < t.length;
        ++n
      ) {
        if ((h = t[n].orderId) < 0)
          t[n].demand.forEach(function (e, t) {
            if (i.has(t)) {
              var n = i.get(t) + e;
              i.set(t, n);
            } else i.set(t, e);
          });
        else
          for (
            var o = config.Order.getById(h).demand, r = K6.ParseItemsConf(o), a = 0;
            a < r.length;
            ++a
          ) {
            var s = r[a];
            if (i.has(s.itemId)) {
              var c = i.get(s.itemId) + s.value;
              i.set(s.itemId, c);
            } else i.set(s.itemId, s.value);
          }
      }
      var l = YF.getAllSystemManagedOrders();
      for (n = 0; n < l.length; ++n) {
        var d = l[n];
        YF.getOrderDemand(d.orderId).forEach(function (e, t) {
          if (i.has(e.itemId)) {
            var n = i.get(e.itemId) + e.value;
            i.set(e.itemId, n);
          } else i.set(e.itemId, e.value);
        });
      }
      var u = WT.getOrderGroupOrderList();
      for (n = 0; n < u.length; ++n) {
        var h = u[n].orderId,
          p = WT.getOrderBelongGroup(h);
        if (p) if (WT.getGroupType(p) === MT.STACK && !lj.isOrderInCurrentBatch(p, h)) continue;
        for (
          o = config.Order.getById(h).demand, r = K6.ParseItemsConf(o), a = 0;
          a < r.length;
          ++a
        ) {
          s = r[a];
          if (i.has(s.itemId)) {
            c = i.get(s.itemId) + s.value;
            i.set(s.itemId, c);
          } else i.set(s.itemId, s.value);
        }
      }
      return ((this.MainTask = i), i);
    }),
    (e.GetAbaoNeed = function () {
      var e = new Map(),
        t = config.DailyTradeConfig.config.unlockLevel;
      return (
        E8.role.level < t ||
          !E8.role.dailyTrades ||
          (E8.role.dailyTrades.tasks.forEach(function (t, i) {
            var n = config.DailyTradeTask.getById(t.id);
            if (!(n && t.completeCount >= n.taskNum))
              if (e.has(t.demand.itemId)) {
                var o = e.get(t.demand.itemId) + t.demand.value;
                e.set(t.demand.itemId, o);
              } else e.set(t.demand.itemId, t.demand.value);
          }),
          (this.AbaoTask = e)),
        e
      );
    }),
    (e.GetBranchOrderNeed = function () {
      for (var e = new Map(), t = bA.getAllBranchOrders(), i = 0; i < t.length; ++i)
        for (
          var n = t[i].orderId,
            o = config.OrderBranch.getById(n).demand,
            r = K6.ParseItemsConf(o),
            a = 0;
          a < r.length;
          ++a
        ) {
          var s = r[a];
          if (e.has(s.itemId)) {
            var c = e.get(s.itemId) + s.value;
            e.set(s.itemId, c);
          } else e.set(s.itemId, s.value);
        }
      return ((this.BranchOrderTask = e), e);
    }),
    (e.GetTimeOrderNeed = function () {
      for (var e = new Map(), t = aV.getAllOrders(), i = 0; i < t.length; ++i)
        for (
          var n = t[i].orderId,
            o = config.DrawerLimited.getById(n).demand,
            r = K6.ParseItemsConf(o),
            a = 0;
          a < r.length;
          ++a
        ) {
          var s = r[a];
          if (e.has(s.itemId)) {
            var c = e.get(s.itemId) + s.value;
            e.set(s.itemId, c);
          } else e.set(s.itemId, s.value);
        }
      return ((this.TimeOrderTask = e), e);
    }),
    (e.GetGooseOrderNeed = function () {
      var e = new Map();
      return (
        E8.role.goose.orders.forEach(function (t) {
          if (t.endTime > 0 && t.endTime > E8.serverTime)
            for (
              var i = t.data.orderId,
                n = config.GooseOrder.getById(i).demand,
                o = K6.ParseItemsConf(n),
                r = 0;
              r < o.length;
              ++r
            ) {
              var a = o[r];
              if (e.has(a.itemId)) {
                var s = e.get(a.itemId) + a.value;
                e.set(a.itemId, s);
              } else e.set(a.itemId, a.value);
            }
        }),
        (this.GooseOrderTask = e),
        e
      );
    }),
    (e.GetButterflyOrderNeed = function () {
      var e = new Map();
      return (
        hJ.getState() == lJ.START &&
          E8.role.butterfly.curTaskId.forEach(function (t, i) {
            for (
              var n = config.OrderSpecial.getById(t).demand, o = K6.ParseItemsConf(n), r = 0;
              r < o.length;
              ++r
            ) {
              var a = o[r];
              if (e.has(a.itemId)) {
                var s = e.get(a.itemId) + a.value;
                e.set(a.itemId, s);
              } else e.set(a.itemId, a.value);
            }
          }),
        (this.ButterflyTask = e),
        e
      );
    }),
    (e.UpdateAllOrder = function () {
      (t.GetMainTaskNeed(),
        t.GetActivityOrderNeed(),
        t.GetAbaoNeed(),
        t.GetBranchOrderNeed(),
        t.GetTimeOrderNeed(),
        t.GetGooseOrderNeed(),
        t.GetButterflyOrderNeed());
    }),
    (e.needAutoRewardDrawerArr = []),
    (e.drawerAutoRewardQueue = []),
    (e.returnDrawerId = 998),
    (e.specialDrawerId = 99),
    (e.BranchTaskId = -1),
    (e.ActivityOrderTask = null),
    (e.MainTask = null),
    (e.AbaoTask = null),
    (e.BranchOrderTask = null),
    (e.TimeOrderTask = null),
    (e.GooseOrderTask = null),
    (e.ButterflyTask = null),
    (e = t = o([pj], e))
  );
})();
cc._RF.pop();
