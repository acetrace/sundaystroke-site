import { describe, expect, it } from 'vitest';
import { appStoreUrl, smartAppBannerContent } from './campaigns';

describe('appStoreUrl', () => {
  it('leaves pt out while the provider token is empty', () => {
    expect(appStoreUrl({ app: 'tracer', campaign: 'web-tracer-howto' }, '')).toBe(
      'https://apps.apple.com/app/apple-store/id6821717424?ct=web-tracer-howto&mt=8',
    );
  });

  it('puts the provider token first once it is set', () => {
    expect(appStoreUrl({ app: 'golfGps', campaign: 'web-gps-handicap' }, '123456')).toBe(
      'https://apps.apple.com/app/apple-store/id6762449303?pt=123456&ct=web-gps-handicap&mt=8',
    );
  });
});

describe('smartAppBannerContent', () => {
  it('carries only the campaign while the provider token is empty', () => {
    expect(smartAppBannerContent({ app: 'golfGps', campaign: 'web-gps-home' }, '')).toBe(
      'app-id=6762449303, affiliate-data=ct=web-gps-home',
    );
  });

  it('carries the provider token and the campaign once the token is set', () => {
    expect(smartAppBannerContent({ app: 'tracer', campaign: 'web-tracer-home' }, '123456')).toBe(
      'app-id=6821717424, affiliate-data=pt=123456&ct=web-tracer-home',
    );
  });
});
