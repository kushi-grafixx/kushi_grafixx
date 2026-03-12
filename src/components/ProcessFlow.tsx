"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        number: "01",
        label: "Define Your",
        highlight: "Vision.",
        desc: "We figure out what your brand should actually look like. Startups, institutes, personal brands. Everyone is welcome to confess their design sins. I turn that chaos into a clear direction.",
        icon: (
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
        )
    },
    {
        number: "02",
        label: "Submit Your",
        highlight: "Request.",
        desc: "You drop everything into my design portal. No scattered screenshots. No late night voice notes. Just a clean brief and a clear starting point.",
        icon: (
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2L11 13" />
                <path d="M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
        )
    },
    {
        number: "03",
        label: "Review &",
        highlight: "Refine.",
        desc: "I present the strongest concept first. We refine it together until it feels right. Not endless revisions. Just smart improvements.",
        icon: (
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
            </svg>
        )
    }
];

const Connector = ({ index }: { index: number }) => (
    <div className={`kgw-connector kgw-connector-${index}`}>
        <div className="kgw-line">
            <div className="kgw-dot" />
        </div>
    </div>
);

const ProcessFlow = () => {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const nodeEls = gsap.utils.toArray(".kgw-node-outer", container.current);
        const contentEls = gsap.utils.toArray(".kgw-content", container.current);
        const connectors = gsap.utils.toArray(".kgw-connector", container.current);

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });

        tl.fromTo(nodeEls,
            { y: 40, opacity: 0, scale: 0.85 },
            { y: 0, opacity: 1, scale: 1, duration: 0.65, stagger: 0.25, ease: "back.out(1.4)" }
        )
        .fromTo(connectors,
            { opacity: 0, scaleX: 0 },
            { opacity: 1, scaleX: 1, duration: 0.4, stagger: 0.2, ease: "power2.out" },
            "-=0.5"
        )
        .fromTo(contentEls,
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.2, ease: "power2.out" },
            "-=0.4"
        );
    }, { scope: container });

    return (
        <div className="kgw-wrapper" ref={container}>
            {/* Node row */}
            <div className="kgw-nodes-row">
                {steps.map((step, i) => (
                    <>
                        {i > 0 && <Connector key={`conn-${i}`} index={i} />}
                        <div key={`node-${i}`} className="kgw-node-outer">
                            <div className="kgw-ring r1" />
                            <div className="kgw-ring r2" />
                            <div className="kgw-node">
                                {step.icon}
                            </div>
                            <div className="kgw-num">{step.number}</div>
                        </div>
                    </>
                ))}
            </div>

            {/* Content row */}
            <div className="kgw-content-row">
                {steps.map((step, i) => (
                    <div key={i} className="kgw-content">
                        <h3 className="kgw-title">
                            {step.label}
                            <span>{step.highlight}</span>
                        </h3>
                        <p className="kgw-desc">{step.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProcessFlow;
