import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { parse } from 'acorn';

const root = path.resolve(import.meta.dirname, '..');
const manifestPath=path.join(root,'recovered/manifest.json');
const manifest=JSON.parse(await fs.readFile(manifestPath,'utf8'));
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const report=[];
for(const pack of manifest.packages) for(const entry of pack.files) {
  if(!entry.path.endsWith('.js'))continue;
  const file=path.join(root,'recovered',entry.path);
  const source=await fs.readFile(file,'utf8');
  const ast=parse(source,{ecmaVersion:'latest',sourceType:'script'});
  const pending=[ast],ranges=[];
  while(pending.length){
    const n=pending.pop();
    let key,value;
    if(n.type==='AssignmentExpression'&&n.left.type==='MemberExpression'){
      key=n.left.property.name??n.left.property.value;value=n.right;
    } else if(n.type==='Property') {key=n.key.name??n.key.value;value=n.value;}
    if(key==='wxAdSecretKey'&&value?.type==='Literal'&&typeof value.value==='string'&&value.value&&!value.value.startsWith('REDACTED_'))ranges.push({start:value.start,end:value.end,key,length:value.value.length});
    for(const v of Object.values(n)){
      if(Array.isArray(v))for(const x of v)if(x?.type)pending.push(x);
      if(v?.type)pending.push(v);
    }
  }
  if(!ranges.length)continue;
  const originalSha256=sha(Buffer.from(source));
  const backup=path.join(root,'.local-originals',entry.path);
  await fs.mkdir(path.dirname(backup),{recursive:true});
  try{await fs.writeFile(backup,source,{flag:'wx'});}catch(e){if(e.code!=='EEXIST')throw e;}
  let output=source;
  for(const r of ranges.sort((a,b)=>b.start-a.start)){
    const value='REDACTED_FOR_REPOSITORY'.padEnd(r.length,'_').slice(0,r.length);
    const replacement=JSON.stringify(value);
    if(replacement.length!==r.end-r.start)throw new Error('Unexpected secret literal length; manual review needed');
    output=output.slice(0,r.start)+replacement+output.slice(r.end);
    report.push({file:'recovered/'+entry.path,key:r.key,start:r.start,end:r.end,originalLength:r.length});
  }
  await fs.writeFile(file,output);
  entry.originalSha256=entry.originalSha256??originalSha256;
  entry.sha256=sha(Buffer.from(output));entry.bytes=Buffer.byteLength(output);
  entry.sanitizedFields=[...new Set(ranges.map(r=>r.key))];
}
if(report.length){
  manifest.sanitization={note:'One bundled SDK secret value redacted; original local backup is gitignored. No gameplay logic changed.',fields:report};
  await fs.writeFile(manifestPath,JSON.stringify(manifest,null,2)+'\n');
}
console.log(JSON.stringify({redactedValues:report.length,fieldNames:[...new Set(report.map(r=>r.key))]}));
