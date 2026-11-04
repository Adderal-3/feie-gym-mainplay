// Original shared-closure declaration vn: BinaryDecodeEntry
// Source UTF-16 offsets 5384381..5386080; complete context in game.formatted.js:7323.
// Analysis fragment; not independently executable.

var vn = (function () {
  function e() {
    ((this.id = ""),
      (this.unlockEntrance = 0),
      (this.board = 0),
      (this.task = 0),
      (this.initCoin = 0),
      (this.prepareDuration = 0),
      (this.progressBarStep = []),
      (this.progressReward = []),
      (this.shop = []),
      (this.shopPrice = []),
      (this.shopProgressBarStep = []),
      (this.shopProgressReward = []),
      (this.propBubbleRate = 0),
      (this.eventCoin = ""),
      (this.eventCoinName = ""),
      (this.eventCoinToCoin = 0),
      (this.PayExtendTime = 0),
      (this.Title = ""),
      (this.Subtitle = ""),
      (this.Foreshow = ""),
      (this.Description = ""),
      (this.Explanation = ""),
      (this.TaskGoose = ""),
      (this.EntranceIcon = ""),
      (this.WorldTitle = ""),
      (this.WorldDescription = ""),
      (this.specialReward = new Map()),
      (this.recordElementId = []),
      (this.numberPaiHang = 0),
      (this.channerWorld = []),
      (this.numberElement = 0),
      (this.unlockHappyEnd = []),
      (this.rankWord = ""),
      (this.WorldExplanation = ""),
      (this.WorldGoal = ""),
      (this.initPersonalGetLike = 0),
      (this.maxGiveLike = 0),
      (this.giveLikeReward = new Map()),
      (this.giftSeriesId = []),
      (this.giftIcon = []),
      (this.extraShopOpen = 0),
      (this.worldGoalOpen = 0),
      (this.rankTitle = ""),
      (this.worldRankExplanation = ""),
      (this.extraShopDesc = ""),
      (this.rankBg = ""),
      (this.worldRank = []),
      (this.worldRankBadgeReward = []),
      (this.txtColor = ""),
      (this.buttonColor = ""),
      (this.worldRankDes = ""),
      (this.worldRankScore = 0),
      (this.howToRank = ""),
      (this.waterId = ""),
      (this.rollingId = ""),
      (this.rankName = ""),
      (this.switchMp3 = ""));
  }
  return (
    (e.getById = function (t) {
      return e.map.get(t);
    }),
    (e.decode = function (t, i) {
      for (var n in (i || ((e.list.length = 0), e.map.clear()), t)) {
        var o = t[n],
          r = e.map.get(o.id),
          s = r || new e();
        (Object.assign(s, o),
          o.progressReward && (s.progressReward = a(o.progressReward, [0, 1], 0)),
          o.shopProgressReward && (s.shopProgressReward = a(o.shopProgressReward, [0, 1], 0)),
          o.specialReward && (s.specialReward = a(o.specialReward, [1], 0)),
          o.giveLikeReward && (s.giveLikeReward = a(o.giveLikeReward, [1], 0)),
          r || (e.list.push(s), e.map.set(s.id, s)));
      }
    }),
    (e.list = []),
    (e.map = new Map()),
    e
  );
})();
