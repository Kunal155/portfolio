import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Process() {
    const containerRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.process-header', {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            })

            gsap.from('.process-step', {
                scrollTrigger: {
                    trigger: '.process-cards',
                    start: 'top 80%',
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out'
            })
        }, containerRef)

        return () => ctx.revert()
    }, [])

    const steps = [
        {
            num: '01',
            title: 'Plan & Architect',
            desc: 'Before writing a single line of code, I dive deep into understanding the project goals, user needs, and technical constraints.'
        },
        {
            num: '02',
            title: 'Build & Develop',
            desc: 'Build pixel-perfect user interfaces and robust backend systems in parallel. I ensure that every component—UI or API—is maintainable.'
        },
        {
            num: '03',
            title: 'Launch & Support',
            desc: 'I also provide post-launch monitoring, performance optimization, and ongoing iteration support to keep your product growing.'
        }
    ]

    return (
        <section id="process" ref={containerRef} style={{ padding: '6rem 0', position: 'relative', background: 'var(--bg-secondary)' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>

                {/* Header Area */}
                <div className="process-header" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                    <div style={{ color: 'var(--accent-cyan)', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.05em' }}>
                        // Process
                    </div>
                    <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, maxWidth: '600px', lineHeight: 1.1, textAlign: 'right' }}>
                        My Development work<br />Process
                    </h2>
                </div>

                {/* Divider Line */}
                <div className="process-header" style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--accent-cyan)', marginBottom: '5rem', opacity: 0.6 }}>
                    <span style={{ fontWeight: 600 }}>&lt;/</span>
                    <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, var(--accent-cyan), transparent, var(--accent-cyan))', opacity: 0.3 }} />
                    <span style={{ fontWeight: 600 }}>&gt;</span>
                </div>

                {/* Steps Cards */}
                <div className="process-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                    {steps.map((step, i) => (
                        <div key={i} className="process-step" style={{ position: 'relative' }}>
                            {/* Overflow wrapper to chopped "0" if we want to mimic screenshot, but full looks cleaner, let's keep it full but huge */}
                            <div style={{
                                fontSize: 'clamp(6rem, 12vw, 10rem)',
                                fontWeight: 800,
                                lineHeight: 1,
                                color: 'var(--accent-cyan)',
                                opacity: 0.9,
                                marginBottom: '2rem',
                                marginLeft: '-5px',
                                fontFamily: 'Space Grotesk, sans-serif'
                            }}>
                                {step.num}
                            </div>

                            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                                {step.title}
                            </h3>

                            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7, opacity: 0.8 }}>
                                {step.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
