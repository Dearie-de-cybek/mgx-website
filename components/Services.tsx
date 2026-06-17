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
    title: "Artificial Intelligence & Machine Learning Solutions",
    desc: "Design and development of AI systems, intelligent automation, predictive analytics, AI assistants, computer vision, and data-driven decision systems.",
    img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=700&q=85&fit=crop",
  },
  {
    title: "Cybersecurity & Threat Intelligence",
    desc: "Security assessments, vulnerability research, threat monitoring, incident response frameworks, security architecture, and digital protection solutions.",
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=700&q=85&fit=crop",
  },
  {
    title: "Software Development & Digital Platforms",
    desc: "Custom web, mobile, and enterprise software development — from concept, design, development, deployment, and maintenance.",
    img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=700&q=85&fit=crop",
  },
  {
    title: "Digital Transformation Consulting",
    desc: "Helping organizations modernize operations through technology strategy, process automation, cloud adoption, and digital workflows.",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=700&q=85&fit=crop",
  },
  {
    title: "Government Technology (GovTech) Solutions",
    desc: "Development of e-government platforms, digital records management, citizen services, GIS systems, and public sector modernization solutions.",
    img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=700&q=85&fit=crop",
  },
  {
    title: "Health Technology Solutions",
    desc: "Digital healthcare systems, electronic health records, healthcare workflow platforms, health data management, and clinical technology solutions.",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700&q=85&fit=crop",
  },
  {
    title: "Smart Cities & Urban Technology",
    desc: "IoT systems, urban intelligence platforms, infrastructure monitoring, smart mobility, environmental technology, and city data solutions.",
    img: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=700&q=85&fit=crop",
  },
  {
    title: "Research & Innovation Development",
    desc: "Technology research, feasibility studies, prototypes, innovation strategy, R&D partnerships, and turning ideas into deployable products.",
    img: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=700&q=85&fit=crop",
  },
  {
    title: "Technology Training & Workforce Development",
    desc: "Professional training, certification programs, technical bootcamps, cybersecurity education, AI training, and talent development through MGX Campus.",
    img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=700&q=85&fit=crop",
  },
  {
    title: "Data Analytics & Business Intelligence",
    desc: "Data platforms, dashboards, reporting systems, analytics solutions, and decision-support tools for organizations.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=85&fit=crop",
  },
]

function useInView(ref: React.RefObject<Element | null>, threshold = 0.35) {
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

export default function Services() {
  const isMobile = useIsMobile()
  const [hovered, setHovered] = useState<number | null>(null)
  const px = isMobile ? "1rem" : "5rem"

  return (
    <section id="services" style={{ fontFamily: FF, paddingTop: isMobile ? "4rem" : "7rem", paddingBottom: "2rem" }}>

      {/* ── Icon bubbles ── */}
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
            animation: `wobble 4s ease infinite alternate`,
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

      {/* ── 5×2 service cards ── */}
      <div style={{
        padding: `2.5rem ${px}`,
        display: "grid",
        gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(5, 1fr)",
        gap: isMobile ? "0.6rem" : "0.8rem",
        marginTop: "2rem",
      }}>
        {SERVICES.map((s, i) => (
          <div
            key={s.title}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              position: "relative", overflow: "hidden",
              borderRadius: isMobile ? 10 : 14,
              border: "none",
              aspectRatio: "3 / 4",
              cursor: "default",
              background: "#0a0c12",
            }}
          >
            {/* Background image */}
            <img
              src={s.img}
              alt={s.title}
              loading="lazy"
              style={{
                position: "absolute", inset: 0,
                width: "100%", height: "100%",
                objectFit: "cover", display: "block",
                transform: hovered === i ? "scale(1.07)" : "scale(1)",
                transition: "transform 0.65s cubic-bezier(0.4,0,0.2,1)",
                willChange: "transform",
              }}
            />

            {/* Default overlay: gradient + title at bottom */}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)",
              opacity: hovered === i ? 0 : 1,
              transition: "opacity 0.3s ease",
              display: "flex", flexDirection: "column", justifyContent: "flex-end",
              padding: isMobile ? "0.65rem" : "1.1rem",
              pointerEvents: "none",
            }}>
              <h3 style={{
                color: "white", margin: 0,
                fontFamily: FF, fontWeight: 500,
                fontSize: isMobile ? "0.7rem" : "0.82rem",
                lineHeight: 1.3, letterSpacing: "-0.01em",
              }}>
                {s.title}
              </h3>
            </div>

            {/* Hover overlay: dark bg + title + description */}
            <div style={{
              position: "absolute", inset: 0,
              background: "rgba(8,10,18,0.90)",
              opacity: hovered === i ? 1 : 0,
              transition: "opacity 0.3s ease",
              display: "flex", flexDirection: "column",
              justifyContent: "center",
              padding: isMobile ? "0.75rem" : "1.25rem",
              gap: "0.55rem",
              pointerEvents: "none",
            }}>
              <h3 style={{
                color: "#ffffff", margin: 0,
                fontFamily: FF, fontWeight: 600,
                fontSize: isMobile ? "0.82rem" : "1rem",
                lineHeight: 1.2, letterSpacing: "-0.02em",
              }}>
                {s.title}
              </h3>
              <p style={{
                color: "rgba(255,255,255,0.88)", margin: 0,
                fontFamily: FF, fontWeight: 350,
                fontSize: isMobile ? "0.72rem" : "0.86rem",
                lineHeight: 1.6,
              }}>
                {s.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ margin: `3rem ${px} 0`, height: 1, background: "rgba(33,34,38,0.06)" }} />
    </section>
  )
}
