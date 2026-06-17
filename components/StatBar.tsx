"use client"

import { useEffect, useRef, useState } from "react"

const stats = [
  { value: 200, suffix: "+", label: "Clients Worldwide" },
  { value: 12,  suffix: "+", label: "Years of Excellence" },
  { value: 5,   suffix: "",  label: "Proprietary Products" },
  { value: 99,  suffix: "%", label: "Uptime SLA" },
]

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const fired = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired.current) {
          fired.current = true
          let cur = 0
          const step = target / 55
          const t = setInterval(() => {
            cur = Math.min(cur + step, target)
            setCount(Math.floor(cur))
            if (cur >= target) clearInterval(t)
          }, 18)
        }
      },
      { threshold: 0.5 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [target])

  return (
    <span ref={ref}>
      {count}{count >= target ? suffix : ""}
    </span>
  )
}

export default function StatBar() {
  return (
    <div className="border-y border-black/[0.07] py-14 px-12">
      <div className="max-w-[1180px] mx-auto grid grid-cols-4 gap-8 text-center">
        {stats.map(({ value, suffix, label }) => (
          <div key={label}>
            <div
              className="text-[42px] font-extrabold tracking-[-2px] mb-1.5"
              style={{
                background: "linear-gradient(135deg, #1a73e8, #34a853)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              <Counter target={value} suffix={suffix} />
            </div>
            <div className="text-[14px] text-[#45474d] font-medium tracking-wide">
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
