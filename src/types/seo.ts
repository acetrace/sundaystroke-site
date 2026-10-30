import type { AppKey } from './apps';

export type PageSeo =
  | { kind: 'page' }
  | { kind: 'home' }
  | { kind: 'app'; app: AppKey }
  | { kind: 'collection' }
  | { kind: 'notFound' }
  | { kind: 'article'; headline: string; published: string; modified: string };

export interface SocialImage {
  path: string;
  alt: string;
  width: number;
  height: number;
}

export interface AppEntity {
  name: string;
  description: string;
  category: string;
  pagePath: string;
  image: SocialImage;
}

export interface Crumb {
  name: string;
  path: string;
}

export interface PageFacts {
  path: string;
  title: string;
  description: string;
  image: SocialImage;
  seo: PageSeo;
}

export type JsonLdValue = string | number | boolean | readonly JsonLdValue[] | JsonLdObject;

export interface JsonLdObject {
  readonly [key: string]: JsonLdValue;
}
