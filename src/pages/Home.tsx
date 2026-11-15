import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import ConnectionField from '../components/ConnectionField';
import { SITE } from '../data/site';
import { APPROACH_STEPS, WHO_FOR } from '../data/copy';
import { getPageSeo } from '../data/seo';

export default function Home() {
  const seo = getPageSeo('/');

  return (
    <PageLayout title={seo.title} description={seo.description} path="/">
      {/* Hero — one composition: brand, headline, support, CTAs, dominant visual */}
      <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
        <ConnectionField />
        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col justify-center px-4 py-20 sm:px-6">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display mb-6 text-4xl font-extrabold tracking-tight text-brand-ink sm:text-5xl md:text-6xl"
          >
            {SITE.brand}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl font-display text-3xl font-bold leading-[1.15] tracking-tight text-brand-ink sm:text-4xl md:text-5xl"
          >
            We connect growing companies with the right technology partners—based on what is
            happening in their business right now.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-6 max-w-xl text-lg text-brand-muted leading-relaxed"
          >
            B2B technology advisory and vendor matchmaking. Signal first. Fit second. Introduction
            with context.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <Link to="/contact" className="btn-primary">
              Start a conversation
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/approach" className="btn-ghost">
              See how we work
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="border-t border-brand-line bg-brand-paper/60 py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="eyebrow mb-4">What we do</p>
          <h2 className="font-display max-w-2xl text-3xl font-bold tracking-tight md:text-4xl">
            Monitor signals. Map needs. Evaluate vendors. Make the introduction.
          </h2>
          <p className="mt-5 max-w-2xl text-brand-muted text-lg leading-relaxed">
            We monitor business-change signals, identify likely technology needs, evaluate relevant
            vendors, and connect companies with suitable solution providers.
          </p>
          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {APPROACH_STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.08 }}
                className="border-l-2 border-brand-accent pl-6"
              >
                <p className="font-display text-sm font-bold text-brand-accent">{step.num}</p>
                <h3 className="mt-2 font-display text-xl font-bold">{step.title}</h3>
                <p className="mt-2 text-brand-muted leading-relaxed">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="eyebrow mb-4">Who we serve</p>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            Built for both sides of a good introduction.
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {WHO_FOR.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="panel p-8"
              >
                <h3 className="font-display text-xl font-bold">{item.title}</h3>
                <p className="mt-3 text-brand-muted leading-relaxed">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[2rem] bg-brand-ink px-8 py-16 text-center text-brand-paper sm:px-16"
          >
            <motion.div
              className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-teal-500/20 blur-2xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 6, repeat: Infinity }}
            />
            <p className="eyebrow !text-teal-300 relative">Next step</p>
            <h2 className="relative mt-4 font-display text-3xl font-bold md:text-4xl">
              Tell us what is changing in the business.
            </h2>
            <p className="relative mx-auto mt-4 max-w-lg text-white/60">
              Whether you need a technology partner—or you are one looking for the right
              conversation—we will respond with clarity.
            </p>
            <Link to="/contact" className="btn-primary relative mt-8 !bg-teal-500 hover:!bg-teal-400">
              Get in touch
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}
