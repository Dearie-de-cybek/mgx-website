"use client"

import { useEffect, useRef, useState } from "react"
import { DitheringShader } from "@/components/ui/dithering-shader"
import { useIsMobile } from "@/hooks/useIsMobile"

const FF = "'Google Sans Flex','Google Sans',system-ui,sans-serif"

function TypewriterText({ text }: { text: string }) {
  const ref     = useRef<HTMLParagraphElement>(null)
  const [count, setCount] = useState(0)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!inView) return
    let n = 0
    const iv = setInterval(() => { n++; setCount(n); if (n >= text.length) clearInterval(iv) }, 38)
    return () => clearInterval(iv)
  }, [inView, text])

  return (
    <p ref={ref} style={{
      fontFamily: FF,
      fontSize: "clamp(1.5rem,4vw,2.6rem)",
      fontWeight: 350, lineHeight: 1.15,
      color: "white", margin: 0,
    }}>
      {text.slice(0, count)}
      {inView && count < text.length && (
        <span style={{
          display: "inline-block", width: 2, height: "0.85em",
          background: "rgba(255,255,255,0.6)", marginLeft: 3,
          verticalAlign: "text-bottom", borderRadius: 2,
          animation: "cursorBlink 0.9s step-end infinite",
        }} />
      )}
    </p>
  )
}

export default function BeforeYouGo() {
  const cardRef  = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  return (
    <section id="beforeyougo" style={{ fontFamily: FF, background: "#000", padding: isMobile ? "1.5rem" : "3rem", borderTop: "1px solid rgba(33,34,38,0.06)" }}>
      <div ref={cardRef} style={{
        background: "#000",
        borderRadius: isMobile ? "1.25em" : "2em",
        minHeight: isMobile ? "auto" : "min(70vh,540px)",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        overflow: "hidden",
        position: "relative",
      }}>
        {/* Left: content */}
        <div style={{
          padding: isMobile ? "2rem 1.5rem" : "clamp(2.5rem,5vw,5rem)",
          display: "grid", alignContent: "center", gap: "1.25rem",
          position: "relative", zIndex: 1,
        }}>
          <TypewriterText text="Ready to transform your organization with MGX?" />

          <p style={{ color: "rgba(255,255,255,0.75)", fontWeight: 300, lineHeight: 1.6, fontSize: isMobile ? "1rem" : "1.05em", margin: 0 }}>
            Talk to our team about your technology challenges. We build systems
            that last — at enterprise scale, with government trust.
          </p>

          <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.25rem" }}>
            <button style={{
              fontFamily: FF, fontSize: isMobile ? "0.88rem" : "0.95em", fontWeight: 500,
              padding: isMobile ? "0.75em 0" : "0.72em 1.8em",
              borderRadius: "999px", background: "white", color: "#000",
              border: "none", cursor: "pointer",
              width: isMobile ? "100%" : "auto",
            }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#e8e8e8" }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "white" }}
            >
              Talk to MGX
            </button>
            <button style={{
              fontFamily: FF, fontSize: isMobile ? "0.88rem" : "0.95em", fontWeight: 400,
              padding: isMobile ? "0.75em 0" : "0.72em 1.8em",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.07)",
              color: "white", border: "1px solid rgba(255,255,255,0.12)",
              cursor: "pointer",
              width: isMobile ? "100%" : "auto",
            }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.13)" }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)" }}
            >
              Explore our products
            </button>
          </div>
        </div>

        {/* Right: sphere */}
        {!isMobile && (
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative", background: "#000", overflow: "hidden",
          }}>
            <DitheringShader
              shape="sphere" type="random"
              colorBack="#000000" colorFront="#1a73e8"
              pxSize={2} speed={1.2}
              width={480} height={480}
              containerRef={cardRef}
            />
          </div>
        )}
      </div>
    </section>
  )
}
