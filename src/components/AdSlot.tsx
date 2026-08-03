export default function AdSlot({ position }: { position: 'top' | 'bottom' }) {
  return (
    <div
      className="ads-slot w-full min-h-[100px] my-10 rounded-2xl border border-dashed border-brand-border/80 bg-gradient-to-r from-white/[0.02] via-brand-accent/[0.03] to-white/[0.02] flex flex-col items-center justify-center gap-1"
      data-ad={position}
      aria-hidden="true"
    >
      <span className="mono-label">Advertisement</span>
      <span className="text-[10px] text-white/20 font-mono uppercase tracking-widest">{position} slot</span>
    </div>
  );
}
