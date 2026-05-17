import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import BookingForm, { ROOM_PRICES, ROOM_LABELS } from '../components/BookingForm'

function randomRef() {
  return Math.random().toString(36).substring(2, 10).toUpperCase()
}

function calcNights(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0
  const diff = new Date(checkOut) - new Date(checkIn)
  return Math.max(0, Math.floor(diff / 86400000))
}

export default function Booking() {
  const [searchParams] = useSearchParams()
  const { user, isGuest, openLoginModal } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    checkIn: '',
    checkOut: '',
    guests: '2',
    room: searchParams.get('room') || 'standard',
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    requests: '',
  })

  const [bookingRef, setBookingRef] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const room = searchParams.get('room')
    if (room && ROOM_PRICES[room]) {
      setForm(f => ({ ...f, room }))
    }
  }, [searchParams])

  useEffect(() => {
    if (user) {
      setForm(f => ({ ...f, name: user.name, email: user.email }))
    }
  }, [user])

  const nights = calcNights(form.checkIn, form.checkOut)
  const basePrice = (ROOM_PRICES[form.room] || 45) * nights
  const tax = Math.round(basePrice * 0.1 * 100) / 100
  const total = basePrice + tax

  function handleSubmit(e) {
    e.preventDefault()
    if (!user) {
      openLoginModal(true)
      return
    }
    const ref = randomRef()
    setBookingRef(ref)
    setSubmitted(true)

    // Persist booking for admin view
    const existing = JSON.parse(localStorage.getItem('fgp_bookings') || '[]')
    existing.push({
      ref,
      name: form.name,
      email: form.email,
      phone: form.phone,
      room: ROOM_LABELS[form.room],
      checkIn: form.checkIn,
      checkOut: form.checkOut,
      guests: form.guests,
      nights,
      total: total.toFixed(2),
      requests: form.requests,
      bookedAt: new Date().toISOString(),
    })
    localStorage.setItem('fgp_bookings', JSON.stringify(existing))
  }

  if (submitted && bookingRef) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-16" style={{ backgroundColor: '#FAF7F2' }}>
        <div className="max-w-md w-full text-center p-10 rounded-2xl shadow-lg" style={{ backgroundColor: 'white' }}>
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#D4edd4' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Playfair Display, serif', color: '#2C2C2C' }}>
            Booking Confirmed!
          </h2>
          <p className="text-sm mb-4" style={{ color: '#6B7280' }}>
            Thank you, {form.name.split(' ')[0]}! Your booking has been received.
          </p>
          <div className="py-4 px-6 rounded-xl mb-6" style={{ backgroundColor: '#F0E8DA' }}>
            <p className="text-xs uppercase tracking-wider mb-1" style={{ color: '#9CA3AF' }}>Booking Reference</p>
            <p className="text-2xl font-bold tracking-widest" style={{ color: '#8B5E3C', fontFamily: 'Playfair Display, serif' }}>
              {bookingRef}
            </p>
          </div>
          <div className="text-sm space-y-1 mb-6" style={{ color: '#4B4B4B' }}>
            <p>{ROOM_LABELS[form.room]}</p>
            <p>{form.checkIn} → {form.checkOut} · {nights} night{nights !== 1 ? 's' : ''}</p>
            <p className="font-semibold">Total: €{total.toFixed(2)}</p>
          </div>
          <p className="text-xs mb-6" style={{ color: '#9CA3AF' }}>
            A confirmation email will be sent to {form.email}
          </p>
          <button
            onClick={() => { setSubmitted(false); setForm(f => ({ ...f, checkIn: '', checkOut: '', requests: '' })) }}
            className="px-6 py-2.5 rounded-xl text-white text-sm font-semibold"
            style={{ backgroundColor: '#8B5E3C' }}
          >
            Make Another Booking
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-16 px-4" style={{ backgroundColor: '#FAF7F2' }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#D4956A' }}>Reservations</p>
          <h1 className="text-4xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: '#2C2C2C' }}>
            Book Your Stay
          </h1>
          <p className="mt-2 text-sm" style={{ color: '#6B7280' }}>
            Secure your room in the heart of Plovdiv
          </p>
        </div>

        {!user && (
          <div className="mb-8 px-5 py-4 rounded-xl text-sm flex items-center gap-3" style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 flex-shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            You are browsing as a guest. You will need to sign in before confirming your booking.
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2 rounded-2xl p-8 shadow-sm" style={{ backgroundColor: 'white' }}>
              <h3 className="text-lg font-semibold mb-6" style={{ fontFamily: 'Playfair Display, serif', color: '#2C2C2C' }}>
                Booking Details
              </h3>
              <BookingForm form={form} setForm={setForm} />
            </div>

            {/* Price Summary */}
            <div className="space-y-4">
              <div className="rounded-2xl p-6 shadow-sm sticky top-24" style={{ backgroundColor: 'white' }}>
                <h3 className="text-lg font-semibold mb-5" style={{ fontFamily: 'Playfair Display, serif', color: '#2C2C2C' }}>
                  Price Summary
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span style={{ color: '#6B7280' }}>Room</span>
                    <span className="font-medium" style={{ color: '#2C2C2C' }}>{ROOM_LABELS[form.room]}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span style={{ color: '#6B7280' }}>Rate</span>
                    <span className="font-medium" style={{ color: '#2C2C2C' }}>€{ROOM_PRICES[form.room]}/night</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span style={{ color: '#6B7280' }}>Nights</span>
                    <span className="font-medium" style={{ color: '#2C2C2C' }}>{nights || '—'}</span>
                  </div>
                  <div
                    className="flex justify-between items-center pt-3"
                    style={{ borderTop: '1px solid #F0E8DA' }}
                  >
                    <span style={{ color: '#6B7280' }}>Subtotal</span>
                    <span className="font-medium" style={{ color: '#2C2C2C' }}>
                      {nights > 0 ? `€${basePrice.toFixed(2)}` : '—'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span style={{ color: '#6B7280' }}>Taxes (10%)</span>
                    <span className="font-medium" style={{ color: '#2C2C2C' }}>
                      {nights > 0 ? `€${tax.toFixed(2)}` : '—'}
                    </span>
                  </div>
                  <div
                    className="flex justify-between items-center pt-3"
                    style={{ borderTop: '2px solid #F0E8DA' }}
                  >
                    <span className="font-bold" style={{ color: '#2C2C2C' }}>Total</span>
                    <span className="text-xl font-bold" style={{ color: '#8B5E3C' }}>
                      {nights > 0 ? `€${total.toFixed(2)}` : '—'}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-6 py-3.5 rounded-xl text-white font-semibold transition-opacity hover:opacity-90"
                  style={{ backgroundColor: '#8B5E3C' }}
                >
                  {user ? 'Confirm Booking' : 'Sign In to Book'}
                </button>

                <p className="text-xs text-center mt-3" style={{ color: '#9CA3AF' }}>
                  Free cancellation · No credit card required
                </p>
              </div>

              {/* Quick room info */}
              <div className="rounded-2xl p-5 shadow-sm" style={{ backgroundColor: '#F0E8DA' }}>
                <img
                  src={`https://picsum.photos/seed/room-${form.room}/400/200`}
                  alt={ROOM_LABELS[form.room]}
                  className="w-full h-32 object-cover rounded-xl mb-3"
                />
                <p className="text-sm font-semibold" style={{ color: '#8B5E3C' }}>{ROOM_LABELS[form.room]}</p>
                <p className="text-xs mt-1" style={{ color: '#6B7280' }}>€{ROOM_PRICES[form.room]} per night · taxes included at checkout</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
