export default function Badge({ children, tone = 'default' }) {
  const tones = {
    default: 'bg-slate-800 text-slate-200 border-slate-700',
    success: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    warning: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    danger: 'bg-red-500/10 text-red-300 border-red-500/30',
    info: 'bg-sky-500/10 text-sky-300 border-sky-500/30'
  }

  return (
    <span className={`inline-flex rounded-full border px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${tones[tone]}`}>
      {children}
    </span>
  )
}
