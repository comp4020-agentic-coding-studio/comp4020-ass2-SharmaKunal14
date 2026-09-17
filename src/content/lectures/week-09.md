---
title: "The curse of recursion"
description: "Resampling from your own output, and why the rare cases go first."
week: 9
heroImage: /src/assets/images/hero-week-09.avif
heroImageAlt: "Week 09 banner: The curse of recursion"
date: 2027-04-26
teachers:
  - wren-halloway
related:
  - sessions/09-recursion
---

Resampling from your own output, and why the rare cases go first.

Week 7 asked what a finite run of copying error can and cannot show about
ancestry. This week asks a related but distinct question: what happens when
each generation is not a copy of the previous one, but a fresh sample drawn
*from* it — and what that does, specifically, to the cases that were already
rare.

## The reading, stated as a claim

Shumailov, Shumaylov, Zhao, Papernot, Anderson and Gal, "AI models collapse
when trained on recursively generated data," *Nature* 631, 755–759 (2024).
This article is behind Nature's login wall, so it is not linked here; this is
the specific claim the workshop's model is built to illustrate, not a summary
of the paper's own experiments (which involve real language models, not a
six-category toy). The paper distinguishes two stages: **early collapse**,
where a model trained on its own prior generation's output drifts from the
original distribution before any category disappears, and **late collapse**,
where low-frequency ("tail") cases are eventually assigned zero probability
by the estimation process and never recur. Its stated mitigation is
retaining access to some genuinely original (non-generated) data across
training generations, rather than training purely on prior output.

## A model simple enough to state completely, again

Six labelled categories, A through F, F fixed at 3% true probability. Round 0
draws 200 samples from the true distribution. Three conditions govern every
later round: a **baseline** that keeps drawing from the true distribution
(no recursion — the control); a **fully recursive** condition that estimates
each round's sampling distribution purely from the *previous* round's own
200-sample draw; and a **retain-original** condition that estimates each
round's distribution from a 50/50 mix of the previous round's draw and a
fresh 200-sample draw from the true distribution. Three fixed seeds run each
condition. That is the whole model: no architecture, no training objective,
no tokens or sentences — a category label standing in for anything a
generative process could produce with some cases rarer than others.

## What the pack's own numbers show — and what they do not

Across this pack's three seeds, the fully recursive condition sent category F
to a count of zero for one seed (47) by round 3, and it stayed at zero for
every later round — once an estimated distribution assigns a category zero
probability, sampling from that estimate can never produce it again. The
other two seeds under the same condition did not lose the category by round
5. The baseline, which never re-estimates from a sample, never lost it in any
seed. The retain-original condition did not lose it in any of the three seeds
run here.

None of that establishes a rate. Three seeds show that the mechanism (a rare
category can be zeroed by estimating a distribution from a finite sample,
then sampling from that estimate) is real and reproducible in this model —
they do not show how often it happens, how fast, or whether mixing in fresh
data at a 50/50 ratio specifically is what a real training pipeline would
need. The transferable idea is the mechanism; the specific counts are a
property of six categories, 200 draws per round, and a 50/50 mix, and do not
transfer to a different setup without rerunning it.

## Before this simplified model gets over-applied

Nothing here is a language model, a token vocabulary or a training
objective. Do not equate a categorical toy model with language-model
training: this model shows *that* recursive re-estimation from a finite
sample can permanently erase a rare case, using a mechanism general enough to
plausibly matter in much more complex settings — it does not show that any
particular real model degrades this way, at what rate, or that any specific
retention ratio would protect it.

## Before Wednesday

Download the pack. Read `settings.json` and each condition's description
before opening `rare-category-retention.csv`, and write your own prediction
of which conditions lose category F before you compare.

[Workshop: The curse of recursion](/sessions/09-recursion/)
