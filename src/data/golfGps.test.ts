import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  GOLF_GPS_FAQ,
  GOLF_GPS_HANDICAP_SCREEN,
  GOLF_GPS_PLANS,
  GOLF_GPS_SCREENS,
  HANDICAP_COMPARISON,
  HANDICAP_FAQ,
  SCORECARD_EXAMPLE_HOLES,
  SCORECARD_FAQ,
  SCORE_NAMES,
  STABLEFORD_POINTS,
  formatToPar,
  summarizeScore,
} from './golfGps';

const TABLES = [HANDICAP_COMPARISON, SCORE_NAMES, STABLEFORD_POINTS];
const COPY = JSON.stringify([GOLF_GPS_PLANS, GOLF_GPS_FAQ, SCORECARD_FAQ, HANDICAP_FAQ, TABLES]);

describe('scorecard example', () => {
  it('adds par 4, 3, 5 with scores 5, 3, 6 to 14 on par 12, +2', () => {
    expect(summarizeScore(SCORECARD_EXAMPLE_HOLES)).toEqual({ par: 12, strokes: 14, toPar: 2 });
    expect(formatToPar(2)).toBe('+2');
    expect(formatToPar(0)).toBe('E');
    expect(formatToPar(-1)).toBe('-1');
  });
});

describe('Golf GPS copy', () => {
  it('gives every table row one cell per column', () => {
    for (const table of TABLES) {
      for (const row of table.rows) expect(row).toHaveLength(table.columns.length);
    }
  });

  it('never says the scorecard keeps itself or shows a currency amount', () => {
    expect(COPY).not.toMatch(/keeps itself/i);
    expect(COPY).not.toMatch(/[$€£¥]\s?\d/);
  });

  it('never calls the estimate an official Handicap Index', () => {
    const estimateCells = HANDICAP_COMPARISON.rows.map((row) => row[1]).join(' ');
    expect(estimateCells).not.toMatch(/official/i);
    expect(HANDICAP_FAQ[0]?.answer).toMatch(/^No\./);
  });

  it('points at screenshots that exist', () => {
    for (const item of [...GOLF_GPS_SCREENS, GOLF_GPS_HANDICAP_SCREEN]) {
      expect(existsSync(join('public', item.src))).toBe(true);
    }
  });
});
