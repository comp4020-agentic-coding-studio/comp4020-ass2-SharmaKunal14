#!/usr/bin/env node
// Builds the week 1 pack from one card and one list of reader edits.
//
// The worked answer is computed from the transcriptions rather than typed
// beside them. A worked answer that disagrees with its own evidence is the
// worst artefact on a teaching page: it is confidently wrong, and a student
// who trusts it learns the measurement incorrectly.
//
// Copies are supplied as two readers' transcriptions rather than as images.
// The measurement is a comparison of texts, so an image would add an eyesight
// test the course explicitly refuses to grade, and would make the accessible
// route a second-class version of the task instead of the task itself.
import { writePackIndex } from "../pack-index.ts";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const HERE = dirname(new URL(import.meta.url).pathname);
const OUT = resolve("public/packs/week-01");
const ILLEGIBLE = "·";

export interface Edit { line: string; from: string; to: string }
export interface Copy {
  id: string;
  label: string;
  generation: number;
  operation: string;
  readers: Record<string, Edit[]>;
}
export interface Pack {
  pack: string;
  note: string;
  countingRule: string;
  copies: Copy[];
}

export function loadPack(): { pack: Pack; card: Map<string, string>; heading: string } {
  const pack = JSON.parse(readFileSync(resolve(HERE, "transcriptions.json"), "utf8")) as Pack;
  const raw = readFileSync(resolve(HERE, "card.txt"), "utf8").trimEnd().split("\n");
  const card = new Map<string, string>();
  for (const row of raw) {
    const match = row.match(/^(L\d+)\s{2}(.*)$/);
    if (match) card.set(match[1], match[2]);
  }
  return { pack, card, heading: raw[0] };
}

/** One reader's transcription of one copy, as line label to text. */
export function transcription(card: Map<string, string>, edits: Edit[]): Map<string, string> {
  const lines = new Map(card);
  for (const edit of edits) {
    const original = lines.get(edit.line);
    if (original === undefined) throw new Error(`no line ${edit.line}`);
    if (edit.from.length !== edit.to.length) {
      throw new Error(`edit on ${edit.line} changes length: "${edit.from}" -> "${edit.to}"`);
    }
    if (!original.includes(edit.from)) {
      throw new Error(`"${edit.from}" not found in ${edit.line}`);
    }
    lines.set(edit.line, original.replace(edit.from, edit.to));
  }
  return lines;
}

export interface Count { misreadings: number; illegibles: number; total: number; positions: string[] }

/** The counting rule, applied. Deterministic: same inputs, same count, always. */
export function countErrors(card: Map<string, string>, read: Map<string, string>): Count {
  let misreadings = 0;
  let illegibles = 0;
  const positions: string[] = [];
  for (const [label, source] of card) {
    const got = read.get(label)!;
    if (got.length !== source.length) throw new Error(`${label}: lengths differ, rule cannot apply`);
    for (let i = 0; i < source.length; i++) {
      if (source[i] === got[i]) continue;
      positions.push(`${label}:${i + 1}`);
      if (got[i] === ILLEGIBLE) illegibles++;
      else misreadings++;
    }
  }
  return { misreadings, illegibles, total: misreadings + illegibles, positions };
}

const render = (heading: string, lines: Map<string, string>) =>
  [heading, ...[...lines.entries()].map(([label, text]) => `${label}  ${text}`)].join("\n");

