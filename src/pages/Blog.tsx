import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import SEO from '../components/SEO';
import { BLOG_POSTS } from '../data/blogPosts';

export default function Blog() {
  const posts = [...BLOG_POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <PageLayout>
      <SEO
        title="Ecommerce Writing Blog | Interdot AI Agents & Free Tools"
        description="Guides that support Interdot ecommerce writing agents — product descriptions, Shopify titles, Etsy SEO, review replies, FAQs, metas, and marketplace copy, with free tools on every topic."
        path="/blog"
        keywords="ecommerce writing blog, product description guides, Shopify SEO, Etsy tags, Interdot AI agents, free AI tools"
        type="website"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: 'Interdot Ecommerce Writing Blog',
          description:
            'Human-written guides for ecommerce writing agents and free Interdot tools.',
          url: 'https://interdot.net/blog',
          publisher: {
            '@type': 'Organization',
            name: 'Interdot',
            url: 'https://interdot.net',
          },
        }}
      />
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="mono-label mb-4">Blog</h2>
            <h1 className="text-5xl font-bold mb-6">Guides behind our ecommerce agents</h1>
            <p className="text-xl text-white/60 leading-relaxed">
              Human-written articles on listing copy, SEO, and customer communication —
              each linked to a free Interdot agent workflow you can use immediately.
            </p>
          </div>

          <div className="space-y-6">
            {posts.map((post) => (
              <article key={post.slug} className="bento-card">
                <div className="mono-label mb-3">
                  {post.date} · {post.readTime} read
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  <Link to={`/blog/${post.slug}`} className="hover:text-brand-accent transition-colors">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-white/50 leading-relaxed mb-6 max-w-3xl">{post.description}</p>
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-brand-accent font-semibold text-sm"
                  >
                    Read article <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link to={post.toolPath} className="text-sm text-white/40 hover:text-white transition-colors">
                    Related tool: {post.toolLabel}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
