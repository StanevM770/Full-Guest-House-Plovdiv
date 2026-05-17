import { useState } from 'react'
import Lightbox from '../components/Lightbox'

const allImages = [
  { id: 1, src: 'https://picsum.photos/seed/ext-1/600/400', label: 'Guest House Entrance', category: 'exterior' },
  { id: 2, src: 'https://picsum.photos/seed/ext-2/600/500', label: 'Facade & Garden Gate', category: 'exterior' },
  { id: 3, src: 'https://picsum.photos/seed/ext-3/600/450', label: 'Street View', category: 'exterior' },
  { id: 4, src: 'https://picsum.photos/seed/room-std-1/600/400', label: 'Standard Room', category: 'rooms' },
  { id: 5, src: 'https://picsum.photos/seed/room-dlx-1/600/500', label: 'Deluxe Room', category: 'rooms' },
  { id: 6, src: 'https://picsum.photos/seed/room-fam-1/600/450', label: 'Family Suite', category: 'rooms' },
  { id: 7, src: 'https://picsum.photos/seed/common-1/600/400', label: 'Shared Living Room', category: 'common' },
  { id: 8, src: 'https://picsum.photos/seed/common-2/600/500', label: 'Guest Kitchen', category: 'common' },
  { id: 9, src: 'https://picsum.photos/seed/common-3/600/450', label: 'Breakfast Area', category: 'common' },
  { id: 10, src: 'https://picsum.photos/seed/garden-1/600/400', label: 'Garden Terrace', category: 'garden' },
  { id: 11, src: 'https://picsum.photos/seed/garden-2/600/500', label: 'Outdoor Seating', category: 'garden' },
  { id: 12, src: 'https://picsum.photos/seed/garden-3/600/450', label: 'Morning in the Garden', category: 'garden' },
]

const categories = [
  { key: 'all', label: 'All' },
  { key: 'rooms', label: 'Rooms' },
  { key: 'common', label: 'Common Areas' },
  { key: 'exterior', label: 'Exterior' },
  { key: 'garden', label: 'Garden' },
]

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [lightboxIdx, setLightboxIdx] = useState(null)

  const filtered = activeCategory === 'all' ? allImages : allImages.filter(i => i.category === activeCategory)

  return (
    <div className="min-h-screen py-16 px-4" style={{ backgroundColor: '#FAF7F2' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#D4956A' }}>Photos</p>
          <h1 className="text-4xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: '#2C2C2C' }}>
            Our Gallery
          </h1>
          <p className="mt-2 text-sm" style={{ color: '#6B7280' }}>
            A glimpse into life at Full Guest House Plovdiv
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className="px-5 py-2 rounded-full text-sm font-medium transition-all"
              style={{
                backgroundColor: activeCategory === cat.key ? '#8B5E3C' : '#F0E8DA',
                color: activeCategory === cat.key ? 'white' : '#8B5E3C',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filtered.map((img, i) => (
            <div
              key={img.id}
              className="break-inside-avoid rounded-2xl overflow-hidden cursor-pointer group relative shadow-sm hover:shadow-xl transition-shadow"
              onClick={() => setLightboxIdx(i)}
            >
              <img
                src={img.src}
                alt={img.label}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div
                className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: 'linear-gradient(to top, rgba(44,44,44,0.7) 0%, transparent 60%)' }}
              >
                <span className="text-sm font-medium text-white">{img.label}</span>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20" style={{ color: '#9CA3AF' }}>
            No photos in this category.
          </div>
        )}
      </div>

      {lightboxIdx !== null && (
        <Lightbox
          images={filtered}
          startIdx={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
        />
      )}
    </div>
  )
}
