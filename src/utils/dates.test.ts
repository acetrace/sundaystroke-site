import { describe, expect, it } from 'vitest';
import { isoDate } from './dates';

describe('isoDate', () => {
  it('turns a display date into an ISO date', () => {
    expect(isoDate('29 October 2026')).toBe('2026-10-29');
    expect(isoDate('1 November 2026')).toBe('2026-11-01');
  });

  it('reads a date with a weekday in front', () => {
    expect(isoDate('Sunday 1 November 2026')).toBe('2026-11-01');
  });

  it('refuses anything else', () => {
    expect(() => isoDate('2026-10-29')).toThrow();
    expect(() => isoDate('29 Octember 2026')).toThrow();
  });
});
