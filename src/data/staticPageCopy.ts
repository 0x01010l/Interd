/** Shared legal/static page copy for React pages and prerender. */

export const PRIVACY_SECTIONS: { heading: string; paragraphs: string[] }[] = [
  {
    heading: '1. Introduction',
    paragraphs: [
      'Interdot, a brand operated by FIX FIGURES LLC (“we,” “our,” or “us”), is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our custom AI agent services and free AI writing tools at interdot.net.',
    ],
  },
  {
    heading: '2. Data Collection & Usage',
    paragraphs: [
      'We collect information necessary to provide high-fidelity reasoning services and website functionality. This may include technical identifiers (such as IP address for abuse prevention and rate limiting), API usage logs, contact form submissions, and any data you explicitly provide for vector training or enterprise services.',
    ],
  },
  {
    heading: '3. AI Tools & Azure OpenAI',
    paragraphs: [
      'Our free ecommerce AI tools send your prompts to Microsoft Azure OpenAI for processing so we can return generated text. User inputs submitted to these tools are not stored in an Interdot user content database. Prompts are transmitted to Azure solely to generate a response and for short-lived operational needs such as in-memory rate limiting and identical-request caching (cache entries expire automatically).',
      'Do not submit passwords, payment card numbers, government IDs, or other highly sensitive personal data into tool prompts. Generation history saved in your browser (localStorage) stays on your device and is not uploaded to our servers.',
    ],
  },
  {
    heading: '4. Cookies & Consent',
    paragraphs: [
      'We use essential cookies required to operate the site (for example, remembering your cookie preference and local tool history on your device). Non-essential cookies — including Google Analytics measurement cookies and advertising cookies for Google AdSense when ads are enabled — are used only after you choose Accept all on our cookie banner.',
      'If you choose Essential only, we do not load Google Analytics or advertising cookies. You can clear site data in your browser to see the banner again and change your choice. Details about advertising partners appear in the AdSense section below.',
    ],
  },
  {
    heading: '5. Google AdSense & Advertising',
    paragraphs: [
      'We may display advertisements through Google AdSense or similar partners. Third-party vendors, including Google, may use cookies to serve ads based on a user’s prior visits to this or other websites. You can opt out of personalized advertising by visiting Google’s Ads Settings. Ad slots on tool pages may appear as placeholders until ads are enabled.',
    ],
  },
  {
    heading: '6. Data Encryption',
    paragraphs: [
      'Data in transit is protected using TLS. Enterprise reasoning workloads additionally employ encryption at rest using industry-standard protocols and access controls.',
    ],
  },
  {
    heading: '7. GDPR & Global Compliance',
    paragraphs: [
      'We adhere to GDPR, CCPA, and other applicable data protection regulations. Users may request access, rectification, or deletion of personal data we hold by contacting contact@interdot.net.',
    ],
  },
  {
    heading: '8. Children’s Privacy',
    paragraphs: [
      'Our services are not directed to children under 13, and we do not knowingly collect personal information from children.',
    ],
  },
  {
    heading: '9. Contact',
    paragraphs: [
      'Privacy questions: contact@interdot.net. Mailing address: 6545 Market Avenue North, North Canton, 44721, OH, US.',
    ],
  },
];

export const TERMS_SECTIONS: { heading: string; paragraphs: string[] }[] = [
  {
    heading: '1. Acceptance of Terms',
    paragraphs: [
      'By accessing or using the Interdot platform, operated by FIX FIGURES LLC and doing business as “Interdot,” you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with these terms, you are prohibited from using the service.',
    ],
  },
  {
    heading: '2. Free AI Tools',
    paragraphs: [
      'Interdot provides free AI writing utilities for ecommerce content. Outputs are generated automatically and may contain errors. You are responsible for reviewing, editing, and verifying all generated content before publishing or relying on it commercially. Fair-use rate limits apply. Abuse, automated scraping, or attempts to bypass limits may result in blocked access.',
    ],
  },
  {
    heading: '3. Intellectual Property',
    paragraphs: [
      'The “Reasoning Layer,” proprietary algorithms, vectorization protocols, website design, and guides are the exclusive intellectual property of Interdot / FIX FIGURES LLC. Subject to these terms, you may use tool outputs for your own business listings and marketing.',
    ],
  },
  {
    heading: 'Non-Reliance Clause',
    paragraphs: [
      'While Interdot provides high-fidelity reasoning, deterministic logic chains, and AI drafting tools, the final financial, security, marketing, or strategic decisions rest solely with the user. Interdot is not a financial advisor, licensed security firm, or legal counsel. Our outputs are intended to assist in decision-making and drafting, not replace human judgment or professional consultation.',
    ],
  },
  {
    heading: '4. Account Termination',
    paragraphs: [
      'We reserve the right to terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.',
    ],
  },
  {
    heading: '5. Governing Law',
    paragraphs: [
      'These terms shall be governed and construed in accordance with the laws of the State of Ohio, United States, without regard to its conflict of law provisions, unless mandatory local consumer law provides otherwise.',
    ],
  },
  {
    heading: '6. Limitation of Liability',
    paragraphs: [
      'In no event shall Interdot be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, or other intangible losses resulting from your use of the service or AI tools.',
    ],
  },
];

