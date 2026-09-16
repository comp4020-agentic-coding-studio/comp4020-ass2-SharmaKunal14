---
title: "What the ear cannot hear"
description: "Why a suggested cause needs a control, a stated outcome measure and everything else held fixed — and why a result your measure cannot see is still a result."
week: 3
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

> One encoding cycle at 320 kbps: 0.3 dB total deviation.
> Ten encoding cycles at 96 kbps: 9.8 dB.
> Conclusion: ten encoding cycles cause a large loss.

The numbers are fine. The conclusion does not follow, because **two things
changed**. The cycle count went from 1 to 10 and the bitrate went from 320 to 96,
and there is no way to divide the 9.5 dB between them. The comparison measures
the two variables together and cannot separate them.

This is not a subtle error, and it is everywhere, because the two conditions were
probably not designed as a comparison at all — they were two things someone
happened to have.

## The repair

Change one thing. Hold everything else fixed.

> One cycle at 128 kbps versus ten cycles at 128 kbps.

Now the bitrate is constant and the only difference is the cycle count, so the
difference in deviation is attributable to it. Wednesday's data gives 3.2 dB —
real, and about a third of what the confounded comparison implied.

Four things have to be stated for that to be a protocol rather than a pair of
numbers: the **independent variable**, the **outcome measure**, the **control**,
and **what was held fixed**. Leave any of them out and a reader cannot tell
whether your result is about what you say it is about.

## The number that matters most

Every measure has a repeatability. Ours moves by up to 0.5 dB when the whole
measurement is repeated on the same files.

So when you run the corrected comparison at 320 kbps and get 0.4 dB, you have
not found a small effect. You have found **nothing this measure can see**, and
reporting 0.4 dB as a degradation would be reporting your own measurement noise.

A result below your resolution is a real result with a specific meaning: an
effect, if it exists, is smaller than you can detect with this setup. That is
worth writing down. It is not worth dressing up as a finding, and it is not a
failed experiment.

## Where that leaves the question

Does re-encoding degrade the recording? At 128 kbps, measurably. At 320 kbps,
not measurably with this measure.

Which is a worse headline than "generation loss ruins everything" and a better
answer, because it is conditional on things you can state: this source, this
measure, these settings. Every conclusion in this course is conditional in that
way. The skill is knowing which conditions to name.

## The control, again

The exact digital copy runs ten copy operations with no encoder and produces zero
deviation. As in week 1, its job is to show that the apparatus is not generating
the differences you attribute to the treatment.

If your control had come back at 2 dB, nothing else in the table would mean
anything. Run it first.

## Before Wednesday

Read the comparison you have been handed and the measure definition. Compute
nothing yet, and do not open the reveal.

[Workshop: What the ear cannot hear](/sessions/03-perceptual/)
