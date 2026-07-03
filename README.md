# Giraffe360 Website Prototype

A responsive, 1:1 front-end prototype of the Giraffe360 marketing site, built from the
Figma design (`giraffe_website_design_v1`). Vite + React, desktop-first (1920px design
canvas, scaled to fit narrower windows).

## Pages
- `/` — Home (hero, trusted-by logo marquee, horizontal-scroll feature gallery,
  scroll-linked "How it works" accordion, testimonials, AI tools, video carousel, CTA band, footer)
- `/pricing` — Pricing (billing toggle + plan cards, sticky-header comparison table, FAQ accordion)

## Highlights
- Sticky header with frosted background that fades in on scroll; CTA buttons reveal after the first fold
- Product mega-menu (hover), country/language toast (on load)
- Self-hosted variable fonts: Sora (display), Google Sans Flex (UI/body), Google Sans Code (mono)
- Icons from Google Material Symbols (Outlined, weight 300)
- On-load reveal animations; `prefers-reduced-motion` respected

## Getting started
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
npm run preview  # preview the production build
```

Best viewed in a window ≥ 1920px wide (the design canvas); it scales down proportionally
on smaller desktop windows.
