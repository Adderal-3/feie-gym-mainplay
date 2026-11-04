import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
const root=path.resolve(import.meta.dirname,'..');
const bundle=process.argv[2]||'remoteBoardAsset';
if(!['remoteBoardAsset','remoteCollectionAsset'].includes(bundle))throw new Error('This bounded recovery task allows only requested original runtime bundles');
const settings=await fs.readFile(path.join(root,'client/src/settings.js'),'utf8');
const version=new RegExp(bundle+':"([a-f0-9]+)"').exec(settings)?.[1];
if(!version)throw new Error('Original bundle version is missing from client settings');
const indexPath=path.join(root,'recovered/downloads/manifest.json');
const manifest=JSON.parse(await fs.readFile(indexPath,'utf8'));
const records=[];
async function fetchStatic(relative,type,key){
  if(!relative.startsWith(`asset/remote/${bundle}/`)||relative.includes('..'))throw new Error('Invalid original static path');
  const url='https://gj-fejsf-res.hortorgames.com/'+relative;
  const r=await fetch(url,{signal:AbortSignal.timeout(30000),redirect:'error'});
  if(!r.ok)throw new Error(`${r.status} ${relative}`);
  const data=Buffer.from(await r.arrayBuffer());
  if(data.length>20*1024*1024)throw new Error('Unexpected bundle metadata size');
  const dest=path.join(root,'recovered/downloads',relative);await fs.mkdir(path.dirname(dest),{recursive:true});await fs.writeFile(dest,data);
  records.push({bundle,textureUuid:key,version,type,url,path:relative,bytes:data.length,sha256:crypto.createHash('sha256').update(data).digest('hex'),status:'downloaded',scope:'Original requested runtime bundle metadata'});
  return JSON.parse(data);
}
const config=await fetchStatic(`asset/remote/${bundle}/config.${version}.json`,'bundleConfig','config');
if(config.name!==bundle)throw new Error('Unexpected bundle identity');
if(process.argv.includes('--imports')){
  const entries=config.versions?.import||[];
  for(const pack of Object.keys(config.packs||{})){
    const i=entries.indexOf(pack);if(i<0)throw new Error('Original pack version absent: '+pack);
    const hash=entries[i+1];if(!/^[a-f0-9]+$/.test(pack)||!/^[a-f0-9]+$/.test(hash))throw new Error('Invalid original pack identity');
    await fetchStatic(`asset/remote/${bundle}/import/${pack.slice(0,2)}/${pack}.${hash}.json`,'bundleImport',pack);
  }
}
const combined=new Map(manifest.files.map(f=>[f.bundle+':'+f.textureUuid,f]));
for(const r of records)combined.set(r.bundle+':'+r.textureUuid,r);
manifest.files=[...combined.values()];manifest.transferredBytes=manifest.files.reduce((n,f)=>n+(f.bytes||0),0);manifest.downloaded=manifest.files.filter(f=>f.status==='downloaded').length;
await fs.writeFile(indexPath,JSON.stringify(manifest,null,2)+'\n');
console.log(JSON.stringify({bundle,version,files:records.length,bytes:records.reduce((n,f)=>n+f.bytes,0),paths:Object.keys(config.paths||{}).length,packs:Object.keys(config.packs||{}).length,dependencies:config.deps}));
