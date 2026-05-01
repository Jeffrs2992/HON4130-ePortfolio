// src/components/timeline/templates/TrainingDetail.jsx
import { Link } from 'react-router-dom'
import { tagMeta, defaultTagColor } from '../../../data/tagRoutes'
import PhotoGallery from '../PhotoGallery'

export default function TrainingDetail({ entry, related }) {
  const { title, organization, dateRange, tags, summary, photo, photos, bullets, paragraphs } = entry

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
      <p className="text-muted text-xs mt-0.5 mb-8">{dateRange}</p>

      {/* Hero photo */}
      {photo && (
        <img src={photo} alt={title} className="w-full rounded-lg object-cover mb-8" style={{ maxHeight: '340px' }} />
      )}

      {/* Key Takeaways */}
      {bullets && bullets.length > 0 && (
        <div className="mb-8">
          <p className="text-columbia-blue text-xs font-bold uppercase tracking-widest mb-4">Key Takeaways</p>
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

      {/* Essay paragraphs — fall back to summary if no paragraphs yet */}
      {paragraphs && paragraphs.length > 0
        ? paragraphs.map((p, i) => (
            <p key={i} className="text-muted text-base leading-relaxed mb-5">{p}</p>
          ))
        : summary && (
            <p className="text-muted text-base leading-relaxed border-l-2 border-columbia-blue/30 pl-4 mb-8">{summary}</p>
          )
      }

      {/* Photo gallery */}
      <PhotoGallery photos={photos} />

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