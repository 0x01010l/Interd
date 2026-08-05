import { GUIDE_BODIES } from './toolGuides';

export type ToolTemplate = {
  id: string;
  label: string;
  prompt: string;
};

export type ToolFaq = {
  question: string;
  answer: string;
};

export type ToolDefinition = {
  slug: string;
  name: string;
  path: string;
  title: string;
  metaDescription: string;
  h1: string;
  benefit: string;
  placeholder: string;
  systemPrompt: string;
  templates: ToolTemplate[];
  demoOutput: string;
  guide: {
    whatIs: string;
    howTo: [string, string, string];
    whyUseful: string;
    body: string;
  };
  faqs: ToolFaq[];
};

export const TOOLS: ToolDefinition[] = [
  {
    slug: 'product-description-generator',
    name: 'Product Description Generator',
    path: '/tools/product-description-generator',
    title: 'Free Product Description Generator for Ecommerce',
    metaDescription:
      'Create conversion-focused product descriptions for Shopify, Amazon, and online stores. Free AI tool with templates for funny, professional, and SEO-optimized copy.',
    h1: 'Product Description Generator',
    benefit: 'Turn basic product specs into clear, persuasive descriptions your customers actually want to read.',
    placeholder:
      'Example: Organic cotton tote bag, navy blue, 15L capacity, machine washable, ideal for daily errands and farmers markets…',
    systemPrompt:
      'You are an expert ecommerce copywriter. Write vivid, accurate product descriptions that highlight benefits, reduce objections, and stay truthful. Keep structure scannable with short paragraphs. Do not invent certifications or claims not provided by the user.',
    templates: [
      {
        id: 'funny',
        label: 'Funny',
        prompt:
          'Write a witty, lighthearted product description for: [paste product name + key features]. Keep it playful but still clear about materials, use cases, and who it is for.',
      },
      {
        id: 'professional',
        label: 'Professional',
        prompt:
          'Write a polished, trustworthy product description for: [paste product name + key features]. Emphasize quality, materials, and practical benefits in a confident tone.',
      },
      {
        id: 'seo',
        label: 'SEO-Optimized',
        prompt:
          'Write an SEO-friendly product description for: [paste product name + target keywords]. Naturally include search phrases, benefits, specs, and a soft call to action.',
      },
    ],
    demoOutput: `Introducing the Everyday Carry Tote — built for busy mornings, market runs, and everything in between.

Crafted from soft organic cotton with reinforced stitching, this 15-liter navy tote holds more than it looks while staying lightweight on your shoulder. The wide base keeps bottles upright, and the machine-washable fabric means coffee spills never become permanent residents.

Perfect for students, parents, and anyone who wants a durable bag that still looks polished. Pair it with your laptop sleeve or fold it flat when you need an extra bag on the go.

Choose the Everyday Carry Tote when you want simple, reliable style that works as hard as you do.`,
    guide: {
      whatIs:
        'A product description generator helps online sellers turn features into benefit-led copy without starting from a blank page. Instead of listing raw specs, it organizes your details into clear paragraphs that explain what the product does, why it matters, and who it is for — which is exactly what shoppers scan before they buy.',
      howTo: [
        'Paste your product name, materials, dimensions, and key differentiators into the box (or click a template to start faster).',
        'Choose a tone — Funny, Professional, or SEO-Optimized — then generate your first draft.',
        'Edit anything that feels off-brand, copy the result into your store, and save stronger versions in local history for reuse.',
      ],
      whyUseful:
        'Strong product copy reduces returns, improves search rankings, and raises conversion rates — especially when you sell dozens of SKUs and cannot hire a writer for every listing.',
      body: GUIDE_BODIES['product-description-generator'],
    },
    faqs: [
      {
        question: 'Can I use the generated descriptions on Shopify or Amazon?',
        answer:
          'Yes. Copy the output into any storefront or marketplace listing. Always review claims, pricing, and policy details before publishing so the text matches your actual product and store rules.',
      },
      {
        question: 'Will this tool invent product features?',
        answer:
          'It is designed to expand on what you provide. For best results, include only real specs and benefits. Remove any statement you cannot stand behind before you publish.',
      },
      {
        question: 'How long should a product description be?',
        answer:
          'Most catalogs convert well between 120 and 300 words: long enough to cover benefits and key specs, short enough to stay readable on mobile. Adjust length for category norms and competition.',
      },
    ],
  },
  {
    slug: 'shopify-title-generator',
    name: 'Shopify Title Generator',
    path: '/tools/shopify-title-generator',
    title: 'Shopify Product Title Generator — Free SEO Titles',
    metaDescription:
      'Generate clear, keyword-rich Shopify product titles that improve search visibility and click-through rates. Free templates for concise, keyword-rich, and benefit-focused titles.',
    h1: 'Shopify Title Generator',
    benefit: 'Build clean, searchable Shopify titles that help customers find and click your products faster.',
    placeholder: 'Example: Handmade ceramic mug, 12oz, matte black, dishwasher safe, gift for coffee lovers…',
    systemPrompt:
      'You are a Shopify merchandising specialist. Generate multiple product title options that are clear, keyword-aware, and under common marketplace length preferences. Prefer readable titles over keyword stuffing. Return a short list with brief notes.',
    templates: [
      {
        id: 'concise',
        label: 'Concise',
        prompt:
          'Generate 8 concise Shopify product titles for: [product details]. Keep them scannable, under ~70 characters where possible, and lead with the product type.',
      },
      {
        id: 'keyword',
        label: 'Keyword-Rich',
        prompt:
          'Generate 8 keyword-rich Shopify titles for: [product details + target keywords]. Naturally include modifiers like material, use case, and audience without stuffing.',
      },
      {
        id: 'benefit',
        label: 'Benefit-Focused',
        prompt:
          'Generate 8 benefit-focused Shopify titles for: [product details]. Emphasize the main outcome or promise while remaining factual and retail-friendly.',
      },
    ],
    demoOutput: `1. Matte Black Ceramic Mug 12oz — Dishwasher Safe
2. Handmade Ceramic Coffee Mug | 12oz Matte Black
3. 12oz Ceramic Mug for Coffee Lovers — Matte Black
4. Everyday Ceramic Mug 12oz | Dishwasher & Gift Ready
5. Matte Black Pottery Mug — 12oz Handmade Ceramic
6. Minimalist Ceramic Coffee Cup 12oz — Matte Finish
7. Durable Ceramic Mug 12oz for Home or Office
8. Gift-Ready Ceramic Mug | Matte Black 12oz`,
    guide: {
      whatIs:
        'A Shopify title generator creates listing titles that balance human readability with search discovery. Good titles tell shoppers what the product is within seconds and help Shopify search, Google Shopping, and internal filters surface the right item.',
      howTo: [
        'Enter the product type, key attributes (size, color, material), and optional target phrases.',
        'Choose Concise, Keyword-Rich, or Benefit-Focused templates, then generate a set of title options.',
        'Pick one primary title for the live listing and keep alternates for A/B testing or channel variants.',
      ],
      whyUseful:
        'Product titles are often the first — and sometimes only — text a shopper sees in search results. Weak titles bury great products; clear titles lift click-through and reduce mismatched purchases.',
      body: GUIDE_BODIES['shopify-title-generator'],
    },
    faqs: [
      {
        question: 'How long should a Shopify product title be?',
        answer:
          'Aim for roughly 50–70 characters when possible so titles remain readable on mobile grids. Shopify allows longer titles, but clarity usually beats maximum length.',
      },
      {
        question: 'Should I put every keyword in the title?',
        answer:
          'No. Put the highest-intent words in the title and move supporting phrases into the description, tags, and SEO metafields. Crowded titles hurt readability and trust.',
      },
      {
        question: 'Can I reuse titles across variants?',
        answer:
          'Use a shared base title and append unique attributes for each variant (size, color, scent). That keeps collections tidy while helping shoppers compare options.',
      },
    ],
  },
  {
    slug: 'etsy-tag-generator',
    name: 'Etsy Tag Generator',
    path: '/tools/etsy-tag-generator',
    title: 'Etsy Tag Generator — Free SEO Tags for Listings',
    metaDescription:
      'Generate relevant Etsy tags and keywords to improve listing discoverability. Free templates for trending, niche, and broad search terms.',
    h1: 'Etsy Tag Generator',
    benefit: 'Fill your 13 Etsy tags with relevant, buyer-intent keywords instead of guessing.',
    placeholder: 'Example: Personalized leather journal, A5, brown, gift for writers, handmade…',
    systemPrompt:
      'You are an Etsy SEO specialist. Generate practical Etsy tags (max ~20 characters each where possible) and related keyword phrases. Focus on how buyers actually search. Group tags and explain briefly how to use them.',
    templates: [
      {
        id: 'trending',
        label: 'Trending',
        prompt:
          'Suggest trending-style Etsy tags for: [product details]. Prioritize gift intent, seasonal relevance, and popular modifiers while staying accurate to the product.',
      },
      {
        id: 'niche',
        label: 'Niche',
        prompt:
          'Suggest niche, long-tail Etsy tags for: [product details]. Focus on specific materials, audiences, and use cases with lower competition.',
      },
      {
        id: 'broad',
        label: 'Broad',
        prompt:
          'Suggest a balanced mix of broader category tags and supporting phrases for: [product details]. Help the listing appear in both general and specific searches.',
      },
    ],
    demoOutput: `Recommended Etsy tags (13):
1. leather journal
2. personalized journal
3. writers gift
4. A5 notebook
5. handmade journal
6. custom notebook
7. brown leather diary
8. travel journal
9. gift for writers
10. refillable journal
11. engraved notebook
12. stationery gift
13. rustic journal

Extra keyword phrases for title/description:
- personalized leather journal for writers
- handmade A5 brown leather notebook
- custom engraved journal gift`,
    guide: {
      whatIs:
        'An Etsy tag generator helps makers choose the thirteen tags that connect a listing to buyer search queries. Tags work with your title and attributes to determine when Etsy’s search and Browse surfaces your item.',
      howTo: [
        'Describe the product, materials, recipient, and occasion in the prompt box.',
        'Select Trending, Niche, or Broad templates depending on whether you want discovery volume or precise intent.',
        'Copy the strongest thirteen tags into Etsy and mirror key phrases naturally in your title and description.',
      ],
      whyUseful:
        'Many handmade sellers leave tags half-empty or stuffed with irrelevant words. Better tags expand impressions without paying for ads on every click.',
      body: GUIDE_BODIES['etsy-tag-generator'],
    },
    faqs: [
      {
        question: 'How many Etsy tags should I use?',
        answer:
          'Use all 13 tags when you have relevant phrases. Empty slots waste discovery potential, but irrelevant tags can hurt listing quality.',
      },
      {
        question: 'Do tags have a character limit?',
        answer:
          'Yes. Etsy limits each tag to 20 characters. Prefer short, high-intent phrases and place longer keyword combinations in the title or description.',
      },
      {
        question: 'Should tags match my title exactly?',
        answer:
          'Overlap is fine, but tags should also cover synonyms and alternate search paths your title cannot fit. Think complementary, not identical.',
      },
    ],
  },
  {
    slug: 'review-reply-generator',
    name: 'Review Reply Generator',
    path: '/tools/review-reply-generator',
    title: 'Review Reply Generator for Ecommerce Stores',
    metaDescription:
      'Write polite, on-brand replies to customer reviews in seconds. Templates for grateful, problem-solving, and brand-voice responses.',
    h1: 'Review Reply Generator',
    benefit: 'Respond to customer reviews with professional, empathetic replies that protect your brand reputation.',
    placeholder: 'Paste the customer review and any order details you want reflected in the reply…',
    systemPrompt:
      'You write ecommerce review responses. Be courteous, specific, and concise. For negative reviews, acknowledge the issue and offer a clear next step without admitting legal liability. Never invent refunds or policies not implied by the user.',
    templates: [
      {
        id: 'grateful',
        label: 'Grateful',
        prompt:
          'Write a warm thank-you reply to this positive review: [paste review]. Mention a specific detail from the review and invite them back.',
      },
      {
        id: 'problem',
        label: 'Problem-Solving',
        prompt:
          'Write a calm, helpful reply to this critical review: [paste review]. Acknowledge the frustration, apologize for the experience, and invite them to contact support so we can make it right.',
      },
      {
        id: 'brand',
        label: 'Brand Voice',
        prompt:
          'Write a review reply that matches this brand voice: [describe voice]. Customer review: [paste review]. Keep it human and store-specific.',
      },
    ],
    demoOutput: `Hi Jordan — thank you so much for taking the time to leave this review. We’re thrilled the tote has become part of your market-day routine, and we love that the navy color still looks sharp after washing.

If you ever want a matching pouch or a second bag for travel days, we’d be happy to help. Grateful to have you as a customer!

— The Interdot Commerce Team`,
    guide: {
      whatIs:
        'A review reply generator drafts public responses to star ratings and written feedback. Thoughtful replies show prospective buyers that a real team stands behind the store — especially when something goes wrong.',
      howTo: [
        'Paste the customer’s review and note the outcome you want (thank, clarify, or invite offline resolution).',
        'Choose Grateful for praise, Problem-Solving for issues, or Brand Voice when you have a defined tone.',
        'Personalize names and policy details, then post the reply and save examples you want your team to reuse.',
      ],
      whyUseful:
        'Unanswered reviews look neglected. Slow or defensive replies can escalate tension. Fast, consistent responses improve trust signals across your storefront and marketplace profiles.',
      body: GUIDE_BODIES['review-reply-generator'],
    },
    faqs: [
      {
        question: 'Should I reply to every review?',
        answer:
          'Prioritize recent reviews and all negative ones. Thanking top positive reviews is also valuable when volume is manageable.',
      },
      {
        question: 'What if the review is unfair?',
        answer:
          'Stay factual and polite. Correct misunderstandings briefly, then move detailed dispute handling offline. Avoid arguing point-by-point in public.',
      },
      {
        question: 'Can I automate sending replies?',
        answer:
          'This tool drafts text only. Always review before posting so names, order facts, and policy promises remain accurate.',
      },
    ],
  },
  {
    slug: 'ad-copy-generator',
    name: 'Ad Copy Generator',
    path: '/tools/ad-copy-generator',
    title: 'Ecommerce Ad Copy Generator — Ads & Social',
    metaDescription:
      'Generate high-converting ecommerce ad copy for Meta, Google, and social posts. Templates for urgency, social proof, and feature-benefit angles.',
    h1: 'Ad Copy Generator',
    benefit: 'Draft scroll-stopping ad primary text and headlines tailored to your product offer.',
    placeholder: 'Example: Summer sale — 20% off reef-safe sunscreen SPF 50, free shipping over $40…',
    systemPrompt:
      'You are a direct-response ecommerce copywriter. Create ad variants with headlines, primary text, and short CTAs. Stay truthful to the offer details provided. Avoid prohibited medical claims unless supplied by the user.',
    templates: [
      {
        id: 'urgency',
        label: 'Urgency',
        prompt:
          'Write 5 urgency-focused ad variants for: [offer details]. Include headline, primary text, and CTA. Only use deadlines or scarcity that I explicitly provide.',
      },
      {
        id: 'social',
        label: 'Social Proof',
        prompt:
          'Write 5 social-proof ad variants for: [product + reviews/stats I provide]. Highlight trust signals without inventing numbers.',
      },
      {
        id: 'feature',
        label: 'Feature-Benefit',
        prompt:
          'Write 5 feature-to-benefit ad variants for: [product details]. Each line should show what the feature does for the customer.',
      },
    ],
    demoOutput: `Variant 1 — Urgency
Headline: Summer SPF Restock Is Live
Primary: Sun season starts now. Get 20% off our reef-safe SPF 50 today and free shipping on orders over $40. Limited sale window — grab yours before sizes sell through.
CTA: Shop the sale

Variant 2 — Social Proof
Headline: 4.8★ From 1,200+ Beach Days
Primary: Customers call it their “no white cast” favorite. Lightweight SPF 50 protection with reef-conscious ingredients — now 20% off for a short summer drop.
CTA: See reviews & shop`,
    guide: {
      whatIs:
        'An ad copy generator produces campaign-ready text for paid social and search creatives. It helps you test multiple angles quickly — urgency, proof, and benefit framing — without hiring a freelancer for every flight.',
      howTo: [
        'Paste the offer, discount rules, product benefits, and any real proof points you can legally claim.',
        'Pick a creative angle template and generate several variants for testing.',
        'Approve the strongest lines, match them to compliant imagery, and save winners for future campaigns.',
      ],
      whyUseful:
        'Creative fatigue is costly. Fresh, specific copy improves CTR and lowers CPA when paired with solid landing pages and honest offers.',
      body: GUIDE_BODIES['ad-copy-generator'],
    },
    faqs: [
      {
        question: 'Does this create images or only text?',
        answer:
          'Text only — headlines, primary copy, and CTAs. Pair the output with your brand creatives or a separate design workflow.',
      },
      {
        question: 'Can I use this for Google Responsive Search Ads?',
        answer:
          'Yes. Ask for multiple short headlines and descriptions in your prompt, then map them into RSA assets within character limits.',
      },
      {
        question: 'How do I avoid disapproved ads?',
        answer:
          'Do not invent personal attributes, misleading discounts, or unsupported health claims. Stick to provable product facts and policy-safe language.',
      },
    ],
  },
  {
    slug: 'product-faq-generator',
    name: 'Product FAQ Generator',
    path: '/tools/product-faq-generator',
    title: 'Product FAQ Generator for Ecommerce Listings',
    metaDescription:
      'Create helpful product FAQ sections that answer buyer objections before checkout. Free templates for objections, shipping, and specs.',
    h1: 'Product FAQ Generator',
    benefit: 'Answer the questions shoppers ask before buying — and reduce support tickets after.',
    placeholder: 'Example: Wireless earbuds, 28-hour battery with case, IPX4, USB-C charging, 1-year warranty…',
    systemPrompt:
      'You create ecommerce product FAQs. Write clear question-and-answer pairs based only on provided product facts. Flag unknowns instead of guessing. Keep answers concise and trustworthy.',
    templates: [
      {
        id: 'objections',
        label: 'Buyer Objections',
        prompt:
          'Create 8 FAQ items that handle common buyer objections for: [product details]. Focus on durability, fit, compatibility, and value.',
      },
      {
        id: 'shipping',
        label: 'Shipping & Returns',
        prompt:
          'Create FAQ copy about shipping, delivery estimates, and returns for: [product + policy details I provide]. Do not invent timelines I did not include.',
      },
      {
        id: 'specs',
        label: 'Specs',
        prompt:
          'Create a specifications-focused FAQ for: [product details]. Cover materials, measurements, care, and compatibility in plain language.',
      },
    ],
    demoOutput: `Q: How long does the battery last?
A: You get up to 7 hours on a single charge and about 28 hours total with the charging case, based on moderate volume use.

Q: Are these earbuds workout-friendly?
A: Yes — they are rated IPX4 for sweat and light rain resistance. They are not designed for swimming.

Q: What is covered under warranty?
A: A 1-year limited warranty covers manufacturing defects. Accidental damage is not included; contact support with your order number for help.`,
    guide: {
      whatIs:
        'A product FAQ generator builds the question-and-answer blocks that belong on product pages, packaging inserts, and help centers. Good FAQs preempt objections and improve on-page SEO with natural language queries.',
      howTo: [
        'Provide specs, care instructions, and real policy details your store supports.',
        'Choose Buyer Objections, Shipping & Returns, or Specs templates to target a gap on the page.',
        'Publish the FAQs beneath your description and update them when policies or materials change.',
      ],
      whyUseful:
        'Many support tickets are repeats of the same five questions. Answering them on the listing builds trust and frees your inbox for true exceptions.',
      body: GUIDE_BODIES['product-faq-generator'],
    },
    faqs: [
      {
        question: 'How many FAQs should a product page include?',
        answer:
          'Five to ten high-value questions usually work. Prioritize what customers already ask rather than padding with filler.',
      },
      {
        question: 'Can FAQs help SEO?',
        answer:
          'Yes. Natural-language questions can capture long-tail search intent. Pair them with clear answers and, where suitable, FAQ structured data.',
      },
      {
        question: 'What if I do not know an answer yet?',
        answer:
          'Leave it out until operations confirms the detail. Guessing shipping times or care instructions creates refunds and chargebacks.',
      },
    ],
  },
  {
    slug: 'seo-meta-generator',
    name: 'SEO Meta Generator',
    path: '/tools/seo-meta-generator',
    title: 'SEO Meta Title & Description Generator',
    metaDescription:
      'Generate click-worthy SEO titles and meta descriptions for ecommerce product and collection pages. Free templates for CTR, keywords, and benefits.',
    h1: 'SEO Meta Generator',
    benefit: 'Write meta titles and descriptions that earn clicks from search — without keyword stuffing.',
    placeholder: 'Example: Collection page for minimal gold hoop earrings, handmade, ships worldwide…',
    systemPrompt:
      'You are an ecommerce SEO copywriter. Produce meta titles (~50–60 characters) and meta descriptions (~140–160 characters) that are compelling and accurate. Provide multiple options with character counts.',
    templates: [
      {
        id: 'click',
        label: 'Click-Worthy',
        prompt:
          'Create 5 click-worthy meta titles and descriptions for: [page topic]. Optimize for CTR while staying honest about the page content.',
      },
      {
        id: 'dense',
        label: 'Keyword Dense',
        prompt:
          'Create 5 keyword-informed meta titles and descriptions for: [page topic + primary/secondary keywords]. Keep them readable.',
      },
      {
        id: 'benefit',
        label: 'Benefit First',
        prompt:
          'Create 5 benefit-first meta titles and descriptions for: [page topic]. Lead with the shopper outcome, then supporting details.',
      },
    ],
    demoOutput: `Option 1
Title (58): Minimal Gold Hoop Earrings | Handmade Everyday Hoops
Description (156): Shop lightweight handmade gold hoop earrings designed for daily wear. Minimal silhouettes, gift-ready packaging, and worldwide shipping.

Option 2
Title (54): Handmade Gold Hoops for Everyday Outfits
Description (149): Discover minimal gold hoop earrings crafted for comfort and simple layering. Explore sizes, finishes, and gift sets shipping worldwide.`,
    guide: {
      whatIs:
        'An SEO meta generator drafts the title tags and meta descriptions that appear in search engine results. These snippets do not guarantee rankings alone, but they strongly influence whether searchers click your result.',
      howTo: [
        'Describe the page type (product, collection, blog) and list primary keywords.',
        'Generate Click-Worthy, Keyword Dense, or Benefit First variants.',
        'Paste the approved pair into your theme’s SEO fields and verify character length on mobile SERTs.',
      ],
      whyUseful:
        'Default themes often auto-pull thin descriptions. Custom meta copy improves click-through rate, which can indirectly support organic performance.',
      body: GUIDE_BODIES['seo-meta-generator'],
    },
    faqs: [
      {
        question: 'Do meta descriptions affect rankings directly?',
        answer:
          'They are not a strong direct ranking factor, but better CTR from compelling, accurate snippets can improve traffic to already-visible pages.',
      },
      {
        question: 'What length should I target?',
        answer:
          'Roughly 50–60 characters for titles and 140–160 for descriptions is a practical starting range. Google may rewrite snippets, so on-page clarity still matters.',
      },
      {
        question: 'Should every product have unique metas?',
        answer:
          'Yes whenever possible. Unique metas reduce duplication across large catalogs and help each URL earn its own search impression share.',
      },
    ],
  },
  {
    slug: 'bulk-description-rewriter',
    name: 'Bulk Description Rewriter',
    path: '/tools/bulk-description-rewriter',
    title: 'Bulk Product Description Rewriter',
    metaDescription:
      'Rewrite existing product descriptions to be shorter, more unique, or new in tone. Ideal for catalog refreshes and marketplace duplication cleanup.',
    h1: 'Bulk Description Rewriter',
    benefit: 'Refresh old catalog copy into cleaner, unique listings without rewriting every SKU from scratch.',
    placeholder:
      'Paste one or more product descriptions (separate with ---). Example:\nSoft fleece hoodie...\n---\nWaterproof dog coat...',
    systemPrompt:
      'You rewrite ecommerce product descriptions. Preserve factual accuracy while improving clarity and uniqueness. When multiple products are provided, rewrite each separately and keep them clearly separated.',
    templates: [
      {
        id: 'shorter',
        label: 'Shorter',
        prompt:
          'Rewrite the following product description(s) to be shorter and clearer while keeping key facts: [paste copy]. Separate multiple products clearly.',
      },
      {
        id: 'unique',
        label: 'Unique Spin',
        prompt:
          'Rewrite the following description(s) to be more unique and less generic for marketplace upload: [paste copy]. Keep claims truthful.',
      },
      {
        id: 'tone',
        label: 'Tone Shift',
        prompt:
          'Rewrite the following description(s) in this tone: [tone]. Source copy: [paste copy]. Maintain specs and offer details.',
      },
    ],
    demoOutput: `Product 1 — Soft Fleece Hoodie
Stay warm without bulk. This midweight fleece hoodie adds everyday comfort with a roomy kangaroo pocket and ribbed cuffs that keep their shape wash after wash. Soft on skin, easy to layer, ready for cool mornings.

Product 2 — Waterproof Dog Coat
Keep walks on schedule when the weather is not. This lightweight waterproof coat blocks wind and rain while leaving room for natural movement. Adjustable straps help you get a secure fit in seconds.`,
    guide: {
      whatIs:
        'A bulk description rewriter modernizes existing catalog text. Paste several descriptions, choose a rewrite goal, and receive refreshed versions you can upload across channels.',
      howTo: [
        'Paste one or multiple descriptions, separating SKUs with a blank line or ---.',
        'Choose Shorter, Unique Spin, or Tone Shift depending on whether you need compression, differentiation, or voice alignment.',
        'Review facts, then download a text file for your import spreadsheet or PIM.',
      ],
      whyUseful:
        'Supplier copy is often duplicated across competitors. Unique, clearer descriptions support SEO, brand trust, and marketplace compliance.',
      body: GUIDE_BODIES['bulk-description-rewriter'],
    },
    faqs: [
      {
        question: 'How many descriptions can I paste at once?',
        answer:
          'Start with a few SKUs per run so you can review quality. Extremely large pastes may hit length limits — batch your catalog.',
      },
      {
        question: 'Will rewriting guarantee unique SEO rankings?',
        answer:
          'No tool can guarantee rankings. Unique, helpful copy is one part of SEO alongside authority, technical health, and demand.',
      },
      {
        question: 'Can I change tone for marketplace vs brand site?',
        answer:
          'Yes. Use Tone Shift with instructions like “marketplace-neutral” or “premium brand voice,” then keep separate versions in history.',
      },
    ],
  },
];

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return TOOLS.find((t) => t.slug === slug);
}
