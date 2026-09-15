# Phase 7 — Week 7 · When ancestry becomes hard to read

**Status: planned, not implemented or rehearsed by this document update.**
This file owns the detailed teaching, resources, implementation tasks and
acceptance checks for this week. Course decisions and dates live in the
[course plan](../course-plan.md); shared procedures live in the
[phase README](README.md). Update the owner first when decisions change.

## 1. Purpose and progression

**Distinct capability:** Interpret simulation results within explicit model assumptions.

**Archive placement:** Sequence model. After the break, recap the relevant week 6 inference in a short explanation. Use a separate model study. Week 9 reuses the practice of comparing model conditions and checking limitations.

## 2. Weekly teaching brief

Use week 7 dates from the [teaching index](../course-plan.md#6-twelve-dated-teaching-weeks)
and the agreed [clock timetable](../course-plan.md#4-timetable-and-vocabulary).

- Question: What happens to ancestry inference as copying errors increase?
- Target: describe how the assumptions of a simulation limit its conclusion.
- Activity: compare synthetic sequence replication at three error rates, using
  fixed seeds and repeated runs in supplied results or a spreadsheet. Measure
  ancestor agreement over generations. This simple exercise does not establish
  a biological error threshold; discuss selection and population structure as
  missing features before using biological interpretations.
- Output: parameter-labelled plot and a limitations note linked to week 6's
  inference method, in the Sequence model study.
- Check: interpret an already supplied plot; name one conclusion it cannot justify.
- Candidate reading: an accessible primary-source passage on replication/error
  models, to be selected and verified; Eigen/Domingo are search leads only.
- Accessible route: plot data and prose trend description. Assessment link:
  practise the limitations paragraph for The Stemma.

## 3. How the lecture and workshop run

### Monday lecture — 60 minutes

Explain the synthetic replication model, its parameters and ancestor-agreement measure. Separate its finite-run observations from biological claims; identify missing selection and population structure.

See the [shared lecture procedure](README.md#shared-teaching-and-page-procedure).

### Wednesday workshop — 120 minutes

**Investigation (40 minutes):** Read parameters and predict a trend (10 minutes); compare prepared repeated runs at three error rates (20); identify a conclusion the model cannot justify (10). No biological threshold must be discovered.

Use the workshop stages and quiz rubric from the
[shared procedure](README.md#shared-teaching-and-page-procedure).

## 4. Resources and accessible participation

Label every table, plot and result **simplified model**. State that biological
selection and population structure are omitted. This is not a biological
threshold measurement.

**Required deliverable:** Short synthetic ancestor, three error rates and three fixed seeds; compact results at selected generations, plot and limitations task. Retain model/settings for reproduction.

**Optional after core acceptance:** Simulation UI, bulk outputs and additional runs.

Apply the [shared resource rules](README.md#shared-resources-and-scope).
Use the accessible route in §2; readings remain candidates until verified.

## 5. Assessment connection

Practise the A2 limitations paragraph. The five-minute check interprets a prepared plot; it does not require running an experiment.

Canonical assessment contracts and deadlines: [course-plan §7](../course-plan.md#7-assessments-and-marking).

## 6. What this phase builds

| File or resource | Required result |
|---|---|
| `src/content/sessions/07-ancestry.md` | Week 7 workshop with actual Wednesday date, question, timed task, resources, output, check and feedback |
| `src/content/lectures/week-07.md` | Monday lecture with the learning target, worked explanation, reading locator and workshop link |
| Archive page and this family's example assets | Source/scenario, operations, expected deposit and accessible on-page evidence; files where required |
| Relevant existing assessment/policy links | Accurate connection to the contracts created in Phase 0 |

Suggested `related:` references: `lectures/week-07, sessions/06-stemma, assessments/the-stemma`. These are pedagogical
links, not ancestry edges. Only use references whose targets exist in the completed
skeleton. Ordinary archive links must respect the repository base path. Keep
`week: 7` and the dates in §2 consistent across the rendered page and course data.

No artwork generation is tied to week number. Use an informative specimen image
where it helps; follow the shared modest artwork scope or choose no decorative
image. Preserve the fixed platform and required collection keys.

## 7. Acceptance and evidence

Apply the [shared verification procedure](README.md#verification-and-completion).
The following gates add checks specific to this activity.

### Human acceptance gates

- [ ] Reproduce prepared results using recorded settings and seeds, and check agreement calculations.
- [ ] Show variation across repeated runs rather than selecting a single dramatic run.
- [ ] Reject any claim that this exercise establishes a universal biological threshold or an inequality that applies to every earlier medium.

Apply the shared resource-floor, timing, browser and cold-reader checks.

### Decision to examine, not a prewritten process story

Why a limited ancestry simulation replaced a supposed universal threshold, and what evidence supports the narrower lesson.

Record the real decision and observed checks in docs/decision-log.md using
[the shared rehearsal procedure](README.md#required-rehearsal-before-expansion).
