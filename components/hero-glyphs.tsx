'use client';

import { useEffect, useRef } from 'react';

// Redraws the homepage hero photo as a grid of monospace glyphs. Each cell
// takes its colour from the photo beneath it and a denser glyph where the
// photo is brighter. Drifting patches "decode" into code characters, and the
// pointer magnifies and decodes the cells around it. The blue sky (from a
// precomputed mask) and the area around the hero text stay clear.

const imageSrc = '/background.jpg';
const skyMaskSrc = '/hero-sky-mask.png';
// The hero background is `center 48% / cover`; keep these in step with CSS.
const imagePosition = { x: 0.5, y: 0.48 };

// Light to dense, indexed by brightness. Index 0 is never drawn.
const rampGlyphs = [
  ' ',
  '.',
  ':',
  '-',
  '+',
  '*',
  'c',
  'o',
  'e',
  '3',
  '2',
  '8',
  '#',
];
const codeGlyphs = [
  '0',
  '1',
  '{',
  '}',
  '<',
  '>',
  '/',
  '=',
  ';',
  '(',
  ')',
  '[',
  ']',
  '$',
  '#',
  '+',
];

const vertexSource = `#version 300 es
in vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

const noiseSource = `
uint pcg(uint v) {
  uint state = v * 747796405u + 2891336453u;
  uint word = ((state >> ((state >> 28u) + 4u)) ^ state) * 277803737u;
  return (word >> 22u) ^ word;
}
float hash(vec2 cell, uint salt) {
  uvec2 c = uvec2(ivec2(cell) + 32768);
  return float(pcg(c.x ^ pcg(c.y ^ pcg(salt)))) / 4294967295.0;
}
float hash3(vec3 p) {
  uvec3 q = uvec3(ivec3(floor(p)) + 65536);
  return float(pcg(q.x ^ pcg(q.y ^ pcg(q.z)))) / 4294967295.0;
}
float vnoise(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(hash3(i), hash3(i + vec3(1, 0, 0)), f.x),
        mix(hash3(i + vec3(0, 1, 0)), hash3(i + vec3(1, 1, 0)), f.x), f.y),
    mix(mix(hash3(i + vec3(0, 0, 1)), hash3(i + vec3(1, 0, 1)), f.x),
        mix(hash3(i + vec3(0, 1, 1)), hash3(i + vec3(1, 1, 1)), f.x), f.y),
    f.z);
}
float fbm(vec3 p) {
  float a = vnoise(p);
  p = vec3(mat2(0.8, 0.6, -0.6, 0.8) * p.xy * 2.0 + 19.1, p.z * 1.5 + 7.3);
  return (a + 0.5 * vnoise(p)) / 1.5;
}`;

// One texel per glyph cell: where the drifting "decode" patches are.
const flowSource = `#version 300 es
precision highp float;
precision highp int;
uniform vec2 uGrid;
uniform vec2 uCellCss;
uniform float uTime;
out vec4 outColor;
${noiseSource}
void main() {
  vec2 cell = vec2(floor(gl_FragCoord.x), uGrid.y - 1.0 - floor(gl_FragCoord.y));
  vec2 css = (cell + 0.5) * uCellCss;
  float unit = min(uGrid.x * uCellCss.x, uGrid.y * uCellCss.y);
  vec3 p = vec3(css / unit * 2.4 + vec2(0.0, uTime * 0.045), uTime * 0.06);
  vec2 warp = vec2(fbm(p), fbm(p + vec3(5.2, 1.3, 3.1))) - 0.5;
  float drift = fbm(p + vec3(warp * 1.6, 0.0));
  outColor = vec4(smoothstep(0.53, 0.63, drift), 0.0, 0.0, 1.0);
}`;

const glyphSource = `#version 300 es
precision highp float;
precision highp int;
uniform sampler2D uImage;
uniform sampler2D uSky;
uniform sampler2D uAtlas;
uniform sampler2D uFlow;
uniform vec2 uResolution;
uniform float uDpr;
uniform vec2 uCellPx;
uniform vec2 uGrid;
uniform vec4 uImageRect;
uniform vec2 uImageSize;
uniform float uRampCount;
uniform float uCodeCount;
uniform float uTime;
uniform vec4 uQuietRect;
uniform float uQuietFade;
uniform vec3 uPointer;
uniform float uLensRadius;
out vec4 outColor;
const vec3 LUMA = vec3(0.2126, 0.7152, 0.0722);
${noiseSource}
void main() {
  vec2 frag = vec2(gl_FragCoord.x, uResolution.y - gl_FragCoord.y);
  vec2 css = frag / uDpr;

  // The lens pulls cells toward the pointer, so they read slightly larger.
  float lens = 0.0;
  vec2 warped = css;
  if (uPointer.z > 0.0) {
    vec2 d = css - uPointer.xy;
    lens = (1.0 - smoothstep(0.0, 1.0, length(d) / uLensRadius)) * uPointer.z;
    warped = uPointer.xy + d * (1.0 - 0.24 * lens * lens);
  }

  vec2 device = warped * uDpr;
  vec2 cell = floor(device / uCellPx);
  vec2 local = clamp((device - cell * uCellPx) / uCellPx, 0.5 / uCellPx, 1.0 - 0.5 / uCellPx);
  vec2 centre = (cell + 0.5) * uCellPx / uDpr;

  vec2 uv = (centre - uImageRect.xy) / uImageRect.zw;
  if (any(lessThan(uv, vec2(0.0))) || any(greaterThan(uv, vec2(1.0)))) discard;
  if (texture(uSky, uv).r > 0.5) discard;

  float texels = (uCellPx.x / uDpr) * uImageSize.x / uImageRect.z;
  vec3 colour = textureLod(uImage, uv, log2(max(texels, 1.0))).rgb;
  float lum = dot(colour, LUMA);

  // Thin the grid out around the hero text so it stays legible.
  vec2 outside = max(max(uQuietRect.xy - centre, centre - (uQuietRect.xy + uQuietRect.zw)), 0.0);
  float away = smoothstep(0.0, uQuietFade, length(outside));
  if (hash(cell, 11u) > away) discard;
  // Dark areas keep only a sparse scatter of glyphs.
  if (hash(cell, 9u) > mix(0.3, 1.0, smoothstep(0.03, 0.32, lum))) discard;

  float steps = uRampCount - 1.0;
  // Every cell picks a new glyph of similar density on its own slow beat, so
  // the whole grid shimmers while keeping the photo's light and dark areas.
  float shimmer = floor(uTime / mix(0.35, 0.9, hash(cell, 21u)) + 10.0 * hash(cell, 22u));
  float offset = floor(hash(cell + vec2(shimmer * 13.0, shimmer * 7.0), 23u) * 3.0) - 1.0;
  float position = pow(lum, 0.85) * steps + (hash(cell, 1u) - 0.5) * 1.2 + offset + 2.5 * lens;
  float glyph = clamp(floor(position) + 1.0, 1.0, steps);

  ivec2 flowCell = clamp(ivec2(int(cell.x), int(uGrid.y - 1.0 - cell.y)), ivec2(0), ivec2(uGrid) - 1);
  float flow = texelFetch(uFlow, flowCell, 0).r * step(hash(cell, 5u), 0.85);
  float energy = max(flow, lens) * away;
  if (energy > hash(cell, 7u)) {
    // Each decoding cell flips to a new code character on its own beat.
    float beat = floor(uTime / mix(0.09, 0.16, hash(cell, 3u)) + 8.0 * hash(cell, 4u));
    glyph = uRampCount + floor(hash(cell + vec2(beat * 17.0, beat * 5.0), 13u) * uCodeCount);
  }

  float coverage = texture(uAtlas, vec2((glyph + local.x) / (uRampCount + uCodeCount), local.y)).a;
  if (coverage <= 0.0) discard;

  vec3 hue = mix(vec3(1.0), colour / max(lum, 0.08), 0.6);
  float amount = mix(0.42, 0.82, smoothstep(0.08, 0.8, lum)) * (1.0 + 0.7 * energy);
  vec3 glow = clamp(hue * amount, 0.0, 1.0);
  outColor = vec4(glow * coverage, coverage);
}`;

function compile(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function link(gl: WebGL2RenderingContext, fragmentSource: string) {
  const vertex = compile(gl, gl.VERTEX_SHADER, vertexSource);
  const fragment = compile(gl, gl.FRAGMENT_SHADER, fragmentSource);
  const program = gl.createProgram();
  if (!vertex || !fragment || !program) return null;
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.bindAttribLocation(program, 0, 'aPosition');
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);
  return gl.getProgramParameter(program, gl.LINK_STATUS) ? program : null;
}

// Lives outside the component: the React compiler reads any `use…` call
// inside a component as a hook, including WebGL's `useProgram`.
function activate(gl: WebGL2RenderingContext, program: WebGLProgram) {
  gl.useProgram(program);
}

function uniforms(gl: WebGL2RenderingContext, program: WebGLProgram) {
  const cache = new Map<string, WebGLUniformLocation | null>();
  return (name: string) => {
    if (!cache.has(name)) cache.set(name, gl.getUniformLocation(program, name));
    return cache.get(name) ?? null;
  };
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.decoding = 'async';
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

function texture(
  gl: WebGL2RenderingContext,
  unit: number,
  source: TexImageSource,
  mipmaps: boolean,
) {
  const handle = gl.createTexture();
  gl.activeTexture(gl.TEXTURE0 + unit);
  gl.bindTexture(gl.TEXTURE_2D, handle);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  if (mipmaps) {
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(
      gl.TEXTURE_2D,
      gl.TEXTURE_MIN_FILTER,
      gl.LINEAR_MIPMAP_LINEAR,
    );
  } else {
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  }
  return handle;
}

// One row of glyphs, each drawn centred in a cell the size of a grid cell.
function drawAtlas(cellWidth: number, cellHeight: number, family: string) {
  const glyphs = [...rampGlyphs, ...codeGlyphs];
  const canvas = document.createElement('canvas');
  canvas.width = cellWidth * glyphs.length;
  canvas.height = cellHeight;
  const context = canvas.getContext('2d');
  if (!context) return canvas;
  context.fillStyle = 'white';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.font = `600 ${Math.round(cellHeight * 0.86)}px ${family}`;
  glyphs.forEach((glyph, index) => {
    context.fillText(glyph, (index + 0.5) * cellWidth, cellHeight * 0.54);
  });
  return canvas;
}

export function HeroGlyphs() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = canvas?.parentElement;
    if (!canvas || !hero) return;

    const gl = canvas.getContext('webgl2', {
      alpha: true,
      antialias: false,
      premultipliedAlpha: true,
    });
    if (!gl) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    let disposed = false;
    let frame = 0;
    let visible = true;
    let lastDraw = 0;
    let quietTimer = 0;
    const startedAt = performance.now();
    // The lens eases in and out rather than snapping on and off.
    const pointer = { x: 0, y: 0, presence: 0, target: 0 };

    const glyphProgram = link(gl, glyphSource);
    const flowProgram = link(gl, flowSource);
    if (!glyphProgram || !flowProgram) return;
    const glyphUniform = uniforms(gl, glyphProgram);
    const flowUniform = uniforms(gl, flowProgram);

    const quad = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    const flowTexture = gl.createTexture();
    const flowBuffer = gl.createFramebuffer();
    let atlasTexture: WebGLTexture | null = null;
    let fontFamily = 'monospace';

    const layout = {
      dpr: 1,
      width: 0,
      height: 0,
      cellPx: [0, 0],
      grid: [0, 0],
      imageRect: [0, 0, 0, 0],
      imageSize: [0, 0],
      quiet: [0, 0, 0, 0],
    };

    function measureQuiet() {
      const heroBox = hero!.getBoundingClientRect();
      const parts = hero!.querySelectorAll(
        '.hero-copy h1, .hero-kicker, .hero-copy .button',
      );
      let left = Infinity;
      let top = Infinity;
      let right = -Infinity;
      let bottom = -Infinity;
      parts.forEach((part) => {
        const box = part.getBoundingClientRect();
        left = Math.min(left, box.left);
        top = Math.min(top, box.top);
        right = Math.max(right, box.right);
        bottom = Math.max(bottom, box.bottom);
      });
      if (left === Infinity) return;
      const pad = 18;
      layout.quiet = [
        left - heroBox.left - pad,
        top - heroBox.top - pad,
        right - left + pad * 2,
        bottom - top + pad * 2,
      ];
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = hero!.clientWidth;
      const height = hero!.clientHeight;
      const small = width < 640;
      const cellCss = small ? [6, 9] : [8, 12];
      const cellPx = [
        Math.round(cellCss[0] * dpr),
        Math.round(cellCss[1] * dpr),
      ];

      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      layout.dpr = dpr;
      layout.width = width;
      layout.height = height;
      layout.grid = [
        Math.ceil(canvas!.width / cellPx[0]) + 1,
        Math.ceil(canvas!.height / cellPx[1]) + 1,
      ];

      const [imageWidth, imageHeight] = layout.imageSize;
      if (imageWidth) {
        const scale = Math.max(width / imageWidth, height / imageHeight);
        const drawnWidth = imageWidth * scale;
        const drawnHeight = imageHeight * scale;
        layout.imageRect = [
          (width - drawnWidth) * imagePosition.x,
          (height - drawnHeight) * imagePosition.y,
          drawnWidth,
          drawnHeight,
        ];
      }

      if (cellPx[0] !== layout.cellPx[0] || cellPx[1] !== layout.cellPx[1]) {
        layout.cellPx = cellPx;
        if (atlasTexture) gl!.deleteTexture(atlasTexture);
        atlasTexture = texture(
          gl!,
          2,
          drawAtlas(cellPx[0], cellPx[1], fontFamily),
          false,
        );
      }

      gl!.activeTexture(gl!.TEXTURE3);
      gl!.bindTexture(gl!.TEXTURE_2D, flowTexture);
      gl!.texImage2D(
        gl!.TEXTURE_2D,
        0,
        gl!.RGBA8,
        layout.grid[0],
        layout.grid[1],
        0,
        gl!.RGBA,
        gl!.UNSIGNED_BYTE,
        null,
      );
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, gl!.NEAREST);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, gl!.NEAREST);
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, flowBuffer);
      gl!.framebufferTexture2D(
        gl!.FRAMEBUFFER,
        gl!.COLOR_ATTACHMENT0,
        gl!.TEXTURE_2D,
        flowTexture,
        0,
      );
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, null);

      measureQuiet();
    }

    function draw(now: number) {
      const time = reducedMotion.matches ? 0 : (now - startedAt) / 1000;
      const [gridX, gridY] = layout.grid;
      const cellCss = [
        layout.cellPx[0] / layout.dpr,
        layout.cellPx[1] / layout.dpr,
      ];

      gl!.bindFramebuffer(gl!.FRAMEBUFFER, flowBuffer);
      gl!.viewport(0, 0, gridX, gridY);
      gl!.disable(gl!.BLEND);
      activate(gl!, flowProgram!);
      gl!.uniform2f(flowUniform('uGrid'), gridX, gridY);
      gl!.uniform2f(flowUniform('uCellCss'), cellCss[0], cellCss[1]);
      gl!.uniform1f(flowUniform('uTime'), time);
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);

      gl!.bindFramebuffer(gl!.FRAMEBUFFER, null);
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
      gl!.clearColor(0, 0, 0, 0);
      gl!.clear(gl!.COLOR_BUFFER_BIT);
      activate(gl!, glyphProgram!);
      gl!.uniform1i(glyphUniform('uImage'), 0);
      gl!.uniform1i(glyphUniform('uSky'), 1);
      gl!.uniform1i(glyphUniform('uAtlas'), 2);
      gl!.uniform1i(glyphUniform('uFlow'), 3);
      gl!.uniform2f(glyphUniform('uResolution'), canvas!.width, canvas!.height);
      gl!.uniform1f(glyphUniform('uDpr'), layout.dpr);
      gl!.uniform2f(
        glyphUniform('uCellPx'),
        layout.cellPx[0],
        layout.cellPx[1],
      );
      gl!.uniform2f(glyphUniform('uGrid'), gridX, gridY);
      gl!.uniform4fv(glyphUniform('uImageRect'), layout.imageRect);
      gl!.uniform2fv(glyphUniform('uImageSize'), layout.imageSize);
      gl!.uniform1f(glyphUniform('uRampCount'), rampGlyphs.length);
      gl!.uniform1f(glyphUniform('uCodeCount'), codeGlyphs.length);
      gl!.uniform1f(glyphUniform('uTime'), time);
      gl!.uniform4fv(glyphUniform('uQuietRect'), layout.quiet);
      gl!.uniform1f(glyphUniform('uQuietFade'), layout.width < 640 ? 70 : 150);
      gl!.uniform3f(
        glyphUniform('uPointer'),
        pointer.x,
        pointer.y,
        pointer.presence,
      );
      gl!.uniform1f(glyphUniform('uLensRadius'), 96);
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
    }

    function loop(now: number) {
      frame = 0;
      if (disposed || !visible) return;
      pointer.presence += (pointer.target - pointer.presence) * 0.14;
      // The flow drifts slowly, so 30fps is plenty unless the lens is active.
      const interval = pointer.presence > 0.01 ? 0 : 1000 / 30;
      if (now - lastDraw >= interval) {
        draw(now);
        lastDraw = now;
      }
      frame = requestAnimationFrame(loop);
    }

    function start() {
      if (!frame && !disposed && visible && !reducedMotion.matches) {
        frame = requestAnimationFrame(loop);
      }
    }

    function redraw() {
      resize();
      draw(performance.now());
    }

    function onPointerMove(event: PointerEvent) {
      if (!finePointer.matches || reducedMotion.matches) return;
      const box = hero!.getBoundingClientRect();
      pointer.x = event.clientX - box.left;
      pointer.y = event.clientY - box.top;
      pointer.target = 1;
    }

    function onPointerLeave() {
      pointer.target = 0;
    }

    const resizeObserver = new ResizeObserver(() => {
      if (!layout.imageSize[0]) return;
      redraw();
    });

    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && document.visibilityState === 'visible';
      if (visible) start();
    });

    function onVisibilityChange() {
      visible = document.visibilityState === 'visible';
      if (visible) start();
    }

    (async () => {
      const declared = getComputedStyle(document.body)
        .getPropertyValue('--font-geist-mono')
        .trim();
      if (declared) fontFamily = declared;
      try {
        await document.fonts.load(`600 20px ${fontFamily}`);
      } catch {
        // Fall back to the system monospace face.
      }

      const [image, skyMask] = await Promise.all([
        loadImage(imageSrc),
        loadImage(skyMaskSrc),
      ]);
      if (disposed) return;

      texture(gl, 0, image, true);
      texture(gl, 1, skyMask, false);
      layout.imageSize = [image.naturalWidth, image.naturalHeight];
      redraw();
      canvas.dataset.ready = 'true';
      // The hero text slides into place after load; measure it again then.
      quietTimer = window.setTimeout(measureQuiet, 2400);

      resizeObserver.observe(hero);
      visibility.observe(hero);
      document.addEventListener('visibilitychange', onVisibilityChange);
      hero.addEventListener('pointermove', onPointerMove);
      hero.addEventListener('pointerleave', onPointerLeave);
      start();
    })().catch(() => {
      // Without the photo or WebGL the hero simply shows the plain photo.
    });

    canvas.addEventListener('webglcontextlost', () => {
      disposed = true;
      cancelAnimationFrame(frame);
      delete canvas.dataset.ready;
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      window.clearTimeout(quietTimer);
      resizeObserver.disconnect();
      visibility.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      hero.removeEventListener('pointermove', onPointerMove);
      hero.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  return <canvas className="hero-glyphs" ref={canvasRef} aria-hidden="true" />;
}
