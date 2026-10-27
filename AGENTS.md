# Touchline — project instructions for AI agents

## 1. Project facts
- Audience: college students and soccer fans learning match decisions, technical skills and basic Laws of the Game.
- Purpose: practice simple soccer decisions and review skill/rule demonstrations.
- Focus feature 1: an interactive soccer decision simulation with numbered-player commands and visible pitch responses.
- Focus feature 2: soccer-rule examples with an interactive field (including a passer, receiver and defenders).
- Technology: static HTML, CSS, browser JavaScript and Node.js built-in test runner for source-level checks. No private API key and no live AI backend.
- Repository: `QuocAn1909/before-the-pass`. User-facing name: **Touchline**.
- Run: extract/download the whole repository, then open `dist/index.html`; run `node --test tests/*.test.js` if Node.js is installed.
- Publish: GitHub Pages should serve `dist/` via the provided Pages workflow after the repository's Pages source is configured to GitHub Actions.

## 2. Every request: five-step routine
1. Read the relevant existing files and protect working features.
2. Restate ONE requested change and its expected behavior.
3. Plan the smallest set of changes in TASK.md before editing.
4. Implement only that change using the same stack.
5. Run honest checks and report changes, how to test, and remaining limitations.

## 3. Rules
- Never replace existing HTML/CSS/JavaScript with a different framework without approval.
- Match explicit numbered jerseys: do not silently target another player.
- Do not claim the rule-based command parser is a ChatGPT-like unrestricted AI.
- No secret tokens, credentials, false citations or fabricated tests.
- Preserve keyboard access and responsive layout where possible.
- When modifying files, keep references/relative paths valid.
- Report browser checks as NOT RUN unless they were actually performed.

## 4. Definition of done
- Audience and need documented; two working features including an interactive feature.
- One authentic initial prompt, a follow-up prompt and before/after evidence.
- Five real user-run tests including an edge/failure, with actual outcomes in TEST_LOG.md.
- README.md, AGENTS.md, TASK.md, AI_USE.md and evidence links present.
- Public GitHub repo and working GitHub Pages URL checked by the student.

## 5. Report format
Changed: [files and behaviors].
How to test: [repeatable actions with expected result].
Verified: [tests actually run, where and when].
Not done / limitations: [remaining manual checks, defects].

## 6. Skills to use
Use the teacher's seven recipes when supplied: plan-feature, build-feature, test-and-log, fix-bug, ui-accessibility-review, fact-privacy-check and submission-check. Do not claim those `SKILL.md` folders are installed unless they are actually present.
