import { useState, useCallback, useRef, lazy, Suspense } from 'react'
import { Layout, Row, Col, Typography, ConfigProvider, theme, Space, Segmented, Tag, FloatButton, Divider } from 'antd'
import { motion, AnimatePresence } from 'motion/react'
import {
  AppstoreOutlined,
  UnorderedListOutlined,
  RocketOutlined,
} from '@ant-design/icons'

// Lazy load heavy components to improve LCP
const Background3D = lazy(() => import('./components/Background3D'))
const FeatureShowcase = lazy(() => import('./components/FeatureShowcase'))
const HowItWorks = lazy(() => import('./components/HowItWorks'))

import Header from './components/Header'
import HeroSection from './components/HeroSection'
import ScrollProgress from './components/ScrollProgress'
import ScrollDecorations from './components/ScrollDecorations'
import ScrollReveal from './components/ScrollReveal'
import FileUpload from './components/FileUpload'
import JobDescription from './components/JobDescription'
import AnalyzeButton from './components/AnalyzeButton'
import ResultsCard from './components/ResultsCard'
import StatsOverview from './components/StatsOverview'
import HistoryPanel from './components/HistoryPanel'

import type { ResumeFile, AnalysisResult, AnalysisHistory } from './types'
import { analyzeResume } from './utils/analyzer'

const { Content, Footer } = Layout
const { Title, Paragraph, Text } = Typography

function loadHistory(): AnalysisHistory[] {
  try {
    const stored = localStorage.getItem('resume-screening-history')
    return stored ? JSON.parse(stored) : []
  } catch { return [] }
}

function saveHistory(history: AnalysisHistory[]) {
  localStorage.setItem('resume-screening-history', JSON.stringify(history))
}

