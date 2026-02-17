import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'


const useCounter = (end, duration = 2000, start = false) => {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime = null
    const step = (ts) => {
      if (!startTime) startTime = ts
      const progress = Math.min((ts - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [end, duration, start])
  return count
}

const useTypewriter = (words, speed = 80, pause = 2000) => {
  const [display, setDisplay] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)
  useEffect(() => {
    const current = words[wordIdx]
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplay(current.slice(0, charIdx + 1))
        if (charIdx + 1 === current.length) setTimeout(() => setDeleting(true), pause)
        else setCharIdx(c => c + 1)
      } else {
        setDisplay(current.slice(0, charIdx - 1))
        if (charIdx - 1 === 0) { setDeleting(false); setWordIdx(w => (w + 1) % words.length); setCharIdx(0) }
        else setCharIdx(c => c - 1)
      }
    }, deleting ? speed / 2 : speed)
    return () => clearTimeout(timeout)
  }, [charIdx, deleting, wordIdx, words, speed, pause])
  return display
}

const useInView = (threshold = 0.15) => {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, inView]
}

/* 
section raper and fader*/
const Section = ({ children, className = '', delay = 0 }) => {
  const [ref, inView] = useInView()
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

/* DATA */
const services = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
    title: 'UI / UX Design',
    desc: 'Crafting intuitive interfaces that balance beauty with usability — from wireframes to polished high-fidelity designs.',
    tag: 'Figma · Prototyping',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    title: 'Frontend Development',
    desc: 'Building fast, accessible, and pixel-perfect web apps with React and Next.js — clean code that performs.',
    tag: 'React · Next.js · Tailwind',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 8.25h3m-3 3h3m-3 3h3" />
      </svg>
    ),
    title: 'Responsive Web Apps',
    desc: 'Every project I build works flawlessly across all screen sizes — mobile-first by default.',
    tag: 'PWA · Mobile-first',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: 'Performance & SEO',
    desc: 'Optimised for Core Web Vitals, fast load times, and search rankings — so your users and Google both love it.',
    tag: 'Lighthouse · SEO',
  },
]

const projects = [
  {
    num: '01',
    title: 'E-Commerce Dashboard',
    desc: 'A full-featured admin dashboard with real-time analytics, inventory management, and order tracking.',
    tags: ['React', 'Tailwind', 'Chart.js'],
    accent: 'from-lime-400/20 to-emerald-400/5',
    border: 'border-lime-400/20',
  },
  {
    num: '02',
    title: 'SaaS Landing Page',
    desc: 'Conversion-optimised landing page with animated sections, pricing tables, and integrated CMS.',
    tags: ['Next.js', 'Framer Motion', 'Sanity'],
    accent: 'from-blue-400/20 to-cyan-400/5',
    border: 'border-blue-400/20',
  },
  // {
  //   num: '03',
  //   title: 'Portfolio & Blog',
  //   desc: 'A minimal yet expressive personal site with an MDX-powered blog, dark mode, and custom animations.',
  //   tags: ['Next.js', 'MDX', 'TypeScript'],
  //   accent: 'from-purple-400/20 to-pink-400/5',
  //   border: 'border-purple-400/20',
  // },
  {
    num: '03',
    title: 'Real-time Chat App',
    desc: 'Instant messaging with rooms, presence indicators, and emoji reactions — powered by WebSockets.',
    tags: ['React', 'Socket.io', 'Node.js'],
    accent: 'from-orange-400/20 to-red-400/5',
    border: 'border-orange-400/20',
  },
]

const testimonials = [
  {
    name: 'Sara Khan',
    role: 'CEO, LaunchPad',
    body: 'Faisal delivered our dashboard in record time. Clean code, pixel-perfect design, and zero revisions needed.',
    rating: 5,
  },
  {
    name: 'James Miller',
    role: 'CTO, DevStack',
    body: 'One of the best frontend devs I\'ve worked with. He truly understands both design and engineering.',
    rating: 5,
  },
  {
    name: 'Aisha Rauf',
    role: 'Founder, Bloom',
    body: 'Our conversion rate jumped 40% after Faisal redesigned our landing page. Exceptional work.',
    rating: 5,
  },
]

