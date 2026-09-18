---
title: "When ancestry becomes hard to read"
description: "A simplified replication model, its parameters, and the biology it leaves out."
week: 7
slides: /decks/week-07/
heroImage: /src/assets/images/hero-week-07.avif
heroImageAlt: "Week 07 banner: When ancestry becomes hard to read"
date: 2027-04-12
teachers:
  - wren-halloway
related:
  - sessions/07-ancestry
---

A simplified replication model, its parameters, and the biology it leaves out.

Week 6 built a tree from shared copying error in a handful of witnesses. This
week asks a narrower question about that same method: what happens to it as
the error rate rises, and where does it stop working — inside a model simple
enough to state completely.

## The model, stated completely

A 24-symbol sequence over a four-symbol alphabet is the fixed ancestor. Each
generation copies the previous one forward: at every position, independently,
with a fixed probability (the error rate), the symbol is replaced by one of
the other three, chosen at random; otherwise it is left alone. That is the
whole model. There is one lineage — no branching, no separate subpopulations,
no death and no differential survival of any variant. **Ancestor agreement**
at generation *g* is the fraction of positions in that generation's sequence
that still match the generation-0 ancestor, not the immediate parent, so it
measures how much of the original signal a reconstruction attempt would still
have to work with.

## Three rates, three seeds, not one dramatic run

The workshop's pack runs this model at three fixed error rates, three fixed
seeds each. A single run at a single rate would show a shape; it would not
show whether that shape is a property of the rate or an accident of one
random sequence of substitutions. The nine runs let you see both: the mean
falls faster as the rate rises, and the three seeds at the same rate still
disagree with each other, sometimes by more than the gap between two rates'
means at an early generation. Reporting settings and seeds is what makes this
reproducible rather than illustrative — anyone can rerun `settings.json` and
get the same nine sequences back.

## What a finite run can and cannot show

Two things follow directly from the model as stated, and neither is a
biological claim. First, agreement never falls to zero: with four symbols per
position, an unrelated sequence still matches the ancestor at about a quarter
of its positions by chance, so every curve here settles toward roughly 0.25,
not 0. Second, the fall is not smooth for any one seed — a substitution can by
chance restore a match as easily as break one, so a single run can tick up
between two reported generations even while the three-seed mean keeps
falling. Both are properties of *this* model at *these* settings.

What the model does not have is the harder claim to resist: selection (no
variant here is more likely to persist than another) and population structure
(one lineage, no drift between separate copies, no bottleneck). A simulation
with three rates and three seeds cannot locate a general error-rate threshold
for readable ancestry, in this model or any other, and it says nothing about
a real biological sequence. Three runs are enough to see a trend; they are
not enough to bound it.

## Before Wednesday

Download the pack. Read `settings.json` before you look at the results, and
write your own prediction before opening `plot.svg`.

[Workshop: When ancestry becomes hard to read](/sessions/07-ancestry/)
