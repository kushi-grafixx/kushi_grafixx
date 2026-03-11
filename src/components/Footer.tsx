"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";

const Footer = () => {
    const logoBoxRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);
    const backdropRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const logoBox = logoBoxRef.current as HTMLDivElement;
        const liquidCanvas = canvasRef.current as HTMLCanvasElement;
        const easterPopup = popupRef.current as HTMLDivElement;
        const easterBd = backdropRef.current as HTMLDivElement;

        if (!logoBox || !liquidCanvas || !easterPopup || !easterBd) return;

        const ctx = liquidCanvas.getContext('2d')!;
        const HOLD_DURATION = 1500;

        let fillProgress = 0;
        let isHolding = false;
        let holdStartTime: number | null = null;
        let rafId: number | null = null;
        let draining = false;

        const bubbles: { x: number; y: number; r: number; vy: number; vx: number; alpha: number; wobble: number }[] = [];
        const MAX_BUBBLES = 18;

        function randomBubble(w: number, h: number) {
            return {
                x: Math.random() * w,
                y: h * (1 - fillProgress) + Math.random() * fillProgress * h * 0.9,
                r: 2 + Math.random() * 5,
                vy: -(0.3 + Math.random() * 0.7),
                vx: (Math.random() - 0.5) * 0.4,
                alpha: 0.4 + Math.random() * 0.4,
                wobble: Math.random() * Math.PI * 2,
            };
        }

        function sizeCanvas() {
            const boxRect = logoBox.getBoundingClientRect();
            liquidCanvas.width = boxRect.width;
            liquidCanvas.height = boxRect.height;
        }

        sizeCanvas();
        window.addEventListener('resize', sizeCanvas);

        function drawFrame(ts: number) {
            const w = liquidCanvas.width;
            const h = liquidCanvas.height;
            ctx.clearRect(0, 0, w, h);
            if (fillProgress <= 0) return;

            const t = ts * 0.001;
            const fillY = h * (1 - fillProgress);

            ctx.beginPath();
            ctx.moveTo(0, h);
            ctx.lineTo(0, fillY);
            for (let x = 0; x <= w; x += 2) {
                const wave =
                    Math.sin(x * 0.04 + t * 2.5) * (4 - fillProgress * 3) +
                    Math.sin(x * 0.025 - t * 1.8) * (3 - fillProgress * 2) +
                    Math.sin(x * 0.06 + t * 3.2) * 1.5 * (1 - fillProgress * 0.7);
                ctx.lineTo(x, fillY + wave);
            }
            ctx.lineTo(w, h);
            ctx.closePath();

            const grad = ctx.createLinearGradient(0, fillY, 0, h);
            grad.addColorStop(0, `rgba(255, 44, 44, ${0.55 + fillProgress * 0.3})`);
            grad.addColorStop(0.5, `rgba(200, 20, 20, ${0.45 + fillProgress * 0.3})`);
            grad.addColorStop(1, `rgba(120, 10, 10, ${0.35 + fillProgress * 0.3})`);
            ctx.fillStyle = grad;
            ctx.fill();

            ctx.beginPath();
            for (let x = 0; x <= w; x += 2) {
                const wave =
                    Math.sin(x * 0.04 + t * 2.5) * (4 - fillProgress * 3) +
                    Math.sin(x * 0.025 - t * 1.8) * (3 - fillProgress * 2) +
                    Math.sin(x * 0.06 + t * 3.2) * 1.5 * (1 - fillProgress * 0.7);
                const y = fillY + wave;
                if (x === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.strokeStyle = `rgba(255, 120, 120, ${0.4 * fillProgress})`;
            ctx.lineWidth = 2;
            ctx.stroke();

            while (bubbles.length < Math.floor(fillProgress * MAX_BUBBLES)) {
                bubbles.push(randomBubble(w, h));
            }
            for (let i = bubbles.length - 1; i >= 0; i--) {
                const b = bubbles[i];
                b.wobble += 0.06;
                b.x += b.vx + Math.sin(b.wobble) * 0.4;
                b.y += b.vy;
                if (b.y + b.r < fillY - 4) { bubbles.splice(i, 1); continue; }
                const ballGrad = ctx.createRadialGradient(b.x - b.r * 0.3, b.y - b.r * 0.3, 0, b.x, b.y, b.r);
                ballGrad.addColorStop(0, `rgba(255,200,200,${b.alpha})`);
                ballGrad.addColorStop(1, `rgba(220,60,60,${b.alpha * 0.3})`);
                ctx.beginPath();
                ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
                ctx.fillStyle = ballGrad;
                ctx.fill();
            }
        }

        function animLoop(ts: number) {
            if (isHolding && holdStartTime !== null) {
                const elapsed = ts - holdStartTime;
                fillProgress = Math.min(1, elapsed / HOLD_DURATION);
                if (fillProgress >= 1) {
                    isHolding = false;
                    holdStartTime = null;
                    drawFrame(ts);
                    openEasterEgg();
                    return;
                }
            } else if (draining) {
                fillProgress -= 0.025;
                if (fillProgress <= 0) {
                    fillProgress = 0;
                    draining = false;
                    bubbles.length = 0;
                    ctx.clearRect(0, 0, liquidCanvas.width, liquidCanvas.height);
                    logoBox.classList.remove('holding');
                    if (rafId) cancelAnimationFrame(rafId);
                    rafId = null;
                    return;
                }
            }
            drawFrame(ts);
            rafId = requestAnimationFrame(animLoop);
        }

        function startHold(e: MouseEvent | TouchEvent) {
            if ('button' in e && e.button !== 0) return;
            if (isHolding) return;
            isHolding = true;
            draining = false;
            holdStartTime = null;
            logoBox.classList.add('holding');
            if (rafId) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame((ts) => {
                holdStartTime = ts - (fillProgress * HOLD_DURATION);
                animLoop(ts);
            });
        }

        function cancelHold() {
            if (!isHolding && !draining) return;
            isHolding = false;
            holdStartTime = null;
            draining = true;
            if (!rafId) rafId = requestAnimationFrame(animLoop);
        }

        function openEasterEgg() {
            logoBox.classList.remove('holding');
            bubbles.length = 0;
            fillProgress = 0;
            draining = false;
            if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
            ctx.clearRect(0, 0, liquidCanvas.width, liquidCanvas.height);
            easterPopup.classList.add('active');
            easterBd.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeEasterEgg() {
            easterPopup.classList.remove('active');
            easterBd.classList.remove('active');
            document.body.style.overflow = '';
        }

        logoBox.addEventListener('mousedown', startHold as EventListener);
        logoBox.addEventListener('mouseup', cancelHold);
        logoBox.addEventListener('mouseleave', cancelHold);
        logoBox.addEventListener('touchstart', startHold as EventListener, { passive: true });
        logoBox.addEventListener('touchend', cancelHold, { passive: true });
        logoBox.addEventListener('touchcancel', cancelHold, { passive: true });

        const closeBtn = document.getElementById('fv3-easter-close');
        if (closeBtn) closeBtn.addEventListener('click', closeEasterEgg);
        easterBd.addEventListener('click', closeEasterEgg);
        const escHandler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeEasterEgg(); };
        document.addEventListener('keydown', escHandler);

        return () => {
            window.removeEventListener('resize', sizeCanvas);
            if (rafId) cancelAnimationFrame(rafId);
            document.removeEventListener('keydown', escHandler);
        };
    }, []);

    return (
        <footer id="contact" className="footer-v3">
            <div className="fv3-top-bar">
                <p className="fv3-tagline">
                    Your brand called.
                    <br />
                    <span>Let&apos;s fix it.</span>
                </p>
                <a
                    href="https://cal.com/kushi-grafixx-lfgzty/15min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fv3-book-btn"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path
                            d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                    </svg>
                    Book a Free Call
                </a>
            </div>

            <div className="fv3-main-grid">
                <div className="fv3-box fv3-box-services">
                    <span className="fv3-box-label">Services</span>
                    <ul className="fv3-list">
                        <li><Link href="#services">Brand Identity</Link></li>
                        <li><Link href="#services">Logo Design</Link></li>
                        <li><Link href="#services">Social Media Design</Link></li>
                        <li><Link href="#services">Event Brand Identity</Link></li>
                        <li><Link href="#services">Print & Posters</Link></li>
                        <li><Link href="#services">Packaging Design</Link></li>
                        <li><Link href="#services">Web Design (Framer)</Link></li>
                    </ul>
                </div>

                <div className="fv3-box fv3-box-work">
                    <span className="fv3-box-label">Divisions</span>
                    <ul className="fv3-list">
                        <li className="fv3-division-entry">
                            <span className="fv3-coming-soon">Coming Soon</span>
                            <span className="fv3-division-name">Kushi Geo</span>
                            <span className="fv3-division-sub">Geospatial Intelligence</span>
                            <span className="fv3-division-tags">GIS &bull; Weather &bull; Spatial Analysis</span>
                        </li>
                    </ul>
                </div>

                <div className="fv3-box fv3-box-connect">
                    <span className="fv3-box-label">Connect</span>
                    <div className="fv3-connect-links">
                        <a href="https://www.instagram.com/kushi.grafixx/" target="_blank" rel="noopener noreferrer" className="fv3-social-link">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                <rect x="2" y="2" width="20" height="20" rx="5" />
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                            </svg>
                            Instagram
                            <svg className="fv3-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M7 17l10-10M7 7h10v10" />
                            </svg>
                        </a>
                        <a href="https://x.com/kushi_grafixx" target="_blank" rel="noopener noreferrer" className="fv3-social-link">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.735-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                            Twitter / X
                            <svg className="fv3-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M7 17l10-10M7 7h10v10" />
                            </svg>
                        </a>
                        <a href="https://www.linkedin.com/in/kushigrafixx/" target="_blank" rel="noopener noreferrer" className="fv3-social-link">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                <rect x="2" y="9" width="4" height="12" />
                                <circle cx="4" cy="4" r="2" />
                            </svg>
                            LinkedIn
                            <svg className="fv3-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M7 17l10-10M7 7h10v10" />
                            </svg>
                        </a>
                        <a href="mailto:contact@kushigrafixx.in" className="fv3-social-link">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                <rect width="20" height="16" x="2" y="4" rx="2" />
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                            </svg>
                            contact@kushigrafixx.in
                            <svg className="fv3-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M7 17l10-10M7 7h10v10" />
                            </svg>
                        </a>
                    </div>
                </div>

                <div className="fv3-box fv3-box-logo" id="fv3-logo-box" ref={logoBoxRef}>
                    <div className="fv3-logo-inner">
                        <Image
                            src="/assets/footer_final_logo3.png"
                            alt="Kushi Grafixx"
                            width={480}
                            height={200}
                            className="fv3-big-logo relative z-10 p-4 md:p-8"
                            id="fv3-big-logo"
                        />
                        <canvas
                            className="fv3-liquid-canvas"
                            id="fv3-liquid-canvas"
                            ref={canvasRef}
                            aria-hidden="true"
                        />
                    </div>
                </div>
            </div>

            <div className="fv3-bottom-bar">
                <p className="fv3-copy">© 2026 Kushi Grafixx. All rights reserved.</p>
                <p className="fv3-copy fv3-copy-right">Premium Visual Design · Fully Remote · Available Worldwide</p>
            </div>

            {/* Easter Egg Popup */}
            <div id="fv3-easter-popup" className="fv3-easter-popup" ref={popupRef} role="dialog" aria-modal="true" aria-label="Easter Egg">
                <button className="fv3-easter-close" id="fv3-easter-close" aria-label="Close">✕</button>
                <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                    <p style={{ fontSize: '1.2rem', fontWeight: 600, color: '#fff', marginBottom: '0.5rem' }}>🎉 You found it!</p>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>You held on long enough. That&apos;s the energy we like.</p>
                </div>
            </div>
            <div className="fv3-easter-backdrop" id="fv3-easter-backdrop" ref={backdropRef} />
        </footer>
    );
};

export default Footer;
