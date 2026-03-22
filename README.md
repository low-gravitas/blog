# Low Gravitas Blog

The blog for [lowgravitas.com](https://lowgravitas.com/blog/), built with [Eleventy 3](https://www.11ty.dev/).

Deploys to `lowgravitas.com/blog/` as part of the Low Gravitas site ecosystem.

## Setup

```bash
npm install
npm start      # dev server at http://localhost:8080/blog/
npm run build  # production build to _site/
```

## Structure

```
src/
  _includes/
    base.njk        # outer HTML shell, nav, footer, theme toggle
    post.njk        # blog post layout (extends base)
    page.njk        # static page layout (extends base)
  css/
    blog.css        # blog-specific styles + Prism syntax highlighting
  posts/
    YYYY-MM-DD-slug.md  # blog posts
  index.njk         # post listing
  feed.njk          # Atom feed → /blog/feed.xml
  about.md          # about page
```

## Writing posts

Create a new file in `src/posts/` named `YYYY-MM-DD-your-title.md`:

```markdown
---
title: Your Post Title
date: 2026-03-21
author: Low Gravitas
description: A short description shown in the post listing and RSS feed.
layout: post.njk
---

Your content here. Markdown is supported, including fenced code blocks
with syntax highlighting:

```javascript
const hello = "world";
```
```

## Design system

Styles are inherited from the Low Gravitas ecosystem:

- **Color tokens** — loaded from `https://low-gravitas.github.io/low-gravitas-zen.css`
- **Shared layout** — loaded from `https://low-gravitas.github.io/low-gravitas-common.css`
- **Symbol font** — `LowGravitasSymbols.ttf` loaded from the hub site root
- **Blog styles** — `src/css/blog.css` (typography, code blocks, post layout)

Light/dark theme follows `prefers-color-scheme` by default, with a toggle button that persists the choice via `sessionStorage`.

Syntax highlighting uses Prism (via `@11ty/eleventy-plugin-syntaxhighlight`) with token colors mapped to the Zen palette.

## Deployment

Pushes to `main` automatically build and deploy to GitHub Pages via the workflow in `.github/workflows/pages.yml`.

The site deploys to a subpath (`/blog/`) — the `pathPrefix: "/blog/"` in `eleventy.config.js` handles all asset and link paths correctly.

Pages settings required: **Source → GitHub Actions**.

## Dependencies

| Package | Purpose |
|---|---|
| `@11ty/eleventy` | Static site generator |
| `@11ty/eleventy-plugin-rss` | Atom feed filters (`absoluteUrl`, `dateToRfc3339`, etc.) |
| `@11ty/eleventy-plugin-syntaxhighlight` | Prism.js syntax highlighting for code blocks |
| `@11ty/eleventy-img` | Image optimization (available for use in posts) |
| `markdown-it` | Markdown parser with HTML, linkify, and typographer support |
