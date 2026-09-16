import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { countErrors, loadPack, transcription } from "../packs/week-01/build.ts";

// Week 1 makes three claims a reader can check, and this pack is the evidence
// for all of them: that the measurement is reproducible, that this copying
// process damaged these copies, and that copying as such does not. If the
// control were not clean, or the counts did not rise, the week would be
// teaching something its own evidence contradicts — and nothing in a build,
// a link check or a rendered page would notice.

const { pack, card } = loadPack();
const OUT = resolve("public/packs/week-01");
const published = (path: string) => readFileSync(`${OUT}/${path}`, "utf8");

const readings = pack.copies.flatMap((copy) =>
  Object.entries(copy.readers).map(([reader, edits]) => ({
    copy,
    reader,
    lines: transcription(card, edits),
  })),
);

describe("week 1 pack is what it publishes", () => {
  it("matches every published transcription to the edits it declares", () => {
    for (const { copy, reader, lines } of readings) {
      const file = published(`${copy.id}-${reader.toLowerCase()}.txt`);
      for (const [label, text] of lines) {
        expect(file, `${copy.id} ${reader} ${label}`).toContain(`${label}  ${text}`);
      }
    }
  });

  it("matches the published worksheet to the counts the rule produces", () => {
    const csv = published("worksheet.csv");
    for (const { copy, reader, lines } of readings) {
      const c = countErrors(card, lines);
      expect(csv, `${copy.id} ${reader}`).toContain(
        `${copy.id},${copy.generation},${reader},${c.misreadings},${c.illegibles},${c.total}`,
      );
    }
  });

  it("keeps every transcription the same length as the card, so the rule applies", () => {
    for (const { copy, reader, lines } of readings) {
      for (const [label, source] of card) {
        expect(lines.get(label)!.length, `${copy.id} ${reader} ${label}`).toBe(source.length);
      }
    }
  });
});

describe("week 1 pack supports what week 1 claims", () => {
  it("counts the same every time the rule is applied", () => {
    // The week's target is a *repeatable* measurement. The rule must be
    // deterministic even though the readers are not.
    for (const { copy, reader, lines } of readings) {
      const first = countErrors(card, lines);
      const second = countErrors(card, lines);
      expect(second, `${copy.id} ${reader}`).toEqual(first);
    }
  });

  it("leaves the exact-copy control clean for every reader", () => {
    // This is the counterexample the home page leads with. If the control
    // carried a single error, the course would open by contradicting itself.
    const control = readings.filter((r) => r.copy.id === "control");
    expect(control.length).toBeGreaterThan(1);
    for (const { reader, lines } of control) {
      expect(countErrors(card, lines).total, `control, reader ${reader}`).toBe(0);
    }
  });

  it("rises with generation for each reader", () => {
    const byReader = new Map<string, { generation: number; total: number }[]>();
    for (const { copy, reader, lines } of readings) {
      const entry = { generation: copy.generation, total: countErrors(card, lines).total };
      byReader.set(reader, [...(byReader.get(reader) ?? []), entry]);
    }
    for (const [reader, series] of byReader) {
      const ordered = [...series].sort((a, b) => a.generation - b.generation);
      for (let i = 1; i < ordered.length; i++) {
        expect(
          ordered[i].total,
          `reader ${reader}: generation ${ordered[i].generation} is not worse than ${ordered[i - 1].generation}`,
        ).toBeGreaterThanOrEqual(ordered[i - 1].total);
      }
      expect(ordered.at(-1)!.total, `reader ${reader} never degrades`).toBeGreaterThan(0);
    }
  });

  it("has the two readers disagree on at least one copy", () => {
    // Without disagreement the week cannot teach that legibility is a relation
    // between a copy and a reader rather than a property of the copy.
    const disagreements = pack.copies.filter((copy) => {
      const sets = Object.values(copy.readers).map((edits) =>
        countErrors(card, transcription(card, edits)).positions.join("|"),
      );
      return new Set(sets).size > 1;
    });
    expect(disagreements.length, "every reader agreed on every copy").toBeGreaterThan(0);
  });
});
