"use client"

import { useEffect, useRef, useState } from "react"

const FF = "'Google Sans Flex','Google Sans',system-ui,sans-serif"

function PlayIcon() {
  return (
    <svg width="11" height="13" viewBox="0 0 11 13" fill="currentColor" aria-hidden>
      <path d="M1 1.4L10 6.5L1 11.6V1.4Z" />
    </svg>
  )
}

function MuteIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden>
      <path d="M1 4.5h2.5L7 2v10L3.5 9.5H1V4.5Z"/>
      <path d="M10 4.5c1.1 0.8 1.8 2 1.8 2.5s-0.7 1.7-1.8 2.5"/>
    </svg>
  )
}

export default function VideoSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef   = useRef<HTMLVideoElement>(null)
  const [progress,     setProgress]     = useState(0)
  const [hasSound,     setHasSound]     = useState(false)
  const [labelVisible, setLabelVisible] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const onScroll = () => {
      const rect       = section.getBoundingClientRect()
      const scrollable = section.offsetHeight - window.innerHeight
      const scrolled   = -rect.top
      setProgress(Math.max(0, Math.min(1, scrolled / scrollable)))
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handlePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (!hasSound) {
      v.muted = false
      v.play()
      setHasSound(true)
    } else {
      v.muted = true
      setHasSound(false)
    }
  }

  // ease-out curve so fast start, slow end
  const eased     = 1 - Math.pow(1 - progress, 2)
  const widthVw   = 68 + eased * 26        // 68vw → 94vw
  const radius    = 28 - eased * 14        // 28px → 14px  (always stays rounded)
  const translateY = (1 - eased) * 32      // starts 32px low, rises to center

  return (
    <div
      ref={sectionRef}
      id="showcase"
      style={{ height: "240vh", fontFamily: FF }}
    >
      <div style={{
        position: "sticky", top: 0,
        height: "100vh",
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
      }}>
        <div
          style={{
            position: "relative",
            width: `${widthVw}vw`,
            aspectRatio: "16 / 9",
            maxHeight: "88vh",
            borderRadius: `${radius}px`,
            overflow: "hidden",
            transform: `translateY(${translateY}px)`,
            boxShadow: `0 ${8 + (1 - eased) * 32}px ${48 + (1 - eased) * 48}px rgba(0,0,0,${0.08 + (1 - eased) * 0.12})`,
          }}
        >
          <video
            ref={videoRef}
            src="/innovate.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />

          {/* Bottom gradient for legibility */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.28) 0%, transparent 45%)",
            pointerEvents: "none",
          }} />

          {/* ── Play / mute button ── */}
          <button
            onClick={handlePlay}
            onMouseEnter={() => setLabelVisible(true)}
            onMouseLeave={() => setLabelVisible(false)}
            aria-label={hasSound ? "Mute" : "Play with sound"}
            style={{
              position: "absolute", bottom: "20px", right: "20px",
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: labelVisible ? "10px 16px" : "10px 14px",
              background: "rgba(18,19,23,0.52)",
              backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.18)",
              borderRadius: "100px",
              cursor: "pointer",
              color: "white",
              fontSize: "13px", fontWeight: 500,
              fontFamily: FF,
              letterSpacing: "0px",
              transition: "background 0.18s ease, padding 0.25s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            {hasSound ? <MuteIcon /> : <PlayIcon />}

            <span style={{
              display: "inline-block",
              maxWidth: labelVisible ? "60px" : "0px",
              opacity:  labelVisible ? 1 : 0,
              overflow: "hidden",
              whiteSpace: "nowrap",
              transition: "max-width 0.28s cubic-bezier(0.4,0,0.2,1), opacity 0.2s ease",
            }}>
              {hasSound ? "Mute" : "Play"}
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
