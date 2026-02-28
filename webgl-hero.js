import * as THREE from 'three';

// ─── Renderer ─────────────────────────────────────────────────────────────────
const canvas = document.querySelector('#webgl-canvas');
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 0, 5);

// ─── Shaders ──────────────────────────────────────────────────────────────────
const vertexShader = /* glsl */`
  uniform float uTime;
  uniform vec2  uMouse;
  uniform float uScrollFade;
  uniform float uIntroProgress;

  // Custom per-particle data
  attribute float aPhase;      // oscillation phase offset
  attribute float aAmp;        // wobble amplitude
  attribute float aTU;         // 0 = at core, 1 = at tip

  // 3D value noise
  float hash(vec3 p) {
    p = fract(p * 0.3183099 + 0.1); p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }
  float noise(vec3 x) {
    vec3 i = floor(x), f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash(i),            hash(i+vec3(1,0,0)), f.x),
          mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)), f.x), f.y),
      mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)), f.x),
          mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)), f.x), f.y), f.z);
  }

  varying float vAlpha;
  varying float vNoise;
  varying float vTU;
  varying float vColorSeed;

  void main() {
    vColorSeed = hash(position * 13.7 + vec3(1.23, 4.56, 7.89));
    vec3 p = position;
    vTU = aTU;

    // ── Noise shimmer ────────────────────────────────────────────────────────
    float n  = noise(p * 1.8 + uTime * 0.2);
    float n2 = noise(p * 4.5 - uTime * 0.12);
    float combined = n * 0.55 + n2 * 0.45;
    vNoise = combined;

    // ── Dither: tips dither out first on scroll, core last ───────────────────
    float seed = hash(p * 13.7 + vec3(uTime * 0.06));
    // Tips have inherently lower seed weight (aTU makes tips vanish faster)
    float adjustedSeed = seed * (1.0 - aTU * 0.35);
    
    // Dither away on scroll (uScrollFade) + Intro reveal (uIntroProgress)
    // uScrollFade: 0 at top, 1 when scrolled past hero
    // We want particles to vanish as uScrollFade increases
    float scrollDither = step(0.58 + uScrollFade * 0.42, adjustedSeed + combined * 0.18);
    // uIntroProgress: 0 at start, 1 when formed
    float introDither = step(1.0 - uIntroProgress, adjustedSeed);
    
    vAlpha = scrollDither * introDither;

    // ── Organic wobble — two perpendicular axes ──────────────────────────────
    vec3 tang = length(p) > 0.001 ? normalize(p) : vec3(0,1,0);
    // Compute two stable perpendicular vectors
    vec3 up = abs(tang.y) < 0.99 ? vec3(0,1,0) : vec3(1,0,0);
    vec3 perp1 = normalize(cross(tang, up));
    vec3 perp2 = cross(tang, perp1);

    float w1 = sin(uTime * 1.6 + aPhase) * aAmp;
    float w2 = cos(uTime * 1.0 + aPhase * 0.8) * aAmp * 0.7;
    // Secondary high-freq ripple toward tips
    float w3 = sin(uTime * 3.2 + aPhase * 1.4 + aTU * 8.0) * aAmp * 0.4;

    p += perp1 * (w1 + w3) + perp2 * w2;

    // ── Mouse: scatter randomly outward ─────────────────────────────────────
    vec4 clip  = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
    vec2 ndc   = clip.xy / clip.w;
    float distToMouse = length(ndc - uMouse);

    vec3 scatterDir;
    scatterDir.x = hash(position * 7.391 + vec3(1, 0, 0)) * 2.0 - 1.0;
    scatterDir.y = hash(position * 3.719 + vec3(0, 2, 0)) * 2.0 - 1.0;
    scatterDir.z = hash(position * 11.13 + vec3(0, 0, 3)) * 2.0 - 1.0;
    scatterDir = normalize(scatterDir);

    // Tips scatter further for whip-crack effect
    float mouseForce = smoothstep(0.4, 0.0, distToMouse) * (0.45 + aTU * 0.4);
    
    p += scatterDir * mouseForce;

    vec4 mvPos = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mvPos;

    // Point size: larger at core, smaller at tips
    float sz = mix(3.2, 1.4, aTU) + combined * 1.2;
    // Scale down points during intro
    gl_PointSize = sz * (5.0 / -mvPos.z) * uIntroProgress;
  }
`;

