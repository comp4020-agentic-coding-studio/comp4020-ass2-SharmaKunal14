# Phase 11 — Week 11 · Chain of custody

**Status: planned, not implemented or rehearsed by this document update.**
This file owns the detailed teaching, resources, implementation tasks and
acceptance checks for this week. Course decisions and dates live in the
[course plan](../course-plan.md); shared procedures live in the
[phase README](README.md). Update the owner first when decisions change.

## 1. Purpose and progression

**Distinct capability:** Distinguish a documented processing history from the truth of an image claim.

**Archive placement:** Image: provenance audit. Reuse the image family, week 6 inference limits and week 10 claim evaluation. Deposit an audit used by week 12; do not attempt to rerun every previous medium.

## 2. Weekly teaching brief

Use week 11 dates from the [teaching index](../course-plan.md#6-twelve-dated-teaching-weeks)
and the agreed [clock timetable](../course-plan.md#4-timetable-and-vocabulary).

- Question: What does a provenance record establish, and what can it omit?
- Target: distinguish recorded history, missing history and truth of a claim.
- Activity: inspect week 4's image copies with supplied metadata manifests before
  and after a documented stripping operation. Compare records with the known
  processing log. A manifest example is not labelled a verified signature.
- Output: provenance audit and proposed archive policy, connected to week 6's
  inference limits and week 10's unsupported restoration details.
- Check: distinguish a missing record from evidence that an image is false;
  explain one way circular sourcing weakens a provenance claim.
- Candidate reading: a pinned version/section of the C2PA specification or threat
  model, verified before use. Circular sourcing is optional context.
- Accessible route: plain-text manifests. Assessment link: peer review the A3
  preservation scope, assumptions and costing.

## 3. How the lecture and workshop run

### Monday lecture — 60 minutes

Explain what the supplied provenance records assert and omit. Work through a missing-record example; use circular sourcing as limited optional context. A teaching manifest is not automatically a verified credential.

See the [shared lecture procedure](README.md#shared-teaching-and-page-procedure).

### Wednesday workshop — 120 minutes

**Investigation (40 minutes):** Compare supplied before/after manifests with known logs (15 minutes); identify retained, missing and conflicting evidence (15); propose one proportionate archive-policy improvement (10).

Use the workshop stages and quiz rubric from the
[shared procedure](README.md#shared-teaching-and-page-procedure).

## 4. Resources and accessible participation

**Required deliverable:** Week 4 image record, short before/after provenance excerpts, corresponding log and audit worksheet.

**Optional after core acceptance:** Signing infrastructure or other media channels.

Apply the [shared resource rules](README.md#shared-resources-and-scope).
Use the accessible route in §2; readings remain candidates until verified.

## 5. Assessment connection

Peer-review A3 scope and cost assumptions using a short checklist. Recheck existing policies for consistency; they must already be complete before this phase.

Canonical assessment contracts and deadlines: [course-plan §7](../course-plan.md#7-assessments-and-marking).

## 6. What this phase builds

| File or resource | Required result |
|---|---|
| `src/content/sessions/11-custody.md` | Week 11 workshop with actual Wednesday date, question, timed task, resources, output, check and feedback |
| `src/content/lectures/week-11.md` | Monday lecture with the learning target, worked explanation, reading locator and workshop link |
| Archive page and this family's example assets | Source/scenario, operations, expected deposit and accessible on-page evidence; files where required |
| Relevant existing assessment/policy links | Accurate connection to the contracts created in Phase 0 |

Suggested `related:` references: `lectures/week-11, sessions/04-poor-image, sessions/06-stemma, sessions/10-enhance, assessments/the-lossless-argument`. These are pedagogical
links, not ancestry edges. Only use references whose targets exist in the completed
skeleton. Ordinary archive links must respect the repository base path. Keep
`week: 11` and the dates in §2 consistent across the rendered page and course data.

No artwork generation is tied to week number. Use an informative specimen image
where it helps; follow the shared modest artwork scope or choose no decorative
image. Preserve the fixed platform and required collection keys.

## 7. Acceptance and evidence

Apply the [shared verification procedure](README.md#verification-and-completion).
The following gates add checks specific to this activity.

### Human acceptance gates

- [ ] Verify which metadata fields actually survive the chosen transformation; do not declare every missing record evidence of falsity.
- [ ] Clearly label demonstration manifests and distinguish them from cryptographically verified signatures.
- [ ] Complete the audit using plain-text evidence and confirm a missing field does not silently become a claim of unrecoverable history.

Apply the shared resource-floor, timing, browser and cold-reader checks.

### Decision to examine, not a prewritten process story

Why a bounded manifest audit replaced a broad survey and rerunning every copying channel.

Record the real decision and observed checks in docs/decision-log.md using
[the shared rehearsal procedure](README.md#required-rehearsal-before-expansion).
