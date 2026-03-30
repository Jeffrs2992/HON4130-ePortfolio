import { education, afrotc } from '../data/education'

export default function Education() {
  return (
    <div
      className="max-w-4xl mx-auto px-6 py-20"
      style={{ animation: 'edu-fade-in 0.7s ease both' }}
    >
      {/* Section label */}
      <p className="font-mono text-columbia-blue text-xs tracking-widest uppercase mb-3 opacity-70">
        // education
      </p>

      {/* Page heading */}
      <h1 className="text-4xl md:text-5xl font-bold text-off-white leading-tight">
        Education
      </h1>
      <div className="w-16 h-0.5 bg-columbia-blue mt-2 mb-10" aria-hidden="true" />

      {/* UH Card */}
      <div className="bg-surface rounded-xl p-8 mb-6">

        {/* Top row: school name + college badge */}
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-2xl font-bold text-off-white">{education.school}</h2>
          <span className="bg-columbia-blue/10 text-columbia-blue text-xs px-2 py-1 rounded font-medium">
            {education.college}
          </span>
          <span className="ml-auto text-muted text-sm">{education.location}</span>
        </div>

        {/* Degree pills */}
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

        {/* Minor */}
        <p className="text-muted text-sm mt-2">Minor: {education.minor}</p>

        {/* Info row — graduation + GPA */}
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

        {/* Relevant Coursework */}
        <div className="mt-6">
          <p className="text-muted text-xs uppercase tracking-widest mb-3">
            Relevant Coursework
          </p>
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

      {/* AFROTC Card */}
      <div className="bg-surface rounded-xl p-8 border-l-4 border-uh-red">

        {/* Program name */}
        <h2 className="text-xl font-bold text-off-white">{afrotc.program}</h2>

        {/* Detachment · school */}
        <p className="text-muted text-sm mt-1">
          {afrotc.detachment} &middot; UH
        </p>

        {/* Date range */}
        <p className="text-muted text-sm">{afrotc.dateRange}</p>

        {/* Commissioning */}
        <p className="text-columbia-blue font-semibold mt-3">{afrotc.commissioning}</p>

        {/* AFSC */}
        <p className="text-off-white text-sm mt-1">{afrotc.afsc}</p>

        {/* Description */}
        <p className="text-muted mt-4 leading-relaxed text-sm">{afrotc.description}</p>
      </div>

      {/* Scoped fade-in keyframe */}
      <style>{`
        @keyframes edu-fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
