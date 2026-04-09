import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ExternalLink, Download, Mail } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const stats = [
    { value: '1+', suffix: 'YRS', label: 'YEARS EXP' },
    { value: '10+', suffix: 'PROJ', label: 'PROJECTS' },
    { value: '3', suffix: 'SYS', label: 'PROD SYSTEMS' },
    { value: '5+', suffix: 'API', label: 'INTEGRATIONS' },
]

export default function About() {
    const sectionRef = useRef(null)

    useEffect(() => {
        gsap.from(sectionRef.current.querySelectorAll('.anim-about'), {
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
            opacity: 0, y: 40, duration: 0.7, stagger: 0.15, ease: 'power2.out',
        })
    }, [])

    return (
        <section id="about" ref={sectionRef} style={{ padding: 'clamp(4rem, 8vw, 7rem) 1.5rem' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {/* Section header */}
                <div className="anim-about" style={{ marginBottom: '3.5rem' }}>
                    <div className="section-label" style={{ marginBottom: '0.75rem' }}>// About Me</div>
                    <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1, maxWidth: '600px' }}>
                        I build things that<br />
                        <span className="gradient-text">actually work</span>
                    </h2>
                </div>

                {/* Two-column layout */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'start' }}>
                    {/* Left: Text */}
                    <div>
                        <p className="anim-about" style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.9, marginBottom: '1.5rem' }}>
                            I'm Kunal Chaudhari, a Full Stack MERN Developer with 1+ year of hands-on experience building production-grade web applications. My work goes beyond writing code — I architect systems, optimize for scale, and solve real business problems.
                        </p>
                        <p className="anim-about" style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.9, marginBottom: '2rem' }}>
                            At <span style={{ color: 'var(--accent-blue)' }}>Webbrains Technologies</span>, I built merchant panels, integrated payment gateways, and implemented secure role-based authentication. At <span style={{ color: 'var(--accent-cyan)' }}>Disha Info Tech</span>, I leveraged data tools to drive business insights and automation.
                        </p>
                        <div className="anim-about" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                            {['MERN Stack', 'REST APIs', 'Role-Based Access', 'Payment Gateways', 'Data Analysis'].map(tag => (
                                <span key={tag} className="tech-tag">{tag}</span>
                            ))}
                        </div>
                    </div>

                    {/* Right: Stat grid + CTA buttons */}
                    <div className="anim-about" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                        {/* 2×2 Stat Cards */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', border: '1px solid var(--border-subtle)', borderRadius: '10px', overflow: 'hidden' }}>
                            {stats.map(({ value, suffix, label }, i) => (
                                <div
                                    key={i}
                                    style={{
                                        padding: '1.25rem 1.5rem',
                                        borderRight: i % 2 === 0 ? '1px solid var(--border-subtle)' : 'none',
                                        borderBottom: i < 2 ? '1px solid var(--border-subtle)' : 'none',
                                        background: 'var(--bg-card)',
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem', marginBottom: '0.3rem' }}>
                                        <span className="gradient-text" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif" }}>
                                            {value}
                                        </span>
                                        <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>
                                            {suffix}
                                        </span>
                                    </div>
                                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 500 }}>
                                        {label}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Full-width CTA Buttons */}
                        <button
                            className="btn-primary"
                            style={{ width: '100%', justifyContent: 'center', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.82rem' }}
                            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            <ExternalLink size={15} /> View Projects
                        </button>
                        <a
                            className="btn-outline"
                            href="/resume.pdf"
                            download
                            style={{ textDecoration: 'none', width: '100%', justifyContent: 'center', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.82rem', boxSizing: 'border-box' }}
                        >
                            <Download size={15} /> Download Resume
                        </a>
                        <button
                            className="btn-outline"
                            style={{ width: '100%', justifyContent: 'center', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.82rem' }}
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            <Mail size={15} /> Contact Me
                        </button>
                    </div>
                </div>

                <style>{`@keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }`}</style>
            </div>
        </section>
    )
}
