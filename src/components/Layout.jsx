import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import Navbar from './Navbar'
import Footer from './Footer'
import Chatbot from './Chatbot'
import { PHARMACY_INFO } from '../data/data'
import AdminSiteEditor from './AdminSiteEditor'
import { useAuth } from '../context/AuthContext'

export default function Layout({ children }) {
  const [showTop, setShowTop] = useState(false)
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')
  const { isAdmin: isAuthAdmin } = useAuth()

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (isAdmin) return (
    <>
      <Toaster position="top-right" toastOptions={{ style: { fontFamily: 'var(--font)', borderRadius: '12px', boxShadow: '0 12px 35px rgba(0,0,0,0.3)' } }} />
      {children}
    </>
  )

  return (
    <>
      <Toaster position="top-right" toastOptions={{ style: { fontFamily: 'var(--font)', borderRadius: '12px', background: 'var(--bg3)', color: 'var(--text)', border: '1px solid var(--border-accent)', boxShadow: '0 12px 35px rgba(0,0,0,0.3)' } }} />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          style={{ minHeight: '100vh' }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />

      {/* WhatsApp */}
      <a href={`https://wa.me/${PHARMACY_INFO.whatsapp}?text=Bonjour,%20j'aimerais%20plus%20d'informations`}
        className="whatsapp-btn" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
        <i className="bi bi-whatsapp" />
      </a>

      {/* Back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button className="back-top-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }} transition={{ type: 'spring', damping: 20 }}
            aria-label="Haut de page">
            <i className="bi bi-rocket-takeoff" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chatbot */}
      <Chatbot />
      <AdminSiteEditor />
    </>
  )
}
