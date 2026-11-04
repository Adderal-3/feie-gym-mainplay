// Extracted cached Cocos registration: OrderDrawerDetailWindow
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 8587049..8589700.
// Shared closure variables remain in readable/game.formatted.js:415968.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "ad2c9G1MG9ILYk9ZlrIJn54", "OrderDrawerDetailWindow");
var EXe = cc._decorator,
  AXe = EXe.ccclass,
  kXe = EXe.property;
(!(function (e) {
  function i() {
    var t = (null !== e && e.apply(this, arguments)) || this;
    return (
      (t.label_title = null),
      (t.label_desc = null),
      (t.btn_ok = null),
      (t.sprite_bg = null),
      (t.node_time = null),
      (t.label_time = null),
      (t._clock = null),
      t
    );
  }
  (t(i, e),
    (i.prototype.onInit = function () {
      this.btn_ok.on("click", this.hide, this);
    }),
    (i.prototype.onData = function () {
      return r(this, void 0, void 0, function () {
        return a(this, function (e) {
          return (this.data.isScene ? this.SceneOrderDisplay() : this._initDisplay(), [2]);
        });
      });
    }),
    (i.prototype._initDisplay = function () {
      var e = this,
        t = null,
        i = fj.GetOrderType(this.data.id);
      if (this.data.id >= 0) t = config.OrderSeries.getById(this.data.id);
      else if (1 == i) {
        if (!aV.getTimeOrderDrawerActData(Math.abs(this.data.id))) return void this.hide();
        t = aV.getConf();
      } else if (2 == i) {
        var n = E8.role.branchTask.id;
        t = config.OrderBranchList.getById(n);
      }
      if (((this.node_time.active = !1), this.data.id >= 0 || 2 == i))
        2 == i
          ? ((this.label_title.string = t.name),
            (this.label_desc.string = t.story),
            Ai(this.sprite_bg, "Texture/UI/OrderBranch/detail/" + t.detailPicture))
          : ((this.label_title.string = t.title),
            (this.label_desc.string = t.description),
            999 == t.id
              ? m(this.sprite_bg, "Texture/UI/OrderDrawer/detail/" + t.detailPicture)
              : Ai(this.sprite_bg, "Texture/UI/OrderDrawer/detail/" + t.detailPicture));
      else if (1 == i) {
        this.node_time.active = !0;
        var o = aV.getActivityEndTime(Math.abs(this.data.id)) - E8.serverTime;
        if (!(o > 200)) return void this.hide();
        ((this._clock = b.addClock("OrderDrawerDetailWindow", o / 1e3, 1e3, 1)),
          this._clock.registCallBack(
            this,
            function () {
              return e.hide();
            },
            function () {
              e.label_time.string = j(e._clock.leftSecond, !1, !0, 2);
            },
          ),
          (this.label_title.string = t.name),
          (this.label_desc.string = t.story),
          Ai(this.sprite_bg, "Texture/UI/OrderDrawer/TimeOrderDrawer/detail/" + t.detailPicture));
      }
      pe() && console.warn("drawerId:", this.data.id);
    }),
    (i.prototype.SceneOrderDisplay = function () {
      this.node_time.active = !1;
      var e = config.OrderSeriesScene.getById(this.data.id);
      ((this.label_title.string = v.getLabel("sceneDrawer_title")),
        (this.label_desc.string = v.getLabel("sceneDrawer_description")),
        Ai(this.sprite_bg, "Texture/UI/OrderDrawer/detail/" + e.detailPicture));
    }),
    (i.prototype.onHide = function () {
      return r(this, void 0, void 0, function () {
        return a(this, function (e) {
          return (this._clock && (this._clock.dispose(), (this._clock = null)), [2]);
        });
      });
    }),
    o([kXe(cc.Label)], i.prototype, "label_title", void 0),
    o([kXe(cc.Label)], i.prototype, "label_desc", void 0),
    o([kXe(cc.Node)], i.prototype, "btn_ok", void 0),
    o([kXe(cc.Sprite)], i.prototype, "sprite_bg", void 0),
    o([kXe(cc.Node)], i.prototype, "node_time", void 0),
    o([kXe(cc.Label)], i.prototype, "label_time", void 0),
    (i = o([AXe], i)));
})(Xt),
  cc._RF.pop());
