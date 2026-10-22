const $=id=>document.getElementById(id);
let game,busy=false;
const SVG='http://www.w3.org/2000/svg';
const node=(tag,attrs={})=>{const x=document.createElementNS(SVG,tag);for(const [k,v] of Object.entries(attrs))x.setAttribute(k,v);return x;};
const ms=(s)=>s===0?'90:00':'89:'+String(60-s).padStart(2,'0');
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
 add('rect',{x:42,y:.8,width:16,height:2.2});add('rect',{x:42,y:109,width:16,height:2});
 svg.append(lines);
 const actors=node('g',{id:'actors'});svg.append(actors);
 for(const p of game.players){
  const g=node('g',{class:'player',id:'piece-'+p.id,transform:'translate('+p.pos[0]+' '+p.pos[1]+')'});
  const jersey=node('path',{d:'M-3 -3 L-5.6 -.9 L-4.2 1.1 L-2.8 .4 L-2.8 4 L2.8 4 L2.8 .4 L4.2 1.1 L5.6 -.9 L3 -3 L1.5 -2.3 Q0 -1.1 -1.5 -2.3 Z',fill:p.team==='home'?'#d7ff74':'#ffaf81',stroke:p.team==='home'?'#1b3a24':'#562b24','stroke-width':'.5'});
  g.append(node('ellipse',{cx:0,cy:5.8,rx:3.6,ry:1.1,fill:'#0e3220',opacity:.45}),jersey);
  const t=node('text',{x:0,y:1.7,'text-anchor':'middle','font-size':'2.8','font-family':'Arial','font-weight':'bold',fill:'#14271e'});t.textContent=p.name==='YOU'?'10':p.name.slice(1);g.append(t);actors.append(g);
 }
 const ball=node('g',{id:'ball',class:'soccerball',transform:'translate('+game.ball[0]+' '+game.ball[1]+')'});
 ball.append(node('circle',{r:2.5,fill:'#f7f6ed',stroke:'#1d2925','stroke-width':'.35'}));
 ball.append(node('path',{d:'M0 -1.45 L1.35 -.4 L.85 1.12 L-.85 1.12 L-1.35 -.4 Z',fill:'#1a2625'}));
 for(let i=0;i<5;i++){const a=i*2*Math.PI/5;ball.append(node('circle',{cx:(2*Math.cos(a)).toFixed(2),cy:(2*Math.sin(a)).toFixed(2),r:.35,fill:'#233130'}));}
 svg.append(ball);paintPossession();
}
function paintPossession(){
 for(const p of game.players){const g=$('piece-'+p.id);if(g)g.style.filter=p.id===game.owner?'drop-shadow(0 0 2px #edffbc)':'';}
 $('possess').textContent=game.finished?'● PLAY COMPLETE':'● '+(game.players.find(p=>p.id===game.owner)?.name||'YOU')+' HAS THE BALL';
}
function positions(){for(const p of game.players){const el=$('piece-'+p.id);if(el)el.setAttribute('transform','translate('+p.pos[0]+' '+p.pos[1]+')');}}
function moveBall(p){$('ball').setAttribute('transform','translate('+p[0]+' '+p[1]+')');}
function begin(){
 busy=false;setupScenarios();
 loadSelected();
}
function loadSelected(){
 busy=false;
 const list=SCENARIOS.filter(s=>s.role===$('role').value);
 game=SoccerEngine.create(list[Number($('scenario').value)||0],$('context').value);
 $('title').textContent=game.scenario.title.toUpperCase();
 $('description').textContent=game.scenario.subtitle+' '+(game.context==='lead'?'Protect your one-goal lead.':'You need an equalizer.');
 $('roleTag').textContent='MATCH MOMENT / '+game.scenario.role.toUpperCase();
 $('command').value='';$('command').disabled=false;$('go').disabled=false;$('form').hidden=false;$('endPanel').hidden=true;
 $('commentaryText').textContent='The defender is closing in. Your next touch could change the game.';
 $('history').replaceChildren();log('89:05 — The ball is yours. Make a decision.');
 fieldBase();hud();$('status').textContent='YOU ARE ON THE BALL';
}
function log(text){const li=document.createElement('li');li.textContent=text;$('history').prepend(li);}
function hud(){
 $('resultScore').innerHTML=game.score[0]+' <span>—</span> '+game.score[1];
 $('minute').textContent=ms(game.clock);$('meterFill').style.width=((55-game.clock)/55*100)+'%';
 $('actions').textContent=game.turn+' ACTION'+(game.turn===1?'':'S');paintPossession();
}
function finish(){
 $('form').hidden=true;$('endPanel').hidden=false;
 $('endTitle').textContent=game.result;
 $('status').textContent='FULL TIME / PLAY ENDED';
}
async function submit(e){
 e.preventDefault();if(busy||game.finished)return;
 const words=$('command').value.trim();if(!words){$('command').focus();return;}
 const outcome=SoccerEngine.play(game,words);
 if(!outcome.ok){$('commentaryText').textContent=outcome.message;$('status').textContent='TRY A DIFFERENT COMMAND';return;}
 busy=true;$('go').disabled=true;$('command').disabled=true;
 $('status').textContent='PLAY IN MOTION…';
 $('commentaryText').textContent='The play unfolds…';
 positions();moveBall(outcome.to); // CSS transitions animate shirts and the soccer ball
 await new Promise(resolve=>setTimeout(resolve,1100));
 if(outcome.event==='pass'||outcome.event==='dribble'){ // Receiving player controls ball
  moveBall(game.ball);paintPossession();
 }
 $('commentaryText').textContent=outcome.text;
 log(ms(game.clock)+' — '+words+' → '+outcome.text);
 hud();busy=false;
 if(game.finished){finish();return;}
 $('status').textContent=(game.players.find(p=>p.id===game.owner)?.name||'YOU')+' CONTROLS THE BALL — YOUR NEXT DECISION';
 $('command').disabled=false;$('go').disabled=false;$('command').value='';$('command').focus();
}
$('role').addEventListener('change',begin);
$('context').addEventListener('change',loadSelected);
$('scenario').addEventListener('change',loadSelected);
$('reset').addEventListener('click',loadSelected);
$('form').addEventListener('submit',submit);
$('again').addEventListener('click',()=>{const opts=$('scenario');opts.selectedIndex=(opts.selectedIndex+1)%opts.options.length;loadSelected();});
$('infoBtn').addEventListener('click',()=>$('about').showModal());
$('closeInfo').addEventListener('click',()=>$('about').close());
begin();
