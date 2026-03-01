import { motion } from 'motion/react'

/** Interactive skill-matching network / constellation SVG for the features section */
export default function SkillNetworkIllustration({ size = 300 }: { size?: number }) {
  const nodes = [
    { cx: 200, cy: 80, r: 20, color: '#3b82f6', label: 'JS' },
    { cx: 100, cy: 150, r: 16, color: '#8b5cf6', label: 'Py' },
    { cx: 310, cy: 140, r: 18, color: '#06b6d4', label: 'TS' },
    { cx: 150, cy: 260, r: 15, color: '#f59e0b', label: 'ML' },
    { cx: 260, cy: 250, r: 17, color: '#10b981', label: 'AI' },
    { cx: 200, cy: 180, r: 28, color: '#22d3ee', label: '' },
    { cx: 80, cy: 300, r: 12, color: '#ec4899', label: '' },
    { cx: 320, cy: 300, r: 14, color: '#f97316', label: '' },
  ]

  const edges = [
    [0, 5], [1, 5], [2, 5], [3, 5], [4, 5],
    [0, 1], [0, 2], [3, 6], [4, 7], [1, 3], [2, 4],
  ]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <defs>
          <radialGradient id="nGlow" cx="50%" cy="45%" r="50%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="200" cy="200" r="185" fill="url(#nGlow)" />

        {/* Edges */}
        {edges.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={nodes[a].cx} y1={nodes[a].cy}
            x2={nodes[b].cx} y2={nodes[b].cy}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1.2"
            animate={{ opacity: [0.04, 0.15, 0.04] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}

        {/* Animated pulse traveling along edges */}
        {edges.slice(0, 5).map(([a, b], i) => (
          <motion.circle
            key={`pulse-${i}`}
            r="3"
            fill={nodes[a].color}
            fillOpacity="0.6"
            animate={{
              cx: [nodes[a].cx, nodes[b].cx],
              cy: [nodes[a].cy, nodes[b].cy],
              opacity: [0, 0.7, 0],
            }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.6, ease: 'easeInOut' }}
          />
        ))}

        {/* Nodes */}
        {nodes.map((n, i) => (
          <motion.g
            key={i}
            animate={{ y: [0, i % 2 === 0 ? -5 : 5, 0] }}
            transition={{ duration: 3 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Glow ring */}
            <motion.circle
              cx={n.cx} cy={n.cy} r={n.r + 6}
              fill="none" stroke={n.color} strokeWidth="1"
              animate={{ opacity: [0.05, 0.2, 0.05], r: [n.r + 4, n.r + 10, n.r + 4] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.15 }}
            />
            {/* Node body */}
            <circle cx={n.cx} cy={n.cy} r={n.r} fill="rgba(10,22,40,0.85)" stroke={n.color} strokeWidth="1.5" strokeOpacity="0.5" />
            <circle cx={n.cx} cy={n.cy} r={n.r - 2} fill={n.color} fillOpacity="0.1" />
            {/* Label */}
            {n.label && (
              <text x={n.cx} y={n.cy + 4} textAnchor="middle" fill={n.color} fontSize="10" fontWeight="700" fontFamily="system-ui">{n.label}</text>
            )}
            {/* Center node: magnifying glass icon */}
            {i === 5 && (
              <g>
                <circle cx="196" cy="175" r="9" stroke="#22d3ee" strokeWidth="2" fill="none" />
                <line x1="203" y1="182" x2="210" y2="189" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" />
              </g>
            )}
          </motion.g>
        ))}

        {/* Match percentage labels floating */}
        <motion.g
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
        >
          <rect x="155" y="330" width="90" height="26" rx="13" fill="rgba(34,211,238,0.1)" stroke="rgba(34,211,238,0.25)" strokeWidth="1" />
          <text x="200" y="347" textAnchor="middle" fill="#67e8f9" fontSize="11" fontWeight="600" fontFamily="system-ui">5 Skills Found</text>
        </motion.g>
      </svg>
    </motion.div>
  )
}
