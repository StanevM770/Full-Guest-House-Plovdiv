import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

const SESSION_KEY = 'fgp_session'
const USERS_KEY = 'fgp_users'
const ADMIN_EMAIL = 'stanevm770@gmail.com'

function getUsers() {
  try { return JSON.parse(localStorage.getItem(USERS_KEY)) || [] } catch { return [] }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isGuest, setIsGuest] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [bookingRedirect, setBookingRedirect] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(SESSION_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (parsed.guest) {
        setIsGuest(true)
      } else {
        // Re-read role from users store so promote/demote is always reflected
        const users = getUsers()
        const fresh = users.find(u => u.email === parsed.email)
        const session = fresh
          ? { name: fresh.name, email: fresh.email, role: fresh.role }
          : parsed
        setUser(session)
        localStorage.setItem(SESSION_KEY, JSON.stringify(session))
      }
    } else {
      setShowLoginModal(true)
    }
  }, [])

  function login(email, password) {
    const users = getUsers()
    const match = users.find(u => u.email === email && u.password === password)
    if (!match) return { error: 'Invalid email or password.' }
    const session = { name: match.name, email: match.email, role: match.role }
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    setUser(session)
    setIsGuest(false)
    setShowLoginModal(false)
    return { success: true }
  }

  function register(name, email, password) {
    const users = getUsers()
    if (users.find(u => u.email === email)) return { error: 'Email already registered.' }
    const role = email === ADMIN_EMAIL ? 'admin' : 'user'
    const newUser = { name, email, password, role }
    users.push(newUser)
    saveUsers(users)
    const session = { name, email, role }
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    setUser(session)
    setIsGuest(false)
    setShowLoginModal(false)
    return { success: true }
  }

  function continueAsGuest() {
    localStorage.setItem(SESSION_KEY, JSON.stringify({ guest: true }))
    setIsGuest(true)
    setUser(null)
    setShowLoginModal(false)
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY)
    setUser(null)
    setIsGuest(false)
    setShowLoginModal(true)
  }

  function openLoginModal(redirect = false) {
    setBookingRedirect(redirect)
    setShowLoginModal(true)
  }

  function getAllUsers() {
    return getUsers().map(({ password: _p, ...rest }) => rest)
  }

  function promoteUser(email) {
    const users = getUsers()
    const idx = users.findIndex(u => u.email === email)
    if (idx === -1) return
    users[idx].role = 'admin'
    saveUsers(users)
    // If that's the current user, update session too
    if (user?.email === email) {
      const updated = { ...user, role: 'admin' }
      setUser(updated)
      localStorage.setItem(SESSION_KEY, JSON.stringify(updated))
    }
  }

  function demoteUser(email) {
    if (email === ADMIN_EMAIL) return // protect the default admin
    const users = getUsers()
    const idx = users.findIndex(u => u.email === email)
    if (idx === -1) return
    users[idx].role = 'user'
    saveUsers(users)
    if (user?.email === email) {
      const updated = { ...user, role: 'user' }
      setUser(updated)
      localStorage.setItem(SESSION_KEY, JSON.stringify(updated))
    }
  }

  const isAdmin = user?.role === 'admin'

  return (
    <AuthContext.Provider value={{
      user, isGuest, isAdmin,
      showLoginModal, bookingRedirect,
      login, register, continueAsGuest, logout,
      openLoginModal, setShowLoginModal,
      getAllUsers, promoteUser, demoteUser,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
