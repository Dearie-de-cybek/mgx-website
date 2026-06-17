class RingParticlesPainter {
  static get inputProperties() {
    return [
      '--particle-count', '--particle-rows', '--particle-size',
      '--particle-color', '--particle-min-alpha', '--particle-max-alpha',
      '--seed', '--ring-x', '--ring-y', '--animation-tick', '--mouse-active',
    ]
  }

  hash(n) {
    const x = Math.sin(n * 127.1 + 311.7) * 43758.5453123
    return x - Math.floor(x)
  }

  paint(ctx, geom, props) {
    const g = (k, d) => {
      const v = props.get(k)
      const n = v ? parseFloat(v) : NaN
      return isNaN(n) ? d : n
    }

    const count  = Math.round(g('--particle-count',  80))
    const rows   = Math.round(g('--particle-rows',   25))
    const size   = g('--particle-size',   2)
    const minA   = g('--particle-min-alpha', 0.05)
    const maxA   = g('--particle-max-alpha', 0.6)
    const seed   = g('--seed',           200)
    const tick   = g('--animation-tick',   0)
    const ringX  = g('--ring-x',          50)
    const ringY  = g('--ring-y',          50)
    const active = g('--mouse-active',     0)  // 0 = idle, 1 = gathering

    let color = '#1a73e8'
    try {
      const cv = props.get('--particle-color')
      if (cv) { const s = cv.toString().trim(); if (s) color = s }
    } catch (_) {}

    const W  = geom.width
    const H  = geom.height
    const mx = (ringX / 100) * W
    const my = (ringY / 100) * H
    const t  = tick * Math.PI * 2
    const PI2 = Math.PI * 2

    const total = count * rows

    for (let i = 0; i < total; i++) {
      const s = seed * 1e5 + i

      // ── Stable home: scattered across full viewport ──
      const hx = this.hash(s)     * W
      const hy = this.hash(s + 1) * H

      // ── Two-harmonic drift for organic continuous motion ──
      const sp1 = 0.18 + this.hash(s + 2) * 0.32
      const sp2 = 0.55 + this.hash(s + 7) * 0.55
      const a1  = 45   + this.hash(s + 3) * 65    // 45–110 px
      const a2  = 18   + this.hash(s + 8) * 28    // 18–46  px
      const ph1 = this.hash(s + 4) * PI2
      const ph2 = this.hash(s + 9) * PI2

      const driftX = a1 * Math.sin(t * sp1       + ph1) + a2 * Math.sin(t * sp2       + ph2)
      const driftY = a1 * Math.cos(t * sp1 * 0.8 + ph1) + a2 * Math.cos(t * sp2 * 1.1 + ph2)

      // Drift fades as active rises (particles stop wandering when gathering)
      const driftScale = 1 - active * 0.9

      let px = hx + driftX * driftScale
      let py = hy + driftY * driftScale

      // ── Gather: pull every particle toward the cursor ──
      const toMx = mx - px
      const toMy = my - py
      const dist  = Math.sqrt(toMx * toMx + toMy * toMy)

      if (dist > 1) {
        // Strength: very gentle idle pull (ambient cohesion) → strong gather on hover
        const idlePull   = 8
        const gatherPull = 480 * active
        const pullR      = Math.max(W, H) * 1.5   // covers full canvas + beyond
        const falloff    = Math.pow(Math.max(0, 1 - dist / pullR), 1.5)
        const force      = (idlePull + gatherPull) * falloff
        px += (toMx / dist) * force
        py += (toMy / dist) * force
      }

      // ── Alpha: base + glow near cursor when active ──
      const prox  = active > 0.01 ? Math.max(0, 1 - dist / (Math.min(W, H) * 0.4)) : 0
      const alpha = Math.min(
        minA + (maxA - minA) * this.hash(s + 5) + prox * 0.35,
        1
      )

      const sz = size * (0.4 + this.hash(s + 6) * 0.9)
      ctx.globalAlpha = alpha
      ctx.fillStyle   = color
      ctx.beginPath()
      ctx.arc(px, py, Math.max(sz, 0.4), 0, Math.PI * 2)
      ctx.fill()
    }

    ctx.globalAlpha = 1
  }
}

registerPaint('ring-particles', RingParticlesPainter)
