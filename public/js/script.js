document.addEventListener('DOMContentLoaded', () => {
    // 0. Dynamic NGO Parallax Background (Organic Shapes)
    const parallaxHTML = `
        <div class="ngo-parallax-bg">
            <i class="fa-solid fa-leaf p-shape shape-1"></i>
            <i class="fa-solid fa-earth-americas p-shape shape-2"></i>
            <i class="fa-solid fa-hands-holding-circle p-shape shape-3"></i>
            <i class="fa-solid fa-seedling p-shape shape-4"></i>
            <i class="fa-solid fa-dove p-shape shape-5"></i>
        </div>
    `;
    document.body.insertAdjacentHTML('afterbegin', parallaxHTML);

    const shapes = document.querySelectorAll('.p-shape');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        shapes.forEach((shape, index) => {
            // Different speeds and directions for depth
            const speed = (index + 1) * 0.12;
            const direction = index % 2 === 0 ? 1 : -1;
            shape.style.transform = `translateY(${scrolled * speed * direction}px) rotate(${scrolled * 0.05}deg)`;
        });
    });

    // 1. Mobile Navigation Toggle Logic
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            
            // Toggle between bars and times icon
            if (navLinks.classList.contains('active')) {
                if (icon.classList.contains('fa-bars-staggered')) {
                    icon.classList.replace('fa-bars-staggered', 'fa-xmark');
                } else if (icon.classList.contains('fa-bars')) {
                    icon.classList.replace('fa-bars', 'fa-xmark');
                }
            } else {
                if (icon.classList.contains('fa-xmark')) {
                    // Check which icon class was originally used
                    icon.classList.replace('fa-xmark', 'fa-bars-staggered');
                }
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon.classList.contains('fa-xmark')) {
                    icon.classList.replace('fa-xmark', 'fa-bars-staggered');
                }
            }
        });
    }

    // 2. Header Scroll Effects (Glassmorphism transition)
    const header = document.querySelector('.main-header') || document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (header) {
            if (window.scrollY > 50) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.7)';
                header.style.boxShadow = 'none';
            }
        }

        // Optional: Hero Parallax Effect
        const heroBg = document.querySelector('.hero-bg-overlay');
        if (heroBg) {
            let offset = window.pageYOffset;
            heroBg.style.transform = `translateY(${offset * 0.4}px) scale(1.05)`;
        }
    });

    // 3. Intro Video & Preloader Sequencing (High-Performance & Smooth)
    const introContainer = document.getElementById('intro-video-container');
    const introVideo = document.getElementById('intro-video');
    const skipBtn = document.getElementById('skip-intro');
    const preloader = document.getElementById('preloader');
    const siteHeader = document.querySelector('.main-header') || document.querySelector('header');
    
    // Session management: intro plays once per browsing session
    const hasSeenIntro = sessionStorage.getItem('antarbhag_intro_seen');
    let introFinished = false;

    const revealSite = () => {
        document.body.style.overflow = '';
        if (siteHeader) siteHeader.style.visibility = '';
        initScrollAnimations();
    };

    const finishIntro = () => {
        if (introFinished) return;
        introFinished = true;
        sessionStorage.setItem('antarbhag_intro_seen', 'true');
        
        if (introContainer) {
            introContainer.style.opacity = '0';
            introContainer.style.visibility = 'hidden';
            revealSite();
            setTimeout(() => {
                if (introVideo) {
                    try {
                        introVideo.pause();
                        introVideo.removeAttribute('src');
                        introVideo.load();
                    } catch (e) {}
                }
                introContainer.remove();
            }, 700);
        } else {
            revealSite();
        }
    };

    if (hasSeenIntro) {
        // Already seen in this session: skip immediately
        if (introContainer) {
            introContainer.style.display = 'none';
            introContainer.remove();
        }
        if (preloader) {
            document.body.style.overflow = 'hidden';
            setTimeout(() => {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
                setTimeout(() => {
                    preloader.remove();
                    revealSite();
                }, 350);
            }, 150);
        } else {
            revealSite();
        }
    } else if (introContainer && introVideo) {
        // First visit on homepage with intro video:
        // Dismiss any background preloader immediately to avoid conflicting timers and frozen overlays
        if (preloader) {
            preloader.style.display = 'none';
            preloader.remove();
        }

        document.body.style.overflow = 'hidden';
        if (siteHeader) siteHeader.style.visibility = 'hidden';

        // Connect handlers
        if (skipBtn) skipBtn.onclick = finishIntro;
        introVideo.onended = finishIntro;
        introVideo.onerror = finishIntro;

        // Cinematic outro: at 12.2s the content reaches conclusion before static black tail
        introVideo.addEventListener('timeupdate', () => {
            if (introVideo.currentTime >= 12.2) {
                finishIntro();
            }
        });

        // Smooth fade-in once video is actually rendering frames
        const onFrameReady = () => {
            introVideo.classList.add('video-playing');
        };
        introVideo.addEventListener('playing', onFrameReady, { once: true });
        introVideo.addEventListener('timeupdate', () => {
            if (introVideo.currentTime > 0.1) onFrameReady();
        }, { once: true });

        // Play without interrupting buffer or calling .load()
        const playVideo = () => {
            if (introFinished) return;
            const p = introVideo.play();
            if (p !== undefined) {
                p.then(() => {
                    onFrameReady();
                }).catch(() => {
                    // If autoplay blocked, resume on first user touch/click or timeout safely
                    const unlock = () => {
                        introVideo.play().then(onFrameReady).catch(finishIntro);
                        ['click', 'touchstart', 'keydown'].forEach(evt => window.removeEventListener(evt, unlock));
                    };
                    ['click', 'touchstart', 'keydown'].forEach(evt => window.addEventListener(evt, unlock, { once: true }));
                    setTimeout(() => {
                        if (!introFinished && introVideo.paused) finishIntro();
                    }, 2500);
                });
            }
        };

        if (introVideo.readyState >= 3) {
            playVideo();
        } else {
            introVideo.addEventListener('canplay', playVideo, { once: true });
            // Fallback kickstart in case canplay already fired
            setTimeout(playVideo, 80);
        }

        // Safety fallback timeout
        setTimeout(() => {
            if (!introFinished) finishIntro();
        }, 16000);

    } else if (preloader) {
        // Other subpages without intro video
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            setTimeout(() => {
                preloader.remove();
                revealSite();
            }, 500);
        }, 800);
    } else {
        revealSite();
    }

    // 4. Interactive Scroll Animations (Observer API)
    function initScrollAnimations() {
        // Target elements for animation
        const animTargets = [
            '.display-text', 
            '.hero-lead', 
            '.hero-btns', 
            '.badge',
            '.section-title-v2',
            '.section-title',
            '.glass-card-v2',
            '.glass-card',
            '.floating-img',
            '.ab-content-v2 p',
            '.newsletter-card',
            '.fade-in',
            '.page-header h1',
            '.page-header .breadcrumb'
        ];

        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -30px 0px"
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); 
                }
            });
        }, observerOptions);

        // Apply observation with stagger delays
        animTargets.forEach(selector => {
            document.querySelectorAll(selector).forEach((el, index) => {
                // Add the animation-ready class which sets initial hidden state
                el.classList.add('anim-ready');
                
                // Apply stagger delay for grid items
                if (el.classList.contains('glass-card-v2') || el.classList.contains('glass-card')) {
                    el.style.transitionDelay = `${(index % 3) * 0.1}s`;
                }

                // Small delay to ensure CSS transition kicks in from the hidden state
                requestAnimationFrame(() => {
                    observer.observe(el);
                });
            });
        });
    }
});