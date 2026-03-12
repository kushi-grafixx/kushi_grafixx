"use client";

import { useEffect, useRef } from "react";

const PortraitCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return;

        let particlesArray: Particle[] = [];
        let mouse = { x: -9999, y: -9999, radius: 150 };
        let animFrameId: number;

        const onMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        const onMouseLeave = () => {
            mouse.x = -9999;
            mouse.y = -9999;
        };

        window.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("mouseleave", onMouseLeave);

        const portraitImage = new Image();
        portraitImage.crossOrigin = "anonymous";
        portraitImage.src = "/assets/new_portrait.jpg";

        class Particle {
            originX: number;
            originY: number;
            x: number;
            y: number;
            size: number;
            color: string;
            vx: number;
            vy: number;
            ease: number;
            friction: number;
            alpha: number;
            scattered: boolean;

            constructor(x: number, y: number, brightness: number) {
                this.originX = x;
                this.originY = y;
                const shade = Math.round(brightness);
                this.color = `rgb(${shade},${shade},${shade})`;
                this.size = 2;
                this.vx = 0;
                this.vy = 0;
                this.ease = 0.06;
                this.friction = 0.82;
                this.alpha = 0;
                this.scattered = true;
                this.x = (Math.random() - 0.5) * canvas!.width * 3 + canvas!.width / 2;
                this.y = (Math.random() - 0.5) * canvas!.height * 3 + canvas!.height / 2;
            }

            activate() {
                this.scattered = false;
            }

            explode() {
                const angle = Math.atan2(this.y - canvas!.height * 0.45, this.x - canvas!.width * 0.5);
                const speed = 10 + Math.random() * 18;
                this.vx = Math.cos(angle) * speed + (Math.random() - 0.5) * 5;
                this.vy = Math.sin(angle) * speed + (Math.random() - 0.5) * 5;
                this.scattered = true;
            }

            update(t: number) {
                if (this.scattered && this.alpha <= 0) return;

                if (this.scattered) {
                    this.vx *= 0.90;
                    this.vy *= 0.90;
                    this.x += this.vx;
                    this.y += this.vy;
                    this.alpha = Math.max(0, this.alpha - 0.02);
                    return;
                }

                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.hypot(dx, dy);
                if (dist < mouse.radius && dist > 0) {
                    const f = (mouse.radius - dist) / mouse.radius;
                    this.vx -= (dx / dist) * f * 18;
                    this.vy -= (dy / dist) * f * 18;
                }

                const phaseX = this.originX * 0.03;
                const phaseY = this.originY * 0.03;
                const wobbleX = Math.sin(t * 1.2 + phaseX) * 4;
                const wobbleY = Math.cos(t * 0.9 + phaseY) * 4;
                const targetX = this.originX + wobbleX;
                const targetY = this.originY + wobbleY;

                this.vx += (targetX - this.x) * this.ease;
                this.vy += (targetY - this.y) * this.ease;
                this.vx *= this.friction;
                this.vy *= this.friction;
                this.x += this.vx;
                this.y += this.vy;

                this.alpha = Math.min(1, this.alpha + 0.04);
            }

            draw() {
                if (this.alpha <= 0) return;
                ctx!.globalAlpha = this.alpha;
                ctx!.fillStyle = this.color;
                ctx!.fillRect(this.x, this.y, this.size, this.size);
            }
        }

        const buildParticles = () => {
            const parent = canvas.parentElement;
            if (!parent) return;
            canvas.width = parent.clientWidth || 400;
            canvas.height = parent.clientHeight || 500;

            const scaleX = canvas.width / portraitImage.width;
            const scaleY = canvas.height / portraitImage.height;
            const scale = Math.max(scaleX, scaleY) * 1.35;
            const drawW = portraitImage.width * scale;
            const drawH = portraitImage.height * scale;

            const offscreen = document.createElement("canvas");
            offscreen.width = canvas.width;
            offscreen.height = canvas.height;
            const offCtx = offscreen.getContext("2d");
            if (!offCtx) return;

            const offsetX = (canvas.width - drawW) / 2 + canvas.width * 0.05;
            const offsetY = (canvas.height - drawH) / 2 + canvas.height * 0.15;

            offCtx.drawImage(portraitImage, offsetX, offsetY, drawW, drawH);
            const { data, width, height } = offCtx.getImageData(0, 0, canvas.width, canvas.height);

            particlesArray = [];
            const STEP = 5;
            for (let y = 0; y < height; y += STEP) {
                for (let x = 0; x < width; x += STEP) {
                    const idx = (y * width + x) * 4;
                    const alpha = data[idx + 3];
                    const brightness = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
                    if (alpha > 100 && brightness > 180) {
                        particlesArray.push(new Particle(x, y, brightness));
                    }
                }
            }
        };

        portraitImage.onload = () => {
            buildParticles();
            const startTime = performance.now();

            const render = (ts: number) => {
                animFrameId = requestAnimationFrame(render);
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                const t = (ts - startTime) / 1000;
                particlesArray.forEach((p) => {
                    p.update(t);
                    p.draw();
                });
            };
            render(startTime);

            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        particlesArray.forEach((p) => {
                            const delay = Math.random() * 1000;
                            setTimeout(() => p.activate(), delay);
                        });
                    } else {
                        particlesArray.forEach((p) => p.explode());
                    }
                });
            }, { threshold: 0.15 });

            observer.observe(canvas.parentElement!);
        };

        const handleResize = () => buildParticles();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />;
};

export default PortraitCanvas;
