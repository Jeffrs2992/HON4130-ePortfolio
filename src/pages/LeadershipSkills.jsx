import { Link } from 'react-router-dom'
import { education, afrotc } from '../data/education'
import { technicalSkills, leadershipSkills, softSkills } from '../data/skills'
import { certifications } from '../data/certifications'

const typeLabel = { certification: 'Certification', award: 'Award', military: 'Military' }
const typePill = {
  certification: 'bg-columbia-blue/10 text-columbia-blue border border-columbia-blue/20',
  award: 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/20',
  military: 'bg-uh-red/10 text-uh-red border border-uh-red/20',
}

const highlights = [
  {
    id: 1,
    skill: 'Arabic (MSA)',
    narrative:
      'Developed low-intermediate proficiency in Modern Standard Arabic after spending a summer studying abroad in Morocco under Project GO (Global Officer), a DoD-funded program administered through the University of Maryland. Earned an OPIc score of 1 upon return.',
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
      <h1 className="text-off-white text-3xl font-bold tracking-tight">Education & Credentials</h1>
      <div className="w-16 h-0.5 bg-columbia-blue mt-2 mb-10" />

      {/* University of Houston */}
      <div className="bg-surface rounded-xl p-8 mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-2xl font-bold text-off-white">{education.school}</h2>
          <span className="bg-columbia-blue/10 text-columbia-blue text-xs px-2 py-1 rounded font-medium">
            {education.college}
          </span>
          <span className="ml-auto text-muted text-sm">{education.location}</span>
        </div>
        <div className="flex gap-2 flex-wrap mt-3">
          {education.degrees.map((deg) => (
            <span
              key={deg.field}
              className="bg-background text-off-white border border-white/10 text-sm px-3 py-1 rounded-full"
            >
              {deg.type} in {deg.field}
            </span>
          ))}
        </div>
        <p className="text-muted text-sm mt-2">Minor: {education.minor}</p>
        <div className="flex flex-wrap gap-6 mt-3">
          <div>
            <span className="text-muted text-xs">Graduation</span>
            <p className="text-off-white text-sm font-medium">{education.graduation}</p>
          </div>
          <div>
            <span className="text-muted text-xs">GPA</span>
            <p className="text-off-white text-sm font-medium">{education.gpa}</p>
          </div>
        </div>
        <div className="mt-6">
          <p className="text-muted text-xs uppercase tracking-widest mb-3">Relevant Coursework</p>
          <div className="flex flex-wrap gap-2">
            {education.coursework.map((course) => (
              <span
                key={course}
                className="bg-background text-muted text-xs px-2 py-1 rounded border border-white/5"
              >
                {course}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* AFROTC */}
      <div className="bg-surface rounded-xl p-8 border-l-4 border-uh-red mb-12">
        <h2 className="text-xl font-bold text-off-white">{afrotc.program}</h2>
        <p className="text-muted text-sm mt-1">{afrotc.detachment} &middot; UH</p>
        <p className="text-muted text-sm">{afrotc.dateRange}</p>
        <p className="text-columbia-blue font-semibold mt-3">{afrotc.commissioning}</p>
        <p className="text-off-white text-sm mt-1">{afrotc.afsc}</p>
        <p className="text-muted mt-4 leading-relaxed text-sm">{afrotc.description}</p>
      </div>

      {/* Featured highlights */}
      <div className="border-t border-white/5 pt-10 mb-12">
        <h2 className="text-off-white text-xl font-semibold mb-6">Highlights</h2>
        <div className="space-y-4">
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
      </div>

      {/* Certifications & Awards */}
      <div className="border-t border-white/5 pt-10 mb-12">
        <h2 className="text-off-white text-xl font-semibold mb-6">Certifications & Awards</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {certifications.map(({ id, name, issuer, date, type }) => (
            <div key={id} className="bg-surface rounded-xl p-5 border border-white/5">
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typePill[type] ?? 'bg-white/5 text-muted border border-white/10'}`}>
                {typeLabel[type] ?? type}
              </span>
              <p className="text-off-white font-semibold mt-3 text-sm leading-snug">{name}</p>
              <p className="text-muted text-xs mt-1">{issuer}</p>
              <p className="text-muted text-xs mt-0.5 opacity-70">{date}</p>
            </div>
          ))}
        </div>
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