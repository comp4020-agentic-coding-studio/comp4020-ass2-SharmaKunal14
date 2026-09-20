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

## 2026-09-16 — Week 4 review corrections

**Scope:** Review rejected week 4. Three defects made the activity impossible or
scientifically misleading, and 75 green tests had not caught any of them. All
seven corrections applied; 80 tests green.

### The general lesson, before the specifics

The tests verified that the authored data was internally consistent with the
authored answer. They never asked whether a student could act on the data. Every
one of the three critical defects sits in that gap:

- predictions were consistent and unobtainable;
- the evidence menu was well-formed and pointed at nothing;
- the discriminating item was correctly labelled discriminating in the JSON and
  rested on a technique that may not apply.

A mutation table is evidence of data integrity. It is not evidence that the
activity works, and the contracts now include the "can a student do this"
questions that were missing.

### Defect 1 — the predictions could not be derived

The pack withheld each route's predicted file size, and a contract asserted the
withholding, on the reasoning that deriving them was the task. Nothing in the
pack — no formula, no encoder, no lookup table — would let anyone compute a file
size from a list of steps.

The precedent I reasoned from was wrong. Week 1 withholds counts a student
computes from a stated rule and supplied transcriptions; week 3 withholds totals
a student computes by adding eight supplied numbers. Both supply a method and
inputs. Week 4 supplied neither, so withholding was not demanding, it was
impossible.

Predictions are now published beside the observations. This gives nothing away:
both routes fit, which is the week's finding. The assertion is inverted, and the
reasoning is recorded at the assertion so it is not re-broken later.

### Defect 2 — none of the evidence existed

The menu offered three obtainable items and the pack contained none of them.
Their outcomes appeared only inside the complete reveal, so the four-step
investigation could not be performed: a student could only open the answer.

Each obtainable item now ships as `evidence/e1.txt`, `e2.txt`, `e3.txt`,
carrying its result and nothing else. Four contracts: every available item has a
file with its result, the menu points at that file, no file contains another
item's result or its own verdict, and an unavailable item has no file.

### Defect 3 — the double-JPEG claim did not fit the route

The reveal asserted that a coefficient histogram would carry periodicity route A
could not produce. Route B is save, **resize**, save. Resizing between the two
compressions disrupts the block structure that standard double-quantisation
detection relies on, and resized double-compressed images are treated in the
literature as a separate forensic problem rather than a case the simple
histogram test settles. The quality ordering used, 90 then 78, is also among
those reported as difficult to separate from single compression.

So this was a real technique asserted in conditions where it may not apply, with
no actual histogram behind it — in a course about whether evidence supports a
claim.

Replaced with a **retained working-directory listing** showing a full-size JPEG
that existed before the smaller output. It excludes any route that resizes
before its only save; it is representable honestly as a text record; it is
suppliable directly; and it remains only consistent with route B, since every
history that saved at full size before resizing leaves the same listing. The
discriminating evidence is now mundane, which is arguably a better lesson than a
clever detector.

### Four further corrections

- **Quality estimate removed rather than defined.** The course never stated
  which estimator produced it, its uncertainty, or whether values compare across
  encoders, so a two-point difference was uninterpretable. Defining a fictional
  estimator with a fictional uncertainty would have added a second unfalsifiable
  number; removing the field leaves an observation set that is fully checkable.
- **The 15 KB tolerance is labelled a scenario rule** on the page, in the pack
  and in a contract — set so a threshold can be applied consistently, not
  measured from anything, and not to be carried elsewhere.
- **The visual-inspection item no longer asserts the routes look alike.** It
  supplies an authored inspection report recording no distinguishable
  difference, and states on its face that no images were produced to generate it.
- **Steyerl is no longer generalised.** The lecture claimed a circulated image
  "has lost most of the record of where it came from". It now says such an image
  *may* arrive without the metadata, logs or intermediate files needed to
  reconstruct its history, and notes explicitly that she is not claiming
  provenance is always destroyed.

### Verification

`pnpm check` green: 0 type errors, 45 pages axe-clean, no broken links, 80 tests
in 10 files. Residue swept: no mention of DCT, coefficient histograms, quality
estimate or the universal provenance claim survives in either page or the pack.

Mutations — a **deliberate exercise, not an accidental failure**:

| Mutation | Result |
|---|---|
| Stripped the predictions back out of the student CSV | 2 of 19 failed |
| Declared an available item with no result | 2 of 19 failed |
| Leaked one evidence file's result into another | 1 of 19 failed |
| Dropped the scenario-rule labelling | 1 of 19 failed |

All four reverted; 19 of 19 green afterwards.

**Still not established.** Nobody who did not write the activity has attempted
it, so the 40-minute investigation remains an estimate and the claim that the
task is now performable is a reasoned claim rather than an observed one.

**Commit:** `d7863b6`.

## 2026-09-16 — Week 4, second round of corrections

**Scope:** Review found four reasoning errors surviving the first round. All
confirmed against the files and fixed. 85 tests green.

### The gap, named precisely

The previous entry recorded that a mutation table shows data integrity rather
than a working activity, and then shipped contracts that still did not close
the gap. The reviewer's finding proves it: **E2 was labelled
`discriminates: false` while its content read `quality=78`.** Route A saved at
72; route B's final save was 78. The excerpt matched one route and contradicted
the other, so it was decisive — and every test passed, because the tests read
the label and never the content.

The lesson is narrower than "tests can be wrong". It is that a contract
asserting a property of a *declaration* proves nothing about the *artefact the
declaration describes*, and the two have to be checked against each other.

### The four errors

- **E2 separated the routes.** Fixed structurally rather than by editing the
  text: both routes now end with the same save at quality 78, so the final
  encode settings cannot distinguish them under any record. The routes now
  disagree about exactly one thing — whether a full-size JPEG was written before
  the resize.
- **E1 did not establish descent.** A directory listing shows that three files
  existed; it does not show that the output was made from the interim JPEG,
  which could be an unrelated export. The evidence file said so in its own last
  line, contradicting the reveal's conclusion.

  E1 and E2 have **swapped roles**, because the objection identifies the right
  reason for an item to be insufficient. E1 is now a transformation record
  naming the interim file as the resize input with a matching hash, which does
  exclude any route that resizes the source directly. E2 is the listing, and is
  non-discriminating precisely because co-existence is not descent. E3 reaches
  the same gap from the human direction.

  That distinction — a record that **lists what existed** versus one that
  **names what read what** — is now the week's central point, and it is a better
  lesson than the version it replaced.
- **The tolerance note described a different rule from the implementation.** It
  said two predictions within 15 KB of each other; the check compares each
  prediction against the observation. They agreed on these numbers by
  coincidence. The note now states the rule as applied, and a contract asserts
  the wording.
- **E3 was a fabricated examination.** It reported an examination and then
  disclosed that none occurred. Disclosure made it honest and left it
  incoherent. Replaced with a handover note retained alongside the output: a
  human record, genuinely textual, genuinely incomplete, silent on whether the
  big version was read or merely sat nearby. No file in the pack now reports an
  examination that did not happen.

### The contracts that close the gap

Three additions, checking labels against content:

- both routes must end with the declared shared final step;
- every setting declared as appearing in one route and not the other is barred
  from any item labelled non-discriminating — checked in the declaration **and**
  in the file a student opens;
- the decisive record must name an input and an output rather than list files.

The declared distinguishing values are `quality 90`, `quality=90`, `q90`. An
earlier attempt used naive tokenisation and flagged "903 KB" as containing
"90", so the values are declared explicitly rather than inferred — a design
statement rather than a heuristic.

### Verification

`pnpm check` green: 0 type errors, 45 pages axe-clean, no broken links, 85 tests
in 10 files.

Typecheck caught two fields added to the JSON without being declared on the
`Pack` interface, which vitest had run straight past. Worth noting that the two
checks fail on different things and both are needed.

Mutations — a **deliberate exercise, not an accidental failure** — including a
reconstruction of the original bug:

| Mutation | Result |
|---|---|
| Put `quality=90` back into a non-discriminating item | 1 of 24 failed |
| Gave the routes different final saves | 1 of 24 failed |
| Reduced the discriminator to a bare listing | 1 of 24 failed |
| Restored the prediction-to-prediction tolerance wording | 1 of 24 failed |

