import { MIN_HANDICAP_ROUNDS, estimateHandicap, formatHandicap } from './handicap';
import type { CalculatorResult, HandicapRound, RoundInput } from '../types/handicap';

const MIN_SLOPE: number = 55;
const MAX_SLOPE: number = 155;
const NUMBER_PATTERN: RegExp = /^\d+(?:[.,]\d+)?$/;

function parseNumber(raw: string): number | null {
  const trimmed = raw.trim();
  if (!NUMBER_PATTERN.test(trimmed)) return null;
  return Number(trimmed.replace(',', '.'));
}

export function parseRound(input: RoundInput): HandicapRound | null {
  const adjustedGross = parseNumber(input.score);
  const courseRating = parseNumber(input.rating);
  const slope = parseNumber(input.slope);
  if (adjustedGross === null || courseRating === null || slope === null) return null;
  if (adjustedGross <= 0 || courseRating <= 0 || slope < MIN_SLOPE || slope > MAX_SLOPE) return null;
  return { adjustedGross, courseRating, slope };
}

export function calculate(inputsNewestFirst: readonly RoundInput[]): CalculatorResult {
  const rounds = inputsNewestFirst.map(parseRound).filter((round): round is HandicapRound => round !== null);
  const estimate = estimateHandicap(rounds);
  switch (estimate.kind) {
    case 'needsRounds':
      return { kind: 'needsRounds', message: `Enter at least ${MIN_HANDICAP_ROUNDS} rounds` };
    case 'estimate':
      return { kind: 'estimate', message: `Estimated handicap ${formatHandicap(estimate.value)}` };
    default: {
      const exhaustive: never = estimate;
      throw new Error(`Unhandled estimate: ${JSON.stringify(exhaustive)}`);
    }
  }
}
