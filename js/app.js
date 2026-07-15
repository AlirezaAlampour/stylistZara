/* js/app.js */
document.addEventListener('DOMContentLoaded', () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ================= 1. Scroll Reveals ================= */
    const revealElements = document.querySelectorAll('.reveal');
    
    // Immediately check elements already above or in view when loaded
    function activateIfInView(element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 1.05) {
            element.classList.add('active');
            return true;
        }
        return false;
    }

    if (reduceMotion || !('IntersectionObserver' in window)) {
        revealElements.forEach((element) => element.classList.add('active'));
    } else {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting || entry.boundingClientRect.top <= window.innerHeight) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '0px 0px -10px',
            threshold: 0.01
        });

        revealElements.forEach((element) => {
            if (!activateIfInView(element)) {
                revealObserver.observe(element);
            }
        });

        // Also run activate check right after hash jump
        window.addEventListener('hashchange', () => {
            setTimeout(() => {
                revealElements.forEach(activateIfInView);
            }, 80);
        });
    }

    /* ================= 2. Sticky Header Behaviour ================= */
    const header = document.getElementById('main-header');
    const updateHeader = () => {
        if (!header) return;
        header.classList.toggle('is-visible', window.scrollY > 50);
    };

    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });

    /* ================= 3. Mobile Navigation Menu ================= */
    const menuOpenBtn = document.getElementById('menu-open-btn');
    const menuCloseBtn = document.getElementById('menu-close-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];

    function openMenu() {
        if (!mobileMenu || !menuOpenBtn) return;
        mobileMenu.classList.add('is-open');
        document.body.classList.add('menu-open');
        menuOpenBtn.setAttribute('aria-expanded', 'true');
        const firstLink = mobileMenu.querySelector('a') || menuCloseBtn;
        if (firstLink) firstLink.focus();
    }

    function closeMenu() {
        if (!mobileMenu || !menuOpenBtn) return;
        mobileMenu.classList.remove('is-open');
        document.body.classList.remove('menu-open');
        menuOpenBtn.setAttribute('aria-expanded', 'false');
        menuOpenBtn.focus();
    }

    if (menuOpenBtn) menuOpenBtn.addEventListener('click', openMenu);
    if (menuCloseBtn) menuCloseBtn.addEventListener('click', closeMenu);

    menuLinks.forEach((link) => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && mobileMenu?.classList.contains('is-open')) {
            closeMenu();
        }
    });

    /* ================= 4. Native Video Gallery & Playback Management ================= */
    const videos = Array.from(document.querySelectorAll('video'));

    function updatePlaybackStatus(video) {
        const card = video.closest('.motion-card') || video.closest('.card-media-wrap') || video.closest('figure');
        if (!card) return;

        if (video.paused || video.ended) {
            card.classList.remove('is-playing');
        } else {
            card.classList.add('is-playing');
        }
    }

    function togglePlayback(video) {
        if (!video) return;
        if (video.paused) {
            const playPromise = video.play();
            if (playPromise && typeof playPromise.then === 'function') {
                playPromise
                    .then(() => updatePlaybackStatus(video))
                    .catch(() => updatePlaybackStatus(video));
            }
        } else {
            video.pause();
            updatePlaybackStatus(video);
        }
    }

    videos.forEach((video) => {
        const card = video.closest('.motion-card') || video.closest('.card-media-wrap') || video.closest('figure');
        const controlBtn = card?.querySelector('.video-control-btn');

        video.addEventListener('play', () => updatePlaybackStatus(video));
        video.addEventListener('pause', () => updatePlaybackStatus(video));
        video.addEventListener('ended', () => updatePlaybackStatus(video));

        if (controlBtn) {
            controlBtn.addEventListener('click', (event) => {
                event.stopPropagation();
                togglePlayback(video);
            });
        }

        const mediaArea = card?.querySelector('.motion-media') || card?.querySelector('.card-media-wrap');
        if (mediaArea) {
            mediaArea.addEventListener('click', (event) => {
                if (event.target.closest('a') || event.target.closest('button')) return;
                togglePlayback(video);
            });
        }
    });

    // Viewport Observation for Playback
    if ('IntersectionObserver' in window) {
        const playbackObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const video = entry.target;
                if (entry.isIntersecting) {
                    if (!reduceMotion && video.paused) {
                        const playPromise = video.play();
                        if (playPromise && typeof playPromise.then === 'function') {
                            playPromise
                                .then(() => updatePlaybackStatus(video))
                                .catch(() => updatePlaybackStatus(video));
                        }
                    }
                } else {
                    if (!video.paused) {
                        video.pause();
                        updatePlaybackStatus(video);
                    }
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.35
        });

        videos.forEach((video) => playbackObserver.observe(video));
    }

    /* ================= 5. Contact Form Handling ================= */
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const name = document.getElementById('contact-name')?.value.trim() || '';
            const email = document.getElementById('contact-email')?.value.trim() || '';
            const message = document.getElementById('contact-message')?.value.trim() || '';
            
            const subject = encodeURIComponent(`Styling Inquiry — ${name || 'Portfolio Visitor'}`);
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nProject Scope & Direction:\n${message}\n\n---\nSent via ZARA STYLIST Portfolio`);

            window.location.href = `mailto:hello@zaramstylist.com?subject=${subject}&body=${body}`;
        });
    }
});
