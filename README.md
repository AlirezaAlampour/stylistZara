# Stylist Portfolio — Minimal Modern Design

A clean, editorial fashion styling portfolio built as a static website. Uses HTML5, plain JavaScript, and Tailwind CSS (via CDN) — no build step required.

## Stack

* Semantic HTML5
* Tailwind CSS (CDN) for utility styling
* Custom CSS for animations, mobile menu, and Instagram embed grid
* Plain JavaScript for intersection observer animations, sticky header, and mobile menu
* Google Fonts — Anton (headings) & Inter (body)
* Real Instagram reel/post embeds via iframes

## How to Use

1. Open `index.html` directly in your browser, or serve locally:
   ```bash
   python -m http.server 8000
   ```
2. Visit `http://localhost:8000` to preview the site.

## Deployment

This is a **static site** — no build step, no Node.js, no bundler required.

It is hosted with **GitHub Pages**:

| Setting        | Value                                                  |
|----------------|--------------------------------------------------------|
| Source         | Deploy from a branch                                   |
| Branch         | `main`                                                 |
| Folder         | `/` (root)                                             |
| Live URL       | https://alirezaalampour.github.io/stylistZara/         |

### To enable GitHub Pages:

1. Go to the GitHub repository **Settings** → **Pages**
2. Under **Source**, select **Deploy from a branch**
3. Set **Branch** to `main` and **Folder** to `/ (root)`
4. Click **Save**
5. Wait 1–2 minutes for the deployment to complete
6. The site will be live at the URL above
