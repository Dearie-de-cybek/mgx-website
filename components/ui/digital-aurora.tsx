"use client"

import { useRef, useEffect } from "react"

interface InteractiveShaderProps {
  flowSpeed?: number
  colorIntensity?: number
  noiseLayers?: number
  mouseInfluence?: number
}

export function InteractiveShader({
  flowSpeed = 0.4,
  colorIntensity = 1.2,
  noiseLayers = 4.0,
  mouseInfluence = 0.3,
}: InteractiveShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePos  = useRef({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext("webgl")
    if (!gl) return

    const vsSource = `
      attribute vec2 aPosition;
      void main() { gl_Position = vec4(aPosition, 0.0, 1.0); }
    `
    const fsSource = `
      precision highp float;
      uniform vec2  iResolution;
      uniform float iTime;
      uniform vec2  iMouse;
      uniform float uFlowSpeed;
      uniform float uColorIntensity;
      uniform float uNoiseLayers;
      uniform float uMouseInfluence;

      #define MARCH_STEPS 32

      float hash(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
      }

      float fbm(vec3 p) {
        float f = 0.0, amp = 0.5;
        for (int i = 0; i < 8; i++) {
          if (float(i) >= uNoiseLayers) break;
          f += amp * hash(p.xy);
          p *= 2.0; amp *= 0.5;
        }
        return f;
      }

      float map(vec3 p) {
        vec3 q = p;
        q.z += iTime * uFlowSpeed;
        vec2 mouse = (iMouse.xy / iResolution.xy - 0.5) * 2.0;
        q.xy += mouse * uMouseInfluence;
        float f = fbm(q * 2.0);
        f *= sin(p.y * 2.0 + iTime) * 0.5 + 0.5;
        return clamp(f, 0.0, 1.0);
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy - 0.5 * iResolution.xy) / iResolution.y;
        vec3 ro = vec3(0, -1, 0);
        vec3 rd = normalize(vec3(uv, 1.0));
        vec3 col = vec3(0);
        float t = 0.0;
        for (int i = 0; i < MARCH_STEPS; i++) {
          vec3 p = ro + rd * t;
          float density = map(p);
          if (density > 0.0) {
            vec3 aurora = 0.5 + 0.5 * cos(iTime * 0.5 + p.y * 2.0 + vec3(0, 2, 4));
            col += aurora * density * 0.1 * uColorIntensity;
          }
          t += 0.1;
        }
        gl_FragColor = vec4(col, 1.0);
      }
    `

    const compile = (src: string, type: number) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src)
      gl.compileShader(s)
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(s))
        gl.deleteShader(s)
        return null
      }
      return s
    }

    const vs = compile(vsSource, gl.VERTEX_SHADER)
    const fs = compile(fsSource, gl.FRAGMENT_SHADER)
    if (!vs || !fs) return

    const prog = gl.createProgram()!
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(prog))
      return
    }
    gl.useProgram(prog)

    const verts = new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1])
    const buf   = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(prog, "aPosition")
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const uRes   = gl.getUniformLocation(prog, "iResolution")
    const uTime  = gl.getUniformLocation(prog, "iTime")
    const uMouse = gl.getUniformLocation(prog, "iMouse")
    const uFlow  = gl.getUniformLocation(prog, "uFlowSpeed")
    const uCI    = gl.getUniformLocation(prog, "uColorIntensity")
    const uNL    = gl.getUniformLocation(prog, "uNoiseLayers")
    const uMI    = gl.getUniformLocation(prog, "uMouseInfluence")

    const start = performance.now()
    let raf = 0

    const resize = () => {
      canvas.width  = canvas.clientWidth
      canvas.height = canvas.clientHeight
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(uRes, canvas.width, canvas.height)
    }
    window.addEventListener("resize", resize)
    resize()

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mousePos.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top)  / rect.height,
      }
    }
    window.addEventListener("mousemove", onMove, { passive: true })

    const loop = () => {
      if (gl.isContextLost()) return
      gl.uniform1f(uTime,  (performance.now() - start) / 1000)
      gl.uniform2f(uMouse, mousePos.current.x * canvas.width, (1 - mousePos.current.y) * canvas.height)
      gl.uniform1f(uFlow,  flowSpeed)
      gl.uniform1f(uCI,    colorIntensity)
      gl.uniform1f(uNL,    noiseLayers)
      gl.uniform1f(uMI,    mouseInfluence)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
      raf = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMove)
      gl.deleteProgram(prog)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      gl.deleteBuffer(buf)
    }
  }, [flowSpeed, colorIntensity, noiseLayers, mouseInfluence])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    />
  )
}
