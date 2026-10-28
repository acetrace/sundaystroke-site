export interface Clip {
  src: string;
  poster: string;
  label: string;
}

export interface TutorialSetting {
  name: string;
  value: string;
}

export interface RelatedLink {
  lead: string;
  href: string;
  label: string;
}

export interface Tutorial {
  slug: string;
  title: string;
  description: string;
  intro: string;
  before: Clip;
  after: Clip;
  steps: readonly string[];
  settings: readonly TutorialSetting[];
  related: RelatedLink | null;
}
