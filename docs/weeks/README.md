# Weekly phases — Generation Loss

**Status: implementation plans, not evidence that the course has been built or
validated.** Aligned with the revised master plan, including the distinct skills
in weeks 2–4. The purpose is a coherent student experience and traceable judgement;
no checklist guarantees an HD or 90%.

## Authority and use

1. [Assignment brief](../assignment-brief.md) and its linked published requirements
   determine the submission contract.
2. [Course plan](../course-plan.md) owns course identity, learning outcomes,
   timetable, assessments, policies, archive structure and scope decisions.
3. [Repository README](../../README.md), [content schema](../../src/content.config.ts)
   and [spec guidance](../../spec/README.md) govern implementation conventions.
4. Weekly files own detailed teaching, implementation tasks, resources and
   acceptance checks. This README owns shared procedures and delivery. If a
   phase needs a material change, reconcile the master plan and affected phases
   together; do not silently amend an obsolete section number.

Read the relevant master-plan sections before implementation: §2–5 for identity
and resources, §6 for weeks, §7–8 for assessments and policies, §10–12 for scope
and verification, and §13–16 for process and delivery.

Teaching order is not mandatory build order. On a future build instruction, start
with the home page, weeks 5–6 and their necessary dependencies, including the
separate A2 pack. Rehearse that work before expanding to weeks 2–4 and the rest.
Draft dependent pages together where useful. Each finished page
must make sense when opened independently; links provide context without making
another page compulsory reading merely to understand the task.

## Shared course contract

> **When copies change, what disappears—and what can those changes reveal about
> their history?**

