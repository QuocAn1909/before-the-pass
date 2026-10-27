# Before the Pass — Interactive Soccer Decision Lab

**AI 101 Midterm | An Le | October 2026**

## Audience and need
Beginner college soccer players need a safe way to rehearse game decisions under time pressure. This is a **rule-based teaching prototype**, not a real-time coaching system.

## Three features
1. **Set the scene:** Choose Striker / Midfielder / Defender, multiple scenarios including open play, corner kicks, a free kick, penalty, and a defensive run, and whether you're leading 1–0 or trailing 0–1 with 55 seconds remaining.
2. **Type a decision and watch it happen:** No A/B/C answers. Enter commands in English or Vietnamese. The ball and shirt-shaped players animate, defenders shift to pressure the ball, and possession changes after a completed pass. Explicit jerseys are honored: “pass to #2” targets player #2, and “tell #1 to run into the box” moves player #1 off-ball. Try “cross into the box”, “pass wide”, “pass back”, “shoot”, “dribble”, “hold”, “căn ngang”, “chuyền vào trong”, “sút”.
3. **Chain decisions:** After a pass, direct the receiver's next action. A scenario ends on a goal, loss of possession or full time. Play-by-play commentary records the sequence.

## Run
Open `dist/index.html` in a modern browser, or run `python -m http.server 8000 -d dist` and visit http://localhost:8000. No account, API key, build step or server logic required. Google Fonts enhance typography when online; fallback fonts work offline.

## Tests
Run `node --test tests/*.test.js` using Node.js 18+ to run the original and new test suites. See [TEST_LOG.md](TEST_LOG.md). Browser-based animation and mobile-layout checks are still necessary.

## Issue and PR history
- [Issue #2](https://github.com/QuocAn1909/before-the-pass/issues/2): Explain feedback after each choice (previous prototype).
- [PR #3](https://github.com/QuocAn1909/before-the-pass/pull/3): Merged previous improvement.
- [Issue #4](https://github.com/QuocAn1909/before-the-pass/issues/4): New free-text animated multi-decision experience.

## Source
- `dist/index.html` — new interface.
- `dist/style.css` — visual system, responsive layout, fonts.
- `dist/live.js` — SVG field rendering, ball/player animation and browser UI.
- `dist/engine.js` — command parser and deterministic game logic.
- `dist/data.js` — original role-specific situations and starting pitch positions.
- `tests/simulation.test.js` — command parser, chained decisions, failure and time-out cases.
- `dist/app.js`, `dist/game.js`, `tests/game.test.js` — archived source/tests for earlier version; not loaded by current page.

## Limitations
The parser supports more specific teammate commands but cannot truly reason about arbitrary free-form requests. A real AI backend would be required for unrestricted natural-language tactical understanding. The parser recognizes a fixed vocabulary and does not understand every human instruction. Movement and scoring use simplified deterministic rules, not physics or a live AI model. There are no goalkeeper mechanics or full team simulations. Possession loss ends the current attacking sequence; outcomes depend on handcrafted rules and are not realistic match forecasts. Time advances per action rather than by real-world seconds. No live data, accounts or analytics. The current match state resets on refresh.

## Updated aiming and timing
Drag a line on the SVG pitch with mouse or touch to select the intended shot destination on the upper goal line. Type `shoot` and press Play. A dive animation follows the chosen side. Shots from inside the penalty area score if aimed between the widened posts; outside-box shots may be blocked by a defender on their path or saved near the central keeper. The shot graphic stops at the block, save, miss, or goal destination. A visible real-time countdown now runs independently of actions and ends the play at full time, preserving the current score. Text instructions are handled by a finite rule-based interpreter rather than genuine unrestricted language reasoning.

## Manchester United training academy update
Fan-made United branding. Use the three menu tabs: Match Decisions (interactive simulation), Skills School (first touch, dribbling, shooting exercises), and Football Rules (short explanatory summaries). Pass backward with `pass to goalkeeper`. `pass to #1` still means the outfield player #1. Use `dribble past defender` or `number 10 run to the box` to move the ball carrier. A mouse-drawn aim line is **preview only** and affects play only after an explicit shooting instruction; non-shoot commands clear the preview. The training content is educational, and official football laws may change.

## Real Madrid Academy revision
Fan-made Real Madrid training mode: 11v11 pitch with 8 formations (4-3-3, 4-2-3-1, 4-4-2, 3-5-2, 3-4-3, 5-3-2, 4-1-4-1, 4-3-2-1). Selecting a formation respawns the 22 players in their respective lines. The Real Madrid side wears white; the goalkeeper is shirt #1. `pass số 2` resolves the named shirt #2. Skills School includes links to English-language Unisport / 7MLC videos, and Soccer Rules now has an interactive diagram for offside, onside, corners and penalties. Law explanations are simplified: consult IFAB for precise and current wording. The 22-player pitch is an educational schematic, not a professional tactical match engine.

## October 26 gameplay update
Title: **The Complete Soccer Academy**. Updated the formation layout to place defenders closest to the team's own goal, midfielders in central zones and attackers forward, facing opposite ends for each team. All 22 players remain visible, with selected scenario actors repositioned into their scenario context. The opposing goalkeeper is rendered using the actual #1 jersey, not an oval. Added handball notes, throw-in and goal-kick rules, plus animated simplified step-over, body-feint and sole-roll drills. The field has more visual space. Passing to exact shirt numbers is tested for #2–#9 and #11. These are schematic movements, not a fully dynamic tactical physics engine.

## Touchline update
Product-facing name is **Touchline**. A numbered off-ball run such as `num 7 run to the box` now moves the intended player while possession stays with the ball carrier. The Soccer Rules SVG includes a visually identified passer (P), receiver (R), defenders (D1/D2) and an animated pass line. The skill lessons show animated stick figures for stepovers, body feints and sole rolls. This is a rule-based demonstration, not unrestricted natural-language AI or motion-captured instruction.


## AI 101 midterm submission and deployment
- Public app title: **Touchline**. This project keeps the historical GitHub repository name `before-the-pass`.
- Run locally: download/extract full ZIP and open `dist/index.html`.
- Deployment workflow: `.github/workflows/pages.yml` publishes `dist/` to GitHub Pages when Pages is configured with **GitHub Actions** as source. Check the workflow run and actual Pages URL; no live-deployment success is implied by committing this YAML.
- Instructor evidence: `AGENTS.md`, `TASK.md`, `AI_USE.md`, `TEST_LOG.md`, `SCREENSHOTS.md`, `SUBMISSION_CHECKLIST.md`.
- See `PROJECT_INSTRUCTIONS.md` for browser AI-chat instructions.
- Important: source tests and PRs do not prove user-facing browser behavior; complete the honest manual test sheet and attach actual screenshots before submitting.
