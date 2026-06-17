"use client"

import { useEffect, useRef, useState } from "react"
import { DitheringShader } from "@/components/ui/dithering-shader"

const FF = "'Google Sans Flex','Google Sans',system-ui,sans-serif"

// ── Typewriter (uses ref to prevent cleanup-kills-interval bug) ──────────────
function TypewriterText({ text }: { text: string }) {
  const ref     = useRef<HTMLParagraphElement>(null)
  const started = useRef(false)
  const [count, setCount] = useState(0)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true) },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true
    let n = 0
    const iv = setInterval(() => {
      n++; setCount(n)
      if (n >= text.length) clearInterval(iv)
    }, 38)
    return () => clearInterval(iv)
  }, [inView, text])

  return (
    <p ref={ref} style={{
      fontFamily: FF,
      fontSize: "clamp(1.7rem, 3vw, 2.6rem)",
      fontWeight: 350, lineHeight: 1.15,
      color: "white", margin: 0,
    }}>
      {text.slice(0, count)}
      {inView && count < text.length && (
        <span style={{
          display: "inline-block", width: "2px", height: "0.85em",
          background: "rgba(255,255,255,0.6)", marginLeft: "3px",
          verticalAlign: "text-bottom", borderRadius: "2px",
          animation: "cursorBlink 0.9s step-end infinite",
        }} />
      )}
    </p>
  )
}

// ── Soft drifting orbs ───────────────────────────────────────────────────────
function DriftOrbs({ cardRef }: { cardRef: React.RefObject<HTMLDivElement | null> }) {
  const orb1 = useRef<HTMLDivElement>(null)
  const orb2 = useRef<HTMLDivElement>(null)
  const orb3 = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: 0.72, y: 0.5 })
  const tgt   = useRef({ x: 0.72, y: 0.5 })

  useEffect(() => {
    let raf: number
    let t = 0

    const loop = () => {
      mouse.current.x += (tgt.current.x - mouse.current.x) * 0.04
      mouse.current.y += (tgt.current.y - mouse.current.y) * 0.04

      const mx = mouse.current.x
      const my = mouse.current.y

      // Each orb drifts on its own slow sine path, nudged gently by mouse
      if (orb1.current) {
        const x = 55 + Math.sin(t * 0.28) * 14 + (mx - 0.5) * 8
        const y = 48 + Math.cos(t * 0.22) * 12 + (my - 0.5) * 6
        orb1.current.style.left = `${x}%`
        orb1.current.style.top  = `${y}%`
      }
      if (orb2.current) {
        const x = 72 + Math.cos(t * 0.19) * 16 + (mx - 0.5) * 6
        const y = 38 + Math.sin(t * 0.31) * 10 + (my - 0.5) * 8
        orb2.current.style.left = `${x}%`
        orb2.current.style.top  = `${y}%`
      }
      if (orb3.current) {
        const x = 65 + Math.sin(t * 0.24 + 1.2) * 12 + (mx - 0.5) * 5
        const y = 62 + Math.cos(t * 0.18 + 2.1) * 14 + (my - 0.5) * 5
        orb3.current.style.left = `${x}%`
        orb3.current.style.top  = `${y}%`
      }

      t  += 0.008
      raf = requestAnimationFrame(loop)
    }
    loop()

    const card = cardRef.current
    const onMove  = (e: MouseEvent) => {
      const rect = card!.getBoundingClientRect()
      tgt.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top)  / rect.height,
      }
    }
    const onLeave = () => { tgt.current = { x: 0.72, y: 0.5 } }

    card?.addEventListener("mousemove",  onMove,  { passive: true })
    card?.addEventListener("mouseleave", onLeave, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      card?.removeEventListener("mousemove",  onMove)
      card?.removeEventListener("mouseleave", onLeave)
    }
  }, [cardRef])

  const orbBase: React.CSSProperties = {
    position: "absolute",
    borderRadius: "50%",
    transform: "translate(-50%, -50%)",
    pointerEvents: "none",
    willChange: "left, top",
  }

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {/* Primary — muted MGX blue */}
      <div ref={orb1} style={{
        ...orbBase,
        width: "340px", height: "340px",
        background: "radial-gradient(circle, rgba(26,115,232,0.18) 0%, transparent 72%)",
        filter: "blur(48px)",
      }} />
      {/* Secondary — deep indigo */}
      <div ref={orb2} style={{
        ...orbBase,
        width: "260px", height: "260px",
        background: "radial-gradient(circle, rgba(90,60,200,0.14) 0%, transparent 70%)",
        filter: "blur(40px)",
      }} />
      {/* Accent — very faint warm highlight */}
      <div ref={orb3} style={{
        ...orbBase,
        width: "180px", height: "180px",
        background: "radial-gradient(circle, rgba(60,140,255,0.10) 0%, transparent 70%)",
        filter: "blur(32px)",
      }} />
    </div>
  )
}

// ── Section ──────────────────────────────────────────────────────────────────
export default function BeforeYouGo() {
  const cardRef = useRef<HTMLDivElement>(null)

  return (
    <section
      id="beforeyougo"
      style={{ fontFamily: FF, padding: "3rem", borderTop: "1px solid rgba(33,34,38,0.06)" }}
    >
      <div
        ref={cardRef}
        style={{
          background: "#000",
          borderRadius: "2em",
          minHeight: "min(70vh, 540px)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Left: content */}
        <div style={{
          padding: "clamp(2.5rem, 5vw, 5rem)",
          display: "grid",
          alignContent: "center",
          gap: "1.5rem",
          position: "relative",
          zIndex: 1,
        }}>
          <TypewriterText text="Ready to transform your organization with MGX?" />

          <p style={{
            color: "rgba(255,255,255,0.42)",
            fontWeight: 300, lineHeight: 1.6,
            fontSize: "1.05em", margin: 0,
          }}>
            Talk to our team about your technology challenges. We build systems
            that last — at enterprise scale, with government trust.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.25rem" }}>
            <button style={{
              fontFamily: FF, fontSize: "0.95em", fontWeight: 500,
              padding: "0.72em 1.8em", borderRadius: "999px",
              background: "white", color: "#000",
              border: "none", cursor: "pointer",
              transition: "background 0.15s ease",
            }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#e8e8e8" }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "white" }}
            >
              Talk to MGX
            </button>
            <button style={{
              fontFamily: FF, fontSize: "0.95em", fontWeight: 400,
              padding: "0.72em 1.8em", borderRadius: "999px",
              background: "rgba(255,255,255,0.07)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.12)",
              cursor: "pointer",
              transition: "background 0.15s ease",
            }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.13)" }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)" }}
            >
              Explore our products
            </button>
          </div>
        </div>

        {/* Right: WebGL2 dithering sphere */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}>
          <DitheringShader
            shape="sphere"
            type="random"
            colorBack="#000000"
            colorFront="#1a73e8"
            pxSize={2}
            speed={1.2}
            width={480}
            height={480}
            containerRef={cardRef}
          />
        </div>
      </div>
    </section>
  )
}
