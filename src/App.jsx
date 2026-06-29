import Nav from './components/Nav'
import Hero from './components/Hero'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import About from './components/About'
import Contact from './components/Contact'

export default function App() {
  return (
    <div style={{ background: '#070b0a', minHeight: '100vh' }}>
      <Nav />
      <Hero />
      <Experience />
      <Projects />
      <Skills />
      <About />
      <Contact />
    </div>
  )
}
