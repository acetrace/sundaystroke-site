# sundaystroke-site

The sundaystroke.com site for SundayStroke Tracer: landing page, privacy policy, terms of use, support, community and manual tracing. Astro static build, deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

```bash
npm ci
npm run dev
npm run build
```

Until the custom domain is set, the site is served at `https://acetrace.github.io/sundaystroke-site/`, so `astro.config.mjs` sets `site` to `https://acetrace.github.io` and `base` to `/sundaystroke-site`. When sundaystroke.com goes live: set `site` to `https://sundaystroke.com`, remove `base`, and add `public/CNAME` containing `sundaystroke.com`.

The privacy policy and terms go live on sundaystroke.com only after the owner approves the exact text.
