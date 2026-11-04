// Extracted cached Cocos registration: MergeGuideHand
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 2694300..2699909.
// Shared closure variables remain in readable/game.formatted.js:131052.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "6b8464QXlBK3J4oE1cxfk7P", "MergeGuideHand");
var Kz = cc._decorator,
  qz = Kz.ccclass,
  Yz = Kz.property,
  Xz = (function (e) {
    function i() {
      var t = (null !== e && e.apply(this, arguments)) || this;
      return (
        (t.ani = null),
        (t.callBacks = []),
        (t.isShow = !1),
        (t.recoverClock = null),
        (t.recoverFunc = null),
        (t._paramCache = null),
        t
      );
    }
    var n;
    return (
      t(i, e),
      (n = i),
      (i.prototype.hide = function () {
        var e, t;
        return r(this, void 0, void 0, function () {
          var i = this;
          return a(this, function (o) {
            return this.node.activeInHierarchy
              ? (this.recoverClock && this.recoverClock.stop(),
                (this.recoverClock = null),
                (this._paramCache = null),
                Ne.root.off(cc.Node.EventType.TOUCH_START, this.hide, this, !0),
                null ===
                  (t =
                    null === (e = null == G2 ? void 0 : G2.BoardRender) || void 0 === e
                      ? void 0
                      : e.board_toucher) ||
                  void 0 === t ||
                  t.off(cc.Node.EventType.TOUCH_END, this.hide, this, !0),
                this.node.removeFromParent(!1),
                this.callBacks.length &&
                  setTimeout(function () {
                    (i.callBacks.forEach(function (e) {
                      e();
                    }),
                      (i.callBacks = []));
                  }, 0),
                (this.isShow = !1),
                (n.IsShow = !1),
                G2.WaitComplete("touchComplete"),
                [2])
              : [2];
          });
        });
      }),
      (i.prototype.fade = function () {
        var e, t;
        return r(this, void 0, void 0, function () {
          var i = this;
          return a(this, function (n) {
            return this.node.activeInHierarchy
              ? ((this.node.opacity = 0),
                Ne.root.off(cc.Node.EventType.TOUCH_START, this.hide, this, !0),
                null ===
                  (t =
                    null === (e = null == G2 ? void 0 : G2.BoardRender) || void 0 === e
                      ? void 0
                      : e.board_toucher) ||
                  void 0 === t ||
                  t.off(cc.Node.EventType.TOUCH_END, this.hide, this, !0),
                (this.recoverClock = b.addClock("MergeGuideHand", 1, 1e3, 1)),
                this.recoverClock.registCallBack(
                  this,
                  function () {
                    i.recoverFunc &&
                      i.recoverFunc(
                        i._paramCache.target,
                        i._paramCache.endPos,
                        i._paramCache.parent,
                        i._paramCache.weakHand,
                        i._paramCache.pos,
                        i._paramCache.onEnd,
                      );
                  },
                  null,
                ),
                G2.WaitComplete("touchComplete"),
                [2])
              : [2];
          });
        });
      }),
      (i.prototype.showTap = function (e, t, i, n, o, s, c) {
        return (
          void 0 === n && (n = !0),
          void 0 === s && (s = null),
          r(this, void 0, void 0, function () {
            var r;
            return a(this, function (a) {
              return (
                (this.recoverClock = null),
                (this.isShow = !0),
                (this.target = e),
                (this.node.opacity = 255),
                s && -1 == this.callBacks.indexOf(s) && this.callBacks.push(s),
                i && L(this.node, i),
                (this.node.position = cc.v3(this.node.parent.convertToNodeSpaceAR(e))),
                (r = o ? o.dir : jz.center),
                (this.node.angle = r > 0 ? 90 * (r - 1) : 0),
                this.node.stopAllActions(),
                rb.playAnimation(this.ani, null, cc.WrapMode.Loop),
                c
                  ? Ne.root.on(cc.Node.EventType.TOUCH_START, this.hide, this, !0)
                  : n
                    ? Ne.root.on(cc.Node.EventType.TOUCH_START, this.fade, this, !0)
                    : G2.BoardRender.board_toucher.on(
                        cc.Node.EventType.TOUCH_START,
                        this.fade,
                        this,
                        !0,
                      ),
                (this.recoverFunc = this.showTap),
                (this._paramCache = {
                  target: e,
                  endPos: t,
                  parent: i,
                  weakHand: n,
                  pos: o,
                  onEnd: s,
                }),
                [2]
              );
            });
          })
        );
      }),
      (i.prototype.showMerge = function (e, t, i, n, o, s, c) {
        return (
          void 0 === n && (n = !0),
          void 0 === s && (s = null),
          void 0 === c && (c = !1),
          r(this, void 0, void 0, function () {
            var r,
              l,
              d,
              u = this;
            return a(this, function (a) {
              return (
                (this.recoverClock = null),
                (this.isShow = !0),
                (this.target = e),
                (this.node.opacity = 255),
                s && -1 == this.callBacks.indexOf(s) && this.callBacks.push(s),
                i && L(this.node, i),
                (this.node.position = cc.v3(this.node.parent.convertToNodeSpaceAR(e))),
                (r = o ? o.dir : jz.center),
                (this.node.angle = r > 0 ? 90 * (r - 1) : 0),
                (l = this.node.parent.convertToNodeSpaceAR(t)),
                this.node.stopAllActions(),
                (d = this.node.position),
                cc
                  .tween(this.node)
                  .repeatForever(
                    cc
                      .tween(this.node)
                      .call(function () {
                        rb.playAnimation(u.ani);
                      })
                      .set({ position: d })
                      .delay(0.3)
                      .to(0.7, { position: l }, { easing: "sineInOut" })
                      .delay(0.5),
                  )
                  .start(),
                c
                  ? Ne.root.on(cc.Node.EventType.TOUCH_START, this.hide, this, !0)
                  : n
                    ? Ne.root.on(cc.Node.EventType.TOUCH_START, this.fade, this, !0)
                    : G2.BoardRender.board_toucher.on(
                        cc.Node.EventType.TOUCH_START,
                        this.fade,
                        this,
                        !0,
                      ),
                (this.recoverFunc = this.showMerge),
                (this._paramCache = {
                  target: e,
                  endPos: t,
                  parent: i,
                  weakHand: n,
                  pos: o,
                  onEnd: s,
                }),
                [2]
              );
            });
          })
        );
      }),
      (i.prototype.waitClose = function (e) {
        return r(this, void 0, void 0, function () {
          return a(this, function (t) {
            switch (t.label) {
              case 0:
                return "merge" != e ? [3, 1] : [3, 3];
              case 1:
                return this.isShow ? [4, S(33)] : [3, 3];
              case 2:
                return (t.sent(), [3, 1]);
              case 3:
                return [2];
            }
          });
        });
      }),
      (i.showByElement = function (e, t, i, o, s, c, l, d) {
        return (
          void 0 === i && (i = !1),
          void 0 === o && (o = !1),
          void 0 === c && (c = !0),
          void 0 === l && (l = !0),
          void 0 === d && (d = !1),
          r(this, void 0, void 0, function () {
            var r;
            return a(this, function (a) {
              switch (a.label) {
                case 0:
                  return (
                    (n.IsShow = !0),
                    i
                      ? [3, 3]
                      : e && t
                        ? (G$.IsCellInState(e, mr.web) && ((r = t), (t = e), (e = r)),
                          l &&
                            ((G2.FocusCellIdx = e.serverIdx), (G2.FocusEndCellIdx = t.serverIdx)),
                          [4, n.showMergeHand(e.worldPos, o, s, c, cc.v3(t.worldPos), d)])
                        : [3, 2]
                  );
                case 1:
                  (a.sent(), (a.label = 2));
                case 2:
                  return [3, 5];
                case 3:
                  return e
                    ? ((G2.FocusCellIdx = e.serverIdx),
                      (G2.FocusEndCellIdx = 999),
                      (G2.FocusCreatorNum = 1),
                      [4, n.showTapHand(e.worldPos, o, s, c, null)])
                    : [3, 5];
                case 4:
                  (a.sent(), (a.label = 5));
                case 5:
                  return [2];
              }
            });
          })
        );
      }),
      (i.showMergeHand = function (e, t, i, o, s, c, l) {
        return (
          void 0 === t && (t = !1),
          void 0 === o && (o = !0),
          void 0 === s && (s = cc.v3()),
          void 0 === c && (c = !1),
          void 0 === l && (l = null),
          r(this, void 0, void 0, function () {
            var r, d, u;
            return a(this, function (a) {
              switch (a.label) {
                case 0:
                  return cc.isValid(this.view)
                    ? [3, 2]
                    : ((r = this), [4, Mi("Prefab/UI/Merge/MergeGuideHand")]);
                case 1:
                  ((r.view = a.sent()), (a.label = 2));
                case 2:
                  return (
                    (d = t ? Ne.getLayer(Be.GUIDE) : null),
                    (this.view.scale = 1),
                    (u = this.view.getComponent(n)).showMerge(e, s, d, o, i, l, c),
                    [2, u]
                  );
              }
            });
          })
        );
      }),
      (i.showTapHand = function (e, t, i, o, s, c) {
        return (
          void 0 === t && (t = !1),
          void 0 === o && (o = !0),
          void 0 === s && (s = cc.v3()),
          void 0 === c && (c = !1),
          r(this, void 0, void 0, function () {
            var r, l, d;
            return a(this, function (a) {
              switch (a.label) {
                case 0:
                  return cc.isValid(this.view)
                    ? [3, 2]
                    : ((r = this), [4, Mi("Prefab/UI/Merge/MergeGuideHand")]);
                case 1:
                  ((r.view = a.sent()), (a.label = 2));
                case 2:
                  return (
                    (l = t ? Ne.getLayer(Be.GUIDE) : null),
                    (this.view.scale = 1),
                    (d = this.view.getComponent(n)).showTap(e, s, l, o, i, null, c),
                    [2, d]
                  );
              }
            });
          })
        );
      }),
      (i.Hide = function () {
        n.view && n.view.getComponent(n).hide();
      }),
      (i.IsShow = !1),
      o([Yz(cc.Animation)], i.prototype, "ani", void 0),
      (i = n = o([qz], i))
    );
  })(cc.Component);
cc._RF.pop();
