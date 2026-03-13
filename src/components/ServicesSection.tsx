'use client';

import { useState, useRef, useEffect } from 'react';

// ─── Service Data ──────────────────────────────────────────────────────────────
const SERVICES = [
    {
        id: 'brand-identity',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
            </svg>
        ),
        title: 'Brand Identity',
        shortLabel: 'Brand',
        description: 'Comprehensive identity systems that make your brand impossible to ignore — from first impression to lasting recall.',
        deliverables: [
            'Logomark + Wordmark system',
            'Full color palette',
            'Typography hierarchy',
            'Brand guidelines PDF',
            'Asset library (all formats)',
            'Tone of voice doc',
        ],
        visual: (
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Construction circles */}
                <circle cx="40" cy="40" r="32" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
                <circle cx="40" cy="40" r="20" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
                {/* Cross hairs */}
                <line x1="40" y1="6" x2="40" y2="74" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
                <line x1="6" y1="40" x2="74" y2="40" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
                {/* Hexagonal logomark */}
                <polygon points="40,16 57,25.5 57,44.5 40,54 23,44.5 23,25.5" stroke="rgba(232,40,30,0.55)" strokeWidth="1.5" fill="rgba(232,40,30,0.05)"/>
                {/* Inner mark */}
                <polygon points="40,24 51,30 51,42 40,48 29,42 29,30" stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="rgba(255,255,255,0.02)"/>
                {/* Center */}
                <circle cx="40" cy="36" r="3.5" fill="rgba(232,40,30,0.7)"/>
                {/* Corner ticks */}
                <circle cx="40" cy="14" r="1.5" fill="rgba(232,40,30,0.35)"/>
                <circle cx="59" cy="24.5" r="1.5" fill="rgba(255,255,255,0.12)"/>
                <circle cx="59" cy="45.5" r="1.5" fill="rgba(255,255,255,0.12)"/>
            </svg>
        ),
    },
    {
        id: 'logo-design',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10"/>
                <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                <line x1="9" y1="9" x2="9.01" y2="9"/>
                <line x1="15" y1="9" x2="15.01" y2="9"/>
            </svg>
        ),
        title: 'Logo Design',
        shortLabel: 'Logo',
        description: 'Scalable, distinctive marks crafted with precision and intention — every logo mark is a visual system in itself.',
        deliverables: [
            'Primary logomark',
            'Alternate lockups',
            'Dark + light variants',
            "Monochrome + favicon",
            'SVG / PNG / PDF exports',
            "Usage do/don'ts",
        ],
        visual: (
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Bezier path */}
                <path d="M13 58 C22 58 32 18 50 28 C60 34 65 22 65 22" stroke="rgba(232,40,30,0.55)" strokeWidth="1.5" strokeLinecap="round"/>
                {/* Anchor point 1 */}
                <rect x="9" y="54" width="8" height="8" rx="1.5" stroke="rgba(255,255,255,0.22)" strokeWidth="1" fill="rgba(10,10,10,0.9)"/>
                {/* Anchor point 2 — active */}
                <rect x="46" y="24" width="8" height="8" rx="1.5" stroke="rgba(232,40,30,0.55)" strokeWidth="1.5" fill="rgba(232,40,30,0.08)"/>
                {/* Anchor point 3 */}
                <rect x="61" y="18" width="8" height="8" rx="1.5" stroke="rgba(255,255,255,0.22)" strokeWidth="1" fill="rgba(10,10,10,0.9)"/>
                {/* Control handles */}
                <line x1="13" y1="58" x2="24" y2="28" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
                <circle cx="24" cy="28" r="2" fill="rgba(255,255,255,0.15)"/>
                <line x1="50" y1="28" x2="60" y2="20" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
                <circle cx="60" cy="20" r="2" fill="rgba(255,255,255,0.12)"/>
                {/* Pen tool cursor */}
                <path d="M58 50 L63 58 L65.5 53 L70 51 L62 45 Z" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.18)" strokeWidth="1" strokeLinejoin="round"/>
            </svg>
        ),
    },
    {
        id: 'social-media',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="9" height="9" rx="2"/>
                <rect x="13" y="2" width="9" height="9" rx="2"/>
                <rect x="2" y="13" width="9" height="9" rx="2"/>
                <rect x="13" y="13" width="9" height="9" rx="2"/>
            </svg>
        ),
        title: 'Social Media',
        shortLabel: 'Social',
        description: 'High-impact digital presence built for scroll-stopping consistency. Templates that look intentional, not canva-ish.',
        deliverables: [
            'Post template system',
            'Story format kit',
            'Profile + banner design',
            'Highlight cover set',
            'Content calendar graphics',
            'Brand voice guidelines',
        ],
        visual: (
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* 2x2 post grid */}
                {/* Top-left — active/featured */}
                <rect x="6" y="8" width="32" height="32" rx="4" fill="rgba(232,40,30,0.07)" stroke="rgba(232,40,30,0.3)" strokeWidth="1.5"/>
                {/* Lines inside featured post */}
                <line x1="12" y1="18" x2="32" y2="18" stroke="rgba(232,40,30,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="12" y1="24" x2="26" y2="24" stroke="rgba(232,40,30,0.3)" strokeWidth="1" strokeLinecap="round"/>
                <circle cx="32" cy="30" r="4" fill="rgba(232,40,30,0.12)" stroke="rgba(232,40,30,0.35)" strokeWidth="1"/>
                {/* Top-right post */}
                <rect x="42" y="8" width="32" height="32" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
                <line x1="48" y1="20" x2="68" y2="20" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="48" y1="26" x2="60" y2="26" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeLinecap="round"/>
                {/* Bottom-left post */}
                <rect x="6" y="44" width="32" height="32" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
                <line x1="12" y1="56" x2="32" y2="56" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="12" y1="62" x2="24" y2="62" stroke="rgba(255,255,255,0.07)" strokeWidth="1" strokeLinecap="round"/>
                {/* Bottom-right post */}
                <rect x="42" y="44" width="32" height="32" rx="4" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
                <line x1="48" y1="56" x2="68" y2="56" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
        ),
    },
    {
        id: 'event-identity',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
            </svg>
        ),
        title: 'Event Identity',
        shortLabel: 'Events',
        description: 'Cohesive physical experiences — from stage to swag. Every touchpoint feels like it was designed by the same brain.',
        deliverables: [
            'Stage + backdrop design',
            'Ticket + badge design',
            'Merch graphics',
            'Presentation decks',
            'Signage system',
            'Digital + print assets',
        ],
        visual: (
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Ticket shape with perforated edge */}
                <path d="M6 24 L74 24 L74 34 Q64 34 64 40 Q64 46 74 46 L74 56 L6 56 L6 46 Q16 46 16 40 Q16 34 6 34 Z" stroke="rgba(232,40,30,0.4)" strokeWidth="1.5" fill="rgba(232,40,30,0.04)"/>
                {/* Perforated divider */}
                <line x1="16" y1="40" x2="64" y2="40" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3 3"/>
                {/* Ticket label area */}
                <rect x="12" y="28" width="36" height="4" rx="1.5" fill="rgba(232,40,30,0.35)"/>
                <rect x="12" y="34" width="22" height="3" rx="1" fill="rgba(255,255,255,0.1)"/>
                {/* Star */}
                <path d="M56 43 L57.8 48 L63 48 L58.8 51 L60.5 56 L56 53 L51.5 56 L53.2 51 L49 48 L54.2 48 Z" fill="rgba(232,40,30,0.2)" stroke="rgba(232,40,30,0.5)" strokeWidth="0.75" strokeLinejoin="round"/>
                {/* Barcode lines */}
                <line x1="22" y1="45" x2="22" y2="54" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5"/>
                <line x1="25" y1="45" x2="25" y2="54" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
                <line x1="28" y1="45" x2="28" y2="54" stroke="rgba(255,255,255,0.12)" strokeWidth="2"/>
                <line x1="32" y1="45" x2="32" y2="54" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
                <line x1="35" y1="45" x2="35" y2="54" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5"/>
            </svg>
        ),
    },
    {
        id: 'print-packaging',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
            </svg>
        ),
        title: 'Print & Packaging',
        shortLabel: 'Print',
        description: 'High-impact editorial, posters, and packaging that demand attention — because shelf presence is a brand decision.',
        deliverables: [
            'Packaging dieline + design',
            'Poster / flyer series',
            'Brochure + lookbook',
            'Mockup presentations',
            'Print-ready files',
            'Vendor-ready specs',
        ],
        visual: (
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Box top face (isometric perspective) */}
                <polygon points="40,6 68,21 40,36 12,21" stroke="rgba(232,40,30,0.45)" strokeWidth="1.5" fill="rgba(232,40,30,0.05)" strokeLinejoin="round"/>
                {/* Box right face */}
                <polygon points="40,36 68,21 68,51 40,66" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="rgba(255,255,255,0.02)" strokeLinejoin="round"/>
                {/* Box left face */}
                <polygon points="40,36 12,21 12,51 40,66" stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="rgba(255,255,255,0.015)" strokeLinejoin="round"/>
                {/* Top ridge */}
                <line x1="40" y1="6" x2="40" y2="36" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
                {/* Label lines on left face */}
                <line x1="18" y1="35" x2="34" y2="43.5" stroke="rgba(232,40,30,0.35)" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="18" y1="40" x2="30" y2="46.5" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeLinecap="round"/>
                {/* Glow dot on top */}
                <circle cx="40" cy="21" r="2.5" fill="rgba(232,40,30,0.5)"/>
            </svg>
        ),
    },
];

