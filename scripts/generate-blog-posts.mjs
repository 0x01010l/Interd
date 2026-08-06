#!/usr/bin/env node
/**
 * One-shot generator for src/data/blogPosts.ts
 * Run: node scripts/generate-blog-posts.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '../src/data/blogPosts.ts');

const TOOLS = {
  pdg: { toolPath: '/tools/product-description-generator', toolLabel: 'Product Description Generator' },
  stg: { toolPath: '/tools/shopify-title-generator', toolLabel: 'Shopify Title Generator' },
  etg: { toolPath: '/tools/etsy-tag-generator', toolLabel: 'Etsy Tag Generator' },
  rrg: { toolPath: '/tools/review-reply-generator', toolLabel: 'Review Reply Generator' },
  acg: { toolPath: '/tools/ad-copy-generator', toolLabel: 'Ad Copy Generator' },
  smg: { toolPath: '/tools/seo-meta-generator', toolLabel: 'SEO Meta Generator' },
  pfg: { toolPath: '/tools/product-faq-generator', toolLabel: 'Product FAQ Generator' },
  bdr: { toolPath: '/tools/bulk-description-rewriter', toolLabel: 'Bulk Description Rewriter' },
  suite: { toolPath: '/tools', toolLabel: 'AI Tools Suite' },
};

function words(paras) {
  return paras.join(' ').trim().split(/\s+/).filter(Boolean).length;
}

function readTime(paras) {
  const w = words(paras);
  return `${Math.max(4, Math.ceil(w / 200))} min`;
}

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

/** Spread dates from 2025-02-12 through 2026-08-05 inclusive across n posts (newest last for generation; we'll reverse for newest-first export). */
function spreadDates(n) {
  const start = Date.UTC(2025, 1, 12); // Feb 12, 2025
  const end = Date.UTC(2026, 7, 5); // Aug 5, 2026
  const dates = [];
  for (let i = 0; i < n; i++) {
    const t = start + Math.round((i / (n - 1)) * (end - start));
    const d = new Date(t);
    const y = d.getUTCFullYear();
    const m = String(d.getUTCMonth() + 1).padStart(2, '0');
    const day = String(d.getUTCDate()).padStart(2, '0');
    dates.push(`${y}-${m}-${day}`);
  }
  return dates;
}

// --- Content builders: each returns unique ~900-1200 word content arrays ---

