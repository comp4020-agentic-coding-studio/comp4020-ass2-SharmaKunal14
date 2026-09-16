#!/usr/bin/env node
// Builds the week 4 pack. The student gets the observations, two candidate
// route cards, the tolerance, and a menu of further evidence with availability
// marked honestly — including two items that do not exist.
//
// Route predictions are withheld: comparing a prediction against the
// observation is the check the student performs. The reveal holds which route
// produced the artefact, which evidence settles it, and which reasonable
// requests do not.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { writePackIndex } from "../pack-index.ts";

const HERE = dirname(new URL(import.meta.url).pathname);
const OUT = resolve("public/packs/week-04");

export interface Observation {
  width: number; height: number; fileSizeKb: number;
  qualityEstimate: number; chromaSubsampling: string; exif: string;
}
export interface Route { id: string; label: string; steps: string[]; predicted: Observation }
export interface Evidence {
  id: string; item: string; available: boolean; discriminates: boolean;
  why: string; unavailableBecause?: string;
}
export interface Pack {
  pack: string; note: string; source: string;
  artefact: { id: string; label: string; provenance: string };
  tolerance: { fileSizeKb: number; qualityEstimate: number; note: string };
  observed: Observation; routes: Route[]; evidenceMenu: Evidence[];
  reveal: Record<string, string>;
}

export const loadPack = (): Pack =>
  JSON.parse(readFileSync(resolve(HERE, "routes.json"), "utf8")) as Pack;

/** Whether a route's prediction is indistinguishable from the observation. */
export function compatible(pack: Pack, route: Route): boolean {
  const o = pack.observed;
  const p = route.predicted;
  return (
    p.width === o.width &&
    p.height === o.height &&
    p.chromaSubsampling === o.chromaSubsampling &&
    p.exif === o.exif &&
    Math.abs(p.fileSizeKb - o.fileSizeKb) <= pack.tolerance.fileSizeKb &&
    Math.abs(p.qualityEstimate - o.qualityEstimate) <= pack.tolerance.qualityEstimate
  );
}

function main(): void {
  const pack = loadPack();
  mkdirSync(`${OUT}/reveal`, { recursive: true });

  writeFileSync(
    `${OUT}/observations.csv`,
    ["property,value",
      `width_px,${pack.observed.width}`,
      `height_px,${pack.observed.height}`,
      `file_size_kb,${pack.observed.fileSizeKb}`,
      `quality_estimate,${pack.observed.qualityEstimate}`,
      `chroma_subsampling,${pack.observed.chromaSubsampling}`,
      `exif,${pack.observed.exif}`,
    ].join("\n") + "\n",
  );

  writeFileSync(
    `${OUT}/tolerance.txt`,
    `Observation tolerance\n${pack.note}\n\n` +
      `File size: within ${pack.tolerance.fileSizeKb} KB.\n` +
      `Quality estimate: within ${pack.tolerance.qualityEstimate} points.\n` +
      `Dimensions, chroma subsampling and EXIF presence: must match exactly.\n\n` +
      `${pack.tolerance.note}\n`,
  );

  writeFileSync(
    `${OUT}/route-cards.txt`,
    `Candidate routes\n${pack.note}\n\n` +
      `Two processing histories someone has proposed for ${pack.artefact.label}.\n` +
      `Whether either fits the observations is for you to work out; the predicted\n` +
      `measurements are not supplied, because deriving and checking them is the task.\n\n` +
      pack.routes
        .map((r) => `${r.label}\n${r.steps.map((s, i) => `  ${i + 1}. ${s}`).join("\n")}`)
        .join("\n\n") +
      `\n\nSource: ${pack.source}\nArtefact: ${pack.artefact.id} — provenance ${pack.artefact.provenance}\n`,
  );

  writeFileSync(
    `${OUT}/evidence-menu.csv`,
    ["id,item,status",
      ...pack.evidenceMenu.map((e) =>
        `${e.id},"${e.item}",${e.available ? "available" : `unavailable — ${e.unavailableBecause}`}`,
      ),
    ].join("\n") + "\n",
  );

  writeFileSync(
    `${OUT}/README.txt`,
    `Two routes, one output — week 4 pack\n${pack.note}\n\n` +
      `observations.csv is everything currently known about ${pack.artefact.label}.\n` +
      `tolerance.txt says how close two things have to be before this evidence\n` +
      `stops being able to tell them apart.\n\n` +
      `route-cards.txt gives two proposed processing histories. Predicted\n` +
      `measurements are not supplied: working them out and checking them against\n` +
      `the observations is the task.\n\n` +
      `evidence-menu.csv lists further evidence you could ask for. Two of the five\n` +
      `items do not exist, and their absence is marked. Choose one available item\n` +
      `and say, before you look at it, what result would separate the routes.\n\n` +
      `Not every available item will separate them. That is not a flaw in the pack.\n\n` +
      `reveal/ holds what actually happened. Open it after you have written your\n` +
      `ambiguity report.\n`,
  );

  writeFileSync(
    `${OUT}/reveal/analysis.md`,
    `# Analysis — week 4\n\n${pack.note}\n\n## Why both routes fit\n\n` +
      `| Route | Predicted size (KB) | Off by | Predicted quality | Off by | Compatible |\n|---|---:|---:|---:|---:|---|\n` +
      pack.routes
        .map(
          (r) =>
            `| ${r.label} | ${r.predicted.fileSizeKb} | ${Math.abs(r.predicted.fileSizeKb - pack.observed.fileSizeKb)} | ${r.predicted.qualityEstimate} | ${Math.abs(r.predicted.qualityEstimate - pack.observed.qualityEstimate)} | ${compatible(pack, r) ? "yes" : "no"} |`,
        )
        .join("\n") +
      `\n\n${pack.reveal.whyBothFit}\n\n## The evidence menu\n\n` +
      `| Item | Status | Separates the routes |\n|---|---|---|\n` +
      pack.evidenceMenu
        .map(
          (e) =>
            `| ${e.id} — ${e.item} | ${e.available ? "available" : "unavailable"} | ${e.discriminates ? "yes" : "no"} |`,
        )
        .join("\n") +
      `\n\n` +
      pack.evidenceMenu.map((e) => `**${e.id}.** ${e.why}`).join("\n\n") +
      `\n\n## What happened\n\n${pack.reveal.truth}\n\n` +
      `**What resolves it.** ${pack.reveal.whatResolvesIt}\n\n` +
      `**What does not.** ${pack.reveal.whatDoesNot}\n\n` +
      `**Limits.** ${pack.reveal.limits}\n`,
  );

  writePackIndex(OUT, "Week 4 pack — two routes, one output",
    "Two proposed histories and one set of observations. Decide whether the observations can tell them apart.",
    [
      { name: "observations.csv", what: "everything currently known about the output" },
      { name: "tolerance.txt", what: "how close counts as indistinguishable, and what that does not mean" },
      { name: "route-cards.txt", what: "the two proposed processing histories" },
      { name: "evidence-menu.csv", what: "further evidence you could ask for, with two items marked absent" },
      { name: "README.txt", what: "what is in this folder" },
      { name: "reveal/analysis.md", what: "what actually happened — open it after your report" },
    ]);

  console.log(`week-04 pack: ${pack.routes.length} routes, ${pack.evidenceMenu.length} evidence items, reveal written`);
}

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].split("/").pop()!)) main();
