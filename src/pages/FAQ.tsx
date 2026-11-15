import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import PageLayout from '../components/PageLayout';
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
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="eyebrow mb-4">FAQ</p>
          <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
            Straight answers.
          </h1>
          <p className="mt-5 text-xl text-brand-muted">
            Especially the one about whether we are a SaaS.
          </p>

          <div className="mt-14 space-y-5">
            {FAQ_ITEMS.map((faq, i) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="panel p-7"
              >
                <h2 className="font-display text-xl font-bold">{faq.q}</h2>
                <p className="mt-3 text-brand-muted leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>

          <p className="mt-12 text-brand-muted">
            Still unsure?{' '}
            <Link to="/contact" className="font-semibold text-brand-accent hover:underline">
              Write us
            </Link>
            .
          </p>
        </div>
      </section>
    </PageLayout>
  );
}
