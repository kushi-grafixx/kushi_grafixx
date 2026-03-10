"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollToPlugin);
}

const PostersCaseStudy = () => {
    const images = [
        { src: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=1000&auto=format&fit=crop", alt: "Gallery Image 1" },
        { src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1000&auto=format&fit=crop", alt: "Gallery Image 2" },
        { src: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=1000&auto=format&fit=crop", alt: "Gallery Image 3" },
        { src: "https://images.unsplash.com/photo-1530497610245-94d3f16c008c?w=1000&auto=format&fit=crop", alt: "Gallery Image 4" },
        { src: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=1000&auto=format&fit=crop", alt: "Gallery Image 5" },
        { src: "https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=1000&auto=format&fit=crop", alt: "Gallery Image 6" },
        { src: "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=1000&auto=format&fit=crop", alt: "Gallery Image 7" },
        { src: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1000&auto=format&fit=crop", alt: "Gallery Image 8" },
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
                                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=2000&auto=format&fit=crop"
                                alt="LUMI Hero"
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
                        <h1 className="cs-title text-4xl md:text-6xl font-bold mb-8">Lumi Wellness - Posters</h1>
                        <div className="cs-body text-xl text-white/60 leading-relaxed space-y-6">
                            <p>How do you build a health-tech brand that feels human, reliable, and enterprise-grade at the same time?</p>
                            <p>
                                LUMI is a conceptual health-tech brand created to explore how modern healthcare
                                systems can communicate trust, clarity, and intelligence through identity. The challenge
                                was to avoid both extremes common in the industry - brands that feel overly clinical and
                                brands that feel too emotional or lifestyle-driven. The focus was on designing a calm,
                                scalable brand system that could operate across digital and physical environments while
                                remaining restrained, precise, and credible. Every decision was guided by a single
                                principle: in critical environments, design should reduce cognitive load, not add to it.
                            </p>
                            <p>
                                The LUMI symbol started as a search for a way to express care without using clichés
                                like hearts, crosses, or human figures. The goal was to find a form that felt human, but
                                not emotional, and technological, but not mechanical. By combining organic gestures with
                                controlled geometry, the mark evolved into an abstract system shape that suggests
                                protection, guidance, and calm intelligence.
                            </p>
                        </div>
                        <div className="cs-tags flex flex-wrap gap-3 mt-10">
                            {["Posters", "Brand Identity", "SaaS", "Enterprise"].map(tag => (
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
                        <div className="waterfall-grid grid grid-cols-1 md:grid-cols-2 gap-8">
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

export default PostersCaseStudy;
