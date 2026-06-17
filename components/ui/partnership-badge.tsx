"use client"

import { useState, useEffect } from "react"

const FF = "'Google Sans Flex','Google Sans',system-ui,sans-serif"

export default function PartnershipBadge() {
  const [open,    setOpen]    = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1400)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <style>{`
        @keyframes pb-spin  { to { transform: rotate(360deg); } }
        @keyframes pb-spin-r{ to { transform: rotate(-360deg); } }
        @keyframes pb-dot   { 0%,100%{opacity:1}50%{opacity:.35} }
        @keyframes pb-pulse {
          0%  {box-shadow:0 0 0 0 rgba(26,115,232,.6)}
          70% {box-shadow:0 0 0 14px rgba(26,115,232,0)}
          100%{box-shadow:0 0 0 0 rgba(26,115,232,0)}
        }
        @keyframes pb-slide-dot {
          0%  {left:0%;opacity:0}10%{opacity:1}90%{opacity:1}100%{left:100%;opacity:0}
        }
        .pb-circle:hover { transform: scale(1.07); }
        .pb-circle { transition: transform .2s cubic-bezier(.34,1.56,.64,1); }
      `}</style>

      <div style={{
        position: "fixed", bottom: "1.75rem", right: "1.75rem",
        zIndex: 9999, fontFamily: FF,
        display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.75rem",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.55s ease, transform 0.55s cubic-bezier(.34,1.56,.64,1)",
      }}>

        {/* ── Expanded card ── */}
        <div style={{
          width: 292,
          background: "#ffffff",
          border: "1px solid rgba(33,34,38,0.08)",
          borderRadius: 20,
          overflow: "hidden",
          transformOrigin: "bottom right",
          transform: open ? "scale(1) translateY(0)" : "scale(0.8) translateY(12px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "transform 0.44s cubic-bezier(.34,1.56,.64,1), opacity 0.22s ease",
          boxShadow: "0 8px 16px rgba(0,0,0,0.06), 0 24px 56px rgba(0,0,0,0.12)",
        }}>
          {/* Blue accent bar at top */}
          <div style={{ height: 4, background: "linear-gradient(90deg,#1a73e8,#4285f4,#0d47a1)" }} />

          {/* Header */}
          <div style={{ padding: "1rem 1.25rem 0.85rem", borderBottom: "1px solid rgba(33,34,38,.07)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ color: "#121317", fontWeight: 700, fontSize: "1rem", letterSpacing: "-0.025em" }}>MGX</div>
                <div style={{ color: "#80868b", fontSize: "0.6rem", letterSpacing: "0.07em", marginTop: 2 }}>TECHNOLOGY</div>
              </div>
              <div style={{ flex: 1, margin: "0 0.8rem", position: "relative", height: 1, background: "rgba(33,34,38,.1)" }}>
                <span style={{
                  position: "absolute", top: "50%", transform: "translateY(-50%)",
                  width: 6, height: 6, borderRadius: "50%", background: "#1a73e8",
                  animation: open ? "pb-slide-dot 2.2s ease-in-out infinite" : "none",
                }} />
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ color: "#121317", fontWeight: 700, fontSize: "1rem", letterSpacing: "-0.025em" }}>MexyGabriel</div>
                <div style={{ color: "#80868b", fontSize: "0.6rem", letterSpacing: "0.07em", marginTop: 2 }}>PARENT CO.</div>
              </div>
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: "1rem 1.25rem 1.2rem" }}>
            <p style={{ color: "#5f6368", margin: "0 0 1rem", fontSize: "0.81rem", lineHeight: 1.65, fontWeight: 400 }}>
              MGX is a technology venture of MexyGabriel, built to deliver Africa&rsquo;s digital
              infrastructure — combining enterprise software, cybersecurity, AI, and talent
              development under one roof.
            </p>
            <button
              style={{
                width: "100%",
                background: "#1a73e8",
                border: "none",
                borderRadius: 10,
                color: "white", fontFamily: FF, fontSize: "0.78rem", fontWeight: 500,
                padding: "0.65em 1em", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                transition: "background .15s ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#1557b0" }}
              onMouseLeave={e => { e.currentTarget.style.background = "#1a73e8" }}
            >
              <span>Visit MexyGabriel</span>
              <span style={{ opacity: .75 }}>↗</span>
            </button>
          </div>
        </div>

        {/* ── Circular badge button ── */}
        <button
          className="pb-circle"
          onClick={() => setOpen(o => !o)}
          style={{
            position: "relative",
            width: 88, height: 88,
            borderRadius: "50%",
            background: "linear-gradient(145deg, #1a73e8 0%, #0d47a1 100%)",
            border: "none",
            cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 6px 28px rgba(26,115,232,.55), 0 2px 8px rgba(0,0,0,.3)",
            animation: visible && !open ? "pb-pulse 2s ease-out 1" : "none",
          }}
        >
          {/* Spinning text ring */}
          <svg
            width="88" height="88"
            viewBox="0 0 88 88"
            style={{
              position: "absolute", inset: 0,
              animation: "pb-spin 10s linear infinite",
              animationPlayState: open ? "paused" : "running",
            }}
          >
            <defs>
              <path
                id="pb-text-circle"
                d="M44,44 m-33,0 a33,33 0 1,1 66,0 a33,33 0 1,1 -66,0"
              />
            </defs>
            <text
              fontSize="6.2"
              fontFamily={FF}
              fill="rgba(255,255,255,0.85)"
              letterSpacing="1.8"
              fontWeight="600"
            >
              <textPath href="#pb-text-circle">
                MGX × MEXYGABRIEL · PARTNER ·
              </textPath>
            </text>
          </svg>

          {/* Centre icon */}
          <span
            className="material-symbols-outlined"
            style={{
              fontSize: "1.75rem", color: "white",
              position: "relative", zIndex: 1,
              animation: open ? "pb-spin-r .6s ease-out 1" : "none",
            }}
          >
            {open ? "close" : "handshake"}
          </span>
        </button>
      </div>
    </>
  )
}
