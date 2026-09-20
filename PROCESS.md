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
Review then found why that class of bug survived: item E2 was declared
non-discriminating, but the excerpt a student opens read `quality=78`,
matching one route's final save and contradicting the other's. The tests
read the declaration and never the file. I made both routes end with the
same save, added a contract checking declared values against file
content, then put the original fault back to confirm the suite caught it
before reverting
([`11fa9c5`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/11fa9c5)).
That gave me a second acceptance question for evidence contracts: not
only "is this internally consistent," but "can a student act on it."

The brief's example courses pulled in both directions. From Calling
Bullshit I took reachability as an obligation — my own policy said a
resolving URL is not proof of a claim, which governs verification but
left the opposite failure open: a correctly cited reading a student
cannot get to. From CS 007 I refused the deck as sole artefact, since
here a week's content is its evidence pack. Both became `CLAUDE.md` rules
([`7d0a745`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/7d0a745));
only the citation rule became a check
([`ca7cbb2`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/ca7cbb2)),
which tests form — a locator plus a link or a stated no-link summary —
not whether a link resolves. Naming each week's specimen concretely
stayed editorial judgement, because I could not define a failure worth a
red build.

Another rule came from a bug the tests could not see: several workshops'
Deposit steps linked straight to their answer file, live and ungated. I
unlinked every reveal and wrote `spec/reveal-unlinked.test.ts` to scan
the built site
([`bf9f600`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/bf9f600),
[`7c7c89f`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/7c7c89f)).
Safe, but it wasted the predict-then-check pedagogy the course argues
for, so instead of reverting I gated it: the link activates only once a
student's own locked prediction exists in `localStorage` — a learning
nudge, not access control
([`671776e`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/671776e),
[`08195f5`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/08195f5)).
That static test proves only that no unconditional href ships, so
generalising the gate to week 1, I ran the built script through a Node
DOM shim in both states: locked hides the list and sets no href,
unlocked sets the correct pack-root path
([`9b257b5`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/9b257b5)).

The same discipline governs the illustrative tools, and I got it wrong
once. Reviewing a screenshot of week 6, I flagged that the edge-checker
sat under Investigate, where students reason about their own five
witnesses, while the tool's `A`/`B`/`C` are the three-witness toy table
from Check — its position implied it tested their real evidence, which it
never did. No test catches a mislabelling like that. I moved it beside
the table it actually uses and reworded both sections
([`9896cef`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/9896cef)).

I also declined to write "what you should find" text for the seven weeks
that publish none
([`0718709`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/0718709)).
What I have not established: nobody but their author has attempted these
activities, so "a student can now do this" stays a reasoned claim, not
an observed result.
