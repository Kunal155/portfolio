import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const skillCategories = [
    {
        label: 'Frontend',
        color: 'var(--accent-blue)',
        skills: ['React.js', 'Vite', 'JavaScript', 'Tailwind CSS', 'Bootstrap', 'HTML5', 'CSS3', 'GSAP'],
    },
    {
        label: 'Backend',
        color: 'var(--accent-cyan)',
        skills: ['Node.js', 'Express.js', 'REST APIs', 'JWT Auth', 'Mongoose', 'Multer'],
    },
    {
        label: 'Database',
        color: 'var(--accent-green)',
        skills: ['MongoDB', 'MySQL'],
    },
    {
        label: 'Tools & Integrations',
        color: 'var(--accent-purple)',
        skills: ['Git', 'GitHub', 'Postman', 'Payment Gateway', 'Third-party APIs'],
    },
    {
        label: 'Data Tools',
        color: '#f6ad55',
        skills: ['Excel', 'Power BI', 'Tableau'],
    },
]

function MarqueeRow({ skills, color, reverse = false }) {
    // Duplicate for seamless loop
    const doubled = [...skills, ...skills, ...skills, ...skills]
    return (
        <div className="marquee-wrapper" style={{ marginBottom: '0.75rem' }}>
            <div
                className="marquee-track"
                style={{ animationDirection: reverse ? 'reverse' : 'normal', animationDuration: `${skills.length * 4}s` }}
            >
                {doubled.map((s, i) => (
                    <span
                        key={i}
                        style={{
                            background: `rgba(99, 179, 237, 0.06)`,
                            border: `1px solid ${color}33`,
                            color: color,
                            padding: '0.4rem 1.1rem',
                            borderRadius: '999px',
                            fontSize: '0.8rem',
                            fontWeight: 500,
                            whiteSpace: 'nowrap',
                            flexShrink: 0,
                            transition: 'background 0.2s',
                        }}
                    >
                        {s}
                    </span>
                ))}
            </div>
        </div>
    )
}

export default function Skills() {
    const sectionRef = useRef(null)

    useEffect(() => {
        gsap.from(sectionRef.current.querySelectorAll('.anim-skill'), {
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
            opacity: 0, y: 30, duration: 0.6, stagger: 0.1, ease: 'power2.out',
        })
    }, [])

    return (
        <section id="skills" ref={sectionRef} style={{ padding: 'clamp(4rem, 8vw, 7rem) 0', background: 'var(--bg-secondary)' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
                {/* Header */}
                <div className="anim-skill" style={{ marginBottom: '3.5rem' }}>
                    <div className="section-label" style={{ marginBottom: '0.75rem' }}>// Skills & Technologies</div>
                    <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                        The tools I <span className="gradient-text">master</span>
                    </h2>
                </div>

                {/* Categories */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                    {skillCategories.map(({ label, color, skills }, idx) => (
                        <div key={label} className="anim-skill">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: color, display: 'block', flexShrink: 0 }} />
                                <span style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500 }}>{label}</span>
                                <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
                            </div>
                            <MarqueeRow skills={skills} color={color} reverse={idx % 2 !== 0} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
