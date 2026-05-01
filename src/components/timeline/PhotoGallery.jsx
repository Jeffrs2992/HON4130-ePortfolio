// src/components/timeline/PhotoGallery.jsx
import { useState, useEffect } from 'react'

export default function PhotoGallery({ photos }) {
  const [idx, setIdx] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const count = photos?.length ?? 0
  const prev = () => setIdx((i) => (i - 1 + count) % count)
  const next = () => setIdx((i) => (i + 1) % count)

  useEffect(() => {
    if (!lightboxOpen) return
    const handler = (e) => {
      if (e.key === 'Escape') setLightboxOpen(false)
      if (e.key === 'ArrowRight') setIdx((i) => (i + 1) % count)
      if (e.key === 'ArrowLeft') setIdx((i) => (i - 1 + count) % count)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightboxOpen, count])

  if (!count) {
    return (
      <div
        data-testid="photo-placeholder"
        className="w-full rounded-xl bg-surface border border-dashed border-white/10 flex items-center justify-center mb-10"
        style={{ height: '320px' }}
      >
        <p className="text-muted text-sm">Photos coming soon</p>
      </div>
    )
  }

  return (
    <>
      {/* Carousel banner */}
      <div
        className="relative w-full rounded-xl overflow-hidden mb-10 group"
        style={{ height: '360px' }}
      >
        <img
          data-testid="carousel-photo"
          src={photos[idx]}
          alt=""
          className="w-full h-full object-cover cursor-zoom-in"
          onClick={() => setLightboxOpen(true)}
        />

        {count > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white text-2xl rounded-full w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ‹
            </button>
            <button
              onClick={next}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white text-2xl rounded-full w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ›
            </button>

            {/* Dot indicators (≤12 photos) */}
            {count <= 12 ? (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {photos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    aria-label={`Go to photo ${i + 1}`}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i === idx ? 'bg-white' : 'bg-white/40 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>
            ) : (
              <span className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded">
                {idx + 1} / {count}
              </span>
            )}
          </>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          {count > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev() }}
              className="absolute left-4 md:left-8 text-white text-4xl px-3 py-2 hover:text-columbia-blue transition-colors select-none"
              aria-label="Previous photo"
            >
              ‹
            </button>
          )}

          <img
            src={photos[idx]}
            alt=""
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />

          {count > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next() }}
              className="absolute right-4 md:right-8 text-white text-4xl px-3 py-2 hover:text-columbia-blue transition-colors select-none"
              aria-label="Next photo"
            >
              ›
            </button>
          )}

          <span className="absolute bottom-5 text-muted text-sm select-none">
            {idx + 1} / {count}
          </span>
        </div>
      )}
    </>
  )
}