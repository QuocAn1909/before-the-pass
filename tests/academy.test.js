const test=require('node:test');const assert=require('node:assert/strict');const Engine=require('../dist/engine.js');const scenes=require('../dist/data.js');const scene=scenes.find(x=>x.id==='striker-channel');
test('Passing back to Manchester United goalkeeper',()=>{const s=Engine.create(scene,'trail');assert.equal(Engine.play(s,'pass to goalkeeper').event,'pass');assert.equal(s.owner,'keeper-home');});
test('Explicit number one stays the outfield player',()=>{const s=Engine.create(scene,'trail');Engine.play(s,'pass to #1');assert.equal(s.owner,'mate0');});
test('Beat-defender instruction is dribble',()=>assert.equal(Engine.interpret('dribble past defender').type,'dribble'));
test('Number ten runs with the ball, not the shot aim',()=>{const s=Engine.create(scene,'trail');const y=s.ball[1];assert.equal(Engine.play(s,'number 10 run to the box',{x:95}).event,'dribble');assert.ok(s.ball[1]<y);assert.notEqual(s.ball[0],95);});
test('Aimed shots only happen for shoot command',()=>{const s=Engine.create(scene,'trail');const r=Engine.play(s,'pass to goalkeeper',{x:42});assert.equal(r.event,'pass');assert.equal(s.owner,'keeper-home');});
