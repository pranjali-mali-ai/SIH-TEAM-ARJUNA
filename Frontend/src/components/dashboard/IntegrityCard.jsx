export default function IntegrityCard({ title, value, tone }) {
  const tones = {
    verified: 'border-emerald-500/30 bg-emerald-500/5 text-emerald-300',
    warning: 'border-amber-500/30 bg-amber-500/5 text-amber-300',
    critical: 'border-red-500/30 bg-red-500/5 text-red-300'
  }

  return (
    <div className={`rounded-xl border p-4 ${tones[tone]}`}>
      <div className="text-[11px] uppercase tracking-[0.18em] text-slate-400">{title}</div>
      <div className="mt-3 text-lg font-semibold">{value}</div>
    </div>
  )
}
