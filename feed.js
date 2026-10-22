(function(root){
'use strict';
function applyFeed(snapshot,bus,channels,actions){
 const allowed={mode:['KEEP','PRE','POST','GRP'],ignore:['KEEP','OFF','ON'],pan:['KEEP','CENTER','COPY','LINK','REVERSE'],level:['KEEP','MIN','M10','ZERO','FADER'],enable:['KEEP','OFF','ON','MUTE']};
 for(const [k,values]of Object.entries(allowed))if(!values.includes(actions[k]??'KEEP'))throw Error('Pilihan tidak valid: '+k);
 const edits=[];
 for(const key of [...new Set(channels)]){const c=snapshot.ae_data.ch[key],s=c?.send?.[bus];if(!s||typeof c.pan!=='number'||typeof c.fdr!=='number'||typeof c.mute!=='boolean')throw Error('Sumber channel tidak lengkap: '+key);
 const next={...s},a={mode:'KEEP',ignore:'KEEP',pan:'KEEP',level:'KEEP',enable:'KEEP',...actions};
 if(a.mode!=='KEEP')next.mode=a.mode;
 if(a.ignore!=='KEEP'){if(next.mode!=='PRE')throw Error('Ignore Channel Mute hanya berlaku pada TAP/PRE.');next.pon=a.ignore==='ON';}
 if(a.pan!=='KEEP'){next.plink=a.pan==='LINK'?1:a.pan==='REVERSE'?2:0;next.pan=a.pan==='CENTER'?0:a.pan==='REVERSE'?-c.pan:c.pan;}
 if(a.level!=='KEEP')next.lvl=a.level==='MIN'?-144:a.level==='M10'?-10:a.level==='ZERO'?0:c.fdr;
 if(a.enable!=='KEEP')next.on=a.enable==='ON'||a.enable==='MUTE'&&!c.mute;
 for(const k of Object.keys(next))if(next[k]!==s[k])edits.push({channel:String(key),bus:String(bus),key:k,value:next[k]});
 }
 for(const e of edits)snapshot.ae_data.ch[e.channel].send[e.bus][e.key]=e.value;
 return edits;
}
if(typeof module!=='undefined')module.exports={applyFeed};else root.WingFeed={applyFeed};
})(globalThis);
