const $=s=>document.querySelector(s);
const [assets,modules,boards]=await Promise.all([
  fetch('recovered/previews/sprites.json').then(r=>r.json()),
  fetch('readable/module-index.json').then(r=>r.json()),
  fetch('recovered/config/Config/Board.json').then(r=>r.json()),
]);
$('#modules').textContent=modules.registrationCount.toLocaleString();
$('#sprites').textContent=assets.converted.toLocaleString();
const files=assets.files.slice().sort((a,b)=>{
  const score=x=>x.path.includes('Texture/Element/')?0:x.path.includes('MergeUi')?1:2;
  return score(a)-score(b)||a.path.localeCompare(b.path,'zh-CN',{numeric:true});
});
let filter='all',shown=60;
function imagePath(asset){return 'recovered/previews/'+asset.png;}
function showDetail(a){
  $('#detail-img').src=imagePath(a);$('#detail-name').textContent=a.metadata?.name||a.path.split('/').pop();
  $('#detail-path').textContent=a.bundle+'/'+a.path;$('#detail-size').textContent=`${a.width} × ${a.height} px · 透明 PNG`;
  $('#download').href=imagePath(a);$('#detail').showModal();
}
function renderAssets(){
  const query=$('#search').value.toLowerCase();
  const found=files.filter(a=>(filter==='all'||a.path.toLowerCase().includes(filter.toLowerCase()))&&a.path.toLowerCase().includes(query));
  $('#count').textContent=`${found.length.toLocaleString()} 个素材 · 显示 ${Math.min(shown,found.length)} 个`;
  $('#asset-grid').replaceChildren();
  for(const a of found.slice(0,shown)){
    const b=document.createElement('button');b.className='asset';
    const thumb=document.createElement('span');thumb.className='thumb';
    const img=document.createElement('img');img.src=imagePath(a);img.alt=a.metadata?.name||a.path;img.loading='lazy';thumb.append(img);
    const title=document.createElement('strong');title.textContent=a.metadata?.name||a.path.split('/').pop();
    const meta=document.createElement('small');meta.textContent=`${a.width} × ${a.height} · ${a.bundle}`;
    b.append(thumb,title,meta);b.onclick=()=>showDetail(a);$('#asset-grid').append(b);
  }
  $('#more').hidden=shown>=found.length;
}
$('#search').oninput=()=>{shown=60;renderAssets();};$('#more').onclick=()=>{shown+=60;renderAssets();};
for(const b of document.querySelectorAll('[data-filter]'))b.onclick=()=>{
  filter=b.dataset.filter;shown=60;document.querySelectorAll('[data-filter]').forEach(x=>x.classList.toggle('active',x===b));renderAssets();
};
for(const b of document.querySelectorAll('[data-tab]'))b.onclick=()=>{
  document.querySelectorAll('.tab').forEach(x=>x.hidden=x.id!==b.dataset.tab);
  document.querySelectorAll('[data-tab]').forEach(x=>x.classList.toggle('active',x===b));
};
$('#close').onclick=()=>$('#detail').close();$('#detail').onclick=e=>{if(e.target===$('#detail'))$('#detail').close();};
const descriptions={BoardController:'棋盘状态、格子移动与缓存',BoardRules:'合成判定、邻格解锁与产物规则',BoardProducts:'生成产物与产出请求',BoardConfigParser:'棋盘与元素配置转换',OrderState:'订单需求匹配与道具检查',BoardTransport:'客户端棋盘请求与同步',CommonElement:'合成、移动、蛛网与物品行为',ManuCreatorElement:'点击产出、体力与冷却',MergeToucher:'触摸输入分发',OrderItem:'订单交互与完成请求',BagElement:'背包存放行为',TouchEnd:'拖拽结束与合成入口'};
const important=[...(modules.core||[]),...modules.registrations.filter(x=>['CommonElement','ManuCreatorElement','OrderItem','BagElement','MergeToucher','MergeScreen'].includes(x.name))];
for(const m of important){
  const b=document.createElement('button');b.className='code-card';const name=document.createElement('strong');name.textContent=m.name;
  const desc=document.createElement('span');desc.textContent=descriptions[m.name]||'原始共享闭包声明';b.append(name,desc);
  b.onclick=async()=>{const pre=$('#source');pre.hidden=false;pre.textContent='读取中…';try{const r=await fetch(m.file);if(!r.ok)throw Error(r.status);pre.textContent=await r.text();pre.scrollIntoView({behavior:'smooth',block:'start'});}catch{pre.textContent='文件读取失败';}};$('#code-grid').append(b);
}
const idMap=new Map();for(const a of files){const id=a.metadata?.name;if(/^\d+$/.test(id||''))idMap.set(String(id),a);const tail=a.path.split('/').pop();if(/^\d+$/.test(tail))idMap.set(tail,a);}
for(const [row,r] of boards['1'].element.entries())for(const [col,encoded] of r.entries()){
  const [id,state,variant]=encoded.split(':');const b=document.createElement('button');b.className='board-cell'+(state==='3'?' covered':state==='1'?' webbed':'');b.setAttribute('aria-label',`第${row+1}行第${col+1}列 道具${id}`);
  if(state!=='3'&&idMap.has(id)){const img=document.createElement('img');img.src=imagePath(idMap.get(id));img.alt=id;b.append(img);}
  else if(state!=='3')b.append(document.createTextNode(id));
  const small=document.createElement('small');small.textContent=state==='3'?'箱 '+(variant||''):id;b.append(small);
  b.onclick=()=>{$('#cell-info').textContent=`第 ${row+1} 行，第 ${col+1} 列\n道具 ID：${id}；状态：${state}${variant?'；遮盖变体：'+variant:''}。原始值：${encoded}`;};$('#board-grid').append(b);
}
renderAssets();
