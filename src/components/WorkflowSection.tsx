'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

const STEPS = [
    {
        number: '01',
        title: 'Define Your Vision.',
        shortTitle: 'Define',
        subtitle: 'Strategy & direction',
        body: "We figure out what your brand should actually look like. Startups, institutes, personal brands — everyone is welcome to confess their design sins. I turn that chaos into a clear direction.",
        tags: ['Brand Strategy', 'Discovery Call', 'Direction Setting', 'Creative Brief'],
        visual: (
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Outer circle */}
                <circle cx="50" cy="50" r="38" stroke="rgba(255,255,255,0.07)" strokeWidth="1.5"/>
                {/* Mid ring */}
                <circle cx="50" cy="50" r="24" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
                {/* Center dot */}
                <circle cx="50" cy="50" r="3" fill="rgba(232,40,30,0.85)"/>
                {/* North arrow — red */}
                <path d="M50 50 L44 28 L50 36 L56 28 Z" fill="rgba(232,40,30,0.9)"/>
                {/* South arrow — dim */}
                <path d="M50 50 L44 72 L50 64 L56 72 Z" fill="rgba(255,255,255,0.1)"/>
                {/* Cardinal ticks */}
                <line x1="50" y1="10" x2="50" y2="16" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="50" y1="84" x2="50" y2="90" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="10" y1="50" x2="16" y2="50" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="84" y1="50" x2="90" y2="50" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" strokeLinecap="round"/>
                {/* N label */}
                <text x="50" y="9" textAnchor="middle" fill="rgba(232,40,30,0.7)" fontSize="6" fontFamily="monospace" fontWeight="700">N</text>
                {/* Minor ticks */}
                {[30,60,120,150,210,240,300,330].map(deg => (
                    <line
                        key={deg}
                        x1={50 + 37 * Math.cos((deg - 90) * Math.PI / 180)}
                        y1={50 + 37 * Math.sin((deg - 90) * Math.PI / 180)}
                        x2={50 + 40 * Math.cos((deg - 90) * Math.PI / 180)}
                        y2={50 + 40 * Math.sin((deg - 90) * Math.PI / 180)}
                        stroke="rgba(255,255,255,0.08)"
                        strokeWidth="1"
                    />
                ))}
            </svg>
        ),
    },
    {
        number: '02',
        title: 'Submit Your Request.',
        shortTitle: 'Submit',
        subtitle: 'Clean brief, no chaos',
        body: "You drop everything into my design portal. No scattered screenshots. No late night voice notes. Just a clean brief and a clear starting point.",
        tags: ['Design Portal', 'Clear Brief', 'Structured Input', 'No Back-and-Forth'],
        visual: (
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Browser chrome */}
                <rect x="8" y="12" width="84" height="76" rx="6" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5"/>
                {/* Top bar */}
                <rect x="8" y="12" width="84" height="18" rx="6" fill="rgba(255,255,255,0.04)"/>
                <rect x="8" y="22" width="84" height="8" fill="rgba(255,255,255,0.025)"/>
                {/* Browser dots */}
                <circle cx="19" cy="21" r="2" fill="rgba(255,255,255,0.12)"/>
                <circle cx="27" cy="21" r="2" fill="rgba(255,255,255,0.07)"/>
                <circle cx="35" cy="21" r="2" fill="rgba(255,255,255,0.05)"/>
                {/* Form field 1 */}
                <rect x="18" y="38" width="64" height="7" rx="2.5" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
                <rect x="22" y="40.5" width="28" height="2" rx="1" fill="rgba(255,255,255,0.15)"/>
                {/* Form field 2 */}
                <rect x="18" y="50" width="64" height="7" rx="2.5" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
                <rect x="22" y="52.5" width="40" height="2" rx="1" fill="rgba(255,255,255,0.12)"/>
                {/* Form field 3 */}
                <rect x="18" y="62" width="40" height="7" rx="2.5" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
                <rect x="22" y="64.5" width="18" height="2" rx="1" fill="rgba(255,255,255,0.12)"/>
                {/* Submit button — red */}
                <rect x="62" y="62" width="20" height="7" rx="2.5" fill="rgba(232,40,30,0.75)"/>
                {/* Checkmark on button */}
                <path d="M67.5 65.5l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.95"/>
            </svg>
        ),
    },
    {
        number: '03',
        title: 'Review & Refine.',
        shortTitle: 'Refine',
        subtitle: 'Smart revisions, fast delivery',
        body: "I present the strongest concept first. We refine it together until it feels right. Not endless revisions. Just smart improvements that move the work forward.",
        tags: ['First Concept', 'Collaborative Review', 'Smart Revisions', 'Final Delivery'],
        visual: (
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Outer arc — dim, most of circle */}
                <path d="M50 12 A38 38 0 1 1 12 50" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" strokeLinecap="round"/>
                {/* Outer arc — active quarter (red) */}
                <path d="M50 12 A38 38 0 0 1 88 50" stroke="rgba(232,40,30,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
                {/* Arrow heads on arcs */}
                <path d="M12 50 L9 44 M12 50 L18 47.5" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M88 50 L91 44 M88 50 L82 47.5" stroke="rgba(232,40,30,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
                {/* Center check circle */}
                <circle cx="50" cy="50" r="18" fill="rgba(232,40,30,0.05)" stroke="rgba(232,40,30,0.2)" strokeWidth="1.5"/>
                {/* Checkmark */}
                <path d="M41 50.5L48 58L59 42" stroke="rgba(232,40,30,0.9)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                {/* Start/end dots */}
                <circle cx="50" cy="12" r="3" fill="rgba(232,40,30,0.6)"/>
                <circle cx="88" cy="50" r="3" fill="rgba(232,40,30,0.3)"/>
                {/* Sparkles */}
                <circle cx="76" cy="22" r="1.5" fill="rgba(255,255,255,0.18)"/>
                <circle cx="84" cy="34" r="1" fill="rgba(255,255,255,0.12)"/>
                <circle cx="26" cy="24" r="1.5" fill="rgba(255,255,255,0.12)"/>
            </svg>
        ),
    },
];

