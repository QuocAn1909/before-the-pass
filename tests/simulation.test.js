const test=require('node:test'),assert=require('node:assert/strict');
const Engine=require('../dist/engine.js'),scenarios=require('../dist/data.js');
const one=(id)=>scenarios.find(s=>s.id===id);
test('English and Vietnamese commands',()=>{assert.equal(Engine.interpret('căn ngang vào trong').type,'pass');assert.equal(Engine.interpret('chuyền về sau').target,'back');assert.equal(Engine.interpret('shoot!').type,'shoot');assert.equal(Engine.interpret('rê bóng').type,'dribble');assert.equal(Engine.interpret('hold').type,'hold');});
test('Unknown command does not consume time',()=>{const s=Engine.create(one('striker-wide'),'trail');assert.equal(Engine.play(s,'banana').ok,false);assert.equal(s.clock,55);});
test('Cross moves ball to receiver and allows another action',()=>{const s=Engine.create(one('striker-wide'),'trail');const r=Engine.play(s,'cross inside');assert.equal(r.event,'pass');assert.notEqual(s.owner,'you');assert.equal(s.turn,1);assert.equal(s.finished,false);});
test('Receiver can shoot and score after a cross',()=>{const s=Engine.create(one('striker-wide'),'trail');Engine.play(s,'cross inside');const result=Engine.play(s,'shoot');assert.equal(result.event,'goal');assert.equal(s.score[0],1);assert.equal(s.finished,true);});
test('Shot from deep loses possession',()=>{const s=Engine.create(one('defender-outlet'),'trail');assert.equal(Engine.play(s,'shoot').event,'turnover');assert.equal(s.finished,true);});
test('Holding runs down time to final whistle',()=>{const s=Engine.create(one('striker-wide'),'lead');Engine.play(s,'hold');Engine.play(s,'hold');Engine.play(s,'hold');assert.equal(s.clock,1);const r=Engine.play(s,'hold');assert.equal(r.event,'fulltime');assert.equal(s.clock,0);assert.equal(s.finished,true);});
test('End state rejects further commands',()=>{const s=Engine.create(one('defender-outlet'),'trail');Engine.play(s,'shoot');assert.equal(Engine.play(s,'pass back').ok,false);});

test('Pass to named player #2, never silently player #1',()=>{
 const state=Engine.create(scenarios.find(s=>s.id==='striker-wide'),'trail');
 const outcome=Engine.play(state,'chuyền số 2');
 assert.equal(outcome.event,'pass');
 assert.equal(state.owner,'mate1');
});
test('Off-ball runner enters the box, while owner keeps possession',()=>{
 const state=Engine.create(scenarios.find(s=>s.id==='striker-wide'),'trail');
 const old=state.players.find(p=>p.id==='mate0').pos[1];
 const outcome=Engine.play(state,'tell #1 to run into the box');
 assert.equal(outcome.event,'run');
 assert.equal(state.owner,'you');
 assert.ok(state.players.find(p=>p.id==='mate0').pos[1]<old);
});
test('Player #1 receives the next explicitly directed pass',()=>{
 const state=Engine.create(scenarios.find(s=>s.id==='striker-wide'),'trail');
 Engine.play(state,'tell #1 to run into the box');
 assert.equal(Engine.play(state,'pass to #1').event,'pass');
 assert.equal(state.owner,'mate0');
});
test('Set-piece scenes: corner, free kick and penalty',()=>{
 assert.ok(scenarios.some(s=>s.kind==='corner'));
 assert.ok(scenarios.some(s=>s.kind==='freekick'));
 const s=Engine.create(scenarios.find(s=>s.kind==='penalty'),'trail');
 assert.equal(Engine.play(s,'shoot left').event,'goal');
});
