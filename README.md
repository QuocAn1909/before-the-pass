# Before the Pass — Soccer Decision Lab

**AI 101 Midterm Project | An Le | October 2026**

**Audience:** Beginner college soccer players. **Need:** Practice choosing a soccer action when the match score changes the risk/reward balance.

## What it does
1. **Position filter:** Practice as a striker, midfielder, defender, or all roles.
2. **Paired late-match decisions:** View a simple pitch diagram, select one of three plays, get 0–2 context-fit points and an explanation. Every setup appears once while leading and once while trailing.
3. **Review and replay:** Read your session score and round-by-round explanations; restart or change role.

The examples are original simplified teaching cases, **not** tactical predictions or coach-validated recommendations. No live AI API is used.

## Run
Open `dist/index.html` in a modern browser. No installation, account, backend or internet required.

Alternatively: from the repository root run `python -m http.server 8000 -d dist` then visit `http://localhost:8000`.

## Tests
Install Node.js (18+ recommended), then run:
```
node --test tests/game.test.js
```
See [TEST_LOG.md](TEST_LOG.md) for recorded tests and the manual browser checklist.

## Improvement / version history
- Before: Selecting an option showed only a numeric point result. The explanation existed in data but was not displayed on the decision screen.
- After: Selecting an option also shows the chosen action and **context-specific explanation** before advancing.
- Tracked by [Issue #2](https://github.com/QuocAn1909/before-the-pass/issues/2) and its linked pull request.

## File guide
- `dist/index.html` — page structure.
- `dist/style.css` — responsive layout.
- `dist/data.js` — six original scenarios, paired into twelve rounds across roles.
- `dist/game.js` — score and progression logic.
- `dist/app.js` — browser rendering and interactions.
- `tests/game.test.js` — automated core behavior checks.
- `AI_USE_NOTE.md` — AI disclosure.
- `TEST_LOG.md` — tests and verification.
- `SCREENSHOTS.md` — before/after evidence instructions.

## Known limitations
- Simplified fixed situations, two possible score contexts, and three options per scenario.
- Not a real match simulator; no coaching or real-world player tracking.
- Scores are illustrative, not an assessment of soccer skill.
- No saving after refresh; browsers must support modern JavaScript and the `dialog` element.
