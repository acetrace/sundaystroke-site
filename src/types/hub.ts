import type { StoreTarget } from './apps';

export interface AppCard {
  target: StoreTarget;
  href: string;
  linkLabel: string;
  eyebrow: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
}
