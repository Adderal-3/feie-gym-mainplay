import http from 'node:http';
import path from 'node:path';
import fs from 'node:fs';
import { stat } from 'node:fs/promises';

const root=path.resolve(import.meta.dirname,'..');
const port=Number(process.env.PORT||4173);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.mp3':'audio/mpeg','.md':'text/plain; charset=utf-8'};
http.createServer(async(req,res)=>{
  try{
    const pathname=decodeURIComponent(new URL(req.url,'http://127.0.0.1').pathname);
    const parts=pathname.replaceAll('\\','/').split('/');
    if(parts.some(p=>p.startsWith('.')||p==='node_modules'))throw new Error('Private path');
    const file=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));
    if(!file.startsWith(root+path.sep))throw new Error('Outside root');
    const info=await stat(file);if(!info.isFile())throw new Error('Not a file');
    // Recovered code is served as plain text and is never imported or executed by this viewer.
    const type=pathname.startsWith('/viewer/')&&file.endsWith('.js')?'application/javascript; charset=utf-8':types[path.extname(file)]||'text/plain; charset=utf-8';
    res.writeHead(200,{'Content-Type':type,'Content-Length':info.size,'Cache-Control':'no-cache','X-Content-Type-Options':'nosniff'});
    fs.createReadStream(file).pipe(res);
  }catch{res.writeHead(404,{'Content-Type':'text/plain'});res.end('Not found');}
}).listen(port,'127.0.0.1',()=>console.log(`Archive viewer: http://127.0.0.1:${port}`));
