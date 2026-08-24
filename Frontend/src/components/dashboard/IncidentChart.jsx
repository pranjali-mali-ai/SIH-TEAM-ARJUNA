import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Cell } from 'recharts'

const colors = ['#22c55e', '#f59e0b', '#ef4444', '#38bdf8']

export default function IncidentChart({ data, title = 'Incident severity' }) {
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
        <BarChart data={data}>
          <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} />
          <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: 8 }}
          />
          <Bar dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
