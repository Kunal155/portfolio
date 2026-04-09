import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Mail, Phone, Send, CheckCircle, AlertCircle } from 'lucide-react'

const Linkedin = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
    </svg>
)

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
    const sectionRef = useRef(null)
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        gsap.from(sectionRef.current.querySelectorAll('.anim-contact'), {
            scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
            opacity: 0, y: 40, duration: 0.7, stagger: 0.15, ease: 'power2.out',
        })
    }, [])

    const validate = () => {
        const e = {}
        if (!form.name.trim()) e.name = 'Name is required'
        if (!form.email.trim()) e.email = 'Email is required'
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email format'
        if (!form.message.trim()) e.message = 'Message is required'
        return e
    }

    const handleSubmit = (ev) => {
        ev.preventDefault()
        const e = validate()
        if (Object.keys(e).length) { setErrors(e); return }
        setErrors({})
        setSubmitted(true)
        setTimeout(() => {
            setForm({ name: '', email: '', subject: '', message: '' })
            setSubmitted(false)
        }, 4000)
    }

    const fieldStyle = (errKey) => ({
        width: '100%', padding: '0.85rem 1rem', background: 'rgba(255,255,255,0.04)',
        border: `1px solid ${errors[errKey] ? 'rgba(252, 129, 74, 0.6)' : 'var(--border-subtle)'}`,
        borderRadius: '10px', color: 'var(--text-primary)', fontSize: '0.9rem',
        fontFamily: 'Space Grotesk, sans-serif', outline: 'none', transition: 'border-color 0.2s',
    })

    const contactLinks = [
        { icon: <Phone size={18} />, label: 'Phone', value: '+91 8140376915', href: 'tel:+918140376915', color: 'var(--accent-green)' },
        { icon: <Mail size={18} />, label: 'Email', value: 'chaudharikunal154@gmail.com', href: 'mailto:chaudharikunal154@gmail.com', color: 'var(--accent-blue)' },
        { icon: <Linkedin size={18} />, label: 'LinkedIn', value: 'Connect on LinkedIn', href: 'https://linkedin.com/', color: 'var(--accent-cyan)' },
    ]

    return (
        <section id="contact" ref={sectionRef} style={{ padding: 'clamp(4rem, 8vw, 7rem) 1.5rem' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {/* Header */}
                <div className="anim-contact" style={{ marginBottom: '3.5rem' }}>
                    <div className="section-label" style={{ marginBottom: '0.75rem' }}>// Get In Touch</div>
                    <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                        Let's build something<br />
                        <span className="gradient-text">incredible together</span>
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '1rem', maxWidth: '500px', lineHeight: 1.8 }}>
                        Whether you have a project in mind, a job opportunity, or just want to talk tech — my inbox is always open.
                    </p>
                </div>

                {/* Two-column grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', alignItems: 'start' }}>
                    {/* Left: Contact info */}
                    <div className="anim-contact">
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '2rem' }}>
                            I'm currently open to full-time roles, freelance projects, and consulting opportunities. Response within 24 hours.
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {contactLinks.map(({ icon, label, value, href, color }, i) => (
                                <a
                                    key={i}
                                    href={href}
                                    target={href.startsWith('http') ? '_blank' : '_self'}
                                    rel="noopener noreferrer"
                                    style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', padding: '1rem 1.25rem', borderRadius: '12px', border: '1px solid var(--border-subtle)', transition: 'all 0.2s', background: 'var(--bg-card)' }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = color + '55'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.background = 'var(--bg-card)' }}
                                >
                                    <div style={{ color, width: '40px', height: '40px', borderRadius: '10px', background: color + '14', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        {icon}
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.2rem' }}>{label}</div>
                                        <div style={{ color: 'var(--text-primary)', fontSize: '0.88rem', fontWeight: 500 }}>{value}</div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div className="glass-card anim-contact" style={{ borderRadius: '20px', padding: '2rem' }}>
                        {submitted ? (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', minHeight: '300px', textAlign: 'center' }}>
                                <CheckCircle size={48} style={{ color: 'var(--accent-green)' }} />
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Message Sent!</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Thanks for reaching out. I'll get back to you within 24 hours.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} noValidate>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                                    {/* Name */}
                                    <div style={{ gridColumn: '1 / -1' }}>
                                        <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>Full Name *</label>
                                        <input
                                            type="text"
                                            value={form.name}
                                            onChange={e => setForm({ ...form, name: e.target.value })}
                                            placeholder="Kunal Chaudhari"
                                            style={fieldStyle('name')}
                                            onFocus={e => e.target.style.borderColor = 'var(--accent-blue)'}
                                            onBlur={e => e.target.style.borderColor = errors.name ? 'rgba(252,129,74,0.6)' : 'var(--border-subtle)'}
                                        />
                                        {errors.name && <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'rgba(252,129,74,0.9)', fontSize: '0.75rem', marginTop: '0.3rem' }}><AlertCircle size={12} />{errors.name}</div>}
                                    </div>
                                    {/* Email */}
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>Email *</label>
                                        <input
                                            type="email"
                                            value={form.email}
                                            onChange={e => setForm({ ...form, email: e.target.value })}
                                            placeholder="hello@example.com"
                                            style={fieldStyle('email')}
                                            onFocus={e => e.target.style.borderColor = 'var(--accent-blue)'}
                                            onBlur={e => e.target.style.borderColor = errors.email ? 'rgba(252,129,74,0.6)' : 'var(--border-subtle)'}
                                        />
                                        {errors.email && <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'rgba(252,129,74,0.9)', fontSize: '0.75rem', marginTop: '0.3rem' }}><AlertCircle size={12} />{errors.email}</div>}
                                    </div>
                                    {/* Subject */}
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>Subject</label>
                                        <input
                                            type="text"
                                            value={form.subject}
                                            onChange={e => setForm({ ...form, subject: e.target.value })}
                                            placeholder="Project discussion"
                                            style={fieldStyle('subject')}
                                            onFocus={e => e.target.style.borderColor = 'var(--accent-blue)'}
                                            onBlur={e => e.target.style.borderColor = 'var(--border-subtle)'}
                                        />
                                    </div>
                                </div>
                                {/* Message */}
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>Message *</label>
                                    <textarea
                                        value={form.message}
                                        onChange={e => setForm({ ...form, message: e.target.value })}
                                        placeholder="Tell me about your project..."
                                        rows={5}
                                        style={{ ...fieldStyle('message'), resize: 'vertical' }}
                                        onFocus={e => e.target.style.borderColor = 'var(--accent-blue)'}
                                        onBlur={e => e.target.style.borderColor = errors.message ? 'rgba(252,129,74,0.6)' : 'var(--border-subtle)'}
                                    />
                                    {errors.message && <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'rgba(252,129,74,0.9)', fontSize: '0.75rem', marginTop: '0.3rem' }}><AlertCircle size={12} />{errors.message}</div>}
                                </div>
                                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', gap: '0.5rem' }}>
                                    <Send size={16} /> Send Message
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
