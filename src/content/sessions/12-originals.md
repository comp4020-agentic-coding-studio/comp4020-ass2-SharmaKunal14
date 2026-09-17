---
title: "The original that never was"
description: "What should this archive preserve, given a limited budget?"
week: 12
date: 2027-05-19
teachers:
  - wren-halloway
  - tobias-renn
learningTarget: "Defend a preservation choice while acknowledging a worthwhile alternative."
archiveCollections:
  - print
  - audio
  - image
archiveDeposit: "Preservation memo allocating a stated budget across families, plus a response to one objection."
accessibleRoute: "Budget table and a written participation alternative to the debate."
stages:
  check: 5
  receive: 15
  investigate: 40
  evaluate: 30
  deposit: 30
investigation:
  - 15
  - 15
  - 10
related:
  - lectures/week-12
  - sessions/08-error-correction
  - sessions/10-enhance
  - sessions/11-custody
  - assessments/the-lossless-argument
  - assessments/generation-checks
spec:
  - you can state the week's question in your own words before you start
  - your evidence table separates what you observed from what you inferred
  - you name one alternative explanation your evidence does not rule out
---

> What should this archive preserve, given a limited budget?

**Learning target.** Defend a preservation choice while acknowledging a worthwhile alternative.

## Before the workshop

Download the [week 12 pack](/packs/week-12/): `budget.txt` states the annual
budget, the per-tier rates, and each of the three archive families' real item
counts and sizes. `proposals.csv` gives two competing allocations. Do not
open `reveal/` yet.

**Readings.**

1. Walter Benjamin, "The Work of Art in the Age of Mechanical Reproduction"
   (1936), §II–III, freely available at
   [marxists.org](https://www.marxists.org/reference/subject/philosophy/works/ge/benjamin.htm).
   Read for the claim that even a perfect reproduction lacks the original's
   "presence in time and space" — its "aura." This week's title takes its
   name from that idea: a preservation choice that keeps a source file has
   not thereby kept everything week 4 through 11 found interesting about the
   object it came from.
2. Caleb Stephens, "How Pixar Saved Toy Story 2" (PremiumBeat, 2018), freely
   available at
   [premiumbeat.com/blog/how-pixar-saved-toy-story-2](https://www.premiumbeat.com/blog/how-pixar-saved-toy-story-2/).
   A documented case: a routine deletion command destroyed 90% of the film's
   assets, the tape backups that were assumed to work turned out to be
   silently broken, and the film was recovered only because one employee
   happened to keep her own copy. Read for what made the backup failure
   invisible until it was tested by an actual restore.

## Check — 5 minutes

`reveal/analysis.md` is not open yet, but `proposal-totals.csv` is: both
supplied proposals fit within budget. Read their two summaries in
`budget.txt`'s pairing with `proposals.csv`. Which would you choose, and what
loss are you accepting by not choosing the other? State your answer and the
accepted loss in one sentence each.

*Indicative answer.* Either proposal earns full marks here if the accepted
loss is named precisely: choosing deep image tier for the image family means
accepting that the audio family keeps no real audio bytes at all; choosing to
start real audio preservation means accepting that the image family's
already-documented provenance gap (week 11) stays exactly as uncertain as it
is now. "The other proposal has a downside" is not an answer; naming the
specific downside is.

## Receive — 15 minutes

Confirm you can state, in your own words, why a preservation budget forces a
choice even when every individual family's storage bytes are cheap: for this
archive, the dominant cost is not gigabytes, it is the labor of curating,
auditing and writing an accessible description for each item — a cost that
scales with item count, not file size.

## Investigate — 40 minutes

**Allocate the stated budget across at least two families (15 minutes).**
Using `proposals.csv`, verify both supplied proposals' costs by recomputing
one family's line yourself from the rates in `budget.txt`. Then decide which
you would defend, or sketch a third allocation of your own within the same
budget.

**Test your choice after a changed cost assumption (15 minutes).** Open
`sensitivity.csv`. One rate has changed: source-tier labor rose from $12 to
$20 per item, reflecting that full preservation now includes a
week-11-style provenance audit per item. Check whether your chosen proposal
is still affordable under the revised rate, and if it is not, say what you
would cut.

**Respond to a serious alternative proposal (10 minutes).** Open
`objection.txt`. Before reading the supplied response, write your own answer
to the objection. Then compare.

## Evaluate — 30 minutes

Write the preservation memo you are depositing: your chosen allocation, its
cost under both the baseline and revised rates, the accepted loss stated
precisely, and your response to the objection. Then answer: is there a
version of "total preservation value" you could compute that would make this
choice obvious rather than genuinely contested? If you propose one, say what
consideration it leaves out.

## Deposit — 30 minutes

Open [`reveal/analysis.md`](/packs/week-12/reveal/analysis.md) and compare it
against your memo. It does not name a winning proposal, and neither should
yours — a memo that states its allocation, its cost under both rates, and the
loss it accepts is complete without also insisting no other choice was
defensible. Deposit your memo across the [print](/archive/#print),
[audio](/archive/#audio) and [image](/archive/#image) collections, one line
per family stating what this budget would and would not preserve there.

## Accessible route

`budget.txt`, `proposals.csv`, `proposal-totals.csv` and `sensitivity.csv`
are all plain text and require no debate or spoken participation; the written
memo is the deliverable either way.

## Assessment

[Generation Checks](/assessments/generation-checks/)'s final five-minute
check runs today. [The Lossless Argument](/assessments/the-lossless-argument/)
is due 2027-06-07, 12:00 Canberra time — this week's budgeted memo is worked
practice for exactly that assessment's scope, costing and alternatives
criteria, at a smaller scale.
