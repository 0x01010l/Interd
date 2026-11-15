import { useRef, type PointerEvent } from 'react';
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react';
import { Activity, Check, Network, Radar, Sparkles, Waypoints } from 'lucide-react';

const nodes = [
  [130, 170, 5],
  [185, 112, 4],
  [254, 146, 3],
  [327, 104, 5],
  [405, 142, 3],
  [468, 205, 5],
  [425, 278, 4],
  [463, 357, 3],
  [388, 415, 5],
  [307, 385, 3],
  [230, 426, 4],
  [168, 371, 5],
  [109, 306, 3],
  [206, 254, 3],
  [360, 241, 4],
] as const;

const links = [
  [130, 170, 185, 112],
  [185, 112, 254, 146],
  [254, 146, 327, 104],
  [327, 104, 405, 142],
  [405, 142, 468, 205],
  [468, 205, 425, 278],
  [425, 278, 463, 357],
  [463, 357, 388, 415],
  [388, 415, 307, 385],
  [307, 385, 230, 426],
  [230, 426, 168, 371],
  [168, 371, 109, 306],
  [109, 306, 130, 170],
  [130, 170, 206, 254],
  [206, 254, 254, 146],
  [206, 254, 307, 300],
  [307, 300, 360, 241],
  [360, 241, 425, 278],
  [307, 300, 307, 385],
] as const;

const signals = ['Growth event', 'Operational pressure', 'New initiative'];
const matchRows = [
  ['Capability', 'Aligned'],
  ['Timing', 'Current'],
  ['Delivery fit', 'Strong'],
];

