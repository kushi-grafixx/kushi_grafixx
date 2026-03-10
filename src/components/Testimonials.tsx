"use client";
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
        <section className="reviews-section" id="testimonials">
            <div className="container container-wide">
                <h2 className="section-title text-center heading-split">Don&apos;t just take my word for it.</h2>
            </div>

            <div className="marquee-container">
                <div className="marquee-track">
                    {testimonials.map((t, i) => (
                        <div key={`t1-${i}`} className="lovi-card">
                            <div className="lovi-header">
                                <span className="lovi-name">{t.name}</span>
                                <span className="lovi-role">{t.role}</span>
                            </div>
                            <div className="lovi-stars">{t.stars}</div>
                            <p className="lovi-text">&quot;{t.text}&quot;</p>
                        </div>
                    ))}
                    {/* Duplicate the testimonials for continuous marquee scrolling */}
                    {testimonials.map((t, i) => (
                        <div key={`t2-${i}`} className="lovi-card">
                            <div className="lovi-header">
                                <span className="lovi-name">{t.name}</span>
                                <span className="lovi-role">{t.role}</span>
                            </div>
                            <div className="lovi-stars">{t.stars}</div>
                            <p className="lovi-text">&quot;{t.text}&quot;</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
