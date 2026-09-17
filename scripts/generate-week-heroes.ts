#!/usr/bin/env node
// One-off generator for the twelve per-week hero images
// (src/assets/images/hero-week-01.avif ... hero-week-12.avif). Each banner
// carries one real, short, concrete detail drawn from that week's own
// lecture/pack content, so the imagery names an actual specimen rather than
// standing in as decoration disconnected from the course — the same rule
// CLAUDE.md applies to prose. Run once with
// `mise exec -- npx tsx scripts/generate-week-heroes.ts`; not part of
// `pnpm check`.
import sharp from "sharp";

const GOLD = "#b97d1c";
const BRONZE = "#8a5c13";
const INK = "#2a2521";
const CREAM = "#f5efe4";

const esc = (s: string): string =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

interface Week {
  n: string;
  title: string;
  detail: string;
  caption: string;
}

const WEEKS: Week[] = [
  {
    n: "01",
    title: "The office that ate itself",
    detail: '"The clerk in Room 108 filed 1,051 slips before noon."',
    caption: "Copy room test card 0S1I-B85l, line 1",
  },
  {
    n: "02",
    title: "Hiss as a signature",
    detail: "Copies X and Y both carry a 40ms dropout, left channel",
    caption: "A shared feature, and the assumption it rests on",
  },
  {
    n: "03",
    title: "What the ear cannot hear",
    detail: "1 → 10 encode cycles, 320 → 96 kbps",
    caption: "Two changed variables, one 9.5-point difference",
  },
  {
    n: "04",
    title: "The poor image",
    detail: "Output 7 — 1200×800, 148 KB, 4:2:0",
    caption: "Five observations, two competing histories",
  },
  {
    n: "05",
    title: "The scriptorium",
    detail: "Ordinance of the Copy-House — twelve numbered lines",
    caption: "A branching hand-copied text, withheld until week 6",
  },
  {
    n: "06",
    title: "Reading the damage backwards",
    detail: "Five witnesses, one shared copying error",
    caption: "Reconstructing a stemma from damage, not memory",
  },
  {
    n: "07",
    title: "When ancestry becomes hard to read",
    detail: "24-symbol ancestor, 4-symbol alphabet, 40 generations",
    caption: "A simplified model, explicit omissions declared",
  },
  {
    n: "08",
    title: "Copying without loss",
    detail: "payload 1011 → codeword 111 000 111 111",
    caption: "A 3× repetition code, worked by hand",
  },
  {
    n: "09",
    title: "The curse of recursion",
    detail: "Category F, fixed at 3% true probability",
    caption: "Watching a rare case disappear under re-estimation",
  },
  {
    n: "10",
    title: "Enhance",
    detail: "An 8×8 synthetic tone chart, 2×2 block-averaged",
    caption: "Restoration compared against a retained original",
  },
  {
    n: "11",
    title: "Chain of custody",
    detail: "Two manifests, one publishing log, two undisclosed changes",
    caption: "What a provenance record establishes — and omits",
  },
  {
    n: "12",
    title: "The original that never was",
    detail: "$104.005 vs $118.010 against a $120 budget",
    caption: "A preservation budget across three families",
  },
];

function heroSvg(week: Week): string {
  const width = 1600;
  const height = 500;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <rect width="${width}" height="${height}" fill="${CREAM}"/>
  <rect x="0" y="0" width="${width}" height="10" fill="${GOLD}"/>
  <text x="70" y="90" font-family="monospace" font-size="24" fill="${BRONZE}" letter-spacing="2">SLOP8350 &#8212; WEEK ${week.n}</text>
  <text x="70" y="160" font-family="sans-serif" font-size="52" font-weight="700" fill="${INK}">${esc(week.title)}</text>
  <rect x="70" y="220" width="${width - 140}" height="150" fill="none" stroke="${BRONZE}" stroke-width="2"/>
  <text x="100" y="290" font-family="monospace" font-size="28" fill="${GOLD}">${esc(week.detail)}</text>
  <text x="100" y="335" font-family="sans-serif" font-size="20" fill="${BRONZE}">${esc(week.caption)}</text>
</svg>`;
}

async function main(): Promise<void> {
  for (const week of WEEKS) {
    const path = `src/assets/images/hero-week-${week.n}.avif`;
    await sharp(Buffer.from(heroSvg(week))).avif({ quality: 60 }).toFile(path);
    console.log(`wrote ${path}`);
  }
}

main();
