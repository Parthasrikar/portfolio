import { useRef, useEffect, useState } from 'react'
import Hls from 'hls.js'
import { motion } from 'framer-motion'
import { ArrowRight, Mail, GitBranch, Link, ExternalLink } from 'lucide-react'
import { useResponsive } from '../hooks/useResponsive'

const HLS_URL = 'https://stream.mux.com/tLkHO1qZoaaQOUeVWo8hEBeGQfySP02EPS02BmnNFyXys.m3u8'

export default function Contact() {
  const videoRef = useRef(null)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const { isMobile } = useResponsive()

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    let hls

    if (Hls.isSupported()) {
      hls = new Hls({ enableWorker: false })
      hls.loadSource(HLS_URL)
      hls.attachMedia(video)
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {})
        setVideoLoaded(true)
      })
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = HLS_URL
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(() => {})
        setVideoLoaded(true)
      })
    }

    return () => hls?.destroy()
  }, [])

  return (
    <section id="contact" style={{ position: 'relative', overflow: 'hidden', background: '#070b0a', padding: isMobile ? '80px 20px 60px' : '120px 24px 80px' }}>
      {/* Background video */}
      <video
        ref={videoRef}
        muted
        autoPlay
        loop
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: videoLoaded ? 0.35 : 0,
          transition: 'opacity 1.5s ease',
          zIndex: 0,
        }}
      />
      {/* Top gradient to blend with previous section smoothly */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'linear-gradient(to bottom, #070b0a 0%, transparent 40%)',
      }} />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
        {/* Central glow */}
        <div style={{
          position: 'relative',
          marginBottom: 80,
        }}>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(94,210,156,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: 11,
              color: '#5ed29c',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              marginBottom: 20,
            }}
          >Contact</motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(32px, 5vw, 60px)',
              color: 'white',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: 20,
            }}
          >
            Let's build something{' '}
            <em style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: 'italic',
              color: '#5ed29c',
              fontWeight: 400,
            }}>great</em>
            <span style={{ color: '#5ed29c' }}>.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 15,
              color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.8,
              maxWidth: 480,
              margin: '0 auto 40px',
            }}
          >
            Open to full-time roles, freelance projects, and interesting
            collaboration. I respond within 24 hours.
          </motion.p>

          <motion.a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=parthasrikar853@gmail.com"
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              fontFamily: 'Inter, sans-serif',
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#070b0a',
              background: '#5ed29c',
              padding: '16px 36px',
              borderRadius: 999,
              textDecoration: 'none',
              transition: 'filter 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(1.12)'; e.currentTarget.style.transform = 'scale(1.04)' }}
            onMouseLeave={e => { e.currentTarget.style.filter = 'brightness(1)'; e.currentTarget.style.transform = 'scale(1)' }}
          >
            Say Hello <ArrowRight size={16} />
          </motion.a>
        </div>

        {/* Divider */}
        <div style={{
          height: 1,
          background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)',
          marginBottom: 40,
        }} />

        {/* Footer links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: isMobile ? 'center' : 'space-between',
            alignItems: 'center',
            gap: isMobile ? 16 : 20,
          }}
        >
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 13,
            color: 'rgba(255,255,255,0.25)',
          }}>
            Partha<span style={{ color: '#5ed29c' }}>Srikar</span> © 2025
          </p>

          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            {[
              { icon: <Mail size={15} />, href: 'https://mail.google.com/mail/?view=cm&fs=1&to=parthasrikar853@gmail.com', label: 'Email' },
              { icon: <GitBranch size={15} />, href: 'https://github.com/parthasrikar', label: 'GitHub' },
              { icon: <Link size={15} />, href: 'https://www.linkedin.com/in/parthasrikar/', label: 'LinkedIn' },
              { icon: <ExternalLink size={15} />, href: 'https://parthasrikar.me/', label: 'Portfolio' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                style={{
                  color: 'rgba(255,255,255,0.35)',
                  transition: 'color 0.2s',
                  textDecoration: 'none',
                  display: 'flex',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#5ed29c'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
              >
                {item.icon}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
