import type { StoreTarget } from './apps';

export interface StoreCall {
  target: StoreTarget;
  heading: string;
  body: string;
}

export interface ArticleProps {
  pageTitle: string;
  description: string;
  eyebrow: string;
  heading: string;
  published: string;
  banner: StoreTarget | null;
  calls: readonly StoreCall[];
}
