import { experience } from '../data/experience'
import { technicalSkills, leadershipSkills, softSkills } from '../data/skills'

export default function Leadership() {
  const skillGroups = [
    {
      label: 'Technical',
      skills: technicalSkills,
      pillClass:
        'bg-columbia-blue/10 text-columbia-blue border border-columbia-blue/20 text-xs px-3 py-1 rounded-full font-medium',
    },
    {
      label: 'Leadership',
      skills: leadershipSkills,
      pillClass:
        'bg-uh-red/10 text-uh-red border border-uh-red/20 text-xs px-3 py-1 rounded-full font-medium',
    },
    {
      label: 'Core',
      skills: softSkills,
      pillClass:
        'bg-white/5 text-muted border border-white/10 text-xs px-3 py-1 rounded-full font-medium',
    },
  ]

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      {/* Page heading */}
      <h1 className="text-off-white text-3xl font-bold tracking-tight">Leadership</h1>
      <div className="w-16 h-0.5 bg-columbia-blue mt-2 mb-10" />

      {/* Experience subsection */}
      <h2 className="text-off-white text-xl font-semibold mb-8">Experience</h2>

      <div className="relative pl-6">
        {/* Vertical timeline line */}
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-columbia-blue/30" />

        {experience.map((entry) => (
          <div key={entry.id} className="relative mb-6">
            {/* Timeline dot */}
            <div className="absolute -left-[5px] w-2.5 h-2.5 rounded-full bg-columbia-blue top-6" />

            {/* Card */}
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

      {/* Skills subsection */}
      <div className="border-t border-white/5 mt-12 pt-10">
        <h2 className="text-off-white text-xl font-semibold mb-8">Skills</h2>

        <div className="space-y-6">
          {skillGroups.map(({ label, skills, pillClass }) => (
            <div key={label}>
              <p className="text-muted text-xs uppercase tracking-widest mb-3">{label}</p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill} className={pillClass}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
