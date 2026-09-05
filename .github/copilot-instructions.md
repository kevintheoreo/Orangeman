# Project Guidelines

Orangeman is a Vite + React (JavaScript) app rendering an animated blob character in a fullscreen "tank" (see [PRD.md](../PRD.md) for product spec, [PLAN.md](../PLAN.md) for the phased build plan).

## Architecture
- `src/components/Tank.jsx` — fullscreen container, owns tank bounds.
- `src/components/BlobCharacter.jsx` — SVG blob rendering (body path, face, limb nubs).
- `src/hooks/useBlobBehavior.js` — `requestAnimationFrame`-driven state machine for movement/idle actions.
- `src/utils/blobPath.js`, `src/utils/blobMetrics.js` — path generation and shared math helpers.

## Build and Test
- `npm run dev` — dev server.
- `npm run build` — production build (must complete with no errors/warnings).
- `npm run preview` — preview production build.

## Conventions
- **Update [PRD.md](../PRD.md) whenever a new feature or capability is added to the app**, reflecting what was implemented. Do **not** update PRD.md for bug fixes that don't add new functionality.
