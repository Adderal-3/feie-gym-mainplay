// Extracted cached Cocos registration: OrderListItem
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 2031409..2041998.
// Shared closure variables remain in readable/game.formatted.js:99118.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "d912eELM3tMMpMrOonk3IaG", "OrderListItem");
var RF = cc._decorator,
  PF = RF.ccclass,
  DF = RF.property,
  BF = (function (e) {
    function n() {
      var t = (null !== e && e.apply(this, arguments)) || this;
      return (
        (t.node_normal_bg = null),
        (t.node_finish = null),
        (t.node_finish_bg = null),
        (t.node_canBuy = null),
        (t.sprite_icon = null),
        (t.label_num = null),
        (t.btn_info = null),
        (t.color_material = null),
        (t.normal_material = null),
        (t._isFinish = !1),
        (t.pauseCheck = !1),
        (t.orderSelectAnim = TC.SELECTED_ORDER),
        (t._finishElements = []),
        (t.shopSaleInfo = null),
        (t._iconLoadPromise = null),
        (t.useBagElement = []),
        (t.useElement = 0),
        (t.bagButterflyScore = 0),
        (t.bagButterflyType = 0),
        (t.actPlusEnergyCount = 0),
        (t.actMaxEnergyCount = 0),
        (t.act8EnergyCount = 0),
        (t.mainEnergyCount = 0),
        (t.extraResCount = new Map()),
        (t.hexDimmed = "#AA603BA8"),
        t
      );
    }
    return (
      t(n, e),
      (n.prototype.onLoad = function () {
        (e.prototype.onLoad.call(this), this.node_canBuy.on("click", this.onClickCanBuy, this));
      }),
      Object.defineProperty(n.prototype, "data", {
        get: function () {
          return this._data;
        },
        set: function (e) {
          ((this._data = e),
            e.selectAnim
              ? (this.orderSelectAnim = e.selectAnim)
              : (this.orderSelectAnim = TC.SELECTED_ORDER),
            this.setDisplay());
        },
        enumerable: !1,
        configurable: !0,
      }),
      (n.prototype.waitIconLoaded = function () {
        return r(this, void 0, void 0, function () {
          return a(this, function (e) {
            switch (e.label) {
              case 0:
                if (!this._iconLoadPromise) return [2];
                e.label = 1;
              case 1:
                return (e.trys.push([1, 3, , 4]), [4, this._iconLoadPromise]);
              case 2:
              case 3:
                return (e.sent(), [3, 4]);
              case 4:
                return [2];
            }
          });
        });
      }),
      (n.prototype.onDisable = function () {
        var e;
        ((this._data = null),
          null === (e = null == G2 ? void 0 : G2.BoardRender) ||
            void 0 === e ||
            e.removeRenderOrderListItem(this),
          u.remove("newElementCreate", this.onElementCreate, this));
      }),
      (n.prototype.onEnable = function () {
        var e;
        (null === (e = null == G2 ? void 0 : G2.BoardRender) ||
          void 0 === e ||
          e.addRenderOrderListItem(this),
          u.add("newElementCreate", this.onElementCreate, this));
      }),
      (n.prototype.setDisplay = function () {
        return r(this, void 0, void 0, function () {
          var e, t, i;
          return a(this, function (n) {
            return (
              this.setNormalBackgroundColor(),
              (this.shopSaleInfo = null),
              (e = xz.needElements.get(this.data.id)) || (e = 0),
              (e += this.data.num),
              xz.needElements.set(this.data.id, e),
              (this.pauseCheck = !1),
              (this._isFinish = !1),
              this.btn_info.off("click", this.onClickInfo, this),
              this.btn_info.on("click", this.onClickInfo, this),
              (t = K6.imageCheck(this.data.id))
                ? ((this.btn_info.active = !1), (this._iconLoadPromise = Ai(this.sprite_icon, t)))
                : ((this.btn_info.active = !0),
                  (this._iconLoadPromise = Ai(
                    this.sprite_icon,
                    e9.getElementTexturePath(this.data.id),
                  ))),
              (i = b2.GetBoardHaveElement([this.data.id], this.data.num)),
              (this.label_num.string = i.length + "/" + this.data.num),
              (this.node_finish.active = i.length >= this.data.num),
              (this.node_finish_bg.active = i.length >= this.data.num),
              this.checkFinish(),
              [2]
            );
          });
        });
      }),
      (n.prototype.setNormalBackgroundColor = function (e) {
        (void 0 === e && (e = "#FFDE92"),
          this.node_normal_bg && (this.node_normal_bg.color = cc.Color.fromHEX(cc.color(), e)));
      }),
      (n.prototype.checkFinish = function (e) {
        var t,
          i,
          n,
          o = this;
        if (
          (void 0 === e && (e = !1),
          o9.currentScreen == J8.MERGE_SCREEN && !this.pauseCheck && this.data)
        ) {
          var r = b2.GetBoardHaveElement([this.data.id]),
            a =
              null === (t = m2.instance) || void 0 === t ? void 0 : t.checkIsOrderEle(this.data.id),
            s = AF.needHideUnlock == this.data.id;
          if (a) {
            ((this.label_num.node.active = !1),
              b2.isElementUnlock(this.data.id) && !s
                ? (this.removeSilhouette(), (this.btn_info.active = !0))
                : ((this.btn_info.active = !1), this.addSilhouette(this.hexDimmed)));
          } else {
            this.label_num.node.active = !0;
            var c = b2.GetBoardHaveElementIncludeBubble([this.data.id]);
            (this.orderSelectAnim != TC.SELECTED_ORDER && (c = r),
              this.updateCell(c),
              this.removeSilhouette());
          }
          var l = r.length;
          if (
            (a && (l = b2.isElementUnlock(this.data.id) && !s ? 1 : 0),
            (this.useBagElement = []),
            (this.useElement = 0),
            (this.bagButterflyScore = 0),
            (this.bagButterflyType = 0),
            this.extraResCount.clear(),
            l < this.data.num)
          ) {
            var d = b2.GetBagHaveElement([this.data.id], this.data.num - l);
            ((l += d.length),
              (this.useBagElement = d),
              (this.useElement = d.length > 0 ? b2.GetElementFromBagId([d[0]])[0] : 0));
            for (var h = !1, p = !1, f = 0, g = 0, v = 0, m = 0, y = 0; y < d.length; ++y) {
              var _ = G2.Data.bag.items.get(this.useBagElement[y]);
              (_ || (_ = G2.Data.bag.mpItems.get(this.useBagElement[y])),
                _ || (_ = G2.Data.bag.producerItems.get(this.useBagElement[y])),
                _ || (_ = G2.Data.bag.passNewItems.get(this.useBagElement[y])),
                _ || (_ = G2.Data.bag.mpV2Items.get(this.useBagElement[y])));
              var b = r3.ButterflyScoreByGDCell(_);
              ((DC.CheckHasExtraByRemote(_) ||
                (null === (i = dI.instance) || void 0 === i
                  ? void 0
                  : i.CheckHasExtraByRemote(_))) &&
                f++,
                X8.CheckHasExtraByRemote(_) && g++,
                (null === (n = dI.instance) || void 0 === n
                  ? void 0
                  : n.CheckHasExtraByRemote(_)) && v++,
                (m += qG.CheckHasExtraByRemote(_)));
              var w = hx.instance.getHasExtraRes(_);
              (w &&
                w.length > 0 &&
                w.forEach(function (e) {
                  o.extraResCount.set(e, (o.extraResCount.get(e) || 0) + 1);
                }),
                (this.bagButterflyScore += b.score),
                2 == b.type ? (p = !0) : 1 == b.type && (h = !0));
            }
            ((this.actPlusEnergyCount = f),
              (this.actMaxEnergyCount = g),
              (this.act8EnergyCount = v),
              (this.mainEnergyCount = m),
              (this.bagButterflyType = r3.CalButterflyType(h, p)));
          }
          if (!e) {
            var C = this.data.id;
            ((this.node_canBuy.active = !1),
              l < this.data.num &&
                E8.isUnlocked("shopShowItem") &&
                kF.checkCanBuyAsync(C, function (e) {
                  var t;
                  (null === (t = o.data) || void 0 === t ? void 0 : t.id) == C &&
                    ((o.shopSaleInfo = e),
                    e.found && e.offerId && kF.platformShowLog(e.elemId, e.offerId),
                    (o.node_canBuy.active = e.found));
                }));
          }
          (this._isFinish != l >= this.data.num &&
            ((this._isFinish = l >= this.data.num),
            this._isFinish ? this.data.order.finishCount++ : this.data.order.finishCount--,
            this._isFinish && u.dispatch(f2.UPDATE_OII_ACT7_PASS)),
            (this.label_num.string = (l > this.data.num ? this.data.num : l) + "/" + this.data.num),
            (this.node_finish.active = l >= this.data.num),
            (this.node_finish_bg.active = l >= this.data.num));
        }
      }),
      (n.prototype.addSilhouette = function (e) {
        var t = this.sprite_icon.node.getComponent(zI);
        (t ||
          ((t = this.sprite_icon.node.addComponent(zI)),
          this.sprite_icon.setMaterial(0, this.color_material),
          (t.material = this.color_material)),
          t && t.silhouette.toHEX() != e && (t.silhouette = cc.Color.fromHEX(cc.color(), e)));
      }),
      (n.prototype.removeSilhouette = function () {
        this.sprite_icon.node.getComponent(zI) &&
          (this.sprite_icon.setMaterial(0, this.normal_material),
          this.sprite_icon.node.removeComponent(zI));
      }),
      (n.prototype.updateCell = function (e) {
        var t = this;
        e.forEach(function (e, i) {
          var n = G$.GetCellByIndex(e);
          e3.AddCellAnim(n, t.orderSelectAnim);
        });
      }),
      (n.prototype.getFinishElements = function () {
        if (!this.data) return [];
        var e = b2.GetBoardHaveElement([this.data.id], this.data.num);
        return ((this._finishElements = e), e);
      }),
      (n.prototype.finishOrder = function (e, t) {
        return r(this, void 0, void 0, function () {
          var e,
            n,
            o,
            s,
            c,
            l,
            h,
            p,
            f,
            g,
            v = this;
          return a(this, function (m) {
            switch (m.label) {
              case 0:
                for (
                  this.sprite_icon.node.off("click", this.onClickInfo, this),
                    e = this.orderSelectAnim,
                    n = [],
                    o = this._finishElements,
                    s = function (i, s) {
                      var c = r(v, void 0, void 0, function () {
                        var n,
                          s,
                          c,
                          l,
                          d,
                          h,
                          p,
                          f,
                          g,
                          v,
                          m,
                          y,
                          _,
                          b,
                          w,
                          C,
                          I,
                          T,
                          E,
                          A = this;
                        return a(this, function (k) {
                          switch (k.label) {
                            case 0:
                              return (
                                u.remove("newElementCreate", this.onElementCreate, this),
                                (n = G$.GetCellByIndex(o[i])),
                                e3.RemoveCellAnim(n, e),
                                n.data
                                  ? ((s = n.data.mergeCellIconUrl),
                                    (c = n.worldPos),
                                    (l = r3.ButterflyScoreByCell(n)),
                                    (d = DC.CheckHasExtra(n)),
                                    (h = X8.CheckHasExtra(n)),
                                    (p =
                                      null === (C = m2.instance) || void 0 === C
                                        ? void 0
                                        : C.CheckHasExtra(n)),
                                    (f =
                                      null === (I = dI.instance) || void 0 === I
                                        ? void 0
                                        : I.CheckHasExtra(n)),
                                    (g = qG.CheckHasExtra(n)),
                                    (v = hx.instance.getHasExtraRes(n)),
                                    (m = l.score),
                                    (y = l.type),
                                    (_ = n.worldPos),
                                    n && (n.data = null),
                                    [4, S(50)])
                                  : [3, 4]
                              );
                            case 1:
                              return (k.sent(), [4, CS.flyInit(this.sprite_icon.node, c)]);
                            case 2:
                              return (
                                (b = k.sent()),
                                m > 0 &&
                                  ((w = Ct.getUI("ThemePassBtn")),
                                  r(A, void 0, void 0, function () {
                                    return a(this, function (e) {
                                      switch (e.label) {
                                        case 0:
                                          return (
                                            (IL._addCount += m),
                                            [4, h3.ComplexButterFlyAnim(w, _, m, y)]
                                          );
                                        case 1:
                                          return (
                                            e.sent(),
                                            (IL._addCoinAnim = !0),
                                            u.dispatch("updateButterflyPassProgress"),
                                            [2]
                                          );
                                      }
                                    });
                                  })),
                                d && DC.checkActPlusEnergyForce(c),
                                h && X8.checkActPlusEnergyForce(c),
                                p &&
                                  (null === (T = m2.instance) ||
                                    void 0 === T ||
                                    T.checkActPlusEnergyForce(c)),
                                f &&
                                  (null === (E = dI.instance) ||
                                    void 0 === E ||
                                    E.checkAct8EnergyForce(c)),
                                g && qG.checkEnergyForce(c, g, !0),
                                v &&
                                  v.length > 0 &&
                                  v.forEach(function (e) {
                                    hx.instance.collectExtraRes(e, 1, c, !1);
                                  }),
                                t
                                  ? [2, CS.flyOrderElementWithEarlyArrival(s, b.start, b.end)]
                                  : [
                                      4,
                                      CS.flyIconSpecial(
                                        s,
                                        b.start,
                                        b.end,
                                        null,
                                        !1,
                                        cc.v2(100, 100),
                                      ),
                                    ]
                              );
                            case 3:
                              (k.sent(), (k.label = 4));
                            case 4:
                              return [2, null];
                          }
                        });
                      });
                      (n.push(
                        c.then(function (e) {
                          return null == e ? void 0 : e.finished;
                        }),
                      ),
                        t &&
                          t.push(
                            c.then(function (e) {
                              return null == e ? void 0 : e.beforeArrival;
                            }),
                          ));
                    },
                    c = 0,
                    l = o.length;
                  c < l;
                  c++
                )
                  s(c);
                return (
                  this.useBagElement.length &&
                    this.useElement &&
                    (h = G$.GetCellById(99901)) &&
                    ((p = (function () {
                      return r(v, void 0, void 0, function () {
                        var e, i, n;
                        return a(this, function (o) {
                          switch (o.label) {
                            case 0:
                              return (
                                (e = config.Element.getById(this.useElement)),
                                (i = e9.getElementTexturePath(e.prefab ? e.prefab : e.id)),
                                [4, CS.flyInit(this.sprite_icon.node, h.worldPos)]
                              );
                            case 1:
                              return (
                                (n = o.sent()),
                                t
                                  ? [2, CS.flyOrderElementWithEarlyArrival(i, n.start, n.end)]
                                  : [
                                      4,
                                      CS.flyIconSpecial(
                                        i,
                                        n.start,
                                        n.end,
                                        null,
                                        !1,
                                        cc.v2(100, 100),
                                      ),
                                    ]
                              );
                            case 2:
                              return (o.sent(), [2, null]);
                          }
                        });
                      });
                    })()),
                    n.push(
                      p.then(function (e) {
                        return null == e ? void 0 : e.finished;
                      }),
                    ),
                    t &&
                      t.push(
                        p.then(function (e) {
                          return null == e ? void 0 : e.beforeArrival;
                        }),
                      )),
                  this.data &&
                    ((f = xz.needElements.get(this.data.id)),
                    (f -= this.data.num) <= 0
                      ? (b2.GetBoardHaveElementIncludeBubble([this.data.id]).forEach(function (t) {
                          var i = G$.GetCellByIndex(t);
                          e3.RemoveCellAnim(i, e);
                        }),
                        xz.needElements.delete(this.data.id))
                      : xz.needElements.set(this.data.id, f)),
                  [4, Promise.all(n)]
                );
              case 1:
                return (
                  m.sent(),
                  (g = V8.getVibrateCount(oa.diamond, o.length)) > 0 &&
                    d.emit(i.MultipleVibate, {
                      type: by.Light,
                      count: g,
                      intervals: [0, 10, 10, 10],
                      source: "OrderListItem.flyReward",
                    }),
                  [2]
                );
            }
          });
        });
      }),
      (n.prototype.flyAnim = function (e, t, i) {
        return r(this, void 0, void 0, function () {
          var n;
          return a(this, function (o) {
            switch (o.label) {
              case 0:
                return [4, CS.flyInit(t, i)];
              case 1:
                return (
                  (n = o.sent()),
                  [4, CS.flyIconSpecial(e, n.start, n.end, null, !1, cc.v2(100, 100))]
                );
              case 2:
                return (o.sent(), (t.scale = 1), [2]);
            }
          });
        });
      }),
      (n.prototype.onElementCreate = function (e) {
        this.checkFinish(!0);
      }),
      (n.prototype.onClickInfo = function () {
        if (!o8.curGuideId) {
          var e = b.getClock("ChannelCleanUpLock");
          (e && e.running) || b2.ShowElementDetail(this.data.id, this.node, !0);
        }
      }),
      (n.prototype.onClickCanBuy = function () {
        var e,
          t = b.getClock("ChannelCleanUpLock");
        (t && t.running) ||
          ((null === (e = this.shopSaleInfo) || void 0 === e ? void 0 : e.found) &&
            (this.shopSaleInfo.offerId &&
              kF.platformOpenLog(this.shopSaleInfo.elemId, this.shopSaleInfo.offerId),
            K6.openShop(this.shopSaleInfo.groupId, !0, this.shopSaleInfo.elemId)));
      }),
      o([DF(cc.Node)], n.prototype, "node_normal_bg", void 0),
      o([DF(cc.Node)], n.prototype, "node_finish", void 0),
      o([DF(cc.Node)], n.prototype, "node_finish_bg", void 0),
      o([DF(cc.Node)], n.prototype, "node_canBuy", void 0),
      o([DF(cc.Sprite)], n.prototype, "sprite_icon", void 0),
      o([DF(cc.Label)], n.prototype, "label_num", void 0),
      o([DF(cc.Node)], n.prototype, "btn_info", void 0),
      o([DF(cc.Material)], n.prototype, "color_material", void 0),
      o([DF(cc.Material)], n.prototype, "normal_material", void 0),
      o([Jb(i.ShopItemRefresh)], n.prototype, "checkFinish", null),
      (n = o([PF], n))
    );
  })($_);
cc._RF.pop();
