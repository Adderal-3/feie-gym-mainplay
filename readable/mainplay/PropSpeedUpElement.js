// Extracted cached Cocos registration: PropSpeedUpElement
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 1879001..1884532.
// Shared closure variables remain in readable/game.formatted.js:92358.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "1f653xeNC5FnpQmqMJxXMy1", "PropSpeedUpElement");
var kG = cc._decorator,
  RG = kG.ccclass;
kG.property;
var PG = kG.menu,
  DG = (function (e) {
    function i() {
      return (null !== e && e.apply(this, arguments)) || this;
    }
    var n;
    return (
      t(i, e),
      (n = i),
      (i.prototype.onInitRender = function (e) {
        G$.IsCellInState(e, mr.web) || G$.IsCellInState(e, mr.box) || this._display(e);
      }),
      (i.prototype.onInitElement = function (e) {
        var t = this;
        !e.data.elementType.includes(Z2.BUBBLE) &&
          e.data.config.propEffect &&
          e.data.remoteData.endTime &&
          G$.GetAroundCells(e).forEach(function (i) {
            i &&
              i.data &&
              (t._setData(i.data.remoteData, e.data.remoteData), n.addCellSpeedUpAnim(i, e));
          });
      }),
      (i.prototype.onClickElement = function (e) {
        var t,
          i,
          o,
          r,
          a = this;
        if (
          !e.data.elementType.includes(Z2.BUBBLE) &&
          e.data.config.propEffect &&
          !e.data.remoteData.endTime
        ) {
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
          );
          var s = DC.CheckHasExtra(e),
            c = X8.CheckHasExtra(e),
            l = null === (t = m2.instance) || void 0 === t ? void 0 : t.CheckHasExtra(e),
            d = null === (i = dI.instance) || void 0 === i ? void 0 : i.CheckHasExtra(e),
            h = qG.CheckHasExtra(e);
          (s && DC.checkActPlusEnergyForce(e.worldPos),
            c && X8.checkActPlusEnergyForce(e.worldPos),
            l &&
              (null === (o = m2.instance) || void 0 === o || o.checkActPlusEnergyForce(e.worldPos)),
            d && (null === (r = dI.instance) || void 0 === r || r.checkAct8EnergyForce(e.worldPos)),
            h && qG.checkEnergyForce(e.worldPos, h),
            hx.instance.collectCellAllExtraRes(e),
            j8.play(o_.PROP_USE_SPEED_UP));
          var p = config.PropEffect.getById(e.data.config.propEffect);
          ((e.data.remoteData.endTime = E8.serverTime + 1e3 * p.effectValue),
            G$.GetAroundCells(e).forEach(function (t) {
              t &&
                t.data &&
                (a._setData(t.data.remoteData, e.data.remoteData), n.addCellSpeedUpAnim(t, e));
            }),
            this._display(e, !0),
            u.dispatch("showElementInfo", e),
            K3.logEvent("use_prop", { type: "speedup", id: e.data.config.id }));
        }
      }),
      (i.prototype.onTimeChange = function (e) {
        this.updateRecover(e);
      }),
      (i.prototype.updateRecover = function (e) {
        var t = e.dynamicComponents.get("SpeedUpRecover");
        t && t.onUpdate(null);
      }),
      (i.prototype.onRemove = function (e) {
        G$.GetAroundCells(e).forEach(function (t) {
          t && t.data && n.addCellSpeedUpAnim(t, null, e.serverIdx);
        });
      }),
      (i.prototype._display = function (e, t) {
        if ((void 0 === t && (t = !1), e.data)) {
          var i = e3.AddCellAnim(e, TC.SPEED_UP);
          if (
            (t
              ? (e.mergeCellRender.node_icon.stopAllActions(),
                e.mergeCellRender.showReadyIcon(e.data.remoteData.endTime > 0),
                cc
                  .tween(e.mergeCellRender.node_icon)
                  .to(0.166, { scale: 0.8 })
                  .to(0.166, { scale: 1.1 })
                  .to(0.166, { scale: 0.95 })
                  .to(0.166, { scale: 1 })
                  .start())
              : e.mergeCellRender.showReadyIcon(e.data.remoteData.endTime > 0),
            i && e.data.remoteData.endTime)
          ) {
            (t && (e.data.isOld = !1), n.showSpeedUpAnim(e));
            var o = i.getComponent(AG);
            (e.registComponent("SpeedUpRecover", o), o && (o.data = e), t && (e.data.isOld = !0));
          }
        }
      }),
      (i.prototype._setData = function (e, t) {
        t.endTime <= 0 ||
          t.endTime < E8.serverTime ||
          (e.skills.set(Da.speedUp, 2),
          e._speedUpStartTime || (e._speedUpStartTime = E8.serverTime),
          e.recovery.forEach(function (e) {
            var i = e;
            i.speedUpStartTime ||
              ((i.speedUpStartTime = E8.serverTime),
              (i.speedUpScale = 2),
              (!i.speedUpEndTime || i.speedUpEndTime < t.endTime) &&
                (i.speedUpEndTime = t.endTime));
          }));
      }),
      (i.addCellSpeedUpAnim = function (e, t, i) {
        if ((void 0 === i && (i = 0), e.data)) {
          var o = [];
          if (!t) {
            var r = 0;
            if (
              (G$.GetAroundCells(e).forEach(function (e) {
                e &&
                  e.data &&
                  e.data.remoteData.endTime > 0 &&
                  6 == ~~(config.Element.getById(e.data.remoteData.elementId).propEffect / 100) &&
                  e.data.remoteData.endTime > E8.serverTime &&
                  e.serverIdx != i &&
                  (o.push(e), e.data.remoteData.endTime > r && (r = e.data.remoteData.endTime));
              }),
              o.length > 0)
            )
              (e.data.remoteData.skills.set(Da.speedUp, 2),
                e.data.remoteData._speedUpStartTime ||
                  (e.data.remoteData._speedUpStartTime = E8.serverTime),
                e.data.remoteData.recovery.forEach(function (e) {
                  var t = e;
                  t.speedUpStartTime ||
                    ((t.speedUpStartTime = E8.serverTime),
                    (t.speedUpScale = 2),
                    (t.speedUpEndTime = r));
                }));
            else
              (e.data.remoteData.skills.delete(Da.speedUp),
                (e.data.remoteData._speedUpStartTime = null),
                e.data.remoteData.recovery.forEach(function (e) {
                  var t = e;
                  t.speedUpStartTime &&
                    ((t.speedUpStartTime = 0), (t.speedUpScale = 0), (t.speedUpEndTime = 0));
                }));
          }
          var a = e.data.remoteData;
          if (G$.IsElementCanSpeedUp(a)) {
            var s = !0;
            (a.recovery.size > 0 &&
              !a.openEnd &&
              a.recovery.forEach(function (t, i) {
                ((i == yr.manualProduct && t.value >= e.data.config.elementCDStorage) ||
                  (i == yr.autoProduct && t.value > 0 && 0 == t.state)) &&
                  (s = !1);
              }),
              s && e3.AddCellAnim(e, TC.PROP_SPEED_UP_ELEMENT));
            var c = cc
              .tween(e.mergeCellRender.node_icon)
              .repeatForever(
                cc
                  .tween(e.mergeCellRender.node_icon)
                  .to(0.16, { scaleX: 1, scaleY: 0.85 })
                  .to(0.25, { scaleX: 0.95, scaleY: 1 })
                  .to(0.16, { scaleX: 1, scaleY: 0.85 })
                  .to(0.25, { scaleX: 1, scaleY: 1 }),
              );
            (e.showElementTween("speedUpTween", c),
              t
                ? n.showSpeedUpAnimByCell(e, t)
                : o.forEach(function (t) {
                    n.showSpeedUpAnimByCell(e, t);
                  }));
          } else
            (e3.RemoveCellAnim(e, TC.PROP_SPEED_UP_ELEMENT),
              e.endElementTween("speedUpTween"),
              t
                ? n.hideSpeedUpAnimByCell(e, t)
                : o.forEach(function (t) {
                    n.hideSpeedUpAnimByCell(e, t);
                  }));
        }
      }),
      (i.showSpeedUpAnim = function (e) {
        var t = e3.AddCellAnim(e, TC.PROP_SPEED_UP).getComponent(CG);
        G$.GetAroundGdcells(e).forEach(function (e, i) {
          e && G$.IsElementCanSpeedUp(e) && t.showAnimByIndex(i);
        });
      }),
      (i.showSpeedUpAnimByCell = function (e, t) {
        if (e.data && t.data && G$.IsElementCanSpeedUp(e.data.remoteData)) {
          for (var i = G$.GetAroundCells(t), n = 0, o = 0; o < i.length; o++)
            if (i[o] && i[o].serverIdx == e.serverIdx) {
              n = o;
              break;
            }
          e3.AddCellAnim(t, TC.PROP_SPEED_UP).getComponent(CG).showAnimByIndex(n);
        }
      }),
      (i.hideSpeedUpAnimByCell = function (e, t) {
        if (e.data && t.data) {
          for (var i = G$.GetAroundCells(t), n = 0, o = 0; o < i.length; o++)
            if (i[o] && i[o].serverIdx == e.serverIdx) {
              n = o;
              break;
            }
          e3.AddCellAnim(t, TC.PROP_SPEED_UP).getComponent(CG).hideAnimByIndex(n);
        }
      }),
      (i = n = o([RG, PG("MergeCell/Logic/PropSpeedUpElement"), BM("PropSpeedUpElement")], i))
    );
  })(xM);
cc._RF.pop();
