import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import { APPROACH_STEPS } from '../data/copy';
import { getPageSeo } from '../data/seo';

export default function Approach() {
  const seo = getPageSeo('/approach');

  return (
    <PageLayout
      title={seo.title}
      description={seo.description}
      path="/approach"
      breadcrumbLabel="Approach"
    >
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="eyebrow mb-4">Approach</p>
          <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
            Signal-led matchmaking—not generic vendor lists.
          </h1>
          <p className="mt-6 text-xl text-brand-muted leading-relaxed">
            Technology buying rarely starts with a blank RFP. It starts when something in the
            business changes. Our process begins there.
          </p>
        </div>
      </section>

      <section className="border-t border-brand-line bg-brand-paper/50 pb-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <ol className="space-y-0">
            {APPROACH_STEPS.map((step, i) => (
              <motion.li
                key={step.num}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative border-l border-brand-line py-10 pl-10"
              >
                <span className="absolute -left-3 top-10 flex h-6 w-6 items-center justify-center rounded-full bg-brand-accent text-[10px] font-bold text-white">
                  {i + 1}
                </span>
                <p className="font-display text-xs font-bold tracking-widest text-brand-accent">
                  {step.num}
                </p>
                <h2 className="mt-2 font-display text-2xl font-bold">{step.title}</h2>
                <p className="mt-3 text-brand-muted leading-relaxed text-lg">{step.body}</p>
              </motion.li>
            ))}
          </ol>

          <div className="mt-8 panel p-8">
            <h2 className="font-display text-xl font-bold">What this is not</h2>
            <p className="mt-3 text-brand-muted leading-relaxed">
              We are not a SaaS marketplace, a paid lead dump, or a directory. Interdot is a
              consulting practice: we advise on fit, then facilitate introductions when both sides
              benefit from the conversation.
            </p>
            <Link to="/contact" className="btn-primary mt-6">
              Discuss an engagement
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
