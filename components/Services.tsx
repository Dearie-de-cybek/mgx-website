"use client"

import { useEffect, useRef, useState } from "react"
import { useIsMobile } from "@/hooks/useIsMobile"

const FF = "'Google Sans Flex','Google Sans',system-ui,sans-serif"

const ICONS = [
  "smart_toy","security","code","analytics","account_balance",
  "monitor_heart","location_city","science","school","bar_chart",
  "cloud","lock","devices","settings_suggest","public",
  "integration_instructions","psychology","memory","router","deployed_code",
  "insights","api","storage","badge","network_check",
]

const SERVICES = [
  {
    icon: "smart_toy",
    color: "#1a73e8",
    title: "Artificial Intelligence & Machine Learning",
    desc: "AI systems, intelligent automation, predictive analytics, computer vision, and data-driven decision platforms.",
  },
  {
    icon: "security",
    color: "#e91e8c",
    title: "Cybersecurity & Threat Intelligence",
    desc: "Security assessments, vulnerability research, threat monitoring, incident response, and digital protection.",
  },
  {
    icon: "code",
    color: "#ff6d2a",
    title: "Software Development & Digital Platforms",
    desc: "Custom web, mobile, and enterprise software — from concept and design through deployment and maintenance.",
  },
  {
    icon: "account_balance",
    color: "#0d9488",
    title: "Government Technology Solutions",
    desc: "E-government platforms, digital records, citizen services, GIS systems, and public sector modernization.",
  },
  {
    icon: "monitor_heart",
    color: "#dc2626",
    title: "Health Technology Solutions",
    desc: "Electronic health records, healthcare workflow platforms, health data management, and clinical systems.",
  },
  {
    icon: "location_city",
    color: "#7c3aed",
    title: "Smart Cities & Urban Technology",
    desc: "IoT systems, urban intelligence platforms, infrastructure monitoring, smart mobility, and city data.",
  },
  {
    icon: "science",
    color: "#059669",
    title: "Research & Innovation Development",
    desc: "Technology research, feasibility studies, prototypes, R&D partnerships, and turning ideas into products.",
  },
  {
    icon: "school",
    color: "#d97706",
    title: "Technology Training & Workforce Development",
    desc: "Professional training, certification programs, bootcamps, and talent development through MGX Campus.",
  },
]

function useInView(ref: React.RefObject<Element | null>, threshold = 0.15) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect() }
    }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref, threshold])
  return inView
}

function TypewriterH2({ text }: { text: string }) {
  const ref     = useRef<HTMLHeadingElement>(null)
  const started = useRef(false)
  const [count, setCount] = useState(0)
  const inView  = useInView(ref as React.RefObject<Element>, 0.2)
  const isMobile = useIsMobile()

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true
    let n = 0
    const iv = setInterval(() => { n++; setCount(n); if (n >= text.length) clearInterval(iv) }, 28)
    return () => clearInterval(iv)
  }, [inView, text])

  return (
    <h2 ref={ref} style={{
      fontFamily: FF,
      fontSize: isMobile ? "clamp(1.7rem,6vw,2.6rem)" : "clamp(2.6rem,4.2vw,5rem)",
      fontWeight: 350, lineHeight: 1.08,
      margin: isMobile ? "2rem 1.5rem 0" : "3rem 5rem 0",
      color: "#121317", letterSpacing: "-0.02em",
    }}>
      {text.slice(0, count)}
      {inView && count < text.length && (
        <span style={{ animation: "cursorBlink 0.9s step-end infinite" }}>|</span>
      )}
    </h2>
  )
}

