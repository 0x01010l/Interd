/**
 * Post-build prerender: emit a static HTML file per public route with unique
 * <title>/meta/canonical and crawlable body text so Azure SWA serves real HTML
 * instead of one empty SPA shell for every URL.
 *
 * Usage: node scripts/prerender.mjs
 * Expects dist/index.html already built by Vite.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { createRequire } from 'module';
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

function writeRouteHtml(template, routePath, { title, description, bodyHtml, jsonLd }) {
  const canonical = `https://interdot.net${routePath === '/' ? '/' : routePath}`;
  let html = template;

  // Strip template homepage SEO tags so each route owns unique head signals
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

  const seo = `
    <main id="prerender-content" style="max-width:48rem;margin:0 auto;padding:2rem 1.25rem;font-family:system-ui,sans-serif;line-height:1.6;color:#e8e8e8;background:#05070d">
      ${bodyHtml}
      <p style="margin-top:2rem;font-size:0.9rem;opacity:0.7">Interactive Interdot app loads below for tools and navigation.</p>
    </main>
    <script>
      (function () {
        function hide() {
          var el = document.getElementById('prerender-content');
          if (el) el.setAttribute('hidden', '');
        }
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', function () {
            // Hide prerender once React has a chance to paint
            setTimeout(hide, 50);
          });
        } else {
          setTimeout(hide, 50);
        }
      })();
    </script>`;

  html = html.replace(/<div id="root"><\/div>/i, `${seo}\n    <div id="root"></div>`);

  const outDir =
    routePath === '/'
      ? dist
      : path.join(dist, routePath.replace(/^\//, ''));
  ensureDir(outDir);
  const outFile = routePath === '/' ? path.join(dist, 'index.html') : path.join(outDir, 'index.html');
  fs.writeFileSync(outFile, html, 'utf8');
  return outFile;
}

function loadTsData() {
  // Compile blog + tools via tsx dump to temp json
  const dump = `
import { BLOG_POSTS } from './src/data/blogPosts.ts';
import { TOOLS } from './src/data/tools.ts';
console.log(JSON.stringify({ posts: BLOG_POSTS, tools: TOOLS }));
`;
  const tmp = path.join(root, '.prerender-dump.mts');
  fs.writeFileSync(tmp, dump);
  const res = spawnSync('npx', ['tsx', tmp], { cwd: root, encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 });
  fs.unlinkSync(tmp);
  if (res.status !== 0) {
    console.error(res.stderr || res.stdout);
    throw new Error('Failed to load blog/tools data for prerender');
  }
  const line = res.stdout.trim().split('\n').filter(Boolean).pop();
  return JSON.parse(line);
}

function main() {
  const indexPath = path.join(dist, 'index.html');
  if (!fs.existsSync(indexPath)) {
    throw new Error('dist/index.html missing — run vite build first');
  }
  const template = fs.readFileSync(indexPath, 'utf8');
  const { posts, tools } = loadTsData();

  const pages = [];

  pages.push({
    path: '/',
    title: 'Interdot | Custom AI Agents & Free AI Tools',
    description:
      'Interdot (FIX FIGURES LLC) builds custom AI agents for ecommerce, finance, and cybersecurity — plus free AI writing tools. Not affiliated with unrelated “Interdot Advisors” brands.',
    body: `<h1>Custom AI Agents</h1><p>Interdot designs custom AI agents for ecommerce, finance, and cybersecurity niches — then proves the workflows in public with free tools merchants can use today. Operated by FIX FIGURES LLC, North Canton, Ohio.</p>`,
  });

  pages.push({
    path: '/about',
    title: 'About Interdot | Custom AI Agents & Free Tools',
    description:
      'Interdot is operated by FIX FIGURES LLC. We build custom AI agents and free ecommerce writing tools. Publisher identity, address, and contact details.',
    body: `<h1>About Interdot</h1><p>Legal entity: FIX FIGURES LLC. Brand: Interdot. Address: 6545 Market Avenue North, North Canton, OH 44721, United States. Contact: contact@interdot.net.</p><p>Interdot publishes free ecommerce writing tools and custom AI agent services. We are not affiliated with unrelated search results that may use similar names such as “Interdot Advisors.”</p>`,
  });

  pages.push({
    path: '/tools',
    title: 'Free Ecommerce AI Tools | Interdot Custom Agents',
    description:
      'Free Interdot AI writing tools that prove our ecommerce agents — product descriptions, Shopify titles, Etsy tags, review replies, ads, FAQs, SEO metas, and bulk rewrites.',
    body: `<h1>Ecommerce writing agents you can use free</h1><ul>${tools
      .map((t) => `<li><a href="${t.path}">${escapeHtml(t.name)}</a> — ${escapeHtml(t.benefit)}</li>`)
      .join('')}</ul>`,
  });

  pages.push({
    path: '/blog',
    title: 'Ecommerce Writing Blog | Interdot AI Agents & Free Tools',
    description:
      'In-depth guides for ecommerce listing copy, SEO, reviews, and marketplace content — with free Interdot tools on every topic.',
    body: `<h1>Ecommerce writing guides</h1><ul>${posts
      .map(
        (p) =>
          `<li><a href="/blog/${p.slug}">${escapeHtml(p.title)}</a> — ${escapeHtml(p.description)}</li>`
      )
      .join('')}</ul>`,
  });

  pages.push({
    path: '/contact',
    title: 'Contact Interdot | Custom AI Agents & Free Tools',
    description:
      'Contact Interdot (FIX FIGURES LLC) for custom AI agents or questions about free AI writing tools. Email contact@interdot.net.',
    body: `<h1>Contact Interdot</h1><p>Email contact@interdot.net · advisory@interdot.net · 6545 Market Avenue North, North Canton, OH 44721, US.</p>`,
  });

  pages.push({
    path: '/privacy',
    title: 'Privacy Policy | Interdot',
    description:
      'Interdot privacy policy for custom AI agents and free tools — Azure OpenAI, cookies, Google AdSense, and consent.',
    body: `<h1>Privacy Policy</h1><p>Interdot is operated by FIX FIGURES LLC. Full privacy policy covering Azure OpenAI, cookie consent, and AdSense.</p>`,
  });

  pages.push({
    path: '/privacy-policy',
    title: 'Privacy Policy | Interdot',
    description:
      'Interdot privacy policy for custom AI agents and free tools — Azure OpenAI, cookies, Google AdSense, and consent.',
    body: `<h1>Privacy Policy</h1><p>Interdot is operated by FIX FIGURES LLC. Read the full privacy policy on this page after the app loads, covering Azure OpenAI processing, cookie consent, and AdSense.</p>`,
  });

  pages.push({
    path: '/terms',
    title: 'Terms of Use | Interdot',
    description: 'Terms of use for Interdot custom AI agent services and free AI ecommerce writing tools operated by FIX FIGURES LLC.',
    body: `<h1>Terms of Use</h1><p>Interdot is operated by FIX FIGURES LLC. Full terms load with the application.</p>`,
  });

  pages.push({
    path: '/services',
    title: 'Custom AI Agent Services | Interdot',
    description:
      'Commission custom AI agents for finance, cybersecurity, and ecommerce workflows from Interdot (FIX FIGURES LLC).',
    body: `<h1>Custom AI agents for your niche</h1><p>Finance decision agents, security ops agents, and custom agent training — plus free ecommerce writing tools.</p>`,
  });

  pages.push({
    path: '/faq',
    title: 'FAQ | Interdot Custom AI Agents & Free Tools',
    description: 'FAQ about Interdot custom AI agents, free tools, privacy, cookies, and FIX FIGURES LLC publisher identity.',
    body: `<h1>FAQ</h1><p>Answers about agents, free tools, rate limits, cookies, and who publishes Interdot.</p>`,
  });

  pages.push({
    path: '/scenarios',
    title: 'Illustrative Agent Scenarios | Interdot',
    description:
      'Illustrative Interdot custom AI agent scenarios for ecommerce, finance, and cybersecurity — not client testimonials.',
    body: `<h1>Illustrative agent use cases</h1><p>Example workflows for ecommerce, finance, and security niches. These are illustrative, not testimonials.</p>`,
  });

  pages.push({
    path: '/clients',
    title: 'Illustrative Agent Scenarios | Interdot',
    description:
      'Illustrative Interdot custom AI agent scenarios for ecommerce, finance, and cybersecurity — not client testimonials.',
    body: `<h1>Illustrative agent use cases</h1><p>Example workflows for ecommerce, finance, and security niches. These are illustrative, not testimonials.</p>`,
  });

  for (const tool of tools) {
    const guideText = [tool.guide.whatIs, ...tool.guide.howTo, tool.guide.whyUseful, tool.guide.body]
      .filter(Boolean)
      .join('</p><p>');
    pages.push({
      path: tool.path,
      title: `${tool.title} | Free AI Tool | Interdot`,
      description: tool.metaDescription,
      body: `<h1>${escapeHtml(tool.h1)}</h1><p>${escapeHtml(tool.benefit)}</p><p>${guideText
        .split('</p><p>')
        .map(escapeHtml)
        .join('</p><p>')}</p>`,
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
        .join('')}<p><a href="${post.toolPath}">Related tool: ${escapeHtml(post.toolLabel)}</a></p></article>`,
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

  // Ensure SWA config & 404 copied (vite usually copies public/)
  for (const f of ['staticwebapp.config.json', '404.html', 'robots.txt', 'sitemap.xml', 'ads.txt']) {
    const src = path.join(root, 'public', f);
    if (fs.existsSync(src)) fs.copyFileSync(src, path.join(dist, f));
  }

  console.log(`Prerendered ${pages.length} routes into dist/`);
}

main();
