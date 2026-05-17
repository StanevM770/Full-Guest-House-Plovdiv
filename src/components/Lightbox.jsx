import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'

export default function Lightbox({ images, startIdx, onClose }) {
  const [currentIdx, setCurrent] = useState(startIdx)

  useEffect(() => {
    setCurrent(startIdx)
  }, [startIdx])

  const prev = useCallback(() => setCurrent(i => (i - 1 + images.length) % images.length), [images.length])
  const next = useCallback(() => setCurrent(i => (i + 1) % images.length), [images.length])

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, prev, next])

  const image = images[currentIdx]

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.92)' }}
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center z-10 transition-colors hover:bg-white/20"
        style={{ color: 'white' }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Prev */}
      {images.length > 1 && (
        <button
          onClick={e => { e.stopPropagation(); prev() }}
          className="absolute left-4 w-12 h-12 rounded-full flex items-center justify-center transition-colors hover:bg-white/20"
          style={{ color: 'white' }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Image */}
      <div onClick={e => e.stopPropagation()} className="max-w-5xl max-h-screen p-4 flex flex-col items-center gap-4">
        <img
          src={image.src}
          alt={image.label || ''}
          className="max-w-full max-h-[80vh] rounded-xl object-contain shadow-2xl"
        />
        {image.label && (
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>{image.label}</p>
        )}
        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{currentIdx + 1} / {images.length}</p>
      </div>

      {/* Next */}
      {images.length > 1 && (
        <button
          onClick={e => { e.stopPropagation(); next() }}
          className="absolute right-4 w-12 h-12 rounded-full flex items-center justify-center transition-colors hover:bg-white/20"
          style={{ color: 'white' }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>,
    document.body
  )
}
