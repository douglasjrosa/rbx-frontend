# Ribermax Frontend

Static institutional website built with Next.js 16 (App Router).

## Content

- **Global config:** `content/site.ts` (navbar, footer, WhatsApp)
- **Home:** `content/pages/home.ts` (single-page sections)
- **SEO pages:** `content/seo/*.md` (long-tail content for Google ranking)

## Scripts

```bash
npm run dev          # Development with Turbopack
npm run build        # Production build
npm run start        # Production server
npm run download-images  # Fetch images from ribermax.com.br
```

## Environment

No backend required. Optional:

```env
NEXT_PUBLIC_SITE_URL=https://ribermax.com.br
```

## Architecture

```
app/
  page.tsx           # Single-page home with anchor sections
  [slug]/page.tsx    # SEO landing pages only
  layout.tsx
content/
  site.ts            # Global site config (navbar anchors)
  pages/home.ts      # Home section content
  seo/               # SEO markdown pages
lib/
  home-sections.ts   # Section IDs and anchor helpers
  content/           # Content loaders and types
```

All content is static and versioned in this repository. SEO markdown files follow the format documented in the SEO project (`seo/site-rbx/CLAUDE.md`).
