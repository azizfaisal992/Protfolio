import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

/* ── Intersection observer hook for scroll-reveal ── */
const useInView = (threshold = 0.15) => {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])
  return [ref, inView]
}

/* ── Project Data ── */
const projects = [
  {
    id: 1,
    title: 'ShopSphere',
    category: 'fullstack',
    tag: 'E-Commerce',
    desc: 'A full-featured e-commerce platform with real-time inventory, Stripe payments, and an admin dashboard with analytics.',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    gradient: 'from-lime-400/20 to-emerald-400/5',
    accent: 'lime',
    featured: true,
    live: '#',
    code: '#',
    year: '2024',
    lines: [65, 80, 55, 90, 70, 85, 60],
  },
  {
    id: 2,
    title: 'TaskFlow',
    category: 'frontend',
    tag: 'Productivity',
    desc: 'A drag-and-drop project management tool with real-time collaboration, Kanban boards, and team analytics.',
    tech: ['React', 'TypeScript', 'Tailwind', 'Socket.io'],
    gradient: 'from-blue-400/20 to-cyan-400/5',
    accent: 'blue',
    featured: true,
    live: '#',
    code: '#',
    year: '2024',
    lines: [50, 70, 85, 60, 90, 75, 55],
  },
  {
    id: 3,
    title: 'AiWriter',
    category: 'fullstack',
    tag: 'AI Tool',
    desc: 'An AI-powered content generation platform with GPT integration, template library, and multi-language support.',
    tech: ['Next.js', 'OpenAI', 'Prisma', 'PostgreSQL'],
    gradient: 'from-violet-400/20 to-purple-400/5',
    accent: 'violet',
    featured: false,
    live: '#',
    code: '#',
    year: '2023',
    lines: [80, 60, 75, 50, 85, 65, 90],
  },
  {
    id: 4,
    title: 'DevBlog',
    category: 'fullstack',
    tag: 'Blog Platform',
    desc: 'A headless CMS-powered blog with MDX support, syntax highlighting, dark mode, and SEO optimization.',
    tech: ['Next.js', 'MDX', 'Sanity.io', 'Vercel'],
    gradient: 'from-pink-400/20 to-rose-400/5',
    accent: 'pink',
    featured: false,
    live: '#',
    code: '#',
    year: '2023',
    lines: [70, 55, 90, 65, 80, 60, 75],
  },
  {
    id: 5,
    title: 'FitPulse',
    category: 'frontend',
    tag: 'Health & Fitness',
    desc: 'A fitness tracking app with workout plans, progress charts, calorie counter, and personal bests tracking.',
    tech: ['React', 'Redux', 'Recharts', 'Node.js'],
    gradient: 'from-teal-400/20 to-cyan-400/5',
    accent: 'teal',
    featured: false,
    live: '#',
    code: '#',
    year: '2024',
    lines: [85, 65, 50, 90, 70, 80, 60],
  },
]

const accentColors = {
  lime:   { border: 'hover:border-lime-400/40',   tag: 'bg-lime-400/10 text-lime-400 border-lime-400/20',   dot: 'bg-lime-400',   bar: 'bg-lime-400/30 hover:bg-lime-400/50'   },
  blue:   { border: 'hover:border-blue-400/40',   tag: 'bg-blue-400/10 text-blue-400 border-blue-400/20',   dot: 'bg-blue-400',   bar: 'bg-blue-400/30 hover:bg-blue-400/50'   },
  violet: { border: 'hover:border-violet-400/40', tag: 'bg-violet-400/10 text-violet-400 border-violet-400/20', dot: 'bg-violet-400', bar: 'bg-violet-400/30 hover:bg-violet-400/50' },
  orange: { border: 'hover:border-orange-400/40', tag: 'bg-orange-400/10 text-orange-400 border-orange-400/20', dot: 'bg-orange-400', bar: 'bg-orange-400/30 hover:bg-orange-400/50' },
  pink:   { border: 'hover:border-pink-400/40',   tag: 'bg-pink-400/10 text-pink-400 border-pink-400/20',   dot: 'bg-pink-400',   bar: 'bg-pink-400/30 hover:bg-pink-400/50'   },
  teal:   { border: 'hover:border-teal-400/40',   tag: 'bg-teal-400/10 text-teal-400 border-teal-400/20',   dot: 'bg-teal-400',   bar: 'bg-teal-400/30 hover:bg-teal-400/50'   },
}

const filters = ['all', 'frontend', 'fullstack']

