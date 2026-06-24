"use client"

import { useIsMobile } from "@/hooks/useIsMobile"

const FF = "'Google Sans Flex','Google Sans',system-ui,sans-serif"

const PANELS = [
  {
    audience:  "For enterprises",
    headline:  "Transform at scale",
    sub:       "Migrate, automate, and digitalize your operations with platforms built for the most demanding enterprise environments.",
    cta:       "Talk to MGX",
    accent:    "#1a73e8",
    accentText:"rgba(26,115,232,0.9)",
    btnBg:     "#1a73e8",
    btnGlow:   "rgba(26,115,232,0.28)",
    border:    "rgba(26,115,232,0.18)",
    aura1:     "rgba(26,115,232,0.12)",
    aura2:     "rgba(100,160,255,0.1)",
  },
  {
    audience:  "MGX Campus",
    headline:  "Where talent meets technology",
    sub:       "A dedicated innovation hub for training, research, and technology incubation — building the next generation of digital leaders across Africa and beyond.",
    cta:       "Explore the campus",
    accent:    "#7c3aed",
    accentText:"rgba(124,58,237,0.9)",
    btnBg:     "#7c3aed",
    btnGlow:   "rgba(124,58,237,0.28)",
    border:    "rgba(124,58,237,0.18)",
    aura1:     "rgba(124,58,237,0.11)",
    aura2:     "rgba(192,132,252,0.09)",
  },
]

export default function Who() {
  const isMobile = useIsMobile()

  return (
    <section
      id="who"
      style={{
        fontFamily: FF,
        background: "transparent",
        padding: isMobile ? "3rem 1.25rem" : "5rem 4rem",
      }}
    >
      <style>{`
        @keyframes auroraA {
          from { transform: translate(0,0) scale(1); }
          to   { transform: translate(14%,20%) scale(1.2); }
        }
        @keyframes auroraB {
          from { transform: translate(0,0) scale(1); }
          to   { transform: translate(-10%,15%) scale(1.15); }
        }
        @keyframes auroraC {
          from { transform: translate(0,0) scale(1); }
          to   { transform: translate(8%,-18%) scale(0.88); }
        }
        @keyframes auroraD {
          from { transform: translate(0,0) scale(1); }
          to   { transform: translate(-12%,10%) scale(1.18); }
        }
      `}</style>

      <div style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: isMobile ? "1.5rem" : "2rem",
        maxWidth: 1200,
        margin: "0 auto",
      }}>
        {PANELS.map((p, i) => (
          <div
            key={p.audience}
            style={{
              flex: "1 1 0",
              position: "relative",
              overflow: "hidden",
              borderRadius: isMobile ? "1.25rem" : "1.75rem",
              border: `1px solid ${p.border}`,
              background: "#ffffff",
              minHeight: isMobile ? 520 : 780,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: isMobile ? "2.5rem 1.75rem" : "3.5rem 3rem",
              boxShadow: `0 2px 32px ${p.aura1}`,
              boxSizing: "border-box",
            }}
          >
            {/* Aurora beams */}
            <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
              <div style={{
                position: "absolute",
                width: "90%", height: "70%",
                top: "-10%", left: i === 0 ? "-15%" : "10%",
                background: `radial-gradient(ellipse at center, ${p.aura1} 0%, transparent 65%)`,
                filter: "blur(60px)",
                animation: i === 0 ? "auroraA 9s ease-in-out infinite alternate" : "auroraC 10s ease-in-out infinite alternate",
              }} />
              <div style={{
                position: "absolute",
                width: "70%", height: "60%",
                bottom: "-10%", right: i === 0 ? "0%" : "-10%",
                background: `radial-gradient(ellipse at center, ${p.aura2} 0%, transparent 68%)`,
                filter: "blur(80px)",
                animation: i === 0 ? "auroraB 12s ease-in-out infinite alternate" : "auroraD 13s ease-in-out infinite alternate",
              }} />
            </div>

            {/* Top: label + headline */}
            <div style={{ position: "relative", zIndex: 1 }}>
              <p style={{
                fontSize: "0.72rem", fontWeight: 700,
                letterSpacing: "0.14em", textTransform: "uppercase",
                color: p.accentText, margin: "0 0 1rem",
              }}>
                {p.audience}
              </p>

              <h3 style={{
                fontFamily: FF,
                fontSize: isMobile ? "clamp(1.8rem,7vw,2.6rem)" : "clamp(2rem,3.2vw,3rem)",
                fontWeight: 450, lineHeight: 1.08,
                color: "#121317", margin: 0,
                letterSpacing: "-0.03em",
              }}>
                {p.headline}
              </h3>
            </div>

            {/* Bottom: sub text + button */}
            <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <p style={{
                color: "#5f6368", fontWeight: 350,
                lineHeight: 1.7, fontSize: "1rem",
                margin: 0,
              }}>
                {p.sub}
              </p>

              <div>
                <button
                  style={{
                    fontFamily: FF,
                    fontSize: "0.95rem", fontWeight: 500,
                    padding: "0.75em 2em",
                    borderRadius: "999px",
                    cursor: "pointer",
                    border: "none",
                    background: p.btnBg,
                    color: "white",
                    boxShadow: `0 4px 20px ${p.btnGlow}`,
                    transition: "transform 0.18s ease, box-shadow 0.18s ease, filter 0.18s ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.transform = "translateY(-2px)"
                    el.style.filter = "brightness(1.1)"
                    el.style.boxShadow = `0 8px 32px ${p.btnGlow}`
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.transform = "translateY(0)"
                    el.style.filter = "brightness(1)"
                    el.style.boxShadow = `0 4px 20px ${p.btnGlow}`
                  }}
                >
                  {p.cta}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
