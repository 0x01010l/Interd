import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import { SITE } from '../data/site';
import { ABOUT } from '../data/copy';
import { getPageSeo } from '../data/seo';

export default function About() {
  const seo = getPageSeo('/about');

  return (
    <PageLayout
      title={seo.title}
      description={seo.description}
      path="/about"
      breadcrumbLabel="About"
      jsonLd={{
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: seo.title,
        url: `${SITE.url}/about`,
        mainEntity: {
          '@type': 'Organization',
          name: SITE.name,
          legalName: SITE.legal,
          email: SITE.email,
          address: SITE.address.join(', '),
        },
      }}
    >
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="mono-label mb-4 !text-brand-accent">About</p>
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl glow-text">
            An advisory practice—not a product company.
          </h1>
          <div className="prose-dark mt-10">
            <p>{ABOUT.lead}</p>
            <p>{ABOUT.body}</p>
            <p>{ABOUT.close}</p>
          </div>

          <div className="glass mt-12 space-y-3 rounded-2xl p-8 text-sm">
            <p>
              <span className="text-white/40">Brand:</span> {SITE.brand}
            </p>
            <p>
              <span className="text-white/40">Legal entity:</span> {SITE.legal}
            </p>
            <p>
              <span className="text-white/40">Email:</span>{' '}
              <a href={`mailto:${SITE.email}`} className="text-brand-accent hover:underline">
                {SITE.email}
              </a>
            </p>
            <p>
              <span className="text-white/40">Advisory:</span>{' '}
              <a href={`mailto:${SITE.support}`} className="text-brand-accent hover:underline">
                {SITE.support}
              </a>
            </p>
            <p>
              <span className="text-white/40">Address:</span> {SITE.address.join(', ')}
            </p>
          </div>

          <Link to="/contact" className="btn-primary mt-10">
            Contact the practice
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
