"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        number: 1,
        title: <><>Define Your</><br /><span className="secondary-text">Vision.</span></>,
        desc: "We figure out what your brand should actually look like. Startups, institutes, personal brands. Everyone is welcome to confess their design sins. I turn that chaos into a clear direction.",
        icon: (
            <svg className="step-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
        )
    },
    {
        number: 2,
        title: <><>Submit Your</><br /><span className="secondary-text">Request.</span></>,
        desc: "You drop everything into my design portal. No scattered screenshots. No late night voice notes. Just a clean brief and a clear starting point.",
        icon: (
            <svg className="step-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M22 2L11 13"></path>
                <path d="M22 2l-7 20-4-9-9-4 20-7z"></path>
            </svg>
        )
    },
    {
        number: 3,
        title: <><>Review &amp;</><br /><span className="secondary-text">Refine.</span></>,
        desc: "I present the strongest concept first. We refine it together until it feels right. Not endless revisions. Just smart improvements.",
        icon: (
            <svg className="step-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
        )
    }
];

const ProcessFlow = () => {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const steps = gsap.utils.toArray(".process-step", container.current);
        
        gsap.fromTo(steps, 
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.3,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    }, { scope: container });

    return (
        <div className="process-grid-new mt-12" ref={container}>
            <div className="timeline-line-new"></div>
            <div className="process-steps-grid">
                {steps.map((step, i) => (
                    <div key={i} className="process-step">
                        <div className="step-icon-wrapper">
                            {step.icon}
                        </div>
                        <div className="timeline-point-new">
                            <div className="timeline-badge-new">{step.number}</div>
                        </div>
                        <div className="process-content-new flex flex-col justify-center py-6 px-4 md:px-8">
                            <h3 className="mb-0 whitespace-nowrap text-2xl md:text-3xl font-bold">{step.title}</h3>
                            <p className="secondary-text mt-2 text-sm md:text-base leading-relaxed text-white/50">{step.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProcessFlow;
