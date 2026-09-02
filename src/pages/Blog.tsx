import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import { BLOG_CATEGORIES, BLOG_POSTS } from '../data/blogPosts';

export default function Blog() {
  return (
    <PageLayout
      title="AI Agents & Reasoning Blog | Interdot"
      description="High-signal guides on stopping agent hallucinations, RAG vs reasoning layers, multi-agent orchestration, compliance, and building trustworthy AI copilots."
      path="/blog"
      breadcrumbLabel="Blog"
      jsonLd={{
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'Interdot AI Reasoning Blog',
        url: 'https://interdot.net/blog',
        description: 'Practical methods for AI agents, reasoning layers, and enterprise deployment.',
        publisher: { '@type': 'Organization', name: 'FIX FIGURES LLC' },
        blogPost: BLOG_POSTS.map((p) => ({
          '@type': 'BlogPosting',
          headline: p.title,
          url: `https://interdot.net/blog/${p.slug}`,
          datePublished: p.date,
        })),
      }}
    >
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <p className="mono-label mb-4">Insights</p>
            <h1 className="text-5xl font-bold mb-6">AI Agents &amp; Reasoning</h1>
            <p className="text-xl text-white/60 leading-relaxed">
              Methods that solve real production problems — hallucination control, orchestration,
              compliance, and the reasoning layer your stack is missing.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mb-12">
            {Object.entries(BLOG_CATEGORIES).map(([key, cat]) => (
              <span
                key={key}
                className="glass px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider text-white/50"
              >
                {cat.label}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="bento-card group flex flex-col justify-between min-h-[280px]"
              >
                <div>
                  <p className="mono-label mb-3">
                    {BLOG_CATEGORIES[post.category].label} · {post.date}
                  </p>
                  <h2 className="text-2xl font-bold mb-4 group-hover:text-brand-accent transition-colors leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-white/50 leading-relaxed">{post.description}</p>
                </div>
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-brand-border">
                  <span className="flex items-center gap-2 text-xs text-white/40 font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                  <span className="flex items-center gap-1 text-sm font-semibold text-brand-accent">
                    Read
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
