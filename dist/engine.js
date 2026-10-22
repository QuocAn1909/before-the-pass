/* Deterministic, rule-based decisions. No live AI service. */
(function(root){
 const clean=s=>(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').trim();
 function interpret(text){
  const s=clean(text);
  if(!s)return {type:'unknown'};
  if(/(shoot|shot|finish|strike|sut|da vao|ghi ban|volley)/.test(s))return {type:'shoot'};
  if(/(cross|cut ?back|square|can ngang|tat bong|chuyen ngang)/.test(s))return {type:'pass',target:'inside'};
  if(/(pass|through|lay ?off|layback|chuyen|pha bong|feed|play it)/.test(s)){
   let target=/(back|behind|lai|ve sau|ve|safe|support)/.test(s)?'back':/(wide|wing|flank|bien|canh|right|left)/.test(s)?'wide':/(inside|middle|center|forward|trung lo|vao trong|giua|ahead|gap)/.test(s)?'inside':'best';
   return {type:'pass',target};
  }
  if(/(dribble|carry|run|drive|take on|rê|re bong|dan bong|dot pha|chay)/.test(s))return {type:'dribble'};
  if(/(hold|wait|shield|keep|giu bong|cau gio|stop|slow)/.test(s))return {type:'hold'};
  return {type:'unknown'};
 }
 const distance=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1]);
 function create(scenario,context){
  return {scenario,context,clock:55,score:context==='lead'?[1,0]:[0,1],players:[{id:'you',team:'home',pos:[...scenario.you],name:'YOU'},...scenario.mates.map((p,i)=>({id:'mate'+i,team:'home',pos:[...p],name:'M'+(i+1)})),...scenario.opponents.map((p,i)=>({id:'opp'+i,team:'away',pos:[...p],name:'D'+(i+1)}))],owner:'you',ball:[...scenario.you],turn:0,finished:false,history:[],result:''};
 }
 function pickMate(s,target,owner){
  const mates=s.players.filter(p=>p.team==='home'&&p.id!==owner.id);
  const order=mates.slice().sort((a,b)=>{
    const rank=p=>target==='back'?p.pos[1]:target==='wide'?-Math.abs(p.pos[0]-50):target==='inside'?p.pos[1]+Math.abs(p.pos[0]-50)*.75:p.pos[1]+Math.abs(p.pos[0]-50)*.3;
    return rank(a)-rank(b);
  });
  return target==='back'?order[order.length-1]:order[0];
 }
 function play(state,words){
  if(state.finished)return {ok:false,message:'Match is over. Start a new scenario.'};
  const cmd=interpret(words);
  if(cmd.type==='unknown')return {ok:false,message:'Try a clear action: “cross into the box”, “pass back”, “shoot”, “dribble forward”, or “hold the ball”.'};
  const owner=state.players.find(p=>p.id===state.owner);
  if(!owner)return {ok:false,message:'No player has the ball.'};
  const defenders=state.players.filter(p=>p.team==='away');
  const closest=pos=>Math.min(...defenders.map(p=>distance(pos,p.pos)));
  const from=[...owner.pos];let to=[...from],next=owner,comment='',event='',step=10;
  if(cmd.type==='pass'){
   const mate=pickMate(state,cmd.target,owner);
   if(!mate)return {ok:false,message:'There is no available teammate.'};
   next=mate;to=[...mate.pos];step=12;
   const risky=distance(from,to)>49&&closest(to)<14;
   if(risky){event='turnover';comment='The long pass was intercepted! The defender stepped into the lane.';}
   else {event='pass';comment=cmd.target==='inside'?'A sharp ball into the middle. Your teammate receives it — what next?':cmd.target==='wide'?'The ball travels wide. The winger takes a touch — make the next decision.':cmd.target==='back'?'You recycle possession. A defender presses forward as the seconds tick down.':'Good connection. The receiver controls the pass and looks up.';}
  } else if(cmd.type==='shoot'){
   to=[50,3];step=9;
   const nearGoal=from[1]<=43;const blocked=closest(from)<6&&from[1]>18;
   if(nearGoal&&!blocked){event='goal';comment='GOAL! The ball beats the keeper and hits the net.';}
   else {event='turnover';comment=nearGoal?'A defender blocks the shot and clears the ball.':'Too far out. The hopeful shot is saved, and possession is lost.';}
  } else if(cmd.type==='dribble'){
   to=[Math.min(93,Math.max(7,from[0]+(from[0]<50?5:-5))),Math.max(18,from[1]-23)];step=11;
   if(closest(to)<12){event='turnover';comment='The defender closes down and wins the tackle.';}
   else {event='dribble';comment='Great carry! You push into space. Choose what to do before the next challenge.';}
  } else {event='hold';step=18;comment='You shield the ball while teammates move. Time is running down.';}
  state.clock=Math.max(0,state.clock-step);state.turn++;
  const outcome={ok:true,type:cmd.type,event,from,to,carrier:next.id,text:comment};
  if(event==='pass'){state.owner=next.id;state.ball=[...to];}
  if(event==='dribble'){owner.pos=[...to];state.ball=[...to];}
  if(event==='hold'){state.ball=[...from];}
  if(event==='goal'){state.score[0]++;state.ball=[...to];state.finished=true;state.result='GOAL — You score!';}
  if(event==='turnover'){state.ball=[...to];state.finished=true;state.result=state.context==='lead'?'POSSESSION LOST — The move ends.':'POSSESSION LOST — The move ends.';}
  // Opposition shifts toward the ball after every successful action.
  if(!state.finished)for(const defender of defenders){
    defender.pos=[defender.pos[0]+Math.sign(state.ball[0]-defender.pos[0])*Math.min(5,Math.abs(state.ball[0]-defender.pos[0])),defender.pos[1]+Math.sign(state.ball[1]-defender.pos[1])*Math.min(5,Math.abs(state.ball[1]-defender.pos[1]))];
  }
  if(state.clock===0&&!state.finished){state.finished=true;state.result=state.context==='lead'?'FULL TIME — You protect the lead!':'FULL TIME — The equalizer never came.';outcome.event='fulltime';outcome.text+=' The referee blows for full time.';}
  state.history.push({input:words,event:outcome.event,text:outcome.text,time:state.clock});
  return outcome;
 }
 const api={interpret,create,play,distance};
 if(typeof module!=='undefined'&&module.exports)module.exports=api;
 root.SoccerEngine=api;
})(typeof window!=='undefined'?window:globalThis);
