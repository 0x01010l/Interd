/**
 * Post-build prerender: unique titles/meta + crawlable HTML inside #root.
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

function writeRouteHtml(template, routePath, { title, description, body, bodyHtml, jsonLd, robots }) {
  const htmlBody = bodyHtml || body || '';
  const canonical = `https://interdot.net${routePath === '/' ? '/' : routePath}`;
  let html = template;
  html = html.replace(/<meta\s+name="description"[^>]*>\s*/gi, '');
  html = html.replace(/<link\s+rel="canonical"[^>]*>\s*/gi, '');
  html = html.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(title)}</title>`);
  const robotsContent =
    robots || 'index, follow, max-image-preview:large, max-snippet:-1';
  const metaBlock = [
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<meta name="robots" content="${robotsContent}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:type" content="${routePath.startsWith('/guides/') && routePath.split('/').length > 2 ? 'article' : 'website'}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:site_name" content="Interdot Study" />`,
  ].join('\n    ');
  html = html.replace(/<\/title>/i, `</title>\n    ${metaBlock}`);
  if (jsonLd) {
    html = html.replace(
      /<\/head>/i,
      `    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>\n  </head>`
    );
  }
  const seeded = `<div id="root"><div class="prerender-seed" style="max-width:42rem;margin:0 auto;padding:2rem 1.25rem;font-family:Georgia,serif;line-height:1.75;color:#141311;background:#ffffff">${htmlBody}</div></div>`;
  html = html.replace(/<div id="root"><\/div>/i, seeded);
  const outDir = routePath === '/' ? dist : path.join(dist, routePath.replace(/^\//, ''));
  ensureDir(outDir);
  const outFile = routePath === '/' ? path.join(dist, 'index.html') : path.join(outDir, 'index.html');
  fs.writeFileSync(outFile, html, 'utf8');
}

function loadData() {
  const dump = `
import { BLOG_POSTS } from './src/data/blogPosts.ts';
import { PRIVACY_SECTIONS, TERMS_SECTIONS, FAQ_ITEMS, ABOUT_COPY } from './src/data/staticPageCopy.ts';
import { SITE, CATEGORIES } from './src/data/site.ts';
console.log(JSON.stringify({ posts: BLOG_POSTS, privacy: PRIVACY_SECTIONS, terms: TERMS_SECTIONS, faqs: FAQ_ITEMS, about: ABOUT_COPY, site: SITE, categories: CATEGORIES }));
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

function sectionsToHtml(title, sections) {
  const body = sections
    .map(
      (s) =>
        `<section><h2>${escapeHtml(s.heading)}</h2>${s.paragraphs.map((p) => `<p>${escapeHtml(p)}</p>`).join('')}</section>`
    )
    .join('');
  return `<article><h1>${escapeHtml(title)}</h1>${body}</article>`;
}

function main() {
  const indexPath = path.join(dist, 'index.html');
  if (!fs.existsSync(indexPath)) throw new Error('dist/index.html missing');
  const template = fs.readFileSync(indexPath, 'utf8');
  const { posts, privacy, terms, faqs, about, site, categories } = loadData();
  const pages = [];

  pages.push({
    path: '/',
    title: `${site.name} | WAEC, BECE, study tips & how to write`,
    description: site.description,
    body: `<article><h1>How to study, how to write, how to sit the paper</h1><p>${escapeHtml(site.description)}</p><p>Independent guides for WAEC, BECE, and school exams. No leaked questions. No grade promises.</p><ul>${posts.map((p) => `<li><a href="/guides/${p.slug}">${escapeHtml(p.title)}</a> — ${escapeHtml(p.description)}</li>`).join('')}</ul></article>`,
  });

  pages.push({
    path: '/about',
    title: `About ${site.name}`,
    description: about.lead,
    body: `<article><h1>About ${escapeHtml(site.name)}</h1><p>${escapeHtml(about.h1)}</p><p>${escapeHtml(about.lead)}</p><p>${escapeHtml(about.who)}</p><p>${escapeHtml(about.editorial)}</p><p>${escapeHtml(about.method)}</p><p>${escapeHtml(about.contact)}</p></article>`,
  });

  pages.push({
    path: '/contact',
    title: `Contact ${site.name}`,
    description: `Email ${site.email} for corrections or privacy requests.`,
    body: `<article><h1>Contact</h1><p>Write for corrections, classroom-use questions, or privacy requests. We do not offer leaked papers or tutoring.</p><p>Email: <a href="mailto:${site.email}">${site.email}</a></p><p>${escapeHtml(site.legal)}</p><p>${site.address.map(escapeHtml).join('<br/>')}</p></article>`,
  });

  pages.push({
    path: '/privacy',
    title: `Privacy Policy | ${site.name}`,
    description: 'Cookies, Google Analytics consent, and reader emails.',
    body: sectionsToHtml('Privacy Policy', privacy),
  });
  pages.push({
    path: '/privacy-policy',
    title: `Privacy Policy | ${site.name}`,
    description: 'Cookies, Google Analytics consent, and reader emails.',
    body: sectionsToHtml('Privacy Policy', privacy),
  });
  pages.push({
    path: '/terms',
    title: `Terms of Use | ${site.name}`,
    description: 'Terms for Interdot Study educational guides.',
    body: sectionsToHtml('Terms of Use', terms),
  });

  const faqBody = `<article><h1>FAQ</h1>${faqs.map((f) => `<section><h2>${escapeHtml(f.q)}</h2><p>${escapeHtml(f.a)}</p></section>`).join('')}</article>`;
  pages.push({
    path: '/faq',
    title: `FAQ | ${site.name}`,
    description: 'Is this official WAEC? Do we sell expo? Who publishes the blog?',
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

  pages.push({
    path: '/guides',
    title: `All study guides | ${site.name}`,
    description: site.description,
    body: `<article><h1>All guides</h1><ul>${posts.map((p) => `<li><a href="/guides/${p.slug}">${escapeHtml(p.title)}</a> — ${escapeHtml(p.description)}</li>`).join('')}</ul></article>`,
  });

  for (const c of categories) {
    const list = posts.filter((p) => p.category === c.slug);
    pages.push({
      path: `/guides/${c.slug}`,
      title: `${c.label} guides | ${site.name}`,
      description: c.description,
      body: `<article><h1>${escapeHtml(c.label)}</h1><p>${escapeHtml(c.description)}</p><ul>${list.map((p) => `<li><a href="/guides/${p.slug}">${escapeHtml(p.title)}</a></li>`).join('')}</ul></article>`,
    });
  }

  for (const post of posts) {
    pages.push({
      path: `/guides/${post.slug}`,
      title: `${post.title} | ${site.name}`,
      description: post.description,
      body: `<article><h1>${escapeHtml(post.title)}</h1><p><em>${escapeHtml(post.date)} · ${escapeHtml(post.readTime)}</em></p><p>${escapeHtml(post.description)}</p>${post.content
        .map((p) =>
          p.startsWith('## ') ? `<h2>${escapeHtml(p.slice(3))}</h2>` : `<p>${escapeHtml(p)}</p>`
        )
        .join('')}</article>`,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        datePublished: post.date,
        dateModified: post.date,
        description: post.description,
        inLanguage: 'en',
        educationalUse: 'study guide',
        author: { '@type': 'Organization', name: site.name, legalName: site.legal },
        publisher: { '@type': 'Organization', name: site.name, legalName: site.legal },
        mainEntityOfPage: `https://interdot.net/guides/${post.slug}`,
      },
    });
  }

  for (const [from, to] of [
    ['/blog', '/guides'],
    ['/tools', '/guides'],
    ['/services', '/guides'],
    ['/clients', '/about'],
  ]) {
    pages.push({
      path: from,
      title: `Moved | ${site.name}`,
      description: 'This URL has moved.',
      robots: 'noindex, follow',
      body: `<article><h1>This page moved</h1><p>Continue at <a href="${to}">${to}</a>.</p><script>location.replace(${JSON.stringify(to)})</script></article>`,
    });
  }

  for (const page of pages) {
    writeRouteHtml(template, page.path, page);
  }

  for (const f of ['staticwebapp.config.json', 'robots.txt', 'sitemap.xml']) {
    const src = path.join(root, 'public', f);
    if (fs.existsSync(src)) fs.copyFileSync(src, path.join(dist, f));
  }
  console.log(`Prerendered ${pages.length} routes`);
}

main();
