import type { MediaItem, PlanColumn } from '../types/feature';

export const GOLF_GPS_PLANS: readonly PlanColumn[] = [
  {
    name: 'Free',
    items: [
      'GPS yardages to the green on a satellite map of the hole',
      'A scorecard that keeps itself, hole by hole',
      'Every round saved to your history',
      'Share a finished round as an image',
      'Golf courses near you',
      'No ads',
    ],
  },
  {
    name: 'Golf GPS Pro',
    items: [
      'Your estimated handicap and its trend',
      'Stats and trends across your rounds',
      'Shot tracking: mark each shot on the map and see how far it went',
      'Your average and longest tracked shot',
    ],
  },
];

export const GOLF_GPS_SCREENS: readonly MediaItem[] = [
  { src: '/media/golf-gps/03-map-distance.jpg', alt: 'Yardages to the green on a satellite map of the hole', caption: 'Yardages' },
  { src: '/media/golf-gps/04-round-summary.jpg', alt: 'A finished round on the scorecard', caption: 'Scorecard' },
  { src: '/media/golf-gps/01-home.jpg', alt: 'The home screen with the Estimated Handicap', caption: 'Handicap' },
  { src: '/media/golf-gps/05-stats.jpg', alt: 'Stats across rounds', caption: 'Stats' },
];
