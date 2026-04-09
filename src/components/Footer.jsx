import { Mail, Phone } from 'lucide-react'

const Github = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
        <path d="M9 18c-4.51 2-5-2-7-2"></path>
    </svg>
)

const Linkedin = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
    </svg>
)

export default function Footer() {
    return (
        <footer style={{
            borderTop: '1px solid var(--border-subtle)',
            padding: '3rem 1.5rem 2rem',
            background: 'var(--bg-secondary)',
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '2rem', marginBottom: '2rem' }}>
                    <div>
                        <div style={{ fontWeight: 700, fontSize: '1.3rem', marginBottom: '0.5rem' }}>
                            <span className="gradient-text">Kunal</span> Chaudhari
                        </div>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', maxWidth: '300px', lineHeight: 1.7 }}>
                            Full Stack MERN Developer building scalable web applications & real-world solutions.
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        {[
                            { href: 'https://github.com/', icon: <Github size={18} /> },
                            { href: 'https://linkedin.com/', icon: <Linkedin size={18} /> },
                            { href: 'mailto:chaudharikunal154@gmail.com', icon: <Mail size={18} /> },
                            { href: 'tel:+918140376915', icon: <Phone size={18} /> },
                        ].map(({ href, icon }, i) => (
                            <a
                                key={i} href={href} target="_blank" rel="noopener noreferrer"
                                style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    width: '40px', height: '40px', borderRadius: '10px',
                                    border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)',
                                    transition: 'all 0.2s',
                                }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-blue)'; e.currentTarget.style.color = 'var(--accent-blue)' }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
                            >
                                {icon}
                            </a>
                        ))}
                    </div>
                </div>
                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                        © {new Date().getFullYear()} Kunal Chaudhari. All rights reserved.
                    </p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                        Built with React + Vite + GSAP
                    </p>
                </div>
            </div>
        </footer>
    )
}
