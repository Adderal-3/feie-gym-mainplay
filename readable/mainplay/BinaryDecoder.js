// Original shared-closure declaration hn: BinaryDecoder
// Source UTF-16 offsets 146948..147769; complete context in game.formatted.js:7268.
// Analysis fragment; not independently executable.

var hn = (function () {
  function e() {
    ((this.dr = new an(null)), (this.strArr = []));
  }
  return (
    (e.prototype.reset = function (e) {
      (this.dr.reset(e), (this.strArr.length = 0));
    }),
    (e.prototype.decode = function () {
      switch (this.dr.readUInt8()) {
        default:
          return null;
        case 1:
          return this.dr.readInt32();
        case 2:
          return this.dr.readInt64();
        case 3:
          return this.dr.readFloat32();
        case 4:
          return this.dr.readFloat64();
        case 5:
          var e = this.dr.readUTF();
          return (this.strArr.push(e), e);
        case 6:
          return 1 == this.dr.readUInt8();
        case 7:
          return this.dr.readUint8Array(this.dr.read7BitInt(), !1);
        case 8:
          for (var t = this.dr.read7BitInt(), i = {}, n = 0; n < t; n++) {
            var o = this.decode(),
              r = this.decode();
            i[o] = r;
          }
          return i;
        case 9:
          t = this.dr.read7BitInt();
          var a = new Array(t);
          for (n = 0; n < t; n++) a[n] = this.decode();
          return a;
        case 10:
          return new Date(this.dr.readInt64());
        case 99:
          return this.strArr[this.dr.read7BitInt()];
      }
    }),
    e
  );
})();
