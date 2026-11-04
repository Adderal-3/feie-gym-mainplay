// Extracted cached Cocos registration: MergeScreen
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 2848035..2854153.
// Shared closure variables remain in readable/game.formatted.js:138452.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "a6242waezFMzpGiMC2YBskR", "MergeScreen");
var Cq = cc._decorator,
  Iq = Cq.ccclass,
  Sq = Cq.property,
  Tq = (function (e) {
    function n() {
      var t = (null !== e && e.apply(this, arguments)) || this;
      return (
        (t.mergeBoardRender = null),
        (t.btn_shop = null),
        (t.btn_actShop = null),
        (t.btn_back = null),
        (t.top = null),
        (t.bottom = null),
        (t.center = null),
        (t.giftNode = null),
        (t._resized = !1),
        (t._bottomGap = 10),
        t
      );
    }
    var s;
    return (
      t(n, e),
      (s = n),
      (n.prototype.onInit = function () {
        return r(this, void 0, void 0, function () {
          return a(this, function (e) {
            return (
              E8.isUnlocked(uy.ShopUnlock) || lI.setRed(eI.Shop, 0),
              this.btn_shop.on("click", this.onClickShop, this),
              this.btn_actShop.on("click", this.onClickShop, this),
              this.btn_back.on("click", this.onClickBack, this),
              this.btn_back.getComponent(kt) || this.btn_back.addComponent(kt),
              this.btn_back.active && Ct.onUIState(this.btn_back, It.Active),
              this.resizeBoard(),
              [2]
            );
          });
        });
      }),
      (n.prototype.onOpen = function () {
        (u.dispatch("quitVisit"),
          (s.isShow = !1),
          (s.isInit = !1),
          (cc.macro.ENABLE_MULTI_TOUCH = !1),
          K3.logEvent("enter_board", { type: G2.MergeBoardType }),
          (s.boardGuideId = this.checkHasBoardGuide()),
          this._init(),
          (this.oldBoardType = G2.MergeBoardType),
          cc.sys.garbageCollect(),
          u.dispatch(zb.ENTER_BOARD),
          d.emit(i.EnterBoard, { boardType: G2.MergeBoardType }));
      }),
      (n.prototype.checkHasBoardGuide = function () {
        var e = YF.needShowSystemOrderDrawerGuide();
        return e || null;
      }),
      (n.prototype._init = function () {
        return r(this, void 0, void 0, function () {
          var e;
          return a(this, function (t) {
            switch (t.label) {
              case 0:
                return G2.Data ? [3, 2] : [4, S(33)];
              case 1:
                return (t.sent(), [3, 0]);
              case 2:
                (this.checkShopOpen(),
                  G2.TouchResume(),
                  (G2.FillCellCount = 0),
                  (e = GW.ParseBoardConfig(G2.Data)),
                  (this.mergeBoardRender.data = e),
                  (t.label = 3));
              case 3:
                return this.mergeBoardRender.readyCount < e.mergeBoardSize.x * e.mergeBoardSize.y
                  ? [4, S(66)]
                  : [3, 5];
              case 4:
                return (t.sent(), [3, 3]);
              case 5:
                return ((s.isInit = !0), this.onFinishInit(), [2]);
            }
          });
        });
      }),
      (n.prototype.resizeBoard = function () {
        if (!this._resized) {
          this._resized = !0;
          var e = Ne.stageHeight,
            t = this.bottom.height,
            i = this.center.height,
            n = e / 2 - this.top.height - Math.max(0, Ne.statusNotchHeight),
            o = e / 2 + n;
          if (i + this._bottomGap + t > o) {
            var r = (o - this._bottomGap - t) / i;
            this.center.setScale(r);
          }
          var a = this.center.height * this.center.scaleY,
            s = o - (a + this._bottomGap + t),
            c = 0.17 * s,
            l = 0.83 * s;
          ((this.center.y = n - c - a / 2),
            (this.bottom.y = l + this.bottom.height / 2 - e / 2),
            (this.giftNode.y = n),
            (this.giftNode.scale = this.center.scale),
            console.log("emptyTopY", c),
            console.log("emptyBottomY", l));
        }
      }),
      (n.prototype.onHide = function () {
        return r(this, void 0, void 0, function () {
          return a(this, function (e) {
            return (this.exitBoard(), [2]);
          });
        });
      }),
      (n.prototype.exitBoard = function () {
        (G2.CancelBoardSlide(),
          d.emit(i.QuitBoard, { boardType: this.oldBoardType }),
          u.dispatch(zb.QUIT_BOARD),
          (s.isInit = !1),
          (s.isShow = !1),
          (s.isFinishInit = !1),
          G2.PauseTip(),
          (G2.UnlockingManuElement = null),
          (G2.UnlockingNewElement = null),
          (G2.instance.bagCell = null),
          G2.instance.unlimitEnergy(!1, !1),
          (aV.isAlreadyRefresh = !1),
          (G$.forceCloseExtraProduct = !0),
          e3.ClearDetachedCellAnims(),
          U$.ClearAllBoard(),
          nq.removeAreaLock(),
          j_.clearPopup(Iy.OnBoard));
      }),
      (n.prototype.onClickShop = function () {
        xz.touchPause || o8.isRunning() || K6.openShop();
      }),
      (n.prototype.onClickBack = function () {
        xz.touchPause ||
          (u.dispatch("hideElementInfo"),
          K3.logEvent("quit_board", { type: G2.MergeBoardType }),
          C4.show({ goScreen: J8.HOME_SCREEN }));
      }),
      (n.prototype.onFinishInit = function () {
        return r(this, void 0, void 0, function () {
          return a(this, function (e) {
            switch (e.label) {
              case 0:
                (nq.setAreaLock(),
                  xK.hide(),
                  G2.UnlockingManuElement && b2.ManuUnlock(G2.UnlockingManuElement),
                  G2.UnlockingNewElement && b2.ManuNewUnlock(G2.UnlockingNewElement),
                  G2.instance && G2.instance.showUnlimitEnergy(!0),
                  G2.MergeBoardType == ar.main
                    ? kK.instance.screenWeakGuide()
                    : kK.instance.screenWeakGuideStop(),
                  (e.label = 1));
              case 1:
                return C4.isHide ? [4, S(33)] : [3, 3];
              case 2:
                return (e.sent(), [3, 1]);
              case 3:
                (G2.BoardRender.orderInfo.show(), (e.label = 4));
              case 4:
                return s.isShow ? [3, 6] : [4, S(33)];
              case 5:
                return (e.sent(), [3, 4]);
              case 6:
                return (
                  b2.CheckWaitList(),
                  kK.mergeScreenGuide(),
                  this.onFinishCheckGuide(),
                  (s.isFinishInit = !0),
                  d.emit(i.FinishEnterBoard, { boardType: G2.MergeBoardType }),
                  Le.resolve(Pe.MergeScreenFinishInit),
                  [2]
                );
            }
          });
        });
      }),
      (n.prototype.onFinishCheckGuide = function () {
        (h.error("onFinishCheckGuide"),
          null != s.boardGuideId &&
            (kK.showGuideNew(s.boardGuideId, !0),
            kK.awaitGuide(!1).then(function () {
              s.boardGuideId = null;
            })));
      }),
      (n.prototype.checkShopOpen = function () {
        var e = config.Config.config;
        (E8.role.level >= e.shopUnlockPlayerLevel && lI.setOpen(eI.Shop, !0),
          lI.setOpen(eI.ActShop, !1));
        var t = dI.instance;
        t && t.isInActBoard && (lI.setOpen(eI.Shop, !1), lI.setOpen(eI.ActShop, t.isShopUnlock));
      }),
      (n.prototype.checkActShopOpen = function () {
        var e = dI.instance;
        e &&
          e.isInActBoard &&
          (!e.isPrevShopUnlocked && e.isShopUnlock && lI.setRed(eI.ActShop, 1),
          lI.setOpen(eI.ActShop, e.isShopUnlock));
      }),
      Object.defineProperty(n, "isShow", {
        get: function () {
          return (this._isShow || C4.isShow || (this.isShow = !0), this._isShow);
        },
        set: function (e) {
          (!this._isShow && e && u.dispatch("MergeScreenShow"), (this._isShow = e));
        },
        enumerable: !1,
        configurable: !0,
      }),
      (n.waitFinishInit = function () {
        var e = this;
        return Le.waitFor(Pe.MergeScreenFinishInit, function () {
          return e.isFinishInit;
        });
      }),
      (n.showMergeScreen = function () {
        return r(this, void 0, void 0, function () {
          return a(this, function (e) {
            switch (e.label) {
              case 0:
                return (
                  h.error("safeEnterMergeScreen"),
                  [4, C4.show({ goScreen: J8.MERGE_SCREEN })]
                );
              case 1:
                (e.sent(), (e.label = 2));
              case 2:
                return o9.currentScreen == J8.MERGE_SCREEN ? [3, 4] : [4, S(33)];
              case 3:
                return (e.sent(), [3, 2]);
              case 4:
                return s.isFinishInit && !C4.isShow ? [3, 6] : [4, S(33)];
              case 5:
                return (e.sent(), [3, 4]);
              case 6:
                return null == s.boardGuideId ? [3, 8] : [4, kK.awaitGuide(!1)];
              case 7:
                (e.sent(), (e.label = 8));
              case 8:
                return (h.error("safeEnterMergeScreen end"), [2]);
            }
          });
        });
      }),
      (n.isInit = !1),
      (n.firstShowOrder = !1),
      (n._isShow = !1),
      (n.isFinishInit = !1),
      (n.boardGuideId = null),
      o([Sq(wq)], n.prototype, "mergeBoardRender", void 0),
      o([Sq(cc.Node)], n.prototype, "btn_shop", void 0),
      o([Sq(cc.Node)], n.prototype, "btn_actShop", void 0),
      o([Sq(cc.Node)], n.prototype, "btn_back", void 0),
      o([Sq(cc.Node)], n.prototype, "top", void 0),
      o([Sq(cc.Node)], n.prototype, "bottom", void 0),
      o([Sq(cc.Node)], n.prototype, "center", void 0),
      o([Sq(cc.Node)], n.prototype, "giftNode", void 0),
      o([Jb(i.LevelUp)], n.prototype, "checkShopOpen", null),
      o([Jb(i.UpdateActShopOpen)], n.prototype, "checkActShopOpen", null),
      (n = s = o([Iq], n))
    );
  })(Xt);
cc._RF.pop();
