// Extracted cached Cocos registration: OrderDrawerWindow
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 2646075..2651491.
// Shared closure variables remain in readable/game.formatted.js:128833.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "c0401OY1cdJkLXqhj8X4+si", "OrderDrawerWindow");
var Sz,
  Tz = cc._decorator,
  Ez = Tz.ccclass,
  Az = Tz.property,
  kz = (function (e) {
    function n() {
      var t = (null !== e && e.apply(this, arguments)) || this;
      return (
        (t.list = null),
        (t.node_block = null),
        (t.node_info = null),
        (t.node_orderInfo = null),
        (t.SceneScrollToIndex = -1),
        (t._isShowInfo = !1),
        t
      );
    }
    var s;
    return (
      t(n, e),
      (s = n),
      (n.prototype.onInit = function () {
        this.node_info.on(cc.Node.EventType.TOUCH_START, this.onClickHideInfo, this);
      }),
      (n.prototype.onData = function () {
        var e, t, i;
        return r(this, void 0, void 0, function () {
          return a(this, function (n) {
            return (
              (s.refreshBranchOrder = !0),
              this.data instanceof Object &&
                this.data.focusItem &&
                ((s.refreshScroll = !0), (s.focusItem = this.data.focusItem)),
              (this.node_block.active = !1),
              (this.node_info.active = !1),
              (this.node_orderInfo.node.active = !1),
              (this._isShowInfo = !1),
              (this.list.scrollView.enabled = !0),
              (this.list.enabled = !0),
              s.refreshScroll ? this._initDisplay() : this.refreshDataOnly(),
              null != (null === (e = this.data) || void 0 === e ? void 0 : e.SceneId) &&
                this.mayScrollToSceneOrderSeries(
                  null === (t = this.list) || void 0 === t ? void 0 : t.data,
                  null === (i = this.data) || void 0 === i ? void 0 : i.SceneId,
                ),
              [2]
            );
          });
        });
      }),
      (n.prototype._initDisplay = function () {
        var e,
          t = this;
        if (s.refreshScroll) {
          (G2.RefreshBoardCache(), UT.refreshDrawerData());
          var i = this.getOrderData();
          if (
            ((this.list.data = i),
            (s.refreshScroll = !1),
            (s.refreshTimeOrder = !0),
            this.list.updateAll(),
            (null === (e = fj.needAutoRewardDrawerArr) || void 0 === e ? void 0 : e.length) > 0)
          )
            this.scrollToItem();
          else if (-1 != this.SceneScrollToIndex) this.list.scrollTo(this.SceneScrollToIndex, 0);
          else if (this.data && "number" == typeof this.data) {
            var n = 0;
            (i.forEach(function (e, i) {
              e.isScene || (e.id != Math.abs(t.data) && e.id != -Math.abs(t.data)) || (n = i);
            }),
              this.list.scrollTo(n, 0));
          } else this.list.scrollTo(-1, 0);
          fj.tryAutoReward();
        }
      }),
      (n.prototype.refreshDataOnly = function () {
        (G2.RefreshBoardCache(), UT.refreshDrawerData());
        var e = this.getOrderData();
        this.list.data = e;
      }),
      (n.prototype.getOrderData = function () {
        for (
          var e = UT.DrawerDataList, t = [], i = [], n = [], o = [], r = [], a = [], s = [], c = 0;
          c < e.length;
          ++c
        ) {
          var d = e[c],
            u = fj.GetOrderInfo(d.id);
          d.reward
            ? n.push(d)
            : d.needManuUnlock
              ? i.push(d)
              : d.lock
                ? a.push(d)
                : u && u.isGog
                  ? o.push(d)
                  : d.id == fj.returnDrawerId
                    ? r.push(d)
                    : 1 == (null == u ? void 0 : u.isSystemOrder)
                      ? s.push(d)
                      : t.push(d);
        }
        var h = t.findIndex(function (e) {
          return 99 == e.id;
        });
        if (-1 != h) {
          var p = t[h];
          (t.splice(h, 1), t.push(p));
        }
        t.unshift.apply(t, l(s));
        for (c = r.length - 1; c >= 0; --c) {
          d = r[c];
          t.unshift(d);
        }
        if (fj.NeedShowBranchInDrawer()) {
          var f = { id: -E8.role.branchTask.id, orders: null, lock: !1, reward: null };
          t.unshift(f);
        }
        for (c = o.length - 1; c >= 0; --c) {
          d = o[c];
          t.unshift(d);
        }
        for (c = i.length - 1; c >= 0; --c) {
          d = i[c];
          t.unshift(d);
        }
        aV.getTimeOrderId().forEach(function (e) {
          if (aV.getState(e) == oV.START) {
            var i = { id: -e, orders: null, lock: !1, reward: !1 };
            t.unshift(i);
          }
        });
        for (c = n.length - 1; c >= 0; --c) {
          d = n[c];
          t.unshift(d);
        }
        var g = config.OrderSeriesScene.list;
        for (c = 0; c < g.length; c++) {
          var v = g[c];
          if (K6.CheckUnlock(v.preDisplay)) {
            var m = {
              id: v.id,
              orders: null,
              lock: !K6.CheckUnlock(v.unlock),
              reward: !1,
              needShow: K6.CheckUnlock(v.preDisplay),
              endTime: 0,
              isScene: !0,
            };
            t.push(m);
          }
        }
        return (
          a.forEach(function (e) {
            t.push(e);
          }),
          t
        );
      }),
      (n.prototype.mayScrollToSceneOrderSeries = function (e, t) {
        for (var i, n = -1, o = 0; o < (null == e ? void 0 : e.length); o++) {
          e[o].id == t && (n = o);
        }
        -1 != n && (null === (i = this.list) || void 0 === i || i.scrollTo(n, 0));
      }),
      (n.prototype.refreshDisplay = function () {
        this.node.activeInHierarchy && this._initDisplay();
      }),
      (n.prototype.showOrderInfo = function (e, t) {
        if (!this._isShowInfo) {
          ((this._isShowInfo = !0), this.node_orderInfo.onData(e, !1, null, !0));
          for (var i = 0; i < this.node_orderInfo.node.children.length; i++)
            this.node_orderInfo.node.children[i].getComponent(_b);
          (this.itemScaleFix(this.node_orderInfo.node),
            (this.node_orderInfo.node.position =
              this.node_orderInfo.node.parent.convertToNodeSpaceAR(t)),
            (this.node_orderInfo.node.active = !0),
            this.node_orderInfo.node.getComponent(cc.Animation).play(),
            (this.node_info.active = !0));
        }
      }),
      (n.prototype.itemScaleFix = function (e) {
        e.children.forEach(function (e) {
          var t = e.getComponent(_b).data,
            i = e.getChildByName("icon");
          t.itemType == oa.coin || t.itemType == oa.diamond
            ? (i.setContentSize(120, 120), i.setPosition(0, 5))
            : (i.setContentSize(80, 80), i.setPosition(0, 0));
        });
      }),
      (n.prototype.showBlock = function (e) {
        (void 0 === e && (e = !0), (this.node_block.active = e));
      }),
      (n.prototype.pauseOrResume = function (e, t) {
        (void 0 === e && (e = !0),
          void 0 === t && (t = !0),
          e
            ? ((this.list.scrollView.enabled = !1),
              (this.list.enabled = !1),
              (this.node_block.active = !0))
            : ((this.list.scrollView.enabled = !0),
              (this.list.enabled = !0),
              (this.node_block.active = !1),
              t && ((this.list.data = this.getOrderData()), this.scrollToItem())));
      }),
      (n.prototype.onClickHideInfo = function () {
        this._isShowInfo &&
          ((this._isShowInfo = !1),
          (this.node_orderInfo.node.active = !1),
          (this.node_info.active = !1));
      }),
      (n.prototype.forceRefreshList = function () {
        ((s.refreshScroll = !0), this.refreshDisplay());
      }),
      (n.prototype.onHide = function () {
        return r(this, void 0, void 0, function () {
          return a(this, function (e) {
            return (u.dispatch("updateOrderInfo"), [2]);
          });
        });
      }),
      (n.prototype.scrollToItem = function () {
        var e;
        if (null === (e = fj.needAutoRewardDrawerArr) || void 0 === e ? void 0 : e.length) {
          var t = fj.needAutoRewardDrawerArr[0].id;
          if (!(t < 0)) {
            var i = this.list.getItemByCondition(function (e) {
              return e.id == t;
            });
            this.list.scrollTo(i);
          }
        }
      }),
      (n.refreshScroll = !0),
      (n.refreshTimeOrder = !0),
      (n.refreshBranchOrder = !0),
      (n.focusItem = null),
      o([Az(Mw)], n.prototype, "list", void 0),
      o([Az(cc.Node)], n.prototype, "node_block", void 0),
      o([Az(cc.Node)], n.prototype, "node_info", void 0),
      o([Az(Sb)], n.prototype, "node_orderInfo", void 0),
      o([Jb(i.RefreshDrawerWindow)], n.prototype, "forceRefreshList", null),
      (n = s = o([Ez], n))
    );
  })(Xt);
cc._RF.pop();
