import React, { useEffect, useRef, useState } from 'react'

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

/* ── Contact Info Data ── */
const contactInfo = [
  {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    label: 'Email',
    value: 'azizfaisal992@gmail.com',
    href: 'mailto:azizfaisal992@gmail.com',
    copy: true,
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    label: 'Phone',
    value: '01793510613',
    href: 'tel:01793510613',
    copy: true,
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    label: 'Address',
    value: 'Dhaka, Bangladesh',
    href: 'https://maps.google.com/?q=Dhaka,Bangladesh',
    copy: false,
  },
]

const socials = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/abdul-aziz-faisal-t2003/',
    color: 'hover:border-blue-400/40 hover:bg-blue-400/10 hover:text-blue-400',
    badge: 'bg-blue-400/10 text-blue-400 border-blue-400/20',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/azizfaisal992',
    color: 'hover:border-white/30 hover:bg-white/5 hover:text-white',
    badge: 'bg-white/5 text-gray-400 border-white/10',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    label: 'LeetCode',
    href: 'https://leetcode.com/u/Faisal_233/',
    color: 'hover:border-orange-400/40 hover:bg-orange-400/10 hover:text-orange-400',
    badge: 'bg-orange-400/10 text-orange-400 border-orange-400/20',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.lodging-.955-2.813-.955M5.759 16.583l.027.025a1.37 1.37 0 0 0 .423.315c.38.181.801.192 1.191.041.39-.151.694-.451.854-.83a1.37 1.37 0 0 0-.332-1.508l-.03-.027-1.121-1.1a1.37 1.37 0 0 0-1.934.025 1.37 1.37 0 0 0 .025 1.934l.897.88v.245z"/>
      </svg>
    ),
  },
]

/* ── Copy to clipboard helper ── */
const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={handleCopy}
      className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-lg border border-white/10
        hover:border-lime-400/40 hover:bg-lime-400/10 hover:text-lime-400 text-gray-600
        transition-all duration-200"
      title="Copy to clipboard"
    >
      {copied ? (
        <svg className="w-3 h-3 text-lime-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      ) : (
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
        </svg>
      )}
    </button>
  )
}

