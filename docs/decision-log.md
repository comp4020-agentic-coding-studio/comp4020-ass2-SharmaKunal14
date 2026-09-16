# Decision log

Record real decisions and verification here. Planned checks are not results.
`PROCESS.md` remains the student's own final evidence narrative.

## 2026-09-15 — Finalise decisions before implementation

**Scope:** The user requested planning changes only. No course pages, datasets,
decks or application code were built by this update.

### Decisions and reasons

- Adopt the lecture, workshop and check times and four exact assessment
  timestamps in course-plan §4 and §7. Teaching dates remain bare dates; A4
  denotes the end of the weekly series, not a separate final submission.
  A2's pack opens at the end of the week 6 workshop, at 14:00.
- Establish document ownership. The master plan owns course decisions; weekly
  files own detailed teaching, resources and task-specific checks; the phase
  README owns shared procedures. Remove duplicated weekly briefs from the
  master plan and repeated generic procedures from individual phases to reduce
  the risk of contradictory updates. CLAUDE.md owns agent instructions.
- Keep Print, Audio and Image as recurring collections; distinguish Sequence
  model, Bits and Distribution model studies. Parent-child edges remain inside
  families. Weeks 7 and 9 must label results as simplified models and state
  omissions, preventing a comparison from implying scientific equivalence.
- Prioritise the future home page, weeks 5–6, required deck and independent
  nine-witness A2 pack. The home page must explain topic, audience, investigation,
  arc and navigation on its first screen. Retain compact usable resources in
  other weeks instead of expanding optional downloads.
- Require a future rehearsal before expansion, including alternative trees,
  unresolved edges, accessible evidence, accidental hints and measured timings.
  An author consistency rehearsal is not a blind learner test; record that limit.

### Verification and limits

The planning files were reviewed against the supplied decisions. Read-only
documentation checks passed for all 12 seven-section weekly plans, local
Markdown links and anchors, Monday/Wednesday dates and the break, all four
deadline conversions using the Australia/Sydney timezone, and trailing
whitespace. `git diff --check` passed for tracked edits; the separate file
checks also covered the untracked planning documents. No activity has been
rehearsed through this update, and no student timing or learning result is claimed.
Readings still require source review during implementation. A coherent plan
does not establish that the final website merits 90%.

**Commit:** `5a2bbf0` (`docs: finalize Generation Loss course plan`).

## 2026-09-15 — Pre-implementation corrections and scope decisions

- Removed temporary session-control wording from the permanent harness and plan.
  The evidence distinction remains: planned work is not a completed result.
- Made the homepage point of view explicit: an exact-copy control refutes the
  assumption that every generation loses information, then the course tests when
  different copying processes leave defensible historical clues.
- Changed A2 from a fixed nine witnesses to a five-to-nine range. Construct and
  time one witness first; choose the smallest final count that still supports
  branching, a credible alternative and an unresolved edge. Time alone does not
  justify weakening the assessment evidence.
- Added four planned course contracts: the 120-minute workshop structure,
  accessible routes, deposits/archive classifications and policy links. Presence
  checks must use structured course data or rendered links rather than keywords;
  human review still judges quality and equivalence.
- Corrected week 2's stale direction from “below” to §2 above.

These are planning corrections. The tests, homepage and A2 witness have not yet
been implemented or timed.

## 2026-09-15 — Phase 0 implemented

**Scope:** Course record, navigation, twelve teaching skeletons, four assessment
briefs, teaching team, policies, archive page, home page and three course
contracts. Workshop and lecture bodies are skeletons marked `draft: true`; their
supplied evidence, instructions and indicative answers are not written.

### Decisions and reasons

- Added `learningOutcomes` to the template's local record schema in
  `src/course-config.ts`. The platform's own `courseMetaSchema` already accepts
  and emits learning outcomes; the template's local schema is a strict subset
  that omitted them, so the five outcomes had nowhere to live but page prose.
  They are now course data on `/api/index.json` with one source of truth. The
  fixed platform — branding, collection keys, build pipeline, generated API —
  is untouched.
