# Analysis -- week 3

Hypothetical values, supplied to practise experimental design. The score below is an invented composite, not a physical measurement, and it was not produced by a real encoder. Conclusions drawn here are about experimental reasoning, not about codec behaviour.

## Totals

| Condition | Bitrate | Cycles | Deviation score |
|---|---|---:|---:|
| Exact digital copy | none | 0 | 0 |
| 1 cycle at 320 kbps | 320 | 1 | 0.3 |
| 10 cycles at 320 kbps | 320 | 10 | 0.7 |
| 1 cycle at 128 kbps | 128 | 1 | 1.1 |
| 10 cycles at 128 kbps | 128 | 10 | 4.3 |
| 10 cycles at 96 kbps | 96 | 10 | 9.8 |

## Comparisons

| Comparison | Varies | Difference (score) | Verdict |
|---|---|---:|---|
| The comparison you are given (c1-320 vs c10-96) | bitrate and cycles | 9.5 | confounded -- the difference cannot be attributed to either variable |
| Corrected, at 128 kbps (c1-128 vs c10-128) | cycles | 3.2 | isolates one variable, and the difference exceeds the repeatability, so it is detectable in this scenario |
| Corrected, at 320 kbps (c1-320 vs c10-320) | cycles | 0.4 | non-detection -- at or below the 0.5-point repeatability of a pairwise difference |

**The confound.** Comparison M changes two things at once: the number of encoding cycles (1 to 10) and the bitrate (320 to 96). Its 9.5-point difference cannot be attributed to either variable.

**Corrected.** Holding the bitrate fixed isolates the cycle count. At 128 kbps the difference is 3.2 points, which is detectable in this scenario. At 320 kbps it is 0.4 points, at or below the 0.5-point repeatability, which is a non-detection.

**Conclusion.** Inside this scenario the effect of re-encoding depends on the bitrate. At 320 kbps, ten cycles produced no detectable difference. A non-detection is a finding with a specific meaning -- any effect is smaller than this procedure can resolve -- and it is not the same as no effect existing. The confounded comparison gave a difference roughly three times larger than the isolated one at the bitrate where a difference was detectable.

**Limits.** One source, one invented score, one hypothetical setup. The score sums eight bands and would miss a change confined to a narrower range, or one that does not appear as band energy at all. Nothing here licenses a claim about how any real codec behaves, at any bitrate.
