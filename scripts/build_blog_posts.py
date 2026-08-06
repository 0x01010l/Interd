#!/usr/bin/env python3
"""Build src/data/blogPosts.ts with 46 long-form ecommerce writing posts."""
from __future__ import annotations

import math
from datetime import date, timedelta
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "src/data/blogPosts.ts"

TOOLS = {
    "pdg": ("/tools/product-description-generator", "Product Description Generator"),
    "stg": ("/tools/shopify-title-generator", "Shopify Title Generator"),
    "etg": ("/tools/etsy-tag-generator", "Etsy Tag Generator"),
    "rrg": ("/tools/review-reply-generator", "Review Reply Generator"),
    "acg": ("/tools/ad-copy-generator", "Ad Copy Generator"),
    "smg": ("/tools/seo-meta-generator", "SEO Meta Generator"),
    "pfg": ("/tools/product-faq-generator", "Product FAQ Generator"),
    "bdr": ("/tools/bulk-description-rewriter", "Bulk Description Rewriter"),
    "suite": ("/tools", "AI Tools Suite"),
}

# (slug, title, description, tool_key, paragraphs[12])
# Each paragraph intentionally ~75-110 words for ~900-1200 total.

def P(*parts: str) -> str:
    return " ".join(p.strip() for p in parts if p.strip())


POSTS_RAW: list[tuple] = []


def add(slug, title, description, tool, paras: list[str]):
    POSTS_RAW.append((slug, title, description, tool, paras))


# ---------------------------------------------------------------------------
# 36 EXISTING + 10 NEW — full unique paragraphs
# ---------------------------------------------------------------------------

