#!/usr/bin/env node
// Builds the week 9 pack: a small categorical resampling model. A fixed
// six-category distribution, with one rare category, is resampled round by
// round under three conditions (baseline, fully recursive, recursive with
// retained original data), three fixed seeds each. Only sampling noise
// compounding through re-estimation is modelled -- see model.json's note and
// reveal.limitations for what is deliberately left out.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { writePackIndex } from "../pack-index.ts";

const HERE = dirname(new URL(import.meta.url).pathname);
const OUT = resolve("public/packs/week-09");

export interface Condition { id: string; label: string; description: string }
export interface Model {
  pack: string; note: string; categories: string[]; trueProbabilities: number[];
  rareCategory: string; roundSize: number; rounds: number; seeds: number[];
  conditions: Condition[];
  reveal: { summary: string; limitations: string; unjustifiableConclusion: string };
}

export const loadPack = (): Model =>
  JSON.parse(readFileSync(resolve(HERE, "model.json"), "utf8")) as Model;

/** mulberry32: small deterministic PRNG, seed -> reproducible stream. */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Draws n categorical samples from a probability vector (must sum to ~1). */
function draw(rng: () => number, categories: string[], probs: number[], n: number): string[] {
  const cum: number[] = [];
  probs.reduce((acc, p, i) => (cum[i] = acc + p), 0);
  const out: string[] = [];
  for (let i = 0; i < n; i++) {
    const r = rng();
    let idx = cum.findIndex((c) => r < c);
    if (idx === -1) idx = categories.length - 1;
    out.push(categories[idx]);
  }
  return out;
}

/** Empirical frequency of each category in a sample, in category order. */
export function counts(categories: string[], sample: string[]): number[] {
  return categories.map((c) => sample.filter((s) => s === c).length);
}

function normalise(freqs: number[]): number[] {
  const total = freqs.reduce((a, b) => a + b, 0);
  return total === 0 ? freqs.map(() => 0) : freqs.map((f) => f / total);
}

/**
 * Runs one condition for one seed across all rounds, returning the sample
 * (array of category labels) drawn in each round, round 0 included as the
 * true-distribution draw every condition starts from.
 */
export function simulateRun(model: Model, condition: string, seed: number): string[][] {
  const rng = mulberry32(seed);
  const rounds: string[][] = [draw(rng, model.categories, model.trueProbabilities, model.roundSize)];
  for (let r = 1; r <= model.rounds; r++) {
    const prev = rounds[r - 1];
    let probs: number[];
    if (condition === "baseline") {
      probs = model.trueProbabilities;
    } else if (condition === "full-recursive") {
      probs = normalise(counts(model.categories, prev));
    } else {
      const fresh = draw(rng, model.categories, model.trueProbabilities, model.roundSize);
      const mixedCounts = counts(model.categories, prev).map((c, i) => c + counts(model.categories, fresh)[i]);
      probs = normalise(mixedCounts);
    }
    rounds.push(draw(rng, model.categories, probs, model.roundSize));
  }
  return rounds;
}

