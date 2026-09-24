import { useEffect, useRef } from 'react';

// WebGL fluid simulation tuned for a WHITE background.
// Based on the open-source WebGL-Fluid-Simulation by Pavel Dobryakov (MIT).
// Adapted: white clear colour, pastel dye, reduced resolution for mobile,
// touch + idle auto-swirl support, glitter particles, prefers-reduced-motion.

const baseVertexShader = `
precision highp float;
attribute vec2 aPosition;
varying vec2 vUv;
varying vec2 vL;
varying vec2 vR;
varying vec2 vT;
varying vec2 vB;
uniform vec2 texelSize;
void main () {
  vUv = aPosition * 0.5 + 0.5;
  vL = vUv - vec2(texelSize.x, 0.0);
  vR = vUv + vec2(texelSize.x, 0.0);
  vT = vUv + vec2(0.0, texelSize.y);
  vB = vUv - vec2(0.0, texelSize.y);
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const clearShader = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uTexture;
uniform float value;
void main () {
  gl_FragColor = value * texture2D(uTexture, vUv);
}
`;

const splatShader = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uTarget;
uniform float aspectRatio;
uniform vec3 color;
uniform vec2 point;
uniform float radius;
void main () {
  vec2 p = vUv - point.xy;
  p.x *= aspectRatio;
  vec3 splat = exp(-dot(p, p) / radius) * color;
  vec3 base = texture2D(uTarget, vUv).xyz;
  gl_FragColor = vec4(base + splat, 1.0);
}
`;

const advectionShader = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uVelocity;
uniform sampler2D uSource;
uniform vec2 texelSize;
uniform vec2 dyeTexelSize;
uniform float dt;
uniform float dissipation;
void main () {
  vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
  vec4 result = texture2D(uSource, coord);
  float decay = 1.0 + dissipation * dt;
  gl_FragColor = result / decay;
}
`;

const divergenceShader = `
precision highp float;
varying vec2 vUv;
varying vec2 vL;
varying vec2 vR;
varying vec2 vT;
varying vec2 vB;
uniform sampler2D uVelocity;
void main () {
  float L = texture2D(uVelocity, vL).x;
  float R = texture2D(uVelocity, vR).x;
  float T = texture2D(uVelocity, vT).y;
  float B = texture2D(uVelocity, vB).y;
  vec2 C = texture2D(uVelocity, vUv).xy;
  if (vL.x < 0.0) L = -C.x;
  if (vR.x > 1.0) R = -C.x;
  if (vT.y > 1.0) T = -C.y;
  if (vB.y < 0.0) B = -C.y;
  float div = 0.5 * (R - L + T - B);
  gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
}
`;

const curlShader = `
precision highp float;
varying vec2 vUv;
varying vec2 vL;
varying vec2 vR;
varying vec2 vT;
varying vec2 vB;
uniform sampler2D uVelocity;
void main () {
  float L = texture2D(uVelocity, vL).y;
  float R = texture2D(uVelocity, vR).y;
  float T = texture2D(uVelocity, vT).x;
  float B = texture2D(uVelocity, vB).x;
  float vorticity = R - L - T + B;
  gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
}
`;

const vorticityShader = `
precision highp float;
varying vec2 vUv;
varying vec2 vL;
varying vec2 vR;
varying vec2 vT;
varying vec2 vB;
uniform sampler2D uVelocity;
uniform sampler2D uCurl;
uniform float curl;
uniform float dt;
void main () {
  float L = texture2D(uCurl, vL).x;
  float R = texture2D(uCurl, vR).x;
  float T = texture2D(uCurl, vT).x;
  float B = texture2D(uCurl, vB).x;
  float C = texture2D(uCurl, vUv).x;
  vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
  force /= length(force) + 0.0001;
  force *= curl * C;
  force.y *= -1.0;
  vec2 vel = texture2D(uVelocity, vUv).xy;
  vel += force * dt;
  vel = min(max(vel, -1000.0), 1000.0);
  gl_FragColor = vec4(vel, 0.0, 1.0);
}
`;

