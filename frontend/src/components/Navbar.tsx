import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { to: '/', label: 'Головна', exact: true },
  { to: '/services', label: 'Послуги', exact: false },
  { hash: '#team', label: 'Майстри' },
  { hash: '#gallery', label: 'Портфоліо' },
  { hash: '#promotions', label: 'Акції' },
  { hash: '#about', label: 'Про салон' },
  { to: '/reviews', label: 'Відгуки', exact: false },
  { hash: '#contacts', label: 'Контакти' },
] as const

const SCROLL_SPY_IDS = links.filter((l) => 'hash' in l).map((l) => l.hash.slice(1))

const PHONE = '+38 (099) 123 45 67'

function BrandMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" className="shrink-0">
      <rect width="32" height="32" rx="9" fill="#FFE4E9"/>
      <path d="M16 5 L18.4 13.6 L27 16 L18.4 18.4 L16 27 L13.6 18.4 L5 16 L13.6 13.6 Z" fill="#E11D74"/>
    </svg>
  )
}

const PILL_TRANSITION = { type: 'spring', stiffness: 380, damping: 32, mass: 0.8 } as const

// shared by every nav item — to-route or hash-section alike — so the pill is a
// single continuous layoutId across the whole nav, not two separate mechanisms
function PillLabel({ active, label }: { active: boolean; label: string }) {
  return (
    <>
      {active && (
        <motion.span
          layoutId="nav-active-pill"
          className="absolute inset-0 rounded-xl bg-rose-50"
          transition={PILL_TRANSITION}
        />
      )}
      <span className={`relative z-10 ${active ? 'text-rose-600' : ''}`}>{label}</span>
    </>
  )
}

