#!/usr/bin/env node
// One-off generator for the twelve per-week hero images
// (src/assets/images/hero-week-01.avif ... hero-week-12.avif).
//
// These used to be text cards (title + a real detail from that week's pack,
// baked into the image as SVG <text>). That fought the theme's own Hero
// component, which renders the page's actual title as an <h1> on top of the
// image — so every banner showed the same words twice, once blurry-small in
// the background and once sharp on top. The image's job here is texture and
// mood behind that overlaid heading, not a second headline: each week gets
// an abstract, textured motif built from its own theme (a fan of degrading
// photocopies, a waveform with a dropout, a stemma's branching lines...)
// with no text at all. Run once with
// `mise exec -- npx tsx scripts/generate-week-heroes.ts`; not part of
// `pnpm check`.
import sharp from "sharp";

const GOLD = "#b97d1c";
const BRONZE = "#8a5c13";
const INK = "#2a2521";
const CREAM = "#f5efe4";
const PAPER = "#efe6d3";

const WIDTH = 1600;
const HEIGHT = 500;

/** Tiny deterministic PRNG so re-running the script reproduces the same
 *  artwork instead of regenerating slightly different noise every time. */
function rng(seed: number): () => number {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/** Shared paper-grain background: a soft cream/gold gradient plus a subtle
 *  turbulence-based grain, so every banner shares one "natural material"
 *  base regardless of the motif drawn on top of it. */
function base(seed: number): string {
  return `
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${CREAM}"/>
      <stop offset="1" stop-color="${PAPER}"/>
    </linearGradient>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="${seed}" result="noise"/>
      <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.05 0"/>
    </filter>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" filter="url(#grain)"/>
  <rect width="${WIDTH}" height="6" fill="${GOLD}"/>`;
}

interface Week {
  n: string;
  motif: (seed: number) => string;
}

/** Week 1 — office photocopier. A fan of paper sheets, each rotated a
 *  little further and a little more washed-out, as if peeled off a stack of
 *  successive photocopies. */
function motifCopies(): string {
  const sheets = 7;
  let out = "";
  for (let i = 0; i < sheets; i++) {
    const t = i / (sheets - 1);
    const rot = -10 + t * 26;
    const cx = 1180 + t * 90;
    const cy = 250;
    const w = 300;
    const h = 400;
    const opacity = 0.85 - t * 0.45;
    const blur = t * 1.4;
    out += `<g transform="rotate(${rot.toFixed(1)} ${cx} ${cy})" opacity="${opacity.toFixed(2)}">
      <rect x="${cx - w / 2}" y="${cy - h / 2}" width="${w}" height="${h}" rx="4"
        fill="#fffdf7" stroke="${BRONZE}" stroke-width="1.5" filter="blur(${blur.toFixed(1)}px)"/>
      <line x1="${cx - w / 2 + 30}" y1="${cy - h / 2 + 60}" x2="${cx + w / 2 - 30}" y2="${cy - h / 2 + 60}"
        stroke="${INK}" stroke-width="3" opacity="0.35" filter="blur(${blur.toFixed(1)}px)"/>
      <line x1="${cx - w / 2 + 30}" y1="${cy - h / 2 + 90}" x2="${cx + w / 2 - 60}" y2="${cy - h / 2 + 90}"
        stroke="${INK}" stroke-width="3" opacity="0.25" filter="blur(${blur.toFixed(1)}px)"/>
    </g>`;
  }
  return out;
}

/** Week 2 — hiss as a signature. Two overlapping waveforms sharing a
 *  dropout, the shared "signature" the workshop is built around. */
function motifWaveform(seed: number, dropoutFrac: number): string {
  const rand = rng(seed);
  const points = (offsetY: number, amp: number, phase: number): string => {
    const pts: string[] = [];
    const n = 160;
    for (let i = 0; i <= n; i++) {
      const x = (i / n) * WIDTH;
      const t = i / n;
      const inDropout = Math.abs(t - dropoutFrac) < 0.03;
      const wobble = (rand() - 0.5) * 6;
      const envelope = 0.55 + 0.45 * Math.sin(t * 9 + phase * 2);
      const y =
        HEIGHT / 2 +
        offsetY +
        (inDropout ? wobble * 0.3 : Math.sin(t * 38 + phase) * amp * envelope + wobble);
      pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return pts.join(" ");
  };
  return `
    <polyline points="${points(-40, 46, 0)}" fill="none" stroke="${BRONZE}" stroke-width="3" opacity="0.55"/>
    <polyline points="${points(40, 60, 1.3)}" fill="none" stroke="${GOLD}" stroke-width="3" opacity="0.75"/>
    <rect x="${dropoutFrac * WIDTH - 55}" y="0" width="110" height="${HEIGHT}" fill="${INK}" opacity="0.06"/>`;
}

/** Week 3 — perceptual masking. Concentric arcs of falling loudness,
 *  fading at different rates, one quiet band swallowed by a loud one. */
function motifMasking(): string {
  let out = "";
  const bands = 9;
  for (let i = 0; i < bands; i++) {
    const r = 60 + i * 55;
    const opacity = 0.5 - i * 0.045;
    const swallowed = i === 5;
    out += `<circle cx="${WIDTH * 0.82}" cy="${HEIGHT / 2}" r="${r}" fill="none"
      stroke="${swallowed ? PAPER : i % 2 === 0 ? GOLD : BRONZE}"
      stroke-width="${swallowed ? 1 : 10 - i * 0.6}" opacity="${swallowed ? 0.9 : opacity}"/>`;
  }
  return out;
}

/** Week 4 — the poor image. A soft photographic gradient plane broken into
 *  an uneven macroblock grid, each cell blurred and re-toned a little
 *  differently, the way repeated JPEG re-encodes chew up flat gradients. */
function motifBlocks(seed: number): string {
  const rand = rng(seed);
  const cols = 14;
  const rows = 5;
  const cw = WIDTH / cols;
  const ch = HEIGHT / rows;
  let out = `<rect width="${WIDTH}" height="${HEIGHT}" fill="${BRONZE}" opacity="0.08"/>`;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const shift = (rand() - 0.5) * 10;
      const opacity = 0.05 + rand() * 0.14;
      const tone = rand() > 0.5 ? GOLD : INK;
      out += `<rect x="${c * cw + shift}" y="${r * ch}" width="${cw + 1}" height="${ch + 1}"
        fill="${tone}" opacity="${opacity.toFixed(2)}" filter="blur(3px)"/>`;
    }
  }
  return out;
}

