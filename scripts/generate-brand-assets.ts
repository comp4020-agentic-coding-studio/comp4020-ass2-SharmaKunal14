#!/usr/bin/env node
// One-off generator for the two starter brand images the theme ships
// (src/assets/images/card.png, hero-home.avif). Both are built from real
// week 1 pack data — the copy room test card and the R1 transcription
// errors actually recorded in packs/week-01/transcriptions.json — rather
// than stock or generated artwork, so the site's own social preview and
// homepage hero show the course's first real specimen instead of
// decoration. Run once with `mise exec -- npx tsx scripts/generate-brand-assets.ts`;
// not part of `pnpm check`.
import { readFileSync } from "node:fs";
import sharp from "sharp";

const GOLD = "#b97d1c";
const BRONZE = "#8a5c13";
const INK = "#2a2521";
const CREAM = "#f5efe4";

const transcriptions = JSON.parse(
  readFileSync("packs/week-01/transcriptions.json", "utf8"),
) as {
  copies: { id: string; operations: number; readers: Record<string, { line: string; from: string; to: string }[]> }[];
};

const CARD_LINE = "The clerk in Room 108 filed 1,051 slips before noon.";

/** Applies every R1 error recorded for one copy's L1 to the card's L1 text,
 *  so the degraded line shown is the pack's own recorded reading, not an
 *  invented one. */
function degradedLine(copyId: string): string {
  const copy = transcriptions.copies.find((c) => c.id === copyId)!;
  let line = CARD_LINE;
  for (const err of copy.readers.R1.filter((e) => e.line === "L1")) {
    line = line.replace(err.from, err.to);
  }
  return line;
}

const esc = (s: string): string => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function cardSvg(): string {
  const width = 1200;
  const height = 630;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <rect width="${width}" height="${height}" fill="${CREAM}"/>
  <rect x="0" y="0" width="${width}" height="10" fill="${GOLD}"/>
  <text x="60" y="100" font-family="monospace" font-size="28" fill="${BRONZE}" letter-spacing="2">SLOP8350</text>
  <text x="60" y="160" font-family="sans-serif" font-size="56" font-weight="700" fill="${INK}">Generation Loss</text>
  <text x="60" y="210" font-family="sans-serif" font-size="26" fill="${BRONZE}">A specimen archive for a course on copying, evidence and inference.</text>

  <rect x="60" y="270" width="1080" height="280" fill="none" stroke="${BRONZE}" stroke-width="2"/>
  <text x="90" y="315" font-family="monospace" font-size="20" fill="${INK}" letter-spacing="1">COPY ROOM TEST CARD 0S1I-B85l</text>
  <text x="90" y="360" font-family="monospace" font-size="22" fill="${INK}">${esc(CARD_LINE)}</text>
  <text x="90" y="400" font-family="monospace" font-size="22" fill="${GOLD}">${esc(degradedLine("g8"))}</text>
  <text x="90" y="440" font-family="sans-serif" font-size="18" fill="${BRONZE}">card, line 1 — and the same line after 8 photocopy operations</text>
  <text x="90" y="500" font-family="sans-serif" font-size="18" fill="${BRONZE}">Week 1's own control: 8 digital copies of this card, checksummed at every</text>
  <text x="90" y="525" font-family="sans-serif" font-size="18" fill="${BRONZE}">step, come back identical. The damage belongs to the photocopier.</text>
</svg>`;
}

function heroSvg(): string {
  const width = 2560;
  const height = 1086;
  const rows: { label: string; line: string; y: number }[] = [
    { label: "source", line: CARD_LINE, y: 0 },
    { label: "1 copy", line: degradedLine("g1"), y: 1 },
    { label: "4 copies", line: degradedLine("g4"), y: 2 },
    { label: "8 copies", line: degradedLine("g8"), y: 3 },
  ];
  const top = 300;
  const rowHeight = 130;
  const rowSvgs = rows
    .map((r) => {
      const y = top + r.y * rowHeight;
      return `
  <text x="220" y="${y}" font-family="monospace" font-size="22" fill="${BRONZE}" text-anchor="end">${esc(r.label)}</text>
  <text x="260" y="${y}" font-family="monospace" font-size="30" fill="${r.y === 0 ? INK : GOLD}">${esc(r.line)}</text>`;
    })
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <rect width="${width}" height="${height}" fill="${CREAM}"/>
  <rect x="0" y="0" width="${width}" height="14" fill="${GOLD}"/>
  <text x="220" y="150" font-family="sans-serif" font-size="72" font-weight="700" fill="${INK}">Generation Loss</text>
  <text x="220" y="205" font-family="sans-serif" font-size="30" fill="${BRONZE}">Copy room test card 0S1I-B85l, line 1 — the same photocopy chain week 1 works from.</text>
  ${rowSvgs}
  <text x="220" y="${top + rows.length * rowHeight + 40}" font-family="sans-serif" font-size="22" fill="${BRONZE}">Real transcription errors from packs/week-01/transcriptions.json (reader R1). An authored teaching scenario, not a recorded photocopier.</text>
</svg>`;
}

async function main(): Promise<void> {
  await sharp(Buffer.from(cardSvg())).png().toFile("src/assets/images/card.png");
  console.log("wrote src/assets/images/card.png");

  await sharp(Buffer.from(heroSvg())).avif({ quality: 60 }).toFile("src/assets/images/hero-home.avif");
  console.log("wrote src/assets/images/hero-home.avif");
}

main();
