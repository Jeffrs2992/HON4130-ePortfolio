import timelineData from '../../data/timeline.json'
import TimelineCard from './TimelineCard'
import YearMarker from './YearMarker'

function getYear(dateStr) {
  return dateStr.slice(0, 4)
}

export default function TimelineRail() {
  const entries = [...timelineData]
    .filter((e) => e.highlight)
    .sort((a, b) => b.date.localeCompare(a.date))

  const items = []
  let lastYear = null

  entries.forEach((entry) => {
    const year = getYear(entry.date)
    if (year !== lastYear) {
      items.push({ type: 'year', year, key: `year-${year}` })
      lastYear = year
    }
    items.push({ type: 'entry', entry, key: entry.id })
  })

  return (
    <div className="relative pl-6">
      {/* Vertical rail */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-columbia-blue/20" />

      {items.map((item) => {
        if (item.type === 'year') {
          return <YearMarker key={item.key} year={item.year} />
        }
        return (
          <div key={item.key} className="relative mb-2">
            {/* Entry dot */}
            <div className="absolute -left-[23px] top-[18px] w-2 h-2 rounded-full bg-columbia-blue" />
            <TimelineCard entry={item.entry} />
          </div>
        )
      })}
    </div>
  )
}