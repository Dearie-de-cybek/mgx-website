"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function WebGLShader({ className = "absolute top-0 left-0 w-full h-full block" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const refs = useRef<{
    scene: THREE.Scene | null
    camera: THREE.OrthographicCamera | null
    renderer: THREE.WebGLRenderer | null
    mesh: THREE.Mesh | null
    uniforms: Record<string, { value: unknown }> | null
    animationId: number | null
  }>({
    scene: null, camera: null, renderer: null,
    mesh: null, uniforms: null, animationId: null,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const r = refs.current

    const vertexShader = `
      attribute vec3 position;
      void main() { gl_Position = vec4(position, 1.0); }
    `
    const fragmentShader = `
      precision highp float;
      uniform vec2  resolution;
      uniform float time;
      uniform float xScale;
      uniform float yScale;
      uniform float distortion;

      void main() {
        vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
        float d  = length(p) * distortion;
        float rx = p.x * (1.0 + d);
        float gx = p.x;
        float bx = p.x * (1.0 - d);
        float red   = 0.05 / abs(p.y + sin((rx + time) * xScale) * yScale);
        float green = 0.05 / abs(p.y + sin((gx + time) * xScale) * yScale);
        float blue  = 0.05 / abs(p.y + sin((bx + time) * xScale) * yScale);
        gl_FragColor = vec4(red, green, blue, 1.0);
      }
    `

    r.scene    = new THREE.Scene()
    r.renderer = new THREE.WebGLRenderer({ canvas, antialias: false })
    r.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    r.renderer.setClearColor(new THREE.Color(0x000000))
    r.camera   = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, -1)

    r.uniforms = {
      resolution:  { value: [window.innerWidth, window.innerHeight] },
      time:        { value: 0.0 },
      xScale:      { value: 1.0 },
      yScale:      { value: 0.5 },
      distortion:  { value: 0.05 },
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute("position", new THREE.BufferAttribute(
      new Float32Array([-1,-1,0, 1,-1,0, -1,1,0, 1,-1,0, -1,1,0, 1,1,0]), 3
    ))

    r.mesh = new THREE.Mesh(geometry, new THREE.RawShaderMaterial({
      vertexShader, fragmentShader, uniforms: r.uniforms, side: THREE.DoubleSide,
    }))
    r.scene.add(r.mesh)

    const resize = () => {
      if (!r.renderer || !r.uniforms) return
      r.renderer.setSize(window.innerWidth, window.innerHeight, false)
      r.uniforms.resolution.value = [window.innerWidth, window.innerHeight]
    }
    resize()
    window.addEventListener("resize", resize)

    const animate = () => {
      if (r.uniforms) (r.uniforms.time.value as number)
      if (r.uniforms) r.uniforms.time.value = (r.uniforms.time.value as number) + 0.01
      r.renderer?.render(r.scene!, r.camera!)
      r.animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      if (r.animationId) cancelAnimationFrame(r.animationId)
      window.removeEventListener("resize", resize)
      r.mesh?.geometry.dispose()
      if (r.mesh?.material instanceof THREE.Material) r.mesh.material.dispose()
      r.renderer?.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className={className} />
}