All four reverted; 24 of 24 green afterwards.

**Still not established.** No fresh reader has attempted the activity. The
reviewer's recommendation is that week 4 is now ready for a timed
fresh-reader trial, and that trial has not been run.

**Commit:** `11fa9c5`.

## 2026-09-17 — Week 5 built

**Scope:** The week 5 workshop page and lecture page. No new pack, since the
plan already called for reusing one controlled dataset across weeks 5 and 6.

### Decisions and reasons

- **Reuse the week-06 pack as week 5's own deliverable, rather than building a
  second dataset.** The 2026-09-16 entry already split the print collection so
  the Ordinance stays withheld until week 6, and the week-06 practice pack
  (`packs/week-06`) is that withheld text branched into five anonymised
  witnesses with a collation table — exactly what week 5's plan asks the
  workshop to produce and deposit. Building a second, unrelated branching pack
  would either duplicate this one or give week 6 two candidate texts to
  reconstruct, which the plan does not ask for. Week 5's page now treats the
  published witness files and `collation.csv` as its own output, and points at
  `reveal/` as what stays closed until next week.
- **Correct the witness count from the plan's "six" to the pack's five.** The
  original week-5 plan section 4 says "six editable witnesses"; the built pack
  (decided and mutation-tested on 2026-09-16) has five, `A`–`E`, with one
  deliberately unresolved pair. Five witnesses already support one shared
  omission, one shared homoeoteleuton, one polygenetic normalisation and two
  singleton errors — enough to teach every error class the week names. Adding
  a sixth witness for its own sake was not worth re-opening a dataset that was
  already mutation-tested against ten deliberate breakages. `docs/weeks/week-05.md`
  is not updated to match, to avoid rewriting planning prose after the fact;
  this entry is the record of the actual count.
- **Use the normalisation variant (point 4: "at the least" → "at least",
  entered independently in witnesses A and C) as the week's worked answer to
  its own check question** — "why might a shared spelling correction be weak
  evidence for ancestry?" It is the one variant in the pack already marked
  `polygenetic: true`, so the lecture's worked example and the pack's own
  reveal cannot disagree with each other.

### Verification

Ran `pnpm check` after writing both pages: typecheck clean, 45 pages built (40
regenerated, 5 reused from cache), axe-clean, no broken links, course API
32 nodes / 48 edges, 85 of 85 existing tests still green. No new contract test
was added for week 5 specifically — `weekly-contract.test.ts` already asserts
an accessible route, a named deposit, a declared collection and a learning
target on every published workshop, and `pack-links.test.ts` already checks
every `/packs/` link on the built site resolves to a real file, so both already
cover week 5 once `draft: true` was removed.

**Still not established.** No one has actually run the branching-copy
instructions by hand — the page describes an exercise for a real workshop room,
and only the fallback pack's data has been checked for consistency. This is an
author consistency check on the *pack*, not a trial of the *hand-copying
activity itself*.

**Commits:** `4066bbe` lecture and workshop pages.

## 2026-09-17 — Week 6 built, and the week 1 deck link gap fixed

**Scope:** The week 6 workshop and lecture pages, the required `week-06.deck.mdx`,
and a fix to a real gap found while wiring the new deck's link: week 1's
lecture never linked its deck.

### Decisions and reasons

- **Found and fixed: week 1's deck was never linked from its lecture page.**
  The brief's spec requires "at least one lecture carries a real deck, linked
  from its page" (`docs/assignment-brief.md`). `src/decks/week-01.deck.mdx`
  exists and compiles, but `src/content/lectures/week-01.md` never set the
  `slides` frontmatter field the lecture schema and page template already
  support (`src/content.config.ts`, `src/pages/lectures/[slug].astro`), and
  nothing else in the site linked to `/decks/week-01/`. The build's link
  checker did not catch this because an unlinked page is not a broken link.
  Added `slides: /decks/week-01/` to close the gap, and set the same field on
  week 6's lecture from the start so this does not recur there.
- **Build one worked example in the deck, and keep the graded A2 pack
  separate.** The deck walks the week-06 practice pack (the same pack week 5
  produces witnesses into) end to end — evidence table, candidate tree,
  competing tree, the deliberately unresolved D/E edge, the normalisation
  trap, then the reveal. It does not touch The Stemma's own 5–9 witness pack,
  which `packs/week-06/build.ts` already notes is a separate artefact not
  stored in this repository. That pack, with its own ambiguity notes, is
  still outstanding.
- **Escaped MDX's curly-brace set notation.** A first draft wrote witness
  groups as `{B, C, D, E}` in the deck's prose; MDX parses `{...}` as a JS
  expression, so the build failed at prerender with `ReferenceError: B is not
  defined`. Rewrote every instance as plain prose ("the group B, C, D, E")
  rather than escaping the braces, since the escaped form reads worse and the
  set notation was not carrying any meaning prose could not.

### Verification

`pnpm check`: typecheck clean, 46 pages built, axe-clean, no broken links,
course API 32 nodes / 48 edges, both decks (week 1 and week 6) pass
astromotion's structural check, 85 of 85 existing tests still green. Inspected
`/decks/week-06/` and `/decks/week-01/` after the build to confirm both render
and that the new `slides` link on each lecture page resolves.

**Still not established.** No fresh reader has worked the week 6 tree from the
table alone — only an author consistency check that the table's evidence
matches `reveal/production-log.md`, already recorded in the 2026-09-16 entry.
Neither deck has been inspected on an actual phone-width viewport in a
browser, only built; that check is still owed before submission, for every
deck and every page. The Stemma's own curated pack — a separate, larger
witness set — has not been built.

**Commits:** `31bb137` week 1 deck link fix, `8843b94` week 6 pages and deck.

## 2026-09-17 — Week 7 built: a new synthetic replication pack

**Scope:** A new `packs/week-07` pack (no prior artefact to reuse, unlike
weeks 5/6), the workshop and lecture pages, and the Sequence model archive
section.

### Decisions and reasons

