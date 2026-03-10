"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
    {
        q: "What services do you provide?",
        a: "I help brands look premium with identity design, brand visuals, packaging, mockups, and all the good stuff that stops your audience from scrolling past you."
    },
    {
        q: "How do I start working with you?",
        a: "Easy. Book a free call. We talk. You explain your vision. I pretend your old branding didn’t hurt my eyes. Then we start."
    },
    {
        q: "What tools do you use?",
        a: "Figma and Photoshop. And occasionally sheer willpower when a client says “Just make it pop”."
    },
    {
        q: "How long does a project take?",
        a: "Most projects take one to four weeks depending on scope. Faster if you reply on time. Slower if you disappear like a Netflix cliffhanger."
    },
    {
        q: "Do you provide revisions?",
        a: "Of course. I want you to love the final design. But we’re not redesigning the Eiffel Tower twelve times."
    },
    {
        q: "What industries do you work with?",
        a: "Startups, D2C brands, educational institutes, creators, professionals, you name it. If you need clean visuals, I’m in."
    }
];

const FaqItem = ({ q, a }: { q: string; a: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="faq-item border-b border-white/10 last:border-0 py-6">
            <div
                className="chat-msg client flex items-center gap-4 cursor-pointer group"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className={`faq-toggle transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                </span>
                <div className="chat-bubble px-6 py-4 rounded-3xl bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
                    {q}
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="chat-msg kushi flex gap-4 mt-6 pl-12">
                            <div className="chat-avatar shrink-0 w-10 h-10 rounded-full bg-[#ff3c3c] flex items-center justify-center">
                                <Image src="/assets/kushi_icon_red.png" alt="Kushi" width={24} height={24} className="invert brightness-0" />
                            </div>
                            <div className="chat-bubble px-6 py-4 rounded-3xl bg-[#ff3c3c]/10 border border-[#ff3c3c]/20 text-white/80 leading-relaxed">
                                {a}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQ = () => {
    return (
        <section className="faq-section py-24" id="faq">
            <div className="container max-w-4xl">
                <h2 className="section-title text-center mb-16">Frequently Asked Questions</h2>
                <div className="chat-container space-y-4">
                    {faqs.map((faq, i) => (
                        <FaqItem key={i} {...faq} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
