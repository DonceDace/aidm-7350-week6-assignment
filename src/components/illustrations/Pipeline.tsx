import { motion } from 'motion/react'

/** 4-step pipeline graphic used in How It Works section */
export default function PipelineIllustration({ size = 300 }: { size?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <defs>
          <radialGradient id="pGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="pipe1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <linearGradient id="pipe2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
          <linearGradient id="pipe3" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
          <linearGradient id="pipe4" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
        </defs>

        <circle cx="200" cy="200" r="185" fill="url(#pGlow)" />

        {/* Connecting flow lines */}
        <motion.path
          d="M130 130 C180 130, 180 200, 200 200 C220 200, 220 270, 270 270"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="2"
          strokeDasharray="6 8"
          fill="none"
          animate={{ strokeDashoffset: [0, -56] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
        <motion.path
          d="M130 130 C160 170, 170 180, 200 200"
          stroke="rgba(96,165,250,0.15)"
          strokeWidth="1.5"
          fill="none"
          animate={{ opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Node 1: Upload */}
        <motion.g
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <circle cx="100" cy="100" r="36" fill="rgba(10,22,40,0.8)" stroke="rgba(59,130,246,0.3)" strokeWidth="1.5" />
          <circle cx="100" cy="100" r="24" fill="url(#pipe1)" fillOpacity="0.15" />
          {/* Upload icon */}
          <path d="M92 106 L100 94 L108 106" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <line x1="100" y1="96" x2="100" y2="112" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="88" y1="112" x2="112" y2="112" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" />
        </motion.g>

        {/* Node 2: Parse */}
        <motion.g
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        >
          <circle cx="290" cy="110" r="36" fill="rgba(10,22,40,0.8)" stroke="rgba(139,92,246,0.3)" strokeWidth="1.5" />
          <circle cx="290" cy="110" r="24" fill="url(#pipe2)" fillOpacity="0.15" />
          {/* Document icon */}
          <rect x="278" y="96" width="18" height="24" rx="3" stroke="#a78bfa" strokeWidth="2" fill="none" />
          <line x1="283" y1="104" x2="291" y2="104" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="283" y1="109" x2="293" y2="109" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="283" y1="114" x2="289" y2="114" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" />
        </motion.g>

        {/* Node 3: Analyze */}
        <motion.g
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          <circle cx="110" cy="290" r="36" fill="rgba(10,22,40,0.8)" stroke="rgba(245,158,11,0.3)" strokeWidth="1.5" />
          <circle cx="110" cy="290" r="24" fill="url(#pipe3)" fillOpacity="0.15" />
          {/* Brain / cog icon */}
          <motion.g
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '110px 290px' }}
          >
            <circle cx="110" cy="290" r="13" stroke="#fbbf24" strokeWidth="2" fill="none" />
            {[0, 60, 120, 180, 240, 300].map(a => (
              <rect key={a} x="108" y="274" width="4" height="6" rx="2" fill="#fbbf24"
                style={{ transform: `rotate(${a}deg)`, transformOrigin: '110px 290px' }} />
            ))}
          </motion.g>
          <circle cx="110" cy="290" r="5" fill="#fbbf24" />
        </motion.g>

        {/* Node 4: Results */}
        <motion.g
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        >
          <circle cx="300" cy="290" r="36" fill="rgba(10,22,40,0.8)" stroke="rgba(16,185,129,0.3)" strokeWidth="1.5" />
          <circle cx="300" cy="290" r="24" fill="url(#pipe4)" fillOpacity="0.15" />
          {/* Checkmark */}
          <path d="M288 290 L296 298 L312 280" stroke="#34d399" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </motion.g>

        {/* Flow arrows */}
        <motion.g animate={{ opacity: [0.2, 0.7, 0.2] }} transition={{ duration: 2.5, repeat: Infinity }}>
          {/* 1 → 2 */}
          <line x1="140" y1="100" x2="250" y2="108" stroke="rgba(96,165,250,0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
          <polygon points="250,104 250,112 258,108" fill="rgba(96,165,250,0.4)" />
          {/* 2 → 3 */}
          <line x1="260" y1="140" x2="150" y2="260" stroke="rgba(167,139,250,0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
          <polygon points="152,256 148,264 158,262" fill="rgba(167,139,250,0.4)" />
          {/* 3 → 4 */}
          <line x1="150" y1="290" x2="260" y2="290" stroke="rgba(251,191,36,0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
          <polygon points="260,286 260,294 268,290" fill="rgba(251,191,36,0.4)" />
        </motion.g>

        {/* Decorative floating particles */}
        <motion.circle cx="200" cy="50" r="3" fill="rgba(96,165,250,0.3)"
          animate={{ y: [0, -8, 0], opacity: [0.15, 0.4, 0.15] }}
          transition={{ duration: 4, repeat: Infinity }} />
        <motion.circle cx="50" cy="200" r="2" fill="rgba(139,92,246,0.3)"
          animate={{ x: [0, 6, 0], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 3.5, repeat: Infinity }} />
        <motion.circle cx="350" cy="200" r="2.5" fill="rgba(34,211,238,0.25)"
          animate={{ x: [0, -5, 0], opacity: [0.1, 0.35, 0.1] }}
          transition={{ duration: 3, repeat: Infinity }} />
        <motion.circle cx="200" cy="360" r="2" fill="rgba(16,185,129,0.3)"
          animate={{ y: [0, 6, 0], opacity: [0.15, 0.4, 0.15] }}
          transition={{ duration: 3.2, repeat: Infinity }} />
      </svg>
    </motion.div>
  )
}
