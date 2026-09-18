import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { describe, expect, it } from "vitest";

// CLAUDE.md: "A workshop's `reveal/` answer is never linked from any rendered
// page. Sharing the reveal path after a workshop is a manual step, not a site
// feature."
//
// It used to be a site feature: every workshop's own page linked straight
// into its pack's reveal/ folder as part of the Deposit step, so a student
// could open the answer at any time with one click, no workshop attempted.
// This asserts the fix holds by scanning the actual built site rather than
// trusting that no future workshop page adds the link back — the same
// dist-scanning approach spec/pack-links.test.ts already proves works for
// pack links in general.

const DIST = resolve("dist");
const REVEAL_HREF = /href="([^"]*\/packs\/[^"]*\/reveal\/[^"]*)"/;

function htmlFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) return htmlFiles(path);
    return path.endsWith(".html") ? [path] : [];
  });
}

describe("no rendered page links directly into a pack's reveal folder", () => {
  it("finds pack pages to check", () => {
    expect(existsSync(resolve(DIST, "packs")), "dist/packs is missing — run pnpm build first").toBe(
      true,
    );
    expect(readdirSync(resolve(DIST, "packs")).length).toBeGreaterThan(0);
  });

  it("links no page to a pack's reveal/ path", () => {
    for (const page of htmlFiles(DIST)) {
      const match = readFileSync(page, "utf8").match(REVEAL_HREF);
      expect(match, `${page.replace(DIST, "")} links directly to ${match?.[1]}`).toBeNull();
    }
  });
});
