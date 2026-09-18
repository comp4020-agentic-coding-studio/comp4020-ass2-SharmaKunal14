# Process overview

## What I built

SLOP8350, "Generation Loss": a course about copies, not about media. Every
week trains one question — what changed between this artefact and its
ancestor, and can the available evidence actually answer that — across
photocopies, audio dubs, re-encoded JPEGs, resampled data and file custody
chains. The idea running the whole semester is that "identical" and "derived
from" are different claims, and a course that keeps blurring them cannot
teach anyone to be careful. [`4b30563`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/4b30563)
replaced the starter content with this course; [`f6bc4e2`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/f6bc4e2)
fixed the code as SLOP1350.

## How I got here

Each week is built as a generated evidence pack (`packs/week-NN/build.ts`)
plus a `spec/` contract asserting what the pack promises a student can do
with it — not just that the data is internally consistent. That distinction
is where most of the real work happened.

Week 4 is the clearest case. The first build ([`a234bac`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/a234bac))
passed 75 green tests and was still unusable: it withheld a prediction no
formula in the pack could derive, pointed a student at evidence that had no
file behind it, and asserted a real forensic technique (double-JPEG
detection) in conditions where the literature says it may not apply. The
tests had only checked that the authored data agreed with the authored
answer, never whether a student could act on it. I rewrote the contracts to
ask that second question and fixed all three defects
([`d7863b6`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/d7863b6)).
A second review then found a sharper bug in my own fix: an evidence item was
labelled `discriminates: false` in the JSON while its actual text content
(`quality=78`) contradicted one of the two routes — every test passed
because they checked the label, never the content the label described. I
fixed it structurally, making both routes share a final encode step so the
label became true rather than patched, and added a contract that checks
declared "distinguishing values" against every non-discriminating file's
real content, not just its declaration
([`11fa9c5`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/11fa9c5)).
Week 1 had the same shape of bug earlier: `worksheet.csv` shipped with every
answer already filled in while the page told students to fill it in
themselves ([`d03a2e2`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/d03a2e2)).

A later pass found something the tests couldn't see because it wasn't a data
bug: every workshop's "Deposit" step linked directly to its pack's answer
file, live on the public site with no gate at all. I unlinked every reveal
from every session page, lecture deck and pack index, and wrote
`spec/reveal-unlinked.test.ts` to scan the built site for any `/reveal/`
href so the link can't quietly come back
([`bf9f600`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/bf9f600),
[`7c7c89f`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/7c7c89f)).
This session, a user report of mojibake in a downloaded pack's `.txt` file
traced to typographic punctuation surviving into plaintext with no declared
charset; fixed at the content layer with ASCII substitutions since GitHub
Pages gives no server-header escape hatch
([`b23d822`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/b23d822)).
The twelve week hero images were then redesigned from text cards to textless
abstract motifs, because the theme's `Hero.astro` already overlays the real
page title and the old images duplicated it
([`9c10596`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/9c10596)).

Every decision above, including full mutation-testing tables proving each
new contract actually fails when the defect is reintroduced, is recorded in
`docs/decision-log.md` at the time it was made, not reconstructed afterward.
