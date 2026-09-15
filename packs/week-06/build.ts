#!/usr/bin/env node
// Builds the week 6 practice pack from one authored archetype and one list of
// variants, into public/packs/week-06/.
//
// Generating the witnesses rather than typing them is the point: a hand-typed
// set can disagree with the collation table it ships beside, and a student
// working from a table that does not match the texts is solving a different
// puzzle than the one anyone checked. `spec/week-06-pack.test.ts` re-derives
// the texts from the same inputs and fails if the published files drift.
//
// The archetype and the production log are published under reveal/ because
// this is practice feedback. The Stemma's own pack is a separate artefact and
// its key is not stored in this repository.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const HERE = dirname(new URL(import.meta.url).pathname);
const OUT = resolve("public/packs/week-06");

export interface Variant {
  id: number;
  line: number;
  carriers: string[];
  from: string;
  to: string;
  type: string;
  enteredAt: string;
  polygenetic: boolean;
  reasoning: string;
}

export interface Pack {
  pack: string;
  note: string;
  witnesses: string[];
  identicalText: string[][];
  identicalTextNote: string;
  variants: Variant[];
  supportedStemma: Record<string, unknown>;
}

export function loadPack(): { pack: Pack; archetype: string[] } {
  const pack = JSON.parse(readFileSync(resolve(HERE, "variants.json"), "utf8")) as Pack;
  const archetype = readFileSync(resolve(HERE, "archetype.txt"), "utf8").trimEnd().split("\n");
  return { pack, archetype };
}

/** The archetype body, indexed by the line numbers printed in the file. */
export function archetypeLines(archetype: string[]): Map<number, string> {
  const lines = new Map<number, string>();
  for (const row of archetype) {
    const match = row.match(/^(\d+)\s{1,2}(.*)$/);
    if (match) lines.set(Number(match[1]), match[2]);
  }
  return lines;
}

/** One witness's text, produced by applying only the variants it carries. */
export function witnessLines(
  witness: string,
  archetype: string[],
  variants: Variant[],
): Map<number, string> {
  const lines = archetypeLines(archetype);
  for (const variant of variants.filter((v) => v.carriers.includes(witness))) {
    const original = lines.get(variant.line);
    if (original === undefined) throw new Error(`variant ${variant.id}: no line ${variant.line}`);
    if (!original.includes(variant.from)) {
      throw new Error(`variant ${variant.id}: "${variant.from}" not found in line ${variant.line}`);
    }
    lines.set(variant.line, original.replace(variant.from, variant.to));
  }
  return lines;
}

/** What each witness reads at a variant point — with nothing marked original. */
export function collation(archetype: string[], variants: Variant[], witnesses: string[]) {
  return variants.map((variant) => {
    const readings: Record<string, string> = {};
    for (const witness of witnesses) {
      readings[witness] = variant.carriers.includes(witness) ? variant.to : variant.from;
    }
    return { point: variant.id, line: variant.line, readings };
  });
}

const render = (lines: Map<number, string>) =>
  [...lines.entries()]
    .sort(([a], [b]) => a - b)
    .map(([n, text]) => `${String(n).padStart(2)}  ${text}`)
    .join("\n");

function main(): void {
  const { pack, archetype } = loadPack();
  mkdirSync(`${OUT}/reveal`, { recursive: true });

  for (const witness of pack.witnesses) {
    writeFileSync(
      `${OUT}/witness-${witness.toLowerCase()}.txt`,
      `Ordinance of the Copy-House — witness ${witness}\n` +
        `Authored teaching copy. Not a transcription of a real manuscript.\n\n` +
        `${render(witnessLines(witness, archetype, pack.variants))}\n`,
    );
  }

  const rows = collation(archetype, pack.variants, pack.witnesses);
  writeFileSync(
    `${OUT}/collation.csv`,
    [
      ["point", "line", ...pack.witnesses].join(","),
      ...rows.map((row) =>
        [row.point, row.line, ...pack.witnesses.map((w) => `"${row.readings[w]}"`)].join(","),
      ),
    ].join("\n") + "\n",
  );

  writeFileSync(
    `${OUT}/README.txt`,
    `Ordinance of the Copy-House — week 6 practice pack
${pack.note}

Five witnesses: ${pack.witnesses.join(", ")}. Each is a copy of a text none of
them is. The original is not in this folder.

collation.csv lists the ${rows.length} points where the witnesses disagree, and
what each one reads at that point. Nothing in it tells you which reading came
first; working that out is the task. The same evidence is on the week 6 page as
a table, so you do not need to open these files to do the work.

${pack.identicalTextNote}

reveal/ holds the answer. Open it after you have a tree, not before.
`,
  );

  writeFileSync(`${OUT}/reveal/archetype.txt`, `${archetype.join("\n")}\n`);
  writeFileSync(
    `${OUT}/reveal/production-log.md`,
    `# Production log — week 6 practice pack

Authored teaching scenario. The witnesses were generated from
\`packs/week-06/archetype.txt\` by applying the variants below; they are not
transcriptions of a real manuscript tradition.

${pack.identicalTextNote}

| Point | Line | Type | Entered at | Carriers | Polygenetic |
|---|---|---|---|---|---|
${pack.variants
  .map(
    (v) =>
      `| ${v.id} | ${v.line} | ${v.type} | ${v.enteredAt} | ${v.carriers.join(", ")} | ${
        v.polygenetic ? "yes" : "no"
      } |`,
  )
  .join("\n")}

## Why each variant points where it does

${pack.variants.map((v) => `**Point ${v.id}** (${v.type}). ${v.reasoning}`).join("\n\n")}

## The stemma the evidence supports

\`\`\`json
${JSON.stringify(pack.supportedStemma, null, 2)}
\`\`\`
`,
  );

  console.log(
    `week-06 pack: ${pack.witnesses.length} witnesses, ${rows.length} collation points, reveal written`,
  );
}

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].split("/").pop()!)) main();
