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

## Follow-up improvement
After user feedback, ChatGPT corrected the wrong-recipient bug by resolving exact shirt numbers, added instructions for teammates running off the ball, added corner/free-kick/penalty/defensive recovery scenes, and improved animation by interpolating actual positions. This is still a limited rules-based game, not general language understanding.

## User-directed revision: October 22
The user reported mismatched block visuals, failed run language, requested mouse-drawn shot directions, a decorative diving goalkeeper and a real-time countdown. ChatGPT extended the rule-based engine and pitch display. There is no AI inference service: input is not guaranteed to be understood like ChatGPT. The student should verify behavior and screenshots in a browser before submitting.

## October 23 revision
The student requested a fan-made Manchester United academy layout, three navigation areas (decision practice, soccer skills, football rules), passing to a home goalkeeper, defender-beating dribbles and fixing accidental shot trajectories after moving the pointer. ChatGPT authored the edits and tests. This is still a rules-based simulation, not a general AI language model.

## October 26 revision
The student requested Real Madrid branding, exact Vietnamese jersey-directed passing, a 22-player pitch, formation selector, more thorough tutorials with English YouTube materials, and animated soccer-rule examples. ChatGPT implemented the layout, updated documents and source tests. Rule examples are simplified and require manual inspection prior to submitting as verified.

## October 26 follow-up
The student reported incorrect formation rows, jersey overlap for the goalkeeper, accidental pass to a different shirt, and insufficient contextual positioning. ChatGPT revised formation coordinates and added source-level regression tests and rule/skill examples. Browser visual testing remains for the student to confirm, and the student should disclose AI generation.

## Touchline revision
The student asked to rename the website Touchline, fix `num 7 run to the box`, use human stick figures for skills and show a passer in soccer law diagrams. ChatGPT generated the code and source assertions; visual browser checks must still be performed by the student.
