# SLOP8350 — Generation Loss

**Revised course and delivery plan for COMP4020 / COMP8020 Assignment 2.**
Updated 15 September 2026 following review against the assignment brief.
This is a plan, not a record of completed implementation or verification.
Course decisions live here; the [weekly phase plans](weeks/README.md) own their
detailed teaching, implementation tasks, resources and acceptance checks.

### Document ownership

| Content | Single owner |
|---|---|
| Course identity, learning outcomes, timetable, assessments and policies | `docs/course-plan.md` |
| Weekly teaching, implementation tasks, resources and acceptance checks | `docs/weeks/week-01.md` through `week-12.md` |
| Shared phase rules, build order and delivery checklist | `docs/weeks/README.md` |
| Agent instructions | `CLAUDE.md` |
| Real decisions and verification results | `docs/decision-log.md` |
| Final student-written evidence narrative | `PROCESS.md` |

Update a course decision here first, then update affected consumers. Shared
instructions are referenced rather than copied into all twelve phases.
This plan distinguishes proposed work from observed implementation and rehearsal
results. Update those statuses only when the work has actually been completed.

## 1. Purpose, evidence and priorities

Build a convincing student-facing course about investigating copies through
what changes between them. Optimise for coherence, clear student decisions and
traceable judgement. No plan can guarantee an HD; the submitted site and actual
process must provide the evidence.

### Requirements and sources

Use [the local brief](assignment-brief.md) alongside the
[published assignment](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/assessments/assignment-2/)
(checked 15 September 2026). The published page is authoritative. Platform
constraints come from [README.md](../README.md); verification behaviour comes
from [spec/README.md](../spec/README.md), [package.json](../package.json) and
[scripts/check-evidence.ts](../scripts/check-evidence.ts), inspected for this
revision.

The brief weights process at 45%, deployed functionality at 20%, and response
to the brief at 35%. Submit a live GitHub Pages site, its source and genuine
process evidence by **Monday 21 September 2026, noon Canberra time**. Preserve
SlopU branding, the fixed platform and assigned code suffix; provide twelve
dated teaching weeks, assessment totalling 100%, a linked lecture deck and
course-specific checks. The final process narrative must be the student's own
400–600-word account with commit citations.

### What is known versus proposed

- **Confirmed locally:** assigned suffix `350`; Astro template; four required
  collection keys; Node 24 and pnpm 11.9.0 in `mise.toml`; existing `sharp`
  dependency; baseline test for dates inside the course period.
- **Proposed course decisions:** postgraduate level, fictional 2027 timetable,
  workshop format, assessment design and specimen archive below. These are not
  claims about ANU's actual 2027 teaching calendar.
- **Verification still required:** academic sources and the exact claims they
  support, activity feasibility, implementation, public deployment and browser
  behaviour. Reading candidates below have not been verified by this revision.
- **Browser acceptance targets:** 1920×1080 and 390×844, retained from the
  earlier plan; reconfirm against the linked marking-environment page before
  final browser review.

### Priorities by criterion

| Criterion | Evidence to produce | Acceptance question |
|---|---|---|
| Process, 45% | Genuine decisions, relevant harness rules, useful checks, review results and supporting commits | Can the student explain why an approach was chosen and what justified accepting it? |
| Functionality, 20% | Public deployment, passing gates, usable navigation and deck at both viewports | Can a prospective student complete the important journeys without a broken link or unreadable content? |
| Brief response, 35% | Specific question, progressive activities, aligned assessments, distinctive examples | Do independently opened weeks feel like parts of one worthwhile course? |

Spend effort on these outcomes before optional collections, interactive graphs,
extra illustrations or a visual redesign.

## 2. Course identity and central question

> **When copies change, what disappears—and what can those changes reveal about
> their history?**

The course investigates copying, evidence and uncertainty. It does not promise
that every copy deteriorates or that every original can be recovered.

### Homepage point of view

Lead with the counterexample: **generation loss is not inevitable**. The first
workshop places a changed photocopy beside an exact digital copy that is
byte-for-byte identical to its source. That apparent refusal of the course title
sets up the semester's real question: which processes change a copy, which clues
those changes leave, and when those clues justify an inference about history.
Scribal errors, MP3 psychoacoustics and recursive resampling are then presented
as different tests of that method, with their limits stated, rather than as one
universal mechanism. Arrange the first-screen topic, audience, arc and navigation
around this point of view.

Proposed `src/course-config.ts` values:

| Field | Value |
|---|---|
| code | `SLOP8350` |
| level | `8` |
| title | `Generation Loss` |
| session | `Semester 1` |
| year | `2027` |
| startDate | `2027-02-22` |
| endDate | `2027-06-07` |
| tags | `media archaeology`, `provenance`, `information` |

