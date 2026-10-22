'use strict';
function renderFeed(parent){
 const ae=snapshot.ae_data,selection=new Set();
 const description=document.createElement('p');description.textContent='Pilih bus dan channel, tentukan tindakan, lalu Terapkan. KEEP mempertahankan nilai yang ada.';parent.append(description);
 const bus=document.createElement('select');Object.keys(ae.bus).forEach(k=>bus.add(new Option(`Bus ${k} · ${ae.bus[k].name||''}`,k)));parent.append(bus);
 const toolbar=document.createElement('div');toolbar.className='grid';parent.append(toolbar);
 const all=document.createElement('button'),none=document.createElement('button');all.textContent='Semua channel';none.textContent='Kosongkan';toolbar.append(all,none);
 const sources=document.createElement('div');sources.className='tags';parent.append(sources);
 const count=document.createElement('p');count.setAttribute('aria-live','polite');parent.append(count);
 function channels(){sources.replaceChildren();for(const [k,c]of Object.entries(ae.ch)){if(!c.send?.[bus.value])continue;const label=document.createElement('label'),box=document.createElement('input');box.type='checkbox';box.checked=selection.has(k);label.append(box,document.createTextNode(`CH ${k} ${c.name||''}`));sources.append(label);box.onchange=()=>{box.checked?selection.add(k):selection.delete(k);update();};}update();}
 function update(){count.textContent=`${selection.size} channel dipilih`;}
 all.onclick=()=>{Object.keys(ae.ch).filter(k=>ae.ch[k].send?.[bus.value]).forEach(k=>selection.add(k));channels();};none.onclick=()=>{selection.clear();channels();};bus.onchange=()=>{selection.clear();channels();};
 const actions={};
 for(const [key,title,options]of [
 ['mode','Send Mode',[['PRE','TAP / PRE'],['POST','POST'],['GRP','GROUP']]],
 ['ignore','Ignore Channel Mute · khusus TAP/PRE',[['OFF','SET OFF'],['ON','SET ON']]],
 ['pan','Send Panning',[['CENTER','SET TO CENTER'],['COPY','SET TO CH PAN'],['LINK','LINK TO CH PAN'],['REVERSE','LINK REVERSED']]],
 ['level','Send Level',[['MIN','SET TO −∞ dB'],['M10','SET TO −10 dB'],['ZERO','SET TO 0 dB'],['FADER','FROM CH FDR']]],
 ['enable','Send Enable',[['OFF','SET OFF'],['ON','SET ON'],['MUTE','FROM CH MUTE']]]]){
 const label=document.createElement('label');label.textContent=title;const select=document.createElement('select');select.add(new Option('KEEP','KEEP'));options.forEach(([v,t])=>select.add(new Option(t,v)));label.append(select);parent.append(label);actions[key]=select;
 }
 const result=document.createElement('p');result.setAttribute('role','status');const apply=document.createElement('button');apply.textContent='Terapkan ke channel terpilih';parent.append(apply,result);
 apply.onclick=()=>{try{if(!selection.size)throw Error('Pilih minimal satu channel.');const edits=WingFeed.applyFeed(snapshot,bus.value,[...selection],Object.fromEntries(Object.entries(actions).map(([k,e])=>[k,e.value])));edits.forEach(e=>changes.add(`ch.${e.channel}.send.${e.bus}.${e.key}`));result.textContent=`Selesai · ${selection.size} channel, ${edits.length} nilai berubah.`;$('status').textContent=`${changes.size} field diedit. Unduh snapshot untuk menyimpan.`;}catch(e){result.textContent=e.message;}};channels();
}
