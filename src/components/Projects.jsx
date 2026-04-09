import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ExternalLink, Package, ShoppingCart, Utensils } from 'lucide-react'

const Github = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
        <path d="M9 18c-4.51 2-5-2-7-2"></path>
    </svg>
)

gsap.registerPlugin(ScrollTrigger)

const projects = [
    {
        num: '01',
        icon: <Package size={22} />,
        name: 'Inventory & Stock Management System',
        tagline: 'Production-grade stock tracking with real-time audit logs',
        description:
            'A full-featured inventory management system with real-time stock tracking, issue/return workflows, timestamped audit logs, and multi-role access control. Built for operational teams managing physical assets at scale.',
        features: ['Real-time stock tracking', 'Issue & return system', 'Audit logs with timestamps', 'Role-based access: Admin, Manager, Operator'],
        stack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Tailwind CSS'],
        color: 'var(--accent-blue)',
        liveUrl: '#',
        githubUrl: '#',
    },
    {
        num: '02',
        icon: <ShoppingCart size={22} />,
        name: 'Plywood Bazaar — E-Commerce Platform',
        tagline: 'Full-cycle e-commerce with delivery & payment integrations',
        description:
            'End-to-end B2C/B2B e-commerce platform with product listings, cart & checkout, integrated payment gateway, complete order lifecycle management, and third-party delivery API. Serving real customers in the building materials sector.',
        features: ['Product listing & cart system', 'Payment gateway integration', 'Order lifecycle management', 'Delivery API integration'],
        stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Payment API', 'Delivery API'],
        color: 'var(--accent-cyan)',
        liveUrl: '#',
        githubUrl: '#',
    },
    {
        num: '03',
        icon: <Utensils size={22} />,
        name: 'Deal Dinner Platform',
        tagline: 'Merchant panel with real-time offer management',
        description:
            'A multi-tenant platform for restaurant merchants to manage offers, deals, and listings with distinct Admin and Merchant roles. Features secure authentication, real-time data updates, and a merchant self-service panel.',
        features: ['Merchant panel & offer management', 'Secure JWT authentication', 'Real-time updates', 'Admin vs merchant roles'],
        stack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'REST APIs'],
        color: 'var(--accent-purple)',
        liveUrl: '#',
        githubUrl: '#',
    },
]

export default function Projects() {
    const sectionRef = useRef(null)

    useEffect(() => {
        gsap.from(sectionRef.current.querySelectorAll('.anim-proj'), {
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
            opacity: 0, y: 50, duration: 0.7, stagger: 0.18, ease: 'power2.out',
        })
    }, [])

    return (
        <section id="projects" ref={sectionRef} style={{ padding: 'clamp(4rem, 8vw, 7rem) 1.5rem', background: 'var(--bg-secondary)' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {/* Header */}
                <div className="anim-proj" style={{ marginBottom: '3.5rem' }}>
                    <div className="section-label" style={{ marginBottom: '0.75rem' }}>// Featured Projects</div>
                    <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                        Real-world systems I've <span className="gradient-text">shipped</span>
                    </h2>
                </div>

                {/* Project cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {projects.map(({ num, icon, name, tagline, description, features, stack, color, liveUrl, githubUrl }, i) => (
                        <div
                            key={i}
                            className="glass-card anim-proj"
                            style={{
                                borderRadius: '20px', padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                                display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                                gap: '2rem', transition: 'transform 0.3s ease', position: 'relative', overflow: 'hidden',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 20px 60px ${color}18` }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
                        >
                            {/* Accent line */}
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${color}, transparent)` }} />

                            {/* Left column */}
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                                    <div style={{ color, width: '44px', height: '44px', borderRadius: '12px', background: `${color}15`, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        {icon}
                                    </div>
                                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.1em' }}>{num}</span>
                                </div>
                                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.4rem', lineHeight: 1.3 }}>{name}</h3>
                                <p style={{ color, fontSize: '0.8rem', fontWeight: 500, marginBottom: '1rem' }}>{tagline}</p>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>{description}</p>
                                {/* Action buttons */}
                                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                                    <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem', textDecoration: 'none' }}>
                                        <ExternalLink size={14} /> Live Preview
                                    </a>
                                    <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem', textDecoration: 'none' }}>
                                        <Github size={14} /> GitHub
                                    </a>
                                </div>
                            </div>

                            {/* Right column */}
                            <div>
                                {/* Features */}
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>Key Features</p>
                                    <ul style={{ listStyle: 'none', padding: 0 }}>
                                        {features.map((f, fi) => (
                                            <li key={fi} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.86rem', marginBottom: '0.5rem' }}>
                                                <span style={{ color, flexShrink: 0, marginTop: '0.1rem' }}>✓</span>
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                {/* Stack tags */}
                                <div>
                                    <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>Tech Stack</p>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                        {stack.map(s => <span key={s} className="tech-tag">{s}</span>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
