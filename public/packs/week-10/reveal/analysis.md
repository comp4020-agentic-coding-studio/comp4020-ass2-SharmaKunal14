# Analysis — week 10

Of the four features checked inside blocks that already had internal variation, three (f3, f5, f6) came back unsupported and one (f4) matched the retained source exactly. f4's match is not evidence that bilinear interpolation recovered real detail: the algorithm produced the same smooth blended value regardless of which sub-cell was asked about, and that value happened, for f4 alone, to round to the true tone. Both features inside already-uniform blocks (f1, f2) also matched — but a block that started uniform had nothing to restore in the first place, so neither match demonstrates anything the restoration step did.

## What this specimen omits

This is an 8x8 tone chart with one hand-placed anomaly and one hand-placed diagonal, not a photograph, and its restoration method is a single named algorithm (bilinear interpolation from 2x2 block averages) rather than any real restoration tool. Six checked features out of 64 cells show that this specific method recovered one of four genuinely destroyed values in this specific specimen by coincidence — they do not establish a general recovery rate for bilinear interpolation, for any other algorithm, or for any real image.

## A conclusion this pack cannot justify

That a restoration algorithm 'fabricates' or 'invents' detail as a general property, or that any visually convincing restoration output is thereby suspect, or that f4's correct match proves the method can recover fine detail on request. The verdicts here are only available because this specimen's retained source exists to check against — in a real restoration claim without a retained source, the correct conclusion is not 'it is fabricated' or 'it is confirmed' but 'it is unverified,' which is narrower and more defensible than either.
