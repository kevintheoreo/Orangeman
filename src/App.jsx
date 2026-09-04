import { useMemo } from 'react'
import Tank from './components/Tank'
import BlobCharacter from './components/BlobCharacter'
import useBlobBehavior from './hooks/useBlobBehavior'
import { getBlobMargins } from './utils/blobMetrics'
import './App.css'

const BLOB_SIZE = 100

function Blob({ bounds }) {
  const margins = useMemo(() => getBlobMargins(BLOB_SIZE), [])
  const { x, y, facing, squish } = useBlobBehavior(bounds, { margins })
  return <BlobCharacter x={x} y={y} size={BLOB_SIZE} facing={facing} squish={squish} />
}

function App() {
  return (
    <Tank>
      {(bounds) => bounds.width > 0 && bounds.height > 0 && <Blob bounds={bounds} />}
    </Tank>
  )
}

export default App
