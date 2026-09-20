#!/usr/bin/env node
// Builds the week 10 pack: a small synthetic tone chart, degraded by 2x2
// block-averaging then upsampled two ways (blocky nearest-neighbour, and
// smoothed bilinear interpolation standing in for "restoration"). Only
// arithmetic on an 8x8 integer grid -- no photograph, no PRNG. See
// model.json's note and reveal.limitations for what is deliberately left out.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { writePackIndex } from "../pack-index.ts";

const HERE = dirname(new URL(import.meta.url).pathname);
const OUT = resolve("public/packs/week-10");

export interface Feature { id: string; row: number; col: number; label: string; note: string }
export interface Model {
  pack: string; note: string; gridSize: number; blockSize: number; tones: number;
  palette: string[]; source: number[][]; features: Feature[];
  reveal: { summary: string; limitations: string; unjustifiableConclusion: string };
}

export const loadPack = (): Model =>
  JSON.parse(readFileSync(resolve(HERE, "model.json"), "utf8")) as Model;

/** 2x2 block averages of the source grid, one row/col per block. */
export function blockAverages(model: Model): number[][] {
  const n = model.gridSize / model.blockSize;
  const out: number[][] = [];
  for (let bi = 0; bi < n; bi++) {
    const row: number[] = [];
    for (let bj = 0; bj < n; bj++) {
      let sum = 0;
      for (let dr = 0; dr < model.blockSize; dr++)
        for (let dc = 0; dc < model.blockSize; dc++)
          sum += model.source[bi * model.blockSize + dr][bj * model.blockSize + dc];
      row.push(sum / (model.blockSize * model.blockSize));
    }
    out.push(row);
  }
  return out;
}

const clampTone = (v: number, tones: number): number => Math.min(tones - 1, Math.max(0, Math.round(v)));

/** Nearest-neighbour upsample of the block averages: the "degraded" image. */
export function degraded(model: Model): number[][] {
  const coarse = blockAverages(model);
  const out: number[][] = [];
  for (let r = 0; r < model.gridSize; r++) {
    const row: number[] = [];
    for (let c = 0; c < model.gridSize; c++) {
      const bi = Math.floor(r / model.blockSize);
      const bj = Math.floor(c / model.blockSize);
      row.push(clampTone(coarse[bi][bj], model.tones));
    }
    out.push(row);
  }
  return out;
}

/** Bilinear-interpolated upsample of the block averages: the "restored" image. */
export function restored(model: Model): number[][] {
  const coarse = blockAverages(model);
  const n = coarse.length;
  const b = model.blockSize;
  const clampIdx = (i: number) => Math.min(n - 1, Math.max(0, i));
  const out: number[][] = [];
  for (let r = 0; r < model.gridSize; r++) {
    const row: number[] = [];
    for (let c = 0; c < model.gridSize; c++) {
      const ci = Math.min(n - 1, Math.max(0, (r - b / 2) / b));
      const cj = Math.min(n - 1, Math.max(0, (c - b / 2) / b));
      const i0 = clampIdx(Math.floor(ci));
      const j0 = clampIdx(Math.floor(cj));
      const i1 = clampIdx(i0 + 1);
      const j1 = clampIdx(j0 + 1);
      const fi = ci - i0;
      const fj = cj - j0;
      const value =
        (1 - fi) * (1 - fj) * coarse[i0][j0] +
        (1 - fi) * fj * coarse[i0][j1] +
        fi * (1 - fj) * coarse[i1][j0] +
        fi * fj * coarse[i1][j1];
      row.push(clampTone(value, model.tones));
    }
    out.push(row);
  }
  return out;
}

function svgFor(grid: number[][], palette: string[], label: string): string {
  const cell = 32;
  const size = grid.length * cell;
  const rects = grid
    .flatMap((row, r) => row.map((tone, c) => `<rect x="${c * cell}" y="${r * cell}" width="${cell}" height="${cell}" fill="${palette[tone]}" stroke="#fff" stroke-width="1" />`))
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" role="img" aria-label="${label}. Grid values are published in pixels.csv.">${rects}</svg>\n`;
}

