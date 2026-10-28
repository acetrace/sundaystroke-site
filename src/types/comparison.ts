export interface SourcedCell {
  text: string;
  ours: boolean;
  sourceLabel: string;
  sourceUrl: string;
}

export interface ComparisonRow {
  feature: string;
  cells: readonly SourcedCell[];
}

export interface ComparisonTableData {
  apps: readonly string[];
  rows: readonly ComparisonRow[];
}

import type { StoreCall } from './article';

export interface ComparisonPageProps {
  pageTitle: string;
  description: string;
  heading: string;
  intro: string;
  advantages: readonly string[];
  table: ComparisonTableData;
  checkedOn: string;
  methodSourceUrl: string;
  calls: readonly StoreCall[];
}