/** Week 5 — the scriptorium. A single hand-drawn ink stroke, the way a
 *  scribe's quill loads with ink and thins as it runs dry down the line. */
function motifQuill(seed: number): string {
  const rand = rng(seed);
  let out = "";
  const lines = 5;
  for (let i = 0; i < lines; i++) {
    const y = 110 + i * 68 + (rand() - 0.5) * 10;
    const startW = 8 - i * 0.4;
    out += `<path d="M 90 ${y} C 500 ${y - 30}, 900 ${y + 40}, 1500 ${y - 10}"
      fill="none" stroke="${INK}" stroke-width="${startW.toFixed(1)}" stroke-linecap="round"
      opacity="${(0.5 - i * 0.06).toFixed(2)}"/>`;
  }
  out += `<circle cx="90" cy="110" r="14" fill="${INK}" opacity="0.5"/>`;
  return out;
}

/** A branching stemma tree: a root splitting into descendants, drawn with
 *  soft curves rather than ruled lines. `dissolve` fades the outer branches
 *  into grain for week 7's noisier, harder-to-read version of the same
 *  shape. */
function motifStemma(seed: number, dissolve: boolean): string {
  const rand = rng(seed);
  const root = { x: 140, y: HEIGHT / 2 };
  const gens = 4;
  let out = "";
  function branch(x: number, y: number, depth: number, spread: number, opacity: number): void {
    if (depth > gens) return;
    const children = depth === 0 ? 2 : rand() > 0.35 ? 2 : 1;
    for (let i = 0; i < children; i++) {
      const dx = (WIDTH - 260) / gens;
      const dy = (i - (children - 1) / 2) * spread + (rand() - 0.5) * 20;
      const nx = x + dx;
      const ny = y + dy;
      const fade = dissolve ? opacity * (0.55 + rand() * 0.2) : opacity;
      out += `<path d="M ${x} ${y} Q ${x + dx / 2} ${y}, ${nx} ${ny}"
        fill="none" stroke="${depth % 2 === 0 ? GOLD : BRONZE}" stroke-width="${(6 - depth).toFixed(1)}"
        stroke-linecap="round" opacity="${fade.toFixed(2)}"/>`;
      out += `<circle cx="${nx}" cy="${ny}" r="${(6 - depth).toFixed(1)}" fill="${INK}" opacity="${(fade * 0.6).toFixed(2)}"/>`;
      branch(nx, ny, depth + 1, spread * 0.6, opacity * (dissolve ? 0.82 : 0.9));
    }
  }
  branch(root.x, root.y, 0, 150, 0.8);
  out = `<circle cx="${root.x}" cy="${root.y}" r="9" fill="${INK}" opacity="0.7"/>` + out;
  return out;
}

/** Week 8 — copying without loss. A calm, exact repetition-code pattern:
 *  every symbol tripled in a clean row, nothing decaying, nothing losing
 *  contrast left to right. */
function motifRepetition(): string {
  const groups = 10;
  let out = "";
  for (let g = 0; g < groups; g++) {
    const gx = 100 + g * ((WIDTH - 200) / (groups - 1));
    const on = g % 3 !== 1;
    for (let i = 0; i < 3; i++) {
      const cx = gx + (i - 1) * 26;
      out += `<circle cx="${cx}" cy="${HEIGHT / 2}" r="16"
        fill="${on ? GOLD : BRONZE}" opacity="${on ? 0.75 : 0.35}"/>`;
    }
  }
  return out;
}

