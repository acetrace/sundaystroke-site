import type { SundayIssue } from '../types/sunday';

export const SUNDAY_ISSUES: readonly SundayIssue[] = [
  {
    slug: '2026-11-01',
    number: 1,
    date: 'Sunday 1 November 2026',
    title: 'The Sunday post, issue 1',
    summary: 'A Monday play-off in Bermuda, a course-management habit worth stealing, and a million-dollar milestone.',
    leadText:
      'Here is a swing from the Tracer app, before and after: the ball leaves the club, and Tracer draws its flight onto the video. Film yours this weekend and see the line.',
    leadClips: [
      { src: '/media/learn/golf-original.mp4', poster: '/media/learn/golf-original.jpg', label: 'Before' },
      { src: '/media/learn/golf-result.mp4', poster: '/media/learn/golf-result.jpg', label: 'After' },
    ],
    sections: [
      {
        key: 'golf',
        heading: 'Golf',
        items: [
          {
            headline: 'A Monday finish in Bermuda',
            body: 'Austin Smotherman beat Seamus Power in a Monday play-off at the Bermuda Championship for his second PGA Tour win.',
            sourceLabel: 'BBC Sport',
            sourceUrl: 'https://www.bbc.co.uk/sport/golf/articles/c6x29gmyz21ko',
          },
          {
            headline: 'McDowell stays put',
            body: 'Former US Open champion Graeme McDowell has decided not to pursue LIV 2.0, after four years with the league.',
            sourceLabel: 'BBC Sport',
            sourceUrl: 'https://www.bbc.co.uk/sport/golf/articles/ck78px63l923o',
          },
          {
            headline: 'Aim for the middle',
            body: 'One simple course-management habit: pick a target that leaves room for your usual miss. For most of us that means the middle of the green, not the flag.',
            sourceLabel: 'GOLF.com',
            sourceUrl: 'https://golf.com/instruction/crucial-course-management-mistake-costing-strokes/',
          },
        ],
      },
      {
        key: 'tracer',
        heading: 'Tracer: disc golf',
        items: [
          {
            headline: 'The first million',
            body: 'Ricky Wysocki has become the first disc golfer to pass one million dollars in career earnings.',
            sourceLabel: 'DGPT',
            sourceUrl: 'https://www.dgpt.com/news/ricky-wysocki-becomes-first-disc-golfer-to-earn-1-million/',
          },
          {
            headline: 'A new cup at Ivy Hill',
            body: 'Silva Saarinen and Gannon Buhr won the first Powerball Cups at Ivy Hill, played for a record purse.',
            sourceLabel: 'DGPT',
            sourceUrl: 'https://www.dgpt.com/news/2026-powerball-cup-recap/',
          },
        ],
      },
    ],
  },
];
