import { SITE } from './site';

export const APPROACH_STEPS = [
  {
    num: '01',
    title: 'Understand the business moment',
    body: 'We start with the change behind the search: growth, operational pressure, a new mandate, or a system that can no longer keep pace.',
  },
  {
    num: '02',
    title: 'Define the real requirement',
    body: 'We translate goals, constraints, and urgency into a clear brief that keeps the evaluation focused on business outcomes.',
  },
  {
    num: '03',
    title: 'Evaluate the right providers',
    body: 'We research and compare providers for capability, fit, timing, and delivery confidence, then narrow the field to credible options.',
  },
  {
    num: '04',
    title: 'Create a productive connection',
    body: 'We bring the right decision-makers together with useful context, shared expectations, and a clear reason for the conversation.',
  },
] as const;

export const SERVICES = [
  {
    title: 'Technology needs advisory',
    body: 'We help leadership teams turn a changing business requirement into a clear technology direction and practical evaluation plan.',
  },
  {
    title: 'Provider research & evaluation',
    body: 'We identify and assess solution providers against the problem, company stage, priorities, budget, and implementation reality.',
  },
  {
    title: 'Strategic partner introductions',
    body: 'We facilitate relevant conversations with shared context, helping buyers and providers begin at a more useful starting point.',
  },
] as const;

export const WHO_FOR = [
  {
    title: 'Growing companies',
    body: 'Leaders who need a reliable way to define a technology need, navigate the market, and choose with confidence.',
  },
  {
    title: 'Solution providers',
    body: 'Technology providers seeking relevant opportunities where their expertise and delivery model genuinely fit.',
  },
  {
    title: 'Advisors & partners',
    body: 'Advisory firms and professional networks that need trusted technology expertise for a client or portfolio company.',
  },
] as const;

export const FAQ_ITEMS = [
  {
    q: 'What does Interdot help companies do?',
    a: 'We help companies clarify technology needs, research and evaluate suitable solution providers, and create focused introductions to the partners most relevant to their goals.',
  },
  {
    q: 'How do you decide which vendors to introduce?',
    a: 'We begin with the business objective and evaluation criteria, then assess providers for relevant expertise, company fit, delivery approach, timing, and credibility.',
  },
  {
    q: 'When should we involve Interdot?',
    a: 'The best time is when a meaningful business change creates a technology question, such as expansion, operational strain, compliance requirements, modernization, or a new strategic initiative.',
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
  lead: 'Interdot helps growing companies make better technology decisions by connecting business context, market research, and trusted relationships.',
  body: 'Most provider searches begin with a category or a list. We begin with the business: what is changing, what outcome matters, and what kind of partner can realistically deliver it. That context makes every step, from discovery to introduction, more focused.',
  close: 'Our work is intentionally selective. We value relevant expertise, clear expectations, and conversations that respect everyone’s time.',
};
