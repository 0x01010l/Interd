/**
 * Post-build prerender: unique titles/meta + crawlable HTML inside #root for SPA SEO.
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

function siteNav() {
  return `<header role="banner" style="border-bottom:1px solid #1a1a1a;padding:1rem 0;margin-bottom:1.5rem"><nav aria-label="Primary" style="max-width:48rem;margin:0 auto;padding:0 1.25rem;font-family:ui-monospace,monospace;font-size:0.85rem"><a href="/" style="font-weight:700;margin-right:1rem;color:#0070FF">INTERDOT</a><a href="/services" style="margin-right:0.75rem;color:#ccc">Services</a><a href="/blog" style="margin-right:0.75rem;color:#ccc">Blog</a><a href="/about" style="margin-right:0.75rem;color:#ccc">About</a><a href="/faq" style="margin-right:0.75rem;color:#ccc">FAQ</a><a href="/clients" style="margin-right:0.75rem;color:#ccc">Case Studies</a><a href="/contact" style="margin-right:0.75rem;color:#ccc">Contact</a><a href="/privacy" style="color:#ccc">Privacy</a></nav></header>`;
}

function siteFooter() {
  return `<footer role="contentinfo" style="border-top:1px solid #1a1a1a;margin-top:2rem;padding:1.5rem 0;font-family:ui-monospace,monospace;font-size:0.75rem;color:#666"><nav aria-label="Footer" style="max-width:48rem;margin:0 auto;padding:0 1.25rem"><a href="/services" style="margin-right:0.75rem">Services</a><a href="/about" style="margin-right:0.75rem">About</a><a href="/faq" style="margin-right:0.75rem">FAQ</a><a href="/terms" style="margin-right:0.75rem">Terms</a><a href="/contact">Contact</a></nav><p style="max-width:48rem;margin:0.75rem auto 0;padding:0 1.25rem">© FIX FIGURES LLC · contact@interdot.net</p></footer>`;
}

function wrap(main) {
  return `${siteNav()}<main>${main}</main>${siteFooter()}`;
}

function writeRouteHtml(template, routePath, { title, description, body, jsonLd, robots }) {
  const canonical = `https://interdot.net${routePath === '/' ? '/' : routePath}`;
  let html = template;
  html = html.replace(/<meta\s+name="description"[^>]*>\s*/gi, '');
  html = html.replace(/<link\s+rel="canonical"[^>]*>\s*/gi, '');
  html = html.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(title)}</title>`);
  const robotsContent = robots || 'index, follow, max-image-preview:large, max-snippet:-1';
  const metaBlock = [
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<meta name="robots" content="${robotsContent}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:site_name" content="Interdot" />`,
  ].join('\n    ');
  html = html.replace(/<\/title>/i, `</title>\n    ${metaBlock}`);
  if (jsonLd) {
    const graphs = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
    html = html.replace(
      /<\/head>/i,
      `    <script type="application/ld+json">${JSON.stringify(graphs)}</script>\n  </head>`
    );
  }
  const seeded = `<div id="root"><div class="prerender-seed" style="max-width:48rem;margin:0 auto;padding:2rem 1.25rem;font-family:Georgia,serif;line-height:1.75;color:#e8e8e8;background:#050505">${wrap(body)}</div></div>`;
  html = html.replace(/<div id="root"><\/div>/i, seeded);
  const outDir = routePath === '/' ? dist : path.join(dist, routePath.replace(/^\//, ''));
  ensureDir(outDir);
  const outFile = routePath === '/' ? path.join(dist, 'index.html') : path.join(outDir, 'index.html');
  fs.writeFileSync(outFile, html, 'utf8');
}

function loadData() {
  const dump = `
import { PAGE_SEO, FAQ_ITEMS, organizationJsonLd, definedTermSetJsonLd, webSiteJsonLd } from './src/data/seo.ts';
import { SITE } from './src/data/site.ts';
import { BLOG_POSTS } from './src/data/blogPosts.ts';
console.log(JSON.stringify({ seo: PAGE_SEO, faqs: FAQ_ITEMS, site: SITE, org: organizationJsonLd(), terms: definedTermSetJsonLd(), web: webSiteJsonLd(), posts: BLOG_POSTS }));
`;
  const tmp = path.join(root, '.prerender-dump.mts');
  fs.writeFileSync(tmp, dump);
  const res = spawnSync('npx', ['tsx', tmp], { cwd: root, encoding: 'utf8' });
  try { fs.unlinkSync(tmp); } catch { /* ignore */ }
  if (res.status !== 0) throw new Error(res.stderr || res.stdout);
  return JSON.parse(res.stdout.trim().split('\n').filter(Boolean).pop());
}

function main() {
  const indexPath = path.join(dist, 'index.html');
  if (!fs.existsSync(indexPath)) throw new Error('dist/index.html missing — run vite build first');
  const template = fs.readFileSync(indexPath, 'utf8');
  const { seo, faqs, site, org, terms, web, posts } = loadData();
  const baseGraphs = [org, web, terms];

  const pages = Object.values(seo).map((p) => ({
    path: p.path,
    title: p.title,
    description: p.description,
    body: `<article><h1>${escapeHtml(p.title.split('|')[0].trim())}</h1><p>${escapeHtml(p.description)}</p><p><a href="/contact">Contact Interdot</a> · <a href="/services">Services</a> · <a href="/faq">FAQ</a></p></article>`,
    jsonLd: baseGraphs,
  }));

  const home = pages.find((p) => p.path === '/');
  if (home) {
    home.body = `<article id="speakable-home"><h1>Reasoning-as-a-Service for Finance &amp; Cybersecurity</h1><p>${escapeHtml(site.description)}</p><h2>Financial Logic Synthesis</h2><p>Audit-ready causal analysis for quant funds and risk teams. High-frequency logic traces with 12ms average latency.</p><h2>Automated Cyber Recon</h2><p>Deterministic threat modeling with MITRE ATT&CK vectorization. Predict adversary logic before exploitation.</p><h2>Custom Vector Training</h2><p>Private reasoning models on your data with zero leakage and verifiable Logic Traces.</p><nav aria-label="Related"><a href="/services">Explore services</a> · <a href="/clients">Case studies</a> · <a href="/contact">Request API access</a></nav></article>`;
    home.jsonLd = [
      ...baseGraphs,
      {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        name: 'Interdot Reasoning-as-a-Service',
        url: site.url,
        description: site.description,
        areaServed: 'Worldwide',
        serviceType: ['Financial Logic Synthesis', 'Automated Cyber Recon', 'Custom Vector Training'],
      },
    ];
  }

  const faqPage = pages.find((p) => p.path === '/faq');
  if (faqPage) {
    faqPage.body = `<article><h1>Technical FAQ</h1>${faqs.map((f) => `<section><h2>${escapeHtml(f.q)}</h2><p>${escapeHtml(f.a)}</p></section>`).join('')}</article>`;
    faqPage.jsonLd = [
      ...baseGraphs,
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ];
  }

  const blogPage = pages.find((p) => p.path === '/blog');
  if (blogPage) {
    blogPage.body = `<article><h1>AI Agents &amp; Reasoning Blog</h1><ul>${posts.map((p) => `<li><a href="/blog/${p.slug}">${escapeHtml(p.title)}</a> — ${escapeHtml(p.description)}</li>`).join('')}</ul></article>`;
    blogPage.jsonLd = [
      ...baseGraphs,
      {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'Interdot AI Reasoning Blog',
        url: `${site.url}/blog`,
        blogPost: posts.map((p) => ({
          '@type': 'BlogPosting',
          headline: p.title,
          url: `${site.url}/blog/${p.slug}`,
          datePublished: p.date,
        })),
      },
    ];
  }

  for (const page of pages) writeRouteHtml(template, page.path, page);

  for (const post of posts) {
    writeRouteHtml(template, `/blog/${post.slug}`, {
      title: `${post.title} | Interdot Blog`,
      description: post.description,
      body: `<article><h1>${escapeHtml(post.title)}</h1><p><em>${escapeHtml(post.date)} · ${escapeHtml(post.readTime)}</em></p><p>${escapeHtml(post.description)}</p>${post.content.map((b) => (b.startsWith('## ') ? `<h2>${escapeHtml(b.slice(3))}</h2>` : `<p>${escapeHtml(b)}</p>`)).join('')}<p><a href="/contact">Get in Touch</a></p></article>`,
      jsonLd: [
        ...baseGraphs,
        {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          author: { '@type': 'Organization', name: site.legal },
          publisher: { '@type': 'Organization', name: site.legal },
          mainEntityOfPage: `${site.url}/blog/${post.slug}`,
        },
      ],
    });
  }

  // 404 page
  writeRouteHtml(template, '/404', {
    title: 'Page not found | Interdot',
    description: 'The requested page does not exist.',
    robots: 'noindex, nofollow',
    body: '<article><h1>Page not found</h1><p><a href="/">Return home</a></p></article>',
  });

  for (const f of ['staticwebapp.config.json', 'robots.txt', 'sitemap.xml', 'llms.txt']) {
    const src = path.join(root, 'public', f);
    if (fs.existsSync(src)) fs.copyFileSync(src, path.join(dist, f));
  }
  console.log(`Prerendered ${pages.length + posts.length} routes`);
}

main();
