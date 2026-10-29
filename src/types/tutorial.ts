export interface Clip {
  src: string;
  poster: string;
  label: string;
}

export interface TutorialImage {
  src: string;
  alt: string;
  caption: string;
}

export interface TutorialSetting {
  name: string;
  value: string;
  when: string;
}

export interface TutorialLink {
  href: string;
  label: string;
}

export type TutorialCategory = 'golf' | 'disc-golf' | 'editing';

export interface TutorialCategoryGroup {
  category: TutorialCategory;
  heading: string;
  intro: string;
}

export interface ParagraphBlock {
  kind: 'paragraph';
  text: string;
}

export interface SubheadingBlock {
  kind: 'subheading';
  text: string;
}

export interface StepsBlock {
  kind: 'steps';
  items: readonly string[];
}

export interface TipsBlock {
  kind: 'tips';
  items: readonly string[];
}

export interface LinkedBlock {
  kind: 'linked';
  before: string;
  link: TutorialLink;
  after: string;
}

export type TutorialBlock = ParagraphBlock | SubheadingBlock | StepsBlock | TipsBlock | LinkedBlock;

export interface TutorialSection {
  heading: string;
  blocks: readonly TutorialBlock[];
}

export interface TroubleshootingItem {
  problem: string;
  cause: string;
  fix: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Tutorial {
  slug: string;
  category: TutorialCategory;
  title: string;
  pageTitle: string;
  description: string;
  summary: string;
  intro: readonly string[];
  hero: TutorialImage | null;
  clips: readonly Clip[];
  sections: readonly TutorialSection[];
  settings: readonly TutorialSetting[];
  troubleshooting: readonly TroubleshootingItem[];
  faqs: readonly FaqItem[];
  relatedSlugs: readonly string[];
  productLink: TutorialLink;
}

export interface TracingModeRow {
  clip: string;
  mode: string;
  guideSlug: string;
  guideLabel: string;
}
