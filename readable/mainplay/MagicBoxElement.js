// Extracted cached Cocos registration: MagicBoxElement
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 8381415..8383745.
// Shared closure variables remain in readable/game.formatted.js:406839.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "cd75cfUUXxLQ5tf+6Yqv/Rs", "MagicBoxElement");
var AKe = cc._decorator,
  kKe = AKe.ccclass;
AKe.property;
var RKe = AKe.menu;
(!(function (e) {
  function i() {
    return (null !== e && e.apply(this, arguments)) || this;
  }
  (t(i, e),
    (i.prototype.onInitRender = function (e) {}),
    (i.prototype.onClickElement = function (e) {
      var t = this,
        i = e.data.config.propEffect,
        n = config.PropEffect.getById(i),
        o = n && n.effectParams;
      if (o) {
        for (
          var s = config.QuestionMarkBox.getById(o),
            c = e.data.seed.seed,
            l = Array.from(s.eleWeight),
            d = new oC(c),
            h = [],
            p = 0;
          p < s.count;
          ++p
        ) {
          var f = d.randomByWeight(l);
          (h.push(f), (l[f] = 0));
        }
        j_.showWindow(F3.MagicBoxWindow, {
          conf: s,
          idxs: h,
          onSuc: function (i) {
            return r(t, void 0, void 0, function () {
              var t, n, o, r, c, l, h, p, f, g, v;
              return a(this, function (a) {
                return (
                  (t = s.elePool[i]),
                  (n = K6.ParseItemsConf(t)),
                  (o = n[0]),
                  (r = null),
                  o.itemType == oa.element
                    ? (j8.play(o_.MERGE_CREATE),
                      (e.data.seed.seed = d.seed),
                      G$.GetClosestBlankCell(e.pos, 1).length <= 0
                        ? ((c = e).resetTween(),
                          (l = GW.ParseCellConfig(
                            {
                              id: o.itemId,
                              seed: e.data.randomElementInt(),
                              state: mr.none,
                              productType: vr.none,
                            },
                            c.serverIdx,
                          )),
                          (c.data = l),
                          (c.mergeCellRender.node_icon.scale = 0.2),
                          (h = cc
                            .tween(c.mergeCellRender.node_icon)
                            .to(0.166, { scale: 1.2 })
                            .to(0.1, { scale: 0.95 })
                            .to(0.033, { scale: 1 })),
                          c.showOnceTween(h),
                          c.isSelect && u.dispatch("showElementInfo", c),
                          u.dispatch("newElementCreate", c.data),
                          (r = {
                            elementId: o.itemId,
                            index: c.data.remoteData.index,
                            productType: vr.none,
                          }))
                        : ((p = []).push({
                            id: o.itemId,
                            state: mr.none,
                            isList: !1,
                            seed: e.data.randomElementInt(),
                          }),
                          ((f = new C2()).datas = p),
                          (f.fromCell = e),
                          (f.count = 1),
                          (f.productType = vr.manualProduct),
                          (f.isCreator = !0),
                          (g = TJ.CreateNewElements(f)),
                          (r = { elementId: o.itemId, index: g[0].index, productType: vr.none }),
                          (e.data = null)),
                      e3.AddCellAnim(e, TC.DISAPPEAR))
                    : (o.itemType == oa.coin
                        ? (E8.role.coin += o.value)
                        : o.itemType == oa.energy
                          ? (E8.role.energy.value += o.value)
                          : o.itemType == oa.diamond && (E8.role.diamond += o.value),
                      h3.complexFly(o, null, e.worldPos, null, 50),
                      (e.data = null),
                      e3.AddCellAnim(e, TC.DISAPPEAR)),
                  (v = o.itemType == oa.element ? o.itemId : -1),
                  K3.logEvent("questionBox_choose", { eleId: v }),
                  TJ.BoardRequestSend(
                    hm.propUse,
                    {
                      boardId: G2.Data.id,
                      index: e.serverIdx,
                      toIndex: 0,
                      product: null,
                      timestamp: E8.serverTime,
                      extra: [{ idx: i, cell: r }],
                    },
                    "propuse",
                  ),
                  setTimeout(function () {
                    u.dispatch("showElementInfo", e);
                  }, 0),
                  [2]
                );
              });
            });
          },
          id: e.data.config.id,
        });
      } else console.error("magic box error!");
    }),
    (i = o([kKe, RKe("MergeCell/Logic/MagicBoxElement"), BM("MagicBoxElement")], i)));
})(xM),
  cc._RF.pop());
