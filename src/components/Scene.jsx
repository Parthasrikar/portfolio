import { useFrame } from '@react-three/fiber'
import { Float, Stars, Environment, Sphere, Torus, MeshDistortMaterial, useTexture } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'
import { useScroll as useDreiScroll } from '@react-three/drei'

// Planet 1: Jupiter (Stylized with Rings)
const Jupiter = ({ scroll }) => {
    const mesh = useRef()
    const ring = useRef()
    const ring2 = useRef()

    useFrame((state, delta) => {
        const offset = scroll.offset

        // Custom path logic
        let tx = -3, ty = 0, tz = -2
        if (offset < 0.25) {
            const t = offset / 0.25
            tx = THREE.MathUtils.lerp(-3, -8, t)
            ty = THREE.MathUtils.lerp(0, 4, t)
            tz = THREE.MathUtils.lerp(-2, -10, t)
        } else if (offset < 0.5) {
            const t = (offset - 0.25) / 0.25
            tx = THREE.MathUtils.lerp(-8, 5, t)
            ty = THREE.MathUtils.lerp(4, -2, t)
            tz = THREE.MathUtils.lerp(-10, 0, t)
        } else if (offset < 0.75) {
            const t = (offset - 0.5) / 0.25
            tx = THREE.MathUtils.lerp(5, -5, t)
            ty = THREE.MathUtils.lerp(-2, 2, t)
            tz = THREE.MathUtils.lerp(0, -5, t)
        } else {
            const t = (offset - 0.75) / 0.25
            tx = THREE.MathUtils.lerp(-5, 0, t)
            ty = THREE.MathUtils.lerp(2, 0, t)
            tz = THREE.MathUtils.lerp(-5, -2, t)
        }

        mesh.current.position.lerp(new THREE.Vector3(tx, ty, tz), 0.1)
        mesh.current.rotation.y += delta * 0.1

        if (ring.current) {
            ring.current.rotation.x = -Math.PI / 2 + Math.sin(state.clock.elapsedTime * 0.2) * 0.1
            ring.current.rotation.z += delta * 0.05
        }
    })

    return (
        <group ref={mesh} position={[-3, 0, -2]}>
            <Sphere args={[1.5, 64, 64]}>
                {/* Orange/Brownish banded look using distortion speed to simulate flowing gas */}
                <MeshDistortMaterial
                    color="#d97706"
                    speed={2}
                    distort={0.1}
                    radius={1}
                />
            </Sphere>
            <Torus ref={ring} args={[2.5, 0.15, 2, 64]} rotation={[-Math.PI / 2, 0, 0]}>
                <meshStandardMaterial color="#fbbf24" metalness={0.4} roughness={0.4} />
            </Torus>
            <Torus ref={ring2} args={[3, 0.1, 2, 64]} rotation={[-Math.PI / 2.1, 0, 0]}>
                <meshStandardMaterial color="#92400e" metalness={0.4} roughness={0.4} />
            </Torus>
        </group>
    )
}