add(
    "how-to-write-product-descriptions-that-convert",
    "How to Write Product Descriptions That Convert",
    "A practical framework for turning product features into buyer-focused copy that improves conversion and cuts “not as expected” refunds.",
    "pdg",
    [
        P(
            "Great product pages do more than list specs. They answer a quiet question every shopper has: will this solve my problem better than the next tab I have open?",
            "Conversion-focused descriptions connect materials, measurements, and construction details to outcomes people care about — comfort, durability, status, convenience, time saved, or money protected.",
            "When you lead with machinery language instead of outcomes, you force the shopper to do the translation work themselves, and many of them simply leave for a clearer competitor.",
        ),
        P(
            "Start with research, not adjectives. Mine customer reviews, support tickets, live chat transcripts, and sales calls for phrases buyers already use.",
            "If people say “doesn’t pill after washing,” that belongs in the copy more than a vague “premium quality.” Build a swipe file of recurring praise and recurring complaints.",
            "Praise tells you what to amplify. Complaints tell you what to clarify, qualify, or redesign. Writers who skip this step often produce pretty paragraphs that still miss the objections killing the sale.",
        ),
        P(
            "Structure the page before you style the sentences. A reliable order for most SKUs is primary benefit in the first screen, short proof that the benefit is real, practical details that prevent returns, then secondary stories that reinforce brand.",
            "Mobile shoppers often decide within the first viewport. If your opening paragraph is a brand myth with no product clarity, you are asking them to scroll on trust alone.",
            "Put the “what it is” and “who it is for” early enough that a hurried buyer never wonders.",
        ),
        P(
            "Translate features into consequences without inventing claims. “Triple-stitched seams” becomes “handles daily packing without ripping at the corners.” “320 gsm cotton” becomes “holds shape after washing and feels substantial in hand.”",
            "The feature still belongs on the page for the detail-oriented shopper, but the consequence does the persuasive work for everyone else.",
            "Keep a one-to-one map from approved specs to benefit lines so new teammates cannot invent properties under launch pressure.",
        ),
        P(
            "Honest limitations are a conversion tool, not a conversion leak. If the jacket is water-resistant rather than waterproof, say so. If the blender is loud at high speed, say so.",
            "Shoppers who filter themselves out become cheaper support queues and fewer chargebacks. The people who still buy after seeing a clear limit tend to leave more stable reviews.",
            "Fake perfection is a short-term conversion hack that taxes your refund rate later.",
        ),
        P(
            "Write for scanning. Short paragraphs, specific numbers, and labeled subsections help. Prefer “fits 15-inch laptops with cases under 1.5 inches thick” over “fits most laptops.”",
            "Specificity reduces ambiguity, and ambiguity is where returns breed. Use bullets for dimensions, pack contents, and care — not for vague lifestyle slogans.",
            "Narrative sentences can carry the story; bullets should carry the facts that prevent packing and fit mistakes.",
        ),
        P(
            "Match imagery and copy so they tell the same story. If the description mentions a removable strap, the gallery should show it. If you claim “includes charging cable,” the unboxing photo should include it.",
            "Mismatched media and text create a low-grade distrust that shows up as hesitation at the buy button.",
            "Treat PDP creation as one release owned by merchandising, writing, and photography together — not a relay race with silent handoffs.",
        ),
        P(
            "Localize claims to the channel when needed, but keep the underlying fact sheet identical. Marketplace bullets may need shorter lines. Your Shopify description can carry more brand voice.",
            "Neither channel should contradict materials, warranty length, or what’s in the box.",
            "Create a single source of truth document and make every rewrite start from that document rather than from whichever listing happens to be open.",
        ),
        P(
            "Draft faster with a dedicated product description generator when you have clean specs and a clear audience in mind, then edit for brand voice and compliance.",
            "AI accelerates the first draft; it should not ship unreviewed. Human judgment remains the quality gate, especially for regulated categories, allergens, safety warnings, and comparative claims.",
            "Build a two-pass process: machine draft, human verify against the fact sheet, then publish.",
        ),
        P(
            "Measure what matters after you refresh copy. Track add-to-cart rate, conversion rate, and refund reasons tagged “not as expected” on the SKUs you rewrote.",
            "Descriptions that reduce mismatched expectations often beat flashier wording that spikes clicks and returns. Iterate seasonally.",
            "Keep a living swipe file of your highest-performing paragraphs so the next launch starts from evidence rather than blank-page improvisation.",
        ),
        P(
            "Finally, protect consistency as the catalog grows. Title formulas, benefit order, and banned phrases belong in a short style guide so freelancers and new hires do not reinvent the page every week.",
            "When your top sellers share a readable pattern, shoppers learn how to evaluate your listings — and your brand feels more intentional than a pile of one-off experiments.",
        ),
        P(
            "Conversion copy is operational writing. Treat it that way: research inputs, structured drafts, verified claims, aligned media, measured outcomes.",
            "The brands that win product-page writing are rarely the ones with the cleverest metaphors.",
            "They are the ones that make the next secure checkout feel like the obvious, low-risk step for a careful shopper.",
        ),
    ],
)

