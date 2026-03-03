import { Button } from 'antd'
import { motion } from 'motion/react'
import {
  ThunderboltOutlined,
  LoadingOutlined,
  PlayCircleOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons'

interface AnalyzeButtonProps {
  onClick: () => void
  disabled: boolean
  isProcessing: boolean
  fileCount: number
}

export default function AnalyzeButton({ onClick, disabled, isProcessing, fileCount }: AnalyzeButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}
    >
      {/* Connecting line */}
      <div style={{ width: 1, height: 32, background: 'linear-gradient(to bottom, rgba(255,255,255,0.08), rgba(255,255,255,0.03))' }} />

      <div style={{ position: 'relative' }}>
        {/* Pulse rings */}
        {!disabled && !isProcessing && (
          <>
            <motion.div
              style={{ position: 'absolute', inset: -12, borderRadius: 24, border: '1px solid rgba(59,130,246,0.15)' }}
              animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
            <motion.div
              style={{ position: 'absolute', inset: -24, borderRadius: 28, border: '1px solid rgba(59,130,246,0.08)' }}
              animate={{ scale: [1, 1.05, 1], opacity: [0.15, 0.35, 0.15] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            />
          </>
        )}

        {/* Glow */}
        {!disabled && (
          <div style={{
            position: 'absolute', inset: -16,
            background: 'linear-gradient(90deg, rgba(37,99,235,0.25), rgba(59,130,246,0.35), rgba(139,92,246,0.25))',
            borderRadius: 28, filter: 'blur(24px)', opacity: 0.5,
          }} />
        )}

        <motion.div
          whileHover={!disabled ? { scale: 1.04 } : {}}
          whileTap={!disabled ? { scale: 0.96 } : {}}
        >
          <Button
            type="primary"
            size="large"
            onClick={onClick}
            disabled={disabled || isProcessing}
            loading={isProcessing}
            icon={isProcessing ? <LoadingOutlined /> : disabled ? <PlayCircleOutlined /> : <ThunderboltOutlined />}
            style={{
              position: 'relative',
              height: 56,
              paddingInline: 48,
              borderRadius: 18,
              fontSize: 15,
              fontWeight: 700,
              background: disabled ? 'rgba(30,41,59,0.7)' : 'linear-gradient(90deg, #2563eb, #3b82f6, #2563eb)',
              backgroundSize: '200% 100%',
              border: disabled ? '1px solid rgba(51,65,85,0.5)' : '1px solid rgba(96,165,250,0.3)',
              boxShadow: disabled ? 'none' : '0 8px 24px rgba(37,99,235,0.35)',
              color: disabled ? '#64748b' : '#fff',
              cursor: disabled ? 'not-allowed' : 'pointer',
              transition: 'all 0.5s ease',
            }}
          >
            <span style={{ position: 'relative', zIndex: 2 }}>
              {isProcessing
                ? `Analyzing ${fileCount} resume${fileCount > 1 ? 's' : ''}...`
                : disabled
                ? 'Upload resumes & add job description'
                : `Analysis ${fileCount} Resume${fileCount > 1 ? 's' : ''}`
              }
            </span>
            {!disabled && !isProcessing && <ArrowRightOutlined style={{ marginLeft: 8 }} />}
          </Button>
        </motion.div>
      </div>

      {/* Status text */}
      {!disabled && !isProcessing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ color: '#64748b', fontSize: 11, fontWeight: 500 }}
        >
          Ready to analyze • {fileCount} file{fileCount > 1 ? 's' : ''} loaded
        </motion.div>
      )}
    </motion.div>
  )
}
