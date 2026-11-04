import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

// Offline export only. Never reads account storage or executes recovered code.
export const APP_ID = 'wxc8713839351ccb45';
const HOST = 'gj-fejsf-res.hortorgames.com';
const digest = data => crypto.createHash('sha256').update(data).digest('hex');

function safePath(root, relative) {
  if (typeof relative !== 'string' || !relative || relative.includes('\0')) throw new Error('Invalid path');
  const clean = relative.replaceAll('\\', '/').replace(/^\/+/, '');
  if (clean.split('/').some(part => part === '..' || part.includes(':'))) throw new Error(`Unsafe path: ${relative}`);
  const output = path.resolve(root, clean);
  if (!output.startsWith(path.resolve(root) + path.sep)) throw new Error(`Path escapes destination: ${relative}`);
  return output;
}

export function decryptPackage(input, appId = APP_ID) {
  if (input[0] === 0xbe) return input;
  if (input.subarray(0, 6).toString('ascii') !== 'V1MMWX') throw new Error('Unsupported package header');
  if (input.length < 1030) throw new Error('Truncated encrypted package');
  const key = crypto.pbkdf2Sync(appId, 'saltiest', 1000, 32, 'sha1');
  const cipher = crypto.createDecipheriv('aes-256-cbc', key, Buffer.from('the iv: 16 bytes'));
  cipher.setAutoPadding(false);
  const prefix = Buffer.concat([cipher.update(input.subarray(6, 1030)), cipher.final()]).subarray(0, 1023);
  const rest = Buffer.from(input.subarray(1030));
  const xor = appId.charCodeAt(appId.length - 2);
  for (let i = 0; i < rest.length; i++) rest[i] ^= xor;
  const result = Buffer.concat([prefix, rest]);
  if (result[0] !== 0xbe || result[13] !== 0xed) throw new Error('Decryption did not produce a valid package');
  return result;
}

export function parsePackage(bytes) {
  if (bytes.length < 18 || bytes[0] !== 0xbe || bytes[13] !== 0xed) throw new Error('Invalid wxapkg header');
  const indexLength = bytes.readUInt32BE(5);
  const bodyLength = bytes.readUInt32BE(9);
  const count = bytes.readUInt32BE(14);
  if (indexLength + bodyLength + 14 !== bytes.length || count > 100000) throw new Error('Invalid wxapkg lengths');
  const indexEnd = 14 + indexLength;
  let cursor = 18;
  const entries = [];
  const names = new Set();
  function uint() {
    if (cursor + 4 > indexEnd) throw new Error('Truncated package index');
    const value = bytes.readUInt32BE(cursor); cursor += 4; return value;
  }
  for (let i = 0; i < count; i++) {
    const length = uint();
    if (!length || length > 65536 || cursor + length + 8 > indexEnd) throw new Error('Invalid filename length');
    const name = bytes.subarray(cursor, cursor + length).toString('utf8'); cursor += length;
    const offset = uint(), size = uint();
    if (offset < indexEnd || offset + size > bytes.length || names.has(name.toLowerCase())) throw new Error(`Invalid file entry ${name}`);
    names.add(name.toLowerCase());
    entries.push({ name, data: bytes.subarray(offset, offset + size) });
  }
  if (cursor !== indexEnd) throw new Error('Package index size mismatch');
  return entries;
}

export function exportCache(appletRoot, destination) {
  const packageRoot = path.join(appletRoot, 'packages', APP_ID);
  const cacheRoot = path.join(appletRoot, 'local', APP_ID, 'usr', 'gamecaches');
  const manifest = { appId: APP_ID, exportedAt: new Date().toISOString(), note: 'Compiled client packages and downloaded game resources; not an editor project or server source.', packages: [], remote: [], skipped: [] };
  fs.mkdirSync(destination, { recursive: true });
  for (const version of fs.readdirSync(packageRoot, { withFileTypes: true }).filter(e => e.isDirectory())) {
    if (!/^\d+$/.test(version.name)) continue;
    const versionPath = path.join(packageRoot, version.name);
    for (const file of fs.readdirSync(versionPath).filter(name => name.endsWith('.wxapkg'))) {
      const source = fs.readFileSync(path.join(versionPath, file));
      const entries = parsePackage(decryptPackage(source));
      const stem = file.slice(0, -7);
      const root = safePath(destination, `packages/${version.name}/${stem}`);
      const info = { version: version.name, name: file, bytes: source.length, sha256: digest(source), files: [] };
      for (const entry of entries) {
        const output = safePath(root, entry.name);
        fs.mkdirSync(path.dirname(output), { recursive: true });
        fs.writeFileSync(output, entry.data);
        info.files.push({ path: path.relative(destination, output).replaceAll('\\', '/'), bytes: entry.data.length, sha256: digest(entry.data) });
      }
      manifest.packages.push(info);
    }
  }
  const listing = JSON.parse(fs.readFileSync(path.join(cacheRoot, 'cacheList.json'), 'utf8'));
  const written = new Map();
  for (const [original, record] of Object.entries(listing.files ?? {})) {
    let url;
    try { url = new URL(original); } catch { manifest.skipped.push({ reason: 'Invalid resource URL' }); continue; }
    if (url.protocol !== 'https:' || url.hostname !== HOST) { manifest.skipped.push({ host: url.hostname, reason: 'Outside confirmed game asset host' }); continue; }
    if (!record.url?.startsWith('wxfile://usr/gamecaches/')) { manifest.skipped.push({ path: url.pathname, reason: 'Outside game resource cache' }); continue; }
    const source = safePath(cacheRoot, record.url.slice('wxfile://usr/gamecaches/'.length));
    if (!fs.existsSync(source)) { manifest.skipped.push({ path: url.pathname, reason: 'Cache entry missing on disk' }); continue; }
    const bytes = fs.readFileSync(source), sha256 = digest(bytes);
    let relative = `remote/${decodeURIComponent(url.pathname).replace(/^\/+/, '')}`;
    if (written.has(relative) && written.get(relative) !== sha256) relative += `.${sha256.slice(0, 12)}`;
    const output = safePath(destination, relative);
    fs.mkdirSync(path.dirname(output), { recursive: true });
    fs.writeFileSync(output, bytes);
    written.set(relative, sha256);
    manifest.remote.push({ path: relative, bytes: bytes.length, sha256, sourcePath: url.pathname });
  }
  fs.writeFileSync(path.join(destination, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
  return { packages: manifest.packages.length, packageFiles: manifest.packages.reduce((n, p) => n + p.files.length, 0), remoteFiles: manifest.remote.length, remoteBytes: manifest.remote.reduce((n, p) => n + p.bytes, 0), skipped: manifest.skipped.length };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [appletRoot, output = path.resolve('recovered')] = process.argv.slice(2);
  if (!appletRoot) { console.error('Usage: node tools/export-cache.mjs <applet-root> [output-directory]'); process.exitCode = 1; }
  else console.log(JSON.stringify(exportCache(path.resolve(appletRoot), path.resolve(output)), null, 2));
}
