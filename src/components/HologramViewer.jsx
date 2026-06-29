import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

/* ─────────────────────────────────────────
   Wireframe box helper
───────────────────────────────────────── */
function WireBox({ args, position = [0, 0, 0], rotation, color, opacity = 0.82 }) {
  return (
    <mesh position={position} rotation={rotation}>
      <boxGeometry args={args} />
      <meshBasicMaterial color={color} wireframe transparent opacity={opacity} />
    </mesh>
  )
}

/* ─────────────────────────────────────────
   BUILDING — front view, slow rotation
───────────────────────────────────────── */
function HoloBuildingModel({ color }) {
  const groupRef = useRef()

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.36
  })

  return (
    <group ref={groupRef} position={[0, -1.5, 0]}>
      {/* Ground slab */}
      <WireBox args={[2.9, 0.07, 1.0]} position={[0, 0, 0]} color={color} opacity={0.45} />

      {/* Wings */}
      <WireBox args={[0.72, 1.85, 0.9]} position={[-0.94, 0.97, 0]} color={color} opacity={0.75} />
      <WireBox args={[0.72, 1.85, 0.9]} position={[ 0.94, 0.97, 0]} color={color} opacity={0.75} />

      {/* Wing floor dividers */}
      {[0.55, 1.2, 1.85].map((y, i) => (
        <WireBox key={`wfl-${i}`} args={[0.73, 0.03, 0.91]} position={[-0.94, y, 0]} color={color} opacity={0.4} />
      ))}
      {[0.55, 1.2, 1.85].map((y, i) => (
        <WireBox key={`wfr-${i}`} args={[0.73, 0.03, 0.91]} position={[ 0.94, y, 0]} color={color} opacity={0.4} />
      ))}

      {/* Main tower body */}
      <WireBox args={[1.28, 3.2, 0.95]} position={[0, 1.64, 0]} color={color} opacity={0.88} />

      {/* Tower floor dividers */}
      {[0.65, 1.3, 1.95, 2.6].map((y, i) => (
        <WireBox key={`fl-${i}`} args={[1.30, 0.03, 0.96]} position={[0, y, 0]} color={color} opacity={0.42} />
      ))}

      {/* Tower windows — front face 3×4 grid */}
      {[0.32, 0.98, 1.62, 2.27].map((y, i) =>
        [-0.38, 0, 0.38].map((x, j) => (
          <WireBox
            key={`win-${i}-${j}`}
            args={[0.2, 0.3, 0.02]}
            position={[x, y, 0.49]}
            color={color}
            opacity={i % 2 === j % 2 ? 0.88 : 0.42}
          />
        ))
      )}

      {/* Crown + penthouse */}
      <WireBox args={[1.30, 0.09, 0.95]} position={[0, 3.27, 0]} color={color} opacity={0.95} />
      <WireBox args={[0.8,  0.38, 0.65]} position={[0, 3.52, 0]} color={color} opacity={0.72} />

      {/* Antenna + beacon */}
      <mesh position={[0.2, 3.98, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.82, 6]} />
        <meshBasicMaterial color={color} transparent opacity={0.9} />
      </mesh>
      <mesh position={[0.2, 4.41, 0]}>
        <sphereGeometry args={[0.048, 8, 8]} />
        <meshBasicMaterial color={color} transparent opacity={1} />
      </mesh>

      {/* Ground floor lobby windows */}
      {[-0.55, 0, 0.55].map((x, i) => (
        <WireBox key={`lb-${i}`} args={[0.28, 0.44, 0.02]} position={[x, 0.27, 0.49]} color={color} opacity={0.65} />
      ))}
    </group>
  )
}

/* ─────────────────────────────────────────
   WHITEBOARD — front view, slow rotation
───────────────────────────────────────── */
function HoloWhiteboardModel({ color }) {
  const groupRef = useRef()
  const markerRef = useRef()
  const t = useRef(0)

  useFrame((_, delta) => {
    t.current += delta
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.36
    if (markerRef.current) {
      markerRef.current.position.x = Math.sin(t.current * 1.1) * 0.52
      markerRef.current.position.y = Math.cos(t.current * 0.85) * 0.22 + 1.0
    }
  })

  const lines = [
    { pos: [-0.48, 1.12, 0.025], size: [0.72, 0.024, 0.01] },
    { pos: [-0.15, 0.90, 0.025], size: [0.45, 0.024, 0.01] },
    { pos: [ 0.35, 0.70, 0.025], size: [0.62, 0.024, 0.01] },
    { pos: [-0.42, 0.50, 0.025], size: [0.38, 0.024, 0.01] },
    { pos: [ 0.15, 0.30, 0.025], size: [0.52, 0.024, 0.01] },
  ]

  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      {/* Outer frame */}
      <WireBox args={[1.95, 1.38, 0.04]} position={[0, 1.0, 0]} color={color} opacity={0.72} />
      {/* Board surface (dim fill) */}
      <WireBox args={[1.8, 1.22, 0.02]} position={[0, 1.0, 0.02]} color={color} opacity={0.18} />

      {/* Drawn lines */}
      {lines.map((l, i) => (
        <mesh key={i} position={l.pos}>
          <boxGeometry args={l.size} />
          <meshBasicMaterial color={color} transparent opacity={0.72 - i * 0.1} />
        </mesh>
      ))}

      {/* Chalk tray */}
      <WireBox args={[1.82, 0.08, 0.1]} position={[0, 0.34, 0.04]} color={color} opacity={0.58} />

      {/* Stand legs */}
      {[[-0.7, 0.17], [0.7, 0.17]].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0]}>
          <cylinderGeometry args={[0.022, 0.022, 0.95, 7]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0.65} />
        </mesh>
      ))}

      {/* Animated marker */}
      <mesh ref={markerRef} position={[0, 1.0, 0.04]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.028, 0.022, 0.26, 7]} />
        <meshBasicMaterial color={color} transparent opacity={0.92} />
      </mesh>
    </group>
  )
}

