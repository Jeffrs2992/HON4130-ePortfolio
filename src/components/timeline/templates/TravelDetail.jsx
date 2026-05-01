// src/components/timeline/templates/TravelDetail.jsx
import { Link } from 'react-router-dom'
import { tagMeta, defaultTagColor } from '../../../data/tagRoutes'
import PhotoGallery from '../PhotoGallery'
import { entryPhotos } from '../../../utils/entryPhotos'

export default function TravelDetail({ entry, related }) {
  const { title, organization, dateRange, tags, bullets, paragraphs } = entry
  const { gallery } = entryPhotos(entry.id)

  return (
    <>
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => {
          const meta = tagMeta[tag]
          return (
            <Link
              key={tag}
              to={meta ? meta.to : '/travel'}
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
      <p className="text-muted text-xs mt-0.5 mb-8">{dateRange}</p>

      {/* Highlights */}
      {bullets && bullets.length > 0 && (
        <div className="mb-8">
          <p className="text-columbia-blue text-xs font-bold uppercase tracking-widest mb-4">Highlights</p>
          <ul className="space-y-2">
            {bullets.map((bullet, i) => (
              <li key={i} className="flex gap-3 text-muted text-sm">
                <span className="text-columbia-blue shrink-0">—</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Essay paragraphs */}
      {paragraphs && paragraphs.map((p, i) => (
        <p key={i} className="text-muted text-base leading-relaxed mb-5">{p}</p>
      ))}

      {/* Photo gallery */}
      <PhotoGallery photos={gallery} />

      {/* Related */}
      {related && related.length > 0 && (
        <div className="border-t border-white/5 pt-8">
          <p className="text-columbia-blue text-xs font-bold uppercase tracking-widest mb-4">Related</p>
          <div className="space-y-3">
            {related.map((r) => (
              <Link
                key={r.id}
                to={`/timeline/${r.id}`}
                className="block bg-surface rounded-lg p-4 border border-white/5 hover:border-columbia-blue/30 transition-colors"
              >
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