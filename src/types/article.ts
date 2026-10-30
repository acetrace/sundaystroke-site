import type { StoreTarget } from './apps';

export interface StoreCall {
  target: StoreTarget;
  heading: string;
  body: string;
}

export interface ArticleDates {
  published: string;
  modified: string;
}

export interface ArticleProps {
  pageTitle: string;
  description: string;
  eyebrow: string;
  heading: string;
  dates: ArticleDates | null;
  banner: StoreTarget | null;
  calls: readonly StoreCall[];
}
