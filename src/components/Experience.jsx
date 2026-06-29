import { motion } from 'framer-motion'
import { useResponsive } from '../hooks/useResponsive'

const items = [
  {
    role: 'Software Developer',
    company: 'Inncircles',
    period: '2025 — Present',
    type: 'Full-time',
    bullets: [
      'Engineered scalable RESTful APIs for enterprise-grade web applications, ensuring high maintainability and performance',
      'Architected a reusable Angular UI component library adopted across multiple product teams, streamlining cross-team development',
      'Built reliable async message processing pipelines integrating AWS SQS and Kafka with backend services',
      'Managed cloud infrastructure and media storage pipelines using AWS EC2 and S3',
      'Architected MCP servers to expose internal APIs as AI-consumable tools, enabling LLM-driven workflow automation',
    ],
    tags: ['Node.js', 'Angular', 'AWS', 'Kafka', 'MCP', 'REST APIs'],
  },
]

function CardBorder() {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      borderRadius: 20,
      pointerEvents: 'none',
      border: '1px solid transparent',
      backgroundImage: 'linear-gradient(135deg, rgba(94,210,156,0.3) 0%, rgba(255,255,255,0.04) 60%, rgba(94,210,156,0.1) 100%)',
      backgroundOrigin: 'border-box',
      WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
      WebkitMaskComposite: 'xor',
      maskComposite: 'exclude',
    }} />
  )
}

export default function Experience() {
  const { isMobile } = useResponsive()
  return (
    <section id="experience" style={{ background: '#070b0a', padding: isMobile ? '80px 16px' : '120px 24px' }}>
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
          }}>Experience</p>
          <h2 style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(28px, 4vw, 48px)',
            color: 'white',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
          }}>
            Where I've{' '}
            <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: '#5ed29c' }}>shipped</em>.
          </h2>
        </motion.div>

        {/* Timeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{ position: 'relative' }}
            >
              <div style={{
                position: 'relative',
                background: 'rgba(255,255,255,0.025)',
                backdropFilter: 'blur(8px)',
                borderRadius: 20,
                padding: isMobile ? '24px 20px' : '36px 40px',
                overflow: 'hidden',
              }}>
                <CardBorder />

                {/* Top row */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: 12,
                  marginBottom: 24,
                }}>
                  <div>
                    <p style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 800,
                      fontSize: isMobile ? 18 : 22,
                      color: 'white',
                      letterSpacing: '-0.02em',
                    }}>{item.role}</p>
                    <p style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 15,
                      color: '#5ed29c',
                      fontWeight: 600,
                      marginTop: 4,
                    }}>{item.company}</p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                    <span style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 12,
                      color: 'rgba(255,255,255,0.4)',
                      letterSpacing: '0.08em',
                    }}>{item.period}</span>
                    <span style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 10,
                      color: '#5ed29c',
                      background: 'rgba(94,210,156,0.1)',
                      padding: '3px 10px',
                      borderRadius: 999,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    }}>{item.type}</span>
                  </div>
                </div>

                {/* Bullets */}
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
                  {item.bullets.map((b, j) => (
                    <li key={j} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <span style={{
                        color: '#5ed29c',
                        fontSize: 12,
                        marginTop: 2,
                        flexShrink: 0,
                      }}>▸</span>
                      <span style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: 14,
                        color: 'rgba(255,255,255,0.65)',
                        lineHeight: 1.65,
                      }}>{b}</span>
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {item.tags.map((tag) => (
                    <span key={tag} style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 11,
                      color: 'rgba(255,255,255,0.5)',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      padding: '4px 12px',
                      borderRadius: 999,
                      letterSpacing: '0.06em',
                    }}>{tag}</span>
                  ))}
                </div>

                {/* Decorative glow */}
                <div style={{
                  position: 'absolute',
                  top: -60,
                  right: -60,
                  width: 180,
                  height: 180,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(94,210,156,0.06) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
