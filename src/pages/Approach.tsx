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
      <section className="relative overflow-hidden bg-[#f7faff] py-24 md:py-32">
        <div className="blueprint-grid absolute inset-0" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6">
          <p className="eyebrow">Approach</p>
          <h1 className="mt-6 text-4xl font-semibold tracking-[-0.045em] text-slate-950 md:text-7xl">
            A clearer path from need to decision.
          </h1>
          <p className="mt-7 max-w-2xl text-xl leading-relaxed text-slate-600">
            We combine business understanding, structured research, and thoughtful introductions
            to help teams move forward with confidence.
          </p>
        </div>
      </section>

      <section className="border-t border-slate-200 pb-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <ol>
            {APPROACH_STEPS.map((step, i) => (
              <motion.li
                key={step.num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative border-l border-blue-200 py-12 pl-10"
              >
                <span className="absolute -left-3.5 top-12 flex h-7 w-7 items-center justify-center rounded-full bg-brand-accent text-[10px] font-bold shadow-[0_0_20px_rgba(0,112,255,0.5)]">
                  {i + 1}
                </span>
                <p className="mono-label !text-brand-accent">{step.num}</p>
                <h2 className="mt-2 text-2xl font-bold">{step.title}</h2>
                <p className="mt-3 text-lg leading-relaxed text-slate-600">{step.body}</p>
              </motion.li>
            ))}
          </ol>

          <div className="glass mt-8 rounded-3xl p-8 md:p-10">
            <h2 className="text-2xl font-semibold text-slate-950">Start with the business, not the catalogue.</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-slate-600">
              Our recommendations are grounded in your goals, operating context, and readiness.
              That keeps the shortlist relevant and the resulting conversations productive.
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
