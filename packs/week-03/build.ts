#!/usr/bin/env node
// Builds the week 3 pack. Students get the raw per-band deviations for every
// condition and one comparison already drawn for them -- the confounded one.
// The sums are not published: computing them is the measurement, and a table
// that arrives totalled is the answer to the arithmetic half of the task.
//
// Which comparison is confounded, and what the corrected ones show, live in
// the reveal. Spotting the confound is the week.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { writePackIndex } from "../pack-index.ts";

const HERE = dirname(new URL(import.meta.url).pathname);
const OUT = resolve("public/packs/week-03");

export interface Condition {
  id: string; label: string; bitrate: number | null; cycles: number;
  operations: number; deviations: number[]; note?: string;
}
export interface Comparison {
  id: string; label: string; left: string; right: string; claim: string; published: boolean;
}
export interface Pack {
  pack: string; note: string; source: string;
  measure: { name: string; unit: string; unitNote: string; howTo: string; repeatability: number; repeatabilityNote: string };
  bands: string[]; conditions: Condition[]; comparisons: Comparison[];
  reveal: Record<string, string>;
}

export const loadPack = (): Pack =>
  JSON.parse(readFileSync(resolve(HERE, "experiment.json"), "utf8")) as Pack;

/** The score: add the eight band differences. An invented composite, not a dB quantity. */
export const total = (c: Condition): number =>
  Math.round(c.deviations.reduce((a, b) => a + b, 0) * 10) / 10;

/** Which of the two experimental variables a comparison changes. */
export function varied(pack: Pack, comparison: Comparison): string[] {
  const by = Object.fromEntries(pack.conditions.map((c) => [c.id, c]));
  const l = by[comparison.left];
  const r = by[comparison.right];
  return (["bitrate", "cycles"] as const).filter((k) => l[k] !== r[k]);
}

export function difference(pack: Pack, comparison: Comparison): number {
  const by = Object.fromEntries(pack.conditions.map((c) => [c.id, c]));
  return Math.round((total(by[comparison.right]) - total(by[comparison.left])) * 10) / 10;
}

function main(): void {
  const pack = loadPack();
  mkdirSync(`${OUT}/reveal`, { recursive: true });

  writeFileSync(
    `${OUT}/band-deviations.csv`,
    [
      ["condition", "bitrate_kbps", "encoding_cycles", "copy_operations", ...pack.bands].join(","),
      ...pack.conditions.map((c) =>
        [c.id, c.bitrate ?? "none", c.cycles, c.operations, ...c.deviations].join(","),
      ),
    ].join("\n") + "\n",
  );

  writeFileSync(
    `${OUT}/measure.txt`,
    `${pack.measure.name} (${pack.measure.unit})\n${pack.note}\n\n` +
      `${pack.measure.unitNote}\n\n${pack.measure.howTo}\n\nRepeatability: ${pack.measure.repeatability} ${pack.measure.unit}.\n` +
      `${pack.measure.repeatabilityNote}\n\nSource: ${pack.source}\n`,
  );

  const shown = pack.comparisons.filter((c) => c.published);
  writeFileSync(
    `${OUT}/the-comparison.txt`,
    `${shown.map((c) => `${c.label}\n\n  ${c.left}  versus  ${c.right}\n\n  Claim made from it: "${c.claim}"`).join("\n\n")}\n\n` +
      `The band deviations for both conditions are in band-deviations.csv, along\n` +
      `with four other conditions that were run at the same time.\n`,
  );

  writeFileSync(
    `${OUT}/protocol-template.txt`,
    `Protocol\n\n` +
      `Independent variable (the one thing you change):\n\nOutcome measure:\n\n` +
      `Control:\n\nHeld fixed:\n\nPrediction, written before you look at the results:\n\n` +
      `Result:\n\nConclusion, limited to the source, settings and measure you used:\n\n` +
      `What this does not establish:\n`,
  );

  writeFileSync(
    `${OUT}/README.txt`,
    `Re-encoding experiment -- week 3 pack\n${pack.note}\n\n` +
      `the-comparison.txt is the comparison you have been handed, and the claim\n` +
      `someone drew from it. band-deviations.csv has the raw numbers for that\n` +
      `comparison and for four other conditions run at the same time.\n\n` +
      `measure.txt says how to turn eight band deviations into one number, and how\n` +
      `much the measurement varies when you repeat it. The totals are not supplied:\n` +
      `computing them is the measurement.\n\n` +
      `protocol-template.txt is the shape of what you are writing.\n\n` +
      `reveal/ says which comparison is sound and which is not. Open it after you\n` +
      `have written a protocol and a prediction.\n`,
  );

  writeFileSync(
    `${OUT}/reveal/analysis.md`,
    `# Analysis -- week 3\n\n${pack.note}\n\n## Totals\n\n` +
      `| Condition | Bitrate | Cycles | Deviation score |\n|---|---|---:|---:|\n` +
      pack.conditions
        .map((c) => `| ${c.label} | ${c.bitrate ?? "none"} | ${c.cycles} | ${total(c)} |`)
        .join("\n") +
      `\n\n## Comparisons\n\n| Comparison | Varies | Difference (score) | Verdict |\n|---|---|---:|---|\n` +
      pack.comparisons
        .map((m) => {
          const d = difference(pack, m);
          const v = varied(pack, m);
          const verdict =
            v.length > 1
              ? "confounded -- the difference cannot be attributed to either variable"
              : Math.abs(d) <= pack.measure.repeatability
                ? `non-detection -- at or below the ${pack.measure.repeatability}-point repeatability of a pairwise difference`
                : "isolates one variable, and the difference exceeds the repeatability, so it is detectable in this scenario";
          return `| ${m.label} (${m.left} vs ${m.right}) | ${v.join(" and ")} | ${d} | ${verdict} |`;
        })
        .join("\n") +
      `\n\n**The confound.** ${pack.reveal.confound}\n\n**Corrected.** ${pack.reveal.corrected}\n\n` +
      `**Conclusion.** ${pack.reveal.conclusion}\n\n**Limits.** ${pack.reveal.limits}\n`,
  );

  writePackIndex(OUT, "Week 3 pack -- did re-encoding cause it?",
    "You are given a comparison and a claim drawn from it. Decide whether the comparison supports the claim.",
    [
      { name: "the-comparison.txt", what: "the comparison you were handed, and the claim" },
      { name: "band-deviations.csv", what: "raw per-band numbers for six conditions" },
      { name: "measure.txt", what: "how to compute the measure, and how much it varies" },
      { name: "protocol-template.txt", what: "the shape of what you are writing" },
      { name: "README.txt", what: "what is in this folder" },
    ],
    {
      sessionSlug: "03-perceptual",
      files: [
        {
          name: "analysis.md",
          what: "the analysis and argument -- locks until you commit a prediction",
        },
      ],
    });

  console.log(`week-03 pack: ${pack.conditions.length} conditions, ${shown.length} comparison published, reveal written`);
}

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].split("/").pop()!)) main();
