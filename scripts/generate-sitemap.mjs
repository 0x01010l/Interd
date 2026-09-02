import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function loadSlugs() {
  const tmp = path.join(root, '.sitemap-blog.mts');
  fs.writeFileSync(
    tmp,
    `import { BLOG_POSTS } from './src/data/blogPosts.ts';
console.log(JSON.stringify(BLOG_POSTS.map(p => p.slug)));`
  );
  const res = spawnSync('npx', ['tsx', tmp], { cwd: root, encoding: 'utf8' });
  try { fs.unlinkSync(tmp); } catch { /* ignore */ }
  if (res.status !== 0) throw new Error(res.stderr || res.stdout);
  return JSON.parse(res.stdout.trim().split('\n').filter(Boolean).pop());
}

const urls = [
  '/',
  '/services',
  '/about',
  '/faq',
  '/clients',
  '/contact',
  '/privacy',
  '/terms',
  '/blog',
];

for (const slug of loadSlugs()) urls.push(`/blog/${slug}`);

const today = new Date().toISOString().slice(0, 10);
const priorities = {
  '/': '1.0',
  '/services': '0.9',
  '/blog': '0.85',
  '/about': '0.8',
  '/faq': '0.8',
  '/clients': '0.7',
  '/contact': '0.7',
  '/privacy': '0.3',
  '/terms': '0.3',
};

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url><loc>https://interdot.net${u === '/' ? '/' : u}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>${priorities[u] ?? '0.5'}</priority></url>`
  )
  .join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(root, 'public', 'sitemap.xml'), xml);
console.log(`Wrote sitemap with ${urls.length} URLs`);
