"use client"

import { useRef } from "react"

const FF = "'Google Sans Flex','Google Sans',system-ui,sans-serif"

const POSTS = [
  {
    title: "Why Hybrid Cloud Is the Future of Government IT Infrastructure",
    date: "June 12, 2025",
    img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=400&fit=crop&q=85",
  },
  {
    title: "Zero Trust Architecture: A Practical Guide for Enterprise Teams",
    date: "May 28, 2025",
    img: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=600&h=400&fit=crop&q=85",
  },
  {
    title: "RPA at Scale: Lessons from Deploying 500+ Software Robots",
    date: "May 14, 2025",
    img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop&q=85",
  },
  {
    title: "Building Inclusive Digital Identity Systems for Africa",
    date: "April 30, 2025",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&q=85",
  },
  {
    title: "The Geofencing Revolution in Smart City Management",
    date: "April 15, 2025",
    img: "https://images.unsplash.com/photo-1499678329028-101435549a4e?w=600&h=400&fit=crop&q=85",
  },
]

function ChevronLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Blog() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: "prev" | "next") => {
    const el = scrollRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>("[data-blog-card]")
    const amount = (card?.offsetWidth ?? 360) + 20
    el.scrollBy({ left: dir === "next" ? amount : -amount, behavior: "smooth" })
  }

  return (
    <section
      id="blog"
      style={{ fontFamily: FF, paddingTop: "7rem", paddingBottom: "6rem", borderTop: "1px solid rgba(33,34,38,0.06)" }}
    >
      {/* ── Header ── */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 7rem",
        marginBottom: "3.5rem",
      }}>
        <h2 style={{
          fontFamily: FF,
          fontSize: "clamp(1.8rem, 2.8vw, 3rem)",
          fontWeight: 350, lineHeight: 1.05,
          color: "#121317", margin: 0,
          letterSpacing: "-0.025em",
        }}>
          Latest blogs
        </h2>

        <a
          href="#"
          style={{
            display: "inline-flex", alignItems: "center", gap: "0.45em",
            padding: "10px 20px",
            borderRadius: "100px",
            border: "1px solid rgba(18,19,23,0.14)",
            color: "#121317",
            fontSize: "0.88rem", fontWeight: 500,
            textDecoration: "none", fontFamily: FF,
            letterSpacing: "-0.01em",
            transition: "background 0.18s ease, border-color 0.18s ease",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement
            el.style.background = "rgba(18,19,23,0.04)"
            el.style.borderColor = "rgba(18,19,23,0.24)"
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement
            el.style.background = "transparent"
            el.style.borderColor = "rgba(18,19,23,0.14)"
          }}
        >
          View blog
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path d="M2 6h8m0 0L7 3m3 3L7 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>

      {/* ── Carousel ── */}
      <div
        ref={scrollRef}
        style={{
          display: "flex",
          gap: "1.25rem",
          paddingTop: "0.25rem",
          paddingBottom: "0.5rem",
          overflowX: "scroll",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          overscrollBehaviorX: "contain",
        }}
      >
        <div style={{ minWidth: "10rem", flexShrink: 0 }} />

        {POSTS.map((post) => (
          <a
            key={post.title}
            href="#"
            data-blog-card
            style={{
              flex: "0 0 min(62vw, 360px)",
              scrollSnapAlign: "start",
              display: "flex",
              flexDirection: "column",
              gap: "0.85rem",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            {/* Image */}
            <div style={{
              width: "100%",
              height: "240px",
              borderRadius: "16px",
              overflow: "hidden",
              background: "#f1f3f4",
              flexShrink: 0,
            }}>
              <img
                src={post.img}
                alt={post.title}
                loading="lazy"
                style={{
                  width: "100%", height: "100%",
                  objectFit: "cover", display: "block",
                  transition: "transform 0.4s ease",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.04)" }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)" }}
              />
            </div>

            {/* Title */}
            <h3 style={{
              fontFamily: FF,
              fontSize: "1rem", fontWeight: 550,
              lineHeight: 1.35, color: "#121317",
              margin: 0, letterSpacing: "-0.01em",
            }}>
              {post.title}
            </h3>

            {/* Date */}
            <p style={{
              fontSize: "0.8rem", fontWeight: 400,
              color: "#80868b", margin: 0,
            }}>
              {post.date}
            </p>

            {/* Read link */}
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "0.35em",
              fontSize: "0.88rem", fontWeight: 500,
              color: "#121317",
            }}>
              Read blog
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path d="M2 6h8m0 0L7 3m3 3L7 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        ))}

      </div>

      {/* ── Controls below cards ── */}
      <div style={{ padding: "2.5rem 7rem 0", display: "flex" }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          background: "rgba(255,255,255,0.55)",
          backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(18,19,23,0.09)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.9)",
          borderRadius: "100px",
          overflow: "hidden",
        }}>
          {(["prev", "next"] as const).map((dir) => (
            <button
              key={dir}
              onClick={() => scroll(dir)}
              aria-label={dir === "prev" ? "Previous post" : "Next post"}
              style={{
                width: "48px", height: "44px",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "transparent",
                border: "none",
                cursor: "pointer", color: "#121317",
                transition: "background 0.15s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(18,19,23,0.05)" }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent" }}
            >
              {dir === "prev" ? <ChevronLeft /> : <ChevronRight />}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
