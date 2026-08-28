import { Link, useParams } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import SEO from '../components/SEO';
import { SITE, CATEGORIES } from '../data/site';
import { BLOG_POSTS, getPostBySlug } from '../data/blogPosts';
import { getPostAttribution } from '../data/editorial';
import NotFound from './NotFound';

export default function BlogPost() {
  const { slug } = useParams();
  const post = slug ? getPostBySlug(slug) : undefined;
  if (!post) return <NotFound />;

  const cat = CATEGORIES.find((c) => c.slug === post.category);
  const { author, reviewer, sources } = getPostAttribution(post);
  const related = BLOG_POSTS.filter((p) => p.category === post.category && p.slug !== post.slug).slice(
    0,
    3
  );
  const url = `${SITE.url}/guides/${post.slug}`;
  const wordCount = post.content.join(' ').split(/\s+/).filter(Boolean).length;

  return (
    <PageLayout>
      <SEO
        title={`${post.title} | ${SITE.name}`}
        description={post.description}
        path={`/guides/${post.slug}`}
        type="article"
        published={post.date}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            dateModified: post.date,
            inLanguage: 'en',
            wordCount,
            articleSection: cat?.label ?? post.category,
            educationalUse: 'study guide',
            learningResourceType: 'How-to',
            audience: { '@type': 'EducationalAudience', educationalRole: 'student' },
            author: {
              '@type': 'Person',
              name: author.name,
              jobTitle: author.role,
              description: author.credentials,
            },
            reviewedBy: {
              '@type': 'Person',
              name: reviewer.name,
              jobTitle: reviewer.role,
            },
            publisher: { '@type': 'Organization', name: SITE.name, legalName: SITE.legal, url: SITE.url },
            mainEntityOfPage: url,
            url,
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
              { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE.url}/guides` },
              {
                '@type': 'ListItem',
                position: 3,
                name: cat?.label ?? post.category,
                item: `${SITE.url}/guides/${post.category}`,
              },
              { '@type': 'ListItem', position: 4, name: post.title, item: url },
            ],
          },
        ]}
      />
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <nav className="text-sm text-brand-muted mb-6" aria-label="Breadcrumb">
          <Link to="/guides" className="hover:text-brand-accent">
            Guides
          </Link>
          <span className="mx-2">/</span>
          <Link to={`/guides/${post.category}`} className="hover:text-brand-accent">
            {cat?.label ?? post.category}
          </Link>
        </nav>
        <p className="eyebrow mb-3">{cat?.label ?? post.category}</p>
        <h1 className="font-serif text-4xl md:text-5xl font-semibold leading-tight text-brand-ink">
          {post.title}
        </h1>
        <p className="mt-4 text-brand-muted">
          <time dateTime={post.date}>{post.date}</time> · {post.readTime} read ·{' '}
          <Link to="/editorial-policy" className="hover:text-brand-accent">
            {author.name}
          </Link>
        </p>
        <p className="mt-6 text-xl text-brand-ink leading-relaxed border-l-[3px] border-brand-accent pl-4">
          {post.description}
        </p>
        <div className="prose-study article-body mt-10">
          {post.content.map((para, i) =>
            para.startsWith('## ') ? <h2 key={i}>{para.slice(3)}</h2> : <p key={i}>{para}</p>
          )}
        </div>
        <aside className="mt-12 pt-8 border-t border-brand-line text-sm text-brand-muted space-y-4">
          <p>
            <span className="font-semibold text-brand-ink">Written by </span>
            {author.name}, {author.credentials}.{' '}
            <span className="font-semibold text-brand-ink">Reviewed by </span>
            {reviewer.name}, {reviewer.credentials}.
          </p>
          <p>
            <span className="font-semibold text-brand-ink">Sources consulted: </span>
            {sources.map((s, i) => (
              <span key={s.url}>
                {i > 0 ? '; ' : ''}
                <a href={s.url} className="text-brand-accent hover:underline" rel="noopener noreferrer">
                  {s.label}
                </a>
                {' — '}
                {s.note}
              </span>
            ))}
          </p>
          <p>
            Spotted an error?{' '}
            <Link to="/contact" className="text-brand-accent font-semibold hover:underline">
              Email a correction
            </Link>
            . See our{' '}
            <Link to="/editorial-policy" className="text-brand-accent font-semibold hover:underline">
              editorial policy
            </Link>
            .
          </p>
        </aside>
      </article>
      {related.length > 0 && (
        <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
          <h2 className="font-serif text-2xl font-semibold mb-4 text-brand-ink">Related guides</h2>
          <div className="space-y-3">
            {related.map((p) => (
              <Link key={p.slug} to={`/guides/${p.slug}`} className="block paper-card p-5">
                <p className="eyebrow mb-1">{p.category}</p>
                <h3 className="font-serif font-semibold text-brand-ink">{p.title}</h3>
                <p className="text-sm text-brand-muted mt-1">{p.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </PageLayout>
  );
}
