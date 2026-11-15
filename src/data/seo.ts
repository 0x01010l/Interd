import { SITE } from './site';
import { FAQ_ITEMS } from './copy';

export type PageSeo = {
  path: string;
  title: string;
  description: string;
  keywords?: string[];
};

export const PAGE_SEO: Record<string, PageSeo> = {
  '/': {
    path: '/',
    title: 'Interdot | Technology Advisory & Partner Matchmaking',
    description: SITE.description,
    keywords: [
      'B2B technology advisory',
      'vendor matchmaking',
      'technology partner introductions',
      'technology provider evaluation',
    ],
  },
  '/approach': {
    path: '/approach',
    title: 'Our Approach | Technology Partner Selection | Interdot',
    description:
      'How Interdot clarifies technology needs, evaluates providers, and facilitates focused partner introductions.',
  },
  '/services': {
    path: '/services',
    title: 'Advisory & Matchmaking Services | Interdot',
    description:
      'Technology needs advisory, provider research, and strategic partner introductions for growing companies.',
  },
  '/about': {
    path: '/about',
    title: 'About Interdot | FIX FIGURES LLC Advisory Practice',
    description:
      'Interdot is the B2B technology advisory and vendor matchmaking practice of FIX FIGURES LLC, based in North Canton, Ohio.',
  },
  '/faq': {
    path: '/faq',
    title: 'FAQ | Interdot Technology Advisory',
    description:
      'How Interdot evaluates providers, facilitates introductions, and supports important technology decisions.',
  },
  '/contact': {
    path: '/contact',
    title: 'Contact Interdot | Start a Conversation',
    description: `Contact Interdot for technology advisory or vendor introductions. Email ${SITE.email} or use our form.`,
  },
  '/privacy': {
    path: '/privacy',
    title: 'Privacy Policy | Interdot',
    description: 'How FIX FIGURES LLC (Interdot) handles contact information and privacy.',
  },
  '/terms': {
    path: '/terms',
    title: 'Terms of Use | Interdot',
    description: 'Terms governing use of the Interdot advisory website and services.',
  },
};

export function getPageSeo(path: string): PageSeo {
  return PAGE_SEO[path] ?? PAGE_SEO['/'];
}

export { FAQ_ITEMS };

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE.name,
    legalName: SITE.legal,
    url: SITE.url,
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
    serviceType: [
      'B2B Technology Advisory',
      'Vendor Matchmaking',
      'Qualified Introductions',
    ],
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
  };
}

export function breadcrumbJsonLd(path: string, label: string) {
  const crumbs: { name: string; item: string }[] = [{ name: 'Home', item: SITE.url }];
  if (path !== '/') crumbs.push({ name: label, item: `${SITE.url}${path}` });
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