function ServiceCard({ s, i, isMobile }: { s: typeof SERVICES[0]; i: number; isMobile: boolean }) {
  const ref     = useRef<HTMLDivElement>(null)
  const visible = useInView(ref as React.RefObject<Element>, 0.12)
  const [hovered, setHovered] = useState(false)

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 16,
        border: `1px solid ${s.color}28`,
        padding: "1.75rem 1.6rem 2rem",
        background: hovered
          ? `linear-gradient(145deg, ${s.color}22 0%, ${s.color}0a 100%)`
          : `linear-gradient(145deg, ${s.color}12 0%, ${s.color}04 100%)`,
        display: "flex", flexDirection: "column", gap: "1rem",
        cursor: "default",
        boxShadow: hovered ? `0 8px 32px ${s.color}22` : `0 2px 12px ${s.color}0e`,
        transition: "background 0.28s ease, box-shadow 0.28s ease, opacity 0.5s ease, transform 0.5s ease",
        opacity: isMobile ? (visible ? 1 : 0) : 1,
        transform: isMobile
          ? visible ? "translateY(0) scale(1)" : "translateY(36px) scale(0.97)"
          : "none",
        transitionDelay: isMobile ? `${i * 0.07}s` : "0s",
      }}
    >
      {/* Large icon */}
      <span className="material-symbols-outlined" style={{
        fontSize: "3rem",
        color: s.color,
        lineHeight: 1,
        display: "inline-block",
        animation: `iconFloat 3.5s ease-in-out infinite`,
        animationDelay: `${i * 0.38}s`,
      }}>{s.icon}</span>

      <h3 style={{
        fontFamily: FF,
        fontSize: "1.05rem", fontWeight: 600,
        lineHeight: 1.3, letterSpacing: "-0.015em",
        color: "#121317", margin: 0,
      }}>
        {s.title}
      </h3>

      <p style={{
        fontFamily: FF,
        fontSize: "1rem", fontWeight: 350,
        lineHeight: 1.65, color: "#45474d",
        margin: 0, flex: 1,
      }}>
        {s.desc}
      </p>

      <button style={{
        display: "inline-flex", alignItems: "center", gap: "0.4em",
        marginTop: "0.25rem",
        padding: "0.55em 1.1em",
        borderRadius: "999px",
        border: `1px solid ${s.color}40`,
        background: `${s.color}12`,
        color: s.color,
        fontFamily: FF, fontSize: "0.9rem", fontWeight: 550,
        cursor: "pointer",
        transition: "background 0.18s ease, border-color 0.18s ease",
        alignSelf: "flex-start",
      }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement
          el.style.background = `${s.color}22`
          el.style.borderColor = `${s.color}70`
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement
          el.style.background = `${s.color}12`
          el.style.borderColor = `${s.color}40`
        }}
      >
        Read more
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
          <path d="M2 6h8m0 0L7 3m3 3L7 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  )
}

export default function Services() {
  const isMobile = useIsMobile()
  const px = isMobile ? "1.5rem" : "9rem"

  return (
    <section id="services" style={{ fontFamily: FF, paddingTop: isMobile ? "4rem" : "7rem", paddingBottom: "2rem" }}>

      <style>{`
        @keyframes iconFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-6px); }
        }
      `}</style>

      {/* Icon bubbles */}
      <div style={{
        height: isMobile ? "9rem" : "max(22em,38vb)",
        display: "flex", flexDirection: "row",
        gap: "0.5rem", alignItems: "center",
        overflowX: "clip",
        padding: `${isMobile ? "1rem" : "2rem"} ${px}`,
      }}>
        {ICONS.map((icon, i) => (
          <div key={`${icon}-${i}`} style={{
            flex: `0 0 clamp(${isMobile ? "2.8rem" : "3.5rem"},${isMobile ? "6vw" : "8vw"},${isMobile ? "4rem" : "5.5rem"})`,
            aspectRatio: "1", borderRadius: "50%",
            background: "rgba(183,191,217,0.09)",
            border: "1px solid rgba(33,34,38,0.06)",
            backdropFilter: "blur(5px)",
            display: "grid", placeContent: "center",
            animation: "wobble 4s ease infinite alternate",
            animationDelay: `${(i % 5) * -1}s`,
            willChange: "translate",
          }}>
            <span className="material-symbols-outlined" style={{
              fontSize: isMobile ? "1.1rem" : "clamp(1.4rem,2.5vw,2rem)",
              color: "#45474d",
            }}>{icon}</span>
          </div>
        ))}
      </div>

      <TypewriterH2 text="MGX builds intelligent technology platforms for enterprises and governments at scale." />

      {/* Service cards */}
      <div style={{
        padding: `2.5rem ${px}`,
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)",
        gap: isMobile ? "1.5rem" : "1rem",
        marginTop: "2rem",
      }}>
        {SERVICES.map((s, i) => (
          <ServiceCard key={s.title} s={s} i={i} isMobile={isMobile} />
        ))}
      </div>

      <div style={{ margin: `3rem ${px} 0`, height: 1, background: "rgba(33,34,38,0.06)" }} />
    </section>
  )
}
