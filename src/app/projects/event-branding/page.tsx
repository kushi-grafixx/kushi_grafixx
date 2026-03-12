"use client";

import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollToPlugin);
}

const EventBrandingCaseStudy = () => {
    // Empty array since we don't have assets for this dummy page yet
    const images: { src: string, alt: string }[] = [];

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
                            {/* Placeholder Hero */}
                            <div className="w-full aspect-video bg-white/5 rounded-3xl flex items-center justify-center">
                                <span className="text-white/20 uppercase tracking-widest text-sm font-bold">Event Identity Concept</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Case Study Text */}
                <section className="cs-text-section">
                    <div className="container cs-content-container">
                        <h1 className="cs-title">Echo Platform Event Identity</h1>
                        <div className="cs-body">
                            <p>
                                The Echo Platform required an expansive visual identity for their annual
                                conference series. The design needed to stand out in the crowded F&B tech space,
                                bridging the gap between raw culinary energy and sleek digital platforms.
                            </p>
                            <p>
                                The final identity leans heavily on modular typography and high-contrast
                                motion sequences, ensuring the brand translates powerfully from digital
                                promotional material to physical stage backdrops.
                            </p>
                        </div>
                        <div className="cs-tags">
                            {["Event Brand Identity", "F&B", "Typography"].map(tag => (
                                <span key={tag} className="cs-tag">{tag}</span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Case Study Waterfall Gallery - Empty for Dummy */}
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

export default EventBrandingCaseStudy;
