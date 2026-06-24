"use client"

import { useEffect, useRef, useState } from "react"
import { WebGLShader } from "@/components/ui/web-gl-shader"
import { useIsMobile } from "@/hooks/useIsMobile"

const FF = "'Google Sans Flex','Google Sans',system-ui,sans-serif"
const NAV_ITEMS = ["Products", "Solutions", "Research", "MGX Campus", "Company"]
const FULL_TEXT = "Solving Real Human\nProblems With Technology"
const NL_IDX = FULL_TEXT.indexOf("\n")

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
      { name: "Innovation Lab",    sub: "R&D and rapid prototyping" },
      { name: "Publications",      sub: "White papers & reports" },
      { name: "R&D Partnerships",  sub: "Academic and industry" },
    ],
  },
  "MGX Campus": {
    desc: "Building Africa's next generation of digital leaders.",
    items: [
      { name: "Training Programs", sub: "Professional development",  icon: "school" },
      { name: "Bootcamps",         sub: "Intensive skill-building",  icon: "fitness_center" },
      { name: "Certifications",    sub: "Industry credentials",      icon: "verified" },
      { name: "Innovation Hub",    sub: "Incubation & mentorship",   icon: "hub" },
    ],
  },
  Company: {
    desc: "Learn about our story, team, and mission.",
    items: [
      { name: "About MGX",    sub: "Our story and vision",   icon: "info" },
      { name: "Team",         sub: "The people behind MGX",  icon: "group" },
      { name: "Careers",      sub: "Join our growing team",  icon: "work" },
      { name: "News & Press", sub: "Latest announcements",   icon: "newspaper" },
    ],
  },
}

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

function LogoMark({ dark = false }) {
  const fill = dark ? "#121317" : "white"
  return (
    <svg width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden>
      <rect width="8" height="8" rx="2.2" fill={fill} />
      <rect x="10" width="8" height="8" rx="2.2" fill={fill} fillOpacity="0.3" />
      <rect y="10" width="8" height="8" rx="2.2" fill={fill} fillOpacity="0.3" />
      <rect x="10" y="10" width="8" height="8" rx="2.2" fill={fill} />
    </svg>
  )
}

