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
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="eyebrow mb-4">About</p>
          <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
            An advisory practice—not a product company.
          </h1>
          <div className="prose-advisory mt-10">
            <p>{ABOUT.lead}</p>
            <p>{ABOUT.body}</p>
            <p>{ABOUT.close}</p>
          </div>

          <div className="mt-12 panel p-8 space-y-3 text-sm">
            <p>
              <span className="font-semibold text-brand-ink">Brand:</span> {SITE.brand}
            </p>
            <p>
              <span className="font-semibold text-brand-ink">Legal entity:</span> {SITE.legal}
            </p>
            <p>
              <span className="font-semibold text-brand-ink">Email:</span>{' '}
              <a href={`mailto:${SITE.email}`} className="text-brand-accent hover:underline">
                {SITE.email}
              </a>
            </p>
            <p>
              <span className="font-semibold text-brand-ink">Advisory:</span>{' '}
              <a href={`mailto:${SITE.support}`} className="text-brand-accent hover:underline">
                {SITE.support}
              </a>
            </p>
            <p>
              <span className="font-semibold text-brand-ink">Address:</span> {SITE.address.join(', ')}
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
