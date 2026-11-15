import PageLayout from '../components/PageLayout';
import { SITE } from '../data/site';
import { getPageSeo } from '../data/seo';

export default function Privacy() {
  const seo = getPageSeo('/privacy');

  return (
    <PageLayout
      title={seo.title}
      description={seo.description}
      path="/privacy"
      breadcrumbLabel="Privacy"
    >
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="mono-label mb-4 !text-brand-accent">Legal</p>
          <h1 className="mb-10 text-4xl font-bold">Privacy Policy</h1>
          <div className="prose-dark">
            <h2>Who we are</h2>
            <p>
              {SITE.brand} is operated by {SITE.legal} (“we,” “our”). This policy covers {SITE.url}
              — a website for our B2B technology advisory and vendor matchmaking practice.
            </p>
            <h2>What we collect</h2>
            <p>
              When you email us or submit the contact form, we receive the information you provide
              (such as name, email, and message content). We use it to respond and, where relevant,
              to discuss advisory or introduction engagements. We do not sell personal information.
            </p>
            <h2>Cookies</h2>
            <p>
              Essential cookies or local storage may be used for site operation. We do not run a
              consumer advertising network on this site.
            </p>
            <h2>Contact</h2>
            <p>
              Privacy requests: {SITE.email}. Address: {SITE.address.join(', ')}. Last updated
              November 2026.
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
