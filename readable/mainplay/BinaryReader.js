// Original shared-closure declaration an: BinaryReader
// Source UTF-16 offsets 139703..141777; complete context in game.formatted.js:6937.
// Analysis fragment; not independently executable.

var an = (function () {
  function e(e) {
    ((this.position = 0), this.reset(e));
  }
  return (
    Object.defineProperty(e.prototype, "dataView", {
      get: function () {
        return (
          this._dataView ||
          (this._dataView = new DataView(
            this.data.buffer,
            this.data.byteOffset,
            this.data.byteLength,
          ))
        );
      },
      enumerable: !1,
      configurable: !0,
    }),
    (e.prototype.reset = function (e) {
      ((this.data = e), (this.position = 0), (this._dataView = null));
    }),
    (e.prototype.validate = function (e) {
      return !(this.position + e > this.data.length) || (console.error("read eof"), !1);
    }),
    (e.prototype.readUInt8 = function () {
      if (this.validate(1)) return this.data[this.position++];
    }),
    (e.prototype.readInt16 = function () {
      if (this.validate(2)) return this.data[this.position++] | (this.data[this.position++] << 8);
    }),
    (e.prototype.readInt32 = function () {
      if (this.validate(4))
        return (
          this.data[this.position++] |
          (this.data[this.position++] << 8) |
          (this.data[this.position++] << 16) |
          (this.data[this.position++] << 24)
        );
    }),
    (e.prototype.readInt64 = function () {
      var e = this.readInt32();
      return (e < 0 && (e += 4294967296), (e += 4294967296 * this.readInt32()));
    }),
    (e.prototype.readFloat32 = function () {
      if (this.validate(4)) {
        var e = this.dataView.getFloat32(this.position, !0);
        return ((this.position += 4), e);
      }
    }),
    (e.prototype.readFloat64 = function () {
      if (this.validate(8)) {
        var e = this.dataView.getFloat64(this.position, !0);
        return ((this.position += 8), e);
      }
    }),
    (e.prototype.read7BitInt = function () {
      var e = 0,
        t = 0,
        i = 0;
      do {
        if (35 == i) throw Error("Format_Bad7BitInt32");
        ((t |= (127 & (e = this.readUInt8())) << i), (i += 7));
      } while (0 != (128 & e));
      return t;
    }),
    (e.prototype.readUTF = function () {
      var e = this.read7BitInt();
      return this.readUTFBytes(e);
    }),
    (e.prototype.readUint8Array = function (e, t) {
      void 0 === t && (t = !1);
      var i = t
        ? this.data.slice(this.position, this.position + e)
        : this.data.subarray(this.position, this.position + e);
      return ((this.position += e), i);
    }),
    (e.prototype.readUTFBytes = function (e) {
      if (0 === e) return "";
      if (this.validate(e)) {
        var t = this.decodeUTF8(this.data, this.position, e);
        return ((this.position += e), t);
      }
    }),
    (e.prototype.decoderError = function (e) {
      throw new Error("decode error at ".concat(this.position, ": ").concat(e));
    }),
    (e.prototype.decodeUTF8 = function (e, t, i) {
      var n = ~~t,
        o = void 0 === i ? e.length : Math.min(e.length, n + i);
      return n === o ? "" : rn.decode(e.subarray(n, o));
    }),
    e
  );
})();
