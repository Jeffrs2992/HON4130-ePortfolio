import { Link } from 'react-router-dom'
import { tagMeta, defaultTagColor } from '../../data/tagRoutes'
import { imgSrc } from '../../utils/imgSrc'
import { entryPhotos } from '../../utils/entryPhotos'

export default function TimelineCard({ entry }) {
  const { id, title, organization, dateRange, tags, summary } = entry
  const { thumb } = entryPhotos(id)

  return (
    <div className="pl-1 mb-12">
      {/* Photo */}
      {thumb ? (
        <img
          src={imgSrc(thumb)}
          alt={title}
          className="w-full rounded-lg object-cover mb-3"
          style={{ maxHeight: '260px' }}
        />
      ) : (
        <div
          data-testid="photo-placeholder"
          className="w-full rounded-lg bg-surface border border-white/5 flex items-center justify-center mb-3"
          style={{ height: '160px' }}
        >
          <span className="text-muted text-xs">Photo Coming Soon</span>
        </div>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-2">
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

      {/* Title block */}
      <p className="text-off-white font-bold text-lg leading-snug">{title}</p>
      <p className="text-columbia-blue text-sm mt-0.5">{organization}</p>
      <p className="text-muted text-xs mt-0.5 mb-3">{dateRange}</p>

      {/* Teaser */}
      <p className="text-muted text-sm leading-relaxed mb-3">{summary}</p>

      {/* Explore link */}
      <Link
        to={`/timeline/${id}`}
        className="text-columbia-blue text-sm font-semibold hover:underline"
      >
        Explore →
      </Link>
    </div>
  )
}