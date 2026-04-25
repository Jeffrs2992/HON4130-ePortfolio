import { Link } from 'react-router-dom'
import { tagMeta, defaultTagColor } from '../../data/tagRoutes'

export default function TravelCard({ entry }) {
  const { id, title, organization, dateRange, tags, photo } = entry

  return (
    <div className="bg-surface rounded-xl overflow-hidden border border-white/5 hover:border-columbia-blue/40 transition-colors">
      {photo ? (
        <img
          src={photo}
          alt={title}
          className="w-full object-cover"
          style={{ height: '180px' }}
        />
      ) : (
        <div
          data-testid="photo-placeholder"
          className="w-full bg-surface border-b border-white/5 flex items-center justify-center"
          style={{ height: '180px' }}
        >
          <span className="text-muted text-xs">Photo Coming Soon</span>
        </div>
      )}
      <div className="p-5">
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag) => {
            const meta = tagMeta[tag]
            return (
              <span
                key={tag}
                className={`text-xs px-2 py-0.5 rounded font-medium ${meta ? meta.colorClass : defaultTagColor}`}
              >
                #{tag}
              </span>
            )
          })}
        </div>
        <p className="text-off-white font-bold text-base leading-snug">{title}</p>
        <p className="text-muted text-xs mt-1">{organization}</p>
        <p className="text-muted text-xs mt-0.5 mb-4">{dateRange}</p>
        <Link
          to={`/timeline/${id}`}
          className="text-columbia-blue text-sm font-semibold hover:underline"
        >
          Explore →
        </Link>
      </div>
    </div>
  )
}
