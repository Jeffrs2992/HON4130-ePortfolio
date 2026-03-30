import { certifications } from '../data/certifications'

const badgeStyles = {
  certification:
    'bg-columbia-blue/10 text-columbia-blue border border-columbia-blue/20 text-xs px-2 py-0.5 rounded-full font-medium',
  award:
    'bg-uh-red/10 text-uh-red border border-uh-red/20 text-xs px-2 py-0.5 rounded-full font-medium',
  military:
    'bg-white/5 text-muted border border-white/10 text-xs px-2 py-0.5 rounded-full font-medium',
}

const badgeLabel = {
  certification: 'Certification',
  award: 'Award',
  military: 'Military',
}

export default function Certifications() {
  return (
    <div
      className="max-w-4xl mx-auto px-6 py-20"
      style={{ animation: 'cert-fade-in 0.7s ease both' }}
    >
      {/* Section label */}
      <p className="font-mono text-columbia-blue text-xs tracking-widest uppercase mb-3 opacity-70">
        // achievements
      </p>

      {/* Page heading */}
      <h1 className="text-4xl md:text-5xl font-bold text-off-white leading-tight">
        Certifications &amp; Awards
      </h1>
      <div className="w-16 h-0.5 bg-columbia-blue mt-2 mb-10" aria-hidden="true" />

      {/* Card grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {certifications.map((cert, i) => (
          <div
            key={cert.id}
            className="bg-surface rounded-xl p-6 relative"
            style={{ animation: `cert-fade-in 0.7s ease both`, animationDelay: `${i * 0.08}s` }}
          >
            {/* Type badge */}
            <span className={`absolute top-4 right-4 ${badgeStyles[cert.type]}`}>
              {badgeLabel[cert.type]}
            </span>

            {/* Name */}
            <p className="text-off-white font-semibold text-base pr-20">{cert.name}</p>

            {/* Issuer */}
            <p className="text-muted text-sm mt-2">{cert.issuer}</p>

            {/* Date */}
            <p className="text-muted text-xs mt-1">{cert.date}</p>
          </div>
        ))}
      </div>

      {/* Scoped fade-in keyframe */}
      <style>{`
        @keyframes cert-fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
