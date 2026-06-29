import { useRef, Suspense, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  OrbitControls,
  Float,
  MeshDistortMaterial,
  Sphere,
  RoundedBox,
  Cylinder,
} from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'

/* ═══════════════════════════════════════════════════════
   BUILDING MODEL — OurrApartment (PBR)
══════════════════════════════════════════════════════ */
function BuildingModel() {
  const groupRef = useRef()
  const t = useRef(0)

  useFrame((state, delta) => {
    t.current += delta
    if (groupRef.current) {
      // Exponential decay lerp — perfectly frame-rate independent
      const f = 1 - Math.exp(-3.5 * delta)
      const targetY = Math.sin(t.current * 0.4) * 0.32
      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * f
      const targetPY = Math.sin(t.current * 0.6) * 0.025
      groupRef.current.position.y += (targetPY - groupRef.current.position.y) * f
    }
  })

  /* Shared materials */
  const CONCRETE = { color: '#1e2d28', roughness: 0.88, metalness: 0.05 }
  const CONCRETE_LIGHT = { color: '#263830', roughness: 0.82, metalness: 0.06 }
  const GLASS_WIN = { color: '#5ec8ff', emissive: '#38a8e0', emissiveIntensity: 0.7, roughness: 0.05, metalness: 0.9, transparent: true, opacity: 0.85 }
  const GLASS_WIN_OFF = { color: '#152535', roughness: 0.1, metalness: 0.5, transparent: true, opacity: 0.7 }
  const ACCENT = { color: '#5ed29c', emissive: '#5ed29c', emissiveIntensity: 0.55, roughness: 0.25, metalness: 0.4 }
  const STEEL = { color: '#8ab0a0', roughness: 0.25, metalness: 0.85 }
  const LOBBY_GLASS = { color: '#5ed29c', emissive: '#2a8c60', emissiveIntensity: 0.2, roughness: 0.02, metalness: 0.9, transparent: true, opacity: 0.55 }

  const windowPattern = [
    // [x, y, lit]
    [-0.56, 2.7, true],  [-0.0, 2.7, false], [0.56, 2.7, true],
    [-0.56, 2.05, true], [-0.0, 2.05, true],  [0.56, 2.05, false],
    [-0.56, 1.4, false], [-0.0, 1.4, true],  [0.56, 1.4, true],
    [-0.56, 0.75, true], [-0.0, 0.75, false], [0.56, 0.75, true],
  ]

  return (
    <group ref={groupRef} position={[0, -0.6, 0]} scale={0.55}>
      {/* ── Ground slab ── */}
      <mesh position={[0, -0.08, 0]} receiveShadow>
        <boxGeometry args={[3.8, 0.16, 2.8]} />
        <meshStandardMaterial color="#111a16" roughness={0.95} metalness={0.02} />
      </mesh>

      {/* ── Pavement edge trim ── */}
      <mesh position={[0, 0.0, 0]}>
        <boxGeometry args={[3.82, 0.06, 2.82]} />
        <meshStandardMaterial {...ACCENT} emissiveIntensity={0.15} />
      </mesh>

      {/* ── Left wing ── */}
      <mesh position={[-1.3, 1.1, 0.05]} castShadow receiveShadow>
        <boxGeometry args={[1.0, 2.2, 1.3]} />
        <meshStandardMaterial {...CONCRETE_LIGHT} />
      </mesh>
      {/* Left wing cap */}
      <mesh position={[-1.3, 2.24, 0.05]}>
        <boxGeometry args={[1.02, 0.08, 1.32]} />
        <meshStandardMaterial {...ACCENT} emissiveIntensity={0.25} />
      </mesh>

      {/* ── Right wing ── */}
      <mesh position={[1.3, 1.1, 0.05]} castShadow receiveShadow>
        <boxGeometry args={[1.0, 2.2, 1.3]} />
        <meshStandardMaterial {...CONCRETE_LIGHT} />
      </mesh>
      <mesh position={[1.3, 2.24, 0.05]}>
        <boxGeometry args={[1.02, 0.08, 1.32]} />
        <meshStandardMaterial {...ACCENT} emissiveIntensity={0.25} />
      </mesh>

      {/* ── Central tower ── */}
      <mesh position={[0, 1.9, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.9, 3.8, 1.5]} />
        <meshStandardMaterial {...CONCRETE} />
      </mesh>

      {/* Tower vertical fins (depth detail) */}
      {[-0.7, 0, 0.7].map((x, i) => (
        <mesh key={`fin-${i}`} position={[x, 1.9, 0.78]}>
          <boxGeometry args={[0.06, 3.8, 0.06]} />
          <meshStandardMaterial {...STEEL} />
        </mesh>
      ))}

      {/* ── Tower crown ── */}
      <mesh position={[0, 3.88, 0]}>
        <boxGeometry args={[1.92, 0.14, 1.52]} />
        <meshStandardMaterial {...ACCENT} />
      </mesh>

      {/* ── Setback floor (mechanical level) ── */}
      <mesh position={[0, 4.15, 0]}>
        <boxGeometry args={[1.5, 0.4, 1.1]} />
        <meshStandardMaterial color="#182420" roughness={0.75} metalness={0.2} />
      </mesh>

      {/* ── Antenna ── */}
      <mesh position={[0.28, 4.72, 0]}>
        <cylinderGeometry args={[0.022, 0.022, 1.1, 10]} />
        <meshStandardMaterial {...STEEL} />
      </mesh>
      {/* Antenna beacon */}
      <mesh position={[0.28, 5.3, 0]}>
        <sphereGeometry args={[0.055, 12, 12]} />
        <meshStandardMaterial color="#5ed29c" emissive="#5ed29c" emissiveIntensity={2.5} roughness={0.1} />
      </mesh>
      {/* Beacon glow ring */}
      <mesh position={[0.28, 5.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.11, 0.012, 8, 24]} />
        <meshStandardMaterial color="#5ed29c" emissive="#5ed29c" emissiveIntensity={1.5} transparent opacity={0.6} />
      </mesh>

      {/* ── Tower windows ── */}
      {windowPattern.map(([x, y, lit], i) => (
        <mesh key={`win-${i}`} position={[x, y, 0.78]}>
          <boxGeometry args={[0.3, 0.42, 0.03]} />
          <meshStandardMaterial {...(lit ? GLASS_WIN : GLASS_WIN_OFF)} />
        </mesh>
      ))}

      {/* ── Wing side windows ── */}
      {[-1.3, 1.3].map((x, side) =>
        [0.6, 1.3, 1.9].map((y, row) => (
          <mesh key={`sw-${side}-${row}`} position={[x, y, 0.68]}>
            <boxGeometry args={[0.26, 0.34, 0.03]} />
            <meshStandardMaterial {...(row === 1 ? GLASS_WIN : GLASS_WIN_OFF)} />
          </mesh>
        ))
      )}

      {/* ── Lobby glass ── */}
      <mesh position={[0, 0.4, 0.76]}>
        <boxGeometry args={[0.72, 0.65, 0.03]} />
        <meshStandardMaterial {...LOBBY_GLASS} />
      </mesh>
      {/* Lobby frame */}
      <mesh position={[0, 0.4, 0.77]}>
        <boxGeometry args={[0.74, 0.67, 0.02]} />
        <meshStandardMaterial color="#5ed29c" emissive="#5ed29c" emissiveIntensity={0.3} roughness={0.3} metalness={0.8} transparent opacity={0.0}
          wireframe />
      </mesh>

      {/* ── Entry canopy ── */}
      <mesh position={[0, 0.82, 0.96]}>
        <boxGeometry args={[1.0, 0.05, 0.4]} />
        <meshStandardMaterial {...STEEL} emissive="#5ed29c" emissiveIntensity={0.1} />
      </mesh>

      {/* ── Steps ── */}
      {[0, 1, 2].map((s) => (
        <mesh key={`step-${s}`} position={[0, s * 0.07, 0.8 + s * 0.1 + 0.15]}>
          <boxGeometry args={[0.9 - s * 0.08, 0.07, 0.2]} />
          <meshStandardMaterial color="#111a16" roughness={0.92} />
        </mesh>
      ))}

      {/* ── Horizontal floor bands ── */}
      {[0.72, 1.38, 2.04, 2.7, 3.36].map((y, i) => (
        <mesh key={`band-${i}`} position={[0, y, 0]}>
          <boxGeometry args={[1.92, 0.055, 1.52]} />
          <meshStandardMaterial color="#32504a" roughness={0.6} metalness={0.3} />
        </mesh>
      ))}
    </group>
  )
}

