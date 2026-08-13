import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import SEO from '../components/SEO';
import { SITE } from '../data/site';

export default function Contact() {
  return (
    <PageLayout>
      <SEO
        title={`Contact ${SITE.name}`}
        description={`Email ${SITE.email} for corrections, permissions, or privacy requests about our WAEC and BECE study guides.`}
        path="/contact"
      />
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
        <p className="eyebrow mb-3">Contact</p>
        <h1 className="font-serif text-4xl md:text-5xl font-semibold">Write to the editors</h1>
        <p className="mt-6 text-lg text-brand-muted leading-relaxed">
          Use this page for a factual correction, a classroom-use question, or a privacy request. We
          do not offer paid tutoring, leaked papers, or predicted questions. If your message is about
          a specific guide, include the page title so we can find it.
        </p>
        <p className="mt-4 text-brand-muted leading-relaxed">
          We read the inbox for Interdot Study, an educational blog published by {SITE.legal}. We are
          not WAEC, not BECE, and not a school. Registration, results, and timetable questions belong
          with your examining body.
        </p>
        <div className="paper-card p-8 mt-10 space-y-4 text-brand-muted leading-relaxed">
          <p>
            <span className="font-semibold text-brand-ink">Email:</span>{' '}
            <a href={`mailto:${SITE.email}`} className="text-brand-accent font-semibold">
              {SITE.email}
            </a>
          </p>
          <p>
            <span className="font-semibold text-brand-ink">Publisher:</span> {SITE.legal}
          </p>
          <p>
            <span className="font-semibold text-brand-ink">Address:</span> {SITE.address.join(', ')}
          </p>
        </div>
        <p className="mt-8 text-sm text-brand-muted">
          See also{' '}
          <Link to="/about" className="text-brand-accent font-semibold">
            About
          </Link>{' '}
          and the{' '}
          <Link to="/privacy" className="text-brand-accent font-semibold">
            Privacy Policy
          </Link>
          .
        </p>
      </section>
    </PageLayout>
  );
}