// Planet 2: Earth (Blue with Green Landmasses)
const Earth = ({ scroll }) => {
    const mesh = useRef()

    useFrame((state, delta) => {
        const offset = scroll.offset
        let tx = 3, ty = 2, tz = -4

        if (offset < 0.25) {
            const t = offset / 0.25
            tx = THREE.MathUtils.lerp(3, 8, t)
            ty = THREE.MathUtils.lerp(2, 0, t)
            tz = THREE.MathUtils.lerp(-4, -15, t)
        } else if (offset < 0.5) {
            const t = (offset - 0.25) / 0.25
            tx = THREE.MathUtils.lerp(8, -4, t)
            ty = THREE.MathUtils.lerp(0, 3, t)
            tz = THREE.MathUtils.lerp(-15, -2, t)
        } else if (offset < 0.75) {
            const t = (offset - 0.5) / 0.25
            tx = THREE.MathUtils.lerp(-4, 4, t)
            ty = THREE.MathUtils.lerp(3, -3, t)
            tz = THREE.MathUtils.lerp(-2, -8, t)
        } else {
            const t = (offset - 0.75) / 0.25
            tx = THREE.MathUtils.lerp(4, 3, t)
            ty = THREE.MathUtils.lerp(-3, 2, t)
            tz = THREE.MathUtils.lerp(-8, -4, t)
        }

        mesh.current.position.lerp(new THREE.Vector3(tx, ty, tz), 0.1)
        mesh.current.rotation.y += delta * 0.15
    })

    return (
        <group ref={mesh} position={[3, 2, -4]}>
            {/* Water Sphere */}
            <Sphere args={[1.2, 64, 64]}>
                <meshStandardMaterial color="#1d4ed8" metalness={0.2} roughness={0.1} />
            </Sphere>
            {/* Landmasses (Distorted Green Sphere) */}
            <Sphere args={[1.21, 64, 64]}>
                <MeshDistortMaterial
                    color="#4ade80"
                    transparent
                    opacity={0.5}
                    distort={0.4}
                    speed={0.5}
                    roughness={0.8}
                />
            </Sphere>
            {/* Atmosphere Glow */}
            <Sphere args={[1.35, 64, 64]}>
                <meshStandardMaterial color="#60a5fa" transparent opacity={0.15} blending={THREE.AdditiveBlending} side={THREE.BackSide} />
            </Sphere>
        </group>
    )
}

// Planet 3: Moon (Gray with Dark Spots)
const Moon = ({ scroll }) => {
    const mesh = useRef()
    useFrame((state, delta) => {
        const offset = scroll.offset
        let tx = 4, ty = -2, tz = -3

        if (offset < 0.25) {
            const t = offset / 0.25
            tx = THREE.MathUtils.lerp(4, 0, t)
            ty = THREE.MathUtils.lerp(-2, -5, t)
            tz = THREE.MathUtils.lerp(-3, 0, t)
        } else if (offset < 0.5) {
            const t = (offset - 0.25) / 0.25
            tx = THREE.MathUtils.lerp(0, 0, t)
            ty = THREE.MathUtils.lerp(-5, 0, t)
            tz = THREE.MathUtils.lerp(0, -10, t)
        } else if (offset < 0.75) {
            const t = (offset - 0.5) / 0.25
            tx = THREE.MathUtils.lerp(0, 0, t)
            ty = THREE.MathUtils.lerp(0, 0, t)
            tz = THREE.MathUtils.lerp(-10, 0, t)
        } else {
            const t = (offset - 0.75) / 0.25
            tx = THREE.MathUtils.lerp(0, 4, t)
            ty = THREE.MathUtils.lerp(0, -2, t)
            tz = THREE.MathUtils.lerp(0, -3, t)
        }

        mesh.current.position.lerp(new THREE.Vector3(tx, ty, tz), 0.1)
        mesh.current.rotation.y += delta * 0.05
    })

    return (
        <group ref={mesh} position={[4, -2, -3]}>
            <Sphere args={[0.6, 64, 64]}>
                <meshStandardMaterial color="#d1d5db" roughness={0.9} metalness={0.1} />
            </Sphere>

            {/* Physical Spots/Craters */}
            <Sphere args={[0.15, 32, 32]} position={[0.4, 0.2, 0.3]}>
                <meshStandardMaterial color="#4b5563" roughness={1} />
            </Sphere>
            <Sphere args={[0.1, 32, 32]} position={[-0.3, -0.4, 0.4]}>
                <meshStandardMaterial color="#374151" roughness={1} />
            </Sphere>
            <Sphere args={[0.12, 32, 32]} position={[0.1, 0.5, 0.4]}>
                <meshStandardMaterial color="#4b5563" roughness={1} />
            </Sphere>
            <Sphere args={[0.2, 32, 32]} position={[-0.4, 0.1, 0.3]}>
                <meshStandardMaterial color="#374151" roughness={1} />
            </Sphere>
        </group>
    )
}


