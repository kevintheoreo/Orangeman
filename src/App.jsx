import Tank from './components/Tank'
import BlobCharacter from './components/BlobCharacter'
import './App.css'

function App() {
  return (
    <Tank>
      {({ width, height }) =>
        width > 0 && height > 0 && <BlobCharacter x={width / 2} y={height / 2} />
      }
    </Tank>
  )
}

export default App
