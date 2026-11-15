import { motion, useReducedMotion } from 'motion/react';

/** Full-bleed sci-fi signal field — blue on black. */
export default function SciFiField({ intensity = 1 }: { intensity?: number }) {
  const reduce = useReducedMotion();
  const nodes = [
    { x: 12, y: 22 },
    { x: 28, y: 48 },
    { x: 45, y: 18 },
    { x: 58, y: 42 },
    { x: 72, y: 28 },
    { x: 85, y: 55 },
    { x: 38, y: 68 },
    { x: 62, y: 72 },
    { x: 50, y: 50 },
    { x: 20, y: 78 },
    { x: 78, y: 80 },
  ];
  const links: [number, number][] = [
    [0, 2],
    [2, 4],
    [4, 5],
    [0, 1],
    [1, 8],
    [2, 8],
    [3, 8],
    [4, 8],
    [8, 6],
    [8, 7],
    [6, 9],
    [7, 10],
    [3, 5],
    [1, 6],
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 scanline opacity-40" />
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,112,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,112,255,0.07) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0070FF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0070FF" stopOpacity="0" />
          </radialGradient>
        </defs>
        {links.map(([a, b], i) => (
          <motion.line
            key={`${a}-${b}`}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke="rgba(0,112,255,0.35)"
            strokeWidth="0.15"
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.7 * intensity }}
            transition={{ duration: 1.6, delay: 0.15 + i * 0.05, ease: 'easeOut' }}
          />
        ))}
        {nodes.map((n, i) => (
          <g key={i}>
            <motion.circle
              cx={n.x}
              cy={n.y}
              r={i === 8 ? 3.5 : 2}
              fill="url(#nodeGlow)"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 0.5 * intensity }}
              transition={{ delay: 0.4 + i * 0.04 }}
            />
            <motion.circle
              cx={n.x}
              cy={n.y}
              r={i === 8 ? 1.1 : 0.55}
              fill={i === 8 ? '#3b8eff' : '#0070FF'}
              initial={reduce ? false : { scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 + i * 0.04, type: 'spring', stiffness: 200 }}
            />
          </g>
        ))}
        {!reduce && (
          <motion.circle
            cx={50}
            cy={50}
            r={6}
            fill="none"
            stroke="rgba(0,112,255,0.45)"
            strokeWidth="0.15"
            animate={{ r: [5, 9, 5], opacity: [0.55, 0.1, 0.55] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </svg>

      {!reduce && (
        <>
          <motion.div
            className="absolute left-1/2 top-0 h-px w-[40%] -translate-x-1/2 bg-gradient-to-r from-transparent via-brand-accent to-transparent"
            animate={{ opacity: [0.2, 0.8, 0.2], scaleX: [0.8, 1.1, 0.8] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-brand-accent/20 blur-[100px]"
            animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -left-20 bottom-10 h-64 w-64 rounded-full bg-brand-accent/10 blur-[90px]"
            animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}
    </div>
  );
}
