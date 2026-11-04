// Extracted cached Cocos registration: BagElement
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 8303375..8306135.
// Shared closure variables remain in readable/game.formatted.js:403266.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "95680Ucu4NEvIQ8ojU8MjyQ", "BagElement");
var Mze = cc._decorator,
  Gze = Mze.ccclass;
Mze.property;
var Fze = Mze.menu;
(!(function (e) {
  function n() {
    return (null !== e && e.apply(this, arguments)) || this;
  }
  var r;
  (t(n, e),
    (r = n),
    (n.prototype.onInitRender = function (e) {
      e3.AddCellAnim(e, TC.BAG_TIPS);
    }),
    (n.prototype.onSelectElement = function (e) {
      e3.StopBoardFullBagTween();
    }),
    (n.prototype.onClickElement = function (e) {
      var t = j_.getWindowData(F3.ClosetWindow).View;
      (t && (t.openFalg = !0), j_.showWindow(F3.ClosetWindow));
    }),
    (n.prototype.onPutInto = function (e, t) {
      if (!this._checkUsingInsideBagElement(t[0])) {
        var n = G2.instance,
          o = t[0].data.config.propEffect ? ~~(t[0].data.config.propEffect / 100) : 0;
        if (
          (G2.UnlockingNewElement && G2.UnlockingNewElement.serverIdx == t[0].serverIdx) ||
          (G2.UnlockingManuElement && G2.UnlockingManuElement.serverIdx == t[0].serverIdx) ||
          t[0].data.elementType.includes(Z2.BUBBLE) ||
          t[0].data.config.cannotPutInBag ||
          t[0].data.elementType.includes(Z2.STORE_ELEMENT) ||
          (t[0].data.remoteData.endTime && 7 != o && 8 != o && 9 != o && 3 != o)
        )
          return (
            A8.Toast({ title: v.getLabel("bagElement_cannotPutInBag") }),
            t[0].moveElementTo(t[0].worldPos),
            void (n.selectedElement = t[0])
          );
        var a,
          s,
          c =
            ((a = t[0].data.config.series),
            (s = config.ElementSeries.getBySeries(a)),
            b2.GetAvailableBagType(!(!s || !s.isBag)));
        if (c) {
          var l = t[0].data.remoteData;
          (G$.PauseCell(l),
            TJ.BoardRequestSend(
              hm.cellToBag,
              { boardId: G2.Data.id, index: t[0].serverIdx, bagType: c, timestamp: E8.serverTime },
              "cellToBag",
              null,
              "from" + t[0].serverIdx,
            ));
          var h = t[0].data.config.id,
            p = G2.BoardCells.get(t[0].serverIdx);
          ((p._speedUpStartTime = 0),
            p.recovery.forEach(function (e, t) {
              e instanceof U$ && p.recovery.set(t, e.toData());
            }),
            (p.index = -1));
          var f = TJ.GetMergeIncreaseId();
          switch (c) {
            case Or.mp:
              G2.BagVip.set(f, p);
              break;
            case Or.mPV2:
              G2.Data.bag.mpV2Items.set(f, p);
              break;
            case Or.passNew:
              G2.Data.bag.passNewItems.set(f, p);
              break;
            case Or.product:
              G2.BagProduct.set(f, p);
              break;
            case Or.normal:
              G2.Data.bag.items.set(f, p);
          }
          ((t[0].data = null),
            G2.recordBoardShortCd(!1, f, !0),
            e3.AddCellAnim(G2.BagCell, TC.PUT_BAG_END),
            u.dispatch("hideElementInfo"),
            u.dispatch("putElementIntoCloset", t[0]),
            (n.focusElement = null),
            G2.WaitComplete("PutBagComplete"),
            K3.logEvent("cell_to_bag", { elementid: h }),
            j8.play(o_.MERGE_PUT_BAG),
            u.dispatch("refreshDrawerItem"));
        } else {
          ((t[0].cellState = Q2.STAND),
            t[0].moveElementTo(t[0].worldPos),
            (n.selectedElement = t[0]),
            A8.Toast({ title: v.getLabel("bagElement_bagFull") }));
          var g = new Date().getTime();
          g - r.vibrateTime > 2e3 &&
            ((r.vibrateTime = g),
            d.emit(i.MultipleVibate, {
              type: by.Medium,
              count: 3,
              restartOnRetriiger: !0,
              intervals: [0, 10, 10],
              source: "背包满了",
            }));
        }
      }
    }),
    (n.prototype._checkUsingInsideBagElement = function (e) {
      return (
        !(!e || !e.data) &&
        "Prop" == e.data.config.series.split("_")[0] &&
        9 == ~~(e.data.config.propEffect / 100)
      );
    }),
    (n.vibrateTime = 0),
    (n = r = o([Gze, Fze("MergeCell/Logic/BagElement"), BM("BagElement")], n)));
})(xM),
  cc._RF.pop());
