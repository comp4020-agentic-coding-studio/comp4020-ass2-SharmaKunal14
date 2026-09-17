---
title: "The office that ate itself"
description: "What changes when something is copied, the eight-operation control that shows change is not guaranteed, and why a deterministic rule still leaves readers disagreeing."
week: 1
date: 2027-02-22
teachers:
  - wren-halloway
related:
  - sessions/01-photocopy
slides: /decks/week-01/
---

Sixty minutes. The workshop on Wednesday does the counting; this hour is about
what a count is worth.

## The question

We are going to spend twelve weeks on what happens to things when they are
copied. Before any of that is worth doing, we need to be able to say what
changed — in a way that another person could check.

## Chester Carlson's problem

Carlson demonstrated electrophotography in 1938 and spent most of the next decade
failing to interest anyone in it. More than twenty companies declined. The
recorded objection was not that the machine did not work; it was that carbon
paper already existed and offices were not asking for anything else.

*From David Owen,* Copies in Seconds *(Simon & Schuster, 2004), chapter 1. No
linkable copy exists, so the claim used here is stated rather than cited at
length: the technology was repeatedly judged to solve a problem nobody had.*

The point for us is not the business history. It is that the photocopier arrived
as a machine for making a document exist in two places, and nobody was asked to
think about what the second one was like. That question is ours.

## The worked example

Copy room test card 0S1I-B85l, four lines, deliberately built from characters
that are easy to confuse.

Take line 1 of the card and line 1 of a copy that went through four photocopy
operations, as transcribed by one reader:

```
card   The clerk in Room 108 filed 1,051 slips before noon.
copy   The clerk in Room 1O8 filed 1,05l slips before noon.
```

Two positions differ: a `0` read as `O`, and a `1` read as `l`. That is the whole
measurement. Compare position by position, count the differences, and because
every transcription is the same length as the card, no judgement is needed about
what lines up with what.

The rule matters more than the number. A rule you can hand to someone else, who
then gets your number, is a measurement. A number you produced by looking
carefully is an impression.

## Two results, and the second is the interesting one

**Eight photocopy operations are worse than one, and eight digital operations
are not worse at all.** The control is copied byte for byte, eight times,
checksummed at each step, and it comes back identical to the card. So the damage
belongs to this photocopier, not to copying.

The matching operation count is what makes that a control rather than a gesture.
A digital copy made once, set beside a photocopy chain of eight, would license
nothing: the obvious objection is that it was never tested. Both channels run
eight times, and only one of them degrades.

This is also why the course opens with a control rather than a dramatic chain of
ruined pages. A chain on its own shows you something got worse. It does not tell
you what made it worse, and the answer is not "being copied."

**Two readers of the same copy disagree.** After one photocopy operation in
Wednesday's pack, one reader records an error and the other records none. Both
followed the same transcription procedure; the scenario records them resolving
one damaged mark differently.

The tempting conclusion is that the measurement is subjective and therefore
worthless. Resist it, because three claims are being run together.

The **counting algorithm is deterministic**. Give it the same transcription and
the same card and it returns the same number, always.

**Your own repeatability** is a separate question, and Wednesday asks you to test
it by counting one transcription twice. If your two counts differ, you applied
the rule inconsistently — that is a fact about you, not about the copy.

**Readers still differ**, because resolving an ambiguous mark as a zero or a
capital O is an interpretation. There is a fact of the matter — the card says
what it says — but the mark on a damaged copy underdetermines it, and two people
decide differently.

So legibility is not a property of the copy. It is a relation between a copy and
a reader, and an honest table reports the spread instead of averaging it away.
Wednesday's pack makes that concrete: reader R1 scores below R2 after four
operations and above R2 after eight, so the readers cannot be ranked either.

## One more distinction

A reader who cannot resolve a character and writes `·` has not made an error in
the same sense as one who confidently writes the wrong letter. Wednesday's table
counts them separately.

It is a small thing that recurs all semester: a measurement is improved by
recording where it declined to decide.

## Before Wednesday

Download the pack, read the card and the counting rule. Ten minutes.

[Workshop: The office that ate itself](/sessions/01-photocopy/)
