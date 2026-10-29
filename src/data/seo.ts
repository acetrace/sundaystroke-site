import type { AppKey } from '../types/apps';
import type { AppEntity, SocialImage } from '../types/seo';

export const TRACER_IMAGE: SocialImage = {
  path: '/media/learn/golf-result.jpg',
  alt: 'A golf swing with the ball flight drawn as a bright line by SundayStroke Tracer',
  width: 720,
  height: 900,
};

export const DISC_IMAGE: SocialImage = {
  path: '/media/learn/disc-golf-result.jpg',
  alt: 'A disc golf throw with the flight of the disc drawn by SundayStroke Tracer',
  width: 716,
  height: 1232,
};

export const GOLF_GPS_IMAGE: SocialImage = {
  path: '/media/golf-gps/03-map-distance.jpg',
  alt: 'SundayStroke Golf GPS showing yardages to the green on a satellite map of the hole',
  width: 600,
  height: 1300,
};

export const DEFAULT_IMAGE: SocialImage = TRACER_IMAGE;

export const PAGE_IMAGES: Readonly<Record<string, SocialImage>> = {
  '/tracer/disc-golf/': DISC_IMAGE,
  '/compare/golf-gps/': GOLF_GPS_IMAGE,
  '/golf-handicap/': GOLF_GPS_IMAGE,
  '/golf-handicap/calculator/': GOLF_GPS_IMAGE,
};

export const APP_IMAGES: Readonly<Record<AppKey, SocialImage>> = {
  tracer: TRACER_IMAGE,
  golfGps: GOLF_GPS_IMAGE,
};

export const APP_ENTITIES: Readonly<Record<AppKey, AppEntity>> = {
  tracer: {
    name: 'SundayStroke Tracer',
    description: 'Draws the flight of a golf ball or disc onto the videos you film on iPhone, with automatic golf ball tracking and a free curve mode for discs and putts.',
    category: 'MultimediaApplication',
    pagePath: '/tracer/',
    image: TRACER_IMAGE,
  },
  golfGps: {
    name: 'SundayStroke Golf GPS',
    description: 'Free GPS yardages to the front, center and back of the green, a scorecard and every round saved. Golf GPS Pro adds an estimated handicap, stats and shot tracking.',
    category: 'SportsApplication',
    pagePath: '/golf-gps/',
    image: GOLF_GPS_IMAGE,
  },
};

export const CRUMB_LABELS: Readonly<Record<string, string>> = {
  '/tracer/': 'Tracer',
  '/tracer/disc-golf/': 'Disc golf',
  '/golf-gps/': 'Golf GPS',
  '/golf-gps/scorecard/': 'Scorecard',
  '/golf-gps/handicap/': 'Handicap tracker',
  '/learn/': 'Learn',
  '/golf-handicap/': 'Golf handicap',
  '/golf-handicap/calculator/': 'Calculator',
  '/compare/tracer/': 'Tracer apps compared',
  '/compare/golf-gps/': 'Golf GPS apps compared',
  '/sunday/': 'The Sunday post',
};
