import { useState } from 'react'
import { Card, Progress, Tag, Typography, Space, Button, Flex } from 'antd'
import { motion, AnimatePresence } from 'motion/react'
import {
  StarOutlined,
  RiseOutlined,
  ReadOutlined,
  AimOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  CrownOutlined,
  TrophyOutlined,
  NumberOutlined,
} from '@ant-design/icons'
import type { AnalysisResult } from '../types'

const { Title, Text, Paragraph } = Typography

interface ResultsCardProps {
  result: AnalysisResult
  rank: number
  delay?: number
}

function getScoreColor(s: number) {
  if (s >= 80) return '#22c55e'
  if (s >= 60) return '#3b82f6'
  if (s >= 40) return '#f59e0b'
  return '#ef4444'
}

function getRankInfo(r: number) {
  if (r === 1) return { icon: <TrophyOutlined style={{ color: '#f59e0b' }} />, label: '1st Place', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.3)' }
  if (r === 2) return { icon: <TrophyOutlined style={{ color: '#94a3b8' }} />, label: '2nd Place', color: '#94a3b8', bg: 'rgba(148,163,184,0.12)', border: 'rgba(148,163,184,0.3)' }
  if (r === 3) return { icon: <TrophyOutlined style={{ color: '#d97706' }} />, label: '3rd Place', color: '#d97706', bg: 'rgba(217,119,6,0.12)', border: 'rgba(217,119,6,0.3)' }
  return { icon: <NumberOutlined style={{ color: '#64748b' }} />, label: `Rank ${r}`, color: '#64748b', bg: 'rgba(100,116,139,0.08)', border: 'rgba(100,116,139,0.2)' }
}

export default function ResultsCard({ result, rank, delay = 0 }: ResultsCardProps) {
  const [expanded, setExpanded] = useState(false)
  const badge = getRankInfo(rank)
  const scoreColor = getScoreColor(result.overallScore)

  const scoreItems = [
    { label: 'Content Similarity', key: 'similarityScore' as const, icon: <AimOutlined /> },
    { label: 'Skills Match', key: 'skillsScore' as const, icon: <RiseOutlined /> },
    { label: 'Experience', key: 'experienceScore' as const, icon: <StarOutlined /> },
    { label: 'Education', key: 'educationScore' as const, icon: <ReadOutlined /> },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: delay * 0.1 }}
    >
      <Card
        hoverable
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: rank === 1 ? '1px solid rgba(245,158,11,0.2)' : '1px solid rgba(255,255,255,0.08)',
          borderRadius: 20,
          backdropFilter: 'blur(16px)',
          position: 'relative',
          overflow: 'visible',
        }}
        styles={{ body: { padding: 24 } }}
      >
        {/* Rank badge */}
        <div style={{ position: 'absolute', top: -10, right: 16, zIndex: 5 }}>
          <Tag style={{
            background: badge.bg, border: `1px solid ${badge.border}`,
            color: badge.color, fontWeight: 700, fontSize: 11, borderRadius: 20,
            padding: '2px 12px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          }}>
            {rank <= 3 && <CrownOutlined style={{ marginRight: 4 }} />}
            {badge.icon} {badge.label}
          </Tag>
        </div>

        {/* Header: Score ring + name */}
        <div style={{ display: 'flex', gap: 20, marginBottom: 20, alignItems: 'flex-start' }}>
          <div style={{ position: 'relative' }}>
            <Progress
              type="circle"
              percent={result.overallScore}
              size={80}
              strokeColor={scoreColor}
              trailColor="rgba(255,255,255,0.06)"
              format={(p) => <span style={{ color: '#fff', fontWeight: 800, fontSize: 20 }}>{p}</span>}
              strokeWidth={8}
            />
          </div>
          <div style={{ flex: 1, minWidth: 0, paddingTop: 4 }}>
            <Title level={5} style={{ color: '#fff', margin: 0, fontSize: 15, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {result.resumeName}
            </Title>
            <Paragraph style={{ color: '#94a3b8', fontSize: 12, lineHeight: 1.5, marginBottom: 8, marginTop: 4 }} ellipsis={{ rows: 2 }}>
              {result.summary}
            </Paragraph>
            <Space size={4}>
              <Tag color="green" style={{ fontSize: 10, borderRadius: 20, margin: 0 }}>{result.matchedSkills.length} skills matched</Tag>
              <Tag color="red" style={{ fontSize: 10, borderRadius: 20, margin: 0, opacity: 0.7 }}>{result.missingSkills.length} gaps</Tag>
            </Space>
          </div>
        </div>

        {/* Score bars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 12 }}>
          {scoreItems.map((item) => {
            const score = result[item.key]
            return (
              <div key={item.key}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <Space size={6}>
                    <span style={{ color: '#64748b', fontSize: 13 }}>{item.icon}</span>
                    <Text style={{ color: '#cbd5e1', fontSize: 12, fontWeight: 500 }}>{item.label}</Text>
                  </Space>
                  <Text style={{ color: '#fff', fontSize: 12, fontWeight: 700 }}>{score}%</Text>
                </div>
                <Progress
                  percent={score}
                  size="small"
                  showInfo={false}
                  strokeColor={getScoreColor(score)}
                  trailColor="rgba(255,255,255,0.04)"
                />
              </div>
            )
          })}
        </div>

        {/* Expand button */}
        <Button
          type="text"
          block
          onClick={() => setExpanded(!expanded)}
          icon={expanded ? <CaretUpOutlined /> : <CaretDownOutlined />}
          style={{ color: '#60a5fa', fontSize: 12, fontWeight: 500, borderRadius: 12, border: '1px solid transparent', marginTop: 4 }}
          className="expand-skills-btn"
        >
          {expanded ? 'Hide Details' : 'View Skills Breakdown'}
        </Button>

        {/* Expanded skills */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)', margin: '12px 0' }} />

              {result.matchedSkills.length > 0 && (
                <div style={{ marginBottom: 12 }}>
                  <Space size={4} style={{ marginBottom: 8 }}>
                    <CheckCircleOutlined style={{ color: '#22c55e' }} />
                    <Text style={{ color: '#22c55e', fontSize: 12, fontWeight: 600 }}>Matched Skills</Text>
                    <Tag color="green" style={{ fontSize: 10, borderRadius: 20, margin: 0 }}>{result.matchedSkills.length}</Tag>
                  </Space>
                  <Flex wrap gap={6}>
                    {result.matchedSkills.map(skill => (
                      <Tag key={skill} style={{
                        background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)',
                        color: '#86efac', fontSize: 11, borderRadius: 20, fontWeight: 500,
                      }}>{skill}</Tag>
                    ))}
                  </Flex>
                </div>
              )}

              {result.missingSkills.length > 0 && (
                <div>
                  <Space size={4} style={{ marginBottom: 8 }}>
                    <CloseCircleOutlined style={{ color: '#ef4444' }} />
                    <Text style={{ color: '#ef4444', fontSize: 12, fontWeight: 600 }}>Missing Skills</Text>
                    <Tag color="red" style={{ fontSize: 10, borderRadius: 20, margin: 0 }}>{result.missingSkills.length}</Tag>
                  </Space>
                  <Flex wrap gap={6}>
                    {result.missingSkills.map(skill => (
                      <Tag key={skill} style={{
                        background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)',
                        color: '#fca5a5', fontSize: 11, borderRadius: 20, fontWeight: 500,
                      }}>{skill}</Tag>
                    ))}
                  </Flex>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  )
}
