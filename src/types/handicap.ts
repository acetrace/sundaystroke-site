export interface HandicapRound {
  adjustedGross: number;
  courseRating: number;
  slope: number;
}

export type HandicapEstimate =
  | { kind: 'needsRounds'; roundsNeeded: number }
  | { kind: 'estimate'; value: number };

export interface RoundInput {
  score: string;
  rating: string;
  slope: string;
}

export type CalculatorResult =
  | { kind: 'needsRounds'; message: string }
  | { kind: 'invalidRound'; message: string }
  | { kind: 'estimate'; message: string };
