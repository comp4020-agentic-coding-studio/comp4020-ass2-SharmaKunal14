---
title: "Copying without loss"
description: "What resources can protect a message from a specified error pattern?"
week: 8
date: 2027-04-21
teachers:
  - wren-halloway
  - tobias-renn
learningTarget: "Calculate redundancy overhead and state the protection's limit."
archiveCollections:
  - bits
archiveDeposit: "Overhead table recording payload, transmitted bits, errors corrected and the failure case."
accessibleRoute: "Labelled text blocks worked by hand; no implementation required."
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
  - lectures/week-08
  - sessions/07-ancestry
spec:
  - you can state the week's question in your own words before you start
  - your evidence table separates what you observed from what you inferred
  - you name one alternative explanation your evidence does not rule out
---

> What resources can protect a message from a specified error pattern?

**Learning target.** Calculate redundancy overhead and state the protection's limit.

## Before the workshop

No pack to download. Every bitstring in this workshop is written on the page,
and the only tool required is counting by hand.

**The scheme.** A 3x repetition code: to send one payload bit, send it three
times. To decode a received triplet, take the majority value of its three
bits. This scheme corrects **any single bit-flip per triplet** and no more —
that bound is the whole week.

**The worked message.** Payload `1011` (4 bits). Encoded one bit at a time —
`1`→`111`, `0`→`000`, `1`→`111`, `1`→`111` — the transmitted codeword is
`111 000 111 111` (12 bits).

## Check — 5 minutes

Received: `101 000 111 111`. Decode each triplet by majority vote and write
the recovered 4-bit payload. Then state, in one sentence, the assumption
under which your decoded answer is reliable.

*Indicative answer.* `101`→majority `1`; the rest match the codeword exactly.
Recovered payload: `1011` — correct, despite the single flipped bit in the
first triplet. The assumption: **at most one bit error per triplet.** Feedback
below (Evaluate) supplies a received block where that assumption fails and the
majority vote is confidently wrong.

## Receive — 15 minutes

Confirm you can state, without looking back: what a triplet's majority vote
returns when it has zero errors, one error, and two errors — and which of
those three cases the scheme's guarantee actually covers.

## Investigate — 40 minutes

**Decode a protected example (10 minutes).** Received: `111 001 111 110`.
Decode each triplet by majority vote and write the recovered 4-bit payload.
Two triplets here carry one flipped bit each; the other two have none —
every triplet should still decode to the original payload.

**Compare three parallel cases of the same single-bit corruption (15
minutes).** The same physical fault — one bit flips in transit — is applied
three ways to the same payload bit (`1`, sent as `111`):

| Case | Sent | Received | Decoded | Correct? |
|---|---|---|---|---|
| Unprotected (no code) | `1` | `0` | `0` | No — wrong, and nothing flags it |
| Correctable (1 flip in the triplet) | `111` | `101` | `1` (majority) | Yes |
| Failure (2 flips in the triplet) | `111` | `100` | `0` (majority) | No — wrong, and nothing flags it |

Write one sentence on what the failure row shows: the repetition code paid
three times the bits and still failed exactly as silently as sending the bit
unprotected once — because two flips inside one triplet is outside what a
3x repetition code was ever built to survive.

**Calculate payload, transmitted bits and overhead (15 minutes).** For a new
6-bit payload `010110`, encoded the same way: state the transmitted bit
count, the overhead as both an added-bit count and a percentage, and how many
single-bit errors the whole 18-bit codeword can guarantee to correct (one per
triplet, six triplets).

## Evaluate — 30 minutes

Write your overhead table (see Deposit) and one paragraph: does more
redundancy remove the risk of a wrong-but-confident decode, or does it only
move the number of errors needed to produce one? Use the failure row above as
your evidence.

## Deposit — 30 minutes

Deposit an overhead table with one row per case you worked (the worked
example, the check, the protected example, and your 6-bit calculation),
columns: payload bits, transmitted bits, overhead, errors corrected per
triplet, and the failure case's error count. Add one line naming the fictional
fixture: introduce [The Lossless Argument](/assessments/the-lossless-argument/)
and one sample costing line — for a fictional 100 GB collection at a labelled
fictional storage rate of $0.02 per GB per month, 3x repetition raises
storage from 100 GB to 300 GB, and the fictional monthly cost from $2.00 to
$6.00. State plainly that this cost buys tolerance for one bit-flip per
triplet, not protection from every preservation risk. Deposit into the
[bits collection](/archive/#bits).

## Accessible route

Labelled text blocks worked by hand; no implementation required. Every
bitstring above is plain text, majority vote is arithmetic you can do without
a calculator, and the overhead calculation is addition and one division.

## Assessment

[The Lossless Argument](/assessments/the-lossless-argument/) uses this
week's overhead framework directly in its costing and feasibility criterion
(25%): whatever you propose to preserve without loss, state the redundancy
scheme, its overhead, and — following today's failure row — the specific
error pattern it does not protect against.
