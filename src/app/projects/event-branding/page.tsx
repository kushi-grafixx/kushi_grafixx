"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollToPlugin);
}

const EventBrandingCaseStudy = () => {
    const images = [
        { src: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1000&auto=format&fit=crop", alt: "Event Gallery 1" },
        { src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1000&auto=format&fit=crop", alt: "Event Gallery 2" },
        { src: "https://images.unsplash.com/photo-1514525253344-9914f6b28532?w=1000&auto=format&fit=crop", alt: "Event Gallery 3" },
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
                                src="https://images.unsplash.com/photo-1540575861501-7c00117fb3c9?w=2000&auto=format&fit=crop"
                                alt="Event Brand Identity Hero"
                                width={1920}
                                height={1080}
                                className="cs-hero-image w-full h-auto rounded-3xl"
                                priority
                            />
                        </div>
                    </div>
                </section>

                {/* Case Study Text */}
                <section className="cs-text-section py-20">
                    <div className="container max-w-4xl mx-auto px-6">
                        <h1 className="cs-title text-4xl md:text-6xl font-bold mb-8">Echo Platform: Event Identity</h1>
                        <div className="cs-body text-xl text-white/60 leading-relaxed space-y-6">
                            <p>
                                For Echo Platform, an event is more than a gathering; it’s a high-frequency experience
                                that requires a visual identity as loud and clear as its name.
                            </p>
                            <p>
                                The goal was to build an identity that could cut through the noise of crowded digital and
                                physical spaces. We used a core visual motif based on sound resonance—clean, vibrating
                                geometric patterns paired with a high-contrast palette. This allowed the brand to feel
                                experimental yet grounded, a perfect match for a platform that hosts the thinkers and
                                makers of the digital age.
                            </p>
                            <p>
                                From large-scale environmental graphics to small-scale ticket designs, the Echo identity
                                remains unmistakable. It's a system designed to be felt as much as it is seen, creating
                                a sonic-visual bridge between the platform and its audience.
                            </p>
                        </div>
                        <div className="cs-tags flex flex-wrap gap-3 mt-10">
                            {["Event Brand Identity", "Visual Identity", "Environmental Graphics", "Experience Design"].map(tag => (
                                <span key={tag} className="cs-tag px-4 py-1 rounded-full border border-white/10 bg-white/5 text-sm text-white/50">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Case Study Waterfall Gallery */}
                <section className="cs-gallery-section pb-24">
                    <div className="container container-wide">
                        <div className="waterfall-grid grid grid-cols-1 md:grid-cols-3 gap-8">
                            {images.map((img, i) => (
                                <Image
                                    key={i}
                                    src={img.src}
                                    alt={img.alt}
                                    width={1000}
                                    height={1500}
                                    className="w-full h-auto rounded-3xl"
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Case Study Bottom Navigation */}
                <section className="cs-bottom-nav pb-20">
                    <div className="container flex justify-center">
                        <div className="cs-nav-actions flex gap-6">
                            <button
                                onClick={handleBackToTop}
                                className="cs-nav-btn btn-top p-6 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors group relative"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 19V5M5 12l7-7 7 7" />
                                </svg>
                            </button>
                            <Link
                                href="/"
                                onClick={handleBackToProjects}
                                className="cs-nav-btn btn-home p-6 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors group relative"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
