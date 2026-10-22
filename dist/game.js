/* Pure state functions, shared by the browser and the automated tests. */
const Game = {
 create(scenarios, role) {
  const filtered = scenarios.filter(s => role === 'All roles' || s.role === role);
  const rounds = filtered.flatMap(s => ['lead','trail'].map(context => ({scenario:s,context})));
  return {rounds,index:0,answers:[],score:0};
 },
 answer(state, choice) {
  if (state.index >= state.rounds.length || state.answers[state.index] !== undefined || !Number.isInteger(choice) || choice < 0 || choice > 2) return false;
  const round = state.rounds[state.index];
  const points = round.scenario.options[choice][round.context].points;
  state.answers[state.index] = {choice,points}; state.score += points; return true;
 },
 next(state) {
  if (state.index >= state.rounds.length || state.answers[state.index] === undefined) return false;
  state.index++; return true;
 }
};
if (typeof module !== 'undefined') module.exports = Game;
