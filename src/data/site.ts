export const SITE = {
  name: 'Interdot',
  legal: 'FIX FIGURES LLC',
  brand: 'INTERDOT',
  tagline: 'B2B technology advisory & vendor matchmaking',
  description:
    'Interdot connects growing companies with the right technology partners—based on what is happening in their business right now. We monitor business-change signals, identify likely technology needs, evaluate relevant vendors, and facilitate qualified introductions.',
  url: 'https://interdot.net',
  email: 'contact@interdot.net',
  support: 'advisory@interdot.net',
  address: ['6545 Market Avenue North', 'North Canton, OH 44721', 'United States'] as string[],
  /** Add a phone when available — shown on Contact when non-empty. */
  phone: '' as string,
  founded: '2024',
  sameAs: [
    'https://github.com/0x01010l',
    'https://www.linkedin.com/company/interdot',
  ] as string[],
  tallyFormId: 'jaXl9Q',
};

export const ROUTES = [
  '/',
  '/approach',
  '/services',
  '/about',
  '/faq',
  '/contact',
  '/privacy',
  '/terms',
] as const;
