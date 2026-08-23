export default function PageContainer({ title, subtitle, children }) {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">ARJUNA</p>
          <h2 className="mt-1 text-2xl font-semibold text-slate-100">{title}</h2>
        </div>
        {subtitle && <div className="text-sm text-slate-400">{subtitle}</div>}
      </div>
      {children}
    </div>
  )
}
