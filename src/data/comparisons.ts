import { sitePath } from '../utils/paths';
import type { ComparisonTableData, SourcedCell } from '../types/comparison';

export const COMPARISONS_CHECKED_ON: string = '28 October 2026';
export const APP_STORE_SEARCH_API_URL: string = 'https://performance-partners.apple.com/search-api';

function listingUrl(appStoreId: string): string {
  return `https://itunes.apple.com/lookup?id=${appStoreId}&country=us`;
}

const LISTING: string = 'listing';

function ours(text: string, sourceLabel: string, sourceUrl: string): SourcedCell {
  return { text, ours: true, sourceLabel, sourceUrl };
}

function theirs(text: string, appStoreId: string): SourcedCell {
  return { text, ours: false, sourceLabel: LISTING, sourceUrl: listingUrl(appStoreId) };
}

const TRACER_PAGE: string = sitePath('/tracer/');
const VISUAL_VERTIGO: string = '1140451547';
const GOLF_TRACER: string = '1330717186';

export const TRACER_ADVANTAGES: readonly string[] = [
  'The only one of the three made for disc golf as well as golf.',
  "Free to try, where Visual Vertigo's app is paid up front.",
  'Follows a golf ball on its own once you select it, where The Golf Tracer leaves the whole line to you.',
];

export const TRACER_TABLE: ComparisonTableData = {
  apps: ['SundayStroke Tracer', "Visual Vertigo's tracer app", 'The Golf Tracer'],
  rows: [
    {
      feature: 'Disc golf',
      cells: [
        ours('Golf and disc golf', 'our Tracer page', TRACER_PAGE),
        theirs('Golf only', VISUAL_VERTIGO),
        theirs('Golf only', GOLF_TRACER),
      ],
    },
    {
      feature: 'To start',
      cells: [
        ours('Free to try', 'our Tracer page', TRACER_PAGE),
        theirs('Paid up front', VISUAL_VERTIGO),
        theirs('Free', GOLF_TRACER),
      ],
    },
    {
      feature: 'Follows the golf ball on its own',
      cells: [
        ours('Yes', 'our tutorials', sitePath('/learn/')),
        theirs('Yes', VISUAL_VERTIGO),
        theirs('No, you trace it by hand', GOLF_TRACER),
      ],
    },
  ],
};

const GOLF_GPS_PAGE: string = sitePath('/golf-gps/');
const GOLF_GPS: string = '6762449303';
const BIRDIES: string = '892700751';
const GOLFSHOT: string = '622851626';
const HOLE19: string = '794462227';

export const GOLF_GPS_ADVANTAGES: readonly string[] = [
  'No ads, even on the free plan. Hole19 keeps its ad-free experience for Premium.',
  'A fifth of the download: 52 MB, where the others take 220 to 311 MB of your phone.',
  'Runs on older iPhones too: iOS 15.1 and later, where the others need iOS 16, 17 or 18.',
  'Free yardages to the green, a scorecard that keeps itself and every round saved.',
];

export const GOLF_GPS_TABLE: ComparisonTableData = {
  apps: ['SundayStroke Golf GPS', '18Birdies', 'Golfshot', 'Hole19'],
  rows: [
    {
      feature: 'Ads on the free plan',
      cells: [
        ours('None', 'our Golf GPS page', GOLF_GPS_PAGE),
        theirs('Not stated', BIRDIES),
        theirs('Not stated', GOLFSHOT),
        theirs('Ad-free only with Premium', HOLE19),
      ],
    },
    {
      feature: 'Download size',
      cells: [
        ours('52 MB', LISTING, listingUrl(GOLF_GPS)),
        theirs('311 MB', BIRDIES),
        theirs('220 MB', GOLFSHOT),
        theirs('244 MB', HOLE19),
      ],
    },
    {
      feature: 'Oldest iOS it runs on',
      cells: [
        ours('iOS 15.1', LISTING, listingUrl(GOLF_GPS)),
        theirs('iOS 16', BIRDIES),
        theirs('iOS 17', GOLFSHOT),
        theirs('iOS 18', HOLE19),
      ],
    },
  ],
};
