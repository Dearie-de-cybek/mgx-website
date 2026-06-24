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
    title: "Artificial Intelligence & Machine Learning",
    desc: "AI systems, intelligent automation, predictive analytics, computer vision, and data-driven decision platforms.",
    img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=640&h=500&fit=crop&q=90",
    featured: false,
  },
  {
    title: "Cybersecurity & Threat Intelligence",
    desc: "Security assessments, vulnerability research, threat monitoring, incident response, and digital protection.",
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=640&h=500&fit=crop&q=90",
    featured: true,
  },
  {
    title: "Software Development & Digital Platforms",
    desc: "Custom web, mobile, and enterprise software — from concept and design through deployment and maintenance.",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=640&h=500&fit=crop&q=90",
    featured: false,
  },
  {
    title: "Government Technology Solutions",
    desc: "E-government platforms, digital records, citizen services, GIS systems, and public sector modernization.",
    img: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=640&h=500&fit=crop&q=90",
    featured: false,
  },
  {
    title: "Health Technology Solutions",
    desc: "Electronic health records, healthcare workflow platforms, health data management, and clinical systems.",
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=640&h=500&fit=crop&q=90",
    featured: false,
  },
  {
    title: "Smart Cities & Urban Technology",
    desc: "IoT systems, urban intelligence platforms, infrastructure monitoring, smart mobility, and city data.",
    img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=640&h=500&fit=crop&q=90",
    featured: false,
  },
  {
    title: "Research & Innovation Development",
    desc: "Technology research, feasibility studies, prototypes, R&D partnerships, and turning ideas into products.",
    img: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=640&h=500&fit=crop&q=90",
    featured: false,
  },
  {
    title: "Technology Training & Workforce Development",
    desc: "Professional training, certification programs, bootcamps, and talent development through MGX Campus.",
    img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=640&h=500&fit=crop&q=90",
    featured: false,
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
  const ref      = useRef<HTMLHeadingElement>(null)
  const [count, setCount] = useState(0)
  const inView   = useInView(ref as React.RefObject<Element>, 0.2)
  const isMobile = useIsMobile()

  useEffect(() => {
    if (!inView) return
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
  const px       = isMobile ? "1.5rem" : "5rem"

  return (
    <section id="services" style={{ fontFamily: FF, paddingTop: isMobile ? "4rem" : "7rem", paddingBottom: "2rem" }}>
      <style>{`
        @keyframes wobble {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
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

      {/* 4-column grid — 2 rows of 4 */}
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
        gap: isMobile ? "1rem" : "2rem",
        padding: isMobile ? `2.5rem ${px} 0` : "2.5rem 8rem 0",
      }}>
        {SERVICES.map((s) => {
          const bg = s.featured ? "#1a73e8" : "#0c0c14"
          const grad = s.featured
            ? "linear-gradient(to bottom, #1a73e8 18%, rgba(26,115,232,0.88) 45%, transparent 74%)"
            : "linear-gradient(to bottom, #0c0c14 18%, rgba(12,12,20,0.88) 45%, transparent 74%)"

          return (
            <div
              key={s.title}
              style={{
                height: isMobile ? 300 : 440,
                borderRadius: isMobile ? 14 : 18,
                background: bg,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Photo — bottom portion */}
              <img
                src={s.img}
                alt=""
                loading="lazy"
                style={{
                  position: "absolute", bottom: 0, left: 0,
                  width: "100%", height: "60%",
                  objectFit: "cover", objectPosition: "center top",
                  zIndex: 0,
                }}
              />

              {/* Gradient — solid top fading to reveal photo */}
              <div style={{
                position: "absolute", inset: 0,
                background: grad,
                zIndex: 1, pointerEvents: "none",
              }} />

              {/* Text */}
              <div style={{
                position: "relative", zIndex: 2,
                padding: isMobile ? "1.25rem 1rem" : "1.5rem 1.4rem",
                display: "flex", flexDirection: "column", gap: "0.5rem",
              }}>
                <h3 style={{
                  fontFamily: FF,
                  fontSize: isMobile ? "0.9rem" : "1rem",
                  fontWeight: 650, lineHeight: 1.25,
                  color: "white", margin: 0, letterSpacing: "-0.015em",
                }}>
                  {s.title}
                </h3>
                <p style={{
                  fontFamily: FF,
                  fontSize: isMobile ? "0.75rem" : "0.82rem",
                  fontWeight: 350,
                  color: s.featured ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.5)",
                  lineHeight: 1.6, margin: 0,
                }}>
                  {s.desc}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      <div style={{ margin: isMobile ? `3rem ${px} 0` : "3rem 8rem 0", height: 1, background: "rgba(33,34,38,0.06)" }} />
    </section>
  )
}
