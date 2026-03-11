"use client";

import { useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";

const Preloader = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useGSAP(() => {
        // Hide main page content until preloader finishes
        gsap.set("nav, #smooth-wrapper", { opacity: 0 });

        const tl = gsap.timeline();

        // Fill the icon using clip-path animation
        tl.to(".kushi-preloader-fill", {
            clipPath: "inset(0% 0 0 0)",
            duration: 1.5,
            ease: "power2.inOut"
        });

        // Brief pause at full fill
        tl.to({}, { duration: 0.3 });

        // Dispatch event and fade out card
        tl.to(".kushi-preloader-card", {
            opacity: 0,
            y: -16,
            scale: 0.94,
            duration: 0.5,
            ease: "power2.in",
            onStart: () => {
                window.dispatchEvent(new CustomEvent("kg-preloader-finished"));
            }
        });

        // Fade out backdrop simultaneously
        tl.to("#kushi-preloader", {
            opacity: 0,
            duration: 0.5,
            ease: "power2.inOut",
            onComplete: () => setIsLoaded(true)
        }, "<");

        // Reveal page content
        tl.to("nav, #smooth-wrapper", {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.15");
    });

    if (isLoaded) return null;

    return (
        <div id="kushi-preloader" className="fixed inset-0 z-[99998] flex justify-center items-center" style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}>
            <div className="kushi-preloader-card" style={{
                background: "#0d0d0d",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "20px",
                padding: "3rem 2.5rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1.5rem",
                width: "260px",
                boxShadow: "0 40px 80px -10px rgba(0,0,0,0.9)"
            }}>
                <div className="kushi-preloader-wrapper relative w-16 h-16">
                    <Image
                        src="/assets/kushi_icon_red.png"
                        alt="KG Outline"
                        width={64}
                        height={64}
                        className="kushi-preloader-outline absolute w-full h-full object-contain opacity-15 grayscale"
                    />
                    <div className="kushi-preloader-fill" />
                </div>
                <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", margin: 0 }}>Loading</p>
            </div>
        </div>
    );
};

export default Preloader;
