import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import SEO from '../components/SEO';
import { BLOG_POSTS } from '../data/blogPosts';

export default function Blog() {
  return (
    <PageLayout title="Blog">
      <SEO
        title="Ecommerce Writing Blog | Interdot"
        description="Practical guides on product descriptions, Shopify titles, Etsy SEO tags, review replies, and ad copy — with free AI tools from Interdot."
        path="/blog"
      />
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="mono-label mb-4">Blog</h2>
            <h1 className="text-5xl font-bold mb-6">Guides for ecommerce writing</h1>
            <p className="text-xl text-white/60 leading-relaxed">
              Human-written articles on listing copy, SEO, and customer communication — each linked to a free Interdot tool you can use immediately.
            </p>
          </div>

          <div className="space-y-6">
            {BLOG_POSTS.map((post) => (
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
