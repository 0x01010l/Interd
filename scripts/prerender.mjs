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
import { AUTHORS, REVIEWERS, EDITORIAL_POLICY_SECTIONS, getPostAttribution } from './src/data/editorial.ts';
const postsWithAttribution = BLOG_POSTS.map((p) => ({ ...p, attribution: getPostAttribution(p) }));
console.log(JSON.stringify({ posts: postsWithAttribution, privacy: PRIVACY_SECTIONS, terms: TERMS_SECTIONS, faqs: FAQ_ITEMS, about: ABOUT_COPY, site: SITE, categories: CATEGORIES, authors: AUTHORS, reviewers: REVIEWERS, editorial: EDITORIAL_POLICY_SECTIONS }));
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

function siteShell(mainHtml) {
  const nav = `<header role="banner" style="border-bottom:1px solid #e8e6e1;padding:1rem 0;margin-bottom:1.5rem"><nav aria-label="Primary" style="max-width:42rem;margin:0 auto;padding:0 1.25rem;font-family:system-ui,sans-serif;font-size:0.9rem"><a href="/" style="font-weight:600;margin-right:1rem">Interdot Study</a><a href="/guides" style="margin-right:0.75rem">Guides</a><a href="/guides/waec" style="margin-right:0.75rem">WAEC</a><a href="/guides/bece" style="margin-right:0.75rem">BECE</a><a href="/guides/study" style="margin-right:0.75rem">Study tips</a><a href="/guides/writing" style="margin-right:0.75rem">How to write</a><a href="/about" style="margin-right:0.75rem">About</a><a href="/contact" style="margin-right:0.75rem">Contact</a><a href="/privacy">Privacy</a></nav></header>`;
  const footer = `<footer role="contentinfo" style="border-top:1px solid #e8e6e1;margin-top:2rem;padding:1.5rem 0;font-family:system-ui,sans-serif;font-size:0.8rem;color:#5c5a56"><nav aria-label="Footer" style="max-width:42rem;margin:0 auto;padding:0 1.25rem"><a href="/editorial-policy" style="margin-right:0.75rem">Editorial policy</a><a href="/faq" style="margin-right:0.75rem">FAQ</a><a href="/terms" style="margin-right:0.75rem">Terms</a><a href="/privacy">Privacy</a></nav><p style="max-width:42rem;margin:0.75rem auto 0;padding:0 1.25rem">© FIX FIGURES LLC · contact@interdot.net</p></footer>`;
  return `${nav}<main>${mainHtml}</main>${footer}`;
}