- Used `archiveCollections` as an array rather than a single
  `archiveCollection`. Week 12 is a cross-family preservation decision, and a
  single-value field would have forced it to declare one family falsely. The
  contract checks at least one value, and that every value is in the §5 set.
- Put durations in structured frontmatter (`stages`, `investigation`) rather
  than prose. A keyword search for "40 minutes" would pass on a sentence that
  merely mentions it, and would say nothing about whether the published
  timetable adds up.
- Omitted portraits for the three staff entries and deleted the starter
  portrait files rather than replacing them, taking the plan's option to omit
  images that add little. The home hero and social card are still the starter
  images and still fail `check:evidence`.

### Verification and limits

`pnpm check` passes: 0 type errors, 40 pages built, axe clean on all 40, no
broken links, no base-path escapes, course API 32 nodes and 43 edges, 19 tests
in 4 files green.

The three new contracts were mutation-tested to establish that they detect a
violation, then reverted. This was a **deliberate test exercise, not an
accidental failure in the course design**:

| Mutation | Contract | Result |
|---|---|---|
| Week 3 workshop moved to Thursday | `teaching-schedule` | 2 of 5 failed |
| Week 3 `accessibleRoute` deleted | `weekly-contract` | 1 of 5 failed |
| A1 weight 20 to 25 | `assessment-contract` | 1 of 8 failed |
| A2 pack released a day before the week 6 workshop | `assessment-contract` | 1 of 8 failed |

All four were reverted and the suite was green at 19 of 19 afterwards.

**Corrected an error carried by the previous revision.** The plan and the
harness both stated that an offset-bearing local-midnight date could serialize
to the previous UTC day and break the shipped date-range check. That is false
for this platform: the course API emits frontmatter dates verbatim. Verified by
round-tripping `due: 2027-03-26T12:00:00+11:00` through a build and reading
`dist/api/index.json`, which returned the identical string, so `slice(0, 10)`
yields the local calendar date. Both documents now say this, and say the earlier
claim was wrong.

**Found by the build rather than by review:** a hand-written `href="/archive/"`
in `src/pages/index.astro` escaped the repository base path — the exact failure
`README.md` warns about, which works on localhost and 404s when deployed. The
theme's base check caught it; the inline link now derives its href from
`import.meta.env.BASE_URL`.

No teaching activity has been rehearsed, no reading has been source-verified and
no timing has been measured.

**Commits:** `d806460...26c5c21` — `3edac8c` course record, `4b30563` course
content, `491a0f5` home page, `26c5c21` the three contracts. The final tree was
verified green; intermediate commits were ordered by dependency but not each
built individually.

## 2026-09-15 — Week 6 pack spike

**Scope:** Built the week 6 reconstruction puzzle ahead of the weekly phases,
as a feasibility spike. Not the week 6 page — the pack only. Nothing links to
it yet.

### Why this was built out of order

The plan's build order (`weeks/README.md`) says to start with the home page and
weeks 5–6. On review, three of the four reasons for that had already been paid
off by phase 0: all twelve skeletons exist so forward refs resolve in any fill
order, the arc is designed in the week files rather than discovered by writing,
and weeks 2–4's distinct tasks are already specified. Only the risk argument
survived — the week 6 pack is the course's central artefact, the input to a 30%
assessment, and the one thing that might not be constructible.

So the order chosen is **sequential 1 → 12, with this one spike first**. A
smaller deviation than reordering the whole build, and it resolves the risk
that sequential order would otherwise expose too late.

### Decisions and reasons

- **Generate the witnesses; do not type them.** A hand-typed witness set can
  disagree with the collation table beside it, and the result is a puzzle
  nobody checked, with no build error and nothing visible on the page. The
  witnesses, collation table and reveal are all derived from one archetype and
  one variant list.
- **Publish the collation table as the primary evidence, files as secondary.**
  The accessible route cannot be an afterthought when the task is textual
  comparison. The table is the evidence; the `.txt` files are for anyone who
  wants to diff them.
