import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import { BLOG_CATEGORIES, BLOG_POSTS, getPostBySlug } from '../data/blogPosts';
import { SITE } from '../data/site';
import NotFound from './NotFound';

export default function BlogPost() {
  const { slug } = useParams();
  const post = slug ? getPostBySlug(slug) : undefined;
  if (!post) return <NotFound />;

  const cat = BLOG_CATEGORIES[post.category];
  const url = `${SITE.url}/blog/${post.slug}`;
  const related = BLOG_POSTS.filter((p) => p.category === post.category && p.slug !== post.slug).slice(
    0,
    3
  );
  const wordCount = post.content.join(' ').split(/\s+/).filter(Boolean).length;

  return (
    <PageLayout
      title={`${post.title} | Interdot Blog`}
      description={post.description}
      path={`/blog/${post.slug}`}
      breadcrumbLabel={post.title}
      jsonLd={[
        {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          dateModified: post.date,
          wordCount,
          keywords: post.keywords.join(', '),
          articleSection: cat.label,
          author: { '@type': 'Organization', name: SITE.legal, url: SITE.url },
          publisher: { '@type': 'Organization', name: SITE.legal, url: SITE.url },
          mainEntityOfPage: url,
          url,
          speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: ['.blog-lead', '.blog-body h2'],
          },
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE.url}/blog` },
            { '@type': 'ListItem', position: 3, name: post.title, item: url },
          ],
        },
      ]}
    >
      <article className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-white/40 mb-8 font-mono" aria-label="Breadcrumb">
            <Link to="/blog" className="hover:text-brand-accent">
              Blog
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white/60">{cat.label}</span>
          </nav>

          <p className="mono-label mb-4">{cat.label}</p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">{post.title}</h1>
          <p className="blog-lead text-xl text-white/60 leading-relaxed border-l-2 border-brand-accent pl-5 mb-8">
            {post.description}
          </p>
          <p className="flex items-center gap-4 text-sm text-white/40 font-mono mb-12">
            <time dateTime={post.date}>{post.date}</time>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </p>

          <div className="blog-body space-y-6 text-white/70 leading-relaxed text-lg">
            {post.content.map((block, i) =>
              block.startsWith('## ') ? (
                <h2 key={i} className="text-2xl font-bold text-white pt-6">
                  {block.slice(3)}
                </h2>
              ) : (
                <p key={i}>{block}</p>
              )
            )}
          </div>

          <div className="mt-16 glass p-10 rounded-[2rem] border-brand-accent/30 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-brand-accent/5" />
            <div className="relative">
              <p className="mono-label mb-3">Next step</p>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Your agents need a reasoning layer — not another prompt.
              </h2>
              <p className="text-white/60 mb-8 max-w-lg mx-auto">
                Interdot delivers deterministic logic traces for finance and cybersecurity teams.
                Talk to engineering about integrating Reasoning-as-a-Service in your stack.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-brand-accent hover:bg-brand-accent/90 text-white px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 shadow-xl shadow-brand-accent/20"
              >
                Get in Touch
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="pb-24 border-t border-brand-border pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="mono-label mb-8">Related reads</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link key={p.slug} to={`/blog/${p.slug}`} className="bento-card group">
                  <p className="mono-label mb-2">{BLOG_CATEGORIES[p.category].label}</p>
                  <h3 className="font-bold text-lg group-hover:text-brand-accent transition-colors">
                    {p.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </PageLayout>
  );
}
