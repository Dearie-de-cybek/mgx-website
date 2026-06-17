"use client"

import { useEffect, useRef, useState } from "react"
import { WebGLShader } from "@/components/ui/web-gl-shader"

const FF = "'Google Sans Flex','Google Sans',system-ui,sans-serif"
const NAV_ITEMS = ["Products", "Solutions", "Research", "MGX Campus", "Company"]
const FULL_TEXT = "Building the Future Through\nTechnology and Innovation"
const NL_IDX = FULL_TEXT.indexOf("\n")

// ─── Icons ──────────────────────────────────────────────────────────────────

function ArrowIcon({ size = 15, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 15 15" fill="none" aria-hidden>
      <path d="M2.5 7.5h10m0 0L9 3.5m3.5 4-3.5 4"
        stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function GridIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <rect x="0.7" y="0.7" width="5.1" height="5.1" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <rect x="8.2" y="0.7" width="5.1" height="5.1" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <rect x="0.7" y="8.2" width="5.1" height="5.1" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <rect x="8.2" y="8.2" width="5.1" height="5.1" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  )
}

function LogoMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden>
      <rect width="8" height="8" rx="2.2" fill="white" />
      <rect x="10" width="8" height="8" rx="2.2" fill="white" fillOpacity="0.3" />
      <rect y="10" width="8" height="8" rx="2.2" fill="white" fillOpacity="0.3" />
      <rect x="10" y="10" width="8" height="8" rx="2.2" fill="white" />
    </svg>
  )
}

// ─── Main Component ─────────────────────────────────────────────────────────

