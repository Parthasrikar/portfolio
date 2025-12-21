import { Canvas } from '@react-three/fiber'
import { Suspense, useState, useEffect } from 'react'
import Scene from './Scene'
import { OrbitControls, PerspectiveCamera, ScrollControls, Scroll } from '@react-three/drei'
import Hero from './Hero'
import Skills from './Skills'
import Projects from './Projects'
import Experience from './Experience'
import Contact from './Contact'

const CanvasContainer = () => {
    // Dynamic pages based on screen width
    // Mobile needs more scroll distance due to vertical stacking
    const [pages, setPages] = useState(8)

    useEffect(() => {
        const handleResize = () => {
            setPages(window.innerWidth <= 768 ? 10 : 8)
        }

        // Initial check
        handleResize()

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <div className="w-full h-[100dvh] bg-[#050505]">
            <Canvas dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={35} />
                {/* ScrollControls with damping for smooth feel */}
                <ScrollControls pages={pages} damping={0.1}>
                    <Suspense fallback={null}>
                        <Scene />
                    </Suspense>

                    {/* HTML Overlay Content managed by ScrollControls */}
                    <Scroll html>
                        {/* We can just render the components here directly effectively */}
                        <main className="w-screen flex flex-col items-center">
                            <Hero />
                            <Skills />
                            <Projects />
                            <Experience />
                            <Contact />
                        </main>
                    </Scroll>
                </ScrollControls>
            </Canvas>
        </div>
    )
}

export default CanvasContainer
