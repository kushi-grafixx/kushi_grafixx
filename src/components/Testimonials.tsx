"use client";

import { motion } from "framer-motion";

const testimonials = [
    {
        name: "Hammad",
        role: "Freelance Graphic Designer & Video Editor",
        stars: "★★★★★",
        text: "Easy to work with. Fast communication. He was nice. I would definitely recommend him."
    },
    {
        name: "Anthony",
        role: "Helping others live and move better",
        stars: "★★★★★",
        text: "Kushi did an amazing job for me! He made the whole process seamless. He was able to take the information I gave him and turn it into a condensed and clear message with amazing graphics. Well worth the price!"
    },
    {
        name: "Steve Werner",
        role: "Founder",
        stars: "★★★★★",
        text: "Kushi created an amazing banner for me in record time for my LinkedIn profile. For anyone looking for great quality at a fair price and timeless execution — Kushi is the man!!"
    },
    {
        name: "Riley Lorenz",
        role: "Marketing",
        stars: "★★★★★",
        text: "Was in need of a profile clean up. Got exactly that. I have a professional look and am having a much easier time growing my audience."
    },
    {
        name: "Rich Patterson",
        role: "VP of Sales",
        stars: "★★★★★",
        text: "Kushi delivers exceptional design work with a clear understanding of brand needs. Highly professional, fast, and the quality speaks for itself."
    }
];

const Testimonials = () => {
    return (
        <section className="testimonials-section py-24 overflow-hidden" id="testimonials">
            <div className="container container-wide">
                <h2 className="section-title text-center mb-16">What my clients say</h2>

                <div className="relative">
                    <motion.div
                        className="flex gap-8 cursor-grab active:cursor-grabbing"
                        drag="x"
                        dragConstraints={{ right: 0, left: -1500 }} // Adjust based on content width
                    >
                        {testimonials.map((t, i) => (
                            <div key={i} className="lovi-card flex-shrink-0 w-[400px] p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                <div className="lovi-header mb-4">
                                    <span className="lovi-name block text-xl font-bold">{t.name}</span>
                                    <span className="lovi-role block text-sm text-white/40">{t.role}</span>
                                </div>
                                <div className="lovi-stars text-[#ff3c3c] mb-4">{t.stars}</div>
                                <p className="lovi-text text-white/70 leading-relaxed italic">&quot;{t.text}&quot;</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
