import { useRef, useState, useCallback } from 'react'
import { useResponsive } from '../hooks/useResponsive'
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useScroll,
  useInView,
} from 'framer-motion'
import { ArrowRight, GitBranch } from 'lucide-react'
import HologramViewer from './HologramViewer'

/* ── spring config for 3D tilt ── */
const SPRING = { stiffness: 200, damping: 28, mass: 0.5 }

const projects = [
  {
    title: 'OurrApartment',
    subtitle: 'Community Management Platform',
    description:
      'Scalable community management system covering payments, facility booking, and resident management with real-time analytics and role-based access control.',
    tags: ['Next.js', 'MongoDB', 'Prisma', 'Razorpay', 'TailwindCSS'],
    github: 'https://github.com/Parthasrikar/community-management',
    live: 'https://ourrapartment.vercel.app',
    highlight: 'Razorpay-integrated',
    accentColor: '#5ed29c',
    modelType: 'building',
    bullets: [
      'JWT-based multi-role auth (admin, resident, security)',
      'Real-time analytics dashboard with Google Analytics',
      'Secure maintenance fee collection via Razorpay',
    ],
  },
  {
    title: 'Interactive Whiteboard',
    subtitle: 'Real-Time Collaboration Tool',
    description:
      'Real-time collaborative whiteboard supporting multi-user simultaneous drawing and annotation with WebRTC voice calls and low-latency canvas sync.',
    tags: ['MERN Stack', 'Socket.IO', 'WebRTC', 'AWS EC2', 'Nginx'],
    github: 'https://github.com/Parthasrikar/whiteboard',
    live: 'https://whiteboard-frontend-2e8f.onrender.com/',
    highlight: 'WebRTC P2P',
    accentColor: '#4db8f0',
    modelType: 'whiteboard',
    bullets: [
      'P2P voice calls via WebRTC',
      'Socket.IO for <50ms canvas sync',
      'Deployed on AWS EC2 + Nginx reverse proxy',
    ],
  },
]

/* ─────────────────────────────────────────
   Tech Tag — spring pop-in on card enter
───────────────────────────────────────── */
function TechTag({ tag, index, cardInView }) {
  return (
    <motion.span
      initial={{ scale: 0, opacity: 0 }}
      animate={cardInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
      transition={{
        type: 'spring',
        stiffness: 380,
        damping: 22,
        delay: 0.35 + index * 0.06,
      }}
      style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: 11,
        color: 'rgba(255,255,255,0.45)',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.07)',
        padding: '3px 10px',
        borderRadius: 999,
        display: 'inline-block',
      }}
    >
      {tag}
    </motion.span>
  )
}

