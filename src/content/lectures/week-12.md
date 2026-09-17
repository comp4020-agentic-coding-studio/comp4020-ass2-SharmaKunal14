---
title: "The original that never was"
description: "Choosing what survives, and pricing what you agree to lose."
week: 12
date: 2027-05-17
teachers:
  - wren-halloway
related:
  - sessions/12-originals
  - sessions/11-custody
---

Choosing what survives, and pricing what you agree to lose.

Every week so far has asked what a record shows. This week asks a different
question: given a fixed budget, what does this archive choose to keep a
record of at all? Weeks 4 through 11 treated the surviving evidence as
given. It never was — someone spent a budget deciding what would survive,
and that decision is the one this week makes visible.

## An aura is not a file format

Walter Benjamin's 1936 essay on mechanical reproduction argues that even a
technically perfect copy is missing something the original has: its
"presence in time and space," what he calls the work's aura — "the unique
phenomenon of a distance, however close it may be" (§II–III). Read literally
against this archive, that claim sounds like nostalgia: Output 7 is a JPEG,
and a JPEG is exactly as reproducible as any other file. But Benjamin is not
talking about pixels. He is talking about the fact that a reproduction can
carry the *content* of an object while dropping everything about how that
object came to exist — who touched it, when, under what constraint. Week 11
showed this precisely: the public manifest for Output 7 carries the same
image data as the deposit copy, and still drops two facts an audit could
have used. A source-tier preservation budget line does not automatically buy
back what a stripped record already lost.

This week's budget makes that trade explicit instead of leaving it implicit.
Preserving a family at "source tier" costs real labor per item, not because
storing bytes is expensive — the image family's entire source file is
0.0109 GB, a few cents a year to store — but because auditing, describing
and making each item's provenance accessible is a per-item cost that does
not shrink just because the file is small. An archive with $120 a year to
spend across three families cannot buy full audited provenance for
everything it holds; some family's record stays thinner than another's, by
choice.

## What a real recovery cost

Caleb Stephens's account of the 1998 near-loss of *Toy Story 2* is a
documented case of exactly this tradeoff going wrong by accident rather than
by choice. A routine command deleted roughly 90% of the film's working
files; the tape backups everyone assumed were current turned out, when
actually tested by a restore, to have been silently failing for a month;
the film survived only because one employee, Galyn Susman, happened to have
a personal copy on a home computer, reconciled file-by-file against
whatever the tape restore could still salvage. Two features of that story
matter for this week's budget. First, a backup nobody has tried to restore
from is not evidence of preservation, only an unverified claim of it — the
same distinction week 11 drew between a record and a signature. Second, the
recovery worked only because someone, outside the budgeted plan, had kept a
copy nobody had asked them to keep. A preservation budget states what an
archive commits to keep; it says nothing about what survives anyway,
outside the plan, by luck.

## What this week's pack actually shows

The pack gives two proposals for the same $120 budget. "Deep image, thin
everything else" spends to bring the two-item image family to full
source-tier preservation ($104.005 total, naive value 38) while holding
print and audio at examples tier. "Start preserving real audio" spends
instead to bring four of the audio family's five items to source tier —
the archive's first real audio bytes, rather than feature tables alone —
holding print and image at examples tier ($118.010 total, naive value 40).
Both fit the stated budget. Neither dominates the other under the pack's own
naive value score, and the objection text names why: spending on image
polishes a record (week 11's) that is already known to be incomplete,
instead of creating coverage where the archive currently has none at all.
The response text refuses to resolve that for you — it says a memo has to
state which consideration it weights higher, not average the two questions
away into one number.

Then one rate changes. If source-tier labor rises from $12 to $20 per item —
because full preservation now has to include a week-11-style audit per item,
a cost the original figure left out — "Deep image" rises to $120.005 and
tips over budget, while "Start preserving real audio" *falls* to $105.003
and stays comfortably under it. The same $8-per-item change moves the two
proposals in opposite directions, because they spend their source-tier
dollars on families of very different sizes. A budget line that looked safe
at one set of assumptions is not safe at all once one input is revised, and
checking that required rerunning the arithmetic, not re-reading the
proposal.

## Before Wednesday

Read both texts. Open `proposals.csv` and `sensitivity.csv` from the pack
and recompute one row yourself before the workshop, so the flip is something
you have verified rather than something you were told happened.

[Workshop: The original that never was](/sessions/12-originals/)
