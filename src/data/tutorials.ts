import { sitePath } from '../utils/paths';
import type {
  Clip,
  LinkedBlock,
  ParagraphBlock,
  StepsBlock,
  SubheadingBlock,
  TipsBlock,
  Tutorial,
  TutorialCategory,
  TutorialCategoryGroup,
  TutorialLink,
  TutorialSetting,
} from '../types/tutorial';

export const TUTORIALS_PUBLISHED: string = '29 October 2026';

function p(text: string): ParagraphBlock {
  return { kind: 'paragraph', text };
}

function sub(text: string): SubheadingBlock {
  return { kind: 'subheading', text };
}

function steps(items: readonly string[]): StepsBlock {
  return { kind: 'steps', items };
}

function tips(items: readonly string[]): TipsBlock {
  return { kind: 'tips', items };
}

function linked(before: string, link: TutorialLink, after: string): LinkedBlock {
  return { kind: 'linked', before, link, after };
}

const TRACER_LINK: TutorialLink = { href: sitePath('/tracer/'), label: 'SundayStroke Tracer for golf' };
const DISC_LINK: TutorialLink = { href: sitePath('/tracer/disc-golf/'), label: 'SundayStroke Tracer for disc golf' };
const MANUAL_LINK: TutorialLink = { href: sitePath('/manual-tracing'), label: 'manual tracing reference' };
const GOLF_GPS_LINK: TutorialLink = { href: sitePath('/golf-gps/'), label: 'SundayStroke Golf GPS' };

const GOLF_AFTER: Clip = { src: '/media/learn/golf-result.mp4', poster: '/media/learn/golf-result.jpg', label: 'The traced ball flight' };
const DISC_AFTER: Clip = { src: '/media/learn/disc-golf-result.mp4', poster: '/media/learn/disc-golf-result.jpg', label: 'The traced disc flight' };
const DISC_EDITING: Clip = { src: '/media/learn/disc-golf-editing.mp4', poster: '/media/learn/disc-golf-editing.jpg', label: 'Editing: key points placed along a Free curve line' };

const STABILIZATION: TutorialSetting = {
  name: 'Stabilization',
  value: 'Smart',
  when: 'Start here for any handheld clip. Try Fast if the line still jumps when the camera moves, and Off if the phone sat on something solid.',
};
const RENDER_3D: TutorialSetting = {
  name: 'Render 3D line',
  value: 'On',
  when: 'Gives the line depth, so it reads as a flight going away from the camera rather than a flat stroke on the picture.',
};
const LINE_WIDTH: TutorialSetting = {
  name: 'Line width',
  value: '60, as a starting point',
  when: 'A good middle value for a phone screen. Go thinner for a putt or a close-up, thicker for a long drive filmed from far away.',
};

export const TUTORIAL_GROUPS: readonly TutorialCategoryGroup[] = [
  {
    category: 'golf',
    heading: 'Golf: start with your first golf video',
    intro: 'Trace golf follows a golf ball on its own once you select it at the start of the flight. Start here if you have a swing on your phone.',
  },
  {
    category: 'disc-golf',
    heading: 'Disc golf: trace a disc flight',
    intro: 'Discs use Free curve. Select the disc at release and Tracer can follow it, then you move key points wherever the line needs help.',
  },
  {
    category: 'editing',
    heading: 'Editing: fix, label and finish a trace',
    intro: 'These guides work on a trace you have already made, in either mode: repair a line that drifts, add a distance label, and keep trees in front of the flight.',
  },
];

