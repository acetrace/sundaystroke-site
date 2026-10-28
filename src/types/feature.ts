import type { StoreTarget } from './apps';

export interface Highlight {
  tag: string;
  title: string;
  body: string;
}

export interface PlanColumn {
  name: string;
  items: readonly string[];
}

export interface MediaItem {
  src: string;
  alt: string;
  caption: string;
}

export interface FeaturePageProps {
  pageTitle: string;
  description: string;
  eyebrow: string;
  headline: string;
  accent: string;
  lead: string;
  target: StoreTarget;
  highlights: readonly Highlight[];
  plans: readonly PlanColumn[];
  media: readonly MediaItem[];
}
