// Original shared-closure declaration b2: OrderState
// Source UTF-16 offsets 3658789..3705036; complete context in game.formatted.js:177771.
// Analysis fragment; not independently executable.

var b2 = (function () {
  function e() {}
  return (
    (e.GetDailyTaskDemand = function () {
      var e,
        t = [],
        i = null === (e = null == E8 ? void 0 : E8.role) || void 0 === e ? void 0 : e.dailyTrades;
      return (
        i &&
          i.tasks.forEach(function (e, i) {
            var n = config.DailyTradeTask.getById(e.id);
            (n && e.completeCount >= n.taskNum) || t.push(e.demand.itemId);
          }),
        t
      );
    }),
    (e.GetElementBoardType = function (e) {
      var t = config.Element.getById(e);
      return t ? config.BoardType.config[t.type.toLowerCase()] : G2.MergeBoardType;
    }),
    (e.GetEventData = function (e) {
      void 0 === e && (e = ar.main);
      var t = "Number",
        i = 0;
      e != ar.main &&
        (e == ar.number
          ? (i = er.number)
          : e == ar.beach
            ? (i = er.beach)
            : e == ar.ornament && (i = er.ornament));
      var n = null;
      E8.role.activity.boards.forEach(function (t, o) {
        n || (e != ar.main ? t.activityType == i && (n = t) : t.boardId && !t.rewarded && (n = t));
      });
      var o = n ? config.Activity.getById(n.activityType) : null;
      return o && K6.CheckUnlock(o.finish)
        ? { eventData: null, type: null }
        : (n
            ? n.activityType == er.number
              ? (t = "Number")
              : n.activityType == er.beach
                ? (t = "Beach")
                : n.activityType == er.ornament && (t = "Ornament")
            : (t = "Null"),
          { eventData: n, type: t });
    }),
    (e.GetEventConfig = function (e, t) {
      return "Number" == e || e == er.number
        ? config.ActivityLevelNumber.getById(t)
        : "Beach" == e || e == er.beach
          ? config.ActivityLevelBeach.getById(t)
          : "Ornament" == e || e == er.ornament
            ? config.ActivityLevelOrnament.getById(t)
            : void 0;
    }),
    (e.GetEventConfigList = function (e) {
      return "Number" == e || e == er.number
        ? config.ActivityLevelNumber.list
        : "Beach" == e || e == er.beach
          ? config.ActivityLevelBeach.list
          : "Ornament" == e || e == er.ornament
            ? config.ActivityLevelOrnament.list
            : void 0;
    }),
    (e.GetEventActive = function (t) {
      if ((void 0 === t && (t = ar.main), t == ar.main)) return !0;
      var i = e.GetEventData(t);
      return !i.eventData || !(i.eventData.endTime - E8.serverTime <= 0);
    }),
    (e.GetBoardByType = function (e) {
      var t = null;
      return (
        E8.role.boards.forEach(function (i, n) {
          t || (i.type == e && (t = i));
        }),
        t
      );
    }),
    (e.GetOrderProgress = function (e, t) {
      if (!t) return { cur: 0, all: 0 };
      if (G$.isOrderElementPart3(e)) {
        if (!(o = t.elements)) return { cur: 0, all: 0 };
        var i = 0,
          n = 0;
        return (
          o.forEach(function (e, t) {
            i += e;
          }),
          this.getOrderPoolNeedSize(e).partElement3.forEach(function (e, t) {
            n += e;
          }),
          { cur: i, all: n }
        );
      }
      var o;
      if (e < 0) return { cur: (o = t.elements ? t.elements.size : 0), all: 2 };
      if (!t.id || !t.orderId) return { cur: 0, all: 0 };
      var r = t.orderId,
        a = config.ElementOrderPool.getById(r),
        s = 0,
        c = 0;
      return (
        a.demand.forEach(function (e, i) {
          var n = parseInt(i);
          s += e;
          var o = t.elements.get(n);
          (!o && (o = 0), (c += o));
        }),
        { cur: c, all: s }
      );
    }),
    (e.isMultiOrder = function (e) {
      return !!config.ElementOrderProgress.getById(e);
    }),
    (e.getMultiOrderProgress = function (e) {
      var t = config.ElementOrderProgress.getById(e);
      return t ? { cur: t.group.indexOf(e), all: t.group.length } : { cur: 0, all: 0 };
    }),
    (e.getEleBelongPart3Group = function (e) {
      var t = this.Part3GroupCache.get(e);
      return t ? t.seriesId : "";
    }),
    Object.defineProperty(e, "Part3GroupCache", {
      get: function () {
        if (this.part3GroupCache && this.part3GroupCache.size) return this.part3GroupCache;
        for (var e = config.ElementMultiOrderSeries.list, t = 0; t < e.length; ++t)
          for (var i = e[t], n = 0; n < i.elementId.length; ++n) {
            var o = i.elementId[n];
            this.part3GroupCache.set(o, i);
          }
        return this.part3GroupCache;
      },
      enumerable: !1,
      configurable: !0,
    }),
    (e.checkElementBelongPart3Group = function (e) {
      var t = this.Part3GroupCache.get(e);
      return t ? t.orderElementMark : "";
    }),
    (e.getPart3OrderIcon = function (e) {
      var t = this.getOrderPoolNeedSize(e);
      if (!t || !t.partElement3 || !t.partElement3.size) return "";
      var i = t.partElement3,
        n = "";
      return (
        i.forEach(function (e, t) {
          var i = config.ElementMultiOrderSeries.getBySeriesId(t);
          i && (n = i.orderElementMark);
        }),
        n
      );
    }),
    (e.getGroupHave = function (e) {
      var t = config.ElementMultiOrderSeries.getBySeriesId(e);
      return t ? t.elementId : [];
    }),
    (e.getElePart3Creator = function (e) {
      for (var t = config.ElementMultiOrderPool.list, i = [], n = 0; n < t.length; ++n) {
        var o = t[n];
        o.orderElement == e && o.partElement3 && i.push(o);
      }
      return i;
    }),
    (e.getPart3Orders = function (e, t) {
      var i = this,
        n = [],
        o = this.getElePart3Creator(t);
      if (!o || !o.length) return n;
      var r = new Map();
      e.forEach(function (e, t) {
        var n = i.getEleBelongPart3Group(t),
          o = r.has(n) ? r.get(n) : 0;
        ((o += e), r.set(n, o));
      });
      for (
        var a = function (e) {
            var t = o[e].partElement3,
              a = !1;
            (r.forEach(function (e, i) {
              (t.has(i) || (a = !0), e > t.get(i) && (a = !0));
            }),
              a ||
                t.forEach(function (e, t) {
                  if (e > (r.has(t) ? r.get(t) : 0))
                    for (var o = i.getGroupHave(t), a = 0; a < o.length; ++a) {
                      var s = o[a];
                      n.includes(s) || n.push(s);
                    }
                }));
          },
          s = 0;
        s < o.length;
        ++s
      )
        a(s);
      return n;
    }),
    (e.checkPart3Done = function (e, t) {
      var i = this,
        n = this.getElePart3Creator(t);
      if (!n || !n.length || !e) return 0;
      var o = new Map();
      e.forEach(function (e, t) {
        var n = i.getEleBelongPart3Group(t),
          r = o.has(n) ? o.get(n) : 0;
        ((r += e), o.set(n, r));
      });
      for (
        var r = function (e) {
            var t = n[e].id,
              i = n[e].partElement3,
              r = !0;
            if (
              (i.forEach(function (e, t) {
                var i = o.get(t);
                (i && i == e) || (r = !1);
              }),
              r)
            )
              return { value: t };
          },
          a = 0;
        a < n.length;
        ++a
      ) {
        var s = r(a);
        if ("object" == typeof s) return s.value;
      }
      return 0;
    }),
    (e.IsNeedOrderElement = function (t, i, n) {
      var o = this;
      void 0 === n && (n = 0);
      var r = i.order,
        a = config.Element.getById(i.elementId),
        s = i.recovery.get(yr.manualProduct);
      if (a.elementOrderId < 0) {
        if (s && s.value) return !1;
        if (r.endTime) return !1;
        var c = G$.isOrderElementPart3(a.elementOrderId);
        if (r.elements && r.elements.size >= 2 && !c) return !1;
        if (!e.OrderElementCheck(t, i.elementId)) return !1;
        var l = new Map();
        if (r.elements && 0 != r.elements.size)
          if (c)
            for (var d = this.getPart3Orders(r.elements, i.elementId), u = 0; u < d.length; ++u)
              l.set(d[u], 1);
          else {
            var h = 0;
            r.elements.forEach(function (e, t) {
              ((h = t),
                config.ElementMultiOrderPool.list.forEach(function (e) {
                  e.orderElement == i.elementId &&
                    (e.partElement1 == h
                      ? l.set(e.partElement2, e.id)
                      : e.partElement2 == h && l.set(e.partElement1, e.id));
                }));
            });
          }
        else
          config.ElementMultiOrderPool.list.forEach(function (e) {
            e.orderElement == i.elementId &&
              (e.partElement1 && l.set(e.partElement1, e.id),
              e.partElement2 && l.set(e.partElement2, e.id),
              e.partElement3 &&
                e.partElement3.forEach(function (t, i) {
                  for (var n = o.getGroupHave(i), r = 0; r < n.length; ++r) {
                    var a = n[r];
                    l.set(a, e.id);
                  }
                }));
          });
        var p = l.get(t);
        if (p && n) {
          var f = G$.isOrderElementPart3(a.elementOrderId);
          i.order.elements || (i.order.elements = new Map());
          var g = i.order.elements.has(n) ? i.order.elements.get(n) : 0;
          if ((i.order.elements.set(n, g + 1), f)) {
            var v = this.checkPart3Done(i.order.elements, i.elementId);
            v && v > 0 && ((i.order.id = v), (i.order.orderId = v));
          } else if (i.order.elements.size >= 2) ((i.order.id = p), (i.order.orderId = p));
          else if (
            i.order.elements.size >= 1 &&
            (!G$.isOrderElementCreator(a.elementOrderId) ||
              G$.isOrderElementOneToN(a.elementOrderId))
          ) {
            ((i.order.id = p), (i.order.orderId = p));
            var m = G2.Data.buff,
              y = this.getOrderPoolNeedSize(a.elementOrderId);
            !m.has(t) && y.onlyOnce && m.set(t, -1);
          }
        }
        return !!p;
      }
      if (!r || (!s && !a.ordercompleteChange) || !r.orderId) return !1;
      if (r.state != kr.prepare || (s && s.value > 0)) return !1;
      var _ = config.ElementOrderPool.getById(r.orderId),
        b = !1;
      return (
        _.demand.forEach(function (e, i) {
          if (!b) {
            var o = parseInt(i);
            if (n > 0 && n == o) {
              var a = r.elements.get(t);
              a ? r.elements.set(t, a + 1) : r.elements.set(t, 1);
            }
            var s = e,
              c = r.elements.get(t);
            (!c && (c = 0), s - c > 0 && t == o && (b = !0));
          }
        }),
        b
      );
    }),
    (e.IsNeedOrderFinish = function (e) {
      var t = e.order,
        i = config.Element.getById(e.elementId);
      if (G$.isOrderElementCreator(i.elementOrderId)) {
        var n = this.getOrderPoolNeedSize(i.elementOrderId),
          o = 0;
        return (
          n.partElement1 && o++,
          n.partElement2 && o++,
          t.elements ? (t.elements.size >= o ? -1 : 1) : 0
        );
      }
      if (G$.isOrderElementPart3(i.elementOrderId))
        return this.checkPart3Done(t.elements, e.elementId) > 0 ? -1 : 0;
      if (i.elementOrderId < 0) {
        if (!t.elements) return 0;
        if (t.elements.size >= 1) return -1;
      }
      if (!t || !t.orderId) return 0;
      var r = config.ElementOrderPool.getById(t.orderId),
        a = 0;
      return (
        r.demand.forEach(function (e, i) {
          var n = parseInt(i),
            o = e,
            r = t.elements.get(n);
          (!r && (r = 0), r >= o && a++);
        }),
        a >= r.demand.size ? -1 : a
      );
    }),
    (e.getOrderPoolNeedSize = function (e) {
      if (this.orderPoolNeedSize.has(e)) return this.orderPoolNeedSize.get(e);
      for (var t = config.ElementMultiOrderPool.list, i = 0; i < t.length; ++i) {
        var n = t[i];
        if (n.elementOrderId == e) return (this.orderPoolNeedSize.set(e, n), n);
      }
    }),
    (e.getOrderPoolProduct = function (e) {
      if (this.orderPoolProduct.has(e)) return this.orderPoolProduct.get(e);
      for (var t = config.ElementMultiOrderPool.list, i = [], n = 0; n < t.length; ++n) {
        var o = t[n];
        if (o.elementOrderId == e)
          o.elementIdWeight.forEach(function (e, t) {
            var n = parseInt(t.split("_")[0]);
            i.includes(n) || i.push(n);
          });
      }
      return (this.orderPoolProduct.set(e, i), i);
    }),
    (e.getAllOrderNeed = function (e) {
      if (this.orderPoolNeed.has(e)) return this.orderPoolNeed.get(e);
      for (var t = config.ElementMultiOrderPool.list, i = [], n = 0; n < t.length; ++n) {
        var o = t[n];
        o.elementOrderId == e &&
          (o.partElement1 && i.push(o.partElement1), o.partElement2 && i.push(o.partElement2));
      }
      return (this.orderPoolNeed.set(e, i), i);
    }),
    (e.UpdateOrderState = function (e) {
      var t, n, o, r, a, s, c, l, u;
      if (e && e.data && e.data.remoteData.order) {
        var h = e.data.remoteData.order,
          p = e.data.config,
          f = null;
        if (p.elementOrderId < 0 && !G$.isOrderElementCreator(p.elementOrderId)) {
          if (h.elements && h.elements.size >= 1) {
            var g = h.elements.keys().next().value;
            f = G$.getOrderElementConf(g, p.id);
          }
        } else if (p.elementOrderId < 0) f = config.ElementMultiOrderPool.getById(h.orderId);
        else {
          var v = config.ElementOrderPool.getById(h.orderId);
          f = config.ElementOrder.getById(v.elementOrderId);
        }
        if (f) {
          (h.state == kr.prepare && (h.state = kr.prepared),
            h.state == kr.prepared &&
              (f.duration > 0
                ? 0 == h.endTime &&
                  ((h.state = kr.running),
                  (h.endTime = E8.serverTime + 1e3 * f.duration),
                  e.data.remoteData.skills.get(Da.speedUp) &&
                    (e.data.remoteData._speedUpStartTime = E8.serverTime))
                : (h.state = kr.complete)),
            h.state == kr.running &&
              E8.serverTime >= h.endTime &&
              ((h.state = kr.complete), G$.PlayOrderCompleteSound(e.data.config.id)));
          var m;
          if (h.state == kr.complete) {
            var y = p.ordercompleteChange,
              _ = f.orderCompleteChange,
              b =
                (m = U2.getDuanwuStage()) != F2.NONE && m != F2.PRESHOW ? U2.getDuanwu().group : 0;
            if (
              (y && 2 == b
                ? (y = config.DuanwuElement.getById(p.id).ordercompleteChange2)
                : _ && (y = _),
              y > 0)
            ) {
              (DC.CheckHasExtra(e) && DC.checkActPlusEnergyForce(e.worldPos),
                X8.CheckHasExtra(e) && X8.checkActPlusEnergyForce(e.worldPos),
                (null === (t = m2.instance) || void 0 === t ? void 0 : t.CheckHasExtra(e)) &&
                  (null === (n = m2.instance) ||
                    void 0 === n ||
                    n.checkActPlusEnergyForce(e.worldPos)),
                (null === (o = dI.instance) || void 0 === o ? void 0 : o.CheckHasExtra(e)) &&
                  (null === (r = dI.instance) ||
                    void 0 === r ||
                    r.checkAct8EnergyForce(e.worldPos)),
                qG.CheckHasExtra(e) && qG.checkEnergyForce(e.worldPos, qG.CheckHasExtra(e)),
                hx.instance.collectCellAllExtraRes(e, !0, e.worldPos));
              var w = new Map();
              (w.set(
                fr.extraCell,
                null !==
                  (l =
                    null ===
                      (c =
                        null ===
                          (s = null === (a = e.data) || void 0 === a ? void 0 : a.remoteData) ||
                        void 0 === s
                          ? void 0
                          : s.extra) || void 0 === c
                      ? void 0
                      : c.get(fr.extraCell)) && void 0 !== l
                  ? l
                  : "",
              ),
                (e.data = GW.ParseCellConfig(
                  { id: y, seed: e.data.seed.seed, state: mr.none, productType: vr.none, extra: w },
                  e.serverIdx,
                )));
              var C = null === (u = e.data.config) || void 0 === u ? void 0 : u.getSound;
              (C && j8.playByConf("mergeGet_" + C), M$.onMergeExtraProduct(e, !0));
            } else {
              var I = G2.GetCellRecovery(e.serverIdx, yr.manualProduct),
                S = G2.GetCellRecovery(e.serverIdx, yr.autoProduct);
              (f.addAutoElementStorage &&
                S &&
                (S.increase(f.addAutoElementStorage), (S.startTime = E8.serverTime), (S.state = 0)),
                f.addElementStorage &&
                  I &&
                  ((p.elementOrderId < 0 && I.value >= p.elementMaxStorage) ||
                    (I.increase(f.addElementStorage),
                    (I.startTime = E8.serverTime),
                    (I.state = 0))),
                p.elementOrderId >= 0 && (e.data.remoteData.order = new Zc()));
            }
          }
          d.emit(i.OnBoardOrderElementStateChange, {
            cell: e,
            state: null == h ? void 0 : h.state,
          });
        }
      }
    }),
    (e.CheckWaitList = function () {
      if (this.waitCreateList.length)
        for (; this.waitCreateList.length;) {
          var e = G$.GetCellByIndex(this.waitCreateList.pop());
          e.data && e.callLogic(RA.AROUND_EMPTY, e);
        }
    }),
    (e.ParseElementsConf = function (e) {
      var t = [];
      return (
        e.forEach(function (e, i) {
          t.push({ item: parseInt(i), weight: e });
        }),
        t
      );
    }),
    (e.GetBoardHaveSeries = function (e, t, i) {
      (void 0 === t && (t = 0), void 0 === i && (i = !1));
      var n = [],
        o = G2.BoardCells;
      if (!o) return [];
      var r = !1;
      return (
        o.forEach(function (a, s) {
          if (!r) {
            var c = o.get(s),
              l = config.Element.getById(c.elementId);
            if (l && l.series == e && 0 == c.bubbleEnd && c.state == mr.none) {
              if (i && 0 == l.AutoId.size && 0 == l.elementIdWeight.size) return;
              (n.push(s), t && n.length >= t && (r = !0));
            }
          }
        }),
        n
      );
    }),
    (e.GetBoardElementByCondition = function (e, t, i) {
      void 0 === i && (i = !0);
      var n = [],
        o = G2.BoardCells;
      if (!o) return [];
      var r = Array.from(o.keys());
      i || r.reverse();
      for (var a = 0; a < r.length; a++) {
        var s = r[a],
          c = o.get(s);
        if ((!t || t(c)) && (n.push(s), e && n.length >= e)) return n;
      }
      return n;
    }),
    (e.GetBagElementInfoByCondition = function (e, t, i) {
      void 0 === i && (i = !0);
      var n = [],
        o = o9.currentScreen == J8.HOME_SCREEN ? G2.MainBoardRemote : G2.Data;
      if (!(null == o ? void 0 : o.bag)) return [];
      var r = [
        o.bag.items,
        o.bag.mpItems,
        o.bag.producerItems,
        o.bag.passNewItems,
        o.bag.mpV2Items,
      ];
      i || r.reverse();
      for (var a = 0; a < r.length; a++) {
        var s = r[a];
        if (s) {
          var c = Array.from(s.keys());
          i || c.reverse();
          for (var l = 0; l < c.length; l++) {
            var d = c[l],
              u = s.get(d);
            if (
              u &&
              (!t || t(u)) &&
              (n.push({ bagId: d, elementId: u.elementId }), e && n.length >= e)
            )
              return n;
          }
        }
      }
      return n;
    }),
    (e.GetBoardHaveElement = function (e, t) {
      if ((void 0 === t && (t = 0), !G2.BoardCells)) return [];
      var i = [],
        n = G2.BoardCells;
      if (!n) return [];
      var o = !1;
      return (
        n.forEach(function (r, a) {
          var s;
          if (!o) {
            var c = n.get(a),
              l = G$.GetCellByIndex(a);
            (null === (s = null == l ? void 0 : l.data) || void 0 === s ? void 0 : s.freeze) ||
              (e.includes(c.elementId) &&
                0 == c.bubbleEnd &&
                (c.state & mr.web) != mr.web &&
                (c.state & mr.box) != mr.box &&
                (i.push(a), t && i.length >= t && (o = !0)));
          }
        }),
        i
      );
    }),
    (e.isElementUnlock = function (e) {
      var t, i;
      if ((null === (t = m2.instance) || void 0 === t ? void 0 : t.stage) == ew.START)
        return null === (i = m2.instance) || void 0 === i ? void 0 : i.isEleUnlock(e);
    }),
    (e.GetGDBoardHaveElement = function (t, i, n) {
      void 0 === i && (i = 0);
      var o = e.GetBoardByType(n);
      if (!o || !o.cells) return [];
      var r = [],
        a = o.cells;
      if (!a) return [];
      var s = !1;
      return (
        a.forEach(function (e, n) {
          if (!s) {
            var o = a.get(n);
            t.includes(o.elementId) &&
              0 == o.bubbleEnd &&
              (o.state & mr.web) != mr.web &&
              (o.state & mr.box) != mr.box &&
              (r.push(n), i && r.length >= i && (s = !0));
          }
        }),
        r
      );
    }),
    (e.GetBoardHaveElementIncludeBubble = function (e, t) {
      if ((void 0 === t && (t = 0), !G2.BoardCells)) return [];
      var i = [],
        n = G2.BoardCells;
      if (!n) return [];
      var o = !1;
      return (
        n.forEach(function (r, a) {
          if (!o) {
            var s = n.get(a);
            e.includes(s.elementId) &&
              (s.state & mr.web) != mr.web &&
              (s.state & mr.box) != mr.box &&
              (i.push(a), t && i.length >= t && (o = !0));
          }
        }),
        i
      );
    }),
    (e.GetBoardHaveElementIncludeBag = function (e, t) {
      void 0 === t && (t = 0);
      var i = this.GetBoardHaveElement(e, t),
        n = [];
      return (
        (0 == t || i.length < t) && (n = this.GetBagHaveElement(e, t - i.length)),
        { element: i, bag: n }
      );
    }),
    (e.GetBoardHaveElementByMap = function (e) {
      var t = this,
        i = [];
      return (
        e.forEach(function (e, n) {
          var o = t.GetBoardHaveElement([parseInt(n)], e);
          i = i.concat(o);
        }),
        i
      );
    }),
    (e.GetBagHaveElement = function (e, t) {
      var i;
      if ((void 0 === t && (t = 0), !G2.BoardCells)) return [];
      var n = [],
        o = o9.currentScreen == J8.HOME_SCREEN ? G2.MainBoardRemote : G2.Data,
        r = null === (i = null == o ? void 0 : o.bag) || void 0 === i ? void 0 : i.items;
      if (!r) return [];
      var a = !1,
        s = function (i, o) {
          a ||
            (e.includes(i.elementId) &&
              0 == i.bubbleEnd &&
              (i.state & mr.web) != mr.web &&
              (i.state & mr.box) != mr.box &&
              (n.push(o), t > 0 && n.length >= t && (a = !0)));
        };
      return (
        r.forEach(s),
        (r = o.bag.mpItems).forEach(s),
        (r = o.bag.producerItems).forEach(s),
        (r = o.bag.passNewItems).forEach(s),
        (r = o.bag.mpV2Items).forEach(s),
        n
      );
    }),
    (e.GetElementFromBagId = function (e) {
      var t = [];
      return (
        e.forEach(function (e) {
          var i = !1;
          (G2.Data.bag.items.forEach(function (n, o) {
            i || (o == e && (t.push(n.elementId), (i = !0)));
          }),
            G2.Data.bag.mpItems.forEach(function (n, o) {
              i || (o == e && (t.push(n.elementId), (i = !0)));
            }),
            G2.Data.bag.passNewItems.forEach(function (n, o) {
              i || (o == e && (t.push(n.elementId), (i = !0)));
            }),
            G2.Data.bag.producerItems.forEach(function (n, o) {
              i || (o == e && (t.push(n.elementId), (i = !0)));
            }),
            G2.Data.bag.mpV2Items.forEach(function (n, o) {
              i || (o == e && (t.push(n.elementId), (i = !0)));
            }));
        }),
        t
      );
    }),
    (e.GetDataFromBagId = function (e) {
      var t = [],
        i = [
          G2.Data.bag.items,
          G2.Data.bag.mpItems,
          G2.Data.bag.producerItems,
          G2.Data.bag.passNewItems,
          G2.Data.bag.mpV2Items,
        ];
      return (
        e.forEach(function (e) {
          for (var n = 0; n < i.length; n++) {
            var o = i[n].get(e);
            if (o) {
              t.push(o);
              break;
            }
          }
        }),
        t
      );
    }),
    (e.RemoveBoardElement = function (e, t) {
      if ((void 0 === t && (t = ar.main), G2.BoardCells)) {
        var i = G2.MergeBoardType;
        (e.forEach(function (e) {
          ((G2.MergeBoardType = t), GW.AddEmptyBoardCell(e));
          var i = G$.GetCellByIndex(e);
          i && (i.data = null);
        }),
          u.dispatch("removeBoardElement"),
          (G2.MergeBoardType = i));
      }
    }),
    (e.getElementUpLvTarget = function (t, i) {
      if (i <= 1) return t;
      for (var n = t, o = i; o > 1; o /= 2) {
        var r = config.Element.getById(n);
        if (!r.mergeElementId || !e.CheckElementValid(r.mergeElementId)) return n;
        n = r.mergeElementId;
      }
      return n;
    }),
    (e.getClientLv = function () {
      return oN.ClientLevel;
    }),
    (e.GetBoardCanMergeElement = function (e, t, i) {
      void 0 === i && (i = !1);
      var n = [],
        o = [],
        r = G2.BoardCells;
      if (!r) return [];
      var a = !1;
      if (
        (r.forEach(function (s, c) {
          if (!a) {
            var l = r.get(c);
            l.elementId == e &&
              0 == l.bubbleEnd &&
              (l.state & mr.box) != mr.box &&
              (i && (l.state & mr.web) == mr.web ? o.push(c) : n.push(c),
              !i && t && n.length >= t && (a = !0));
          }
        }),
        a)
      )
        return n;
      if (i) {
        var s = [];
        if (t && o.length) {
          s.push(o[0]);
          for (var c = 0; c < n.length; c++) if ((s.push(n[c]), s.length == t)) return s;
        } else
          o.forEach(function (e) {
            return n.push(e);
          });
      }
      return n;
    }),
    (e.isBoardOrderGog = function (e) {
      if (!e) return !1;
      var t = config.Order.getById(e);
      return !!t && t.gogId > 0;
    }),
    (e.IsBoardOrderFinish = function (e) {
      var t = this;
      if (!e) return !1;
      var i = 0,
        n = UT.getOrderConf(e);
      return n
        ? (n.demand.forEach(function (e, n) {
            var o = parseInt(n);
            t.GetBoardHaveElement([o], e).length >= e && i++;
          }),
          i >= n.demand.size)
        : (K3.logEvent("find_order_error", { id: e }), !1);
    }),
    (e.ManuUnlockFinish = function () {
      var e = this;
      if (G2.UnlockingManuElement) {
        var t = [];
        (G2.BoardCells.forEach(function (i, n) {
          var o = config.Element.getById(i.elementId);
          if (o && 1 == o.unlockWay && o.unlockDuration > 0) {
            var r = G$.GetCellByIndex(i.index),
              a = e.isElementNewUnlock(r.data.config.id);
            G$.IsCellInState(r, mr.opened) ||
              i.index == G2.UnlockingManuElement.serverIdx ||
              a ||
              t.push(r);
          }
        }),
          t.forEach(function (e, t) {
            e3.AddCellAnim(e, TC.CHEST_LOCK_TIP, !e.isElementAtCenter());
          }),
          (G2.UnlockingManuElement = null));
      }
    }),
    (e.ManuNewUnlockFinish = function () {
      var e = this;
      if (G2.UnlockingNewElement) {
        var t = [];
        (G2.BoardCells.forEach(function (i, n) {
          var o = config.Element.getById(i.elementId);
          if (o && 1 == o.unlockWay && o.unlockDuration > 0) {
            var r = G$.GetCellByIndex(i.index),
              a = e.isElementNewUnlock(r.data.config.id);
            !G$.IsCellInState(r, mr.opened) &&
              i.index != G2.UnlockingNewElement.serverIdx &&
              a &&
              t.push(r);
          }
        }),
          t.forEach(function (e, t) {
            e3.AddCellAnim(e, TC.CHEST_LOCK_TIP, !e.isElementAtCenter());
          }),
          (G2.UnlockingNewElement = null));
      }
    }),
    (e.ManuUnlock = function (e) {
      var t = this;
      G2.UnlockingManuElement = e;
      var i = [];
      (G2.BoardCells.forEach(function (e, n) {
        var o = config.Element.getById(e.elementId);
        o &&
          1 == o.unlockWay &&
          o.unlockDuration > 0 &&
          (t.isElementNewUnlock(e.elementId) || i.push(G$.GetCellByIndex(e.index)));
      }),
        i.forEach(function (e, t) {
          G$.IsCellInState(e, mr.opened) ||
            (e3.RemoveCellAnim(e, TC.CHEST_LOCK_TIP),
            E8.role.level <= config.Config.config.tapGuideLevel &&
              e3.RemoveCellAnim(e, TC.CLICK_TIPS));
        }));
    }),
    (e.ManuNewUnlock = function (e) {
      var t = this;
      G2.UnlockingNewElement = e;
      var i = [];
      (G2.BoardCells.forEach(function (e, n) {
        var o = config.Element.getById(e.elementId);
        o &&
          1 == o.unlockWay &&
          o.unlockDuration > 0 &&
          t.isElementNewUnlock(e.elementId) &&
          i.push(G$.GetCellByIndex(e.index));
      }),
        i.forEach(function (e, t) {
          G$.IsCellInState(e, mr.opened) ||
            (e3.RemoveCellAnim(e, TC.CHEST_LOCK_TIP),
            E8.role.level <= config.Config.config.tapGuideLevel &&
              e3.RemoveCellAnim(e, TC.CLICK_TIPS));
        }));
    }),
    (e.isElementNewUnlock = function (e) {
      return -1 != config.Config.config.bagElement.indexOf(e);
    }),
    (e.SubmitBagElementSecondCheck = function (t) {
      return r(this, void 0, void 0, function () {
        var i, n, o;
        return a(this, function (r) {
          switch (r.label) {
            case 0:
              ((i = 0),
                (n = function (e) {
                  i = e ? 1 : 2;
                }),
                (o = e.GetElementFromBagId(t)),
                j_.showWindow(F3.FinishOrderTipWindow, { cb: n.bind(this), ele: o }),
                (r.label = 1));
            case 1:
              return 0 != i ? [3, 3] : [4, S(66)];
            case 2:
              return (r.sent(), [3, 1]);
            case 3:
              return 2 == i ? [2, !1] : [2, !0];
          }
        });
      });
    }),
    (e.CanUseGoldBubbleDiscount = function () {
      return !1;
    }),
    (e.CanUseBagDiscount = function (e) {
      if (G2.Data.freeSpeedUpTimes > 0) return !1;
      var t = E8.role.specialCount;
      return (
        !!(config.Config.config.discountBagId.includes(e) && t && t.get(Ba.bagDiscountCountKey)) &&
        t.get(Ba.bagDiscountCountKey) > 0
      );
    }),
    (e.getBoardEnergyType = function (e) {
      var t = "",
        i = e == ar.main ? "main" : "";
      if (!i) {
        var n = config.Board.list.find(function (t) {
          return Zr(t.type) == e;
        });
        if (!n) return "";
        i = n.actType;
      }
      return (
        config.BoardEnergyType.list.forEach(function (e) {
          e.boardType.includes(i) && (t = e.Id);
        }),
        t
      );
    }),
    (e.ShowElementDetail = function (e, t, i, o) {
      return (
        void 0 === i && (i = !1),
        void 0 === o && (o = null),
        r(this, void 0, void 0, function () {
          var r,
            s,
            c,
            l = this;
          return a(this, function (a) {
            switch (a.label) {
              case 0:
                return (
                  this._elementMultiOrderList ||
                    ((this._elementMultiOrderList = new Map()),
                    config.ElementMultiOrderPool.list.forEach(function (e) {
                      l._elementMultiOrderList.set(
                        K6.getElementMultiProductId(e.elementIdWeight),
                        !0,
                      );
                    })),
                  null == (r = config.Element.getById(e))
                    ? (A8.Toast({ title: v.getLabel("tip_configNotFound") }), [2])
                    : ((s = n({ id: e, remindFrom: t, needRemind: i }, o)),
                      (c = null),
                      MW.isStoreElementId(e)
                        ? [
                            4,
                            j_.showWindow(
                              F3.StoreElementDiscoverDetailWindow,
                              n(n({}, s), { skipStoreRedirect: !0 }),
                            ),
                          ]
                        : [3, 2])
                );
              case 1:
                return ((c = a.sent()), [3, 12]);
              case 2:
                return "Chest" != r.series.split("_")[0]
                  ? [3, 4]
                  : [4, j_.showWindow(F3.ChestDetailWindow, s)];
              case 3:
                return ((c = a.sent()), [3, 12]);
              case 4:
                return config.SplitProp.getById(e)
                  ? [4, j_.showWindow(F3.SplitElementDetailWindow, s)]
                  : [3, 6];
              case 5:
                return ((c = a.sent()), [3, 12]);
              case 6:
                return G$.isOrderElementCreator(r.elementOrderId) &&
                  G2.MergeBoardType == _A.getBoardType() &&
                  o9.currentScreen == J8.MERGE_SCREEN
                  ? [4, j_.showWindow(F3.HealthFoodElementDetailWindow, { id: e, type: "produce" })]
                  : [3, 8];
              case 7:
                return ((c = a.sent()), [3, 12]);
              case 8:
                return this._elementMultiOrderList.get(e) &&
                  G2.MergeBoardType == _A.getBoardType() &&
                  o9.currentScreen == J8.MERGE_SCREEN
                  ? [4, j_.showWindow(F3.HealthFoodElementDetailWindow, { id: e, type: "target" })]
                  : [3, 10];
              case 9:
                return ((c = a.sent()), [3, 12]);
              case 10:
                return [4, j_.showWindow(F3.ElementDetailWindow, s)];
              case 11:
                ((c = a.sent()), (a.label = 12));
              case 12:
                return [2, c];
            }
          });
        })
      );
    }),
    (e.checkElementHaveAllPos = function (e, t) {
      (void 0 === e && (e = []), void 0 === t && (t = []));
      var i = !1;
      return (
        G2.Data.cells.forEach(function (n, o) {
          if (n.elementId && !i) {
            var r = config.Element.getById(n.elementId);
            (t.includes(r.series) || e.includes(n.elementId)) && (i = !0);
          }
        }),
        G2.Data.bag.items.forEach(function (n, o) {
          if (n.elementId && !i) {
            var r = config.Element.getById(n.elementId);
            (t.includes(r.series) || e.includes(n.elementId)) && (i = !0);
          }
        }),
        G2.Data.bag.mpItems.forEach(function (n, o) {
          if (n.elementId && !i) {
            var r = config.Element.getById(n.elementId);
            (t.includes(r.series) || e.includes(n.elementId)) && (i = !0);
          }
        }),
        G2.Data.bag.passNewItems.forEach(function (n, o) {
          if (n.elementId && !i) {
            var r = config.Element.getById(n.elementId);
            (t.includes(r.series) || e.includes(n.elementId)) && (i = !0);
          }
        }),
        G2.Data.bag.producerItems.forEach(function (n, o) {
          if (n.elementId && !i) {
            var r = config.Element.getById(n.elementId);
            (t.includes(r.series) || e.includes(n.elementId)) && (i = !0);
          }
        }),
        G2.Data.channel.forEach(function (n, o) {
          if (n.itemId && !i && n.itemType == oa.element) {
            var r = config.Element.getById(n.itemId);
            (t.includes(r.series) || e.includes(n.itemId)) && (i = !0);
          }
        }),
        G2.Data.bag.wasteBasket.forEach(function (n, o) {
          if (n.elementId && !i) {
            var r = config.Element.getById(n.elementId);
            (t.includes(r.series) || e.includes(n.elementId)) && (i = !0);
          }
        }),
        i
      );
    }),
    (e.RecycleBoardElement = function (e, t, n, o) {
      var c, l, p, f, g, v, m, y, _;
      return (
        void 0 === e && (e = []),
        void 0 === t && (t = 0),
        void 0 === n && (n = 0),
        void 0 === o && (o = []),
        r(this, void 0, void 0, function () {
          var r, b, w, C, I, T, E, A, k;
          return a(this, function (a) {
            switch (a.label) {
              case 0:
                if (
                  (console.log("RecycleBoardElement", e, t, n, o),
                  o9.currentScreen != J8.MERGE_SCREEN)
                )
                  return [2];
                if (
                  this.recycledSeries.length > 0 &&
                  (function (e, t) {
                    if (!e || !t || e.length != t.length) return !1;
                    for (var i = 0; i < e.length; i++) if (e[i] != t[i]) return !1;
                    return !0;
                  })(e, this.recycledSeries)
                )
                  return [2];
                ((this.recycledSeries = e),
                  j_.hideWindow(F3.ClosetWindow),
                  QK.instance.resetAutoMergeCells(),
                  (r = new Map()),
                  (b = G2.BoardRender.elementInfo.sellCache
                    ? G2.BoardRender.elementInfo.sellCache.index
                    : -1),
                  (null ===
                    (p =
                      null ===
                        (l =
                          null === (c = G2.instance.focusElement) || void 0 === c
                            ? void 0
                            : c.data) || void 0 === l
                        ? void 0
                        : l.config) || void 0 === p
                    ? void 0
                    : p.propEffect) && G2.instance.hideCanUseProp(),
                  (w =
                    null ===
                      (v =
                        null ===
                          (g =
                            null === (f = G2.instance.focusElement) || void 0 === f
                              ? void 0
                              : f.data) || void 0 === g
                          ? void 0
                          : g.config) || void 0 === v
                      ? void 0
                      : v.id),
                  G2.Data.cells.forEach(function (a) {
                    var s, c, l, h, p, f, g, v;
                    if (a.elementId && !o.includes(a.index)) {
                      var m = config.Element.getById(a.elementId);
                      if (n && a.elementId == n) {
                        var y = G$.GetCellByIndex(a.index);
                        if ((d.emit(i.ElementRecycle, { elementId: a.elementId }), t)) {
                          if (
                            (w =
                              null ===
                                (c =
                                  null === (s = y.data) || void 0 === s ? void 0 : s.remoteData) ||
                              void 0 === c
                                ? void 0
                                : c.deteriorateEnd) &&
                            w < E8.serverTime &&
                            !(null ===
                              (h =
                                null === (l = y.data) || void 0 === l ? void 0 : l.elementType) ||
                            void 0 === h
                              ? void 0
                              : h.includes(Z2.BUBBLE))
                          )
                            return;
                          var _ = GW.ParseCellConfig(
                            { id: t, state: mr.none, seed: a.seed, productType: vr.none },
                            a.index,
                          );
                          ((y.data = _),
                            (C = r.get(y.y)) || (C = []),
                            C.push(y),
                            r.set(y.y, C),
                            (y.mergeCellRender.node_icon.scale = 0));
                        } else {
                          ((y.data = null),
                            Ai(
                              e3
                                .AddCellAnim(y, TC.ELEMENT_DISAPPEAR)
                                .children[0].getComponent(cc.Sprite),
                              e9.getElementTexturePath(n),
                            ));
                        }
                        -1 != b && a.index == b && u.dispatch("hideElementInfo");
                      } else if (e.length && e.includes(m.series)) {
                        y = G$.GetCellByIndex(a.index);
                        if ((d.emit(i.ElementRecycle, { elementId: a.elementId }), t)) {
                          var w;
                          if (
                            (w =
                              null ===
                                (f =
                                  null === (p = y.data) || void 0 === p ? void 0 : p.remoteData) ||
                              void 0 === f
                                ? void 0
                                : f.deteriorateEnd) &&
                            w < E8.serverTime &&
                            !(null ===
                              (v =
                                null === (g = y.data) || void 0 === g ? void 0 : g.elementType) ||
                            void 0 === v
                              ? void 0
                              : v.includes(Z2.BUBBLE))
                          )
                            return;
                          var C;
                          _ = GW.ParseCellConfig(
                            { id: t, state: mr.none, seed: a.seed, productType: vr.none },
                            a.index,
                          );
                          ((y.data = _),
                            (C = r.get(y.y)) || (C = []),
                            C.push(y),
                            r.set(y.y, C),
                            (y.mergeCellRender.node_icon.scale = 0));
                        } else {
                          var I = y.data ? y.data.config.id : 0;
                          if (((y.data = null), I))
                            Ai(
                              e3
                                .AddCellAnim(y, TC.ELEMENT_DISAPPEAR)
                                .children[0].getComponent(cc.Sprite),
                              e9.getElementTexturePath(I),
                            );
                        }
                        -1 != b && a.index == b && u.dispatch("hideElementInfo");
                      }
                    }
                  }),
                  (C =
                    null ===
                      (_ =
                        null ===
                          (y =
                            null === (m = G2.instance.focusElement) || void 0 === m
                              ? void 0
                              : m.data) || void 0 === y
                          ? void 0
                          : y.config) || void 0 === _
                      ? void 0
                      : _.id),
                  w &&
                    C &&
                    w != C &&
                    (h.warn("[MergeUtil] Fix Prop Use Anim: old#" + w + "-new#" + C),
                    G2.instance.hideCanUseProp(),
                    G$.IsElementPropUse(C) &&
                      G2.instance.showCanUseProp(G2.instance.selectedElement)),
                  G2.Data.bag.items.forEach(function (i, o) {
                    if (i.elementId) {
                      var r = config.Element.getById(i.elementId);
                      if (n && i.elementId == n)
                        if (t)
                          (((a = new ll()).index = -1),
                            (a.elementId = t),
                            (a.seed = i.seed),
                            G2.Data.bag.items.set(o, a));
                        else G2.Data.bag.items.delete(o);
                      else if (e.length && e.includes(r.series)) {
                        var a;
                        if (t)
                          (((a = new ll()).index = -1),
                            (a.elementId = t),
                            (a.seed = i.seed),
                            G2.Data.bag.items.set(o, a));
                        else G2.Data.bag.items.delete(o);
                      }
                    }
                  }),
                  G2.Data.bag.mpItems.forEach(function (i, o) {
                    if (i.elementId) {
                      var r = config.Element.getById(i.elementId);
                      if (n && i.elementId == n)
                        if (t)
                          (((a = new ll()).index = -1),
                            (a.elementId = t),
                            (a.seed = i.seed),
                            G2.Data.bag.mpItems.set(o, a));
                        else G2.Data.bag.mpItems.delete(o);
                      else if (e.length && e.includes(r.series)) {
                        var a;
                        if (t)
                          (((a = new ll()).index = -1),
                            (a.elementId = t),
                            (a.seed = i.seed),
                            G2.Data.bag.mpItems.set(o, a));
                        else G2.Data.bag.mpItems.delete(o);
                      }
                    }
                  }),
                  G2.Data.bag.passNewItems.forEach(function (i, o) {
                    if (i.elementId) {
                      var r = config.Element.getById(i.elementId);
                      if (n && i.elementId == n)
                        if (t)
                          (((a = new ll()).index = -1),
                            (a.elementId = t),
                            (a.seed = i.seed),
                            G2.Data.bag.passNewItems.set(o, a));
                        else G2.Data.bag.passNewItems.delete(o);
                      else if (e.length && e.includes(r.series)) {
                        var a;
                        if (t)
                          (((a = new ll()).index = -1),
                            (a.elementId = t),
                            (a.seed = i.seed),
                            G2.Data.bag.passNewItems.set(o, a));
                        else G2.Data.bag.passNewItems.delete(o);
                      }
                    }
                  }),
                  G2.Data.bag.producerItems.forEach(function (i, o) {
                    if (i.elementId) {
                      var r = config.Element.getById(i.elementId);
                      if (n && i.elementId == n)
                        if (t)
                          (((a = new ll()).index = -1),
                            (a.elementId = t),
                            (a.seed = i.seed),
                            G2.Data.bag.producerItems.set(o, a));
                        else G2.Data.bag.producerItems.delete(o);
                      else if (e.length && e.includes(r.series)) {
                        var a;
                        if (t)
                          (((a = new ll()).index = -1),
                            (a.elementId = t),
                            (a.seed = i.seed),
                            G2.Data.bag.producerItems.set(o, a));
                        else G2.Data.bag.producerItems.delete(o);
                      }
                    }
                  }),
                  G2.Data.bag.wasteBasket.forEach(function (i, o) {
                    if (i.elementId) {
                      var r = config.Element.getById(i.elementId);
                      if (n && i.elementId == n)
                        if (t)
                          (((a = new ll()).index = -1),
                            (a.elementId = t),
                            (a.seed = i.seed),
                            G2.Data.bag.wasteBasket.set(o, a));
                        else G2.Data.bag.wasteBasket.delete(o);
                      else if (e.length && e.includes(r.series)) {
                        var a;
                        if (t)
                          (((a = new ll()).index = -1),
                            (a.elementId = t),
                            (a.seed = i.seed),
                            G2.Data.bag.wasteBasket.set(o, a));
                        else G2.Data.bag.wasteBasket.delete(o);
                      }
                    }
                  }),
                  G2.Data.channel.forEach(function (i, o) {
                    if (i.itemId && i.itemType == oa.element) {
                      var r = config.Element.getById(i.itemId);
                      ((n && i.itemId == n) || (e.length && e.includes(r.series))) &&
                        (t ? (i.itemId = t) : G2.Data.channel.delete(o));
                    }
                  }),
                  u.dispatch("updateChannelInfo"),
                  (a.label = 1));
              case 1:
                (a.trys.push([1, 6, 7, 8]), (I = s(r.values())), (T = I.next()), (a.label = 2));
              case 2:
                return T.done
                  ? [3, 5]
                  : (T.value.forEach(function (e, t) {
                      e.data &&
                        (e.resetPos(),
                        cc.tween(e.mergeCellRender.node_icon).to(0.3, { scale: 1 }).start());
                    }),
                    [4, S(100)]);
              case 3:
                (a.sent(), (a.label = 4));
              case 4:
                return ((T = I.next()), [3, 2]);
              case 5:
                return [3, 8];
              case 6:
                return ((E = a.sent()), (A = { error: E }), [3, 8]);
              case 7:
                try {
                  T && !T.done && (k = I.return) && k.call(I);
                } finally {
                  if (A) throw A.error;
                }
                return [7];
              case 8:
                return ((this.recycledSeries = []), Le.resolve(Pe.MergeScreenRecycledSeries), [2]);
            }
          });
        })
      );
    }),
    (e.WaitRecycledSeries = function () {
      return r(this, void 0, void 0, function () {
        var e = this;
        return a(this, function (t) {
          switch (t.label) {
            case 0:
              return [
                4,
                Le.waitFor(Pe.MergeScreenRecycledSeries, function () {
                  return 0 == e.recycledSeries.length;
                }),
              ];
            case 1:
              return (t.sent(), [2]);
          }
        });
      });
    }),
    (e.isRecyclingSeries = function () {
      return this.recycledSeries.length > 0;
    }),
    (e.CheckMergeAnim = function (e) {
      if (!e.data || !e.data.config || !e.data.config.type) return -1;
      if (H2.getActivityGlobalActivity()) {
        var t = e.data.config.type,
          i = H2.getBoardType();
        if (Zr(t) == i) return 4;
      }
      return config.MergeExtra2Element.getById(e.data.config.id) ? 3 : -1;
    }),
    (e.CheckBagSize = function () {
      return {
        canNormal: !!this.GetAvailableBagType(!1),
        canProduct: !!this.GetAvailableBagType(!0),
      };
    }),
    (e.GetAvailableBagType = function (e) {
      var t = J0.getState(),
        i = J0.getMergePassData(),
        n =
          t == K0.START &&
          !!i &&
          i.isVip &&
          G2.MainBoardRemote.bag.mpSize > G2.Data.bag.mpItems.size,
        o = config.Unlock.getById("unlockDiamondBag").level,
        r = E8.role.level >= o ? _2.getCurActivity() : null,
        a =
          !!r &&
          !!r.actData &&
          r.actData.status == sa.sVIP &&
          G2.MainBoardRemote.bag.mpV2Size > G2.Data.bag.mpV2Items.size,
        s = YE.getStateActivity(ew.START),
        c =
          !!s &&
          !!s.EventPassNewData &&
          s.EventPassNewData.status == ma.sVIP &&
          G2.MainBoardRemote.bag.passNewSize > G2.Data.bag.passNewItems.size,
        l = G2.Data.bag.producerSize > G2.BagProduct.size,
        d = G2.Data.bag.size + G2.Data.bag.extSize > G2.Data.bag.items.size;
      if (e) {
        if (a) return Or.mPV2;
        if (l) return Or.product;
        if (n) return Or.mp;
        if (c) return Or.passNew;
        if (d) return Or.normal;
      } else {
        if (n) return Or.mp;
        if (c) return Or.passNew;
        if (d) return Or.normal;
      }
      return null;
    }),
    (e.OrderElementCheck = function (e, t) {
      if (!G2.Data || !G2.Data.buff) return !0;
      var i = config.Element.getById(t);
      if (!i) return !0;
      if (
        i.elementOrderId < 0 &&
        (!G$.isOrderElementCreator(i.elementOrderId) || G$.isOrderElementOneToN(i.elementOrderId))
      ) {
        var n = new Map();
        return (
          config.ElementMultiOrderPool.list.forEach(function (e) {
            e.orderElement == t && (n.set(e.partElement1, 1), n.set(e.partElement2, 1));
          }),
          !(G2.Data.buff.has(e) || !n.get(e))
        );
      }
      return !0;
    }),
    (e.checkFirstGetElement = function (e) {
      return r(this, void 0, void 0, function () {
        var t, i, n;
        return a(this, function (o) {
          return e && e.data && e.data.config
            ? ((t = e.data.config.id),
              (i = config.ElementTips.getById(t)) && !v$.Data.has(t)
                ? ((n = { desc: i.txt, title: i.title, image: "Texture/ElementTips/" + i.id }),
                  j_.showWindow(F3.TipDetailWindow, n),
                  [2])
                : [2])
            : [2];
        });
      });
    }),
    Object.defineProperty(e, "InValidElementArr", {
      get: function () {
        return (
          (this._inValidElementArr && 0 != this._inValidElementArr.length) ||
            this.UpdateElementValid(),
          this._inValidElementArr
        );
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(e, "InValidElementMap", {
      get: function () {
        return (
          (this._inValidElementMap && 0 != this._inValidElementMap.size) ||
            this.UpdateElementValid(),
          this._inValidElementMap
        );
      },
      enumerable: !1,
      configurable: !0,
    }),
    (e.UpdateElementValid = function () {
      var e = config.Config.config.unlockMergeOrderid,
        t = config.Config.config.unlockMergeElementid;
      if (e.length == t.length)
        for (var i = 0; i < e.length; ++i) {
          var n = e[i],
            o = t[i];
          this._inValidElementMap.set(n, o);
          for (var r = 0; r < o.length; ++r) this._inValidElementArr.push(o[r]);
        }
      else console.error("warn--unlockMergeOrderid error");
    }),
    (e.CheckElementValid = function (e) {
      if (this.InValidElementArr.indexOf(e) < 0) return !0;
      var t = !1;
      return (
        this.InValidElementMap.forEach(function (i, n) {
          for (var o = 0; o < i.length; ++o)
            if (i[o] == e && K6.isUnLocked("GetOrder" + n)) return void (t = !0);
        }),
        t
      );
    }),
    (e.CheckElementDesc = function (e) {
      var t = config.Element.getById(e),
        i = config.Config.config.specialUnlockElement.indexOf(e);
      if (i >= 0) {
        var n = t.mergeElementId,
          o = this.CheckElementValid(n),
          r = config.Config.config.specialUnlockElementDesc;
        return o ? t.desc : r[i];
      }
      return t.desc;
    }),
    (e.IsSpecialEnergyBoard = function () {
      var e,
        t = null == G2 ? void 0 : G2.Data;
      return t && (null === (e = E8.role) || void 0 === e ? void 0 : e.specialEnergy.has(t.gActId));
    }),
    (e.checkSpecialUnlockLight = function (e) {
      var t = !1,
        i = YE.getStateActivity(ew.START);
      return (
        i && i.EventPassNewConf && (t = i.EventPassNewConf.passElementForth.indexOf(e) >= 0),
        t
      );
    }),
    (e.IsBubbleFree = function (e) {
      return e == vr.bubble && E8.mainBoardRemoteData.specialCount.get(rr.freeBubbleCount) > 0;
    }),
    (e.CheckConfig = function () {
      var e = this;
      for (var t in (console.warn(">>>>>> 开始检查数据表 >>>>>>"),
      config.Config.config.taskDailyFinalChest))
        config.Config.config.taskDailyFinalChest[t] > 5 &&
          console.error("config:taskDailyFinalChest", t);
      (console.warn(">>>>>> config检查完毕 >>>>>>"),
        config.AdronSkin.list.forEach(function (e, t) {
          (e.unlockReward
            ? e.unlockReward.forEach(function (t, i) {
                t > 1e3 &&
                  console.warn("%c adornSkin:unlockReward " + e.id + " " + i, "color: blue");
              })
            : console.error("adornSkin:unlockReward is null", e),
            e.getWay
              ? e.getWay.forEach(function (t, i) {
                  t > 1e5 && console.warn("%c adornSkin:getWay " + e.id + " " + i, "color: blue");
                })
              : console.error("adornSkin:getWay is null", e));
        }),
        console.warn(">>>>>> adornSkin检查完毕 >>>>>>"),
        config.Bag.list.forEach(function (e, t) {
          e.unlock.forEach(function (t, i) {
            t > 9e5 && console.warn("%c bag:unlock " + e.id + " " + i, "color: blue");
          });
        }),
        console.warn(">>>>>> bag检查完毕 >>>>>>"),
        config.Build.list.forEach(function (e, t) {
          e.reward.forEach(function (t, i) {
            t > 6666 && console.warn("%c build:reward " + e.id + " " + i, "color: blue");
          });
        }),
        config.BuildReward.list.forEach(function (e, t) {
          e.reward.forEach(function (t, i) {
            t > 6666 && console.warn("%c buildReward:reward " + e.id + " " + i, "color: blue");
          });
        }),
        console.warn(">>>>>> build检查完毕 >>>>>>"),
        config.Element.list.forEach(function (t, i) {
          return r(e, void 0, void 0, function () {
            var e, i, n, o;
            return a(this, function (r) {
              return (
                (e = t.type),
                t.canBubble2 &&
                  !t.bubbleWait &&
                  console.error("element:bubbleWait", t.id, "bubble2Rate need have bubbleWait"),
                t.canBubble2 &&
                  !t.bubble2Cost &&
                  console.error("element:bubble2Cost", t.id, "canBubble2 need have bubble2Cost"),
                config.ElementSeries.getBySeries(t.series)
                  ? (!(i = config.ElementSeries.getBySeries(t.series)).type ||
                      i.type.indexOf(e) < 0) &&
                    console.error("element:board", t.id, "element board error")
                  : console.error("element:series", t.id, "elementSeries not have this"),
                null == t.unlockReward
                  ? console.warn("element:unlockReward is null", t.id)
                  : t.unlockReward.forEach(function (e, i) {
                      null == e
                        ? console.error("value is null", t.id, i)
                        : e > 999 && console.error("element:unlockReward", t.id, i);
                    }),
                null == t.elementIdWeight
                  ? console.warn("element:elementIdWeight is null", t.id)
                  : t.elementIdWeight.forEach(function (i, n) {
                      null == i && console.error("value is null", t.id, n);
                      var o = parseInt(n.split("_")[0]);
                      (config.Element.getById(o) && config.Element.getById(o).type == e) ||
                        console.error("element:elementIdWeight", t.id, n);
                    }),
                null == t.AutoId
                  ? console.warn("element:AutoId is null", t.id)
                  : t.AutoId.forEach(function (i, n) {
                      null == i && console.error("value is null", t.id, n);
                      var o = parseInt(n.split("_")[0]);
                      (config.Element.getById(o) && config.Element.getById(o).type == e) ||
                        console.error("element:AutoId", t.id, n);
                    }),
                null == t.vanishChange
                  ? console.warn("element:vanishChange is null", t.id)
                  : t.vanishChange.forEach(function (i, n) {
                      null == i && console.error("value is null", t.id, n);
                      var o = parseInt(n);
                      (config.Element.getById(o) && config.Element.getById(o).type == e) ||
                        console.error("element:vanishChange", t.id, n);
                    }),
                null == t.deterioratedChange
                  ? console.warn("element:deterioratedChange is null", t.id)
                  : t.deterioratedChange.forEach(function (i, n) {
                      if (n) {
                        var o = parseInt(n);
                        (config.Element.getById(o) && config.Element.getById(o).type == e) ||
                          console.error("element:deterioratedChange", t.id, n);
                      }
                    }),
                (t.bubbleRate || t.bubbleRate2) &&
                  t.bubbleWait <= 0 &&
                  console.error("element:bubbleWait", t.id, "bubble not have wait time"),
                (t.bubbleRate || t.bubbleRate2) &&
                  t.bubbleCost <= 0 &&
                  console.error("element:bubbleCost", t.id, "bubble not have price"),
                (t.bubbleRate || t.bubbleRate2) &&
                  t.bubbleToCoin <= 0 &&
                  console.error("element:bubbleToCoin", t.id, "bubble not have change"),
                t.propBubbleRate &&
                  0 == t.propBubbleTypeAndWeight.size &&
                  console.error(
                    "element:propBubbleTypeAndWeight",
                    t.id,
                    "propBubbleTypeAndWeight can not empty",
                  ),
                t.propBubbleTypeAndWeight.size &&
                  t.propBubbleTypeAndWeight.forEach(function (e, i) {
                    null == e && console.error("value is null", t.id, i);
                    var n = parseInt(i),
                      o = config.Element.getById(n);
                    (o.type != t.type &&
                      console.error(
                        "element:propBubbleTypeAndWeight",
                        t.id,
                        i,
                        "propBubbleTypeAndWeight create not same board type element",
                      ),
                      o.bubbleWait <= 0 &&
                        console.error("element:bubbleWait", i, "bubble not have wait time"),
                      o.bubbleCost <= 0 &&
                        console.error("element:bubbleCost", i, "bubble not have price"));
                  }),
                (n = Array.from(t.elementIdWeight.keys())).sort(function (e, t) {
                  return parseInt(e) - parseInt(t);
                }),
                (o = 0),
                n.forEach(function (e) {
                  (parseInt(e) == o && console.error("element:elementIdWeight", t.id),
                    (o = parseInt(e)));
                }),
                (n = Array.from(t.AutoId.keys())).sort(function (e, t) {
                  return parseInt(e) - parseInt(t);
                }),
                (o = 0),
                n.forEach(function (e) {
                  (parseInt(e) == o && console.error("element:AutoId", t.id), (o = parseInt(e)));
                }),
                t.bubbleRate > 100 && console.error("element:bubbleRate", t.id, t.bubbleRate),
                t.dustRate > 100 && console.error("element:dustRate", t.id, t.dustRate),
                t.sellPriceCoin > 9999 &&
                  console.error("element:sellPriceCoin", t.id, t.sellPriceCoin),
                !t.mergeElementId ||
                  (config.Element.getById(t.mergeElementId) &&
                    config.Element.getById(t.mergeElementId).type == e) ||
                  console.error("element:mergeElementId", t.id),
                t.costEnergy &&
                  1 != t.costEnergy &&
                  console.error("element:costEnergy", t.id, t.costEnergy),
                t.unlockWay &&
                  1 != t.unlockWay &&
                  2 != t.unlockWay &&
                  console.error("element:unlockWay", t.id, t.unlockWay),
                t.canSplit &&
                  1 != t.canSplit &&
                  console.error("element:canSplit", t.id, t.canSplit),
                t.canRecharge &&
                  1 != t.canRecharge &&
                  console.error("element:canRecharge", t.id, t.canRecharge),
                t.dustingCostDiamond &&
                  t.dustingCostDiamond < 0 &&
                  console.error("element:dustingCostDiamond", t.id, t.dustingCostDiamond),
                t.mergeExtra && !config.Element.getById(t.mergeExtra)
                  ? console.error("element:mergeExtra", t.id, "not find element")
                  : t.mergeExtra && config.Element.getById(t.mergeExtra).type != e
                    ? console.error("element:mergeExtra", t.id, t.mergeExtra)
                    : !t.bubbleToCoin ||
                      (config.Element.getById(t.bubbleToCoin) &&
                        config.Element.getById(t.bubbleToCoin).type == e) ||
                      console.error("element:bubbleToCoin", t.id, t.bubbleToCoin),
                t.propBubbleRate > 1e3 &&
                  console.error("element:propBubbleRate", t.id, t.propBubbleRate),
                t.autoVanishChange.forEach(function (i, n) {
                  null == i && console.error("value is null", t.id, n);
                  var o = parseInt(n);
                  (config.Element.getById(o) && config.Element.getById(o).type == e) ||
                    console.error("element:autoVanishChange", t.id, n);
                }),
                t.ordercompleteChange &&
                  config.Element.getById(t.ordercompleteChange).type != e &&
                  console.error("element:ordercompleteChange", t.id, t.ordercompleteChange),
                t.elementIdList.forEach(function (i) {
                  (i && config.Element.getById(i) && config.Element.getById(i).type == e) ||
                    console.error("element:elementIdList", t.id, i);
                }),
                t.AutoIdList.forEach(function (i) {
                  (i && config.Element.getById(i) && config.Element.getById(i).type == e) ||
                    console.error("element:autoIdList", t.id, i);
                }),
                [2]
              );
            });
          });
        }),
        console.warn(">>>>>> element检查完毕 >>>>>>"));
      var i = [];
      (config.ElementSeries.list.forEach(function (e, t) {
        if (
          (null == e.tutorialElementOrder
            ? console.error("elementSeries:tutorialElementOrder is null", e.series)
            : e.tutorialElementOrder.forEach(function (t, i) {
                config.Element.getById(t) ||
                  console.error("elementSeries:tutorialElementOrder", e.series, t);
              }),
          e.order && -1 == i.indexOf(e.order))
        ) {
          var n = config.ElementSeries.list.find(function (t) {
            return (
              t.order == e.order &&
              t.series != e.series &&
              t.belongIllustratedHandbook &&
              e.belongIllustratedHandbook &&
              e.elementSeriesColumnId &&
              t.elementSeriesColumnId &&
              e.elementSeriesColumnId == t.elementSeriesColumnId
            );
          });
          n &&
            (console.warn(
              "%c elementSeries:order" +
                e.series +
                "  " +
                e.order +
                " ------ " +
                n.series +
                "  " +
                n.order,
              "color: blue",
            ),
            i.push(e.order));
        }
        0 == e.elementSeriesColumnId ||
          config.ElementSeriesColumn.getById(e.elementSeriesColumnId) ||
          console.error("elementSeries:elementSeriesColumnId", e.series, e.elementSeriesColumnId);
      }),
        console.warn(">>>>>> elementSeries检查完毕 >>>>>>"),
        config.Goose.list.forEach(function (e, t) {
          (e.gift.forEach(function (t, i) {
            t > 6666 && console.error("goose:Gift", e.id, i);
          }),
            e.unlockReward.forEach(function (t, i) {
              t > 1e3 && console.error("goose:unlockReward", e.id, i);
            }),
            e.useAdornSkin.forEach(function (t, i) {
              config.AdronSkin.getById(t) || console.error("goose:useAdornSkin", e.id, t);
            }),
            9001 === e.id &&
              null != e.icon &&
              e.icon.startsWith("goose") &&
              console.error("goose:icon", e.id, e.icon));
        }),
        console.warn(">>>>>> goose检查完毕 >>>>>>"),
        config.Order.list.forEach(function (e, t) {
          (e.unlock
            ? e.unlock[0]
              ? e.unlock.forEach(function (t, i) {
                  var n = t.match(/[A-Za-z]*/)[0],
                    o = parseInt(t.match(/[0-9]\d*/)[0]);
                  ("PlayerLevel" == n ||
                    "FinishOrder" == n ||
                    "Timestamp" == n ||
                    "UnlockDrawer" == n ||
                    "FinishDrawer" == n ||
                    n.startsWith("CreateVersion") ||
                    console.error("order:unlock", e.id, t),
                    "FinishOrder" == n &&
                      (UT.getOrderConf(o) || console.error("order:unlock", e.id, t)));
                })
              : console.warn("未配置解锁条件，如果是回流订单忽略即可", e)
            : console.error("order:unlock is null", e),
            e.demand
              ? e.demand.forEach(function (t, i) {
                  if (config.Element.getById(parseInt(i))) {
                    !config.Element.getById(parseInt(i)).dailyValue &&
                      [
                        70001, 99106, 70002, 70003, 70004, 8113, 82912, 83912, 4003, 4001, 4002,
                        4004, 70101, 70201, 1001, 70311, 70501, 70601, 70701,
                      ].indexOf(parseInt(i)) < 0 &&
                      console.error("order:dailyValue", e.id, i);
                  } else console.error("order:demand", e.id, i);
                  t > 10 && console.error("order:demand", e.id, i);
                })
              : console.error("order:demand is null", e),
            e.reward
              ? e.reward.forEach(function (t, i) {
                  t > 99 &&
                    console.warn(
                      "%c order:reward is more than 99 " + e.id + " " + i,
                      "color: blue",
                    );
                })
              : console.error("order:reward is null", e));
        }),
        console.warn(">>>>>> order检查完毕 >>>>>>"),
        config.DialogGroup.list.forEach(function (e, t) {
          1 == e.type
            ? e.dialogId.forEach(function (t, i) {
                config.Dialog.getById(t) ||
                  console.error("dialogGroup:dialogId", e.id, "dialogId not found");
              })
            : console.error("dialogGroup:type", e.id, "Type not supported");
        }),
        console.warn(">>>>>> dialogGroup检查完毕 >>>>>>"),
        config.PlayerLevel.list.forEach(function (e, t) {
          var i = e.reward;
          K6.ParseItemsConf(i);
        }),
        config.PlayerLevelReward.list.forEach(function (e, t) {
          var i = e.reward;
          K6.ParseItemsConf(i);
        }),
        console.warn(">>>>>> playerLevel检查完毕 >>>>>>"),
        config.Shop.list.forEach(function (e, t) {
          e.goods &&
            e.goods.forEach(function (t, i) {
              if ("Energy" == i || "Diamond" == i || "Coin" == i || "ADCard" == i)
                t > 666666 &&
                  console.warn(
                    "%c shop:goods is more than 666666 id:" + e.id + " " + i,
                    "color: blue",
                  );
              else {
                var n = parseInt(i);
                config.Element.getById(n)
                  ? t > 99 && console.error("shop:goods is more than 99", e.id, i)
                  : console.warn(
                      "%c shop:goods not found element id:" + e.id + " " + i,
                      "color: blue",
                    );
              }
            });
        }),
        console.warn(">>>>>> shop检查完毕 >>>>>>"));
      var n = [];
      (config.ShopColumn.list.forEach(function (e, t) {
        if (e.show && -1 == n.indexOf(e.show)) {
          var i = config.ShopColumn.list.find(function (t) {
            return t.show == e.show && t.event && e.event && t.event != e.event;
          });
          i &&
            (console.warn(
              "%c shopColumn:show is same show:" +
                e.id +
                " " +
                e.show +
                " ------- " +
                i.id +
                " " +
                i.show,
              "color: blue",
            ),
            n.push(e.show));
        }
      }),
        console.warn(">>>>>> shopColumn检查完毕 >>>>>>"),
        config.SpecialOffer.list.forEach(function (e, t) {
          e.content.forEach(function (t, i) {
            ("Energy" != i && "Diamond" != i && "Coin" != i) ||
              (t > 666666 &&
                console.warn("%c specialOffer:content " + e.id + " " + i, "color: blue"));
          });
        }),
        console.warn(">>>>>> specialOffer检查完毕 >>>>>>"),
        config.TaskDaily.list.forEach(function (e, t) {
          (e.demandElementld.forEach(function (t, i) {
            config.Element.getById(parseInt(i)) ||
              console.error("taskDaily:demandElementld", e.id, i);
          }),
            e.reward.forEach(function (t, i) {
              config.Element.getById(parseInt(i)) || console.error("taskDaily:reward", e.id, i);
            }));
        }),
        console.warn(">>>>>> taskDaily检查完毕 >>>>>>"),
        config.Board.list.forEach(function (e, t) {
          var i = 0;
          (e.element.forEach(function (e, t) {
            i++;
            var n = 0;
            (e.forEach(function (e, t) {
              n++;
              var i = e.split(":"),
                o = parseInt(i[0]),
                r = parseInt(i[1]),
                a = parseInt(i[2]);
              (config.Element.getById(o) || 0 == o || console.error("board:element", o, e),
                r > 3 && console.error("board:element", o, e),
                (a > 4 || a < 1) && 0 != o && console.error("board:element", o, e));
            }),
              7 != n && console.error("board:element", "x not enough", n));
          }),
            9 != i && console.error("board:element", "y not enough", i));
        }),
        console.warn(">>>>>> board检查完毕 >>>>>>"),
        config.DialogGroup.list.forEach(function (e, t) {
          e.dialogId.forEach(function (t, i) {
            config.Dialog.getById(t) ||
              console.error("dialogGroup:dialogId", e.id, "dialogId not found");
          });
        }),
        console.warn(">>>>>> dialogGroup检查完毕 >>>>>>"),
        config.OrderSpecial.list.forEach(function (e, t) {
          (null == e.unlockOrderId
            ? console.error("orderSpecial:unlockOrderId is null", e.id)
            : e.unlockOrderId.forEach(function (t, i) {
                config.OrderSpecial.getById(t) ||
                  console.error("orderSpecial:unlockOrderId", e.id, "unlockOrderId not found");
              }),
            null == e.demand
              ? console.error("orderSpecial:demand is null", e.id)
              : e.demand.forEach(function (t, i) {
                  config.Element.getById(parseInt(i)) ||
                    console.error("orderSpecial:demand", e.id, "demand not found element");
                }),
            null == e.reward
              ? console.error("orderSpecial:reward is null", e.id)
              : e.reward.forEach(function (t, i) {
                  "Coin" == i ||
                    "Energy" == i ||
                    "Diamond" == i ||
                    "Star" == i ||
                    "Exp" == i ||
                    "RankPoint" == i ||
                    config.Element.getById(parseInt(i)) ||
                    console.error("orderSpecial:reward", e.id, "reward not found element");
                }));
        }),
        console.warn(">>>>>> orderSpecial检查完毕 >>>>>>"),
        config.DuanwuOrder.list.forEach(function (e, t) {
          (e.unlockOrderId.forEach(function (t, i) {
            config.OrderSpecial.getById(t) ||
              console.error("duanwuOrder:unlockOrderId", e.id, "unlockOrderId not found");
          }),
            e.demand1.forEach(function (t, i) {
              config.Element.getById(parseInt(i)) ||
                console.error("duanwuOrder:demand", e.id, "demand not found element");
            }),
            e.demand2.forEach(function (t, i) {
              config.Element.getById(parseInt(i)) ||
                console.error("duanwuOrder:demand", e.id, "demand not found element");
            }),
            e.reward.forEach(function (t, i) {
              "EventCoinA" == i ||
                "Coin" == i ||
                "Star" == i ||
                config.Element.getById(parseInt(i)) ||
                console.error("duanwuOrder:reward", e.id, "reward not found element");
            }));
        }),
        console.warn(">>>>>> duanwuOrder检查完毕 >>>>>>"));
      var o = new Map();
      (config.Shop.list.forEach(function (e, t) {
        o.get(e.id) ? console.error("存在重复商品id", e.id, "Shop") : o.set(e.id, 1);
      }),
        config.SpecialOffer.list.forEach(function (e, t) {
          o.get(e.id) ? console.error("存在重复商品id", e.id, "SpecialOffer") : o.set(e.id, 1);
        }),
        config.WaterfallOffer.list.forEach(function (e, t) {
          o.get(e.id) ? console.error("存在重复商品id", e.id, "WaterfallOffer") : o.set(e.id, 1);
        }),
        config.WechatOffer.list.forEach(function (e, t) {
          o.get(e.id) ? console.error("存在重复商品id", e.id, "WechatOffer") : o.set(e.id, 1);
        }),
        config.RollingGift.list.forEach(function (e, t) {
          o.get(e.rgID) ? console.error("存在重复商品id", e.rgID, "RollingGift") : o.set(e.rgID, 1);
        }),
        console.warn(">>>>>> 商品id是否重复检查完毕 >>>>>>"),
        config.FrozenElement.list.forEach(function (e, t) {
          e.frozenElement.forEach(function (t, i) {
            t.forEach(function (t, n) {
              config.FrozenConvert.getById(t) || console.error("冰块转换表不存在", e.id, i, t);
            });
          });
        }),
        console.warn(">>>>>> frozenElement检查完毕 >>>>>>"),
        console.warn(">>>>>> 结束检查数据表 >>>>>>"));
    }),
    (e.part3GroupCache = new Map()),
    (e.orderPoolNeedSize = new Map()),
    (e.orderPoolProduct = new Map()),
    (e.orderPoolNeed = new Map()),
    (e.waitCreateList = []),
    (e._elementMultiOrderList = null),
    (e.recycledSeries = []),
    (e._inValidElementMap = new Map()),
    (e._inValidElementArr = []),
    e
  );
})();