- **Withhold the archetype, and mark no reading as earlier.** Establishing
  direction of error is the work. Giving students the original would reduce the
  task to spotting differences.
- **Five witnesses, not nine.** This is the practice pack; A2's is separate and
  larger. Five is the minimum that carries a nesting ladder, a refutable trap
  and an unresolved pair.
- **Commit the generated output.** It is what students download and what the
  build copies into `dist/`; CI would not otherwise have it. The contract test
  guards it against drift rather than a `.gitignore` hiding the problem.
- **Publish the reveal.** This is practice feedback and the plan permits it.
  A2's pack is a separate artefact whose key is deliberately not in this
  repository, because repository files are not secure storage for an answer key.

### Verification and limits

`pnpm check` green: 0 type errors, 40 pages, axe clean, no broken links, 29
tests in 5 files. The pack is served at `/packs/week-06/`.

The puzzle's structure was verified computationally, not just by inspection.
Of the four multi-carrier variants, exactly one (point 4) is incompatible with
the others; discarding it leaves the groups laminar, with the nesting ladder
`{B,C,D,E} > {C,D,E} > {D,E}`. That is one tree topology, plus one pair whose
order the text cannot fix.

The new contract was mutation-tested — a **deliberate exercise, not an
accidental failure**:

| Mutation | Result |
|---|---|
| Edited published witness C so it no longer matches its variants | 1 of 10 failed |
| Split the identical D/E pair, removing the unresolved answer | 2 of 10 failed |
| Made the misleading variant a genuine clade (carriers D,E) | 2 of 10 failed |
| Appended the withheld archetype to the student README | 1 of 10 failed |

All four reverted; 10 of 10 green afterwards.

**Limit on the solvability claim.** I worked the puzzle from the collation table
alone and reached the supported tree in four steps. That is an **author
consistency check, not a blind learner trial**: I wrote the variants, so I
cannot establish how long this takes someone who has not. The 40-minute
investigation budget remains an estimate. What has been established is that the
evidence is sufficient, internally consistent, and admits exactly one tree with
one deliberately unresolved edge.

Not yet done: the week 6 page, the deck, the week 5 activity that produces
these witnesses in class, and the separate A2 pack.

**Commits:** `b48f3fa` definition, `fc91e59` generator and generated pack,
`11d3555` contract.

## 2026-09-16 — Reference review

**Scope:** The Phase 0 row that was skipped. Inspected two of the brief's three
named example courses and recorded what was taken and what was refused.

**Limit on this review.** Two syllabi read through a page fetcher, on one day.
That is a look at two artefacts, not a survey of course-design literature, and
the position below is drawn from what those two pages actually do rather than
from any broader reading.

### Sources inspected

- Calling Bullshit, syllabus — <https://www.callingbullshit.org/syllabus.html>
- CS 007: Personal Finance for Engineers, course material —
  <https://cs007.blog/>

### Adopted — from Calling Bullshit

**Practice:** nearly every required reading is hyperlinked directly to a
retrievable copy (author site, university server, repository or publisher page),
so a reader reaches the text without a library lookup. Books are the stated
exception and are given chapter specifications instead of links.

**Why it was taken:** this course's own policy page already says a resolving URL
is not proof of a claim. That is a rule about *verification*, and it left the
opposite failure unaddressed — a correctly cited reading a student cannot get
to. Calling Bullshit treats reachability as a design obligation rather than a
courtesy, and does so without pretending books can be linked.

**What changed:** a harness rule now requires every reading to carry a locator
and either a direct link or, where the work is a book or paywalled, an original
teaching summary of the specific claim in use. This makes the citation policy
operational for the twelve week pages still to be written, rather than
aspirational. A contract test is deferred until week 1 has real readings, so it
can be written against a genuine case rather than an empty collection.

**Also taken:** Calling Bullshit names its case studies concretely — "Food
stamp fraud", "99% caffeine-free", "Musicians and mortality". This course's
skeletons say "a photograph" and "a short recording". A named specimen is one a
reader can picture, and a week a reader can picture is one they can tell apart
from the other eleven, which is exactly the problem a marker sampling
non-adjacent weeks creates. Added as a second harness rule and applied as each
week is written.

