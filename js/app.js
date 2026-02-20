/* js/app.js */
document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for scroll reveal animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach((elem) => {
        observer.observe(elem);
    });

    // Sticky Header Logic using mix-blend-mode difference and scroll behavior
    const header = document.getElementById('main-header');

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        // Show header when scrolled down slightly past cover
        if (currentScrollY > 150) {
            header.classList.remove('-translate-y-full');
        } else {
            header.classList.add('-translate-y-full');
        }
    });
});
