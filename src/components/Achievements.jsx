import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Trophy, Cpu, Plug, Bug } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const highlights = [
    {
        icon: <Trophy size={20} />,
        title: 'Production-Level Systems',
        desc: 'Shipped 3 end-to-end production applications used by real merchants and customers — from inventory management to e-commerce platforms.',
        color: 'var(--accent-blue)',
        stat: '3',
        statLabel: 'Live Systems',
    },
    {
        icon: <Cpu size={20} />,
        title: 'Real Business Workflows',
        desc: 'Implemented complex flows like order lifecycle, stock audit trails, and merchant offer management — not just CRUD apps.',
        color: 'var(--accent-cyan)',
        stat: '10+',
        statLabel: 'Business Modules',
    },
    {
        icon: <Plug size={20} />,
        title: 'Third-Party Integrations',
        desc: 'Integrated payment gateways, delivery APIs, third-party auth, and data pipelines into production-ready workflows.',
        color: 'var(--accent-purple)',
        stat: '5+',
        statLabel: 'Integrations',
    },
    {
        icon: <Bug size={20} />,
        title: 'Debugging & Optimization',
        desc: 'Strong track record in finding root causes quickly, optimizing slow queries, and reducing API response times across full-stack apps.',
        color: 'var(--accent-green)',
        stat: '∞',
        statLabel: 'Bugs Fixed ',
    },
]

export default function Achievements() {
    const sectionRef = useRef(null)

    useEffect(() => {
        gsap.from(sectionRef.current.querySelectorAll('.anim-ach'), {
            scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
            opacity: 0, scale: 0.95, duration: 0.6, stagger: 0.12, ease: 'power2.out',
        })
    }, [])

    return (
        <section id="achievements" ref={sectionRef} style={{ padding: 'clamp(4rem, 8vw, 7rem) 1.5rem', background: 'var(--bg-secondary)' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {/* Header */}
                <div className="anim-ach" style={{ marginBottom: '3.5rem' }}>
                    <div className="section-label" style={{ marginBottom: '0.75rem' }}>// Achievements</div>
                    <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                        Why I <span className="gradient-text">stand out</span>
                    </h2>
                </div>

                {/* Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
                    {highlights.map(({ icon, title, desc, color, stat, statLabel }, i) => (
                        <div
                            key={i}
                            className="glass-card anim-achieve"
                            style={{ borderRadius: '18px', padding: '2rem', transition: 'border-color 0.3s ease, transform 0.3s ease', borderLeft: `3px solid ${color}44` }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateX(8px)'; e.currentTarget.style.borderColor = color }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = color + '44' }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                                <div style={{ color, width: '44px', height: '44px', borderRadius: '12px', background: `${color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {icon}
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '1.8rem', fontWeight: 700, color, lineHeight: 1 }}>{stat}</div>
                                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{statLabel}</div>
                                </div>
                            </div>
                            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.6rem' }}>{title}</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.7 }}>{desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
