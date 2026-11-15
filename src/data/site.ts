export const SITE = {
  name: 'Interdot',
  legal: 'FIX FIGURES LLC',
  brand: 'INTERDOT',
  tagline: 'Technology advisory & partner matchmaking',
  description:
    'Interdot helps growing companies clarify technology needs, evaluate suitable providers, and connect with the right technology partners.',
  url: 'https://interdot.net',
  email: 'contact@interdot.net',
  support: 'advisory@interdot.net',
  address: ['6545 Market Avenue North', 'North Canton, OH 44721', 'United States'] as string[],
  /** Add a phone when available — shown on Contact when non-empty. */
  phone: '' as string,
  founded: '2024',
  sameAs: [
    'https://github.com/0x01010l',
    'https://www.linkedin.com/company/interdot-ai',
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
