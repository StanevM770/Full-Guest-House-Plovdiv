import { Link } from 'react-router-dom'

export default function RoomCard({ image, name, description, amenities, price, slug }) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-md transition-shadow hover:shadow-xl" style={{ backgroundColor: 'white' }}>
      <div className="relative overflow-hidden h-52">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div
          className="absolute top-3 right-3 px-3 py-1 rounded-full text-white text-sm font-semibold"
          style={{ backgroundColor: '#8B5E3C' }}
        >
          €{price}/night
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif', color: '#2C2C2C' }}>
          {name}
        </h3>
        <p className="text-sm leading-relaxed mb-4" style={{ color: '#6B7280' }}>
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          {amenities.map(a => (
            <span
              key={a}
              className="text-xs px-2.5 py-1 rounded-full"
              style={{ backgroundColor: '#F0E8DA', color: '#8B5E3C' }}
            >
              {a}
            </span>
          ))}
        </div>

        <Link
          to={`/booking?room=${slug}`}
          className="block w-full text-center py-2.5 rounded-xl text-white font-semibold transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#D4956A' }}
        >
          Book This Room
        </Link>
      </div>
    </div>
  )
}
