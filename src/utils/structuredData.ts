import { appStoreUrl, APP_STORE_PROVIDER_TOKEN } from '../data/campaigns';
import { BRAND_NAME, PUBLISHER, SITE_URL, SUPPORT_EMAIL, CONTENT_BYLINE } from '../data/site';
import { APP_ENTITIES, CRUMB_LABELS } from '../data/seo';
import type { AppKey, StoreTarget } from '../types/apps';
import type { Crumb, JsonLdObject, PageFacts, SocialImage } from '../types/seo';

const ORGANIZATION_ID: string = `${SITE_URL}/#organization`;
const WEBSITE_ID: string = `${SITE_URL}/#website`;
const TITLE_SEPARATOR: RegExp = / [·|] /;

const APP_TARGETS: Readonly<Record<AppKey, StoreTarget>> = {
  tracer: { app: 'tracer', campaign: 'web-tracer-home' },
  golfGps: { app: 'golfGps', campaign: 'web-gps-home' },
};

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).href;
}

function appId(app: AppKey): string {
  return `${absoluteUrl(APP_ENTITIES[app].pagePath)}#app`;
}

function imageObject(image: SocialImage): JsonLdObject {
  return { '@type': 'ImageObject', url: absoluteUrl(image.path), width: image.width, height: image.height, caption: image.alt };
}

function organization(): JsonLdObject {
  return {
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: BRAND_NAME,
    legalName: PUBLISHER,
    url: absoluteUrl('/'),
    email: SUPPORT_EMAIL,
    logo: { '@type': 'ImageObject', url: absoluteUrl('/favicon-512.png'), width: 512, height: 512 },
  };
}

function website(): JsonLdObject {
  return { '@type': 'WebSite', '@id': WEBSITE_ID, name: BRAND_NAME, url: absoluteUrl('/'), publisher: { '@id': ORGANIZATION_ID } };
}

export function mobileApplication(app: AppKey): JsonLdObject {
  const entity = APP_ENTITIES[app];
  return {
    '@type': 'MobileApplication',
    '@id': appId(app),
    name: entity.name,
    description: entity.description,
    operatingSystem: 'iOS',
    applicationCategory: entity.category,
    url: absoluteUrl(entity.pagePath),
    installUrl: appStoreUrl(APP_TARGETS[app], APP_STORE_PROVIDER_TOKEN),
    image: imageObject(entity.image),
    publisher: { '@id': ORGANIZATION_ID },
  };
}

function shortTitle(title: string): string {
  return title.split(TITLE_SEPARATOR)[0] ?? title;
}

export function pageName(page: PageFacts): string {
  const label = CRUMB_LABELS[page.path];
  if (label !== undefined) return label;
  if (page.seo.kind === 'article') return page.seo.headline;
  return shortTitle(page.title);
}

export function breadcrumbTrail(page: PageFacts): readonly Crumb[] {
  const segments = page.path.split('/').filter((segment) => segment !== '');
  const parents = segments
    .slice(0, -1)
    .map((_, index) => `/${segments.slice(0, index + 1).join('/')}/`)
    .flatMap((path): Crumb[] => {
      const label = CRUMB_LABELS[path];
      return label === undefined ? [] : [{ name: label, path }];
    });
  return [{ name: 'Home', path: '/' }, ...parents, { name: pageName(page), path: page.path }];
}

function breadcrumbList(page: PageFacts, url: string): JsonLdObject {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: breadcrumbTrail(page).map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

function appsOnPage(page: PageFacts): readonly AppKey[] {
  switch (page.seo.kind) {
    case 'home':
      return ['tracer', 'golfGps'];
    case 'app':
      return [page.seo.app];
    case 'page':
    case 'collection':
    case 'notFound':
    case 'article':
      return [];
    default: {
      const exhaustive: never = page.seo;
      throw new Error(`Unhandled page kind: ${JSON.stringify(exhaustive)}`);
    }
  }
}

function webPage(page: PageFacts, url: string, apps: readonly AppKey[]): JsonLdObject {
  const isHome = page.seo.kind === 'home';
  const isCollection = isHome || page.seo.kind === 'collection';
  const base: JsonLdObject = {
    '@type': isCollection ? 'CollectionPage' : 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: page.title,
    description: page.description,
    inLanguage: 'en',
    isPartOf: { '@id': WEBSITE_ID },
    primaryImageOfPage: imageObject(page.image),
  };
  const about: JsonLdObject = apps.length > 0 ? { about: apps.map((app) => ({ '@id': appId(app) })) } : {};
  const breadcrumb: JsonLdObject = isHome ? {} : { breadcrumb: { '@id': `${url}#breadcrumb` } };
  return { ...base, ...about, ...breadcrumb };
}

function article(page: PageFacts, url: string, headline: string, published: string, modified: string): JsonLdObject {
  return {
    '@type': 'Article',
    '@id': `${url}#article`,
    headline,
    description: page.description,
    datePublished: published,
    dateModified: modified,
    inLanguage: 'en',
    image: imageObject(page.image),
    author: { '@type': 'Organization', name: CONTENT_BYLINE, url: absoluteUrl('/') },
    publisher: { '@id': ORGANIZATION_ID },
    mainEntityOfPage: { '@id': `${url}#webpage` },
  };
}

export function structuredData(page: PageFacts, url: string): JsonLdObject {
  const apps = appsOnPage(page);
  const nodes: JsonLdObject[] = [organization(), website(), webPage(page, url, apps), ...apps.map(mobileApplication)];
  if (page.seo.kind !== 'home') nodes.push(breadcrumbList(page, url));
  if (page.seo.kind === 'article') nodes.push(article(page, url, page.seo.headline, page.seo.published, page.seo.modified));
  return { '@context': 'https://schema.org', '@graph': nodes };
}

export function serializeJsonLd(data: JsonLdObject): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
