"use client"

import { useIsMobile } from "@/hooks/useIsMobile"

const FF = "'Google Sans Flex','Google Sans',system-ui,sans-serif"

const PANELS = [
  {
    audience:  "For enterprises",
    headline:  "Transform at scale",
    sub:       "Migrate, automate, and digitalize your operations with platforms built for the most demanding enterprise environments.",
    cta:       "Talk to MGX",
    // blue
    tint:      "rgba(20,60,160,0.18)",
    accent:    "rgba(96,165,250,0.8)",
    btnBg:     "rgba(42,107,255,0.88)",
    btnGlow:   "rgba(42,107,255,0.35)",
    auraColor: "rgba(30,90,255,0.28)",
    auraColor2:"rgba(50,120,255,0.15)",
  },
  {
    audience:  "MGX Campus",
    headline:  "Where talent meets technology",
    sub:       "A dedicated innovation hub for training, research, and technology incubation — building the next generation of digital leaders across Africa and beyond.",
    cta:       "Explore the campus",
    // violet
    tint:      "rgba(80,20,160,0.16)",
    accent:    "rgba(192,132,252,0.8)",
    btnBg:     "rgba(124,58,237,0.88)",
    btnGlow:   "rgba(124,58,237,0.35)",
    auraColor: "rgba(130,50,255,0.26)",
    auraColor2:"rgba(180,80,255,0.14)",
  },
]

export default function Who() {
  const isMobile = useIsMobile()

  return (
    <section
      id="who"
      style={{
        fontFamily: FF,
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        position: "relative",
        background: isMobile ? "#0d0820" : "#04060f",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        gap: isMobile ? "1rem" : 0,
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

      {PANELS.map((p, i) => (
        <div
          key={p.audience}
          style={{
            flex: "1 1 300px",
            minHeight: isMobile ? 0 : "72vh",
            position: "relative",
            overflow: "hidden",
            background: p.tint,
            borderRight: !isMobile && i === 0 ? "1px solid rgba(255,255,255,0.07)" : "none",
          }}
        >
          {/* Per-panel aurora */}
          <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
            <div style={{
              position: "absolute",
              width: "80%", height: "80%",
              top: "-20%", left: i === 0 ? "-10%" : "10%",
              background: `radial-gradient(ellipse at center, ${p.auraColor} 0%, transparent 65%)`,
              filter: "blur(70px)",
              animation: i === 0 ? "auroraA 9s ease-in-out infinite alternate" : "auroraC 10s ease-in-out infinite alternate",
            }} />
            <div style={{
              position: "absolute",
              width: "65%", height: "65%",
              bottom: "-15%", right: i === 0 ? "5%" : "-5%",
              background: `radial-gradient(ellipse at center, ${p.auraColor2} 0%, transparent 68%)`,
              filter: "blur(90px)",
              animation: i === 0 ? "auroraB 12s ease-in-out infinite alternate" : "auroraD 13s ease-in-out infinite alternate",
            }} />
          </div>

          <div style={{
            position: "relative", zIndex: 1,
            padding: isMobile ? "3rem 1.75rem" : "5rem 4rem",
            minHeight: isMobile ? 0 : "72vh",
            display: "grid",
            placeContent: "center",
            gap: "1rem",
            textAlign: "center",
          }}>
            <p style={{
              fontSize: "0.75rem", fontWeight: 600,
              letterSpacing: "0.12em", textTransform: "uppercase",
              color: p.accent, margin: 0,
            }}>
              {p.audience}
            </p>

            <h3 style={{
              fontFamily: FF,
              fontSize: isMobile ? "clamp(1.8rem,7vw,2.4rem)" : "clamp(2rem,3.5vw,2.8rem)",
              fontWeight: 400, lineHeight: 1.06,
              color: "white", margin: "0.2rem 0 0",
              letterSpacing: "-0.025em",
            }}>
              {p.headline}
            </h3>

            <p style={{
              color: "rgba(255,255,255,0.92)", fontWeight: 300,
              lineHeight: 1.65, maxWidth: "34ch",
              margin: "0 auto", fontSize: "1rem",
            }}>
              {p.sub}
            </p>

            <div style={{ marginTop: "0.5rem" }}>
              <button
                style={{
                  fontFamily: FF,
                  fontSize: "0.95rem", fontWeight: 500,
                  padding: "0.72em 1.9em",
                  borderRadius: "999px",
                  cursor: "pointer",
                  border: "none",
                  background: p.btnBg,
                  color: "white",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  boxShadow: `0 0 28px ${p.btnGlow}`,
                  transition: "transform 0.18s ease, box-shadow 0.18s ease, filter 0.18s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.transform = "translateY(-2px)"
                  el.style.filter = "brightness(1.15)"
                  el.style.boxShadow = `0 0 44px ${p.btnGlow}`
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.transform = "translateY(0)"
                  el.style.filter = "brightness(1)"
                  el.style.boxShadow = `0 0 28px ${p.btnGlow}`
                }}
              >
                {p.cta}
              </button>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