const WorkflowSection = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [hasEntered, setHasEntered] = useState(false);
    const [animKey, setAnimKey] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);
    const autoProgressRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const autoTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Section entrance
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setHasEntered(true); },
            { threshold: 0.2 }
        );
        if (sectionRef.current) obs.observe(sectionRef.current);
        return () => obs.disconnect();
    }, []);

    // Auto-progress through steps (4s per step)
    const startAutoProgress = useCallback(() => {
        if (autoProgressRef.current) clearInterval(autoProgressRef.current);
        autoProgressRef.current = setInterval(() => {
            setActiveStep(s => (s + 1) % STEPS.length);
            setAnimKey(k => k + 1);
        }, 4000);
    }, []);

    const stopAutoProgress = useCallback(() => {
        if (autoProgressRef.current) {
            clearInterval(autoProgressRef.current);
            autoProgressRef.current = null;
        }
        if (autoTimeoutRef.current) {
            clearTimeout(autoTimeoutRef.current);
            autoTimeoutRef.current = null;
        }
    }, []);

    useEffect(() => {
        if (hasEntered) startAutoProgress();
        return () => stopAutoProgress();
    }, [hasEntered, startAutoProgress, stopAutoProgress]);

    const handleStepClick = (i: number) => {
        stopAutoProgress();
        setActiveStep(i);
        setAnimKey(k => k + 1);
        // Resume auto-progress after 8s of inactivity
        autoTimeoutRef.current = setTimeout(startAutoProgress, 8000);
    };

    // Progress fill height: 0% = step 0, 50% = step 1, 100% = step 2
    const progressHeight = `${(activeStep / (STEPS.length - 1)) * 100}%`;

    return (
        <section
            id="process"
            className={`workflow-section${hasEntered ? ' kg-entered' : ''}`}
            ref={sectionRef}
        >
            <div className="container container-wide">

                {/* ── Header ───────────────────────────────────────── */}
                <div className="wf-header">
                    <span className="kg-eyebrow kg-reveal" style={{ '--delay': '0s' } as React.CSSProperties}>
                        Process
                    </span>
                    <h2 className="section-title kg-reveal" style={{ '--delay': '0.08s' } as React.CSSProperties}>
                        The KG Workflow
                    </h2>
                    <p className="wf-subtitle kg-reveal" style={{ '--delay': '0.16s' } as React.CSSProperties}>
                        A simple, no-nonsense workflow that keeps things clean,<br />
                        fast, and drama-free.
                    </p>
                </div>

                {/* ── Body: step list + detail panel ───────────────── */}
                <div className="wf-body">

                    {/* LEFT: Step list */}
                    <div
                        className="wf-steps"
                        onMouseEnter={stopAutoProgress}
                        onMouseLeave={startAutoProgress}
                    >
                        {/* Vertical track + fill */}
                        <div className="wf-track" aria-hidden="true">
                            <div
                                className="wf-track__fill"
                                style={{ height: progressHeight }}
                            />
                        </div>

                        {STEPS.map((step, i) => (
                            <div
                                key={step.number}
                                className={[
                                    'wf-step',
                                    activeStep === i ? 'wf-step--active' : '',
                                    'kg-reveal',
                                ].filter(Boolean).join(' ')}
                                style={{ '--delay': `${0.1 + i * 0.1}s` } as React.CSSProperties}
                                onClick={() => handleStepClick(i)}
                                role="button"
                                tabIndex={0}
                                aria-label={`Step ${step.number}: ${step.title}`}
                                aria-pressed={activeStep === i}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') handleStepClick(i);
                                }}
                            >
                                {/* Number dot */}
                                <div className="wf-step__dot" aria-hidden="true">
                                    <span className="wf-step__dot-num">{step.number}</span>
                                    <span className="wf-step__dot-ring" aria-hidden="true" />
                                </div>

                                {/* Text content */}
                                <div className="wf-step__text">
                                    <span className="wf-step__title">{step.shortTitle}</span>
                                    <span className="wf-step__sub">{step.subtitle}</span>
                                </div>

                                {/* Chevron */}
                                <div className="wf-step__chevron" aria-hidden="true">
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                        <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* RIGHT: Detail panel */}
                    <div className="wf-panel" aria-live="polite" aria-atomic="true">
                        {STEPS.map((step, i) => (
                            <div
                                key={step.number}
                                className={[
                                    'wf-card',
                                    activeStep === i ? 'wf-card--active' : '',
                                ].filter(Boolean).join(' ')}
                                data-step={step.number}
                                aria-hidden={activeStep !== i}
                            >
                                {/* Red gradient line across top */}
                                <div className="wf-card__topline" aria-hidden="true" />

                                {/* Step number display — no "Step" label */}
                                <div className="wf-card__num">
                                    <span
                                        key={`num-${step.number}-${animKey}`}
                                        className="wf-card__num-text"
                                    >
                                        {step.number}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="wf-card__title">{step.title}</h3>

                                {/* Body */}
                                <p className="wf-card__body">{step.body}</p>

                                {/* Tags */}
                                <div className="wf-card__tags" role="list">
                                    {step.tags.map((tag, j) => (
                                        <span
                                            key={j}
                                            className="wf-tag"
                                            role="listitem"
                                            style={{ '--tag-i': j } as React.CSSProperties}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Intentional SVG visual */}
                                <div className="wf-card__visual" aria-hidden="true">
                                    {step.visual}
                                </div>

                                {/* Large watermark number */}
                                <div className="wf-card__watermark" aria-hidden="true">{step.number}</div>

                                {/* Progress dots at bottom */}
                                <div className="wf-card__progress" aria-hidden="true">
                                    {STEPS.map((_, j) => (
                                        <span
                                            key={j}
                                            className={`wf-card__prog-dot${j === i ? ' wf-card__prog-dot--active' : ''}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>{/* /wf-body */}
            </div>
        </section>
    );
};

export default WorkflowSection;
