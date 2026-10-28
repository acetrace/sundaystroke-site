import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = 'dist';
const SITE_HOST = 'sundaystroke.com';
const FROZEN_PAGES = ['privacy', 'terms', 'support', 'community', 'manual-tracing'];
const PRODUCT_PREFIXES = ['index.html', 'tracer/', 'golf-gps/'];
const COPY_RULES = [
  { name: 'baseball', pattern: /baseball/i },
  { name: '"shot" followed by "tracer"', pattern: /shot\s*tracer/i },
];
const CURRENCY = /[$€£¥]\s?\d|\d\s?(?:USD|EUR|GBP)\b/;
const TRACER_DISTANCE = /\b(?:measures?|calculates?|tracks?)\b[^.]{0,40}\bdistance/i;

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return htmlFiles(path);
    return name.endsWith('.html') ? [path] : [];
  });
}

function visibleText(html) {
  return html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
}

function resolveInternal(href) {
  const path = href.split(/[?#]/)[0];
  if (path === '') return true;
  const target = join(DIST, decodeURIComponent(path));
  if (path.endsWith('/')) return existsSync(join(target, 'index.html'));
  return existsSync(target) || existsSync(`${target}.html`);
}

const problems = [];
const files = htmlFiles(DIST).filter((file) => !file.endsWith('404.html') && !file.endsWith('faq.html'));

for (const file of files) {
  const page = relative(DIST, file);
  const html = readFileSync(file, 'utf8');
  const text = visibleText(html);

  for (const rule of COPY_RULES) {
    if (rule.pattern.test(html)) problems.push(`${page}: contains ${rule.name}`);
  }
  if (PRODUCT_PREFIXES.some((prefix) => page === prefix || page.startsWith(prefix)) && CURRENCY.test(text)) {
    problems.push(`${page}: shows a currency amount`);
  }
  if (page.startsWith('tracer/') && TRACER_DISTANCE.test(text)) problems.push(`${page}: says Tracer measures distance`);
  if (!html.includes('static.cloudflareinsights.com/beacon.min.js') || !html.includes('data-cf-beacon')) problems.push(`${page}: no analytics beacon`);
  if (!html.includes('name="google-site-verification"')) problems.push(`${page}: no verification meta`);

  for (const [, href] of html.matchAll(/href="([^"]+)"/g)) {
    if (href.includes('apps.apple.com') && (!/[?&]ct=web-[a-z-]+/.test(href) || !href.includes('mt=8'))) {
      problems.push(`${page}: untagged App Store link ${href}`);
    }
    if (href.startsWith('/') && !href.startsWith('//') && !resolveInternal(href)) problems.push(`${page}: broken link ${href}`);
    if (href.startsWith(`https://${SITE_HOST}/`) && !resolveInternal(new URL(href).pathname)) problems.push(`${page}: broken link ${href}`);
  }
  for (const [, src] of html.matchAll(/<(?:source|img)[^>]+src="(\/[^"]+)"/g)) {
    if (!resolveInternal(src)) problems.push(`${page}: missing media ${src}`);
  }
}

for (const page of FROZEN_PAGES) {
  if (!existsSync(join(DIST, `${page}.html`))) problems.push(`frozen page /${page} is not served at its exact URL`);
}

const sitemap = readFileSync(join(DIST, 'sitemap.xml'), 'utf8');
for (const [, loc] of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  if (!resolveInternal(new URL(loc).pathname)) problems.push(`sitemap lists a missing page ${loc}`);
}
const listed = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, loc]) => new URL(loc).pathname));
for (const file of files) {
  const page = `/${relative(DIST, file)}`.replace(/index\.html$/, '').replace(/\.html$/, '');
  if (!listed.has(page)) problems.push(`sitemap does not list ${page}`);
}
if (!readFileSync(join(DIST, 'robots.txt'), 'utf8').includes(`https://${SITE_HOST}/sitemap.xml`)) problems.push('robots.txt does not name the sitemap');

if (problems.length > 0) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log(`dist check passed: ${files.length} pages`);
