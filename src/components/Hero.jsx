import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ArrowDown } from 'lucide-react'

// Custom Scramble Animation Component
function ScrambleText({ text, delay = 2, duration = 1.5, className, style }) {
    const [displayText, setDisplayText] = useState('')
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890<>[]{}_+*#@!$'
    const mounted = useRef(false)

    useEffect(() => {
        if (mounted.current) return
        mounted.current = true

        let iteration = 0
        let interval = null

        const startScramble = () => {
            interval = setInterval(() => {
                setDisplayText(text.split('').map((char, index) => {
                    if (char === ' ') return ' '
                    if (index < iteration) return text[index]
                    return chars[Math.floor(Math.random() * chars.length)]
                }).join(''))

                if (iteration >= text.length) {
                    clearInterval(interval)
                }
                iteration += text.length / (duration * 30) // 30fps-ish
            }, 30)
        }

        const timer = setTimeout(startScramble, delay * 1000)
        return () => {
            clearTimeout(timer)
            clearInterval(interval)
        }
    }, [text, delay, duration])

    return <span className={className} style={style}>{displayText}</span>
}

function HexGrid() {
    const hexPath = (cx, cy, r) => {
        const pts = Array.from({ length: 6 }, (_, i) => {
            const angle = (Math.PI / 3) * i - Math.PI / 6
            return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`
        })
        return `M${pts.join('L')}Z`
    }

    const hexes = []
    const rows = 10, cols = 12, r = 28, hW = r * Math.sqrt(3), hH = r * 1.5
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const cx = col * hW + (row % 2 === 0 ? hW / 2 : 0) + 10
            const cy = row * hH + 10
            const opacity = Math.random() * 0.12 + 0.03
            const filled = Math.random() > 0.9
            hexes.push({ cx, cy, opacity, filled, key: `${row}-${col}` })
        }
    }

    return (
        <svg
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
            viewBox="0 0 700 560"
            preserveAspectRatio="xMidYMid slice"
        >
            {hexes.map(h => (
                <path
                    key={h.key}
                    d={hexPath(h.cx, h.cy, 13)}
                    fill={h.filled ? 'var(--accent-cyan)' : 'none'}
                    fillOpacity={h.filled ? h.opacity * 0.4 : 0}
                    stroke="var(--accent-cyan)"
                    strokeWidth="0.6"
                    strokeOpacity={h.opacity}
                />
            ))}
        </svg>
    )
}

// ─── Code Rain Canvas ────────────────────────────────────────────────────────
function CodeRainCanvas() {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        let animId

        const resize = () => {
            canvas.width = canvas.offsetWidth
            canvas.height = canvas.offsetHeight
        }
        resize()
        window.addEventListener('resize', resize)

        const fontSize = 13
        const cols = Math.floor(canvas.width / fontSize)
        const drops = Array(cols).fill(1).map(() => Math.random() * -100)
        const symbols = '01アイウエオカキクケコ<>/{}[]()=>!=+-*&|#@$%~;:'

        const getAccentRgb = () => {
            const val = getComputedStyle(document.documentElement).getPropertyValue('--accent-cyan').trim()
            if (val.startsWith('#')) {
                const hex = val.slice(1)
                return [parseInt(hex.substring(0, 2), 16), parseInt(hex.substring(2, 4), 16), parseInt(hex.substring(4, 6), 16)]
            }
            return [11, 197, 234]
        }

        const draw = () => {
            ctx.fillStyle = 'rgba(0,0,0,0.05)'
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            const [r, g, b] = getAccentRgb()

            for (let i = 0; i < drops.length; i++) {
                const char = symbols[Math.floor(Math.random() * symbols.length)]
                const y = drops[i] * fontSize
                const brightness = drops[i] > 2 ? Math.random() > 0.95 ? 1 : 0.12 : 0.6
                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${brightness})`
                ctx.font = `${fontSize}px 'Courier New', monospace`
                ctx.fillText(char, i * fontSize, y)

                if (y > canvas.height && Math.random() > 0.975) drops[i] = 0
                drops[i] += 0.45
            }
            animId = requestAnimationFrame(draw)
        }
        draw()

        return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
    }, [])

    return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
}

