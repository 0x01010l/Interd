/**
 * Post-build prerender: unique <title>/meta/canonical + full crawlable HTML
 * injected INSIDE #root (React replaces it on mount — no duplicate UI, no "loads below" stub).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function sectionsToHtml(title, sections) {
  const body = sections
    .map(
      (s) =>
        `<section><h2>${escapeHtml(s.heading)}</h2>${s.paragraphs
          .map((p) => `<p>${escapeHtml(p)}</p>`)
          .join('')}</section>`
    )
    .join('');
  return `<article><h1>${escapeHtml(title)}</h1>${body}</article>`;
}

function writeRouteHtml(template, routePath, { title, description, bodyHtml, jsonLd }) {
  const canonical = `https://interdot.net${routePath === '/' ? '/' : routePath}`;
  let html = template;

  html = html.replace(/<meta\s+name="description"[^>]*>\s*/gi, '');
  html = html.replace(/<meta\s+name="keywords"[^>]*>\s*/gi, '');
  html = html.replace(/<meta\s+name="robots"[^>]*>\s*/gi, '');
  html = html.replace(/<meta\s+property="og:[^"]+"[^>]*>\s*/gi, '');
  html = html.replace(/<meta\s+name="twitter:[^"]+"[^>]*>\s*/gi, '');
  html = html.replace(/<link\s+rel="canonical"[^>]*>\s*/gi, '');

  html = html.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(title)}</title>`);

  const metaBlock = [
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:type" content="${routePath.startsWith('/blog/') ? 'article' : 'website'}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:site_name" content="Interdot" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
  ].join('\n    ');

  html = html.replace(/<\/title>/i, `</title>\n    ${metaBlock}`);

  if (jsonLd) {
    const ld = `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`;
    html = html.replace(/<\/head>/i, `    ${ld}\n  </head>`);
  }

  // Seed lives inside #root so React unmounts it on first paint — no twin pages.
  const seeded = `<div id="root"><div class="prerender-seed" style="max-width:48rem;margin:0 auto;padding:2rem 1.25rem;font-family:system-ui,sans-serif;line-height:1.65;color:#e8e8e8;background:#05070d">${bodyHtml}</div></div>`;
  html = html.replace(/<div id="root"><\/div>/i, seeded);

  const outDir = routePath === '/' ? dist : path.join(dist, routePath.replace(/^\//, ''));
  ensureDir(outDir);
  const outFile = routePath === '/' ? path.join(dist, 'index.html') : path.join(outDir, 'index.html');
  fs.writeFileSync(outFile, html, 'utf8');
  return outFile;
}

function loadData() {
  const dump = `
