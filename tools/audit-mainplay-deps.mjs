import fs from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const json=async p=>JSON.parse(await fs.readFile(p,'utf8'));
async function files(dir){const out=[];for(const d of await fs.readdir(dir,{withFileTypes:true})){const p=path.join(dir,d.name);if(d.isDirectory())out.push(...await files(p));else out.push(p);}return out;}
function uuid(s){
  if(typeof s!=='string'||s.length!==22)return s;
  const base='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',hex='0123456789abcdef';
  let out=s.slice(0,2);
  for(let i=2;i<22;i+=2){const a=base.indexOf(s[i]),b=base.indexOf(s[i+1]);if(a<0||b<0)return s;out+=hex[a>>2]+hex[((a&3)<<2)|(b>>4)]+hex[b&15];}
  return out.slice(0,8)+'-'+out.slice(8,12)+'-'+out.slice(12,16)+'-'+out.slice(16,20)+'-'+out.slice(20);
}
const roots=[path.join(root,'recovered/remote/asset/remote'),path.join(root,'client/assets'),path.join(root,'client/subpackages'),path.join(root,'recovered/downloads/asset/remote')];
const allFiles=(await Promise.all(roots.map(files))).flat();
const configs=allFiles.filter(p=>/config\.[^.]+\.json$/.test(p));
const assets=[],byUuid=new Map(),byPath=new Map(),byAssetPath=new Map(),nativeFiles=new Map();
const diskFiles=[...new Set([...allFiles,...await files(path.join(root,'recovered/downloads'))])];
for(const file of diskFiles){const p=file.replaceAll('\\','/');const match=/\/native\/[^/]+\/([^/]+)/.exec(p);if(match){const u=match[1].split('.')[0];if(!nativeFiles.has(u))nativeFiles.set(u,[]);nativeFiles.get(u).push(path.relative(root,file).replaceAll('\\','/'));}}
for(const cf of configs){
  const c=await json(cf),dir=path.dirname(cf),versions=new Map();
  for(let i=0;i<(c.versions?.native||[]).length;i+=2)versions.set(String(c.versions.native[i]),c.versions.native[i+1]);
  const packData=new Map();
  for(const [pack,indexes]of Object.entries(c.packs||{})){
    const candidates=(await files(path.join(dir,'import')).catch(()=>[])).filter(p=>path.basename(p).startsWith(pack+'.'));
    if(candidates[0]){const data=await json(candidates[0]);if(data.length===6&&Array.isArray(data[5]))for(let n=0;n<indexes.length;n++)packData.set(String(indexes[n]),{section:data[5][n],shared:data[1],classes:data[3],masks:data[4]});}
  }
  for(let index=0;index<c.uuids.length;index++){
    const id=uuid(c.uuids[index]),meta=c.paths?.[index],record=packData.get(String(index)),section=record?.section;
    const nativeVersion=versions.get(String(index))??versions.get(String(c.uuids[index]));
    let inferred='';
    if(section){let cls;if(Array.isArray(section[1])&&section[1][0]>=0)cls=record.classes[section[1][0]];else if(Array.isArray(section[0]?.[0]))cls=record.classes[record.masks[section[0][0][0]]?.[0]];inferred=typeof cls==='string'?cls:cls?.[0]||'';}
    const type=meta?c.types[meta[1]]:inferred;
    const originalNative=Array.isArray(section?.[0]?.[0])?section[0][0].find(v=>typeof v==='string'&&/^\.(?:mp3|wav|ogg|m4a|bin|ttf|atlas|fnt|txt|json)$/.test(v)):null;
    const nativeExt=originalNative||(type==='cc.Texture2D'?'.pvr':type==='sp.SkeletonData'||type==='cc.BufferAsset'?'.bin':type==='cc.AudioClip'?'.mp3':type==='cc.TTFFont'?'.ttf':'');
    const a={bundle:c.name,index,uuid:id,path:meta?.[0]||'',type,nativeExt,config:path.relative(root,cf).replaceAll('\\','/'),nativeVersion,dependencies:section&&Array.isArray(section[5])?[...new Set(section[5].map(i=>uuid(record.shared[i])))].filter(Boolean):[],hasSection:!!section};
    a.hasNative=!!nativeVersion||!!(section&&typeof section[0]?.at(-1)==='number'&&section[0].at(-1)<0);
    a.nativeFiles=nativeFiles.get(id)||[];
    assets.push(a);if(!byUuid.has(id)||(!byUuid.get(id).hasSection&&a.hasSection))byUuid.set(id,a);
    if(a.path){byPath.set(c.name+':'+a.path,a);const paths=byAssetPath.get(a.path)||[];if(!paths.some(x=>x.uuid===a.uuid))paths.push(a);byAssetPath.set(a.path,paths);}
  }
}
const seedNames=['Prefab/UI/Merge/MergeScreen','Prefab/UI/Home/HomeScreen','Prefab/UI/Home/MainUi','Prefab/Merge/Board/MergeCell','Prefab/UI/Merge/orderItem','Prefab/UI/Merge/orderListItem','Prefab/UI/Merge/channelItem','Prefab/UI/Merge/OrderDrawerWindow'];
seedNames.push('Prefab/UI/Home/SwitchWindow','Prefab/UI/LevelGift/LevelGiftWindow','Prefab/UI/Merge/ClosetWindow','Prefab/UI/Merge/ElementDetailWindow','Prefab/UI/Home/EnergyWindow','Prefab/UI/Home/LevelUpWindow','Prefab/UI/Home/LevelUpRewardWindow','Prefab/UI/Merge/OrderDrawerDetailWindow','Prefab/UI/Merge/OrderDrawerUnlockWindow');
seedNames.push('Prefab/Map/mainMap','Prefab/Map/streetMap','Prefab/UI/Build/BuildEditEnter','Prefab/LoadingMini/BuildLoad','Texture/Bg/ui_bg_Switch','Texture/Bg/ui_bg_SwitchHome');
seedNames.push('Prefab/UI/Build/BuildDetailsWindow');
seedNames.push('Prefab/UI/Build/AdornWindow','Prefab/UI/Build/BuildEdit','Prefab/UI/Build/BuildWindow','Prefab/UI/Home/TaskBtn','Prefab/UI/Build/AdornGetWindow','Prefab/UI/Build/AreaFinishWindow','Prefab/UI/Build/AreaDetailsWindow','Prefab/UI/Build/BuildStar','Prefab/UI/Build/BuildStepProgress','Prefab/UI/Build/Tile','Prefab/UI/Build/QualityHud','Prefab/UI/Build/newDay');
seedNames.push('Texture/Npc/npc_goose_01');
seedNames.push('Spine/Player/player2','Texture/Head/icon_tx_02','Texture/Headbox/pi_txk_01');
const animationNames=['Cover1','Cover2','Cover3','Cover4','CoverEnd1','CoverEnd2','CoverEnd3','CoverEnd4','Lock','Selected','SelectedNot','SelectedOrder','SelectedTimeOrder','CanMerge','ManuCreator','ManuCreatorEnergy','AutoCreator','AutoCreatorEnergy','GetEnergy','Putin','Merge1','Merge2','Merge3','Merge4','MergeEnd','MergeComplete','ElementMerge','ElementDisappear','Disappear','Bubble','BubbleEnd','BubbleUnlock','Order','ClickTips','BagTips','ClockDisappear','ManuOpen','ManuOpened','SpeedUp','SuperSpeedUp','ChestLockTips','PutBagEnd','GetBagEnd'];
seedNames.push(...animationNames.map(n=>'Prefab/layerAnim/'+n+'Anim'),'Prefab/NewElement/element','Prefab/NewElement/element_ready','Prefab/NewElement/element_finish');
seedNames.push('Prefab/Common/Loading','Common/UI/alertDefault','Common/UI/toastDefault','Common/UI/weakNetDefault','Common/UI/ItemTipsDefault','Common/UI/PopDefault');
const formatted=await fs.readFile(path.join(root,'readable/game.formatted.js'),'utf8');
const tcEnd=formatted.indexOf('})(TC || (TC = {}))');
const tcStart=formatted.lastIndexOf('(!(function (e)',tcEnd);
if(tcEnd<0||tcStart<0||tcEnd-tcStart>20000)throw new Error('Original TC enum boundaries changed');
const allAnimationNames=[...new Set([...formatted.slice(tcStart,tcEnd).matchAll(/e\.\w+\s*=\s*"([^"]+)"/g)].map(m=>m[1]))];
if(allAnimationNames.length<100)throw new Error('Unexpected incomplete original animation enum');
const allAnimationPaths=allAnimationNames.map(n=>'Prefab/layerAnim/'+n+'Anim');
seedNames.push(...allAnimationPaths);
seedNames.push('Common/Guide/GuideMask','Common/Guide/GuideHand','Common/Guide/GuideTalk','Common/Guide/GuideTip','Prefab/UI/Merge/MergeGuideHand');
seedNames.push(...Array.from({length:17},(_,i)=>'Sound/guidevoice'+(i+1)));
const mainSounds=['click','coin','closeui','close_window','openui','getreward','bg_main','toast','levelup','finish_order','finish_order_low','finish_order_mid','finish_order_high','tip_order','tip_order_element','build','screen_switch','harvest_element','harvest_coin','new_goose','prop_use_energy','prop_use_time_skip','prop_use_speed_up','prop_use_clock','prop_end_energy','mergeCreate','mergeCreateExp','mergeCreateBubble','sfx_ItemGenerateFail','mergeSelectBubble','mergeEndBubble','mergePutBag'];
seedNames.push(...mainSounds.map(n=>'Sound/'+n),...Array.from({length:14},(_,i)=>'Sound/mergeElement'+(i+2)));
// Original ordinary item prefabs are loaded dynamically and are absent from screen dependency lists.
for(const a of assets)if(/^Prefab\/Element\/[A-I]_\d+\/\d+$/.test(a.path))seedNames.push(a.path);
for(const a of assets)if(/^Prefab\/Element\/(?:Coin|Energy|Diamond|Exp|Bag)\/\d+$/.test(a.path))seedNames.push(a.path);
for(const a of assets)if(a.path.startsWith('Prefab/UI/Merge/OrderExtraReward/'))seedNames.push(a.path);
// Main-story dialogue dynamically chooses NPC poses; include every declared pose
// across restored original bundles so subsequent dialogue does not miss an alias.
for(const a of assets)if(a.path.startsWith('Texture/Npc/'))seedNames.push(a.path);
// Broken initial room pieces and default first-room furnishing are selected from original config.
for(const a of assets)if(/^Prefab\/Map\/area01\/\d{4}00(?:_effect)?$/.test(a.path))seedNames.push(a.path);
const skinGroups=await json(path.join(root,'recovered/config/Config/AdronSkin.json'));
for(const group of Object.values(skinGroups))for(const skin of Object.values(group))if(skin.isDefault&&skin.prefab?.startsWith('area01/')){
  seedNames.push('Prefab/Map/'+skin.prefab,'Prefab/Map/'+skin.prefab+'_effect');
  if(skin.icon)seedNames.push('Texture/Map/'+skin.icon);
}
for(const a of assets)if(/^Prefab\/Map\/area01\/1001\d{2}(?:_effect)?$/.test(a.path)||/^Texture\/Map\/area01\/icon\/icon_guitai_\d+$/.test(a.path))seedNames.push(a.path);
const buildGroups=await json(path.join(root,'recovered/config/Config/Build.json'));
const elementGroups=await json(path.join(root,'recovered/config/Config/element.json'));
const elementLookup=Object.assign({},...Object.values(elementGroups));
for(const build of Object.values(buildGroups.Main||{}))if(build.area===1)for(const [id,count]of Object.entries(build.reward||{}))if(/^\d+$/.test(id)&&Number(count)>0){
  const e=elementLookup[id];if(e)seedNames.push(`Prefab/Element/${e.series}/${e.id}`);
}
const extraFile=path.join(root,'docs/original-extra-native-seeds.json');
const extra=await json(extraFile).catch(()=>[]);
for(const arg of process.argv.slice(2))if(arg.startsWith('--uuid=')){
  const id=arg.slice(7);if(!byUuid.has(id))throw new Error('Native request is not declared in original bundle metadata: '+id);
  if(!extra.includes(id))extra.push(id);
}
await fs.writeFile(extraFile,JSON.stringify(extra.sort(),null,2)+'\n');
const rootMap=new Map();
for(const p of new Set(seedNames))for(const a of byAssetPath.get(p)||[])rootMap.set(a.uuid,a);
for(const id of extra)if(byUuid.has(id))rootMap.set(id,byUuid.get(id));
const rootsFound=[...rootMap.values()],visited=new Map(),queue=[...rootsFound],unresolved=[];
while(queue.length){const seed=queue.pop(),a=byUuid.get(seed.uuid)||seed;if(visited.has(a.uuid))continue;visited.set(a.uuid,a);for(const dependency of a.dependencies){if(byUuid.has(dependency))queue.push(byUuid.get(dependency));else unresolved.push({source:a.path||a.uuid,dependency});}}
const native=[...visited.values()].filter(a=>a.hasNative),missing=native.filter(a=>!a.nativeFiles.length);
const result={method:'Independent static dependency reader based on Cocos compiled JSON section[5] UUID indices; no recovered script execution',animationEnumCount:allAnimationNames.length,missingAnimationPaths:allAnimationPaths.filter(p=>!byAssetPath.has(p)),seeds:rootsFound.map(a=>({path:a.path,uuid:a.uuid})),assets:[...visited.values()],nativeCount:native.length,missingNative:missing,unresolvedDependencies:unresolved};
await fs.writeFile(path.join(root,'docs/original-mainplay-dependencies.json'),JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({animationEnumCount:result.animationEnumCount,missingAnimationPaths:result.missingAnimationPaths,seeds:rootsFound.length,assets:visited.size,native:native.length,missingNative:missing.length,missingByType:Object.fromEntries([...new Set(missing.map(a=>a.type))].map(t=>[t,missing.filter(a=>a.type===t).length])),unresolved:unresolved.length,examples:missing.slice(0,12).map(a=>({bundle:a.bundle,path:a.path,type:a.type,uuid:a.uuid,version:a.nativeVersion}))},null,2));
