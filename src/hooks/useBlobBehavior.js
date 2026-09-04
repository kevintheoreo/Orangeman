import { useEffect, useRef, useState } from 'react'

const DEFAULT_SPEED = 140 // px/sec
const ARRIVAL_THRESHOLD = 4
const SQUISH_DURATION = 220 // ms
const WALK_CYCLE_RATE = 0.045 // radians per (px/sec of speed) per second

const ACTION_INTERVAL_MIN = 2000 // ms
const ACTION_INTERVAL_MAX = 6000 // ms
const ACTION_DURATION_MIN = 400 // ms
const ACTION_DURATION_MAX = 1000 // ms
const REDIRECT_CHANCE = 0.6 // chance the timer just picks a new walk target instead of an idle action
const IDLE_ACTIONS = ['jumping', 'spinning', 'waving', 'squashing', 'colorFlash']

function randomBetween(min, max) {
  return min + Math.random() * (max - min)
}

function randomTarget(bounds, margins) {
  const width = Math.max(bounds.width - margins.left - margins.right, 1)
  const height = Math.max(bounds.height - margins.top - margins.bottom, 1)
  return {
    x: margins.left + Math.random() * width,
    y: margins.top + Math.random() * height,
  }
}

function clampAxis(value, min, max) {
  if (value < min) return { value: min, hit: true }
  if (value > max) return { value: max, hit: true }
  return { value, hit: false }
}

// requestAnimationFrame-driven random walk: continuously steers the blob's
// position toward a random target, picking a new target on arrival, and
// clamps/reflects at the tank walls (with a brief squish) so it can never
// render outside the visible bounds, even mid-resize.
function useBlobBehavior(bounds, { margins, speed = DEFAULT_SPEED } = {}) {
  const boundsRef = useRef(bounds)
  const marginsRef = useRef(margins)
  const dataRef = useRef(null)
  const [pose, setPose] = useState(() => ({
    x: bounds.width / 2,
    y: bounds.height / 2,
    facing: 'right',
    squish: { axis: null, intensity: 0 },
    walkPhase: 0,
    action: { name: 'walking', progress: 0 },
  }))

  useEffect(() => {
    boundsRef.current = bounds
    marginsRef.current = margins
  }, [bounds, margins])

  useEffect(() => {
    if (bounds.width <= 0 || bounds.height <= 0) return undefined

    if (!dataRef.current) {
      dataRef.current = {
        position: { x: bounds.width / 2, y: bounds.height / 2 },
        target: randomTarget(bounds, margins),
        facing: 'right',
        squishAxis: null,
        squishStart: -Infinity,
        walkPhase: 0,
        actionName: 'walking',
        actionStart: 0,
        actionDuration: 0,
        nextActionTime: performance.now() + randomBetween(ACTION_INTERVAL_MIN, ACTION_INTERVAL_MAX),
      }
    }

    let frameId
    let lastTime = performance.now()

    const tick = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1)
      lastTime = now

      const data = dataRef.current
      const currentBounds = boundsRef.current
      const currentMargins = marginsRef.current

      // Idle actions briefly pause walking, then hand control back.
      if (data.actionName !== 'walking') {
        if (now - data.actionStart >= data.actionDuration) {
          data.actionName = 'walking'
          data.nextActionTime = now + randomBetween(ACTION_INTERVAL_MIN, ACTION_INTERVAL_MAX)
        }
      } else if (now >= data.nextActionTime) {
        if (Math.random() < REDIRECT_CHANCE) {
          data.target = randomTarget(currentBounds, currentMargins)
          data.nextActionTime = now + randomBetween(ACTION_INTERVAL_MIN, ACTION_INTERVAL_MAX)
        } else {
          data.actionName = IDLE_ACTIONS[Math.floor(Math.random() * IDLE_ACTIONS.length)]
          data.actionStart = now
          data.actionDuration = randomBetween(ACTION_DURATION_MIN, ACTION_DURATION_MAX)
        }
      }

      const isIdle = data.actionName !== 'walking'
      const dx = data.target.x - data.position.x
      const dy = data.target.y - data.position.y
      const distance = Math.hypot(dx, dy)

      if (isIdle) {
        // Frozen in place while performing an idle action.
      } else if (distance < ARRIVAL_THRESHOLD) {
        data.target = randomTarget(currentBounds, currentMargins)
      } else {
        const step = Math.min(speed * dt, distance)
        data.position = {
          x: data.position.x + (dx / distance) * step,
          y: data.position.y + (dy / distance) * step,
        }
        if (Math.abs(dx) > 1) {
          data.facing = dx < 0 ? 'left' : 'right'
        }
        data.walkPhase += dt * speed * WALK_CYCLE_RATE
      }

      const clampedX = clampAxis(
        data.position.x,
        currentMargins.left,
        currentBounds.width - currentMargins.right
      )
      const clampedY = clampAxis(
        data.position.y,
        currentMargins.top,
        currentBounds.height - currentMargins.bottom
      )
      data.position = { x: clampedX.value, y: clampedY.value }

      if (clampedX.hit || clampedY.hit) {
        data.target = randomTarget(currentBounds, currentMargins)
        data.squishAxis = clampedX.hit ? 'horizontal' : 'vertical'
        data.squishStart = now
      }

      const squishElapsed = now - data.squishStart
      const squish =
        squishElapsed < SQUISH_DURATION
          ? { axis: data.squishAxis, intensity: 1 - squishElapsed / SQUISH_DURATION }
          : { axis: null, intensity: 0 }

      const action = {
        name: data.actionName,
        progress: isIdle ? Math.min((now - data.actionStart) / data.actionDuration, 1) : 0,
      }

      setPose({
        x: data.position.x,
        y: data.position.y,
        facing: data.facing,
        squish,
        walkPhase: data.walkPhase,
        action,
      })
      frameId = requestAnimationFrame(tick)
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [bounds.width, bounds.height, speed, margins])

  return pose
}

export default useBlobBehavior

