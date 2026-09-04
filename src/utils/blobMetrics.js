const HEAD_TOP_FACTOR = 0.82 // clearance above anchor for the head
const LEG_BOTTOM_FACTOR = 1.1 // clearance below anchor for the legs
const SIDE_FACTOR = 0.5 // clearance either side for the outstretched arms

// Returns how far each edge of the blob's visual silhouette extends from its
// anchor point (x, y), so movement code can keep the whole shape on-screen.
export function getBlobMargins(size) {
  return {
    left: size * SIDE_FACTOR,
    right: size * SIDE_FACTOR,
    top: size * HEAD_TOP_FACTOR,
    bottom: size * LEG_BOTTOM_FACTOR,
  }
}
