import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { loadPack, presence } from "../packs/week-02/build.ts";

// Week 2 asks a student to choose between explanations for a shared feature.
// That question only exists if the pack actually contains the competing cases:
// something in the source, something every copy acquired separately, something
// two copies share because of shared equipment, and one thing two copies share
// because one copy is behind both. Lose any of them and the week collapses into
// "spot the shared row", which is week 2 pretending to be harder than it is.

const pack = loadPack();
const OUT = resolve("public/packs/week-02");
const published = (path: string) => readFileSync(`${OUT}/${path}`, "utf8");
const copies = pack.copies.map((c) => c.id);

describe("week 2 pack is what it publishes", () => {
  it("matches the published table to the declared features", () => {
    const csv = published("feature-table.csv");
    for (const row of presence(pack)) {
      const expected = [
        row.id,
        row.location,
        ...row.row.map((p) => (p ? "present" : "absent")),
      ].join(",");
      expect(csv, `feature ${row.id}`).toContain(expected);
    }
  });

  it("publishes a per-recording file for the source and every copy", () => {
    for (const item of [pack.source, ...pack.copies]) {
      const file = published(`${item.id.toLowerCase()}.txt`);
      const carried = pack.features.filter((f) =>
        item.id === pack.source.id ? f.inSource : f.carriers.includes(item.id),
      );
      for (const feature of carried) {
        expect(file, `${item.id} should list ${feature.id}`).toContain(feature.id);
      }
      for (const feature of pack.features.filter((f) => !carried.includes(f))) {
        expect(file, `${item.id} should not list ${feature.id}`).not.toContain(`${feature.id}  `);
      }
    }
  });
});

describe("week 2 pack contains all four explanations", () => {
  it("has a feature that is simply in the source", () => {
    // The first explanation to rule out: two copies share it because everything
    // copied from this source does.
    const inSource = pack.features.filter((f) => f.inSource);
    expect(inSource.length, "no feature present in the source").toBeGreaterThan(0);
    for (const feature of inSource) {
      expect(feature.carriers.sort(), `${feature.id} should reach every faithful copy`).toEqual(
        [...copies].sort(),
      );
    }
  });

  it("has a feature every copy acquired separately", () => {
    // Absent from the source, present in all copies: a property of the process,
    // so it separates copies from the source and nothing from anything else.
    const process = pack.features.filter(
      (f) => !f.inSource && f.carriers.length === copies.length,
    );
    expect(process.length, "no process-wide feature").toBeGreaterThan(0);
    for (const feature of process) {
      expect(feature.groupsAncestry, `${feature.id} must not be diagnostic`).toBe(false);
    }
  });

  it("has exactly one feature that ancestry explains, and it is a one-off event", () => {
    const diagnostic = pack.features.filter((f) => f.groupsAncestry);
    expect(diagnostic.length, "the pack must settle on one answer").toBe(1);
    const [feature] = diagnostic;
    expect(feature.kind, "a generic property cannot carry an ancestry claim").toBe("one-off event");
    expect(feature.inSource, "a diagnostic feature cannot be in the source").toBe(false);
    expect(feature.carriers.length).toBeGreaterThan(1);
    expect(feature.carriers.length).toBeLessThan(copies.length);
    expect(feature.location, "a one-off event needs a fixed location").not.toBe("throughout");
  });

  it("has a competing grouping the answer has to defeat", () => {
    // Two copies sharing something, incompatible with the diagnostic grouping.
    // Without it the student picks the only shared row and learns nothing.
    const [diagnostic] = pack.features.filter((f) => f.groupsAncestry);
    const competitors = pack.features.filter((f) => {
      if (f.id === diagnostic.id) return false;
      if (f.carriers.length < 2 || f.carriers.length >= copies.length) return false;
      const overlap = f.carriers.filter((c) => diagnostic.carriers.includes(c));
      // Incompatible: it overlaps the diagnostic group without nesting inside it.
      return overlap.length > 0 && overlap.length < f.carriers.length;
    });
    expect(competitors.length, "nothing contradicts the intended answer").toBeGreaterThan(0);
    for (const feature of competitors) {
      expect(
        ["equipment", "process"],
        `${feature.id} competes but has no mechanism that explains it away`,
      ).toContain(feature.kind);
    }
  });

  it("distinguishes every copy from every other", () => {
    const profiles = copies.map((id) =>
      pack.features.filter((f) => f.carriers.includes(id)).map((f) => f.id).join(","),
    );
    expect(new Set(profiles).size, "two copies are indistinguishable").toBe(copies.length);
  });
});

describe("the answer stays out of the evidence", () => {
  const STUDENT_FACING = [
    "feature-table.csv",
    "features.txt",
    "README.txt",
    ...["s", "w", "x", "y", "z"].map((id) => `${id}.txt`),
  ];

  it("names no parent and no kind in any student-facing file", () => {
    for (const file of STUDENT_FACING) {
      const text = published(file);
      expect(text, `${file} leaks ancestry language`).not.toMatch(
        /\b(parent|ancestor|descend|inherited|intermediate|diagnostic)\b/i,
      );
      for (const kind of ["one-off event", "equipment", "source content", "process"]) {
        expect(text, `${file} leaks the kind "${kind}"`).not.toContain(kind);
      }
    }
  });

  it("keeps the construction log out of the pack root", () => {
    const log = published("reveal/construction-log.md");
    expect(log).toContain("How the copies were actually made");
    for (const file of STUDENT_FACING) {
      expect(published(file), `${file} contains the log`).not.toContain(
        "How the copies were actually made",
      );
    }
  });
});
