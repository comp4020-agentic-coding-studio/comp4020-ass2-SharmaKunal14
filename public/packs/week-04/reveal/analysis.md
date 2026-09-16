# Analysis — week 4

Authored teaching scenario. Every observation, prediction and evidence record below was written for this exercise. None was produced by running image software, and nothing here supports a claim about how any real tool or forensic technique behaves.

## Why both routes fit

| Route | Predicted size (KB) | Off by | Exact fields match | Compatible |
|---|---:|---:|---|---|
| Route A — resize once, save once | 142 | 6 | yes | yes |
| Route B — save, resize, save again | 155 | 7 | yes | yes |

Every field required to match exactly does match: dimensions, chroma subsampling and the absence of EXIF are identical under both routes. On file size, route A's prediction is 6 KB from the observation and route B's is 7 KB, both inside the 15 KB scenario rule. So the initial observations do not separate the routes.

## The evidence menu

| Item | Status | Separates the routes |
|---|---|---|
| E1 — Retained intermediate-file record from the working directory | available | yes |
| E2 — Transformation log excerpt for the output | available | no |
| E3 — Inspection report for the output at 400 per cent | available | no |
| E4 — EXIF metadata dump for the output | unavailable | no |
| E5 — Upload log from the service the output was distributed through | unavailable | no |

**E1.** The listing records a JPEG at the full source dimensions, created before the 1200 x 800 output. Route A never saves a JPEG before resizing, so route A cannot produce this listing. It is excluded. This does not establish route B: any history that saved at full size before resizing would leave the same listing.

**E2.** The excerpt records the resize and the encode that followed it. It says nothing about whether anything was saved before the resize, which is the only operation the two routes disagree about. Asking for it is reasonable; it does not separate them.

**E3.** The supplied report records no distinguishable difference. Note what that is and is not: it is one examiner's recorded finding in this scenario, not a demonstration that single and double saves are visually identical in general.

**E4.** Listed because it is the first thing most people ask for. It is not available here, which is itself worth recording in your report.

**E5.** Would have been informative. It does not exist.

## What happened

Output 7 was produced by route B.

**What resolves it.** E1. The retained working-directory listing shows a full-size JPEG existing before the 1200 x 800 output. Route A resizes before its only save, so route A cannot produce that file, and route A is excluded.

**What does not.** E2 and E3 are both reasonable requests that fail to separate the routes. E2's excerpt begins at the resize and is silent on whether anything was saved earlier — the one operation the routes disagree about. E3 records no distinguishable difference. A student who chose either and reported the question as still open has done the week correctly.

**Limits.** Excluding route A is not establishing route B. Any history that saved at full size before resizing would leave the same directory listing — a save at quality 85 then a resize, or a route through a third intermediate size. Two routes were proposed; the evidence supports the weaker claim, which is 'not route A, and consistent with route B'. Every record in this pack is authored, and none of it demonstrates the behaviour of real software.
