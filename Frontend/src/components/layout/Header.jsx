import { Bell, Search, Settings, UserCircle2 } from 'lucide-react'

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b border-slate-800 bg-slate-950/70 px-6 py-4 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Current Investigation</p>
          <h1 className="mt-1 text-xl font-semibold text-slate-100">INV-4401 · Security breach review</h1>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-300 md:flex">
          <Search size={16} />
          <input
            className="w-64 bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
            placeholder="Global search"
          />
        </div>

        <button type="button" className="rounded-lg border border-slate-700 bg-slate-900 p-2 text-slate-300 hover:text-white">
          <Bell size={16} />
        </button>
        <button type="button" className="rounded-lg border border-slate-700 bg-slate-900 p-2 text-slate-300 hover:text-white">
          <Settings size={16} />
        </button>
        <div className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2">
          <UserCircle2 size={18} className="text-sky-300" />
          <div className="text-sm">
            <div className="font-medium text-slate-100">Investigating Officer</div>
            <div className="text-[11px] text-slate-400">S. Nair</div>
          </div>
        </div>
      </div>
    </header>
  )
}
