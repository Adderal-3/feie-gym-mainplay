// Extracted cached Cocos registration: AdBubbleElement
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 1872599..1875701.
// Shared closure variables remain in readable/game.formatted.js:92073.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "46ee8NO0x5ANaesvJA8uYVd", "AdBubbleElement");
var gG = cc._decorator,
  vG = gG.ccclass;
gG.property;
var mG = gG.menu,
  yG = (function (e) {
    function i() {
      var t = (null !== e && e.apply(this, arguments)) || this;
      return ((t._curAnimIdx = 0), t);
    }
    var n;
    return (
      t(i, e),
      (n = i),
      (i.prototype.onInitRender = function (e) {
        ((e.mergeCellRender.node_icon.scale = 1),
          e.data.elementType.includes(Z2.BUBBLE) &&
            ((e.scaleCache = 0.8), (e.mergeCellRender.node_icon.scale = e.scaleCache)),
          e3.AddCellAnim(e, TC.AD_BUBBLE_TIP));
        var t = e3.AddCellAnim(e, TC.BUBBLE).getComponent(sp.Skeleton);
        ib.playAnimation(t, "bubblewait", !1);
      }),
      (i.prototype.onSelectElement = function (e) {
        var t = this,
          i = e.data.clientId;
        r(t, void 0, void 0, function () {
          var t, n, o, r;
          return a(this, function (a) {
            switch (a.label) {
              case 0:
                return e.data
                  ? (j8.play(o_.MERGE_SELECT_BUBBLE),
                    (t = e.anims.get(TC.BUBBLE)),
                    (n = t.getComponent(sp.Skeleton)),
                    this._curAnimIdx++,
                    (o = this._curAnimIdx),
                    e.data.remoteData.productType,
                    (r = "bubblewait"),
                    [4, ib.playAnimation(n, r, !1)])
                  : [2];
              case 1:
                return (
                  a.sent(),
                  e.data && e.data.clientId == i
                    ? (o != this._curAnimIdx ||
                        (e.data.remoteData.productType,
                        (r = "bubbleidle"),
                        ib.playAnimation(n, r, !0)),
                      [2])
                    : [2]
                );
            }
          });
        });
      }),
      (i.prototype.onDoubleClickElement = function (e) {
        return r(this, void 0, void 0, function () {
          var t,
            i = this;
          return a(this, function (o) {
            return (
              (t = function (t, o) {
                return r(i, void 0, void 0, function () {
                  return a(this, function (i) {
                    return t
                      ? (n.onADSuccess(e), [2])
                      : (K3.logEvent("adBubble", { state: 2, eleId: e.data.config.id }), [2]);
                  });
                });
              }),
              K3.shareOrVideo(t.bind(this), "", "default", !0),
              [2]
            );
          });
        });
      }),
      (i.onADSuccess = function (e) {
        if (e.data.remoteData.productType == vr.adBubble) {
          var t = e.data.remoteData.extra.has(fr.adCount)
            ? e.data.remoteData.extra.get(fr.adCount)
            : "1";
          (TJ.UnlockAdBubble(e), K3.logEvent("adBubble", { state: 1, eleId: e.data.config.id }));
          var i = parseInt(t) - 1;
          if ((e.data.remoteData.extra.set(fr.adCount, i.toString()), i > 0))
            u.dispatch("showElementInfo", e);
          else {
            (K3.logEvent("adBubbleGet", { eleId: e.data.config.id }),
              fG.AddAdBubbleCount(),
              fG.SetAdbubbleDayCost(0));
            var n = TJ.findAdBubbleConfig(E8.role, Ie(G2.MergeBoardType, ar)).adConf;
            if (n) {
              var o = fG.GetAdbubbleEnergConf(n);
              fG.SetAdbubbleGear(Math.min(fG.GetAdbubbleGear() + 1, o.length - 1));
            }
            var r = G2.BoardCells.get(e.serverIdx);
            ((r.bubbleEnd = 0),
              (r.productType = vr.none),
              r.openEnd > 0 &&
                e.data.config.unlockDuration &&
                (r.openEnd =
                  E8.serverTime +
                  1e3 *
                    G$.getELementUnlockDuration(e.data.config.id, e.data.config.unlockDuration)),
              r.deteriorateEnd > 0 &&
                e.data.config.deterioratedDuration &&
                (r.deteriorateEnd = E8.serverTime + 1e3 * e.data.config.deterioratedDuration),
              (r.recovery = null));
            var a = GW.ParseCellCofigByData(r);
            (GW.RemoveShortCd(a.remoteData, yr.manualProduct),
              (a.isOld = !1),
              this.autoHarvestLock(e),
              (e.data = a),
              (e.mergeCellRender.node_icon.scale = 0.8));
            var s = cc
              .tween(e.mergeCellRender.node_icon)
              .to(0.166, { scale: 1.2 })
              .to(0.1, { scale: 0.95 })
              .to(0.033, { scale: 1 });
            (e.showOnceTween(s),
              e3.AddCellAnim(e, TC.BUBBLE_UNLOCK),
              e3.AddCellAnim(e, TC.BUBBLE_END),
              e3.RemoveCellAnim(e, TC.AD_BUBBLE_TIP),
              j8.play(o_.MERGE_END_BUBBLE),
              u.dispatch("showElementInfo", e));
          }
        }
      }),
      (i.autoHarvestLock = function (e) {
        ((e.isLock = !0),
          b.setTimeout(function () {
            e.isLock = !1;
          }, 100));
      }),
      (i = n = o([vG, mG("MergeCell/Logic/AdBubbleElement"), BM("AdBubbleElement")], i))
    );
  })(xM);
cc._RF.pop();