const fragmentShader = /* glsl */`
  uniform vec3  uColorCore;
  uniform vec3  uColorAccent;
  uniform float uScrollFade;

  varying float vAlpha;
  varying float vNoise;
  varying float vTU;
  varying float vColorSeed;

  void main() {
    if (vAlpha < 0.5) discard;

    vec2 uv = gl_PointCoord - 0.5;
    float r = length(uv) * 2.0;
    if (r > 1.0) discard;

    float soft = 1.0 - smoothstep(0.3, 1.0, r);

    vec3 col;
    if (vColorSeed < 0.7) {
        // Red (70%)
        float t = smoothstep(0.25, 0.75, vNoise) * (1.0 - vTU * 0.4);
        col = mix(uColorAccent, uColorCore, t);
    } else if (vColorSeed < 0.9) {
        // White (20%)
        col = vec3(0.98, 0.98, 1.0); // Slightly cool white
        col *= 0.85 + vNoise * 0.15;
    } else {
        // Dark (10%)
        col = vec3(0.04, 0.01, 0.01); // Very dark charcoal red
        col *= 0.6 + vNoise * 0.4;
    }

    float fadeAlpha = 1.0 - uScrollFade * 0.7;
    float alpha = soft * (0.22 + vNoise * 0.65) * fadeAlpha;
    gl_FragColor = vec4(col, alpha);
  }
`;

// ─── Geometry: Core + 18 Tentacles ────────────────────────────────────────────
const CORE_N = 5000;
const TENDRIL_N = 18;
const PER_TENDRIL = 660;
const TOTAL = CORE_N + TENDRIL_N * PER_TENDRIL;

const positions = new Float32Array(TOTAL * 3);
const aPhase = new Float32Array(TOTAL);
const aAmp = new Float32Array(TOTAL);
const aTU = new Float32Array(TOTAL);

const PHI = (1 + Math.sqrt(5)) / 2;

// ── Core sphere ────────────────────────────
for (let i = 0; i < CORE_N; i++) {
  const theta = Math.acos(1 - 2 * (i + 0.5) / CORE_N);
  const angle = 2 * Math.PI * i / PHI;
  const r = 0.45 + Math.random() * 0.25; // Slightly tighter core
  positions[i * 3] = r * Math.sin(theta) * Math.cos(angle);
  positions[i * 3 + 1] = r * Math.cos(theta);
  positions[i * 3 + 2] = r * Math.sin(theta) * Math.sin(angle);
  aPhase[i] = Math.random() * Math.PI * 2;
  aAmp[i] = 0.015 + Math.random() * 0.02;   // subtle core wobble
  aTU[i] = 0.0;
}

// ── Tentacles ──────────────────────────────
// Spread: use a mix of polar planes so tentacles fill all screen directions
// We flatten Z a bit so they spread more horizontally across the 2D viewport

const rng = (min, max) => min + Math.random() * (max - min);

for (let t = 0; t < TENDRIL_N; t++) {
  // Base angle evenly distributed + jitter
  const baseAngle = (t / TENDRIL_N) * Math.PI * 2 + rng(-0.15, 0.15);
  const elevation = rng(-0.55, 0.55); // radians, limited to keep tendrils visible
  const tipLen = rng(5.5, 8.5);    // keep long tentacles
  const curveOffset = rng(-0.7, 0.7);   // lateral bend at midpoint

  // Tip direction
  const cosEl = Math.cos(elevation);
  const sinEl = Math.sin(elevation);
  const tipX = tipLen * Math.cos(baseAngle) * cosEl;
  const tipY = tipLen * sinEl;
  const tipZ = tipLen * Math.sin(baseAngle) * cosEl * 0.25; // flatten Z

  // Quadratic bezier control point (midpoint with lateral curve)
  const perpX = -Math.sin(baseAngle); // perpendicular to base dir in XZ plane
  const perpZ = Math.cos(baseAngle);
  const ctrlX = tipX * 0.5 + perpX * curveOffset;
  const ctrlY = tipY * 0.5 + rng(-0.3, 0.3);
  const ctrlZ = tipZ * 0.5 + perpZ * curveOffset;

  const offset = CORE_N + t * PER_TENDRIL;

  for (let p = 0; p < PER_TENDRIL; p++) {
    const u = Math.pow(p / (PER_TENDRIL - 1), 0.85); // sqrt bias: denser near root
    const idx = (offset + p) * 3;

    // Quadratic bezier: B(u) = (1-u)² * P0 + 2u(1-u) * P1 + u² * P2
    // P0 = origin, P1 = ctrl, P2 = tip
    const mu = 1 - u;
    const bx = mu * mu * 0 + 2 * u * mu * ctrlX + u * u * tipX;
    const by = mu * mu * 0 + 2 * u * mu * ctrlY + u * u * tipY;
    const bz_ = mu * mu * 0 + 2 * u * mu * ctrlZ + u * u * tipZ;

    // Cross-sectional thickness: wide at root, knife-thin at tip
    const thick = (1 - u) * (1 - u) * 0.12 + 0.003;
    const ox = (Math.random() - 0.5) * thick;
    const oy = (Math.random() - 0.5) * thick;
    const oz = (Math.random() - 0.5) * thick * 0.3;

    positions[idx] = bx + ox;
    positions[idx + 1] = by + oy;
    positions[idx + 2] = bz_ + oz;

    // Wobble increases toward tips for whip-like motion
    aPhase[offset + p] = t * (Math.PI * 2 / TENDRIL_N) + u * Math.PI * 5;
    aAmp[offset + p] = u * 0.18 + 0.005;
    aTU[offset + p] = u;
  }
}

