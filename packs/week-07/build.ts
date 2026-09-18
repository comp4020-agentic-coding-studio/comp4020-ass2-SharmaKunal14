#!/usr/bin/env node
// Builds the week 7 pack: a synthetic replication model. One short ancestor
// sequence is copied forward, generation by generation, under a fixed
// per-position substitution rate. Three rates, three fixed seeds each, so a
// student sees runs vary rather than a single dramatic line. No selection, no
// population structure — see model.json's note and reveal.limitations.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { writePackIndex } from "../pack-index.ts";

const HERE = dirname(new URL(import.meta.url).pathname);
const OUT = resolve("public/packs/week-07");

export interface ErrorRate { id: string; label: string; rate: number }
export interface Model {
  pack: string; note: string; alphabet: string[]; ancestorLength: number;
  generations: number; selectedGenerations: number[]; errorRates: ErrorRate[];
  seeds: number[]; reveal: { summary: string; limitations: string; unjustifiableConclusion: string };
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

/** Builds the fixed ancestor sequence, deterministic in the alphabet order — not random. */
export function ancestor(model: Model): string[] {
  const out: string[] = [];
  for (let i = 0; i < model.ancestorLength; i++) out.push(model.alphabet[i % model.alphabet.length]);
  return out;
}

/**
 * Copies forward one generation at a time under an independent per-position
 * substitution rate, returning the sequence at every generation from 0
 * (the ancestor itself) to model.generations.
 */
export function simulateRun(model: Model, rate: number, seed: number): string[][] {
  const rng = mulberry32(seed);
  const gens: string[][] = [ancestor(model)];
  for (let g = 1; g <= model.generations; g++) {
    const prev = gens[g - 1];
    const next = prev.map((symbol) => {
      if (rng() >= rate) return symbol;
      const others = model.alphabet.filter((s) => s !== symbol);
      return others[Math.floor(rng() * others.length)];
    });
    gens.push(next);
  }
  return gens;
}

/** Fraction of positions in generation g that still match the generation-0 ancestor. */
export function agreement(gens: string[][], root: string[], g: number): number {
  const seq = gens[g];
  const matches = seq.filter((s, i) => s === root[i]).length;
  return Math.round((matches / root.length) * 1000) / 1000;
}

function main(): void {
  const model = loadPack();
  mkdirSync(`${OUT}/reveal`, { recursive: true });
  const root = ancestor(model);

  type Row = { rate: string; label: string; seed: number; generation: number; agreement: number };
  const rows: Row[] = [];
  for (const er of model.errorRates) {
    for (const seed of model.seeds) {
      const gens = simulateRun(model, er.rate, seed);
      for (const g of model.selectedGenerations) {
        rows.push({ rate: er.id, label: er.label, seed, generation: g, agreement: agreement(gens, root, g) });
      }
    }
  }

  writeFileSync(
    `${OUT}/settings.json`,
    JSON.stringify(
      {
        alphabet: model.alphabet, ancestor: root.join(""), ancestorLength: model.ancestorLength,
        errorRates: model.errorRates, seeds: model.seeds, generations: model.generations,
        selectedGenerations: model.selectedGenerations,
        method: "mulberry32(seed); per position, with probability = rate, substitute a different symbol chosen uniformly from the other three; agreement = fraction of positions matching the generation-0 ancestor.",
      },
      null, 2,
    ) + "\n",
  );

  writeFileSync(
    `${OUT}/results.csv`,
    ["error_rate,rate_value,seed,generation,ancestor_agreement"]
      .concat(rows.map((r) => [r.label, model.errorRates.find((e) => e.id === r.rate)!.rate, r.seed, r.generation, r.agreement].join(",")))
      .join("\n") + "\n",
  );

  // Compact plot: one polyline per (rate, seed) run so variation across
  // repeated runs is visible, not collapsed into a single mean line.
  const W = 560, H = 360, PAD = 48;
  const maxGen = model.generations;
  const x = (g: number) => PAD + (g / maxGen) * (W - 2 * PAD);
  const y = (a: number) => H - PAD - a * (H - 2 * PAD);
  const colors: Record<string, string> = { low: "#1b7a3d", medium: "#8a5a00", high: "#a21f2c" };
  const dash: Record<number, string> = {};
  model.seeds.forEach((s, i) => (dash[s] = i === 0 ? "0" : i === 1 ? "6,4" : "2,3"));

  const lines: string[] = [];
  const points: string[] = [];
  for (const er of model.errorRates) {
    for (const seed of model.seeds) {
      const gens = simulateRun(model, er.rate, seed);
      const path = model.selectedGenerations
        .map((g, i) => `${i === 0 ? "M" : "L"}${x(g).toFixed(1)},${y(agreement(gens, root, g)).toFixed(1)}`)
        .join(" ");
      lines.push(`<path d="${path}" fill="none" stroke="${colors[er.id]}" stroke-width="2" stroke-dasharray="${dash[seed]}" />`);
      for (const g of model.selectedGenerations) {
        points.push(`<circle cx="${x(g).toFixed(1)}" cy="${y(agreement(gens, root, g)).toFixed(1)}" r="2.5" fill="${colors[er.id]}" />`);
      }
    }
  }
  const axisY = [0, 0.25, 0.5, 0.75, 1].map(
    (a) => `<text x="${PAD - 8}" y="${(y(a) + 4).toFixed(1)}" font-size="11" text-anchor="end">${a}</text>` +
      `<line x1="${PAD}" y1="${y(a).toFixed(1)}" x2="${W - PAD}" y2="${y(a).toFixed(1)}" stroke="#ddd" stroke-width="1" />`,
  ).join("");
  const axisX = model.selectedGenerations.map(
    (g) => `<text x="${x(g).toFixed(1)}" y="${H - PAD + 18}" font-size="11" text-anchor="middle">${g}</text>`,
  ).join("");
  const legend = model.errorRates.map(
    (er, i) => `<rect x="${PAD}" y="${12 + i * 16}" width="12" height="3" fill="${colors[er.id]}" />` +
      `<text x="${PAD + 18}" y="${16 + i * 16}" font-size="11">${er.label} (rate ${er.rate})</text>`,
  ).join("");
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" ` +
    `aria-label="Ancestor agreement against generation-0, for three error rates and three seeds each. See trend.txt for a text description and results.csv for the data behind the plot.">` +
    `<rect width="${W}" height="${H}" fill="white" />` +
    axisY + axisX + lines.join("") + points.join("") + legend +
    `<text x="${W / 2}" y="${H - 8}" font-size="11" text-anchor="middle">generation</text>` +
    `<text x="14" y="${H / 2}" font-size="11" text-anchor="middle" transform="rotate(-90 14 ${H / 2})">agreement with ancestor</text>` +
    `</svg>\n`;
  writeFileSync(`${OUT}/plot.svg`, svg);

  const meanAt = (er: ErrorRate, g: number): number => {
    const vals = rows.filter((r) => r.rate === er.id && r.generation === g).map((r) => r.agreement);
    return Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 1000) / 1000;
  };
  const trend = model.errorRates
    .map((er) => {
      const at = model.selectedGenerations.map((g) => `generation ${g}: mean ${meanAt(er, g)}`).join("; ");
      const spread = model.selectedGenerations
        .map((g) => {
          const vals = rows.filter((r) => r.rate === er.id && r.generation === g).map((r) => r.agreement);
          return Math.round((Math.max(...vals) - Math.min(...vals)) * 1000) / 1000;
        });
      return `${er.label} rate (${er.rate} per position): ${at}. Spread across the three seeds at each reported generation: ${spread.join(", ")}.`;
    })
    .join("\n\n");

