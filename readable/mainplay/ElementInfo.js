// Extracted cached Cocos registration: ElementInfo
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 1888757..1955637.
// Shared closure variables remain in readable/game.formatted.js:92798.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "55238XZMotJZ7+0X0Sbluwu", "ElementInfo");
var UG = cc._decorator,
  HG = UG.ccclass,
  VG = UG.property,
  jG = (function (e) {
    function n() {
      var t = (null !== e && e.apply(this, arguments)) || this;
      return (
        (t.anim_show = null),
        (t.label_info = null),
        (t.label_desc = null),
        (t.label_special = null),
        (t.label_cellPrice = null),
        (t.label_gemPrice = null),
        (t.label_gemPrice_pop = null),
        (t.label_discountPrice = null),
        (t.label_speedup = null),
        (t.label_cd = null),
        (t.label_cd_pop = null),
        (t.label_unlock = null),
        (t.label_lefttime = null),
        (t.label_weight = null),
        (t.label_leftnum = null),
        (t.label_leftnum_desc = null),
        (t.node_info = null),
        (t.btn_info = null),
        (t.icon_info = null),
        (t.btn_sell = null),
        (t.btn_gem = null),
        (t.btn_gem_pop = null),
        (t.btn_door = null),
        (t.btn_use = null),
        (t.btn_fake = null),
        (t.btn_undo = null),
        (t.btn_unlock = null),
        (t.btn_privilege = null),
        (t.btn_adBubble = null),
        (t.btn_breakAdBubble = null),
        (t.layout_btn = null),
        (t.layout_order = null),
        (t.node_order_item = null),
        (t.node_healthfood_list = null),
        (t.node_healthfood_order = null),
        (t.btn_healthfood_takeOut = null),
        (t.pushSub = null),
        (t.label_eventEnergy = null),
        (t.btn_GogBubble = null),
        (t.btn_breakGogBubble = null),
        (t.btn_elementTips = null),
        (t.node_lamp = null),
        (t.node_battery = null),
        (t.node_act3Pop = null),
        (t.node_mainPop = null),
        (t.node_gymSprintPop = null),
        (t.node_actPointPop = null),
        (t.label_gymSprintPoint = null),
        (t.node_adSkip = null),
        (t.btn_adSkip = null),
        (t.part3_group = null),
        (t.elementInfoRenderPrefabs = []),
        (t.elementInfoRenderParent = null),
        (t.elementInfoRenderParentRight = null),
        (t._cell = null),
        (t._sellCache = null),
        (t._sellCacheUUid = 0),
        (t._cdTimer = null),
        (t._cdTimerUpdate = null),
        (t._elementConf = null),
        (t._refreshTimer = null),
        (t._doubleTimer = null),
        (t._isInCd = !1),
        (t._elementInfoRenderReady = !1),
        (t._netting = !1),
        t
      );
    }
    var s;
    return (
      t(n, e),
      (s = n),
      Object.defineProperty(n.prototype, "sellCache", {
        get: function () {
          return this._sellCache;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(n.prototype, "Act8SellPrice", {
        get: function () {
          var e;
          if (null === (e = dI.instance) || void 0 === e ? void 0 : e.isInActBoard) {
            var t = dI.instance.matchIndex;
            if (t >= 0) return t + 1;
          }
          return -1;
        },
        enumerable: !1,
        configurable: !0,
      }),
      (n.prototype.onLoad = function () {
        var e;
        (u.add("showElementInfo", this.showElementInfo, this),
          u.add("updateElementInfo", this.updateElementInfo, this),
          u.add("hideElementInfo", this.hideElementInfo, this),
          u.add("onBoardResponse", this.showPushInfo, this),
          u.add("ElementInfoSell", this.onClickSell, this),
          u.add("ElementInfoClick", this.onClickElement, this),
          u.add("GymSprintRefresh", this.showElementInfo, this),
          this.btn_info.on("click", this.onClickInfo, this),
          this.icon_info.on("click", this.onClickInfo, this),
          this.btn_sell.on("click", this.onClickSell, this),
          this.btn_gem.on("click", this.onClickGem, this),
          this.btn_gem_pop.on("click", this.onClickGem, this),
          this.btn_door.on("click", this.onClickDoor, this),
          this.btn_use.on("click", this.onClickUse, this),
          null === (e = this.btn_fake) || void 0 === e || e.on("click", this.onClickFake, this),
          this.btn_undo.on("click", this.onClickUndo, this),
          this.btn_unlock.on("click", this.onClickUnlock, this),
          this.btn_privilege.on("click", this.onClickBreakBubble, this),
          this.btn_healthfood_takeOut.on("click", this.onClickTakeOut, this),
          this.btn_breakAdBubble.on("click", this.onClickBreakAdBubble, this),
          this.btn_breakGogBubble.on("click", this.onClickBreakGogBubble, this),
          this.btn_GogBubble.on("click", this.onClickUnlockGogBubble, this),
          this.node_lamp.on("click", this.onClickLamp, this),
          this.node_battery.on("click", this.onClickBattery, this),
          this.btn_elementTips.on("click", this.onClickElementTips, this),
          this.btn_adBubble &&
            this.btn_adBubble.onData({
              shareType: "default",
              videoType: "UnlockAdBubble",
              callback: this.onClickUnlockAdBubble.bind(this),
            }),
          this.btn_adSkip &&
            this.btn_adSkip.onData({
              shareType: "default",
              videoType: "adSkipCreator",
              callback: this.onClickAdSkip.bind(this),
            }),
          this.initElementInfoRender(),
          this.hideElementInfo());
      }),
      (n.prototype.onDisable = function () {
        this.clear();
      }),
      (n.prototype.updateElementInfo = function (e) {
        !this._cell ||
          (null != e && -1 != e && this._cell.serverIdx != e) ||
          this._sellCache ||
          this.showElementInfo(this._cell);
      }),
      (n.prototype.subAlert = function (e) {
        return r(this, void 0, void 0, function () {
          var t = this;
          return a(this, function (i) {
            return [
              2,
              new Promise(function (i) {
                if (t._cell.data) {
                  var n = t._cell.data.config.name,
                    o = v.getLabel("element_cancelPush", n);
                  if (e) {
                    var r = t._cell.data.config;
                    o =
                      r.unlockDuration > 0 || r.elementOrderId > 0
                        ? v.getLabel("element_readyPush", n)
                        : v.getLabel("element_fullPush", n);
                  }
                  A8.Alert({
                    title: v.getLabel("common_tips"),
                    content: o,
                    confirmText: e ? v.getLabel("common_sub") : v.getLabel("common_confirm"),
                    showCancel: !0,
                    callback: function (e) {
                      i(e);
                    },
                  });
                }
              }),
            ];
          });
        });
      }),
      (n.prototype.showPushInfo = function () {
        var e = this._cell,
          t = !1;
        if (e && e.data && e.data.serverData && e.data.config) {
          var i = this._cell.data.serverData.uUID.toString(),
            n = e.data.config;
          ((t =
            n.elementRecoverRate > 0 ||
            n.AutoInterval > 0 ||
            n.unlockDuration > 60 ||
            n.elementOrderId > 0),
            (this.pushSub.node.active = IC.available && "0" != i && t),
            this.pushSub.node.active &&
              (this.pushSub.init(bC.Element, i, e.subPush.bind(e), this.subAlert.bind(this), n.id),
              this.adaptInfoWidth()));
        }
      }),
      (n.prototype.showElementInfo = function (e) {
        var t,
          i,
          n,
          o,
          s,
          c,
          l,
          d,
          u,
          p = this,
          g = !1;
        if (
          (this._cell && e && e.serverIdx == this._cell.serverIdx && (g = !0),
          e || (e = this._cell),
          this.clear(),
          (this._cell = e),
          this.showPushInfo(),
          g || IC.flush(),
          (this.label_special.node.active = !1),
          (this.label_discountPrice.node.active = !1),
          (this.btn_gem.active = !1),
          (this.btn_gem_pop.active = !1),
          (this.btn_door.active = !1),
          (this.btn_use.active = !1),
          (this.node_lamp.active = !1),
          (this.node_adSkip.active = !1),
          (this.node_battery.active = !1),
          this.btn_fake && (this.btn_fake.active = !1),
          (this.btn_undo.active = !1),
          (this.btn_unlock.active = !1),
          (this.btn_sell.active = !1),
          (this.btn_privilege.active = !1),
          (this.btn_adBubble.node.active = !1),
          (this.btn_breakAdBubble.active = !1),
          (this.btn_GogBubble.active = !1),
          (this.part3_group.active = !1),
          (this.btn_breakGogBubble.active = !1),
          (this.btn_elementTips.active = !1),
          (this._isInCd = !1),
          (this.label_lefttime.node.parent.parent.active = !1),
          (this.label_weight.node.parent.active = !1),
          (this.label_leftnum.node.parent.active = !1),
          (this.layout_order.node.active = !1),
          (this.node_healthfood_list.active = !1),
          (this.node_healthfood_order.active = !1),
          e && e.data)
        ) {
          if (
            (h.log(
              "资源uuid:" +
                (null ===
                  (n =
                    null ===
                      (i =
                        null === (t = null == e ? void 0 : e.mergeCellRender) || void 0 === t
                          ? void 0
                          : t.sprite_icon) || void 0 === i
                      ? void 0
                      : i.spriteFrame) || void 0 === n
                  ? void 0
                  : n._uuid),
            ),
            (this.node_info.active = !0),
            !this.showCustomElementInfo(e, g))
          ) {
            if (
              ((this.btn_sell.active =
                !!e.data.config.sellPriceCoin &&
                !G$.IsCellInState(e, mr.web) &&
                !G$.IsCellInState(e, mr.box) &&
                H2.checkElementCanSell(e.data.config.id) &&
                K6.SellProTectedCheck(e.data.config)),
              e.data.elementType.includes(Z2.STORE_ELEMENT) && (this.btn_sell.active = !1),
              E8.role.level < config.Config.config.sellElementUnlockPlayerLevel &&
                (this.btn_sell.active = !1),
              e.data)
            ) {
              this._elementConf = e.data.config;
              var m = {
                  idx: e.data.serverData.index,
                  eleName: this._elementConf.name,
                  eleId: this._elementConf.id,
                },
                y = this._elementConf.elementOrderId < 0;
              if (
                ((this.label_info.string = y
                  ? "" + e.data.config.name
                  : v.getLabel("element_level", e.data.config.name, e.data.config.level)),
                G$.IsCellInState(e, mr.web))
              )
                e.data.config.dustingCostDiamond <= 0
                  ? (this.label_desc.string = v.getLabel("element_webTips_free"))
                  : (this.label_desc.string = v.getLabel("element_webTips"));
              else if (
                e.data.config.elementOrderId >= 0 &&
                e.data.remoteData.order.orderId &&
                config.ElementOrderPool.getById(e.data.remoteData.order.orderId).elementOrderDesc
              ) {
                var _ = e.data.remoteData.order,
                  b = e.data.remoteData.recovery.get(yr.manualProduct);
                (b && b.value > 0) || _.state == kr.running || _.state == kr.complete
                  ? ((this.label_desc.string = "" + e.data.config.desc),
                    (m.order_state = kr[_.state]))
                  : (this.label_desc.string = config.ElementOrderPool.getById(
                      e.data.remoteData.order.orderId,
                    ).elementOrderDesc);
              } else if ("Mirror" == e.data.config.series.split("_")[0])
                ((this.label_info.string = "" + e.data.config.name),
                  (this.label_special.node.active = !0),
                  (this.label_special.string =
                    e.data.remoteData.hp.get(yr.manualProduct) + "/" + e.data.config.vanishTimes),
                  (this.label_desc.string = e.data.config.desc));
              else if (e.data.config.propEffect && 13 == ~~(e.data.config.propEffect / 100)) {
                var w = (N = wM.GetConf()) && N.pointCoefficient ? N.pointCoefficient : 5,
                  C =
                    e.data.remoteData.extra &&
                    parseInt(e.data.remoteData.extra.get(fr.magicLampProp));
                (C || (C = 0),
                  (this.label_desc.string = f.substitute(e.data.config.desc, C, C * w)));
              } else {
                this.label_desc.string = b2.CheckElementDesc(e.data.config.id);
                var I = G$.parseGetResConf(e);
                if (I && I.randomItem.length > 0) {
                  var T = this.label_desc.string;
                  this.label_desc.string = f.substitute(T, I.randomItem[0].value);
                }
                this.btn_elementTips.active = null != config.ElementTips.getById(e.data.config.id);
              }
              (!F8.isProd &&
                Wt.showMergeCellIdx &&
                (this.label_desc.string += " " + e.data.config.id),
                (this.label_speedup.node.parent.active = !0),
                (this.label_speedup.node.active = !0),
                (this.label_speedup.string = v.getLabel("element_speedup")),
                (this.label_cd.node.active = !1),
                this.sellProtect());
              var E = this.showLampPassCount(e);
              if (
                (this.showBatteryCount(e),
                (this.btn_info.active = !0),
                Ct.onUIState(this.icon_info, It.Active),
                G$.IsCellInState(e, mr.web))
              )
                this.showElementInfoLockWeb(e);
              else if (e.data.elementType.includes(Z2.FROZEN_BUBBLE))
                this.showElementInfoIceBlock(e);
              else if (e.data.elementType.includes(Z2.BUBBLE))
                e.data.remoteData && e.data.remoteData.productType == vr.adBubble
                  ? (this.showElementInfoAdBubble(e), (m.bubbleType = "adBubble"))
                  : e.data.remoteData && e.data.remoteData.productType == vr.challengeBubble
                    ? (this.showElementInfoGogBubble(), (m.bubbleType = "challengeBubble"))
                    : (this.showElementInfoBubble(e), (m.bubbleType = "bubble"));
              else if (e.data.config.elementOrderId) this.showElementInfoOrder(e);
              else if (e.data.elementType.includes(Z2.MANU_UNLOCK))
                this.showElementInfoManuUnlock(e);
              else if (
                e.data.elementType.includes(Z2.MANU_CREATOR) &&
                this.checkNeedShowCreator(e) &&
                !E
              ) {
                (this.showElementInfoCreator(e),
                  (A = e.data.getRecovery(yr.manualProduct)) && (m.productCount = A.value));
              } else if (e.data.elementType.includes(Z2.AUTO_CREATOR)) {
                var A;
                (this.showElementInfoAutoCreator(e),
                  (A = e.data.getRecovery(yr.autoProduct)) && (m.productCount = A.value));
              } else
                e.data.elementType.includes(Z2.PROP)
                  ? (this.showElementInfoProp(e), (m.endCount = e.data.remoteData.endTime || 0))
                  : e.data.elementType.includes(Z2.DETERIORATED)
                    ? this.showDeterioratedElement(e)
                    : X8.isVegetable(e.data.config.id) && this.showVegetableElement(e);
              if (
                (null ===
                  (s =
                    null === (o = config.Config.config) || void 0 === o
                      ? void 0
                      : o.fakeButtonId) || void 0 === s
                  ? void 0
                  : s.includes(
                      null === (l = null === (c = e.data) || void 0 === c ? void 0 : c.config) ||
                        void 0 === l
                        ? void 0
                        : l.id,
                    )) &&
                this.btn_fake
              ) {
                var k = !0;
                this.btn_fake.active = !0;
                var R = this.btn_fake.getComponentInChildren(cc.Label);
                if (R) {
                  var P = e.data.config.id,
                    D =
                      null ===
                        (u =
                          null === (d = config.Config.config) || void 0 === d
                            ? void 0
                            : d.fakeButtonId) || void 0 === u
                        ? void 0
                        : u.indexOf(P),
                    B = config.Config.config.fakeButtonText[D];
                  B && B.length && ((R.string = B), (k = !1));
                }
                k && (this.btn_fake.active = !1);
              }
              if (this._isInCd) {
                var L = kA.changeElementData(e.data.config.id);
                if (L) {
                  var N = e.data.config,
                    O =
                      (L.AutoIntervalAct && L.AutoIntervalAct != N.AutoInterval) ||
                      (L.elementRecoverRateAct &&
                        L.elementRecoverRateAct != N.elementRecoverRate) ||
                      (L.unlockDurationAct && L.unlockDurationAct != N.unlockDuration),
                    x =
                      (L.AutoCDCostAct && L.AutoCDCostAct != N.AutoCDCost) ||
                      (L.elementCDCostAct && L.elementCDCostAct != N.elementCDCost) ||
                      (L.unlockCostDiamondAct && L.unlockCostDiamondAct != N.unlockCostDiamond),
                    M = v.getLabel("skipCd_elementDesc_1");
                  (O && (M += v.getLabel("comma") + v.getLabel("skipCd_elementDesc_2")),
                    x && (M += v.getLabel("comma") + v.getLabel("skipCd_elementDesc_3")),
                    (M += v.getLabel("period")),
                    (this.label_desc.string = M));
                }
              }
              var G = e.data.config.sellPriceCoin;
              (this.Act8SellPrice >= 0 && (G = this.Act8SellPrice),
                (this.label_cellPrice.string = G.toString()),
                SL.addBehavior(_L.ele_select, m, !0));
            }
            (r(p, void 0, void 0, function () {
              return a(this, function (e) {
                switch (e.label) {
                  case 0:
                    return (
                      Ct.onUIState(this.btn_sell, It.DisActive),
                      Ct.onUIState(this.btn_gem, It.DisActive),
                      Ct.onUIState(this.btn_undo, It.DisActive),
                      Ct.onUIState(this.btn_unlock, It.DisActive),
                      [4, S(33)]
                    );
                  case 1:
                    return (
                      e.sent(),
                      this.btn_sell.active && Ct.onUIState(this.btn_sell, It.Active),
                      this.btn_gem.active && Ct.onUIState(this.btn_gem, It.Active),
                      this.btn_undo.active && Ct.onUIState(this.btn_undo, It.Active),
                      this.btn_unlock.active && Ct.onUIState(this.btn_unlock, It.Active),
                      [2]
                    );
                }
              });
            }),
              !g && rb.playAnimation(this.anim_show, "elementinfotips"));
            r(p, void 0, void 0, function () {
              var e, t;
              return a(this, function (i) {
                switch (i.label) {
                  case 0:
                    return [4, S(66)];
                  case 1:
                    for (
                      i.sent(), this.layout_btn.updateLayout(), e = !0, t = 0;
                      t < this.layout_btn.node.childrenCount;
                      t++
                    )
                      if (this.layout_btn.node.children[t].active) {
                        e = !1;
                        break;
                      }
                    return (
                      e && (this.layout_btn.node.width = 0),
                      (this.label_desc.node.width = 480 - this.layout_btn.node.width),
                      this.adaptInfoWidth(),
                      this.label_info.node.parent.getComponent(cc.Layout).updateLayout(),
                      [2]
                    );
                }
              });
            });
          }
        } else this.hideElementInfo();
      }),
      (n.prototype.sellProtect = function () {
        if (
          0 != this._elementConf.AutoId.size ||
          0 != this._elementConf.AutoIdList.length ||
          0 != this._elementConf.elementIdWeight.size ||
          0 != this._elementConf.elementIdList.length
        ) {
          var e = this._cell.data.config.series;
          if (config.ElementSeries.getBySeries(e).protectElementGroup) {
            var t = b2.GetBoardHaveSeries(this._elementConf.series, 0, !0);
            if (
              (t.sort(function (e, t) {
                var i = G$.GetCellByIndex(e);
                return G$.GetCellByIndex(t).data.config.level - i.data.config.level;
              }),
              1 == t.length || (t.length > 1 && this._cell.serverIdx == t[0]))
            ) {
              if (t.length > 1)
                if (
                  G$.GetCellByIndex(t[0]).data.config.level ==
                  G$.GetCellByIndex(t[1]).data.config.level
                )
                  return;
              this.btn_sell.active = !1;
            }
          }
        }
      }),
      (n.prototype.hideElementInfo = function () {
        (this._cell &&
          this._cell.isSelect &&
          ((G2.instance.detailInfoElement = null), (this._cell.isSelect = !1)),
          (this._cell = null),
          (this.label_info.maxWidth = 430),
          (this.label_info.string = v.getLabel("element_defaultInfo")),
          (this.label_desc.string = ""),
          (this.pushSub.node.active = !1),
          this.hideAll());
      }),
      (n.prototype.checkNeedShowCreator = function (e) {
        var t = e.data.getRecovery(yr.manualProduct),
          i = e.dynamicComponents.get("ManuCreatorRecover");
        return (
          !(!e.data.elementType.includes(Z2.AUTO_UNLOCK) || G$.IsCellInState(e, mr.opened)) ||
          !(!t || !i || ((!i.costGem || i.costGem <= 0) && !i.costShortGem && !i.costUnlockGem))
        );
      }),
      (n.prototype.showElementInfoBubble = function (e) {
        var t,
          n = this,
          o = e.dynamicComponents.get("BubbleRecover");
        if (o && o.data) {
          var r = o.data.remoteData.bubbleEnd,
            a = -1 == r ? e.data.config.bubbleWait : Math.round((r - E8.serverTime) / 1e3),
            s = DC.CheckHasExtra(e),
            c = (null === (t = dI.instance) || void 0 === t ? void 0 : t.CheckHasExtra(e)) > 0,
            l = b3.checkHasExtra(e),
            u = qG.CheckHasExtra(e),
            p = u > 0,
            f = (s || c) && p,
            g = cc.find("energy/main", this.btn_gem_pop),
            m = cc.find("energy/act3", this.btn_gem_pop);
          if (
            (f
              ? ((this.node_act3Pop.parent.active = !0),
                (this.node_act3Pop.active = !0),
                (this.node_mainPop.active = !0),
                (m.active = !1),
                (g.active = !1))
              : ((this.node_act3Pop.parent.active = !1), (g.active = p), (m.active = s || c)),
            (this.node_gymSprintPop.active = l),
            l)
          ) {
            var y = b3.instance;
            null == y || y.theme.setPointIconForOrderItemNode(this.node_gymSprintPop);
          }
          (hx.instance.renderBubbleExtraRes(e, this.node_actPointPop),
            s || c || l || p || this.node_actPointPop.active
              ? (this.btn_gem_pop.active = !0)
              : (this.btn_gem.active = !0));
          var _ = config.Config.config.burstBubbleUnlockPlayerLevel;
          ((this.btn_privilege.active = E8.role.level >= _),
            (this.btn_privilege.getChildByName("timeGroup").active = !1),
            Ct.onUIState(this.btn_gem, It.Active));
          var w = function (t) {
            ((n.label_cd.string = t.leftSecond + "s"),
              (n.label_cd_pop.string = t.leftSecond + "s"),
              t.leftSecond <= 0.5 &&
                ((n.btn_gem.active = !1),
                (n.btn_privilege.active = !1),
                d.emit(i.OnBoardBubbleFinishedInElementInfo, { cell: e }),
                j_.hideWindow(F3.MergeConfirmWindow)),
              h.log("leftTime", t.leftTimeFormat));
          };
          ((this._refreshTimer = b.addClock("elementInfoRefresh", a, 100, 1)),
            (this._cdTimerUpdate = w),
            this._refreshTimer.registCallBack(this, null, w),
            (this.label_speedup.node.parent.active = !1),
            (this.label_speedup.node.active = !1),
            (this.label_cd.node.active = !0),
            b2.IsBubbleFree(e.data.remoteData.productType)
              ? ((this.label_gemPrice.string = "0"), (this.label_gemPrice_pop.string = "0"))
              : ((this.label_gemPrice.string = "" + (o ? o.costGem : 0)),
                (this.label_gemPrice_pop.string = "" + (o ? o.costGem : 0))));
          var C =
              e.data.remoteData.productType == vr.bubble
                ? e.data.config.bubbleCost
                : e.data.config.bubble2Cost,
            I = DC.CheckElementCanFly(e.data.config.id) && DC.calBubbleEnergyCount(C);
          if (I > 0)
            ((m.getComponentInChildren(cc.Label).string = "x" + I),
              (this.label_eventEnergy.string = "x" + I));
          var S = dI.instance;
          if (S && S.CheckElementCanFly(e.data.config.id)) {
            var T = S.calBubbleEnergyCount(C);
            if (T > 0)
              ((m.getComponentInChildren(cc.Label).string = "x" + T),
                (this.label_eventEnergy.string = "x" + T));
          }
          if (p)
            ((this.node_mainPop.getComponentInChildren(cc.Label).string = "x" + u),
              (g.getComponentInChildren(cc.Label).string = "x" + u));
          if (
            ((this.label_gymSprintPoint.string = "x" + e.data.remoteData.extra.get(fr.gymPoint)),
            b2.CanUseGoldBubbleDiscount() &&
              e.data.remoteData.productType &&
              e.data.remoteData.productType != vr.bubble)
          ) {
            var E = e.data.config.bubble2Cost;
            ((this.label_discountPrice.node.active = !0),
              (this.label_discountPrice.string = "" + E));
          }
          ((this.label_cd.string = a + "s"),
            (this.btn_sell.active = !1),
            (this.label_info.string = v.getLabel(
              "element_level",
              e.data.config.name,
              e.data.config.level,
            )),
            (this.label_desc.string = v.getLabel("element_bubbleInfo")));
        }
      }),
      (n.prototype.showElementInfoAdBubble = function (e) {
        ((this.btn_adBubble.node.active = !0),
          (this.btn_breakAdBubble.active = !0),
          (this.btn_gem.active = !1),
          (this.btn_sell.active = !1));
        var t = this.btn_adBubble.getComponentInChildren(cc.Label),
          i = this._cell.data.remoteData.extra.get(fr.adCount);
        i || (i = "1");
        var n = config.AdBubblePrice.getById(e.data.config.id),
          o = n ? n.adTimes : 1;
        (t && (t.string = o - parseInt(i) + "/" + o),
          (this.label_info.string = v.getLabel(
            "element_level",
            e.data.config.name,
            e.data.config.level,
          )),
          (this.label_desc.string = v.getLabel("element_adBubbleInfo")));
      }),
      (n.prototype.showElementInfoGogBubble = function () {
        ((this.btn_GogBubble.active = !0),
          (this.btn_breakGogBubble.active = !0),
          (this.btn_gem.active = !1),
          (this.btn_sell.active = !1),
          (this.label_desc.string = v.getLabel("element_bubble3Info")),
          Ct.onUIState(this.btn_GogBubble, It.Active));
      }),
      (n.prototype.showElementInfoIceBlock = function (e) {
        var t = this,
          i = e.dynamicComponents.get("FrozenBubbleRecover");
        if (i && i.data) {
          var n = i.data.remoteData.bubbleEnd - E8.serverTime,
            o = Math.ceil(n / 1e3);
          ((this.btn_privilege.active = !0), (this.btn_sell.active = !1));
          var r = this.btn_privilege.getChildByName("timeGroup");
          r.active = !0;
          var a = r.getChildByName("label_cd");
          if (a) {
            ((this.label_info.string = v.getLabel(
              "element_level",
              e.data.config.name,
              e.data.config.level,
            )),
              (this.label_desc.string = v.getLabel("element_frozenBubbleInfo")));
            var s = function (e) {
              if (cc.isValid(a)) {
                var i = a.getComponent(cc.Label);
                i &&
                  ((i.string = j(e.leftSecond, !1, !0, 2)),
                  e.leftSecond > 0.5 ||
                    ((t.btn_privilege.active = !1), j_.hideWindow(F3.MergeConfirmWindow)));
              }
            };
            ((this._refreshTimer = b.addClock("elementInfoIceBlock", o, 100, 1)),
              (this._cdTimerUpdate = s),
              this._refreshTimer.registCallBack(this, null, s));
          }
        }
      }),
      (n.prototype.showElementInfoCreator = function (e) {
        var t = this;
        if (e.data.elementType.includes(Z2.AUTO_UNLOCK) && !G$.IsCellInState(e, mr.opened)) {
          if (e.data.remoteData.openEnd) {
            ((this._isInCd = !0),
              (this.btn_gem.active = !0),
              Ct.onUIState(this.btn_gem, It.Active));
            var i = e.dynamicComponents.get("ManuCreatorRecover");
            if (i && i.costUnlockGem < 0)
              ((this.btn_gem.active = !1), j_.hideWindow(F3.MergeConfirmWindow));
            else {
              ((this.label_gemPrice.string = "" + (i ? i.costUnlockGem : 0)),
                (this.label_speedup.string = j(i ? Math.ceil(i.leftTime / 1e3) : 0, !1, !0, 2)));
              var n = e.data.remoteData.openEnd,
                o = G$.getELementUnlockDuration(e.data.config.id, e.data.config.unlockDuration),
                r = -1 == n ? o : Math.round((n - E8.serverTime) / 1e3),
                a = function (e) {
                  var n = i ? i.costUnlockGem : 0;
                  ((t.label_gemPrice.string = "" + n),
                    (t.label_speedup.string = j(i ? Math.ceil(i.leftTime / 1e3) : 0, !1, !0, 2)),
                    (e.leftSecond <= 0.5 || n <= 0) &&
                      ((t.btn_gem.active = !1), j_.hideWindow(F3.MergeConfirmWindow)),
                    i && i.data && i.data.recover && h.log("leftTime", i.leftTime));
                };
              r >= 0 &&
                ((this._refreshTimer = b.addClock("elementInfoRefresh", r, 100, 1)),
                (this._cdTimerUpdate = a),
                this._refreshTimer.registCallBack(this, this.onClockFinish, a));
            }
          }
        } else {
          var s = e.data.getRecovery(yr.manualProduct);
          if (
            (s && s.value < e.data.config.elementCDStorage && s.state) ||
            e.data.remoteData._shortCdManuRoundEndTime
          ) {
            ((this.btn_gem.active = !0), Ct.onUIState(this.btn_gem, It.Active));
            var c = e.dynamicComponents.get("ManuCreatorRecover");
            if (
              G2.Data.freeRechargeTimes > 0 &&
              c &&
              !e.data.remoteData._shortCdManuRoundEndTime &&
              c.costShortGem <= 0
            ) {
              ((this._isInCd = !0),
                (this.label_gemPrice.string = "0"),
                (this.label_speedup.string = j(
                  Math.ceil(c ? c.createLeftTime / 1e3 : 0),
                  !1,
                  !0,
                  2,
                )),
                (this._refreshTimer = b.addClock("elementInfoRefresh", 1, 100, 0)));
              a = function (e) {
                t.label_speedup.string = j(Math.ceil(c ? c.createLeftTime / 1e3 : 0), !1, !0, 2);
              };
              this._refreshTimer &&
                ((this._cdTimerUpdate = a),
                this._refreshTimer.registCallBack(this, this.onClockFinish, a));
            } else {
              if (G$.CheckProductMax(e, !1))
                ((this.btn_gem.active = !1), j_.hideWindow(F3.MergeConfirmWindow));
              else if (
                c &&
                ((!e.data.remoteData._shortCdManuRoundEndTime && c.costGem < 0) ||
                  (e.data.remoteData._shortCdManuRoundEndTime && c.costShortGem <= 0))
              )
                ((this.btn_gem.active = !1), j_.hideWindow(F3.MergeConfirmWindow));
              else {
                var l = 0,
                  d = 0;
                (c &&
                  (c.costShortGem
                    ? ((l = c.costShortGem), (d = c.shortLeftTime))
                    : c.costGem && ((l = c.costGem), (d = c.createLeftTime), (this._isInCd = !0))),
                  (this.label_gemPrice.string = "" + l),
                  c && c.costShortGem
                    ? ((this.label_cd.node.active = !0),
                      (this.label_cd.string = v.getLabel("common_speedup")),
                      (this.label_speedup.node.parent.active = !1))
                    : (this.label_speedup.string = j(Math.ceil(d / 1e3), !1, !0, 2)),
                  (this._refreshTimer = b.addClock("elementInfoRefresh", 1, 100, 0)));
                a = function (e) {
                  var i = 0,
                    n = 0;
                  (c &&
                    (c.costShortGem
                      ? ((i = c.costShortGem), (n = c.shortLeftTime))
                      : c.costGem && ((i = c.costGem), (n = c.createLeftTime))),
                    (t.label_gemPrice.string = "" + i),
                    c &&
                      !c.costShortGem &&
                      (t.label_speedup.string = j(Math.ceil(n / 1e3), !1, !0, 2)),
                    i <= 0 &&
                      ((t.btn_gem.active = !1),
                      (t.node_adSkip.active = !1),
                      j_.hideWindow(F3.MergeConfirmWindow)),
                    c &&
                      c.data &&
                      c.data.recover &&
                      h.log(
                        "leftTime",
                        c.data.recover.getLeftTime(c.data.cell.data.config.elementCDStorage),
                      ));
                };
                (this._refreshTimer &&
                  ((this._cdTimerUpdate = a),
                  this._refreshTimer.registCallBack(this, this.onClockFinish, a)),
                  this.showAdSkip(e));
              }
            }
          }
        }
      }),
      (n.prototype.showStoreElementInfoCreator = function (e, t) {
        var i = this._cell;
        ((this._cell = t), this.showElementInfoCreator(t), (this._cell = e || i));
      }),
      (n.prototype.showElementInfoProp = function (e) {
        var t = this,
          i = e.data.config;
        this.label_leftnum_desc.string = v.getLabel("elementInfo_countRemain");
        var n = i.propEffect ? ~~(i.propEffect / 100) : 0;
        (6 == n && (this.btn_sell.active = !!e.data.remoteData.endTime),
        8 == n &&
          ((this.label_lefttime.node.parent.parent.active = !0),
          (this.label_lefttime.string = j(Math.ceil(e.data.remoteData.endTime / 1e3), !1, !0, 2))),
        3 == n &&
          303 == i.propEffect &&
          ((this.btn_sell.active = !1),
          (this.label_leftnum.node.parent.active = !0),
          (this.label_leftnum.string = "x" + (e.data.remoteData.endTime + 1))),
        (7 != n && 15 != n) ||
          ((this.btn_sell.active = !1),
          (this.label_leftnum.node.parent.active = !0),
          (this.label_leftnum.string = "x" + (e.data.remoteData.endTime + 1))),
        15 == n &&
          ((this.btn_sell.active = !1),
          (this.label_leftnum.node.parent.active = !0),
          (this.label_leftnum.string = "x" + e.data.remoteData.endTime),
          (this.label_leftnum_desc.string = v.getLabel("prop_times_desc"))),
        10 == n || 16 == n) &&
          (!!G2.Data.buff.get(config.BoardBuffType.doubleEnergy)
            ? ((this.label_desc.string = v.getLabel("health_food_prop_button_info")),
              (this.label_info.string = v.getLabel(
                "element_using",
                e.data.config.name,
                e.data.config.level,
              )))
            : (this.label_info.string = "" + e.data.config.name));
        if (12 == n) {
          this.btn_door.active = !0;
          var o = this.btn_door.getComponentInChildren(cc.Label);
          if (o) {
            var r = e.data.config.propEffect;
            if (r && 12 == ~~(r / 100)) {
              var a = config.PropEffect.getById(r);
              a && a.txt && (o.string = a.txt);
            }
          }
        }
        if (16 == n) {
          ((this.label_lefttime.node.parent.parent.active = !0),
            (this.label_lefttime.string = j(zM.GetLeftTime(), !1, !0, 2)));
          ((this._doubleTimer = b.addClock("elementInfoDouble", zM.GetLeftTime(), 100, 1)),
            this._doubleTimer.registCallBack(this, null, function (e) {
              t.label_lefttime.string = j(zM.GetLeftTime(), !1, !0, 2);
            }));
          var s = e.dynamicComponents.get("DoubleEnergyRecover");
          if (s && s.leftTime > 0.5) {
            this.btn_gem.active = !0;
            var c = e.serverIdx,
              l = function (e) {
                ((t.label_cd.string = e.leftSecond + "s"),
                  (t.label_gemPrice.string = "" + s.costGem),
                  (e.leftSecond <= 0.5 || s.costGem <= 0) &&
                    ((t.btn_gem.active = !1), j_.hideWindow(F3.MergeConfirmWindow)));
              };
            ((this._refreshTimer = b.addClock("elementInfoRefresh", s.leftTime / 1e3, 100, 1)),
              (this._cdTimerUpdate = l),
              this._refreshTimer.registCallBack(
                this,
                function () {
                  u.dispatch("updateElementInfo", c);
                },
                l,
              ),
              (this.label_speedup.node.parent.active = !1),
              (this.label_speedup.node.active = !1),
              (this.label_cd.node.active = !0));
          }
        }
        if ((20 == n && (this.btn_use.active = !0), e.data.remoteData.endTime > 0 && 6 == n)) {
          this._refreshTimer = b.addClock("elementInfoRefresh", 1, 100, 0);
          var d = e.dynamicComponents.get("SpeedUpRecover");
          l = function (e) {
            d && d.data && h.log("leftTime", d.leftTime);
          };
          this._refreshTimer &&
            ((this._cdTimerUpdate = l), this._refreshTimer.registCallBack(this, null, l));
        }
      }),
      (n.prototype.showElementInfoAutoCreator = function (e) {
        var t = this,
          i = e.data.getRecovery(yr.autoProduct);
        if (e.data.elementType.includes(Z2.AUTO_UNLOCK) && !G$.IsCellInState(e, mr.opened)) {
          if (e.data.remoteData.openEnd) {
            ((this._isInCd = !0),
              (this.btn_gem.active = !0),
              Ct.onUIState(this.btn_gem, It.Active));
            var n = e.dynamicComponents.get("AutoCreatorRecover");
            if (n && n.costUnlockGem < 0)
              ((this.btn_gem.active = !1), j_.hideWindow(F3.MergeConfirmWindow));
            else {
              ((this.label_gemPrice.string = "" + (n ? n.costUnlockGem : 0)),
                (this.label_speedup.string = j(n ? Math.ceil(n.leftTime / 1e3) : 0, !1, !0, 2)));
              var o = e.data.remoteData.openEnd,
                r = G$.getELementUnlockDuration(e.data.config.id, e.data.config.unlockDuration),
                a = -1 == o ? r : Math.round((o - E8.serverTime) / 1e3),
                s = function (e) {
                  var i = n ? n.costUnlockGem : 0;
                  ((t.label_gemPrice.string = "" + i),
                    (t.label_speedup.string = j(n ? Math.ceil(n.leftTime / 1e3) : 0, !1, !0, 2)),
                    (e.leftSecond <= 0.5 || i <= 0) &&
                      ((t.btn_gem.active = !1), j_.hideWindow(F3.MergeConfirmWindow)),
                    n && n.data && n.data.recover && h.log("leftTime", n.leftTime));
                };
              a >= 0 &&
                ((this._refreshTimer = b.addClock("elementInfoRefresh", a, 100, 1)),
                (this._cdTimerUpdate = s),
                this._refreshTimer.registCallBack(this, this.onClockFinish, s));
            }
          }
        } else if (
          (i && (i.value <= 0 || i.state > 0)) ||
          e.data.remoteData._shortCdAutoRoundEndTime
        ) {
          ((this._isInCd = !0), (this.btn_gem.active = !0), Ct.onUIState(this.btn_gem, It.Active));
          var c = e.dynamicComponents.get("AutoCreatorRecover"),
            l =
              G2.Data.freeRechargeTimes > 0 &&
              c &&
              !e.data.remoteData._shortCdAutoRoundEndTime &&
              c.costShortGem <= 0;
          if (G$.CheckProductMax(e, !0))
            ((this.btn_gem.active = !1), j_.hideWindow(F3.MergeConfirmWindow));
          else if (
            c &&
            (c.costGem < 0 || (e.data.remoteData._shortCdAutoRoundEndTime && c.costShortGem <= 0))
          )
            ((this.btn_gem.active = !1), j_.hideWindow(F3.MergeConfirmWindow));
          else {
            var d = 0,
              u = 0;
            (c &&
              (l
                ? (u = c.createLeftTime)
                : c.costShortGem
                  ? ((d = c.costShortGem), (u = c.shortLeftTime))
                  : c.costGem && ((d = c.costGem), (u = c.createLeftTime))),
              (this.label_gemPrice.string = "" + d),
              c && c.costShortGem
                ? ((this.label_cd.node.active = !0),
                  (this.label_cd.string = v.getLabel("common_speedup")),
                  (this.label_speedup.node.parent.active = !1))
                : (this.label_speedup.string = j(Math.ceil(u / 1e3), !1, !0, 2)),
              (this._refreshTimer = b.addClock("elementInfoRefresh", 1, 100, 0)));
            s = function (i) {
              var n = 0,
                o = 0;
              (c &&
                (l
                  ? (o = c.createLeftTime)
                  : c.costShortGem
                    ? ((n = c.costShortGem), (o = c.shortLeftTime))
                    : c.costGem && ((n = c.costGem), (o = c.createLeftTime))),
                n <= 0 && !l
                  ? ((t.btn_gem.active = !1),
                    (t.node_adSkip.active = !1),
                    j_.hideWindow(F3.MergeConfirmWindow))
                  : ((t.label_gemPrice.string = "" + n),
                    c &&
                      !c.costShortGem &&
                      (t.label_speedup.string = j(Math.ceil(o / 1e3), !1, !0, 2))),
                c.data &&
                  c.data.recover &&
                  h.log("leftTime", c.data.recover.getLeftTime(G$.GetAutoCDStorage(e))));
            };
            (this._refreshTimer &&
              ((this._cdTimerUpdate = s),
              this._refreshTimer.registCallBack(this, this.onClockFinish, s)),
              l || this.showAdSkip(e));
          }
        }
      }),
      (n.prototype.showElementInfoManuUnlock = function (e) {
        var t = this,
          n = G2.BoardCells.get(e.serverIdx);
        if (0 == e.data.config.unlockDuration || G$.IsCellInState(e, mr.opened))
          this.btn_gem.active = !1;
        else if (n.openEnd) {
          this._isInCd = !0;
          var o = e.dynamicComponents.get("ManuUnlockRecover");
          if (G2.Data.freeSpeedUpTimes > 0) {
            ((this.btn_gem.active = !0), Ct.onUIState(this.btn_gem, It.Active));
            var r = o ? Math.ceil(o.leftTime / 1e3) : 0;
            ((this.label_gemPrice.string = "0"),
              (this.label_speedup.string = j(r, !1, !0, 2)),
              (this._refreshTimer = b.addClock("elementInfoRefresh", r, 100, 0)));
            var a = function (n) {
              ((t.label_speedup.string = j(n.leftSecond, !1, !0, 2)),
                n.leftSecond <= 0.5 && d.emit(i.OnBoardChestCDFinishedInElementInfo, { cell: e }));
            };
            this._refreshTimer &&
              ((this._cdTimerUpdate = a),
              this._refreshTimer.registCallBack(this, this.onClockFinish, a));
          } else if (
            ((this.btn_gem.active = !0),
            Ct.onUIState(this.btn_gem, It.Active),
            o && o.data && o.data.data)
          ) {
            if (b2.CanUseBagDiscount(e.data.config.id)) {
              var s = o.leftTime,
                c = G$.getELementUnlockDuration(e.data.config.id, e.data.config.unlockDuration),
                l = G$.getELementUnlockCost(e.data.config.id, e.data.config.unlockCostDiamond),
                u = 1e3 * c,
                p = Math.ceil((s / u) * l);
              ((this.label_discountPrice.node.active = !0),
                (this.label_discountPrice.string = "" + p));
            }
            ((this.label_gemPrice.string = "" + (o ? o.costGem : 0)),
              (this.label_speedup.string = j(o ? Math.ceil(o.leftTime / 1e3) : 0, !1, !0, 2)));
            var f = o.data.data.remoteData.openEnd,
              g = -1 == f ? e.data.config.unlockDuration : Math.round((f - E8.serverTime) / 1e3);
            a = function (n) {
              var r = o ? o.costGem : 0;
              if (
                ((t.label_gemPrice.string = "" + r),
                (t.label_speedup.string = j(o ? Math.ceil(o.leftTime / 1e3) : 0, !1, !0, 2)),
                b2.CanUseBagDiscount(e.data.config.id))
              ) {
                var a = o.leftTime,
                  s = G$.getELementUnlockDuration(e.data.config.id, e.data.config.unlockDuration),
                  c = G$.getELementUnlockCost(e.data.config.id, e.data.config.unlockCostDiamond),
                  l = 1e3 * s,
                  u = Math.ceil((a / l) * c);
                ((t.label_discountPrice.node.active = !0), (t.label_discountPrice.string = "" + u));
              }
              ((n.leftSecond <= 0.5 || r <= 0) &&
                ((t.btn_gem.active = !1),
                d.emit(i.OnBoardChestCDFinishedInElementInfo, { cell: e }),
                j_.hideWindow(F3.MergeConfirmWindow)),
                h.log("leftTime", o ? o.leftTime : 0));
            };
            g >= 0 &&
              ((this._refreshTimer = b.addClock("elementInfoRefresh", g, 100, 1)),
              (this._cdTimerUpdate = a),
              this._refreshTimer.registCallBack(this, this.onClockFinish, a));
          } else ((this.btn_gem.active = !1), j_.hideWindow(F3.MergeConfirmWindow));
        } else {
          if (b2.isElementNewUnlock(e.data.config.id))
            if (G2.UnlockingNewElement)
              this.label_desc.string = v.getLabel("elementInfo_nowUnlocking");
            else {
              ((this.btn_unlock.active = !0), Ct.onUIState(this.btn_unlock, It.Active));
              c = G$.getELementUnlockDuration(e.data.config.id, e.data.config.unlockDuration);
              ((this.label_unlock.string = j(c, !1, !0, 2)),
                rb.playAnimation(this.btn_unlock.getComponent(cc.Animation)));
            }
          else if (G2.UnlockingManuElement)
            this.label_desc.string = v.getLabel("elementInfo_nowUnlocking");
          else {
            ((this.btn_unlock.active = !0), Ct.onUIState(this.btn_unlock, It.Active));
            c = G$.getELementUnlockDuration(e.data.config.id, e.data.config.unlockDuration);
            ((this.label_unlock.string = j(c, !1, !0, 2)),
              rb.playAnimation(this.btn_unlock.getComponent(cc.Animation)));
          }
        }
      }),
      (n.prototype.showElementInfoOrder = function (e) {
        var t = this;
        if (
          e.data &&
          e.data.remoteData &&
          e.data.remoteData.order &&
          (e.data.remoteData.recovery.size || e.data.config.ordercompleteChange) &&
          !(
            e.data.config.elementOrderId > 0 &&
            (e.data.remoteData.order.id <= 0 || !e.data.remoteData.order.demand)
          )
        ) {
          ((this.node_healthfood_list.active = !1),
            (this.node_healthfood_order.active = !1),
            (this.part3_group.active = !1));
          var i = e.data.remoteData.order,
            n = e.data.remoteData.recovery.get(yr.manualProduct);
          if ((n && n.value > 0) || i.state == kr.running || i.state == kr.complete) {
            if (((this.layout_order.node.active = !1), i.state == kr.running)) {
              var o = e.dynamicComponents.get("OrderRecover");
              if (o && o.data && o.data.data && o.costGem) {
                ((this.btn_gem.active = !0),
                  (this.label_gemPrice.string = "" + (o ? o.costGem : 0)),
                  (this.label_speedup.string = j(o ? Math.ceil(o.leftTime / 1e3) : 0, !1, !0, 2)));
                var r = function (e) {
                  var i = o ? o.costGem : 0;
                  if (
                    ((t.label_gemPrice.string = "" + i),
                    (t.label_speedup.string = j(o ? Math.ceil(o.leftTime / 1e3) : 0, !1, !0, 2)),
                    o.leftTime <= 500 || i <= 0)
                  )
                    (o.data.data.config.elementOrderId < 0 &&
                      (t.node_healthfood_order
                        .getChildByName("finish")
                        .getComponent(cc.Sprite).fillStart = 1),
                      (t.btn_gem.active = !1),
                      j_.hideWindow(F3.MergeConfirmWindow));
                  else {
                    var n = o.progress < 0.1 ? 0.1 : o.progress > 0.9 ? 0.9 : o.progress;
                    o.data.data.config.elementOrderId < 0 &&
                      (t.node_healthfood_order
                        .getChildByName("finish")
                        .getComponent(cc.Sprite).fillStart = n);
                  }
                  h.log("leftTime", o.leftTime);
                };
                if (
                  (o.leftTime >= 0 &&
                    ((this._refreshTimer = b.addClock("elementInfoRefresh", 1, 100, 0)),
                    (this._cdTimerUpdate = r),
                    this._refreshTimer.registCallBack(this, null, r)),
                  G$.isOrderElementCreator(e.data.config.elementOrderId) &&
                    G2.MergeBoardType == _A.getBoardType())
                ) {
                  var a = config.ElementMultiOrderPool.getById(i.orderId);
                  ((this.node_healthfood_order.active = !0),
                    (this.node_healthfood_order.getChildByName("inprogress").active = !0),
                    ((c = this.node_healthfood_order.getChildByName("finish")).active = !0));
                  var s = o.progress < 0.1 ? 0.1 : o.progress > 0.9 ? 0.9 : o.progress;
                  ((c.getComponent(cc.Sprite).fillStart = s),
                    (this.label_desc.string = v.getLabel("elementInfo_createing")),
                    Ai(
                      this.node_healthfood_order.getChildByName("icon").getComponent(cc.Sprite),
                      this.getElementMultiProductUrl(a.elementIdWeight),
                      y.BorderScale,
                    ));
                }
              } else ((this.btn_gem.active = !1), j_.hideWindow(F3.MergeConfirmWindow));
            } else if (
              n &&
              n.value > 0 &&
              G$.isOrderElementCreator(e.data.config.elementOrderId) &&
              G2.MergeBoardType == _A.getBoardType()
            ) {
              var c;
              a = config.ElementMultiOrderPool.getById(i.orderId);
              ((this.node_healthfood_order.active = !0),
                (this.node_healthfood_order.getChildByName("inprogress").active = !1),
                ((c = this.node_healthfood_order.getChildByName("finish")).active = !0),
                (c.getComponent(cc.Sprite).fillStart = 1),
                (this.label_desc.string = v.getLabel("elementInfo_createComplete")),
                Ai(
                  this.node_healthfood_order.getChildByName("icon").getComponent(cc.Sprite),
                  this.getElementMultiProductUrl(a.elementIdWeight),
                  y.BorderScale,
                ));
            }
          } else {
            if (((this.layout_order.node.active = !0), e.data.config.elementOrderId < 0)) {
              this.layout_order.node.active = !1;
              var l = e.data.config.elementOrderId;
              if (G$.isOrderElementCorrect(e.data.config.elementOrderId, y2.group)) {
                this.part3_group.active = !0;
                var d = b2.getPart3OrderIcon(l),
                  u = e9.getTexturePath("orderElementMark/" + d);
                Ai(this.part3_group.getComponentInChildren(cc.Sprite), u);
                var p = this.part3_group.getComponentInChildren(cc.Label),
                  f = b2.GetOrderProgress(l, e.data.remoteData.order);
                p.string = f.cur + "/" + f.all;
              } else if (i.elements && 1 == i.elements.size) {
                var g = 0;
                (i.elements.forEach(function (e, t) {
                  g = t;
                }),
                  (this.node_healthfood_list.active = !0),
                  (this.btn_elementTips.active = !1));
                var m = _A.getHealthFood(),
                  _ = 0,
                  w = 0;
                if (m)
                  _A.getCurOrder().forEach(function (e) {
                    var t = null;
                    if (e > 0) {
                      var i = config.FoodBoardOrder.getById(e);
                      t = K6.ParseItemsConf(i.demand);
                    } else t = _A.getAutoOrderConf().demand;
                    t.forEach(function (e) {
                      var t = _A.OrderMakeList.get(e.itemId);
                      t &&
                        t.orderId == l &&
                        (t.partA == g
                          ? ((_ = t.partB), (w = e.itemId))
                          : t.partB == g && ((_ = t.partA), (w = e.itemId)));
                    });
                  });
                if (m && m.limitTask && m.limitTask.length > 0)
                  for (var C = 0; C < m.limitTask.length; C++) {
                    var I = m.limitTask[C],
                      S = I[0];
                    if (!(1e3 * I[1] < E8.serverTime)) {
                      var T = config.FoodLimitOrder.getById(S);
                      K6.ParseItemsConf(T.demand).forEach(function (e) {
                        var t = _A.OrderMakeList.get(e.itemId);
                        t &&
                          t.orderId == l &&
                          (t.partA == g
                            ? ((_ = t.partB), (w = e.itemId))
                            : t.partB == g && ((_ = t.partA), (w = e.itemId)));
                      });
                    }
                  }
                var E = !0;
                if (
                  (_ ||
                    config.ElementMultiOrderPool.list.forEach(function (e) {
                      e.elementOrderId != l ||
                        _ ||
                        (e.partElement1 == g
                          ? ((_ = e.partElement2),
                            (w = K6.getElementMultiProductId(e.elementIdWeight)),
                            (E = !0))
                          : e.partElement2 == g &&
                            ((_ = e.partElement1),
                            (w = K6.getElementMultiProductId(e.elementIdWeight)),
                            (E = !1)));
                    }),
                  !_)
                )
                  return void (this.node_healthfood_list.active = !1);
                this.label_desc.string = v.getLabel("elementInfo_waitCreate");
                var A = this.node_healthfood_list
                  .getChildByName("item1")
                  .getChildByName("icon")
                  .getComponent(cc.Sprite);
                ((D = this.node_healthfood_list.getChildByName("item1").getChildByName("pic")) &&
                  (D.active = !0),
                  (A.node.opacity = 255),
                  (B = this.node_healthfood_list.getChildByName("item1").getComponent(cc.Button)) &&
                    (B.interactable = !0));
                var k = this.node_healthfood_list
                    .getChildByName("item2")
                    .getChildByName("icon")
                    .getComponent(cc.Sprite),
                  R = this.node_healthfood_list
                    .getChildByName("item3")
                    .getChildByName("icon")
                    .getComponent(cc.Sprite);
                (Ai(A, e9.getElementTexturePath(g), y.BorderScale),
                  Ai(
                    k,
                    !w && E
                      ? e9.getTexturePath("UI/Home/icon_unknown")
                      : e9.getElementTexturePath(_),
                    y.BorderScale,
                  ),
                  Ai(
                    R,
                    w ? e9.getElementTexturePath(w) : e9.getTexturePath("UI/Home/icon_unknown"),
                    y.BorderScale,
                  ));
              } else if (G$.isOrderElementCorrect(e.data.config.elementOrderId, y2.monster)) {
                var P = 0;
                (config.ElementMultiOrderPool.list.forEach(function (e) {
                  e.elementOrderId != l || P || (P = e.partElement1);
                }),
                  (this.node_healthfood_list.active = !0));
                var D, B;
                A = this.node_healthfood_list
                  .getChildByName("item1")
                  .getChildByName("icon")
                  .getComponent(cc.Sprite);
                ((D = this.node_healthfood_list.getChildByName("item1").getChildByName("pic")) &&
                  (D.active = !1),
                  (A.node.opacity = 100),
                  (B = this.node_healthfood_list.getChildByName("item1").getComponent(cc.Button)) &&
                    (B.interactable = !1));
                ((k = this.node_healthfood_list
                  .getChildByName("item2")
                  .getChildByName("icon")
                  .getComponent(cc.Sprite)),
                  (R = this.node_healthfood_list
                    .getChildByName("item3")
                    .getChildByName("icon")
                    .getComponent(cc.Sprite)));
                (Ai(A, e9.getElementTexturePath(P), y.BorderScale),
                  Ai(k, e9.getTexturePath("UI/Home/icon_unknown"), y.BorderScale),
                  Ai(R, e9.getTexturePath("UI/Home/icon_unknown"), y.BorderScale));
              }
            }
            if (e.data.config.elementOrderId > 0) {
              Array.from(this.layout_order.node.children).forEach(function (e) {
                return ot.PutPrefab(e);
              });
              var L = e.data.remoteData.order.orderId;
              (T = config.ElementOrderPool.getById(L)).demand.forEach(function (i, n) {
                var o = parseInt(n),
                  r = i,
                  a = e.data.remoteData.order.elements.get(o);
                !a && (a = 0);
                var s = ot.GetPrefab(t.node_order_item),
                  c = s.getChildByName("icon").getComponent(cc.Sprite),
                  l = s.getChildByName("num").getComponent(cc.Label),
                  d = s.getChildByName("complete");
                (Ai(c, e9.getElementTexturePath(o), y.BorderScale),
                  (l.string = a + "/" + r),
                  (d.active = a >= r),
                  (l.node.active = a < r),
                  s.off("click", t.onClickElementInfo, t),
                  s.on("click", t.onClickElementInfo, t),
                  (s.parent = t.layout_order.node),
                  (s.name = "item_" + o),
                  (s.active = !0));
              });
            }
          }
        }
      }),
      (n.prototype.getElementMultiProductUrl = function (e) {
        if (1 == e.size) {
          var t = e.keys().next().value.split("_"),
            i = parseInt(t[0]);
          return e9.getElementTexturePath(i);
        }
        return e9.getTexturePath("UI/Home/icon_unknown");
      }),
      (n.prototype.showElementInfoLockWeb = function (e) {
        !e.data.config.dustingCostDiamond || e.data.config.dustingCostDiamond < 0
          ? (this.btn_gem.active = !1)
          : ((this.btn_gem.active = !0),
            (this.label_speedup.node.parent.active = !1),
            (this.label_speedup.node.active = !1),
            (this.label_cd.node.active = !0),
            (this.label_cd.string = v.getLabel("elementInfo_unlock")),
            (this.label_gemPrice.node.active = !0),
            (this.label_gemPrice.string = "" + e.data.config.dustingCostDiamond),
            Ct.onUIState(this.btn_gem, It.Active));
      }),
      (n.prototype.showDeterioratedElement = function (e) {
        var t = this;
        if ("Blovers" == e.data.config.type || "Picnic" == e.data.config.type) {
          var i = e.data.remoteData.deteriorateEnd,
            n = i - E8.serverTime,
            o = Math.ceil(n / 1e3);
          if (o > 0) {
            this.label_lefttime.node.parent.parent.active = !0;
            ((this._refreshTimer = b.addClock("DeterioratedTime", o, 100, 1)),
              this._refreshTimer.registCallBack(this, null, function (e) {
                var n = i - E8.serverTime;
                ((t.label_lefttime.string = j(Math.ceil(n / 1e3), !1, !0, 2)),
                  e.leftSecond < 0.5 && (t.label_lefttime.node.parent.parent.active = !1));
              }));
          }
        }
      }),
      (n.prototype.showVegetableElement = function (e) {
        var t =
          e.data.remoteData.extra &&
          parseFloat(e.data.remoteData.extra.get(fr.chess4VegetableWeight));
        if (t) {
          var i = X8.getConf();
          ((this.label_weight.string = t + i.chess4_listDetail_targetMeasure),
            (this.label_weight.node.parent.active = !0),
            (cc.find("txt", this.label_weight.node.parent).getComponent(cc.Label).string =
              i.chess4_weight));
        }
      }),
      (n.prototype.showLampPassCount = function (e) {
        var t,
          i,
          n,
          o = e.data.remoteData.extra && parseFloat(e.data.remoteData.extra.get(fr.magicLamp));
        if (!o) return !1;
        if (
          !(null ===
            (n =
              null === (i = null === (t = e.data) || void 0 === t ? void 0 : t.remoteData) ||
              void 0 === i
                ? void 0
                : i.recovery) || void 0 === n
            ? void 0
            : n.get(yr.manualProduct))
        )
          return !1;
        var r = cc.find("number", this.node_lamp);
        return (
          !!r && ((this.node_lamp.active = !0), (r.getComponent(cc.Label).string = "+" + o), !0)
        );
      }),
      (n.prototype.showAdSkip = function (e) {
        var t;
        if (e && e.data && config.Config.config.adSkipCdBoard.includes(G2.MergeBoardType)) {
          var i = 0;
          if (s.boardAdSkipMap.has(G2.MergeBoardType)) i = s.boardAdSkipMap.get(G2.MergeBoardType);
          else {
            var n = (
              null === (t = G2.Data.specialCount) || void 0 === t ? void 0 : t.has(rr.adSkipCd)
            )
              ? G2.Data.specialCount.get(rr.adSkipCd)
              : 0;
            (s.boardAdSkipMap.set(G2.MergeBoardType, n), (i = n));
          }
          if (i >= config.Config.config.adSkipCdCount)
            return (
              (this.node_adSkip.active = !1),
              (this.btn_sell.active =
                !!e.data.config.sellPriceCoin &&
                !G$.IsCellInState(e, mr.web) &&
                !G$.IsCellInState(e, mr.box) &&
                H2.checkElementCanSell(e.data.config.id) &&
                K6.SellProTectedCheck(e.data.config)),
              void (e.data.elementType.includes(Z2.STORE_ELEMENT) && (this.btn_sell.active = !1))
            );
          var o = e.data.elementType.includes(Z2.MANU_CREATOR),
            r = e.data.elementType.includes(Z2.AUTO_CREATOR);
          if ((o && this.checkNeedShowCreator(e)) || r) {
            var a = e.data.getRecovery(yr.manualProduct),
              c = e.data.getRecovery(yr.autoProduct);
            if (a && a.value < e.data.config.elementCDStorage && a.state) {
              var l = e.dynamicComponents.get("ManuCreatorRecover");
              if (G$.CheckProductMax(e, !1))
                return (
                  (this.node_adSkip.active = !1),
                  (this.btn_sell.active =
                    !!e.data.config.sellPriceCoin &&
                    !G$.IsCellInState(e, mr.web) &&
                    !G$.IsCellInState(e, mr.box) &&
                    H2.checkElementCanSell(e.data.config.id) &&
                    K6.SellProTectedCheck(e.data.config)),
                  void (
                    e.data.elementType.includes(Z2.STORE_ELEMENT) && (this.btn_sell.active = !1)
                  )
                );
              ((this.node_adSkip.active = !0), (this.btn_sell.active = !1));
              var d = 15,
                u = 30,
                h = l.data.recover.getAllTime(e.data.config.elementCDStorage) >= 27e5 ? u : d;
              cc.find("label", this.node_adSkip).getComponent(cc.Label).string = "-" + h + "m";
            } else if (c && (c.value <= 0 || c.state > 0)) {
              l = e.dynamicComponents.get("AutoCreatorRecover");
              if (G$.CheckProductMax(e, !0))
                return (
                  (this.node_adSkip.active = !1),
                  (this.btn_sell.active =
                    !!e.data.config.sellPriceCoin &&
                    !G$.IsCellInState(e, mr.web) &&
                    !G$.IsCellInState(e, mr.box) &&
                    H2.checkElementCanSell(e.data.config.id) &&
                    K6.SellProTectedCheck(e.data.config)),
                  void (
                    e.data.elementType.includes(Z2.STORE_ELEMENT) && (this.btn_sell.active = !1)
                  )
                );
              ((this.node_adSkip.active = !0), (this.btn_sell.active = !1));
              ((d = 15),
                (u = 30),
                (h = l.data.recover.getAllTime(G$.GetAutoCDStorage(e)) >= 27e5 ? u : d));
              cc.find("label", this.node_adSkip).getComponent(cc.Label).string = "-" + h + "m";
            }
          }
        } else this.node_adSkip.active = !1;
      }),
      (n.prototype.showBatteryCount = function (e) {
        var t,
          i,
          n,
          o = e.data.remoteData.extra && parseFloat(e.data.remoteData.extra.get(fr.battery));
        if (!o) return !1;
        if (
          !(null ===
            (n =
              null === (i = null === (t = e.data) || void 0 === t ? void 0 : t.remoteData) ||
              void 0 === i
                ? void 0
                : i.recovery) || void 0 === n
            ? void 0
            : n.get(yr.manualProduct))
        )
          return !1;
        var r = cc.find("number", this.node_battery);
        return (
          !!r && ((this.node_battery.active = !0), (r.getComponent(cc.Label).string = "x" + o), !0)
        );
      }),
      (n.prototype.clear = function () {
        if (
          (j_.hideWindow(F3.MergeConfirmWindow),
          this.clearElementInfoRender(),
          (this._elementConf = null),
          this._cdTimer &&
            (this._cdTimerUpdate &&
              (this._cdTimer.removeCallBack(this), (this._cdTimerUpdate = null)),
            (this._cdTimer = null)),
          this._refreshTimer && (this._refreshTimer.dispose(), (this._refreshTimer = null)),
          this._sellCacheUUid)
        ) {
          var e = this._sellCacheUUid.toString();
          (IC.removePushItem(bC.Element, e), (this._sellCacheUUid = 0));
        }
        (this._doubleTimer && (this._doubleTimer.dispose(), (this._doubleTimer = null)),
          (this._sellCache = null),
          this.pushSub.clear());
      }),
      (n.prototype.onClickGem = function () {
        var e;
        return r(this, void 0, void 0, function () {
          var t, i, n, o, r, s, c, l, d, h;
          return a(this, function (a) {
            switch (a.label) {
              case 0:
                if (xz.touchPause) return [2];
                if (!this._cell || !this._cell.data) return [2];
                if (
                  ((t = pr.bubble),
                  (i =
                    this.label_gemPrice.string == v.getLabel("common_free")
                      ? 0
                      : parseInt(this.label_gemPrice.string)),
                  !K6.checkBuy(_a.diamond, i))
                )
                  return [2];
                if (
                  ((n = 0),
                  (o = this._cell.data.config.id),
                  (r = this._cell.data.remoteData),
                  (s = this._cell.data.config.propEffect),
                  G$.IsCellInState(this._cell, mr.web))
                )
                  t = pr.webUnlock;
                else if (this._cell.data.elementType.includes(Z2.BUBBLE))
                  ((t = pr.bubble), (n = this._cell.data.remoteData.bubbleEnd - E8.serverTime));
                else if (
                  this._cell.data.config.unlockDuration > 0 &&
                  !G$.IsCellInState(this._cell, mr.opened)
                )
                  t = pr.chestOpen;
                else if (this._cell.data.elementType.includes(Z2.ORDER))
                  ((t = pr.elementOrder),
                    (n = this._cell.data.remoteData.order.endTime - E8.serverTime));
                else if (MW.isStoreCell(this._cell)) {
                  if (!(c = MW.getCurrentLauncher(this._cell)) || !c.cell) return [2];
                  ((t = pr.manualProduct),
                    (o = c.cell.elementId),
                    (r = c.cell),
                    c.cell._shortCdManuRoundEndTime && (t = pr.shortRecovery));
                } else
                  this._cell.data.elementType.includes(Z2.MANU_CREATOR) &&
                  this.checkNeedShowCreator(this._cell)
                    ? ((t = pr.manualProduct),
                      this._cell.data.remoteData._shortCdManuRoundEndTime && (t = pr.shortRecovery))
                    : this._cell.data.elementType.includes(Z2.AUTO_CREATOR)
                      ? ((t = pr.autoProduct),
                        this._cell.data.remoteData._shortCdAutoRoundEndTime &&
                          ((t = pr.shortRecovery),
                          (n =
                            this._cell.data.remoteData._shortCdAutoRoundEndTime - E8.serverTime)),
                        0 == i && (n = 0))
                      : s && 16 == ~~(s / 100) && (t = pr.doubleEButtonCd);
                ((l = 0),
                  (d = function (e) {
                    l = e ? 1 : 2;
                  }),
                  (0 == n || n > 500) &&
                  i > 0 &&
                  ((t == pr.webUnlock && rk.isSettingOpen(tk.Web)) ||
                    (t == pr.bubble && rk.isSettingOpen(tk.Bubble)) ||
                    ((t == pr.elementOrder ||
                      t == pr.chestOpen ||
                      t == pr.manualProduct ||
                      t == pr.autoProduct ||
                      t == pr.doubleEButtonCd) &&
                      rk.isSettingOpen(tk.Speedup)))
                    ? j_.showWindow(F3.MergeConfirmWindow, {
                        cb: d.bind(this),
                        id: o,
                        leftTime: n,
                        cdtype: t,
                        count: i,
                        label: this.label_gemPrice,
                        remoteData: r,
                      })
                    : (l = 1),
                  (a.label = 1));
              case 1:
                return 0 != l ? [3, 3] : [4, S(33)];
              case 2:
                return (a.sent(), [3, 1]);
              case 3:
                return (
                  2 == l ||
                    ((i =
                      this.label_gemPrice.string == v.getLabel("common_free")
                        ? 0
                        : parseInt(this.label_gemPrice.string)),
                    (h =
                      this._cell.data.remoteData.productType == vr.goldenBubble && t == pr.bubble),
                    t == pr.bubble &&
                      r3.ButterflyScoreByCell(this._cell).score > 0 &&
                      (r3.ShowButterflyAnim = !0),
                    t == pr.bubble &&
                      (DC.checkActPlusEnergy(this._cell, 3),
                      this._cell.data.remoteData.extra.set(fr.eventEnergyI, ""),
                      X8.checkActPlusEnergy(this._cell, 3),
                      this._cell.data.remoteData.extra.set(fr.eventEnergyII, ""),
                      null === (e = dI.instance) ||
                        void 0 === e ||
                        e.checkAct8Energy(this._cell, 3, !0),
                      this._cell.data.remoteData.extra.set(fr.eventEnergyIV, ""),
                      b3.checkActivity() && b3.instance.addBubblePoint(this._cell),
                      hx.instance.collectBubbleExtraRes(this._cell)),
                    TJ.CellBuyCd(this._cell, t, i),
                    this._cell.recoverAnim(),
                    o8.updateCondition("SpeedupComplete", 1),
                    SL.addBehavior(_L.buy_cd, { type: pr[t], cost: i }),
                    K3.afReport("element_gem", { type: pr[t], cost: i }, !0),
                    K3.logEvent("element_gem", {
                      type: t,
                      cost: i,
                      id: o,
                      info: h ? "goldbubble" : "",
                    }),
                    u.dispatch("showElementInfo", this._cell)),
                  [2]
                );
            }
          });
        });
      }),
      (n.prototype.onClickAdSkip = function (e, t) {
        return r(this, void 0, void 0, function () {
          var t, i, n, o, r, c, l, d, h, p, f, g, v, m, y, _;
          return a(this, function (a) {
            if (!e) return [2];
            if (xz.touchPause) return [2];
            if (!this._cell || !this._cell.data) return [2];
            for (
              t = this._cell.data.remoteData.recovery.get(yr.manualProduct),
                i = 0,
                n = 0,
                o = pr.manualProduct,
                this._cell.data.elementType.includes(Z2.MANU_CREATOR) &&
                this._cell.data.elementType.includes(Z2.AUTO_CREATOR)
                  ? ((t = this._cell.data.remoteData.recovery.get(yr.manualProduct)),
                    (r = this._cell.data.remoteData.recovery.get(yr.autoProduct)),
                    (l = t.value < this._cell.data.config.elementCDStorage),
                    (d = G$.GetAutoCDStorage(this._cell)),
                    (c = r.value <= 0 || r.state > 0),
                    (o = pr.manualProduct),
                    (n = t.getAllTime(this._cell.data.config.elementCDStorage)),
                    l
                      ? (i = t.getLeftTime(this._cell.data.config.elementCDStorage))
                      : c
                        ? ((t = this._cell.data.remoteData.recovery.get(yr.autoProduct)),
                          (o = pr.autoProduct),
                          (h = Math.min(
                            this._cell.data.config.AutoStorage,
                            Math.max(d, t.value + d),
                          )),
                          (i = t.getLeftTime(h)),
                          (n = r.getAllTime(d)))
                        : ((h = Math.min(
                            this._cell.data.config.elementStorage,
                            t.value + this._cell.data.config.elementCDStorage,
                          )),
                          (i = t.getLeftTime(h))))
                  : this._cell.data.elementType.includes(Z2.MANU_CREATOR) &&
                      this._checkNeedShowCreator(this._cell)
                    ? ((t = this._cell.data.remoteData.recovery.get(yr.manualProduct)),
                      (o = pr.manualProduct),
                      (l = t.value < this._cell.data.config.elementCDStorage),
                      (h = Math.min(
                        this._cell.data.config.elementStorage,
                        t.value + this._cell.data.config.elementCDStorage,
                      )),
                      (i = l
                        ? t.getLeftTime(this._cell.data.config.elementCDStorage)
                        : t.getLeftTime(h)),
                      (n = t.getAllTime(this._cell.data.config.elementCDStorage)))
                    : this._cell.data.elementType.includes(Z2.AUTO_CREATOR) &&
                      ((t = this._cell.data.remoteData.recovery.get(yr.autoProduct)),
                      (o = pr.autoProduct),
                      (d = G$.GetAutoCDStorage(this._cell)),
                      (h = Math.min(this._cell.data.config.AutoStorage, Math.max(d, t.value + d))),
                      (i = t.getLeftTime(h)),
                      (n = t.getAllTime(d))),
                p = config.Config.config.adSkipCdTime,
                f = 0,
                g = 0;
              g < p.length;
              ++g
            )
              ((v = p[g]), (m = 60 * v[0] * 1e3), n >= m && (f = v[1]));
            return (
              (y = Math.min(i, 60 * f * 1e3)),
              t.startTime > 0 && (t.startTime -= y),
              TJ.AdSkipCreator(this._cell, o),
              t.check(!0, { isBuyCd: !0 }),
              this._cell.recoverAnim(),
              (_ = s.boardAdSkipMap.get(G2.MergeBoardType)),
              _++,
              s.boardAdSkipMap.set(G2.MergeBoardType, _),
              u.dispatch("showElementInfo", this._cell),
              [2]
            );
          });
        });
      }),
      (n.prototype._checkNeedShowCreator = function (e) {
        var t = e.data.getRecovery(yr.manualProduct),
          i = e.dynamicComponents.get("ManuCreatorRecover");
        return (
          !(!e.data.elementType.includes(Z2.AUTO_UNLOCK) || G$.IsCellInState(e, mr.opened)) ||
          !(!t || !i || t.isFull)
        );
      }),
      (n.prototype.onClickUse = function () {
        this._cell && this._cell.data && this._cell.callLogic(RA.CLICK_ELEMENT);
      }),
      (n.prototype.onClickDoor = function () {
        var e = this;
        if (this._cell && this._cell.data) {
          var t = this._cell.data.config.propEffect,
            i = config.PropEffect.getById(t);
          A8.Alert({
            title: v.getLabel("elementDoor_title"),
            content: i.describe,
            confirmText: i.txt,
            showCancel: !0,
            callback: function (t) {
              return r(e, void 0, void 0, function () {
                return a(this, function (i) {
                  return (
                    t &&
                      (function () {
                        var t = e._cell.data.config.propEffect;
                        if (t && 12 == ~~(t / 100)) {
                          var i = e._cell.serverIdx,
                            n = config.PropEffect.getById(t);
                          if (n && n.effectParams) {
                            TJ.BoardRequestSend(
                              hm.propUse,
                              {
                                boardId: G2.Data.id,
                                index: i,
                                toIndex: 0,
                                product: null,
                                timestamp: E8.serverTime,
                              },
                              "propuse",
                            );
                            var o = n.effectParams,
                              r = config.Board.getById(o),
                              a = ar[r.actTheme];
                            C4.show({ goScreen: J8.MERGE_SCREEN, boardType: a });
                          }
                        }
                      })(),
                    [2]
                  );
                });
              });
            },
          });
        }
      }),
      (n.prototype.onClickFake = function () {
        var e, t, i, n, o, r, a, s;
        if (
          null ===
            (t = null === (e = config.Config.config) || void 0 === e ? void 0 : e.fakeButtonId) ||
          void 0 === t
            ? void 0
            : t.includes(
                null ===
                  (o =
                    null === (n = null === (i = this._cell) || void 0 === i ? void 0 : i.data) ||
                    void 0 === n
                      ? void 0
                      : n.config) || void 0 === o
                  ? void 0
                  : o.id,
              )
        ) {
          var c = null === (r = this._cell) || void 0 === r ? void 0 : r.data.config.id,
            l =
              null ===
                (s =
                  null === (a = config.Config.config) || void 0 === a ? void 0 : a.fakeButtonId) ||
              void 0 === s
                ? void 0
                : s.indexOf(c),
            d = config.Config.config.fakeButtonTip[l];
          d && d.length && A8.Toast({ title: d });
        }
      }),
      (n.prototype.onClickUndo = function () {
        if (!xz.touchPause && this._sellCache) {
          var e = null,
            t = 0,
            i = !1;
          if (this._cell.data) {
            var n = G$.GetBlankCell();
            n.length > 0
              ? ((t = n[0].serverIdx),
                (this._sellCache.index = n[0].serverIdx),
                GW.AddBoardCell(this._sellCache.index, this._sellCache),
                (this._cell = n[0]),
                (e = GW.ParseCellCofigByData(this._sellCache)),
                (i = !0))
              : (TJ.PutIntoChannel(this._cell.data.config.id, this._cell.serverIdx),
                (t = this._sellCache.index),
                GW.AddBoardCell(t, this._sellCache),
                (e = GW.ParseCellCofigByData(this._sellCache)));
          } else
            ((t = this._sellCache.index),
              GW.AddBoardCell(this._sellCache.index, this._sellCache),
              (e = GW.ParseCellCofigByData(this._sellCache)));
          var o = e.remoteData;
          if (
            (TJ.BoardRequestSend(
              hm.cellUndo,
              { boardId: G2.Data.id, toIndex: t, timestamp: E8.serverTime },
              "cellundo",
            ),
            F8.switches.boardDebugInfo &&
              K3.logEvent("board_operate_info", {
                type: "cellundo",
                detail: "from:" + t + "_" + o.elementId,
              }),
            (this._cell.data = e),
            G$.ResumeCell(o),
            i && this._cell.setElementTo(this._cell.worldPos),
            !this._cell.data)
          )
            return void u.dispatch("hideElementInfo");
          if (
            (e3.AddCellAnim(this._cell, TC.GET_BAG_END),
            this._cell.data.elementType.includes(Z2.CHEST) && this._sellCache.openEnd > 0)
          )
            b2.isElementNewUnlock(this._cell.data.config.id)
              ? b2.ManuNewUnlock(this._cell)
              : b2.ManuUnlock(this._cell);
          var r = this._cell.data.config.sellPriceCoin;
          (this.Act8SellPrice >= 0 && (r = this.Act8SellPrice),
            (E8.role.coin -= r),
            ZC.valueLabel("coin"),
            (this.label_info.string = v.getLabel(
              "element_undo",
              this._cell.data.config.name,
              this._cell.data.config.level,
            )),
            (G2.instance.selectedElement = this._cell),
            (this._sellCache = null),
            (this._sellCacheUUid = 0),
            this._cell.isElementAtCenter() || this._cell.moveElementTo(this._cell.worldPos),
            (this.label_desc.string = ""),
            (G2.instance.detailInfoElement = this._cell),
            K3.logEvent("element_undo", { id: this._cell.data.config.id }),
            u.dispatch("showElementInfo", this._cell));
        }
      }),
      (n.prototype.onClickInfo = function () {
        var e, t;
        (o8.isRunning(BG.GUIDE_ID) && o8.skipGuide(),
          MW.isStoreCell(this._cell)
            ? j_.showWindow(F3.StoreElementDetailWindow, {
                id: this._cell.data.config.id,
                source: "board",
                storeCell: this._cell,
                skipStoreRedirect: !0,
              })
            : this._elementConf &&
              b2.ShowElementDetail(
                this._elementConf.id,
                null ===
                  (t = null === (e = this._cell) || void 0 === e ? void 0 : e.mergeCellRender) ||
                  void 0 === t
                  ? void 0
                  : t.node,
                !0,
              ));
      }),
      (n.prototype.onClickElementInfo = function (e) {
        var t = parseInt(e.node.name.split("_")[1]);
        b2.ShowElementDetail(t, e.node, !0);
      }),
      (n.prototype.onClickUnlock = function () {
        if (!xz.touchPause) {
          var e = this._cell.data.config,
            t = b2.isElementNewUnlock(e.id);
          if (t) {
            if (G2.UnlockingNewElement)
              return void A8.Toast({ title: v.getLabel("manuElement_unlockingOne") });
          } else if (G2.UnlockingManuElement)
            return void A8.Toast({ title: v.getLabel("manuElement_unlockingOne") });
          var i = G2.BoardCells.get(this._cell.serverIdx);
          ((i.openEnd = E8.serverTime + 1e3 * G$.getELementUnlockDuration(e.id, e.unlockDuration)),
            (this._cell.data.isOld = !1),
            i._speedUpStartTime && (i._speedUpStartTime = E8.serverTime),
            t ? b2.ManuNewUnlock(this._cell) : b2.ManuUnlock(this._cell),
            DG.addCellSpeedUpAnim(this._cell));
          var n = this._cell.dynamicComponents.get("ManuUnlockRecover");
          (n && (n.data = this._cell),
            e.unlockSound && j8.play("mergeUnlock_" + e.unlockSound),
            TJ.BoardRequestSend(
              hm.cellOpen,
              { boardId: G2.Data.id, index: this._cell.serverIdx, timestamp: E8.serverTime },
              "cellopen",
            ),
            K3.logEvent("element_unlock", { id: e.id }),
            u.dispatch("showElementInfo", this._cell));
        }
      }),
      (n.prototype.onClickLamp = function () {
        A8.Toast({ title: v.getLabel("ui_btn_lamp1_click") });
      }),
      (n.prototype.onClickBattery = function () {
        A8.Toast({ title: v.getLabel("descToast_battery") });
      }),
      (n.prototype.onClickBreakBubble = function () {
        return r(this, void 0, void 0, function () {
          var e, t, i, n, o;
          return a(this, function (r) {
            switch (r.label) {
              case 0:
                if (
                  !this._cell ||
                  !this._cell.data ||
                  !this._cell.data.elementType.includes(Z2.BUBBLE)
                )
                  return [2];
                ((e = this._cell.data.remoteData.productType),
                  (t = 0),
                  (i = function (e) {
                    t = e ? 1 : 2;
                  }),
                  rk.isSettingOpen(tk.BreakBubble) || e == vr.frozenBubble
                    ? j_.showWindow(F3.MergeConfirmWindow, {
                        cb: i.bind(this),
                        id: this._cell.data.config.id,
                        type: "breakBubble",
                        remoteData: this._cell.data.remoteData,
                        hideCheck: e == vr.frozenBubble,
                      })
                    : (t = 1),
                  (r.label = 1));
              case 1:
                return 0 != t ? [3, 3] : [4, S(33)];
              case 2:
                return (r.sent(), [3, 1]);
              case 3:
                return 2 == t
                  ? [2]
                  : (TJ.BreakBubble(this._cell),
                    e == vr.frozenBubble
                      ? (KM.instance.breakFrozenBubble(this._cell, "click"), [2])
                      : ((n = GW.ParseCellConfig(
                          {
                            id: this._cell.data.config.bubbleToCoin,
                            seed: this._cell.data.seed.seed,
                            state: this._cell.data.elementLockStage,
                            productType: vr.none,
                          },
                          this._cell.serverIdx,
                        )),
                        (this._cell.data = n),
                        (this._cell.mergeCellRender.node_icon.scale = 0.2),
                        (o = cc
                          .tween(this._cell.mergeCellRender.node_icon)
                          .to(0.166, { scale: 1.2 })
                          .to(0.1, { scale: 0.95 })
                          .to(0.033, { scale: 1 })),
                        this._cell.showOnceTween(o),
                        this._cell.isSelect &&
                          ((this._cell.isSelect = !1),
                          (this._cell.isSelect = !0),
                          u.dispatch("showElementInfo", this._cell)),
                        e == vr.bubble
                          ? e3.AddCellAnim(this._cell, TC.BUBBLE_END)
                          : e3.AddCellAnim(this._cell, TC.BUBBLE_END2),
                        j8.play(o_.MERGE_END_BUBBLE),
                        e3.RemoveCellAnim(this._cell, TC.DISCOUNT_TIPS),
                        u.dispatch("newElementCreate", this._cell.data),
                        K3.logEvent("skip_bubble"),
                        [2]));
            }
          });
        });
      }),
      (n.prototype.onClickElement = function () {
        return r(this, void 0, void 0, function () {
          return a(this, function (e) {
            return (this._cell && this._cell.data && this._cell.clickElement(), [2]);
          });
        });
      }),
      (n.prototype.onClickSell = function () {
        return r(this, void 0, void 0, function () {
          var e,
            t,
            i,
            n,
            o,
            r,
            s,
            c,
            l,
            d,
            u = this;
          return a(this, function (a) {
            switch (a.label) {
              case 0:
                if (xz.touchPause) return [2];
                if (!this._cell || !this._cell.data) return [3, 4];
                if (this._cell.isLock) return [2];
                if (
                  ((e = G2.Data.id),
                  G$.IsCellInState(this._cell, mr.web) || G$.IsCellInState(this._cell, mr.box))
                )
                  return [2];
                (j8.vibrate(),
                  (t = 0),
                  (i = function (e) {
                    t = e ? 1 : 2;
                  }),
                  this._cell.data.config.sellDoubleCheck && rk.isSettingOpen(tk.SellCell)
                    ? j_.showWindow(F3.MergeConfirmWindow, {
                        cb: i.bind(this),
                        id: this._cell.data.config.id,
                      })
                    : (t = 1),
                  (a.label = 1));
              case 1:
                return 0 != t ? [3, 3] : [4, S(33)];
              case 2:
                return (a.sent(), [3, 1]);
              case 3:
                if (2 == t) return [2];
                ((this._sellCache = this._cell.data.remoteData),
                  ((n = new Za()).itemType = oa.coin),
                  (n.value = 1),
                  h3.complexFly(n, null, this._cell.worldPos, null, 50),
                  hx.checkActEnergy(this._cell),
                  qG.checkEnergy(this._cell, 0, !0),
                  (o = hx.instance.collectCellAllExtraRes(this._cell)) &&
                    o.forEach(function (e) {
                      u._sellCache.extra.set(e, "");
                    }),
                  this._sellCache.extra.set(fr.eventEnergyI, ""),
                  this._sellCache.extra.set(fr.eventEnergyII, ""),
                  this._sellCache.extra.set(fr.eventEnergyIII, ""),
                  this._sellCache.extra.set(fr.eventEnergyIV, ""),
                  this._sellCache.extra.set(fr.energy, ""),
                  (this._sellCacheUUid = this._cell.data.serverData.uUID),
                  (r = this._sellCache),
                  (s = this._cell.data.config.sellPriceCoin),
                  this.Act8SellPrice >= 0 && (s = this.Act8SellPrice),
                  (E8.role.coin += s),
                  ZC.valueLabel("coin"),
                  G$.PauseCell(r),
                  TJ.BoardRequestSend(
                    hm.cellSell,
                    { boardId: e, index: this._cell.serverIdx, timestamp: E8.serverTime },
                    "cellsell",
                  ),
                  F8.switches.boardDebugInfo &&
                    K3.logEvent("board_operate_info", {
                      type: "cellsell",
                      detail: "from:" + this._cell.serverIdx + "_" + this._cell.data.config.id,
                    }),
                  (c = this._cell.mergeCellRender.sprite_icon
                    ? this._cell.mergeCellRender.sprite_icon.spriteFrame
                    : null),
                  (this._cell.data = null),
                  (l = e3.AddCellAnim(this._cell, TC.ELEMENT_DISAPPEAR)),
                  e3.AddCellAnim(this._cell, TC.GET_ENERGY),
                  (l.children[0].getComponent(cc.Sprite).spriteFrame = c),
                  G2.UnlockingManuElement &&
                  G2.UnlockingManuElement.serverIdx == this._cell.serverIdx
                    ? b2.ManuUnlockFinish()
                    : G2.UnlockingNewElement &&
                      G2.UnlockingNewElement.serverIdx == this._cell.serverIdx &&
                      b2.ManuNewUnlockFinish(),
                  (d = config.Element.getById(this._sellCache.elementId)) &&
                    ((this.label_info.string = v.getLabel("element_cancelSell")),
                    (this.label_desc.string = v.getLabel(
                      "element_cancelSellDesc",
                      d.name,
                      d.level,
                    )),
                    K3.logEvent("element_sell", { id: d.id })),
                  this.hideAll(),
                  (this.btn_undo.active = !0),
                  Ct.onUIState(this.btn_undo, It.Active),
                  (G2.instance.selectedElement = null),
                  this.layout_btn.updateLayout(),
                  (this.label_desc.node.width = 480 - this.layout_btn.node.width),
                  this.adaptInfoWidth(),
                  this.label_info.node.parent.getComponent(cc.Layout).updateLayout(),
                  (a.label = 4));
              case 4:
                return [2];
            }
          });
        });
      }),
      (n.prototype.adaptInfoWidth = function () {
        ((this.label_info.maxWidth = 430 - this.layout_btn.node.width),
          this.pushSub.node.active && (this.label_info.maxWidth -= this.pushSub.node.width),
          this.label_info.adaptWidth());
      }),
      (n.prototype.onClickTakeOut = function () {
        return r(this, void 0, void 0, function () {
          var e, t, i, n, o, r, s;
          return a(this, function (a) {
            return !this._cell || !this._cell.data || this._cell.data.config.elementOrderId >= 0
              ? [2]
              : (e = this._cell.data.remoteData.order).elements && 0 != e.elements.size
                ? ((t = 0),
                  e.elements.forEach(function (e, i) {
                    t = i;
                  }),
                  this._cell.data.remoteData.order.elements.delete(t),
                  (this._cell.data = this._cell.data),
                  (i = G2.Data.id),
                  0 == (n = G$.GetClosestBlankCell(this._cell.pos, 1)).length
                    ? (((o = new Za()).id = TJ.GetMergeIncreaseId()),
                      (o.itemType = oa.element),
                      (o.itemId = t),
                      (o.value = 1),
                      (o.from = "boardTakeOut," + t),
                      G2.ChannelAdd(o))
                    : ((r = { id: t, state: mr.none }),
                      ((s = new w2()).data = r),
                      (s.seed = this._cell.data.randomElementInt()),
                      (s.fromCell = this._cell),
                      (s.productType = vr.none),
                      (s.isCreator = !0),
                      TJ.CreateNewElement(s)),
                  j8.play(o_.MERGE_CREATE),
                  u.dispatch("updateChannelInfo"),
                  u.dispatch("updateElementInfo", this._cell.serverIdx),
                  TJ.BoardRequestSend(
                    hm.takeOutElementFromOrder,
                    {
                      boardId: i,
                      index: this._cell.serverIdx,
                      eleId: t,
                      toIndex: n.length > 0 ? n[0].serverIdx : -1,
                      timestamp: E8.serverTime,
                    },
                    "cellsell",
                  ),
                  [2])
                : [2];
          });
        });
      }),
      (n.prototype.hideAll = function () {
        ((this.node_info.active = !1),
          (this.btn_gem.active = !1),
          (this.btn_gem_pop.active = !1),
          (this.btn_door.active = !1),
          (this.btn_use.active = !1),
          (this.node_lamp.active = !1),
          (this.node_adSkip.active = !1),
          (this.node_battery.active = !1),
          this.btn_fake && (this.btn_fake.active = !1),
          (this.btn_info.active = !1),
          (this.btn_sell.active = !1),
          (this.btn_undo.active = !1),
          (this.btn_unlock.active = !1),
          (this.btn_privilege.active = !1),
          (this.label_special.node.active = !1),
          (this.btn_adBubble.node.active = !1),
          (this.btn_breakAdBubble.active = !1),
          (this.btn_GogBubble.active = !1),
          (this.part3_group.active = !1),
          (this.btn_breakGogBubble.active = !1),
          (this.btn_elementTips.active = !1),
          (this.label_lefttime.node.parent.parent.active = !1),
          (this.label_leftnum.node.parent.active = !1),
          (this.label_weight.node.parent.active = !1),
          (this.layout_order.node.active = !1),
          (this.node_healthfood_order.active = !1),
          (this.node_healthfood_list.active = !1),
          (this._isInCd = !1),
          this._refreshTimer && this._refreshTimer.dispose(),
          (this._refreshTimer = null),
          (this._cdTimerUpdate = null),
          this._doubleTimer && this._doubleTimer.dispose(),
          this.clearElementInfoRender());
      }),
      (n.prototype.initElementInfoRender = function () {
        if (
          this.node_info &&
          this.elementInfoRenderParent &&
          this.elementInfoRenderPrefabs &&
          0 != this.elementInfoRenderPrefabs.length
        ) {
          var e = FG.getInstance();
          (e.init(
            this.elementInfoRenderParent,
            this.elementInfoRenderPrefabs,
            this.elementInfoRenderParentRight,
          ),
            e.registerRender(LG.Store, new WG()),
            (this._elementInfoRenderReady = !0));
        }
      }),
      (n.prototype.clearElementInfoRender = function () {
        this._elementInfoRenderReady && FG.getInstance().clearComponents();
      }),
      (n.prototype.showCustomElementInfo = function (e, t) {
        return (
          !!this._elementInfoRenderReady &&
          !!FG.getInstance().render(e, this) &&
          (!t && rb.playAnimation(this.anim_show, "elementinfotips"), !0)
        );
      }),
      (n.prototype.onClickUnlockGogBubble = function () {
        return r(this, void 0, void 0, function () {
          var e, t, i, n, o, r, s, c, l;
          return a(this, function (a) {
            switch (a.label) {
              case 0:
                return this._netting || j_.currentWindow == F3.GOGWindow
                  ? [2]
                  : ((e = this._cell.serverIdx),
                    (t = this._cell.data.remoteData.extra.get(fr.goGReqOrderId)),
                    (i = this._cell.data.config.id),
                    (n = parseInt(t)),
                    (o = E8.role.goGOrders),
                    (r = null == o ? void 0 : o.get(n)),
                    o && o.has(n)
                      ? [3, 2]
                      : ((this._netting = !0),
                        EJ.SendRequestNow(),
                        [
                          4,
                          Sm.startGame({
                            orderType: Aq.BUBBLE,
                            orderId: n,
                            boardId: G2.Data.id,
                            index: e,
                          }),
                        ]));
              case 1:
                return (
                  a.sent(),
                  (this._netting = !1),
                  j_.currentWindow == F3.GOGWindow
                    ? [2]
                    : this._cell && this._cell.data && this._cell.data.remoteData
                      ? ((s = this._cell.data.remoteData.extra.get(fr.goGReqOrderId)),
                        (c = parseInt(s)),
                        s && c == n
                          ? ((dG.showAnim = !0),
                            j_.showWindow(F3.GOGWindow, {
                              taskId: n,
                              mainData: {
                                orderType: Aq.BUBBLE,
                                orderId: n,
                                elementId: i,
                                index: e,
                                boardId: G2.Data.id,
                              },
                            }),
                            [3, 3])
                          : [2])
                      : [2]
                );
              case 2:
                (Pq.checkMainGogFinish(r)
                  ? (TJ.UnlockGogBubble(this._cell),
                    (l = Pq.GogBubbleCount),
                    (Pq.GogBubbleCount = l - 1))
                  : j_.showWindow(F3.GOGWindow, {
                      taskId: n,
                      mainData: {
                        orderType: Aq.BUBBLE,
                        orderId: n,
                        elementId: i,
                        index: this._cell.serverIdx,
                        boardId: G2.Data.id,
                      },
                    }),
                  (a.label = 3));
              case 3:
                return [2];
            }
          });
        });
      }),
      (n.prototype.onClickUnlockAdBubble = function (e) {
        return r(this, void 0, void 0, function () {
          return a(this, function (t) {
            return e
              ? (K3.logEvent("adBubble", { state: 1, eleId: this._cell.data.config.id }),
                this._cell && this._cell.data && this._cell.data.elementType.includes(Z2.BUBBLE)
                  ? (yG.onADSuccess(this._cell), [2])
                  : [2])
              : (K3.logEvent("adBubble", { state: 2, eleId: this._cell.data.config.id }), [2]);
          });
        });
      }),
      (n.prototype.onClickBreakAdBubble = function () {
        return r(this, void 0, void 0, function () {
          var e, t, i, n, o, r, s;
          return a(this, function (a) {
            return this._cell && this._cell.data && this._cell.data.elementType.includes(Z2.BUBBLE)
              ? (this._cell.data.remoteData.productType != vr.adBubble ||
                  (TJ.BreakBubble(this._cell),
                  (e = GW.ParseCellConfig(
                    {
                      id: config.AdConfig.config.adBubbleChange,
                      seed: this._cell.data.seed.seed,
                      state: this._cell.data.elementLockStage,
                      productType: vr.none,
                    },
                    this._cell.serverIdx,
                  )),
                  (this._cell.data = e),
                  !this._cell.data.remoteData.extra.has(fr.adCount) ||
                    this._cell.data.remoteData.extra.get(fr.adCount),
                  !(t = config.AdBubblePrice.getById(this._cell.data.config.id)) || t.adTimes,
                  K3.logEvent("adBubble", { state: 0, eleId: this._cell.data.config.id }),
                  (this._cell.mergeCellRender.node_icon.scale = 0.2),
                  (i = cc
                    .tween(this._cell.mergeCellRender.node_icon)
                    .to(0.166, { scale: 1.2 })
                    .to(0.1, { scale: 0.95 })
                    .to(0.033, { scale: 1 })),
                  this._cell.showOnceTween(i),
                  e3.AddCellAnim(this._cell, TC.BUBBLE_END),
                  e3.RemoveCellAnim(this._cell, TC.AD_BUBBLE_TIP),
                  (n = this._cell.mergeCellRender.sprite_icon
                    ? this._cell.mergeCellRender.sprite_icon.spriteFrame
                    : null),
                  (o = e3.AddCellAnim(this._cell, TC.ELEMENT_DISAPPEAR)),
                  e3.AddCellAnim(this._cell, TC.GET_ENERGY),
                  (o.children[0].getComponent(cc.Sprite).spriteFrame = n),
                  j8.play(o_.MERGE_END_BUBBLE),
                  this.hideElementInfo(),
                  E8.updateAdScore(3),
                  fG.SetAdbubbleDayCost(0),
                  (r = TJ.findAdBubbleConfig(E8.role, Ie(G2.MergeBoardType, ar)).adConf) &&
                    ((s = fG.GetAdbubbleEnergConf(r)),
                    fG.SetAdbubbleGear(Math.min(fG.GetAdbubbleGear() + 1, s.length - 1)))),
                [2])
              : [2];
          });
        });
      }),
      (n.prototype.onClickBreakGogBubble = function () {
        var e, t, i;
        return r(this, void 0, void 0, function () {
          var n, o, r, s, c, l, d;
          return a(this, function (a) {
            switch (a.label) {
              case 0:
                if (j_.currentWindow == F3.GOGWindow) return [2];
                if (
                  !this._cell ||
                  !this._cell.data ||
                  !this._cell.data.elementType.includes(Z2.BUBBLE) ||
                  this._netting
                )
                  return [2];
                if (this._cell.data.remoteData.productType != vr.challengeBubble) return [2];
                ((n = 0),
                  (o = function (e) {
                    n = e ? 1 : 2;
                  }),
                  rk.isSettingOpen(tk.BreakBubble)
                    ? j_.showWindow(F3.MergeConfirmWindow, {
                        cb: o.bind(this),
                        id: this._cell.data.config.id,
                        type: "breakBubble",
                        remoteData: this._cell.data.remoteData,
                      })
                    : (n = 1),
                  (a.label = 1));
              case 1:
                return 0 != n ? [3, 3] : [4, S(33)];
              case 2:
                return (a.sent(), [3, 1]);
              case 3:
                return (
                  2 == n ||
                    j_.currentWindow == F3.GOGWindow ||
                    ((r =
                      null ===
                        (i =
                          null ===
                            (t = null === (e = this._cell) || void 0 === e ? void 0 : e.data) ||
                          void 0 === t
                            ? void 0
                            : t.config) || void 0 === i
                        ? void 0
                        : i.id),
                    K3.logEvent("skip_bubble3", { elementId: r }),
                    (s = Pq.GogBubbleCount),
                    (Pq.GogBubbleCount = s - 1),
                    TJ.BreakBubble(this._cell),
                    (this._cell.mergeCellRender.node_icon.scale = 0.2),
                    (c = cc
                      .tween(this._cell.mergeCellRender.node_icon)
                      .to(0.166, { scale: 1.2 })
                      .to(0.1, { scale: 0.95 })
                      .to(0.033, { scale: 1 })),
                    this._cell.showOnceTween(c),
                    e3.AddCellAnim(this._cell, TC.BUBBLE_END2),
                    (l = this._cell.mergeCellRender.sprite_icon
                      ? this._cell.mergeCellRender.sprite_icon.spriteFrame
                      : null),
                    (this._cell.data = null),
                    (d = e3.AddCellAnim(this._cell, TC.ELEMENT_DISAPPEAR)),
                    e3.AddCellAnim(this._cell, TC.GET_ENERGY),
                    e3.RemoveCellAnim(this._cell, TC.GOG_BUBBLE_TIP),
                    (d.children[0].getComponent(cc.Sprite).spriteFrame = l),
                    j8.play(o_.MERGE_END_BUBBLE),
                    this.hideElementInfo()),
                  [2]
                );
            }
          });
        });
      }),
      (n.prototype.onClickElementTips = function () {
        if (this._cell) {
          var e = this._cell.data.config.id,
            t = config.ElementTips.getById(e);
          if (t) {
            var i = { desc: t.txt, title: t.title, image: "Texture/ElementTips/" + t.id };
            j_.showWindow(F3.TipDetailWindow, i);
          }
        }
      }),
      (n.prototype.onClockFinish = function () {
        this._isInCd = !1;
      }),
      (n.boardAdSkipMap = new Map()),
      o([VG(cc.Animation)], n.prototype, "anim_show", void 0),
      o([VG(JP)], n.prototype, "label_info", void 0),
      o([VG(cc.Label)], n.prototype, "label_desc", void 0),
      o([VG(cc.Label)], n.prototype, "label_special", void 0),
      o([VG(cc.Label)], n.prototype, "label_cellPrice", void 0),
      o([VG(cc.Label)], n.prototype, "label_gemPrice", void 0),
      o([VG(cc.Label)], n.prototype, "label_gemPrice_pop", void 0),
      o([VG(cc.Label)], n.prototype, "label_discountPrice", void 0),
      o([VG(cc.Label)], n.prototype, "label_speedup", void 0),
      o([VG(cc.Label)], n.prototype, "label_cd", void 0),
      o([VG(cc.Label)], n.prototype, "label_cd_pop", void 0),
      o([VG(cc.Label)], n.prototype, "label_unlock", void 0),
      o([VG(cc.Label)], n.prototype, "label_lefttime", void 0),
      o([VG(cc.Label)], n.prototype, "label_weight", void 0),
      o([VG(cc.Label)], n.prototype, "label_leftnum", void 0),
      o([VG(cc.Label)], n.prototype, "label_leftnum_desc", void 0),
      o([VG(cc.Node)], n.prototype, "node_info", void 0),
      o([VG(cc.Node)], n.prototype, "btn_info", void 0),
      o([VG(cc.Node)], n.prototype, "icon_info", void 0),
      o([VG(cc.Node)], n.prototype, "btn_sell", void 0),
      o([VG(cc.Node)], n.prototype, "btn_gem", void 0),
      o([VG(cc.Node)], n.prototype, "btn_gem_pop", void 0),
      o([VG(cc.Node)], n.prototype, "btn_door", void 0),
      o([VG(cc.Node)], n.prototype, "btn_use", void 0),
      o([VG(cc.Node)], n.prototype, "btn_fake", void 0),
      o([VG(cc.Node)], n.prototype, "btn_undo", void 0),
      o([VG(cc.Node)], n.prototype, "btn_unlock", void 0),
      o([VG(cc.Node)], n.prototype, "btn_privilege", void 0),
      o([VG(iT)], n.prototype, "btn_adBubble", void 0),
      o([VG(cc.Node)], n.prototype, "btn_breakAdBubble", void 0),
      o([VG(cc.Layout)], n.prototype, "layout_btn", void 0),
      o([VG(cc.Layout)], n.prototype, "layout_order", void 0),
      o([VG(cc.Node)], n.prototype, "node_order_item", void 0),
      o([VG(cc.Node)], n.prototype, "node_healthfood_list", void 0),
      o([VG(cc.Node)], n.prototype, "node_healthfood_order", void 0),
      o([VG(cc.Node)], n.prototype, "btn_healthfood_takeOut", void 0),
      o([VG(pG)], n.prototype, "pushSub", void 0),
      o([VG(cc.Label)], n.prototype, "label_eventEnergy", void 0),
      o([VG(cc.Node)], n.prototype, "btn_GogBubble", void 0),
      o([VG(cc.Node)], n.prototype, "btn_breakGogBubble", void 0),
      o([VG(cc.Node)], n.prototype, "btn_elementTips", void 0),
      o([VG(cc.Node)], n.prototype, "node_lamp", void 0),
      o([VG(cc.Node)], n.prototype, "node_battery", void 0),
      o([VG(cc.Node)], n.prototype, "node_act3Pop", void 0),
      o([VG(cc.Node)], n.prototype, "node_mainPop", void 0),
      o([VG(cc.Node)], n.prototype, "node_gymSprintPop", void 0),
      o([VG(cc.Node)], n.prototype, "node_actPointPop", void 0),
      o([VG(cc.Label)], n.prototype, "label_gymSprintPoint", void 0),
      o([VG(cc.Node)], n.prototype, "node_adSkip", void 0),
      o([VG(iT)], n.prototype, "btn_adSkip", void 0),
      o([VG(cc.Node)], n.prototype, "part3_group", void 0),
      o([VG([cc.Prefab])], n.prototype, "elementInfoRenderPrefabs", void 0),
      o([VG(cc.Node)], n.prototype, "elementInfoRenderParent", void 0),
      o([VG(cc.Node)], n.prototype, "elementInfoRenderParentRight", void 0),
      (n = s = o([HG], n))
    );
  })(cc.Component);
cc._RF.pop();
