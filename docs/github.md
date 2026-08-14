repo: COVISART/covisart.github.io
branch: master
path: src/covisart

## Last sync
date: 2026-08-15T00:00:00Z

### Updated in this project
- Rebuilt the NGS-360-3 product site as a single bilingual (EN/TR) design: overview + specifications views.
- Content grounded in the repo's `src/covisart` product route and the NGS-360-3 specification sheet.
- Added an interactive motion-envelope demo: the user-supplied Draco-compressed GLB is rendered live (three.js) and its Pitch / Yaw / Roll gimbal nodes are driven by the axis sliders.
- Product renders and the Ankara facility photo supplied by the user, not taken from the repo.

## Screen map
| Screen | Repo files |
| --- | --- |
| NGS-360-3 — Overview | src/covisart/NGS.js, src/covisart/Product.js, src/covisart/Selections/*.js |
| NGS-360-3 — Specifications | src/covisart/Product.js (spec table), NGS-360-3 spec sheet (user upload) |
| Header / routes | src/App.js |
