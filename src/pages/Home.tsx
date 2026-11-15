import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { useRef, type ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import SciFiField from '../components/SciFiField';
import { SITE } from '../data/site';
import { getPageSeo } from '../data/seo';

function Chapter({
  chapter,
  title,
  body,
  children,
}: {
  chapter: string;
  title: string;
  body: string;
  children?: ReactNode;
}) {
  return (
    <section className="story-chapter border-t border-white/[0.06]">
      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-12 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mono-label mb-4 !text-brand-accent">{chapter}</p>
          <h2 className="text-3xl font-bold leading-tight tracking-tight md:text-5xl glow-text">
            {title}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/55 md:text-xl">{body}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}

function HudPanel({ lines }: { lines: { label: string; value: string; status?: string }[] }) {
  return (
    <div className="hud-frame relative overflow-hidden rounded-2xl p-6 md:p-8">
      <div className="mb-6 flex items-center justify-between">
        <span className="mono-label !text-brand-accent">Live signal feed</span>
        <motion.span
          className="h-2 w-2 rounded-full bg-brand-accent"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        />
      </div>
      <div className="space-y-4 font-mono text-[11px] sm:text-xs">
        {lines.map((row, i) => (
          <motion.div
            key={row.label}
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 + i * 0.12 }}
            className="flex items-center justify-between border-b border-white/[0.06] pb-3"
          >
            <span className="text-white/40">{row.label}</span>
            <span className="text-white/80">{row.value}</span>
            {row.status && (
              <span className="ml-3 text-brand-accent">{row.status}</span>
            )}
          </motion.div>
        ))}
      </div>
      <motion.div
        className="pointer-events-none absolute inset-x-0 h-16 bg-gradient-to-b from-brand-accent/10 to-transparent"
        animate={{ top: ['0%', '85%', '0%'] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}

function MatchVisual() {
  return (
    <div className="hud-frame relative aspect-square max-w-md mx-auto overflow-hidden rounded-2xl p-8">
      <svg viewBox="0 0 200 200" className="h-full w-full">
        <motion.circle
          cx="60"
          cy="100"
          r="18"
          fill="none"
          stroke="rgba(0,112,255,0.5)"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        />
        <motion.circle
          cx="140"
          cy="100"
          r="18"
          fill="none"
          stroke="rgba(0,112,255,0.5)"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2 }}
        />
        <motion.line
          x1="78"
          y1="100"
          x2="122"
          y2="100"
          stroke="#0070FF"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.6 }}
        />
        <motion.circle
          cx="100"
          cy="100"
          r="4"
          fill="#3b8eff"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.1, type: 'spring' }}
        />
        <text x="60" y="140" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="8" fontFamily="monospace">
          COMPANY
        </text>
        <text x="140" y="140" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="8" fontFamily="monospace">
          VENDOR
        </text>
      </svg>
      <p className="absolute bottom-6 left-0 right-0 text-center mono-label !text-brand-accent">
        Qualified introduction
      </p>
    </div>
  );
}

