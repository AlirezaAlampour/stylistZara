/* js/tailwind.config.js */
window.tailwind = window.tailwind || {};
window.tailwind.config = {
    theme: {
        extend: {
            colors: {
                base: '#eeeae3',
                'base-deep': '#e2dde4',
                paper: '#f7f3ec',
                ink: '#0c0b09',
                'ink-soft': '#22201c',
                muted: '#6f6a61',
                stone: '#c9c1b4',
                accent: '#7a1e20',
                'accent-light': '#982b2e',
            },
            fontFamily: {
                display: ['"Anton"', 'Impact', 'sans-serif'],
                serif: ['"Playfair Display"', 'Georgia', 'serif'],
                body: ['"Inter"', '"Helvetica Neue"', 'sans-serif'],
            },
            letterSpacing: {
                'ultra-wide': '0.3em',
                editorial: '0.22em',
                micro: '0.14em',
            },
            transitionTimingFunction: {
                editorial: 'cubic-bezier(0.16, 1, 0.3, 1)',
                'smooth-out': 'cubic-bezier(0.22, 1, 0.36, 1)',
            },
        }
    }
};
