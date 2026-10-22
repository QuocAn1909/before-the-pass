const $ = id => document.getElementById(id);
let state = Game.create(SCENARIOS, 'Striker');
const letters = ['A','B','C'];
function pitchMarkup(s) {
 const player = (p,fill,label,ball=false) => `<g><circle cx="${p[0]}" cy="${p[1]}" r="3.8" fill="${fill}" stroke="#102d24" stroke-width=".6"/><text x="${p[0]}" y="${p[1]+1.2}" text-anchor="middle" font-size="3.5" fill="#173d32" font-family="Arial" font-weight="bold">${label}</text>${ball?`<circle cx="${p[0]+4.5}" cy="${p[1]+3}" r="1.5" fill="#fff" stroke="#173d32" stroke-width=".5"/>`:''}</g>`;
 return `<title>${s.title} You are the lime marker. White markers are teammates; orange X markers are opponents. Attack toward the top goal.</title><defs><marker id="arrow" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5" fill="#d7ed87"/></marker></defs><rect x="4" y="4" width="92" height="98" rx="1" fill="#234c39"/>${[0,1,2,3,4,5,6].map(i=>`<rect x="4" y="${4+i*14}" width="92" height="7" fill="#2c573f"/>`).join('')}<g fill="none" stroke="#a4bd9299" stroke-width=".35"><rect x="4" y="4" width="92" height="98"/><path d="M4,53 H96 M22,4 V21 H78 V4 M37,4 V10 H63 V4 M22,102 V85 H78 V102 M37,102 V96 H63 V102"/><circle cx="50" cy="53" r="11"/><circle cx="50" cy="53" r=".6" fill="#a4bd92"/><path d="M42,4 V1 H58 V4 M42,102 V105 H58 V102"/></g>${s.opponents.map(p=>player(p,'#dd9c77','×')).join('')}${s.mates.map((p,i)=>player(p,'#f6f5e8',i+1)).join('')}${player(s.you,'#d7ed87','Y',true)}`;
}
function render(){
 $('score').textContent = `${state.score} PTS`;
 $('progress').textContent = `ROUND ${Math.min(state.index+1,state.rounds.length)} / ${state.rounds.length}`;
 const done=state.index>=state.rounds.length; $('playArea').hidden=done; $('summary').hidden=!done;
 if(done){ renderSummary(); return; }
 const {scenario:s,context}=state.rounds[state.index];
 $('scoreboard').innerHTML=`YOU <b>${context==='lead'?'1 : 0':'0 : 1'}</b> OPP`;
 $('roundLabel').textContent=`${s.role.toUpperCase()} / ${context==='lead'?'PROTECT THE LEAD':'CHASE THE EQUALIZER'}`;
 $('scenarioTitle').textContent=s.title; $('scenarioText').textContent=s.subtitle;
 $('contextNote').innerHTML=context==='lead'?'<strong>You lead 1–0. One minute left.</strong>Keep possession and weigh the cost of a turnover.':'<strong>You trail 0–1. One minute left.</strong>Look for a useful way forward. More risk is not always better.';
 $('pitch').innerHTML=pitchMarkup(s);
 $('choices').innerHTML=s.options.map((o,i)=>`<button class="choice" data-choice="${i}"><span>${letters[i]}</span>${o.label}</button>`).join('');
 $('choices').querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>answer(Number(b.dataset.choice))));
 $('feedback').hidden=true; $('feedback').innerHTML=''; $('next').hidden=true;
 $('roundHint').textContent='Choose a play to reveal the reasoning.';
}
function answer(choice){
 if(!Game.answer(state,choice))return;
 const {scenario:s,context}=state.rounds[state.index]; const result=s.options[choice][context];
 $('score').textContent=`${state.score} PTS`;
 $('choices').querySelectorAll('button').forEach((b,i)=>{b.disabled=true;b.classList.toggle('selected',i===choice);});
 $('feedback').hidden=false;
 $('feedback').innerHTML=`<div class="feedback-label">${result.points}/2 CONTEXT-FIT POINTS</div><p><strong>Your play:</strong> ${s.options[choice].label}</p><p>${result.text}</p>`;
 $('next').hidden=false;
 $('next').textContent=state.index===state.rounds.length-1?'See your review →':state.rounds[state.index+1].scenario.id===s.id?'Same play, different score →':'Next situation →';
 $('roundHint').textContent='Your answer is locked.';
 $('feedback').focus({preventScroll:true});
}
function renderSummary(){
 const max=state.rounds.length*2;
 const lead=state.answers.reduce((n,a,i)=>n+(state.rounds[i].context==='lead'?a.points:0),0);
 const trail=state.score-lead;
 $('summary').innerHTML=`<div class="eyebrow">SESSION COMPLETE / ${$('role').value.toUpperCase()}</div><h2>Every pass starts with a read.</h2><div class="big-score">${state.score}<span style="font-size:28px"> / ${max}</span></div><p>Protecting a lead: <strong>${lead}/${max/2}</strong> · Chasing a goal: <strong>${trail}/${max/2}</strong></p><p>${state.score/max>=.75?'You matched many of the suggested choices to the score. Keep looking for support before committing.':'Use the review to compare possession-first choices with ways to advance when behind.'} This is feedback on these examples, not a rating of your real soccer ability.</p>${state.rounds.map((r,i)=>`<div class="review-row"><strong>${i+1}. ${r.scenario.title} · ${r.context==='lead'?'Leading 1–0':'Trailing 0–1'} · ${state.answers[i].points}/2</strong><br>${r.scenario.options[state.answers[i].choice].label}<br>${r.scenario.options[state.answers[i].choice][r.context].text}</div>`).join('')}<button id="playAgain" class="primary">Practice again ↺</button>`;
 $('playAgain').addEventListener('click',restart); $('summary').focus({preventScroll:true});
}
function restart(){state=Game.create(SCENARIOS,$('role').value);render();}
$('role').addEventListener('change',restart); $('restart').addEventListener('click',restart);
$('next').addEventListener('click',()=>{if(Game.next(state)){render();if(state.index<state.rounds.length)$('scenarioTitle').scrollIntoView({block:'nearest',behavior:'smooth'});}});
$('aboutButton').addEventListener('click',()=>$('about').showModal()); $('closeAbout').addEventListener('click',()=>$('about').close());
render();
