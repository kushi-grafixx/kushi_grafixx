"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const faqs = [
    {
        q: "What services do you provide?",
        a: "I help brands look premium with identity design, brand visuals, packaging, mockups, and all the good stuff that stops your audience from scrolling past you."
    },
    {
        q: "How do I start working with you?",
        a: "Easy. Book a free call. We talk. You explain your vision. I pretend your old branding didn't hurt my eyes. Then we start."
    },
    {
        q: "What tools do you use?",
        a: "Figma and Photoshop. And occasionally sheer willpower when a client says \"Just make it pop\"."
    },
    {
        q: "How long does a project take?",
        a: "Most projects take one to four weeks depending on scope. Faster if you reply on time. Slower if you disappear like a Netflix cliffhanger."
    },
    {
        q: "Do you provide revisions?",
        a: "Of course. I want you to love the final design. But we're not redesigning the Eiffel Tower twelve times."
    },
    {
        q: "What industries do you work with?",
        a: "Startups, D2C brands, educational institutes, creators, professionals, you name it. If you need clean visuals, I'm in."
    },
    {
        q: "Do you provide development services?",
        a: "Yes. I build in Framer. Smooth interactions. Clean transitions. Zero chaos. Your brand will glide, not glitch."
    },
    {
        q: "Can you redesign my existing brand?",
        a: "Absolutely. I can turn your outdated identity into something you'll actually want to show people."
    },
    {
        q: "What is your pricing like?",
        a: "Pricing depends on scope. We talk. You tell me your goals. I give you a clear quote. No hidden fees. No surprise invoices at 2 AM."
    },
    {
        q: "Do you work with urgent deadlines?",
        a: "Yes, but only if \"urgent\" doesn't mean \"deliver this whole identity tomorrow morning\"."
    },
    {
        q: "How do payments work?",
        a: "Simple. Advance to start. Final payment before delivery. Just like ordering biryani online. But with more creativity."
    },
    {
        q: "Will you judge my current branding?",
        a: "Maybe a little. But silently. And with love. Because that's what glow-ups are for."
    }
];

const FaqItem = ({ q, a }: { q: string; a: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`faq-item ${isOpen ? 'active' : ''}`}>
            {/* Client question — scroll-revealed by GSAP */}
            <div
                className="chat-msg client faq-client-msg flex-nowrap"
                onClick={() => setIsOpen(!isOpen)}
                style={{ opacity: 0, transform: 'translateY(16px)' }}
            >
                {/* The Toggle Icon - Sits OUTSIDE the pill, to the Left */}
                <div className={`faq-toggle-icon shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 transition-colors duration-300 mr-3 ${isOpen ? 'rotate-45' : ''}`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 transform">
                        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>

                {/* The Pill Content */}
                <div className="chat-bubble faq-pill flex items-center justify-between no-select shrink-1">
                    <span className="faq-question-text font-medium text-left">{q}</span>
                </div>
            </div>

            {/* Kushi answer — hidden by CSS until .active, then CSS-animated in */}
            <div className="chat-msg kushi">
                <div className="chat-avatar">
                    <img src="/assets/kushi_icon_red.png" alt="Kushi" />
                </div>
                <div className="chat-bubble">{a}</div>
            </div>
        </div>
    );
};

const FAQ = () => {
    const container = useRef(null);

    useGSAP(() => {
        // Only scroll-reveal the client question bubbles
        const questions = gsap.utils.toArray('.faq-client-msg');
        questions.forEach((q: any) => {
            gsap.to(q, {
                scrollTrigger: {
                    trigger: q,
                    start: "top 95%",
                    toggleActions: "play none none reverse"
                },
                y: 0,
                opacity: 1,
                duration: 0.55,
                ease: "power2.out"
            });
        });
    }, { scope: container });

    return (
        <section className="faq-section py-32" id="faq" ref={container}>
            <div className="container faq-container">
                <h2 className="section-title text-center heading-split">Frequently Asked Questions</h2>
                <div className="chat-container">
                    {faqs.map((faq, i) => (
                        <FaqItem key={i} {...faq} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
