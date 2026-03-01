import { motion, useScroll, useTransform, useSpring } from 'motion/react'

/**
 * Floating orbs and geometric decorations that move with parallax
 * as the user scrolls. Placed behind content for visual depth.
 */
export default function ScrollDecorations() {
  const { scrollYProgress } = useScroll()

  // Smooth spring followers
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 40, damping: 20 })

  // Individual parallax transforms
  const y1 = useTransform(smoothProgress, [0, 1], [0, -320])
  const y2 = useTransform(smoothProgress, [0, 1], [0, -480])
  const y3 = useTransform(smoothProgress, [0, 1], [0, -200])
  const y4 = useTransform(smoothProgress, [0, 1], [0, -600])

  const x1 = useTransform(smoothProgress, [0, 1], [0, 60])
  const x2 = useTransform(smoothProgress, [0, 1], [0, -70])

  const rotate1 = useTransform(smoothProgress, [0, 1], [0, 180])
  const rotate2 = useTransform(smoothProgress, [0, 1], [0, -90])

  const scale1 = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0.6, 1.1, 0.8, 0.5])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden',
      }}
    >
      {/* Large blue orb — top-left */}
      <motion.div
        style={{
          position: 'absolute',
          top: '15%',
          left: '-5%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
          y: y1,
          x: x1,
          scale: scale1,
        }}
      />

      {/* Purple orb — mid-right */}
      <motion.div
        style={{
          position: 'absolute',
          top: '40%',
          right: '-8%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)',
          filter: 'blur(80px)',
          y: y2,
          x: x2,
        }}
      />

      {/* Cyan accent — bottom */}
      <motion.div
        style={{
          position: 'absolute',
          top: '70%',
          left: '20%',
          width: 350,
          height: 350,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,211,238,0.04) 0%, transparent 70%)',
          filter: 'blur(60px)',
          y: y3,
        }}
      />

      {/* Rotating geometric — diamond */}
      <motion.div
        style={{
          position: 'absolute',
          top: '25%',
          right: '12%',
          width: 32,
          height: 32,
          border: '1.5px solid rgba(96,165,250,0.12)',
          borderRadius: 4,
          y: y1,
          rotate: rotate1,
        }}
      />

      {/* Small triangle outline */}
      <motion.svg
        viewBox="0 0 40 40"
        style={{
          position: 'absolute',
          top: '55%',
          left: '8%',
          width: 28,
          height: 28,
          y: y4,
          rotate: rotate2,
        }}
      >
        <polygon
          points="20,4 36,36 4,36"
          stroke="rgba(139,92,246,0.15)"
          strokeWidth="1.5"
          fill="none"
        />
      </motion.svg>

      {/* Circle outline */}
      <motion.div
        style={{
          position: 'absolute',
          top: '75%',
          right: '18%',
          width: 20,
          height: 20,
          borderRadius: '50%',
          border: '1.5px solid rgba(34,211,238,0.12)',
          y: y2,
        }}
      />

      {/* Dotted line vertical */}
      <motion.div
        style={{
          position: 'absolute',
          top: '30%',
          left: '4%',
          width: 1,
          height: 120,
          background: 'repeating-linear-gradient(to bottom, rgba(96,165,250,0.1) 0px, rgba(96,165,250,0.1) 4px, transparent 4px, transparent 10px)',
          y: y3,
        }}
      />

      {/* Dotted line vertical — right */}
      <motion.div
        style={{
          position: 'absolute',
          top: '60%',
          right: '5%',
          width: 1,
          height: 100,
          background: 'repeating-linear-gradient(to bottom, rgba(139,92,246,0.08) 0px, rgba(139,92,246,0.08) 4px, transparent 4px, transparent 10px)',
          y: y1,
        }}
      />

      {/* Small plus sign */}
      <motion.svg
        viewBox="0 0 20 20"
        style={{
          position: 'absolute',
          top: '45%',
          left: '15%',
          width: 14,
          height: 14,
          y: y4,
          rotate: rotate1,
          opacity: 0.2,
        }}
      >
        <line x1="10" y1="2" x2="10" y2="18" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" />
        <line x1="2" y1="10" x2="18" y2="10" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" />
      </motion.svg>

      {/* Cross / X */}
      <motion.svg
        viewBox="0 0 20 20"
        style={{
          position: 'absolute',
          top: '82%',
          left: '30%',
          width: 12,
          height: 12,
          y: y3,
          rotate: rotate2,
          opacity: 0.15,
        }}
      >
        <line x1="4" y1="4" x2="16" y2="16" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" />
        <line x1="16" y1="4" x2="4" y2="16" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" />
      </motion.svg>
    </div>
  )
}
