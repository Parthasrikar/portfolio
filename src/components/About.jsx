import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { useResponsive } from '../hooks/useResponsive'

const achievements = [
  {
    title: 'ACM Web Dev Lead',
    desc: 'Led 15+ students — organized technical workshops and coding events',
    icon: '◈',
  },
  {
    title: 'National Hackathon',
    desc: '4th place among 500+ participating teams',
    icon: '⚡',
  },
  {
    title: '450+ Problems Solved',
    desc: 'LeetCode · CodeChef 3★ · GeeksforGeeks',
    icon: '{ }',
  },
  {
    title: 'AWS Certified',
    desc: 'Cloud Technical Essentials + Architecting Solutions on AWS',
    icon: '☁',
  },
]

const stats = [
  { label: 'CGPA', value: '9.10' },
  { label: 'Problems Solved', value: '450+' },
  { label: 'Years Experience', value: '1+' },
  { label: 'Hackathon Rank', value: 'Top 4' },
]

export default function About() {
  const { isMobile } = useResponsive()
  return (
    <section id="about" style={{ background: '#070b0a', padding: isMobile ? '80px 16px' : '120px 24px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 64 }}
        >
          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: 11,
            color: '#5ed29c',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            marginBottom: 12,
          }}>About</p>
          <h2 style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(28px, 4vw, 48px)',
            color: 'white',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
          }}>
            Who I{' '}
            <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: '#5ed29c' }}>am</em>.
          </h2>
        </motion.div>

        {/* Two column layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
          gap: isMobile ? 40 : 48,
          alignItems: 'start',
        }}>
          {/* Left — Bio */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: isMobile ? 15 : 16,
              color: 'rgba(255,255,255,0.75)',
              lineHeight: 1.85,
              marginBottom: 24,
            }}>
              I'm Partha Srikar — a software developer building production-grade systems
              from Visakhapatnam, India. Currently at{' '}
              <span style={{ color: '#5ed29c', fontWeight: 600 }}>Inncircles</span>,
              where I work on enterprise APIs, cloud infrastructure, and AI-powered workflow automation.
            </p>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 16,
              color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.85,
              marginBottom: 32,
            }}>
              I specialize in the full stack — from Angular/React frontends to Node.js backends,
              AWS infrastructure, and cutting-edge agentic systems using MCP and LLMs.
              Completing my B.Tech in Computer Science at VIIIT with a 9.10 CGPA.
            </p>

            {/* Stats row */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 16,
              marginBottom: 32,
            }}>
              {stats.map((stat) => (
                <div key={stat.label} style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 12,
                  padding: '16px 18px',
                }}>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 800,
                    fontSize: 24,
                    color: '#5ed29c',
                    letterSpacing: '-0.02em',
                  }}>{stat.value}</p>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 11,
                    color: 'rgba(255,255,255,0.4)',
                    letterSpacing: '0.08em',
                    marginTop: 4,
                    textTransform: 'uppercase',
                  }}>{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Links */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {[
                { label: 'LinkedIn', href: 'https://www.linkedin.com/in/parthasrikar/' },
                { label: 'GitHub', href: 'https://github.com/parthasrikar' },
                { label: 'LeetCode', href: 'https://leetcode.com/u/parthasrikar/' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 12,
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.6)',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    padding: '7px 14px',
                    borderRadius: 999,
                    textDecoration: 'none',
                    transition: 'color 0.2s, border-color 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#5ed29c'; e.currentTarget.style.borderColor = 'rgba(94,210,156,0.3)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}
                >
                  {link.label} <ExternalLink size={11} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right — Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.15 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
          >
            <p style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: 11,
              color: 'rgba(255,255,255,0.35)',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              marginBottom: 8,
            }}>Highlights</p>
            {achievements.map((ach, i) => (
              <motion.div
                key={ach.title}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.08 }}
                style={{
                  display: 'flex',
                  gap: 16,
                  alignItems: 'flex-start',
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 14,
                  padding: '18px 20px',
                  transition: 'border-color 0.2s',
                  cursor: 'default',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(94,210,156,0.2)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
              >
                <span style={{
                  fontSize: 18,
                  color: '#5ed29c',
                  opacity: 0.8,
                  flexShrink: 0,
                  marginTop: 2,
                }}>{ach.icon}</span>
                <div>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 700,
                    fontSize: 14,
                    color: 'white',
                    marginBottom: 4,
                  }}>{ach.title}</p>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 13,
                    color: 'rgba(255,255,255,0.45)',
                    lineHeight: 1.6,
                  }}>{ach.desc}</p>
                </div>
              </motion.div>
            ))}

            {/* Education card */}
            <div style={{
              background: 'rgba(94,210,156,0.04)',
              border: '1px solid rgba(94,210,156,0.15)',
              borderRadius: 14,
              padding: '18px 20px',
              marginTop: 4,
            }}>
              <p style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: 11,
                color: '#5ed29c',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: 10,
              }}>Education</p>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                fontSize: 14,
                color: 'white',
                marginBottom: 3,
              }}>Vignan's Institute of Information Technology</p>
              <p style={{ fontFamily: 'Inter', fontSize: 13, color: 'rgba(255,255,255,0.45)', marginBottom: 2 }}>
                B.Tech Computer Science
              </p>
              <p style={{ fontFamily: 'Inter', fontSize: 13, color: '#5ed29c', fontWeight: 600 }}>
                CGPA: 9.10 · 2022 – 2026
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
