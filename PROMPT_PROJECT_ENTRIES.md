# Project entries — repository prompt for the portfolio site

Work in `~/portfolio-site` (deploys to [oleeveeuh.github.io](https://oleeveeuh.github.io)
on push to `main` — pushing IS deploying). The task: give every project entry
in `projects.js` the same treatment the `retailpred` entry has — real themed
figures generated from the project's own frozen artifacts, a blog-flow story
that opens on the question being investigated, grouped skill tags, a
representative preview image on the gallery card, honest categorization, and
links. The `retailpred` entry is the **reference template**: when this prompt
says "like retailpred", open `projects.js`, find `id: "retailpred"`, and copy
its structure exactly. Do not invent a different shape.

Read `app.js`, `projects.js`, `index.html`, and the tail of `styles.css`
before writing anything.

## File inventory (who does what)

- `projects.js` — **data only**. `window.portfolioProjects` array; every
  entry is a plain object. No markup, no logic.
- `app.js` — renderers. `renderGallery()` draws the cards;
  `openProject()` draws the dialog; `techMark()` maps skill names to glyph
  marks (unknown names fall back to `⌘` — extend the map when adding a skill
  that deserves one, never leave a broken mapping); the story renderer
  inside `openProject` walks `project.story` blocks; `artSVG(type)` draws
  placeholder visuals (`agent` | `trend` | `distribution` | `bars`) for
  entries without real figures.
- `index.html` — the filter row: one `.filter-button` per category with
  `data-filter`, plus `all`. Counts are computed by `renderGallery()`; never
  hardcode a count.
- `styles.css` — one design system: field-notes paper (`--paper:#f5f1e8`),
  ink (`#25251f`), sage (`#89927a`), crimson accent (`#a43b36`), mono labels
  (`--mono: "IBM Plex Mono"`), lowercase everything (body has
  `text-transform: lowercase`). Append new rules at the end of the file;
  keep the existing minified lines untouched.
- `assets/` — real figure PNGs, named `<projectid>-<slug>.png`.

## Entry schema (every field, in order)

```js
{
  id: "kebab-id",                       // stable; used by data-project attr
  title: "...",                         // sentence-case display title
  subtitle: "...",                      // one line, the hook
  roles: ["data","ml"],                 // MUST be from {ai, data, ml}; powers filtering
  roleLabels: ["DATA SCIENCE", ...],    // uppercase display labels, in group order
  links: [                              // optional but recommended; rendered at
    { label: "github repository", href: "... " },   //   the TOP of the dialog,
    { label: "live showcase", href: "..." },        //   after the summary copy,
  ],                                                  //   before skill groups
  previewImage: "assets/<id>-<slug>.png",  // optional; real figure for the card
  previewAlt: "...",                       // REQUIRED with previewImage
  technologyGroups: [                   // preferred over flat technologies
    { label: "DATA SCIENCE", skills: [...] },
    { label: "MACHINE LEARNING", skills: [...] },
    { label: "MLOPS", skills: [...] },
  ],
  technologies: [...],                  // keep as flat fallback ONLY if no groups
  year: "FIELD NOTE · 2026",            // card + dialog eyebrow
  summary: "...",                       // 1–3 lines: what it is + the twist
  story: [ /* blocks, see below */ ],   // the blog-flow dialog body
  narration: "...",                     // legacy fallback; omit for story entries
  visuals: [...],                       // legacy fallback; omit for story entries
  result: "...",                        // "Takeaway" section — the lesson, not a victory lap
}
```

Renderer behavior to rely on: `technologyGroups` wins over `technologies`;
when groups exist the `dialog-roles` line is suppressed (the group labels
carry the categories); when `previewImage` exists the card shows the real
figure and the `art-label` overlay is suppressed (it would collide with the
figure's own title); `links` render as mono anchor rows with crimson
underlines at the top of the dialog. All interpolations go through `esc()` —
never concatenate raw strings into the markup templates.

## Story block grammar (`project.story` = ordered blocks)

- `{ k: "chapter 01 · 2026-11-04", t: "the gate that said no" }` — kicker
  (mono, crimson, lowercase) + chapter title (larger serif-adjacent
  heading). Chapter numbering is `chapter NN · <date or phase>`.
- `{ p: "..." }` — paragraph. One idea per paragraph; 3–7 sentences.
- `{ img: "assets/<id>-<slug>.png", caption: "...", alt: "..." }` — real
  figure, captioned; `alt` describes the chart's content, not its style.
- `{ embed: "workbook/sheet", caption: "...", alt: "..." }` — live Tableau
  Public embed (iframe to `public.tableau.com/views/<embed>`); only for
  workbooks actually published.

**Structure rule (the retailpred shape):** the story opens with a prologue
before chapter 01 — kicker `the question · where this started`, title
`what was I investigating?` (or the project's equivalent question), then one
paragraph that (1) states the question plainly, (2) states the surprising
result or obstacle that made the question hard, and (3) lists the forks the
question led to, in the order the chapters follow, closing on "every chapter
after this one is the same question asked one layer deeper." Then chapters.
Then a final short chapter or `result` that states the open path, not a
victory lap.

**Voice rules:** first person, field-notes register, lowercase (CSS
lowercases anyway — write naturally, the site renders lowercase). Negative
results are headline material, never buried. Every number must be copied
from a frozen artifact in the project's own repo (results JSON, committed
document) — name the artifact in the chapter or evidence links if a number
could be contested. Approaches that were measured and rejected get listed
with their measured outcome and marked "(evaluated)" in skill tags.

## Figure generation pipeline

1. Figures are generated by matplotlib **in the project's own repository**
   from that repo's frozen results — never drawn by hand, never fabricated,
   never a stock image. If a project has no real measured data, it gets NO
   figures: keep its `visuals` placeholder SVGs and skip `previewImage`.
2. Apply the fieldnotes theme so cards and dialogs read as one system —
   surface `#fbf9f4` / paper `#f5f1e8`, ink `#25251f`, sage `#89927a`,
   crimson accent (`#a43b36`), mono labels (`--mono: "IBM Plex Mono"`),
   lowercase everything (body has `text-transform: lowercase`). See
   `~/retailPRED-satellite/scripts/research_figures.py` (`--theme
   fieldnotes`) for the reference implementation (rcParams block +
   palette dict).

   **Accent colors for figures (use when more than 2 colors are needed).**
   Two-color figures use the theme pair: sage `#89927a` + muted red
   `#a43b36`. Four-series figures (e.g. all four MRTS models) use, in
   grouped-bar order naive | policy | theta | LightGBM:

   | identity | hex | note |
   |---|---|---|
   | naive (neutral baseline) | `#1E342E` | sumi green |
   | policy | `#89927a` | sage (site accent) |
   | theta | `#482728` | muted wine |
   | LightGBM | `#d4708c` | sakura rose |

   The bar order is part of the design: the two deep tones are separated
   by sage and rose, which keeps every adjacent pair distinguishable
   (validated CVD 31.9 / normal 33.7 on cream). Never place the rose next
   to the wine or the crimson, and never introduce a fifth identity hue —
   fold extras into labels instead. Chrome tokens (not identity): grid
   `#d8d1c4`, muted `#77776c`, ink2 `#52514e`, diluted crimson `#b86a62`
   for dashed half-way references.
3. Export at 2× (`--scale 2`, ~2200 px wide for results charts), save to
   `assets/<projectid>-<slug>.png`, and verify the file is committed —
   figures are static assets, deployed with the site.
4. Captions in the dialog carry the numbers and the reading
   ("lower is better", "positive = policy better"), plus sample sizes when relevant.

## Preview figures — method, not results

The gallery card is the project's hook: it must show **how the project
works**, not how it scored. Results charts (WAPE bars, sweeps,
reliability diagrams) belong in the dialog story; the card gets a
**method schematic** — the retailpred reference is
`~/retailPRED-satellite/scripts/method_schematic.py` →
`assets/retailpred-method-schematic.png` (the expanding training
staircase + forecast fans + holdout rows, with a classifier-flow band).

Style rules — model the drawing on the site's own placeholder SVG
vocabulary (`artSVG`: flat filled boxes, dashed connectors, plain
arrows), NOT on data-chart chrome:

- **No axes, no grid, no tick chrome.** Flat shapes on the card's light
  green background `#e4e4d7` (the `.project-art` color) — the figure's
  facecolor IS the background, so the preview fills the card
  edge-to-edge with no white letterbox.
- **Fonts**: ALL figure text in Source Sans 3 — the site's sans voice,
  the same face as the placeholder-diagram text and body copy. The
  variable TTF is vendored at
  `~/retailPRED-satellite/scripts/fonts/SourceSans3[wght].ttf` (+ OFL)
  and registered with `font_manager.fontManager.addfont(...)`; neither
  Source Sans 3 nor IBM Plex Mono is system-installed, and mono was
  rejected for figures (owner, 2026-11-06) — it doesn't match the
  placeholder text style.
- **Canvas**: render at exactly 2× the card art box ≈ 642×320 px
  (aspect 2.0). Type at 10–16pt then stays legible when the card shows it
  at ~330 px. Save with `bbox_inches="tight", pad_inches=0.12` so nothing
  clips; the card's `object-fit: cover` then crops only padding.
- **Bar/flow order is part of the design** — keep companion hues apart
  (never rose beside wine or crimson) and put the deepest tones at the
  ends.
- Everything is direct-labeled; the schematic may use real names, dates,
  and protocol values from the frozen artifacts, but draws no metrics.

Selection rules, in order: (1) it communicates the method in one glance;
(2) it is legible at 330×160 (10pt+ type on a 642px canvas survives;
dense data-charts do not); (3) it fills edge-to-edge on the light green
(the preview style is `.project-preview{width:100%;height:100%;
object-fit:cover;display:block}` — no background, no letterbox). After
wiring it in, screenshot the card locally (see verification) and check
that the figure's own title does not collide with any overlay.

## Skill tags and groups

- Exactly three groups, in this order: `DATA SCIENCE`, `MACHINE LEARNING`,
  `MLOPS`. A skill appears in exactly one group — decide by where the work
  happened, not by resume appeal.
- Truthfulness rules: list only technologies that exist in the project's
  repo or committed results; mark measured-but-rejected approaches with
  "(evaluated)"; frameworks from a legacy era are allowed only with a
  marker (e.g. "Airflow" only if its DAGs/config still ship in the repo).
- Extend `techMark()` when a new skill deserves a distinct 2–3 character
  glyph (`numpy→"np"`, `scipy→"Σ"`, `statsmodels→"sm"`, `lightgbm→"lgb"`,
  `mlflow→"mlf"`, `databricks→"dbx"`, `delta→"Δ"` are taken; unknown → `⌘`).
- Keep the flat `technologies` array only on entries without groups (the
  placeholder entries) so the renderer fallback stays exercised.

## Categorization and filtering (the main screen)

- `roles` is the filter key: values `ai`, `data`, `ml` only. The buttons in
  `index.html` (`data-filter`) map 1:1; `renderGallery()` computes counts
  (`N projects shown`) and applies a single active filter (`all` shows
  everything). A project with `roles: ["data","ml"]` appears under both
  filters and in `all`.
- `roleLabels` is the display order of a project's categories, uppercase,
  matching the group order of its `technologyGroups` where applicable.
- To add a new category (rare — the three cover the portfolio): add the
  button in `index.html`, extend the `roleName` map in `app.js`, and use the
  new key in `roles`. Never add a category with zero projects.
- Card meta shows `roleLabels[0]` — make sure the first role is the primary
  discipline, because that is what the card displays.

## Adding a new project (the checklist, in order)

1. Collect the real artifacts first: frozen results/docs in the project's
   repo; decide the question-first prologue and the chapter list BEFORE
   generating figures (figures serve chapters, not the reverse).
2. Generate themed figures in the project's repo (rule: generation lives
   where the data lives), export 2× PNGs, copy into `assets/`.
3. Build the method schematic first (pipeline §"Preview figures"), then
   write the entry in `projects.js` following the schema and story rules;
   set `previewImage` to the schematic; add `links` (repository first).
4. Extend `techMark()` for any new glyph-worthy skill.
5. `node --check app.js && node --check projects.js`.
6. Serve locally (`python3 -m http.server 8123`), then drive it with
   playwright (`/tmp/pwtest/node_modules/playwright`, browsers cached):
   screenshot the card, click the card, screenshot the dialog top and
   bottom; fix collisions and wrapping before shipping.
7. Commit (attribution line), push, then verify the live CDN with
   cache-busters (`?v=$(date +%s)`) — GitHub Pages lags a few seconds; wait
   for the content grep to turn positive rather than trusting the push.

## Pitfalls (learned the hard way — do not rediscover them)

- The `art-label` overlay collides with a preview figure's own title — the
  renderer suppresses it on image cards; keep that conditional.
- GitHub Pages CDN serves stale files after push for 10–60s; cache-bust and
  poll, don't assume failure.
- `grep -c` returning 0 exits nonzero and breaks `&&` chains — use `;` or
  an `until` loop when checking live content.
- `object-fit: cover` crops whatever falls outside the box — so previews
  must be rendered at the exact art-box aspect (≈642×320 at 2×) AND saved
  with `bbox_inches="tight", pad_inches=0.12`. A fixed-canvas save at a
  mismatched aspect, or `contain` with a mismatched background, shows
  white boxes/clipped titles — both were real bugs (2026-11-06).
- The dialog is a `<dialog>` with its own scroll — screenshot the element,
  not the page, and set `dialog.scrollTop` for deep sections; wait ~2.5s
  after scrolling for lazy Tableau embeds.
- All story text passes through `esc()`; the Tableau embed URL is the one
  place a raw path is interpolated — keep it restricted to the
  `workbook/sheet` shape.
- Do not remove the flat `technologies` fallback or the placeholder
  `visuals` path — the unwritten entries depend on them.

## Boundaries

- Nothing fabricated: no invented numbers, no stock images, no skills that
  are not in the repos, no "planned" work presented as done.
- The site is plain static JS — no build step, no framework, no new
  dependencies; renderers stay template-literal based.
- Pushing deploys. The owner decides when to push.
- Every commit ends with the Claude Code attribution line.