const pressureShader = `
precision highp float;
varying vec2 vUv;
varying vec2 vL;
varying vec2 vR;
varying vec2 vT;
varying vec2 vB;
uniform sampler2D uPressure;
uniform sampler2D uDivergence;
void main () {
  float L = texture2D(uPressure, vL).x;
  float R = texture2D(uPressure, vR).x;
  float T = texture2D(uPressure, vT).x;
  float B = texture2D(uPressure, vB).x;
  float C = texture2D(uPressure, vUv).x;
  float divergence = texture2D(uDivergence, vUv).x;
  float pressure = (L + R + B + T - divergence) * 0.25;
  gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
}
`;

const gradientSubtractShader = `
precision highp float;
varying vec2 vUv;
varying vec2 vL;
varying vec2 vR;
varying vec2 vT;
varying vec2 vB;
uniform sampler2D uPressure;
uniform sampler2D uVelocity;
void main () {
  float L = texture2D(uPressure, vL).x;
  float R = texture2D(uPressure, vR).x;
  float T = texture2D(uPressure, vT).x;
  float B = texture2D(uPressure, vB).x;
  vec2 velocity = texture2D(uVelocity, vUv).xy;
  velocity.xy -= vec2(R - L, T - B);
  gl_FragColor = vec4(velocity, 0.0, 1.0);
}
`;

