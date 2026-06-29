import { useRef, useState, useMemo, Suspense } from 'react'
import { useResponsive } from '../hooks/useResponsive'
import { motion, useInView } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

/* ── Category colors ── */
const CAT_COLOR = {
  'Languages':      '#f9a8d4',
  'Frontend':       '#5ed29c',
  'Backend':        '#fbbf24',
  'Cloud & DevOps': '#60a5fa',
  'AI & Agentic':   '#a78bfa',
  'Real-Time':      '#4db8f0',
}

const skillGroups = [
  { category: 'Languages',      icon: '{ }', skills: ['C++', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3'] },
  { category: 'Frontend',       icon: '◈',   skills: ['React.js', 'Next.js', 'Angular', 'TailwindCSS', 'Framer Motion'] },
  { category: 'Backend',        icon: '⬡',   skills: ['Node.js', 'Express.js', 'MongoDB', 'Prisma ORM', 'REST APIs'] },
  { category: 'Cloud & DevOps', icon: '☁',   skills: ['AWS EC2', 'AWS S3', 'AWS Lambda', 'Docker', 'Nginx', 'CI/CD'] },
  { category: 'AI & Agentic',   icon: '⚡',  skills: ['LangChain', 'OpenAI API', 'Claude API', 'MCP Servers', 'RAG', 'Vector DBs'] },
  { category: 'Real-Time',      icon: '⟳',   skills: ['WebSockets', 'Socket.IO', 'WebRTC', 'Kafka', 'AWS SQS'] },
]

const ALL_SKILLS = skillGroups.flatMap(g =>
  g.skills.map(s => ({ name: s, category: g.category, color: CAT_COLOR[g.category] }))
)

/* Fibonacci sphere */
function fibonacciSphere(n, r) {
  const pts = []
  const phi = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2
    const rad = Math.sqrt(Math.max(0, 1 - y * y))
    const theta = phi * i
    pts.push(new THREE.Vector3(Math.cos(theta) * rad * r, y * r, Math.sin(theta) * rad * r))
  }
  return pts
}

/* ── Single pill with depth-based opacity ── */
function SkillPill({ name, color, position }) {
  const [hovered, setHovered] = useState(false)
  const wrapRef  = useRef(null)          // outer div — opacity driven by depth
  const opacRef  = useRef(1)             // current animated opacity
  const camDir   = useRef(new THREE.Vector3()) // reused each frame (no GC)
  const normPos  = useMemo(() => position.clone().normalize(), [position])

  useFrame(({ camera }, delta) => {
    if (!wrapRef.current) return

    // Vector pointing from camera toward the sphere center (origin)
    camDir.current.copy(camera.position).negate().normalize()

    // dot: +1 = pill fully faces camera (front), -1 = pill faces away (back)
    const dot = normPos.dot(camDir.current)

    // Map [-1, +1] → [0.09, 1.0] opacity
    const targetOpacity = THREE.MathUtils.mapLinear(dot, -1, 1, 0.09, 1.0)

    // Smooth exponential decay lerp — frame-rate independent
    const f = 1 - Math.exp(-7 * delta)
    opacRef.current += (targetOpacity - opacRef.current) * f

    const o = opacRef.current
    wrapRef.current.style.opacity = o.toFixed(3)
    // Disable pointer events for back-facing pills so you can't accidentally hover them
    wrapRef.current.style.pointerEvents = o < 0.35 ? 'none' : 'auto'
  })

  return (
    <Html position={position} center zIndexRange={[1, 10]} style={{ pointerEvents: 'auto' }}>
      {/* Outer wrapper — opacity only, no transform (avoids conflict with hover scale) */}
      <div ref={wrapRef} style={{ opacity: 1, transition: 'none' }}>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            padding: '5px 13px',
            borderRadius: 999,
            fontSize: 12,
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            letterSpacing: '0.03em',
            whiteSpace: 'nowrap',
            userSelect: 'none',
            cursor: 'default',
            transition: 'background 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s, transform 0.18s',
            background: hovered ? color : 'rgba(7,11,10,0.84)',
            color: hovered ? '#070b0a' : color,
            border: `1px solid ${hovered ? color : color + '55'}`,
            boxShadow: hovered ? `0 0 14px ${color}88` : `0 0 4px ${color}22`,
            transform: hovered ? 'scale(1.18)' : 'scale(1)',
            backdropFilter: 'blur(6px)',
          }}
        >
          {name}
        </div>
      </div>
    </Html>
  )
}

/* ── Faint wireframe shell ── */
function GhostSphere({ r }) {
  const geo = useMemo(() => new THREE.SphereGeometry(r, 48, 24), [r])
  return (
    <mesh geometry={geo}>
      <meshBasicMaterial color="#5ed29c" wireframe transparent opacity={0.15} />
    </mesh>
  )
}

