import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import SEO from '../components/SEO';
import { getPostBySlug } from '../data/blogPosts';

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug || '');

  if (!post) {
    return (
      <PageLayout title="Post Not Found">
        <section className="py-24">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-6">Post not found</h1>
            <Link to="/blog" className="text-brand-accent font-semibold">
              Back to blog
            </Link>
          </div>
        </section>
      </PageLayout>
    );
  }

  return (
    <PageLayout title={post.title}>
      <SEO title={`${post.title} | Interdot`} description={post.description} path={`/blog/${post.slug}`} />
      <article className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/blog" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-10">
            <ArrowLeft className="w-4 h-4" /> Back to blog
          </Link>

          <div className="mono-label mb-4">
            {post.date} · {post.readTime} read
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">{post.title}</h1>
          <p className="text-xl text-white/60 leading-relaxed mb-12">{post.description}</p>

          <div className="space-y-6 text-white/70 leading-relaxed text-lg mb-12">
            {post.content.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="glass p-8 rounded-[2rem] border-brand-accent/20">
            <h2 className="text-2xl font-bold mb-3">Try the related tool</h2>
            <p className="text-white/60 mb-6">
              Put this guide into practice with our free {post.toolLabel}.
            </p>
            <Link
              to={post.toolPath}
              className="inline-flex items-center gap-2 bg-brand-accent hover:bg-brand-accent/90 text-white px-6 py-3 rounded-xl font-bold transition-all"
            >
              Open {post.toolLabel}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </article>
    </PageLayout>
  );
}
