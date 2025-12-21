import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import Scene from './Scene'
import { OrbitControls, PerspectiveCamera, ScrollControls, Scroll } from '@react-three/drei'
import Hero from './Hero'
import Skills from './Skills'
import Projects from './Projects'
import Experience from './Experience'
import Contact from './Contact'

const CanvasContainer = () => {
    return (
        <div className="w-full h-screen bg-[#050505]">
            <Canvas dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={35} />
                {/* ScrollControls with damping for smooth feel */}
                <ScrollControls pages={8} damping={0.1}>
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
