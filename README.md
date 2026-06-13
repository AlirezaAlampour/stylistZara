# Stylist Portfolio - Editorial Fashion Design

A premium static portfolio for a Dubai-based fashion stylist. The site uses HTML5, plain JavaScript, Tailwind CSS via CDN, and custom CSS. No build step is required.

## Stack

* Semantic HTML5
* Tailwind CSS CDN for light utility support
* Custom CSS for the editorial layout, motion states, mobile menu, and contact styling
* Plain JavaScript for scroll reveals, sticky header behavior, mobile menu, contact mailto drafting, and viewport-aware video playback
* Google Fonts: Anton for display type and Inter for body text
* Native vertical video gallery using local MP4 files and poster images

## Motion Assets

Add real exported 9:16 MP4 reels and matching poster images using these filenames:

* `assets/videos/reel-01.mp4` and `assets/posters/reel-01.jpg`
* `assets/videos/reel-02.mp4` and `assets/posters/reel-02.jpg`
* `assets/videos/reel-03.mp4` and `assets/posters/reel-03.jpg`
* `assets/videos/reel-04.mp4` and `assets/posters/reel-04.jpg`
* `assets/videos/reel-05.mp4` and `assets/posters/reel-05.jpg`
* `assets/videos/reel-06.mp4` and `assets/posters/reel-06.jpg`

The page does not ship fake reel videos. If one of these files is missing, the matching card shows a refined "Video pending" state until the real asset is added.

The page does not embed Instagram posts. Instagram is linked only as an external archive CTA.

## Local Preview

Serve locally from the repo root:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deployment

This is a static site, so it can be deployed directly to GitHub Pages from the repository root.

| Setting | Value |
| --- | --- |
| Source | Deploy from a branch |
| Branch | `main` |
| Folder | `/` |
| Live URL | https://alirezaalampour.github.io/stylistZara/ |