Agreed description, within the required 80–300 characters:

> Copies leave clues. In this course, you will investigate what changes when
> recordings, images and texts are copied, reconstruct possible histories from
> incomplete evidence, and decide what is worth preserving.

Level 8 reflects the emphasis on independent investigation, critical reading
and defending uncertain conclusions. It does not earn extra assignment marks,
and the subject could also be adapted for undergraduates.

### Why someone would take it

For students interested in archives, media and evidence: learn to explain what
changed in a copied object, how much its history can be reconstructed, and which
preservation claims deserve trust. The appeal is handling specimens and making
a case from evidence, rather than surveying six disciplines.

### Boundaries that keep it niche

Every week must help students answer the central question using a specimen or
a decision about the archive. Historical context supports the investigation;
it does not become a general history of media. Biology is a limited comparison
through a declared toy model. Recursive model training occupies week 9 only;
week 10 may use a prepared restoration example without becoming another model
training lesson. No general course on prompting or agentic software development.

Do not argue that universities are incapable of teaching it. Explain its narrow
focus and unusual combination of methods. Keep assessment strategy and talk of
HD marks out of the fictional course website.

### Intellectual guardrails

- Distinguish exact digital copying from lossy transformation and re-encoding.
- Treat shared errors as evidence for ancestry under stated assumptions, not
  proof. Allow independent errors, missing intermediates and multiple sources.
- Separate facts retained from an original, traces introduced by processing,
  and an investigator's inference about those traces.
- Do not equate biological mutation, compression and model training. State what
  each comparison illustrates and where it breaks down.
- Treat model collapse as conditional; specify the training setup and controls.
- Separate visual plausibility from demonstrated recovery. Define the property
  being measured instead of saying that a bigger image simply “contains less.”
- Permit inconclusive findings. Students must not invent certainty to satisfy
  a rubric or force a specimen to match the course's title.

## 3. Learning outcomes and student workload

On completion, students should be able to:

| Outcome | Demonstration | Assessed in |
|---|---|---|
| LO1: Characterise changes caused by a copying process using reproducible measurements and controls | Documented chain, settings, measurements and limitations | The Chain |
| LO2: Construct and compare plausible copying histories, marking unresolved relationships | Evidence table, proposed tree and alternative explanation | The Stemma |
| LO3: Evaluate whether a feature supports a provenance claim or has another explanation | Diagnostic reasoning, counterexamples and uncertainty | The Stemma; Generation Checks |
| LO4: Evaluate a restoration or preservation claim against the available evidence | Separate recoverable information from unsupported inference | Generation Checks; The Lossless Argument |
| LO5: Defend a preservation decision with explicit costs, assumptions and tradeoffs | Bounded proposal and sensitivity analysis | The Lossless Argument |

**Audience and preparation:** postgraduate students comfortable reading an
argument, using files and a spreadsheet. No prior Latin, virology, programming
or information theory required. Provide a short primer on each unfamiliar term
and worked numerical examples. Optional code must never be required for a pass.

**Weekly workload:** one-hour Monday lecture, two-hour Wednesday workshop,
about two hours of preparation and three hours of independent assessment work:
approximately eight hours per teaching week. Final-project work continues after
week 12. Pilot activities against these estimates before publication.

**Resources:** a laptop and the material on the course pages are sufficient.
Provide compact evidence tables, images, text witnesses and worked examples.
Downloads are required for the weeks 5–6 text reconstruction pack; elsewhere
add them only when needed to complete the task. Physical photocopiers, cassette
equipment and optional software demonstrations are extensions. No paid tools,
cloud GPU, external account or upload of personal material is required.

### Required resource scope

Every week must offer an exercise a reader can attempt: supplied evidence,
precise instructions, a defined output, an indicative answer and an accessible
way to inspect the evidence. A description of a future activity does not meet
this requirement. A compact exercise supports the full workshop through individual
work, comparing explanations, revising conclusions and discussion; do not pad a
five-minute question into a nominal two-hour task.

Resource policy: full reconstruction materials for weeks 5–6; small working
examples for weeks 2–4; compact on-page exercises elsewhere. Exact required
items and optional extras belong to each [weekly phase](weeks/README.md).

Reuse source text and image examples across dependent weeks. An on-page evidence
table can itself be the accessible route; a duplicate file is unnecessary.
Clearly label authored hypothetical values. Empirical claims require actual
measurements and a retained method; simulation claims require model parameters
and reproducible results. Do not invent measured results to save preparation time.
In inference tasks, keep parent identities and route answers in the labelled
feedback reveal, outside the initial evidence. A public reveal is practice feedback,
not secure exam storage.

