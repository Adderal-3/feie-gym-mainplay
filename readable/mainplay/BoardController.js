// Original shared-closure declaration M2: BoardController
// Source UTF-16 offsets 3725826..3759629; complete context in game.formatted.js:180872.
// Analysis fragment; not independently executable.

var M2 = (function () {
  function e() {
    ((this._mergeBoard = null),
      (this._mergerBoardRender = null),
      (this._mergeToucher = null),
      (this._mergeCellRender = null),
      (this._focusElement = null),
      (this._selectedElement = null),
      (this._detailInfoElement = null),
      (this._curElement = null),
      (this._soundElement = 0),
      (this._isBlank = !1),
      (this._toucherLock = !1),
      (this._touching = !1),
      (this._tipTimer = null),
      (this._tipMergeCells = []),
      (this._mergeAnimCount = 1),
      (this._mergeAnimTimer = null),
      (this.elementCreatorList = []),
      (this.elementVanishList = []),
      (this.bagCell = null),
      (this.unlimitEnergyClock = null),
      (this.orderCheckLock = !1),
      (this.handbookUpdate = !1),
      this.onLoad());
  }
  return (
    Object.defineProperty(e, "instance", {
      get: function () {
        return Wi(e);
      },
      enumerable: !1,
      configurable: !0,
    }),
    (e.prototype.onLoad = function () {
      this.registerEvents();
    }),
    (e.prototype.onDestory = function () {
      this.unregisterEvents();
    }),
    (e.prototype.registerEvents = function () {
      (u.add(FL.UPDATE, this.onEnergyBuffChanged, this), YF.registerCycleOrderEvent());
    }),
    (e.prototype.unregisterEvents = function () {
      (u.remove(FL.UPDATE, this.onEnergyBuffChanged, this), YF.unregisterCycleOrderEvent());
    }),
    (e.prototype.onEnergyBuffChanged = function () {
      this.mergeBoard &&
        this.mergeBoard.cells.forEach(function (e) {
          e.forEach(function (e) {
            var t,
              i,
              n,
              o,
              r = config.BoardBuff.getByBuffId(config.BoardBuffType.doubleEnergy),
              a = config.BoardBuff.getByBuffId(config.BoardBuffType.fourTimesEnergy);
            if (MW.isStoreCell(e)) {
              var s = e.dynamicComponents.get("ManuCreatorRecover"),
                c =
                  null ===
                    (o =
                      null ===
                        (n =
                          null ===
                            (i =
                              null === (t = null == s ? void 0 : s.data) || void 0 === t
                                ? void 0
                                : t.cell) || void 0 === i
                            ? void 0
                            : i.data) || void 0 === n
                        ? void 0
                        : n.config) || void 0 === o
                    ? void 0
                    : o.id;
              if (!c || (!r.elementFilter.includes(c) && !a.elementFilter.includes(c))) return;
              s.data = s.data;
            } else if (
              e.data &&
              (r.elementFilter.includes(e.data.config.id) ||
                a.elementFilter.includes(e.data.config.id))
            ) {
              var l = e3.GetCellAnim(e, TC.MANU_CREATOR);
              if (l) {
                var d = l.getComponent(hM);
                d && (d.data = d.data);
              }
            }
          });
        });
    }),
    (e.prototype.initCreatorList = function () {
      var e = this;
      0 == this.elementCreatorList.length &&
        ((this.elementCreatorList = []),
        config.Element.list.forEach(function (t, i) {
          null == t.AutoId
            ? console.error("数据表出错:" + v.language + " Element id: " + t.id + " AutoId is null")
            : (t.AutoId.size > 0 || t.AutoIdList.length > 0 || GW.IsManuCreator(t)) &&
              e.elementCreatorList.push(t.id);
        }),
        this.elementCreatorList.sort());
    }),
    (e.prototype.initVanishList = function () {
      var e = this;
      0 == this.elementVanishList.length &&
        ((this.elementVanishList = []),
        config.Element.list.forEach(function (t, i) {
          (t.vanishChange.size > 0 ||
            t.autoVanishChange.size > 0 ||
            t.deterioratedChange.size > 0) &&
            e.elementVanishList.push(t.id);
        }),
        this.elementVanishList.sort());
    }),
    Object.defineProperty(e, "normalActBoard", {
      get: function () {
        return (
          e.MergeBoardType == ar.number ||
          e.MergeBoardType == ar.beach ||
          e.MergeBoardType == ar.ornament
        );
      },
      enumerable: !1,
      configurable: !0,
    }),
    (e.prototype.start = function (t, i) {
      ((this._mergerBoardRender = t),
        (this._mergeCellRender = t.prefab_cellRender),
        this.initMergeToucher(),
        this.initMergeBoard(i.mergeCellSize, i.mergeBoardSize.x, i.mergeBoardSize.y),
        this.initTipTimer(),
        !e.AnimManager && (e.AnimManager = new AC()));
    }),
    (e.prototype.clear = function (e) {
      ((this.detailInfoElement = null),
        (this.curElement = null),
        (this.focusElement = null),
        (this.selectedElement = null),
        this._mergeBoard &&
          this._mergeBoard.cells.forEach(function (t, i) {
            t.forEach(function (t, i) {
              !t || (e && e.has(t)) || t.destory();
            });
          }));
    }),
    (e.prototype.initMergeToucher = function () {
      var e = this.mergeBoardRender.board_toucher;
      ((this._mergeToucher = e), h.warn(">>>init mergeToucher"));
    }),
    (e.prototype.initMergeBoard = function (e, t, i) {
      var n = new x2(e, cc.v2(t, i));
      ((this._mergeBoard = n), h.warn(">>>init mergeBoard size:", t, i, "cellsize:", e));
    }),
    (e.prototype.initTipTimer = function () {
      ((this._tipTimer = b.addClock("mergeTip", 2, 1e3, 1)),
        this._tipTimer.removeCallBack(this),
        this._tipTimer.registCallBack(this, this._tipMerge, null));
    }),
    (e.prototype._tipMerge = function () {
      if ((this._tipTimer && this._tipTimer.pause(), e.BoardCells)) {
        var t = G$.GetCanMergeCells(!0);
        2 == t.length &&
          (this._tipMergeCells.forEach(function (e) {
            return e.endElementTween("tipMerge");
          }),
          (this._tipMergeCells = t),
          t.forEach(function (e, t) {
            var i = cc
              .tween(e.mergeCellRender.node_icon)
              .repeatForever(
                cc
                  .tween(e.mergeCellRender.node_icon)
                  .by(0.233, { scale: 0.2 }, { easing: "sineOut" })
                  .by(0.166, { scale: -0.3 }, { easing: "sineIn" })
                  .by(0.166, { scale: 0.2 }, { easing: "sineOut" })
                  .by(0.133, { scale: -0.15 })
                  .by(0.133, { scale: 0.1 })
                  .by(0.1, { scale: -0.1 })
                  .by(0.15, { scale: 0.05 })
                  .delay(1.5),
              );
            e.showElementTween("tipMerge", i);
          }));
      }
    }),
    Object.defineProperty(e.prototype, "toucherLock", {
      get: function () {
        return this._toucherLock;
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(e.prototype, "touching", {
      get: function () {
        return this._touching;
      },
      set: function (e) {
        this._touching = e;
      },
      enumerable: !1,
      configurable: !0,
    }),
    (e.prototype.clearCurElement = function () {
      ((this.curElement.canDoCheck = !1), (this.curElement = null));
    }),
    Object.defineProperty(e.prototype, "mergeBoard", {
      get: function () {
        return this._mergeBoard;
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(e.prototype, "mergeBoardRender", {
      get: function () {
        return this._mergerBoardRender;
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(e.prototype, "mergeCellRender", {
      get: function () {
        return this._mergeCellRender;
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(e.prototype, "mergeToucher", {
      get: function () {
        return this._mergeToucher;
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(e.prototype, "focusElement", {
      get: function () {
        return this._focusElement;
      },
      set: function (e) {
        (this._focusElement != e &&
          e &&
          (this._focusElement && (this._focusElement.selectProtectNum = 1),
          (e.selectProtectNum = 1)),
          (this._focusElement = e));
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(e.prototype, "selectedElement", {
      get: function () {
        return this._selectedElement;
      },
      set: function (t) {
        if (
          (this._selectedElement &&
            this._selectedElement != t &&
            (this._selectedElement.isSelect = !1),
          t && t.data)
        ) {
          var i = GW.GetCellByUuid(this._soundElement);
          ((i && i.data && i.data.clientUuid == t.data.clientUuid) ||
            ((this._soundElement = 0),
            t.data.soundProtect ||
              (t.callLogic(RA.SELECT_SOUND), (this._soundElement = t.data.clientUuid))),
            (t.data.soundProtect = !1));
        }
        ((this._selectedElement = t),
          this._selectedElement &&
            ((this._selectedElement.isSelect = !0), e.WaitComplete("SelectComplete")));
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(e.prototype, "detailInfoElement", {
      get: function () {
        return this._detailInfoElement;
      },
      set: function (e) {
        (this._detailInfoElement != e && e && u.dispatch("showElementInfo", e),
          (this._detailInfoElement = e));
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(e.prototype, "isBlank", {
      get: function () {
        return this._isBlank;
      },
      set: function (e) {
        this._isBlank = e;
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(e.prototype, "curElement", {
      get: function () {
        return this._curElement;
      },
      set: function (e) {
        (this._curElement && e && e != this._curElement && (this._curElement.canDoCheck = !1),
          (this._curElement = e));
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(e.prototype, "mergeAnimCount", {
      get: function () {
        return this._mergeAnimTimer && this._mergeAnimTimer.running
          ? this._mergeAnimTimer.running
            ? (this._mergeAnimCount++,
              this._mergeAnimCount > 3 && (this._mergeAnimCount = 3),
              (this._mergeAnimTimer = b.addClock("mergeAnimCombo", 1.5, 100, 1)),
              this._mergeAnimCount)
            : void 0
          : ((this._mergeAnimTimer = b.addClock("mergeAnimCombo", 1.5, 100, 1)),
            (this._mergeAnimCount = 1),
            this._mergeAnimCount);
      },
      enumerable: !1,
      configurable: !0,
    }),
    (e.addAutoMergeEndIndex = function (t) {
      e._autoMergeEndIndices.add(t);
    }),
    (e.consumeAutoMergeEndIndex = function (t) {
      return e._autoMergeEndIndices.delete(t);
    }),
    (e.prototype.showCanUseProp = function (e) {
      e.data &&
        (e3.ShowOrHideAllAnims(
          [
            TC.MANU_CREATOR,
            TC.AUTO_CREATOR,
            TC.AUTO_CREATOR_ENERGY,
            TC.MANU_CREATOR_ENERGY,
            TC.CHEST_LOCK_TIP,
            TC.MANU_OPEN,
            TC.MANU_OPENED,
          ],
          !1,
          "all",
        ),
        this.mergeBoard.cells.forEach(function (t, i) {
          t.forEach(function (t, i) {
            if (
              t.serverIdx != e.serverIdx &&
              t.cellState != Q2.LOCK &&
              t.cellState != Q2.COVER &&
              t.cellState != Q2.SNOW
            ) {
              if (t.data && G$.IsCellInState(t, mr.web)) return;
              var n = G$.IsElementPropEffect(e.data.config.id, t);
              if (
                (n.isShow ||
                  (t.showOrHideAnim(!1),
                  (t.mergeCellRender.node_icon.opacity = 70),
                  (t.mergeCellRender.progress.opacity = 70),
                  (t.mergeCellRender.lamp.opacity = 70),
                  (t.mergeCellRender.node_icon.color = cc.color(200, 200, 200))),
                n.isEffect)
              ) {
                var o = ~~(e.data.config.propEffect / 100);
                3 == o && t && t.data && t.data.config && t.data.config.id != e.data.config.id
                  ? e3.AddCellAnim(t, TC.PROP_SHOW_SCISSORS)
                  : 2 == o || 17 == o
                    ? e3.AddCellAnim(t, TC.PROP_SHOW_ENERGY)
                    : 13 == o
                      ? e3.AddCellAnim(t, TC.PROP_SHOW_LAMP)
                      : (7 != o && 19 != o) || t.data.config.id == e.data.config.id
                        ? 8 == o && t.data && 8 != ~~(t.data.config.propEffect / 100)
                          ? e3.AddCellAnim(t, TC.PROP_SHOW_CLOCK)
                          : 9 == o
                            ? e3.AddCellAnim(t, TC.PROP_SHOW_LEVELUP)
                            : 15 == o && e3.AddCellAnim(t, TC.PROP_SHOW_SUPER_SCISSORS)
                        : e3.AddCellAnim(t, TC.PROP_SHOW_LEVELUP);
              }
            }
          });
        }));
    }),
    (e.prototype.hideCanUseProp = function () {
      (e3.ShowOrHideAllAnims(
        [
          TC.MANU_CREATOR,
          TC.AUTO_CREATOR,
          TC.AUTO_CREATOR_ENERGY,
          TC.MANU_CREATOR_ENERGY,
          TC.CHEST_LOCK_TIP,
          TC.MANU_OPEN,
          TC.MANU_OPENED,
        ],
        !0,
        "all",
      ),
        this.mergeBoard.cells.forEach(function (e, t) {
          e.forEach(function (e) {
            e.cellState != Q2.LOCK &&
              e.cellState != Q2.COVER &&
              e.cellState != Q2.SNOW &&
              (e.showOrHideAnim(),
              (e.mergeCellRender.node_icon.opacity = 255),
              (e.mergeCellRender.progress.opacity = 255),
              (e.mergeCellRender.lamp.opacity = 255),
              (e.mergeCellRender.node_icon.color = cc.color(255, 255, 255)),
              e3.RemoveCellAnim(e, TC.PROP_SHOW_SCISSORS),
              e3.RemoveCellAnim(e, TC.PROP_SHOW_SUPER_SCISSORS),
              e3.RemoveCellAnim(e, TC.PROP_SHOW_ENERGY),
              e3.RemoveCellAnim(e, TC.PROP_SHOW_LAMP),
              e3.RemoveCellAnim(e, TC.PROP_SHOW_LEVELUP),
              e3.RemoveCellAnim(e, TC.PROP_SHOW_CLOCK),
              e3.RemoveCellAnim(e, TC.PROP_USE_LAMP));
          });
        }));
    }),
    (e.prototype.showUnlimitEnergy = function (t) {
      var i = this;
      if ((void 0 === t && (t = !1), !(e.Data.energyEnd <= 0))) {
        if (E8.serverTime >= e.Data.energyEnd)
          return ((e.Data.energyEnd = 0), void oN.refreshFromServer());
        var n = (e.Data.energyEnd - E8.serverTime) / 1e3;
        this.unlimitEnergyClock = b.addClock("unlimitEnergy", n, 1e3, 1);
        var o = !1;
        (this.unlimitEnergyClock.registCallBack(
          this,
          function () {
            e.instance.unlimitEnergy(!1);
          },
          function (e) {
            (e.leftSecond < 4 && !o && ((o = !0), j8.play(o_.PROP_END_ENERGY)),
              i.updateUnlimitTime(e));
          },
        ),
          t && this.unlimitEnergy(!0));
      }
    }),
    (e.prototype.unlimitEnergy = function (t, i) {
      void 0 === i && (i = !0);
      var n = u2.view && u2.view.label_energy.node,
        o = u2.view && u2.view.label_energy.node,
        r = u2.view && u2.view.label_unlimitEnergy.node,
        a = u2.view.energy_recovery.children[0],
        s = u2.view.energy_recovery.children[1];
      t
        ? (u2.view &&
            ((a.opacity = 0),
            s && s.opacity,
            (u2.view.spine_unlimitEnergy.node.active = !0),
            ib.playAnimation(u2.view.spine_unlimitEnergy, "idle", !0)),
          (o.active = !1),
          (n.active = !1),
          (r.active = !0))
        : (u2.view &&
            ((u2.view.spine_unlimitEnergy.node.active = !1), (a.opacity = 255), s && s.opacity),
          (r.active = !1),
          e.Data && i && ((e.Data.energyEnd = 0), oN.refreshFromServer()),
          this.unlimitEnergyClock &&
            (this.unlimitEnergyClock.dispose(), (this.unlimitEnergyClock = null)),
          g2.UpdateView());
    }),
    (e.prototype.updateUnlimitTime = function (e) {
      (u2.view && u2.view.label_unlimitEnergy).string = j(e.leftSecond, !1, !0, 2);
    }),
    Object.defineProperty(e, "BoardCells", {
      get: function () {
        return this.Data ? this.Data.cells : null;
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(e, "RemoteCells", {
      get: function () {
        var e = b2.GetBoardByType(this.MergeBoardType);
        return e ? e.cells : null;
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(e, "Bag", {
      get: function () {
        return this.Data ? this.Data.bag.items : null;
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(e, "BagVip", {
      get: function () {
        return this.Data ? this.Data.bag.mpItems : null;
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(e, "BagNewMp", {
      get: function () {
        return this.Data ? this.Data.bag.mpV2Items : null;
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(e, "BagProduct", {
      get: function () {
        return this.Data ? this.Data.bag.producerItems : null;
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(e, "BagPassNew", {
      get: function () {
        return this.Data ? this.Data.bag.passNewItems : null;
      },
      enumerable: !1,
      configurable: !0,
    }),
    (e.GetCellRecovery = function (e, t) {
      var i = this.BoardCells && this.BoardCells.get(e);
      if (!i) return null;
      if (MW.isStoreElementById(i.elementId)) {
        var n = MW.getCurrentLauncherByData(i);
        return n ? MW.ensureLauncherRecoverTimerByData(i, n.index, n.cell, t) : null;
      }
      if (!i.recovery) return null;
      var o = i.recovery,
        r = o.has(t) ? o.get(t) : null;
      return r || null;
    }),
    Object.defineProperty(e, "Data", {
      get: function () {
        return this.cacheBoard && this.cacheBoard.type == this.MergeBoardType
          ? this.cacheBoard
          : b2.GetBoardByType(this.MergeBoardType);
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(e, "InfiniteEnergyOn", {
      get: function () {
        var e;
        return (
          !!this.Data &&
          !!(null === (e = this.instance) || void 0 === e ? void 0 : e.unlimitEnergyClock) &&
          E8.serverTime < this.Data.energyEnd
        );
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(e, "ExtraData", {
      get: function () {
        return this.cacheExtraData;
      },
      enumerable: !1,
      configurable: !0,
    }),
    (e.ChannelAdd = function (e) {
      this.Data.channel.set(e.id, e);
    }),
    (e.ChannelRemove = function (e) {
      var t = this.Data.channel.get(e);
      t && ((t.value -= 1), t.value <= 0 && this.Data.channel.delete(e));
    }),
    Object.defineProperty(e, "channelSize", {
      get: function () {
        var e = 0;
        return (
          this.Data.channel.forEach(function (t) {
            return (e += t.value);
          }),
          e + this.Data.bag.wasteBasket.size
        );
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(e, "RemoteData", {
      get: function () {
        return e.Data ? E8.role.boards.get(e.Data.id) : null;
      },
      enumerable: !1,
      configurable: !0,
    }),
    (e.isBoardEnable = function (e) {
      var t,
        i,
        n,
        o,
        r,
        a,
        s = e || this.MergeBoardType;
      if (s == ar.main) return !0;
      if (s == ar.duanwu) return U2.getDuanwuStage() == F2.START;
      if (s == U2.getBoardType()) return U2.getActivityStage() == F2.START;
      if (s == _A.getBoardType()) return _A.getHealthFoodStage() == mA.START;
      if (s == H2.getBoardType()) return H2.getActivityStage() == F2.START;
      if (s == EA.getBoardType()) return EA.getActivityStage() == F2.START;
      if (
        s ==
        (null === (t = null == Fj ? void 0 : Fj.instance) || void 0 === t ? void 0 : t.boardType)
      )
        return (
          (null === (i = null == Fj ? void 0 : Fj.instance) || void 0 === i ? void 0 : i.stage) ==
          ew.START
        );
      if (
        s ==
        (null === (n = null == NE ? void 0 : NE.instance) || void 0 === n ? void 0 : n.boardType)
      )
        return (
          (null === (o = null == NE ? void 0 : NE.instance) || void 0 === o ? void 0 : o.stage) ==
          ew.START
        );
      if (
        s ==
        (null === (r = null == m2 ? void 0 : m2.instance) || void 0 === r ? void 0 : r.boardType)
      )
        return (
          (null === (a = null == m2 ? void 0 : m2.instance) || void 0 === a ? void 0 : a.stage) ==
          ew.START
        );
      var c = E8.role.activity.boards.get(this.Data.activityId);
      return !!c && !!c.boardId && c.endTime - E8.serverTime > 3e4;
    }),
    (e.LoadBoardData = function (e, t) {
      return (
        void 0 === t && (t = !1),
        r(this, void 0, void 0, function () {
          var i,
            n,
            o,
            r,
            s = this;
          return a(this, function (a) {
            switch (a.label) {
              case 0:
                return (
                  (this.MergeBoardType = e),
                  b2.GetEventActive(this.MergeBoardType) ||
                    E8.role.boards.forEach(function (e, t) {
                      e.type == s.MergeBoardType && E8.role.boards.set(t, null);
                    }),
                  (i = null),
                  K3.logEvent("get_board_data", { boardType: this.MergeBoardType, allData: t }),
                  F8.switches.boardDebugInfo &&
                    K3.logEvent("board_data_before_load", {
                      boardType: this.MergeBoardType,
                      boardData: TJ.BoardData2String(),
                    }),
                  [
                    4,
                    Promise.all([
                      hm.enterBoard({ boardType: e, timestamp: E8.serverTime, allData: t }),
                      t9.loadNow(),
                    ]),
                  ]
                );
              case 1:
                return (
                  (n = a.sent()),
                  (i = n[0]) && i.code
                    ? (u.dispatch("reLogin"), [2, null])
                    : (null == (o = b2.GetBoardByType(e)) ? void 0 : o.gActId) > 0
                      ? [4, I2.loadHandbook(o.gActId)]
                      : [3, 3]
                );
              case 2:
                (a.sent(), (a.label = 3));
              case 3:
                return (
                  b3.syncData(),
                  u2.view &&
                    u2.view.energyRecover &&
                    u2.view.energyRecover.forceRefresh(E8.role.energy),
                  this.MergeBoardType != g2.GetBoardtype(fy.CHESS_3)
                    ? [3, 4]
                    : (zC.binderMap.forEach(function (e, t) {
                        e && e.source && "eventEnergy" == e.source.id && zC.binderMap.delete(t);
                      }),
                      (r = g2.GetEnergyRecover(fy.CHESS_3)),
                      zC.create(r, "value,valueMax", this, function (e, t) {
                        (0 == t || e <= t) && u2.view.label_actEnergy.setValue(e);
                      }),
                      (u2.view.actEnergyRecover.timeLabel.string = ""),
                      (u2.view.actEnergyRecover.node.active = !0),
                      u2.view.actEnergyRecover.onData(r),
                      [3, 7])
                );
              case 4:
                return this.MergeBoardType != g2.GetBoardtype(fy.CHESS_4)
                  ? [3, 6]
                  : (zC.binderMap.forEach(function (e, t) {
                      e && e.source && "eventEnergyII" == e.source.id && zC.binderMap.delete(t);
                    }),
                    (r = g2.GetEnergyRecover(fy.CHESS_4)),
                    zC.create(r, "value,valueMax", this, function (e, t) {
                      (0 == t || e <= t) && u2.view.label_actMaxEnergy.setValue(e);
                    }),
                    (u2.view.actMaxEnergyRecover.timeLabel.string = ""),
                    (u2.view.actMaxEnergyRecover.node.active = !0),
                    u2.view.actMaxEnergyRecover.onData(r),
                    [4, X8.UpdateVegetableRecod()]);
              case 5:
                return (a.sent(), [3, 7]);
              case 6:
                (this.MergeBoardType == g2.GetBoardtype(fy.CHESS_7)
                  ? (zC.binderMap.forEach(function (e, t) {
                      e && e.source && "eventEnergyIII" == e.source.id && zC.binderMap.delete(t);
                    }),
                    (r = g2.GetEnergyRecover(fy.CHESS_7)),
                    zC.create(r, "value,valueMax", this, function (e, t) {
                      (0 == t || e <= t) && u2.view.label_act7Energy.setValue(e);
                    }),
                    (u2.view.act7EnergyRecover.timeLabel.string = ""),
                    (u2.view.act7EnergyRecover.node.active = !0),
                    u2.view.act7EnergyRecover.onData(r))
                  : this.MergeBoardType == g2.GetBoardtype(fy.CHESS_8)
                    ? (zC.binderMap.forEach(function (e, t) {
                        e && e.source && "eventEnergyIV" == e.source.id && zC.binderMap.delete(t);
                      }),
                      (r = g2.GetEnergyRecover(fy.CHESS_8)),
                      zC.create(r, "value,valueMax", this, function (e, t) {
                        (0 == t || e <= t) && u2.view.label_act8Energy.setValue(e);
                      }),
                      (u2.view.act8EnergyRecover.timeLabel.string = ""),
                      (u2.view.act8EnergyRecover.node.active = !0),
                      u2.view.act8EnergyRecover.onData(r))
                    : this.MergeBoardType == g2.GetBoardtype(fy.CHESS_9) &&
                      (zC.binderMap.forEach(function (e, t) {
                        e && e.source && "eventEnergyV" == e.source.id && zC.binderMap.delete(t);
                      }),
                      (r = g2.GetEnergyRecover(fy.CHESS_9)),
                      zC.create(r, "value,valueMax", this, function (e, t) {
                        (0 == t || e <= t) && u2.view.label_act9Energy.setValue(e);
                      }),
                      (u2.view.act9EnergyRecover.timeLabel.string = ""),
                      (u2.view.act9EnergyRecover.node.active = !0),
                      u2.view.act9EnergyRecover.onData(r)),
                  (a.label = 7));
              case 7:
                return (this.cacheBoardRefresh(e, !1), [4, this.cacheExtraRefresh()]);
              case 8:
                return (
                  a.sent(),
                  this.recordBoardShortCd(!0),
                  this.recordBoardShortCd(!0, 0, !0),
                  this.logStoreElementSnapshot(),
                  zM.ButtonGetCheck(),
                  DL.ButtonGetCheck(),
                  kA.ActStartCheck(),
                  ZC.valueLabel("energy"),
                  ZC.valueLabel("coin"),
                  ZC.valueLabel("diamond"),
                  g2.UpdateView(),
                  (S2.needStopSkipTime = !0),
                  this.cacheBoard.cells.forEach(function (e) {
                    s.convertRecovery(e);
                  }),
                  e != ar.main
                    ? [3, 10]
                    : (u.dispatch("onDailyTaskFinish"), [4, TJ.PreloadBoardRes(this.cacheBoard)])
                );
              case 9:
                (a.sent(), (a.label = 10));
              case 10:
                return [2, null];
            }
          });
        })
      );
    }),
    (e.logStoreElementSnapshot = function () {
      var e = this.cacheBoard;
      if (e && e.cells) {
        var t = [];
        e.cells.forEach(function (e) {
          MW.isStoreElementById(null == e ? void 0 : e.elementId) && t.push(e);
        });
        var i = t.length;
        t.forEach(function (e) {
          for (
            var t,
              n,
              o = MW.getStoreConfByElementId(e.elementId),
              r = MW.getStoreExpByElementId(e.elementId),
              a = MW.getStoreLevelConfByExp(r),
              s = (null == a ? void 0 : a.slotCount) || (null == o ? void 0 : o.initialSlot) || 0,
              c = (null == o ? void 0 : o.maxSlot) || s,
              l = [],
              d = 0;
            d < c;
            d++
          )
            d >= s
              ? l.push(-1)
              : l.push(
                  (null === (n = null === (t = e.storeBagCell) || void 0 === t ? void 0 : t[d]) ||
                  void 0 === n
                    ? void 0
                    : n.elementId) || 0,
                );
          K3.logEvent("storeElement", {
            type: "snapshot",
            store_id: e.elementId,
            store_level: (null == a ? void 0 : a.star) || 1,
            store_count: i,
            store_element: l.join("|"),
          });
        });
      }
    }),
    (e.forceRefreshCells = function (t, i) {
      var n = this;
      (void 0 === t && (t = ar.main),
        void 0 === i && (i = !0),
        o9.currentScreen == J8.MERGE_SCREEN &&
          e.MergeBoardType == t &&
          (this.cacheBoardRefresh(e.MergeBoardType, !1),
          this.cacheBoard.cells.forEach(function (e) {
            n.convertRecovery(e);
          }),
          i &&
            this.Board.cells.forEach(function (e, t) {
              e.forEach(function (e, t) {
                e && e.callLogic(RA.INIT_RENDER);
              });
            })));
    }),
    (e.forceRefreshExtraByCondition = function (t, i) {
      if (
        (void 0 === i && (i = ar.main),
        o9.currentScreen == J8.MERGE_SCREEN && e.MergeBoardType == i)
      ) {
        var n = b2.GetBoardByType(i);
        n &&
          null != this.cacheBoard &&
          this.cacheBoard.cells.forEach(function (e, i) {
            var o, r;
            if (t(e)) {
              e.extra = new Map();
              var a =
                null ===
                  (r =
                    null === (o = null == n ? void 0 : n.cells) || void 0 === o
                      ? void 0
                      : o.get(i)) || void 0 === r
                  ? void 0
                  : r.extra;
              a &&
                a.forEach(function (t, i) {
                  e.extra.set(i, t);
                });
            }
          });
      }
    }),
    (e.cacheBoardRefresh = function (e, t) {
      void 0 === t && (t = !1);
      var i = this.cacheBoard ? this.cacheBoard.type : ar.main;
      if (this.cacheBoard) {
        var n = this.cacheBoard.cells;
        n &&
          n.forEach(function (e) {
            e.recovery.forEach(function (e) {
              e instanceof U$ && e.stop();
            });
          });
      }
      var o = new pl();
      (e == i && t
        ? o.setValue(JSON.parse(JSON.stringify(this.cacheBoard)))
        : ((this.cacheBoard = null),
          o.setValue(JSON.parse(JSON.stringify(this.Data))),
          e == ar.main && UT.refreshDrawerData()),
        (this.cacheBoard = o));
    }),
    (e.cacheExtraRefresh = function () {
      var e, t, i;
      return r(this, void 0, void 0, function () {
        var n,
          o,
          r,
          s,
          c,
          l,
          d,
          u,
          h,
          p,
          f,
          g = this;
        return a(this, function (a) {
          switch (a.label) {
            case 0:
              return [4, EJ.SendRequestNow()];
            case 1:
              return (
                a.sent(),
                this.cacheExtraData && (this.cacheExtraData = new Map()),
                (n = FE.getEventPassData()),
                (o = r3.getButterflyPassData()),
                (r = DC.getActivity()),
                (s = X8.getActivity()),
                (c = wM.getActData()),
                (l = N2.getPassData()),
                (d = null === (e = lL.instance) || void 0 === e ? void 0 : e.spaceTreasure),
                (u =
                  null === (t = null == m2 ? void 0 : m2.instance) || void 0 === t
                    ? void 0
                    : t.chess7Data),
                (h =
                  null === (i = null == dI ? void 0 : dI.instance) || void 0 === i
                    ? void 0
                    : i.actData),
                (p = YE.getStateActivity(ew.START)) &&
                  p.EventPassNewData &&
                  (this.cacheExtraData.set(
                    YE.EventPassNewMergeCountKey,
                    p.EventPassNewData.mergeCount,
                  ),
                  this.cacheExtraData.set(
                    YE.EventPassNewAutoMergeProbabilityCount,
                    p.EventPassNewData.autoMergeProbabilityCount,
                  ),
                  this.cacheExtraData.set(
                    YE.EventPassNewMergeProbabilityCount,
                    p.EventPassNewData.mergeProbabilityCount,
                  )),
                n && this.cacheExtraData.set("PassMergeCount", n.mergeCount),
                n &&
                  this.cacheExtraData.set("autoMergeProbabilityCount", n.autoMergeProbabilityCount),
                n && this.cacheExtraData.set("PassWeightCount", n.mergeProbabilityCount),
                o && this.cacheExtraData.set("ButterflyPassMergeCount", o.mergeCount),
                o && this.cacheExtraData.set("ButterflyPassWeightCount", o.mergeProbabilityCount),
                o && this.cacheExtraData.set("ButterflyPassSeed", o.seed),
                l && this.cacheExtraData.set("CarrotPassMergeCount", l.mergeCount),
                l && this.cacheExtraData.set("CarrotPassWeightCount", l.mergeProbabilityCount),
                l && this.cacheExtraData.set("CarrotPassSeed", l.seed),
                r && this.cacheExtraData.set("ActPlusMergeCount", r.mergeCount),
                r && this.cacheExtraData.set("ActPlusWeightCount", r.mergeProbabilityCount),
                r && this.cacheExtraData.set("ActPlusSeed", r.seed),
                s && this.cacheExtraData.set("ActMaxWeightCount", s.productProbabilityCount),
                s && this.cacheExtraData.set("ActMaxSeed", s.seed),
                u && this.cacheExtraData.set("Act7WeightCount", u.productProbabilityCount),
                u && this.cacheExtraData.set("Act7Seed", u.seed),
                h && this.cacheExtraData.set("Act8MergeCount", h.mergeCount),
                h && this.cacheExtraData.set("Act8WeightCount", h.mergeProbabilityCount),
                h && this.cacheExtraData.set("Act8Seed", h.seed),
                c && this.cacheExtraData.set("LampPassWeightCount", c.productProbabilityCount),
                c && this.cacheExtraData.set("LampPassProductCount", c.productCount),
                c && this.cacheExtraData.set("LampPassSeed", c.seed),
                d && this.cacheExtraData.set("STActWeightCount", d.productProbabilityCount),
                d && this.cacheExtraData.set("STActSeed", d.seed),
                hx.instance.refreshBoardCache(this.cacheExtraData),
                this.updateEnergyTower(),
                this.MergeBoardType == g2.GetBoardtype(fy.CHESS_4) &&
                  ((f = X8.vegetableRecord),
                  s &&
                    f &&
                    f.ownVegetableNum &&
                    f.ownVegetableNum.forEach(function (e, t) {
                      var i = e || 0;
                      g.cacheExtraData.set("VegetableCount" + t, i);
                    })),
                (Pq.GogBubbleCount = -1),
                [2]
              );
          }
        });
      });
    }),
    (e.updateEnergyTower = function () {
      (this.cacheExtraData.set(
        "energyTowerSeed",
        this.Data.specialCount.get(rr.energyTowerSeed) || 0,
      ),
        this.cacheExtraData.set(
          "energyTowerBubbleSeed",
          this.Data.specialCount.get(rr.energyTowerBubbleSeed) || 0,
        ),
        this.cacheExtraData.set(
          "energyTowerProductCount",
          this.Data.specialCount.get(rr.energyTowerProductCount) || 0,
        ),
        this.cacheExtraData.set(
          "energyTowerBubbleUsedEnergy",
          this.Data.specialCount.get(rr.energyTowerBubbleUsedEnergy) || 0,
        ));
    }),
    (e.loadBoardShortCd = function () {
      var e = this;
      if (!this._originShortCd) {
        ((this._boardShortCd = new Map()), (this._bagShortCd = new Map()));
        var t = [];
        (E8.role.boards.forEach(function (e, i) {
          t.push(e.id);
        }),
          t.forEach(function (t, i) {
            var n,
              o = cc.sys.localStorage.getItem("shortCdCache_" + t),
              r = cc.sys.localStorage.getItem("shortCdBagCache_" + t),
              a = o ? JSON.parse(o) : null,
              s = r ? JSON.parse(r) : null;
            a && (n = ne(a, !0)) && e._boardShortCd.set(t, n);
            s && (n = ne(s, !0)) && e._bagShortCd.set(t, n);
            (cc.sys.localStorage.removeItem("shortCdCache_" + t),
              cc.sys.localStorage.removeItem("shortCdBagCache_" + t));
          }),
          (this._originShortCd = !0));
      }
    }),
    (e.recordBoardShortCd = function (e, t, i) {
      var n = this;
      (void 0 === e && (e = !1),
        void 0 === t && (t = 0),
        void 0 === i && (i = !1),
        this._boardShortCd || (this._boardShortCd = new Map()),
        this._bagShortCd || (this._bagShortCd = new Map()));
      var o = function (e) {
        var t = {};
        return e
          ? (re(e._shortCdAutoEndTime) && (t._shortCdAutoEndTime = e._shortCdAutoEndTime),
            re(e._shortCdAutoRoundEndTime) &&
              (t._shortCdAutoRoundEndTime = e._shortCdAutoRoundEndTime),
            re(e._shortCdManuEndTime) && (t._shortCdManuEndTime = e._shortCdManuEndTime),
            re(e._shortCdManuRoundEndTime) &&
              (t._shortCdManuRoundEndTime = e._shortCdManuRoundEndTime),
            re(e._shortCdStartTime) && (t._shortCdStartTime = e._shortCdStartTime),
            re(e._shortCdCount) && (t._shortCdCount = e._shortCdCount),
            re(e._shortCdCurNum) && (t._shortCdCurNum = e._shortCdCurNum),
            t)
          : t;
      };
      if (t) {
        var r = i ? this._bagShortCd.get(this.Data.id) : this._boardShortCd.get(this.Data.id);
        r || (r = new Map());
        var a = i ? this.Bag.get(t) : this.BoardCells.get(t),
          s = o(a);
        return (
          r.set(t, s),
          i ? this._bagShortCd.set(this.Data.id, r) : this._boardShortCd.set(this.Data.id, r),
          void this.recordBoardShortCdlocal(this.Data.id, i)
        );
      }
      if (e) {
        var c = this._boardShortCd.get(this.Data.id);
        if (!c) return;
        if ((i && (c = this._bagShortCd.get(this.Data.id)), !c || !this.BoardCells)) return;
        (c.forEach(function (e, t) {
          var o = i ? n.Bag.get(t) : n.BoardCells.get(t);
          o &&
            (re(e._shortCdAutoEndTime) && (o._shortCdAutoEndTime = e._shortCdAutoEndTime),
            re(e._shortCdAutoRoundEndTime) &&
              (o._shortCdAutoRoundEndTime = e._shortCdAutoRoundEndTime),
            re(e._shortCdManuEndTime) && (o._shortCdManuEndTime = e._shortCdManuEndTime),
            re(e._shortCdManuRoundEndTime) &&
              (o._shortCdManuRoundEndTime = e._shortCdManuRoundEndTime),
            re(e._shortCdStartTime) && (o._shortCdStartTime = e._shortCdStartTime),
            re(e._shortCdCount) && (o._shortCdCount = e._shortCdCount),
            re(e._shortCdCurNum) && (o._shortCdCurNum = e._shortCdCurNum));
        }),
          this.recordBoardShortCdlocal(this.Data.id),
          this.recordBoardShortCdlocal(this.Data.id, !0),
          i ? this._bagShortCd.delete(this.Data.id) : this._boardShortCd.delete(this.Data.id));
      } else {
        var l = this._boardShortCd.get(this.Data.id),
          d = this._bagShortCd.get(this.Data.id);
        (l || (l = new Map()),
          d || (d = new Map()),
          this.BoardCells.forEach(function (e, t) {
            var i = o(e);
            l.set(e.index, i);
          }),
          this.Bag.forEach(function (e, t) {
            var i = o(e);
            d.set(t, i);
          }),
          this._boardShortCd.set(this.Data.id, l),
          this._bagShortCd.set(this.Data.id, d),
          this.recordBoardShortCdlocal(this.Data.id),
          this.recordBoardShortCdlocal(this.Data.id, !0));
      }
    }),
    (e.recordBoardShortCdlocal = function (e, t) {
      var i = this;
      if ((void 0 === e && (e = 0), void 0 === t && (t = !1), e)) {
        var n = this._boardShortCd.get(e);
        if ((t && (n = this._bagShortCd.get(e)), n)) {
          var o = JSON.stringify(ie(n)),
            r = t ? "shortCdBagCache_" : "shortCdCache_";
          cc.sys.localStorage.setItem(r + e, o);
        }
      } else {
        var a = [];
        (E8.role.boards.forEach(function (e, t) {
          a.push(e.id);
        }),
          a.forEach(function (e, t) {
            var n = i._boardShortCd.get(e);
            if (n) {
              var o = JSON.stringify(ie(n));
              cc.sys.localStorage.setItem("shortCdCache_" + e, o);
            }
          }));
      }
    }),
    (e.removeAllBoardShortCDCache = function () {
      var e = [];
      (E8.role.boards.forEach(function (t, i) {
        e.push(t.id);
      }),
        e.forEach(function (e, t) {
          (cc.sys.localStorage.removeItem("shortCdCache_" + e),
            cc.sys.localStorage.removeItem("shortCdBagCache_" + e));
        }),
        (this._boardShortCd = null),
        (this._bagShortCd = null));
    }),
    (e.RefreshBoardCache = function (t) {
      (void 0 === t && (t = !1),
        o9.currentScreen == J8.MERGE_SCREEN &&
          ((e.Data.channel = E8.role.boards.get(e.Data.id).channel),
          (e.Data.bag = E8.role.boards.get(e.Data.id).bag),
          (e.Data.orders = E8.role.boards.get(e.Data.id).orders),
          (e.Data.ordered = E8.role.boards.get(e.Data.id).ordered),
          (e.Data.orderDrawerEnd = E8.role.boards.get(e.Data.id).orderDrawerEnd),
          (e.Data.incrementId = E8.role.boards.get(e.Data.id).incrementId),
          (e.Data.specialCount = E8.role.boards.get(e.Data.id).specialCount),
          t && this.cacheExtraRefresh()));
    }),
    Object.defineProperty(e, "MainBoardRemote", {
      get: function () {
        return E8.mainBoardRemoteData;
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(e, "Board", {
      get: function () {
        return this.instance.mergeBoard;
      },
      enumerable: !1,
      configurable: !0,
    }),
    (e.convertRecovery = function (e) {
      var t = this;
      (this.convertCellRecovery(e),
        MW.isStoreElementById(e.elementId) &&
          e.storeBagCell &&
          e.storeBagCell.length > 0 &&
          e.storeBagCell.forEach(function (i, n) {
            t.convertCellRecovery(i, e.index, n);
          }));
    }),
    (e.convertCellRecovery = function (e, t, i) {
      (void 0 === t && (t = 0),
        void 0 === i && (i = -1),
        !e.recovery ||
          e.recovery.size <= 0 ||
          e.recovery.forEach(function (n, o) {
            n.id =
              t > 0
                ? t + "_" + e.elementId + "_" + o + "_store_" + i
                : e.index + "_" + e.elementId + "_" + o;
            var r = kA.changeElementData(e.elementId);
            if (
              (r &&
                (o == yr.manualProduct && r.elementRecoverRateAct
                  ? (n.interval = r.elementRecoverRateAct)
                  : o == yr.autoProduct && r.AutoIntervalAct && (n.interval = r.AutoIntervalAct)),
              n instanceof el)
            ) {
              var a = new U$();
              (e.state != mr.none && e.state != mr.opened) || (a.onData(n), e.recovery.set(o, a));
            } else n.onData(n);
          }));
    }),
    (e.convertRecoveryFix = function (e, t, i, n) {
      (void 0 === n && (n = !1),
        e.recovery &&
          e.recovery.size > 0 &&
          e.recovery.forEach(function (o, r) {
            o.id = e.index + "_" + e.elementId + "_" + r;
            var a = config.Element.getById(e.elementId),
              s = t + "_" + e.elementId,
              c = config.SkipCdData.getById(s),
              l = i;
            if ((n && e.pauseTime && (l = e.pauseTime), r == yr.manualProduct)) {
              var d =
                ((l - o.startTime) / (1e3 * c.elementRecoverRateAct)) * a.elementRecoverRate * 1e3;
              ((o.interval = a.elementRecoverRate), (o.startTime = l - d));
            } else if (r == yr.autoProduct) {
              d = ((l - o.startTime) / (1e3 * c.AutoIntervalAct)) * a.AutoInterval * 1e3;
              ((o.interval = a.AutoInterval), (o.startTime = l - d));
            }
            if (e.openEnd && c && c.unlockDurationAct) {
              var u = ((e.openEnd - l) / (1e3 * c.unlockDurationAct)) * a.unlockDuration * 1e3;
              e.openEnd = l + u;
            }
            if (!n)
              if (o instanceof el) {
                var h = new U$();
                (e.state != mr.none && e.state != mr.opened) || (h.onData(o), e.recovery.set(r, h));
              } else o.onData(o);
          }));
    }),
    (e.stopElementRecovery = function (e, t) {
      for (var i in yr) {
        if (isNaN(i)) {
          var n = "recovery_" + e + "_" + t + "_" + yr[i];
          (b.removeClock(n), h.warn("recovery element stop", n));
        }
      }
    }),
    (e.stopRecovery = function (e) {
      e.recovery &&
        e.recovery.size > 0 &&
        e.recovery.forEach(function (t, i) {
          (e.state != mr.none && e.state != mr.opened) || t.stop();
        });
    }),
    (e.stopClientRecovery = function (e) {
      if (e && e.dynamicComponents) {
        var t = e.dynamicComponents.get("SuperSpeedUpRecover");
        t && t.stop();
      }
    }),
    Object.defineProperty(e, "BoardRender", {
      get: function () {
        return this.instance.mergeBoardRender;
      },
      enumerable: !1,
      configurable: !0,
    }),
    (e.SlideBoard = function (e, t) {
      return r(this, void 0, void 0, function () {
        return a(this, function (i) {
          switch (i.label) {
            case 0:
              return this.BoardRender
                ? [4, this.BoardRender.slideBoard(e, t)]
                : (h.error("SlideBoard failed: board render is not ready"), [2]);
            case 1:
              return (i.sent(), [2]);
          }
        });
      });
    }),
    (e.CancelBoardSlide = function () {
      this.BoardRender && this.BoardRender.cancelBoardSlide();
    }),
    Object.defineProperty(e, "CellRender", {
      get: function () {
        return this.instance.mergeCellRender;
      },
      enumerable: !1,
      configurable: !0,
    }),
    (e.prototype.resetMergeCheck = function () {
      this._mergeBoard.cells.forEach(function (e, t) {
        e.forEach(function (e, t) {
          e.canDoCheck = !1;
        });
      });
    }),
    Object.defineProperty(e, "BagCell", {
      get: function () {
        return e.instance.bagCell;
      },
      enumerable: !1,
      configurable: !0,
    }),
    (e.PauseTip = function () {
      (e.instance._tipMergeCells.forEach(function (e) {
        return e.endElementTween("tipMerge");
      }),
        (e.instance._tipMergeCells = []),
        e.instance._tipTimer && e.instance._tipTimer.pause());
    }),
    (e.ResumeTip = function () {
      e.instance.initTipTimer();
    }),
    (e.TouchPause = function () {
      (h.warn("TouchPause"), (xz.touchPause = !0), (e.instance._toucherLock = !0));
    }),
    (e.TouchResume = function () {
      (h.warn("TouchResume"),
        (xz.touchPause = !1),
        (e.instance._toucherLock = !1),
        e.BoardRender && (e.BoardRender.orderInfo.scroll.enabled = !0),
        Le.resolve(Pe.MergeScreenTouchResume));
    }),
    (e.WaitTouchResume = function () {
      return r(this, void 0, void 0, function () {
        return a(this, function (t) {
          switch (t.label) {
            case 0:
              return [
                4,
                Le.waitFor(Pe.MergeScreenTouchResume, function () {
                  return !e.instance._toucherLock;
                }),
              ];
            case 1:
              return (t.sent(), [2]);
          }
        });
      });
    }),
    (e.ResetScreen = function () {
      ((Tq.isShow = !1),
        (e.UnlockingManuElement = null),
        (e.UnlockingNewElement = null),
        u.dispatch("hideElementInfo"));
    }),
    (e.RefreshScreen = function () {
      if (
        (j_.hideWindow(F3.MergeConfirmWindow),
        (e.FocusCellIdx = 0),
        o9.currentScreen != J8.MERGE_SCREEN)
      )
        return (
          (e.UnlockingManuElement = null),
          (e.UnlockingNewElement = null),
          void (e.BoardRender && e.BoardRender.resetLayer())
        );
      (this.PauseTip(), this.ResumeTip());
      var t = this.instance;
      if (t.touching) {
        if ((this.ResumeTip(), t.isBlank || !t.touching)) return;
        if (((t.touching = !1), !t.focusElement || !t.focusElement.data)) return;
        (t.focusElement.cellState != Q2.LOCK &&
          t.focusElement.cellState != Q2.SNOW &&
          (t.focusElement.callLogic(RA.END_MOVE),
          t.focusElement.moveElementTo(t.focusElement.worldPos),
          (t.selectedElement = t.focusElement),
          (t.focusElement.cellState = Q2.STAND)),
          t.curElement && t.clearCurElement());
      }
      e.Board &&
        e.Board.cells.forEach(function (e, t) {
          e.forEach(function (e, t) {
            e3.RemoveCellAnim(e, TC.CAN_MERGE);
          });
        });
    }),
    (e.WaitComplete = function (t) {
      return r(this, void 0, void 0, function () {
        return a(this, function (i) {
          switch (i.label) {
            case 0:
              return !o8.curGuideId || hT.CurCondition ? [3, 2] : [4, S(33)];
            case 1:
              return (i.sent(), [3, 0]);
            case 2:
              return (
                t == hT.CurCondition &&
                  ((e.FocusCellIdx = 0), (e.FocusEndCellIdx = 0), o8.updateCondition(t, 1)),
                [2]
              );
          }
        });
      });
    }),
    (e.ClearFocus = function () {
      ((e.FocusCellIdx = 0), (e.FocusEndCellIdx = 0));
    }),
    (e.SwitchElement = function (t, i, n) {
      (t !== e.BagCell && i !== e.BagCell) || e3.StopBoardFullBagTween();
      var o = e.BoardCells.get(i.serverIdx),
        r = e.BoardCells.get(t.serverIdx);
      (this.stopRecovery(o), this.stopRecovery(r));
      var a = e.PreSwitchElementCal(t, i);
      (i.callLogic(RA.REMOVE, a), t.callLogic(RA.REMOVE, i.serverIdx), (r.index = i.serverIdx));
      var s = i.data,
        c = [];
      (s
        ? (c = G$.GetClosestBlankCell(i.pos, 1)).length
          ? (o.index = c[0].serverIdx)
          : ((o.index = t.serverIdx), c.push(t))
        : c.push(null),
        (c[0] && c[0] == t) || ((t.ignoreOrderRefresh = !0), (t.data = null)),
        c[0] &&
          (s &&
            ((c[0].ignoreOrderRefresh = !0),
            (c[0].resetMetronomeAnim = !0),
            (c[0].data = GW.ParseCellCofigByData(o))),
          n && c[0].setElementTo(n),
          c[0].moveElementTo(c[0].worldPos)),
        (i.data = GW.ParseCellCofigByData(r)),
        n && i.setElementTo(n),
        i.moveElementTo(i.worldPos),
        i.onSwitchElement(t, c[0]));
    }),
    (e.PreSwitchElementCal = function (e, t) {
      var i = 0,
        n = [];
      return (
        t.data &&
          (i = (n = G$.GetClosestBlankCell(t.pos, 1)).length ? n[0].serverIdx : e.serverIdx),
        i
      );
    }),
    (e.getBoardExitNode = function () {
      var t,
        i,
        n,
        o,
        r = nC.instance.getFirstStartActByType(config.GlobalActType.chessBoard9),
        a = (((t = {})[EA.getBoardType()] = "warehouseGate"),
        (t[
          null === (i = null == Fj ? void 0 : Fj.instance) || void 0 === i ? void 0 : i.boardType
        ] = "chess5Gate"),
        (t[H2.getBoardType()] = "chess2Gate"),
        (t[
          null === (n = null == NE ? void 0 : NE.instance) || void 0 === n ? void 0 : n.boardType
        ] = "chess6Gate"),
        (t[
          null === (o = null == m2 ? void 0 : m2.instance) || void 0 === o ? void 0 : o.boardType
        ] = "chess7Gate"),
        (t[null == r ? void 0 : r.boardType] = "chess9Gate"),
        (t[_A.getBoardType()] = "healthfoodGate"),
        t)[e.MergeBoardType];
      return a ? Ct.getUI(a) : null;
    }),
    (e._autoMergeEndIndices = new Set()),
    (e.BoardSliding = !1),
    (e.MergeBoardType = ar.main),
    (e.cacheExtraData = new Map()),
    (e.FillCellCount = 0),
    (e._originShortCd = !1),
    (e._boardShortCd = null),
    (e._bagShortCd = null),
    (e.AnimManager = null),
    (e.UnlockingManuElement = null),
    (e.UnlockingNewElement = null),
    (e.FocusCellIdx = 0),
    (e.FocusEndCellIdx = 0),
    (e.FocusCreatorNum = 1),
    e
  );
})();
