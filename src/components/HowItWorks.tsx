import { Row, Col, Card, Typography, Tag } from 'antd'
import { motion, useScroll, useTransform } from 'motion/react'
import {
  UploadOutlined,
  FileSearchOutlined,
  BarChartOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons'
import { useRef } from 'react'
import PipelineIllustration from './illustrations/Pipeline'

const { Title, Paragraph } = Typography

const steps = [
  { icon: <UploadOutlined />, title: 'Upload Resumes', desc: 'Drag & drop PDF or TXT resumes. Our parser extracts text from every page.', gradient: 'linear-gradient(135deg, #3b82f6, #06b6d4)', borderColor: 'rgba(59,130,246,0.25)' },
  { icon: <FileSearchOutlined />, title: 'Add Job Description', desc: 'Paste the target position requirements, skills, and qualifications.', gradient: 'linear-gradient(135deg, #8b5cf6, #a855f7)', borderColor: 'rgba(139,92,246,0.25)' },
  { icon: <BarChartOutlined />, title: 'AI Analysis', desc: 'TF-IDF scoring, skill matching, experience & education evaluation run instantly.', gradient: 'linear-gradient(135deg, #f59e0b, #f97316)', borderColor: 'rgba(245,158,11,0.25)' },
  { icon: <CheckCircleOutlined />, title: 'Get Results', desc: 'View ranked candidates with detailed scores, matched skills, and gap analysis.', gradient: 'linear-gradient(135deg, #10b981, #22c55e)', borderColor: 'rgba(16,185,129,0.25)' },
]

export default function HowItWorks() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section ref={sectionRef} style={{ padding: '48px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Parallax bg accent */}
      <motion.div style={{ position: 'absolute', bottom: 0, right: '25%', width: 600, height: 300, pointerEvents: 'none', y: bgY }}>
        <div style={{ width: '100%', height: '100%', background: 'radial-gradient(ellipse, rgba(139,92,246,0.06), transparent 70%)', filter: 'blur(80px)' }} />
      </motion.div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center', marginBottom: 36 }}
        >
          <Tag style={{
            background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)',
            color: '#c4b5fd', fontSize: 11, fontWeight: 700, borderRadius: 20, padding: '4px 16px', marginBottom: 16,
          }}>
            STEP BY STEP
          </Tag>
          <Title level={2} style={{ color: '#fff', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, marginBottom: 12 }}>
            How It{' '}
            <span style={{ background: 'linear-gradient(90deg, #a78bfa, #22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Works</span>
          </Title>
          <Paragraph style={{ color: '#94a3b8', fontSize: 15, maxWidth: 450, margin: '0 auto' }}>
            Four simple steps to find the perfect candidate
          </Paragraph>
        </motion.div>

        {/* Pipeline Illustration */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}
        >
          <PipelineIllustration size={250} />
        </motion.div>

        {/* Steps Grid */}
        <Row gutter={[20, 20]}>
          {steps.map((step, i) => (
            <Col key={step.title} xs={24} sm={12} lg={6}>
              <motion.div
                initial={{ opacity: 0, y: 70, rotate: -3, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, rotate: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ delay: i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -10, scale: 1.04, transition: { duration: 0.3 } }}
                style={{ height: '100%' }}
              >
                <Card
                  hoverable
                  style={{
                    height: '100%',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderTop: `2px solid ${step.borderColor}`,
                    borderRadius: 20,
                    backdropFilter: 'blur(16px)',
                  }}
                  styles={{ body: { padding: 24 } }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                    <span style={{ fontSize: 28, fontWeight: 900, background: step.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', opacity: 0.35 }}>
                      0{i + 1}
                    </span>
                    <div style={{
                      width: 48, height: 48, borderRadius: 14, background: step.gradient,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 20, color: '#fff', boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
                    }}>
                      {step.icon}
                    </div>
                  </div>
                  <Title level={5} style={{ color: '#fff', marginBottom: 8, fontSize: 15, fontWeight: 700 }}>{step.title}</Title>
                  <Paragraph style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.7, marginBottom: 0 }}>{step.desc}</Paragraph>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  )
}
