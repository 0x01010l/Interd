import { useRef, type PointerEvent } from 'react';
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react';
import { Waypoints } from 'lucide-react';

const points = [
  [92, 238, 4],
  [130, 152, 3],
  [184, 92, 5],
  [245, 142, 3],
  [306, 82, 4],
  [374, 128, 3],
  [454, 96, 5],
  [510, 174, 3],
  [548, 262, 5],
  [486, 318, 3],
  [526, 412, 4],
  [446, 454, 3],
  [370, 512, 5],
  [298, 458, 3],
  [220, 518, 4],
  [156, 452, 3],
  [82, 402, 5],
  [126, 326, 3],
  [216, 252, 3],
  [290, 304, 4],
  [372, 244, 3],
  [428, 356, 4],
] as const;

const connections = [
  [92, 238, 130, 152],
  [130, 152, 184, 92],
  [184, 92, 245, 142],
  [245, 142, 306, 82],
  [306, 82, 374, 128],
  [374, 128, 454, 96],
  [454, 96, 510, 174],
  [510, 174, 548, 262],
  [548, 262, 486, 318],
  [486, 318, 526, 412],
  [526, 412, 446, 454],
  [446, 454, 370, 512],
  [370, 512, 298, 458],
  [298, 458, 220, 518],
  [220, 518, 156, 452],
  [156, 452, 82, 402],
  [82, 402, 126, 326],
  [126, 326, 92, 238],
  [92, 238, 216, 252],
  [184, 92, 216, 252],
  [245, 142, 290, 304],
  [216, 252, 290, 304],
  [306, 82, 372, 244],
  [374, 128, 372, 244],
  [454, 96, 372, 244],
  [510, 174, 428, 356],
  [548, 262, 428, 356],
  [486, 318, 428, 356],
  [526, 412, 428, 356],
  [446, 454, 428, 356],
  [370, 512, 290, 304],
  [298, 458, 290, 304],
  [220, 518, 290, 304],
  [156, 452, 290, 304],
  [82, 402, 216, 252],
  [126, 326, 216, 252],
  [216, 252, 372, 244],
  [372, 244, 428, 356],
  [428, 356, 290, 304],
] as const;

const ribbons = [
  {
    d: 'M38 386 C122 182 250 78 426 122 C526 147 574 248 552 382',
    color: 'url(#ribbon-blue)',
    width: 5,
    opacity: 0.24,
  },
  {
    d: 'M62 458 C166 338 210 166 358 116 C474 76 558 180 576 284',
    color: 'url(#ribbon-sky)',
    width: 2.5,
    opacity: 0.55,
  },
  {
    d: 'M44 270 C160 432 304 518 472 440 C550 404 574 334 584 238',
    color: 'url(#ribbon-blue)',
    width: 3,
    opacity: 0.35,
  },
  {
    d: 'M110 78 C170 210 328 250 516 180',
    color: '#9ec5ff',
    width: 1.5,
    opacity: 0.42,
  },
  {
    d: 'M90 490 C238 360 392 342 554 470',
    color: '#bfd9ff',
    width: 1.5,
    opacity: 0.5,
  },
] as const;

const labels = [
  { position: 'left-[2%] top-[17%]', index: '01', text: 'Business context' },
  { position: 'right-[1%] top-[25%]', index: '02', text: 'Need defined' },
  { position: 'left-[4%] bottom-[20%]', index: '03', text: 'Provider fit' },
  { position: 'right-[2%] bottom-[12%]', index: '04', text: 'Right conversation' },
];