export default function AdvisoryNetworkVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '100px', amount: 0.15 });
  const reduceMotion = useReducedMotion();
  const ambient = inView && !reduceMotion;
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [2.2, -2.2]), {
    stiffness: 140,
    damping: 24,
  });
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-2.8, 2.8]), {
    stiffness: 140,
    damping: 24,
  });
  const lightX = useTransform(pointerX, [-0.5, 0.5], [-90, 90]);
  const lightY = useTransform(pointerY, [-0.5, 0.5], [-70, 70]);

  const trackPointer = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType === 'touch') return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <div
      ref={ref}
      data-hero-visual
      className="relative h-full w-full [perspective:1200px]"
      onPointerMove={trackPointer}
      onPointerLeave={resetPointer}
      aria-hidden
    >
      <motion.div
        style={{
          rotateX: reduceMotion ? 0 : rotateX,
          rotateY: reduceMotion ? 0 : rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="absolute inset-[2%] overflow-hidden rounded-[2.5rem] border border-blue-200/80 bg-[#f8fbff] shadow-[0_40px_100px_rgba(29,78,150,0.18)] will-change-transform"
      >
        <div className="blueprint-grid absolute inset-0 opacity-55" />
        <motion.div
          style={{
            x: lightX,
            y: lightY,
          }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(96,165,250,.22),rgba(219,234,254,.08)_46%,transparent_72%)] will-change-transform"
        />

        <div className="absolute inset-x-0 top-0 z-30 flex h-12 items-center justify-between border-b border-blue-100/90 bg-white/82 px-4">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-brand-accent text-white">
              <Waypoints className="h-3.5 w-3.5" />
            </span>
            <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-slate-500">
              Interdot / decision graph
            </span>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.13em] text-brand-accent">
            <span className="relative h-1.5 w-1.5 rounded-full bg-brand-accent">
              <span className="absolute inset-0 animate-ping rounded-full bg-brand-accent opacity-35" />
            </span>
            Live context
          </div>
        </div>

        <svg
          className="absolute inset-x-[3%] bottom-[8%] top-[8%] h-[84%] w-[94%]"
          viewBox="0 0 560 520"
          fill="none"
        >
          <defs>
            <radialGradient id="network-core" cx="0" cy="0" r="1" gradientTransform="translate(307 300) rotate(90) scale(118)">
              <stop stopColor="#0070ff" stopOpacity=".15" />
              <stop offset="1" stopColor="#0070ff" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="edge-gradient" x1="100" y1="90" x2="470" y2="430">
              <stop stopColor="#bfdbfe" />
              <stop offset=".5" stopColor="#4d94ff" />
              <stop offset="1" stopColor="#dbeafe" />
            </linearGradient>
          </defs>

          <ellipse cx="307" cy="286" rx="205" ry="132" stroke="#dbeafe" strokeDasharray="5 8" />
          <ellipse cx="307" cy="286" rx="145" ry="205" stroke="#e0edff" />
          <circle cx="307" cy="300" r="118" fill="url(#network-core)" />

          <motion.g
            animate={ambient ? { rotate: [-1.5, 1.5, -1.5] } : { rotate: 0 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '307px 280px' }}
          >
            {links.map(([x1, y1, x2, y2], i) => (
              <motion.line
                key={`${x1}-${y1}-${x2}-${y2}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="url(#edge-gradient)"
                strokeWidth={i > 12 ? 1.5 : 1}
                strokeOpacity={i > 12 ? 0.72 : 0.48}
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.2 + i * 0.025 }}
              />
            ))}
            {nodes.map(([cx, cy, r], i) => (
              <g key={`${cx}-${cy}`}>
                <motion.circle
                  cx={cx}
                  cy={cy}
                  r={r + 6}
                  fill="#0070ff"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: i % 4 === 0 ? 0.09 : 0.04 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.03 }}
                />
                <motion.circle
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill={i % 4 === 0 ? '#0070ff' : '#ffffff'}
                  stroke={i % 4 === 0 ? '#0070ff' : '#8bbcff'}
                  strokeWidth="1.5"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', delay: 0.35 + i * 0.035 }}
                  style={{ transformOrigin: `${cx}px ${cy}px` }}
                />
              </g>
            ))}
          </motion.g>

          <motion.line
            x1="75"
            x2="500"
            y1="115"
            y2="115"
            stroke="#60a5fa"
            strokeOpacity=".18"
            animate={ambient ? { y1: [115, 415, 115], y2: [115, 415, 115], opacity: [0, 0.7, 0] } : { opacity: 0 }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
          />

          <motion.circle
            r="4"
            fill="#0070ff"
            animate={
              ambient
                ? { cx: [130, 206, 307], cy: [170, 254, 300], opacity: [0, 1, 0] }
                : { cx: 307, cy: 300, opacity: 0 }
            }
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.circle
            r="3.5"
            fill="#38bdf8"
            animate={
              ambient
                ? { cx: [463, 388, 307], cy: [357, 415, 385], opacity: [0, 1, 0] }
                : { cx: 307, cy: 300, opacity: 0 }
            }
            transition={{ duration: 3, delay: 0.9, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>

        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-[55%] top-[52%] z-20 flex h-[4.5rem] w-[4.5rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[1.4rem] border border-white bg-brand-accent text-white shadow-[0_18px_45px_rgba(0,112,255,.32)]"
        >
          <Waypoints className="h-6 w-6" />
          <span className="absolute -bottom-6 whitespace-nowrap font-mono text-[7px] uppercase tracking-[0.14em] text-slate-500">
            Qualified need
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.45 }}
          className="absolute left-[3%] top-[24%] z-30 hidden w-[7.2rem] rounded-2xl border border-blue-100 bg-white/96 p-3 shadow-[0_16px_45px_rgba(37,78,135,.14)] sm:block xl:w-[8.8rem]"
        >
          <div className="flex items-center gap-2">
            <Activity className="h-3.5 w-3.5 text-brand-accent" />
            <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-slate-400">
              Signal feed
            </span>
          </div>
          <div className="mt-3 space-y-2.5">
            {signals.map((signal, i) => (
              <div key={signal} className="flex items-center gap-2">
                <motion.span
                  animate={ambient ? { opacity: [0.25, 1, 0.25] } : { opacity: 0.55 }}
                  transition={{ duration: 2.2, delay: i * 0.35, repeat: Infinity }}
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-accent"
                />
                <span className="truncate text-[8px] font-medium text-slate-600 xl:text-[9px]">
                  {signal}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.58 }}
          className="absolute right-[3%] top-[22%] z-30 hidden w-[8rem] rounded-2xl border border-blue-100 bg-slate-950 p-3 text-white shadow-[0_18px_50px_rgba(15,23,42,.22)] sm:block xl:w-[9.5rem]"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-slate-400">
              Match profile
            </span>
            <Radar className="h-3.5 w-3.5 text-sky-300" />
          </div>
          <div className="mt-3 space-y-2.5">
            {matchRows.map(([label, value], i) => (
              <div key={label}>
                <div className="flex justify-between text-[8px]">
                  <span className="text-slate-400">{label}</span>
                  <span className="font-semibold">{value}</span>
                </div>
                <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: [0, 0.72 + i * 0.08] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.8 + i * 0.1 }}
                    className="h-full origin-left rounded-full bg-gradient-to-r from-brand-accent to-sky-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.8 }}
          className="absolute inset-x-[4%] bottom-[3%] z-30 flex h-12 items-center rounded-2xl border border-blue-100 bg-white/96 px-3 shadow-[0_14px_35px_rgba(37,78,135,.12)]"
        >
          <div className="flex w-full items-center justify-between gap-2">
            {['Context', 'Criteria', 'Evaluation', 'Introduction'].map((label, i) => (
              <div key={label} className="flex min-w-0 items-center gap-1.5">
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[8px] font-semibold ${
                    i === 3 ? 'bg-brand-accent text-white' : 'bg-blue-50 text-brand-accent'
                  }`}
                >
                  {i === 3 ? <Check className="h-3 w-3" /> : i + 1}
                </span>
                <span className="hidden truncate text-[8px] font-semibold text-slate-600 lg:block">
                  {label}
                </span>
                {i < 3 && <span className="hidden h-px w-3 bg-blue-200 sm:block xl:w-5" />}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="absolute left-1/2 top-[12%] z-20 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-blue-100 bg-white/95 px-3 py-2 text-[8px] font-semibold text-slate-600 shadow-sm"
        >
          <Sparkles className="h-3 w-3 text-brand-accent" />
          Context becoming direction
        </motion.div>

        <div className="absolute bottom-[13%] right-[7%] z-20 flex items-center gap-1.5 font-mono text-[7px] uppercase tracking-[0.13em] text-slate-400">
          <Network className="h-3 w-3 text-brand-accent" />
          Partner graph
        </div>
      </motion.div>
    </div>
  );
}
