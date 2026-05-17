import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function LoginModal() {
  const { showLoginModal, isGuest, login, register, continueAsGuest, setShowLoginModal, bookingRedirect } = useAuth()
  const navigate = useNavigate()

  const [tab, setTab] = useState('signin')
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')

  if (!showLoginModal) return null

  function handleBackdrop(e) {
    if (e.target === e.currentTarget && isGuest) {
      setShowLoginModal(false)
    }
  }

  function update(field) {
    return e => setForm(f => ({ ...f, [field]: e.target.value }))
  }

  async function handleSignIn(e) {
    e.preventDefault()
    setError('')
    const result = login(form.email, form.password)
    if (result.error) { setError(result.error); return }
    if (bookingRedirect) navigate('/booking')
  }

  async function handleRegister(e) {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return }
    const result = register(form.name, form.email, form.password)
    if (result.error) { setError(result.error); return }
    if (bookingRedirect) navigate('/booking')
  }

  function handleGuest() {
    continueAsGuest()
  }

  const inputClass = 'w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors focus:border-amber-700'
  const inputStyle = { borderColor: '#F0E8DA', backgroundColor: '#FDFCF9', color: '#2C2C2C' }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(44, 44, 44, 0.5)', backdropFilter: 'blur(4px)' }}
      onClick={handleBackdrop}
    >
      <div
        className="w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
        style={{ backgroundColor: '#FAF7F2' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-8 pt-8 pb-4">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: '#8B5E3C' }}>
              <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: '#8B5E3C' }}>
              Full Guest House
            </h2>
          </div>
          <p className="text-sm mt-1" style={{ color: '#6B7280' }}>
            Sign in to manage your bookings and preferences.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex mx-8 mb-6 rounded-xl overflow-hidden" style={{ backgroundColor: '#F0E8DA' }}>
          {['signin', 'register'].map(t => (
            <button
              key={t}
              onClick={() => { setTab(t); setError('') }}
              className="flex-1 py-2.5 text-sm font-medium transition-all rounded-xl"
              style={{
                backgroundColor: tab === t ? '#8B5E3C' : 'transparent',
                color: tab === t ? 'white' : '#8B5E3C',
              }}
            >
              {t === 'signin' ? 'Sign In' : 'Create Account'}
            </button>
          ))}
        </div>

        <div className="px-8 pb-8">
          {error && (
            <div className="mb-4 px-4 py-3 rounded-lg text-sm" style={{ backgroundColor: '#FEE2E2', color: '#991B1B' }}>
              {error}
            </div>
          )}

          {tab === 'signin' ? (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: '#6B7280' }}>Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={update('email')}
                  placeholder="you@example.com"
                  className={inputClass}
                  style={inputStyle}
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: '#6B7280' }}>Password</label>
                <input
                  type="password"
                  required
                  value={form.password}
                  onChange={update('password')}
                  placeholder="••••••••"
                  className={inputClass}
                  style={inputStyle}
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl text-white font-semibold transition-opacity hover:opacity-90 mt-2"
                style={{ backgroundColor: '#8B5E3C' }}
              >
                Sign In
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: '#6B7280' }}>Full Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={update('name')}
                  placeholder="Maria Ivanova"
                  className={inputClass}
                  style={inputStyle}
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: '#6B7280' }}>Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={update('email')}
                  placeholder="you@example.com"
                  className={inputClass}
                  style={inputStyle}
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: '#6B7280' }}>Password</label>
                <input
                  type="password"
                  required
                  value={form.password}
                  onChange={update('password')}
                  placeholder="••••••••"
                  className={inputClass}
                  style={inputStyle}
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: '#6B7280' }}>Confirm Password</label>
                <input
                  type="password"
                  required
                  value={form.confirm}
                  onChange={update('confirm')}
                  placeholder="••••••••"
                  className={inputClass}
                  style={inputStyle}
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl text-white font-semibold transition-opacity hover:opacity-90 mt-2"
                style={{ backgroundColor: '#8B5E3C' }}
              >
                Create Account
              </button>
            </form>
          )}

          <div className="mt-4 pt-4" style={{ borderTop: '1px solid #F0E8DA' }}>
            <button
              onClick={handleGuest}
              className="w-full py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-cream-200"
              style={{ color: '#8B5E3C', backgroundColor: '#F0E8DA' }}
            >
              Continue as Guest
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
