import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import SEO from '../components/SEO';
import { SITE } from '../data/site';
import { ABOUT_COPY } from '../data/staticPageCopy';

export default function About() {
  return (
    <PageLayout>
      <SEO
        title={`About ${SITE.name} | Publisher identity`}
        description={ABOUT_COPY.lead}
        path="/about"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: `About ${SITE.name}`,
          url: `${SITE.url}/about`,
          mainEntity: {
            '@type': 'Organization',
            name: SITE.name,
            legalName: SITE.legal,
            email: SITE.email,
            address: SITE.address.join(', '),
          },
        }}
      />
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
        <p className="eyebrow mb-3">About</p>
        <h1 className="font-serif text-4xl md:text-5xl font-semibold leading-tight">{ABOUT_COPY.h1}</h1>
        <div className="prose-study mt-8">
          <p>{ABOUT_COPY.lead}</p>
          <h2>Who publishes this</h2>
          <p>{ABOUT_COPY.who}</p>
          <p>
            Brand: {SITE.brand}
            <br />
            Legal entity: {SITE.legal}
            <br />
            Email: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <br />
            Address: {SITE.address.join(', ')}
          </p>
          <h2>Editorial standard</h2>
          <p>{ABOUT_COPY.editorial}</p>
          <h2>How a guide is written</h2>
          <p>{ABOUT_COPY.method}</p>
          <h2>Contact</h2>
          <p>{ABOUT_COPY.contact}</p>
        </div>
        <p className="mt-10">
          <Link to="/guides" className="text-brand-accent font-semibold">
            Read the guides →
          </Link>
        </p>
      </section>
    </PageLayout>
  );
}
