# ZARA STYLIST — High-Fashion Editorial Portfolio

A distinctive, high-end editorial and commercial styling portfolio for Zara, a Dubai-based fashion stylist. Designed with the visual discipline of luxury fashion publications, independent art-direction studios, and minimal portfolio systems.

## Architecture & Tech Stack

- **Core**: Semantic HTML5 (`index.html`) + Plain JavaScript (`js/app.js`).
- **Styling**: Utility support via Tailwind CDN (`js/tailwind.config.js`) combined with a comprehensive custom CSS editorial design system (`css/style.css`).
- **Typography**: Google Fonts (`Anton` for display headlines, `Playfair Display` for editorial captions and look titles, and `Inter` for clean body copy and metadata).
- **Motion & Media**: Native HTML5 `<video>` gallery (`muted`, `loop`, `playsinline`, `preload="metadata"`) managed via viewport-aware `IntersectionObserver`. No Instagram `iframe` embeds or social interface borders.
- **No Build Required**: Static web architecture ready for immediate static hosting (e.g. GitHub Pages).

## Media Structure (`assets/media/`)

All video reels and matching poster frames are organized under `assets/media/` using exact post shortcodes:

```
assets/media/
├── videos/
│   ├── DRU9g_sD9kP.mp4
│   ├── DQokYA4kixm.mp4
│   ├── DC6do0WzYL-.mp4
│   ├── DGQxW2gzM8T.mp4
│   ├── DGlZoR5IHMv.mp4
│   ├── DMHzfHLShmf.mp4
│   ├── DJBejYgz0eH.mp4
│   ├── DGNoDR0Jk3A.mp4
│   ├── DCE3a6JoJwF.mp4
│   ├── CyBaj-ONCBz.mp4
│   ├── DU5mSqdCGov.mp4
│   ├── DVgC_SYDFHH.mp4
│   └── DXENu4hAQJL.mp4
├── posters/
│   ├── DRU9g_sD9kP-poster.webp
│   └── [shortcode]-poster.webp
└── media-manifest.json
```

Each video file has `moov` fast-start metadata enabled for instantaneous web streaming. If an asset cannot be reached or fails to decode, the gallery automatically presents the fallback poster and a direct link (`View original post ↗`) without throwing runtime errors or disrupting layout.

## Local Development & Verification

To run and preview the site locally without caching issues, serve the root directory using Python:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000` in your browser.

## Production Deployment

This project deploys cleanly as a static site on GitHub Pages directly from the repository root:

| Setting | Value |
| --- | --- |
| Source | Deploy from a branch |
| Branch | `main` |
| Folder | `/` (root) |
| Live Production URL | https://alirezaalampour.github.io/stylistZara/ |
