export const SITE = {
  name: 'Interdot',
  legal: 'FIX FIGURES LLC',
  brand: 'INTERDOT',
  tagline: 'Reasoning-as-a-Service for finance and cybersecurity',
  description:
    'Interdot delivers deterministic Reasoning-as-a-Service (RaaS): audit-ready logic chains for financial markets, automated cyber recon, and custom vector training — without black-box hallucinations.',
  url: 'https://interdot.net',
  email: 'contact@interdot.net',
  support: 'advisory@interdot.net',
  address: ['6545 Market Avenue North', 'North Canton, OH 44721', 'United States'],
  founded: '2024',
  sameAs: [
    'https://github.com/0x01010l',
    'https://www.linkedin.com/company/interdot',
  ],
} as const;

export const ROUTES = [
  '/',
  '/services',
  '/about',
  '/faq',
  '/clients',
  '/contact',
  '/privacy',
  '/terms',
] as const;
