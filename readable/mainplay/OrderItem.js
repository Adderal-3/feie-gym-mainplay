// Extracted cached Cocos registration: OrderItem
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 2042860..2073955.
// Shared closure variables remain in readable/game.formatted.js:99693.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "e61ebCEIwhMWbsL/wNwh1Oj", "OrderItem");
var OF,
  xF,
  MF = cc._decorator,
  GF = MF.ccclass,
  FF = MF.property;
(!(function (e) {
  ((e[(e.orderLockScene = 0)] = "orderLockScene"),
    (e[(e.manualUnlockScene = 1)] = "manualUnlockScene"),
    (e[(e.orderDrawerScene = 2)] = "orderDrawerScene"),
    (e[(e.dailyTradesScene = 3)] = "dailyTradesScene"),
    (e[(e.drawerRewardScene = 4)] = "drawerRewardScene"),
    (e[(e.orderScene = 5)] = "orderScene"),
    (e[(e.orderGroupScene = 6)] = "orderGroupScene"));
})(OF || (OF = {})),
  (function (e) {
    ((e[(e.normal = 0)] = "normal"),
      (e[(e.challenge = 1)] = "challenge"),
      (e[(e.groupBtn = 2)] = "groupBtn"));
  })(xF || (xF = {})));
var WF = (function () {
    function e() {
      ((this.type = OF.orderScene), (this.node = null));
    }
    return (
      o([FF({ type: cc.Enum(OF), tooltip: "场景类型" })], e.prototype, "type", void 0),
      o([FF({ type: cc.Node, tooltip: "对应场景节点" })], e.prototype, "node", void 0),
      (e = o([GF("OrderItemSceneGroup")], e))
    );
  })(),
  UF = (function () {
    function e() {
      ((this.type = xF.normal), (this.node = null));
    }
    return (
      o([FF({ type: cc.Enum(xF), tooltip: "完成按钮类型" })], e.prototype, "type", void 0),
      o([FF({ type: cc.Node, tooltip: "对应完成按钮节点" })], e.prototype, "node", void 0),
      (e = o([GF("OrderItemFinishGroup")], e))
    );
  })(),
  HF = (function (e) {
    function s() {
      var t = (null !== e && e.apply(this, arguments)) || this;
      return (
        (t.sceneGroups = []),
        (t.node_goose = null),
        (t.layout_demandParent = null),
        (t.node_demandItem = null),
        (t.node_rewardItem = null),
        (t.node_background = null),
        (t.node_foreground = null),
        (t.bottomCover = null),
        (t.normalBottom = null),
        (t.node_time = null),
        (t.node_leftTopReward = null),
        (t.node_leftBottomReward = null),
        (t.node_bottomRightReward = null),
        (t.node_bottomReward = null),
        (t.node_topReward = null),
        (t.topRewardLayout = null),
        (t.node_bubbleReward = null),
        (t.finishGroups = []),
        (t.label_debug = null),
        (t.normalBg = null),
        (t._finishCount = 0),
        (t._isFinish = !1),
        (t._finishBtn = null),
        (t._needSystemOrderExtraRefresh = !1),
        (t._completionAnimation = null),
        (t._leftTimeClock = null),
        (t._ownsLeftTimeClock = !1),
        (t._model = null),
        (t._rewardItemPool = null),
        (t._demandItemPool = null),
        (t._demandBackgroundColor = "#FFDE92"),
        (t._orderNodesInitialized = !1),
        (t._activePlugin = null),
        (t._pluginListeners = new Map()),
        (t._sceneNodeMap = new Map()),
        (t._finishButtonMap = new Map()),
        (t._finishEnabled = !0),
        (t._rewardsVisible = !0),
        (t._extraRewardsEnabled = !0),
        (t._gooseSpineState = null),
        (t._rewardMap = new Map()),
        t
      );
    }
    var c;
    return (
      t(s, e),
      (c = s),
      Object.defineProperty(s.prototype, "rewardItemPool", {
        get: function () {
          return (
            this._rewardItemPool || (this._rewardItemPool = VA(this.node_rewardItem)),
            this._rewardItemPool
          );
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(s.prototype, "demandItemPool", {
        get: function () {
          return (
            this._demandItemPool || (this._demandItemPool = VA(this.node_demandItem)),
            this._demandItemPool
          );
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(s.prototype, "data", {
        get: function () {
          return this._data;
        },
        set: function (e) {
          ((this._data = e), this.setDisplay());
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(s.prototype, "isFinish", {
        get: function () {
          return this._isFinish;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(s.prototype, "finishCount", {
        get: function () {
          return this._finishCount;
        },
        set: function (e) {
          var t,
            i = this;
          if (this._data && this._data instanceof Zc && this.orderConf)
            if (this._finishEnabled) {
              var n = this.orderConf.demand,
                o = n.size,
                s = e == o && !this._isFinish;
              if (
                (e > this._finishCount && e < o && j8.play(o_.TIP_ORDER_ELEMENT),
                (this._finishCount = e),
                this._finishCount != o || this._isFinish)
              )
                this._finishCount < n.size &&
                  this._isFinish &&
                  (this._finishBtn && (this._finishBtn.active = !1), (this._isFinish = !1));
              else {
                if (this._finishBtn) {
                  ((this._finishBtn.active = !0),
                    (this._finishBtn.scale = 1),
                    Ct.onUIState(this._finishBtn, It.DisActive));
                  r(i, void 0, void 0, function () {
                    return a(this, function (e) {
                      switch (e.label) {
                        case 0:
                          return (
                            (this._finishBtn.getComponent(cc.Button).interactable = !1),
                            [4, rb.playAnimation(this._finishBtn.getComponent(cc.Animation))]
                          );
                        case 1:
                          return (
                            e.sent(),
                            (this._finishBtn.getComponent(cc.Button).interactable = !0),
                            Ct.onUIState(this._finishBtn, It.Active),
                            [2]
                          );
                      }
                    });
                  });
                }
                ((this._isFinish = !0), j8.play(o_.TIP_ORDER));
              }
              (null === (t = this._activePlugin) || void 0 === t ? void 0 : t.onRefreshFinishState)
                ? this._activePlugin.onRefreshFinishState(this.node, s)
                : G2.BoardRender.orderInfo.refresh(s, !1, "order", this.data.orderId);
            } else this._finishCount = e;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(s.prototype, "orderConf", {
        get: function () {
          return uJ.praseOrderConf(this.orderType, this.data.orderId);
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(s.prototype, "orderType", {
        get: function () {
          return uJ.praseOrderType(this.data.id, this.data.orderId);
        },
        enumerable: !1,
        configurable: !0,
      }),
      (s.prototype.onLoad = function () {
        (e.prototype.onLoad.call(this), this.initOrderNodes());
        for (var t = this.node.getComponentsInChildren(cc.Widget), i = 0, n = t.length; i < n; i++)
          t[i].keepEnabledOnViewShow = !0;
        Wt.orderIdxLabel.push(this.label_debug);
      }),
      (s.prototype.initOrderNodes = function () {
        if (!this._orderNodesInitialized) {
          this._orderNodesInitialized = !0;
          for (var e = this.sceneGroups, t = 0, i = e.length; t < i; t++) {
            (o = e[t]).node &&
              (this._sceneNodeMap.set(o.type, o.node), o.node.on("click", this.onClickOrder, this));
          }
          var n = this.finishGroups;
          for (t = 0, i = n.length; t < i; t++) {
            var o;
            (o = n[t]).node &&
              (this._finishButtonMap.set(o.type, o.node),
              o.node.on("click", this.onClickFinish, this));
          }
          (this._rewardMap.set(ZN.OrderItemLeftTop, [this.node_leftTopReward]),
            this.node_leftBottomReward &&
              this._rewardMap.set(ZN.OrderItemLeftBottom, [this.node_leftBottomReward]),
            this._rewardMap.set(ZN.OrderItemBottom, [this.node_bottomReward, this.node_topReward]),
            this.node_bottomRightReward &&
              this._rewardMap.set(ZN.OrderItemBottomRight, [this.node_bottomRightReward]),
            this._rewardMap.set(ZN.OrderItemBubble, [this.node_bubbleReward]));
        }
      }),
      (s.prototype.onEnable = function () {
        (this.scheduleOnce(this.refreshOrderLayout, 0),
          u.add("DailyChallengeRefresh", this.refreshOrderTopExtra, this),
          u.add("updateDailyChallenge", this.refreshOrderTopExtra, this),
          u.add(zb.NEW_ELEMENT_CREATE, this.onBoardChanged, this),
          u.add(zb.ON_MANUAL_CREATE, this.onElementCreated, this),
          u.add(zb.ON_AUTO_CREATE, this.onElementCreated, this),
          u.add(zb.ON_ELEMENT_MERGE, this.onElementCreated, this));
      }),
      (s.prototype.onBoardChanged = function (e) {
        var t, i;
        null ===
          (i = null === (t = this._activePlugin) || void 0 === t ? void 0 : t.onBoardChanged) ||
          void 0 === i ||
          i.call(t, this.node, e);
      }),
      (s.prototype.onElementCreated = function (e) {
        var t, i;
        null ===
          (i = null === (t = this._activePlugin) || void 0 === t ? void 0 : t.onElementCreated) ||
          void 0 === i ||
          i.call(t, this.node, e);
      }),
      (s.prototype.setDisplay = function () {
        var e, t, i, n, o;
        if (o9.currentScreen == J8.MERGE_SCREEN) {
          this.initOrderNodes();
          var r = LF.getPlugin(this.orderType);
          if (
            (this._activePlugin !== r &&
              (this.clearPluginListeners(),
              null ===
                (t = null === (e = this._activePlugin) || void 0 === e ? void 0 : e.onDisable) ||
                void 0 === t ||
                t.call(e, this.node),
              (this._activePlugin = r)),
            this.resetDisplayState(),
            this.defaultActive(),
            this.setFinishBtn(xF.normal),
            c.gmPreviewGooseId > 0)
          )
            this.renderGooseSpine(c.gmPreviewGooseId);
          else if (null == r ? void 0 : r.getGooseSpineConfig) {
            var a = r.getGooseSpineConfig();
            this.renderOrderSpine(a.path, a.animation, void 0, a.offset);
          } else {
            var s =
              this.data.gooseId ||
              (YF.isSystemAutoOrderTokenType(this.orderType)
                ? null === (i = YF.getOrderPointSource(this.orderType, this.data.orderId)) ||
                  void 0 === i
                  ? void 0
                  : i.gooseId
                : 0);
            s > 0 && this.renderGooseSpine(s);
          }
          ((null == r ? void 0 : r.onRender) ? r.onRender(this.node) : this.renderOrder(),
            this.node.active &&
              (this.renderTime(
                null !==
                  (o =
                    null === (n = null == r ? void 0 : r.getSyncTimeName) || void 0 === n
                      ? void 0
                      : n.call(r)) && void 0 !== o
                  ? o
                  : "",
              ),
              this.renderDebugLabel(),
              uJ.clearFinishOrderMap(this.orderType, this.data.orderId),
              this.refreshOrderLayout()));
        }
      }),
      (s.prototype.loadBackground = function (e, t, i) {
        var n;
        (void 0 === i && (i = "#FFDE92"), (this._demandBackgroundColor = i));
        for (var o = this.layout_demandParent.children, r = 0, a = o.length; r < a; r++)
          null === (n = o[r].getComponent(BF)) || void 0 === n || n.setNormalBackgroundColor(i);
        (Ai(
          (this.node_foreground.active ? this.node_foreground : this.node_background).getComponent(
            cc.Sprite,
          ),
          e,
        ),
          this.bottomCover &&
            ((this.bottomCover.enabled = !!t),
            t ? Ai(this.bottomCover, t) : (this.bottomCover.spriteFrame = null)));
      }),
      (s.prototype.resetDisplayState = function () {
        ((this._demandBackgroundColor = "#FFDE92"),
          this.resetGooseSpine(),
          this.clearLeftTimeClock(),
          this.node_time && (this.node_time.active = !1),
          (this._finishBtn = null),
          (this._isFinish = !1),
          (this._finishCount = 0),
          (this._finishEnabled = !0),
          (this._needSystemOrderExtraRefresh = !1),
          (this._extraRewardsEnabled = !0),
          (this.node_background.active = !0),
          (this.node_foreground.active = !1));
        var e = this.node_background.getComponent(cc.Sprite);
        ((e.curUrl = ""),
          (this.node_foreground.getComponent(cc.Sprite).curUrl = ""),
          this.normalBg && (e.spriteFrame = this.normalBg),
          this.bottomCover &&
            ((this.bottomCover.curUrl = ""),
            (this.bottomCover.spriteFrame = this.normalBottom),
            (this.bottomCover.enabled = null != this.normalBottom)));
      }),
      (s.prototype.clear = function () {
        (this.resetDisplayState(), this.defaultActive());
      }),
      (s.prototype.onDisable = function () {
        var e, t;
        ((this._completionAnimation = null),
          this.unschedule(this.refreshOrderLayout),
          u.remove("DailyChallengeRefresh", this.refreshOrderTopExtra, this),
          u.remove("updateDailyChallenge", this.refreshOrderTopExtra, this),
          u.remove(zb.NEW_ELEMENT_CREATE, this.onBoardChanged, this),
          u.remove(zb.ON_MANUAL_CREATE, this.onElementCreated, this),
          u.remove(zb.ON_AUTO_CREATE, this.onElementCreated, this),
          u.remove(zb.ON_ELEMENT_MERGE, this.onElementCreated, this),
          this.clearPluginListeners(),
          null === (t = null === (e = this._activePlugin) || void 0 === e ? void 0 : e.onDisable) ||
            void 0 === t ||
            t.call(e, this.node),
          (this._activePlugin = null),
          this.clear());
      }),
      (s.prototype.onDestroy = function () {
        var e, t;
        ((this._gooseSpineState = null),
          this.clearPluginListeners(),
          this.clearLeftTimeClock(),
          null === (e = this._demandItemPool) || void 0 === e || e.Destroy(),
          (this._demandItemPool = null),
          null === (t = this._rewardItemPool) || void 0 === t || t.Destroy(),
          (this._rewardItemPool = null),
          this._sceneNodeMap.clear(),
          this._finishButtonMap.clear(),
          this._rewardMap.clear());
      }),
      (s.prototype.renderGooseSpine = function (e) {
        return r(this, void 0, void 0, function () {
          var t, i;
          return a(this, function (n) {
            switch (n.label) {
              case 0:
                return (null == (t = config.Goose.getById(e)) ? void 0 : t.icon)
                  ? ((i = e9.getSpinePath("Goose/" + t.icon.split("_").join(""))),
                    [4, this.renderOrderSpine(i, "z_idle", t.scalingRatio || void 0)])
                  : [2];
              case 1:
                return (n.sent(), [2]);
            }
          });
        });
      }),
      (s.prototype.renderOrderSpine = function (e, t, i, n) {
        var o, s, c;
        return r(this, void 0, void 0, function () {
          var r, l, d, u, p, f;
          return a(this, function (a) {
            switch (a.label) {
              case 0:
                if (
                  !(r =
                    null === (o = this.node_goose) || void 0 === o
                      ? void 0
                      : o.getComponent(sp.Skeleton)) ||
                  !e
                )
                  return [2];
                ((l = this._gooseSpineState),
                  (d = {
                    skeletonData: l ? l.skeletonData : r.skeletonData,
                    animation: l ? l.animation : r.animation,
                    scaleX: l ? l.scaleX : r.node.scaleX,
                    scaleY: l ? l.scaleY : r.node.scaleY,
                    position: l ? l.position : r.node.position.clone(),
                  }),
                  (u = this.data),
                  (this._gooseSpineState = d),
                  (a.label = 1));
              case 1:
                return (a.trys.push([1, 3, , 4]), [4, Si(e)]);
              case 2:
                return !(p = a.sent()) ||
                  !cc.isValid(this.node, !0) ||
                  !cc.isValid(r, !0) ||
                  this._gooseSpineState !== d ||
                  this.data !== u ||
                  ((null == u ? void 0 : u.endTime) > 0 && u.endTime <= E8.serverTime)
                  ? [2]
                  : ((r.skeletonData = p),
                    r.node.setPosition(
                      d.position.x +
                        (null !== (s = null == n ? void 0 : n.x) && void 0 !== s ? s : 0),
                      d.position.y +
                        (null !== (c = null == n ? void 0 : n.y) && void 0 !== c ? c : 0),
                      d.position.z,
                    ),
                    r.node.setScale(null != i ? i : d.scaleX, null != i ? i : d.scaleY),
                    ib.playAnimation(r, t, !0, !0),
                    [3, 4]);
              case 3:
                return (
                  (f = a.sent()),
                  h.warn("[OrderItem] Load goose Spine failed", e, f),
                  [3, 4]
                );
              case 4:
                return [2];
            }
          });
        });
      }),
      (s.prototype.resetGooseSpine = function () {
        var e,
          t = this._gooseSpineState;
        if (((this._gooseSpineState = null), t)) {
          var i =
            null === (e = this.node_goose) || void 0 === e ? void 0 : e.getComponent(sp.Skeleton);
          cc.isValid(i, !0) &&
            ((i.skeletonData = t.skeletonData),
            i.node.setScale(t.scaleX, t.scaleY),
            i.node.setPosition(t.position),
            t.skeletonData && t.animation && ib.playAnimation(i, t.animation, !0, !0),
            (this.node_goose.active = !0));
        }
      }),
      (s.prototype.listenPluginNotification = function (e, t, i) {
        var n = this,
          o = this.getPluginListeners("notification:" + e);
        if (!o.has(t)) {
          var r = t.bind(i, this.node);
          (u.add(e, r, this),
            o.set(t, function () {
              return u.remove(e, r, n);
            }));
        }
      }),
      (s.prototype.listenPluginEvent = function (e, t, i) {
        var n = this,
          o = this.getPluginListeners("event:" + e);
        if (!o.has(t)) {
          var r = t.bind(i, this.node);
          (d.on(e, r, this.node),
            o.set(t, function () {
              return d.off(e, r, n.node);
            }));
        }
      }),
      (s.prototype.getPluginListeners = function (e) {
        var t = this._pluginListeners.get(e);
        return (t || ((t = new Map()), this._pluginListeners.set(e, t)), t);
      }),
      (s.prototype.clearPluginListeners = function () {
        (this._pluginListeners.forEach(function (e) {
          return e.forEach(function (e) {
            return e();
          });
        }),
          this._pluginListeners.clear());
      }),
      (s.prototype.getRewardNodes = function () {
        var e;
        return ((null === (e = this.node_bottomReward) || void 0 === e ? void 0 : e.children) || [])
          .concat(this.node_topReward.children)
          .filter(function (e) {
            return cc.isValid(e, !0) && (null != nO.getNodeType(e) || null != e.getComponent(_b));
          });
      }),
      (s.prototype.getNormalRewardItems = function () {
        return this.getRewardNodes()
          .filter(function (e) {
            return null == nO.getNodeType(e);
          })
          .map(function (e) {
            return e.getComponent(_b);
          })
          .filter(function (e) {
            return null != e;
          });
      }),
      (s.prototype.setRewardsVisible = function (e) {
        ((this._rewardsVisible = e),
          (this.node_topReward.active = e),
          this.node_bottomReward && (this.node_bottomReward.active = e),
          this.node_bottomRightReward && (this.node_bottomRightReward.active = e));
      }),
      (s.prototype.refreshRewardLayout = function () {
        var e, t;
        if (this.node_bottomReward) {
          for (
            var i = Math.max(
                1,
                (null === (t = null === (e = this.orderConf) || void 0 === e ? void 0 : e.demand) ||
                void 0 === t
                  ? void 0
                  : t.size) || 0,
              ),
              n = Math.min(4, 3 + 1 * (i - 1)),
              o = this.getRewardNodes()
                .filter(function (e) {
                  return e.active;
                })
                .map(function (e, t) {
                  var i,
                    n = null === (i = e.getComponent(_b)) || void 0 === i ? void 0 : i.itemData,
                    o = nO.getNodeType(e) || (n ? fb.FormatItemKey(n.itemType, 0, !0) : null);
                  return {
                    node: e,
                    index: t,
                    priority: o
                      ? nO.getRewardSortIndex(o, ZN.OrderItemBottom)
                      : Number.MAX_SAFE_INTEGER,
                  };
                })
                .sort(function (e, t) {
                  return e.priority - t.priority || e.index - t.index;
                }),
              r = this.node_rewardItem.x,
              a = this.node_rewardItem.y,
              s = o,
              c = 0,
              l = s.length;
            c < l;
            c++
          ) {
            var d = s[c].node,
              u = c < n,
              h = u ? this.node_bottomReward : this.node_topReward;
            (d.parent !== h && (d.parent = h), u ? d.y !== a && (d.y = a) : d.x !== r && (d.x = r));
            var p = u ? c : c - n;
            d.getSiblingIndex() !== p && d.setSiblingIndex(p);
          }
          ((this.node_bottomReward.active =
            this._rewardsVisible &&
            this.node_bottomReward.children.some(function (e) {
              return e.active;
            })),
            (this.node_topReward.active =
              this._rewardsVisible &&
              this.node_topReward.children.some(function (e) {
                return e.active;
              })),
            this.refreshOrderLayout());
        }
      }),
      (s.prototype.refreshTopRewardLayout = function () {
        var e = this.node_topReward;
        this.topRewardLayout &&
          (null == e ? void 0 : e.activeInHierarchy) &&
          (e.children.filter(function (e) {
            return cc.isValid(e, !0) && e.activeInHierarchy;
          }),
          this.topRewardLayout.setNodes(e.children, 1));
      }),
      (s.prototype.refreshBubbleRewardPadding = function () {
        var e = this.node_bubbleReward;
        if (cc.isValid(e, !0)) {
          var t = e.getComponent(cc.Layout);
          if (t) {
            var i =
              e.childrenCount >= 2 &&
              this.node_topReward.childrenCount > 0 &&
              1 == this.layout_demandParent.childrenCount;
            t.paddingLeft = i ? 0 : 20;
          }
        }
      }),
      (s.prototype.refreshOrderLayout = function () {
        (this.refreshBubbleRewardPadding(), x(this.node), this.refreshTopRewardLayout());
        var e = this._finishBtn,
          t = this.layout_demandParent;
        if (
          (null == e ? void 0 : e.parent) &&
          e === this.getFinishButton(xF.normal) &&
          (null == t ? void 0 : t.activeInHierarchy)
        ) {
          for (var i = 1 / 0, n = -1 / 0, o = t.children, r = 0, a = o.length; r < a; r++) {
            var s = o[r];
            if (s.active) {
              var c = s.getBoundingBox();
              ((i = Math.min(i, c.xMin)), (n = Math.max(n, c.xMax)));
            }
          }
          if (i !== 1 / 0) {
            var l = t.convertToWorldSpaceAR(cc.v2((i + n) / 2, 0));
            e.x = e.parent.convertToNodeSpaceAR(l).x;
          }
        }
      }),
      (s.prototype.getSceneNode = function (e) {
        var t;
        return null !== (t = this._sceneNodeMap.get(e)) && void 0 !== t ? t : null;
      }),
      (s.prototype.showScene = function (e) {
        this._sceneNodeMap.forEach(function (e) {
          e.active = !1;
        });
        var t = this.getSceneNode(e);
        t && (t.active = !0);
      }),
      (s.prototype.setFinishBtn = function (e) {
        (this.hideFinishButtonDiamondIcons(),
          this._finishButtonMap.forEach(function (e) {
            e.active = !1;
          }),
          (this._finishEnabled = !0),
          (this._finishBtn = this.getFinishButton(e)),
          this._finishBtn && RT.isOrderValid(this.orderConf) && LT.addDiamondIcon(this._finishBtn));
      }),
      (s.prototype.hideFinishButtonDiamondIcons = function () {
        this._finishButtonMap.forEach(function (e) {
          var t = e.getChildByName("icon: diamond");
          t && (t.active = !1);
        });
      }),
      (s.prototype.disableFinishButton = function () {
        (this._finishButtonMap.forEach(function (e) {
          e.active = !1;
        }),
          (this._finishEnabled = !1),
          (this._finishBtn = null));
      }),
      (s.prototype.getFinishButton = function (e) {
        var t;
        return (
          void 0 === e && (e = xF.normal),
          null !== (t = this._finishButtonMap.get(e)) && void 0 !== t ? t : null
        );
      }),
      (s.prototype.renderOrder = function (e) {
        var t, i;
        void 0 === e && (e = xF.normal);
        var n = this.orderConf;
        if (n) {
          var o = this._activePlugin || LF.getPlugin(this.orderType),
            r =
              null !==
                (i =
                  null === (t = null == o ? void 0 : o.getSelectAnim) || void 0 === t
                    ? void 0
                    : t.call(o, this.node)) && void 0 !== i
                ? i
                : TC.SELECTED_ORDER;
          (this.showScene(OF.orderScene),
            (this.layout_demandParent.active = !0),
            null == e ? this.disableFinishButton() : this.setFinishBtn(e),
            this.renderReward(n.reward),
            this.renderDemand(n.demand, r));
        }
      }),
      (s.prototype.onClickOrder = function () {
        var e,
          t = this._activePlugin || LF.getPlugin(this.orderType);
        null === (e = null == t ? void 0 : t.onClickOrder) || void 0 === e || e.call(t, this.node);
      }),
      (s.prototype.defaultActive = function () {
        (this.hideFinishButtonDiamondIcons(),
          this._rewardMap.forEach(function (e, t) {
            nO.removeExtra(t, e);
          }),
          zA(this.demandItemPool, this.layout_demandParent));
        for (
          var e = this.rewardItemPool, t = this.getNormalRewardItems(), i = 0, n = t.length;
          i < n;
          i++
        )
          e.Put(t[i].node);
        this.setRewardsVisible(!0);
      }),
      (s.prototype.clearLeftTimeClock = function () {
        var e, t;
        (null === (e = this._leftTimeClock) || void 0 === e || e.removeCallBack(this),
          this._ownsLeftTimeClock &&
            (null === (t = this._leftTimeClock) || void 0 === t || t.dispose()),
          (this._leftTimeClock = null),
          (this._ownsLeftTimeClock = !1));
      }),
      (s.prototype.renderTime = function (e) {
        var t,
          i,
          n,
          o,
          r,
          a,
          s,
          c = this;
        this.clearLeftTimeClock();
        var l = this.node_time;
        if (
          l &&
          ((l.active = !1),
          !(
            !1 ===
              (null ===
                (i =
                  null === (t = this._activePlugin) || void 0 === t
                    ? void 0
                    : t.shouldDisplayTime) || void 0 === i
                ? void 0
                : i.call(t, this.node)) ||
            !(null === (n = this.data) || void 0 === n ? void 0 : n.endTime) ||
            E8.serverTime >= this.data.endTime ||
            this.data.endTime <= 0
          ))
        ) {
          if (
            ((l.active = !0),
            (this._leftTimeClock =
              null !==
                (a =
                  null ===
                    (r = null === (o = this._activePlugin) || void 0 === o ? void 0 : o.getClock) ||
                  void 0 === r
                    ? void 0
                    : r.call(o, this.node)) && void 0 !== a
                ? a
                : null),
            !this._leftTimeClock)
          ) {
            var d = (this.data.endTime - E8.serverTime) / 1e3;
            ((this._leftTimeClock = b.addClock(
              "orderItemLeftTime_" + this.data.id + "_" + this.data.orderId,
              d,
              1e3,
              1,
            )),
              (this._ownsLeftTimeClock = !0),
              !(null === (s = this._activePlugin) || void 0 === s ? void 0 : s.getClock) &&
                e &&
                "" != e &&
                b.syncClock(this._leftTimeClock.id, e));
          }
          this._leftTimeClock.registCallBack(
            this,
            function () {
              var e;
              (null === (e = c._activePlugin) || void 0 === e ? void 0 : e.onTimeOver)
                ? c._activePlugin.onTimeOver(c.node)
                : (UT.refreshDrawerData(),
                  G2.Board.cells.forEach(function (e) {
                    e.forEach(function (e) {
                      e && e.data && e3.RemoveCellAnim(e, TC.SELECTED_ORDER);
                    });
                  }),
                  u.dispatch("updateOrderInfo"),
                  j_.hideWindow(F3.FinishOrderTipWindow));
            },
            function (e) {
              l.getComponentInChildren(cc.Label).string = j(e.leftSecond, !1, !0, 2);
            },
          );
        }
      }),
      (s.prototype.renderDemand = function (e, t, i) {
        var n = this;
        (void 0 === i && (i = "OrderItemBtn_" + this.data.orderId),
          this._finishBtn && (this._finishBtn.name = i));
        var o = [];
        (e.forEach(function (i, r) {
          o.push({ id: parseInt(r), num: e.get(r), order: n, selectAnim: t });
        }),
          o.forEach(function (e, t) {
            var i = n.demandItemPool.Get();
            i.parent = n.layout_demandParent;
            var o = i.getComponent(BF);
            ((o.data = e), o.setNormalBackgroundColor(n._demandBackgroundColor));
          }),
          this.refreshOrderLayout(),
          this._finishBtn &&
            (this._finishBtn.getComponent(kt) || this._finishBtn.addComponent(kt),
            this._finishBtn.active && Ct.onUIState(this._finishBtn, It.Active)));
      }),
      (s.prototype.renderReward = function (e, t) {
        var i = this;
        (void 0 === t && (t = !0),
          (this._extraRewardsEnabled = t),
          this.setRewardsVisible(!0),
          this._rewardMap.forEach(function (e, t) {
            var n = t == ZN.OrderItemBottom ? i.node_topReward : e[0];
            i.createOrderExtraReward(t, n);
          }));
        var n = [],
          o = this._activePlugin || LF.getPlugin(this.orderType);
        (K6.ParseItemsConf(e)
          .filter(function (e) {
            var n = [oa.dCTaskVal, oa.maskChallengePoint, oa.diveChallengePoint];
            return (
              (!t || !n.includes(e.itemType)) &&
              (!(null == o ? void 0 : o.shouldDisplayReward) || o.shouldDisplayReward(e, i.node))
            );
          })
          .forEach(function (e) {
            var t = i.rewardItemPool.Get(),
              o = t.getComponent(_b);
            ((o.data = e), (o.node.name = "rewardItem_" + e.itemType), n.push(t));
          }),
          n.forEach(function (e) {
            e.parent = i.node_topReward;
          }),
          this.refreshRewardLayout());
      }),
      (s.prototype.createOrderExtraReward = function (e, t) {
        var i = this;
        if (this._extraRewardsEnabled) {
          var n = nO.createExtra(e, t, { item: this });
          !n ||
            (e != ZN.OrderItemBottom && e != ZN.OrderItemBubble && e != ZN.OrderItemLeftTop) ||
            n.then(function (e) {
              e && cc.isValid(i.node, !0) && i.node.activeInHierarchy && i.refreshRewardLayout();
            });
        }
      }),
      (s.prototype.renderDebugLabel = function () {
        var e = this.orderConf;
        if (
          ((this.label_debug.node.active = Wt.showOrderIdx),
          Ft.needShowDiamond && (null == e ? void 0 : e.demand))
        ) {
          var t = "";
          (e.demand.forEach(function (e, i) {
            var n = config.Element.getById(parseInt(i));
            n && (t += Ft.searchEleDiamond(n.id) * e + " " + n.series + "\n");
          }),
            (this.label_debug.string = t));
        } else {
          this.label_debug.string = "" + this.data.orderId;
          var i = LF.getPlugin(this.orderType);
          ((null == i ? void 0 : i.renderDebugLabel) &&
            i.renderDebugLabel(this.label_debug, this.data.orderId),
            CF.appendSystemCostDebug(this.label_debug, this.orderType, this.data));
        }
      }),
      (s.prototype.markSystemOrderExtraRefresh = function () {
        this._needSystemOrderExtraRefresh = !0;
      }),
      (s.prototype.consumeSystemOrderExtraRefresh = function () {
        var e = this._needSystemOrderExtraRefresh;
        return ((this._needSystemOrderExtraRefresh = !1), e);
      }),
      (s.prototype.getCompletionAnimation = function () {
        return this._completionAnimation;
      }),
      (s.prototype.onClickFinish = function () {
        var e, t;
        return r(this, void 0, void 0, function () {
          var o,
            s,
            c,
            l,
            p,
            f,
            g,
            v,
            m,
            y,
            _,
            w,
            C,
            I,
            S,
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
            M = this;
          return a(this, function (G) {
            switch (G.label) {
              case 0:
                return !Tq.isFinishInit || xz.touchPause
                  ? [2]
                  : M_.wsDelegate.connectionState != Ro.Reconnecting || o8.isRunning()
                    ? ((o = this._activePlugin || LF.getPlugin(this.orderType)),
                      (
                        null === (e = null == o ? void 0 : o.onClickFinishButton) || void 0 === e
                          ? void 0
                          : e.call(o, this.node)
                      )
                        ? [2]
                        : this._isFinish
                          ? (s = b.getClock("ChannelCleanUpLock")) && s.running
                            ? [2]
                            : (G2.PauseTip(),
                              G2.TouchPause(),
                              (xz.finishing = !0),
                              (c = []),
                              (l = []),
                              (p = []),
                              (f = this.layout_demandParent.children.map(function (e) {
                                return e.getComponent(BF);
                              })).forEach(function (e) {
                                (e.getFinishElements().forEach(function (e) {
                                  return c.push(e);
                                }),
                                  p.push(e),
                                  e.useBagElement.length &&
                                    e.useBagElement.forEach(function (e) {
                                      return l.push(e);
                                    }));
                              }),
                              [
                                4,
                                wF.confirmOrderCompletion(
                                  l,
                                  ZN.OrderItemBottom,
                                  this._rewardMap.get(ZN.OrderItemBottom),
                                  this.orderType + "_" + this.data.orderId,
                                ),
                              ])
                          : [2])
                    : [2];
              case 1:
                return G.sent()
                  ? ((g = new Map()),
                    this._rewardMap.forEach(function (e, t) {
                      g.set(t, nO.beforeClick(e, M));
                    }),
                    p.forEach(function (e) {
                      e.pauseCheck = !0;
                    }),
                    TJ.SetBoardElementWaitDispose(c, !0),
                    uJ.cacheFinishOrderState(this.node),
                    (v = this.data.id),
                    (m = this.data.orderId),
                    (y = this.orderConf),
                    (_ = this.orderType),
                    (w = this.data),
                    (C = this._finishBtn),
                    (I = nO.getExtraRewardItem(rO.CardBuff)),
                    (S = null == I ? void 0 : I.captureSubmitAnimation(this)),
                    (T = !1),
                    (E = function () {
                      T || ((T = !0), G2.TouchResume());
                    }),
                    (A = null),
                    (k = function () {
                      return (
                        A ||
                          ((A = r(M, void 0, void 0, function () {
                            var e, t, i, n, o;
                            return a(this, function (r) {
                              switch (r.label) {
                                case 0:
                                  return cc.isValid(this.node, !0) &&
                                    this.node.activeInHierarchy &&
                                    cc.isValid(C, !0) &&
                                    this.data === w &&
                                    (null === (n = this.data) || void 0 === n ? void 0 : n.id) ===
                                      v &&
                                    (null === (o = this.data) || void 0 === o
                                      ? void 0
                                      : o.orderId) === m
                                    ? ((C.active = !1),
                                      (e = S ? [] : void 0),
                                      (t = wF.processOrderItemCompletion(f, l, e)),
                                      (i = S
                                        ? Promise.all(e).then(function () {
                                            return S();
                                          })
                                        : Promise.resolve()),
                                      [4, Promise.all([t, i])])
                                    : [2];
                                case 1:
                                  return (r.sent(), [2]);
                              }
                            });
                          }).catch(function (e) {
                            h.error("订单元素交付或卡包领取动画失败，继续订单结算", _, m, e);
                          })),
                          E()),
                        A
                      );
                    }),
                    (this._completionAnimation = k),
                    (R = K6.ParseItemsConf(
                      null === (t = this.orderConf) || void 0 === t ? void 0 : t.reward,
                    )),
                    (P = R.some(function (e) {
                      return e.itemType == oa.buffProp;
                    })),
                    (D = R.some(function (e) {
                      return e.itemType == oa.element;
                    })),
                    (B = P ? "OrderRewardBuffProp_" + this.node.uuid : null) &&
                      Ne.acquireScreenInputLock(B),
                    (L = function () {
                      B && (Ne.unlockScreenInput(B), (B = null));
                    }),
                    (N = function (e, t) {
                      return r(M, void 0, void 0, function () {
                        var o,
                          r,
                          s,
                          l,
                          h,
                          p,
                          f,
                          b,
                          w,
                          C,
                          I,
                          S,
                          T,
                          A,
                          P,
                          B,
                          L,
                          N = this;
                        return a(this, function (a) {
                          switch (a.label) {
                            case 0:
                              return (
                                this._completionAnimation === k &&
                                  (this._completionAnimation = null),
                                t
                                  ? ((xz.finishing = !1), E(), [2])
                                  : (this.markSystemOrderExtraRefresh(),
                                    (o = LF.getPlugin(_)) &&
                                      o.onFinishCallBackNoWait &&
                                      o.onFinishCallBackNoWait(this.node, {
                                        reward: y.reward,
                                        demand: y.demand,
                                        orderId: m,
                                      }),
                                    (null ===
                                      (T = null == (r = y) ? void 0 : r.recycleElementSeries) ||
                                    void 0 === T
                                      ? void 0
                                      : T.length) &&
                                      b2.RecycleBoardElement(
                                        r.recycleElementSeries,
                                        null !== (A = r.recycleChangeTo) && void 0 !== A ? A : 0,
                                        0,
                                        c,
                                      ),
                                    E(),
                                    (s =
                                      (null === (P = e.getData()) || void 0 === P
                                        ? void 0
                                        : P.rewards) || []),
                                    this._rewardMap.forEach(function (e, t) {
                                      nO.onFinishRequest(t, e, {
                                        serverRewards: s,
                                        beforeClick: g.get(t),
                                      });
                                    }),
                                    YF.isSystemAutoOrderTokenType(this.orderType) &&
                                      ((l =
                                        null === (B = this.node_bubbleReward) || void 0 === B
                                          ? void 0
                                          : B.children.find(function (e) {
                                              return (
                                                nO.getNodeType(e) ==
                                                config.GlobalActType.tennisParty
                                              );
                                            })),
                                      wF.processTennisPartyOrderAnimation(!0, l)),
                                    wF.appComment(v, _),
                                    wF.processDiamondGooseReward(this._finishBtn),
                                    wF.playSound(y.reward),
                                    (h = config.OrderDialog.getById(this.data.orderId)) &&
                                      !o8.isRunning() &&
                                      bw.talk(h.FinishTask),
                                    6000001 == this.data.orderId &&
                                      bw.talk(
                                        config.AllDialog.getById("returncenter")
                                          .firstFinishDrawerTask,
                                      ),
                                    d.emit(i.FinishMainOrder, {
                                      orderId: this.data.orderId,
                                      orderType: this.orderType,
                                    }),
                                    d.emit(i.OrderComplete, {
                                      orderId: this.data.orderId,
                                      isDrawer: !1,
                                    }),
                                    u.dispatch("updateABaoReddot"),
                                    yL.haveOrderFinish(),
                                    G2.RefreshBoardCache(),
                                    u.dispatch("newElementCreate"),
                                    (G2.BoardRender.orderInfo.scroll.enabled = !0),
                                    (p = k()),
                                    (f = g.get(ZN.OrderItemBubble)),
                                    (b =
                                      null === (L = null == f ? void 0 : f.extraRewardContexts) ||
                                      void 0 === L
                                        ? void 0
                                        : L.get(config.GlobalActType.tennisParty)),
                                    (w = nO.getExtraRewardItem(config.GlobalActType.tennisParty)) &&
                                      b &&
                                      w
                                        .collect(ZN.OrderItemBubble, b.sourceNode || null, {
                                          data: {
                                            serverRewards: s,
                                            beforeClick: f,
                                            submittedCellIndices: c,
                                          },
                                        })
                                        .catch(function (e) {
                                          return console.error(
                                            "TennisParty early order reward collect failed",
                                            e,
                                          );
                                        }),
                                    [4, p])
                              );
                            case 1:
                              return (
                                a.sent(),
                                o &&
                                  o.onFinishCallBack &&
                                  o.onFinishCallBack(this.node, y, e.getData().rewards),
                                d.emit(i.UpdateSmileOrderInfo),
                                (C = {
                                  orderType: this.orderType,
                                  orderId: m,
                                  demand: y.demand,
                                  reward: R,
                                  serverRewards: s,
                                  submittedCellIndices: c,
                                }),
                                (I = []),
                                this._rewardMap.forEach(function (e, t) {
                                  I.push({
                                    sceneType: t,
                                    fromParent: e,
                                    param: {
                                      item: N,
                                      data: n(n({}, C), { beforeClick: g.get(t) }),
                                    },
                                  });
                                }),
                                nO.collectExtraAfterTokenFly(I),
                                (S = this.getNormalRewardItems()),
                                wF.processOrderReward(S),
                                UT.isFinishAllDrawer() &&
                                  this.orderType == sJ.NORMAL &&
                                  m > 0 &&
                                  (d.emit(i.OrderComplete, { orderId: m, isDrawer: !0 }),
                                  d.emit(i.DrawerReward, { orderId: m }),
                                  this.onFinishAllDrawer()),
                                G2.BoardRender.orderInfo.finish(this, D),
                                u.dispatch("showElementInfo"),
                                [2]
                              );
                          }
                        });
                      });
                    }),
                    (O = function (e, t) {
                      return r(M, void 0, void 0, function () {
                        return a(this, function (i) {
                          switch (i.label) {
                            case 0:
                              return (i.trys.push([0, , 2, 3]), [4, N(e, t)]);
                            case 1:
                              return (i.sent(), [3, 3]);
                            case 2:
                              return (L(), IF.completePresentation(e), [7]);
                            case 3:
                              return [2];
                          }
                        });
                      });
                    }),
                    (x = LF.getPlugin(this.orderType)) && x.onFinishRequest
                      ? x.onFinishRequest(this.node, c, l, O.bind(this))
                      : m < 0
                        ? TJ.BoardRequestSend(
                            ry.completeReturnOrder,
                            {
                              boardId: G2.Data.id,
                              orderId: m,
                              indexes: c,
                              bagItemIds: l,
                              timestamp: E8.serverTime,
                            },
                            "completeorder",
                            O.bind(this),
                          )
                        : TJ.BoardRequestSend(
                            hm.completeOrder,
                            {
                              boardId: G2.Data.id,
                              orderId: v,
                              indexes: c,
                              bagItemIds: l,
                              timestamp: E8.serverTime,
                            },
                            "completeorder",
                            O.bind(this),
                          ),
                    [2])
                  : (G2.ResumeTip(), G2.TouchResume(), (xz.finishing = !1), [2]);
            }
          });
        });
      }),
      (s.prototype.onFinishAllDrawer = function () {
        return r(this, void 0, void 0, function () {
          return a(this, function (e) {
            switch (e.label) {
              case 0:
                return xz.finishing ? [4, S(100)] : [3, 2];
              case 1:
                return (e.sent(), [3, 0]);
              case 2:
                return (nC.instance.updateStageByType(config.GlobalActType.MasterMatch), [2]);
            }
          });
        });
      }),
      (s.prototype.renderOrderExtraBubble = function (e) {
        var t;
        (void 0 === e && (e = null),
          this._extraRewardsEnabled &&
            (!e ||
              (e.orderId == (null === (t = this.data) || void 0 === t ? void 0 : t.orderId) &&
                e.orderType == this.orderType)) &&
            (nO.removeExtra(ZN.OrderItemBubble, this.node_bubbleReward),
            this.createOrderExtraReward(ZN.OrderItemBubble, this.node_bubbleReward),
            this.refreshRewardLayout()));
      }),
      (s.prototype.renderOrderExtraLeft = function () {
        this._extraRewardsEnabled &&
          this.data &&
          this.orderConf &&
          (nO.removeExtra(ZN.OrderItemLeftTop, this.node_leftTopReward),
          this.createOrderExtraReward(ZN.OrderItemLeftTop, this.node_leftTopReward),
          this.node_leftBottomReward &&
            (nO.removeExtra(ZN.OrderItemLeftBottom, this.node_leftBottomReward),
            this.createOrderExtraReward(ZN.OrderItemLeftBottom, this.node_leftBottomReward)),
          this.refreshOrderLayout());
      }),
      (s.prototype.refreshOrderTopExtra = function (e) {
        var t;
        if (
          this._extraRewardsEnabled &&
          o9.currentScreen == J8.MERGE_SCREEN &&
          this.data &&
          this.orderConf &&
          this._rewardsVisible &&
          (null === (t = this.getSceneNode(OF.orderScene)) || void 0 === t ? void 0 : t.active) &&
          (!e || (e.orderId == this.data.orderId && e.orderType == this.orderType))
        ) {
          var i = ZN.OrderItemBottom;
          (nO.removeExtra(i, [this.node_bottomReward, this.node_topReward]),
            this.createOrderExtraReward(i, this.node_topReward),
            this.refreshRewardLayout());
        }
      }),
      (s.prototype.refreshOrderBottomRightExtra = function (e) {
        var t, i;
        if (
          !e ||
          (e.orderId == (null === (t = this.data) || void 0 === t ? void 0 : t.orderId) &&
            e.orderType == this.orderType)
        ) {
          var n = this.node_bottomRightReward;
          if (cc.isValid(n, !0)) {
            var o = ZN.OrderItemBottomRight;
            (nO.removeExtra(o, n),
              this._extraRewardsEnabled &&
                this._rewardsVisible &&
                this.node.activeInHierarchy &&
                o9.currentScreen == J8.MERGE_SCREEN &&
                this.data &&
                this.orderConf &&
                (null === (i = this.getSceneNode(OF.orderScene)) || void 0 === i
                  ? void 0
                  : i.active) &&
                this.createOrderExtraReward(o, n));
          }
        }
      }),
      (s.prototype.onRewardLayoutChanged = function (e) {
        var t = null == e ? void 0 : e.parents;
        t &&
          this.data &&
          this.orderConf &&
          ((t.indexOf(this.node_topReward) < 0 &&
            t.indexOf(this.node_bottomReward) < 0 &&
            t.indexOf(this.node_bubbleReward) < 0) ||
            this.refreshRewardLayout());
      }),
      (s.gmPreviewGooseId = 0),
      o([FF({ type: [WF], tooltip: "场景类型与节点绑定" })], s.prototype, "sceneGroups", void 0),
      o([FF({ type: cc.Node, tooltip: "肥鹅" })], s.prototype, "node_goose", void 0),
      o(
        [FF({ type: cc.Node, tooltip: "订单子项布局" })],
        s.prototype,
        "layout_demandParent",
        void 0,
      ),
      o([FF({ type: cc.Node, tooltip: "订单子项" })], s.prototype, "node_demandItem", void 0),
      o([FF({ type: cc.Node, tooltip: "奖励子项" })], s.prototype, "node_rewardItem", void 0),
      o([FF({ type: cc.Node, tooltip: "订单背景节点" })], s.prototype, "node_background", void 0),
      o([FF({ type: cc.Node, tooltip: "订单前景节点" })], s.prototype, "node_foreground", void 0),
      o(
        [FF({ type: cc.Sprite, tooltip: "订单底部遮挡 Sprite" })],
        s.prototype,
        "bottomCover",
        void 0,
      ),
      o(
        [FF({ type: cc.SpriteFrame, tooltip: "默认订单底部遮挡图" })],
        s.prototype,
        "normalBottom",
        void 0,
      ),
      o([FF({ type: cc.Node, tooltip: "订单下侧时间节点" })], s.prototype, "node_time", void 0),
      o(
        [FF({ type: cc.Node, tooltip: "订单左上角奖励节点" })],
        s.prototype,
        "node_leftTopReward",
        void 0,
      ),
      o(
        [FF({ type: cc.Node, tooltip: "订单左下角奖励节点" })],
        s.prototype,
        "node_leftBottomReward",
        void 0,
      ),
      o(
        [FF({ type: cc.Node, tooltip: "订单右下角奖励挂点" })],
        s.prototype,
        "node_bottomRightReward",
        void 0,
      ),
      o(
        [FF({ type: cc.Node, tooltip: "订单下侧奖励节点" })],
        s.prototype,
        "node_bottomReward",
        void 0,
      ),
      o(
        [FF({ type: cc.Node, tooltip: "订单上侧奖励节点" })],
        s.prototype,
        "node_topReward",
        void 0,
      ),
      o([FF({ type: WA, tooltip: "订单上层奖励布局" })], s.prototype, "topRewardLayout", void 0),
      o(
        [FF({ type: cc.Node, tooltip: "订单气泡奖励节点" })],
        s.prototype,
        "node_bubbleReward",
        void 0,
      ),
      o(
        [FF({ type: [UF], tooltip: "完成按钮类型与节点绑定" })],
        s.prototype,
        "finishGroups",
        void 0,
      ),
      o([FF({ type: cc.Label, tooltip: "订单调试标签" })], s.prototype, "label_debug", void 0),
      o([FF({ type: cc.SpriteFrame, tooltip: "订单背景" })], s.prototype, "normalBg", void 0),
      o([Jb(i.RefreshMainOrderExtraBubble)], s.prototype, "renderOrderExtraBubble", null),
      o([Jb(i.RefreshMainOrderExtraLeft)], s.prototype, "renderOrderExtraLeft", null),
      o(
        [Jb(i.RefreshMainOrderDailyChallenge, i.RefreshMainOrderExtraTop)],
        s.prototype,
        "refreshOrderTopExtra",
        null,
      ),
      o(
        [Jb(i.RefreshMainOrderExtraBottomRight)],
        s.prototype,
        "refreshOrderBottomRightExtra",
        null,
      ),
      o([Jb(i.RefreshMainOrderRewardLayout)], s.prototype, "onRewardLayoutChanged", null),
      (s = c = o([GF], s))
    );
  })($_);
function VF(e) {
  return function (t) {
    var i = new t();
    qF.registerSystemActivityOrder(e, i);
  };
}
cc._RF.pop();