function main(): void {
  const model = loadPack();
  mkdirSync(`${OUT}/reveal`, { recursive: true });

  const source = model.source;
  const deg = degraded(model);
  const rest = restored(model);

  writeFileSync(`${OUT}/source.svg`, svgFor(source, model.palette, "The retained source: an 8 by 8 synthetic tone chart"));
  writeFileSync(`${OUT}/degraded.svg`, svgFor(deg, model.palette, "The degraded image: each 2 by 2 block replaced by its average tone"));
  writeFileSync(`${OUT}/restored.svg`, svgFor(rest, model.palette, "The restoration output: the degraded image's blocks upsampled with bilinear interpolation"));

  const pixelRows = ["row,col,source,degraded,restored"];
  for (let r = 0; r < model.gridSize; r++)
    for (let c = 0; c < model.gridSize; c++)
      pixelRows.push([r, c, source[r][c], deg[r][c], rest[r][c]].join(","));
  writeFileSync(`${OUT}/pixels.csv`, pixelRows.join("\n") + "\n");

  const featureRows = ["id,label,row,col,note,source,degraded,restored"];
  for (const f of model.features)
    featureRows.push([f.id, `"${f.label}"`, f.row, f.col, `"${f.note}"`, source[f.row][f.col], deg[f.row][f.col], rest[f.row][f.col]].join(","));
  writeFileSync(`${OUT}/feature-table.csv`, featureRows.join("\n") + "\n");

  const labelled = model.features
    .map((f) => `${f.id} -- ${f.label} (row ${f.row}, col ${f.col}; ${f.note})\n  source tone ${source[f.row][f.col]}; degraded tone ${deg[f.row][f.col]}; restored tone ${rest[f.row][f.col]}`)
    .join("\n\n");

  writeFileSync(
    `${OUT}/labelled-features.txt`,
    `Named features -- accessible route (no image required)\n\n` +
      `Tones run 0 (lightest) to ${model.tones - 1} (darkest). Every value below is the\n` +
      `actual computed tone at that cell -- nothing here has been rounded for effect.\n\n` +
      `${labelled}\n\n` +
      `Full 64-cell grid for source, degraded and restored is in pixels.csv.\n`,
  );

  writeFileSync(
    `${OUT}/README.txt`,
    `Synthetic tone chart -- week 10 pack\n${model.note}\n\n` +
      `source.svg, degraded.svg and restored.svg are the three images to compare.\n` +
      `pixels.csv has all 64 cells for all three; feature-table.csv has just the\n` +
      `six named features this pack asks you to check by hand; labelled-features.txt\n` +
      `is the same six features as accessible text.\n\n` +
      `reveal/analysis.md names what this specimen omits and a conclusion it cannot\n` +
      `justify. Open it after you have written your own feature table.\n`,
  );

  writeFileSync(
    `${OUT}/reveal/analysis.md`,
    `# Analysis -- week 10\n\n${model.reveal.summary}\n\n` +
      `## What this specimen omits\n\n${model.reveal.limitations}\n\n` +
      `## A conclusion this pack cannot justify\n\n${model.reveal.unjustifiableConclusion}\n`,
  );

  writePackIndex(OUT, "Week 10 pack -- a restoration claim, checked feature by feature",
    "Three images and the arithmetic behind them. Predict each feature before you check it against the retained source.",
    [
      { name: "source.svg", what: "the retained source image" },
      { name: "degraded.svg", what: "the source after 2x2 block-averaging, shown blocky" },
      { name: "restored.svg", what: "the degraded image upsampled by bilinear interpolation" },
      { name: "pixels.csv", what: "all 64 cells for source, degraded and restored" },
      { name: "feature-table.csv", what: "the six named features this pack asks you to check" },
      { name: "labelled-features.txt", what: "the same six features as accessible text" },
      { name: "README.txt", what: "what is in this folder" },
    ],
    {
      sessionSlug: "10-enhance",
      files: [
        {
          name: "analysis.md",
          what: "the analysis and argument -- locks until you commit a prediction",
        },
      ],
    });

  console.log(`week-10 pack: ${model.gridSize}x${model.gridSize} grid, ${model.features.length} named features`);
}

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].split("/").pop()!)) main();
