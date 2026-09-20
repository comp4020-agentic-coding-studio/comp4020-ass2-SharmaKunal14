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

The site itself was "too boring," so I added a predict-then-reveal widget
to the workshops: a textarea that locks a prediction into `localStorage`
before comparing it against real data, wiring 11 of 12 workshops' own
existing "write down what you expect first" pedagogy into something a
student actually has to do
([`751ab1e`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/751ab1e),
[`1dcfc5b`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/1dcfc5b)).
Asked to move it back to its originally designed inline position and to
make each five-minute Check's answer an on-page reveal rather than
always-visible prose, I converted every session file to `.mdx` so the
widget could sit inside each week's own body instead of after the whole
rendered page, and wrapped each Check's indicative answer in a `<details>`
toggle
([`8046912`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/8046912),
[`bac3ed2`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/bac3ed2)).
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
The archive page opened straight into two abstract governance rules with no
statement of what the archive actually is or why audio and image files
aren't published there; I added a purpose line and a card grid to each
collection, then a callout stating the evidence-as-data reasoning upfront so
a reader isn't left assuming the missing media is an oversight
([`d41b7cf`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/d41b7cf),
[`9f2aad2`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/9f2aad2)).

With the deadline explicitly set aside for a session, the ask shifted to
more interactive, creative work. I built a live generation-loss simulator —
degrading a student's own text across generations using week 1's exact
counting rule, ported client-side, so "identical" versus "derived from"
stops being an abstraction and becomes something a slider changes in front
of you — and a progress dashboard that reads the predict-then-reveal
records the site already writes across all twelve workshops, so it needed
no new state of its own
([`4715c81`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/4715c81),
[`dbb2f1f`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/dbb2f1f),
[`118474c`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/118474c)).
The simulator's own scoped styles turned out not to apply to elements it
built at runtime with `document.createElement`, so every error bar rendered
at zero height until I marked those selectors `:global`; a follow-up pass
added a one-line caption above each section and rebuilt the dashboard as a
progress bar and card grid instead of a plain checkmark list
([`0488aed`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/0488aed),
[`d1e6f89`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/d1e6f89)).

A content read-through against the assignment's "response to the brief"
criterion found weeks 5 through 12 all carrying the identical three `spec:`
bullets, copied verbatim — exactly the "starter with the nouns swapped"
pattern the brief marks down even though nothing here is machine-checked.
Each week's bullets were rewritten to name that week's own artefact and
judgement call instead of paraphrasing the same template eight times
([`099f4d9`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/099f4d9)).

A homepage timetable followed, one row per week naming that week's
lecture, workshop, recurring Generation Check and anything due — with due
dates placed by computing, per assessment, the latest session on or before
its actual due timestamp rather than trusting the week it was introduced,
since those two differ for several pieces
([`c428041`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/c428041)).
Its header text turned out illegible against the theme's dark header
background, and every row's Check link pointed at the same generic
overview instead of that week's own evidence and question; I fixed the
missing color and mapped each week to its real anchor
([`67a00ad`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/67a00ad)).
The Check itself was still a `<details>` disclosure that handed over the
indicative answer to anyone who expanded it with no requirement to answer
first, so I turned it into a small submit-then-reveal quiz: a textarea a
student commits an answer to before the indicative answer appears, with
the response kept in the same kind of namespaced `localStorage` record the
prediction widget uses, but under its own key so the two never collide
([`9b6eb05`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/9b6eb05)).
Told the timetable repeated itself — the same "Lecture"/"Workshop" pair and
the same "Weekly check" phrase down every row, since a week's lecture and
workshop always share one title — I was given explicit room to change the
layout, not just its styling, and replaced the table with a week-card list:
one title per week, three short role pills pointing at the three pages that
title actually names
([`ebb9c58`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/ebb9c58)).

