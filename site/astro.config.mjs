// @ts-check
import { defineConfig } from 'astro/config';

// Single build. The former base/Pro split is gone — Pro's restraint is now the
// only look, so there is one stylesheet (sozoris.css) and one output.
//
// The live URL is https://subhanumer.github.io/sozoris/stack/ and is derived
// entirely from the two constants below. Moving to a custom domain, or dropping
// the /stack segment, means changing them together — nothing else needs to move.
// build.format 'file' preserves the existing flat ".html" URLs (service-vapt.html, etc.).
const REPO = 'sozoris';              // must match the GitHub repo name (Pages path)
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
