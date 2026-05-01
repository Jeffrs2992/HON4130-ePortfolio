// src/components/timeline/templates/MilestoneDetail.jsx
import { Link } from 'react-router-dom'
import { tagMeta, defaultTagColor } from '../../../data/tagRoutes'
import PhotoGallery from '../PhotoGallery'
import { imgSrc } from '../../../utils/imgSrc'
import { entryPhotos } from '../../../utils/entryPhotos'

export default function MilestoneDetail({ entry, related }) {
  const { title, organization, dateRange, tags, summary, paragraphs } = entry
  const { thumb, gallery } = entryPhotos(entry.id)

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
      {thumb && (
        <img src={imgSrc(thumb)} alt={title} className="w-full rounded-lg object-cover mb-8" style={{ maxHeight: '340px' }} />
      )}

      {/* Essay paragraphs — fall back to summary */}
      {paragraphs && paragraphs.length > 0
        ? paragraphs.map((p, i) => (
            <p key={i} className="text-muted text-base leading-relaxed mb-5">{p}</p>
          ))
        : summary && (
            <p className="text-muted text-base leading-relaxed border-l-2 border-columbia-blue/30 pl-4 mb-8">{summary}</p>
          )
      }

      {/* Photo gallery */}
      <PhotoGallery photos={gallery} />

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