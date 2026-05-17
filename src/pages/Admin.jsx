import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ADMIN_EMAIL = 'stanevm770@gmail.com'

function Badge({ role }) {
  const isAdmin = role === 'admin'
  return (
    <span
      className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
      style={{
        backgroundColor: isAdmin ? '#FEF3C7' : '#F0E8DA',
        color: isAdmin ? '#92400E' : '#8B5E3C',
      }}
    >
      {isAdmin ? 'Admin' : 'User'}
    </span>
  )
}

export default function Admin() {
  const { user, isAdmin, getAllUsers, promoteUser, demoteUser } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState('bookings')
  const [bookings, setBookings] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    if (!isAdmin) {
      navigate('/', { replace: true })
    }
  }, [isAdmin, navigate])

  useEffect(() => {
    if (isAdmin) {
      setBookings(JSON.parse(localStorage.getItem('fgp_bookings') || '[]').reverse())
      setUsers(getAllUsers())
    }
  }, [isAdmin])

  if (!isAdmin) return null

  function handlePromote(email) {
    promoteUser(email)
    setUsers(getAllUsers())
  }

  function handleDemote(email) {
    demoteUser(email)
    setUsers(getAllUsers())
  }

  function deleteBooking(ref) {
    const updated = bookings.filter(b => b.ref !== ref)
    localStorage.setItem('fgp_bookings', JSON.stringify([...updated].reverse()))
    setBookings(updated)
  }

  const tabStyle = (t) => ({
    padding: '8px 20px',
    borderRadius: '9999px',
    fontSize: '0.875rem',
    fontWeight: 600,
    cursor: 'pointer',
    border: 'none',
    transition: 'all 0.15s',
    backgroundColor: tab === t ? '#8B5E3C' : 'transparent',
    color: tab === t ? 'white' : '#6B7280',
  })

  return (
    <div className="min-h-screen py-12 px-4" style={{ backgroundColor: '#FAF7F2' }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: '#D4956A' }}>
            Admin Panel
          </p>
          <h1 className="text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: '#2C2C2C' }}>
            Dashboard
          </h1>
          <p className="text-sm mt-1" style={{ color: '#6B7280' }}>
            Signed in as <strong>{user?.email}</strong>
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Bookings', value: bookings.length },
            { label: 'Registered Users', value: users.length },
            { label: 'Admins', value: users.filter(u => u.role === 'admin').length },
          ].map(s => (
            <div key={s.label} className="rounded-2xl p-5 shadow-sm" style={{ backgroundColor: 'white' }}>
              <p className="text-2xl font-bold" style={{ color: '#8B5E3C', fontFamily: 'Playfair Display, serif' }}>{s.value}</p>
              <p className="text-xs mt-1" style={{ color: '#6B7280' }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div
          className="inline-flex gap-1 p-1 rounded-full mb-8"
          style={{ backgroundColor: '#F0E8DA' }}
        >
          <button style={tabStyle('bookings')} onClick={() => setTab('bookings')}>
            Bookings
          </button>
          <button style={tabStyle('users')} onClick={() => setTab('users')}>
            Users
          </button>
        </div>

        {/* Bookings Tab */}
        {tab === 'bookings' && (
          <div>
            {bookings.length === 0 ? (
              <div className="text-center py-20 rounded-2xl" style={{ backgroundColor: 'white' }}>
                <p className="text-4xl mb-3">📋</p>
                <p className="font-semibold" style={{ color: '#2C2C2C' }}>No bookings yet</p>
                <p className="text-sm mt-1" style={{ color: '#6B7280' }}>Confirmed bookings will appear here.</p>
              </div>
            ) : (
              <div className="rounded-2xl overflow-hidden shadow-sm" style={{ backgroundColor: 'white' }}>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ backgroundColor: '#F0E8DA', color: '#6B7280' }}>
                        {['Ref', 'Guest', 'Email', 'Room', 'Check-in', 'Check-out', 'Nights', 'Total', 'Booked', ''].map(h => (
                          <th key={h} className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wide whitespace-nowrap">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((b, i) => (
                        <tr
                          key={b.ref}
                          style={{ borderTop: i > 0 ? '1px solid #F0E8DA' : 'none' }}
                        >
                          <td className="px-4 py-3 font-mono font-bold whitespace-nowrap" style={{ color: '#8B5E3C' }}>
                            {b.ref}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap font-medium" style={{ color: '#2C2C2C' }}>
                            {b.name}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap" style={{ color: '#6B7280' }}>
                            {b.email}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap" style={{ color: '#2C2C2C' }}>
                            {b.room}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap" style={{ color: '#2C2C2C' }}>{b.checkIn}</td>
                          <td className="px-4 py-3 whitespace-nowrap" style={{ color: '#2C2C2C' }}>{b.checkOut}</td>
                          <td className="px-4 py-3 text-center" style={{ color: '#2C2C2C' }}>{b.nights}</td>
                          <td className="px-4 py-3 font-semibold whitespace-nowrap" style={{ color: '#8B5E3C' }}>
                            €{b.total}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-xs" style={{ color: '#9CA3AF' }}>
                            {new Date(b.bookedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                          </td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => deleteBooking(b.ref)}
                              className="text-xs px-2.5 py-1 rounded-lg transition-colors hover:bg-red-50"
                              style={{ color: '#EF4444', border: '1px solid #FCA5A5' }}
                              title="Delete booking"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Users Tab */}
        {tab === 'users' && (
          <div>
            {users.length === 0 ? (
              <div className="text-center py-20 rounded-2xl" style={{ backgroundColor: 'white' }}>
                <p className="text-4xl mb-3">👤</p>
                <p className="font-semibold" style={{ color: '#2C2C2C' }}>No registered users yet</p>
              </div>
            ) : (
              <div className="rounded-2xl overflow-hidden shadow-sm" style={{ backgroundColor: 'white' }}>
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ backgroundColor: '#F0E8DA', color: '#6B7280' }}>
                      {['Name', 'Email', 'Role', 'Actions'].map(h => (
                        <th key={h} className="text-left px-5 py-3 font-semibold text-xs uppercase tracking-wide">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u, i) => {
                      const isProtected = u.email === ADMIN_EMAIL
                      const isSelf = u.email === user?.email
                      return (
                        <tr key={u.email} style={{ borderTop: i > 0 ? '1px solid #F0E8DA' : 'none' }}>
                          <td className="px-5 py-3.5 font-medium" style={{ color: '#2C2C2C' }}>
                            {u.name}
                            {isSelf && (
                              <span className="ml-2 text-xs" style={{ color: '#9CA3AF' }}>(you)</span>
                            )}
                          </td>
                          <td className="px-5 py-3.5" style={{ color: '#6B7280' }}>{u.email}</td>
                          <td className="px-5 py-3.5">
                            <Badge role={u.role} />
                          </td>
                          <td className="px-5 py-3.5">
                            {isProtected ? (
                              <span className="text-xs" style={{ color: '#9CA3AF' }}>Protected</span>
                            ) : u.role === 'admin' ? (
                              <button
                                onClick={() => handleDemote(u.email)}
                                className="text-xs px-3 py-1.5 rounded-lg transition-colors hover:bg-red-50"
                                style={{ color: '#EF4444', border: '1px solid #FCA5A5' }}
                              >
                                Demote to User
                              </button>
                            ) : (
                              <button
                                onClick={() => handlePromote(u.email)}
                                className="text-xs px-3 py-1.5 rounded-lg transition-colors"
                                style={{ color: '#8B5E3C', border: '1px solid #D4956A', backgroundColor: '#FFFBF7' }}
                              >
                                Promote to Admin
                              </button>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
