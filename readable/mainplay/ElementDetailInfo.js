// Extracted cached Cocos registration: ElementDetailInfo
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 3334633..3337869.
// Shared closure variables remain in readable/game.formatted.js:162947.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "422ceHF7OtDn7poe1FcGlI/", "ElementDetailInfo");
var c$ = cc._decorator,
  l$ = c$.ccclass,
  d$ = c$.property,
  u$ = (function (e) {
    function i() {
      var t = (null !== e && e.apply(this, arguments)) || this;
      return (
        (t.layout = null),
        (t.node_item = null),
        (t.btn_back = null),
        (t.node_bg = null),
        (t.node_scroll = null),
        (t.sprite_icon = null),
        (t.label_title = null),
        (t.label_desc = null),
        (t._pendingAnimation = !1),
        (t._eleId = 0),
        (t._data = []),
        t
      );
    }
    return (
      t(i, e),
      (i.prototype.onLoad = function () {
        this.btn_back.on("click", this.onClickBack, this);
      }),
      Object.defineProperty(i.prototype, "data", {
        get: function () {
          return this._data;
        },
        set: function (e) {
          ((this._data = e), this.setDisplay());
        },
        enumerable: !1,
        configurable: !0,
      }),
      (i.prototype.setElement = function (e) {
        this._eleId = e;
        var t = config.Element.getById(e);
        if ("Order" == t.series.split("_")[0]) {
          var i = e9.getItemConfig(oa.element, e).icon;
          Ai(this.sprite_icon, i + "_ready", y.BorderScale);
        } else if (99901 == e) {
          var n = 5001;
          (E8.role.bagSkin.forEach(function (e, t) {
            e && (n = t);
          }),
            Ai(this.sprite_icon, e9.getBagSkinIconPath(n), y.BorderScale));
        } else Ai(this.sprite_icon, e9.getElementTexturePath(e), y.BorderScale);
        "Mirror" == t.series.split("_")[0]
          ? (this.label_title.string = "" + t.name)
          : (this.label_title.string = v.getLabel("elementDetail_name", t.name, t.level));
        var o = t.propEffect;
        this.label_desc.string =
          o && 13 == ~~(o / 100)
            ? v.getLabel("lamp_desc")
            : f.substitute(b2.CheckElementDesc(e), "");
      }),
      (i.prototype.setDisplay = function () {
        return r(this, void 0, void 0, function () {
          var e,
            t,
            i,
            n = this;
          return a(this, function (o) {
            switch (o.label) {
              case 0:
                ((e = function (e, t) {
                  var i,
                    n =
                      null === (i = t.getChildByName("label_time")) || void 0 === i
                        ? void 0
                        : i.getComponent(cc.Label);
                  if (n)
                    if (K6.checkIsPropClock(e)) {
                      var o = K6.getPropClockTime(e);
                      ((n.node.active = !0), (n.string = j(o, !1, !0, 2)));
                    } else n.node.active = !1;
                }),
                  (t = X8.isShovel(this._eleId)),
                  (this.node_scroll.active = !1),
                  Array.from(this.layout.node.children).forEach(function (e) {
                    return ot.PutPrefab(e);
                  }),
                  this.data.length > 0 &&
                    ((this.node_scroll.active = !0),
                    this.data.forEach(function (i, o) {
                      if (t && !X8.isShovelProduct(i.id)) return;
                      var r = ot.GetPrefab(n.node_item),
                        a = config.Element.getById(i.id),
                        s = a.prefab ? a.prefab : a.id,
                        c = r.getChildByName("icon"),
                        l = r.getChildByName("web"),
                        d = K6.imageCheck(s);
                      (Ai(c.getComponent(cc.Sprite), d || e9.getElementTexturePath(s)),
                        (l.active = i.dust),
                        i.dust
                          ? (c.color = cc.color(150, 150, 150))
                          : (c.color = cc.color(255, 255, 255)),
                        (r.parent = n.layout.node),
                        (r.active = !0),
                        e(i.id, r));
                    })),
                  (this.node.active = !0),
                  (i = 500 / cc.game.getFrameRate()),
                  (this._pendingAnimation = !0),
                  rb.playAnimation(this.node.getComponent(cc.Animation)).finally(function () {
                    n._pendingAnimation = !1;
                  }),
                  (o.label = 1));
              case 1:
                return ((this.layout.node.x = 0), [4, S(i)]);
              case 2:
                (o.sent(), (o.label = 3));
              case 3:
                if (this._pendingAnimation) return [3, 1];
                o.label = 4;
              case 4:
                return ((this.layout.node.x = 0), [2]);
            }
          });
        });
      }),
      (i.prototype.onClickBack = function () {
        this.node.active = !1;
      }),
      (i.prototype.onDisable = function () {
        (this.layout.node.stopAllActions(), (this._pendingAnimation = !1));
      }),
      o([d$(cc.Layout)], i.prototype, "layout", void 0),
      o([d$(cc.Node)], i.prototype, "node_item", void 0),
      o([d$(cc.Node)], i.prototype, "btn_back", void 0),
      o([d$(cc.Node)], i.prototype, "node_bg", void 0),
      o([d$(cc.Node)], i.prototype, "node_scroll", void 0),
      o([d$(cc.Sprite)], i.prototype, "sprite_icon", void 0),
      o([d$(cc.Label)], i.prototype, "label_title", void 0),
      o([d$(cc.Label)], i.prototype, "label_desc", void 0),
      (i = o([l$], i))
    );
  })(cc.Component);
cc._RF.pop();
