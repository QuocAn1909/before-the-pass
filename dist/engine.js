(function(root){
 const norm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9#\s-]/g,' ').replace(/\s+/g,' ').trim();
 const has=(s,r)=>r.test(s);
 function interpret(raw){
  const s=norm(raw);if(!s)return {type:'unknown',reason:'Enter your instruction.'};
  const jersey=s.match(/(?:#|number\s*|no\s*|so\s*|ao\s*|player\s*|cau thu\s*|pass\s*|chuyen\s*)([0-9]{1,2})\b/);
  const keeperTarget=/\b(goalkeeper|keeper|goalie|thu mon|gk)\b/.test(s);const named=jersey?Number(jersey[1]):(keeperTarget?1:null);
  const target=has(s,/\b(back|behind|lai|ve sau|ve thu mon|ho tro|keeper|goalkeeper|gk|thu mon)\b/)?'back':has(s,/\b(wide|wing|flank|bien|canh|right|left)\b/)?'wide':'inside';
  if(has(s,/\b(run|move|make a run|di chuyen|chay cho|bam bien|overlap|get into|vao vong cam|into the box|len vong cam|cut inside|chay len|get closer|closer to|approach|advance|move up|push up|move forward)\b/) &&
     (named!==null || has(s,/\b(player|teammate|dong doi|cau thu|he|him|number|so|ao)\b/)))return {type:'run',jersey:named,target:has(s,/\b(box|vong cam|inside|vao trong|trung lo|giua)\b/)?'box':target};
  if(has(s,/\b(shoot|shot|finish|strike|sut|da vao|ghi ban|volley|penalty kick|da phat den)\b/))return {type:'shoot',style:has(s,/\b(left|trai)\b/)?'left':has(s,/\b(right|phai)\b/)?'right':'center'};
  if(has(s,/\b(cross|cut back|cutback|square|can ngang|tat bong|chuyen ngang|pass|through|lay off|layback|chuyen|feed|play it|day bong|dua bong)\b/))return {type:'pass',jersey:named,target,keeper:keeperTarget};
  if(has(s,/\b(run|dribble|carry|drive|re bong|dan bong|dot pha|chay|tang toc|tien len|beat|take on|skill|stepover|qua nguoi|lac nguoi|re qua)\b/))return {type:'dribble'};
  if(has(s,/\b(hold|wait|shield|keep|giu bong|cau gio|slow|cho|giu)\b/))return {type:'hold'};
  if(named!==null)return {type:'unknown',reason:'Tell me what player #'+named+' should do: pass to, run into the box, or shoot.'};
  return {type:'unknown',reason:'I could not interpret that instruction safely. Try “pass to #2”, “tell #1 to run into the box”, “cross”, “shoot left”, or “hold”.'};
 }
 const dist=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1]);
 const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
 function create(sc,context){
  const players=[{id:'you',shirt:10,team:'home',pos:[...sc.you],name:'YOU'},...sc.mates.map((p,i)=>({id:'mate'+i,shirt:i+1,team:'home',pos:[...p],name:'#'+(i+1)})),{id:'keeper-home',shirt:1,team:'home',pos:[50,103],name:'GK'},...sc.opponents.map((p,i)=>({id:'opp'+i,shirt:i+1,team:'away',pos:[...p],name:'D'+(i+1)}))];
  return {scenario:sc,context,clock:55,score:context==='lead'?[1,0]:[0,1],players,owner:'you',ball:[...sc.you],turn:0,finished:false,history:[],result:''};
 }
 function pick(s,cmd,owner){
  const mates=s.players.filter(p=>p.team==='home'&&p.id!==owner.id);
  if(cmd.keeper)return mates.find(p=>p.id==='keeper-home')||null;
  if(cmd.jersey!==null){const exact=mates.find(p=>p.shirt===cmd.jersey&&p.id!=='keeper-home');return exact||null}
  return mates.slice().sort((a,b)=>{
   const rank=p=>cmd.target==='back'?-p.pos[1]:cmd.target==='wide'?-Math.abs(p.pos[0]-50):p.pos[1]+Math.abs(p.pos[0]-50)*.7;
   return rank(a)-rank(b);
  })[0];
 }
 function play(s,raw,aim){
  if(s.finished)return {ok:false,message:'This play is over. Start another scenario.'};
  const cmd=interpret(raw);if(cmd.type==='unknown')return {ok:false,message:cmd.reason};
  const owner=s.players.find(p=>p.id===s.owner),def=s.players.filter(p=>p.team==='away');
  const pressure=pt=>Math.min(...def.map(p=>dist(p.pos,pt)));
  const from=[...owner.pos];let to=[...from],event='',comment='',targetPlayer=null,cost=9;
  if(cmd.type==='run'){
   targetPlayer=cmd.jersey===null?s.players.find(p=>p.team==='home'&&p.id!==owner.id):s.players.find(p=>p.team==='home'&&p.shirt===cmd.jersey);
   if(!targetPlayer)return {ok:false,message:'There is no player #'+cmd.jersey+' on your team.'};
   if(targetPlayer.id===owner.id){ const initial=[...owner.pos];owner.pos=[owner.pos[0],Math.max(12,owner.pos[1]-19)];s.ball=[...owner.pos];return complete(s,{ok:true,type:'dribble',event:'dribble',from:initial,to:[...owner.pos],carrier:owner.id,text:'Player #'+owner.shirt+' advances toward goal with the ball.'},0); }
   const start=[...targetPlayer.pos];
   const dest=cmd.target==='box'?[clamp(targetPlayer.pos[0],35,65),clamp(targetPlayer.pos[1]-23,12,25)]:cmd.target==='wide'?[targetPlayer.pos[0]<50?15:85,Math.max(18,targetPlayer.pos[1]-16)]:[clamp(targetPlayer.pos[0],35,65),Math.max(17,targetPlayer.pos[1]-14)];
   targetPlayer.pos=dest;cost=6;event='run';
   comment='Player #'+targetPlayer.shirt+' makes a run '+(cmd.target==='box'?'into the penalty area':'into space')+'. The ball stays with '+owner.name+'. Your next decision?';
   to=[...s.ball];
   // Expose a second animation source and destination for off-ball runs.
   const out={ok:true,type:'run',event,from,to,runner:targetPlayer.id,runnerFrom:start,runnerTo:dest,carrier:owner.id,text:comment};
   return complete(s,out,cost);
  }
  if(cmd.type==='pass'){
   targetPlayer=pick(s,cmd,owner);
   if(!targetPlayer)return {ok:false,message:cmd.jersey!==null?'Cannot pass to #'+cmd.jersey+'. Available teammates are '+s.players.filter(p=>p.team==='home'&&p.id!==owner.id).map(p=>'#'+p.shirt).join(' and ')+'.':'No teammate available.'};
   to=[...targetPlayer.pos];cost=10;
   if(dist(from,to)>65&&pressure(to)<8){event='turnover';comment='The defender steps into the long passing lane and intercepts.';}
   else{event='pass';comment='Pass completed to player #'+targetPlayer.shirt+'. He controls it and looks for the next action.';}
  } else if(cmd.type==='shoot'){
   cost=0;
   const x=aim&&Number.isFinite(aim.x)?clamp(aim.x,4,96):cmd.style==='left'?40:cmd.style==='right'?60:50;
   const target=[x,3], goalLeft=34,goalRight=66;
   const inBox=from[1]<=21&&from[0]>=22&&from[0]<=78;
   // For a shot aimed into goal from within the penalty area, it always scores in this teaching prototype.
   const onGoal=x>=goalLeft&&x<=goalRight;
   const nearKeeper=Math.abs(x-50)<6;
   const blockedDefender=!inBox&&def.find(p=>{
    const ax=from[0],ay=from[1],vx=target[0]-ax,vy=target[1]-ay;
    const t=clamp(((p.pos[0]-ax)*vx+(p.pos[1]-ay)*vy)/(vx*vx+vy*vy),0,1);
    const hit=[ax+t*vx,ay+t*vy];
    return t>.1&&t<.93&&dist(hit,p.pos)<3.8;
   });
   if(blockedDefender){event='turnover';to=[...blockedDefender.pos];comment='BLOCKED! The ball hits defender #'+blockedDefender.shirt+' before reaching goal.';}
   else if(!onGoal){event='turnover';to=[x,3];comment='WIDE! The shot misses the posts.';}
   else if(!inBox&&nearKeeper){event='turnover';to=[x,6];comment='SAVED! The goalkeeper reaches the shot.';}
   else {event='goal';to=[x,3];comment='GOAL! The goalkeeper dives but cannot reach the ball.';}
    } else if(cmd.type==='dribble'){
   cost=9;to=[clamp(from[0]+(from[0]<50?4:-4),8,92),Math.max(15,from[1]-17)];
   event=pressure(to)<5?'turnover':'dribble';comment=event==='turnover'?'The defender times the tackle.':'A quick change of direction beats the first defender — you carry into space!';
  } else {event='hold';cost=17;comment='You protect possession. The clock runs down.'}
  const out={ok:true,type:cmd.type,event,from,to,carrier:targetPlayer?.id||owner.id,text:comment};
  if(event==='pass')s.owner=targetPlayer.id;
  if(event==='dribble')owner.pos=[...to];
  return complete(s,out,cost);
 }
 function complete(s,out,cost){
  s.turn++;
  if(out.event==='pass'||out.event==='dribble'||out.event==='hold'||out.event==='run')s.ball=[...out.to];
  if(out.event==='goal'){s.score[0]++;s.ball=[...out.to];s.finished=true;s.result='GOAL — You score!'}
  if(out.event==='turnover'){s.ball=[...out.to];s.finished=true;s.result='POSSESSION LOST — The move ends.'}
  if(!s.finished){for(const d of s.players.filter(p=>p.team==='away')){
    d.pos=[d.pos[0]+Math.sign(s.ball[0]-d.pos[0])*Math.min(3,Math.abs(s.ball[0]-d.pos[0])),d.pos[1]+Math.sign(s.ball[1]-d.pos[1])*Math.min(3,Math.abs(s.ball[1]-d.pos[1]))];
  }}
  if(s.clock===0&&!s.finished){s.finished=true;s.result=s.context==='lead'?'FULL TIME — Lead protected!':'FULL TIME — No equalizer.';out.event='fulltime';out.text+=' The referee blows for full time.';}
  s.history.push({input:'',event:out.event,text:out.text,time:s.clock});
  return out;
 }
 function applyFormation(s,name){
 if(!root.Formations) return s;
 const ours=root.Formations.layout(name,true),theirs=root.Formations.layout(name,false);
 const owner=s.players.find(p=>p.id===s.owner);
 const home=ours.map((p,i)=>({id:p.shirt===1?'keeper-home':p.shirt===10?'you':'mate'+p.shirt,shirt:p.shirt,team:'home',pos:[p.x,p.y],name:p.shirt===1?'GK':'#'+p.shirt}));
 const away=theirs.map(p=>({id:'opp'+p.shirt,shirt:p.shirt,team:'away',pos:[p.x,p.y],name:'D'+p.shirt}));
 s.players=[...home,...away];s.owner=home.find(p=>p.shirt===10)?.id||home[0].id;s.ball=[...s.players.find(p=>p.id===s.owner).pos];return s;
}
 const api={interpret,create,play,applyFormation,distance:dist};
 if(typeof module!=='undefined')module.exports=api;root.SoccerEngine=api;
})(typeof window!=='undefined'?window:globalThis);