- Course code `SLOP8350`, level 8; preserve assigned suffix `350` and the platform.
- Use **Workshops** for `sessions`; “generation” means a copying step, not a week.
- Use the agreed clock times, teaching dates and stage durations in
  [course-plan §4](../course-plan.md#4-timetable-and-vocabulary).
- A laptop and supplied files suffice. Physical equipment, programming, paid tools,
  cloud compute and external accounts must not be required for core participation.
- The **Class Copy Archive** contains recurring print/audio/image collections
  and Sequence model, Bits and Distribution model studies. Use the exact
  mapping in course-plan §5. Shared learning links are not parent-child edges.
- Known and inferred ancestry are labelled separately; unresolved conclusions are
  valid when supported. No universal-loss claim, unique-origin promise or universal
  biological threshold is used to force the evidence into a predetermined result.
- The website shows labelled instructor examples and fictional course arrangements,
  not fabricated student work, real enrolment or secure submission facilities.

## Phase 0 — shared foundations

The timetable, timestamp values, ownership and resource floor are now decided.
The implementation work below remains pending until building is authorised.
Complete these foundations before treating the whole site as accepted; supporting
pages may be developed alongside the first home/week 5–6 prototype.
Stubs are useful internally but are not finished student-facing content.

| Work | Concrete deliverable | Acceptance |
|---|---|---|
| Inspect baseline | Active runtime, repository conventions, existing schema/spec and available routes | Actual findings recorded; use Node 24 and pnpm 11.9.0 from `mise.toml` |
| Record and navigation | `src/course-config.ts`, workshop labels, home and navigation skeleton | SLOP suffix preserved; question, audience, tools, workload and course dates discoverable |
| Teaching skeleton | Twelve lecture/workshop pairs with dates from the master index and stable slugs from weekly phase files | References resolve; Monday/Wednesday and break contracts are explicit |
| Assessments | All four complete briefs from master-plan §7 | Weights total 100; A1–A3 use agreed weighted criteria; release versus introduction is clear |
| Policies and people | Complete policies and the fictional teaching team | Resources/access routes and submissions are explained; no invented real credentials or dead LMS button |
| Resource scope | Required deliverables in each phase §4, following the master-plan resource floor | Weeks 5–6 receive full text packs; other weeks use compact, usable on-page exercises; optional variants wait |
| Archive | Ordinary `src/pages/archive/` page with separate family sections and stable page anchors | Sources/scenarios, operations, known/inferred links and accessibility fields defined; files added only where needed |
| Harness | Apply the adopted rules in `CLAUDE.md` | Record later changes only when a real decision or observation justifies them |
| Verification | Small set of course-specific checks with clear reasons | Contracts reflect the course rather than titles or arbitrary artwork effects |
| Evidence | Actual decision/source review records as work occurs | No predetermined failures, fake review results or invented commit hashes |
| Reference review | Inspect a small selection of the brief's example courses | Record one specific teaching/design practice adopted or rejected, with source and reason |

The four briefs are visible at course opening. Later phases introduce teaching
support or a dataset; they do not postpone authoring basic assessment information.
A2's curated pack is independent of peer A1 work. Prototype it with week 6 early.

A declaration of twelve stubs may satisfy a structural count but does not satisfy
course completeness. Do not treat structural green checks as acceptance of prose,
resources or activities. Draft staging must be understood in the production build.

## Weekly index and assessment schedule

Use the dated [weekly index](../course-plan.md#6-twelve-dated-teaching-weeks),
[clock timetable](../course-plan.md#4-timetable-and-vocabulary) and
[canonical assessment timestamps](../course-plan.md#canonical-deadline-timestamps).
These values have one owner. Weekly files refer to them rather than choosing
independent clocks or due times. The A4 field records final-check completion;
it must not appear as a separate final submission deadline.

## Shared resources and scope

Build a small reference archive linking directly to the examples on weekly pages;
do not duplicate every evidence table or create a separate download for each one.
Weeks 5–6 share a six-witness editable practice pack, plus a separate nine-witness
A2 pack and the required deck. Weeks 2–4 use small working examples of their
distinct tasks. Remaining weeks use one compact dataset, comparison or worksheet
with feedback. Every phase §4 specifies its required deliverable and optional extras.

On-page content must support actually attempting the task. Do not replace a
required example with prose promising a future experiment. Rehearse the small
exercise, including discussion and revision, to check the two-hour workshop is
credible. If it is too thin, improve the reasoning task before multiplying assets.

Record licences, creator/source, operations, settings, and known versus
inferred relationships where applicable. Label authored hypothetical tables;
retain methods for any measurements and model/settings for simulated results.
Do not show parent identities in the evidence table for an ancestry quiz: put
them in a labelled answer reveal. Keep accessible evidence equally informative.
Use authored/licensed material; keep private recordings,
identifying student data and secrets out of public files and history.

No decorative twelve-image chain is required. A few labelled transformations
plus an exact-copy control may illustrate the question more accurately. Replace
or deliberately remove all starter imagery and its references. If generated
artwork helps, document its provenance and separate it from experimental evidence.
A custom collection is optional only after the core site is complete and there
is a demonstrated maintenance benefit; do not build a backend or a student LMS.

The required deck belongs to week 6. The inspected template supports `slides:`
and renders its link with base-path handling. Verify the actual rendered result;
no field alone proves a working student journey. Keep the deck's accessible
walkthrough and inspect every slide at both viewports.

## Verification and completion

### Shared teaching and page procedure

Use the lecture hour for the question (10 minutes), concepts (15), worked
example (20), a limitation/alternative (10), and preparation (5). Each weekly
file provides its own lecture emphasis and investigation. Workshop stage timings
belong to course-plan §4; do not paste generic timing explanations onto twelve pages.

The weekly check uses the rubric in course-plan §7. Provide an indicative answer
with feedback. Resource evidence, accessible equivalents and source records are
required by the relevant phase; an on-page table may meet several needs at once.
The shared acceptance procedure checks dates/links, usable evidence, source or
hypothetical status, assessment alignment, both viewports and keyboard access.
Weekly files add task-specific gates. A cold reader must find the question,
task, expected output and next use without reading all preceding weeks.

### Required rehearsal before expansion

This is a future procedure, not a completed trial. Use the actual rendered pages
and materials once implementation is authorised:

1. Open only the student-facing week 5 page and its materials.
2. Follow the activity exactly as written; time each part separately.
3. Create or inspect the editable witnesses and their line IDs.
4. Record unclear wording, missing files and unintended answer hints.
5. Open week 6 with the source/production-log reveal closed.
6. Construct a candidate tree using only the supplied student evidence.
7. Identify a plausible alternative and an unresolved edge, stating assumptions.
8. Compare the accessible text/table representation with the other materials;
   check that it conveys the same evidence without revealing extra answers.
9. Open the controlled reveal, compare the inference with the production log,
   and identify unrealistic activity timings or unsupported conclusions.
10. Fix observed issues and repeat affected parts before expanding the site.

Record actual elapsed times, not the allotted durations. An agent author knows
the construction and cannot claim a blind learner trial or infer a student's
pace from its own speed. Label the result as an author consistency rehearsal;
identify any need for a fresh-reader review without inventing one. Keep the
production log separate from initial evidence. A public practice reveal is not
secure storage for a real graded answer key.

Record what was tested, what confused or failed, what changed, why the revision
is more defensible, remaining uncertainty and the commit hash once it exists in
`docs/decision-log.md`. The final `PROCESS.md` draws on this record.

Use the configured runtime. After a coherent implementation increment:

```sh
mise exec -- pnpm check
mise exec -- pnpm check:evidence
```

Inspect every result. The second command can legitimately expose remaining
starter/process work during implementation; record those failures explicitly
and resolve them before submission. Do not claim they can only come from later
weeks: missing process evidence is a separate possible failure.

Inspect phase files for remaining starter fragments with `rg -n STARTER_CONTENT src`
and verify replacement visually. Do not remove markers while leaving placeholder
content, weaken final assertions or silently skip the sum-to-100 contract.

### Mechanical responsibilities

The build owns compilation, automated accessibility, internal links, content refs
and API generation. The existing schema already checks that a declared weighted
rubric totals 100; the baseline spec checks dates inside the course period.
Course-specific checks should add what these cannot establish:

- Exactly twelve lecture/workshop pairs, correct weekdays, paired dates and the
  two-week interval after week 6. A two-day offset alone does not prove weekdays.
- Four assessment weights total 100; A1–A3 use the agreed marking model and
  criteria; A2 release and A3 timing respect the teaching dependencies.
- Archive relationship integrity if structured records are implemented: IDs,
  valid same-family known parents and no cycles; multiple families have multiple roots.
- Published source IDs refer to reviewed records if such records are implemented.
  A working identifier is not proof of source support.
- Check best-ten calculation edge cases only if implementing calculation logic.
  Do not build a grader solely to add a test.

Tests may be written before or after content; demonstrate that important checks
reject invalid fixtures without presenting that exercise as an accidental failure.
If a test encodes a mistaken requirement, correct it with a reason recorded.

### Human responsibilities

Each phase specifies a concrete rehearsal gate. Run it and record what happened.
Review source claims, task timing, equivalent access and student-facing clarity.
Verify the published specimens rather than accepting plausible task descriptions.

For weeks 2–4, inspect the three actual submissions: an evidence table, a controlled
protocol and an ambiguity report. If the same reasoning with swapped media names
completes all three, revise them. For weeks 7 and 9, distinguish ancestry agreement
from category retention; both need declared conditions but answer different questions.

For process evidence, record the problem, alternatives, choice, actual verification,
limitations and relevant commit when available. Do not prewrite the student's
first-person `PROCESS.md`. The student uses genuine records to explain why decisions
beat alternatives and how results were accepted; tests and commits do not supply
that judgement automatically.

## Integration, release and final review

This section owns the delivery procedure. All build, rehearsal and release work
remains pending a subsequent build instruction. The deadline is fixed; dates
below are targets, not demonstrated estimates of how long implementation takes.

1. **First build:** home page, week 5 branching text activity, week 6 reconstruction
   practice and deck, and a separate nine-witness A2 pack. Create necessary
   navigation/policy/assessment dependencies. The home page's first screen must
   communicate topic, audience, investigations, arc and navigation concisely;
   test that at both viewports rather than assuming it fits.
2. **Rehearse before expanding:** use the procedure above and fix the observed
   issues. Then verify the distinction across weeks 2–4 and expand to other weeks.
   All assessment briefs must be complete by course-site acceptance.
3. **Complete the core:** finish twelve teaching pairs, four briefs, policies,
   people, on-page archive examples, required text packs, source review and week 6 deck. Remove unfinished drafts
   and placeholders from the intended submission; every required week must remain.
4. **Target deployment Friday 18 September 2026:** use the supported repository workflow
   after local gates and public-file review. Inspect tooling if a named skill is
   unavailable. Confirm the actual Pages URL, latest content and repository base path.
5. **Target review Saturday 19 September:** test the home page, non-adjacent weeks,
   assessment, archive, policies and every deck slide at **1920×1080** and **390×844**
   in Chrome. Include keyboard navigation, resizing mid-interaction and a slow
   connection. Inspect meaningful downloads, feedback reveals and image/table layout.
6. **Process account:** the student writes a 400–600-word narrative from actual
   decisions, with real commit/compare links. Review it on GitHub, including images
   and citations. `check:evidence` does not certify its intellectual quality.
7. **Reserve Sunday 20 September:** fix observed issues and verify final deployment;
   add no optional feature that threatens acceptance or submission.
8. **Submit before Monday 21 September, noon Canberra time:** confirm public URL,
   source and process evidence. A push or HTTP 200 alone does not establish success.

**Final gate:** run both required commands on final content; finish the master-plan
§16 checklist; ensure no missing archive resources, unresolved teaching citations,
misleading controls or broken paths. Record unverified work honestly and complete it.
This planning update does not itself perform deployment or prove an HD-level artefact.