- **Built a real, reproducible simulation rather than pre-baked numbers.**
  `packs/week-07/build.ts` implements a seeded PRNG (mulberry32) and copies a
  fixed 24-symbol, four-letter-alphabet ancestor forward 40 generations under
  an independent per-position substitution rate, at three fixed rates (0.02,
  0.08, 0.2) and three fixed seeds (11, 23, 47) each. `settings.json` publishes
  the ancestor, alphabet, rates, seeds and the exact method in prose, so the
  human acceptance gate ("reproduce prepared results using recorded settings
  and seeds") can actually be met — a spec test (`week-07-pack.test.ts`)
  asserts the same seed always reproduces the same run and different seeds
  diverge.
- **Chose an abstract four-symbol alphabet (P, Q, R, S), not nucleotide
  letters.** The plan and `CLAUDE.md` require labelling this a simplified
  model with no biological claim; using letters that read as DNA would invite
  exactly the conflation the workshop's "unjustifiable conclusion" task asks
  students to reject.
- **Measured agreement against the generation-0 ancestor, not the immediate
  parent.** This is what "ancestor agreement...over generations" in the plan
  means, and it is the quantity that actually degrades — parent-to-child
  agreement would stay roughly constant by construction and would not show
  the effect the week is about.
- **Published all nine runs, not a mean-only summary.** One of the plan's
  human acceptance gates is "show variation across repeated runs rather than
  selecting a single dramatic run." `plot.svg` draws all three seeds per rate
  as separate lines with markers at the reported generations, and `trend.txt`
  reports the seed-to-seed spread at each generation alongside the mean, so
  the accessible route carries the same variation the image does.
- **Corrected an overclaim caught before publishing, not after.** A first
  draft of `trend.txt` asserted all nine runs "decline monotonically." Checking
  the actual `results.csv` output found two runs (medium/seed 11 and
  high/seed 47) tick upward between generation 20 and 40, because a
  substitution can by chance restore a match as easily as break one at this
  sequence length. Rewrote the claim to describe the true shape: the *mean*
  falls at every rate, no individual run is smooth, and every mean settles
  toward roughly 0.25 (the chance-agreement floor for a four-symbol alphabet),
  not toward zero. This chance floor is stated in the lecture and workshop
  pages as a real, checkable property of this model, not asserted loosely.
  This is the kind of self-caught error the log is meant to record honestly
  rather than silently patch.
- **Kept the unjustifiable-conclusion answer in `reveal/`, not in the public
  pack files.** `README.txt` describes the folder without naming what the
  check is testing for; `reveal/analysis.md` states the omitted selection and
  population structure, and names the specific overclaim (a universal
  biological error threshold) the check asks students to reject themselves
  first.

### Verification

`pnpm check`: typecheck clean, 47 pages built, axe-clean, no broken links,
course API 32 nodes / 48 edges, both existing decks still pass astromotion's
structural check, 94 of 94 tests green (9 new in `week-07-pack.test.ts`,
covering determinism, seed divergence, the rate-ordering of mean agreement at
generation 40, and that the public files do not leak the reveal's named
conclusion). Ran `packs/week-07/build.ts` directly and read `results.csv` and
`trend.txt` by eye before writing the workshop and lecture text, so every
number quoted on those pages (the three rates, the chance floor, the
direction of the trend) matches the pack's actual output.

**Still not established.** No fresh reader has worked the check or the
Investigate stage from the pack alone — only an author consistency check that
the published files and page text match the simulation's real output. Neither
new page nor the pack's plot has been inspected on an actual phone-width
viewport in a browser. The candidate reading on replication/error models
(§2 of `docs/weeks/week-07.md`) has not been selected or verified, so no
reading is cited on the lecture page — a real gap, left open rather than
filled with an unverified citation.

**Commits:** `7d9a1be` sequence-replication pack, `e2666d8` workshop, lecture
and archive pages.

## 2026-09-17 — Week 8 built, on-page only (no pack)

**Scope:** The week 8 workshop and lecture pages, and the Bits archive
section. No `packs/week-08` was created.

### Decisions and reasons

- **No pack this week, by design, not by omission.** The plan's required
  deliverable is explicitly "on-page bitstrings, worked decoding...", and the
  accessible route is "labelled text blocks worked by hand; no implementation
  required." Every other week so far has shipped a generated pack because the
  plan called for downloadable evidence; week 8's own spec calls for the
  opposite — arithmetic small enough to sit directly on the page. Building a
  pack anyway would have added a download step the plan does not ask for and
  the human acceptance gate ("no programming or specialist mathematics")
  argues against.
- **Hand-checked every number before publishing it.** The worked message
  (payload `1011`, codeword `111 000 111 111`), the check's received block
  (`101 000 111 111`, one flip, decodes correctly to `1011`), the Investigate
  "protected example" (`111 001 111 110`, two triplets carrying one flip
  each, the other two carrying none, all four still decoding to `1011`), and
  the three-case comparison table (unprotected / correctable / failure) were
  each decoded by hand before being written into the page, per the human
  acceptance gate "hand-check the example decoding and overhead calculations,
  including one failure outside the promised error bound."
- **Built the failure case from the same fault, not a separate scary one.**
  The three-row comparison applies one flipped bit to the same payload bit
  three ways (unprotected; one flip in a triplet; two flips in a triplet),
  so the failure row is a direct escalation of the correctable row rather
  than an unrelated worst case — the point being that the *number* of
  simultaneous faults is what crosses the guarantee's stated boundary, not a
  different kind of fault.
- **Labelled the sample costing explicitly fictional.** The deposit task
  prices a fictional 100 GB collection at a stated fictional rate
  ($0.02/GB/month), matching `CLAUDE.md`'s instruction to label hypothetical
  data. This feeds The Lossless Argument's costing criterion without
  implying any real vendor's pricing.
- **Left the A3 rubric (`the-lossless-argument.md`) unedited.** Its
  20/25/25/20/10 weighted criteria already exist from an earlier phase and
  already match the plan's stated weights, satisfying the gate "confirm the
  A3 rubric is weighted and matches the master plan" without needing a
  change.

### Verification

`pnpm check`: typecheck clean, 47 pages built, axe-clean, no broken links,
course API 32 nodes / 48 edges, both decks still pass astromotion's
structural check, 94 of 94 existing tests green (`weekly-contract.test.ts`
already covers the new session once `draft: true` is removed; no new spec
file was needed since there is no pack to test against).

**Still not established.** No fresh reader has decoded these blocks from the
page alone — only an author hand-check that majority vote on each stated
triplet returns the value claimed. The candidate Shannon/Hamming readings
(§2 of `docs/weeks/week-08.md`) have not been selected or verified, so no
reading is cited on the lecture page. Neither page has been checked on an
actual phone-width viewport in a browser.

**Commits:** `7b05f6d` error-correction lecture and workshop.

## 2026-09-17 — Week 9 built: a categorical resampling pack

**Scope:** `packs/week-09` (generator, model, spec test), the week 9 workshop
and lecture pages, and the Distribution model archive section.

### Decisions and reasons

- **Modelled the mechanism, not a language model.** Six labelled categories
  (A–F), true probabilities 0.40/0.25/0.15/0.10/0.07/0.03, no architecture,
  optimisation or token vocabulary — per the plan's explicit instruction not
  to equate a categorical toy model with language-model training. The rare
  category (F, 3%) is what the whole pack is built to track.
- **Three conditions chosen to isolate the retention mechanism.** `baseline`
  never re-estimates from a sample (control); `full-recursive` estimates
  every later round purely from the previous round's own sample (the failure
  mode); `retain-original` mixes in a fresh true-distribution sample each
  round (the paper's stated mitigation). All three share round 0 and the same
  seeds, so any difference in outcome is attributable to the re-estimation
  rule alone.
- **Checked the reveal against the pack's own real output, not against
  intuition.** The `full-recursive` condition reached a genuine absorbing
  zero state for category F under seed 47 (from round 3 onward, verified by
  inspecting `counts.csv` directly); seeds 11 and 23 under the same condition
  did not lose it by round 5; neither `baseline` nor `retain-original` lost
  it in any of the three seeds in this run. `reveal.summary` was written to
  match this — not the other way around.
- **Caught and fixed a floating-point display bug before publishing.** The
  first build computed a rounded retention *fraction* and multiplied it back
  up for display, producing artifacts like `2.0010000000000003/3 seeds` in
  `trend.txt`. Replaced with a helper that counts, as an integer, how many of
  the three seeds have a nonzero rare-category count that round, and updated
  the trend text to use that integer directly. This is the kind of self-caught
  error the log is meant to record honestly rather than silently patch.
- **Cited the Shumailov et al. (2024) reading as a locator plus an original
  teaching summary, not a link.** A `WebFetch` to the article's Nature URL
  returned a 303 redirect to Nature's IDP login page, indicating the article
  is paywalled. Per `CLAUDE.md`'s reading rule, the workshop and lecture pages
  give the full locator (*Nature* 631, 755–759, 2024) and state the specific
  claim being used (early vs. late collapse; tail-event loss; fresh-data
  injection as mitigation) as an original summary, rather than linking a copy
  a student cannot reach.
- **Left `docs/weeks/week-09.md` unedited.** As with every prior week, the
  plan document stays as the authoring target; real outcomes (including the
  absorbing-state result and the reading's access status) are recorded here
  instead.

### Verification

`mise exec -- pnpm check`: typecheck clean, 48 pages built, axe-clean, no
broken links, course API 32 nodes / 48 edges, both decks still pass
astromotion's structural check, 103 of 103 tests green (94 existing + 9 new
in `spec/week-09-pack.test.ts`, including a determinism check, a cross-seed
divergence check, a baseline-stays-near-expectation check, and a check that
the fully recursive condition can reach and stay at an absorbing zero state).

**Still not established.** No fresh reader has worked through the pack or the
workshop page — only an author check that the pack's own reveal text matches
its own generated output. The Shumailov et al. reading's specific claim has
been verified against real search results describing the paper's actual
findings, but the paper's full text has not been read end-to-end by this
process (only its abstract-level claims, which the summary above is scoped
to). Neither page has been checked on an actual phone-width viewport in a
browser.

**Commits:** `4a6d9fa` categorical resampling pack, `d166b25` workshop,
lecture and archive pages.

## 2026-09-17 — Week 10 built: a restoration feature-table pack

**Scope:** `packs/week-10` (generator, model, spec test), the week 10
workshop and lecture pages, and the Image archive section.

### Decisions and reasons

- **Built a new small specimen instead of assuming pixel data that never
  existed.** The plan says to "compare week 4's degraded image, its retained
  source and one prepared restoration output," but week 4's own pack
  (confirmed by rereading it) is entirely metadata — dimensions, file size,
  chroma subsampling, EXIF absence — with no actual pixel data ever
  generated for `image/source` or `image/output-7`. Rather than fabricate a
  photographic image or silently drop the comparison, this pack builds an
  8x8 synthetic tone chart, explicit about not being a photograph, and the
  archive's Image section now says so directly.
- **Chose a real, named restoration algorithm (bilinear interpolation) over
  a hand-tuned one.** Using a standard, describable upsampling method means
  the "restoration output" is not secretly rigged to prove a point — its
  behaviour at each of the six checked features was computed, not chosen.
- **Reported the real result even though it complicated the story.** The
  original model.json draft assumed every feature inside a non-uniform block
  would come back unsupported. Running the actual code showed one of the
  four (f4) matched the retained source exactly. Rather than drop or replace
  that feature, `reveal.summary` was rewritten to explain why a correct
  match there still isn't evidence of real recovery (the interpolation
  produces one smooth value regardless of which true sub-cell is asked
  about) — a more honest and more useful lesson than a clean 4-for-4 failure
  would have been.
