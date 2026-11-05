import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import net from 'node:net';
import http from 'node:http';
import crypto from 'node:crypto';
import { spawn } from 'node:child_process';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { ITEM_RULES } from '../tailor/data.js';
import { ITEMS, CHARACTERS, getItemContent } from '../tailor/content.js';

const root = path.resolve(import.meta.dirname, '..');
const run = promisify(execFile);
let child, origin;

before(async () => {
  const reservation = net.createServer();
  await new Promise((resolve, reject) => {
    reservation.once('error', reject);
    reservation.listen(0, '127.0.0.1', resolve);
  });
  const port = reservation.address().port;
  await new Promise(resolve => reservation.close(resolve));
  origin = `http://127.0.0.1:${port}`;
  child = spawn(process.execPath, ['tools/original-server.mjs'], {
    cwd: root, env: { ...process.env, ORIGINAL_PORT: String(port) },
    windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'],
  });
  await new Promise((resolve, reject) => {
    let log = '';
    const timer = setTimeout(() => reject(new Error('Local server startup timed out')), 15000);
    child.once('error', error => { clearTimeout(timer); reject(error); });
    child.once('exit', code => { clearTimeout(timer); reject(new Error(`Local server exited ${code}: ${log}`)); });
    child.stderr.on('data', chunk => { log += chunk; });
    child.stdout.on('data', chunk => {
      log += chunk;
      if (log.includes('Local game server ready:')) { clearTimeout(timer); resolve(); }
    });
  });
});

after(async () => {
  if (child && child.exitCode === null) {
    const exited = new Promise(resolve => child.once('exit', resolve));
    child.kill();
    await exited;
  }
});

