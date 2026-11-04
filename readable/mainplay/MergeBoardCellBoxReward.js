// Extracted cached Cocos registration: MergeBoardCellBoxReward
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 1762692..1766094.
// Shared closure variables remain in readable/game.formatted.js:86315.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "78fafqE6V5Dz7B2lkSZob2k", "MergeBoardCellBoxReward");
var CM = cc._decorator,
  IM = CM.ccclass,
  SM = CM.property,
  TM = (function (e) {
    function i() {
      var t = (null !== e && e.apply(this, arguments)) || this;
      return (
        (t.anim = null),
        (t.nodeLock = null),
        (t.nodeBubble = null),
        (t.itemNode = null),
        (t.icon = null),
        (t.rewardLabel = null),
        (t.infoNode = null),
        (t.nodeBtn = null),
        (t._index = 0),
        (t._reward = null),
        t
      );
    }
    return (
      t(i, e),
      Object.defineProperty(i.prototype, "reward", {
        get: function () {
          return this._reward;
        },
        enumerable: !1,
        configurable: !0,
      }),
      (i.prototype.onLoad = function () {
        var e, t, i, n, o;
        ((null === (t = null === (e = this.nodeLock) || void 0 === e ? void 0 : e.children) ||
        void 0 === t
          ? void 0
          : t[0]) && (this.nodeLock.children[0].active = !1),
          (null === (n = null === (i = this.nodeBubble) || void 0 === i ? void 0 : i.children) ||
          void 0 === n
            ? void 0
            : n[0]) && (this.nodeBubble.children[0].active = !1),
          null === (o = this.infoNode) ||
            void 0 === o ||
            o.on(cc.Node.EventType.TOUCH_END, this.onInfoClick, this));
      }),
      (i.prototype.onDestroy = function () {
        var e;
        null === (e = this.infoNode) ||
          void 0 === e ||
          e.off(cc.Node.EventType.TOUCH_END, this.onInfoClick, this);
      }),
      (i.prototype.setRewardConf = function (e, t) {
        if (((this._index = t), e && !(e.size <= 0))) {
          var i = K6.ParseItemsConf(e)[0];
          if (i) {
            this._reward = K6.ItemExchange(i);
            var n = e9.getItemConfig(this._reward.itemType, this._reward.itemId);
            (Ai(this.icon, n.icon, y.BorderScale, !0),
              this.rewardLabel &&
                (this.rewardLabel.string =
                  this._reward.value > 1 ? this._reward.value.toString() : ""),
              this.infoNode && K6.checkItemInfoNode(this._reward, this.infoNode),
              this.nodeBtn && (this.nodeBtn.enabled = this.canRespondToClick()));
          }
        }
      }),
      (i.prototype.playIdle = function () {
        var e;
        null === (e = this.anim) || void 0 === e || e.play("AreaBoxIdle");
      }),
      (i.prototype.playCollect = function () {
        var e;
        null === (e = this.anim) || void 0 === e || e.play("CellBoxClicked");
      }),
      (i.prototype.playUnlock = function () {
        var e, t, i, n, o;
        return r(this, void 0, void 0, function () {
          var r, s;
          return a(this, function (a) {
            switch (a.label) {
              case 0:
                return (
                  null === (e = this.anim) || void 0 === e || e.play("AreaBoxUnlocked"),
                  (r =
                    null ===
                      (i = null === (t = this.nodeBubble) || void 0 === t ? void 0 : t.children) ||
                    void 0 === i
                      ? void 0
                      : i[0]) &&
                    ((r.active = !0),
                    j8.play(o_.MERGE_END_BUBBLE),
                    ib.playAnimation(r.getComponentInChildren(sp.Skeleton), "bubbleend", !1, !0),
                    this.infoNode && (this.infoNode.active = !1)),
                  (s =
                    null ===
                      (o = null === (n = this.nodeLock) || void 0 === n ? void 0 : n.children) ||
                    void 0 === o
                      ? void 0
                      : o[0])
                    ? ((s.active = !0),
                      [4, ib.playAnimation(s.getComponentInChildren(sp.Skeleton), "open", !1, !0)])
                    : [3, 2]
                );
              case 1:
                (a.sent(), (a.label = 2));
              case 2:
                return [2];
            }
          });
        });
      }),
      (i.prototype.onClick = function () {
        this.canRespondToClick() &&
          !o8.isRunning() &&
          (this.playCollect(),
          A8.Toast({ title: v.getLabel("boardLockReward_toast") }),
          j8.play(o_.MERGE_SELECT_BUBBLE),
          j8.play(o_.WATERFALL_LOCK));
      }),
      (i.prototype.onInfoClick = function (e) {
        var t;
        o8.isRunning() ||
          (e.stopPropagation(),
          (null === (t = this.infoNode) || void 0 === t ? void 0 : t.active) &&
            this._reward &&
            this.canRespondToClick() &&
            K6.showItemInfo(this._reward, this.itemNode || this.node));
      }),
      (i.prototype.canRespondToClick = function () {
        var e = G$.GetCellByIndex(this._index);
        return !!e && e.cellState != Q2.SNOW;
      }),
      o([SM(cc.Animation)], i.prototype, "anim", void 0),
      o([SM(cc.Node)], i.prototype, "nodeLock", void 0),
      o([SM(cc.Node)], i.prototype, "nodeBubble", void 0),
      o([SM(cc.Node)], i.prototype, "itemNode", void 0),
      o([SM(cc.Sprite)], i.prototype, "icon", void 0),
      o([SM(cc.Label)], i.prototype, "rewardLabel", void 0),
      o([SM(cc.Node)], i.prototype, "infoNode", void 0),
      o([SM(cc.Button)], i.prototype, "nodeBtn", void 0),
      (i = o([IM("MergeBoardCellBoxReward")], i))
    );
  })(cc.Component);
cc._RF.pop();
