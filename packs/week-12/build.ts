#!/usr/bin/env node
// Builds the week 12 pack: a fixed budget, three archive families with real
// item counts, and two competing preservation proposals whose costs are
// computed from stated rates rather than typed in as totals. The pack also
// reruns both proposals under one revised cost assumption, so the sensitivity
// test the workshop asks for is a real recomputation, not a claim.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { writePackIndex } from "../pack-index.ts";

const HERE = dirname(new URL(import.meta.url).pathname);
const OUT = resolve("public/packs/week-12");

export type Tier = "logs" | "examples" | "source";

export interface Rates {
  logsLaborPerItem: number;
  examplesLaborPerItem: number;
  sourceLaborPerItem: number;
  storagePerGbYear: number;
}

export interface Family {
  id: string;
  label: string;
  itemCount: number;
  sourceSizeGb: number;
  note: string;
}

export interface FullAllocation { family: string; tier: Tier }
export interface PartialAllocation { family: string; tier: "source-partial"; fallbackTier: Tier }
export type Allocation = FullAllocation | PartialAllocation;

export interface Proposal {
  id: string;
  label: string;
  summary: string;
  allocation: Allocation[];
}

export interface Pack {
  pack: string; note: string; budgetPerYear: number; rates: Rates;
  revisedRates: { sourceLaborPerItem: number; note: string };
  families: Family[]; valuePerTier: Record<Tier, number>; proposals: Proposal[];
  objection: { text: string; response: string };
}

export const loadPack = (): Pack =>
  JSON.parse(readFileSync(resolve(HERE, "model.json"), "utf8")) as Pack;

const laborRate = (rates: Rates, tier: Tier): number =>
  tier === "logs" ? rates.logsLaborPerItem : tier === "examples" ? rates.examplesLaborPerItem : rates.sourceLaborPerItem;

/** Cost of one family fully at one tier. */
export function fullTierCost(family: Family, tier: Tier, rates: Rates): number {
  const labor = family.itemCount * laborRate(rates, tier);
  const storage = tier === "source" ? family.sourceSizeGb * rates.storagePerGbYear : 0;
  return labor + storage;
}

/** How many of a family's items can be upgraded from a fallback tier to
 *  source tier, given the budget remaining after every other family's
 *  allocation AND this family's own fallback-tier baseline are paid for. */
export function partialSourceUpgrade(
  family: Family, fallbackTier: Tier, remainingAfterOwnBaseline: number, rates: Rates,
): { itemsUpgraded: number; cost: number } {
  const perItemUpgrade =
    (rates.sourceLaborPerItem - laborRate(rates, fallbackTier)) +
    (rates.storagePerGbYear * family.sourceSizeGb) / family.itemCount;
  const itemsUpgraded = Math.max(0, Math.min(family.itemCount, Math.floor(remainingAfterOwnBaseline / perItemUpgrade)));
  const baseline = fullTierCost(family, fallbackTier, rates);
  const cost = baseline + itemsUpgraded * perItemUpgrade;
  return { itemsUpgraded, cost };
}

export interface ResolvedFamily { family: string; tier: string; itemsAtSource: number; itemCount: number; cost: number }
export interface ResolvedProposal { id: string; label: string; totalCost: number; overBudget: boolean; totalValue: number; families: ResolvedFamily[] }

export function resolveProposal(pack: Pack, proposal: Proposal, rates: Rates): ResolvedProposal {
  const byId = new Map(pack.families.map((f) => [f.id, f]));
  const full = proposal.allocation.filter((a): a is FullAllocation => a.tier !== "source-partial");
  const partial = proposal.allocation.find((a): a is PartialAllocation => a.tier === "source-partial");

  const fullResolved: ResolvedFamily[] = full.map((a) => {
    const family = byId.get(a.family)!;
    return { family: a.family, tier: a.tier, itemsAtSource: a.tier === "source" ? family.itemCount : 0, itemCount: family.itemCount, cost: fullTierCost(family, a.tier, rates) };
  });

  const spentOnFull = fullResolved.reduce((s, f) => s + f.cost, 0);
  const families: ResolvedFamily[] = [...fullResolved];

  if (partial) {
    const family = byId.get(partial.family)!;
    const ownBaseline = fullTierCost(family, partial.fallbackTier, rates);
    const remainingAfterOwnBaseline = pack.budgetPerYear - spentOnFull - ownBaseline;
    const { itemsUpgraded, cost } = partialSourceUpgrade(family, partial.fallbackTier, remainingAfterOwnBaseline, rates);
    families.push({
      family: partial.family,
      tier: itemsUpgraded === family.itemCount ? "source" : itemsUpgraded === 0 ? partial.fallbackTier : `${itemsUpgraded}/${family.itemCount} source, rest ${partial.fallbackTier}`,
      itemsAtSource: itemsUpgraded,
      itemCount: family.itemCount,
      cost,
    });
  }

  const totalCost = families.reduce((s, f) => s + f.cost, 0);
  const totalValue = families.reduce((s, f) => {
    const family = byId.get(f.family)!;
    const sourceValue = f.itemsAtSource * pack.valuePerTier.source;
    const restTier: Tier = f.tier === "examples" || f.tier.includes("examples") ? "examples" : f.tier === "logs" ? "logs" : "examples";
    const restValue = (family.itemCount - f.itemsAtSource) * pack.valuePerTier[restTier];
    return s + sourceValue + restValue;
  }, 0);

  return { id: proposal.id, label: proposal.label, totalCost: Math.round(totalCost * 1000) / 1000, overBudget: totalCost > pack.budgetPerYear, totalValue, families };
}

