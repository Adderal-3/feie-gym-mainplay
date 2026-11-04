// Extracted cached Cocos registration: PropEnergyTowerElement
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 8424875..8425865.
// Shared closure variables remain in readable/game.formatted.js:408669.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "3d08fD+jU1LwKLCrk76+tD+", "PropEnergyTowerElement");
var rqe = cc._decorator,
  aqe = rqe.ccclass;
rqe.property;
var sqe = rqe.menu;
(!(function (e) {
  function i() {
    return (null !== e && e.apply(this, arguments)) || this;
  }
  (t(i, e),
    (i.prototype.onInitRender = function (e) {
      ((qG.energyTowerCell = e), this._refreshDisplay(e), this.checkData(e));
    }),
    (i.prototype.checkData = function (e) {
      if (
        !G$.IsCellInState(e, mr.web) &&
        !G$.IsCellInState(e, mr.box) &&
        !(
          e.data.elementType.includes(Z2.BUBBLE) ||
          (G2.ExtraData.get("energyTowerSeed") && G2.ExtraData.get("energyTowerBubbleSeed"))
        )
      ) {
        var t = e.data.randomElementInt();
        (G2.Data.specialCount.set(rr.energyTowerSeed, t),
          (t = e.data.randomElementInt()),
          G2.Data.specialCount.set(rr.energyTowerBubbleSeed, t),
          G2.Data.specialCount.set(rr.energyTowerProductCount, 0),
          G2.Data.specialCount.set(rr.energyTowerBubbleUsedEnergy, 0),
          G2.updateEnergyTower());
      }
    }),
    (i.prototype._refreshDisplay = function (e) {}),
    (i = o([aqe, sqe("MergeCell/Logic/PropEnergyTowerElement"), BM("PropEnergyTowerElement")], i)));
})(xM),
  cc._RF.pop());
