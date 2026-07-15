# ZARA STYLIST — High-Fashion Editorial Portfolio

A distinctive, high-end editorial and commercial styling portfolio for Zara, a Dubai-based fashion stylist. Designed with the visual discipline of luxury fashion publications and minimal portfolio systems.

## Architecture & Tech Stack

- **Core**: Semantic HTML5 (`index.html`) + Plain JavaScript (`js/app.js`).
- **Styling**: Utility support via Tailwind CDN (`js/tailwind.config.js`) combined with a comprehensive custom CSS editorial design system (`css/style.css`).
- **Typography**: Google Fonts (`Anton` for display headlines, `Playfair Display` for editorial captions and look titles, and `Inter` for clean body copy and metadata).
- **Motion & Media**: Native HTML5 `<video>` gallery (`muted`, `loop`, `playsinline`, `preload="none"`) managed via viewport-aware `IntersectionObserver` with a max 2 concurrent video limit. No Instagram `iframe` embeds.
- **No Build Required**: Static web architecture — no npm, React, Next.js, or build step.

## Local Preview

Serve the root directory with any static HTTP server. Do **not** open `index.html` directly via `file://` — relative paths and CORS will break.

```bash
# Python 3
python -m http.server 8000

# Node.js (if npx available)
npx -y serve .
```

Then visit `http://localhost:8000` in your browser.

## GitHub Pages Deployment

This project deploys as a static site on GitHub Pages directly from the repository root:

| Setting | Value |
| --- | --- |
| Source | Deploy from a branch |
| Branch | `main` |
| Folder | `/` (root) |
| Live URL | https://alirezaalampour.github.io/stylistZara/ |

All asset paths use `./` relative format (e.g. `./assets/media/videos/example.mp4`) so they resolve correctly under the `/stylistZara/` project path.

## Media Structure

```
assets/media/
├── videos/          # MP4 video reels (H.264 + AAC, fast-start)
├── posters/         # WebP poster frames matching each video
├── images/          # Local editorial images (WebP)
└── media-manifest.json
```

### Recommended Media Limits

- **Individual video**: Keep under 10 MB for reliable GitHub Pages delivery
- **Total media directory**: Keep under 100 MB; GitHub warns at 50 MB per file
- **Active videos on page**: 8 maximum (hero + 5 motion archive + 2 selected work)
- **Videos before interaction**: 0 — all use `preload="none"`, play only when scrolled into view

### Current Media Budget

| Category | Count | Total Size |
| --- | --- | --- |
| Videos (all tracked) | 13 | ~74.9 MB |
| Posters | 13 | ~0.26 MB |
| Images | 2 | ~0.2 MB |
| **Total** | — | **~75.3 MB** |

> **Note**: The hero video `DXENu4hAQJL.mp4` is 16.6 MB — consider compressing or moving to Cloudinary/Cloudflare R2 for better load performance. Videos over 10 MB may be slow on GitHub Pages.

### How to Replace a Video

1. Export the new video as H.264 MP4 with AAC audio
2. Add fast-start metadata: `ffmpeg -i input.mp4 -movflags +faststart -c copy output.mp4`
3. Name the file with the Instagram shortcode or a descriptive name
4. Place it in `assets/media/videos/`
5. Create a poster frame: `ffmpeg -i video.mp4 -vframes 1 -q:v 2 poster.webp`
6. Place the poster in `assets/media/posters/` as `[name]-poster.webp`
7. Update `index.html` video `src` and `poster` attributes
8. Update `media-manifest.json` with the new entry
9. Test locally with `python -m http.server 8000` before committing

### Future Media Hosting

For production at scale, large media files should be moved to:
- **Cloudinary** — automatic format optimization and CDN
- **Cloudflare R2** — S3-compatible, no egress fees
- **Bunny CDN** — cost-effective video delivery

Update the `src` and `poster` attributes in `index.html` to point to the CDN URLs. The manifest can track both local and remote paths.

## Page Structure

1. Hero
2. Social Highlights / Motion Archive (5 curated vertical reels)
3. Selected Work (editorial image + video portfolio grid)
4. Practice & Capabilities
5. About / Profile
6. Contact & Bookings
7. Footer
