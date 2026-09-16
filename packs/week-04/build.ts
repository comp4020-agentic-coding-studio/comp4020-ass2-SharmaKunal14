#!/usr/bin/env node
// Builds the week 4 pack.
//
// Two earlier versions of this pack were unusable, and the reasons are worth
// recording next to the fix.
//
// The route predictions used to be withheld, on the reasoning that deriving
// them was the task. It was not a task anyone could perform: there is no
// formula, encoder or lookup table in the pack from which a file size could be
// calculated. Weeks 1 and 3 withhold results a student can compute from a
// stated rule and supplied inputs; here no such rule exists, so withholding
// made the activity impossible. The predictions are now published and the
// student's work is applying the tolerance to the differences — which reveals
// nothing, because both routes fit.
//
// The obtainable evidence items used to exist only as descriptions in the
// reveal. A student could not choose one item, predict its outcome, inspect it
// and revise: they could only open the whole answer. Each obtainable item now
// ships as its own file under evidence/, carrying its result and nothing else.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { writePackIndex } from "../pack-index.ts";

const HERE = dirname(new URL(import.meta.url).pathname);
const OUT = resolve("public/packs/week-04");

export interface Observation {
  width: number; height: number; fileSizeKb: number;
  chromaSubsampling: string; exif: string;
}
export interface Route { id: string; label: string; steps: string[]; predicted: Observation }
export interface Evidence {
  id: string; item: string; available: boolean; discriminates: boolean;
  why: string; result?: string; unavailableBecause?: string;
}
export interface Pack {
  pack: string; note: string; source: string;
  artefact: { id: string; label: string; provenance: string };
  tolerance: { fileSizeKb: number; note: string; exactFields: string[] };
  observed: Observation; routes: Route[]; evidenceMenu: Evidence[];
  /** The step both routes end with, so the final operation cannot separate them. */
  sharedFinalStep: string;
  sharedFinalStepNote: string;
  /** Settings appearing in one route and not the other; barred from any item
   *  shown to a student as non-discriminating. */
  distinguishingValues: string[];
  distinguishingValuesNote: string;
  reveal: Record<string, string>;
}

export const loadPack = (): Pack =>
  JSON.parse(readFileSync(resolve(HERE, "routes.json"), "utf8")) as Pack;

/** Whether a route's prediction is indistinguishable from the observation. */
export function compatible(pack: Pack, route: Route): boolean {
  const o = pack.observed as unknown as Record<string, unknown>;
  const p = route.predicted as unknown as Record<string, unknown>;
  const exact = pack.tolerance.exactFields.every((f) => p[f] === o[f]);
  return exact && Math.abs(route.predicted.fileSizeKb - pack.observed.fileSizeKb) <= pack.tolerance.fileSizeKb;
}

/** The evidence file a student opens when they request one item. */
export const evidenceFile = (item: Evidence): string => `evidence/${item.id.toLowerCase()}.txt`;