/* ── Contact Form ── */
const ContactForm = ({ inView }) => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim())    e.name    = 'Name is required'
    if (!form.email.trim())   e.email   = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.subject.trim()) e.subject = 'Subject is required'
    if (!form.message.trim()) e.message = 'Message is required'
    return e
  }

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setErrors(er => ({ ...er, [e.target.name]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSending(true)
    setTimeout(() => { setSending(false); setSubmitted(true) }, 1800)
  }

  const inputBase = "w-full bg-gray-900 border rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 font-mono outline-none transition-all duration-200 focus:border-lime-400/60 focus:bg-gray-900/80 focus:shadow-lg focus:shadow-lime-400/5"

  return (
    <div
      className={`flex flex-col gap-6 transition-all duration-700 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      {submitted ? (
        /* ── Success State ── */
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-lime-400/10 border border-lime-400/30 flex items-center justify-center">
            <svg className="w-7 h-7 text-lime-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <div>
            <h4 className="text-lg font-black text-white">Message Sent!</h4>
            <p className="text-sm text-gray-500 mt-1">Thanks for reaching out. I'll get back to you within 24 hours.</p>
          </div>
          <button
            onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }) }}
            className="text-[10px] font-mono text-gray-600 hover:text-lime-400 tracking-widest uppercase transition-colors duration-200"
          >
            Send another message →
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          {/* Name + Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] font-mono text-gray-500 tracking-[2px] uppercase">Your Name</label>
              <input
                name="name" value={form.name} onChange={handleChange}
                placeholder="Abdul Aziz..."
                className={`${inputBase} ${errors.name ? 'border-red-500/50' : 'border-white/10'}`}
              />
              {errors.name && <span className="text-[10px] font-mono text-red-400">{errors.name}</span>}
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] font-mono text-gray-500 tracking-[2px] uppercase">Email Address</label>
              <input
                name="email" type="email" value={form.email} onChange={handleChange}
                placeholder="you@example.com"
                className={`${inputBase} ${errors.email ? 'border-red-500/50' : 'border-white/10'}`}
              />
              {errors.email && <span className="text-[10px] font-mono text-red-400">{errors.email}</span>}
            </div>
          </div>

          {/* Subject */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] font-mono text-gray-500 tracking-[2px] uppercase">Subject</label>
            <input
              name="subject" value={form.subject} onChange={handleChange}
              placeholder="Project inquiry, collaboration..."
              className={`${inputBase} ${errors.subject ? 'border-red-500/50' : 'border-white/10'}`}
            />
            {errors.subject && <span className="text-[10px] font-mono text-red-400">{errors.subject}</span>}
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] font-mono text-gray-500 tracking-[2px] uppercase">Message</label>
            <textarea
              name="message" value={form.message} onChange={handleChange}
              rows={5} placeholder="Tell me about your project..."
              className={`${inputBase} resize-none ${errors.message ? 'border-red-500/50' : 'border-white/10'}`}
            />
            <div className="flex items-center justify-between">
              {errors.message
                ? <span className="text-[10px] font-mono text-red-400">{errors.message}</span>
                : <span />
              }
              <span className="text-[10px] font-mono text-gray-700">{form.message.length} / 500</span>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={sending}
            className="flex items-center justify-center gap-2 w-full py-3.5 bg-lime-400 text-gray-950 text-xs font-black tracking-widest uppercase rounded-xl
              hover:bg-lime-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-lime-400/25
              active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed
              transition-all duration-200 group"
          >
            {sending ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Sending...
              </>
            ) : (
              <>
                Send Message
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  )
}

/* ── Main Contact Component ── */
const Contact = () => {
  const [headerRef, headerInView] = useInView(0.2)
  const [leftRef,   leftInView]   = useInView(0.1)
  const [rightRef,  rightInView]  = useInView(0.1)

  return (
    <section id="contact" className="relative bg-gray-950 py-24 overflow-hidden mt-16">

      {/* ── Background grid ── */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* ── Glow blobs ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-lime-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-400/4 rounded-full blur-3xl pointer-events-none" />

      {/* ── Floating orbs ── */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-lime-400 rounded-full opacity-30 animate-ping" style={{ animationDuration: '3s' }} />
      <div className="absolute bottom-32 right-16 w-1.5 h-1.5 bg-emerald-400 rounded-full opacity-40 animate-bounce" style={{ animationDuration: '4s' }} />

      <div className="relative max-w-6xl mx-auto px-6">

        {/* ── SECTION HEADER ── */}
        <div
          ref={headerRef}
          className={`flex flex-col gap-4 mb-14 transition-all duration-700 ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-lime-400" />
            <span className="text-[10px] font-mono text-lime-400 tracking-[4px] uppercase">Contact</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight tracking-tight">
              Let's <span className="text-lime-400">Work</span>
              <br />Together
            </h2>
            <p className="text-sm text-gray-500 max-w-sm leading-relaxed">
              Have a project in mind or just want to say hello? My inbox is always open — I'll get back to you within 24 hours.
            </p>
          </div>
        </div>

        {/* ── MAIN GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* ── LEFT: INFO PANEL (2/5) ── */}
          <div
            ref={leftRef}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            {/* Identity card */}
            <div
              className={`relative p-5 bg-gray-900 border border-white/10 rounded-2xl overflow-hidden
                transition-all duration-700 delay-100 ${leftInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              {/* Card glow */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lime-400/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-lime-400/5 to-transparent pointer-events-none" />

              <div className="relative flex items-center gap-4">
                {/* Avatar */}
                <div className="relative w-14 h-14 rounded-xl bg-gray-950 border border-white/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-lime-400/20 to-transparent" />
                  <div className="absolute top-0 right-0 w-4 h-4 bg-lime-400 rounded-bl-xl" />
                  <span className="relative text-lg font-black">
                    <span className="text-lime-400">A</span><span className="text-white">A</span>
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <h3 className="text-base font-black text-white tracking-tight">Abdul Aziz <span className="text-lime-400">Faisal</span></h3>
                  <p className="text-[10px] font-mono text-gray-500 tracking-widest uppercase">Frontend Developer</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    </span>
                    <span className="text-[9px] font-mono text-emerald-400 tracking-wide">Available for work</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info cards */}
            <div className="flex flex-col gap-3">
              {contactInfo.map((item, i) => (
                <div
                  key={item.label}
                  className={`flex items-center gap-3 p-4 bg-gray-900 border border-white/5 rounded-xl
                    hover:border-lime-400/20 hover:bg-gray-900/80 transition-all duration-200 group
                    transition-all duration-700 ${leftInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                  style={{ transitionDelay: `${200 + i * 100}ms` }}
                >
                  <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-lg bg-lime-400/10 border border-lime-400/20 text-lime-400">
                    {item.icon}
                  </div>
                  <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                    <span className="text-[9px] font-mono text-gray-600 tracking-[2px] uppercase">{item.label}</span>
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-gray-300 group-hover:text-white truncate transition-colors duration-200"
                    >
                      {item.value}
                    </a>
                  </div>
                  {item.copy && <CopyButton text={item.value} />}
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div
              className={`flex flex-col gap-3 transition-all duration-700 delay-500 ${leftInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            >
              <span className="text-[9px] font-mono text-gray-600 tracking-[3px] uppercase">Find me on</span>
              <div className="flex flex-col gap-2">
                {socials.map(({ label, href, icon, color, badge }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 p-3.5 bg-gray-900 border border-white/5 rounded-xl
                      ${color} transition-all duration-200 group`}
                  >
                    <span className="flex-shrink-0">{icon}</span>
                    <span className="text-xs font-bold tracking-wide flex-1">{label}</span>
                    <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${badge} tracking-widest uppercase`}>
                      Profile
                    </span>
                    <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Response time badge */}
            <div
              className={`flex items-center gap-3 p-4 bg-gray-900/50 border border-white/5 rounded-xl
                transition-all duration-700 delay-[600ms] ${leftInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            >
              <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-lg bg-emerald-400/10 border border-emerald-400/20 text-emerald-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold text-white">Fast Response</p>
                <p className="text-[10px] font-mono text-gray-500">Usually replies within <span className="text-emerald-400">24 hours</span></p>
              </div>
            </div>
          </div>

          {/* ── RIGHT: CONTACT FORM (3/5) ── */}
          <div
            ref={rightRef}
            className="lg:col-span-3"
          >
            <div
              className={`relative p-7 bg-gray-900 border border-white/10 rounded-2xl overflow-hidden h-full
                transition-all duration-700 delay-200 ${rightInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lime-400/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-lime-400/3 to-transparent pointer-events-none" />

              {/* Form header */}
              <div className="relative flex items-center justify-between mb-6">
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-black text-white tracking-tight">Send a Message</h3>
                  <p className="text-[10px] font-mono text-gray-500 tracking-widest">All fields are required</p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-lime-400/10 border border-lime-400/20 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
                  <span className="text-[9px] font-mono text-lime-400 tracking-widest uppercase">Online</span>
                </div>
              </div>

              <ContactForm inView={rightInView} />
            </div>
          </div>
        </div>

        {/* ── BOTTOM CTA STRIP ── */}
        <div
          className={`mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-gray-900/50 border border-white/5 rounded-2xl
            transition-all duration-700 delay-700 ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-lime-400/10 border border-lime-400/20">
              <span className="text-lg">🤝</span>
            </div>
            <div>
              <p className="text-sm font-black text-white">Open to Freelance &amp; Full-time</p>
              <p className="text-[10px] font-mono text-gray-500">Based in Dhaka · Available remotely worldwide</p>
            </div>
          </div>
          <a
            href="mailto:azizfaisal992@gmail.com"
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-2.5 bg-lime-400 text-gray-950 text-xs font-black tracking-widest uppercase rounded-xl
              hover:bg-lime-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-lime-400/25
              transition-all duration-200 group"
          >
            Email Me Directly
            <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  )
}

export default Contact
