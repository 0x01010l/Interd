import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const urls = [
  '/',
  '/services',
  '/about',
  '/faq',
  '/clients',
  '/contact',
  '/privacy',
  '/terms',
];

const today = new Date().toISOString().slice(0, 10);
const priorities = {
  '/': '1.0',
  '/services': '0.9',
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