test('default entry serves the actual tailoring game while the recovered original remains separately reachable', async () => {
  const metadataResponse = await fetch(origin + '/__app');
  assert.equal(metadataResponse.status, 200);
  assert.deepEqual(await metadataResponse.json(), {
    application: 'jianghu-bufang', version: 1, entry: '/', originalEntry: '/original/',
  });
  const expected = fs.readFileSync(path.join(root, 'tailor/index.html'), 'utf8');
  assert.match(expected, /江湖布坊/);
  for (const route of ['/', '/tailor', '/tailor/']) {
    const response = await fetch(origin + route);
    assert.equal(response.status, 200, route);
    assert.equal(await response.text(), expected, route);
    assert.match(response.headers.get('content-security-policy'), /connect-src 'self'(?:;|$)/);
    assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
  }
  assert.doesNotMatch(expected, /\/original\/bootstrap\.js/);
  assert.doesNotMatch(expected, /<(?:script|img|link)[^>]*(?:src|href)=["']https?:/i);
  const original = fs.readFileSync(path.join(root, 'original/index.html'), 'utf8');
  for (const route of ['/original', '/original/']) {
    const response = await fetch(origin + route);
    assert.equal(response.status, 200, route);
    assert.equal(await response.text(), original, route);
  }
});

test('theme scripts, styles and artwork are served as local files with usable MIME types', async () => {
  const html = fs.readFileSync(path.join(root, 'tailor/index.html'), 'utf8');
  const entries = [...html.matchAll(/(?:src|href)=["'](\/tailor\/[^"'#?]+)["']/g)].map(match => match[1]);
  assert.ok(entries.some(entry => entry.endsWith('.js')), 'Expected the local game module in the real entry');
  assert.ok(entries.some(entry => entry.endsWith('.css')), 'Expected the local theme stylesheet in the real entry');
  for (const entry of [...new Set(entries)]) {
    const response = await fetch(origin + entry);
    assert.equal(response.status, 200, entry);
    const bytes = Buffer.from(await response.arrayBuffer());
    assert.deepEqual(bytes, fs.readFileSync(path.join(root, entry.slice(1))), entry);
    if (entry.endsWith('.js')) assert.match(response.headers.get('content-type'), /^application\/javascript/);
    if (entry.endsWith('.css')) assert.match(response.headers.get('content-type'), /^text\/css/);
  }
  const pending = [path.join(root, 'tailor')];
  const artwork = [];
  while (pending.length) {
    const folder = pending.pop();
    for (const entry of fs.readdirSync(folder, { withFileTypes: true })) {
      const target = path.join(folder, entry.name);
      if (entry.isDirectory()) pending.push(target);
      else if (/\.(?:png|jpe?g|webp|svg)$/.test(entry.name)) artwork.push(target);
    }
  }
  assert.ok(artwork.length > 0, 'Expected actual theme artwork rather than a source-only entry');
  for (const target of artwork) {
    const route = '/' + path.relative(root, target).replaceAll('\\', '/');
    const response = await fetch(origin + route);
    assert.equal(response.status, 200, route);
    assert.match(response.headers.get('content-type'), /^image\//, route);
    assert.equal((await response.arrayBuffer()).byteLength, fs.statSync(target).size, route);
  }
});

test('generated chibi artwork records its real tool, reference, prompts, dimensions and original bytes', async () => {
  const response = await fetch(origin + '/tailor/assets/sources.json');
  assert.equal(response.status, 200);
  const manifest = await response.json();
  assert.equal(manifest.version, 2);
  assert.equal(manifest.source, 'built-in image_gen');
  assert.equal(manifest.reference, 'user-provided chibi screenshot');
  assert.match(manifest.referenceSha256, /^[a-f0-9]{64}$/);
  assert.equal(manifest.promptDocument, 'docs/TAILOR_ART_PROMPTS.md');
  assert.ok(fs.statSync(path.join(root, manifest.promptDocument)).size > 1000, 'The complete prompts must be recorded');
  assert.ok(manifest.assets.some(asset => asset.role === 'scene'));
  assert.ok(manifest.assets.some(asset => asset.role === 'characterAtlas'));
  assert.ok(manifest.assets.some(asset => asset.role === 'itemAtlas'));
  const actualArt = fs.readdirSync(path.join(root, 'tailor/assets/chibi')).filter(name => /\.png$/.test(name)).sort();
  assert.deepEqual(manifest.assets.map(asset => path.basename(asset.file)).sort(), actualArt);
  for (const asset of manifest.assets) {
    assert.ok(asset.title && asset.role, asset.file);
    assert.equal(asset.source, 'built-in image_gen');
    assert.equal(asset.tool, 'built-in image_gen');
    assert.equal(asset.reference, 'user-provided chibi screenshot');
    assert.equal(asset.referenceSha256, manifest.referenceSha256);
    assert.equal(asset.promptDocument, manifest.promptDocument);
    assert.equal(asset.transform, 'none');
    assert.notEqual(asset.official, true, 'New generated art must not be presented as an official original sprite');
    assert.match(asset.src, /^\/tailor\/assets\/chibi\//);
    const bytes = fs.readFileSync(path.join(root, asset.file));
    assert.deepEqual([...bytes.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10], asset.file);
    assert.deepEqual(asset.originalDimensions, { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) }, asset.file);
    assert.equal(asset.bytes, bytes.length, asset.file);
    assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'), asset.sha256, asset.file);
    const served = await fetch(origin + asset.src);
    assert.equal(served.status, 200, asset.src);
    assert.deepEqual(Buffer.from(await served.arrayBuffer()), bytes, asset.src);
  }
});

test('chibi atlas mappings cover every gameplay item and character with valid sprite indices and local assets', async () => {
  const response = await fetch(origin + '/tailor/assets/visuals.json');
  assert.equal(response.status, 200);
  const visuals = await response.json();
  assert.equal(visuals.version, 2);
  const checkAtlas = (atlas, columns, rows) => {
    assert.equal(atlas.columns, columns);
    assert.equal(atlas.rows, rows);
    assert.match(atlas.src, /^\/tailor\/assets\/chibi\//);
    const bytes = fs.readFileSync(path.join(root, atlas.src.slice(1)));
    assert.equal(bytes.readUInt32BE(16) % columns, 0, 'Atlas tile widths must divide evenly');
    assert.equal(bytes.readUInt32BE(20) % rows, 0, 'Atlas tile heights must divide evenly');
    return columns * rows;
  };
  const itemCount = checkAtlas(visuals.itemAtlas, 6, 6);
  const characterCount = checkAtlas(visuals.characterAtlas, 3, 2);
  const validIndex = (index, count, label) => assert.ok(Number.isSafeInteger(index) && index >= 0 && index < count, `${label}: invalid sprite ${index}`);
  for (const [family, indices] of Object.entries(visuals.itemSprites)) {
    assert.ok(Array.isArray(indices) && indices.length > 0, family);
    indices.forEach(index => validIndex(index, itemCount, family));
  }
  for (const [id, index] of Object.entries(visuals.itemOverrides)) {
    assert.ok(Object.hasOwn(ITEM_RULES, id), `Override refers to unknown item ${id}`);
    validIndex(index, itemCount, id);
  }
  const ids = Object.keys(ITEM_RULES);
  assert.equal(ids.length, 391, 'Verify the complete recovered gameplay item set');
  for (const id of ids) {
    assert.ok(Object.hasOwn(ITEMS, id), `Item ${id} needs explicit theme content`);
    const item = getItemContent(id);
    const family = visuals.itemSprites[item.iconKey];
    assert.ok(Array.isArray(family) && family.length > 0, `Item ${id} has unmapped family ${item.iconKey}`);
    assert.ok(Number.isSafeInteger(item.rank) && item.rank >= 1, id);
    const index = visuals.itemOverrides[id] ?? family[Math.min(item.rank - 1, family.length - 1)];
    validIndex(index, itemCount, `${id}/${item.iconKey}`);
  }
  Object.entries(visuals.characterSprites).forEach(([id, index]) => {
    assert.ok(Object.hasOwn(CHARACTERS, id), `Unknown character ${id}`);
    validIndex(index, characterCount, id);
  });
  for (const [id, character] of Object.entries(CHARACTERS)) {
    if (character.portrait !== null) assert.ok(Object.hasOwn(visuals.characterSprites, id), `Missing portrait for ${id}`);
  }
  assert.equal(visuals.characters.length, characterCount);
  visuals.characters.forEach(character => {
    assert.ok(character.label);
    validIndex(character.sprite, characterCount, character.label);
    assert.ok(Number.isSafeInteger(character.unlockBuilds) && character.unlockBuilds >= 0);
  });
  assert.equal(new Set(visuals.characters.map(character => character.sprite)).size, characterCount);
  const localPaths = new Set();
  const visit = value => {
    if (Array.isArray(value)) return value.forEach(visit);
    if (value && typeof value === 'object') return Object.values(value).forEach(visit);
    if (typeof value === 'string' && value.startsWith('/')) localPaths.add(value);
  };
  visit(visuals);
  assert.ok(localPaths.has(visuals.scene) && localPaths.has(visuals.nightScene));
  for (const route of localPaths) {
    assert.match(route, /^\/tailor\/assets\/chibi\//);
    const served = await fetch(origin + route);
    assert.equal(served.status, 200, route);
    assert.match(served.headers.get('content-type'), /^image\/png/);
    assert.deepEqual(Buffer.from(await served.arrayBuffer()), fs.readFileSync(path.join(root, route.slice(1))), route);
  }
  for (const retired of ['/tailor/assets/nsh/scene-courtyard.jpg', '/tailor/assets/craft/blue-folded-silk.png']) {
    assert.equal((await fetch(origin + retired)).status, 404, retired);
  }
});

test('theme routes do not disclose private files or turn into an arbitrary filesystem proxy', async () => {
  const probes = [
    '/tailor/.env', '/tailor/.git/config', '/tailor/%2e%2e%2f.local-originals/game.js',
    '/tailor/%2e%2e%5c.scratch/audit-upload.mjs', '/tailor/%2e%2e%2fpackage.json',
    '/tailor/absent-artwork.png', '/.local-originals/game.js', '/.git/config',
  ];
  for (const route of probes) {
    const response = await fetch(origin + route, { redirect: 'manual' });
    assert.equal(response.status, 404, route);
    assert.equal(response.headers.get('location'), null);
  }
});

test('launcher refuses an old or unrelated server instead of silently reopening the original game', async context => {
  const other = http.createServer((request, response) => {
    response.writeHead(request.url === '/__app' ? 404 : 200, { 'Content-Type': 'text/html' });
    response.end('old local application');
  });
  await new Promise(resolve => other.listen(0, '127.0.0.1', resolve));
  context.after(() => new Promise(resolve => other.close(resolve)));
  const port = other.address().port;
  await assert.rejects(run(process.execPath, ['tools/launch-original.mjs', '--no-open'], {
    cwd: root, env: { ...process.env, ORIGINAL_PORT: String(port) },
    windowsHide: true, timeout: 5000,
  }), error => error.code === 1 && /旧版游戏或其它服务/.test(error.stderr));
  assert.equal((await fetch(`http://127.0.0.1:${port}/`)).status, 200, 'The launcher must not kill an unrecognized service');
});

test('launcher can reuse the identified tailoring service without opening another browser during checks', async context => {
  const existing = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': request.url === '/__app' ? 'application/json' : 'text/html' });
    response.end(request.url === '/__app' ? JSON.stringify({ application: 'jianghu-bufang' }) : '<title>江湖布坊</title>');
  });
  await new Promise(resolve => existing.listen(0, '127.0.0.1', resolve));
  context.after(() => new Promise(resolve => existing.close(resolve)));
  const port = existing.address().port;
  const result = await run(process.execPath, ['tools/launch-original.mjs', '--no-open'], {
    cwd: root, env: { ...process.env, ORIGINAL_PORT: String(port) },
    windowsHide: true, timeout: 5000,
  });
  assert.match(result.stdout, new RegExp('江湖布坊：http://127\\.0\\.0\\.1:' + port + '/'));
  assert.doesNotMatch(result.stdout, /Local game server ready:/, 'An identified running service should be reused');
});
