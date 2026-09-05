# PRD: Orangeman - Animated Blob Character Web App

## Summary
A single-page web app that displays an animated orange blob "man" wandering around inside a tank (the browser window). The blob walks around randomly and occasionally performs random idle actions (jump, spin, wave, squash pulse, color flash, sitting on a chair), giving the impression of a small creature trapped in a tank, purely for fun/ambiance viewing.

## Goals
- Deliver a lighthearted, screensaver-like experience: open the page and watch the blob live its life with no user interaction required.
- Character should feel alive: organic, wobbly, squishy movement rather than a static shape sliding around.
- Behavior should feel unscripted/random, not on a fixed obvious loop.

## Non-Goals
- No user controls, input handling, or interactivity.
- No multiplayer, multiple creatures, sound, or persistence/save state.
- No image/sprite assets - character is rendered procedurally (SVG/CSS).
- No dedicated mobile/touch optimization (should still render, but not a design focus).

## Target Users
Anyone wanting a fun, ambient desktop/browser toy - open the tab and watch.

## User Experience
1. User opens the web app in a browser.
2. The entire browser window acts as the "tank" - fullscreen, no visible glass border/frame.
3. An orange blob character is visible somewhere in the tank and begins walking toward a random point.
4. Periodically (every few seconds), the blob either:
   - Picks a new random walking destination, or
   - Pauses to perform a brief random idle action (jump, spin, wave, squash-stretch pulse, or a brief color tint flash), then resumes walking, or
   - Walks over to a chair placed in the tank and sits on it for a while before resuming walking.
5. When the blob reaches a wall/edge of the tank, it bounces off (changes direction) with a small squish reaction, staying within bounds at all times.
6. If the user resizes the browser window, the blob stays within the new bounds (no clipping/teleporting offscreen).
7. Experience runs indefinitely with no end state; nothing for the user to click or configure.

## Functional Requirements
- **FR1 - Rendering:** Render one orange blob character using procedural SVG shapes (organic wobbly body, simple face, small arm/leg nubs) - no external image assets.
- **FR2 - Movement:** Character continuously moves toward randomly chosen points within the tank bounds at a randomized speed, with a "waddle" bob synced to movement.
- **FR3 - Idle actions:** At random intervals, character interrupts/pauses walking to perform one of several distinct idle actions (jump, spin, wave, squash pulse, color flash) for a short duration, then returns to walking.
- **FR3.1 - Chair sitting:** A chair prop is placed at a random spot in the tank. At random intervals, the character may instead walk over to the chair and sit on it (distinct seated pose) for a few seconds before resuming its random walk.
- **FR4 - Boundary containment:** Character never renders outside the visible tank area; it bounces off edges rather than passing through them, and adapts to window resizes in real time.
- **FR5 - Facing direction:** Character visually mirrors/faces the direction it is currently walking (left vs. right).
- **FR6 - Autonomous operation:** No user input is required or supported; behavior is driven entirely by internal randomized timers/state.

## Non-Functional Requirements
- Smooth animation (target ~60fps) using `requestAnimationFrame`, not choppy `setInterval`-only redraws.
- Runs in modern evergreen browsers (Chrome/Edge/Firefox) with plain React + Vite, no backend/server required beyond static hosting/dev server.
- Clean shutdown of timers/animation frames on unmount (no runaway loops/memory leaks).

## Tech Stack
- React + Vite (JavaScript, no TypeScript).
- Pure SVG + CSS for rendering/animation - no image/sprite assets, no animation libraries required.

## Success Criteria
- Blob visibly walks around the full window in random directions/destinations, never getting stuck or leaving the visible area.
- Over a ~30-60 second observation window, multiple different idle actions are observed (not just one repeating action).
- Resizing the browser window keeps the blob fully visible and contained.
- `npm run build` produces a working production build with no errors.

## Open Questions / Future Ideas (not in scope now)
- Multiple blobs interacting with each other.
- Sound effects on actions.
- Visible tank/glass frame styling instead of full-window bounds.
