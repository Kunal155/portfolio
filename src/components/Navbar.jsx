import { useState, useEffect } from 'react'
import { Menu, X, Palette } from 'lucide-react'

const links = ['About', 'Skills', 'Experience', 'Projects', 'Architecture', 'Contact']
const THEMES = [
    { id: 'dark-black', label: 'True Black' },
    { id: 'obsidian-gold', label: 'Obsidian Gold' },
    { id: 'sea-blue', label: 'Sea Blue' },
    { id: 'forest-emerald', label: 'Forest Emerald' }
]

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [themeIndex, setThemeIndex] = useState(0)
    const [dropdownOpen, setDropdownOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', THEMES[themeIndex].id)
        window.dispatchEvent(new CustomEvent('themechange', { detail: THEMES[themeIndex].id }))
    }, [themeIndex])

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest('.theme-dropdown-container')) setDropdownOpen(false)
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const scrollTo = (id) => {
        setOpen(false)
        document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <nav
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                transition: 'all 0.3s ease',
                background: scrolled
                    ? 'rgba(8, 10, 15, 0.88)'
                    : 'transparent',
                backdropFilter: scrolled ? 'blur(20px)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
            }}
        >
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>
                {/* Logo */}
                <span
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    style={{ cursor: 'pointer', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '0.01em' }}
                >
                    <span className="gradient-text">K.</span>
                    <span style={{ color: 'var(--text-secondary)' }}>Chaudhari</span>
                </span>
                {/* Available for hire badge */}
                <div className="hide-mobile" style={{
                    display: 'flex', alignItems: 'center', gap: '0.2rem',
                    border: '1px solid var(--border-subtle)', borderRadius: '999px',
                    padding: '0.3rem 0.85rem', background: 'rgba(255,255,255,0.03)'
                }}>
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--accent-green)', animation: 'pulse 2s infinite', display: 'block', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500 }}>Available for hire</span>
                </div>

                {/* Desktop Links */}
                <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', alignItems: 'center' }} className="hide-mobile">
                    {links.map(l => (
                        <li key={l}>
                            <button
                                onClick={() => scrollTo(l)}
                                className="animated-link"
                                style={{
                                    background: 'none', border: 'none', cursor: 'pointer',
                                    color: 'var(--text-secondary)', fontSize: '0.88rem',
                                    fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500,
                                    transition: 'color 0.2s',
                                }}
                                onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
                                onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
                            >
                                {l}
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Theme Toggle & CTA */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }} className="hide-mobile">
                    <div className="theme-dropdown-container" style={{ position: 'relative' }}>
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            style={{
                                background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-subtle)',
                                borderRadius: '50%', width: '38px', height: '38px', display: 'flex',
                                alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                                color: 'var(--text-primary)', transition: 'all 0.3s'
                            }}
                            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-cyan)'}
                            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-subtle)'}
                            title="Select Theme"
                        >
                            <Palette size={18} />
                        </button>

                        {/* Dropdown Menu */}
                        {dropdownOpen && (
                            <div style={{
                                position: 'absolute', top: '120%', right: '50%', transform: 'translateX(50%)',
                                background: 'rgba(8,10,15,0.95)', border: '1px solid var(--border-subtle)',
                                borderRadius: '8px', padding: '0.4rem', display: 'flex', flexDirection: 'column',
                                gap: '0.2rem', minWidth: '150px', backdropFilter: 'blur(20px)',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.5)', zIndex: 999
                            }}>
                                {THEMES.map((theme, i) => (
                                    <button
                                        key={theme.id}
                                        onClick={() => { setThemeIndex(i); setDropdownOpen(false); }}
                                        style={{
                                            textAlign: 'left', padding: '0.5rem 1rem',
                                            background: themeIndex === i ? 'var(--bg-card)' : 'none',
                                            border: 'none', color: themeIndex === i ? 'var(--accent-blue)' : 'var(--text-primary)',
                                            fontWeight: themeIndex === i ? 600 : 400,
                                            cursor: 'pointer', borderRadius: '4px', transition: 'all 0.2s',
                                            fontSize: '0.85rem', fontFamily: 'Space Grotesk, sans-serif'
                                        }}
                                        onMouseEnter={e => { if (themeIndex !== i) e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}
                                        onMouseLeave={e => { if (themeIndex !== i) e.currentTarget.style.background = 'none' }}
                                    >
                                        {theme.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <a
                        href="mailto:chaudharikunal154@gmail.com"
                        className="btn-primary"
                        style={{ textDecoration: 'none', fontSize: '0.82rem', padding: '0.5rem 1.2rem' }}
                    >
                        Hire Me
                    </a>
                </div>

                {/* Mobile hamburger */}
                <button
                    onClick={() => setOpen(!open)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', display: 'none' }}
                    className="show-mobile"
                >
                    {open ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div style={{
                    background: 'rgba(8,10,15,0.97)', borderTop: '1px solid var(--border-subtle)',
                    padding: '1.5rem',
                }}>
                    {links.map(l => (
                        <button
                            key={l}
                            onClick={() => scrollTo(l)}
                            style={{
                                display: 'block', width: '100%', textAlign: 'left', background: 'none',
                                border: 'none', cursor: 'pointer', color: 'var(--text-secondary)',
                                fontFamily: 'Space Grotesk, sans-serif', fontSize: '1rem',
                                padding: '0.6rem 0', borderBottom: '1px solid var(--border-subtle)',
                            }}
                        >
                            {l}
                        </button>
                    ))}
                </div>
            )}

            <style>{`
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
        </nav>
    )
}
