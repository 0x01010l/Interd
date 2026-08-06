import PageLayout from '../components/PageLayout';
import SEO from '../components/SEO';
import { HelpCircle, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FAQ_ITEMS } from '../data/staticPageCopy';

export default function FAQ() {
  return (
    <PageLayout>
      <SEO
        title="FAQ | Interdot Custom AI Agents & Free Tools"
        description="Answers about Interdot custom AI agents, free ecommerce writing tools, privacy, rate limits, cookies, and publisher identity (FIX FIGURES LLC)."
        path="/faq"
        keywords="Interdot FAQ, custom AI agents FAQ, free AI tools FAQ, FIX FIGURES LLC"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: FAQ_ITEMS.map((faq) => ({
            '@type': 'Question',
            name: faq.q,
            acceptedAnswer: { '@type': 'Answer', text: faq.a },
          })),
        }}
      />
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="mono-label mb-4">FAQ</h2>
            <h1 className="text-5xl font-bold mb-8">Agents, tools, and how Interdot works</h1>
            <p className="text-xl text-white/60 leading-relaxed">
              Straight answers for merchants, operators, and anyone evaluating our free tools or custom agents.
            </p>
          </div>

          <div className="space-y-6">
            {FAQ_ITEMS.map((faq) => (
              <div key={faq.q} className="bento-card group">
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
              Read publisher details on About, or contact the team directly.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/about" className="inline-flex items-center space-x-2 text-brand-accent font-bold hover:underline">
                <span>Publisher identity</span>
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link to="/contact" className="inline-flex items-center space-x-2 text-brand-accent font-bold hover:underline">
                <span>Contact support</span>
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
