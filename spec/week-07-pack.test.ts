import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { agreement, ancestor, loadPack, mulberry32, simulateRun } from "../packs/week-07/build.ts";

// Week 7 asks students to compare repeated runs at three error rates and
// reject a claim the model cannot support. That is void unless the pack's
// own three-seed runs really do vary (or the "show variation" gate is
// unearned) and really do trend downward as the rate rises (or there is
// nothing to interpret).

const pack = loadPack();
const OUT = resolve("public/packs/week-07");
const published = (path: string) => readFileSync(`${OUT}/${path}`, "utf8");

describe("week 7 pack simulates what it claims to", () => {
  it("is deterministic: the same seed reproduces the same run", () => {
    const a = simulateRun(pack, 0.08, 23);
    const b = simulateRun(pack, 0.08, 23);
    expect(a).toEqual(b);
  });

  it("differs across seeds at the same rate", () => {
    const runs = pack.seeds.map((s) => simulateRun(pack, 0.08, s));
    expect(runs[0]).not.toEqual(runs[1]);
    expect(runs[1]).not.toEqual(runs[2]);
  });

  it("agreement is 1 at generation 0 and never below 0", () => {
    const root = ancestor(pack);
    for (const er of pack.errorRates) {
      for (const seed of pack.seeds) {
        const gens = simulateRun(pack, er.rate, seed);
        expect(agreement(gens, root, 0)).toBe(1);
        expect(agreement(gens, root, pack.generations)).toBeGreaterThanOrEqual(0);
      }
    }
  });

  it("mean agreement at generation 40 falls as the error rate rises", () => {
    const root = ancestor(pack);
    const meanAt40 = (rate: number) =>
      pack.seeds
        .map((seed) => agreement(simulateRun(pack, rate, seed), root, 40))
        .reduce((a, b) => a + b, 0) / pack.seeds.length;
    const [low, medium, high] = pack.errorRates.map((er) => meanAt40(er.rate));
    expect(low).toBeGreaterThan(medium);
    expect(medium).toBeGreaterThan(high);
  });

  it("mulberry32 is a pure function of its seed", () => {
    const seq = (seed: number) => Array.from({ length: 5 }, () => mulberry32(seed)());
    expect(seq(11)).toEqual(seq(11));
    expect(seq(11)).not.toEqual(seq(23));
  });
});

describe("week 7 pack publishes what it computes", () => {
  it("publishes settings that name every seed and rate used", () => {
    const settings = published("settings.json");
    for (const seed of pack.seeds) expect(settings).toContain(String(seed));
    for (const er of pack.errorRates) expect(settings).toContain(String(er.rate));
  });

  it("publishes one results row per rate, seed and selected generation", () => {
    const rows = published("results.csv").trim().split("\n");
    expect(rows.length - 1).toBe(pack.errorRates.length * pack.seeds.length * pack.selectedGenerations.length);
  });

  it("publishes an accessible-route trend description alongside the plot", () => {
    expect(published("plot.svg")).toContain("<svg");
    const trend = published("trend.txt");
    for (const er of pack.errorRates) expect(trend, `rate ${er.label}`).toContain(er.label);
  });

  it("names the unjustifiable conclusion in the reveal, not in the public files", () => {
    expect(published("README.txt")).not.toContain("threshold");
    expect(published("reveal/analysis.md")).toContain(pack.reveal.unjustifiableConclusion);
    expect(published("reveal/analysis.md")).toContain(pack.reveal.limitations);
  });
});
