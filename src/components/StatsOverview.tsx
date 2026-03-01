import { Row, Col, Card, Typography, Space } from 'antd'
import { motion } from 'motion/react'
import {
  TeamOutlined,
  BarChartOutlined,
  TrophyOutlined,
  BulbOutlined,
  RiseOutlined,
  DashboardOutlined,
} from '@ant-design/icons'
import type { AnalysisResult } from '../types'

const { Title, Text } = Typography

interface StatsOverviewProps {
  results: AnalysisResult[]
}

export default function StatsOverview({ results }: StatsOverviewProps) {
  if (results.length === 0) return null

  const avgScore = Math.round(results.reduce((s, r) => s + r.overallScore, 0) / results.length)
  const topScore = Math.max(...results.map(r => r.overallScore))
  const qualified = results.filter(r => r.overallScore >= 60).length
  const avgSkills = Math.round(results.reduce((s, r) => s + r.matchedSkills.length, 0) / results.length)

  const stats = [
    { label: 'Candidates', value: results.length.toString(), icon: <TeamOutlined />, gradient: 'linear-gradient(135deg, #3b82f6, #06b6d4)', trend: `${results.length} analyzed` },
    { label: 'Avg Score', value: `${avgScore}%`, icon: <BarChartOutlined />, gradient: 'linear-gradient(135deg, #8b5cf6, #a855f7)', trend: avgScore >= 60 ? 'Good avg' : 'Below avg' },
    { label: 'Top Score', value: `${topScore}%`, icon: <TrophyOutlined />, gradient: 'linear-gradient(135deg, #f59e0b, #f97316)', trend: topScore >= 80 ? 'Excellent' : 'Moderate' },
    { label: 'Qualified', value: `${qualified}/${results.length}`, icon: <BulbOutlined />, gradient: 'linear-gradient(135deg, #10b981, #22c55e)', trend: `${Math.round(qualified / results.length * 100)}% pass` },
    { label: 'Avg Skills', value: `${avgSkills}`, icon: <RiseOutlined />, gradient: 'linear-gradient(135deg, #ec4899, #f43f5e)', trend: 'matched/resume' },
    { label: 'Analysis', value: 'TF-IDF', icon: <DashboardOutlined />, gradient: 'linear-gradient(135deg, #6366f1, #3b82f6)', trend: 'Cosine similarity' },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      {/* Section header */}
      <Space size={12} style={{ marginBottom: 20 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 12,
          background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, color: '#fff',
          boxShadow: '0 4px 12px rgba(59,130,246,0.25)',
        }}>
          <BarChartOutlined />
        </div>
        <div>
          <Title level={5} style={{ color: '#fff', margin: 0, fontSize: 16 }}>Screening Overview</Title>
          <Text style={{ color: '#64748b', fontSize: 12 }}>Summary statistics for all candidates</Text>
        </div>
      </Space>

      <Row gutter={[12, 12]}>
        {stats.map((stat, i) => (
          <Col key={stat.label} xs={12} sm={8} xl={4}>
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <Card
                hoverable
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 16,
                  textAlign: 'center',
                  backdropFilter: 'blur(12px)',
                }}
                styles={{ body: { padding: 16 } }}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  background: stat.gradient,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 16, color: '#fff', margin: '0 auto 12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                }}>
                  {stat.icon}
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.08 + 0.3, type: 'spring', stiffness: 200 }}
                >
                  <div style={{ color: '#fff', fontSize: 22, fontWeight: 800 }}>{stat.value}</div>
                </motion.div>
                <div style={{ color: '#64748b', fontSize: 10, fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: 1, marginTop: 4 }}>{stat.label}</div>
                <div style={{ color: '#475569', fontSize: 9, marginTop: 4 }}>{stat.trend}</div>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    </motion.div>
  )
}
