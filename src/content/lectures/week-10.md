---
title: "Enhance"
description: "What a restoration can recover, what it supplies from a prior, and how to tell."
week: 10
slides: /decks/week-10/
heroImage: /src/assets/images/hero-week-10.avif
heroImageAlt: "Week 10 banner: Enhance"
date: 2027-05-03
teachers:
  - wren-halloway
related:
  - sessions/10-enhance
---

What a restoration can recover, what it supplies from a prior, and how to tell.

Week 4 asked whether the evidence on a single output could tell two histories
apart. This week asks a related question about a different kind of claim:
when someone shows you a "before" and an "after" and says the after is a
recovery of the before's lost detail, what would actually verify that — and
what would only make it look verified?

## Three things that are not the same claim

**Plausible.** The restored image looks like a coherent photograph — nothing
about it screams "wrong." This is the weakest claim a restoration can make,
and the easiest one to satisfy: a generative method only has to produce
*some* image consistent with the low-resolution input, not the specific
image that was actually there.

**Verified.** The restored value at a specific, named location matches a
retained source you can check it against. This is a strong claim, but it
requires exactly what a real restoration usually does not have: the original.

**Uncertain, not fabricated.** Some regions were never at risk. A large flat
area that a degradation step averaged and a restoration step interpolated
will usually still look flat and match — but that match tells you nothing
about the restoration method's actual power, because a flat area survives
almost any degradation and almost any restoration. Calling every newly
computed pixel "invented" ignores this: some of what a restoration outputs is
trivially safe, some is a genuine guess, and only checking against retained
evidence tells you which.

## The pack's own result, stated plainly

This week's pack degrades an 8x8 synthetic tone chart by averaging every 2x2
block, then restores it with bilinear interpolation — a named, ordinary
upsampling method, not a generative model. Checked against the retained
source at six named locations: two features inside already-uniform blocks
matched (uninformative — nothing was lost there to recover), and of four
features inside blocks that had genuine internal variation, one matched and
three did not. One correct match out of four genuine recovery attempts, in
this one specimen, with this one method, is not a recovery rate — it is what
this pack's own arithmetic produced, and the lecture is not claiming it
generalises.

## What a documented failure actually shows

PULSE (Menon et al., CVPR 2020) searches a generative model's space of
plausible faces for one that downsamples to match a blurry input — it does
not, and by its own design cannot, reconstruct the specific person's true
appearance. When researchers ran a pixelated photo of Barack Obama through
it, the output had white skin and blue eyes (Quach, *The Register*, 2020) —
verifiably wrong, because a real photograph of Obama exists to check
against. That is the same structure as this week's pack, at much higher
stakes: a plausible output, checked against a retained source, found
unsupported. The correct general lesson is not "generative restoration
invents things" as a blanket rule — it is that plausibility was never
evidence of correctness, and checking requires exactly the retained source
that a real restoration claim, unlike this pack's, usually cannot supply.

## Before Wednesday

Download the pack. Read `pixels.csv` before you look at `restored.svg`, and
write down which of the six features you expect to match before you check.

[Workshop: Enhance](/sessions/10-enhance/)
