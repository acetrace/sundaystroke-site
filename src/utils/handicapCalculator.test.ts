import { describe, expect, it } from 'vitest';
import { calculate, parseRound } from './handicapCalculator';
import { scoreDifferential } from './handicap';

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

describe('the examples on the handicap pages', () => {
  it('gives 16.0 for 90, 92 and 94 at 72.0 and 113', () => {
    const round = (score: string) => ({ score, rating: '72.0', slope: '113' });
    expect(calculate([round('90'), round('92'), round('94')])).toEqual({ kind: 'estimate', message: 'Estimated handicap 16.0' });
  });

  it('gives 21.2 for 95 at 71.5 and 125, and 16.7 for the five-round record', () => {
    const rounds = [
      { score: '95', rating: '71.5', slope: '125' },
      { score: '92', rating: '70.8', slope: '121' },
      { score: '98', rating: '72.4', slope: '131' },
      { score: '90', rating: '71.5', slope: '125' },
      { score: '94', rating: '69.9', slope: '118' },
    ];
    const differentials = rounds.map((input) => {
      const round = parseRound(input);
      if (round === null) throw new Error('invalid example');
      return Math.round(scoreDifferential(round) * 10) / 10;
    });
    expect(differentials).toEqual([21.2, 19.8, 22.1, 16.7, 23.1]);
    expect(calculate(rounds).message).toBe('Estimated handicap 16.7');
  });
});
