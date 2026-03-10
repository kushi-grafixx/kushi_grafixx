"use client";

const ClientMarquee = () => {
    return (
        <section className="client-marquee-section">
            <div className="client-marquee-container">
                <div className="client-marquee-track">
                    {/* Group 1 */}
                    <div className="client-marquee-inner">
                        <span className="client-logo-placeholder">YOUR LOGO</span>
                        <span className="client-logo-placeholder">YOUR LOGO</span>
                        <span className="client-logo-placeholder">YOUR LOGO</span>
                        <span className="client-logo-placeholder">YOUR LOGO</span>
                        <span className="client-logo-placeholder">YOUR LOGO</span>
                        <span className="client-logo-placeholder">YOUR LOGO</span>
                    </div>
                    {/* Group 2 (duplicate for seamless loop) */}
                    <div className="client-marquee-inner" aria-hidden="true">
                        <span className="client-logo-placeholder">YOUR LOGO</span>
                        <span className="client-logo-placeholder">YOUR LOGO</span>
                        <span className="client-logo-placeholder">YOUR LOGO</span>
                        <span className="client-logo-placeholder">YOUR LOGO</span>
                        <span className="client-logo-placeholder">YOUR LOGO</span>
                        <span className="client-logo-placeholder">YOUR LOGO</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ClientMarquee;
