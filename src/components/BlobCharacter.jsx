import { generateBlobPath } from '../utils/blobPath'
import './BlobCharacter.css'

const SQUISH_STRENGTH = 0.18
const WADDLE_BOB = 0.035 // fraction of size the body bounces vertically
const BODY_SQUASH = 0.05 // fraction the torso squashes/stretches per bounce
const LEG_SWING_DEG = 20
const ARM_SWING_DEG = 14

// Renders an orange blob, humanoid smiski-style: a rounded head
// overlapping a taller rounded torso (one seamless silhouette), with
// stubby limb capsules and a minimal dot-eyed face.
function BlobCharacter({
  x = 0,
  y = 0,
  size = 100,
  facing = 'right',
  squish = { axis: null, intensity: 0 },
  walkPhase = 0,
}) {
  const baseRadius = size / 2
  const headRadius = baseRadius * 0.56
  const headOffsetY = -size * 0.46
  const torsoOffsetY = size * 0.18

  // Waddle cycle: two bounces per stride (one per footfall), squashing the
  // torso in sync with the bob and swinging opposite arm/leg pairs.
  const bounce = Math.sin(walkPhase * 2)
  const bobY = -bounce * size * WADDLE_BOB
  const legSwingLeft = Math.sin(walkPhase) * LEG_SWING_DEG
  const legSwingRight = -legSwingLeft
  const armSwingLeft = -legSwingLeft * (ARM_SWING_DEG / LEG_SWING_DEG)
  const armSwingRight = -armSwingLeft

  const torsoPath = generateBlobPath({
    radius: baseRadius,
    points: 10,
    irregularity: 0.12,
    seed: 2.1,
    squashX: 0.62 * (1 + bounce * BODY_SQUASH),
    squashY: 1.18 * (1 - bounce * BODY_SQUASH),
  })
  const headPath = generateBlobPath({
    radius: headRadius,
    points: 9,
    irregularity: 0.14,
    seed: 0.4,
  })

  const viewBoxSize = size * 2
  const half = viewBoxSize / 2

  const mirror = facing === 'left' ? -1 : 1

  // Squash along the wall-contact axis and stretch along the other, easing back to normal.
  const squishAmount = squish.intensity * SQUISH_STRENGTH
  const scaleX = squish.axis === 'horizontal' ? 1 - squishAmount : 1 + squishAmount * 0.5
  const scaleY = squish.axis === 'vertical' ? 1 - squishAmount : 1 + squishAmount * 0.5

  return (
    <svg
      className="blob-character"
      style={{
        left: x,
        top: y,
        width: viewBoxSize,
        height: viewBoxSize,
        transform: `translate(-50%, -50%) scaleX(${mirror * scaleX}) scaleY(${scaleY})`,
      }}
      viewBox={`${-half} ${-half} ${viewBoxSize} ${viewBoxSize}`}
    >
      <rect
        className="blob-limb"
        x={-size * 0.13}
        y={size * 0.52}
        width={size * 0.12}
        height={size * 0.52}
        rx={size * 0.06}
        transform={`rotate(${legSwingLeft} ${-size * 0.07} ${size * 0.52})`}
      />
      <rect
        className="blob-limb"
        x={size * 0.01}
        y={size * 0.52}
        width={size * 0.12}
        height={size * 0.52}
        rx={size * 0.06}
        transform={`rotate(${legSwingRight} ${size * 0.07} ${size * 0.52})`}
      />
      <rect
        className="blob-limb"
        x={-size * 0.38}
        y={size * 0.02}
        width={size * 0.16}
        height={size * 0.48}
        rx={size * 0.08}
        transform={`rotate(${18 + armSwingLeft} ${-size * 0.3} ${size * 0.18})`}
      />
      <rect
        className="blob-limb"
        x={size * 0.22}
        y={size * 0.02}
        width={size * 0.16}
        height={size * 0.48}
        rx={size * 0.08}
        transform={`rotate(${-18 + armSwingRight} ${size * 0.3} ${size * 0.18})`}
      />

      <g transform={`translate(0 ${bobY})`}>
        <path className="blob-body" d={torsoPath} transform={`translate(0 ${torsoOffsetY})`} />
        <path className="blob-body" d={headPath} transform={`translate(0 ${headOffsetY})`} />

        <circle className="blob-eye" cx={-headRadius * 0.36} cy={headOffsetY} r={size * 0.05} />
        <circle className="blob-eye" cx={headRadius * 0.36} cy={headOffsetY} r={size * 0.05} />
        <line
          className="blob-mouth"
          x1={-headRadius * 0.22}
          y1={headOffsetY + size * 0.14}
          x2={headRadius * 0.22}
          y2={headOffsetY + size * 0.14}
        />
      </g>

    </svg>
  )
}

export default BlobCharacter

