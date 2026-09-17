import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

// CLAUDE.md: "Record actual choices and checks in docs/decision-log.md."
// That rule had no check behind it — nothing stopped the log being written
// once at the end from memory, which is exactly the kind of after-the-fact
// narrative the assignment brief's "legibility of process" criterion is
// trying to rule out. This asserts the log actually grew alongside the
// content, day by day, rather than being backfilled: every calendar day that
// touched src/content or src/decks has a same-day dated entry in the log.

function commitDays(paths: string[]): string[] {
  // %H the commit precedes %ad so the initial (starter-content) commit,
  // predating any decision-log work, can be excluded by hash rather than by
  // date — excluding "the first commit" is a stable rule; excluding "the
  // earliest date" would silently swallow a real day if content ever changed
  // again on that same calendar date.
  const initialCommit = execFileSync("git", ["rev-list", "--max-parents=0", "HEAD"], {
    encoding: "utf8",
  }).trim();
  const out = execFileSync(
    "git",
    ["log", "--format=%H %ad", "--date=short", "--", ...paths],
    { encoding: "utf8" },
  ).trim();
  if (!out) return [];
  const days = out
    .split("\n")
    .map((line) => line.split(" "))
    .filter(([hash]) => hash !== initialCommit)
    .map(([, day]) => day);
  return [...new Set(days)];
}

function loggedDays(): Set<string> {
  const text = readFileSync(resolve("docs/decision-log.md"), "utf8");
  const days = [...text.matchAll(/^## (\d{4}-\d{2}-\d{2})/gm)].map((match) => match[1]);
  return new Set(days);
}

describe("decision log stays current with content work", () => {
  const contentDays = commitDays(["src/content", "src/decks"]);
  const logged = loggedDays();

  it("finds commit days to check", () => {
    expect(contentDays.length).toBeGreaterThan(0);
  });

  it("has a dated decision-log entry for every day content changed", () => {
    for (const day of contentDays) {
      expect(logged.has(day), `${day} touched src/content or src/decks but has no ## ${day} entry`).toBe(
        true,
      );
    }
  });
});