- **Defined supported/unsupported/uncertain by what the evidence can show,
  not by a preferred conclusion.** "Uncertain" applies only to features
  inside already-uniform source blocks, where a match is guaranteed and
  proves nothing about restoration — not used as a hedge for unclear cases.
  This satisfies the gate "make the non-visual table expose the same
  observations without telling students which conclusion to choose."
- **Verified both readings' accessibility before citing them.** PULSE
  (Menon et al., CVPR 2020) is open on arXiv (2003.03808) — read directly. The
  Obama depixelation case study is Quach, K. (2020, June 24), *The Register*,
  freely readable (confirmed via direct fetch, not just a search snippet),
  and its own caveat — PULSE was never designed to recover a specific
  person's true appearance — is exactly the distinction this week's lecture
  needed, so it is quoted rather than paraphrased away.
- **Avoided the numerical-ceiling claim the gate warns against.** No page
  states or implies a bigger image "contains less information" in any
  general sense; the lecture's only quantitative claim ("one of four") is
  scoped explicitly to this one specimen and this one algorithm.

### Verification

`mise exec -- pnpm check`: typecheck clean, 49 pages built, axe-clean, no
broken links, course API 32 nodes / 49 edges, both decks still pass
astromotion's structural check, 112 of 112 tests green (103 existing + 9 new
in `spec/week-10-pack.test.ts`, including a real many-to-one block-averaging
check, a determinism check, a check that at least one non-uniform-block
feature is unsupported, and a check that both uniform-block features match).

**Still not established.** No fresh reader has worked the feature table from
the pack alone — only an author check that the generated data matches the
reveal text written about it. The PULSE/Obama case study's further
secondary coverage (Vice, The Verge, thegradient.pub) was found but not read
in full; only the Register article actually cited was read end-to-end.
Neither page has been checked on an actual phone-width viewport in a
browser.

**Commits:** `281fcd2` restoration feature-table pack, `2de66a8` workshop,
lecture and archive pages.

## 2026-09-17 — Week 11 built: a chain-of-custody manifest audit

### Decisions and reasons

- **Reused image/output-7 rather than inventing a new specimen.** The plan
  calls for "week 4's image copies with supplied metadata manifests before
  and after a documented stripping operation." Output 7 already has an
  established, deposited identity in the archive (week 4) with a known gap
  in its record (no EXIF, no upload log). Building the provenance-audit
  scenario on top of that object, rather than a fresh one, lets the week
  reuse rather than re-explain the specimen, and lets the "never captured"
  category in the audit connect directly to a fact week 4 already
  established instead of asserting a new one.
- **Computed the "after" manifest from the "before" manifest by code, not by
  hand-typing both.** The exercise only has a point if the stripping log is
  genuinely incomplete relative to the *real* diff between the two
  manifests. Hand-authoring both manifests to *look* inconsistent with the
  log risks an accidental or unfalsifiable inconsistency. Instead,
  `computeAfter()` in `packs/week-11/build.ts` derives the after-manifest
  from the before-manifest by applying exactly the operations in
  `strippedFields` and `renamedFields`, then recomputes a real SHA-256
  metadata checksum over the resulting field set. The log
  (`loggedOperations`) mentions only the two removals, so the rename and the
  checksum change are undocumented as a structural consequence of running
  the code, not because the reveal text says so.
- **Used a plain metadata checksum, and said explicitly that it is not a
  signature.** A checksum that changes when the field set changes is a real,
  small, honest way to make "the log doesn't cover everything that changed"
  concrete without needing real image bytes. The reveal and the lecture both
  state plainly that this is an unsigned SHA-256 digest, not a C2PA
  credential, so the exercise cannot be read as demonstrating (or
  undermining) cryptographic provenance.
- **Verified the C2PA reading before citing it.** `c2pa.org`'s specification
  page 301-redirects to `spec.c2pa.org`; fetched the redirected URL directly
  and confirmed it is freely accessible with no login, then cited it by
  section (§1.2 Scope, §2.3.10 Authenticity) rather than as a bare link,
  after reading what those sections actually say about authenticity meaning
  cryptographic non-tampering, not truth of content.
- **Treated circular sourcing as optional context, per the plan, rather than
  inventing a citation for it.** The workshop's Evaluate section asks
  students to name how a provenance record that cites another provenance
  record can loop back on itself, as a conceptual question they answer in
  their own words, without a supplied reading — matching the plan's "circular
  sourcing is optional context" rather than manufacturing a source for a
  claim that does not need one.
- **Kept "missing is not false" as its own category, not folded into
  "undocumented removal."** `gpsCoordinates` and `cameraModel` are absent
  from both manifests because they were never captured at any stage (per
  week 4), not because this stripping operation removed them. The audit
  worksheet and the pack's tests both distinguish this from the two fields
  genuinely removed by the logged operation, addressing the gate against
  treating every missing field as evidence of falsity.

### Verification

`mise exec -- pnpm check`: typecheck clean, 50 pages built, axe-clean, no
broken links, course API 32 nodes / 52 edges, both decks still pass
astromotion's structural check, 120 of 120 tests green (112 existing + 8 new
in `spec/week-11-pack.test.ts`, including a check that the log's operations
actually name the stripped fields, a check that the rename survives under a
new key with no log entry naming it, a check that the checksum genuinely
changes and is never mentioned in the log, and a check that never-captured
fields are null in both manifests, not just the public one).

**Still not established.** No fresh reader has audited the manifests from
the pack alone — only an author check that the generated audit worksheet
matches the reveal text written about it. Neither page has been checked on
an actual phone-width viewport in a browser. Whether "propose one
proportionate archive-policy improvement" produces answers of comparable
quality across a real cohort is untested with only one author's own attempt
at the task.

**Commits:** `8c957a4` chain-of-custody manifest audit pack, `ace30cb`
workshop, lecture and archive pages.

## 2026-09-18 — Week 12 built: a preservation budget across three families

### Decisions and reasons

- **Used the archive's real published item counts and, where already
  measured, real sizes.** `packs/week-12/model.json` sets `itemCount` to the
  archive's actual published record counts (11 print, 5 audio, 2 image), and
  the image family's `sourceSizeGb` from week 4's own retained
  working-directory listing. Only the audio family's source-tier size is an
  estimate, since no audio bytes are published for that collection; the
  model's `note` field and `families[].note` both say so explicitly, per the
  gate against inventing measurements the archive does not have.
- **Made the "after" cost a computation, not a typed-in total.**
  `resolveProposal()` in `packs/week-12/build.ts` derives every proposal's
  cost from `pack.rates` and each family's real item count, rather than a
  hand-entered figure. This is the same discipline as week 11's computed
  after-manifest: the sensitivity test only means something if the revised
  rate genuinely changes the output of the same code, not a second,
  independently-authored number.