/* ── Project Card ── */
const ProjectCard = ({ project, index }) => {
  const [ref, inView] = useInView(0.1)
  const colors = accentColors[project.accent]

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div
        className={`group relative flex flex-col h-full bg-gray-900 border border-white/10 rounded-2xl overflow-hidden
          ${colors.border} transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40`}
      >
        {/* Card gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

        {/* ── CARD HEADER / PREVIEW ── */}
        <div className="relative h-44 bg-gray-950 border-b border-white/5 overflow-hidden">
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />

          {/* Browser chrome */}
          <div className="absolute top-3 left-3 right-3 bg-gray-900 rounded-lg border border-white/10 overflow-hidden">
            <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/5">
              <div className="w-2 h-2 rounded-full bg-red-500/60" />
              <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
              <div className={`w-2 h-2 rounded-full ${colors.dot}`} />
              <div className="ml-2 flex-1 h-3 bg-white/5 rounded-full max-w-[120px]" />
            </div>
            {/* Mini bar chart in card */}
            <div className="flex items-end gap-0.5 px-3 py-2 h-16">
              {project.lines.map((h, i) => (
                <div
                  key={i}
                  className={`flex-1 ${colors.bar} rounded-sm transition-all duration-300`}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>

          {/* Year badge */}
          <div className="absolute bottom-3 right-3 px-2 py-0.5 bg-gray-900/80 border border-white/10 rounded-full">
            <span className="text-[9px] font-mono text-gray-500">{project.year}</span>
          </div>

          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-3 left-3 px-2 py-0.5 bg-lime-400 rounded-full">
              <span className="text-[9px] font-black text-gray-950 tracking-wider uppercase">Featured</span>
            </div>
          )}
        </div>

        {/* ── CARD BODY ── */}
        <div className="relative flex flex-col flex-1 p-5 gap-3">
          {/* Tag + Title */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-col gap-1.5">
              <span className={`text-[9px] font-mono tracking-[2px] uppercase px-2 py-0.5 rounded-full border w-fit ${colors.tag}`}>
                {project.tag}
              </span>
              <h3 className="text-lg font-black text-white group-hover:text-lime-400 transition-colors duration-200 tracking-tight">
                {project.title}
              </h3>
            </div>
            {/* Arrow icon */}
            <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-lg border border-white/10 group-hover:border-lime-400/40 group-hover:bg-lime-400/10 transition-all duration-200 mt-4">
              <svg className="w-3.5 h-3.5 text-gray-600 group-hover:text-lime-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
            {project.desc}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5 mt-auto pt-2 border-t border-white/5">
            {project.tech.map(t => (
              <span key={t} className="text-[9px] font-mono text-gray-600 px-2 py-0.5 bg-white/5 rounded-full hover:text-gray-400 transition-colors duration-150 cursor-default">
                {t}
              </span>
            ))}
          </div>

          {/* CTA links */}
          <div className="flex gap-2 pt-1">
            <a
              href={project.live}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-lime-400 text-gray-950 text-[10px] font-black tracking-widest uppercase rounded-lg
                hover:bg-lime-300 transition-colors duration-200"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
              Live
            </a>
            <a
              href={project.code}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-white/10 text-gray-400 text-[10px] font-bold tracking-widest uppercase rounded-lg
                hover:border-white/20 hover:text-white transition-all duration-200"
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
              Code
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Main Projects Section ── */
const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  const [headerRef, headerInView] = useInView(0.2)

  const filtered = projects.filter(p =>
    activeFilter === 'all' ? true : p.category === activeFilter
  )

  return (
    <section id="projects" className="relative bg-gray-950 py-24 overflow-hidden mt-16">

      {/* ── Background grid ── */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* ── Glow blobs ── */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-lime-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">

        {/* ── SECTION HEADER ── */}
        <div
          ref={headerRef}
          className={`flex flex-col gap-4 mb-12 transition-all duration-700 ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Label */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-lime-400" />
            <span className="text-[10px] font-mono text-lime-400 tracking-[4px] uppercase">
              My Work
            </span>
          </div>

          {/* Title */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight tracking-tight">
                Featured
                <br />
                <span className="text-lime-400">Projects</span>
              </h2>
              <p className="mt-3 text-sm text-gray-500 max-w-md leading-relaxed">
                A selection of real-world projects — from concept to deployment. Each one built with care, performance, and clean code in mind.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 p-1 bg-gray-900 border border-white/10 rounded-xl self-start sm:self-auto">
              {filters.map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`relative px-4 py-2 text-[10px] font-black tracking-widest uppercase rounded-lg transition-all duration-200
                    ${activeFilter === f
                      ? 'bg-lime-400 text-gray-950 shadow-lg shadow-lime-400/20'
                      : 'text-gray-500 hover:text-gray-300'
                    }`}
                >
                  {f}
                  {activeFilter === f && (
                    <span className="absolute inset-0 rounded-lg bg-lime-300/20 animate-pulse" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── PROJECT COUNT ── */}
        <div
          className={`flex items-center gap-3 mb-8 transition-all duration-700 delay-200 ${headerInView ? 'opacity-100' : 'opacity-0'}`}
        >
          <span className="text-[10px] font-mono text-gray-600 tracking-widest uppercase">
            Showing
          </span>
          <span className="px-2 py-0.5 bg-lime-400/10 border border-lime-400/20 rounded-full text-[10px] font-mono text-lime-400">
            {filtered.length} projects
          </span>
          <div className="flex-1 h-px bg-white/5" />
        </div>

        {/* ── PROJECTS GRID ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* ── VIEW ALL CTA ── */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-between gap-4 mt-14 pt-8 border-t border-white/5
            transition-all duration-700 delay-500 ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <div className="flex flex-col gap-1">
            <p className="text-sm font-black text-white">Want to see more?</p>
            <p className="text-xs text-gray-500 font-mono">All source code is available on GitHub.</p>
          </div>
          <div className="flex gap-3">
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 text-gray-400 text-xs font-bold tracking-widest uppercase rounded-xl
                hover:border-lime-400/40 hover:text-lime-400 hover:bg-lime-400/5 transition-all duration-200 group"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
              GitHub Profile
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-lime-400 text-gray-950 text-xs font-black tracking-widest uppercase rounded-xl
                hover:bg-lime-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-lime-400/25 transition-all duration-200 group"
            >
              Hire Me
              <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Projects
