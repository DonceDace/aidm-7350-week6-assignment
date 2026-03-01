import { motion, useScroll, useSpring } from 'motion/react'

/** Thin gradient progress bar fixed at the very top of the viewport */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 80, damping: 25, restDelta: 0.001 })

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        zIndex: 100,
        background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #22d3ee)',
        transformOrigin: '0%',
        scaleX,
      }}
    />
  )
}
