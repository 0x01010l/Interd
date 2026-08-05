import type { ToolFaq } from './tools';

/** Per-tool identity so generator pages are not near-duplicates. */
export type ToolPageExtra = {
  bestFor: string;
  outputShape: string;
  editorialAngle: string;
  checklist: [string, string, string];
  extraFaqs: ToolFaq[];
};

export const TOOL_PAGE_EXTRAS: Record<string, ToolPageExtra> = {
  'product-description-generator': {
    bestFor: 'Catalog teams drafting or refreshing PDP body copy for Shopify, WooCommerce, and Amazon.',
    outputShape: '2–4 benefit-led paragraphs with scannable specifics (materials, capacity, care).',
    editorialAngle:
      'This page is about merchandising narrative — converting factory facts into shopper-readable benefits — not titles, tags, or ads.',
    checklist: [
      'Every material, size, and care claim matches the SKU.',
      'Opening line states product type + primary benefit.',
      'No invented certifications or warranty language.',
    ],
    extraFaqs: [
      {
        question: 'How is this different from ChatGPT?',
        answer:
          'It is constrained to ecommerce product copy with tone templates and listing-focused system guidance. You still edit for brand voice and accuracy before publish.',
      },
      {
        question: 'Can I generate variants for the same SKU?',
        answer:
          'Yes. Run Funny, Professional, and SEO templates, then keep the strongest paragraphs. Local history stores recent drafts on your device only.',
      },
    ],
  },
  'shopify-title-generator': {
    bestFor: 'Merchants naming products for Shopify collections, store search, and Shopping feeds.',
    outputShape: 'A ranked list of title options (typically under ~70 characters) with different emphasis.',
    editorialAngle:
      'Focused only on product titles — not full descriptions or meta tags. Clarity in the collection grid is the goal.',
    checklist: [
      'Lead with the product type shoppers would search.',
      'Include one differentiating attribute (size, material, pack).',
      'Avoid stuffing synonyms or “best/sale” spam.',
    ],
    extraFaqs: [
      {
        question: 'Will long titles rank better?',
        answer:
          'Usually not. Readable specificity outperforms keyword piles. Put secondary phrases in description, tags, or metafields.',
      },
      {
        question: 'How should I title color or size variants?',
        answer:
          'Keep a shared base phrase and append the unique attribute so variants stay comparable in admin and on the storefront.',
      },
    ],
  },
  'etsy-tag-generator': {
    bestFor: 'Handmade and craft sellers filling Etsy’s 13-tag slots with buyer-intent phrases.',
    outputShape: 'Up to 13 short tags (≈20 characters each) plus optional longer phrases for title/description.',
    editorialAngle:
      'Marketplace tag strategy only — complementary to titles and attributes, not a replacement for listing copy.',
    checklist: [
      'Use all 13 slots when phrases are truthful.',
      'Mix niche and broader category tags.',
      'Drop any tag that does not describe the item.',
    ],
    extraFaqs: [
      {
        question: 'Do tags alone make listings rank?',
        answer:
          'No. Tags work with title, attributes, photos, and conversion history. Poor photos still sink well-tagged listings.',
      },
      {
        question: 'Should I reuse the same 13 tags on every listing?',
        answer:
          'No. Share a few category tags, but customize materials, recipient, and occasion phrases per SKU.',
      },
    ],
  },
  'review-reply-generator': {
    bestFor: 'Support and brand teams drafting public replies to star ratings and written feedback.',
    outputShape: 'A short customer-facing reply you can post after a human checks names and policies.',
    editorialAngle:
      'Customer-communication drafting — empathy and next steps — not product listing SEO or ad creatives.',
    checklist: [
      'Reflect a real detail from the review.',
      'Never invent refunds or promises not in your policy.',
      'Move heated disputes to private support quickly.',
    ],
    extraFaqs: [
      {
        question: 'Should replies sound identical for every customer?',
        answer:
          'No. Templates speed first drafts; personalize names and specifics so replies do not look templated spam.',
      },
      {
        question: 'What about reviews that mention competitors?',
        answer:
          'Stay respectful and factual. Highlight your strengths without attacking other brands in public replies.',
      },
    ],
  },
  'ad-copy-generator': {
    bestFor: 'Performance marketers testing Meta, Google, and social primary text for product offers.',
    outputShape: 'Multiple ad variants with headline, primary text, and CTA — text assets only.',
    editorialAngle:
      'Paid creative copy angles (urgency, proof, feature-benefit). Not organic PDP descriptions or SEO titles.',
    checklist: [
      'Only use discounts or scarcity you explicitly provide.',
      'Match claims to the landing page.',
      'Strip unsupported health or income claims.',
    ],
    extraFaqs: [
      {
        question: 'Can this write full campaign strategies?',
        answer:
          'No. It drafts ad text variants for testing. Audience, budget, and bid strategy stay with your ads platform.',
      },
      {
        question: 'How many variants should I test?',
        answer:
          'Start with three distinct angles, kill losers quickly, and iterate winners. Creative fatigue arrives fast on social.',
      },
    ],
  },
  'product-faq-generator': {
    bestFor: 'PDP and help-center teams answering pre-purchase objections and care questions.',
    outputShape: 'Clear Q&A pairs grounded only in the specs and policies you supply.',
    editorialAngle:
      'Objection-handling FAQ blocks for listings — distinct from SEO meta snippets or review replies.',
    checklist: [
      'Omit anything ops has not confirmed.',
      'Prefer five strong answers over ten vague ones.',
      'Update when shipping or materials change.',
    ],
    extraFaqs: [
      {
        question: 'Where should FAQs sit on the product page?',
        answer:
          'Usually under the description or in an accordion near add-to-cart so mobile shoppers see answers without hunting.',
      },
      {
        question: 'Can I reuse FAQs across a whole collection?',
        answer:
          'Share policy FAQs (shipping/returns) and write SKU-specific ones for fit, materials, and compatibility.',
      },
    ],
  },
  'seo-meta-generator': {
    bestFor: 'SEO and content ops writing title tags and meta descriptions for products and collections.',
    outputShape: 'Paired meta titles (~50–60 chars) and descriptions (~140–160 chars) with length notes.',
    editorialAngle:
      'SERP snippet writing only — not full product body copy, Etsy tags, or paid ad primary text.',
    checklist: [
      'Match the live page promise (no bait titles).',
      'One primary keyword, written naturally.',
      'Unique metas per URL when possible.',
    ],
    extraFaqs: [
      {
        question: 'Will Google show my exact meta description?',
        answer:
          'Not always. Google may rewrite snippets. Accurate on-page headings and intro copy still matter.',
      },
      {
        question: 'Should blog posts use this tool too?',
        answer:
          'Yes for guides and collection pages. Keep product metas SKU-specific and blog metas article-specific.',
      },
    ],
  },
  'bulk-description-rewriter': {
    bestFor: 'Catalog ops cleaning duplicated supplier copy across many SKUs before marketplace upload.',
    outputShape: 'Rewritten descriptions kept separate per SKU (use --- between inputs).',
    editorialAngle:
      'Rewrite and compress existing text at batch scale — not first-draft generation from raw specs alone.',
    checklist: [
      'Preserve safety warnings and real specs.',
      'Batch a few SKUs per run for QA.',
      'Archive originals before overwriting PIM fields.',
    ],
    extraFaqs: [
      {
        question: 'Is bulk rewriting the same as generating new copy?',
        answer:
          'No. This tool assumes you already have source text. Use the Product Description Generator when starting from specs only.',
      },
      {
        question: 'What separator should I use between products?',
        answer:
          'A blank line or --- between SKUs works well. Label each block with a SKU ID when possible for import mapping.',
      },
    ],
  },
};
