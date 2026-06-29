import { useState, useEffect } from 'react'
import { Menu, X, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useResponsive } from '../hooks/useResponsive'

const links = [
  { label: 'PROJECTS',   id: 'projects' },
  { label: 'EXPERIENCE', id: 'experience' },
  { label: 'SKILLS',     id: 'skills' },
  { label: 'ABOUT',      id: 'about' },
  { label: 'CONTACT',    id: 'contact' },
]

const blinkStyle = `
@keyframes cursorBlink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}
@keyframes hireGlow {
  0%, 100% { box-shadow: 0 0 0px 0px #5ed29c55; }
  50%       { box-shadow: 0 0 14px 4px #5ed29c44, 0 0 28px 8px #5ed29c18; }
}
`

function NavLink({ label, onClick }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: 12,
        fontWeight: 500,
        letterSpacing: '0.12em',
        color: hovered ? '#5ed29c' : 'rgba(255,255,255,0.55)',
        transition: 'color 0.2s',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        position: 'relative',
        paddingBottom: 3,
      }}
    >
      {label}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 1.5,
          background: '#5ed29c',
          borderRadius: 999,
          transformOrigin: 'left center',
        }}
      />
    </button>
  )
}

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { isMobile } = useResponsive()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const scrollTo = (id) => {
    setMenuOpen(false)
    setTimeout(() => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 300)
  }

  return (
    <>
      <style>{blinkStyle}</style>

      {/* ── Header bar ── */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: isMobile ? '14px 20px' : '20px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: scrolled ? 'rgba(7,11,10,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(18px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(18px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
          transition: 'background 0.4s, border-color 0.4s',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 800,
            fontSize: isMobile ? 16 : 18,
            color: 'white',
            letterSpacing: '-0.02em',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            lineHeight: 1,
          }}
        >
          Partha<span style={{ color: '#5ed29c' }}>Srikar</span>
          <span style={{
            color: '#5ed29c',
            fontSize: isMobile ? 14 : 16,
            marginLeft: 2,
            animation: 'cursorBlink 1s step-end infinite',
            display: 'inline-block',
          }}>|</span>
        </button>

        {/* Desktop nav — only rendered (not just hidden) on desktop */}
        {!isMobile && (
          <nav style={{ display: 'flex', gap: 36, alignItems: 'center' }}>
            {links.map((l) => (
              <NavLink key={l.label} label={l.label} onClick={() => scrollTo(l.id)} />
            ))}
          </nav>
        )}

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {!isMobile && (
            <motion.a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=parthasrikar853@gmail.com"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.06 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.1em',
                color: '#070b0a',
                background: '#5ed29c',
                padding: '8px 20px',
                borderRadius: 999,
                textDecoration: 'none',
                animation: 'hireGlow 2.4s ease-in-out infinite',
              }}
            >
              HIRE ME
            </motion.a>
          )}

          {/* Hamburger — only on mobile */}
          {isMobile && (
            <motion.button
              onClick={() => setMenuOpen(true)}
              whileTap={{ scale: 0.9 }}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 10,
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'white',
              }}
            >
              <Menu size={20} />
            </motion.button>
          )}
        </div>
      </motion.header>

      {/* ── Mobile full-screen menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.5)',
                zIndex: 90,
              }}
            />

            {/* Drawer — slides in from right */}
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                width: 'min(320px, 85vw)',
                background: '#0a1210',
                borderLeft: '1px solid rgba(94,210,156,0.12)',
                zIndex: 100,
                display: 'flex',
                flexDirection: 'column',
                padding: '0 0 32px',
              }}
            >
              {/* Drawer header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '20px 24px',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}>
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 800,
                  fontSize: 16,
                  color: 'white',
                }}>
                  Partha<span style={{ color: '#5ed29c' }}>Srikar</span>
                </span>
                <motion.button
                  onClick={() => setMenuOpen(false)}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 10,
                    width: 36,
                    height: 36,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'rgba(255,255,255,0.7)',
                  }}
                >
                  <X size={18} />
                </motion.button>
              </div>

              {/* Nav links */}
              <nav style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                padding: '32px 24px',
                gap: 4,
              }}>
                {links.map((l, i) => (
                  <MobileNavLink
                    key={l.label}
                    label={l.label}
                    index={i}
                    onClick={() => scrollTo(l.id)}
                  />
                ))}
              </nav>

              {/* Bottom CTA */}
              <div style={{ padding: '0 24px' }}>
                <div style={{
                  height: 1,
                  background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.07), transparent)',
                  marginBottom: 24,
                }} />
                <motion.a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=parthasrikar853@gmail.com"
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 13,
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#070b0a',
                    background: '#5ed29c',
                    padding: '14px',
                    borderRadius: 12,
                    textDecoration: 'none',
                  }}
                >
                  Hire Me <ArrowRight size={15} />
                </motion.a>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 11,
                  color: 'rgba(255,255,255,0.25)',
                  textAlign: 'center',
                  marginTop: 16,
                  letterSpacing: '0.08em',
                }}>
                  parthasrikar853@gmail.com
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

function MobileNavLink({ label, index, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.button
      initial={{ x: 24, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.05 + index * 0.06, type: 'spring', stiffness: 300, damping: 28 }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontFamily: 'Inter, sans-serif',
        fontSize: 17,
        fontWeight: 700,
        letterSpacing: '0.06em',
        color: hovered ? '#5ed29c' : 'rgba(255,255,255,0.8)',
        background: hovered ? 'rgba(94,210,156,0.06)' : 'transparent',
        border: 'none',
        borderRadius: 10,
        cursor: 'pointer',
        padding: '14px 16px',
        transition: 'color 0.2s, background 0.2s',
        textAlign: 'left',
        width: '100%',
      }}
    >
      <span style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <span style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 11,
          color: '#5ed29c',
          opacity: 0.6,
          fontWeight: 400,
          letterSpacing: '0.1em',
          minWidth: 20,
        }}>0{index + 1}</span>
        {label}
      </span>
      <motion.span
        animate={{ x: hovered ? 3 : 0, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.18 }}
        style={{ color: '#5ed29c' }}
      >
        <ArrowRight size={14} />
      </motion.span>
    </motion.button>
  )
}
