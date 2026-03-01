import { useState, useEffect } from 'react'
import { Layout, Menu, Space, Tag } from 'antd'
import { motion } from 'motion/react'
import {
  ScanOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons'

const { Header: AntHeader } = Layout

const navItems = [
  { key: 'features', label: 'Features' },
  { key: 'screening', label: 'Screening' },
  { key: 'how-it-works', label: 'How It Works' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <AntHeader
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 50,
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: scrolled ? 56 : 64,
            background: scrolled ? 'rgba(10, 22, 40, 0.85)' : 'transparent',
            backdropFilter: scrolled ? 'blur(24px)' : 'none',
            borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
            transition: 'all 0.4s ease',
          }}
        >
          <a
            href="#"
            onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            style={{ display: 'flex', alignItems: 'center', gap: 12 }}
          >
            <div style={{
              width: 38, height: 38, borderRadius: 12,
              background: 'linear-gradient(135deg, #3b82f6, #7c3aed)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(59,130,246,0.3)',
            }}>
              <ScanOutlined style={{ color: '#fff', fontSize: 18 }} />
            </div>
            <div style={{ lineHeight: 1.2 }}>
              <div style={{ color: '#fff', fontSize: 16, fontWeight: 700 }}>ResumeAI</div>
              <div style={{ color: 'rgba(96,165,250,0.8)', fontSize: 9, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' as const }}>Smart Screening</div>
            </div>
          </a>

          <Menu
            mode="horizontal"
            selectable={false}
            className="header-nav-menu"
            style={{ background: 'transparent', borderBottom: 'none', flex: 1, justifyContent: 'center' }}
            items={navItems.map(item => ({
              key: item.key,
              label: <a href={`#${item.key}`} style={{ color: 'rgba(148,163,184,0.9)', fontSize: 13, fontWeight: 500 }}>{item.label}</a>,
            }))}
          />

          <Space size={12}>
            <Tag
              icon={<ThunderboltOutlined />}
              color="blue"
              className="header-tag-desktop"
              style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', color: '#93c5fd', fontSize: 11, fontWeight: 600, borderRadius: 20 }}
            >
              v2.0 — AI Engine
            </Tag>
          </Space>
        </AntHeader>
      </motion.div>
    </>
  )
}
