/**
 * Regenerates public/sitemap.xml from blog + tool routes.
 * Run: node scripts/generate-sitemap.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const dump = `
import { BLOG_POSTS } from './src/data/blogPosts.ts';
import { TOOLS } from './src/data/tools.ts';
console.log(JSON.stringify({ posts: BLOG_POSTS.map(p => p.slug), tools: TOOLS.map(t => t.path) }));
`;
const tmp = path.join(root, '.sitemap-dump.mts');
fs.writeFileSync(tmp, dump);
const res = spawnSync('npx', ['tsx', tmp], { cwd: root, encoding: 'utf8' });
fs.unlinkSync(tmp);
if (res.status !== 0) {
  console.error(res.stderr);
  process.exit(1);
}
const { posts, tools } = JSON.parse(res.stdout.trim().split('\n').filter(Boolean).pop());

const staticPaths = [
  '/',
  '/tools',
  ...tools,
  '/blog',
  ...posts.map((s) => `/blog/${s}`),
  '/about',
  '/contact',
  '/privacy-policy',
  '/terms',
  '/services',
  '/faq',
  '/scenarios',
  '/clients',
];

const urls = staticPaths
  .map((p) => `  <url><loc>https://interdot.net${p === '/' ? '/' : p}</loc></url>`)
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

fs.writeFileSync(path.join(root, 'public', 'sitemap.xml'), xml);
console.log(`Wrote sitemap with ${staticPaths.length} URLs`);
