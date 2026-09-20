# Process overview

## What I built

SLOP8350, "Generation Loss": a course about copies, not media. Every week
trains one question — what changed between this artefact and its ancestor,
and can the available evidence actually answer that — across photocopies,
audio dubs, re-encoded JPEGs, resampled data and file custody chains. The
idea running the semester is that "identical" and "derived from" are
different claims, and a course that keeps blurring them cannot teach anyone
to be careful. [`4b30563`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/4b30563)
replaced the starter content with this course; [`f6bc4e2`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/f6bc4e2)
fixed the code as SLOP1350.

## How I got here

Each week is built as a generated evidence pack (`packs/week-NN/build.ts`)
plus a `spec/` contract asserting what the pack promises a student can do
with it — not just that the data is internally consistent. That distinction
is where most of the real work happened.

Week 4 is the clearest case. The first build ([`a234bac`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/a234bac))
passed 75 green tests and was still unusable: it withheld a prediction no
formula could derive, pointed a student at evidence with no file behind
it, and asserted a real forensic technique (double-JPEG detection) where
the literature says it may not apply. The tests only checked that the
authored data agreed with the authored answer, never whether a student
could act on it. I rewrote the contracts to ask that second question and
fixed all three defects
([`d7863b6`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/d7863b6)).
A second review found a sharper bug in my own fix: an evidence item was
labelled `discriminates: false` while its text content (`quality=78`)
contradicted one route — every test passed because they checked the
label, never the content it described. I fixed it structurally, sharing a
final encode step across both routes so the label became true rather than
patched, and added a contract checking declared "distinguishing values"
against every non-discriminating file's real content
([`11fa9c5`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/11fa9c5)).
Week 1 had the same shape of bug earlier: `worksheet.csv` shipped with
every answer already filled in
([`d03a2e2`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/d03a2e2)).

A later pass found something the tests couldn't see, since it wasn't a
data bug: every workshop's "Deposit" step linked straight to its pack's
answer file, live on the public site with no gate at all. I unlinked every
reveal from every session page, deck and pack index, and wrote
`spec/reveal-unlinked.test.ts` to scan the built site for any `/reveal/`
href so the link can't quietly come back
([`bf9f600`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/bf9f600),
[`7c7c89f`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/7c7c89f)).
A fully hidden reveal was safe but wasted pedagogy the course argues for
elsewhere: commit to a prediction, then check it. Rather than revert the
unlink, I loosened it: `packs/pack-index.ts` gained an optional gated
section listing a pack's answer file as `href="#"` until an inline script
finds that workshop's locked prediction in `localStorage`, the record the
site's predict-then-reveal widget already writes
([`671776e`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/671776e),
[`08195f5`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/08195f5)).
The shipped HTML still never carries a working reveal href, so the
existing test kept its meaning. Week 1's `worked-answer.md` was a
standing, documented exception, sitting at the pack root rather than
under `reveal/`; folding it into the same gate meant generalising the
reveal entry from a bare filename to a path — the mechanism, not just its
one target
([`9b257b5`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/9b257b5)).
A mojibake report in a downloaded pack's `.txt` file traced to typographic
punctuation surviving into plaintext with no declared charset; fixed with
ASCII substitutions, since GitHub Pages gives no server-header escape hatch
([`b23d822`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/b23d822)).
The twelve hero images were then redesigned from text cards to textless
abstract motifs, since the theme's `Hero.astro` already overlays the real
page title
([`9c10596`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/9c10596)).

Every decision above, including mutation-testing tables proving each new
contract fails when the defect is reintroduced, is recorded in
`docs/decision-log.md` when it was made, not reconstructed afterward.
