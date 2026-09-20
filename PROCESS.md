# Process overview

SLOP8350, "Generation Loss," is built on one distinction: "identical" and
"derived from" are different claims, and a course that blurs them cannot
teach anyone to check evidence carefully. Every week — photocopies, audio
dubs, re-encoded JPEGs, resampled categories, custody chains — asks the
same question of a different artefact: what changed, and can the evidence
in front of a student actually answer that?
[`4b30563`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/4b30563)
replaced the starter content with this course.

That question became a test of my own work too. Week 4's first build
passed 75 green tests and was still unusable: it withheld a prediction no
formula could derive, pointed at evidence with no file behind it, and
asserted a forensic technique the literature says may not apply. I
rewrote those contracts
([`d7863b6`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/d7863b6)).
A later review then found why that class of bug survived: evidence item
E2 was declared non-discriminating, but the excerpt a student actually
opens read `quality=78`, which matched one route's final save and
contradicted the other's. The tests had read the declaration and never
the file. I made both routes end with the same save, added a contract
checking declared values against real file content, then put the original
fault back to confirm the new suite caught it before reverting
([`11fa9c5`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/11fa9c5)).
That gave me a second acceptance question for evidence contracts since:
not only "is this internally consistent," but "can a student act on it."

The brief's example courses informed the harness in both directions. From
Calling Bullshit I took reachability as an obligation — it links nearly
every required reading to a retrievable copy, and gives chapters where it
cannot. My own policy already said a resolving URL is not proof of a
claim, which governs verification but left the opposite failure open: a
correctly cited reading a student cannot get to. That became a
`CLAUDE.md` rule — every reading carries a locator plus a link or an
original summary — alongside a second requiring each week to name its
specimen concretely
([`7d0a745`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/7d0a745)).
From CS 007 I refused the deck as sole artefact: it works for a
guest-speaker course, but here a week's content is its evidence pack, so
a week reduced to a slide link is unattemptable. Both new rules stayed
editorial until I harnessed them with checks
([`ca7cbb2`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/ca7cbb2)).

Another rule came from a bug the tests could not see: several
workshops' Deposit steps linked straight to their own answer file, live
and ungated. I unlinked every reveal and wrote
`spec/reveal-unlinked.test.ts` to scan the built site
([`bf9f600`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/bf9f600),
[`7c7c89f`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/7c7c89f)).
That was safe but wasted the predict-then-check pedagogy the course
argues for, so rather than reverting I gated it: an answer link only
activates once a student's own locked prediction exists in
`localStorage` — a learning nudge, not access control, so the shipped
HTML still never carries a working reveal href
([`671776e`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/671776e),
[`08195f5`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/08195f5)),
later generalised to week 1's `worked-answer.md`
([`9b257b5`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/9b257b5)).

The same discipline governs the illustrative tools: never let one be
mistaken for the graded artefact. The resampling simulator ports week 9's
shape with unseeded randomness on invented data
([`e53867b`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/e53867b));
the week-6 stemma checker scores evidence strength without comparing a
proposed edge against the real tree
([`2cb8ed4`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/2cb8ed4)).

What I declined to write matters too: no "what you should find" text for
the seven weeks that publish none, so the prediction-replay widget only
echoes findings a week already states publicly
([`0718709`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/0718709)).
And what I have not established: nobody but their author has attempted
these activities, so "a student can now do this" stays a reasoned claim,
not an observed result. `docs/decision-log.md` carries the supporting
detail, including that limit.
