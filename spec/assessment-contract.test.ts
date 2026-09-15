import { readFileSync } from "node:fs";
import { readdirSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

// What the course promises about being assessed. The content schema already
// validates that a weighted rubric's own criteria total 100; it cannot see
// that the four assessments together total 100, that The Stemma's evidence
// pack cannot exist before the workshop that produces it, or that a brief
// still links the policies it defers to.

interface ApiNode {
  id: string;
  type: string;
  meta?: Record<string, unknown>;
}

const api = JSON.parse(
  readFileSync(resolve("dist/api/index.json"), "utf8"),
) as { nodes: ApiNode[] };

const assessments = api.nodes.filter((n) => n.type === "assessments");
const find = (slug: string) => assessments.find((a) => a.id === `assessments/${slug}`)!;
const at = (node: ApiNode, key: string) => String(node.meta?.[key]);

describe("assessment contract", () => {
  it("has the four published assessments", () => {
    expect(assessments.map((a) => a.id).sort()).toEqual([
      "assessments/generation-checks",
      "assessments/the-chain",
      "assessments/the-lossless-argument",
      "assessments/the-stemma",
    ]);
  });

  it("totals exactly 100%", () => {
    const total = assessments.reduce((sum, a) => sum + Number(a.meta?.weight), 0);
    expect(total).toBe(100);
  });

  it("marks the three major pieces against published criteria", () => {
    for (const slug of ["the-chain", "the-stemma", "the-lossless-argument"]) {
      const marking = find(slug).meta?.marking as { mode?: string } | undefined;
      expect(marking?.mode, `${slug} marking mode`).toBe("weighted");
    }
  });

  it("releases The Stemma's pack after the workshop that produces it", () => {
    // Week 6's workshop is where the reconstruction method is taught and the
    // witnesses are made. A pack released before it would hand students the
    // assessment before the method, and one released after the deadline would
    // be unusable. Both are silent failures on a rendered page.
    const week6 = api.nodes.find((n) => n.id === "sessions/06-stemma")!;
    const stemma = find("the-stemma");
    const workshopEnd = Date.parse(`${at(week6, "date")}T14:00:00+11:00`);
    const release = Date.parse(at(stemma, "packReleased"));
    const deadline = Date.parse(at(stemma, "due"));

    expect(Number.isNaN(release), "the-stemma declares no packReleased").toBe(false);
    expect(release).toBeGreaterThanOrEqual(workshopEnd);
    expect(release).toBeLessThan(deadline);
  });

  it("orders the three deadlines by the weeks that prepare them", () => {
    const due = (slug: string) => Date.parse(at(find(slug), "due"));
    expect(due("the-chain")).toBeLessThan(due("the-stemma"));
    expect(due("the-stemma")).toBeLessThan(due("the-lossless-argument"));
  });

  it("sets the final deadline after the last workshop", () => {
    const lastWorkshop = api.nodes
      .filter((n) => n.type === "sessions")
      .map((n) => at(n, "date"))
      .sort()
      .at(-1)!;
    expect(Date.parse(at(find("the-lossless-argument"), "due"))).toBeGreaterThan(
      Date.parse(`${lastWorkshop}T23:59:59+10:00`),
    );
  });
});

describe("assessment briefs link the policies they defer to", () => {
  // Rendered output, not frontmatter: a brief that mentions policies in prose
  // but emits an href missing the repository base path works on localhost and
  // 404s on the deployed site, which is the only place this is marked.
  const html = (path: string) => readFileSync(resolve("dist", path, "index.html"), "utf8");

  // Derive the deployed policies URL from the build itself rather than
  // hardcoding a base path that only this repository has.
  const policiesHref = html("")
    .match(/href="([^"]*\/policies\/)"/)?.[1];

  it("resolves a base-safe policies URL from the build", () => {
    expect(policiesHref, "no policies link found on the home page").toBeTruthy();
  });

  it("links it from every brief", () => {
    const slugs = readdirSync(resolve("dist/assessments")).filter((name) =>
      name !== "index.html" && !name.startsWith("."),
    );
    expect(slugs.length).toBe(4);
    for (const slug of slugs) {
      const body = html(`assessments/${slug}`);
      const links = [...body.matchAll(/href="([^"]*)"/g)].map((m) => m[1]);
      expect(links, `assessments/${slug}`).toContain(policiesHref);
    }
  });
});
