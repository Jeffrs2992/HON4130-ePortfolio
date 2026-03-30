import { Link } from 'react-router-dom'
import { experience } from '../data/experience'

export default function LeadershipExperience() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <Link to="/leadership" className="text-muted text-sm hover:text-columbia-blue transition-colors mb-8 inline-block">
        ← Leadership
      </Link>
      <h1 className="text-off-white text-3xl font-bold tracking-tight">Experience</h1>
      <div className="w-16 h-0.5 bg-columbia-blue mt-2 mb-10" />

      <div className="relative pl-6">
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-columbia-blue/30" />

        {experience.map((entry) => (
          <div key={entry.id} className="relative mb-6">
            <div className="absolute -left-[5px] w-2.5 h-2.5 rounded-full bg-columbia-blue top-6" />

            <div className="bg-surface rounded-xl p-6 ml-4">
              <p className="text-off-white font-bold text-lg">{entry.role}</p>
              <p className="text-columbia-blue text-sm font-medium mt-0.5">{entry.organization}</p>
              <p className="text-muted text-xs mt-1">{entry.dateRange}</p>

              <ul className="mt-4 space-y-1">
                {entry.bullets.map((bullet, i) => (
                  <li key={i} className="text-muted text-sm flex gap-2">
                    <span className="text-columbia-blue shrink-0">—</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
