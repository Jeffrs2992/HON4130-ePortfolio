// src/components/timeline/templates/AwardDetail.jsx
import { Link } from 'react-router-dom'
import { tagMeta, defaultTagColor } from '../../../data/tagRoutes'

export default function AwardDetail({ entry, related }) {
  const { title, organization, dateRange, tags, summary, photo } = entry

  return (
    <>
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => {
          const meta = tagMeta[tag]
          return (
            <Link
              key={tag}
              to={meta ? meta.to : '/about'}
              className={`text-xs px-2 py-0.5 rounded font-medium hover:opacity-80 transition-opacity ${meta ? meta.colorClass : defaultTagColor}`}
            >
              #{tag}
            </Link>
          )
        })}
      </div>

      {/* Title block */}
      <h1 className="text-off-white text-3xl font-bold tracking-tight">{title}</h1>
      <p className="text-columbia-blue text-sm font-medium mt-1">{organization}</p>
      <p className="text-muted text-xs mt-0.5 mb-6">{dateRange}</p>

      {/* Hero photo */}
      {photo ? (
        <img src={photo} alt={title} className="w-full rounded-lg object-cover mb-8" style={{ maxHeight: '340px' }} />
      ) : (
        <div className="w-full rounded-lg bg-surface border border-white/5 flex items-center justify-center mb-8" style={{ height: '200px' }}>
          <span className="text-muted text-xs">Photo Coming Soon</span>
        </div>
      )}

      {/* Narrative */}
      <p className="text-muted text-base leading-relaxed border-l-2 border-columbia-blue/30 pl-4 mb-8">
        {summary}
      </p>

      {/* Related */}
      {related && related.length > 0 && (
        <div className="border-t border-white/5 pt-8">
          <p className="text-columbia-blue text-xs font-bold uppercase tracking-widest mb-4">Related</p>
          <div className="space-y-3">
            {related.map((r) => (
              <Link key={r.id} to={`/timeline/${r.id}`} className="block bg-surface rounded-lg p-4 border border-white/5 hover:border-columbia-blue/30 transition-colors">
                <p className="text-off-white font-semibold text-sm">{r.title}</p>
                <p className="text-muted text-xs mt-0.5">{r.dateRange} · Explore →</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  )
}