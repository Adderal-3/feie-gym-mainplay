import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import net from 'node:net';
import crypto from 'node:crypto';
import { spawn } from 'node:child_process';

const root = path.resolve(import.meta.dirname, '..');
const runtimeLayout = JSON.parse(fs.readFileSync(path.join(root, 'original/runtime-layout.json'), 'utf8'));
const runtimeClient = runtimeLayout.source.replace(/\/subpackages\/main\/game\.js$/, '');
const hash = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
let child, origin;

before(async () => {
  const reservation = net.createServer();
  await new Promise((resolve, reject) => { reservation.once('error', reject); reservation.listen(0, '127.0.0.1', resolve); });
  const port = reservation.address().port;
  await new Promise(resolve => reservation.close(resolve));
  origin = `http://127.0.0.1:${port}`;
  child = spawn(process.execPath, ['tools/original-server.mjs'], {
    cwd: root, env: { ...process.env, ORIGINAL_PORT: String(port) },
    windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'],
  });
  await new Promise((resolve, reject) => {
    let log = '';
    const timer = setTimeout(() => reject(new Error('Original server startup timed out')), 15000);
    child.once('error', error => { clearTimeout(timer); reject(error); });
    child.once('exit', code => { clearTimeout(timer); reject(new Error(`Original server exited ${code}: ${log}`)); });
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

test('original entry and scripts are local and enforce a self-only connection policy', async () => {
  const entry = await fetch(origin + '/original/');
  assert.equal(entry.status, 200);
  assert.match(entry.headers.get('content-security-policy'), /connect-src 'self'(?:;|$)/);
  assert.match(entry.headers.get('content-security-policy'), /script-src 'self'/);
  assert.equal(entry.headers.get('x-content-type-options'), 'nosniff');
  const html = await entry.text();
  assert.match(html, /src="\/original\/bootstrap\.js"/);
  assert.doesNotMatch(html, /<(?:script|img|link)[^>]*(?:src|href)=["']https?:/i);
  assert.match(html, /750\s*\/\s*1334/);
  const engine = await fetch(origin + '/client/cocos/cocos2d-js-min.js');
  assert.equal(engine.status, 200);
  assert.match(engine.headers.get('content-type'), /^application\/javascript/);
  assert.equal(hash(Buffer.from(await engine.arrayBuffer())), hash(fs.readFileSync(path.join(root, runtimeClient, 'cocos/cocos2d-js-min.js'))));
});

test('bridge instrumentation retains the complete recovered client source', async () => {
  const response = await fetch(origin + '/original/instrumented-game.js');
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type'), /^application\/javascript/);
  const body = await response.text();
  const startMarker = '\n;window.__ORIGINAL__={';
  const endMarker = 'window.OriginalGameBridge=window.__ORIGINAL__;\n';
  const start = body.lastIndexOf(startMarker), end = body.indexOf(endMarker, start);
  assert.ok(start > 1_000_000 && end > start, 'Expected exactly one original-closure bridge');
  const recovered = body.slice(0, start) + body.slice(end + endMarker.length);
  const source = fs.readFileSync(path.join(root, runtimeLayout.source), 'utf8');
  assert.equal(hash(recovered), hash(source), 'Compatibility server must not rewrite original gameplay code');
  const layout = JSON.parse(fs.readFileSync(path.join(root, 'original/runtime-layout.json'), 'utf8'));
  assert.equal(layout.sha256, hash(source));
  assert.equal(layout.utf16Length, source.length);
  assert.equal(layout.insertionOffset, start);
  for (const symbol of ['GW', 'G2', 'TJ', 'Xo', 'C4', 'We', 'W3', 'Z7', 'Q7', 'oee', 'GZ', 'wl', 'rl']) assert.ok(body.slice(start,end).includes(JSON.stringify(symbol) + ':'), `Missing original bridge symbol ${symbol}`);
});

test('active story runtime serves the reference 6.2.3 configuration instead of the stale cache alias', async () => {
  assert.equal(runtimeClient, 'recovered/reference623/client');
  for (const [url, file] of [
    ['/remoteRes/config/Config.bin', 'asset/remote/gameAsset/native/0d/0d71221c-449b-4034-8b65-aef3e6d362bd.2a9aa.bin'],
    ['/remoteRes/config/Lang_zh.bin', 'asset/remote/zh/native/a2/a201d065-b4d0-49ba-a559-4ec556a42dc3.67faf.bin'],
  ]) {
    const response = await fetch(origin + url);
    assert.equal(response.status, 200);
    const expected = fs.readFileSync(path.join(root, 'recovered/reference623/remote', file));
    assert.equal(hash(Buffer.from(await response.arrayBuffer())), hash(expected), url);
  }
});

test('playable server has no third-party runtime imports', () => {
  const source = fs.readFileSync(path.join(root, 'tools/original-server.mjs'), 'utf8');
  const imports = [...source.matchAll(/^import\s.+?from\s+['"]([^'"]+)['"]/gm)].map(match => match[1]);
  assert.ok(imports.length >= 3);
  assert.ok(imports.every(name => name.startsWith('node:')), 'Playable startup must work without npm ci or registry access');
});

test('cross-bundle native alias uses the known original white texture PNG and its manifest hash', async () => {
  const basename = 'e098cfe6-b613-42bd-bab3-77ec15904646.ea180.png';
  const manifest = JSON.parse(fs.readFileSync(path.join(root, 'recovered/previews/textures.json'), 'utf8'));
  const expected = manifest.files.find(entry => path.basename(entry.png) === basename);
  assert.ok(expected, 'Expected original package-owned white texture');
  assert.match(expected.png, /packages\/401\/_subpackages_main_/);
  const response = await fetch(origin + '/decoded/assets/gameAsset/native/e0/' + basename.replace(/\.png$/, '.pvr'));
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type'), /^image\/png/);
  const bytes = Buffer.from(await response.arrayBuffer());
  assert.equal(bytes.readUInt32BE(0), 0x89504e47);
  assert.equal(hash(bytes), expected.pngSha256);
});

test('known original audio resolves through the manifest alias with its original bytes', async () => {
  const manifest = JSON.parse(fs.readFileSync(path.join(root, 'recovered/downloads/manifest.json'), 'utf8'));
  const expected = manifest.files.find(entry => entry.path?.endsWith('.m4a'));
  assert.ok(expected, 'Expected original mergeCreateExp audio in the static asset closure');
  const response = await fetch(origin + '/assets/cross-bundle-alias/native/00/' + path.basename(expected.path));
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'audio/mp4');
  assert.equal(hash(Buffer.from(await response.arrayBuffer())), expected.sha256);
});

test('private paths and unknown assets return local 404s without a remote fallback', async () => {
  for (const url of ['/.local-originals/game.js', '/.git/config', '/node_modules/acorn/package.json', '/client/%2e%2e/.local-originals/game.js', '/assets/gameAsset/native/00/not-a-known-original-texture.00000.pvr']) {
    const response = await fetch(origin + url, { redirect: 'manual' });
    assert.equal(response.status, 404, url);
    assert.equal(response.headers.get('location'), null);
  }
  const diagnostics = await (await fetch(origin + '/__diagnostics')).json();
  assert.ok(diagnostics.missing.some(entry => entry.path.endsWith('not-a-known-original-texture.00000.pvr')));
  assert.ok(diagnostics.missing.every(entry => typeof entry.path === 'string' && entry.count > 0));
});
