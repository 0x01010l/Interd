import PageLayout from '../components/PageLayout';
import { HelpCircle, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FAQ_ITEMS, getPageSeo } from '../data/seo';

export default function FAQ() {
  const seo = getPageSeo('/faq');

  return (
    <PageLayout
      title={seo.title}
      description={seo.description}
      path="/faq"
      breadcrumbLabel="FAQ"
      jsonLd={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQ_ITEMS.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }}
    >
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="mono-label mb-4">Technical FAQ</h2>
            <h1 className="text-5xl font-bold mb-8">Inside the Engine</h1>
            <p className="text-xl text-white/60 leading-relaxed">
              Deep dives into the mechanics of reasoning-as-a-service.
            </p>
          </div>

          <div className="space-y-6">
            {FAQ_ITEMS.map((faq, i) => (
              <div key={i} className="bento-card group">
                <div className="flex items-start space-x-4">
                  <div className="mt-1">
                    <HelpCircle className="w-6 h-6 text-brand-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-4 group-hover:text-brand-accent transition-colors">
                      {faq.q}
                    </h3>
                    <p className="text-white/60 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 glass p-12 rounded-[2.5rem] text-center">
            <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
            <p className="text-white/60 mb-8">
              Our technical team is available for deep-dive consultations.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center space-x-2 text-brand-accent font-bold hover:underline"
            >
              <span>Contact Technical Support</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
