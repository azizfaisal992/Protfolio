import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('home')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/',         label: 'Home',     id: 'home'     },
    { href: '/about',    label: 'About',    id: 'about'    },
    { href: '/project',  label: 'Projects', id: 'projects' },
    { href: '/contact',  label: 'Contact',  id: 'contact'  },
  ]

  return (
    <>
      {/* ── MAIN HEADER ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 px-6 transition-all duration-500 ${
          scrolled
            ? 'bg-gray-950/90 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/50'
            : 'bg-transparent'
        }`}
      >
        {/* Top gradient line (visible on scroll) */}
        <div
          className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lime-400 to-transparent transition-opacity duration-500 ${
            scrolled ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <div className="max-w-6xl mx-auto flex items-center justify-between h-16">

          {/* ── LOGO ── */}
          <Link to="/" className="flex items-center gap-3 group">
            {/* FA Monogram Mark */}
            <div className="relative w-11 h-11 rounded-xl overflow-hidden flex items-center justify-center bg-gray-900 border border-white/10 group-hover:border-lime-400/50 transition-colors duration-300">
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-lime-400/20 via-transparent to-transparent group-hover:from-lime-400/30 transition-all duration-300" />
              {/* Corner accent square */}
              <div className="absolute top-0 right-0 w-3 h-3 bg-lime-400 rounded-bl-lg group-hover:w-4 group-hover:h-4 transition-all duration-300" />
              {/* FA Letters */}
              <span className="relative z-10 text-sm font-black tracking-tight">
                <span className="text-lime-400">F</span>
                <span className="text-white">A</span>
              </span>
            </div>
            {/* Name + tagline */}
            <div className="flex flex-col leading-none gap-1">
              <span className="text-base font-black text-black tracking-wide">
                Faisal <span className="text-lime-400">Aziz</span>
              </span>
              <span className="text-[9px] font-mono text-gray-500 tracking-[3px] uppercase">
                Portfolio
              </span>
            </div>
          </Link>

          {/* ── DESKTOP NAV ── */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label, id }) => (
              href.startsWith('#') ? (
                <a
                  key={id}
                  href={href}
                  onClick={() => setActiveLink(id)}
                  className={`relative px-4 py-2 text-xs font-bold tracking-widest uppercase rounded-lg transition-colors duration-200 group ${
                    activeLink === id ? 'text-lime-400' : 'text-gray-400 hover:text-lime-400'
                  }`}
                >
                  {/* Hover pill background */}
                  <span className="absolute inset-0 rounded-lg bg-lime-400/10 scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-out" />
                  <span className="relative z-10">{label}</span>
                  {/* Active indicator dot */}
                  {activeLink === id && (
                    <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-lime-400" />
                  )}
                </a>
              ) : (
                <Link
                  key={id}
                  to={href}
                  onClick={() => setActiveLink(id)}
                  className={`relative px-4 py-2 text-xs font-bold tracking-widest uppercase rounded-lg transition-colors duration-200 group ${
                    activeLink === id ? 'text-lime-400' : 'text-gray-400 hover:text-lime-400'
                  }`}
                >
                  {/* Hover pill background */}
                  <span className="absolute inset-0 rounded-lg bg-lime-400/10 scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-out" />
                  <span className="relative z-10">{label}</span>
                  {/* Active indicator dot */}
                  {activeLink === id && (
                    <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-lime-400" />
                  )}
                </Link>
              )
            ))}
          </nav>

          {/* ── RIGHT SECTION ── */}
          <div className="flex items-center gap-4">
            {/* Availability badge */}
            <div className="hidden lg:flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-[10px] font-mono text-gray-400 tracking-wide">
                available for work
              </span>
            </div>

            {/* Hire Me CTA */}
            <Link
              to="/contact"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2 bg-lime-400 text-gray-950 text-xs font-black tracking-widest uppercase rounded-lg
                hover:bg-lime-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-lime-400/30
                transition-all duration-200 group"
            >
              Hire Me
              <svg
                className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex md:hidden flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-white/5 transition-colors duration-200 gap-1.5"
              aria-label="Toggle navigation menu"
            >
              <span className={`block w-5 h-0.5 bg-white rounded-full transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
              <span className={`block w-5 h-0.5 bg-white rounded-full transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>

        </div>
      </header>

      {/* ── MOBILE FULL-SCREEN MENU ── */}
      <div
        className={`fixed inset-0 top-16 z-40 bg-gray-950/98 backdrop-blur-2xl
          flex flex-col items-center justify-center gap-3
          transition-all duration-300 md:hidden
          ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        {navLinks.map(({ href, label, id }) => (
          href.startsWith('#') ? (
            <a
              key={id}
              href={href}
              onClick={() => { setActiveLink(id); setMenuOpen(false) }}
              className="text-4xl font-black text-gray-600 hover:text-lime-400 hover:translate-x-2 transition-all duration-200 tracking-tight"
            >
              {label}
            </a>
          ) : (
            <Link
              key={id}
              to={href}
              onClick={() => { setActiveLink(id); setMenuOpen(false) }}
              className="text-4xl font-black text-gray-600 hover:text-lime-400 hover:translate-x-2 transition-all duration-200 tracking-tight"
            >
              {label}
            </Link>
          )
        ))}

        {/* Mobile CTA area */}
        <div className="mt-10 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-[10px] font-mono text-gray-500 tracking-[3px] uppercase">
              Faisal Aziz · Available
            </span>
          </div>
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="px-10 py-3.5 bg-lime-400 text-gray-950 text-sm font-black tracking-widest uppercase rounded-xl
              hover:bg-lime-300 active:scale-95 transition-all duration-200"
          >
            Hire Me
          </Link>
        </div>
      </div>
    </>
  )
}

export default Header
