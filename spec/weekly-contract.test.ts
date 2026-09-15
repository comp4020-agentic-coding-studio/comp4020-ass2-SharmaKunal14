import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

// Three promises the course makes on every single workshop page, and that
// nothing in the build can see:
//
//   1. an accessible route, because the course grades reasoning and must never
//      grade hearing or eyesight;
//   2. a named deposit, because the Class Copy Archive is what stops twelve
//      weeks reading as twelve unrelated seminars;
//   3. a declared collection for that deposit, from the fixed set, because
//      ancestry is only meaningful inside one family.
//
// These check presence and allowed classification. Whether the accessible
// route is genuinely equivalent, and whether the deposit is worth depositing,
// are human judgements recorded in docs/decision-log.md.

interface ApiNode {
  id: string;
  type: string;
  meta?: Record<string, unknown>;
}

const api = JSON.parse(
  readFileSync(resolve("dist/api/index.json"), "utf8"),
) as { nodes: ApiNode[] };

const workshops = api.nodes.filter((n) => n.type === "sessions");

/** The collections and model studies in course-plan.md §5. */
const ARCHIVE = ["print", "audio", "image", "sequence-model", "bits", "distribution-model"];

const nonEmpty = (value: unknown) => typeof value === "string" && value.trim().length > 0;

describe("weekly course contract", () => {
  it("covers every published workshop", () => {
    expect(workshops.length).toBe(12);
  });

  it("gives every workshop an accessible route", () => {
    for (const workshop of workshops) {
      expect(nonEmpty(workshop.meta?.accessibleRoute), `${workshop.id}`).toBe(true);
    }
  });

  it("names what every workshop deposits into the archive", () => {
    for (const workshop of workshops) {
      expect(nonEmpty(workshop.meta?.archiveDeposit), `${workshop.id}`).toBe(true);
    }
  });

  it("files every deposit under a declared archive collection", () => {
    for (const workshop of workshops) {
      const declared = workshop.meta?.archiveCollections as string[] | undefined;
      expect(Array.isArray(declared) && declared.length > 0, `${workshop.id}`).toBe(true);
      for (const collection of declared!) {
        expect(ARCHIVE, `${workshop.id} declares "${collection}"`).toContain(collection);
      }
    }
  });

  it("states a learning target on every workshop", () => {
    for (const workshop of workshops) {
      expect(nonEmpty(workshop.meta?.learningTarget), `${workshop.id}`).toBe(true);
    }
  });
});