export default function Hero() {
  const [typedCount,     setTypedCount]     = useState(0)
  const [eyebrowVisible, setEyebrowVisible] = useState(false)
  const [showBody,       setShowBody]       = useState(false)
  const [showButtons,    setShowButtons]    = useState(false)

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })

  // ── Typing animation ──
  useEffect(() => {
    const t1 = setTimeout(() => setEyebrowVisible(true), 180)
    let count = 0, iv: ReturnType<typeof setInterval>
    const t2 = setTimeout(() => {
      iv = setInterval(() => {
        count++
        setTypedCount(count)
        if (count >= FULL_TEXT.length) {
          clearInterval(iv)
          setTimeout(() => setShowBody(true),    400)
          setTimeout(() => setShowButtons(true), 700)
        }
      }, 36)
    }, 520)
    return () => { clearTimeout(t1); clearTimeout(t2); clearInterval(iv) }
  }, [])

  const rawTyped  = FULL_TEXT.slice(0, typedCount)
  const line1     = rawTyped.slice(0, NL_IDX)
  const line2     = rawTyped.length > NL_IDX ? rawTyped.slice(NL_IDX + 1) : ""
  const showCursor = typedCount < FULL_TEXT.length

  return (
    <section
      id="welcome"
      className="relative min-h-screen overflow-hidden"
      style={{ fontFamily: FF, background: "#000" }}
    >
      {/* ── WebGL wave shader background ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <WebGLShader />
        {/* Dark vignette so text reads cleanly */}
        <div style={{
          position: "absolute", inset: 0,
          background: [
            "radial-gradient(ellipse 90% 55% at 50% 0%,   rgba(0,0,0,0.55) 0%, transparent 100%)",
            "radial-gradient(ellipse 60% 65% at 50% 100%, rgba(0,0,0,0.65) 0%, transparent 100%)",
            "radial-gradient(ellipse 40% 80% at 0%   50%,  rgba(0,0,0,0.3)  0%, transparent 100%)",
            "radial-gradient(ellipse 40% 80% at 100% 50%,  rgba(0,0,0,0.3)  0%, transparent 100%)",
          ].join(","),
        }} />
      </div>

      {/* ══ NAV ═══════════════════════════════════════════════════════════════ */}
      <nav className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-20 h-[68px]">
        <div className="flex items-center gap-7">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="cursor-pointer"
            style={{ fontSize: "22px", letterSpacing: "-0.8px", lineHeight: 1 }}
          >
            <span style={{
              fontWeight: 900,
              background: "linear-gradient(135deg, #1a73e8 0%, #e91e8c 50%, #ff6d2a 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>M</span>
            <span style={{ fontWeight: 650, color: "white" }}>GX</span>
          </button>

          <ul className="flex items-center gap-0.5 list-none m-0 p-0">
            {NAV_ITEMS.map((item) => (
              <li key={item}>
                <button
                  onClick={() => scrollTo(item.toLowerCase().replace(/\s+/g, "-"))}
                  className="px-3 py-1.5 rounded-lg cursor-pointer transition-colors duration-150"
                  style={{ fontSize: "14px", fontWeight: 450, color: "rgba(255,255,255,0.6)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "white")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)")}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => scrollTo("contact")}
            className="px-4 py-2 rounded-xl cursor-pointer transition-colors duration-150"
            style={{ fontSize: "14px", fontWeight: 450, color: "rgba(255,255,255,0.6)" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "white")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)")}
          >
            Contact Us
          </button>
          <button
            onClick={() => scrollTo("services")}
            className="flex items-center gap-2 cursor-pointer transition-all duration-200 hover:-translate-y-px"
            style={{
              padding: "8px 18px",
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.18)",
              boxShadow: "0 1px 2px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.14)",
              color: "white", fontSize: "14px", fontWeight: 500, borderRadius: "100px",
            }}
          >
            <ArrowIcon size={13} color="white" />
            Get Started
          </button>
        </div>
      </nav>

      {/* ══ HERO CONTENT ════════════════════════════════════════════════════ */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-8 pt-[68px]">
        <div className="max-w-[1400px] w-full mx-auto">

          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2 mb-10"
            style={{
              fontSize: "16px", fontWeight: 600, letterSpacing: "0.5px",
              opacity: eyebrowVisible ? 1 : 0,
              transition: "opacity 0.6s ease",
              background: "linear-gradient(135deg, #60a5fa 0%, #e879f9 60%, #fb923c 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}
          >
            <LogoMark />
            MGX
          </div>

          {/* Typed headline */}
          <h1
            className="mb-9 mx-auto"
            style={{
              fontFamily: FF,
              fontSize: "107px", fontWeight: 450, lineHeight: "107px",
              letterSpacing: "-3.5px", color: "white",
              maxWidth: "1350px", minHeight: "214px",
            }}
          >
            {line1}
            {rawTyped.length > NL_IDX && <br />}
            {line2}
            {showCursor && (
              <span aria-hidden style={{
                display: "inline-block", width: "3px", height: "0.85em",
                background: "#60a5fa", marginLeft: "4px",
                verticalAlign: "text-bottom", borderRadius: "2px",
                animation: "cursorBlink 0.9s step-end infinite",
              }} />
            )}
          </h1>

          {/* Body text */}
          <p className="mx-auto mb-12" style={{
            fontSize: "17.5px", fontWeight: 400, lineHeight: "1.72",
            color: "rgba(255,255,255,0.65)",
            maxWidth: "560px",
            opacity: showBody ? 1 : 0,
            transform: showBody ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.55s ease, transform 0.55s ease",
          }}>
            MGX creates intelligent digital solutions, research‑driven products,
            and technology platforms that help organizations transform, scale,
            and solve complex challenges.
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center justify-center gap-3 flex-wrap" style={{
            opacity: showButtons ? 1 : 0,
            transform: showButtons ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}>
            {/* Primary glass */}
            <button
              onClick={() => scrollTo("services")}
              className="flex items-center gap-2.5 cursor-pointer transition-all duration-200 hover:-translate-y-[2px]"
              style={{
                padding: "14px 26px",
                background: "rgba(255,255,255,0.14)",
                backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.22)",
                boxShadow: "0 1px 3px rgba(0,0,0,0.24), 0 6px 24px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.16)",
                color: "white", fontSize: "15px", fontWeight: 500, borderRadius: "100px",
              }}
            >
              <ArrowIcon size={15} color="white" />
              Explore Our Solutions
            </button>

            {/* Secondary outline glass */}
            <button
              onClick={() => scrollTo("products")}
              className="flex items-center gap-2.5 cursor-pointer transition-all duration-200 hover:-translate-y-[2px]"
              style={{
                padding: "14px 26px",
                background: "transparent",
                backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.18)",
                color: "rgba(255,255,255,0.85)", fontSize: "15px", fontWeight: 450, borderRadius: "100px",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)" }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent" }}
            >
              <GridIcon />
              View Our Products
            </button>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }} />

      {/* Scroll cue */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5"
        style={{
          animation: "cueBounce 2.4s ease-in-out infinite",
          opacity: showButtons ? 1 : 0, transition: "opacity 0.5s ease 0.3s",
        }}
        aria-hidden
      >
        <div className="w-px h-9" style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.25))" }} />
        <div className="w-[7px] h-[7px] rotate-45" style={{
          borderRight: "1px solid rgba(255,255,255,0.3)",
          borderBottom: "1px solid rgba(255,255,255,0.3)",
        }} />
      </div>
    </section>
  )
}
