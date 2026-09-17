---
title: "What the ear cannot hear"
description: "Why a suggested cause needs a control, a stated outcome measure and everything else held fixed — and what a non-detection does and does not license."
week: 3
heroImage: /src/assets/images/hero-week-03.avif
heroImageAlt: "Week 03 banner: What the ear cannot hear"
date: 2027-03-08
teachers:
  - wren-halloway
related:
  - sessions/03-perceptual
---

Week 2 ended with a proposed explanation. This hour is about the difference
between proposing one and testing it.

## Loss designed to be inaudible

Perceptual coding does not try to keep the signal. It tries to keep the parts of
the signal a model of the listener says will be noticed, and discards the rest.
A codec is therefore an argument about hearing, built into a file format.

*From Jonathan Sterne,* MP3: The Meaning of a Format *(Duke University Press,
2012), chapter 1. Available through the library; the claim used here is that the
format encodes a theory of the listener, so what it throws away is a decision
about people rather than only about sound.*

Which sets up the question. If the loss was engineered to be imperceptible, does
stacking ten of those decisions produce something measurable?

## A comparison that cannot answer it

Here is one, and it is the kind you will be handed for the rest of your career.

> One encoding cycle at 320 kbps: deviation score 0.3.
> Ten encoding cycles at 96 kbps: 9.8.
> Conclusion: ten encoding cycles cause a large loss.

The numbers are fine. The conclusion does not follow, because **two things
changed**. The cycle count went from 1 to 10 and the bitrate went from 320 to 96,
and there is no way to divide the 9.5-point difference between them. The
comparison moves both variables together and cannot separate them.

A note on that score before we go on. It is eight per-band differences, each in
decibels, added up. Adding decibel differences does not give you a decibel, so
the score is an invented composite on its own scale. It supports comparisons
within one scenario and nothing beyond it.

This is not a subtle error, and it is everywhere, because the two conditions were
probably not designed as a comparison at all — they were two things someone
happened to have.

## The repair

Change one thing. Hold everything else fixed.

> One cycle at 128 kbps versus ten cycles at 128 kbps.

Now the bitrate is constant and the only difference is the cycle count, so the
difference in score is attributable to it. Wednesday's data gives 3.2 points —
detectable in this scenario, and roughly a third of what the confounded
comparison implied.

Four things have to be stated for that to be a protocol rather than a pair of
numbers: the **independent variable**, the **outcome measure**, the **control**,
and **what was held fixed**. Leave any of them out and a reader cannot tell
whether your result is about what you say it is about.

## The number that matters most

Every procedure has a repeatability, and what matters here is the repeatability
of the thing you report. You are reporting a *difference* between two
conditions, so the figure that governs you is how much that difference moves
when the whole procedure is repeated. For us it is 0.5 points.

So when you run the corrected comparison at 320 kbps and get 0.4 points, you
have not found a small difference. You have a **non-detection**: a result at or
below the point where this procedure can distinguish two conditions at all, and
reporting it as degradation would be reporting your own noise.

A non-detection is a finding with a specific meaning — any difference, if there
is one, is smaller than this setup can resolve. Write it down as that. It is not
a failed experiment, and it is also not evidence that the conditions are
identical. "We did not detect a difference" and "there is no difference" are
different claims, and only the first one is yours.

## Where that leaves the question

Inside this scenario: at 128 kbps a difference is detectable, and at 320 kbps
it is not.

Which is a worse headline than "generation loss ruins everything" and a better
answer, because it is conditional on things you can state: this source, this
score, these settings, this scenario. Note what it is *not* — it is not a claim
about how MP3 behaves. The numbers here are hypothetical, and a real
investigation of that question would need real measurements and a score someone
could defend on physical grounds.

Every conclusion in this course is conditional in that way. The skill is knowing
which conditions to name.

## The control, again

The exact digital copy runs ten copy operations with no encoder and scores zero.
As in week 1, its job is a check on the apparatus rather than a result of its
own.

A clean control does not prove your procedure is sound — plenty of faults would
leave it clean. What it does is rule out one specific failure: that the
procedure manufactures differences regardless of treatment. Had it come back at
2 points, nothing else in the table would have meant anything. Run it first.

## Before Wednesday

Read the comparison you have been handed and the measure definition. Compute
nothing yet, and do not open the reveal.

[Workshop: What the ear cannot hear](/sessions/03-perceptual/)
