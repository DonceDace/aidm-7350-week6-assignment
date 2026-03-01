import { Card, Typography, Button, Space, Tag } from 'antd'
import { motion, AnimatePresence } from 'motion/react'
import {
  HistoryOutlined,
  DeleteOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
  RightOutlined,
} from '@ant-design/icons'
import type { AnalysisHistory } from '../types'

const { Title, Text } = Typography

interface HistoryPanelProps {
  history: AnalysisHistory[]
  onClear: () => void
  onSelect: (item: AnalysisHistory) => void
}

export default function HistoryPanel({ history, onClear, onSelect }: HistoryPanelProps) {
  if (history.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <Card
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 20,
          backdropFilter: 'blur(16px)',
        }}
        styles={{ body: { padding: 24 } }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <Space size={12}>
            <div style={{
              width: 32, height: 32, borderRadius: 10,
              background: 'rgba(59,130,246,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#60a5fa', fontSize: 14,
            }}>
              <HistoryOutlined />
            </div>
            <div>
              <Title level={5} style={{ color: '#fff', margin: 0, fontSize: 15 }}>Analysis History</Title>
              <Text style={{ color: '#64748b', fontSize: 11 }}>{history.length} previous analyses</Text>
            </div>
          </Space>
          <Button
            type="text"
            danger
            size="small"
            icon={<DeleteOutlined />}
            onClick={onClear}
            style={{ fontSize: 12 }}
          >
            Clear All
          </Button>
        </div>

        <div style={{ maxHeight: 240, overflowY: 'auto' }}>
          <AnimatePresence>
            {history.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
              >
                <div
                  onClick={() => onSelect(item)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '10px 14px', borderRadius: 12, marginBottom: 8,
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                    cursor: 'pointer', transition: 'all 0.2s',
                  }}
                  className="history-item"
                >
                  <Space size={10}>
                    <FileTextOutlined style={{ color: 'rgba(96,165,250,0.6)', fontSize: 14 }} />
                    <div>
                      <Text style={{ color: '#fff', fontSize: 12, fontWeight: 500 }}>
                        {item.results.length} resume{item.results.length > 1 ? 's' : ''} analyzed
                      </Text>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                        <ClockCircleOutlined style={{ color: '#64748b', fontSize: 10 }} />
                        <Text style={{ color: '#64748b', fontSize: 10 }}>{new Date(item.analyzedAt).toLocaleString()}</Text>
                      </div>
                    </div>
                  </Space>
                  <Space size={8}>
                    <Tag color="blue" style={{ fontSize: 11, borderRadius: 20, margin: 0, fontWeight: 600 }}>
                      Top: {Math.max(...item.results.map(r => r.overallScore))}%
                    </Tag>
                    <RightOutlined style={{ color: '#64748b', fontSize: 10 }} />
                  </Space>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </Card>
    </motion.div>
  )
}
