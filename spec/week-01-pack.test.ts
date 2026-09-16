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

  it("ships the worksheet blank, with one row per copy and reader", () => {
    // The page asks students to fill this in. A worksheet that arrives with
    // its answer columns populated hands over the result of the exercise —
    // the same failure the week 6 contract guards against in its own pack.
    const lines = published("worksheet.csv").trim().split("\n");
    expect(lines[0]).toBe("copy,channel,operations,reader,misreadings,illegibles,total");
    expect(lines.length - 1, "one row per copy and reader").toBe(readings.length);
    for (const row of lines.slice(1)) {
      const [copy, channel, operations, reader, ...answers] = row.split(",");
      expect(copy, "row has no copy").not.toBe("");
      expect(channel, `${copy} has no channel`).not.toBe("");
      expect(Number.isFinite(Number(operations)), `${copy} has no operation count`).toBe(true);
      expect(reader, `${copy} has no reader`).not.toBe("");
      expect(answers, `${copy} ${reader}: answer cells are not empty`).toEqual(["", "", ""]);
    }
  });

  it("keeps the counts in the worked answer, where the student looks last", () => {
    const answer = published("worked-answer.md");
    for (const { copy, reader, lines } of readings) {
      const c = countErrors(card, lines);
      expect(answer, `${copy.id} ${reader}`).toContain(
        `| ${copy.label} | ${copy.channel} | ${copy.operations} | ${reader} | ${c.misreadings} | ${c.illegibles} | ${c.total} |`,
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
    const control = readings.filter((r) => r.copy.channel === "digital");
    expect(control.length).toBeGreaterThan(1);
    for (const { reader, lines } of control) {
      expect(countErrors(card, lines).total, `control, reader ${reader}`).toBe(0);
    }
  });

  it("rises with copy operations inside the photocopy channel", () => {
    // Compared within one channel, not across both: the control is not a
    // generation of the photocopy chain, it is a different process run the
    // same number of times.
    const byReader = new Map<string, { operations: number; total: number }[]>();
    for (const { copy, reader, lines } of readings.filter((r) => r.copy.channel === "photocopy")) {
      const entry = { operations: copy.operations, total: countErrors(card, lines).total };
      byReader.set(reader, [...(byReader.get(reader) ?? []), entry]);
    }
    expect(byReader.size, "no photocopy readings").toBeGreaterThan(0);
    for (const [reader, series] of byReader) {
      const ordered = [...series].sort((a, b) => a.operations - b.operations);
      for (let i = 1; i < ordered.length; i++) {
        expect(
          ordered[i].total,
          `reader ${reader}: ${ordered[i].operations} operations is not worse than ${ordered[i - 1].operations}`,
        ).toBeGreaterThanOrEqual(ordered[i - 1].total);
      }
      expect(ordered.at(-1)!.total, `reader ${reader} never degrades`).toBeGreaterThan(0);
    }
  });

  it("runs the control for as many operations as the longest photocopy chain", () => {
    // The week's claim is that this process damages copies and copying as such
    // does not. That comparison is only fair if both channels ran the same
    // number of times; a control copied once would prove nothing about eight.
    const control = pack.copies.find((c) => c.channel === "digital")!;
    const longest = Math.max(
      ...pack.copies.filter((c) => c.channel === "photocopy").map((c) => c.operations),
    );
    expect(control.operations, "the control is not comparable to the longest chain").toBe(longest);
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