const techStack = [
  { name: 'React',       color: 'text-cyan-400',    bg: 'bg-cyan-400/10',    border: 'border-cyan-400/20'    },
  { name: 'Next.js',     color: 'text-white',        bg: 'bg-white/5',        border: 'border-white/10'       },
  { name: 'Tailwind',    color: 'text-sky-400',      bg: 'bg-sky-400/10',     border: 'border-sky-400/20'     },
  { name: 'Node.js',     color: 'text-lime-400',     bg: 'bg-lime-400/10',    border: 'border-lime-400/20'    },
  { name: 'Figma',       color: 'text-pink-400',     bg: 'bg-pink-400/10',    border: 'border-pink-400/20'    },
  { name: 'MongoDB',     color: 'text-green-400',    bg: 'bg-green-400/10',   border: 'border-green-400/20'   },
  { name: 'GraphQL',     color: 'text-fuchsia-400',  bg: 'bg-fuchsia-400/10', border: 'border-fuchsia-400/20' },
  { name: 'Git',         color: 'text-orange-400',   bg: 'bg-orange-400/10',  border: 'border-orange-400/20'  },
  { name: 'Framer',      color: 'text-violet-400',   bg: 'bg-violet-400/10',  border: 'border-violet-400/20'  },
]

/* 
   MAIN COMPONENT
 */
