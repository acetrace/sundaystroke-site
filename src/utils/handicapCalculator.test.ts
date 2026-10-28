import { describe, expect, it } from 'vitest';
import { calculate, parseRound } from './handicapCalculator';

const ROW_1 = { score: '90', rating: '72.0', slope: '113' };
const ROW_2 = { score: '85', rating: '71.0', slope: '130' };
const ROW_3 = { score: '95', rating: '73.5', slope: '125' };
const EMPTY = { score: '', rating: '', slope: '' };

describe('parseRound', () => {
  it('reads a complete row', () => {
    expect(parseRound(ROW_2)).toEqual({ adjustedGross: 85, courseRating: 71, slope: 130 });
  });

  it('accepts a decimal comma', () => {
    expect(parseRound({ score: '95', rating: '73,5', slope: '125' })).toEqual({ adjustedGross: 95, courseRating: 73.5, slope: 125 });
  });

  it('rejects an incomplete row, text and a slope out of range', () => {
    expect(parseRound({ score: '90', rating: '', slope: '113' })).toBeNull();
    expect(parseRound({ score: 'ninety', rating: '72', slope: '113' })).toBeNull();
    expect(parseRound({ score: '90', rating: '72', slope: '200' })).toBeNull();
  });
});

describe('calculate', () => {
  it('asks for 3 rounds while only 2 are complete', () => {
    expect(calculate([ROW_1, ROW_2, EMPTY])).toEqual({ kind: 'needsRounds', message: 'Enter at least 3 rounds' });
  });

  it('shows the worked example as 10.2', () => {
    expect(calculate([ROW_1, ROW_2, ROW_3])).toEqual({ kind: 'estimate', message: 'Estimated handicap 10.2' });
  });

  it('shows a plus handicap with a plus sign', () => {
    const scratchPlus = { score: '68', rating: '72.0', slope: '113' };
    expect(calculate([scratchPlus, scratchPlus, scratchPlus])).toEqual({ kind: 'estimate', message: 'Estimated handicap +6.0' });
  });
});
