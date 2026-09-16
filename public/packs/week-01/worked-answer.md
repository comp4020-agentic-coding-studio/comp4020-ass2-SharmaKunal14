# Worked answer — week 1

Computed from the transcriptions in this folder by `packs/week-01/build.ts`,
not typed alongside them.

## The counting rule

Compare the transcription to the card one character position at a time, within each labelled line. Every position where the two differ is one error. A position transcribed as U+00B7 (a middle dot) is an illegible, not a misreading, and is counted separately. Every transcription is the same length as the card, so no alignment judgement is needed.

## Counts

| Copy | Channel | Operations | Reader | Misreadings | Illegibles | Total |
|---|---|---:|---|---:|---:|---:|
| Digital control — 8 copy operations | digital | 8 | R1 | 0 | 0 | 0 |
| Digital control — 8 copy operations | digital | 8 | R2 | 0 | 0 | 0 |
| Photocopy — 1 copy operation | photocopy | 1 | R1 | 1 | 0 | 1 |
| Photocopy — 1 copy operation | photocopy | 1 | R2 | 0 | 0 | 0 |
| Photocopy — 4 copy operations | photocopy | 4 | R1 | 4 | 0 | 4 |
| Photocopy — 4 copy operations | photocopy | 4 | R2 | 5 | 0 | 5 |
| Photocopy — 8 copy operations | photocopy | 8 | R1 | 9 | 1 | 10 |
| Photocopy — 8 copy operations | photocopy | 8 | R2 | 7 | 2 | 9 |

## Where the readers agreed and disagreed

**Digital control — 8 copy operations.** Copied byte for byte eight times, once per photocopy generation. Each step was verified against the previous by checksum, so the eighth copy is demonstrably identical to the card rather than assumed to be.

- Both readers found an error at: no position
- Only one reader found an error at: no position

**Photocopy — 1 copy operation.** One pass on the copier, at the settings held fixed for every generation.

- Both readers found an error at: no position
- Only one reader found an error at: L1:20

**Photocopy — 4 copy operations.** A copy of the third copy, same machine and settings.

- Both readers found an error at: L1:20, L2:13
- Only one reader found an error at: L1:33, L3:35, L3:32, L3:33, L4:22

**Photocopy — 8 copy operations.** A copy of the seventh copy, same machine and settings.

- Both readers found an error at: L1:20, L2:1, L4:29
- Only one reader found an error at: L1:31, L1:33, L2:7, L2:21, L3:2, L3:3, L4:39, L2:3, L2:18, L2:36, L3:35, L4:22, L4:32

## What the table supports, and what it does not

Within the photocopy channel the totals rise with the number of copy operations.
The digital control ran **the same eight operations** and came back with none.

That comparison is the week's claim, and it only works because the operation
counts match. A control copied once would prove nothing about a chain of eight.

It is not enough to say a higher count proves more copy operations. The counts
come from one card, one machine and two readers. A different card, a different
machine or a third reader would give different numbers, and after a single
photocopy operation the two readers here already disagree — one found an error
and the other found none in the same copy.

Three separate claims are worth keeping apart:

- The **counting algorithm is deterministic**: the same transcription compared
  against the same card yields the same number, every time.
- **Personal repeatability** is something you check, by counting one
  transcription twice and seeing whether you agree with yourself.
- **Readers still differ**, because resolving a damaged mark as a zero or a
  capital O is an interpretation, and two people can follow the same procedure
  and interpret the same mark differently.

Legibility is therefore a relation between a copy and a reader, not a property of
the copy alone. Note also that reader R1 scores below R2 after four operations
and above R2 after eight: the readers cannot be ranked consistently either.
