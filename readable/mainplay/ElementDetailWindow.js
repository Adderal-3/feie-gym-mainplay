// Extracted cached Cocos registration: ElementDetailWindow
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 8560918..8566266.
// Shared closure variables remain in readable/game.formatted.js:414823.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "390b4nZLKJAz5HqZGbrn1Qp", "ElementDetailWindow");
var nXe = cc._decorator,
  oXe = nXe.ccclass,
  rXe = nXe.property;
(!(function (e) {
  function i() {
    var t = (null !== e && e.apply(this, arguments)) || this;
    return (
      (t.list = null),
      (t.label_title = null),
      (t.label_desc = null),
      (t.sprite_from_icon = null),
      (t.elementDetailInfo = null),
      (t.layout_from = null),
      (t.scroll = null),
      (t.node_from = null),
      (t.parent_from = null),
      (t.activityNode = null),
      (t.label_from = null),
      (t._detailData = null),
      (t.jumpType = ""),
      t
    );
  }
  (t(i, e),
    (i.prototype.onInit = function () {
      ot.GetPrefab(this.node_from, 10, 3);
    }),
    (i.prototype.onData = function () {
      return r(this, void 0, void 0, function () {
        var e;
        return a(this, function (t) {
          return (
            (this._detailData = Kqe.instance.parseDetailData(this.data)),
            !this._detailData.skipStoreRedirect && MW.isStoreElementId(this._detailData.id)
              ? (this.hide(),
                j_.showWindow(
                  F3.StoreElementDiscoverDetailWindow,
                  n(n({}, this._detailData), { source: "other", skipStoreRedirect: !0 }),
                ),
                [2])
              : ((e = K6.checkElementInfoSwap(this._detailData.id))
                  ? this._initDisplay(e)
                  : this._initDisplay(this._detailData.id),
                Kqe.instance.initEffectNode(this._detailData),
                [2])
          );
        });
      });
    }),
    (i.prototype._initDisplay = function (e) {
      var t = this;
      (h.log("元素原本Id:", this._detailData.id), h.log("元素展示Id:", e), CC_DEV && !F8.isProd) &&
        (Ne.getLayer(Be.TIP).getChildByName("GmTool").getComponent($ie).idEdit.string =
          this._detailData.id + "");
      var i = config.Element.getById(e),
        n = i.series.split("_")[0],
        o = config.ElementSeries.getBySeries(i.series);
      this.activityNode.active = !1;
      var r =
        o9.currentScreen == J8.MERGE_SCREEN &&
        (G2.MergeBoardType == ar.beach ||
          G2.MergeBoardType == ar.number ||
          G2.MergeBoardType == ar.ornament);
      if (o && o.jump)
        if (!r && E8.role.activity.boards.size > 0 && parseInt(o.jump) > 0)
          ((this.activityNode.active = !0),
            (this.label_from.string = v.getLabel(
              "elementDetail_eventFrom",
              config.Activity.getById(parseInt(o.jump)).name,
            )),
            (this.jumpType = "activity"));
        else {
          var a = null;
          (config.OrderSeriesScene.list.forEach(function (e) {
            a || (e.jumpName == o.jump && (a = e));
          }),
            a &&
              ((this.activityNode.active = !0),
              (this.label_from.string = v.getLabel("sceneDrawer_getWay")),
              (this.jumpType = "sceneOrder_" + a.id)));
        }
      ((this.label_title.string = "" + o.name), (this.label_desc.string = "" + o.desc));
      var s = config.Element.sheetMap.get(n);
      this.elementDetailInfo.node.active = !1;
      var c = [],
        l = 1,
        d = [];
      (s.forEach(function (t, n) {
        if (t.series == i.series && t.type == i.type) {
          if (t.prefab > 0 && d.includes(t.prefab)) return;
          if (!b2.CheckElementValid(t.id)) return;
          t.prefab > 0 && d.push(t.prefab);
          var o = t.id == e;
          (c.push({ conf: t, idx: l, isKnow: o, prefab: t.prefab }), l++);
        }
      }),
        1 == c.length && c[0].conf != i && ((c[0].conf = i), (c[0].isKnow = i.id == e)),
        (this.list.data = c));
      var u = Kqe.instance.getFromCells(e),
        p = (function (e) {
          for (var t = [], i = {}, n = 0; n < e.length; n++)
            i[e[n]] || ((i[e[n]] = !0), t.push(e[n]));
          return t;
        })((u = Kqe.instance.filterFromCells(u, e)));
      u = [];
      for (var f = 0; f < p.length; f++) {
        var g = p[f],
          m = config.Element.getById(g),
          y = config.ElementSeries.getBySeries(m.series);
        if (K6.checkI18nShow(y.i18nType)) {
          var _ = G$.IsElementKnow(m.id),
            b = s$.getHandBookTimeStamp(y.actType, 0, 0, !0);
          (!_ && E8.checkHandbookHide(b.hideStamp)) || (b2.CheckElementValid(g) && u.push(g));
        }
      }
      var w = Array.from(this.layout_from.node.children);
      (w.forEach(function (e) {
        return ot.PutPrefab(e);
      }),
        (w = Array.from(this.scroll.content.children)).forEach(function (e) {
          return ot.PutPrefab(e);
        }),
        (this.parent_from.active = !0),
        u.length > 0 && u.length < 4
          ? ((this.layout_from.node.active = !0),
            (this.scroll.node.active = !1),
            u.forEach(function (e, i) {
              var n = ot.GetPrefab(t.node_from);
              (Ai(n.getChildByName("icon").getComponent(cc.Sprite), e9.getElementTexturePath(e)),
                n.off("click", t.showProductInfo, t),
                n.on("click", t.showProductInfo, t),
                (n.name = "" + e),
                (n.parent = t.layout_from.node));
            }))
          : u.length >= 4
            ? ((this.layout_from.node.active = !1),
              (this.scroll.node.active = !0),
              u.forEach(function (e, i) {
                var n = ot.GetPrefab(t.node_from);
                (Ai(n.getChildByName("icon").getComponent(cc.Sprite), e9.getElementTexturePath(e)),
                  n.off("click", t.showProductInfo, t),
                  n.on("click", t.showProductInfo, t),
                  (n.name = "" + e),
                  (n.parent = t.scroll.content));
              }))
            : (this.parent_from.active = !1));
    }),
    (i.prototype.showProductInfo = function (e) {
      return r(this, void 0, void 0, function () {
        var t;
        return a(this, function (i) {
          return (
            (t = parseInt(e.node.name)),
            "Chest" == config.Element.getById(t).series.split("_")[0]
              ? j_.showWindow(F3.ChestDetailWindow, t)
              : config.SplitProp.getById(t)
                ? j_.showWindow(F3.SplitElementDetailWindow, { id: t, needRemind: !0 })
                : j_.showWindow(F3.ElementDetailWindow, { id: t, needRemind: !0 }),
            [2]
          );
        });
      });
    }),
    (i.prototype.onFinishClose = function () {
      Kqe.instance.playAfterDetailClose(this._detailData);
    }),
    (i.prototype.onShowAct = function () {
      if ((this.hide(), "activity" == this.jumpType)) {
        var e = T5.getState();
        e == C5.NONE || e == C5.START
          ? j_.showWindow(F3.EventWindow)
          : j_.showWindow(F3.EventTaskWindow);
      } else if (this.jumpType.startsWith("sceneOrder")) {
        var t = parseInt(this.jumpType.split("_")[1]),
          i = o9.currentScreen == J8.MERGE_SCREEN;
        if (j_.isQueuing(F3.HydrantWindow)) return;
        j_.showWindow(F3.HydrantWindow, { sceneId: t, useFlyNode: i });
      }
    }),
    o([rXe(Mw)], i.prototype, "list", void 0),
    o([rXe(cc.Label)], i.prototype, "label_title", void 0),
    o([rXe(cc.Label)], i.prototype, "label_desc", void 0),
    o([rXe(cc.Sprite)], i.prototype, "sprite_from_icon", void 0),
    o([rXe(u$)], i.prototype, "elementDetailInfo", void 0),
    o([rXe(cc.Layout)], i.prototype, "layout_from", void 0),
    o([rXe(cc.ScrollView)], i.prototype, "scroll", void 0),
    o([rXe(cc.Node)], i.prototype, "node_from", void 0),
    o([rXe(cc.Node)], i.prototype, "parent_from", void 0),
    o([rXe(cc.Node)], i.prototype, "activityNode", void 0),
    o([rXe(cc.Label)], i.prototype, "label_from", void 0),
    (i = o([oXe], i)));
})(Xt),
  cc._RF.pop());
