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

### Template for subsequent observed results

- What was tested and with which materials/version:
- What confused or failed (or what passed):
- Actual elapsed time, where measured:
- What changed and why it is more defensible:
- Verification after the change:
- Remaining uncertainty and reviewer limitations:
- Commit hash once it exists:
