"use client"

const FF = "'Google Sans Flex','Google Sans',system-ui,sans-serif"

const PANELS = [
  {
    audience:  "For enterprises",
    headline:  "Transform at scale",
    sub:       "Migrate, automate, and digitalize your operations with platforms built for the most demanding enterprise environments.",
    cta:       "Talk to MGX",
    secondary: false,
  },
  {
    audience:  "MGX Campus",
    headline:  "Where talent meets technology",
    sub:       "A dedicated innovation hub for training, research, and technology incubation — building the next generation of digital leaders across Africa and beyond.",
    cta:       "Explore the campus",
    secondary: true,
  },
]

export default function Who() {
  return (
    <section
      id="who"
      style={{
        fontFamily: FF,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        borderTop: "1px solid rgba(33,34,38,0.06)",
      }}
    >
      {PANELS.map((p) => (
        <div
          key={p.audience}
          style={{
            flex: "1 1 320px",
            minHeight: "72vh",
            padding: "5rem 4rem",
            display: "grid",
            placeContent: "center",
            gap: "1rem",
            textAlign: "center",
            borderRight: "1px solid rgba(33,34,38,0.06)",
          }}
        >
          <p style={{
            fontSize: "0.8rem", fontWeight: 600,
            letterSpacing: "0.1em", textTransform: "uppercase",
            color: "#80868b", margin: 0,
          }}>
            {p.audience}
          </p>

          <h3 style={{
            fontFamily: FF,
            fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
            fontWeight: 400, lineHeight: 1.05,
            color: "#121317", margin: "0.25rem 0 0",
          }}>
            {p.headline}<br />
            <span style={{ color: "#80868b" }}>{p.sub.split(" ")[0]} {p.sub.split(" ")[1]}</span>
          </h3>

          <p style={{
            color: "#45474d", fontWeight: 300,
            lineHeight: 1.5, maxWidth: "36ch",
            margin: "0 auto", fontSize: "1em",
          }}>
            {p.sub}
          </p>

          <div style={{ marginTop: "0.5rem" }}>
            <button
              style={{
                fontFamily: FF,
                fontSize: "1em",
                fontWeight: 500,
                padding: "0.7em 1.8em",
                borderRadius: "999px",
                cursor: "pointer",
                border: p.secondary ? "1px solid rgba(33,34,38,0.12)" : "none",
                background: p.secondary ? "rgba(183,191,217,0.1)" : "#121317",
                color: p.secondary ? "#121317" : "white",
                transition: "background 0.15s ease, transform 0.15s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.transform = "translateY(-1px)"
                el.style.background = p.secondary ? "rgba(183,191,217,0.18)" : "#2f3034"
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.transform = "translateY(0)"
                el.style.background = p.secondary ? "rgba(183,191,217,0.1)" : "#121317"
              }}
            >
              {p.cta}
            </button>
          </div>
        </div>
      ))}
    </section>
  )
}
