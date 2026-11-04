// Extracted cached Cocos registration: MergeCellRender
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 1769188..1782106.
// Shared closure variables remain in readable/game.formatted.js:86624.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "3a5acWgT/pPbJ4l8AoL6+tP", "MergeCellRender");
var AM = cc._decorator,
  kM = AM.ccclass,
  RM = AM.property,
  PM = AM.menu,
  DM = (function (e) {
    function i() {
      var t = (null !== e && e.apply(this, arguments)) || this;
      return (
        (t.node_icon = null),
        (t.node_anim = null),
        (t.node_anim_bottom = null),
        (t.label_bag = null),
        (t.progress = null),
        (t.debug_level = null),
        (t.spr_progress_1 = null),
        (t.spr_progress_2 = null),
        (t.spr_progress_3 = null),
        (t.lamp = null),
        (t.node_hp = null),
        (t._curIconId = 0),
        (t._spriteIcon = null),
        (t._isLoadingIcon = !1),
        (t._needLoadReady = ""),
        (t._needLoadPrepare = ""),
        (t._needLoadManuFinish = ""),
        (t._needLoadMid = ""),
        (t._needLoadSpine = ""),
        (t._needShowSpine = !1),
        (t._needLoadAntiSpine = ""),
        (t._needShowAntiSpine = !1),
        (t._bar_split = null),
        (t.mergeLogicMap = new Map()),
        (t._data = null),
        (t.greenColor = "#26F72A"),
        (t.yellowColor = "#F7F726"),
        (t.redColor = "#F72626"),
        (t._lucyBoxShowToken = 0),
        t
      );
    }
    var n;
    return (
      t(i, e),
      (n = i),
      (i.prototype.onLoad = function () {
        (Wt.mergeCellIdxLabel.push(this.debug_level),
          (this.debug_level.node.active = !1),
          (this._bar_split = cc.find("bar_split/bar_split", this.progress)));
      }),
      Object.defineProperty(i.prototype, "sprite_icon", {
        get: function () {
          return this._spriteIcon;
        },
        set: function (e) {
          ((this._spriteIcon = e),
            this._spriteIcon &&
              this._spriteIcon.node &&
              (this._spriteIcon.node.color = this.node_icon.color));
        },
        enumerable: !1,
        configurable: !0,
      }),
      (i.prototype.callLogic = function (e, t, i) {
        void 0 === t && (t = !0);
        for (var n = [], o = 3; o < arguments.length; o++) n[o - 3] = arguments[o];
        var r = this.mergeLogicMap.get(e);
        r &&
          r.forEach(function (e, o) {
            e(i, t && n && n.length ? n[0] : n);
          });
      }),
      (i.prototype.regist = function (e, t) {
        var i = this;
        (t || (t = this),
          e.forEach(function (n, o) {
            if (e.get(o)) {
              var r = i.mergeLogicMap.get(o);
              (r || (r = []), r.push(e.get(o).bind(t)), i.mergeLogicMap.set(o, r));
            }
          }));
      }),
      Object.defineProperty(i.prototype, "data", {
        get: function () {
          return this._data;
        },
        set: function (e) {
          ((this._data = e), this.init());
        },
        enumerable: !1,
        configurable: !0,
      }),
      (i.prototype.init = function () {
        var e, t;
        if ((this.reset(), this._data)) {
          (this._addLogics(),
            this._registLogics(),
            this._loadIcon(),
            (this.node.active = !0),
            (this.node.name = "commonElement" + this.data.mergeCell.serverIdx),
            (this.label_bag.node.active = !1));
          var i = this.data.mergeCell;
          Ft.needShowDif
            ? (this.debug_level.string = i.data.config.diffculty + "\n" + i.data.config.series)
            : Ft.needShowDiamond
              ? (this.debug_level.string =
                  Ft.searchEleDiamond(
                    null ===
                      (t =
                        null === (e = null == i ? void 0 : i.data) || void 0 === e
                          ? void 0
                          : e.config) || void 0 === t
                      ? void 0
                      : t.id,
                  ) +
                  "\n" +
                  i.data.config.series)
              : (this.debug_level.string = Ft.needShowId
                  ? "" + i.data.config.id
                  : "" + i.serverIdx);
        } else !Tq.isInit && G2.BoardRender.readyCount++;
      }),
      (i.prototype.showProgress = function (e, t, i, n) {
        if ((void 0 === i && (i = 1), void 0 === n && (n = !1), e < 0 || t < 0))
          this.progress.active = !1;
        else {
          this.progress.active = !0;
          var o = this.progress.getChildByName("bar");
          this.progress.getChildByName("bar_split").active = !1;
          var r = this.spr_progress_1;
          (2 == i && (r = this.spr_progress_2),
            (o.getComponent(cc.Sprite).spriteFrame = r),
            (o.width = 0 == e ? 0 : n ? 256 * (1 - t / e) : (t / e) * 256));
        }
      }),
      (i.prototype.showMultiProgress = function (e, t, i, n) {
        this.progress.active = !0;
        var o = 256 / i,
          r = this.progress.getChildByName("bar_split"),
          a = this.progress.getChildByName("bar");
        ((a.getComponent(cc.Sprite).spriteFrame = this.spr_progress_3),
          r.removeAllChildren(),
          (r.active = !0));
        for (var s = 0, c = 0; c < i; c++) {
          if (c > 0) {
            var l = ot.GetPrefab(this._bar_split, 5, 5);
            ((l.parent = r), (l.active = !0), (l.x = o * c));
          }
          c < n ? (s += o) : c == n && (s += (o * t) / e);
        }
        a.width = 256 - s;
      }),
      (i.prototype.showLamp = function (e) {
        this.lamp.active = !0;
        var t = cc.find("label", this.lamp).getComponent(cc.Label),
          i = cc.find("bar", this.lamp),
          n = wM.getLampMax(),
          o = Math.min(1, e / n);
        ((i.width = 256 * o), (t.string = e + "/" + n));
      }),
      (i.prototype.showMonsterHp = function () {
        var e,
          t,
          i,
          n = null === (e = NE.instance) || void 0 === e ? void 0 : e.chess6Data,
          o =
            null === (i = null === (t = NE.instance) || void 0 === t ? void 0 : t.chess6Conf) ||
            void 0 === i
              ? void 0
              : i.monsterHp;
        if (n && o) {
          this.node_hp.active = !0;
          var r = cc.find("bar", this.node_hp);
          cc.find("label", this.node_hp).getComponent(cc.Label).string =
            n.monsterRemainingHp + "/" + o;
          var a = n.monsterRemainingHp / o;
          ((r.width = 256 * a),
            (r.color =
              a > 0.66
                ? new cc.Color().fromHEX(this.greenColor)
                : a > 0.33
                  ? new cc.Color().fromHEX(this.yellowColor)
                  : new cc.Color().fromHEX(this.redColor)));
        } else this.node_hp.active = !1;
      }),
      (i.prototype.showReadyIcon = function (e, t) {
        if (
          (void 0 === e && (e = !0),
          void 0 === t && (t = "texture_ready"),
          e && this._isLoadingIcon)
        )
          this._needLoadReady = t;
        else if (this.sprite_icon) {
          var i = this.sprite_icon.node.parent;
          i.children.forEach(function (e) {
            return (e.active = !1);
          });
          var n = i.getChildByName("texture"),
            o = i.getChildByName(t),
            r = null;
          if (e && o)
            ((o.active = !0),
              o.getComponent(cc.Sprite) && (this.sprite_icon = o.getComponent(cc.Sprite)),
              (r = o));
          else e || ((n.active = !0), (this.sprite_icon = n.getComponent(cc.Sprite)), (r = n));
          var a = r && r.getComponent(cc.Animation);
          a && rb.playAnimation(a, null, cc.WrapMode.Loop);
        }
      }),
      (i.prototype.showReadySpine = function (e, t) {
        if ((void 0 === e && (e = !0), this._isLoadingIcon))
          return ((this._needLoadSpine = t), void (this._needShowSpine = e));
        if (this.sprite_icon) {
          var i = this.sprite_icon.node.parent.getChildByName(t);
          i && ((i.active = e), (this.sprite_icon.node.active = !e));
        }
      }),
      (i.prototype.showReadyAntiSpine = function (e, t) {
        if ((void 0 === e && (e = !0), this._isLoadingIcon))
          return ((this._needLoadAntiSpine = t), void (this._needShowAntiSpine = e));
        if (this.sprite_icon) {
          var i = this.sprite_icon.node.parent.getChildByName(t);
          i && ((i.active = e), (this.sprite_icon.node.active = !e));
        }
      }),
      (i.prototype.showPrepareIcon = function (e, t) {
        if (
          (void 0 === e && (e = !0),
          void 0 === t && (t = "texture_prepare"),
          e && this._isLoadingIcon)
        )
          return ((this._needLoadPrepare = t), !1);
        if (!this.sprite_icon) return !1;
        if (!(this.data && this.data.remoteData ? this.data.remoteData.order : null)) return !1;
        var i = this.sprite_icon.node.parent;
        i.children.forEach(function (e) {
          return (e.active = !1);
        });
        var n = i.getChildByName("texture"),
          o = i.getChildByName(t);
        return e && o
          ? ((o.active = !0), (this.sprite_icon = o.getComponent(cc.Sprite)), !0)
          : ((e && o) || ((n.active = !0), (this.sprite_icon = n.getComponent(cc.Sprite))), !1);
      }),
      (i.prototype.showManuUnlockFinishIcon = function (e, t) {
        if (
          (void 0 === e && (e = !0),
          void 0 === t && (t = "texture_finish"),
          e && this._isLoadingIcon)
        )
          return ((this._needLoadManuFinish = t), !1);
        if (!this.sprite_icon) return !1;
        var i = this.sprite_icon.node.parent;
        i.children.forEach(function (e) {
          return (e.active = !1);
        });
        var n = i.getChildByName("texture"),
          o = i.getChildByName(t);
        e && o
          ? ((o.active = !0), (this.sprite_icon = o.getComponent(cc.Sprite)))
          : (e && o) || ((n.active = !0), (this.sprite_icon = n.getComponent(cc.Sprite)));
      }),
      (i.prototype.showMidIcon = function (e, t) {
        if (
          (void 0 === e && (e = !0), void 0 === t && (t = "texture_mid"), e && this._isLoadingIcon)
        )
          return ((this._needLoadMid = t), !1);
        if (!this.sprite_icon) return !1;
        var i = this.sprite_icon.node.parent;
        i.children.forEach(function (e) {
          return (e.active = !1);
        });
        var n = i.getChildByName("texture"),
          o = i.getChildByName(t);
        e && o
          ? ((o.active = !0),
            o.getComponent(cc.Sprite) && (this.sprite_icon = o.getComponent(cc.Sprite)))
          : (e && o) || ((n.active = !0), (this.sprite_icon = n.getComponent(cc.Sprite)));
      }),
      (i.prototype.showAnimOnce = function (e, t) {
        return (
          void 0 === t && (t = ""),
          r(this, void 0, void 0, function () {
            var i, n, o;
            return a(this, function (r) {
              switch (r.label) {
                case 0:
                  return this.sprite_icon
                    ? ((i = this.sprite_icon.node.parent),
                      (n = i.getChildByName(e)),
                      (o = n.getComponent(cc.Animation)) ? [4, rb.playAnimation(o, t)] : [3, 2])
                    : [2, !1];
                case 1:
                  (r.sent(), (r.label = 2));
                case 2:
                  return [2];
              }
            });
          })
        );
      }),
      (i.prototype._loadIcon = function () {
        return r(this, void 0, void 0, function () {
          var e, t, i, n, o, r, s, c, l, d, u, h, p, f, g, v, m, _, b, w, C, I, S;
          return a(this, function (a) {
            switch (a.label) {
              case 0:
                return (
                  (e = this.data.config.prefab) || (e = this.data.config.id),
                  (this._isLoadingIcon = !0),
                  (t = this.node_icon.children[0]),
                  (i = !1),
                  t && this._curIconId == e
                    ? [3, 2]
                    : ((i = !0), (this._curIconId = e), [4, TJ.GetLoadedElement(e)])
                );
              case 1:
                return ((t = a.sent()), [3, 3]);
              case 2:
                ((this._curIconId = e), (a.label = 3));
              case 3:
                return this.data && this.data.mergeCell && this.data.mergeCell.data
                  ? t && this._curIconId == e
                    ? ((this._isLoadingIcon = !1),
                      i &&
                        this.node_icon.children.length > 0 &&
                        Array.from(this.node_icon.children).forEach(function (e) {
                          return ot.PutPrefab(e);
                        }),
                      (n = t.getChildByName("texture")),
                      (o = t.getChildByName("texture_ready")),
                      (r = t.getChildByName("texture_finish")),
                      (s = t.getChildByName("texture_prepare")),
                      (c = t.getChildByName("texture_mid")),
                      (l = t.getChildByName("manu_spine_ready")),
                      (d = t.getChildByName("manu_spine_anti_ready")),
                      (u = config.Config.config.specialOrderElement),
                      (h = this.data && this.data.remoteData ? this.data.remoteData.order : null),
                      (p =
                        this.data && this.data.remoteData
                          ? this.data.remoteData.recovery.get(yr.manualProduct)
                          : null),
                      (f = n),
                      (n.active = !0),
                      o && (o.active = !1),
                      r && (r.active = !1),
                      s && (s.active = !1),
                      c && (c.active = !1),
                      l && (l.active = !1),
                      d && (d.active = !1),
                      99901 != e
                        ? [3, 6]
                        : ((g = 5001),
                          E8.role.bagSkin.forEach(function (e, t) {
                            e && (g = t);
                          }),
                          (v = n.getComponent(cc.Sprite)),
                          (m = e9.getBagSkinIconPath(g)),
                          Ai(v, m),
                          (_ = t.getChildByName("spine"))
                            ? (b = config.ManagerBagSkin.getById(g)) && b.bagSkinAnim
                              ? [4, Si(e9.getSpinePath("BagSp/" + b.bagSkinAnim))]
                              : [3, 5]
                            : [3, 6]))
                    : [3, 7]
                  : [2];
              case 4:
                return (
                  (w = a.sent()),
                  ((C = _.getComponent(sp.Skeleton)).skeletonData = w),
                  (_.active = !0),
                  ib.playAnimation(C, "idle", !0),
                  [3, 6]
                );
              case 5:
                ((_.active = !1), (a.label = 6));
              case 6:
                (h &&
                h.id > 0 &&
                p &&
                (p.value > 0 || h.state == kr.running || h.state == kr.complete)
                  ? ((n.active = !1),
                    p.value > 0 && r ? ((r.active = !0), (f = r)) : o && ((o.active = !0), (f = o)))
                  : s &&
                      (this.data.config.elementOrderId < 0 || u.indexOf(e) >= 0) &&
                      h.elements &&
                      1 == h.elements.size
                    ? ((s.active = !0),
                      (f = s),
                      Ai(
                        s.getChildByName("filler").getComponent(cc.Sprite),
                        e9.getElementTexturePath(h.elements.keys().next().value),
                        y.BorderScale,
                        !1,
                      ))
                    : o && (o.active = !1),
                  (I = f.getComponent(cc.Animation)) && rb.playAnimation(I, null, cc.WrapMode.Loop),
                  (S = f.getComponent(sp.Skeleton)) && ib.playAnimation(S, "idle", !0),
                  (t.parent = this.node_icon),
                  (t.position = cc.v3()),
                  (t.active = !0),
                  t && (this.sprite_icon = f.getComponent(cc.Sprite)),
                  "" != this._needLoadReady &&
                    (this.showReadyIcon(!0, this._needLoadReady), (this._needLoadReady = "")),
                  "" != this._needLoadPrepare &&
                    (this.showPrepareIcon(!0, this._needLoadPrepare), (this._needLoadPrepare = "")),
                  "" != this._needLoadManuFinish &&
                    (this.showManuUnlockFinishIcon(), (this._needLoadManuFinish = "")),
                  "" != this._needLoadMid && (this.showMidIcon(), (this._needLoadMid = "")),
                  "" != this._needLoadSpine &&
                    (this.showReadySpine(this._needShowSpine, this._needLoadSpine),
                    (this._needLoadSpine = "")),
                  "" != this._needLoadAntiSpine &&
                    (this.showReadyAntiSpine(this._needShowAntiSpine, this._needLoadAntiSpine),
                    (this._needLoadAntiSpine = "")),
                  !Tq.isInit && G2.BoardRender.readyCount++,
                  this.callLogic(RA.ICON_LOAD_FINISH, !1, this.data.mergeCell),
                  (a.label = 7));
              case 7:
                return [2];
            }
          });
        });
      }),
      (i.prototype._clearComponets = function () {
        var e = this;
        this.node._components.forEach(function (t) {
          t instanceof n || e.node.removeComponent(t);
        });
      }),
      (i.prototype._addLogics = function () {
        var e = this,
          t = this.node._components;
        Array.from(t).forEach(function (t) {
          t.initLogic && (e.node.removeComponent(t), ee(e.node._components, t));
        });
        for (var i = 0; i < this._data.mergeCellLogics.length; i++) {
          var n = MM.get(this._data.mergeCellLogics[i]);
          this.node.getComponent(n) || this.node.addComponent(n);
        }
      }),
      (i.prototype._registLogics = function () {
        this.node._components.forEach(function (e) {
          e.initLogic && e.initLogic();
        });
      }),
      (i.prototype.reset = function () {
        var e;
        this._clearComponets();
        var t = Array.from(this.node_anim.children);
        (t.forEach(function (e) {
          return ot.PutPrefab(e);
        }),
          (this.mergeLogicMap = new Map()),
          this._data ||
            ((t = Array.from(this.node_icon.children)).forEach(function (e) {
              var t = e.getChildByName("texture"),
                i = e.getChildByName("texture_ready"),
                n = e.getChildByName("texture_finish"),
                o = e.getChildByName("texture_prepare"),
                r = e.getChildByName("texture_mid");
              (t && (t.active = !0),
                i && (i.active = !1),
                n && (n.active = !1),
                o && (o.active = !1),
                r && (r.active = !1),
                ot.PutPrefab(e));
            }),
            (this._spriteIcon = null)),
          (this.node_icon.color = cc.color(255, 255, 255)),
          (this.debug_level.string = ""),
          (this.progress.active = !1),
          (this.lamp.active = !1),
          (this.node_hp.active = !1),
          this.showLucyBox(!1),
          EM.instance.removeCoverRewardAnim(
            null === (e = this._data) || void 0 === e ? void 0 : e.mergeCell,
          ));
      }),
      (i.prototype.dispose = function () {
        ((this._data = null), this.reset());
      }),
      (i.prototype.showLucyBox = function (e) {
        return r(this, void 0, void 0, function () {
          var t, i;
          return a(this, function (n) {
            switch (n.label) {
              case 0:
                return (
                  (t = ++this._lucyBoxShowToken),
                  e
                    ? ((this.node_icon.active = !1),
                      this.node_lucyBox ? [3, 2] : [4, XF.instance.getLucyNode()])
                    : [3, 4]
                );
              case 1:
                return (
                  (i = n.sent()),
                  t != this._lucyBoxShowToken
                    ? (i && (i.active = !1), [2])
                    : i
                      ? ((this.node_lucyBox = i),
                        this.node_lucyBox &&
                          (this.node_lucyBox.parent != this.node_icon.parent &&
                            this.node_lucyBox.removeFromParent(),
                          this.node_icon.parent.addChild(this.node_lucyBox)),
                        [3, 3])
                      : ((this.node_icon.active = !0), [2])
                );
              case 2:
                ((this.node_lucyBox.active = !0), (n.label = 3));
              case 3:
                return [3, 5];
              case 4:
                ((this.node_icon.active = !0),
                  this.node_lucyBox &&
                    ((this.node_lucyBox.active = !1),
                    this.node_lucyBox.removeFromParent(),
                    (this.node_lucyBox = null)),
                  (n.label = 5));
              case 5:
                return [2];
            }
          });
        });
      }),
      o([RM(cc.Node)], i.prototype, "node_icon", void 0),
      o([RM(cc.Node)], i.prototype, "node_anim", void 0),
      o([RM(cc.Node)], i.prototype, "node_anim_bottom", void 0),
      o([RM(cc.Label)], i.prototype, "label_bag", void 0),
      o([RM(cc.Node)], i.prototype, "progress", void 0),
      o([RM(cc.Label)], i.prototype, "debug_level", void 0),
      o([RM(cc.SpriteFrame)], i.prototype, "spr_progress_1", void 0),
      o([RM(cc.SpriteFrame)], i.prototype, "spr_progress_2", void 0),
      o([RM(cc.SpriteFrame)], i.prototype, "spr_progress_3", void 0),
      o([RM(cc.Node)], i.prototype, "lamp", void 0),
      o([RM(cc.Node)], i.prototype, "node_hp", void 0),
      (i = n = o([kM, PM("MergeCell/MergeCellRender")], i))
    );
  })(cc.Component);
function BM(e) {
  return function (t) {
    !(function (e, t) {
      MM.set(e, t);
    })(e, t);
  };
}
cc._RF.pop();