### Rejected — from CS 007

**Practice:** the slide deck is the only distributed artefact. Sessions are a
heading, a date and a PDF link; no readings, notes or exercises. Several
cohort years list sessions with no deck at all.

**Why it was refused:** it works for CS 007 because the deck carries the
content of a guest-speaker-driven course. Here the content of a week is the
evidence pack — the witnesses, the collation table, the worked example — and a
week reduced to a deck link would be unattemptable. The second half is a
sharper refusal: a listed session with no materials is precisely the
unimplemented promise this plan forbids, and seeing it in a well-regarded real
course is a useful reminder that it happens by accretion rather than intent.

**Not taken, but noted:** CS 007 keeps nine cohorts live on one page so a
reader can compare how a topic was framed in 2018 against 2025. For a course
about what changes between versions of a text that is an attractive idea, and
it is out of scope for a single fictional instance of a course.

### Assessment specification — a deliberate divergence

Calling Bullshit's syllabus specifies assessment thinly: credits and grading
status, one described exercise, no weighting or breakdown. That is defensible
for a public artefact, and wrong here — this deliverable is marked as a course
website against a spec line requiring assessment totalling 100%. The four
briefs stay fully specified.

**Commit:** `03f8d03`.

## 2026-09-16 — Week 1 built

**Scope:** The week 1 pack, workshop page, lecture page, print collection
records, and a fix for a deploy-only link failure found while building them.

### Decisions and reasons

- **Split the print collection into two documents.** The plan had week 5
  branching from the week 1 card and week 6 reconstructing that branch's
  archetype. Both cannot hold: a student who read the card in week 1
  reconstructs week 6 from memory rather than from evidence. The collection now
  holds a legibility test card, built from confusable glyph pairs for counting,
  and the Ordinance, which students do not see until week 6's reveal. Also the
  better split pedagogically — a test card concentrates character-level failure
  so it can be counted; prose is what scribal error happens to.
- **Supply copies as two readers' transcriptions, not as images.** The
  measurement is a comparison of texts. An image of damaged print would add an
  eyesight test the course refuses to grade, and would make the accessible
  route a lesser version of the task instead of the task itself. Every
  transcription is the card's length, so the counting rule needs no alignment
  judgement.
- **Compute the worked answer; do not type it.** A worked answer that disagrees
  with its own evidence is the worst artefact on a teaching page: confidently
  wrong, and a student who trusts it learns the measurement incorrectly.
- **Two readers, not one.** Without disagreement the week cannot teach that
  legibility is a relation between a copy and a reader. The pack is built so
  they already disagree at generation 1.

### Verification and limits

`pnpm check` green: 0 type errors, 42 pages scanned by axe with no violations,
no broken links, 39 tests in 7 files.

Counts produced by the rule, from the transcriptions:

| Copy | Generation | R1 | R2 |
|---|---:|---:|---:|
| Control | 0 | 0 | 0 |
| Photocopy | 1 | 1 | 0 |
| Photocopy | 4 | 4 | 5 |
| Photocopy | 8 | 10 | 9 |

Both readers rise with generation, the control stays clean, and the readers
disagree from generation 1. Note that R1 is below R2 at generation 4 and above
it at generation 8, so the readers cannot even be ranked consistently — a point
the page makes rather than hides.

**A deploy-only failure found by testing, not by reading.** The week 1 page
links to `/packs/week-01/`. A pack is a folder under `public/`, and a folder is
not a page: GitHub Pages serves no directory listing, so the link returned 404.
The build's own link checker passed it, because it validates links between
rendered routes and treats a static asset path as opaque. The link rendered
correctly, passed CI and would have been dead on the deployed site — the only
place this is marked. Found by curling the path.

Both packs now emit an `index.html`, and `spec/pack-links.test.ts` asserts every
`/packs/` href on every built page resolves to a file that exists in `dist`,
that a directory link has an index behind it, and that every such href carries
the repository base path.

