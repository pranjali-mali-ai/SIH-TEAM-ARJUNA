export default function EmptyState({ title, description, actionLabel, onAction }) {
  return (
    <div className="flex min-h-[220px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-950/40 p-6 text-center">
      <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-slate-400">{description}</p>
      {actionLabel && (
        <button
          className="mt-4 rounded-md bg-sky-500 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-sky-400"
          onClick={onAction}
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}
