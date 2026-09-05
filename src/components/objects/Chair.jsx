import './Chair.css'

// Renders a flat-shaded ladder-back chair with a simple front-perspective
// read: back posts/legs are narrower-set and shorter (farther away), front
// legs are wider-set and taller (closer), and the seat is a trapezoid whose
// four corners each sit on top of one leg (front edge longer than back edge).
function Chair({ x = 0, y = 0, size = 90 }) {
  const frontHalfWidth = size * 0.55
  const backHalfWidth = size * 0.34
  const seatFrontY = size * 0.12
  const seatBackY = -size * 0.08
  const frontLegFloorY = size * 0.66
  const backLegFloorY = size * 0.44
  const backRestTopY = -size * 0.8
  const legThickness = size * 0.12
  const slatHeight = size * 0.09
  const slatGap = size * 0.18

  const viewBoxWidth = size * 1.3
  const viewBoxHeight = size * 2
  const halfW = viewBoxWidth / 2

  const seatPoints = [
    [-frontHalfWidth, seatFrontY],
    [frontHalfWidth, seatFrontY],
    [backHalfWidth, seatBackY],
    [-backHalfWidth, seatBackY],
  ]
    .map((point) => point.join(','))
    .join(' ')

  return (
    <svg
      className="chair"
      style={{ left: x, top: y, width: viewBoxWidth, height: viewBoxHeight }}
      viewBox={`${-halfW} ${-size * 0.9} ${viewBoxWidth} ${viewBoxHeight}`}
    >
      <rect
        className="chair-post"
        x={-backHalfWidth - legThickness / 2}
        y={backRestTopY}
        width={legThickness}
        height={backLegFloorY - backRestTopY}
        rx={legThickness * 0.3}
      />
      <rect
        className="chair-post"
        x={backHalfWidth - legThickness / 2}
        y={backRestTopY}
        width={legThickness}
        height={backLegFloorY - backRestTopY}
        rx={legThickness * 0.3}
      />
      <rect
        className="chair-back"
        x={-backHalfWidth - legThickness / 2}
        y={backRestTopY + size * 0.08}
        width={backHalfWidth * 2 + legThickness}
        height={slatHeight}
        rx={slatHeight * 0.3}
      />
      <rect
        className="chair-back"
        x={-backHalfWidth - legThickness / 2}
        y={backRestTopY + size * 0.08 + slatGap}
        width={backHalfWidth * 2 + legThickness}
        height={slatHeight}
        rx={slatHeight * 0.3}
      />
      <polygon className="chair-seat" points={seatPoints} />
      <rect
        className="chair-leg"
        x={-frontHalfWidth}
        y={seatFrontY}
        width={legThickness}
        height={frontLegFloorY - seatFrontY}
        rx={legThickness * 0.3}
      />
      <rect
        className="chair-leg"
        x={frontHalfWidth - legThickness}
        y={seatFrontY}
        width={legThickness}
        height={frontLegFloorY - seatFrontY}
        rx={legThickness * 0.3}
      />
    </svg>
  )
}

export default Chair
