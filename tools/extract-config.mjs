import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

// Independent offline implementation of the client BON data format.
// Only parses data bytes; does not import, eval, or execute game bundles.
export function decodeBon(buffer) {
  const bytes = Buffer.from(buffer);
  const strings = [];
  let position = 0;
  let values = 0;
  function need(length) {
    if (!Number.isSafeInteger(length) || length < 0 || position + length > bytes.length) throw new Error(`Truncated BON at ${position}`);
  }
  function byte() { need(1); return bytes[position++]; }
  function varint() {
    let value = 0;
    for (let shift = 0; shift < 35; shift += 7) {
      const next = byte();
      value += (next & 127) * 2 ** shift;
      if (!(next & 128)) {
        if (value > 0x7fffffff) throw new Error(`BON length too large at ${position}`);
        return value;
      }
    }
    throw new Error(`Invalid BON varint at ${position}`);
  }
  function number(length, method) { need(length); const value = bytes[method](position); position += length; return value; }
  function int64() {
    need(8); const value = bytes.readBigInt64LE(position); position += 8;
    return value >= BigInt(Number.MIN_SAFE_INTEGER) && value <= BigInt(Number.MAX_SAFE_INTEGER) ? Number(value) : { $int64: value.toString() };
  }
  function decode(depth = 0) {
    if (depth > 100 || ++values > 15000000) throw new Error('BON safety limit exceeded');
    const tag = byte();
    switch (tag) {
      case 0: return null;
      case 1: return number(4, 'readInt32LE');
      case 2: return int64();
      case 3: return number(4, 'readFloatLE');
      case 4: return number(8, 'readDoubleLE');
      case 5: {
        const length = varint(); need(length);
        const value = bytes.toString('utf8', position, position + length); position += length;
        strings.push(value); return value;
      }
      case 6: return byte() === 1;
      case 7: {
        const length = varint(); need(length);
        const value = { $binary: bytes.subarray(position, position + length).toString('base64') }; position += length; return value;
      }
      case 8: {
        const count = varint(); if (count > bytes.length - position) throw new Error('Invalid BON map count');
        const result = Object.create(null);
        for (let i = 0; i < count; i++) {
          const key = decode(depth + 1);
          if (typeof key !== 'string' && typeof key !== 'number') throw new Error('Unsupported BON map key');
          result[key] = decode(depth + 1);
        }
        return result;
      }
      case 9: {
        const count = varint(); if (count > bytes.length - position) throw new Error('Invalid BON array count');
        const result = new Array(count);
        for (let i = 0; i < count; i++) result[i] = decode(depth + 1);
        return result;
      }
      case 10: { const value = int64(); return { $dateMillis: value }; }
      case 99: {
        const index = varint(); if (index >= strings.length) throw new Error(`Invalid BON string reference ${index}`);
        return strings[index];
      }
      default: throw new Error(`Unknown BON tag ${tag} at ${position - 1}`);
    }
  }
  const result = decode();
  if (position !== bytes.length) throw new Error(`Trailing BON bytes: ${bytes.length - position}`);
  return result;
}

export function extractConfig(recoveredRoot, outputRoot = path.join(recoveredRoot, 'config')) {
  const inputs = [
    ['Config', path.join(recoveredRoot, 'remote', 'remoteRes', 'config', 'Config.bin')],
    ['Lang_zh', path.join(recoveredRoot, 'remote', 'remoteRes', 'config', 'Lang_zh.bin')],
  ];
  const summary = { format: 'BON', decoder: 'Independent parser matching binary tags used by static client vn/hn/an', inputs: [] };
  const sensitiveKeys = [];
  const sha256 = data => crypto.createHash('sha256').update(data).digest('hex');
  function scanSensitive(value, location) {
    if (!value || typeof value !== 'object') return;
    for (const [key, entry] of Object.entries(value)) {
      if (/^(?:.*secret.*|password|privateKey|apiKey|accessToken|refreshToken|appKey)$/i.test(key) && typeof entry === 'string' && entry.length > 5) {
        sensitiveKeys.push({ path: `${location}.${key}`, valueType: 'string', length: entry.length });
      }
      if (entry && typeof entry === 'object') scanSensitive(entry, `${location}.${key}`);
    }
  }
  for (const [name, input] of inputs) {
    const data = fs.readFileSync(input);
    const decoded = decodeBon(data);
    if (!decoded || typeof decoded !== 'object' || Array.isArray(decoded)) throw new Error('Expected configuration root map');
    const directory = path.join(outputRoot, name);
    fs.mkdirSync(directory, { recursive: true });
    const tables = [];
    for (const [key, table] of Object.entries(decoded)) {
      if (!/^[a-zA-Z0-9_\-]+$/.test(key)) throw new Error(`Unsafe table name ${key}`);
      const text = JSON.stringify(table, null, 2) + '\n';
      fs.writeFileSync(path.join(directory, `${key}.json`), text);
      scanSensitive(table, `${name}/${key}.json`);
      tables.push({ name: key, shape: Array.isArray(table) ? 'array' : typeof table, entries: table && typeof table === 'object' ? Object.keys(table).length : null, bytes: Buffer.byteLength(text), sha256: sha256(text) });
    }
    summary.inputs.push({ name, sourceBytes: data.length, sourceSha256: sha256(data), tables });
  }
  fs.writeFileSync(path.join(outputRoot, 'index.json'), JSON.stringify(summary, null, 2) + '\n');
  fs.writeFileSync(path.join(outputRoot, 'sensitive-keys.json'), JSON.stringify(sensitiveKeys, null, 2) + '\n');
  return summary.inputs.map(input => ({ name: input.name, tables: input.tables.length, jsonBytes: input.tables.reduce((total, table) => total + table.bytes, 0) }));
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [root = path.resolve('recovered'), output] = process.argv.slice(2);
  console.log(JSON.stringify(extractConfig(path.resolve(root), output && path.resolve(output)), null, 2));
}
