import { useEffect, useRef, useState } from 'react'
import './Tank.css'

// Fullscreen container that tracks its own pixel bounds for children.
function Tank({ children }) {
  const containerRef = useRef(null)
  const [bounds, setBounds] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const element = containerRef.current
    if (!element) return

    const updateBounds = (width, height) => {
      setBounds((prev) =>
        prev.width === width && prev.height === height ? prev : { width, height }
      )
    }

    updateBounds(element.clientWidth, element.clientHeight)

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (!entry) return
      const { width, height } = entry.contentRect
      updateBounds(width, height)
    })
    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="tank">
      {typeof children === 'function' ? children(bounds) : children}
    </div>
  )
}

export default Tank
