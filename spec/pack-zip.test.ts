import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

// Every pack ships a pack.zip so a student can download the whole thing in
// one go instead of opening each file. packs/pack-index.ts builds that zip
// from exactly the `files` array it also renders into index.html, on purpose:
// a pack's reveal/ answer (or, for week 1, worked-answer.md) is only in the
// same folder as the evidence, and the point of last session's
// spec/reveal-unlinked.test.ts was making sure nothing rendered links to it.
// A zip built from "everything in the folder" would have quietly reopened
// that same hole. This checks the zip's real contents match what the page
// actually advertises — no more, no less — rather than trusting that stays
// true by construction.

const PACKS_DIR = resolve("public/packs");

function packDirs(): string[] {
  return readdirSync(PACKS_DIR).filter((entry) =>
    statSync(resolve(PACKS_DIR, entry)).isDirectory(),
  );
}

function indexedFiles(dir: string): string[] {
  const html = readFileSync(resolve(dir, "index.html"), "utf8");
  return [...html.matchAll(/href="\.\/([^"]+)"/g)]
    .map((m) => m[1])
    .filter((name) => name !== "pack.zip");
}

function zipEntries(dir: string): string[] {
  return execFileSync("unzip", ["-Z1", resolve(dir, "pack.zip")], { encoding: "utf8" })
    .trim()
    .split("\n")
    .filter(Boolean);
}

describe("every pack ships a zip matching exactly what its index advertises", () => {
  const dirs = packDirs();

  it("finds pack directories to check", () => {
    expect(dirs.length).toBeGreaterThan(0);
  });

  for (const dir of dirs) {
    const full = resolve(PACKS_DIR, dir);

    it(`${dir}: pack.zip exists and is non-empty`, () => {
      const zipPath = resolve(full, "pack.zip");
      expect(existsSync(zipPath), `${dir}/pack.zip is missing`).toBe(true);
      expect(statSync(zipPath).size, `${dir}/pack.zip is empty`).toBeGreaterThan(0);
    });

    it(`${dir}: pack.zip contains exactly the files its index page links`, () => {
      const advertised = indexedFiles(full).sort();
      const zipped = zipEntries(full).sort();
      expect(
        zipped,
        `${dir}: pack.zip contents [${zipped.join(", ")}] do not match index-advertised files [${advertised.join(", ")}]`,
      ).toEqual(advertised);
    });
  }
});