import { BLOG_POSTS } from './src/data/blogPosts.ts';
import { TOOLS } from './src/data/tools.ts';
import { PRIVACY_SECTIONS, TERMS_SECTIONS, FAQ_ITEMS, ABOUT_COPY } from './src/data/staticPageCopy.ts';
console.log(JSON.stringify({ posts: BLOG_POSTS, tools: TOOLS, privacy: PRIVACY_SECTIONS, terms: TERMS_SECTIONS, faqs: FAQ_ITEMS, about: ABOUT_COPY }));
`;
  const tmp = path.join(root, '.prerender-dump.mts');
  fs.writeFileSync(tmp, dump);
  const res = spawnSync('npx', ['tsx', tmp], { cwd: root, encoding: 'utf8', maxBuffer: 30 * 1024 * 1024 });
  try {
    fs.unlinkSync(tmp);
  } catch {
    /* ignore */
  }
  if (res.status !== 0) {
    console.error(res.stderr || res.stdout);
    throw new Error('Failed to load data for prerender');
  }
  const line = res.stdout.trim().split('\n').filter(Boolean).pop();
  return JSON.parse(line);
}

function main() {
  const indexPath = path.join(dist, 'index.html');
  if (!fs.existsSync(indexPath)) throw new Error('dist/index.html missing — run vite build first');
  const template = fs.readFileSync(indexPath, 'utf8');
  const { posts, tools, privacy, terms, faqs, about } = loadData();

  const pages = [];

  pages.push({
    path: '/',
    title: 'Interdot | Custom AI Agents & Free AI Tools',
    description: 'Custom AI agents and free ecommerce writing tools from Interdot (FIX FIGURES LLC).',
    body: `<h1>Custom AI Agents</h1><p>Custom AI agents and free ecommerce writing tools — for ecommerce, finance, and cybersecurity niches, operated by FIX FIGURES LLC in North Canton, Ohio.</p><p>Explore free writing tools, custom agent services, guides, and publisher details on this site.</p>`,
  });

  const pub = about.publisher;
  pages.push({
    path: '/about',
    title: 'About Interdot | Custom AI Agents & Free Tools',
    description:
      'Interdot is operated by FIX FIGURES LLC. Publisher identity, address, and contact for custom AI agents and free ecommerce writing tools.',
    body: `<article>
      <h1>About Interdot</h1>
      <h2>Our Mission</h2>
      <p>${escapeHtml(about.missionTitle)}</p>
      <p>${escapeHtml(about.missionBody)}</p>
      <h2>Publisher identity</h2>
      <p>Brand: ${escapeHtml(pub.brand)}</p>
      <p>Legal entity: ${escapeHtml(pub.legal)}</p>
      <p>Website: <a href="${escapeHtml(pub.website)}">${escapeHtml(pub.website)}</a></p>
      <p>Primary contact: <a href="mailto:${escapeHtml(pub.email)}">${escapeHtml(pub.email)}</a></p>
      <p>Support: <a href="mailto:${escapeHtml(pub.support)}">${escapeHtml(pub.support)}</a></p>
      <p>Business address:<br/>${pub.addressLines.map(escapeHtml).join('<br/>')}</p>
      <p>${escapeHtml(pub.publishNote)}</p>
      <p>${escapeHtml(pub.whatWePublish)}</p>
      <h2>Niche-first agents</h2>
      <p>${escapeHtml(about.nicheAgents)}</p>
      <h2>Proof before pitch</h2>
      <p>${escapeHtml(about.proofBeforePitch)}</p>
      <h2>Custom agents + free tools</h2>
      <p>${escapeHtml(about.agentsAndTools)}</p>
      <h2>Our commitment</h2>
      <p>${escapeHtml(about.commitment)}</p>
    </article>`,
  });

  pages.push({
    path: '/tools',
    title: 'Free Ecommerce AI Tools | Interdot Custom Agents',
    description:
      'Free Interdot AI writing tools — product descriptions, Shopify titles, Etsy tags, review replies, ads, FAQs, SEO metas, and bulk rewrites.',
    body: `<h1>Ecommerce writing tools</h1><p>Eight focused generators with human-written guides on every page.</p><ul>${tools
      .map((t) => `<li><a href="${t.path}">${escapeHtml(t.name)}</a> — ${escapeHtml(t.benefit)}</li>`)
      .join('')}</ul>`,
  });

  pages.push({
    path: '/blog',
    title: 'Ecommerce Writing Blog | Interdot AI Agents & Free Tools',
    description: 'In-depth guides for ecommerce listing copy, SEO, reviews, and marketplace content.',
    body: `<h1>Ecommerce writing guides</h1><ul>${posts
      .map((p) => `<li><a href="/blog/${p.slug}">${escapeHtml(p.title)}</a> — ${escapeHtml(p.description)}</li>`)
      .join('')}</ul>`,
  });

  pages.push({
    path: '/contact',
    title: 'Contact Interdot | Custom AI Agents & Free Tools',
    description:
      'Contact Interdot (FIX FIGURES LLC) for custom AI agents or questions about free AI writing tools. Email contact@interdot.net.',
    body: `<article><h1>Contact Interdot</h1><p>Ready for a custom agent in ecommerce, finance, or cybersecurity — or have a question about our free AI writing tools?</p><p>Main email: <a href="mailto:contact@interdot.net">contact@interdot.net</a></p><p>Technical support: <a href="mailto:advisory@interdot.net">advisory@interdot.net</a></p><p>HQ: 6545 Market Avenue North, North Canton, 44721, OH, US</p></article>`,
  });

  const privacyHtml = sectionsToHtml('Privacy Policy', privacy);
  pages.push({
    path: '/privacy-policy',
    title: 'Privacy Policy | Interdot',
    description:
      'Interdot privacy policy for custom AI agents and free tools — Azure OpenAI, cookies, Google AdSense, and consent.',
    body: privacyHtml + '<p>Last updated: August 03, 2026</p>',
  });
  pages.push({
    path: '/privacy',
    title: 'Privacy Policy | Interdot',
    description:
      'Interdot privacy policy for custom AI agents and free tools — Azure OpenAI, cookies, Google AdSense, and consent.',
    body: privacyHtml + '<p>Last updated: August 03, 2026</p>',
  });

  pages.push({
    path: '/terms',
    title: 'Terms of Use | Interdot',
    description:
      'Terms of use for Interdot custom AI agent services and free AI ecommerce writing tools operated by FIX FIGURES LLC.',
    body: sectionsToHtml('Terms of Use', terms) + '<p>Last updated: August 03, 2026</p>',
  });

  pages.push({
    path: '/services',
    title: 'Custom AI Agent Services | Interdot',
    description:
      'Commission custom AI agents for finance, cybersecurity, and ecommerce workflows from Interdot (FIX FIGURES LLC).',
    body: `<article><h1>Custom AI agents for your niche</h1><p>Generic AI guesses. Interdot builds custom agents scoped to ecommerce, finance, and cybersecurity workflows — with free tools that show the same approach in public for merchant writing tasks.</p><h2>Finance Decision Agents</h2><p>Custom agents that turn market and ops data into audit-ready causal reasoning for finance teams.</p><h2>Security Ops Agents</h2><p>Custom agents for deterministic threat modeling and adversary logic prediction.</p><h2>Custom Agent Training</h2><p>Train niche agents on your proprietary datasets with absolute privacy — including ecommerce and ops workflows.</p></article>`,
  });

  const faqBody = `<article><h1>Agents, tools, and how Interdot works</h1><p>Straight answers for merchants, operators, and anyone evaluating our free tools or custom agents.</p>${faqs
    .map((f) => `<section><h2>${escapeHtml(f.q)}</h2><p>${escapeHtml(f.a)}</p></section>`)
    .join('')}</article>`;
  pages.push({
    path: '/faq',
    title: 'FAQ | Interdot Custom AI Agents & Free Tools',
    description:
      'FAQ about Interdot custom AI agents, free tools, privacy, cookies, and FIX FIGURES LLC publisher identity.',
    body: faqBody,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  });

  const scenariosBody = `<article><h1>Illustrative agent use cases</h1><p>These are example workflows that show how Interdot custom agents and free tools can fit real business niches. They are illustrative — not client testimonials, case studies, or performance guarantees.</p>
    <section><h2>Ecommerce listing ops</h2><p>Catalog refresh without blank pages: use free writing tools for first drafts, then brief a custom catalog agent grounded on brand voice and prohibited claims. Example outcome: faster drafts with human QA still required.</p></section>
    <section><h2>Finance decision support</h2><p>Audit-ready reasoning traces for risk ops desks that need explanations they can review — step-by-step rationale instead of opaque scores. Example outcome: clearer handoffs to analysts.</p></section>
    <section><h2>Security operations</h2><p>Threat narrative assistants that summarize likely attack paths from provided telemetry with analyst confirmation before action. Example outcome: faster triage while humans keep control.</p></section>
  </article>`;
  for (const p of ['/scenarios', '/clients']) {
    pages.push({
      path: p,
      title: 'Illustrative Agent Scenarios | Interdot',
      description:
        'Illustrative Interdot custom AI agent scenarios for ecommerce, finance, and cybersecurity — not client testimonials.',
      body: scenariosBody,
    });
  }

  for (const tool of tools) {
    const guideText = [tool.guide.whatIs, ...tool.guide.howTo, tool.guide.whyUseful, tool.guide.body]
      .filter(Boolean)
      .map((block) => `<p>${escapeHtml(block)}</p>`)
      .join('');
    pages.push({
      path: tool.path,
      title: `${tool.title} | Free AI Tool | Interdot`,
      description: tool.metaDescription,
      body: `<article><h1>${escapeHtml(tool.h1)}</h1><p>${escapeHtml(tool.benefit)}</p>${guideText}</article>`,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: tool.name,
        applicationCategory: 'BusinessApplication',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        url: `https://interdot.net${tool.path}`,
        description: tool.metaDescription,
      },
    });
  }

  for (const post of posts) {
    pages.push({
      path: `/blog/${post.slug}`,
      title: `${post.title} | Interdot`,
      description: post.description,
      body: `<article><h1>${escapeHtml(post.title)}</h1><p><em>${escapeHtml(post.date)} · ${escapeHtml(
        post.readTime
      )} read</em></p><p>${escapeHtml(post.description)}</p>${post.content
        .map((p) => `<p>${escapeHtml(p)}</p>`)
        .join('')}<p><a href="${post.toolPath}">Related: ${escapeHtml(post.toolLabel)}</a></p></article>`,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        datePublished: post.date,
        description: post.description,
        author: { '@type': 'Organization', name: 'Interdot', legalName: 'FIX FIGURES LLC' },
        publisher: { '@type': 'Organization', name: 'Interdot', legalName: 'FIX FIGURES LLC' },
        mainEntityOfPage: `https://interdot.net/blog/${post.slug}`,
      },
    });
  }

  for (const page of pages) {
    writeRouteHtml(template, page.path, {
      title: page.title,
      description: page.description,
      bodyHtml: page.body,
      jsonLd: page.jsonLd,
    });
  }

  for (const f of ['staticwebapp.config.json', '404.html', 'robots.txt', 'sitemap.xml', 'ads.txt']) {
    const src = path.join(root, 'public', f);
    if (fs.existsSync(src)) fs.copyFileSync(src, path.join(dist, f));
  }

  console.log(`Prerendered ${pages.length} routes into dist/`);
}

main();
