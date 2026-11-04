import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {parse} from 'acorn';
const root=path.resolve(import.meta.dirname,'..');
const json=async p=>JSON.parse(await fs.readFile(path.join(root,p),'utf8'));
const digest=b=>crypto.createHash('sha256').update(b).digest('hex');
let hashed=0,parsed=0,images=0;
const errors=[];
async function verify(file,hash,bytes){
  try{const b=await fs.readFile(path.join(root,file));if(hash&&digest(b)!==hash)errors.push('Hash mismatch: '+file);if(bytes!==undefined&&b.length!==bytes)errors.push('Size mismatch: '+file);hashed++;return b;}
  catch(e){errors.push('Missing: '+file);return null;}
}
const exported=await json('recovered/manifest.json');
for(const p of exported.packages)for(const f of p.files)await verify('recovered/'+f.path,f.sha256,f.bytes);
for(const f of exported.remote)await verify('recovered/'+f.path,f.sha256,f.bytes);
const downloaded=await json('recovered/downloads/manifest.json');
if(downloaded.failed)errors.push('Downloads have failures');
for(const f of downloaded.files)await verify('recovered/downloads/'+f.path,f.sha256,f.bytes);
const configs=await json('recovered/config/index.json');
for(const input of configs.inputs)for(const table of input.tables){
  const b=await verify(`recovered/config/${input.name}/${table.name}.json`,table.sha256,table.bytes);
  if(b)try{JSON.parse(b);}catch{errors.push('Invalid table JSON: '+table.name);}
}
const layout=await json('client/layout-index.json');
for(const f of layout.files){
  const b=await verify('client/'+f.path,f.sha256,f.bytes);
  if(b&&f.path.endsWith('.js'))try{parse(b.toString(),{ecmaVersion:'latest',allowReturnOutsideFunction:true});parsed++;}catch(e){errors.push('JavaScript parse error: '+f.path+' '+e.message);}
}
const modules=await json('readable/module-index.json');
const main=await fs.readFile(path.join(root,modules.source),'utf8');
if(digest(main)!==modules.sourceSha256)errors.push('Readable index generated from different source');
for(const m of [...modules.core,...modules.registrations.filter(x=>x.file)]){
  const b=await verify(m.file);
  if(b)try{parse(b.toString(),{ecmaVersion:'latest'});parsed++;}catch(e){errors.push('Readable fragment parse error: '+m.name);}
}
const textures=await json('recovered/previews/textures.json');
if(textures.failed)errors.push('Texture decoder has failures');
for(const f of textures.files){await verify('recovered/previews/'+f.png,f.pngSha256);images++;}
const sprites=await json('recovered/previews/sprites.json');
if(sprites.failed)errors.push('Sprite cropper has failures');
for(const f of sprites.files){const b=await verify('recovered/previews/'+f.png);if(b&&b.readUInt32BE(0)!==0x89504e47)errors.push('Invalid PNG: '+f.png);images++;}
const primary=p=>/^Texture\/Element\/[A-I]_\d+\//.test(p);
const selected=p=>primary(p)||/^Texture\/Element\/(?:Z_0|Z_1|X_0)\//.test(p)||/^Texture\/MergeUi\//.test(p)||/^Texture\/UI\/(?:MainBoard|Home)\//.test(p)||/^Texture\/Items\/Common\//.test(p)||/^Texture\/Map\/init\//.test(p);
const covered=new Set();
for(const f of sprites.files)for(const a of f.aliases||[{bundle:f.bundle,path:f.path}])if(primary(a.path))covered.add(a.bundle+'/'+a.path);
const missingOrdinary=sprites.missing.filter(f=>(f.aliases||[{path:f.path}]).some(a=>primary(a.path)));
if(missingOrdinary.length)errors.push('Ordinary chain sprites missing: '+missingOrdinary.length);
const board=await json('recovered/config/Config/Board.json');
if(board['1'].element.length!==9||board['1'].element.some(r=>r.length!==7))errors.push('Initial board is not 9x7');
const config=await json('recovered/config/Config/Config.json');
if(config.energyMax!==100||config.energyRecoverRate!==120)errors.push('Unexpected energy config');
if(!exported.sanitization?.fields?.length)errors.push('Expected SDK secret sanitation record missing');
if(!main.includes('REDACTED_FOR_REPOSITORY'))errors.push('SDK redaction missing from main script');
const report={passed:errors.length===0,hashedFiles:hashed,parsedScripts:parsed,verifiedImages:images,registrationCount:modules.registrationCount,primaryRegisteredModules:modules.primaryCount,sharedCoreDeclarations:modules.core.length,configTables:configs.inputs.reduce((n,x)=>n+x.tables.length,0),textures:textures.converted,sprites:sprites.converted,ordinaryChainPaths:covered.size,ordinaryChainMissing:missingOrdinary.length,remainingOutOfScopeSpriteReferences:sprites.missingTextures,missingSubpackages:layout.missingSubpackages.map(p=>p.name),runtimeVerified:false,runtimeNote:'This report covers static recovery only. Runtime verification is recorded separately in docs/LOCAL_RUNTIME.md.',errors};
await fs.mkdir(path.join(root,'docs'),{recursive:true});
await fs.writeFile(path.join(root,'docs/verification.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report,null,2));
if(errors.length)process.exitCode=1;