export function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeHash, setActiveHash] = useState<string | null>(null)
  // while a click-triggered scroll is in flight, the scroll-spy below must not
  // recompute the active section from intermediate positions it scrolls past —
  // that's what made the pill visibly hop through every section in between
  const suppressSpy = useRef(false)
  const suppressTimer = useRef<number | undefined>(undefined)
  const releaseSpy = useRef<(() => void) | null>(null)

  useEffect(() => {
    if (location.pathname !== '/') return

    const elements = SCROLL_SPY_IDS
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
      .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top)

    if (elements.length === 0) return

    let rafId = 0
    let ticking = false

    const measure = () => {
      ticking = false
      if (suppressSpy.current) return
      const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2
      if (atBottom) {
        setActiveHash(`#${elements[elements.length - 1].id}`)
        return
      }

      // the active section is whichever tracked section covers the most visible
      // viewport area — robust across very different section heights, unlike a
      // fixed trigger-line check on the top edge (tall sections would otherwise
      // stay "not yet active" long after they already dominate the screen)
      const viewportHeight = window.innerHeight
      let bestId: string | null = null
      let bestArea = 0
      for (const el of elements) {
        const r = el.getBoundingClientRect()
        const area = Math.max(0, Math.min(r.bottom, viewportHeight) - Math.max(r.top, 0))
        if (area > bestArea) {
          bestArea = area
          bestId = el.id
        }
      }

      // if no tracked section covers a meaningful share of the screen, the user
      // is browsing an untracked section (reviews, booking form, instagram, FAQ)
      // — don't keep the previous tracked section artificially highlighted.
      // 35% (not 50%) because some tracked sections (e.g. "Акції", ~430px) are
      // shorter than half the viewport and could never reach 50% even when
      // fully visible.
      const current = bestId && bestArea > viewportHeight * 0.35 ? bestId : null
      setActiveHash(current ? `#${current}` : null)
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      rafId = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [location.pathname])

  const effectiveActiveHash = location.pathname === '/' ? activeHash : null

  // hash === null means "go home" (scroll to top, no section)
  const goToSection = (hash: string | null) => {
    // jump the pill straight to the clicked item and lock out the scroll-spy
    // for the duration of the smooth scroll, so it can't override this choice
    // with whatever section happens to pass through the viewport along the way
    setActiveHash(hash)
    suppressSpy.current = true
    window.clearTimeout(suppressTimer.current)
    if (releaseSpy.current) window.removeEventListener('scrollend', releaseSpy.current)

    const release = () => {
      suppressSpy.current = false
      window.removeEventListener('scrollend', release)
      window.clearTimeout(suppressTimer.current)
      releaseSpy.current = null
    }
    releaseSpy.current = release
    window.addEventListener('scrollend', release, { once: true })
    suppressTimer.current = window.setTimeout(release, 1500)

    if (location.pathname === '/') {
      // on hash-section pages the URL never actually carries the hash (see
      // below), so navigating to "/" while already on "/" is a router no-op —
      // home must scroll manually instead of relying on a route change
      if (hash) {
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' })
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    } else {
      navigate(hash ? `/${hash}` : '/')
    }
  }

  const goHome = () => goToSection(null)
  const goToBooking = () => goToSection('#booking-form')

  // Home's NavLink already navigates correctly from /services or /reviews
  // (pathname actually changes there); only intercept the case where we're
  // already on "/" and a router navigation to "/" would be a no-op
  const handleHomeClick = (e: { preventDefault: () => void }) => {
    if (location.pathname !== '/') return
    e.preventDefault()
    goHome()
  }

  // "Головна" matches "/" exactly the same as any hash section does (both only
  // apply while pathname === '/'), so it must also yield to whichever section
  // is currently active — otherwise both would show as active at once
  const isHomeLinkActive = (routerIsActive: boolean, to: string) =>
    to === '/' ? routerIsActive && effectiveActiveHash === null : routerIsActive

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-md border-b border-rose-100">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2.5 shrink-0">
          <BrandMark />
          <span className="font-bold text-sm text-stone-800 tracking-tight">Lumière Nails</span>
        </NavLink>

        {/* Desktop nav */}
        {/* overflow-y-hidden: setting only overflow-x forces overflow-y to compute
            as "auto" too (CSS rule for mismatched axes), so the pill's spring
            transform — which can briefly overshoot during its FLIP animation —
            registers as scrollable overflow and pops a vertical scrollbar at
            the nav's right edge, right where the phone number sits */}
        <nav className="hidden md:flex items-center gap-0.5 flex-1 min-w-0 overflow-x-auto overflow-y-hidden">
          {links.map((l) =>
            'to' in l ? (
              <NavLink
                key={l.label}
                to={l.to}
                end={l.exact}
                onClick={l.to === '/' ? handleHomeClick : undefined}
                className="relative px-2.5 py-2 rounded-xl text-[13px] font-medium whitespace-nowrap transition-colors text-stone-500 hover:text-stone-800 hover:bg-rose-50/60"
              >
                {({ isActive }) => <PillLabel active={isHomeLinkActive(isActive, l.to)} label={l.label} />}
              </NavLink>
            ) : (
              <a
                key={l.label}
                href={l.hash}
                onClick={(e) => { e.preventDefault(); goToSection(l.hash) }}
                className="relative px-2.5 py-2 rounded-xl text-[13px] font-medium whitespace-nowrap transition-colors text-stone-500 hover:text-stone-800 hover:bg-rose-50/60"
              >
                <PillLabel active={effectiveActiveHash === l.hash} label={l.label} />
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
                  onClick={(e) => { if (l.to === '/') handleHomeClick(e); setMenuOpen(false) }}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isHomeLinkActive(isActive, l.to) ? 'text-rose-600 bg-rose-50' : 'text-stone-500 hover:text-stone-800 hover:bg-rose-50/60'}`
                  }
                >
                  {l.label}
                </NavLink>
              ) : (
                <a
                  key={l.label}
                  href={l.hash}
                  onClick={(e) => { e.preventDefault(); goToSection(l.hash); setMenuOpen(false) }}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${effectiveActiveHash === l.hash ? 'text-rose-600 bg-rose-50' : 'text-stone-500 hover:text-stone-800 hover:bg-rose-50/60'}`}
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
