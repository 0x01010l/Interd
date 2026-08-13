export const SITE = {
  name: 'Interdot Study',
  tagline: 'Clear how-tos for WAEC, BECE, and exam writing.',
  description:
    'Free educational how-to guides for WAEC, BECE, exam study tips, and how to write answers examiners can mark. Independent blog published by FIX FIGURES LLC.',
  url: 'https://interdot.net',
  email: 'contact@interdot.net',
  support: 'advisory@interdot.net',
  legal: 'FIX FIGURES LLC',
  brand: 'Interdot Study',
  address: ['6545 Market Avenue North', 'North Canton, OH 44721', 'United States'],
  gaId: 'G-CQY6T21J0M',
};

export const CATEGORIES = [
  { slug: 'waec', label: 'WAEC', description: 'Subject-by-subject revision and answer technique.' },
  { slug: 'bece', label: 'BECE', description: 'Junior high exam writing, maths, and science prep.' },
  { slug: 'study', label: 'Study methods', description: 'Timetables, memory, and how to practise.' },
  { slug: 'writing', label: 'How to write', description: 'Essays, letters, definitions, and summaries.' },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]['slug'];