function main(): void {
  const { pack, card, heading } = loadPack();
  mkdirSync(OUT, { recursive: true });
  writeFileSync(`${OUT}/card.txt`, `${render(heading, card)}\n`);
  writeFileSync(`${OUT}/counting-rule.txt`, `${pack.countingRule}\n`);

  const rows: string[] = [];
  for (const copy of pack.copies) {
    for (const [reader, edits] of Object.entries(copy.readers)) {
      const read = transcription(card, edits);
      writeFileSync(
        `${OUT}/${copy.id}-${reader.toLowerCase()}.txt`,
        `${copy.label} — transcribed by reader ${reader}\n` +
          `${pack.note}\n\n${render(heading, read)}\n`,
      );
      const count = countErrors(card, read);
      rows.push(
        [copy.id, copy.generation, reader, count.misreadings, count.illegibles, count.total].join(","),
      );
    }
  }
  writeFileSync(
    `${OUT}/worksheet.csv`,
    ["copy,generation,reader,misreadings,illegibles,total", ...rows].join("\n") + "\n",
  );

  const answer = pack.copies.map((copy) => {
    const per = Object.entries(copy.readers).map(([reader, edits]) => {
      const count = countErrors(card, transcription(card, edits));
      return { reader, ...count };
    });
    const agreed = per[0].positions.filter((p) => per.every((x) => x.positions.includes(p)));
    return { copy, per, agreed };
  });

  writeFileSync(
    `${OUT}/worked-answer.md`,
    `# Worked answer — week 1

Computed from the transcriptions in this folder by \`packs/week-01/build.ts\`,
not typed alongside them.

## The counting rule

${pack.countingRule}

## Counts

| Copy | Generation | Reader | Misreadings | Illegibles | Total |
|---|---:|---|---:|---:|---:|
${answer
  .flatMap(({ copy, per }) =>
    per.map(
      (p) =>
        `| ${copy.label} | ${copy.generation} | ${p.reader} | ${p.misreadings} | ${p.illegibles} | ${p.total} |`,
    ),
  )
  .join("\n")}

## Where the readers agreed and disagreed

${answer
  .map(({ copy, per, agreed }) => {
    const all = [...new Set(per.flatMap((p) => p.positions))];
    const disputed = all.filter((p) => !agreed.includes(p));
    return `**${copy.label}.** ${copy.operation}\n\n- Both readers found an error at: ${
      agreed.length ? agreed.join(", ") : "no position"
    }\n- Only one reader found an error at: ${
      disputed.length ? disputed.join(", ") : "no position"
    }`;
  })
  .join("\n\n")}

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
`,
  );

  writeFileSync(
    `${OUT}/README.txt`,
    `Copy room test card — week 1 pack
${pack.note}

card.txt is the source. Every copy in this folder is a transcription of a copy
of it, made by one of two readers, and every transcription is the same length as
the card so you can compare position by position without judgement calls.

counting-rule.txt is the rule. worksheet.csv is the blank shape of the table you
are producing. worked-answer.md has the answer and the argument; it is computed
from these files rather than typed beside them.

The card is deliberately built from characters that look like one another:
0 and O, 1 and l and I, 5 and S, 8 and B, 2 and Z, 6 and G, 9 and g. That is
what a legibility test card is for.
`,
  );

  writePackIndex(OUT, "Week 1 pack — copy room test card",
    "Every file here is plain text. Start with the card and the counting rule.",
    [
      { name: "card.txt", what: "the source card, four lines" },
      { name: "counting-rule.txt", what: "how to count an error" },
      { name: "worksheet.csv", what: "the blank table you are filling in" },
      { name: "control-r1.txt", what: "exact digital copy, reader R1" },
      { name: "control-r2.txt", what: "exact digital copy, reader R2" },
      { name: "g1-r1.txt", what: "generation 1, reader R1" },
      { name: "g1-r2.txt", what: "generation 1, reader R2" },
      { name: "g4-r1.txt", what: "generation 4, reader R1" },
      { name: "g4-r2.txt", what: "generation 4, reader R2" },
      { name: "g8-r1.txt", what: "generation 8, reader R1" },
      { name: "g8-r2.txt", what: "generation 8, reader R2" },
      { name: "worked-answer.md", what: "the answer and the argument — open it after your own table" },
      { name: "README.txt", what: "what is in this folder" },
    ]);

  console.log(`week-01 pack: ${rows.length} transcriptions, worksheet and worked answer written`);
}

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].split("/").pop()!)) main();
