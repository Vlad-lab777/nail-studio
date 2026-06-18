import { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { to: '/', label: 'Головна', exact: true },
  { to: '/services', label: 'Послуги' },
  { to: '/reviews', label: 'Відгуки' },
]

function BrandMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" className="shrink-0">
      <rect width="32" height="32" rx="9" fill="#FFE4E9"/>
      <path d="M16 5 L18.4 13.6 L27 16 L18.4 18.4 L16 27 L13.6 18.4 L5 16 L13.6 13.6 Z" fill="#E11D74"/>
    </svg>
  )
}

export function Navbar() {
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      style={{ backgroundColor: scrolled ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.6)' }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 backdrop-blur-md ${scrolled ? 'border-b border-rose-100 shadow-sm' : 'border-b border-transparent'}`}
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center gap-6">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2.5 shrink-0">
          <BrandMark />
          <span className="font-bold text-sm text-stone-800 tracking-tight">Lumière Nails</span>
        </NavLink>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 flex-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.exact}
              className={({ isActive }) =>
                `px-4 py-2 rounded-xl text-sm font-medium transition-colors ${isActive ? 'text-rose-600 bg-rose-50' : 'text-stone-500 hover:text-stone-800 hover:bg-rose-50/60'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2 ml-auto">
          <button
            onClick={() => navigate('/booking')}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-rose-400 to-pink-500 text-white text-sm font-semibold shadow-lg shadow-rose-300/40 hover:shadow-rose-300/60 transition-shadow"
          >
            Записатись
          </button>
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="md:hidden ml-auto w-9 h-9 flex items-center justify-center rounded-xl text-stone-500 hover:text-stone-800 hover:bg-rose-50 transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
            ) : (
              <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="md:hidden bg-white/95 backdrop-blur-md border-b border-rose-100 px-4 pb-4 flex flex-col gap-1"
          >
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.exact}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isActive ? 'text-rose-600 bg-rose-50' : 'text-stone-500 hover:text-stone-800 hover:bg-rose-50/60'}`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <button
              onClick={() => { navigate('/booking'); setMenuOpen(false) }}
              className="mt-2 px-4 py-3 rounded-xl bg-gradient-to-r from-rose-400 to-pink-500 text-white text-sm font-semibold text-center"
            >
              Записатись
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
