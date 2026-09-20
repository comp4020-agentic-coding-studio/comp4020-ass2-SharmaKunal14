# Process overview

SLOP8350, "Generation Loss," is built on one distinction: "identical" and
"derived from" are different claims, and a course that blurs them cannot
teach anyone to check evidence. Every week — photocopies,
re-encoded JPEGs, custody chains — asks the
same question of a different artefact: what changed, and can the evidence
in front of a student answer that?
[`4b30563`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/4b30563)
replaced the starter content with this course.

That question tested my own work too. Week 4's first build
passed 75 green tests and was still unusable: it withheld a prediction no
formula could derive, pointed at evidence with no file behind it, and
asserted a forensic technique the literature says may not apply. I
rewrote those contracts
([`d7863b6`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/d7863b6)).
Review found why: item E2 was declared
non-discriminating, but the excerpt a student opens read `quality=78`,
matching one route's final save and contradicting the other's. The tests
read the declaration and never the file. I made both routes end with the
same save, added a contract checking declared values against file
content, then reintroduced the fault to confirm the suite caught it
([`11fa9c5`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/11fa9c5)).

The brief's example courses pulled both ways, and both became harness rules. From Calling Bullshit I took
reachability as an obligation: my own policy said a resolving URL is not
proof of a claim, leaving the opposite
failure open: a correctly cited reading a student cannot reach. That
became two `CLAUDE.md` rules: citation form, and naming each week's
specimen concretely
([`7d0a745`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/7d0a745)).
Only the citation rule later got a check
([`ca7cbb2`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/ca7cbb2)),
and it tests citation form — locator plus link or stated summary — not
whether a link resolves. From CS 007 I refused the deck as sole
artefact, since a week's content here is its evidence pack; that became
the rule that every deck closes with a text walkthrough, enforced by
`spec/deck-coverage.test.ts`
([`9ec7c71`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/9ec7c71)).

Another rule came from a bug the tests could not see: several workshops'
Deposit steps linked straight to their answer file, ungated. I
unlinked every reveal and wrote `spec/reveal-unlinked.test.ts`, scanning
the built site for any unconditional link into a pack's `reveal/`
folder
([`bf9f600`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/bf9f600),
[`7c7c89f`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/7c7c89f)).
Safe, but it wasted the predict-then-check pedagogy the course argues
for, so I gated it instead of reverting: the link activates only once a
student's own locked prediction exists in `localStorage` — a learning
nudge, not access control
([`671776e`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/671776e)).
Week 1's answer is a top-level `worked-answer.md`, outside that test's
scope, so extending the gate there needed its own evidence: the built
script run through a Node DOM shim in both lock states, locked setting no
`href`, unlocked the correct pack-root path
([`9b257b5`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/9b257b5),
[`4c83ef8`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/4c83ef8)).

Reviewing a screenshot of week 6, I rejected what had shipped: the
edge-checker sat under Investigate, where students reason about their own
five witnesses, while its `A`/`B`/`C` are the toy table from Check — so
its position implied it tested their real evidence.
The existing tests did not catch that misleading placement. I asked for
it to move beside the table it actually uses, both sections reworded, and
required the built HTML to show the checker ahead of Receive before
accepting it
([`9896cef`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/9896cef)).

I declined to write "what you should find" text for the seven weeks that
publish none: the replay widget may only echo a finding a week already
states publicly, so it can neither invent a result nor surface an answer
still withheld
([`0718709`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/0718709)).
What I have not established: nobody but their author has attempted these
activities. An author check and a DOM simulation are not a student trial,
so "a student can now do this" stays a reasoned claim.
