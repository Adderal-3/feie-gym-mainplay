// Extracted cached Cocos registration: OrderList
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 2506920..2511421.
// Shared closure variables remain in readable/game.formatted.js:121740.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "58e37fAy89NS61NIXrOAQKl", "OrderList");
var Sj = cc._decorator,
  Tj = Sj.ccclass,
  Ej = Sj.property,
  Aj = (function (e) {
    function i() {
      var t = (null !== e && e.apply(this, arguments)) || this;
      return (
        (t.prefab_item = null),
        (t._tmpNode = null),
        (t._data = []),
        (t._animationVersion = 0),
        (t._cancelHideAnimations = new Set()),
        t
      );
    }
    return (
      t(i, e),
      (i.prototype.onLoad = function () {
        this.prefab_item && (this._tmpNode = cc.instantiate(this.prefab_item));
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
      (i.prototype.setDisplay = function () {
        if ((this.resetOrderAnimations(), this.node.children.length > this.data.length))
          for (; this.node.children.length > this.data.length;)
            ot.PutPrefab(this.node.children[this.node.children.length - 1]);
        for (var e = 0; e < this.data.length; e++) {
          var t = null;
          (((t =
            this.node.children.length <= e ? this.getNewItem() : this.node.children[e]).active =
            !0),
            (t.scale = 1),
            (t.zIndex = e));
          var i = t.getComponent($_);
          ((t.name = "orderItem_" + e), (i.data = this.data[e]));
        }
        x(this.node);
      }),
      (i.prototype.onDisable = function () {
        this.resetOrderAnimations();
      }),
      (i.prototype.resetOrderAnimations = function () {
        this._animationVersion++;
        for (var e = Array.from(this._cancelHideAnimations), t = 0, i = e.length; t < i; t++)
          e[t]();
        var n = this.node.children;
        for (t = 0, i = n.length; t < i; t++) {
          var o = n[t];
          (o.stopAllActions(), (o.scale = 1));
          var r = o.getComponentInChildren(cc.Button);
          r && (r.interactable = !0);
        }
        var a = this.node.getComponent(cc.Layout);
        a && (a.enabled = !0);
      }),
      (i.prototype.animAddOrders = function (e, t) {
        return (
          void 0 === t && (t = null),
          r(this, void 0, void 0, function () {
            var i,
              n,
              o,
              r,
              s,
              c,
              d,
              u,
              h,
              p,
              f = this;
            return a(this, function (a) {
              switch (a.label) {
                case 0:
                  ((i = this._animationVersion),
                    (n = this.node.getComponent(cc.Layout)),
                    (o = n.enabled),
                    (n.enabled = !1),
                    (a.label = 1));
                case 1:
                  return (
                    a.trys.push([1, , 3, 4]),
                    (r = this.node.children.slice()),
                    (s = new Map()),
                    r.forEach(function (e) {
                      var t = e.getComponent(HF),
                        i = t.orderType + "_" + t.data.id + "_" + t.data.orderId;
                      s.set(i, e.position);
                    }),
                    (c = []),
                    (e || []).forEach(function (e) {
                      var t = ot.GetPrefab(f._tmpNode);
                      ((t.parent = f.node), (t.getComponent(HF).data = e), c.push(t));
                    }),
                    (d = l(r, c)),
                    t && t(d),
                    d.forEach(function (e, t) {
                      ((e.zIndex = t), x(e));
                    }),
                    e && 0 !== e.length
                      ? ((u = n.spacingX),
                        (h = 0),
                        (p = []),
                        d.forEach(function (e, t) {
                          var i = e.getComponent(HF),
                            n = i.orderType + "_" + i.data.id + "_" + i.data.orderId;
                          if (0 == t) h = e.width / 2;
                          else {
                            var o = d[t - 1];
                            h = h + e.width / 2 + o.width / 2 + u;
                          }
                          var r = h;
                          if (c.includes(e)) {
                            e.scale = 0.1;
                            var a = e.getComponentInChildren(cc.Button);
                            (a && (a.interactable = !1), (e.position = cc.v3(r, 0, 0)));
                            var l = cc
                              .tween(e)
                              .to(0.33, { scale: 1.2 }, { easing: "quadOut" })
                              .to(0.166, { scale: 1 }, { easing: "quadIn" })
                              .call(function () {
                                a && (a.interactable = !0);
                              });
                            p.push(l);
                          } else {
                            if (s.get(n)) {
                              var f = cc
                                .tween(e)
                                .to(0.3, { position: cc.v3(r, 0, 0) }, { easing: "quadIn" });
                              p.push(f);
                            }
                          }
                        }),
                        (this._data = d.map(function (e) {
                          return e.getComponent(HF).data;
                        })),
                        p.forEach(function (e) {
                          return e.start();
                        }),
                        [4, T(500)])
                      : [2]
                  );
                case 2:
                  return (a.sent(), [3, 4]);
                case 3:
                  return (
                    i === this._animationVersion && ((n.enabled = o), o && x(this.node)),
                    [7]
                  );
                case 4:
                  return [2];
              }
            });
          })
        );
      }),
      (i.prototype.animHideOrders = function (e) {
        return r(this, void 0, void 0, function () {
          var t = this;
          return a(this, function (i) {
            return [
              2,
              new Promise(function (i) {
                var n = t.node.children,
                  o = e ? e.node.width : 231,
                  r = t.node.getComponent(cc.Layout).spacingX,
                  a = e.orderType + "_" + e.data.id + "_" + e.data.orderId,
                  s = e.data,
                  c = n.filter(function (t) {
                    return t.zIndex > e.node.zIndex;
                  }),
                  l = c.length + 1,
                  d = !1,
                  u = function (e) {
                    if (!d) {
                      if (((d = !0), t._cancelHideAnimations.delete(h), !e)) {
                        var n = t._data.findIndex(function (e) {
                          return e.id === s.id && e.orderId === s.orderId;
                        });
                        n >= 0 && t._data.splice(n, 1);
                      }
                      i();
                    }
                  },
                  h = function () {
                    return u(!0);
                  };
                t._cancelHideAnimations.add(h);
                var p = function () {
                  0 == --l && u(!1);
                };
                (cc
                  .tween(e.node)
                  .to(0.33, { scale: 0.1 }, { easing: "quadIn" })
                  .call(function () {
                    d ||
                      (Ij.HideAsync(),
                      e.orderType + "_" + e.data.id + "_" + e.data.orderId === a
                        ? ot.PutPrefab(e.node)
                        : (e.node.scale = 1),
                      p());
                  })
                  .start(),
                  c.length > 0 &&
                    c.forEach(function (e) {
                      cc.tween(e)
                        .by(0.5, { x: -(r + o) }, { easing: "quadOut" })
                        .call(function () {
                          p();
                        })
                        .start();
                    }),
                  T(500).then(function () {
                    return u(!1);
                  }));
              }),
            ];
          });
        });
      }),
      (i.prototype.getNewItem = function () {
        var e = ot.GetPrefab(this._tmpNode);
        return ((e.parent = this.node), e);
      }),
      (i.prototype.getFirstFinishOrder = function () {
        for (var e = this.node.children, t = 0; t < e.length; t++) {
          var i = e[t].getComponent($_);
          if (i && i.isFinish) return i;
        }
      }),
      (i.prototype.findOrderByKey = function (e) {
        for (var t, i = this.node.children, n = 0; n < i.length; n++) {
          var o = i[n].getComponent(HF);
          if (o && o.orderType && (null === (t = o.data) || void 0 === t ? void 0 : t.orderId))
            if (o.orderType + "_" + o.data.orderId == e) return o;
        }
        return null;
      }),
      o([Ej(cc.Prefab)], i.prototype, "prefab_item", void 0),
      (i = o([Tj], i))
    );
  })(cc.Component);
cc._RF.pop();
