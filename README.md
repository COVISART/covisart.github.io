# COVISART NGS-360-3

Product site for the COVISART NGS-360-3 three-axis motion system: bilingual
(EN/TR), light and dark, with a live WebGL model of the motion base whose
gimbals follow the motion-envelope sliders.

React + TypeScript + Vite. Converted from the Claude Design prototype
`NGS-360-3.dc.html` (design project *Company product site redesign*).

## Getting started

```bash
npm install
```

```bash
npm run dev
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Vite dev server on http://localhost:5173 |
| `npm run build` | Type-check, then build to `dist/` |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run typecheck` | Type-check only |

`predev`/`prebuild` run `scripts/copy-draco.mjs`, which copies the Draco decoder
out of the installed three.js into `public/draco/` — the GLB is Draco-compressed
and cannot be decoded without it. That folder is generated, so it is gitignored.

## Layout

```
src/
  data/          copy.ts (EN/TR strings), product.ts (specs, variants, options), assets.ts
  site/          SiteContext (language, theme, finish, view) and hooks
  components/    Header, Footer, Blueprint frame, AssetImage
  sections/      Hero, KeyFigures, MotionEnvelope, Advantages, Applications,
                 Software, Family, About, DemoRequest, Specifications
  viewer/        NgsViewer (three.js), NgsModel (React wrapper), LazyNgsModel
  styles/        industry.css (light), nocturne.css (dark), app.css (page + layout)
public/assets/   product renders and NGS-360-3-B.glb
```

### Design systems

The prototype loaded two design-system stylesheets and switched themes by
flipping the dark one's media query. Here `industry.css` (light) is the base
layer and every Nocturne rule is scoped under `[data-theme="dark"]`, which puts
it above Industry on specificity — the same cascade result, set by
`document.documentElement.dataset.theme`. Both files keep their original rule
bodies, so re-syncing from the design project stays a mechanical edit.

Theme and language persist in `localStorage`; both fall back to the visitor's
system preference (`prefers-color-scheme`, `navigator.language`).

### The 3D viewer

`src/viewer/NgsViewer.ts` is a port of the prototype's `<ngs-model>` custom
element. The GLB carries nested gimbal nodes (Pitch > Yaw > Roll) and each pose
value spins its node about its own local axis, so the rings behave like the
hardware. One fetch and one Draco decode is shared by every viewer on the page;
each viewer clones the scene so it can pose independently, while materials stay
shared so a finish change repaints both viewers at once.

three.js is loaded as its own chunk (`LazyNgsModel`) so it stays off the initial
page load. If WebGL or the GLB is unavailable, the frame falls back to a caption
instead of collapsing.

## Deployment

`npm run build` emits a static `dist/`. `.github/workflows/deploy.yml` builds and
publishes it to GitHub Pages on every push to `master`. Pages must be set to
**Source: GitHub Actions** in the repository settings.

## Known follow-ups

- The product renders in `public/assets` are the original KeyShot exports —
  ~38 MB in total, with single PNGs over 10 MB. Downscaling to ~1600 px and
  serving WebP/AVIF would cut that by well over an order of magnitude.
- The demo request form validates and confirms locally; it has no backend yet.
  `DemoRequest.tsx` marks the spot where the sales endpoint goes.
