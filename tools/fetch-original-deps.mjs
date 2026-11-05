import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
const root=path.resolve(import.meta.dirname,'..');
const graph=JSON.parse(await fs.readFile(path.join(root,'docs/original-mainplay-dependencies.json'),'utf8'));
const manifestPath=path.join(root,'recovered/downloads/manifest.json');
const manifest=JSON.parse(await fs.readFile(manifestPath,'utf8'));
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
let bytes=0;
const batchArg=process.argv.find(arg=>arg.startsWith('--batch='));
const batch=batchArg?Number(batchArg.slice('--batch='.length)):Infinity;
if(!(batch===Infinity||Number.isSafeInteger(batch)&&batch>0&&batch<=1000))throw new Error('Invalid bounded batch size');
const priority=process.argv.filter(arg=>arg.startsWith('--priority=')).map(arg=>arg.slice('--priority='.length));
const queue=graph.missingNative.filter(a=>['.pvr','.bin','.mp3','.wav','.ogg','.m4a','.atlas','.fnt','.txt','.json'].includes(a.nativeExt)).sort((a,b)=>Number(priority.includes(b.uuid))-Number(priority.includes(a.uuid))).slice(0,batch);
const results=[];
// Preserve provenance for successful files from an interrupted earlier run.
const indexed=new Set(manifest.files.map(f=>f.path));
for(const a of graph.assets)for(const p of a.nativeFiles||[])if(p.startsWith('recovered/downloads/')){
  const relative=p.slice('recovered/downloads/'.length);if(indexed.has(relative))continue;
  const b=await fs.readFile(path.join(root,p));
  results.push({bundle:a.bundle,textureUuid:a.uuid,version:a.nativeVersion,type:a.type,sprites:a.path?[a.path]:[],url:'https://gj-fejsf-res.hortorgames.com/'+relative,path:relative,bytes:b.length,sha256:sha(b),status:'reused',scope:'Original cached mainplay dependency closure; recovered interrupted download'});
}
await Promise.all(Array.from({length:Math.min(6,queue.length)},async()=>{
  while(queue.length){
    const a=queue.shift();
    if(!/^[a-f0-9-]+$/.test(a.uuid)||!/^[a-f0-9]+$/.test(a.nativeVersion)||!['gameAsset','remoteAsset','spineAsset','zh','remoteBoardAsset','remoteCollectionAsset'].includes(a.bundle))throw new Error('Unexpected static asset identifier');
    const relative=`asset/remote/${a.bundle}/native/${a.uuid.slice(0,2)}/${a.uuid}.${a.nativeVersion}${a.nativeExt}`;
    const url=`https://gj-fejsf-res.hortorgames.com/${relative}`;
    const response=await fetch(url,{signal:AbortSignal.timeout(30000),redirect:'error'});
    if(!response.ok)throw new Error(`Static asset ${response.status}: ${relative}`);
    const data=Buffer.from(await response.arrayBuffer());bytes+=data.length;
    if(bytes>50*1024*1024)throw new Error('Static dependency download budget exceeded');
    const dest=path.join(root,'recovered/downloads',relative);await fs.mkdir(path.dirname(dest),{recursive:true});await fs.writeFile(dest,data);
    results.push({bundle:a.bundle,textureUuid:a.uuid,version:a.nativeVersion,type:a.type,sprites:a.path?[a.path]:[],url,path:relative,bytes:data.length,sha256:sha(data),status:'downloaded',scope:'Original cached mainplay prefab dependency closure'});
  }
}));
const combined=new Map(manifest.files.map(f=>[f.bundle+':'+f.textureUuid,f]));
for(const f of results)combined.set(f.bundle+':'+f.textureUuid,f);
manifest.files=[...combined.values()];manifest.transferredBytes=manifest.files.reduce((n,f)=>n+(f.bytes||0),0);manifest.downloaded=manifest.files.filter(f=>f.status==='downloaded').length;
manifest.scope+='; original mainplay prefab dependency closure (including required Spine binaries)';
await fs.writeFile(manifestPath,JSON.stringify(manifest,null,2)+'\n');
console.log(JSON.stringify({downloaded:results.length,bytes,types:Object.fromEntries([...new Set(results.map(f=>f.type))].map(t=>[t,results.filter(f=>f.type===t).length]))}));
