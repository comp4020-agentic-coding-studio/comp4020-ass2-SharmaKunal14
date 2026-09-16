import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { difference, loadPack, total, varied } from "../packs/week-03/build.ts";

// Week 3 teaches students to spot a confound and repair it. That requires a
// pack containing a genuinely confounded comparison, a repair that isolates one
// variable, and — the part most easily lost — a corrected comparison whose
// honest answer is "no effect this measure can see". Without the null, the week
// teaches that a well-designed experiment finds the effect you expected, which
// is the opposite of the lesson.

const pack = loadPack();
const OUT = resolve("public/packs/week-03");
const published = (path: string) => readFileSync(`${OUT}/${path}`, "utf8");
const byId = Object.fromEntries(pack.conditions.map((c) => [c.id, c]));

describe("week 3 pack is what it publishes", () => {
  it("publishes the raw band deviations for every condition", () => {
    const csv = published("band-deviations.csv");
    for (const c of pack.conditions) {
      expect(csv, `condition ${c.id}`).toContain(
        [c.id, c.bitrate ?? "none", c.cycles, c.operations, ...c.deviations].join(","),
      );
    }
  });

  it("withholds the totals, because computing them is the measurement", () => {
    const csv = published("band-deviations.csv");
    expect(csv.split("\n")[0]).not.toMatch(/total/i);
    // A row must carry exactly the four descriptors plus one value per band.
    for (const row of csv.trim().split("\n").slice(1)) {
      expect(row.split(",").length, `row ${row.split(",")[0]}`).toBe(4 + pack.bands.length);
    }
  });

  it("matches the reveal's totals to the measure applied to the raw data", () => {
    const analysis = published("reveal/analysis.md");
    for (const c of pack.conditions) {
      expect(analysis, `total for ${c.id}`).toContain(
        `| ${c.label} | ${c.bitrate ?? "none"} | ${c.cycles} | ${total(c)} |`,
      );
    }
  });
});

describe("week 3 pack contains a confound, a repair and a null", () => {
  it("publishes exactly one comparison, and it is confounded", () => {
    const shown = pack.comparisons.filter((c) => c.published);
    expect(shown.length, "the student is handed one comparison to judge").toBe(1);
    expect(
      varied(pack, shown[0]).length,
      "the published comparison changes only one variable, so there is nothing to spot",
    ).toBeGreaterThan(1);
  });

  it("has a corrected comparison that isolates the cycle count", () => {
    const corrected = pack.comparisons.filter((c) => varied(pack, c).join() === "cycles");
    expect(corrected.length, "no comparison isolates the independent variable").toBeGreaterThan(0);
    for (const c of corrected) {
      expect(byId[c.left].bitrate, `${c.id} does not hold bitrate fixed`).toBe(byId[c.right].bitrate);
    }
  });

  it("has a corrected comparison whose honest answer is no measurable effect", () => {
    const nulls = pack.comparisons.filter(
      (c) =>
        varied(pack, c).length === 1 &&
        Math.abs(difference(pack, c)) <= pack.measure.repeatability,
    );
    expect(nulls.length, "every sound comparison finds an effect — the null is missing").toBeGreaterThan(0);
  });

  it("has a corrected comparison that does find an effect, above repeatability", () => {
    const real = pack.comparisons.filter(
      (c) =>
        varied(pack, c).length === 1 &&
        Math.abs(difference(pack, c)) > pack.measure.repeatability,
    );
    expect(real.length, "no sound comparison finds anything, so the null is uninformative").toBeGreaterThan(0);
  });

  it("makes the confounded comparison overstate the real effect", () => {
    // The point of the repair is that it changes the answer. If the confounded
    // difference matched the corrected one, spotting the confound would be an
    // academic exercise with no consequence.
    const confounded = pack.comparisons.find((c) => varied(pack, c).length > 1)!;
    const real = pack.comparisons.find(
      (c) => varied(pack, c).length === 1 && Math.abs(difference(pack, c)) > pack.measure.repeatability,
    )!;
    expect(Math.abs(difference(pack, confounded))).toBeGreaterThan(
      Math.abs(difference(pack, real)) * 2,
    );
  });

  it("leaves the exact-copy control at zero", () => {
    const control = pack.conditions.find((c) => c.cycles === 0)!;
    expect(control.bitrate, "the control must not involve an encoder").toBeNull();
    expect(total(control)).toBe(0);
    expect(control.operations, "the control must run as many operations as the chains").toBe(
      Math.max(...pack.conditions.map((c) => c.operations)),
    );
  });
});

describe("the answer stays out of the evidence", () => {
  const STUDENT_FACING = [
    "band-deviations.csv", "measure.txt", "the-comparison.txt",
    "protocol-template.txt", "README.txt",
  ];

  it("names no confound and no verdict in any student-facing file", () => {
    for (const file of STUDENT_FACING) {
      expect(published(file), `${file} gives the answer away`).not.toMatch(
        /\b(confound|confounded|corrected|null result|overstat)\w*\b/i,
      );
    }
  });

  it("publishes no comparison marked unpublished", () => {
    const hidden = pack.comparisons.filter((c) => !c.published);
    expect(hidden.length).toBeGreaterThan(0);
    for (const file of STUDENT_FACING) {
      for (const c of hidden) {
        expect(published(file), `${file} reveals comparison ${c.id}`).not.toContain(c.claim);
      }
    }
  });
});