function main(): void {
  const model = loadPack();
  mkdirSync(`${OUT}/reveal`, { recursive: true });

  type Row = { condition: string; seed: number; round: number; category: string; count: number };
  const rows: Row[] = [];
  for (const cond of model.conditions) {
    for (const seed of model.seeds) {
      const runRounds = simulateRun(model, cond.id, seed);
      runRounds.forEach((sample, round) => {
        const cs = counts(model.categories, sample);
        model.categories.forEach((cat, i) => rows.push({ condition: cond.id, seed, round, category: cat, count: cs[i] }));
      });
    }
  }

  writeFileSync(
    `${OUT}/settings.json`,
    JSON.stringify(
      {
        categories: model.categories, trueProbabilities: model.trueProbabilities, rareCategory: model.rareCategory,
        roundSize: model.roundSize, rounds: model.rounds, seeds: model.seeds, conditions: model.conditions,
        method: "mulberry32(seed); round 0 draws roundSize samples from trueProbabilities; each condition then defines how later rounds' sampling distribution is estimated from prior samples (see each condition's description).",
      },
      null, 2,
    ) + "\n",
  );

  writeFileSync(
    `${OUT}/counts.csv`,
    ["condition,seed,round,category,count"]
      .concat(rows.map((r) => [r.condition, r.seed, r.round, r.category, r.count].join(",")))
      .join("\n") + "\n",
  );

  const rareCounts = rows.filter((r) => r.category === model.rareCategory);
  writeFileSync(
    `${OUT}/rare-category-retention.csv`,
    ["condition,seed,round,count_of_" + model.rareCategory]
      .concat(rareCounts.map((r) => [r.condition, r.seed, r.round, r.count].join(",")))
      .join("\n") + "\n",
  );

  // Retention rate: across the 3 seeds, the fraction of runs where the rare
  // category's count is still > 0 at that round.
  const retainedSeeds = (condId: string, round: number): number => {
    const vals = rareCounts.filter((r) => r.condition === condId && r.round === round).map((r) => r.count);
    return vals.filter((v) => v > 0).length;
  };

  const W = 560, H = 360, PAD = 48;
  const x = (r: number) => PAD + (r / model.rounds) * (W - 2 * PAD);
  const yMax = Math.max(1, ...rareCounts.map((r) => r.count));
  const y = (c: number) => H - PAD - (c / yMax) * (H - 2 * PAD);
  const colors: Record<string, string> = { baseline: "#1b7a3d", "full-recursive": "#a21f2c", "retain-original": "#8a5a00" };
  const dash: Record<number, string> = {};
  model.seeds.forEach((s, i) => (dash[s] = i === 0 ? "0" : i === 1 ? "6,4" : "2,3"));

  const lines: string[] = [];
  const points: string[] = [];
  for (const cond of model.conditions) {
    for (const seed of model.seeds) {
      const series = Array.from({ length: model.rounds + 1 }, (_, r) =>
        rareCounts.find((row) => row.condition === cond.id && row.seed === seed && row.round === r)!.count,
      );
      const path = series.map((c, r) => `${r === 0 ? "M" : "L"}${x(r).toFixed(1)},${y(c).toFixed(1)}`).join(" ");
      lines.push(`<path d="${path}" fill="none" stroke="${colors[cond.id]}" stroke-width="2" stroke-dasharray="${dash[seed]}" />`);
      series.forEach((c, r) => points.push(`<circle cx="${x(r).toFixed(1)}" cy="${y(c).toFixed(1)}" r="2.5" fill="${colors[cond.id]}" />`));
    }
  }
  const axisY = [0, 0.25, 0.5, 0.75, 1].map((f) => {
    const c = Math.round(f * yMax);
    return `<text x="${PAD - 8}" y="${(y(c) + 4).toFixed(1)}" font-size="11" text-anchor="end">${c}</text>` +
      `<line x1="${PAD}" y1="${y(c).toFixed(1)}" x2="${W - PAD}" y2="${y(c).toFixed(1)}" stroke="#ddd" stroke-width="1" />`;
  }).join("");
  const axisX = Array.from({ length: model.rounds + 1 }, (_, r) => r)
    .map((r) => `<text x="${x(r).toFixed(1)}" y="${H - PAD + 18}" font-size="11" text-anchor="middle">${r}</text>`)
    .join("");
  const legend = model.conditions.map(
    (cond, i) => `<rect x="${PAD}" y="${12 + i * 16}" width="12" height="3" fill="${colors[cond.id]}" />` +
      `<text x="${PAD + 18}" y="${16 + i * 16}" font-size="11">${cond.label}</text>`,
  ).join("");
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" ` +
    `aria-label="Count of the rare category ${model.rareCategory} across resampling rounds, for three conditions and three seeds each. See trend.txt for a text description and rare-category-retention.csv for the data behind the plot.">` +
    `<rect width="${W}" height="${H}" fill="white" />` +
    axisY + axisX + lines.join("") + points.join("") + legend +
    `<text x="${W / 2}" y="${H - 8}" font-size="11" text-anchor="middle">round</text>` +
    `<text x="14" y="${H / 2}" font-size="11" text-anchor="middle" transform="rotate(-90 14 ${H / 2})">count of ${model.rareCategory}</text>` +
    `</svg>\n`;
  writeFileSync(`${OUT}/plot.svg`, svg);

  const trendByCondition = model.conditions
    .map((cond) => {
      const at = Array.from({ length: model.rounds + 1 }, (_, r) => `round ${r}: retained in ${retainedSeeds(cond.id, r)}/${model.seeds.length} seeds`).join("; ");
      return `${cond.label}: ${at}.`;
    })
    .join("\n\n");

  writeFileSync(
    `${OUT}/trend.txt`,
    `Rare-category (${model.rareCategory}) retention across resampling rounds -- text description (accessible route)\n\n` +
      `Three conditions, three fixed seeds each, ${model.roundSize} draws per round,\n` +
      `${model.rounds} recursive rounds after the shared round-0 draw. "Retained"\n` +
      `means the rare category's count in that round's sample is greater than zero.\n\n` +
      `${trendByCondition}\n\n` +
      `Once a run's estimated distribution assigns the rare category zero\n` +
      `probability, that run can never draw it again -- a genuine absorbing state\n` +
      `in this model, not a smoothed trend line. Full per-round counts for every\n` +
      `category are in counts.csv; the rare category alone is in\n` +
      `rare-category-retention.csv.\n`,
  );

  writeFileSync(
    `${OUT}/README.txt`,
    `Categorical resampling model -- week 9 pack\n${model.note}\n\n` +
      `settings.json has the categories, true probabilities, round size, seeds and\n` +
      `each condition's method -- everything needed to reproduce every number here.\n\n` +
      `counts.csv is every category's count for every condition, seed and round.\n` +
      `rare-category-retention.csv pulls out the rare category ${model.rareCategory} alone.\n\n` +
      `plot.svg draws the rare category's count for all nine runs; trend.txt is the\n` +
      `same information as a table and prose -- accessible route.\n\n` +
      `reveal/analysis.md names what this model omits and a conclusion it cannot\n` +
      `justify. Open it after you have written your own conditional conclusion.\n`,
  );

  writeFileSync(
    `${OUT}/reveal/analysis.md`,
    `# Analysis -- week 9\n\n${model.reveal.summary}\n\n` +
      `## What this model omits\n\n${model.reveal.limitations}\n\n` +
      `## A conclusion this pack cannot justify\n\n${model.reveal.unjustifiableConclusion}\n`,
  );

  writePackIndex(OUT, "Week 9 pack -- rare categories under recursive resampling",
    "Three conditions, three seeds each. Read the conditions, predict, then compare the prepared rounds.",
    [
      { name: "settings.json", what: "categories, probabilities, round size, seeds and each condition's method" },
      { name: "counts.csv", what: "every category's count for every condition, seed and round" },
      { name: "rare-category-retention.csv", what: "the rare category's count alone, across rounds" },
      { name: "plot.svg", what: "all nine runs plotted; variation across seeds is visible, not averaged away" },
      { name: "trend.txt", what: "the same trend as a table and prose -- accessible route" },
      { name: "README.txt", what: "what is in this folder" },
    ]);

  console.log(`week-09 pack: ${model.conditions.length} conditions x ${model.seeds.length} seeds, ${rows.length} rows`);
}

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].split("/").pop()!)) main();
