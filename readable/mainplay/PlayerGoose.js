// Extracted cached Cocos registration: PlayerGoose
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 3308390..3314425.
// Shared closure variables remain in readable/game.formatted.js:161608.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "09923X9WNlDDq1mg5wMAR3r", "PlayerGoose");
var VZ = cc._decorator,
  jZ = VZ.ccclass;
VZ.property;
var zZ = (function (e) {
  function i() {
    var t = e.call(this) || this;
    return (
      (t.eventId = 0),
      (t.hasEvent = !1),
      (t.uniform = 0),
      (t.eventBubble = null),
      (t.dialog = null),
      (t.reUse = !0),
      t
    );
  }
  var n;
  return (
    t(i, e),
    (n = i),
    Object.defineProperty(i.prototype, "isWalking", {
      get: function () {
        return this.newState == Ub.Move || this.newState == Ub.MoveToAdornPos;
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(i.prototype, "isUseAdorn", {
      get: function () {
        return this.newState == Ub.UseAdorn;
      },
      enumerable: !1,
      configurable: !0,
    }),
    (i.prototype.initView = function () {
      this.ske ||
        ((this.ske = this.node.getChildByName("wner").getComponent(sp.Skeleton)),
        (this.ske_pet = this.node.getChildByName("pet").getComponent(sp.Skeleton)));
    }),
    (i.prototype.updateInfo = function (e) {
      (this.initView(), (this.userInfo = e));
      var t = e ? e.uniform : E8.role.userInfo.uniform;
      if (
        ((this.playerId = e ? e.id : E8.role.id),
        (this.uniform = t),
        (this.isHost || this.isMe) && wH.current && wH.current.updateInfo(this.userInfo),
        this.ske)
      ) {
        var i = config.ManagerUniform.getById(t);
        i && hb.updatePlayerSkin(this.ske, i.prefab, !1, "Player", null, this.isHost);
      }
      (this.updateTipView(), this.updatePet());
    }),
    Object.defineProperty(i.prototype, "isMe", {
      get: function () {
        return this.playerId == E8.role.id && !OQ.instance.visitId;
      },
      enumerable: !1,
      configurable: !0,
    }),
    Object.defineProperty(i.prototype, "isHost", {
      get: function () {
        return this.playerId == OQ.instance.visitId;
      },
      enumerable: !1,
      configurable: !0,
    }),
    (i.prototype.updatePet = function () {
      return r(this, void 0, void 0, function () {
        var e,
          t,
          i,
          n = this;
        return a(this, function (o) {
          switch (o.label) {
            case 0:
              return (
                (this.onDirectChange = function (e, t, i) {
                  return r(n, void 0, void 0, function () {
                    var n;
                    return a(this, function (o) {
                      switch (o.label) {
                        case 0:
                          return this.ske_pet &&
                            this.ske_pet.skeletonData &&
                            this.ske_pet.skeletonData.textures
                            ? ((this.ske_pet.node.scaleX = this.spine.node.scaleX),
                              (n = this.ske_pet.node.getChildByName("label")) &&
                                (n.scaleX = this.ske_pet.node.scaleX),
                              e.startsWith("z_wait") || e.startsWith("b_wait")
                                ? Math.random() > 0.5
                                  ? [4, ib.playAnimation(this.ske_pet, e, t, i)]
                                  : [3, 2]
                                : [3, 5])
                            : [2];
                        case 1:
                          return (o.sent(), [3, 4]);
                        case 2:
                          return [
                            4,
                            ib.playAnimation(
                              this.ske_pet,
                              e.startsWith("z") ? "z_idle" : "b_idle",
                              !0,
                            ),
                          ];
                        case 3:
                          (o.sent(), (o.label = 4));
                        case 4:
                          return [3, 7];
                        case 5:
                          return [4, ib.playAnimation(this.ske_pet, e, t, i)];
                        case 6:
                          (o.sent(), (o.label = 7));
                        case 7:
                          return [2];
                      }
                    });
                  });
                }),
                (e = this.userInfo || E8.role.userInfo).pet
                  ? ((this.ske_pet.node.active = !0),
                    (t = config.Pet.getById(e.pet)),
                    [4, hb.loadPlayerOrPet(this.ske_pet, t.spine, !1, "Petsp")])
                  : [3, 2]
              );
            case 1:
              return (
                o.sent(),
                ib.playAnimation(this.ske_pet, "z_idle", !0),
                (i = hb.addNameNodeToPet(
                  this.ske_pet.node,
                  e.petName || t.name,
                  OQ.instance.visitId > 0,
                )) && (i.y = Math.min(210, this.ske_pet.node.height)),
                [3, 3]
              );
            case 2:
              ((this.ske_pet.node.active = !1), (o.label = 3));
            case 3:
              return [2];
          }
        });
      });
    }),
    (i.prototype.checkEvent = function () {
      if (
        this.isMe &&
        !(E8.role.userInfo.level < config.ManagerConfig.config.managerEventUnlockPlayerLevel)
      ) {
        if (0 == E8.role.managerEventTime) {
          var e = E8.role.createAt.getTime(),
            t = [],
            i = [];
          config.ManagerEvent.list.forEach(function (e) {
            (0 == e.unlock.length || K6.CheckUnlock(e.unlock)) && (t.push(e), i.push(e.weight));
          });
          var n = new oC(e).randomByWeight(i),
            o = t[n].id;
          this.eventId = o;
        } else if (E8.role.managerEventId > 0) this.eventId = E8.role.managerEventId;
        else {
          e = E8.role.managerEventTime;
          var r = [],
            a = [];
          config.ManagerEvent.list.forEach(function (e) {
            (0 == e.unlock.length || K6.CheckUnlock(e.unlock)) && (r.push(e), a.push(e.weight));
          });
          ((n = new oC(e).randomByWeight(a)), (o = r[n].id));
          this.eventId = o;
        }
        this.hasEvent = E8.serverTime >= E8.role.managerEventTime && this.eventId > 0;
      }
    }),
    (i.prototype.onAddMap = function () {
      return r(this, void 0, void 0, function () {
        return a(this, function (e) {
          return (
            this.isMe
              ? ((n.me = this), u.add("updateAvatar", this.updateInfo, this))
              : u.remove("updateAvatar", this.updateInfo, this),
            OQ.instance.visitId &&
              !this.isHost &&
              HZ.show(this.node, this.userInfo || E8.role.userInfo, cc.v2(0, 240)),
            this.isFollower || this.updatePet(),
            [2]
          );
        });
      });
    }),
    (i.prototype.useAdorn = function (e) {
      return r(this, void 0, void 0, function () {
        return a(this, function (e) {
          return [2];
        });
      });
    }),
    (i.prototype.onWalkRandom = function () {
      return r(this, void 0, void 0, function () {
        var e;
        return a(this, function (t) {
          switch (t.label) {
            case 0:
              return (
                (this.tweening = !0),
                this.updateTipView(),
                (e = M(1, 4)),
                [4, this.onDirection(this.dir, "wait" + e, !1)]
              );
            case 1:
              return (t.sent(), [4, this.onDirection(this.dir, "idle", !0)]);
            case 2:
              return (t.sent(), (this.tweening = !1), [2]);
          }
        });
      });
    }),
    (i.prototype.onUseAdornEnd = function (e) {
      this.updateTipView();
    }),
    (i.prototype.onAdornUse = function () {
      this.updateTipView();
    }),
    (i.prototype.updateTipView = function () {
      if (!this.isMe) return (this.updateTip(!1), void this.updateEvent(!1));
      (this.checkEvent(),
        this.usingAdorn > 0
          ? (this.updateTip(!1),
            this.updateEvent(!1),
            wH.me && (wH.me.updateEvent(this.hasEvent), wH.me.updateTip(!this.hasEvent)))
          : (this.updateTip(!this.hasEvent),
            this.updateEvent(this.hasEvent),
            wH.me && (wH.me.updateEvent(!1), wH.me.updateTip(!1))),
        wH.me && wH.me.adorn && wH.me.adorn.updateStateView());
    }),
    (i.prototype.updateEvent = function (e) {
      return r(this, void 0, void 0, function () {
        return a(this, function (t) {
          switch (t.label) {
            case 0:
              return i$.isEditing ||
                (this.isMe &&
                  E8.role.userInfo.level <
                    config.ManagerConfig.config.managerEventUnlockPlayerLevel)
                ? [2]
                : e
                  ? (gH.hide(this.node), [4, gH.show(this.node, cc.v2(0, 240))])
                  : [3, 2];
            case 1:
              return (
                t.sent(),
                (this.eventBubble = cc.find("EventBubble", this.node)),
                this.eventBubble ? [3, 3] : [2]
              );
            case 2:
              (gH.hide(this.node), (t.label = 3));
            case 3:
              return [2];
          }
        });
      });
    }),
    (i.prototype.updateTip = function (e) {
      return r(this, void 0, void 0, function () {
        return a(this, function (t) {
          switch (t.label) {
            case 0:
              return i$.isEditing
                ? [2]
                : e
                  ? (XZ.hide(), [4, XZ.show(this.node, cc.v2(0, 240))])
                  : [3, 2];
            case 1:
              return (
                t.sent(),
                this.node.isValid && (this.dialog = cc.find("DialogTip", this.node)),
                [3, 3]
              );
            case 2:
              (XZ.hide(this.node), (t.label = 3));
            case 3:
              return [2];
          }
        });
      });
    }),
    (i.prototype.showPlayerInfo = function () {
      this.isMe &&
        (OQ.editMode
          ? A8.Toast({ title: v.getLabel("newLevelUp_building") })
          : K6.showPlayerInfo(this.playerId));
    }),
    (i.prototype.onDisable = function () {
      (this.node.isValid && this.node.activeInHierarchy && (XZ.hide(this.node), gH.hide(this.node)),
        e.prototype.onDisable.call(this));
    }),
    (i.me = null),
    (i = n = o([jZ], i))
  );
})(wQ);
cc._RF.pop();
