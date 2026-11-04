import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { parse } from 'acorn';
import prettier from 'prettier';

const root = path.resolve(import.meta.dirname, '..');
const relative = 'recovered/packages/401/_subpackages_main_/subpackages/main/game.js';
const text = await fs.readFile(path.join(root, relative), 'utf8');
const ast = parse(text, { ecmaVersion: 'latest', sourceType: 'script' });
const calls = [];
const coreNames = {
  M2: 'BoardController', 'G$': 'BoardRules', GW: 'BoardConfigParser', TJ: 'BoardProducts',
  b2: 'OrderState', EJ: 'BoardTransport', B9: 'TouchStart', D9: 'TouchMove', P9: 'TouchEnd',
  qqe: 'TouchCancel', an: 'BinaryReader', hn: 'BinaryDecoder', vn: 'BinaryDecodeEntry',
};
const coreDeclarations = new Map();
const stack = [ast];
while (stack.length) {
  const node = stack.pop();
  if (!node || typeof node !== 'object') continue;
  const c = node.callee;
  if(node.type==='VariableDeclarator' && coreNames[node.id?.name] && node.init) {
    const prior=coreDeclarations.get(node.id.name);
    if(!prior || node.end-node.start>prior.end-prior.start)coreDeclarations.set(node.id.name,node);
  }
  if (node.type === 'CallExpression' && c?.type === 'MemberExpression' && c.object?.type === 'MemberExpression' && c.object.object?.name === 'cc' && c.object.property?.name === '_RF') {
    const method = c.property?.name;
    if (method === 'push' && typeof node.arguments[2]?.value === 'string') calls.push({ method, start: node.start, end: node.end, uuid: node.arguments[1]?.value, name: node.arguments[2].value });
    if (method === 'pop') calls.push({ method, start: node.start, end: node.end });
  }
  for (const [key, value] of Object.entries(node)) {
    if (['start', 'end', 'loc', 'range'].includes(key)) continue;
    if (Array.isArray(value)) for (let i = value.length - 1; i >= 0; i--) if (value[i]?.type) stack.push(value[i]);
    if (value?.type) stack.push(value);
  }
}
calls.sort((a,b)=>a.start-b.start);
const registrations = [], frames = [];
for (const call of calls) {
  if (call.method === 'push') frames.push(call);
  else if (frames.length) {
    const frame = frames.pop();
    registrations.push({ name: frame.name, uuid: frame.uuid, start: frame.start, end: call.end });
  }
}
registrations.sort((a,b)=>a.start-b.start);
const main = new Set([
  'MergeScreen','MergeBoardRender','MergeCellLogic','MergeCellRender','MergeBoardCellBoxReward',
  'MergeItemView','MergeToucher','MergeAnim','MergeCompleteAnim','MergeConfirmWindow','MergeBoardToast',
  'CommonElement','ManuCreatorElement','AutoCreatorElement','HarvestElement','OrderElement',
  'BubbleElement','FrozenBubbleElement','AdBubbleElement','BagElement','ChestElement','BatteryElement',
  'DeterioratedElement','ManuUnlockElement','MagicBoxElement','DoorElement','StoreElement','StoreElementTip',
  'OrderInfo','OrderInfoRegister','OrderInfoItem','OrderItem','OrderList','OrderListItem','OrderDrawerUtil',
  'OrderDrawerWindow','OrderDrawerItem','OrderDrawerDetailWindow','OrderRecover','OrderGroupList',
  'ElementInfo','ElementInfoRenderInterface','ElementDetailInfo','ElementDetailWindow','ElementCloset',
  'PropCleanWebElement','PropClockElement','PropEnergyTowerElement','PropInsideBagElement','PropLampElement',
  'PropLevelUpElement','PropRechargeElement','PropRiskUpElement','PropScissorsElement',
  'PropUnlimitEnergyElement','PropSpeedUpElement','PropSuperSpeedUpElement','PropTimeSkipElement',
  'EnergyHud','EnergyWindow','EnergyRecoverWindow','MergeGuideHand','MergeGuideTip',
  'Goose','GooseBase','GooseUI','GooseOrderBubble','PlayerGoose','GoosePlayer','TaskManager',
]);
await fs.mkdir(path.join(root, 'readable/mainplay'), { recursive: true });
console.log(`Found ${registrations.length} Cocos registrations. Formatting bundle without executing it.`);
const full = await prettier.format(text, { parser: 'babel', printWidth: 100 });
await fs.writeFile(path.join(root, 'readable/game.formatted.js'), full);
const lineStarts = [0];
for (let i=0;i<full.length;i++) if(full.charCodeAt(i)===10)lineStarts.push(i+1);
function lineAt(offset) { let lo=0,hi=lineStarts.length;while(lo+1<hi){const m=(lo+hi)>>1;if(lineStarts[m]<=offset)lo=m;else hi=m;}return lo+1; }
const used = new Map();
for (const item of registrations) {
  const marker = new RegExp('cc\\._RF\\.push\\(\\s*\\{\\s*exports:\\s*\\{\\s*\\}\\s*\\},\\s*'+JSON.stringify(item.uuid).replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'\\s*,\\s*'+JSON.stringify(item.name).replace(/[.*+?^${}()|[\]\\]/g,'\\$&'));
  const match = marker.exec(full);
  item.formattedLine = match ? lineAt(match.index) : null;
  item.primary = main.has(item.name);
  item.byteLength = Buffer.byteLength(text.slice(item.start,item.end));
  if (item.primary) {
    const count=(used.get(item.name)||0)+1;used.set(item.name,count);
    item.file=`readable/mainplay/${item.name}${count>1?'-'+count:''}.js`;
    const segment=text.slice(item.start,item.end)+';\n';
    let formatted;
    try { formatted=await prettier.format(segment,{parser:'babel',printWidth:100}); }
    catch { formatted=segment;item.fragment=true; }
    const header=`// Extracted cached Cocos registration: ${item.name}\n// Source: ${relative}, UTF-16 offsets ${item.start}..${item.end}.\n// Shared closure variables remain in readable/game.formatted.js:${item.formattedLine||1}.\n// Analysis fragment; not an independently executable module.\n\n`;
    await fs.writeFile(path.join(root,item.file),header+formatted);
  }
}
const core=[];
for(const [symbol,n] of coreDeclarations){
  const name=coreNames[symbol],file=`readable/mainplay/${name}.js`;
  const fragment='var '+text.slice(n.start,n.end)+';\n';
  const formatted=await prettier.format(fragment,{parser:'babel',printWidth:100});
  const pattern=new RegExp('\\b'+symbol.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'\\s*=');
  const match=pattern.exec(full),formattedLine=match?lineAt(match.index):null;
  await fs.writeFile(path.join(root,file),`// Original shared-closure declaration ${symbol}: ${name}\n// Source UTF-16 offsets ${n.start}..${n.end}; complete context in game.formatted.js:${formattedLine||1}.\n// Analysis fragment; not independently executable.\n\n`+formatted);
  core.push({symbol,name,file,start:n.start,end:n.end,formattedLine});
}
const result={source:relative,sourceSha256:crypto.createHash('sha256').update(text).digest('hex'),registrationCount:registrations.length,primaryCount:registrations.filter(x=>x.primary).length,formattedFile:'readable/game.formatted.js',core,registrations};
await fs.writeFile(path.join(root,'readable/module-index.json'),JSON.stringify(result,null,2)+'\n');
const markdown=['# 客户端模块索引','',`共 ${result.registrationCount} 个 Cocos 注册项；提取 ${result.primaryCount} 个主玩法及关联模块，另有 ${core.length} 个共享核心声明。`,'','模块文件是共享闭包中的分析片段；完整上下文保存在 [game.formatted.js](game.formatted.js)，不能单独 require。','','| 核心声明 | 原符号 | 可读完整脚本行号 |','| --- | --- | ---: |',...core.map(x=>`| [${x.name}](mainplay/${path.basename(x.file)}) | ${x.symbol} | ${x.formattedLine??'未匹配'} |`),'', '| 注册模块 | 可读完整脚本行号 | 原包字节数 |','| --- | ---: | ---: |',...registrations.filter(x=>x.primary).map(x=>`| [${x.name}](mainplay/${path.basename(x.file)}) | ${x.formattedLine??'未匹配'} | ${x.byteLength} |`),''];
await fs.writeFile(path.join(root,'readable/MAINPLAY.md'),markdown.join('\n'));
console.log(JSON.stringify({registrations:result.registrationCount,mainplay:result.primaryCount,formattedBytes:Buffer.byteLength(full),unmatched:registrations.filter(x=>!x.formattedLine).length}));
