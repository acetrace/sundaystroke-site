import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { TUTORIAL_GROUPS, TUTORIALS, relatedTutorials, tutorialBySlug, tutorialsIn } from './tutorials';
import type { Tutorial, TutorialBlock } from '../types/tutorial';

function blockText(block: TutorialBlock): string {
  switch (block.kind) {
    case 'paragraph':
    case 'subheading':
      return block.text;
    case 'steps':
    case 'tips':
      return block.items.join(' ');
    case 'linked':
      return `${block.before} ${block.link.label} ${block.after}`;
    default: {
      const unhandled: never = block;
      throw new Error(`Unhandled block ${JSON.stringify(unhandled)}`);
    }
  }
}

function tutorialText(tutorial: Tutorial): string {
  return [
    tutorial.title,
    ...tutorial.intro,
    ...tutorial.sections.flatMap((section) => [section.heading, ...section.blocks.map(blockText)]),
    ...tutorial.settings.flatMap((setting) => [setting.name, setting.value, setting.when]),
    ...tutorial.troubleshooting.flatMap((item) => [item.problem, item.cause, item.fix]),
    ...tutorial.faqs.flatMap((faq) => [faq.question, faq.answer]),
  ].join(' ');
}

function wordCount(text: string): number {
  return text.split(/\s+/).filter((word) => /[A-Za-z0-9]/.test(word)).length;
}

function publicFile(path: string): string {
  return join(process.cwd(), 'public', path);
}

describe('tutorials', () => {
  it('have unique slugs', () => {
    const slugs: readonly string[] = TUTORIALS.map((tutorial) => tutorial.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('link only to other existing tutorials', () => {
    for (const tutorial of TUTORIALS) {
      expect(tutorial.relatedSlugs).not.toContain(tutorial.slug);
      expect(relatedTutorials(tutorial).map((related) => related.slug)).toEqual(tutorial.relatedSlugs);
    }
  });

  it('fail loudly on an unknown slug', () => {
    expect(() => tutorialBySlug('no-such-guide')).toThrow('Unknown tutorial: no-such-guide');
  });

  it('put every tutorial in a hub group and every group has tutorials', () => {
    for (const group of TUTORIAL_GROUPS) expect(tutorialsIn(group.category).length).toBeGreaterThan(0);
    const grouped: number = TUTORIAL_GROUPS.reduce((total, group) => total + tutorialsIn(group.category).length, 0);
    expect(grouped).toBe(TUTORIALS.length);
  });

  it('use media that exists', () => {
    for (const tutorial of TUTORIALS) {
      for (const clip of tutorial.clips) {
        expect(existsSync(publicFile(clip.src))).toBe(true);
        expect(existsSync(publicFile(clip.poster))).toBe(true);
      }
      if (tutorial.hero !== null) expect(existsSync(publicFile(tutorial.hero.src))).toBe(true);
    }
  });

  it('are long enough to be useful', () => {
    for (const tutorial of TUTORIALS) {
      const words: number = wordCount(tutorialText(tutorial));
      expect(words, tutorial.slug).toBeGreaterThanOrEqual(800);
      expect(words, tutorial.slug).toBeLessThanOrEqual(1250);
    }
  });

  it('never say Tracer works out a distance or break the copy rules', () => {
    for (const tutorial of TUTORIALS) {
      const text: string = tutorialText(tutorial);
      expect(text, tutorial.slug).not.toMatch(/baseball/i);
      expect(text, tutorial.slug).not.toMatch(/shot\s*tracer/i);
      expect(text, tutorial.slug).not.toMatch(/\b(?:measures?|calculates?|tracks?)\b[^.]{0,40}\bdistance/i);
      expect(text, tutorial.slug).not.toMatch(/ace\s*trace/i);
    }
  });
});
