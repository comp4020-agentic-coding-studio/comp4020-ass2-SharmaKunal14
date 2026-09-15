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

### Template for subsequent observed results

- What was tested and with which materials/version:
- What confused or failed (or what passed):
- Actual elapsed time, where measured:
- What changed and why it is more defensible:
- Verification after the change:
- Remaining uncertainty and reviewer limitations:
- Commit hash once it exists:
