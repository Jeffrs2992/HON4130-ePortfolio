import timelineData from '../data/timeline.json'
import TravelCard from '../components/travel/TravelCard'

export default function Travel() {
  const trips = [...timelineData]
    .filter((e) => e.type === 'travel')
    .sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <p className="font-mono text-columbia-blue text-xs tracking-widest uppercase mb-3 opacity-70">// travel</p>
      <h1 className="text-4xl md:text-5xl font-bold text-off-white leading-tight">Travel</h1>
      <div className="w-16 h-0.5 bg-columbia-blue mt-2 mb-4" aria-hidden="true" />
      <p className="text-muted text-base mb-12">Places I've been — and more to come.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {trips.map((entry) => (
          <TravelCard key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  )
}