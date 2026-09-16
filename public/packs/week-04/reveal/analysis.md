# Analysis — week 4

Authored teaching scenario. The observations and predictions below are constructed to be internally consistent. They were not produced by running real image software, and no claim about how any real tool behaves follows from them.

## Why both routes fit

| Route | Predicted size (KB) | Off by | Predicted quality | Off by | Compatible |
|---|---:|---:|---:|---:|---|
| Route A — resize once, save once | 142 | 6 | 72 | 0 | yes |
| Route B — save, resize, save again | 155 | 7 | 74 | 2 | yes |

At the declared tolerance every initial observation is compatible with both routes. Dimensions, chroma subsampling and the absence of EXIF are identical. Predicted file size differs from the observation by 6 KB for route A and 7 KB for route B, both inside the 15 KB bound. Predicted quality estimate differs by 0 and 2, both inside the 4-point bound.

## The evidence menu

| Item | Status | Separates the routes |
|---|---|---|
| E1 — Histogram of quantised DCT coefficients for the output | available | yes |
| E2 — Transformation log excerpt for the output | available | no |
| E3 — Visual inspection of the output at 400 per cent | available | no |
| E4 — EXIF metadata dump for the output | unavailable | no |
| E5 — Upload log from the service the output was distributed through | unavailable | no |

**E1.** A file compressed twice carries periodicity in its coefficient histogram that a file compressed once does not. This separates a single-save route from a save-resize-save route.

**E2.** The retained excerpt records one resize operation and its timestamp. It does not record whether a save happened before that resize, which is exactly the difference between the two routes. Requesting it is reasonable and it does not settle the question.

**E3.** Both routes end at a comparable final quality, so both show blocking of a similar character at this magnification. Nothing visible at 400 per cent distinguishes one save from two.

**E4.** Listed because it is the first thing most people ask for. It is not available here, which is itself worth recording.

**E5.** Would have been informative. It does not exist.

## What happened

Output 7 was produced by route B.

**What resolves it.** E1. The coefficient histogram shows the periodicity that a second quantisation leaves behind, which route A cannot produce.

**What does not.** E2 and E3 are both reasonable requests that fail to separate the routes — E2 because the retained excerpt is silent on the one operation that differs, E3 because the routes converge on a similar final quality. A student who chose either and reported the question as still open has done the week correctly.

**Limits.** Two routes were constructed. Others fit the same observations: a different resize algorithm, a route through a third intermediate size, or a save at quality 80 followed by a stronger resize. Ruling out route A is not the same as establishing route B, and the evidence here supports the weaker claim.
