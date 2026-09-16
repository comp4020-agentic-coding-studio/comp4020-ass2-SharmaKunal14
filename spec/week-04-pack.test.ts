import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { compatible, loadPack } from "../packs/week-04/build.ts";

// Week 4 asks students to show that a defined evidence set cannot separate two
// histories, then to ask for evidence that could. The whole week is void unless
// both routes genuinely fit the observations at the declared tolerance — a pack
// that asserts ambiguity it does not have is teaching students to accept an
// assertion, which is the opposite of the point.
//
// It also needs at least one available item that does separate them and at
// least one that does not, or the lesson collapses into either "ask for more
// evidence and you will get an answer" or "nothing can ever be known".

const pack = loadPack();
const OUT = resolve("public/packs/week-04");
const published = (path: string) => readFileSync(`${OUT}/${path}`, "utf8");

describe("week 4 pack is what it publishes", () => {
  it("publishes every observation", () => {
    const csv = published("observations.csv");
    expect(csv).toContain(`width_px,${pack.observed.width}`);
    expect(csv).toContain(`file_size_kb,${pack.observed.fileSizeKb}`);
    expect(csv).toContain(`quality_estimate,${pack.observed.qualityEstimate}`);
    expect(csv).toContain(`chroma_subsampling,${pack.observed.chromaSubsampling}`);
  });

  it("publishes both route cards with their steps", () => {
    const cards = published("route-cards.txt");
    for (const route of pack.routes) {
      expect(cards, `route ${route.id}`).toContain(route.label);
      for (const step of route.steps) expect(cards, `route ${route.id} step`).toContain(step);
    }
  });

  it("withholds the route predictions, because checking them is the task", () => {
    const studentFacing = ["route-cards.txt", "observations.csv", "tolerance.txt", "evidence-menu.csv", "README.txt"];
    for (const file of studentFacing) {
      const text = published(file);
      for (const route of pack.routes) {
        // The predicted size and quality are the numbers a student derives.
        expect(text, `${file} leaks route ${route.id}'s predicted size`).not.toContain(
          String(route.predicted.fileSizeKb),
        );
      }
    }
  });

  it("marks unavailable evidence as unavailable, with a reason", () => {
    const csv = published("evidence-menu.csv");
    for (const item of pack.evidenceMenu.filter((e) => !e.available)) {
      expect(item.unavailableBecause, `${item.id} has no reason`).toBeTruthy();
      expect(csv, `${item.id}`).toContain(`unavailable — ${item.unavailableBecause}`);
    }
  });
});

describe("week 4 pack is genuinely ambiguous", () => {
  it("has at least two routes", () => {
    expect(pack.routes.length).toBeGreaterThanOrEqual(2);
  });

  it("makes every route compatible with the observations at the declared tolerance", () => {
    // This is the assertion the week rests on. If a route does not fit, the
    // honest fix is to revise the pack, never to assert the ambiguity anyway.
    for (const route of pack.routes) {
      expect(compatible(pack, route), `route ${route.id} does not fit the observations`).toBe(true);
    }
  });

  it("keeps the routes distinguishable in principle, not just in practice", () => {
    // Two routes with identical steps would be one route. The ambiguity has to
    // be about the evidence being thin, not about there being nothing to tell.
    const signatures = pack.routes.map((r) => r.steps.join(" | "));
    expect(new Set(signatures).size).toBe(pack.routes.length);
  });

  it("offers at least one available item that separates the routes", () => {
    const useful = pack.evidenceMenu.filter((e) => e.available && e.discriminates);
    expect(useful.length, "no obtainable evidence can settle the question").toBeGreaterThan(0);
  });

  it("offers at least one available item that does not separate them", () => {
    // A student who asks for reasonable evidence and still cannot resolve the
    // question has done the week correctly, and the pack has to make that
    // outcome reachable.
    const honest = pack.evidenceMenu.filter((e) => e.available && !e.discriminates);
    expect(honest.length, "every obtainable item resolves it, so asking is risk-free").toBeGreaterThan(0);
  });

  it("marks at least one item as not existing", () => {
    expect(pack.evidenceMenu.filter((e) => !e.available).length).toBeGreaterThan(0);
  });

  it("gives every menu item a stated reason", () => {
    for (const item of pack.evidenceMenu) {
      expect(item.why.length, `${item.id} has no reasoning`).toBeGreaterThan(40);
    }
  });
});

describe("the answer stays out of the evidence", () => {
  const STUDENT_FACING = [
    "observations.csv", "tolerance.txt", "route-cards.txt", "evidence-menu.csv", "README.txt",
  ];

  it("does not say which route produced the artefact", () => {
    for (const file of STUDENT_FACING) {
      expect(published(file), `${file} reveals the answer`).not.toContain(pack.reveal.truth);
      expect(published(file), `${file} leaks which route it was`).not.toMatch(
        /\broute [AB] (was|produced|is the)\b/i,
      );
    }
  });

  it("does not say which evidence separates the routes", () => {
    for (const file of STUDENT_FACING) {
      const text = published(file);
      for (const item of pack.evidenceMenu) {
        expect(text, `${file} leaks the reasoning for ${item.id}`).not.toContain(item.why);
      }
    }
  });

  it("keeps the artefact's provenance stated as unknown", () => {
    expect(pack.artefact.provenance).toMatch(/unknown/i);
    expect(published("route-cards.txt")).toContain("provenance unknown");
  });
});
