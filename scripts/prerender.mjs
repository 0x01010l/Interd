/**
 * Post-build prerender for SPA SEO.
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
  return `<header role="banner" style="border-bottom:1px solid #d4dae3;padding:1rem 0;margin-bottom:1.5rem"><nav aria-label="Primary" style="max-width:42rem;margin:0 auto;padding:0 1.25rem;font-family:system-ui,sans-serif;font-size:0.9rem"><a href="/" style="font-weight:700;margin-right:1rem;color:#0f766e">INTERDOT</a><a href="/approach" style="margin-right:0.75rem;color:#5a6578">Approach</a><a href="/services" style="margin-right:0.75rem;color:#5a6578">Services</a><a href="/about" style="margin-right:0.75rem;color:#5a6578">About</a><a href="/faq" style="margin-right:0.75rem;color:#5a6578">FAQ</a><a href="/contact" style="color:#0f766e;font-weight:600">Contact</a></nav></header>`;
}

function siteFooter() {
  return `<footer role="contentinfo" style="border-top:1px solid #d4dae3;margin-top:2rem;padding:1.5rem 0;font-family:system-ui,sans-serif;font-size:0.8rem;color:#5a6578"><p style="max-width:42rem;margin:0 auto;padding:0 1.25rem">© FIX FIGURES LLC · contact@interdot.net · 6545 Market Avenue North, North Canton, OH 44721</p></footer>`;
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
  const seeded = `<div id="root"><div class="prerender-seed" style="max-width:42rem;margin:0 auto;padding:2rem 1.25rem;font-family:Georgia,serif;line-height:1.75;color:#0b1324;background:#f7f8fa">${wrap(body)}</div></div>`;
  html = html.replace(/<div id="root"><\/div>/i, seeded);
  const outDir = routePath === '/' ? dist : path.join(dist, routePath.replace(/^\//, ''));
  ensureDir(outDir);
  const outFile = routePath === '/' ? path.join(dist, 'index.html') : path.join(outDir, 'index.html');
  fs.writeFileSync(outFile, html, 'utf8');
}

function loadData() {
  const dump = `
import { PAGE_SEO, FAQ_ITEMS, organizationJsonLd, webSiteJsonLd } from './src/data/seo.ts';
import { SITE } from './src/data/site.ts';
import { APPROACH_STEPS, SERVICES } from './src/data/copy.ts';
console.log(JSON.stringify({ seo: PAGE_SEO, faqs: FAQ_ITEMS, site: SITE, org: organizationJsonLd(), web: webSiteJsonLd(), steps: APPROACH_STEPS, services: SERVICES }));
`;
  const tmp = path.join(root, '.prerender-dump.mts');
  fs.writeFileSync(tmp, dump);
  const res = spawnSync('npx', ['tsx', tmp], { cwd: root, encoding: 'utf8' });
  try {
    fs.unlinkSync(tmp);
  } catch {
    /* ignore */
  }
  if (res.status !== 0) throw new Error(res.stderr || res.stdout);
  return JSON.parse(res.stdout.trim().split('\n').filter(Boolean).pop());
}

function main() {
  const indexPath = path.join(dist, 'index.html');
  if (!fs.existsSync(indexPath)) throw new Error('dist/index.html missing');
  const template = fs.readFileSync(indexPath, 'utf8');
  const { seo, faqs, site, org, web, steps, services } = loadData();
  const base = [org, web];

  const pages = Object.values(seo).map((p) => ({
    path: p.path,
    title: p.title,
    description: p.description,
    body: `<article><h1>${escapeHtml(p.title.split('|')[0].trim())}</h1><p>${escapeHtml(p.description)}</p><p><a href="/contact">Contact</a></p></article>`,
    jsonLd: base,
  }));

  const home = pages.find((p) => p.path === '/');
  if (home) {
    home.body = `<article><h1>INTERDOT</h1><p>${escapeHtml(site.description)}</p><p>Scroll through our signal-to-introduction journey: growing companies, business-change signals, need mapping, vendor evaluation, and qualified introductions.</p><h2>How we work</h2><ol>${steps.map((s) => `<li><strong>${escapeHtml(s.title)}</strong> — ${escapeHtml(s.body)}</li>`).join('')}</ol><p><a href="/contact">Get in touch</a> · <a href="/approach">Approach</a></p><p>Email: contact@interdot.net · 6545 Market Avenue North, North Canton, OH 44721</p></article>`;
  }

  const approach = pages.find((p) => p.path === '/approach');
  if (approach) {
    approach.body = `<article><h1>Our approach</h1>${steps.map((s) => `<section><h2>${escapeHtml(s.num)}. ${escapeHtml(s.title)}</h2><p>${escapeHtml(s.body)}</p></section>`).join('')}</article>`;
  }

  const servicesPage = pages.find((p) => p.path === '/services');
  if (servicesPage) {
    servicesPage.body = `<article><h1>Services</h1>${services.map((s) => `<section><h2>${escapeHtml(s.title)}</h2><p>${escapeHtml(s.body)}</p></section>`).join('')}</article>`;
  }

  const faq = pages.find((p) => p.path === '/faq');
  if (faq) {
    faq.body = `<article><h1>FAQ</h1>${faqs.map((f) => `<section><h2>${escapeHtml(f.q)}</h2><p>${escapeHtml(f.a)}</p></section>`).join('')}</article>`;
    faq.jsonLd = [
      ...base,
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

  for (const page of pages) writeRouteHtml(template, page.path, page);

  writeRouteHtml(template, '/404', {
    title: 'Page not found | Interdot',
    description: 'Page not found.',
    robots: 'noindex, nofollow',
    body: '<article><h1>Page not found</h1><p><a href="/">Home</a></p></article>',
  });

  for (const f of ['staticwebapp.config.json', 'robots.txt', 'sitemap.xml', 'llms.txt', '404.html']) {
    const src = path.join(root, 'public', f);
    if (fs.existsSync(src)) fs.copyFileSync(src, path.join(dist, f));
  }
  console.log(`Prerendered ${pages.length + 1} routes`);
}

main();
