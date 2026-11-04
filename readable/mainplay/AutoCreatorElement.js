// Extracted cached Cocos registration: AutoCreatorElement
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 3363659..3370012.
// Shared closure variables remain in readable/game.formatted.js:164248.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "240b55wyx1GOLQ1jfYwe2FH", "AutoCreatorElement");
var I$ = cc._decorator,
  S$ = I$.ccclass;
I$.property;
var T$ = I$.menu,
  E$ = (function (e) {
    function n() {
      var t = (null !== e && e.apply(this, arguments)) || this;
      return ((t.clickBoardFullFeedback = !1), t);
    }
    var s;
    return (
      t(n, e),
      (s = n),
      (n.prototype.onInitRender = function (e) {
        if (!G$.IsCellInState(e, mr.web) && !G$.IsCellInState(e, mr.box)) {
          var t = e3.AddCellAnim(e, TC.AUTO_CREATOR);
          if (t) {
            var i = t.getComponent(C$);
            e.registComponent("AutoCreatorRecover", i);
            var n = G2.GetCellRecovery(e.serverIdx, yr.autoProduct);
            (i && (i.data = { recover: n, cell: e }),
              TJ.PreloadLauncherProductsByConfig(e.data.config));
          }
        }
      }),
      (n.prototype.onTimeChange = function (e) {
        (this.updateRecover(e), this.autoCreate(e));
      }),
      (n.prototype.updateRecover = function (e) {
        if (e.data) {
          var t = e.dynamicComponents.get("AutoCreatorRecover");
          t && e.data.remoteData.openEnd && t.onUnlockUpdate(null);
        }
      }),
      (n.prototype.onInitElement = function (e) {
        return r(this, void 0, void 0, function () {
          return a(this, function (t) {
            switch (t.label) {
              case 0:
                return !Tq.isShow || G2.BoardSliding
                  ? (b2.waitCreateList.includes(e.serverIdx) ||
                      b2.waitCreateList.unshift(e.serverIdx),
                    [2])
                  : [4, G2.BoardRender.waitInit()];
              case 1:
                return (
                  t.sent(),
                  !e.data || e.data.remoteData._shortCdAutoEndTime ? [2] : (this.autoCreate(e), [2])
                );
            }
          });
        });
      }),
      (n.prototype.onAroundEmpty = function (e) {
        return r(this, void 0, void 0, function () {
          return a(this, function (t) {
            switch (t.label) {
              case 0:
                return o9.currentScreen != J8.MERGE_SCREEN
                  ? [2]
                  : !Tq.isShow || G2.BoardSliding
                    ? (b2.waitCreateList.includes(e.serverIdx) ||
                        b2.waitCreateList.unshift(e.serverIdx),
                      [2])
                    : [4, G2.BoardRender.waitInit()];
              case 1:
                return (t.sent(), this.autoCreate(e), [2]);
            }
          });
        });
      }),
      (n.prototype.showBoardFullFeedback = function (e) {
        ((this.clickBoardFullFeedback = !0),
          e3.AddExclusiveCellAnim(e, TC.BOARD_FULL),
          j8.play(o_.MERGE_ITEM_GENERATE_FAIL),
          d.emit(i.OnceVibrate, { type: by.Medium, source: "棋盘已满" }),
          s.playBoardFullBagTween());
      }),
      (n.playBoardFullBagTween = function () {
        var e, t;
        if (
          (e3.StopBoardFullBagTween(), G2.MergeBoardType == ar.main && b2.GetAvailableBagType(!0))
        ) {
          var i =
            null === (t = null === (e = G2.BagCell) || void 0 === e ? void 0 : e.mergeCellRender) ||
            void 0 === t
              ? void 0
              : t.node_icon;
          e3.PlayBoardFullBagTween(i);
        }
      }),
      (n.prototype.onClickElement = function (e) {
        e.data &&
          (e.data.elementType.includes(Z2.MANU_CREATOR) ||
            ((this.clickBoardFullFeedback = !1),
            this.autoCreate(e, !0),
            this.clickBoardFullFeedback ||
              d.emit(i.OnceVibrate, { type: by.Light, source: "手动发射" })));
      }),
      (n.prototype.autoCreate = function (e, t) {
        var i,
          n = this;
        if (
          (void 0 === t && (t = !1), 0 != G$.GetCellHp(e, yr.manualProduct)) &&
          e.data &&
          !e.data.freeze &&
          !e.data.waitDispose &&
          e.cellState != Q2.LOCK &&
          e.cellState != Q2.COVER &&
          e.cellState != Q2.SNOW &&
          e.data &&
          !e.data.elementType.includes(Z2.BUBBLE) &&
          !G$.CheckProductMax(e, !0) &&
          ((e.data.creating = !1),
          (e.data.config.AutoId && e.data.config.AutoId.size > 0) ||
            e.data.config.AutoIdList.length > 0)
        ) {
          if (e.data.config.unlockDuration > 0 && !G$.IsCellInState(e, mr.opened)) return;
          var o = G2.GetCellRecovery(e.serverIdx, yr.autoProduct),
            r = G$.GetAutoCDStorage(e);
          if (!o || o.value <= 0 || o.state) return;
          var a = o.value,
            s = e.data.remoteData.hp.get(yr.autoProduct);
          if (
            (s < o.value && (a = s),
            !(
              e.data.remoteData.deteriorateEnd > 0 &&
              E8.serverTime > e.data.remoteData.deteriorateEnd
            ))
          ) {
            if (e.data.remoteData._shortCdAutoRoundEndTime) return;
            e.data.remoteData._shortCdAutoEndTime &&
              (e.data.remoteData._shortCdAutoEndTime - E8.serverTime < 300 &&
                ((e.data.remoteData._shortCdAutoEndTime = null),
                (e.data.remoteData._shortCdAutoRoundEndTime = null)),
              (a = Math.min(a, r)));
          }
          var c = G$.GetAroundEmptyCell(e, !1);
          if (t) {
            if (c.length > 0) return;
            ((c = G$.GetClosestBlankCell(e.pos, 1)), (a = 1));
          }
          if (c.length <= 0) return void (t && this.showBoardFullFeedback(e));
          c.length < a && (a = c.length);
          for (
            var l = [], d = 0, h = e.data.remoteData.autoProductCount;
            a > 0 && !(c.length <= 0);
          ) {
            var p = TJ.CellProductCheck(e, yr.autoProduct, h),
              f = c.shift();
            if (f && p && p.id > 0 && config.Element.getById(p.id)) {
              var g = {
                id: p.id,
                state: p.state,
                pos: f.pos,
                seed: e.data.randomElementInt(),
                isAutoList: p.isAutoList,
              };
              (l.push(g), d++, h++);
            }
            a--;
          }
          if (l.length <= 0) return;
          var v = new C2();
          ((v.datas = l),
            (v.fromCell = e),
            (v.count = d),
            (v.productType = vr.autoProduct),
            (v.isCreator = !0));
          var m = TJ.CreateNewElements(v);
          if (
            (m.length &&
              (m.forEach(function (e) {
                return n._checkCreateAtaiQuestionElement(e.elementId);
              }),
              setTimeout(function () {
                j8.play(o_.MERGE_CREATE);
              }, 0)),
            e.resetTween(),
            (G2.instance.focusElement &&
              !G2.instance.selectedElement &&
              G2.instance.focusElement.serverIdx == e.serverIdx) ||
              e.isElementAtCenter() ||
              e.moveElementTo(e.worldPos),
            cc
              .tween(e.mergeCellRender.node_icon)
              .to(0.1, { scale: 1.3 })
              .to(0.1, { scale: 1 })
              .call(function () {
                return e.showElementTween();
              })
              .start(),
            m.length)
          ) {
            (U2.ActivityWorldCollectCheck(m),
              b.addClock("selectSoundLock_" + e.data.remoteData.uUID, 10, 1e3, 1),
              o.decrease(m.length, !1),
              DG.addCellSpeedUpAnim(e),
              e.data.remoteData._shortCdAutoEndTime &&
                (e.data.remoteData._shortCdAutoRoundEndTime =
                  E8.serverTime + 1e3 * e.data.config.AutoShortCD),
              o.onUpdate && o.onUpdate(),
              0 == o.state && 0 == o.value && (o.state = 1),
              this._checkOrderTip(e));
            var y = e.data.config,
              _ = e.isSelect,
              w = e.data.seed.seed;
            if (!G$.DecreaseCellHp(e, yr.autoProduct, m.length)) {
              _ &&
                setTimeout(function () {
                  u.dispatch("showElementInfo", e);
                }, 0);
              var C = y.autoVanishChange;
              if (C && C.size > 0) {
                var I = b2.ParseElementsConf(C);
                if (I.length) {
                  var S = TJ.BoardRandomElement(e, I, w);
                  e.data = GW.ParseCellConfig(
                    { id: S, seed: w, state: mr.none, productType: vr.vanish },
                    e.serverIdx,
                  );
                  var T = G$.GetCellByIndex(e.serverIdx);
                  T.mergeCellRender.node_icon.scale = 0.2;
                  var E = cc
                    .tween(T.mergeCellRender.node_icon)
                    .to(0.166, { scale: 1.2 })
                    .to(0.1, { scale: 0.95 })
                    .to(0.033, { scale: 1 });
                  T.showOnceTween(E);
                  var A = null === (i = e.data.config) || void 0 === i ? void 0 : i.getSound;
                  A && j8.playByConf("mergeGet_" + A);
                  var k = config.ElementSpecialStorage.getById(e.data.config.id);
                  if (k) {
                    var R = k.vanishedStorage;
                    if (R > 0) {
                      var P = e.data.remoteData;
                      P.recovery.forEach(function (e, t) {
                        (P.hp.get(t) > 0 && P.hp.set(t, R), (e.value = R), (e.valueMax = R));
                      });
                    }
                  }
                }
              } else e3.AddCellAnim(e, TC.DISAPPEAR);
            }
            (u.dispatch(zb.ON_AUTO_CREATE, m),
              TJ.CellProductRequest(m, e, m.length, !0),
              e.callLogic(RA.AROUND_EMPTY));
          }
          e.isSelect &&
            setTimeout(function () {
              u.dispatch("showElementInfo", e);
            }, 0);
        }
      }),
      (n.prototype._checkOrderTip = function (e) {
        if (e.data && e.data.remoteData.order.orderId && e.data.remoteData.recovery) {
          var t = e.data.remoteData.recovery.get(yr.autoProduct);
          t && 0 == t.value && e3.AddCellAnim(e, TC.BAG_TIPS);
        }
      }),
      (n.prototype._checkCreateAtaiQuestionElement = function (e) {
        [71001, 71002, 71003, 71004, 71005, 71006, 71007, 71201].includes(e) &&
          K3.logEvent("atai_get_element", { id: e });
      }),
      (n = s = o([S$, T$("MergeCell/Logic/AutoCreatorElement"), BM("AutoCreatorElement")], n))
    );
  })(xM);
cc._RF.pop();
