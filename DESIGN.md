# DESIGN.md — Sozoris

## Visual theme
Dark, technical "sliding shaped sheets" system: warm ink backdrops with **paper**
sheets (bone, per palette) that slide over them on scroll, with
geometric clip-path leading edges. Locked dark theme throughout (no section inverts).
A subtle fixed grain overlay and a single slow light-sweep across the hero grid break
the flat fields. Restraint is the register: hairline surfaces, one accent, no neon.

The look is descended from the old "Pro" enterprise variant — that quieter treatment
is now the only treatment. The one loud thing kept from the original base is the light
sweep passing over the hero grid (`.hero-bg .scan`), retuned to the palette accent.

## Color — three palettes, one token system
Nothing in `sozoris.css` hardcodes a brand hex below the palette blocks. Every colour
resolves from custom properties, so swapping `data-palette` on `<html>` reskins the
whole site. Three directions ship at once behind a corner switcher (a **review tool** —
see removal notes in the CSS and `PaletteSwitch.astro`); `olive` is the default.

| Palette | Ground | Paper | Accent | Metal | Reads as |
|---|---|---|---|---|---|
| **Olive & Pewter** (default) | `#0E120C` olive-ink | `#F1F2EA` bone | `#313B31` fill / `#7C9E7D` on-dark | `#A8B2A6` pewter | Fatigue-green, field-worn, quiet. `#313B31` is a deliberately stealthy near-black button fill; a sage tint carries on-dark text accents. |
| **Slate & Steel** | `#0C1116` blue-charcoal | `#EFF2F4` cool bone | `#4B6980` fill / `#8FB2C9` on-dark | `#A6B2BB` steel | Corporate-legible without the generic security navy — desaturated, grey-leaning. |
| **Storm & Ash** | `#111518` ash | `#F0F1F0` bone | `#5A7080` fill / `#9CB4C2` on-dark | `#B0B8BC` ash | Softest of the set — overcast and calm rather than corporate. |

Each palette defines `--ink*`, `--paper*`, `--accent-d/-l`, `--fill*`, `--metal-d/-l`,
`--fg*`, `--muted*`, `--faint*` and a `--shadow-rgb`. The `.dark`/`.light` scene classes
map those into the `--p-*` component tokens every component reads. **Metal** (pewter / steel / ash) is a deliberate second accent — it carries numerals, stat
suffixes, rules and card indices, so figures read as struck-metal precision rather than
another link. Shadows are ground-tinted via `--shadow-rgb`, never pure black.

Why the old navy is gone: it was a pun on "SubZero" (cold → ice-blue), and the single
most generic security-vendor look there is. The two blue-slates that survive here are
deliberately desaturated and grey-leaning so they read as steel, not as that navy.

**No brown.** Every warm metal was removed — the surviving palettes use cool pewter,
steel and ash only.

## The rotating etymology line
`Cycle.astro` + the `[data-cycle]` handler walk the name back to its root and forward
again — **σῴζω → sōzō → to save · to preserve · to make whole → Sozoris** — landing on
the brand and holding it a beat longer (3.4s vs 2.2s) so the loop reads as arriving
somewhere. Steps cross-fade with a short rise + blur; the leading dot pulses on each
change. The final step brightens to `--p-fg` so the payoff registers. The line opts out
of the eyebrow's `text-transform:uppercase` — uppercasing mangles σῴζω into ΣΩΙΖΩ and
drops the diacritic. Screen readers get the whole phrase as one static sentence, and
`prefers-reduced-motion` renders that same static phrase with no animation.

## Typography
- **Display (h1–h4):** Sora (700/800), tight tracking `-.025em`.
- **Body:** Inter (400–700). Deliberate — Sora + JetBrains Mono carry the personality.
- **Numerics & labels:** JetBrains Mono — stat figures, metrics, breadcrumbs, eyebrows,
  the Greek etymology line, card indices (uppercase, wide tracking).

## The mark
`Mark.astro` — a ring left open at the top-left, sealed by a bar in the accent colour.
The ring is your perimeter, the gap is what we found, the accent bar is that finding
proven closed. σῴζω — to make whole. Deliberately **not** a padlock and **not** a shield
(both are PRODUCT.md anti-references). Drawn in `currentColor` with the seal on the
palette accent, so it reskins with `data-palette`. `mark.svg` is the standalone favicon
(colours baked to the default palette, since a favicon can't read page CSS).

## Iconography
Single hand-drawn line-icon registry (`Icon.astro`), 24×24, `currentColor`, round caps.
Service metaphors: VAPT = targeting reticle, Red Team = capture-the-flag, Threat
Hunting = radar, OSINT = eye, Attack Surface = viewfinder + asset nodes.

## Components
- **Resizable nav island** (`.navshell`): full-bleed at rest, contracts smoothly to a
  980–1040px pill on scroll, with a Services mega-menu and a sliding highlight pill.
- **Scroll-driven services showcase** (`.hsv`) — paper sheets slide left while a pinned
  panel cross-fades; progress dots show position.
- **Process constellation** (`.punv`) — star-map of ordered steps that expand on hover;
  the connecting beam gradient is tokenised (`var(--fill-deep/--fill/--accent-d)`).
- **Disclosure ledger** (`.ledger`) — the honesty centrepiece: named vendor, named
  finding, verifiable status. Replaces the old invented testimonial block.
- **Circular-reveal CTA** (`.ctajaws`) — the closing paper section blooms from a circle
  at the screen's bottom-centre and grows to fill the viewport (desktop; static + a11y
  fallback otherwise). JS-driven via the `--jaws` flag.
- Cards: case studies, insights, frameworks, team, jobs — hairline borders + a cursor
  spotlight; the rotating neon beam-border from the original base is **removed**.

## Layout & motion
- Container max-width 1200px; `100dvh` full-screen sections (no iOS jump).
- CSS Grid over flex-math; asymmetric hero (copy + form/asset split).
- Motion: restrained, `transform`/`opacity`, honours `prefers-reduced-motion`. Spring-ish
  easing `cubic-bezier(.22,1,.36,1)`. The hero sweep is slow (9s) and accent-tinted.

## Accepted deviations (impeccable ignores, with reasons)
- `numbered-section-markers` — the 01–05 showcase numerals and process-step numbers are
  **functional ordering**, not decorative scaffold.
- `overused-font=Inter` — body text only; display/numerics use Sora / JetBrains Mono.
- `layout-transition` — the navbar island morph (max-width/padding) is an intentional
  one-shot transition that performs fine.
- `side-tab` — the `.prose blockquote` left rule is a typographic convention.
