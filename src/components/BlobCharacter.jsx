import { generateBlobPath } from '../utils/blobPath'
import './BlobCharacter.css'

// Renders a static orange blob, humanoid smiski-style: a rounded head
// overlapping a taller rounded torso (one seamless silhouette), with
// stubby limb capsules and a minimal dot-eyed face.
function BlobCharacter({ x = 0, y = 0, size = 100 }) {
  const baseRadius = size / 2
  const headRadius = baseRadius * 0.56
  const headOffsetY = -size * 0.46
  const torsoOffsetY = size * 0.18

  const torsoPath = generateBlobPath({
    radius: baseRadius,
    points: 10,
    irregularity: 0.12,
    seed: 2.1,
    squashX: 0.62,
    squashY: 1.18,
  })
  const headPath = generateBlobPath({
    radius: headRadius,
    points: 9,
    irregularity: 0.14,
    seed: 0.4,
  })

  const viewBoxSize = size * 2
  const half = viewBoxSize / 2

  return (
    <svg
      className="blob-character"
      style={{ left: x, top: y, width: viewBoxSize, height: viewBoxSize }}
      viewBox={`${-half} ${-half} ${viewBoxSize} ${viewBoxSize}`}
    >
      <rect className="blob-limb" x={-size * 0.13} y={size * 0.52} width={size * 0.12} height={size * 0.52} rx={size * 0.06} />
      <rect className="blob-limb" x={size * 0.01} y={size * 0.52} width={size * 0.12} height={size * 0.52} rx={size * 0.06} />
      <rect
        className="blob-limb"
        x={-size * 0.38}
        y={size * 0.02}
        width={size * 0.16}
        height={size * 0.48}
        rx={size * 0.08}
        transform={`rotate(18 ${-size * 0.3} ${size * 0.18})`}
      />
      <rect
        className="blob-limb"
        x={size * 0.22}
        y={size * 0.02}
        width={size * 0.16}
        height={size * 0.48}
        rx={size * 0.08}
        transform={`rotate(-18 ${size * 0.3} ${size * 0.18})`}
      />

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
    </svg>
  )
}

export default BlobCharacter

