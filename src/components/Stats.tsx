"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const JackpotStat = ({ value }: { value: string }) => {
    const container = useRef(null);
    const numbers = "0123456789".split("");

    useGSAP(() => {
        const reels = gsap.utils.toArray(".jackpot-reel", container.current);

        reels.forEach((reel: any) => {
            const target = reel.getAttribute("data-target");
            gsap.to(reel, {
                y: `-${target * 10}%`,
                duration: 2.5,
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

const Stats = () => {
    return (
        <section className="stats-section py-24 bg-black/50 border-y border-white/5">
            <div className="container container-wide">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center relative">
                    {stats.map((stat, i) => (
                        <div key={i} className="stat-item relative">
                            <h3 className="stat-number text-6xl md:text-7xl font-bold text-white mb-4 leading-none">
                                <JackpotStat value={stat.value} />
                            </h3>
                            <p className="stat-desc text-white/40 max-w-[200px] mx-auto text-sm leading-relaxed">
                                {stat.desc}
                            </p>
                            {i < stats.length - 1 && (
                                <div className="hidden md:block absolute top-1/2 -right-6 w-[1px] h-20 bg-white/10 -translate-y-1/2"></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