// ─── Value Props Data ──────────────────────────────────────────────────────────
const VALUE_PROPS = [
    {
        icon: '◈',
        title: 'Keep your audience engaged',
        body: 'Premium visual design keeps your users active, invested, and emotionally connected to your brand.',
    },
    {
        icon: '◇',
        title: 'Grow faster, drive adoption',
        body: 'Crystal clear identity systems help your users understand your value proposition from day one.',
    },
    {
        icon: '▦',
        title: 'Unlock new revenue',
        body: 'Position yourself as a premium option in your market, allowing for higher pricing and trust.',
    },
    {
        icon: '→',
        title: 'Ship faster, stay focused',
        body: 'Stop worrying about design iterations. I handle the entire visual process for you.',
    },
];

// ─── Shared marquee tag rows (3 copies for seamless loop) ──────────────────────
const ROW1_TAGS = [
    { icon: <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 9h6M9 12h6M9 15h4" /></svg>, label: 'Layout Design' },
    { icon: <svg viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>, label: 'Presentation Design' },
    { icon: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" /><path d="M4.93 4.93a10 10 0 0 0 0 14.14" /></svg>, label: 'Visual Systems' },
    { icon: <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>, label: 'Brand Identity' },
    { icon: <svg viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /></svg>, label: 'Packaging Design' },
    { icon: <svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>, label: 'Mockup Design' },
    { icon: <svg viewBox="0 0 24 24"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>, label: 'Copywriting' },
    { icon: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>, label: 'Web Design' },
];

const ROW2_TAGS = [
    { icon: <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>, label: 'Creative Direction' },
    { icon: <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" /></svg>, label: 'Iconography' },
    { icon: <svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>, label: 'Social Media Visuals' },
    { icon: <svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>, label: 'Product Brand Identity' },
    { icon: <svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>, label: 'Institutional Design' },
    { icon: <svg viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>, label: 'Marketing Assets' },
    { icon: <svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>, label: 'Motion Graphics' },
    { icon: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" /></svg>, label: 'Art Direction' },
];

const TagRow = ({ tags, className }: { tags: typeof ROW1_TAGS; className: string }) => (
    <div className="lb-marquee-track lb-marquee-inner-wrap">
        <div className={className}>
            {[0, 1, 2].map(copy => (
                <div key={copy} className="lb-marquee-inner" aria-hidden={copy > 0 ? true : undefined}>
                    {tags.map((t, i) => (
                        <span key={i} className="lb-tag">
                            {t.icon}{t.label}
                        </span>
                    ))}
                </div>
            ))}
        </div>
    </div>
);

// ─── Component ─────────────────────────────────────────────────────────────────
const ServicesSection = () => {
    const [activeIdx, setActiveIdx] = useState<number | null>(null);
    const [hasEntered, setHasEntered] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const accordionRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const rafRef = useRef<number>(0);

    // Scroll-enter reveal
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setHasEntered(true); },
            { threshold: 0.15 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    // Mouse spotlight on accordion (red glow follows cursor) — uses rAF
    useEffect(() => {
        const el = accordionRef.current;
        if (!el) return;
        const onMove = (e: MouseEvent) => {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(() => {
                const rect = el.getBoundingClientRect();
                el.style.setProperty('--spt-x', `${e.clientX - rect.left}px`);
                el.style.setProperty('--spt-y', `${e.clientY - rect.top}px`);
            });
        };
        el.addEventListener('mousemove', onMove);
        return () => {
            el.removeEventListener('mousemove', onMove);
            cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <section
            id="services"
            className={`services-section${hasEntered ? ' kg-entered' : ''}`}
            ref={sectionRef}
        >
            <div className="container container-wide">

                {/* ── Section Header ─────────────────────────────────── */}
                <div className="svc-header kg-reveal" style={{ '--delay': '0s' } as React.CSSProperties}>
                    <span className="kg-eyebrow">Services</span>
                    <h2 className="section-title">
                        Ready-made services<br />your brand already expects.
                    </h2>
                </div>

                {/* ── Accordion ──────────────────────────────────────── */}
                <div
                    className={`svc-accordion${activeIdx !== null ? ' svc-accordion--active' : ''}`}
                    ref={accordionRef}
                    onMouseLeave={() => setActiveIdx(null)}
                >
                    {SERVICES.map((svc, i) => (
                        <div
                            key={svc.id}
                            ref={el => { cardRefs.current[i] = el; }}
                            className={[
                                'svc-card',
                                activeIdx === i ? 'svc-card--open' : '',
                                activeIdx !== null && activeIdx !== i ? 'svc-card--dimmed' : '',
                            ].filter(Boolean).join(' ')}
                            onMouseEnter={() => setActiveIdx(i)}
                            onTransitionEnd={(e) => {
                                if (e.propertyName === 'flex') {
                                    e.currentTarget.style.willChange = 'auto';
                                }
                            }}
                            role="button"
                            tabIndex={0}
                            aria-expanded={activeIdx === i}
                            aria-label={`Learn about ${svc.title}`}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    setActiveIdx(activeIdx === i ? null : i);
                                }
                                if (e.key === 'ArrowRight' && i < SERVICES.length - 1) {
                                    setActiveIdx(i + 1);
                                    cardRefs.current[i + 1]?.focus();
                                }
                                if (e.key === 'ArrowLeft' && i > 0) {
                                    setActiveIdx(i - 1);
                                    cardRefs.current[i - 1]?.focus();
                                }
                            }}
                        >
                            {/* Top accent line */}
                            <div className="svc-card__accent-line" aria-hidden="true" />

                            {/* ── COLLAPSED STATE ──────────────────────── */}
                            <div className="svc-card__collapsed" aria-hidden={activeIdx === i}>
                                <div className="svc-card__icon-sm">{svc.icon}</div>
                                <span className="svc-card__label-vert">{svc.shortLabel}</span>
                                <span className="svc-card__index" aria-hidden="true">0{i + 1}</span>
                            </div>

                            {/* ── EXPANDED STATE ───────────────────────── */}
                            <div className="svc-card__expanded" aria-hidden={activeIdx !== i}>
                                <div className="svc-card__exp-top">
                                    <div className="svc-card__icon-lg">{svc.icon}</div>
                                    <div className="svc-card__exp-index" aria-hidden="true">0{i + 1}</div>
                                </div>

                                <h3 className="svc-card__title">{svc.title}</h3>
                                <p className="svc-card__desc">{svc.description}</p>

                                <ul className="svc-card__list" role="list">
                                    {svc.deliverables.map((item, j) => (
                                        <li key={j} className="svc-card__list-item" style={{ '--item-i': j } as React.CSSProperties}>
                                            <span className="svc-card__list-dot" aria-hidden="true" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>

                                {/* Intentional SVG visual */}
                                <div className="svc-card__visual" aria-hidden="true">
                                    {svc.visual}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Cursor spotlight overlay */}
                    <div className="svc-accordion__spotlight" aria-hidden="true" />
                </div>

                {/* ── Value Props ────────────────────────────────────── */}
                <div className="svc-values">
                    {VALUE_PROPS.map((vp, i) => (
                        <div
                            key={i}
                            className="svc-value-card kg-reveal"
                            style={{ '--delay': `${0.05 + i * 0.08}s` } as React.CSSProperties}
                        >
                            <span className="svc-value-card__icon" aria-hidden="true">{vp.icon}</span>
                            <h4 className="svc-value-card__title">{vp.title}</h4>
                            <p className="svc-value-card__body">{vp.body}</p>
                            <div className="svc-value-card__dot" aria-hidden="true" />
                        </div>
                    ))}
                </div>

            </div>{/* /container */}

            {/* ── TAG MARQUEES — 3 copies for seamless infinite loop ──────── */}
            <div className="lb-bottom-row lb-marquee-box">
                {/* Row 1 — scrolls LEFT */}
                <div className="lb-marquee-row">
                    <div className="lb-marquee-track lb-marquee-left">
                        {[0, 1, 2].map(copy => (
                            <div key={copy} className="lb-marquee-inner" aria-hidden={copy > 0 ? true : undefined}>
                                <span className="lb-tag"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 9h6M9 12h6M9 15h4" /></svg>Layout Design</span>
                                <span className="lb-tag"><svg viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>Presentation Design</span>
                                <span className="lb-tag"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" /><path d="M4.93 4.93a10 10 0 0 0 0 14.14" /></svg>Visual Systems</span>
                                <span className="lb-tag"><svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>Brand Identity</span>
                                <span className="lb-tag"><svg viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /></svg>Packaging Design</span>
                                <span className="lb-tag"><svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>Mockup Design</span>
                                <span className="lb-tag"><svg viewBox="0 0 24 24"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>Copywriting</span>
                                <span className="lb-tag"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>Web Design</span>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Row 2 — scrolls RIGHT */}
                <div className="lb-marquee-row">
                    <div className="lb-marquee-track lb-marquee-right">
                        {[0, 1, 2].map(copy => (
                            <div key={copy} className="lb-marquee-inner" aria-hidden={copy > 0 ? true : undefined}>
                                <span className="lb-tag"><svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>Creative Direction</span>
                                <span className="lb-tag"><svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" /></svg>Iconography</span>
                                <span className="lb-tag"><svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>Social Media Visuals</span>
                                <span className="lb-tag"><svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>Product Brand Identity</span>
                                <span className="lb-tag"><svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>Institutional Design</span>
                                <span className="lb-tag"><svg viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>Marketing Assets</span>
                                <span className="lb-tag"><svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>Motion Graphics</span>
                                <span className="lb-tag"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" /></svg>Art Direction</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </section>
    );
};

export default ServicesSection;
