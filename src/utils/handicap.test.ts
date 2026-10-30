import { describe, expect, it } from 'vitest';
import type { HandicapRound } from '../types/handicap';
import { estimateHandicap, formatHandicap, roundedDifferential, scoreDifferential } from './handicap';

function round(adjustedGross: number, courseRating: number = 72, slope: number = 113): HandicapRound {
  return { adjustedGross, courseRating, slope };
}

function rounds(differentials: readonly number[]): HandicapRound[] {
  return differentials.map((differential) => round(72 + differential));
}

describe('scoreDifferential', () => {
  it('scales the score over the course rating by 113 over the slope', () => {
    expect(scoreDifferential(round(85, 71.0, 130))).toBeCloseTo(12.169, 3);
  });
});

describe('roundedDifferential', () => {
  it('rounds the differential to one decimal', () => {
    expect(roundedDifferential(round(85, 71.0, 130))).toBe(12.2);
  });
});

describe('estimateHandicap', () => {
  it('averages differentials already rounded to one decimal', () => {
    const middling = round(100, 72.0, 113);
    expect(
      estimateHandicap([round(81, 70.1, 121), round(83, 70.1, 125), middling, middling, middling, middling]),
    ).toEqual({ kind: 'estimate', value: 10 });
  });

  it('matches the worked example on the page', () => {
    expect(estimateHandicap([round(90, 72.0, 113), round(85, 71.0, 130), round(95, 73.5, 125)])).toEqual({
      kind: 'estimate',
      value: 10.2,
    });
  });

  it('asks for more rounds below three', () => {
    expect(estimateHandicap([round(90), round(85)])).toEqual({ kind: 'needsRounds', roundsNeeded: 1 });
    expect(estimateHandicap([])).toEqual({ kind: 'needsRounds', roundsNeeded: 3 });
  });

  it.each([
    [3, 8],
    [4, 9],
    [5, 10],
    [6, 9.5],
    [8, 10.5],
    [11, 11],
    [14, 11.5],
    [16, 12],
    [18, 12.5],
    [19, 13],
    [20, 13.5],
  ])('applies the few-rounds table for %i rounds', (count, expected) => {
    const differentials = Array.from({ length: count }, (_, index) => 10 + index);
    expect(estimateHandicap(rounds(differentials))).toEqual({ kind: 'estimate', value: expected });
  });

  it('uses only the 20 most recent rounds', () => {
    const recent = Array.from({ length: 20 }, () => 20);
    expect(estimateHandicap(rounds([...recent, 0, 0, 0]))).toEqual({ kind: 'estimate', value: 20 });
  });

  it('caps the estimate at 54.0', () => {
    expect(estimateHandicap(rounds([80, 80, 80]))).toEqual({ kind: 'estimate', value: 54 });
  });
});

describe('formatHandicap', () => {
  it('shows a plus handicap with a plus sign', () => {
    expect(formatHandicap(-1.4)).toBe('+1.4');
    expect(formatHandicap(10.2)).toBe('10.2');
  });
});
