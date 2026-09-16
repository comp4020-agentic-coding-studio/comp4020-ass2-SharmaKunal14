---
title: "The poor image"
description: "Can different histories fit the same available image evidence?"
week: 4
date: 2027-03-17
teachers:
  - wren-halloway
  - tobias-renn
learningTarget: "Show that a defined evidence set cannot separate two histories, then specify evidence that could — and accept when the answer stays open."
archiveCollections:
  - image
archiveDeposit: "Ambiguity report: two route diagrams, an observation table, the stated scope of indistinguishability, and a justified request for further evidence."
accessibleRoute: "The evidence is an observation table, two written route cards and an evidence menu, all in plain text. The task is inference from stated measurements, and no image needs to be looked at."
stages:
  check: 5
  receive: 15
  investigate: 40
  evaluate: 30
  deposit: 30
investigation:
  - 15
  - 10
  - 15
related:
  - lectures/week-04
  - sessions/03-perceptual
  - assessments/the-stemma
spec:
  - you state the tolerance under which two histories count as indistinguishable
  - your request for further evidence says in advance what result would separate the routes
  - your report records what remains unresolved rather than choosing to look decisive
---

> Can different histories fit the same available image evidence?

**Learning target.** Show that a defined evidence set cannot separate two
histories, then specify evidence that could — and accept when the answer stays
open.

## Before the workshop

Open the [week 4 pack](/packs/week-04/) and read `observations.csv` and
`tolerance.txt`. Ten minutes. Do not open the reveal.

**Reading.** Hito Steyerl, "In Defense of the Poor Image", *e-flux journal* #10
(2009), available free at e-flux.com. Read it for the argument about what
circulation does to images. The lecture is explicit about which of its claims
are cultural and which would need separate technical evidence.

## Last week, and this week

Week 3 started from a known process and asked how to test its effect. You
controlled what you changed.

This week runs the other way. You start from **one output and no history**, and
ask whether the evidence you have can tell you where it came from. It cannot
always, and the skill is saying so precisely rather than guessing.

## The specimen

**Output 7.** Provenance unknown — that is the question. Everything currently
known about it is six lines in `observations.csv`: dimensions, file size, a
quality estimate, chroma subsampling, and the absence of EXIF.

Two processing histories have been proposed. Route A resizes once and saves
once. Route B saves, resizes, then saves again. Their predicted measurements are
**not** supplied: deriving them and checking them against the observations is the
task.

`tolerance.txt` is the part to read carefully. File size within 15 KB, quality
estimate within 4 points, dimensions and subsampling matching exactly. Inside
those bounds this evidence cannot tell two predictions apart.

**Indistinguishable is a claim about the evidence, not about the files.** Two
images that this evidence cannot separate may differ in every byte. Saying
"indistinguishable" without saying *under what* is the error this week exists
to prevent.

The scenario is authored. The observations and predictions are internally
consistent and were not produced by running real image software.

## Investigate — 40 minutes

**Construct two compatible histories (15 minutes).** Work out what each route
would produce and compare it against the observations, using the tolerance. You
should find that both fit. Write down *how closely* each one fits, per
measurement — "compatible" is a conclusion, not an impression.

**Choose one further evidence item, and commit first (10 minutes).**
`evidence-menu.csv` lists five things you could ask for. Two of them do not
exist, and their absence is marked.

Pick one available item. Then, **before you look at it**, write down what result
would favour route A and what result would favour route B. If you cannot say
that in advance, the item cannot discriminate for you, and you should pick
another one — or record that you could not.

**Inspect it and revise (15 minutes).** Look at what you asked for. Update your
conclusion, and record what is still unresolved.

Not every available item separates the routes. If yours does not, you have not
failed the exercise — say what you asked for, why it was a reasonable request,
and what it turned out to be silent about.

## Evaluate — 30 minutes

Write the ambiguity report you are depositing: two route diagrams, your
observation table, the scope of indistinguishability, and your evidence request
with its justification. Then three paragraphs.

1. **State the scope.** "These routes are indistinguishable" is incomplete.
   Finish the sentence: indistinguishable *on which measurements, at what
   tolerance*.
2. **What would a third route do?** Only two were proposed. Sketch one more that
   also fits the observations, and say what that does to any conclusion you
   reached.
3. **What is the weakest claim you can defend?** If your evidence rules out one
   route, you have not established another. Write the claim your evidence
   actually supports, and notice that it is smaller than the one you wanted.

## What you should find

Both routes fit. Dimensions, subsampling and the missing EXIF are identical
either way. Predicted file size is 6 KB off the observation for one route and
7 KB for the other, both inside the 15 KB bound; the quality estimates are off
by 0 and 2, inside the 4-point bound.

So the initial evidence does not determine the process, and no amount of
staring at it will change that. The question is which further observation would.

One item on the menu does separate them. Two available items do not — one
because the retained log is silent on the exact operation that differs between
the routes, the other because the two routes converge on a similar final
quality. Both are reasonable requests. Neither settles it.

And even when you can rule out route A, notice what you are left with. Two
routes were proposed; others fit the same observations. **Ruling out one route
is not establishing another**, and the honest claim is the weaker one.

## Deposit

Both documented branches go into the [image collection](/archive/#image), with
the source and the logs retained. Weeks 10 and 11 come back to this collection:
week 10 asks whether a restoration of this output matches the original, and
week 11 asks what a provenance record for it would and would not establish.

## The five-minute check

Two route cards fit a supplied thumbnail. Propose one available evidence item
that could distinguish them, and explain how.

*Indicative answer.* Any item is acceptable if you say in advance what result
would favour which route. An answer that proposes an item, explains what it
would show, and then notes that the item may turn out to be non-discriminating
scores the limitation point. "The evidence remains insufficient" is a correct
answer here when it is argued.

## Assessment

For [The Stemma](/assessments/the-stemma/), this is the reasoning behind its
20% criterion: reconstruct the supported portions and **mark the unknown
portions as unknown**. "Cannot resolve this edge" earns full credit where the
evidence does not resolve it, and this week is where you practise writing that
sentence so it reads as a finding rather than as a shrug.

For [The Chain](/assessments/the-chain/), bound your conclusion. State the
source, the settings and the measure it holds for.
