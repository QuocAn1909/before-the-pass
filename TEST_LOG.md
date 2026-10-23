# Test Log — Soccer Decision Lab

## New engine checks (October 21, 2026)
Seven logic checks were executed against `dist/engine.js` and `dist/data.js` in a JavaScript runtime. These are source-level tests, not recorded GitHub Actions results.

| Case | Expected | Result |
|---|---|---|
| English and Vietnamese command parsing | Common pass/shoot/dribble/hold recognized | PASS |
| Unknown command (negative test) | No turn or clock consumed | PASS |
| Cross into center | Receiver owns ball and game continues | PASS |
| Cross then shoot | Receiver can score and end play | PASS |
| Long-range shot | Possession lost and sequence ends | PASS |
| Holding to full time | Clock reaches zero and play ends | PASS |
| Command after game over (edge case) | Rejected | PASS |

The same behavior is checked by `tests/simulation.test.js`. Original v1 logic test suite remains in `tests/game.test.js`.

## Not yet verified
- Node's `node --test tests/*.test.js` runner / GitHub Actions check.
- Visual movement of jersey sprites and soccer ball.
- Mobile responsive design and actual keyboard/screen-reader behavior.
- Before/after screenshots.

**Manual checks:** Load `dist/index.html`; choose Striker / One more touch? / Trailing; type “căn ngang vào trong”; confirm ball moves to center teammate; then “shoot”; confirm ball goes goalward and the GOAL screen appears. Test invalid text, reset, hold until full time, position changes and a narrow viewport.

Do not represent unverified browser checks as passed.

## Follow-up checks (October 22, 2026)
Additional JavaScript-runtime checks passed for exact recipient #2, off-ball run by #1, subsequent pass to #1, and presence of corner/free-kick/penalty scenarios. Browser animation and GitHub Actions results remain unverified.

## Latest change — aimed shots and clock
Source-level tests: number 10 runs toward goal PASS; aimed penalty goal PASS; wide shot stops wide PASS; additional free kick exists PASS; actions no longer deduct simulated seconds PASS. Browser dragging, goalkeeper movement, and actual second-by-second clock still need manual testing.

## Academy regression tests
5 source-level JS assertions passed on Oct 23, 2026: keeper pass, exact outfield #1 pass, dribble recognition, number 10 forward movement, and presence of all three academy tabs. The same gameplay assertions are committed in `tests/academy.test.js`. Browser layout, live clock and mouse interactions still need visual QA.
