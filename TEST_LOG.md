# Test Log — Before the Pass

## Automated cases
Run `node --test tests/game.test.js` from the repository root. These eight automated checks are in the repository; mark actual results after executing them.

| # | Test | Expected outcome | Status |
|---|---|---|---|
| 1 | Striker filter | Exactly four rounds, with leading/trailing pairs | Pending local execution |
| 2 | All roles | Twelve rounds across six situations | Pending local execution |
| 3 | Context-sensitive score | Same pass gets 1 point while leading, 2 while trailing | Pending local execution |
| 4 | Double click / repeated answer | Second answer rejected; score does not change | Pending local execution |
| 5 | Invalid answer index (failure/edge case) | -1, 3, and decimal index rejected without score changes | Pending local execution |
| 6 | Next without answer (failure case) | Round does not advance | Pending local execution |
| 7 | Answer beyond end | No additional points or rounds | Pending local execution |
| 8 | Explanations | Every option has feedback for both contexts | Pending local execution |

## Manual browser checklist
1. Open `dist/index.html`. Confirm the pitch, three options, score and scenario appear.
2. Select a play. Confirm **both the points and an explanation** appear immediately.
3. Confirm the answer buttons are disabled until Next is pressed.
4. Press Next and compare leading 1–0 versus trailing 0–1 for the same scenario.
5. Change position and press Restart; confirm the round count and score reset.
6. Finish all rounds and check the summary and Practice again button.
7. Check at a narrow mobile-size browser width.

**Note:** Do not report these as passed without running them. Keep screenshots as evidence. Core logic can be tested without a browser, but DOM interaction still needs human verification.
