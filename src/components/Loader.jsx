import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Loader({ onComplete }) {
    const containerRef = useRef(null)
    const textRef = useRef(null)
    const barRef = useRef(null)

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                gsap.to(containerRef.current, {
                    opacity: 0,
                    duration: 0.5,
                    onComplete: onComplete,
                })
            },
        })

        tl.from(textRef.current, { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' })
            .to(barRef.current, { width: '100%', duration: 1.2, ease: 'power2.inOut' }, 0.3)
            .from('.loader-tagline', { opacity: 0, y: 10, duration: 0.4 }, 0.6)
    }, [onComplete])

    return (
        <div
            ref={containerRef}
            style={{
                position: 'fixed', inset: 0, background: 'var(--bg-primary)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                zIndex: 9999,
            }}
        >
            {/* Grid background */}
            <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />

            <div style={{ position: 'relative', textAlign: 'center' }}>
                <div ref={textRef} style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
                    <span className="gradient-text">KC</span>
                </div>
                <p className="loader-tagline" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '2rem' }}>
                    Kunal Chaudhari
                </p>
                {/* Progress bar */}
                <div style={{ width: '200px', height: '1px', background: 'var(--border-subtle)', borderRadius: '4px', overflow: 'hidden', margin: '0 auto' }}>
                    <div ref={barRef} style={{ height: '100%', width: 0, background: 'linear-gradient(90deg, var(--accent-blue), var(--accent-cyan))', borderRadius: '4px' }} />
                </div>
            </div>
        </div>
    )
}
