import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {parse} from 'acorn';
import {decodeBon} from './extract-config.mjs';
import prettier from 'prettier';
const root=path.resolve(import.meta.dirname,'..');
const json=async p=>JSON.parse(await fs.readFile(path.join(root,p),'utf8'));
const digest=b=>crypto.createHash('sha256').update(b).digest('hex');
let hashed=0,parsed=0,images=0;
const errors=[];
function parsedScript(bytes,file){
  try{const ast=parse(bytes.toString(),{ecmaVersion:'latest',allowReturnOutsideFunction:true});parsed++;return ast;}
  catch(error){errors.push('JavaScript parse error: '+file+' '+error.message);return null;}
}
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
async function verifyReference623(){
  const base='recovered/reference623',before={hashed,parsed,errors:errors.length};
  const manifest=await json(base+'/manifest.json'),client=await json(base+'/client/layout-index.json'),tables=await json(base+'/config/index.json');
  const records=new Map(),packageBuffers=new Map();
  function validRecord(record,label){
    if(!record||typeof record.path!=='string'||!record.path||record.path.includes('\\')||record.path.startsWith('/')||record.path.split('/').some(part=>part==='..'||part.includes(':'))||!Number.isSafeInteger(record.bytes)||record.bytes<0||!/^[0-9a-f]{64}$/.test(record.sha256||'')){
      errors.push('Invalid reference623 manifest entry: '+label);return false;
    }
    return true;
  }
  if(!Array.isArray(manifest.packages)||!Array.isArray(manifest.remote))throw new Error('Invalid reference623 export manifest');
  for(const pack of manifest.packages){
    if(pack.version!==manifest.version||!Array.isArray(pack.files))errors.push('Invalid reference623 package metadata: '+pack.name);
    for(const file of pack.files||[]){
      if(!validRecord(file,pack.name)||!file.path.startsWith('packages/'+manifest.version+'/'))continue;
      if(records.has(file.path))errors.push('Duplicate reference623 manifest path: '+file.path);
      records.set(file.path,file);
      const bytes=await verify(base+'/'+file.path,file.sha256,file.bytes);
      if(bytes){packageBuffers.set(file.path,bytes);if(file.path.endsWith('.js'))parsedScript(bytes,base+'/'+file.path);}
    }
  }
  for(const file of manifest.remote){
    if(!validRecord(file,'remote')||!file.path.startsWith('remote/'))continue;
    if(records.has(file.path))errors.push('Duplicate reference623 manifest path: '+file.path);
    records.set(file.path,file);
    await verify(base+'/'+file.path,file.sha256,file.bytes);
  }
  const inputs=new Map();
  for(const input of client.inputs){
    if(!validRecord(input,'client input'))continue;
    const original=records.get('packages/'+input.path);
    if(!original||original.sha256!==input.sha256||original.bytes!==input.bytes)errors.push('reference623 layout input does not match package manifest: '+input.path);
    if(inputs.has(input.path))errors.push('Duplicate reference623 layout input: '+input.path);
    inputs.set(input.path,input);
  }
  if(inputs.size!==packageBuffers.size)errors.push('reference623 layout input count differs from recovered package files');
  if(client.outputFileCount!==client.files.length||client.moduleCount!==client.inputs.reduce((total,input)=>total+(input.modules||0),0))errors.push('reference623 layout counts do not match indexed entries');
  const clientPaths=new Set();let mainBytes,mainAstInfo,settings;
  function astInfo(bytes,file){
    const ast=parsedScript(bytes,file);if(!ast)return null;
    let wrapper;const pending=[ast];
    while(pending.length){
      const node=pending.pop();
      if(node.type==='FunctionExpression'&&(!wrapper||node.end-node.start>wrapper.end-wrapper.start))wrapper=node;
      for(const value of Object.values(node)){
        if(Array.isArray(value))for(const child of value)if(child?.type)pending.push(child);
        if(value?.type)pending.push(value);
      }
    }
    return {insertionOffset:wrapper?.body.end-1};
  }
  for(const file of client.files){
    if(!validRecord(file,'client output'))continue;
    if(clientPaths.has(file.path.toLowerCase()))errors.push('Duplicate reference623 client path: '+file.path);
    clientPaths.add(file.path.toLowerCase());
    const bytes=await verify(base+'/client/'+file.path,file.sha256,file.bytes);
    if(!bytes)continue;
    if(file.path==='subpackages/main/game.js'){mainBytes=bytes;mainAstInfo=astInfo(bytes,base+'/client/'+file.path);}
    else if(file.path.endsWith('.js')){
      const ast=parsedScript(bytes,base+'/client/'+file.path);
      if(file.path==='src/settings.js'&&ast){
        const object=ast.body.find(statement=>statement.expression?.type==='AssignmentExpression')?.expression.right;
        const versions=object?.properties.find(property=>(property.key.name??property.key.value)==='bundleVers')?.value;
        if(versions?.type==='ObjectExpression')settings=Object.fromEntries(versions.properties.map(property=>[property.key.name??property.key.value,property.value.value]));
      }
    }
    for(const origin of file.origins||[]){
      if(origin.kind==='module-body'||origin.kind==='package-resource'){
        const input=packageBuffers.get('packages/'+origin.input);
        if(!input||!inputs.has(origin.input)){errors.push('reference623 output has unknown origin: '+file.path);continue;}
        const expected=origin.kind==='module-body'?Buffer.from(input.toString().slice(origin.utf16Start,origin.utf16End)):input;
        if(origin.kind==='module-body'&&(!Number.isSafeInteger(origin.utf16Start)||!Number.isSafeInteger(origin.utf16End)||origin.utf16Start<0||origin.utf16End<origin.utf16Start||origin.utf16End>input.toString().length))errors.push('Invalid reference623 module offsets: '+file.path);
        if(!bytes.equals(expected))errors.push('reference623 client output differs from original package slice: '+file.path);
      }else if(!['generated-native-config','generated-local-project-config'].includes(origin.kind))errors.push('Unknown reference623 client origin: '+file.path);
    }
    if(!file.origins?.length)errors.push('reference623 client output lacks origin: '+file.path);
  }
  const game=await json(base+'/client/game.json');
  const missing=game.subpackages.filter(pack=>!clientPaths.has(pack.root.toLowerCase()+'game.js')).map(pack=>({name:pack.name,root:pack.root}));
  if(JSON.stringify(missing)!==JSON.stringify(client.missingSubpackages))errors.push('reference623 missing-subpackage layout does not match game.json');
  let tableCount=0,sourceCount=0;
  for(const input of tables.inputs){
    const source=records.get(input.source);
    if(!source||source.sha256!==input.sourceSha256||source.bytes!==input.sourceBytes)errors.push('reference623 BON source differs from export manifest: '+input.name);
    const sourceBytes=await verify(base+'/'+input.source,input.sourceSha256,input.sourceBytes);
    let decoded;
    try{if(sourceBytes){decoded=decodeBon(sourceBytes);sourceCount++;}}
    catch(error){errors.push('reference623 BON decode error: '+input.name+' '+error.message);}
    const bundle={Config:'gameAsset',Lang_zh:'zh'}[input.name];
    if(!settings||settings[bundle]!==input.bundleVersion)errors.push('reference623 config bundle version differs from current settings: '+input.name);
    if(decoded&&Object.keys(decoded).length!==input.tables.length)errors.push('reference623 decoded table count differs from index: '+input.name);
    const names=new Set();
    for(const table of input.tables){
      if(!/^[a-zA-Z0-9_-]+$/.test(table.name)||!validRecord({...table,path:table.name},'config table'))continue;
      if(names.has(table.name))errors.push('Duplicate reference623 config table: '+input.name+'/'+table.name);
      names.add(table.name);
      const file=base+'/config/'+input.name+'/'+table.name+'.json',bytes=await verify(file,table.sha256,table.bytes);tableCount++;
      if(!bytes)continue;
      try{
        const value=JSON.parse(bytes),shape=Array.isArray(value)?'array':typeof value,entries=value&&typeof value==='object'?Object.keys(value).length:null;
        if(shape!==table.shape||entries!==table.entries)errors.push('reference623 config table shape differs from index: '+file);
        if(decoded&&JSON.stringify(value)!==JSON.stringify(decoded[table.name]))errors.push('reference623 JSON table differs from decoded BON: '+file);
      }catch(error){errors.push('Invalid reference623 table JSON: '+file+' '+error.message);}
    }
  }
  // The formatted file contains the full WeChat package wrapper, while the client
  // file is its define() module body. Compare with that actual package, whose
  // module-to-client byte slice was independently checked above.
  const readableFile=base+'/readable/game.formatted.js',readable=await verify(readableFile),readableAst=readable&&astInfo(readable,readableFile);
  const readableSource=manifest.packages.flatMap(pack=>pack.files).find(file=>file.path.endsWith('/_subpackages_main_/subpackages/main/game.js'));
  // Reproduce the existing documented static formatting transform. Acorn has
  // already parsed both sources; formatting also removes empty statements and
  // reassociates equivalent logical chains, so raw AST equality is too strict.
  let readableMatchesSource=false;
  if(readableSource&&packageBuffers.has(readableSource.path)&&readableAst){
    const formatted=await prettier.format(packageBuffers.get(readableSource.path).toString(),{parser:'babel',printWidth:100});
    readableMatchesSource=readable.toString()===formatted;
  }
  if(!readableMatchesSource)errors.push('reference623 readable output differs from formatting its actual package source');
  if(!mainBytes?.includes('REDACTED_FOR_REPOSITORY'))errors.push('reference623 SDK redaction missing from main script');
  const sanitization=manifest.packages.flatMap(pack=>pack.files).filter(file=>file.sanitizedFields?.length);
  if(!sanitization.some(file=>file.sanitizedFields.includes('wxAdSecretKey')&&/^[0-9a-f]{64}$/.test(file.originalSha256)))errors.push('reference623 package sanitation provenance missing');
  const runtime=await json('original/runtime-layout.json');
  let runtimeLayoutVerified=false;
  if(runtime.source===base+'/client/subpackages/main/game.js'){
    runtimeLayoutVerified=runtime.version===1&&!!mainBytes&&runtime.sha256===digest(mainBytes)&&runtime.utf16Length===mainBytes.toString().length&&runtime.insertionOffset===mainAstInfo?.insertionOffset&&mainBytes.toString()[runtime.insertionOffset]==='}';
    if(!runtimeLayoutVerified)errors.push('reference623 runtime insertion layout differs from original source AST');
  }
  return {passed:errors.length===before.errors,packageVersion:manifest.version,packageFiles:manifest.packages.reduce((total,pack)=>total+pack.files.length,0),remoteFiles:manifest.remote.length,clientFiles:client.files.length,configSources:sourceCount,configTables:tableCount,hashedFiles:hashed-before.hashed,parsedScripts:parsed-before.parsed,missingSubpackages:missing.map(pack=>pack.name),readable:{file:readableFile,source:readableSource?base+'/'+readableSource.path:null,observedSha256:readable?digest(readable):null,declaredHashAvailable:false,astValid:!!readableAst,formattedSourceMatches:readableMatchesSource},runtimeLayout:{active:runtime.source===base+'/client/subpackages/main/game.js',verified:runtimeLayoutVerified},packageArchivesVerified:false,packageArchiveNote:'Only decoded package files are included; encrypted .wxapkg archive hashes are recorded as provenance and are not claimed as verified.'};
}
const reference623=await verifyReference623();
const report={passed:errors.length===0,hashedFiles:hashed,parsedScripts:parsed,verifiedImages:images,registrationCount:modules.registrationCount,primaryRegisteredModules:modules.primaryCount,sharedCoreDeclarations:modules.core.length,configTables:configs.inputs.reduce((n,x)=>n+x.tables.length,0),textures:textures.converted,sprites:sprites.converted,ordinaryChainPaths:covered.size,ordinaryChainMissing:missingOrdinary.length,remainingOutOfScopeSpriteReferences:sprites.missingTextures,missingSubpackages:layout.missingSubpackages.map(p=>p.name),reference623,runtimeVerified:false,runtimeNote:'This report covers static recovery only. Runtime verification is recorded separately in docs/LOCAL_RUNTIME.md.',errors};
await fs.mkdir(path.join(root,'docs'),{recursive:true});
await fs.writeFile(path.join(root,'docs/verification.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report,null,2));
if(errors.length)process.exitCode=1;
