// @ts-check
import { defineConfig } from 'astro/config';

// Single build. The former base/Pro split is gone — Pro's restraint is now the
// only look, so there is one stylesheet (sozoris.css) and one output.
//
// The live URL is still https://subhanumer.github.io/subzerosec-mockups/stack/
// because the GitHub repo is still named `subzerosec-mockups`. Renaming the repo
// to `sozoris` (or serving from a custom domain) is the one remaining rebrand
// step, and it lives entirely in the two constants below — change them together
// and nothing else needs to move.
// build.format 'file' preserves the existing flat ".html" URLs (service-vapt.html, etc.).
const REPO = 'subzerosec-mockups';   // ← rename the GitHub repo, then update this
const OUT = 'stack';                 // published subdirectory; keeps existing deep links alive

export default defineConfig({
  site: 'https://subhanumer.github.io',
  base: `/${REPO}/${OUT}`,
  outDir: `../${OUT}`,
  trailingSlash: 'ignore',
  build: {
    format: 'file',
    assets: '_astro',
  },
});
