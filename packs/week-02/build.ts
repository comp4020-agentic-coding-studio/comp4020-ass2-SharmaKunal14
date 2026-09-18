#!/usr/bin/env node
// Builds the week 2 pack from one feature list.
//
// The student-facing evidence is a feature table: where each feature sits, and
// which of the source and four copies carry it. Nothing in it says which
// features are diagnostic, what kind of thing each one is, or what the copies'
// parents are -- those live in the reveal. Deciding which shared feature is
// evidence of ancestry is the task.
//
// Audio is deliberately absent. The inference runs on the table, so supplying
// clips would make the non-listening route a lesser version of the task rather
// than the task itself, and would let a student's hearing affect their mark.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { writePackIndex } from "../pack-index.ts";

const HERE = dirname(new URL(import.meta.url).pathname);
const OUT = resolve("public/packs/week-02");

export interface Feature {
  id: string;
  name: string;
  location: string;
  kind: string;
  inSource: boolean;
  carriers: string[];
  explanation: string;
  groupsAncestry: boolean;
}
export interface Pack {
  pack: string;
  note: string;
  source: { id: string; label: string; description: string };
  copies: { id: string; label: string }[];
  features: Feature[];
  trueStructure: Record<string, unknown>;
}

export function loadPack(): Pack {
  return JSON.parse(readFileSync(resolve(HERE, "features.json"), "utf8")) as Pack;
}

/** Presence of each feature in the source and every copy -- the whole evidence. */
export function presence(pack: Pack) {
  const columns = [pack.source.id, ...pack.copies.map((c) => c.id)];
  return pack.features.map((feature) => ({
    id: feature.id,
    name: feature.name,
    location: feature.location,
    row: columns.map((col) =>
      col === pack.source.id
        ? feature.inSource
        : feature.carriers.includes(col),
    ),
    columns,
  }));
}

function main(): void {
  const pack = loadPack();
  mkdirSync(`${OUT}/reveal`, { recursive: true });
  const rows = presence(pack);
  const columns = rows[0].columns;

  writeFileSync(
    `${OUT}/feature-table.csv`,
    [
      ["feature", "location", ...columns].join(","),
      ...rows.map((r) =>
        [r.id, r.location, ...r.row.map((present) => (present ? "present" : "absent"))].join(","),
      ),
    ].join("\n") + "\n",
  );

  writeFileSync(
    `${OUT}/features.txt`,
    `Feature list -- week 2\n${pack.note}\n\n` +
      pack.features.map((f) => `${f.id}  ${f.location.padEnd(12)}  ${f.name}`).join("\n") +
      "\n\nWhere each feature appears is in feature-table.csv.\n",
  );

  for (const item of [pack.source, ...pack.copies]) {
    const carried = rows.filter((r) => r.row[columns.indexOf(item.id)]);
    writeFileSync(
      `${OUT}/${item.id.toLowerCase()}.txt`,
      `${item.label}\n${pack.note}\n\n` +
        ("description" in item ? `${item.description}\n\n` : "") +
        `Features present:\n` +
        carried.map((r) => `  ${r.id}  ${r.location.padEnd(12)}  ${r.name}`).join("\n") +
        "\n",
    );
  }

  writeFileSync(
    `${OUT}/README.txt`,
    `Audio feature pack -- week 2
${pack.note}

One source recording and four copies of it. You are not given the recordings:
the evidence is the feature table, and the inference runs on the table. Supplying
clips would let hearing affect the answer, and this task is not about hearing.

feature-table.csv is the evidence -- six features, and whether each appears in the
source and in each copy. features.txt lists what the features are and where they
sit. s.txt, w.txt, x.txt, y.txt and z.txt say the same thing per recording.

Nothing in these files says which features matter or where any copy came from.
Working that out is the task.

reveal/ holds the construction log. Open it after you have an answer.
`,
  );

  writeFileSync(
    `${OUT}/reveal/construction-log.md`,
    `# Construction log -- week 2 pack

${pack.note}

## What each feature is, and why

| Feature | Location | Kind | Present in | In the source |
|---|---|---|---|---|
${pack.features
  .map(
    (f) =>
      `| ${f.id} -- ${f.name} | ${f.location} | ${f.kind} | ${f.carriers.join(", ")} | ${
        f.inSource ? "yes" : "no"
      } |`,
  )
  .join("\n")}

${pack.features.map((f) => `**${f.id}.** ${f.explanation}`).join("\n\n")}

## How the copies were actually made

${(pack.trueStructure.edges as { parent: string; child: string; how: string }[])
  .map((e) => `- ${e.child} from ${e.parent} -- ${e.how}`)
  .join("\n")}

**Equipment.** ${pack.trueStructure.equipment}

**What the evidence supports.** ${pack.trueStructure.supported}

**What it does not.** ${pack.trueStructure.unsupported}
`,
  );

  writePackIndex(
    OUT,
    "Week 2 pack -- one source, four copies",
    "The evidence is a table of features, not a set of recordings. Start with the feature table.",
    [
      { name: "feature-table.csv", what: "the evidence: six features against the source and four copies" },
      { name: "features.txt", what: "what each feature is and where it sits" },
      { name: "s.txt", what: "the source recording" },
      { name: "w.txt", what: "copy W" },
      { name: "x.txt", what: "copy X" },
      { name: "y.txt", what: "copy Y" },
      { name: "z.txt", what: "copy Z" },
      { name: "README.txt", what: "what is in this folder" },
    ],
  );

  console.log(`week-02 pack: ${pack.features.length} features, ${pack.copies.length} copies, reveal written`);
}

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].split("/").pop()!)) main();