The theme's axe pass then failed those new index pages for content outside a
landmark — a second deploy-class bug in the same change, caught by a check
already in the build. Content is now inside `<main>`.

**Limits.** The activity has not been rehearsed by anyone who did not write it,
so the 40-minute investigation budget is still an estimate. The Owen reading is
cited by chapter with its claim stated rather than quoted; the edition has not
been checked against a physical copy. The photocopy generations are an authored
scenario, labelled as such in every file, not measurements from a real machine.

**Commits:** `30c5c55` plan split, `4809b51` pack, `07710d4` pack contract,
`c7d2c5a` pack-link fix, `6e45cfe` pages and archive records.

## 2026-09-16 — Week 1 review corrections

**Scope:** Review of the week 1 build found two defects and several imprecise
claims. All fixed; pack regenerated; contract extended and mutation-tested.

### Two defects

- **The worksheet was the answer.** `worksheet.csv` shipped with every count
  filled in while the workshop page instructed students to fill it in. This is
  the same failure the week 6 contract explicitly guards against in its own
  pack, committed here in the same sitting as that guard. Fixed: answer columns
  ship empty; counts live only in `worked-answer.md`, which the page tells
  students to open last. A contract now asserts the blank columns.
- **The control was not comparable.** One copy operation against the photocopy
  chain's eight. A student could fairly object that the control was never
  tested, and the week's central claim — this process damages copies, copying
  as such does not — would not survive that objection. Fixed: eight byte-for-
  byte copies, checksummed at each step, labelled by channel and operation
  count rather than as "generation 0". A contract now requires the control's
  operation count to equal the longest photocopy chain.

The second fix forced a structural change to the contract. The control is not a
generation of the photocopy chain, it is a different process run the same number
of times, so the monotonic check now compares inside the photocopy channel and
the control is asserted separately.

### Imprecise claims corrected

- **"The rule is reproducible"** conflated three things. Now stated apart on
  both pages: the counting algorithm is deterministic; a student's own
  repeatability is what they test by counting one transcription twice; readers
  still differ because resolving a damaged mark is an interpretation. A course
  about being careful with claims cannot be loose in its own.
- **"Neither reader is wrong"** is dropped. There is a fact of the matter — the
  card says what it says — and a reader who wrote a capital O for a zero did
  misread it. What is true is that both followed the same procedure and the
  authored scenario records them resolving one ambiguous mark differently.
- The **authored-scenario labelling** now appears on the workshop page and in
  the archive record, not only inside the pack files.

### A correction to the review's own suggestion

The review proposed adding five interpretation tasks to the 40-minute
investigation. Four of them are analysis rather than evidence-gathering, and the
investigation's 10/15/15 split is already spoken for and enforced by
`teaching-schedule.test.ts`. They now sit in **Evaluate**, which has 30 minutes
and was previously underspecified: why not average the readers, what the control
supports, what the evidence cannot establish, and one improvement to the
experiment. Investigate keeps one addition that is genuinely evidence work —
recording the positions where readers disagree, not only their totals, since two
readers can reach the same total by differing in different places.

### Verification

`pnpm check` green: 0 type errors, 42 pages axe-clean, no broken links, 41 tests
in 7 files.

Manual check that no file a student opens before the worked answer carries a
count: all thirteen student-facing pack files return zero answer-shaped matches,
all eight worksheet rows have empty answer columns, and the worked answer still
carries the full table.

New contracts mutation-tested — a **deliberate exercise, not an accidental
failure**:

| Mutation | Result |
|---|---|
| Refilled the worksheet answer columns | 1 of 9 failed |
| Shortened the control to one copy operation | 2 of 9 failed |
| Gave the control one misread character | 3 of 9 failed |

All three reverted; 9 of 9 green afterwards.

**Limit worth stating.** The workshop page's "What you should find" section names
the shape of the result, including that reader R1 scores below R2 after four
operations and above after eight. That is an indicative answer, which the plan
requires on every week page, and it is a judgement call rather than a leak: the
numbers stay in the worked answer, the conclusions do not.