function fmt(n: number): string { return `$${n.toFixed(2)}`; }

function main(): void {
  const pack = loadPack();
  mkdirSync(`${OUT}/reveal`, { recursive: true });

  const baseline = pack.proposals.map((p) => resolveProposal(pack, p, pack.rates));
  const revisedRates: Rates = { ...pack.rates, sourceLaborPerItem: pack.revisedRates.sourceLaborPerItem };
  const revised = pack.proposals.map((p) => resolveProposal(pack, p, revisedRates));

  writeFileSync(
    `${OUT}/budget.txt`,
    `Budget — week 12 pack\n${pack.note}\n\n` +
      `Annual budget: ${fmt(pack.budgetPerYear)}\n\n` +
      `Rates:\n  logs tier: ${fmt(pack.rates.logsLaborPerItem)} / item / year\n` +
      `  examples tier: ${fmt(pack.rates.examplesLaborPerItem)} / item / year\n` +
      `  source tier: ${fmt(pack.rates.sourceLaborPerItem)} / item / year, plus storage at ${fmt(pack.rates.storagePerGbYear)} / GB / year\n\n` +
      pack.families.map((f) => `${f.label}: ${f.itemCount} items, ${f.sourceSizeGb} GB at source tier.\n  ${f.note}`).join("\n\n") + "\n",
  );

  writeFileSync(
    `${OUT}/proposals.csv`,
    ["proposal,family,tier,items_at_source,item_count,cost",
      ...baseline.flatMap((r) => r.families.map((f) => [r.id, f.family, `"${f.tier}"`, f.itemsAtSource, f.itemCount, f.cost.toFixed(3)].join(","))),
    ].join("\n") + "\n",
  );

  writeFileSync(
    `${OUT}/proposal-totals.csv`,
    ["proposal,total_cost,over_budget,total_value",
      ...baseline.map((r) => [r.id, r.totalCost.toFixed(3), r.overBudget, r.totalValue].join(",")),
    ].join("\n") + "\n",
  );

  writeFileSync(
    `${OUT}/sensitivity.csv`,
    ["proposal,baseline_cost,baseline_over_budget,revised_cost,revised_over_budget",
      ...pack.proposals.map((p, i) =>
        [p.id, baseline[i].totalCost.toFixed(3), baseline[i].overBudget, revised[i].totalCost.toFixed(3), revised[i].overBudget].join(","),
      ),
    ].join("\n") + "\n",
  );

  writeFileSync(
    `${OUT}/objection.txt`,
    `An objection, and a response — week 12 pack\n\n${pack.objection.text}\n\n---\n\n${pack.objection.response}\n`,
  );

  writeFileSync(
    `${OUT}/README.txt`,
    `The original that never was — week 12 pack\n${pack.note}\n\n` +
      `budget.txt states the annual budget, the rates and the three families'\n` +
      `real item counts and sizes. proposals.csv gives two competing allocations,\n` +
      `computed from those rates, not typed in as totals. proposal-totals.csv\n` +
      `sums each proposal's cost and a naive per-item value score.\n\n` +
      `sensitivity.csv reruns both proposals after one rate changes: source-tier\n` +
      `labor rises from $12 to $20 per item, reflecting a provenance audit like\n` +
      `week 11's actually costing more than the original figure assumed.\n\n` +
      `objection.txt raises one serious objection to the deep-image proposal and\n` +
      `responds to it without declaring either proposal the winner.\n\n` +
      `reveal/ holds the worked comparison. Open it after your own memo.\n`,
  );

  writeFileSync(
    `${OUT}/reveal/analysis.md`,
    `# Analysis — week 12\n\n${pack.note}\n\n## Proposals at baseline rates\n\n` +
      `| Proposal | Total cost | Over budget | Naive value |\n|---|---:|---|---:|\n` +
      baseline.map((r) => `| ${r.label} | ${fmt(r.totalCost)} | ${r.overBudget} | ${r.totalValue} |`).join("\n") +
      `\n\nBudget: ${fmt(pack.budgetPerYear)}.\n\n## After the revised rate\n\n${pack.revisedRates.note}\n\n` +
      `| Proposal | Baseline cost | Revised cost | Flips over budget |\n|---|---:|---:|---|\n` +
      pack.proposals.map((p, i) => `| ${p.label} | ${fmt(baseline[i].totalCost)} | ${fmt(revised[i].totalCost)} | ${!baseline[i].overBudget && revised[i].overBudget} |`).join("\n") +
      `\n\n## The objection\n\n${pack.objection.text}\n\n**Response.** ${pack.objection.response}\n`,
  );

  writePackIndex(OUT, "Week 12 pack — the original that never was",
    "A fixed annual budget, three archive families with real item counts, and two competing preservation proposals computed from stated rates. Compare them, then see what changes when one rate is revised.",
    [
      { name: "budget.txt", what: "the budget, the rates, and each family's real item count and size" },
      { name: "proposals.csv", what: "two proposals' per-family allocation and cost" },
      { name: "proposal-totals.csv", what: "each proposal's total cost, budget fit and naive value score" },
      { name: "sensitivity.csv", what: "both proposals rerun after one rate is revised" },
      { name: "objection.txt", what: "one serious objection to the deep-image proposal, and a response" },
      { name: "README.txt", what: "what is in this folder" },
      { name: "reveal/analysis.md", what: "the worked comparison — open it after your own memo" },
    ]);

  console.log(`week-12 pack: ${pack.proposals.length} proposals resolved at baseline and revised rates, reveal written`);
}

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].split("/").pop()!)) main();
