# Sozoris

Marketing site for **Sozoris**, a security firm (formerly **SubZeroSec**).
σῴζω — to make whole. **"Break it. Prove it. Make it whole."**

Live: https://subhanumer.github.io/sozoris/stack/

Single Astro build. The old base/Pro split is gone — the quieter "Pro" treatment is now
the only look. Three brand palettes ship at once behind a corner switcher (a review tool;
`olive` is the default) so a direction can be chosen on the real site. See `DESIGN.md`
for the palette system and `PRODUCT.md` for the positioning.

## Stack

Static site built with [Astro](https://astro.build). Source lives in `site/`,
the build outputs to `stack/`, and GitHub Actions deploys on every push to `main`.

```bash
cd site
npm install
npm run dev      # local preview
npm run build    # outputs to ../stack
```

- `site/src/components/Mark.astro` — the Sozoris mark (sealed open ring)
- `site/src/components/Icon.astro` — single registry for the hand-drawn line icons
- `site/src/components/PaletteSwitch.astro` — the three-palette review switcher (removable)
- `site/src/components/` — Header (mega-menu), Footer, MobileNav, Base layout
- `site/src/data/site.ts` — nav, services, footer and the verified `DISCLOSURES` ledger
- `site/src/pages/` — one file per page
- `site/public/assets/` — shared `sozoris.css`, `sozoris.js`, `mark.svg`, logos

## Shipping a single palette

The switcher and its two non-chosen palettes are for review. To lock one in, follow the
removal checklist in `PaletteSwitch.astro` (drop the component, the inline restore script
in `Base.astro`, the switcher block in `sozoris.js`, and the unused
`:root[data-palette="…"]` blocks in `sozoris.css`).