Agree this floor in Phase 0, then build and rehearse one example before expanding.
If a minimal activity still exceeds the available time, simplify its claim and
task together across this plan and its weekly phase. No required week becomes
an unimplemented promise. Additional variants are built only after core acceptance.

## 4. Timetable and vocabulary

Use **Workshops** as the student-facing label for `sessions`. Reserve
“generation” for an actual copying step. A teaching week number is not a
specimen's generation number.

Keep `sessions`, `lectures`, `assessments` and `people` as the collection keys.
Use the existing `sessionLabels` configuration for the displayed terminology.
All clock times are Canberra local time:

| Event | Day | Time |
|---|---|---|
| Lecture | Monday | 10:00–11:00 |
| Workshop | Wednesday | 12:00–14:00 |
| Generation Check | Wednesday, inside the workshop | 12:00–12:05 |

Lecture and workshop content dates remain bare `YYYY-MM-DD` values. Use
timestamps for assessment deadlines, with the offsets in §7. Local midnight
with an offset can serialize to the previous UTC day; do not attach a midnight
offset to teaching dates. The existing date-range check slices the serialized
API date. The assessment display must show the clock time and Canberra timezone,
not just the date. This is an implementation requirement, not a completed fix.

### Standard workshop structure: 120 minutes

1. **Check — 5 minutes:** individual response to supplied evidence.
2. **Receive — 15 minutes:** question, specimen, prior connection and terms.
3. **Investigate — 40 minutes:** copy, compare, reconstruct or debate as needed.
4. **Evaluate — 30 minutes:** measurement or evidence table with limitations.
5. **Deposit — 30 minutes:** add a result to the archive and discuss its meaning.

This format permits reconstruction and debate weeks without pretending that
every activity involves a new copying channel. The quiz uses prepared evidence;
it never requires completing the experiment in five minutes.

## 5. The shared spine: Class Copy Archive

Create an archive containing **several specimen families**, each with its own
source. A recording is not a descendant of a typed page merely because students
studied them in consecutive weeks.

| Collection or model study | Used in weeks | What it represents |
|---|---|---|
| Print | 1, 5, 6 | Print degradation and text-copying evidence |
| Audio | 2, 3 | Inherited recording features and controlled compression tests |
| Image | 4, 10, 11 | Ambiguous histories, restoration and provenance records |
| Sequence model | 7 | A simplified ancestry simulation |
| Bits | 8 | Error correction and redundancy costs |
| Distribution model | 9 | A simplified recursive-sampling comparison |

Present print, audio and image as recurring specimen collections; present the
remaining entries as model studies. Only create parent-child relationships
inside one family. Between collections and studies use explicit comparison
links: “Week 7 compares the limits of ancestry inference with week 6's text
reconstruction.” A sequence is not descended from a manuscript.

Every result in weeks 7 and 9 must be labelled **simplified model** and name
what the model leaves out. Week 7 omits biological selection and population
structure; week 9 is categorical resampling rather than trained language-model
behaviour. Reuse is sometimes methodological rather than literal ancestry.

Week 12 compares the archive's preservation options. Relationships across
families are labelled **comparisons**, never parent-child edges.

Each published specimen record includes an ID, family, source/creator and
rights, a page anchor or filename, operation/settings, measurements with units, accessibility
alternative, and related teaching weeks. Record known parents separately from
inferred parents. Inferred edges carry evidence and uncertainty. A simple
controlled family may have one source; the entire archive has several.

**Required implementation:** an ordinary archive page with family sections,
small static diagrams and on-page evidence tables, with downloadable text packs
for weeks 5–6. Other downloads are optional when the page contains the needed evidence. Weekly
pages link to the relevant section and name a concrete earlier idea or specimen.
A static reference archive is sufficient; do not build student accounts,
submission storage or a live class collaboration backend.

The hypothetical class adds work during teaching. The submitted website shows
clearly labelled instructor examples, not fabricated student contributions.
Each week states the expected student deposit, its format and what later uses it.

## 6. Twelve dated teaching weeks

This index owns the teaching dates. Each linked phase owns its detailed teaching
brief, resources and acceptance checks. Common class timing is in §4; shared
phase instructions are in [the phase README](weeks/README.md).

