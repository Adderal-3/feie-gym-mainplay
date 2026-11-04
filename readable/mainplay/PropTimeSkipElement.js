// Extracted cached Cocos registration: PropTimeSkipElement
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 6384820..6388736.
// Shared closure variables remain in readable/game.formatted.js:314126.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "d53fcbRO1pHN7O3Lqog2JdR", "PropTimeSkipElement");
var j_e = cc._decorator,
  z_e = j_e.ccclass;
j_e.property;
var K_e = j_e.menu,
  q_e = (function (e) {
    function n() {
      return (null !== e && e.apply(this, arguments)) || this;
    }
    var s;
    return (
      t(n, e),
      (s = n),
      (n.prototype.onInitRender = function (e) {
        if (!e || !e.data.elementType.includes(Z2.BUBBLE)) {
          e3.AddCellAnim(e, TC.PROP_TIME_SKIP_TIP);
          var t = cc
            .tween(e.mergeCellRender.node_icon)
            .repeatForever(
              cc
                .tween(e.mergeCellRender.node_icon)
                .by(0.5, { scale: 0.1 })
                .by(0.5, { scale: -0.1 }),
            );
          e.showElementTween("propTimeSkipTipTween", t);
        }
      }),
      (n.prototype.onClickElement = function (e) {
        var t, i, n, o;
        if (
          !e.data.elementType.includes(Z2.BUBBLE) &&
          !G$.IsCellInState(e, mr.web) &&
          !G$.IsCellInState(e, mr.box)
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
          var r = config.PropEffect.getById(e.data.config.propEffect).effectValue,
            a = e.data.config.id,
            c = DC.CheckHasExtra(e),
            l = X8.CheckHasExtra(e),
            d = null === (t = m2.instance) || void 0 === t ? void 0 : t.CheckHasExtra(e),
            u = null === (i = dI.instance) || void 0 === i ? void 0 : i.CheckHasExtra(e),
            h = qG.CheckHasExtra(e);
          (h && qG.checkEnergyForce(e.worldPos, h),
            c && DC.checkActPlusEnergyForce(e.worldPos),
            l && X8.checkActPlusEnergyForce(e.worldPos),
            d &&
              (null === (n = m2.instance) || void 0 === n || n.checkActPlusEnergyForce(e.worldPos)),
            u && (null === (o = dI.instance) || void 0 === o || o.checkAct8EnergyForce(e.worldPos)),
            hx.instance.collectCellAllExtraRes(e),
            (e.data = null));
          for (var p = s._circleCheck(e.pos), f = [], g = 0; g < p.length; g++)
            for (var v = 0; v < p[g].length; v++) p[g][v] && f.push(p[g][v]);
          (f.sort(function (e, t) {
            return e.serverIdx - t.serverIdx;
          }),
            (G$.FilledStateCells = []));
          var m = this.skipTimes(f, r);
          (m.sort(function (e, t) {
            return e.index - t.index;
          }),
            (G$.FilledStateCells = null),
            j8.play(o_.PROP_USE_TIME_SKIP),
            K3.logEvent("use_prop", { type: "timeSkip", id: a }));
          for (var y = 0; y < m.length; y++) {
            var _ = G$.GetCellByIndex(m[y].index);
            _ && _.data && ((_.data.isOld = !1), (_.data = _.data));
          }
          s.anim(p);
        }
      }),
      (n.anim = function (e, t) {
        return (
          void 0 === t && (t = null),
          r(this, void 0, void 0, function () {
            var n;
            return a(this, function (o) {
              switch (o.label) {
                case 0:
                  (d.emit(i.MultipleVibate, {
                    type: by.Light,
                    count: 5,
                    intervalChangeType: wy.Increase,
                    source: "波浪动画",
                  }),
                    (n = 0),
                    (o.label = 1));
                case 1:
                  return n < e.length
                    ? (e[n].forEach(function (e, i) {
                        if (e && e.data && e.mergeCellRender && (!t || t(e))) {
                          var n = e;
                          cc.tween(n.mergeCellRender.node)
                            .call(function () {
                              e3.AddCellAnim(n, TC.PROP_USE_SKIP_TIME);
                            })
                            .by(0.166, { y: 30 }, { easing: "quadOut" })
                            .by(0.166, { y: -30 }, { easing: "quadIn" })
                            .call(function () {
                              n.isElementAtCenter() || n.setElementTo(n.worldPos, !0);
                            })
                            .start();
                        }
                      }),
                      [4, S(100)])
                    : [3, 4];
                case 2:
                  (o.sent(), (o.label = 3));
                case 3:
                  return (n++, [3, 1]);
                case 4:
                  return [2];
              }
            });
          })
        );
      }),
      (n.prototype.skipTimes = function (e, t) {
        var i = this,
          n = [];
        return (
          e.forEach(function (e, o) {
            i._skipTime(e, t) && e.data && n.push(e.data.remoteData);
          }),
          n
        );
      }),
      (n.prototype._skipTime = function (e, t) {
        if (e && e.data) {
          var i = e.data.remoteData;
          return (
            !!this._skipStoreCell(e, t) ||
            (GW.RemoveShortCd(i),
            G$.TimeSkipCell(e.data.remoteData, 1e3 * t),
            !i.bubbleEnd &&
              0 == i.bubbleEnd &&
              0 == i.endTime &&
              (i.recovery.size > 0 ||
                0 != i.deteriorateEnd ||
                0 != i.openEnd ||
                (i.order && i.order.orderId && 0 != i.order.endTime)) &&
              !G$.IsElementDontSkipTime(i))
          );
        }
      }),
      (n.prototype._skipStoreCell = function (e, t) {
        return MW.skipStoreLaunchersTime(e, t);
      }),
      (n._circleCheck = function (e) {
        var t = G2.Board;
        if (!G$.GetCellByPos(e)) return null;
        var i,
          n,
          o,
          r = t.boardWidth - 1;
        ((i = Math.max(e.x, r - e.x)),
          (r = t.boardHeight - 1),
          (n = Math.max(e.y, r - e.y)),
          (o = Math.max(i, n)));
        for (
          var a = function (e) {
              var t = G$.GetCellByPos(e);
              return t &&
                t.data &&
                !G$.IsCellInState(t, mr.web) &&
                !G$.IsCellInState(t, mr.box) &&
                t.cellState != Q2.SNOW
                ? t
                : null;
            },
            s = [],
            c = 1;
          c <= o;
        ) {
          for (var l = [], d = 0; d <= c; d++) l.push(a(cc.v2(e.x + d, e.y - c)));
          for (d = 1 - c; d <= c; d++) l.push(a(cc.v2(e.x + c, e.y + d)));
          for (d = c - 1; d >= -c; d--) l.push(a(cc.v2(e.x + d, e.y + c)));
          for (d = c - 1; d >= -c; d--) l.push(a(cc.v2(e.x - c, e.y + d)));
          for (d = 1 - c; d < 0; d++) l.push(a(cc.v2(e.x + d, e.y - c)));
          (c++, s.push(l));
        }
        return s;
      }),
      (n = s = o([z_e, K_e("MergeCell/Logic/PropTimeSkipElement"), BM("PropTimeSkipElement")], n))
    );
  })(xM);
cc._RF.pop();
