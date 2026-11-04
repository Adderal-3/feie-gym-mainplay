// Original shared-closure declaration GW: BoardConfigParser
// Source UTF-16 offsets 2170872..2196908; complete context in game.formatted.js:105842.
// Analysis fragment; not independently executable.

var GW = (function () {
  function e() {}
  return (
    (e.ParseBoardConfig = function (e) {
      var t = cc.v2(e.cols, e.rows),
        i = e.cellSize,
        n = new PA();
      return (
        (n.mergeBoardSize = t),
        (n.mergeCellSize = i),
        (n.mergeBoardData = e),
        (n.boardType = e.type),
        (n.seed = new oC(e.seed.seed)),
        n
      );
    }),
    (e.ParseBoardCellData = function (t) {
      var i = t.cells,
        n = cc.v2(t.cols, t.rows);
      if (!i) return null;
      for (var o = [], r = n.x * n.y, a = [], s = 1; s <= r; s++) {
        var c = i.get(s);
        c || (h.error("找不到gdcell数据,index:", s), (c = e.CreateGdCell(s)));
        var l = { state: c.state, seed: c.seed, id: c.elementId, productType: c.productType };
        (re(c._shortCdAutoEndTime) && (l._shortCdAutoEndTime = c._shortCdAutoEndTime),
          re(c._shortCdAutoRoundEndTime) &&
            (l._shortCdAutoRoundEndTime = c._shortCdAutoRoundEndTime),
          re(c._shortCdManuEndTime) && (l._shortCdManuEndTime = c._shortCdManuEndTime),
          re(c._shortCdManuRoundEndTime) &&
            (l._shortCdManuRoundEndTime = c._shortCdManuRoundEndTime),
          re(c._shortCdStartTime) && (l._shortCdStartTime = c._shortCdStartTime),
          re(c._shortCdCount) && (l._shortCdCount = c._shortCdCount),
          re(c._shortCdCurNum) && (l._shortCdCurNum = c._shortCdCurNum),
          a.push(l),
          s % n.x == 0 && (o.push(a), (a = [])));
      }
      return o;
    }),
    (e.CreateGdCell = function (e, t) {
      void 0 === t && (t = null);
      var i = new ll();
      return (
        (i.index = e),
        (this.gdCellId += 1),
        (i.client_id = this.gdCellId),
        t && !t.client_uuid && (t.client_uuid = this.gdCellId),
        (i.client_uuid = t ? t.client_uuid : this.gdCellId),
        i
      );
    }),
    (e.AddEmptyBoardCell = function (t) {
      var i = e.CreateGdCell(t);
      e.AddBoardCell(t, i);
    }),
    (e.AddBoardCell = function (e, t) {
      var i = b2.GetElementBoardType(t.elementId);
      G2.MergeBoardType == i &&
        (t.client_id ||
          ((this.gdCellId += 1), (t.client_id = this.gdCellId), (t.client_uuid = this.gdCellId)),
        G2.BoardCells &&
          (G2.BoardCells.set(e, t),
          F8.switches.boardDebugInfo &&
            this.LogDebugInfo &&
            K3.logEvent("board_debug_info", {
              boardType: G2.MergeBoardType,
              index: e,
              elementId: t.elementId,
            })));
    }),
    (e.GetGdcellByUuid = function (e) {
      var t,
        i,
        n = G2.BoardCells;
      try {
        for (var o = s(n.values()), r = o.next(); !r.done; r = o.next()) {
          var a = r.value;
          if (a.client_uuid == e) return a;
        }
      } catch (e) {
        t = { error: e };
      } finally {
        try {
          r && !r.done && (i = o.return) && i.call(o);
        } finally {
          if (t) throw t.error;
        }
      }
      return null;
    }),
    (e.GetCellByUuid = function (e) {
      var t,
        i,
        n = G2.BoardCells,
        o = -1;
      try {
        for (var r = s(n.values()), a = r.next(); !a.done; a = r.next()) {
          var c = a.value;
          if (c.client_uuid == e) {
            o = c.index;
            break;
          }
        }
      } catch (e) {
        t = { error: e };
      } finally {
        try {
          a && !a.done && (i = r.return) && i.call(r);
        } finally {
          if (t) throw t.error;
        }
      }
      return o < 0 ? null : G$.GetCellByIndex(o);
    }),
    (e.ParseCellConfig = function (t, i, n, o) {
      var r, a;
      if ((void 0 === i && (i = 0), void 0 === n && (n = 0), void 0 === o && (o = !1), !t))
        return null;
      var s = null;
      n &&
        (s = G2.BoardCells.get(n)) &&
        ((t.id = s.elementId),
        s.seed > 0 && (t.seed = s.seed),
        s.seedB && (t.seedB = s.seedB),
        (t.state = s.state),
        (t.productType = s.productType),
        (t.openEnd = s.openEnd),
        (t.pauseTime = s.pauseTime),
        (t.deteriorateEnd = s.deteriorateEnd),
        (t.hp = s.hp),
        (t.order = s.order),
        (t.bubbleEnd = s.bubbleEnd),
        (t.productCount = s.productCount),
        (t.autoProductCount = s.autoProductCount),
        (t.orderBegin = s.orderBegin),
        (t.recovery = s.recovery),
        (t.storeBagCell = s.storeBagCell));
      var c = t.id,
        l = t.productType,
        d = new DA(),
        u = config.Element.getById(c);
      if (!u) return (c && h.error("not find cell config, id:", c), null);
      if (
        (TJ.seedLog && console.warn("==========parse", t.seed),
        (d.config = u),
        (d.mergeCellLogics = this.ParseCellLogic(d, s, t)),
        (d.mergeCellIconUrl = u.prefab
          ? e9.getElementTexturePath(u.prefab)
          : e9.getElementTexturePath(c)),
        i && (d.mergeCell = G$.GetCellByIndex(i)),
        n && (d.mergeCell = G$.GetCellByIndex(n)),
        (d.elementType = this.ParseCellType(d, s, t)),
        i)
      ) {
        var p = e.CreateGdCell(i, t.lastGdcell ? t.lastGdcell : null);
        if (
          ((p.elementId = d.config.id),
          (p.state = t.state),
          (p.productType = l),
          (p.bubbleEnd = t.bubbleEnd ? t.bubbleEnd : 0),
          (p.deteriorateEnd = t.deteriorateEnd
            ? t.deteriorateEnd
            : u.deterioratedDuration
              ? E8.serverTime + 1e3 * u.deterioratedDuration
              : 0),
          (p.openEnd = t.openEnd ? t.openEnd : 0),
          (p.pauseTime = t.pauseTime ? t.pauseTime : 0),
          (p.order = t.order ? t.order : new Zc()),
          (p.orderBegin = t.orderBegin ? t.orderBegin : []),
          (p.endTime = t.endTime ? t.endTime : 0),
          (p.productCount = t.productCount ? t.productCount : 0),
          (p.autoProductCount = t.autoProductCount ? t.autoProductCount : 0),
          (p.skills = t.skills ? t.skills : new Map()),
          t.seed > 0 && (p.seed = t.seed),
          t.seedB > 0 && (p.seedB = t.seedB),
          (t._shortCdAutoEndTime || 0 === t._shortCdAutoEndTime) &&
            (p._shortCdAutoEndTime = t._shortCdAutoEndTime),
          (t._shortCdAutoRoundEndTime || 0 === t._shortCdAutoRoundEndTime) &&
            (p._shortCdAutoRoundEndTime = t._shortCdAutoRoundEndTime),
          (t._shortCdManuEndTime || 0 === t._shortCdManuEndTime) &&
            (p._shortCdManuEndTime = t._shortCdManuEndTime),
          (t._shortCdManuRoundEndTime || 0 === t._shortCdManuRoundEndTime) &&
            (p._shortCdManuRoundEndTime = t._shortCdManuRoundEndTime),
          (t._shortCdStartTime || 0 === t._shortCdStartTime) &&
            (p._shortCdStartTime = t._shortCdStartTime),
          (t._shortCdCount || 0 === t._shortCdCount) && (p._shortCdCount = t._shortCdCount),
          (t._shortCdCurNum || 0 === t._shortCdCurNum) && (p._shortCdCurNum = t._shortCdCurNum),
          t._speedUpStartTime && (p._speedUpStartTime = t._speedUpStartTime),
          t.extra && (p.extra = t.extra),
          t.hp && (p.hp = t.hp),
          t.storeBagCell &&
            (p.storeBagCell = this.ParseStoreBagCell(
              t.storeBagCell,
              null === (r = t.lastGdcell) || void 0 === r ? void 0 : r.storeBagCell,
            )),
          t.recovery)
        )
          ((p.recovery = t.recovery), G2.convertRecovery(p));
        else {
          (this.ClearRecoverTimer(p.index),
            l == vr.frozenBubble
              ? (p.bubbleEnd = config.FrozenConvert.getById(u.id).elementTime)
              : l == vr.adBubble || l == vr.challengeBubble
                ? (p.bubbleEnd = -1)
                : d.elementType.includes(Z2.BUBBLE) &&
                  (p.bubbleEnd = E8.serverTime + 1e3 * u.bubbleWait),
            d.elementType.includes(Z2.AUTO_UNLOCK) &&
              (p.openEnd =
                E8.serverTime + 1e3 * G$.getELementUnlockDuration(u.id, u.unlockDuration)),
            d.elementType.includes(Z2.DETERIORATED) &&
              (p.deteriorateEnd = E8.serverTime + 1e3 * u.deterioratedDuration));
          for (var f = config.ChessBoard5Info.list, g = 0; g < f.length; ++g) {
            var v =
              t.inBubble &&
              (t.productType == vr.bubble ||
                t.productType == vr.adBubble ||
                t.productType == vr.challengeBubble ||
                t.productType == vr.goldenBubble);
            if (d.config.id == f[g].definiteSeed && !v) {
              var m = -1;
              if ((_ = G2.Data.buff))
                ((b = _.get(u.id)) && b < 0 && (m = -b),
                  (m = (w = new oC(m)).randomInt(1, 1e5)),
                  _.set(u.id, -w.seed));
              m > 0 && (p.seed = m);
            }
          }
          var y = config.ElementMultiPoolLch.getById(u.id);
          if (
            (null != y &&
              (null === (a = y.randomPool) || void 0 === a ? void 0 : a.length) > 0 &&
              p.extra.set(fr.cellMultiPoolSeed, p.seed.toString()),
            d.elementType.includes(Z2.MANU_CREATOR))
          ) {
            if (
              (((x = new el()).id = i + "_" + d.config.id + "_" + yr.manualProduct),
              (M = kA.changeElementData(d.config.id)) && M.elementRecoverRateAct
                ? (x.interval = M.elementRecoverRateAct)
                : (x.interval = u.elementRecoverRate),
              (x.value = u.elementCDStorage),
              (x.valueMax = u.elementStorage),
              (x.intervalValue = 1),
              (x.startTime = 0),
              (x.pauseTime = 0),
              X8.isShovel(u.id))
            ) {
              var _, b, w;
              m = -1;
              if ((_ = G2.Data.buff))
                ((b = _.get(u.id)) && b < 0 && (m = -b),
                  (m = (w = new oC(m)).randomInt(1, 1e5)),
                  _.set(u.id, -w.seed));
              if (m > 0) {
                p.seed = m;
                var C = [];
                X8.changeElementWeight(u.id).forEach(function (e, t) {
                  var i = t.split("_"),
                    n = parseInt(i[0]);
                  C.push({ item: n, weight: e });
                });
                var I = new oC(m),
                  S = TJ.BoardRandomElementBySeed(C, I),
                  T = X8.getRareConfByElementId(S),
                  E = I.randomInt(T.elementStorageRange[0], T.elementStorageRange[1]);
                (p.extra.set(fr.chess4VegetableID, "" + S), (x.value = E));
              }
            }
            if (
              (t.state &&
                (t.state & mr.web) == mr.web &&
                0 == u.elementOrderId &&
                (x.value = u.elementStorage),
              d.elementType.includes(Z2.CHEST) &&
                90902 != d.config.id &&
                "Chest_Pig" != d.config.series &&
                !y &&
                t.sourceData &&
                t.targetData)
            ) {
              if (t.sourceData.recovery && t.targetData.recovery) {
                var A = t.sourceData.recovery.get(yr.manualProduct),
                  k = t.targetData.recovery.get(yr.manualProduct);
                if (A && k) {
                  var R = A.valueMax - A.value,
                    P = k.valueMax - k.value;
                  x.value -= R + P;
                }
              }
            } else if (
              d.elementType.includes(Z2.CHEST) &&
              90902 != d.config.id &&
              ("Chest_Pig" == d.config.series || y) &&
              t.sourceData &&
              t.targetData
            ) {
              if (t.sourceData.recovery && t.targetData.recovery) {
                ((A = t.sourceData.recovery.get(yr.manualProduct)),
                  (k = t.targetData.recovery.get(yr.manualProduct)));
                if (A && k) {
                  var D = Math.ceil(
                    ((A.value + k.value) / (A.valueMax + k.valueMax)) * u.elementStorage,
                  );
                  x.value = D;
                }
              }
            } else if (!d.elementType.includes(Z2.CHEST) && t.sourceData && t.targetData) {
              ((A = t.sourceData.recovery.get(yr.manualProduct)),
                (k = t.targetData.recovery.get(yr.manualProduct)));
              if (A && k) {
                var B = t.sourceData.elementId;
                if (X8.isFarmCreator(B)) {
                  var L = t.mergeFromWeb;
                  (D = Math.ceil(
                    ((A.value + (L ? 0 : k.value)) / (A.valueMax + k.valueMax)) * u.elementStorage,
                  )) >= u.elementStorage
                    ? (x.value = u.elementStorage)
                    : (x.value = D);
                } else {
                  ((G = A.value + k.value) > u.elementCDStorage && G < u.elementMaxStorage
                    ? (x.value = G)
                    : G >= u.elementMaxStorage && (x.value = u.elementMaxStorage),
                    h.warn("merge manualcount", x.value));
                }
              }
            }
            if (u.elementShortCD && !p._shortCdManuEndTime) {
              var N = !0;
              (t.sourceData &&
              t.targetData &&
              config.Element.getById(t.sourceData.elementId).elementShortCD &&
              config.Element.getById(t.targetData.elementId).elementShortCD &&
              !this.HaveShortCd(t.sourceData, yr.manualProduct) &&
              !this.HaveShortCd(t.targetData, yr.manualProduct) &&
              t.sourceData.recovery.get(yr.manualProduct) &&
              t.targetData.recovery.get(yr.manualProduct) &&
              t.sourceData.recovery.get(yr.manualProduct).value >=
                t.sourceData.recovery.get(yr.manualProduct).valueMax &&
              t.targetData.recovery.get(yr.manualProduct).value >=
                t.targetData.recovery.get(yr.manualProduct).valueMax
                ? (N = !1)
                : u.elementShortCD || (N = !1),
                N && this.AddShortCd(p, yr.manualProduct, x.value, 0));
            }
            var O = null;
            (o ? (O = x) : (O = new U$()).onData(x), p.recovery.set(yr.manualProduct, O));
          }
          if (d.elementType.includes(Z2.AUTO_CREATOR)) {
            var x, M;
            if (
              (((x = new el()).id = i + "_" + d.config.id + "_" + yr.autoProduct),
              (M = kA.changeElementData(d.config.id)) && M.AutoIntervalAct
                ? (x.interval = M.AutoIntervalAct)
                : (x.interval = u.AutoInterval),
              (x.value = Math.max(1, u.AutoCDStorage || 1)),
              (x.valueMax = u.AutoStorage),
              (x.intervalValue = 1),
              (x.startTime = 0),
              (x.pauseTime = 0),
              t.state &&
                (t.state & mr.web) == mr.web &&
                0 == u.elementOrderId &&
                (x.value = u.AutoStorage),
              d.elementType.includes(Z2.CHEST) &&
                90902 != d.config.id &&
                t.sourceData &&
                t.targetData)
            ) {
              ((A = t.sourceData.recovery.get(yr.autoProduct)),
                (k = t.targetData.recovery.get(yr.autoProduct)),
                (R = A.valueMax - A.value),
                (P = k.valueMax - k.value));
              x.value -= R + P;
            } else if (!d.elementType.includes(Z2.CHEST) && t.sourceData && t.targetData) {
              var G;
              ((A = t.sourceData.recovery.get(yr.autoProduct)),
                (k = t.targetData.recovery.get(yr.autoProduct)));
              if (A && k)
                ((G =
                  (t.sourceData.productType == vr.frozenBubble ? 0 : A.value) +
                  (t.targetData.productType == vr.frozenBubble ? 0 : k.value)) > 1 &&
                G < u.AutoMaxStorage
                  ? (x.value = G)
                  : G >= u.AutoMaxStorage && (x.value = u.AutoMaxStorage),
                  h.warn("merge autocount", x.value));
            }
            if (u.AutoShortCD && !p._shortCdAutoEndTime) {
              N = !0;
              (t.sourceData &&
              t.targetData &&
              config.Element.getById(t.sourceData.elementId).AutoShortCD &&
              config.Element.getById(t.targetData.elementId).AutoShortCD &&
              !this.HaveShortCd(t.sourceData, yr.autoProduct) &&
              !this.HaveShortCd(t.targetData, yr.autoProduct) &&
              t.sourceData.recovery.get(yr.autoProduct) &&
              t.targetData.recovery.get(yr.autoProduct) &&
              t.sourceData.recovery.get(yr.autoProduct).value >=
                t.sourceData.recovery.get(yr.autoProduct).valueMax &&
              t.targetData.recovery.get(yr.autoProduct).value >=
                t.targetData.recovery.get(yr.autoProduct).valueMax &&
              !config.OneTimeStorage.getById(t.sourceData.elementId)
                ? (N = !1)
                : u.AutoShortCD || (N = !1),
                N && this.AddShortCd(p, yr.autoProduct, 1));
            }
            O = null;
            (o ? (O = x) : (O = new U$()).onData(x), p.recovery.set(yr.autoProduct, O));
          }
          d.elementType.includes(Z2.CHEST) &&
            p.state != mr.web &&
            p.state != mr.box &&
            (u.unlockDuration ? (p.state = mr.none) : (p.state = mr.opened));
        }
        var F = u.propEffect ? ~~(u.propEffect / 100) : 0;
        if (8 == F)
          t.endTime || (t.sourceData && t.targetData)
            ? t.sourceData &&
              t.targetData &&
              (p.endTime = t.sourceData.endTime + t.targetData.endTime)
            : (p.endTime = 1e3 * config.PropEffect.getById(u.propEffect).effectValue);
        else if (7 == F || 9 == F)
          t.sourceData &&
            t.targetData &&
            (p.endTime = t.sourceData.endTime + t.targetData.endTime + 1);
        else if (3 == F && 303 == u.propEffect) {
          if (t.sourceData && t.targetData) {
            B = t.sourceData.elementId;
            var W = config.Element.getById(B);
            W && 303 == W.propEffect
              ? (p.endTime = t.sourceData.endTime + t.targetData.endTime + 1)
              : (p.endTime = 0);
          }
        } else if (15 == F && !t.endTime) {
          var U = config.PropEffect.getById(u.propEffect);
          U && U.effectParams && (p.endTime = U.effectParams);
        }
        if (0 == p.hp.size && (u.vanishTimes > 0 || u.autoVanishTimes > 0)) {
          var H = u.vanishTimes > 0 ? u.vanishTimes : -1,
            V = u.autoVanishTimes > 0 ? u.autoVanishTimes : -1;
          (p.hp.set(yr.autoProduct, V), p.hp.set(yr.manualProduct, H));
        }
        var j = p.recovery.get(yr.manualProduct),
          z = p.recovery.get(yr.autoProduct);
        if (j && 0 == j.interval && !d.elementType.includes(Z2.ORDER) && p.hp.size > 0) {
          H = p.hp.get(yr.manualProduct);
          j.value < H && p.hp.set(yr.manualProduct, j.value);
        }
        if (z && 0 == z.interval && !d.elementType.includes(Z2.ORDER) && p.hp.size > 0) {
          H = p.hp.get(yr.autoProduct);
          z.value < H && p.hp.set(yr.autoProduct, z.value);
        }
        o
          ? (d.sendData = p)
          : (e.AddBoardCell(i, p),
            (this.HaveShortCd(p, yr.manualProduct) || this.HaveShortCd(p, yr.autoProduct)) &&
              G2.recordBoardShortCd(!1, p.index));
      }
      return (n && e.AddBoardCell(n, d.remoteData), this._parseCellPostProcess(d), d);
    }),
    (e._parseCellPostProcess = function (e) {
      var t,
        n = this,
        o =
          (null === (t = e.remoteData) || void 0 === t ? void 0 : t.extra) &&
          e.remoteData.extra.get(fr.areaLock);
      if (
        G2.MergeBoardType == U2.getBoardType() &&
        (e.elementLockStage & mr.web) != mr.web &&
        (e.elementLockStage & mr.box) != mr.box &&
        !o
      ) {
        var s = U2.getActivityGlobalActivity(),
          c = U2.getActivity();
        if (s && c)
          for (
            var l = config.ChessBoardDialog.getById(s.content),
              u = function (t) {
                var i,
                  o = l.GetElement[t].split(":"),
                  s = parseInt(o[0]),
                  c = parseInt(o[1]);
                if (s == e.config.id && !U2.getActivityOnceData(O2.Normal, 4 + t)) {
                  return (
                    (i = t),
                    r(n, void 0, void 0, function () {
                      return a(this, function (e) {
                        switch (e.label) {
                          case 0:
                            return [4, C4.view.waitClose()];
                          case 1:
                            return (e.sent(), [4, bw.talk(c)]);
                          case 2:
                            return (e.sent(), Hv.setOnce({ num: O2.Normal, onceBit: 4 + i }), [2]);
                        }
                      });
                    }),
                    "break"
                  );
                }
              },
              p = 0;
            p < l.GetElement.length;
            p++
          ) {
            if ("break" === u(p)) break;
          }
      }
      if (
        G2.MergeBoardType == ar.main &&
        (e.elementLockStage & mr.web) != mr.web &&
        (e.elementLockStage & mr.box) != mr.box &&
        !o
      ) {
        if (E8.role.branchTask && E8.role.branchTask.id)
          if ((v = config.OrderBranchList.getById(E8.role.branchTask.id)))
            for (p = 0; p < v.GetElement.length; p++) {
              var f = v.GetElement[p].split(":");
              if ((E = parseInt(f[0])) == e.config.id && !bA.getOnceData(0, 2 + p)) {
                bA.showTalk(0, 2 + p);
                break;
              }
            }
          else h.error("发现持有不存在的支线任务:" + E8.role.branchTask.id + ",可能为脏数据");
        var g = VW.getWorldTaskActivity();
        if (g) {
          var v = config.WorldTaskDialog.getById(g.content);
          for (p = 0; p < v.firstGetMonster.length; p++) {
            f = v.firstGetMonster[p].split(":");
            if ((E = parseInt(f[1])) == e.config.id && !VW.getWorldTaskOnceData(1, p)) {
              VW.showTalk(parseInt(f[0]));
              break;
            }
          }
        }
        var m = config.ElementDialog.getById(e.config.id);
        if (m && m.GetElement && !E8.checkOnceData(ga.elementDialog, m.num[1])) {
          r(n, void 0, void 0, function () {
            return a(this, function (e) {
              switch (e.label) {
                case 0:
                  return [4, C4.view.waitClose()];
                case 1:
                  return (
                    e.sent(),
                    E8.offOnceData(ga.elementDialog, m.num[1]),
                    bw.talk(m.GetElement),
                    [2]
                  );
              }
            });
          });
        }
        if ((c = E8.getGlobalActivity(Gr.actTypeButterfly)[0]))
          (v = config.OrderSpecialList.getById(c.content)) &&
            v.GetElement &&
            v.GetElement.forEach(function (t, i) {
              i == e.config.id.toString() && hJ.showDialog(t);
            });
      }
      if (
        G2.MergeBoardType == _A.getBoardType() &&
        (e.elementLockStage & mr.web) != mr.web &&
        (e.elementLockStage & mr.box) != mr.box &&
        !o &&
        (c = _A.getGlobalHealthFood())
      )
        for (
          v = config.FoodBoardDialog.getByEventId(c.content), p = 0;
          p < v.GetElement.length;
          p++
        ) {
          f = v.GetElement[p].split(":");
          if (
            (E = parseInt(f[0])) == e.config.id &&
            !_A.getHealthFoodOnceData(hA.CreateElement, p)
          ) {
            _A.showTalk(parseInt(f[1]), hA.CreateElement, p);
            break;
          }
        }
      if (
        G2.MergeBoardType == H2.getBoardType() &&
        (e.elementLockStage & mr.web) != mr.web &&
        (e.elementLockStage & mr.box) != mr.box &&
        !o
      ) {
        var y = H2.getActivityGlobalActivity();
        c = H2.getActivity();
        if (y && c) {
          l = config.Chess2BoardDialog.getById(y.content);
          var _ = function (t) {
            var i,
              o = l.GetElement[t].split(":"),
              s = parseInt(o[0]),
              c = parseInt(o[1]);
            if (s == e.config.id && !H2.getActivityOnceData(O2.Normal, 4 + t)) {
              return (
                (i = t),
                r(n, void 0, void 0, function () {
                  return a(this, function (e) {
                    switch (e.label) {
                      case 0:
                        return [4, C4.view.waitClose()];
                      case 1:
                        return (e.sent(), [4, bw.talk(c)]);
                      case 2:
                        return (
                          e.sent(),
                          hm.setOnce({ aid: y.id, num: O2.Normal, onceBit: 4 + i }),
                          [2]
                        );
                    }
                  });
                }),
                "break"
              );
            }
          };
          for (p = 0; p < l.GetElement.length; p++) {
            if ("break" === _(p)) break;
          }
        }
      }
      if (
        G2.MergeBoardType == DC.getBoardType() &&
        (e.elementLockStage & mr.web) != mr.web &&
        (e.elementLockStage & mr.box) != mr.box &&
        !o
      ) {
        var b = DC.getActivityGlobalActivity();
        c = DC.getActivity();
        if (b && c) {
          l = config.ChessBoard3Dialog.getById(b.content);
          var w = function (t) {
            var i,
              o = l.GetElement[t].split(":"),
              s = parseInt(o[0]),
              c = parseInt(o[1]);
            if (s == e.config.id && !DC.getActivityOnceData(O2.Normal, 4 + t)) {
              return (
                (i = t),
                r(n, void 0, void 0, function () {
                  return a(this, function (e) {
                    switch (e.label) {
                      case 0:
                        return [4, C4.view.waitClose()];
                      case 1:
                        return (e.sent(), [4, bw.talk(c)]);
                      case 2:
                        return (
                          e.sent(),
                          hm.setOnce({ aid: b.id, num: O2.Normal, onceBit: 4 + i }),
                          [2]
                        );
                    }
                  });
                }),
                "break"
              );
            }
          };
          for (p = 0; p < l.GetElement.length; p++) {
            if ("break" === w(p)) break;
          }
        }
      }
      if (
        G2.MergeBoardType == X8.getBoardType() &&
        (e.elementLockStage & mr.web) != mr.web &&
        (e.elementLockStage & mr.box) != mr.box &&
        !o
      ) {
        var C = X8.getActivityGlobalActivity();
        c = X8.getActivity();
        if (C && c) {
          l = X8.getConf();
          var I = function (t) {
            var i,
              o = l.GetElement[t].split(":"),
              s = parseInt(o[0]),
              c = parseInt(o[1]);
            if (s == e.config.id && !X8.getActivityOnceData(z8.Normal, 4 + t)) {
              return (
                (i = t),
                r(n, void 0, void 0, function () {
                  return a(this, function (e) {
                    switch (e.label) {
                      case 0:
                        return [4, C4.view.waitClose()];
                      case 1:
                        return (e.sent(), [4, bw.talk(c)]);
                      case 2:
                        return (
                          e.sent(),
                          hm.setOnce({ aid: C.id, num: z8.Normal, onceBit: 4 + i }),
                          [2]
                        );
                    }
                  });
                }),
                "break"
              );
            }
          };
          for (p = 0; p < l.GetElement.length; p++) {
            if ("break" === I(p)) break;
          }
        }
      }
      if (FE.isPassShowInBoard(G2.MergeBoardType)) {
        var S = FE.getEventPassActivity();
        if (S) {
          v = config.PassDialog.getById(S.content);
          var T = -1;
          for (p = 0; p < v.firstGetElement.length; p++) {
            f = v.firstGetElement[p].split(":");
            var E = parseInt(f[0]),
              A = parseInt(f[1]);
            E == e.config.id && (T = A);
          }
          var k = !0;
          for (p = 0; p < v.firstGetElement.length; ++p)
            if (FE.getEventPassOnceData(1, p)) {
              k = !1;
              break;
            }
          k && T > 0 && FE.showTalk(T);
        }
      }
      if (
        G2.MergeBoardType == EA.getBoardType() &&
        (e.elementLockStage & mr.web) != mr.web &&
        (e.elementLockStage & mr.box) != mr.box &&
        !o
      ) {
        var R = EA.getGlobalActivity();
        c = EA.getActivity();
        if (R && c) {
          l = config.WarehouseDialog.getById(R.content);
          var P = function (t) {
            var i,
              o = l.GetElement[t].split(":"),
              s = parseInt(o[0]),
              c = parseInt(o[1]);
            if (s == e.config.id && !EA.getActivityOnceData(wA.getEle, t)) {
              return (
                (i = t),
                r(n, void 0, void 0, function () {
                  return a(this, function (e) {
                    switch (e.label) {
                      case 0:
                        return [4, C4.view.waitClose()];
                      case 1:
                        return (e.sent(), [4, bw.talk(c)]);
                      case 2:
                        return (
                          e.sent(),
                          hm.setOnce({ aid: R.id, num: wA.getEle, onceBit: i }),
                          [2]
                        );
                    }
                  });
                }),
                "break"
              );
            }
          };
          for (p = 0; p < l.GetElement.length; p++) {
            if ("break" === P(p)) break;
          }
        }
      }
      (NE.instance &&
        NE.instance.boardType == G2.MergeBoardType &&
        (e.elementLockStage & mr.web) != mr.web &&
        (e.elementLockStage & mr.box) != mr.box &&
        !o &&
        NE.instance.triggerTalk(RE.getElement, e.config.id),
        m2.instance &&
          m2.instance.boardType == G2.MergeBoardType &&
          (e.elementLockStage & mr.web) != mr.web &&
          (e.elementLockStage & mr.box) != mr.box &&
          !o &&
          m2.instance.triggerTalk(p2.getElement, e.config.id),
        dI.instance &&
          dI.instance.boardType == G2.MergeBoardType &&
          (e.elementLockStage & mr.web) != mr.web &&
          (e.elementLockStage & mr.box) != mr.box &&
          !o &&
          dI.instance.triggerTalk(sI.getElement, e.config.id));
      var D = YE.getStateActivity(ew.START);
      if (D && D.EventPassNewData) {
        var B = YE.getBoardPassId(D.data.id, G2.MergeBoardType, !0);
        B > 0 && B == e.config.id && D.triggerTalk(QE.firstGetElement);
      }
      d.emit(i.OnBoardCellPostProcess, { cell: e });
    }),
    (e.ClearRecoverTimer = function (e) {
      (void 0 === e && (e = -1), -1 == e ? U$.ClearAllBoard() : U$.ClearByIndex(e));
    }),
    (e.ParseStoreBagCell = function (e, t) {
      var i = this;
      return e && e.length
        ? (e.forEach(function (e, n) {
            if (e) {
              var o = i.findOldStoreLauncher(t, e, n);
              o && i.copyShortCdIfMissing(e, o);
            }
          }),
          e)
        : e;
    }),
    (e.findOldStoreLauncher = function (e, t, i) {
      return (
        (e &&
          e.length &&
          t &&
          (e.find(function (e) {
            return e == t || (e && e.elementId == t.elementId && e.uUID == t.uUID);
          }) ||
            e[i])) ||
        null
      );
    }),
    (e.copyShortCdIfMissing = function (e, t) {
      e &&
        t &&
        (!re(e._shortCdAutoEndTime) &&
          re(t._shortCdAutoEndTime) &&
          (e._shortCdAutoEndTime = t._shortCdAutoEndTime),
        !re(e._shortCdAutoRoundEndTime) &&
          re(t._shortCdAutoRoundEndTime) &&
          (e._shortCdAutoRoundEndTime = t._shortCdAutoRoundEndTime),
        !re(e._shortCdManuEndTime) &&
          re(t._shortCdManuEndTime) &&
          (e._shortCdManuEndTime = t._shortCdManuEndTime),
        !re(e._shortCdManuRoundEndTime) &&
          re(t._shortCdManuRoundEndTime) &&
          (e._shortCdManuRoundEndTime = t._shortCdManuRoundEndTime),
        !re(e._shortCdStartTime) &&
          re(t._shortCdStartTime) &&
          (e._shortCdStartTime = t._shortCdStartTime),
        !re(e._shortCdCount) && re(t._shortCdCount) && (e._shortCdCount = t._shortCdCount),
        !re(e._shortCdCurNum) && re(t._shortCdCurNum) && (e._shortCdCurNum = t._shortCdCurNum));
    }),
    (e.ParseCellCofigByData = function (e) {
      var t = this.ParseCellConfig(
        {
          id: e.elementId,
          seed: e.seed,
          seedB: e.seedB,
          state: e.state,
          productType: e.productType,
          order: e.order,
          hp: e.hp,
          recovery: e.recovery,
          openEnd: e.openEnd,
          bubbleEnd: e.bubbleEnd,
          pauseTime: e.pauseTime,
          deteriorateEnd: e.deteriorateEnd,
          endTime: e.endTime,
          skills: e.skills,
          productCount: e.productCount,
          autoProductCount: e.autoProductCount,
          orderBegin: e.orderBegin,
          _shortCdAutoEndTime: e._shortCdAutoEndTime,
          _shortCdAutoRoundEndTime: e._shortCdAutoRoundEndTime,
          _shortCdManuEndTime: e._shortCdManuEndTime,
          _shortCdManuRoundEndTime: e._shortCdManuRoundEndTime,
          _shortCdStartTime: e._shortCdStartTime,
          _shortCdCount: e._shortCdCount,
          _shortCdCurNum: e._shortCdCurNum,
          _speedUpStartTime: e._speedUpStartTime,
          _superSpeedUpStartTime: e._superSpeedUpStartTime,
          lastGdcell: e,
          extra: e.extra,
          storeBagCell: e.storeBagCell,
        },
        e.index,
      );
      return ((t.isOld = !0), h.warn("linkCell", "linkCell:" + t.clientId, t.clientUuid), t);
    }),
    (e.ParseCellConfigByItem = function (e, t) {
      if (!e) return null;
      var i = G$.GetBlankCell();
      if (i.length) {
        var n = !t || t.data || t.isLock ? i[0] : t,
          o = G2.BoardRender.data.randomInt(1, 1e5);
        return this.ParseCellConfig(
          { id: e.itemId, seed: o, state: e.state, productType: vr.channel },
          n.serverIdx,
        );
      }
      return null;
    }),
    (e.ParseCellLogic = function (e, t, i) {
      var n = e.config,
        o = [];
      return (
        o.push("CommonElement"),
        MW.isStoreElementId(n.id)
          ? (o.push("StoreElement"), o)
          : (0 != n.elementOrderId && o.push("OrderElement"),
            99901 == n.id && o.push("BagElement"),
            "Chest" == n.series.split("_")[0] && o.push("ChestElement"),
            1 == n.unlockWay && o.push("ManuUnlockElement"),
            ((n.AutoId && n.AutoId.size > 0) || n.AutoIdList.length) &&
              o.push("AutoCreatorElement"),
            this.IsManuCreator(n) && o.push("ManuCreatorElement"),
            n.getResource && n.getResource.size > 0 && o.push("HarvestElement"),
            (t && t.productType == vr.frozenBubble) ||
            (i && i.productType == vr.frozenBubble) ||
            e.elementType.includes(Z2.FROZEN_BUBBLE)
              ? o.push("FrozenBubbleElement")
              : (t && t.productType == vr.adBubble) ||
                  (i && i.productType == vr.adBubble) ||
                  e.elementType.includes(Z2.AD_BUBBLE)
                ? o.push("AdBubbleElement")
                : (t && t.productType == vr.challengeBubble) ||
                    (i && i.productType == vr.challengeBubble) ||
                    e.elementType.includes(Z2.GOG_BUBBLE)
                  ? o.push("GogBubbleElement")
                  : ((t &&
                      t.bubbleEnd > 0 &&
                      (t.productType == vr.bubble || t.productType == vr.goldenBubble)) ||
                      (i && i.bubbleEnd > 0) ||
                      e.elementType.includes(Z2.BUBBLE)) &&
                    o.push("BubbleElement"),
            (e.config.deterioratedDuration || e.elementType.includes(Z2.DETERIORATED)) &&
              o.push("DeterioratedElement"),
            1 == ~~(n.propEffect / 100) && o.push("PropUnlimitEnergyElement"),
            2 == ~~(n.propEffect / 100) && o.push("PropRechargeElement"),
            3 == ~~(n.propEffect / 100) && o.push("PropScissorsElement"),
            4 == ~~(n.propEffect / 100) && o.push("PropTimeSkipElement"),
            5 == ~~(n.propEffect / 100) && o.push("PropCleanWebElement"),
            6 == ~~(n.propEffect / 100) && o.push("PropSpeedUpElement"),
            7 == ~~(n.propEffect / 100) && o.push("PropLevelUpElement"),
            8 == ~~(n.propEffect / 100) && o.push("PropClockElement"),
            9 == ~~(n.propEffect / 100) && o.push("PropInsideBagElement"),
            (10 != ~~(n.propEffect / 100) && 16 != ~~(n.propEffect / 100)) ||
              o.push("PropHealthFoodButtonElement"),
            11 == ~~(n.propEffect / 100) && o.push("PropSuperSpeedUpElement"),
            12 == ~~(n.propEffect / 100) && o.push("DoorElement"),
            13 == ~~(n.propEffect / 100) && o.push("PropLampElement"),
            14 == ~~(n.propEffect / 100) && o.push("MagicBoxElement"),
            15 == ~~(n.propEffect / 100) && o.push("SuperScissorsElement"),
            15 == ~~(n.propEffect / 100) && o.push("SuperScissorsElement"),
            17 == ~~(n.propEffect / 100) && o.push("BatteryElement"),
            18 == ~~(n.propEffect / 100) && o.push("PropEnergyTowerElement"),
            19 == ~~(n.propEffect / 100) && o.push("PropRiskUpElement"),
            20 == ~~(n.propEffect / 100) && o.push("OrderCaseBoxElement"),
            o)
      );
    }),
    (e.IsManuCreator = function (e) {
      var t = config.ElementMultiPoolLch.getById(e.id);
      return (
        (e.elementIdWeight && e.elementIdWeight.size > 0) ||
        e.elementIdList.length > 0 ||
        "Magic" == e.series ||
        G$.isOrderElementCreator(e.elementOrderId) ||
        LA.checkConf(t)
      );
    }),
    (e.IsAutoCreator = function (e) {
      return (e.AutoId && e.AutoId.size > 0) || e.AutoIdList.length > 0;
    }),
    (e.ParseCellType = function (e, t, i) {
      var n = e.config,
        o = [];
      return (
        o.push(Z2.COMMON),
        MW.isStoreElementId(n.id)
          ? (o.push(Z2.STORE_ELEMENT), o)
          : (0 != n.elementOrderId && o.push(Z2.ORDER),
            "Chest" == n.series.split("_")[0] && o.push(Z2.CHEST),
            n.unlockDuration && 2 == n.unlockWay && o.push(Z2.AUTO_UNLOCK),
            1 == n.unlockWay && o.push(Z2.MANU_UNLOCK),
            ((n.AutoId && n.AutoId.size > 0) || n.AutoIdList.length) && o.push(Z2.AUTO_CREATOR),
            this.IsManuCreator(n) && o.push(Z2.MANU_CREATOR),
            ((t &&
              t.bubbleEnd > 0 &&
              (t.productType == vr.bubble || t.productType == vr.goldenBubble)) ||
              (i && i.bubbleEnd > 0)) &&
              o.push(Z2.BUBBLE),
            ((t && t.productType == vr.adBubble) || (i && i.productType == vr.adBubble)) &&
              (o.push(Z2.AD_BUBBLE), o.push(Z2.BUBBLE)),
            ((t && t.productType == vr.challengeBubble) ||
              (i && i.productType == vr.challengeBubble)) &&
              (o.push(Z2.GOG_BUBBLE), o.push(Z2.BUBBLE)),
            ((t && t.productType == vr.frozenBubble) || (i && i.productType == vr.frozenBubble)) &&
              (o.push(Z2.BUBBLE), o.push(Z2.FROZEN_BUBBLE)),
            ((t && t.deteriorateEnd > 0) || (i && i.deteriorateEnd) || n.deterioratedDuration) &&
              o.push(Z2.DETERIORATED),
            "Prop" == n.series.split("_")[0] && o.push(Z2.PROP),
            o)
      );
    }),
    (e.AddCellType = function (e, t) {
      (e.elementType.includes(t) || e.elementType.push(t),
        (e.mergeCellLogics = this.ParseCellLogic(e)));
    }),
    (e.RemoveCellType = function (e, t) {
      (ee(e.elementType, t), (e.mergeCellLogics = this.ParseCellLogic(e)));
    }),
    (e.AddShortCd = function (e, t, i, n) {
      (void 0 === i && (i = 0), void 0 === n && (n = 0));
      var o = config.Element.getById(e.elementId);
      (t == yr.autoProduct && o.AutoShortCD
        ? ((e._shortCdAutoEndTime = E8.serverTime + o.AutoShortCD * i * 1e3),
          (e._shortCdAutoRoundEndTime = E8.serverTime + 1e3 * o.AutoShortCD))
        : t == yr.manualProduct &&
          o.elementShortCD &&
          i &&
          ((e._shortCdManuEndTime =
            E8.serverTime + o.elementShortCD * (i / o.elementShortCDNum) * 1e3),
          (e._shortCdManuRoundEndTime = 0),
          (e._shortCdStartTime = E8.serverTime),
          (e._shortCdCount = 0),
          (e._shortCdCurNum = n)),
        h.warn("add short cd", e.index, t, i, n));
    }),
    (e.RemoveShortCd = function (e, t) {
      (void 0 === t && (t = null),
        (null != t && t != yr.manualProduct) ||
          ((e._shortCdManuEndTime = null),
          (e._shortCdManuRoundEndTime = null),
          (e._shortCdStartTime = null),
          (e._shortCdCount = null),
          (e._shortCdCurNum = null)),
        (null != t && t != yr.autoProduct) ||
          ((e._shortCdAutoEndTime = null), (e._shortCdAutoRoundEndTime = null)));
    }),
    (e.HaveShortCd = function (e, t) {
      if (e._shortCdAutoEndTime && t == yr.autoProduct) {
        if (!(e._shortCdAutoEndTime < E8.serverTime)) return !0;
        this.RemoveShortCd(e);
      }
      if (e._shortCdAutoRoundEndTime && t == yr.autoProduct) return !0;
      if (e._shortCdManuEndTime && t == yr.manualProduct) {
        if (!(e._shortCdManuEndTime < E8.serverTime)) return !0;
        this.RemoveShortCd(e);
      }
      return (
        !(!e._shortCdManuRoundEndTime || t != yr.manualProduct) ||
        !(!e._shortCdStartTime || t != yr.manualProduct) ||
        !(!e._shortCdCount || t != yr.manualProduct) ||
        !(!e._shortCdCurNum || t != yr.manualProduct)
      );
    }),
    (e.gdCellId = 1e4),
    (e.LogDebugInfo = !0),
    e
  );
})();
