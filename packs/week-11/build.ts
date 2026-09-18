#!/usr/bin/env node
// Builds the week 11 pack: a before/after metadata manifest pair for
// image/output-7's move from deposit copy to public archive copy, a
// stripping log that documents that move, and an audit worksheet that
// checks the log's account against the actual field-by-field diff.
//
// The point of the exercise only holds if the log is genuinely incomplete
// relative to the real diff, so the log's completeness against the computed
// after-manifest is asserted by the pack's own tests, not merely written
// into a paragraph.
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { writePackIndex } from "../pack-index.ts";

const HERE = dirname(new URL(import.meta.url).pathname);
const OUT = resolve("public/packs/week-11");

export type Manifest = Record<string, string | number | null>;

export interface Pack {
  pack: string;
  note: string;
  item: string;
  before: Manifest;
  strippedFields: string[];
  renamedFields: Record<string, string>;
  loggedOperations: string[];
  neverCaptured: string[];
  neverCapturedNote: string;
  reveal: { summary: string; missingIsNotFalse: string; notASignature: string };
}

export const loadPack = (): Pack =>
  JSON.parse(readFileSync(resolve(HERE, "model.json"), "utf8")) as Pack;

/** SHA-256 of the manifest's fields, in a fixed key order, as a stand-in for
 *  a plain (unsigned) metadata checksum that changes if any field changes. */
export function metadataChecksum(manifest: Manifest): string {
  const canonical = Object.keys(manifest)
    .sort()
    .map((k) => `${k}=${manifest[k]}`)
    .join("|");
  return createHash("sha256").update(canonical).digest("hex").slice(0, 16);
}

/** The public copy's manifest, computed from the deposit copy by applying
 *  the stripping and the (undocumented) rename, then recomputing the checksum. */
export function computeAfter(pack: Pack): Manifest {
  const after: Manifest = { ...pack.before };
  for (const field of pack.strippedFields) delete after[field];
  for (const [from, to] of Object.entries(pack.renamedFields)) {
    after[to] = after[from];
    delete after[from];
  }
  after.metadataChecksum = metadataChecksum(after);
  return after;
}

export type Judgement = "retained" | "documented-removal" | "undocumented-change" | "never-captured";

export interface AuditRow {
  field: string;
  inBefore: boolean;
  inAfter: boolean;
  loggedAsChanged: boolean;
  judgement: Judgement;
  note: string;
}

/** Field-by-field comparison of before/after against what the log claims. */
export function auditRows(pack: Pack): AuditRow[] {
  const before: Manifest = { ...pack.before, metadataChecksum: metadataChecksum(pack.before) };
  const after = computeAfter(pack);
  const fields = Array.from(new Set([...Object.keys(before), ...Object.keys(after)]));
  const renamedTo = new Set(Object.values(pack.renamedFields));

  return fields.map((field) => {
    const inBefore = field in before;
    const inAfter = field in after;
    const loggedAsChanged = pack.loggedOperations.some((op) => op.includes(field));

    if (pack.neverCaptured.includes(field)) {
      return {
        field, inBefore, inAfter, loggedAsChanged,
        judgement: "never-captured",
        note: pack.neverCapturedNote,
      };
    }
    if (pack.strippedFields.includes(field)) {
      return {
        field, inBefore, inAfter, loggedAsChanged,
        judgement: "documented-removal",
        note: "Absent from the public manifest, exactly as the stripping log states.",
      };
    }
    if (field in pack.renamedFields || renamedTo.has(field) || field === "metadataChecksum") {
      return {
        field, inBefore, inAfter, loggedAsChanged,
        judgement: "undocumented-change",
        note: field === "metadataChecksum"
          ? "Differs before/after because the field set changed, but the log never mentions the checksum at all."
          : "Value survived under a different key; the log's two listed operations do not mention this rename.",
      };
    }
    return {
      field, inBefore, inAfter, loggedAsChanged,
      judgement: "retained",
      note: "Present, unchanged, in both manifests.",
    };
  });
}

function main(): void {
  const pack = loadPack();
  mkdirSync(`${OUT}/reveal`, { recursive: true });

  const before: Manifest = { ...pack.before, metadataChecksum: metadataChecksum(pack.before) };
  const after = computeAfter(pack);
  const rows = auditRows(pack);

  writeFileSync(`${OUT}/manifest-before.json`, JSON.stringify({ item: pack.item, stage: "deposit copy", fields: before }, null, 2) + "\n");
  writeFileSync(`${OUT}/manifest-after.json`, JSON.stringify({ item: pack.item, stage: "public archive copy", fields: after }, null, 2) + "\n");

  writeFileSync(
    `${OUT}/stripping-log.txt`,
    `Stripping log — ${pack.item}\n${pack.note}\n\n` +
      `Operations recorded by the publishing pipeline when the deposit copy was\n` +
      `made public:\n\n` +
      pack.loggedOperations.map((op) => `  - ${op}`).join("\n") +
      `\n\nThis is the pipeline's own account. Whether it lists every actual change\n` +
      `is something the audit checks, not something this file asserts.\n`,
  );

  writeFileSync(
    `${OUT}/audit-worksheet.csv`,
    ["field,in_before,in_after,logged_as_changed,judgement",
      ...rows.map((r) => [r.field, r.inBefore, r.inAfter, r.loggedAsChanged, r.judgement].join(",")),
    ].join("\n") + "\n",
  );

  writeFileSync(
    `${OUT}/README.txt`,
    `Chain of custody — week 11 pack\n${pack.note}\n\n` +
      `manifest-before.json is the metadata recorded on ${pack.item} at deposit.\n` +
      `manifest-after.json is the metadata on the public archive copy.\n` +
      `stripping-log.txt is the publishing pipeline's own account of what it changed.\n\n` +
      `Compare all three before filling in audit-worksheet.csv: for each field, is\n` +
      `it retained, a documented removal, an undocumented change, or a field that\n` +
      `was never captured at any stage (and so its absence is not the stripping\n` +
      `operation's doing)?\n\n` +
      `reveal/ holds the computed answer. Open it after your own worksheet.\n`,
  );

  writeFileSync(
    `${OUT}/reveal/analysis.md`,
    `# Analysis — week 11\n\n${pack.note}\n\n## Audit worksheet, computed\n\n` +
      `| Field | In before | In after | Logged as changed | Judgement |\n|---|---|---|---|---|\n` +
      rows.map((r) => `| ${r.field} | ${r.inBefore} | ${r.inAfter} | ${r.loggedAsChanged} | ${r.judgement} |`).join("\n") +
      `\n\n${pack.reveal.summary}\n\n## Missing is not false\n\n${pack.reveal.missingIsNotFalse}\n\n` +
      `## Not a signature\n\n${pack.reveal.notASignature}\n`,
  );

  writePackIndex(OUT, "Week 11 pack — chain of custody",
    "A deposit manifest, a public manifest, and the pipeline's own log of what it changed between them. Audit whether the log's account matches the real diff.",
    [
      { name: "manifest-before.json", what: "metadata recorded at deposit" },
      { name: "manifest-after.json", what: "metadata on the public archive copy" },
      { name: "stripping-log.txt", what: "the pipeline's own account of what it changed" },
      { name: "audit-worksheet.csv", what: "your field-by-field audit template" },
      { name: "README.txt", what: "what is in this folder" },
    ]);

  console.log(`week-11 pack: ${rows.length} fields audited, reveal written`);
}

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].split("/").pop()!)) main();
