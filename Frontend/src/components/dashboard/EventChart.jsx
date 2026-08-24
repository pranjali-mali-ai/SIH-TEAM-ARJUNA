import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'

export default function EventChart({ data, title = 'Events over time' }) {
  if (!data || data.length === 0) {
    return (
      <div className="h-72 rounded-xl border border-slate-800 bg-slate-950/30 p-4">
        <div className="mb-4 text-lg font-semibold text-slate-100">{title}</div>
        <div className="flex h-[85%] items-center justify-center text-sm text-slate-400">No data available</div>
      </div>
    )
  }

  return (
    <div className="h-72 rounded-xl border border-slate-800 bg-slate-950/30 p-4">
      <div className="mb-4 text-lg font-semibold text-slate-100">{title}</div>
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="eventFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.7} />
              <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} />
          <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: 8 }}
          />
          <Area type="monotone" dataKey="value" stroke="#38bdf8" fill="url(#eventFill)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
