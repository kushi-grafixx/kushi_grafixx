"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import HeroCanvas from "./HeroCanvas";

const Hero = () => {
    const container = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({ delay: 0.2 });

        // Pill entry
        tl.to("#hero-pill", {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out"
        });

        // Split text animation for title
        tl.to(".hero-title .line-inner", {
            y: "0%",
            duration: 0.85,
            stagger: 0.15,
            ease: "power3.out"
        }, "-=0.3");

        // Subtitle entry
        tl.to("#hero-subtitle", {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out"
        }, "-=0.4");

    }, { scope: container });

    return (
        <section className="hero" ref={container} id="home">
            <div id="canvas-container" className="absolute inset-0 z-0">
                <HeroCanvas />
            </div>
            <div className="hero-content relative z-10">
                <div className="availability-pill" id="hero-pill" style={{ opacity: 0, transform: "translateY(20px)" }}>
                    <span className="status-dot"></span>
                    Available for Work
                </div>
                <h1 className="hero-title">
                    <span className="line-wrapper"><span className="line-inner">Your brand called.</span></span><br />
                    <span className="line-wrapper"><span className="line-inner">It needs help.</span></span>
                </h1>
                <p className="hero-subtitle" id="hero-subtitle" style={{ opacity: 0, transform: "translateY(20px)" }}>
                    Don&apos;t worry. I got this.
                </p>
            </div>

            <div className="scroll-down-bar">
                <span className="line left-line"></span>
                <span className="scroll-text">Scroll down</span>
                <div className="mouse-icon">
                    <span className="wheel"></span>
                </div>
                <span className="scroll-text">to see projects</span>
                <span className="line right-line"></span>
            </div>
        </section>
    );
};

export default Hero;
