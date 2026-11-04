// Extracted cached Cocos registration: PropUnlimitEnergyElement
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 8450278..8453192.
// Shared closure variables remain in readable/game.formatted.js:409839.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "25a95oGMVdASae7IDmxuhp8", "PropUnlimitEnergyElement");
var Eqe = cc._decorator,
  Aqe = Eqe.ccclass;
Eqe.property;
var kqe = Eqe.menu;
(!(function (e) {
  function i() {
    return (null !== e && e.apply(this, arguments)) || this;
  }
  (t(i, e),
    (i.prototype.onInitRender = function (e) {
      if (!((e && e.data.elementType.includes(Z2.BUBBLE)) || 9811019 == e.data.config.id)) {
        e3.AddCellAnim(e, TC.PROP_UNLIMIT_TIP);
        var t = cc
          .tween(e.mergeCellRender.node_icon)
          .repeatForever(
            cc.tween(e.mergeCellRender.node_icon).by(0.5, { scale: 0.1 }).by(0.5, { scale: -0.1 }),
          );
        e.showElementTween("propUnlimitTipTween", t);
      }
    }),
    (i.prototype.onClickElement = function (e) {
      var t, i, n, o;
      if (!e.data.elementType.includes(Z2.BUBBLE)) {
        (G2.MergeBoardType == ar.main && oN.SaveUnlimitedEnergyMultiplier(),
          zM.ClearButtonBuff(),
          1 != oN.LegacyClientLevel &&
            (K3.logEvent("double_energy_end"), oN.setLegacyClientLevel(1, !0)),
          TJ.BoardRequestSend(
            hm.propUse,
            {
              boardId: G2.Data.id,
              index: e.serverIdx,
              toIndex: 0,
              product: null,
              timestamp: E8.serverTime,
            },
            "propuse",
          ));
        var r = 9811019 == e.data.config.id,
          a = G2.instance,
          s = config.PropEffect.getById(e.data.config.propEffect).effectValue,
          c = !1;
        (a.unlimitEnergyClock && G2.Data.energyEnd > 0
          ? (G2.Data.energyEnd += 1e3 * s)
          : ((c = !0), (G2.Data.energyEnd = E8.serverTime + 1e3 * s)),
          oN.refreshFromServer());
        var l = e.data.config.id;
        a.showUnlimitEnergy();
        var d = DC.CheckHasExtra(e),
          u = X8.CheckHasExtra(e),
          h = null === (t = m2.instance) || void 0 === t ? void 0 : t.CheckHasExtra(e),
          p = null === (i = dI.instance) || void 0 === i ? void 0 : i.CheckHasExtra(e),
          f = qG.CheckHasExtra(e);
        if (
          (f && qG.checkEnergyForce(e.worldPos, f),
          d && DC.checkActPlusEnergyForce(e.worldPos),
          u && X8.checkActPlusEnergyForce(e.worldPos),
          h &&
            (null === (n = m2.instance) || void 0 === n || n.checkActPlusEnergyForce(e.worldPos)),
          p && (null === (o = dI.instance) || void 0 === o || o.checkAct8EnergyForce(e.worldPos)),
          hx.instance.collectCellAllExtraRes(e),
          this.anim(e, c, G2.MergeBoardType),
          (e.data = null),
          r)
        ) {
          e3.AddCellAnim(e, TC.PROP_USE_FIREWORK);
          var g = G$.GetCellByIndex(32);
          e3.AddCellAnim(g, TC.FIREWORK);
        }
        K3.logEvent("use_prop", { type: "unlimitEnergy", id: l });
      }
    }),
    (i.prototype.anim = function (e, t, i) {
      return r(this, void 0, void 0, function () {
        var n, o, r, s;
        return a(this, function (a) {
          switch (a.label) {
            case 0:
              return i != G2.MergeBoardType || o9.currentScreen != J8.MERGE_SCREEN
                ? [2]
                : (j8.play(o_.PROP_USE_UNLIMIT),
                  9811019 == e.data.config.id
                    ? (t && G2.instance.unlimitEnergy(!0), [2])
                    : ((n = e.data.mergeCellIconUrl),
                      (o = e.worldPos),
                      (r = Ct.getUI("energy")),
                      [4, CS.flyInit(r, o)]));
            case 1:
              return (
                (s = a.sent()),
                i != G2.MergeBoardType || o9.currentScreen != J8.MERGE_SCREEN
                  ? [2]
                  : [4, CS.flyIconSpecial(n, s.start, s.end, null, !0, cc.v2(100, 100))]
              );
            case 2:
              return (
                a.sent(),
                i != G2.MergeBoardType || o9.currentScreen != J8.MERGE_SCREEN
                  ? [2]
                  : ((r.scale = 1),
                    cc
                      .tween(r)
                      .to(0.066, { scale: 0.5 })
                      .to(0.166, { scale: 1.2 })
                      .to(0.1, { scale: 1 })
                      .start(),
                    [4, S(200)])
              );
            case 3:
              return (
                a.sent(),
                i != G2.MergeBoardType || o9.currentScreen != J8.MERGE_SCREEN
                  ? [2]
                  : (t && G2.instance.unlimitEnergy(!0), [2])
              );
          }
        });
      });
    }),
    (i = o(
      [Aqe, kqe("MergeCell/Logic/PropUnlimitEnergyElement"), BM("PropUnlimitEnergyElement")],
      i,
    )));
})(xM),
  cc._RF.pop());