/** Week 9 — the curse of recursion. A dense field of dots representing a
 *  common case, with one thin trail of a rare category spiralling inward
 *  and thinning out toward the vanishing point re-estimation drives it to. */
function motifRecursion(seed: number): string {
  const rand = rng(seed);
  let out = "";
  for (let i = 0; i < 260; i++) {
    const x = rand() * WIDTH;
    const y = rand() * HEIGHT;
    out += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(2 + rand() * 2).toFixed(1)}"
      fill="${BRONZE}" opacity="${(0.08 + rand() * 0.1).toFixed(2)}"/>`;
  }
  const cx = WIDTH * 0.78;
  const cy = HEIGHT / 2;
  const turns = 3.2;
  const steps = 90;
  let path = "";
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const angle = t * turns * Math.PI * 2;
    const r = 190 * (1 - t) ** 1.6;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r * 0.6;
    path += `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)} `;
  }
  out += `<path d="${path}" fill="none" stroke="${GOLD}" stroke-width="3" opacity="0.75"/>`;
  return out;
}

/** Week 10 — enhance. A blocky, pixelated field on the left dissolving into
 *  a smooth blurred field on the right, restoration against a retained
 *  original in one continuous gradient of technique rather than a hard
 *  before/after seam. */
function motifEnhance(seed: number): string {
  const rand = rng(seed);
  const cols = 22;
  const rows = 7;
  const cw = WIDTH / cols;
  const ch = HEIGHT / rows;
  let out = "";
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const t = c / (cols - 1);
      const blockSize = Math.max(1, Math.round((1 - t) * 3));
      if (c % blockSize !== 0 && blockSize > 1) continue;
      const bw = cw * blockSize;
      const shade = 0.1 + rand() * 0.12;
      out += `<rect x="${c * cw}" y="${r * ch}" width="${bw}" height="${ch}"
        fill="${(r + c) % 2 === 0 ? GOLD : BRONZE}" opacity="${shade.toFixed(2)}"
        filter="blur(${(t * 5).toFixed(1)}px)"/>`;
    }
  }
  return out;
}

/** Week 11 — chain of custody. A literal chain of interlocking links
 *  running the width of the banner, each link the same weight as the last —
 *  nothing about the chain itself shows where a link was quietly swapped. */
function motifChain(): string {
  const links = 16;
  let out = "";
  const spacing = (WIDTH - 200) / (links - 1);
  for (let i = 0; i < links; i++) {
    const cx = 100 + i * spacing;
    const cy = HEIGHT / 2 + (i % 2 === 0 ? -12 : 12);
    const rot = i % 2 === 0 ? 20 : -20;
    out += `<g transform="rotate(${rot} ${cx} ${cy})">
      <ellipse cx="${cx}" cy="${cy}" rx="52" ry="34"
        fill="none" stroke="${i % 2 === 0 ? GOLD : BRONZE}" stroke-width="10" opacity="0.75"/>
    </g>`;
  }
  return out;
}

/** Week 12 — the original that never was. Two faint, almost-overlapping
 *  outlines that never quite converge on one shape, with an empty centre
 *  where a single original would sit if there were one. */
function motifAbsence(): string {
  const cx = WIDTH / 2;
  const cy = HEIGHT / 2;
  return `
    <ellipse cx="${cx - 70}" cy="${cy}" rx="230" ry="150" fill="none" stroke="${GOLD}" stroke-width="3" opacity="0.55" stroke-dasharray="2 10"/>
    <ellipse cx="${cx + 70}" cy="${cy}" rx="230" ry="150" fill="none" stroke="${BRONZE}" stroke-width="3" opacity="0.55" stroke-dasharray="2 10"/>
    <circle cx="${cx}" cy="${cy}" r="30" fill="${CREAM}" stroke="${INK}" stroke-width="1.5" opacity="0.5" stroke-dasharray="3 6"/>`;
}

const WEEKS: Week[] = [
  { n: "01", motif: () => motifCopies() },
  { n: "02", motif: (s) => motifWaveform(s, 0.62) },
  { n: "03", motif: () => motifMasking() },
  { n: "04", motif: (s) => motifBlocks(s) },
  { n: "05", motif: (s) => motifQuill(s) },
  { n: "06", motif: (s) => motifStemma(s, false) },
  { n: "07", motif: (s) => motifStemma(s, true) },
  { n: "08", motif: () => motifRepetition() },
  { n: "09", motif: (s) => motifRecursion(s) },
  { n: "10", motif: (s) => motifEnhance(s) },
  { n: "11", motif: () => motifChain() },
  { n: "12", motif: () => motifAbsence() },
];

function heroSvg(week: Week, seed: number): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
  ${base(seed)}
  ${week.motif(seed)}
</svg>`;
}

async function main(): Promise<void> {
  for (const week of WEEKS) {
    const seed = Number(week.n) * 97 + 13;
    const path = `src/assets/images/hero-week-${week.n}.avif`;
    await sharp(Buffer.from(heroSvg(week, seed))).avif({ quality: 60 }).toFile(path);
    console.log(`wrote ${path}`);
  }
}

main();
