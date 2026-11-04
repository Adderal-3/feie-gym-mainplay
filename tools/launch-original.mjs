import { spawn } from 'node:child_process';
import { setTimeout as wait } from 'node:timers/promises';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..');
const url = 'http://127.0.0.1:4174/';
let alreadyRunning = false;
try { alreadyRunning = (await fetch(url, { signal: AbortSignal.timeout(800) })).ok; } catch {}
let child;
if (!alreadyRunning) {
  child = spawn(process.execPath, ['tools/original-server.mjs'], { cwd: root, stdio: 'inherit', windowsHide: true });
  child.on('error', error => { console.error(error.message); process.exitCode = 1; });
  let ready = false;
  for (let attempt = 0; attempt < 40 && !ready; attempt++) {
    try { ready = (await fetch(url, { signal: AbortSignal.timeout(500) })).ok; } catch {}
    if (!ready) await wait(250);
  }
  if (!ready) { child.kill(); throw new Error('本地服务未能启动，请查看上方错误。'); }
}
console.log('本地游戏：' + url);
if (process.platform === 'win32') spawn('cmd.exe', ['/d', '/c', 'start', '', url], { windowsHide: true, stdio: 'ignore' });
else if (process.platform === 'darwin') spawn('open', [url], { stdio: 'ignore' });
else spawn('xdg-open', [url], { stdio: 'ignore' }).on('error', () => {});
if (child) {
  process.on('SIGINT', () => { child.kill(); process.exit(); });
  process.on('SIGTERM', () => { child.kill(); process.exit(); });
}
