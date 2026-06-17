"use client"

import { useState, useEffect } from "react"

const navItems = ["Products", "Solutions", "Research", "MGX Campus", "Company"]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 32)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center pt-4 px-6 pointer-events-none">
      <nav
        className={[
          "w-full max-w-[1200px] flex items-center justify-between px-8 h-[56px]",
          "rounded-2xl pointer-events-auto",
          "transition-all duration-500 ease-out",
          scrolled
            ? "bg-white/96 backdrop-blur-2xl shadow-[0_2px_24px_rgba(0,0,0,0.07),0_0_0_1px_rgba(0,0,0,0.04)]"
            : "bg-white/72 backdrop-blur-xl shadow-[0_4px_40px_rgba(0,0,0,0.10),0_0_0_1px_rgba(255,255,255,0.14)]",
        ].join(" ")}
        style={{ fontFamily: "'Google Sans Flex','Google Sans',system-ui,sans-serif" }}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-1 cursor-pointer select-none"
        >
          <span
            className="text-[18px] text-[#121317] tracking-tight"
            style={{ fontWeight: 650, letterSpacing: "-0.5px" }}
          >
            MGX
          </span>
        </button>

        {/* Centre nav items */}
        <ul className="flex items-center gap-0.5 list-none m-0 p-0">
          {navItems.map((item) => (
            <li key={item}>
              <button
                onClick={() =>
                  scrollTo(item.toLowerCase().replace(/\s/g, "-"))
                }
                className="relative px-3.5 py-2 cursor-pointer group"
                style={{ fontWeight: 450, fontSize: "14px", color: "#45474d" }}
              >
                <span className="relative z-10 group-hover:text-[#121317] transition-colors duration-200">
                  {item}
                </span>
                <span className="absolute inset-0 rounded-lg bg-black/0 group-hover:bg-black/[0.05] transition-colors duration-200" />
              </button>
            </li>
          ))}
        </ul>

        {/* Right CTAs */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scrollTo("contact")}
            className="px-4 py-2 rounded-xl cursor-pointer transition-all duration-200 hover:bg-black/[0.05]"
            style={{ fontWeight: 450, fontSize: "14px", color: "#45474d" }}
          >
            Contact Us
          </button>
          <button
            onClick={() => scrollTo("services")}
            className="px-4 py-2 rounded-xl cursor-pointer transition-all duration-200 text-white"
            style={{
              fontWeight: 500,
              fontSize: "14px",
              background: "#121317",
              boxShadow: "0 1px 2px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "#1e2028"
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "#121317"
            }}
          >
            Get Started
          </button>
        </div>
      </nav>
    </header>
  )
}
