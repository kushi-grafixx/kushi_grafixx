"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
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

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <div className="logo-design-page pt-32 pb-24">
            <div className="container mx-auto px-6 max-w-7xl">
                <Link
                    href="/#projects"
                    onClick={handleBackToProjects}
                    className="inline-block mb-10 text-white/50 hover:text-white transition-colors"
                >
                    ← Back to Projects
                </Link>

                <div className="logo-hero mb-16">
                    <p className="text-[#ff3c3c] uppercase tracking-[0.2em] text-sm mb-4">Selected Work</p>
                    <h1 className="text-5xl md:text-7xl font-medium mb-6 tracking-tight">Logo Design</h1>
                    <p className="text-xl text-white/40 max-w-2xl leading-relaxed">
                        A curated collection of brand identities and logo marks crafted with precision and intention — each one a visual system in itself.
                    </p>
                </div>

                {hasMounted && (
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {logoIndices.map((num) => (
                            <motion.div
                                key={num}
                                className="logo-card group relative bg-[#111] rounded-xl overflow-hidden border border-white/5 hover:border-[#ff3c3c]/30 transition-all duration-300 hover:-translate-y-1"
                                variants={itemVariants}
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="relative aspect-square p-8 flex items-center justify-center">
                                    <Image
                                        src={`/assets/logos/${num}.png`}
                                        alt={`Logo ${num}`}
                                        width={300}
                                        height={300}
                                        className="object-contain w-full h-full"
                                    />
                                    <span className="absolute top-3 left-3 bg-black/50 backdrop-blur-md border border-white/10 px-2 py-1 rounded-full text-[10px] text-white/40">
                                        #{num.toString().padStart(2, '0')}
                                    </span>
                                    <div className="absolute inset-0 bg-radial-gradient opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
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
        .bg-radial-gradient {
            background: radial-gradient(circle at center, rgba(255, 60, 60, 0.08) 0%, transparent 70%);
        }
      `}</style>
        </div>
    );
};

export default LogoDesignGallery;
