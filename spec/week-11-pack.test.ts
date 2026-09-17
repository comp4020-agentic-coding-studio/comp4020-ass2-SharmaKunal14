import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { auditRows, computeAfter, loadPack, metadataChecksum } from "../packs/week-11/build.ts";

// Week 11 asks students to audit a provenance log against the real diff
// between two manifests. That is void unless the log is genuinely
// incomplete relative to a real, computed diff — not an incompleteness
// merely asserted in prose.

const pack = loadPack();
const OUT = resolve("public/packs/week-11");
const published = (path: string) => readFileSync(`${OUT}/${path}`, "utf8");

describe("week 11 pack computes what it claims to", () => {
  it("the log's operations account for the stripped fields", () => {
    for (const field of pack.strippedFields) {
      expect(pack.loggedOperations.some((op) => op.includes(field)), field).toBe(true);
    }
  });

  it("the log says nothing about the rename, even though the value survives under a new key", () => {
    const after = computeAfter(pack);
    for (const [from, to] of Object.entries(pack.renamedFields)) {
      expect(after[to]).toBe(pack.before[from]);
      expect(after[from]).toBeUndefined();
      expect(pack.loggedOperations.some((op) => op.includes(from) || op.includes(to))).toBe(false);
    }
  });

  it("the metadata checksum actually changes when the field set changes, and the log never mentions it", () => {
    const before = metadataChecksum(pack.before);
    const after = metadataChecksum(computeAfter(pack));
    expect(after).not.toBe(before);
    expect(pack.loggedOperations.some((op) => op.toLowerCase().includes("checksum"))).toBe(false);
  });

  it("fields never captured at any stage are absent in both manifests, not just the public one", () => {
    for (const field of pack.neverCaptured) {
      expect(pack.before[field]).toBeNull();
      expect(computeAfter(pack)[field]).toBeNull();
    }
  });

  it("the audit finds at least one undocumented change alongside the documented removals", () => {
    const rows = auditRows(pack);
    expect(rows.some((r) => r.judgement === "documented-removal")).toBe(true);
    expect(rows.some((r) => r.judgement === "undocumented-change")).toBe(true);
    expect(rows.some((r) => r.judgement === "never-captured")).toBe(true);
  });
});

describe("week 11 pack publishes what it computes", () => {
  it("publishes both manifests as valid JSON with the expected stage labels", () => {
    const before = JSON.parse(published("manifest-before.json"));
    const after = JSON.parse(published("manifest-after.json"));
    expect(before.stage).toBe("deposit copy");
    expect(after.stage).toBe("public archive copy");
    expect(before.fields.contributorId).toBeDefined();
    expect(after.fields.contributorId).toBeUndefined();
  });

  it("publishes one audit-worksheet row per audited field, matching the computed judgement", () => {
    const rows = auditRows(pack);
    const csvRows = published("audit-worksheet.csv").trim().split("\n").slice(1);
    expect(csvRows.length).toBe(rows.length);
    for (const r of rows) {
      const row = csvRows.find((c) => c.startsWith(`${r.field},`));
      expect(row, r.field).toBeDefined();
      expect(row).toContain(r.judgement);
    }
  });

  it("names the reveal's conclusions in the reveal only, not in the public log or README", () => {
    expect(published("stripping-log.txt")).not.toContain("incomplete");
    expect(published("reveal/analysis.md")).toContain(pack.reveal.summary);
    expect(published("reveal/analysis.md")).toContain(pack.reveal.notASignature);
  });
});
