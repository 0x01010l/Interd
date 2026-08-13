import { Link, useLocation } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import SEO from '../components/SEO';
import { SITE, CATEGORIES } from '../data/site';
import { BLOG_POSTS } from '../data/blogPosts';

export default function Blog() {
  const { pathname } = useLocation();
  const tail = pathname.replace(/\/$/, '').split('/').pop();
  const cat = CATEGORIES.find((c) => c.slug === tail);
  const posts = cat ? BLOG_POSTS.filter((p) => p.category === cat.slug) : BLOG_POSTS;
  const title = cat ? `${cat.label} guides | ${SITE.name}` : `All study guides | ${SITE.name}`;
  const description = cat ? cat.description : SITE.description;
  const path = cat ? `/guides/${cat.slug}` : '/guides';

  return (
    <PageLayout>
      <SEO
        title={title}
        description={description}
        path={path}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: title,
          description,
          url: `${SITE.url}${path}`,
          isPartOf: { '@type': 'WebSite', name: SITE.name, url: SITE.url },
          mainEntity: {
            '@type': 'ItemList',
            numberOfItems: posts.length,
            itemListElement: posts.map((p, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              url: `${SITE.url}/guides/${p.slug}`,
              name: p.title,
            })),
          },
        }}
      />
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <p className="eyebrow mb-3">{cat ? cat.label : 'Library'}</p>
        <h1 className="font-serif text-4xl md:text-5xl font-semibold max-w-3xl">
          {cat ? cat.label : 'All guides'}
        </h1>
        <p className="mt-4 text-lg text-brand-muted max-w-2xl">
          {cat
            ? cat.description
            : 'WAEC, BECE, study methods, and how to write exam answers — one practical article at a time.'}{' '}
          {posts.length} {posts.length === 1 ? 'guide' : 'guides'}.
        </p>
        <div className="flex flex-wrap gap-2 mt-8">
          <Link
            to="/guides"
            className={`px-4 py-1.5 rounded-full text-sm font-semibold border ${
              !cat ? 'bg-brand-accent text-white border-brand-accent' : 'border-brand-line'
            }`}
          >
            All
          </Link>
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              to={`/guides/${c.slug}`}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold border ${
                cat?.slug === c.slug
                  ? 'bg-brand-accent text-white border-brand-accent'
                  : 'border-brand-line'
              }`}
            >
              {c.label}
            </Link>
          ))}
        </div>

        <div className="mt-12 space-y-5">
          {posts.map((p) => (
            <Link key={p.slug} to={`/guides/${p.slug}`} className="paper-card p-6 md:p-8 block">
              <p className="eyebrow mb-2">{p.category}</p>
              <h2 className="font-serif text-2xl font-semibold">{p.title}</h2>
              <p className="mt-2 text-brand-muted leading-relaxed">{p.description}</p>
              <p className="mt-3 text-sm text-brand-muted">
                {p.date} · {p.readTime} read
              </p>
            </Link>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
