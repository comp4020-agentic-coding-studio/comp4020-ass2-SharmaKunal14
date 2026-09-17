import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

// CLAUDE.md: "List no reading a student cannot reach. Give every reading a
// locator (page, section or chapter) and either a direct link to a
// retrievable copy or, where the work is a book or paywalled, an original
// teaching summary of the specific claim being used."
//
// Nothing previously checked this — it was editorial judgement only. This
// scans every lecture/session page for a citation block (a paragraph
// starting "*From ") and asserts each one actually carries a locator and
// either a link or an explicit no-link teaching summary, rather than trusting
// that every future week will follow the pattern the first four happened to.

const CONTENT_DIRS = ["src/content/lectures", "src/content/sessions"];

const LOCATOR = /chapter|introduction|page|pp\.|§|part \d|#\d+/i;
const LINK_OR_SUMMARY =
  /https?:\/\/|www\.|\.com|\.org|\.edu|available (through|at)|no linkable copy exists|free at/i;

interface Citation {
  file: string;
  block: string;
}

function markdownFiles(dir: string): string[] {
  return readdirSync(resolve(dir))
    .filter((entry) => entry.endsWith(".md") || entry.endsWith(".mdx"))
    .map((entry) => resolve(dir, entry));
}

function citationsIn(file: string): Citation[] {
  const text = readFileSync(file, "utf8");
  const paragraphs = text.split(/\n\s*\n/);
  return paragraphs
    .filter((paragraph) => paragraph.trimStart().startsWith("*From "))
    .map((block) => ({ file, block: block.replace(/\s+/g, " ") }));
}

describe("every cited reading has a locator and is reachable or summarised", () => {
  const citations = CONTENT_DIRS.flatMap((dir) => markdownFiles(dir).flatMap(citationsIn));

  it("finds citation blocks to check", () => {
    expect(citations.length).toBeGreaterThan(0);
  });

  it("gives every citation a locator", () => {
    for (const { file, block } of citations) {
      expect(LOCATOR.test(block), `${file}: citation has no page/chapter/section locator`).toBe(
        true,
      );
    }
  });

  it("gives every citation a link or an explicit teaching summary", () => {
    for (const { file, block } of citations) {
      expect(
        LINK_OR_SUMMARY.test(block),
        `${file}: citation has neither a retrievable link nor an explicit no-link summary`,
      ).toBe(true);
    }
  });
});