/* ─────────────────────────────────────────
   Scene configs
───────────────────────────────────────── */
const SCENES = {
  building:   { Component: HoloBuildingModel,   color: '#5ed29c', camPos: [0, 1.5, 6.5], fov: 40 },
  whiteboard: { Component: HoloWhiteboardModel, color: '#4db8f0', camPos: [0, 0.8, 5.5], fov: 38 },
}

/* ─────────────────────────────────────────
   Main export — always visible, no box
   Blends seamlessly with dark background
───────────────────────────────────────── */
export default function HologramViewer({ type }) {
  const scene = SCENES[type]
  if (!scene) return null
  const { Component, color, camPos, fov } = scene

  return (
    <>
      <style>{`
        @keyframes holoBeam_${type} {
          0%   { top: 100%; opacity: 0 }
          4%   { opacity: 1 }
          94%  { opacity: 0.9 }
          100% { top: -70px; opacity: 0 }
        }
        @keyframes sourcePulse_${type} {
          0%, 100% { box-shadow: 0 0 10px 4px ${color}88, 0 0 28px 10px ${color}44, 0 0 55px 18px ${color}22 }
          50%       { box-shadow: 0 0 18px 7px ${color}cc, 0 0 45px 16px ${color}66, 0 0 80px 28px ${color}33 }
        }
      `}</style>

      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        /* Radial mask — fades into the dark background, NO hard edges */
        maskImage:       'radial-gradient(ellipse 88% 108% at 50% 108%, black 18%, rgba(0,0,0,0.9) 42%, rgba(0,0,0,0.55) 68%, transparent 88%)',
        WebkitMaskImage: 'radial-gradient(ellipse 88% 108% at 50% 108%, black 18%, rgba(0,0,0,0.9) 42%, rgba(0,0,0,0.55) 68%, transparent 88%)',
      }}>

        {/* ── Static horizontal scanlines ── */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
          background: `repeating-linear-gradient(
            0deg,
            transparent 0px, transparent 2px,
            ${color}08 2px, ${color}08 3px
          )`,
        }} />

        {/* ── Animated scan beam sweeps bottom → top ── */}
        <div style={{
          position: 'absolute',
          left: 0, right: 0, height: 70,
          zIndex: 3, pointerEvents: 'none',
          background: `linear-gradient(to bottom, transparent, ${color}1c 50%, transparent)`,
          animation: `holoBeam_${type} 3.2s ease-in-out infinite`,
        }} />

        {/* ── Three.js canvas — transparent bg + screen blend ──
            screen blend: dark areas disappear, bright wireframe shows through */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
          <Canvas
            camera={{ position: camPos, fov }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 1.5]}
            style={{ background: 'transparent', mixBlendMode: 'screen' }}
          >
            {/* Strong point lights colored to model — make wires glow */}
            <pointLight position={[0, 4, 5]}  intensity={5}   color={color} />
            <pointLight position={[-2, 1, 4]} intensity={2.2} color={color} />
            <pointLight position={[2, -1, 3]} intensity={1.4} color={color} />
            <ambientLight intensity={0.5} color={color} />

            <Suspense fallback={null}>
              <Component color={color} />
            </Suspense>
          </Canvas>
        </div>

        {/* ── Projection source — bright glowing dot at base ── */}
        <div style={{
          position: 'absolute', bottom: 6, left: '50%',
          transform: 'translateX(-50%)',
          width: 7, height: 7, borderRadius: '50%',
          background: color,
          zIndex: 5,
          animation: `sourcePulse_${type} 2.2s ease-in-out infinite`,
        }} />

        {/* ── Projection source ellipse glow ── */}
        <div style={{
          position: 'absolute', bottom: 3, left: '50%',
          transform: 'translateX(-50%)',
          width: 85, height: 7,
          borderRadius: '50%',
          background: `${color}44`,
          filter: 'blur(5px)',
          zIndex: 4,
        }} />
      </div>
    </>
  )
}
