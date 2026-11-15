export type WorldSection = {
  id: string;
  label: string;
  eyebrow: string;
  title: string;
  body: string;
  tags: string[];
  accent: string;
  scroll: number;
  linger: number;
  cta?: { primary: { label: string; href: string }; secondary?: { label: string; href: string } };
};

/** Scroll-world journey for Interdot advisory — camera flies through these beats. */
export const WORLD_SECTIONS: WorldSection[] = [
  {
    id: 'city',
    label: 'The City',
    eyebrow: 'Act I · Growing companies',
    title: 'Businesses in motion.',
    body: 'Somewhere below, a company is expanding, straining, or reinventing itself. That motion is the beginning of every technology decision.',
    tags: ['Operators', 'Founders', 'Scale'],
    accent: '#0070FF',
    scroll: 1.7,
    linger: 0.4,
  },
  {
    id: 'signals',
    label: 'Signals',
    eyebrow: 'Act II · Change detected',
    title: 'We watch for the moment of change.',
    body: 'Expansion. Compliance pressure. Systems under strain. Leadership shifts. These are business-change signals—not keywords.',
    tags: ['Expansion', 'Compliance', 'Ops strain'],
    accent: '#3b8eff',
    scroll: 1.6,
    linger: 0.45,
  },
  {
    id: 'needs',
    label: 'Needs',
    eyebrow: 'Act III · Need crystallizes',
    title: 'Signals become needs before they become RFPs.',
    body: 'We map capacity, risk, visibility, and speed—the problems arriving next—not just the tools people already know to search.',
    tags: ['Capacity', 'Risk', 'Visibility'],
    accent: '#0070FF',
    scroll: 1.5,
    linger: 0.4,
  },
  {
    id: 'vendors',
    label: 'Vendors',
    eyebrow: 'Act IV · Evaluation',
    title: 'Then we decide who belongs in the room.',
    body: 'Fit. Timing. Delivery reality. A shortlist shaped by the moment—not a generic directory dump.',
    tags: ['Fit', 'Timing', 'Delivery'],
    accent: '#5aa2ff',
    scroll: 1.5,
    linger: 0.35,
  },
  {
    id: 'bridge',
    label: 'Bridge',
    eyebrow: 'Act V · Matchmaking',
    title: 'A qualified introduction.',
    body: 'Company and partner meet with context: why now, what good looks like, who should speak first.',
    tags: ['Context', 'Trust', 'Introduction'],
    accent: '#0070FF',
    scroll: 1.6,
    linger: 0.45,
  },
  {
    id: 'cta',
    label: 'Interdot',
    eyebrow: 'Finale · Advisory practice',
    title: 'Tell us what is changing.',
    body: 'Interdot is consulting—not SaaS. We connect growing companies with the right technology partners based on what is happening right now.',
    tags: ['Advisory', 'Not SaaS'],
    accent: '#0070FF',
    scroll: 1.8,
    linger: 0.5,
    cta: {
      primary: { label: 'Get in touch', href: '/contact' },
      secondary: { label: 'Our approach', href: '/approach' },
    },
  },
];
