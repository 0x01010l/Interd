import { SITE } from './site';

export const ABOUT_COPY = {
  h1: 'A study blog for students who need the next mark, not another slogan.',
  lead: `${SITE.name} publishes practical how-to guides for WAEC, BECE, and school exams: how to revise, how to write answers examiners can mark, and how to study when time and quiet are scarce.`,
  who: `${SITE.legal} operates Interdot Study from North Canton, Ohio. We are a small independent publisher. Articles are written for students, parents, and teachers in West African exam systems — Ghana, Nigeria, Sierra Leone, Liberia, The Gambia, and anyone sitting similar essay-and-objective papers.`,
  editorial:
    'Guides are original educational explainers. They are not leaked papers, paid “expo,” predicted questions, or guarantees of grades. Where we mention mark schemes, we describe common examiner habits in plain language — not official board documents. We do not sell courses, software tools, or tutoring from this site. The site is a blog: read, practise, confirm rules with your school.',
  method:
    'Each guide is a single job a student can finish in one sitting: a writing drill, a revision calendar, a way to show working, or a household rule that keeps a timetable alive. We prefer specific classroom scenes and named skills over generic “study hard” advice. If a page cannot be used tonight, it does not belong here.',
  contact: `Questions, corrections, classroom-use permission, and privacy requests: ${SITE.email}. Business address: ${SITE.address.join(', ')}.`,
};

export const PRIVACY_SECTIONS: { heading: string; paragraphs: string[] }[] = [
  {
    heading: '1. Who we are',
    paragraphs: [
      `${SITE.brand} is published by ${SITE.legal} (“we,” “our”). This policy covers ${SITE.url} — an educational blog about WAEC, BECE, study methods, and exam writing. We do not require accounts. We do not operate a student portal.`,
    ],
  },
  {
    heading: '2. What we collect',
    paragraphs: [
      'We collect technical data needed to run the site (such as IP address and user-agent for security and abuse prevention) and messages you send via email. Do not send exam numbers, national IDs, passwords, or other sensitive identifiers in messages. We do not sell mailing lists.',
    ],
  },
  {
    heading: '3. Cookies, consent, and Google Analytics',
    paragraphs: [
      'Essential cookies remember your cookie choice (local storage key interdot_cookie_consent_v2). Google Analytics (measurement ID G-CQY6T21J0M) loads only after you choose Accept all. Essential only keeps Analytics off. You can clear site data in your browser to see the banner again.',
      'Analytics, when allowed, helps us understand which guides are read so we can keep the blog useful. IP anonymization is requested in the Analytics configuration.',
    ],
  },
  {
    heading: '4. Advertising',
    paragraphs: [
      'We may display ads through Google AdSense when the site is approved. Advertising cookies are used only after Accept all. You can opt out of personalized ads in Google Ads Settings. Ads are not a substitute for the educational guidance on the page and are not an endorsement of any product.',
    ],
  },
  {
    heading: '5. Children',
    paragraphs: [
      'The blog is written for school students, including teenagers preparing for BECE and WAEC. We do not knowingly collect personal information from children through accounts, because we do not offer accounts. Parents may email us to request deletion of any message that included a child’s personal data.',
    ],
  },
  {
    heading: '6. Contact and requests',
    paragraphs: [
      `Email ${SITE.email} to request access, correction, or deletion of personal data we hold. We use TLS in transit. This policy was last updated 13 August 2026.`,
    ],
  },
];

export const TERMS_SECTIONS: { heading: string; paragraphs: string[] }[] = [
  {
    heading: 'Educational use',
    paragraphs: [
      `${SITE.name} provides general study guidance. It is not an official WAEC, BECE, NECO, or school publication. Articles cannot promise grades, leaked questions, marking outcomes, or admission results.`,
    ],
  },
  {
    heading: 'Accuracy',
    paragraphs: [
      'Syllabuses and paper formats change. Confirm dates, paper codes, calculator rules, and registration steps with your school and the examining body. If you spot an error, email us and we will correct the page.',
    ],
  },
  {
    heading: 'Acceptable use',
    paragraphs: [
      'Do not scrape the site to train models or republish articles without permission. Linking to a page is welcome. Teachers may use a guide in class with a link back to the original. Contact-form spam and exam-malpractice requests are refused.',
    ],
  },
  {
    heading: 'Liability',
    paragraphs: [
      `${SITE.legal} is not liable for exam results, school decisions, or third-party ads. Use of the site is at your own judgement. Last updated 13 August 2026.`,
    ],
  },
];

export const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: 'Is this an official WAEC or BECE site?',
    a: 'No. Interdot Study is an independent educational blog. For registration, results, and official circulars, use your examining body and school.',
  },
  {
    q: 'Do you sell expo, leaked papers, or guaranteed grades?',
    a: 'No. We publish study methods and writing technique. Anyone promising tomorrow’s paper is not us.',
  },
  {
    q: 'Who writes the articles?',
    a: 'Guides are original explainers produced for this publication, edited for students who sit essay-and-objective papers. They are not copied mark schemes.',
  },
  {
    q: 'Can teachers use these in class?',
    a: 'Yes, with a link back to the article. Do not paste entire posts into paid booklets without permission.',
  },
  {
    q: 'How do cookies work?',
    a: 'Essential cookies run the site. Google Analytics loads only if you choose Accept all. See the Privacy Policy.',
  },
  {
    q: 'Who publishes Interdot Study?',
    a: `${SITE.legal}, ${SITE.address.join(', ')}. Email ${SITE.email}.`,
  },
];