const displayShader = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uTexture;
void main () {
  vec3 c = texture2D(uTexture, vUv).rgb;
  float density = clamp(max(max(c.r, c.g), c.b), 0.0, 1.0);
  vec3 ink = c / max(density, 0.0001);
  float a = density * 0.8;
  gl_FragColor = vec4(ink * a, a);
}
`;

interface FBO {
  texture: WebGLTexture;
  fbo: WebGLFramebuffer;
  width: number;
  height: number;
  texelSizeX: number;
  texelSizeY: number;
}

interface DoubleFBO {
  width: number;
  height: number;
  texelSizeX: number;
  texelSizeY: number;
  read: FBO;
  write: FBO;
  swap(): void;
}

function compileShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null!;
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext, vsSource: string, fsSource: string): WebGLProgram {
  const vs = compileShader(gl, gl.VERTEX_SHADER, vsSource);
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, fsSource);
  const program = gl.createProgram()!;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null!;
  return program;
}

function getUniforms(gl: WebGLRenderingContext, program: WebGLProgram): Record<string, WebGLUniformLocation> {
  const uniforms: Record<string, WebGLUniformLocation> = {};
  const count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
  for (let i = 0; i < count; i++) {
    const info = gl.getActiveUniform(program, i)!;
    uniforms[info.name] = gl.getUniformLocation(program, info.name)!;
  }
  return uniforms;
}

class Program {
  constructor(public gl: WebGLRenderingContext, public program: WebGLProgram, public uniforms: Record<string, WebGLUniformLocation>) {}
  bind() { this.gl.useProgram(this.program); }
}

function createFBO(gl: WebGLRenderingContext, w: number, h: number, internalFormat: number, format: number, type: number, param: number): FBO {
  gl.activeTexture(gl.TEXTURE0);
  const texture = gl.createTexture()!;
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);

  const fbo = gl.createFramebuffer()!;
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
  gl.viewport(0, 0, w, h);

  return { texture, fbo, width: w, height: h, texelSizeX: 1 / w, texelSizeY: 1 / h };
}

function createDoubleFBO(gl: WebGLRenderingContext, w: number, h: number, internalFormat: number, format: number, type: number, param: number): DoubleFBO {
  let read = createFBO(gl, w, h, internalFormat, format, type, param);
  let write = createFBO(gl, w, h, internalFormat, format, type, param);
  return {
    width: w, height: h, texelSizeX: 1 / w, texelSizeY: 1 / h,
    read, write,
    swap() { const t = read; read = write; write = t; },
  };
}

// Pastel dye colours (saturation ~0.35, brightness 1.0)
const pastelColors: [number, number, number][] = [
  [1.0, 0.9, 0.4],   // yellow
  [1.0, 0.75, 0.5], // orange
  [1.0, 0.6, 0.7],  // pink
  [0.8, 0.6, 1.0],  // purple
  [0.5, 0.75, 1.0], // blue
  [0.6, 0.95, 0.7], // green
];

interface Glitter {
  x: number; y: number; vx: number; vy: number;
  life: number; maxLife: number; size: number; type: number; color: string;
}

export default function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glitterCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const glitterCanvas = glitterCanvasRef.current;
    if (!canvas || !glitterCanvas) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: false, depth: false, stencil: false });
    if (!gl) return;

    const isMobile = window.innerWidth < 768;
    const simRes = isMobile ? 128 : 256;
    const dyeRes = isMobile ? 512 : 1024;

    // Extensions
    const halfFloat = gl.getExtension('OES_texture_half_float');
    gl.getExtension('OES_texture_half_float_linear');
    gl.getExtension('EXT_color_buffer_half_float');
    const halfFloatType = halfFloat ? halfFloat.HALF_FLOAT_OES : gl.UNSIGNED_BYTE;

    // Setup programs
    const programs = {
      clear: new Program(gl, createProgram(gl, baseVertexShader, clearShader), getUniforms(gl, createProgram(gl, baseVertexShader, clearShader))),
      splat: new Program(gl, createProgram(gl, baseVertexShader, splatShader), getUniforms(gl, createProgram(gl, baseVertexShader, splatShader))),
      advection: new Program(gl, createProgram(gl, baseVertexShader, advectionShader), getUniforms(gl, createProgram(gl, baseVertexShader, advectionShader))),
      divergence: new Program(gl, createProgram(gl, baseVertexShader, divergenceShader), getUniforms(gl, createProgram(gl, baseVertexShader, divergenceShader))),
      curl: new Program(gl, createProgram(gl, baseVertexShader, curlShader), getUniforms(gl, createProgram(gl, baseVertexShader, curlShader))),
      vorticity: new Program(gl, createProgram(gl, baseVertexShader, vorticityShader), getUniforms(gl, createProgram(gl, baseVertexShader, vorticityShader))),
      pressure: new Program(gl, createProgram(gl, baseVertexShader, pressureShader), getUniforms(gl, createProgram(gl, baseVertexShader, pressureShader))),
      gradient: new Program(gl, createProgram(gl, baseVertexShader, gradientSubtractShader), getUniforms(gl, createProgram(gl, baseVertexShader, gradientSubtractShader))),
      display: new Program(gl, createProgram(gl, baseVertexShader, displayShader), getUniforms(gl, createProgram(gl, baseVertexShader, displayShader))),
    };

    // Fullscreen quad
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(0);

    // Framebuffers
    let velocity = createDoubleFBO(gl, simRes, simRes, gl.RGBA, gl.RGBA, halfFloatType, gl.LINEAR);
    let dye = createDoubleFBO(gl, dyeRes, dyeRes, gl.RGBA, gl.RGBA, halfFloatType, gl.LINEAR);
    let pressure = createDoubleFBO(gl, simRes, simRes, gl.RGBA, gl.RGBA, halfFloatType, gl.NEAREST);
    let divergence = createFBO(gl, simRes, simRes, gl.RGBA, gl.RGBA, halfFloatType, gl.NEAREST);
    let curlFBO = createFBO(gl, simRes, simRes, gl.RGBA, gl.RGBA, halfFloatType, gl.NEAREST);

    gl.bindFramebuffer(gl.FRAMEBUFFER, dye.read.fbo);
    if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
      canvas.style.display = 'none'; // device can't run the effect: keep the plain gradient
      return;
    }

    function blit() {
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(0);
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    }

    function resize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      glitterCanvas.width = Math.floor(w * dpr);
      glitterCanvas.height = Math.floor(h * dpr);
      glitterCanvas.style.width = w + 'px';
      glitterCanvas.style.height = h + 'px';
    }
    resize();
    window.addEventListener('resize', resize);

    // Clear (zero ink = transparent, so the page gradient shows through)
    function clearToWhite(target: FBO) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
      gl.viewport(0, 0, target.width, target.height);
      programs.clear.bind();
      gl.uniform1i(programs.clear.uniforms.uTexture, 0);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, target.texture);
      gl.uniform1f(programs.clear.uniforms.value, 0.0);
      blit();
    }
    clearToWhite(dye.read);
    clearToWhite(velocity.read);

    // Config
    const config = {
      DENSITY_DISSIPATION: 0.98,
      VELOCITY_DISSIPATION: 0.98,
      CURL: isMobile ? 25 : 30,
      SPLAT_RADIUS: 0.25,
      SPLAT_FORCE: 6000,
      PRESSURE: 0.8,
      PRESSURE_ITERATIONS: 20,
    };

    function splat(x: number, y: number, dx: number, dy: number, color: [number, number, number]) {
      programs.splat.bind();
      gl.uniform1i(programs.splat.uniforms.uTarget, 0);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, velocity.read.texture);
      gl.uniform1f(programs.splat.uniforms.aspectRatio, canvas.width / canvas.height);
      gl.uniform2f(programs.splat.uniforms.point, x, y);
      gl.uniform3f(programs.splat.uniforms.color, dx, dy, 0.0);
      gl.uniform1f(programs.splat.uniforms.radius, Math.min(config.SPLAT_RADIUS, 0.25));
      gl.viewport(0, 0, velocity.width, velocity.height);
      blit();
      gl.bindFramebuffer(gl.FRAMEBUFFER, velocity.write.fbo);
      velocity.swap();

      gl.bindTexture(gl.TEXTURE_2D, dye.read.texture);
      gl.uniform3f(programs.splat.uniforms.color, color[0], color[1], color[2]);
      gl.viewport(0, 0, dye.width, dye.height);
      blit();
      gl.bindFramebuffer(gl.FRAMEBUFFER, dye.write.fbo);
      dye.swap();
    }

    function step(dt: number) {
      gl.disable(gl.BLEND);

      // Curl
      programs.curl.bind();
      gl.uniform1i(programs.curl.uniforms.uVelocity, 0);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, velocity.read.texture);
      gl.viewport(0, 0, curlFBO.width, curlFBO.height);
      blit();

      // Vorticity
      programs.vorticity.bind();
      gl.uniform1i(programs.vorticity.uniforms.uVelocity, 0);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, velocity.read.texture);
      gl.uniform1i(programs.vorticity.uniforms.uCurl, 1);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, curlFBO.texture);
      gl.uniform1f(programs.vorticity.uniforms.curl, config.CURL);
      gl.uniform1f(programs.vorticity.uniforms.dt, dt);
      gl.viewport(0, 0, velocity.width, velocity.height);
      blit();
      gl.bindFramebuffer(gl.FRAMEBUFFER, velocity.write.fbo);
      velocity.swap();

      // Divergence
      programs.divergence.bind();
      gl.uniform1i(programs.divergence.uniforms.uVelocity, 0);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, velocity.read.texture);
      gl.viewport(0, 0, divergence.width, divergence.height);
      blit();

      // Clear pressure
      clearToWhite(pressure.read);

      // Pressure iterations
      programs.pressure.bind();
      gl.uniform1i(programs.pressure.uniforms.uDivergence, 0);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, divergence.texture);
      for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
        gl.bindTexture(gl.TEXTURE_2D, pressure.read.texture);
        gl.uniform1i(programs.pressure.uniforms.uPressure, 0);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, pressure.read.texture);
        gl.viewport(0, 0, pressure.width, pressure.height);
        blit();
        gl.bindFramebuffer(gl.FRAMEBUFFER, pressure.write.fbo);
        pressure.swap();
      }

      // Gradient subtract
      programs.gradient.bind();
      gl.uniform1i(programs.gradient.uniforms.uPressure, 0);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, pressure.read.texture);
      gl.uniform1i(programs.gradient.uniforms.uVelocity, 1);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, velocity.read.texture);
      gl.viewport(0, 0, velocity.width, velocity.height);
      blit();
      gl.bindFramebuffer(gl.FRAMEBUFFER, velocity.write.fbo);
      velocity.swap();

      // Advect velocity
      programs.advection.bind();
      gl.uniform1i(programs.advection.uniforms.uVelocity, 0);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, velocity.read.texture);
      gl.uniform1i(programs.advection.uniforms.uSource, 1);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, velocity.read.texture);
      gl.uniform2f(programs.advection.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform2f(programs.advection.uniforms.dyeTexelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1f(programs.advection.uniforms.dt, dt);
      gl.uniform1f(programs.advection.uniforms.dissipation, config.VELOCITY_DISSIPATION);
      gl.viewport(0, 0, velocity.width, velocity.height);
      blit();
      gl.bindFramebuffer(gl.FRAMEBUFFER, velocity.write.fbo);
      velocity.swap();

      // Advect dye
      gl.uniform1i(programs.advection.uniforms.uVelocity, 0);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, velocity.read.texture);
      gl.uniform1i(programs.advection.uniforms.uSource, 1);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, dye.read.texture);
      gl.uniform2f(programs.advection.uniforms.dyeTexelSize, dye.texelSizeX, dye.texelSizeY);
      gl.uniform1f(programs.advection.uniforms.dissipation, config.DENSITY_DISSIPATION);
      gl.viewport(0, 0, dye.width, dye.height);
      blit();
      gl.bindFramebuffer(gl.FRAMEBUFFER, dye.write.fbo);
      dye.swap();
    }

    function render() {
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, canvas.width, canvas.height);
      programs.display.bind();
      gl.uniform1i(programs.display.uniforms.uTexture, 0);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, dye.read.texture);
      gl.disable(gl.BLEND);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      blit();
    }

    // Input handling
    let pointers: { x: number; y: number; dx: number; dy: number; color: [number, number, number]; down: boolean; moved: boolean; }[] = [];
    function newPointer(): { x: number; y: number; dx: number; dy: number; color: [number, number, number]; down: boolean; moved: boolean } {
      const c = pastelColors[Math.floor(Math.random() * pastelColors.length)];
      return { x: 0, y: 0, dx: 0, dy: 0, color: c, down: false, moved: false };
    }
    pointers.push(newPointer());

    let lastTime = performance.now();
    let idleTimer = 0;
    let isIdle = true;
    let isVisible = true;

    function randomSplat() {
      const c = pastelColors[Math.floor(Math.random() * pastelColors.length)];
      const x = 0.2 + Math.random() * 0.6;
      const y = 0.2 + Math.random() * 0.6;
      const dx = (Math.random() - 0.5) * 1500;
      const dy = (Math.random() - 0.5) * 1500;
      splat(x, y, dx, dy, c);
    }

    // Glitter
    const gctx = glitterCanvas.getContext('2d')!;
    const glitter: Glitter[] = [];

    function spawnGlitter(x: number, y: number, count: number, burst: boolean) {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = burst ? 2 + Math.random() * 4 : 0.5 + Math.random() * 2;
        const colors = ['#E0A800', '#FFFFFF', '#F5CC4E', '#FDF0C3', '#FDF1F7'];
        glitter.push({
          x: x * glitterCanvas.width,
          y: y * glitterCanvas.height,
          vx: Math.cos(angle) * speed * (burst ? 3 : 1),
          vy: Math.sin(angle) * speed * (burst ? 3 : 1) - 1,
          life: 1,
          maxLife: burst ? 1.5 + Math.random() : 0.5 + Math.random() * 0.5,
          size: burst ? 2 + Math.random() * 4 : 1 + Math.random() * 2,
          type: Math.random() > 0.5 ? 0 : 1,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    }

    function drawGlitter(dt: number) {
      gctx.clearRect(0, 0, glitterCanvas.width, glitterCanvas.height);
      for (let i = glitter.length - 1; i >= 0; i--) {
        const g = glitter[i];
        g.x += g.vx;
        g.y += g.vy;
        g.vy += 0.05;
        g.life -= dt / (g.maxLife * 1000);
        if (g.life <= 0) {
          glitter.splice(i, 1);
          continue;
        }
        gctx.save();
        gctx.globalAlpha = Math.max(0, g.life);
        gctx.fillStyle = g.color;
        gctx.translate(g.x, g.y);
        if (g.type === 0) {
          // 4-point star
          gctx.beginPath();
          const s = g.size;
          gctx.moveTo(0, -s);
          gctx.lineTo(s * 0.3, -s * 0.3);
          gctx.lineTo(s, 0);
          gctx.lineTo(s * 0.3, s * 0.3);
          gctx.lineTo(0, s);
          gctx.lineTo(-s * 0.3, s * 0.3);
          gctx.lineTo(-s, 0);
          gctx.lineTo(-s * 0.3, -s * 0.3);
          gctx.closePath();
          gctx.fill();
        } else {
          gctx.beginPath();
          gctx.arc(0, 0, g.size, 0, Math.PI * 2);
          gctx.fill();
        }
        gctx.restore();
      }
    }

    function update() {
      if (!isVisible) return;
      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.016);
      lastTime = now;

      // Idle auto-swirl every ~4 seconds
      idleTimer += dt;
      if (isIdle && idleTimer > 4) {
        idleTimer = 0;
        randomSplat();
        const x = 0.2 + Math.random() * 0.6;
        const y = 0.2 + Math.random() * 0.6;
        spawnGlitter(x, y, 8, false);
      }

      // Process pointer splats
      for (const p of pointers) {
        if (p.moved) {
          p.moved = false;
          splat(p.x, p.y, p.dx * config.SPLAT_FORCE, p.dy * config.SPLAT_FORCE, p.color);
          if (Math.abs(p.dx) + Math.abs(p.dy) > 2) {
            spawnGlitter(p.x, p.y, 3, false);
          }
        }
      }

      step(dt);
      render();
      drawGlitter(dt * 1000);
      requestAnimationFrame(update);
    }
    requestAnimationFrame(update);

    // Mouse events
    function handleMove(clientX: number, clientY: number, isTouch: boolean) {
      const p = pointers[0];
      const x = clientX / window.innerWidth;
      const y = 1.0 - clientY / window.innerHeight;
      p.dx = (x - p.x) * (isTouch ? 8 : 6);
      p.dy = (y - p.y) * (isTouch ? 8 : 6);
      p.x = x;
      p.y = y;
      p.moved = true;
      p.down = true;
      isIdle = false;
      idleTimer = 0;
    }

    function handleDown(clientX: number, clientY: number) {
      const p = pointers[0];
      p.x = clientX / window.innerWidth;
      p.y = 1.0 - clientY / window.innerHeight;
      p.color = pastelColors[Math.floor(Math.random() * pastelColors.length)];
      splat(p.x, p.y, 0, 0, p.color);
      spawnGlitter(p.x, p.y, 20, true);
      isIdle = false;
      idleTimer = 0;
    }

    function onMouseMove(e: MouseEvent) {
      handleMove(e.clientX, e.clientY, false);
    }
    function onMouseDown(e: MouseEvent) {
      handleDown(e.clientX, e.clientY);
    }
    function onTouchMove(e: TouchEvent) {
      if (e.touches.length > 0) {
        e.preventDefault();
        handleMove(e.touches[0].clientX, e.touches[0].clientY, true);
      }
    }
    function onTouchStart(e: TouchEvent) {
      if (e.touches.length > 0) {
        handleDown(e.touches[0].clientX, e.touches[0].clientY);
      }
    }
    function onIdle() {
      isIdle = true;
      idleTimer = 3.5;
    }

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onIdle);
    window.addEventListener('mouseleave', onIdle);

    document.addEventListener('visibilitychange', () => {
      isVisible = !document.hidden;
      if (isVisible) {
        lastTime = performance.now();
        requestAnimationFrame(update);
      }
    });

    // Cleanup
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onIdle);
      window.removeEventListener('mouseleave', onIdle);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0, background: 'transparent' }}
      />
      <canvas
        ref={glitterCanvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      />
    </>
  );
}
