// Extracted cached Cocos registration: OrderDrawerItem
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 8590715..8650400.
// Shared closure variables remain in readable/game.formatted.js:416104.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "ffe05lQoEFNN4f2zSohuudt", "OrderDrawerItem");
var LXe = cc._decorator,
  NXe = LXe.ccclass,
  OXe = LXe.property;
(!(function (e) {
  function n() {
    var t = (null !== e && e.apply(this, arguments)) || this;
    return (
      (t.btn_tip = null),
      (t.btn_all_info = null),
      (t.node_lock = null),
      (t.node_progress = null),
      (t.label_title = null),
      (t.label_desc = null),
      (t.label_progress = null),
      (t.label_time = null),
      (t.node_progress_parent = null),
      (t.layout_orders = null),
      (t.node_order = null),
      (t.node_order_parent = null),
      (t.node_time = null),
      (t.btn_reward = null),
      (t.node_smile_progress = null),
      (t.pg_smile_reward = null),
      (t.label_smile_progress = null),
      (t.spine_smile_progress = null),
      (t.btn_smile_reward_tips = null),
      (t.sprite_bg = null),
      (t.layout_conditions = null),
      (t.node_condition = null),
      (t.node_timeOrderProgress = null),
      (t.node_timeOrderProgress_content = null),
      (t.node_timeOrderProgressItem = null),
      (t.node_branchOrderProgress = null),
      (t.node_branchOrderProgresss_content = null),
      (t.node_branchOrderProgressItem = null),
      (t.node_gog = null),
      (t.node_orderGroup = null),
      (t.node_order_unlock = null),
      (t.node_orderGroupSubmit = null),
      (t.node_orderGroupLook = null),
      (t._oldId = 0),
      (t.isSceneOrder = !1),
      (t._systemAutoOrderDescCache = new Map()),
      (t._smileProgressTweenData = { progress: 0 }),
      (t._clock = null),
      (t.netting = !1),
      (t.needShowLock = !1),
      (t._cache = null),
      (t.drawerLockAnimStopFlag = !1),
      (t.drawerLockAnimPlayingFlag = !1),
      (t._curBranchProgress = 0),
      (t._curBranchStage = 0),
      (t._curProgress = 0),
      (t._curStage = 0),
      (t._refreshLock = !1),
      (t._netting = !1),
      t
    );
  }
  var s;
  (t(n, e),
    (s = n),
    Object.defineProperty(n.prototype, "data", {
      get: function () {
        return this._data;
      },
      set: function (e) {
        (this._data && (this._oldId = this._data.id),
          e && e.isScene && (this.isSceneOrder = e.isScene),
          (this._data = e),
          (this.needShowLock = !1),
          this.setDisplay());
      },
      enumerable: !1,
      configurable: !0,
    }),
    (n.prototype.onLoad = function () {
      var e,
        t = this;
      (this.btn_all_info.on("click", this.onClickAllInfo, this),
        this.btn_tip.on("click", this.onClickTip, this),
        this.btn_reward.on("click", this.onClickAllReward, this),
        this.node_gog.on("click", this.onClickGog, this),
        null === (e = this.btn_smile_reward_tips) ||
          void 0 === e ||
          e.on("click", this.onClickSmileRewardTips, this),
        this.node_lock.on("click", this.onClickLock, this),
        this.node_orderGroupSubmit.on("click", this.onClickLook, this),
        this.node_orderGroupLook.on("click", this.onClickLook, this),
        u.add("refreshDrawerItem", this.refreshDrawerItem, this),
        u.add("onLanguageChange", this.refreshCache, this),
        u.add("updateDailyChallenge", this.refreshCache, this),
        u.add("DailyChallengeRefresh", this.refreshCache, this),
        u.add(
          zb.UPDATE_ENERGY,
          function () {
            var e;
            (null === (e = t.data) || void 0 === e ? void 0 : e.isScene) &&
              t.node.activeInHierarchy &&
              t.sceneOrderDisplay();
          },
          this,
        ));
    }),
    (n.prototype.setDisplay = function () {
      if (this.data) {
        if (
          (this.syncDrawerData(),
          (this._oldId < 0 || this.isSceneOrder) && (this._cache = null),
          this.data.isScene)
        )
          return (
            this.sceneOrderDisplay(),
            this.layout_orders.updateLayout(),
            void this.node.getComponent(cc.Layout).updateLayout()
          );
        (this.orderDisplay(),
          this.timeDisplay(),
          this.timeOrderProgressDisplay(),
          this.branchProgressDisplay(),
          this.layout_orders.updateLayout(),
          this.node.getComponent(cc.Layout).updateLayout());
      }
    }),
    (n.prototype.syncDrawerData = function () {
      var e = this.data;
      if (!(!e || e.id < 0 || e.isScene)) {
        var t = config.OrderSeries.getById(e.id);
        if (t && 1 != t.isSystemOrder) {
          var i = UT.DrawerData.get(e.id);
          i &&
            ((e.orders = i.orders),
            (e.lock = i.lock),
            (e.reward = i.reward),
            (e.needManuUnlock = i.needManuUnlock));
        }
      }
    }),
    (n.prototype.updateDataOnly = function () {
      this.data &&
        ((this._oldId < 0 || this.isSceneOrder) && (this._cache = null),
        this.data.isScene
          ? this.sceneOrderDisplay()
          : (this.orderDisplay(),
            this.timeDisplay(),
            this.timeOrderProgressDisplay(),
            this.branchProgressDisplay()));
    }),
    (n.prototype.sceneOrderDisplay = function () {
      var e = this;
      ((this.node_timeOrderProgress.active = !1),
        (this.node_branchOrderProgress.active = !1),
        (this.node_progress_parent.active = !1),
        this.updateSmileProgressDisplay(),
        (this.btn_reward.active = !1),
        (this.node_time.active = !1),
        (this.node_gog.active = !1),
        (this.node_order_parent.active = !0),
        (this.node_orderGroup.active = !1));
      var t = config.OrderSeriesScene.getById(this.data.id);
      ((this.label_title.string = v.getLabel("sceneDrawer_title")),
        (this.label_desc.string = v.getLabel("sceneDrawer_briefIntro")),
        this._parseCondition(t.unlock),
        (this.node_lock.active = this.data.lock || this.data.needManuUnlock),
        (this.btn_reward.active = t.reward.size > 0 && this.data.reward),
        (this.btn_all_info.active = t.reward.size > 0));
      var i = "Texture/UI/OrderDrawer/picture/" + t.picture;
      Ai(this.sprite_bg, i, y.None);
      for (
        var n = { id: 0, need: [], reward: [] }, o = K6.ParseItemsConf(t.demand), r = [], a = 0;
        a < o.length;
        a++
      )
        if (o[a].itemType == oa.element) {
          var s = b2.GetBoardHaveElementIncludeBag([o[a].itemId], o[a].value);
          r.push({
            item: o[a],
            have: s.element.length,
            isFinish: s.element.length + s.bag.length >= o[a].value,
          });
        } else if (o[a].itemType == oa.energy) {
          s = E8.role.energy.value;
          r.push({ item: o[a], have: s, isFinish: s >= o[a].value });
        }
      var c = K6.ParseItemsConf(t.reward);
      ((n.need = r),
        (n.reward = c),
        this.renderOrder([n], function (t, i) {
          var n = t.getChildByName("num").getComponent(cc.Label),
            o = { name: v.getLabel("sceneDrawer_orderdesc") };
          n.string = o.name;
          var a = t.getChildByName("GoBtn"),
            s = t.getChildByName("finishBtn");
          (r[0].isFinish ? ((a.active = !1), (s.active = !0)) : ((a.active = !0), (s.active = !1)),
            (t.getChildByName("group").active = !1));
          var c = v.getLabel("sceneDrawer_exchangeButton");
          a.getChildByName("num").getComponent(cc.Label).string = c;
          var l = s.getChildByName("num"),
            d = s.getChildByName("duigou");
          ((l.active = !0),
            (l.getComponent(cc.Label).string = c),
            (d.active = !1),
            a.targetOff(e),
            s.targetOff(e),
            s.on("click", e.onClickExchange, e),
            a.on("click", e.onClickExchange, e),
            (s.children[2].active = !1));
        }));
    }),
    (n.prototype.onClickExchange = function () {
      j_.showWindow(F3.HydrantWindow, { sceneId: 1, useFlyNode: !0 });
    }),
    (n.prototype.isSystemOrderDrawer = function () {
      if (!this.data || this.data.id < 0 || this.data.isScene) return !1;
      var e = config.OrderSeries.getById(this.data.id);
      return 1 == (null == e ? void 0 : e.isSystemOrder);
    }),
    (n.prototype.isSystemOrderDrawerUnlock = function () {
      return this.isSystemOrderDrawer() && !this.data.lock && !this.data.needManuUnlock;
    }),
    (n.prototype.getSmileOrderAct = function () {
      return nC.getFirstActByType(config.GlobalActType.SmileOrder);
    }),
    (n.prototype.shouldShowSmileProgress = function () {
      var e,
        t = this.getSmileOrderAct();
      return (
        !(!t || !(null === (e = t.data) || void 0 === e ? void 0 : e.actData)) &&
        this.isSystemOrderDrawerUnlock()
      );
    }),
    (n.prototype.renderSmileProgress = function (e, t, i) {
      (this.pg_smile_reward && (this.pg_smile_reward.progress = Math.min(e, 1)),
        this.label_smile_progress && (this.label_smile_progress.string = Math.min(t, i) + "/" + i));
    }),
    (n.prototype.updateSmileProgressDisplay = function () {
      var e,
        t,
        i = this;
      if (this.node_smile_progress) {
        var n = this.shouldShowSmileProgress();
        if (((this.node_smile_progress.active = n), n)) {
          var o = this.getSmileOrderAct(),
            r = o.data.actData.collectCount,
            a = Math.max(o.data.needPoint, 1),
            s = r >= a,
            c = Math.min(r / a, 1),
            l = Math.min(
              null !==
                (t = null === (e = this.pg_smile_reward) || void 0 === e ? void 0 : e.progress) &&
                void 0 !== t
                ? t
                : c,
              1,
            ),
            d = this.node.activeInHierarchy && c > l + 0.001;
          (cc.Tween.stopAllByTarget(this._smileProgressTweenData),
            d
              ? ((this._smileProgressTweenData.progress = l),
                this.renderSmileProgress(l, Math.floor(l * a), a),
                cc
                  .tween(this._smileProgressTweenData)
                  .to(
                    0.35,
                    { progress: c },
                    {
                      easing: "sineOut",
                      progress: function (e, t, n, o) {
                        var r = e + (t - e) * o,
                          s = Math.floor(r * a);
                        return (i.renderSmileProgress(r, s, a), r);
                      },
                    },
                  )
                  .call(function () {
                    var e;
                    (i.renderSmileProgress(c, r, a),
                      (null === (e = i.label_smile_progress) || void 0 === e ? void 0 : e.node) &&
                        (cc.Tween.stopAllByTarget(i.label_smile_progress.node),
                        (i.label_smile_progress.node.scale = 1),
                        cc
                          .tween(i.label_smile_progress.node)
                          .to(0.12, { scale: 1.08 })
                          .to(0.12, { scale: 1 })
                          .start()));
                  })
                  .start())
              : this.renderSmileProgress(c, r, a),
            this.spine_smile_progress &&
              ib.playAnimation(this.spine_smile_progress, s ? "full" : "idle", !0, !1));
        } else cc.Tween.stopAllByTarget(this._smileProgressTweenData);
      }
    }),
    (n.prototype.getSystemAutoOrderNeedShowData = function () {
      var e = [];
      return (
        YF.getAllSystemManagedOrders().forEach(function (t) {
          var i = LF.getOrderConf(sJ.SYSTEM_AUTO_ORDER, t.orderId);
          if (i) {
            var n = K6.ParseItemsConf(i.demand),
              o = [];
            n.forEach(function (e) {
              if (e.itemType == oa.element) {
                var t = b2.GetBoardHaveElementIncludeBag([e.itemId], e.value);
                o.push({
                  item: e,
                  have: t.element.length + t.bag.length,
                  isFinish: t.element.length + t.bag.length >= e.value,
                });
              } else
                e.itemType == oa.energy &&
                  o.push({
                    item: e,
                    have: E8.role.energy.value,
                    isFinish: E8.role.energy.value >= e.value,
                  });
            });
            for (
              var r = K6.ParseItemsConf(i.reward),
                a = n
                  .filter(function (e) {
                    return e.itemType == oa.element;
                  })
                  .map(function (e) {
                    return e.itemId;
                  }),
                s = 0;
              s < o.length;
              s += 3
            )
              e.push({
                id: t.orderId,
                elementIds: a,
                demand: i.demand,
                canSubmit: s + 3 >= o.length,
                need: o.slice(s, s + 3),
                reward: s + 3 >= o.length ? r : [],
              });
            0 == o.length &&
              e.push({
                id: t.orderId,
                elementIds: a,
                demand: i.demand,
                canSubmit: !0,
                need: [],
                reward: r,
              });
          }
        }),
        e
      );
    }),
    (n.prototype.getSystemAutoOrderDesc = function (e, t) {
      var i = this._systemAutoOrderDescCache.get(e);
      if (i) return i;
      var n = t && t.length > 0 ? t[M(0, t.length)] : 0,
        o = config.SystemOrderDesc.getById(n);
      (o && 0 != o.orderDesc.length) || (o = config.SystemOrderDesc.getById(1));
      var r = (null == o ? void 0 : o.orderDesc) || [],
        a = r.length > 0 ? r[M(0, r.length)] : this.label_title.string;
      return (this._systemAutoOrderDescCache.set(e, a), a);
    }),
    (n.prototype.timeDisplay = function () {
      var e = this;
      if (
        (this._clock && (this._clock.dispose(), (this._clock = null)),
        (this.node_time.active = !1),
        this.data.id >= 0)
      ) {
        var t = function () {
          return r(e, void 0, void 0, function () {
            var e;
            return a(this, function (t) {
              switch (t.label) {
                case 0:
                  return this._netting ? [4, S(333)] : [3, 2];
                case 1:
                  return (t.sent(), [3, 0]);
                case 2:
                  return (
                    G2.RefreshBoardCache(),
                    UT.refreshDrawerData(),
                    u.dispatch("updateChannelInfo", !0),
                    u.dispatch("updateOrderInfo"),
                    (e = j_.getWindowData(F3.OrderDrawerWindow).View),
                    (kz.refreshScroll = !0),
                    e.refreshDisplay(),
                    [2]
                  );
              }
            });
          });
        };
        if (-1 != (i = UT.DrawerData.get(this.data.id).endTime) && i > 0)
          (n = (i - E8.serverTime) / 1e3) > 0
            ? ((this.node_time.active = !0),
              (this._clock = b.addClock("order_" + this.data.id + "_DrawerTime", n, 1e3, 1)),
              this._clock.registCallBack(this, t.bind(this), function () {
                e.label_time.string = j(e._clock.leftSecond, !1, !0, 2);
              }))
            : t();
      } else {
        var i, n;
        t = function () {
          (j_.hideWindow(F3.FinishOrderTipWindow), u.dispatch("updateOrderInfo"));
          var e = j_.getWindowData(F3.OrderDrawerWindow).View;
          ((kz.refreshScroll = !0), e.refreshDisplay());
        };
        if (-1 != (i = aV.getActivityEndTime(Math.abs(this.data.id))) && i > 0)
          (n = (i - E8.serverTime) / 1e3) > 0
            ? ((this.node_time.active = !0),
              (this._clock = b.addClock("order_" + this.data.id + "_DrawerTime", n, 1e3, 1)),
              this._clock.registCallBack(this, t.bind(this), function () {
                e.label_time.string = j(e._clock.leftSecond, !1, !0, 2);
              }))
            : t();
      }
    }),
    (n.prototype.addToAutoRewardQueue = function (e, t) {
      return r(this, void 0, void 0, function () {
        var i,
          n,
          o,
          s,
          c,
          l = this;
        return a(this, function (d) {
          switch (d.label) {
            case 0:
              return (
                (i = this.data.id),
                (n = fj.needAutoRewardDrawerArr.findIndex(function (e) {
                  return e.id == i;
                })),
                (o = -1 != n),
                (s = e.reward.size > 0 && this.data.reward),
                (t.active = !o && s),
                o && s
                  ? fj.drawerAutoRewardQueue.find(function (e) {
                      return e.id == i;
                    }) || this.netting
                    ? [2]
                    : (j_.pausePopup("OrderDrawerAutoReward"),
                      (this.netting = !0),
                      (c = function () {
                        return r(l, void 0, void 0, function () {
                          var e;
                          return a(this, function (t) {
                            switch (t.label) {
                              case 0:
                                return (
                                  fj.needAutoRewardDrawerArr.splice(n, 1),
                                  (e = j_.getWindowData(F3.OrderDrawerWindow).View).showBlock(!0),
                                  [4, S(1e3)]
                                );
                              case 1:
                                return (
                                  t.sent(),
                                  e.showBlock(!1),
                                  [4, this.onClickAllReward(null, i, !0)]
                                );
                              case 2:
                                return (t.sent(), [2]);
                            }
                          });
                        });
                      }),
                      fj.needAutoRewardDrawerArr[n].immediate ? [4, c()] : [3, 2])
                  : [3, 4]
              );
            case 1:
              return (d.sent(), (this.netting = !1), [3, 3]);
            case 2:
              (fj.drawerAutoRewardQueue.push({ func: c, id: i, thisObj: this }), (d.label = 3));
            case 3:
              (j_.resumePopup("OrderDrawerAutoReward"), (d.label = 4));
            case 4:
              return [2];
          }
        });
      });
    }),
    (n.prototype.orderDisplay = function () {
      var e = fj.GetOrderType(this.data.id),
        t = fj.GetOrderInfo(this.data.id),
        i = this.isSystemOrderDrawer(),
        n = null == t ? void 0 : t.isGog;
      if (
        ((this.node_gog.active = !1),
        (this.node_orderGroup.active = !1),
        (this.node_order_parent.active = !0),
        n)
      ) {
        ((this.node_order_parent.active = !1),
          (this.label_title.string = t.title),
          (this.label_desc.string = t.briefIntro));
        var o = UT.getDrawerNeedShowOrders(this.data.orders);
        if (o && o.length) ((this.node_lock.active = !1), (this.node_gog.active = !0));
        else {
          ((this.needShowLock = !0), (this.node_lock.active = !0), (this.node_gog.active = !1));
          for (var r = !1, a = [], s = 0; s < t.unlock.length; ++s) {
            var c = t.unlock[s];
            c.startsWith("CreateVersion") || a.push(c);
          }
          (this.data.orders.forEach(function (e, t) {
            if (!e && !r) {
              r = !0;
              for (
                var i = config.Order.getById(t), n = null == i ? void 0 : i.unlock, o = 0;
                o < n.length;
                ++o
              ) {
                var s = n[o];
                if (s.startsWith("PlayerLevel")) {
                  a.push(s);
                  break;
                }
              }
            }
          }),
            this._parseCondition(a));
        }
        ((this.node_progress_parent.active = !1),
          this.updateSmileProgressDisplay(),
          (this.btn_reward.active = !1),
          (this.btn_all_info.active = !1));
        var l = "Texture/UI/OrderDrawer/picture/" + t.picture;
        (Ai(this.sprite_bg, l, y.None), LT.addDiamondIcon(this.node_gog));
      } else if (this.data.id >= 0) {
        ((this.label_title.string = t.title),
          (this.label_desc.string = t.briefIntro),
          this._parseCondition(t.unlock),
          (this.node_lock.active = this.data.lock || this.data.needManuUnlock),
          (this.node_progress_parent.active = !i && !this.data.lock && !this.data.needManuUnlock),
          this.updateSmileProgressDisplay(),
          i && (this.btn_all_info.active = !1),
          i ? (this.btn_reward.active = !1) : this.addToAutoRewardQueue(t, this.btn_reward),
          (this.btn_all_info.active = !i && t.reward.size > 0));
        l = "Texture/UI/OrderDrawer/picture/" + t.picture;
        if (
          (999 == this.data.id ? m(this.sprite_bg, l, y.None) : Ai(this.sprite_bg, l, y.None), !i)
        ) {
          var d = 0,
            u = this.data.orders.size;
          this.data.orders.forEach(function (e, t) {
            e && d++;
          });
          var h = ~~((d / u) * 1e3) / 1e3;
          ((h > 1 || this.data.reward) && (h = 1),
            (this.label_progress.string = Math.floor(100 * h) + "%"),
            (this.node_progress.width = 545 * h));
        }
      } else {
        ((this.label_title.string = t.name),
          (this.label_desc.string = t.explanation),
          this._parseCondition([]),
          (this.node_lock.active = !1),
          (this.node_progress_parent.active = !1),
          this.updateSmileProgressDisplay(),
          (this.btn_reward.active = !1),
          (this.btn_all_info.active = !1));
        l =
          1 == e
            ? "Texture/UI/OrderDrawer/TimeOrderDrawer/picture/" + t.picture
            : "Texture/UI/OrderBranch/picture/" + t.picture;
        Ai(this.sprite_bg, l, y.None, !1);
      }
      (this.data.reward && this.btn_all_info.active
        ? this.btn_all_info.getComponent(cc.Animation).play()
        : (this.btn_all_info.getComponent(cc.Animation).stop(),
          (this.btn_all_info.getChildByName("icon").y = -60),
          (this.btn_all_info.getChildByName("icon").scale = 1)),
        this._showOrderGroup(),
        this._showOrder());
    }),
    (n.prototype._showOrderGroup = function () {
      if (!this.isSystemOrderDrawer()) {
        var e = WT.getOrderGroupOrders(this.data.id);
        if (e && e.length) {
          var t = e[0].orderId;
          this.node_orderGroup.active = !0;
          var i = WT.checkOrderGroupCanFinish(t),
            n = cc.find("bg/txt", this.node_orderGroup).getComponent(cc.Label),
            o = this.node_orderGroupSubmit,
            r = this.node_orderGroupLook;
          i ? ((r.active = !1), (o.active = !0)) : ((r.active = !0), (o.active = !1));
          var a = config.OrderGroupBasic.getById(t);
          n.string = a.title;
          var s = this.node_orderGroup.find("bg/groupIcon");
          if (s) {
            var c = s.getComponent(cc.Sprite),
              l = WT.getGroupType(t);
            l == MT.MUSEUM
              ? Ai(c, e9.getTexturePath("MergeUi/ui_bg_ordergroup_top_1"))
              : l == MT.STACK && Ai(c, e9.getTexturePath("UI/OrderStack/act_ui_bg_order"));
          }
        }
      }
    }),
    (n.prototype._showOrder = function () {
      var e = this,
        t = [];
      if (this.isSystemOrderDrawer())
        this.isSystemOrderDrawerUnlock() &&
          ((t = this.getSystemAutoOrderNeedShowData()), (this._cache = null));
      else if (this.data.id >= 0) {
        var i = !1;
        if (
          (t = UT.getDrawerNeedShowOrders(this.data.orders)) &&
          this._cache &&
          t.length == this._cache.length
        )
          for (var n = 0; n < t.length; n++) {
            var o = t[n],
              r = this._cache[n];
            if (o.id != r.id) {
              i = !0;
              break;
            }
            if ((null == o ? void 0 : o.display) != (null == r ? void 0 : r.display)) {
              i = !0;
              break;
            }
            for (var a = !1, s = 0; s < o.need.length; s++)
              if (o.need[s].isFinish != r.need[s].isFinish || o.need[s].have != r.need[s].have) {
                a = !0;
                break;
              }
            if (a) {
              i = !0;
              break;
            }
          }
        else i = !0;
        if (
          (this._cache && this.layout_orders.node.children.length != this._cache.length && (i = !0),
          !i)
        )
          return;
        this._cache = t;
      } else {
        var c = E8.role.orderDrawerLimit.get(Math.abs(this.data.id));
        if (c)
          (c.curTaskId.forEach(function (e) {
            t.push(UT.getTimeOrderData(e));
          }),
            t.sort(function (e, t) {
              var i = config.DrawerLimited.getById(e.id).series,
                n = config.DrawerLimited.getById(t.id).series;
              return i == n ? e.id - t.id : i - n;
            }));
        else
          (E8.role.branchTask.curTaskId.forEach(function (e) {
            t.push(UT.getBranchOrderData(e));
          }),
            t.sort(function (e, t) {
              return e.id - t.id;
            }));
      }
      this.renderOrder(t, function (t, i) {
        var n = t.getChildByName("num").getComponent(cc.Label),
          o = t.getChildByName("finishBtn"),
          r = fj.GetOrderType(e.data.id),
          a = e.isSystemOrderDrawer(),
          s = null;
        if (a)
          ((s = LF.getOrderConf(sJ.SYSTEM_AUTO_ORDER, i.id)),
            (n.string = e.getSystemAutoOrderDesc(i.id, i.elementIds)));
        else {
          if (!(s = fj.GetOrderListConf(r, i.id))) return;
          n.string = s.name;
        }
        a && !i.canSubmit && ((t.getChildByName("GoBtn").active = !0), (o.active = !1));
        RT.isOrderValid(s) && LT.addDiamondIcon(o);
        var c = t.getChildByName("group");
        e.renderOrderExtraGroup(c, i, s.demand, !a || i.canSubmit);
      });
    }),
    (n.prototype.renderOrderExtraGroup = function (e, t, i, n) {
      if (
        (void 0 === n && (n = !0), e && ((e.active = n), nO.removeExtra(ZN.OrderDrawerRight, e), n))
      ) {
        var o = e.getChildByName("dailyChallenge");
        o && (o.active = !1);
        var r = fj.GetOrderType(this.data.id),
          a = this.data.id >= 0 || 1 == r || 2 == r,
          s = e.getChildByName("routineCheck2");
        if (s) {
          var c = a ? FT.calculateOrderValue(i) : 0;
          if (((s.active = c > 0), s.active))
            ((s.getComponentInChildren(cc.Label).string = "x" + c),
              Ai(s.find("icon_dcPoint").getComponent(cc.Sprite), FT.getIconPath()));
        }
        var l = this.isSystemOrderDrawer() ? sJ.SYSTEM_AUTO_ORDER : this.data.id;
        nO.createExtra(ZN.OrderDrawerRight, e, { id: t.id, groupID: l, demand: i });
      }
    }),
    (n.prototype.refreshOrderExtraReward = function (e) {
      var t = this;
      this.layout_orders.node.children.forEach(function (i) {
        var n = i.name.split("_");
        if (!(n.length < 2)) {
          var o = parseInt(n[1]);
          if (!(isNaN(o) || (e && o != e.orderId))) {
            var r = fj.GetOrderType(t.data.id),
              a = t.isSystemOrderDrawer()
                ? LF.getOrderConf(sJ.SYSTEM_AUTO_ORDER, o)
                : fj.GetOrderListConf(r, o);
            if (a) {
              var s = i.getChildByName("group");
              nO.removeExtra(ZN.OrderDrawerRight, s);
              var c = t.isSystemOrderDrawer() ? sJ.SYSTEM_AUTO_ORDER : t.data.id;
              nO.createExtra(ZN.OrderDrawerRight, s, { id: o, groupID: c, demand: a.demand });
            }
          }
        }
      });
    }),
    (n.prototype.renderOrder = function (e, t) {
      var i = this;
      if (
        (void 0 === t && (t = null),
        Array.from(this.layout_orders.node.children).forEach(function (e) {
          return ot.PutPrefab(e);
        }),
        !this.data.lock && (!this.data.reward || this.isSystemOrderDrawer()))
      )
        for (
          var n = function (n) {
              var r = e[n];
              if (r.display && r.display.length > 0 && !K6.CheckUnlock(r.display))
                return (
                  r.display
                    .map(function (e) {
                      return K6.ParseUnlockConf(e);
                    })
                    .forEach(function (e, t) {
                      var o = ot.GetPrefab(i.node_order_unlock);
                      ((o.parent = i.layout_orders.node),
                        (o.zIndex = n),
                        (o.name = "order_unlock_" + r.id),
                        (o.getComponentInChildren(cc.Label).string =
                          v.getLabel("order_buildUnlock2")));
                    }),
                  "continue"
                );
              var a = ot.GetPrefab(o.node_order);
              ((a.parent = o.layout_orders.node),
                (a.scale = 1),
                (a.opacity = 255),
                (a.zIndex = n),
                (a.name = "order_" + r.id));
              var s = 0,
                c = 0,
                l = [];
              (l.push(a.getChildByName("orderBG1")),
                l.push(a.getChildByName("orderBG2")),
                l.push(a.getChildByName("orderBG3")),
                (l = l.filter(function (e) {
                  return !!e;
                })).forEach(function (e) {
                  return (e.active = !1);
                }),
                r.need.forEach(function (e, t) {
                  var n = e.item.itemId,
                    o = e.item.value,
                    r = l[c];
                  if (r) {
                    var a = r.getChildByName("icon").getComponent(cc.Sprite),
                      d = r.getChildByName("info");
                    (d.off("click", i.onClickInfo, i),
                      d.on("click", i.onClickInfo, i),
                      (d.children[0].name = "demand_" + n),
                      e.item.itemType != oa.element
                        ? ((d.active = !1),
                          Ai(a, e9.getItemConfig(e.item.itemType).icon, y.None, !1))
                        : ((d.active = !0), Ai(a, e9.getElementTexturePath(n), y.None, !1)));
                    var u = r.getChildByName("num").getComponent(cc.Label),
                      h = r.getChildByName("complete"),
                      p = r.getChildByName("green");
                    ((h.active = !1), (p.active = !1));
                    var f = 0;
                    if (e.item.itemType == oa.element) {
                      var g = b2.GetBoardHaveElement([n], o),
                        v = b2.GetBagHaveElement([n], o);
                      f = g.length + v.length;
                    } else e.item.itemType == oa.energy && (f = E8.role.energy.value);
                    ((u.string = (f > o ? o : f) + "/" + o),
                      f >= o &&
                        (s++,
                        e.item.itemType == oa.energy ? (h.active = !1) : (h.active = !0),
                        (p.active = !0)),
                      c++,
                      (r.active = !0));
                  }
                }),
                (c = 0));
              var d = [];
              (d.push(a.getChildByName("Node").getChildByName("iconbg1")),
                d.push(a.getChildByName("Node").getChildByName("iconbg2")),
                d.forEach(function (e) {
                  return (e.active = !1);
                }),
                r.reward.forEach(function (e, t) {
                  var n = d[t],
                    o = n.getChildByName("icon").getComponent(cc.Sprite),
                    r = n.getChildByName("info");
                  ((r.children[0].name = "reward_" + e.itemId), (r.active = !1));
                  var a = e.itemType;
                  ((o.node.scale = 0.4),
                    a != oa.element
                      ? Ai(o, e9.getItemConfig(a).icon, y.None, !1)
                      : ((r.active = !0),
                        r.off("click", i.onClickInfo, i),
                        r.on("click", i.onClickInfo, i),
                        Ai(o, e9.getElementTexturePath(e.itemId), y.None, !1)));
                  var s = n.getChildByName("num").getComponent(cc.Label);
                  if (((s.node.active = !0), (s.string = "x" + e.value), a == oa.element)) {
                    var c = config.Element.getById(e.itemId);
                    if (c.propEffect) {
                      var l = config.PropEffect.getById(c.propEffect);
                      if (8 == l.effectType)
                        if (8 == e.state && e.value > 0) {
                          var u = e.value;
                          s.string = j(u, !1, !0, 2);
                        } else {
                          u = l.effectValue;
                          s.string = j(u, !1, !0, 2);
                        }
                    }
                  }
                  ((n.active = !0), t++);
                }),
                (a.getChildByName("block").active = !1));
              var u = a.getChildByName("GoBtn"),
                h = a.getChildByName("finishBtn");
              u.getComponentInChildren(cc.Label).string = v.getLabel("common_go");
              var p = h.getChildByName("num"),
                f = h.getChildByName("duigou");
              ((p.active = !1),
                (f.active = !0),
                (u.active = s < r.need.length),
                (h.active = s >= r.need.length),
                u.targetOff(o),
                h.targetOff(o),
                u.on("click", o.onClickGo, o),
                h.on("click", o.onClickReward, o),
                (h.children[0].name = "" + r.id),
                t(a, r));
            },
            o = this,
            r = 0;
          r < e.length;
          r++
        )
          n(r);
    }),
    (n.prototype._parseCondition = function (e) {
      var t = this;
      if (this.data.lock || this.needShowLock || this.data.needManuUnlock) {
        this.layout_conditions.node.active = !0;
        var i = [],
          n = [],
          o = [],
          s = [];
        if (
          (e.forEach(function (e) {
            for (
              var t = eF.praseUnlockType(e),
                i = e.includes("/") && 1 == t.length,
                n = 0,
                o = t.length;
              n < o;
              n++
            ) {
              var r = t[n];
              s.push({ item: r, isComplete: i ? eF.isUnlocked(e) : eF.checkUnlockByItem([r]) });
            }
          }),
          s.forEach(function (e) {
            (o.push(e.item), n.push(e.isComplete));
          }),
          o.forEach(function (e, t) {
            var n = "";
            if (e.itemType == Va.playerLevel)
              n = v.getLabel("orderDrawerItem_levelUnlock", e.itemId);
            else if (e.itemType == Va.finishOrder)
              n = v.getLabel("orderDrawerItem_orderUnlock", UT.getOrderConf(e.itemId).name);
            else if (e.itemType == Va.finishDrawer)
              n = v.getLabel(
                "orderDrawerItem_drawerUnlock",
                config.OrderSeries.getById(e.itemId).title,
              );
            else if (e.itemType == Va.smileTurn) {
              for (var o = "", r = config.OrderSeries.list, a = 0, s = r.length; a < s; a++) {
                var c = r[a];
                if (c && 1 == c.isSystemOrder) {
                  o = c.title;
                  break;
                }
              }
              n = v.getLabel("orderDrawerItem_smileTurn", o, e.itemId);
            } else if (e.itemType == Va.unlockElement) {
              var l = config.Element.getById(e.itemId);
              n = v.getLabel("orderDrawerItem_elementUnlock", l.name);
            } else if (e.itemType == Va.finishBranch) {
              var d = config.OrderBranchList.getById(e.itemId);
              n = v.getLabel("common_complete") + '"' + d.name + '"';
            } else if (e.itemType == Va.finishBranchOrder) {
              var u = null,
                h = "";
              config.OrderBranch.sheetMap.forEach(function (t, i) {
                if (!u && t.get(e.itemId)) {
                  h = i;
                  var n = t.get(e.itemId);
                  u = config.OrderBranchList.getById(n.orderID);
                }
              });
              var p = config.OrderBranch.sheetList.get(h),
                f = 0;
              for (a = 0; a < p.length; a++)
                if (p[a].id == e.itemId) {
                  f = a;
                  break;
                }
              n = v.getLabel("orderDrawerItem_drawerorderUnlock", f + 1, u.name);
            }
            n && i.push({ desc: n, index: t });
          }),
          Array.from(this.layout_conditions.node.children).forEach(function (e) {
            return ot.PutPrefab(e);
          }),
          1 == i.length)
        ) {
          var c = i[0].index,
            l = o[c],
            d = l.itemType == Va.smileTurn ? n[c] : this.data.needManuUnlock;
          this.addCondition(l, i[0].desc, d);
        } else if (i.length > 1) {
          var u = 0;
          i.forEach(function (e) {
            var i = e.index,
              r = e.desc,
              a = n[i];
            (t.addCondition(o[i], u + 1 + "." + r, a), u++);
          });
        }
        var h = cc.find("icon_lock", this.node_lock).getComponent(sp.Skeleton),
          p = cc.find("sp_lock", this.node_lock).getComponent(sp.Skeleton),
          f = cc.find("reddot", this.node_lock);
        if (((p.node.active = !1), (h.node.active = !0), this.data.needManuUnlock)) {
          ((f.active = !0), (this.drawerLockAnimStopFlag = !1));
          this.drawerLockAnimPlayingFlag ||
            r(t, void 0, void 0, function () {
              return a(this, function (e) {
                switch (e.label) {
                  case 0:
                    return this.drawerLockAnimStopFlag
                      ? [3, 2]
                      : ((this.drawerLockAnimPlayingFlag = !0),
                        ib.playAnimation(h, "close", !1, !0),
                        [4, S(3e3)]);
                  case 1:
                    return (e.sent(), [3, 0]);
                  case 2:
                    return (
                      (this.drawerLockAnimPlayingFlag = !1),
                      (this.drawerLockAnimStopFlag = !1),
                      [2]
                    );
                }
              });
            });
        } else
          ((f.active = !1),
            (this.drawerLockAnimStopFlag = !0),
            ib.playAnimation(h, "idle", !1, !0));
        this.layout_conditions.updateLayout();
      } else this.layout_conditions.node.active = !1;
    }),
    (n.prototype.addCondition = function (e, t, i, n) {
      (void 0 === i && (i = !1), void 0 === n && (n = null));
      var o = ot.GetPrefab(this.node_condition);
      (o.removeComponent(cc.Button),
        o.off("click", this.onClickConditionInfo, this),
        (o.parent = n || this.layout_conditions.node),
        (o.children[0].getComponent(JP).string = t),
        (o.children[1].active = e.itemType == Va.unlockElement));
      var r = o.getChildByName("progressCond"),
        a = o.getChildByName("icon_dagou"),
        s = e.itemType == Va.smileTurn && !i;
      ((r.getComponent(JP).string = s ? " " + E8.role.smileTurnCount + "/" + e.itemId : ""),
        (r.active = s),
        (a.active = i),
        e.itemType == Va.unlockElement &&
          (o.addComponent(cc.Button),
          o.on("click", this.onClickConditionInfo, this),
          (o.children[1].name = "info_" + e.itemId)));
    }),
    (n.prototype.branchProgressDisplay = function () {
      var e = this;
      if (2 == fj.GetOrderType(this.data.id)) {
        if (E8.role.branchTask && E8.role.branchTask.id) {
          kz.refreshScroll &&
            ((this._refreshLock = !1), (this._curBranchProgress = 0), (this._curBranchStage = 0));
          var t = fj.GetOrderInfo(this.data.id);
          this.node_branchOrderProgress.active = !0;
          for (var i = 0, n = 0; n < t.progressReward.length + 1; n++) {
            if (!this.node_branchOrderProgresss_content.children[n + 1])
              ot.GetPrefab(this.node_branchOrderProgressItem).parent =
                this.node_branchOrderProgresss_content;
            i++;
          }
          var o = this.node_branchOrderProgresss_content.children.length;
          if (o > i + 1)
            for (n = i + 1; n < o; n++)
              ot.PutPrefab(this.node_branchOrderProgresss_content.children[n]);
          var s = this._refreshLock ? this._curBranchProgress : E8.role.branchTask.progressValue;
          (s && this._refreshLock) || (this._curBranchProgress = E8.role.branchTask.progressValue);
          var c = [];
          for (n = 0; n < t.progressBarStep.length + 1; n++)
            (c.push({ idx: n + 1, progress: s >= t.progressBarStep[n] ? t.progressBarStep[n] : s }),
              (s -= t.progressBarStep[n]) < 0 && (s = 0));
          for (
            var l = !0,
              d = function (i) {
                var n = u.node_branchOrderProgresss_content.children[i];
                if (((n.active = !0), 0 == i)) return "continue";
                var o = c[i - 1],
                  s = t.progressBarStep[i - 1],
                  d = i - 2 >= 0 ? t.progressReward[i - 2] : null,
                  h = n.getChildByName("barParent").getChildByName("bar");
                ((h.parent.active = i < u.node_branchOrderProgresss_content.children.length - 1),
                  h.parent.active && (h.width = (o.progress / s) * 114));
                var p = n.getChildByName("progress_label").getComponent(cc.Label);
                ((p.node.active =
                  CC_DEV &&
                  !F8.isProd &&
                  i < u.node_branchOrderProgresss_content.children.length - 1),
                  (p.string = "" + t.progressBarStep[i - 1]),
                  (n.getChildByName("icon").getChildByName("level").getComponent(cc.Label).string =
                    "" + i));
                var f = null;
                (n.children.forEach(function (e) {
                  f || (e.name.startsWith("reward") && (f = e));
                }),
                  1 == i && (f.active = !1));
                var g = !!d && l,
                  v = f.getChildByName("label_num").getComponent(cc.Label),
                  m = f.getChildByName("bgpic"),
                  _ = f
                    .getChildByName("bgpic")
                    .getChildByName("starbg")
                    .getChildByName("label_star")
                    .getComponent(cc.Label),
                  b = cc.find("bg", f).getComponent(cc.Sprite),
                  w = cc.find("icon_star", b.node).getComponent(cc.Sprite);
                ((f.getChildByName("icon_dagou").active = !g),
                  (m.active = !0),
                  (m.children[0].opacity = g ? 255 : 100),
                  (w.node.opacity = g ? 255 : 100),
                  (v.node.opacity = g ? 255 : 100),
                  t.canSpeacialReward[i - 2]
                    ? Ai(b, "Texture/UI/TimeOrderTask/ui_bg_timeorder_pop_02")
                    : Ai(b, "Texture/UI/TimeOrderTask/ui_bg_timeorder_pop"));
                var C = new Za(),
                  I = 0;
                ((d ? K6.ParseItemsConf(d) : []).forEach(function (e) {
                  e.itemType == oa.star ? (I = e.value) : (C = K6.ItemExchange(e));
                }),
                  (v.string = "x" + C.value),
                  (_.string = "" + I),
                  C.itemType == oa.diamond || C.itemType == oa.coin
                    ? Ai(w, e9.getItemConfig(C.itemType).icon, y.BorderScale, !0)
                    : C.itemType == oa.element
                      ? Ai(w, e9.getElementTexturePath(C.itemId), y.BorderScale, !0)
                      : C.itemType == oa.adornSkin
                        ? Ai(w, e9.getAdornIconPath(C.itemId), y.BorderScale, !0)
                        : Ai(
                            w,
                            e9.getOrderRewardIcon(C.itemType) ||
                              e9.getItemConfig(C.itemType, C.itemId).icon,
                            y.BorderScale,
                            !0,
                          ));
                var T = f.getChildByName("info");
                (T.off("click", u.onClickProgressInfo, u),
                  (T.active = !1),
                  K6.checkItemInfoNode(C, T),
                  C.itemType != oa.diamond &&
                    C.itemType != oa.coin &&
                    C.itemType != oa.cardPoint &&
                    ((T.children[0].name = "stageReward_" + C.itemType + "_" + C.itemId),
                    T.on("click", u.onClickProgressInfo, u)));
                var E = n.getChildByName("icon").getComponent(cc.Sprite);
                (Ai(
                  E,
                  g
                    ? "Texture/UI/TimeOrderTask/icon_to_rankpoint_bg_01"
                    : "Texture/UI/TimeOrderTask/icon_to_rankpoint_bg",
                ),
                  (f.name = "reward_" + (i - 1)),
                  (l = o.progress < s));
                var A = bA.getCurrentData();
                (r(e, void 0, void 0, function () {
                  var e;
                  return a(this, function (t) {
                    switch (t.label) {
                      case 0:
                        return [4, S(33)];
                      case 1:
                        return (
                          t.sent(),
                          (e = 140 * A.stage + 168 - 185),
                          kz.refreshBranchOrder &&
                            (this.node_branchOrderProgresss_content.parent.parent
                              .getComponent(cc.ScrollView)
                              .scrollToOffset(cc.v2(e, 0), 0.3),
                            (kz.refreshBranchOrder = !1)),
                          [2]
                        );
                    }
                  });
                }),
                  (u._curBranchStage = u._refreshLock ? u._curBranchStage : A.stage));
              },
              u = this,
              h = 0;
            h < this.node_branchOrderProgresss_content.children.length;
            h++
          )
            d(h);
        }
      } else this.node_branchOrderProgress.active = !1;
    }),
    (n.prototype.timeOrderProgressDisplay = function () {
      var e = this,
        t = fj.GetOrderType(this.data.id);
      if (
        (kz.refreshScroll &&
          ((this._refreshLock = !1), (this._curProgress = 0), (this._curStage = 0)),
        0 == t || 2 == t)
      )
        return (
          (this._curProgress = 0),
          (this._curStage = 0),
          void (this.node_timeOrderProgress.active = !1)
        );
      var i = aV.getTimeOrderDrawerActData(Math.abs(this.data.id)),
        n = aV.getTimeOrderDrawerData(Math.abs(this.data.id));
      if (n && i) {
        var o = aV.getConf();
        this.node_timeOrderProgress.active = !0;
        for (var s = 0, c = 0; c < o.progressReward.length + 1; c++) {
          if (!this.node_timeOrderProgress_content.children[c + 1])
            ot.GetPrefab(this.node_timeOrderProgressItem).parent =
              this.node_timeOrderProgress_content;
          s++;
        }
        var l = this.node_timeOrderProgress_content.children.length;
        if (l > s + 1)
          for (c = s + 1; c < l; c++) ot.PutPrefab(this.node_timeOrderProgress_content.children[c]);
        var d = this._refreshLock ? this._curProgress : n.progressValue;
        (d && this._refreshLock) || (this._curProgress = n.progressValue);
        var u = [];
        for (c = 0; c < o.progressBarStep.length + 1; c++)
          (u.push({ idx: c + 1, progress: d >= o.progressBarStep[c] ? o.progressBarStep[c] : d }),
            (d -= o.progressBarStep[c]) < 0 && (d = 0));
        for (
          var h = !0,
            p = function (e) {
              var t = f.node_timeOrderProgress_content.children[e];
              if (((t.active = !0), 0 == e)) return "continue";
              var i = u[e - 1],
                n = o.progressBarStep[e - 1],
                r = e - 2 >= 0 ? o.progressReward[e - 2] : null,
                a = t.getChildByName("barParent").getChildByName("bar");
              ((a.parent.active = e < f.node_timeOrderProgress_content.children.length - 1),
                a.parent.active && (a.width = (i.progress / n) * 114));
              var s = t.getChildByName("progress_label").getComponent(cc.Label);
              ((s.node.active =
                CC_DEV && !F8.isProd && e < f.node_timeOrderProgress_content.children.length - 1),
                (s.string = "" + o.progressBarStep[e - 1]),
                (t.getChildByName("icon").getChildByName("level").getComponent(cc.Label).string =
                  "" + e));
              var c = null;
              (t.children.forEach(function (e) {
                c || (e.name.startsWith("reward") && (c = e));
              }),
                1 == e && (c.active = !1));
              var l = !!r && h,
                d = c.getChildByName("label_num").getComponent(cc.Label),
                p = c.getChildByName("bgpic"),
                g = c
                  .getChildByName("bgpic")
                  .getChildByName("starbg")
                  .getChildByName("label_star")
                  .getComponent(cc.Label),
                v = cc.find("bg", c).getComponent(cc.Sprite),
                m = cc.find("icon_star", v.node).getComponent(cc.Sprite);
              ((c.getChildByName("icon_dagou").active = !l),
                (p.active = !0),
                (p.children[0].opacity = l ? 255 : 100),
                (m.node.opacity = l ? 255 : 100),
                (d.node.opacity = l ? 255 : 100),
                o.canSpeacialReward[e - 2]
                  ? Ai(v, "Texture/UI/TimeOrderTask/ui_bg_timeorder_pop_02")
                  : Ai(v, "Texture/UI/TimeOrderTask/ui_bg_timeorder_pop"));
              var _ = new Za(),
                b = 0;
              if (
                ((r ? K6.ParseItemsConf(r) : []).forEach(function (e) {
                  e.itemType == oa.star ? (b = e.value) : (_ = K6.ItemExchange(e));
                }),
                (d.string = "x" + _.value),
                (g.string = "" + b),
                _.itemType == oa.diamond || _.itemType == oa.coin)
              )
                Ai(m, e9.getItemConfig(_.itemType).icon, y.BorderScale, !0);
              else if (_.itemType == oa.element) {
                if (
                  (Ai(m, e9.getElementTexturePath(_.itemId), y.BorderScale, !0),
                  K6.checkIsPropClock(_.itemId))
                ) {
                  var w = K6.getPropClockTime(_.itemId);
                  d.string = j(w, !1, !0, 2);
                }
              } else
                _.itemType == oa.adornSkin
                  ? Ai(m, e9.getAdornIconPath(_.itemId), y.BorderScale, !0)
                  : Ai(
                      m,
                      e9.getOrderRewardIcon(_.itemType) ||
                        e9.getItemConfig(_.itemType, _.itemId).icon,
                      y.BorderScale,
                      !0,
                    );
              var C = c.getChildByName("info");
              (C.off("click", f.onClickProgressInfo, f),
                (C.active = !1),
                _.itemType != oa.diamond &&
                  _.itemType != oa.coin &&
                  _.itemType != oa.cardPoint &&
                  _.itemType != oa.energy &&
                  ((C.active = !0),
                  (C.children[0].name = "stageReward_" + _.itemType + "_" + _.itemId),
                  C.on("click", f.onClickProgressInfo, f)));
              var I = t.getChildByName("icon").getComponent(cc.Sprite);
              (Ai(
                I,
                l
                  ? "Texture/UI/TimeOrderTask/icon_to_rankpoint_bg_01"
                  : "Texture/UI/TimeOrderTask/icon_to_rankpoint_bg",
              ),
                (c.name = "reward_" + (e - 1)),
                (h = i.progress < n));
            },
            f = this,
            g = 0;
          g < this.node_timeOrderProgress_content.children.length;
          g++
        )
          p(g);
        var v = aV.getCurrentData(Math.abs(this.data.id)),
          m = v.stage;
        if (E8.checkActOnceData(i.id, 0)) {
          if (kz.focusItem) {
            var _ = o.progressReward,
              b = kz.focusItem;
            kz.focusItem = null;
            var w = function (e) {
              _[e].forEach(function (t, i) {
                var n = K6.ParseItemConf(i);
                n && n.itemType == b.itemType && n.itemId == b.itemId && (m = e);
              });
            };
            for (c = 0; c < _.length; c++) w(c);
          }
        } else (E8.offActOnceData(i.id, 0), (m = (m = o.firstShowStep - 2) < 0 ? 0 : m));
        (!(function (t) {
          r(e, void 0, void 0, function () {
            var e;
            return a(this, function (i) {
              switch (i.label) {
                case 0:
                  return [4, S(33)];
                case 1:
                  return (
                    i.sent(),
                    (e = 140 * t + 168 - 185),
                    kz.refreshTimeOrder &&
                      (this.node_timeOrderProgress_content.parent.parent
                        .getComponent(cc.ScrollView)
                        .scrollToOffset(cc.v2(e, 0), 0.3),
                      (kz.refreshTimeOrder = !1)),
                    [2]
                  );
              }
            });
          });
        })(m),
          (this._curStage = this._refreshLock ? this._curStage : v.stage));
      } else this.node_timeOrderProgress.active = !1;
    }),
    (n.prototype.branchOrderProgressReward = function (e) {
      return r(this, void 0, void 0, function () {
        var t,
          i,
          n,
          o,
          s,
          c,
          l,
          d,
          h,
          p,
          f,
          g,
          v = this;
        return a(this, function (m) {
          switch (m.label) {
            case 0:
              return (
                (t = j_.getWindowData(F3.OrderDrawerWindow).View).showBlock(),
                (i = fj.GetOrderInfo(this.data.id)),
                0 == (n = bA.getCurrentData()).stage &&
                  0 == n.progress &&
                  0 == n.nextStageStep &&
                  (n = { progress: 1, stage: i.progressBarStep.length, nextStageStep: 0 }),
                (o = this.node_branchOrderProgresss_content.children[n.stage + 1]),
                (s = 140 * n.stage + 168 - 185),
                this.node_branchOrderProgresss_content.parent.parent
                  .getComponent(cc.ScrollView)
                  .scrollToOffset(cc.v2(s, 0), 0.3),
                [4, S(300)]
              );
            case 1:
              if ((m.sent(), (c = 0), !(n.stage > this._curBranchStage))) return [3, 6];
              ((l = function (o) {
                var s, l, h, p;
                return a(this, function (f) {
                  switch (f.label) {
                    case 0:
                      return (
                        (s = d.node_branchOrderProgresss_content.children[o + 2]),
                        (l = d.node_branchOrderProgresss_content.children[o + 1]),
                        s
                          ? ((h = l.getChildByName("barParent").getChildByName("bar")),
                            (p = ((n.progress - n.nextStageStep) / n.progress) * 114),
                            o != n.stage
                              ? [3, 1]
                              : ((c += 300),
                                cc
                                  .tween(h)
                                  .to(0.3, { width: p })
                                  .call(function () {
                                    t.showBlock(!1);
                                  })
                                  .start(),
                                [3, 3]))
                          : ((d._curBranchStage = n.stage),
                            (d._curBranchProgress = E8.role.branchTask.progressValue),
                            [2, "continue"])
                      );
                    case 1:
                      return (
                        (d._curBranchStage = n.stage),
                        (d._curBranchProgress = E8.role.branchTask.progressValue),
                        (c += 500),
                        cc
                          .tween(h)
                          .to(0.3, { width: 114 })
                          .call(function () {
                            return r(v, void 0, void 0, function () {
                              var t, n, r, c, l, d, h, p, f, g, v, m;
                              return a(this, function (a) {
                                switch (a.label) {
                                  case 0:
                                    return (
                                      u.dispatch("updateOrderStar"),
                                      Ai(
                                        s.getChildByName("icon").getComponent(cc.Sprite),
                                        "Texture/UI/TimeOrderTask/icon_to_rankpoint_bg",
                                      ),
                                      (t = null),
                                      s.children.forEach(function (e) {
                                        t || (e.name.startsWith("reward") && (t = e));
                                      }),
                                      rb.playAnimation(
                                        t.getComponent(cc.Animation),
                                        "TimeOrderIdle",
                                      ),
                                      [4, S(1e3)]
                                    );
                                  case 1:
                                    for (
                                      a.sent(),
                                        t.getComponent(cc.Animation).stop(),
                                        t.getChildByName("bg").getChildByName("icon_star").opacity =
                                          100,
                                        t.getChildByName("label_num").opacity = 100,
                                        t.getChildByName("bgpic").active = !0,
                                        t.getChildByName("icon_dagou").active = !0,
                                        n = K6.ParseItemsConf(i.progressReward[o]),
                                        r = e.getData().progressReward,
                                        c = null,
                                        l = null,
                                        d = e.getData().progressReward.find(function (e) {
                                          return e.itemType == oa.card;
                                        }),
                                        h = Array.from(n),
                                        p = [],
                                        f = 0;
                                      f < h.length;
                                      ++f
                                    )
                                      (g = h[f]).itemType == oa.star
                                        ? (c = g)
                                        : g.itemType == oa.adornSkin
                                          ? (l = g)
                                          : g.itemType == oa.adorn
                                            ? n.splice(f, 1)
                                            : p.push(f);
                                    if (
                                      (c &&
                                        ((v = null),
                                        (v =
                                          o9.currentScreen == J8.MERGE_SCREEN
                                            ? Ct.getUI("merge_screen_star")
                                            : Ct.getUI("HomeTaskBtn")),
                                        CS.flyItem(c, s, v, -1, !0)),
                                      !d)
                                    )
                                      return [3, 8];
                                    if (
                                      !r.find(function (e) {
                                        return e.itemType == oa.cardBag;
                                      })
                                    )
                                      return [3, 5];
                                    a.label = 2;
                                  case 2:
                                    return j_.isOpen(F3.CardShowWindow) ? [4, S(330)] : [3, 4];
                                  case 3:
                                    return (a.sent(), [3, 2]);
                                  case 4:
                                    return (ZS.SteppingBagRewards(r), [3, 8]);
                                  case 5:
                                    return (
                                      (m = p.find(function (e) {
                                        return e.itemType == oa.cardPack;
                                      })),
                                      [
                                        4,
                                        j_.showWindow(F3.CardShowWindow, {
                                          rewards: r,
                                          from: "CardPack" + m.itemId,
                                        }),
                                      ]
                                    );
                                  case 6:
                                    return [4, a.sent().waitClose()];
                                  case 7:
                                    (a.sent(), (a.label = 8));
                                  case 8:
                                    return l
                                      ? [4, j_.showWindow(F3.AdornGetWindow, l.itemId)]
                                      : [3, 11];
                                  case 9:
                                    return [4, a.sent().waitClose()];
                                  case 10:
                                    (a.sent(), (a.label = 11));
                                  case 11:
                                    return (K6.showReward({ rewards: p, flyNode: s }), [4, S(500)]);
                                  case 12:
                                    return (a.sent(), [2]);
                                }
                              });
                            });
                          })
                          .start(),
                        [4, S(1300)]
                      );
                    case 2:
                      (f.sent(), (f.label = 3));
                    case 3:
                      return [2];
                  }
                });
              }),
                (d = this),
                (h = this._curBranchStage),
                (m.label = 2));
            case 2:
              return h <= n.stage ? [5, l(h)] : [3, 5];
            case 3:
              (m.sent(), (m.label = 4));
            case 4:
              return (h++, [3, 2]);
            case 5:
              return [3, 7];
            case 6:
              ((p = ((n.progress - n.nextStageStep) / n.progress) * 114),
                (f = o.getChildByName("barParent").getChildByName("bar")),
                cc
                  .tween(f)
                  .to(0.5, { width: p })
                  .call(function () {
                    ((v._curBranchStage = n.stage),
                      (v._curBranchProgress = E8.role.branchTask.progressValue),
                      t.showBlock(!1));
                  })
                  .start(),
                (c += 500),
                (m.label = 7));
            case 7:
              return [4, S(c)];
            case 8:
              return (
                m.sent(),
                n.stage >= i.progressReward.length
                  ? (G2.Board.cells.forEach(function (e) {
                      e.forEach(function (e) {
                        e && e.data && e3.RemoveCellAnim(e, TC.SELECTED_ORDER);
                      });
                    }),
                    (E8.role.branchTask.id && !E8.role.branchTask.curTaskId.length) ||
                    !E8.role.branchTask.id
                      ? E8.role.branchTask.id
                        ? [3, 10]
                        : [4, bw.talk(i.finishDialog)]
                      : [3, 12])
                  : [3, 13]
              );
            case 9:
              (m.sent(), (m.label = 10));
            case 10:
              return (
                (g = j_.getWindowData(F3.OrderDrawerWindow).View) && g.hide(),
                [4, g.waitClose()]
              );
            case 11:
              (m.sent(),
                E8.role.branchTask.haveReward.length &&
                  j_.showWindow(F3.OrderBranchTaskRewardWindow),
                (m.label = 12));
            case 12:
              (t.pauseOrResume(!1), (m.label = 13));
            case 13:
              return [2];
          }
        });
      });
    }),
    (n.prototype.timeOrderProgressReward = function (e) {
      return r(this, void 0, void 0, function () {
        var t,
          i,
          n,
          o,
          s,
          c,
          l,
          d,
          h,
          p,
          f,
          g,
          v,
          m,
          y,
          _,
          b = this;
        return a(this, function (w) {
          switch (w.label) {
            case 0:
              if (
                ((t = aV.getTimeOrderDrawerActData(Math.abs(this.data.id))),
                !(i = aV.getTimeOrderDrawerData(Math.abs(this.data.id))) || !t)
              )
                return ((this.node_timeOrderProgress.active = !1), [2]);
              if (
                ((n = j_.getWindowData(F3.OrderDrawerWindow).View).showBlock(),
                (o = aV.getConf()),
                (s = aV.getCurrentData(Math.abs(this.data.id))),
                (c = this.node_timeOrderProgress_content.children[s.stage + 1]),
                (l = 0),
                !(s.stage > this._curStage))
              )
                return [3, 5];
              (K3.logEvent("limited_stage_finish", {
                activityId: t.content,
                stage: this._curStage + 1,
              }),
                (d = function (t) {
                  var c, d, p, f, g;
                  return a(this, function (v) {
                    switch (v.label) {
                      case 0:
                        return (
                          (c = 140 * t + 168 - 185),
                          h.node_timeOrderProgress_content.parent.parent
                            .getComponent(cc.ScrollView)
                            .scrollToOffset(cc.v2(c, 0), 0.3),
                          [4, S(300)]
                        );
                      case 1:
                        return (
                          v.sent(),
                          (d = h.node_timeOrderProgress_content.children[t + 2]),
                          (p = h.node_timeOrderProgress_content.children[t + 1]),
                          d
                            ? ((f = p.getChildByName("barParent").getChildByName("bar")),
                              (g = ((s.progress - s.nextStageStep) / s.progress) * 114),
                              t != s.stage
                                ? [3, 2]
                                : ((l += 300),
                                  cc
                                    .tween(f)
                                    .to(0.3, { width: g })
                                    .call(function () {
                                      n.showBlock(!1);
                                    })
                                    .start(),
                                  [3, 4]))
                            : ((h._curStage = s.stage),
                              (h._curProgress = i.progressValue),
                              [2, "continue"])
                        );
                      case 2:
                        return (
                          (h._curStage = s.stage),
                          (h._curProgress = i.progressValue),
                          (l += 500),
                          cc
                            .tween(f)
                            .to(0.3, { width: 114 })
                            .call(function () {
                              return r(b, void 0, void 0, function () {
                                var i, n, r, s, c, l, h;
                                return a(this, function (a) {
                                  switch (a.label) {
                                    case 0:
                                      return (
                                        u.dispatch("updateOrderStar"),
                                        Ai(
                                          d.getChildByName("icon").getComponent(cc.Sprite),
                                          "Texture/UI/TimeOrderTask/icon_to_rankpoint_bg",
                                        ),
                                        (i = null),
                                        d.children.forEach(function (e) {
                                          i || (e.name.startsWith("reward") && (i = e));
                                        }),
                                        rb.playAnimation(
                                          i.getComponent(cc.Animation),
                                          "TimeOrderIdle",
                                        ),
                                        [4, S(1e3)]
                                      );
                                    case 1:
                                      return (
                                        a.sent(),
                                        (i.scale = 1),
                                        i.getComponent(cc.Animation).stop(),
                                        (i
                                          .getChildByName("bg")
                                          .getChildByName("icon_star").opacity = 100),
                                        (i.getChildByName("label_num").opacity = 100),
                                        (i.getChildByName("bgpic").active = !0),
                                        (i.getChildByName("icon_dagou").active = !0),
                                        (n = K6.ParseItemsConf(o.progressReward[t])),
                                        e.getData().progressReward,
                                        (r = null),
                                        (s = null),
                                        (c = null),
                                        (l = []),
                                        n.forEach(function (e) {
                                          e.itemType == oa.star
                                            ? (r = e)
                                            : e.itemType == oa.goose
                                              ? (c = e)
                                              : e.itemType == oa.adornSkin
                                                ? (s = e)
                                                : l.push(e);
                                        }),
                                        r &&
                                          ((h = null),
                                          (h =
                                            o9.currentScreen == J8.MERGE_SCREEN
                                              ? Ct.getUI("merge_screen_star")
                                              : Ct.getUI("HomeTaskBtn")),
                                          CS.flyItem(r, d, h, -1, !0)),
                                        s ? [4, j_.showWindow(F3.AdornGetWindow, s.itemId)] : [3, 4]
                                      );
                                    case 2:
                                      return [4, a.sent().waitClose()];
                                    case 3:
                                      (a.sent(), (a.label = 4));
                                    case 4:
                                      return c
                                        ? [4, j_.showWindow(F3.NewGooseWindow, { id: c.itemId })]
                                        : [3, 7];
                                    case 5:
                                      return [4, a.sent().waitClose()];
                                    case 6:
                                      (a.sent(), (a.label = 7));
                                    case 7:
                                      return (
                                        K6.showReward({ rewards: l, flyNode: d }),
                                        [4, S(500)]
                                      );
                                    case 8:
                                      return (a.sent(), [2]);
                                  }
                                });
                              });
                            })
                            .start(),
                          [4, S(1300)]
                        );
                      case 3:
                        (v.sent(), (v.label = 4));
                      case 4:
                        return [2];
                    }
                  });
                }),
                (h = this),
                (p = this._curStage),
                (w.label = 1));
            case 1:
              return p <= s.stage ? [5, d(p)] : [3, 4];
            case 2:
              (w.sent(), (w.label = 3));
            case 3:
              return (p++, [3, 1]);
            case 4:
              return [3, 6];
            case 5:
              ((f = ((s.progress - s.nextStageStep) / s.progress) * 114),
                (g = c.getChildByName("barParent").getChildByName("bar")),
                cc
                  .tween(g)
                  .to(0.5, { width: f })
                  .call(function () {
                    ((b._curStage = s.stage), (b._curProgress = i.progressValue), n.showBlock(!1));
                  })
                  .start(),
                (l += 500),
                (w.label = 6));
            case 6:
              return (
                K6.checkRewardCard(e.getData().progressReward),
                u.dispatch(zb.UPDATE_ENTRANCE_RED_DOT + "_" + t.id),
                [4, S(l)]
              );
            case 7:
              return (
                w.sent(),
                s.stage >= o.progressReward.length
                  ? (G2.Board.cells.forEach(function (e) {
                      e.forEach(function (e) {
                        e && e.data && e3.RemoveCellAnim(e, TC.SELECTED_ORDER);
                      });
                    }),
                    (v = Math.abs(this.data.id)),
                    (m = aV.getTimeOrderDrawerActData(v)),
                    (y = aV.getTimeOrderDrawerData(v)),
                    m && y && !y.endStory
                      ? (HC.removeEntranceByAid(v),
                        [4, j_.getWindowData(F3.CardShowWindow).waitClose()])
                      : [3, 10])
                  : [3, 11]
              );
            case 8:
              return (w.sent(), (_ = aV.getConf()), [4, bw.talk(_.endDialog)]);
            case 9:
              (w.sent(), Vm.actReward({ aid: v, isEnd: !0 }), (w.label = 10));
            case 10:
              (n.pauseOrResume(!1), (w.label = 11));
            case 11:
              return [2];
          }
        });
      });
    }),
    (n.prototype.onClickConditionInfo = function (e) {
      var t = e.node.children[1].name.split("_"),
        i = parseInt(t[1]);
      b2.ShowElementDetail(i, e.node);
    }),
    (n.prototype.onClickAllInfo = function (e) {
      var t = config.OrderSeries.getById(this.data.id),
        i = K6.ParseItemsConf(t.reward),
        n = j_.getWindowData(F3.OrderDrawerWindow).View,
        o = e.node.parent.convertToWorldSpaceAR(e.node.position);
      ((o.x += 55), (o.y += 10), n.showOrderInfo(i, o));
    }),
    (n.prototype.onClickInfo = function (e) {
      var t = e.node.children[0].name.split("_"),
        i = parseInt(t[1]);
      b2.ShowElementDetail(i, e.node);
    }),
    (n.prototype.onClickProgressInfo = function (e) {
      var t = e.node.children[0].name.split("_"),
        i = parseInt(t[2]),
        n = parseInt(t[1]),
        o = new Za();
      ((o.itemType = n), (o.itemId = i), K6.showItemInfo(o));
    }),
    (n.prototype.onClickTip = function () {
      j_.showWindow(F3.OrderDrawerDetailWindow, { id: this.data.id, isScene: this.data.isScene });
    }),
    (n.prototype.onClickSmileRewardTips = function () {
      var e;
      return r(this, void 0, void 0, function () {
        var t;
        return a(this, function (i) {
          return (t = this.getSmileOrderAct()) &&
            (null === (e = t.data) || void 0 === e ? void 0 : e.actData)
            ? t.data.canClaimReward
              ? (j_.hideWindow(F3.OrderDrawerWindow),
                t.data.autoPopupOnComplete
                  ? t.queueClaimWindow(!0)
                  : rK.checkGuideFinished($z.Guide2) && j_.showWindow(F3.SmileOrderWindow),
                [2])
              : (BXe.ShowAsync(this.btn_smile_reward_tips, null, { direction: Bb.UP }), [2])
            : [2];
        });
      });
    }),
    (n.prototype.onClickGo = function () {
      this._netting ||
        (this.data && this.data.isScene
          ? pUe.JumpToInstanceAsync(this.data.id)
          : (j_.hideAllWindow(),
            o9.currentScreen != J8.MERGE_SCREEN && C4.show({ goScreen: J8.MERGE_SCREEN })));
    }),
    (n.prototype.onClickLook = function (e) {
      if (!this._netting) {
        var t = WT.getOrderGroupOrders(this.data.id);
        if (t && t.length) {
          var i = t[0].orderId,
            n = WT.getGroupType(i);
          switch (((kz.refreshScroll = !0), n)) {
            case MT.STACK:
              (K3.logEvent("clickStackOrder", { type: 2 }), lj.openOrderStackWindow(i));
              break;
            case MT.MUSEUM:
              (K3.logEvent("clickMuseum", { type: 2 }),
                j_.showWindow(F3.OrderGroupWindow, { id: i, type: 2 }));
          }
        }
      }
    }),
    (n.prototype.onClickReward = function (e) {
      var t, n, o;
      return r(this, void 0, void 0, function () {
        var s,
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
          I,
          T,
          E,
          A,
          k,
          R,
          P,
          D,
          B,
          L,
          N,
          O,
          x,
          M,
          G,
          F = this;
        return a(this, function (W) {
          switch (W.label) {
            case 0:
              if (this._netting) return [2];
              if (
                ((s = this.isSystemOrderDrawer()),
                (c = fj.GetOrderType(this.data.id)),
                (this._netting = !0),
                (l = j_.getWindowData(F3.OrderDrawerWindow).View).pauseOrResume(),
                (h = parseInt(e.node.children[0].name)),
                (p = e.node.parent.getChildByName("Node")),
                (f = e.node.parent),
                (g = []),
                !(v = s ? LF.getOrderConf(sJ.SYSTEM_AUTO_ORDER, h) : fj.GetOrderListConf(c, h)))
              )
                return ((this._netting = !1), l.pauseOrResume(!1), [2]);
              if (
                ((m = v.reward),
                (y = K6.ParseItemsConf(m)),
                (_ = v.demand),
                (b = K6.ParseItemsConf(_)),
                (w = []),
                (C = []),
                (I = s ? [] : fj.GetOldOrders(c, this.data.id)),
                b.forEach(function (e) {
                  var t = b2.GetBoardHaveElement([e.itemId], e.value);
                  ((0 == t.length || t.length < e.value) &&
                    b2
                      .GetBagHaveElement([e.itemId], 0 == t.length ? e.value : e.value - t.length)
                      .forEach(function (e) {
                        C.push(e);
                      }),
                    t.forEach(function (e) {
                      return g.push(e);
                    }),
                    w.push(e.itemId));
                }),
                !(C.length > 0))
              )
                return [3, 4];
              ((T = 0),
                (E = function (e) {
                  T = e ? 1 : 2;
                }),
                (A = b2.GetElementFromBagId(C)),
                j_.showWindow(F3.FinishOrderTipWindow, { cb: E.bind(this), ele: A }),
                (W.label = 1));
            case 1:
              return 0 != T ? [3, 3] : [4, S(66)];
            case 2:
              return (W.sent(), [3, 1]);
            case 3:
              if (2 == T) return ((this._netting = !1), l.pauseOrResume(!1), [2]);
              W.label = 4;
            case 4:
              return (
                (k = s ? sJ.SYSTEM_AUTO_ORDER : sJ.NORMAL),
                (R = s ? h : this.data.id),
                [
                  4,
                  nO.submitBagElementSecondCheck(
                    ZN.OrderDrawerRight,
                    null === (t = null == p ? void 0 : p.parent) || void 0 === t
                      ? void 0
                      : t.getChildByName("group"),
                    k + "_" + R,
                  ),
                ]
              );
            case 5:
              return W.sent()
                ? ((P = nO.beforeClick(
                    null === (n = null == p ? void 0 : p.parent) || void 0 === n
                      ? void 0
                      : n.getChildByName("group"),
                  )),
                  (D = nO.beforeClick(
                    null,
                    { orderType: k, orderId: h },
                    config.GlobalActType.tennisParty,
                  )),
                  null === (o = null == D ? void 0 : D.extraRewardContexts) ||
                    void 0 === o ||
                    o.forEach(function (e, t) {
                      (P || (P = { extraRewardContexts: new Map() }),
                        P.extraRewardContexts || (P.extraRewardContexts = new Map()),
                        P.extraRewardContexts.set(t, e));
                    }),
                  TJ.SetBoardElementWaitDispose(g, !0),
                  (B = this.data.id >= 0 ? UT.getDrawerNeedShowOrders(this.data.orders) : []),
                  (L = s
                    ? this.getSystemAutoOrderNeedShowData().map(function (e) {
                        return e.id;
                      })
                    : []),
                  (N = function (e, t) {
                    return r(F, void 0, void 0, function () {
                      var n,
                        o,
                        m,
                        _,
                        b,
                        C,
                        T,
                        E,
                        A,
                        k,
                        R,
                        D,
                        N,
                        O,
                        x,
                        M,
                        G,
                        F,
                        W,
                        U,
                        H,
                        V,
                        j,
                        z,
                        K,
                        q,
                        Y,
                        X,
                        J,
                        Q,
                        Z,
                        $ = this;
                      return a(this, function (ee) {
                        switch (ee.label) {
                          case 0:
                            return t
                              ? ((this._netting = !1),
                                e.error && A8.Toast({ title: e.error }),
                                cc.isValid(this, !0) && cc.isValid(l, !0) && l.pauseOrResume(!1),
                                [2])
                              : [3, 1];
                          case 1:
                            return (
                              (n =
                                (null === (K = e.getData()) || void 0 === K ? void 0 : K.rewards) ||
                                []),
                              nO.onFinishRequest(
                                ZN.OrderDrawerRight,
                                null === (q = null == p ? void 0 : p.parent) || void 0 === q
                                  ? void 0
                                  : q.getChildByName("group"),
                                { serverRewards: n, beforeClick: P },
                              ),
                              s &&
                                ((o =
                                  null ===
                                    (X =
                                      null === (Y = null == p ? void 0 : p.parent) || void 0 === Y
                                        ? void 0
                                        : Y.getChildByName("group")) || void 0 === X
                                    ? void 0
                                    : X.children.find(function (e) {
                                        return (
                                          nO.getNodeType(e) == config.GlobalActType.tennisParty
                                        );
                                      })),
                                wF.processTennisPartyOrderAnimation(!0, o)),
                              (m = this.data.id),
                              (_ = []),
                              (b = s ? v : fj.GetOrderListConf(c, h))
                                ? ((C = y.filter(function (e) {
                                    return e.itemType != oa.masterMatchPoint;
                                  })).length > 0 && K6.showReward({ rewards: C, flyNode: p }),
                                  this.flyMasterMatchPoint(p, y),
                                  wF.processDiamondGooseReward(p, !this.data.isScene, h, b.demand),
                                  wF.processRoutineCheckReward(p),
                                  (T = {
                                    orderType: s ? sJ.SYSTEM_AUTO_ORDER : sJ.NORMAL,
                                    orderId: h,
                                    demand: b.demand,
                                    reward: y,
                                    serverRewards: n,
                                    beforeClick: P,
                                    submittedCellIndices: g,
                                  }),
                                  nO.collectExtra(
                                    ZN.OrderDrawerRight,
                                    null === (J = null == p ? void 0 : p.parent) || void 0 === J
                                      ? void 0
                                      : J.getChildByName("group"),
                                    { data: T },
                                  ),
                                  (E = nO.getExtraRewardItem(config.GlobalActType.tennisParty)),
                                  (A = !1),
                                  (k = function () {
                                    !A &&
                                      E &&
                                      ((A = !0), E.collect(ZN.OrderDrawerRight, null, { data: T }));
                                  }),
                                  (R = nO.getExtraItemTypes(
                                    null === (Q = null == p ? void 0 : p.parent) || void 0 === Q
                                      ? void 0
                                      : Q.getChildByName("group"),
                                  )),
                                  (D =
                                    null === (Z = null == p ? void 0 : p.parent) || void 0 === Z
                                      ? void 0
                                      : Z.getChildByName("group")) &&
                                    (N = D.getChildByName("routineCheck2")) &&
                                    N.active &&
                                    R.push(oa.routineCheckIIPoint),
                                  (O = function () {
                                    return r($, void 0, void 0, function () {
                                      var t,
                                        n,
                                        o,
                                        p,
                                        f,
                                        v,
                                        y,
                                        b,
                                        C,
                                        I,
                                        T,
                                        E,
                                        A,
                                        R,
                                        P,
                                        D,
                                        B,
                                        L = this;
                                      return a(this, function (N) {
                                        switch (N.label) {
                                          case 0:
                                            if (
                                              (d.emit(i.UpdateMainOrderInfo),
                                              u.dispatch("updateBranchOrder"),
                                              s ||
                                                0 != _.length ||
                                                0 != E8.role.branchTask.curTaskId.length ||
                                                bA.haveOrderFinish(!0),
                                              b2.RemoveBoardElement(g),
                                              k(),
                                              d.emit(i.RefreshDrawerItem),
                                              b2
                                                .GetBoardHaveElementIncludeBubble(w)
                                                .forEach(function (e) {
                                                  var t = G$.GetCellByIndex(e);
                                                  (e3.RemoveCellAnim(t, TC.SELECTED_ORDER),
                                                    e3.RemoveCellAnim(t, TC.SELECTED_BRANCH_ORDER));
                                                }),
                                              s
                                                ? K3.logEvent("finish_system_auto_order", {
                                                    orderId: h,
                                                  })
                                                : this.data.id >= 0 &&
                                                  ((t = h < 0 ? null : UT.getBoardOrder(h)),
                                                  (n = t ? t.id : h),
                                                  K3.logEvent("finish_order", {
                                                    orderId: h,
                                                    ordertype: uJ.praseOrderType(n, h).toString(),
                                                  }),
                                                  UT.isFinishAllDrawer() &&
                                                    this.onFinishAllDrawer()),
                                              !s &&
                                                this.data.id < 0 &&
                                                (1 == c
                                                  ? ((o = Math.abs(this.data.id)),
                                                    (p = aV.getTimeOrderDrawerActData(o)),
                                                    (f = aV.getTimeOrderDrawerData(o)),
                                                    K3.logEvent("limited_order_finish", {
                                                      activityId: p ? p.content : "",
                                                      orderId: h,
                                                    }),
                                                    p &&
                                                      f &&
                                                      f.isNewbie &&
                                                      ((A = aV.getConf()),
                                                      bw.talk(A.finishFirstTaskDialog),
                                                      Vm.actReward({ aid: o, isEnd: !1 })))
                                                  : 2 == c &&
                                                    (K3.logEvent("branch_order_finish", {
                                                      orderId: h,
                                                    }),
                                                    (v = fj.GetOrderInfo(this.data.id)),
                                                    v.recycleOrderId == h &&
                                                      this.recycleBoardElement(v)),
                                                (this._refreshLock = !0)),
                                              u.dispatch("refreshDrawerItem", this.data.id),
                                              (y = []),
                                              s || 1 != c
                                                ? s ||
                                                  2 != c ||
                                                  (u.dispatch("updateChannelInfo", !0),
                                                  y.push(this.branchOrderProgressReward(e)))
                                                : (u.dispatch("updateChannelInfo", !0),
                                                  y.push(this.timeOrderProgressReward(e))),
                                              _.length)
                                            ) {
                                              for (
                                                b = !1, C = 0;
                                                C < this.layout_orders.node.children.length;
                                                C++
                                              )
                                                ((I = this.layout_orders.node.children[C]),
                                                  (T = parseInt(I.name.split("_")[1])),
                                                  _.includes(T) &&
                                                    (I.getComponent(cc.Animation).play(
                                                      "TimeOrderTask_Show",
                                                    ),
                                                    (b = !0)));
                                              b && y.push(S(66));
                                            }
                                            return [4, Promise.all(y)];
                                          case 1:
                                            if (
                                              (N.sent(),
                                              !s && this.data.id < 0 && (this._refreshLock = !1),
                                              l.pauseOrResume(!1, !0),
                                              u.dispatch("updateChannelInfo", !0),
                                              !s &&
                                                this.data.id >= 0 &&
                                                ((E = config.OrderDialog.getById(h)) &&
                                                  !o8.isRunning() &&
                                                  bw.talk(E.FinishTask),
                                                d.emit(i.FinishMainOrder, { orderId: h }),
                                                (A = UT.getOrderConf(h)) &&
                                                  A.recycleElementSeries &&
                                                  A.recycleElementSeries.length > 0 &&
                                                  b2.RecycleBoardElement(
                                                    A.recycleElementSeries,
                                                    A.recycleChangeTo,
                                                  )),
                                              !s && 2 == c)
                                            )
                                              for (
                                                R = fj.GetOrderInfo(m), P = 0;
                                                P < R.finishOrderDialog.length;
                                                P++
                                              )
                                                if (
                                                  ((D = R.finishOrderDialog[P].split(":")),
                                                  parseInt(D[0]) == h)
                                                ) {
                                                  bA.showTalk(2, P, parseInt(D[1]));
                                                  break;
                                                }
                                            return (
                                              (this._netting = !1),
                                              (null ==
                                              (B = nC.getFirstActByType(
                                                config.GlobalActType.tennisParty,
                                              ))
                                                ? void 0
                                                : B.tryQueuePendingStageUpPopupImmediately()) &&
                                                (function () {
                                                  return r(L, void 0, void 0, function () {
                                                    return a(this, function (e) {
                                                      switch (e.label) {
                                                        case 0:
                                                          return [4, S(400)];
                                                        case 1:
                                                          return (
                                                            e.sent(),
                                                            j_.hideWindow(F3.OrderDrawerWindow),
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
                                  G2.RefreshBoardCache(),
                                  s
                                    ? (this.getSystemAutoOrderNeedShowData().forEach(function (e) {
                                        L.includes(e.id) || _.push(e.id);
                                      }),
                                      f.getComponent(cc.Animation).play("TimeOrderTask_Hide"),
                                      [4, S(300)])
                                    : [3, 4])
                                : ((this._netting = !1), l.pauseOrResume(!1), [2])
                            );
                          case 2:
                            return (ee.sent(), [4, O()]);
                          case 3:
                            return (ee.sent(), [3, 9]);
                          case 4:
                            return this.data.id >= 0
                              ? (UT.refreshDrawerData(),
                                UT.isDrawerFinished(this.data.id)
                                  ? ((this.label_progress.string = "100%"),
                                    (x = f.height),
                                    f.children.forEach(function (e) {
                                      e.active = !1;
                                    }),
                                    cc
                                      .tween(f)
                                      .to(0.3, { height: 0 }, { easing: cc.easing.sineInOut })
                                      .start(),
                                    cc
                                      .tween(this.node_progress)
                                      .to(0.4, { width: 545 })
                                      .call(function () {
                                        return r($, void 0, void 0, function () {
                                          return a(this, function (e) {
                                            return (
                                              fj.needAutoRewardDrawerArr.push({
                                                id: this.data.id,
                                                immediate: !0,
                                              }),
                                              O(),
                                              [2]
                                            );
                                          });
                                        });
                                      })
                                      .start(),
                                    [4, S(300)])
                                  : [3, 6])
                              : [3, 8];
                          case 5:
                            return (
                              ee.sent(),
                              (f.active = !1),
                              (f.height = x),
                              f.children.forEach(function (e) {
                                e.active = !0;
                              }),
                              [3, 7]
                            );
                          case 6:
                            for (
                              this._data = UT.getDrawerData(this.data.id),
                                M = UT.getDrawerNeedShowOrders(this.data.orders),
                                G = 0;
                              G < M.length;
                              G++
                            ) {
                              for (F = M[G], W = F.id, U = 0; U < B.length; U++)
                                if (B[U].id == F.id) {
                                  W = -1;
                                  break;
                                }
                              -1 != W && _.push(W);
                            }
                            ((H = 0),
                              (V = this.data.orders.size),
                              this.data.orders.forEach(function (e, t) {
                                e && H++;
                              }),
                              (j = ~~((H / V) * 1e3) / 1e3) > 1 && (j = 1),
                              (this.label_progress.string = Math.floor(100 * j) + "%"),
                              f.getComponent(cc.Animation).play("TimeOrderTask_Hide"),
                              cc
                                .tween(this.node_progress)
                                .to(0.4, { width: 545 * j })
                                .call(function () {
                                  O();
                                })
                                .start(),
                              (ee.label = 7));
                          case 7:
                            return [3, 9];
                          case 8:
                            (1 == c
                              ? ((z = aV.getTimeOrderDrawerData(Math.abs(this.data.id))) &&
                                  z.curTaskId.forEach(function (e) {
                                    I.includes(e) || _.push(e);
                                  }),
                                O())
                              : 2 == c &&
                                (UT.refreshDrawerData(),
                                E8.role.branchTask.curTaskId.forEach(function (e) {
                                  I.includes(e) || _.push(e);
                                }),
                                O()),
                              (ee.label = 9));
                          case 9:
                            return [2];
                        }
                      });
                    });
                  }),
                  (O = function (e, t) {
                    return r(F, void 0, void 0, function () {
                      return a(this, function (i) {
                        switch (i.label) {
                          case 0:
                            return [4, N(e, t)];
                          case 1:
                            return (i.sent(), IF.completePresentation(e), [2]);
                        }
                      });
                    });
                  }),
                  (x = V8.getVibrateCount(oa.diamond, b.length)) > 0 &&
                    d.emit(i.MultipleVibate, {
                      type: by.Light,
                      count: x,
                      intervals: [0, 10, 10, 10],
                      source: "OrderDrawerItem.flyReward",
                    }),
                  s
                    ? ((M = tF.parseOrderId(h).id),
                      (G = tF.getConfId(M, E8.role.systemAutoOrder.orderQueues)),
                      TJ.BoardRequestSend(
                        IF.requestCompleteSystemOrder,
                        {
                          boardId: G2.Data.id,
                          orderId: G,
                          indexes: g,
                          bagItemIds: C,
                          timestamp: E8.serverTime,
                        },
                        "finishSystemAutoOrder",
                        O.bind(this),
                      ))
                    : this.data.id >= 0
                      ? h < 0
                        ? TJ.BoardRequestSend(
                            ry.completeReturnOrder,
                            {
                              boardId: G2.Data.id,
                              orderId: h,
                              indexes: g,
                              bagItemIds: C,
                              timestamp: E8.serverTime,
                            },
                            "finishOrder",
                            O.bind(this),
                          )
                        : TJ.BoardRequestSend(
                            hm.completeOrder,
                            {
                              boardId: G2.Data.id,
                              orderId: UT.getBoardOrder(h).id,
                              indexes: g,
                              bagItemIds: C,
                              timestamp: E8.serverTime,
                            },
                            "finishOrder",
                            O.bind(this),
                          )
                      : 1 == c
                        ? TJ.BoardRequestSend(
                            Vm.taskComplete,
                            { aid: Math.abs(this.data.id), taskId: h, indexes: g, bagItemIds: C },
                            "finishTimeOrder",
                            O.bind(this),
                          )
                        : TJ.BoardRequestSend(
                            Sv.taskComplete,
                            { taskId: h, indexes: g, bagItemIds: C },
                            "finishBranchOrder",
                            O.bind(this),
                          ),
                  [2])
                : ((this._netting = !1), l.pauseOrResume(!1), [2]);
          }
        });
      });
    }),
    (n.prototype.onClickLock = function (e) {
      return r(this, void 0, void 0, function () {
        var t,
          i,
          n = this;
        return a(this, function (o) {
          switch (o.label) {
            case 0:
              return this.data.needManuUnlock
                ? ((t = cc.find("icon_lock", this.node_lock).getComponent(sp.Skeleton)),
                  (i = cc.find("sp_lock", this.node_lock).getComponent(sp.Skeleton)),
                  (cc.find("reddot", this.node_lock).active = !1),
                  (this.drawerLockAnimStopFlag = !0),
                  (function () {
                    return r(n, void 0, void 0, function () {
                      return a(this, function (e) {
                        switch (e.label) {
                          case 0:
                            return (Ne.lockStage("UnlockDrawer"), [4, S(2e3)]);
                          case 1:
                            return (e.sent(), Ne.unlockStage("UnlockDrawer"), [2]);
                        }
                      });
                    });
                  })(),
                  ib.playAnimation(t, "open", !1, !0),
                  [4, S(1e3)])
                : [3, 2];
            case 1:
              return (
                o.sent(),
                j8.play(o_.MERGEPASS_UNLOCK),
                ib.playAnimation(i, "idle", !1, !0),
                o8.isRunning() ||
                  xz.finishing ||
                  j_.showWindow(F3.OrderDrawerUnlockWindow, { id: this.data.id }),
                [3, 3]
              );
            case 2:
              (e.node.getComponent(cc.Animation).play(),
                A8.Toast({ title: v.getLabel("tip_NotCondition") }),
                (o.label = 3));
            case 3:
              return [2];
          }
        });
      });
    }),
    (n.prototype.onClickOrderLock = function (e) {
      return r(this, void 0, void 0, function () {
        var t;
        return a(this, function (i) {
          return (
            (t = e.target) && t.getComponent(cc.Animation).play(),
            A8.Toast({ title: v.getLabel("tip_NotCondition") }),
            [2]
          );
        });
      });
    }),
    (n.prototype.onClickGog = function () {
      return r(this, void 0, void 0, function () {
        var e, t, i, n, o, r, s, c, l, d, h, p;
        return a(this, function (a) {
          switch (a.label) {
            case 0:
              return this._netting
                ? [2]
                : (e = UT.getDrawerNeedShowOrders(this.data.orders)) && e.length
                  ? ((n = e[0]),
                    j_.hideWindow(F3.OrderDrawerWindow),
                    (o = n.id),
                    (r = E8.role.goGOrders),
                    (s = UT.getServerIdByOrderId(o)),
                    (c = null == r ? void 0 : r.get(s)),
                    r && r.has(s)
                      ? [3, 2]
                      : ((this._netting = !0), [4, Sm.startGame({ orderType: 0, orderId: s })]))
                  : ((t = !1),
                    (i = -1),
                    this.data.orders.forEach(function (e, n) {
                      if (!e && !t) {
                        t = !0;
                        for (
                          var o = config.Order.getById(n), r = null == o ? void 0 : o.unlock, a = 0;
                          a < r.length;
                          ++a
                        ) {
                          var s = r[a];
                          s.startsWith("PlayerLevel") && (i = parseInt(s.match(/[0-9]\d*/)[0]));
                        }
                      }
                    }),
                    A8.Toast({ title: v.getLabel("mainGog_tips", i) }),
                    [2]);
            case 1:
              return (
                a.sent(),
                (this._netting = !1),
                j_.currentWindow == F3.GOGWindow
                  ? [2]
                  : ((dG.showAnim = !0),
                    j_.showWindow(F3.GOGWindow, {
                      taskId: s,
                      mainData: { orderType: Aq.MAIN, orderId: s },
                    }),
                    [3, 5])
              );
            case 2:
              return Pq.checkMainGogFinish(c)
                ? ((this._netting = !0),
                  [
                    4,
                    hm.completeOrder({
                      boardId: G2.Data.id,
                      orderId: s,
                      indexes: [],
                      bagItemIds: [],
                      timestamp: E8.serverTime,
                    }),
                  ])
                : [3, 4];
            case 3:
              return (
                (l = a.sent()),
                (this._netting = !1),
                l.code
                  ? (A8.Toast({ title: l.error }), [2])
                  : (u.dispatch("updateOrderInfo"),
                    (d = UT.getOrderConf(o)),
                    (h = d.reward),
                    (p = K6.ParseItemsConf(h)),
                    K6.showReward({ rewards: p }, !0),
                    [3, 5])
              );
            case 4:
              (j_.showWindow(F3.GOGWindow, {
                taskId: s,
                mainData: { orderType: Aq.MAIN, orderId: s },
              }),
                (a.label = 5));
            case 5:
              return [2];
          }
        });
      });
    }),
    (n.prototype.onClickAllReward = function (e, t, i) {
      var n;
      return (
        void 0 === i && (i = !1),
        r(this, void 0, void 0, function () {
          var e, o, r, c;
          return a(this, function (a) {
            switch (a.label) {
              case 0:
                if (this._netting) return [2];
                if ((t || (t = this.data.id), s.lockingRewardId.get(t))) return [2];
                (s.lockingRewardId.set(t, !0), (a.label = 1));
              case 1:
                return s.drawerRewardNetting ? [4, S(100)] : [3, 3];
              case 2:
                return (a.sent(), [3, 1]);
              case 3:
                return (
                  (this._netting = !0),
                  (s.drawerRewardNetting = !0),
                  (e = j_.getWindowData(F3.OrderDrawerWindow).View).pauseOrResume(),
                  [4, fj.claimDrawerReward(t)]
                );
              case 4:
                return (
                  (o = a.sent()),
                  s.lockingRewardId.set(t, !1),
                  (this._netting = !1),
                  o.code
                    ? (A8.Toast({ title: o.error }), (s.drawerRewardNetting = !1), [2])
                    : (i
                        ? K3.logEvent("drawer_reward_get_auto", { id: t })
                        : K3.logEvent("drawer_get_reward", { id: t }),
                      e.pauseOrResume(!1),
                      (r = fj.getDrawerDisplayRewards(
                        t,
                        null !== (n = o.getData().rewards) && void 0 !== n ? n : [],
                      )),
                      (c = !!r.find(function (e) {
                        return e.itemType == oa.star;
                      })),
                      [4, fj.showDrawerRewards(r)])
                );
              case 5:
                return (a.sent(), (s.drawerRewardNetting = !1), c ? [4, S(1e3)] : [3, 7]);
              case 6:
                (a.sent(), (a.label = 7));
              case 7:
                return (u.dispatch("updateOrderInfo"), [2]);
            }
          });
        })
      );
    }),
    (n.prototype.refreshDrawerItem = function (e) {
      this.data && this.data.id == e && ((this._cache = null), this.updateDataOnly());
    }),
    (n.prototype.flyMasterMatchPoint = function (e, t) {
      return r(this, void 0, void 0, function () {
        var i, n, o, r, s, c;
        return a(this, function (a) {
          switch (a.label) {
            case 0:
              return (i =
                null == t
                  ? void 0
                  : t.find(function (e) {
                      return e.itemType == oa.masterMatchPoint;
                    }))
                ? (iF.updateAllRankInfo(),
                  (n = Ne.getLayer(Be.TIP)),
                  (o = Ct.getUI("MasterMatchBtn")),
                  e && n && o && o.parent && o.activeInHierarchy
                    ? ((r = n.convertToNodeSpaceAR(e.convertToWorldSpaceAR(cc.Vec2.ZERO))),
                      (s = n.convertToNodeSpaceAR(o.parent.convertToWorldSpaceAR(o.position))),
                      (c = e9.getItemConfig(oa.masterMatchPoint)),
                      [4, CS.flyIconHorizon(c.icon, cc.v2(r), cc.v2(s), n, cc.v2(48, 48), i.value)])
                    : (u.dispatch($G.FINISH_ORDER, !0), [2]))
                : [2];
            case 1:
              return (a.sent(), u.dispatch($G.FINISH_ORDER, !0), [2]);
          }
        });
      });
    }),
    (n.prototype.refreshCache = function () {
      ((this._cache = null),
        this._systemAutoOrderDescCache.clear(),
        this.updateSmileProgressDisplay());
    }),
    (n.prototype.onFinishAllDrawer = function () {
      nC.instance.updateStageByType(config.GlobalActType.MasterMatch);
    }),
    (n.prototype.recycleBoardElement = function (e) {
      var t = e.recycleElementSeries,
        i = e.recycleChangeTo;
      (G2.Data.cells.forEach(function (e) {
        if (e.elementId) {
          var n = config.Element.getById(e.elementId);
          if (t.includes(n.series)) {
            var o = G$.GetCellByIndex(e.index),
              r = GW.ParseCellConfig(
                { id: i, state: mr.none, seed: e.seed, productType: vr.none },
                e.index,
              );
            o.data = r;
          }
        }
      }),
        G2.Data.bag.items.forEach(function (e, n) {
          if (e.elementId) {
            var o = config.Element.getById(e.elementId);
            if (t.includes(o.series)) {
              var r = new ll();
              ((r.index = -1), (r.elementId = i), (r.seed = e.seed), G2.Data.bag.items.set(n, r));
            }
          }
        }),
        G2.Data.bag.mpItems.forEach(function (e, n) {
          if (e.elementId) {
            var o = config.Element.getById(e.elementId);
            if (t.includes(o.series)) {
              var r = new ll();
              ((r.index = -1), (r.elementId = i), (r.seed = e.seed), G2.Data.bag.mpItems.set(n, r));
            }
          }
        }),
        G2.Data.bag.passNewItems.forEach(function (e, n) {
          if (e.elementId) {
            var o = config.Element.getById(e.elementId);
            if (t.includes(o.series)) {
              var r = new ll();
              ((r.index = -1),
                (r.elementId = i),
                (r.seed = e.seed),
                G2.Data.bag.passNewItems.set(n, r));
            }
          }
        }),
        G2.Data.bag.producerItems.forEach(function (e, n) {
          if (e.elementId) {
            var o = config.Element.getById(e.elementId);
            if (t.includes(o.series)) {
              var r = new ll();
              ((r.index = -1),
                (r.elementId = i),
                (r.seed = e.seed),
                G2.Data.bag.producerItems.set(n, r));
            }
          }
        }),
        G2.Data.channel.forEach(function (e, i) {
          if (e.itemId && e.itemType == oa.element) {
            var n = config.Element.getById(e.itemId);
            t.includes(n.series) && G2.Data.channel.delete(i);
          }
        }),
        G2.Data.bag.wasteBasket.forEach(function (e, i) {
          if (e.elementId) {
            var n = config.Element.getById(e.elementId);
            t.includes(n.series) && G2.Data.bag.wasteBasket.delete(i);
          }
        }));
    }),
    (n.drawerRewardNetting = !1),
    (n.lockingRewardId = new Map()),
    o([OXe(cc.Node)], n.prototype, "btn_tip", void 0),
    o([OXe(cc.Node)], n.prototype, "btn_all_info", void 0),
    o([OXe(cc.Node)], n.prototype, "node_lock", void 0),
    o([OXe(cc.Node)], n.prototype, "node_progress", void 0),
    o([OXe(cc.Label)], n.prototype, "label_title", void 0),
    o([OXe(cc.Label)], n.prototype, "label_desc", void 0),
    o([OXe(cc.Label)], n.prototype, "label_progress", void 0),
    o([OXe(cc.Label)], n.prototype, "label_time", void 0),
    o([OXe(cc.Node)], n.prototype, "node_progress_parent", void 0),
    o([OXe(cc.Layout)], n.prototype, "layout_orders", void 0),
    o([OXe(cc.Node)], n.prototype, "node_order", void 0),
    o([OXe(cc.Node)], n.prototype, "node_order_parent", void 0),
    o([OXe(cc.Node)], n.prototype, "node_time", void 0),
    o([OXe(cc.Node)], n.prototype, "btn_reward", void 0),
    o([OXe(cc.Node)], n.prototype, "node_smile_progress", void 0),
    o([OXe(cc.ProgressBar)], n.prototype, "pg_smile_reward", void 0),
    o([OXe(cc.Label)], n.prototype, "label_smile_progress", void 0),
    o([OXe(sp.Skeleton)], n.prototype, "spine_smile_progress", void 0),
    o([OXe(cc.Node)], n.prototype, "btn_smile_reward_tips", void 0),
    o([OXe(cc.Sprite)], n.prototype, "sprite_bg", void 0),
    o([OXe(cc.Layout)], n.prototype, "layout_conditions", void 0),
    o([OXe(cc.Node)], n.prototype, "node_condition", void 0),
    o([OXe(cc.Node)], n.prototype, "node_timeOrderProgress", void 0),
    o([OXe(cc.Node)], n.prototype, "node_timeOrderProgress_content", void 0),
    o([OXe(cc.Node)], n.prototype, "node_timeOrderProgressItem", void 0),
    o([OXe(cc.Node)], n.prototype, "node_branchOrderProgress", void 0),
    o([OXe(cc.Node)], n.prototype, "node_branchOrderProgresss_content", void 0),
    o([OXe(cc.Node)], n.prototype, "node_branchOrderProgressItem", void 0),
    o([OXe(cc.Node)], n.prototype, "node_gog", void 0),
    o([OXe(cc.Node)], n.prototype, "node_orderGroup", void 0),
    o([OXe(cc.Node)], n.prototype, "node_order_unlock", void 0),
    o([OXe(cc.Node)], n.prototype, "node_orderGroupSubmit", void 0),
    o([OXe(cc.Node)], n.prototype, "node_orderGroupLook", void 0),
    o([Jb(i.RefreshDrawerItem)], n.prototype, "setDisplay", null),
    o([Jb(i.RefreshDrawerExtraReward)], n.prototype, "refreshOrderExtraReward", null),
    (n = s = o([NXe], n)));
})($_),
  cc._RF.pop());
