// Extracted cached Cocos registration: OrderRecover
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 8393360..8397804.
// Shared closure variables remain in readable/game.formatted.js:407386.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "44eb2BV1wZHT5Jm+CsPa4Wi", "OrderRecover");
var UKe = cc._decorator,
  HKe = UKe.ccclass,
  VKe = UKe.property,
  jKe = UKe.menu,
  zKe = (function (e) {
    function i() {
      var t = (null !== e && e.apply(this, arguments)) || this;
      return ((t.timeProgress = null), (t._lastUpdateTime = 0), t);
    }
    return (
      t(i, e),
      (i.prototype.onLoad = function () {
        this.timeProgress.node.parent.active = !1;
      }),
      Object.defineProperty(i.prototype, "data", {
        get: function () {
          return this._data;
        },
        set: function (e) {
          this.onData(e);
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(i.prototype, "costGem", {
        get: function () {
          if (!this.clock || !this.data || !this.data.data) return 0;
          if (this.data.data.remoteData.order.id <= 0) return 0;
          var e = this.data.data.remoteData.order,
            t = null;
          if (this.data.data.config.elementOrderId < 0)
            t = config.ElementMultiOrderPool.getById(e.orderId);
          else {
            var i = config.ElementOrderPool.getById(e.orderId);
            t = config.ElementOrder.getById(i.elementOrderId);
          }
          if (t.speedUpCost <= 0) return 0;
          var n = this.data.data.remoteData.order.endTime - E8.serverTime,
            o = 1e3 * t.duration;
          return Math.ceil((n / o) * t.speedUpCost);
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(i.prototype, "leftTime", {
        get: function () {
          return this.clock &&
            this.data &&
            this.data &&
            this.data.data.remoteData &&
            this.data.data.remoteData.order.endTime
            ? this.data.data.remoteData.order.endTime - E8.serverTime
            : 0;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(i.prototype, "progress", {
        get: function () {
          if (!this.clock || !this.data || !this.data.data) return 0;
          if (this.data.data.remoteData.order.id <= 0) return 0;
          var e = this.data.data.remoteData.order,
            t = null;
          if (this.data.data.config.elementOrderId < 0)
            t = config.ElementMultiOrderPool.getById(e.orderId);
          else {
            var i = config.ElementOrderPool.getById(e.orderId);
            t = config.ElementOrder.getById(i.elementOrderId);
          }
          return 1 - (this.data.data.remoteData.order.endTime - E8.serverTime) / (1e3 * t.duration);
        },
        enumerable: !1,
        configurable: !0,
      }),
      (i.prototype.onDisable = function () {
        this.stop();
      }),
      (i.prototype.onData = function (e) {
        if (
          ((this._data = e), e && e.data && e.data.remoteData && !(e.data.remoteData.order.id <= 0))
        ) {
          (e.data.isOld ||
            ((this._lastUpdateTime = 0), (this.timeProgress.node.parent.active = !1)),
            (this.timeProgress.node.parent.active = !1));
          var t = e.data.remoteData.order.endTime - E8.serverTime;
          t > 0 && t < 2e3 && (t = 2e3);
          var i = t < 5e3 ? 50 : 200;
          ((this.clock = b.addClock(this.node.name, 1, i, 0)),
            this.clock && this.clock.registCallBack(this, null, this.onUpdate),
            this.showProgress(e.data.isOld));
        } else this.stop();
      }),
      (i.prototype.showProgress = function (e) {
        (void 0 === e && (e = !1),
          this.timeProgress.node.parent.active ||
            ((this.timeProgress.node.parent.active = !0),
            this.timeProgress.node.parent.stopAllActions(),
            e
              ? (this.timeProgress.node.parent.scale = 1)
              : ((this.timeProgress.node.parent.scale = 0),
                cc.tween(this.timeProgress.node.parent).to(0.2, { scale: 1 }).start())));
      }),
      (i.prototype.timeScale = function () {
        var e = this.data.data.remoteData.skills.get(Da.speedUp);
        if (!e || e - 1 <= 0) return ((this._lastUpdateTime = 0), 0);
        var t = 0;
        return (
          this.data.data.remoteData._speedUpStartTime &&
            ((t = this._lastUpdateTime
              ? E8.serverTime - this._lastUpdateTime
              : E8.serverTime - this.data.data.remoteData._speedUpStartTime),
            (this._lastUpdateTime = E8.serverTime)),
          t * (e - 1)
        );
      }),
      (i.prototype.stop = function () {
        (this.clock && this.clock.dispose(),
          this.clock && (this.clock = null),
          (this.timeProgress.node.parent.active = !1));
      }),
      (i.prototype.onUpdate = function (e) {
        if (
          this.data &&
          this.data.data &&
          this.data.data.remoteData &&
          !(this.data.data.remoteData.order.id <= 0)
        )
          if (this.data.data.remoteData.pauseTime) this._lastUpdateTime = 0;
          else {
            var t = 0;
            if (0 == this.data.data.remoteData.openEnd) {
              var i = this.data.data.remoteData.order,
                n = 0;
              if (this.data.data.config.elementOrderId < 0) {
                n = 1e3 * (o = config.ElementMultiOrderPool.getById(i.orderId)).duration;
              } else {
                var o = config.ElementOrderPool.getById(i.orderId);
                n = 1e3 * config.ElementOrder.getById(o.elementOrderId).duration;
              }
              ((this.data.data.remoteData.order.endTime -= this.timeScale()),
                (t = (n - (this.data.data.remoteData.order.endTime - E8.serverTime)) / n));
            }
            t < 1
              ? this.timeProgress && (this.timeProgress.fillRange = -1 * $(t, 0.97))
              : (this.stop(), this.onComplete());
          }
        else this.stop();
      }),
      (i.prototype.onComplete = function () {
        return r(this, void 0, void 0, function () {
          return a(this, function (e) {
            return (
              TJ.BoardRequestSend(
                hm.completeElementOrder,
                {
                  boardId: G2.Data.id,
                  index: this.data.serverIdx,
                  indexes: [],
                  timestamp: E8.serverTime,
                },
                "completeElementOrder",
              ),
              (this._lastUpdateTime = 0),
              b2.UpdateOrderState(this.data),
              (this.data.data = this.data.data),
              M$.onMergeExtraProduct(this.data, !0),
              [2]
            );
          });
        });
      }),
      o([VKe(cc.Sprite)], i.prototype, "timeProgress", void 0),
      (i = o([HKe, jKe("UI/Recover/OrderRecover")], i))
    );
  })(cc.Component);
cc._RF.pop();
