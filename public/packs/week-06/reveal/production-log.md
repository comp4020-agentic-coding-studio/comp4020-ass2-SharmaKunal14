# Production log -- week 6 practice pack

Authored teaching scenario. The witnesses were generated from
`packs/week-06/archetype.txt` by applying the variants below; they are not
transcriptions of a real manuscript tradition.

D and E differ in hand and layout and carry different marginalia. Their text agrees at every point.

| Point | Line | Type | Entered at | Carriers | Polygenetic |
|---|---|---|---|---|---|
| 1 | 4 | substitution | A | A | no |
| 2 | 7 | haplography | alpha | B, C, D, E | no |
| 3 | 12 | homoeoteleuton | beta | C, D, E | no |
| 4 | 6 | normalisation | A and C independently | A, C | yes |
| 5 | 2 | dittography | B | B | no |
| 6 | 5 | omission | C | C | no |
| 7 | 8 | substitution | gamma-or-one-of-D-E | D, E | no |

## Why each variant points where it does

**Point 1** (substitution). A's own innovation. Singleton, so it carries no ancestry information beyond showing A is not a descendant of any other witness here.

**Point 2** (haplography). The eye skipped from the first 'shall rest' to the second, dropping the text between. Loss between repeated words is a common scribal failure; the reverse -- a scribe inserting 'and shall rest' -- has no mechanism. So the longer reading is original and the four carriers share an ancestor A does not descend from.

**Point 3** (homoeoteleuton). Eye-skip between two occurrences of 'shall keep'. The omission destroys the rule's point, which is that the house keeps both; no scribe would add that clause back by chance. Its three carriers are a subgroup inside variant 2's four.

**Point 4** (normalisation). Modernising an archaic idiom is the commonest kind of unconscious scribal change, and two scribes make it independently all the time. Its carriers cannot share an ancestor: any common ancestor of A and C lies at or above the archetype, and a reading there would appear in B, D and E as well. Contamination -- A's scribe consulting C's branch for this line -- cannot be excluded, only judged less likely than independent modernisation.

**Point 5** (dittography). B's own innovation, and obviously secondary: the repetition is meaningless.

**Point 6** (omission). C's own innovation. Dropping 'not' reverses the instruction and contradicts the next line, so the direction of error is not in doubt.

**Point 7** (substitution). Shared only by D and E. Direction is less obvious here than for variants 2 and 3, which is honest: it groups D and E but does not order them.

## The stemma the evidence supports

```json
{
  "archetype": "withheld",
  "edges": [
    {
      "parent": "archetype",
      "child": "A",
      "evidence": "A lacks variant 2"
    },
    {
      "parent": "archetype",
      "child": "alpha",
      "evidence": "variant 2, shared by B C D E"
    },
    {
      "parent": "alpha",
      "child": "B",
      "evidence": "B has variant 2 but lacks variant 3"
    },
    {
      "parent": "alpha",
      "child": "beta",
      "evidence": "variant 3, shared by C D E"
    },
    {
      "parent": "beta",
      "child": "C",
      "evidence": "C has variant 3 and its own variant 6"
    },
    {
      "parent": "beta",
      "child": "D-E group",
      "evidence": "variant 7, shared only by D and E"
    }
  ],
  "unresolved": "Within the D-E group the evidence cannot choose between D copied from E, E copied from D, and both copied from a lost sibling. Their text is identical at every variant point.",
  "trap": "Variant 4 suggests kinship between A and C. It is ruled out by the distribution of variants 2 and 3, and explained by the kind of error it is."
}
```
