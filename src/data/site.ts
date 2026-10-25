import type { NavLink } from '../types/navigation';
import { sitePath } from '../utils/paths';

export const APP_NAME: string = 'SundayStroke Tracer';
export const PUBLISHER: string = 'Ivkin Labs LLC';
export const APP_STORE_URL: string = 'https://apps.apple.com/app/id6821717424';
export const APPLE_EULA_URL: string = 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/';
export const APPLE_SUBSCRIPTIONS_HELP_URL: string = 'https://support.apple.com/en-us/118428';
export const SUPPORT_EMAIL: string = 'support@sundaystroke.com';
export const PRIVACY_EMAIL: string = 'privacy@sundaystroke.com';
export const LEGAL_EFFECTIVE_DATE: string = '25 October 2026';

export const HELP_LINKS: readonly NavLink[] = [
  { href: sitePath('/support'), label: 'Support' },
  { href: sitePath('/manual-tracing'), label: 'Manual tracing' },
  { href: sitePath('/community'), label: 'Community' },
];

export const LEGAL_LINKS: readonly NavLink[] = [
  { href: sitePath('/privacy'), label: 'Privacy policy' },
  { href: sitePath('/terms'), label: 'Terms of use' },
];

export const NAV_LINKS: readonly NavLink[] = [...HELP_LINKS, ...LEGAL_LINKS];
