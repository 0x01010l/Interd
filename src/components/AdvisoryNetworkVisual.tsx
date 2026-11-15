import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { Building2, Check, Network, Radar, Search, Waypoints } from 'lucide-react';

const panels = [
  {
    position: 'left-[1%] top-[10%]',
    icon: Building2,
    label: 'Business signal',
    value: 'Change detected',
  },
  {
    position: 'right-[-1%] top-[15%]',
    icon: Radar,
    label: 'Market lens',
    value: 'Market mapped',
  },
  {
    position: 'bottom-[11%] left-[3%]',
    icon: Search,
    label: 'Evaluation',
    value: 'Fit clarified',
  },
  {
    position: 'bottom-[7%] right-[1%]',
    icon: Network,
    label: 'Introduction',
    value: 'Context aligned',
  },
];

export default function AdvisoryNetworkVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '100px', amount: 0.15 });
  const reduceMotion = useReducedMotion();
  const ambient = inView && !reduceMotion;

  return (
    <div ref={ref} className="relative h-full w-full" aria-hidden>
      <div className="absolute inset-[2%] overflow-hidden rounded-[2.75rem] border border-blue-200/80 bg-[linear-gradient(145deg,#ffffff_5%,#f4f8ff_50%,#e7f1ff_100%)] shadow-[0_35px_90px_rgba(30,90,170,0.16)]">
        <div className="blueprint-grid absolute inset-0 opacity-65" />
        <div className="absolute -right-[18%] -top-[20%] h-[70%] w-[70%] rounded-full bg-blue-200/35" />
        <div className="absolute -bottom-[20%] -left-[15%] h-[62%] w-[62%] rounded-full bg-white/80" />

        <motion.div
          animate={ambient ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          className="absolute left-1/2 top-1/2 h-[66%] w-[66%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_45deg,transparent_0deg,transparent_285deg,rgba(0,112,255,.12)_330deg,transparent_360deg)] will-change-transform"
        />
      </div>

      <svg
        className="absolute inset-[8%] h-[84%] w-[84%] overflow-visible"
        viewBox="0 0 600 600"
        fill="none"
      >
        <circle cx="300" cy="300" r="148" stroke="#dbeafe" strokeWidth="1.5" />
        <circle cx="300" cy="300" r="108" stroke="#bfdbfe" strokeDasharray="5 7" />
        {[
          'M300 300 C225 245 165 145 95 108',
          'M300 300 C390 242 458 166 521 133',
          'M300 300 C228 370 176 440 103 492',
          'M300 300 C378 375 448 437 520 480',
          'M95 108 C254 48 426 64 521 133',
          'M103 492 C260 545 427 531 520 480',
        ].map((d, i) => (
          <motion.path
            key={d}
            d={d}
            stroke={i < 4 ? '#78adff' : '#c7dcff'}
            strokeWidth={i < 4 ? 2 : 1.2}
            strokeDasharray={i > 3 ? '6 8' : undefined}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 + i * 0.08, ease: 'easeOut' }}
          />
        ))}

        <motion.circle
          r="5"
          fill="#0070ff"
          animate={
            ambient
              ? { cx: [95, 220, 300], cy: [108, 205, 300], opacity: [0, 1, 0] }
              : { cx: 300, cy: 300, opacity: 0 }
          }
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.circle
          r="4"
          fill="#60a5fa"
          animate={
            ambient
              ? { cx: [520, 420, 300], cy: [480, 390, 300], opacity: [0, 1, 0] }
              : { cx: 300, cy: 300, opacity: 0 }
          }
          transition={{ duration: 3.2, delay: 0.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>

      <motion.div
        initial={{ opacity: 0, scale: 0.82 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-1/2 top-1/2 z-20 flex h-40 w-40 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[2.4rem] border border-white bg-brand-accent text-white shadow-[0_28px_70px_rgba(0,112,255,0.35)] md:h-44 md:w-44"
      >
        <motion.span
          animate={ambient ? { scale: [1, 1.08, 1] } : { scale: 1 }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Waypoints className="h-11 w-11" />
        </motion.span>
        <span className="mt-3 font-mono text-[9px] uppercase tracking-[0.16em] text-blue-100">
          Interdot lens
        </span>
      </motion.div>

      {panels.map(({ position, icon: Icon, label, value }, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 18, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.25 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          className={`absolute z-30 ${position} w-[10.5rem] rounded-2xl border border-blue-100 bg-white/95 p-3.5 shadow-[0_16px_42px_rgba(30,72,130,0.14)] sm:w-[12.5rem] sm:p-4`}
        >
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-brand-accent">
              <Icon className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <p className="font-mono text-[8px] uppercase tracking-[0.13em] text-slate-400">
                {label}
              </p>
              <p className="mt-0.5 truncate text-xs font-semibold text-slate-800 sm:text-sm">{value}</p>
            </div>
          </div>
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-blue-50">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 + i * 0.12 }}
              className="h-full origin-left rounded-full bg-gradient-to-r from-brand-accent to-sky-300"
            />
          </div>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.85, duration: 0.5 }}
        className="absolute left-1/2 top-[4%] z-30 flex -translate-x-1/2 items-center gap-2 rounded-full border border-blue-100 bg-white px-3 py-2 text-[10px] font-semibold text-slate-600 shadow-sm"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-accent opacity-40" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-accent" />
        </span>
        Advisory intelligence active
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-[1%] left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-slate-950 px-4 py-2 text-[10px] font-medium text-white shadow-lg"
      >
        <Check className="h-3.5 w-3.5 text-sky-300" />
        Context carried through every decision
      </motion.div>
    </div>
  );
}
