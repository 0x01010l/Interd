import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import SciFiField from '../components/SciFiField';
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
      <section className="relative overflow-hidden py-24 md:py-32">
        <SciFiField intensity={0.5} />
        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6">
          <p className="mono-label mb-4 !text-brand-accent">Approach</p>
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl glow-text">
            Signal-led matchmaking—not generic vendor lists.
          </h1>
          <p className="mt-6 text-xl text-white/55 leading-relaxed">
            Technology buying rarely starts with a blank RFP. It starts when something in the
            business changes. Our process begins there.
          </p>
        </div>
      </section>

      <section className="border-t border-brand-border pb-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <ol>
            {APPROACH_STEPS.map((step, i) => (
              <motion.li
                key={step.num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative border-l border-brand-accent/40 py-12 pl-10"
              >
                <span className="absolute -left-3.5 top-12 flex h-7 w-7 items-center justify-center rounded-full bg-brand-accent text-[10px] font-bold shadow-[0_0_20px_rgba(0,112,255,0.5)]">
                  {i + 1}
                </span>
                <p className="mono-label !text-brand-accent">{step.num}</p>
                <h2 className="mt-2 text-2xl font-bold">{step.title}</h2>
                <p className="mt-3 text-lg text-white/55 leading-relaxed">{step.body}</p>
              </motion.li>
            ))}
          </ol>

          <div className="mt-8 glass rounded-2xl p-8">
            <h2 className="text-xl font-bold">What this is not</h2>
            <p className="mt-3 text-white/55 leading-relaxed">
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
