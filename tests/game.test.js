const test = require('node:test');
const assert = require('node:assert/strict');
const Game = require('../dist/game.js');
const scenarios = require('../dist/data.js');

test('Striker filter creates eight paired rounds', () => {
 const state = Game.create(scenarios, 'Striker');
 assert.equal(state.rounds.length, 8);
 assert.equal(state.rounds[0].context, 'lead');
 assert.equal(state.rounds[1].context, 'trail');
 assert.ok(state.rounds.every(r => r.scenario.role === 'Striker'));
});

test('All roles includes eleven situations twice', () => {
 const state = Game.create(scenarios, 'All roles');
 assert.equal(state.rounds.length, 22);
});

test('Leading versus trailing changes the value of a forward pass', () => {
 const state = Game.create(scenarios, 'Striker');
 assert.equal(Game.answer(state, 0), true);
 assert.equal(state.score, 1);
 assert.equal(Game.next(state), true);
 assert.equal(Game.answer(state, 0), true);
 assert.equal(state.score, 3);
});

test('Cannot score the same round twice', () => {
 const state = Game.create(scenarios, 'Striker');
 assert.equal(Game.answer(state, 1), true);
 const score = state.score;
 assert.equal(Game.answer(state, 0), false);
 assert.equal(state.score, score);
});

test('Invalid choice is rejected without changing points', () => {
 const state = Game.create(scenarios, 'Striker');
 assert.equal(Game.answer(state, -1), false);
 assert.equal(Game.answer(state, 3), false);
 assert.equal(Game.answer(state, 1.5), false);
 assert.equal(state.score, 0);
 assert.equal(state.answers.length, 0);
});

test('Cannot advance before answering', () => {
 const state = Game.create(scenarios, 'Defender');
 assert.equal(Game.next(state), false);
 assert.equal(state.index, 0);
});

test('Completed sessions reject further answers and advances', () => {
 const state = Game.create(scenarios, 'Midfielder');
 while(state.index < state.rounds.length) {
  assert.equal(Game.answer(state, 1), true);
  assert.equal(Game.next(state), true);
 }
 const total = state.score;
 assert.equal(Game.answer(state, 1), false);
 assert.equal(Game.next(state), false);
 assert.equal(state.score, total);
});

test('Each choice has a written explanation for both score contexts', () => {
 for (const scenario of scenarios)
  for (const option of scenario.options)
   for (const context of ['lead','trail']) {
    assert.ok(typeof option[context].text === 'string' && option[context].text.length > 20);
    assert.ok([0,1,2].includes(option[context].points));
   }
});
