document.addEventListener('DOMContentLoaded', () => {
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

    // 3. Intro Video & Preloader Sequencing
    const introContainer = document.getElementById('intro-video-container');
    const introVideo = document.getElementById('intro-video');
    const skipBtn = document.getElementById('skip-intro');
    const preloader = document.getElementById('preloader');
    const siteHeader = document.querySelector('.main-header') || document.querySelector('header');
    
    // Session management: clear localStorage on every page load for the intro
    // so users can see the video each fresh session (use sessionStorage instead)
    const hasSeenIntro = sessionStorage.getItem('antarbhag_intro_seen');

    // Only lock scrolling if there's a preloader or intro
    if (preloader || introContainer) {
        document.body.style.overflow = 'hidden';
    }

    // Prepare the video safely
    if (introContainer) {
        if (!hasSeenIntro) {
            // Make video container visible
            introContainer.style.opacity = '1';
            introContainer.style.visibility = 'visible';
            introContainer.style.display = 'flex';
            if (siteHeader) siteHeader.style.visibility = 'hidden';

            if (introVideo) {
                introVideo.pause();
                introVideo.currentTime = 0;
            }
        } else {
            // Already seen: remove immediately
            introContainer.style.display = 'none';
        }
    }

    const startIntroVideo = () => {
        if (introContainer && introVideo && !hasSeenIntro) {
            // Ensure video is visible and plays
            introContainer.style.display = 'flex';
            introContainer.style.opacity = '1';
            
            // Attempt to play video
            const playPromise = introVideo.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    // Playing successfully
                }).catch(e => {
                    console.warn('Autoplay blocked:', e);
                    finishIntro(); // Fallback if play fails
                });
            }
            
            introVideo.onended = finishIntro;
            if (skipBtn) skipBtn.onclick = finishIntro;
            
            // Safety timeout: if video doesn't play within 8 seconds, skip
            setTimeout(() => {
                if (introContainer.style.display !== 'none') {
                    finishIntro();
                }
            }, 30000); // 30 second max for the video
        } else {
            finishIntro();
        }
    };

    const finishIntro = () => {
        if (introContainer) {
            introContainer.style.opacity = '0';
            sessionStorage.setItem('antarbhag_intro_seen', 'true');
            setTimeout(() => {
                introContainer.style.display = 'none';
                introContainer.remove();
                revealSite();
            }, 800);
        } else {
            revealSite();
        }
    };

    const revealSite = () => {
        document.body.style.overflow = '';
        if (siteHeader) siteHeader.style.visibility = '';
        initScrollAnimations();
    };

    // The sequence starts with the preloader
    const preloaderDelay = hasSeenIntro ? 300 : 1800;

    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            setTimeout(() => {
                preloader.remove();
                
                // After preloader finishes, decide what's next
                if (introContainer && introVideo && !hasSeenIntro) {
                    startIntroVideo();
                } else {
                    if (introContainer) introContainer.remove();
                    revealSite();
                }
            }, 600);
        }, preloaderDelay);
    } else {
        if (introContainer && introVideo && !hasSeenIntro) {
            startIntroVideo();
        } else {
            if (introContainer) introContainer.remove();
            revealSite();
        }
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