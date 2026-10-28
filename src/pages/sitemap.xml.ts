import type { APIRoute } from 'astro';
import { sitemapPaths } from '../data/sitemap';

export const GET: APIRoute = ({ site }) => {
  if (site === undefined) throw new Error('astro.config.mjs must set site for the sitemap');
  const urls = sitemapPaths()
    .map((path) => `  <url><loc>${new URL(path, site).href}</loc></url>`)
    .join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
