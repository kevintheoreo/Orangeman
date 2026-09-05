const SIDE_FACTOR = 0.65 // clearance either side for the front (wider) legs
const TOP_FACTOR = 0.9 // clearance above anchor for the backrest
const BOTTOM_FACTOR = 0.75 // clearance below anchor for the front legs

// Returns how far each edge of the chair's visual silhouette extends from its
// anchor point (x, y), so placement code can keep the whole shape on-screen.
export function getChairMargins(size) {
  return {
    left: size * SIDE_FACTOR,
    right: size * SIDE_FACTOR,
    top: size * TOP_FACTOR,
    bottom: size * BOTTOM_FACTOR,
  }
}