export const TUTORIALS: readonly Tutorial[] = [
  {
    slug: 'film-a-golf-ball-flight',
    category: 'golf',
    title: 'How to add a golf ball tracer to an iPhone video',
    pageTitle: 'How to Add a Golf Ball Tracer to iPhone Video · SundayStroke',
    description: 'Film a clear golf shot, select the ball, review automatic tracking and save the result. An iPhone tutorial with a real traced clip.',
    summary: 'Film a swing, select the ball in Trace golf, check the arc, save.',
    intro: [
      'A traced ball flight turns an ordinary range or course clip into something people stop scrolling for. With SundayStroke Tracer you do it on the phone you filmed with: select the ball once at the start of the flight and Tracer follows it through the air.',
      'This guide covers filming, the steps in the app, the line settings and the fixes when a trace goes wrong. The clip below is a real swing traced in the app.',
    ],
    hero: null,
    clips: [GOLF_AFTER],
    sections: [
      {
        heading: 'What you need before filming',
        blocks: [
          p('An iPhone with Tracer, a golfer and somewhere you can see the ball fly. No tripod: Tracer steadies the line when the camera moves. Wipe the lens first, because a sharp ball is the biggest help to automatic tracking.'),
        ],
      },
      {
        heading: 'Position the iPhone and keep the flight in frame',
        blocks: [
          sub('Choose a clear viewpoint and background'),
          p('Film from behind the golfer, looking down the target line. The ball climbs away from the camera and a draw or fade shows clearly.'),
          tips([
            'Stand about 3 to 4 meters (10 to 12 feet) behind the golfer and a little to the side, so the body does not hide the ball at impact.',
            'Hold the phone at hip to chest height; lower makes the flight look higher.',
            'Frame the golfer in the lower third of the picture and leave the top two thirds for sky and the flight.',
            'Look for a dark or busy background behind the first part of the flight: trees, a hill or a clubhouse. A white ball against a pale grey sky is the hardest thing to follow.',
            'Keep the sun behind you or to the side.',
          ]),
          sub('Camera settings that help'),
          tips([
            'Use the 1x lens. Zoom softens the ball and 0.5x makes it tiny.',
            'Touch and hold on the golfer before recording to lock focus and exposure (AE/AF Lock), so the camera does not refocus on the sky mid-swing.',
            'Normal video at 60 frames per second is a good default. Slo-mo at 120 or 240 gives sharper frames of a fast ball but plays slowly; you can change the slow part later in Photos.',
          ]),
          sub('Film handheld with controlled movement'),
          p('Start recording two or three seconds before the swing and keep filming until the ball lands or disappears. Hold still through impact, then follow the ball slowly if it leaves the frame. A smooth, slow pan is fine; a fast whip is what loses the ball.'),
        ],
      },
      {
        heading: 'Import the video and select the starting ball',
        blocks: [
          steps([
            'Open Tracer and tap Trace golf on the home screen.',
            'Pick your video from Photos.',
            'Scroll the timeline to the frame where the ball has just left the club. The ball should be clearly visible and separated from the clubhead.',
            'Zoom in with two fingers and move the cursor onto the golf ball to select it.',
            'Let Tracer follow the ball through the flight on its own.',
          ]),
          p('One or two frames after impact is the sweet spot; earlier, the cursor may land on the clubhead.'),
        ],
      },
      {
        heading: 'Review tracking and correct the arc',
        blocks: [
          p('Tap Preview and watch the line against the ball. Most clean clips need nothing more. When something is off:'),
          tips([
            'Landing point: scroll to the frame where the ball lands and move the landing point onto it.',
            'Arc: drag the diamond on the curve to make the flight higher, lower or more curved until the line sits on the ball.',
            'Wrong object: if tracking jumped to a bird or another ball, resize the track in the timeline to leave those frames out.',
          ]),
          linked('When tracking misses the ball completely, you can trace it by hand. The ', MANUAL_LINK, ' covers every control.'),
        ],
      },
      {
        heading: 'Choose the line style and export',
        blocks: [
          p('Pick a color or gradient, the width and the 3D look. Floodlit and white lines are free; Premium adds more styles, gradients and effects such as electricity, wave, tail length and landing effects.'),
          p('When it looks right, save the video to Photos and share it from there. Free saves carry a small watermark; Premium saves have none.'),
        ],
      },
    ],
    settings: [{ name: 'Mode', value: 'Trace golf', when: 'Any golf shot that flies through the air: drives, irons, wedges and chips.' }, STABILIZATION, RENDER_3D, LINE_WIDTH],
    troubleshooting: [
      {
        problem: 'The line drifts away from the ball',
        cause: 'The camera moved and the line did not move with it.',
        fix: 'Check stabilization in Settings. Smart suits most clips; try Fast for a lot of movement. Then move the landing point and the diamond to pull the arc back onto the ball.',
      },
      {
        problem: 'Tracking picks up the wrong object',
        cause: 'Another ball, a bird or a flag crossed the flight.',
        fix: 'Resize the track in the timeline so it ends before the wrong object appears, then set the landing point by hand.',
      },
      {
        problem: 'The ball is lost against the sky',
        cause: 'A white ball against a pale sky has almost no contrast.',
        fix: 'Set the landing point and shape the arc by hand for the part you cannot see. Next time, film with trees or a hill behind the early flight.',
      },
      {
        problem: 'The camera was shaky',
        cause: 'Fast, jerky movement blurs the ball across several frames.',
        fix: 'Stabilization handles normal hand movement. For a very shaky clip, trace the steady part and fix the rest with the landing point and arc.',
      },
    ],
    faqs: [
      { question: 'Must the camera be perfectly still?', answer: 'No. Stabilization supports handheld footage, but keeping the ball in view and avoiding sudden movement gives Tracer better footage to work with.' },
      { question: 'Can I trace a shot hit into a net or a simulator screen?', answer: 'Tracer needs to see the ball fly, so a net only gives it the first few feet. You can still draw a flight with the landing point and arc, but it is your picture of the shot, not the ball\'s real path.' },
      { question: 'Do I have to start again if the trace is wrong?', answer: 'No. Move the landing point, drag the diamond or trim the track first. Those three fixes repair most traces without redoing anything.' },
    ],
    relatedSlugs: ['trace-golf-video-without-tripod', 'fix-a-trace-by-hand', 'add-distance-label-to-golf-video'],
    productLink: TRACER_LINK,
  },
  {
    slug: 'film-a-disc-flight',
    category: 'disc-golf',
    title: 'How to trace a disc golf flight on iPhone',
    pageTitle: 'How to Trace a Disc Golf Flight on iPhone · SundayStroke',
    description: 'Film a disc golf throw and add a flight line with Free curve. Where to place points as the disc turns and fades, how to correct the path, and how to save the video.',
    summary: 'Free curve for discs: select at release, fix the turn and fade.',
    intro: [
      'A disc does not fly like a golf ball. It turns, glides, fades and sometimes skips, and that shape is exactly what makes a traced disc golf clip worth watching. SundayStroke Tracer handles discs in its Free curve mode: select the disc at release and Tracer can follow it, then you add or move key points wherever the line needs help.',
      'Below is a real traced throw, and where points do the most good as the flight changes direction.',
    ],
    hero: null,
    clips: [DISC_AFTER],
    sections: [
      {
        heading: 'Film the release and the complete disc flight',
        blocks: [
          p('The trace can only be as good as what the camera saw. Two things matter most: a clear view of the disc leaving the hand, and as much of the flight in the frame as possible.'),
          tips([
            'For drives, stand 3 to 5 meters behind the thrower, slightly off to the side of the run-up so the body and the reach-back do not cover the release.',
            'For approaches and upshots, a side view from 10 meters or so away shows the height and the fade well.',
            'Use the 1x lens, lock focus and exposure by touching and holding on the thrower, and start recording before the run-up.',
            'Keep recording until the disc lands. A trace that stops mid-air looks unfinished.',
            'Bright disc colors such as orange, pink and yellow are far easier to follow against trees than white or grey plastic.',
          ]),
          linked('For a full phone-only filming plan, including where to prop the phone when you are on your own, see ', { href: sitePath('/learn/add-tracer-to-disc-golf-video/'), label: 'how to add a tracer to a disc golf video on your phone' }, '.'),
        ],
      },
      {
        heading: 'Open Free curve and select the release frame',
        blocks: [
          steps([
            'Open Tracer and tap Free curve on the home screen.',
            'Pick your throw from Photos.',
            'Scroll the timeline to the frame where the disc has just left the hand and is clear of the arm.',
            'Zoom in with two fingers and move the cursor onto the disc to select it.',
            'Let Tracer follow the disc through the flight, then play it back.',
          ]),
          p('Selecting the disc a frame or two after release, rather than in the hand, gives Tracer a clean disc shape to follow instead of a hand and a disc together.'),
        ],
      },
      {
        heading: 'Place points where the flight changes',
        blocks: [
          p('Watch the playback and look for the places where the line leaves the disc. Those are where key points go. You rarely need many: 4 to 10 points describe most throws, placed where the flight changes rather than spread evenly.'),
          sub('Early flight'),
          p('The first meters are fast and the disc is often small against the trees. Check the line leaves the hand in the right direction. A point a few frames after release locks the start of the line in place.'),
          sub('Turn and fade'),
          p('This is where most corrections happen. Put a point at the widest part of the turn and another where the disc starts to fade back. For a right-hand backhand, that is usually a drift to the right and then a hook left at the end; for a forehand, the other way round.'),
          sub('Landing or basket approach'),
          p('Add a point where the disc lands, hits the chains or touches the ground. If it skips or rolls, decide whether you want the line to stop at the first touch or follow it on the ground, and place the last point there.'),
        ],
      },
      {
        heading: 'Check timing and line alignment',
        blocks: [
          p('Tap Preview and watch the line grow with the disc, not ahead of or behind it. If it runs ahead, that point is on the wrong frame: scroll to where the disc really is and move it. Watch once at normal speed and once scrubbing slowly through the turn.'),
        ],
      },
      {
        heading: 'Style and save the video',
        blocks: [
          p('Choose a line color that stands out from the trees and sky, set the width, and turn on Render 3D line for depth. A gradient or effects such as electricity or wave come with Premium. Save to Photos when it looks right; free saves carry a small watermark.'),
        ],
      },
    ],
    settings: [{ name: 'Mode', value: 'Free curve', when: 'Every disc throw: drives, approaches, rollers and putts.' }, STABILIZATION, RENDER_3D, LINE_WIDTH],
    troubleshooting: [
      {
        problem: 'The line drifts off the disc in the turn',
        cause: 'The disc changes direction quickly and shrinks as it flies away.',
        fix: 'Add a key point at the widest part of the turn and move it onto the disc. One point there usually pulls the whole curve back.',
      },
      {
        problem: 'Tracking follows the wrong object',
        cause: 'A bird, a falling leaf or another player crossed the disc.',
        fix: 'Resize the track in the timeline to leave those frames out, then place key points by hand through that part.',
      },
      {
        problem: 'The disc disappears behind trees',
        cause: 'The camera cannot see the disc, so nothing can follow it there.',
        fix: 'Place points where it went in and came out. For the hidden part, see the guide to showing a flight behind trees.',
      },
      {
        problem: 'The disc is too small to see',
        cause: 'Long drives filmed from far away end up as a few pixels.',
        fix: 'Zoom in with two fingers to place points precisely. Next time, film closer or from behind the thrower so the disc stays in view longer.',
      },
    ],
    faqs: [
      { question: 'Does Tracer follow a disc automatically?', answer: 'Yes, in Free curve. Select the disc at release and Tracer can follow it. Where the line drifts, add or move key points by hand.' },
      { question: 'How many key points should I add?', answer: 'Start with enough to describe the visible flight, then add points where the line departs from the disc. More points help at changes in direction, not everywhere.' },
      { question: 'What happens when the disc leaves the frame?', answer: 'Nothing in the video shows where it went after that. End the line at the edge of the frame, or keep it short of the edge so it does not look cut off.' },
    ],
    relatedSlugs: ['add-tracer-to-disc-golf-video', 'fix-a-trace-by-hand', 'trace-behind-trees'],
    productLink: DISC_LINK,
  },
  {
    slug: 'fix-a-trace-by-hand',
    category: 'editing',
    title: 'Fix a missing or drifting tracer line',
    pageTitle: 'Fix a Missing or Drifting Tracer Line · SundayStroke',
    description: 'Repair a golf or disc trace that misses the flight. Adjust the arc, landing point or key points, trim wrong tracking, and check stabilization when the line drifts.',
    summary: 'Repair the arc, landing point or key points, and trim wrong tracking.',
    intro: [
      'Automatic tracking gets most clean clips right on the first try. When it does not, the fix is usually small: a landing point in the wrong place, a line that slid when the camera moved, or a few frames where Tracer followed something else.',
      'This guide starts with the symptom you can see, explains the likely cause, and shows the repair for both modes. The clips show key points being placed by hand on a disc throw, and the finished line.',
    ],
    hero: null,
    clips: [DISC_EDITING, DISC_AFTER],
    sections: [
      {
        heading: 'Identify what went wrong',
        blocks: [
          p('Play the trace back once at normal speed and once while scrubbing slowly. Most problems fall into one of three groups, and each has a different fix.'),
          sub('Tracking follows the wrong object'),
          p('The line jumps sideways or suddenly heads somewhere the ball or disc never went. Something crossed the flight: another ball on the range, a bird, a flag or a player. Fix it by trimming the track, below.'),
          sub('The line drifts when the camera moves'),
          p('The line is right at the start but slides away as the picture moves. That is a stabilization problem, not a tracking one. Open Settings in Tracer and try a different stabilization option: Smart for most handheld clips, Fast when there is a lot of movement, Off when the phone sat still.'),
          sub('Part of the flight is missing'),
          p('The line stops early or never starts. The ball was lost against the sky, hidden by a tree, or too small and fast for those frames. Fill the gap with the landing point and arc in Trace golf, or with key points in Free curve.'),
        ],
      },
      {
        heading: 'Correct a golf arc and landing point',
        blocks: [
          p('In Trace golf you rarely need to start over. Two handles shape the whole line.'),
          steps([
            'Scroll the timeline to the frame where the ball lands and move the landing point onto it.',
            'Drag the diamond on the curve to raise, lower or bend the arc until it sits on the ball through the flight.',
            'If automatic tracking missed the ball entirely, choose to trace manually: place the start point on the ball, and Tracer draws a rough curve for you to shape with the landing point and diamond.',
            'Tap Preview and check the line against the ball from start to finish.',
          ]),
        ],
      },
      {
        heading: 'Repair a Free curve trace with key points',
        blocks: [
          p('Free curve draws a smooth line through key points. When it drifts, you add or move a point where it went wrong rather than redrawing everything.'),
          steps([
            'Scroll the timeline to the first frame where the line leaves the ball or disc.',
            'Zoom in with two fingers and move the cursor onto the ball or disc to add a key point there.',
            'Move forward to the next place it drifts and repeat. Points matter most where the flight bends.',
            'If a point is in the wrong place, move it rather than adding another right next to it; crowded points make the line wobble.',
          ]),
          p('The start, the highest point or widest turn, and the landing are the three points that shape a line the most. Add the others only where the line needs them.'),
        ],
      },
      {
        heading: 'Trim unwanted tracking',
        blocks: [
          p('When tracking picked up something that is not your ball or disc, resize the track in the timeline so it ends before the wrong object appears. Then finish the line with the landing point in Trace golf or a few key points in Free curve. Trimming is quicker than fighting a track that is following the wrong thing.'),
        ],
      },
      {
        heading: 'Preview the repaired section before saving',
        blocks: [
          p('Tap Preview and watch the part you repaired at least twice. Check that the line grows with the ball rather than ahead of it, that it does not wobble between points, and that it ends where the ball or disc lands. Then save to Photos.'),
          linked('For every button and gesture in both modes, see the full ', MANUAL_LINK, '.'),
        ],
      },
    ],
    settings: [
      { name: 'Mode', value: 'The mode the trace was made in', when: 'Repair a golf trace with the landing point and arc; repair a disc or putt trace with Free curve key points.' },
      STABILIZATION,
      { name: 'Key points', value: '4 to 10 for most flights', when: 'Add more only where the flight bends sharply.' },
    ],
    troubleshooting: [
      {
        problem: 'The line wobbles between points',
        cause: 'Two key points sit very close together and pull the curve in different directions.',
        fix: 'Move one of them so the points are spread along the flight.',
      },
      {
        problem: 'The line runs ahead of the ball',
        cause: 'A point is placed on the right spot but on the wrong frame.',
        fix: 'Scroll to the frame where the ball is really at that spot and move the point there.',
      },
      {
        problem: 'The line jumps when the camera pans',
        cause: 'Stabilization is off or set for a still camera.',
        fix: 'Try Smart, then Fast, in Settings, and preview again.',
      },
      {
        problem: 'The ball cannot be seen in part of the clip',
        cause: 'The ball is not visible in those frames at all.',
        fix: 'Shape the line by hand through the gap. It shows where the ball went, but it is your estimate for frames the camera did not see.',
      },
    ],
    faqs: [
      { question: 'Do I have to start again?', answer: 'Usually not. Correct the existing arc, landing point or Free curve points first, in the mode your project is in.' },
      { question: 'Why does my golf ball trace stop in the wrong place?', answer: 'Tracking lost the ball or followed something else near the end. Move the landing point to where the ball really lands.' },
      { question: 'Can I switch a golf trace to Free curve?', answer: 'Free curve is a separate mode you start from the home screen. Open the same video there if you want to draw the flight with key points instead.' },
      { question: 'Which stabilization setting should I use?', answer: 'Smart for most handheld clips, Fast for a lot of camera movement, Off for a phone that did not move.' },
    ],
    relatedSlugs: ['film-a-golf-ball-flight', 'film-a-disc-flight', 'trace-golf-video-without-tripod'],
    productLink: TRACER_LINK,
  },
  {
    slug: 'trace-golf-video-without-tripod',
    category: 'golf',
    title: 'How to trace a golf video without a tripod',
    pageTitle: 'Golf Ball Tracer Without a Tripod: Handheld iPhone Guide · SundayStroke',
    description: 'Film your golf swing handheld and still get a flight line that stays on the ball. How to hold the phone, which stabilization setting to use, and how to fix drift.',
    summary: 'Film handheld; stabilization keeps the line anchored.',
    intro: [
      'Most golf videos are not filmed on a tripod. A playing partner holds a phone up on the tee, or you prop it on your bag and hope. The worry with a tracer is that the line slides around when the camera moves, because the picture moved but the line did not.',
      'SundayStroke Tracer is built for this. Its stabilization keeps the line anchored to the scene while the phone moves, so handheld clips trace cleanly. This guide explains how to film handheld for the best result, which setting to pick, and how to diagnose a line that still drifts.',
    ],
    hero: null,
    clips: [GOLF_AFTER],
    sections: [
      {
        heading: 'Why a moving camera makes a tracer drift',
        blocks: [
          p('A tracer draws the flight on top of the video. If the phone tilts up as the ball climbs, the picture moves down, and a line in fixed screen positions ends up in the sky. Stabilization follows how the picture moved and moves the line with it.'),
          p('That is why you do not need a tripod. You still get the best trace from footage that is clear and reasonably steady, because stabilization can only follow movement it can see.'),
        ],
      },
      {
        heading: 'How to hold the phone for a handheld trace',
        blocks: [
          tips([
            'Hold the phone in both hands with your elbows tucked against your body. That alone removes most shake.',
            'Stand 3 to 4 meters (10 to 12 feet) behind the golfer on the target line, at about chest height.',
            'Plant your feet and breathe out slowly as the backswing starts.',
            'Lock focus and exposure by touching and holding on the golfer before you record, so the camera does not hunt when the ball leaves.',
            'Keep the 1x lens and do not zoom while recording. Zooming mid-clip changes the whole picture at once and is the hardest movement to steady.',
          ]),
          sub('Following the ball'),
          p('Keep the phone still through impact. If the ball is about to leave the top of the frame, tilt up slowly and smoothly. A slow follow is fine; a fast whip blurs the ball and the background together, and then there is nothing sharp left to follow.'),
          sub('Propping the phone instead'),
          p('No partner? Lean the phone against your bag, a range basket or a bench, angled up slightly so the flight fits in the frame. It will not be perfectly level and that is fine. For a propped phone that did not move, set stabilization to Off.'),
        ],
      },
      {
        heading: 'Choose a stabilization setting',
        blocks: [
          p('Stabilization lives in Tracer\'s Settings and has three options. Pick by how much the phone moved, then preview.'),
          tips([
            'Smart: the default for handheld clips. Start here.',
            'Fast: for clips with a lot of movement, such as a quick tilt to follow the ball. Try it if the line still jumps with Smart.',
            'Off: for a phone that sat still on a tripod, bag or bench. With no movement to correct, Off avoids any adjustment you do not need.',
          ]),
        ],
      },
      {
        heading: 'Trace the handheld clip step by step',
        blocks: [
          steps([
            'Set stabilization in Settings first: Smart for a normal handheld clip.',
            'Tap Trace golf and pick your video.',
            'Scroll to the frame just after impact and select the ball with the cursor.',
            'Let Tracer follow the ball, then tap Preview.',
            'Watch the line during the part where the camera moved most. If it slides, change the stabilization setting and preview again.',
            'Move the landing point or drag the diamond on the arc to finish, then save to Photos.',
          ]),
        ],
      },
      {
        heading: 'Realistic limits of handheld footage',
        blocks: [
          p('Stabilization corrects movement; it cannot bring back detail never recorded. If the phone swung so fast that everything blurred, or the ball left the frame for good, there is nothing to follow. You can shape that part by hand, but it is your drawing of the flight.'),
          linked('When a handheld trace needs a hand-made repair, ', { href: sitePath('/learn/fix-a-trace-by-hand/'), label: 'fix a missing or drifting tracer line' }, ' walks through each fix.'),
        ],
      },
    ],
    settings: [STABILIZATION, { name: 'Lens', value: '1x, no zoom while recording', when: 'Every handheld clip. The main lens is the sharpest and zooming mid-clip is hard to steady.' }, RENDER_3D, LINE_WIDTH],
    troubleshooting: [
      {
        problem: 'The line drifts as the camera follows the ball',
        cause: 'Stabilization is off or the movement was faster than Smart expects.',
        fix: 'Switch to Fast in Settings and preview again. Then correct the end of the flight with the landing point.',
      },
      {
        problem: 'The line shakes even though the ball is clear',
        cause: 'Small, quick hand tremors in every frame.',
        fix: 'Try Smart if you had Fast on, or the other way round, and compare. Next time, tuck your elbows in and brace against something.',
      },
      {
        problem: 'Tracking picks up the wrong object while panning',
        cause: 'As the camera moved, a tree top or a bird passed where the ball was expected.',
        fix: 'Resize the track in the timeline to leave those frames out, then finish with the landing point.',
      },
      {
        problem: 'The ball is lost against the sky after the camera tilts up',
        cause: 'Tilting up puts the ball against bright sky with nothing behind it.',
        fix: 'Shape the rest of the arc with the diamond and set the landing point by hand. Tilt less next time, or stand further back so the flight fits without tilting.',
      },
    ],
    faqs: [
      { question: 'Do I need a tripod for a golf ball tracer?', answer: 'No. Stabilization keeps the line anchored when the camera moves. Clear, reasonably steady footage still gives the best trace.' },
      { question: 'Should I use iPhone Action mode?', answer: 'It can smooth a very shaky clip, but it crops the picture, so the ball sits closer to the edge. For most swings, normal video held in two hands is enough.' },
      { question: 'Why does my tracer line move with the camera?', answer: 'The line is drawn in screen positions until stabilization moves it with the scene. Check that stabilization is on, Smart or Fast, in Settings.' },
    ],
    relatedSlugs: ['film-a-golf-ball-flight', 'fix-a-trace-by-hand', 'trace-behind-trees'],
    productLink: TRACER_LINK,
  },
  {
    slug: 'trace-a-putt',
    category: 'golf',
    title: 'How to add a tracer line to a putting video',
    pageTitle: 'How to Add a Tracer to a Putting Video on iPhone · SundayStroke',
    description: 'Show the break of a putt with a line that rolls into the cup. Camera angles for putts, the Free curve workflow, and how to make the line end at the hole.',
    summary: 'Draw the break of a putt into the cup with Free curve.',
    intro: [
      'A traced putt shows what words cannot: how far the ball broke, where it started, and the moment it caught the edge of the cup. It is also the most useful trace for practice, because you can see whether you missed on the low side or the high side.',
      'Putts use Free curve in SundayStroke Tracer, the same mode as disc golf. Trace golf is built for a ball flying through the air; a ball rolling across a green is better drawn with a few key points. This guide covers the camera angle, the points to place and the finishing touches.',
    ],
    hero: null,
    clips: [DISC_EDITING, DISC_AFTER],
    sections: [
      {
        heading: 'Why putts use Free curve',
        blocks: [
          p('Trace golf follows a ball in the air and draws an arc from the club to the landing point. A putt never leaves the ground and curves sideways instead of up and down, so an arc is the wrong shape. Free curve draws a smooth line through key points you place on the ball, which is exactly the shape of a breaking putt.'),
          p('The clips above show Free curve key points being placed on a disc throw. On a putt the steps are the same, with fewer points.'),
        ],
      },
      {
        heading: 'Film the putt from the right angle',
        blocks: [
          sub('Behind the ball, on the line'),
          p('Crouch 1 to 2 meters behind the ball, phone held low, a little above knee height, looking down the line to the hole. This shows the break best: the line curves left or right on the screen just as it does on the green. Keep the cup in the frame for the whole roll.'),
          sub('Behind the hole, facing the golfer'),
          p('Standing behind the cup shows the golfer\'s stroke and the ball coming towards you. It is a good angle for short putts and holed-out celebrations, but the break is harder to read because the ball rolls towards the camera.'),
          tips([
            'Keep your shadow and the golfer\'s shadow off the line.',
            'Lock focus and exposure on the ball before the stroke, so the camera does not refocus on the flag.',
            'Hold still. A putt is slow, so there is no need to follow the ball; keep the start and the cup both in view.',
            'Film the whole thing, from the stroke to the ball dropping or stopping.',
          ]),
        ],
      },
      {
        heading: 'Trace the putt step by step',
        blocks: [
          steps([
            'Open Tracer and tap Free curve on the home screen.',
            'Pick the putt from Photos.',
            'Scroll the timeline to the frame where the ball starts rolling and zoom in with two fingers.',
            'Move the cursor onto the ball to place the first key point.',
            'Scroll forward to the widest point of the break, where the ball is furthest from a straight line to the hole, and place a point on the ball.',
            'Scroll to the frame where the ball reaches the cup, or stops, and place the last point there.',
            'Tap Preview. Add one more point only if the line cuts a corner the ball did not.',
          ]),
          p('Three points draw most putts. A long, double-breaking putt may need five: start, first break, the point where it turns back, near the hole, and the finish.'),
        ],
      },
      {
        heading: 'Make the line end at the cup',
        blocks: [
          p('The moment that sells a putting clip is the line dropping into the hole. Put the final key point on the frame where the ball reaches the edge of the cup, not a frame later when it has already vanished. For a miss, end the line where the ball stops, so it shows exactly how far past or short it went.'),
          p('A thinner line suits putts. Try a width well below the 60 you might use for a drive, and a color that stands out against green grass, such as white or the Floodlit line.'),
        ],
      },
      {
        heading: 'Use traced putts for practice',
        blocks: [
          p('Film the same putt three or four times from the same spot and trace each one. Side by side, the lines show whether you start the ball on your aim line and whether you are under-reading or over-reading the break, more clearly than watching the ball.'),
        ],
      },
    ],
    settings: [
      { name: 'Mode', value: 'Free curve', when: 'Every putt, short or long.' },
      { name: 'Key points', value: '3 for most putts, up to 5 for a double breaker', when: 'Start, widest break and finish; add more only where the line cuts a corner.' },
      { name: 'Line width', value: 'Thinner than for a drive', when: 'The ball is close to the camera and the line should not cover the cup.' },
      { name: 'Stabilization', value: 'Off for a still phone, Smart if handheld', when: 'A putt is slow, so a steady phone needs no correction.' },
    ],
    troubleshooting: [
      {
        problem: 'The line cuts across the break',
        cause: 'There is no point at the widest part of the curve.',
        fix: 'Scroll to the frame where the ball is furthest from a straight line and add a key point on the ball.',
      },
      {
        problem: 'The line overshoots the hole',
        cause: 'The last point is on a frame after the ball dropped.',
        fix: 'Move the last point to the frame where the ball reaches the edge of the cup.',
      },
      {
        problem: 'The ball is hard to see on the green',
        cause: 'A shadow or a low angle into the sun hides the white ball.',
        fix: 'Zoom in with two fingers to place points. Next time, film with the sun behind you or to the side.',
      },
      {
        problem: 'The line is shaky',
        cause: 'The phone moved slightly while you crouched.',
        fix: 'Set stabilization to Smart and preview again, or rest your elbows on your knees when filming.',
      },
    ],
    faqs: [
      { question: 'Can Tracer follow a putt on its own?', answer: 'Automatic golf ball tracking is part of Trace golf, which is built for balls in the air. For putts, place a few key points in Free curve; it takes only three or so.' },
      { question: 'What is the best angle to film a putt?', answer: 'Low, behind the ball, looking down the line to the hole. It shows the break as it really curves.' },
      { question: 'Does it work for disc golf putts?', answer: 'Yes. Disc putts use Free curve too, and Tracer can follow a disc after you select it at release.' },
      { question: 'Can I add how long the putt was?', answer: 'Yes. You can type a distance and the line shows a counter that runs up to it. See the guide to adding a distance label.' },
    ],
    relatedSlugs: ['fix-a-trace-by-hand', 'add-distance-label-to-golf-video', 'film-a-golf-ball-flight'],
    productLink: TRACER_LINK,
  },
  {
    slug: 'add-tracer-to-disc-golf-video',
    category: 'disc-golf',
    title: 'How to add a tracer to a disc golf video, phone only',
    pageTitle: 'Disc Golf Flight Tracer on iPhone: The Phone-Only Guide · SundayStroke',
    description: 'Make a disc golf flight tracer video with nothing but your iPhone: where to put the phone for drives, approaches and putts, filming on your own, tracing in Free curve and posting the clip.',
    summary: 'Film, trace and post a disc flight with nothing but an iPhone.',
    intro: [
      'Flight lines on disc golf coverage used to mean desktop editing software and an evening of frame-by-frame work. Now you can make the same clip with only an iPhone: film the throw, trace it in SundayStroke Tracer, and post it before the next tee.',
      'This is the whole plan, written for phones: where to put the camera for each throw, filming on your own, tracing in Free curve, and a clip that looks good on a small screen. Below is a finished trace from the app.',
    ],
    hero: { src: '/media/learn/disc-golf-flight.jpg', alt: 'A disc golf throw in Tracer with the whole flight drawn from release to landing', caption: 'A finished trace: the whole disc flight, from release to landing', width: 601, height: 1036 },
    clips: [DISC_AFTER],
    sections: [
      {
        heading: 'Where to put the phone for each throw',
        blocks: [
          sub('Drives: behind the thrower'),
          p('Stand or prop the phone 3 to 5 meters behind the tee pad, a step to the side of the run-up so the body does not hide the release. The turn, glide and fade all show from here. Hold it at chest height and leave the top half of the frame for the flight.'),
          sub('Approaches and upshots: from the side'),
          p('A side view 8 to 12 meters away, roughly level with where the disc will peak, shows height and the hyzer or anhyzer angle clearly. Keep the basket in the frame if you can; a line that finishes near the chains is the shot people want to see.'),
          sub('Putts: behind the putter or beside the basket'),
          p('Behind the putter at waist height shows the line to the basket. Beside the basket, 2 to 3 meters off to one side, catches the disc hitting chains. Either way, keep both the release and the basket in the frame for the whole putt.'),
        ],
      },
      {
        heading: 'Filming on your own',
        blocks: [
          
          tips([
            'Lean the phone against your bag or cart, angled up so the flight fits, and check the framing before you walk to the tee.',
            'Start recording, then throw. Trim the extra seconds later in Photos.',
            'Use the 1x lens; 0.5x makes the disc a speck in the air.',
            'Touch and hold on the tee pad to lock focus and exposure.',
            'Throw a bright disc. Orange, pink, yellow and lime stand out against trees; white and grey plastic disappear against cloud.',
          ]),
          p('With a friend filming: both hands, elbows tucked, still for the release, then a slow follow if the disc heads out of frame.'),
        ],
      },
      {
        heading: 'Camera settings for disc flights',
        blocks: [
          tips([
            'Normal video at 60 frames per second keeps a fast disc sharper than 30 and plays at normal speed.',
            'Slo-mo at 120 or 240 frames per second makes a dramatic release, but a whole drive then takes a long time to play. Use it for putts and short approaches.',
            'Film upright for stories and reels, sideways for long drives that cross the frame.',
          ]),
        ],
      },
      {
        heading: 'Trace the flight in Free curve',
        blocks: [
          steps([
            'Open Tracer and tap Free curve.',
            'Pick the throw from Photos.',
            'Scroll the timeline to the frame just after release, when the disc is clear of the hand.',
            'Zoom in with two fingers and move the cursor onto the disc to select it.',
            'Let Tracer follow the disc, then tap Preview.',
            'Where the line drifts off the disc, add or move a key point on the disc in that frame. The turn, the start of the fade and the landing are the usual places.',
            'Choose a line style and save the video to Photos.',
          ]),
          linked('For more on where points go as the disc turns and fades, see ', { href: sitePath('/learn/film-a-disc-flight/'), label: 'how to trace a disc golf flight' }, '.'),
        ],
      },
      {
        heading: 'Make it look good on a phone screen',
        blocks: [
          tips([
            'Pick a line color that contrasts with the background: the Floodlit line or white against dark trees, a strong color against a bright sky.',
            'Turn on Render 3D line, and go thicker for a long drive, thinner for a putt.',
            'With Premium, a gradient, a tail length or a landing effect makes an ace or a long putt feel like a highlight.',
            'Keep it short: a second before the throw and a beat after the landing.',
          ]),
        ],
      },
      {
        heading: 'Share the clip',
        blocks: [
          p('Tracer saves the finished video to Photos, so you post it from there to any app you like. Free saves carry a small watermark; Premium saves have none. Add who threw it, the hole and the disc in your caption: disc golfers always ask which disc.'),
        ],
      },
    ],
    settings: [
      { name: 'Mode', value: 'Free curve', when: 'Every disc throw.' },
      { name: 'Frame rate', value: '60 frames per second', when: 'Drives and long approaches. Slo-mo for putts and short throws.' },
      STABILIZATION,
      RENDER_3D,
    ],
    troubleshooting: [
      {
        problem: 'The line drifts in the turn',
        cause: 'The disc changes direction and shrinks quickly as it flies away.',
        fix: 'Add a key point at the widest part of the turn, on the disc.',
      },
      {
        problem: 'Tracking follows a bird or a branch',
        cause: 'Something moved across the disc\'s path.',
        fix: 'Resize the track in the timeline to leave those frames out and place points through that part by hand.',
      },
      {
        problem: 'The disc vanishes against white cloud',
        cause: 'A pale disc against a pale sky has no contrast.',
        fix: 'Place key points by hand where you can still make it out. Throw a brighter disc or film from a lower angle with trees behind the flight.',
      },
      {
        problem: 'The line jumps when the friend filming moved',
        cause: 'Camera movement the line was not corrected for.',
        fix: 'Set stabilization to Smart, or Fast for a lot of movement, in Settings and preview again.',
      },
    ],
    faqs: [
      { question: 'Can I make a disc golf flight tracer with just my phone?', answer: 'Yes. Film on your iPhone, trace in Tracer\'s Free curve mode and save to Photos. No computer or desktop editing software is needed.' },
      { question: 'Does Tracer follow the disc automatically?', answer: 'Yes, in Free curve, after you select the disc at release. You add or move key points by hand wherever the line drifts.' },
      { question: 'Where should I stand to film a drive?', answer: '3 to 5 meters behind the tee pad, a step to the side of the run-up, at about chest height.' },
      { question: 'Can I trace an old clip?', answer: 'Yes, any video in Photos where you can see the disc leave the hand.' },
    ],
    relatedSlugs: ['film-a-disc-flight', 'trace-behind-trees', 'fix-a-trace-by-hand'],
    productLink: DISC_LINK,
  },
  {
    slug: 'add-distance-label-to-golf-video',
    category: 'editing',
    title: 'How to add a distance label to a golf video',
    pageTitle: 'Add a Yardage or Distance Label to a Golf Video · SundayStroke',
    description: 'Add a distance counter to your traced golf or disc golf video. Where the number comes from, how to type it in Tracer, units, and how the counter runs with the flight.',
    summary: 'Type the distance; a counter runs up to it during the flight.',
    intro: [
      'A number on screen makes a clip: 287 on a drive, 142 on a seven-iron that finished by the pin. SundayStroke Tracer lets you add a distance label to a traced flight. You type the distance, and during the flight the label counts up to it as the line grows, landing on your number as the ball lands.',
      'The important part is where the number comes from. Tracer does not work out how far a shot went. The label shows what you type, so this guide covers where to get a number you can trust, how to add it, and how to make it read well.',
    ],
    hero: null,
    clips: [GOLF_AFTER],
    sections: [
      {
        heading: 'Where the distance comes from',
        blocks: [
          p('A video alone does not say how far a ball flew: the camera cannot tell a 150 meter shot from a 200 meter one without knowing where everything is. So the distance on the label is the one you know from somewhere else. Good sources, from the most exact:'),
          tips([
            'A launch monitor at the range or in a simulator, which reports carry and total for each ball.',
            'A laser rangefinder: shoot the ball where it stopped from where you hit it.',
            'A golf GPS app. SundayStroke Golf GPS Pro lets you mark each shot on the map and shows how far it went.',
            'Yardage markers, sprinkler heads and the course guide, adjusted for where the ball finished.',
            'Pacing it off, for short shots and putts.',
          ]),
          linked('If you already play with ', GOLF_GPS_LINK, ', marking the shot during the round gives you a number to type in later.'),
        ],
      },
      {
        heading: 'Add the distance label step by step',
        blocks: [
          steps([
            'Trace the shot first in Trace golf, or the throw in Free curve, and check the line with Preview.',
            'Open Effects, tap Distance and type the length of the shot.',
            'Type the distance of the shot.',
            'Preview the clip. The counter runs up during the flight and finishes on your number as the line reaches the landing point.',
            'Save the video to Photos.',
          ]),
          p('Because the counter follows the line, it finishes when the trace finishes. If the count ends too early or too late, move the landing point to the frame where the ball really lands, and the count follows.'),
        ],
      },
      {
        heading: 'Yards or meters, carry or total',
        blocks: [
          p('Use the unit your audience uses and stay consistent across a series of clips. Most golfers in the US and UK talk in yards; much of Europe and Asia uses meters. Say which in your caption if your followers are mixed.'),
          p('Decide too whether you are showing carry, how far the ball flew in the air, or total, including the roll. The counter finishes as the line lands, so carry reads most naturally with a flight line. If you show total, say so.'),
        ],
      },
      {
        heading: 'Make the label read well',
        blocks: [
          tips([
            'Round the number. 287 reads better than 286.6.',
            'Keep the clip long enough after landing for the final number to sit on screen for a moment.',
            'Pick a line color that also leaves the label easy to read against the background.',
            'For putts, a distance label works too: type the length of the putt, paced or measured with a rangefinder, and the count runs as the ball rolls.',
          ]),
        ],
      },
      {
        heading: 'Be honest with the number',
        blocks: [
          p('A distance label is a caption, not a measurement. If you guessed, the label is a guess. Golfers notice a 300-yard label on a shot that clearly was not, and a believable number does more for a clip than a big one. If you are posting a long drive, saying where the number came from, such as a launch monitor or a rangefinder, makes it far more convincing.'),
        ],
      },
    ],
    settings: [
      { name: 'Distance label', value: 'On, with the distance you typed', when: 'Any clip where the number is the point: drives, approaches, holed putts.' },
      { name: 'Units', value: 'Yards or meters, the ones your audience uses', when: 'Stay consistent across a series of clips.' },
      { name: 'Landing point', value: 'On the frame the ball lands', when: 'The count finishes where the line finishes.' },
    ],
    troubleshooting: [
      {
        problem: 'The count finishes before the ball lands',
        cause: 'The line ends early, so the counter does too.',
        fix: 'Move the landing point, or the last key point in Free curve, to the frame where the ball really lands.',
      },
      {
        problem: 'The number looks wrong on screen',
        cause: 'A typo, or a total typed where carry was meant.',
        fix: 'Open the label again, retype the number and preview.',
      },
      {
        problem: 'The label is hard to read',
        cause: 'It sits over a bright sky or a busy background.',
        fix: 'Try a different line color or style, and preview against the brightest part of the clip.',
      },
    ],
    faqs: [
      { question: 'Does Tracer measure how far my shot went?', answer: 'No. You type the distance, and the label counts up to it during the flight. Use a launch monitor, rangefinder or GPS app for the number.' },
      { question: 'How do I know how far my drive went?', answer: 'A launch monitor gives carry and total. On the course, a rangefinder from the tee to the ball, or marking the shot in a golf GPS app, gives a good number.' },
      { question: 'Can I add a distance label to a disc golf throw?', answer: 'Yes. Trace the throw in Free curve, then add the label and type the distance.' },
      { question: 'Can I change the number after saving?', answer: 'Edit the trace again, retype the number and save a new video.' },
    ],
    relatedSlugs: ['film-a-golf-ball-flight', 'trace-a-putt', 'trace-behind-trees'],
    productLink: TRACER_LINK,
  },
  {
    slug: 'trace-behind-trees',
    category: 'editing',
    title: 'How to show a ball or disc flight behind trees',
    pageTitle: 'Show a Tracer Line Behind Trees and Obstacles · SundayStroke',
    description: 'Keep trees, poles and players in front of your flight line. When to hide part of the line, how to make a section transparent, and how to handle the frames the camera could not see.',
    summary: 'Keep trees in front of the line and handle the hidden part.',
    intro: [
      'A flight line drawn straight across a tree looks wrong. The eye knows the ball went behind the branches, so a line painted over them breaks the effect. SundayStroke Tracer can show the trajectory behind obstacles and make sections of the line transparent, so trees, poles and people stay in front of the flight.',
      'This guide covers when to use it, how to get it right, and the honest limit: the camera never saw the ball behind the tree, so that part of the line is your best judgment of where it went.',
    ],
    hero: null,
    clips: [DISC_AFTER],
    sections: [
      {
        heading: 'When the flight goes behind something',
        blocks: [
          p('Three situations come up again and again:'),
          tips([
            'Disc golf drives through a wooded fairway, where the disc passes behind trunks and branches.',
            'Golf shots that curve round or over a tree line, filmed from behind the golfer.',
            'Anything with a person, flagstick, pole or net between the camera and part of the flight.',
          ]),
          p('In each case the clip looks best when the obstacle stays in front of the line for the frames where it was really in front of the ball.'),
        ],
      },
      {
        heading: 'Trace the visible flight first',
        blocks: [
          p('Get the line right where you can see the ball or disc before dealing with the hidden part.'),
          steps([
            'Trace the shot in Trace golf, or the throw in Free curve.',
            'Make sure the line meets the ball or disc where it goes behind the obstacle and where it comes out again. In Free curve, place a key point on each of those two frames.',
            'Shape the line between those two points so it follows a believable path: the same curve the flight had before and after.',
            'Preview and check the line joins up smoothly on both sides of the obstacle.',
          ]),
        ],
      },
      {
        heading: 'Keep the obstacle in front of the line',
        blocks: [
          p('With the line in place, open Effects, tap Color segments, mark the section that passes behind the obstacle and give it the clear style, so that part of the line turns transparent. The tree or pole then appears in front, and the line picks up again on the other side.'),
          tips([
            'Start the hidden section exactly where the ball goes behind the obstacle, and end it where it comes out. A few frames off and the line pops out of the trunk.',
            'Scrub through those frames slowly to check the edges.',
            'For a thin branch or a pole, a short transparent section reads better than a long one.',
            'For a whole stand of trees, hiding the line in that section and letting it reappear past the trees tells the story clearly.',
          ]),
        ],
      },
      {
        heading: 'What the camera could not see',
        blocks: [
          p('Behind the tree, the video has no picture of the ball. Nothing can follow it there, so the line in that stretch is a smooth join between where it went in and where it came out. That is usually close to the real flight, because balls and discs do not change direction behind trees. But it is a drawing, not a recording.'),
          p('If the ball or disc never comes back into view, for example a drive that disappears into the woods, end the line where it went out of sight. Inventing a landing you did not see is the quickest way to make a clip look fake.'),
        ],
      },
      {
        heading: 'Fix timing around the obstacle',
        blocks: [
          p('If the line seems to jump when the ball reappears, the point after the obstacle is on the wrong frame. Scroll to the first frame where the ball is clearly visible again and move the point there. If the line runs ahead behind the tree, move the point on the frame where the ball disappeared.'),
          linked('More repair steps are in ', { href: sitePath('/learn/fix-a-trace-by-hand/'), label: 'fix a missing or drifting tracer line' }, '.'),
        ],
      },
    ],
    settings: [
      { name: 'Mode', value: 'Trace golf or Free curve, as for the shot', when: 'Obstacle handling works on the line you already traced.' },
      { name: 'Hidden section', value: 'From the frame the ball goes behind to the frame it comes out', when: 'Trees, poles, players and nets between the camera and the flight.' },
      { name: 'Key points', value: 'One on each side of the obstacle', when: 'In Free curve, so the line joins up where the flight reappears.' },
    ],
    troubleshooting: [
      {
        problem: 'The line pops out of the tree trunk',
        cause: 'The hidden section starts or ends a few frames off.',
        fix: 'Scrub through those frames slowly and line up the start and end of the hidden section with the trunk.',
      },
      {
        problem: 'The line jumps where the ball reappears',
        cause: 'The point after the obstacle is on the wrong frame.',
        fix: 'Move it to the first frame where the ball is clearly visible again.',
      },
      {
        problem: 'Tracking followed a branch',
        cause: 'Moving leaves near the flight looked like the ball or disc.',
        fix: 'Resize the track in the timeline to leave those frames out and place key points by hand.',
      },
      {
        problem: 'The flight never comes back into view',
        cause: 'The ball or disc went out of sight and stayed there.',
        fix: 'End the line where it disappeared rather than guessing a landing.',
      },
    ],
    faqs: [
      { question: 'Can Tracer trace a disc hidden by a tree?', answer: 'You can draw the line around an obstruction, but the hidden flight is not in the video. The line there is your estimate, so check it looks right.' },
      { question: 'Can I make only part of the line transparent?', answer: 'Yes. Tracer can make sections of the line transparent and show the trajectory behind obstacles.' },
      { question: 'Does it work when the camera moved?', answer: 'Yes. Stabilization keeps the line anchored to the scene, and the hidden section moves with it. Check its edges with Preview after any big camera movement.' },
      { question: 'Does it work for golf and disc golf?', answer: 'Yes. Obstacle handling works on the traced line in either mode.' },
    ],
    relatedSlugs: ['fix-a-trace-by-hand', 'add-tracer-to-disc-golf-video', 'film-a-disc-flight'],
    productLink: TRACER_LINK,
  },
];

export function tutorialBySlug(slug: string): Tutorial {
  const found: Tutorial | undefined = TUTORIALS.find((tutorial) => tutorial.slug === slug);
  if (found === undefined) throw new Error(`Unknown tutorial: ${slug}`);
  return found;
}

export function relatedTutorials(tutorial: Tutorial): readonly Tutorial[] {
  return tutorial.relatedSlugs.map(tutorialBySlug);
}

export function tutorialsIn(category: TutorialCategory): readonly Tutorial[] {
  return TUTORIALS.filter((tutorial) => tutorial.category === category);
}