const Home = () => {
  const [visible, setVisible] = useState(false)
  const [statsRef, statsInView] = useInView(0.3)

  const role     = useTypewriter(['Frontend Developer', 'React Specialist', 'Creative Coder'], 80, 2000)
  const projects_ = useCounter(10, 1800, statsInView)
  const clients_  = useCounter(5, 2000, statsInView)
  const exp_      = useCounter(1,  1500, statsInView)
  const happy_    = useCounter(93, 2200, statsInView)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  const fadeUp = (delay = 0) =>
    `transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`

  return (
    <div id="home" className="bg-gray-950 text-white overflow-x-hidden mt-16">

      {/*  HERO SECTION*/}
      <section className="relative min-h-screen flex items-center overflow-hidden">

        {/* Background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

        {/* Radial glows */}
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-lime-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-lime-400/3 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-emerald-400/5 rounded-full blur-3xl pointer-events-none" />

        {/* Floating dots */}
        <div className="absolute top-28 right-20 w-3 h-3 bg-lime-400 rounded-full opacity-60 animate-bounce" style={{ animationDuration: '3s' }} />
        <div className="absolute top-48 right-48 w-1.5 h-1.5 bg-lime-400 rounded-full opacity-40 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-24 w-2 h-2 bg-emerald-400 rounded-full opacity-50 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }} />
        <div className="absolute top-1/3 left-10 w-1 h-1 bg-lime-400 rounded-full opacity-30 animate-ping" style={{ animationDuration: '2.5s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-white rounded-full opacity-20 animate-ping" style={{ animationDuration: '3s', animationDelay: '1.2s' }} />

        {/* Vertical accent line */}
        <div className="absolute top-0 right-[32%] w-px h-full bg-gradient-to-b from-transparent via-lime-400/15 to-transparent hidden lg:block" />

        <div className="relative max-w-6xl mx-auto px-6 pt-28 pb-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* LEFT */}
            <div className="flex flex-col gap-7">

              {/* Availability badge */}
              <div className={`flex items-center gap-2 w-fit px-4 py-2 rounded-full border border-lime-400/30 bg-lime-400/5 ${fadeUp(0)}`} style={{ transitionDelay: '0ms' }}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span className="text-[10px] font-mono text-lime-400 tracking-[3px] uppercase">Available for work</span>
              </div>

              {/* Name */}
              <div className={`${fadeUp(150)}`} style={{ transitionDelay: '150ms' }}>
                <p className="text-xs font-mono text-gray-500 tracking-[5px] uppercase mb-3">Hello, I'm</p>
                <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black leading-none tracking-tight">
                  <span className="text-white block">Faisal</span>
                  <span className="text-lime-400 block">Aziz</span>
                </h1>
              </div>

              {/* Typewriter */}
              <div className={`${fadeUp(300)}`} style={{ transitionDelay: '300ms' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-px bg-lime-400" />
                  <p className="text-xl font-mono text-gray-300 min-h-[1.75rem]">
                    {role}
                    <span className="inline-block w-0.5 h-5 bg-lime-400 ml-0.5 animate-pulse align-middle" />
                  </p>
                </div>
              </div>

              {/* Bio */}
              <p className={`text-gray-400 text-base leading-relaxed max-w-lg ${fadeUp(450)}`} style={{ transitionDelay: '450ms' }}>
                I design and build exceptional digital experiences — combining clean code with thoughtful UI to create products people love using. Based in Pakistan, working globally.
              </p>

              {/* CTAs */}
              <div className={`flex flex-wrap gap-3 ${fadeUp(550)}`} style={{ transitionDelay: '550ms' }}>
                <a href="#projects"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-lime-400 text-gray-950 text-sm font-black tracking-widest uppercase rounded-xl hover:bg-lime-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-lime-400/30 transition-all duration-200 group">
                  View Projects
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
                <Link to="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/10 text-white text-sm font-bold tracking-widest uppercase rounded-xl hover:border-lime-400/50 hover:bg-lime-400/5 hover:text-lime-400 hover:-translate-y-0.5 transition-all duration-200">
                  Contact Me
                </Link>
                <a href="/CV.pdf" download="Abdul-Aziz-Faisal-CV.pdf"
                  className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/10 text-gray-400 text-sm font-bold tracking-widest uppercase rounded-xl hover:border-white/30 hover:text-white hover:-translate-y-0.5 transition-all duration-200 group">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  Resume
                </a>
              </div>

              {/* Tech pills */}
              <div className={`flex flex-wrap gap-2 ${fadeUp(650)}`} style={{ transitionDelay: '650ms' }}>
                {['React', 'Next.js', 'Tailwind', 'Node.js',  'Figma'].map((tech, ) => (
                  <span key={tech}
                    className="px-3 py-1 text-[10px] font-mono tracking-widest text-gray-500 border border-white/10 rounded-full hover:border-lime-400/40 hover:text-lime-400 hover:bg-lime-400/5 transition-all duration-200 cursor-default">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* RIGHT — Visual card */}
            <div className={`relative flex items-center justify-center transition-all duration-1000 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`} style={{ transitionDelay: '400ms' }}>
              <div className="absolute w-72 h-72 rounded-full border border-lime-400/10 animate-spin" style={{ animationDuration: '22s' }} />
              <div className="absolute w-80 h-80 rounded-full border border-dashed border-white/5 animate-spin" style={{ animationDuration: '35s', animationDirection: 'reverse' }} />
              <div className="absolute w-64 h-64 rounded-full border border-dotted border-lime-400/5 animate-spin" style={{ animationDuration: '15s' }} />

              <div className="relative w-64 h-72 rounded-3xl bg-gray-900 border border-white/10 overflow-hidden group hover:border-lime-400/30 transition-colors duration-500 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-lime-400/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/10">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-lime-400/70" />
                  <span className="ml-2 text-[9px] font-mono text-gray-600">faisal-aziz.dev</span>
                </div>
                <div className="p-5 flex flex-col gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-lime-400/30 to-emerald-400/10 border border-lime-400/20 flex items-center justify-center">
                    <span className="text-2xl font-black text-lime-400">FA</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="h-3 w-24 bg-white/10 rounded-full" />
                    <div className="h-2 w-16 bg-lime-400/30 rounded-full" />
                  </div>
                  <div className="flex flex-col gap-1.5 font-mono">
                    <div className="flex gap-2 items-center">
                      <span className="text-lime-400 text-[10px]">const</span>
                      <span className="text-blue-400 text-[10px]">dev</span>
                      <span className="text-gray-500 text-[10px]">=</span>
                      <span className="text-orange-400 text-[10px]">"Faisal"</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <span className="text-lime-400 text-[10px]">role</span>
                      <span className="text-gray-500 text-[10px]">:</span>
                      <span className="text-pink-400 text-[10px]">"Frontend"</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <span className="text-lime-400 text-[10px]">status</span>
                      <span className="text-gray-500 text-[10px]">:</span>
                      <span className="text-emerald-400 text-[10px]">true ✓</span>
                    </div>
                  </div>
                  <div className="flex items-end gap-1 h-10">
                    {[40, 65, 50, 80, 60, 90, 75].map((h, i) => (
                      <div key={i} className="flex-1 bg-lime-400/20 rounded-sm hover:bg-lime-400/50 transition-colors duration-200" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 px-3 py-1.5 bg-gray-900 border border-lime-400/30 rounded-full flex items-center gap-2 shadow-xl animate-bounce" style={{ animationDuration: '4s' }}>
                <span className="w-2 h-2 rounded-full bg-lime-400" />
                <span className="text-[10px] font-mono text-lime-400">Open to work</span>
              </div>
              <div className="absolute -bottom-4 -left-4 px-3 py-1.5 bg-gray-900 border border-white/10 rounded-full flex items-center gap-2 shadow-xl animate-bounce" style={{ animationDuration: '5s', animationDelay: '0.5s' }}>
                <span className="text-[10px] font-mono text-gray-400">⚡ Fast delivery</span>
              </div>
            </div>
          </div>

          {/* STATS */}
          <div ref={statsRef} className={`mt-24 grid grid-cols-2 sm:grid-cols-4 gap-4 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '700ms' }}>
            {[
              { value: projects_, suffix: '+', label: 'Projects Done'   },
              { value: clients_,  suffix: '+', label: 'Happy Clients'   },
              { value: exp_,      suffix: 'y',  label: 'Years Exp.'      },
              { value: happy_,    suffix: '%',  label: 'Satisfaction'    },
            ].map(({ value, suffix, label }) => (
              <div key={label} className="relative flex flex-col items-center gap-1 py-7 rounded-2xl bg-gray-900/50 border border-white/5 hover:border-lime-400/20 hover:bg-gray-900 transition-all duration-300 group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-lime-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative text-4xl font-black text-white">{value}<span className="text-lime-400">{suffix}</span></span>
                <span className="relative text-[10px] font-mono text-gray-500 tracking-[2px] uppercase">{label}</span>
              </div>
            ))}
          </div>

          {/* Scroll indicator */}
          <div className={`mt-16 flex flex-col items-center gap-2 transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1000ms' }}>
            <span className="text-[9px] font-mono text-gray-600 tracking-[3px] uppercase">Scroll down</span>
            <div className="w-px h-10 bg-gradient-to-b from-gray-600 to-transparent relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-3 bg-lime-400 animate-bounce" style={{ animationDuration: '1.5s' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SERVICES SECTION
      ══════════════════════════════════════ */}
      <section className="py-28 relative">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="relative max-w-6xl mx-auto px-6">
          <Section>
            <div className="flex flex-col gap-2 mb-14">
              <span className="text-[10px] font-mono text-lime-400 tracking-[4px] uppercase">What I Do</span>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
                Services <span className="text-lime-400">&</span> Expertise
              </h2>
              <p className="text-gray-400 mt-2 max-w-lg">End-to-end product development — from first sketch to deployed production app.</p>
            </div>
          </Section>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {services.map((s, i) => (
              <Section key={s.title} delay={i * 100}>
                <div className="group relative p-7 rounded-2xl bg-gray-900/60 border border-white/5 hover:border-lime-400/25 transition-all duration-300 overflow-hidden h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-lime-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  <div className="absolute top-0 right-0 w-24 h-24 bg-lime-400/3 rounded-full blur-2xl group-hover:bg-lime-400/8 transition-all duration-500" />

                  <div className="relative flex flex-col gap-4">
                    <div className="w-12 h-12 rounded-xl bg-lime-400/10 border border-lime-400/20 flex items-center justify-center text-lime-400 group-hover:bg-lime-400/20 group-hover:scale-110 transition-all duration-300">
                      {s.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-white mb-2">{s.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
                    </div>
                    <span className="text-[10px] font-mono text-lime-400/70 tracking-widest">{s.tag}</span>
                  </div>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TECH STACK SECTION
      ══════════════════════════════════════ */}
      <section className="py-24 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-lime-400/2 to-transparent pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6">
          <Section>
            <div className="flex flex-col gap-2 mb-14">
              <span className="text-[10px] font-mono text-lime-400 tracking-[4px] uppercase">My Toolkit</span>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
                Tech <span className="text-lime-400">Stack</span>
              </h2>
              <p className="text-gray-400 mt-2 max-w-lg">The tools and technologies I use to bring ideas to life.</p>
            </div>
          </Section>

          <Section delay={100}>
            <div className="flex flex-wrap gap-3">
              {techStack.map((t) => (
                <div
                  key={t.name}
                  className={`group flex items-center gap-2.5 px-5 py-3 rounded-xl border ${t.bg} ${t.border} hover:scale-105 hover:shadow-lg transition-all duration-200 cursor-default`}
                >
                  <span className={`w-2 h-2 rounded-full ${t.color.replace('text-', 'bg-')} opacity-80`} />
                  <span className={`text-sm font-bold tracking-wide ${t.color}`}>{t.name}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* Progress bars */}
          <Section delay={200}>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { label: 'React / Next.js', pct: 95 },
                { label: 'UI / UX Design',  pct: 85 },
                // { label: 'TypeScript',       pct: 80 },
                { label: 'Node.js / APIs',   pct: 75 },
              ].map(({ label, pct }) => (
                <div key={label} className="flex flex-col gap-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-mono text-gray-300">{label}</span>
                    <span className="font-mono text-lime-400">{pct}%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-lime-400 to-emerald-400 rounded-full transition-all duration-1000"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* 
FEATURED PROJECTS SECTION */}
      <section className="py-28 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-0 w-[600px] h-[300px] bg-lime-400/3 rounded-full blur-3xl left-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6">
          <Section>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-mono text-lime-400 tracking-[4px] uppercase">My Work</span>
                <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
                  Featured <span className="text-lime-400">Projects</span>
                </h2>
              </div>
              <a href="#projects" className="text-xs font-mono text-gray-500 hover:text-lime-400 transition-colors duration-200 tracking-widest uppercase flex items-center gap-2 group">
                View All
                <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>
          </Section>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {projects.map((p, i) => (
              <Section key={p.num} delay={i * 100}>
                <div className={`group relative p-7 rounded-2xl bg-gray-900/60 border ${p.border} hover:scale-[1.02] transition-all duration-300 overflow-hidden h-full cursor-pointer`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${p.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-400`} />

                  <div className="relative flex flex-col gap-4 h-full">
                    <div className="flex items-start justify-between">
                      <span className="text-5xl font-black text-white/5 group-hover:text-white/10 transition-colors duration-300 leading-none">{p.num}</span>
                      <div className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center group-hover:border-lime-400/40 group-hover:bg-lime-400/5 transition-all duration-200">
                        <svg className="w-4 h-4 text-gray-600 group-hover:text-lime-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                        </svg>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-black text-white mb-2 group-hover:text-lime-400 transition-colors duration-200">{p.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-auto pt-4">
                      {p.tags.map(tag => (
                        <span key={tag} className="px-2.5 py-1 text-[9px] font-mono tracking-widest text-gray-500 border border-white/10 rounded-full">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/*TESTIMONIALS SECTION */}
      <section className="py-24 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="max-w-6xl mx-auto px-6">
          <Section>
            <div className="flex flex-col gap-2 mb-14">
              <span className="text-[10px] font-mono text-lime-400 tracking-[4px] uppercase">Kind Words</span>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
                Client <span className="text-lime-400">Reviews</span>
              </h2>
            </div>
          </Section>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <Section key={t.name} delay={i * 120}>
                <div className="group relative p-7 rounded-2xl bg-gray-900/60 border border-white/5 hover:border-lime-400/20 transition-all duration-300 overflow-hidden h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-lime-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                  <div className="relative flex flex-col gap-5 h-full">
                    {/* Stars */}
                    <div className="flex gap-1">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <svg key={j} className="w-4 h-4 text-lime-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>

                    <p className="text-gray-300 text-sm leading-relaxed flex-1">"{t.body}"</p>

                    <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lime-400/30 to-emerald-400/10 border border-lime-400/20 flex items-center justify-center">
                        <span className="text-xs font-black text-lime-400">{t.name.split(' ').map(n => n[0]).join('')}</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{t.name}</p>
                        <p className="text-[10px] font-mono text-gray-500">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-24 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px]" />

        <div className="relative max-w-4xl mx-auto px-6">
          <Section>
            <div className="relative p-12 rounded-3xl bg-gray-900/80 border border-white/10 overflow-hidden text-center">

              {/* Glow behind card */}
              <div className="absolute inset-0 bg-gradient-to-br from-lime-400/10 via-transparent to-emerald-400/5 pointer-events-none" />
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-lime-400/10 rounded-full blur-3xl pointer-events-none" />

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-lime-400/40 rounded-tl-3xl" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-lime-400/40 rounded-br-3xl" />

              <div className="relative flex flex-col items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  <span className="text-[10px] font-mono text-gray-400 tracking-[3px] uppercase">Currently available</span>
                </div>

                <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
                  Have a project<br />
                  <span className="text-lime-400">in mind?</span>
                </h2>

                <p className="text-gray-400 max-w-md leading-relaxed">
                  Let's collaborate and build something extraordinary together. I'm always excited to take on new challenges.
                </p>

                <div className="flex flex-wrap justify-center gap-3">
                  <Link to="/contact"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-lime-400 text-gray-950 text-sm font-black tracking-widest uppercase rounded-xl hover:bg-lime-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-lime-400/30 transition-all duration-200 group">
                    Let's Talk
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                  <a href="mailto:faisal@example.com"
                    className="inline-flex items-center gap-2 px-8 py-4 border border-white/10 text-white text-sm font-bold tracking-widest uppercase rounded-xl hover:border-lime-400/50 hover:bg-lime-400/5 hover:text-lime-400 hover:-translate-y-0.5 transition-all duration-200">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    Email Me
                  </a>
                </div>

                {/* Trust row */}
                <div className="flex flex-wrap justify-center gap-6 pt-4 border-t border-white/5 w-full">
                  {['Fast Turnaround', 'Clean Code', '100% Satisfaction', 'Free Consultation'].map(item => (
                    <div key={item} className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-lime-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span className="text-[10px] font-mono text-gray-400 tracking-wide">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Section>
        </div>
      </section>

    </div>
  )
}

export default Home
