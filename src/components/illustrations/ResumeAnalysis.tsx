import { motion } from 'motion/react'

/** Hero area SVG: a stylised resume document being scanned by a laser beam */
export default function ResumeAnalysisIllustration({ size = 340 }: { size?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        {/* Glow backdrop */}
        <defs>
          <radialGradient id="glow1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="docGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="scanGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
            <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="checkGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>

        <circle cx="200" cy="200" r="180" fill="url(#glow1)" />

        {/* Document shadow */}
        <rect x="108" y="75" width="190" height="260" rx="14" fill="rgba(0,0,0,0.3)" />

        {/* Main document */}
        <rect x="100" y="68" width="190" height="260" rx="14" fill="url(#docGrad)" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />

        {/* Folded corner */}
        <path d="M260 68 L290 98 L260 98 Z" fill="#1e3a5f" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

        {/* Text lines (simulated resume content) */}
        {/* Header block */}
        <rect x="128" y="100" width="100" height="8" rx="4" fill="rgba(96,165,250,0.5)" />
        <rect x="128" y="116" width="70" height="5" rx="2.5" fill="rgba(148,163,184,0.25)" />

        {/* Divider */}
        <line x1="128" y1="134" x2="264" y2="134" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

        {/* Section 1 */}
        <rect x="128" y="146" width="50" height="5" rx="2.5" fill="rgba(139,92,246,0.4)" />
        <rect x="128" y="159" width="136" height="4" rx="2" fill="rgba(148,163,184,0.15)" />
        <rect x="128" y="169" width="120" height="4" rx="2" fill="rgba(148,163,184,0.15)" />
        <rect x="128" y="179" width="130" height="4" rx="2" fill="rgba(148,163,184,0.15)" />

        {/* Section 2 */}
        <rect x="128" y="198" width="35" height="5" rx="2.5" fill="rgba(34,211,238,0.4)" />
        <rect x="128" y="211" width="136" height="4" rx="2" fill="rgba(148,163,184,0.15)" />
        <rect x="128" y="221" width="100" height="4" rx="2" fill="rgba(148,163,184,0.15)" />
        <rect x="128" y="231" width="125" height="4" rx="2" fill="rgba(148,163,184,0.15)" />

        {/* Skill tags */}
        <rect x="128" y="250" width="40" height="16" rx="8" fill="rgba(59,130,246,0.15)" stroke="rgba(59,130,246,0.3)" strokeWidth="0.8" />
        <rect x="175" y="250" width="50" height="16" rx="8" fill="rgba(139,92,246,0.15)" stroke="rgba(139,92,246,0.3)" strokeWidth="0.8" />
        <rect x="232" y="250" width="34" height="16" rx="8" fill="rgba(16,185,129,0.15)" stroke="rgba(16,185,129,0.3)" strokeWidth="0.8" />
        <rect x="128" y="272" width="46" height="16" rx="8" fill="rgba(245,158,11,0.15)" stroke="rgba(245,158,11,0.3)" strokeWidth="0.8" />
        <rect x="181" y="272" width="38" height="16" rx="8" fill="rgba(236,72,153,0.15)" stroke="rgba(236,72,153,0.3)" strokeWidth="0.8" />

        {/* Scanning beam (animated via CSS) */}
        <motion.rect
          x="95"
          width="200"
          height="3"
          rx="1.5"
          fill="url(#scanGrad)"
          animate={{ y: [90, 310, 90] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Side scan lines appear hint */}
        <motion.g animate={{ opacity: [0, 0.6, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}>
          <line x1="88" y1="120" x2="88" y2="290" stroke="rgba(96,165,250,0.15)" strokeWidth="1" strokeDasharray="4 6" />
          <line x1="298" y1="120" x2="298" y2="290" stroke="rgba(96,165,250,0.15)" strokeWidth="1" strokeDasharray="4 6" />
        </motion.g>

        {/* Checkmark badge */}
        <motion.g
          animate={{ scale: [0.9, 1.05, 0.9] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '310px 95px' }}
        >
          <circle cx="310" cy="95" r="22" fill="url(#checkGrad)" />
          <path d="M298 95 L306 103 L322 87" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </motion.g>

        {/* Score circle */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{ transformOrigin: '320px 260px' }}
        >
          <circle cx="320" cy="260" r="30" fill="rgba(10,22,40,0.9)" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
          <motion.circle
            cx="320" cy="260" r="24"
            stroke="#3b82f6" strokeWidth="3" fill="none"
            strokeDasharray="120 151"
            strokeLinecap="round"
            animate={{ strokeDashoffset: [151, 30, 151] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transform: 'rotate(-90deg)', transformOrigin: '320px 260px' }}
          />
          <text x="320" y="265" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="700" fontFamily="system-ui">87</text>
        </motion.g>

        {/* Decorative dots */}
        <circle cx="80" cy="140" r="3" fill="rgba(96,165,250,0.2)" />
        <circle cx="335" cy="180" r="2" fill="rgba(139,92,246,0.25)" />
        <circle cx="75" cy="280" r="2.5" fill="rgba(34,211,238,0.2)" />
        <circle cx="340" cy="310" r="3" fill="rgba(245,158,11,0.15)" />
      </svg>
    </motion.div>
  )
}
