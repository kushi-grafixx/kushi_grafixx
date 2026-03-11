"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";

const Preloader = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Prevent scrolling while loading
        document.body.style.overflow = 'hidden';

        const fillEl = document.querySelector('.kushi-preloader-fill') as HTMLElement;
        const preloader = document.getElementById('kushi-preloader');

        if (!fillEl || !preloader) return;

        // Smooth continuous fill animation
        gsap.to(fillEl, {
            clipPath: "inset(0% 0 0 0)",
            duration: 2.0,
            ease: "power2.inOut",
            onComplete: () => {
                // Allow a small pause at 100% before fading out
                setTimeout(() => {
                    gsap.to(preloader, {
                        opacity: 0,
                        duration: 0.8,
                        ease: "power2.inOut",
                        onComplete: () => {
                            setIsLoaded(true);
                            document.body.style.overflow = '';
                            // 1. Trigger Symbiote Formation & Hero Animations
                            window.dispatchEvent(new CustomEvent("kg-preloader-finished"));
                        }
                    });
                }, 300);
            }
        });
    }, []);

    if (isLoaded) return null;

    return (
        <div id="kushi-preloader">
            <div className="kushi-preloader-wrapper">
                {/* Dim outline layer */}
                <img src="/assets/kushi_icon_red.png" alt="KG" className="kushi-preloader-outline" />
                {/* Fill layer — revealed bottom-to-top via clip-path in JS */}
                <div className="kushi-preloader-fill" />
            </div>
        </div>
    );
};

export default Preloader;
