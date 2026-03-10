"use client";

import Link from "next/link";
import Image from "next/image";

const Footer = () => {
    return (
        <footer id="contact" className="footer-v3">
            <div className="fv3-top-bar">
                <p className="fv3-tagline">
                    Your brand called.
                    <br />
                    <span>Let&apos;s fix it.</span>
                </p>
                <a
                    href="https://cal.com/kushi-grafixx-lfgzty/15min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fv3-book-btn"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path
                            d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                    </svg>
                    Book a Free Call
                </a>
            </div>

            <div className="fv3-main-grid">
                <div className="fv3-box fv3-box-services">
                    <span className="fv3-box-label">Services</span>
                    <ul className="fv3-list">
                        <li><Link href="#services">Brand Identity</Link></li>
                        <li><Link href="#services">Logo Design</Link></li>
                        <li><Link href="#services">Social Media Design</Link></li>
                        <li><Link href="#services">Event Brand Identity</Link></li>
                        <li><Link href="#services">Print & Posters</Link></li>
                        <li><Link href="#services">Packaging Design</Link></li>
                        <li><Link href="#services">Web Design (Framer)</Link></li>
                    </ul>
                </div>

                <div className="fv3-box fv3-box-work">
                    <span className="fv3-box-label">Divisions</span>
                    <ul className="fv3-list">
                        <li className="fv3-division-entry">
                            <span className="fv3-coming-soon">Coming Soon</span>
                            <span className="fv3-division-name">Kushi Geo</span>
                            <span className="fv3-division-sub">Geospatial Intelligence</span>
                            <span className="fv3-division-tags">GIS &bull; Weather &bull; Spatial Analysis</span>
                        </li>
                    </ul>
                </div>

                <div className="fv3-box fv3-box-connect">
                    <span className="fv3-box-label">Connect</span>
                    <div className="fv3-connect-links">
                        <a href="https://www.instagram.com/kushi.grafixx/" target="_blank" rel="noopener noreferrer" className="fv3-social-link">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                                <rect x="2" y="2" width="20" height="20" rx="5" />
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                            </svg>
                            Instagram
                            <svg className="fv3-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M7 17l10-10M7 7h10v10" />
                            </svg>
                        </a>
                        <a href="https://x.com/kushi_grafixx" target="_blank" rel="noopener noreferrer" className="fv3-social-link">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.735-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                            Twitter / X
                            <svg className="fv3-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M7 17l10-10M7 7h10v10" />
                            </svg>
                        </a>
                        <a href="https://www.linkedin.com/in/kushigrafixx/" target="_blank" rel="noopener noreferrer" className="fv3-social-link">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                <rect x="2" y="9" width="4" height="12" />
                                <circle cx="4" cy="4" r="2" />
                            </svg>
                            LinkedIn
                            <svg className="fv3-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M7 17l10-10M7 7h10v10" />
                            </svg>
                        </a>
                        <a href="mailto:contact@kushigrafixx.in" className="fv3-social-link">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                                <rect width="20" height="16" x="2" y="4" rx="2" />
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                            </svg>
                            contact@kushigrafixx.in
                            <svg className="fv3-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M7 17l10-10M7 7h10v10" />
                            </svg>
                        </a>
                    </div>
                </div>

                <div className="fv3-box fv3-box-logo" id="fv3-logo-box">
                    <div className="fv3-logo-inner">
                        <Image
                            src="/assets/footer_final_logo3.png"
                            alt="Kushi Grafixx"
                            width={480}
                            height={200}
                            className="fv3-big-logo"
                            id="fv3-big-logo"
                        />
                    </div>
                </div>
            </div>

            <div className="fv3-bottom-bar text-center">
                <p className="fv3-copy">© 2026 Kushi Grafixx. All rights reserved.</p>
                <p className="fv3-copy fv3-copy-right">Designed for brands that deserve better.</p>
            </div>
        </footer>
    );
};

export default Footer;
