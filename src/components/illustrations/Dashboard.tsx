import { motion } from 'motion/react'

/** Bar-chart / data dashboard SVG used near the results section */
export default function DashboardIllustration({ size = 280 }: { size?: number }) {
  const bars = [
    { x: 80, h: 100, color: '#3b82f6', delay: 0 },
    { x: 130, h: 140, color: '#8b5cf6', delay: 0.1 },
    { x: 180, h: 90, color: '#06b6d4', delay: 0.2 },
    { x: 230, h: 165, color: '#10b981', delay: 0.3 },
    { x: 280, h: 120, color: '#f59e0b', delay: 0.4 },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 400 360" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <defs>
          <radialGradient id="dGlow" cx="50%" cy="60%" r="50%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>

        <rect x="40" y="20" width="320" height="310" rx="16" fill="rgba(15,23,42,0.7)" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
        <circle cx="200" cy="180" r="150" fill="url(#dGlow)" />

        {/* Window dots */}
        <circle cx="64" cy="42" r="5" fill="#ef4444" fillOpacity="0.7" />
        <circle cx="82" cy="42" r="5" fill="#f59e0b" fillOpacity="0.7" />
        <circle cx="100" cy="42" r="5" fill="#22c55e" fillOpacity="0.7" />

        {/* Title bar line */}
        <line x1="50" y1="58" x2="350" y2="58" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

        {/* Axes */}
        <line x1="65" y1="80" x2="65" y2="280" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
        <line x1="65" y1="280" x2="345" y2="280" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />

        {/* Grid lines */}
        {[130, 180, 230].map(y => (
          <line key={y} x1="65" y1={y} x2="345" y2={y} stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="4 6" />
        ))}

        {/* Bars */}
        {bars.map(bar => (
          <motion.g key={bar.x}>
            <motion.rect
              x={bar.x}
              width="30"
              rx="4"
              fill={bar.color}
              fillOpacity="0.7"
              initial={{ y: 280, height: 0 }}
              whileInView={{ y: 280 - bar.h, height: bar.h }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: bar.delay, ease: 'easeOut' }}
            />
            {/* Glow beneath bar */}
            <rect x={bar.x - 5} y={275} width="40" height="6" rx="3" fill={bar.color} fillOpacity="0.12" />
          </motion.g>
        ))}

        {/* Trend line */}
        <motion.path
          d="M95 220 C140 200, 160 170, 195 210 C230 250, 260 150, 295 160 C320 170, 330 140, 345 130"
          stroke="url(#lineGrad)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
        />

        {/* Data points on line */}
        {[{ cx: 95, cy: 220 }, { cx: 195, cy: 210 }, { cx: 295, cy: 160 }, { cx: 345, cy: 130 }].map((p, i) => (
          <motion.circle
            key={i}
            cx={p.cx} cy={p.cy} r="4"
            fill="#0f172a" stroke="#22d3ee" strokeWidth="2"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 + i * 0.15 }}
          />
        ))}

        {/* Mini stat cards */}
        <motion.g
          initial={{ opacity: 0, x: 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
        >
          <rect x="70" y="290" width="56" height="28" rx="8" fill="rgba(59,130,246,0.1)" stroke="rgba(59,130,246,0.2)" strokeWidth="1" />
          <text x="98" y="308" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="700" fontFamily="system-ui">87%</text>

          <rect x="138" y="290" width="56" height="28" rx="8" fill="rgba(16,185,129,0.1)" stroke="rgba(16,185,129,0.2)" strokeWidth="1" />
          <text x="166" y="308" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="700" fontFamily="system-ui">92%</text>

          <rect x="206" y="290" width="56" height="28" rx="8" fill="rgba(139,92,246,0.1)" stroke="rgba(139,92,246,0.2)" strokeWidth="1" />
          <text x="234" y="308" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="700" fontFamily="system-ui">78%</text>
        </motion.g>
      </svg>
    </motion.div>
  )
}
