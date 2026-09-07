import './TennisBall.css'

const SEAM_COLOR_OFFSET = 0.62

// Renders a simple flat-shaded tennis ball: a yellow-green circle with two
// curved seam lines, plus a soft ground shadow that shrinks/fades as the
// ball hops higher so the bounce reads with a sense of depth.
function TennisBall({ x = 0, y = 0, size = 46, bounce = null }) {
  const radius = size / 2
  const bounceHeight = size * 0.9

  const active = Boolean(bounce?.active)
  const phase = bounce?.phase ?? 0
  // abs(sin) traces repeated hops that touch down at phase 0, PI, 2*PI, ...
  const hopAmount = active ? Math.abs(Math.sin(phase)) : 0
  const hopOffsetY = -hopAmount * bounceHeight
  // Squash flat on ground contact, stretch slightly at the peak of each hop.
  const squashX = 1 + hopAmount * 0.12
  const squashY = 1 - hopAmount * 0.16
  const shadowScale = 1 - hopAmount * 0.55
  const shadowOpacity = 0.22 - hopAmount * 0.14

  const viewBoxSize = size * 2.4
  const half = viewBoxSize / 2

  return (
    <svg
      className="tennis-ball"
      style={{
        left: x,
        top: y,
        width: viewBoxSize,
        height: viewBoxSize,
        zIndex: active ? 1 : 'auto',
      }}
      viewBox={`${-half} ${-half} ${viewBoxSize} ${viewBoxSize}`}
    >
      <ellipse
        className="tennis-ball-shadow"
        cx={0}
        cy={radius * 0.9}
        rx={radius * 0.85 * shadowScale}
        ry={radius * 0.28 * shadowScale}
        style={{ opacity: shadowOpacity }}
      />
      <g transform={`translate(0 ${hopOffsetY}) scale(${squashX} ${squashY})`}>
        <circle className="tennis-ball-body" cx={0} cy={0} r={radius} />
        <path
          className="tennis-ball-seam"
          d={`M ${-radius} 0 Q 0 ${radius * SEAM_COLOR_OFFSET} ${radius} 0`}
        />
        <path
          className="tennis-ball-seam"
          d={`M ${-radius} 0 Q 0 ${-radius * SEAM_COLOR_OFFSET} ${radius} 0`}
        />
      </g>
    </svg>
  )
}

export default TennisBall
