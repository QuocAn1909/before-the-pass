# Test Log — Before the Pass

## Automated cases
Eight equivalent assertions were executed directly against the repository's current `dist/game.js` and `dist/data.js` in a JavaScript runtime on 2026-10-21; all eight passed. The committed Node test file mirrors these cases. **The GitHub Actions / `node --test` runner has not yet been observed executing**, so its result must not be represented as verified.

| # | Test | Expected outcome | Status |
|---|---|---|---|
| 1 | Striker filter | Exactly four rounds, with leading/trailing pairs | PASS — evaluated using the repository's current game.js and data.js in a JavaScript runtime (2026-10-21) |
| 2 | All roles | Twelve rounds across six situations | PASS — evaluated using the repository's current game.js and data.js in a JavaScript runtime (2026-10-21) |
| 3 | Context-sensitive score | Same pass gets 1 point while leading, 2 while trailing | PASS — evaluated using the repository's current game.js and data.js in a JavaScript runtime (2026-10-21) |
| 4 | Double click / repeated answer | Second answer rejected; score does not change | PASS — evaluated using the repository's current game.js and data.js in a JavaScript runtime (2026-10-21) |
| 5 | Invalid answer index (failure/edge case) | -1, 3, and decimal index rejected without score changes | PASS — evaluated using the repository's current game.js and data.js in a JavaScript runtime (2026-10-21) |
| 6 | Next without answer (failure case) | Round does not advance | PASS — evaluated using the repository's current game.js and data.js in a JavaScript runtime (2026-10-21) |
| 7 | Answer beyond end | No additional points or rounds | PASS — evaluated using the repository's current game.js and data.js in a JavaScript runtime (2026-10-21) |
| 8 | Explanations | Every option has feedback for both contexts | PASS — evaluated using the repository's current game.js and data.js in a JavaScript runtime (2026-10-21) |

## Manual browser checklist
1. Open `dist/index.html`. Confirm the pitch, three options, score and scenario appear.
2. Select a play. Confirm **both the points and an explanation** appear immediately.
3. Confirm the answer buttons are disabled until Next is pressed.
4. Press Next and compare leading 1–0 versus trailing 0–1 for the same scenario.
5. Change position and press Restart; confirm the round count and score reset.
6. Finish all rounds and check the summary and Practice again button.
7. Check at a narrow mobile-size browser width.

**Note:** Do not report these as passed without running them. Keep screenshots as evidence. Core logic can be tested without a browser, but DOM interaction still needs human verification.
