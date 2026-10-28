import { SUNDAY_ISSUES } from './sunday';
import { TUTORIALS } from './tutorials';

const STATIC_PAGES: readonly string[] = [
  '/',
  '/tracer/',
  '/tracer/disc-golf/',
  '/golf-gps/',
  '/golf-gps/scorecard/',
  '/golf-gps/handicap/',
  '/learn/',
  '/golf-handicap/',
  '/golf-handicap/calculator/',
  '/compare/tracer/',
  '/compare/golf-gps/',
  '/sunday/',
  '/privacy',
  '/terms',
  '/support',
  '/community',
  '/manual-tracing',
];

export function sitemapPaths(): readonly string[] {
  return [
    ...STATIC_PAGES,
    ...TUTORIALS.map((tutorial) => `/learn/${tutorial.slug}/`),
    ...SUNDAY_ISSUES.map((issue) => `/sunday/${issue.slug}/`),
  ];
}