| Week | Lecture | Workshop | Distinct capability and product | Phase |
|---|---|---|---|---|
| 1 | 2027-02-22 | 2027-02-24 | Reproducible measurement: character-error table and control | [Week 1](weeks/week-01.md) |
| 2 | 2027-03-01 | 2027-03-03 | Inherited evidence: feature-to-relationship table | [Week 2](weeks/week-02.md) |
| 3 | 2027-03-08 | 2027-03-10 | Causal testing: controlled protocol and results | [Week 3](weeks/week-03.md) |
| 4 | 2027-03-15 | 2027-03-17 | Limits of inference: compatible histories and evidence request | [Week 4](weeks/week-04.md) |
| 5 | 2027-03-22 | 2027-03-24 | Error classification: branching text witnesses | [Week 5](weeks/week-05.md) |
| 6 | 2027-03-29 | 2027-03-31 | Reconstruction: partial tree, alternative and reveal commentary | [Week 6](weeks/week-06.md) |
| Break | — | Week commencing 2027-04-05 | No lecture, workshop or weekly check | — |
| 7 | 2027-04-12 | 2027-04-14 | Model limits: ancestry-agreement plot and limitations | [Week 7](weeks/week-07.md) |
| 8 | 2027-04-19 | 2027-04-21 | Bounded protection: correction cases and overhead table | [Week 8](weeks/week-08.md) |
| 9 | 2027-04-26 | 2027-04-28 | Conditional claims: controlled rare-category retention comparison | [Week 9](weeks/week-09.md) |
| 10 | 2027-05-03 | 2027-05-05 | Restoration evaluation: supported/unsupported/uncertain feature table | [Week 10](weeks/week-10.md) |
| 11 | 2027-05-10 | 2027-05-12 | Provenance audit: records, omissions and policy proposal | [Week 11](weeks/week-11.md) |
| 12 | 2027-05-17 | 2027-05-19 | Preservation choice: budgeted memo and response to an objection | [Week 12](weeks/week-12.md) |

Weeks 2–4 progress from inherited evidence to controlled experiments to ambiguous
histories. Weeks 5–6 develop classification and reconstruction. Later weeks test
limits, protection, restoration, provenance and preservation choices.

The last workshop is 19 May; the course record ends on 7 June to include the
final assessment. These are distinct dates with distinct meanings.

## 7. Assessments and marking

All four briefs are visible at course opening. “Introduced” means formal
teaching support begins; a later dataset release is stated separately. Every
brief includes deliverables, due time and timezone, workload estimate, outcomes,
marking criteria, resource links, an example and the relevant policy link.

| Assessment | Weight | Introduced | Due | Expected effort |
|---|---|---|---|---|
| A1 The Chain | 20% | Week 1 | 2027-03-26, 12:00 | 8–10 hours |
| A2 The Stemma | 30% | Week 6; pack released 2027-03-31 | 2027-04-30, 12:00 | 10–12 hours |
| A3 The Lossless Argument | 40% | Week 8 | 2027-06-07, 12:00 | 16–20 hours |
| A4 Generation Checks | 10% | Week 1 | First five minutes of each Wednesday workshop | 12 × 5 minutes |

All times are Canberra local time. Assessment weights total 100%. Effort is
included in the independent-work allocation, not added on top of it.

### Canonical deadline timestamps

| Assessment | Timestamp | Meaning |
|---|---|---|
| A1 | `2027-03-26T12:00:00+11:00` | Noon submission deadline |
| A2 | `2027-04-30T12:00:00+10:00` | Noon submission deadline |
| A3 | `2027-06-07T12:00:00+10:00` | Noon submission deadline |
| A4 | `2027-05-19T12:05:00+10:00` | End of the final weekly check; series completion |

A4 is a weekly series, not a separate final submission. Its page must explain
that meaning beside the completion date. A2's pack becomes available when the
week 6 workshop ends, Wednesday 31 March at 14:00 Canberra local time; the brief
is available from course opening. The release rule is prose, not a timestamp
substituted for a lecture or workshop date.

### A1 — The Chain (20%; LO1)

Investigate one artefact through ten documented copying/transformation steps.
Keep the original and include a suitable control. A class method is allowed if
students pose their own parameter comparison or question; do not force them to
invent a new technology or acquire equipment.

Submit the original and ten outputs, settings log, measurement table, a
prediction recorded before the experiment, and a 600-word analysis. A finding
of no measurable change is valid. The prediction is a timestamped short
formative submission through the hypothetical course LMS; the public website
only explains that mechanism and does not collect submissions.

| Criterion | Weight within A1 | Strong performance |
|---|---|---|
| Reproducibility | 35% | Files, settings and method allow another person to repeat the comparison |
| Measurement and controls | 30% | Measures suit the question; control isolates a relevant explanation |
| Evidence interpretation | 25% | Conclusions follow the data, including uncertainty or a null result |
| Prediction and reflection | 10% | Compares a recorded expectation with the result without rewriting it |

Pilot a supplied image-copy option to establish that ten steps fit the effort
budget. Award no premium for expensive equipment or dramatic degradation.

### A2 — The Stemma (30%; LO2–LO3)