export const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: 'What does Interdot do?',
    a: 'Interdot (FIX FIGURES LLC) builds custom AI agents for ecommerce, finance, and cybersecurity niches, and publishes free ecommerce writing tools that demonstrate those agent workflows. Contact us for custom agents, or start with free tools on this site.',
  },
  {
    q: 'Are the free tools really free?',
    a: 'Yes. Each writing tool is free to use in the browser. We apply a fair-use daily limit (20 generations per day per visitor) to prevent abuse. Demo samples are available when generation is unavailable.',
  },
  {
    q: 'Do you store my prompts in a user database?',
    a: 'Tool prompts are sent to Azure OpenAI to generate a response. We do not keep a user content database of your prompts. Generation history you save stays in your browser (localStorage) unless you clear it.',
  },
  {
    q: 'How do custom agents differ from free tools?',
    a: 'Free tools are public, scoped writing assistants for common ecommerce tasks. Custom agents are built for your niche workflow — grounded on your data, policies, and stack — and delivered as a commissioned project.',
  },
  {
    q: 'Which niches do you build agents for?',
    a: 'Primary niches are ecommerce ops (listing and support writing), finance decision workflows, and cybersecurity / security-ops investigation assistants. Tell us your use case on the Contact page.',
  },
  {
    q: 'How do you reduce hallucinations in agent outputs?',
    a: 'We scope agents to verified inputs, policies, and allowed actions. When a conclusion cannot be grounded, systems should flag uncertainty instead of inventing facts. Free tools also warn you to human-edit before publish.',
  },
  {
    q: 'Is proprietary training data shared into a global model?',
    a: 'No. Custom agent training for enterprise work is siloed. Your proprietary data is not used to train a shared public model for other customers.',
  },
  {
    q: 'Who publishes this website?',
    a: 'Interdot is operated by FIX FIGURES LLC, based at 6545 Market Avenue North, North Canton, OH 44721, US. Reach us at contact@interdot.net. Full publisher details are on the About page.',
  },
  {
    q: 'How do cookies and Analytics work?',
    a: 'Essential cookies run the site. Google Analytics and advertising cookies load only if you choose Accept all on the cookie banner. Essential only keeps measurement and ads cookies off.',
  },
  {
    q: 'Can I use generated copy commercially?',
    a: 'Yes, subject to our Terms of Use. You are responsible for reviewing accuracy, trademarks, and platform policies before publishing product or ad content.',
  },
  {
    q: 'Where can I learn how to write better listing copy?',
    a: 'Each tool includes a human-written guide and FAQ. The Blog has deeper ecommerce writing articles linked to the matching free tool.',
  },
  {
    q: 'How do I request a custom agent?',
    a: 'Email contact@interdot.net or use the Contact form. Describe the niche, workflow, data sources, and success criteria so we can scope the agent properly.',
  },
];

export const ABOUT_COPY = {
  missionTitle: 'Custom AI agents for real business niches.',
  missionBody:
    'Interdot builds custom AI agents for ecommerce, finance, and cybersecurity — then proves the methods with free tools anyone can try. Operated by FIX FIGURES LLC, we focus on agent workflows teams can trust, audit, and ship.',
  publisher: {
    brand: 'Interdot',
    legal: 'FIX FIGURES LLC',
    website: 'https://interdot.net',
    email: 'contact@interdot.net',
    support: 'advisory@interdot.net',
    addressLines: [
      '6545 Market Avenue North',
      'North Canton, OH 44721',
      'United States',
    ],
    publishNote:
      'We publish practical ecommerce writing tools, explanatory guides, and information about custom AI agent services. Tool guides and blog articles are written for merchants and operators — not as placeholders for advertising.',
    whatWePublish: 'Custom AI agents and free ecommerce writing tools for merchants and operators.',
  },
  nicheAgents:
    'We do not ship generic chatbots. Each custom agent is scoped to a niche workflow — product listing ops, financial reasoning, or security investigation — with clear inputs, policies, and outputs.',
  proofBeforePitch:
    'Free ecommerce writing tools are living demos of the same agent approach: structured prompts, practical guides, and Azure OpenAI on the server so keys never touch the browser.',
  agentsAndTools:
    'Custom agents help teams automate niche work with guardrails. Free tools — product descriptions, Shopify titles, Etsy tags, review replies, ad copy, FAQs, SEO metas, and bulk rewrites — show how writing agents behave in public, with human-written guidance on every page. When you need a deeper agent for your catalog, risk desk, or security stack, the same Interdot team designs, grounds, and ships it.',
  commitment:
    'We build AI that operators can explain. Custom agents are designed to be reviewable and useful in regulated or high-stakes niches, while free tools stay practical, private, and easy for merchants to adopt.',
};