**Commits:** `d03a2e2` the two defects, `6355320` the sharpened pages.

## 2026-09-16 — Week 2 built

**Scope:** Audio feature pack, workshop, lecture, audio collection records and a
contract. Weeks 1 and 2 are now both real; ten skeletons remain.

### Decisions and reasons

- **Four explanations for a shared feature, not the three the plan specified.**
  The plan lists present-in-the-source, inherited-from-an-intermediate, and
  introduced-independently. Building the pack made a fourth case obvious and
  sharper than any of them: **shared equipment**. Two dubs made on the same worn
  deck share a frequency rolloff without being related, and that produces
  exactly the pattern shared ancestry produces — a feature in some copies and
  not others. It is the trap that looks most like evidence, and it gives the
  week a better answer to its own question than "independent introduction",
  which sounds like bad luck rather than a mechanism.
- **The diagnostic feature is the least dramatic thing in the table.** A 40 ms
  dropout in one channel at one timestamp, against a raised noise floor and a
  rolloff that are audible across the whole recording. The point is that
  evidential weight comes from how hard a feature is to produce twice by
  accident, not from how obvious it is.
- **No recordings are supplied.** The inference runs on the feature table, so
  clips would let hearing affect the answer and would make the non-listening
  route a lesser version of the task rather than the task itself. The plan
  already made audio an optional extension; this states why it stays optional.
- **The archive files the rolloff as an equipment note, not an edge.** X and Z
  share it, and filing that as ancestry would assert a relationship nobody has
  evidence for. Known parents (W, Z) and inferred parents (X, Y) are separate
  kinds of entry and are recorded separately.

### Differentiation from week 1

Week 1 measured one copy at a time against a source, and produced a count.
Week 2 selects which of several shared properties supports a relationship, and
produces an argument. The same reasoning with the media swapped would not
complete both: week 1's counting rule says nothing about which shared feature is
diagnostic, and week 2 never counts anything.

### Verification and limits

`pnpm check` green: 0 type errors, 43 pages axe-clean, no broken links, 50 tests
in 8 files.

The competing groupings are incompatible by construction: F2 groups {X, Y} and
F6 groups {X, Z}, which overlap without nesting, so a student cannot accept both.

Contract mutation-tested — a **deliberate exercise, not an accidental failure**:

| Mutation | Result |
|---|---|
| Removed the competing grouping, leaving one obvious shared row | 2 of 9 failed |
| Made the diagnostic feature a generic property, not a one-off event | 1 of 9 failed |
| Dropped the source-content feature, removing the first explanation | 1 of 9 failed |
| Appended a kind label to the student-facing feature table | 3 of 9 failed |

All four reverted; 9 of 9 green afterwards.

**Limits.** Not rehearsed by anyone who did not write it, so the 40-minute
investigation remains an estimate. The Manuel reading is cited by chapter with
its claim stated rather than quoted; the edition has not been checked against a
physical copy. Every feature is authored, labelled as such in the pack and now
on the page and in the archive record, and none of it was measured.

**Commits:** `1e176ce` pack, `904e543` contract, `8259fa3` pages and archive.

## 2026-09-16 — Week 3 built

**Scope:** Re-encoding experiment pack, workshop, lecture, contract. Weeks 1–3
are real; nine skeletons remain.

### Decisions and reasons

- **The pack contains a null, and the contract requires one.** The plan says a
  null is acceptable. Building it made clear that a null is *necessary*: without
  one, every sound comparison in the pack finds the effect the student expected,
  and the week teaches that good experimental design confirms your hypothesis.
  At 320 kbps, ten cycles give 0.4 dB against a 0.5 dB repeatability — not a
  small effect but no effect this measure can see. A contract now asserts that
  at least one sound comparison lands inside repeatability and at least one
  lands above it, so the null is informative rather than a flat result.
- **The confounded comparison had to overstate the effect by a wide margin.**
  If the confounded difference matched the corrected one, spotting the confound
  would be an academic exercise with no consequence. 9.5 dB against 3.2 dB makes
  the repair change the answer, and a contract requires a factor of more than
  two.