// ─── Build BufferGeometry ──────────────────────────────────────────────────────
const geo = new THREE.BufferGeometry();
geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
geo.setAttribute('aPhase', new THREE.BufferAttribute(aPhase, 1));
geo.setAttribute('aAmp', new THREE.BufferAttribute(aAmp, 1));
geo.setAttribute('aTU', new THREE.BufferAttribute(aTU, 1));

const uniforms = {
  uTime: { value: 0 },
  uMouse: { value: new THREE.Vector2(0.5, 0.5) },
  uScrollFade: { value: 0 },
  uIntroProgress: { value: 0 },
  uColorCore: { value: new THREE.Color('#ff1a1a') },
  uColorAccent: { value: new THREE.Color('#cc0000') }
};

// Expose uniforms for main.js coordination
window.webglHeroUniforms = uniforms;
window.formSymbiote = () => {
  if (typeof gsap !== 'undefined') {
    gsap.to(uniforms.uIntroProgress, {
      value: 1.0,
      duration: 2.2,
      ease: "power2.out"
    });
  } else {
    uniforms.uIntroProgress.value = 1.0;
  }
};

const material = new THREE.ShaderMaterial({
  uniforms,
  vertexShader,
  fragmentShader,
  transparent: true,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
});

const group = new THREE.Group();
group.add(new THREE.Points(geo, material));
group.scale.setScalar(1.75); // fill the hero — bigger symbiote
scene.add(group);

// ─── Ambient red glow at core ─────────────────────────────────────────────────
const glowMat = new THREE.ShaderMaterial({
  uniforms: {
    uColor: { value: new THREE.Color('#660000') }, // Visible red glow
    uTime: { value: 0 },
    uScrollFade: { value: 0 },
  },
  vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
  fragmentShader: `
    uniform vec3 uColor; uniform float uTime; uniform float uScrollFade; varying vec2 vUv;
    void main(){
      float d = length(vUv-0.5);
      float a = smoothstep(0.5,0.02,d)*(0.25+0.06*sin(uTime*0.6))*(1.0-uScrollFade);
      gl_FragColor = vec4(uColor, a);
    }
  `,
  transparent: true, depthWrite: false,
  blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
});
const glowMesh = new THREE.Mesh(new THREE.PlaneGeometry(3.5, 3.5), glowMat);
glowMesh.position.set(0, 0, -0.5);
scene.add(glowMesh);

// ─── Mouse ────────────────────────────────────────────────────────────────────
const targetRot = { x: 0, y: 0 };

document.addEventListener('mousemove', (e) => {
  const mx = (e.clientX / window.innerWidth - 0.5) * 2;
  const my = (e.clientY / window.innerHeight - 0.5) * 2;
  material.uniforms.uMouse.value.set(mx, -my);
  targetRot.y = mx * 0.18;
  targetRot.x = my * 0.10;
});

// ─── Scroll: dither out on exit ───────────────────────────────────────────────
let scrollFade = 0, canvasHidden = false;

window.addEventListener('scroll', () => {
  const heroH = window.innerHeight;
  const fadeStart = heroH * 0.30;
  const fadeEnd = heroH * 0.80;
  const y = window.scrollY;
  scrollFade = Math.max(0, Math.min(1, (y - fadeStart) / (fadeEnd - fadeStart)));
  if (scrollFade >= 1 && !canvasHidden) {
    canvas.style.opacity = '0'; canvasHidden = true;
  } else if (scrollFade < 1 && canvasHidden) {
    canvas.style.opacity = '1'; canvasHidden = false;
  }
});

// ─── Resize ───────────────────────────────────────────────────────────────────
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// ─── Animate ─────────────────────────────────────────────────────────────────
const clock = new THREE.Clock();



function animate() {
  requestAnimationFrame(animate);
  if (scrollFade >= 1) return;

  const t = clock.getElapsedTime();

  material.uniforms.uTime.value = t;
  material.uniforms.uScrollFade.value = scrollFade;
  glowMat.uniforms.uTime.value = t;
  glowMat.uniforms.uScrollFade.value = scrollFade;

  // Very slow group rotation — makes the spread feel alive
  group.rotation.z += 0.0004;
  group.rotation.x += (targetRot.x - group.rotation.x) * 0.04;
  group.rotation.y += (targetRot.y - group.rotation.y) * 0.04;

  // Gentle float
  group.position.y = Math.sin(t * 0.35) * 0.05;
  glowMesh.position.y = Math.sin(t * 0.35) * 0.05;

  renderer.render(scene, camera);
}
animate();
