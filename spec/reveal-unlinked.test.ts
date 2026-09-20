import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { describe, expect, it } from "vitest";

// CLAUDE.md: a workshop's reveal/ files may be listed on that workshop's own
// pack index page, but stay locked behind a committed prediction — the pack
// page checks the same `prediction:<sessionSlug>` localStorage record
// PredictionCheck.astro writes, and only wires up a working link once it
// finds one. The shipped HTML must never contain a plain, unconditional
// `href` into reveal/: that would be a link a student can open with zero
// workshop attempted, exactly the site feature CLAUDE.md rules out.
//
// This used to ban any reveal href at all, back when every workshop page
// linked straight into its pack's reveal/ folder unconditionally as part of
// the Deposit step. That absolute ban is gone now that packs/pack-index.ts
// gates reveal links behind a client-side lock check (see packs/pack-index.ts
// and docs/decision-log.md, 2026-09-21) — the gated version never emits a
// static href in the first place (it starts as href="#" and only gets a real
// href set by an inline <script> after the lock check passes), so this
// assertion still holds and still catches the thing it's meant to catch: a
// reveal link wired in unconditionally, with no gate at all. This asserts
// that holds by scanning the actual built site rather than trusting that no
// future workshop or pack page adds the link back unconditionally — the same
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
