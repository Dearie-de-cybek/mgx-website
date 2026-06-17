"use client"

import { useRef } from "react"

const FF = "'Google Sans Flex','Google Sans',system-ui,sans-serif"

const PRODUCTS = [
  {
    name: "H360",
    tagline: "Intelligent 360° Operations Hub",
    desc: "A unified command centre that aggregates enterprise data, assets, and workflows into a single real-time operational view — giving leaders total situational awareness across every department.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=85&fit=crop",
  },
  {
    name: "GOVDIGI",
    tagline: "Government Digital Services Platform",
    desc: "An end-to-end e-government suite enabling secure, accessible digital interactions between citizens and public institutions — deployable at national scale with full compliance built in.",
    img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=85&fit=crop",
  },
  {
    name: "TRUSTPORT IDENTITY",
    tagline: "Digital Identity & Trust Management",
    desc: "A biometric-backed identity verification and credentialing system that secures access across enterprise and government ecosystems — from onboarding to continuous authentication.",
    img: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&q=85&fit=crop",
  },
  {
    name: "E-TRACK",
    tagline: "Real-time Asset & Fleet Tracking",
    desc: "Live telemetry and intelligent analytics for vehicles, field assets, and logistics operations — complete visibility at any scale, from dozens to millions of tracked units.",
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=85&fit=crop",
  },
  {
    name: "NEARFENCE",
    tagline: "Geofencing & Location Intelligence",
    desc: "Dynamic geofencing and proximity-based intelligence that automates location-triggered actions across retail, logistics, and smart-city applications with sub-metre precision.",
    img: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=85&fit=crop",
  },
]

function ChevronLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ArrowRight() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
      <path d="M2 6.5h9m0 0L7.5 3M11 6.5L7.5 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Products() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: "prev" | "next") => {
    const el = scrollRef.current
    if (!el) return
    const card = el.children[0] as HTMLElement
    const amount = (card?.offsetWidth ?? 540) + 20
    el.scrollBy({ left: dir === "next" ? amount : -amount, behavior: "smooth" })
  }

  return (
    <section
      id="products"
      style={{ fontFamily: FF, paddingTop: "7rem", paddingBottom: "6rem", borderTop: "1px solid rgba(33,34,38,0.06)" }}
    >
      {/* ── Split header ── */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        padding: "0 7rem",
        gap: "5rem",
      }}>
        {/* Left: large heading */}
        <h2 style={{
          fontFamily: FF,
          fontSize: "clamp(2.8rem, 4.2vw, 5rem)",
          fontWeight: 350, lineHeight: 1.05,
          color: "#121317", margin: 0,
          letterSpacing: "-0.03em",
          flexShrink: 0,
        }}>
          Proprietary<br />Platforms
        </h2>

        {/* Right: sub-text + controls */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "2rem",
          maxWidth: "400px",
          paddingBottom: "0.25rem",
        }}>
          <p style={{
            color: "#45474d", fontWeight: 300,
            fontSize: "1.05rem", lineHeight: 1.65,
            margin: 0,
          }}>
            Five purpose-built software platforms solving distinct enterprise and
            government challenges — each deployable at national scale.
          </p>

          {/* Glass carousel controls — single shared pill */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            background: "rgba(255,255,255,0.55)",
            backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(18,19,23,0.09)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.9)",
            borderRadius: "100px",
            overflow: "hidden",
          }}>
            {(["prev", "next"] as const).map((dir, i) => (
              <button
                key={dir}
                onClick={() => scroll(dir)}
                aria-label={dir === "prev" ? "Previous product" : "Next product"}
                style={{
                  width: "48px", height: "44px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "transparent",
                  border: "none",
                  borderRight: "none",
                  cursor: "pointer", color: "#121317",
                  transition: "background 0.15s ease",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(18,19,23,0.05)" }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent" }}
              >
                {dir === "prev" ? <ChevronLeft /> : <ChevronRight />}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Scroll-snap carousel ── */}
      <div
        ref={scrollRef}
        style={{
          display: "flex",
          gap: "1.25rem",
          paddingTop: "4rem",
          paddingBottom: "1rem",
          overflowX: "scroll",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          overscrollBehaviorX: "contain",
        }}
      >
        {/* Spacer aligns first card with the heading left edge */}
        <div style={{ minWidth: "7rem", flexShrink: 0 }} />

        {PRODUCTS.map((p) => (
          <div
            key={p.name}
            style={{
              flex: "0 0 min(68vw, 520px)",
              scrollSnapAlign: "start",
              borderRadius: "20px",
              overflow: "hidden",
              background: "#ffffff",
              border: "1px solid rgba(18,19,23,0.07)",
              boxShadow: "0 2px 20px rgba(0,0,0,0.05), 0 1px 4px rgba(0,0,0,0.03)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Product image */}
            <div style={{
              height: "360px",
              overflow: "hidden",
              background: "#f1f3f4",
              flexShrink: 0,
            }}>
              <img
                src={p.img}
                alt={p.tagline}
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>

            {/* Product info */}
            <div style={{
              padding: "1.75rem 2rem 2rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.55rem",
              flex: 1,
            }}>
              <span style={{
                fontSize: "0.7rem", fontWeight: 700,
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: "#1a73e8",
              }}>
                {p.name}
              </span>

              <h3 style={{
                fontFamily: FF,
                fontSize: "1.2rem", fontWeight: 600,
                lineHeight: 1.2, color: "#121317",
                margin: 0, letterSpacing: "-0.02em",
              }}>
                {p.tagline}
              </h3>

              <p style={{
                fontWeight: 300, lineHeight: 1.6,
                color: "#45474d", fontSize: "0.9rem",
                margin: "0.2rem 0 0.9rem",
                flex: 1,
              }}>
                {p.desc}
              </p>

              <a
                href="#"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.4em",
                  color: "#121317", textDecoration: "none",
                  fontSize: "0.88rem", fontWeight: 550,
                  letterSpacing: "-0.01em",
                  transition: "gap 0.18s ease",
                  width: "fit-content",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.gap = "0.65em" }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.gap = "0.4em" }}
              >
                View product <ArrowRight />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
