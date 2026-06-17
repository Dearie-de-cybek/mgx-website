"use client"

import type React from "react"
import { useEffect, useRef } from "react"

const declarePI = `
#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846
`

const proceduralHash11 = `
  float hash11(float p) {
    p = fract(p * 0.3183099) + 0.1;
    p *= p + 19.19;
    return fract(p * p);
  }
`

const proceduralHash21 = `
  float hash21(vec2 p) {
    p = fract(p * vec2(0.3183099, 0.3678794)) + 0.1;
    p += dot(p, p + 19.19);
    return fract(p.x * p.y);
  }
`

const simplexNoise = `
vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
    -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
      dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
`

const vertexShaderSource = `#version 300 es
precision mediump float;
layout(location = 0) in vec4 a_position;
void main() {
  gl_Position = a_position;
}
`

const fragmentShaderSource = `#version 300 es
precision mediump float;

uniform float u_time;
uniform vec2  u_resolution;
uniform vec4  u_colorBack;
uniform vec4  u_colorFront;
uniform float u_shape;
uniform float u_type;
uniform float u_pxSize;
uniform vec2  u_mouse;

out vec4 fragColor;

${simplexNoise}
${declarePI}
${proceduralHash11}
${proceduralHash21}

float getSimplexNoise(vec2 uv, float t) {
  float noise = .5 * snoise(uv - vec2(0., .3 * t));
  noise += .5 * snoise(2. * uv + vec2(0., .32 * t));
  return noise;
}

const int bayer2x2[4]  = int[4](0,2,3,1);
const int bayer4x4[16] = int[16](0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5);
const int bayer8x8[64] = int[64](
   0,32, 8,40, 2,34,10,42,
  48,16,56,24,50,18,58,26,
  12,44, 4,36,14,46, 6,38,
  60,28,52,20,62,30,54,22,
   3,35,11,43, 1,33, 9,41,
  51,19,59,27,49,17,57,25,
  15,47, 7,39,13,45, 5,37,
  63,31,55,23,61,29,53,21
);

float getBayerValue(vec2 uv, int size) {
  ivec2 pos = ivec2(mod(uv, float(size)));
  int index = pos.y * size + pos.x;
  if (size == 2) return float(bayer2x2[index]) / 4.0;
  else if (size == 4) return float(bayer4x4[index]) / 16.0;
  else if (size == 8) return float(bayer8x8[index]) / 64.0;
  return 0.0;
}

void main() {
  float t = .5 * u_time;
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  uv -= .5;

  float pxSize = u_pxSize;
  vec2 pxSizeUv = gl_FragCoord.xy;
  pxSizeUv -= .5 * u_resolution;
  pxSizeUv /= pxSize;
  vec2 pixelizedUv = floor(pxSizeUv) * pxSize / u_resolution.xy;
  pixelizedUv += .5;
  pixelizedUv -= .5;

  vec2 shape_uv       = pixelizedUv;
  vec2 dithering_uv   = pxSizeUv;
  vec2 ditheringNoise_uv = uv * u_resolution;

  float shape = 0.;

  if (u_shape < 1.5) {
    shape_uv *= .001;
    shape = 0.5 + 0.5 * getSimplexNoise(shape_uv, t);
    shape = smoothstep(0.3, 0.9, shape);
  } else if (u_shape < 2.5) {
    shape_uv *= .003;
    for (float i = 1.0; i < 6.0; i++) {
      shape_uv.x += 0.6 / i * cos(i * 2.5 * shape_uv.y + t);
      shape_uv.y += 0.6 / i * cos(i * 1.5 * shape_uv.x + t);
    }
    shape = .15 / abs(sin(t - shape_uv.y - shape_uv.x));
    shape = smoothstep(0.02, 1., shape);
  } else if (u_shape < 3.5) {
    shape_uv *= .05;
    float stripeIdx = floor(2. * shape_uv.x / TWO_PI);
    float rand = hash11(stripeIdx * 10.);
    rand = sign(rand - .5) * pow(.1 + abs(rand), .4);
    shape = sin(shape_uv.x) * cos(shape_uv.y - 5. * rand * t);
    shape = pow(abs(shape), 6.);
  } else if (u_shape < 4.5) {
    shape_uv *= 4.;
    float wave = cos(.5 * shape_uv.x - 2. * t) * sin(1.5 * shape_uv.x + t) * (.75 + .25 * cos(3. * t));
    shape = 1. - smoothstep(-1., 1., shape_uv.y + wave);
  } else if (u_shape < 5.5) {
    float dist = length(shape_uv);
    float waves = sin(pow(dist, 1.7) * 7. - 3. * t) * .5 + .5;
    shape = waves;
  } else if (u_shape < 6.5) {
    float l = length(shape_uv);
    float angle = 6. * atan(shape_uv.y, shape_uv.x) + 4. * t;
    float twist = 1.2;
    float offset = pow(l, -twist) + angle / TWO_PI;
    float mid = smoothstep(0., 1., pow(l, twist));
    shape = mix(0., fract(offset), mid);
  } else {
    shape_uv *= 2.;
    float d = 1. - pow(length(shape_uv), 2.);
    vec3 pos = vec3(shape_uv, sqrt(max(d, 0.)));

    // Light follows mouse
    float mx = u_mouse.x * 2. - 1.;
    float my = -(u_mouse.y * 2. - 1.);
    vec3 lightPos = normalize(vec3(
      mx * 0.85 + cos(t * 0.35) * 0.12,
      my * 0.65 + 0.28 + sin(t * 0.28) * 0.10,
      0.78
    ));
    float lighting = .5 + .5 * dot(lightPos, pos);

    // Flowing noise drives particle density — two harmonics for organic motion
    float n1 = getSimplexNoise(shape_uv * 2.8, t * 1.4);
    float n2 = getSimplexNoise(shape_uv * 5.2 + vec2(1.7, 3.1), t * 0.9);
    float particles = (n1 * 0.6 + n2 * 0.4) * 0.5 + 0.5;

    // Blend: lighting anchors the sphere form, particles make it move
    shape = (lighting * 0.55 + particles * 0.45) * step(0., d);
    shape = clamp(shape, 0., 1.);
  }

  int type = int(floor(u_type));
  float dithering = 0.0;
  switch (type) {
    case 1: { dithering = step(hash21(ditheringNoise_uv), shape); } break;
    case 2:  dithering = getBayerValue(dithering_uv, 2); break;
    case 3:  dithering = getBayerValue(dithering_uv, 4); break;
    default: dithering = getBayerValue(dithering_uv, 8); break;
  }

  dithering -= .5;
  float res = step(.5, shape + dithering);

  vec3 fgColor   = u_colorFront.rgb * u_colorFront.a;
  float fgOpacity = u_colorFront.a;
  vec3 bgColor   = u_colorBack.rgb * u_colorBack.a;
  float bgOpacity = u_colorBack.a;

  vec3 color  = fgColor * res;
  float opacity = fgOpacity * res;
  color  += bgColor * (1. - opacity);
  opacity += bgOpacity * (1. - opacity);

  fragColor = vec4(color, opacity);
}
`