  writeFileSync(
    `${OUT}/trend.txt`,
    `Ancestor agreement over generations — text description (accessible route)\n\n` +
      `Three error rates, three fixed seeds each, agreement measured against the\n` +
      `generation-0 ancestor at generations ${model.selectedGenerations.join(", ")}.\n\n` +
      `${trend}\n\n` +
      `The mean at every rate falls from generation 1 to generation 40, and falls\n` +
      `faster at higher rates — but no individual run is a smooth line. Random\n` +
      `substitutions can happen to restore agreement as well as damage it, so a\n` +
      `single seed can tick up between two reported generations even while the\n` +
      `mean across seeds keeps falling. With four possible symbols per position,\n` +
      `a sequence with no relation at all to the ancestor would still match it at\n` +
      `about a quarter of positions by chance — every mean here is settling toward\n` +
      `that floor, not toward zero. The three seeds at the same rate do not track\n` +
      `identically — the spread figures above are the size of that disagreement at\n` +
      `each generation. Full per-run numbers are in results.csv.\n`,
  );

  writeFileSync(
    `${OUT}/README.txt`,
    `Simplified sequence-replication model — week 7 pack\n${model.note}\n\n` +
      `settings.json has the ancestor, alphabet, error rates and seeds — everything\n` +
      `needed to reproduce every number in this pack from the method it also states.\n\n` +
      `results.csv is ancestor agreement (fraction of positions matching the\n` +
      `generation-0 ancestor) for every error rate, seed and reported generation.\n\n` +
      `plot.svg draws all nine runs; trend.txt is the same information as a table\n` +
      `plus a prose description, for the accessible route or a non-visual reader.\n\n` +
      `reveal/analysis.md names one conclusion this pack cannot justify, and states\n` +
      `what the model omits. Open it after you have written your own answer.\n`,
  );

  writeFileSync(
    `${OUT}/reveal/analysis.md`,
    `# Analysis — week 7\n\n${model.reveal.summary}\n\n` +
      `## What this model omits\n\n${model.reveal.limitations}\n\n` +
      `## A conclusion this pack cannot justify\n\n${model.reveal.unjustifiableConclusion}\n`,
  );

  writePackIndex(OUT, "Week 7 pack — reading ancestry through a simplified model",
    "Three error rates, three seeds each. Read the parameters, predict a trend, then compare the prepared runs.",
    [
      { name: "settings.json", what: "ancestor, alphabet, error rates, seeds and the method — for reproduction" },
      { name: "results.csv", what: "ancestor agreement by error rate, seed and generation" },
      { name: "plot.svg", what: "all nine runs plotted; variation across seeds is visible, not averaged away" },
      { name: "trend.txt", what: "the same trend as a table and prose — accessible route" },
      { name: "README.txt", what: "what is in this folder" },
    ]);

  console.log(`week-07 pack: ${model.errorRates.length} rates x ${model.seeds.length} seeds, ${rows.length} rows`);
}

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].split("/").pop()!)) main();