function main(): void {
  const pack = loadPack();
  mkdirSync(`${OUT}/reveal`, { recursive: true });
  mkdirSync(`${OUT}/evidence`, { recursive: true });

  writeFileSync(
    `${OUT}/observations.csv`,
    ["property,observed,route_a_predicts,route_b_predicts",
      ...(["width", "height", "fileSizeKb", "chromaSubsampling", "exif"] as const).map((f) =>
        [f, pack.observed[f], ...pack.routes.map((r) => r.predicted[f])].join(","),
      ),
    ].join("\n") + "\n",
  );

  writeFileSync(
    `${OUT}/tolerance.txt`,
    `Observation tolerance — a scenario rule\n${pack.note}\n\n` +
      `File size: within ${pack.tolerance.fileSizeKb} KB.\n` +
      `${pack.tolerance.exactFields.join(", ")}: must match exactly.\n\n` +
      `${pack.tolerance.note}\n`,
  );

  writeFileSync(
    `${OUT}/route-cards.txt`,
    `Candidate routes\n${pack.note}\n\n` +
      `Two processing histories someone has proposed for ${pack.artefact.label}.\n` +
      `What each one predicts is in observations.csv, beside what was observed.\n` +
      `Your job is to apply the tolerance and say whether the observations can\n` +
      `tell the two routes apart.\n\n` +
      pack.routes
        .map((r) => `${r.label}\n${r.steps.map((s, i) => `  ${i + 1}. ${s}`).join("\n")}`)
        .join("\n\n") +
      `\n\nSource: ${pack.source}\nArtefact: ${pack.artefact.id} — provenance ${pack.artefact.provenance}\n`,
  );

  writeFileSync(
    `${OUT}/evidence-menu.csv`,
    ["id,item,status,open",
      ...pack.evidenceMenu.map((e) =>
        [
          e.id,
          `"${e.item}"`,
          e.available ? "available" : `"unavailable — ${e.unavailableBecause}"`,
          e.available ? evidenceFile(e) : "",
        ].join(","),
      ),
    ].join("\n") + "\n",
  );

  for (const item of pack.evidenceMenu.filter((e) => e.available)) {
    writeFileSync(
      `${OUT}/${evidenceFile(item)}`,
      `${item.id} — ${item.item}\n${pack.note}\n\n${item.result}\n\n` +
        `This file contains the result of this request only. What it means for the\n` +
        `two routes is for you to say; the other requests are in their own files.\n`,
    );
  }

  writeFileSync(
    `${OUT}/README.txt`,
    `Two routes, one output — week 4 pack\n${pack.note}\n\n` +
      `observations.csv lists what was observed about ${pack.artefact.label} and what\n` +
      `each proposed route predicts. tolerance.txt gives the scenario rule for how\n` +
      `close counts as indistinguishable.\n\n` +
      `route-cards.txt gives the two proposed processing histories as written steps.\n\n` +
      `evidence-menu.csv lists further evidence you could request. Two of the five\n` +
      `items do not exist, and their absence is marked with a reason. The three that\n` +
      `do exist are in evidence/, one file each. Choose one, write down what result\n` +
      `would favour which route, and only then open that file.\n\n` +
      `Not every available item separates the routes. That is not a flaw in the pack,\n` +
      `and an unresolved report that says what it asked for and what it learned is a\n` +
      `correct answer.\n\n` +
      `reveal/ holds what actually happened. Open it after your report.\n`,
  );

  writeFileSync(
    `${OUT}/reveal/analysis.md`,
    `# Analysis — week 4\n\n${pack.note}\n\n## Why both routes fit\n\n` +
      `| Route | Predicted size (KB) | Off by | Exact fields match | Compatible |\n|---|---:|---:|---|---|\n` +
      pack.routes
        .map(
          (r) =>
            `| ${r.label} | ${r.predicted.fileSizeKb} | ${Math.abs(r.predicted.fileSizeKb - pack.observed.fileSizeKb)} | ${pack.tolerance.exactFields.every((f) => (r.predicted as unknown as Record<string, unknown>)[f] === (pack.observed as unknown as Record<string, unknown>)[f]) ? "yes" : "no"} | ${compatible(pack, r) ? "yes" : "no"} |`,
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
    "Two proposed histories, one set of observations, and three requests you can actually make. Decide whether the observations can tell the routes apart.",
    [
      { name: "observations.csv", what: "what was observed, and what each route predicts" },
      { name: "tolerance.txt", what: "the scenario rule for indistinguishable, and what it does not mean" },
      { name: "route-cards.txt", what: "the two proposed processing histories" },
      { name: "evidence-menu.csv", what: "the five requests, three of which have a file to open" },
      ...pack.evidenceMenu.filter((e) => e.available).map((e) => ({
        name: evidenceFile(e),
        what: `${e.item.toLowerCase()} — open only after you have committed to what it would show`,
      })),
      { name: "README.txt", what: "what is in this folder" },
      { name: "reveal/analysis.md", what: "what actually happened — open it after your report" },
    ]);

  console.log(
    `week-04 pack: ${pack.routes.length} routes with published predictions, ` +
      `${pack.evidenceMenu.filter((e) => e.available).length} evidence files, reveal written`,
  );
}

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].split("/").pop()!)) main();
