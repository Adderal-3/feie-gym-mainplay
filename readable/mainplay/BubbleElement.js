// Extracted cached Cocos registration: BubbleElement
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 8312266..8315077.
// Shared closure variables remain in readable/game.formatted.js:403661.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "11fb58PhRROwreoa7sGn4lq", "BubbleElement");
var Yze = cc._decorator,
  Xze = Yze.ccclass;
Yze.property;
var Jze = Yze.menu;
(!(function (e) {
  function i() {
    var t = (null !== e && e.apply(this, arguments)) || this;
    return ((t._curAnimIdx = 0), t);
  }
  (t(i, e),
    (i.prototype.onInitRender = function (e) {
      ((e.mergeCellRender.node_icon.scale = 1),
        e.data.elementType.includes(Z2.BUBBLE) &&
          ((e.scaleCache = 0.8), (e.mergeCellRender.node_icon.scale = e.scaleCache)));
      var t = e3.AddCellAnim(e, TC.BUBBLE).getComponent(qze);
      (e.registComponent("BubbleRecover", t), t && (t.data = e.data));
    }),
    (i.prototype.onSelectElement = function (e) {
      var t = this,
        i = e.data.clientId,
        n = e.dynamicComponents.get("BubbleRecover");
      if (n) {
        r(t, void 0, void 0, function () {
          var t, o, r, s;
          return a(this, function (a) {
            switch (a.label) {
              case 0:
                return e.data
                  ? (j8.play(o_.MERGE_SELECT_BUBBLE),
                    (t = n.node.getComponent(sp.Skeleton)),
                    this._curAnimIdx++,
                    (o = this._curAnimIdx),
                    (r = e.data.remoteData.productType),
                    (s = r == vr.bubble ? "bubblewait" : "bubblewait2"),
                    [4, ib.playAnimation(t, s, !1)])
                  : [2];
              case 1:
                return (
                  a.sent(),
                  e.data && e.data.clientId == i
                    ? (o != this._curAnimIdx ||
                        ((r = e.data.remoteData.productType),
                        (s = r == vr.bubble ? "bubbleidle" : "bubbleidle2"),
                        ib.playAnimation(t, s, !0)),
                      [2])
                    : [2]
                );
            }
          });
        });
      }
    }),
    (i.prototype.onTimeChange = function (e) {
      this.updateRecover(e);
    }),
    (i.prototype.updateRecover = function (e) {
      var t = e.dynamicComponents.get("BubbleRecover");
      t && t.onUpdate(null);
    }),
    (i.prototype.onDoubleClickElement = function (e) {
      var t;
      return r(this, void 0, void 0, function () {
        var i, n, o, r, s, c, l;
        return a(this, function (a) {
          switch (a.label) {
            case 0:
              if (
                ((i = e.dynamicComponents.get("BubbleRecover").costGem),
                b2.IsBubbleFree(e.data.remoteData.productType) && (i = 0),
                !K6.checkBuy(_a.diamond, i))
              )
                return [2];
              ((n = e.data.remoteData.bubbleEnd - E8.serverTime),
                (o = pr.bubble),
                (r = 0),
                (s = function (e) {
                  r = e ? 1 : 2;
                }),
                (c = {
                  id: e.data.config.id,
                  cb: s.bind(this),
                  leftTime: n,
                  cdtype: pr.bubble,
                  count: i,
                  remoteData: e.data.remoteData,
                  hideCheck: !0,
                }),
                j_.showWindow(F3.MergeConfirmWindow, c),
                (a.label = 1));
            case 1:
              return 0 != r ? [3, 3] : [4, S(33)];
            case 2:
              return (a.sent(), [3, 1]);
            case 3:
              return (
                2 == r ||
                  ((l = e.data.remoteData.productType == vr.goldenBubble),
                  r3.ButterflyScoreByCell(e).score > 0 && (r3.ShowButterflyAnim = !0),
                  DC.checkActPlusEnergy(e, 3),
                  e.data.remoteData.extra.set(fr.eventEnergyI, ""),
                  X8.checkActPlusEnergy(e, 3),
                  e.data.remoteData.extra.set(fr.eventEnergyII, ""),
                  null === (t = dI.instance) || void 0 === t || t.checkAct8Energy(e, 3, !0),
                  e.data.remoteData.extra.set(fr.eventEnergyIV, ""),
                  hx.instance.collectBubbleExtraRes(e),
                  b3.checkActivity() && b3.instance.addBubblePoint(e),
                  TJ.CellBuyCd(e, o, i),
                  e.recoverAnim(),
                  o8.updateCondition("SpeedupComplete", 1),
                  SL.addBehavior(_L.buy_cd, { type: pr[o], cost: i }),
                  K3.afReport("element_gem", { type: pr[o], cost: i }, !0),
                  K3.logEvent("element_gem", {
                    type: o,
                    cost: i,
                    id: e.data.config.id,
                    info: l ? "goldbubble" : "",
                  }),
                  u.dispatch("showElementInfo", e)),
                [2]
              );
          }
        });
      });
    }),
    (i = o([Xze, Jze("MergeCell/Logic/BubbleElement"), BM("BubbleElement")], i)));
})(xM),
  cc._RF.pop());
