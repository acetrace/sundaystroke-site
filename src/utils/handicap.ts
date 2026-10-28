import type { HandicapEstimate, HandicapRound } from '../types/handicap';

export const MIN_HANDICAP_ROUNDS: number = 3;
export const HANDICAP_SELECTION_WINDOW: number = 20;
const NEUTRAL_SLOPE: number = 113;
const MAX_HANDICAP_INDEX: number = 54.0;

interface DifferentialSelection {
  count: number;
  adjustment: number;
}

interface SelectionRow extends DifferentialSelection {
  maxRounds: number;
}

const SELECTION_TABLE: readonly SelectionRow[] = [
  { maxRounds: 3, count: 1, adjustment: 2.0 },
  { maxRounds: 4, count: 1, adjustment: 1.0 },
  { maxRounds: 5, count: 1, adjustment: 0 },
  { maxRounds: 6, count: 2, adjustment: 1.0 },
  { maxRounds: 8, count: 2, adjustment: 0 },
  { maxRounds: 11, count: 3, adjustment: 0 },
  { maxRounds: 14, count: 4, adjustment: 0 },
  { maxRounds: 16, count: 5, adjustment: 0 },
  { maxRounds: 18, count: 6, adjustment: 0 },
  { maxRounds: 19, count: 7, adjustment: 0 },
  { maxRounds: HANDICAP_SELECTION_WINDOW, count: 8, adjustment: 0 },
];

function fewRoundsSelection(roundCount: number): DifferentialSelection {
  const row = SELECTION_TABLE.find((candidate) => roundCount <= candidate.maxRounds);
  if (row === undefined) throw new Error(`No differential selection for ${roundCount} rounds`);
  return row;
}

export function scoreDifferential(round: HandicapRound): number {
  return (NEUTRAL_SLOPE / round.slope) * (round.adjustedGross - round.courseRating);
}

function roundToTenth(value: number): number {
  return Math.round(value * 10) / 10;
}

export function estimateHandicap(roundsNewestFirst: readonly HandicapRound[]): HandicapEstimate {
  if (roundsNewestFirst.length < MIN_HANDICAP_ROUNDS) {
    return { kind: 'needsRounds', roundsNeeded: MIN_HANDICAP_ROUNDS - roundsNewestFirst.length };
  }
  const window = roundsNewestFirst.slice(0, HANDICAP_SELECTION_WINDOW);
  const selection = fewRoundsSelection(window.length);
  const lowest = window
    .map(scoreDifferential)
    .sort((first, second) => first - second)
    .slice(0, selection.count);
  const average = lowest.reduce((sum, differential) => sum + differential, 0) / lowest.length;
  return { kind: 'estimate', value: roundToTenth(Math.min(average - selection.adjustment, MAX_HANDICAP_INDEX)) };
}

export function formatHandicap(value: number): string {
  if (value < 0) return `+${Math.abs(value).toFixed(1)}`;
  return value.toFixed(1);
}
