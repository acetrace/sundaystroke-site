import { describe, expect, it } from 'vitest';
import { breadcrumbTrail, serializeJsonLd, structuredData } from './structuredData';
import { DEFAULT_IMAGE } from '../data/seo';
import type { JsonLdObject, JsonLdValue, PageFacts, PageSeo } from '../types/seo';

function page(path: string, seo: PageSeo, title: string = 'A page · SundayStroke'): PageFacts {
  return { path, title, description: 'About the page.', image: DEFAULT_IMAGE, seo };
}

function nodes(data: JsonLdObject): readonly JsonLdObject[] {
  const graph = data['@graph'];
  if (!Array.isArray(graph)) throw new Error('No graph');
  return graph.filter((node: JsonLdValue): node is JsonLdObject => typeof node === 'object' && !Array.isArray(node));
}

function types(data: JsonLdObject): readonly JsonLdValue[] {
  return nodes(data).map((node) => node['@type'] ?? '');
}

describe('structuredData', () => {
  it('describes the home page with the organization, the site and both apps', () => {
    const data = structuredData(page('/', { kind: 'home' }), 'https://sundaystroke.com/');
    expect(types(data)).toEqual(['Organization', 'WebSite', 'CollectionPage', 'MobileApplication', 'MobileApplication']);
    expect(nodes(data)[0]).toMatchObject({ name: 'SundayStroke', legalName: 'Ivkin Labs LLC' });
  });

  it('gives an app page its app, without any rating', () => {
    const data = structuredData(page('/golf-gps/', { kind: 'app', app: 'golfGps' }), 'https://sundaystroke.com/golf-gps/');
    expect(types(data)).toContain('MobileApplication');
    const app = nodes(data).find((node) => node['@type'] === 'MobileApplication');
    expect(app).toMatchObject({ name: 'SundayStroke Golf GPS', operatingSystem: 'iOS' });
    expect(serializeJsonLd(data)).not.toMatch(/aggregateRating|ratingValue|reviewCount/);
  });

  it('marks an editorial page as an Article with its date', () => {
    const data = structuredData(
      page('/golf-handicap/', { kind: 'article', headline: 'How a golf handicap is calculated', published: '2026-10-29' }),
      'https://sundaystroke.com/golf-handicap/',
    );
    const article = nodes(data).find((node) => node['@type'] === 'Article');
    expect(article).toMatchObject({ headline: 'How a golf handicap is calculated', datePublished: '2026-10-29' });
    expect(types(data)).toContain('BreadcrumbList');
  });
});

describe('breadcrumbTrail', () => {
  it('links each parent page and skips folders that are not pages', () => {
    expect(breadcrumbTrail(page('/golf-handicap/calculator/', { kind: 'page' }))).toEqual([
      { name: 'Home', path: '/' },
      { name: 'Golf handicap', path: '/golf-handicap/' },
      { name: 'Calculator', path: '/golf-handicap/calculator/' },
    ]);
    expect(breadcrumbTrail(page('/compare/tracer/', { kind: 'page' })).map((crumb) => crumb.path)).toEqual(['/', '/compare/tracer/']);
  });

  it('names a generated page after its headline', () => {
    const trail = breadcrumbTrail(page('/learn/film-a-golf-shot/', { kind: 'article', headline: 'Film a golf shot', published: '2026-10-28' }));
    expect(trail.at(-1)).toEqual({ name: 'Film a golf shot', path: '/learn/film-a-golf-shot/' });
    expect(trail[1]).toEqual({ name: 'Learn', path: '/learn/' });
  });
});

describe('serializeJsonLd', () => {
  it('cannot close the script tag it sits in', () => {
    expect(serializeJsonLd({ name: '</script>' })).not.toContain('</');
  });
});
