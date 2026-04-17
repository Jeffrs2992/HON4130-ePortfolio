export default function YearMarker({ year }) {
  return (
    <div className="relative flex items-center gap-3 mb-6 -ml-[25px]">
      <div
        className="w-3 h-3 rounded-full bg-columbia-blue shrink-0"
        style={{ boxShadow: '0 0 0 3px rgba(100, 160, 220, 0.2)' }}
        data-testid="year-marker-dot"
      />
      <span className="text-columbia-blue text-xs font-bold uppercase tracking-[0.15em]">
        {year}
      </span>
      <div className="flex-1 h-px bg-white/5" />
    </div>
  )
}