import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = path.resolve(import.meta.dirname, '..');
const port = Number(process.env.ORIGINAL_PORT || 4174);
const layout = JSON.parse(fs.readFileSync(path.join(root, 'original/runtime-layout.json'), 'utf8'));
if(layout.version!==1 || layout.source!=='client/subpackages/main/game.js')throw new Error('Unsupported original runtime layout');
const source = fs.readFileSync(path.join(root, layout.source), 'utf8');
const sourceSha256 = crypto.createHash('sha256').update(source).digest('hex');
if(sourceSha256!==layout.sha256 || source.length!==layout.utf16Length || !Number.isSafeInteger(layout.insertionOffset) || layout.insertionOffset<1_000_000 || source[layout.insertionOffset]!=='}') {
  throw new Error('Original client SHA or bridge layout mismatch. Restore the verified client, or regenerate original/runtime-layout.json using tools/build-original-layout.mjs after review.');
}
const names = ['F8','E8','G2','M2','GW','G$','TJ','EJ','b2','v','b','Ne','ar','mr','pl','ll','yu','el','ul','vn','hm','ot','MM','RA','DM','Tq','wq','K3','h','j_','o9','C4','x_','kK','u2','F7','t9','yi','mi','Gle','u','d','i','Wi','Z2','yr','vr','Zc','Za','Be','J8','kK','o8','v4','K6','K3','fI','Xo','Lp','Mp','Np','Qo','e9','TC','SJ','We','aK','q6','c9','Uz','zz','Xz','jP','mw','Q6','hT','Ct','j8','Mc','Hc','F3','W3','xt'];
names.push('LD'); // Recovered Spine cache hook; install before any prefab creates a skeleton.
names.push('n9', 'z7', 'i9', 'A8', 'L7'); // Original screen/window navigator subclasses and boot UI services.
names.push('gl'); // Original once-data byte-array protocol model.
names.push('nO', 'ZN', 'rO');
names.push('r_', 'KI'); // Original sound registry and home day/night clock.
const exposed = [...new Set(names)].map(n => `${JSON.stringify(n)}:typeof ${n}==='undefined'?undefined:${n}`).join(',');
const injection = `\n;window.__ORIGINAL__={${exposed}};window.__ORIGINAL__.config=typeof Gle==='undefined'?window.config:Gle;window.__ORIGINAL__.classes={Lp:typeof Lp==='undefined'?undefined:Lp,Mp:typeof Mp==='undefined'?undefined:Mp,Np:typeof Np==='undefined'?undefined:Np,ll:typeof ll==='undefined'?undefined:ll,pl:typeof pl==='undefined'?undefined:pl,el:typeof el==='undefined'?undefined:el,Za:typeof Za==='undefined'?undefined:Za,Zc:typeof Zc==='undefined'?undefined:Zc,Mc:typeof Mc==='undefined'?undefined:Mc,Hc:typeof Hc==='undefined'?undefined:Hc};window.OriginalGameBridge=window.__ORIGINAL__;\n`;
const instrumented = source.slice(0, layout.insertionOffset) + injection + source.slice(layout.insertionOffset);
const misses = new Map();
const nativeFallback = new Map();
const decodedFallback = new Map();
const manifestVersions = new Map();
function refreshNativeFallbacks() {
  const sources=['recovered/manifest.json','recovered/downloads/manifest.json','recovered/previews/textures.json'];
  if(sources.every(p=>manifestVersions.get(p)===fs.statSync(path.join(root,p)).mtimeMs))return;
  nativeFallback.clear();decodedFallback.clear();
  const register=(map,relative,sha)=>{
    const name=path.basename(relative);if(!/\.(?:pvr|png|jpe?g|bin|ttf|mp3|wav|ogg|m4a)$/i.test(name))return;
    const prior=map.get(name);
    if(!prior)map.set(name,{relative,sha});
    else if(prior.sha!==sha)map.set(name,{ambiguous:true});
  };
  const exported=JSON.parse(fs.readFileSync(path.join(root,sources[0]),'utf8'));
  for(const p of exported.packages)for(const f of p.files)register(nativeFallback,'recovered/'+f.path,f.sha256);
  for(const f of exported.remote)register(nativeFallback,'recovered/'+f.path,f.sha256);
  const downloads=JSON.parse(fs.readFileSync(path.join(root,sources[1]),'utf8'));
  for(const f of downloads.files)if(f.path)register(nativeFallback,'recovered/downloads/'+f.path,f.sha256);
  const textures=JSON.parse(fs.readFileSync(path.join(root,sources[2]),'utf8'));
  for(const f of textures.files)register(decodedFallback,'recovered/previews/'+f.png,f.pngSha256);
  for(const p of sources)manifestVersions.set(p,fs.statSync(path.join(root,p)).mtimeMs);
}
const mime = {'.html':'text/html; charset=utf-8','.js':'application/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.css':'text/css; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.ttf':'font/ttf','.mp3':'audio/mpeg','.wav':'audio/wav','.ogg':'audio/ogg','.m4a':'audio/mp4','.bin':'application/octet-stream','.pvr':'application/octet-stream'};
const safe = relative => {
  if (relative.includes('\0') || relative.replaceAll('\\','/').split('/').some(s => s === '..' || s.startsWith('.'))) return null;
  const result = path.resolve(root, relative.replace(/^\/+/, ''));
  return result.startsWith(root + path.sep) ? result : null;
};
const file = candidates => candidates.map(safe).find(p => p && fs.existsSync(p) && fs.statSync(p).isFile());
function resourcePath(url) {
  let pathname = url;
  if (pathname.startsWith('/decoded/')) {
    pathname = pathname.slice('/decoded'.length).replace(/\.pvr$/i, '.png');
    if (pathname.startsWith('/remote/')) return file(['recovered/previews/asset'+pathname]);
    if (pathname.startsWith('/asset/remote/')) return file(['recovered/previews'+pathname]);
    if (pathname.startsWith('/assets/main/')) return file(['recovered/previews/packages/401/_subpackages_main_/subpackages/main/'+pathname.slice('/assets/main/'.length)]);
    if (pathname.startsWith('/assets/internal/') || pathname.startsWith('/assets/resources/')) return file(['recovered/previews/packages/401/__WITHOUT_MULTI_PLUGINCODE__'+pathname]);
    if (pathname.startsWith('/assets/')) return file(['recovered/previews/asset/remote/'+pathname.slice('/assets/'.length)]);
    if (pathname.startsWith('/subpackages/main/')) return file(['recovered/previews/packages/401/_subpackages_main_'+pathname]);
    return null;
  }
  if (pathname.startsWith('/remote/')) return file(['recovered/remote/asset'+pathname,'recovered/downloads/asset'+pathname]);
  if (pathname.startsWith('/asset/remote/')) return file(['recovered/remote'+pathname,'recovered/downloads'+pathname]);
  if (pathname.startsWith('/remoteRes/')) return file(['recovered/remote'+pathname]);
  if (pathname.startsWith('/assets/main/')) return file(['client/subpackages/main/'+pathname.slice('/assets/main/'.length)]);
  if (pathname.startsWith('/assets/internal/') || pathname.startsWith('/assets/resources/')) return file(['client'+pathname]);
  if (pathname.startsWith('/assets/')) return file(['recovered/remote/asset/remote/'+pathname.slice('/assets/'.length),'recovered/downloads/asset/remote/'+pathname.slice('/assets/'.length)]);
  if (pathname.startsWith('/subpackages/main/')) return file(['client'+pathname]);
  if (pathname.startsWith('/src/scripts/')) return file(['client'+pathname]);
  if (pathname.startsWith('/client/') || pathname.startsWith('/original/')) return file([pathname]);
  return null;
}
http.createServer((req, res) => {
  try {
    const url = new URL(req.url, 'http://127.0.0.1');
    let pathname = decodeURIComponent(url.pathname);
    if (pathname === '/') pathname = '/original/index.html';
    const headers = {'Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Content-Security-Policy':"default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; connect-src 'self'; img-src 'self' data: blob:; media-src 'self' data: blob:; font-src 'self' data:; style-src 'self' 'unsafe-inline'; worker-src 'self' blob:"};
    if (pathname === '/original/instrumented-game.js') {
      res.writeHead(200, {...headers,'Content-Type':mime['.js']}); res.end(instrumented); return;
    }
    if (pathname === '/__diagnostics') {
      res.writeHead(200, {...headers,'Content-Type':mime['.json']});res.end(JSON.stringify({missing:[...misses].map(([path,count])=>({path,count}))},null,2));return;
    }
    if (/\/(?:assets|remote)\/.+\/index(?:\.[a-z\d]+)?\.js$/i.test(pathname)) {
      res.writeHead(200,{...headers,'Content-Type':mime['.js']});res.end('// Original bundle script already registered by original/instrumented-game.js');return;
    }
    let target = resourcePath(pathname);
    if(!target && /\/native\//.test(pathname)) {
      refreshNativeFallbacks();
      const map=pathname.startsWith('/decoded/')?decodedFallback:nativeFallback;
      const name=path.basename(pathname).replace(pathname.startsWith('/decoded/')?/\.pvr$/i:/$^/,'.png');
      const known=map.get(name);
      if(known&&!known.ambiguous)target=file([known.relative]);
    }
    if (!target) {
      misses.set(pathname,(misses.get(pathname)||0)+1);
      res.writeHead(404,{...headers,'Content-Type':'text/plain'});res.end('Missing local original resource: '+pathname);return;
    }
    res.writeHead(200,{...headers,'Content-Type':mime[path.extname(target).toLowerCase()]||'application/octet-stream'});
    fs.createReadStream(target).pipe(res);
  } catch(e) {res.writeHead(500,{'Content-Type':'text/plain'});res.end(String(e.message));}
}).listen(port,'127.0.0.1',()=>console.log(`Original local client harness: http://127.0.0.1:${port}/?debug=1`));
