import { useMemo } from 'react'
import Tank from './components/Tank'
import BlobCharacter from './components/BlobCharacter'
import Chair from './components/objects/Chair'
import useBlobBehavior from './hooks/useBlobBehavior'
import useTankObjectPlacement from './hooks/useTankObjectPlacement'
import { getBlobMargins } from './utils/blobMetrics'
import { getChairMargins } from './utils/chairMetrics'
import './App.css'

const BLOB_SIZE = 100
const CHAIR_SIZE = 90
// The blob's anchor point sits near its hips (~half its size above its feet),
// so the seek target needs to be raised by that much to land its hips on the
// seat instead of its feet on the floor.
const SIT_SEAT_OFFSET = BLOB_SIZE * 0.5

function Scene({ bounds }) {
  const blobMargins = useMemo(() => getBlobMargins(BLOB_SIZE), [])
  const chairMargins = useMemo(() => getChairMargins(CHAIR_SIZE), [])
  const chair = useTankObjectPlacement(bounds, chairMargins)
  const chairSeatTarget = useMemo(
    () => (chair ? { x: chair.x, y: chair.y - SIT_SEAT_OFFSET } : null),
    [chair]
  )
  const { x, y, facing, squish, walkPhase, action } = useBlobBehavior(bounds, {
    margins: blobMargins,
    chair: chairSeatTarget,
  })

  return (
    <>
      {chair && <Chair x={chair.x} y={chair.y} size={CHAIR_SIZE} />}
      <BlobCharacter
        x={x}
        y={y}
        size={BLOB_SIZE}
        facing={facing}
        squish={squish}
        walkPhase={walkPhase}
        action={action}
      />
    </>
  )
}

function App() {
  return (
    <Tank>
      {(bounds) => bounds.width > 0 && bounds.height > 0 && <Scene bounds={bounds} />}
    </Tank>
  )
}

export default App
