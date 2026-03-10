"use client";

import { useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";

const Preloader = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useGSAP(() => {
        const tl = gsap.timeline({
            onComplete: () => setIsLoaded(true)
        });

        // Fill the icon
        tl.to(".kushi-preloader-fill", {
            clipPath: "inset(0% 0 0 0)",
            duration: 1.5,
            ease: "power2.inOut"
        });

        // Fade out preloader
        tl.to("#kushi-preloader", {
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
            onStart: () => {
                window.dispatchEvent(new CustomEvent("kg-preloader-finished"));
            }
        }, "+=0.2");

        // Scale up wrapper slightly while fading out
        tl.to(".kushi-preloader-wrapper", {
            scale: 1.1,
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut"
        }, "<");
    });

    if (isLoaded) return null;

    return (
        <div id="kushi-preloader" className="fixed inset-0 bg-[#080808] z-[99998] flex justify-center items-center">
            <div className="kushi-preloader-wrapper relative w-16 h-16">
                <Image
                    src="/assets/kushi_icon_red.png"
                    alt="KG Outline"
                    width={64}
                    height={64}
                    className="kushi-preloader-outline absolute w-full h-full object-contain opacity-15 grayscale"
                />
                <div className="kushi-preloader-fill absolute w-full h-full bg-[#ff3c3c] clip-path-inset-full">
                    {/* Using a background image trick similar to original */}
                    <div
                        className="w-full h-full"
                        style={{
                            backgroundImage: "url('/assets/kushi_icon_red.png')",
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'bottom'
                        }}
                    />
                </div>
            </div>
            <style jsx>{`
        .clip-path-inset-full {
             clip-path: inset(100% 0 0 0);
        }
      `}</style>
        </div>
    );
};

export default Preloader;