- **Fixed a real budget-accounting bug found by inspecting actual output,
  not assumed correct.** The first version of `partialSourceUpgrade()`
  computed the budget available for upgrading the audio family to source
  tier without first subtracting that family's own fallback-tier baseline
  cost, which let the "start-audio" proposal upgrade all 5 items and come
  out at $125.013 — over the stated $120 budget. That defeated the point of
  supplying two proposals that are both legitimately affordable at baseline.
  Fixed by computing `ownBaseline` and subtracting it before calling
  `partialSourceUpgrade()`; the corrected run upgrades exactly 4 of 5 audio
  items, for a real total of $118.010, under budget. Caught by running the
  build and reading `proposal-totals.csv`, not by reasoning about the code.
- **Fixed a CSV-escaping bug in the same build.** The partial allocation's
  `tier` field renders as a human-readable string containing a literal
  comma (`"4/5 source, rest examples"`), which written unquoted into
  `proposals.csv` silently split into an extra column. Fixed by quoting the
  `tier` field in the CSV writer; verified by reading the published file
  directly.
- **Engineered the sensitivity scenario so it flips one proposal, not
  neither or both.** Raising `sourceLaborPerItem` from $12 to $20 pushes
  "deep-image" from $104.005 to $120.005 (over budget) because it spends its
  source-tier dollars on the family that rate applies to in full, while
  "start-audio" actually *falls* from $118.010 to $105.003 because its
  partial-upgrade item count recomputes downward under the higher rate. This
  was verified by running the real computation under both rate sets and
  reading `sensitivity.csv`, satisfying the plan's gate that the stated
  constraint must force a meaningful choice rather than merely being
  asserted to.
- **Left the objection unresolved in the reveal, deliberately.** The pack's
  `objection`/`response` pair, and `reveal/analysis.md`'s prose, both stop
  short of naming a winning proposal; the response explains what the naive
  value score cannot adjudicate rather than adjudicating it. The pack's test
  suite checks this directly (`reveal/analysis.md` must not match
  `/\bwinner\b|\bbest proposal\b/i`), satisfying the plan's gate that
  different, defensible proposals should be able to earn full marks under
  the same rubric.
- **Verified both readings before citing them.** Fetched
  `marxists.org/reference/subject/philosophy/works/ge/benjamin.htm` and
  confirmed it is freely accessible with the relevant "aura" passage in
  §II–III, cited by section rather than a bare link. Fetched
  `premiumbeat.com/blog/how-pixar-saved-toy-story-2` and confirmed it is
  freely accessible, dated (2018-12-06) and authored (Caleb Stephens),
  covering the accidental deletion, the corrupt tape-backup restore, and
  Galyn Susman's home-copy recovery — a real, verifiable, on-theme
  preservation case rather than an invented one.
- **Added a cross-family archive note without merging ancestry.** The new
  "Cross-family: a preservation budget" section in `src/pages/archive/index.mdx`
  describes the budget comparison across print, audio and image, explicitly
  stating it is a resourcing comparison, not an ancestry claim, per the
  archive's own stated rule that parent-child edges stay within a family.

### Verification

`mise exec -- pnpm check`: typecheck clean (0 errors, the same one
pre-existing unrelated hint in `packs/week-06/build.ts`), 51 pages built,
axe-clean, no broken links, course API 32 nodes / 57 edges, both decks still
pass astromotion's structural check, 129 of 129 tests green (120 existing +
9 new in `spec/week-12-pack.test.ts`, including a check that preserving
every family fully at source tier exceeds the stated budget, a check that
both baseline proposals fit within budget, a check that the revised rate
flips at least one proposal out of budget, a check that the partial-upgrade
proposal upgrades a positive but incomplete share of its family's items, and
checks that the published CSVs and reveal text match the computed values).

**Still not established.** No fresh reader has worked the budget from the
pack alone — only an author check that the published CSVs match
`resolveProposal()`'s computed values. Neither page has been checked on an
actual phone-width viewport in a browser. Whether different students'
memos, choosing opposite proposals, would in fact both earn strong marks
under a real marker rather than this pack's own test suite is untested with
only one author's own attempt at the task. This was the last of the twelve
planned weeks; the separate curated A2 "Stemma" assessment pack,
`PROCESS.md`, starter-image replacement, fresh-reader trials, real
browser/viewport checks and shipping remain outstanding, as previously
flagged.

**Commits:** `4be9951` preservation budget pack, `6031380` workshop, lecture
and archive pages.

## 2026-09-18 — All twelve slide decks completed, and workshop reveals unlinked from the site

### Decisions and reasons

- **Finished the slide deck for every remaining lecture (weeks 07-12).**
  Each deck was written directly from that week's own lecture and, where read
  this session, workshop content — no invented numbers or quotes — and closes
  with a `## Text walkthrough` section so the deck view is not the only way
  to reach the material. `spec/deck-coverage.test.ts` (new this session)
  checks every lecture's `slides` frontmatter resolves to a deck file that
  exists and carries that heading, closing the gap that let a lecture ship
  with no deck, or a broken `slides` link, unnoticed.
- **Found and fixed a real fairness problem in every workshop pack, raised by
  the user's own read of the site.** Every workshop page's "Deposit" step
  linked directly to its pack's `reveal/` answer file
  (e.g. `/packs/week-09/reveal/analysis.md`), clickable from the public
  workshop page at any time — no download, no attempt at the task required.
  This was not merely an unlinked-file design gap; it was an active link the
  site itself rendered.
- **Considered and rejected a real date/auth gate.** This site is a single
  static build with no backend, and the course's own dates are fictional
  (2027) against the real build clock (2026) with no scheduled rebuild
  (`.github/workflows/checks.yml` only runs on push to `main`). A literal
  "hide reveal until the workshop date" check would hide every reveal
  permanently, and building a working simulated course-clock was judged more
  machinery than this problem needs.
- **Unlinked reveals instead, and made "unlinked" a checked fact rather than
  a one-time cleanup.** Removed the clickable reveal link from every
  workshop's Deposit step in `src/content/sessions/`, replacing it with the
  filename in plain code text plus an instruction to ask a tutor for the
  link once the student's own work is done. Removed the same `reveal/...`
  entry from every pack's own `writePackIndex` file list
  (`packs/week-NN/build.ts`), so the pack's generated `index.html` no longer
  links it either. The reveal files themselves are unchanged at their
  existing paths — this is obscurity, not access control, and is stated as
  such. New `spec/reveal-unlinked.test.ts` scans the built `dist/` for any
  `href` into a `/reveal/` path and fails if one exists, so a future
  workshop page cannot silently reintroduce the same link.

### Verification

`mise exec -- pnpm build` regenerated all nine affected pack `index.html`
files (one `<li>` line removed from each, nothing else changed — checked via
`git diff --stat public/packs`). The first `mise exec -- pnpm check` run
after writing `spec/reveal-unlinked.test.ts` correctly failed: it caught a
sixth live reveal link the session-page grep had missed, inside
`src/decks/week-06.deck.mdx`'s own "The reveal" slide
(`[reveal/production-log.md](/packs/week-06/reveal/production-log.md)`),
which renders into `/decks/week-06/` and was never covered by the
`src/content/sessions/` grep. Fixed the same way as the other six, then
`mise exec -- pnpm check` (typecheck, full build,
`spec/reveal-unlinked.test.ts`, and every previously-passing
`spec/week-NN-pack.test.ts`, which reads `reveal/...` files by their
unchanged path) passed in full: 140/140 tests, including
`spec/decision-log-freshness.test.ts` against this entry.

### Still not established

No fresh reader has confirmed the reworded Deposit-step instructions
("ask your tutor for the link") read clearly rather than confusingly, and no
actual tutor workflow for sharing the reveal link after a workshop has been
written down anywhere outside this log entry. Whether obscurity-only
unlinking is an acceptable final answer for a real course, versus a
stopgap pending real auth, remains the open question the user raised and
this session did not resolve beyond documenting the tradeoff.

