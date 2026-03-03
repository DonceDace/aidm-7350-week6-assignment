import { type ReactNode, useRef } from 'react'
import { type TargetAndTransition, motion, useInView } from 'motion/react'

type Variant = 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'scaleUp' | 'blurIn' | 'slideRotate'

const variants: Record<Variant, { hidden: TargetAndTransition; visible: TargetAndTransition }> = {
  fadeUp: {
    hidden: { opacity: 0, y: 100, filter: 'blur(10px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -120, filter: 'blur(8px)' },
    visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 120, filter: 'blur(8px)' },
    visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.7, filter: 'blur(14px)' },
    visible: { opacity: 1, scale: 1, filter: 'blur(0px)' },
  },
  blurIn: {
    hidden: { opacity: 0, filter: 'blur(28px)', scale: 0.88 },
    visible: { opacity: 1, filter: 'blur(0px)', scale: 1 },
  },
  slideRotate: {
    hidden: { opacity: 0, y: 100, rotate: -5 },
    visible: { opacity: 1, y: 0, rotate: 0 },
  },
}

interface ScrollRevealProps {
  children: ReactNode
  variant?: Variant
  delay?: number
  duration?: number
  once?: boolean
  /** viewport margin — negative means trigger earlier */
  margin?: string
  style?: React.CSSProperties
  className?: string
}

/**
 * Wrap any element to give it a dramatic scroll-triggered entrance animation.
 * Uses `useInView` + CSS-filter-based blur/fade for GPU-accelerated smoothness.
 */
export default function ScrollReveal({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration = 0.7,
  once = true,
  margin = '-80px',
  style,
  className,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: margin as `${number}px` })
  const { hidden, visible } = variants[variant]

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={hidden}
      animate={isInView ? visible : hidden}
      transition={{
        duration: duration * 1.15,
        delay,
        ease: [0.16, 1, 0.3, 1], // TwitchCon-style smooth overshoot deceleration
      }}
      style={{ willChange: 'transform, opacity, filter', ...style }}
    >
      {children}
    </motion.div>
  )
}
