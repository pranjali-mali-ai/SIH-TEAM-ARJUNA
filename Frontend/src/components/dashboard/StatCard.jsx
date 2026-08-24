export default function StatCard({ label, value, detail, tone = 'default' }) {
  const tones = {
    default: 'border-slate-800 bg-slate-900/80 text-slate-100',
    success: 'border-emerald-500/30 bg-emerald-500/5 text-emerald-300',
    warning: 'border-amber-500/30 bg-amber-500/5 text-amber-300',
    danger: 'border-red-500/30 bg-red-500/5 text-red-300',
    info: 'border-sky-500/30 bg-sky-500/5 text-sky-300'
  }

  return (
    <div className={`rounded-xl border p-4 shadow-soft ${tones[tone]}`}>
      <div className="text-[11px] uppercase tracking-[0.18em] text-slate-400">{label}</div>
      <div className="mt-3 text-3xl font-semibold text-white">{value}</div>
      <div className="mt-2 text-sm text-slate-400">{detail}</div>
    </div>
  )
}
