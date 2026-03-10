"use client";

const services = [
    {
        title: "Brand Identity",
        desc: "Comprehensive identity systems",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="#ff3c3c" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
        )
    },
    {
        title: "Logo Design",
        desc: "Scalable, distinctive cornerstones",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="#3c78ff" strokeWidth="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <circle cx="12" cy="12" r="4"></circle>
            </svg>
        )
    },
    {
        title: "Social Media",
        desc: "High-impact digital presence",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="#c83cff" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
        )
    },
    {
        title: "Event Brand Identity",
        desc: "Cohesive physical experiences",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="#3cff96" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
        )
    },
    {
        title: "Print Design",
        desc: "High-impact editorial and posters",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="#ff963c" strokeWidth="2">
                <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
                <line x1="12" y1="18" x2="12.01" y2="18"></line>
            </svg>
        )
    }
];

const features = [
    {
        title: "Keep your audience engaged",
        desc: "Premium visual design keeps your users active, invested, and emotionally connected to your brand.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <polyline points="16 11 18 13 22 9"></polyline>
            </svg>
        )
    },
    {
        title: "Grow faster, drive adoption",
        desc: "Crystal clear identity systems help your users understand your value proposition from day one.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
        )
    },
    {
        title: "Unlock new revenue opportunities",
        desc: "Position yourself as a premium option in your market, allowing for higher pricing and trust.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
        )
    },
    {
        title: "Ship faster, stay focused",
        desc: "Stop worrying about design iterations. I handle the entire visual process for you.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4.5 16.5c-1.5 1.26-2 5-2 2s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
                <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
                <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
                <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
            </svg>
        )
    }
];

const ServicesGrid = () => {
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
    };

    return (
        <section className="services-section py-20" id="services">
            <div className="container container-wide">
                <h2 className="section-title text-center">Services</h2>

                <div className="lb-container mt-12">
                    {/* Top Section */}
                    <div className="lb-top-row">
                        <div className="lb-headline-box">
                            <h3>Ready-made<br />services your brand<br />already expects.</h3>
                        </div>
                        <div className="lb-services-list">
                            {services.map((svc, i) => (
                                <div key={i} className="lb-service-item">
                                    <div className="lb-icon-box">
                                        {svc.icon}
                                    </div>
                                    <div className="lb-service-text">
                                        <h4>{svc.title}</h4>
                                        <p>{svc.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Feature Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {features.map((feat, i) => (
                            <div
                                key={i}
                                className="lb-feature-cell border-b border-white/5 md:odd:border-r last:border-b-0"
                                onMouseMove={handleMouseMove}
                            >
                                <div className="lb-feature-icon">
                                    {feat.icon}
                                </div>
                                <h4>{feat.title}</h4>
                                <p>{feat.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServicesGrid;
