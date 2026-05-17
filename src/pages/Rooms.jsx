import RoomCard from '../components/RoomCard'

const rooms = [
  {
    slug: 'standard',
    name: 'Standard Room',
    image: 'https://picsum.photos/seed/room-std-card/600/400',
    description: 'A comfortable and cozy room with all essentials for a restful stay. Perfect for solo travellers or couples seeking a relaxed retreat in Plovdiv.',
    amenities: ['Double Bed', 'En-suite Bathroom', 'WiFi', 'Air Conditioning', 'Work Desk', 'TV'],
    price: 45,
  },
  {
    slug: 'deluxe',
    name: 'Deluxe Room',
    image: 'https://picsum.photos/seed/room-dlx-card/600/400',
    description: 'Elevated comfort with a spacious layout, premium furnishings, and beautiful views of our garden. Ideal for couples seeking a special experience.',
    amenities: ['King Bed', 'Private Bathroom', 'WiFi', 'Air Conditioning', 'Minibar', 'Garden View', 'Seating Area'],
    price: 65,
  },
  {
    slug: 'family',
    name: 'Family Suite',
    image: 'https://picsum.photos/seed/room-fam-card/600/400',
    description: 'Our largest accommodation, designed for families or groups. Features a separate living area and multiple sleeping arrangements with all the space you need.',
    amenities: ['2 Bedrooms', 'Living Room', 'Private Bathroom', 'WiFi', 'Air Conditioning', 'Kitchen Corner', 'TV', 'Cot Available'],
    price: 85,
  },
]

export default function Rooms() {
  return (
    <div className="min-h-screen py-16 px-4" style={{ backgroundColor: '#FAF7F2' }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#D4956A' }}>Accommodation</p>
          <h1 className="text-4xl font-bold mb-3" style={{ fontFamily: 'Playfair Display, serif', color: '#2C2C2C' }}>
            Our Rooms
          </h1>
          <p className="text-sm max-w-xl mx-auto" style={{ color: '#6B7280' }}>
            Each room is thoughtfully decorated to reflect the warmth and character of Plovdiv's rich cultural heritage.
          </p>
        </div>

        {/* Room cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {rooms.map(room => (
            <RoomCard key={room.slug} {...room} />
          ))}
        </div>

        {/* Policy note */}
        <div className="mt-14 p-6 rounded-2xl text-center text-sm" style={{ backgroundColor: '#F0E8DA', color: '#4B4B4B' }}>
          <strong style={{ color: '#8B5E3C' }}>Check-in:</strong> from 14:00 &nbsp;·&nbsp;
          <strong style={{ color: '#8B5E3C' }}>Check-out:</strong> until 11:00 &nbsp;·&nbsp;
          <strong style={{ color: '#8B5E3C' }}>All prices</strong> per room per night · Taxes extra
        </div>
      </div>
    </div>
  )
}
