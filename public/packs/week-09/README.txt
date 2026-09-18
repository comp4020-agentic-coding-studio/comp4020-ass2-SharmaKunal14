Categorical resampling model -- week 9 pack
A small categorical resampling model. It has no language-model architecture, no optimisation and no notion of a sentence -- it exists to show, in miniature, how a rare category's count moves across resampling rounds under three data-retention conditions.

settings.json has the categories, true probabilities, round size, seeds and
each condition's method -- everything needed to reproduce every number here.

counts.csv is every category's count for every condition, seed and round.
rare-category-retention.csv pulls out the rare category F alone.

plot.svg draws the rare category's count for all nine runs; trend.txt is the
same information as a table and prose -- accessible route.

reveal/analysis.md names what this model omits and a conclusion it cannot
justify. Open it after you have written your own conditional conclusion.
