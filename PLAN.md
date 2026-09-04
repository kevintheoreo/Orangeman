# Development Plan: Orangeman

Execute phases in order. Each phase should build and visually run before moving to the next.

## Phase 0 - Project Scaffold
- Scaffold a Vite + React project (JavaScript template) in the workspace root.
- Install dependencies, confirm `npm run dev` serves the default Vite starter page.
- Remove default Vite boilerplate content (logo, counter button, demo text) from `App.jsx`, `App.css`, `index.css`, leaving a blank/minimal shell.
- **Verify:** `npm run dev` shows a blank page with no console errors.

## Phase 1 - Tank Container
- Create `src/components/Tank.jsx`: a fullscreen div (`100vw`/`100vh`, `overflow: hidden`), styled with a simple background (subtle gradient or flat color to suggest a tank/aquarium ambiance).
- Track the tank's current pixel size (window resize listener or `ResizeObserver`), expose bounds (width/height) for later use.
- Wire `src/App.jsx` to render only `<Tank />`.
- **Verify:** Fullscreen colored area fills the browser window and resizes with it; no scrollbars.

## Phase 2 - Static Blob Character
- Create `src/utils/blobPath.js`: function generating an organic SVG path string (closed bezier loop with sine-perturbed radii) instead of a plain circle, parameterized by wobble/squash inputs.
- Create `src/components/BlobCharacter.jsx`: renders an SVG using `blobPath.js` for the body (orange fill), plus a simple face (two eyes, a mouth) and small arm/leg nub shapes. Accept props for position (x/y) and render statically centered in the tank for now.
- Render one `<BlobCharacter />` inside `Tank` at a fixed position.
- **Verify:** A single wobbly orange blob with a face is visible in the tank; shape looks organic, not a plain circle.

## Phase 3 - Movement State Machine
- Create `src/hooks/useBlobBehavior.js`: a `requestAnimationFrame`-driven hook that owns position (x/y), a random walk target, speed, and facing direction.
- Logic: continuously move current position toward the random target; on arrival, pick a new random target point within the tank bounds.
- Connect the hook's output position to `BlobCharacter` via `Tank`, replacing the fixed position from Phase 2.
- Mirror the blob horizontally based on current walking direction (facing left/right).
- **Verify:** Blob continuously walks to random points around the tank; movement is smooth (no jumps/teleports); facing flips correctly with direction.

## Phase 4 - Boundary Bounce
- Add wall-collision handling in `useBlobBehavior`: when the blob's position/target would exceed tank bounds, reflect the direction/target and clamp position so it never renders outside the visible area.
- Add a small squish reaction (brief squash-stretch) triggered on wall contact.
- Confirm behavior adapts correctly when the tank is resized mid-run (target/position re-clamped to new bounds).
- **Verify:** Blob bounces off all four edges without ever clipping offscreen; resizing the window during a run keeps it contained.

## Phase 5 - Walk Cycle Animation
- Add a sine-wave-based "waddle" bob (squash/stretch tied to elapsed time * speed) so the blob visibly wobbles while walking, feeding into `blobPath.js` params and limb nub positions.
- Animate arm/leg nubs swinging in sync with the walk cycle.
- **Verify:** Blob's body and limbs visibly squish/swing rhythmically while walking, not just sliding as a rigid shape.

## Phase 6 - Random Idle Actions
- Extend `useBlobBehavior` state machine with additional states: `jumping`, `spinning`, `waving`, `squashing`, `colorFlash`.
- Add a random timer (~2-6s intervals) that, when it fires, either picks a new walk target or triggers one random idle action (weighted so walking remains dominant); each idle action pauses/modifies movement briefly (~0.4-1s) then returns to `walking`.
- Reflect current action's visual differences in `BlobCharacter` (e.g., jump = vertical offset, spin = rotation, wave = one arm nub raised/waving, squash = exaggerated squash pulse, colorFlash = brief fill color shift).
- **Verify:** Over a ~30-60s observation, multiple distinct idle actions are observed interrupting normal walking, each visually distinguishable, then walking resumes.

## Phase 7 - Polish & Cleanup
- Review randomness ranges (speed, action durations, interval timing) for a natural, non-repetitive feel; adjust as needed.
- Ensure all timers/`requestAnimationFrame` loops are properly cleared on unmount (no leaks).
- Final visual pass: colors, face expressions per action, background ambiance.
- **Verify:** `npm run build` completes with no errors/warnings; production preview (`npm run preview`) behaves identically to dev mode.

## Definition of Done
- All phases above verified.
- Blob walks indefinitely, bounces within any window size, and performs varied random idle actions without user input, matching PRD.md success criteria.
