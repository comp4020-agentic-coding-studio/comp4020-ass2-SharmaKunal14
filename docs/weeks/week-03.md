# Phase 3 — Week 3 · What the ear cannot hear

**Status: planned, not implemented or rehearsed by this document update.**
This file owns the detailed teaching, resources, implementation tasks and
acceptance checks for this week. Course decisions and dates live in the
[course plan](../course-plan.md); shared procedures live in the
[phase README](README.md). Update the owner first when decisions change.

## 1. Purpose and progression

**Distinct capability:** Repair a confounded comparison and specify an experiment that tests a cause.

**Archive placement:** Audio. Reuse the audio source record, but replace week 2 inference with experimental design. Week 4 reuses the discipline of defining exactly what was observed.

## 2. Weekly teaching brief

Use week 3 dates from the [teaching index](../course-plan.md#6-twelve-dated-teaching-weeks)
and the agreed [clock timetable](../course-plan.md#4-timetable-and-vocabulary).

- Question: How would we test whether repeated re-encoding caused a measured change?
- Target: design a comparison that isolates the number of encoding cycles from
  other changes in the processing setup.
- Lecture emphasis: a feature observed in week 2 suggests an explanation; testing
  a cause requires a control, a stated outcome measure and a comparison with
  relevant settings held fixed. Work through a flawed experiment before repairing it.
- Supplied evidence: a small on-page results table for an exact-copy control,
  one-cycle and ten-cycle encoding condition at fixed settings, plus a misleading
  comparison changing bitrate and cycle count. Use one common source record and
  a worked calculation. Retain the method and source for measured values; clearly
  label hypothetical values used purely to practise experimental design. Reuse
  week 2's source if real recordings were produced. Full audio downloads are optional.
- Investigate (40 minutes): identify the confound in the misleading comparison
  (10); write a corrected protocol and prediction before opening results (15);
  analyse the matching prepared results or optionally execute the local protocol
  (15). Students record independent variable, outcome measure, control and fixed
  settings. Do not require installing an encoder during the workshop.
- Output: one-page protocol and results table, with a conclusion limited to the
  tested source, settings and metric. Add the controlled comparison to the audio
  archive. No measurable difference is an acceptable result; audible or monotonic
  deterioration at every step is not promised.
- Check: a supplied comparison changes both bitrate and cycle count; identify
  the confound, specify one corrected comparison and state its remaining limit.
  Feedback rewards experimental design, not identification of a codec or ancestry.
- Candidate reading: Jonathan Sterne, *MP3: The Meaning of a Format*, excerpt.
- Accessible route: numerical results and annotated spectrograms. Assessment
  link: revise The Chain's proposed experiment using the protocol template (LO1).
- Before publishing: verify the comparison isolates the stated variable and that
  students can calculate the chosen measure. Reproduce any empirical results;
  for a hypothetical table, check arithmetic and state that it demonstrates
  experimental reasoning, not a measured codec effect. Preserve actual null findings.

## 3. How the lecture and workshop run

### Monday lecture — 60 minutes

Use a deliberately flawed bitrate/cycle-count comparison. Identify the independent variable, outcome, control and fixed settings, then show how a defensible comparison answers a narrower question.

See the [shared lecture procedure](README.md#shared-teaching-and-page-procedure).

### Wednesday workshop — 120 minutes

**Investigation (40 minutes):** Use the three-part 40-minute protocol-design investigation in the teaching brief. Record the prediction before revealing prepared results. Running an encoder is optional.

Use the workshop stages and quiz rubric from the
[shared procedure](README.md#shared-teaching-and-page-procedure).

## 4. Resources and accessible participation

**Required deliverable:** Small results table, flawed comparison, corrected protocol template, worked calculation and feedback. Label hypothetical values; retain source/method for measurements.

**Optional after core acceptance:** Full audio downloads, encoder UI and parameter sweeps.

Apply the [shared resource rules](README.md#shared-resources-and-scope).
Use the accessible route in §2; readings remain candidates until verified.

## 5. Assessment connection

Students revise the A1 protocol and control (LO1). The check assesses experimental reasoning rather than codec identification.

Canonical assessment contracts and deadlines: [course-plan §7](../course-plan.md#7-assessments-and-marking).

## 6. What this phase builds

| File or resource | Required result |
|---|---|
| `src/content/sessions/03-perceptual.md` | Week 3 workshop with actual Wednesday date, question, timed task, resources, output, check and feedback |
| `src/content/lectures/week-03.md` | Monday lecture with the learning target, worked explanation, reading locator and workshop link |
| Archive page and this family's example assets | Source/scenario, operations, expected deposit and accessible on-page evidence; files where required |
| Relevant existing assessment/policy links | Accurate connection to the contracts created in Phase 0 |

Suggested `related:` references: `lectures/week-03, sessions/02-dub, assessments/the-chain`. These are pedagogical
links, not ancestry edges. Only use references whose targets exist in the completed
skeleton. Ordinary archive links must respect the repository base path. Keep
`week: 3` and the dates in §2 consistent across the rendered page and course data.

No artwork generation is tied to week number. Use an informative specimen image
where it helps; follow the shared modest artwork scope or choose no decorative
image. Preserve the fixed platform and required collection keys.

## 7. Acceptance and evidence

Apply the [shared verification procedure](README.md#verification-and-completion).
The following gates add checks specific to this activity.

### Human acceptance gates

- [ ] Verify that the intended comparison changes cycle count while holding the stated encoding settings and source fixed.
- [ ] Reproduce empirical measurements; for hypothetical values, check arithmetic and label them as design practice without an empirical claim.
- [ ] Accept a null or non-monotonic finding. Remove any promise that ten encodings must become audible or that numerical and listener judgements must disagree.

Apply the shared resource-floor, timing, browser and cold-reader checks.

### Decision to examine, not a prewritten process story

Why isolating a cause replaced guessing a codec, and what the control actually rules out.

Record the real decision and observed checks in docs/decision-log.md using
[the shared rehearsal procedure](README.md#required-rehearsal-before-expansion).
