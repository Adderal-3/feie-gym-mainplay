// Extracted cached Cocos registration: MergeConfirmWindow
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 8397805..8405762.
// Shared closure variables remain in readable/game.formatted.js:407565.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "0353dGqPqhK8Lgcl525u7VE", "MergeConfirmWindow");
var KKe,
  qKe = cc._decorator,
  YKe = qKe.ccclass,
  XKe = qKe.property;
(!(function (e) {
  e.orderInConfirm = "orderInConfirm";
})(KKe || (KKe = {})),
  (function (e) {
    function n() {
      var t = (null !== e && e.apply(this, arguments)) || this;
      return (
        (t.btn_ok = null),
        (t.btn_cancle = null),
        (t.node_check = null),
        (t.node_web = null),
        (t.node_web2 = null),
        (t.node_bubble = null),
        (t.node_goldbubble = null),
        (t.node_frozenbubble = null),
        (t.btn_tip = null),
        (t.node_tip = null),
        (t.label_desc = null),
        (t.sprite_icon = null),
        (t.node_zihudie = null),
        (t.node_huanghudie = null),
        (t.node_mainTask = null),
        (t.gog = null),
        (t.gymSprint = null),
        (t.iconNodes = []),
        (t._cb = null),
        (t._eleid = 0),
        (t._clock = null),
        (t._fwcType = null),
        (t._isAnti = !1),
        (t._confirmData = null),
        t
      );
    }
    (t(n, e),
      (n.prototype.onInit = function () {
        (this.btn_ok.on("click", this.onClickOk, this),
          this.btn_cancle.on("click", this.onClickCancle, this),
          this.btn_tip.on("click", this.onClickTip, this),
          u.add("GymSprintRefresh", this.hideGymSprint, this));
      }),
      (n.prototype.onData = function () {
        var e;
        return r(this, void 0, void 0, function () {
          var t,
            i,
            n,
            o,
            r = this;
          return a(this, function (a) {
            return (
              (this._confirmData = this.data),
              (this.node_check.active = !(null === (e = this._confirmData) || void 0 === e
                ? void 0
                : e.hideCheck)),
              (this._eleid = this._confirmData.id),
              (this._cb = this._confirmData.cb),
              (this._isAnti = !1),
              (this.node_bubble.active = !1),
              (this.node_goldbubble.active = !1),
              (this.node_frozenbubble.active = !1),
              (this.node_web.active = !1),
              (this.node_web2.active = !1),
              (this.node_tip.active = !1),
              (this.node_huanghudie.active = !1),
              (this.node_zihudie.active = !1),
              (this.node_mainTask.active = !1),
              (this.gog.active = !1),
              (this.gymSprint.active = !1),
              this.iconNodes.forEach(function (e) {
                e.active = !1;
              }),
              this._confirmData.cdtype && this._confirmData.cdtype == pr.bubble
                ? ((t = fj.GetMainTaskNeed()),
                  (i = t.has(this._eleid)),
                  (this.node_mainTask.active = i),
                  (this._fwcType = tk.Bubble),
                  this._confirmData.remoteData.productType == vr.bubble
                    ? (this.node_bubble.active = !0)
                    : (this.node_goldbubble.active = !0),
                  1 ==
                  (n =
                    this._confirmData.remoteData.extra &&
                    this._confirmData.remoteData.extra.get(fr.butterflyPass)
                      ? parseInt(this._confirmData.remoteData.extra.get(fr.butterflyPass))
                      : 0)
                    ? (this.node_zihudie.active = !0)
                    : 2 == n && (this.node_huanghudie.active = !0),
                  this.checkIconShow(),
                  b3.checkActivity() &&
                    ((o = G2.instance.focusElement),
                    b3.checkHasExtra(o) && (this.gymSprint.active = !0)),
                  (this.label_desc.string = v.getLabel(
                    "mergeConfirm_buyBubble",
                    this._confirmData.count,
                  )))
                : this._confirmData.cdtype && this._confirmData.cdtype == pr.webUnlock
                  ? ((this._fwcType = tk.Web),
                    G2.MergeBoardType == ar.arch
                      ? ((this.node_web.active = !1), (this.node_web2.active = !0))
                      : ((this.node_web.active = !0), (this.node_web2.active = !1)),
                    (this.label_desc.string = v.getLabel(
                      "mergeConfirm_unlockWeb",
                      this._confirmData.count,
                    )))
                  : this._confirmData.cdtype
                    ? ((this._fwcType = tk.Speedup),
                      (this.label_desc.string = v.getLabel(
                        "mergeConfirm_buyCd",
                        this._confirmData.count,
                      )))
                    : this._confirmData.type && "levelup" == this._confirmData.type
                      ? ((this.node_check.active = !1),
                        (this.label_desc.string = v.getLabel("mergeConfirm_levelup")))
                      : this._confirmData.type && "riskup" == this._confirmData.type
                        ? ((this.node_check.active = !1),
                          (this.label_desc.string = v.getLabel("prop_1901_desc")))
                        : this._confirmData.type && "useClock" == this._confirmData.type
                          ? ((this._fwcType = tk.SkipTime),
                            (this.label_desc.string = v.getLabel("mergeConfirm_useClock")))
                          : this._confirmData.type && "useBattery" == this._confirmData.type
                            ? ((this._fwcType = tk.Battery),
                              (this.label_desc.string = v.getLabel("mergeConfirm_useBattery")))
                            : "insideBag" == this._confirmData.type
                              ? ((this.node_check.active = !1),
                                (this.label_desc.string = v.getLabel("mergeConfirm_insideBag")))
                              : "breakBubble" == this._confirmData.type
                                ? ((this._fwcType = tk.BreakBubble), this.renderBreakBubble())
                                : this._confirmData.type == KKe.orderInConfirm
                                  ? ((this._fwcType = tk.OrderConfirm),
                                    (this.label_desc.string = v.getLabel(
                                      "mergeConfirm_orderInConfirm",
                                    )))
                                  : ((this._fwcType = tk.SellCell),
                                    (this.label_desc.string = v.getLabel("mergeConfirm_sell"))),
              this._confirmData.leftTime > 0
                ? ((this._clock = b.addClock(
                    "mergeConfirm",
                    this._confirmData.leftTime / 1e3,
                    1e3,
                    1,
                  )),
                  this._clock.registCallBack(this, this.hide.bind(this), null))
                : !this._confirmData.label ||
                  this._confirmData.label.string == v.getLabel("common_free") ||
                  (this._confirmData.cdtype != pr.manualProduct &&
                    this._confirmData.cdtype != pr.autoProduct &&
                    this._confirmData.cdtype != pr.chestOpen &&
                    this._confirmData.cdtype != pr.elementOrder &&
                    this._confirmData.cdtype != pr.doubleEButtonCd) ||
                  ((this._clock = b.addClock("mergeConfirm", 1, 1e3, 0)),
                  this._clock.registCallBack(this, null, function (e) {
                    parseInt(r._confirmData.label.string) <= 0
                      ? r.hide()
                      : (r.label_desc.string = v.getLabel(
                          "mergeConfirm_buyCd",
                          r._confirmData.label.string,
                        ));
                  })),
              Ai(this.sprite_icon, e9.getElementTexturePath(this._eleid)),
              this._fwcType && K3.logEvent("secondConfirm_create", { fwc_type: this._fwcType }),
              [2]
            );
          });
        });
      }),
      (n.prototype.renderBreakBubble = function () {
        var e = this._confirmData.remoteData.productType;
        if (e == vr.frozenBubble)
          return (
            (this.node_frozenbubble.active = !0),
            void (this.label_desc.string = v.getLabel("frozen_element_tips1"))
          );
        e == vr.bubble ? (this.node_bubble.active = !0) : (this.node_goldbubble.active = !0);
        var t =
            this._confirmData.remoteData.extra &&
            this._confirmData.remoteData.extra.get(fr.butterflyPass)
              ? parseInt(this._confirmData.remoteData.extra.get(fr.butterflyPass))
              : 0,
          i =
            this._confirmData.remoteData.extra &&
            this._confirmData.remoteData.extra.has(fr.goGReqOrderId);
        (i && (this.gog.active = !0),
          this.checkIconShow(),
          1 == t ? (this.node_zihudie.active = !0) : 2 == t && (this.node_huanghudie.active = !0));
        var n = fj.GetMainTaskNeed().has(this._eleid);
        if (
          ((this.node_mainTask.active = n),
          (this.label_desc.string = i
            ? v.getLabel("mergeConfirm_breakBubble_gog")
            : v.getLabel("mergeConfirm_breakBubble")),
          b3.checkActivity())
        ) {
          var o = G2.instance.focusElement;
          b3.checkHasExtra(o) && (this.gymSprint.active = !0);
        }
      }),
      (n.prototype.checkIconShow = function () {
        var e,
          t =
            null === (e = null == G2 ? void 0 : G2.instance) || void 0 === e
              ? void 0
              : e.focusElement;
        t &&
          this.iconNodes.forEach(function (e) {
            var i,
              n,
              o = e.name,
              r =
                t.data.remoteData.extra &&
                (null ===
                  (n =
                    null === (i = null == t ? void 0 : t.data) || void 0 === i
                      ? void 0
                      : i.remoteData) || void 0 === n
                  ? void 0
                  : n.extra.has(o));
            (r && o == fr.floatRacePoint && (r = null != t.anims.get(TC.FLOAT_RACE_POINT)),
              r && o == fr.teamVersusPoint && (r = null != t.anims.get(TC.TEAM_VERSUS_POINT)),
              r && o == fr.tournamentPoint && (r = null != t.anims.get(TC.TOURNAMENT_POINT)),
              r && o == fr.oneVsOnePoint && (r = null != t.anims.get(TC.ONE_VS_ONE_POINT)),
              r && o == fr.weightRacePoint && (r = null != t.anims.get(TC.WEIGHT_RACE_POINT)),
              (e.active = r));
          });
      }),
      (n.prototype.onClickOk = function () {
        (this._cb && this._cb(!0), (this._cb = null), this.hide());
      }),
      (n.prototype.onClickCancle = function () {
        (this._cb && this._cb(!1), (this._cb = null), this.hide());
      }),
      (n.prototype.onClickTip = function () {
        var e = !!this.node_tip.active;
        (this._isAnti && (e = !e),
          this._fwcType && rk.setSwitchState(this._fwcType, e, "fast"),
          (this.node_tip.active = !this.node_tip.active));
      }),
      (n.prototype.hideGymSprint = function () {
        this.gymSprint.active = !1;
      }),
      (n.prototype.onElementRecycle = function (e) {
        e.elementId == this._eleid && this.hide();
      }),
      (n.prototype.onHide = function () {
        return r(this, void 0, void 0, function () {
          return a(this, function (e) {
            return (
              this._cb && (this._cb(!1), (this._cb = null)),
              this._clock && (this._clock.dispose(), (this._clock = null)),
              [2]
            );
          });
        });
      }),
      o([XKe(cc.Node)], n.prototype, "btn_ok", void 0),
      o([XKe(cc.Node)], n.prototype, "btn_cancle", void 0),
      o([XKe(cc.Node)], n.prototype, "node_check", void 0),
      o([XKe(cc.Node)], n.prototype, "node_web", void 0),
      o([XKe(cc.Node)], n.prototype, "node_web2", void 0),
      o([XKe(cc.Node)], n.prototype, "node_bubble", void 0),
      o([XKe(cc.Node)], n.prototype, "node_goldbubble", void 0),
      o([XKe(cc.Node)], n.prototype, "node_frozenbubble", void 0),
      o([XKe(cc.Node)], n.prototype, "btn_tip", void 0),
      o([XKe(cc.Node)], n.prototype, "node_tip", void 0),
      o([XKe(cc.Label)], n.prototype, "label_desc", void 0),
      o([XKe(cc.Sprite)], n.prototype, "sprite_icon", void 0),
      o([XKe(cc.Node)], n.prototype, "node_zihudie", void 0),
      o([XKe(cc.Node)], n.prototype, "node_huanghudie", void 0),
      o([XKe(cc.Node)], n.prototype, "node_mainTask", void 0),
      o([XKe(cc.Node)], n.prototype, "gog", void 0),
      o([XKe(cc.Node)], n.prototype, "gymSprint", void 0),
      o(
        [XKe({ type: [cc.Node], tooltip: "额外资源图标，节点名称和CellKey一致" })],
        n.prototype,
        "iconNodes",
        void 0,
      ),
      o([Jb(i.ElementRecycle)], n.prototype, "onElementRecycle", null),
      (n = o([Qb(), YKe], n)));
  })(Xt),
  cc._RF.pop());
