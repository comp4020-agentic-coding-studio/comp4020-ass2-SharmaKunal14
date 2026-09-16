import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { collation, loadPack, witnessLines } from "../packs/week-06/build.ts";

// The week 6 pack is the course's central teaching artefact and the only one
// whose failure is silent. A collation table that disagrees with the witness
// files sets students a puzzle nobody checked; a pack with no genuine subgroup,
// no misleading variant or no unresolved pair teaches none of what week 6
// claims to teach. Neither shows up in a build, on a page, or to a reader.

const { pack, archetype } = loadPack();
const OUT = resolve("public/packs/week-06");
const published = (path: string) => readFileSync(`${OUT}/${path}`, "utf8");

/** Just the numbered text of a published witness file, without its header. */
const publishedText = (witness: string) =>
  published(`witness-${witness.toLowerCase()}.txt`)
    .split("\n")
    .filter((line) => /^\s*\d+\s{2}/.test(line))
    .map((line) => line.replace(/^\s*(\d+)\s{2}/, "$1|"))
    .join("\n");

const expectedText = (witness: string) =>
  [...witnessLines(witness, archetype, pack.variants).entries()]
    .sort(([a], [b]) => a - b)
    .map(([n, text]) => `${n}|${text}`)
    .join("\n");

describe("week 6 pack is what it publishes", () => {
  it("publishes a witness file for every declared witness", () => {
    for (const witness of pack.witnesses) {
      expect(publishedText(witness).length, `witness ${witness}`).toBeGreaterThan(0);
    }
  });

  it("matches each published witness to the text its variants imply", () => {
    for (const witness of pack.witnesses) {
      expect(publishedText(witness), `witness ${witness} has drifted from the variant list`).toBe(
        expectedText(witness),
      );
    }
  });

  it("agrees between the collation table and the witness texts", () => {
    const rows = collation(archetype, pack.variants, pack.witnesses);
    const csv = published("collation.csv");
    for (const row of rows) {
      for (const witness of pack.witnesses) {
        const reading = row.readings[witness];
        expect(csv, `point ${row.point}, witness ${witness}`).toContain(`"${reading}"`);
        // The reading the table gives must be the reading the file actually has.
        const line = witnessLines(witness, archetype, pack.variants).get(row.line)!;
        expect(line, `point ${row.point}: ${witness} line ${row.line}`).toContain(reading);
      }
    }
  });
});

describe("week 6 pack teaches what week 6 claims", () => {
  const shared = pack.variants.filter((v) => v.carriers.length > 1);

  it("contains a nested subgroup, so a tree can be built at all", () => {
    // Stemmatics needs one shared error's carriers strictly inside another's:
    // that nesting is what distinguishes a branch from a flat list of copies.
    const nested = shared.some((outer) =>
      shared.some(
        (inner) =>
          inner.id !== outer.id &&
          inner.carriers.length < outer.carriers.length &&
          inner.carriers.every((w) => outer.carriers.includes(w)),
      ),
    );
    expect(nested, "no shared variant's carriers nest inside another's").toBe(true);
  });

  it("contains a misleading variant whose carriers cannot be a clade", () => {
    // The trap. A shared reading looks like shared ancestry, and students have
    // to rule it out. It is only ruled out if some other variant splits its
    // carriers — one carrier inside that variant's group, one outside.
    const traps = pack.variants.filter((v) => v.polygenetic && v.carriers.length > 1);
    expect(traps.length, "no polygenetic variant to reason about").toBeGreaterThan(0);

    for (const trap of traps) {
      const split = pack.variants.some((other) => {
        if (other.id === trap.id) return false;
        const inside = trap.carriers.filter((w) => other.carriers.includes(w));
        return inside.length > 0 && inside.length < trap.carriers.length;
      });
      expect(split, `variant ${trap.id} is not contradicted by any other variant`).toBe(true);
    }
  });

  it("leaves one relationship genuinely unresolved", () => {
    // "The evidence does not settle this" has to be a real answer here, or the
    // assessment that follows is dishonest in asking for it.
    expect(pack.identicalText.length).toBeGreaterThan(0);
    for (const group of pack.identicalText) {
      const texts = group.map((w) => expectedText(w));
      expect(new Set(texts).size, `${group.join(" and ")} are not textually identical`).toBe(1);
      expect(group.length).toBeGreaterThan(1);
    }
  });

  it("gives every witness something of its own, so none is a duplicate", () => {
    const sets = pack.witnesses.map((w) =>
      pack.variants.filter((v) => v.carriers.includes(w)).map((v) => v.id).join(","),
    );
    const identical = pack.identicalText.flat();
    const distinguishable = pack.witnesses.filter((w) => !identical.includes(w));
    const theirSets = distinguishable.map((w) => sets[pack.witnesses.indexOf(w)]);
    expect(new Set(theirSets).size, "two witnesses share a variant profile unintentionally").toBe(
      distinguishable.length,
    );
  });
});

describe("the answer stays out of the evidence", () => {
  const ANCESTRY = /\b(archetype|original|parent|ancestor|alpha|beta|gamma|stemma)\b/i;

  it("keeps ancestry language out of the collation table", () => {
    expect(published("collation.csv")).not.toMatch(ANCESTRY);
  });

  it("does not mark any reading as the earlier one", () => {
    // Every variant point shows five readings and no indication of direction;
    // establishing direction is the work.
    const csv = published("collation.csv").split("\n").slice(1).filter(Boolean);
    expect(csv.length).toBe(pack.variants.length);
    for (const row of csv) {
      expect(row).not.toMatch(/\b(correct|true|source|was)\b/i);
    }
  });

  it("keeps the archetype out of the student-facing files", () => {
    const archetypeBody = archetype.slice(1).join("\n");
    for (const file of ["collation.csv", "README.txt"]) {
      expect(published(file), `${file} contains the withheld text`).not.toContain(archetypeBody);
    }
  });
});
