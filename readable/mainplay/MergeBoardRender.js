// Extracted cached Cocos registration: MergeBoardRender
// Source: recovered/packages/401/_subpackages_main_/subpackages/main/game.js, UTF-16 offsets 2839295..2848034.
// Shared closure variables remain in readable/game.formatted.js:138106.
// Analysis fragment; not an independently executable module.

cc._RF.push({ exports: {} }, "83e1dZ3w4tFWKGFTnEJsywC", "MergeBoardRender");
var yq = cc._decorator,
  _q = yq.ccclass,
  bq = yq.property,
  wq = (function (e) {
    function i() {
      var t = (null !== e && e.apply(this, arguments)) || this;
      return (
        (t.up_layer = null),
        (t.up_layer2 = null),
        (t.element_layer = null),
        (t.bottom_layer = null),
        (t.anim_layer = null),
        (t.uppest_layer = null),
        (t.top_layer = null),
        (t.background = null),
        (t.board_toucher = null),
        (t.prefab_cellRender = null),
        (t.prefab_cellBg = null),
        (t.orderInfo = null),
        (t.channelInfo = null),
        (t.elementInfo = null),
        (t.sprite_title = null),
        (t.sprite_board = null),
        (t.board_bottom = null),
        (t.board_move = null),
        (t.board_slide_bg = null),
        (t.board_slide_frame = null),
        (t.elementGuide = null),
        (t.readyCount = 0),
        (t._data = null),
        (t._slideController = null),
        (t._slideOriginalParent = null),
        (t._slideOriginalSiblingIndex = -1),
        (t._anchor = null),
        (t._renderOrderListItems = new Map()),
        t
      );
    }
    return (
      t(i, e),
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
      (i.prototype.waitInit = function () {
        return r(this, void 0, void 0, function () {
          return a(this, function (e) {
            switch (e.label) {
              case 0:
                return Tq.isShow ? [3, 2] : [4, S(33)];
              case 1:
                return (e.sent(), [3, 0]);
              case 2:
                return [2];
            }
          });
        });
      }),
      (i.prototype.init = function () {
        return r(this, void 0, void 0, function () {
          return a(this, function (e) {
            return (
              this.cancelBoardSlide(),
              (this.readyCount = 0),
              this._renderOrderListItems.clear(),
              this.clearElementGuide(),
              G2.instance.clear(),
              G2.instance.start(this, this.data),
              this.initBackground(),
              this.initElement(),
              this.initOrder(),
              this.initChannel(),
              [2]
            );
          });
        });
      }),
      (i.prototype.reloadBoardForSlide = function (e, t, i) {
        ((this._data = e),
          (this.readyCount = 0),
          this._renderOrderListItems.clear(),
          this.clearElementGuide(),
          G2.instance.clear(t),
          (G2.instance.bagCell = null),
          (G2.FillCellCount = 0),
          G2.instance.start(this, e),
          this.initBackground(),
          this.adoptSlideFixedCells(i),
          this.initElement(i ? new Set(i.values()) : void 0));
      }),
      (i.prototype.adoptSlideFixedCells = function (e) {
        if (e && 0 != e.size) {
          var t = G2.Board;
          e.forEach(function (e, i) {
            var n = i - 1,
              o = Math.floor(n / t.boardWidth),
              r = n % t.boardWidth;
            t.cells[o] && t.cells[o][r] && ((t.cells[o][r] = e), e.data && G2.FillCellCount++);
          });
        }
      }),
      (i.prototype.finishBoardSlideReload = function () {
        var e = this.orderInfo.btn_task.active;
        (nq.refreshAreaLockForBoardSlide(),
          this.initOrder(),
          (this.orderInfo.btn_task.active = e),
          this.initChannel());
      }),
      (i.prototype.slideBoard = function (e, t) {
        return (
          this._slideController || (this._slideController = new lq(this)),
          this._slideController.play(e, t)
        );
      }),
      (i.prototype.cancelBoardSlide = function () {
        this._slideController && this._slideController.cancel();
      }),
      Object.defineProperty(i.prototype, "canSlideBoard", {
        get: function () {
          var e = config.Board.getById(G2.Data.boardId);
          return !!e && e.showCell.length > 0;
        },
        enumerable: !1,
        configurable: !0,
      }),
      (i.prototype.extendBoardSlideBackground = function (e, t) {
        if (!(!this.board_slide_bg || e <= 0 || t <= 0)) {
          var i = e * t;
          this.board_slide_bg.height += i;
        }
      }),
      (i.prototype.attachBoardToSlideFrame = function () {
        this.canSlideBoard &&
          this.node.parent != this.board_move &&
          ((this._slideOriginalParent = this.node.parent),
          (this._slideOriginalSiblingIndex = this.node.getSiblingIndex()),
          L(this.node, this.board_move));
      }),
      (i.prototype.restoreBoardSlideHierarchy = function () {
        var e = this._slideOriginalParent;
        if (e && cc.isValid(e) && cc.isValid(this.node)) {
          L(this.node, e);
          var t = Math.max(0, e.childrenCount - 1);
          (this.node.setSiblingIndex(Math.min(this._slideOriginalSiblingIndex, t)),
            (this._slideOriginalParent = null),
            (this._slideOriginalSiblingIndex = -1));
        }
      }),
      (i.prototype.initBackground = function () {
        var e = G2.Board.boardRenderSize;
        (this.board_bottom && (this.board_bottom.active = !this.canSlideBoard),
          (this.board_slide_frame.parent.active = this.canSlideBoard),
          this.background.setContentSize(e.x, e.y),
          (this.background.position = cc.v3(
            -this.background.width / 2,
            this.background.height / 2,
            0,
          )),
          this.up_layer.setContentSize(e.x, e.y),
          (this.up_layer.position = cc.v3(this.background.position)),
          this.up_layer2.setContentSize(e.x, e.y),
          (this.up_layer2.position = cc.v3(this.background.position)),
          this.element_layer.setContentSize(e.x, e.y),
          (this.element_layer.position = cc.v3(this.background.position)),
          this.uppest_layer.setContentSize(e.x, e.y),
          (this.uppest_layer.position = cc.v3(
            -this.uppest_layer.width / 2,
            this.uppest_layer.height / 2,
            0,
          )),
          this.anim_layer.setContentSize(e.x, e.y),
          (this.anim_layer.position = cc.v3(
            -this.anim_layer.width / 2,
            this.anim_layer.height / 2,
            0,
          )),
          this.top_layer.setContentSize(e.x, e.y),
          (this.top_layer.position = cc.v3(
            -this.top_layer.width / 2,
            this.top_layer.height / 2,
            0,
          )),
          this.bottom_layer.setContentSize(e.x, e.y),
          (this.bottom_layer.position = cc.v3(this.background.position)),
          Ai(this.sprite_title, _j.GetBoardTitle(G2.Data.boardId)),
          this.canSlideBoard
            ? (Ai(this.board_slide_bg.getComponent(cc.Sprite), _j.GetBoardFrameBg(G2.Data.boardId)),
              Ai(this.board_slide_frame.getComponent(cc.Sprite), _j.GetBoardFrame(G2.Data.boardId)))
            : Ai(this.sprite_board, _j.GetBoardBg(G2.Data.boardId)));
      }),
      (i.prototype.initElementBackground = function () {
        var e = this,
          t = G2.Board,
          i = t.cells;
        (Array.from(this.background.children).forEach(function (e) {
          return ot.PutPrefab(e);
        }),
          i.forEach(function (i, n) {
            i.forEach(function (i, n) {
              i.worldPos = e.element_layer.convertToWorldSpaceAR(i.localPos);
              var o = ot.GetPrefab(
                e.prefab_cellBg,
                t.boardWidth * t.boardHeight,
                t.boardWidth * t.boardHeight,
              );
              (o.setContentSize(t.cellSize, t.cellSize),
                (o.parent = e.background),
                (o.position = cc.v3(i.localPos)),
                (o.active = !0));
            });
          }));
      }),
      (i.prototype.initElement = function (e) {
        var t = G2.Board.cells,
          i = GW.ParseBoardCellData(G2.Data);
        GW.LogDebugInfo = !1;
        for (var n = 0, o = t.length; n < o; n++)
          for (var r = 0, a = t[n].length; r < a; r++)
            (e && e.has(t[n][r])) ||
              (t[n][r].data = GW.ParseCellConfig(i[n][r], 0, t[n][r].serverIdx));
        GW.LogDebugInfo = !0;
      }),
      (i.prototype.initOrder = function () {
        G2.MergeBoardType == ar.main
          ? ((this.orderInfo.orderList.node.active = !0),
            (this.orderInfo.btn_task.active = !0),
            (this.orderInfo.node_eventTip.active = !1),
            (this.orderInfo.data = G2.Data))
          : ((this.orderInfo.orderList.node.active = !1),
            (this.orderInfo.btn_task.active = !0),
            (this.orderInfo.node_eventTip.active = !0),
            (this.orderInfo.data = G2.Data));
      }),
      (i.prototype.initChannel = function () {
        this.channelInfo.data = null;
      }),
      Object.defineProperty(i.prototype, "anchorWorldPos", {
        get: function () {
          return (
            this._anchor ||
              (this._anchor = cc.v2(
                this.element_layer.parent.convertToWorldSpaceAR(this.element_layer.position),
              )),
            this._anchor
          );
        },
        enumerable: !1,
        configurable: !0,
      }),
      (i.prototype.resetLayer = function () {
        var e = Array.from(this.bottom_layer.children);
        (e.forEach(function (e) {
          return ot.PutPrefab(e);
        }),
          (e = Array.from(this.up_layer.children)).forEach(function (e) {
            return ot.PutPrefab(e);
          }),
          (e = Array.from(this.up_layer2.children)).forEach(function (e) {
            return ot.PutPrefab(e);
          }),
          (e = Array.from(this.anim_layer.children)).forEach(function (e) {
            return ot.PutPrefab(e);
          }),
          (e = Array.from(this.uppest_layer.children)).forEach(function (e) {
            return ot.PutPrefab(e);
          }));
      }),
      (i.prototype.setElementGuide = function (e, t, i, n) {
        var o = this;
        (this.clearElementGuide(),
          (this.elementGuide.name = i),
          this.elementGuide.setContentSize(n.x, n.y),
          Ct.registerUI(this.elementGuide),
          (this.elementGuide.active = e),
          Ct.onUIState(this.elementGuide, It.Active));
        var r = G$.GetCellByIndex(t);
        r &&
          ((this.elementGuide.position = cc.v3(N(r.worldPos, this.elementGuide.parent))),
          this.elementGuide.on(
            cc.Node.EventType.TOUCH_END,
            function () {
              ((G2.instance.selectedElement = r),
                (G2.instance.detailInfoElement = r),
                o.elementGuide.targetOff(o));
            },
            this,
          ));
      }),
      (i.prototype.clearElementGuide = function () {
        (Ct.unRegisterUI(this.elementGuide),
          this.elementGuide.targetOff(this),
          (this.elementGuide.active = !1));
      }),
      (i.prototype.addRenderOrderListItem = function (e) {
        var t;
        this._renderOrderListItems.set(
          null === (t = null == e ? void 0 : e.node) || void 0 === t ? void 0 : t.uuid,
          e,
        );
      }),
      (i.prototype.removeRenderOrderListItem = function (e) {
        var t;
        this._renderOrderListItems.delete(
          null === (t = null == e ? void 0 : e.node) || void 0 === t ? void 0 : t.uuid,
        );
      }),
      (i.prototype.getRenderOrderListItems = function () {
        return Array.from(this._renderOrderListItems.values());
      }),
      o([bq(cc.Node)], i.prototype, "up_layer", void 0),
      o([bq(cc.Node)], i.prototype, "up_layer2", void 0),
      o([bq(cc.Node)], i.prototype, "element_layer", void 0),
      o([bq(cc.Node)], i.prototype, "bottom_layer", void 0),
      o([bq(cc.Node)], i.prototype, "anim_layer", void 0),
      o([bq(cc.Node)], i.prototype, "uppest_layer", void 0),
      o([bq(cc.Node)], i.prototype, "top_layer", void 0),
      o([bq(cc.Node)], i.prototype, "background", void 0),
      o([bq(cc.Node)], i.prototype, "board_toucher", void 0),
      o([bq(DM)], i.prototype, "prefab_cellRender", void 0),
      o([bq(cc.Node)], i.prototype, "prefab_cellBg", void 0),
      o([bq(xz)], i.prototype, "orderInfo", void 0),
      o([bq(mq)], i.prototype, "channelInfo", void 0),
      o([bq(jG)], i.prototype, "elementInfo", void 0),
      o([bq(cc.Sprite)], i.prototype, "sprite_title", void 0),
      o([bq(cc.Sprite)], i.prototype, "sprite_board", void 0),
      o([bq(cc.Node)], i.prototype, "board_bottom", void 0),
      o([bq(cc.Node)], i.prototype, "board_move", void 0),
      o([bq(cc.Node)], i.prototype, "board_slide_bg", void 0),
      o([bq(cc.Node)], i.prototype, "board_slide_frame", void 0),
      o([bq(cc.Node)], i.prototype, "elementGuide", void 0),
      (i = o([_q], i))
    );
  })(cc.Component);
cc._RF.pop();
