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
    const MAX_CONCURRENT = 2;
    const playingVideos = new Set();

    function updatePlaybackStatus(video) {
        const card = video.closest('.motion-card') || video.closest('.card-media-wrap') || video.closest('figure');
        if (!card) return;

        if (video.paused || video.ended) {
            card.classList.remove('is-playing');
            playingVideos.delete(video);
        } else {
            card.classList.add('is-playing');
            playingVideos.add(video);
        }
    }

    function safePlay(video) {
        // Enforce max concurrent videos
        if (playingVideos.size >= MAX_CONCURRENT) {
            // Pause the oldest playing video
            const oldest = playingVideos.values().next().value;
            if (oldest && oldest !== video) {
                oldest.pause();
                updatePlaybackStatus(oldest);
            }
        }
        const playPromise = video.play();
        if (playPromise && typeof playPromise.then === 'function') {
            playPromise
                .then(() => updatePlaybackStatus(video))
                .catch(() => updatePlaybackStatus(video));
        }
    }

    function togglePlayback(video) {
        if (!video) return;
        if (video.paused) {
            safePlay(video);
        } else {
            video.pause();
            updatePlaybackStatus(video);
        }
    }

    // Image error handling fallback
    document.querySelectorAll('img').forEach((img) => {
        img.addEventListener('error', () => {
            // Prevent broken image icon - apply a neutral background
            img.style.display = 'none';
            const wrap = img.closest('.feature-img-wrap') || img.closest('.card-img-wrap') || img.closest('.portrait-frame');
            if (wrap) {
                wrap.style.background = 'var(--color-stone)';
            }
        });
    });

    videos.forEach((video) => {
        const card = video.closest('.motion-card') || video.closest('.card-media-wrap') || video.closest('figure');
        const controlBtn = card?.querySelector('.video-control-btn');

        video.addEventListener('play', () => updatePlaybackStatus(video));
        video.addEventListener('pause', () => updatePlaybackStatus(video));
        video.addEventListener('ended', () => updatePlaybackStatus(video));

        // Gracefully handle video load errors
        video.addEventListener('error', () => {
            // Show poster as static image, hide play button
            if (controlBtn) controlBtn.style.display = 'none';
            video.style.display = 'none';
            const posterUrl = video.getAttribute('poster');
            if (posterUrl && card) {
                const posterImg = document.createElement('img');
                posterImg.src = posterUrl;
                posterImg.alt = video.getAttribute('aria-label') || 'Video poster';
                posterImg.style.cssText = 'width:100%;height:100%;object-fit:cover;';
                const mediaWrap = video.parentElement;
                if (mediaWrap) mediaWrap.prepend(posterImg);
            }
        });

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
                        safePlay(video);
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
});
