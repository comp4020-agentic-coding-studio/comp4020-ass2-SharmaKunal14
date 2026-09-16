import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { resolve, join } from "node:path";
import { describe, expect, it } from "vitest";

// A pack is a folder of files under public/, and a folder is not a page.
// A link to /packs/<name>/ works on a dev server that lists directories and
// returns 404 on GitHub Pages, which does not. The build's own link checker
// validates links between rendered routes and treats a static asset path as
// opaque, so it passed a link that would have been dead on the deployed site —
// the only place this is marked.
//
// This asserts what that checker cannot: every /packs/ link on the site points
// at a file that actually exists in dist.

const DIST = resolve("dist");

function htmlFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) return htmlFiles(path);
    return path.endsWith(".html") ? [path] : [];
  });
}

/** Every href into /packs/, with the base path stripped back off. */
function packLinks(): { page: string; href: string; target: string }[] {
  const links: { page: string; href: string; target: string }[] = [];
  for (const page of htmlFiles(DIST)) {
    for (const match of readFileSync(page, "utf8").matchAll(/href="([^"]*\/packs\/[^"]*)"/g)) {
      const href = match[1];
      const path = href.slice(href.indexOf("/packs/"));
      // A link ending in a slash needs an index.html behind it.
      const target = path.endsWith("/") ? `${path}index.html` : path;
      links.push({ page: page.replace(DIST, "") || "/", href, target });
    }
  }
  return links;
}

describe("pack links survive deployment", () => {
  const links = packLinks();

  it("finds pack links to check", () => {
    expect(links.length, "no page links to a pack").toBeGreaterThan(0);
  });

  it("resolves every pack link to a file that exists", () => {
    for (const link of links) {
      expect(existsSync(resolve(DIST, `.${link.target}`)), `${link.page} links to ${link.href}`).toBe(
        true,
      );
    }
  });

  it("carries the repository base path on every pack link", () => {
    // A root-absolute /packs/... href written by hand skips Astro's base
    // handling and 404s under the deployed prefix.
    const base = readFileSync(resolve(DIST, "index.html"), "utf8").match(
      /href="([^"]*\/policies\/)"/,
    )?.[1];
    const prefix = base!.replace(/policies\/$/, "");
    for (const link of links) {
      expect(link.href.startsWith(prefix), `${link.page}: ${link.href} is missing ${prefix}`).toBe(
        true,
      );
    }
  });
});