/* ─────────────────────────────────────────
   Live Demo link — arrow slides, underline draws
───────────────────────────────────────── */
function LiveDemoLink({ href, color }) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        gap: 2,
        textDecoration: 'none',
        width: 'fit-content',
      }}
    >
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          fontFamily: 'Inter, sans-serif',
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color,
        }}
      >
        Live Demo{' '}
        <motion.span
          animate={{ x: hovered ? 5 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          style={{ display: 'inline-flex' }}
        >
          <ArrowRight size={13} />
        </motion.span>
      </span>
      {/* Drawing underline */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        style={{
          height: 1.5,
          background: color,
          borderRadius: 999,
          transformOrigin: 'left center',
        }}
      />
    </a>
  )
}

/* ─────────────────────────────────────────
   Project Card — 3D tilt + model overlay
───────────────────────────────────────── */
function ProjectCard({ project, index }) {
  const cardRef = useRef(null)
  const inView   = useInView(cardRef, { once: true, margin: '-60px' })
  const [isHovered, setIsHovered] = useState(false)

  /* ── Mouse-tracking 3D tilt ── */
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [8, -8]),  SPRING)
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-8, 8]),  SPRING)

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    rawX.set((e.clientX - rect.left) / rect.width - 0.5)
    rawY.set((e.clientY - rect.top)  / rect.height - 0.5)
  }, [rawX, rawY])

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => { setIsHovered(false); rawX.set(0); rawY.set(0) }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.18,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        perspective: 1000,
        position: 'relative',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          position: 'relative',
          background: 'rgba(255,255,255,0.025)',
          backdropFilter: 'blur(8px)',
          borderRadius: 20,
          overflow: 'hidden',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: isHovered
            ? `0 32px 64px -16px ${project.accentColor}22, 0 0 0 1px ${project.accentColor}30`
            : '0 0 0 1px rgba(255,255,255,0.06)',
          transition: 'box-shadow 0.3s',
        }}
      >
        {/* Glass border */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: 20, pointerEvents: 'none',
          border: '1px solid transparent',
          backgroundImage: `linear-gradient(135deg, ${project.accentColor}44 0%, rgba(255,255,255,0.04) 60%, ${project.accentColor}22 100%)`,
          backgroundOrigin: 'border-box',
          WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          zIndex: 1,
        }} />

        {/* Top accent bar */}
        <div style={{ height: 3, background: 'rgba(255,255,255,0.03)', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute', inset: 0,
              background: `linear-gradient(to right, transparent, ${project.accentColor}, transparent)`,
              transformOrigin: 'left center',
            }}
          />
        </div>

        {/* ── HOLOGRAM ZONE ── */}
        <div style={{ position: 'relative', height: 220, flexShrink: 0, marginTop: 10 }}>
          <HologramViewer type={project.modelType} />
        </div>

        {/* Content — always visible and clickable */}
        <div style={{ padding: '20px 20px 28px', flex: 1, display: 'flex', flexDirection: 'column', gap: 16, position: 'relative', zIndex: 5 }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{
                fontFamily: 'Inter, sans-serif', fontSize: 10,
                color: project.accentColor, background: `${project.accentColor}18`,
                padding: '3px 10px', borderRadius: 999,
                letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600,
              }}>{project.highlight}</span>
              <h3 style={{
                fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 24,
                color: 'white', letterSpacing: '-0.02em', marginTop: 10,
              }}>{project.title}</h3>
              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: 13,
                color: 'rgba(255,255,255,0.4)', marginTop: 4,
              }}>{project.subtitle}</p>
            </div>
            <a
              href={project.github} target="_blank" rel="noreferrer"
              style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'rgba(255,255,255,0.7)', textDecoration: 'none',
                transition: 'background 0.2s', flexShrink: 0,
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
            ><GitBranch size={15} /></a>
          </div>

          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>{project.description}</p>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {project.bullets.map((b, i) => (
              <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ color: project.accentColor, fontSize: 11, marginTop: 3, flexShrink: 0 }}>▸</span>
                <span style={{ fontFamily: 'Inter', fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>{b}</span>
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 'auto' }}>
            {project.tags.map((tag, i) => <TechTag key={tag} tag={tag} index={i} cardInView={inView} />)}
          </div>

          <LiveDemoLink href={project.live} color={project.accentColor} />
        </div>

        {/* Corner glow */}
        <div style={{
          position: 'absolute',
          bottom: -40,
          right: -40,
          width: 160,
          height: 160,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${project.accentColor}0a 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />
      </motion.div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────
   Animated period SVG
───────────────────────────────────────── */
function AnimatedPeriod({ inView, color }) {
  return (
    <motion.svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      style={{ display: 'inline-block', verticalAlign: 'bottom', marginBottom: 4 }}
    >
      <motion.circle
        cx="9"
        cy="13"
        r="4"
        fill={color}
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ type: 'spring', stiffness: 500, damping: 22, delay: 0.55 }}
      />
    </motion.svg>
  )
}

/* ─────────────────────────────────────────
   Projects section
───────────────────────────────────────── */
export default function Projects() {
  const sectionRef   = useRef(null)
  const headerRef    = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })
  const { isMobile } = useResponsive()

  /* Parallax for "PROJECTS" label */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const labelY = useTransform(scrollYProgress, [0, 1], [-20, 20])

  return (
    <section id="projects" ref={sectionRef} style={{ background: '#070b0a', padding: isMobile ? '80px 16px' : '120px 24px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>

        {/* Section header */}
        <div ref={headerRef} style={{ marginBottom: 64 }}>

          {/* Parallax PROJECTS label */}
          <motion.p
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: 11,
              color: '#5ed29c',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              marginBottom: 12,
              y: labelY,
              display: 'inline-block',
            }}
          >
            Projects
          </motion.p>

          {/* Split animated heading */}
          <h2 style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(28px, 4vw, 48px)',
            color: 'white',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            display: 'flex',
            alignItems: 'baseline',
            flexWrap: 'wrap',
            gap: '0.25em',
          }}>
            {/* "Things I've" — fades in from left */}
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              animate={headerInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'inline-block' }}
            >
              Things I've
            </motion.span>

            {/* "built" — springs in from right */}
            <motion.em
              initial={{ opacity: 0, x: 30 }}
              animate={headerInView ? { opacity: 1, x: 0 } : {}}
              transition={{ type: 'spring', stiffness: 260, damping: 22, delay: 0.15, bounce: 0.45 }}
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: 'italic',
                color: '#5ed29c',
                display: 'inline-block',
              }}
            >
              built
            </motion.em>

            {/* Period draws itself */}
            <AnimatedPeriod inView={headerInView} color="#5ed29c" />
          </h2>
        </div>

        {/* Cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: isMobile ? 20 : 24,
        }}>
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
