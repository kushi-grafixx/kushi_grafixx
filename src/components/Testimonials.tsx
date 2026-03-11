"use client";
const testimonials = [
    {
        name: "Enosh",
        role: "Director of Business Operations",
        stars: "★★★★★",
        text: "Thank you very much for all your efforts & support in branding our company... I really liked your thought process on the logo part... It made perfect sense and looking at the response we getting from visitors, it's safe to say people are liking it."
    },
    {
        name: "Swasthik Acharya",
        role: "Yoga Therapist",
        stars: "★★★★★",
        text: "Kushi means happiness and that's what we get after receiving the final work from him. His service and dedication is impeccable. He takes up every work professionally along with a personal touch."
    },
    {
        name: "Shikshaa Shetty",
        role: "Business Owner",
        stars: "★★★★★",
        text: "Kushi is an exceptional digital artist with a high level of professionalism. He understands the context and theme easily and creates artworks in accordance with it. He delivers tasks on time as promised. Highly recommend him."
    },
    {
        name: "Zac Solipsism",
        role: "#1 Premium Ghostwriter For Self-Improvement Coaches",
        stars: "★★★★★",
        text: "This is by far the best banner/avatar combination I have ever used for my brand. Kushi takes the time to understand your brand and provides you with high quality assets. Would highly recommend."
    },
    {
        name: "Pathanjali Pare",
        role: "Co-founder",
        stars: "★★★★★",
        text: "Kushi is a good designer! Patiently handled revisions, delivering great designs for our hoodies and t-shirts. Attentive to our preferences, he transformed ideas into stunning designs. A skilled artist with a keen understanding of client needs ✨"
    },
    {
        name: "Key",
        role: "Ghostwriter",
        stars: "★★★★★",
        text: "Working with Kushi was awesome. He over-delivered and was always worried if everything was ok. He didn't mind changing things over and over again. Would 100% recommend him and will 100% use him again!"
    },
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

const Testimonials = ({ hideHeading = false }: { hideHeading?: boolean }) => {
    return (
        <section className="reviews-section" id={hideHeading ? undefined : "testimonials"}>
            {!hideHeading && (
                <div className="container container-wide">
                    <h2 className="section-title text-center heading-split">Don&apos;t just take my word for it.</h2>
                </div>
            )}

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
