# AI Use Note — Before the Pass

**Student:** An Le | **Class:** AI 101 | **Tool:** OpenAI ChatGPT (GPT-6)

## Purpose and use
ChatGPT generated and revised HTML, CSS and JavaScript for an original, small soccer decision simulation. It also assisted with tests, README, tactical feedback and GitHub issue/PR tracking. No live AI API is used in the website itself.

## Representative requests
- "Make the interface look better — the typography is not good."
- "After the decision, animate the pass and defenders closing in."
- "Remove multiple-choice answers; let users type a decision, then move the ball and players appropriately."
- "If a cross reaches a teammate, ask for the next decision, such as shoot or pass. Continue until a goal, a safe full-time result, or the play ends."

## Student contribution / review
The student proposed the free-text input, live pitch movement, soccer ball and jersey markers, cascading decisions, and example of a cross followed by a shot. ChatGPT translated those requests into a deterministic rule-based prototype. The student must inspect the code, play scenarios in a browser, capture before/after screenshots, and document any personal edits rather than claiming edits not performed.

## Verification and changes
Previous interface showed three predefined choices. Updated interface uses typed commands, animated SVG movement, time and outcome tracking. Source-level JavaScript checks for the new engine were executed during development; refer to TEST_LOG.md for scope and limitations. Browser screenshots and visual validation are still required before submission.

## Safety / limitations
The command interpreter is a limited keyword parser and may misunderstand natural language or reject unfamiliar commands. Scoring/football outcomes are scripted simplifications, not professional tactical advice or match predictions. No personal data is collected or sent to AI APIs.
