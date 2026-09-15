# Phase 8 — Week 8 · Copying without loss

**Status: planned, not implemented or rehearsed by this document update.**
This file owns the detailed teaching, resources, implementation tasks and
acceptance checks for this week. Course decisions and dates live in the
[course plan](../course-plan.md); shared procedures live in the
[phase README](README.md). Update the owner first when decisions change.

## 1. Purpose and progression

**Distinct capability:** Calculate protection overhead and demonstrate its failure boundary.

**Archive placement:** Bits. Compare week 1 exact copying and week 7 noisy-model assumptions. Create a distinct bits family; carry cost and failure assumptions into weeks 11–12.

## 2. Weekly teaching brief

Use week 8 dates from the [teaching index](../course-plan.md#6-twelve-dated-teaching-weeks)
and the agreed [clock timetable](../course-plan.md#4-timetable-and-vocabulary).

- Question: What resources can protect a message from a specified error pattern?
- Target: calculate redundancy overhead and state the protection's limit.
- Activity: use short bitstrings and a worked repetition-code worksheet;
  compare an unprotected message, a correctable case and a failure case. Keep
  advanced coding schemes optional. No student implementation is required.
- Output: bits-family table recording payload, transmitted bits, overhead and
  errors corrected. Link to week 1's exact-copy control and week 7's noisy model.
- Check: decode one supplied block and state the assumption under which the
  answer is reliable. Feedback includes a counterexample outside that assumption.
- Candidate readings: selected passages from Shannon and Hamming; provide a
  plain-language primer and verify the chosen sections.
- Accessible route: labelled text blocks. Introduce The Lossless Argument and
  a sample costing; do not imply redundancy removes every preservation risk.

## 3. How the lecture and workshop run

### Monday lecture — 60 minutes

Explain a simple repetition code using a short worked message. Compare detection/correction and the assumptions behind a guarantee. Keep advanced codes and biological comparisons optional and source-checked.

See the [shared lecture procedure](README.md#shared-teaching-and-page-procedure).

### Wednesday workshop — 120 minutes

**Investigation (40 minutes):** Decode a protected example (10 minutes); compare an unprotected, correctable and failure case (15); calculate payload, transmitted bits and overhead (15). No coding is required.

Use the workshop stages and quiz rubric from the
[shared procedure](README.md#shared-teaching-and-page-procedure).

## 4. Resources and accessible participation

**Required deliverable:** On-page bitstrings, worked decoding, correctable and failure cases, overhead table and fictional sample costing.

**Optional after core acceptance:** Software or additional coding schemes.

Apply the [shared resource rules](README.md#shared-resources-and-scope).
Use the accessible route in §2; readings remain candidates until verified.

## 5. Assessment connection

Introduce the existing A3 brief and its 20/25/25/20/10 weighted rubric. Teach one costing component; weeks 10–12 provide claim evaluation, provenance and tradeoff practice needed for the complete assessment.

Canonical assessment contracts and deadlines: [course-plan §7](../course-plan.md#7-assessments-and-marking).

## 6. What this phase builds

| File or resource | Required result |
|---|---|
| `src/content/sessions/08-error-correction.md` | Week 8 workshop with actual Wednesday date, question, timed task, resources, output, check and feedback |
| `src/content/lectures/week-08.md` | Monday lecture with the learning target, worked explanation, reading locator and workshop link |
| Archive page and this family's example assets | Source/scenario, operations, expected deposit and accessible on-page evidence; files where required |
| Relevant existing assessment/policy links | Accurate connection to the contracts created in Phase 0 |

Suggested `related:` references: `lectures/week-08, sessions/01-photocopy, sessions/07-ancestry, assessments/the-lossless-argument`. These are pedagogical
links, not ancestry edges. Only use references whose targets exist in the completed
skeleton. Ordinary archive links must respect the repository base path. Keep
`week: 8` and the dates in §2 consistent across the rendered page and course data.

No artwork generation is tied to week number. Use an informative specimen image
where it helps; follow the shared modest artwork scope or choose no decorative
image. Preserve the fixed platform and required collection keys.

## 7. Acceptance and evidence

Apply the [shared verification procedure](README.md#verification-and-completion).
The following gates add checks specific to this activity.

### Human acceptance gates

- [ ] Hand-check the example decoding and overhead calculations, including one failure outside the promised error bound.
- [ ] Verify students can complete the worksheet without programming or specialist mathematics.
- [ ] Confirm the A3 rubric is weighted and matches the master plan; do not replace it with an evocative holistic statement.

Apply the shared resource-floor, timing, browser and cold-reader checks.

### Decision to examine, not a prewritten process story

Why a small worked scheme with a failure case teaches a bounded guarantee better than surveying many coding theories.

Record the real decision and observed checks in docs/decision-log.md using
[the shared rehearsal procedure](README.md#required-rehearsal-before-expansion).
