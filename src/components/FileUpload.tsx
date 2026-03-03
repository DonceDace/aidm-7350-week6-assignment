import { useCallback, useRef, useState } from 'react'
import { Card, Typography, Upload as AntUpload, Tag, Progress, Button, Space } from 'antd'
import { motion, AnimatePresence } from 'motion/react'
import {
  UploadOutlined,
  FileTextOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  LoadingOutlined,
  CloudUploadOutlined,
  PaperClipOutlined,
} from '@ant-design/icons'
import type { ResumeFile } from '../types'
import { extractTextFromPDF } from '../utils/pdfParser'

const { Title, Text, Paragraph } = Typography
const { Dragger } = AntUpload

interface FileUploadProps {
  files: ResumeFile[]
  onFilesChange: (files: ResumeFile[]) => void
  isProcessing: boolean
}

export default function FileUpload({ files, onFilesChange, isProcessing }: FileUploadProps) {
  const [uploadingFiles, setUploadingFiles] = useState<Set<string>>(new Set())
  const filesRef = useRef(files)
  filesRef.current = files

  const processFile = useCallback(async (file: File) => {
    const id = crypto.randomUUID()
    setUploadingFiles(prev => new Set(prev).add(id))
    try {
      let text = ''
      if (file.type === 'application/pdf') {
        text = await extractTextFromPDF(file)
      } else {
        text = await file.text()
      }
      const resumeFile: ResumeFile = { id, name: file.name, text, size: file.size, uploadedAt: new Date() }
      onFilesChange([...filesRef.current, resumeFile])
    } catch (err) {
      console.error('Error processing file:', err)
    } finally {
      setUploadingFiles(prev => { const next = new Set(prev); next.delete(id); return next })
    }
  }, [onFilesChange])

  const removeFile = useCallback((id: string) => {
    onFilesChange(files.filter(f => f.id !== id))
  }, [files, onFilesChange])

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
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
            background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, color: '#fff',
            boxShadow: '0 6px 16px rgba(59,130,246,0.25)',
          }}>
            <UploadOutlined />
          </div>
          <div style={{ flex: 1 }}>
            <Title level={5} style={{ color: '#fff', margin: 0, fontSize: 16 }}>Upload Resumes</Title>
            <Text style={{ color: '#64748b', fontSize: 12 }}>PDF or TXT format • Multi-file support</Text>
          </div>
          <Tag color="blue" style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', color: '#93c5fd', borderRadius: 20, fontSize: 11, fontWeight: 600 }}>
            Step 1
          </Tag>
        </div>

        {/* Dragger */}
        <Dragger
          multiple
          accept=".pdf,.txt"
          showUploadList={false}
          beforeUpload={(file) => {
            processFile(file as unknown as File)
            return false
          }}
          disabled={isProcessing}
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '2px dashed rgba(59,130,246,0.3)',
            borderRadius: 16,
            padding: '24px 0',
          }}
        >
          <p style={{ marginBottom: 8 }}>
            <CloudUploadOutlined style={{ fontSize: 40, color: '#60a5fa' }} />
          </p>
          <Paragraph style={{ color: '#fff', fontSize: 15, fontWeight: 500, marginBottom: 4 }}>
            Drag & drop resumes here
          </Paragraph>
          <Paragraph style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>
            or <span style={{ color: '#60a5fa', textDecoration: 'underline' }}>browse files</span>
          </Paragraph>
          <Space size={12} style={{ fontSize: 11, color: '#64748b' }}>
            <span><FileTextOutlined /> .pdf</span>
            <span>•</span>
            <span><FileTextOutlined /> .txt</span>
            <span>•</span>
            <span>Max 10MB</span>
          </Space>
        </Dragger>

        {/* File list */}
        <AnimatePresence>
          {(files.length > 0 || uploadingFiles.size > 0) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ marginTop: 16 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <Text style={{ color: '#cbd5e1', fontSize: 12, fontWeight: 600 }}>
                  <PaperClipOutlined style={{ marginRight: 4 }} /> {files.length} file{files.length !== 1 ? 's' : ''} ready
                </Text>
                <Progress percent={100} size="small" style={{ width: 80 }} showInfo={false} strokeColor={{ from: '#10b981', to: '#22c55e' }} />
              </div>
              {files.map((file, idx) => (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: idx * 0.05 }}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '10px 14px', borderRadius: 12, marginBottom: 8,
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0, flex: 1 }}>
                    <div style={{
                      width: 34, height: 34, borderRadius: 8,
                      background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(59,130,246,0.05))',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: '1px solid rgba(59,130,246,0.15)', flexShrink: 0,
                    }}>
                      <FileTextOutlined style={{ color: '#60a5fa', fontSize: 14 }} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ color: '#fff', fontSize: 13, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</div>
                      <div style={{ color: '#64748b', fontSize: 10 }}>{formatSize(file.size)} • {file.text.split(/\s+/).length} words</div>
                    </div>
                  </div>
                  <Space size={8}>
                    <Tag color="green" style={{ fontSize: 10, borderRadius: 20, margin: 0 }} icon={<CheckCircleOutlined />}>Parsed</Tag>
                    <Button
                      type="text"
                      size="small"
                      danger
                      icon={<DeleteOutlined style={{ fontSize: 12 }} />}
                      onClick={() => removeFile(file.id)}
                      disabled={isProcessing}
                      style={{ opacity: 0.6 }}
                    />
                  </Space>
                </motion.div>
              ))}
              {uploadingFiles.size > 0 && (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 14px', borderRadius: 12,
                  background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)',
                }}>
                  <LoadingOutlined style={{ color: '#60a5fa' }} spin />
                  <Text style={{ color: '#93c5fd', fontSize: 12, fontWeight: 500 }}>Processing files...</Text>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  )
}
