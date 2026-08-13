import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import SEO from '../components/SEO';
import { SITE, CATEGORIES } from '../data/site';
import { BLOG_POSTS } from '../data/blogPosts';
import { FAQ_ITEMS } from '../data/staticPageCopy';

export default function Home() {
  const featured = BLOG_POSTS[0];
  const rest = BLOG_POSTS.slice(1, 9);
  const edition = featured?.date ?? '2026';

  return (
    <PageLayout>
      <SEO
        title={`${SITE.name} | WAEC, BECE, study tips & how to write`}
        description={SITE.description}
        path="/"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: SITE.name,
            url: SITE.url,
            description: SITE.description,
            inLanguage: 'en',
            publisher: {
              '@type': 'Organization',
              name: SITE.name,
              legalName: SITE.legal,
              url: SITE.url,
              email: SITE.email,
              address: {
                '@type': 'PostalAddress',
                streetAddress: SITE.address[0],
                addressLocality: 'North Canton',
                addressRegion: 'OH',
                postalCode: '44721',
                addressCountry: 'US',
              },
            },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ_ITEMS.slice(0, 4).map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          },
        ]}
      />

      <header className="border-b border-brand-line bg-brand-paper">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-12">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-brand-muted mb-6">
            <p className="eyebrow m-0">Independent educational blog</p>
            <p className="tracking-wide uppercase font-semibold">Edition {edition}</p>
          </div>
          <div className="masthead-rule mb-8" />
          <h1 className="font-serif text-4xl sm:text-5xl md:text-[3.75rem] font-semibold tracking-tight max-w-4xl leading-[1.08] text-brand-ink">
            How to study, how to write, how to sit the paper.
          </h1>
          <p className="mt-6 text-xl text-brand-muted max-w-2xl leading-relaxed">
            Practical guides for WAEC, BECE, and school exams — written so a tired student can use
            them tonight. No leaked questions. No grade promises. No tools. Just the next useful
            page.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/guides"
              className="inline-flex items-center gap-2 bg-brand-accent hover:bg-brand-accent-dark text-white px-6 py-3 rounded-full font-semibold"
            >
              Browse all guides <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/guides/bece"
              className="inline-flex items-center gap-2 border border-brand-line bg-brand-paper px-6 py-3 rounded-full font-semibold text-brand-ink hover:border-brand-accent"
            >
              BECE desk
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-brand-muted hover:text-brand-ink"
            >
              Who publishes this
            </Link>
          </div>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CATEGORIES.map((c, i) => (
          <Link key={c.slug} to={`/guides/${c.slug}`} className="paper-card p-6 block">
            <p className="font-serif text-3xl text-brand-accent/40 font-semibold mb-3">
              {String(i + 1).padStart(2, '0')}
            </p>
            <p className="eyebrow mb-2">{c.label}</p>
            <p className="text-brand-muted text-sm leading-relaxed">{c.description}</p>
          </Link>
        ))}
      </section>

      {featured && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-6">
          <p className="eyebrow mb-5">Latest guide</p>
          <Link
            to={`/guides/${featured.slug}`}
            className="paper-card overflow-hidden grid md:grid-cols-5 block"
          >
            <div className="md:col-span-3 p-8 md:p-12 border-l-[6px] border-brand-accent">
              <p className="eyebrow mb-3">{featured.category}</p>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold leading-tight text-brand-ink">
                {featured.title}
              </h2>
              <p className="mt-4 text-lg text-brand-muted leading-relaxed">{featured.description}</p>
              <p className="mt-6 text-sm text-brand-muted">
                <time dateTime={featured.date}>{featured.date}</time> · {featured.readTime} read
              </p>
            </div>
            <div className="md:col-span-2 bg-brand-bg p-8 md:p-12 flex flex-col justify-end">
              <p className="text-sm text-brand-muted mb-4 leading-relaxed">
                Start here if you want a method you can use on a new prompt, not a memorised sample
                answer.
              </p>
              <p className="text-brand-accent font-semibold inline-flex items-center gap-2">
                Read the guide <ArrowRight className="w-4 h-4" />
              </p>
            </div>
          </Link>
        </section>
      )}

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-end justify-between mb-6 gap-4">
          <h2 className="font-serif text-3xl font-semibold text-brand-ink">More how-tos</h2>
          <Link to="/guides" className="text-brand-accent font-semibold text-sm">
            All {BLOG_POSTS.length} guides
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {rest.map((p) => (
            <Link key={p.slug} to={`/guides/${p.slug}`} className="paper-card p-6 block">
              <p className="eyebrow mb-2">{p.category}</p>
              <h3 className="font-serif text-xl font-semibold leading-snug text-brand-ink">{p.title}</h3>
              <p className="mt-2 text-brand-muted text-sm leading-relaxed">{p.description}</p>
              <p className="mt-3 text-xs text-brand-muted">
                <time dateTime={p.date}>{p.date}</time> · {p.readTime} read
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <div className="paper-card p-8 md:p-10">
          <p className="eyebrow mb-3">People also ask</p>
          <h2 className="font-serif text-3xl font-semibold mb-6">Straight answers</h2>
          <dl className="grid md:grid-cols-2 gap-8">
            {FAQ_ITEMS.slice(0, 4).map((f) => (
              <div key={f.q}>
                <dt className="font-serif text-lg font-semibold text-brand-ink">{f.q}</dt>
                <dd className="mt-2 text-brand-muted leading-relaxed">{f.a}</dd>
              </div>
            ))}
          </dl>
          <Link to="/faq" className="inline-flex items-center gap-2 mt-8 text-brand-accent font-semibold">
            Full FAQ <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
