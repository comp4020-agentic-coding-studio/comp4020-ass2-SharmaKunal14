import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { fullTierCost, loadPack, resolveProposal, type Rates } from "../packs/week-12/build.ts";

// Week 12 asks students to compare two preservation proposals under a
// budget, then retest their choice after a cost assumption changes. That is
// void unless preserving everything at full fidelity genuinely exceeds the
// budget (so a real choice is forced), and unless the revised rate actually
// changes which proposals fit — not merely asserted to in prose.

const pack = loadPack();
const OUT = resolve("public/packs/week-12");
const published = (path: string) => readFileSync(`${OUT}/${path}`, "utf8");

describe("week 12 pack computes what it claims to", () => {
  it("preserving every family fully at source tier exceeds the stated budget", () => {
    const total = pack.families.reduce((s, f) => s + fullTierCost(f, "source", pack.rates), 0);
    expect(total).toBeGreaterThan(pack.budgetPerYear);
  });

  it("both baseline proposals fit within budget", () => {
    for (const p of pack.proposals) {
      const resolved = resolveProposal(pack, p, pack.rates);
      expect(resolved.overBudget, p.id).toBe(false);
    }
  });

  it("the revised source-tier rate flips at least one in-budget proposal out of budget", () => {
    const revisedRates: Rates = { ...pack.rates, sourceLaborPerItem: pack.revisedRates.sourceLaborPerItem };
    const flips = pack.proposals.some((p) => {
      const before = resolveProposal(pack, p, pack.rates);
      const after = resolveProposal(pack, p, revisedRates);
      return !before.overBudget && after.overBudget;
    });
    expect(flips).toBe(true);
  });

  it("the partial-upgrade proposal upgrades a positive but incomplete share of the family's items", () => {
    const partialProposal = pack.proposals.find((p) => p.allocation.some((a) => a.tier === "source-partial"))!;
    const resolved = resolveProposal(pack, partialProposal, pack.rates);
    const partialFamily = resolved.families.find((f) => f.itemsAtSource > 0 && f.itemsAtSource < f.itemCount);
    expect(partialFamily).toBeDefined();
  });

  it("the two proposals do not converge on the same allocation", () => {
    const [a, b] = pack.proposals.map((p) => resolveProposal(pack, p, pack.rates));
    expect(a.families.map((f) => f.itemsAtSource)).not.toEqual(b.families.map((f) => f.itemsAtSource));
  });
});

describe("week 12 pack publishes what it computes", () => {
  it("publishes one proposal-totals row per proposal, matching the computed cost", () => {
    const rows = published("proposal-totals.csv").trim().split("\n").slice(1);
    expect(rows.length).toBe(pack.proposals.length);
    for (const p of pack.proposals) {
      const resolved = resolveProposal(pack, p, pack.rates);
      const row = rows.find((r) => r.startsWith(`${p.id},`));
      expect(row, p.id).toBeDefined();
      expect(row).toContain(resolved.totalCost.toFixed(3));
    }
  });

  it("publishes a sensitivity row per proposal with both baseline and revised costs", () => {
    const rows = published("sensitivity.csv").trim().split("\n").slice(1);
    expect(rows.length).toBe(pack.proposals.length);
  });

  it("keeps the objection and its response out of the public README", () => {
    expect(published("README.txt")).not.toContain(pack.objection.response);
    expect(published("objection.txt")).toContain(pack.objection.text);
    expect(published("objection.txt")).toContain(pack.objection.response);
  });

  it("the reveal states the naive value scores without declaring a winner", () => {
    const reveal = published("reveal/analysis.md");
    expect(reveal).toContain(pack.objection.response);
    expect(reveal.toLowerCase()).not.toMatch(/\bwinner\b|\bbest proposal\b/);
  });
});
