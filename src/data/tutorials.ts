import { sitePath } from '../utils/paths';
import type { Tutorial, TutorialSetting } from '../types/tutorial';

export const TUTORIALS_PUBLISHED: string = '28 October 2026';

const LOOK_SETTINGS: readonly TutorialSetting[] = [
  { name: 'Stabilization', value: 'Smart (try Fast if the line jumps; turn it off if the camera was still)' },
  { name: 'Render 3D line', value: 'On' },
  { name: 'Line width', value: '60' },
];

export const TUTORIALS: readonly Tutorial[] = [
  {
    slug: 'film-a-golf-ball-flight',
    title: 'Film a golf ball flight and trace it',
    description: 'How to film a golf swing on iPhone and let Tracer follow the ball through the air.',
    intro: 'Tracer follows a golf ball on its own once you show it where the flight starts. Here is a real swing from the app, before and after.',
    before: { src: '/media/learn/golf-original.mp4', poster: '/media/learn/golf-original.jpg', label: 'Before: the video as filmed' },
    after: { src: '/media/learn/golf-result.mp4', poster: '/media/learn/golf-result.jpg', label: 'After: the traced flight' },
    steps: [
      'Film from behind the golfer, phone held still and upright, with the whole flight in the frame.',
      'Open Tracer, tap Trace golf and pick your video.',
      'Scroll the timeline to the moment the ball leaves the club and select the golf ball with the cursor.',
      'Let Tracer follow the ball, then move the landing point or the arc by hand if they need it.',
      'Pick the look of the line and save the video to Photos.',
    ],
    settings: [{ name: 'Mode', value: 'Trace golf' }, { name: 'Start of the flight', value: 'The golf ball, selected with the cursor' }, ...LOOK_SETTINGS],
    related: null,
  },
  {
    slug: 'film-a-disc-flight',
    title: 'Film a disc flight and trace it',
    description: 'How to film a disc golf throw on iPhone and draw the flight of the disc with Tracer.',
    intro: 'Discs use the Free curve mode. Tracer can follow a disc on its own, and you can add key points by hand wherever it needs help. Here is a real throw from the app, before and after.',
    before: { src: '/media/learn/disc-golf-original.mp4', poster: '/media/learn/disc-golf-original.jpg', label: 'Before: the video as filmed' },
    after: { src: '/media/learn/disc-golf-result.mp4', poster: '/media/learn/disc-golf-result.jpg', label: 'After: the traced flight' },
    steps: [
      'Film from the side or from behind, phone held still, with the whole flight in the frame.',
      'Open Tracer, tap Free curve and pick your video.',
      'Scroll the timeline to the release and select the disc with the cursor.',
      'Let Tracer follow the disc, then add or move key points along the flight where the line drifts.',
      'Pick the look of the line and save the video to Photos.',
    ],
    settings: [{ name: 'Mode', value: 'Free curve' }, { name: 'Start of the flight', value: 'The disc, selected with the cursor' }, ...LOOK_SETTINGS],
    related: null,
  },
  {
    slug: 'fix-a-trace-by-hand',
    title: 'Fix a trace by hand',
    description: 'When automatic tracking misses, add key points along the flight yourself and Tracer draws the line through them.',
    intro: 'Sometimes the ball or disc is too small, too fast or lost against the sky. Then you draw the flight yourself: a few key points are enough.',
    before: { src: '/media/learn/disc-golf-editing.mp4', poster: '/media/learn/disc-golf-editing.jpg', label: 'Before: adding key points by hand' },
    after: { src: '/media/learn/disc-golf-result.mp4', poster: '/media/learn/disc-golf-result.jpg', label: 'After: the finished line' },
    steps: [
      'Open your video in Free curve.',
      'Scroll the timeline and move the cursor onto the ball or disc to add a key point.',
      'Add points at the start, the highest point and the landing, then a few in between where the flight bends.',
      'If tracking picked up something that isn\'t the ball or disc, resize the track in the timeline to leave it out.',
      'Check the line from start to finish, then save the video to Photos.',
    ],
    settings: [{ name: 'Mode', value: 'Free curve' }, { name: 'Key points', value: 'Added by hand on the timeline' }, ...LOOK_SETTINGS],
    related: { lead: 'For every button and gesture, see the full', href: sitePath('/manual-tracing'), label: 'manual tracing guide' },
  },
];