export const DitheringShapes = {
  simplex: 1, warp: 2, dots: 3, wave: 4, ripple: 5, swirl: 6, sphere: 7,
} as const

export const DitheringTypes = {
  random: 1, "2x2": 2, "4x4": 3, "8x8": 4,
} as const

export type DitheringShape = keyof typeof DitheringShapes
export type DitheringType  = keyof typeof DitheringTypes

interface DitheringShaderProps {
  width?: number
  height?: number
  colorBack?: string
  colorFront?: string
  shape?: DitheringShape
  type?: DitheringType
  pxSize?: number
  speed?: number
  className?: string
  style?: React.CSSProperties
  containerRef?: React.RefObject<HTMLElement | null>
}

function hexToRgba(hex: string): [number, number, number, number] {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!r) return [0, 0, 0, 1]
  return [parseInt(r[1], 16) / 255, parseInt(r[2], 16) / 255, parseInt(r[3], 16) / 255, 1]
}

function createShader(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }
  return shader
}

function createProgram(gl: WebGL2RenderingContext, vs: string, fs: string) {
  const vert = createShader(gl, gl.VERTEX_SHADER, vs)
  const frag = createShader(gl, gl.FRAGMENT_SHADER, fs)
  if (!vert || !frag) return null
  const prog = gl.createProgram()
  if (!prog) return null
  gl.attachShader(prog, vert)
  gl.attachShader(prog, frag)
  gl.linkProgram(prog)
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(prog))
    gl.deleteProgram(prog)
    return null
  }
  return prog
}