Asked what further interactive elements to add, I recommended two grounded in
existing code rather than new dependencies: extending the progress dashboard
to also track five-minute-check submissions, and a character-diff visualizer
reusing the simulator's own counting rule. Told to build both, the dashboard
gained a second bar, badge and `visually-hidden` status per card for the
`check:<sessionSlug>` records `FiveMinuteCheck.astro` already wrote, entirely
from existing data
([`dc24cc4`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/dc24cc4)).
The visualizer ports `countErrors` a second time into its own component,
marking any two pasted equal-length strings character by character rather
than only totalling them, with the same `:global` fix applied proactively to
its client-created spans
([`92d807e`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/92d807e)).

Told to link the two simulator tools to specific workshops and improve the
simulator page's navigation, "be creative", I added a `presets` prop and a
`?from=<slug>` query param read client-side by each component — the only
option on a static build with no per-request rendering — then linked week 1
to both tools, week 5 to the character-diff visualizer, and weeks 6, 7 and 9
to the chain simulator, framing weeks 7 and 9 explicitly as an analogy since
neither week's own model matches the simulator's character-substitution
mechanism. The simulator page itself gained a chooser card pair, anchored
`:target`-highlighted sections and reciprocal "used in" backlinks in place of
two stacked widgets with no wayfinding
([`cc304bd`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/cc304bd),
[`7504976`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/7504976)).

A screenshot showed the new `:target` outline cutting across the
paragraph beneath it — `outline-offset` draws outward with no reserved
layout space, so an adjacent element with no margin of its own sat right
where the ring was drawn; fixed with one `margin-block` added to the same
rule
([`2ab452f`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/2ab452f)).
Asked for more interactive elements and given an explicit build order, the
first was a confusable-character heatmap on the chain simulator: every
mismatch between the original text and its final generation is now
attributed to whichever of week 1's confusable groups the **original**
character belonged to, and rendered as one bar per group, reusing the
existing bar markup and `:global` CSS pattern rather than inventing a new
chart type
([`4a4f4e1`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/4a4f4e1)).
Next, `PredictionCheck` gained an optional `whatYouShouldFind` prop that
shows a locked prediction beside a short quote of that same week's own
published findings — but a survey first found only 5 of 12 weeks actually
publish a "What you should find" section, so the prop is wired into only
those five rather than invented for the rest
([`0718709`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/0718709)).
Third, the chain simulator gained a "Corruption model" toggle between the
existing random rate-based corruption and a new deterministic rule that
corrupts every Nth character with no randomness at all, letting the same
algorithm-vs-world distinction week 1 already teaches be switched between
on the same text instead of only read about
([`888ce06`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/888ce06)).
Fourth, a new resampling simulator ports the shape of week 9's own
baseline/full-recursive/retained-mix model — re-read from
`packs/week-09/build.ts` to get the third condition's exact mixing rule
right — as an editable category distribution, deliberately using
unseeded `Math.random()` and never the pack's own seeded data, so the
tool cannot be mistaken for the graded artifact; it renders the rarest
category's share thinning out under `full-recursive`, alongside a plain
table of full counts, and is linked from both the simulator page and
`09-recursion.mdx` as an explicit analogy of the model's shape
([`e53867b`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/e53867b)).
Fifth and last, week 6 gained a stemma evidence-strength edge-checker,
embedded directly in its Investigate section: pick two witnesses from the
same check-stage evidence table already printed on the page, and it
reports which points they share and whether each is strong or weak
evidence for a common ancestor, using week 5's own classification rule —
it never compares a proposed edge against the real tree, so `reveal/`
stays untouched by construction, confirmed by re-running
`spec/reveal-unlinked.test.ts` and `spec/pack-zip.test.ts` standalone
after the change
([`2cb8ed4`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/2cb8ed4)).

Every decision above, including mutation-testing tables proving each new
contract fails when the defect is reintroduced, is recorded in
`docs/decision-log.md` when it was made, not reconstructed afterward.
