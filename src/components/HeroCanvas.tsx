"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

const vertexShader = `
  uniform float uTime;
  uniform vec2  uMouse;
  uniform float uScrollFade;
  uniform float uIntroProgress;

  attribute float aPhase;
  attribute float aAmp;
  attribute float aTU;

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

    float n  = noise(p * 1.8 + uTime * 0.2);
    float n2 = noise(p * 4.5 - uTime * 0.12);
    float combined = n * 0.55 + n2 * 0.45;
    vNoise = combined;

    float seed = hash(p * 13.7 + vec3(uTime * 0.06));
    float adjustedSeed = seed * (1.0 - aTU * 0.35);
    
    float scrollDither = step(0.58 + uScrollFade * 0.42, adjustedSeed + combined * 0.18);
    float introDither = step(1.0 - uIntroProgress, adjustedSeed);
    
    vAlpha = scrollDither * introDither;

    vec3 tang = length(p) > 0.001 ? normalize(p) : vec3(0,1,0);
    vec3 up = abs(tang.y) < 0.99 ? vec3(0,1,0) : vec3(1,0,0);
    vec3 perp1 = normalize(cross(tang, up));
    vec3 perp2 = cross(tang, perp1);

    float w1 = sin(uTime * 1.6 + aPhase) * aAmp;
    float w2 = cos(uTime * 1.0 + aPhase * 0.8) * aAmp * 0.7;
    float w3 = sin(uTime * 3.2 + aPhase * 1.4 + aTU * 8.0) * aAmp * 0.4;

    p += perp1 * (w1 + w3) + perp2 * w2;

    vec4 clip  = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
    vec2 ndc   = clip.xy / clip.w;
    float distToMouse = length(ndc - uMouse);

    vec3 scatterDir;
    scatterDir.x = hash(position * 7.391 + vec3(1, 0, 0)) * 2.0 - 1.0;
    scatterDir.y = hash(position * 3.719 + vec3(0, 2, 0)) * 2.0 - 1.0;
    scatterDir.z = hash(position * 11.13 + vec3(0, 0, 3)) * 2.0 - 1.0;
    scatterDir = normalize(scatterDir);

    float mouseForce = smoothstep(0.4, 0.0, distToMouse) * (0.45 + aTU * 0.4);
    
    p += scatterDir * mouseForce;

    vec4 mvPos = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mvPos;

    float sz = mix(3.2, 1.4, aTU) + combined * 1.2;
    gl_PointSize = sz * (5.0 / -mvPos.z) * uIntroProgress;
  }
`;

const fragmentShader = `
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
        float t = smoothstep(0.25, 0.75, vNoise) * (1.0 - vTU * 0.4);
        col = mix(uColorAccent, uColorCore, t);
    } else if (vColorSeed < 0.9) {
        col = vec3(0.98, 0.98, 1.0);
        col *= 0.85 + vNoise * 0.15;
    } else {
        col = vec3(0.04, 0.01, 0.01);
        col *= 0.6 + vNoise * 0.4;
    }

    float fadeAlpha = 1.0 - uScrollFade * 0.7;
    float alpha = soft * (0.22 + vNoise * 0.65) * fadeAlpha;
    gl_FragColor = vec4(col, alpha);
  }
`;

const HeroCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(window.innerWidth, window.innerHeight);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.set(0, 0, 5);

        // Geometry
        const CORE_N = 5000;
        const TENDRIL_N = 18;
        const PER_TENDRIL = 660;
        const TOTAL = CORE_N + TENDRIL_N * PER_TENDRIL;

        const positions = new Float32Array(TOTAL * 3);
        const aPhase = new Float32Array(TOTAL);
        const aAmp = new Float32Array(TOTAL);
        const aTU = new Float32Array(TOTAL);

        const PHI = (1 + Math.sqrt(5)) / 2;

        for (let i = 0; i < CORE_N; i++) {
            const theta = Math.acos(1 - 2 * (i + 0.5) / CORE_N);
            const angle = 2 * Math.PI * i / PHI;
            const r = 0.45 + Math.random() * 0.25;
            positions[i * 3] = r * Math.sin(theta) * Math.cos(angle);
            positions[i * 3 + 1] = r * Math.cos(theta);
            positions[i * 3 + 2] = r * Math.sin(theta) * Math.sin(angle);
            aPhase[i] = Math.random() * Math.PI * 2;
            aAmp[i] = 0.015 + Math.random() * 0.02;
            aTU[i] = 0.0;
        }

        const rng = (min: number, max: number) => min + Math.random() * (max - min);

        for (let t = 0; t < TENDRIL_N; t++) {
            const baseAngle = (t / TENDRIL_N) * Math.PI * 2 + rng(-0.15, 0.15);
            const elevation = rng(-0.55, 0.55);
            const tipLen = rng(5.5, 8.5);
            const curveOffset = rng(-0.7, 0.7);

            const cosEl = Math.cos(elevation);
            const sinEl = Math.sin(elevation);
            const tipX = tipLen * Math.cos(baseAngle) * cosEl;
            const tipY = tipLen * sinEl;
            const tipZ = tipLen * Math.sin(baseAngle) * cosEl * 0.25;

            const perpX = -Math.sin(baseAngle);
            const perpZ = Math.cos(baseAngle);
            const ctrlX = tipX * 0.5 + perpX * curveOffset;
            const ctrlY = tipY * 0.5 + rng(-0.3, 0.3);
            const ctrlZ = tipZ * 0.5 + perpZ * curveOffset;

            const offset = CORE_N + t * PER_TENDRIL;

            for (let p = 0; p < PER_TENDRIL; p++) {
                const u = Math.pow(p / (PER_TENDRIL - 1), 0.85);
                const idx = (offset + p) * 3;

                const mu = 1 - u;
                const bx = mu * mu * 0 + 2 * u * mu * ctrlX + u * u * tipX;
                const by = mu * mu * 0 + 2 * u * mu * ctrlY + u * u * tipY;
                const bz_ = mu * mu * 0 + 2 * u * mu * ctrlZ + u * u * tipZ;

                const thick = (1 - u) * (1 - u) * 0.12 + 0.003;
                const ox = (Math.random() - 0.5) * thick;
                const oy = (Math.random() - 0.5) * thick;
                const oz = (Math.random() - 0.5) * thick * 0.3;

                positions[idx] = bx + ox;
                positions[idx + 1] = by + oy;
                positions[idx + 2] = bz_ + oz;

                aPhase[offset + p] = t * (Math.PI * 2 / TENDRIL_N) + u * Math.PI * 5;
                aAmp[offset + p] = u * 0.18 + 0.005;
                aTU[offset + p] = u;
            }
        }

        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geo.setAttribute("aPhase", new THREE.BufferAttribute(aPhase, 1));
        geo.setAttribute("aAmp", new THREE.BufferAttribute(aAmp, 1));
        geo.setAttribute("aTU", new THREE.BufferAttribute(aTU, 1));

        const uniforms = {
            uTime: { value: 0 },
            uMouse: { value: new THREE.Vector2(0.5, 0.5) },
            uScrollFade: { value: 0 },
            uIntroProgress: { value: 0 },
            uColorCore: { value: new THREE.Color("#ff1a1a") },
            uColorAccent: { value: new THREE.Color("#cc0000") }
        };

        const material = new THREE.ShaderMaterial({
            uniforms,
            vertexShader,
            fragmentShader,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        });

        const points = new THREE.Points(geo, material);
        const group = new THREE.Group();
        group.add(points);
        group.scale.setScalar(1.75);
        scene.add(group);

        const glowMat = new THREE.ShaderMaterial({
            uniforms: {
                uColor: { value: new THREE.Color("#660000") },
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

        // Interaction
        const targetRot = { x: 0, y: 0 };
        const onMouseMove = (e: MouseEvent) => {
            const mx = (e.clientX / window.innerWidth - 0.5) * 2;
            const my = (e.clientY / window.innerHeight - 0.5) * 2;
            uniforms.uMouse.value.set(mx, -my);
            targetRot.y = mx * 0.18;
            targetRot.x = my * 0.10;
        };
        window.addEventListener("mousemove", onMouseMove);

        let scrollFade = 0;
        const onScroll = () => {
            const heroH = window.innerHeight;
            const fadeStart = heroH * 0.30;
            const fadeEnd = heroH * 0.80;
            const y = window.scrollY;
            scrollFade = Math.max(0, Math.min(1, (y - fadeStart) / (fadeEnd - fadeStart)));
            uniforms.uScrollFade.value = scrollFade;
            glowMat.uniforms.uScrollFade.value = scrollFade;

            if (canvas) {
                canvas.style.opacity = scrollFade >= 1 ? "0" : "1";
            }
        };
        window.addEventListener("scroll", onScroll);

        const onResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener("resize", onResize);

        // Intro trigger
        const onPreloaderFinished = () => {
            gsap.to(uniforms.uIntroProgress, {
                value: 1.0,
                duration: 2.2,
                ease: "power2.out"
            });
        };
        window.addEventListener("kg-preloader-finished", onPreloaderFinished);

        const clock = new THREE.Clock();
        let rafId: number;
        const animate = () => {
            rafId = requestAnimationFrame(animate);
            if (scrollFade >= 1) return;

            const t = clock.getElapsedTime();
            uniforms.uTime.value = t;
            glowMat.uniforms.uTime.value = t;

            group.rotation.z += 0.0004;
            group.rotation.x += (targetRot.x - group.rotation.x) * 0.04;
            group.rotation.y += (targetRot.y - group.rotation.y) * 0.04;

            group.position.y = Math.sin(t * 0.35) * 0.05;
            glowMesh.position.y = Math.sin(t * 0.35) * 0.05;

            renderer.render(scene, camera);
        };
        animate();

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onResize);
            window.removeEventListener("kg-preloader-finished", onPreloaderFinished);
            cancelAnimationFrame(rafId);
            renderer.dispose();
            geo.dispose();
            material.dispose();
            glowMat.dispose();
        };
    }, []);

    return <canvas ref={canvasRef} id="webgl-canvas" className="fixed inset-0 w-full h-full pointer-events-none z-0" />;
};

export default HeroCanvas;
