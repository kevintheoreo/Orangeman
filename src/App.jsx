import Tank from './components/Tank'
import BlobCharacter from './components/BlobCharacter'
import useBlobBehavior from './hooks/useBlobBehavior'
import './App.css'

const BLOB_SIZE = 100

function Blob({ bounds }) {
  const { x, y, facing } = useBlobBehavior(bounds, { size: BLOB_SIZE })
  return <BlobCharacter x={x} y={y} size={BLOB_SIZE} facing={facing} />
}

function App() {
  return (
    <Tank>
      {(bounds) => bounds.width > 0 && bounds.height > 0 && <Blob bounds={bounds} />}
    </Tank>
  )
}

export default App