export default function AdvisoryNetworkVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '100px', amount: 0.12 });
  const reduceMotion = useReducedMotion();
  const ambient = inView && !reduceMotion;
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const backX = useSpring(useTransform(pointerX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 120,
    damping: 24,
  });
  const backY = useSpring(useTransform(pointerY, [-0.5, 0.5], [-8, 8]), {
    stiffness: 120,
    damping: 24,
  });
  const frontX = useSpring(useTransform(pointerX, [-0.5, 0.5], [-20, 20]), {
    stiffness: 140,
    damping: 24,
  });
  const frontY = useSpring(useTransform(pointerY, [-0.5, 0.5], [-15, 15]), {
    stiffness: 140,
    damping: 24,
  });
  const tiltX = useSpring(useTransform(pointerY, [-0.5, 0.5], [1.8, -1.8]), {
    stiffness: 130,
    damping: 25,
  });
  const tiltY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-2.2, 2.2]), {
    stiffness: 130,
    damping: 25,
  });

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
        style={{ x: backX, y: backY }}
        className="pointer-events-none absolute inset-[4%] will-change-transform"
      >
        <div className="absolute left-[8%] top-[8%] h-[68%] w-[68%] rounded-full bg-[radial-gradient(circle,rgba(0,112,255,.13),rgba(96,165,250,.045)_48%,transparent_72%)]" />
        <div className="absolute bottom-[2%] right-[-4%] h-[58%] w-[58%] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,.12),transparent_70%)]" />
        <motion.div
          animate={ambient ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 42, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-[9%] rounded-full border border-dashed border-blue-200/70 will-change-transform"
        />
        <motion.div
          animate={ambient ? { rotate: -360 } : { rotate: 0 }}
          transition={{ duration: 58, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-[19%] rounded-full border border-blue-100/90 will-change-transform"
        />
      </motion.div>

      <motion.div
        style={{
          rotateX: reduceMotion ? 0 : tiltX,
          rotateY: reduceMotion ? 0 : tiltY,
          transformStyle: 'preserve-3d',
        }}
        className="absolute inset-0 will-change-transform"
      >
        <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 620 620" fill="none">
          <defs>
            <linearGradient id="ribbon-blue" x1="40" y1="100" x2="580" y2="500">
              <stop stopColor="#0070ff" stopOpacity="0" />
              <stop offset=".32" stopColor="#0070ff" />
              <stop offset=".7" stopColor="#60a5fa" />
              <stop offset="1" stopColor="#0070ff" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="ribbon-sky" x1="580" y1="80" x2="40" y2="500">
              <stop stopColor="#38bdf8" stopOpacity="0" />
              <stop offset=".45" stopColor="#38bdf8" />
              <stop offset="1" stopColor="#0070ff" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="core-glow">
              <stop stopColor="#0070ff" stopOpacity=".16" />
              <stop offset=".58" stopColor="#60a5fa" stopOpacity=".05" />
              <stop offset="1" stopColor="#0070ff" stopOpacity="0" />
            </radialGradient>
          </defs>

          <ellipse cx="310" cy="306" rx="238" ry="126" stroke="#dbeafe" strokeDasharray="4 8" />
          <ellipse cx="310" cy="306" rx="160" ry="247" stroke="#e4efff" />
          <ellipse cx="310" cy="306" rx="206" ry="205" stroke="#edf5ff" transform="rotate(38 310 306)" />
          <circle cx="310" cy="306" r="145" fill="url(#core-glow)" />

          {ribbons.map((ribbon, i) => (
            <motion.path
              key={ribbon.d}
              d={ribbon.d}
              stroke={ribbon.color}
              strokeWidth={ribbon.width}
              strokeOpacity={ribbon.opacity}
              strokeLinecap="round"
              strokeDasharray={i < 3 ? '18 12' : undefined}
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              animate={ambient && i < 3 ? { strokeDashoffset: [0, -60] } : { strokeDashoffset: 0 }}
              transition={{
                pathLength: { duration: 1.1, delay: 0.12 + i * 0.08 },
                opacity: { duration: 0.7, delay: 0.12 + i * 0.08 },
                strokeDashoffset: { duration: 4 + i, repeat: Infinity, ease: 'linear' },
              }}
            />
          ))}

          <motion.g
            animate={ambient ? { rotate: [-1.2, 1.2, -1.2] } : { rotate: 0 }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '310px 306px' }}
          >
            {connections.map(([x1, y1, x2, y2], i) => (
              <motion.line
                key={`${x1}-${y1}-${x2}-${y2}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={i > 17 ? '#88b8ff' : '#c6dcff'}
                strokeWidth={i > 17 ? 1.25 : 0.8}
                strokeOpacity={i > 17 ? 0.58 : 0.46}
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.22 + i * 0.014 }}
              />
            ))}

            {points.map(([cx, cy, radius], i) => (
              <g key={`${cx}-${cy}`}>
                <motion.circle
                  cx={cx}
                  cy={cy}
                  r={radius + 8}
                  fill="#0070ff"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: i % 4 === 0 ? 0.08 : 0.025 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.025 }}
                />
                <motion.circle
                  cx={cx}
                  cy={cy}
                  r={radius}
                  fill={i % 4 === 0 ? '#0070ff' : '#ffffff'}
                  stroke={i % 4 === 0 ? '#0070ff' : '#77adff'}
                  strokeWidth="1.5"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', delay: 0.34 + i * 0.025 }}
                  style={{ transformOrigin: `${cx}px ${cy}px` }}
                />
              </g>
            ))}
          </motion.g>

          <motion.circle
            r="4.5"
            fill="#0070ff"
            animate={
              ambient
                ? { cx: [92, 216, 290, 372], cy: [238, 252, 304, 244], opacity: [0, 1, 1, 0] }
                : { cx: 290, cy: 304, opacity: 0 }
            }
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.circle
            r="4"
            fill="#38bdf8"
            animate={
              ambient
                ? { cx: [526, 428, 290], cy: [412, 356, 304], opacity: [0, 1, 0] }
                : { cx: 290, cy: 304, opacity: 0 }
            }
            transition={{ duration: 3.4, delay: 1.1, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.circle
            r="3"
            fill="#7dd3fc"
            animate={
              ambient
                ? { cx: [184, 245, 372, 454], cy: [92, 142, 244, 96], opacity: [0, 1, 1, 0] }
                : { cx: 372, cy: 244, opacity: 0 }
            }
            transition={{ duration: 4, delay: 0.45, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>

        <motion.div
          style={{ x: frontX, y: frontY, marginLeft: '-1.25rem', marginTop: '-1.25rem' }}
          initial={{ opacity: 0, scale: 0.65 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-[47%] top-[49%] z-20 flex h-10 w-10 items-center justify-center rounded-xl border border-white bg-brand-accent text-white shadow-[0_14px_34px_rgba(0,112,255,.28)] will-change-transform"
        >
          <Waypoints className="h-3.5 w-3.5" />
          <span className="absolute left-1/2 top-[3rem] -translate-x-1/2 whitespace-nowrap font-mono text-[7px] uppercase tracking-[0.15em] text-slate-400">
            Advisory lens
          </span>
        </motion.div>

        {labels.map((label, i) => (
          <motion.div
            key={label.index}
            style={{ x: i % 2 === 0 ? backX : frontX, y: i % 2 === 0 ? backY : frontY }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.58 + i * 0.1 }}
            className={`absolute z-20 ${label.position} will-change-transform`}
          >
            <div className="flex items-center gap-2">
              <span className="font-mono text-[8px] font-medium text-brand-accent">{label.index}</span>
              <span className="h-px w-5 bg-blue-300" />
              <span className="whitespace-nowrap text-[10px] font-semibold text-slate-500 sm:text-xs">
                {label.text}
              </span>
            </div>
          </motion.div>
        ))}

        <motion.div
          animate={ambient ? { y: [-4, 4, -4], rotate: [-2, 2, -2] } : { y: 0, rotate: 0 }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute right-[22%] top-[12%] h-5 w-5 rounded-full border border-blue-200 bg-white shadow-[0_8px_20px_rgba(0,112,255,.14)]"
        >
          <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-accent" />
        </motion.div>
        <motion.div
          animate={ambient ? { y: [5, -5, 5], x: [-3, 3, -3] } : { y: 0, x: 0 }}
          transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[28%] left-[38%] h-3.5 w-3.5 rounded-full bg-sky-300 shadow-[0_0_0_8px_rgba(125,211,252,.12)]"
        />
      </motion.div>
    </div>
  );
}
