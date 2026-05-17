import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  function update(field) {
    return e => setForm(f => ({ ...f, [field]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  const inputClass = 'w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors'
  const inputStyle = { borderColor: '#F0E8DA', backgroundColor: 'white', color: '#2C2C2C' }
  const labelClass = 'block text-xs font-semibold mb-1.5 uppercase tracking-wide'
  const labelStyle = { color: '#6B7280' }

  return (
    <div className="min-h-screen py-16 px-4" style={{ backgroundColor: '#FAF7F2' }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#D4956A' }}>Get in Touch</p>
          <h1 className="text-4xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: '#2C2C2C' }}>
            Contact Us
          </h1>
          <p className="mt-2 text-sm" style={{ color: '#6B7280' }}>
            We'd love to hear from you — questions, feedback, or special requests.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Form */}
          <div className="rounded-2xl p-8 shadow-sm" style={{ backgroundColor: 'white' }}>
            {sent ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: '#D4edd4' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif', color: '#2C2C2C' }}>
                  Message Sent!
                </h3>
                <p className="text-sm" style={{ color: '#6B7280' }}>
                  We'll be in touch within 24 hours.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-6 px-5 py-2 rounded-xl text-sm font-medium"
                  style={{ backgroundColor: '#F0E8DA', color: '#8B5E3C' }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: 'Playfair Display, serif', color: '#2C2C2C' }}>
                  Send a Message
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass} style={labelStyle}>Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={update('name')}
                      placeholder="Your name"
                      className={inputClass}
                      style={inputStyle}
                    />
                  </div>
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
                </div>
                <div>
                  <label className={labelClass} style={labelStyle}>Subject</label>
                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={update('subject')}
                    placeholder="Booking enquiry, availability…"
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label className={labelClass} style={labelStyle}>Message</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={update('message')}
                    placeholder="Tell us how we can help…"
                    className={inputClass}
                    style={{ ...inputStyle, resize: 'vertical' }}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl text-white font-semibold transition-opacity hover:opacity-90"
                  style={{ backgroundColor: '#8B5E3C' }}
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Info block */}
          <div className="space-y-6">
            <div className="rounded-2xl p-7 shadow-sm" style={{ backgroundColor: 'white' }}>
              <h3 className="text-lg font-semibold mb-5" style={{ fontFamily: 'Playfair Display, serif', color: '#2C2C2C' }}>
                Contact Information
              </h3>
              <div className="space-y-5">
                {[
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="#D4956A" strokeWidth="2" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    ),
                    title: 'Address',
                    value: 'ul. "Sveta Petka" 22, Kamenitsa 1\nPlovdiv Center, 4000 Plovdiv, Bulgaria',
                  },
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="#D4956A" strokeWidth="2" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    ),
                    title: 'Phone',
                    value: '0888 799 079',
                  },
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="#D4956A" strokeWidth="2" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    ),
                    title: 'Email',
                    value: 'info@fullguesthouse.bg',
                  },
                ].map(item => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-0.5">{item.icon}</div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: '#9CA3AF' }}>{item.title}</p>
                      <p className="text-sm whitespace-pre-line" style={{ color: '#2C2C2C' }}>{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden shadow-sm" style={{ height: 260 }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47357.93897591208!2d24.710048!3d42.143565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14acd10ceabab62b%3A0x94e0c51e7e00cdf2!2sPlovdiv%2C%20Bulgaria!5e0!3m2!1sen!2sbg!4v1716000000000!5m2!1sen!2sbg"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Full Guest House location"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
