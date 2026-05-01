// src/components/timeline/PhotoGallery.jsx
import { useState, useEffect } from 'react'

export default function PhotoGallery({ photos }) {
  const [open, setOpen] = useState(false)
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (e.key === 'Escape') setOpen(false)
      if (e.key === 'ArrowRight') setIdx((i) => (i + 1) % photos.length)
      if (e.key === 'ArrowLeft') setIdx((i) => (i - 1 + photos.length) % photos.length)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, photos.length])

  if (!photos || photos.length === 0) return null

  return (
    <>
      <div className="columns-2 md:columns-3 gap-3 [&>img]:mb-3 mb-10">
        {photos.map((src, i) => (
          <img
            key={i}
            data-testid="gallery-thumb"
            src={src}
            alt=""
            onClick={() => { setIdx(i); setOpen(true) }}
            className="w-full rounded-lg object-cover cursor-pointer hover:opacity-80 transition-opacity break-inside-avoid"
          />
        ))}
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          onClick={() => setOpen(false)}
        >
          <button
            onClick={(e) => { e.stopPropagation(); setIdx((idx - 1 + photos.length) % photos.length) }}
            className="absolute left-4 md:left-8 text-white text-4xl px-3 py-2 hover:text-columbia-blue transition-colors select-none"
            aria-label="Previous photo"
          >
            ‹
          </button>

          <img
            src={photos[idx]}
            alt=""
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => { e.stopPropagation(); setIdx((idx + 1) % photos.length) }}
            className="absolute right-4 md:right-8 text-white text-4xl px-3 py-2 hover:text-columbia-blue transition-colors select-none"
            aria-label="Next photo"
          >
            ›
          </button>

          <span className="absolute bottom-5 text-muted text-sm select-none">
            {idx + 1} / {photos.length}
          </span>
        </div>
      )}
    </>
  )
}