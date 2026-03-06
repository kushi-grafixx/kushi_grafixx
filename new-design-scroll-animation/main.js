document.addEventListener('DOMContentLoaded', () => {

    // 1. Initialize Lenis Smooth Scroll
    // -----------------------------------------------------------------
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        smoothTouch: false
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0, 0);

    // Default Ease for animations
    const CUSTOM_EASE = "power3.out"; // Cubic bezier approximate 0.16, 1, 0.3, 1

    // 2. Custom Cursor
    // -----------------------------------------------------------------
    const cursor = document.querySelector('.custom-cursor');
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isMobile && !reducedMotion && cursor) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let cursorX = mouseX;
        let cursorY = mouseY;

        // Fast follow via GSAP ticker
        gsap.ticker.add(() => {
            // Lerp is optional, but direct is often smoother for small dots
            cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
        });

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Hover states on clickable
        const clickables = document.querySelectorAll('a, button, .faq-header, .clickable');
        clickables.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('active'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
        });
    }

    // 3. Magnetic Buttons
    // -----------------------------------------------------------------
    if (!isMobile && !reducedMotion) {
        const magnets = document.querySelectorAll('.magnetic');
        magnets.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const btnX = rect.left + rect.width / 2;
                const btnY = rect.top + rect.height / 2;

                // radius check ~60px
                const dist = Math.sqrt(Math.pow(e.clientX - btnX, 2) + Math.pow(e.clientY - btnY, 2));

                if (dist < 100) {
                    const moveX = (e.clientX - btnX) * 0.2; // max offset ~ 8px
                    const moveY = (e.clientY - btnY) * 0.2;
                    gsap.to(btn, { x: moveX, y: moveY, duration: 0.3, ease: 'power2.out' });
                }
            });
            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, { x: 0, y: 0, duration: 0.4, ease: 'elastic.out(1, 0.3)' });
            });
        });
    }


    // 4. Global Scroll Progress Indicator
    // -----------------------------------------------------------------
    gsap.to('#global-scroll-line', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0
        }
    });

    // Nav Blur on Scroll
    const nav = document.getElementById('main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });


    // 5. Hero Sequence (Fires once on load)
    // -----------------------------------------------------------------
    if (!reducedMotion) {
        const heroTL = gsap.timeline({
            onComplete: () => { document.body.classList.remove('loading'); }
        });

        // 1. Black Screen for 400ms
        heroTL.set('#hero-curtain', { opacity: 1 })
            .to('#hero-curtain', { opacity: 0, duration: 0.4, delay: 0.4 })

        // 2. Logo slides in from bottom
        heroTL.fromTo('#hero-center-logo',
            { opacity: 0, y: 40, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "elastic.out(1, 0.7)" }, "-=0.2"
        );

        // 3. Hide actual nav logo initially
        heroTL.set('#nav-logo', { opacity: 0 });

        // 4. Nav fades in 
        heroTL.to(nav, { opacity: 1, duration: 0.4 }, "-=0.2");

        // 5. Headline 1: "Your brand called."
        heroTL.to('#hero-line-1 .word', {
            y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: CUSTOM_EASE
        }, "-=0.2");

        // 6. Pause 500ms then "It needs help."
        heroTL.to('#hero-line-2 .word', {
            y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: CUSTOM_EASE
        }, "+=0.5");

        // 7. Subtext
        heroTL.to('#hero-subtext', {
            opacity: 1, y: 0, duration: 0.6, ease: CUSTOM_EASE
        }, "+=0.3");

        // 8. CTA + Single pulse
        heroTL.to('#hero-cta', {
            opacity: 1, duration: 0.6,
            onComplete: () => {
                document.getElementById('hero-cta').classList.add('pulse-once');
            }
        }, "-=0.2");

        // 9. Scroll indicator line
        heroTL.to('.scroll-indicator-wrap', { opacity: 1, duration: 0.2 })
            .to('.scroll-indicator-bar', { scaleY: 1, duration: 0.8, ease: 'power2.out' }, "-=0.2");

        // Hero Parallax Fade out
        gsap.to('.hero-content', {
            opacity: 0,
            y: -100,
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            }
        });

        // 10. Scroll-driven Logo transformation to Navbar
        ScrollTrigger.create({
            trigger: document.body,
            start: 'top top',
            end: '+=400',
            scrub: 1,
            animation: gsap.to('#hero-center-logo', {
                x: () => {
                    const navRect = document.getElementById('nav-logo').getBoundingClientRect();
                    return (navRect.left + navRect.width / 2) - (window.innerWidth / 2);
                },
                y: () => {
                    const navRect = document.getElementById('nav-logo').getBoundingClientRect();
                    return (navRect.top + navRect.height / 2) - (window.innerHeight / 2);
                },
                scale: () => {
                    const navRect = document.getElementById('nav-logo').getBoundingClientRect();
                    // Assumes .hero-center-logo img is roughly 320px wide via CSS
                    return navRect.width / 320;
                },
                ease: "none",
                onComplete: () => {
                    gsap.set('#nav-logo', { opacity: 1 });
                    gsap.set('#hero-center-logo', { opacity: 0 });
                },
                onReverseComplete: () => {
                    gsap.set('#nav-logo', { opacity: 0 });
                    gsap.set('#hero-center-logo', { opacity: 1 });
                }
            })
        });
    }

    // 6. Heading Splitting Helper
    // -----------------------------------------------------------------
    // Manually split lines of `.heading-split` for GSAP entrance
    document.querySelectorAll('.heading-split').forEach(heading => {
        let htmlContext = heading.innerHTML;
        // simplistic split by <br> or wrap entirely
        let lines = htmlContext.split('<br>');
        heading.innerHTML = lines.map(line => `<span class="line-wrapper"><span class="line-inner">${line}</span></span>`).join('<br>');

        // Setup Trigger
        gsap.to(heading.querySelectorAll('.line-inner'), {
            y: '0%',
            duration: 0.65,
            stagger: 0.1,
            ease: CUSTOM_EASE,
            scrollTrigger: {
                trigger: heading,
                start: 'top 85%'
            }
        });
    });


    // 7. Projects Grid V2 - Scroll Animations & Filtering
    // -----------------------------------------------------------------
    const galleryCards = document.querySelectorAll('.gallery-card-v2');

    if (galleryCards.length > 0) {
        // Initial Scroll Reveal
        gsap.fromTo(galleryCards,
            { y: 60, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: '.gallery-grid-v2',
                    start: 'top 85%'
                }
            }
        );

        // Portfolio Filtering
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Ignore if it's an actual link
                if (btn.tagName.toLowerCase() === 'a') return;

                e.preventDefault();
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');
                let delay = 0;

                galleryCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'flex';
                        gsap.fromTo(card,
                            { scale: 0.9, opacity: 0 },
                            { scale: 1, opacity: 1, duration: 0.4, delay: delay, ease: 'power2.out' }
                        );
                        delay += 0.05;
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    gsap.to('.outro-text', {
        opacity: 1, y: 0, duration: 0.8, ease: CUSTOM_EASE,
        scrollTrigger: {
            trigger: '.projects-outro',
            start: 'top 80%'
        }
    });


    // 8. Services pinned workflow
    // -----------------------------------------------------------------
    const steps = document.querySelectorAll('#workflow-wrapper .workflow-step');
    const connectors = document.querySelectorAll('.step-connector');

    if (!isMobile) {
        ScrollTrigger.create({
            trigger: "#workflow-wrapper",
            start: "top 20%",
            end: "+=150%", // scroll length
            pin: true,
            scrub: true,
            animation: gsap.timeline()
                // Step 1 enters naturally
                .to('#wf-1', { opacity: 1, duration: 1 })
                // Connect 1
                .to('#conn-1', { scaleY: 1, duration: 1 })
                // Step 2
                .to('#wf-2', { opacity: 1, duration: 1 })
                // Connect 2
                .to('#conn-2', { scaleY: 1, duration: 1 })
                // Step 3
                .to('#wf-3', { opacity: 1, duration: 1 })
        });
    } else {
        // Mobile fallback
        steps.forEach((st, i) => {
            gsap.to(st, {
                opacity: 1,
                scrollTrigger: { trigger: st, start: 'top 80%' }
            });
            if (connectors[i]) {
                gsap.to(connectors[i], {
                    scaleY: 1,
                    scrollTrigger: { trigger: connectors[i], start: 'top 80%' }
                });
            }
        });
    }


    // 9. About Parallax & Crawl & Particles
    // -----------------------------------------------------------------
    gsap.to('.silhouette', {
        opacity: 1,
        y: (i, el) => -100, // moves at 0.6 relative since height is extra 120%
        filter: "brightness(0.9)",
        scrollTrigger: {
            trigger: '.sec-about',
            start: 'top 90%',
            end: 'bottom top',
            scrub: 1
        }
    });

    gsap.fromTo('.exp-tag',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 0.6, ease: CUSTOM_EASE, scrollTrigger: { trigger: '.experience-tags', start: 'top 85%' } }
    );

    /* --- Portrait Particle Canvas Interaction --- */
    const portraitCanvas = document.getElementById('portraitCanvas');
    if (portraitCanvas && !isMobile && !reducedMotion) {
        const ctx = portraitCanvas.getContext('2d');
        let particlesArray = [];
        let animFrameId = null;
        let mouse = { x: null, y: null, radius: 80 };

        window.addEventListener('mousemove', (e) => {
            const rect = portraitCanvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });

        const portraitImage = new Image();
        portraitImage.crossOrigin = 'anonymous';
        portraitImage.src = 'assets/new_portrait.jpg'; // Needs this exact file from original

        portraitImage.addEventListener('load', () => {

            function buildParticles() {
                const parent = portraitCanvas.parentElement;
                portraitCanvas.width = parent.clientWidth || 400;
                portraitCanvas.height = parent.clientHeight || 500;

                const scaleX = portraitCanvas.width / portraitImage.width;
                const scaleY = portraitCanvas.height / portraitImage.height;
                const scale = Math.max(scaleX, scaleY) * 1.35; // Punch in to make portrait wider/larger
                const drawW = portraitImage.width * scale;
                const drawH = portraitImage.height * scale;

                const offscreen = document.createElement('canvas');
                offscreen.width = portraitCanvas.width;
                offscreen.height = portraitCanvas.height;
                const offCtx = offscreen.getContext('2d');

                // Shift Image for perfect framing
                const offsetX = (portraitCanvas.width - drawW) / 2 + (portraitCanvas.width * 0.05); // move slightly right
                const offsetY = (portraitCanvas.height - drawH) / 2 + (portraitCanvas.height * 0.15); // shift down so head hits the top

                offCtx.drawImage(portraitImage, offsetX, offsetY, drawW, drawH);

                const { data, width, height } = offCtx.getImageData(0, 0, portraitCanvas.width, portraitCanvas.height);

                particlesArray = [];
                const STEP = 5;

                for (let y = 0; y < height; y += STEP) {
                    for (let x = 0; x < width; x += STEP) {
                        const idx = (y * width + x) * 4;
                        const alpha = data[idx + 3];
                        const brightness = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;

                        if (alpha > 100 && brightness > 180) {
                            particlesArray.push(new Particle(x, y, brightness));
                        }
                    }
                }
            }

            class Particle {
                constructor(x, y, brightness) {
                    this.originX = x;
                    this.originY = y;
                    const shade = Math.round(brightness);
                    this.color = `rgb(${shade},${shade},${shade})`;
                    this.size = 2;
                    this.vx = 0;
                    this.vy = 0;
                    this.ease = 0.06;
                    this.friction = 0.82;
                    this.alpha = 0;
                    this.scattered = true;
                    this._placeOffscreen();
                }

                _placeOffscreen() {
                    const cw = portraitCanvas.width, ch = portraitCanvas.height;
                    this.x = (Math.random() - 0.5) * cw * 3 + cw / 2;
                    this.y = (Math.random() - 0.5) * ch * 3 + ch / 2;
                    this.vx = 0;
                    this.vy = 0;
                    this.alpha = 0;
                    this.scattered = true;
                }

                activate() {
                    this.scattered = false;
                }

                explode() {
                    const angle = Math.atan2(this.y - portraitCanvas.height * 0.45, this.x - portraitCanvas.width * 0.5);
                    const speed = 10 + Math.random() * 18;
                    this.vx = Math.cos(angle) * speed + (Math.random() - 0.5) * 5;
                    this.vy = Math.sin(angle) * speed + (Math.random() - 0.5) * 5;
                    this.scattered = true;
                }

                update(t) {
                    if (this.scattered && this.alpha <= 0) return;

                    if (this.scattered) {
                        this.vx *= 0.90;
                        this.vy *= 0.90;
                        this.x += this.vx;
                        this.y += this.vy;
                        this.alpha = Math.max(0, this.alpha - 0.02);
                        return;
                    }

                    if (mouse.x !== null) {
                        const dx = mouse.x - this.x;
                        const dy = mouse.y - this.y;
                        const dist = Math.hypot(dx, dy);
                        if (dist < mouse.radius && dist > 0) {
                            const f = (mouse.radius - dist) / mouse.radius;
                            this.vx -= (dx / dist) * f * 18;
                            this.vy -= (dy / dist) * f * 18;
                        }
                    }

                    const phaseX = this.originX * 0.03;
                    const phaseY = this.originY * 0.03;
                    const wobbleX = Math.sin(t * 1.2 + phaseX) * 4;
                    const wobbleY = Math.cos(t * 0.9 + phaseY) * 4;
                    const targetX = this.originX + wobbleX;
                    const targetY = this.originY + wobbleY;

                    this.vx += (targetX - this.x) * this.ease;
                    this.vy += (targetY - this.y) * this.ease;
                    this.vx *= this.friction;
                    this.vy *= this.friction;
                    this.x += this.vx;
                    this.y += this.vy;

                    this.alpha = Math.min(1, this.alpha + 0.04);
                }

                draw() {
                    if (this.alpha <= 0) return;
                    ctx.globalAlpha = this.alpha;
                    ctx.fillStyle = this.color;
                    ctx.fillRect(this.x, this.y, this.size, this.size);
                }
            }

            const clock = { start: performance.now() };
            function render() {
                animFrameId = requestAnimationFrame(render);
                ctx.clearRect(0, 0, portraitCanvas.width, portraitCanvas.height);
                const t = (performance.now() - clock.start) / 1000;
                for (let i = 0; i < particlesArray.length; i++) {
                    particlesArray[i].update(t);
                    particlesArray[i].draw();
                }
                ctx.globalAlpha = 1;
            }

            let sectionVisible = false;
            let activationTimeouts = [];
            let explosionTimeout = null;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !sectionVisible) {
                        sectionVisible = true;

                        if (explosionTimeout) {
                            clearTimeout(explosionTimeout);
                            explosionTimeout = null;
                        }

                        if (particlesArray.length === 0) buildParticles();
                        particlesArray.forEach((p, i) => {
                            p._placeOffscreen();
                            const delay = Math.random() * 1000;
                            const timeout = setTimeout(() => {
                                if (sectionVisible) p.activate();
                            }, delay);
                            activationTimeouts.push(timeout);
                        });
                    } else if (!entry.isIntersecting && sectionVisible) {
                        sectionVisible = false;

                        activationTimeouts.forEach(t => clearTimeout(t));
                        activationTimeouts = [];

                        particlesArray.forEach(p => p.explode());
                        explosionTimeout = setTimeout(() => {
                            if (!sectionVisible) {
                                particlesArray.forEach(p => p._placeOffscreen());
                            }
                        }, 2000);
                    }
                });
            }, { threshold: 0.15 });

            const aboutSection = document.getElementById('about');
            if (aboutSection) observer.observe(aboutSection);

            buildParticles();
            render();

            let resizeTimeout;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    buildParticles();
                }, 250);
            });
        });
    }


    // 10. Testimonials Stack & Pin
    // -----------------------------------------------------------------
    const tCards = gsap.utils.toArray('.t-card, .s-card');

    if (!isMobile && tCards.length > 0) {
        // Pin wrapper
        const stackTL = gsap.timeline({
            scrollTrigger: {
                trigger: '#testimonials-stack',
                start: 'top 15%',
                end: () => `+=${tCards.length * 100}%`,
                pin: true,
                scrub: 1
            }
        });

        tCards.forEach((card, i) => {
            // Give z-index explicitly
            gsap.set(card, { zIndex: tCards.length - i });

            if (i > 0) {
                // Card Entrance
                stackTL.to(card, { y: 0, scale: 1, opacity: 1, duration: 1 });
            } else {
                // Initial card is visible
                gsap.set(card, { y: 0, scale: 1, opacity: 1 });
            }

            // Cards push back when next opens
            if (i < tCards.length - 1) {
                stackTL.to(card, {
                    scale: 0.92,
                    opacity: 0.3,
                    duration: 1
                }, ">-0.5"); // overlap with next card entrance
            }
        });
    } else {
        // Mobile 
        tCards.forEach(c => gsap.set(c, { opacity: 1, scale: 1, y: 0, position: 'relative' }));
    }

    // 3D Tilt Effect Testimonials Move
    if (!isMobile && !reducedMotion) {
        document.querySelectorAll('.t-card').forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const xCenter = rect.width / 2;
                const yCenter = rect.height / 2;
                let tiltX = ((y - yCenter) / yCenter) * -5;
                let tiltY = ((x - xCenter) / xCenter) * 5;
                gsap.to(card, { rotationX: tiltX, rotationY: tiltY, duration: 0.1, ease: 'none', transformPerspective: 1000 });
            });
            card.addEventListener('mouseleave', () => {
                gsap.to(card, { rotationX: 0, rotationY: 0, duration: 0.4, ease: 'power2.out' });
            });
        });
    }


    // Counters (Stat Slams)
    // -----------------------------------------------------------------
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        ScrollTrigger.create({
            trigger: counter,
            start: 'top 80%',
            onEnter: () => {
                gsap.to(counter, {
                    innerHTML: target + 2, // Slight overshoot
                    duration: 1.2,
                    ease: "power2.out",
                    snap: { innerHTML: 1 },
                    onComplete: () => {
                        // Corrector spring
                        gsap.to(counter, {
                            innerHTML: target,
                            duration: 0.2,
                            ease: "back.out(2)",
                            snap: { innerHTML: 1 }
                        });
                    }
                });
            },
            once: true
        });
    });

    // 11. FAQ Accordions
    // -----------------------------------------------------------------
    const faqRows = document.querySelectorAll('.faq-row');
    faqRows.forEach(row => {
        const header = row.querySelector('.faq-header');
        const answerWrap = row.querySelector('.faq-answer-wrap');
        const answerInner = row.querySelector('.faq-answer-inner');

        header.addEventListener('click', () => {
            const isOpen = row.classList.contains('active');

            // Close others (optional, but standard)
            faqRows.forEach(r => {
                r.classList.remove('active');
                r.querySelector('.faq-answer-wrap').style.maxHeight = null;
            });

            if (!isOpen) {
                row.classList.add('active');
                answerWrap.style.maxHeight = answerInner.scrollHeight + "px";
            }
        });
    });


    // 12. Closing Sequence
    // -----------------------------------------------------------------
    const closingTL = gsap.timeline({
        scrollTrigger: {
            trigger: '.sec-closing',
            start: 'top 60%',
        }
    });

    closingTL.to('#closing-headline .word', { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: CUSTOM_EASE })
        // 600ms pause
        .to('#closing-sub', { opacity: 1, y: 0, duration: 0.7, ease: CUSTOM_EASE }, "+=0.6")
        .to('#closing-btn-wrap', {
            opacity: 1, duration: 0.6,
            onComplete: () => {
                const btn = document.getElementById('closing-cta');
                if (btn) btn.classList.add('pulse-once');
            }
        }, "-=0.2");

});
