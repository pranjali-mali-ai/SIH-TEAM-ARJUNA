export default function Button({ children, variant = 'primary', className = '', type = 'button', ...props }) {
  const variants = {
    primary: 'bg-sky-500 text-slate-950 hover:bg-sky-400 disabled:opacity-50',
    secondary: 'bg-slate-800 text-slate-100 hover:bg-slate-700 disabled:opacity-50',
    success: 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 disabled:opacity-50',
    danger: 'bg-red-500 text-white hover:bg-red-400 disabled:opacity-50',
    ghost: 'bg-transparent text-slate-200 border border-slate-700 hover:bg-slate-800 disabled:opacity-50'
  }

  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-md border border-transparent px-3 py-2 text-sm font-medium transition ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
