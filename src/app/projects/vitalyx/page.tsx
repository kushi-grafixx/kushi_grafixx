"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollToPlugin);
}

const VitalyxCaseStudy = () => {
    const images = [
        { src: "/assets/vitalyx/Logo Construction.png", alt: "Logo Construction" },
        { src: "/assets/vitalyx/Logo Outline.png", alt: "Logo Outline" },
        { src: "/assets/vitalyx/Logo Clearspace.png", alt: "Logo Clearspace" },
        { src: "/assets/vitalyx/Typography.png", alt: "Typography" },
        { src: "/assets/vitalyx/Color.png", alt: "Color System" },
        { src: "/assets/vitalyx/Logosuite.png", alt: "Logosuite Overview" },
        { src: "/assets/vitalyx/Logosuite 1.png", alt: "Logosuite Detailed 1" },
        { src: "/assets/vitalyx/Logosuite 2.png", alt: "Logosuite Detailed 2" },
        { src: "/assets/vitalyx/Logo.png", alt: "Logo Solid" },
        { src: "/assets/vitalyx/App Icon Mockup.png", alt: "App Icon Mockup" },
        { src: "/assets/vitalyx/Folder Cover Mockup.png", alt: "Folder Cover Mockup" },
        { src: "/assets/vitalyx/Glass Wall Mockup.png", alt: "Glass Wall Mockup" },
        { src: "/assets/vitalyx/Pitch Deck Mockup.png", alt: "Pitch Deck Mockup" },
    ];

    const handleBackToTop = () => {
        gsap.to(window, {
            scrollTo: { y: 0, autoKill: false },
            duration: 1.3,
            ease: "power3.inOut"
        });
    };

    const handleBackToProjects = () => {
        if (typeof sessionStorage !== "undefined") {
            sessionStorage.setItem("returnToProjects", "1");
        }
    };

    return (
        <div className="case-study-page">
            <div className="case-study-bg">
                {/* 16:9 Hero Container */}
                <section className="cs-hero pt-32">
                    <div className="container container-wide">
                        <div className="cs-hero-image-wrapper">
                            <Image
                                src="/assets/vitalyx/Conference backdrop Mockup.png"
                                alt="VITALYX Hero"
                                width={1920}
                                height={1080}
                                className="cs-hero-image w-full h-auto rounded-3xl"
                            />
                        </div>
                    </div>
                </section>

                {/* Case Study Text */}
                <section className="cs-text-section">
                    <div className="container cs-content-container">
                        <h1 className="cs-title">Designing Calm Systems for Healthcare</h1>
                        <div className="cs-body">
                            <p>
                                VITALYX is a conceptual health-tech brand created to explore how modern healthcare
                                systems can communicate trust, clarity, and intelligence through identity. The challenge
                                was to avoid both extremes common in the industry - brands that feel overly clinical and
                                brands that feel too emotional or lifestyle-driven. The focus was on designing a calm,
                                scalable brand system that could operate across digital and physical environments while
                                remaining restrained, precise, and credible. Every decision was guided by a single
                                principle: in critical environments, design should reduce cognitive load, not add to it.
                            </p>
                            <p>
                                The VITALYX symbol started as a search for a way to express care without using clichés
                                like hearts, crosses, or human figures. The goal was to find a form that felt human, but
                                not emotional, and technological, but not mechanical. By combining organic gestures with
                                controlled geometry, the mark evolved into an abstract system shape that suggests
                                protection, guidance, and calm intelligence.
                            </p>
                        </div>
                        <div className="cs-tags">
                            {["Health-Tech", "Brand Identity", "SaaS", "Enterprise"].map(tag => (
                                <span key={tag} className="cs-tag">{tag}</span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Case Study Waterfall Gallery */}
                <section className="cs-gallery-section">
                    <div className="container container-wide">
                        <div className="waterfall-grid">
                            {images.map((img, i) => (
                                <img
                                    key={i}
                                    src={img.src}
                                    alt={img.alt}
                                    className="cs-gallery-image"
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Case Study Bottom Navigation */}
                <section className="cs-bottom-nav">
                    <div className="container">
                        <div className="cs-nav-actions">
                            <button
                                onClick={handleBackToTop}
                                className="cs-nav-btn btn-top"
                                data-label="Back to Top"
                            >
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 19V5M5 12l7-7 7 7" />
                                </svg>
                            </button>
                            <Link
                                href="/"
                                onClick={handleBackToProjects}
                                className="cs-nav-btn btn-home"
                                data-label="Back to Home"
                            >
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                    <polyline points="9 22 9 12 15 12 15 22" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default VitalyxCaseStudy;
