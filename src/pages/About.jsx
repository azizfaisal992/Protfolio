import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

/* ── Intersection observer hook ── */
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

/* ── Animated skill bar ── */
const SkillBar = ({ skill, level, color, barColor, delay, inView }) => (
  <div
    className={`flex flex-col gap-1.5 transition-all duration-700 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
    style={{ transitionDelay: `${delay}ms` }}
  >
    <div className="flex items-center justify-between">
      <span className="text-xs font-mono text-gray-300 tracking-wide">{skill}</span>
      <span className={`text-[10px] font-black font-mono ${color}`}>{level}%</span>
    </div>
    <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-1000 ease-out"
        style={{
          width: inView ? `${level}%` : '0%',
          transitionDelay: `${delay + 200}ms`,
          backgroundColor: barColor,
        }}
      />
    </div>
  </div>
)

/* ── Real data ── */
const skillGroups = [
  {
    title: 'Languages',
    icon: '💻',
    color: 'text-lime-400',
    skills: [
      { name: 'JavaScript',  level: 75, color: 'text-lime-400',   barColor: '#a3e635' },
      { name: 'C / C++',     level: 60, color: 'text-lime-400',   barColor: '#a3e635' },
      { name: 'Java',        level: 75, color: 'text-lime-400',   barColor: '#a3e635' },
      { name: 'MySQL',       level: 50, color: 'text-lime-400',   barColor: '#a3e635' },
    ],
  },
  {
    title: 'Frontend & Frameworks',
    icon: '⚡',
    color: 'text-blue-400',
    skills: [
      { name: 'React.js',     level: 88, color: 'text-blue-400', barColor: '#60a5fa' },
      { name: 'Tailwind CSS', level: 90, color: 'text-blue-400', barColor: '#60a5fa' },
      { name: 'Node.js',      level: 52, color: 'text-blue-400', barColor: '#60a5fa' },
      { name: 'Firebase',     level: 40, color: 'text-blue-400', barColor: '#60a5fa' },
    ],
  },
  {
    title: 'Learning & Exploring',
    icon: '🤖',
    color: 'text-violet-400',
    skills: [
      { name: 'AI / ML Fundamentals', level: 25, color: 'text-violet-400', barColor: '#a78bfa' },
      { name: 'Generative AI Tools',  level: 20, color: 'text-violet-400', barColor: '#a78bfa' },
      { name: 'Python (for AI/ML)',   level: 10, color: 'text-violet-400', barColor: '#a78bfa' },
    ],
  },
]

const journey = [
  {
    icon: '🎓',
    year: 'Present',
    role: 'CSE Student',
    place: 'University of Liberal Arts Bangladesh',
    desc: 'Studying Computer Science & Engineering. Focused on systems, algorithms, and AI/ML alongside real-world project building.',
    current: true,
    color: 'border-lime-400 bg-lime-400',
    glow: 'shadow-lime-400/40',
  },
  {
    icon: '🚀',
    year: '1+ Year',
    role: 'Frontend Developer',
    place: 'Freelance & Projects',
    desc: 'Built 10+ real-world projects using React, Tailwind CSS, Node.js, and Firebase — from full-stack apps to polished UIs.',
    current: false,
    color: 'border-blue-400 bg-gray-900',
    glow: '',
  },
  {
    icon: '🔍',
    year: '1.5 Years',
    role: 'SEO & Virtual Assistant',
    place: 'Group / Remote Work',
    desc: 'Worked in an SEO group for 1.5 years managing content, rankings, and client coordination. Built strong communication and teamwork skills.',
    current: false,
    color: 'border-orange-400 bg-gray-900',
    glow: '',
  },
]

const highlights = [
  { icon: '🎓', label: 'Degree',    value: 'CSE Engineering' },
  { icon: '⚡', label: 'Frontend',  value: '1+ Year React Dev'  },
  { icon: '🤖', label: 'Goal',      value: 'AI Engineer'       },
  { icon: '🌐', label: 'Languages', value: 'English & Bangla'    },
]

const techBadges = [
  { label: 'React',       color: 'text-blue-400   border-blue-400/20   bg-blue-400/5'   },
  { label: 'Tailwind',    color: 'text-cyan-400   border-cyan-400/20   bg-cyan-400/5'   },
  { label: 'Node.js',     color: 'text-lime-400   border-lime-400/20   bg-lime-400/5'   },
  { label: 'Firebase',    color: 'text-orange-400 border-orange-400/20 bg-orange-400/5' },
  { label: 'JavaScript',  color: 'text-yellow-400 border-yellow-400/20 bg-yellow-400/5' },
  { label: 'C / C++',     color: 'text-violet-400 border-violet-400/20 bg-violet-400/5' },
  { label: 'Java',        color: 'text-red-400    border-red-400/20    bg-red-400/5'    },
  { label: 'MySQL',       color: 'text-sky-400    border-sky-400/20    bg-sky-400/5'    },
  { label: 'AI / ML',     color: 'text-pink-400   border-pink-400/20   bg-pink-400/5'   },
  { label: 'GenAI Tools', color: 'text-emerald-400 border-emerald-400/20 bg-emerald-400/5' },
]

/* ── Journey Card ── */
const JourneyCard = ({ item, index, inView }) => (
  <div
    className={`relative flex gap-4 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    style={{ transitionDelay: `${index * 150}ms` }}
  >
    {/* Left: icon + vertical line */}
    <div className="flex flex-col items-center gap-0">
      <div className={`relative w-10 h-10 rounded-xl border-2 flex items-center justify-center text-base flex-shrink-0 ${item.color} ${item.current ? 'shadow-lg ' + item.glow : 'bg-gray-900'}`}>
        {item.current && (
          <span className="absolute inset-0 rounded-xl bg-lime-400/20 animate-pulse" />
        )}
        <span className="relative z-10">{item.icon}</span>
      </div>
      {index < journey.length - 1 && (
        <div className="w-px flex-1 my-1 min-h-[32px] bg-gradient-to-b from-white/10 to-transparent" />
      )}
    </div>

    {/* Right: content */}
    <div className="pb-7 flex flex-col gap-1 flex-1">
      <div className="flex flex-wrap items-center gap-2">
        <span className={`text-[9px] font-mono tracking-[2px] px-2 py-0.5 rounded-full border ${
          item.current
            ? 'text-lime-400 border-lime-400/20 bg-lime-400/10'
            : 'text-gray-600 border-white/10 bg-white/5'
        }`}>
          {item.year}
        </span>
        {item.current && (
          <span className="flex items-center gap-1 text-[9px] font-mono text-emerald-400">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
            </span>
            Now
          </span>
        )}
      </div>
      <h4 className="text-sm font-black text-white tracking-tight">{item.role}</h4>
      <span className="text-[10px] font-mono text-lime-400 tracking-wide">{item.place}</span>
      <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
    </div>
  </div>
)

/* ── Main About Component ── */
const About = () => {
  const [headerRef, headerInView] = useInView(0.2)
  const [leftRef,   leftInView]   = useInView(0.1)
  const [skillRef,  skillInView]  = useInView(0.1)
  const [journeyRef, journeyInView] = useInView(0.1)
  const [factsRef,  factsInView]  = useInView(0.1)

  return (
    <section id="about" className="relative bg-gray-950 py-24 overflow-hidden mt-16">

      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Glow blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-lime-400/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-violet-400/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-blue-400/3 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">

        {/* ── SECTION HEADER ── */}
        <div
          ref={headerRef}
          className={`flex flex-col gap-4 mb-16 transition-all duration-700 ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-lime-400" />
            <span className="text-[10px] font-mono text-lime-400 tracking-[4px] uppercase">About Me</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight tracking-tight">
              Who I <span className="text-lime-400">Am</span>
            </h2>
            <p className="text-sm text-gray-500 max-w-sm leading-relaxed">
              A CSE student, frontend developer, and aspiring AI Engineer — building real things while learning every day.
            </p>
          </div>
        </div>

        {/* ── MAIN GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* ── LEFT COLUMN ── */}
          <div ref={leftRef} className="flex flex-col gap-7">

            {/* Avatar + Identity */}
            <div className={`flex gap-5 items-start transition-all duration-700 delay-100 ${leftInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-20 h-20 rounded-2xl bg-gray-900 border border-white/10 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-lime-400/20 to-emerald-400/5" />
                  <div className="absolute top-0 right-0 w-5 h-5 bg-lime-400 rounded-bl-2xl" />
                  <span className="relative text-2xl font-black">
                    <span className="text-lime-400">F</span>
                    <span className="text-white">A</span>
                  </span>
                </div>
                {/* Online dot */}
                <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gray-950">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                  </span>
                </span>
              </div>
              {/* Identity text */}
              <div className="flex flex-col gap-2 pt-1">
                <div>
                  <h3 className="text-xl font-black text-white tracking-tight">
                    Faisal <span className="text-lime-400">Aziz</span>
                  </h3>
                  <p className="text-[10px] font-mono text-gray-500 tracking-[2px] uppercase leading-relaxed">
                    CS&E Student · Frontend Dev · AI Enthusiast
                  </p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-lime-400/5 border border-lime-400/15 rounded-lg w-fit">
                  <span className="text-[10px] font-mono text-lime-400">🎯 Goal:</span>
                  <span className="text-[10px] font-mono text-gray-300">AI Engineer</span>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className={`flex flex-col gap-3 transition-all duration-700 delay-200 ${leftInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <p className="text-sm text-gray-400 leading-relaxed">
                I'm <span className="text-white font-semibold">Faisal Aziz</span>, a Computer Science & Engineering student with a strong passion for problem-solving and building practical projects. I've learned <span className="text-lime-400 font-mono text-xs">C</span>, <span className="text-lime-400 font-mono text-xs">C++</span>, <span className="text-lime-400 font-mono text-xs">Java</span>, and <span className="text-lime-400 font-mono text-xs">MySQL</span>, and I love understanding how systems work by building things hands-on.
              </p>
              <p className="text-sm text-gray-500 leading-relaxed">
                I have over <span className="text-white">1 year of frontend experience</span> with JavaScript, React, Tailwind CSS, Node.js, and Firebase — completing <span className="text-white">10+ real-world projects</span>. I'm also currently diving into <span className="text-violet-400">AI, ML, and Generative AI</span> to grow toward my goal of becoming an AI Engineer.
              </p>
              <p className="text-sm text-gray-500 leading-relaxed">
                Before university, I worked in <span className="text-orange-400">SEO for 1.5 years</span> as part of a group and as a virtual assistant — sharpening my communication, collaboration, and teamwork skills along the way.
              </p>
            </div>

            {/* Info grid */}
            <div className={`grid grid-cols-2 gap-3 transition-all duration-700 delay-300 ${leftInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              {highlights.map(({ icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 p-3 bg-gray-900 border border-white/5 rounded-xl hover:border-lime-400/20 hover:bg-gray-900/80 transition-all duration-200 group"
                >
                  <span className="text-base flex-shrink-0">{icon}</span>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[9px] font-mono text-gray-600 tracking-[2px] uppercase">{label}</span>
                    <span className="text-xs font-bold text-gray-300 truncate group-hover:text-white transition-colors duration-200">{value}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Tech badges cloud */}
            <div className={`flex flex-col gap-3 transition-all duration-700 delay-[350ms] ${leftInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <span className="text-[10px] font-mono text-gray-600 tracking-[3px] uppercase">Tech Stack</span>
              <div className="flex flex-wrap gap-2">
                {techBadges.map(({ label, color }) => (
                  <span
                    key={label}
                    className={`text-[10px] font-mono px-2.5 py-1 rounded-full border cursor-default hover:-translate-y-0.5 transition-all duration-150 ${color}`}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className={`flex gap-3 flex-wrap transition-all duration-700 delay-[400ms] ${leftInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <button
                onClick={() => {
                  const link = document.createElement('a')
                  link.href = '/CV.pdf'
                  link.download = 'Abdul-Aziz-Faisal-CV.pdf'
                  document.body.appendChild(link)
                  link.click()
                  document.body.removeChild(link)
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-lime-400 text-gray-950 text-xs font-black tracking-widest uppercase rounded-xl
                  hover:bg-lime-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-lime-400/25 transition-all duration-200 group"
              >
                <svg className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Download CV
              </button>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/10 text-gray-400 text-xs font-bold tracking-widest uppercase rounded-xl
                  hover:border-lime-400/40 hover:text-lime-400 hover:bg-lime-400/5 transition-all duration-200"
              >
                Let's Talk
              </Link>
            </div>

          </div>

          {/* ── RIGHT COLUMN: Skills ── */}
          <div ref={skillRef} className="flex flex-col gap-5">
            {skillGroups.map((group, gi) => (
              <div
                key={group.title}
                className={`flex flex-col gap-4 p-5 bg-gray-900 border border-white/5 rounded-2xl hover:border-white/10 transition-all duration-700 ${skillInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: `${gi * 150}ms` }}
              >
                {/* Group header */}
                <div className="flex items-center gap-2">
                  <span className="text-base">{group.icon}</span>
                  <h4 className={`text-xs font-black tracking-widest uppercase ${group.color}`}>
                    {group.title}
                  </h4>
                  <div className="flex-1 h-px bg-white/5" />
                  {group.title === 'Learning & Exploring' && (
                    <span className="text-[8px] font-mono text-violet-400 border border-violet-400/20 bg-violet-400/5 px-2 py-0.5 rounded-full tracking-widest">
                      In Progress
                    </span>
                  )}
                </div>

                {/* Skill bars */}
                <div className="flex flex-col gap-3">
                  {group.skills.map((skill, si) => (
                    <SkillBar
                      key={skill.name}
                      skill={skill.name}
                      level={skill.level}
                      color={skill.color}
                      barColor={skill.barColor}
                      delay={gi * 150 + si * 80}
                      inView={skillInView}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── JOURNEY SECTION ── */}
        <div ref={journeyRef} className="mt-20">
          {/* Header */}
          <div className={`flex items-center gap-4 mb-10 transition-all duration-700 ${journeyInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-lime-400" />
              <span className="text-[10px] font-mono text-lime-400 tracking-[4px] uppercase">My Journey</span>
            </div>
            <h3 className="text-2xl font-black text-white tracking-tight">
              Experience &amp; <span className="text-lime-400">Background</span>
            </h3>
            <div className="flex-1 h-px bg-white/5 hidden sm:block" />
          </div>

          {/* Journey cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {journey.map((item, i) => (
              <JourneyCard key={i} item={item} index={i} inView={journeyInView} />
            ))}
          </div>
        </div>

        {/* ── FUN STATS ── */}
        <div
          ref={factsRef}
          className={`mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 transition-all duration-700 ${factsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          {[
            { emoji: '🚀', value: '10+',   label: 'Real Projects'    },
            { emoji: '🔍', value: '1.5yr', label: 'SEO Experience'   },
            { emoji: '🤖', value: '3+',    label: 'AI Tools Learned' },
            { emoji: '☕', value: '∞',     label: 'Cups of Coffee'   },
          ].map(({ emoji, value, label }, i) => (
            <div
              key={label}
              className={`flex flex-col items-center gap-2 py-6 px-3 bg-gray-900/50 border border-white/5 rounded-2xl text-center
                hover:border-lime-400/20 hover:bg-gray-900 transition-all duration-300 group
                transition-all duration-700 ${factsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <span className="text-2xl group-hover:scale-110 transition-transform duration-200">{emoji}</span>
              <span className="text-2xl font-black text-white leading-none">{value}</span>
              <span className="text-[9px] font-mono text-gray-600 tracking-[2px] uppercase leading-tight">{label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default About
