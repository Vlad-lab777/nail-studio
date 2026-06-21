import { useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { to: '/', label: 'Головна', exact: true },
  { to: '/services', label: 'Послуги', exact: false },
  { href: '#', label: 'Майстри' },
  { href: '#gallery', label: 'Портфоліо' },
  { href: '#', label: 'Акції' },
  { href: '#', label: 'Про салон' },
  { to: '/reviews', label: 'Відгуки', exact: false },
  { href: '#contacts', label: 'Контакти' },
] as const

const PHONE = '+38 (099) 123 45 67'

function BrandMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" className="shrink-0">
      <rect width="32" height="32" rx="9" fill="#FFE4E9"/>
      <path d="M16 5 L18.4 13.6 L27 16 L18.4 18.4 L16 27 L13.6 18.4 L5 16 L13.6 13.6 Z" fill="#E11D74"/>
    </svg>
  )
}

const linkClass = (isActive: boolean) =>
  `px-2.5 py-2 rounded-xl text-[13px] font-medium whitespace-nowrap transition-colors ${isActive ? 'text-rose-600 bg-rose-50' : 'text-stone-500 hover:text-stone-800 hover:bg-rose-50/60'}`

export function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const goToBooking = () => {
    if (location.pathname === '/') {
      document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/#booking-form')
    }
  }

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-md border-b border-rose-100">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2.5 shrink-0">
          <BrandMark />
          <span className="font-bold text-sm text-stone-800 tracking-tight">Lumière Nails</span>
        </NavLink>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5 flex-1 min-w-0 overflow-x-auto">
          {links.map((l) =>
            'to' in l ? (
              <NavLink key={l.label} to={l.to} end={l.exact} className={({ isActive }) => linkClass(isActive)}>
                {l.label}
              </NavLink>
            ) : (
              <a key={l.label} href={l.href} className={linkClass(false)}>
                {l.label}
              </a>
            )
          )}
        </nav>

        <div className="hidden md:flex items-center gap-3 lg:gap-4 ml-auto shrink-0">
          <a href={`tel:${PHONE.replace(/[^+\d]/g, '')}`} className="hidden xl:flex items-center gap-1.5 text-[13px] font-medium text-stone-600 hover:text-stone-800 transition-colors whitespace-nowrap">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            {PHONE}
          </a>
          <button
            onClick={goToBooking}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-rose-400 to-pink-500 text-white text-sm font-semibold shadow-lg shadow-rose-300/40 hover:shadow-rose-300/60 transition-shadow whitespace-nowrap"
          >
            Записатися онлайн
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
            className="md:hidden bg-white/95 backdrop-blur-md border-b border-rose-100 px-4 pb-4 flex flex-col gap-1 max-h-[calc(100vh-4rem)] overflow-y-auto"
          >
            {links.map((l) =>
              'to' in l ? (
                <NavLink
                  key={l.label}
                  to={l.to}
                  end={l.exact}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isActive ? 'text-rose-600 bg-rose-50' : 'text-stone-500 hover:text-stone-800 hover:bg-rose-50/60'}`
                  }
                >
                  {l.label}
                </NavLink>
              ) : (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 rounded-xl text-sm font-medium text-stone-500 hover:text-stone-800 hover:bg-rose-50/60 transition-colors"
                >
                  {l.label}
                </a>
              )
            )}
            <a href={`tel:${PHONE.replace(/[^+\d]/g, '')}`} className="px-4 py-3 text-sm font-medium text-stone-600">
              {PHONE}
            </a>
            <button
              onClick={() => { goToBooking(); setMenuOpen(false) }}
              className="mt-1 px-4 py-3 rounded-xl bg-gradient-to-r from-rose-400 to-pink-500 text-white text-sm font-semibold text-center"
            >
              Записатися онлайн
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