add(
    "shopify-product-title-formulas-that-rank",
    "Shopify Product Title Formulas That Rank and Read Well",
    "Simple title patterns that help Shopify search and shoppers understand products in seconds — without keyword stuffing.",
    "stg",
    [
        P(
            "Shopify titles work hardest in collection grids, predictive search, and order history screens where shoppers decide in a glance.",
            "The most reliable pattern is still Product Type + Key Attribute + Differentiator. Example: “Merino Crew Socks — Midweight, 3-Pack.”",
            "The type orients the brain; attributes reduce mismatches; the differentiator explains why this SKU exists next to its siblings. When the type is buried at the end, grids look like a wall of adjectives instead of a shoppable catalog.",
        ),
        P(
            "Keyword stuffing still shows up in struggling catalogs. Repeating “best,” “sale,” and synonym piles rarely helps Shopify’s relevance scoring and makes your grid look spammy.",
            "Prefer one clear primary phrase, then move secondary keywords into product type, tags, and description.",
            "Titles are a clarity surface first and a ranking surface second. If a human cannot parse the title in under two seconds, search engines are not the main problem — comprehension is.",
        ),
        P(
            "Create a house style guide before you scale variants. Decide capitalization rules, the order of attributes, whether the brand name leads, how you punctuate packs and sizes, and which words are banned as filler.",
            "Consistency helps returning customers recognize your list quickly and makes bulk CSV imports safer.",
            "Write three gold-standard title examples for apparel, hard goods, and kits, then require new SKUs to match the nearest pattern.",
        ),
        P(
            "Variant naming deserves its own rules. Color and size should usually live in the variant options rather than jammed into the parent title.",
            "A parent titled “Blue Large Wool Coat” creates messy duplicates when you add Black and Medium. Keep the parent title stable; let variants carry the modifiers your theme displays under the buy box.",
            "Check how your theme truncates titles on mobile collection cards — the first 40–50 characters should still identify the product.",
        ),
        P(
            "Revisit titles when expanding into Google Shopping or other marketplaces. Feed requirements may truncate fields differently than your storefront.",
            "Keep the first 50–70 characters meaningful on their own so shopping ads and free listings still make sense when cut mid-string.",
            "Avoid leading with seasonal fluff that expires unless you commit to renaming later; expired seasonals make evergreen inventory look outdated.",
        ),
        P(
            "Use customer language for attributes when it conflicts with internal jargon. Ops may call a finish “PVD gunmetal,” while shoppers search for “matte black.”",
            "Put the shopper phrase in the title when it is accurate, and keep the technical term in the specs.",
            "Accuracy still wins: never rename a material to something warmer if it creates a false expectation. Your title is a promise the rest of the listing must keep.",
        ),
        P(
            "Audit top sellers for title ambiguity that creates wrong-item purchases.",
            "If support tickets often say “I thought it included the frame,” your title may be underselling what’s excluded — or your images may oversell it.",
            "Titles cannot carry every disclaimer, but they should not invite a wrong mental model. Pair tight titles with bullets that finish the job.",
        ),
        P(
            "When launching many related SKUs, draft candidates in batches and normalize them afterward.",
            "A Shopify title generator can produce structured options quickly when you feed it product type, attributes, and differentiators.",
            "Your job is to pick one canonical format for the live catalog and reject clever one-offs that break scannability. Style drift across a collection is more damaging than a slightly imperfect single title.",
        ),
        P(
            "Handle multipacks and kits carefully. Lead with the product type, then quantity, then what’s distinctive.",
            "“Ceramic Mug Set — 4 Pieces, Speckled” scans better than “Speckled Four Piece Ceramic Drinking Cup Bundle Collection.”",
            "Quantity early prevents sticker-shock surprises when someone expects a single unit. Mentally read the title as a cart line item; that is how customers will see it again later.",
        ),
        P(
            "Coordinate with SEO meta titles without duplicating poorly. Storefront titles and SEO titles can differ.",
            "The storefront title should be shoppable in grids; the SEO title can include a light brand or category cue when space allows.",
            "Do not create a third contradictory name on Amazon or Etsy unless marketplace constraints force a different pattern — and even then, share the same core noun and attributes.",
        ),
        P(
            "Schedule quarterly title cleanups for collections that grew organically. Founders often name early products like pets and later products like inventory.",
            "A cleanup pass that aligns naming to your current formula improves internal search and partner feeds.",
            "Track changes in a changelog so customer service can map old names customers still use in emails.",
        ),
        P(
            "Strong Shopify titles are boring in the best way: predictable order, concrete nouns, honest attributes, zero filler.",
            "Rank well by being relevant and clear. Read well by respecting how humans scan a grid under time pressure.",
            "That combination is the real formula — not a secret string of ranking tokens.",
        ),
    ],
)

# Continue in same file via exec of remaining adds - split for maintainability
print("seeded", len(POSTS_RAW))
Path("/tmp/blog_seed_count.txt").write_text(str(len(POSTS_RAW)))
