# Analysis — week 3

Hypothetical values, supplied to practise experimental design. They are arithmetically consistent and were not measured from a real encoder. Any conclusion drawn here is a conclusion about reasoning, not about a codec.

## Totals

| Condition | Bitrate | Cycles | Total deviation (dB) |
|---|---|---:|---:|
| Exact digital copy | none | 0 | 0 |
| 1 cycle at 320 kbps | 320 | 1 | 0.3 |
| 10 cycles at 320 kbps | 320 | 10 | 0.7 |
| 1 cycle at 128 kbps | 128 | 1 | 1.1 |
| 10 cycles at 128 kbps | 128 | 10 | 4.3 |
| 10 cycles at 96 kbps | 96 | 10 | 9.8 |

## Comparisons

| Comparison | Varies | Difference (dB) | Verdict |
|---|---|---:|---|
| The comparison you are given (c1-320 vs c10-96) | bitrate and cycles | 9.5 | confounded — the difference cannot be attributed to either variable |
| Corrected, at 128 kbps (c1-128 vs c10-128) | cycles | 3.2 | sound, and the difference is larger than the repeatability |
| Corrected, at 320 kbps (c1-320 vs c10-320) | cycles | 0.4 | inside the 0.5 dB repeatability — no effect this measure can see |

**The confound.** Comparison M changes two things at once: the number of encoding cycles (1 to 10) and the bitrate (320 to 96). Its 9.5 dB difference cannot be attributed to either variable, and most of it is the bitrate.

**Corrected.** Holding the bitrate fixed isolates the cycle count. At 128 kbps the difference is 3.2 dB, which the measure can see. At 320 kbps it is 0.4 dB, which is inside the 0.5 dB repeatability and therefore not a result.

**Conclusion.** The effect of re-encoding depends on the bitrate. At 320 kbps, in this hypothetical setup, ten cycles produced nothing measurable. A null result is a result, and the confounded comparison overstated the effect by roughly threefold even at the bitrate where the effect is real.

**Limits.** One source, one measure, one hypothetical encoder. The measure sums eight bands and would miss a change confined to a narrower range, or one that does not show up as band energy at all.
