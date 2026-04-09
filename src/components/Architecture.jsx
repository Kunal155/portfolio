import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Brain, Layers, Activity, ShieldCheck, Zap, Code, Briefcase, Plug, ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const competencies = [
    {
        icon: <Brain size={24} />,
        title: 'Problem-First Approach',
        desc: "I don’t jump into coding. I first understand the business problem, edge cases, and user flow before writing a single line."
    },
    {
        icon: <Layers size={24} />,
        title: 'Scalable Architecture',
        desc: "I design systems that scale — modular structure, separation of concerns, and reusable components."
    },
    {
        icon: <Activity size={24} />,
        title: 'Real-Time Data Thinking',
        desc: "I build systems with real-time updates, ensuring data consistency across frontend and backend."
    },
    {
        icon: <ShieldCheck size={24} />,
        title: 'Secure by Design',
        desc: "Authentication, authorization, and data validation are built-in from the start, not added later."
    },
    {
        icon: <Zap size={24} />,
        title: 'Performance Optimization',
        desc: "I optimize APIs, reduce unnecessary re-renders, and ensure fast response times in production systems."
    },
    {
        icon: <Code size={24} />,
        title: 'Clean & Maintainable Code',
        desc: "I write code that other developers can easily read, extend, and debug."
    },
    {
        icon: <Briefcase size={24} />,
        title: 'Business Logic Focus',
        desc: "I focus on solving real-world workflows like inventory tracking, order lifecycle, and role-based systems."
    },
    {
        icon: <Plug size={24} />,
        title: 'Integration Ready Systems',
        desc: "I design systems that easily integrate with payment gateways, third-party APIs, and external services."
    }
]

export default function Architecture() {
    const sectionRef = useRef(null)

    useEffect(() => {
        gsap.from(sectionRef.current.querySelectorAll('.anim-arch'), {
            scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
            opacity: 0, y: 40, duration: 0.7, stagger: 0.12, ease: 'power2.out',
        })
    }, [])

    return (
        <section id="architecture" ref={sectionRef} style={{ padding: 'clamp(4rem, 8vw, 7rem) 1.5rem' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {/* Header */}
                <div className="anim-arch" style={{ marginBottom: '3.5rem' }}>
                    <div className="section-label" style={{ marginBottom: '0.75rem' }}>// Engineering Expertise</div>
                    <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                        How I <span className="gradient-text">Think & Build</span>
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '600px', marginTop: '1rem', lineHeight: 1.8 }}>
                        Showcasing engineering mindset and system design thinking.
                    </p>
                </div>

                {/* Main Content Layout */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>

                    {/* Animated Flow Diagram */}
                    {/* <div className="glass-card anim-arch" style={{ padding: '2rem 1rem', borderRadius: '18px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: 'clamp(0.5rem, 2vw, 1.5rem)', background: 'rgba(52, 211, 153, 0.03)', borderColor: 'var(--accent-green)' }}>
                        {['User', 'Frontend', 'API', 'Database', 'Response'].map((step, idx) => (
                            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.5rem, 2vw, 1.5rem)' }}>
                                <div style={{
                                    padding: '0.8rem 1.5rem',
                                    borderRadius: '8px',
                                    background: 'var(--bg-secondary)',
                                    border: '1px solid var(--accent-green)',
                                    color: 'var(--text-primary)',
                                    fontWeight: 600,
                                    fontSize: '0.9rem',
                                    boxShadow: '0 0 15px rgba(52, 211, 153, 0.1)'
                                }}>
                                    {step}
                                </div>
                                {idx < 4 && (
                                    <ArrowRight size={20} className="flow-arrow" style={{ color: 'var(--accent-green)', animation: 'pulse 1.5s infinite', opacity: 0.6 }} />
                                )}
                            </div>
                        ))}
                    </div> */}

                    {/* Cards Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
                        {competencies.map(({ icon, title, desc }, i) => (
                            <div
                                key={i}
                                className="glass-card anim-arch"
                                style={{ borderRadius: '18px', padding: '1.75rem', transition: 'border-color 0.3s ease, box-shadow 0.3s ease', position: 'relative', overflow: 'hidden' }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-green)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(52, 211, 153, 0.15)' }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.boxShadow = 'none' }}
                            >
                                {/* Subtle green accent background gradient */}
                                <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '120px', height: '120px', borderRadius: '50%', background: `radial-gradient(circle, var(--accent-green), transparent 70%)`, opacity: 0.1, pointerEvents: 'none' }} />

                                {/* Animated mini dot */}
                                <div style={{ position: 'absolute', top: '10px', right: '10px', width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent-green)', animation: `pulse ${2 + (i % 2)}s infinite` }} />

                                <div style={{ color: 'var(--accent-green)', marginBottom: '1.25rem', width: '44px', height: '44px', borderRadius: '10px', background: `rgba(52, 211, 153, 0.1)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {icon}
                                </div>
                                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', lineHeight: 1.4 }}>{title}</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.7 }}>{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
