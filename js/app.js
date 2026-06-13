/* js/app.js */
document.addEventListener('DOMContentLoaded', () => {
    // ── Intersection Observer for scroll reveal animations ──
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach((elem) => {
        observer.observe(elem);
    });

    // ── Sticky Header ──
    const header = document.getElementById('main-header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 150) {
            header.classList.remove('-translate-y-full');
        } else {
            header.classList.add('-translate-y-full');
        }
    });

    // ── Mobile Menu Toggle ──
    const menuOpenBtn = document.getElementById('menu-open-btn');
    const menuCloseBtn = document.getElementById('menu-close-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];

    function openMenu() {
        if (!mobileMenu) return;
        mobileMenu.classList.add('is-open');
        document.body.classList.add('menu-open');
    }

    function closeMenu() {
        if (!mobileMenu) return;
        mobileMenu.classList.remove('is-open');
        document.body.classList.remove('menu-open');
    }

    if (menuOpenBtn) {
        menuOpenBtn.addEventListener('click', openMenu);
    }

    if (menuCloseBtn) {
        menuCloseBtn.addEventListener('click', closeMenu);
    }

    // Close menu when a nav link is tapped
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMenu();
        }
    });
});
