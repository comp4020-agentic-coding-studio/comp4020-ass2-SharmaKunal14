# Worked answer — week 1

Computed from the transcriptions in this folder by `packs/week-01/build.ts`,
not typed alongside them.

## The counting rule

Compare the transcription to the card one character position at a time, within each labelled line. Every position where the two differ is one error. A position transcribed as U+00B7 (a middle dot) is an illegible, not a misreading, and is counted separately. Every transcription is the same length as the card, so no alignment judgement is needed.

## Counts

| Copy | Generation | Reader | Misreadings | Illegibles | Total |
|---|---:|---|---:|---:|---:|
| Exact digital copy (control) | 0 | R1 | 0 | 0 | 0 |
| Exact digital copy (control) | 0 | R2 | 0 | 0 | 0 |
| Photocopy, generation 1 | 1 | R1 | 1 | 0 | 1 |
| Photocopy, generation 1 | 1 | R2 | 0 | 0 | 0 |
| Photocopy, generation 4 | 4 | R1 | 4 | 0 | 4 |
| Photocopy, generation 4 | 4 | R2 | 5 | 0 | 5 |
| Photocopy, generation 8 | 8 | R1 | 9 | 1 | 10 |
| Photocopy, generation 8 | 8 | R2 | 7 | 2 | 9 |

## Where the readers agreed and disagreed

**Exact digital copy (control).** File copied byte for byte. No re-encoding, no printing.

- Both readers found an error at: no position
- Only one reader found an error at: no position

**Photocopy, generation 1.** One pass, same machine and settings as every later generation.

- Both readers found an error at: no position
- Only one reader found an error at: L1:20

**Photocopy, generation 4.** Copy of the generation 3 copy, same machine and settings.

- Both readers found an error at: L1:20, L2:13
- Only one reader found an error at: L1:33, L3:35, L3:32, L3:33, L4:22

**Photocopy, generation 8.** Copy of the generation 7 copy, same machine and settings.

- Both readers found an error at: L1:20, L2:1, L4:29
- Only one reader found an error at: L1:31, L1:33, L2:7, L2:21, L3:2, L3:3, L4:39, L2:3, L2:18, L2:36, L3:35, L4:22, L4:32

## What the table supports, and what it does not

The totals rise with generation, and the control has none. That is enough to say
this copying process damaged these copies, and that copying as such does not:
the exact digital copy went through the same number of copy operations and came
back identical.

It is not enough to say a higher count proves a later generation. The counts
come from one card, one machine and two readers. A different card, a different
machine or a third reader would give different numbers, and at generation 1 the
two readers here already disagree — one found an error and the other found none
in the same copy.

Legibility is a relation between a copy and a reader, not a property of the copy
alone. The counting rule is reproducible; the reading is not.
