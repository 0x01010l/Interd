import { motion } from 'motion/react';

/** Animated signal network — dominant hero visual for the advisory brand. */
export default function ConnectionField() {
  const nodes = [
    { x: 18, y: 28 },
    { x: 42, y: 18 },
    { x: 68, y: 26 },
    { x: 82, y: 48 },
    { x: 58, y: 62 },
    { x: 32, y: 58 },
    { x: 48, y: 40 },
    { x: 22, y: 72 },
    { x: 74, y: 78 },
  ];

  const links: [number, number][] = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 0],
    [1, 6],
    [6, 4],
    [5, 7],
    [4, 8],
    [2, 6],
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <div className="absolute inset-0 signal-grid opacity-70" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        {links.map(([a, b], i) => (
          <motion.line
            key={`${a}-${b}`}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke="rgba(15,118,110,0.28)"
            strokeWidth="0.18"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.2 + i * 0.08, ease: 'easeOut' }}
          />
        ))}
        {nodes.map((n, i) => (
          <motion.circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={i === 6 ? 1.35 : 0.85}
            fill={i === 6 ? '#0f766e' : '#0b1324'}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 + i * 0.05 }}
          />
        ))}
        <motion.circle
          cx={48}
          cy={40}
          r={4}
          fill="none"
          stroke="rgba(15,118,110,0.35)"
          strokeWidth="0.2"
          animate={{ r: [3.5, 6, 3.5], opacity: [0.5, 0.15, 0.5] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
      <motion.div
        className="absolute -right-20 top-1/4 h-72 w-72 rounded-full bg-brand-accent/15 blur-3xl"
        animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -left-16 bottom-10 h-56 w-56 rounded-full bg-brand-warm/10 blur-3xl"
        animate={{ x: [0, 24, 0], y: [0, -16, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