export function DitheringShader({
  width = 600,
  height = 600,
  colorBack  = "#000000",
  colorFront = "#ffffff",
  shape  = "sphere",
  type   = "random",
  pxSize = 2,
  speed  = 1,
  className = "",
  style = {},
  containerRef,
}: DitheringShaderProps) {
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const animRef      = useRef<number>(0)
  const programRef   = useRef<WebGLProgram | null>(null)
  const glRef        = useRef<WebGL2RenderingContext | null>(null)
  const locsRef      = useRef<Record<string, WebGLUniformLocation | null>>({})
  const startRef     = useRef<number>(Date.now())
  const mouseRef     = useRef<[number, number]>([0.35, 0.35])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext("webgl2")
    if (!gl) { console.error("WebGL2 not supported"); return }
    glRef.current = gl

    const program = createProgram(gl, vertexShaderSource, fragmentShaderSource)
    if (!program) return
    programRef.current = program

    locsRef.current = {
      u_time:       gl.getUniformLocation(program, "u_time"),
      u_resolution: gl.getUniformLocation(program, "u_resolution"),
      u_colorBack:  gl.getUniformLocation(program, "u_colorBack"),
      u_colorFront: gl.getUniformLocation(program, "u_colorFront"),
      u_shape:      gl.getUniformLocation(program, "u_shape"),
      u_type:       gl.getUniformLocation(program, "u_type"),
      u_pxSize:     gl.getUniformLocation(program, "u_pxSize"),
      u_mouse:      gl.getUniformLocation(program, "u_mouse"),
    }

    const posLoc = gl.getAttribLocation(program, "a_position")
    const posBuf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW)
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    canvas.width  = width
    canvas.height = height
    gl.viewport(0, 0, width, height)

    const render = () => {
      const now  = (Date.now() - startRef.current) * 0.001 * speed
      const ctx  = glRef.current
      const prog = programRef.current
      if (!ctx || !prog) return
      ctx.clear(ctx.COLOR_BUFFER_BIT)
      ctx.useProgram(prog)
      const L = locsRef.current
      if (L.u_time)       ctx.uniform1f(L.u_time, now)
      if (L.u_resolution) ctx.uniform2f(L.u_resolution, width, height)
      if (L.u_colorBack)  ctx.uniform4fv(L.u_colorBack,  hexToRgba(colorBack))
      if (L.u_colorFront) ctx.uniform4fv(L.u_colorFront, hexToRgba(colorFront))
      if (L.u_shape)      ctx.uniform1f(L.u_shape, DitheringShapes[shape])
      if (L.u_type)       ctx.uniform1f(L.u_type,  DitheringTypes[type])
      if (L.u_pxSize)     ctx.uniform1f(L.u_pxSize, pxSize)
      if (L.u_mouse)      ctx.uniform2fv(L.u_mouse, mouseRef.current)
      ctx.drawArrays(ctx.TRIANGLES, 0, 6)
      if (speed !== 0) animRef.current = requestAnimationFrame(render)
    }
    animRef.current = requestAnimationFrame(render)

    // Mouse tracking — on containerRef if provided, else canvas
    const target = containerRef?.current ?? canvas
    const onMove = (e: MouseEvent) => {
      const rect = target.getBoundingClientRect()
      mouseRef.current = [
        (e.clientX - rect.left) / rect.width,
        (e.clientY - rect.top)  / rect.height,
      ]
    }
    target.addEventListener("mousemove", onMove, { passive: true })

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
      if (glRef.current && programRef.current) glRef.current.deleteProgram(programRef.current)
      target.removeEventListener("mousemove", onMove)
    }
  }, [width, height, colorBack, colorFront, shape, type, pxSize, speed, containerRef])

  return (
    <div className={className} style={{ position: "relative", width, height, ...style }}>
      <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
    </div>
  )
}
