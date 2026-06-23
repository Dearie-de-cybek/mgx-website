"use client"

import { useIsMobile } from "@/hooks/useIsMobile"

const FF = "'Google Sans Flex','Google Sans',system-ui,sans-serif"

const PRODUCTS = [
  { name: "H360",               tagline: "Intelligent 360° Operations Hub" },
  { name: "GOVDIGI",            tagline: "Government Digital Services Platform" },
  { name: "TRUSTPORT IDENTITY", tagline: "Digital Identity & Trust Management" },
  { name: "E-TRACK",            tagline: "Real-time Asset & Fleet Tracking" },
  { name: "NEARFENCE",          tagline: "Geofencing & Location Intelligence" },
]

export default function Products() {
  const isMobile = useIsMobile()
  const px = isMobile ? "1.5rem" : "7rem"

  return (
    <section id="products" style={{
      fontFamily: FF,
      paddingTop: isMobile ? "3.5rem" : "7rem",
      paddingBottom: isMobile ? "3rem" : "6rem",
      borderTop: "1px solid rgba(33,34,38,0.06)",
    }}>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        @keyframes pulseDot {
          0%, 100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.5); }
          50%       { box-shadow: 0 0 0 6px rgba(239,68,68,0); }
        }
      `}</style>

      {/* Header */}
      <div style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "space-between",
        alignItems: isMobile ? "flex-start" : "flex-end",
        padding: `0 ${px}`,
        gap: isMobile ? "1rem" : "5rem",
      }}>
        <h2 style={{
          fontFamily: FF,
          fontSize: isMobile ? "clamp(2rem,8vw,3rem)" : "clamp(2.8rem,4.2vw,5rem)",
          fontWeight: 350, lineHeight: 1.05,
          color: "#121317", margin: 0,
          letterSpacing: "-0.03em", flexShrink: 0,
        }}>
          Proprietary<br />Platforms
        </h2>

        {!isMobile && (
          <div style={{ maxWidth: 400, paddingBottom: "0.25rem" }}>
            <p style={{ color: "#45474d", fontWeight: 300, fontSize: "1.05rem", lineHeight: 1.65, margin: 0 }}>
              Five purpose-built software platforms solving distinct enterprise and government challenges — each deployable at national scale.
            </p>
          </div>
        )}
      </div>

      {/* Cinematic announcement */}
      <div style={{
        position: "relative",
        overflow: "hidden",
        background: "#020408",
        marginTop: isMobile ? "2.5rem" : "4rem",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        {/* Sphere stage */}
        <div aria-hidden style={{
          position: "relative",
          height: isMobile ? 180 : 300,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute",
            bottom: 0, left: "10%", right: "10%", height: "50%",
            background: "radial-gradient(ellipse at center bottom, rgba(26,115,232,0.35) 0%, rgba(100,40,255,0.15) 45%, transparent 70%)",
            filter: "blur(24px)",
          }} />
          <div style={{
            position: "relative",
            width: isMobile ? 300 : 520,
            height: isMobile ? 300 : 520,
            borderRadius: "50%",
            flexShrink: 0,
            marginBottom: isMobile ? -150 : -260,
            background: "radial-gradient(ellipse at 50% 38%, #0d1428 0%, #040610 55%, #020408 100%)",
            boxShadow: [
              "0 -55px 130px rgba(26,115,232,0.8)",
              "0 -25px 60px rgba(100,40,255,0.45)",
              "0 0 0 1px rgba(26,115,232,0.12)",
            ].join(","),
          }}>
            <div style={{
              position: "absolute",
              top: "6%", left: "14%", right: "14%", height: "26%",
              background: "radial-gradient(ellipse at center, rgba(60,140,255,0.7) 0%, rgba(120,60,255,0.35) 50%, transparent 72%)",
              filter: "blur(20px)",
              borderRadius: "50%",
            }} />
            <div style={{
              position: "absolute",
              top: "10%", left: "30%", right: "30%", height: "14%",
              background: "radial-gradient(ellipse, rgba(180,210,255,0.55) 0%, transparent 70%)",
              filter: "blur(10px)",
              borderRadius: "50%",
            }} />
          </div>
        </div>

        {/* Text block */}
        <div style={{
          position: "relative", zIndex: 2,
          textAlign: "center",
          padding: isMobile ? "2rem 1.5rem 0" : "2.5rem 4rem 0",
        }}>
          <p style={{
            fontFamily: FF, margin: "0 0 1.5rem",
            fontSize: "0.68rem", fontWeight: 700,
            letterSpacing: "0.22em", textTransform: "uppercase",
            color: "rgba(80,150,255,0.75)",
          }}>MGX Proprietary Platforms</p>

          <h3 style={{
            fontFamily: FF, margin: 0,
            fontSize: isMobile ? "clamp(1.8rem,9vw,2.8rem)" : "clamp(3rem,5.5vw,5rem)",
            fontWeight: 200,
            letterSpacing: isMobile ? "0.2em" : "0.3em",
            textTransform: "uppercase",
            color: "white", lineHeight: 1,
          }}>Coming Soon</h3>

          <p style={{
            fontFamily: FF,
            margin: "1.5rem auto 2rem",
            fontSize: "1rem", fontWeight: 300,
            color: "rgba(255,255,255,0.45)",
            maxWidth: 480, lineHeight: 1.7,
          }}>
            Five purpose-built platforms launching soon — redefining how enterprises and governments operate at scale.
          </p>

          <button style={{
            fontFamily: FF,
            padding: "0.8em 2.2em",
            borderRadius: "999px",
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.22)",
            color: "white", fontSize: "0.95rem", fontWeight: 450,
            cursor: "pointer", letterSpacing: "0.04em",
            transition: "border-color 0.2s ease, background 0.2s ease",
          }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.background = "rgba(255,255,255,0.08)"
              el.style.borderColor = "rgba(255,255,255,0.45)"
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.background = "transparent"
              el.style.borderColor = "rgba(255,255,255,0.22)"
            }}
          >
            Get Notified
          </button>
        </div>

        <div style={{ paddingBottom: isMobile ? "2.5rem" : "3.5rem" }} />
      </div>
    </section>
  )
}
