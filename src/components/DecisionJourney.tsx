import { useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { Building2, Check, Network, Search, SlidersHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';

const stages = [
  {
    title: 'Understand the moment',
    short: 'Context',
    body: 'We clarify what is changing, who it affects, and what a successful outcome needs to look like.',
    icon: Building2,
  },
  {
    title: 'Shape the requirement',
    short: 'Brief',
    body: 'Business goals become a focused technology brief with practical priorities and evaluation criteria.',
    icon: SlidersHorizontal,
  },
  {
    title: 'Evaluate the market',
    short: 'Options',
    body: 'We research relevant providers and compare their capability, fit, timing, and delivery approach.',
    icon: Search,
  },
  {
    title: 'Make the connection',
    short: 'Partner',
    body: 'The right teams meet with shared context, clear expectations, and a useful reason to move forward.',
    icon: Network,
  },
];

function MobileJourney() {
  return (
    <section className="bg-[#edf5ff] px-5 py-24 md:hidden">
      <h2 className="section-title">One clear thread, from challenge to partner.</h2>
      <p className="mt-5 leading-7 text-slate-600">
        Each step narrows the field while preserving the business context that makes a match useful.
      </p>
      <div className="relative mt-12 space-y-5">
        <div className="absolute bottom-8 left-6 top-8 w-px bg-blue-200" />
        {stages.map((stage, i) => {
          const Icon = stage.icon;
          return (
            <motion.article
              key={stage.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="glass-card relative rounded-3xl p-6 pl-18"
            >
              <span className="absolute left-4 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-brand-accent text-white">
                <Icon className="h-4 w-4" />
              </span>
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand-accent">
                Step {i + 1}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-slate-950">{stage.title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{stage.body}</p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

export default function DecisionJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: reduceMotion ? 1000 : 85,
    damping: reduceMotion ? 100 : 24,
    mass: 0.35,
  });
  const lineProgress = useTransform(progress, [0.08, 0.9], [0, 1]);
  const stageScale = useTransform(progress, [0, 0.5, 1], [0.97, 1, 0.985]);
  const glowX = useTransform(progress, [0, 1], ['4%', '78%']);

  useMotionValueEvent(progress, 'change', (latest) => {
    const next = Math.min(stages.length - 1, Math.max(0, Math.floor(latest * stages.length)));
    setActive((current) => (current === next ? current : next));
  });

  const ActiveIcon = stages[active].icon;

  return (
    <>
      <MobileJourney />
      <section ref={sectionRef} className="relative hidden h-[360vh] bg-[#edf5ff] md:block">
        <div className="sticky top-16 flex h-[calc(100vh-4rem)] items-center overflow-hidden">
          <div className="blueprint-grid absolute inset-0 opacity-70" />
          <motion.div
            style={{ left: glowX }}
            className="pointer-events-none absolute top-[18%] h-[30rem] w-[30rem] rounded-full bg-blue-200/50 blur-[90px]"
          />

          <div className="relative mx-auto grid w-full max-w-7xl grid-cols-[.78fr_1.22fr] items-center gap-14 px-8">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-brand-accent">
                How the work moves
              </p>
              <h2 className="mt-6 text-5xl font-semibold leading-[1.02] tracking-[-0.05em] text-slate-950 xl:text-6xl">
                One clear thread, from challenge to partner.
              </h2>
              <p className="mt-6 max-w-md text-lg leading-8 text-slate-600">
                Each step narrows the field while preserving the business context that makes a
                match useful.
              </p>
              <Link to="/approach" className="btn-ghost mt-8">
                Explore the full approach
              </Link>
            </div>

            <motion.div
              style={{ scale: stageScale }}
              className="relative min-h-[34rem] rounded-[2.5rem] border border-white/90 bg-white/65 p-10 shadow-[0_35px_100px_rgba(31,80,150,0.15)] backdrop-blur-2xl"
            >
              <div className="absolute left-10 right-10 top-11 flex items-center justify-between">
                {stages.map((stage, i) => {
                  const Icon = stage.icon;
                  const reached = i <= active;
                  return (
                    <div key={stage.short} className="relative z-10 flex flex-col items-center gap-3">
                      <motion.span
                        animate={{
                          scale: active === i ? 1.16 : 1,
                          backgroundColor: reached ? '#0070ff' : '#ffffff',
                          color: reached ? '#ffffff' : '#94a3b8',
                        }}
                        transition={{ duration: 0.35 }}
                        className="flex h-13 w-13 items-center justify-center rounded-2xl border border-blue-100 shadow-sm"
                      >
                        <Icon className="h-5 w-5" />
                      </motion.span>
                      <span
                        className={`text-xs font-semibold transition-colors ${
                          reached ? 'text-slate-900' : 'text-slate-400'
                        }`}
                      >
                        {stage.short}
                      </span>
                    </div>
                  );
                })}

                <svg
                  className="pointer-events-none absolute left-6 right-6 top-6 h-2 w-[calc(100%-3rem)] overflow-visible"
                  viewBox="0 0 600 8"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <path d="M 0 4 L 600 4" stroke="#dbeafe" strokeWidth="2" />
                  <motion.path
                    d="M 0 4 L 600 4"
                    stroke="#0070ff"
                    strokeWidth="3"
                    strokeLinecap="round"
                    style={{ pathLength: lineProgress }}
                  />
                </svg>
              </div>

              <div className="absolute inset-x-10 bottom-10 top-36 overflow-hidden rounded-[2rem] border border-blue-100 bg-white">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(0,112,255,.12),transparent_34%)]" />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                    className="relative flex h-full flex-col justify-between p-9"
                  >
                    <div>
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-brand-accent">
                        <ActiveIcon className="h-6 w-6" />
                      </span>
                      <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.16em] text-brand-accent">
                        Stage {String(active + 1).padStart(2, '0')}
                      </p>
                      <h3 className="mt-3 max-w-xl text-4xl font-semibold tracking-[-0.035em] text-slate-950">
                        {stages[active].title}
                      </h3>
                      <p className="mt-4 max-w-xl text-lg leading-8 text-slate-600">
                        {stages[active].body}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 text-sm font-semibold text-slate-500">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-brand-accent">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      Context carried forward
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
