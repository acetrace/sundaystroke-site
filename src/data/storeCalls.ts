import type { StoreCall } from '../types/article';
import type { StoreTarget } from '../types/apps';

export const TRACER_HOWTO_TARGET: StoreTarget = { app: 'tracer', campaign: 'web-tracer-howto' };

export const HANDICAP_TARGET: StoreTarget = { app: 'golfGps', campaign: 'web-gps-handicap' };

export const TRACER_HOWTO_CALLS: readonly StoreCall[] = [
  {
    target: TRACER_HOWTO_TARGET,
    heading: 'Try it on your own video',
    body: 'SundayStroke Tracer is free to try on iPhone.',
  },
];

export const HANDICAP_CALLS: readonly StoreCall[] = [
  {
    target: HANDICAP_TARGET,
    heading: 'Let the app do the sums',
    body: 'Golf GPS Pro works out your Estimated Handicap from the rounds you play.',
  },
];

export const SUNDAY_CALLS: readonly StoreCall[] = [
  { target: { app: 'tracer', campaign: 'web-sunday' }, heading: 'Tracer', body: 'Draw the flight onto your own videos.' },
  { target: { app: 'golfGps', campaign: 'web-sunday' }, heading: 'Golf GPS', body: 'Free yardages and a scorecard for your Sunday round.' },
];

export const TRACER_COMPARE_CALLS: readonly StoreCall[] = [
  { target: { app: 'tracer', campaign: 'web-compare' }, heading: 'Try Tracer', body: 'Free to try on iPhone, for golf and disc golf.' },
];

export const GOLF_GPS_COMPARE_CALLS: readonly StoreCall[] = [
  { target: { app: 'golfGps', campaign: 'web-compare' }, heading: 'Try Golf GPS', body: 'Free GPS yardages and a scorecard on iPhone.' },
];
