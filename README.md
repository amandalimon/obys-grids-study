# Obys Grids Study

![Status: work in progress](https://img.shields.io/badge/status-work%20in%20progress-orange)

An independent front-end recreation of [Grids](https://grids.obys.agency/) by [Obys Agency](https://obys.agency/), rebuilt with Next.js and GSAP as a practice project.

The original site is built with Readymag. This project rebuilds its layout and interactions by hand, using the original's measurements and animation data as reference, with the goal of matching it as closely as possible.

> Not affiliated with Obys Agency. The design and concept belong to them; this repository is for learning purposes only.

## Stack

- [Next.js 16](https://nextjs.org) (App Router) and React 19
- [Tailwind CSS 4](https://tailwindcss.com)
- [GSAP 3](https://gsap.com) with ScrollTrigger and `@gsap/react`

## Getting started

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run lint
npx prettier --write .
```

## Credits

The original concept, visual design, art direction, copy and interaction design belong to [Obys Agency](https://obys.agency/) — see the original at [grids.obys.agency](https://grids.obys.agency/). This repository is an independent technical recreation made for learning purposes. It is not an official Obys Agency project, is not affiliated with or endorsed by them, and claims no ownership of the original work.

Font: TeX Gyre Heros by GUST e-foundry, distributed under the [GUST Font License](src/app/fonts/GUST-FONT-LICENSE.txt).
