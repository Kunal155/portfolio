import { useState, useEffect, useRef } from 'react'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Process from './components/Process'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Architecture from './components/Architecture'
import Achievements from './components/Achievements'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './index.css'

function CursorEffect() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const move = (e) => {
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px'
        dotRef.current.style.top = e.clientY + 'px'
      }
      if (ringRef.current) {
        ringRef.current.style.left = e.clientX + 'px'
        ringRef.current.style.top = e.clientY + 'px'
      }
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      {/* <div ref={ringRef} className="cursor-ring" /> */}
    </>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}

      <div style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.5s ease', pointerEvents: loading ? 'none' : 'auto' }}>
        <CursorEffect />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Experience />
          <Skills />
          <Projects />
          <Architecture />
          <Process />
          <Achievements />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}