// Helper to get dynamic position based on scroll offset (matches Moon logic)
const getMoonPosition = (offset) => {
    let tx = 4, ty = -2, tz = -3
    if (offset < 0.25) {
        const t = offset / 0.25
        tx = THREE.MathUtils.lerp(4, 0, t)
        ty = THREE.MathUtils.lerp(-2, -5, t)
        tz = THREE.MathUtils.lerp(-3, 0, t)
    } else if (offset < 0.5) {
        const t = (offset - 0.25) / 0.25
        tx = THREE.MathUtils.lerp(0, 0, t)
        ty = THREE.MathUtils.lerp(-5, 0, t)
        tz = THREE.MathUtils.lerp(0, -10, t)
    } else if (offset < 0.75) {
        const t = (offset - 0.5) / 0.25
        tx = THREE.MathUtils.lerp(0, 0, t)
        ty = THREE.MathUtils.lerp(0, 0, t)
        tz = THREE.MathUtils.lerp(-10, 0, t)
    } else {
        const t = (offset - 0.75) / 0.25
        tx = THREE.MathUtils.lerp(0, 4, t)
        ty = THREE.MathUtils.lerp(0, -2, t)
        tz = THREE.MathUtils.lerp(0, -3, t)
    }
    return new THREE.Vector3(tx, ty, tz)
}

// Helper for Earth position (matches Earth logic)
const getEarthPosition = (offset) => {
    let tx = 3, ty = 2, tz = -4
    if (offset < 0.25) {
        const t = offset / 0.25
        tx = THREE.MathUtils.lerp(3, 8, t)
        ty = THREE.MathUtils.lerp(2, 0, t)
        tz = THREE.MathUtils.lerp(-4, -15, t)
    }
    // We only really need Earth pos for the first phase
    return new THREE.Vector3(tx, ty, tz)
}

