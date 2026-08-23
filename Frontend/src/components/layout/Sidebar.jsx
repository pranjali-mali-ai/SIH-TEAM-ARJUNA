import { BarChart3, Camera, FileSearch, FileText, ShieldCheck, TimerReset, Video, Bell, LogOut, Search, Siren, Settings, Upload, ClipboardList } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Dashboard', icon: BarChart3 },
  { to: '/evidence', label: 'Evidence', icon: FileSearch },
  { to: '/upload', label: 'Upload Evidence', icon: Upload },
  { to: '/logs', label: 'Logs', icon: ClipboardList },
  { to: '/video', label: 'Video Analysis', icon: Video },
  { to: '/timeline', label: 'Timeline', icon: TimerReset },
  { to: '/incidents', label: 'Incidents', icon: Siren },
  { to: '/integrity', label: 'Integrity', icon: ShieldCheck },
  { to: '/results', label: 'Investigation Results', icon: FileText },
  { to: '/reports', label: 'Reports', icon: Bell },
  { to: '/settings', label: 'Settings', icon: Settings }
]

export default function Sidebar() {
  const handleSignOut = () => {
    localStorage.removeItem('arjuna_token')
    window.location.href = '/'
  }

  return (
    <aside className="flex w-72 flex-col border-r border-slate-800 bg-slate-950/70">
      <div className="flex items-center gap-3 border-b border-slate-800 px-6 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-sky-500/10 text-lg font-bold text-sky-300">A</div>
        <div>
          <div className="text-lg font-semibold tracking-[0.2em] text-slate-100">ARJUNA</div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Forensic Suite</div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={label}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                isActive
                  ? 'bg-sky-500/10 text-sky-300 ring-1 ring-sky-500/20'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <Icon size={16} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-slate-800 px-3 py-4">
        <button type="button" onClick={handleSignOut} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white">
          <LogOut size={16} />
          Sign out
        </button>
      </div>
    </aside>
  )
}
