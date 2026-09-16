---
title: "What the ear cannot hear"
description: "How would we test whether repeated re-encoding caused a measured change?"
week: 3
date: 2027-03-10
teachers:
  - wren-halloway
  - tobias-renn
learningTarget: "Design a comparison that isolates one variable, and report a result the comparison cannot see as a result."
archiveCollections:
  - audio
archiveDeposit: "One-page protocol and results table for a comparison that holds the bitrate fixed, with a conclusion limited to the source, settings and measure used."
accessibleRoute: "The evidence is a table of numbers with a stated arithmetic rule. Nothing requires listening, and the measure is eight additions."
stages:
  check: 5
  receive: 15
  investigate: 40
  evaluate: 30
  deposit: 30
investigation:
  - 10
  - 15
  - 15
related:
  - lectures/week-03
  - sessions/02-dub
  - assessments/the-chain
spec:
  - your protocol names one independent variable and lists what you held fixed
  - your prediction is written before you look at the matching results
  - your conclusion is limited to the source, settings and measure you actually used
---

> How would we test whether repeated re-encoding caused a measured change?

**Learning target.** Design a comparison that isolates one variable — and report
a result your measure cannot see as a result, rather than as a failure.

## Before the workshop

Open the [week 3 pack](/packs/week-03/) and read `the-comparison.txt` and
`measure.txt`. Ten minutes. Do not open the reveal.

**Reading.** Jonathan Sterne, *MP3: The Meaning of a Format* (Duke University
Press, 2012), chapter 1, on perceptual coding as a theory about a listener.
Available through the library; the lecture states the specific claim used.

## Last week, and this week

Week 2 handed you a feature and asked which explanation it supported. You
answered by reasoning about mechanisms.

This week you are handed a **claim** and the comparison someone drew it from.
Reasoning about mechanisms is no longer enough: you have to say whether the
comparison could support the claim at all, and if not, what comparison would.

## The specimen and the measure

The same source recording as week 2, and six conditions run on it — an exact
digital copy, and five encodings at various bitrates and cycle counts.

The measure is **total band deviation**: for each of eight frequency bands, the
absolute difference in band energy from the source, all eight added together.
One number per condition, computed by eight additions.

**It repeats to within 0.5 dB.** Run the whole measurement again on the same
files and the total moves by up to half a decibel. That number matters more than
any other in the pack: a difference smaller than 0.5 dB is not a difference this
measure can see.

The values are hypothetical, supplied to practise experimental design. They are
arithmetically consistent and were not measured from a real encoder. Every file
says so.

## Investigate — 40 minutes

**Find the problem with the comparison you were given (10 minutes).** You have
two conditions and a claim drawn from them. Compute both totals. Then look at
what is different between the two conditions — not just the number you are being
invited to look at.

**Write a protocol and a prediction (15 minutes).** Using
`protocol-template.txt`, design the comparison that would actually test the
claim. Name your independent variable, your outcome measure, your control, and
everything you are holding fixed.

Then **write down what you expect before you compute anything.** This is not
ceremony. The whole of `band-deviations.csv` is available to you, and a
prediction written afterwards is not a prediction.

**Compute your corrected comparison (15 minutes).** The conditions you need are
already in the file. Compute the totals and the difference, and compare it
against the 0.5 dB repeatability.

Then run your protocol a second time at a different bitrate. The answer changes.
Work out why, and what that does to the original claim.

## Evaluate — 30 minutes

Write the one-page protocol and results table you are depositing, then answer
three questions in a paragraph each.

1. **What did the original comparison actually measure?** Not "it was wrong" —
   say what its difference is a measurement *of*.
2. **What does your null tell you?** One of your corrected comparisons produces a
   difference smaller than the measure can resolve. State what that licenses and
   what it does not. It is not the same as "nothing happened."
3. **What would you have to change to detect it?** If an effect is there but
   below your resolution, name one change to the measure or the setup that would
   find it — and what that change would cost you.

The analysis is in the pack. Open it after your protocol, your prediction and
your three paragraphs.

## What you should find

The comparison you were handed changes **two** things: the cycle count goes from
1 to 10, and the bitrate goes from 320 to 96. Its 9.5 dB difference is real, and
it is not evidence about cycles, because you cannot say which variable produced
it. Most of it is the bitrate.

Hold the bitrate fixed and the picture changes twice over.

At 128 kbps, ten cycles produce a 3.2 dB difference — above the repeatability,
so the measure can see it. The effect is real, and it is **about a third** of
what the confounded comparison suggested.

At 320 kbps, ten cycles produce 0.4 dB. That is inside the 0.5 dB
repeatability. This measure cannot see it, and the honest report is that there
is no detectable effect.

So the answer to "does re-encoding degrade the recording?" is: **it depends on
the bitrate, and at 320 kbps we could not measure it.** That is a worse headline
and a better finding.

Notice what the exact-copy control does here, as it did in week 1. Ten copy
operations, no encoder, zero deviation. It tells you the measurement apparatus
is not manufacturing the differences you see elsewhere.

## Deposit

Your protocol and results table go into the [audio collection](/archive/#audio)
as a controlled comparison, with the condition settings recorded alongside the
numbers. A result without its settings is not reusable, and week 10 will come
back to this collection needing exactly those settings.

## The five-minute check

A comparison changes both the bitrate and the number of encoding cycles.
Identify the confound, specify one corrected comparison, and state its remaining
limit.

*Indicative answer.* Two variables move together, so the difference cannot be
attributed to either. Correct it by holding the bitrate fixed and varying only
the cycle count. The remaining limit is that the result then applies to that
bitrate, that source and that measure — and a null at one bitrate says nothing
about another.

The mark is for the design. Naming the codec, or guessing which condition came
first, earns nothing here.

## Assessment

[The Chain](/assessments/the-chain/) asks for ten copying steps, a control, and
a prediction recorded before you start. Its second criterion is measurement and
controls, at 30%: whether your measure suits your question and your control
isolates a competing explanation.

Take the protocol template with you. The most common way that assessment goes
wrong is a chain that varies two things at once, and then a conclusion that
names only one of them.
