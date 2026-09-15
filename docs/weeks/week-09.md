# Phase 9 — Week 9 · The curse of recursion

**Status: planned, not implemented or rehearsed by this document update.**
This file owns the detailed teaching, resources, implementation tasks and
acceptance checks for this week. Course decisions and dates live in the
[course plan](../course-plan.md); shared procedures live in the
[phase README](README.md). Update the owner first when decisions change.

## 1. Purpose and progression

**Distinct capability:** Compare recursive sampling conditions and evaluate a conditional claim.

**Archive placement:** Distribution model. Reuse week 7 model scrutiny, in the separate Distribution model study. Compare lessons across families without asserting that earlier media lose information uniformly.

## 2. Weekly teaching brief

Use week 9 dates from the [teaching index](../course-plan.md#6-twelve-dated-teaching-weeks)
and the agreed [clock timetable](../course-plan.md#4-timetable-and-vocabulary).

- Question: Under what conditions can recursive sampling lose rare cases?
- Target: compare conditions rather than infer training history from writing style.
- Activity: inspect five rounds of a small categorical resampling model across
  repeated seeds. Compare replacing all samples with generated samples against
  retaining original data and an original-data baseline. Supply counts and
  settings; no language-model training or API keys needed.
- Output: rare-category retention table and limitations note in the distribution
  model study, connected to week 7's treatment of model assumptions. Label this as
  an illustration, not a replication of a large-model experiment.
- Check: interpret a supplied count table and say whether it supports the stated
  claim. Avoid asking students to identify an AI generation from prose alone.
- Candidate reading: Shumailov and colleagues, “AI models collapse when trained
  on recursively generated data,” with setup and limitations checked directly.
- Accessible route: count tables and annotated chart. **The Stemma due Friday
  2027-04-30, 12:00 Canberra time.**

## 3. How the lecture and workshop run

### Monday lecture — 60 minutes

Introduce rare-category retention and the three sampling conditions. Explain which elements illustrate the source paper and which are simplified; do not equate a categorical toy model with language-model training.

See the [shared lecture procedure](README.md#shared-teaching-and-page-procedure).

### Wednesday workshop — 120 minutes

**Investigation (40 minutes):** Inspect condition definitions and sample counts (10 minutes); compare five rounds across repeated seeds (20); write a conditional conclusion and limitation (10). Use prepared data or an optional spreadsheet.

Use the workshop stages and quiz rubric from the
[shared procedure](README.md#shared-teaching-and-page-procedure).

## 4. Resources and accessible participation

Label every table, chart and result **simplified model**. Categorical resampling
omits language-model architecture, optimisation and language structure. The
exercise does not establish behaviour for all trained models.

**Required deliverable:** Small distribution, five rounds, three conditions and three seeds; compact counts, retention summaries and feedback. Retain model/settings for reproduction.

**Optional after core acceptance:** Live resampling or language-model training.

Apply the [shared resource rules](README.md#shared-resources-and-scope).
Use the accessible route in §2; readings remain candidates until verified.

## 5. Assessment connection

A2 is due 2027-04-30 at 12:00 Canberra local time. The check evaluates supplied counts and conditions, not the style of generated prose.

Canonical assessment contracts and deadlines: [course-plan §7](../course-plan.md#7-assessments-and-marking).

## 6. What this phase builds

| File or resource | Required result |
|---|---|
| `src/content/sessions/09-recursion.md` | Week 9 workshop with actual Wednesday date, question, timed task, resources, output, check and feedback |
| `src/content/lectures/week-09.md` | Monday lecture with the learning target, worked explanation, reading locator and workshop link |
| Archive page and this family's example assets | Source/scenario, operations, expected deposit and accessible on-page evidence; files where required |
| Relevant existing assessment/policy links | Accurate connection to the contracts created in Phase 0 |

Suggested `related:` references: `lectures/week-09, sessions/07-ancestry, assessments/the-stemma`. These are pedagogical
links, not ancestry edges. Only use references whose targets exist in the completed
skeleton. Ordinary archive links must respect the repository base path. Keep
`week: 9` and the dates in §2 consistent across the rendered page and course data.

No artwork generation is tied to week number. Use an informative specimen image
where it helps; follow the shared modest artwork scope or choose no decorative
image. Preserve the fixed platform and required collection keys.

## 7. Acceptance and evidence

Apply the [shared verification procedure](README.md#verification-and-completion).
The following gates add checks specific to this activity.

### Human acceptance gates

- [ ] Reproduce category counts and retention metrics from the supplied runs; document mixing proportions and sample sizes.
- [ ] Check the narrative includes controls and variation rather than promising disappearance in every run.
- [ ] Verify the academic source’s setup and limits before publication. No API keys, model training or paid compute are required for the activity.

Apply the shared resource-floor, timing, browser and cold-reader checks.

### Decision to examine, not a prewritten process story

Why controlled categorical resampling replaced recursive model training and stylistic identification of later outputs.

Record the real decision and observed checks in docs/decision-log.md using
[the shared rehearsal procedure](README.md#required-rehearsal-before-expansion).
