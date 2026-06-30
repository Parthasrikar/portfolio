import { useRef, useEffect, useState } from 'react'
import Hls from 'hls.js'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useResponsive } from '../hooks/useResponsive'

const HLS_URL = 'https://stream.mux.com/tLkHO1qZoaaQOUeVWo8hEBeGQfySP02EPS02BmnNFyXys.m3u8'

function LiquidGlassCard({ isMobile }) {
  const w = isMobile ? 180 : 220
  const h = isMobile ? 190 : 200
  return (
    <div style={{ position: 'relative', width: w, height: h, borderRadius: 16 }}>
      {/* Glass layer */}
      <div style={{
        position: 'absolute',
        inset: 0,
        borderRadius: 16,
        background: 'rgba(255,255,255,0.01)',
        backgroundBlendMode: 'luminosity',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.1)',
      }} />
      {/* Border mask trick */}
      <div style={{
        position: 'absolute',
        inset: 0,
        borderRadius: 16,
        pointerEvents: 'none',
        border: '1.4px solid transparent',
        backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.05) 100%)',
        backgroundOrigin: 'border-box',
        WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
      }} />
      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        padding: '18px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        height: '100%',
      }}>
        <span style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 11,
          color: 'rgba(255,255,255,0.4)',
          letterSpacing: '0.15em',
        }}>[ 2025 ]</span>

        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 16,
          color: 'white',
          fontWeight: 600,
          lineHeight: 1.35,
        }}>
          Built for<br />
          <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: '#5ed29c' }}>Real</em>
          {' '}Production
        </p>

        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 11,
          color: 'rgba(255,255,255,0.45)',
          lineHeight: 1.65,
        }}>
          Scalable APIs. Cloud infra.<br />
          AI-powered workflows.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 'auto' }}>
          {['#5ed29c', '#3ab07c', '#2a8060'].map((c, i) => (
            <div key={i} style={{
              width: 22,
              height: 22,
              borderRadius: '50%',
              background: c,
              marginLeft: i > 0 ? -8 : 0,
              border: '2px solid #070b0a',
            }} />
          ))}
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', marginLeft: 4 }}>
            SWE @ Inncircles
          </span>
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
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
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: '#070b0a',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
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
          opacity: videoLoaded ? 0.55 : 0,
          transition: 'opacity 1.5s ease',
          zIndex: 0,
        }}
      />

      {/* Left gradient */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'linear-gradient(to right, #070b0a 0%, transparent 55%)',
      }} />
      {/* Bottom gradient */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'linear-gradient(to top, #070b0a 0%, transparent 50%)',
      }} />
      {/* Top gradient */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'linear-gradient(to bottom, #070b0a 0%, transparent 30%)',
      }} />

      {/* Central ellipse glow */}
      <div style={{
        position: 'absolute', top: 0, left: '50%',
        transform: 'translateX(-50%)', zIndex: 1, pointerEvents: 'none',
      }}>
        <svg width="900" height="300" viewBox="0 0 900 300">
          <defs>
            <filter id="glowBlur">
              <feGaussianBlur stdDeviation="25" />
            </filter>
            <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00ffcc" stopOpacity="0" />
              <stop offset="50%" stopColor="#5ed29c" stopOpacity="1" />
              <stop offset="100%" stopColor="#00ffcc" stopOpacity="0" />
            </linearGradient>
          </defs>
          <ellipse cx="450" cy="80" rx="420" ry="80"
            fill="none"
            stroke="url(#glowGrad)"
            strokeWidth="2"
            filter="url(#glowBlur)"
            opacity="0.5"
          />
        </svg>
      </div>

      {/* Vertical grid lines — desktop only */}
      {[25, 50, 75].map((pct) => (
        <div
          key={pct}
          className="hidden md:block"
          style={{
            position: 'absolute',
            top: 0, bottom: 0,
            left: `${pct}%`,
            width: 1,
            background: 'rgba(255,255,255,0.06)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Main content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: isMobile ? '96px 20px 56px' : '120px 24px 80px',
        maxWidth: 860,
        width: '100%',
        gap: 0,
      }}>
        {/* Floating glass card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          style={{ marginBottom: 32 }}
        >
          <LiquidGlassCard isMobile={isMobile} />
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: 11,
            color: '#5ed29c',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            marginBottom: 16,
          }}
        >
          Full-Stack Developer · Cloud & AI
        </motion.p>

        {/* Main headline */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(38px, 6.5vw, 76px)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            color: 'white',
            textTransform: 'uppercase',
            marginBottom: 24,
          }}
        >
          BUILDING THINGS<br />
          THAT <em style={{
            fontFamily: "'Instrument Serif', serif",
            fontStyle: 'italic',
            fontWeight: 400,
            textTransform: 'none',
            color: '#5ed29c',
            fontSize: '1.05em',
          }}>scale</em>
          <span style={{ color: '#5ed29c' }}>.</span>
        </motion.h1>

        {/* Sub description */}
        <motion.p
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 15,
            fontWeight: 400,
            color: 'rgba(255,255,255,0.6)',
            maxWidth: 520,
            lineHeight: 1.75,
            marginBottom: 40,
          }}
        >
          Software developer at Inncircles — building enterprise APIs,
          cloud infrastructure on AWS, and AI-powered automation systems.
          CS @ VIIIT, CGPA 9.10.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontFamily: 'Inter, sans-serif',
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#070b0a',
              background: '#5ed29c',
              padding: '14px 32px',
              borderRadius: 999,
              border: 'none',
              cursor: 'pointer',
              transition: 'filter 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(1.12)'; e.currentTarget.style.transform = 'scale(1.04)' }}
            onMouseLeave={e => { e.currentTarget.style.filter = 'brightness(1)'; e.currentTarget.style.transform = 'scale(1)' }}
          >
            View Projects <ArrowRight size={15} />
          </button>
          <a
            href="https://drive.google.com/file/d/1t1k2Bf6lblszgsS0Y_UxQWHSbylaKKou/view?usp=sharing"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontFamily: 'Inter, sans-serif',
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.8)',
              background: 'rgba(255,255,255,0.06)',
              padding: '14px 32px',
              borderRadius: 999,
              border: '1px solid rgba(255,255,255,0.1)',
              textDecoration: 'none',
              transition: 'background 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
          >
            Resume
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span style={{ fontSize: 10, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)' }}>SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          style={{ width: 1, height: 32, background: 'linear-gradient(to bottom, rgba(94,210,156,0.8), transparent)' }}
        />
      </motion.div>
    </section>
  )
}
