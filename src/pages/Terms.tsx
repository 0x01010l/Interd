import PageLayout from '../components/PageLayout';
import { SITE } from '../data/site';
import { getPageSeo } from '../data/seo';

export default function Terms() {
  const seo = getPageSeo('/terms');

  return (
    <PageLayout title={seo.title} description={seo.description} path="/terms" breadcrumbLabel="Terms">
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="mono-label mb-4 !text-brand-accent">Legal</p>
          <h1 className="mb-10 text-4xl font-bold">Terms of Use</h1>
          <div className="prose-dark">
            <h2>Advisory nature</h2>
            <p>
              {SITE.name}, operated by {SITE.legal}, provides technology advisory and vendor
              matchmaking. Website content is informational. Engagements are governed by separate
              agreements. Introductions do not guarantee a commercial outcome for either party.
            </p>
            <h2>Scope of services</h2>
            <p>
              Services, deliverables, fees, and responsibilities are defined in the agreement for
              each engagement.
            </p>
            <h2>Acceptable use</h2>
            <p>
              Do not misuse the contact channels for spam or unlawful solicitation. Linking to
              public pages is welcome.
            </p>
            <h2>Contact</h2>
            <p>Questions: {SITE.email}. Last updated November 2026.</p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
