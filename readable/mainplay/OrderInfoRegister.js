// Extracted cached Cocos registration: OrderInfoRegister
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 2651492..2659336.
// Shared closure variables remain in readable/game.formatted.js:129089.
// Analysis fragment; not an independently executable module.

(cc._RF.push({ exports: {} }, "23442fioABAFr/J99h+CI33", "OrderInfoRegister"),
  (function (e) {
    ((e[(e.ActProBtn = 1)] = "ActProBtn"),
      (e[(e.LampPassBtn = 2)] = "LampPassBtn"),
      (e[(e.EventPassBtn = 3)] = "EventPassBtn"),
      (e[(e.EventPassNewBtn = 4)] = "EventPassNewBtn"),
      (e[(e.WeekTaskBtn = 5)] = "WeekTaskBtn"),
      (e[(e.HiddenTempleBtn = 6)] = "HiddenTempleBtn"),
      (e[(e.MagicCauldronBtn = 7)] = "MagicCauldronBtn"),
      (e[(e.WorldTaskBtn = 8)] = "WorldTaskBtn"),
      (e[(e.BranchOrderTaskBtn = 9)] = "BranchOrderTaskBtn"),
      (e[(e.TimeOrderTaskBtn = 10)] = "TimeOrderTaskBtn"),
      (e[(e.ButterFlyV2Btn = 11)] = "ButterFlyV2Btn"),
      (e[(e.PickOneBtn = 12)] = "PickOneBtn"),
      (e[(e.ThemePassBtn = 13)] = "ThemePassBtn"),
      (e[(e.CarrotPassBtn = 14)] = "CarrotPassBtn"),
      (e[(e.BingoBtn = 15)] = "BingoBtn"),
      (e[(e.DuanwuTaskBtn = 16)] = "DuanwuTaskBtn"),
      (e[(e.ChampionshipBtn = 17)] = "ChampionshipBtn"),
      (e[(e.BuffActBtn = 18)] = "BuffActBtn"),
      (e[(e.ActivityBtn = 19)] = "ActivityBtn"),
      (e[(e.Activity2Btn = 20)] = "Activity2Btn"),
      (e[(e.ActBingoBtn = 21)] = "ActBingoBtn"),
      (e[(e.HealthFoodBtn = 22)] = "HealthFoodBtn"),
      (e[(e.Activity3Btn = 23)] = "Activity3Btn"),
      (e[(e.Activity4Btn = 24)] = "Activity4Btn"),
      (e[(e.TimeLimitTaskBtn = 25)] = "TimeLimitTaskBtn"),
      (e[(e.RoutineCheck2Btn = 26)] = "RoutineCheck2Btn"),
      (e[(e.GogBtn = 27)] = "GogBtn"),
      (e[(e.VolcanoBtn = 28)] = "VolcanoBtn"),
      (e[(e.SpaceTreasureBtn = 29)] = "SpaceTreasureBtn"),
      (e[(e.GogV2Btn = 30)] = "GogV2Btn"),
      (e[(e.ScrewGameBtn = 31)] = "ScrewGameBtn"),
      (e[(e.MonopolyGoBtn = 32)] = "MonopolyGoBtn"),
      (e[(e.WarehouseBtn = 33)] = "WarehouseBtn"),
      (e[(e.Activity5Btn = 34)] = "Activity5Btn"),
      (e[(e.Activity6Btn = 35)] = "Activity6Btn"),
      (e[(e.AppleTreeBtn = 36)] = "AppleTreeBtn"),
      (e[(e.ChooseOrderBtn = 37)] = "ChooseOrderBtn"),
      (e[(e.MasterMatchBtn = 38)] = "MasterMatchBtn"),
      (e[(e.Activity7PassBtn = 39)] = "Activity7PassBtn"),
      (e[(e.Activity7Btn = 40)] = "Activity7Btn"),
      (e[(e.Activity9Btn = 41)] = "Activity9Btn"),
      (e[(e.PinballBtn = 42)] = "PinballBtn"),
      (e[(e.HangChallengeBtn = 43)] = "HangChallengeBtn"),
      (e[(e.WeightRaceBtn = 44)] = "WeightRaceBtn"),
      (e[(e.Activity8Btn = 45)] = "Activity8Btn"),
      (e[(e.GymSprintBtn = 46)] = "GymSprintBtn"),
      (e[(e.CollectionActBtn = 47)] = "CollectionActBtn"),
      (e[(e.MaskChallengeBtn = 48)] = "MaskChallengeBtn"),
      (e[(e.OneVsOneBtn = 49)] = "OneVsOneBtn"),
      (e[(e.TeamVersusBtn = 50)] = "TeamVersusBtn"),
      (e[(e.TournamentBtn = 51)] = "TournamentBtn"),
      (e[(e.FireRankBtn = 52)] = "FireRankBtn"),
      (e[(e.DiveOrderBtn = 53)] = "DiveOrderBtn"),
      (e[(e.FloatRaceBtn = 54)] = "FloatRaceBtn"),
      (e[(e.ClimbTowerBtn = 55)] = "ClimbTowerBtn"),
      (e[(e.OpenBoxBtn = 56)] = "OpenBoxBtn"),
      (e[(e.WinStreakRankBtn = 57)] = "WinStreakRankBtn"),
      (e[(e.TrainOrderBtn = 58)] = "TrainOrderBtn"),
      (e[(e.JungleAdventureBtn = 59)] = "JungleAdventureBtn"),
      (e[(e.PartnerEventBtn = 60)] = "PartnerEventBtn"));
  })(Sz || (Sz = {})));
