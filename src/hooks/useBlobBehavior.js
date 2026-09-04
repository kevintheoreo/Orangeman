import { useEffect, useRef, useState } from 'react'

const DEFAULT_SPEED = 140 // px/sec
const ARRIVAL_THRESHOLD = 4

function randomTarget(bounds, margin) {
  const width = Math.max(bounds.width - margin * 2, 1)
  const height = Math.max(bounds.height - margin * 2, 1)
  return {
    x: margin + Math.random() * width,
    y: margin + Math.random() * height,
  }
}

// requestAnimationFrame-driven random walk: continuously steers the blob's
// position toward a random target, picking a new target on arrival.
function useBlobBehavior(bounds, { size = 100, speed = DEFAULT_SPEED } = {}) {
  const margin = size / 2
  const boundsRef = useRef(bounds)
  const dataRef = useRef(null)
  const [pose, setPose] = useState(() => ({
    x: bounds.width / 2,
    y: bounds.height / 2,
    facing: 'right',
  }))

  useEffect(() => {
    boundsRef.current = bounds
  }, [bounds])

  useEffect(() => {
    if (bounds.width <= 0 || bounds.height <= 0) return undefined

    if (!dataRef.current) {
      dataRef.current = {
        position: { x: bounds.width / 2, y: bounds.height / 2 },
        target: randomTarget(bounds, margin),
        facing: 'right',
      }
    }

    let frameId
    let lastTime = performance.now()

    const tick = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1)
      lastTime = now

      const data = dataRef.current
      const dx = data.target.x - data.position.x
      const dy = data.target.y - data.position.y
      const distance = Math.hypot(dx, dy)

      if (distance < ARRIVAL_THRESHOLD) {
        data.target = randomTarget(boundsRef.current, margin)
      } else {
        const step = Math.min(speed * dt, distance)
        data.position = {
          x: data.position.x + (dx / distance) * step,
          y: data.position.y + (dy / distance) * step,
        }
        if (Math.abs(dx) > 1) {
          data.facing = dx < 0 ? 'left' : 'right'
        }
      }

      setPose({ x: data.position.x, y: data.position.y, facing: data.facing })
      frameId = requestAnimationFrame(tick)
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [bounds.width, bounds.height, speed, margin])

  return pose
}

export default useBlobBehavior
