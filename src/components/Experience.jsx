import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Briefcase, Database, Calendar } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const experiences = [
    {
        company: 'Webbrains Technologies',
        role: 'MERN Developer',
        period: '2024 – Present',
        type: 'Full-time',
        color: 'var(--accent-blue)',
        icon: <Briefcase size={18} />,
        responsibilities: [
            'Built responsive UIs with React.js and Tailwind CSS for merchant-facing panels',
            'Integrated dynamic REST APIs and third-party services for real-time data display',
            'Developed feature-rich merchant panels with order tracking and offer management',
            'Implemented JWT-based authentication and role-based authorization (Admin / Merchant)',
            'Worked on full-stack modules for the Deal Dinner and Plywood Bazaar platforms',
        ],
        stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'JWT'],
    },
    {
        company: 'Disha Info Tech',
        role: 'Data Analyst Intern',
        period: '2023',
        type: 'Internship',
        color: 'var(--accent-purple)',
        icon: <Database size={18} />,
        responsibilities: [
            'Performed in-depth data analysis using MySQL for business reporting',
            'Created interactive dashboards in Tableau to visualize KPIs for stakeholders',
            'Automated repetitive data-processing tasks, reducing manual effort by 30%',
            'Prepared data summaries and insights to support decision-making',
        ],
        stack: ['MySQL', 'Tableau', 'Excel', 'Power BI'],
    },
]

export default function Experience() {
    const sectionRef = useRef(null)

    useEffect(() => {
        gsap.from(sectionRef.current.querySelectorAll('.anim-exp'), {
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
            opacity: 0, x: -30, duration: 0.7, stagger: 0.2, ease: 'power2.out',
        })
    }, [])

    return (
        <section id="experience" ref={sectionRef} style={{ padding: 'clamp(4rem, 8vw, 7rem) 1.5rem' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {/* Header */}
                <div className="anim-exp" style={{ marginBottom: '3.5rem' }}>
                    <div className="section-label" style={{ marginBottom: '0.75rem' }}>// Work Experience</div>
                    <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                        Where I've <span className="gradient-text">worked</span>
                    </h2>
                </div>

                {/* Timeline */}
                <div style={{ position: 'relative', paddingLeft: '1.5rem' }}>
                    {/* Vertical line */}
                    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '1px', background: 'var(--border-subtle)' }} />

                    {experiences.map(({ company, role, period, type, color, icon, responsibilities, stack }, i) => (
                        <div
                            key={i}
                            className="anim-exp"
                            style={{ position: 'relative', marginBottom: i < experiences.length - 1 ? '3rem' : 0 }}
                        >
                            {/* Timeline dot */}
                            <div style={{
                                position: 'absolute', left: '-2.35rem', top: '1.4rem',
                                width: '14px', height: '14px', borderRadius: '50%',
                                background: color, boxShadow: `0 0 12px ${color}88`,
                                border: '2px solid var(--bg-primary)',
                            }} />

                            {/* Card */}
                            <div
                                className="glass-card anim-exp"
                                style={{ borderRadius: '16px', padding: '1.75rem', transition: 'border-color 0.3s ease, transform 0.3s ease' }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'var(--accent-blue)' }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'translateX(0)'; e.currentTarget.style.borderColor = 'var(--border-subtle)' }}
                            >
                                {/* Header row */}
                                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.25rem' }}>
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color, marginBottom: '0.3rem' }}>
                                            {icon}
                                            <span style={{ fontSize: '0.78rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{company}</span>
                                        </div>
                                        <h3 style={{ fontSize: '1.15rem', fontWeight: 600 }}>{role}</h3>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.82rem', marginBottom: '0.3rem' }}>
                                            <Calendar size={13} /> {period}
                                        </div>
                                        <span style={{ fontSize: '0.7rem', padding: '2px 10px', borderRadius: '999px', border: `1px solid ${color}44`, color, fontWeight: 500 }}>{type}</span>
                                    </div>
                                </div>

                                {/* Responsibilities */}
                                <ul style={{ paddingLeft: '1.2rem', marginBottom: '1.25rem' }}>
                                    {responsibilities.map((r, ri) => (
                                        <li key={ri} style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.8, marginBottom: '0.2rem', listStyleType: 'none', paddingLeft: 0, position: 'relative' }}>
                                            <span style={{ color, marginRight: '0.5rem' }}>→</span>{r}
                                        </li>
                                    ))}
                                </ul>

                                {/* Stack */}
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {stack.map(s => <span key={s} className="tech-tag">{s}</span>)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