var Rz = cc._decorator,
  Pz = Rz.ccclass;
Rz.property;
var Dz = (function (e) {
  function i() {
    var t = (null !== e && e.apply(this, arguments)) || this;
    return (
      (t._orderInfoItemList = []),
      (t._orderInfoNodeMap = new Map()),
      (t._orderInfoLoadedMap = new Map()),
      (t._orderInfoOrderMap = new Map()),
      (t._isInit = !1),
      (t._netting = !1),
      t
    );
  }
  return (
    t(i, e),
    (i.prototype.init = function () {
      this._isInit || ((this._isInit = !0), this._regist());
    }),
    (i.prototype.check = function () {
      return r(this, void 0, void 0, function () {
        var e,
          t,
          i,
          n,
          o = this;
        return a(this, function (r) {
          switch (r.label) {
            case 0:
              return this._netting ? [4, S(66)] : [3, 2];
            case 1:
              return (r.sent(), [3, 0]);
            case 2:
              for (this._netting = !0, e = [], t = 0; t < this._orderInfoItemList.length; t++)
                ((i = this._orderInfoItemList[t]),
                  (n = i.path),
                  this._orderInfoLoadedMap.get(n) || e.push(this._load(n, i.order, i.loadCheck)));
              return e.length ? [4, Promise.all(e)] : [3, 4];
            case 3:
              (r.sent(),
                this._orderInfoNodeMap.forEach(function (e, t) {
                  var i = o._orderInfoOrderMap.get(t);
                  e.zIndex = i;
                }),
                this.node.getComponent(cc.Layout).updateLayout(),
                (r.label = 4));
            case 4:
              return ((this._netting = !1), [2]);
          }
        });
      });
    }),
    (i.prototype._load = function (e, t, i) {
      return (
        void 0 === t && (t = 0),
        void 0 === i && (i = null),
        r(this, void 0, void 0, function () {
          var n, o, r;
          return a(this, function (a) {
            switch (a.label) {
              case 0:
                return i && !i() ? [2] : [4, mi(cc.Prefab, e)];
              case 1:
                return null == (n = a.sent())
                  ? (h.error("loadOrderInfoItem not found prefab:" + e),
                    A8.Toast({ title: v.getLabel("tip_loadingError") }),
                    this._orderInfoLoadedMap.set(e, !1),
                    [2, null])
                  : ((o = cc.instantiate(n)),
                    null == (r = o.getComponent(gk))
                      ? (h.error("loadOrderInfoItem not have orderInfoItem:" + e),
                        this._orderInfoLoadedMap.set(e, !1),
                        [2, null])
                      : (G2.BoardRender.orderInfo.addOrderInfoItem(r),
                        this._orderInfoLoadedMap.set(e, !0),
                        (o.parent = this.node),
                        (o.active = !1),
                        this._orderInfoNodeMap.set(e, o),
                        this._orderInfoOrderMap.set(e, t),
                        [2, o]));
            }
          });
        })
      );
    }),
    (i.prototype._regist = function () {
      (this.registOrderInfoItem("LampPassBtn", Sz.LampPassBtn),
        this.registOrderInfoItem("EventPassBtn", Sz.EventPassBtn),
        this.registOrderInfoItem("EventPassNewBtn", Sz.EventPassNewBtn),
        this.registOrderInfoItem("HiddenTempleBtn", Sz.HiddenTempleBtn),
        this.registOrderInfoItem("MagicCauldronBtn", Sz.MagicCauldronBtn),
        this.registOrderInfoItem("WorldTaskBtn", Sz.WorldTaskBtn),
        this.registOrderInfoItem("ActBingoBtn", Sz.ActBingoBtn),
        this.registOrderInfoItem("BranchOrderTaskBtn", Sz.BranchOrderTaskBtn),
        this.registOrderInfoItem("TimeOrderTaskBtn", Sz.TimeOrderTaskBtn),
        this.registOrderInfoItem("PickOneBtn", Sz.PickOneBtn),
        this.registOrderInfoItem("ThemePassBtn", Sz.ThemePassBtn),
        this.registOrderInfoItem("CarrotPassBtn", Sz.CarrotPassBtn),
        this.registOrderInfoItem("BingoBtn", Sz.BingoBtn),
        this.registOrderInfoItem("DuanwuTaskBtn", Sz.DuanwuTaskBtn),
        this.registOrderInfoItem("ChampionshipBtn", Sz.ChampionshipBtn),
        this.registOrderInfoItem("BuffActBtn", Sz.BuffActBtn),
        this.registOrderInfoItem("ActivityBtn", Sz.ActivityBtn),
        this.registOrderInfoItem("Activity2Btn", Sz.Activity2Btn),
        this.registOrderInfoItem("HealthFoodBtn", Sz.HealthFoodBtn),
        this.registOrderInfoItem("Activity3Btn", Sz.Activity3Btn),
        this.registOrderInfoItem("Activity4Btn", Sz.Activity4Btn),
        this.registOrderInfoItem("TimeLimitTaskBtn", Sz.TimeLimitTaskBtn),
        this.registOrderInfoItem("RoutineCheck2Btn", Sz.RoutineCheck2Btn),
        this.registOrderInfoItem("GogBtn", Sz.GogBtn),
        this.registOrderInfoItem("VolcanoBtn", Sz.VolcanoBtn),
        this.registOrderInfoItem("SpaceTreasureBtn", Sz.SpaceTreasureBtn),
        this.registOrderInfoItem("GogV2Btn", Sz.GogV2Btn),
        this.registOrderInfoItem("MonopolyGoBtn", Sz.MonopolyGoBtn),
        this.registOrderInfoItem("WarehouseBtn", Sz.WarehouseBtn),
        this.registOrderInfoItem("Activity5Btn", Sz.Activity5Btn),
        this.registOrderInfoItem("Activity6Btn", Sz.Activity6Btn),
        this.registOrderInfoItem("AppleTreeBtn", Sz.AppleTreeBtn),
        this.registOrderInfoItem("MasterMatchBtn", Sz.MasterMatchBtn),
        this.registOrderInfoItem("Activity7Btn", Sz.Activity7Btn),
        this.registOrderInfoItem("PinballBtn", Sz.PinballBtn),
        this.registOrderInfoItem("HangChallengeBtn", Sz.HangChallengeBtn),
        this.registOrderInfoItem("Activity8Btn", Sz.Activity8Btn),
        this.registOrderInfoItem("GymSprintBtn", Sz.GymSprintBtn),
        this.registOrderInfoItem("ScrewGameBtn", Sz.ScrewGameBtn),
        this.registOrderInfoItem("WeightRaceBtn", Sz.WeightRaceBtn),
        this.registOrderInfoItem("WinStreakRankBtn", Sz.WinStreakRankBtn),
        this.registOrderInfoItem("Activity9Btn", Sz.Activity9Btn),
        this.registOrderInfoItem("ChooseOrderBtn", Sz.ChooseOrderBtn),
        this.registOrderInfoItem("MaskChallengeBtn", Sz.MaskChallengeBtn),
        this.registOrderInfoItem("OneVsOneBtn", Sz.OneVsOneBtn),
        this.registOrderInfoItem("TeamVersusBtn", Sz.TeamVersusBtn),
        this.registOrderInfoItem("TournamentBtn", Sz.TournamentBtn),
        this.registOrderInfoItem("FireRankBtn", Sz.FireRankBtn),
        this.registOrderInfoItem("DiveOrderBtn", Sz.DiveOrderBtn),
        this.registOrderInfoItem("ClimbTowerBtn", Sz.ClimbTowerBtn),
        this.registOrderInfoItem("FloatRaceBtn", Sz.FloatRaceBtn),
        this.registOrderInfoItem("Activity7PassBtn", Sz.Activity7PassBtn),
        this.registOrderInfoItem("OpenBoxBtn", Sz.OpenBoxBtn),
        this.registOrderInfoItem("CollectionActBtn", Sz.CollectionActBtn),
        this.registOrderInfoItem("TrainOrderBtn", Sz.TrainOrderBtn),
        this.registOrderInfoItem("WeekTaskBtn", Sz.WeekTaskBtn),
        this.registOrderInfoItem("ButterFlyV2Btn", Sz.ButterFlyV2Btn),
        this.registOrderInfoItem("JungleAdventureBtn", Sz.JungleAdventureBtn),
        this.registOrderInfoItem("PartnerEventBtn", Sz.PartnerEventBtn));
    }),
    (i.prototype.registOrderInfoItem = function (e, t) {
      void 0 === t && (t = 0);
      this._orderInfoItemList.push({
        path: "Prefab/UI/OrderInfoItem/" + e,
        order: t,
        loadCheck: function () {
          var t,
            i = ((t = e), dk.get(t));
          return i ? i() : (h.error("订单入口尚未注册 Check：" + e), !1);
        },
      });
    }),
    (i = o([Pz], i))
  );
})(cc.Component);
cc._RF.pop();
