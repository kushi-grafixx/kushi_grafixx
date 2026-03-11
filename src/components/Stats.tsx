"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const JackpotStat = ({ value }: { value: string }) => {
    const container = useRef(null);
    // Duplicate array to ensure even '0' has a satisfying spin
    const numbers = "01234567890123456789".split("");

    useGSAP(() => {
        const reels = gsap.utils.toArray(".jackpot-reel", container.current);

        reels.forEach((reel: any, index: number) => {
            const rawTarget = parseInt(reel.getAttribute("data-target") || "0", 10);
            const target = rawTarget + 10; // Always land on the 2nd instance for a full spin

            gsap.to(reel, {
                y: `-${target}em`, // use accurate em instead of % to perfectly align to the 1em tall spans
                duration: 2.5 + (index * 0.2), // Optional stagger feel per reel

                ease: "power4.out",
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });
        });
    }, { scope: container });

    // Split value into parts: number and suffix (e.g., "60" and "+")
    const match = value.match(/^(\d+)(.*)$/);
    if (!match) return <span>{value}</span>;

    const numStr = match[1];
    const suffix = match[2];

    return (
        <span className="jackpot-text" ref={container}>
            {numStr.split("").map((digit, i) => (
                <span key={i} className="jackpot-wrapper inline-block overflow-hidden h-[1em] leading-none">
                    <span className="jackpot-reel inline-flex flex-col text-center" data-target={digit}>
                        {numbers.map(n => (
                            <span key={n} className="h-[1em] flex items-center justify-center">
                                {n}
                            </span>
                        ))}
                    </span>
                </span>
            ))}
            <span className="jackpot-suffix">{suffix}</span>
        </span>
    );
};

const stats = [
    { value: "60+", desc: "Projects that didn't make me lose my sanity." },
    { value: "98%", desc: "Clients who loved the work. The other 2% probably needed sleep." },
    { value: "6+", desc: "Years of designing at unhealthy zoom levels." }
];

const Stats = ({ inline = false }: { inline?: boolean }) => {
    const card = (
        <div className="stats-card">
            {stats.map((stat, i) => (
                <React.Fragment key={i}>
                    <div className="stat-item">
                        <h3 className="stat-number jackpot-text">
                            <JackpotStat value={stat.value} />
                        </h3>
                        <p className="stat-desc">{stat.desc}</p>
                    </div>
                </React.Fragment>
            ))}
        </div>
    );

    if (inline) return card;

    return (
        <section className="stats-section">
            <div className="container container-wide">
                {card}
            </div>
        </section>
    );
};

export default Stats;
