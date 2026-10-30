import { MIN_HANDICAP_ROUNDS, estimateHandicap, formatHandicap } from './handicap';
import type { CalculatorResult, HandicapRound, RoundInput } from '../types/handicap';

const MIN_SLOPE: number = 55;
const MAX_SLOPE: number = 155;
const NUMBER_PATTERN: RegExp = /^\d+(?:[.,]\d+)?$/;
const WHOLE_NUMBER_PATTERN: RegExp = /^\d+$/;

function parseNumber(raw: string): number | null {
  const trimmed = raw.trim();
  if (!NUMBER_PATTERN.test(trimmed)) return null;
  return Number(trimmed.replace(',', '.'));
}

function parseWholeNumber(raw: string): number | null {
  const trimmed = raw.trim();
  if (!WHOLE_NUMBER_PATTERN.test(trimmed)) return null;
  return Number(trimmed);
}

function isBlank(input: RoundInput): boolean {
  return input.score.trim() === '' && input.rating.trim() === '' && input.slope.trim() === '';
}

export function parseRound(input: RoundInput): HandicapRound | null {
  const adjustedGross = parseWholeNumber(input.score);
  const courseRating = parseNumber(input.rating);
  const slope = parseWholeNumber(input.slope);
  if (adjustedGross === null || courseRating === null || slope === null) return null;
  if (adjustedGross <= 0 || courseRating <= 0 || slope < MIN_SLOPE || slope > MAX_SLOPE) return null;
  return { adjustedGross, courseRating, slope };
}

export function calculate(inputsNewestFirst: readonly RoundInput[]): CalculatorResult {
  const rounds: HandicapRound[] = [];
  for (const [index, input] of inputsNewestFirst.entries()) {
    if (isBlank(input)) continue;
    const round = parseRound(input);
    if (round === null) {
      return {
        kind: 'invalidRound',
        message: `Check round ${index + 1}: enter a whole-number adjusted gross score, a Course Rating and a whole-number Slope Rating from ${MIN_SLOPE} to ${MAX_SLOPE}. No estimate is shown until this round is complete.`,
      };
    }
    rounds.push(round);
  }
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
