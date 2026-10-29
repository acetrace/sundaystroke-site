import { sitePath } from '../utils/paths';
import { APP_STORE_PROVIDER_TOKEN, appStoreUrl } from './campaigns';
import type { ComparisonTableData, SourcedCell } from '../types/comparison';

export const COMPARISONS_CHECKED_ON: string = '29 October 2026';
export const APP_STORE_SEARCH_API_URL: string = 'https://performance-partners.apple.com/search-api';

export function listingUrl(appStoreId: string): string {
  return `https://apps.apple.com/us/app/id${appStoreId}`;
}

const LISTING: string = 'listing';

function ours(text: string, sourceLabel: string, sourceUrl: string): SourcedCell {
  return { text, ours: true, sourceLabel, sourceUrl };
}

function theirs(text: string, appStoreId: string): SourcedCell {
  return { text, ours: false, sourceLabel: LISTING, sourceUrl: listingUrl(appStoreId) };
}

const NOT_IN_LISTING: string = 'Not mentioned in its listing';

export const TRACER_LISTING_URL: string = appStoreUrl({ app: 'tracer', campaign: 'web-compare' }, APP_STORE_PROVIDER_TOKEN);
export const GOLF_GPS_LISTING_URL: string = appStoreUrl({ app: 'golfGps', campaign: 'web-compare' }, APP_STORE_PROVIDER_TOKEN);

const TRACER_PAGE: string = sitePath('/tracer/');
const DISC_PAGE: string = sitePath('/tracer/disc-golf/');

export const TRACER_RIVALS = {
  visualVertigo: '1140451547',
  golfTracer: '1330717186',
  trackYourShots: '6754361351',
  v1Golf: '349715369',
  smoothSwing: '1514586439',
} as const;

export const TRACER_ADVANTAGES: readonly string[] = [
  'Traces disc golf as well as golf: Free curve follows a disc on its own once you select it at release. None of the other listings we checked mention discs.',
  'Free to download and free to try, with automatic golf ball tracking included. Visual Vertigo charges up front, and V1 Golf keeps ball tracing for its Advanced plans.',
  'No tripod needed: stabilization keeps the line on the flight when you film handheld. None of the other listings mention stabilization.',
  'You can fix the line by hand after the automatic pass: move the landing point and the arc, or trim the frames where tracking picked up something else.',
];

export const TRACER_TABLE: ComparisonTableData = {
  apps: ['SundayStroke Tracer', "Visual Vertigo's tracer app", 'The Golf Tracer', 'Golf Tracer – Track Your Shots', 'V1 Golf'],
  rows: [
    {
      feature: 'Disc golf flights',
      cells: [
        ours('Yes, and it follows the disc after you select it', 'our disc golf page', DISC_PAGE),
        theirs(NOT_IN_LISTING, TRACER_RIVALS.visualVertigo),
        theirs(NOT_IN_LISTING, TRACER_RIVALS.golfTracer),
        theirs(NOT_IN_LISTING, TRACER_RIVALS.trackYourShots),
        theirs(NOT_IN_LISTING, TRACER_RIVALS.v1Golf),
      ],
    },
    {
      feature: 'Automatic golf ball tracking',
      cells: [
        ours('Yes, free to try', 'our Tracer page', TRACER_PAGE),
        theirs('Yes, in a paid app', TRACER_RIVALS.visualVertigo),
        theirs('No, you draw the line by hand', TRACER_RIVALS.golfTracer),
        theirs('Detects the start point and impact', TRACER_RIVALS.trackYourShots),
        theirs('Ball tracing in Advanced plans only', TRACER_RIVALS.v1Golf),
      ],
    },
    {
      feature: 'Cost to start',
      cells: [
        ours('Free download, Premium optional', LISTING, TRACER_LISTING_URL),
        theirs('$5.99 up front', TRACER_RIVALS.visualVertigo),
        theirs('Free download, subscriptions from $0.99 a month', TRACER_RIVALS.golfTracer),
        theirs('Free download, Pro $3.99 or $19.99', TRACER_RIVALS.trackYourShots),
        theirs('Plus from $9.99 a month; Advanced $14.99 a month', TRACER_RIVALS.v1Golf),
      ],
    },
    {
      feature: 'Steadies handheld footage',
      cells: [
        ours('Yes: Smart, Fast or Off', 'our Tracer page', TRACER_PAGE),
        theirs(NOT_IN_LISTING, TRACER_RIVALS.visualVertigo),
        theirs(NOT_IN_LISTING, TRACER_RIVALS.golfTracer),
        theirs(NOT_IN_LISTING, TRACER_RIVALS.trackYourShots),
        theirs(NOT_IN_LISTING, TRACER_RIVALS.v1Golf),
      ],
    },
  ],
};

const GOLF_GPS_PAGE: string = sitePath('/golf-gps/');

export const GPS_RIVALS = {
  birdies: '892700751',
  golfshot: '622851626',
  hole19: '794462227',
  swingU: '332116103',
  golfLogix: '322399059',
} as const;

export const SWINGU_PRICING_URL: string = 'https://help.swingu.com/article/24-how-much-does-swingu-cost';

export const GOLF_GPS_ADVANTAGES: readonly string[] = [
  'No ads, even on the free plan. Golfshot and Hole19 keep ad-free play for their paid tiers, and SwingU and GolfLogix show ads on free too.',
  'Front, center and back of the green for free. Golfshot lists front, center and back yardages as a Pro feature.',
  'A movable Target on the free plan: drag it on the map to see how far you are from it and how far it leaves you from the green.',
  'The smallest download we checked: 52 MB, where the others take 173 to 559 MB of your phone.',
];

export const GOLF_GPS_TABLE: ComparisonTableData = {
  apps: ['SundayStroke Golf GPS', '18Birdies', 'Golfshot', 'Hole19', 'SwingU', 'GolfLogix'],
  rows: [
    {
      feature: 'Ads on the free plan',
      cells: [
        ours('None', 'our Golf GPS page', GOLF_GPS_PAGE),
        theirs('Not stated in its listing', GPS_RIVALS.birdies),
        theirs('Yes; ad-free is a Pro feature', GPS_RIVALS.golfshot),
        theirs('Yes; ad-free is a Premium feature', GPS_RIVALS.hole19),
        theirs('Yes', GPS_RIVALS.swingU),
        theirs('Yes', GPS_RIVALS.golfLogix),
      ],
    },
    {
      feature: 'Front, center and back of the green',
      cells: [
        ours('Free', 'our Golf GPS page', GOLF_GPS_PAGE),
        theirs('Free distances to greens', GPS_RIVALS.birdies),
        theirs('Pro feature', GPS_RIVALS.golfshot),
        theirs('Free', GPS_RIVALS.hole19),
        theirs('Not stated in its listing', GPS_RIVALS.swingU),
        theirs('Not stated in its listing', GPS_RIVALS.golfLogix),
      ],
    },
    {
      feature: 'Download size',
      cells: [
        ours('52 MB', LISTING, GOLF_GPS_LISTING_URL),
        theirs('311 MB', GPS_RIVALS.birdies),
        theirs('220 MB', GPS_RIVALS.golfshot),
        theirs('246 MB', GPS_RIVALS.hole19),
        theirs('173 MB', GPS_RIVALS.swingU),
        theirs('559 MB', GPS_RIVALS.golfLogix),
      ],
    },
  ],
};
