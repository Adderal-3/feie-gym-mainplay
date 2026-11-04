// Original shared-closure declaration G$: BoardRules
// Source UTF-16 offsets 3381808..3413567; complete context in game.formatted.js:165009.
// Analysis fragment; not independently executable.

var G$ = (function () {
  function e() {}
  return (
    (e.IsBoardLockedElement = function (e) {
      var t, i;
      return this.IsBoardLockedElementId(
        (null ===
          (i = null === (t = null == e ? void 0 : e.data) || void 0 === t ? void 0 : t.config) ||
        void 0 === i
          ? void 0
          : i.id) || 0,
      );
    }),
    (e.IsBoardLockedElementId = function (e) {
      if (!e) return !1;
      var t = config.Config.config.boardLockedElement;
      return !!t && t.includes(e);
    }),
    (e.IsElementKnow = function (e) {
      if (F8.isEditor) return !0;
      var t = I2.isElementKnown(e);
      if (void 0 !== t) return t;
      if (v$.Data.get(e) >= 0) return !0;
      var i = !1;
      if (
        (G2.Data.orders.forEach(function (t, n) {
          if (!i) {
            var o = UT.getOrderConf(t.orderId);
            o &&
              o.demand.forEach(function (t, n) {
                i || (parseInt(n) == e && (i = !0));
              });
          }
        }),
        i)
      )
        return !0;
      var n = !1;
      return (
        E8.role.shop.forEach(function (t, i) {
          n ||
            t.goods.forEach(function (t, i) {
              if (!n) {
                var o = config.Shop.getById(t.id);
                o
                  ? o.goods.forEach(function (t, i) {
                      n || (K6.ParseItemConf(i).itemId == e && (n = !0));
                    })
                  : K3.logEvent("check_shop_error", { id: t.id });
              }
            });
        }),
        !1
      );
    }),
    (e.SetElementKnow = function (e, t) {
      var n;
      if ((void 0 === t && (t = !1), !I2.unlockElement(e) && v$.Data.size)) {
        u.dispatch(zb.HANDBOOK_KNOW_BEFORE, e);
        var o = !1,
          r = config.Element.getById(e),
          a = function (e) {
            (v$.Data.get(e) >= 0 || ((o = !0), v$.Data.set(e, 0)), t && v$.Data.set(e, 1));
          };
        (r.prefab
          ? null === (n = MI.instance.getElemByPrefabId(r.prefab)) ||
            void 0 === n ||
            n.forEach(function (e) {
              a(e);
            })
          : a(e),
          o && u.dispatch("checkHandBook"),
          (o || t) && d.emit(i.HandbookDataChanged));
      }
    }),
    (e.IsBoardOrdereElementNeed = function (e) {
      if (!e) return !1;
      var t = [];
      G2.Data.orders.forEach(function (e) {
        t.push(e.orderId);
      });
      for (var i = !1, n = 0; n < t.length; n++) {
        var o = UT.getOrderConf(t[n]);
        o
          ? o.demand.forEach(function (t, n) {
              i || (parseInt(n) == e && (i = !0));
            })
          : h.error("not find order id:", t[n]);
      }
      return i;
    }),
    (e.GetCellByIndex = function (e) {
      if (!G2.Board || !G2.Board.cells) return null;
      var t = Math.floor((e - 1) / G2.Board.boardWidth),
        i = (e - 1) % G2.Board.boardWidth;
      if (!G2.Board.cells[t]) return null;
      if (!G2.Board.cells[t][i]) return null;
      var n = G2.Board.cells[t][i];
      return (n && n.isLock && (n = null), n);
    }),
    (e.GetCellBy = function (e) {
      if (!G2.Board || !G2.Board.cells) return null;
      var t = null;
      return (
        G2.Board.cells.forEach(function (i) {
          t ||
            i.forEach(function (i) {
              e(i) && (t = i);
            });
        }),
        t
      );
    }),
    (e.GetCellSBy = function (e) {
      if (!G2.Board || !G2.Board.cells) return null;
      var t = [];
      return (
        G2.Board.cells.forEach(function (i) {
          i.forEach(function (i) {
            e(i) && t.push(i);
          });
        }),
        t
      );
    }),
    (e.GetCellBySeries = function (e) {
      return this.GetCellBy(function (t) {
        var i;
        return (null === (i = t.data) || void 0 === i ? void 0 : i.config.series) === e;
      });
    }),
    (e.GetLockedCell = function (t) {
      return this.GetCellBy(function (i) {
        var n, o, r, a, s, c;
        return (
          !!t.includes(
            null === (o = null === (n = i.data) || void 0 === n ? void 0 : n.config) || void 0 === o
              ? void 0
              : o.id,
          ) &&
          0 !==
            (null === (a = null === (r = i.data) || void 0 === r ? void 0 : r.config) ||
            void 0 === a
              ? void 0
              : a.unlockDuration) &&
          !(
            (null === (c = null === (s = i.data) || void 0 === s ? void 0 : s.remoteData) ||
            void 0 === c
              ? void 0
              : c.openEnd) > 0
          ) &&
          !e.IsCellInState(i.data.mergeCell, mr.opened)
        );
      });
    }),
    (e.GetOnCdCell = function (e) {
      var t,
        i,
        n = this,
        o = function (t) {
          var i, o;
          if (!t || !t.data || !t.data.config) return !1;
          if (e && e.includes(t.data.config.id)) return !1;
          if (t.data.config.unlockDuration > 0 && !n.IsCellInState(t, mr.opened))
            return t.data.remoteData.openEnd - E8.serverTime > 1e3;
          var r = t.data.elementType;
          return r.includes(Z2.ORDER) &&
            t.data.remoteData.order.endTime &&
            t.data.remoteData.order.state == kr.running
            ? t.data.remoteData.order.endTime - E8.serverTime > 1e3
            : r.includes(Z2.MANU_CREATOR)
              ? 1 ===
                (null === (i = t.data.getRecovery(yr.manualProduct)) || void 0 === i
                  ? void 0
                  : i.state)
              : !!r.includes(Z2.AUTO_CREATOR) &&
                1 ===
                  (null === (o = t.data.getRecovery(yr.autoProduct)) || void 0 === o
                    ? void 0
                    : o.state);
        },
        r = G2.instance.selectedElement;
      return (null ===
        (i = null === (t = null == r ? void 0 : r.data) || void 0 === t ? void 0 : t.config) ||
      void 0 === i
        ? void 0
        : i.id) && o(r)
        ? r
        : this.GetCellBy(o);
    }),
    (e.GetBubbleCell = function () {
      return this.GetCellBy(function (e) {
        var t, i;
        return (
          (null === (i = null === (t = e.data) || void 0 === t ? void 0 : t.remoteData) ||
          void 0 === i
            ? void 0
            : i.productType) === vr.bubble
        );
      });
    }),
    (e.GetFrozenBubbleCell = function () {
      return this.GetCellBy(function (e) {
        var t, i;
        return (
          (null === (i = null === (t = e.data) || void 0 === t ? void 0 : t.remoteData) ||
          void 0 === i
            ? void 0
            : i.productType) == vr.frozenBubble
        );
      });
    }),
    (e.GetGogBubbleCell = function () {
      return this.GetCellBy(function (e) {
        var t, i, n;
        return null ===
          (n =
            null === (i = null === (t = e.data) || void 0 === t ? void 0 : t.remoteData) ||
            void 0 === i
              ? void 0
              : i.extra) || void 0 === n
          ? void 0
          : n.has(fr.goGReqOrderId);
      });
    }),
    (e.GetCellById = function (e) {
      var t = this;
      if (!G2.Board || !G2.Board.cells) return null;
      var i = null;
      return (
        G2.Data.cells.forEach(function (n) {
          i || (n.elementId == e && (i = t.GetCellByIndex(n.index)));
        }),
        i
      );
    }),
    (e.GetBoardElementConfig = function (e) {
      var t;
      if (!e || !G2.Data) return "";
      var i = G2.Data,
        n = config.Board.getById(i.boardId);
      if (!n) return "";
      var o = (i.viewStartRow || 0) + e.pos.y;
      return (null === (t = n.element[o]) || void 0 === t ? void 0 : t[e.pos.x]) || "";
    }),
    (e.GetCellByPos = function (e) {
      if (!G2.Board || !G2.Board.cells) return null;
      if (!G2.Board.cells[e.y]) return null;
      if (!G2.Board.cells[e.y][e.x]) return null;
      var t = G2.Board.cells[e.y][e.x];
      return (t && t.isLock && (t = null), t);
    }),
    (e.GetCellByWorldPos = function (e, t, i) {
      if ((i || (i = G2.Board), i && e && i.cellSize)) {
        var n = G2.BoardRender.node.convertToNodeSpaceAR(e),
          o = i.cellSize,
          r = 0.5 * i.cellSize,
          a = i.boardSize.mul(r),
          s = cc.v2(-a.x, a.y);
        if (Math.abs(n.x) > a.x || Math.abs(n.y) > a.y) return null;
        var c = Math.floor(Math.abs(n.x - s.x) / o),
          l = Math.floor(Math.abs(n.y - s.y) / o),
          d = i.getCellByPos(c, l);
        return (d && d.isLock && (d = null), d);
      }
    }),
    (e.GetCellLogic = function (e, t) {
      var i = e.mergeCellRender;
      return i ? i.node.getComponent(t) : null;
    }),
    (e.GetClosestBlankCell = function (e, t, i) {
      var n = this;
      if ((void 0 === t && (t = 0), i || (i = G2.Board), !i)) return null;
      if (!this.GetCellByPos(e)) return null;
      var o,
        r,
        a,
        s = i.boardWidth - 1;
      ((o = Math.max(e.x, s - e.x)),
        (s = i.boardHeight - 1),
        (r = Math.max(e.y, s - e.y)),
        (a = Math.max(o, r)));
      for (
        var c = function (e) {
            var t = n.GetCellByPos(e);
            t && !t.data && l.push(t);
          },
          l = [],
          d = 1;
        d <= a;
      ) {
        for (var u = 0; u <= d; u++)
          if ((c(cc.v2(e.x + u, e.y - d)), t > 0 && l.length >= t)) return l;
        for (u = 1 - d; u <= d; u++)
          if ((c(cc.v2(e.x + d, e.y + u)), t > 0 && l.length >= t)) return l;
        for (u = d - 1; u >= -d; u--)
          if ((c(cc.v2(e.x + u, e.y + d)), t > 0 && l.length >= t)) return l;
        for (u = d - 1; u >= -d; u--)
          if ((c(cc.v2(e.x - d, e.y + u)), t > 0 && l.length >= t)) return l;
        for (u = 1 - d; u < 0; u++)
          if ((c(cc.v2(e.x + u, e.y - d)), t > 0 && l.length >= t)) return l;
        d++;
      }
      return l;
    }),
    (e.startCheckExtraProduct = function () {
      return r(this, void 0, void 0, function () {
        return a(this, function (e) {
          switch (e.label) {
            case 0:
              if (this.isStartedExtraProduct || nq.isKeyCollectLocked()) return [2];
              ((this.isStartedExtraProduct = !0), (e.label = 1));
            case 1:
              return this.forceCloseExtraProduct ? [3, 3] : [4, S(120)];
            case 2:
              return (
                e.sent(),
                nq.isKeyCollectLocked()
                  ? ((this.isStartedExtraProduct = !1), [2])
                  : M$.checkExtraProduct().needCheck
                    ? [3, 1]
                    : ((this.isStartedExtraProduct = !1), [2])
              );
            case 3:
              return ((this.isStartedExtraProduct = !1), [2]);
          }
        });
      });
    }),
    (e.GetCanMergeCells = function (e, t) {
      var i = this;
      if ((void 0 === e && (e = !1), void 0 === t && (t = !0), !G2.Board)) return [];
      var n = G2.Board.cells,
        o = [],
        r = new Map();
      (n.forEach(function (e) {
        e.forEach(function (e) {
          e.data &&
            e.cellState != Q2.SNOW &&
            (!e.data ||
              e.isLock ||
              e.data.freeze ||
              i.IsCellInState(e, mr.box) ||
              (t &&
                i.IsCellInState(e, mr.web) &&
                !r.get(e.data.config.id) &&
                r.set(e.data.config.id, !0),
              o.push(e)));
        });
      }),
        o.sort(function (e, t) {
          return e.data.config.id - t.data.config.id;
        }));
      var a = [];
      if (t && r.size > 0) {
        var s = [],
          c = [];
        (o.forEach(function (e) {
          r.get(e.data.config.id) ? s.push(e) : c.push(e);
        }),
          s.sort(function (e, t) {
            return e.data.config.id == t.data.config.id
              ? i.IsCellInState(e, mr.web)
                ? -1
                : i.IsCellInState(t, mr.web)
                  ? 1
                  : e.serverIdx - t.serverIdx
              : e.data.config.id - t.data.config.id;
          }),
          (o = s.concat(c)));
      }
      for (var l = o[0], d = 1; d < o.length && !(a.length >= 5); d++)
        if (this.IsElementCanMerge(l, o[d])) {
          if ((a.push([l, o[d]]), !e)) return a[0];
          (o[d + 1] && (l = o[d + 1]), d++);
        } else l = o[d];
      if (t && r.size > 0 && a.length) {
        var u = [];
        if (
          (a.forEach(function (e) {
            r.get(e[0].data.config.id) &&
              (i.IsCellInState(e[0], mr.web) || i.IsCellInState(e[1], mr.web)) &&
              u.push(e);
          }),
          u.length)
        )
          return (e && W(u, !0), u[0]);
      }
      return (e && W(a, !0), a[0] ? a[0] : []);
    }),
    (e.HasMergeElement = function (e) {
      var t = this;
      if (!G2.Board) return !1;
      var i = G2.Board.cells,
        n = 0;
      return (
        i.forEach(function (i) {
          i.forEach(function (i) {
            n < 2 &&
              i.data &&
              !i.isLock &&
              !t.IsCellInState(i, mr.box) &&
              i.data.config.id == e &&
              n++;
          });
        }),
        n > 1
      );
    }),
    (e.IsPosOutBoard = function (e, t) {
      return (
        t || (t = G2.Board),
        e.x < 0 || e.x > t.boardRenderSize.x || e.y > 0 || e.y < -t.boardRenderSize.y
      );
    }),
    (e.IsElementCanMerge = function (e, t) {
      return (
        !(!e.data || !t.data) &&
        (e.pos.x != t.pos.x || e.pos.y != t.pos.y) &&
        !this.IsCellInState(e, mr.box) &&
        !this.IsCellInState(t, mr.box) &&
        (!this.IsCellInState(e, mr.web) || !this.IsCellInState(t, mr.web)) &&
        e.cellState != Q2.SNOW &&
        t.cellState != Q2.SNOW &&
        !(!this.IsElementCanMergeBubble(e) || !this.IsElementCanMergeBubble(t)) &&
        !e.data.remoteData.endTime &&
        !t.data.remoteData.endTime &&
        (!config.Config.config.productCannotMergeSeries.includes(e.data.config.series) ||
          !(e.data.remoteData.productCount > 0 || t.data.remoteData.productCount > 0)) &&
        0 != e.data.config.mergeElementId &&
        0 != t.data.config.mergeElementId &&
        !(
          b2.InValidElementArr.indexOf(e.data.config.mergeElementId) >= 0 &&
          !b2.CheckElementValid(e.data.config.mergeElementId)
        ) &&
        e.data.config.series == t.data.config.series &&
        e.data.config.level == t.data.config.level
      );
    }),
    (e.IsElementCanMergeBubble = function (e) {
      return (
        !!e.data &&
        (!!e.data.elementType.includes(Z2.FROZEN_BUBBLE) || !e.data.elementType.includes(Z2.BUBBLE))
      );
    }),
    (e.GetCrossCells = function (e) {
      if (!e) return [];
      var t = [],
        i = e.pos,
        n = this.GetCellByPos(cc.v2(i.x, i.y - 1)),
        o = this.GetCellByPos(cc.v2(i.x, i.y + 1)),
        r = this.GetCellByPos(cc.v2(i.x - 1, i.y)),
        a = this.GetCellByPos(cc.v2(i.x + 1, i.y));
      return (n && t.push(n), a && t.push(a), o && t.push(o), r && t.push(r), t);
    }),
    (e.GetAroundCells = function (e, t) {
      for (
        var i = [],
          n = e.pos,
          o = [
            cc.v2(0, -1),
            cc.v2(1, -1),
            cc.v2(1, 0),
            cc.v2(1, 1),
            cc.v2(0, 1),
            cc.v2(-1, 1),
            cc.v2(-1, 0),
            cc.v2(-1, -1),
          ],
          r = 0;
        r < o.length;
        r++
      ) {
        var a = o[r],
          s = a.x + n.x,
          c = a.y + n.y;
        if (s < 0 || c < 0 || s > G2.Board.boardWidth - 1 || c > G2.Board.boardHeight - 1)
          i.push(null);
        else {
          var l = this.GetCellByPos(cc.v2(s, c));
          (!t || (t && t(l))) && i.push(l);
        }
      }
      return i;
    }),
    (e.GetAroundGdcells = function (e) {
      for (
        var t = [],
          i = e.pos,
          n = [
            cc.v2(0, -1),
            cc.v2(1, -1),
            cc.v2(1, 0),
            cc.v2(1, 1),
            cc.v2(0, 1),
            cc.v2(-1, 1),
            cc.v2(-1, 0),
            cc.v2(-1, -1),
          ],
          o = 0;
        o < n.length;
        o++
      ) {
        var r = n[o],
          a = r.x + i.x,
          s = r.y + i.y;
        if (a < 0 || s < 0 || a > G2.Board.boardWidth - 1 || s > G2.Board.boardHeight - 1)
          t.push(null);
        else {
          var c = 7 * s + a + 1,
            l = G2.BoardCells.get(c);
          t.push(l);
        }
      }
      return t;
    }),
    (e.GetBlankCell = function () {
      var e = [];
      return (
        G2.Board &&
          G2.Board.cells.forEach(function (t) {
            t.forEach(function (t) {
              t.data || t.isLock || e.push(t);
            });
          }),
        e
      );
    }),
    (e.GetAroundEmptyCellInFill = function (t, i) {
      void 0 === i && (i = !1);
      var n = e.GetAroundCells(t),
        o = [];
      !i || t.data || this.FilledStateCells.includes(t.serverIdx) || o.push(t);
      for (var r = 0; r < n.length; r++) {
        var a = n[r];
        a &&
          a.cellState != Q2.SNOW &&
          (a.data || this.FilledStateCells.includes(a.serverIdx) || o.push(a));
      }
      return o;
    }),
    (e.GetAroundEmptyCell = function (t, i) {
      void 0 === i && (i = !1);
      var n = e.GetAroundCells(t),
        o = [];
      return (
        i && !t.data && o.push(t),
        n.forEach(function (e, t) {
          e && e.cellState != Q2.SNOW && (e.data || o.push(e));
        }),
        o
      );
    }),
    (e.GetAroundAutoCreator = function (t) {
      var i = e.GetAroundCells(t),
        n = [];
      return (
        i.forEach(function (e, t) {
          e && e.data && e.data.elementType.includes(Z2.AUTO_CREATOR) && n.push(e);
        }),
        n
      );
    }),
    (e.UnlockAroundCells = function (e) {
      var t = this,
        i = this.GetCrossCells(e),
        n = [];
      return (
        i.forEach(function (e) {
          if (e && t.IsCellInState(e, mr.box)) {
            if (e.cellState == Q2.SNOW) return;
            var i = EM.instance.getCoverRewardConf(e),
              o = null;
            if (
              (i &&
                e.anims.forEach(function (e, t) {
                  o || ("CoverReward" != t && t.includes("Cover") && (o = t));
                }),
              t.RemoveCellState(e, mr.box),
              t.IsCellInState(e, mr.web))
            )
              e.cellState = Q2.LOCK;
            else if (t.IsCellInState(e, mr.none)) {
              ((e.cellState = Q2.STAND),
                (e.data = GW.ParseCellConfig(
                  {
                    id: e.data.config.id,
                    seed: e.data.seed.seed,
                    state: mr.none,
                    productType: vr.none,
                  },
                  e.serverIdx,
                )));
              var r = t.UnlockAroundCells(e);
              (n.push(e),
                r.forEach(function (e) {
                  n.push(e);
                }));
            }
            i
              ? (o && e3.AddCellAnim(e, o),
                EM.instance.collectCoverReward(e, i).then(function (i) {
                  i && (o && e3.RemoveCellAnim(e, o), t.coverDisappearAnim(e));
                }))
              : t.coverDisappearAnim(e);
          }
        }),
        n
      );
    }),
    (e.coverDisappearAnim = function (e, t) {
      var i = (void 0 === t ? this.GetBoardElementConfig(e) : t).split(":")[2];
      if (i) {
        var n = "CoverEnd" + i;
        return (
          G2.MergeBoardType == ar.arch
            ? (n += "_1")
            : G2.MergeBoardType == ar.coral1 && (n = "ClickCoral"),
          e3.AddCellAnim(e, n)
        );
      }
      return null;
    }),
    (e.RemoveCellState = function (e, t) {
      e && e.data && (e.data.elementLockStage &= ~t);
    }),
    (e.AddCellState = function (e, t) {
      e && e.data && (e.data.elementLockStage |= t);
    }),
    (e.IsCellAtState = function (e, t) {
      return !(!e || !e.data) && e.data.elementLockStage == t;
    }),
    (e.IsCellInState = function (e, t) {
      return (
        !(!e || !e.data) &&
        (t == mr.none ? e.data.elementLockStage == t : (e.data.elementLockStage & t) == t)
      );
    }),
    (e.CellIsOpen = function (t) {
      return (
        !(!t || !t.data) &&
        !e.IsCellInStateByState(t.data.remoteData.state, mr.web) &&
        !e.IsCellInStateByState(t.data.remoteData.state, mr.box)
      );
    }),
    (e.IsCellInStateByState = function (e, t) {
      return (e & t) == t;
    }),
    (e.IsElementCanSpeedUp = function (e) {
      if (!e) return !1;
      var t = config.Element.getById(e.elementId);
      return (
        !(e.order && e.order.orderId && !e.order.endTime) &&
        (!t || "Mirror" != t.series.split("_")[0]) &&
        !(
          2 != e.skills.get(Da.speedUp) ||
          (e.state & mr.web) == mr.web ||
          (e.state & mr.box) == mr.box ||
          e.bubbleEnd ||
          !(
            e.openEnd ||
            e.deteriorateEnd ||
            (e.order && e.order.endTime) ||
            (e.recovery.size > 0 && "Chest" != t.series.split("_")[0])
          )
        )
      );
    }),
    (e.IsElementCanSuperSpeedUp = function (e) {
      if (!(e && e.data && e.data.config && e.data.remoteData)) return !1;
      var t = config.Element.getById(e.data.config.id),
        i = e.data.remoteData;
      if (!t) return !1;
      if (i.order && i.order.orderId && !i.order.endTime) return !1;
      var n = config.Config.config.unusableWaterwheelGenerator.indexOf(e.data.config.id) >= 0;
      return (
        (!t || "Mirror" != t.series.split("_")[0]) &&
        !(
          n ||
          !i._superSpeedUpStartTime ||
          (i.state & mr.web) == mr.web ||
          (i.state & mr.box) == mr.box ||
          i.bubbleEnd ||
          !(
            i.openEnd ||
            i.deteriorateEnd ||
            (i.order && i.order.endTime) ||
            (i.recovery.size > 0 && "Chest" != t.series.split("_")[0])
          )
        )
      );
    }),
    (e.IsElementPropEffect = function (t, i) {
      var n,
        o = config.Element.getById(t),
        r = o.propEffect,
        a = ~~(o.propEffect / 100);
      if (!i.data) return { isShow: !1, isEffect: !1 };
      if (i.cellState == Q2.SNOW) return { isShow: !1, isEffect: !1 };
      var s = i.data.config ? ~~(i.data.config.propEffect / 100) : 0;
      if ((5 != a && i.cellState == Q2.LOCK) || i.cellState == Q2.COVER)
        return { isShow: !1, isEffect: !1 };
      if (5 != a && (this.IsCellInState(i, mr.web) || this.IsCellInState(i, mr.box)))
        return { isShow: !1, isEffect: !1 };
      if (i.data.elementType.includes(Z2.BUBBLE)) return { isShow: !1, isEffect: !1 };
      if (i.data.elementType.includes(Z2.STORE_ELEMENT)) {
        var c = null === (n = i.data.remoteData) || void 0 === n ? void 0 : n.storeBagCell,
          l = !!c && c.length > 0,
          d = !1;
        if (8 == a && l) {
          var u = MW.getSortedLaunchers(i)[0];
          d = MW.isStoreLauncherNeedSpeedUp(i, u);
        } else 2 == a && (d = l);
        return { isShow: d, isEffect: d };
      }
      if (9 != a && G2.BagCell && i.serverIdx == G2.BagCell.serverIdx)
        return { isShow: !0, isEffect: !1 };
      var h = config.Element.getById(i.data.config.id);
      if (i.data.config.id == t && o.mergeElementId > 0) return { isShow: !0, isEffect: !1 };
      if (2 == a)
        return (Wt.rechargeAutoCreator && i.data.elementType.includes(Z2.AUTO_CREATOR)) ||
          (h.canRecharge && h.canRecharge && i.data.elementType.includes(Z2.MANU_CREATOR))
          ? { isShow: !0, isEffect: !0 }
          : { isShow: !1, isEffect: !1 };
      if (13 == a)
        return 0 == wM.LampCount
          ? { isShow: !1, isEffect: !1 }
          : (Wt.rechargeAutoCreator && i.data.elementType.includes(Z2.AUTO_CREATOR)) ||
              (h.canRecharge && h.canRecharge && i.data.elementType.includes(Z2.MANU_CREATOR))
            ? { isShow: !0, isEffect: !0 }
            : { isShow: !1, isEffect: !1 };
      if (3 == a) {
        if (303 == r && i.data.config.id == t) return { isShow: !0, isEffect: !0 };
        if (1 == i.data.config.level || i.data.elementType.includes(Z2.PROP))
          return { isShow: !1, isEffect: !1 };
        var p = config.PropEffect.getById(o.propEffect);
        return (o.level < 3 && i.data.config.level <= p.effectParams && h.canSplit) ||
          (3 == o.level && h.canSplit)
          ? { isShow: !0, isEffect: !0 }
          : { isShow: !1, isEffect: !1 };
      }
      if (5 == a)
        return i.cellState != Q2.LOCK ? { isShow: !1, isEffect: !1 } : { isShow: !0, isEffect: !0 };
      if (7 == a || 19 == a) {
        if (6 == ~~(i.data.config.propEffect / 100)) {
          var f = i.data.remoteData.endTime;
          if (f && f > 0) return { isShow: !1, isEffect: !1 };
        } else if (i.data.config.series.startsWith("Chest")) {
          if (!b2.isElementNewUnlock(i.data.config.id) || e.IsCellAtState(i, mr.opened)) {
            var g = G2.GetCellRecovery(i.serverIdx, yr.manualProduct);
            if (g && g.value < g.valueMax) return { isShow: !1, isEffect: !1 };
          }
        } else if (i.data.config.series.startsWith("Order")) {
          var v = i.data.remoteData.order,
            m = i.data.remoteData.recovery.get(yr.manualProduct);
          if (v && (v.state != kr.prepare || v.elements.size > 0))
            return { isShow: !1, isEffect: !1 };
          if (m && m.value > 0) return { isShow: !1, isEffect: !1 };
        } else if (!b2.CheckElementValid(i.data.config.mergeElementId))
          return { isShow: !1, isEffect: !1 };
        if (o.id == i.data.config.id) return { isShow: !0, isEffect: !0 };
        if (705 == r) {
          return i.data.config.canLevelUp.includes(705)
            ? { isShow: !0, isEffect: !0 }
            : [71101, 71102, 71103, 83042].includes(i.data.config.id) ||
                i.data.config.series.startsWith("Order") ||
                !i.data.config.mergeElementId
              ? { isShow: !1, isEffect: !1 }
              : { isShow: !0, isEffect: !0 };
        }
        return i.data.config.canLevelUp.includes(r) && i.data.config.mergeElementId
          ? { isShow: !0, isEffect: !0 }
          : { isShow: !1, isEffect: !1 };
      }
      if (8 == a) {
        if (K6.checkIsPropClock(h.id)) {
          var y = ["Prop_10", "Prop_12"],
            _ = y.includes(o.series),
            b = y.includes(h.series);
          if ((!_ && b) || (_ && !b)) return { isShow: !1, isEffect: !1 };
        }
        return this.IsElementNeedSpeedUp(i) || s == a
          ? { isShow: !0, isEffect: !0 }
          : { isShow: !1, isEffect: !1 };
      }
      if (9 == a)
        return i.data.config.canLevelUp.includes(r)
          ? { isShow: !0, isEffect: !0 }
          : { isShow: !1, isEffect: !1 };
      if (15 == a) {
        var w = i.data.config.id,
          C = config.SplitProp.getById(w);
        return { isShow: !!C, isEffect: !!C };
      }
      return 17 == a
        ? h.series.startsWith("Chest") ||
          h.series.startsWith("Maigc") ||
          config.Config.config.cannotBattery.includes(h.id) ||
          i.data.remoteData.hp.size > 0
          ? { isShow: !1, isEffect: !1 }
          : i.data.elementType.includes(Z2.MANU_CREATOR)
            ? { isShow: !0, isEffect: !0 }
            : { isShow: !1, isEffect: !1 }
        : { isShow: !1, isEffect: !1 };
    }),
    (e.IsElementPropUse = function (e) {
      var t = ~~(config.Element.getById(e).propEffect / 100);
      return (
        2 == t ||
        3 == t ||
        5 == t ||
        7 == t ||
        8 == t ||
        9 == t ||
        13 == t ||
        15 == t ||
        17 == t ||
        19 == t
      );
    }),
    (e.IsPropStackable = function (e) {
      if (!this.IsElementPropUse(e)) return !1;
      var t = config.Element.getById(e).propEffect,
        i = config.PropEffect.getById(t);
      return !!i && i.maxStack > 0;
    }),
    (e.IsSameClockType = function (t, i) {
      return (
        !(!(null == t ? void 0 : t.data) || !(null == i ? void 0 : i.data)) &&
        !(!K6.checkIsPropClock(t.data.config.id) || !K6.checkIsPropClock(i.data.config.id)) &&
        e.MAIN_HOUR_GLASS.includes(t.data.config.series) ===
          e.MAIN_HOUR_GLASS.includes(i.data.config.series)
      );
    }),
    (e.CheckClockStackLimit = function (e, t) {
      var i, n;
      if (!(null == e ? void 0 : e.data) || !(null == t ? void 0 : t.data)) return !0;
      var o = config.PropEffect.getById(t.data.config.propEffect);
      if (!o || 8 !== o.effectType || o.maxStack <= 0) return !0;
      var r = 1e3 * o.maxStack,
        a = null !== (i = e.data.remoteData.endTime) && void 0 !== i ? i : 0,
        s = null !== (n = t.data.remoteData.endTime) && void 0 !== n ? n : 0;
      return a < r && s < r;
    }),
    (e.CanPropStack = function (e, t) {
      var i, n;
      if (!(null == e ? void 0 : e.data) || !(null == t ? void 0 : t.data)) return !1;
      if (e.pos.x === t.pos.x && e.pos.y === t.pos.y) return !1;
      if (!this.IsPropStackable(e.data.config.id)) return !1;
      if (!this.IsPropStackable(t.data.config.id)) return !1;
      if (
        !(K6.checkIsPropClock(e.data.config.id) && K6.checkIsPropClock(t.data.config.id)
          ? this.IsSameClockType(e, t)
          : e.data.config.id === t.data.config.id)
      )
        return !1;
      if (!(e.data.config.id === t.data.config.id)) return this.CheckClockStackLimit(e, t);
      var o = config.PropEffect.getById(t.data.config.propEffect);
      return (
        !o ||
        o.maxStack <= 0 ||
        (8 === o.effectType
          ? this.CheckClockStackLimit(e, t)
          : (null !== (i = e.data.remoteData.endTime) && void 0 !== i ? i : 0) +
              1 +
              ((null !== (n = t.data.remoteData.endTime) && void 0 !== n ? n : 0) + 1) <=
            o.maxStack)
      );
    }),
    (e.IsElementNeedSpeedUp = function (e) {
      if (!e || !e.data) return !1;
      if (e.data.config.unlockDuration > 0 && !this.IsCellInState(e, mr.opened))
        return e.data.remoteData.openEnd - E8.serverTime > 1e3;
      if (
        e.data.elementType.includes(Z2.ORDER) &&
        e.data.remoteData.order.endTime &&
        e.data.remoteData.order.state == kr.running
      )
        return e.data.remoteData.order.endTime - E8.serverTime > 1e3;
      var t,
        i = !1;
      if (e.data.elementType.includes(Z2.MANU_CREATOR))
        if ((t = e.data.remoteData.recovery.get(yr.manualProduct))) {
          if (this.CheckProductMax(e, !1)) return !1;
          var n = t.getLeftTime(e.data.config.elementStorage);
          i = t.value < e.data.config.elementStorage && n > 1e3;
        } else i = !1;
      if (!i && e.data.elementType.includes(Z2.AUTO_CREATOR))
        if ((t = e.data.remoteData.recovery.get(yr.autoProduct))) {
          if (this.CheckProductMax(e, !0)) return !1;
          n = t.getLeftTime(e.data.config.AutoStorage);
          i = t.value < e.data.config.AutoStorage && n > 1e3;
        } else i = !1;
      return !!i;
    }),
    (e.CheckProductMax = function (e, t, i) {
      return (
        void 0 === t && (t = !1),
        void 0 === i && (i = -1),
        !(!e || !e.data) &&
          this.CheckProductMaxByData(
            e.data.config.id,
            e.data.remoteData.productCount,
            e.data.remoteData.autoProductCount,
            t,
            i,
          )
      );
    }),
    (e.CheckProductMaxByData = function (e, t, i, n, o) {
      (void 0 === n && (n = !1), void 0 === o && (o = -1));
      var r = config.OneTimeStorage.getById(e);
      return (
        !!r &&
        (n ? (o > 0 ? o : i) >= r.autoOneTimeStorage : (o > 0 ? o : t) >= r.clickOneTimeStorage)
      );
    }),
    (e.GetAutoCDStorage = function (e) {
      var t, i;
      return Math.max(
        1,
        (null ===
          (i = null === (t = null == e ? void 0 : e.data) || void 0 === t ? void 0 : t.config) ||
        void 0 === i
          ? void 0
          : i.AutoCDStorage) || 1,
      );
    }),
    (e.GetElementSources = function (e, t) {
      void 0 === t && (t = !0);
      var i = config.Element.getById(e),
        n = [],
        o = "",
        r = E8.role.level >= config.DailyTradeConfig.config.unlockLevel;
      if ("Duanwu" == i.type)
        for (
          var a = function (t) {
              for (
                var i = config.DuanwuElement.list[t], o = !1, r = 0;
                r < i.elementIdList2.length;
                r++
              )
                if (i.elementIdList2[r] == e) {
                  ((o = !0), n.push(i.id));
                  break;
                }
              if (!o) {
                var a = !1;
                i.elementIdWeight2.forEach(function (t, o) {
                  a || (parseInt(o.split("_")[0]) == e && (n.push(i.id), (a = !0)));
                });
              }
            },
            s = 0;
          s < config.DuanwuElement.list.length;
          s++
        )
          a(s);
      if (n.length > 0) return n;
      G2.instance.elementCreatorList.forEach(function (e, a) {
        var s = !1,
          c = config.Element.getById(e);
        if (
          (!t || c.series != o) &&
          (!c.series.startsWith("Chest_Daily") || r) &&
          "Mirror" != c.series.split("_")[0]
        ) {
          if (
            (c.AutoId.forEach(function (t, r) {
              if (!s) {
                var a = parseInt(r);
                config.Element.getById(a).series == i.series &&
                  ((o = c.series), n.push(e), (s = !0));
              }
            }),
            !s)
          )
            for (var l = 0; l < c.AutoIdList.length; l++) {
              var d = c.AutoIdList[l];
              if ((u = config.Element.getById(d)).series == i.series) {
                ((o = c.series), n.push(e), (s = !0));
                break;
              }
            }
          if (!s)
            c.elementIdWeight.forEach(function (t, r) {
              if (!s) {
                var a = parseInt(r.split("_")[0]);
                config.Element.getById(a).series == i.series &&
                  ((o = c.series), n.push(e), (s = !0));
              }
            });
          if (
            (s ||
              c.elementIdWeightB.forEach(function (t, r) {
                if (!s) {
                  var a = parseInt(r.split("_")[0]);
                  config.Element.getById(a).series == i.series &&
                    ((o = c.series), n.push(e), (s = !0));
                }
              }),
            !s)
          )
            for (l = 0; l < c.elementIdList.length; l++) {
              var u,
                p = c.elementIdList[l];
              if ((u = config.Element.getById(p))) {
                if (u.series == i.series) {
                  ((o = c.series), n.push(e), (s = !0));
                  break;
                }
              } else h.Test.error(" ElementIdList not found, id:" + c.id + " mergeElementId:" + p);
            }
        }
      });
      for (
        var c = G2.instance.elementVanishList,
          l = function (e) {
            var o = c[e];
            if (n.includes(o)) return "continue";
            var r = config.Element.getById(o);
            if ("Mirror" == r.series.split("_")[0]) return "continue";
            var a = !1;
            if (t)
              for (var s = 0; s < n.length; s++) {
                if (config.Element.getById(n[s]).series == r.series) {
                  a = !0;
                  break;
                }
              }
            if (a) return "continue";
            for (
              var l = !1, d = [r.vanishChange, r.autoVanishChange, r.deterioratedChange], u = 0;
              u < d.length;
              u++
            ) {
              if (
                (d[u].forEach(function (e, t) {
                  if (!l) {
                    var o = config.Element.getById(parseInt(t));
                    o && o.series == i.series && (n.push(r.id), (l = !0));
                  }
                }),
                l)
              )
                break;
            }
          },
          d = 0;
        d < c.length;
        d++
      )
        l(d);
      return n;
    }),
    (e.GetElementProducts = function (e) {
      var t = [],
        i = config.Element.getById(e),
        n = i.specialComeTo,
        o = i.AutoIdList,
        r = i.elementIdWeight,
        a = i.elementIdList;
      if (n && n.length)
        return (
          n.forEach(function (e, i) {
            var n = e;
            t.push(n);
          }),
          t
        );
      if ("Duanwu" == i.type) {
        var s = null;
        (E8.role.zongzi.forEach(function (e, t) {
          s || (e && e.group && (s = e));
        }),
          config.DuanwuElement.getById(i.id) &&
            s &&
            ((r =
              1 == s.group
                ? i.elementIdWeight
                : config.DuanwuElement.getById(i.id).elementIdWeight2),
            (a =
              1 == s.group ? i.elementIdList : config.DuanwuElement.getById(i.id).elementIdList2)));
      }
      return (
        i.AutoId.forEach(function (e, i) {
          t.push(parseInt(i));
        }),
        r.forEach(function (e, i) {
          var n = parseInt(i.split("_")[0]);
          t.push(n);
        }),
        i.elementIdWeightB.forEach(function (e, i) {
          var n = parseInt(i.split("_")[0]);
          t.push(n);
        }),
        0 == t.length &&
          o.forEach(function (e, i) {
            var n = e;
            t.push(n);
          }),
        0 == t.length &&
          a.forEach(function (e, i) {
            var n = e;
            t.push(n);
          }),
        "Dream" == i.series.split("_")[0] &&
          (i.vanishChange.forEach(function (e, i) {
            t.push(parseInt(i));
          }),
          i.autoVanishChange.forEach(function (e, i) {
            t.push(parseInt(i));
          })),
        t
      );
    }),
    (e.GetCellHp = function (e, t) {
      var i = e.data ? e.data.remoteData : null,
        n = i ? i.hp : null;
      return n && n.has(t) ? n.get(t) : -1;
    }),
    (e.WillCellHpDispose = function (e, t, i) {
      var n = this.GetCellHp(e, t);
      return -1 != n && ((n > 0 && n - i <= 0) || void 0);
    }),
    (e.DecreaseCellHp = function (e, t, i) {
      var n = this.GetCellHp(e, t);
      return (
        -1 == n ||
        (!(n < i) &&
          (!(n > 0 && ((n -= i), e.data.remoteData.hp.set(t, n), n <= 0)) || ((e.data = null), !1)))
      );
    }),
    (e.FreezeCell = function (e, t) {
      (void 0 === t && (t = !0), e && e.data && (e.data.freeze = t));
    }),
    (e.MoveLockCell = function (e, t) {
      (void 0 === t && (t = !0), e && e.data && (e.data.cannotMove = t));
    }),
    (e.PauseCell = function (e) {
      null != e &&
        (e.recovery &&
          e.recovery.size &&
          e.recovery.forEach(function (e) {
            var t = e;
            (t.pause(), t.stop());
          }),
        (e.pauseTime = E8.serverTime),
        e._speedUpStartTime && (e._speedUpStartTime = E8.serverTime),
        e.order &&
          e.order.orderId > 0 &&
          e.order.endTime > 0 &&
          (e.order.pauseTime = E8.serverTime));
    }),
    (e.ResumeCell = function (t) {
      if (t && t.pauseTime) {
        t.recovery &&
          t.recovery.size &&
          t.recovery.forEach(function (e) {
            var t = e;
            (t.isRunning || (h.warn("resume:recovery start", t.id), t.start()),
              t.pauseTime > 0 && (h.warn("resume:recovery resume", t.id), t.resume()));
          });
        var i = E8.serverTime - t.pauseTime;
        i <= 0 ? h.error("pausetime is not positive", t.index, i) : e.TimeSkipCell(t, -i);
      }
    }),
    (e.TimeSkipCell = function (t, i, n, o) {
      var r;
      if ((void 0 === i && (i = 0), t && i && !t.endTime && !e.IsElementDontSkipTime(t))) {
        (t.pauseTime && t._speedUpStartTime && (t._speedUpStartTime -= i), (t.pauseTime = 0));
        var a = n || e.GetCellByIndex(t.index);
        if (
          (null === (r = null == a ? void 0 : a.data) || void 0 === r ? void 0 : r.config) ||
          o ||
          config.Element.getById(t.elementId)
        ) {
          if (((null == a ? void 0 : a.data) && (a.data.timeSkipSign = !0), t.openEnd)) {
            if (((t.openEnd -= i), a && t.recovery.get(yr.autoProduct))) {
              var s = e.GetCellLogic(a, E$);
              s && s.autoCreate(a);
            }
            h.warn(
              "skiptime: openEnd",
              t.client_uuid,
              "time:" + t.openEnd,
              "left:" + (t.openEnd - E8.serverTime),
            );
          }
          if (
            (i > 0 &&
              t.recovery.forEach(function (n) {
                var o = n;
                if (o.startTime > 0)
                  if (o.superSpeedUpEndTime) {
                    var r = E8.serverTime;
                    o.superSpeedUpStartTime = r;
                    var s =
                      ((o.type == yr.autoProduct
                        ? e.GetAutoCDStorage(a)
                        : a.data.config.elementCDStorage) *
                        (o.interval / o.intervalValue) *
                        1e3) /
                      3e5;
                    o.startTime -= i * s;
                  } else {
                    if (o.speedUpStartTime && o.speedUpScale) {
                      r = E8.serverTime;
                      t.deteriorateEnd && t.deteriorateEnd < r && (r = t.deteriorateEnd);
                      var c = r - o.speedUpStartTime;
                      ((o.startTime -= c * (o.speedUpScale - 1)), (o.speedUpStartTime = r));
                    }
                    o.startTime -= i;
                  }
              }),
            t.deteriorateEnd &&
              ((t.deteriorateEnd -= i),
              h.warn(
                "skiptime: deteriorateEnd",
                t.client_uuid,
                "time:" + t.deteriorateEnd,
                "left:" + (t.deteriorateEnd - E8.serverTime),
              )),
            t.order.id &&
              t.order.endTime &&
              ((t.order.pauseTime = 0),
              (t.order.endTime -= i),
              h.warn(
                "skiptime: orderEnd",
                t.client_uuid,
                "time:" + t.order.endTime,
                "left:" + (t.order.endTime - E8.serverTime),
              )),
            t.endTime &&
              ((t.endTime -= i),
              h.warn(
                "skiptime: endTime",
                t.client_uuid,
                "time:" + t.endTime,
                "left:" + (t.endTime - E8.serverTime),
              )),
            a)
          ) {
            var c = e.GetCellLogic(a, E$);
            c && c.updateRecover(a);
            var l = e.GetCellLogic(a, DW);
            l && l.updateRecover(a);
          }
          i > 0 &&
            t.recovery.forEach(function (e) {
              var t = e;
              (t.speedUpStartTime && t.speedUpScale && (t.speedUpStartTime = E8.serverTime),
                t.superSpeedUpStartTime && (t.superSpeedUpStartTime = E8.serverTime),
                t.check(!0));
            });
          var d = a ? e.GetCellLogic(a, x$) : null;
          if ((d && d.updateRecover(a), a)) {
            if (
              (a.callLogic(RA.TIME_CHANGE), u.dispatch("updateElementInfo", a.serverIdx), !a.data)
            )
              return;
            ((a.data.timeSkipSign = !1), a.subPush(!0, !0));
          }
        }
      }
    }),
    (e.PlayElementSelectSound = function (e) {
      var t = config.Element.getById(e);
      t &&
        t.sound &&
        (this.preSelectSound && j8.stop(this.preSelectSound),
        (this.preSelectSound = "mergeSelectElement" + t.sound),
        j8.playByConf("mergeSelectElement" + t.sound));
    }),
    (e.PlayOrderCompleteSound = function (e) {
      var t = config.Element.getById(e);
      if (t && t.elementOrderId) {
        var i = config.ElementOrder.getById(t.elementOrderId);
        i && i.finishedSound && j8.playByConf("mergeComplete" + i.finishedSound);
      }
    }),
    (e.IsElementDontSkipTime = function (e) {
      return config.Config.config.elementCannotSpeedUp.indexOf(e.elementId) >= 0;
    }),
    (e.isOrderElementCreator = function (e) {
      return (
        (e < 0 && this.isOrderElementCorrect(e, y2.health)) ||
        this.isOrderElementCorrect(e, y2.ago) ||
        this.isOrderElementCorrect(e, y2.monster) ||
        this.isOrderElementCorrect(e, y2.group)
      );
    }),
    (e.isOrderElementPart3 = function (e) {
      return e < 0 && this.isOrderElementCorrect(e, y2.group);
    }),
    (e.isOrderElementOneToN = function (e) {
      var t = b2.getOrderPoolNeedSize(e);
      return !!t && ((!t.partElement1 && t.partElement2) || (!t.partElement2 && t.partElement1));
    }),
    (e.isOrderElementCorrect = function (e, t) {
      var i = b2.getOrderPoolNeedSize(e);
      return !!i && i.logicType == t;
    }),
    (e.getOrderElementConf = function (e, t) {
      for (var i = config.ElementMultiOrderPool.list, n = i.length - 1; n >= 0; --n) {
        var o = i[n];
        if (o.partElement1 == e && o.orderElement == t) return o;
      }
      return null;
    }),
    (e.parseGetResConf = function (e) {
      var t = this,
        i = e.data.config,
        n = [],
        o = [];
      return (
        i.getResource.size > 0 &&
          i.getResource.forEach(function (i, r) {
            var a = i.split(","),
              s = K6.ParseItemConf(r),
              c = 1;
            if (a.length > 1) {
              var l = parseInt(a[0]),
                d = parseInt(a[1]);
              ((t.getResRandomSeed.seed = e.data.remoteData.seed),
                (c = t.getResRandomSeed.randomInt(l, d)),
                (s.value = c),
                o.push(s));
            } else ((c = parseInt(a[0])), (s.value = c), n.push(s));
          }),
        { items: n, randomItem: o }
      );
    }),
    (e.stopMoveElementToOrderElement = function (e) {
      (null == e ? void 0 : e.data) &&
        this.OrderElementUuid == e.data.clientUuid &&
        ((this.OrderElementUuid = -1),
        this.OrderElementNeedCells.forEach(function (e) {
          if (null == e ? void 0 : e.mergeCellRender) {
            var t = e.mergeCellRender.node;
            (t.stopAllActions(),
              t.setPosition(t.parent.convertToNodeSpaceAR(e.worldPos)),
              e.anims.forEach(function (t) {
                (null == t ? void 0 : t.parent) &&
                  (t.stopAllActions(), t.setPosition(t.parent.convertToNodeSpaceAR(e.worldPos)));
              }));
          }
        }),
        (this.OrderElementNeedCells = []));
    }),
    (e.moevElementToOrderElement = function (e, t) {
      var i, n;
      return r(this, void 0, void 0, function () {
        var o, r, s;
        return a(this, function (a) {
          switch (a.label) {
            case 0:
              return (
                (o = t.data.clientUuid),
                (this.OrderElementUuid = o),
                (this.OrderElementNeedCells = Array.from(e)),
                this.OrderElmentAniming ? [2] : [4, S(100)]
              );
            case 1:
              (a.sent(), (a.label = 2));
            case 2:
              return (null ===
                (n = null === (i = G2.instance.focusElement) || void 0 === i ? void 0 : i.data) ||
              void 0 === n
                ? void 0
                : n.clientUuid) != this.OrderElementUuid
                ? [3, 4]
                : ((this.OrderElmentAniming = !0),
                  (r = Array.from(this.OrderElementNeedCells)),
                  (s = G2.instance.focusElement.worldPos),
                  this.moveElementsTowardsTarget(r, s, this.OrderElementUuid),
                  [4, S(1500)]);
            case 3:
              return (a.sent(), [3, 2]);
            case 4:
              return ((this.OrderElmentAniming = !1), [2]);
          }
        });
      });
    }),
    (e.moveElementsTowardsTarget = function (e, t, i) {
      var n, o;
      if (!e || !t) return !1;
      for (
        var r = !1,
          a = function (a, s) {
            var c = e[a];
            if (
              !(null == c ? void 0 : c.data) ||
              !(null === (o = null === (n = c.mergeCellRender) || void 0 === n ? void 0 : n.node) ||
              void 0 === o
                ? void 0
                : o.parent)
            )
              return "continue";
            if (c.cellState == Q2.MOVING || c.cellState == Q2.RESET) return "continue";
            if (!c.isElementAtCenter() || (null != i && c.data.clientUuid == i)) return "continue";
            var l = c.worldPos,
              d = t.x - l.x,
              u = t.y - l.y,
              h = Math.sqrt(d * d + u * u);
            if (h <= 0) return "continue";
            var p = cc.v2(l.x + (d / h) * 20, l.y + (u / h) * 20),
              f = c.mergeCellRender.node,
              g = f.position.clone(),
              v = f.parent.convertToNodeSpaceAR(p);
            (cc.tween(f).to(0.5, { x: v.x, y: v.y }).to(0.5, { x: g.x, y: g.y }).start(),
              c.anims.forEach(function (e) {
                if ((null == e ? void 0 : e.parent) && -1 == e.name.indexOf(TC.SELECTED_NOT)) {
                  var t = e.position.clone(),
                    i = e.parent.convertToNodeSpaceAR(p);
                  cc.tween(e).to(0.5, { x: i.x, y: i.y }).to(0.5, { x: t.x, y: t.y }).start();
                }
              }),
              (r = !0));
          },
          s = 0,
          c = e.length;
        s < c;
        s++
      )
        a(s);
      return r;
    }),
    (e.getElementByLv = function (e, t) {
      if (!config.Element.getById(e)) return e;
      var i = e;
      if (t > 0)
        for (; t > 0;) {
          if (!(n = config.Element.getById(i)).mergeElementId) return i;
          ((i = n.mergeElementId), t--);
        }
      else
        for (; t < 0;) {
          var n,
            o = (n = config.Element.getById(i)).series.split("_")[0];
          (config.Element.sheetMap.get(o).forEach(function (e, t) {
            e.mergeElementId == i && b2.CheckElementValid(e.id) && (i = e.id);
          }),
            t++);
        }
      return i;
    }),
    (e.changeElementToAnother = function (t, i) {
      for (
        var n = b2.GetBoardElementByCondition(1, function (e) {
            return e.elementId == t;
          }),
          o = 0;
        o < n.length;
        ++o
      ) {
        var r = n[o],
          a = e.GetCellByIndex(r);
        a &&
          (a.data = GW.ParseCellConfig(
            { id: i, seed: a.data.seed.seed, state: mr.none, productType: vr.none },
            a.serverIdx,
          ));
      }
    }),
    (e.changeMonsterHp = function (t) {
      for (
        var i = b2.GetBoardElementByCondition(1, function (e) {
            return e.elementId == t;
          }),
          n = 0;
        n < i.length;
        ++n
      ) {
        var o = i[n],
          r = e.GetCellByIndex(o);
        r && r.mergeCellRender.showMonsterHp();
      }
    }),
    (e.getELementUnlockDuration = function (e, t) {
      var i = kA.changeElementData(e);
      return i && i.unlockDurationAct ? i.unlockDurationAct : t;
    }),
    (e.getELementUnlockCost = function (e, t) {
      var i = kA.changeElementData(e);
      return i && i.unlockCostDiamondAct ? i.unlockCostDiamondAct : t;
    }),
    (e.getBoardMiddlePos = function () {
      return cc.v2(3, 4);
    }),
    (e.isStartedExtraProduct = !1),
    (e.forceCloseExtraProduct = !1),
    (e.FilledStateCells = null),
    (e.MAIN_HOUR_GLASS = ["Prop_10", "Prop_12"]),
    (e.preSelectSound = ""),
    (e.getResRandomSeed = new oC(0)),
    (e.OrderElmentAniming = !1),
    (e.OrderElementUuid = -1),
    (e.OrderElementNeedCells = []),
    e
  );
})();
