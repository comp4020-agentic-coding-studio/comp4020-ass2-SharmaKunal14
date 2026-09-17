---
title: "Copying without loss"
description: "Redundancy as a purchase: what it buys, what it costs, and where the guarantee stops."
week: 8
date: 2027-04-19
teachers:
  - wren-halloway
related:
  - sessions/08-error-correction
---

Redundancy as a purchase: what it buys, what it costs, and where the guarantee stops.

Week 1 asked whether a copy changed at all, and answered it with a control
that stayed identical. Week 7 modelled a process where change is not
optional, only its rate is. This week asks the question those two leave open:
if you know roughly what kind of damage to expect, what can you buy to survive
it — and what does that purchase not cover?

## A repetition code, stated completely

Send payload bit `1` as `111`. To recover it, take the majority of the three
received bits. That is the entire scheme: no arithmetic beyond counting, and
the workshop's worked message — payload `1011`, codeword `111 000 111 111` —
runs it end to end.

**Detection is not correction.** Two identical adjacent copies would let you
notice a disagreement between them, but not say which one is right. A
majority of three lets you notice *and* resolve a disagreement, provided at
most one of the three is wrong. That "provided" is the entire content of the
guarantee, and it is a guarantee about **one bit-flip per triplet**, stated in
advance — not a general promise about noisy channels.

## Where the guarantee stops

Two flips inside the same triplet outvote the correct bit, and the decoder
returns the wrong value with exactly the same confidence as a correct decode.
The workshop's three-case table makes this concrete: an unprotected bit that
flips is simply wrong; a triplet with one flip self-corrects; a triplet with
two flips also "self-corrects" — to the wrong answer, silently, having cost
three times the bits to do it. Redundancy does not remove the risk of a
wrong-but-confident answer. It relocates the number of simultaneous faults
needed to produce one.

This is a cost-benefit purchase, not a law of nature: paying for a stronger
code (more repeats, or a real error-correcting code rather than plain
repetition) raises the number of simultaneous faults the scheme survives, at
a higher overhead. The workshop keeps the arithmetic to plain repetition
deliberately — a real correcting code is not required, because the shape of
the tradeoff is the same one being taught.

## Overhead is a number you calculate, not a slogan

Overhead is the transmitted bits in excess of the payload, as a count and as
a percentage of the payload. A 3x repetition code always has 200% overhead,
regardless of message length, because every payload bit becomes three
transmitted bits. That is a fixed price for a fixed guarantee (one flip per
triplet) — the workshop's costing exercise turns that price into a fictional
dollar figure for a fictional collection, to make the tradeoff a decision
rather than an abstraction.

## Before Wednesday

No pack to open. Read this page again and be ready to decode a received
triplet by hand and to say, out loud, the one assumption that decode depends
on.

[Workshop: Copying without loss](/sessions/08-error-correction/)
