/* js/app.js */
document.addEventListener('DOMContentLoaded', () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const revealElements = document.querySelectorAll('.reveal');
    if (reduceMotion || !('IntersectionObserver' in window)) {
        revealElements.forEach((element) => element.classList.add('active'));
    } else {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '0px 0px -8%',
            threshold: 0.16
        });

        revealElements.forEach((element) => revealObserver.observe(element));
    }

    const header = document.getElementById('main-header');
    const updateHeader = () => {
        if (!header) return;
        header.classList.toggle('is-visible', window.scrollY > 80);
    };

    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });

    const menuOpenBtn = document.getElementById('menu-open-btn');
    const menuCloseBtn = document.getElementById('menu-close-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];

    function openMenu() {
        if (!mobileMenu || !menuOpenBtn) return;
        mobileMenu.classList.add('is-open');
        document.body.classList.add('menu-open');
        menuOpenBtn.setAttribute('aria-expanded', 'true');
        const firstLink = mobileMenu.querySelector('a');
        if (firstLink) firstLink.focus();
    }

    function closeMenu() {
        if (!mobileMenu || !menuOpenBtn) return;
        mobileMenu.classList.remove('is-open');
        document.body.classList.remove('menu-open');
        menuOpenBtn.setAttribute('aria-expanded', 'false');
    }

    if (menuOpenBtn) menuOpenBtn.addEventListener('click', openMenu);
    if (menuCloseBtn) menuCloseBtn.addEventListener('click', closeMenu);

    menuLinks.forEach((link) => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeMenu();
    });

    const videos = Array.from(document.querySelectorAll('.motion-video'));
    const loadPromises = new WeakMap();

    function setMissing(video, reason) {
        const card = video.closest('.motion-card');
        const src = video.dataset.src || video.currentSrc || 'unknown video path';

        if (card?.classList.contains('is-missing')) return;

        card?.classList.remove('is-loading', 'is-ready', 'is-playing', 'in-view');
        card?.classList.add('is-missing');
        video.pause();
        video.removeAttribute('src');
        video.load();

        console.warn(`Video pending: ${src}. ${reason}`);
    }

    function loadPoster(video) {
        const card = video.closest('.motion-card');
        const poster = video.dataset.poster;

        if (!poster) return;

        const image = new Image();
        image.onload = () => {
            video.poster = poster;
            card?.classList.add('has-poster');
        };
        image.onerror = () => {
            card?.classList.remove('has-poster');
        };
        image.src = poster;
    }

    async function loadVideo(video) {
        const card = video.closest('.motion-card');
        const src = video.dataset.src;

        if (!src || video.dataset.loaded === 'true' || card?.classList.contains('is-missing')) return;
        if (loadPromises.has(video)) return loadPromises.get(video);

        card?.classList.add('is-loading');

        const loadPromise = (async () => {
            try {
                const response = await fetch(src, { method: 'HEAD', cache: 'no-store' });
                if (!response.ok) {
                    setMissing(video, `Expected ${src} but received HTTP ${response.status}.`);
                    return;
                }
            } catch (error) {
                setMissing(video, `Expected ${src} but the file could not be reached.`);
                return;
            }

            video.src = src;
            video.dataset.loaded = 'true';
            video.load();
        })();

        loadPromises.set(video, loadPromise);
        return loadPromise;
    }

    function playVideo(video) {
        const card = video.closest('.motion-card');
        if (!video || reduceMotion || card?.classList.contains('is-missing')) return;

        Promise.resolve(loadVideo(video)).then(() => {
            if (!video.src || card?.classList.contains('is-missing')) return;

            const playPromise = video.play();
            if (playPromise && typeof playPromise.then === 'function') {
                playPromise
                    .then(() => card?.classList.add('is-playing'))
                    .catch(() => card?.classList.remove('is-playing'));
            }
        });
    }

    function pauseVideo(video) {
        if (!video) return;
        video.pause();
        video.closest('.motion-card')?.classList.remove('is-playing');
    }

    videos.forEach((video) => {
        const card = video.closest('.motion-card');

        loadPoster(video);

        video.addEventListener('loadeddata', () => {
            card?.classList.remove('is-loading', 'is-missing');
            card?.classList.add('is-ready');
        });

        video.addEventListener('canplay', () => {
            card?.classList.remove('is-loading', 'is-missing');
            card?.classList.add('is-ready');
        });

        video.addEventListener('error', () => {
            setMissing(video, `The browser could not load or decode ${video.dataset.src || 'this video'}.`);
        });

        card?.addEventListener('mouseenter', () => playVideo(video));
        card?.addEventListener('mouseleave', () => {
            if (!card.classList.contains('in-view')) pauseVideo(video);
        });
        card?.addEventListener('focusin', () => playVideo(video));
        card?.addEventListener('focusout', () => {
            if (!card.classList.contains('in-view')) pauseVideo(video);
        });

        card?.addEventListener('click', () => {
            if (!window.matchMedia('(hover: none)').matches) return;

            if (video.paused) {
                playVideo(video);
            } else {
                pauseVideo(video);
            }
        });
    });

    if ('IntersectionObserver' in window) {
        const preloadObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    loadVideo(entry.target);
                    preloadObserver.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '500px 0px',
            threshold: 0.01
        });

        const playbackObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const video = entry.target;
                const card = video.closest('.motion-card');

                if (entry.isIntersecting) {
                    card?.classList.add('in-view');
                    playVideo(video);
                } else {
                    card?.classList.remove('in-view');
                    pauseVideo(video);
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.55
        });

        videos.forEach((video) => {
            preloadObserver.observe(video);
            if (!reduceMotion) playbackObserver.observe(video);
        });
    } else {
        videos.forEach(loadVideo);
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const name = document.getElementById('contact-name')?.value.trim() || '';
            const email = document.getElementById('contact-email')?.value.trim() || '';
            const message = document.getElementById('contact-message')?.value.trim() || '';
            const subject = encodeURIComponent(`Styling inquiry from ${name || 'website visitor'}`);
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nProject notes:\n${message}`);

            window.location.href = `mailto:hello@zaramstylist.com?subject=${subject}&body=${body}`;
        });
    }
});