- **Repeatability is stated as a number in the pack, not as a caveat.** 0.5 dB.
  It is the value that converts 0.4 dB from a finding into measurement noise,
  and it is the only way a student can tell the difference. A measure published
  without its repeatability cannot support a null.
- **Totals are withheld.** Computing them is the measurement — eight additions
  per condition. A table that arrives totalled answers the arithmetic half of
  the task, which is the same defect found in week 1's worksheet.

### Differentiation from week 2

Week 2 chose between explanations for an observed feature. Week 3 judges whether
a comparison can support a claim at all, and designs one that can. Week 2 never
holds a variable fixed; week 3 never asks which copy is related to which.

### Verification and limits

`pnpm check` green: 0 type errors, 44 pages axe-clean, no broken links, 61 tests
in 9 files.

Contract mutation-tested — a **deliberate exercise, not an accidental failure**:

| Mutation | Result |
|---|---|
| Removed the null comparison | 1 of 11 failed |
| Made the published comparison sound | 2 of 11 failed |
| Gave the control an encoder pass | 1 of 11 failed |
| Added a total column to the student CSV | 1 of 11 failed |

All four reverted; 11 of 11 green afterwards.

**Limits.** The values are hypothetical, labelled as such in every pack file and
on the page. They are arithmetically consistent and demonstrate experimental
reasoning; they are not measurements of a real encoder, and no claim about codec
behaviour should be drawn from them. Not rehearsed by anyone who did not write
it, so the 40-minute investigation remains an estimate. The Sterne reading is
cited by chapter with its claim stated; the edition has not been checked against
a physical copy.

**Commits:** `db908c9` pack, `d5835ad` contract, `3937bf3` pages.

## 2026-09-16 — Week 3 review corrections

**Scope:** Review accepted the learning design and the data, and rejected the
presentation of the metric. All six corrections applied; pack regenerated;
contract corrected; 61 tests green.

### The defect

The metric was published as "total band deviation" in dB. It is a sum of eight
per-band decibel differences, and adding decibel differences does not produce a
decibel quantity — it produces an arbitrary composite. Publishing it with a dB
label gave every downstream claim an authority it had not earned, in a week
whose subject is whether a comparison can support a claim.

### Corrections

- Renamed to **simplified deviation score**, in score points, with an explicit
  note in the pack and on both pages that it is an invented composite on its own
  scale and useful only for comparisons inside this scenario.
- **0.5 is now the repeatability of a pairwise difference**, not of a single
  score. The student reports a difference between two conditions, so the figure
  that governs them is how much that difference moves on repetition. The earlier
  framing described the repeatability of the wrong quantity.
- "Real effect" replaced by **"detectable in this scenario"** throughout.
- 0.4 is a **non-detection**, not "not a result". The earlier wording
  contradicted the lecture's own argument that a result below resolution is a
  finding. Both pages now state that "we did not detect a difference" and "there
  is no difference" are different claims, and only the first belongs to the
  student.
- **Control claim softened.** A clean control rules out one specific failure —
  that the procedure manufactures differences regardless of treatment. It does
  not establish that the procedure is sound, and plenty of faults would leave it
  clean.
- **Bitrate conclusion scoped**, with an explicit statement that it is not a
  claim about MP3 and that a real investigation would need real measurements and
  a physically defensible score.
- **Threshold boundary made consistent**: "0.5 or less is a non-detection"
  everywhere, matching the contract's inclusive comparison.

### A contract correction that fell out of it

Adding "non-detection" to the leakage regex failed `measure.txt` — correctly.
The measure definition must state the threshold rule or a student cannot apply
it, so the term is a definition rather than an answer. The regex now guards
which comparison is confounded, and the reasoning is recorded at the assertion
rather than left implicit.

This is worth noting as a general point: a leakage check calibrated on the
answer will also flag the vocabulary needed to reach it, and the fix is to
narrow the check rather than to remove the vocabulary.

### Verification