/* ── Scene — camera orbits fixed positions (smooth, no Html thrash) ── */
function Scene({ positions }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]}   intensity={0.8} color="#5ed29c" />
      <pointLight position={[-5, -4, -4]} intensity={0.4} color="#4db8f0" />

      <GhostSphere r={2.1} />

      {/* Pills at FIXED world positions — camera orbits them */}
      {ALL_SKILLS.map((skill, i) => (
        <SkillPill
          key={skill.name}
          name={skill.name}
          color={skill.color}
          position={positions[i]}
        />
      ))}

      {/*
        KEY FIX:
        - autoRotate: camera orbits the fixed sphere (Html positions never change → no CSS recalc per frame)
        - enableDamping + dampingFactor: built-in smooth deceleration after drag release
        - No useFrame group rotation → zero conflict / HTML thrash
      */}
      <OrbitControls
        autoRotate
        autoRotateSpeed={1.0}
        enableDamping
        dampingFactor={0.05}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.5}
        minPolarAngle={Math.PI * 0.2}
        maxPolarAngle={Math.PI * 0.8}
      />
    </>
  )
}

/* ── Category grid cards ── */
function CategoryGrid() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))', gap: 16, marginTop: 56 }}>
      {skillGroups.map((group, i) => {
        const color = CAT_COLOR[group.category]
        return (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <div style={{
              position: 'relative', background: 'rgba(255,255,255,0.025)',
              backdropFilter: 'blur(8px)', borderRadius: 16, padding: '24px 28px',
              overflow: 'hidden', border: `1px solid ${color}22`,
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(to right, transparent, ${color}, transparent)`, opacity: 0.55 }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <span style={{ fontFamily: 'Inter', fontSize: 16, color, opacity: 0.9 }}>{group.icon}</span>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 12, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{group.category}</p>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {group.skills.map(skill => (
                  <span key={skill}
                    style={{ fontFamily: 'Inter', fontSize: 12, color: 'rgba(255,255,255,0.65)', background: `${color}0f`, border: `1px solid ${color}22`, padding: '5px 13px', borderRadius: 999, cursor: 'default', transition: 'color 0.2s, background 0.2s, border-color 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.color = color; e.currentTarget.style.background = `${color}22`; e.currentTarget.style.borderColor = `${color}55` }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; e.currentTarget.style.background = `${color}0f`; e.currentTarget.style.borderColor = `${color}22` }}
                  >{skill}</span>
                ))}
              </div>
              <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: `radial-gradient(circle, ${color}10 0%, transparent 70%)`, pointerEvents: 'none' }} />
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

/* ── Main ── */
export default function Skills() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })
  const positions = useMemo(() => fibonacciSphere(ALL_SKILLS.length, 2.1), [])
  const { isMobile } = useResponsive()

  return (
    <section id="skills" ref={sectionRef} style={{ background: '#070b0a', padding: isMobile ? '80px 16px' : '120px 24px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: 16, textAlign: 'center' }}>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 11, color: '#5ed29c', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 12 }}>Skills</p>
          <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 48px)', color: 'white', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            What I{' '}<em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: '#5ed29c' }}>work with</em>.
          </h2>
          <p style={{ fontFamily: 'Inter', fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 10, letterSpacing: '0.06em' }}>Drag to spin · hover to highlight</p>
        </motion.div>

        {/* 3D Sphere */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: '100%', height: isMobile ? 320 : 480, position: 'relative', borderRadius: isMobile ? 16 : 24, overflow: 'hidden', background: 'radial-gradient(ellipse at 50% 45%, #0e2218 0%, #070b0a 72%)', border: '1px solid rgba(94,210,156,0.08)' }}
        >
          {/* Vignette */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', background: 'radial-gradient(ellipse at 50% 50%, transparent 42%, #070b0a 100%)' }} />

          <Canvas
            camera={{ position: [0, 0, 5.8], fov: 48 }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 1.5]}
            style={{ background: 'transparent' }}
          >
            <Suspense fallback={null}>
              <Scene positions={positions} />
            </Suspense>
          </Canvas>
        </motion.div>

        {/* Legend */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px 22px', marginTop: 18 }}>
          {skillGroups.map(g => (
            <div key={g.category} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: CAT_COLOR[g.category], boxShadow: `0 0 5px ${CAT_COLOR[g.category]}` }} />
              <span style={{ fontFamily: 'Inter', fontSize: 11, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.07em' }}>{g.category}</span>
            </div>
          ))}
        </div>

        <CategoryGrid />
      </div>
    </section>
  )
}
