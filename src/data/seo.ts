import { SITE } from './site';

export type PageSeo = {
  path: string;
  title: string;
  description: string;
  keywords?: string[];
  type?: 'website' | 'article';
  speakable?: string[];
};

/** Entity glossary — feeds DefinedTermSet JSON-LD (semantic entity clustering). */
export const DEFINED_TERMS = [
  {
    name: 'Reasoning-as-a-Service',
    description:
      'A cloud delivery model where AI outputs are synthesized as verifiable logic chains rather than probabilistic text completions.',
  },
  {
    name: 'Logic Trace',
    description:
      'A step-by-step causal record showing how Interdot reached a conclusion from source vectors — enabling audit and compliance review.',
  },
  {
    name: 'Deterministic Intelligence',
    description:
      'AI outputs constrained to validated reasoning paths; inconclusive paths are flagged instead of hallucinated.',
  },
  {
    name: 'Vector Synthesis',
    description:
      'Mapping multi-modal data into relational vector space so cross-source causal relationships can be reasoned over.',
  },
  {
    name: 'Financial Logic Synthesis',
    description:
      'Causal analysis of market and transaction data into audit-ready intelligence for quant and risk teams.',
  },
  {
    name: 'Automated Cyber Recon',
    description:
      'Threat modeling that predicts adversary logic from attack-surface vectors before exploitation occurs.',
  },
] as const;

export const PAGE_SEO: Record<string, PageSeo> = {
  '/': {
    path: '/',
    title: 'Interdot | Reasoning-as-a-Service for Finance & Cybersecurity',
    description: SITE.description,
    keywords: [
      'reasoning as a service',
      'deterministic AI',
      'financial logic synthesis',
      'cyber threat reasoning',
      'audit-ready AI',
      'vector training',
    ],
    speakable: [
      'Interdot delivers Reasoning-as-a-Service for finance and cybersecurity.',
      'Every output includes a verifiable logic trace for audit and compliance.',
    ],
  },
  '/services': {
    path: '/services',
    title: 'Reasoning Layer Services | Financial Logic, Cyber Recon & Vector Training',
    description:
      'Compare data scraping vs reasoning synthesis. Interdot offers financial logic synthesis, automated cyber recon, and private custom vector training with zero data leakage.',
    keywords: ['reasoning layer', 'financial AI', 'cyber recon API', 'custom vector training'],
    speakable: ['Interdot synthesizes reasoning chains — not just scraped patterns.'],
  },
  '/about': {
    path: '/about',
    title: 'About Interdot | Deterministic AI Reasoning Company',
    description:
      'Interdot bridges raw data and decision-making with audit-ready, deterministic AI reasoning for finance and cybersecurity leaders.',
    keywords: ['deterministic AI company', 'FIX FIGURES LLC', 'audit-ready AI'],
  },
  '/faq': {
    path: '/faq',
    title: 'Technical FAQ | Reasoning Engine, Latency & Data Isolation',
    description:
      'How Interdot prevents hallucinations, API latency benchmarks, MITRE ATT&CK vectorization, logic trace auditing, and proprietary data isolation.',
    keywords: ['reasoning API latency', 'AI hallucination prevention', 'logic trace audit'],
  },
  '/clients': {
    path: '/clients',
    title: 'Case Studies | Quant Funds & Cybersecurity Teams Using Interdot',
    description:
      'Case studies from quant funds and CISO teams using Interdot logic traces for alpha generation, early breach detection, and secure vector training.',
    keywords: ['AI case studies finance', 'cybersecurity reasoning platform'],
  },
  '/contact': {
    path: '/contact',
    title: 'Contact Interdot | Request Reasoning API Access',
    description:
      'Contact Interdot engineering for Reasoning-as-a-Service integration. Email contact@interdot.net or request API access via our form.',
    keywords: ['reasoning API access', 'contact interdot'],
  },
  '/privacy': {
    path: '/privacy',
    title: 'Privacy Policy | Interdot Reasoning Platform',
    description:
      'How FIX FIGURES LLC (Interdot) handles data, encryption, GDPR compliance, and AI reasoning without compromising PII.',
  },
  '/terms': {
    path: '/terms',
    title: 'Terms of Use | Interdot Reasoning-as-a-Service',
    description:
      'Terms governing use of the Interdot reasoning platform, intellectual property, and non-reliance clause for financial and security decisions.',
  },
  '/blog': {
    path: '/blog',
    title: 'AI Agents & Reasoning Blog | Interdot',
    description:
      'Practical guides on stopping agent hallucinations, RAG vs reasoning layers, multi-agent orchestration, AI compliance, and building trustworthy copilots.',
    keywords: ['AI agents blog', 'AI reasoning', 'enterprise AI guides', 'RaaS'],
  },
};

export function getPageSeo(path: string): PageSeo {
  return PAGE_SEO[path] ?? PAGE_SEO['/'];
}

export const FAQ_ITEMS = [
  {
    q: 'How do you prevent hallucinations?',
    a: 'Our engine uses a deterministic reasoning layer that requires every output to be synthesized from a verifiable chain of vector relationships. If a logic path cannot be validated against the source data, the system flags it as Inconclusive rather than guessing.',
  },
  {
    q: 'What is the latency of the reasoning API?',
    a: 'Our core engine is optimized for high-frequency environments. Standard reasoning synthesis for complex financial vectors averages 12–15ms. Custom deep-vector training models may vary based on dataset complexity.',
  },
  {
    q: 'How is data vectorized for cybersecurity?',
    a: 'We map network behaviors, adversary tactics (MITRE ATT&CK), and system logs into a multi-dimensional vector space. This allows our engine to reason across disparate data sources to identify the logical progression of a threat.',
  },
  {
    q: 'Is my proprietary data used to train global models?',
    a: 'No. Interdot employs strict data isolation protocols. Custom vector training is performed in siloed environments, and your data never leaks into our baseline reasoning engine.',
  },
  {
    q: 'Can I audit the reasoning chains?',
    a: "Yes. Every API response includes a Logic Trace object — a step-by-step breakdown of the causal relationships the engine used to reach its conclusion.",
  },
] as const;

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    legalName: SITE.legal,
    url: SITE.url,
    logo: `${SITE.url}/favicon.svg`,
    description: SITE.description,
    email: SITE.email,
    foundingDate: SITE.founded,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address[0],
      addressLocality: 'North Canton',
      addressRegion: 'OH',
      postalCode: '44721',
      addressCountry: 'US',
    },
    sameAs: SITE.sameAs,
    knowsAbout: DEFINED_TERMS.map((t) => t.name),
  };
}

export function definedTermSetJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'Interdot Reasoning Glossary',
    description: 'Core terminology for Reasoning-as-a-Service and deterministic AI intelligence.',
    hasDefinedTerm: DEFINED_TERMS.map((t) => ({
      '@type': 'DefinedTerm',
      name: t.name,
      description: t.description,
      inDefinedTermSet: `${SITE.url}/#glossary`,
    })),
  };
}

export function webSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    publisher: { '@type': 'Organization', name: SITE.legal },
    inLanguage: 'en-US',
  };
}

export function breadcrumbJsonLd(path: string, label: string) {
  const crumbs: { name: string; item: string }[] = [{ name: 'Home', item: SITE.url }];
  if (path !== '/') {
    crumbs.push({ name: label, item: `${SITE.url}${path}` });
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.item,
    })),
  };
}

export function speakableJsonLd(path: string, cssSelectors: string[]) {
  const page = getPageSeo(path);
  if (!page.speakable?.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    url: `${SITE.url}${path === '/' ? '' : path}`,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: cssSelectors,
    },
  };
}
