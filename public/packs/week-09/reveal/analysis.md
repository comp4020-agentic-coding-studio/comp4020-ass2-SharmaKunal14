# Analysis — week 9

The baseline never loses category F because it is never estimated from a prior sample. The fully recursive condition is the only one where an empirical estimate can assign category F zero probability, after which no run of that condition can ever produce it again — a genuine absorbing state, not a modelling flourish. Mixing in fresh original-data samples measurably reduces how often that happens and how early, without guaranteeing it never happens.

## What this model omits

This model has no language-model architecture, no training objective and no notion of style, sentence or token beyond an arbitrary category label. Six categories and three seeds per condition show that runs vary and that one mechanism (estimating a distribution from a finite sample, then sampling from that estimate) can zero out a rare category — they do not establish that any real trained language model degrades this way, at what rate, or that retaining original data protects any particular model to any particular degree.

## A conclusion this pack cannot justify

That this toy model measures how quickly a real large language model 'forgets' rare styles or facts under recursive training, or that the specific retention numbers here transfer to any other categorical distribution, sample size or mixing ratio. The mechanism illustrated (sampling noise compounding through repeated re-estimation) is the transferable idea; the numbers are a property of this six-category, 200-draw-per-round setup only.
