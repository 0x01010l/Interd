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
      `${SITE.brand} is published by ${SITE.legal} (“we,” “us,” “our”), ${SITE.address.join(', ')}. This policy covers ${SITE.url} — an educational blog about WAEC, BECE, study methods, and exam writing. We do not require accounts or student logins.`,
      `Data controller: ${SITE.legal}. Contact: ${SITE.email}.`,
    ],
  },
  {
    heading: '2. Information we collect',
    paragraphs: [
      'Server and security logs may include IP address, browser type, referring page, and timestamps. If you email us, we receive your address and message content. Do not send exam numbers, national IDs, passwords, or other sensitive identifiers.',
      'We do not sell personal information. We do not buy mailing lists. We do not operate behavioural profiling outside the analytics and advertising tools described below, and only after you grant consent where required.',
    ],
  },
  {
    heading: '3. Cookies, Consent Mode, and our CMP',
    paragraphs: [
      'We use a Google-certified consent management platform (Google Funding Choices) together with an on-site cookie banner. Both honour Google Consent Mode v2. Until you choose Accept all, ad_storage, ad_user_data, ad_personalization, and analytics_storage remain denied.',
      'Your choice is stored locally (key interdot_cookie_consent_v4). Reject all / Essential only keeps non-essential storage denied. Accept all enables Google Analytics (measurement ID G-CQY6T21J0M) and, when ads are active, Google AdSense (publisher ID ca-pub-5026973506244281). IP anonymization is requested in Analytics.',
      'You can withdraw consent by clearing site data or using the cookie controls in your browser. European visitors may also see Google’s Funding Choices message where required by law.',
    ],
  },
  {
    heading: '4. Google Analytics and advertising partners',
    paragraphs: [
      'Google Analytics helps us understand which guides are useful. Google may process data in the United States and other countries under its own terms: https://policies.google.com/privacy',
      'We use Google AdSense to monetise the blog. AdSense and its partners may use cookies or similar technologies to serve and measure ads, subject to your consent. Google’s ad technology partners are listed at https://support.google.com/adsense/answer/9012182. Our ads.txt file at /ads.txt declares authorised sellers.',
      'You can manage ad personalisation in Google’s Ad Settings: https://adssettings.google.com',
    ],
  },
  {
    heading: '5. Legal bases (EEA/UK visitors)',
    paragraphs: [
      'Where GDPR or UK GDPR applies, we rely on consent for analytics and advertising cookies, and on legitimate interests for essential site operation and security logging. You may lodge a complaint with your local supervisory authority.',
    ],
  },
  {
    heading: '6. Children',
    paragraphs: [
      'The blog is written for school students, including teenagers preparing for BECE and WAEC. We do not knowingly collect personal information from children through accounts, because we do not offer accounts. Parents may email us to request deletion of any message that included a child’s personal data.',
    ],
  },
  {
    heading: '7. Retention and security',
    paragraphs: [
      'Email correspondence is kept only as long as needed to respond and maintain records. Analytics data retention follows Google’s account settings. We use TLS in transit and limit access to operational staff.',
    ],
  },
  {
    heading: '8. Your rights and contact',
    paragraphs: [
      `Email ${SITE.email} to request access, correction, deletion, or restriction of personal data we hold, or to object to processing where applicable. This policy was last updated 28 August 2026.`,
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
      `${SITE.legal} is not liable for exam results or school decisions. Use of the site is at your own judgement. Last updated 13 August 2026.`,
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
    a: 'Named writers with classroom experience draft each guide; an editorial reviewer checks accuracy and policy compliance. See our Editorial policy page for credentials. Articles are not copied mark schemes.',
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
