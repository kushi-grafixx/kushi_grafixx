"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollToPlugin);
}

const LogoDesignGallery = () => {
    const [hasMounted, setHasMounted] = useState(false);
    const logoIndices = Array.from({ length: 40 }, (_, i) => i + 1);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    const handleBackToTop = () => {
        gsap.to(window, {
            scrollTo: { y: 0, autoKill: false },
            duration: 1,
            ease: "power3.inOut"
        });
    };

    const handleBackToProjects = () => {
        if (typeof sessionStorage !== "undefined") {
            sessionStorage.setItem("returnToProjects", "1");
        }
    };

    const container = useRef(null);

    useGSAP(() => {
        if (!hasMounted) return;

        const allCards = gsap.utils.toArray('.logo-card');
        
        // Split cards into viewport vs below fold
        const viewportHeight = window.innerHeight;
        const initialCards: any[] = [];
        const scrollCards: any[] = [];

        allCards.forEach((card: any) => {
            const rect = card.getBoundingClientRect();
            if (rect.top < viewportHeight + 100) {
                initialCards.push(card);
            } else {
                scrollCards.push(card);
            }
        });

        // Intro stagger for in-view
        if (initialCards.length > 0) {
            gsap.to(initialCards, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: {
                    grid: "auto",
                    from: "start",
                    amount: 0.8
                },
                ease: "power2.out"
            });
        }

        // Scroll reveal for the rest
        scrollCards.forEach((card: any, idx) => {
            gsap.to(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 95%",
                    toggleActions: "play none none reverse"
                },
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power2.out"
            });
        });

    }, { scope: container, dependencies: [hasMounted] });

    return (
        <div className="logo-design-page pt-32 pb-24" ref={container}>
            <div className="container mx-auto px-6 max-w-7xl">
                <Link
                    href="/#projects"
                    onClick={handleBackToProjects}
                    className="inline-block mb-10 text-white/50 hover:text-white transition-colors"
                >
                    ← Back to Projects
                </Link>

                <div className="logo-hero mb-16">
                    <p className="tag">Selected Work</p>
                    <h1>Logo Design</h1>
                    <p>
                        A curated collection of brand identities and logo marks crafted with precision and intention — each one a visual system in itself.
                    </p>
                    <span className="count-badge">40 LOGOS</span>
                </div>

                {hasMounted && (
                    <div className="logo-row">
                        {logoIndices.map((num) => (
                            <div key={num} className="logo-card">
                                <span className="card-num">#{num.toString().padStart(2, '0')}</span>
                                <Image
                                    src={`/assets/logos/${num}.png`}
                                    alt={`Logo ${num}`}
                                    width={300}
                                    height={300}
                                    style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                                />
                            </div>
                        ))}
                    </div>
                )}

                {/* Bottom Nav */}
                <section className="cs-bottom-nav mt-24">
                    <div className="flex justify-center gap-6">
                        <button
                            onClick={handleBackToTop}
                            className="p-6 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors group relative"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 19V5M5 12l7-7 7 7" />
                            </svg>
                        </button>
                        <Link
                            href="/#projects"
                            onClick={handleBackToProjects}
                            className="p-6 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors group relative"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                <polyline points="9 22 9 12 15 12 15 22" />
                            </svg>
                        </Link>
                    </div>
                </section>
            </div>
            <style jsx>{`
        /* ── Page-specific overrides ──────────────────────────────────────── */
        .logo-hero {
            padding-top: 5vh;
            padding-bottom: 3rem;
        }

        .logo-hero .tag {
            font-size: .78rem;
            letter-spacing: .18em;
            text-transform: uppercase;
            color: #ff2a2a;
            margin-bottom: .9rem;
        }

        .logo-hero h1 {
            font-size: clamp(2.4rem, 5vw, 4.2rem);
            font-weight: 500;
            line-height: 1.05;
            margin-bottom: 1rem;
            letter-spacing: -0.01em;
        }

        .logo-hero p {
            color: rgba(255, 255, 255, 0.6);
            font-size: 1rem;
            max-width: 480px;
            line-height: 1.65;
            font-weight: 300;
        }

        .count-badge {
            display: inline-block;
            margin-top: 1.4rem;
            padding: .34rem .9rem;
            border: 1px solid rgba(255, 42, 42, .3);
            border-radius: 999px;
            color: #ff2a2a;
            font-size: .78rem;
            font-weight: 400;
            letter-spacing: .1em;
        }

        /* ── Horizontal grid — left to right numbering ────────────────────── */
        .logo-row {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: .9rem;
        }

        @media (max-width: 1100px) {
            .logo-row {
                grid-template-columns: repeat(3, 1fr);
            }
        }

        @media (max-width: 720px) {
            .logo-row {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        @media (max-width: 460px) {
            .logo-row {
                grid-template-columns: 1fr;
            }
        }

        .logo-card {
            border-radius: 12px;
            overflow: hidden;
            position: relative;
            background: #111;
            border: 1px solid transparent;
            cursor: pointer;
            will-change: transform, opacity;
            opacity: 0; 
            transform: translateY(24px);
            transition: box-shadow .3s ease, border-color .3s ease, transform .3s ease;
            aspect-ratio: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
        }

        .logo-card:hover {
            box-shadow: 0 0 0 1px rgba(255, 42, 42, .4), 0 14px 40px rgba(255, 42, 42, .1);
            border-color: rgba(255, 42, 42, .28);
            transform: translateY(-3px) !important;
        }

        /* Number badge */
        .card-num {
            position: absolute;
            top: .6rem;
            left: .6rem;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(6px);
            border: 1px solid rgba(255, 255, 255, 0.09);
            border-radius: 999px;
            font-size: .66rem;
            font-weight: 400;
            color: rgba(255, 255, 255, 0.4);
            padding: .16rem .5rem;
            letter-spacing: .08em;
            z-index: 10;
        }

        /* Hover red overlay */
        .logo-card::after {
            content: '';
            position: absolute;
            inset: 0;
            background: radial-gradient(circle at center, rgba(255, 42, 42, .06) 0%, transparent 70%);
            opacity: 0;
            transition: opacity .32s ease;
            pointer-events: none;
        }

        .logo-card:hover::after {
            opacity: 1;
        }
      `}</style>
        </div>
    );
};

export default LogoDesignGallery;
