import { useRef, useEffect, useCallback } from 'react'

const STAR_COLOR = '#fff'
const STAR_SIZE = 3
const STAR_MIN_SCALE = 0.2
const OVERFLOW_THRESHOLD = 50

interface Star {
  x: number
  y: number
  z: number
}

export default function Background3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const velocityRef = useRef({ x: 0, y: 0, tx: 0, ty: 0, z: 0.0005 })
  const pointerRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null })
  const sizeRef = useRef({ width: 0, height: 0, scale: 1 })
  const rafRef = useRef<number>(0)
  const lastScrollY = useRef(0)

  const placeStar = useCallback((star: Star) => {
    star.x = Math.random() * sizeRef.current.width
    star.y = Math.random() * sizeRef.current.height
  }, [])

  const recycleStar = useCallback((star: Star) => {
    const { width, height } = sizeRef.current
    const vel = velocityRef.current
    let direction = 'z'

    const vx = Math.abs(vel.x)
    const vy = Math.abs(vel.y)

    if (vx > 1 || vy > 1) {
      let axis: string
      if (vx > vy) {
        axis = Math.random() < vx / (vx + vy) ? 'h' : 'v'
      } else {
        axis = Math.random() < vy / (vx + vy) ? 'v' : 'h'
      }
      if (axis === 'h') {
        direction = vel.x > 0 ? 'l' : 'r'
      } else {
        direction = vel.y > 0 ? 't' : 'b'
      }
    }

    star.z = STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE)

    if (direction === 'z') {
      star.z = 0.1
      star.x = Math.random() * width
      star.y = Math.random() * height
    } else if (direction === 'l') {
      star.x = -OVERFLOW_THRESHOLD
      star.y = height * Math.random()
    } else if (direction === 'r') {
      star.x = width + OVERFLOW_THRESHOLD
      star.y = height * Math.random()
    } else if (direction === 't') {
      star.x = width * Math.random()
      star.y = -OVERFLOW_THRESHOLD
    } else if (direction === 'b') {
      star.x = width * Math.random()
      star.y = height + OVERFLOW_THRESHOLD
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return

    // Generate stars
    const starCount = (window.innerWidth + window.innerHeight) / 8
    const stars: Star[] = []
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: 0,
        y: 0,
        z: STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE),
      })
    }
    starsRef.current = stars

    // Resize handler
    const resize = () => {
      const scale = window.devicePixelRatio || 1
      const width = window.innerWidth * scale
      const height = window.innerHeight * scale
      canvas.width = width
      canvas.height = height
      sizeRef.current = { width, height, scale }
      stars.forEach(placeStar)
    }

    // Animation loop
    const step = () => {
      const { width, height, scale } = sizeRef.current
      const vel = velocityRef.current

      context.clearRect(0, 0, width, height)

      // Update
      vel.tx *= 0.96
      vel.ty *= 0.96
      vel.x += (vel.tx - vel.x) * 0.8
      vel.y += (vel.ty - vel.y) * 0.8

      stars.forEach((star) => {
        star.x += vel.x * star.z
        star.y += vel.y * star.z
        star.x += (star.x - width / 2) * vel.z * star.z
        star.y += (star.y - height / 2) * vel.z * star.z
        star.z += vel.z

        if (
          star.x < -OVERFLOW_THRESHOLD ||
          star.x > width + OVERFLOW_THRESHOLD ||
          star.y < -OVERFLOW_THRESHOLD ||
          star.y > height + OVERFLOW_THRESHOLD
        ) {
          recycleStar(star)
        }
      })

      // Render
      stars.forEach((star) => {
        context.beginPath()
        context.lineCap = 'round'
        context.lineWidth = STAR_SIZE * star.z * scale
        context.globalAlpha = 0.5 + 0.5 * Math.random()
        context.strokeStyle = STAR_COLOR

        context.beginPath()
        context.moveTo(star.x, star.y)

        let tailX = vel.x * 2
        let tailY = vel.y * 2
        if (Math.abs(tailX) < 0.1) tailX = 0.5
        if (Math.abs(tailY) < 0.1) tailY = 0.5

        context.lineTo(star.x + tailX, star.y + tailY)
        context.stroke()
      })

      rafRef.current = requestAnimationFrame(step)
    }

    // Pointer handlers
    const movePointer = (x: number, y: number) => {
      const ptr = pointerRef.current
      const { scale } = sizeRef.current
      if (typeof ptr.x === 'number' && typeof ptr.y === 'number') {
        const ox = x - ptr.x
        const oy = y - ptr.y
        velocityRef.current.tx += (ox / (64 * scale)) * -1
        velocityRef.current.ty += (oy / (64 * scale)) * -1
      }
      ptr.x = x
      ptr.y = y
    }

    const onMouseMove = (e: MouseEvent) => movePointer(e.clientX, e.clientY)
    const onTouchMove = (e: TouchEvent) => {
      movePointer(e.touches[0].clientX, e.touches[0].clientY)
      e.preventDefault()
    }
    const onMouseLeave = () => {
      pointerRef.current.x = null
      pointerRef.current.y = null
    }

    // Scroll handler — same sensitivity as mouse
    const onScroll = () => {
      const currentY = window.scrollY
      const delta = currentY - lastScrollY.current
      const { scale } = sizeRef.current
      velocityRef.current.ty += (delta / (64 * scale)) * 1
      lastScrollY.current = currentY
    }

    // Init
    lastScrollY.current = window.scrollY
    resize()
    rafRef.current = requestAnimationFrame(step)

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('touchend', onMouseLeave)
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onMouseLeave)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [placeStar, recycleStar])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  )
}