// ─── Terminal Widget ──────────────────────────────────────────────────────────
const termLines = [
    { text: '$ npm create mern-app portfolio', color: '#e2e8f0', delay: 0 },
    { text: '✓ React 18 + Vite initialized', color: '#4ade80', delay: 600 },
    { text: '✓ Express + Node.js backend ready', color: '#4ade80', delay: 1100 },
    { text: '✓ MongoDB Atlas connected', color: '#4ade80', delay: 1600 },
    { text: '✓ JWT Auth middleware loaded', color: '#4ade80', delay: 2100 },
    { text: '▶ Deploying to production...', color: '#facc15', delay: 2700 },
    { text: '✓ Live at kunal.dev +', color: '#4ade80', delay: 3400 },
]

function TerminalWidget() {
    const [visibleLines, setVisibleLines] = useState([])

    useEffect(() => {
        termLines.forEach((line, i) => {
            setTimeout(() => {
                setVisibleLines(prev => [...prev, i])
            }, line.delay)
        })
    }, [])

    return (
        <div style={{
            background: 'rgba(10,14,20,0.88)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '10px',
            padding: '1rem 1.25rem',
            fontFamily: "'Courier New', monospace",
            fontSize: '0.78rem',
            lineHeight: 1.7,
            backdropFilter: 'blur(16px)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)',
            minWidth: '320px',
            maxWidth: '420px',
        }}>
            {/* Title bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57', display: 'block' }} />
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e', display: 'block' }} />
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840', display: 'block' }} />
                </div>
                <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem', letterSpacing: '0.05em' }}>~/portfolio</span>
            </div>
            {/* Lines */}
            <div>
                {termLines.map((line, i) => (
                    <div
                        key={i}
                        style={{
                            color: line.color,
                            opacity: visibleLines.includes(i) ? 1 : 0,
                            transform: visibleLines.includes(i) ? 'translateY(0)' : 'translateY(4px)',
                            transition: 'opacity 0.4s ease, transform 0.4s ease',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {line.text}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default function Hero() {
    const containerRef = useRef(null)
    const canvasRef = useRef(null)

    const [theme, setTheme] = useState('dark-black')

    useEffect(() => {
        const handleTheme = (e) => setTheme(e.detail)
        window.addEventListener('themechange', handleTheme)
        return () => window.removeEventListener('themechange', handleTheme)
    }, [])

    useEffect(() => {
        // GSAP entrance animation
        const tl = gsap.timeline({ delay: 0.2 })
        tl.from('.hero-photo', { opacity: 0, duration: 1, ease: 'power2.inOut' })
            .from('.hero-label', { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' }, '-=0.5')
            .from('.hero-name', { opacity: 0, y: 40, duration: 0.8, ease: 'power2.out' }, '-=0.3')
            .from('.hero-title', { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' }, '-=0.5')
            .from('.hero-tagline', { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' }, '-=0.4')
            .from('.hero-intro', { opacity: 0, y: 20, duration: 0.5, ease: 'power2.out' }, '-=0.3')
            .from('.hero-actions', { opacity: 0, y: 20, duration: 0.5, ease: 'power2.out' }, '-=0.2')
            .from('.hero-stats', { opacity: 0, y: 20, duration: 0.5, stagger: 0.1, ease: 'power2.out' }, '-=0.1')
            .from('.hero-scroll', { opacity: 0, duration: 0.5 }, '-=0.1')
    }, [])

    // Particle canvas
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        let animId
        const particles = []

        const resize = () => {
            canvas.width = canvas.offsetWidth
            canvas.height = canvas.offsetHeight
        }
        resize()
        window.addEventListener('resize', resize)

        // Create particles
        for (let i = 0; i < 60; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 1.5 + 0.3,
                dx: (Math.random() - 0.5) * 0.4,
                dy: (Math.random() - 0.5) * 0.4,
                opacity: Math.random() * 0.5 + 0.1,
            })
        }

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            particles.forEach(p => {
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(99, 179, 237, ${p.opacity})`
                ctx.fill()
                p.x += p.dx
                p.y += p.dy
                if (p.x < 0 || p.x > canvas.width) p.dx *= -1
                if (p.y < 0 || p.y > canvas.height) p.dy *= -1
                // Draw connecting lines
                particles.forEach(p2 => {
                    const dist = Math.hypot(p.x - p2.x, p.y - p2.y)
                    if (dist < 100) {
                        ctx.beginPath()
                        ctx.moveTo(p.x, p.y)
                        ctx.lineTo(p2.x, p2.y)
                        ctx.strokeStyle = `rgba(99, 179, 237, ${0.05 * (1 - dist / 100)})`
                        ctx.lineWidth = 0.5
                        ctx.stroke()
                    }
                })
            })
            animId = requestAnimationFrame(draw)
        }
        draw()

        return () => {
            cancelAnimationFrame(animId)
            window.removeEventListener('resize', resize)
        }
    }, [])

    return (
        <section
            id="hero"
            ref={containerRef}
            style={{
                position: 'relative', overflow: 'hidden', paddingTop: '68px',
            }}
        >
            {/* Grid BG */}
            {/* <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 3.2 }} /> */}

            {/* Particle Network — full width, base layer */}
            <canvas
                ref={canvasRef}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }}
            />

            {/* Code Rain — left half only, very subtle behind text */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '50%', height: '100%', opacity: 1.13, zIndex: 1, overflow: 'hidden', pointerEvents: 'none', WebkitMaskImage: 'linear-gradient(to right, black 60%, transparent 100%)', maskImage: 'linear-gradient(to right, black 60%, transparent 100%)' }}>
                <CodeRainCanvas />
            </div>

            {/* Hex Grid — right half, behind photo */}
            <div style={{ position: 'absolute', top: 0, right: 0, width: '60%', height: '100%', opacity: 0.45, zIndex: 1, overflow: 'hidden', pointerEvents: 'none', WebkitMaskImage: 'linear-gradient(to left, black 70%, transparent 100%)', maskImage: 'linear-gradient(to left, black 70%, transparent 100%)' }}>
                <HexGrid />
            </div>

            {/* Profile Photo */}
            <div style={{ position: 'absolute', top: 0, right: 0, width: '60%', height: '100vh', zIndex: 2, WebkitMaskImage: 'linear-gradient(to left, black 0%, transparent 100%)', maskImage: 'linear-gradient(to left, black 0%, transparent 100%)' }}>
                <img
                    src={`${import.meta.env.BASE_URL}${theme === 'dark-black' ? 'black.jpeg' : theme === 'obsidian-gold' ? 'gold.jpeg' : theme === 'forest-emerald' ? 'green.jpeg' : 'profile.jpeg'}`}
                    alt="Kunal Chaudhari"
                    className="hero-photo"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                />
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, var(--bg-primary) 0%, transparent 40%)',
                    pointerEvents: 'none'
                }} />
            </div>

            {/* Glow Orbs */}
            <div style={{ position: 'absolute', top: '20%', left: '-5%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 1 }} />
            <div style={{ position: 'absolute', top: '10%', right: '5%', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,220,237,0.06) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 1 }} />

            {/* Hero Main Content (Viewport height) */}
            <div style={{
                position: 'relative', zIndex: 3, minHeight: 'calc(100vh - 68px)',
                display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                paddingBottom: '12vh'
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', width: '100%' }}>
                    {/* Name / Title */}
                    <h1
                        className="hero-name"
                        style={{
                            fontSize: 'clamp(3.5rem, 8vw, 7.5rem)', fontWeight: 700,
                            letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: '1.5rem',
                            color: 'var(--text-primary)'
                        }}
                    >
                        <ScrambleText text="Full Stack" delay={2.4} duration={1.2} /><br />
                        <span className="gradient-text">
                            <ScrambleText text="MERN Developer" delay={2.4} duration={1.5} />
                        </span>
                    </h1>

                    {/* Intro + Terminal side by side */}
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3rem', flexWrap: 'wrap' }}>
                        <p className="hero-intro" style={{
                            fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: 'var(--text-secondary)',
                            maxWidth: '420px', lineHeight: 1.6, fontWeight: 500, margin: 0,
                        }}>
                            I take great pride in building scalable web applications.<br />
                            1+ year experienced developer specializing in real-world solutions.
                        </p>
                        {/* Terminal Widget */}
                        {/* <div style={{ flexShrink: 0 }}>
                            <TerminalWidget />
                        </div> */}
                    </div>
                </div>
            </div>



            <style>{`
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
        @keyframes bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(6px); } }
      `}</style>
        </section>
    )
}
