import type { NavLink } from '../types/navigation';
import { sitePath } from '../utils/paths';

export const APP_NAME: string = 'SundayStroke Tracer';
export const PUBLISHER: string = 'Ivkin Labs LLC';
export const APPLE_EULA_URL: string = 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/';
export const APPLE_SUBSCRIPTIONS_HELP_URL: string = 'https://support.apple.com/en-us/118428';
export const SUPPORT_EMAIL: string = 'support@sundaystroke.com';
export const PRIVACY_EMAIL: string = 'privacy@sundaystroke.com';
export const LEGAL_EFFECTIVE_DATE: string = '25 October 2026';
export const GOLF_GPS_SITE_URL: string = 'https://golfgps.ai';
export const AI_ASSISTED_NOTE: string = 'AI-assisted, checked by a person';
export const CONTENT_BYLINE: string = 'The SundayStroke team';

export const HELP_LINKS: readonly NavLink[] = [
  { href: sitePath('/support'), label: 'Support' },
  { href: sitePath('/manual-tracing'), label: 'Manual tracing' },
  { href: sitePath('/community'), label: 'Community' },
];

export const LEGAL_LINKS: readonly NavLink[] = [
  { href: sitePath('/privacy'), label: 'Privacy policy' },
  { href: sitePath('/terms'), label: 'Terms of use' },
];

export const APP_LINKS: readonly NavLink[] = [
  { href: sitePath('/tracer/'), label: 'Tracer' },
  { href: sitePath('/golf-gps/'), label: 'Golf GPS' },
];

export const CONTENT_LINKS: readonly NavLink[] = [
  { href: sitePath('/learn/'), label: 'Learn' },
  { href: sitePath('/golf-handicap/'), label: 'Handicap' },
  { href: sitePath('/sunday/'), label: 'Sunday' },
];

export const MORE_LINKS: readonly NavLink[] = [
  { href: sitePath('/compare/tracer/'), label: 'Compare tracer apps' },
  { href: sitePath('/compare/golf-gps/'), label: 'Compare golf GPS apps' },
  { href: sitePath('/golf-handicap/calculator/'), label: 'Handicap calculator' },
];

export const NAV_LINKS: readonly NavLink[] = [...APP_LINKS, ...CONTENT_LINKS, { href: sitePath('/support'), label: 'Support' }];

export const FROZEN_PATHS: readonly string[] = ['/privacy', '/terms', '/support', '/community', '/manual-tracing'];
