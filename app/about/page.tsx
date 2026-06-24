"use client"

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react"
import { useIsMobile } from "@/hooks/useIsMobile"
import Footer from "@/components/Footer"

const FF = "'Google Sans Flex','Google Sans',system-ui,sans-serif"

const NAV_ITEMS = ["Products", "Solutions", "Research", "MGX Campus", "Company"]

const NAV_DROPDOWNS: Record<string, { desc: string; items: { name: string; sub: string; icon?: string }[] }> = {
  Products: {
    desc: "Five purpose-built software platforms for enterprise and government.",
    items: [
      { name: "H360",       sub: "Intelligent Operations Hub" },
      { name: "GOVDIGI",    sub: "Government Digital Services" },
      { name: "TRUSTPORT",  sub: "Digital Identity & Trust" },
      { name: "E-TRACK",    sub: "Asset & Fleet Tracking" },
      { name: "NEARFENCE",  sub: "Geofencing Intelligence" },
    ],
  },
  Solutions: {
    desc: "End-to-end technology solutions tailored to your sector.",
    items: [
      { name: "Enterprise",   sub: "Digital transformation at scale" },
      { name: "Government",   sub: "Public sector modernization" },
      { name: "Healthcare",   sub: "Health technology platforms" },
      { name: "Smart Cities", sub: "Urban intelligence systems" },
    ],
  },
  Research: {
    desc: "Innovation-driven research powering tomorrow's solutions.",
    items: [
      { name: "Innovation Lab",   sub: "R&D and rapid prototyping" },
      { name: "Publications",     sub: "White papers & reports" },
      { name: "R&D Partnerships", sub: "Academic and industry" },
    ],
  },
  "MGX Campus": {
    desc: "Building Africa's next generation of digital leaders.",
    items: [
      { name: "Training Programs", sub: "Professional development", icon: "school" },
      { name: "Bootcamps",         sub: "Intensive skill-building", icon: "fitness_center" },
      { name: "Certifications",    sub: "Industry credentials",     icon: "verified" },
      { name: "Innovation Hub",    sub: "Incubation & mentorship",  icon: "hub" },
    ],
  },
  Company: {
    desc: "Learn about our story, team, and mission.",
    items: [
      { name: "About MGX",    sub: "Our story and vision",  icon: "info" },
      { name: "Team",         sub: "The people behind MGX", icon: "group" },
      { name: "Careers",      sub: "Join our growing team", icon: "work" },
      { name: "News & Press", sub: "Latest announcements",  icon: "newspaper" },
    ],
  },
}

function ArrowIcon({ size = 13, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 15 15" fill="none" aria-hidden>
      <path d="M2.5 7.5h10m0 0L9 3.5m3.5 4-3.5 4"
        stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function MenuButton({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={open ? "Close menu" : "Open menu"}
      style={{
        width: 44, height: 44, borderRadius: "50%",
        background: "rgba(255,255,255,0.12)",
        border: "1px solid rgba(255,255,255,0.2)",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", flexShrink: 0, position: "relative",
        transition: "background 0.2s ease",
      }}
    >
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: "5px",
        opacity: open ? 0 : 1,
        transform: open ? "rotate(-90deg) scale(0.7)" : "none",
        transition: "opacity 0.22s ease, transform 0.22s ease",
      }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{ width: 18, height: 1.6, background: "white", borderRadius: 1 }} />
        ))}
      </div>
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        opacity: open ? 1 : 0,
        transform: open ? "none" : "rotate(90deg) scale(0.7)",
        transition: "opacity 0.22s ease, transform 0.22s ease",
      }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path d="M3 3L13 13M13 3L3 13" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </div>
    </button>
  )
}

/* ─────────────────────────────────────────
   Utilities
───────────────────────────────────────── */

function useInView(ref: { current: Element | null }, threshold = 0.15) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect() }
    }, { threshold })
    obs.observe(el); return () => obs.disconnect()
  }, [ref, threshold])
  return inView
}

function FadeUp({ children, delay = 0, style }: {
  children: ReactNode; delay?: number; style?: CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, 0.1)
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
      willChange: "opacity, transform", ...style,
    }}>
      {children}
    </div>
  )
}

/* ─────────────────────────────────────────
   Nav — matches Hero.tsx exactly
───────────────────────────────────────── */

