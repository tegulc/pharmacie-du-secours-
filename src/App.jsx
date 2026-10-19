import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import React from 'react'
import { useEffect } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import { NotifProvider } from './context/NotifContext'
import { GalerieProvider } from './context/GalerieContext'
import Layout from './components/Layout'
import PageLoader from './components/PageLoader'
import Home from './pages/Home'
import Services from './pages/Services'
import Galerie from './pages/Galerie'
import APropos from './pages/APropos'
import Contact from './pages/Contact'
import Actualites from './pages/Actualites'
import AdminLogin from './pages/Admin/AdminLogin'
import AdminDashboard from './pages/Admin/AdminDashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Account from './pages/Account'
import './App.css'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, [pathname])
  return null
}

function CustomCursor() {
  useEffect(() => {
    const cursor = document.querySelector('.cursor')
    const follower = document.querySelector('.cursor-follower')
    if (!cursor || !follower) return
    let mx = 0, my = 0, fx = 0, fy = 0
    const onMove = (e) => { mx = e.clientX; my = e.clientY; cursor.style.left = mx + 'px'; cursor.style.top = my + 'px' }
    document.addEventListener('mousemove', onMove)
    const loop = () => { fx += (mx - fx) * 0.12; fy += (my - fy) * 0.12; follower.style.left = fx + 'px'; follower.style.top = fy + 'px'; requestAnimationFrame(loop) }
    loop()
    return () => document.removeEventListener('mousemove', onMove)
  }, [])
  return null
}

class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { error: null } }
  static getDerivedStateFromError(error) { return { error } }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 24, color: 'var(--text)', background: 'var(--bg)', minHeight: '80vh' }}>
          <h2 style={{ color: 'var(--primary)' }}>Erreur d'exécution</h2>
          <pre style={{ whiteSpace: 'pre-wrap', color: 'var(--text-muted)' }}>{String(this.state.error)}</pre>
        </div>
      )
    }
    return this.props.children
  }
}

function ProtectedRoute({ children }) {
  const { isAdmin } = useAuth()
  return isAdmin ? children : <Navigate to="/admin/login" replace />
}

function UserRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" replace />
}

function AppRoutes() {
  return (
    <Layout>
      <ErrorBoundary>
        <Routes>
          <Route path="/"             element={<Home />} />
          <Route path="/services"     element={<Services />} />
          <Route path="/galerie"      element={<Galerie />} />
          <Route path="/a-propos"     element={<APropos />} />
          <Route path="/contact"      element={<Contact />} />
          <Route path="/actualites"   element={<Actualites />} />
          <Route path="/admin/login"  element={<AdminLogin />} />
          <Route path="/login"        element={<Login />} />
          <Route path="/register"     element={<Register />} />
          <Route path="/account"      element={<UserRoute><Account /></UserRoute>} />
          <Route path="/admin"        element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/*"      element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="*" element={
            <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, textAlign: 'center', padding: 24 }}>
              <div style={{ fontSize: '6rem', fontWeight: 900, color: 'var(--primary)', lineHeight: 1 }}>404</div>
              <h2 style={{ color: 'var(--text)', fontWeight: 700 }}>Page introuvable</h2>
              <p style={{ color: 'var(--text-muted)' }}>La page que vous cherchez n'existe pas.</p>
              <a href="/" className="btn-primary-custom">← Retour à l'accueil</a>
            </div>
          } />
        </Routes>
      </ErrorBoundary>
    </Layout>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotifProvider>
          <GalerieProvider>
            <div className="cursor" />
            <div className="cursor-follower" />
            <CustomCursor />
            <PageLoader />
            <ScrollToTop />
            <AppRoutes />
          </GalerieProvider>
        </NotifProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
