// Extracted cached Cocos registration: GooseBase
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 3180865..3187531.
// Shared closure variables remain in readable/game.formatted.js:155155.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "d52f8JcrTJKnoPqe91y/5jp", "GooseBase");
var yQ = cc._decorator.ccclass,
  _Q = (function (e) {
    function i() {
      var t = e.call(this) || this;
      return (
        (t.tweening = !1),
        (t.pausing = !1),
        (t.usingAdorn = 0),
        (t.gooseId = 0),
        (t.speed = 500),
        (t.dir = 0),
        (t.playerId = 0),
        (t.isFollower = !1),
        (t.isHouseGoose = !1),
        (t.entityUUId = 0),
        (t.newState = Ub.Init),
        (t.firstMove = !0),
        (t.tempPos = cc.v2()),
        t
      );
    }
    return (
      t(i, e),
      Object.defineProperty(i.prototype, "spine", {
        get: function () {
          return this.getComponentInChildren(sp.Skeleton);
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(i.prototype, "player", {
        get: function () {
          var e;
          return null === (e = this.spine) || void 0 === e ? void 0 : e.node.getComponent(zS);
        },
        enumerable: !1,
        configurable: !0,
      }),
      (i.prototype.host = function (e) {
        ((this.follower = e), (this.follower.speed = this.speed), (e.isFollower = !0));
      }),
      Object.defineProperty(i.prototype, "isPlayer", {
        get: function () {
          return this.playerId > 0;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(i.prototype, "map", {
        get: function () {
          return this._map;
        },
        set: function (e) {
          this._map != e &&
            ((this.mapFrom = this._map),
            this.remove(),
            (this._map = e),
            e && (this.sortGroup = e.sortGroup));
        },
        enumerable: !1,
        configurable: !0,
      }),
      (i.prototype.setFpsMode = function (e) {
        this.spine && (this.spine.fpsMode = e);
      }),
      (i.prototype.addToMapAsync = function (e) {
        if (null == e) return !1;
        (e.addGooseAsync(this),
          this.spine && ((this.spine.node.autoPause = !1), (this.node.autoPause = !1)),
          this.setFpsMode(xe.Normal),
          this.onAddMap());
      }),
      (i.prototype.getEntityStateType = function () {
        if (null == s5.instance.curWorld) return Ub.Destroyed;
        var e = s5.instance.curWorld.entityManager.getEntity(this.entityUUId);
        return e ? e.fetchComponent(Gb.StateMachine).curStateType : Ub.Destroyed;
      }),
      (i.prototype.walkRandom = function (e, t, i) {
        return r(this, void 0, void 0, function () {
          return a(this, function (e) {
            return [2, null];
          });
        });
      }),
      (i.prototype.playWalkWaitAnim = function () {
        this.onWalkRandom();
      }),
      (i.prototype.onWalkRandom = function () {
        return r(this, void 0, void 0, function () {
          return a(this, function (e) {
            switch (e.label) {
              case 0:
                return ((this.tweening = !0), [4, this.onDirection(this.dir, "wait", !1)]);
              case 1:
                return (e.sent(), [4, this.onDirection(this.dir, "idle", !0)]);
              case 2:
                return (e.sent(), (this.tweening = !1), [2]);
            }
          });
        });
      }),
      (i.prototype.checkPosWalkAbleAsync = function (e, t, i) {
        return (
          void 0 === i && (i = !0),
          r(this, void 0, void 0, function () {
            var n;
            return a(this, function (o) {
              switch (o.label) {
                case 0:
                  return this.map
                    ? this.map.astar.checkObstacles(e, t)
                      ? [3, 2]
                      : ((this.tempPos.x = e),
                        (this.tempPos.y = t),
                        i ? [4, this.map.randomPathAsync(this.tempPos)] : [2, !0])
                    : [2, !1];
                case 1:
                  if (!(n = o.sent())) return [2, !1];
                  if (n.length > 1) return [2, !0];
                  o.label = 2;
                case 2:
                  return [2, !1];
              }
            });
          })
        );
      }),
      (i.prototype.getAdornUpPos10Async = function (e) {
        return r(this, void 0, void 0, function () {
          var t, i;
          return a(this, function (n) {
            switch (n.label) {
              case 0:
                return ((t = 1), [4, this.getAdornUpPosAsync(e, t)]);
              case 1:
                ((i = n.sent()), (n.label = 2));
              case 2:
                return !i && t < 10
                  ? this.node && this.node.isValid
                    ? ((t += 1), [4, this.getAdornUpPosAsync(e, t)])
                    : [2, i]
                  : [3, 4];
              case 3:
                return ((i = n.sent()), [3, 2]);
              case 4:
                return [2, i];
            }
          });
        });
      }),
      (i.prototype.getAdornUpPosAsync = function (e, t, i) {
        return (
          void 0 === t && (t = 1),
          void 0 === i && (i = !0),
          r(this, void 0, void 0, function () {
            var n, o, r, s;
            return a(this, function (a) {
              switch (a.label) {
                case 0:
                  if (!this.map) return [2, null];
                  ((n = this.map.astar), (o = 0), (a.label = 1));
                case 1:
                  return o < e.logicRows
                    ? ((r = e.cellY + o),
                      (s = e.cellX + e.logicCols + (t - 1)),
                      [4, this.checkPosWalkAbleAsync(s, r, i)])
                    : [3, 4];
                case 2:
                  if (a.sent()) return [2, this.tempPos];
                  a.label = 3;
                case 3:
                  return (o++, [3, 1]);
                case 4:
                  if (!(e.cellY < n.size.y - 1)) return [3, 8];
                  ((o = 0), (a.label = 5));
                case 5:
                  return o < e.logicCols
                    ? ((r = e.cellY + e.logicRows + (t - 1)),
                      (s = e.cellX + o),
                      [4, this.checkPosWalkAbleAsync(s, r, i)])
                    : [3, 8];
                case 6:
                  if (a.sent()) return [2, this.tempPos];
                  a.label = 7;
                case 7:
                  return (o++, [3, 5]);
                case 8:
                  ((o = 0), (a.label = 9));
                case 9:
                  return o < e.logicRows
                    ? ((r = e.cellY + o),
                      (s = e.cellX - t),
                      [4, this.checkPosWalkAbleAsync(s, r, i)])
                    : [3, 12];
                case 10:
                  if (a.sent()) return [2, this.tempPos];
                  a.label = 11;
                case 11:
                  return (o++, [3, 9]);
                case 12:
                  if (!(e.cellY > 0)) return [3, 16];
                  ((o = 0), (a.label = 13));
                case 13:
                  return o < e.logicCols
                    ? ((r = e.cellY - t),
                      (s = e.cellX + o),
                      [4, this.checkPosWalkAbleAsync(s, r, i)])
                    : [3, 16];
                case 14:
                  if (a.sent()) return [2, this.tempPos];
                  a.label = 15;
                case 15:
                  return (o++, [3, 13]);
                case 16:
                  return [2, null];
              }
            });
          })
        );
      }),
      (i.prototype.gateOut = function () {
        return r(this, void 0, void 0, function () {
          return a(this, function (e) {
            return [2];
          });
        });
      }),
      (i.prototype.gateIn = function (e) {
        return r(this, void 0, void 0, function () {
          return a(this, function (e) {
            return [2];
          });
        });
      }),
      (i.prototype.onAddMap = function () {
        return r(this, void 0, void 0, function () {
          return a(this, function (e) {
            return [2];
          });
        });
      }),
      (i.prototype.onGateIn = function () {
        return r(this, void 0, void 0, function () {
          return a(this, function (e) {
            return [2];
          });
        });
      }),
      (i.prototype.onOut = function () {}),
      (i.prototype.remove = function (e) {
        (void 0 === e && (e = !1),
          this.node &&
            (this.map && this.astar.clearObstacles(this.cellX, this.cellY),
            rS.removeSortItem(this),
            this.node.stopAllActions(),
            this.node.parent && this.node.removeFromParent(!1),
            this.setFpsMode(xe.Normal),
            e &&
              (u.dispatch("goose_left", [this]),
              ot.Put(this.node),
              this.player && this.player.remove(),
              (this._map = null))));
      }),
      Object.defineProperty(i.prototype, "astar", {
        get: function () {
          var e;
          return null === (e = this.map) || void 0 === e ? void 0 : e.astar;
        },
        enumerable: !1,
        configurable: !0,
      }),
      (i.prototype.onDirection = function (e, t, i, n) {
        return (
          void 0 === i && (i = !1),
          void 0 === n && (n = !1),
          r(this, void 0, void 0, function () {
            var o, r, s, c, l;
            return a(this, function (a) {
              switch (a.label) {
                case 0:
                  return this.node
                    ? ((o = !0),
                      (r = !0),
                      e == yA.Down
                        ? (r = !1)
                        : e == yA.Up
                          ? ((o = !1), (r = !1))
                          : e == yA.Left && (o = !1),
                      (this.dir = e),
                      (s = t.startsWith("z_") || t.startsWith("b") ? t : (o ? "z" : "b") + "_" + t),
                      this.playerId
                        ? ((c = this.node.getChildByName("wner")) && (c.scaleX = r ? -1 : 1),
                          (this.node.scaleX = 1))
                        : this.node && (this.node.scaleX = r ? 1 : -1),
                      (l = []),
                      this.onDirectChange && l.push(this.onDirectChange(s, i, n)),
                      l.push(ib.playAnimation(this.spine, s, i, n)),
                      [4, Promise.all(l)])
                    : [2];
                case 1:
                  return (a.sent(), [2]);
              }
            });
          })
        );
      }),
      (i.prototype.pathNext = function () {
        return r(this, void 0, void 0, function () {
          return a(this, function (e) {
            return [2];
          });
        });
      }),
      Object.defineProperty(i.prototype, "isNpc", {
        get: function () {
          return 0 == this.gooseId;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(i.prototype, "isGooseSimple", {
        get: function () {
          return this.gooseId && !this.isPlayer;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(i.prototype, "isGooseSimpleWalking", {
        get: function () {
          var e = this.getEntityStateType();
          return e != Ub.UseAdorn && e != Ub.Destroyed && this.isGooseSimple;
        },
        enumerable: !1,
        configurable: !0,
      }),
      (i.prototype.onTouchEnd = function () {}),
      (i.prototype.endUseAdorn = function () {
        if (this.entityUUId && s5.instance.curWorld && 0 != this.usingAdorn) {
          var e = s5.instance.curWorld.entityManager.getEntity(this.entityUUId);
          if (e) {
            var t = e.fetchComponent(Gb.StateMachine);
            t &&
              t.curStateType == Ub.UseAdorn &&
              (xJ.changeStateByComponent(t, Ub.Idle, 0) ||
                h.error(
                  "GooseBase endUseAdorn: changeStateByComponent failed: " + this.entityUUId,
                ));
          }
        }
      }),
      (i.npcPath = new Map()),
      (i = o([yQ], i))
    );
  })(rS);
cc._RF.pop();
