import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const navLinks = [
    { href: '#home',     label: 'Home'     },
    { href: '#about',    label: 'About'    },
    { href: '#skills',   label: 'Skills'   },
    { href: '#projects', label: 'Projects' },
    { href: '#contact',  label: 'Contact'  },
  ]

  const socials = [
    {
      label: 'LinkedIn',
      href: '#',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
    {
      label: 'GitHub',
      href: 'https://github.com/azizfaisal992',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
        </svg>
      ),
    },
    {
      label: 'Twitter',
      href: '#',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
    },
    {
      label: 'Email',
      href: 'mailto:faisal@example.com',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      ),
    },
  ]

  return (
    <footer className="relative bg-gray-950 overflow-hidden">

      {/* ── TOP GRADIENT LINE (mirrors header) ── */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lime-400 to-transparent" />

      {/* ── BACKGROUND GLOW ── */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-lime-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">

        {/* ── UPPER SECTION ── */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-10 border-b border-white/10">

          {/* Brand Column */}
          <div className="flex flex-col gap-5">
            {/* FA Logo (same as header) */}
            <a href="#home" className="flex items-center gap-3 group w-fit">
              <div className="relative w-11 h-11 rounded-xl overflow-hidden flex items-center justify-center bg-gray-900 border border-white/10 group-hover:border-lime-400/50 transition-colors duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-lime-400/20 via-transparent to-transparent group-hover:from-lime-400/30 transition-all duration-300" />
                <div className="absolute top-0 right-0 w-3 h-3 bg-lime-400 rounded-bl-lg group-hover:w-4 group-hover:h-4 transition-all duration-300" />
                <span className="relative z-10 text-sm font-black tracking-tight">
                  <span className="text-lime-400">F</span>
                  <span className="text-white">A</span>
                </span>
              </div>
              <div className="flex flex-col leading-none gap-1">
                <span className="text-base font-black text-white tracking-wide">
                  Faisal <span className="text-lime-400">Aziz</span>
                </span>
                <span className="text-[9px] font-mono text-gray-500 tracking-[3px] uppercase">
                  Portfolio
                </span>
              </div>
            </a>

            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Crafting clean, performant, and beautiful digital experiences. Open to freelance and full-time opportunities.
            </p>

            {/* Availability status */}
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-[10px] font-mono text-gray-400 tracking-wide">
                available for work
              </span>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[10px] font-mono text-gray-500 tracking-[3px] uppercase">
              Navigation
            </h4>
            <nav className="flex flex-col gap-2">
              {navLinks.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  className="group flex items-center gap-2 text-sm text-gray-400 hover:text-lime-400 transition-colors duration-200 w-fit"
                >
                  <span className="w-0 h-px bg-lime-400 group-hover:w-4 transition-all duration-200" />
                  {label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact / CTA */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[10px] font-mono text-gray-500 tracking-[3px] uppercase">
              Get In Touch
            </h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              Have a project in mind? Let's build something great together.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-lime-400 text-gray-950 text-xs font-black tracking-widest uppercase rounded-lg w-fit
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

            {/* Social icons */}
            <div className="flex items-center gap-2 mt-1">
              {socials.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="relative w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 border border-white/10
                    hover:text-lime-400 hover:border-lime-400/40 hover:bg-lime-400/10
                    transition-all duration-200 group overflow-hidden"
                >
                  <span className="absolute inset-0 bg-lime-400/10 scale-0 group-hover:scale-100 transition-transform duration-200 rounded-lg" />
                  <span className="relative z-10">{icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs font-mono text-gray-600">
            © {new Date().getFullYear()} <span className="text-gray-400">Faisal Aziz</span>. All rights reserved.
          </p>
          <p className="text-xs font-mono text-gray-600 flex items-center gap-1.5">
            Built with
            <span className="text-lime-400 font-bold">React</span>
            <span className="text-gray-700">·</span>
            <span className="text-lime-400 font-bold">Tailwind</span>
          </p>
        </div>

      </div>
    </footer>
  )
}

export default Footer
