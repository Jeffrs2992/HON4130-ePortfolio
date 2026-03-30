import { Link } from 'react-router-dom'
import { technicalSkills, leadershipSkills, softSkills } from '../data/skills'

const highlights = [
  {
    id: 1,
    skill: 'Arabic',
    narrative:
      'Developed low-intermediate proficiency after spending a summer studying abroad in Morocco under Project GO (Global Officer), a DoD-funded program administered through the University of Maryland. Earned an OPIc score of 1 upon return.',
    tag: 'Language / Study Abroad',
  },
]

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

export default function LeadershipSkills() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <Link to="/leadership" className="text-muted text-sm hover:text-columbia-blue transition-colors mb-8 inline-block">
        ← Leadership
      </Link>
      <h1 className="text-off-white text-3xl font-bold tracking-tight">Skills</h1>
      <div className="w-16 h-0.5 bg-columbia-blue mt-2 mb-10" />

      {/* Featured highlights */}
      <h2 className="text-off-white text-xl font-semibold mb-6">Highlights</h2>
      <div className="space-y-4 mb-12">
        {highlights.map((item) => (
          <div key={item.id} className="bg-surface rounded-xl p-6 border border-columbia-blue/20">
            <div className="flex items-start justify-between gap-4">
              <p className="text-off-white font-bold text-lg">{item.skill}</p>
              <span className="text-xs text-columbia-blue border border-columbia-blue/30 px-2 py-0.5 rounded-full shrink-0">
                {item.tag}
              </span>
            </div>
            <p className="text-muted text-sm mt-3 leading-relaxed">{item.narrative}</p>
          </div>
        ))}
      </div>

      {/* General skill pills */}
      <div className="border-t border-white/5 pt-10">
        <h2 className="text-off-white text-xl font-semibold mb-8">All Skills</h2>
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
