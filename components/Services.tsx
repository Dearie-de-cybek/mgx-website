"use client"

import { useEffect, useRef, useState, useCallback } from "react"

const FF = "'Google Sans Flex','Google Sans',system-ui,sans-serif"

const ICONS = [
  "cloud", "security", "code", "analytics", "smart_toy", "settings_suggest",
  "account_balance", "badge", "track_changes", "location_on", "api", "storage",
  "devices", "network_check", "lock", "insights", "groups", "public",
  "router", "terminal", "integration_instructions", "deployed_code", "psychology", "memory",
]

const FEATURES = [
  {
    title: "Custom Software Development",
    desc: "Bespoke platforms built precisely for your operational context — from enterprise resource systems to citizen-facing digital portals that scale to national demand.",
    icon: "code",
    accent: "#1a73e8",
    img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=700&q=85&fit=crop",
  },
  {
    title: "Cybersecurity Solutions",
    desc: "End-to-end security posture management, threat intelligence, and incident response that protect critical infrastructure and sensitive data at every layer.",
    icon: "security",
    accent: "#d93025",
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=700&q=85&fit=crop",
  },
  {
    title: "Cloud Infrastructure",
    desc: "Architect, migrate, and manage cloud environments that deliver resilience, auto-scaling, and cost efficiency for your most demanding enterprise workloads.",
    icon: "cloud",
    accent: "#1e8e3e",
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=700&q=85&fit=crop",
  },
  {
    title: "AI & Process Automation",
    desc: "Deploy intelligent automation workflows, machine-learning pipelines, and agentic systems that eliminate manual bottlenecks and surface actionable insight.",
    icon: "smart_toy",
    accent: "#9334e6",
    img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=700&q=85&fit=crop",
  },
  {
    title: "Government Digitalization",
    desc: "Transform public-sector operations through secure e-government platforms, integrated citizen service systems, and digital infrastructure built for national scale.",
    icon: "account_balance",
    accent: "#f29900",
    img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=700&q=85&fit=crop",
  },
]

function useInView(ref: React.RefObject<Element | null>, threshold = 0.45) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref, threshold])
  return inView
}

function TypewriterH2({ text }: { text: string }) {
  const ref     = useRef<HTMLHeadingElement>(null)
  const started = useRef(false)          // ref, not state — won't trigger re-render
  const [count, setCount] = useState(0)
  const inView = useInView(ref as React.RefObject<Element>, 0.25)

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true
    let n = 0
    const iv = setInterval(() => {
      n++
      setCount(n)
      if (n >= text.length) clearInterval(iv)
    }, 28)
    return () => clearInterval(iv)
  }, [inView, text])

  return (
    <h2 ref={ref} style={{
      fontFamily: FF,
      fontSize: "clamp(2.6rem, 4.2vw, 5rem)",
      fontWeight: 350, lineHeight: 1.08,
      margin: "3rem 5rem 0",
      maxWidth: "none", color: "#121317",
      letterSpacing: "-0.02em",
    }}>
      {text.slice(0, count)}
      {inView && count < text.length && (
        <span style={{ animation: "cursorBlink 0.9s step-end infinite" }}>|</span>
      )}
    </h2>
  )
}

export default function Services() {
  const [activeIdx, setActiveIdx] = useState(0)
  const featureRefs = useRef<(HTMLDivElement | null)[]>([])

  const setRef = useCallback((el: HTMLDivElement | null, i: number) => {
    featureRefs.current[i] = el
  }, [])

  useEffect(() => {
    const observers = featureRefs.current.map((el, i) => {
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveIdx(i) },
        { threshold: 0.5 }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])

  const active = FEATURES[activeIdx]

  return (
    <section id="services" style={{ fontFamily: FF, paddingTop: "7rem", paddingBottom: "2rem" }}>

      {/* ── Wobbling icon bubbles ── */}
      <div style={{
        height: "max(22em, 38vb)",
        display: "flex", flexDirection: "row",
        gap: "0.5rem", alignItems: "center",
        overflowX: "clip",
        padding: "2rem 7rem",
      }}>
        {ICONS.map((icon, i) => (
          <div
            key={icon}
            style={{
              flex: "0 0 clamp(3.5rem, 8vw, 5.5rem)",
              aspectRatio: "1",
              borderRadius: "50%",
              background: "rgba(183,191,217,0.09)",
              border: "1px solid rgba(33,34,38,0.06)",
              backdropFilter: "blur(5px)",
              display: "grid", placeContent: "center",
              animation: `wobble 4s ease infinite alternate`,
              animationDelay: `${(i % 5) * -1}s`,
              willChange: "translate",
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", color: "#45474d" }}
            >
              {icon}
            </span>
          </div>
        ))}
      </div>

      {/* Typewriter heading — below the icons */}
      <TypewriterH2 text="MGX builds intelligent technology platforms for enterprises and governments at scale." />

      {/* ── Sticky feature layout ── */}
      <div style={{
        position: "relative",
        padding: "0 7rem",
        display: "grid",
        gridTemplateColumns: "1.4fr 1fr",
        gap: "6rem",
        marginTop: "3rem",
      }}>

        {/* Left: scrolling feature text */}
        <div>
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              ref={(el) => setRef(el, i)}
              style={{
                paddingBlock: "14vh",
                display: "grid",
                alignContent: "center",
                gap: "1rem",
              }}
            >
              <h3 style={{
                fontWeight: 650, fontSize: "1.65em", lineHeight: 1.1,
                color: "#121317", margin: 0, letterSpacing: "-0.02em",
              }}>
                {f.title}
              </h3>
              <p style={{
                fontWeight: 300, lineHeight: 1.55, color: "#45474d",
                maxWidth: "48ch", margin: 0, fontSize: "1.05em",
              }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Right: sticky image panel */}
        <div style={{ alignSelf: "start", position: "sticky", top: "calc(50vh - 360px)" }}>
          <div style={{
            borderRadius: "20px",
            height: "720px",
            overflow: "hidden",
            position: "relative",
            background: "#f1f3f4",
          }}>
            {/* Images: stack all, fade active one in */}
            {FEATURES.map((f, i) => (
              <img
                key={f.title}
                src={f.img}
                alt={f.title}
                style={{
                  position: "absolute", inset: 0,
                  width: "100%", height: "100%",
                  objectFit: "cover",
                  opacity: i === activeIdx ? 1 : 0,
                  transition: "opacity 0.5s ease",
                }}
              />
            ))}

            {/* Overlay: service label + progress dots */}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)",
              display: "flex", flexDirection: "column",
              justifyContent: "flex-end",
              padding: "1.75rem",
              gap: "0.75rem",
            }}>
              <p style={{
                margin: 0, color: "white",
                fontSize: "1rem", fontWeight: 550,
                letterSpacing: "-0.01em",
              }}>
                {active.title}
              </p>
              <div style={{ display: "flex", gap: "0.35rem" }}>
                {FEATURES.map((_, i) => (
                  <div key={i} style={{
                    height: "3px",
                    width: i === activeIdx ? "1.6rem" : "0.5rem",
                    borderRadius: "999px",
                    background: "white",
                    opacity: i === activeIdx ? 0.9 : 0.35,
                    transition: "all 0.35s ease",
                  }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ margin: "5rem 7rem 0", height: "1px", background: "rgba(33,34,38,0.06)" }} />
    </section>
  )
}
