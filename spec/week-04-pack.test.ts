import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { compatible, evidenceFile, loadPack } from "../packs/week-04/build.ts";

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
  it("publishes every observation beside both route predictions", () => {
    const csv = published("observations.csv");
    expect(csv.split("\n")[0]).toBe("property,observed,route_a_predicts,route_b_predicts");
    for (const field of ["width", "height", "fileSizeKb", "chromaSubsampling", "exif"] as const) {
      expect(csv, `observation ${field}`).toContain(
        [field, pack.observed[field], ...pack.routes.map((r) => r.predicted[field])].join(","),
      );
    }
  });

  it("publishes both route cards with their steps", () => {
    const cards = published("route-cards.txt");
    for (const route of pack.routes) {
      expect(cards, `route ${route.id}`).toContain(route.label);
      for (const step of route.steps) expect(cards, `route ${route.id} step`).toContain(step);
    }
  });

  it("publishes the predictions, because nothing here lets a student derive them", () => {
    // An earlier version of this pack withheld them, and a test asserted the
    // withholding. There is no formula, encoder or lookup table in the pack
    // from which a file size could be calculated, so withholding made the
    // activity impossible rather than demanding. Weeks 1 and 3 withhold
    // results a student can compute from a stated rule and supplied inputs;
    // that condition does not hold here. Publishing them gives nothing away:
    // both routes fit, which is the finding.
    const csv = published("observations.csv");
    for (const route of pack.routes) {
      expect(csv, `route ${route.id} prediction must be available to the student`).toContain(
        String(route.predicted.fileSizeKb),
      );
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

describe("every obtainable request has something to open", () => {
  it("ships a file for each available item, carrying a result", () => {
    // Without these the four-step investigation — choose, predict, inspect,
    // revise — cannot be performed at all: a student could only open the full
    // answer and see everything at once.
    const available = pack.evidenceMenu.filter((e) => e.available);
    expect(available.length).toBeGreaterThan(0);
    for (const item of available) {
      expect(item.result, `${item.id} declares no result`).toBeTruthy();
      const file = published(evidenceFile(item));
      expect(file, `${evidenceFile(item)} is missing its result`).toContain(item.result!.split("\n")[0]);
    }
  });

  it("points the menu at the file for every available item", () => {
    const csv = published("evidence-menu.csv");
    for (const item of pack.evidenceMenu.filter((e) => e.available)) {
      expect(csv, `${item.id} has no file to open`).toContain(evidenceFile(item));
    }
  });

  it("keeps each evidence file to its own request", () => {
    // Opening one request must not hand over the others, or the choice is
    // meaningless.
    for (const item of pack.evidenceMenu.filter((e) => e.available)) {
      const file = published(evidenceFile(item));
      for (const other of pack.evidenceMenu.filter((e) => e.available && e.id !== item.id)) {
        expect(file, `${item.id} contains ${other.id}'s result`).not.toContain(
          other.result!.split("\n")[0],
        );
      }
      expect(file, `${item.id} states its own verdict`).not.toContain(item.why);
    }
  });

  it("ships no file for an item that does not exist", () => {
    for (const item of pack.evidenceMenu.filter((e) => !e.available)) {
      expect(() => published(evidenceFile(item)), `${item.id} should have no file`).toThrow();
    }
  });
});

describe("a non-discriminating item really is non-discriminating", () => {
  // The contract that was missing, and the bug it exists for.
  //
  // An earlier version of this pack labelled a transformation-log excerpt
  // non-discriminating while its content read "quality=78". Route A saved at
  // 72 and route B's final save was 78, so the excerpt matched one route and
  // contradicted the other: it separated them, whatever the label said. Every
  // test passed, because the tests read the label rather than the content.
  //
  // Labels are now checked against content, on two fronts.

  it("ends both routes with the same final step, so the last operation cannot tell them apart", () => {
    expect(pack.sharedFinalStep, "no shared final step declared").toBeTruthy();
    for (const route of pack.routes) {
      expect(route.steps.at(-1), `route ${route.id} ends differently`).toBe(pack.sharedFinalStep);
    }
  });

  it("declares the settings that appear in one route and not the other", () => {
    expect(pack.distinguishingValues.length, "nothing declared as distinguishing").toBeGreaterThan(0);
    // Each declared value must genuinely appear in exactly one route.
    for (const value of pack.distinguishingValues) {
      const normalise = (text: string) => text.toLowerCase().replace(/[^a-z0-9]/g, "");
      const needle = normalise(value);
      const carriers = pack.routes.filter((r) => normalise(r.steps.join(" ")).includes(needle));
      expect(carriers.length, `"${value}" is not unique to one route`).toBeLessThanOrEqual(1);
    }
  });

  it("keeps every declared distinguishing value out of every non-discriminating item", () => {
    const honest = pack.evidenceMenu.filter((e) => e.available && !e.discriminates);
    expect(honest.length).toBeGreaterThan(0);
    for (const item of honest) {
      for (const value of pack.distinguishingValues) {
        expect(
          item.result!.toLowerCase(),
          `${item.id} is labelled non-discriminating but contains "${value}"`,
        ).not.toContain(value.toLowerCase());
      }
      // And the file a student actually opens, not just the declaration.
      for (const value of pack.distinguishingValues) {
        expect(
          published(evidenceFile(item)).toLowerCase(),
          `${evidenceFile(item)} contains "${value}"`,
        ).not.toContain(value.toLowerCase());
      }
    }
  });

  it("makes the discriminating item link rather than merely list", () => {
    // A listing of files that co-existed does not establish descent, which is
    // why the working-directory listing is the non-discriminating item. The
    // item that resolves the question has to name what read what.
    const decisive = pack.evidenceMenu.filter((e) => e.discriminates && e.available);
    expect(decisive.length).toBe(1);
    expect(decisive[0].result!.toLowerCase(), "the decisive record names no input").toMatch(
      /\binput\b/,
    );
    expect(decisive[0].result!.toLowerCase(), "the decisive record names no output").toMatch(
      /\boutput\b/,
    );
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

  it("labels the tolerance as a scenario rule rather than a validated figure", () => {
    expect(pack.tolerance.note).toMatch(/scenario rule/i);
    expect(published("tolerance.txt")).toMatch(/scenario rule/i);
  });

  it("states the tolerance rule the way it is actually applied", () => {
    // The note used to say two predictions within 15 KB "of each other" are
    // indistinguishable, while the check compares each prediction against the
    // observation. Different rules; they happened to agree on these numbers.
    expect(pack.tolerance.note, "the note describes a prediction-to-prediction rule").toMatch(
      /within 15 KB of the observed size/i,
    );
    expect(pack.tolerance.note).not.toMatch(/of each other/i);
  });

  it("keeps the artefact's provenance stated as unknown", () => {
    expect(pack.artefact.provenance).toMatch(/unknown/i);
    expect(published("route-cards.txt")).toContain("provenance unknown");
  });
});
