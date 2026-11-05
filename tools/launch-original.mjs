import { spawn } from 'node:child_process';
import { setTimeout as wait } from 'node:timers/promises';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..');
const port = Number(process.env.ORIGINAL_PORT || 4174);
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('本地端口必须是1到65535之间的整数。');
const url = `http://127.0.0.1:${port}/`;
async function probe() {
  let response;
  try {
    response = await fetch(url + '__app', { signal: AbortSignal.timeout(800) });
  } catch { return 'stopped'; }
  if (!response.ok) return 'occupied';
  try { if ((await response.json()).application !== 'jianghu-bufang') return 'occupied'; }
  catch { return 'occupied'; }
  try { return (await fetch(url, { signal: AbortSignal.timeout(800) })).ok ? 'ready' : 'incomplete'; }
  catch { return 'incomplete'; }
}
const initial = await probe();
if (initial === 'occupied') throw new Error(`${port}端口正在运行旧版游戏或其它服务，请关闭旧服务后重新启动江湖布坊。`);
if (initial === 'incomplete') throw new Error('江湖布坊页面文件不完整，请保留完整仓库后启动。');
const alreadyRunning = initial === 'ready';
let child;
if (!alreadyRunning) {
  child = spawn(process.execPath, ['tools/original-server.mjs'], { cwd: root, stdio: 'inherit', windowsHide: true });
  child.on('error', error => { console.error(error.message); process.exitCode = 1; });
  let ready = false;
  for (let attempt = 0; attempt < 40 && !ready; attempt++) {
    if (child.exitCode !== null || child.signalCode) break;
    ready = (await probe()) === 'ready';
    if (!ready) await wait(250);
  }
  if (!ready) { child.kill(); throw new Error('本地服务未能启动，请查看上方错误。'); }
}
console.log('江湖布坊：' + url);
if (!process.argv.includes('--no-open')) {
  if (process.platform === 'win32') spawn('cmd.exe', ['/d', '/c', 'start', '', url], { windowsHide: true, stdio: 'ignore' });
  else if (process.platform === 'darwin') spawn('open', [url], { stdio: 'ignore' });
  else spawn('xdg-open', [url], { stdio: 'ignore' }).on('error', () => {});
}
if (child) {
  process.on('SIGINT', () => { child.kill(); process.exit(); });
  process.on('SIGTERM', () => { child.kill(); process.exit(); });
}
