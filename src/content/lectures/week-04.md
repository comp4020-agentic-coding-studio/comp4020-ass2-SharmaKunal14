---
title: "The poor image"
description: "Working backwards from a limited observation, why indistinguishable is a claim about evidence rather than about files, and why ruling out one history does not establish another."
week: 4
slides: /decks/week-04/
heroImage: /src/assets/images/hero-week-04.avif
heroImageAlt: "Week 04 banner: The poor image"
date: 2027-03-15
teachers:
  - wren-halloway
related:
  - sessions/04-poor-image
---

For three weeks you have known what was done to the copy. This hour is about the
ordinary case, where you do not.

## The image that travels

Steyerl's argument is that the low-resolution copy is not a degraded version of
something better but the form in which images actually circulate — compressed,
re-uploaded, stripped of metadata, and available precisely because they are
cheap to move.

*From Hito Steyerl, "In Defense of the Poor Image",* e-flux journal *#10 (2009),
free at e-flux.com.*

Two things follow, and only one of them is hers. The cultural claim — that
circulation, not fidelity, determines which images matter — is an argument you
can read and dispute, and she makes it.

The observation this week needs is narrower, and it is ours rather than hers:
**a circulating image may arrive without the metadata, logs or intermediate
files needed to reconstruct its history.** Sometimes it arrives with them.
Steyerl is not claiming that provenance is always destroyed, and neither am I.

That weaker situation — evidence thinner than the question — is what this week
works in.

## Working backwards

Here is Output 7. Five observations: 1200 by 800, 148 KB, 4:2:0 subsampling, no
EXIF.

Someone proposes it was resized once and saved once. Someone else proposes it
was saved, resized, and saved again. Both end with the same save at the same
quality, so the final encode settings are no help: the routes disagree about one
thing only, whether a full-size JPEG was written before the resize.

Wednesday's pack supplies what each route predicts — nothing in it would let you
compute a file size from a list of steps, and asking you to would be asking for
a guess.

Apply the tolerance and both land inside it on every measurement. The evidence
does not choose. It is not that the question is meaningless — the file has
exactly one history — it is that **these five observations underdetermine it.**

## What indistinguishable means

This is the sentence to get right, and most people get it wrong.

"These two routes are indistinguishable" is incomplete, and as it stands it is
almost certainly false. The two outputs differ in a great many bytes. What is
true is narrower: **they are indistinguishable on these measurements, at this
tolerance.**

So the claim is about the evidence, not about the objects. Change the tolerance
and it may dissolve. Add a measurement and it may dissolve. Say which
measurements and which tolerance, every time, or you are asserting something
much stronger than you can support.

You have the tolerance in the pack: a route is compatible on size when its
prediction is within 15 KB of the observed size, with dimensions, subsampling
and EXIF presence matching exactly. If more than one route passes, size does not
distinguish them.

That 15 KB is a **scenario rule** — set so you can apply a threshold
consistently, not measured from anything. It is the boundary of what you are
entitled to say inside this exercise and nowhere else.

## Asking for evidence

The useful move is not to stare harder. It is to name an observation that would
discriminate — and to name it **before** you obtain it.

That order matters. If you look first and then decide what the result means, you
will find that whatever you saw supports whichever route you preferred. Writing
down in advance what result favours A and what result favours B is the only
thing that stops it.

Wednesday's menu has five items. Two do not exist: the EXIF is gone and the
upload log was never kept. The three that do exist each have a file you can
open, and **one separates the routes while two do not**.

The distinction between them is the most useful thing in this week, and it is
not about how technical the record is.

A **working-directory listing** shows a full-size JPEG sitting there before the
output. That feels like the answer. It is not, because co-existence is not
descent: the interim file could be an unrelated export and the output could have
come straight from the source. A **handover note** reaches the same dead end
from the human direction — a big version exists somewhere, and nothing about
whether it was read.

A **transformation record** naming the interim file as the input to the resize,
with a matching hash, does separate them. Route A resizes the source directly
and has no full-size JPEG to read.

Records that list what existed are cheap and common. Records that name what read
what are rarer and are what you actually need. Week 11 is about how often the
second kind is missing.

If you ask for a reasonable item and it turns out to be silent, that is a
finding. Report what you asked for, why it was reasonable, and what it did not
tell you. The failure mode is not asking the wrong question; it is pretending
afterwards that the answer was clear.

## Ruling out is not establishing

One more thing, and it will recur for the rest of the semester.

Suppose the discriminating evidence rules out route A. You have not shown route B
happened. You have shown that of the two histories somebody thought to propose,
one is excluded.

Others fit the same observations, and the same transformation record: any
history that saved at full size before resizing produces a record of that shape.
A save at a different quality then a resize. A route through a third
intermediate size. Nobody wrote those on a card, which is a fact about who was
asked rather than an argument against them.

So the claim your evidence supports is: *not route A, and consistent with route
B.* That is weaker than "it was route B", and it is what you can defend. Week 6
builds trees out of claims exactly this size.

## Before Wednesday

Read the observations and the tolerance. Do not open the reveal, and do not
decide anything yet.

[Workshop: The poor image](/sessions/04-poor-image/)
