import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { blockAverages, degraded, loadPack, restored } from "../packs/week-10/build.ts";

// Week 10 asks students to check a restoration claim feature by feature
// against a retained source. That is void unless block-averaging really
// destroys information in a non-uniform block (so degraded genuinely cannot
// recover it), and unless restored is a real, deterministic computation from
// the degraded data rather than a value quietly copied from the source.

const pack = loadPack();
const OUT = resolve("public/packs/week-10");
const published = (path: string) => readFileSync(`${OUT}/${path}`, "utf8");

describe("week 10 pack computes what it claims to", () => {
  it("block-averaging is a real many-to-one reduction: two different source cells can share a block average", () => {
    const coarse = blockAverages(pack);
    // block (1,1) covers source cells (2,2)=4,(2,3)=1,(3,2)=1,(3,3)=1
    expect(coarse[1][1]).toBeCloseTo((4 + 1 + 1 + 1) / 4);
  });

  it("degraded and restored are deterministic functions of the source, not copies of it", () => {
    const deg1 = degraded(pack);
    const deg2 = degraded(pack);
    expect(deg1).toEqual(deg2);
    const rest1 = restored(pack);
    const rest2 = restored(pack);
    expect(rest1).toEqual(rest2);
  });

  it("degraded flattens the fine anomaly cell to its block's rounded average, not the true value", () => {
    const deg = degraded(pack);
    expect(deg[2][2]).not.toBe(pack.source[2][2]);
  });

  it("restored does not simply equal the source everywhere a block had internal variation", () => {
    const rest = restored(pack);
    const nonUniformMismatches = pack.features
      .filter((f) => f.id === "f3" || f.id === "f5" || f.id === "f6")
      .filter((f) => rest[f.row][f.col] !== pack.source[f.row][f.col]);
    expect(nonUniformMismatches.length).toBeGreaterThan(0);
  });

  it("restored matches the source everywhere a block was already uniform", () => {
    const rest = restored(pack);
    for (const f of pack.features.filter((x) => x.id === "f1" || x.id === "f2")) {
      expect(rest[f.row][f.col]).toBe(pack.source[f.row][f.col]);
    }
  });
});

describe("week 10 pack publishes what it computes", () => {
  it("publishes three comparable images", () => {
    for (const file of ["source.svg", "degraded.svg", "restored.svg"]) {
      expect(published(file), file).toContain("<svg");
    }
  });

  it("publishes one pixel row per grid cell for all three images", () => {
    const rows = published("pixels.csv").trim().split("\n");
    expect(rows.length - 1).toBe(pack.gridSize * pack.gridSize);
  });

  it("publishes one feature-table row per named feature, matching the model's own values", () => {
    const rows = published("feature-table.csv").trim().split("\n").slice(1);
    expect(rows.length).toBe(pack.features.length);
    const deg = degraded(pack);
    const rest = restored(pack);
    for (const f of pack.features) {
      const row = rows.find((r) => r.startsWith(`${f.id},`));
      expect(row, f.id).toBeDefined();
      expect(row).toContain(`${pack.source[f.row][f.col]},${deg[f.row][f.col]},${rest[f.row][f.col]}`);
    }
  });

  it("names the unjustifiable conclusion in the reveal, not in the public files", () => {
    expect(published("README.txt")).not.toContain("fabricates");
    expect(published("reveal/analysis.md")).toContain(pack.reveal.unjustifiableConclusion);
    expect(published("reveal/analysis.md")).toContain(pack.reveal.limitations);
  });
});