/* ═══════════════════════════════════════════════════════
   WHITEBOARD MODEL (PBR)
══════════════════════════════════════════════════════ */
function WhiteboardModel() {
  const groupRef = useRef()
  const markerRef = useRef()
  const t = useRef(0)

  useFrame((state, delta) => {
    t.current += delta
    if (groupRef.current) {
      // Exponential decay lerp — perfectly frame-rate independent
      const f = 1 - Math.exp(-3.5 * delta)
      const targetY = Math.sin(t.current * 0.4) * 0.32
      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * f
      const targetPY = Math.sin(t.current * 0.55) * 0.022
      groupRef.current.position.y += (targetPY - groupRef.current.position.y) * f
    }
    if (markerRef.current) {
      // Slower, smoother Lissajous path — delta compensated
      const mf = 1 - Math.exp(-4.0 * delta)
      const targetMX = Math.sin(t.current * 1.1) * 0.5
      const targetMY = Math.cos(t.current * 0.85) * 0.2 + 0.04
      markerRef.current.position.x += (targetMX - markerRef.current.position.x) * mf
      markerRef.current.position.y += (targetMY - markerRef.current.position.y) * mf
    }
  })

  const FRAME  = { color: '#1a3a5c', emissive: '#4db8f0', emissiveIntensity: 0.25, roughness: 0.3, metalness: 0.75 }
  const BOARD  = { color: '#f2faf8', roughness: 0.18, metalness: 0.0 }
  const TRAY   = { color: '#1e3050', roughness: 0.5, metalness: 0.6 }
  const MARKER_BODY = { color: '#4db8f0', roughness: 0.35, metalness: 0.5 }
  const ERASER = { color: '#ffe4e1', roughness: 0.85, metalness: 0.0 }
  const DOT    = { color: '#4db8f0', emissive: '#4db8f0', emissiveIntensity: 1.8 }

  const drawLines = [
    { pos: [-0.7, 0.45, 0.045], size: [0.85, 0.038, 0.01], color: '#4db8f0' },
    { pos: [-0.2, 0.18, 0.045], size: [0.55, 0.038, 0.01], color: '#5ed29c' },
    { pos: [ 0.5,-0.18, 0.045], size: [0.75, 0.038, 0.01], color: '#a78bfa' },
    { pos: [-0.6,-0.32, 0.045], size: [0.42, 0.038, 0.01], color: '#f9a8d4' },
    { pos: [ 0.2, 0.55, 0.045], size: [0.32, 0.038, 0.01], color: '#fbbf24' },
    { pos: [-0.3,-0.05, 0.045], size: [0.28, 0.038, 0.01], color: '#34d399' },
  ]

  return (
    <group ref={groupRef} position={[0, -0.1, 0]} scale={0.88}>
      {/* Board surface */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[3.4, 2.1, 0.065]} />
        <meshStandardMaterial {...BOARD} />
      </mesh>

      {/* Board subtle grid shadow */}
      <mesh position={[0, 0, 0.034]}>
        <boxGeometry args={[3.38, 2.08, 0.003]} />
        <meshStandardMaterial color="#e0f0ec" roughness={0.4} />
      </mesh>

      {/* ── Frame bars (rounded via scale) ── */}
      {/* Top */}
      <mesh position={[0, 1.12, 0]}>
        <boxGeometry args={[3.56, 0.15, 0.12]} />
        <meshStandardMaterial {...FRAME} />
      </mesh>
      {/* Bottom / tray */}
      <mesh position={[0, -1.12, 0]}>
        <boxGeometry args={[3.56, 0.18, 0.18]} />
        <meshStandardMaterial {...TRAY} />
      </mesh>
      {/* Left */}
      <mesh position={[-1.77, 0, 0]}>
        <boxGeometry args={[0.15, 2.26, 0.12]} />
        <meshStandardMaterial {...FRAME} />
      </mesh>
      {/* Right */}
      <mesh position={[1.77, 0, 0]}>
        <boxGeometry args={[0.15, 2.26, 0.12]} />
        <meshStandardMaterial {...FRAME} />
      </mesh>

      {/* Corner bolts */}
      {[[-1.74, 1.1], [1.74, 1.1], [-1.74, -1.1], [1.74, -1.1]].map(([x, y], i) => (
        <mesh key={`bolt-${i}`} position={[x, y, 0.07]}>
          <cylinderGeometry args={[0.055, 0.055, 0.05, 10]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#8ab0d0" roughness={0.2} metalness={0.9} />
        </mesh>
      ))}

      {/* ── Corner glow dots ── */}
      {[[-1.7, 1.06], [1.7, 1.06], [-1.7, -1.06], [1.7, -1.06]].map(([x, y], i) => (
        <mesh key={`dot-${i}`} position={[x, y, 0.065]}>
          <sphereGeometry args={[0.055, 10, 10]} />
          <meshStandardMaterial {...DOT} />
        </mesh>
      ))}

      {/* ── Sketch marks ── */}
      {drawLines.map((line, i) => (
        <mesh key={`line-${i}`} position={line.pos}>
          <boxGeometry args={line.size} />
          <meshStandardMaterial color={line.color} roughness={0.8} />
        </mesh>
      ))}

      {/* ── Animated marker (drawing) ── */}
      <group ref={markerRef} position={[0, 0.05, 0.052]}>
        {/* Body */}
        <mesh>
          <cylinderGeometry args={[0.055, 0.055, 0.62, 12]} />
          <meshStandardMaterial {...MARKER_BODY} />
        </mesh>
        {/* Cap clip */}
        <mesh position={[0, 0.34, 0]}>
          <boxGeometry args={[0.025, 0.3, 0.015]} />
          <meshStandardMaterial color="#f0f8ff" roughness={0.3} metalness={0.6} />
        </mesh>
        {/* Tip */}
        <mesh position={[0, -0.38, 0]}>
          <coneGeometry args={[0.055, 0.1, 12]} />
          <meshStandardMaterial color="#1a1a2e" roughness={0.5} />
        </mesh>
        {/* Ink dot on board */}
        <mesh position={[0, -0.44, 0]}>
          <sphereGeometry args={[0.018, 8, 8]} />
          <meshStandardMaterial color="#4db8f0" emissive="#4db8f0" emissiveIntensity={1.0} />
        </mesh>
      </group>

      {/* ── Eraser ── */}
      <mesh position={[-0.55, -1.2, 0.12]}>
        <boxGeometry args={[0.38, 0.13, 0.19]} />
        <meshStandardMaterial {...ERASER} />
      </mesh>
      {/* Eraser felt strip */}
      <mesh position={[-0.55, -1.2, 0.225]}>
        <boxGeometry args={[0.38, 0.07, 0.01]} />
        <meshStandardMaterial color="#c8d8d4" roughness={1.0} />
      </mesh>

      {/* Marker on tray */}
      <group position={[0.5, -1.2, 0.13]} rotation={[0, 0, Math.PI / 2]}>
        <mesh>
          <cylinderGeometry args={[0.048, 0.048, 0.58, 12]} />
          <meshStandardMaterial color="#5ed29c" roughness={0.35} metalness={0.5} />
        </mesh>
        <mesh position={[0, -0.32, 0]}>
          <coneGeometry args={[0.048, 0.09, 12]} />
          <meshStandardMaterial color="#1a1a2e" roughness={0.5} />
        </mesh>
      </group>

      {/* ── Stand legs ── */}
      {[-0.9, 0.9].map((x, i) => (
        <group key={`leg-${i}`} position={[x, -1.35, 0]}>
          {/* Upper leg */}
          <mesh position={[0, -0.2, -0.15]} rotation={[0.35, 0, i === 0 ? 0.1 : -0.1]}>
            <cylinderGeometry args={[0.038, 0.038, 0.9, 10]} />
            <meshStandardMaterial color="#1e3050" roughness={0.4} metalness={0.7} />
          </mesh>
          {/* Foot pad */}
          <mesh position={[i === 0 ? -0.08 : 0.08, -0.62, -0.26]}>
            <boxGeometry args={[0.12, 0.04, 0.18]} />
            <meshStandardMaterial color="#111a28" roughness={0.9} />
          </mesh>
        </group>
      ))}
      {/* Cross brace */}
      <mesh position={[0, -1.5, -0.2]} rotation={[0.35, 0, 0]}>
        <cylinderGeometry args={[0.022, 0.022, 1.85, 8]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#1e3050" roughness={0.4} metalness={0.7} />
      </mesh>
    </group>
  )
}

/* ═══════════════════════════════════════════════════════
   SCENE CONFIGS
══════════════════════════════════════════════════════ */
const scenes = {
  building: {
    Component: BuildingModel,
    bg: 'radial-gradient(ellipse at 60% 30%, #0a1f17 0%, #050d09 100%)',
    accent: '#5ed29c',
    label: 'Apartment Complex',
    // Pulled back significantly so full building fits in view
    camPos: [0, 0.8, 9.0],
    fov: 42,
  },
  whiteboard: {
    Component: WhiteboardModel,
    bg: 'radial-gradient(ellipse at 40% 30%, #071628 0%, #040b14 100%)',
    accent: '#4db8f0',
    label: 'Collaboration Board',
    camPos: [0, 0, 5.2],
    fov: 46,
  },
}

/* ═══════════════════════════════════════════════════════
   EXPORTED COMPONENT  
   KEY FIX: Canvas only mounts when visible=true
══════════════════════════════════════════════════════ */
export default function ProjectModel({ type, visible }) {
  const scene = scenes[type]
  if (!scene) return null
  const { Component, bg, accent, label, camPos, fov } = scene

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="model-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 20,
            overflow: 'hidden',
            background: bg,
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Ambient glow halo */}
          <div style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: `radial-gradient(ellipse at 70% 20%, ${accent}18 0%, transparent 60%)`,
          }} />
          <div style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: `radial-gradient(ellipse at 20% 80%, ${accent}10 0%, transparent 55%)`,
          }} />

          {/* Canvas — only renders when mounted (visible=true) */}
          <div style={{ flex: 1, width: '100%' }}>
            <Canvas
              camera={{ position: camPos, fov }}
              gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
              shadows
              dpr={[1, 1.5]}
              style={{ background: 'transparent' }}
            >
              <Suspense fallback={null}>
                {/* Lighting rig */}
                <ambientLight intensity={0.5} />
                <directionalLight
                  position={[5, 8, 5]}
                  intensity={2.0}
                  color="#ffffff"
                  castShadow
                  shadow-mapSize-width={512}
                  shadow-mapSize-height={512}
                />
                <directionalLight position={[-4, 2, -3]} intensity={0.4} color={accent} />
                <pointLight position={[0, 4, 3]} intensity={1.2} color={accent} distance={12} />
                <pointLight position={[3, -1, 2]}  intensity={0.6} color="#ffffff" distance={8} />
                {/* Rim light from below */}
                <pointLight position={[0, -3, 2]} intensity={0.35} color={accent} distance={6} />

                {/* No Float wrapper — each model handles its own smooth lerp animation in useFrame */}
                <Component />

                <OrbitControls
                  enableZoom={true}
                  minDistance={4}
                  maxDistance={12}
                  enablePan={false}
                  minPolarAngle={Math.PI / 5}
                  maxPolarAngle={Math.PI * 0.72}
                  rotateSpeed={0.6}
                  touches={{
                    ONE: THREE.TOUCH.NONE,
                    TWO: THREE.TOUCH.ROTATE
                  }}
                />
              </Suspense>
            </Canvas>
          </div>

          {/* Label bar */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '10px 20px 14px',
            background: `linear-gradient(to top, ${accent}18, transparent)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
          }}>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.2em',
              color: accent,
              textTransform: 'uppercase',
              margin: 0,
            }}>{label}</p>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 9,
              color: 'rgba(255,255,255,0.3)',
              letterSpacing: '0.08em',
              margin: 0,
            }}>drag to rotate · hover to explore</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
