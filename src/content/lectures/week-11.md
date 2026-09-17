---
title: "Chain of custody"
description: "Carrying provenance with an object, and what a missing record does and does not prove."
week: 11
heroImage: /src/assets/images/hero-week-11.avif
heroImageAlt: "Week 11 banner: Chain of custody"
date: 2027-05-10
teachers:
  - wren-halloway
related:
  - sessions/11-custody
---

Carrying provenance with an object, and what a missing record does and does not prove.

Week 4 asked whether the evidence on Output 7 could tell two histories apart,
and found that one retained record — a transformation record that *named*
its input rather than merely listing what existed — was the one that
resolved anything. This week asks what happens to a record like that after
the object it describes keeps moving: what does a provenance record carried
forward actually establish, and what does it silently drop?

## A record is not a signature

A provenance record is a set of assertions someone chose to keep: this file
was produced by this process, at this time, by this tool. Nothing about
writing those assertions down makes them true, and nothing about them being
absent makes the underlying claim false. Confusing "no record survives" with
"this is fabricated" is the same error week 4 warned against when it said
co-existence is not descent — an absence is a fact about what was kept, not
a fact about what happened.

The C2PA specification exists precisely because a plain record like this
week's manifests has no defence against exactly this: anyone with file access
can edit a JSON manifest, so its assertions are only as trustworthy as
whoever last touched the file. C2PA's answer is to bind a manifest to a
signer's cryptographic key, so tampering *after* signing is detectable
without trusting the file's own claims. That is a real, useful guarantee —
and it is a narrower one than it sounds, because the specification is
explicit that it verifies the assertions were not altered after signing, not
that the assertions were true when made. A dishonest camera, or a dishonestly
configured signing tool, produces a validly signed record of a false claim.

## What this week's pack actually shows

This week's audit compares a deposit manifest and a public manifest for
Output 7, against the publishing pipeline's own log of what it changed
between them. The log names two operations, and both check out exactly: two
fields are absent from the public manifest precisely as logged. But the real
diff has two further changes the log never mentions — a field renamed rather
than removed, and a checksum that changed because the field set changed. A
log that is honest about everything it lists can still be an incomplete
account of the object's actual history, and the only way to find the gap was
to compare the manifests directly rather than trust the log as a summary of
them.

The pack also carries two fields, `gpsCoordinates` and `cameraModel`, that
are absent from *both* manifests — not because this operation removed them,
but because, per week 4, Output 7 never retained that data at any stage. An
audit that treats every absent field as evidence of stripping would invent a
suspicious history for a specimen that simply never had the data to lose.

## Before Wednesday

Download the pack. Compare the two manifests directly before you read the
stripping log's account of what changed, so you find the gap yourself rather
than being told where to look.

[Workshop: Chain of custody](/sessions/11-custody/)
