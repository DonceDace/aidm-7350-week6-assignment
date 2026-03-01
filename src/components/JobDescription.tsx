import { Card, Typography, Button, Tag, Space, Progress, Input } from 'antd'
import { motion } from 'motion/react'
import {
  FormOutlined,
  ExperimentOutlined,
  DeleteOutlined,
  FileTextOutlined,
} from '@ant-design/icons'

const { Title, Text } = Typography
const { TextArea } = Input

interface JobDescriptionProps {
  value: string
  onChange: (value: string) => void
}

const SAMPLE_JOB = `Senior Full Stack Developer

We are looking for an experienced Full Stack Developer to join our team.

Requirements:
- 5+ years of experience in web development
- Strong proficiency in React, TypeScript, and Node.js
- Experience with Python, Django or FastAPI
- Familiarity with cloud services (AWS, GCP, or Azure)
- Knowledge of databases: PostgreSQL, MongoDB, Redis
- Experience with Docker and CI/CD pipelines
- Strong problem-solving and communication skills
- Bachelor's degree in Computer Science or related field

Nice to have:
- Experience with machine learning or data science
- Knowledge of Kubernetes and microservices architecture
- Experience with GraphQL
- Agile/Scrum methodology experience`

export default function JobDescription({ value, onChange }: JobDescriptionProps) {
  const wordCount = value.split(/\s+/).filter(Boolean).length

  const quality = wordCount > 50 ? 'good' : wordCount > 20 ? 'mid' : 'low'
  const qualityColor = quality === 'good' ? '#22c55e' : quality === 'mid' ? '#f59e0b' : '#ef4444'
  const qualityLabel = quality === 'good' ? '✓ Good detail' : quality === 'mid' ? '◐ Add more' : '✗ Too short'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3 }}
      style={{ height: '100%' }}
    >
      <Card
        style={{
          height: '100%',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 20,
          backdropFilter: 'blur(16px)',
        }}
        styles={{ body: { padding: 24 } }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 14,
            background: 'linear-gradient(135deg, #8b5cf6, #a855f7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, color: '#fff',
            boxShadow: '0 6px 16px rgba(139,92,246,0.25)',
          }}>
            <FormOutlined />
          </div>
          <div style={{ flex: 1 }}>
            <Title level={5} style={{ color: '#fff', margin: 0, fontSize: 16 }}>Job Description</Title>
            <Text style={{ color: '#64748b', fontSize: 12 }}>Paste the target job requirements</Text>
          </div>
          <Tag color="purple" style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)', color: '#c4b5fd', borderRadius: 20, fontSize: 11, fontWeight: 600 }}>
            Step 2
          </Tag>
        </div>

        {/* Action buttons */}
        <Space size={8} style={{ marginBottom: 16 }}>
          <Button
            size="small"
            icon={<ExperimentOutlined />}
            onClick={() => onChange(SAMPLE_JOB)}
            style={{
              background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)',
              color: '#60a5fa', borderRadius: 10, fontSize: 12, fontWeight: 500,
            }}
          >
            Load Sample JD
          </Button>
          {value && (
            <Button
              size="small"
              icon={<DeleteOutlined />}
              onClick={() => onChange('')}
              danger
              style={{
                background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)',
                borderRadius: 10, fontSize: 12,
              }}
            >
              Clear
            </Button>
          )}
        </Space>

        {/* Textarea */}
        <TextArea
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="Paste the job description here...&#10;&#10;Include required skills, experience level, education requirements, etc."
          rows={10}
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 14,
            color: '#e2e8f0',
            fontSize: 13,
            lineHeight: 1.7,
            resize: 'vertical',
          }}
        />

        {/* Footer stats */}
        {value && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 14 }}
          >
            <Tag icon={<FileTextOutlined />} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: '#94a3b8', fontSize: 11, borderRadius: 8 }}>
              {wordCount} words
            </Tag>
            <Progress
              percent={Math.min(wordCount / 1.5, 100)}
              size="small"
              showInfo={false}
              strokeColor={qualityColor}
              trailColor="rgba(255,255,255,0.04)"
              style={{ flex: 1 }}
            />
            <Text style={{ color: qualityColor, fontSize: 10, fontWeight: 600 }}>{qualityLabel}</Text>
          </motion.div>
        )}
      </Card>
    </motion.div>
  )
}
