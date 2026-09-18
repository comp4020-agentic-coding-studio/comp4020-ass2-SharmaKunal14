# Construction log -- week 2 pack

Authored teaching scenario. The features below are constructed to show how a shared property is reasoned about. Nothing here was measured from a real tape, a real deck or a real recording.

## What each feature is, and why

| Feature | Location | Kind | Present in | In the source |
|---|---|---|---|---|
| F1 -- Broadband noise floor raised by about 9 dB | throughout | process | W, X, Y, Z | no |
| F2 -- Dropout, 40 ms, left channel only | 00:12.400 | one-off event | X, Y | no |
| F3 -- Mains hum at 50 Hz | throughout | one-off event | W | no |
| F4 -- Click, 6 ms | 00:21.150 | one-off event | Z | no |
| F5 -- Door closing, 300 ms | 00:04.900 | source content | W, X, Y, Z | yes |
| F6 -- High-frequency rolloff above 12 kHz | throughout | equipment | X, Z | no |

**F1.** Every analogue dub raises the noise floor. It is absent from the source and present in all four copies, so it distinguishes copies from the source and distinguishes nothing among the copies.

**F2.** A single physical flaw at one timestamp in one channel. Two dubs producing the same 40 ms dropout at the same 00:12.400 independently is not a plausible coincidence, so the most economical explanation is that both descend from a copy that already had it.

**F3.** Present in one copy only, so it says nothing about relationships. It does confirm W is not identical to any other copy.

**F4.** Present in one copy only. Same role as F3.

**F5.** It is in the source. Every faithful copy carries it, so sharing it is evidence of nothing beyond having been copied from this source at all. This is the first explanation to rule out whenever two copies share something.

**F6.** Frequency response is a property of the deck and its settings, not of the recording's history. Two dubs made on the same worn machine share it without being related. It groups X with Z, which contradicts F2's grouping of X with Y -- and F2 wins, because a one-off flaw at a fixed timestamp is far harder to produce twice than a generic response curve.

## How the copies were actually made

- W from S -- dubbed directly from the source
- Z from S -- dubbed directly from the source
- beta from S -- dubbed directly from the source; this copy is lost
- X from beta -- dubbed from the lost copy, which already carried F2
- Y from beta -- dubbed from the lost copy, which already carried F2

**Equipment.** X and Z were dubbed on the same deck, which is why they share F6. W and Y were dubbed on a second deck. Shared equipment is not shared ancestry.

**What the evidence supports.** The evidence supports X and Y sharing an intermediate that W and Z do not descend from. It does not establish how many copies sat between, nor whether the intermediate still exists.

**What it does not.** Nothing here orders X against Y, and nothing distinguishes W from Z beyond their own features.
