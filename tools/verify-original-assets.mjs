import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
const root=path.resolve(import.meta.dirname,'..');
const read=async p=>JSON.parse(await fs.readFile(path.join(root,p),'utf8'));
const [graph,tex,sprites,downloads,cache,client]=await Promise.all([
  read('docs/original-mainplay-dependencies.json'),read('recovered/previews/textures.json'),read('recovered/previews/sprites.json'),read('recovered/downloads/manifest.json'),read('recovered/manifest.json'),read('client/layout-index.json'),
]);
const hashes=new Map();
for(const f of downloads.files)hashes.set('recovered/downloads/'+f.path,f.sha256);
for(const f of cache.remote)hashes.set('recovered/'+f.path,f.sha256);
for(const pack of cache.packages)for(const f of pack.files)hashes.set('recovered/'+f.path,f.sha256);
for(const f of client.files)hashes.set('client/'+f.path,f.sha256);
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const issues=[],checkedNative=new Set(),checkedPng=new Set();
for(const a of graph.assets){
  if(!a.hasSection)issues.push({kind:'missing-import-section',uuid:a.uuid,path:a.path});
  if(!a.hasNative)continue;
  const candidates=(a.nativeFiles||[]).filter(p=>!a.nativeVersion||p.includes('.'+a.nativeVersion));
  if(!candidates.length){issues.push({kind:'missing-native-file',uuid:a.uuid,path:a.path});continue;}
  const source=candidates[0];
  if(!checkedNative.has(source)){
    checkedNative.add(source);const b=await fs.readFile(path.join(root,source));
    const expected=hashes.get(source);
    if(!expected)issues.push({kind:'native-hash-not-indexed',source});
    else if(hash(b)!==expected)issues.push({kind:'native-hash-mismatch',source});
  }
  if(source.endsWith('.pvr')){
    const base=path.basename(source);
    const decoded=tex.files.find(f=>path.basename(f.source)===base);
    if(!decoded){issues.push({kind:'missing-decoded-texture',source});continue;}
    const png='recovered/previews/'+decoded.png;
    if(!checkedPng.has(png)){
      checkedPng.add(png);const b=await fs.readFile(path.join(root,png));
      if(b.readUInt32BE(0)!==0x89504e47)issues.push({kind:'invalid-png',png});
      if(decoded.pngSha256&&hash(b)!==decoded.pngSha256)issues.push({kind:'png-hash-mismatch',png});
      if(b.readUInt32BE(16)!==decoded.width||b.readUInt32BE(20)!==decoded.height)issues.push({kind:'png-dimensions-mismatch',png});
    }
  }
}
if(tex.failed||sprites.failed)issues.push({kind:'decoder-or-crop-errors',textures:tex.failed,sprites:sprites.failed});
if(!graph.animationEnumCount||graph.missingAnimationPaths?.length)issues.push({kind:'incomplete-original-animation-enum',count:graph.animationEnumCount,missing:graph.missingAnimationPaths});
const result={passed:issues.length===0,scope:'Original cached mainplay, ordinary A-I item prefabs, full original TC animation enum, original loading/tips, HUD, guide and voices, all declared Texture/Npc poses across restored bundles, transitions, core build windows, initial room geometry and default furnishings',animationEnumCount:graph.animationEnumCount,missingAnimationPaths:graph.missingAnimationPaths,seeds:graph.seeds.length,assetDefinitions:graph.assets.length,nativeDefinitions:graph.nativeCount,verifiedNativeFiles:checkedNative.size,verifiedDecodedPngs:checkedPng.size,missingNative:graph.missingNative.length,unresolvedReferences:graph.unresolvedDependencies.length,textureCount:tex.converted,spriteCount:sprites.converted,issues};
await fs.writeFile(path.join(root,'docs/original-assets-acceptance.json'),JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify(result,null,2));if(issues.length)process.exitCode=1;
