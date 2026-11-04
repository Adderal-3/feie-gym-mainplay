// Original shared-closure declaration EJ: BoardTransport
// Source UTF-16 offsets 3117280..3121733; complete context in game.formatted.js:152062.
// Analysis fragment; not independently executable.

var EJ = (function () {
  function e() {}
  return (
    (e.BoardRequestSendDebounce = function (e, t, i, n, o) {
      var s = this;
      if ((void 0 === i && (i = function (e, t) {}), void 0 === n && (n = ""), o9.isInitialzed)) {
        var c = this.GetRequest(t);
        if (E8.IsTestVersion) {
          this.ChangeCheck(e, t) && this.SendRequestNow();
          var l = this.MergeData(e, t);
          (this.timer && clearTimeout(this.timer),
            (this.preReqData = { req: c, data: l, type: t, cb: i, info: n }));
          var d = this.GetRequestTime(t);
          this.timer = setTimeout(function () {
            return r(s, void 0, void 0, function () {
              var e;
              return a(this, function (t) {
                return this.preReqData
                  ? ((e = {
                      req: this.preReqData.req,
                      data: this.preReqData.data,
                      type: this.preReqData.type,
                      cb: this.preReqData.cb,
                      info: this.preReqData.info,
                    }),
                    (this.preReqData = null),
                    TJ.BoardRequestSend(e.req, e.data, e.type, e.cb, e.info, !1),
                    (this.timer = null),
                    [2])
                  : [2];
              });
            });
          }, d);
        } else TJ.BoardRequestSend(c, e, t, i, n);
      }
    }),
    (e.SendRequestNow = function () {
      return r(this, void 0, void 0, function () {
        var e;
        return a(this, function (t) {
          switch (t.label) {
            case 0:
              return this.preReqData && o9.isInitialzed
                ? (this.timer && clearTimeout(this.timer),
                  (this.timer = null),
                  (e = {
                    req: this.preReqData.req,
                    data: this.preReqData.data,
                    type: this.preReqData.type,
                    cb: this.preReqData.cb,
                    info: this.preReqData.info,
                  }),
                  (this.preReqData = null),
                  [4, TJ.BoardRequestSend(e.req, e.data, e.type, e.cb, e.info, !1)])
                : [2];
            case 1:
              return (t.sent(), [2]);
          }
        });
      });
    }),
    (e.ChangeCheck = function (e, t) {
      if (!this.preReqData || this.preReqData.type != t) return !0;
      var i = !1;
      if (t == gy.CellProduct) {
        var n = Array.from(this.preReqData.data.productInformation),
          o = this.preReqData.data.index,
          r = 3;
        E8.role.boardControl &&
          E8.role.boardControl.get("boardControlProductMaxCount") &&
          (r = parseInt(E8.role.boardControl.get("boardControlProductMaxCount")));
        var a = this.preReqData.data.launcherIndex;
        ((n && n.length >= r) || o != e.index || a != e.launcherIndex) && (i = !0);
      } else if (t == gy.CellMove) {
        ((n = Array.from(this.preReqData.data.moveInformation)), (r = 3));
        (E8.role.boardControl &&
          E8.role.boardControl.get("boardControlMoveMaxCount") &&
          (r = parseInt(E8.role.boardControl.get("boardControlMoveMaxCount"))),
          n && n.length >= r && (i = !0));
      } else if (t == gy.CellCollect) {
        ((n = Array.from(this.preReqData.data.collectInformation)), (r = 3));
        (E8.role.boardControl &&
          E8.role.boardControl.get("boardControlCollectMaxCount") &&
          (r = parseInt(E8.role.boardControl.get("boardControlCollectMaxCount"))),
          n && n.length >= r && (i = !0));
      }
      return i;
    }),
    (e.MergeData = function (e, t) {
      var i;
      return t == gy.CellProduct
        ? this.preReqData && this.preReqData.data.productInformation
          ? ((i = Array.from(this.preReqData.data.productInformation)) &&
              i.length > 0 &&
              i.push({ timestamp: e.timestamp, cells: e.cells, seqId: e.seqId }),
            {
              boardId: this.preReqData.data.boardId,
              index: this.preReqData.data.index,
              launcherIndex: this.preReqData.data.launcherIndex,
              productInformation: i,
            })
          : {
              boardId: e.boardId,
              index: e.index,
              launcherIndex: e.launcherIndex,
              productInformation: [{ timestamp: e.timestamp, cells: e.cells, seqId: e.seqId }],
            }
        : t == gy.CellMove
          ? this.preReqData && this.preReqData.data.moveInformation
            ? ((i = Array.from(this.preReqData.data.moveInformation)) &&
                i.length > 0 &&
                i.push({
                  index: e.index,
                  toIndex: e.toIndex,
                  posIndex: e.posIndex,
                  cells: e.cells,
                  moveType: e.moveType,
                  timestamp: e.timestamp,
                  emitIndex: e.emitIndex,
                  emitCells: e.emitCells,
                }),
              { boardId: this.preReqData.data.boardId, moveInformation: i })
            : {
                boardId: e.boardId,
                moveInformation: [
                  {
                    index: e.index,
                    toIndex: e.toIndex,
                    posIndex: e.posIndex,
                    cells: e.cells,
                    moveType: e.moveType,
                    timestamp: e.timestamp,
                    emitIndex: e.emitIndex,
                    emitCells: e.emitCells,
                  },
                ],
              }
          : t == gy.CellCollect
            ? this.preReqData && this.preReqData.data.collectInformation
              ? ((i = Array.from(this.preReqData.data.collectInformation)) &&
                  i.length > 0 &&
                  i.push({ timestamp: e.timestamp, index: e.index }),
                { boardId: this.preReqData.data.boardId, collectInformation: i })
              : {
                  boardId: e.boardId,
                  collectInformation: [{ timestamp: e.timestamp, index: e.index }],
                }
            : void 0;
    }),
    (e.GetRequest = function (e) {
      return e == gy.CellProduct
        ? E8.IsTestVersion
          ? hm.multipleCellProduct
          : hm.cellProduct
        : e == gy.CellMove
          ? E8.IsTestVersion
            ? hm.multipleCellMove
            : hm.cellMove
          : e == gy.CellCollect
            ? E8.IsTestVersion
              ? hm.multipleCellCollect
              : hm.cellCollect
            : void 0;
    }),
    (e.GetRequestTime = function (e) {
      return e == gy.CellProduct
        ? E8.role.boardControl && E8.role.boardControl.get("boardControlProductTime")
          ? parseInt(E8.role.boardControl.get("boardControlProductTime"))
          : 200
        : e == gy.CellMove
          ? E8.role.boardControl && E8.role.boardControl.get("boardControlMoveTime")
            ? parseInt(E8.role.boardControl.get("boardControlMoveTime"))
            : 200
          : e == gy.CellCollect
            ? E8.role.boardControl && E8.role.boardControl.get("boardControlCollectTime")
              ? parseInt(E8.role.boardControl.get("boardControlCollectTime"))
              : 200
            : void 0;
    }),
    (e.timer = null),
    (e.preReqData = null),
    (e.stepCount = 3),
    e
  );
})();
