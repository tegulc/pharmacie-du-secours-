import { createContext, useContext, useState, useEffect } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'

const AuthContext = createContext()
const ADMIN_CREDENTIALS = { email: 'admin@pharmaciedusecours.cm', password: 'Admin2024!' }
const ADMIN_EMAILS = [ADMIN_CREDENTIALS.email]

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      if (!isSupabaseConfigured) {
        // Try to restore a local session when Supabase is not configured
        try {
          const s = JSON.parse(localStorage.getItem('pharma-local-session'))
          if (s?.user) {
            setSession({ provider: 'local' })
            setUser(s.user)
            setProfile(s.profile || null)
          }
        } catch (e) { }
        setLoading(false)
        return
      }

      const { data } = await supabase.auth.getSession()
      const currentSession = data.session
      setSession(currentSession)
      setUser(currentSession?.user ?? null)

      if (currentSession?.user) {
        await loadProfile(currentSession.user.id)
      }

      setLoading(false)
    }

    initAuth()

    let listener = null
    if (isSupabaseConfigured && supabase) {
      const res = supabase.auth.onAuthStateChange(async (_event, currentSession) => {
        setSession(currentSession)
        setUser(currentSession?.user ?? null)

        if (currentSession?.user) {
          await loadProfile(currentSession.user.id)
        } else {
          setProfile(null)
        }
      })
      listener = res?.data
    }

    return () => {
      try { listener?.subscription?.unsubscribe() } catch (e) { }
    }
  }, [])

  // Helper: normalize phone numbers to a simple international form
  const normalizePhone = (phone) => {
    if (!phone) return ''
    // Remove spaces, parentheses, dashes and letters
    let digits = String(phone).replace(/[^+\d]/g, '')
    // If starts with '+' keep it, else remove non-digits
    if (!digits.startsWith('+')) {
      digits = digits.replace(/\D/g, '')
      // If local number starts with 0 and looks like national format, assume +237 (Cameroon)
      if (digits.length >= 8 && digits.startsWith('0')) {
        digits = '+237' + digits.replace(/^0+/, '')
      } else if (digits.startsWith('237')) {
        digits = '+' + digits
      } else if (digits.length >= 8) {
        // best-effort: prefix + if missing
        digits = '+' + digits
      }
    }
    return digits
  }

  const loadProfile = async (userId) => {
    if (!isSupabaseConfigured) return
    const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single()
    if (error) {
      console.warn('Unable to load profile from Supabase:', error.message)
      return
    }
    setProfile(data)
  }

  const login = async (email, password) => {
    setLoading(true)

    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      setLoading(false)
      if (error) {
        return { success: false, error: error.message }
      }
      if (data.session?.user) {
        return { success: true, isAdmin: ADMIN_EMAILS.includes(email) }
      }
    }
    // Supabase not configured -> check local users including admin fallback
    try {
      const localUsers = JSON.parse(localStorage.getItem('pharma-users') || '[]')
      const found = localUsers.find(u => u.email === email && u.password === password)
      if (found) {
        const localUser = { id: found.id, email: found.email, name: found.full_name }
        setUser(localUser)
        setProfile({ full_name: found.full_name, phone: found.phone || '', is_admin: !!found.is_admin })
        localStorage.setItem('pharma-local-session', JSON.stringify({ user: localUser, profile: { full_name: found.full_name, phone: found.phone || '', is_admin: !!found.is_admin } }))
        setLoading(false)
        return { success: true, isAdmin: !!found.is_admin }
      }
    } catch (e) { }

    // Admin hardcoded fallback
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      const adminUser = { id: 'admin', email, name: 'Dr DJOKO Ernest', role: 'admin', avatar: null }
      setUser(adminUser)
      setProfile({ full_name: 'Dr DJOKO Ernest', phone: '', is_admin: true })
      localStorage.setItem('pharma-local-session', JSON.stringify({ user: adminUser, profile: { full_name: 'Dr DJOKO Ernest', is_admin: true } }))
      setLoading(false)
      return { success: true, isAdmin: true }
    }

    setLoading(false)
    return { success: false, error: 'Identifiants incorrects' }
  }

  const signup = async ({ email, password, full_name, phone }) => {
    setLoading(true)
    // normalize phone for storage
    const normalizedPhone = normalizePhone(phone)

    if (!isSupabaseConfigured) {
      // local fallback: store user in localStorage
      try {
        const users = JSON.parse(localStorage.getItem('pharma-users') || '[]')
        if (users.find(u => u.email === email)) {
          setLoading(false)
          return { success: false, error: 'Un compte existe déjà pour cet email.' }
        }
        const newUser = { id: `local-${Date.now()}`, email, password, full_name, phone, is_admin: false }
        users.push(newUser)
        localStorage.setItem('pharma-users', JSON.stringify(users))
        // auto-login local
        const localUser = { id: newUser.id, email: newUser.email, name: newUser.full_name }
        setUser(localUser)
        setProfile({ full_name: newUser.full_name, phone: normalizedPhone || newUser.phone, is_admin: false })
        try { localStorage.setItem('pharma-local-session', JSON.stringify({ user: localUser, profile: { full_name: newUser.full_name, phone: normalizedPhone || newUser.phone, is_admin: false } })) } catch (e) {}
        setLoading(false)
        return { success: true, message: 'Compte créé en local. Vous êtes connecté.' }
      } catch (e) {
        setLoading(false)
        return { success: false, error: 'Impossible de créer le compte en local' }
      }
    }

    // Supabase path
    const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { full_name } } })
    if (error) {
      setLoading(false)
      return { success: false, error: error.message }
    }

    if (data.user) {
      const profilePayload = {
        id: data.user.id,
        full_name,
        phone: normalizedPhone || phone,
        is_admin: false,
      }
      await supabase.from('profiles').upsert(profilePayload)
    }

    setLoading(false)
    return { success: true, message: 'Compte créé. Vérifiez votre boîte mail si nécessaire.' }
  }

  const logout = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut()
    }
    // clear local session as well
    try { localStorage.removeItem('pharma-local-session') } catch (e) {}
    setSession(null)
    setUser(null)
    setProfile(null)
  }

  const updateProfile = async (updates) => {
    // normalize/validate phone when provided
    if (updates?.phone) {
      const normalized = normalizePhone(updates.phone)
      if (!normalized || normalized.length < 8) {
        return { success: false, error: 'Numéro de téléphone invalide.' }
      }
      updates.phone = normalized
    }

    // Local fallback when Supabase is not configured
    if (!isSupabaseConfigured) {
      if (!user) return { success: false, error: 'Impossible de mettre à jour le profil pour le moment.' }
      try {
        const users = JSON.parse(localStorage.getItem('pharma-users') || '[]')
        const idx = users.findIndex(u => u.id === user.id || u.email === user.email)
        if (idx !== -1) {
          users[idx] = { ...users[idx], full_name: updates.full_name ?? users[idx].full_name, phone: updates.phone ?? users[idx].phone }
          localStorage.setItem('pharma-users', JSON.stringify(users))
        }

        const newProfile = { ...(profile || {}), ...updates }
        const newUser = { ...(user || {}), name: updates.full_name ?? user.name }
        setProfile(newProfile)
        setUser(newUser)
        try { localStorage.setItem('pharma-local-session', JSON.stringify({ user: newUser, profile: newProfile })) } catch (e) {}
        return { success: true }
      } catch (e) {
        return { success: false, error: 'Impossible de mettre à jour le profil en local.' }
      }
    }

    if (!user) {
      return { success: false, error: 'Impossible de mettre à jour le profil pour le moment.' }
    }

    setLoading(true)
    const payload = { id: user.id, ...updates }
    const { data, error } = await supabase.from('profiles').upsert(payload).select().single()
    setLoading(false)

    if (error) {
      return { success: false, error: error.message }
    }

    setProfile(data)
    return { success: true }
  }

  const isAdmin = Boolean(profile?.is_admin || ADMIN_EMAILS.includes(user?.email))

  return (
    <AuthContext.Provider value={{ session, user, profile, loading, login, signup, logout, updateProfile, isAdmin }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
