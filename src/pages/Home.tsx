import { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Check,
  Network,
  Radar,
  Search,
  Sparkles,
} from 'lucide-react';
import PageLayout from '../components/PageLayout';
import DecisionJourney from '../components/DecisionJourney';
import SignalRibbon from '../components/SignalRibbon';
import AdvisoryNetworkVisual from '../components/AdvisoryNetworkVisual';
import { getPageSeo } from '../data/seo';

export default function Home() {
  const seo = getPageSeo('/');
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const smoothHero = useSpring(scrollYProgress, { stiffness: 95, damping: 28, mass: 0.4 });
  const orbY = useTransform(smoothHero, [0, 1], [0, 90]);
  const heroCopyY = useTransform(smoothHero, [0, 1], [0, -70]);
  const heroVisualY = useTransform(smoothHero, [0, 1], [0, 125]);
  const heroVisualRotate = useTransform(smoothHero, [0, 1], [0, 9]);
  const heroVisualScale = useTransform(smoothHero, [0, 1], [1, 0.88]);
  const gridOpacity = useTransform(smoothHero, [0, 1], [0.7, 0.15]);

  const services = [
    {
      icon: Radar,
      tag: 'Discover',
      title: 'Opportunity intelligence',
      body: 'We identify moments of business change that create a real need for technology, before the search becomes noisy or urgent.',
    },
    {
      icon: Search,
      tag: 'Define',
      title: 'Solution discovery',
      body: 'We translate operational goals into clear requirements, then research the providers best equipped to deliver.',
    },
    {
      icon: Network,
      tag: 'Connect',
      title: 'Partner matchmaking',
      body: 'We create focused, context-rich introductions between decision-makers and relevant technology partners.',
    },
  ];

  return (
    <PageLayout
      title={seo.title}
      description={seo.description}
      path="/"
      jsonLd={{
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        name: 'Interdot',
        description: seo.description,
        url: 'https://interdot.net',
      }}
    >
      <section ref={heroRef} className="relative isolate min-h-[92vh] overflow-hidden">
        <motion.div
          style={{ y: orbY }}
          className="pointer-events-none absolute -right-40 -top-40 h-[44rem] w-[44rem] rounded-full bg-[radial-gradient(circle_at_38%_38%,rgba(255,255,255,0.9)_0%,rgba(0,112,255,0.22)_24%,rgba(0,112,255,0.08)_52%,transparent_72%)] blur-sm"
        />
        <motion.div
          style={{ opacity: reduceMotion ? 0.7 : gridOpacity }}
          className="blueprint-grid pointer-events-none absolute inset-0"
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-24 pt-16 sm:px-8 lg:grid-cols-[1.08fr_.92fr] lg:pb-32 lg:pt-24">
          <motion.div
            style={{ y: reduceMotion ? 0 : heroCopyY }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="eyebrow">
              <Sparkles className="h-3.5 w-3.5" />
              Technology decisions, made clearer
            </div>
            <h1 className="mt-7 max-w-4xl text-[clamp(3.4rem,7.5vw,7.25rem)] font-semibold leading-[0.91] tracking-[-0.065em] text-slate-950">
              Find the right
              <span className="block text-brand-accent">technology partner.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
              Interdot helps growing companies understand what they need, evaluate the right
              solutions, and connect with technology partners built for the moment ahead.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link to="/contact" className="btn-primary">
                Start a conversation
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/approach" className="btn-ghost">
                See how we work
              </Link>
            </div>
            <div className="mt-12 flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-500">
              {['Independent perspective', 'Focused shortlists', 'Qualified introductions'].map(
                (item) => (
                  <span key={item} className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-brand-accent">
                      <Check className="h-3 w-3" />
                    </span>
                    {item}
                  </span>
                )
              )}
            </div>
          </motion.div>

          <motion.div
            style={{
              y: reduceMotion ? 0 : heroVisualY,
              rotate: reduceMotion ? 0 : heroVisualRotate,
              scale: reduceMotion ? 1 : heroVisualScale,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto h-[34rem] w-full max-w-[38rem] sm:h-[37rem] lg:-mr-16 lg:h-[44rem] lg:w-[125%] lg:max-w-[46rem]"
            aria-hidden
          >
            <AdvisoryNetworkVisual />
          </motion.div>
        </div>
      </section>

      <section className="border-y border-slate-200/80 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-6 sm:px-8 md:flex-row md:items-center md:justify-between">
          <p className="text-sm font-semibold text-slate-900">Built for consequential technology decisions</p>
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-slate-500">
            <span>Growth & scale</span>
            <span>Operational change</span>
            <span>Vendor selection</span>
            <span>Strategic introductions</span>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <p className="eyebrow">What we do</p>
              <h2 className="section-title mt-5">
                From business change to the right technology choice.
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-slate-600 lg:justify-self-end">
              The best technology decisions begin with a clear understanding of the business, not
              a catalogue of tools. We connect strategy, research, and relationships in one focused
              advisory process.
            </p>
          </div>

          <div className="mt-16 grid gap-5 lg:grid-cols-3">
            {services.map((service, i) => (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="group rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_18px_55px_rgba(15,23,42,0.05)] transition-shadow hover:shadow-[0_24px_70px_rgba(0,112,255,0.12)] md:p-9"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-13 w-13 items-center justify-center rounded-2xl bg-blue-50 text-brand-accent">
                    <service.icon className="h-6 w-6" />
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-400">
                    {service.tag}
                  </span>
                </div>
                <h3 className="mt-14 text-2xl font-semibold tracking-tight text-slate-950">
                  {service.title}
                </h3>
                <p className="mt-4 leading-7 text-slate-600">{service.body}</p>
                <div className="mt-8 h-px w-full bg-slate-100">
                  <div className="h-px w-10 bg-brand-accent transition-all duration-500 group-hover:w-full" />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <SignalRibbon />

      <DecisionJourney />

      <section className="py-24 md:py-36">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-brand-accent p-7 text-white shadow-[0_30px_90px_rgba(0,112,255,0.28)] md:p-14 lg:p-18">
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute -right-24 -top-36 h-[34rem] w-[34rem] rounded-full border border-white/20"
            >
              <div className="absolute inset-[16%] rounded-full border border-white/15" />
              <div className="absolute inset-[34%] rounded-full border border-dashed border-white/25" />
              <div className="absolute left-[23%] top-[14%] h-3 w-3 rounded-full bg-white shadow-[0_0_0_10px_rgba(255,255,255,.1)]" />
              <div className="absolute bottom-[13%] right-[27%] h-2.5 w-2.5 rounded-full bg-blue-100 shadow-[0_0_0_9px_rgba(255,255,255,.08)]" />
            </motion.div>
            <div className="relative z-10 grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-end">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-blue-100">
                  A better starting point
                </p>
                <h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.02] tracking-[-0.045em] md:text-6xl">
                  Let’s turn your next technology decision into a confident one.
                </h2>
              </div>
              <div className="lg:justify-self-end">
                <p className="max-w-md text-lg leading-8 text-blue-100">
                  Tell us what is changing in your business. We’ll help you define the need and
                  identify the partners worth meeting.
                </p>
                <Link
                  to="/contact"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-brand-accent transition-transform hover:-translate-y-0.5"
                >
                  Discuss your needs
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
