import { sitePath } from '../utils/paths';
import type { ComparedApp } from '../types/comparison';

export const COMPARISONS_CHECKED_ON: string = '28 October 2026';
export const APP_STORE_SEARCH_API_URL: string = 'https://performance-partners.apple.com/search-api';

function listingUrl(appStoreId: string): string {
  return `https://itunes.apple.com/lookup?id=${appStoreId}&country=us`;
}

const LISTING: string = 'US App Store listing';

export const TRACER_COMPARISON: readonly ComparedApp[] = [
  {
    name: 'SundayStroke Tracer',
    maker: 'Ivkin Labs LLC (us)',
    facts: [
      { text: 'Free to try; Premium is a subscription that removes the watermark and limits on saves', sourceLabel: 'Our Tracer page', sourceUrl: sitePath('/tracer/') },
      { text: 'Follows a golf ball on its own after you select it; discs use Free curve, with key points added by hand where needed', sourceLabel: 'Our tutorials', sourceUrl: sitePath('/learn/') },
      { text: 'Golf and disc golf', sourceLabel: 'Our Tracer page', sourceUrl: sitePath('/tracer/') },
    ],
  },
  {
    name: "Visual Vertigo's tracer app",
    maker: 'Visual Vertigo Software Technologies GmbH',
    facts: [
      { text: 'Paid up front, with a Pro editor', sourceLabel: LISTING, sourceUrl: listingUrl('1140451547') },
      { text: 'Lists manual editing of the tracer lines', sourceLabel: LISTING, sourceUrl: listingUrl('1140451547') },
      { text: 'Also lists a course database, GPS and scorecards; last updated 24 October 2026', sourceLabel: LISTING, sourceUrl: listingUrl('1140451547') },
    ],
  },
  {
    name: 'The Golf Tracer',
    maker: 'Swing By Swing Golf, LLC',
    facts: [
      { text: 'Free, with in-app purchases', sourceLabel: LISTING, sourceUrl: listingUrl('1330717186') },
      { text: 'You trace the flight yourself and can add yardage to the video', sourceLabel: LISTING, sourceUrl: listingUrl('1330717186') },
      { text: 'Last updated 23 September 2020; 3.8 stars from 1,635 ratings', sourceLabel: LISTING, sourceUrl: listingUrl('1330717186') },
    ],
  },
];

export const GOLF_GPS_COMPARISON: readonly ComparedApp[] = [
  {
    name: 'SundayStroke Golf GPS',
    maker: 'Ivkin Labs LLC (us)',
    facts: [
      { text: 'Free GPS yardages, scorecard and round history, with no ads', sourceLabel: 'Our Golf GPS page', sourceUrl: sitePath('/golf-gps/') },
      { text: 'Golf GPS Pro adds an Estimated Handicap, stats and shot tracking', sourceLabel: 'Our Golf GPS page', sourceUrl: sitePath('/golf-gps/') },
      { text: 'Free, with Golf GPS Pro in-app; no ratings on the US App Store yet', sourceLabel: LISTING, sourceUrl: listingUrl('6762449303') },
    ],
  },
  {
    name: '18Birdies',
    maker: '18Birdies LLC',
    facts: [
      { text: 'Free GPS yardages; keep score and follow your handicap; Premium is an optional subscription with a free trial for eligible users', sourceLabel: LISTING, sourceUrl: listingUrl('892700751') },
      { text: 'Apple Watch app; adds swing analysis', sourceLabel: LISTING, sourceUrl: listingUrl('892700751') },
      { text: '4.9 stars from 306,033 ratings', sourceLabel: LISTING, sourceUrl: listingUrl('892700751') },
    ],
  },
  {
    name: 'Golfshot',
    maker: 'Golf Genius Mobile, LLC',
    facts: [
      { text: 'Free includes GPS distances, shot tracking, scoring and statistics; Pro membership has a 7-day free trial', sourceLabel: LISTING, sourceUrl: listingUrl('622851626') },
      { text: 'Apple Watch app', sourceLabel: LISTING, sourceUrl: listingUrl('622851626') },
      { text: '4.8 stars from 78,688 ratings', sourceLabel: LISTING, sourceUrl: listingUrl('622851626') },
    ],
  },
  {
    name: 'Hole19',
    maker: 'Stat Track Technologies',
    facts: [
      { text: 'Free GPS distances to the front, center and back of the green; Premium has a 14-day free trial', sourceLabel: LISTING, sourceUrl: listingUrl('794462227') },
      { text: 'iPhone and Apple Watch', sourceLabel: LISTING, sourceUrl: listingUrl('794462227') },
      { text: '4.7 stars from 22,458 ratings', sourceLabel: LISTING, sourceUrl: listingUrl('794462227') },
    ],
  },
];
