// Extracted cached Cocos registration: EnergyWindow
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 7952742..7955438.
// Shared closure variables remain in readable/game.formatted.js:386763.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "d831cc8cANMcq7BMXPEhp1X", "EnergyWindow");
var GWe = cc._decorator,
  FWe = GWe.ccclass,
  WWe = GWe.property;
(!(function (e) {
  function i() {
    var t = (null !== e && e.apply(this, arguments)) || this;
    return (
      (t.groupData = null),
      (t.privilegeOne = null),
      (t.node_content = null),
      (t.node_subscribe = []),
      (t.superChargeExtraView = null),
      (t.initialEnergy = 0),
      (t.hasRecordedInitialEnergy = !1),
      t
    );
  }
  (t(i, e),
    (i.prototype.onInit = function () {
      (u.add("onEnergyBuyed", this.hide, this),
        this.node_subscribe.forEach(function (e) {
          pW.instance.bindNodeInWeChatRepeatSubscribe(e);
        }));
    }),
    Object.defineProperty(i.prototype, "windowData", {
      get: function () {
        return this.data;
      },
      enumerable: !1,
      configurable: !0,
    }),
    (i.prototype.onData = function () {
      return r(this, void 0, void 0, function () {
        var e, t, i, n;
        return a(this, function (o) {
          switch (o.label) {
            case 0:
              return E8.shopUpdating ? [4, S(60)] : [3, 2];
            case 1:
              return (o.sent(), [3, 0]);
            case 2:
              return MPe.isActive()
                ? (this.hide(), j_.showWindow(F3.EndlessEnergyWindow, this.data), [2])
                : (this.groupData.setData(4),
                  (this.privilegeOne.data = null),
                  (this.node_content.children[0].getComponent(Tpe).data = null),
                  (e = this.getDiamondEnergyItem()),
                  (t = vO.getShopConf(e)),
                  (i =
                    t &&
                    K6.ParseItemsConf(t.goods).find(function (e) {
                      return e.itemType == oa.energy;
                    })),
                  (n = $k.isSuperOrExp() ? $k.getDiamondBuyEnergyBonus() : 0),
                  this.superChargeExtraView.render(e, ((null == i ? void 0 : i.value) || 0) + n),
                  this.hasRecordedInitialEnergy ||
                    ((this.initialEnergy = E8.role.energy.value),
                    (this.hasRecordedInitialEnergy = !0)),
                  [2]);
          }
        });
      });
    }),
    (i.prototype.getDiamondEnergyItem = function () {
      var e,
        t = E8.role.shop.get(4);
      return (
        (null === (e = null == t ? void 0 : t.goods) || void 0 === e
          ? void 0
          : e.find(function (e) {
              if (e.priceType != _a.diamond) return !1;
              var t = vO.getShopConf(e);
              return (
                !!t &&
                K6.ParseItemsConf(t.goods).some(function (e) {
                  return e.itemType == oa.energy;
                })
              );
            })) || null
      );
    }),
    (i.prototype.onClose = function (e) {
      e || (this.hasRecordedInitialEnergy = !1);
    }),
    (i.prototype.onHide = function () {
      return r(this, void 0, void 0, function () {
        return a(this, function (e) {
          return (
            u.dispatch("updateCashStore"),
            u.dispatch("BlindBoxEnergy"),
            u.dispatch("Fresh_Asset_AD_Button"),
            [2]
          );
        });
      });
    }),
    (i.prototype.toFreeCenter = function () {
      E8.isUnlocked("adEnergy") && F8.hasAd && (this.hide(), j_.showWindow(F3.CashStoreWindow, 1));
    }),
    (i.prototype.onManualHide = function () {
      var e,
        t,
        i = E8.role.energy.value <= this.initialEnergy;
      (u.dispatch(Dt.OnManualHide, F3.EnergyWindow, {
        energyType: "energy",
        enegryLimit:
          null !== (t = null === (e = this.windowData) || void 0 === e ? void 0 : e.inNeed) &&
          void 0 !== t
            ? t
            : 1,
        tiggerSubscribe: i,
      }),
        this.hide());
    }),
    o([WWe(Hpe)], i.prototype, "groupData", void 0),
    o([WWe(MWe)], i.prototype, "privilegeOne", void 0),
    o([WWe(cc.Node)], i.prototype, "node_content", void 0),
    o([WWe([cc.Node])], i.prototype, "node_subscribe", void 0),
    o([WWe(UPe)], i.prototype, "superChargeExtraView", void 0),
    (i = o([FWe], i)));
})(Xt),
  cc._RF.pop());
