import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { parse } from 'acorn';
import { APP_ID, decryptPackage, parsePackage } from './export-cache.mjs';
import { rebuildClient } from './rebuild-client.mjs';
import { decodeBon } from './extract-config.mjs';

// Reads only this game's package directory and its public resource cache.
// A reference snapshot never writes to the active recovered/client trees.
const [appletRootArg, version = '402', destinationArg = 'recovered/reference623', mode] = process.argv.slice(2);
if (!appletRootArg || !/^\d+$/.test(version)) throw new Error('Usage: node tools/recover-reference-cache.mjs <applet-root> <version> <new-snapshot-directory>');
const appletRoot = path.resolve(appletRootArg), destination = path.resolve(destinationArg);
if (fs.existsSync(destination)) {
  const prior = mode === '--resume' && JSON.parse(fs.readFileSync(path.join(destination, 'manifest.json'), 'utf8'));
  if (!prior || prior.appId !== APP_ID || prior.version !== version) throw new Error('Snapshot destination already exists; --resume requires a matching isolated reference manifest');
}
const packageRoot = path.join(appletRoot, 'packages', APP_ID, version);
const cacheRoot = path.join(appletRoot, 'local', APP_ID, 'usr', 'gamecaches');
const sha = data => crypto.createHash('sha256').update(data).digest('hex');
const slash = text => text.replaceAll('\\', '/');
function safe(base, relative) {
  const clean = slash(relative).replace(/^\/+/, '');
  if (!clean || clean.includes('\0') || clean.split('/').some(part => part === '..' || part.includes(':'))) throw new Error('Unsafe resource path');
  const target = path.resolve(base, clean);
  if (!target.startsWith(path.resolve(base) + path.sep)) throw new Error('Resource path outside snapshot');
  return target;
}
function sanitize(bytes) {
  const source = bytes.toString('utf8'), ast = parse(source, { ecmaVersion: 'latest', sourceType: 'script' });
  const pending = [ast], ranges = [];
  while (pending.length) {
    const node = pending.pop();
    let key, value;
    if (node.type === 'AssignmentExpression' && node.left.type === 'MemberExpression') { key = node.left.property.name ?? node.left.property.value; value = node.right; }
    else if (node.type === 'Property') { key = node.key.name ?? node.key.value; value = node.value; }
    if (key === 'wxAdSecretKey' && value?.type === 'Literal' && typeof value.value === 'string' && value.value && !value.value.startsWith('REDACTED_')) ranges.push({ start: value.start, end: value.end, length: value.value.length });
    for (const item of Object.values(node)) {
      if (Array.isArray(item)) for (const child of item) if (child?.type) pending.push(child);
      if (item?.type) pending.push(item);
    }
  }
  let text = source;
  for (const range of ranges.sort((a, b) => b.start - a.start)) {
    const replacement = JSON.stringify('REDACTED_FOR_REPOSITORY'.padEnd(range.length, '_').slice(0, range.length));
    if (replacement.length !== range.end - range.start) throw new Error('Unexpected secret literal length');
    text = text.slice(0, range.start) + replacement + text.slice(range.end);
  }
  return { bytes: Buffer.from(text), fields: ranges.length ? ['wxAdSecretKey'] : [] };
}
const manifest = { appId: APP_ID, version, exportedAt: new Date().toISOString(), note: 'Independent game-only reference snapshot. Cached package bytes decoded statically; bundled SDK secret redacted before writing. No account state read.', packages: [], remote: [], skipped: [] };
function write(relative, bytes) {
  const target = safe(destination, relative);
  fs.mkdirSync(path.dirname(target), { recursive: true }); fs.writeFileSync(target, bytes);
  return { path: relative, bytes: bytes.length, sha256: sha(bytes) };
}
for (const name of fs.readdirSync(packageRoot).filter(name => name.endsWith('.wxapkg'))) {
  const source = fs.readFileSync(path.join(packageRoot, name));
  const info = { version, name, bytes: source.length, sha256: sha(source), files: [] };
  for (const entry of parsePackage(decryptPackage(source))) {
    const sanitized = entry.name.endsWith('.js') ? sanitize(entry.data) : { bytes: entry.data, fields: [] };
    if (sanitized.fields.length) {
      const backup = safe(path.resolve('.local-originals', path.basename(destination)), `packages/${version}/${name.slice(0, -7)}/${entry.name.replace(/^\/+/, '')}`);
      fs.mkdirSync(path.dirname(backup), { recursive: true });
      try { fs.writeFileSync(backup, entry.data, { flag: 'wx' }); } catch (error) { if (error.code !== 'EEXIST') throw error; }
    }
    const saved = write(`packages/${version}/${name.slice(0, -7)}/${entry.name.replace(/^\/+/, '')}`, sanitized.bytes);
    if (sanitized.fields.length) Object.assign(saved, { originalSha256: sha(entry.data), sanitizedFields: sanitized.fields });
    info.files.push(saved);
  }
  manifest.packages.push(info);
}
const listing = JSON.parse(fs.readFileSync(path.join(cacheRoot, 'cacheList.json'), 'utf8'));
for (const [original, entry] of Object.entries(listing.files ?? {})) {
  let url;
  try { url = new URL(original); } catch { continue; }
  if (url.protocol !== 'https:' || url.hostname !== 'gj-fejsf-res.hortorgames.com' || !entry.url?.startsWith('wxfile://usr/gamecaches/')) continue;
  const source = safe(cacheRoot, entry.url.slice('wxfile://usr/gamecaches/'.length));
  if (!fs.existsSync(source)) { manifest.skipped.push({ path: url.pathname, reason: 'Missing cached file' }); continue; }
  const bytes = fs.readFileSync(source), relative = `remote/${decodeURIComponent(url.pathname).replace(/^\/+/, '')}`;
  manifest.remote.push({ ...write(relative, bytes), sourcePath: url.pathname });
}
write('manifest.json', Buffer.from(JSON.stringify(manifest, null, 2) + '\n'));
const client = rebuildClient(path.join(destination, 'packages'), path.join(destination, 'client'));
// The legacy remoteRes/config URL can remain cached after an update. Resolve the
// exact current Config/Config and Config/Lang native versions from bundle metadata.
const settingsAst = parse(fs.readFileSync(path.join(destination, 'client/src/settings.js'), 'utf8'), { ecmaVersion: 'latest' });
const settingsObject = settingsAst.body.find(statement => statement.expression?.type === 'AssignmentExpression')?.expression.right;
const versionsObject = settingsObject?.properties.find(property => property.key.name === 'bundleVers')?.value;
if (!versionsObject || versionsObject.type !== 'ObjectExpression') throw new Error('Missing static bundle versions');
const versions = Object.fromEntries(versionsObject.properties.map(property => [property.key.name ?? property.key.value, property.value.value]));
function canonicalUuid(value) {
  if (value.length !== 22) return value;
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  let hex = value.slice(0, 2);
  for (let index = 2; index < value.length; index += 2) hex += ((alphabet.indexOf(value[index]) << 6) | alphabet.indexOf(value[index + 1])).toString(16).padStart(3, '0');
  return `${hex.slice(0,8)}-${hex.slice(8,12)}-${hex.slice(12,16)}-${hex.slice(16,20)}-${hex.slice(20)}`;
}
const configIndex = { format: 'BON', decoder: 'Independent parser; current package settings select exact bundle Config/Config and Config/Lang versions.', inputs: [] };
for (const [name, bundle, assetPath] of [['Config', 'gameAsset', 'Config/Config'], ['Lang_zh', 'zh', 'Config/Lang']]) {
  const bundleConfig = JSON.parse(fs.readFileSync(path.join(destination, `remote/asset/remote/${bundle}/config.${versions[bundle]}.json`), 'utf8'));
  const [id] = Object.entries(bundleConfig.paths).find(([, asset]) => asset[0] === assetPath && bundleConfig.types[asset[1]] === 'cc.BufferAsset') ?? [];
  if (!id) throw new Error(`Missing ${bundle}/${assetPath} declaration`);
  const natives = bundleConfig.versions.native, at = natives.findIndex((value, index) => index % 2 === 0 && String(value) === id);
  if (at < 0) throw new Error('Missing native version');
  const uuid = canonicalUuid(bundleConfig.uuids[id]), relative = `remote/asset/remote/${bundle}/native/${uuid.slice(0,2)}/${uuid}.${natives[at + 1]}.bin`;
  const bytes = fs.readFileSync(safe(destination, relative)), decoded = decodeBon(bytes), tables = [];
  for (const [key, value] of Object.entries(decoded)) {
    if (!/^[a-zA-Z0-9_-]+$/.test(key)) throw new Error('Unsafe config table name');
    const text = Buffer.from(JSON.stringify(value, null, 2) + '\n');
    write(`config/${name}/${key}.json`, text);
    tables.push({ name: key, shape: Array.isArray(value) ? 'array' : typeof value, entries: value && typeof value === 'object' ? Object.keys(value).length : null, bytes: text.length, sha256: sha(text) });
  }
  configIndex.inputs.push({ name, source: relative, bundleVersion: versions[bundle], sourceBytes: bytes.length, sourceSha256: sha(bytes), tables });
}
write('config/index.json', Buffer.from(JSON.stringify(configIndex, null, 2) + '\n'));
const config = configIndex.inputs.map(input => ({ name: input.name, source: input.source, tables: input.tables.length, sourceSha256: input.sourceSha256 }));
console.log(JSON.stringify({ version, packages: manifest.packages.map(pack => ({ name: pack.name, bytes: pack.bytes, files: pack.files.length })), remoteFiles: manifest.remote.length, remoteBytes: manifest.remote.reduce((total, file) => total + file.bytes, 0), skipped: manifest.skipped.length, client, config }, null, 2));