function MenuButton({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={open ? "Close menu" : "Open menu"}
      style={{
        width: 44, height: 44,
        borderRadius: "50%",
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

export default function Hero() {
  const isMobile  = useIsMobile(1024)
  const [menuOpen,       setMenuOpen]       = useState(false)
  const [typedCount,     setTypedCount]     = useState(0)
  const [eyebrowVisible, setEyebrowVisible] = useState(false)
  const [showBody,       setShowBody]       = useState(false)
  const [showButtons,    setShowButtons]    = useState(false)
  const [openDropdown,   setOpenDropdown]   = useState<string | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const openDD = (item: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    if (NAV_DROPDOWNS[item]) setOpenDropdown(item)
  }
  const closeDD = () => {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 90)
  }

  useEffect(() => { if (!isMobile) setMenuOpen(false) }, [isMobile])
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    setOpenDropdown(null)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

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

  const rawTyped   = FULL_TEXT.slice(0, typedCount)
  const line1      = rawTyped.slice(0, NL_IDX)
  const line2      = rawTyped.length > NL_IDX ? rawTyped.slice(NL_IDX + 1) : ""
  const showCursor = typedCount < FULL_TEXT.length

  return (
    <section
      id="welcome"
      className="relative min-h-screen overflow-hidden"
      style={{ fontFamily: FF, background: "#000" }}
    >
      <style>{`
        @keyframes ddFadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* WebGL wave background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <WebGLShader />
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

      {/* NAV */}
      <nav style={{
        position: "absolute", top: 0, left: 0, right: 0, zIndex: 20,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: isMobile ? "0 1.25rem" : "0 5rem",
        height: 68,
      }}>
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ fontSize: 22, letterSpacing: "-0.8px", lineHeight: 1, cursor: "pointer" }}
        >
          <span style={{
            fontWeight: 900,
            background: "linear-gradient(135deg,#1a73e8 0%,#e91e8c 50%,#ff6d2a 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>M</span>
          <span style={{ fontWeight: 650, color: "white" }}>GX</span>
        </button>

        {/* Desktop nav items */}
        {!isMobile && (
          <ul className="flex items-center gap-0.5 list-none m-0 p-0">
            {NAV_ITEMS.map((item) => (
              <li key={item}
                onMouseEnter={() => openDD(item)}
                onMouseLeave={closeDD}
              >
                <button
                  onClick={() => scrollTo(item.toLowerCase().replace(/\s+/g, "-"))}
                  className="px-3 py-1.5 rounded-lg cursor-pointer transition-colors duration-150"
                  style={{
                    fontSize: 14, fontWeight: 450,
                    color: openDropdown === item ? "white" : "rgba(255,255,255,0.88)",
                    display: "inline-flex", alignItems: "center", gap: "0.3rem",
                  }}
                >
                  {item}
                  {NAV_DROPDOWNS[item] && (
                    <svg
                      width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden
                      style={{
                        opacity: 0.5,
                        transition: "transform 0.2s ease",
                        transform: openDropdown === item ? "rotate(180deg)" : "none",
                      }}
                    >
                      <path d="M1.5 3L4.5 6.5L7.5 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Desktop right actions */}
        {!isMobile && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollTo("contact")}
              className="px-4 py-2 rounded-xl cursor-pointer transition-colors duration-150"
              style={{ fontSize: 14, fontWeight: 450, color: "rgba(255,255,255,0.88)" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "white")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.88)")}
            >
              Contact Us
            </button>
            <button
              onClick={() => scrollTo("services")}
              className="flex items-center gap-2 cursor-pointer"
              style={{
                padding: "8px 18px",
                background: "white",
                border: "1px solid white",
                boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
                color: "#0a0a0a", fontSize: 14, fontWeight: 600, borderRadius: "100px",
                transition: "opacity 0.18s ease, transform 0.18s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.88" }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1" }}
            >
              <ArrowIcon size={13} color="#0a0a0a" /> Get Started
            </button>
          </div>
        )}

        {/* Mobile hamburger */}
        {isMobile && <MenuButton open={menuOpen} onClick={() => setMenuOpen(o => !o)} />}

        {/* Dropdown panel — anchored to nav bottom */}
        {!isMobile && openDropdown && NAV_DROPDOWNS[openDropdown] && (
          <div
            onMouseEnter={() => { if (closeTimer.current) clearTimeout(closeTimer.current) }}
            onMouseLeave={closeDD}
            style={{
              position: "absolute",
              top: "100%",
              left: 0, right: 0,
              paddingTop: "0.5rem",
              display: "flex",
              justifyContent: "center",
              zIndex: 200,
              pointerEvents: "auto",
            }}
          >
            <div style={{
              background: "rgba(8,10,16,0.97)",
              backdropFilter: "blur(48px)",
              WebkitBackdropFilter: "blur(48px)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 20,
              padding: "2rem 2.25rem",
              maxWidth: 700, width: "calc(100% - 10rem)",
              boxShadow: "0 28px 90px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
              display: "grid",
              gridTemplateColumns: "1fr 1.7fr",
              gap: "2.25rem",
              animation: "ddFadeIn 0.18s ease forwards",
            }}>
              {/* Left: label + description */}
              <div style={{
                display: "flex", flexDirection: "column", gap: "0.6rem",
                borderRight: "1px solid rgba(255,255,255,0.08)",
                paddingRight: "2.25rem",
                justifyContent: "center",
              }}>
                <span style={{
                  fontFamily: FF, fontSize: "0.63rem", fontWeight: 700,
                  letterSpacing: "0.17em", textTransform: "uppercase",
                  color: "rgba(255,255,255,0.28)",
                }}>
                  {openDropdown}
                </span>
                <p style={{
                  fontFamily: FF, fontSize: "0.92rem", fontWeight: 300,
                  color: "rgba(255,255,255,0.5)", lineHeight: 1.75,
                  margin: 0,
                }}>
                  {NAV_DROPDOWNS[openDropdown].desc}
                </p>
              </div>

              {/* Right: items */}
              {NAV_DROPDOWNS[openDropdown].items.some(i => i.icon) ? (
                /* Bordered card layout for icon-bearing sections */
                <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                  {NAV_DROPDOWNS[openDropdown].items.map((link) => (
                    <button
                      key={link.name}
                      style={{
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
                        <span className="material-symbols-outlined" style={{
                          fontSize: "1.1rem", color: "rgba(255,255,255,0.55)", flexShrink: 0,
                        }}>{link.icon}</span>
                      )}
                      <div>
                        <div style={{
                          fontFamily: FF, fontSize: "0.875rem", fontWeight: 550,
                          color: "rgba(255,255,255,0.92)", letterSpacing: "-0.01em",
                        }}>{link.name}</div>
                        <div style={{
                          fontFamily: FF, fontSize: "0.77rem", fontWeight: 350,
                          color: "rgba(255,255,255,0.38)", lineHeight: 1.4,
                        }}>{link.sub}</div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                /* Standard 2-col grid for other sections */
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0.2rem 0.75rem",
                  alignContent: "start",
                }}>
                  {NAV_DROPDOWNS[openDropdown].items.map((link) => (
                    <button
                      key={link.name}
                      style={{
                        display: "flex", flexDirection: "column", gap: "0.22rem",
                        textAlign: "left", padding: "0.65rem 0.8rem",
                        borderRadius: 11, cursor: "pointer",
                        background: "transparent", border: "none",
                        transition: "background 0.14s ease",
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)" }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent" }}
                    >
                      <span style={{
                        fontFamily: FF, fontSize: "0.875rem", fontWeight: 550,
                        color: "rgba(255,255,255,0.92)", letterSpacing: "-0.01em",
                      }}>{link.name}</span>
                      <span style={{
                        fontFamily: FF, fontSize: "0.77rem", fontWeight: 350,
                        color: "rgba(255,255,255,0.38)", lineHeight: 1.4,
                      }}>{link.sub}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* MOBILE FULL-SCREEN MENU */}
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
          <button
            onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }) }}
            style={{ fontSize: 22, letterSpacing: "-0.8px", lineHeight: 1, cursor: "pointer" }}
          >
            <span style={{
              fontWeight: 900,
              background: "linear-gradient(135deg,#1a73e8 0%,#e91e8c 50%,#ff6d2a 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>M</span>
            <span style={{ fontWeight: 650, color: "white" }}>GX</span>
          </button>
          <MenuButton open={menuOpen} onClick={() => setMenuOpen(false)} />
        </div>

        <nav style={{ flex: 1, padding: "0.5rem 1.25rem", overflowY: "auto" }}>
          {NAV_ITEMS.map((item) => (
            <div key={item} style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              <button
                onClick={() => scrollTo(item.toLowerCase().replace(/\s+/g, "-"))}
                style={{
                  display: "block", width: "100%", textAlign: "left",
                  padding: "1.1rem 0",
                  fontSize: "1.45rem", fontWeight: 350,
                  color: "rgba(255,255,255,0.88)",
                  cursor: "pointer", letterSpacing: "-0.01em",
                }}
              >
                {item}
              </button>
            </div>
          ))}
        </nav>

        <div style={{ padding: "1.5rem 1.25rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          <button
            onClick={() => scrollTo("services")}
            style={{
              padding: "14px 0", borderRadius: "100px",
              background: "white", color: "#000",
              fontSize: "0.95rem", fontWeight: 600,
              cursor: "pointer", width: "100%",
            }}
          >
            Get Started
          </button>
          <button
            onClick={() => scrollTo("contact")}
            style={{
              padding: "14px 0", borderRadius: "100px",
              background: "transparent", color: "rgba(255,255,255,0.7)",
              border: "1px solid rgba(255,255,255,0.15)",
              fontSize: "0.95rem", fontWeight: 400,
              cursor: "pointer", width: "100%",
            }}
          >
            Contact Us
          </button>
        </div>
      </div>

      {/* HERO CONTENT */}
      <div style={{
        position: "relative", zIndex: 10,
        minHeight: "100svh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        textAlign: "center",
        padding: isMobile ? "80px 1.5rem 3rem" : "68px 2rem 3rem",
      }}>
        {/* Eyebrow */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "0.5rem",
          marginBottom: isMobile ? "1.75rem" : "2.5rem",
          fontSize: isMobile ? 13 : 16, fontWeight: 600, letterSpacing: "0.5px",
          opacity: eyebrowVisible ? 1 : 0,
          transition: "opacity 0.6s ease",
          background: "linear-gradient(135deg,#60a5fa 0%,#e879f9 60%,#fb923c 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
        }}>
          <LogoMark /> MGX
        </div>

        {/* Typed headline */}
        <h1 style={{
          fontFamily: FF,
          fontSize: isMobile ? "clamp(2.2rem,10vw,3.2rem)" : "clamp(2.5rem,7vw,5.7rem)",
          fontWeight: 450,
          lineHeight: 1.06,
          letterSpacing: isMobile ? "-1.5px" : "-3.5px",
          color: "white",
          margin: 0,
          marginBottom: isMobile ? "1.25rem" : "2.25rem",
          maxWidth: isMobile ? "100%" : "1350px",
        }}>
          {line1}
          {rawTyped.length > NL_IDX && <br />}
          {line2}
          {showCursor && (
            <span aria-hidden style={{
              display: "inline-block", width: 3, height: "0.85em",
              background: "#60a5fa", marginLeft: 4,
              verticalAlign: "text-bottom", borderRadius: 2,
              animation: "cursorBlink 0.9s step-end infinite",
            }} />
          )}
        </h1>

        {/* Body */}
        <p style={{
          fontSize: isMobile ? "1rem" : "17.5px",
          fontWeight: 400, lineHeight: 1.7,
          color: "rgba(255,255,255,0.9)",
          maxWidth: 520, margin: "0 auto",
          marginBottom: isMobile ? "2rem" : "3rem",
          opacity: showBody ? 1 : 0,
          transform: showBody ? "none" : "translateY(16px)",
          transition: "opacity 0.55s ease, transform 0.55s ease",
        }}>
          MGX creates intelligent digital solutions, research‑driven products,
          and technology platforms that help organizations transform, scale,
          and solve complex challenges.
        </p>

        {/* CTA Buttons */}
        <div style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center", justifyContent: "center",
          gap: isMobile ? "0.6rem" : "0.75rem",
          width: isMobile ? "100%" : "auto",
          maxWidth: isMobile ? 340 : "none",
          opacity: showButtons ? 1 : 0,
          transform: showButtons ? "none" : "translateY(16px)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}>
          {/* Primary CTA — solid white, high contrast */}
          <button
            onClick={() => scrollTo("services")}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem",
              padding: isMobile ? "13px 0" : "14px 28px",
              width: isMobile ? "100%" : "auto",
              background: "white",
              border: "1px solid white",
              boxShadow: "0 4px 20px rgba(0,0,0,0.35)",
              color: "#0a0a0a", fontSize: isMobile ? "0.9rem" : 15, fontWeight: 600,
              borderRadius: "100px", cursor: "pointer",
              transition: "opacity 0.18s ease, transform 0.18s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.opacity = "0.88"
              el.style.transform = "translateY(-1px)"
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.opacity = "1"
              el.style.transform = "translateY(0)"
            }}
          >
            <ArrowIcon size={14} color="#0a0a0a" /> Explore Our Solutions
          </button>

          {/* Secondary CTA — strong glass outline */}
          <button
            onClick={() => scrollTo("products")}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem",
              padding: isMobile ? "13px 0" : "14px 28px",
              width: isMobile ? "100%" : "auto",
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.35)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15)",
              color: "white", fontSize: isMobile ? "0.9rem" : 15, fontWeight: 500,
              borderRadius: "100px", cursor: "pointer",
              transition: "background 0.18s ease, border-color 0.18s ease, transform 0.18s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.background = "rgba(255,255,255,0.18)"
              el.style.borderColor = "rgba(255,255,255,0.55)"
              el.style.transform = "translateY(-1px)"
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.background = "rgba(255,255,255,0.1)"
              el.style.borderColor = "rgba(255,255,255,0.35)"
              el.style.transform = "translateY(0)"
            }}
          >
            <GridIcon /> View Our Products
          </button>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
        style={{ background: "linear-gradient(to top,rgba(0,0,0,0.5),transparent)" }} aria-hidden />

      {/* Scroll cue — desktop only */}
      {!isMobile && (
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5"
          style={{
            animation: "cueBounce 2.4s ease-in-out infinite",
            opacity: showButtons ? 1 : 0, transition: "opacity 0.5s ease 0.3s",
          }}
          aria-hidden
        >
          <div className="w-px h-9" style={{ background: "linear-gradient(to bottom,transparent,rgba(255,255,255,0.25))" }} />
          <div className="w-1.75 h-1.75 rotate-45" style={{
            borderRight: "1px solid rgba(255,255,255,0.3)",
            borderBottom: "1px solid rgba(255,255,255,0.3)",
          }} />
        </div>
      )}
    </section>
  )
}
