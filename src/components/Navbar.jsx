import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/rooms', label: 'Rooms' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/booking', label: 'Booking' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const { user, isAdmin, logout, openLoginModal } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  return (
    <nav
      className={`sticky top-0 z-40 w-full transition-shadow duration-300 ${scrolled ? 'shadow-md' : ''}`}
      style={{ backgroundColor: '#FAF7F2', borderBottom: '1px solid #F0E8DA' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#8B5E3C' }}>
              <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
            </div>
            <span className="font-semibold text-sm leading-tight" style={{ color: '#8B5E3C', fontFamily: 'Playfair Display, serif' }}>
              Full Guest House
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors hover:text-accent ${location.pathname === link.to ? 'border-b-2' : ''}`}
                style={{
                  color: location.pathname === link.to ? '#8B5E3C' : '#2C2C2C',
                  borderColor: '#8B5E3C',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg transition-colors"
                    style={{
                      backgroundColor: location.pathname === '/admin' ? '#8B5E3C' : '#F0E8DA',
                      color: location.pathname === '/admin' ? 'white' : '#8B5E3C',
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                    Admin
                  </Link>
                )}
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold"
                  style={{ backgroundColor: '#D4956A' }}
                >
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm" style={{ color: '#2C2C2C' }}>Hi, {user.name.split(' ')[0]}</span>
                <button
                  onClick={logout}
                  className="text-sm px-3 py-1.5 rounded-lg border transition-colors hover:bg-red-50"
                  style={{ borderColor: '#8B5E3C', color: '#8B5E3C' }}
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => openLoginModal()}
                className="text-sm px-4 py-2 rounded-lg text-white font-medium transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#8B5E3C' }}
              >
                Sign In
              </button>
            )}
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="#8B5E3C" strokeWidth="2" className="w-6 h-6">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile drawer */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-96 pb-4' : 'max-h-0'}`}
        >
          <div className="flex flex-col gap-1 pt-2">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
                style={{
                  color: location.pathname === link.to ? '#8B5E3C' : '#2C2C2C',
                  backgroundColor: location.pathname === link.to ? '#F0E8DA' : 'transparent',
                }}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 pt-2" style={{ borderTop: '1px solid #F0E8DA' }}>
              {user ? (
                <div className="flex flex-col gap-2 px-3">
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium"
                      style={{ backgroundColor: '#F0E8DA', color: '#8B5E3C' }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                      </svg>
                      Admin Panel
                    </Link>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-sm" style={{ color: '#2C2C2C' }}>Hi, {user.name.split(' ')[0]}</span>
                    <button onClick={logout} className="text-sm px-3 py-1.5 rounded-lg border" style={{ borderColor: '#8B5E3C', color: '#8B5E3C' }}>
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => openLoginModal()}
                  className="w-full text-sm px-4 py-2 rounded-lg text-white font-medium"
                  style={{ backgroundColor: '#8B5E3C' }}
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