// Comets Component (Shooting Stars) - Slower, Steeper, Fiery
const Comets = () => {
    const group = useRef()
    const cometsData = useRef([
        { x: -10, y: 10, z: -10, speed: 0.01, delay: 0 },
        { x: -15, y: 5, z: -15, speed: 0.1, delay: 2 },
        { x: -20, y: 0, z: -12, speed: 0.01, delay: 4 }
    ])

    useFrame((state, delta) => {
        if (!group.current) return

        group.current.children.forEach((mesh, i) => {
            const data = cometsData.current[i]

            // Move comet
            mesh.position.x += data.speed
            mesh.position.y -= data.speed * 0.2 // Steeper angle

            // Reset if out of view
            if (mesh.position.x > 15 || mesh.position.y < -10) {
                mesh.position.x = -15 - Math.random() * 10
                mesh.position.y = 10 + Math.random() * 5
                mesh.position.z = -10 - Math.random() * 10
            }
        })
    })

    return (
        <group ref={group}>
            {cometsData.current.map((_, i) => (
                <mesh key={i} position={[_.x, _.y, _.z]} rotation={[0, 0, -0.6]}>
                    <sphereGeometry args={[0.08, 8, 8]} />
                    <meshBasicMaterial color="#ffedd5" transparent opacity={0.9} />
                    {/* Tail - Fiery Orange/Yellow */}
                    <mesh position={[-1.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                        <cylinderGeometry args={[0.02, 0.1, 2.5, 8]} />
                        <meshBasicMaterial color="#fb923c" transparent opacity={0.4} />
                    </mesh>
                </mesh>
            ))}
        </group>
    )
}

const Rocket = ({ scroll }) => {
    const group = useRef()

    useFrame((state) => {
        const offset = scroll.offset

        // Flight covers almost the entire scroll (0 to 0.95)
        // Lands just as we reach the end
        const flightDuration = 0.95
        const moonRadiusOffset = new THREE.Vector3(0, 0.6, 0)

        if (offset < flightDuration) {
            // FLIGHT PHASE
            const t = offset / flightDuration

            // Fixed Launch Point (Earth's initial position)
            const launchSite = new THREE.Vector3(3, 2, -4).add(new THREE.Vector3(0, 1, 0))

            // Fixed Landing Point (Moon's final position at scroll=1)
            // Moon at offset 1 is approx [4, -2, -3]
            const finalMoonPos = new THREE.Vector3(4, -2, -3)
            const landingSite = finalMoonPos.clone().add(moonRadiusOffset)

            // Interpolate position
            group.current.position.lerpVectors(launchSite, landingSite, t)

            // Add Smoother Arc (Fly out towards screen)
            // Peak at t=0.5
            const arcHeight = 5
            group.current.position.z += Math.sin(t * Math.PI) * arcHeight

            // Dynamic orientation
            const nextT = t + 0.001
            const nextPos = new THREE.Vector3().lerpVectors(launchSite, landingSite, nextT)
            nextPos.z += Math.sin(nextT * Math.PI) * arcHeight
            group.current.lookAt(nextPos)

            // Scale management
            // Start small, grow big (mid-flight), shrink slightly to land
            let s = 0.5
            if (t < 0.1) s = THREE.MathUtils.lerp(0, 0.5, t * 10)
            else if (t > 0.9) s = THREE.MathUtils.lerp(0.5, 0.5, (t - 0.9) * 10)
            group.current.scale.setScalar(s)

        } else {
            // LANDED PHASE
            // Must track moving moon now?
            // Actually at offset > 0.95, the Moon is stationary at its final spot or moving very slowly
            // Let's just snap to the calculated current moon pos to be safe
            const moonPos = getMoonPosition(offset)
            const landingSite = moonPos.clone().add(moonRadiusOffset)

            group.current.position.copy(landingSite)
            group.current.rotation.set(0, 0, 0)
            group.current.scale.setScalar(0.5)
        }
    })

    return (
        <group ref={group} scale={0}>
            {/* Rocket Body */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.2, 0.2, 1.2, 8]} />
                <meshStandardMaterial color="#e5e7eb" metalness={0.5} roughness={0.2} />
            </mesh>
            {/* Nose Cone */}
            <mesh position={[0, 0, 0.7]} rotation={[Math.PI / 2, 0, 0]}>
                <coneGeometry args={[0.2, 0.5, 8]} />
                <meshStandardMaterial color="#ef4444" />
            </mesh>
            {/* Fins */}
            <mesh position={[0, -0.5, 0]}>
                <boxGeometry args={[0.8, 0.1, 0.5]} />
                <meshStandardMaterial color="#ef4444" />
            </mesh>
            <mesh position={[0, -0.5, 0]} rotation={[0, 0, Math.PI / 2]}>
                <boxGeometry args={[0.8, 0.1, 0.5]} />
                <meshStandardMaterial color="#ef4444" />
            </mesh>
            {/* Flame/Thruster - Animated flicker */}
            <mesh position={[0, 0, -0.8]} rotation={[Math.PI / 2, 0, 0]}>
                <coneGeometry args={[0.15, 0.6, 8]} />
                <meshStandardMaterial color="orange" emissive="#f59e0b" emissiveIntensity={2} />
            </mesh>
        </group>
    )
}

const MovingPlanets = () => {
    const scroll = useDreiScroll()
    const group = useRef()

    useFrame((state) => {
        // Only apply parallax in the Hero section (scroll.offset near 0)
        // Damping the mouse movement for smooth feel
        if (scroll.offset < 0.1 && group.current) {
            group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, state.pointer.x * 2, 0.1)
            group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, state.pointer.y * 2, 0.1)
        } else if (group.current) {
            // Reset orbit when scrolling down
            group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, 0, 0.1)
            group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, 0, 0.1)
        }
    })

    return (
        <group ref={group}>
            <Comets />
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                <Jupiter scroll={scroll} />
                <Earth scroll={scroll} />
                <Moon scroll={scroll} />
            </Float>
            <Rocket scroll={scroll} />
        </group>
    )
}

const Scene = () => {
    return (
        <>
            <Environment preset="city" />
            <ambientLight intensity={1.5} />
            <directionalLight position={[10, 10, 10]} intensity={2} />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

            <MovingPlanets />
        </>
    )
}

export default Scene
