"use client"

import { useEffect, useRef } from "react"
import { useIsMobile } from "@/hooks/useIsMobile"

const FF = "'Google Sans Flex','Google Sans',system-ui,sans-serif"

const COLS = [
  { heading: "Services", links: ["AI & Machine Learning","Cybersecurity","Software Development","GovTech Solutions","Smart Cities"] },
  { heading: "Products", links: ["H360 (Coming-soon)","GOVDIGI (Coming-soon)","TRUSTPORT IDENTITY (Coming-soon)","E-TRACK (Coming-soon)","NEARFENCE (Coming-soon)"] },
  { heading: "Company",  links: ["About MGX","Blog","Careers","Contact","Partners"] },
]

// Background wavy blobs — blur on wrapper for GPU compositing
function WavyBlob() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let raf = 0, t = 0
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener("resize", resize)

    const draw = () => {
      const { width: W, height: H } = canvas
      ctx.clearRect(0, 0, W, H)
      const cx = W * 0.5, cy = H * 0.45
      const r  = Math.min(W, H) * 0.28

      const blobs = [
        { ox: 0,         oy: 0,         col: "rgba(26,115,232,0.5)",  scale: 1.0,  phase: 0   },
        { ox: W * 0.09,  oy: H * 0.05,  col: "rgba(66,133,244,0.38)", scale: 0.78, phase: 2.1 },
        { ox:-W * 0.07,  oy: H * 0.08,  col: "rgba(90,60,200,0.32)",  scale: 0.65, phase: 4.3 },
      ]

      for (const b of blobs) {
        const pts = 72
        ctx.beginPath()
        for (let i = 0; i <= pts; i++) {
          const a = (i / pts) * Math.PI * 2
          const warp =
            Math.sin(a * 3 + t * 0.55 + b.phase) * 0.13 +
            Math.sin(a * 5 - t * 0.38 + b.phase * 1.3) * 0.07 +
            Math.cos(a * 2 + t * 0.29 + b.phase * 0.7) * 0.05
          const rad = r * b.scale * (1 + warp)
          const x = cx + b.ox + Math.cos(a) * rad
          const y = cy + b.oy + Math.sin(a) * rad
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
        }
        ctx.closePath()
        const grad = ctx.createRadialGradient(cx + b.ox, cy + b.oy, 0, cx + b.ox, cy + b.oy, r * b.scale * 1.1)
        grad.addColorStop(0, b.col)
        grad.addColorStop(1, "rgba(0,0,0,0)")
        ctx.fillStyle = grad
        ctx.fill()
      }

      t  += 0.012
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize) }
  }, [])

  return (
    <div style={{ position: "absolute", inset: 0, filter: "blur(50px)", pointerEvents: "none" }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
    </div>
  )
}

export default function Footer() {
  const isMobile = useIsMobile()
  const px = isMobile ? "1.5rem" : "7rem"

  return (
    <footer id="contact" style={{
      fontFamily: FF, background: "#000",
      position: "relative", overflow: "hidden",
      paddingTop: isMobile ? "4rem" : "7rem",
    }}>
      <WavyBlob />

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ── Link columns ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr 1fr" : "2fr 1fr 1fr 1fr",
          gap: isMobile ? "2.5rem 1.5rem" : "4rem",
          padding: `0 ${px}`,
          marginBottom: isMobile ? "3.5rem" : "6rem",
        }}>
          {/* Brand */}
          <div style={{
            display: "flex", flexDirection: "column", gap: "1rem",
            gridColumn: isMobile ? "1 / -1" : "auto",
          }}>
            <p style={{ fontFamily: FF, fontSize: "1.1rem", fontWeight: 700, color: "white", margin: 0, letterSpacing: "-0.01em" }}>
              MGX<span style={{ color: "#1a73e8" }}>.</span>
            </p>
            <p style={{ fontSize: "0.9rem", fontWeight: 350, color: "rgba(255,255,255,0.65)", lineHeight: 1.75, margin: 0, maxWidth: 280 }}>
              A technology company building intelligent systems for enterprises and governments. Engineering tomorrow, today.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.25rem" }}>
              {["LinkedIn","X","GitHub"].map(s => (
                <a key={s} href="#" style={{
                  fontSize: "0.72rem", fontWeight: 500, color: "rgba(255,255,255,0.45)",
                  textDecoration: "none", letterSpacing: "0.04em",
                  transition: "color 0.18s ease",
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "white" }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)" }}
                >{s}</a>
              ))}
            </div>
          </div>

          {COLS.map(({ heading, links }) => (
            <div key={heading}>
              <h5 style={{
                fontFamily: FF, fontSize: "0.68rem", fontWeight: 650,
                color: "white", margin: "0 0 1.25rem",
                letterSpacing: "0.08em", textTransform: "uppercase",
              }}>
                {heading}
              </h5>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                {links.map(link => (
                  <li key={link}>
                    <a href="#" style={{
                      fontFamily: FF, fontSize: "0.85rem", fontWeight: 350,
                      color: "rgba(255,255,255,0.62)", textDecoration: "none",
                      transition: "color 0.18s ease",
                    }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "white" }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.62)" }}
                    >{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ── */}
        <div style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "center",
          justifyContent: "space-between",
          gap: isMobile ? "0.75rem" : 0,
          padding: `1.5rem ${px}`,
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}>
          <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.42)" }}>
            © 2025 MGX Technology. All rights reserved.
          </span>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["Privacy","Terms","Cookies"].map(item => (
              <a key={item} href="#" style={{
                fontFamily: FF, fontSize: "0.75rem",
                color: "rgba(255,255,255,0.42)", textDecoration: "none",
                transition: "color 0.18s ease",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.8)" }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.42)" }}
              >{item}</a>
            ))}
          </div>
        </div>

        {/* ── Large MGX wordmark with moving blob ── */}
        <div style={{ position: "relative", textAlign: "center", overflow: "hidden", lineHeight: 1, userSelect: "none" }}>

          {/* Blob that sweeps through the letters */}
          <style>{`
            @keyframes mgx-blob-drift {
              0%   { left: -30%; opacity: 0; }
              8%   { opacity: 1; }
              92%  { opacity: 1; }
              100% { left: 110%; opacity: 0; }
            }
          `}</style>
          <div style={{
            position: "absolute",
            top: "50%", transform: "translateY(-50%)",
            width: "40%", height: "180%",
            background: "radial-gradient(ellipse, rgba(26,115,232,0.75) 0%, rgba(100,60,220,0.5) 40%, transparent 70%)",
            filter: "blur(55px)",
            mixBlendMode: "screen",
            animation: "mgx-blob-drift 7s ease-in-out infinite",
            pointerEvents: "none",
          }} />

          <span style={{
            fontFamily: FF,
            fontSize: isMobile ? "clamp(5rem,28vw,10rem)" : "clamp(8rem,22vw,22rem)",
            fontWeight: 800, letterSpacing: "-0.04em",
            color: "rgba(255,255,255,0.1)",
            display: "block", lineHeight: 0.88,
          }}>
            MGX
          </span>
        </div>

      </div>
    </footer>
  )
}
