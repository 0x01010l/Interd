import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import { SERVICES, WHO_FOR } from '../data/copy';
import { getPageSeo } from '../data/seo';

export default function Services() {
  const seo = getPageSeo('/services');

  return (
    <PageLayout
      title={seo.title}
      description={seo.description}
      path="/services"
      breadcrumbLabel="Services"
      jsonLd={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'B2B Technology Advisory & Vendor Matchmaking',
        provider: { '@type': 'Organization', name: 'FIX FIGURES LLC' },
        description: seo.description,
        serviceType: 'Technology Advisory',
      }}
    >
      <section className="relative overflow-hidden bg-[#f7faff] py-24 md:py-32">
        <div className="blueprint-grid absolute inset-0" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="eyebrow relative">Services</p>
          <h1 className="relative mt-6 max-w-4xl text-4xl font-semibold tracking-[-0.045em] text-slate-950 md:text-7xl">
            Better context. Better options. Better conversations.
          </h1>
          <p className="relative mt-7 max-w-2xl text-xl leading-relaxed text-slate-600">
            Three connected services that help companies move from an emerging need to a
            well-matched technology partner.
          </p>

          <div className="mt-16 space-y-5">
            {SERVICES.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass flex flex-col gap-4 rounded-3xl p-8 md:flex-row md:items-start md:gap-10 md:p-10"
              >
                <span className="text-4xl font-bold text-brand-accent/30">0{i + 1}</span>
                <div>
                  <h2 className="text-2xl font-bold">{s.title}</h2>
                  <p className="mt-3 text-lg leading-relaxed text-slate-600">{s.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold">Who engages us</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {WHO_FOR.map((item) => (
              <div key={item.title} className="border-t-2 border-brand-accent pt-5">
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-slate-600">{item.body}</p>
              </div>
            ))}
          </div>
          <Link to="/contact" className="btn-primary mt-12">
            Request an introduction conversation
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
