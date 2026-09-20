# Process overview

SLOP8350, "Generation Loss," is built on one distinction: "identical" and
"derived from" are different claims, and a course that blurs them cannot
teach anyone to check evidence carefully. Every week — photocopies, audio
dubs, re-encoded JPEGs, resampled categories, custody chains — asks the
same question of a different artefact: what changed, and can the evidence
in front of a student actually answer that?
[`4b30563`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/4b30563)
replaced the starter content with this course.

That question became a standing test of my own work, not just the
students'. Week 4's first build passed 75 green tests and was still
unusable: it withheld a prediction no formula could derive, pointed at
evidence with no file behind it, and asserted a forensic technique the
literature says may not apply. The tests had only checked that authored
data agreed with the authored answer, never whether a student could act
on it. I rewrote the contracts to ask that second question
([`d7863b6`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/d7863b6));
a second review then found a test that checked an evidence item's label,
not its actual content — the label said `discriminates: false` while a
route's own JSON gave it away. I fixed the bug structurally, added a
contract comparing declared values against real file content, and put
the original fault back in to confirm the new suite actually catches it
before reverting
([`11fa9c5`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/11fa9c5)).
Every `spec/` contract since has had to answer "can a student act on
this," not just "is this internally consistent."

I read another course's syllabus for the same reason: two of its
readings resolved but weren't retrievable, so I added a rule that every
citation needs a locator plus a link or an original summary
([`7d0a745`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/7d0a745)),
later backed by a check once I noticed the rule itself had no enforcement
([`ca7cbb2`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/ca7cbb2)).
The same review rejected that course's deck-only delivery: here, a
week's evidence pack is its content, not its slides.

A second rule came from a bug the tests couldn't see: several workshops'
Deposit steps linked straight to their own answer file, live and
ungated. I unlinked every reveal and wrote `spec/reveal-unlinked.test.ts`
to scan the built site for any stray link
([`bf9f600`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/bf9f600),
[`7c7c89f`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/7c7c89f)).
That was safe but wasted pedagogy the course argues for elsewhere —
predict, then check — so rather than reverting the unlink, I gated it: an
answer link only activates once a student's own locked prediction exists
in `localStorage` — a learning nudge, not access control, so the shipped
HTML still never carries a working reveal href either way
([`671776e`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/671776e),
[`08195f5`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/08195f5)),
later generalised to week 1's standalone `worked-answer.md`
([`9b257b5`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/9b257b5)).

The same discipline governs every later illustrative tool: never let it
be mistaken for the graded artefact. The resampling simulator ports the
shape of week 9's model but with unseeded randomness on invented data
([`e53867b`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/e53867b)),
and the week-6 stemma checker scores evidence strength without ever
comparing a proposed edge to the real tree, so `reveal/` stays untouched
by construction
([`2cb8ed4`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/2cb8ed4)).

Response to the brief got its own correction: weeks 5-12 originally
shared identical `spec:` bullets, exactly the "starter with the nouns
swapped" pattern the brief marks down. Each week's bullets now name that
week's own artefact and judgement call
([`099f4d9`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/099f4d9)).

What I left out, deliberately: no invented "what you should find" text
for the seven weeks that don't publish one — the prediction-replay
widget only ever echoes findings a week already states publicly
([`0718709`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/0718709)).
`docs/decision-log.md` records every choice and check as made, not
reconstructed afterward.
