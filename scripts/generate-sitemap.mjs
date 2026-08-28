import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function loadPosts() {
  const tmp = path.join(root, '.sitemap-dump.mts');
  fs.writeFileSync(
    tmp,
    `import { BLOG_POSTS } from './src/data/blogPosts.ts';
console.log(JSON.stringify(BLOG_POSTS.map(p => p.slug)));`
  );
  const res = spawnSync('npx', ['tsx', tmp], { cwd: root, encoding: 'utf8' });
  try {
    fs.unlinkSync(tmp);
  } catch {
    /* ignore */
  }
  if (res.status !== 0) throw new Error(res.stderr || res.stdout);
  const line = res.stdout.trim().split('\n').filter(Boolean).pop();
  return JSON.parse(line);
}

const urls = [
  '/',
  '/guides',
  '/guides/waec',
  '/guides/bece',
  '/guides/study',
  '/guides/writing',
  '/about',
  '/faq',
  '/contact',
  '/privacy',
  '/editorial-policy',
  '/terms',
];
const slugs = loadPosts();
for (const slug of slugs) urls.push(`/guides/${slug}`);

const today = new Date().toISOString().slice(0, 10);
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>https://interdot.net${u}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq></url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(root, 'public', 'sitemap.xml'), xml);
console.log(`Wrote sitemap with ${urls.length} URLs`);