const postsSpec = [
  {
    slug: 'how-to-write-product-descriptions-that-convert',
    title: 'How to Write Product Descriptions That Convert',
    description:
      'A practical framework for turning product features into buyer-focused copy that improves conversion rates and reduces “not as expected” refunds.',
    tool: 'pdg',
    content: [
      'Great product pages do more than list specs. They answer a quiet question every shopper has: will this solve my problem better than the next tab I have open? Conversion-focused descriptions connect materials, measurements, and construction details to outcomes people actually care about — comfort, durability, status, convenience, time saved, or money protected. When you lead with machinery language instead of outcomes, you force the shopper to do the translation work themselves, and many of them simply leave.',
      'Start with research, not adjectives. Mine customer reviews, support tickets, live chat transcripts, and sales calls for phrases buyers already use. If people say “doesn’t pill after washing,” that belongs in the copy more than a vague “premium quality.” Build a swipe file of recurring praise and recurring complaints. Praise tells you what to amplify. Complaints tell you what to clarify, qualify, or redesign. Writers who skip this step often produce pretty paragraphs that still miss the objections killing the sale.',
      'Structure the page before you style the sentences. A reliable order for most SKUs is: primary benefit in the first screen, short proof that the benefit is real, practical details that prevent returns, then secondary stories that reinforce brand. Mobile shoppers often decide within the first viewport. If your opening paragraph is a brand myth with no product clarity, you are asking them to scroll on trust alone. Put the “what it is” and “who it is for” early enough that a hurried buyer never wonders.',
      'Translate features into consequences without inventing claims. “Triple-stitched seams” becomes “handles daily packing without ripping at the corners.” “320 gsm cotton” becomes “holds shape after washing and feels substantial in hand.” The feature still belongs on the page for the detail-oriented shopper, but the consequence does the persuasive work for everyone else. Keep a one-to-one map from approved specs to benefit lines so new team members cannot invent properties under launch pressure.',
      'Honest limitations are a conversion tool, not a conversion leak. If the jacket is water-resistant rather than waterproof, say so. If the blender is loud at high speed, say so. Shoppers who filter themselves out become cheaper support queues and fewer chargebacks. The people who still buy after seeing a clear limit tend to leave more stable reviews. Fake perfection is a short-term conversion hack that taxes your refund rate later.',
      'Write for scanning. Short paragraphs, specific numbers, and labeled subsections help. Prefer “fits 15-inch laptops with cases under 1.5 inches thick” over “fits most laptops.” Specificity reduces ambiguity, and ambiguity is where returns breed. Use bullets for dimensions, pack contents, and care — not for vague lifestyle slogans. Narrative sentences can carry the story; bullets should carry the facts that prevent packing and fit mistakes.',
      'Match imagery and copy so they tell the same story. If the description mentions a removable strap, the gallery should show it. If you claim “includes charging cable,” the unboxing photo should include it. Mismatched media and text create a low-grade distrust that shows up as hesitation at the buy button. Treat PDP creation as one release owned by merchandising, writing, and photography together — not a relay race with silent handoffs.',
      'Localize claims to the channel when needed, but keep the underlying fact sheet identical. Marketplace bullets may need shorter lines. Your Shopify description can carry more brand voice. Neither channel should contradict materials, warranty length, or what’s in the box. Create a single source of truth document and make every rewrite start from that document rather than from whichever listing happens to be open.',
      'Draft faster with a dedicated product description generator when you have clean specs and a clear audience in mind, then edit for brand voice and compliance. AI accelerates the first draft; it should not ship unreviewed. Human judgment remains the quality gate, especially for regulated categories, allergens, safety warnings, and comparative claims. Build a two-pass process: machine draft, human verify against the fact sheet, then publish.',
      'Measure what matters after you refresh copy. Track add-to-cart rate, conversion rate, and refund reasons tagged “not as expected” on the SKUs you rewrote. Descriptions that reduce mismatched expectations often beat flashier wording that spikes clicks and returns. Iterate seasonally. Keep a living swipe file of your highest-performing paragraphs so the next launch starts from evidence rather than blank-page improvisation.',
      'Finally, protect consistency as the catalog grows. Title formulas, benefit order, and banned phrases belong in a short style guide so freelancers and new hires do not reinvent the page every week. When your top sellers share a readable pattern, shoppers learn how to evaluate your listings — and your brand feels more intentional than a pile of one-off experiments.',
      'Conversion copy is operational writing. Treat it that way: research inputs, structured drafts, verified claims, aligned media, measured outcomes. The brands that win product-page writing are rarely the ones with the cleverest metaphors. They are the ones that make the next secure checkout feel like the obvious, low-risk step.',
    ],
  },
  {
    slug: 'shopify-product-title-formulas-that-rank',
    title: 'Shopify Product Title Formulas That Rank and Read Well',
    description:
      'Simple title patterns that help Shopify search and shoppers understand your products in seconds — without keyword stuffing.',
    tool: 'stg',
    content: [
      'Shopify titles work hardest in collection grids, predictive search, and order history screens where shoppers decide in a glance. The most reliable pattern is still Product Type + Key Attribute + Differentiator. Example: “Merino Crew Socks — Midweight, 3-Pack.” The type orients the brain; attributes reduce mismatches; the differentiator explains why this SKU exists next to its siblings. When the type is buried at the end, grids look like a wall of adjectives instead of a shoppable catalog.',
      'Keyword stuffing still shows up in struggling catalogs. Repeating “best,” “sale,” and synonym piles rarely helps Shopify’s relevance scoring and makes your grid look spammy. Prefer one clear primary phrase, then move secondary keywords into product type, tags, and description. Titles are a clarity surface first and a ranking surface second. If a human cannot parse the title in under two seconds, search engines are not the main problem — comprehension is.',
      'Create a house style guide before you scale variants. Decide capitalization rules, the order of attributes, whether the brand name leads, how you punctuate packs and sizes, and which words are banned as filler. Consistency helps returning customers recognize your list quickly and makes bulk CSV imports safer. Write three gold-standard title examples for apparel, hard goods, and kits, then require new SKUs to match the nearest pattern.',
      'Variant naming deserves its own rules. Color and size should usually live in the variant options rather than jammed into the parent title. A parent titled “Blue Large Wool Coat” creates messy duplicates when you add Black and Medium. Keep the parent title stable; let variants carry the modifiers your theme displays under the buy box. Check how your theme truncates titles on mobile collection cards — the first 40–50 characters should still identify the product.',
      'Revisit titles when expanding into Google Shopping or other marketplaces. Feed requirements may truncate fields differently than your storefront. Keep the first 50–70 characters meaningful on their own so shopping ads and free listings still make sense when cut mid-string. Avoid leading with seasonal fluff that expires (“Holiday 2026 Special”) unless you commit to renaming later; expired seasonals make evergreen inventory look outdated.',
      'Use customer language for attributes when it conflicts with internal jargon. Ops may call a finish “PVD gunmetal,” while shoppers search for “matte black.” Put the shopper phrase in the title when it is accurate, and keep the technical term in the specs. Accuracy still wins: never rename a material to something warmer if it creates a false expectation. Your title is a promise the rest of the listing must keep.',
      'Audit top sellers for title ambiguity that creates wrong-item purchases. If support tickets often say “I thought it included the frame,” your title may be underselling what’s excluded — or your images may oversell it. Titles cannot carry every disclaimer, but they should not invite a wrong mental model. Pair tight titles with bullets that finish the job.',
      'When launching many related SKUs, draft candidates in batches and normalize them afterward. A Shopify title generator can produce structured options quickly when you feed it product type, attributes, and differentiators. Your job is to pick one canonical format for the live catalog and reject clever one-offs that break scannability. Style drift across a collection is more damaging than a slightly imperfect single title.',
      'Handle multipacks and kits carefully. Lead with the product type, then quantity, then what’s distinctive. “Ceramic Mug Set — 4 Pieces, Speckled” scans better than “Speckled Four Piece Ceramic Drinking Cup Bundle Collection.” Quantity early prevents sticker-shock surprises when someone expects a single unit. Mentally read the title as a cart line item; that is how customers will see it again later.',
      'Coordinate with SEO meta titles without duplicating poorly. Storefront titles and SEO titles can differ. The storefront title should be shoppable in grids; the SEO title can include a light brand or category cue when space allows. Do not create a third contradictory name on Amazon or Etsy unless marketplace constraints force a different pattern — and even then, share the same core noun and attributes.',
      'Schedule quarterly title cleanups for collections that grew organically. Founders often name early products like pets and later products like inventory. A cleanup pass that aligns naming to your current formula improves internal search and partner feeds. Track changes in a changelog so customer service can map old names customers still use in emails.',
      'Strong Shopify titles are boring in the best way: predictable order, concrete nouns, honest attributes, zero filler. Rank well by being relevant and clear. Read well by respecting how humans scan a grid under time pressure. That combination is the real formula — not a secret string of ranking tokens.',
    ],
  },
  {
    slug: 'etsy-seo-tags-strategy-for-makers',
    title: 'Etsy SEO Tags: A Practical Strategy for Makers',
    description:
      'How to fill all 13 Etsy tags with buyer-intent keywords that match how people actually search — without guessing or spam.',
    tool: 'etg',
    content: [
      'Etsy’s search matches titles, tags, attributes, and engagement signals. Tags are your chance to cover search paths that will not fit in the title’s limited space. Treat each of the 13 slots as valuable real estate, not an afterthought you fill with leftovers five minutes before publishing. Makers who “just ship the listing” and revisit tags never often leave money on the table in plain sight.',
      'Balance three buckets across your thirteen tags: category phrases (“leather journal”), attribute phrases (“A5 notebook”), and intent phrases (“gift for writers”). Category tags help Etsy understand what shelf you belong on. Attribute tags catch shoppers who already narrowed dimensions, material, or color. Intent tags catch gift and use-case searches that rarely fit cleanly in a short title. If all thirteen tags are slight rewrites of the same phrase, you wasted twelve slots.',
      'Seasonal tags help during peak periods but should be swapped when the season ends so listings stay accurate. A Christmas-themed tag on a spring listing can make you appear in the wrong shopping mindset and hurt relevance when shoppers bounce. Build a seasonal calendar reminder for your top SKUs. Updating tags is cheaper than redesigning photos and still keeps your shop feeling current.',
      'Validate ideas with Etsy’s own search suggestions and your shop stats. Type partial phrases into search and note the autocomplete paths real shoppers see. Then check which of your tags earn impressions without visits — those are candidates for replacement. Relevance beats wishful volume. Ranking for a crowded phrase you do not truly match often creates tire-kickers, not buyers.',
      'Respect character limits and avoid stuffing multiple unrelated ideas into one tag just because spaces remain. One coherent phrase per tag is easier for matching and easier for you to audit later. Skip competitor brand names and trademarked terms you do not have rights to use. Clever-feeling evasion phrases create policy risk and rarely convert well when a shopper arrives expecting something you do not sell.',
      'Align tags with attributes and categories you select elsewhere in the listing. If your attributes say “sterling silver” but your tags push “gold jewelry,” you create a confusing signal for both the algorithm and the buyer. Consistency across the listing is an SEO strategy, not only a writing preference. Use the same vocabulary in the title opening, the first attributes, and the highest-priority tags.',
      'When scaling a product line, save tag sets by SKU family. A ring family might share metal and style tags while swapping size or gemstone tags. Document the shared core and the variable slots so you do not reinvent research for every new stone. An Etsy tag generator can draft candidates quickly when you provide materials, audience, and use case — your job is authenticity and character-limit verification before publishing.',
      'Differentiate gift tags from buyer-self tags when both apply. “Mother’s Day gift” and “everyday notebook” can both be true, but over-weighting gift tags year-round can attract seasonal browsers who never convert outside those spikes. Rotate emphasis based on calendar and inventory goals. Keep evergreen intent tags in permanent slots if they still describe the object accurately.',
      'Photos and tags should not argue. If tags promise “minimalist black,” the first images must look minimalist and black under realistic lighting. Tag-driven traffic that lands on mismatched visuals trains Etsy that your listing disappoints. Treat listing quality as a system: search terms earn the click; media and description earn the favorite and purchase.',
      'Review underperformers monthly, not only when sales are down. Low visibility can be a tag problem, a photo problem, or a price problem. Change one cluster at a time so you can tell what worked. Swapping all thirteen tags plus the title and the first photo in one frantic night makes learning impossible. Operational discipline beats superstition.',
      'Use shop-level patterns without cloning. If every listing shares identical tag sets, you train shoppers and the platform that your items are interchangeable. Shared foundations are fine; unique attributes should still appear. Variety in accurate tags reflects variety in inventory — and that is how a growing maker catalog stays legible.',
      'Etsy SEO for makers is mostly careful labeling of truth. Fill all thirteen tags, cover category plus attribute plus intent, keep seasons honest, verify with search suggestions and stats, and protect consistency with the rest of the listing. Do that repeatedly and tags stop feeling like a mystery ritual and start feeling like ordinary merchandising hygiene.',
    ],
  },
  {
    slug: 'how-to-reply-to-negative-product-reviews',
    title: 'How to Reply to Negative Product Reviews Without Making It Worse',
    description:
      'A calm public-reply framework that protects trust, acknowledges real frustration, and moves problem-solving into private channels.',
    tool: 'rrg',
    content: [
      'Negative reviews are stressful because they are public, searchable, and emotionally charged. The goal of a reply is not to win the argument — it is to show future buyers that your brand handles issues maturely. People reading reviews often care as much about your response style as the original complaint. A defensive or sarcastic reply can damage trust more than the one-star rating itself.',
      'Use a simple four-part structure every time: thank them for the feedback, acknowledge the specific frustration in their words, state that you want to help, and provide a clear private channel. Specific acknowledgment proves you read the review. Generic “sorry for the inconvenience” templates feel automated and cold. Mentioning the broken zipper, late shipment, or wrong size shows attentiveness without oversharing internal debates.',
      'Avoid sarcasm, all-caps, public blame aimed at the customer, or long exonerating essays. Future buyers skim for tone. They rarely reward detailed rebuttals that make the customer look foolish. If you need to correct a fact, do it briefly and kindly: “Our listing states hand wash only; we are sorry that was easy to miss and we are clarifying the care section.” Then move the fix offline.',
      'If the review is accurate, own the miss without volunteering unnecessary legal admissions. You can apologize for the experience and offer help without writing a confession that complicates risk. Coordinate with operations and, when needed, counsel on templates for safety incidents or serious defects. Never invent compensation in a templated public reply — confirm policy first, then offer what you can actually fulfill.',
      'Separate product quality issues from shipping carrier issues in your wording carefully. Customers often blame the brand either way, and your reply should still be helpful. Explain next steps rather than naming partners in finger-pointing paragraphs. Offer tracking help, replacement options, or return instructions according to your published policy. Consistency between the reply and the policy page prevents “but your review response promised more” disputes.',
      'Speed matters, but accuracy matters more. A same-day reply that makes a promise warehouse cannot keep will create a second wave of frustration. Build an internal triage rule: acknowledge publicly within a defined window, then resolve privately with an owner. If volume spikes after a bad batch, escalate to a temporary dedicated responder so tone does not degrade under fatigue.',
      'Train the team on edge cases: suspected fake reviews, abusive language, and reviews that include medical or legal claims. Abusive content may warrant platform reporting rather than engagement. Medical or legal claims need a careful, non-diagnostic stance. Write playbooks for these situations so frontline staff are not improvising under public scrutiny.',
      'Draft faster with a review reply generator when you need structured first drafts at volume, then personalize names, order details, and next steps. The tool should accelerate tone-consistent openings — not replace human judgment about refunds, replacements, or whether a public correction is wise. Keep a small library of approved phrases so tone stays stable across agents and time zones.',
      'Close the loop internally. Tag the root cause, not only the sentiment. If five reviews mention the same confusing size chart, fix the size chart. Public replies without product fixes teach customers that you are polite and still unreliable. Merchandising and QA should see review themes weekly during growth periods.',
      'For reviews that later resolve happily, you generally cannot always remove the original rating, but you can leave a short follow-up note when platforms allow and when the customer is comfortable. Focus first on solving the problem privately. Obsessing over score optics before solving the human problem reads poorly in public.',
      'Protect your future self by never arguing about whether the customer “used it wrong” unless you can teach the correct use respectfully and provide a path to make it right. Instructional replies can help other shoppers if they stay humble. Lectures do not. Ask: would I want my mother to read this reply next to our bestselling product?',
      'Mature negative-review replies are calm, specific, policy-aligned, and action-oriented. They protect the brand by protecting the shopper’s dignity. Do that consistently and one-star moments become proof of service rather than proof of chaos.',
    ],
  },
  {
    slug: 'ecommerce-ad-copy-angles-that-lower-cpa',
    title: 'Ecommerce Ad Copy Angles That Help Lower CPA',
    description:
      'Test urgency, social proof, and feature-benefit angles with honest offers, matched landing pages, and disciplined creative cycles.',
    tool: 'acg',
    content: [
      'Creative testing often underperforms when every ad says the same thing with different emoji. Angles matter more than micro-phrasing. Urgency needs a real deadline. Social proof needs proof you can stand behind. Feature-benefit copy needs a crisp translation from spec to everyday outcome. Without a named angle, you are not testing strategy — you are shuffling words.',
      'Write the landing page promise first. Ads that oversell against a weak product page waste spend. Align primary text with the hero claim on the destination URL and ensure offer math is identical everywhere — price, gift-with-purchase, shipping threshold, and bundle contents. A mismatch between ad and page creates expensive bounces and trains platforms that your creative attracts the wrong people.',
      'Map angles to audience stages. Cold prospecting may need category education and a sharp primary benefit. Retargeting may need objection handling, shipping clarity, or social proof. Email clickers arriving at ads later in the journey often need a different hook than cold social scrollers. Reusing one “hero” caption for every audience is how CPA quietly rises while dashboards look busy.',
      'Keep claims compliant, especially in health, finance, weight, skin, and before/after contexts. If you cannot document a claim, do not run it. Invented percentages and borrowed testimonials create policy and trust debt. Prefer verifiable specifics — materials, warranty length, what’s included, restock cadence — over empty superlatives. Platforms change enforcement, but customer memory does not.',
      'Launch small batches of variants, kill underperformers quickly, and archive winners with notes on audience, placement, and season. Fatigue arrives faster on paid social than most founders expect. When a winner declines, refresh the angle or the creative format rather than only raising bids. Document why something won so the next hire is not guessing from screenshots.',
      'Match format to angle. A comparison angle may need a clean static that labels attributes. A lifestyle angle may need video that shows the product in use within the first seconds. If your copy promises “desk clutter gone in one drawer insert” and the creative only shows a logo, you paid for a mismatched experience. Brief designers and writers together.',
      'Test offers as carefully as adjectives. Free shipping thresholds, bundles, and trial-size kits change CPA more than changing “discover” to “shop.” Make sure operations can fulfill the offer you advertise. Ad-led stockouts and delayed kits damage more than one campaign — they damage audience quality for months.',
      'An ad copy generator can produce structured variants for Meta or Google tests in minutes when you provide the angle, audience, and constraints. Keep humans as the approval gate for every flight. Use tools to expand a proven brief, not to invent ungrounded promises. Feed the generator real specs and banned claim lists so drafts stay inside your rails.',
      'Watch qualitative signals alongside CPA: comments asking basic “does it include X?” questions often mean the ad or landing page omitted a critical detail. Reply when useful, then fix the creative and PDP. Ignoring comment patterns while optimizing bids is how teams optimize the wrong variable.',
      'Coordinate frequency and messaging across channels. If email, SMS, and paid social all scream different urgency stories in the same week, customers feel manipulated. A shared weekly messaging calendar reduces accidental conflict and makes post-purchase surveys easier to interpret.',
      'Lower CPA is rarely a single clever headline. It is a system of honest angles, matched pages, compliant claims, tight feedback loops, and refreshing creative before fatigue taxes efficiency. Treat ad copy as merchandising under time pressure — because that is what paid traffic is.',
      'When in doubt, simplify. One clear benefit, one proof point, one CTA that mirrors the landing page. Complexity belongs in the test matrix across ads, not inside a single caption trying to do every job at once.',
    ],
  },
];

// Continue adding remaining posts in this file via append in next write...
console.log('partial', postsSpec.length);
