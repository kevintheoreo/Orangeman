// Generates a closed organic blob outline as an SVG path string.
// Radius is perturbed by layered sine waves (seeded) so the shape looks
// hand-drawn rather than a perfect circle, then smoothed into a closed curve.
export function generateBlobPath({
  radius = 50,
  points = 10,
  irregularity = 0.15,
  seed = 0,
  squashX = 1,
  squashY = 1,
} = {}) {
  const angleStep = (Math.PI * 2) / points
  const coords = []

  for (let i = 0; i < points; i++) {
    const angle = i * angleStep
    const wobble =
      Math.sin(angle * 3 + seed) * 0.6 + Math.sin(angle * 5 + seed * 1.7) * 0.4
    const r = radius * (1 + wobble * irregularity)
    coords.push([Math.cos(angle) * r * squashX, Math.sin(angle) * r * squashY])
  }

  return buildSmoothClosedPath(coords)
}

// Builds a smooth closed path by quadratic-curving through midpoints of
// consecutive points, using each original point as the curve's control point.
function buildSmoothClosedPath(coords) {
  const count = coords.length
  const midpoint = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]

  const start = midpoint(coords[count - 1], coords[0])
  let d = `M ${start[0]} ${start[1]} `

  for (let i = 0; i < count; i++) {
    const current = coords[i]
    const next = coords[(i + 1) % count]
    const mid = midpoint(current, next)
    d += `Q ${current[0]} ${current[1]} ${mid[0]} ${mid[1]} `
  }

  return `${d}Z`
}
