# Assignment 2 — Slop University Course Website

Reference notes only — pulled from the course website on 2026-09-10. Not part
of the build or checks. Source of truth remains:
https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/assessments/assignment-2/

## The brief

Design and build "the university course you wish existed": a fictional course
for **Slop University (SlopU)** and its complete website.

- The course must be **niche** — narrow enough that "no real university would
  run it" but deep enough to sustain a full semester.
- It **can't** just be COMP4020 "with a find-and-replace."
- Reference examples cited on the site (each praised for pursuing "one idea
  explored throughout a semester"):
  - *Calling Bullshit*
  - *How to Make (Almost) Anything*
  - *CS 007: Personal Finance for Engineers*
- Start from the provided SlopU template repo. Fixed: branding, marks,
  palette, content collections, generated API. Customizable: pages, decks,
  components, navigation, artwork, styling, content.
- Choose your own course-code **level digit**; keep the three assigned digits
  (`SLOPxxxx`).

## Spec (the checkable contract, verbatim from the course API)

1. Deployed and live at its public GitHub Pages URL by the deadline, working
   at both marking viewports.
2. One niche course at Slop University, under a `SLOPxxxx` code that keeps the
   three digits your repo arrived with, running across **twelve dated
   teaching weeks**.
3. At least one lecture carries a real deck, linked from its page.
4. Assessment weightings that add up to **100%**.
5. Your own checks in `spec/`, protecting the promises your course makes that
   the build cannot; `pnpm check` and `pnpm check:evidence` pass.
6. Evidence of process is in the repo: `PROCESS.md`, `CLAUDE.md`, and a commit
   history that grew with the work.

## Due date

- **Deadline:** noon, Monday, 2026-09-21 (Australia/Canberra time) — the first
  day back from mid-semester break.
- **Marks/feedback returned:** 2026-10-02.
- No late submissions permitted; extensions can only be arranged in advance.

## Submission — three components

1. The deployed site URL (this is what's marked).
2. The source repository (for code and checks review).
3. Process evidence:
   - `PROCESS.md` — 400–600 words, one narrative, citing commits. Uncited
     claims don't count as evidence; `pnpm check:evidence` fails without
     citations.
   - `CLAUDE.md`.
   - Commit history.

`PROCESS.md` should explain how directing this particular course changed what
was asked of the agent and what was accepted back — decisions about what makes
a good course, which of those became rules or checks, and what was deliberately
left out.

## Marking criteria — 20% of course total

| Criterion               | Weight |
| ------------------------ | ------ |
| Legibility of process    | 45%    |
| Working deployed artefact | 20%   |
| Response to the brief    | 35%    |

- Markers spend ~10 minutes per submission, as a prospective student would:
  home page, several **non-adjacent** weeks, an assessment, the deck, any
  policy page — at both marking viewports.
- Repetitive weeks or a template swap-the-nouns job gets marked down on
  brief-response, independent of CI results.
- Restyling is **not** mandatory — the artefact criterion checks
  functionality, not aesthetics. Keeping the starter's visual style can still
  score HD on every criterion if the content is coherent and compelling.
- Process is weighted heaviest deliberately: top marks come from explaining
  *why* a non-obvious call beat the obvious one, and how you verified the
  result before accepting it.

## Repo-specific notes (this instance)

- Repo: `comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14`
- Template: `template-static` (Astro), fixed platform per `README.md` —
  Slop identity/branding, four content collections (`sessions`, `assessments`,
  `lectures`, `people`), build pipeline, generated API.
- `pnpm check:evidence` additionally checks (specific to A2): every tracked
  `STARTER_CONTENT` fragment and unchanged key imagery has been replaced.
- Group: baishi. Tutor: Tom Griffiths. Session: Wed 09:00–10:30, Marie Reay
  Building (155), Room 4.03. Crit cutoff: Wed 07:00.
- Related deliverables: `crits/06-a2-retro` (week 7 retro — presents this same
  repo, no new prototype).
