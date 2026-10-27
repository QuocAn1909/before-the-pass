const $=id=>document.getElementById(id);
let game,busy=false,deadline=0,timer=null,aim=null,aiming=false,epoch=0;
const SVG='http://www.w3.org/2000/svg';
const node=(tag,attrs={})=>{const x=document.createElementNS(SVG,tag);for(const [k,v] of Object.entries(attrs))x.setAttribute(k,v);return x;};
const ms=(s)=>s===0?'90:00':s===60?'89:00':'89:'+String(60-s).padStart(2,'0');
function setupScenarios(){
 const role=$('role').value;
 const selected=SCENARIOS.filter(s=>s.role===role);
 $('scenario').replaceChildren();
 for(const [i,s] of selected.entries()){const o=document.createElement('option');o.value=String(i);o.textContent=s.title;$('scenario').append(o);}
}
function fieldBase(){
 const svg=$('field');svg.replaceChildren();
 svg.append(node('rect',{x:3,y:3,width:94,height:106,rx:2,fill:'#225b36'}));
 for(let y=3;y<109;y+=17.66)svg.append(node('rect',{x:3,y,width:94,height:8.8,fill:'#28663a',opacity:.62}));
 const lines=node('g',{stroke:'#b6d3a4','stroke-width':'.42',fill:'none',opacity:'.78'});
 const add=(name,attributes)=>lines.append(node(name,attributes));
 add('rect',{x:3,y:3,width:94,height:106});add('line',{x1:3,y1:56,x2:97,y2:56});
 add('circle',{cx:50,cy:56,r:10.5});add('circle',{cx:50,cy:56,r:.5,fill:'#b6d3a4'});
 add('path',{d:'M22 3 V21 H78 V3 M38 3 V10 H62 V3 M22 109 V91 H78 V109 M38 109 V102 H62 V109'});
 add('rect',{x:34,y:.5,width:32,height:3});add('rect',{x:42,y:109,width:16,height:2});
 svg.append(lines);
 const actors=node('g',{id:'actors'});svg.append(actors);
 for(const p of game.players){
  const g=node('g',{class:'player',id:'piece-'+p.id,transform:'translate('+p.pos[0]+' '+p.pos[1]+')'});
  const jersey=node('path',{d:'M-3 -3 L-5.6 -.9 L-4.2 1.1 L-2.8 .4 L-2.8 4 L2.8 4 L2.8 .4 L4.2 1.1 L5.6 -.9 L3 -3 L1.5 -2.3 Q0 -1.1 -1.5 -2.3 Z',fill:p.team==='home'?'#f3f3ef':'#e96a52',stroke:p.team==='home'?'#243e47':'#562b24','stroke-width':'.5'});
  g.append(node('ellipse',{cx:0,cy:5.8,rx:3.6,ry:1.1,fill:'#0e3220',opacity:.45}),jersey);
  const t=node('text',{x:0,y:1.7,'text-anchor':'middle','font-size':'2.8','font-family':'Arial','font-weight':'bold',fill:'#14271e'});t.textContent=String(p.shirt);g.append(t);actors.append(g);
 }
 const ball=node('g',{id:'ball',class:'soccerball',transform:'translate('+game.ball[0]+' '+game.ball[1]+')'});
 ball.append(node('circle',{r:2.5,fill:'#f7f6ed',stroke:'#1d2925','stroke-width':'.35'}));
 ball.append(node('path',{d:'M0 -1.45 L1.35 -.4 L.85 1.12 L-.85 1.12 L-1.35 -.4 Z',fill:'#1a2625'}));
 for(let i=0;i<5;i++){const a=i*2*Math.PI/5;ball.append(node('circle',{cx:(2*Math.cos(a)).toFixed(2),cy:(2*Math.sin(a)).toFixed(2),r:.35,fill:'#233130'}));}
 svg.append(ball);
 const arrow=node('path',{id:'aimLine',stroke:'#faffbb','stroke-width':'.9','stroke-dasharray':'2 1',fill:'none',visibility:'hidden'});svg.append(arrow);
 svg.addEventListener('pointerdown',startAim);svg.addEventListener('pointermove',moveAim);svg.addEventListener('pointerup',endAim);
 paintPossession();
}
function paintPossession(){
 for(const p of game.players){const g=$('piece-'+p.id);if(g)g.style.filter=p.id===game.owner?'drop-shadow(0 0 2px #edffbc)':'';}
 $('possess').textContent=game.finished?'● PLAY COMPLETE':'● '+(game.players.find(p=>p.id===game.owner)?.name||'YOU')+' HAS THE BALL';
}
function positions(){for(const p of game.players){const el=$('piece-'+p.id);if(el)el.setAttribute('transform','translate('+p.pos[0]+' '+p.pos[1]+')');}}
function moveBall(p){$('ball').setAttribute('transform','translate('+p[0]+' '+p[1]+')');}
function animatePlay(before,ballBefore){
 const dest=game.players.map(p=>({id:p.id,to:[...p.pos],from:before[p.id]||[...p.pos]}));
 const end=[...game.ball],start=performance.now(),duration=900;
 return new Promise(resolve=>{
  function tick(now){
   const t=Math.min(1,(now-start)/duration),e=t*t*(3-2*t);
   for(const p of dest){const el=$('piece-'+p.id);if(el)el.setAttribute('transform','translate('+(p.from[0]+(p.to[0]-p.from[0])*e)+' '+(p.from[1]+(p.to[1]-p.from[1])*e)+')');}
   const bx=ballBefore[0]+(end[0]-ballBefore[0])*e,by=ballBefore[1]+(end[1]-ballBefore[1])*e-Math.sin(Math.PI*t)*(end[0]!==ballBefore[0]||end[1]!==ballBefore[1]?2.3:0);
   moveBall([bx,by]);
   if(t<1)requestAnimationFrame(tick);else resolve();
  }
  requestAnimationFrame(tick);
 });
}
function pointFromPointer(e){const pt=$('field').createSVGPoint();pt.x=e.clientX;pt.y=e.clientY;const m=$('field').getScreenCTM();if(!m)return null;const q=pt.matrixTransform(m.inverse());return {x:Math.max(4,Math.min(96,q.x)),y:q.y};}
function drawAim(){const a=$('aimLine');if(!a)return;if(!aim){a.setAttribute('visibility','hidden');return}a.setAttribute('visibility','visible');a.setAttribute('d','M'+game.ball[0]+' '+game.ball[1]+' Q'+((game.ball[0]+aim.x)/2)+' '+((game.ball[1]+3)/2-7)+' '+aim.x+' 3');}
function startAim(e){if(game.finished||busy||e.target.closest?.('button'))return;const p=pointFromPointer(e);if(!p)return;aiming=true;aim={x:p.x};$('field').setPointerCapture(e.pointerId);drawAim();$('status').textContent='SHOT AIM SET — TYPE SHOOT AND PRESS PLAY';}
function moveAim(e){if(!aiming)return;const p=pointFromPointer(e);if(p){aim={x:p.x};drawAim();}}
function endAim(e){if(!aiming)return;const p=pointFromPointer(e);if(p)aim={x:p.x};aiming=false;drawAim();}
function startClock(){clearInterval(timer);deadline=Date.now()+game.clock*1000;timer=setInterval(()=>{if(!game||game.finished){clearInterval(timer);return}game.clock=Math.max(0,Math.ceil((deadline-Date.now())/1000));hud();if(game.clock===0){game.finished=true;game.result='FULL TIME — FINAL SCORE '+game.score[0]+'–'+game.score[1];clearInterval(timer);if(!busy)finish();}},150);}
function begin(){
 busy=false;setupScenarios();
 loadSelected();
}
function loadSelected(){
 clearInterval(timer);epoch++;busy=false;aim=null;aiming=false;
 const list=SCENARIOS.filter(s=>s.role===$('role').value);
 game=SoccerEngine.create(list[Number($('scenario').value)||0],$('context').value);
 SoccerEngine.applyFormation(game,$('formation').value);
 $('title').textContent=game.scenario.title.toUpperCase();
 $('description').textContent=game.scenario.subtitle+' '+(game.context==='lead'?'Protect your one-goal lead.':'You need an equalizer.');
 $('roleTag').textContent='MATCH MOMENT / '+game.scenario.role.toUpperCase();
 $('command').value='';$('command').disabled=false;$('go').disabled=false;$('form').hidden=false;$('endPanel').hidden=true;
 $('commentaryText').textContent='The defender is closing in. Your next touch could change the game.';
 $('history').replaceChildren();log('89:05 — The ball is yours. Make a decision.');
 fieldBase();hud();$('status').textContent='YOU ARE ON THE BALL';startClock();
}
function log(text){const li=document.createElement('li');li.textContent=text;$('history').prepend(li);}
function hud(){
 $('resultScore').innerHTML=game.score[0]+' <span>—</span> '+game.score[1];
 $('minute').textContent=ms(game.clock);$('meterFill').style.width=((55-game.clock)/55*100)+'%';
 $('actions').textContent=game.turn+' ACTION'+(game.turn===1?'':'S');paintPossession();
}
function finish(){
 clearInterval(timer);$('form').hidden=true;$('endPanel').hidden=false;
 $('endTitle').textContent=game.result;
 $('status').textContent='FULL TIME / PLAY ENDED';
}
async function submit(e){
 e.preventDefault();if(busy||game.finished)return;
 const words=$('command').value.trim();if(!words){$('command').focus();return;}
 const before=Object.fromEntries(game.players.map(p=>[p.id,[...p.pos]])),ballBefore=[...game.ball];
 const shot=SoccerEngine.interpret(words).type==='shoot';if(!shot){aim=null;drawAim();}const outcome=SoccerEngine.play(game,words,shot?aim:null);
 if(!outcome.ok){$('commentaryText').textContent=outcome.message;$('status').textContent='TRY A DIFFERENT COMMAND';return;}
 busy=true;const actionEpoch=epoch;$('go').disabled=true;$('command').disabled=true;
 $('status').textContent='PLAY IN MOTION…';
 $('commentaryText').textContent='The play unfolds…';
 if(shot){const k=$('piece-opp1');if(k)k.setAttribute('transform','translate('+(aim&&aim.x<50?43:57)+' 9) rotate('+(aim&&aim.x<50?-52:52)+')');}
 await animatePlay(before,ballBefore);
 if(actionEpoch!==epoch)return;
 if(outcome.event==='pass'||outcome.event==='dribble'){ // Receiving player controls ball
  moveBall(game.ball);paintPossession();
 }
 $('commentaryText').textContent=outcome.text;
 log(ms(game.clock)+' — '+words+' → '+outcome.text);
 hud();busy=false; if(shot){aim=null;drawAim();}
 if(game.finished){finish();return;}
 $('status').textContent=(game.players.find(p=>p.id===game.owner)?.name||'YOU')+' CONTROLS THE BALL — YOUR NEXT DECISION';
 $('command').disabled=false;$('go').disabled=false;$('command').value='';$('command').focus();
}
$('formation').addEventListener('change',loadSelected);
$('role').addEventListener('change',begin);
$('context').addEventListener('change',loadSelected);
$('scenario').addEventListener('change',loadSelected);
$('reset').addEventListener('click',loadSelected);
$('form').addEventListener('submit',submit);
$('again').addEventListener('click',()=>{const opts=$('scenario');opts.selectedIndex=(opts.selectedIndex+1)%opts.options.length;loadSelected();});
$('infoBtn').addEventListener('click',()=>$('about').showModal());
$('closeInfo').addEventListener('click',()=>$('about').close());
begin();
