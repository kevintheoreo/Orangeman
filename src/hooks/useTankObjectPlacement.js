import { useEffect, useRef, useState } from 'react'

// Places a static tank object at a random point within bounds/margins once
// the tank's size is known, then re-clamps (never re-randomizes) it if the
// tank shrinks on resize. Reusable for any object that just needs a fixed
// spot in the scene (chair, future props, etc).
function useTankObjectPlacement(bounds, margins) {
  const [position, setPosition] = useState(null)
  const placedRef = useRef(false)

  useEffect(() => {
    if (bounds.width <= 0 || bounds.height <= 0) return

    if (!placedRef.current) {
      const width = Math.max(bounds.width - margins.left - margins.right, 1)
      const height = Math.max(bounds.height - margins.top - margins.bottom, 1)
      placedRef.current = true
      setPosition({
        x: margins.left + Math.random() * width,
        y: margins.top + Math.random() * height,
      })
      return
    }

    setPosition((prev) => {
      if (!prev) return prev
      const minX = margins.left
      const maxX = Math.max(bounds.width - margins.right, minX)
      const minY = margins.top
      const maxY = Math.max(bounds.height - margins.bottom, minY)
      const x = Math.min(Math.max(prev.x, minX), maxX)
      const y = Math.min(Math.max(prev.y, minY), maxY)
      return x === prev.x && y === prev.y ? prev : { x, y }
    })
  }, [bounds.width, bounds.height, margins])

  return position
}

export default useTankObjectPlacement
