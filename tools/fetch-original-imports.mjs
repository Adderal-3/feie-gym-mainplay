import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
const root = path.resolve(import.meta.dirname, '..');
const graph = JSON.parse(await fs.readFile(path.join(root, 'docs/original-mainplay-dependencies.json'), 'utf8'));
const manifestPath = path.join(root, 'recovered/downloads/manifest.json');
const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
const planned = new Map();
for (const asset of graph.assets.filter(asset => !asset.hasSection)) {
  const config = JSON.parse(await fs.readFile(path.join(root, asset.config), 'utf8'));
  if (!['gameAsset', 'remoteAsset', 'spineAsset', 'zh', 'remoteBoardAsset', 'remoteCollectionAsset'].includes(config.name)) throw new Error('Unexpected bundle');
  const pack = Object.entries(config.packs ?? {}).find(([, indexes]) => indexes.some(index => String(index) === String(asset.index)))?.[0];
  const key = pack ?? asset.index, stem = pack ?? asset.uuid;
  const versions = config.versions.import;
  const at = versions.findIndex((value, index) => index % 2 === 0 && String(value) === String(key));
  const version = versions[at + 1];
  if (at < 0 || !/^[a-f0-9-]+$/.test(String(stem)) || !/^[a-f0-9]+$/.test(version)) throw new Error('Missing exact import version');
  const relative = `asset/remote/${config.name}/import/${String(stem).slice(0, 2)}/${stem}.${version}.json`;
  planned.set(relative, { bundle: config.name, stem, version, relative });
}
let bytes = 0;
for (const asset of planned.values()) {
  const target = path.join(root, 'recovered/downloads', asset.relative);
  let data, status;
  try { data = await fs.readFile(target); status = 'reused'; } catch (error) { if (error.code !== 'ENOENT') throw error; }
  const url = `https://gj-fejsf-res.hortorgames.com/${asset.relative}`;
  if (!data) {
    const response = await fetch(url, { signal: AbortSignal.timeout(30000), redirect: 'error' });
    if (!response.ok) throw new Error(`Original import ${response.status}: ${asset.relative}`);
    data = Buffer.from(await response.arrayBuffer()); status = 'downloaded';
    bytes += data.length;
    if (data.length > 20 * 1024 * 1024 || bytes > 32 * 1024 * 1024) throw new Error('Import download limit');
    JSON.parse(data.toString('utf8'));
    await fs.mkdir(path.dirname(target), { recursive: true }); await fs.writeFile(target, data);
  }
  const entry = { bundle: asset.bundle, textureUuid: `import:${asset.stem}`, version: asset.version, type: 'bundleImport', url, path: asset.relative, bytes: data.length, sha256: crypto.createHash('sha256').update(data).digest('hex'), status, scope: 'Exact original metadata import for selected story/mainplay dependency' };
  const at = manifest.files.findIndex(file => file.path === asset.relative);
  if (at < 0) manifest.files.push(entry); else manifest.files[at] = entry;
}
manifest.transferredBytes = manifest.files.reduce((total, file) => total + (file.bytes || 0), 0);
manifest.downloaded = manifest.files.filter(file => file.status === 'downloaded').length;
await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
console.log(JSON.stringify({ imports: planned.size, bytes, paths: [...planned.keys()] }, null, 2));