Provide an instructor-curated pack of **five to nine text witnesses** from one
documented source family, with informative branching errors and at least one
ambiguity. Before fixing the final count, construct one witness and record the
time required, then use the smallest pack that still supports a branching tree,
a plausible competing explanation and an unresolved edge. The pack
includes witness IDs, line numbers, a glossary and a worked example from a
separate family. Its true source and production log are retained for feedback.

Submit a proposed family tree or partial graph, an evidence table for each
inferred edge, a supported partial archetype with gaps explicitly marked, and
a 600-word argument comparing the strongest alternative. “Cannot resolve this
edge” can earn full credit if the evidence supports that conclusion.

| Criterion | Weight within A2 | Strong performance |
|---|---|---|
| Evidence for relationships | 35% | Specific shared features support edges under explicit assumptions |
| Reconstruction within evidence limits | 20% | Reconstructs supported portions and marks unknown portions |
| Competing explanation | 25% | Tests a plausible alternative, including independent error or contamination |
| Confidence and limitations | 20% | Separates observed facts from inference and explains unresolved cases |

Pilot the pack before release: demonstrate some informative edges and at least
one defensible uncertainty. Grade reasoning against the pack's evidence, not
similarity to a hidden answer. Release the true log and commentary after the
assessment closes; feedback is part of learning. Peer A1 submissions may supply
optional discussion material with permission but are not required inputs.

For the static course prototype, provide a clearly labelled demonstration pack
and a practice solution. Hidden HTML, collapsed answers or repository files are
not secure storage for a real exam answer key.

### A3 — The Lossless Argument (40%; LO4–LO5)

Propose a preservation decision for one bounded object or collection. Submit a
2,500-word argument, a costing table or spreadsheet, and a source list. Specify
what “preserved” means: exact bits, legible text, audible content, documented
provenance or another testable property. A justified decision not to preserve
something is allowed.

Required elements: scope and time horizon; comparison with an alternative;
evaluation of at least one restoration or preservation claim using course
evidence; storage/labour/redundancy assumptions where applicable; and a simple
sensitivity analysis showing what changes when a major assumption changes.
Label fictional budget rates and distinguish them from sourced real estimates.

| Criterion | Weight within A3 | Strong performance |
|---|---|---|
| Scope and defensible position | 20% | States the preservation property and makes a bounded decision |
| Evidence and claim evaluation | 25% | Tests a specific claim and separates recovery from unsupported inference |
| Costing and feasibility | 25% | Units, horizon and assumptions are explicit; calculations are coherent |
| Alternatives and tradeoffs | 20% | Engages a serious objection and tests sensitivity to an important assumption |
| Communication and source traceability | 10% | Clear structure, readable tables and sources that support the claims |

Across these criteria, a pass presents a coherent proposal with basic evidence
and costing; a strong response tests assumptions and compares credible options;
an excellent response makes uncertainty consequential to the decision. Do not
reward a dramatic position merely for sounding uncompromising.

### A4 — Generation Checks (10%; LO3–LO4)

Twelve five-minute responses; best ten count. Each earns 0–4 raw points:
2 for relevant evidence, 1 for a defensible interpretation and 1 for a material
limitation or alternative. Explain that a correct guess without evidence can
receive at most the interpretation point; an error in the final choice does not
erase valid reasoning. Publish an indicative answer and explanation after each
check. These are low-stakes practice, not secure exams on the static website.

Course contribution = sum of best ten raw scores ÷ 40 × 10 percentage points.
An uncompleted check scores zero before dropping the lowest two; approved
adjustments follow the policy below. Weeks 1–9 primarily develop LO3; weeks
10–12 also require LO4. Each actual prompt may differ while using the same rubric.

## 8. Policies, accessibility and trust

Publish concise fictional course policies that agree with all assessment pages:

- **Submission:** specify the hypothetical LMS and file formats (ZIP of safe
  media/text files plus PDF/Markdown; CSV/XLSX for tables). The public prototype
  supplies briefs and examples, with no dead upload button or invented login.
- **Extensions and feedback:** propose a consistent policy: request extensions
  through the fictional course contact; unapproved late A1–A3 work loses five
  percentage points of the available assessment mark per calendar day for up to
  seven days, then receives zero. Provide an accessible alternative check for
  approved absences beyond the two dropped checks. Return substantive feedback
  within ten working days. Label these as SlopU course policies, not ANU policy;
  they do not alter this assignment's real no-late-submission rule.
- **Academic integrity and AI:** disclose tools and transformations, retain
  originals and settings, and verify claims. Never fabricate data, sources or
  process records. AI assistance does not substitute for evidence-based reasoning.
- **Sources:** cite both the artefact and its source/processing route. Explain
  what is known, inferred and unknown. A URL resolving is not proof of a claim.
- **Corrections:** keep a short dated corrections section only when actual
  corrections exist; do not invent a history to make the site look mature.
