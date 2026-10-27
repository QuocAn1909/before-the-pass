# AI Use and Prompt Revision — Touchline

## What AI contributed
ChatGPT helped implement and revise static HTML/CSS/JavaScript, design the pitch and animation, improve exact-jersey command parsing, and write source-level tests and documentation. A GitHub connector was used for commits and pull requests. This application does **not** call a live AI language model; natural-language commands use a rule-based interpreter.

## Audience and purpose
For college students and soccer fans, Touchline lets them rehearse simple soccer match decisions and learn from illustrated Laws of the Game.

## Authentic prompt pair — as written in the project chat

**Initial prompt (user, exact text):**
> đặt là touchline đi
> với lại t kêu là num 7 run to the box mà lệnh k đc thực hiện đúng 
> tất cả các số áo nếu t kêu làm j thì p làm đúng như v
> mẹ cái skill minh hoa m làm như cức v 
> làm hình ảnh 1 đứa người que thực hiện động tác đi 
> với t kêu rồi 
> cái soccer rule phải có thằng chuyền dcmm

**Follow-up prompt (user, exact text):**
> thì làm đi

These are literal chat excerpts, not invented polished prompts. The initial message identifies bugs and desired revisions; the follow-up authorizes implementation. Because these prompts were sent after earlier versions of Touchline already existed, the strongest before/after evidence is the change from the previous GitHub commit to PR #17.

## Revision and check
- Previous behavior reported by the student: `num 7 run to the box` did not execute correctly.
- Change: interpret `num N` jersey syntax; run the explicitly named player into the penalty area while keeping possession with the ball carrier.
- Source-level check: `num 7 run to the box` resolved as type `run`, jersey 7, and moved #7. This does not establish a successful visual browser test.
- Extra changes: Touchline branding, stick-figure skill animation, explicit passer+receiver rule diagrams, and correction of broken skill-card markup.
- GitHub PR: https://github.com/QuocAn1909/before-the-pass/pull/17

## Before/after proof (student action required)
1. Capture the PREVIOUS version showing wrong/absent action, or use an authentic previous screenshot already taken.
2. Capture the CURRENT version showing `num 7 run to the box` moving #7.
3. Save `evidence/before.png` and `evidence/after.png`, or clearly link the original screenshots in SCREENSHOTS.md.
4. Describe what was observed. **Do not invent screenshots** or mark tests passed based on the description alone.

## Verification and limitations
AI-generated source-level checks can catch parsing mistakes but cannot replace human observation of animation and responsiveness. No external AI backend, full 11v11 tactical intelligence, physics engine or unrestricted command comprehension is implemented. I reviewed the requested behaviors through project chat and will report my own browser checks in TEST_LOG.md.

## AI transparency
Tools used: ChatGPT and GitHub connector. AI output included code, test suggestions and documentation. The student remains responsible for checking and submitting the actual working project.
