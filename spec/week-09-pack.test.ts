import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { counts, loadPack, mulberry32, simulateRun } from "../packs/week-09/build.ts";

// Week 9 asks students to compare three sampling conditions and reject a
// claim about real trained models. That is void unless the baseline really
// never loses the rare category (it is never re-estimated from a sample),
// and unless the fully recursive condition really can hit an absorbing
// zero-count state a fresh true-distribution draw could never produce.

const pack = loadPack();
const OUT = resolve("public/packs/week-09");
const published = (path: string) => readFileSync(`${OUT}/${path}`, "utf8");

describe("week 9 pack simulates what it claims to", () => {
  it("is deterministic: the same seed and condition reproduce the same run", () => {
    const a = simulateRun(pack, "full-recursive", 47);
    const b = simulateRun(pack, "full-recursive", 47);
    expect(a).toEqual(b);
  });

  it("differs across seeds at the same condition", () => {
    const runs = pack.seeds.map((s) => simulateRun(pack, "full-recursive", s));
    expect(runs[0]).not.toEqual(runs[1]);
  });

  it("the baseline always draws from the fixed true distribution, every round", () => {
    // Over enough draws, the baseline's round-5 rare-category count should sit
    // near round size x true probability, since it never inherits sampling
    // noise from an earlier round.
    const expected = pack.roundSize * pack.trueProbabilities[pack.categories.indexOf(pack.rareCategory)];
    for (const seed of pack.seeds) {
      const rounds = simulateRun(pack, "baseline", seed);
      const rareCount = counts(pack.categories, rounds[5])[pack.categories.indexOf(pack.rareCategory)];
      expect(Math.abs(rareCount - expected)).toBeLessThan(expected * 2 + 5);
    }
  });

  it("the fully recursive condition can reach an absorbing zero state for the rare category", () => {
    const rareIdx = pack.categories.indexOf(pack.rareCategory);
    const anyAbsorbed = pack.seeds.some((seed) => {
      const rounds = simulateRun(pack, "full-recursive", seed);
      const last = counts(pack.categories, rounds[pack.rounds])[rareIdx];
      if (last !== 0) return false;
      // once at zero, every subsequent round must also read zero (nothing to
      // re-inject the category once the estimated distribution excludes it)
      return rounds.slice(rounds.length - 2).every((r) => counts(pack.categories, r)[rareIdx] === 0);
    });
    expect(anyAbsorbed).toBe(true);
  });

  it("mulberry32 is a pure function of its seed", () => {
    const seq = (seed: number) => Array.from({ length: 5 }, () => mulberry32(seed)());
    expect(seq(11)).toEqual(seq(11));
    expect(seq(11)).not.toEqual(seq(23));
  });
});

describe("week 9 pack publishes what it computes", () => {
  it("publishes settings naming every condition, seed and category", () => {
    const settings = published("settings.json");
    for (const seed of pack.seeds) expect(settings).toContain(String(seed));
    for (const cond of pack.conditions) expect(settings).toContain(cond.id);
    for (const cat of pack.categories) expect(settings).toContain(cat);
  });

  it("publishes one counts row per condition, seed, round and category", () => {
    const rows = published("counts.csv").trim().split("\n");
    expect(rows.length - 1).toBe(pack.conditions.length * pack.seeds.length * (pack.rounds + 1) * pack.categories.length);
  });

  it("publishes the rare category's retention alongside the plot", () => {
    expect(published("plot.svg")).toContain("<svg");
    const trend = published("trend.txt");
    for (const cond of pack.conditions) expect(trend, cond.label).toContain(cond.label);
  });

  it("names the unjustifiable conclusion in the reveal, not in the public files", () => {
    expect(published("README.txt")).not.toContain("forget");
    expect(published("reveal/analysis.md")).toContain(pack.reveal.unjustifiableConclusion);
    expect(published("reveal/analysis.md")).toContain(pack.reveal.limitations);
  });
});
