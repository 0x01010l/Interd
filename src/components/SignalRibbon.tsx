import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { Asterisk } from 'lucide-react';

const phrases = [
  'Context before categories',
  'Fit before volume',
  'Clarity before selection',
  'Better conversations',
];

export default function SignalRibbon() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.4 });
  const x = useTransform(smooth, [0, 1], ['8%', '-34%']);
  const xReverse = useTransform(smooth, [0, 1], ['-18%', '5%']);

  return (
    <section ref={ref} className="relative overflow-hidden border-y border-blue-100 bg-[#f7faff] py-12 md:py-18">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,112,255,.09),transparent_55%)]" />
      <motion.div
        style={{ x: reduceMotion ? 0 : x }}
        className="flex w-max items-center gap-8 whitespace-nowrap"
      >
        {[...phrases, ...phrases].map((phrase, i) => (
          <div key={`${phrase}-${i}`} className="flex items-center gap-8">
            <span className="text-4xl font-semibold tracking-[-0.045em] text-slate-900 md:text-6xl">
              {phrase}
            </span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-accent text-white md:h-12 md:w-12">
              <Asterisk className="h-5 w-5" />
            </span>
          </div>
        ))}
      </motion.div>
      <motion.div
        style={{ x: reduceMotion ? 0 : xReverse }}
        className="mt-6 flex w-max gap-10 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.18em] text-brand-accent/70"
      >
        {Array.from({ length: 10 }, (_, i) => (
          <span key={i}>Advisory · Research · Evaluation · Introduction</span>
        ))}
      </motion.div>
    </section>
  );
}
