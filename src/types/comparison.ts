export interface SourcedFact {
  text: string;
  sourceLabel: string;
  sourceUrl: string;
}

export interface ComparedApp {
  name: string;
  maker: string;
  facts: readonly SourcedFact[];
}

import type { StoreCall } from './article';

export interface ComparisonPageProps {
  pageTitle: string;
  description: string;
  heading: string;
  intro: string;
  apps: readonly ComparedApp[];
  checkedOn: string;
  methodSourceUrl: string;
  calls: readonly StoreCall[];
}
