// A pack is a folder of files in public/, and a folder is not a page: a link
// to /packs/<name>/ returns 404 on GitHub Pages, which serves no directory
// listing. The build's link checker did not catch this, because it validates
// links between rendered routes and treats a static asset path as opaque.
// Every pack therefore ships its own index, and spec/pack-links.test.ts
// asserts that every /packs/ link on the site resolves to a file that exists.
//
// The pack.zip built here is zipped from exactly the `files` array passed
// in — the same list this page renders — not from the whole folder. A pack's
// reveal/ answer (or, for week 1, worked-answer.md) is only ever in that
// folder because it's a sibling of the evidence, not because it belongs in
// what a student downloads; keeping the zip scoped to `files` means it can
// never smuggle in something the index itself doesn't already show, and
// spec/pack-zip.test.ts checks that stays true.
import { execFileSync } from "node:child_process";
import { existsSync, rmSync, statSync, writeFileSync } from "node:fs";

export interface PackFile {
  name: string;
  what: string;
}

function extBadge(name: string): string {
  const ext = name.split(".").pop() ?? "";
  return ext.toUpperCase();
}

function fmtBytes(bytes: number): string {
  return bytes < 1024 ? `${bytes} B` : `${(bytes / 1024).toFixed(1)} KB`;
}

/** Zips exactly `files` (not the whole folder) into `${dir}/pack.zip`,
 *  replacing any zip left over from a previous build. */
function writePackZip(dir: string, files: PackFile[]): number {
  const zipPath = `${dir}/pack.zip`;
  if (existsSync(zipPath)) rmSync(zipPath);
  execFileSync("zip", ["-q", "-X", "pack.zip", ...files.map((f) => f.name)], { cwd: dir });
  return statSync(zipPath).size;
}

export function writePackIndex(
  dir: string,
  title: string,
  intro: string,
  files: PackFile[],
): void {
  const zipBytes = writePackZip(dir, files);

  const rows = files
    .map(
      (f) =>
        `<li><a href="./${f.name}"><code>${f.name}</code></a><span class="badge">${extBadge(f.name)}</span><span class="what">${f.what}</span></li>`,
    )
    .join("\n        ");

  writeFileSync(
    `${dir}/index.html`,
    `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <style>
      /* Palette hand-mirrored from astro-theme-slop/slop.css — this file has
         no build-time access to the theme package, since packs/ ships plain
         static HTML with no Astro pipeline behind it. */
      :root {
        --gold: #b97d1c;
        --bronze: #8a5c13;
        --grey: #6b6154;
        --paper: #fffdf9;
        --line: #e7ddcd;
      }
      body {
        font: 16px/1.6 system-ui, sans-serif;
        margin: 0 auto;
        max-width: 42rem;
        padding: 2rem 1rem 3rem;
        color: #2a2620;
        background: var(--paper);
      }
      h1 {
        margin-bottom: 0.3rem;
        color: var(--bronze);
        border-bottom: 3px solid var(--gold);
        padding-bottom: 0.6rem;
      }
      .intro { color: var(--grey); }
      .download {
        display: block;
        margin: 1.5rem 0;
        padding: 0.9rem 1.2rem;
        background: var(--gold);
        color: #fff;
        text-decoration: none;
        font-weight: 600;
        border-radius: 6px;
        text-align: center;
      }
      .download:hover { background: var(--bronze); }
      .download small { display: block; font-weight: 400; opacity: 0.9; }
      ul { list-style: none; padding: 0; margin: 0; }
      li {
        display: flex;
        flex-wrap: wrap;
        align-items: baseline;
        gap: 0.5rem;
        padding: 0.6rem 0;
        border-bottom: 1px solid var(--line);
      }
      code { background: #f1ece1; padding: 0.1em 0.4em; border-radius: 3px; }
      .badge {
        font-size: 0.7rem;
        font-weight: 600;
        letter-spacing: 0.03em;
        color: var(--grey);
        background: #f1ece1;
        border-radius: 3px;
        padding: 0.1em 0.4em;
      }
      .what { color: #4a4436; flex: 1 1 12rem; }
    </style>
  </head>
  <body>
    <main>
      <h1>${title}</h1>
      <p class="intro">${intro}</p>
      <a class="download" href="./pack.zip">
        Download the whole pack
        <small>${files.length} files, ${fmtBytes(zipBytes)}, one .zip</small>
      </a>
      <ul>
        ${rows}
      </ul>
    </main>
  </body>
</html>
`,
  );
}
