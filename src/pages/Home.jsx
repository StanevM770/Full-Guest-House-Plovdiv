import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section
        className="relative min-h-screen flex items-center justify-center text-center px-4"
        style={{
          background: 'linear-gradient(135deg, #8B5E3C 0%, #D4956A 40%, #F0E8DA 70%, #FAF7F2 100%)',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(https://picsum.photos/seed/plovdiv-hero/1600/900)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.25,
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <div
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-6"
            style={{ backgroundColor: 'rgba(139,94,60,0.15)', color: '#8B5E3C', border: '1px solid rgba(139,94,60,0.3)' }}
          >
            Plovdiv Center, Bulgaria
          </div>
          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-6"
            style={{ fontFamily: 'Playfair Display, serif', color: '#2C2C2C' }}
          >
            Welcome to<br />
            <span style={{ color: '#8B5E3C' }}>Full Guest House</span>
          </h1>
          <p className="text-lg sm:text-xl mb-10 max-w-xl mx-auto leading-relaxed" style={{ color: '#4B3D2E' }}>
            Your home away from home in the heart of Plovdiv, Bulgaria.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/booking"
              className="px-8 py-3.5 rounded-xl text-white font-semibold text-base transition-all hover:opacity-90 hover:-translate-y-0.5 shadow-lg"
              style={{ backgroundColor: '#8B5E3C' }}
            >
              Book Now
            </Link>
            <Link
              to="/rooms"
              className="px-8 py-3.5 rounded-xl font-semibold text-base transition-all hover:-translate-y-0.5 border-2"
              style={{ borderColor: '#8B5E3C', color: '#8B5E3C', backgroundColor: 'rgba(250,247,242,0.8)' }}
            >
              See Rooms
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg viewBox="0 0 24 24" fill="none" stroke="#8B5E3C" strokeWidth="2" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* About */}
      <section className="py-20 px-4" style={{ backgroundColor: '#FAF7F2' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#D4956A' }}>
                About Us
              </p>
              <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif', color: '#2C2C2C' }}>
                A cozy retreat in the heart of Plovdiv
              </h2>
              <p className="leading-relaxed mb-4" style={{ color: '#4B4B4B' }}>
                Located in Plovdiv Center, Full Guest House Plovdiv offers a warm and welcoming stay in one of Bulgaria's most vibrant cities. Whether you are visiting for business or leisure, we aim to make your time in Plovdiv comfortable and memorable.
              </p>
              <p className="leading-relaxed" style={{ color: '#4B4B4B' }}>
                Plovdiv is home to the renowned <strong style={{ color: '#8B5E3C' }}>Old Town</strong>, the creative quarter of <strong style={{ color: '#8B5E3C' }}>Kapana</strong>, and the lively <strong style={{ color: '#8B5E3C' }}>main pedestrian street</strong> — all within the city center, close to our guest house.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://picsum.photos/seed/plovdiv-house/600/500"
                alt="Guest house"
                className="rounded-2xl shadow-xl w-full object-cover h-80"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Address card */}
      <section className="py-20 px-4" style={{ backgroundColor: '#F0E8DA' }}>
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl p-8 shadow-sm flex flex-col md:flex-row gap-8 items-center" style={{ backgroundColor: 'white' }}>
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#D4956A' }}>Find Us</p>
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#2C2C2C' }}>
                Our Location
              </h2>
              <div className="space-y-3 text-sm" style={{ color: '#4B4B4B' }}>
                <div className="flex items-start gap-3">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#D4956A" strokeWidth="2" className="w-5 h-5 mt-0.5 flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <span>ul. "Sveta Petka" 22, Kamenitsa 1,<br/>Plovdiv Center, 4000 Plovdiv, Bulgaria</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#D4956A" strokeWidth="2" className="w-5 h-5 flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <span>0888 799 079</span>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0">
              <Link
                to="/contact"
                className="px-6 py-3 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#8B5E3C' }}
              >
                Get Directions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
