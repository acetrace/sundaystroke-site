export interface GolfGpsFaqItem {
  question: string;
  answer: string;
}

export interface GolfGpsTableData {
  caption: string;
  columns: readonly string[];
  rows: readonly (readonly string[])[];
}

export interface GolfGpsStep {
  title: string;
  body: string;
}

export interface GolfGpsScoredHole {
  hole: number;
  par: number;
  strokes: number;
}

export interface GolfGpsScoreSummary {
  par: number;
  strokes: number;
  toPar: number;
}
