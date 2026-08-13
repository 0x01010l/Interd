import PageLayout from '../components/PageLayout';
import SEO from '../components/SEO';
import { SITE } from '../data/site';
import { FAQ_ITEMS } from '../data/staticPageCopy';

export default function FAQ() {
  return (
    <PageLayout>
      <SEO
        title={`FAQ | ${SITE.name}`}
        description="Is Interdot Study official WAEC? Do we sell expo? Who publishes the blog?"
        path="/faq"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: FAQ_ITEMS.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }}
      />
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
        <p className="eyebrow mb-3">FAQ</p>
        <h1 className="font-serif text-4xl font-semibold mb-10">Straight answers</h1>
        <div className="space-y-5">
          {FAQ_ITEMS.map((f) => (
            <div key={f.q} className="paper-card p-6">
              <h2 className="font-serif text-xl font-semibold">{f.q}</h2>
              <p className="mt-3 text-brand-muted leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