export default function App() {
  const [files, setFiles] = useState<ResumeFile[]>([])
  const [jobDescription, setJobDescription] = useState('')
  const [results, setResults] = useState<AnalysisResult[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [history, setHistory] = useState<AnalysisHistory[]>(loadHistory)
  const [sortBy, setSortBy] = useState<'score' | 'name'>('score')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const resultsRef = useRef<HTMLDivElement>(null)

  const canAnalyze = files.length > 0 && jobDescription.trim().length > 10

  const handleAnalyze = useCallback(async () => {
    if (!canAnalyze) return
    setIsProcessing(true)
    setResults([])

    await new Promise(resolve => setTimeout(resolve, 500))
    const newResults: AnalysisResult[] = []
    for (const file of files) {
      const result = analyzeResume(file.text, file.name, jobDescription)
      newResults.push(result)
      await new Promise(resolve => setTimeout(resolve, 200))
    }

    newResults.sort((a, b) => b.overallScore - a.overallScore)
    setResults(newResults)

    const historyItem: AnalysisHistory = {
      id: crypto.randomUUID(),
      jobDescription,
      results: newResults,
      analyzedAt: new Date(),
    }
    const updatedHistory = [historyItem, ...history].slice(0, 20)
    setHistory(updatedHistory)
    saveHistory(updatedHistory)
    setIsProcessing(false)

    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 300)
  }, [files, jobDescription, canAnalyze, history])

  const handleHistorySelect = useCallback((item: AnalysisHistory) => {
    setJobDescription(item.jobDescription)
    setResults(item.results)
  }, [])

  const handleClearHistory = useCallback(() => {
    setHistory([])
    saveHistory([])
  }, [])

  const sortedResults = [...results].sort((a, b) => {
    if (sortBy === 'score') return b.overallScore - a.overallScore
    return a.resumeName.localeCompare(b.resumeName)
  })

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#3b82f6',
          colorBgBase: '#0a1628',
          colorBgContainer: 'rgba(255,255,255,0.04)',
          borderRadius: 12,
          fontFamily: "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          colorText: '#e2e8f0',
          colorTextSecondary: '#94a3b8',
          colorBorder: 'rgba(255,255,255,0.08)',
          colorBgElevated: '#0f2040',
        },
        components: {
          Card: { colorBgContainer: 'transparent' },
          Menu: { colorBgContainer: 'transparent', colorItemBg: 'transparent' },
          Progress: { lineBorderRadius: 10 },
        },
      }}
    >
      <Layout style={{ minHeight: '100vh', background: 'transparent', position: 'relative' }}>
        {/* 3D Background — lazy loaded to improve LCP */}
        <Suspense fallback={null}>
          <Background3D />
        </Suspense>

        {/* Scroll-linked decorations (parallax orbs + shapes) */}
        <ScrollDecorations />

        {/* Scroll progress indicator */}
        <ScrollProgress />

        <Content style={{ position: 'relative', zIndex: 2 }}>
          {/* Header */}
          <Header />

          {/* Hero */}
          <HeroSection />

          {/* Features */}
          <ScrollReveal variant="fadeUp" duration={1.1}>
            <section id="features" style={{ scrollMarginTop: 80 }}>
              <Suspense fallback={null}>
                <FeatureShowcase />
              </Suspense>
            </section>
          </ScrollReveal>

          {/* How It Works */}
          <ScrollReveal variant="blurIn" duration={1.1}>
            <section id="how-it-works" style={{ scrollMarginTop: 80 }}>
              <Suspense fallback={null}>
                <HowItWorks />
              </Suspense>
            </section>
          </ScrollReveal>

          {/* ===== SCREENING SECTION (not snapped — scrollable content) ===== */}
          <ScrollReveal variant="scaleUp" duration={1.1}>
            <section id="screening" style={{ scrollMarginTop: 80, padding: '48px 0' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
              {/* Section header */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{ textAlign: 'center', marginBottom: 36 }}
              >
                <Tag style={{
                  background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)',
                  color: '#60a5fa', fontSize: 11, fontWeight: 700, borderRadius: 20,
                  padding: '4px 16px', marginBottom: 16,
                }}>
                  <RocketOutlined /> Start Screening
                </Tag>
                <Title level={2} style={{
                  color: '#fff', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800,
                  marginBottom: 12, letterSpacing: -0.5,
                }}>
                  Upload &{' '}
                  <span style={{ background: 'linear-gradient(90deg, #60a5fa, #a78bfa, #22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Analyze
                  </span>
                </Title>
                <Paragraph style={{ color: '#94a3b8', fontSize: 15, maxWidth: 550, margin: '0 auto' }}>
                  Upload candidate resumes, paste the job description, and get instant AI-powered matching scores.
                </Paragraph>
              </motion.div>

              {/* Input Section — 2 column layout */}
              <Row gutter={[24, 24]} style={{ marginBottom: 0 }}>
                <Col xs={24} lg={12}>
                  <ScrollReveal variant="fadeLeft" delay={0.1}>
                    <FileUpload files={files} onFilesChange={setFiles} isProcessing={isProcessing} />
                  </ScrollReveal>
                </Col>
                <Col xs={24} lg={12}>
                  <ScrollReveal variant="fadeRight" delay={0.2}>
                    <JobDescription value={jobDescription} onChange={setJobDescription} />
                  </ScrollReveal>
                </Col>
              </Row>

              {/* Analyze Button */}
              <div style={{ marginTop: 16, marginBottom: 32 }}>
                <AnalyzeButton onClick={handleAnalyze} disabled={!canAnalyze} isProcessing={isProcessing} fileCount={files.length} />
              </div>

              {/* Results */}
              <div ref={resultsRef}>
                <AnimatePresence>
                  {results.length > 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      {/* Divider */}
                      <Divider style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                        <Text style={{ color: '#64748b', fontSize: 11, fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: 2 }}>Results</Text>
                      </Divider>

                      {/* Stats Overview */}
                      <div style={{ marginBottom: 24 }}>
                        <StatsOverview results={results} />
                      </div>

                      {/* Results Header */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                          <Title level={4} style={{ color: '#fff', margin: 0, fontSize: 18 }}>Screening Results</Title>
                          <Text style={{ color: '#64748b', fontSize: 12 }}>
                            {results.length} candidate{results.length !== 1 ? 's' : ''} ranked by match score
                          </Text>
                        </motion.div>

                        <Space size={8}>
                          <Segmented
                            value={viewMode}
                            onChange={v => setViewMode(v as 'grid' | 'list')}
                            options={[
                              { value: 'grid', icon: <AppstoreOutlined /> },
                              { value: 'list', icon: <UnorderedListOutlined /> },
                            ]}
                            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                          />
                          <Segmented
                            value={sortBy}
                            onChange={v => setSortBy(v as 'score' | 'name')}
                            options={[
                              { value: 'score', label: 'Score' },
                              { value: 'name', label: 'Name' },
                            ]}
                            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                          />
                        </Space>
                      </div>

                      {/* Results Grid */}
                      <Row gutter={[20, 20]} style={{ marginBottom: 24 }}>
                        {sortedResults.map((result, index) => (
                          <Col key={result.id} xs={24} md={viewMode === 'grid' ? 12 : 24} xl={viewMode === 'grid' ? 8 : 24}>
                            <ResultsCard result={result} rank={index + 1} delay={index} />
                          </Col>
                        ))}
                      </Row>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* History */}
                <HistoryPanel history={history} onClear={handleClearHistory} onSelect={handleHistorySelect} />
              </div>
            </div>
          </section>
          </ScrollReveal>
        </Content>

        {/* Footer */}
        <ScrollReveal variant="fadeUp" delay={0.1} duration={0.8}>
          <Footer style={{ background: 'transparent', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '48px 24px', position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <Row gutter={[32, 32]} style={{ marginBottom: 32 }}>
              <Col xs={24} md={8}>
                <Space size={8} style={{ marginBottom: 12 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 10,
                    background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, color: '#fff', fontWeight: 700,
                  }}>R</div>
                  <Text style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>ResumeAI</Text>
                </Space>
                <Paragraph style={{ color: '#64748b', fontSize: 12, maxWidth: 280, lineHeight: 1.7 }}>
                  AI-powered resume screening system. All processing happens locally in your browser — your data never leaves your device.
                </Paragraph>
              </Col>
              <Col xs={24} md={8}>
                <Title level={5} style={{ color: '#fff', fontSize: 13, marginBottom: 12 }}>Technology</Title>
                <Space direction="vertical" size={6}>
                  {['TF-IDF Cosine Similarity', '200+ Skills Database', 'PDF.js Text Extraction', 'React + TypeScript'].map(t => (
                    <Text key={t} style={{ color: '#64748b', fontSize: 12 }}>{t}</Text>
                  ))}
                </Space>
              </Col>
              <Col xs={24} md={8}>
                <Title level={5} style={{ color: '#fff', fontSize: 13, marginBottom: 12 }}>Features</Title>
                <Space direction="vertical" size={6}>
                  {['Multi-resume batch analysis', 'Skill gap identification', 'Experience & education scoring', 'Analysis history & export'].map(t => (
                    <Text key={t} style={{ color: '#64748b', fontSize: 12 }}>{t}</Text>
                  ))}
                </Space>
              </Col>
            </Row>
            <Divider style={{ borderColor: 'rgba(255,255,255,0.06)', margin: '0 0 24px' }} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
              <Text style={{ color: '#475569', fontSize: 11 }}>© 2026 ResumeAI Screening System • Built with React + TF-IDF</Text>
              <Space size={8}>
                <Tag style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', color: '#475569', fontSize: 10, borderRadius: 20 }}>v2.0.0</Tag>
                <Tag style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', color: '#475569', fontSize: 10, borderRadius: 20 }}>100% Client-Side</Tag>
              </Space>
            </div>
          </div>
        </Footer>

        </ScrollReveal>

        {/* Scroll to top */}
        <FloatButton.BackTop
          style={{ right: 24, bottom: 24 }}
          type="primary"
        />
      </Layout>
    </ConfigProvider>
  )
}
