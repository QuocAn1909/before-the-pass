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

## October 26 targeted assertions
Verified in JavaScript runtime: the 4-3-3 formation creates 22 players (11 each), goalkeeper has #1, and `pass số 2` assigns ball to shirt #2. Added Node regression suite `tests/formations.test.js`; Node test runner and browser animations still need verification.

## October 26 11v11 source check
Verified via JavaScript execution that all eight formation configurations create 22 total players and exact `pass số N` selects jersey N for N=2 through 9 and 11. New regression file: `tests/formation-regressions.test.js`. Browser appearance and animation remain unverified.


## Manual browser verification sheet — October 26, 2026
**Instructions:** Open the deployed website or extracted `dist/index.html`; enter what you actually observe in Actual and set Result only after testing. Source-level assertions are NOT replacements.

| Test | Steps | Expected | Actual | Result |
| --- | --- | --- | --- | --- |
| M1 Normal run | Start a scenario; enter `num 7 run to the box` | #7 moves toward penalty area, ball remains with carrier | Player #7 did not run into the penalty area after the command. | FAIL |
| M2 Exact pass | Start a fresh play; enter `pass số 4` | Ball goes to jersey #4, not #9 | The pass went to player #4 as expected. | PASS |
| M3 Empty input | Submit with no instruction | Nothing changes; user is prompted for input | No unexpected game action occurred. | PASS |
| M4 Repeat | In a fresh play, run then pass then dribble | Correct sequential possession/movement | User reported the repeated-action test passed. | PASS |
| M5 Keyboard | Use Tab to reach input and Enter to play | Command can be submitted without mouse | Keyboard submission worked as expected. | PASS |
| M6 Small screen | Set browser viewport ~375px | Input and pitch usable without clipped controls | User reported the small-screen test passed. | PASS |
| M7 Soccer Rules | Choose Offside then Onside | Passer, receiver and two defenders shown; contrasting positions | The rules demonstration worked as expected. | PASS |
| M8 Edge case | Enter `pass số 99` | Clear error, no silent pass to another shirt | The invalid jersey input was handled as expected. | PASS |

**Screenshot reminder:** Save genuine before/after images under `evidence/` and describe the bug and fix.


**Manual test update (student report, October 27, 2026):** The student reported that all eight browser tests passed except M1, where jersey #7 did not run to the box. The Actual statements summarize the student's report; detailed screenshots and independent browser verification are not included. M1 remains an unresolved FAIL pending a fix and retest.
