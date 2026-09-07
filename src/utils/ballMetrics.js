const SIDE_FACTOR = 0.5 // clearance either side for the ball's round body
const TOP_FACTOR = 0.9 // clearance above anchor to allow room for a bounce hop
const BOTTOM_FACTOR = 0.5 // clearance below anchor for the ball's round body

// Returns how far each edge of the tennis ball's visual silhouette extends
// from its anchor point (x, y), so placement code can keep the whole shape
// (plus its bounce hop) on-screen.
export function getBallMargins(size) {
  return {
    left: size * SIDE_FACTOR,
    right: size * SIDE_FACTOR,
    top: size * TOP_FACTOR,
    bottom: size * BOTTOM_FACTOR,
  }
}
