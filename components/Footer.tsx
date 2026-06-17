"use client"

import { useEffect, useRef } from "react"
import { useIsMobile } from "@/hooks/useIsMobile"

const FF = "'Google Sans Flex','Google Sans',system-ui,sans-serif"

const COLS = [
  { heading: "Services", links: ["Custom Software","Managed IT Services","Cybersecurity","Cloud Solutions","Automation"] },
  { heading: "Products", links: ["H360","GOVDIGI","TRUSTPORT IDENTITY","E-TRACK","NEARFENCE"] },
  { heading: "Company",  links: ["About MGX","Blog","Careers","Contact","Partners"] },
]

// Wavy animated blobs — blur moved to CSS for GPU compositing (perf win)
function WavyBlob() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let raf = 0, t = 0

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const draw = () => {
      const { width: W, height: H } = canvas
      ctx.clearRect(0, 0, W, H)

      const cx = W * 0.5, cy = H * 0.46
      const r  = Math.min(W, H) * 0.32

      const blobs = [
        { ox: 0,        oy: 0,       col: "rgba(26,115,232,0.55)",  scale: 1.0,  phase: 0   },
        { ox: W * 0.08, oy: H * 0.06, col: "rgba(66,133,244,0.42)", scale: 0.82, phase: 2.1 },
        { ox:-W * 0.06, oy: H * 0.09, col: "rgba(90,60,200,0.35)",  scale: 0.70, phase: 4.3 },
      ]

      for (const b of blobs) {
        const pts = 80 // reduced from 120 for perf
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
    // CSS blur on the wrapper = GPU compositing, much cheaper than ctx.filter
    <div style={{ position: "absolute", inset: 0, filter: "blur(40px)", pointerEvents: "none" }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
    </div>
  )
}

export default function Footer() {
  const isMobile = useIsMobile()
  const px = isMobile ? "1.5rem" : "7rem"

  return (
    <footer id="contact" style={{ fontFamily: FF, background: "#000", position: "relative", overflow: "hidden", paddingTop: isMobile ? "3.5rem" : "5rem" }}>
      <WavyBlob />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Link columns */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr 1fr" : "2fr 1fr 1fr 1fr",
          gap: isMobile ? "2rem 1.5rem" : "3rem",
          padding: `0 ${px}`,
          marginBottom: isMobile ? "2.5rem" : "4rem",
        }}>
          {/* Brand — full width on mobile */}
          <div style={{
            display: "flex", flexDirection: "column", gap: "0.75rem",
            gridColumn: isMobile ? "1 / -1" : "auto",
          }}>
            <p style={{ fontFamily: FF, fontSize: "1.05rem", fontWeight: 600, color: "white", margin: 0, letterSpacing: "-0.01em" }}>
              MGX<span style={{ color: "#1a73e8" }}>.</span>
            </p>
            <p style={{ fontSize: "0.88rem", fontWeight: 300, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, margin: 0, maxWidth: 260 }}>
              A technology company building intelligent systems for enterprises and governments. Engineering tomorrow, today.
            </p>
          </div>

          {COLS.map(({ heading, links }) => (
            <div key={heading}>
              <h5 style={{ fontFamily: FF, fontSize: "0.7rem", fontWeight: 600, color: "white", margin: "0 0 1rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                {heading}
              </h5>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" style={{ fontFamily: FF, fontSize: "0.82rem", fontWeight: 300, color: "rgba(255,255,255,0.42)", textDecoration: "none", transition: "color 0.18s ease" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "white" }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.42)" }}
                    >{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "center",
          justifyContent: "space-between",
          gap: isMobile ? "0.75rem" : 0,
          padding: `1.25rem ${px}`,
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}>
          <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.28)" }}>
            © 2025 MGX Technology. All rights reserved.
          </span>
          <div style={{ display: "flex", gap: "1.25rem" }}>
            {["Privacy","Terms","Cookies"].map((item) => (
              <a key={item} href="#" style={{ fontFamily: FF, fontSize: "0.75rem", color: "rgba(255,255,255,0.28)", textDecoration: "none", transition: "color 0.18s ease" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)" }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.28)" }}
              >{item}</a>
            ))}
          </div>
        </div>

        {/* Large MGX wordmark */}
        <div style={{ textAlign: "center", overflow: "hidden", lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>
          <span style={{
            fontFamily: FF,
            fontSize: isMobile ? "clamp(5rem,28vw,10rem)" : "clamp(8rem,22vw,22rem)",
            fontWeight: 800, letterSpacing: "-0.04em",
            background: "linear-gradient(180deg,rgba(255,255,255,0.10) 0%,rgba(255,255,255,0.03) 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            display: "block", lineHeight: 0.88,
          }}>
            MGX
          </span>
        </div>
      </div>
    </footer>
  )
}