- **Access:** every audio task has a non-listening route; every image/diagram
  task has an equivalent structured description; tables have headings and units;
  diagrams do not rely on colour alone. Offer written participation in debates.
- **Data and rights:** use authored, public-domain or appropriately licensed
  examples with attribution. No identifying student data, private recordings,
  secrets or unlicensed textbook extracts in the public repo. Do not run any
  uploaded executable. Examples and downloads must be safe static files.

Validate contrast, keyboard operation and reading order in the browser. Automated
accessibility scanning covers some defects, not learning equivalence or all
usability problems. Keep navigation and instructions legible even where example
artwork intentionally degrades.

## 9. People, voice and student navigation

Three fictional staff members may embody different priorities without presenting
unsupported claims as facts:

| Person | Role | Teaching contribution |
|---|---|---|
| Dr Wren Halloway | Convenor | Builds provenance arguments and insists on stating uncertainty |
| Tobias Renn | Workshop tutor | Tests preservation methods and challenges destructive experiments |
| Nadia Ostroff | Guest teacher, weeks 8 and 11 | Explains redundancy costs and the limits of provenance records |

Use short biographies linked to relevant teaching. Omit portraits if they add
little; remove unused starter portraits and their references. Do not invent
real-world credentials or working contact channels for fictional people.

Voice: plain, specific, curious and occasionally dry. Define “stemma” as a family
tree of copies on first use. Titles may be memorable, but every page needs a
literal one-sentence description. A distinctive voice comes from specimen choices
and judgements, not repeated slogans or rigid bans on sentence patterns.

Home must quickly answer: what is this course; who is it for; what will I do;
what preparation/tools do I need; when does it run; how am I assessed? Provide
clear routes to Weeks, Assessment, Archive and Policies. Use course configuration
as the source of shared record facts, following the template's guidance.

## 10. Page and implementation scope

Inspect actual routes, schemas and components before editing; preserve the
platform documented in README. Do not assume a proposed frontmatter field
renders a link—verify the rendered page.

| Deliverable | Planned location | Acceptance |
|---|---|---|
| Home and navigation | Existing home and site config | Central question, audience and clear entry routes |
| Twelve workshops | `src/content/sessions/` | Actual Wednesday dates, usable activities and archive links |
| Twelve lecture entries | `src/content/lectures/` | Monday dates, focused objectives and linked workshop |
| Four assessments | `src/content/assessments/` | Complete briefs and marking criteria |
| Course policies | Existing policies page | Concrete, consistent and discoverable |
| Teaching team | `src/content/people/` | Specific roles and related weeks |
| Copy Archive | New ordinary page under `src/pages/archive/` | Several families, examples, provenance and accessible diagrams |
| Week 6 deck | `src/decks/week-06.deck.mdx` | Worked reconstruction and explicit limitations |
| Required image replacement/removal | Existing asset references | No unused starter imagery or broken references |
| Error page | Existing 404 page | Useful recovery navigation; humour must not hide it |

Do not target an arbitrary page count. The collections generate the pages needed
by the course; concise lecture entries can point to detailed workshops without
copying their prose.

**Optional only after core acceptance:** a `specimens` collection if maintaining
archive relationships manually has become demonstrably error-prone. Multiple
roots across the archive are valid. Represent known and inferred relationships
separately; do not impose a universal one-parent schema on contamination examples.
No interactive graph, live quiz backend, enrolment system or cloud infrastructure
is needed for the core course.

## 11. Artwork and lecture deck

### A small, honest artwork system

Use one authored source image and a few documented transformations to demonstrate
one image family's history. A side-by-side exact-copy control communicates the
course better than claiming every image must degrade at every generation.

A deterministic script using the existing `sharp` dependency is an optional way
to reproduce the example, not a requirement for valuable process evidence. Keep
source, parameters, licensing and outputs traceable. Use three to five stages
unless twelve visibly teach something additional. Label operations and separate
artistic treatment from measured experimental results.

No test should claim universal monotonic degradation without a specified metric
and justified setup. If the site promises an exact-copy control, byte equality
is a useful check. Human review judges whether the comparison is informative.
A deliberate image-free design is allowed by the repository; remove starter
assets and references rather than retaining placeholders.

### Week 6 deck

