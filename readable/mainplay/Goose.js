// Extracted cached Cocos registration: Goose
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 3187532..3194283.
// Shared closure variables remain in readable/game.formatted.js:155513.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "a51aezUQ35CRI5NuTwWdoWn", "Goose");
var bQ = cc._decorator.ccclass,
  wQ = (function (e) {
    function n() {
      var t = e.call(this) || this;
      return (
        (t.isGoOut = !1),
        (t.isOrderQuiting = !1),
        (t.talkCount = 0),
        (t.showingAdornBubble = !1),
        t
      );
    }
    return (
      t(n, e),
      (n.prototype.onTouchEnd = function () {
        return r(this, void 0, void 0, function () {
          var e;
          return a(this, function (t) {
            return this.isGoOut
              ? [2]
              : this.node.activeInHierarchy && this.spine
                ? GZ.instance.isInHome() && !this.isGooseSimpleWalking
                  ? [2]
                  : mQ.isRunning(this.node)
                    ? ((e = this.node.getChildByName(mQ.gooseTalkBubbleName)) &&
                        e.getComponent(mQ).onClick(),
                      [2])
                    : (E8.role.level < config.GooseTalkConfig.config.walkTalkUnlockPlayerLevel ||
                        (j8.play(o_.TALKBUBBLE),
                        GZ.instance.isInHouse()
                          ? d.emit(i.PlayerTouchGoose, { entityUUId: this.entityUUId })
                          : this.talkBubble(),
                        this.node.stopAllActions()),
                      [2])
                : [2];
          });
        });
      }),
      (n.prototype.onWalkRandom = function () {
        return (mQ.check(), e.prototype.onWalkRandom.call(this));
      }),
      (n.prototype.onOut = function () {
        mQ.hideAndDestroy(this.node);
      }),
      (n.prototype.playRuaAnim = function () {
        return r(this, void 0, void 0, function () {
          var e, t, i;
          return a(this, function (n) {
            switch (n.label) {
              case 0:
                (this.setTouchTime(),
                  (e = this.node.zIndex),
                  (t = this.node.parent),
                  this.node.parent && this.node.parent.removeChild(this.node, !1),
                  t.parent.addChild(this.node),
                  this.node.setSiblingIndex(t.parent.children.length - 1),
                  (i = 0),
                  (n.label = 1));
              case 1:
                return i < 3
                  ? ((this.node.zIndex = rS.NoSortIndex),
                    this.spine && this.spine.isValid && this.node.active
                      ? [4, ib.playAnimation(this.spine, "z_rua_idle", !1, !0)]
                      : [3, 3])
                  : [3, 4];
              case 2:
                (n.sent(), (n.label = 3));
              case 3:
                return (i++, [3, 1]);
              case 4:
                return this.spine && this.spine.isValid && this.node.active
                  ? [4, ib.playAnimation(this.spine, "z_rua_out", !1, !0)]
                  : [3, 6];
              case 5:
                (n.sent(), (n.label = 6));
              case 6:
                return (
                  this.node &&
                    this.node.isValid &&
                    this.node.active &&
                    (this.node.parent && this.node.parent.removeChild(this.node, !1),
                    t.addChild(this.node),
                    (this.node.zIndex = e),
                    this.talkBubble()),
                  [2]
                );
            }
          });
        });
      }),
      (n.prototype.talkBubble = function (e) {
        var t, i;
        if ((void 0 === e && (e = !1), this.node || this.node.activeInHierarchy)) {
          var n = this.talkState,
            o = 3 != n,
            r = M(0, 100);
          if (e || r <= config.GooseTalkConfig.config.bubbleProbability) {
            ((this.talkCount += 1), (o = 3 != (n = this.talkState)));
            var a = [];
            try {
              for (var c = s(config.WalkTalk.list), l = c.next(); !l.done; l = c.next()) {
                var d = l.value;
                d.gooseId == this.gooseId && d.type == n && a.push(d);
              }
            } catch (e) {
              t = { error: e };
            } finally {
              try {
                l && !l.done && (i = c.return) && i.call(c);
              } finally {
                if (t) throw t.error;
              }
            }
            if (a.length) {
              var u = a[M(0, a.length)];
              pQ.show(this.node, u.walkTalk, cc.v2(0, 120));
            } else console.warn("无对话配置:" + this.gooseId);
          }
          this.playTalkAni(o);
        }
      }),
      (n.prototype.playWaitAnim = function () {
        return r(this, void 0, void 0, function () {
          return a(this, function (e) {
            switch (e.label) {
              case 0:
                return this.spine
                  ? this.spine.animation.includes("wait")
                    ? [4, S(500)]
                    : [3, 2]
                  : [2];
              case 1:
                if ((e.sent(), this.spine.animation.includes("wait"))) return [2];
                e.label = 2;
              case 2:
                ((this.pausing = !0), (e.label = 3));
              case 3:
                return this.tweening ? [4, S(30)] : [3, 5];
              case 4:
                return (e.sent(), [3, 3]);
              case 5:
                return (this.setTouchTime(), [4, this.playWaitAnimImmediate()]);
              case 6:
                return (e.sent(), [2]);
            }
          });
        });
      }),
      (n.prototype.playWaitAnimImmediate = function () {
        return r(this, void 0, void 0, function () {
          var e, t;
          return a(this, function (i) {
            switch (i.label) {
              case 0:
                return (
                  (e = "z_wait"),
                  this.isPlayer && ((t = M(1, 4)), (e = "wait" + t)),
                  [4, this.onDirection(this.dir, e, !1, !0)]
                );
              case 1:
                return (i.sent(), [2]);
            }
          });
        });
      }),
      Object.defineProperty(n.prototype, "talkState", {
        get: function () {
          var e = config.Goose.getById(this.gooseId),
            t = 1;
          return (
            e.bubbleMode.length &&
              (this.talkCount >= e.bubbleMode[1]
                ? (t = 3)
                : this.talkCount >= e.bubbleMode[0] && (t = 2)),
            t
          );
        },
        enumerable: !1,
        configurable: !0,
      }),
      (n.prototype.setTouchTime = function () {
        var e = this;
        (clearTimeout(this.touchTime),
          (this.touchTime = setTimeout(function () {
            e.pausing = !1;
          }, 3e3)));
      }),
      (n.prototype.playTalkAni = function (e) {
        (void 0 === e && (e = !0),
          this.setTouchTime(),
          e
            ? this.onDirection(this.dir, "z_wait", !1, !0)
            : this.onDirection(this.dir, "z_idle", !0));
      }),
      (n.prototype.onGateIn = function () {
        return r(this, void 0, void 0, function () {
          return a(this, function (e) {
            return [2];
          });
        });
      }),
      (n.prototype.useAdornByEntity = function (e, t) {
        var i = this;
        if ((void 0 === t && (t = !1), !this.node || !this.node.isValid)) return !1;
        for (
          var n = s5.instance.curWorld.entityManager.getComponents(Gb.Goose), o = 0;
          o < n.length;
          o++
        ) {
          var r = n[o];
          if (!r.isRecycled()) {
            var a = r.goose;
            if (a && a.usingAdorn == e && a != this) return !1;
          }
        }
        return (
          (this.usingAdorn = e),
          t
            ? (this.useAdornCallback(e), !0)
            : (this.playWaitAnimImmediate(),
              clearTimeout(this.useAdornTimer),
              (this.useAdornTimer = setTimeout(function () {
                ((i.useAdornTimer = null), i.useAdornCallback(e));
              }, 2e3)),
              !0)
        );
      }),
      (n.prototype.useAdornCallback = function (e) {
        var t = this.map.getAdorn(e);
        (t &&
          (t.isOrdering && mQ.hide(this.node), (this.sortGroup = t.sortGroup), t.updateStateView()),
          this.onAdornUse(),
          this.setLogicActive(!1));
      }),
      (n.prototype.editStopUseAdorn = function () {
        return !!this.useAdornTimer && (clearTimeout(this.useAdornTimer), !0);
      }),
      (n.prototype.onAdornUse = function () {}),
      (n.prototype.isEditing = function () {
        var e;
        if (!this.node) return !1;
        if (this.usingAdorn <= 0) return !1;
        var t = null === (e = this.map) || void 0 === e ? void 0 : e.getAdorn(this.usingAdorn);
        return t ? i$.curAdorn != t : ((this.usingAdorn = 0), !1);
      }),
      (n.prototype.stopUseAdorn = function () {
        var e;
        if (!this.node) return !1;
        if (this.usingAdorn <= 0) return !1;
        var t = null === (e = this.map) || void 0 === e ? void 0 : e.getAdorn(this.usingAdorn);
        return t
          ? !t.isOrdering &&
              !(!this.map || !this.map.running) &&
              (this.forceStopUseAdornImmediate(), !0)
          : ((this.usingAdorn = 0), !1);
      }),
      (n.prototype.forceStopUseAdornImmediate = function () {
        var e,
          t = null === (e = this.map) || void 0 === e ? void 0 : e.getAdorn(this.usingAdorn);
        if (((this.usingAdorn = 0), t)) {
          var i = this.map.astar.getCircleEmptyPosInRange(t.position, 10);
          (i && this.moveTo(i.x, i.y, !0, !0),
            this.onUseAdornEnd(t),
            this.unscheduleAllCallbacks(),
            t.updateStateView());
        }
        this.setLogicActive(!0);
      }),
      (n.prototype.setLogicActive = function (e) {
        this.node && ((this.node.active = e), (this.node.group = e ? yy.Default : yy.NoRender));
      }),
      (n.prototype.setGroupVisible = function (e) {
        this.node && (this.node.group = e ? yy.Default : yy.NoRender);
      }),
      (n.prototype.forceStopUseAdorn = function () {
        if (!s5.instance.curWorld) return !1;
        this.forceStopUseAdornImmediate();
        var e = s5.instance.curWorld.entityManager.getEntity(this.entityUUId);
        return (e && xJ.forceChangeStateByEntity(e, Ub.Idle, 0), !0);
      }),
      (n.prototype.onUseAdornEnd = function (e) {}),
      (n.prototype.setPause = function (e) {
        var t = s5.instance.curWorld.entityManager.getEntity(this.entityUUId);
        if (t) {
          var i = t.getComponent(Gb.BehaviorTree);
          i && (e ? i.pause() : i.resume());
        }
      }),
      (n.prototype.onDisable = function () {
        (e.prototype.onDisable.call(this),
          this.useAdornTimer && (clearTimeout(this.useAdornTimer), (this.useAdornTimer = null)));
      }),
      (n.prototype.showAdornBubble = function () {
        return r(this, void 0, void 0, function () {
          return a(this, function (e) {
            switch (e.label) {
              case 0:
                return this.showingAdornBubble
                  ? [2]
                  : ((this.showingAdornBubble = !0), [4, RJ.createNode()]);
              case 1:
                return [4, e.sent().showFailedAnim(this)];
              case 2:
                return (e.sent(), (this.showingAdornBubble = !1), [2]);
            }
          });
        });
      }),
      (n = o([bQ], n))
    );
  })(_Q);
cc._RF.pop();
