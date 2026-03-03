import { Row, Col, Typography, Button, Space } from 'antd'
import { motion } from 'motion/react'
import {
  ArrowDownOutlined,
  ScanOutlined,
  ThunderboltOutlined,
  SafetyOutlined,
  GlobalOutlined,
} from '@ant-design/icons'
import ResumeAnalysisIllustration from './illustrations/ResumeAnalysis'

const { Title, Paragraph, Text } = Typography

const metrics = [
  { value: '200+', label: 'Skills Tracked', icon: <ScanOutlined /> },
  { value: '<3s', label: 'Analysis Time', icon: <ThunderboltOutlined /> },
  { value: '100%', label: 'Private', icon: <SafetyOutlined /> },
  { value: '7', label: 'Skill Categories', icon: <GlobalOutlined /> },
]

export default function HeroSection() {
  return (
    <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: 72, paddingBottom: 40, overflow: 'hidden' }}>

      {/* Badge */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ marginBottom: 24, zIndex: 5 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '6px 18px', borderRadius: 99,
          background: 'linear-gradient(90deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))',
          border: '1px solid rgba(59,130,246,0.2)',
          backdropFilter: 'blur(8px)',
        }}>
          <motion.div
            style={{ width: 8, height: 8, borderRadius: 99, background: '#22c55e' }}
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <Text style={{ color: '#93c5fd', fontSize: 12, fontWeight: 600, letterSpacing: 0.5 }}>NEXT-GEN RESUME SCREENING</Text>
          <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 99, background: 'rgba(59,130,246,0.2)', color: '#bfdbfe', fontWeight: 700 }}>NEW</span>
        </div>
      </motion.div>

      {/* Title — no delay for fast LCP */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ zIndex: 5, textAlign: 'center', maxWidth: 800, padding: '0 16px' }}
      >
        <Title level={1} style={{ color: '#fff', fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: 900, lineHeight: 1.1, marginBottom: 24, letterSpacing: -1 }}>
          Screen Resumes{' '}
          <br />
          <span style={{ background: 'linear-gradient(90deg, #60a5fa, #a78bfa, #22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            with AI Precision
          </span>
        </Title>

        <Paragraph style={{ color: '#94a3b8', fontSize: 16, maxWidth: 600, margin: '0 auto 40px', lineHeight: 1.7 }}>
          Upload candidate resumes and match them against job descriptions using
          <Text style={{ color: '#93c5fd', fontWeight: 500 }}> TF-IDF similarity</Text>,
          <Text style={{ color: '#c4b5fd', fontWeight: 500 }}> skill extraction</Text>, and
          <Text style={{ color: '#67e8f9', fontWeight: 500 }}> intelligent scoring</Text> — all processed securely in your browser.
        </Paragraph>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Space size={16} style={{ marginBottom: 24 }}>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Button
                type="primary"
                size="large"
                href="#screening"
                icon={<ArrowDownOutlined />}
                style={{
                  height: 48, borderRadius: 16, fontWeight: 600, fontSize: 14,
                  background: 'linear-gradient(90deg, #2563eb, #3b82f6)',
                  border: 'none',
                  boxShadow: '0 8px 24px rgba(37,99,235,0.35)',
                  paddingInline: 32,
                }}
              >
                Start Screening
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Button
                size="large"
                href="#features"
                style={{
                  height: 48, borderRadius: 16, fontWeight: 500, fontSize: 14,
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: '#cbd5e1',
                  paddingInline: 32,
                }}
              >
                Explore Features
              </Button>
            </motion.div>
          </Space>
        </motion.div>
      </motion.div>

      {/* Hero Illustration */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.9 }}
        style={{ zIndex: 5, marginBottom: 20 }}
      >
        <ResumeAnalysisIllustration size={260} />
      </motion.div>

      {/* Metrics Row */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.7 }}
        style={{ zIndex: 5, width: '100%', maxWidth: 800, padding: '0 16px' }}
      >
        <div className="glass" style={{ padding: '20px 32px', borderRadius: 20 }}>
          <Row gutter={[24, 16]} justify="center" align="middle">
            {metrics.map((m, i) => (
              <Col key={i} xs={12} sm={6}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + i * 0.1 }}
                  style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center' }}
                >
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.15))',
                    border: '1px solid rgba(255,255,255,0.06)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#60a5fa', fontSize: 16,
                  }}>
                    {m.icon}
                  </div>
                  <div>
                    <div style={{ color: '#fff', fontSize: 18, fontWeight: 700, lineHeight: 1 }}>{m.value}</div>
                    <div style={{ color: '#64748b', fontSize: 10, fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: 1 }}>{m.label}</div>
                  </div>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>
      </motion.div>

    </section>
  )
}
