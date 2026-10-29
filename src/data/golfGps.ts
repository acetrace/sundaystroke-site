import type { MediaItem, PlanColumn } from '../types/feature';
import type {
  GolfGpsFaqItem,
  GolfGpsScoredHole,
  GolfGpsScoreSummary,
  GolfGpsStep,
  GolfGpsTableData,
} from '../types/golfGps';

export const RULE_21_URL: string = 'https://www.randa.org/rog/the-rules-of-golf/rule-21';

export const GOLF_GPS_PLANS: readonly PlanColumn[] = [
  {
    name: 'Free',
    items: [
      'Yardages to the front, center and back of the green on a satellite map of the hole',
      'A movable Target with the distance to it and from it to the green',
      'Yards or meters',
      'Nearby courses found for you; recent courses work offline',
      'A weak-GPS warning',
      'Tee selection with the course rating and slope',
      'A scorecard with totals and score against par',
      'Every round saved to your history, shareable as an image',
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
  { src: '/media/golf-gps/03-map-distance.jpg', alt: 'Front, center and back yardages on a satellite map of the hole', caption: 'Yardages' },
  { src: '/media/golf-gps/04-round-summary.jpg', alt: 'A finished round on the scorecard', caption: 'Scorecard' },
  { src: '/media/golf-gps/06-round-history.jpg', alt: 'Saved rounds in the round history', caption: 'History' },
  { src: '/media/golf-gps/07-map-shots-hole8.jpg', alt: 'Tracked shots drawn on the hole with how far each went', caption: 'Shot tracking' },
];

export const GOLF_GPS_HANDICAP_SCREEN: MediaItem = {
  src: '/media/golf-gps/05-stats.jpg',
  alt: 'The estimated handicap and its trend across rounds',
  caption: 'Estimated handicap',
};

export const GOLF_GPS_YARDAGE_EXAMPLE: GolfGpsTableData = {
  caption: 'An example approach (made-up numbers)',
  columns: ['Point on the green', 'Yardage', 'When to use it'],
  rows: [
    ['Front', '142', 'The carry to clear trouble short'],
    ['Center', '156', 'Your everyday number'],
    ['Back', '170', 'The most you can hit without going over'],
  ],
};

export const GOLF_GPS_ROUND_STEPS: readonly GolfGpsStep[] = [
  {
    title: 'Pick your course',
    body: 'Open the app at the course. Courses near you show up on their own; tap yours. Recent courses are listed too.',
  },
  {
    title: 'Choose your tee',
    body: 'Pick the tee you are playing from. It sets the course rating and slope for the round, which the estimated handicap in Golf GPS Pro uses later.',
  },
  {
    title: 'Read the hole',
    body: 'Each hole opens on a satellite map with your front, center and back yardages. Check where the trouble is before you pull a club.',
  },
  {
    title: 'Plan a layup with the Target',
    body: 'Drag the Target to where you want the ball to finish. The map shows your distance to that spot and the distance from it to the green, so you can leave yourself a favorite wedge.',
  },
  {
    title: 'Enter your score',
    body: 'When you hole out, tap plus or minus to set your strokes for the hole. Your total and score against par update straight away.',
  },
  {
    title: 'Move to the next hole',
    body: 'Swipe to the next hole. When you finish, the round is saved to your history, ready to share.',
  },
];

export const GOLF_GPS_FAQ: readonly GolfGpsFaqItem[] = [
  {
    question: 'Does the center yardage mean the distance to the pin?',
    answer: 'No. Center is the middle of the green, not where today’s flag is cut. If the flag is at the back, play nearer the back number; if it is at the front, nearer the front number.',
  },
  {
    question: 'Is Golf GPS free?',
    answer: 'Yes. Yardages, the Target, the scorecard, round history and sharing are free, with no ads. Golf GPS Pro adds the estimated handicap, stats and trends, and shot tracking.',
  },
  {
    question: 'Does it work without signal?',
    answer: 'Courses you played recently keep their data on your phone, so their maps and yardages still load when signal is weak. A course you have never opened needs a connection the first time.',
  },
  {
    question: 'How accurate are the yardages?',
    answer: 'They depend on your phone’s GPS fix. When the fix is weak the app says so and shows roughly how far off the distances may be, so you know when to trust them. Moving into open sky usually helps.',
  },
];

export const SCORECARD_EXAMPLE_HOLES: readonly GolfGpsScoredHole[] = [
  { hole: 1, par: 4, strokes: 5 },
  { hole: 2, par: 3, strokes: 3 },
  { hole: 3, par: 5, strokes: 6 },
];

export function summarizeScore(holes: readonly GolfGpsScoredHole[]): GolfGpsScoreSummary {
  const par = holes.reduce((sum, hole) => sum + hole.par, 0);
  const strokes = holes.reduce((sum, hole) => sum + hole.strokes, 0);
  return { par, strokes, toPar: strokes - par };
}

export function formatToPar(toPar: number): string {
  if (toPar === 0) return 'E';
  return toPar > 0 ? `+${String(toPar)}` : String(toPar);
}

export const SCORE_NAMES: GolfGpsTableData = {
  caption: 'What each score is called',
  columns: ['Name', 'Strokes against par', 'On a par 4'],
  rows: [
    ['Albatross', '3 under', '1'],
    ['Eagle', '2 under', '2'],
    ['Birdie', '1 under', '3'],
    ['Par', 'Level', '4'],
    ['Bogey', '1 over', '5'],
    ['Double bogey', '2 over', '6'],
    ['Triple bogey', '3 over', '7'],
  ],
};

export const STABLEFORD_POINTS: GolfGpsTableData = {
  caption: 'Stableford points for each net score',
  columns: ['Net score on the hole', 'Points'],
  rows: [
    ['Birdie', '3'],
    ['Par', '2'],
    ['Bogey', '1'],
    ['Double bogey or worse', '0'],
  ],
};

export const SCORECARD_FAQ: readonly GolfGpsFaqItem[] = [
  {
    question: 'Does the scorecard count strokes automatically?',
    answer: 'No. You enter the score for each hole. The app updates your totals and score against par and saves the round.',
  },
  {
    question: 'Can I fix a score I entered wrong?',
    answer: 'Yes. Swipe back to the hole and tap plus or minus until the strokes are right. The totals follow.',
  },
  {
    question: 'Is the scorecard free?',
    answer: 'Yes. The scorecard, your round history and sharing are free, with no ads.',
  },
  {
    question: 'Do penalty strokes go on the card separately?',
    answer: 'Add them to the hole’s strokes. A drive into the water that you then hole in five more strokes is a 7 on that hole: six strokes plus the one-stroke penalty.',
  },
];

export const HANDICAP_COMPARISON: GolfGpsTableData = {
  caption: 'Golf GPS estimate compared with an official Handicap Index',
  columns: ['', 'Golf GPS estimate', 'Official Handicap Index'],
  rows: [
    ['Who works it out', 'The app, from rounds you play with it', 'Your golf club or national federation'],
    ['Score differential', '(113 ÷ slope) × (adjusted score − course rating)', 'The same, plus a playing-conditions adjustment'],
    ['Highest score counted on a hole', 'Par + 5', 'Net double bogey'],
    ['Rounds needed to start', '3', 'Scores totalling 54 holes'],
    ['Which differentials count', 'Lowest 8 of your last 20, fewer while you have under 20', 'Lowest 8 of your last 20, fewer while you have under 20'],
    ['Nine-hole rounds', 'Doubled against half the course rating', 'Combined with an expected score for the other nine'],
    ['Day’s playing conditions', 'Not included', 'Adjusts differentials from −1.0 to +3.0'],
    ['Limits on how fast it rises', 'Not included', 'Soft and hard caps'],
    ['Cut after an exceptional round', 'Not included', 'Yes'],
    ['Highest possible value', '54.0', '54.0'],
    ['Accepted for competitions', 'No', 'Yes'],
  ],
};

export const HANDICAP_FAQ: readonly GolfGpsFaqItem[] = [
  {
    question: 'Can I use this as my official Handicap Index?',
    answer: 'No. Golf GPS gives you an estimate for following your own game. For an official Handicap Index, join a golf club or your national golf federation and post your scores there.',
  },
  {
    question: 'How many rounds do I need?',
    answer: 'Three. After your third saved round with Golf GPS Pro the estimate appears, and it settles as you add more, up to the lowest 8 of your last 20.',
  },
  {
    question: 'Why did my estimate not change after a bad round?',
    answer: 'Only your lowest differentials count. Once you have a few rounds, a high score usually sits outside the ones that are used, so the number holds.',
  },
  {
    question: 'Why is my estimate different from my club handicap?',
    answer: 'Your club counts rounds you did not play with the app, adjusts for the day’s conditions and caps how fast an index can rise. The app caps holes at par + 5 instead of net double bogey. Those differences can move the number a few strokes.',
  },
  {
    question: 'Do nine-hole rounds count?',
    answer: 'Yes. A nine-hole round is doubled against half the course rating, which is simpler than how official systems handle nine holes.',
  },
];

export const HANDICAP_STEPS: readonly GolfGpsStep[] = [
  {
    title: 'Pick the tee you actually play',
    body: 'The tee sets the course rating and slope. Playing the white tees with the blue tees selected makes every round look better or worse than it was.',
  },
  {
    title: 'Enter every hole',
    body: 'A round counts when you score the full front nine, back nine or all 18 holes. Enter each hole as you go rather than guessing at the end.',
  },
  {
    title: 'Keep your bad rounds too',
    body: 'Only the lowest differentials count, so a rough day rarely moves the estimate. Leaving rounds out only makes the trend less honest.',
  },
  {
    title: 'Play at least three rounds',
    body: 'The estimate starts after three rounds and gets steadier with every round up to twenty.',
  },
];
