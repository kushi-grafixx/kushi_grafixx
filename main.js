// KUSHI GRAFIXX | FRAMER REPLICA - MAIN.JS

document.addEventListener('DOMContentLoaded', () => {

    /* --- FAQ Toggle Logic --- */
    function measureHeight(el) {
        // Temporarily make it auto to read the real content height
        el.style.height = 'auto';
        el.style.position = 'absolute';
        el.style.visibility = 'hidden';
        el.style.overflow = 'visible';
        const h = el.getBoundingClientRect().height;
        // Reset
        el.style.height = '';
        el.style.position = '';
        el.style.visibility = '';
        el.style.overflow = '';
        return h;
    }

    function openFaqItem(item) {
        item.classList.add('active');
    }

    function closeFaqItem(item) {
        item.classList.remove('active');
    }

    document.querySelectorAll('.faq-item .chat-msg.client').forEach(question => {
        question.addEventListener('click', () => {
            const item = question.closest('.faq-item');
            const isActive = item.classList.contains('active');

            // Close all first (accordion)
            document.querySelectorAll('.faq-item').forEach(other => {
                if (other !== item) closeFaqItem(other);
            });

            // Toggle clicked item
            if (isActive) {
                closeFaqItem(item);
            } else {
                openFaqItem(item);
            }
        });
    });


    /* --- 0. Preloader --- */
    const preloader = document.getElementById('kushi-preloader');
    if (preloader) {
        // Prevent scrolling while loading
        document.body.style.overflow = 'hidden';

        // Simulate liquid fill progress
        let progress = 0;
        const fillEl = document.querySelector('.kushi-preloader-fill');

        const interval = setInterval(() => {
            progress += Math.random() * 15 + 5; // increment random amount
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);

                // Allow a small pause at 100% before fading out
                setTimeout(() => {
                    gsap.to(preloader, {
                        opacity: 0,
                        duration: 0.8,
                        ease: "power2.inOut",
                        onComplete: () => {
                            preloader.style.display = 'none';
                            document.body.style.overflow = '';

                            // 1. Trigger Symbiote Formation
                            if (window.formSymbiote) {
                                window.formSymbiote();
                            }

                            // 2. Hero Entry Animations (Staggered after symbiote starts)
                            setTimeout(() => {
                                gsap.fromTo(".hero-content > *",
                                    { y: 40, opacity: 0 },
                                    { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out" }
                                );
                            }, 1000);
                        }
                    });
                }, 400);
            }
            if (fillEl) fillEl.style.clipPath = `inset(${100 - progress}% 0 0 0)`;
        }, 120);
    }

    /* --- 1. Custom Logomark Cursor --- */
    const cursorDot = document.querySelector('.cursor-dot');
    let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
    let cursorIsVisible = false;

    if (cursorDot) {
        // Track mouse
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Show cursor on first move
            if (!cursorIsVisible) {
                cursorDot.style.opacity = '1';
                cursorIsVisible = true;
            }
        });

        let cursorX = mouseX;
        let cursorY = mouseY;

        const animateCursor = () => {
            cursorX += (mouseX - cursorX) * 0.08;
            cursorY += (mouseY - cursorY) * 0.08;
            cursorDot.style.left = `${cursorX}px`;
            cursorDot.style.top = `${cursorY}px`;
            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // Micro-animations on interacting with clickables
        const clickables = document.querySelectorAll('a, button, .dock-icon, .filter-btn, .svc-card, .lb-tag');
        clickables.forEach(link => {
            link.addEventListener('mouseenter', () => cursorDot.classList.add('hovering'));
            link.addEventListener('mouseleave', () => cursorDot.classList.remove('hovering'));
        });

        // Click animation (squish)
        document.addEventListener('mousedown', () => cursorDot.classList.add('clicking'));
        document.addEventListener('mouseup', () => cursorDot.classList.remove('clicking'));

        // "Reload animation" micro interaction on double click
        document.addEventListener('dblclick', () => {
            cursorDot.classList.add('reload-anim');
            setTimeout(() => cursorDot.classList.remove('reload-anim'), 600);
        });
    }


    /* --- 2. Scroll Spy (Navigation Active States) --- */
    const sections = document.querySelectorAll('section');
    const dockLinks = document.querySelectorAll('.dock-icon');

    const updateActiveLink = () => {
        let currentSection = '';
        const scrollPosition = window.scrollY + window.innerHeight / 3;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        if (window.scrollY < 100) currentSection = 'home';
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) currentSection = 'contact';

        const dockIndicator = document.querySelector('.dock-indicator');

        dockLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentSection)) {
                link.classList.add('active');
                if (dockIndicator) {
                    const yOffset = link.offsetTop;
                    dockIndicator.style.transform = `translateY(${yOffset - 20}px)`;
                }
            }
        });
    };

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();


    /* --- 3. Testimonial Drag to Scroll --- */
    const slider = document.getElementById('review-slider');
    if (slider) {
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
            document.body.style.userSelect = 'none';
        });

        slider.addEventListener('mouseleave', () => {
            isDown = false;
            document.body.style.userSelect = '';
        });

        slider.addEventListener('mouseup', () => {
            isDown = false;
            document.body.style.userSelect = '';
        });

        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });
    }

    /* --- 4. Simple Entrance Animations (GSAP) --- */
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        gsap.utils.toArray('.section-title').forEach(title => {
            gsap.fromTo(title,
                { y: 50, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1,
                    scrollTrigger: {
                        trigger: title,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        if (document.querySelector('.umbrel-grid')) {
            gsap.fromTo('.umbrel-grid .umbrel-card',
                { y: 60, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.8, stagger: 0.1,
                    scrollTrigger: {
                        trigger: '.umbrel-grid',
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }

        if (document.querySelector('.process-grid-new')) {
            gsap.fromTo('.process-step',
                { x: 50, opacity: 0 },
                {
                    x: 0, opacity: 1, duration: 0.6, stagger: 0.2,
                    scrollTrigger: {
                        trigger: '.process-grid-new',
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }
    }

    /* --- 5. Gallery 3D Card Hover Interaction --- */
    const galleryCards3D = document.querySelectorAll('.gallery-card');

    if (galleryCards3D.length > 0) {
        galleryCards3D.forEach(card => {
            const imageWrapper = card.querySelector('.gallery-image');

            if (imageWrapper && !imageWrapper.querySelector('.glare')) {
                const glare = document.createElement('div');
                glare.classList.add('glare');
                imageWrapper.appendChild(glare);
            }

            card.addEventListener('mousemove', (e) => {
                if (!imageWrapper) return;

                const rect = imageWrapper.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const maxRotate = 10;

                const rotateY = ((x - centerX) / centerX) * maxRotate;
                const rotateX = -((y - centerY) / centerY) * maxRotate;

                const mousePercentX = (x / rect.width) * 100;
                const mousePercentY = (y / rect.height) * 100;

                imageWrapper.style.setProperty('--rotate-y', `${rotateY}deg`);
                imageWrapper.style.setProperty('--rotate-x', `${rotateX}deg`);
                imageWrapper.style.setProperty('--mouse-x', `${mousePercentX}%`);
                imageWrapper.style.setProperty('--mouse-y', `${mousePercentY}%`);
            });

            card.addEventListener('mouseleave', () => {
                if (!imageWrapper) return;
                imageWrapper.style.setProperty('--rotate-y', '0deg');
                imageWrapper.style.setProperty('--rotate-x', '0deg');
            });
        });
    }

    /* --- 6. Gallery Filtering --- */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryCards = document.querySelectorAll('.gallery-card, .gallery-card-v2');

    if (filterBtns.length > 0 && galleryCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                galleryCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    if (filterValue === 'all' || cardCategory === filterValue) {
                        card.style.display = 'block';
                        if (typeof gsap !== 'undefined') {
                            gsap.fromTo(card,
                                { opacity: 0, y: 20 },
                                { opacity: 1, y: 0, duration: 0.4, clearProps: "all" }
                            );
                        }
                    } else {
                        card.style.display = 'none';
                    }
                });

                if (typeof ScrollTrigger !== 'undefined') {
                    setTimeout(() => ScrollTrigger.refresh(), 300);
                }
            });
        });
    }

    /* --- 6. Process Section GSAP Animations --- */
    if (document.querySelector('.process-grid-new') && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        const processTl = gsap.timeline({
            scrollTrigger: {
                trigger: '.process-section',
                start: 'top 75%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });

        const line = document.querySelector('.timeline-line-new');
        const columns = document.querySelectorAll('.process-step');

        if (line && columns.length > 0) {
            gsap.set(line, { scaleX: 0, transformOrigin: 'left center' });

            processTl.to(line, {
                scaleX: 1,
                duration: 1.2,
                ease: 'power3.inOut'
            }, 0);

            columns.forEach((col, index) => {
                const badge = col.querySelector('.timeline-badge-new');
                const media = col.querySelector('.step-icon-wrapper');
                const content = col.querySelector('.process-content-new');
                const delay = index * 0.3;

                if (badge) {
                    gsap.set(badge, { scale: 0, opacity: 0 });
                    processTl.to(badge, {
                        scale: 1,
                        opacity: 1,
                        duration: 0.5,
                        ease: 'back.out(1.7)'
                    }, delay + 0.3);
                }

                if (media) {
                    gsap.set(media, { opacity: 0, y: 30 });
                    processTl.to(media, {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: 'power2.out'
                    }, delay + 0.4);
                }

                if (content) {
                    gsap.set(content, { opacity: 0, y: 20 });
                    processTl.to(content, {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: 'power2.out'
                    }, delay + 0.5);
                }
            });
        }
    }

    /* --- 7. Portrait Particle Canvas Interaction --- */
    const portraitCanvas = document.getElementById('portraitCanvas');
    if (portraitCanvas) {
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
        portraitImage.src = 'assets/new_portrait.jpg';

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

    /* --- 7.5 Logo Glow Button Ring Sizing --- */
    document.querySelectorAll('.logo-glow-btn').forEach(btn => {
        const svg = btn.querySelector('.logo-btn-ring');
        const rect = btn.querySelector('.logo-btn-ring-path');
        if (!svg || !rect) return;
        const sizeRing = () => {
            const w = btn.offsetWidth + 4;
            const h = btn.offsetHeight + 4;
            svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
            svg.setAttribute('width', w);
            svg.setAttribute('height', h);
            rect.setAttribute('width', w);
            rect.setAttribute('height', h);
            rect.setAttribute('rx', h / 2);
            rect.setAttribute('ry', h / 2);
            const perimeter = 2 * (w - h) + Math.PI * h;
            btn.style.setProperty('--ring-perimeter', perimeter.toFixed(1));
        };
        sizeRing();
        window.addEventListener('resize', sizeRing);
    });

    /* --- 8. Liveblocks Services Grid Spotlight --- */
    const lbCards = document.querySelectorAll('.lb-feature-cell');
    lbCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    /* --- 8.5 Liveblocks Bottom Row Magic Interaction --- */
    const magicRow = document.querySelector('.lb-bottom-row');
    const hoverText = document.querySelector('.hover-text-animate');
    const followerLogomark = document.querySelector('.lb-follower.logomark');
    const followerStar = document.querySelector('.lb-follower.star-icon');

    if (magicRow && followerLogomark && followerStar && hoverText) {
        const words = hoverText.querySelectorAll('.word');
        let letterIndex = 0;
        words.forEach(word => {
            const text = word.textContent;
            word.textContent = '';
            for (let char of text) {
                const span = document.createElement('span');
                span.className = 'letter';
                span.textContent = char;
                span.style.transitionDelay = `${letterIndex * 0.02}s`;
                word.appendChild(span);
                letterIndex++;
            }
        });

        let isFollowingCursor = false;
        let mouseX = 0;
        let mouseY = 0;

        gsap.set([followerLogomark, followerStar], {
            xPercent: -50,
            yPercent: -50,
            scale: 0.5
        });

        function floatRandomly(element, delay = 0) {
            if (isFollowingCursor) return;
            const targetX = Math.random() * magicRow.clientWidth;
            const targetY = Math.random() * magicRow.clientHeight;
            const dur = 2 + Math.random() * 2;

            gsap.to(element, {
                x: targetX,
                y: targetY,
                duration: dur,
                delay: delay,
                ease: "sine.inOut",
                onComplete: () => {
                    if (!isFollowingCursor) floatRandomly(element);
                },
                overwrite: "auto"
            });
        }

        floatRandomly(followerLogomark, 0);
        floatRandomly(followerStar, 0.5);

        magicRow.addEventListener('mousemove', (e) => {
            const rect = magicRow.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;

            if (isFollowingCursor) {
                gsap.to(followerLogomark, {
                    x: mouseX,
                    y: mouseY,
                    duration: 0.5,
                    ease: "power2.out",
                    overwrite: "auto"
                });

                gsap.to(followerStar, {
                    x: mouseX + 35,
                    y: mouseY + 35,
                    duration: 1.2,
                    ease: "elastic.out(1.2, 0.5)",
                    overwrite: "auto"
                });
            }
        });

        hoverText.addEventListener('mouseenter', () => {
            isFollowingCursor = true;
            gsap.killTweensOf([followerLogomark, followerStar]);
            gsap.to([followerLogomark, followerStar], {
                scale: 1,
                duration: 0.4,
                ease: "back.out(1.5)"
            });
            gsap.to(followerLogomark, { x: mouseX, y: mouseY, duration: 0.6, ease: "power2.out" });
            gsap.to(followerStar, { x: mouseX + 35, y: mouseY + 35, duration: 1.2, ease: "elastic.out(1.2, 0.5)" });
        });

        hoverText.addEventListener('mouseleave', () => {
            isFollowingCursor = false;
            gsap.to([followerLogomark, followerStar], {
                scale: 0.5,
                duration: 0.4,
                ease: "power2.out"
            });
            floatRandomly(followerLogomark, 0);
            floatRandomly(followerStar, 0.2);
        });
    }

    /* --- 9. Case Study Back to Top --- */
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            if (typeof gsap !== 'undefined') {
                if (typeof ScrollToPlugin !== 'undefined') {
                    gsap.registerPlugin(ScrollToPlugin);
                }
                gsap.to(window, {
                    scrollTo: { y: 0, autoKill: false },
                    duration: 1.3,
                    ease: 'power3.inOut'
                });
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    /* --- 10. WebGL Hero Scroll Dither Sync --- */
    if (window.webglHeroUniforms && typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.create({
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
            onUpdate: (self) => {
                if (window.webglHeroUniforms.uScrollFade) {
                    window.webglHeroUniforms.uScrollFade.value = self.progress;
                }
            }
        });
    }

});
