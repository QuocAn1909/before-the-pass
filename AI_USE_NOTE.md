# AI Use Note — AI 101 Midterm

**Project:** Before the Pass — Soccer Decision Lab  
**Student:** An Le  
**AI tool:** OpenAI ChatGPT (GPT-6)

## Purpose
ChatGPT assisted with the prototype's HTML/CSS/JavaScript, soccer-situation wording, role-filtering and context-scoring logic, documentation, and the improvement that reveals reasoning immediately after each choice. There is no live AI API in the app.

## Representative prompts / instructions
- "Build a useful AI-assisted prototype for beginner college soccer players to practice match decisions."
- "Add choices for striker, midfielder and defender and compare decisions while leading versus trailing."
- "Show why each chosen action earns its score, not only the points."
- "Create a README, issue/PR evidence, and at least five tests with an edge case."

These summarize development instructions and are not a verbatim transcript of every prompt.

## Student contribution / changes
The project direction is based on the student's interest in soccer. The student chose the audience and learning goal; the repository uses static files that can be read and changed. The student must review the generated code and explanations, run the browser exercises, and record any adjustments they actually make before submitting. Do not claim independent student edits that were not performed.

## Verification
The source includes a Node.js test suite for core game-state rules and a browser checklist in `TEST_LOG.md`. Run `node --test tests/game.test.js` locally and record your observed output. Browser checks and screenshots require a real browser and should be completed by the student. Automated state tests do not prove that the entire browser interface is visually correct.

## Limitations and responsible use
AI-generated scenario evaluations are **illustrative opinions**, not verified soccer coaching advice. A different play may be reasonable depending on player ability, tactics and movement. No personal data is stored or sent to any service.
