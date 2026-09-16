// A pack is a folder of files in public/, and a folder is not a page: a link
// to /packs/<name>/ returns 404 on GitHub Pages, which serves no directory
// listing. The build's link checker did not catch this, because it validates
// links between rendered routes and treats a static asset path as opaque.
// Every pack therefore ships its own index, and spec/pack-links.test.ts
// asserts that every /packs/ link on the site resolves to a file that exists.
import { writeFileSync } from "node:fs";

export interface PackFile {
  name: string;
  what: string;
}

export function writePackIndex(
  dir: string,
  title: string,
  intro: string,
  files: PackFile[],
): void {
  const rows = files
    .map((f) => `<li><a href="./${f.name}"><code>${f.name}</code></a> — ${f.what}</li>`)
    .join("\n      ");
  writeFileSync(
    `${dir}/index.html`,
    `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <style>
      body { font: 16px/1.6 system-ui, sans-serif; margin: 0 auto; max-width: 42rem; padding: 2rem 1rem; }
      code { background: #f1f1f1; padding: 0.1em 0.3em; border-radius: 3px; }
      li { margin-block: 0.4rem; }
    </style>
  </head>
  <body>
    <main>
      <h1>${title}</h1>
      <p>${intro}</p>
      <ul>
        ${rows}
      </ul>
    </main>
  </body>
</html>
`,
  );
}
