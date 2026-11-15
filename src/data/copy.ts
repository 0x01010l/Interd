import { SITE } from './site';

export const APPROACH_STEPS = [
  {
    num: '01',
    title: 'Monitor business-change signals',
    body: 'We watch for real operational moments—expansion, compliance pressure, system strain, leadership shifts—that usually precede a technology decision.',
  },
  {
    num: '02',
    title: 'Identify likely technology needs',
    body: 'From those signals we map the problems a company is about to face, not just the tools they already know to search for.',
  },
  {
    num: '03',
    title: 'Evaluate relevant vendors',
    body: 'We shortlist solution providers against fit, timing, and delivery reality—so introductions are qualified, not spray-and-pray.',
  },
  {
    num: '04',
    title: 'Facilitate introductions',
    body: 'We connect both sides with context: why the need exists now, what “good” looks like, and who should talk first.',
  },
] as const;

export const SERVICES = [
  {
    title: 'Signal-led advisory',
    body: 'We help leadership teams interpret business-change signals and decide whether a technology conversation is warranted—and what kind.',
  },
  {
    title: 'Vendor matchmaking',
    body: 'We introduce companies to solution providers that match the problem, stage, and urgency—not a generic vendor list.',
  },
  {
    title: 'Qualified introductions',
    body: 'Every introduction carries context. Vendors arrive prepared. Buyers waste fewer meetings.',
  },
] as const;

export const WHO_FOR = [
  {
    title: 'Growing companies',
    body: 'Operators and founders who need the right technology partner before the wrong one becomes expensive.',
  },
  {
    title: 'Solution providers',
    body: 'Vendors who want introductions based on real business events—not cold lists and recycled RFPs.',
  },
  {
    title: 'Advisors & partners',
    body: 'Firms that want a trusted matchmaking layer when clients hit a technology inflection point.',
  },
] as const;

export const FAQ_ITEMS = [
  {
    q: 'Is Interdot a software product or SaaS platform?',
    a: 'No. Interdot is a consulting practice: B2B technology advisory and vendor matchmaking operated by FIX FIGURES LLC. We advise, evaluate, and facilitate introductions—we do not sell a self-serve software subscription.',
  },
  {
    q: 'How do you decide which vendors to introduce?',
    a: 'We start from the business event and the resulting need, then evaluate vendors for fit, timing, and delivery credibility. Introductions are selective and contextual.',
  },
  {
    q: 'What counts as a business-change signal?',
    a: 'Examples include geographic expansion, regulatory pressure, stalled operations, leadership changes, M&A activity, or systems that can no longer keep pace with growth. Signals indicate a likely technology need—not a guarantee of purchase.',
  },
  {
    q: 'Do you charge buyers, vendors, or both?',
    a: 'Engagement models depend on the relationship. Contact us to discuss advisory retainers, introduction programs, or partnership structures that fit your side of the market.',
  },
  {
    q: 'How do we start a conversation?',
    a: `Email ${SITE.email} or use the contact form. Tell us whether you are a company seeking partners or a vendor seeking qualified introductions.`,
  },
] as const;

export const ABOUT = {
  lead: 'Interdot is the advisory practice of FIX FIGURES LLC. We exist to reduce the noise between companies in motion and the technology partners who can help them.',
  body: 'Most vendor discovery starts too late—or starts with a keyword search that ignores context. We reverse that. We begin with what is happening in the business, then map needs and facilitate introductions that respect both sides’ time.',
  close: 'We are not a marketplace, a lead broker, or a SaaS directory. We are a small consulting team that treats matchmaking as advisory work.',
};