**Commits:** decks — `cdd2f42`/`011fd9f` (weeks 07-08), `2dd5646` (weeks
09-10), `61ec6b6` (weeks 11-12), `9ec7c71` (deck-coverage harness); reveal
unlinking — `bf9f600` (de-link session pages and week-06 deck), `39ab07f`
(stop listing reveal answers in pack indexes), `7c7c89f`
(harness + CLAUDE.md rule + this entry).

## 2026-09-18 — Pack index pages redesigned, and a whole-pack zip added

### Decisions and reasons

- **Redesigned `packs/pack-index.ts`'s generated page.** The previous page
  was a bare `<ul>` of file links with no styling beyond a grey `<code>`
  background, unrevisited since it was built only to satisfy GitHub Pages'
  lack of directory listings. Rewrote it with a brand-matching palette
  hand-mirrored from `astro-theme-slop/slop.css` (this file is a plain Node
  script with no Astro pipeline access, so it can't import the theme
  package's CSS directly), bordered file rows with an extension badge per
  file, and a prominent download action above the list.
- **Added a `pack.zip` per pack, scoped to exactly the `files` array already
  passed to `writePackIndex`, not the whole folder.** The reveal-unlinking
  fix from earlier today only holds because no rendered page or index links
  the `reveal/` answer; a zip built from "everything in the directory" would
  have bundled that same answer back in as a single download, undoing the
  fix. Building it from the same `files` list the index already renders
  means the zip can never show more than the page does — one list drives
  both, so there's nothing extra to keep in sync. Week 1's `worked-answer.md`
  is included, matching its existing (separately noted, out-of-scope)
  exposure via its own index link.
- **No changes to any of the 10 `packs/week-NN/build.ts` scripts.** All of
  them already call `writePackIndex(dir, title, intro, files)` as their last
  line; the redesign and the zip both live entirely inside `pack-index.ts`,
  so the entire feature is a one-file change plus regenerating the output.

### Verification

Regenerated all 10 packs via `mise exec -- node packs/week-NN/build.ts`
(weeks 01-04, 06-07, 09-12); each printed its normal build summary with no
errors. Manually unzipped `public/packs/week-04/pack.zip` and confirmed its
contents exactly match the files listed on that pack's own `index.html`,
with no `reveal/` file present. New `spec/pack-zip.test.ts` checks this for
every pack, not just the one checked by hand. `mise exec -- pnpm check`
(typecheck, full build, all specs) passed in full: 161/161 tests, including
`spec/pack-zip.test.ts`, `spec/pack-links.test.ts`,
`spec/reveal-unlinked.test.ts` and `spec/decision-log-freshness.test.ts`
against this entry.

### Still not established

No fresh reader or actual student has looked at the redesigned page; the
visual check so far is the author's own eyeballing of one rebuilt page plus
a `curl` spot-check against the local preview server. The extension-badge
approach (CSV/TXT/MD/JSON as plain uppercase text) was chosen over any icon
set specifically because `@iconify-json/iconoir` (a devDependency) turned
out to be unused anywhere in `src` and unusable from a plain Node script
without extra plumbing — worth revisiting if the site ever gains a build-time
path from `packs/` into the Astro pipeline.

**Commits:** pack redesign + zip — `1cc8fac` (redesign pack-index.ts,
regenerate all 10 packs), `8b3735e` (pack-zip harness), this entry.

## 2026-09-18 — Typographic dashes/quotes replaced with ASCII in pack content

**Scope:** The user reported garbled characters ("â€"" instead of "—") when
opening a pack's `.txt` file directly in a browser.

### Decisions and reasons

- Confirmed the on-disk files were correct, unambiguous UTF-8 (`file` and
  `hexdump -C` on `public/packs/week-04/route-cards.txt` show the em dash as
  its proper 3-byte sequence, `e2 80 94`) — this was never a write-time
  corruption bug.
- The actual cause: the local preview server sends `Content-Type: text/plain`
  for `.txt`/`.csv`/`.md` pack files with no `charset` parameter (confirmed
  via `curl -sI`), so a browser opening one directly has to guess the
  encoding and can render UTF-8 multi-byte sequences as mojibake. GitHub
  Pages' static file serving gives no way to attach a custom header to fix
  this after deploy, so a server-side fix isn't available for the real
  deployment target.
- Fixed at the content layer instead, where it's portable regardless of
  hosting: replaced em dashes, en dashes, curly quotes and ellipses with
  their ASCII equivalents (`--`, `-`, `'`, `"`, `...`) throughout every
  `packs/week-NN/build.ts` and its `*.json` data file, then regenerated all
  10 packs. `packs/pack-index.ts` itself (its `index.html` output already
  declares `<meta charset="utf-8">`) and source-code prose comments were left
  untouched — only the strings that land in a pack's shipped plain-text
  output were in scope.
- Updated `spec/week-04-pack.test.ts`'s one assertion that hardcoded an em
  dash to match the new ASCII form.

### Verification

Regenerated all 10 packs via `mise exec -- node packs/week-NN/build.ts`;
confirmed no pack output file (excluding `.zip`/`.html`) contains any of
`– — ‘ ’ “ ” …` afterwards. Spot-checked `route-cards.txt` and
`public/packs/week-04/pack.zip`'s contents (`unzip -Z1`) — zip contents
unchanged apart from the byte-size shrink from the shorter ASCII strings.
`mise exec -- pnpm check` passed in full: 161/161 tests.

### Still not established

Whether the missing charset is specific to the local `astro preview` server
or also true of the real GitHub Pages deployment was not checked (would
require an actual deploy); the ASCII-content fix sidesteps the question
either way rather than depending on the answer.

## 2026-09-20 — Predict-then-reveal widget added to every workshop page

**Scope:** The user said the site was "too boring" and asked for interactive
elements on the workshop pages. Picked a predict-then-reveal interaction:
commit to a prediction before comparing it against published data — the
pedagogy 11 of 12 workshops already state in prose ("write down what you
expect before you compute anything").

### Decisions and reasons

- Built one reusable component, `src/components/PredictionCheck.astro`: a
  textarea plus a lock-in button that persists `{ text, lockedAt }` to
  `localStorage` under `prediction:<sessionSlug>`, then an optional reveal
  button that `fetch()`s one specific pack file and renders it in a `<pre>`.
  No framework, no build-time data — pure client-side JS over already-public
  files, wrapped in the existing `Callout` component for visual consistency
  with the archive page.
- The one hard constraint: `spec/reveal-unlinked.test.ts` and this file's own
  rule say a workshop's `reveal/` answer is never linked or fetched from any
  rendered page. Checked every `public/packs/week-*/` listing before picking
  a reveal target. Only 4 of 12 weeks have a genuinely safe, already-public,
  non-`reveal/` file whose own week already frames it as the thing to check
  against a prediction: week 4 (`evidence-menu.csv`), week 7
  (`results.csv`), week 11 (`manifest-after.json`), week 12
  (`objection.txt`). Those four get a `revealFile`; the other eight get
  commit-only mode, with the reveal button showing "Compare this once your
  tutor shares the reveal path for this workshop" instead of fetching
  anything — reinforcing the existing manual-reveal policy rather than
  working around it.
- Added one untyped `predictionCheck: { prompt, revealFile? }` frontmatter
  field per session file rather than extending `courseNodeSchema`, following
  the existing `.loose()` passthrough convention already used for
  `archiveDeposit`, `accessibleRoute`, etc.
- Wired it into `src/pages/sessions/[slug].astro` between `<Content />` and
  `<SpecList>`, rendered only when a session declares `predictionCheck`.

### Verification

`mise exec -- pnpm build`: no accessibility violations, no broken links,
`spec/reveal-unlinked.test.ts` still passes (0 `href="...reveal/..."`
matches in `dist/`, confirmed independently with a direct grep). Started
`astro preview` and manually exercised `/sessions/07-ancestry/`: typed a
prediction, locked it in, clicked reveal, confirmed `results.csv` loaded
through the base-path-prefixed fetch URL and rendered; reloaded the page and
confirmed the locked prediction persisted from `localStorage`.
`mise exec -- pnpm check` passed in full: 161/161 tests.

### Remaining uncertainty

Weeks 5 and 8 have no natural "predict X" moment beyond the generic rubric
line every week already carries ("state the week's question in your own
words before you start"), so their prompt is that generic line rather than
something week-specific — a lower-fidelity fit than the other ten weeks.

## 2026-09-20 — Reposition the prediction widget inline; make Check answers a toggle

**Scope:** The user asked for the prediction widget back "in the same place
as it was before" (its originally designed inline position, not the bottom
of the page) and for each workshop's five-minute Check question to stay
visible with the answer and reasoning behind an on-page reveal control,
rather than always-visible prose or (for weeks 6 and 7) deferred to the end
of Evaluate.

### Decisions and reasons

- Converted all 12 `src/content/sessions/*.md` files to `.mdx` so
  `<PredictionCheck />` can be placed inline in each file's own body rather
  than centrally after the whole rendered `<Content />`. Confirmed MDX
  support was already available transitively (`astro-theme-university` and
  `astromotion` both depend on `@astrojs/mdx`, and `src/decks/*.deck.mdx`
  already used it) — no `mdx()` integration needed adding to
  `astro.config.ts`; the build picked the `.mdx` files up unchanged.
  Removed the `predictionCheck` frontmatter field (now redundant) and the
  centralised render block in `src/pages/sessions/[slug].astro`.
  Each widget now sits at the end of "Before the workshop" (or the specimen
  intro for week 1), the same position the original design settled on.
- Wrapped every existing "*Indicative answer.*"/"*Check answer.*" paragraph
  in `<details><summary>View answer and reasoning</summary>…</details>` in
  place, so the question stays visible on the page and the reasoning is an
  explicit reveal rather than always-on prose. Confirmed first
  (`grep -rn` across `spec/`) that no spec test constrains this text's
  location or wording.
- Weeks 6 (`06-stemma.md`) and 7 (`07-ancestry.md`) previously deferred
  their Check answer to a paragraph inside `## Evaluate — 30 minutes`, with
  a "(Answer at the end of Evaluate...)" cross-reference in the Check
  section. Moved that paragraph up into the Check section's own `<details>`
  toggle and deleted the deferred copy and the cross-reference, so the
  answer now lives with its question like every other week.
- Week 5 (`05-scriptorium.md`) has no separate indicative-answer paragraph —
  the Check question defines the three error classes as the answer. Added a
  minimal `<details>` noting this is a recall check with no separate hidden
  answer, for consistency with the other 11 weeks' toggle pattern.

### Verification

`mise exec -- pnpm astro check`: 0 errors, 0 warnings (one pre-existing,
unrelated hint in `packs/week-06/build.ts`). `mise exec -- pnpm check`
(build + `vitest run spec`): 161/161 tests, 20 files, all green, including
`spec/reveal-unlinked.test.ts`. Grepped the built `dist/sessions/*/index.html`
directly: every `reveal/` occurrence is plain text (`<code>reveal/</code>`),
never an `href`; exactly one `<details>` block and two
`prediction-check`-class matches (button label + script hook) per page for
weeks with a widget.

## 2026-09-21 — Gate each pack's reveal/ files behind a locked prediction, instead of hiding them entirely

**Scope:** The user asked whether each week's downloadable pack already
included the answers referenced as a workshop's `reveal/` folder, or whether
that stayed separate as CLAUDE.md's existing rule required. After the
tradeoff was explained (reveal sat on disk but was excluded from both
`pack.zip` and every rendered link, enforced by `spec/reveal-unlinked.test.ts`
and `spec/pack-zip.test.ts`), the user chose a middle path over the fully
manual status quo: "keep the reveal in each week pack and the student should
be able to open it only when he/she has locked their prediction for the
workshop... shown in each week starter pack but don't include that in the
zip download."

### Decisions and reasons

- This is a deliberate loosening of the absolute "never linked" rule, not a
  suppressed test failure — CLAUDE.md's own principle ("correct a mistaken
  test with a documented reason; do not suppress a valid failure") required
  writing down why the promise changed rather than just editing the test
  until it passed. The old rule existed to stop reveal from being a one-click
  open with zero workshop attempted; the new design keeps that exact
  property (nothing opens without a locked prediction) while adding the
  visibility and convenience the user asked for.
- Implemented in `packs/pack-index.ts`: `writePackIndex()` gained an optional
  `reveal: { sessionSlug, files }` parameter. When present, the pack's own
  `index.html` gets a "Reveal" section listing those files, each rendered as
  `<a href="#" data-reveal-name="...">` — never a real `href` into
  `reveal/`. An inline `<script>` checks
  `localStorage.getItem('prediction:<sessionSlug>')` (the same key
  `PredictionCheck.astro` writes on the workshop page, shared by origin) and,
  only if it's set, unhides the list and rewrites each link's `href` to
  `./reveal/<name>`. The static HTML shipped to `dist/` therefore never
  contains an unconditional reveal link — `spec/reveal-unlinked.test.ts`'s
  existing scan needed no logic change, only a comment update explaining the
  narrower (but still real) thing it now guards against.
- Reveal files are passed as a separate argument, never appended to the
  existing `files` array `writePackZip()` and the index's file list are built
  from — so `pack.zip` continues to exclude them by construction, and
  `spec/pack-zip.test.ts` needed no change at all.
- Wired the 9 packs that actually have a `reveal/` folder on disk
  (weeks 02, 03, 04, 06, 07, 09, 10, 11, 12) with their real filenames and
  session slugs. Week 1 was left alone: it has no `reveal/` folder at all —
  `worked-answer.md` sits at its pack root and was already an accepted,
  separately-documented exception (unconditionally listed and zipped) from
  before this change, so it is out of scope here. Weeks 5 and 8 have no pack
  to begin with.

### Verification

`mise exec -- pnpm check` (build + `vitest run spec`): all tests green,
including `spec/reveal-unlinked.test.ts` and `spec/pack-zip.test.ts`
unmodified in logic. Grepped built `dist/packs/week-*/index.html` directly
for `href="[^"]*reveal[^"]*"` matching anything other than `href="#"`: zero
matches. Confirmed each `pack.zip` (`unzip -Z1`) still excludes every
`reveal/*` filename.

### Template for subsequent observed results

- What was tested and with which materials/version:
- What confused or failed (or what passed):
- Actual elapsed time, where measured:
- What changed and why it is more defensible:
- Verification after the change:
- Remaining uncertainty and reviewer limitations:
- Commit hash once it exists:

## 2026-09-21 — Week 1's worked-answer.md brought under the same prediction gate

The previous entry above deliberately left week 1 out, since its
`worked-answer.md` sits at the pack root rather than under a `reveal/`
folder and was an older, separately-documented exception. The user then
asked directly: "does week 1 need the same treatment too?" Week 1 already
has a `PredictionCheck` widget (`sessionSlug="01-photocopy"`) on its
workshop page, and its own worksheet already tells the student to open
`worked-answer.md` "after your own table" — an honor-system instruction
never technically enforced. Bringing it under the same gate costs no new
session-page work, only pack wiring, so it was done for consistency.

### Decisions and reasons

- `packs/pack-index.ts`'s `PackReveal`/`PackFile` reveal-entry shape changed
  from `{ name, what }` to `{ path, what }`, where `path` is the file's
  location relative to the pack directory (e.g. `"reveal/analysis.md"` for
  the 9 existing weeks, or `"worked-answer.md"` for week 1) rather than a
  bare filename with an assumed `reveal/` prefix. The displayed filename
  (badge, `<code>` text) is derived from `path` via a new `basename()`
  helper, so the rendered listing looks identical to before. The inline
  `<script>`'s link-unlock logic changed from hardcoding
  `"./reveal/" + name` to just `"./" + path`, since `path` now already
  carries whatever prefix (or none) is correct for that file. The 9
  existing weeks' `build.ts` calls were updated to pass
  `path: "reveal/<filename>"` instead of `name: "<filename>"`, preserving
  their exact previous behavior.
- `packs/week-01/build.ts` moved `worked-answer.md` out of the unconditional
  `files` array (where it was zipped and linked with no lock) into the same
  gated `reveal: { sessionSlug: "01-photocopy", files: [...] }` argument the
  other 9 weeks use, with `path: "worked-answer.md"` (no `reveal/` prefix,
  since the file has no such subfolder on disk).
- `CLAUDE.md`'s rule was reworded from referring specifically to a
  workshop's "`reveal/` files" to a workshop's "answer file(s) — a `reveal/`
  subfolder, or (week 1 only) a top-level `worked-answer.md`" — the
  behavior described was already general, only the wording was narrower
  than the implementation now is.

### Verification

Regenerated all 10 affected packs via `mise exec -- node packs/week-NN/build.ts`
(01, 02, 03, 04, 06, 07, 09, 10, 11, 12). Grepped
`public/packs/week-01/index.html`: the reveal link renders as
`<a href="#" data-reveal-path="worked-answer.md">`, and `worked-answer.md`
is confirmed absent from `public/packs/week-01/pack.zip` (`unzip -l`).
Grepped `public/packs/week-04/index.html` to confirm the 9 existing weeks'
behavior is unchanged: `data-reveal-path="reveal/analysis.md"`. Ran the
built inline `<script>` through a small Node.js DOM-shim simulation for
week 1 specifically, for both lock states: locked leaves the list hidden
with no `href` set; unlocked unhides the list and sets
`href="./worked-answer.md"` — the correct pack-root path, not the 9-week
`reveal/`-prefixed one. `mise exec -- pnpm check` (typecheck + build + full
`vitest run spec`): 161/161 tests green across 20 files, 0 typecheck
errors, including `spec/reveal-unlinked.test.ts` and `spec/pack-zip.test.ts`
unmodified in logic.

### Template for subsequent observed results

- What was tested and with which materials/version:
- What confused or failed (or what passed):
- Actual elapsed time, where measured:
- What changed and why it is more defensible:
- Verification after the change:
- Remaining uncertainty and reviewer limitations:
- Commit hash once it exists:

## 2026-09-21 — Generation-loss simulator and a workshop progress dashboard

**Scope:** With the deadline explicitly set aside, the user asked for more
interactive elements and, from a brainstorm grounded in the site's actual
inventory (no JS framework, no charting library — every interactive bit is
vanilla JS in an `.astro` `<script>` tag), picked two: a live text-based
generation-loss simulator, and a dashboard reading the prediction-commit
records the site already writes across all twelve workshops.

### Decisions and reasons

- The simulator's `runChain` corrupts each generation's **previous output**,
  not the original, every step — real compounding loss rather than
  independent per-generation noise, since compounding is the course's
  point, not a cosmetic detail.
- `countErrors` is an exact client-side port of week 1's own counting rule
  (`packs/week-01/build.ts`): position-by-position diff of two equal-length
  strings, split into misreadings versus the `·` illegible marker. Reusing
  the identical rule, rather than inventing a similar one, keeps the page a
  supplement to week 1 rather than a competing algorithm.
- "Re-roll" reruns the same settings rather than reseeding a fixed sequence,
  so a student can watch the same generations/error-rate produce a
  different result each press — deliberately dramatizing the distinction
  week 1's worked answer draws between a deterministic counting rule and a
  non-deterministic copying process.
- The per-generation error chart is plain `<div>` bars with inline
  `width: X%`, not canvas or a charting library (none is installed), with a
  `visually-hidden` fallback `<ul>` carrying the same numbers as text so the
  chart is not the only way to read the data.
- `ProgressDashboard.astro` only ever reads the existing
  `prediction:<sessionSlug>` localStorage keys `PredictionCheck.astro`
  already writes. It adds no new state and never touches `reveal/`
  gating, so `spec/reveal-unlinked.test.ts` and this week's reveal-gate
  work are unaffected by construction.
- Two known-shaped build failures recurred while implementing this, both
  already documented as risk classes in this log and in the approved plan:
  a heading-order accessibility violation from the simulator's three
  `<h3>` output sections having no preceding `<h2>` on `/simulator/` (fixed
  by using `<h2>` throughout, matching `src/pages/index.astro`'s own
  section headings), and a base-path link-checker failure from a
  hand-written `href="/sessions/01-photocopy/"` literal in
  `simulator/index.astro` skipping Astro's base rewriting (fixed with the
  same `` `${import.meta.env.BASE_URL}...` `` pattern already used for
  `archiveHref` in `src/pages/index.astro`). Nav-array links and MDX
  markdown links both turned out not to need this treatment — only
  hand-written `.astro` hrefs do.

### Verification and limits

`mise exec -- pnpm check` (typecheck + build + full `vitest run spec`) was
run and passed after each of the four commits below: 161/161 tests across
20 files, 0 accessibility violations, all internal links respect base, no
broken links. No existing spec's contract changed and no new `/packs/` or
`reveal/` path was introduced. Manually confirmed neither `dist/simulator/`
nor `dist/sessions/` output references any `reveal/` path. Not verified in
a live browser in this session: slider/textarea interaction, the re-roll
button's visible non-determinism, and the dashboard's three localStorage
states (clean profile, populated profile, blocked storage) were reasoned
through from the code rather than exercised in `astro dev`/`astro preview`.

**Commits:** 4715c81 (simulator page + component), dbb2f1f (nav link + week
1 cross-link), 118474c (progress dashboard), and this entry.

## 2026-09-21 — Distinct `spec:` bullets for weeks 5–12

**Scope:** A content-coherence read-through, checked against the
assignment's "response to the brief" criterion, found that weeks 5–12 all
carried the identical three `spec:` lines in their MDX frontmatter, copied
verbatim from week to week, while weeks 1–4 each had distinct,
task-specific bullets. Read side by side, that is exactly the "starter
with the nouns swapped" pattern the brief marks down regardless of whether
CI passes — even though nothing here is checked mechanically, since
`spec:` bullets are documentation of intent, not asserted by any spec test.

### Decisions and reasons

- Each week's three bullets were rewritten to name that week's own
  artefact and judgement call — e.g. week 5's error-type classification,
  week 6's competing-tree justification, week 9's condition-scoped
  conclusion, week 12's named accepted loss — rather than paraphrasing the
  same "state the question / separate observed from inferred / name an
  alternative" template eight times.
- No workshop's actual task content, stages, timing or assessment
  cross-links changed — only the `spec:` frontmatter array, which is
  reference documentation of what the week trains, not machine-checked
  against the page body.

### Verification and limits

`mise exec -- pnpm check` was run after the edit: 161/161 tests across 20
files, 0 accessibility violations, all links respect base, no broken
links. No spec's contract changed and no new day of content work was
introduced (today's `## 2026-09-21` entries already cover it), so
`spec/decision-log-freshness.test.ts` needed no new date, only this entry
for legibility of process.

**Commits:** 099f4d9 (spec bullets, weeks 5–12), and this entry.

## 2026-09-21 — Homepage timetable

**Scope:** Added a 12-row timetable to the homepage (`CourseTimetable.astro`)
showing each week's lecture, workshop, recurring Generation Check and any
assessment due that week.

### Decisions and reasons

- An assessment's `week:` frontmatter names the week it is **introduced**,
  not the week it is **due** — `the-stemma` is introduced week 6 but due
  2027-04-30, which lands after week 9's own session date. Placing it on
  week 6 would have misrepresented the actual deadline the student faces.
  The component instead computes, per assessment, the latest session whose
  date is on or before the assessment's `due` timestamp, and places the due
  badge there. `the-lossless-argument`'s due date (2027-06-07) falls after
  every session date, so it lands on week 12, the last available row.
- Generation Checks recurs every workshop (`series: weekly`), so it is shown
  as a standing column on every row rather than tied to one week.
- Hrefs use `withBase()` from `astro-theme-university/url`, matching this
  project's own established fix for the same class of bug (a hand-written
  root-absolute href skips base-path handling and 404s once deployed under
  the repo's base path).

### Verification and limits

`mise exec -- pnpm check` passed after the change: 161/161 tests, 0
accessibility violations, all links respect base, no broken links. Checked
the built `dist/index.html` directly to confirm `the-chain` (due 2027-03-26)
lands on week 5, `the-stemma` (due 2027-04-30) lands on week 9 — matching
week 9's own page text, "The Stemma is due this Friday, 2027-04-30" — and
`the-lossless-argument` lands on week 12. This is UI, not `src/content` or
`src/decks`, so `spec/decision-log-freshness.test.ts` required no new dated
entry; this one is for legibility of process only.

**Commits:** c428041 (homepage timetable), and this entry.