The required deck belongs to week 6. Its detailed slide outline, accessible
walkthrough and lecture-link checks are owned by
[week 6’s phase plan](weeks/week-06.md#required-deck-and-assessment-pack).

## 12. Verification that protects real promises

The baseline build handles compilation, API generation, content references,
internal links and automated accessibility checks; the shipped spec checks dates
inside the course period. Inspect these before adding tests. No minimum number
of custom tests is required; add only checks justified by actual course promises.

Proposed tests should consume built course data or rendered output where
appropriate, following existing project conventions, rather than only checking
another hardcoded plan. Do not modify the fixed build pipeline.

| Candidate check | Contract and rationale | Limits |
|---|---|---|
| `assessment-contract.test.ts` | Four weights total 100%; A1–A3 use the agreed weighted marking model and criteria (the existing schema already validates criterion totals); A2 pack release follows the week 6 workshop and precedes its deadline; A3 follows weeks 10–12 | Does not establish pedagogical quality |
| `teaching-schedule.test.ts` | Exactly twelve numbered lecture/workshop pairs; Monday lecture and Wednesday workshop in each week; two-week gap after week 6; no check in the break; each workshop's five declared stages total 120 minutes and its investigation subtasks total 40 | Store or derive durations structurally; do not accept a keyword search as timing evidence |
| `weekly-contract.test.ts` | Every published workshop provides a structured accessible route, expected archive deposit and one declared archive collection/model study from §5 | Confirms presence and allowed classification, not equivalent access or pedagogical quality; inspect those manually |
| `assessment-contract.test.ts` rendered-link check | Every assessment brief links to the published policies page using a base-safe internal URL | Link existence does not establish that the policy is fair or clearly explained |
| `quiz-policy.test.ts`, if grading logic is implemented | Best ten of twelve, bounded raw scores, result on a 0–10 scale; all-zero, all-full and dropped-score cases | Do not build a grader just to create tests; otherwise verify the published formula manually |
| `archive-contract.test.ts`, if structured archive data is used | Unique IDs; known parents exist in the same family; no cycles among known ancestry edges; inference is explicitly labelled | No global one-root rule; cross-family comparison links remain allowed |
| `citations.test.ts`, if source records are implemented | Published source IDs map to records with identifier, locator and recorded verification | Human inspection must establish source existence and claim support |

Tests added before content can clarify intended contracts; tests added later can
still be valuable. Establish that important checks detect an invalid fixture or
a temporary deliberate mutation, then restore it. Record that as a test exercise,
not an accidental failure in the course design.

When a test fails, investigate both the requirement and implementation. If the
test encoded a mistaken assumption, revise it with the reason documented. Never
weaken a correct contract merely to get green output.

### Human acceptance review

- **Weeks 2–4 progression review:** inspect the actual packs, instructions and
  indicative answers together. Week 2 must assess selection of inherited evidence;
  week 3 must require designing or repairing a controlled experiment; week 4 must
  require two compatible histories and a justified evidence request. If the same
  answer structure completes all three after swapping media names, revise them.
  Rehearse each pack against its own before-publishing gate, including the
  non-listening/non-visual route. Record results; the gates are currently planned,
  not evidence that these examples have been validated.
- **Two-week review:** read weeks 2 and 10, then weeks 5 and 8. For each, identify
  what the student does, what evidence they produce and how it connects to the
  same question. Shared headings or different nouns do not prove coherence.
- **Task rehearsal:** complete the week 6 pack and one A1 example. Time the work,
  inspect ambiguity and confirm an accessible route produces equivalent evidence.
- **Assessment review:** follow every outcome to an assessed task; confirm the
  rubric rewards that task; check examples against their own marking statements.
- **Source review:** record title, author, identifier, section/page, supported
  claim, verification date and limitations. Prefer primary sources for technical
  claims. Use no invented or unresolved citations in published course content.
- **Ten-minute student review:** from home, find preparation, two separated
  weeks, an assessment deadline and rubric, the deck, archive and policies.
  Record concrete problems and subsequent changes rather than a blanket “looks good.”

## 13. Harness and authentic process evidence

Agent instructions are maintained in [CLAUDE.md](../CLAUDE.md). Shared phase
procedures belong to [the phase README](weeks/README.md); this section specifies
the evidence policy. Useful preventive rules are legitimate. Record later rule
changes with the actual observation or decision that justified them.

Do not turn every judgement into an automated check. Explain what human review
contributed and what remains uncertain.

### Record decisions as they happen

During implementation maintain concise notes, for example in
`docs/decision-log.md`, with:

- Date and concrete problem or choice.
- Alternatives and reason for the selected approach.
- What was checked, actual result and what remained uncertain.
- What changed in content, harness or checks.
- Relevant real commit hash/range once committed.

This revision supplies genuine decisions available for later discussion: replacing
a universal-loss slogan with an investigable question; using multiple specimen
families; removing dependence on peer data; and replacing cosmetic tests with
contracts. Their implementation and validation still need evidence. Do not claim
they improved the deployed site until they are implemented and reviewed.

Commit logical completed increments as work proceeds under the normal workflow.
Do not backdate, invent hashes, stage artificial mistakes as real incidents or
rearrange history to mimic a predetermined story. A large commit count is not a
substitute for meaningful decisions.

### Final PROCESS.md

The published brief requires the student's own account. The agent can organise
actual evidence and critique a draft, but the student should write and own the
400–600-word narrative. Do not prewrite first-person experiences for them.

Possible structure, selected from events that actually happen:

1. The position taken on what makes this particular course worth studying.
2. One consequential design decision and the alternative it displaced.
3. How that decision affected agent instructions or a check, with actual validation.
4. A limit of automation and how human review handled it.
5. A deliberate omission and its real tradeoff.

These are prompts, not mandatory five paragraphs or stories that must be produced.
Use real commit/compare links in the format shown by the starter. Explain what
those commits cannot explain by themselves: the judgement and acceptance evidence.
`check:evidence` checks traceability and starter removal; it does not establish
narrative quality, academic citation accuracy or the word count by itself.

## 14. Delivery sequence and scope control

The [phase README](weeks/README.md#integration-release-and-final-review) owns the
build sequence and delivery checklist. The next authorised implementation should
start with the home page and weeks 5–6, including the independent A2 pack, then
rehearse that work before expanding. The submission deadline remains noon on
Monday 21 September 2026. Calendar targets are planning targets, not verified
estimates that all listed work fits a day.

Do not report planned materials or validation as completed.

## 15. Risks and responses

| Risk | Observable warning | Response |
|---|---|---|
| Broad topic survey | A week has no concrete evidence task or connection | Narrow its question or remove background material |
| Overconfident science | Claims use “always”, assume a unique origin or ignore controls | Verify sources; state assumptions and add a counterexample |
| Unworkable assessment | Pack has no informative edges or relies on missing peer work | Curate and rehearse the instructor pack; support partial reconstruction |
| Student workload exceeds promise | Pilot needs extra tools, reading or setup | Supply prepared data and simplify the activity |
| Superficial tests | Test passes despite a plainly incoherent page | Replace proxy with a real contract or human review |
| Source-check overrun | Many readings lack claim-level verification | Reduce to one verified essential reading per week and useful original explanations |
| Excess implementation scope | Archive UI is blocking complete teaching pages | Keep ordinary pages and static diagrams; drop custom collection |
| Process narrative outruns evidence | Draft describes events absent from records | Remove unsupported claims; student writes from actual decisions |
| Mobile deck failure | Small labels, clipped tables or inaccessible controls | Simplify slides, add text equivalents and retest |
| Late deployment | Work only functions locally | Deploy complete core by Friday and verify actual Pages paths |

## 16. Final acceptance checklist

### Course quality

- [ ] Central question is specific and permits counterexamples and uncertainty.
- [ ] Twelve weeks advance it through distinct feasible activities.
- [ ] Weeks 2–4 produce an evidence table, a controlled protocol and an ambiguity
  report respectively; each specimen pack passes its rehearsed acceptance gate.
- [ ] Each page can be understood when opened independently.
- [ ] Archive families and actual parent relationships are coherent.
- [ ] Examples, downloads and accessible alternatives needed for core tasks exist.
- [ ] Assessment outcomes, deliverables, criteria, timing and policies agree.
- [ ] A2 supports informative inference and justified ambiguity; feedback is planned.
- [ ] Readings and technical claims have human verification records.
- [ ] Fictional staff, data and illustrative simulations are labelled honestly.

### Platform and deployment

- [ ] SlopU identity, required collections, fixed build and API preserved.
- [ ] `SLOP8350` retains suffix `350`, with matching level.
- [ ] Twelve Monday lectures and Wednesday workshops; break and final due date agree.
- [ ] Assessment weights and individual weighted rubrics each sum to 100%.
- [ ] `pnpm check` and `pnpm check:evidence` run successfully on the final content.
- [ ] Starter text and images replaced or deliberately removed with references fixed.
- [ ] At least one real deck linked from a lecture; every slide visually inspected.
- [ ] Public Pages site and core journeys checked at both confirmed viewports.
- [ ] Keyboard navigation, diagrams, tables, downloads and base-path links work.
- [ ] No private data, secrets or unintended public files introduced.

### Process and submission

- [ ] `CLAUDE.md` reflects useful decisions and actual working constraints.
- [ ] Own checks protect meaningful course contracts; limitations are acknowledged.
- [ ] Human review records say what was inspected and what was changed.
- [ ] Student-authored `PROCESS.md` is 400–600 words and supported by real commits.
- [ ] Every cited commit link points to the relevant repository evidence.
- [ ] No planned events or test exercises are represented as historical accidents.
- [ ] Live URL, source and process evidence submitted before the deadline.

**Completion standard:** a coherent, usable and evidenced course site that a
prospective student can understand. Additional features earn their place only
when they materially improve that experience.