export default function Home() {
  const seo = getPageSeo('/');
  const heroRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.08]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 80]);

  return (
    <PageLayout title={seo.title} description={seo.description} path="/">
      {/* ACT I — Arrival */}
      <section ref={heroRef} className="relative min-h-[100svh] overflow-hidden">
        <motion.div style={{ scale: heroScale }} className="absolute inset-0">
          <SciFiField />
        </motion.div>
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-4 py-28 sm:px-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-brand-accent/30 bg-brand-accent/10 px-4 py-1.5"
          >
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-brand-accent"
              animate={{ opacity: [1, 0.35, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
            <span className="mono-label !text-brand-accent">B2B technology advisory</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8 }}
            className="font-bold tracking-tight text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl glow-text"
          >
            {SITE.brand}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.85 }}
            className="mt-6 max-w-3xl text-2xl font-medium leading-snug text-white/90 sm:text-3xl md:text-4xl"
          >
            Something is changing in the business.
            <span className="block text-white/45">The right technology partner should find you before the wrong one does.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="mt-8 max-w-xl text-lg text-white/50 leading-relaxed"
          >
            We connect growing companies with the right technology partners—based on what is
            happening in their business right now.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <Link to="/contact" className="btn-primary">
              Start a conversation
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="#story" className="btn-ghost">
              Follow the signal
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 1.4 }}
            className="mt-16 mono-label"
          >
            Scroll to enter the story ↓
          </motion.p>
        </motion.div>
      </section>

      <div id="story">
        {/* ACT II — The noise */}
        <Chapter
          chapter="01 — The noise"
          title="Vendor discovery starts too late—and too loud."
          body="Keyword searches. Recycled RFPs. Cold decks that ignore context. By the time a company “looks for software,” the real decision window has already opened—and half of it has closed."
        >
          <div className="hud-frame rounded-2xl p-8 space-y-4">
            {['Generic search', 'Unqualified outreach', 'Feature checklists without timing'].map(
              (t, i) => (
                <motion.div
                  key={t}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="flex items-center gap-3 border-l-2 border-red-500/50 pl-4 text-white/50"
                >
                  <span className="font-mono text-[10px] text-red-400">NOISE</span>
                  {t}
                </motion.div>
              )
            )}
          </div>
        </Chapter>

        {/* ACT III — The signal */}
        <Chapter
          chapter="02 — The signal"
          title="We watch for what actually moves a technology decision."
          body="Expansion. Compliance pressure. Systems under strain. Leadership shifts. M&A. These are business-change signals—moments when a technology need becomes likely, not theoretical."
        >
          <HudPanel
            lines={[
              { label: 'GEO_EXPANSION', value: 'detected', status: 'HOT' },
              { label: 'COMPLIANCE_PRESSURE', value: 'rising', status: 'WATCH' },
              { label: 'OPS_STRAIN', value: 'threshold+', status: 'HOT' },
              { label: 'LEADERSHIP_SHIFT', value: 'confirmed', status: 'WATCH' },
            ]}
          />
        </Chapter>

        {/* ACT IV — The need */}
        <Chapter
          chapter="03 — The need"
          title="Signals become needs before they become RFPs."
          body="From each signal we map the problem a company is about to face—capacity, risk, visibility, speed—not just the category they already know to Google."
        >
          <div className="grid grid-cols-2 gap-3">
            {['Capacity', 'Risk', 'Visibility', 'Speed'].map((need, i) => (
              <motion.div
                key={need}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="hud-frame rounded-xl p-5 text-center"
              >
                <p className="mono-label mb-2 !text-brand-accent">NEED</p>
                <p className="text-xl font-semibold">{need}</p>
              </motion.div>
            ))}
          </div>
        </Chapter>

        {/* ACT V — The match */}
        <Chapter
          chapter="04 — The match"
          title="Then we evaluate who should be in the room."
          body="Fit. Timing. Delivery reality. We shortlist solution providers against the moment—not against a generic vendor list—so introductions are qualified, not spray-and-pray."
        >
          <MatchVisual />
        </Chapter>

        {/* ACT VI — The introduction */}
        <section className="story-chapter border-t border-white/[0.06]">
          <div className="relative z-10 mx-auto max-w-3xl px-4 py-28 text-center sm:px-6">
            <SciFiField intensity={0.45} />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <p className="mono-label mb-4 !text-brand-accent">05 — The introduction</p>
              <h2 className="text-3xl font-bold tracking-tight md:text-5xl glow-text">
                Context first. Conversation second.
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg text-white/55 leading-relaxed">
                We facilitate introductions with the why built in: why the need exists now, what
                good looks like, and who should talk first. Both sides arrive prepared.
              </p>
              <p className="mt-8 text-sm text-white/35 font-mono">
                Consulting practice · Not a SaaS · {SITE.legal}
              </p>
            </motion.div>
          </div>
        </section>

        {/* FINALE — CTA */}
        <section className="relative overflow-hidden border-t border-white/[0.06] py-32">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,112,255,0.2),transparent_60%)]" />
          <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold md:text-5xl"
            >
              Tell us what is changing.
            </motion.h2>
            <p className="mx-auto mt-5 max-w-lg text-white/50 text-lg">
              Whether you need a technology partner—or you are one looking for the right
              conversation—we respond with clarity.
            </p>
            <Link to="/contact" className="btn-primary mt-10">
              Get in touch
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
