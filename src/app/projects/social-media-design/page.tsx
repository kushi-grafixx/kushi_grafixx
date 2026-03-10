"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollToPlugin);
}

const SocialMediaCaseStudy = () => {
    const images = [
        { src: "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=1000&auto=format&fit=crop", alt: "Social Media Gallery 1" },
        { src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1000&auto=format&fit=crop", alt: "Social Media Gallery 2" },
        { src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1000&auto=format&fit=crop", alt: "Social Media Gallery 3" },
        { src: "https://images.unsplash.com/photo-1522071823991-b3b28b7e7ea5?w=1000&auto=format&fit=crop", alt: "Social Media Gallery 4" },
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
                                src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=2000&auto=format&fit=crop"
                                alt="Social Media Design Hero"
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
                        <h1 className="cs-title text-4xl md:text-6xl font-bold mb-8">Zero Studios: Social Systems</h1>
                        <div className="cs-body text-xl text-white/60 leading-relaxed space-y-6">
                            <p>
                                How do you maintain a high-impact social presence while keeping the design overhead low?
                                For Zero Studios, the answer was a robust design system that prioritizes speed and
                                visual consistency.
                            </p>
                            <p>
                                The challenge was to create a visual language that felt alive and reactive, yet remained
                                bound by clear structural rules. We developed a series of dynamic templates that allow
                                the team to push out content in minutes, not hours, ensuring the brand remains
                                top-of-mind without burning out the creative team. Every grid line, every color shift,
                                and every typography choice was pre-calculated to drive engagement while maintaining
                                that signature premium feel.
                            </p>
                            <p>
                                This isn't just about posting; it's about building a digital architecture that houses a
                                community. The result is a social presence that feels like a natural extension of the
                                brand's physical and digital products—consistent, daring, and always intentional.
                            </p>
                        </div>
                        <div className="cs-tags flex flex-wrap gap-3 mt-10">
                            {["Social Media", "Design Systems", "Content Strategy", "Templates"].map(tag => (
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
                                    height={1000}
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

export default SocialMediaCaseStudy;
