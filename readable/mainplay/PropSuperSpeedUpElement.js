// Extracted cached Cocos registration: PropSuperSpeedUpElement
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 8318283..8321721.
// Shared closure variables remain in readable/game.formatted.js:403928.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "87483dNPURN9ZoqGiwd2kO3", "PropSuperSpeedUpElement");
var sKe = cc._decorator,
  cKe = sKe.ccclass;
sKe.property;
var lKe = sKe.menu,
  dKe = (function (e) {
    function i() {
      return (null !== e && e.apply(this, arguments)) || this;
    }
    var n;
    return (
      t(i, e),
      (n = i),
      (i.prototype.onInitRender = function (e) {
        if (!G$.IsCellInState(e, mr.web) && !G$.IsCellInState(e, mr.box)) {
          if (!e.data.remoteData.endTime) {
            var t = config.PropEffect.getById(e.data.config.propEffect);
            e.data.remoteData.endTime = E8.serverTime + 1e3 * t.effectValue;
          }
          this._display(e);
        }
      }),
      (i.prototype.onInitElement = function (e) {
        var t = this;
        !e.data.elementType.includes(Z2.BUBBLE) &&
          e.data.config.propEffect &&
          G$.GetAroundCells(e).forEach(function (i) {
            i &&
              i.data &&
              (t._setData(i.data.remoteData, e.data.remoteData), n.addCellSpeedUpAnim(i, e));
          });
      }),
      (i.prototype.onRemove = function (e, t) {
        G$.GetAroundCells(e).forEach(function (i) {
          i && i.data && n.addCellSpeedUpAnim(i, null, e.serverIdx, t);
        });
      }),
      (i.prototype._setData = function (e, t) {
        t.endTime <= 0 ||
          t.endTime < E8.serverTime ||
          config.Config.config.unusableWaterwheelGenerator.indexOf(e.elementId) >= 0 ||
          (e._superSpeedUpStartTime || (e._superSpeedUpStartTime = E8.serverTime),
          e.recovery.forEach(function (e) {
            var i = e;
            (i.superSpeedUpStartTime || (i.superSpeedUpStartTime = E8.serverTime),
              (!i.superSpeedUpEndTime || i.superSpeedUpEndTime < t.endTime) &&
                (i.superSpeedUpEndTime = t.endTime));
          }));
      }),
      (i.prototype._display = function (e, t) {
        if ((void 0 === t && (t = !1), e.data)) {
          var i = e3.AddCellAnim(e, TC.SUPER_SPEED_UP);
          if (i && e.data.remoteData.endTime) {
            (t && (e.data.isOld = !1), n.showSpeedUpAnim(e));
            var o = i.getComponent(aKe);
            (e.registComponent("SuperSpeedUpRecover", o),
              o && (o.data = e),
              t && (e.data.isOld = !0));
          }
        }
      }),
      (i.showSpeedUpAnim = function (e) {
        G$.GetAroundCells(e).forEach(function (e, t) {
          e && G$.IsElementCanSuperSpeedUp(e) && e3.AddCellAnim(e, TC.SUPER_SPEED_UP);
        });
      }),
      (i.addCellSpeedUpAnim = function (e, t, i, n) {
        if ((void 0 === i && (i = 0), void 0 === n && (n = 0), e.data)) {
          var o = [];
          if (!t) {
            var r = 0,
              a = G$.GetAroundCells(e),
              s = !1;
            if (
              (a.forEach(function (e) {
                e && e.serverIdx == n && (s = !0);
              }),
              a.forEach(function (e) {
                e &&
                  e.data &&
                  e.data.remoteData.endTime > 0 &&
                  11 == ~~(config.Element.getById(e.data.remoteData.elementId).propEffect / 100) &&
                  e.data.remoteData.endTime > E8.serverTime &&
                  (e.serverIdx != i || s) &&
                  (o.push(e), e.data.remoteData.endTime > r && (r = e.data.remoteData.endTime));
              }),
              o.length > 0)
            ) {
              var c =
                config.Config.config.unusableWaterwheelGenerator.indexOf(e.data.config.id) >= 0;
              if (!e.data.remoteData._superSpeedUpStartTime && !c)
                ((e.data.remoteData._superSpeedUpStartTime = E8.serverTime),
                  e.data.remoteData.recovery.forEach(function (e) {
                    var t = e;
                    t.superSpeedUpStartTime ||
                      ((t.superSpeedUpStartTime = E8.serverTime), (t.superSpeedUpEndTime = r));
                  }));
            } else {
              e.data.remoteData.recovery.forEach(function (t) {
                var i = t;
                i &&
                  i.superSpeedUpStartTime &&
                  (i.check && i.check(),
                  (e.data.remoteData._superSpeedUpStartTime = null),
                  (i.superSpeedUpStartTime = 0),
                  (i.superSpeedUpEndTime = 0));
              });
            }
          }
          if (G$.IsElementCanSuperSpeedUp(e)) {
            var l = TC.PROP_SUPER_SPEED_UP_ELEMENT;
            (G2.MergeBoardType == ar.banana && (l = TC.PROP_DARK_CLOUDS), e3.AddCellAnim(e, l));
            var d = cc
              .tween(e.mergeCellRender.node_icon)
              .repeatForever(
                cc
                  .tween(e.mergeCellRender.node_icon)
                  .to(0.16, { scaleX: 1, scaleY: 0.85 })
                  .to(0.25, { scaleX: 0.95, scaleY: 1 })
                  .to(0.16, { scaleX: 1, scaleY: 0.85 })
                  .to(0.25, { scaleX: 1, scaleY: 1 }),
              );
            e.showElementTween("speedUpTween", d);
          } else {
            l = TC.PROP_SUPER_SPEED_UP_ELEMENT;
            (G2.MergeBoardType == ar.banana && (l = TC.PROP_DARK_CLOUDS),
              e3.RemoveCellAnim(e, l),
              e.endElementTween("speedUpTween"));
          }
        }
      }),
      (i = n =
        o([cKe, lKe("MergeCell/Logic/PropSuperSpeedUpElement"), BM("PropSuperSpeedUpElement")], i))
    );
  })(xM);
cc._RF.pop();
