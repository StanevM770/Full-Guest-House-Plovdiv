const ROOM_PRICES = { standard: 45, deluxe: 65, family: 85 }
const ROOM_LABELS = { standard: 'Standard Room', deluxe: 'Deluxe Room', family: 'Family Suite' }

export default function BookingForm({ form, setForm }) {
  const today = new Date().toISOString().split('T')[0]

  function update(field) {
    return e => setForm(f => ({ ...f, [field]: e.target.value }))
  }

  const inputClass = 'w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors'
  const inputStyle = { borderColor: '#F0E8DA', backgroundColor: 'white', color: '#2C2C2C' }
  const labelClass = 'block text-xs font-semibold mb-1.5 uppercase tracking-wide'
  const labelStyle = { color: '#6B7280' }

  return (
    <div className="space-y-5">
      {/* Dates */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass} style={labelStyle}>Check-in</label>
          <input
            type="date"
            required
            min={today}
            value={form.checkIn}
            onChange={update('checkIn')}
            className={inputClass}
            style={inputStyle}
          />
        </div>
        <div>
          <label className={labelClass} style={labelStyle}>Check-out</label>
          <input
            type="date"
            required
            min={form.checkIn || today}
            value={form.checkOut}
            onChange={update('checkOut')}
            className={inputClass}
            style={inputStyle}
          />
        </div>
      </div>

      {/* Guests + Room */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass} style={labelStyle}>Guests</label>
          <select value={form.guests} onChange={update('guests')} className={inputClass} style={inputStyle}>
            {[1, 2, 3, 4, 5, 6].map(n => (
              <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} style={labelStyle}>Room Type</label>
          <select value={form.room} onChange={update('room')} className={inputClass} style={inputStyle}>
            {Object.entries(ROOM_LABELS).map(([slug, label]) => (
              <option key={slug} value={slug}>{label} — €{ROOM_PRICES[slug]}/night</option>
            ))}
          </select>
        </div>
      </div>

      {/* Contact */}
      <div>
        <label className={labelClass} style={labelStyle}>Full Name</label>
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
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass} style={labelStyle}>Email</label>
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
          <label className={labelClass} style={labelStyle}>Phone</label>
          <input
            type="tel"
            value={form.phone}
            onChange={update('phone')}
            placeholder="+359 88 123 4567"
            className={inputClass}
            style={inputStyle}
          />
        </div>
      </div>

      {/* Special requests */}
      <div>
        <label className={labelClass} style={labelStyle}>Special Requests</label>
        <textarea
          value={form.requests}
          onChange={update('requests')}
          rows={3}
          placeholder="Early check-in, dietary requirements, cot for baby…"
          className={inputClass}
          style={{ ...inputStyle, resize: 'vertical' }}
        />
      </div>
    </div>
  )
}

export { ROOM_PRICES, ROOM_LABELS }