function main() {
  const indexPath = path.join(dist, 'index.html');
  if (!fs.existsSync(indexPath)) throw new Error('dist/index.html missing');
  const template = fs.readFileSync(indexPath, 'utf8');
  const { posts, privacy, terms, faqs, about, site, categories, authors, reviewers, editorial } = loadData();
  const pages = [];

  pages.push({
    path: '/',
    title: `${site.name} | WAEC, BECE, study tips & how to write`,
    description: site.description,
    body: siteShell(`<article><h1>How to study, how to write, how to sit the paper</h1><p>${escapeHtml(site.description)}</p><p>Independent guides for WAEC, BECE, and school exams. No leaked questions. No grade promises.</p><ul>${posts.map((p) => `<li><a href="/guides/${p.slug}">${escapeHtml(p.title)}</a> — ${escapeHtml(p.description)}</li>`).join('')}</ul></article>`),
  });

  pages.push({
    path: '/about',
    title: `About ${site.name}`,
    description: about.lead,
    body: siteShell(`<article><h1>About ${escapeHtml(site.name)}</h1><p>${escapeHtml(about.h1)}</p><p>${escapeHtml(about.lead)}</p><p>${escapeHtml(about.who)}</p><p>${escapeHtml(about.editorial)}</p><p>${escapeHtml(about.method)}</p><p>${escapeHtml(about.contact)}</p></article>`),
  });

  pages.push({
    path: '/contact',
    title: `Contact ${site.name}`,
    description: `Email ${site.email} for corrections or privacy requests.`,
    body: siteShell(`<article><h1>Contact</h1><p>Write for corrections, classroom-use questions, or privacy requests. We do not offer leaked papers or tutoring.</p><p>Email: <a href="mailto:${site.email}">${site.email}</a></p><p>${escapeHtml(site.legal)}</p><p>${site.address.map(escapeHtml).join('<br/>')}</p></article>`),
  });

  pages.push({
    path: '/privacy',
    title: `Privacy Policy | ${site.name}`,
    description: 'Cookies, Google Analytics, AdSense, CMP consent, and reader emails.',
    body: siteShell(sectionsToHtml('Privacy Policy', privacy)),
  });

  pages.push({
    path: '/privacy-policy',
    title: `Privacy Policy | ${site.name}`,
    description: 'This URL has moved.',
    robots: 'noindex, follow',
    body: siteShell(
      `<article><h1>This page moved</h1><p>Our privacy policy is at <a href="/privacy">/privacy</a>.</p><script>location.replace("/privacy")</script></article>`
    ),
  });

  pages.push({
    path: '/editorial-policy',
    title: `Editorial policy | ${site.name}`,
    description: 'Writers, reviewers, sources, and corrections.',
    body: siteShell(
      sectionsToHtml('Editorial policy', editorial) +
        `<section><h2>Writers</h2><ul>${authors.map((a) => `<li><strong>${escapeHtml(a.name)}</strong> — ${escapeHtml(a.role)}. ${escapeHtml(a.credentials)}.</li>`).join('')}</ul></section>` +
        `<section><h2>Reviewers</h2><ul>${reviewers.map((r) => `<li><strong>${escapeHtml(r.name)}</strong> — ${escapeHtml(r.role)}. ${escapeHtml(r.credentials)}.</li>`).join('')}</ul></section>`
    ),
  });
  pages.push({
    path: '/terms',
    title: `Terms of Use | ${site.name}`,
    description: 'Terms for Interdot Study educational guides.',
    body: siteShell(sectionsToHtml('Terms of Use', terms)),
  });

  const faqBody = `<article><h1>FAQ</h1>${faqs.map((f) => `<section><h2>${escapeHtml(f.q)}</h2><p>${escapeHtml(f.a)}</p></section>`).join('')}</article>`;
  pages.push({
    path: '/faq',
    title: `FAQ | ${site.name}`,
    description: 'Is this official WAEC? Do we sell expo? Who publishes the blog?',
    body: siteShell(faqBody),
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
    body: siteShell(`<article><h1>All guides</h1><ul>${posts.map((p) => `<li><a href="/guides/${p.slug}">${escapeHtml(p.title)}</a> — ${escapeHtml(p.description)}</li>`).join('')}</ul></article>`),
  });

  for (const c of categories) {
    const list = posts.filter((p) => p.category === c.slug);
    pages.push({
      path: `/guides/${c.slug}`,
      title: `${c.label} guides | ${site.name}`,
      description: c.description,
      body: siteShell(`<article><h1>${escapeHtml(c.label)}</h1><p>${escapeHtml(c.description)}</p><ul>${list.map((p) => `<li><a href="/guides/${p.slug}">${escapeHtml(p.title)}</a></li>`).join('')}</ul></article>`),
    });
  }

  for (const post of posts) {
    const { author, reviewer, sources } = post.attribution;
    const sourceHtml = sources
      .map(
        (s) =>
          `<li><a href="${escapeHtml(s.url)}">${escapeHtml(s.label)}</a> — ${escapeHtml(s.note)}</li>`
      )
      .join('');
    pages.push({
      path: `/guides/${post.slug}`,
      title: `${post.title} | ${site.name}`,
      description: post.description,
      body: siteShell(
        `<article><h1>${escapeHtml(post.title)}</h1><p><em>${escapeHtml(post.date)} · ${escapeHtml(post.readTime)} · by ${escapeHtml(author.name)}</em></p><p>${escapeHtml(post.description)}</p>${post.content
          .map((p) =>
            p.startsWith('## ') ? `<h2>${escapeHtml(p.slice(3))}</h2>` : `<p>${escapeHtml(p)}</p>`
          )
          .join('')}<footer><p><strong>Written by</strong> ${escapeHtml(author.name)}, ${escapeHtml(author.credentials)}. <strong>Reviewed by</strong> ${escapeHtml(reviewer.name)}, ${escapeHtml(reviewer.credentials)}.</p><p><strong>Sources:</strong></p><ul>${sourceHtml}</ul></footer></article>`
      ),
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        datePublished: post.date,
        dateModified: post.date,
        description: post.description,
        inLanguage: 'en',
        educationalUse: 'study guide',
        author: { '@type': 'Person', name: author.name, jobTitle: author.role },
        reviewedBy: { '@type': 'Person', name: reviewer.name, jobTitle: reviewer.role },
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
      body: siteShell(`<article><h1>This page moved</h1><p>Continue at <a href="${to}">${to}</a>.</p><script>location.replace(${JSON.stringify(to)})</script></article>`),
    });
  }

  for (const page of pages) {
    writeRouteHtml(template, page.path, page);
  }

  for (const f of ['staticwebapp.config.json', 'robots.txt', 'sitemap.xml', 'ads.txt']) {
    const src = path.join(root, 'public', f);
    if (fs.existsSync(src)) fs.copyFileSync(src, path.join(dist, f));
  }
  console.log(`Prerendered ${pages.length} routes`);
}

main();
