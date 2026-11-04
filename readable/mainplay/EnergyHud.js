// Extracted cached Cocos registration: EnergyHud
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 5194121..5195852.
// Shared closure variables remain in readable/game.formatted.js:255998.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "cedc64m/KdEg4H9ZYP8g0LY", "EnergyHud");
var ice = cc._decorator,
  nce = ice.ccclass,
  oce = ice.property,
  rce = ice.menu;
(!(function (e) {
  function n() {
    var t = (null !== e && e.apply(this, arguments)) || this;
    return ((t.energyTipAnimation = null), t);
  }
  (t(n, e),
    (n.prototype.getServerValue = function () {
      return E8.role.energy.value;
    }),
    (n.prototype.getBinderData = function () {
      return { property: "value", source: E8.role.energy };
    }),
    (n.prototype.onEnable = function () {
      (e.prototype.onEnable.call(this),
        this.updateMode == Ty.manualUpdate &&
          u.add(_C.MainEnergyRecover, this.onEnergyRecover, this),
        this.hideEnergyTip());
    }),
    (n.prototype.onDisable = function () {
      (e.prototype.onDisable.call(this),
        this.stopEnergyTipAnimation(),
        u.remove(_C.MainEnergyRecover, this.onEnergyRecover, this));
    }),
    (n.prototype.onEnergyRecover = function (e) {
      this.node &&
        this.node.active &&
        ((this._currentValue += null != e ? e : 0),
        this.valueLabel && this.valueLabel.setValue(this._currentValue));
    }),
    (n.prototype.hideEnergyTip = function () {
      this.energyTipAnimation && (this.energyTipAnimation.node.active = !1);
    }),
    (n.prototype.stopEnergyTipAnimation = function () {
      this.energyTipAnimation &&
        this.energyTipAnimation.node.active &&
        this.energyTipAnimation.stop();
    }),
    (n.prototype.onCostResource = function (e) {
      this.updateMode === Ty.manualUpdate &&
        e.type === this.itemType &&
        ((this._currentValue = Math.max(this._currentValue - e.cost, 0)),
        this.valueLabel && this.valueLabel.setValue(this._currentValue),
        e.cost > 0 &&
          this.energyTipAnimation &&
          ((this.energyTipAnimation.node.active = !0),
          rb.playAnimation(this.energyTipAnimation, "gogEnergyTip")));
    }),
    (n.prototype.onClick = function () {
      j_.showWindow(F3.EnergyWindow);
    }),
    o([oce(cc.Animation)], n.prototype, "energyTipAnimation", void 0),
    o([Jb(i.HudCostResource)], n.prototype, "onCostResource", null),
    (n = o([nce, rce("TinyHUD/EnergyHud")], n)));
})(PI),
  cc._RF.pop());