`pnpm check` green: 0 type errors, 44 pages axe-clean, no broken links, 61 tests
in 9 files. Terminology swept across both pages and the pack: no occurrence of
"real effect" or "not a result" remains; the four surviving mentions of dB are
the per-band differences the score is built from, which are genuinely in dB and
labelled as its inputs.

**Commit:** `4b4ca30`.

## 2026-09-16 — Week 4 built

**Scope:** Two-routes pack, workshop, lecture, image collection records,
contract. Weeks 1–4 are real; eight skeletons remain. The weeks 2–4 progression
the plan requires is now complete and reviewable.

### Decisions and reasons

- **Compatibility is computed, not claimed.** The week rests on both routes
  fitting the observations. A pack that asserts an ambiguity it does not have
  teaches students to accept an assertion, which is the opposite of the point,
  so a contract computes each route's prediction against the observation at the
  declared tolerance and fails if any route does not fit. Route A is 6 KB and 0
  quality points off; route B is 7 KB and 2 points off; the bounds are 15 KB and
  4 points.
- **The evidence menu mixes three outcomes on purpose.** One obtainable item
  separates the routes; two obtainable items do not; two items do not exist at
  all. If every obtainable item resolved the question, asking for evidence would
  be risk-free and the honest outcome — a reasonable request that turns out
  silent — would be unreachable. Contracts now require at least one of each.
- **Absent evidence is recorded with a reason.** The EXIF is gone and the upload
  log was never kept. Stating that is more useful than omitting the rows, and it
  is the first thing most people would ask for.
- **The non-discriminating items had to be reasonable, not silly.** The retained
  log excerpt is genuine and relevant and silent on exactly the operation the
  two routes disagree about. That is the ordinary condition of a provenance
  record, and it sets up week 11 rather than wasting a student's time.
- **Route predictions are withheld.** Deriving them and checking them is the
  task — the same reasoning that blanked week 1's worksheet and withheld week
  3's totals.
- **"Ruling out is not establishing" is stated as the week's closing claim.**
  The reveal names route B and then immediately limits it: two routes were
  proposed, others fit the same observations, and the defensible claim is "not
  route A, and consistent with route B". The archive record says the same, so
  the site does not quietly upgrade an inference into a fact.

### The weeks 2–4 progression

The plan's acceptance gate is that the same reasoning with the media swapped
must not complete all three. It does not:

- **Week 2** selects which of several shared features supports a relationship.
  It never holds a variable fixed and never asks what evidence is missing.
- **Week 3** judges whether a comparison can support a claim and designs one
  that can. It never asks which copy is related to which.
- **Week 4** shows that the available evidence underdetermines the history and
  asks what further observation would discriminate. It never controls a process
  and never proposes a relationship.

Products differ too: an evidence table, a protocol with a results table, an
ambiguity report.

### Verification and limits

`pnpm check` green: 0 type errors, 45 pages axe-clean, no broken links, 75 tests
in 10 files.

Contract mutation-tested — a **deliberate exercise, not an accidental failure**:

| Mutation | Result |
|---|---|
| Pushed route B's prediction outside tolerance | 1 of 14 failed |
| Made every available item discriminate | 1 of 14 failed |
| Removed the only discriminating item | 1 of 14 failed |
| Leaked a predicted size into the student route cards | 1 of 14 failed |

All four reverted; 14 of 14 green afterwards.

**Limits.** The observations and predictions are authored and internally
consistent; they were not produced by running real image software, and no claim
about how any real tool behaves follows from them. The double-quantisation
reasoning behind the discriminating item reflects a real forensic technique, but
the numbers here do not demonstrate it. Not rehearsed by anyone who did not
write it, so the 40-minute investigation remains an estimate. The Steyerl
reading is freely available online and is the first reading in the course a
student can reach without a library.

**Commits:** `02347bc` pack, `007a08e` contract, `a234bac` pages and archive.

### Template for subsequent observed results

- What was tested and with which materials/version:
- What confused or failed (or what passed):
- Actual elapsed time, where measured:
- What changed and why it is more defensible:
- Verification after the change:
- Remaining uncertainty and reviewer limitations:
- Commit hash once it exists:
