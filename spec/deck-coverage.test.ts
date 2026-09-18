import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

// CLAUDE.md: "Every published lecture ships a slide deck wired via its
// `slides` frontmatter, and every deck carries a `## Text walkthrough`
// section so the content is not locked behind the deck view."
//
// Nothing previously checked this — a lecture could go out with no `slides`
// field, or with one pointing at a deck file that was never created, or with
// a deck that dropped the accessible prose fallback, and only a human
// reading every lecture page would notice. This asserts every lecture in
// `src/content/lectures` declares `slides: /decks/<name>/`, that
// `src/decks/<name>.deck.mdx` actually exists for it, and that the deck file
// contains a `## Text walkthrough` heading.

const LECTURES_DIR = "src/content/lectures";
const DECKS_DIR = "src/decks";

const SLIDES_FIELD = /^slides:\s*\/decks\/([a-z0-9-]+)\/\s*$/m;

function lectureFiles(): string[] {
  return readdirSync(resolve(LECTURES_DIR))
    .filter((entry) => entry.endsWith(".md"))
    .map((entry) => resolve(LECTURES_DIR, entry));
}

describe("every lecture ships a wired, accessible slide deck", () => {
  const lectures = lectureFiles();

  it("finds lectures to check", () => {
    expect(lectures.length).toBeGreaterThan(0);
  });

  it("gives every lecture a slides frontmatter field", () => {
    for (const file of lectures) {
      const text = readFileSync(file, "utf8");
      expect(SLIDES_FIELD.test(text), `${file}: missing "slides: /decks/<name>/" frontmatter`).toBe(
        true,
      );
    }
  });

  it("points every slides field at a deck file that actually exists", () => {
    for (const file of lectures) {
      const text = readFileSync(file, "utf8");
      const match = text.match(SLIDES_FIELD);
      if (!match) continue;
      const deckPath = resolve(DECKS_DIR, `${match[1]}.deck.mdx`);
      expect(existsSync(deckPath), `${file}: slides field points at ${deckPath}, which does not exist`).toBe(
        true,
      );
    }
  });

  it("gives every deck a Text walkthrough section for readers who cannot use the deck view", () => {
    for (const file of lectures) {
      const text = readFileSync(file, "utf8");
      const match = text.match(SLIDES_FIELD);
      if (!match) continue;
      const deckPath = resolve(DECKS_DIR, `${match[1]}.deck.mdx`);
      if (!existsSync(deckPath)) continue;
      const deckText = readFileSync(deckPath, "utf8");
      expect(
        /^## Text walkthrough/m.test(deckText),
        `${deckPath}: no "## Text walkthrough" section`,
      ).toBe(true);
    }
  });
});
