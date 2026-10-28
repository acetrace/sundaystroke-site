import type { AppKey, AppListing, Campaign, StoreTarget } from '../types/apps';

export const APP_STORE_PROVIDER_TOKEN: string = '';

export const APPS: Readonly<Record<AppKey, AppListing>> = {
  tracer: { name: 'SundayStroke Tracer', appStoreId: '6821717424' },
  golfGps: { name: 'SundayStroke Golf GPS', appStoreId: '6762449303' },
};

function campaignParams(campaign: Campaign, providerToken: string): URLSearchParams {
  const params = new URLSearchParams();
  if (providerToken !== '') params.set('pt', providerToken);
  params.set('ct', campaign);
  return params;
}

export function appStoreUrl(target: StoreTarget, providerToken: string): string {
  const params = campaignParams(target.campaign, providerToken);
  params.set('mt', '8');
  return `https://apps.apple.com/app/apple-store/id${APPS[target.app].appStoreId}?${params.toString()}`;
}

export function smartAppBannerContent(target: StoreTarget, providerToken: string): string {
  return `app-id=${APPS[target.app].appStoreId}, affiliate-data=${campaignParams(target.campaign, providerToken).toString()}`;
}