function AboutNav({ isMobile }: { isMobile: boolean }) {
  const [scrolled,     setScrolled]     = useState(false)
  const [menuOpen,     setMenuOpen]     = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", h, { passive: true })
    return () => window.removeEventListener("scroll", h)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  useEffect(() => { if (!isMobile) setMenuOpen(false) }, [isMobile])

  const openDD  = (item: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    if (NAV_DROPDOWNS[item]) setOpenDropdown(item)
  }
  const closeDD = () => {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 90)
  }

  return (
    <>
      <style>{`
        @keyframes ddFadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Fixed nav bar */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: isMobile ? "0 1.25rem" : "0 5rem",
        height: 68,
        background: scrolled ? "rgba(8,10,16,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(28px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(28px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
        transition: "background 0.32s ease, border-color 0.32s ease",
        fontFamily: FF,
      }}>
        {/* Logo */}
        <a
          href="/"
          style={{ fontSize: 22, letterSpacing: "-0.8px", lineHeight: 1, textDecoration: "none" }}
        >
          <span style={{
            fontWeight: 900,
            background: "linear-gradient(135deg,#1a73e8 0%,#e91e8c 50%,#ff6d2a 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>M</span>
          <span style={{ fontWeight: 650, color: "white" }}>GX</span>
        </a>

        {/* Desktop nav items */}
        {!isMobile && (
          <ul style={{ display: "flex", alignItems: "center", gap: 2, listStyle: "none", margin: 0, padding: 0 }}>
            {NAV_ITEMS.map((item) => (
              <li key={item} onMouseEnter={() => openDD(item)} onMouseLeave={closeDD}>
                <a
                  href={item === "Company" ? "/about" : `/#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "0.3rem",
                    padding: "6px 12px", borderRadius: 8,
                    fontSize: 14, fontWeight: 450,
                    color: openDropdown === item ? "white" : "rgba(255,255,255,0.88)",
                    textDecoration: "none",
                    transition: "color 0.15s ease",
                  }}
                >
                  {item}
                  {NAV_DROPDOWNS[item] && (
                    <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden
                      style={{
                        opacity: 0.5,
                        transition: "transform 0.2s ease",
                        transform: openDropdown === item ? "rotate(180deg)" : "none",
                      }}
                    >
                      <path d="M1.5 3L4.5 6.5L7.5 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </a>
              </li>
            ))}
          </ul>
        )}

        {/* Desktop right */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <a
              href="/#contact"
              style={{
                padding: "8px 16px", borderRadius: 12,
                fontSize: 14, fontWeight: 450,
                color: "rgba(255,255,255,0.88)", textDecoration: "none",
                transition: "color 0.15s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "white" }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.88)" }}
            >
              Contact Us
            </a>
            <a
              href="/#services"
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "8px 18px", borderRadius: "100px",
                background: "white", color: "#0a0a0a",
                fontSize: 14, fontWeight: 600, textDecoration: "none",
                boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
                transition: "opacity 0.18s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.88" }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1" }}
            >
              <ArrowIcon size={13} color="#0a0a0a" /> Get Started
            </a>
          </div>
        )}

        {/* Mobile hamburger */}
        {isMobile && <MenuButton open={menuOpen} onClick={() => setMenuOpen(o => !o)} />}

        {/* Dropdown panel */}
        {!isMobile && openDropdown && NAV_DROPDOWNS[openDropdown] && (
          <div
            onMouseEnter={() => { if (closeTimer.current) clearTimeout(closeTimer.current) }}
            onMouseLeave={closeDD}
            style={{
              position: "absolute", top: "100%", left: 0, right: 0,
              paddingTop: "0.5rem",
              display: "flex", justifyContent: "center",
              zIndex: 200, pointerEvents: "auto",
            }}
          >
            <div style={{
              background: "rgba(8,10,16,0.97)",
              backdropFilter: "blur(48px)", WebkitBackdropFilter: "blur(48px)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 20,
              padding: "2rem 2.25rem",
              maxWidth: 700, width: "calc(100% - 10rem)",
              boxShadow: "0 28px 90px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
              display: "grid", gridTemplateColumns: "1fr 1.7fr", gap: "2.25rem",
              animation: "ddFadeIn 0.18s ease forwards",
            }}>
              {/* Left: label + desc */}
              <div style={{
                display: "flex", flexDirection: "column", gap: "0.6rem",
                borderRight: "1px solid rgba(255,255,255,0.08)",
                paddingRight: "2.25rem", justifyContent: "center",
              }}>
                <span style={{
                  fontFamily: FF, fontSize: "0.63rem", fontWeight: 700,
                  letterSpacing: "0.17em", textTransform: "uppercase",
                  color: "rgba(255,255,255,0.28)",
                }}>{openDropdown}</span>
                <p style={{
                  fontFamily: FF, fontSize: "0.92rem", fontWeight: 300,
                  color: "rgba(255,255,255,0.5)", lineHeight: 1.75, margin: 0,
                }}>{NAV_DROPDOWNS[openDropdown].desc}</p>
              </div>

              {/* Right: items */}
              {NAV_DROPDOWNS[openDropdown].items.some(i => i.icon) ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                  {NAV_DROPDOWNS[openDropdown].items.map((link) => (
                    <button key={link.name} style={{
                      display: "flex", alignItems: "center", gap: "0.85rem",
                      textAlign: "left", padding: "0.7rem 0.9rem",
                      borderRadius: 12, cursor: "pointer",
                      background: "transparent",
                      border: "1px solid rgba(255,255,255,0.1)",
                      transition: "background 0.14s ease, border-color 0.14s ease",
                    }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement
                        el.style.background = "rgba(255,255,255,0.07)"
                        el.style.borderColor = "rgba(255,255,255,0.2)"
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement
                        el.style.background = "transparent"
                        el.style.borderColor = "rgba(255,255,255,0.1)"
                      }}
                    >
                      {link.icon && (
                        <span className="material-symbols-outlined" style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.55)", flexShrink: 0 }}>{link.icon}</span>
                      )}
                      <div>
                        <div style={{ fontFamily: FF, fontSize: "0.875rem", fontWeight: 550, color: "rgba(255,255,255,0.92)", letterSpacing: "-0.01em" }}>{link.name}</div>
                        <div style={{ fontFamily: FF, fontSize: "0.77rem", fontWeight: 350, color: "rgba(255,255,255,0.38)", lineHeight: 1.4 }}>{link.sub}</div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.2rem 0.75rem", alignContent: "start" }}>
                  {NAV_DROPDOWNS[openDropdown].items.map((link) => (
                    <button key={link.name} style={{
                      display: "flex", flexDirection: "column", gap: "0.22rem",
                      textAlign: "left", padding: "0.65rem 0.8rem",
                      borderRadius: 11, cursor: "pointer",
                      background: "transparent", border: "none",
                      transition: "background 0.14s ease",
                    }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)" }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent" }}
                    >
                      <span style={{ fontFamily: FF, fontSize: "0.875rem", fontWeight: 550, color: "rgba(255,255,255,0.92)", letterSpacing: "-0.01em" }}>{link.name}</span>
                      <span style={{ fontFamily: FF, fontSize: "0.77rem", fontWeight: 350, color: "rgba(255,255,255,0.38)", lineHeight: 1.4 }}>{link.sub}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Mobile fullscreen menu */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 50,
        background: "#000",
        display: "flex", flexDirection: "column",
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? "auto" : "none",
        transition: "opacity 0.25s ease",
        fontFamily: FF,
      }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 1.25rem", height: 68, flexShrink: 0,
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}>
          <a href="/" style={{ fontSize: 22, letterSpacing: "-0.8px", lineHeight: 1, textDecoration: "none" }}>
            <span style={{
              fontWeight: 900,
              background: "linear-gradient(135deg,#1a73e8 0%,#e91e8c 50%,#ff6d2a 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>M</span>
            <span style={{ fontWeight: 650, color: "white" }}>GX</span>
          </a>
          <MenuButton open={menuOpen} onClick={() => setMenuOpen(false)} />
        </div>

        <nav style={{ flex: 1, padding: "0.5rem 1.25rem", overflowY: "auto" }}>
          {NAV_ITEMS.map((item) => (
            <div key={item} style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              <a
                href={item === "Company" ? "/about" : `/#${item.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "block", width: "100%", textAlign: "left",
                  padding: "1.1rem 0",
                  fontSize: "1.45rem", fontWeight: 350,
                  color: "rgba(255,255,255,0.88)",
                  textDecoration: "none", letterSpacing: "-0.01em",
                }}
              >
                {item}
              </a>
            </div>
          ))}
        </nav>

        <div style={{ padding: "1.5rem 1.25rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          <a href="/#services" onClick={() => setMenuOpen(false)} style={{
            display: "block", padding: "14px 0", borderRadius: "100px",
            background: "white", color: "#000",
            fontSize: "0.95rem", fontWeight: 600, textAlign: "center",
            textDecoration: "none", width: "100%",
          }}>Get Started</a>
          <a href="/#contact" onClick={() => setMenuOpen(false)} style={{
            display: "block", padding: "14px 0", borderRadius: "100px",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "rgba(255,255,255,0.8)",
            fontSize: "0.95rem", fontWeight: 450, textAlign: "center",
            textDecoration: "none", width: "100%",
          }}>Contact Us</a>
        </div>
      </div>
    </>
  )
}

/* ─────────────────────────────────────────
   Hero
───────────────────────────────────────── */

function HeroSection({ isMobile }: { isMobile: boolean }) {
  const [count, setCount] = useState(0)
  const text = "Intelligent Solutions\nfor Real Human Problems"

  useEffect(() => {
    const t = setTimeout(() => {
      let n = 0
      const iv = setInterval(() => {
        n++; setCount(n)
        if (n >= text.length) clearInterval(iv)
      }, 22)
      return () => clearInterval(iv)
    }, 500)
    return () => clearTimeout(t)
  }, [text])

  const nl = text.indexOf("\n")
  const line1 = text.slice(0, Math.min(count, nl))
  const line2 = count > nl ? text.slice(nl + 1, count) : ""

  return (
    <section style={{
      position: "relative", overflow: "hidden",
      background: "#020408",
      minHeight: "100svh",
      display: "flex", flexDirection: "column",
      justifyContent: "center", alignItems: "center",
      textAlign: "center",
      padding: isMobile ? "7rem 1.5rem 4rem" : "8rem 4rem 5rem",
    }}>
      <style>{`
        @keyframes aHeroA {
          0%, 100% { transform: translate(0,0) scale(1); }
          40%       { transform: translate(4%,-6%) scale(1.1); }
          80%       { transform: translate(-3%,4%) scale(0.94); }
        }
        @keyframes aHeroB {
          0%, 100% { transform: translate(0,0) scale(1); }
          50%       { transform: translate(-6%,-3%) scale(1.14); }
        }
        @keyframes aHeroC {
          0%, 100% { transform: translate(0,0) scale(1); }
          50%       { transform: translate(5%, 6%) scale(1.08); }
        }
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes scrollCue {
          0%, 100% { opacity: 0.3; transform: translateY(0); }
          50%       { opacity: 0.7; transform: translateY(6px); }
        }
      `}</style>

      {/* Background aurora glows */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{
          position: "absolute",
          top: "15%", left: "50%", transform: "translateX(-50%)",
          width: isMobile ? "320px" : "700px",
          height: isMobile ? "320px" : "700px",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(26,115,232,0.22) 0%, transparent 62%)",
          filter: "blur(70px)",
          animation: "aHeroA 16s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute",
          top: "30%", left: "20%",
          width: isMobile ? "220px" : "440px",
          height: isMobile ? "220px" : "440px",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(124,58,237,0.15) 0%, transparent 65%)",
          filter: "blur(90px)",
          animation: "aHeroB 20s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute",
          top: "40%", right: "15%",
          width: isMobile ? "180px" : "360px",
          height: isMobile ? "180px" : "360px",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(13,148,136,0.1) 0%, transparent 65%)",
          filter: "blur(80px)",
          animation: "aHeroC 24s ease-in-out infinite",
        }} />
        {/* Fine grid overlay */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: isMobile ? "28px 28px" : "40px 40px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 80%)",
        }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 860 }}>
        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "0.5rem",
          padding: "0.4em 1.1em",
          borderRadius: "999px",
          border: "1px solid rgba(26,115,232,0.32)",
          background: "rgba(26,115,232,0.09)",
          marginBottom: isMobile ? "2rem" : "2.5rem",
        }}>
          <span style={{
            display: "inline-block", width: 6, height: 6, borderRadius: "50%",
            background: "#1a73e8", boxShadow: "0 0 8px rgba(26,115,232,0.9)",
          }} />
          <span style={{
            fontFamily: FF, fontSize: "0.7rem", fontWeight: 700,
            letterSpacing: "0.16em", textTransform: "uppercase",
            color: "rgba(100,165,255,0.9)",
          }}>About MGX Technologies</span>
        </div>

        {/* Typewriter headline */}
        <h1 style={{
          fontFamily: FF,
          fontSize: isMobile ? "clamp(2.4rem,9vw,3.8rem)" : "clamp(3.8rem,6.5vw,7rem)",
          fontWeight: 200, lineHeight: 1.05,
          letterSpacing: "-0.035em",
          color: "white", margin: "0 0 2rem",
        }}>
          {line1}
          {line2 && <><br />{line2}</>}
          {count < text.length && (
            <span style={{ animation: "cursorBlink 0.9s step-end infinite", color: "rgba(255,255,255,0.4)" }}>|</span>
          )}
        </h1>

        {/* Sub */}
        <p style={{
          fontFamily: FF,
          fontSize: isMobile ? "1rem" : "1.15rem",
          fontWeight: 300, lineHeight: 1.72,
          color: "rgba(255,255,255,0.5)",
          maxWidth: 640, margin: "0 auto 3.5rem",
        }}>
          A global technology, research, and innovation company committed to solving real human problems through intelligent systems, emerging technologies, and entrepreneurial thinking.
        </p>

        {/* Scroll cue */}
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6rem",
          animation: "scrollCue 2.4s ease-in-out infinite",
        }}>
          <span style={{
            fontFamily: FF, fontSize: "0.68rem", fontWeight: 500,
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.28)",
          }}>Scroll</span>
          <div style={{
            width: 1, height: 36,
            background: "linear-gradient(to bottom, rgba(255,255,255,0.28), transparent)",
          }} />
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   3 Pillars
───────────────────────────────────────── */

const PILLARS = [
  {
    label: "Our Purpose",
    icon: "center_focus_strong",
    headline: "To solve real human problems",
    body: "Through intelligent technologies that create sustainable impact for individuals, communities, and nations.",
    accent: "#1a73e8", accentText: "rgba(26,115,232,0.9)",
    border: "rgba(26,115,232,0.18)", aura: "rgba(26,115,232,0.1)",
    animKey: "aPA",
  },
  {
    label: "Our Vision",
    icon: "visibility",
    headline: "A globally trusted technology company",
    body: "Shaping the future by building intelligent, secure, and transformative solutions for all of humanity.",
    accent: "#7c3aed", accentText: "rgba(124,58,237,0.9)",
    border: "rgba(124,58,237,0.18)", aura: "rgba(124,58,237,0.1)",
    animKey: "aPB",
  },
  {
    label: "Our Mission",
    icon: "rocket_launch",
    headline: "Research, design, deploy",
    body: "Technologies that empower societies, accelerate digital transformation, and create opportunities for future generations.",
    accent: "#0d9488", accentText: "rgba(13,148,136,0.9)",
    border: "rgba(13,148,136,0.18)", aura: "rgba(13,148,136,0.1)",
    animKey: "aPC",
  },
]

function PillarsSection({ isMobile }: { isMobile: boolean }) {
  return (
    <section style={{
      fontFamily: FF,
      background: "#fff",
      padding: isMobile ? "4rem 1.25rem" : "7rem 4rem",
      borderTop: "1px solid rgba(33,34,38,0.04)",
    }}>
      <style>{`
        @keyframes aPA { from { transform: translate(0,0) scale(1); } to { transform: translate(12%,18%) scale(1.15); } }
        @keyframes aPB { from { transform: translate(0,0) scale(1); } to { transform: translate(-10%,14%) scale(1.1); } }
        @keyframes aPC { from { transform: translate(0,0) scale(1); } to { transform: translate(8%,-12%) scale(1.08); } }
      `}</style>

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeUp>
          <p style={{
            fontSize: "0.72rem", fontWeight: 700,
            letterSpacing: "0.16em", textTransform: "uppercase",
            color: "rgba(18,19,23,0.32)", margin: "0 0 3.5rem",
          }}>What drives us</p>
        </FadeUp>

        <div style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? "1.5rem" : "2rem",
        }}>
          {PILLARS.map((p, i) => (
            <FadeUp key={p.label} delay={i * 0.12} style={{ flex: "1 1 0" }}>
              <div style={{
                position: "relative", overflow: "hidden",
                borderRadius: isMobile ? "1.25rem" : "1.75rem",
                border: `1px solid ${p.border}`,
                background: "#fff",
                minHeight: isMobile ? 360 : 500,
                display: "flex", flexDirection: "column",
                justifyContent: "space-between",
                padding: isMobile ? "2.5rem 1.75rem" : "3rem 2.5rem",
                boxShadow: `0 2px 40px ${p.aura}`,
                boxSizing: "border-box",
              }}>
                {/* Aurora */}
                <div aria-hidden style={{
                  position: "absolute",
                  width: "90%", height: "70%",
                  top: "-15%", left: "-15%",
                  background: `radial-gradient(ellipse, ${p.aura} 0%, transparent 65%)`,
                  filter: "blur(60px)",
                  animation: `${p.animKey} ${10 + i * 2}s ease-in-out infinite alternate`,
                  pointerEvents: "none",
                }} />

                {/* Top */}
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{
                    width: 46, height: 46, borderRadius: "13px",
                    background: `${p.aura}`,
                    border: `1px solid ${p.border}`,
                    display: "grid", placeContent: "center",
                    marginBottom: "1.75rem",
                  }}>
                    <span className="material-symbols-outlined" style={{ fontSize: "1.25rem", color: p.accent }}>{p.icon}</span>
                  </div>

                  <p style={{
                    fontSize: "0.7rem", fontWeight: 700,
                    letterSpacing: "0.14em", textTransform: "uppercase",
                    color: p.accentText, margin: "0 0 1rem",
                  }}>{p.label}</p>

                  <h3 style={{
                    fontFamily: FF,
                    fontSize: isMobile ? "clamp(1.5rem,5vw,2rem)" : "clamp(1.6rem,2.4vw,2.4rem)",
                    fontWeight: 350, lineHeight: 1.1,
                    color: "#121317", margin: 0, letterSpacing: "-0.025em",
                  }}>{p.headline}</h3>
                </div>

                {/* Bottom */}
                <div style={{ position: "relative", zIndex: 1 }}>
                  <p style={{
                    color: "#5f6368", fontWeight: 350,
                    lineHeight: 1.72, fontSize: "1rem", margin: 0,
                  }}>{p.body}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   Story
───────────────────────────────────────── */

function StorySection({ isMobile }: { isMobile: boolean }) {
  return (
    <section style={{
      fontFamily: FF,
      background: "#f7f8fa",
      padding: isMobile ? "4.5rem 1.25rem" : "9rem 4rem",
      borderTop: "1px solid rgba(33,34,38,0.06)",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeUp>
          <p style={{
            fontSize: "0.72rem", fontWeight: 700,
            letterSpacing: "0.16em", textTransform: "uppercase",
            color: "rgba(18,19,23,0.32)", margin: "0 0 4rem",
          }}>Who we are</p>
        </FadeUp>

        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? "2.5rem" : "7rem",
          alignItems: "start",
        }}>
          {/* Sticky pull quote */}
          <FadeUp>
            <h2 style={{
              fontFamily: FF,
              fontSize: isMobile ? "clamp(2rem,7vw,3rem)" : "clamp(2.2rem,3.6vw,4rem)",
              fontWeight: 250, lineHeight: 1.1,
              color: "#121317", margin: 0, letterSpacing: "-0.03em",
              position: isMobile ? "static" : "sticky",
              top: "5rem",
            }}>
              We exist at the intersection of innovation, science, and human progress.
            </h2>
          </FadeUp>

          {/* Prose */}
          <FadeUp delay={0.15}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
              {[
                "In a world experiencing rapid technological change, we believe technology should serve humanity—not the other way around. Our purpose is to bridge the gap between complex challenges and intelligent solutions that empower people, strengthen institutions, and accelerate sustainable development.",
                "We research, design, build, and deploy secure, scalable, and human-centered technologies that enable governments, businesses, industries, and communities to thrive in an increasingly connected and digital world.",
                "From artificial intelligence and robotics to cybersecurity, smart systems, and digital transformation, we create solutions that help societies become more efficient, resilient, and future-ready.",
                "At MGX, we see technology not merely as a tool, but as an enabler of progress. Whether modernizing public services, strengthening critical infrastructure, empowering entrepreneurs, or building intelligent ecosystems, our focus remains the same: delivering solutions that make a difference.",
              ].map((t, i) => (
                <p key={i} style={{
                  color: "#45474d", fontWeight: 350,
                  lineHeight: 1.78, fontSize: "1.05rem", margin: 0,
                }}>{t}</p>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   Beliefs
───────────────────────────────────────── */

const BELIEFS = [
  {
    icon: "people",
    title: "Technology should serve humanity",
    body: "Every innovation should solve a meaningful problem, create measurable value, and improve the quality of human life.",
  },
  {
    icon: "hub",
    title: "Intelligence bridges complexity",
    body: "We bridge the gap between complex challenges and intelligent solutions that empower people and strengthen institutions.",
  },
  {
    icon: "security",
    title: "Ethical, secure, and inclusive",
    body: "Leading responsibly means developing technologies that are ethical, secure, inclusive, and sustainable for all.",
  },
  {
    icon: "public",
    title: "A global ecosystem of impact",
    body: "Building more than a company — an ecosystem where ideas become solutions and opportunities become sustainable progress.",
  },
]

function BeliefsSection({ isMobile }: { isMobile: boolean }) {
  return (
    <section style={{
      fontFamily: FF,
      background: "#020408",
      padding: isMobile ? "4.5rem 1.25rem" : "9rem 4rem",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeUp>
          <div style={{
            display: "flex", flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "flex-end",
            marginBottom: isMobile ? "3rem" : "4.5rem",
            gap: "1.5rem",
          }}>
            <h2 style={{
              fontFamily: FF,
              fontSize: isMobile ? "clamp(2rem,7vw,3rem)" : "clamp(2.4rem,4vw,4.2rem)",
              fontWeight: 250, lineHeight: 1.08,
              color: "white", margin: 0, letterSpacing: "-0.03em",
            }}>What we believe</h2>
            {!isMobile && (
              <p style={{
                color: "rgba(255,255,255,0.4)", fontWeight: 300,
                fontSize: "1rem", lineHeight: 1.6,
                maxWidth: 340, margin: 0,
              }}>
                The principles guiding every decision, product, and partnership we build.
              </p>
            )}
          </div>
        </FadeUp>

        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? "1rem" : "1.25rem",
        }}>
          {BELIEFS.map((b, i) => (
            <FadeUp key={b.title} delay={i * 0.09}>
              <div
                style={{
                  borderRadius: isMobile ? "1.25rem" : "1.5rem",
                  border: "1px solid rgba(255,255,255,0.07)",
                  background: "rgba(255,255,255,0.03)",
                  padding: isMobile ? "2rem 1.5rem" : "2.75rem",
                  display: "flex", flexDirection: "column", gap: "1.25rem",
                  transition: "background 0.28s ease, border-color 0.28s ease",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = "rgba(255,255,255,0.06)"
                  el.style.borderColor = "rgba(255,255,255,0.13)"
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = "rgba(255,255,255,0.03)"
                  el.style.borderColor = "rgba(255,255,255,0.07)"
                }}
              >
                <div style={{
                  width: 46, height: 46, borderRadius: "13px",
                  background: "rgba(26,115,232,0.12)",
                  border: "1px solid rgba(26,115,232,0.22)",
                  display: "grid", placeContent: "center",
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize: "1.2rem", color: "#5b9cf6" }}>{b.icon}</span>
                </div>
                <h3 style={{
                  fontFamily: FF, fontSize: isMobile ? "1.1rem" : "1.2rem",
                  fontWeight: 500, lineHeight: 1.25,
                  color: "white", margin: 0, letterSpacing: "-0.015em",
                }}>{b.title}</h3>
                <p style={{
                  fontFamily: FF, fontSize: "0.95rem", fontWeight: 350,
                  color: "rgba(255,255,255,0.48)", lineHeight: 1.7, margin: 0,
                }}>{b.body}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   Approach
───────────────────────────────────────── */

const STEPS = [
  {
    n: "01", label: "Research",
    desc: "We study problems deeply — through data, field research, and expert partnerships — before writing a single line of code.",
  },
  {
    n: "02", label: "Design",
    desc: "Human-centered design guided by empathy, inclusivity, and precision — so solutions feel intuitive at any scale.",
  },
  {
    n: "03", label: "Build",
    desc: "Secure, scalable, and reliable platforms engineered for the demands of enterprise and government environments.",
  },
  {
    n: "04", label: "Deploy",
    desc: "We deploy with rigor and stay engaged — monitoring, optimizing, and evolving solutions as needs change.",
  },
]

function ApproachSection({ isMobile }: { isMobile: boolean }) {
  return (
    <section style={{
      fontFamily: FF,
      background: "#fff",
      padding: isMobile ? "4.5rem 1.25rem" : "9rem 4rem",
      borderTop: "1px solid rgba(33,34,38,0.06)",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeUp>
          <div style={{
            display: "flex", flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "flex-end",
            marginBottom: isMobile ? "3rem" : "5rem",
            gap: "1.5rem",
          }}>
            <p style={{
              fontSize: "0.72rem", fontWeight: 700,
              letterSpacing: "0.16em", textTransform: "uppercase",
              color: "rgba(18,19,23,0.32)", margin: 0,
            }}>Our approach</p>
            <h2 style={{
              fontFamily: FF,
              fontSize: isMobile ? "clamp(1.8rem,6vw,2.6rem)" : "clamp(2rem,3.2vw,3.5rem)",
              fontWeight: 250, lineHeight: 1.1,
              color: "#121317", margin: 0, letterSpacing: "-0.03em",
              maxWidth: 560, textAlign: isMobile ? "left" : "right",
            }}>Research-driven. Innovation-guided. Human-grounded.</h2>
          </div>
        </FadeUp>

        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
          gap: isMobile ? "2rem 1.25rem" : "2.5rem",
        }}>
          {STEPS.map((s, i) => (
            <FadeUp key={s.n} delay={i * 0.1}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span style={{
                    fontFamily: FF, fontSize: "0.68rem", fontWeight: 700,
                    letterSpacing: "0.12em", color: "#1a73e8", flexShrink: 0,
                  }}>{s.n}</span>
                  <div style={{ flex: 1, height: 1, background: "rgba(33,34,38,0.12)" }} />
                </div>
                <h3 style={{
                  fontFamily: FF,
                  fontSize: isMobile ? "1.15rem" : "1.35rem",
                  fontWeight: 450, color: "#121317",
                  margin: 0, letterSpacing: "-0.02em",
                }}>{s.label}</h3>
                <p style={{
                  fontFamily: FF, fontSize: "0.9rem", fontWeight: 350,
                  color: "#5f6368", lineHeight: 1.72, margin: 0,
                }}>{s.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   Ecosystem Quote
───────────────────────────────────────── */

function EcosystemSection({ isMobile }: { isMobile: boolean }) {
  return (
    <section style={{
      fontFamily: FF,
      background: "#020408",
      padding: isMobile ? "5rem 1.5rem" : "11rem 4rem",
      textAlign: "center",
      position: "relative", overflow: "hidden",
    }}>
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        display: "flex", justifyContent: "center", alignItems: "center",
      }}>
        <div style={{
          width: isMobile ? "90vw" : "55vw",
          height: isMobile ? "90vw" : "55vw",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(26,115,232,0.1) 0%, transparent 58%)",
          filter: "blur(100px)",
        }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 880, margin: "0 auto" }}>
        <FadeUp>
          <p style={{
            fontSize: "0.72rem", fontWeight: 700,
            letterSpacing: "0.16em", textTransform: "uppercase",
            color: "rgba(26,115,232,0.65)", margin: "0 0 2.5rem",
          }}>The bigger picture</p>

          <blockquote style={{
            fontFamily: FF,
            fontSize: isMobile ? "clamp(1.7rem,6.5vw,2.6rem)" : "clamp(2.2rem,4vw,4.5rem)",
            fontWeight: 200, lineHeight: 1.12,
            color: "white", margin: 0, letterSpacing: "-0.03em",
          }}>
            "We are building more than a technology company — we are building a global ecosystem of intelligence, innovation, and impact."
          </blockquote>

          <div style={{
            width: 48, height: 1,
            background: "rgba(255,255,255,0.18)",
            margin: "3rem auto",
          }} />

          <p style={{
            fontFamily: FF, fontSize: isMobile ? "0.95rem" : "1.05rem",
            fontWeight: 300,
            color: "rgba(255,255,255,0.4)", lineHeight: 1.75,
            maxWidth: 520, margin: "0 auto",
          }}>
            An ecosystem where ideas become solutions, solutions become opportunities, and opportunities become sustainable progress for people everywhere.
          </p>
        </FadeUp>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   CTA
───────────────────────────────────────── */

function CTASection({ isMobile }: { isMobile: boolean }) {
  return (
    <section style={{
      fontFamily: FF,
      background: "#000",
      padding: isMobile ? "1.5rem" : "3rem",
    }}>
      <div style={{
        borderRadius: isMobile ? "1.25rem" : "2rem",
        border: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(255,255,255,0.025)",
        padding: isMobile ? "3rem 1.5rem" : "5.5rem 5rem",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        gap: isMobile ? "2.5rem" : "6rem",
        alignItems: "center",
      }}>
        <FadeUp>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <p style={{
              fontSize: "0.72rem", fontWeight: 700,
              letterSpacing: "0.16em", textTransform: "uppercase",
              color: "rgba(26,115,232,0.65)", margin: 0,
            }}>Work with us</p>
            <h2 style={{
              fontFamily: FF,
              fontSize: isMobile ? "clamp(1.8rem,7vw,2.6rem)" : "clamp(1.9rem,3vw,3rem)",
              fontWeight: 300, lineHeight: 1.1,
              color: "white", margin: 0, letterSpacing: "-0.03em",
            }}>
              Ready to engineer a smarter future together?
            </h2>
          </div>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <p style={{
              color: "rgba(255,255,255,0.45)", fontWeight: 300,
              lineHeight: 1.72, fontSize: "1rem", margin: 0,
            }}>
              Talk to our team about your technology challenges. We build systems that last — at enterprise scale, with government trust.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
              <a href="/#beforeyougo" style={{
                fontFamily: FF, fontSize: "0.95rem", fontWeight: 600,
                padding: "0.82em 2.1em", borderRadius: "999px",
                background: "white", color: "#0a0a0a",
                textDecoration: "none",
                boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                transition: "opacity 0.18s ease",
                display: "inline-block",
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.88" }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1" }}
              >
                Talk to MGX
              </a>
              <a href="/about#pillars" style={{
                fontFamily: FF, fontSize: "0.95rem", fontWeight: 450,
                padding: "0.82em 2.1em", borderRadius: "999px",
                background: "rgba(255,255,255,0.07)",
                color: "white", border: "1px solid rgba(255,255,255,0.18)",
                textDecoration: "none",
                transition: "background 0.18s ease, border-color 0.18s ease",
                display: "inline-block",
              }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = "rgba(255,255,255,0.13)"
                  el.style.borderColor = "rgba(255,255,255,0.32)"
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = "rgba(255,255,255,0.07)"
                  el.style.borderColor = "rgba(255,255,255,0.18)"
                }}
              >
                Explore our solutions
              </a>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   Page
───────────────────────────────────────── */

export default function AboutPage() {
  const isMobile = useIsMobile()

  return (
    <>
      <AboutNav isMobile={isMobile} />
      <main>
        <HeroSection isMobile={isMobile} />
        <div id="pillars">
          <PillarsSection isMobile={isMobile} />
        </div>
        <StorySection isMobile={isMobile} />
        <BeliefsSection isMobile={isMobile} />
        <ApproachSection isMobile={isMobile} />
        <EcosystemSection isMobile={isMobile} />
        <CTASection isMobile={isMobile} />
      </main>
      <Footer />
    </>
  )
}
