import { Row, Col, Card, Typography, Tag } from 'antd'
import { motion } from 'motion/react'
import {
  RobotOutlined,
  FileSearchOutlined,
  AimOutlined,
  SafetyOutlined,
  ThunderboltOutlined,
  BarChartOutlined,
  CodeOutlined,
  ExperimentOutlined,
  GlobalOutlined,
} from '@ant-design/icons'
const { Title, Paragraph, Text } = Typography

const features = [
  { icon: <RobotOutlined />, title: 'AI-Powered Analysis', desc: 'TF-IDF similarity scoring with intelligent keyword extraction and semantic matching', gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' },
  { icon: <FileSearchOutlined />, title: 'Smart PDF Parsing', desc: 'Extracts text from PDF resumes automatically with multi-page support', gradient: 'linear-gradient(135deg, #3b82f6, #06b6d4)' },
  { icon: <AimOutlined />, title: 'Skill Matching', desc: '200+ skills database across 7 categories with gap analysis', gradient: 'linear-gradient(135deg, #10b981, #22c55e)' },
  { icon: <SafetyOutlined />, title: '100% Private', desc: 'All processing happens locally in your browser. No data leaves your device', gradient: 'linear-gradient(135deg, #f59e0b, #f97316)' },
  { icon: <ThunderboltOutlined />, title: 'Instant Results', desc: 'Analyze dozens of resumes in seconds with real-time scoring feedback', gradient: 'linear-gradient(135deg, #ec4899, #f43f5e)' },
  { icon: <BarChartOutlined />, title: 'Detailed Reports', desc: 'Comprehensive breakdown: similarity, skills, experience, education scores', gradient: 'linear-gradient(135deg, #0ea5e9, #2563eb)' },
]

const techStack = [
  { icon: <CodeOutlined />, label: 'React 19' },
  { icon: <ThunderboltOutlined />, label: 'Motion' },
  { icon: <ExperimentOutlined />, label: 'TF-IDF' },
  { icon: <GlobalOutlined />, label: 'Browser-Native' },
]

export default function FeatureShowcase() {
  return (
    <section style={{ padding: '48px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center', marginBottom: 36 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Tag style={{
              background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)',
              color: '#93c5fd', fontSize: 11, fontWeight: 700, borderRadius: 20, padding: '4px 16px', marginBottom: 16,
            }}>
              <ThunderboltOutlined /> WHY CHOOSE RESUMEAI
            </Tag>
          </motion.div>
          <Title level={2} style={{ color: '#fff', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, marginBottom: 12, letterSpacing: -0.5 }}>
            Powerful Features for{' '}
            <span style={{ background: 'linear-gradient(90deg, #60a5fa, #a78bfa, #22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Smart Hiring</span>
          </Title>
          <Paragraph style={{ color: '#94a3b8', fontSize: 15, maxWidth: 500, margin: '0 auto' }}>
            Everything you need to streamline your recruitment process, powered by cutting-edge NLP technology
          </Paragraph>
        </motion.div>

        {/* Feature Grid */}
        <Row gutter={[20, 20]}>
          {features.map((feature, i) => (
            <Col key={feature.title} xs={24} sm={12} lg={8}>
              <motion.div
                initial={{ opacity: 0, y: 60, scale: 0.88, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -10, scale: 1.04, transition: { duration: 0.3 } }}
                style={{ height: '100%' }}
              >
                <Card
                  hoverable
                  style={{
                    height: '100%',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 20,
                    backdropFilter: 'blur(16px)',
                  }}
                  styles={{ body: { padding: 24 } }}
                >
                  <div style={{
                    width: 48, height: 48, borderRadius: 14,
                    background: feature.gradient,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 22, color: '#fff', marginBottom: 20,
                    boxShadow: `0 8px 20px ${feature.gradient.includes('8b5cf6') ? 'rgba(139,92,246,0.25)' : 'rgba(59,130,246,0.2)'}`,
                  }}>
                    {feature.icon}
                  </div>
                  <Title level={5} style={{ color: '#fff', marginBottom: 8, fontSize: 15, fontWeight: 700 }}>
                    {feature.title}
                  </Title>
                  <Paragraph style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.7, marginBottom: 0 }}>
                    {feature.desc}
                  </Paragraph>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass"
          style={{ marginTop: 48, padding: '20px 32px', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: 24 }}
        >
          <Text style={{ color: '#64748b', fontSize: 11, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: 1 }}>Built with</Text>
          <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.1)' }} />
          {techStack.map((tech, i) => (
            <motion.div
              key={tech.label}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.1 }}
              style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#cbd5e1', fontSize: 13, fontWeight: 500 }}
            >
              <div style={{
                width: 28, height: 28, borderRadius: 8,
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#60a5fa', fontSize: 13,
              }}>
                {tech.icon}
              </div>
              {tech.label}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
